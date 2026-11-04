import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { fetchCashfreeOrder, isCashfreeConfigured } from '@/lib/cashfree';
import { generateSignedDownloadToken } from '@/lib/token';
import { sendPurchaseEmail } from '@/lib/email';
import { env } from '@/lib/env';
import { PRODUCTS_LIST } from '@/config/products';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing required order_id query parameter' },
        { status: 400 }
      );
    }

    // 1. Check local database first
    let order: any = null;
    try {
      order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          product: true,
          user: true,
          downloadTokens: {
            where: { isRevoked: false },
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
      });
    } catch (dbError) {
      console.warn('⚠️ Database query failed in checkout verification, using mock/fallback:', dbError);
    }

    // 2. If order already confirmed PAID in DB
    if (order && order.status === 'PAID') {
      let token = order.downloadTokens?.[0]?.token;

      // If token missing, generate signed token
      if (!token) {
        token = generateSignedDownloadToken({
          email: order.user.email,
          fileKey: order.product.fileKey,
          type: 'paid',
          orderId: order.id,
          expiresInHours: 48,
          maxUsage: 5,
        });

        try {
          await prisma.downloadToken.create({
            data: {
              token,
              orderId: order.id,
              userId: order.userId,
              expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
            },
          });
        } catch (e) {
          console.warn('⚠️ Could not save regenerated download token to DB:', e);
        }
      }

      return NextResponse.json({
        success: true,
        status: 'PAID',
        orderNumber: order.orderNumber,
        productTitle: order.product.title,
        amountInInr: order.amountInInr,
        buyerEmail: order.user.email,
        downloadUrl: `${env.APP_URL}/api/download/${token}`,
      });
    }

    // 3. Dual-track reconciliation: Query Cashfree API directly as a fallback
    const cfOrder = await fetchCashfreeOrder(orderId);

    if (cfOrder.success && cfOrder.orderStatus === 'PAID') {
      // Mark as PAID in DB if order exists
      if (order) {
        try {
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID' },
          });

          await prisma.payment.upsert({
            where: { orderId: order.id },
            update: { status: 'SUCCESS' },
            create: {
              orderId: order.id,
              gateway: 'CASHFREE',
              cfOrderId: orderId,
              status: 'SUCCESS',
              amountInRupees: order.amountInInr,
            },
          });

          const token = generateSignedDownloadToken({
            email: order.user.email,
            fileKey: order.product.fileKey,
            type: 'paid',
            orderId: order.id,
            expiresInHours: 48,
            maxUsage: 5,
          });

          await prisma.downloadToken.create({
            data: {
              token,
              orderId: order.id,
              userId: order.userId,
              expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
            },
          });

          sendPurchaseEmail({
            toEmail: order.user.email,
            orderNumber: order.orderNumber,
            productTitle: order.product.title,
            downloadUrl: `${env.APP_URL}/api/download/${token}`,
            amountInInr: order.amountInInr,
          }).catch((err) => console.error('⚠️ Could not send email on verify reconciliation:', err));

          return NextResponse.json({
            success: true,
            status: 'PAID',
            orderNumber: order.orderNumber,
            productTitle: order.product.title,
            amountInInr: order.amountInInr,
            buyerEmail: order.user.email,
            downloadUrl: `${env.APP_URL}/api/download/${token}`,
          });
        } catch (updateErr) {
          console.error('❌ Could not update order on reconciliation:', updateErr);
        }
      } else {
        // Ephemeral / Mock order in dev
        const defaultProduct = PRODUCTS_LIST[1] || PRODUCTS_LIST[0];
        const mockToken = generateSignedDownloadToken({
          email: 'student@example.com',
          fileKey: defaultProduct.storagePath,
          type: 'paid',
          orderId,
          expiresInHours: 48,
        });

        return NextResponse.json({
          success: true,
          status: 'PAID',
          orderNumber: `GN-2026-${orderId.slice(-4)}`,
          productTitle: defaultProduct.name,
          amountInInr: defaultProduct.priceInInr,
          buyerEmail: 'student@example.com',
          downloadUrl: `${env.APP_URL}/api/download/${mockToken}`,
        });
      }
    }

    // 4. Return pending or failed status
    if (cfOrder.orderStatus === 'ACTIVE' || (!order && !isCashfreeConfigured())) {
      return NextResponse.json({
        success: true,
        status: 'PENDING',
        message: 'Payment is awaiting completion from Cashfree',
      });
    }

    return NextResponse.json({
      success: false,
      status: 'FAILED',
      message: 'Payment was not completed or has expired',
    });
  } catch (error: any) {
    console.error('❌ Error during checkout verification:', error);
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}

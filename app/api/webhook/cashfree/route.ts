import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyCashfreeWebhookSignature } from '@/lib/cashfree';
import { generateSignedDownloadToken } from '@/lib/token';
import { sendPurchaseEmail } from '@/lib/email';
import { env } from '@/lib/env';

/**
 * Cashfree Webhook Handler (PG API v2023-08-01)
 *
 * Enforces best practices:
 * 1. Webhook-first fulfillment source of truth (stripe-best-practices)
 * 2. Raw body extraction before parsing to preserve HMAC integrity (vercel-labs/next-best-practices)
 * 3. Timing-safe constant-time signature verification (openai/security-best-practices)
 * 4. Idempotent order status transition to prevent duplicate token or email issuance
 * 5. GET/HEAD & test probe acknowledgement for Cashfree dashboard verification
 */
export async function GET() {
  return NextResponse.json(
    { status: 'active', gateway: 'cashfree', timestamp: new Date().toISOString() },
    { status: 200 }
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Extract raw body text and headers
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    // Parse JSON safely upfront to detect test pings
    let payload: any = null;
    try {
      if (rawBody) {
        payload = JSON.parse(rawBody);
      }
    } catch {
      // Body is not JSON
    }

    const eventType = payload?.type || payload?.event || '';
    const isTestProbe =
      eventType.toUpperCase().includes('TEST') ||
      payload?.test === true ||
      (!signature && !timestamp) ||
      !rawBody.trim();

    // 2. Cryptographic signature check
    const isSignatureValid = verifyCashfreeWebhookSignature({
      signature,
      timestamp,
      rawBody,
    });

    if (!isSignatureValid) {
      // Acknowledge dashboard test pings and health checks with HTTP 200
      if (isTestProbe) {
        console.log('ℹ️ Cashfree Dashboard test probe acknowledged with HTTP 200.');
        return NextResponse.json(
          { message: 'Cashfree test probe acknowledged', status: 'ok' },
          { status: 200 }
        );
      }

      console.error('❌ Cashfree webhook rejected: Invalid signature or timestamp mismatch');
      return NextResponse.json(
        { error: 'Invalid or forged webhook signature' },
        { status: 400 }
      );
    }

    const orderData = payload?.data?.order || payload?.order || {};
    const paymentData = payload?.data?.payment || payload?.payment || {};
    const customerData = payload?.data?.customer_details || orderData?.customer_details || {};

    const orderId = orderData.order_id;
    if (!orderId) {
      console.warn('⚠️ Webhook received without order_id:', eventType);
      return NextResponse.json({ message: 'No order_id present, ignored' }, { status: 200 });
    }

    console.log(`🔔 Cashfree Webhook Event [${eventType}] received for Order [${orderId}]`);

    // 4. Handle Payment Success
    const isSuccess =
      eventType === 'PAYMENT_SUCCESS_WEBHOOK' ||
      paymentData.payment_status === 'SUCCESS' ||
      paymentData.payment_status === 'PAID';

    if (isSuccess) {
      try {
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: {
            product: true,
            user: true,
          },
        });

        if (!order) {
          console.warn(`⚠️ Order ${orderId} not found in database during webhook processing.`);
          return NextResponse.json({ message: 'Order not found in database' }, { status: 200 });
        }

        // Idempotency check: if already marked PAID, acknowledge without re-issuing tokens
        if (order.status === 'PAID') {
          console.log(`ℹ️ Order ${orderId} is already marked PAID. Idempotently acknowledging.`);
          return NextResponse.json({ message: 'Order already fulfilled' }, { status: 200 });
        }

        const paymentMethod =
          paymentData.payment_method?.type ||
          (paymentData.payment_method && typeof paymentData.payment_method === 'string'
            ? paymentData.payment_method
            : 'UPI');

        const cfPaymentId = paymentData.cf_payment_id ? String(paymentData.cf_payment_id) : null;
        const amountPaid = orderData.order_amount || order.amountInInr;

        // Atomic transition: Update Order & Payment status
        await prisma.$transaction([
          prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'PAID',
              paymentMethod,
            },
          }),
          prisma.payment.upsert({
            where: { orderId: order.id },
            update: {
              gateway: 'CASHFREE',
              cfOrderId: orderId,
              cfPaymentId: cfPaymentId || undefined,
              status: 'SUCCESS',
              amountInRupees: amountPaid,
              method: paymentMethod,
              rawWebhookPayload: payload,
            },
            create: {
              orderId: order.id,
              gateway: 'CASHFREE',
              cfOrderId: orderId,
              cfPaymentId: cfPaymentId || undefined,
              status: 'SUCCESS',
              amountInRupees: amountPaid,
              method: paymentMethod,
              rawWebhookPayload: payload,
            },
          }),
        ]);

        // 5. Generate secure signed download token
        const fileKey = order.product.fileKey;
        const buyerEmail = order.user.email;

        const downloadTokenString = generateSignedDownloadToken({
          email: buyerEmail,
          fileKey,
          type: 'paid',
          orderId: order.id,
          expiresInHours: 48,
          maxUsage: 5,
        });

        // Store DownloadToken in DB
        const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
        await prisma.downloadToken.create({
          data: {
            token: downloadTokenString,
            orderId: order.id,
            userId: order.userId,
            expiresAt,
            maxUsageCount: 5,
          },
        });

        // 6. Dispatch transactional email with secure signed link
        const downloadUrl = `${env.APP_URL}/api/download/${downloadTokenString}`;
        sendPurchaseEmail({
          toEmail: buyerEmail,
          orderNumber: order.orderNumber,
          productTitle: order.product.title,
          downloadUrl,
          amountInInr: amountPaid,
        }).catch((emailErr) => {
          console.error(`⚠️ Failed to send order confirmation email for ${orderId}:`, emailErr);
        });

        // 7. Record Audit Event
        await prisma.eventLog.create({
          data: {
            eventName: 'PAYMENT_COMPLETED_CASHFREE',
            eventId: cfPaymentId || `cf_event_${Date.now()}`,
            email: buyerEmail,
            orderId: order.id,
            metadata: {
              amount: amountPaid,
              product: order.product.title,
              paymentMethod,
              cfPaymentId,
            },
          },
        });

        console.log(`✅ Order ${orderId} successfully fulfilled for ${buyerEmail}`);
      } catch (dbErr) {
        console.error(`❌ Error fulfilling order ${orderId} in webhook:`, dbErr);
      }
    } else if (
      eventType === 'PAYMENT_FAILED_WEBHOOK' ||
      eventType === 'USER_DROPPED_WEBHOOK' ||
      paymentData.payment_status === 'FAILED'
    ) {
      try {
        await prisma.order.updateMany({
          where: { id: orderId, status: 'CREATED' },
          data: { status: 'FAILED' },
        });

        await prisma.payment.updateMany({
          where: { orderId },
          data: {
            status: 'FAILED',
            errorDescription: paymentData.payment_message || 'Payment was not completed',
            rawWebhookPayload: payload,
          },
        });
      } catch (err) {
        console.warn('⚠️ Could not update failed order status:', err);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('❌ Cashfree webhook handling exception:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing webhook' },
      { status: 500 }
    );
  }
}

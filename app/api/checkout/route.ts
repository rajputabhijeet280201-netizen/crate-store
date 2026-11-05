import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { PRODUCTS_CONFIG } from '@/config/products';
import { createCashfreeOrder } from '@/lib/cashfree';
import { env } from '@/lib/env';

const checkoutRequestSchema = z.object({
  slug: z.string().min(1, 'Product slug is required'),
  email: z.string().email('Please provide a valid email address').toLowerCase().trim(),
  name: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrer: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = checkoutRequestSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      slug,
      email,
      name,
      phone,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      referrer,
      gclid,
      fbclid,
    } = parseResult.data;

    // 1. Resolve product pricing strictly on the server (Enforcing stripe-best-practices)
    const productConfig = PRODUCTS_CONFIG[slug];
    if (!productConfig) {
      return NextResponse.json(
        { error: `Product with slug '${slug}' was not found.` },
        { status: 404 }
      );
    }

    const priceInInr = productConfig.priceInInr;
    const sanitizedPhone = (phone || '').replace(/\D/g, '').slice(-10) || '9999999999';

    // 2. Database integration: Upsert user, product, and create order record
    let userId: string;
    let productId: string;
    let orderId: string;
    let orderNumber: string;

    const timestamp = Date.now();
    const fallbackOrderId = `order_${slug.slice(0, 8)}_${timestamp}`;
    const generatedOrderNumber = `GN-2026-${timestamp.toString().slice(-4)}`;

    try {
      // Find or create User
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name: name || undefined,
          phone: sanitizedPhone !== '9999999999' ? sanitizedPhone : undefined,
        },
        create: {
          email,
          name: name || 'Student',
          phone: sanitizedPhone !== '9999999999' ? sanitizedPhone : undefined,
        },
      });
      userId = user.id;

      // Ensure Product exists in database
      const dbProduct = await prisma.product.upsert({
        where: { slug: productConfig.slug },
        update: {
          title: productConfig.name,
          description: productConfig.tagline,
          priceInInr: productConfig.priceInInr,
          fileKey: productConfig.storagePath,
          isActive: true,
        },
        create: {
          slug: productConfig.slug,
          title: productConfig.name,
          description: productConfig.tagline,
          priceInInr: productConfig.priceInInr,
          fileKey: productConfig.storagePath,
          isActive: true,
        },
      });
      productId = dbProduct.id;

      // Create Order with CREATED status
      const order = await prisma.order.create({
        data: {
          orderNumber: generatedOrderNumber,
          userId,
          productId,
          amountInInr: priceInInr,
          currency: 'INR',
          status: 'CREATED',
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          utmTerm,
          referrer,
          gclid,
          fbclid,
        },
      });
      orderId = order.id;
      orderNumber = order.orderNumber;
    } catch (dbError) {
      console.warn('⚠️ Database unavailable during order creation, using ephemeral session:', dbError);
      userId = `user_ephemeral_${timestamp}`;
      productId = productConfig.id;
      orderId = fallbackOrderId;
      orderNumber = generatedOrderNumber;
    }

    // 3. Create Cashfree Order via Cashfree PG API (SDK 6.x)
    const cfResult = await createCashfreeOrder({
      orderId,
      orderAmount: priceInInr,
      orderCurrency: 'INR',
      customerId: userId,
      customerName: name || 'Student',
      customerEmail: email,
      customerPhone: sanitizedPhone,
      orderNote: `DevOps Notes: ${productConfig.name}`,
      idempotencyKey: `idemp_${orderId}`,
    });

    if (!cfResult.success) {
      return NextResponse.json(
        {
          error: cfResult.error || 'Failed to initialize payment gateway order',
        },
        { status: 502 }
      );
    }

    // 4. Record Payment attempt in DB
    try {
      await prisma.payment.upsert({
        where: { orderId },
        update: {
          gateway: 'CASHFREE',
          cfOrderId: cfResult.cfOrderId || orderId,
          paymentSessionId: cfResult.paymentSessionId,
          status: 'CREATED',
          amountInRupees: priceInInr,
        },
        create: {
          orderId,
          gateway: 'CASHFREE',
          cfOrderId: cfResult.cfOrderId || orderId,
          paymentSessionId: cfResult.paymentSessionId,
          status: 'CREATED',
          amountInRupees: priceInInr,
        },
      });
    } catch (e) {
      console.warn('⚠️ Could not persist payment record, proceeding with checkout session:', e);
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      paymentSessionId: cfResult.paymentSessionId,
      productTitle: productConfig.name,
      amount: priceInInr,
      isMock: cfResult.isMock || false,
      environment: cfResult.environment || (env.CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox'),
    });
  } catch (err: any) {
    console.error('❌ Checkout API error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error during checkout' },
      { status: 500 }
    );
  }
}

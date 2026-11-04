---
name: cashfree-payment-gateway
description: Best practices and architecture guide for integrating Cashfree Payment Gateway into Next.js App Router and Node.js applications with robust security, idempotency, webhook HMAC verification, and friction-free checkout UX.
---

# Cashfree Payment Gateway Integration Skill

This skill provides architecture guidelines, security rules, and code patterns for integrating **Cashfree Payment Gateway** (PG API version `2023-08-01` and SDK `cashfree-pg` 6.x) into full-stack Next.js and Node.js applications.

It synthesizes industry best practices curated from [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills), specifically adapting:
- **`stripe/stripe-best-practices`**: Zero trust for client prices, idempotent order generation, webhook-first fulfillment state machine, and dual-track status reconciliation.
- **`vercel-labs/next-best-practices`**: Next.js 14 App Router Route Handlers, raw body streaming for HMAC verification, clean server/client boundaries, and client SDK encapsulation.
- **`openai/security-best-practices`**: Timing-safe HMAC-SHA256 signature verification, strict Zod schema validation, environment secret isolation, and defensive logging.
- **`checkout-page/ecommerce-skills`**: Friction-free checkout modal with fallback redirection, transparent INR pricing, UPI prioritization, and instant digital fulfillment.

---

## 1. Core Architectural Principles

### A. Price & Amount Integrity (Never Trust the Client)
- **Rule**: Never accept `amount`, `currency`, or discounts directly from client requests.
- **Implementation**: The client sends only a product identifier or `slug`. The server resolves the price from trusted backend configuration (`config/products.ts` or database) before creating the Cashfree order.

### B. Webhook-First Source of Truth
- **Rule**: Never fulfill orders or grant product access based solely on client-side callbacks or browser redirects.
- **Implementation**: Payment fulfillment must be triggered by verified Cashfree webhooks (`PAYMENT_SUCCESS_WEBHOOK`). Client redirect URLs serve only to inform the user and trigger a fallback status query.

### C. Timing-Safe HMAC-SHA256 Verification
- **Rule**: Cashfree webhooks must be verified using the unparsed raw request body and timestamp header to protect against forgery and timing attacks.
- **Signature formula**: `crypto.createHmac('sha256', CASHFREE_SECRET_KEY).update(timestamp + rawBody).digest('base64')`
- **Constant-time comparison**: Use `crypto.timingSafeEqual` to prevent side-channel timing attacks.

### D. Idempotent Processing
- **Rule**: Webhooks and return callbacks can be delivered multiple times.
- **Implementation**: Check if `Order.status === 'PAID'` before processing tokens or sending emails. Duplicate webhook events must return `200 OK` without re-executing fulfillment logic.

### E. Dual-Track Status Reconciliation
- **Rule**: Network dropouts can delay webhooks while a customer is redirected to the success page.
- **Implementation**: The return page polls or queries `/api/checkout/verify?order_id=...`, which checks local DB first and falls back to Cashfree's `PGFetchOrder` API if the webhook is still in flight.

---

## 2. Cashfree Configuration & Environment

### Required Environment Variables
```env
# Cashfree API Credentials (Test or Production)
CASHFREE_APP_ID="TEST..."
CASHFREE_SECRET_KEY="cfsk_ma_test_..."
CASHFREE_ENV="SANDBOX" # "SANDBOX" or "PRODUCTION"
CASHFREE_API_VERSION="2023-08-01"

# Client-facing environment
NEXT_PUBLIC_CASHFREE_ENV="sandbox" # "sandbox" or "production"
```

### SDK Initialization Pattern (`cashfree-pg` 6.x)
```typescript
import { Cashfree, CFEnvironment } from 'cashfree-pg';

const cfEnvironment =
  process.env.CASHFREE_ENV === 'PRODUCTION'
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

export const cashfree = new Cashfree(
  cfEnvironment,
  process.env.CASHFREE_APP_ID!,
  process.env.CASHFREE_SECRET_KEY!
);
```

---

## 3. Order Creation Pattern (`POST /api/checkout`)

1. Validate input via Zod: `slug`, `email`, `name`, `phone`, marketing UTM parameters.
2. Resolve product details and pricing strictly from backend config.
3. Find or create the `User` in PostgreSQL/Prisma.
4. Generate a unique order number (e.g. `GN-2026-XXXX`).
5. Call Cashfree `PGCreateOrder`:
   ```typescript
   const request = {
     order_id: order.id,
     order_amount: product.priceInInr,
     order_currency: 'INR',
     customer_details: {
       customer_id: user.id,
       customer_name: name || user.name || 'Student',
       customer_email: email,
       customer_phone: phone || '9999999999',
     },
     order_meta: {
       return_url: `${APP_URL}/checkout/success?order_id={order_id}`,
       notify_url: `${APP_URL}/api/webhook/cashfree`,
     },
     order_note: `Purchase of ${product.name}`,
   };

   const cfResponse = await cashfree.PGCreateOrder(request, undefined, idempotencyKey);
   ```
6. Store `paymentSessionId` and `cfOrderId` on the `Payment` record in the database.
7. Return `{ success: true, paymentSessionId: cfResponse.data.payment_session_id, orderId: order.id }`.

---

## 4. Webhook Verification & Handling (`POST /api/webhook/cashfree`)

In Next.js 14 App Router, extract the raw body with `await req.text()`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { cashfree } from '@/lib/cashfree';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature');
    const timestamp = req.headers.get('x-webhook-timestamp');

    if (!signature || !timestamp) {
      return NextResponse.json({ error: 'Missing webhook signature headers' }, { status: 400 });
    }

    // Timing-safe HMAC-SHA256 signature verification
    const secretKey = process.env.CASHFREE_SECRET_KEY!;
    const computedSignature = crypto
      .createHmac('sha256', secretKey)
      .update(timestamp + rawBody)
      .digest('base64');

    const isValid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    );

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.type;
    const orderData = payload.data?.order;
    const paymentData = payload.data?.payment;

    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK' || paymentData?.payment_status === 'SUCCESS') {
      const orderId = orderData.order_id;

      // Idempotency check
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { product: true, user: true },
      });

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }

      if (order.status === 'PAID') {
        return NextResponse.json({ message: 'Order already fulfilled' }, { status: 200 });
      }

      // Mark PAID and fulfill order
      await prisma.$transaction([
        prisma.order.update({
          where: { id: orderId },
          data: { status: 'PAID' },
        }),
        prisma.payment.upsert({
          where: { orderId: order.id },
          update: {
            status: 'SUCCESS',
            cfPaymentId: String(paymentData?.cf_payment_id || ''),
            method: paymentData?.payment_method?.type || 'UPI',
            rawWebhookPayload: payload,
          },
          create: {
            orderId: order.id,
            gateway: 'CASHFREE',
            cfOrderId: orderData.order_id,
            cfPaymentId: String(paymentData?.cf_payment_id || ''),
            status: 'SUCCESS',
            amountInRupees: orderData.order_amount,
            rawWebhookPayload: payload,
          },
        }),
      ]);

      // Fulfill download tokens and send delivery email
      // ...
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

---

## 5. Client Checkout UX Pattern (Cashfree JS SDK v3)

1. Load `https://sdk.cashfree.com/js/v3/cashfree.js`.
2. Initialize with mode: `const cashfree = Cashfree({ mode: "sandbox" | "production" });`.
3. Invoke seamless modal checkout:
   ```javascript
   cashfree.checkout({
     paymentSessionId: sessionData.paymentSessionId,
     redirectTarget: "_modal", // Opens inside an in-page modal popup
   }).then((result) => {
     if (result.error) {
       console.error("Payment error or user cancelled:", result.error);
     }
     if (result.redirect) {
       // Browser redirection occurred
     }
   });
   ```

---

## 6. Common Cashfree Error Codes & Edge Cases

| Error Code | Reason | Remediation |
|---|---|---|
| `order_already_exists` | Re-submitting an existing order ID | Generate unique order IDs (e.g. `cuid()` or timestamped UUIDs). |
| `invalid_signature` | Payload whitespace or wrong secret used | Always verify using raw string `await req.text()`, never `req.json()`. |
| `customer_phone_invalid` | Phone format incorrect | Ensure phone contains 10 valid digits (default placeholder `9999999999` if optional). |
| `session_expired` | User took longer than session TTL (typically 30m) | Prompt user to restart checkout and generate fresh session ID. |

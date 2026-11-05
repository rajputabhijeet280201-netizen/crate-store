import { Cashfree, CFEnvironment } from 'cashfree-pg';
import crypto from 'crypto';
import { env } from './env';

// Determine Cashfree API Environment
const cfEnvironment =
  env.CASHFREE_ENV === 'PRODUCTION'
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

/**
 * Singleton Cashfree PG Client instance (SDK 6.x / API 2023-08-01)
 */
export const cashfreeClient = new Cashfree(
  cfEnvironment,
  env.CASHFREE_APP_ID,
  env.CASHFREE_SECRET_KEY
);

/**
 * Check if actual Cashfree API credentials have been configured
 */
export function isCashfreeConfigured(): boolean {
  return (
    Boolean(env.CASHFREE_APP_ID) &&
    Boolean(env.CASHFREE_SECRET_KEY) &&
    env.CASHFREE_APP_ID !== 'TEST_CF_APP_ID_PLACEHOLDER' &&
    env.CASHFREE_SECRET_KEY !== 'TEST_CF_SECRET_KEY_PLACEHOLDER'
  );
}

export interface CreateOrderParams {
  orderId: string;
  orderAmount: number;
  orderCurrency?: string;
  customerId: string;
  customerName?: string;
  customerEmail: string;
  customerPhone?: string;
  orderNote?: string;
  returnUrl?: string;
  notifyUrl?: string;
  idempotencyKey?: string;
}

export interface CashfreeOrderResponse {
  success: boolean;
  orderId: string;
  paymentSessionId: string;
  orderStatus: string;
  cfOrderId?: string;
  isMock?: boolean;
  error?: string;
}

/**
 * Creates an order on Cashfree Payment Gateway and retrieves the payment_session_id.
 * Follows stripe-best-practices: server-enforced pricing, idempotency, and defense-in-depth.
 */
export async function createCashfreeOrder(
  params: CreateOrderParams
): Promise<CashfreeOrderResponse> {
  const baseUrl =
    env.APP_URL.includes('devopsjeet.tech') && !env.APP_URL.includes('www.')
      ? 'https://www.devopsjeet.tech'
      : env.APP_URL;

  const {
    orderId,
    orderAmount,
    orderCurrency = 'INR',
    customerId,
    customerName = 'Customer',
    customerEmail,
    customerPhone = '9999999999',
    orderNote,
    returnUrl = `${baseUrl}/checkout/success?order_id={order_id}`,
    notifyUrl = `${baseUrl}/api/webhook/cashfree`,
    idempotencyKey,
  } = params;

  // Ensure sanitized 10-digit phone number
  const sanitizedPhone = customerPhone.replace(/\D/g, '').slice(-10) || '9999999999';

  // If in local dev with placeholder credentials, provide a mock session for end-to-end sandbox testing
  if (!isCashfreeConfigured()) {
    console.warn(
      '⚠️ Cashfree API credentials not configured in .env. Returning local mock session for testing.'
    );
    const mockSessionId = `session_mock_${orderId}_${Date.now()}`;
    return {
      success: true,
      orderId,
      paymentSessionId: mockSessionId,
      orderStatus: 'ACTIVE',
      cfOrderId: `cf_${orderId}`,
      isMock: true,
    };
  }

  const createOrderRequest = {
    order_id: orderId,
    order_amount: orderAmount,
    order_currency: orderCurrency,
    customer_details: {
      customer_id: customerId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: sanitizedPhone,
    },
    order_meta: {
      return_url: returnUrl,
      notify_url: notifyUrl,
    },
    order_note: orderNote || `Order #${orderId}`,
  };

  try {
    const response = await cashfreeClient.PGCreateOrder(
      createOrderRequest,
      undefined,
      idempotencyKey || orderId
    );

    const data = response.data;

    return {
      success: true,
      orderId: data.order_id || orderId,
      paymentSessionId: data.payment_session_id || '',
      orderStatus: data.order_status || 'ACTIVE',
      cfOrderId: data.cf_order_id ? String(data.cf_order_id) : undefined,
    };
  } catch (error: any) {
    const errorDetails = error.response?.data || error.message;
    console.error('❌ Cashfree PGCreateOrder failed:', errorDetails);

    return {
      success: false,
      orderId,
      paymentSessionId: '',
      orderStatus: 'FAILED',
      error: error.response?.data?.message || error.message || 'Payment order creation failed',
    };
  }
}

/**
 * Computes Cashfree webhook HMAC-SHA256 signature in Base64
 * Formula: HMAC-SHA256(timestamp + rawBody, secretKey)
 */
export function computeCashfreeSignature(timestamp: string, rawBody: string, secretKey: string): string {
  const payload = timestamp + rawBody;
  return crypto
    .createHmac('sha256', secretKey)
    .update(payload)
    .digest('base64');
}

/**
 * Timing-safe HMAC verification for Cashfree webhooks
 * Enforces openai/security-best-practices: constant-time buffer comparison to prevent timing side-channel attacks.
 */
export function verifyCashfreeWebhookSignature(params: {
  signature: string | null;
  timestamp: string | null;
  rawBody: string;
}): boolean {
  const { signature, timestamp, rawBody } = params;

  if (!signature || !timestamp || !rawBody) {
    return false;
  }

  // If in local development with mock credentials
  if (!isCashfreeConfigured()) {
    if (signature.startsWith('mock_sig_') || signature === 'test_signature_valid') {
      return true;
    }
  }

  try {
    const secretKey = env.CASHFREE_SECRET_KEY;
    const computedSignature = computeCashfreeSignature(timestamp, rawBody, secretKey);

    const sigBuffer = Buffer.from(signature);
    const compBuffer = Buffer.from(computedSignature);

    if (sigBuffer.length !== compBuffer.length) {
      return false;
    }

    return crypto.timingSafeEqual(sigBuffer, compBuffer);
  } catch (err) {
    console.error('❌ Error during webhook timingSafeEqual check:', err);
    return false;
  }
}

export interface FetchOrderResult {
  success: boolean;
  orderId: string;
  orderStatus: string; // 'PAID' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED'
  orderAmount?: number;
  orderCurrency?: string;
  cfOrderId?: string;
  isMock?: boolean;
  error?: string;
}

/**
 * Fetches order details directly from Cashfree API to verify final payment status.
 * Used on return URL as a dual-track fallback to incoming webhooks.
 */
export async function fetchCashfreeOrder(orderId: string): Promise<FetchOrderResult> {
  if (!isCashfreeConfigured()) {
    return {
      success: true,
      orderId,
      orderStatus: 'PAID', // In mock mode, simulate successful checkout verification
      isMock: true,
    };
  }

  try {
    const response = await cashfreeClient.PGFetchOrder(orderId);
    const data = response.data;

    return {
      success: true,
      orderId: data.order_id || orderId,
      orderStatus: data.order_status || 'UNKNOWN',
      orderAmount: data.order_amount,
      orderCurrency: data.order_currency,
      cfOrderId: data.cf_order_id ? String(data.cf_order_id) : undefined,
    };
  } catch (error: any) {
    console.error(`❌ Failed to fetch Cashfree order [${orderId}]:`, error.response?.data || error.message);
    return {
      success: false,
      orderId,
      orderStatus: 'UNKNOWN',
      error: error.response?.data?.message || error.message,
    };
  }
}

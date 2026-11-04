import { describe, it, expect } from 'vitest';
import crypto from 'crypto';
import {
  computeCashfreeSignature,
  verifyCashfreeWebhookSignature,
  createCashfreeOrder,
} from '@/lib/cashfree';
import { PRODUCTS_CONFIG } from '@/config/products';

describe('Cashfree Payment Gateway Integration (Best Practices)', () => {
  const testSecret = 'cfsk_test_secret_key_1234567890abcdef';
  const testTimestamp = '1730559000';
  const testRawBody = JSON.stringify({
    type: 'PAYMENT_SUCCESS_WEBHOOK',
    event_time: '2026-11-02T14:30:00Z',
    data: {
      order: {
        order_id: 'order_test_1001',
        order_amount: 699,
        order_currency: 'INR',
      },
      payment: {
        cf_payment_id: 99887766,
        payment_status: 'SUCCESS',
        payment_amount: 699,
        payment_currency: 'INR',
        payment_method: { type: 'upi' },
      },
    },
  });

  describe('Webhook HMAC-SHA256 Signature Verification (Security Best Practice)', () => {
    it('generates and verifies a valid Cashfree signature matching specification', () => {
      // Formula: HMAC-SHA256(timestamp + rawBody, secretKey) in Base64
      const validSig = crypto
        .createHmac('sha256', process.env.CASHFREE_SECRET_KEY || 'TEST_CF_SECRET_KEY_PLACEHOLDER')
        .update(testTimestamp + testRawBody)
        .digest('base64');

      const isValid = verifyCashfreeWebhookSignature({
        signature: validSig,
        timestamp: testTimestamp,
        rawBody: testRawBody,
      });

      expect(isValid).toBe(true);
    });

    it('rejects tampered signatures', () => {
      const validSig = crypto
        .createHmac('sha256', process.env.CASHFREE_SECRET_KEY || 'TEST_CF_SECRET_KEY_PLACEHOLDER')
        .update(testTimestamp + testRawBody)
        .digest('base64');

      // Tamper signature string
      const tamperedSig = validSig.slice(0, -4) + 'AAAA';

      const isValid = verifyCashfreeWebhookSignature({
        signature: tamperedSig,
        timestamp: testTimestamp,
        rawBody: testRawBody,
      });

      expect(isValid).toBe(false);
    });

    it('rejects tampered raw body payloads (e.g. amount modified from 699 to 1)', () => {
      const validSig = crypto
        .createHmac('sha256', process.env.CASHFREE_SECRET_KEY || 'TEST_CF_SECRET_KEY_PLACEHOLDER')
        .update(testTimestamp + testRawBody)
        .digest('base64');

      const tamperedBody = testRawBody.replace('"order_amount":699', '"order_amount":1');

      const isValid = verifyCashfreeWebhookSignature({
        signature: validSig,
        timestamp: testTimestamp,
        rawBody: tamperedBody,
      });

      expect(isValid).toBe(false);
    });

    it('rejects missing or empty signature/timestamp headers', () => {
      expect(
        verifyCashfreeWebhookSignature({
          signature: null,
          timestamp: testTimestamp,
          rawBody: testRawBody,
        })
      ).toBe(false);

      expect(
        verifyCashfreeWebhookSignature({
          signature: 'some_sig',
          timestamp: null,
          rawBody: testRawBody,
        })
      ).toBe(false);

      expect(
        verifyCashfreeWebhookSignature({
          signature: 'some_sig',
          timestamp: testTimestamp,
          rawBody: '',
        })
      ).toBe(false);
    });
  });

  describe('Server-Enforced Pricing Integrity (stripe-best-practices)', () => {
    it('guarantees tier pricing is strictly resolved from PRODUCTS_CONFIG', () => {
      const starterTier = PRODUCTS_CONFIG['single-topic'];
      const completeTier = PRODUCTS_CONFIG['complete-edition'];
      const lifetimeTier = PRODUCTS_CONFIG['lifetime-bundle'];

      expect(starterTier).toBeDefined();
      expect(starterTier.priceInInr).toBe(299);

      expect(completeTier).toBeDefined();
      expect(completeTier.priceInInr).toBe(699);

      expect(lifetimeTier).toBeDefined();
      expect(lifetimeTier.priceInInr).toBe(999);
    });

    it('correctly creates an order in mock sandbox mode when credentials are unconfigured', async () => {
      const result = await createCashfreeOrder({
        orderId: 'test_order_unit_01',
        orderAmount: 699,
        customerId: 'user_unit_01',
        customerEmail: 'test@example.com',
        customerPhone: '9876543210',
      });

      expect(result.success).toBe(true);
      expect(result.orderId).toBe('test_order_unit_01');
      expect(result.paymentSessionId).toBeDefined();
      expect(result.paymentSessionId.length).toBeGreaterThan(10);
      expect(result.orderStatus).toBe('ACTIVE');
    });
  });
});

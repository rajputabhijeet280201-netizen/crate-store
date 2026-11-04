import { describe, it, expect } from 'vitest';
import {
  generateSignedDownloadToken,
  verifySignedDownloadToken,
} from '@/lib/token';

describe('Signed Download Tokens (HMAC-SHA256)', () => {
  it('generates a valid signed token that can be successfully verified', () => {
    const token = generateSignedDownloadToken({
      email: 'buyer@devopswithjeet.in',
      fileKey: 'products/devopswithjeet-complete-devops-notes.pdf',
      type: 'paid',
      orderId: 'DWJ-2026-1001',
      expiresInHours: 48,
    });

    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);

    const verification = verifySignedDownloadToken(token);
    expect(verification.valid).toBe(true);
    expect(verification.payload).toBeDefined();
    expect(verification.payload?.email).toBe('buyer@devopswithjeet.in');
    expect(verification.payload?.fileKey).toBe('products/devopswithjeet-complete-devops-notes.pdf');
    expect(verification.payload?.type).toBe('paid');
    expect(verification.payload?.orderId).toBe('DWJ-2026-1001');
    expect(verification.payload?.maxUsage).toBe(5);
  });

  it('rejects tampered tokens with invalid signature', () => {
    const token = generateSignedDownloadToken({
      email: 'student@example.com',
      fileKey: 'samples/free-sample.pdf',
      type: 'sample',
    });

    const [header, payload, signature] = token.split('.');
    // Tamper with the signature
    const tamperedSig = signature.substring(0, signature.length - 2) + 'xx';
    const tamperedToken = `${header}.${payload}.${tamperedSig}`;

    const result = verifySignedDownloadToken(tamperedToken);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid or forged');
  });

  it('rejects expired tokens when exp is in the past', () => {
    // Generate token with negative expiration (-1 hour)
    const token = generateSignedDownloadToken({
      email: 'student@example.com',
      fileKey: 'samples/free-sample.pdf',
      expiresInHours: -1,
    });

    const result = verifySignedDownloadToken(token);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('expired');
  });

  it('handles malformed tokens gracefully without crashing', () => {
    const badTokens = ['', 'not-a-token', 'header.only', 'a.b.c.d'];
    for (const bad of badTokens) {
      const result = verifySignedDownloadToken(bad);
      expect(result.valid).toBe(false);
    }
  });
});

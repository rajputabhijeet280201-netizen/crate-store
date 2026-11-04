import crypto from 'crypto';
import { env } from './env';

export interface TokenPayload {
  email: string;
  fileKey: string;
  type: 'paid' | 'sample';
  orderId?: string;
  exp: number; // Unix epoch seconds
  maxUsage: number;
}

const SECRET = env.DOWNLOAD_TOKEN_SECRET || 'dev-secret-key-at-least-16-characters-long';

/**
 * Base64URL encode buffer/string.
 */
function base64UrlEncode(data: string | Buffer): string {
  const buf = typeof data === 'string' ? Buffer.from(data, 'utf8') : data;
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Base64URL decode string.
 */
function base64UrlDecode(data: string): string {
  let base64 = data.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return Buffer.from(base64, 'base64').toString('utf8');
}

/**
 * Generates a tamper-proof signed token for secure file downloads.
 * Format: `<header>.<payload>.<signature>`
 */
export function generateSignedDownloadToken(params: {
  email: string;
  fileKey: string;
  type?: 'paid' | 'sample';
  orderId?: string;
  expiresInHours?: number;
  maxUsage?: number;
}): string {
  const expiresInHours = params.expiresInHours ?? 48;
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'GNDL' }));
  const payload = base64UrlEncode(
    JSON.stringify({
      email: params.email.toLowerCase().trim(),
      fileKey: params.fileKey,
      type: params.type || 'paid',
      orderId: params.orderId,
      exp,
      maxUsage: params.maxUsage ?? 5,
    }),
  );

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${header}.${payload}.${signature}`;
}

export interface VerifyTokenResult {
  valid: boolean;
  payload?: TokenPayload;
  error?: string;
}

/**
 * Verifies the integrity, signature, and expiration of a signed download token.
 * Uses timing-safe string comparison to prevent timing attacks.
 */
export function verifySignedDownloadToken(token: string): VerifyTokenResult {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Token is required' };
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid token structure' };
  }

  const [header, payload, signature] = parts;

  // Compute expected signature
  const expectedSig = crypto
    .createHmac('sha256', SECRET)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  // Timing safe comparison
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);

  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false, error: 'Invalid or forged download token signature' };
  }

  try {
    const decodedPayload: TokenPayload = JSON.parse(base64UrlDecode(payload));
    const now = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp && decodedPayload.exp < now) {
      return { valid: false, error: 'Download token has expired (48h limit reached)', payload: decodedPayload };
    }

    return { valid: true, payload: decodedPayload };
  } catch {
    return { valid: false, error: 'Malformed token payload' };
  }
}

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as handleSampleLead } from '@/app/api/leads/sample/route';
import { GET as handleDownload } from '@/app/api/download/[token]/route';
import { generateSignedDownloadToken } from '@/lib/token';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      create: vi.fn().mockResolvedValue({ id: 'mock_lead_123' }),
    },
    downloadToken: {
      findUnique: vi.fn().mockResolvedValue(null),
      create: vi.fn().mockResolvedValue({ id: 'mock_token_123' }),
      update: vi.fn().mockResolvedValue({ id: 'mock_token_123' }),
    },
  },
}));

describe('Phase 2: Free Sample Lead Flow & Secure Download Delivery', () => {
  it('rejects lead submissions without mandatory DPDP Act consent', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads/sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'user@example.com',
        consentFlag: false,
      }),
    });

    const res = await handleSampleLead(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toBe('Validation failed');
  });

  it('rejects invalid email formats', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads/sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email-string',
        consentFlag: true,
      }),
    });

    const res = await handleSampleLead(req);
    expect(res.status).toBe(400);
  });

  it('accepts valid lead submission and returns success with secure downloadUrl', async () => {
    const req = new NextRequest('http://localhost:3000/api/leads/sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'prospect@devopswithjeet.in',
        name: 'Arjun',
        consentFlag: true,
        source: 'landing_hero',
      }),
    });

    const res = await handleSampleLead(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.message).toContain('dispatched successfully');
    expect(data.downloadUrl).toBeDefined();
    expect(data.downloadUrl).toContain('/api/download/');
  });

  it('streams PDF with Cache-Control: no-store and Content-Disposition when valid token is provided', async () => {
    const token = generateSignedDownloadToken({
      email: 'buyer@devopswithjeet.in',
      fileKey: 'samples/devopswithjeet-free-sample-chapter.pdf',
      type: 'sample',
      expiresInHours: 48,
    });

    const req = new NextRequest(`http://localhost:3000/api/download/${token}`);
    const res = await handleDownload(req, { params: { token } });

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/pdf');
    expect(res.headers.get('Cache-Control')).toContain('no-store');
    expect(res.headers.get('Content-Disposition')).toContain('attachment');
  }, 15000);

  it('returns 400 for tampered download token', async () => {
    const req = new NextRequest('http://localhost:3000/api/download/tampered-token-123');
    const res = await handleDownload(req, { params: { token: 'tampered-token-123' } });

    expect(res.status).toBe(400);
    expect(res.headers.get('Cache-Control')).toBe('no-store');
  });

  it('returns 410 for expired download token', async () => {
    const expiredToken = generateSignedDownloadToken({
      email: 'buyer@devopswithjeet.in',
      fileKey: 'samples/devopswithjeet-free-sample-chapter.pdf',
      expiresInHours: -2, // expired 2 hours ago
    });

    const req = new NextRequest(`http://localhost:3000/api/download/${expiredToken}`);
    const res = await handleDownload(req, { params: { token: expiredToken } });

    expect(res.status).toBe(410);
  });
});

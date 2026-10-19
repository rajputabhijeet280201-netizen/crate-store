import * as React from 'react';

interface DownloadEmailProps {
  buyerEmail: string;
  productName: string;
  downloadUrl: string;
  expiresInHours: number;
  orderNumber: string;
}

export function DownloadEmailTemplate({
  buyerEmail,
  productName,
  downloadUrl,
  expiresInHours = 48,
  orderNumber,
}: DownloadEmailProps) {
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#10201C', lineHeight: 1.6 }}>
      <h1 style={{ color: '#C2410C' }}>Thank you for your order!</h1>
      <p>Hi there,</p>
      <p>
        Your order <strong>#{orderNumber}</strong> for <strong>{productName}</strong> has been
        successfully confirmed.
      </p>
      <p>
        Click the secure button below to download your watermarked study notes (PDF). This link
        is unique to <strong>{buyerEmail}</strong> and will expire in{' '}
        <strong>{expiresInHours} hours</strong> (maximum 5 download attempts).
      </p>
      <div style={{ margin: '30px 0' }}>
        <a
          href={downloadUrl}
          style={{
            backgroundColor: '#C2410C',
            color: '#FFFFFF',
            padding: '14px 28px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block',
          }}
        >
          Download Your PDF Notes
        </a>
      </div>
      <p style={{ fontSize: '13px', color: '#52605B' }}>
        If the button does not work, copy and paste this link into your browser:
        <br />
        <a href={downloadUrl} style={{ color: '#C2410C' }}>
          {downloadUrl}
        </a>
      </p>
      <hr style={{ border: 'none', borderTop: '1px solid #E2E6DF', margin: '30px 0' }} />
      <p style={{ fontSize: '12px', color: '#52605B' }}>
        Need help? Reply to this email or contact support@growthnotes.in
      </p>
    </div>
  );
}

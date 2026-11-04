import { env } from './env';

interface SendPurchaseEmailParams {
  toEmail: string;
  orderNumber: string;
  productTitle: string;
  downloadUrl: string;
  amountInInr: number;
}

export async function sendPurchaseEmail({
  toEmail,
  orderNumber,
  productTitle,
  downloadUrl,
  amountInInr,
}: SendPurchaseEmailParams): Promise<{ success: boolean; id?: string; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey.includes('placeholder') || apiKey === 're_123456789') {
    console.log(
      `ℹ️ [Dev Mode] RESEND_API_KEY not configured. Simulated purchase email to ${toEmail} for order ${orderNumber}. Download Link: ${downloadUrl}`
    );
    return { success: true, id: `mock_email_${Date.now()}` };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [toEmail],
        subject: `🎉 Your DevOps Notes Download & Receipt (Order #${orderNumber})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; line-height: 1.6;">
            <div style="background-color: #0e593a; padding: 24px; border-radius: 12px; text-align: center; color: white;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Thank You for Your Order!</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Order #${orderNumber} Confirmed</p>
            </div>
            
            <div style="padding: 24px 0;">
              <p>Hi there,</p>
              <p>Your payment of <strong>₹${amountInInr}</strong> for <strong>${productTitle}</strong> has been successfully processed.</p>
              <p>Your package includes <strong>two complete editions</strong>: hand-drawn visual architectural blueprints plus 100% searchable code &amp; command fieldbooks.</p>
              
              <div style="text-align: center; margin: 32px 0;">
                <a href="${downloadUrl}" style="background-color: #0e593a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  📥 Download Complete Package (ZIP — Both Formats)
                </a>
              </div>

              <div style="text-align: center; margin: 16px 0; font-size: 13px;">
                <span style="color: #64748b;">Or download individual formats directly:</span><br />
                <a href="${downloadUrl}?format=visual" style="color: #0e593a; font-weight: bold; text-decoration: underline; margin-right: 16px;">🎨 Visual Infographics (PDF)</a>
                <a href="${downloadUrl}?format=html" style="color: #0e593a; font-weight: bold; text-decoration: underline;">💻 Searchable Fieldbook (PDF)</a>
              </div>
              
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 24px 0; font-size: 13px; color: #475569;">
                <p style="margin: 0 0 6px 0;"><strong>Security & Usage Note:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>This link will remain active for <strong>48 hours</strong>.</li>
                  <li>You can download the files up to <strong>5 times</strong>.</li>
                  <li>Licensed for your personal educational use only.</li>
                </ul>
              </div>

              <p style="font-size: 13px; color: #64748b;">
                If the button above does not work, copy and paste this direct URL into your browser:<br />
                <a href="${downloadUrl}" style="color: #0e593a; word-break: break-all;">${downloadUrl}</a>
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            
            <div style="font-size: 12px; color: #94a3b8; text-align: center;">
              <p style="margin: 0 0 4px 0;">DevOps with Jeet • Digital Learning</p>
              <p style="margin: 0;">Need assistance? Reply directly to this email or write to <a href="mailto:support@devopsjeet.tech" style="color: #64748b;">support@devopsjeet.tech</a></p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('❌ Resend API error:', errorText);
      return { success: false, error: errorText };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (err: any) {
    console.error('❌ Failed to dispatch purchase email via Resend:', err);
    return { success: false, error: err.message || 'Unknown network error' };
  }
}


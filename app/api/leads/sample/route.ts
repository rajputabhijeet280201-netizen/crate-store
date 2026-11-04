import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { generateSignedDownloadToken } from '@/lib/token';
import { env } from '@/lib/env';

const leadSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  name: z.string().max(100).optional(),
  source: z.string().default('free_sample_section'),
  consentFlag: z.boolean().refine((val) => val === true, {
    message: 'DPDP Act consent is mandatory to receive study samples',
  }),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmContent: z.string().optional(),
  utmTerm: z.string().optional(),
  referrer: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsed = leadSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parsed.error.format(),
        },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const samplePath = 'samples/devopswithjeet-free-sample-chapter.pdf';

    // 1. Generate signed token valid for 48h (same mechanism as paid downloads)
    const token = generateSignedDownloadToken({
      email: data.email,
      fileKey: samplePath,
      type: 'sample',
      expiresInHours: 48,
      maxUsage: 5,
    });

    const downloadUrl = `${env.APP_URL}/api/download/${token}`;

    // 2. Persist Lead in DB if database is reachable
    try {
      await prisma.lead.create({
        data: {
          email: data.email,
          name: data.name || null,
          source: data.source,
          consentFlag: data.consentFlag,
          consentTimestamp: new Date(),
          sampleSentAt: new Date(),
          utmSource: data.utmSource,
          utmMedium: data.utmMedium,
          utmCampaign: data.utmCampaign,
          utmContent: data.utmContent,
          utmTerm: data.utmTerm,
          referrer: data.referrer,
        },
      });
    } catch (dbErr) {
      // In local dev without active DB container, log and proceed gracefully
      console.warn('[Leads API] DB persistence skipped or unreachable:', dbErr instanceof Error ? dbErr.message : dbErr);
    }

    // 3. Dispatch email or log in development
    if (process.env.RESEND_API_KEY && !process.env.RESEND_API_KEY.includes('placeholder')) {
      try {
        // Send email via Resend if credentials configured
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.RESEND_FROM_EMAIL,
            to: [data.email],
            subject: '📖 Your Free DevOps with Jeet Sample Chapter is Ready',
            html: `
              <h2>Hi ${data.name || 'there'},</h2>
              <p>Thank you for requesting the free sample chapter from <strong>DevOps with Jeet</strong>.</p>
              <p>Click below to download your watermarked sample PDF (link expires in 48 hours):</p>
              <p><a href="${downloadUrl}" style="background-color: #0284c7; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Download Free Sample Chapter</a></p>
              <p style="font-size: 12px; color: #666; margin-top: 24px;">DevOps with Jeet • Concise, Hands-on DevOps & Cloud Study Notes</p>
            `,
          }),
        });

        if (!res.ok) {
          console.error('[Resend Error]', await res.text());
        }
      } catch (emailErr) {
        console.error('[Email Dispatch Error]', emailErr);
      }
    } else {
      console.log(`[Dev Lead Sample Dispatched] Email: ${data.email} | Secure Link: ${downloadUrl}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Sample chapter dispatched successfully! Check your email.',
      downloadUrl: process.env.NODE_ENV !== 'production' ? downloadUrl : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

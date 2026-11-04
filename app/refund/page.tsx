import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Refund & Cancellation Policy — ${SITE_CONFIG.name}`,
  description: 'Digital study notes refund policy and support terms.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-surface px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-12">
        <Link
          href="/"
          className="text-xs font-semibold text-accent hover:underline focus-visible:outline-accent"
        >
          ← Back to DevOps with Jeet
        </Link>

        <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
          Refund &amp; Cancellation Policy
        </h1>
        <p className="mt-2 text-xs text-muted">
          Last updated: November 2026 • Effective for all digital purchases on {SITE_CONFIG.name}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
          <section>
            <h2 className="text-base font-bold text-ink">1. Nature of Digital Goods</h2>
            <p className="mt-2">
              Our study notes are downloadable PDF goods delivered instantly upon payment. Because
              digital files cannot be returned or revoked once downloaded, purchases are generally
              considered non-refundable. Please review our free sample chapter prior to purchase.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">2. Technical Delivery Guarantee</h2>
            <p className="mt-2">
              If you experience any technical defect, corrupted download file, or failed delivery email,
              contact our team at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent underline">
                {SITE_CONFIG.supportEmail}
              </a>{' '}
              with your order number. We will reissue active download links or resolve the issue
              within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">3. Duplicate Deductions</h2>
            <p className="mt-2">
              If an amount was deducted twice from your account due to a payment gateway timeout, the
              duplicate payment is automatically refunded back to your original payment method within
              5–7 business days as per Cashfree standard bank timelines.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

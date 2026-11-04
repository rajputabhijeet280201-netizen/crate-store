import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Terms & Conditions — ${SITE_CONFIG.name}`,
  description: 'Terms of service and digital purchase agreements for DevOps with Jeet.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-12">
        <Link
          href="/"
          className="text-xs font-semibold text-accent hover:underline focus-visible:outline-accent"
        >
          ← Back to DevOps with Jeet
        </Link>

        <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Terms &amp; Conditions</h1>
        <p className="mt-2 text-xs text-muted">
          Governed by the Information Technology Act, 2000 &amp; Indian Contract Act • Last updated: November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
          <section>
            <h2 className="text-base font-bold text-ink">1. Digital Products &amp; Licensing</h2>
            <p className="mt-2">
              All digital study notes, PDF blueprints, templates, and materials provided on{' '}
              {SITE_CONFIG.name} are licensed for personal, single-user educational use only.
              Redistribution, resale, sharing, or public hosting of watermarked files is strictly
              prohibited under the Indian Copyright Act, 1957.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">2. Payments &amp; Delivery</h2>
            <p className="mt-2">
              All transactions are processed securely in Indian Rupees (INR) via Cashfree. Digital
              download links are generated immediately upon verified payment capture.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">3. Limitation of Liability</h2>
            <p className="mt-2">
              The study notes provided are educational references based on industry best practices.
              We do not guarantee specific career outcomes, exam pass rates, or job placements.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">4. Governing Law</h2>
            <p className="mt-2">
              These terms are governed by the laws of India, and any disputes shall be subject to the
              jurisdiction of the courts of Noida / New Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

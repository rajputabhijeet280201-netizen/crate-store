import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Privacy Policy (DPDP Act) — ${SITE_CONFIG.name}`,
  description: 'Digital Personal Data Protection Act compliance and privacy practices.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-12">
        <Link
          href="/"
          className="text-xs font-semibold text-accent hover:underline focus-visible:outline-accent"
        >
          ← Back to DevOps with Jeet
        </Link>

        <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-xs text-muted">
          Compliant with India&apos;s Digital Personal Data Protection (DPDP) Act, 2023 • Last updated: November 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-ink/80">
          <section>
            <h2 className="text-base font-bold text-ink">1. Data We Collect</h2>
            <p className="mt-2">
              We collect your email address, billing details (processed by Cashfree), and technical
              interaction data (UTM attribution parameters) strictly to deliver your digital purchases
              and generate personalized PDF watermarks for anti-piracy protection.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">2. Purpose-Specific Consent (DPDP Act)</h2>
            <p className="mt-2">
              Under India&apos;s Digital Personal Data Protection Act, 2023, we only process your personal
              data for specified educational delivery purposes upon your affirmative consent. You have
              the right to withdraw consent or request deletion at any time by emailing{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent underline">
                {SITE_CONFIG.supportEmail}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-ink">3. Third-Party Processors</h2>
            <p className="mt-2">
              We never sell or rent your personal information. Data is shared solely with trusted
              infrastructure providers: Cashfree (payment processing), Resend (transactional email),
              and Supabase/PostgreSQL (secure database).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

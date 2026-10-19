import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';

export const metadata = {
  title: `Contact & Support — ${SITE_CONFIG.name}`,
  description: 'Customer support and grievance officer contact details for GrowthNotes.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface px-4 py-12 text-ink sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-12">
        <Link
          href="/"
          className="text-xs font-semibold text-accent hover:underline focus-visible:outline-accent"
        >
          ← Back to GrowthNotes Store
        </Link>

        <h1 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">Contact &amp; Support</h1>
        <p className="mt-2 text-sm text-muted">
          We are here to assist you with order inquiries, download links, and study queries.
        </p>

        <div className="mt-8 space-y-6">
          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
              Direct Email Support
            </h2>
            <p className="mt-2 text-base font-semibold text-ink">
              [CONTACT EMAIL]:{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent underline">
                {SITE_CONFIG.supportEmail}
              </a>
            </p>
            <p className="mt-1 text-xs text-muted">
              Average response time: Under 4 hours on working days.
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
              Operating Entity Details
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              <strong>Entity Name:</strong> {SITE_CONFIG.businessName}
              <br />
              <strong>Registered Office:</strong> {SITE_CONFIG.businessAddress}
              <br />
              <strong>Jurisdiction:</strong> India
            </p>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface p-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-accent">
              Grievance Redressal (DPDP Act, 2023)
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              For any data privacy concerns, consent withdrawal, or grievances under the Digital
              Personal Data Protection Act, please contact our designated Grievance Officer at{' '}
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="text-accent underline">
                {SITE_CONFIG.supportEmail}
              </a>{' '}
              with the subject line &quot;Data Grievance&quot;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

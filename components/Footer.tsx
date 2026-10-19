import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { CONTENT_CONFIG } from '@/config/content';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Address Column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ink focus-visible:outline-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-serif text-lg font-bold text-white">
                G
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-ink">
                {SITE_CONFIG.name}
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted">{SITE_CONFIG.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-muted/80">
              <strong>Business Entity:</strong> {SITE_CONFIG.businessName}
              <br />
              <strong>Operating Address:</strong> {SITE_CONFIG.businessAddress}
              <br />
              <strong>Support:</strong> {SITE_CONFIG.supportEmail}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              Navigation
            </span>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#whats-inside"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  What&apos;s Inside
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Pricing &amp; Editions
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Verified Feedback
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#sample-chapter"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Free Sample Chapter
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages (Phase 8 compliant links) */}
          <div className="md:col-span-4">
            <span className="text-xs font-bold uppercase tracking-wider text-ink">
              Legal &amp; Compliance
            </span>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Contact &amp; Grievance Redressal
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-[11px] text-muted/70">
              Note: All legal terms subject to Indian Jurisdiction (DPDP Act 2023 &amp; IT Act 2000).
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 border-t border-ink/10 pt-6 text-xs text-muted/70">
          <p>{CONTENT_CONFIG.footer.disclaimer}</p>
          <div className="mt-3 flex flex-col justify-between gap-2 sm:flex-row">
            <p>{CONTENT_CONFIG.footer.copyright}</p>
            <p>Made for high-retention learning in India 🇮🇳</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

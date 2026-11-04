import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { CONTENT_CONFIG } from '@/config/content';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Special Shoutout to KodeKloud (matching k8s.devopshari.codes) */}
        <div className="mb-10 rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🙌</span>
            <div className="text-xs sm:text-sm text-muted leading-relaxed">
              <strong className="text-ink">Special Shoutout to KodeKloud:</strong> Inspired by and
              designed to accompany the world-class hands-on cloud and DevOps learning pathways on{' '}
              <strong className="text-ink">KodeKloud</strong>. Our visual handbooks and architecture
              blueprints are created to help students master hands-on Kubernetes, Linux, and cloud
              concepts faster.
            </div>
          </div>

          {/* Trust Stat Pills */}
          <div className="mt-4 pt-4 border-t border-ink/10 flex flex-wrap items-center justify-around gap-3 text-center text-xs font-bold text-ink">
            <div className="flex items-center gap-1.5">
              <span>📚</span>
              <span>11 Visual Handbooks &amp; 971+ Blueprints</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span>⚡</span>
              <span>Instant Lifetime Access</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-600">
              <span>⭐</span>
              <span>4.9/5 Student Rating</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Brand & Address Column */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-ink focus-visible:outline-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-serif text-lg font-bold text-white">
                D
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
                  href="#roadmap"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Visual Roadmap (9 Milestones)
                </a>
              </li>
              <li>
                <a
                  href="#whats-inside"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Curriculum Modules
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-muted transition hover:text-ink focus-visible:outline-accent"
                >
                  Pricing &amp; Bundles
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
            <div className="flex items-center gap-3">
              <a href="#pricing" className="hover:underline">Pricing &amp; Bundles</a>
              <span>•</span>
              <a href="#faq" className="hover:underline">FAQ</a>
              <span>•</span>
              <a href={`mailto:${SITE_CONFIG.supportEmail}`} className="hover:underline">{SITE_CONFIG.supportEmail}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

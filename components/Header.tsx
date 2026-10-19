import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { CONTENT_CONFIG } from '@/config/content';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-ink focus-visible:outline-accent"
          aria-label={`${SITE_CONFIG.name} Home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink font-serif text-xl font-bold text-white transition group-hover:bg-accent">
            G
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-ink">
            {SITE_CONFIG.name}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main Navigation">
          <a
            href="#whats-inside"
            className="text-sm font-medium text-ink/80 transition hover:text-accent focus-visible:outline-accent"
          >
            What&apos;s Inside
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-ink/80 transition hover:text-accent focus-visible:outline-accent"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium text-ink/80 transition hover:text-accent focus-visible:outline-accent"
          >
            Proof
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-ink/80 transition hover:text-accent focus-visible:outline-accent"
          >
            FAQ
          </a>
        </nav>

        {/* Header CTA Button (44px min touch target) */}
        <div className="flex items-center gap-3">
          <a
            href="#sample-chapter"
            className="hidden text-sm font-medium text-ink transition hover:text-accent focus-visible:outline-accent sm:inline-block"
          >
            Free Sample
          </a>
          <a
            href="#pricing"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover focus-visible:outline-accent"
          >
            {CONTENT_CONFIG.header.ctaButton}
          </a>
        </div>
      </div>
    </header>
  );
}

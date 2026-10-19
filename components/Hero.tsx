import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';
import { ProductMockup } from './ProductMockup';

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="relative overflow-hidden border-b border-ink/10 bg-surface px-4 py-12 sm:px-6 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines & High-Conversion CTAs */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Urgency / Freshness Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>{CONTENT_CONFIG.hero.badge}</span>
            </div>

            {/* Main Headline (Instrument Serif) */}
            <h1 className="mt-4 font-serif text-3xl font-normal leading-[1.15] text-ink sm:text-5xl lg:text-6xl">
              {CONTENT_CONFIG.hero.headline}
            </h1>

            {/* Subhead (DM Sans) */}
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg lg:max-w-xl">
              {CONTENT_CONFIG.hero.subheadline}
            </p>

            {/* CTAs (Min 44px touch targets) */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-start">
              <a
                href="#pricing"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-accent px-8 py-3.5 text-center text-base font-bold text-white shadow-lg transition hover:bg-accent-hover focus-visible:outline-accent sm:w-auto"
              >
                {CONTENT_CONFIG.hero.primaryCta}
              </a>

              <a
                href="#sample-chapter"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-ink/20 bg-white px-6 py-3.5 text-center text-base font-semibold text-ink transition hover:border-ink hover:bg-surface focus-visible:outline-accent sm:w-auto"
              >
                {CONTENT_CONFIG.hero.secondaryCta}
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-muted lg:justify-start">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">⚡</span> Instant PDF Download
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">🔒</span> UPI &amp; Cards (Razorpay)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">📱</span> Watermarked for Safety
              </span>
            </div>
          </div>

          {/* Right Column: Visual Product Mockup */}
          <div className="lg:col-span-5">
            <ProductMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

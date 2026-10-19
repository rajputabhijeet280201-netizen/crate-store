import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function FinalCtaBand() {
  const { headline, subheadline, buttonText } = CONTENT_CONFIG.finalCta;

  return (
    <section
      aria-label="Final Call To Action"
      className="relative overflow-hidden bg-ink px-4 py-16 text-center text-white sm:px-6 sm:py-24"
    >
      {/* Background Accent Gradient */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[600px] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-highlight border border-white/20">
          Instant Digital Access
        </span>
        <h2 className="mt-4 font-serif text-3xl font-normal leading-tight sm:text-5xl lg:text-6xl text-white">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-[#E2E6DF]/80 sm:text-lg">
          {subheadline}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#pricing"
            className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-accent px-10 py-4 text-center text-lg font-bold text-white shadow-xl transition hover:bg-accent-hover focus-visible:outline-white sm:w-auto"
          >
            {buttonText}
          </a>
        </div>

        <p className="mt-4 text-xs text-[#E2E6DF]/60">
          ⚡ 100% Secure Checkout via UPI &amp; Cards • Immediate PDF link delivered
        </p>
      </div>
    </section>
  );
}

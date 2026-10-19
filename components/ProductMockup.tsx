import React from 'react';

export function ProductMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg select-none">
      {/* Background glow */}
      <div
        className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-highlight/10 to-transparent blur-2xl"
        aria-hidden="true"
      />

      {/* Main Digital Book / Tablet Mockup */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-ink/10 bg-white p-4 shadow-2xl transition hover:shadow-3xl sm:p-6">
        {/* Top Status / Book Header */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
            PDF E-Book • 350+ Pages
          </span>
          <span className="text-xs font-medium text-muted">v2026.4</span>
        </div>

        {/* Notes Cover Visual Preview */}
        <div className="mt-4 rounded-xl border border-ink/10 bg-[#10201C] p-6 text-white sm:p-8">
          <div className="flex items-center justify-between text-xs text-highlight font-semibold tracking-wider">
            <span>GROWTHNOTES STUDY SERIES</span>
            <span>EDITION #10</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-bold leading-tight sm:text-3xl text-white">
            Digital Marketing
            <br />
            <span className="text-highlight">Master Notes</span>
          </h3>

          <p className="mt-2 text-xs text-[#E2E6DF]/80 sm:text-sm">
            Battle-tested frameworks for Performance Marketing, SEO, Funnels, GA4 & Retention.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <span className="text-highlight font-bold">MODULE 01–04</span>
              <p className="text-white/80">Meta & Google Ads Scaling</p>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <span className="text-highlight font-bold">MODULE 05–08</span>
              <p className="text-white/80">SEO, Intent & Copywriting</p>
            </div>
          </div>

          {/* Realistic Buyer Watermark indicator */}
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] text-white/50">
            <span>🔒 Secure Watermarked Copy</span>
            <span>buyer@example.com</span>
          </div>
        </div>

        {/* Floating Quick Feature Badge */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
          <div className="flex items-center gap-1.5 font-medium text-ink">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[10px]">✓</span>
            <span>Clean Visual Diagrams</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-ink">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[10px]">✓</span>
            <span>Step-by-Step SOPs</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-ink">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[10px]">✓</span>
            <span>Print & Mobile Friendly</span>
          </div>
        </div>
      </div>
    </div>
  );
}

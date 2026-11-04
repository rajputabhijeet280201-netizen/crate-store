'use client';

import React from 'react';
import { ArrowRight, Download, ShieldCheck, Zap, Layers, Cpu, BookOpen } from 'lucide-react';

export function Hero() {
  const scrollToPricing = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#pricing';
    }
  };

  const scrollToPreview = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('notes-preview') || document.getElementById('whats-inside');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#notes-preview';
    }
  };

  return (
    <section
      id="hero"
      aria-label="DevOps & MLOps Notes Overview"
      className="relative overflow-hidden bg-[#f9faf7] px-4 py-10 sm:px-6 sm:py-16 lg:py-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    >
      {/* Subtle topographic / orbital background contour arcs on the right */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 select-none opacity-40 overflow-visible"
        aria-hidden="true"
      >
        <svg
          width="700"
          height="700"
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="350"
            cy="350"
            r="320"
            stroke="#059669"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="350"
            cy="350"
            r="240"
            stroke="#059669"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="350"
            cy="350"
            r="160"
            stroke="#059669"
            strokeOpacity="0.20"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <circle
            cx="350"
            cy="350"
            r="80"
            stroke="#059669"
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          {/* Left Column: Headlines, Pitch & CTAs */}
          <div className="lg:col-span-7">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/80 bg-emerald-50/70 px-3.5 py-1 text-[11px] font-bold tracking-wider text-emerald-800 uppercase sm:text-xs">
              <span>16 VISUAL FIELD GUIDES</span>
              <span className="text-emerald-500 font-black">•</span>
              <span>1,804 PAGES</span>
              <span className="text-emerald-500 font-black">•</span>
              <span>5 PRODUCTION PHASES</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[62px] xl:text-[68px] leading-[1.08]">
              DevOps &amp; MLOps
              <br />
              notes that finally
              <br />
              <span className="text-[#0a5c36]">make sense.</span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg lg:text-xl leading-relaxed">
              1,804 pages of real diagrams, practical commands, and battle-tested production workflows you can master and keep open right beside your terminal.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#notes-preview"
                onClick={scrollToPreview}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#0e593a] px-6 py-3.5 text-center text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#0a452d] hover:shadow-md focus-visible:outline-emerald-600"
              >
                <span>Look inside the notes</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <a
                href="#pricing"
                onClick={scrollToPricing}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-center text-sm sm:text-base font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-emerald-600"
              >
                Unlock All-Access (1,804p) for ₹999
              </a>
            </div>

            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-slate-600">
              <span className="inline-flex items-center gap-2">
                <Download className="h-4 w-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
                <span>Instant ZIP with 16 Handbooks</span>
              </span>

              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
                <span>Secure Cashfree UPI &amp; Cards</span>
              </span>

              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
                <span>One-time purchase, lifetime access</span>
              </span>
            </div>
          </div>

          {/* Right Column: Library Comparison Card Container */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)]">
              {/* Header inside Card */}
              <div className="flex items-start justify-between gap-2 mb-5">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 sm:text-xs">
                    CHOOSE YOUR TRACK
                  </p>
                  <h3 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    Compare all three options
                  </h3>
                </div>

                <span className="shrink-0 rounded-full border border-emerald-100 bg-[#edf5f0] px-3 py-1 text-xs font-semibold text-emerald-800">
                  One-time payment
                </span>
              </div>

              {/* Stack of 3 Library Options */}
              <div className="space-y-3 sm:space-y-3.5">
                {/* 1. Starter Pack */}
                <div className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-[#f9faf8] p-3.5 sm:p-4 transition hover:border-emerald-300/80 hover:bg-[#f3f7f4]">
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200/50 bg-emerald-100/70 text-emerald-700">
                      <BookOpen className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        Linux &amp; Git Starter Pack
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-tight">
                        Phase 1 • 2 Handbooks • 109 pages
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & CTA */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <span className="block text-xs text-slate-400 line-through leading-tight">
                        ₹999
                      </span>
                      <span className="block text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                        ₹299
                      </span>
                    </div>

                    <a
                      href="#pricing"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center rounded-xl bg-[#0e593a] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a452d] whitespace-nowrap"
                    >
                      Choose →
                    </a>
                  </div>
                </div>

                {/* 2. All-Access Master Pass (Featured / Best Value) */}
                <div className="relative flex items-center justify-between rounded-2xl border border-emerald-950 bg-[#0e271c] p-3.5 sm:p-4 text-white shadow-lg transition hover:bg-[#112f22]">
                  {/* Floating Best Value Pill Badge */}
                  <div className="absolute -top-2.5 right-6">
                    <span className="inline-block rounded-full bg-[#f59e0b] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-sm">
                      BEST VALUE • 1,804 PAGES
                    </span>
                  </div>

                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-800/40 bg-[#071c13] text-amber-400">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                        All-Access Master Pass
                      </h4>
                      <p className="text-xs text-emerald-200/80 font-medium leading-tight">
                        All 16 Handbooks • Phases 1–5
                      </p>
                    </div>
                  </div>

                  {/* Right: Price, Savings & CTA */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <span className="block text-xs text-emerald-300/50 line-through leading-tight">
                        ₹3,999
                      </span>
                      <span className="block text-2xl sm:text-3xl font-extrabold text-white leading-none">
                        ₹999
                      </span>
                      <span className="block text-[10px] sm:text-[11px] font-semibold text-emerald-400 leading-tight mt-0.5">
                        Save ₹3,000 (75%)
                      </span>
                    </div>

                    <a
                      href="#pricing"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center rounded-xl bg-[#f3ba53] px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-sm transition hover:bg-[#ebb046] whitespace-nowrap"
                    >
                      Get all 16 →
                    </a>
                  </div>
                </div>

                {/* 3. DevOps Complete Track */}
                <div className="group flex items-center justify-between rounded-2xl border border-slate-200/90 bg-[#fafafb] p-3.5 sm:p-4 transition hover:border-emerald-300/80 hover:bg-[#f6fbf7]">
                  {/* Left: Icon & Info */}
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-200/50 bg-emerald-100/70 text-emerald-700">
                      <Layers className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        DevOps Complete Track
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-tight">
                        Phases 1–4 • 9 Handbooks • 865 pages
                      </p>
                    </div>
                  </div>

                  {/* Right: Price & CTA */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="text-right">
                      <span className="block text-xs text-slate-400 line-through leading-tight">
                        ₹1,999
                      </span>
                      <span className="block text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                        ₹699
                      </span>
                    </div>

                    <a
                      href="#pricing"
                      onClick={scrollToPricing}
                      className="inline-flex items-center justify-center rounded-xl bg-[#0e593a] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a452d] whitespace-nowrap"
                    >
                      Choose →
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                  </span>
                  <span>Instant ZIP delivery after secure Cashfree payment</span>
                </div>

                <a
                  href="#pricing"
                  onClick={scrollToPricing}
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 whitespace-nowrap"
                >
                  Start with Linux &amp; Git for ₹299 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

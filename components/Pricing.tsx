'use client';

import React, { useState } from 'react';
import { PRODUCTS_CONFIG, PRODUCTS_LIST, formatInr } from '@/config/products';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CashfreeCheckoutModal } from './CashfreeCheckoutModal';

interface PricingProps {
  onSelectProduct?: (slug: string) => void;
}

export function Pricing({ onSelectProduct }: PricingProps) {
  const [selectedSlug, setSelectedSlug] = useState<string>('complete-edition');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutSlug, setCheckoutSlug] = useState<string>('complete-edition');

  const handleTierSelect = (slug: string) => {
    setSelectedSlug(slug);
    setCheckoutSlug(slug);
    setIsCheckoutOpen(true);
    if (onSelectProduct) {
      onSelectProduct(slug);
    }
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative overflow-hidden border-b border-slate-200/90 bg-[#fbfbf8] px-4 py-16 sm:px-6 sm:py-24"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading matching devopshari.codes screenshot */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-700">
            CHOOSE BY YOUR GOAL
          </span>

          <h2
            id="pricing-heading"
            className="mt-3 font-sans text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            Three options. One easy decision.
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Pick the track that matches your work today—or choose All Access if you want the full infrastructure-to-AI path.
          </p>

          {/* Track Switcher Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PRODUCTS_LIST.map((product) => {
              const isSelected = product.slug === selectedSlug;
              const shortName =
                product.slug === 'single-topic'
                  ? 'Starter Pack (Phase 1)'
                  : product.slug === 'complete-edition'
                  ? 'DevOps Track (Phases 1–4)'
                  : 'All-Access (Phases 1–5)';

              return (
                <button
                  key={product.slug}
                  type="button"
                  onClick={() => handleTierSelect(product.slug)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition focus-visible:outline-emerald-600 ${
                    isSelected
                      ? 'bg-[#0e593a] text-white shadow-md'
                      : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{shortName}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-xs font-black ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {formatInr(product.priceInInr)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {PRODUCTS_LIST.map((product) => {
            const isBestValue = !!product.isPopular;
            const isSelected = product.slug === selectedSlug;
            const isPurple = product.slug === 'lifetime-bundle';

            return (
              <div
                key={product.slug}
                id={`tier-${product.slug}`}
                onClick={() => setSelectedSlug(product.slug)}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 cursor-pointer ${
                  isBestValue
                    ? 'border-2 border-emerald-950 bg-[#0e271c] text-white shadow-2xl ring-4 ring-amber-400/20 lg:-translate-y-2'
                    : isPurple
                    ? 'border-2 border-purple-200/90 bg-white text-slate-900 shadow-md hover:border-purple-300 hover:shadow-xl'
                    : 'border-2 border-emerald-200/90 bg-white text-slate-900 shadow-md hover:border-emerald-300 hover:shadow-xl'
                }`}
              >
                {/* Popular / Best Value Badge for Featured Card */}
                {isBestValue && (
                  <div className="absolute -top-3.5 right-6">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f59e0b] px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-950 shadow-md">
                      <span>★</span> {product.badge || 'BEST VALUE • MOST POPULAR'}
                    </span>
                  </div>
                )}

                {!isBestValue && product.badge && (
                  <div className="mb-2">
                    <span
                      className={`inline-block rounded-md px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        isPurple ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Category Tracker Tag */}
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                      isBestValue
                        ? 'text-emerald-400'
                        : isPurple
                        ? 'text-purple-700'
                        : 'text-emerald-700'
                    }`}
                  >
                    {product.slug === 'single-topic'
                      ? 'PHASE 1: FOUNDATIONS'
                      : product.slug === 'complete-edition'
                      ? 'PHASES 1–4: DEVOPS TRACK'
                      : 'PHASES 1–5: ALL-ACCESS MASTER PASS'}
                  </span>

                  <h3
                    className={`font-sans text-2xl sm:text-3xl font-extrabold tracking-tight ${
                      isBestValue ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {product.name}
                  </h3>

                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isBestValue ? 'text-emerald-100/80' : 'text-slate-600'
                    }`}
                  >
                    {product.tagline}
                  </p>

                  {/* Dual Format Indicator */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        isBestValue
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : isPurple
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      🎨 Visual Blueprints
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-bold ${
                        isBestValue
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : isPurple
                          ? 'bg-slate-100 text-slate-700 border border-slate-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      💻 Searchable Code
                    </span>
                  </div>

                  {/* Price Block */}
                  <div
                    className={`mt-6 pb-6 border-b ${
                      isBestValue ? 'border-white/15' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span
                        className={`font-sans text-4xl sm:text-5xl font-extrabold tracking-tight ${
                          isBestValue ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {formatInr(product.priceInInr)}
                      </span>
                      <span
                        className={`text-sm font-semibold line-through ${
                          isBestValue ? 'text-emerald-300/50' : 'text-slate-400'
                        }`}
                      >
                        {formatInr(product.originalPriceInInr)}
                      </span>
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-bold ${
                          isBestValue
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                            : isPurple
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        SAVE{' '}
                        {Math.round(
                          ((product.originalPriceInInr - product.priceInInr) /
                            product.originalPriceInInr) *
                            100
                        )}
                        %
                      </span>
                    </div>

                    <span
                      className={`mt-1.5 block text-xs font-medium ${
                        isBestValue ? 'text-emerald-200/70' : 'text-slate-500'
                      }`}
                    >
                      One-time payment • Instant lifetime access
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="mt-6 space-y-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block ${
                        isBestValue ? 'text-emerald-300/90' : 'text-slate-700'
                      }`}
                    >
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span
                            aria-hidden="true"
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              isBestValue
                                ? 'bg-emerald-900 text-emerald-300'
                                : isPurple
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            ✓
                          </span>
                          <span
                            className={`leading-snug ${
                              isBestValue ? 'text-emerald-100/90' : 'text-slate-700'
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Buy Button & Preview Link */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTierSelect(product.slug);
                    }}
                    className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 py-3.5 text-center text-sm sm:text-base font-bold shadow-sm transition gap-2 ${
                      isBestValue
                        ? 'bg-[#f3ba53] hover:bg-[#ebb046] text-slate-950 shadow-lg'
                        : isPurple
                        ? 'bg-[#6d4bc2] hover:bg-[#5b3da6] text-white'
                        : 'bg-[#0e593a] hover:bg-[#0a452d] text-white'
                    }`}
                  >
                    <span>{product.ctaText}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  <div className="mt-3 flex items-center justify-center">
                    <a
                      href="#notes-preview"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('notes-preview');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`inline-flex items-center gap-1 text-xs font-bold hover:underline ${
                        isBestValue ? 'text-amber-300' : 'text-emerald-700'
                      }`}
                    >
                      <span>🔍 Preview sample pages</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Payment Security Footer */}
        <div className="mt-14 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 text-center shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Secure Cashfree Checkout</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-600" />
              <span>Instant PDF Download Delivered to Email</span>
            </span>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <span>UPI, Netbanking &amp; All Major Cards Accepted</span>
          </div>
        </div>
      </div>

      {/* Cashfree Modal Dialog */}
      <CashfreeCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedSlug={checkoutSlug}
      />
    </section>
  );
}

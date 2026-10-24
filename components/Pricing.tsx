'use client';

import React from 'react';
import { PRODUCTS_LIST, formatInr } from '@/config/products';

interface PricingProps {
  onSelectProduct?: (slug: string) => void;
}

export function Pricing({ onSelectProduct }: PricingProps) {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="border-b border-ink/10 bg-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20">
            Transparent Pricing in INR
          </span>
          <h2
            id="pricing-heading"
            className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl lg:text-5xl"
          >
            Invest Once, Keep Forever
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            No recurring subscriptions or hidden fees. Instant watermarked PDF downloads sent straight
            to your email &amp; accessible on your mobile screen.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {PRODUCTS_LIST.map((product) => {
            const isBestValue = !!product.isPopular;

            return (
              <div
                key={product.slug}
                className={`relative flex flex-col justify-between rounded-3xl p-6 transition sm:p-8 ${
                  isBestValue
                    ? 'border-2 border-accent bg-white shadow-2xl ring-4 ring-accent/10 -translate-y-2'
                    : 'border border-ink/10 bg-white/80 shadow-sm hover:border-ink/20 hover:shadow-md'
                }`}
              >
                {/* Popular / Best Value Badge */}
                {isBestValue && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-black uppercase tracking-wider text-white shadow-md">
                      {product.badge || 'MOST POPULAR • BEST VALUE'}
                    </span>
                  </div>
                )}

                {!isBestValue && product.badge && (
                  <div className="mb-2">
                    <span className="inline-block rounded-md bg-ink/5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-muted">
                      {product.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{product.tagline}</p>

                  {/* Price Block */}
                  <div className="mt-6 border-b border-ink/10 pb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                        {formatInr(product.priceInInr)}
                      </span>
                      <span className="text-sm font-semibold text-muted line-through">
                        {formatInr(product.originalPriceInInr)}
                      </span>
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                        SAVE{' '}
                        {Math.round(
                          ((product.originalPriceInInr - product.priceInInr) /
                            product.originalPriceInInr) *
                            100
                        )}
                        %
                      </span>
                    </div>
                    <span className="mt-1 block text-xs text-muted">
                      One-time payment • Instant PDF delivery
                    </span>
                  </div>

                  {/* Feature List */}
                  <div className="mt-6 space-y-3 text-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-ink/70">
                      What&apos;s Included:
                    </span>
                    <ul className="space-y-2.5">
                      {product.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-ink/90">
                          <span
                            aria-hidden="true"
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700"
                          >
                            ✓
                          </span>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Excluded items (for lower tiers) */}
                    {product.notIncluded && product.notIncluded.length > 0 && (
                      <div className="pt-2">
                        <ul className="space-y-2 text-muted/70 text-xs">
                          {product.notIncluded.map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span aria-hidden="true" className="shrink-0 text-muted/40">
                                ✕
                              </span>
                              <span className="line-through">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Buy Button (Min 44px touch target) */}
                <div className="mt-8 pt-4">
                  <button
                    type="button"
                    onClick={() => onSelectProduct && onSelectProduct(product.slug)}
                    className={`inline-flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 py-3.5 text-center text-base font-bold shadow-sm transition focus-visible:outline-accent ${
                      isBestValue
                        ? 'bg-accent text-white shadow-lg hover:bg-accent-hover'
                        : 'border-2 border-ink/20 bg-surface text-ink hover:border-ink hover:bg-white'
                    }`}
                  >
                    {product.ctaText}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-muted">
                    ⚡ Instant WhatsApp &amp; Email download link
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Accepted Payment Methods */}
        <div className="mt-14 rounded-2xl border border-ink/10 bg-white p-6 text-center sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wider text-muted">
            100% Secure Checkout via Razorpay • All Indian Payment Methods Accepted
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-ink/80">
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              Google Pay
            </span>
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              PhonePe
            </span>
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              Paytm
            </span>
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              BHIM UPI
            </span>
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              Debit &amp; Credit Cards (Visa / Mastercard / RuPay)
            </span>
            <span className="rounded-lg border border-ink/10 bg-surface px-3 py-1.5">
              Netbanking (50+ Banks)
            </span>
          </div>
          <p className="mt-3 text-xs text-muted">
            🔒 256-Bit SSL Encrypted • Zero card details stored on our servers
          </p>
        </div>
      </div>
    </section>
  );
}

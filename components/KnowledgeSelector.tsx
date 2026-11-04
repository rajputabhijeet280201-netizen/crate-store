'use client';

import React, { useState } from 'react';
import { formatInr } from '@/config/products';

export interface KnowledgeTier {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  title: string;
  description: string;
  targetSlug: string;
  handbookCount: number;
  blueprintCount: number;
}

const KNOWLEDGE_TIERS: KnowledgeTier[] = [
  {
    id: 'nothing',
    name: 'Complete Beginner / All-Access',
    price: 999,
    originalPrice: 3999,
    discount: '75% OFF',
    title: 'All-Access Master Pass: DevOps + MLOps + GenAI',
    description: 'Perfect for serious career switchers. Start from Linux & Git fundamentals all the way to Docker, Kubernetes, CI/CD, AWS, and Production MLOps with PyTorch & SageMaker.',
    targetSlug: 'lifetime-bundle',
    handbookCount: 16,
    blueprintCount: 1804,
  },
  {
    id: 'container',
    name: 'Basic Systems / Intermediate',
    price: 699,
    originalPrice: 1999,
    discount: '65% OFF',
    title: 'DevOps Engineering Complete Track (Phases 1–4)',
    description: 'For engineers who know the basics. Includes 9 Handbooks covering Docker mastery, Kubernetes production scenarios, GitHub Actions CI/CD, AWS architecture, 75 interview scenarios, and 40 troubleshooting labs.',
    targetSlug: 'complete-edition',
    handbookCount: 9,
    blueprintCount: 865,
  },
  {
    id: 'kubernetes',
    name: 'Core Foundations Only',
    price: 299,
    originalPrice: 999,
    discount: '70% OFF',
    title: 'Phase 1: Linux & Git Starter Pack',
    description: 'Solidify your operating system fundamentals, /etc and /proc internals, systemd services, process signals, and Git DAG tree/blob architecture.',
    targetSlug: 'single-topic',
    handbookCount: 2,
    blueprintCount: 109,
  },
];

export function KnowledgeSelector() {
  const [selectedTierId, setSelectedTierId] = useState<string>('container');

  const activeTier =
    KNOWLEDGE_TIERS.find((tier) => tier.id === selectedTierId) || KNOWLEDGE_TIERS[1];

  const handleScrollToPricing = (slug: string) => {
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    // Update hash for pricing selection
    window.location.hash = `#pricing-${slug}`;
  };

  return (
    <section className="bg-surface border-b border-ink/10 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-medium text-muted">
          <a href="#" className="hover:text-accent transition">Home</a>
          <span className="text-muted/60">›</span>
          <span className="hover:text-accent transition">Learning Paths</span>
          <span className="text-muted/60">›</span>
          <span className="font-semibold text-ink">Kubernetes Administrator</span>
        </nav>

        {/* Section Heading */}
        <div className="mt-4">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-5xl">
            Kubernetes Administrator <span className="text-accent">Learning Path</span>
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base max-w-3xl">
            The <strong>Kubernetes Administrator Learning Path</strong> is designed to equip individuals
            with the skills necessary to become proficient Kubernetes administrators. This learning path offers
            a comprehensive journey that provides a solid foundation in DevOps practices, containerization,
            and production Kubernetes administration skills.
          </p>
        </div>

        {/* "I KNOW:" Level Selector */}
        <div className="mt-8 rounded-2xl border border-ink/10 bg-white p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-black uppercase tracking-wider text-muted sm:min-w-[70px]">
              I KNOW:
            </span>
            <div className="flex flex-wrap items-center gap-2.5">
              {KNOWLEDGE_TIERS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition focus-visible:outline-accent ${
                      isSelected
                        ? 'bg-ink text-white shadow-md ring-2 ring-ink/20'
                        : 'border border-ink/15 bg-surface text-ink hover:border-ink/40 hover:bg-white'
                    }`}
                  >
                    <span>{tier.name}</span>
                    <span
                      className={`rounded px-1.5 py-0.5 text-xs font-extrabold ${
                        isSelected ? 'bg-amber-400 text-black' : 'bg-ink/10 text-ink/80'
                      }`}
                    >
                      {formatInr(tier.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Offer Callout Banner */}
          <div className="mt-6 rounded-xl border border-amber-300/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/50 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-black text-amber-900 border border-amber-500/30">
                  <span>🪔</span> {activeTier.discount}
                </div>
                <h3 className="mt-2 text-base sm:text-lg font-bold text-ink">
                  {activeTier.title} for only{' '}
                  <span className="text-accent font-extrabold">{formatInr(activeTier.price)}</span>
                  <span className="ml-2 text-xs font-semibold text-muted line-through">
                    {formatInr(activeTier.originalPrice)}
                  </span>
                </h3>
                <p className="mt-1 text-xs text-muted max-w-xl">
                  {activeTier.description}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleScrollToPricing(activeTier.targetSlug)}
                  className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-accent-hover focus-visible:outline-accent"
                >
                  ⚡ Unlock {activeTier.handbookCount} Handbooks ({formatInr(activeTier.price)})
                </button>
              </div>
            </div>

            {/* Guarantees Bar */}
            <div className="mt-4 pt-3 border-t border-amber-200/60 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 text-xs font-semibold text-amber-950">
              <span className="flex items-center gap-1">
                <span className="text-emerald-700">✓</span> Instant Vector PDF
              </span>
              <span className="text-amber-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-700">✓</span> {activeTier.blueprintCount}+ Blueprints
              </span>
              <span className="text-amber-300 hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="text-emerald-700">✓</span> Instant Lifetime Access
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

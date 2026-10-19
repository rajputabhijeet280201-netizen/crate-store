'use client';

import React, { useEffect, useState } from 'react';
import { PRODUCTS_CONFIG, formatInr } from '@/config/products';

export function StickyMobileBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar only when hero is NOT intersecting (scrolled out of view)
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  const lowestPrice = PRODUCTS_CONFIG['single-topic']?.priceInInr || 299;

  return (
    <div
      role="region"
      aria-label="Quick Purchase Bar"
      className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-ink/10 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-accent">
            Master Digital Marketing
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-muted">From</span>
            <span className="text-lg font-black text-ink">{formatInr(lowestPrice)}</span>
            <span className="text-[11px] text-emerald-600 font-semibold">• Instant PDF</span>
          </div>
        </div>

        <a
          href="#pricing"
          className="inline-flex min-h-[48px] min-w-[130px] items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-center text-sm font-bold text-white shadow-md transition active:scale-95 hover:bg-accent-hover focus-visible:outline-accent"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
}

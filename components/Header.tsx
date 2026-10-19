import React from 'react';
import { SITE_CONFIG } from '@/config/site';
import { CONTENT_CONFIG } from '@/config/content';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-ink">
            {SITE_CONFIG.name}
          </span>
        </div>
        <a
          href="#pricing"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg bg-accent px-4 py-2 font-medium text-white shadow-sm transition hover:bg-accent-hover focus-visible:outline-accent"
        >
          {CONTENT_CONFIG.header.ctaButton}
        </a>
      </div>
    </header>
  );
}

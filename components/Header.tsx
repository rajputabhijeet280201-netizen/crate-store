'use client';

import React from 'react';
import Link from 'next/link';

export function Header() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-emerald-600"
          aria-label="Fieldnotes DevOps + MLOps Home"
        >
          {/* Green 3-line Notes Icon */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-600/30 bg-emerald-50/80 text-emerald-700 transition group-hover:border-emerald-600 group-hover:bg-emerald-100">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </div>

          <div className="flex flex-col">
            <span className="font-sans text-[15px] font-extrabold tracking-wider text-slate-900 leading-none">
              FIELDNOTES
            </span>
            <span className="font-sans text-[9.5px] font-bold tracking-widest text-emerald-700 leading-none mt-1">
              DEVOPS + MLOPS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main Navigation">
          <a
            href="#notes-preview"
            onClick={scrollTo('notes-preview')}
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline-emerald-600"
          >
            Look inside
          </a>
          <a
            href="#tracks"
            onClick={scrollTo('tracks')}
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline-emerald-600"
          >
            Choose a track
          </a>
          <a
            href="#whats-inside"
            onClick={scrollTo('whats-inside')}
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline-emerald-600"
          >
            All courses
          </a>
          <a
            href="#faq"
            onClick={scrollTo('faq')}
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900 focus-visible:outline-emerald-600"
          >
            FAQ
          </a>
        </nav>

        {/* Header CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="#pricing"
            onClick={scrollTo('pricing')}
            className="inline-flex min-h-[42px] items-center justify-center gap-2.5 rounded-xl bg-[#0e593a] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a452d] focus-visible:outline-emerald-600"
          >
            <span>Get All-Access</span>
            <span className="text-white/40 font-normal">|</span>
            <span>₹999</span>
          </a>
        </div>
      </div>
    </header>
  );
}

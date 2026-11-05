'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Eye, ArrowRight, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { PRODUCTS_CONFIG, ProductTier, formatInr } from '@/config/products';

export function NotesPreview() {
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [activePageIndex, setActivePageIndex] = useState<number>(0);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('complete-edition');
  const [activeFormat, setActiveFormat] = useState<'visual' | 'code'>('visual');

  const visualPages = [
    '/previews/linux-infographic-p1.webp',
    '/previews/linux-infographic-p2.webp',
    '/previews/docker-infographic-p1.webp',
    '/previews/docker-infographic-p2.webp',
    '/previews/git-infographic-p1.webp',
    '/previews/git-infographic-p2.webp',
  ];

  const codePages = [
    '/previews/single-topic/page-1.webp',
    '/previews/single-topic/page-2.webp',
    '/previews/complete-edition/page-1.webp',
    '/previews/complete-edition/page-2.webp',
    '/previews/complete-edition/page-3.webp',
    '/previews/complete-edition/page-4.webp',
  ];

  const currentPages = activeFormat === 'visual' ? visualPages : codePages;
  const totalPages = currentPages.length;

  const handlePrevPage = useCallback(() => {
    setActivePageIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  }, [totalPages]);

  const handleNextPage = useCallback(() => {
    setActivePageIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  }, [totalPages]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') {
        handlePrevPage();
      } else if (e.key === 'ArrowRight') {
        handleNextPage();
      } else if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrevPage, handleNextPage]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const openSampleAt = (pageIdx: number, format: 'visual' | 'code' = activeFormat) => {
    setActiveFormat(format);
    setActivePageIndex(pageIdx);
    setIsLightboxOpen(true);
  };

  const scrollToPricing = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const el = document.getElementById('pricing');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#pricing';
    }
  };

  const currentPreviewPath = currentPages[activePageIndex] || currentPages[0];

  return (
    <section
      id="notes-preview"
      aria-label="Notebook Visual Preview"
      className="relative overflow-hidden bg-[#fbfbf8] px-4 py-16 sm:px-6 sm:py-24"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(16, 185, 129, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(16, 185, 129, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }}
    >
      {/* Authentic Notebook Vertical Red/Pink Margin Line */}
      <div
        className="pointer-events-none absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1.5px] bg-red-400/30"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-emerald-700">
              OPEN THE NOTEBOOK • DUAL-FORMAT ENGINE
            </span>
            <h2 className="mt-2 font-sans text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              See what you&apos;re buying.
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-slate-600 leading-relaxed lg:pb-1">
            Every topic includes <strong>both formats</strong>. Toggle below to compare hand-drawn visual mental models with searchable code fieldbooks.
          </p>
        </div>

        {/* Dual-Format Toggle Switch */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => {
                setActiveFormat('visual');
                setActivePageIndex(0);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition ${activeFormat === 'visual'
                  ? 'bg-[#0e593a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <span>🎨 Visual Infographics</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${activeFormat === 'visual'
                    ? 'bg-emerald-800 text-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                  }`}
              >
                Diagrams
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveFormat('code');
                setActivePageIndex(0);
              }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold transition ${activeFormat === 'code'
                  ? 'bg-[#0e593a] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <span>💻 Searchable Fieldbooks</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase ${activeFormat === 'code'
                    ? 'bg-emerald-800 text-emerald-200'
                    : 'bg-slate-100 text-slate-600'
                  }`}
              >
                Code &amp; Commands
              </span>
            </button>
          </div>
        </div>

        {/* 3 Realistic Taped Notebook Cards Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-8 items-stretch">
          {activeFormat === 'visual' ? (
            <>
              {/* Card 1: Visual Linux Systems */}
              <div
                onClick={() => openSampleAt(1, 'visual')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 -rotate-1 rounded-xs border-y border-amber-300/80 bg-amber-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[1350/1800] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/linux-infographic-p2.webp"
                      alt="Linux for DevOps Visual Infographic Note"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Visual Blueprint
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    01. Linux Systems &amp; Terminal
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-[#854d0e] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    visual blueprint ↗
                  </span>
                </div>
              </div>

              {/* Card 2: Visual Docker Architecture */}
              <div
                onClick={() => openSampleAt(3, 'visual')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 rotate-1.5 rounded-xs border-y border-sky-300/80 bg-sky-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[918/1224] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/docker-infographic-p2.webp"
                      alt="Docker Architecture & Isolation Infographic Note"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Visual Blueprint
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    02. Docker Container Architecture
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-[#854d0e] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    visual blueprint ↗
                  </span>
                </div>
              </div>

              {/* Card 3: Visual Git Workflows */}
              <div
                onClick={() => openSampleAt(5, 'visual')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 -rotate-1 rounded-xs border-y border-emerald-300/80 bg-emerald-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[648/972] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/git-infographic-p2.webp"
                      alt="Git & GitHub Pro Workflow Infographic Note"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Visual Blueprint
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    03. Git &amp; GitHub Branching Pro
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-[#854d0e] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    visual blueprint ↗
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Card 1: Code Linux Fieldbook */}
              <div
                onClick={() => openSampleAt(0, 'code')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 -rotate-1 rounded-xs border-y border-emerald-300/80 bg-emerald-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[900/1273] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/single-topic/page-1.webp"
                      alt="Linux Complete Fieldbook Searchable Reference"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Code &amp; Commands
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    01. Linux Systems Fieldbook
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    searchable code ↗
                  </span>
                </div>
              </div>

              {/* Card 2: Code Docker Working Guide */}
              <div
                onClick={() => openSampleAt(3, 'code')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 rotate-1.5 rounded-xs border-y border-amber-300/80 bg-amber-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[900/1273] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/complete-edition/page-2.webp"
                      alt="Docker Working Guide Searchable Code"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Code &amp; Commands
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    02. Docker Working Guide
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    searchable code ↗
                  </span>
                </div>
              </div>

              {/* Card 3: Code Kubernetes Incident Scenarios */}
              <div
                onClick={() => openSampleAt(4, 'code')}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_-8px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden"
              >
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 h-6 w-24 -rotate-1 rounded-xs border-y border-sky-300/80 bg-sky-200/80 shadow-xs backdrop-blur-[1px] pointer-events-none"
                  aria-hidden="true"
                />
                <div className="p-3 sm:p-4 pt-6 bg-[#fafaf7] border-b border-slate-200/80 flex-1 flex flex-col items-center">
                  <div className="relative aspect-[900/1273] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-inner">
                    <Image
                      src="/previews/complete-edition/page-3.webp"
                      alt="Kubernetes Incident Production Scenarios"
                      width={600}
                      height={800}
                      className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                        <ZoomIn className="h-3.5 w-3.5" /> Inspect Code &amp; Commands
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3.5 bg-white">
                  <span className="font-sans text-sm sm:text-base font-bold text-slate-900">
                    03. Kubernetes Incident Scenarios
                  </span>
                  <span className="font-serif italic text-xs sm:text-sm font-medium text-emerald-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    searchable code ↗
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons & Trust Line under the 3 cards */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          <button
            type="button"
            onClick={() => openSampleAt(0)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#142e22] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#0c1f17] focus-visible:outline-emerald-600"
          >
            <Eye className="h-4 w-4" />
            <span>Open 6-page sample</span>
          </button>

          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0e593a] px-6 py-3.5 text-sm sm:text-base font-semibold text-white shadow-sm transition hover:bg-[#0a452d] focus-visible:outline-emerald-600"
          >
            <span>Browse all 16 handbooks</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2">
            <span className="font-serif italic text-xs sm:text-sm font-medium text-[#854d0e]">
              no signup · real pages · inspect before buying
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox / Enlarged Sample Reader Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sample Chapter Reader"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm transition-opacity"
        >
          <div className="relative flex max-h-[95vh] w-full max-w-4xl flex-col items-center">
            {/* Modal Top Header */}
            <div className="flex w-full items-center justify-between pb-3 text-white">
              <div className="flex items-center gap-3">
                <span className="font-sans text-sm sm:text-base font-bold">
                  {activeFormat === 'visual' ? '🎨 Visual Blueprint Edition' : '💻 Searchable Code Fieldbook'} — Page {activePageIndex + 1} of {totalPages}
                </span>
                <span className="rounded bg-emerald-600/80 px-2 py-0.5 text-xs font-semibold">
                  Sample Preview
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close sample preview"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 focus-visible:outline-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* High-Resolution Sample Page Image */}
            <div className="relative aspect-[900/1273] w-full max-h-[75vh] overflow-hidden rounded-xl bg-white shadow-2xl">
              <Image
                src={currentPreviewPath}
                alt={`Sample preview page ${activePageIndex + 1}`}
                width={900}
                height={1273}
                priority
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal Controls Bar */}
            <div className="mt-4 flex w-full max-w-lg items-center justify-between">
              <button
                type="button"
                onClick={handlePrevPage}
                className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActivePageIndex(idx)}
                    className={`h-2 rounded-full transition-all ${activePageIndex === idx ? 'w-6 bg-emerald-400' : 'w-2 bg-white/30'
                      }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextPage}
                className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

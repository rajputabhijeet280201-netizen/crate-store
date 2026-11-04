'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Handbook } from '@/config/roadmap';
import { formatInr } from '@/config/products';

interface HandbookModalProps {
  handbook: Handbook | null;
  mode: 'details' | 'preview';
  onClose: () => void;
  onSelectBundle?: () => void;
}

export function HandbookModal({
  handbook,
  mode,
  onClose,
  onSelectBundle,
}: HandbookModalProps) {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);

  useEffect(() => {
    setActivePreviewIndex(0);
  }, [handbook]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (handbook) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handbook, onClose]);

  if (!handbook) return null;

  const previewPages =
    handbook.previewPages && handbook.previewPages.length > 0
      ? handbook.previewPages
      : ['/previews/complete-edition/page-1.webp'];

  const isPhase1 = handbook.id === 'linux-fieldbook' || handbook.id === 'git-fieldbook';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl border border-ink/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-ink/10 bg-surface px-6 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-bold text-accent">
                {handbook.category}
              </span>
              {handbook.tag && (
                <span className="rounded-md bg-amber-500/20 px-2 py-0.5 text-xs font-extrabold text-amber-800">
                  {handbook.tag}
                </span>
              )}
            </div>
            <h2 id="modal-title" className="mt-1 font-serif text-xl sm:text-2xl font-bold text-ink">
              {handbook.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Key Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 rounded-xl bg-surface p-4 text-center border border-ink/5">
            <div>
              <span className="block text-xl font-extrabold text-ink">{handbook.blueprints}+</span>
              <span className="text-xs text-muted font-medium">Architecture Blueprints</span>
            </div>
            <div>
              <span className="block text-xl font-extrabold text-ink">{handbook.pages}</span>
              <span className="text-xs text-muted font-medium">Illustrated Pages</span>
            </div>
            <div>
              <span className="block text-xl font-extrabold text-emerald-700">
                {formatInr(handbook.price)}
              </span>
              <span className="text-xs text-muted font-medium">
                {isPhase1 ? 'In Starter Pack (₹299)' : 'In Complete Track (₹699)'}
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs if in preview */}
          {mode === 'preview' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Interactive Preview Sample (Page {activePreviewIndex + 1} of {previewPages.length})
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePreviewIndex((prev) =>
                        prev > 0 ? prev - 1 : previewPages.length - 1
                      )
                    }
                    className="rounded border border-ink/15 px-2 py-1 text-xs font-bold hover:bg-surface"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePreviewIndex((prev) =>
                        prev < previewPages.length - 1 ? prev + 1 : 0
                      )
                    }
                    className="rounded border border-ink/15 px-2 py-1 text-xs font-bold hover:bg-surface"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Page Visual Container */}
              <div className="relative aspect-[3/4] w-full max-w-lg mx-auto overflow-hidden rounded-xl border border-ink/15 bg-zinc-100 shadow-md">
                <Image
                  src={previewPages[activePreviewIndex]}
                  alt={`${handbook.title} Preview Page ${activePreviewIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 500px"
                  unoptimized
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted">{handbook.description}</p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-2">
                  What You Will Master:
                </h4>
                <ul className="space-y-2">
                  {handbook.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink/90">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                        ✓
                      </span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Value Recommendation Box */}
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="rounded bg-amber-200 px-2 py-0.5 text-[11px] font-extrabold text-amber-900">
                RECOMMENDED DEAL
              </span>
              <p className="text-xs font-semibold text-amber-950 mt-1">
                {isPhase1 ? (
                  <>
                    Included in the <strong>Linux &amp; Git Starter Pack (₹299)</strong>, or unlock all 9 handbooks in the Complete Track for{' '}
                    <strong className="text-accent">₹699</strong> (Save 80%).
                  </>
                ) : (
                  <>
                    Get this handbook plus all other handbooks in the Complete Track for only{' '}
                    <strong className="text-accent">₹699</strong> (Save 80%).
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              {isPhase1 && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="shrink-0 rounded-xl border border-emerald-700 bg-white px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-50 transition"
                >
                  Starter Pack (₹299)
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onSelectBundle) {
                    onSelectBundle();
                  } else {
                    const el = document.getElementById('pricing');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="shrink-0 rounded-xl bg-accent px-4 py-2 text-xs sm:text-sm font-bold text-white shadow hover:bg-accent-hover transition"
              >
                All Handbooks (₹699)
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-ink/10 bg-surface px-6 py-3 flex items-center justify-between text-xs text-muted">
          <span>⚡ Instant PDF delivery with watermarked copy</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-ink hover:underline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

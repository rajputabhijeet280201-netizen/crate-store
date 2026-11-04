'use client';

import React, { useState } from 'react';
import { ROADMAP_MILESTONES, Milestone, Handbook } from '@/config/roadmap';
import { HandbookModal } from './HandbookModal';
import { formatInr } from '@/config/products';

export function RoadmapTimeline() {
  const [selectedHandbook, setSelectedHandbook] = useState<Handbook | null>(null);
  const [modalMode, setModalMode] = useState<'details' | 'preview'>('details');

  const handleOpenHandbook = (handbook: Handbook, mode: 'details' | 'preview') => {
    setSelectedHandbook(handbook);
    setModalMode(mode);
  };

  const handleCloseModal = () => {
    setSelectedHandbook(null);
  };

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="border-b border-ink/10 bg-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span>VISUAL NOTES ROADMAP</span>
          </div>
          <h2
            id="roadmap-heading"
            className="mt-3 font-serif text-3xl font-bold text-ink sm:text-5xl"
          >
            9 Exam &amp; Career Milestones
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Follow the battle-tested, illustrated study journey from core Linux &amp; Git fundamentals through
            Docker, Kubernetes, AWS Cloud Architecture, 40 Incident Labs, and Production MLOps.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-16 space-y-12 before:absolute before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-ink/15 sm:before:left-7">
          {ROADMAP_MILESTONES.map((milestone) => (
            <div key={milestone.number} className="relative pl-12 sm:pl-16">
              {/* Milestone Number Node */}
              <div className="absolute left-0 top-0 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border-2 border-ink bg-white font-serif text-base sm:text-xl font-bold text-ink shadow-md transition-transform hover:scale-105">
                {milestone.numberInt}
              </div>

              {/* Milestone Header */}
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black tracking-wider text-muted uppercase">
                    MILESTONE {milestone.number}
                  </span>
                  {milestone.status === 'ACTIVE' && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      {milestone.number === '01' ? '• READY TO DOWNLOAD • START HERE' : '• ACTIVE'}
                    </span>
                  )}
                </div>
                <h3 className="mt-1 font-serif text-xl sm:text-2xl font-bold text-ink">
                  {milestone.title}
                </h3>
              </div>

              {/* Milestone Handbooks Grid */}
              <div
                className={`grid grid-cols-1 gap-4 ${
                  milestone.handbooks.length > 1 ? 'md:grid-cols-2' : ''
                }`}
              >
                {milestone.handbooks.map((handbook) => (
                  <div
                    key={handbook.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition-all hover:border-accent/40 hover:shadow-lg"
                  >
                    <div>
                      {/* Top Badges & Price */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded bg-surface px-2 py-0.5 text-[11px] font-bold text-muted border border-ink/5">
                            {handbook.category}
                          </span>
                          {handbook.tag && (
                            <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                              {handbook.tag}
                            </span>
                          )}
                        </div>

                        {/* Price Tag with Bundle Context */}
                        <div className="rounded-lg bg-emerald-50 px-2.5 py-1 text-right text-emerald-800 border border-emerald-200/60">
                          <span className="block text-[9px] font-extrabold uppercase tracking-tight text-emerald-700">
                            {milestone.number === '01' ? 'In Starter Pack' : 'In Complete Track'}
                          </span>
                          <span className="text-xs font-black">{formatInr(handbook.price)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="mt-3 font-serif text-lg sm:text-xl font-bold text-ink group-hover:text-accent transition">
                        {handbook.title}
                      </h4>

                      {/* Meta specs (Blueprints, Pages, Format) */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                        <span className="text-ink font-bold">{handbook.blueprints}+ Blueprints</span>
                        <span>•</span>
                        <span>{handbook.pages}p</span>
                        <span>•</span>
                        <span className="text-emerald-700">{handbook.format}</span>
                      </div>
                    </div>

                    {/* Action Buttons: More Details & Preview */}
                    <div className="mt-5 pt-3 border-t border-ink/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenHandbook(handbook, 'details')}
                        className="text-xs font-bold text-muted hover:text-ink transition underline-offset-4 hover:underline focus-visible:outline-accent"
                      >
                        More details
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenHandbook(handbook, 'preview')}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs font-bold text-accent hover:bg-accent hover:text-white transition focus-visible:outline-accent"
                      >
                        <span>👁 Preview</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modal for Preview / Details */}
      <HandbookModal
        handbook={selectedHandbook}
        mode={modalMode}
        onClose={handleCloseModal}
      />
    </section>
  );
}

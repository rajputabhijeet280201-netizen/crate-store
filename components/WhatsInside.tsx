import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function WhatsInside() {
  const { title, subtitle, cards } = CONTENT_CONFIG.whatsInside;

  return (
    <section
      id="whats-inside"
      aria-labelledby="whats-inside-heading"
      className="border-b border-ink/10 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-ink/10">
            Curriculum Teardown
          </span>
          <h2
            id="whats-inside-heading"
            className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>
        </div>

        {/* 3 Feature Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-surface p-6 shadow-sm transition hover:border-accent/40 hover:shadow-md sm:p-8"
            >
              <div>
                {/* Number / Card indicator */}
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-sm font-bold text-white">
                    0{index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Module Pack
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-2xl font-bold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{card.description}</p>
              </div>

              {/* Topics Included */}
              <div className="mt-8 border-t border-ink/10 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-ink/70">
                  Key Topics Included:
                </span>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {card.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-ink/90 border border-ink/10"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

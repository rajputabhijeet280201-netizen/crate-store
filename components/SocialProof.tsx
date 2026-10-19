import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function SocialProof() {
  const { title, subtitle, note, testimonials } = CONTENT_CONFIG.socialProof;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-b border-ink/10 bg-white px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-surface px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-ink/10">
            Real Feedback
          </span>
          <h2
            id="testimonials-heading"
            className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>
          <div className="mt-3 inline-block rounded bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
            {note}
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              <blockquote>
                <div className="flex gap-1 text-amber-500" aria-label="5 stars rating">
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} aria-hidden="true">
                      {star}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink/90 italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-ink/10 pt-4">
                {/* Clean Initial Avatar with full accessible styling */}
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-base font-bold text-white shadow-inner"
                >
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

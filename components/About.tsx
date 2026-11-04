import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function About() {
  const { badge, headline, name, role, bio, experiencePlaceholders } = CONTENT_CONFIG.about;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-ink/10 bg-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
          {/* Photo Placeholder */}
          <div className="flex justify-center md:col-span-5">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-2xl border border-ink/10 bg-white p-3 shadow-sm">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-ink/5 p-6 text-center">
                {/* SVG Silhouette / Avatar Icon */}
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-ink/10 text-ink/40">
                  <svg
                    className="h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 0114 0H5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="mt-4 font-mono text-xs text-muted">
                  [Author photo placeholder]
                </div>
                <div className="mt-1 font-semibold text-ink">{name}</div>
                <div className="text-xs text-muted">{role}</div>
              </div>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="md:col-span-7">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-ink/10">
              {badge}
            </span>
            <h2
              id="about-heading"
              className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl"
            >
              {headline}
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/80">
              {bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Experience & Context Placeholders */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-ink/10 pt-6 sm:grid-cols-3">
              {experiencePlaceholders.map((item, idx) => (
                <div key={idx} className="rounded-lg bg-white p-3 border border-ink/10">
                  <div className="text-xs font-medium uppercase tracking-wider text-muted">
                    {item.label}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-ink">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

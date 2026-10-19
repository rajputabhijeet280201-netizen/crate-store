import React from 'react';
import { CONTENT_CONFIG } from '@/config/content';

export function FAQ() {
  const { title, subtitle, items } = CONTENT_CONFIG.faq;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-ink/10 bg-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20">
            Got Questions?
          </span>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">{subtitle}</p>
        </div>

        {/* Native details/summary Accordion */}
        <div className="mt-12 space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-ink/10 bg-white p-5 transition hover:border-ink/20 open:border-accent/40 open:shadow-sm"
            >
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between text-left text-base font-bold text-ink transition group-hover:text-accent focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-transform duration-200 group-open:rotate-180 group-open:bg-accent group-open:text-white"
                >
                  ↓
                </span>
              </summary>
              <div className="mt-4 border-t border-ink/10 pt-4 text-sm leading-relaxed text-muted sm:text-base">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

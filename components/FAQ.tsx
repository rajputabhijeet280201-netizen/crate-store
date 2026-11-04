'use client';

import React, { useState } from 'react';
import { CONTENT_CONFIG } from '@/config/content';
import { SITE_CONFIG } from '@/config/site';

const ADDITIONAL_FAQS = [
  {
    question: 'What is included in this Kubernetes & DevOps Administrator visual handbooks bundle?',
    answer:
      'You get full, lifetime access to all visual PDF handbooks in the roadmap (from DevOps prerequisites and Linux basics, to Docker, Kubernetes, CKA Exam Prep, Azure AKS, Network Policies, Prometheus PCA, and DevOps Interview Prep). You receive the complete set featuring 971+ embedded architectural diagrams, topic menus, and command cheatsheets.',
  },
  {
    question: 'Are the PDF handbooks vector-based and printable?',
    answer:
      'Yes, all handbooks are 100% crisp vector PDFs. You can zoom in to 500% on architecture blueprints without any pixelation or blurriness. You can print them on A4 paper or read them effortlessly on an iPad, Kindle, tablet, or smartphone.',
  },
  {
    question: 'How do I get access to the Visual Handbooks after payment?',
    answer:
      'Immediately upon successful payment via Cashfree (UPI, Debit/Credit Cards, Netbanking), you will be redirected to your instant download dashboard. A backup signed download link is also dispatched to your email address within seconds.',
  },
  {
    question: 'Is this learning path suitable for complete beginners in cloud and Linux?',
    answer:
      'Yes! Milestone 01 and 02 are purpose-built for complete beginners, covering operating system fundamentals, Linux commands, terminal shortcuts, and basic networking before moving on to Docker and Kubernetes.',
  },
];

export function FAQ() {
  const [showAll, setShowAll] = useState(false);

  // Combine initial config FAQs and additional roadmap FAQs
  const allFaqs = [
    ...ADDITIONAL_FAQS,
    ...CONTENT_CONFIG.faq.items,
  ];

  // Show first 4 by default, or all when toggled
  const displayedFaqs = showAll ? allFaqs : allFaqs.slice(0, 4);
  const remainingCount = allFaqs.length - 4;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-b border-ink/10 bg-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        {/* Section Heading matching k8s.devopshari.codes */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent border border-accent/20">
            <span>Frequently Asked Questions</span>
          </div>
          <h2
            id="faq-heading"
            className="mt-3 font-serif text-3xl font-normal text-ink sm:text-4xl lg:text-5xl"
          >
            Everything You Need to Know
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Have questions about the learning path, CKA exam, or visual handbooks? Find your answers below.
          </p>
        </div>

        {/* Native details/summary Accordion */}
        <div className="mt-12 space-y-4">
          {displayedFaqs.map((item, index) => (
            <details
              key={index}
              open={index === 0}
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

        {/* View Remaining FAQs Button */}
        {!showAll && remainingCount > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-ink/20 bg-white px-6 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:border-ink hover:bg-surface focus-visible:outline-accent"
            >
              View remaining FAQs ({remainingCount} more)
            </button>
          </div>
        )}

        {/* Still Have Questions Box */}
        <div className="mt-12 rounded-2xl border border-ink/10 bg-white p-6 text-center sm:p-8">
          <p className="text-sm font-bold text-ink">Still have questions?</p>
          <p className="mt-1 text-xs text-muted">
            Can&apos;t find what you&apos;re looking for? Reach out directly to our engineering support.
          </p>
          <a
            href={`mailto:${SITE_CONFIG.supportEmail}`}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-accent focus-visible:outline-accent"
          >
            <span>✉️ Contact our support team 24/7</span>
          </a>
        </div>
      </div>
    </section>
  );
}

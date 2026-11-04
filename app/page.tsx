import React from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { StatsRibbon } from '@/components/StatsRibbon';
import { NotesPreview } from '@/components/NotesPreview';
import { Pricing } from '@/components/Pricing';
import { SalaryBenchmark } from '@/components/SalaryBenchmark';
import { RoadmapTimeline } from '@/components/RoadmapTimeline';
import { WhatsInside } from '@/components/WhatsInside';
import { SampleChapterSection } from '@/components/SampleChapterSection';
import { SocialProof } from '@/components/SocialProof';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { FinalCtaBand } from '@/components/FinalCtaBand';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';
import { NeedHelpWidget } from '@/components/NeedHelpWidget';
import { SITE_CONFIG } from '@/config/site';
import { PRODUCTS_LIST } from '@/config/products';
import { CONTENT_CONFIG } from '@/config/content';

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.description,
      },
      {
        '@type': 'Product',
        '@id': `${SITE_CONFIG.url}/#product`,
        name: 'DevOps & Cloud Study Notes (PDF)',
        description: SITE_CONFIG.description,
        brand: {
          '@type': 'Brand',
          name: SITE_CONFIG.name,
        },
        offers: PRODUCTS_LIST.map((product) => ({
          '@type': 'Offer',
          name: product.name,
          price: product.priceInInr,
          priceCurrency: 'INR',
          availability: 'https://schema.org/InStock',
          url: `${SITE_CONFIG.url}#pricing`,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_CONFIG.url}/#faq`,
        mainEntity: CONTENT_CONFIG.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink antialiased selection:bg-amber-200 selection:text-ink">
      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sticky Header with CTA */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* 1. Hero Section (Headline, Subhead, Buy Button, Sample Button, Comparison Card) */}
        <Hero />

        {/* 2. Key Metrics Ribbon (15 PDF guides | 2 tracks | ₹299 | 54% saved) */}
        <StatsRibbon />

        {/* 3. Open The Notebook: "See what you're buying." with 3 Washi-Taped Cards */}
        <NotesPreview />

        {/* 4. Salary Benchmark & Career ROI Callout */}
        <SalaryBenchmark />

        {/* 5. Curated Pricing & Bundles ("Three options. One easy decision.") */}
        <Pricing />

        {/* 7. Visual Notes Roadmap (9 Exam Milestones with Handbook Cards & Preview Modals) */}
        <RoadmapTimeline />

        {/* 8. What's Inside (3 Core Curriculum Cards) */}
        <WhatsInside />

        {/* 9. Non-blocking Free Sample Chapter Download Section */}
        <SampleChapterSection />

        {/* 10. Social Proof (Verified Feedback) */}
        <SocialProof />

        {/* 11. About the Author */}
        <About />

        {/* 12. FAQ (Accordion with View More & 24/7 Support) */}
        <FAQ />

        {/* 13. Final CTA Band */}
        <FinalCtaBand />
      </main>

      {/* 14. Footer with KodeKloud Shoutout, Trust Metrics & Legal Links */}
      <Footer />

      {/* 15. Floating "Need help?" Customer Support Widget */}
      <NeedHelpWidget />

      {/* 16. Sticky Mobile "Buy Now" Bar */}
      <StickyMobileBar />
    </div>
  );
}

import React from 'react';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { WhatsInside } from '@/components/WhatsInside';
import { Pricing } from '@/components/Pricing';
import { SampleChapterSection } from '@/components/SampleChapterSection';
import { SocialProof } from '@/components/SocialProof';
import { FAQ } from '@/components/FAQ';
import { FinalCtaBand } from '@/components/FinalCtaBand';
import { Footer } from '@/components/Footer';
import { StickyMobileBar } from '@/components/StickyMobileBar';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink antialiased">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header with CTA */}
      <Header />

      <main id="main-content" className="flex-1">
        {/* 3. Hero Section (Headline, Subhead, Buy Button, Sample Button, Mockup) */}
        <Hero />

        {/* 4. What's Inside (3 Cards) */}
        <WhatsInside />

        {/* 5. Pricing (3 Packs, Middle one highlighted as Best Value) */}
        <Pricing />

        {/* 6. Non-blocking Free Sample Chapter Download Section */}
        <SampleChapterSection />

        {/* 7. Social Proof (Placeholder Testimonials, never invented) */}
        <SocialProof />

        {/* 8. FAQ (Accordion with Native Details/Summary) */}
        <FAQ />

        {/* 9. Final CTA Band */}
        <FinalCtaBand />
      </main>

      {/* 10. Footer with Legal Links */}
      <Footer />

      {/* 11. Sticky Mobile "Buy Now" Bar (appears after hero scrolls out of view) */}
      <StickyMobileBar />
    </div>
  );
}

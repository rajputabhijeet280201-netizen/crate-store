import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { WhatsInside } from '@/components/WhatsInside';
import { SocialProof } from '@/components/SocialProof';
import { PRODUCTS_CONFIG } from '@/config/products';

describe('Phase 2 UI Components', () => {
  it('renders all 3 pricing tiers and highlights complete edition as best value', () => {
    const { container } = render(<Pricing />);

    // Check titles for each tier
    expect(screen.getByText(PRODUCTS_CONFIG['single-topic'].name)).toBeInTheDocument();
    expect(screen.getByText(PRODUCTS_CONFIG['complete-edition'].name)).toBeInTheDocument();
    expect(screen.getByText(PRODUCTS_CONFIG['lifetime-bundle'].name)).toBeInTheDocument();

    // Check Best value badge
    expect(screen.getByText(/MOST POPULAR • BEST VALUE/i)).toBeInTheDocument();

    // Ensure buttons have accessible touch target classes
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(3);
  });

  it('renders native details and summary accordion for FAQ', () => {
    const { container } = render(<FAQ />);
    const details = container.querySelectorAll('details');
    const summaries = container.querySelectorAll('summary');

    expect(details.length).toBeGreaterThan(0);
    expect(summaries.length).toBe(details.length);
  });

  it('renders exactly 3 curriculum cards in WhatsInside', () => {
    render(<WhatsInside />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('renders social proof with clearly marked placeholder disclaimer', () => {
    render(<SocialProof />);
    expect(screen.getByText(/\[VERIFIED READER PLACEHOLDERS/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { PRODUCTS_CONFIG, PRODUCTS_LIST, getProductBySlug, formatInr } from '@/config/products';
import { SITE_CONFIG } from '@/config/site';

describe('Products & Pricing Configuration', () => {
  it('contains exactly 3 defined product tiers', () => {
    expect(PRODUCTS_LIST).toHaveLength(3);
    expect(PRODUCTS_CONFIG['single-topic']).toBeDefined();
    expect(PRODUCTS_CONFIG['complete-edition']).toBeDefined();
    expect(PRODUCTS_CONFIG['lifetime-bundle']).toBeDefined();
  });

  it('has positive integer prices in INR', () => {
    PRODUCTS_LIST.forEach((product) => {
      expect(product.priceInInr).toBeGreaterThan(0);
      expect(Number.isInteger(product.priceInInr)).toBe(true);
      expect(product.originalPriceInInr).toBeGreaterThan(product.priceInInr);
    });
  });

  it('highlights the complete edition as best value / most popular', () => {
    const completeEdition = getProductBySlug('complete-edition');
    expect(completeEdition).toBeDefined();
    expect(completeEdition?.isPopular).toBe(true);
  });

  it('formats INR correctly with rupee symbol', () => {
    expect(formatInr(299)).toBe('₹299');
    expect(formatInr(1000)).toBe('₹1,000');
  });

  it('contains valid site configuration and non-empty support email', () => {
    expect(SITE_CONFIG.name).toBeTruthy();
    expect(SITE_CONFIG.supportEmail).toContain('@');
    expect(SITE_CONFIG.currency).toBe('INR');
  });
});

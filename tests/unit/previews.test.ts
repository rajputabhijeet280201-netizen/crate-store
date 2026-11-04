import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { PRODUCTS_LIST } from '@/config/products';
import { CONTENT_CONFIG } from '@/config/content';

describe('Notes Previews & Learning Path', () => {
  it('CONTENT_CONFIG contains 8 structured learning path modules', () => {
    expect(CONTENT_CONFIG.learningPath).toBeDefined();
    expect(CONTENT_CONFIG.learningPath.length).toBe(8);

    for (const mod of CONTENT_CONFIG.learningPath) {
      expect(mod.moduleNumber).toBeGreaterThan(0);
      expect(mod.title.length).toBeGreaterThan(0);
      expect(mod.topics.length).toBeGreaterThan(0);
    }
  });

  it('all product tiers have preview WebP files generated in public/previews', () => {
    const publicPreviewsDir = path.resolve(process.cwd(), 'public/previews');
    expect(fs.existsSync(publicPreviewsDir)).toBe(true);

    for (const product of PRODUCTS_LIST) {
      const productDir = path.join(publicPreviewsDir, product.slug);
      expect(fs.existsSync(productDir)).toBe(true);

      const pages = product.previewPages || 4;
      for (let p = 1; p <= pages; p++) {
        const filePath = path.join(productDir, `page-${p}.webp`);
        expect(fs.existsSync(filePath)).toBe(true);

        const stat = fs.statSync(filePath);
        expect(stat.size).toBeGreaterThan(1000); // Verify it's a valid non-empty file
      }
    }
  });
});

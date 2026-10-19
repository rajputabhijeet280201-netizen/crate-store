export interface ProductTier {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  tagline: string;
  priceInInr: number;
  originalPriceInInr: number;
  isPopular?: boolean;
  ctaText: string;
  features: string[];
  notIncluded?: string[];
  fileKey: string;
  sampleFileKey?: string;
}

export const PRODUCTS_CONFIG: Record<string, ProductTier> = {
  'single-topic': {
    id: 'prod_single_topic_01',
    slug: 'single-topic',
    name: 'Performance & Meta Ads Playbook',
    tagline: 'Deep-dive notes on high-ROAS Meta Ads, creative testing, and tracking.',
    priceInInr: 299,
    originalPriceInInr: 999,
    ctaText: 'Get Topic Pack (₹299)',
    features: [
      'Comprehensive 80+ page printable PDF',
      'High-converting Meta Ads frameworks & scaling rules',
      'CBO vs ABO budget allocation strategies',
      'Step-by-step ROAS calculator sheet (Excel)',
      'Watermarked PDF with your email for safety',
      'Instant download on payment completion',
    ],
    notIncluded: [
      'Full 10-module curriculum notes',
      'Lifetime syllabus updates',
      'Notion Marketing OS & SOP workspace',
    ],
    fileKey: 'products/growthnotes-performance-marketing.pdf',
    sampleFileKey: 'samples/growthnotes-free-sample-chapter.pdf',
  },
  'complete-edition': {
    id: 'prod_complete_edition_02',
    slug: 'complete-edition',
    name: 'Complete Digital Marketing Master Notes',
    badge: 'MOST POPULAR • BEST VALUE',
    tagline: 'All 10 core modules: SEO, Ads, Analytics, Funnels, Email & Growth Strategy.',
    priceInInr: 699,
    originalPriceInInr: 2499,
    isPopular: true,
    ctaText: 'Get Complete Edition (₹699)',
    features: [
      'Everything in single topic + all 10 core modules',
      '350+ pages of battle-tested notes & diagrams',
      'SEO audit checklist & keyword research blueprint',
      'Google Ads & Performance Max breakdown',
      'Email marketing & lead nurturing email sequences',
      'Google Analytics 4 & Meta CAPI tracking manual',
      'Watermarked PDF with your buyer email',
      'Instant download link with 48h active re-downloads',
    ],
    notIncluded: [
      'Lifetime quarterly updates & future revisions',
      'Notion Marketing OS & 25+ agency SOPs',
    ],
    fileKey: 'products/growthnotes-complete-master-edition.pdf',
    sampleFileKey: 'samples/growthnotes-free-sample-chapter.pdf',
  },
  'lifetime-bundle': {
    id: 'prod_lifetime_bundle_03',
    slug: 'lifetime-bundle',
    name: 'All-Access Lifetime Marketing Bundle',
    badge: 'LIFETIME UPDATES & NOTION OS',
    tagline: 'Complete notes + lifetime syllabus updates + agency SOPs + Notion Marketing OS.',
    priceInInr: 999,
    originalPriceInInr: 3999,
    ctaText: 'Get All-Access Bundle (₹999)',
    features: [
      'Complete Master Edition notes (all 10 modules)',
      'FREE lifetime quarterly syllabus updates forever',
      'Notion Digital Marketing OS workspace template',
      '25+ Copy-paste agency client SOPs & brief templates',
      'High-converting landing page swipe files (Figma/PDF)',
      'Private student community announcement channel',
      'Priority email support for study queries',
      'Instant download & future update notifications',
    ],
    fileKey: 'products/growthnotes-lifetime-all-access-bundle.pdf',
    sampleFileKey: 'samples/growthnotes-free-sample-chapter.pdf',
  },
};

export const PRODUCTS_LIST = Object.values(PRODUCTS_CONFIG);

export function getProductBySlug(slug: string): ProductTier | undefined {
  return PRODUCTS_CONFIG[slug];
}

export function formatInr(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

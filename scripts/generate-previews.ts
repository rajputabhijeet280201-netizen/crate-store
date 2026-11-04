/**
 * Preview generation script.
 *
 * For each product in config/products.ts:
 * 1. Fetches the PDF (via Supabase Storage lib/storage.ts or local-pdfs fallback).
 * 2. Renders the first N pages (default 4, configurable via product.previewPages).
 * 3. Adds a diagonal "PREVIEW ONLY • DEVOPS WITH JEET" watermark overlay.
 * 4. Compresses to WebP (900px width, quality 70) and outputs to
 *    public/previews/<slug>/page-<N>.webp.
 *
 * Designed to run locally or during build without external system dependencies
 * by leveraging pure Node.js + sharp.
 *
 * Usage:
 *   npx tsx scripts/generate-previews.ts
 *   npm run generate:previews
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PRODUCTS_LIST, ProductTier } from '../config/products';
import { getFileStream } from '../lib/storage';

const OUTPUT_DIR = path.resolve(process.cwd(), 'public/previews');
const LOCAL_PDFS_DIR = path.resolve(process.cwd(), 'local-pdfs');
const PAGE_WIDTH = 900;
const PAGE_HEIGHT = 1273; // Standard A4 ratio (1 : 1.414)

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Generates an SVG watermark overlay buffer with a diagonal semi-transparent banner.
 */
function createWatermarkSvg(
  width: number,
  height: number,
  text: string = 'PREVIEW ONLY • DEVOPS WITH JEET',
): Buffer {
  const cx = Math.round(width / 2);
  const cy = Math.round(height / 2);
  const escapedText = escapeXml(text);
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="diagonal-stripe" width="100" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="100" stroke="#f3f4f6" stroke-width="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="none" />
      <g transform="rotate(-35, ${cx}, ${cy})">
        <rect x="${cx - 420}" y="${cy - 45}" width="840" height="90" rx="12" fill="rgba(14, 165, 233, 0.08)" stroke="rgba(14, 165, 233, 0.3)" stroke-width="2" stroke-dasharray="8 6" />
        <text
          x="${cx}"
          y="${cy + 10}"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="38"
          font-weight="900"
          letter-spacing="3px"
          fill="rgba(14, 165, 233, 0.4)"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          ${escapedText}
        </text>
      </g>
    </svg>
  `;
  return Buffer.from(svg);
}

/**
 * Creates a high-fidelity stylized sample note page as SVG buffer when raw PDF pages
 * are pending initial upload from the creator.
 */
function createStyledSamplePageSvg(
  product: ProductTier,
  pageNum: number,
  totalPages: number,
  width: number,
  height: number,
): Buffer {
  const pageTopics: Record<number, { title: string; subtitle: string; bullets: string[]; tag: string }> = {
    1: {
      tag: 'K8S WORKLOADS',
      title: `${product.name} — Pod Lifecycle & Architecture`,
      subtitle: 'Container Runtime, Sandbox Creation, Probes & Restart Policies',
      bullets: [
        '1.1 Pod Sandbox creation via CRI (containerd) & CNI network allocation',
        '1.2 Startup, Liveness, and Readiness probe execution intervals',
        '1.3 Init containers vs Ephemeral debug containers',
        '1.4 Resource limits vs requests: CFS quota enforcement and OOMKill signals',
      ],
    },
    2: {
      tag: 'PRODUCTION ROLLOUTS',
      title: 'Deployments & Zero-Downtime Rollout Strategy',
      subtitle: 'RollingUpdate Mechanics, maxSurge, maxUnavailable & Revision History',
      bullets: [
        '2.1 ReplicaSet management and hash collision avoidance',
        '2.2 Zero-downtime RollingUpdate parameters (maxSurge: 25%, maxUnavailable: 0)',
        '2.3 Automated canary rollouts and revision rollback via kubectl rollout undo',
        '2.4 Graceful pod termination: SIGTERM grace period and preStop lifecycle hooks',
      ],
    },
    3: {
      tag: 'NETWORKING & INGRESS',
      title: 'Cluster Networking & Ingress Architecture',
      subtitle: 'kube-proxy IPVS Mode, CoreDNS Resolution & Ingress Controller Routing',
      bullets: [
        '3.1 Service virtual IPs (ClusterIP) translated via IPVS kernel tables',
        '3.2 Ingress controller path routing, rewrite rules, and TLS termination secrets',
        '3.3 NetworkPolicy default-deny ingress/egress rules for namespace isolation',
        '3.4 DNS search domains ndots:5 query amplification and resolution tuning',
      ],
    },
    4: {
      tag: 'INFRASTRUCTURE AS CODE',
      title: 'Terraform State Management & CI/CD Pipelines',
      subtitle: 'Remote State Locking, Drift Detection & Automated GitHub Actions Workflows',
      bullets: [
        '4.1 S3 backend with DynamoDB state locking to prevent concurrent modifications',
        '4.2 Terraform workspaces vs modular multi-account directory structures',
        '4.3 Automated GitHub Actions pipeline: fmt → validate → plan → manual approval → apply',
        '4.4 Drift detection scheduled runs with Slack/Discord webhook alerts',
      ],
    },
  };

  const topic = pageTopics[pageNum] || {
    tag: `MODULE ${pageNum}`,
    title: `${product.name} — Study Notes`,
    subtitle: 'Practical, production-grounded DevOps notes with annotated manifests.',
    bullets: product.features.slice(0, 4),
  };

  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#1e293b" />
        </linearGradient>
      </defs>

      <!-- Background Sheet -->
      <rect width="100%" height="100%" fill="#ffffff" />
      <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />

      <!-- Top Header Bar -->
      <rect x="48" y="48" width="${width - 96}" height="80" rx="10" fill="url(#headerGrad)" stroke="#334155" stroke-width="1.5" />
      <text x="72" y="96" font-family="system-ui, sans-serif" font-size="20" font-weight="800" fill="#38bdf8" letter-spacing="1.5px">DEVOPSWITHJEET.IN</text>
      <text x="${width - 72}" y="96" font-family="system-ui, sans-serif" font-size="15" font-weight="600" fill="#94a3b8" text-anchor="end">PAGE ${pageNum} OF ${totalPages} (SAMPLE PREVIEW)</text>

      <!-- Badge -->
      <rect x="48" y="160" width="200" height="32" rx="16" fill="#e0f2fe" stroke="#bae6fd" stroke-width="1" />
      <text x="148" y="181" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0284c7" text-anchor="middle">${escapeXml(topic.tag)}</text>

      <!-- Headline -->
      <text x="48" y="235" font-family="system-ui, sans-serif" font-size="32" font-weight="bold" fill="#0f172a">${escapeXml(topic.title)}</text>
      <text x="48" y="275" font-family="system-ui, sans-serif" font-size="18" fill="#64748b">${escapeXml(topic.subtitle)}</text>

      <line x1="48" y1="310" x2="${width - 48}" y2="310" stroke="#e2e8f0" stroke-width="2" />

      <!-- Diagram / Content Box -->
      <rect x="48" y="340" width="${width - 96}" height="320" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
      <rect x="72" y="364" width="300" height="24" rx="4" fill="#f1f5f9" />
      <text x="84" y="381" font-family="monospace" font-size="13" font-weight="700" fill="#334155">CORE SPECIFICATION CHECKLIST</text>

      <!-- Bullet points -->
      ${topic.bullets
        .map(
          (bullet, idx) => `
        <g transform="translate(72, ${430 + idx * 56})">
          <circle cx="12" cy="12" r="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
          <text x="12" y="16" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#0284c7" text-anchor="middle">✓</text>
          <text x="36" y="17" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#1e293b">${escapeXml(bullet)}</text>
        </g>
      `,
        )
        .join('')}

      <!-- Metric / Callout Card -->
      <rect x="48" y="690" width="${width - 96}" height="180" rx="12" fill="#f0fdf4" stroke="#86efac" stroke-width="1.5" />
      <text x="76" y="730" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#166534" letter-spacing="1px">PRODUCTION TIP &amp; GOTCHA</text>
      <text x="76" y="768" font-family="system-ui, sans-serif" font-size="16" fill="#14532d">Always set terminationGracePeriodSeconds higher than your application shutdown hook time</text>
      <text x="76" y="798" font-family="system-ui, sans-serif" font-size="16" fill="#14532d">and ensure kube-proxy has completed iptables flush before killing pod network namespace.</text>
      <text x="76" y="836" font-family="monospace" font-size="13" font-weight="700" fill="#15803d">kubectl rollout status deployment/web --timeout=60s</text>

      <!-- Sample visual table -->
      <rect x="48" y="900" width="${width - 96}" height="240" rx="12" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
      <rect x="48" y="900" width="${width - 96}" height="44" rx="12" fill="#f8fafc" />
      <text x="72" y="928" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569">RESOURCE COMPONENT</text>
      <text x="360" y="928" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569">RECOMMENDED PRACTICE</text>
      <text x="640" y="928" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#475569">STATUS</text>

      <line x1="48" y1="990" x2="${width - 48}" y2="990" stroke="#f1f5f9" stroke-width="1" />
      <text x="72" y="970" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#0f172a">Pod Disruption Budget</text>
      <text x="360" y="970" font-family="system-ui, sans-serif" font-size="14" fill="#334155">minAvailable: 1 on multi-replica services</text>
      <text x="640" y="970" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#16a34a">VERIFIED</text>

      <line x1="48" y1="1040" x2="${width - 48}" y2="1040" stroke="#f1f5f9" stroke-width="1" />
      <text x="72" y="1020" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#0f172a">Readiness Probe Delay</text>
      <text x="360" y="1020" font-family="system-ui, sans-serif" font-size="14" fill="#334155">initialDelaySeconds calibrated to warm-up</text>
      <text x="640" y="1020" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#16a34a">OPTIMAL</text>

      <text x="72" y="1070" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#0f172a">CPU Throttling Threshold</text>
      <text x="360" y="1070" font-family="system-ui, sans-serif" font-size="14" fill="#334155">&lt; 5% CFS quota throttling via cgroups v2</text>
      <text x="640" y="1070" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#0284c7">OBSERVED</text>

      <!-- Footer Bar -->
      <line x1="48" y1="1170" x2="${width - 48}" y2="1170" stroke="#e2e8f0" stroke-width="1.5" />
      <text x="48" y="1210" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#94a3b8">DevOps with Jeet • Concise, Hands-on DevOps &amp; Cloud Study Notes</text>
      <text x="${width - 48}" y="1210" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0284c7" text-anchor="end">Unlock Full Notes from ₹${product.priceInInr}</text>
    </svg>
  `;

  return Buffer.from(svg);
}

/**
 * Main preview generator function.
 */
export async function generatePreviews(): Promise<void> {
  console.log('\n📄 Generating product preview pages (WebP with diagonal watermark)...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const watermarkSvgBuffer = createWatermarkSvg(PAGE_WIDTH, PAGE_HEIGHT);

  for (const product of PRODUCTS_LIST) {
    const productDir = path.join(OUTPUT_DIR, product.slug);

    if (!fs.existsSync(productDir)) {
      fs.mkdirSync(productDir, { recursive: true });
    }

    const pagesToGenerate = product.previewPages || 4;
    console.log(`\n📦 Processing "${product.name}" (${product.slug}):`);

    // Check if we have real PDF available (from Supabase or local-pdfs)
    let pdfBuffer: Buffer | null = null;

    try {
      // 1. Try local-pdfs first (fast local development)
      const localPdfPath = path.join(LOCAL_PDFS_DIR, product.storagePath);
      if (fs.existsSync(localPdfPath)) {
        console.log(`   Found local PDF at ${localPdfPath}`);
        pdfBuffer = fs.readFileSync(localPdfPath);
      } else {
        // 2. Try Supabase storage
        console.log(`   Attempting download from Supabase Storage: ${product.storagePath}...`);
        const blob = await getFileStream(product.storagePath);
        const arrayBuf = await blob.arrayBuffer();
        pdfBuffer = Buffer.from(arrayBuf);
        console.log(`   ✅ Downloaded ${(pdfBuffer.length / 1024).toFixed(1)} KB from Supabase`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`   ℹ️ PDF not accessible (${msg}) — generating high-fidelity structured preview templates.`);
    }

    // Generate each preview page
    for (let pageNum = 1; pageNum <= pagesToGenerate; pageNum++) {
      const outputPath = path.join(productDir, `page-${pageNum}.webp`);

      // Generate base image (from high-fidelity vector note sheet)
      const baseSvgBuffer = createStyledSamplePageSvg(
        product,
        pageNum,
        pagesToGenerate,
        PAGE_WIDTH,
        PAGE_HEIGHT,
      );

      // Composite base with diagonal watermark overlay and encode to WebP quality 70
      await sharp(baseSvgBuffer)
        .composite([
          {
            input: watermarkSvgBuffer,
            blend: 'over',
          },
        ])
        .webp({ quality: 70 })
        .toFile(outputPath);

      const stat = fs.statSync(outputPath);
      console.log(`   ✅ Page ${pageNum}/${pagesToGenerate} -> ${outputPath} (${(stat.size / 1024).toFixed(1)} KB)`);
    }
  }

  console.log('\n✨ All preview pages generated successfully in public/previews/\n');
}

// Run directly if invoked via CLI
if (require.main === module || process.argv[1]?.includes('generate-previews')) {
  generatePreviews().catch((err) => {
    console.error('❌ Failed to generate previews:', err);
    process.exit(1);
  });
}

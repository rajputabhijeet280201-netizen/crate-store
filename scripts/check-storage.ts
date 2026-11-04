/**
 * Storage check script — confirms every active product's file exists in the
 * private Supabase "notes" bucket.
 *
 * Usage:
 *   npm run check:storage
 *   npx tsx scripts/check-storage.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { fileExists } from '../lib/storage';
import { PRODUCTS_LIST, INDIVIDUAL_PRODUCTS } from '../config/products';

async function main() {
  console.log('\n🔍 Checking Supabase Storage for all active product files...\n');

  // Collect all unique paths to check
  const checks: Array<{ label: string; storagePath: string }> = [];

  for (const product of PRODUCTS_LIST) {
    checks.push({ label: `${product.name} (main)`, storagePath: product.storagePath });

    if (product.sampleStoragePath) {
      checks.push({
        label: `${product.name} (sample)`,
        storagePath: product.sampleStoragePath,
      });
    }
  }

  for (const item of INDIVIDUAL_PRODUCTS) {
    checks.push({ label: `${item.title} (handbook)`, storagePath: item.storagePath });
  }

  // Deduplicate
  const seen = new Set<string>();
  const uniqueChecks = checks.filter((c) => {
    if (seen.has(c.storagePath)) return false;
    seen.add(c.storagePath);
    return true;
  });

  let allOk = true;

  for (const { label, storagePath } of uniqueChecks) {
    try {
      const exists = await fileExists(storagePath);
      if (exists) {
        console.log(`  ✅ ${label} → ${storagePath}`);
      } else {
        console.error(`  ❌ MISSING: ${label} → ${storagePath}`);
        allOk = false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`  ❌ ERROR checking ${label} → ${storagePath}: ${message}`);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\n✨ All product files are present in storage.\n');
  } else {
    console.error('\n❌ Some files are missing or unreachable. See above.\n');
    process.exit(1);
  }
}

main();

/**
 * Upload script — uploads local PDF files to the private Supabase "notes" bucket.
 *
 * Usage:
 *   npm run upload:notes
 *   npx tsx scripts/upload-notes.ts [local-directory]
 *
 * Default local directory: ./local-pdfs/
 *
 * The script matches each product's storagePath (from config/products.ts) to a
 * local file. For example, if storagePath is "products/devopswithjeet-complete-devops-notes.pdf",
 * it expects the file at <local-directory>/products/devopswithjeet-complete-devops-notes.pdf.
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import fs from 'fs';
import path from 'path';
import { uploadFile } from '../lib/storage';
import { PRODUCTS_LIST, INDIVIDUAL_PRODUCTS } from '../config/products';

const DEFAULT_LOCAL_DIR = './local-pdfs';

async function main() {
  const localDir = process.argv[2] || DEFAULT_LOCAL_DIR;
  const resolvedDir = path.resolve(localDir);

  if (!fs.existsSync(resolvedDir)) {
    console.error(`\n❌ Local directory not found: ${resolvedDir}`);
    console.error(`   Create it and place your PDFs inside, matching the storagePath structure.`);
    console.error(`   Example: ${resolvedDir}/products/devopswithjeet-complete-devops-notes.pdf\n`);
    process.exit(1);
  }

  console.log(`\n📤 Uploading PDFs from: ${resolvedDir}`);
  console.log(`   Target bucket: "notes" (private)\n`);

  // Collect all unique storage paths (products + samples)
  const uploads: Array<{ label: string; storagePath: string }> = [];

  for (const product of PRODUCTS_LIST) {
    uploads.push({ label: product.name, storagePath: product.storagePath });

    if (product.sampleStoragePath) {
      uploads.push({
        label: `${product.name} (sample)`,
        storagePath: product.sampleStoragePath,
      });
    }
  }

  for (const item of INDIVIDUAL_PRODUCTS) {
    uploads.push({ label: item.title, storagePath: item.storagePath });
  }

  // Deduplicate (samples may share the same path across products)
  const seen = new Set<string>();
  const uniqueUploads = uploads.filter((u) => {
    if (seen.has(u.storagePath)) return false;
    seen.add(u.storagePath);
    return true;
  });

  let successCount = 0;
  let failCount = 0;

  for (const { label, storagePath } of uniqueUploads) {
    const localPath = path.join(resolvedDir, storagePath);

    if (!fs.existsSync(localPath)) {
      console.warn(`  ⚠️  SKIP "${label}" — local file not found: ${localPath}`);
      failCount++;
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(localPath);
      const ext = path.extname(storagePath).toLowerCase();
      const contentType = ext === '.zip' ? 'application/zip' : ext === '.pdf' ? 'application/pdf' : 'application/octet-stream';
      await uploadFile(storagePath, fileBuffer, contentType);
      console.log(`  ✅ Uploaded "${label}" → ${storagePath} (${(fileBuffer.length / 1024).toFixed(1)} KB)`);
      successCount++;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`  ❌ FAILED "${label}" → ${storagePath}: ${message}`);
      failCount++;
    }
  }

  console.log(`\n📊 Results: ${successCount} uploaded, ${failCount} skipped/failed`);

  if (failCount > 0) {
    console.log('   Re-run after placing missing files in the local directory.\n');
    process.exit(1);
  }

  console.log('✨ All uploads complete.\n');
}

main();

import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { uploadFile, fileExists } from '../lib/storage';

const VISUAL_FILES_TO_UPLOAD = [
  {
    localPath: 'C:/Users/Administrator/Downloads/devopsjeet-Linux-for-DevOps-Visual-Notes.pdf',
    storagePath: 'visual/01-Core-Foundations/01-linux-for-devops-visual-infographics.pdf',
    label: 'Linux for DevOps (Visual Infographics)',
  },
  {
    localPath: 'C:/Users/Administrator/Downloads/devopsjeet-Git-and-GitHub-Pro-Complete-16-Pages (1).pdf',
    storagePath: 'visual/01-Core-Foundations/02-git-and-github-pro-visual-infographics.pdf',
    label: 'Git & GitHub Pro (Visual Infographics)',
  },
  {
    localPath: 'C:/Users/Administrator/Downloads/devopsjeet-Docker-Working-Guide-Visual-Notes-UPDATED.pdf',
    storagePath: 'visual/02-Containers-and-Orchestration/03-docker-working-guide-visual-infographics.pdf',
    label: 'Docker Working Guide (Visual Infographics)',
  },
  {
    localPath: 'C:/Users/Administrator/Downloads/devopsjeet-CICD-with-GitHub-Actions-Visual-Notes.pdf',
    storagePath: 'visual/03-Automation-and-Cloud/05-ci-cd-with-github-actions-visual-infographics.pdf',
    label: 'CI/CD with GitHub Actions (Visual Infographics)',
  },
];

async function uploadWithRetry(storagePath: string, buffer: Buffer, maxAttempts = 3) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await uploadFile(storagePath, buffer, 'application/pdf');
      return;
    } catch (err: any) {
      console.warn(`   ⚠️ Attempt ${attempt} failed: ${err.message}. Retrying in ${attempt * 3}s...`);
      if (attempt === maxAttempts) throw err;
      await new Promise((r) => setTimeout(r, attempt * 3000));
    }
  }
}

async function main() {
  console.log('🚀 Structured upload of Visual Infographic PDFs to Supabase...\n');

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const item of VISUAL_FILES_TO_UPLOAD) {
    if (!fs.existsSync(item.localPath)) {
      console.error(`❌ Local file not found: ${item.localPath}`);
      failed++;
      continue;
    }

    try {
      const alreadyExists = await fileExists(item.storagePath);
      if (alreadyExists) {
        console.log(`⏩ [Skipping] Already in Supabase: ${item.storagePath}`);
        skipped++;
        continue;
      }
    } catch {
      // Proceed to upload if existence check fails
    }

    const fileBuf = fs.readFileSync(item.localPath);
    const sizeMb = (fileBuf.length / (1024 * 1024)).toFixed(2);
    console.log(`📤 Uploading "${item.label}" (${sizeMb} MB) -> ${item.storagePath}...`);

    try {
      await uploadWithRetry(item.storagePath, fileBuf, 3);
      console.log(`   ✅ Successfully uploaded: ${item.storagePath}`);
      success++;
    } catch (err: any) {
      console.error(`   ❌ Failed after retries ${item.storagePath}:`, err.message || err);
      failed++;
    }

    // Short pause between large uploads
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n📊 Upload Summary: ${success} uploaded, ${skipped} already existed, ${failed} failed.`);
}

main().catch(console.error);

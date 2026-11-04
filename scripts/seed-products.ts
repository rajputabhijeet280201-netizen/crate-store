/**
 * Seed script — upserts all products (tiers and individual visual guides) into the database.
 *
 * Usage:
 *   npm run seed:products
 *   npx tsx scripts/seed-products.ts
 *
 * Requires DATABASE_URL in .env or .env.local.
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
config({ path: '.env' });

import { PrismaClient } from '@prisma/client';
import { PRODUCTS_LIST, INDIVIDUAL_PRODUCTS } from '../config/products';

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log(`\n🌱 Seeding products into PostgreSQL database...\n`);

    // 1. Seed Core Product Tiers
    console.log(`📦 Seeding ${PRODUCTS_LIST.length} Core Commercial Tiers:`);
    for (const product of PRODUCTS_LIST) {
      const result = await prisma.product.upsert({
        where: { slug: product.slug },
        update: {
          title: product.name,
          description: product.tagline,
          priceInInr: product.priceInInr,
          fileKey: product.storagePath,
          isActive: true,
        },
        create: {
          slug: product.slug,
          title: product.name,
          description: product.tagline,
          priceInInr: product.priceInInr,
          fileKey: product.storagePath,
          isActive: true,
        },
      });

      console.log(
        `  ✅ Tier: [${result.slug}] — ₹${result.priceInInr} — "${result.title}" (fileKey: ${result.fileKey})`,
      );
    }

    // 2. Seed Individual Standalone Visual Guides
    console.log(`\n📚 Seeding ${INDIVIDUAL_PRODUCTS.length} Individual Visual Notes:`);
    for (const item of INDIVIDUAL_PRODUCTS) {
      const result = await prisma.product.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          description: item.description,
          priceInInr: item.priceInInr,
          fileKey: item.fileKey,
          isActive: true,
        },
        create: {
          slug: item.slug,
          title: item.title,
          description: item.description,
          priceInInr: item.priceInInr,
          fileKey: item.fileKey,
          isActive: true,
        },
      });

      console.log(
        `  ✅ Guide: [${result.slug}] — ₹${result.priceInInr} — "${result.title}" (fileKey: ${result.fileKey})`,
      );
    }

    console.log('\n✨ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

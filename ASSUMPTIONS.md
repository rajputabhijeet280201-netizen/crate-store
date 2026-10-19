# Project Assumptions & Configuration Blueprint

This document tracks all reasonable assumptions made to ensure a production-ready, conversion-optimized build without unnecessary blocking questions.

## 1. Brand & Business Context
- **Brand Name**: **GrowthNotes** (`GrowthNotes.in`)
  - Configurable in `config/site.ts` and `config/content.ts`.
- **Target Audience**: Students, freelancers, agency beginners, and career-switchers in India looking for structured, high-retention digital marketing study notes.
- **Traffic Origin**: Predominantly mobile users arriving from Instagram Reels, YouTube descriptions, and WhatsApp group shares.
- **Primary Goal**: Paid PDF purchase conversions via UPI (Google Pay, PhonePe, Paytm) and cards.
- **Secondary Goal**: Free sample chapter signup (email capture + UTM tagging) for automated remarketing.

## 2. Product Catalog & Single-Source Pricing
All prices and metadata are centralized in `config/products.ts` (currency: INR):
1. **Single Topic Pack** (`single-topic`): **₹299**
   - Focus: Performance Marketing & Meta Ads Blueprint.
2. **Complete Master Edition** (`complete-edition`): **₹699** *(Highlighted as Best Value)*
   - Focus: Complete 10-module study notes (SEO, Ads, Analytics, Funnels, Email, Copywriting).
3. **All-Access Lifetime Bundle** (`lifetime-bundle`): **₹999**
   - Focus: Complete Edition + Lifetime quarterly syllabus updates + Notion Digital Marketing OS + Swipe Files.

*Rule: Client never transmits prices or discounts. All calculations and lookups occur server-side.*

## 3. Tech Stack & Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript (strict mode) + Tailwind CSS.
- **Repository Structure**: Located at the project root (`/app`, `/components`, `/lib`, `/config`, `/emails`, `/prisma`, `/tests`) for seamless Vercel deployment and CI workflows.
- **Database**: PostgreSQL (Neon, Supabase, or self-hosted) via Prisma ORM.
- **Payments**: Razorpay Standard Checkout (UPI, Netbanking, Cards, Wallets) with server-side order creation, webhook verification, and idempotency.
- **Storage**: Private storage bucket (Cloudflare R2 / AWS S3 / Supabase Storage). Files are accessed strictly via signed, time-limited download tokens (48 hours, 5 downloads max).
- **Email Delivery**: Resend (with dev fallback logger when API keys are not supplied).
- **Validation**: Zod schema validation across all environment variables, API endpoints, and forms.

## 4. Legal & Compliance
- **GST Status**: Default set to `hasGst: false` (creator under ₹20L exemption threshold). Can be toggled to `true` in `config/site.ts` by supplying a valid GSTIN.
- **DPDP Act 2023 Compliance**: Clear, purpose-specific consent for leads and tracking; Google Consent Mode v2 enabled by default (denied until explicit acceptance).
- **Refund Policy**: Placeholder 7-day money-back guarantee with prominent disclaimers that legal documents must be reviewed by qualified legal counsel.
- **Support Contact**: `support@growthnotes.in` (configurable).

## 5. Testing & CI/CD
- **Unit & Integration Tests**: Vitest + React Testing Library.
- **E2E Tests**: Playwright (covering mobile viewport, sample lead capture, and Razorpay test checkout).
- **CI**: GitHub Actions workflow running lint, typecheck, format check, and tests.

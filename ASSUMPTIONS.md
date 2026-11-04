# Project Assumptions & Configuration Blueprint

This document tracks all reasonable assumptions made to ensure a production-ready, conversion-optimized build without unnecessary blocking questions.

## 1. Brand & Business Context
- **Brand Name**: **DevOps with Jeet** (`devopswithjeet.in`)
  - Configurable in `config/site.ts` and `config/content.ts`.
- **Target Audience**: Engineers, computer science students, and career-switchers in India preparing for DevOps/SRE roles and industry certifications (CKA, CKAD, Terraform Associate, AWS).
- **Primary Job of the Page**: Convince a skeptical engineer that the study notes are accurate, concise, diagram-rich, and hands-on enough to buy.
- **Tone & Point of View**: Practical, production-grounded, plain language, and sentence case. No fake urgency, no invented pass rates or student counts.
- **Primary Goal**: Paid PDF purchase conversions via UPI (Google Pay, PhonePe, Paytm), netbanking, and cards.
- **Secondary Goal**: Free sample chapter signup (email capture + DPDP Act 2023 consent) with automated watermarked sample delivery.

## 2. Product Catalog & Pricing
Prices and metadata are centralized in `config/products.ts` (currency: INR):
1. **Single Topic Pack** (`single-topic`): **₹299**
   - Focus: Kubernetes Notes (Pods, Deployments, Networking, Ingress, RBAC, CKA practice).
   - Storage path: `products/devopswithjeet-kubernetes-notes.pdf`
2. **Complete Edition** (`complete-edition`): **₹699** *(Most Popular)*
   - Focus: All 8 modules (Linux & Networking, Docker, Kubernetes Core, Helm & Manifests, CI/CD with GitHub Actions, Terraform, Observability with Prometheus & Grafana, Cloud Basics).
   - Storage path: `products/devopswithjeet-complete-devops-notes.pdf`
3. **All-Access Lifetime Bundle** (`lifetime-bundle`): **₹999** *(Lifetime Updates)*
   - Focus: Complete notes + Lifetime version updates + Helm starter templates + Lab environment setup scripts.
   - Storage path: `products/devopswithjeet-lifetime-all-access-bundle.pdf`

*Rule: Client never transmits prices or discounts. All lookups and verification occur server-side.*

## 3. Database Migration Note for Existing Product Rows
When migrating an existing database instance from the marketing catalog to the DevOps catalog:
- The seed script (`scripts/seed-products.ts`) upserts products matching by `slug` (`single-topic`, `complete-edition`, `lifetime-bundle`).
- Running `npm run seed:products` safely updates `title`, `description`, `priceInInr`, and `fileKey` in place for each product row.
- Any legacy orders linked by product ID or slug remain referentially intact because the primary slugs are preserved.
- For new deployments, run `npx prisma db push` followed by `npm run seed:products`.

## 4. Tech Stack & Architecture
- **Framework**: Next.js 14 (App Router) + TypeScript (strict mode) + Tailwind CSS.
- **Database**: PostgreSQL (Neon, Supabase, or self-hosted) via Prisma ORM.
- **Payments**: Razorpay Standard Checkout with server-side order creation, HMAC webhook verification, and idempotency.
- **Storage**: Private Supabase Storage bucket (`notes`). Files are accessed strictly via signed, time-limited download tokens (48 hours, 5 downloads max).
- **Email Delivery**: Resend (with development console fallback logger when API keys are not supplied).
- **Validation**: Zod schema validation across environment variables, API endpoints, and forms.

## 5. Learning Path & Syllabus (8 Modules)
Configured in `config/content.ts` as an engineering learning roadmap:
1. Module 1: Linux and networking basics (SSH, systemd, iptables, DNS, curl)
2. Module 2: Docker and containerization (multi-stage Dockerfile, cgroups, Compose)
3. Module 3: Kubernetes core (Pods, Deployments, Services, Ingress, RBAC)
4. Module 4: Helm and manifest management (Values, templates, releases, dry-run)
5. Module 5: CI/CD with GitHub Actions (Lint, test, container build, cluster rollout)
6. Module 6: Terraform infrastructure as code (State locking, modules, drift)
7. Module 7: Observability with Prometheus and Grafana (Metrics, PromQL, alerts)
8. Module 8: Cloud basics (AWS / GCP IAM, VPC, managed Kubernetes)

*Note: In compliance with project guidelines, all testimonials and author metrics are explicitly marked as `[PLACEHOLDER]` or `[TO CONFIRM]`, and no pass rates or salaries are invented.*

## 6. Previews & Watermarking
- **Watermark**: Diagonal semi-transparent overlay banner (`PREVIEW ONLY • DEVOPS WITH JEET`) embedded directly into WebP preview images (quality 70, 900px width).
- **Generation**: Pure Node.js with `sharp` via `scripts/generate-previews.ts`.
- **Sample Chapter**: Dispatched via `app/api/leads/sample/route.ts` with 48h signed HMAC-SHA256 download token for `samples/devopswithjeet-free-sample-chapter.pdf`.

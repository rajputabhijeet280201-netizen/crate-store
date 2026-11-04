# Project Architecture & Context: DevOps with Jeet

> **Usage Note**: This document provides the complete architectural breakdown, file tree, schemas, and core implementation code for this repository. It is designed to give any AI model instant, full context about this project.

---

## 1. Executive Summary & Architecture

This repository contains the production application for digital product sales:

1. **Root Application — DevOps with Jeet (`devops-with-jeet-store`)**:
   - **Framework**: Next.js 14 (App Router), TypeScript (strict mode), Tailwind CSS.
   - **Domain**: Concise, hands-on DevOps & cloud study notes & PDFs (`devopswithjeet.in`) targeting engineers and students in India (INR pricing, UPI via Razorpay, Google Pay, PhonePe).
   - **Database & ORM**: PostgreSQL via **Prisma ORM** (`prisma/schema.prisma`).
   - **Payments**: **Razorpay** checkout integration (orders, webhooks, signature verification).
   - **Storage & Distribution**: Private cloud storage (Supabase Storage) with time-limited signed tokens (48h expiry, 5-download limit).
   - **Email**: Resend transactional emails for watermarked download delivery.
   - **Testing**: Vitest + React Testing Library (unit/integration) and Playwright (E2E).

2. **Subsystem — Crate Store (`server/` + `client/`)**:
   - **Design Style**: Neo-brutalist digital goods marketplace (Templates, UI kits, code, sound packs).
   - **Backend (`/server`)**: Node.js + Express, MongoDB (Mongoose), JWT authentication (`bcryptjs`, `jsonwebtoken`), order & product endpoints.
   - **Frontend (`/client`)**: Next.js 14 client with React Context store (`lib/store.js`), API layer (`lib/api.js`), and routes for products, cart, library, and admin inventory management.

---

## 2. Complete File Directory Tree

```text
crate-store/
├── .github/
│   └── workflows/
│       └── ci.yml                     # GitHub Actions CI (lint, typecheck, format, test)
├── .husky/                            # Git pre-commit hooks
├── app/                               # Root Next.js 14 App Router (GrowthNotes)
│   ├── contact/page.tsx               # Contact & support page
│   ├── privacy/page.tsx               # Privacy policy (DPDP Act compliance)
│   ├── refund/page.tsx                # Refund policy
│   ├── terms/page.tsx                 # Terms of service
│   ├── globals.css                    # Tailwind + custom CSS
│   ├── layout.tsx                     # Root HTML layout, metadata & fonts
│   └── page.tsx                       # High-converting landing page
├── components/                        # UI components
│   ├── About.tsx                      # Author biography & credibility
│   ├── CashfreeCheckoutModal.tsx      # Modal popup checkout with Cashfree JS SDK v3
│   ├── FAQ.tsx                        # Accordion FAQ
│   ├── FinalCtaBand.tsx               # Bottom conversion band
│   ├── Footer.tsx                     # Legal and compliance footer
│   ├── HandbookModal.tsx              # Preview modal for roadmap handbooks
│   ├── Header.tsx                     # Sticky nav with fast CTA
│   ├── Hero.tsx                       # Value prop & payment badges
│   ├── KnowledgeSelector.tsx          # Interactive learning track selector
│   ├── NeedHelpWidget.tsx             # Floating support & FAQ assistant
│   ├── NotesPreview.tsx               # Preview reader with sample pages
│   ├── Pricing.tsx                    # 3-tier pricing cards in INR (Single, Complete, Lifetime)
│   ├── RoadmapTimeline.tsx            # Visual 9-milestone curriculum roadmap
│   ├── SalaryBenchmark.tsx            # Industry compensation benchmark callout
│   ├── SampleChapterSection.tsx       # Lead magnet (free PDF sample download)
│   ├── SocialProof.tsx                # Social proof badges & reviews
│   ├── StatsRibbon.tsx                # Metric ribbon highlights
│   ├── StickyMobileBar.tsx            # Sticky bottom buy button for mobile viewports
│   └── WhatsInside.tsx                # Feature highlights & syllabus breakdown
├── config/                            # Single source of truth configuration
│   ├── content.ts                     # Landing page copy, FAQs & chapter details
│   ├── products.ts                    # Tier definitions, prices (₹299, ₹699, ₹999), feature lists
│   └── site.ts                        # Site metadata, support email, GST settings, limits
├── emails/                            # React Email templates
│   └── download-link.tsx              # Secure download email template
├── lib/                               # Root shared utilities
│   ├── env.ts                         # Zod environment variable validation
│   └── prisma.ts                      # Prisma client singleton
├── prisma/
│   └── schema.prisma                  # PostgreSQL models: User, Product, Order, Payment, Lead, etc.
├── tests/                             # Unit & E2E tests
│   ├── unit/
│   │   ├── config.test.ts             # Pricing & tier consistency tests
│   │   └── ui.test.tsx                # Component rendering tests
│   └── setup.ts                       # Vitest test setup
├── .env.example                       # Root environment variable documentation
├── package.json                       # Root dependencies (Next 14, Prisma, Tailwind, Vitest)
├── playwright.config.ts               # E2E test configuration
├── tailwind.config.ts                 # Tailwind design system configuration
├── tsconfig.json                      # Strict TypeScript compiler options
├── vitest.config.ts                   # Vitest configuration
│
├── client/                            # Crate Neo-Brutalist Client (Next.js 14)
│   ├── app/
│   │   ├── admin/page.js              # Admin product management & creation
│   │   ├── cart/page.js               # Cart view & checkout trigger
│   │   ├── library/page.js            # User purchased products & download links
│   │   ├── login/page.js              # User auth (Login & Register tabs)
│   │   ├── products/[id]/page.js      # Single product detail view
│   │   ├── globals.css                # Neo-brutalist styling (borders, bold shadows)
│   │   ├── layout.js                  # Store provider & header wrapper
│   │   └── page.js                    # Marketplace catalog grid
│   ├── components/
│   │   ├── Header.js                  # Nav with cart item count & user state
│   │   └── ProductCard.js             # Neo-brutalist product card with add to cart
│   ├── lib/
│   │   ├── api.js                     # Fetch wrapper with JWT injection & URL normalization
│   │   └── store.js                   # React Context (Cart, User auth, localStorage persistence)
│   ├── .env.local.example             # Client env example (NEXT_PUBLIC_API_URL)
│   └── package.json                   # Client dependencies
│
└── server/                            # Crate Express REST API
    ├── api/
    │   └── index.js                   # Serverless entry point for Vercel
    ├── routes/
    │   ├── auth.js                    # POST /register, POST /login, GET /me
    │   ├── orders.js                  # POST / (create order), GET /mine, GET /:orderId/download/:productId
    │   └── products.js                # GET /, GET /:id, POST / (admin), DELETE /:id (admin)
    ├── authMiddleware.js              # JWT verification (`auth`) and role check (`admin`)
    ├── models.js                      # Mongoose models: User, Product, Order
    ├── seed.js                        # Database initial demo product & admin seeder
    ├── server.js                      # Express setup, CORS, MongoDB connection caching
    ├── vercel.json                    # Serverless routing config
    ├── .env.example                   # Server env template
    └── package.json                   # Server dependencies (express, mongoose, bcryptjs, jwt)
```

---

## 3. Database Schemas

### A. Root Application (PostgreSQL via Prisma ORM)

```prisma
enum OrderStatus {
  CREATED
  PAID
  FAILED
  REFUNDED
}

model User {
  id             String          @id @default(cuid())
  email          String          @unique
  name           String?
  phone          String?
  orders         Order[]
  downloadTokens DownloadToken[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  @@index([email])
}

model Product {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  description String
  priceInInr  Int      // ₹299, ₹699, ₹999
  fileKey     String   // Private S3/R2 storage key
  isActive    Boolean  @default(true)
  orders      Order[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id             String          @id @default(cuid())
  orderNumber    String          @unique // e.g. GN-2026-1001
  userId         String
  user           User            @relation(fields: [userId], references: [id])
  productId      String
  product        Product         @relation(fields: [productId], references: [id])
  amountInInr    Int
  currency       String          @default("INR")
  status         OrderStatus     @default(CREATED)
  paymentMethod  String?
  
  // Marketing Attribution
  utmSource      String?
  utmMedium      String?
  utmCampaign    String?
  utmContent     String?
  utmTerm        String?
  referrer       String?
  gclid          String?
  fbclid         String?

  invoiceNumber  String?
  payment        Payment?
  downloadTokens DownloadToken[]
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt

  @@index([userId])
  @@index([productId])
  @@index([status])
  @@index([utmSource, utmCampaign])
}

model Payment {
  id                 String   @id @default(cuid())
  orderId            String   @unique
  order              Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  razorpayOrderId    String
  razorpayPaymentId  String?  @unique
  razorpaySignature  String?
  status             String   // created, captured, failed, refunded
  amountInPaise      Int
  currency           String   @default("INR")
  method             String?  // upi, card, netbanking, etc.
  bank               String?
  wallet             String?
  vpa                String?  // UPI ID
  errorDescription   String?
  rawWebhookPayload  Json?
  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  @@index([razorpayOrderId])
  @@index([razorpayPaymentId])
}

model DownloadToken {
  id               String    @id @default(cuid())
  token            String    @unique
  orderId          String
  order            Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  userId           String
  user             User      @relation(fields: [userId], references: [id])
  expiresAt        DateTime
  maxUsageCount    Int       @default(5)
  usageCount       Int       @default(0)
  isRevoked        Boolean   @default(false)
  lastDownloadedAt DateTime?
  createdAt        DateTime  @default(now())

  @@index([token])
  @@index([orderId])
  @@index([userId])
}

model Lead {
  id               String    @id @default(cuid())
  email            String
  name             String?
  source           String    @default("free_sample")
  utmSource        String?
  utmMedium        String?
  utmCampaign      String?
  utmContent       String?
  utmTerm          String?
  referrer         String?
  consentFlag      Boolean   @default(true) // DPDP Act compliance
  consentTimestamp DateTime  @default(now())
  sampleSentAt     DateTime?
  hasPurchased     Boolean   @default(false)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  @@index([email])
}
```

### B. Crate Server (MongoDB via Mongoose in `server/models.js`)

```javascript
const { Schema, model, Types } = require('mongoose');

// User Model
const User = model('User', new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true }));

// Product Model
const Product = model('Product', new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 }, // whole rupees (INR)
  category: { type: String, default: 'Other' },
  color: { type: String, default: '#FFD60A' },
  fileUrl: { type: String, required: true }, // protected file path / URL
}, { timestamps: true }));

// Order Model
const Order = model('Order', new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: Types.ObjectId, ref: 'Product' }, title: String, price: Number }],
  total: Number,
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
}, { timestamps: true }));

module.exports = { User, Product, Order };
```

---

## 4. Environment Variables Configuration

### Root App (`.env.local`)
```env
NODE_ENV=development
APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# PostgreSQL Database (Neon/Supabase/Local)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/growthnotes?schema=public"

# Razorpay Test / Live Keys
RAZORPAY_KEY_ID="rzp_test_YourKeyIdHere"
RAZORPAY_KEY_SECRET="YourKeySecretHere"
RAZORPAY_WEBHOOK_SECRET="YourWebhookSecretHere"
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_YourKeyIdHere"

# File Storage & Token Security
STORAGE_PROVIDER="local" # 'local' | 's3' | 'r2' | 'supabase'
DOWNLOAD_TOKEN_SECRET="super-secret-hex-or-string-for-token-signing-min-16-chars"

# Transactional Emails (Resend)
RESEND_API_KEY="re_123456789"
RESEND_FROM_EMAIL="GrowthNotes <downloads@growthnotes.in>"

# Admin Access
ADMIN_SECRET_KEY="change_me_to_a_secure_admin_password_in_production"
```

### Server App (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/crate
JWT_SECRET=your_jwt_secret_key
CLIENT_ORIGIN=http://localhost:3000
```

### Client App (`client/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 5. Key Architecture & Business Rules

1. **Price Integrity**: Prices are never accepted from the frontend. The server always resolves product prices strictly from database/config (`config/products.ts` or MongoDB `Product` collection).
2. **Secure File Access**: PDF/Digital downloads are never publicly linked. Access is gated behind signed, short-lived tokens or authenticated order verification.
3. **Payment Flow (Razorpay)**:
   - Client requests order creation from server.
   - Server initializes order on Razorpay with amount in paise (`amount * 100`) and records order state as `CREATED` / `pending`.
   - Client triggers Razorpay Standard Checkout modal with `NEXT_PUBLIC_RAZORPAY_KEY_ID`.
   - On completion, webhook verifies HMAC signature before updating status to `PAID` and generating the download link.
4. **Attribution & Marketing**: Root order schema captures full UTM parameters (`utmSource`, `utmCampaign`, `gclid`, `fbclid`) for tracking ad spend ROAS.

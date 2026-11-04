# Supabase Storage Setup Guide

This guide walks you through setting up the private Supabase Storage bucket used to store and serve DevOps with Jeet PDF files.

## Overview

DevOps with Jeet uses a **private** Supabase Storage bucket named `notes`. Files are never served directly to buyers — all downloads are proxied through our server with watermarking, signed tokens, and `Cache-Control: no-store`.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New Project**.
3. Choose your organization, give the project a name (e.g., `devopswithjeet`), set a strong database password, and select a region close to your audience (e.g., `ap-south-1` for India).
4. Wait for the project to finish provisioning (~2 minutes).

## Step 2: Create the Private Bucket

1. In the Supabase Dashboard, go to **Storage** in the left sidebar.
2. Click **New Bucket**.
3. Name it exactly: `notes`
4. **Leave "Public bucket" toggled OFF** — this bucket must be private.
5. Optionally set a file size limit (e.g., 50 MB) and allowed MIME types (`application/pdf`).
6. Click **Create bucket**.

> **⚠️ Important**: Never make this bucket public. All file access is controlled server-side through signed download tokens.

## Step 3: Copy Your API Keys

1. In the Supabase Dashboard, go to **Settings → API**.
2. Copy the following values:

| Key | Where to find it | What it's for |
|-----|------------------|---------------|
| **Project URL** | Settings → API → Project URL | `SUPABASE_URL` in `.env.local` |
| **Service Role Key** | Settings → API → `service_role` (secret) | `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` |

3. Add them to your `.env.local`:

```env
SUPABASE_URL="https://your-project-ref.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIs..."
```

> **⚠️ Security**: The `service_role` key bypasses Row Level Security. Never expose it in client-side code or commit it to version control. It is only used server-side in `lib/storage.ts`.

## Step 4: Upload Your PDFs

### Option A: Using the upload script (recommended)

1. Create a `local-pdfs/` directory in the project root.
2. Place your PDF files inside, matching the folder structure from `config/products.ts`:

```
local-pdfs/
├── products/
│   ├── devopswithjeet-kubernetes-notes.pdf
│   ├── devopswithjeet-complete-devops-notes.pdf
│   └── devopswithjeet-lifetime-all-access-bundle.pdf
└── samples/
    └── devopswithjeet-free-sample-chapter.pdf
```

3. Run the upload script:

```bash
npm run upload:notes
```

This uploads each file to the corresponding path in the `notes` bucket.

### Option B: Using the Supabase Dashboard

1. Go to **Storage → notes** bucket in the Dashboard.
2. Create a `products/` folder and upload each PDF.
3. Create a `samples/` folder and upload the sample chapter PDF.

## Step 5: Verify the Upload

Run the storage check script to confirm every active product's file is present:

```bash
npm run check:storage
```

You should see a green checkmark for every product and sample file.

## Step 6: Seed the Database

After uploading the PDFs, seed the products table so the database matches `config/products.ts`:

```bash
npm run seed:products
```

This upserts all products with the correct `fileKey` (the Supabase bucket path) and pricing.

## Environment Variables Summary

| Variable | Required | Server/Client | Description |
|----------|----------|---------------|-------------|
| `SUPABASE_URL` | Yes (for storage) | Server only | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (for storage) | Server only | Service role key (secret) |

## Folder Structure in the Bucket

```
notes/                          ← Private Supabase Storage bucket
├── products/                   ← Paid product PDFs
│   ├── devopswithjeet-kubernetes-notes.pdf
│   ├── devopswithjeet-complete-devops-notes.pdf
│   └── devopswithjeet-lifetime-all-access-bundle.pdf
└── samples/                    ← Free sample chapter PDFs
    └── devopswithjeet-free-sample-chapter.pdf
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `StorageConfigError: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set` | Add both vars to `.env.local`. See Step 3. |
| `StorageNotFoundError: File not found` | Verify the file was uploaded to the correct path. Run `npm run check:storage`. |
| `StorageNetworkError` with 5xx | Supabase may be experiencing issues. The client retries 3 times with exponential backoff automatically. |
| Upload script says "local file not found" | Ensure your PDFs are in `local-pdfs/` matching the folder structure above. |

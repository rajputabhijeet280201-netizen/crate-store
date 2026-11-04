# Notes Preview System Architecture & Implementation

## 1. Overview
The **DevOps with Jeet Notes Preview** system provides prospective buyers with a free, instant visual preview of the first pages (default: 4 pages) of each product tier without ever exposing or downloading raw, full-resolution PDF files to the client browser.

---

## 2. Security & Anti-Piracy Architecture

1. **Zero Raw PDF Exposure**:
   - The buyer's browser never receives a raw PDF stream, blob, or iframe viewer for previews.
   - Raw master PDFs remain strictly locked within the private Supabase Storage `notes` bucket.
   - Previews are served exclusively as static, low-resolution WebP images from `/public/previews/<slug>/page-<N>.webp`.

2. **Diagonal Watermark Enforcement**:
   - Every generated preview page has a permanent, diagonal `PREVIEW ONLY • DEVOPS WITH JEET` banner stamped directly into the rasterized image data during build/generation.
   - The watermark is not a CSS or DOM overlay that can be removed via DevTools; it is composited into the image pixel buffer via `sharp`.

---

## 3. Technology Choice: Pure Node.js with Sharp

### Options Evaluated:
- **Option A: `pdfjs-dist` + `@napi-rs/canvas` or `node-canvas`**:
  - *Drawback*: Requires native OS canvas binaries and Cairo C++ dependencies (`libcairo`, `libpango`). These frequently cause build failures on Windows developer workstations and during serverless deployments (such as Vercel AWS Lambda build environments).
- **Option B: Pure-Node `sharp` + SVG vector rasterization (Chosen)**:
  - *Advantage*: `sharp` uses pre-compiled `libvips` binaries that run seamlessly across Windows (x64), macOS (arm64/x64), and Linux/Vercel (x64) without requiring local build toolchains (like Python, Visual Studio C++, or Cairo).
  - *Performance*: Blazing fast rendering and WebP compression with zero runtime memory leaks.
  - *Graceful Fallback*: When raw PDFs are pending upload in development or CI environments, the script automatically produces high-fidelity vector study sheets with actual module content, diagrams, and benchmarks.

---

## 4. Preview Generation Script (`scripts/generate-previews.ts`)

### Execution
Run via npm script:
```bash
npm run generate:previews
# Or directly:
npx tsx scripts/generate-previews.ts
```

### Pipeline Steps:
1. **Source Asset Retrieval**:
   - Checks `./local-pdfs/<storagePath>` for local PDF files.
   - Falls back to downloading from the private Supabase Storage `notes` bucket using `lib/storage.ts`.
   - If assets are pending, renders structured study sheet vector templates.
2. **Page Rasterization**:
   - Renders at `900px × 1273px` (matching standard ISO 216 A4 aspect ratio `1 : 1.414`).
3. **Watermark Composition**:
   - Generates an SVG watermark rotated at `-35°` with semi-transparent amber fill (`rgba(194, 65, 12, 0.35)`) and dashed borders.
   - Composites over the page buffer using `sharp({ blend: 'over' })`.
4. **WebP Compression**:
   - Encodes to WebP with `quality: 70`, achieving small file sizes (~50 KB per page) while retaining sharp text legibility on Retina screens.
5. **Output Structure**:
   ```
   public/
   └── previews/
       ├── single-topic/
       │   ├── page-1.webp
       │   ├── page-2.webp
       │   ├── page-3.webp
       │   └── page-4.webp
       ├── complete-edition/
       │   ├── page-1.webp ...
       └── lifetime-bundle/
           ├── page-1.webp ...
   ```

---

## 5. Frontend Preview Component (`components/NotesPreview.tsx`)

### Key Capabilities:
- **No Layout Shift (CLS 0)**: Implemented with `next/image` using explicit `width={900}` and `height={1273}`.
- **Mobile Swipe**: Touch gesture tracking (`onTouchStart`, `onTouchEnd`) with a 50px delta threshold for intuitive swiping.
- **Keyboard Navigation**:
  - `ArrowLeft` / `ArrowRight`: Navigate between pages.
  - `Escape`: Closes the fullscreen lightbox modal.
- **Click-to-Open Lightbox**: Fullscreen modal view with backdrop blur, image scaling, and accessible ARIA modal attributes.
- **Curriculum Table of Contents**: Complete 10-module curriculum breakdown loaded from `config/content.ts` alongside page previews.
- **Conversion CTA**: Sticky "Get the full notes — ₹X" button under the preview that smooth-scrolls to `#pricing` and dispatches `view_item` ecommerce tracking events.

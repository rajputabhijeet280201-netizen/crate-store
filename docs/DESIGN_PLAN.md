# DevOps with Jeet — Design System & Engineering Layout Plan

## 1. Executive Concept

**Concept**: *An engineer's workbench designed as an operational console: a live, tabbed manifest-inspector hero, a linear deployment-pipeline learning path, and an operational status-matrix pricing tier.*

The design abandons generic e-book marketing cliches (floating 3D mockups, warm cream backgrounds, centered sales copy, and decorative gradient washes). Instead, every visual element carries architectural meaning drawn from cloud infrastructure: annotated YAML diffs, pipeline stages with prerequisites, and telemetry status signals.

---

## 2. Color Palette (Named Hex Values)

Theme-aware tokens defined on `:root` and `@media (prefers-color-scheme: dark)`:

| Token Name | Light Hex | Dark Hex | Functional Role |
|------------|-----------|----------|-----------------|
| `bg-canvas` | `#F8FAFC` | `#0B0F17` | Root background — engineered slate canvas |
| `bg-surface` | `#FFFFFF` | `#111827` | Content surfaces and container backdrops |
| `border-line` | `#E2E8F0` | `#1F2937` | Structural architectural grid lines and dividers |
| `text-primary` | `#0F172A` | `#F1F5F9` | High-contrast body text and headings (AA compliant) |
| `text-secondary` | `#475569` | `#94A3B8` | Explanatory annotations and parameter descriptions |
| `signal-blue` | `#0284C7` | `#38BDF8` | Focus states, interactive tabs, primary CTAs |
| `signal-green` | `#16A34A` | `#22C55E` | Telemetry active/healthy status in matrix |

### Color Rules:
- No decorative gradients or acid-green accents on near-black backgrounds.
- No warm cream / terracotta palettes.
- Color is employed strictly to communicate operational state (Active vs Pending vs Excluded).

---

## 3. Typography Hierarchy

Avoided defaults: *Inter, Roboto, Space Grotesk, Instrument Serif, Fraunces*.

- **Primary Typeface**: `IBM Plex Sans` (loaded via `next/font/google`).
  - Chosen for its heritage as an engineered typeface designed for technical clarity, system consoles, and readability.
  - Weights: `400` (body text), `500` (interactive UI/buttons), `600` (subheads), `700` (primary headings).
  - Maximum measure: 72 characters per line for optimal reading ergonomics.
  - Sentence case across all headlines and UI copy.
- **Monospace Typeface**: `JetBrains Mono` (loaded via `next/font/google`).
  - Restricted strictly to: code blocks, YAML manifests, terminal commands, and configuration keys.
  - **Constraint Enforced**: Monospace is NEVER used for decorative labels, eyebrows, or badges.

---

## 4. Visual Language & Border-Radius Hierarchy

Instead of arbitrary rounded corners or identical cards everywhere:
- **Root containers / artifact shells**: `8px` (`rounded-lg`) with `1px solid var(--border-line)`.
- **Code manifests & interactive panes**: `6px` (`rounded-md`).
- **Buttons & input fields**: `6px` (`rounded-md`) with clear 2px outline focus rings.
- **Section structure**: Asymmetrical workbench layouts. Only pricing uses comparative columns; the syllabus is rendered as an interconnected deployment pipeline.

---

## 5. Layout & ASCII Wireframes

### Alignment Decision
**Strictly Left-Aligned by default**. Centered marketing copy is eliminated. Engineers read left-to-right from context to specification.

### 5.1 Hero Section
The hero's focal point is the **Interactive Manifest Inspector** — an authentic, syntax-highlighted Kubernetes Deployment manifest with line-by-line annotations that visitors can switch between (Kubernetes, Docker, Terraform).

#### Desktop Hero Wireframe:
```text
+-------------------------------------------------------------------------------+
| [D] DevOps with Jeet        Learning Path   Preview   Pricing   FAQ   [Get Notes] |
+-------------------------------------------------------------------------------+
|                                                                               |
| DevOps study notes that explain the why,        +-- [Manifest Inspector] ---+ |
| not just the syntax                             | [K8s Deploy] [Terraform]  | |
|                                                 |---------------------------| |
| Concise, diagram-heavy PDFs for engineers,      | 1  apiVersion: apps/v1    | |
| students, and career-switchers preparing for    | 2  kind: Deployment       | |
| CKA and Terraform Associate certifications.     | 3  spec:                  | |
|                                                 | 4    replicas: 3          | |
| [Buy the complete notes (₹699)]                 | 5    strategy:            | |
| [Download free sample chapter]                  | 6      rollingUpdate:     | |
|                                                 | 7        maxSurge: 1      | |
| ⚡ Instant PDF   🔒 UPI / Card   📱 Mobile-ready  | 8        maxUnavailable: 0| |
|                                                 +---------------------------+ |
|                                                 | ↳ Zero-downtime rollout   | |
|                                                 |   guaranteed by 0 unavail | |
|                                                 +---------------------------+ |
+-------------------------------------------------------------------------------+
```

#### Mobile Hero Wireframe (375px):
```text
+-----------------------------------+
| [D] DevOps with Jeet          [=] |
+-----------------------------------+
|                                   |
| DevOps study notes that explain   |
| the why, not just the syntax      |
|                                   |
| Concise, diagram-heavy PDFs for   |
| engineers preparing for CKA.      |
|                                   |
| [Buy complete notes (₹699)]       |
| [Download free sample chapter]    |
|                                   |
| +-- [Interactive Manifest] -----+ |
| | [K8s Deployment]              | |
| | strategy:                     | |
| |   rollingUpdate:              | |
| |     maxSurge: 1               | |
| |     maxUnavailable: 0         | |
| +-------------------------------+ |
| | ↳ Explanation: 0 unavailable  | |
| |   prevents dropped requests.  | |
| +-------------------------------+ |
+-----------------------------------+
```

---

### 5.2 Learning Path Wireframe (Pipeline Sequence)
Numbered stages are applied strictly here because an engineering syllabus is a true chronological sequence with prerequisites.

```text
+-------------------------------------------------------------------------------+
| Learning path (8 modules)                                                     |
| Progress from Linux server basics to multi-cloud container orchestration.     |
|                                                                               |
|  [01 Linux] ---> [02 Docker] ---> [03 Kubernetes] ---> [04 Helm]              |
|   Sysadmin        Multi-stage      Workloads &          Package manifests     |
|   & iptables      containers       Ingress networking   & dry-run deploys     |
|                                                                               |
|       |                                                                       |
|       v                                                                       |
|  [05 CI/CD] ---> [06 Terraform] -> [07 Observability] -> [08 Cloud]           |
|   GitHub          IaC state        Prometheus &         AWS / GCP             |
|   Actions         & modules        Grafana alerts       EKS & GKE setup       |
|                                                                               |
| +---------------------------------------------------------------------------+ |
| | Selected Module Detail: 03 Kubernetes Core                                | |
| | What you will do: Architect zero-downtime deployments and configure RBAC. | |
| | Topics: Pods, ReplicaSets, RollingUpdate, Services, Ingress, NetworkPolicy| |
| | Lab scenario: Configure a NetworkPolicy that isolates the backend tier.   | |
| +---------------------------------------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

---

### 5.3 Pricing Comparison Matrix Wireframe
Clear operational matrix showing included modules without ambiguous marketing bullet points.

```text
+-------------------------------------------------------------------------------+
| Choose your study pack                                                        |
| Instant watermarked PDF delivered to your email upon payment.                 |
|                                                                               |
| MODULE / FEATURE               | KUBERNETES    | COMPLETE      | LIFETIME     |
|                                | ₹299          | ₹699 (POPULAR)| ₹999         |
|--------------------------------+---------------+---------------+--------------|
| Linux & networking basics      |     --        |       ✓       |      ✓       |
| Docker & containerization      |     --        |       ✓       |      ✓       |
| Kubernetes core & workloads    |      ✓        |       ✓       |      ✓       |
| Helm & manifests               |     --        |       ✓       |      ✓       |
| CI/CD with GitHub Actions      |     --        |       ✓       |      ✓       |
| Terraform IaC & state          |     --        |       ✓       |      ✓       |
| Observability (Prometheus/Graf)|     --        |       ✓       |      ✓       |
| Cloud basics (AWS / GCP)       |     --        |       ✓       |      ✓       |
| Future version updates         |     --        |      --       |      ✓       |
| Ready-to-deploy Helm templates |     --        |      --       |      ✓       |
|--------------------------------+---------------+---------------+--------------|
| Delivery                       | Instant PDF   | Instant PDF   | Instant PDF  |
|                                | [Buy ₹299]    | [Buy ₹699]    | [Buy ₹999]   |
+-------------------------------------------------------------------------------+
```

---

## 6. Review & Anti-Default Audit

We reviewed this plan against standard web templates and marketing defaults:

| Planned Item | Initial Default Tendency | Review Decision & What Was Changed |
|--------------|--------------------------|-------------------------------------|
| Hero Visual | Generic 3D book mockup or floating PDF cover with glowing drop-shadow | **Rejected**. Replaced with an authentic, interactive Kubernetes manifest inspector with tab switching and real configuration annotations. |
| Typography | Inter or Space Grotesk | **Rejected**. Chosen `IBM Plex Sans` for engineering pedigree and clarity, paired with `JetBrains Mono` strictly for code. |
| Eyebrow Labels | Tracked-out uppercase tags (`MODULE 01 — SYLLABUS`) | **Rejected**. Replaced with plain sentence case labels without artificial letter-spacing or decorative em-dashes. |
| CTAs & Buttons | Arrows appended to buttons (`Buy Now →`) | **Rejected**. Action buttons use clear, direct statements of outcome (`Buy the complete notes`, `Download free sample chapter`). |
| Layout Structure | Chopped into 10 identical rounded cards with soft box-shadows | **Rejected**. Used varied structural containers: an interactive inspector pane, a connected pipeline sequence, and an operational comparison matrix table. |
| Headings | Centered headlines with highlighted color words | **Rejected**. Left-aligned by default; natural sentence case without gimmick styling. |
| Motion | Staggered fade-up scroll animations on every card | **Rejected**. Zero scroll-jacking. Exactly one initial subtle assembly on the hero inspector; all subsequent animations are user-triggered (switching manifest tabs, accordion toggle). |

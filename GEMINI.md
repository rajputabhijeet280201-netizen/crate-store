# Agent Coding Rules & Skill Enforcement

Whenever coding, modifying architecture, or performing database/infrastructure operations in this project, adhere strictly to the following standards:

## 1. Skill-First Execution
- Prioritize and consult installed skills (including the Google Gemini official skills suite cataloged at [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills#skills-by-google-gemini) and local workspace skills in `.agents/skills/`) before implementing features.
- Specifically:
  - **Payment & Checkout**: Follow `.agents/skills/cashfree-payment-gateway/SKILL.md` for payment flows, HMAC signature verification, idempotency, and secure webhooks.
  - **Data Safety**: Strictly observe `accidental-data-loss-prevention` before running destructive queries, dropping tables, or altering production data.
  - **Database & Data Architecture**: Follow `cloud-databases-onboarding`, `schema-mapping`, and Prisma best practices for schema migrations.
  - **Application Development & UI**: Adhere to `building-data-apps` and Next.js / React best practices.

## 2. Code Quality & Consistency
- Adhere to TypeScript strict mode, clean modular architecture, and project conventions.
- Maintain existing tests and ensure any new endpoint or business logic has proper coverage (Vitest / Playwright).
- Do not commit secrets; always manage sensitive credentials through `.env` and validation schemas in `lib/env.ts`.


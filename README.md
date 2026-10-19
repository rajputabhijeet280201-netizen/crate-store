# Crate — MERN + Next.js digital product store (neo-brutalist)

## Run
1. MongoDB running locally (or use an Atlas URI).
2. Server: `cd server && cp .env.example .env && npm i && npm run seed && npm run dev`  (API on :5000)
3. Client: `cd client && cp .env.local.example .env.local && npm i && npm run dev`  (site on :3000)
4. Admin login after seeding: admin@example.com / admin123 (change it).

## Before going live
- Replace the demo checkout in `server/routes/orders.js` with Razorpay or Stripe (mark orders paid from the webhook).
- Host product files privately (S3/R2) and return short-lived signed URLs from the download route.

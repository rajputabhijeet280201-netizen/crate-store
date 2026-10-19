import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // App base URL
  APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Database (Postgres via Prisma)
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .default('postgresql://postgres:postgres@localhost:5432/growthnotes?schema=public'),
  DIRECT_URL: z.string().optional(),

  // Razorpay
  RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder_key_id'),
  RAZORPAY_KEY_SECRET: z.string().default('rzp_test_placeholder_key_secret'),
  RAZORPAY_WEBHOOK_SECRET: z.string().default('rzp_test_placeholder_webhook_secret'),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder_key_id'),

  // Secure File Storage & Download Tokens
  STORAGE_PROVIDER: z.enum(['local', 's3', 'r2', 'supabase']).default('local'),
  STORAGE_ACCESS_KEY_ID: z.string().optional(),
  STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
  STORAGE_BUCKET_NAME: z.string().optional().default('growthnotes-private-assets'),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_REGION: z.string().optional().default('auto'),
  DOWNLOAD_TOKEN_SECRET: z
    .string()
    .min(16, 'DOWNLOAD_TOKEN_SECRET must be at least 16 chars')
    .default('dev-secret-key-at-least-16-characters-long'),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional().default('re_placeholder_key'),
  RESEND_FROM_EMAIL: z.string().default('GrowthNotes <downloads@growthnotes.in>'),

  // Admin Security
  ADMIN_SECRET_KEY: z.string().min(8).default('growthnotes_admin_super_secret'),

  // Tracking & Analytics (Optional in local dev)
  NEXT_PUBLIC_GTM_ID: z.string().optional().default('GTM-DEMO123'),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().optional().default('1234567890'),
  META_CONVERSIONS_API_TOKEN: z.string().optional().default(''),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format());
    throw new Error('Invalid environment variables. See terminal output for details.');
  }
  return result.data;
}

export const env = validateEnv();

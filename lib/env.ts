import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // App base URL
  APP_URL: z
    .string()
    .url()
    .default('http://localhost:3000')
    .transform((url) => {
      let cleaned = url.replace(/\/+$/, '');
      if (cleaned.includes('devopswithjeet.tech') || cleaned.includes('devopsjeet.tech')) {
        return 'https://www.devopsjeet.tech';
      }
      return cleaned;
    }),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default('http://localhost:3000')
    .transform((url) => {
      let cleaned = url.replace(/\/+$/, '');
      if (cleaned.includes('devopswithjeet.tech') || cleaned.includes('devopsjeet.tech')) {
        return 'https://www.devopsjeet.tech';
      }
      return cleaned;
    }),

  // Database (Postgres via Prisma)
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .default('postgresql://postgres:postgres@localhost:5432/devopswithjeet?schema=public'),
  DIRECT_URL: z.string().optional(),

  // Razorpay (Legacy / Optional)
  RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder_key_id'),
  RAZORPAY_KEY_SECRET: z.string().default('rzp_test_placeholder_key_secret'),
  RAZORPAY_WEBHOOK_SECRET: z.string().default('rzp_test_placeholder_webhook_secret'),
  NEXT_PUBLIC_RAZORPAY_KEY_ID: z.string().default('rzp_test_placeholder_key_id'),

  // Cashfree Payment Gateway
  CASHFREE_APP_ID: z.string().trim().default('TEST_CF_APP_ID_PLACEHOLDER'),
  CASHFREE_SECRET_KEY: z.string().trim().default('TEST_CF_SECRET_KEY_PLACEHOLDER'),
  CASHFREE_ENV: z
    .string()
    .trim()
    .default('SANDBOX')
    .transform((val) => val.toUpperCase())
    .pipe(z.enum(['SANDBOX', 'PRODUCTION'])),
  CASHFREE_API_VERSION: z.string().trim().default('2023-08-01'),
  NEXT_PUBLIC_CASHFREE_ENV: z
    .string()
    .trim()
    .default('sandbox')
    .transform((val) => val.toLowerCase())
    .pipe(z.enum(['sandbox', 'production'])),

  // Secure File Storage & Download Tokens
  STORAGE_PROVIDER: z.enum(['local', 's3', 'r2', 'supabase']).default('supabase'),
  STORAGE_ACCESS_KEY_ID: z.string().optional(),
  STORAGE_SECRET_ACCESS_KEY: z.string().optional(),
  STORAGE_BUCKET_NAME: z.string().optional().default('devopswithjeet-private-assets'),
  STORAGE_ENDPOINT: z.string().optional(),
  STORAGE_REGION: z.string().optional().default('auto'),
  DOWNLOAD_TOKEN_SECRET: z
    .string()
    .min(16, 'DOWNLOAD_TOKEN_SECRET must be at least 16 chars')
    .default('dev-secret-key-at-least-16-characters-long'),

  // Supabase Configuration
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional().default('re_placeholder_key'),
  RESEND_FROM_EMAIL: z.string().default('DevOps with Jeet <support@devopsjeet.tech>'),

  // Admin Security
  ADMIN_SECRET_KEY: z.string().min(8).default('devopswithjeet_admin_super_secret'),

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

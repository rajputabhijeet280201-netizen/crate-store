import { createClient, SupabaseClient } from '@supabase/supabase-js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** The private Supabase Storage bucket that holds all note PDFs. */
const BUCKET_NAME = 'notes';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

// ---------------------------------------------------------------------------
// Typed storage errors
// ---------------------------------------------------------------------------

export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

export class StorageNotFoundError extends StorageError {
  constructor(path: string) {
    super(`File not found in storage: ${path}`, 'NOT_FOUND', 404);
    this.name = 'StorageNotFoundError';
  }
}

export class StorageNetworkError extends StorageError {
  constructor(message: string, statusCode?: number) {
    super(message, 'NETWORK_ERROR', statusCode);
    this.name = 'StorageNetworkError';
  }
}

export class StorageConfigError extends StorageError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR');
    this.name = 'StorageConfigError';
  }
}

// ---------------------------------------------------------------------------
// Supabase admin client singleton (server-side only — uses SERVICE_ROLE_KEY)
// ---------------------------------------------------------------------------

let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new StorageConfigError(
      'NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY environment variables must be set. ' +
        'See docs/STORAGE_SETUP.md for instructions.',
    );
  }

  supabaseAdmin = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseAdmin;
}

// ---------------------------------------------------------------------------
// Retry helper — exponential back-off with jitter on 5xx / network errors
// ---------------------------------------------------------------------------

function isRetryableError(error: unknown): boolean {
  if (error instanceof StorageError) {
    return typeof error.statusCode === 'number' && error.statusCode >= 500;
  }
  // Retry on generic network / fetch errors
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    return msg.includes('fetch') || msg.includes('network') || msg.includes('econnreset');
  }
  return false;
}

async function withRetry<T>(fn: () => Promise<T>, maxRetries: number = MAX_RETRIES): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries && isRetryableError(error)) {
        // Exponential back-off: 500ms, 1000ms, 2000ms + jitter
        const delay = BASE_DELAY_MS * Math.pow(2, attempt) + Math.random() * BASE_DELAY_MS;
        await new Promise((resolve) => setTimeout(resolve, delay));
        continue;
      }

      throw error;
    }
  }

  // Unreachable in practice, but satisfies the compiler
  throw lastError;
}

// ---------------------------------------------------------------------------
// Helpers to extract status codes from Supabase SDK errors
// ---------------------------------------------------------------------------

function extractStatusCode(error: unknown): number | undefined {
  if (error && typeof error === 'object') {
    const candidate =
      (error as Record<string, unknown>).statusCode ?? (error as Record<string, unknown>).status;
    return typeof candidate === 'number' ? candidate : undefined;
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Download a file from the private "notes" bucket.
 *
 * Uses `storage.from("notes").download(path)` as required.
 * Returns the file contents as a `Blob`. Callers can convert to
 * `ArrayBuffer` via `blob.arrayBuffer()` for watermarking / streaming.
 */
export async function getFileStream(path: string): Promise<Blob> {
  return withRetry(async () => {
    const client = getSupabaseAdmin();
    const { data, error } = await client.storage.from(BUCKET_NAME).download(path);

    if (error) {
      const statusCode = extractStatusCode(error);
      if (statusCode === 404 || error.message?.toLowerCase().includes('not found')) {
        throw new StorageNotFoundError(path);
      }
      throw new StorageNetworkError(
        `Failed to download "${path}": ${error.message}`,
        statusCode,
      );
    }

    if (!data) {
      throw new StorageNotFoundError(path);
    }

    return data;
  });
}

/**
 * Check whether a file exists in the private "notes" bucket.
 *
 * Uses `storage.from("notes").list()` to avoid downloading the entire file.
 * Throws on network errors (so callers don't interpret downtime as "missing").
 */
export async function fileExists(path: string): Promise<boolean> {
  return withRetry(async () => {
    const client = getSupabaseAdmin();

    // Split path into directory + filename for the list API
    const lastSlash = path.lastIndexOf('/');
    const dir = lastSlash >= 0 ? path.substring(0, lastSlash) : '';
    const filename = lastSlash >= 0 ? path.substring(lastSlash + 1) : path;

    const { data, error } = await client.storage.from(BUCKET_NAME).list(dir || undefined, {
      search: filename,
      limit: 100,
    });

    if (error) {
      const statusCode = extractStatusCode(error);
      throw new StorageNetworkError(
        `Failed to check existence of "${path}": ${error.message}`,
        statusCode,
      );
    }

    // The `search` option is a prefix match, so verify exact filename
    return Array.isArray(data) && data.some((f) => f.name === filename);
  });
}

/**
 * Upload a file to the private "notes" bucket.
 *
 * Used by the admin upload script (`scripts/upload-notes.ts`).
 * Upserts by default (replaces existing files with the same path).
 */
export async function uploadFile(
  path: string,
  file: Buffer | Blob,
  contentType: string = 'application/pdf',
): Promise<void> {
  return withRetry(async () => {
    const client = getSupabaseAdmin();
    const { error } = await client.storage.from(BUCKET_NAME).upload(path, file, {
      contentType,
      upsert: true,
    });

    if (error) {
      const statusCode = extractStatusCode(error);
      throw new StorageNetworkError(
        `Failed to upload "${path}": ${error.message}`,
        statusCode,
      );
    }
  });
}

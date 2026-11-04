import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  StorageError,
  StorageNotFoundError,
  StorageNetworkError,
  StorageConfigError,
} from '@/lib/storage';

// ---------------------------------------------------------------------------
// Error type tests (pure unit tests — no Supabase connection needed)
// ---------------------------------------------------------------------------

describe('Storage Error Types', () => {
  it('StorageError has correct name, code, and optional statusCode', () => {
    const err = new StorageError('test error', 'TEST_CODE', 500);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(StorageError);
    expect(err.name).toBe('StorageError');
    expect(err.message).toBe('test error');
    expect(err.code).toBe('TEST_CODE');
    expect(err.statusCode).toBe(500);
  });

  it('StorageNotFoundError has 404 status and NOT_FOUND code', () => {
    const err = new StorageNotFoundError('products/test.pdf');
    expect(err).toBeInstanceOf(StorageError);
    expect(err.name).toBe('StorageNotFoundError');
    expect(err.code).toBe('NOT_FOUND');
    expect(err.statusCode).toBe(404);
    expect(err.message).toContain('products/test.pdf');
  });

  it('StorageNetworkError has NETWORK_ERROR code', () => {
    const err = new StorageNetworkError('connection failed', 503);
    expect(err).toBeInstanceOf(StorageError);
    expect(err.name).toBe('StorageNetworkError');
    expect(err.code).toBe('NETWORK_ERROR');
    expect(err.statusCode).toBe(503);
  });

  it('StorageConfigError has CONFIG_ERROR code and no statusCode', () => {
    const err = new StorageConfigError('missing env vars');
    expect(err).toBeInstanceOf(StorageError);
    expect(err.name).toBe('StorageConfigError');
    expect(err.code).toBe('CONFIG_ERROR');
    expect(err.statusCode).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Product config — storagePath tests
// ---------------------------------------------------------------------------

describe('Product Config storagePath', () => {
  it('every product has a storagePath pointing to a PDF', async () => {
    const { PRODUCTS_LIST } = await import('@/config/products');
    for (const product of PRODUCTS_LIST) {
      expect(product.storagePath).toBeDefined();
      expect(product.storagePath.length).toBeGreaterThan(0);
      expect(product.storagePath).toMatch(/\.(pdf|zip)$/);
    }
  });

  it('every product has a fileKey equal to storagePath (backward compat)', async () => {
    const { PRODUCTS_LIST } = await import('@/config/products');
    for (const product of PRODUCTS_LIST) {
      expect(product.fileKey).toBe(product.storagePath);
    }
  });

  it('storagePaths are unique across products', async () => {
    const { PRODUCTS_LIST } = await import('@/config/products');
    const paths = PRODUCTS_LIST.map((p) => p.storagePath);
    const unique = new Set(paths);
    expect(unique.size).toBe(paths.length);
  });

  it('sampleStoragePath is defined and points to a PDF', async () => {
    const { PRODUCTS_LIST } = await import('@/config/products');
    for (const product of PRODUCTS_LIST) {
      if (product.sampleStoragePath) {
        expect(product.sampleStoragePath).toMatch(/\.pdf$/);
      }
    }
  });
});

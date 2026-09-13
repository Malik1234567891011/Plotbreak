import { describe, expect, it, vi } from 'vitest';
import { AppStoreVerifier } from './store-verifier.js';

/**
 * Apple has two environments and our deployment does not decide which one a
 * transaction lives in. A TestFlight build on a production server produces
 * sandbox transactions, and until the app has actually shipped the production
 * API answers 401 for it — so the verifier has to ask the other host rather
 * than believe the first refusal.
 *
 * Measured against the real API with a live key: production 401, sandbox 404.
 * Giving up on the 401 would have failed every TestFlight purchase.
 */
const KEY = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgevZzL1gdAFr88hb2
OF/2NxApJCzGCEDdfSp6VQO30hyhRANCAAQRWz+jn65BtOMvdyHKcvjBeBSDZH2r
1RTwjmYSi9R/zpBnuQ4EiMnCqfMPWiZqB4QdbAd0E7oH50VpuZ1P087G
-----END PRIVATE KEY-----`;

function verifierAnswering(statuses: Record<string, number>) {
  const seen: string[] = [];
  vi.stubGlobal('fetch', async (url: string) => {
    const host = String(url).includes('sandbox') ? 'sandbox' : 'production';
    seen.push(host);
    return { status: statuses[host]!, ok: statuses[host] === 200, json: async () => ({}) } as Response;
  });
  const verifier = new AppStoreVerifier({
    bundleId: 'com.plotbreak.app',
    keyId: 'TESTKEY123',
    issuerId: '00000000-0000-0000-0000-000000000000',
    privateKey: KEY,
    environment: 'PRODUCTION',
  });
  return { verifier, seen };
}

const input = {
  platform: 'APP_STORE' as const,
  productId: 'crd_2000',
  storeTransactionId: '2000000999888777',
  receipt: 'x',
  userId: 'u1',
};

describe('App Store host fallback', () => {
  it('asks sandbox when production says it does not know the app', async () => {
    const { verifier, seen } = verifierAnswering({ production: 401, sandbox: 404 });
    await verifier.verify(input);
    expect(seen).toEqual(['production', 'sandbox']);
  });

  it('still asks sandbox when production says the transaction is not there', async () => {
    const { verifier, seen } = verifierAnswering({ production: 404, sandbox: 404 });
    await verifier.verify(input);
    expect(seen).toEqual(['production', 'sandbox']);
  });

  it('stops at the first host that actually answers', async () => {
    const { verifier, seen } = verifierAnswering({ production: 500, sandbox: 404 });
    await verifier.verify(input);
    expect(seen).toEqual(['production']);
  });

  it('says plainly when neither environment accepts the key', async () => {
    const { verifier } = verifierAnswering({ production: 401, sandbox: 401 });
    const result = await verifier.verify(input);
    expect(result.valid).toBe(false);
    if (result.valid) throw new Error('expected an invalid result');
    expect(result.reason).toMatch(/accepted the key/i);
    expect(result.retryable).toBe(false);
  });
});

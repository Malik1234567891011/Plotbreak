import { describe, expect, it, vi } from 'vitest';
import { AppStoreVerifier } from './store-verifier.js';

/**
 * The seam a sandbox purchase would have exercised and nothing else does: a
 * real Apple transaction arriving, being decoded, and becoming the thing the
 * wallet credits. A wrong field name here fails quietly and looks exactly like
 * everything working, so the payloads below use Apple's documented
 * JWSTransactionDecodedPayload shape rather than our own.
 */
const KEY = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgevZzL1gdAFr88hb2
OF/2NxApJCzGCEDdfSp6VQO30hyhRANCAAQRWz+jn65BtOMvdyHKcvjBeBSDZH2r
1RTwjmYSi9R/zpBnuQ4EiMnCqfMPWiZqB4QdbAd0E7oH50VpuZ1P087G
-----END PRIVATE KEY-----`;

/** A JWS whose payload is `claims`. Only the payload is ever read. */
const jws = (claims: Record<string, unknown>) =>
  ['e30', Buffer.from(JSON.stringify(claims)).toString('base64url'), 'sig'].join('.');

function verifier() {
  return new AppStoreVerifier({
    bundleId: 'com.plotbreak.app',
    keyId: 'TESTKEY123',
    issuerId: '00000000-0000-0000-0000-000000000000',
    privateKey: KEY,
    environment: 'PRODUCTION',
  });
}

function answering(claims: Record<string, unknown>) {
  vi.stubGlobal('fetch', async () => ({
    status: 200,
    ok: true,
    json: async () => ({ signedTransactionInfo: jws(claims) }),
  }) as unknown as Response);
}

/** What Apple actually sends for a consumable. */
const APPLE = {
  transactionId: '2000000988776655',
  originalTransactionId: '2000000988776655',
  bundleId: 'com.plotbreak.app',
  productId: 'crd_10000',
  purchaseDate: 1789300000000,
  originalPurchaseDate: 1789300000000,
  quantity: 1,
  type: 'Consumable',
  inAppOwnershipType: 'PURCHASED',
  signedDate: 1789300001000,
  environment: 'Production',
  storefront: 'USA',
  transactionReason: 'PURCHASE',
};

const input = {
  platform: 'APP_STORE' as const,
  productId: 'crd_10000',
  storeTransactionId: '2000000988776655',
  receipt: 'x',
  userId: 'u1',
};

describe('decoding a real App Store transaction', () => {
  it('reads the fields Apple actually sends', async () => {
    answering(APPLE);
    const result = await verifier().verify(input);
    expect(result.valid).toBe(true);
    expect(result).toMatchObject({
      productId: 'crd_10000',
      originalTransactionId: '2000000988776655',
      environment: 'PRODUCTION',
    });
    expect(result.valid && result.purchasedAt).toBe(new Date(1789300000000).toISOString());
  });

  it('marks a sandbox transaction as sandbox', async () => {
    answering({ ...APPLE, environment: 'Sandbox' });
    const result = await verifier().verify(input);
    expect(result.valid && result.environment).toBe('SANDBOX');
  });

  it('refuses a transaction belonging to another app', async () => {
    answering({ ...APPLE, bundleId: 'com.someone.else' });
    const result = await verifier().verify(input);
    expect(result.valid).toBe(false);
    if (result.valid) throw new Error('expected an invalid result');
    expect(result.reason).toMatch(/different app/i);
  });

  it('believes Apple over the client about what was bought', async () => {
    // The client claims the cheap pack; Apple says the expensive one was paid
    // for. The wallet must credit what Apple says, in either direction.
    answering({ ...APPLE, productId: 'crd_100000' });
    const result = await verifier().verify({ ...input, productId: 'crd_2000' });
    expect(result.valid && result.productId).toBe('crd_100000');
  });

  it('refuses rather than falling back to the client when Apple names no product', async () => {
    const { productId, ...withoutProduct } = APPLE;
    answering(withoutProduct);
    const result = await verifier().verify(input);
    expect(result.valid).toBe(false);
    if (result.valid) throw new Error('expected an invalid result');
    expect(result.reason).toMatch(/named no product/i);
  });

  it('gives each consumable purchase its own identity, so two buys credit twice', async () => {
    // Consumables carry a fresh originalTransactionId per purchase; if they
    // repeated, the second buy would be read as a duplicate and credit nothing.
    answering({ ...APPLE, transactionId: '2000000111', originalTransactionId: '2000000111' });
    const first = await verifier().verify(input);
    answering({ ...APPLE, transactionId: '2000000222', originalTransactionId: '2000000222' });
    const second = await verifier().verify({ ...input, storeTransactionId: '2000000222' });
    if (!first.valid || !second.valid) throw new Error('both purchases should verify');
    expect(first.originalTransactionId).toBe('2000000111');
    expect(second.originalTransactionId).toBe('2000000222');
  });
});

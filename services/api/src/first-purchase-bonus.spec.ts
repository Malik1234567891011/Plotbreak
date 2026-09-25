import { describe, expect, it } from 'vitest';
import { FIRST_PURCHASE_OFFER, offerForProduct } from '@plotbreak/contracts';
import { MemoryRepository } from './repo/memory.js';
import { WalletService } from './wallet.js';

/**
 * The doubled first purchase, end to end through the grant path.
 *
 * The starter rung and the first-purchase offer are the *same* App Store
 * product on purpose — one $0.99 button, and the server decides what it is
 * worth. That means the bonus cannot be read off the product id, and every
 * test here exists because getting that wrong is invisible until somebody is
 * charged and under-credited.
 */
/** The $0.99 product, at its plain worth — the bonus comes from account state. */
const STARTER = offerForProduct(FIRST_PURCHASE_OFFER.productId)!;
/** Any standing pack, which must never be doubled. */
const STANDING = offerForProduct('crd_10000')!;

async function walletWith(): Promise<{ wallet: WalletService; userId: string }> {
  const repo = new MemoryRepository();
  const wallet = new WalletService(repo);
  const userId = 'usr_first_purchase';
  await wallet.grantNewUser(userId);
  return { wallet, userId };
}

describe('the first purchase is doubled', () => {
  it('credits twice the starter pack the first time', async () => {
    const { wallet, userId } = await walletWith();
    const result = await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_1', 'SANDBOX');
    expect(result.credited).toBe(STARTER.credits * 2);
  });

  it('credits the plain pack the second time', async () => {
    const { wallet, userId } = await walletWith();
    await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_1', 'SANDBOX');
    const second = await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_2', 'SANDBOX');
    expect(second.credited).toBe(STARTER.credits);
  });

  it('does not double a bigger pack bought first', async () => {
    // The bonus exists to make purchase #1 small and obvious, not to discount
    // the catalogue for whoever arrives with $9.99 already in mind.
    const { wallet, userId } = await walletWith();
    const result = await wallet.reconcilePurchase(userId, STANDING.productId, 'tx_1', 'SANDBOX');
    expect(result.credited).toBe(STANDING.credits + STANDING.bonusCredits);
  });

  it('still honours a pack we have retired', async () => {
    // Somebody on an older build is looking at the old ladder right now, and
    // StoreKit can redeliver their transaction days later.
    const { wallet, userId } = await walletWith();
    const result = await wallet.reconcilePurchase(userId, 'crd_10000', 'tx_legacy', 'APP_STORE');
    expect(result.credited).toBe(10_300);
  });

  it('refuses to credit a product we have never sold', async () => {
    const { wallet, userId } = await walletWith();
    const result = await wallet.reconcilePurchase(userId, 'crd_not_a_thing', 'tx_x', 'SANDBOX');
    expect(result).toEqual({ credited: 0, duplicate: false, entry: null });
  });

  it('never grants the same transaction twice, bonus included', async () => {
    const { wallet, userId } = await walletWith();
    const before = await wallet.getBalance(userId);
    await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_dupe', 'SANDBOX');
    const afterFirst = await wallet.getBalance(userId);
    const replay = await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_dupe', 'SANDBOX');

    expect(replay.duplicate).toBe(true);
    expect(replay.credited).toBe(0);
    expect(await wallet.getBalance(userId)).toBe(afterFirst);
    expect(afterFirst - before).toBe(STARTER.credits * 2);
  });

  it('reports the bonus as available until something is bought', async () => {
    const { wallet, userId } = await walletWith();
    expect((await wallet.getSummary(userId)).firstPurchaseBonusAvailable).toBe(true);
    await wallet.reconcilePurchase(userId, STARTER.productId, 'tx_1', 'SANDBOX');
    expect((await wallet.getSummary(userId)).firstPurchaseBonusAvailable).toBe(false);
  });

  it('does not expire', async () => {
    // The old 48-hour window ran from signup, so it was spent on people who
    // had not played yet and was always gone by the wall at turn 10.
    const { wallet, userId } = await walletWith();
    expect((await wallet.getSummary(userId)).firstPurchaseOfferExpiresAt).toBeNull();
  });
});

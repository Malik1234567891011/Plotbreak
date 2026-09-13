import { describe, expect, it } from 'vitest';
import { STORE_OFFERS, FIRST_PURCHASE_OFFER } from '@plotbreak/contracts';

/**
 * A verified purchase of a product the server does not sell.
 *
 * The store has already taken the money by the time this is known, and the
 * endpoint used to answer 200 with `credited: 0` — the client's own success
 * path, so the player was charged, credited nothing, and shown no error. It is
 * a narrow case (a pack live in App Store Connect but absent from the code) and
 * an expensive one, so it answers 422 now and says so in the log.
 */
describe('purchase of a product we do not sell', () => {
  it('every id the app can buy exists in the server catalogue', () => {
    // Mirrors PlotbreakTests/PurchaseTests.swift, from the other direction.
    const sold = new Set([...STORE_OFFERS.map((o) => o.productId), FIRST_PURCHASE_OFFER.productId]);
    for (const id of ['crd_2000', 'crd_10000', 'crd_20000', 'crd_50000', 'crd_100000', 'crd_first_21000']) {
      expect(sold.has(id), `${id} is offered by the client but not sold by the server`).toBe(true);
    }
  });

  it('credits and bonuses are what the packs advertise', () => {
    const byId = Object.fromEntries(STORE_OFFERS.map((o) => [o.productId, o]));
    expect(byId.crd_2000!.credits + byId.crd_2000!.bonusCredits).toBe(2000);
    expect(byId.crd_10000!.credits + byId.crd_10000!.bonusCredits).toBe(10300);
    expect(byId.crd_20000!.credits + byId.crd_20000!.bonusCredits).toBe(21000);
    expect(byId.crd_50000!.credits + byId.crd_50000!.bonusCredits).toBe(53500);
    expect(byId.crd_100000!.credits + byId.crd_100000!.bonusCredits).toBe(110000);
  });
});

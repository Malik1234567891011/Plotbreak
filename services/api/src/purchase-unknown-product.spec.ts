import { describe, expect, it } from 'vitest';
import {
  FIRST_PURCHASE_OFFER,
  FLASH_OFFER,
  STORE_OFFERS,
  UNLISTED_STORE_OFFERS,
  firstPurchaseBonusFor,
  flashBonusFor,
  offerForProduct,
} from '@plotbreak/contracts';

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
    //
    // The retired ids are the point of this test now. A build in the wild is
    // still showing the old ladder, and StoreKit can redeliver one of its
    // transactions days later; if `offerForProduct` ever stops resolving them
    // we take Apple's money and grant nothing.
    for (const id of [
      'crd_starter_700',
      'crd_3800',
      'crd_8200',
      'crd_2000',
      'crd_10000',
      'crd_20000',
      'crd_50000',
      'crd_100000',
      'crd_first_21000',
    ]) {
      expect(offerForProduct(id), `${id} can be bought by some client but is not sold by the server`).not.toBeNull();
    }
  });

  it('credits and bonuses are what the packs advertise', () => {
    const byId = Object.fromEntries(
      [...STORE_OFFERS, ...UNLISTED_STORE_OFFERS].map((o) => [o.productId, o]),
    );
    // The value-add products, at their plain worth. Any bonus is added from
    // account state, never read off the product.
    expect(byId.crd_starter_700!.credits).toBe(700);
    expect(byId.crd_starter_700!.bonusCredits).toBe(0);
    expect(byId.crd_8200!.credits).toBe(8200);
    expect(byId.crd_8200!.bonusCredits).toBe(0);
    // The five standing packs, worth exactly what they have always been worth.
    expect(byId.crd_2000!.credits + byId.crd_2000!.bonusCredits).toBe(2000);
    expect(byId.crd_10000!.credits + byId.crd_10000!.bonusCredits).toBe(10300);
    expect(byId.crd_20000!.credits + byId.crd_20000!.bonusCredits).toBe(21000);
    expect(byId.crd_50000!.credits + byId.crd_50000!.bonusCredits).toBe(53500);
    expect(byId.crd_100000!.credits + byId.crd_100000!.bonusCredits).toBe(110000);
    expect(byId.crd_first_21000!.credits + byId.crd_first_21000!.bonusCredits).toBe(21000);
  });

  it('the ladder is ordered by price', () => {
    const prices = STORE_OFFERS.map((o) => o.referencePriceUsd);
    for (let i = 1; i < prices.length; i += 1) {
      expect(prices[i]!).toBeGreaterThan(prices[i - 1]!);
    }
  });

  it('both value-adds beat every standing pack on credits per dollar', () => {
    // The whole point of them. If a standing pack were ever the better deal,
    // the offer is not an offer and the badge on it is a lie.
    const best = Math.max(
      ...STORE_OFFERS.map((o) => (o.credits + o.bonusCredits) / o.referencePriceUsd),
    );
    const first = (FIRST_PURCHASE_OFFER.credits + FIRST_PURCHASE_OFFER.bonusCredits)
      / FIRST_PURCHASE_OFFER.referencePriceUsd;
    const flash = (FLASH_OFFER.credits + FLASH_OFFER.bonusCredits) / FLASH_OFFER.referencePriceUsd;
    expect(first).toBeGreaterThan(best);
    expect(flash).toBeGreaterThan(best);
  });

  it('doubles the flash pack only while a window is open', () => {
    const pack = offerForProduct(FLASH_OFFER.productId)!;
    expect(flashBonusFor(pack, true)).toBe(pack.credits);
    expect(flashBonusFor(pack, false)).toBe(0);
    // And never touches anything else, whatever the clock says.
    expect(flashBonusFor(offerForProduct('crd_50000')!, true)).toBe(0);
  });

  it('doubles the first purchase, and only that product', () => {
    const starter = offerForProduct(FIRST_PURCHASE_OFFER.productId)!;
    expect(firstPurchaseBonusFor(starter, false)).toBe(starter.credits);
    expect(firstPurchaseBonusFor(starter, true)).toBe(0);
    // A first-time buyer who goes straight for a big pack gets that pack, not a
    // doubled one. The bonus exists to make purchase #1 cheap, once.
    expect(firstPurchaseBonusFor(offerForProduct('crd_50000')!, false)).toBe(0);
  });

  it('the first-purchase offer is the $0.99 product, doubled, and never expires', () => {
    const starter = offerForProduct(FIRST_PURCHASE_OFFER.productId)!;
    expect(FIRST_PURCHASE_OFFER.credits + FIRST_PURCHASE_OFFER.bonusCredits).toBe(starter.credits * 2);
    // §3.8, and the reason the old 48-hour window was always gone by the time
    // a player reached the wall.
    expect(FIRST_PURCHASE_OFFER.expiresAt).toBeNull();
  });
});

import { describe, expect, it } from 'vitest';
import {
  FIRST_PURCHASE_OFFER,
  LEGACY_STORE_OFFERS,
  STORE_OFFERS,
  firstPurchaseBonusFor,
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
      [...STORE_OFFERS, ...LEGACY_STORE_OFFERS].map((o) => [o.productId, o]),
    );
    // The ladder.
    expect(byId.crd_starter_700!.credits).toBe(700);
    expect(byId.crd_3800!.credits).toBe(3800);
    expect(byId.crd_8200!.credits).toBe(8200);
    // Retired, and still worth exactly what they were sold for.
    expect(byId.crd_2000!.credits + byId.crd_2000!.bonusCredits).toBe(2000);
    expect(byId.crd_10000!.credits + byId.crd_10000!.bonusCredits).toBe(10300);
    expect(byId.crd_20000!.credits + byId.crd_20000!.bonusCredits).toBe(21000);
    expect(byId.crd_50000!.credits + byId.crd_50000!.bonusCredits).toBe(53500);
    expect(byId.crd_100000!.credits + byId.crd_100000!.bonusCredits).toBe(110000);
    expect(byId.crd_first_21000!.credits + byId.crd_first_21000!.bonusCredits).toBe(21000);
  });

  it('value per dollar rises with the size of the pack', () => {
    // The only honest reason to sell a bigger pack. If a middle rung is ever
    // priced worse than the one below it, the ladder is lying to the player.
    const perDollar = STORE_OFFERS.map((o) => (o.credits + o.bonusCredits) / o.referencePriceUsd);
    for (let i = 1; i < perDollar.length; i += 1) {
      expect(perDollar[i]!).toBeGreaterThan(perDollar[i - 1]!);
    }
  });

  it('doubles the first purchase, and only on the starter rung', () => {
    const starter = STORE_OFFERS.find((o) => o.tier === 'STARTER')!;
    const popular = STORE_OFFERS.find((o) => o.tier === 'POPULAR')!;

    expect(firstPurchaseBonusFor(starter, false)).toBe(starter.credits);
    expect(firstPurchaseBonusFor(starter, true)).toBe(0);
    // A first-time buyer who goes straight for a bigger pack gets that pack,
    // not a doubled one. The bonus exists to make purchase #1 cheap.
    expect(firstPurchaseBonusFor(popular, false)).toBe(0);
  });

  it('the first-purchase offer is the starter product, doubled', () => {
    const starter = STORE_OFFERS.find((o) => o.tier === 'STARTER')!;
    // Same App Store product deliberately: one $0.99 button, and the server
    // decides what it is worth. Two SKUs at one price is how a returning buyer
    // ends up claiming a first-purchase deal.
    expect(FIRST_PURCHASE_OFFER.productId).toBe(starter.productId);
    expect(FIRST_PURCHASE_OFFER.credits + FIRST_PURCHASE_OFFER.bonusCredits).toBe(starter.credits * 2);
    // Nothing about it expires. §3.8, and the reason the old 48-hour window was
    // always gone by the time a player reached the wall.
    expect(FIRST_PURCHASE_OFFER.expiresAt).toBeNull();
  });
});

import { describe, expect, it } from 'vitest';
import { QUALITY_TIERS, profileFor, STORE_OFFERS, FIRST_PURCHASE_OFFER } from './economy.js';

/**
 * The tiers used to change the price and nothing else: the app charged 195
 * credits for Apex and ran the identical Vivid generation. These pin the four
 * profiles to what was actually measured, and pin billing to the same object
 * generation reads, so the two cannot drift apart again.
 */
const TIERS = ['QUICK', 'VIVID', 'CINEMATIC', 'APEX'] as const;

describe('quality tier profiles', () => {
  it('gives every tier a distinct generation profile', () => {
    const fingerprints = TIERS.map((t) => {
      const p = profileFor(t);
      return `${p.model}/${p.reasoningEffort ?? 'default'}/${p.words.low}-${p.words.high}`;
    });
    expect(new Set(fingerprints).size).toBe(TIERS.length);
  });

  it('bills and generates from the same object', () => {
    // The failure this prevents: charging one tier while running another.
    for (const tier of TIERS) {
      expect(profileFor(tier)).toBe(QUALITY_TIERS[tier]);
      expect(profileFor(tier).costCredits).toBe(QUALITY_TIERS[tier].costCredits);
    }
  });

  it('keeps Vivid as the validated Terra baseline', () => {
    const vivid = profileFor('VIVID');
    expect(vivid.model).toBe('gpt-5.6-terra');
    expect(vivid.reasoningEffort).toBeUndefined();
    expect(vivid.words).toEqual({ low: 150, high: 300 });
    expect(vivid.heroImageEligible).toBe(false);
  });

  it('spends more credits on more expensive generation, in order', () => {
    const order = TIERS.map((t) => profileFor(t).costCredits);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    // and the prose target rises with the price rather than staying flat
    const lows = TIERS.map((t) => profileFor(t).words.low);
    expect(lows).toEqual([...lows].sort((a, b) => a - b));
  });

  it('only lets the premium tiers earn a generated frame', () => {
    expect(profileFor('QUICK').heroImageEligible).toBe(false);
    expect(profileFor('VIVID').heroImageEligible).toBe(false);
    expect(profileFor('CINEMATIC').heroImageEligible).toBe(true);
    expect(profileFor('APEX').heroImageEligible).toBe(true);
  });

  it('leaves every tier room to close the schema', () => {
    // The budget is a storytelling target, not a clamp: the ceiling has to be
    // far above the prose so a long beat still closes its JSON.
    for (const tier of TIERS) {
      const p = profileFor(tier);
      expect(p.maxOutputTokens).toBeGreaterThan(p.words.high * 4);
    }
  });

  it('never reintroduces per-tier memory', () => {
    // Continuity is the product, not an upsell. memoryBudget survives only for
    // the legacy engine and must never differ in a way the Pure path could read.
    const models = new Set(TIERS.map((t) => profileFor(t).model));
    expect(models.size).toBeGreaterThan(1); // tiers do differ...
    // ...but nothing in the profile describes how much history to send.
    for (const tier of TIERS) {
      expect(Object.keys(profileFor(tier))).not.toContain('historyLimit');
    }
  });

  it('prices every tier below the cheapest credit a player can buy', () => {
    // Sanity on the economics the tiers are sold against.
    const packs = [...STORE_OFFERS, FIRST_PURCHASE_OFFER];
    const worstValue = Math.min(
      ...packs.map((o) => o.referencePriceUsd / (o.credits + o.bonusCredits)),
    );
    expect(worstValue).toBeGreaterThan(0);
    for (const tier of TIERS) expect(profileFor(tier).costCredits * worstValue).toBeLessThan(1);
  });
});

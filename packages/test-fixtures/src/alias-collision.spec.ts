import { describe, expect, it } from 'vitest';
import { ACE } from './index.js';

/**
 * Two objects answering to the same words is a continuity bug waiting for a
 * player to trigger it.
 *
 * It already did: Ace's money can and the tin Dadan keeps under her floor both
 * answered to "the tin", and only one of them is under a floor, so a beat
 * described the boys' can as "buried beneath the floorboards". The storyteller
 * was reading the bible correctly; the bible said both.
 */
describe('Ace object aliases', () => {
  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, string[]>();
    for (const location of ACE.locations) {
      for (const item of location.takeableItems ?? []) {
        for (const alias of item.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, [...(owners.get(key) ?? []), item.itemId]);
        }
      }
    }
    const collisions = [...owners.entries()]
      .filter(([, items]) => new Set(items).size > 1)
      .map(([alias, items]) => `"${alias}" → ${[...new Set(items)].join(' / ')}`);
    expect(collisions).toEqual([]);
  });

  it('keeps the money can off any floor', () => {
    const treehouse = ACE.locations.find((l) => l.id === 'asl_treehouse')!;
    expect(treehouse.description).toMatch(/flat stone/i);
    const fund = ACE.items.find((i) => i.id === 'ship_fund')!;
    expect(fund.description).toMatch(/flat stone/i);
    expect(fund.description).not.toMatch(/under the floor\b/i);
  });
});

import { describe, expect, it } from 'vitest';
import { RELICS, RELIC_MOMENTS, rollMoment } from '@plotbreak/contracts';
import { MemoryRepository } from './repo/memory.js';
import { buildCollection, relicsEnabledFor, rollRelics } from './relics.js';

describe('relic catalog', () => {
  it('has unique ids and every relic points at a real moment in its own story', () => {
    expect(new Set(RELICS.map((r) => r.id)).size).toBe(RELICS.length);
    for (const relic of RELICS) {
      const moment = RELIC_MOMENTS.find((m) => m.id === relic.momentId);
      expect(moment, relic.id).toBeDefined();
      expect(moment!.storyId).toBe(relic.storyId);
    }
  });

  it('never promises more than certainty on one moment', () => {
    for (const moment of RELIC_MOMENTS) {
      const total = RELICS.filter((r) => r.momentId === moment.id).reduce((sum, r) => sum + r.chance, 0);
      expect(total, moment.id).toBeGreaterThan(0);
      expect(total, moment.id).toBeLessThanOrEqual(1);
    }
  });

  it('rolls by cumulative chance and leaves the remainder empty', () => {
    expect(rollMoment('pt_pulled_in', 0)?.id).toBe('pt_sunset_shades');
    expect(rollMoment('pt_pulled_in', 0.5)?.id).toBe('pt_comet_clip');
    expect(rollMoment('pt_pulled_in', 0.72)?.id).toBe('pt_bubblegum_prism');
    expect(rollMoment('pt_pulled_in', 0.99)).toBeNull();
  });
});

describe('relic rolls', () => {
  it('rolls a moment once per run, empty rolls included', async () => {
    const repo = new MemoryRepository();
    const base = { repo, userId: 'u1', sessionId: 's1', storyId: 'story_pink_tide', turnIndex: 3 };
    const first = await rollRelics({ ...base, momentIds: ['pt_pulled_in'], random: () => 0.99 });
    expect(first).toEqual([]);
    const again = await rollRelics({ ...base, momentIds: ['pt_pulled_in'], random: () => 0 });
    expect(again).toEqual([]);
    const otherRun = await rollRelics({ ...base, sessionId: 's2', momentIds: ['pt_pulled_in'], random: () => 0 });
    expect(otherRun.map((d) => d.relicId)).toEqual(['pt_sunset_shades']);
  });

  it('ignores a moment from another story', async () => {
    const repo = new MemoryRepository();
    const drops = await rollRelics({
      repo, userId: 'u1', sessionId: 's1', storyId: 'story_pink_tide', turnIndex: 1,
      momentIds: ['ss_choosing'], random: () => 0,
    });
    expect(drops).toEqual([]);
    expect(await repo.getRelicRolls('u1')).toEqual([]);
  });

  it('counts duplicates across runs', async () => {
    const repo = new MemoryRepository();
    for (const sessionId of ['a', 'b']) {
      await rollRelics({ repo, userId: 'u1', sessionId, storyId: 'story_pink_tide', turnIndex: 1, momentIds: ['pt_pulled_in'], random: () => 0 });
    }
    const vault = buildCollection(await repo.getRelicRolls('u1'), new Map());
    const shades = vault.relics.find((r) => r.id === 'pt_sunset_shades')!;
    expect(shades.count).toBe(2);
    expect(shades.flavor).not.toBeNull();
  });
});

describe('collection', () => {
  it('sorts rarest first and keeps locked mythics a mystery', () => {
    const vault = buildCollection([], new Map([['story_pink_tide', 'Pink Tide']]));
    expect(vault.relics[0]!.rarity).toBe('MYTHIC');
    expect(vault.relics[0]!.name).toBe('???');
    expect(vault.relics.every((r) => r.flavor === null)).toBe(true);
    expect(vault.owned).toBe(0);
    expect(vault.total).toBe(RELICS.length);
  });
});

describe('gate', () => {
  it('is off by default and opens per user or for all', () => {
    expect(relicsEnabledFor('u1', {})).toBe(false);
    expect(relicsEnabledFor('u1', { PLOTBREAK_RELICS: 'u2, u1' })).toBe(true);
    expect(relicsEnabledFor('u3', { PLOTBREAK_RELICS: 'u2,u1' })).toBe(false);
    expect(relicsEnabledFor('u3', { PLOTBREAK_RELICS: 'all' })).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { SKILLS, playBot, playBotInto } from './bots.js';
import { CLEAR_PAYOUT, FLOORS, payoutFor } from './content.js';
import { daySeed } from './rng.js';
import { TowerSim, replay } from './sim.js';

describe('payout ladder', () => {
  it('pays by the floor you fall on', () => {
    expect([1, 5, 6, 10, 11, 15, 16, 20, 21, 25, 26, 30].map((f) => payoutFor(f, false))).toEqual([
      5, 5, 30, 30, 60, 60, 120, 120, 150, 150, 200, 200,
    ]);
    expect(payoutFor(FLOORS, true)).toBe(CLEAR_PAYOUT);
  });
});

describe('determinism', () => {
  it('the same seed and the same player give the same run', () => {
    const seed = daySeed('2026-11-20');
    expect(playBot(seed, SKILLS[3]!, 42)).toEqual(playBot(seed, SKILLS[3]!, 42));
  });

  it('replaying the recorded inputs reaches the same floor, every skill', () => {
    for (let skill = 0; skill < SKILLS.length; skill++) {
      const seed = daySeed('2026-11-21') ^ (skill * 101);
      const sim = new TowerSim(seed);
      const live = playBotInto(sim, skill, 9);
      const r = replay(seed, sim.inputs);
      expect(r.fellOn).toBe(live.fellOn);
      expect(r.cleared).toBe(live.cleared);
      expect(r.boons).toEqual(live.boons);
      expect(r.floors.map((f) => [f.parries, f.hits])).toEqual(live.floors.map((f) => [f.parries, f.hits]));
    }
  });

  it('a run with no inputs is abandoned on floor 1, which cannot be lost', () => {
    const r = replay(1234, []);
    expect(r.fellOn).toBe(1);
    expect(r.cleared).toBe(false);
  });

  it('a toddler mashing clears floors 1-5', () => {
    for (let i = 0; i < 40; i++) expect(playBot(500 + i, SKILLS[0]!, i).fellOn).toBeGreaterThan(5);
  });

  it('inputs outside a fight are not recorded', () => {
    const sim = new TowerSim(1);
    expect(sim.input('tap')).toBe(false);
    expect(sim.inputs).toEqual([]);
  });
});

import { CHARACTERS, FLOORS as F, dailyTower, payoutWithStreak, streakBonusPercent } from './content.js';

describe('the daily tower', () => {
  it('is the same all day and different across days', () => {
    expect(dailyTower('2026-11-20')).toEqual(dailyTower('2026-11-20'));
    const days = new Set(Array.from({ length: 10 }, (_, i) => JSON.stringify(dailyTower(`2026-12-${10 + i}`))));
    expect(days.size).toBeGreaterThan(5);
  });

  it('keeps bosses and the tutorial in place and uses every floor once', () => {
    for (let d = 1; d <= 28; d++) {
      const t = dailyTower(`2027-02-${String(d).padStart(2, '0')}`);
      expect(t.lineup).toHaveLength(F);
      expect(t.lineup[0]).toBe(1);
      for (const boss of [5, 10, 15, 20, 25, 30]) expect(t.lineup[boss - 1]).toBe(boss);
      expect([...t.lineup].sort((a, b) => a - b)).toEqual(Array.from({ length: F }, (_, i) => i + 1));
    }
  });

  it('replays the same on the same daily tower', () => {
    const tower = dailyTower('2026-11-23');
    const sim = new TowerSim(77, tower);
    const live = playBotInto(sim, 3, 5);
    expect(replay(77, sim.inputs, tower).fellOn).toBe(live.fellOn);
  });
});

describe('streak', () => {
  it('adds 5% a day, up to day 20', () => {
    expect(streakBonusPercent(1)).toBe(5);
    expect(streakBonusPercent(20)).toBe(100);
    expect(streakBonusPercent(45)).toBe(100);
    expect(payoutWithStreak(12, false, 0)).toBe(60);
    expect(payoutWithStreak(12, false, 3)).toBe(69);
    expect(payoutWithStreak(30, true, 20)).toBe(600);
  });
});

describe('characters', () => {
  it('has a free starter and the rest at 500', () => {
    expect(CHARACTERS.filter((c) => c.price === 0)).toHaveLength(1);
    expect(CHARACTERS.filter((c) => c.price !== 0).every((c) => c.price === 500)).toBe(true);
  });
});

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

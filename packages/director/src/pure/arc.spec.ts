import { describe, expect, it } from 'vitest';
import { arcDecision, arcPrefix, approxTokens, keepTurns } from './arc';
import type { StoryArc } from '@plotbreak/contracts';

const deep = { turnsSinceArcStart: 500 };

describe('arcDecision', () => {
  it('leaves a short session completely alone', () => {
    expect(arcDecision({ contextTokens: 40_000, sceneStatus: 'settled', ...deep })).toBe('continue');
  });

  it('starts winding down past the soft limit, but does not break mid-scene', () => {
    expect(arcDecision({ contextTokens: 200_000, sceneStatus: 'live', ...deep })).toBe('closing');
  });

  it('breaks on the first settled beat past the soft limit', () => {
    expect(arcDecision({ contextTokens: 200_000, sceneStatus: 'settled', ...deep })).toBe('close-now');
  });

  it('breaks at the hard limit even mid-scene, because the price step is worse', () => {
    expect(arcDecision({ contextTokens: 265_000, sceneStatus: 'live', ...deep })).toBe('close-now');
  });

  it('never breaks twice in a row — a new arc needs room to be an arc', () => {
    const young = { turnsSinceArcStart: keepTurns() };
    expect(arcDecision({ contextTokens: 300_000, sceneStatus: 'settled', ...young })).toBe('continue');
  });

  it('stays under the 272K price step at the hard limit', () => {
    // The whole point. If this ever fails the feature is costing money, not saving it.
    expect(arcDecision({ contextTokens: 271_000, sceneStatus: 'live', ...deep })).toBe('close-now');
  });
});

const arc = (i: number, over: Partial<StoryArc> = {}): StoryArc => ({
  arcIndex: i,
  title: `Arc ${i}`,
  recap: `What happened in arc ${i}.`,
  carried: { standing: [`standing ${i}`], bonds: [`bond ${i}`], established: [`fact ${i}`], open: [`thread ${i}`] },
  fromTurn: 0,
  toTurn: 100 * i,
  ...over,
});

describe('arcPrefix', () => {
  it('is null when nothing has closed, so a normal session is untouched', () => {
    expect(arcPrefix([])).toBeNull();
  });

  it('carries every list forward, because anything left out is forgotten for good', () => {
    const text = arcPrefix([arc(1)])!;
    for (const needle of ['standing 1', 'bond 1', 'fact 1', 'thread 1', 'What happened in arc 1.']) {
      expect(text).toContain(needle);
    }
  });

  it('chains arcs in order', () => {
    const text = arcPrefix([arc(1), arc(2)])!;
    expect(text.indexOf('Arc 1')).toBeLessThan(text.indexOf('Arc 2'));
    expect(text).toContain('fact 1');
    expect(text).toContain('fact 2');
  });

  it('is byte-stable for the same input — the cached prefix depends on it', () => {
    expect(arcPrefix([arc(1), arc(2)])).toEqual(arcPrefix([arc(1), arc(2)]));
  });

  it('omits empty lists rather than printing empty headings', () => {
    const bare = arc(1, { carried: { standing: [], bonds: [], established: ['only this'], open: [] } });
    const text = arcPrefix([bare])!;
    expect(text).toContain('only this');
    expect(text).not.toContain('Bonds:');
  });

  it('compresses hard — a real arc recap replaced ~190K tokens with ~2K', () => {
    // Shape check against the measured production run, not an assertion about
    // this fixture: the prefix must stay small enough to be worth the break.
    expect(approxTokens(arcPrefix([arc(1)])!)).toBeLessThan(500);
  });
});

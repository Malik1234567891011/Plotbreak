import { describe, expect, it } from 'vitest';
import { DEFAULT_BEAT_MINUTES, formatStoryTime, isSkip, minutesFor, transitionLabel } from './clock.js';

/**
 * The clock bug this covers was real and shipped: the prose passed into morning
 * while the header still read "Day 1 · 5:34 PM", because the runtime added six
 * minutes a turn no matter what the story said.
 */
describe('story clock', () => {
  const AFTERNOON = 17 * 60 + 34; // day 1, 5:34 pm — where the bug was seen

  it('treats a beat with no stated transition as a few minutes passing', () => {
    expect(minutesFor(undefined)).toBe(DEFAULT_BEAT_MINUTES);
    expect(formatStoryTime(AFTERNOON + DEFAULT_BEAT_MINUTES)).toBe('Day 1 · afternoon');
  });

  it('moves within a scene without changing the day', () => {
    const after = AFTERNOON + minutesFor({ amount: 20, unit: 'minutes' });
    expect(formatStoryTime(after)).toBe('Day 1 · afternoon');
  });

  it('carries evening into night', () => {
    const after = AFTERNOON + minutesFor({ amount: 4, unit: 'hours' });
    expect(formatStoryTime(after)).toBe('Day 1 · night');
  });

  it('sleeps through to the next morning', () => {
    const after = AFTERNOON + minutesFor({ amount: 14, unit: 'hours' });
    expect(formatStoryTime(after)).toBe('Day 2 · early morning');
  });

  it('skips several days', () => {
    const after = AFTERNOON + minutesFor({ amount: 4, unit: 'days' });
    expect(formatStoryTime(after)).toBe('Day 5 · afternoon');
  });

  it('reports weeks in weeks and months in months rather than inventing a day number', () => {
    expect(formatStoryTime(minutesFor({ amount: 3, unit: 'weeks' }))).toBe('Week 4 · night');
    expect(formatStoryTime(minutesFor({ amount: 5, unit: 'months' }))).toBe('Month 6 · night');
    expect(formatStoryTime(minutesFor({ amount: 3, unit: 'years' }))).toBe('Year 4 · night');
  });

  it('never lets a bad number run the clock off the end of the world', () => {
    expect(minutesFor({ amount: 1e9, unit: 'years' })).toBe(minutesFor({ amount: 20, unit: 'years' }));
    expect(minutesFor({ amount: -5, unit: 'hours' })).toBe(0);
    expect(minutesFor({ amount: Number.NaN, unit: 'hours' })).toBe(0);
  });

  it('marks a real jump and stays quiet when the scene just continued', () => {
    expect(transitionLabel({ amount: 20, unit: 'minutes' })).toBeNull();
    expect(isSkip({ amount: 20, unit: 'minutes' })).toBe(false);
    expect(transitionLabel({ amount: 2, unit: 'days' })).toBe('2 days later');
    expect(transitionLabel({ amount: 1, unit: 'days' })).toBe('1 day later');
  });

  it('prefers the words the story used over an invented exact figure', () => {
    expect(transitionLabel({ amount: 3, unit: 'months', phrase: 'a few months later' })).toBe(
      'A few months later',
    );
  });
});

describe('block length', () => {
  it('splits a paragraph too long for the contract instead of losing the turn', async () => {
    const { splitForContract } = await import('./runtime.js');
    const long = `${'The slope gives under your heel and a bird goes up out of the ferns. '.repeat(40)}`;
    const parts = splitForContract(long);
    expect(parts.length).toBeGreaterThan(1);
    for (const part of parts) expect(part.length).toBeLessThanOrEqual(1200);
    // Nothing is thrown away — this is a split, not a truncation.
    expect(parts.join(' ').replace(/\s+/g, ' ').trim()).toBe(long.replace(/\s+/g, ' ').trim());
  });

  it('leaves an ordinary paragraph alone', async () => {
    const { splitForContract } = await import('./runtime.js');
    expect(splitForContract('You step off the log.')).toEqual(['You step off the log.']);
  });
});

import { describe, expect, it } from 'vitest';
import { storyTestAllIn, storyTestArmFor, storyTestArmName, storyTestBucket } from './story-test.js';

const ids = Array.from({ length: 4000 }, (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, '0')}`);

describe('storyteller test assignment', () => {
  it('splits players into four roughly equal, stable groups', () => {
    const counts = [0, 0, 0, 0];
    for (const id of ids) counts[storyTestBucket(id)]! += 1;
    for (const n of counts) expect(n).toBeGreaterThan(900);
    expect(storyTestArmName(ids[7]!, {})).toBe(storyTestArmName(ids[7]!, {}));
  });

  it('matches the SQL used to read the result', () => {
    // Computed in Postgres with the expression in story-test.ts.
    expect(storyTestBucket('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23')).toBe(SQL_BUCKET_MALIK);
    expect(storyTestAllIn('8ee88ed7-7ca0-4c33-8c90-56cc9fbf9d23')).toBe(SQL_ALL_IN_MALIK);
  });

  it('puts one player in five in all-in without moving anybody else between the four groups', () => {
    const allIn = ids.filter((id) => storyTestAllIn(id));
    expect(allIn.length).toBeGreaterThan(700);
    expect(allIn.length).toBeLessThan(900);
    for (const id of ids) {
      const name = storyTestArmName(id, {});
      if (storyTestAllIn(id)) expect(name).toBe('all-in');
      else expect(name).toBe(['control', 'yes', 'push', 'yes+push'][storyTestBucket(id)]);
    }
    expect(storyTestArmFor(ids.find(storyTestAllIn)!, {})).toEqual({ yes: true, push: true, allIn: true });
  });

  it('off gives everybody the old storyteller; a name gives everybody that one', () => {
    for (const id of ids.slice(0, 50)) {
      expect(storyTestArmFor(id, { PLOTBREAK_STORY_TEST: 'off' })).toEqual({ yes: false, push: false });
      expect(storyTestArmFor(id, { PLOTBREAK_STORY_TEST: 'yes+push' })).toEqual({ yes: true, push: true });
    }
    expect(new Set(ids.slice(0, 50).map((id) => storyTestArmName(id, { PLOTBREAK_STORY_TEST: 'on' }))).size).toBe(5);
  });
});

const SQL_BUCKET_MALIK = 3;
const SQL_ALL_IN_MALIK = true;

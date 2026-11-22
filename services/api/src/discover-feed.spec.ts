import { describe, expect, it } from 'vitest';
import type { GameState } from '@plotbreak/contracts';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import {
  DAY_MS,
  activityWindows,
  dailyShuffle,
  newestFirst,
  utcDay,
  utcDayOfYear,
  type ShelfWorld,
} from './discover-feed.js';
import { MemoryRepository } from './repo/memory.js';
import type { SessionRecord, StoryActivity } from './repo/types.js';
import { EMPTY_ACTIVITY } from './repo/types.js';

/** A Saturday, mid-afternoon UTC. Every spec here pins the day rather than reading the clock. */
const NOW = new Date('2026-11-21T15:00:00.000Z');
const hoursAgo = (hours: number, from: Date = NOW): Date => new Date(from.getTime() - hours * 3_600_000);
const ids = (n: number): Array<{ storyId: string }> =>
  Array.from({ length: n }, (_, i) => ({ storyId: `story_${String(i).padStart(2, '0')}` }));

/** One world as the shelves see it. Official, with art, untouched, unless told otherwise. */
function world(
  storyId: string,
  overrides: Partial<Omit<ShelfWorld, 'activity'>> & { activity?: Partial<StoryActivity> } = {},
): ShelfWorld {
  const { activity, ...rest } = overrides;
  return {
    storyId,
    official: true,
    hasCover: true,
    hasBannerArt: true,
    categories: [],
    ...rest,
    activity: { ...EMPTY_ACTIVITY, ...activity },
  };
}

function session(storyId: string, userId: string, createdAt: Date): SessionRecord {
  return {
    sessionId: `sess_${storyId}_${userId}_${createdAt.getTime()}`,
    userId,
    storyId,
    storyVersionId: `${storyId}_1`,
    displayName: 'Player',
    status: 'ACTIVE',
    createdAt: createdAt.toISOString(),
    lastPlayedAt: createdAt.toISOString(),
    sessionSeed: 'seed',
    forkedFromSessionId: null,
    forkedAtTurnIndex: null,
    branchKey: 'main',
  };
}

describe('the day everything rotates on', () => {
  it('is the UTC calendar day, whatever the hour', () => {
    expect(utcDay(new Date('2026-11-21T00:00:00.000Z'))).toBe('2026-11-21');
    expect(utcDay(new Date('2026-11-21T23:59:59.999Z'))).toBe('2026-11-21');
    expect(utcDay(new Date('2026-11-22T00:00:00.000Z'))).toBe('2026-11-22');
  });

  it('counts days of the year from 0 on 1 January', () => {
    expect(utcDayOfYear(new Date('2026-01-01T12:00:00.000Z'))).toBe(0);
    expect(utcDayOfYear(new Date('2026-11-21T23:00:00.000Z'))).toBe(324);
    expect(utcDayOfYear(new Date('2028-12-31T00:00:00.000Z'))).toBe(365);
  });

  it('starts the windows 72 hours and 7 days before now', () => {
    const { recentSince, weekSince } = activityWindows(NOW);
    expect(NOW.getTime() - recentSince.getTime()).toBe(3 * DAY_MS);
    expect(NOW.getTime() - weekSince.getTime()).toBe(7 * DAY_MS);
  });
});

describe('the daily shuffle', () => {
  it('is the same order all day', () => {
    const morning = dailyShuffle(ids(20), utcDay(new Date('2026-11-21T00:05:00.000Z')));
    const night = dailyShuffle(ids(20), utcDay(new Date('2026-11-21T23:55:00.000Z')));
    expect(night).toEqual(morning);
  });

  it('is a different order tomorrow', () => {
    const today = dailyShuffle(ids(20), '2026-11-21').map((s) => s.storyId);
    const tomorrow = dailyShuffle(ids(20), '2026-11-22').map((s) => s.storyId);
    expect(tomorrow).not.toEqual(today);
    expect([...tomorrow].sort()).toEqual([...today].sort());
  });

  it('does not depend on the order it was handed', () => {
    const forwards = dailyShuffle(ids(20), '2026-11-21');
    const backwards = dailyShuffle([...ids(20)].reverse(), '2026-11-21');
    expect(backwards).toEqual(forwards);
  });
});

describe('New on Plotbreak', () => {
  it('is newest first by first-publish date', () => {
    const order = newestFirst([
      world('a', { activity: { firstPublishedAt: '2026-09-10T00:00:00.000Z' } }),
      world('b', { activity: { firstPublishedAt: '2026-11-20T00:00:00.000Z' } }),
      world('c', { activity: { firstPublishedAt: '2026-10-30T00:00:00.000Z' } }),
    ]);
    expect(order).toEqual(['b', 'c', 'a']);
  });

  it('leaves out a world with no cover or no date, rather than putting it first', () => {
    const order = newestFirst([
      world('dated', { activity: { firstPublishedAt: '2026-09-10T00:00:00.000Z' } }),
      world('undated'),
      world('coverless', { hasCover: false, activity: { firstPublishedAt: '2026-11-21T00:00:00.000Z' } }),
    ]);
    expect(order).toEqual(['dated']);
  });

  it('breaks a tie on the id, so two worlds published together never swap on refresh', () => {
    const at = { firstPublishedAt: '2026-11-20T00:00:00.000Z' };
    expect(newestFirst([world('y', { activity: at }), world('x', { activity: at })])).toEqual(['x', 'y']);
  });
});

describe('recent activity (in-memory repository)', () => {
  const STORY = LAUNCH_CATALOG[0]!.storyId;

  it('counts distinct players who started a run inside each window', async () => {
    const repo = new MemoryRepository([...LAUNCH_CATALOG], () => NOW);
    const state = {} as GameState;
    await repo.createSession(session(STORY, 'u1', hoursAgo(1)), state);
    // The same player starting twice is one player.
    await repo.createSession(session(STORY, 'u1', hoursAgo(2)), state);
    await repo.createSession(session(STORY, 'u2', hoursAgo(80)), state);
    // Older than a week: in neither window.
    await repo.createSession(session(STORY, 'u3', hoursAgo(24 * 8)), state);

    const activity = (await repo.getStoryActivity([STORY], activityWindows(NOW))).get(STORY)!;
    expect(activity.recentPlayers).toBe(1);
    expect(activity.weekPlayers).toBe(2);
  });

  it('counts likes by when they were given', async () => {
    let clock = hoursAgo(24 * 5);
    const repo = new MemoryRepository([...LAUNCH_CATALOG], () => clock);
    await repo.setLiked('u1', STORY, true);
    clock = hoursAgo(2);
    await repo.setLiked('u2', STORY, true);

    const activity = (await repo.getStoryActivity([STORY], activityWindows(NOW))).get(STORY)!;
    expect(activity.recentLikes).toBe(1);
    expect(activity.weekLikes).toBe(2);
  });

  it('answers for every world asked about, including one nobody has touched', async () => {
    const repo = new MemoryRepository([...LAUNCH_CATALOG], () => NOW);
    const all = LAUNCH_CATALOG.map((story) => story.storyId);
    const activity = await repo.getStoryActivity(all, activityWindows(NOW));
    expect([...activity.keys()].sort()).toEqual([...all].sort());
    expect(activity.get(STORY)).toMatchObject({ recentPlayers: 0, weekPlayers: 0, recentLikes: 0, weekLikes: 0 });
  });

  it('dates a world by its first publish, and leaves an undated fixture undated', async () => {
    const repo = new MemoryRepository([...LAUNCH_CATALOG], () => NOW);
    const undated = LAUNCH_CATALOG.filter((story) => story.publishedAt === null).map((s) => s.storyId);
    // Hush House, Uncounted and Window Seven: no publishedAt in the fixture.
    expect(undated.length).toBeGreaterThanOrEqual(3);
    const activity = await repo.getStoryActivity([STORY, ...undated], activityWindows(NOW));
    expect(activity.get(STORY)!.firstPublishedAt).toBe(LAUNCH_CATALOG[0]!.publishedAt);
    for (const id of undated) expect(activity.get(id)!.firstPublishedAt, id).toBeNull();
  });
});

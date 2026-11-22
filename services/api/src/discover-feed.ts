import { createHash } from 'node:crypto';
import type { ActivityWindows, StoryActivity } from './repo/types.js';

/**
 * The Discover shelves that are meant to change from one day to the next.
 *
 * Before this, day 2 and day 7 looked like day 1: Trending was lifetime plays,
 * "New" was the bottom of the score, Featured was a fixed editorial order and
 * nothing knew what the player had already started
 * (docs/retention-push-2026-11-21.md, "The shelf never changes").
 *
 * Everything here is a pure function of the catalogue, its recent activity and
 * a date. The same inputs give the same shelf all day and a different one
 * tomorrow, and a spec can pin the day. Nothing here reads a clock: the route
 * passes `now` in, from `BuildServerOptions.now`.
 */

const HOUR_MS = 3_600_000;
export const DAY_MS = 24 * HOUR_MS;

/**
 * "Recent", for Trending. Three days rather than one: there were 52 sessions in
 * a day and 285 in a week in November 2026, enough to rank on over 72 hours and
 * too thin over 24.
 */
export const RECENT_WINDOW_MS = 72 * HOUR_MS;
/** "This week", for the shelves that need more evidence than three days give. */
export const WEEK_WINDOW_MS = 7 * DAY_MS;

/** Where the two windows start, counted back from `now`. */
export function activityWindows(now: Date): ActivityWindows {
  return {
    recentSince: new Date(now.getTime() - RECENT_WINDOW_MS),
    weekSince: new Date(now.getTime() - WEEK_WINDOW_MS),
  };
}

/** The UTC calendar day, `YYYY-MM-DD`. Every rotation turns over at 00:00 UTC. */
export function utcDay(now: Date): string {
  return now.toISOString().slice(0, 10);
}

/** Days since 1 January, UTC: 0 on New Year's Day. */
export function utcDayOfYear(now: Date): number {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((midnight - Date.UTC(now.getUTCFullYear(), 0, 1)) / DAY_MS);
}

/**
 * A world's place in one day's shuffle: a hash of the story id and the UTC day.
 *
 * Stable all day, so a refresh never reshuffles a shelf under the player's
 * thumb, and unrelated to yesterday's. A hash rather than `Math.random()`,
 * which would be neither.
 */
export function dailyKey(day: string, storyId: string): string {
  return createHash('sha256').update(`${day}:${storyId}`).digest('hex');
}

/** `items` in the day's shuffled order. Ties (which sha256 will not produce) fall to the id. */
export function dailyShuffle<T extends { readonly storyId: string }>(items: readonly T[], day: string): T[] {
  return items
    .map((item) => ({ item, key: dailyKey(day, item.storyId) }))
    .sort((a, b) => compareText(a.key, b.key) || compareText(a.item.storyId, b.item.storyId))
    .map(({ item }) => item);
}

/** Byte order, not locale order: a hash or an id has no locale. */
export function compareText(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * What the shelves know about one world. Nothing about who is looking at it,
 * so anything built from these alone is the same for every player who reads
 * the shelf in that language on that day.
 */
export interface ShelfWorld {
  readonly storyId: string;
  readonly official: boolean;
  /** A cover to put on a card. A shelf of grey placeholders is not a shelf. */
  readonly hasCover: boolean;
  /** A picture wide enough for the Featured banner: key art, or the cover. */
  readonly hasBannerArt: boolean;
  /** Derived categories (`catalog-taxonomy.ts`), as the chips file it. */
  readonly categories: readonly string[];
  readonly activity: StoryActivity;
}

// ---------------------------------------------------------------------------
// New on Plotbreak
// ---------------------------------------------------------------------------

export const NEW_LIMIT = 12;

/**
 * Newest first, by first-publish date, cover required.
 *
 * This row used to be the bottom 30% of the score, reversed: the same three
 * cards for a week, and six of the eight worlds published that week not in it
 * at all. With about one player-made world a day, sorting by date is what
 * makes its first card change almost daily.
 *
 * A world with no date at all is left out rather than put first: it cannot
 * claim to be new. (The old summary code stamped an undated world with the
 * current time, which would have pinned three September worlds to the front.)
 */
export function newestFirst(worlds: readonly ShelfWorld[]): string[] {
  return worlds
    .filter((world) => world.hasCover)
    .map((world) => ({ id: world.storyId, at: Date.parse(world.activity.firstPublishedAt ?? '') }))
    .filter((world) => Number.isFinite(world.at))
    .sort((a, b) => b.at - a.at || compareText(a.id, b.id))
    .map((world) => world.id);
}

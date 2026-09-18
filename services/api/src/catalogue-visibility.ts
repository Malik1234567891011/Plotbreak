import type { StorySignals } from './repo/types.js';
import { AUTO_HIDE_REPORTS } from './repo/types.js';
import type { StoryVersion } from '@plotbreak/contracts';

/**
 * Who is allowed to see which worlds.
 *
 * Before Create, every world in the catalogue was authored by us. There was no
 * creator to block, no story to report that a person had written, and nothing
 * to take down — so the only filter the shelves needed was the player's own
 * "not for me". A catalogue anybody can publish into needs three more, and all
 * three are things App Review asks a user-generated-content app to have:
 *
 *  - blocking somebody has to mean not seeing their work, not just their
 *    comments. `listBlocks` existed and its only reader was the comment list,
 *    which was correct for exactly as long as stories had no authors.
 *  - a world enough people have reported comes off the shelves without waiting
 *    for one of us to be awake. Same threshold and the same reasoning as a
 *    comment: three is not a heckler, ten is a number you reach afterwards.
 *  - and none of it may touch the official catalogue, which is moderated by
 *    having been written by us. A brigade should not be able to bury a
 *    launch world.
 */

export interface VisibilityContext {
  /** User ids this player has blocked. Empty for a guest. */
  readonly blocked: ReadonlySet<string>;
  /** Story ids this player has hidden. */
  readonly hidden: ReadonlySet<string>;
  /** Signals per story id, for the report threshold. */
  readonly signals: ReadonlyMap<string, StorySignals>;
}

/** A world nobody reported, from nobody this player blocked, they have not hidden. */
export function isVisible(story: StoryVersion, context: VisibilityContext): boolean {
  if (context.hidden.has(story.storyId)) return false;
  // Official worlds are moderated by authorship. Everything below is about
  // worlds a stranger wrote.
  if (story.official) return true;
  if (story.creatorId && context.blocked.has(story.creatorId)) return false;
  const reports = context.signals.get(story.storyId)?.reports ?? 0;
  if (reports >= AUTO_HIDE_REPORTS) return false;
  return true;
}

export function visibleStories(
  stories: readonly StoryVersion[],
  context: VisibilityContext,
): StoryVersion[] {
  return stories.filter((story) => isVisible(story, context));
}

/**
 * Everything the filter needs, in two queries rather than per-story.
 *
 * Signals are fetched for the whole candidate set because the report count is
 * part of *whether a card is shown at all*, not just what number is on it —
 * so it cannot wait until after the list has been cut down.
 */
export async function visibilityContext(
  deps: {
    readonly listBlocks: (userId: string) => Promise<string[]>;
    readonly getHidden: (userId: string) => Promise<string[]>;
    readonly getSignalsFor: (storyIds: readonly string[]) => Promise<Map<string, StorySignals>>;
  },
  userId: string | null,
  storyIds: readonly string[],
): Promise<VisibilityContext> {
  const [blocked, hidden, signals] = await Promise.all([
    userId ? deps.listBlocks(userId) : Promise.resolve([]),
    userId ? deps.getHidden(userId) : Promise.resolve([]),
    storyIds.length ? deps.getSignalsFor(storyIds) : Promise.resolve(new Map<string, StorySignals>()),
  ]);
  return { blocked: new Set(blocked), hidden: new Set(hidden), signals };
}

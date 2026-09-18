import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import type { StoryVersion } from '@plotbreak/contracts';
import type { StorySignals } from './repo/types.js';
import { EMPTY_SIGNALS } from './repo/types.js';
import { isVisible, visibleStories, type VisibilityContext } from './catalogue-visibility.js';

/**
 * The three things App Review asks a user-generated-content app to have, as
 * assertions rather than intentions.
 *
 * All of this was correct before Create and is wrong the moment a stranger can
 * publish: blocking somebody filtered their comments and not their worlds,
 * reporting a story bumped a counter and nothing else, and `status = 'REMOVED'`
 * had never been set by anything.
 */

const official = LAUNCH_CATALOG[0]!;

function userStory(overrides: Partial<StoryVersion> = {}): StoryVersion {
  return {
    ...official,
    storyId: 'story_user_1',
    official: false,
    creatorId: 'creator-1',
    creatorName: 'Somebody',
    ...overrides,
  };
}

function context(overrides: Partial<VisibilityContext> = {}): VisibilityContext {
  return {
    blocked: new Set<string>(),
    hidden: new Set<string>(),
    signals: new Map<string, StorySignals>(),
    ...overrides,
  };
}

const withReports = (storyId: string, reports: number) =>
  new Map<string, StorySignals>([[storyId, { ...EMPTY_SIGNALS, reports }]]);

describe('catalogue visibility', () => {
  it('shows an ordinary player-made world', () => {
    expect(isVisible(userStory(), context())).toBe(true);
  });

  it('hides the worlds of somebody you blocked, not just their comments', () => {
    const story = userStory();
    expect(isVisible(story, context({ blocked: new Set(['creator-1']) }))).toBe(false);
  });

  it('does not hide somebody else because you blocked one person', () => {
    const story = userStory({ storyId: 'story_user_2', creatorId: 'creator-2' });
    expect(isVisible(story, context({ blocked: new Set(['creator-1']) }))).toBe(true);
  });

  it('takes a world off the shelves once enough people have reported it', () => {
    const story = userStory();
    expect(isVisible(story, context({ signals: withReports(story.storyId, 3) }))).toBe(false);
  });

  it('does not act on one or two reports, which is a grudge rather than a signal', () => {
    const story = userStory();
    expect(isVisible(story, context({ signals: withReports(story.storyId, 2) }))).toBe(true);
  });

  it('never lets a brigade bury an official world', () => {
    expect(isVisible(official, context({ signals: withReports(official.storyId, 50) }))).toBe(true);
    // Nor a block, since nobody can block us — but the rule should not depend
    // on that being impossible.
    expect(
      isVisible(official, context({ blocked: new Set([official.creatorId]) })),
    ).toBe(true);
  });

  it('still respects a plain "not for me"', () => {
    const story = userStory();
    expect(isVisible(story, context({ hidden: new Set([story.storyId]) }))).toBe(false);
    expect(isVisible(official, context({ hidden: new Set([official.storyId]) }))).toBe(false);
  });

  it('shows everything to a guest, who has blocked and hidden nothing', () => {
    const stories = [official, userStory()];
    expect(visibleStories(stories, context())).toHaveLength(2);
  });

  it('keeps a world whose creator is unknown, rather than dropping it', () => {
    // A definition written before creatorId was populated should not vanish
    // because a field is empty.
    const story = userStory({ creatorId: '' });
    expect(isVisible(story, context({ blocked: new Set(['']) }))).toBe(true);
  });
});

import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import type { StoryVersion } from '@plotbreak/contracts';
import {
  MARRIED_TO_THE_SHRINE_FOX,
  SEVEN_YEARS_EARLY,
  THE_MAID_OWNS_THE_HOUSE_NOW,
  THE_ONE_COPPER_INN,
} from '@plotbreak/test-fixtures';
import { generatedCoverPrompt } from './prompts.js';

/**
 * Two kinds of cover go through `generatedCoverPrompt`, and only one of them
 * got the cover-style-v2 appeal direction.
 *
 * Official new-50 covers carry a `TITLE:` line in their `coverDirection` and get
 * the gacha/webtoon appeal block plus its hard limits. Creator covers
 * (`services/api/src/create-art.ts`, drawn live for strangers' worlds) never
 * carry one, and their prompt must stay byte-for-byte what it was before v2.
 */

const sha = (text: string): string => createHash('sha256').update(text).digest('hex');

/**
 * A creator world built from literals, so the pinned hashes below move only
 * when `prompts.ts` moves, never when a fixture is edited. Every field the cover
 * prompt reads is overridden here.
 */
function creatorStory(coverDirection: string): StoryVersion {
  const base = MARRIED_TO_THE_SHRINE_FOX;
  return {
    ...base,
    id: 'storyver_spec_creator',
    storyId: 'story_spec_creator',
    title: 'The Lamp Room',
    fantasyLabel: 'A lighthouse keeper who answers the wrong ship.',
    tags: ['Mystery', 'Drama'],
    coverDirection,
    rules: { ...base.rules, startingLocationId: 'loc_lamp', toneGuide: 'Quiet, salt-stung, patient.' },
    locations: [{ ...base.locations[0]!, id: 'loc_lamp', artDirection: 'A brass lamp room at night, rain on the glass.' }],
    characters: [
      {
        ...base.characters[0]!,
        name: 'Maren Hale',
        role: 'The keeper',
        pronouns: 'she/her',
        appearance: 'An adult woman in an oilskin coat, short dark hair, a brass key on a cord.',
        visualHook: 'the brass key',
        silhouette: 'a long coat against the lamp',
      },
    ],
  };
}

describe('creator covers are untouched by cover-style-v2', () => {
  // Pinned from the code as it stood before the v2 appeal block existed.
  it('a creator-written direction with no TITLE: line gives the same prompt as before', () => {
    const { prompt } = generatedCoverPrompt(creatorStory('A lamp room at night, the keeper at the glass.'), 'The Lamp Room');
    expect(sha(prompt)).toBe('b294c37f844fb755592842b8a44ca75283488cea1544d16df5252fe1a95dd84e');
  });

  it('a creator world with no direction at all gives the same prompt as before', () => {
    const { prompt } = generatedCoverPrompt(creatorStory(''), 'The Lamp Room');
    expect(sha(prompt)).toBe('b577b6ee18fff951576a605926241e1d6309d252f50558605b98ba8332294a6c');
  });

  it('keeps the mild appeal line and the anti-fanservice line, and none of the v2 block', () => {
    const { prompt } = generatedCoverPrompt(creatorStory('A lamp room at night.'), 'The Lamp Room');
    expect(prompt).toContain('alluring, never explicit');
    expect(prompt).toContain('Avoid: gratuitous cleavage, fanservice framing');
    expect(prompt).not.toContain('APPEAL');
    expect(prompt).not.toContain('HARD LIMITS');
  });
});

describe('official covers get the v2 appeal block and its hard limits', () => {
  const official = [MARRIED_TO_THE_SHRINE_FOX, THE_ONE_COPPER_INN, THE_MAID_OWNS_THE_HOUSE_NOW, SEVEN_YEARS_EARLY];

  it.each(official.map((s) => [s.title, s] as const))('%s', (_title, story) => {
    expect(story.coverDirection).toMatch(/\bTITLE:/);
    const { prompt } = generatedCoverPrompt(story, story.title);
    expect(prompt).toContain('APPEAL, WHAT SELLS THIS COVER');
    expect(prompt).toContain('HARD LIMITS, overriding the appeal above');
    expect(prompt).toMatch(/clearly an adult in their twenties or older/);
    expect(prompt).toMatch(/No nudity, no nipples, no underwear or lingerie/);
    expect(prompt).toMatch(/no sexualized school uniforms/i);
    // The child and teen rule rides along unchanged, after the appeal it overrides.
    expect(prompt).toContain('ABSOLUTE RULE, overriding everything above: any character who is a child or a teenager');
    expect(prompt.indexOf('ABSOLUTE RULE')).toBeGreaterThan(prompt.indexOf('APPEAL, WHAT SELLS THIS COVER'));
    expect(prompt).toContain('Absolutely no sexualization of minors.');
    // The anti-fanservice line is the one thing dropped; the other cover negatives stay.
    expect(prompt).not.toContain('gratuitous cleavage');
    expect(prompt).toContain('Avoid: a generic landscape with a tiny distant figure.');
    expect(prompt).not.toContain('alluring, never explicit');
  });
});

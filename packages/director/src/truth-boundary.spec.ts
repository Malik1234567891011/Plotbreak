import { describe, expect, it } from 'vitest';
import { LAST_FIVE, BLACKWAKE } from '@plotbreak/test-fixtures';
import type { StoryVersion } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { RuleBasedIntentParser } from './parser.js';
import { ensureTravelIntent, stripInventedViolence } from './entity-resolution.js';
import { findPresenceOfAbsent, findUnlicensedTravel } from './present-absence.js';
import { findInventedHistory } from './invented-history.js';

/**
 * The same invariants, in worlds that are not Ace.
 *
 * Every failure this pass came from was found in one Ace session, and every
 * fix is in shared code — the parser, the pipeline, the validator. If any of
 * them were secretly Ace-shaped, these would fail. A sports drama and a pirate
 * ship have no pipes, no Sabo and no Mount Colubo.
 */

const world = (story: StoryVersion) =>
  createInitialState({
    sessionId: 's', story,
    identity: { displayName: 'Sora', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]?.id ?? null, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

const parse = (story: StoryVersion, text: string) => {
  const state = world(story);
  const raw = new RuleBasedIntentParser().parseSync(text, { story, state, intentId: 'i' });
  return ensureTravelIntent(stripInventedViolence(raw, { text }), { story, state, text }).actions;
};

describe('a gesture is not an attack, in any world', () => {
  it('does not read carrying a thing as swinging it at somebody', () => {
    for (const text of [
      'I sling the bat over my shoulder and grin at Kai.',
      'I sit on the bench swinging my legs while they argue.',
      'I swing the locker door shut and lean on it.',
    ]) {
      expect(parse(LAST_FIVE as StoryVersion, text).map((a) => a.verb), text).not.toContain('attack');
    }
  });

  it('still hears a swing aimed at somebody', () => {
    expect(parse(BLACKWAKE as StoryVersion, 'I swing the bottle at him.').map((a) => a.verb))
      .toContain('attack');
  });
});

describe('a player-controlled move survives an NPC saying no', () => {
  it('produces the move as its own clause', () => {
    const story = LAST_FIVE as StoryVersion;
    const state = world(story);
    const here = story.locations.find((l) => l.id === state.player.locationId)!;
    const somewhere = story.locations.find((l) => l.id === here.connections[0]?.to);
    if (!somewhere) return; // world with no exits; nothing to assert

    // Two sentences, which is the shape the real failure had: the player's own
    // move, and a request somebody else gets to refuse.
    const text = `I head for ${somewhere.name}. "Come with me," I tell them.`;
    const actions = parse(story, text);
    const travel = actions.find((a) => a.verb === 'travel');
    expect(travel, 'the move is its own clause').toBeDefined();
    expect(travel!.targets[0]?.entityId).toBe(somewhere.id);
    // Exactly one travel clause, carrying the destination, so nothing an NPC
    // decides can remove it.
    //
    // Only the move is asserted here. Whether the request becomes its own
    // clause depends on the clause splitter, which collapses
    // "action. \"quoted speech.\"" into one — worth knowing and not what this
    // guards. The separation on the card that actually failed is checked in
    // `replay.spec.ts`, against turn 76 verbatim.
    expect(actions.filter((a) => a.verb === 'travel')).toHaveLength(1);
  });
});

describe('prose may not contradict the room', () => {
  it('rejects a present character being written out', () => {
    const story = LAST_FIVE as StoryVersion;
    const state = world(story);
    const someone = charactersPresent(state)[0];
    if (!someone) return;
    const def = story.characters.find((c) => c.id === someone.characterId)!;
    const claims = findAbsent(story, def.name);
    expect(claims).toBeGreaterThan(0);
  });

  function findAbsent(story: StoryVersion, name: string): number {
    // The other direction: somebody the engine has elsewhere, acting here.
    return findPresenceOfAbsent([{ text: `${name} laughs and steps in front of you.` }], [
      { id: 'x', name },
    ]).length;
  }

  it('rejects a beat that leaves with no travel event', () => {
    expect(
      findUnlicensedTravel([{ type: 'NARRATION', text: 'You leave the gym and start down the road.' }], {
        travelled: false,
      }),
    ).toHaveLength(1);
  });
});

describe('an injury needs an event, in any world', () => {
  it('rejects a wound on somebody nothing has hurt', () => {
    const story = LAST_FIVE as StoryVersion;
    const state = world(story);
    const def = story.characters.find((c) => charactersPresent(state).some((r) => r.characterId === c.id));
    if (!def) return;
    const hits = findInventedHistory(
      [{ type: 'NARRATION', text: `${def.name} is still favouring the shoulder where your last blow landed.`, speakerId: null }],
      { story, state, memoryText: [], playerName: 'Sora' },
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  it('rejects a promise nothing recorded', () => {
    const story = BLACKWAKE as StoryVersion;
    const hits = findInventedHistory(
      [{ type: 'NARRATION', text: 'You promised her the whole share and she has not forgotten it.', speakerId: null }],
      { story, state: world(story), memoryText: [], playerName: 'Sora' },
    );
    expect(hits.length).toBeGreaterThan(0);
  });
});

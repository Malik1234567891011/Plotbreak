import { describe, expect, it } from 'vitest';
import { WorldSheetResponse, type GameState, type StoryVersion } from '@plotbreak/contracts';
import { createInitialState } from '@plotbreak/engine';
import { HUSH_HOUSE } from '@plotbreak/test-fixtures';
import { toWorldSheet } from './projections.js';

// `resolveAssetUrl` answers null with no CDN base configured, which would make
// the portrait assertions pass for the wrong reason.
process.env.MEDIA_CDN_BASE_URL = 'https://cdn.test';

/**
 * The World Sheet's Now tab: who is in the room with the player.
 *
 * `overview.hereNow` is new and additive. Production turns run through
 * `runTurnPure`, which keeps `state.characters[].locationId` current, so the
 * list is read from presence rather than from anything the prose said.
 */

const story = HUSH_HOUSE as StoryVersion;

const fresh = (): GameState =>
  createInitialState({
    sessionId: 's',
    story,
    identity: {
      displayName: 'Ren', pronouns: 'they/them', ageBand: null,
      archetypeId: story.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

/** The state with exactly these characters standing where the player is. */
function withInRoom(state: GameState, ids: readonly string[]): GameState {
  const here = state.player.locationId;
  const elsewhere = story.locations.find((l) => l.id !== here)!.id;
  return {
    ...state,
    characters: state.characters.map((c) => ({
      ...c,
      locationId: ids.includes(c.characterId) ? here : elsewhere,
    })),
  };
}

const sheet = (state: GameState, s: StoryVersion = story) => toWorldSheet(s, state, [], [], false);

describe('the World Sheet says who is here now', () => {
  it('lists exactly the people in the player’s room, with a face and the card line', () => {
    const [first, second] = story.characters;
    const result = sheet(withInRoom(fresh(), [first!.id, second!.id]));

    expect(result.overview.hereNow.map((c) => c.characterId)).toEqual([first!.id, second!.id]);
    const row = result.overview.hereNow[0]!;
    expect(row.name).toBe(first!.name);
    expect(row.line).toBe(first!.cardBlurb.trim());
    expect(row.portrait).toContain('https://cdn.test/');
  });

  it('is empty when the player is alone', () => {
    expect(sheet(withInRoom(fresh(), [])).overview.hereNow).toEqual([]);
  });

  it('follows people as they come and go', () => {
    const [first, second] = story.characters;
    const before = sheet(withInRoom(fresh(), [first!.id]));
    const after = sheet(withInRoom(fresh(), [second!.id]));
    expect(before.overview.hereNow.map((c) => c.characterId)).toEqual([first!.id]);
    expect(after.overview.hereNow.map((c) => c.characterId)).toEqual([second!.id]);
  });

  it('leaves out somebody who has died', () => {
    const [first] = story.characters;
    const state = withInRoom(fresh(), [first!.id]);
    const dead = {
      ...state,
      characters: state.characters.map((c) => (c.characterId === first!.id ? { ...c, alive: false } : c)),
    };
    expect(sheet(dead).overview.hereNow).toEqual([]);
  });

  it('falls back to the role when a world wrote no card line', () => {
    const [first] = story.characters;
    const blank = {
      ...story,
      characters: story.characters.map((c) => (c.id === first!.id ? { ...c, cardBlurb: '  ' } : c)),
    };
    const [row] = sheet(withInRoom(fresh(), [first!.id]), blank).overview.hereNow;
    expect(row!.line).toBe(first!.role);
  });

  it('skips a runtime character the definition does not know', () => {
    const state = withInRoom(fresh(), []);
    const ghost = {
      ...state,
      characters: [
        ...state.characters,
        { ...state.characters[0]!, characterId: 'not_in_this_world', locationId: state.player.locationId },
      ],
    };
    expect(sheet(ghost).overview.hereNow).toEqual([]);
  });

  it('matches its own contract', () => {
    const [first] = story.characters;
    expect(() => WorldSheetResponse.parse(sheet(withInRoom(fresh(), [first!.id])))).not.toThrow();
  });

  it('defaults to empty for a sheet that predates the field', () => {
    // What an older server sends: the same sheet without `hereNow`.
    const current = sheet(withInRoom(fresh(), []));
    const { hereNow: _dropped, ...overview } = current.overview;
    const parsed = WorldSheetResponse.parse({ ...current, overview });
    expect(parsed.overview.hereNow).toEqual([]);
  });
});

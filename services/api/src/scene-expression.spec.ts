import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { toSceneState } from './projections.js';

// `resolveAssetUrl` answers null with no CDN base configured, which is correct
// and would make every assertion below vacuously pass.
process.env.MEDIA_CDN_BASE_URL = 'https://cdn.test';

/**
 * The portrait row showed the same flat face whatever had just happened.
 *
 * `toSceneState` hardcoded `expression: 'neutral'`, `reactionUrl: null` and
 * `reactionEmotion: null` for every character on every turn, so the client's
 * `character.reactionUrl ?? character.portrait` fell through to the portrait
 * forever. The reaction *stream* was fine all along — `reaction.ready` arrives
 * about 2.5s into a turn and the Swift client draws it — but that one is
 * transient and only for the person the beat is about.
 */

const state = () =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

describe('the stage shows how the room is feeling', () => {
  it('carries the expression the beat set', () => {
    const scene = toSceneState(ACE, state(), { mediaPlan: { expressions: { luffy: 'annoyed' } } });
    const luffy = scene.presentCharacters.find((c) => c.id === 'luffy')!;
    expect(luffy.reactionEmotion).toBe('annoyed');
    expect(luffy.reactionUrl).toContain('luffy_annoyed');
  });

  it('maps a world’s own word onto a face that exists', () => {
    // Worlds author expressions in their own vocabulary. Only eight faces are
    // drawn, so `story_ace/ace_determined` is a 404 and must never be sent.
    const scene = toSceneState(ACE, state(), { mediaPlan: { expressions: { sabo: 'determined' } } });
    const sabo = scene.presentCharacters.find((c) => c.id === 'sabo')!;
    expect(sabo.reactionUrl).not.toContain('determined');
    expect(['neutral', 'annoyed', 'amused', 'angry', 'warm', 'worried', 'surprised', 'sad'])
      .toContain(sabo.reactionEmotion);
  });

  it('sends nothing rather than a broken image when the beat said nothing', () => {
    const scene = toSceneState(ACE, state(), { mediaPlan: { expressions: {} } });
    for (const c of scene.presentCharacters) {
      expect(c.reactionUrl).toBeNull();
      expect(c.reactionEmotion).toBeNull();
      expect(c.expression).toBe('neutral');
    }
  });

  it('still works with no turn at all, which is the opening', () => {
    const scene = toSceneState(ACE, state());
    expect(scene.presentCharacters.length).toBeGreaterThan(0);
    for (const c of scene.presentCharacters) expect(c.reactionUrl).toBeNull();
  });
});

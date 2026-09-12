import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { heroCastForTest, absentNotablesForTest } from './turn-service.js';

/**
 * The director's pick of who is in frame is a preference. The engine's record
 * of who is in the room is the authority.
 *
 * Turn 13 of the forty-turn Ace run sent `["luffy","sabo","dadan"]` to the
 * image generator while the player stood on Mount Colubo and Dadan was down at
 * the house. The frame came back as Dadan's camp, with Dadan in it, for a beat
 * set in the forest. Turn 20 sent `[]`, and an empty cast is how three people
 * get invented.
 */

const state = () =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

describe('who is in the frame', () => {
  it('drops somebody the director named who is not in the room', () => {
    const cast = heroCastForTest(state(), ['luffy', 'sabo', 'dadan']);
    expect(cast).toContain('luffy');
    expect(cast).toContain('sabo');
    expect(cast).not.toContain('dadan');
  });

  it('falls back to the room rather than sending an empty cast', () => {
    expect(heroCastForTest(state(), []).length).toBeGreaterThan(0);
    expect(heroCastForTest(state(), ['whitebeard', 'akainu']).length).toBeGreaterThan(0);
  });

  it('keeps the director’s ordering among the people who are here', () => {
    expect(heroCastForTest(state(), ['sabo', 'luffy'])[0]).toBe('sabo');
  });

  it('never sends more than a frame can hold', () => {
    expect(heroCastForTest(state(), []).length).toBeLessThanOrEqual(3);
  });

  it('reports notable people who are elsewhere', () => {
    const absent = absentNotablesForTest(state(), ACE);
    expect(absent).toContain('dadan');
    expect(absent).not.toContain('luffy');
  });
});

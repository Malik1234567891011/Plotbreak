import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { runTurnPure } from './runtime.js';
import type { ModelGateway } from '../gateway/types.js';

/**
 * Presence is the model's own account of the scene it just wrote, and the
 * runtime's job is to apply it without embellishing. These cover the plumbing;
 * whether the model's account matches its prose is judged by reading
 * `npm run attribution-probe -- --only=presence`, because only a reader can
 * tell that "Sabo went back inside" means Sabo is not standing there.
 */
const base = (): GameState =>
  createInitialState({
    sessionId: 'presence-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

function gatewayReturning(turn: {
  present: string[];
  locationId?: string;
  narrative?: Array<{ speaker: string; text: string }>;
}): ModelGateway {
  return {
    name: 'stub',
    async generateStructured() {
      return {
        value: {
          narrative: turn.narrative ?? [{ speaker: 'narration', text: 'You keep walking.' }],
          locationId: turn.locationId ?? 'mt_colubo',
          presentCharacterIds: turn.present,
          sceneSummary: 'x',
          sceneStatus: 'live',
          suggestedResponses: ['I go on.', 'I stop.'],
          timeAdvance: { amount: 5, unit: 'minutes', phrase: null },
        },
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
    streamText: () => { throw new Error('unused'); },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

const run = (turn: Parameters<typeof gatewayReturning>[0], state = base()) =>
  runTurnPure({
    gateway: gatewayReturning(turn), story: ACE, state, recentTurns: [], rendered: [],
    shape: 'append', actionText: 'I go.', turnId: 't',
  });

const here = (state: GameState) =>
  state.characters.filter((c) => c.locationId === state.player.locationId).map((c) => c.characterId).sort();

describe('presence metadata', () => {
  it('keeps exactly who the model says is there, and nobody else', async () => {
    const result = await run({ present: ['luffy'] });
    expect(here(result.state)).toEqual(['luffy']);
  });

  it('removes somebody who stayed behind when the player moved on', async () => {
    const start = base();
    // Both are with the player to begin with.
    const withBoth: GameState = {
      ...start,
      characters: start.characters.map((c) =>
        c.characterId === 'sabo' || c.characterId === 'luffy'
          ? { ...c, locationId: start.player.locationId }
          : c,
      ),
    } as GameState;
    const result = await run({ present: ['luffy'], locationId: 'dawn_shore' }, withBoth);
    expect(here(result.state)).toEqual(['luffy']);
    expect(result.state.characters.find((c) => c.characterId === 'sabo')!.locationId).not.toBe('dawn_shore');
  });

  it('lets somebody arrive mid-beat', async () => {
    const result = await run({ present: ['luffy', 'sabo', 'dadan'] });
    expect(here(result.state)).toEqual(['dadan', 'luffy', 'sabo']);
  });

  it('does not bring in a character merely because they were discussed', async () => {
    const result = await run({
      present: ['sabo'],
      narrative: [{ speaker: 'sabo', text: 'Dadan would skin us both for it.' }],
    });
    expect(here(result.state)).toEqual(['sabo']);
  });

  it('splits a group without dragging the other half along', async () => {
    const result = await run({ present: ['luffy'], locationId: 'asl_treehouse' });
    expect(here(result.state)).toEqual(['luffy']);
  });

  it('ignores an id that is not in the cast', async () => {
    const result = await run({ present: ['luffy', 'not_a_character'] });
    expect(here(result.state)).toEqual(['luffy']);
  });
});

describe('speaker normalisation', () => {
  it('maps a display name onto the cast id rather than losing the turn', async () => {
    const { PURE_SPEAKER_NORMALIZER } = await import('./narrator.js');
    const fix = PURE_SPEAKER_NORMALIZER(ACE);
    const out = fix({
      narrative: [
        { speaker: 'Monkey D. Luffy', text: 'I’m coming!' },
        { speaker: 'Luffy', text: 'Still coming!' },
        { speaker: 'sabo', text: 'Evidently.' },
        { speaker: 'Curly Dadan', text: 'GET DOWN FROM THERE.' },
        { speaker: 'narration', text: 'The fire pops.' },
        { speaker: 'unknown', text: 'Somebody laughs in the dark.' },
        { speaker: 'a passing stranger', text: 'Who goes there?' },
      ],
    }) as { narrative: Array<{ speaker: string }> };
    expect(out.narrative.map((b) => b.speaker)).toEqual([
      'luffy', 'luffy', 'sabo', 'dadan', 'narration', 'unknown',
      // Unrecognised becomes narration: a wrong portrait is worse than none.
      'narration',
    ]);
  });
});

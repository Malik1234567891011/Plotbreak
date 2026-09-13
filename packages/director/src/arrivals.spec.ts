import { describe, expect, it } from 'vitest';
import type { GameState, StateMutation, TurnRecord } from '@plotbreak/contracts';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { buildTurnContext } from './context.js';

/**
 * Turn 33 of the forty-turn Ace run: Luffy, Dadan and Garp all arrive on
 * Mount Colubo and Sabo leaves, in one turn, with none of it narrated. Garp is
 * a Marine vice-admiral and the player's grandfather, and he simply existed in
 * the paragraph.
 *
 * Schedules and world events move people at commit, which is after the writer
 * has run, so the beat that should have shown them arriving never knew.
 */

let n = 0;
const move = (characterId: string, locationId: string): StateMutation =>
  ({
    mutationId: `m${(n += 1)}`, type: 'LOCATION_CHANGE', subjectId: characterId,
    reasonCode: 'SCHEDULE', payload: { locationId },
  }) as unknown as StateMutation;

const turn = (mutations: StateMutation[]): TurnRecord =>
  ({ turnId: `t${(n += 1)}`, mutations, blocks: [], suggestions: [] }) as unknown as TurnRecord;

function contextWith(state: GameState, recentTurns: TurnRecord[]) {
  return buildTurnContext({
    story: ACE,
    state,
    resolution: {
      turnId: 't', intentId: 'i', schemaVersion: '1.0', checks: [], mutations: [],
      observableFacts: [], privateFacts: [], newOpportunities: [], timeAdvancedMinutes: 0,
      refusal: null, normalizedActions: [],
    } as never,
    tier: 'VIVID',
    memories: [],
    recentTurns,
    actionText: 'I wait.',
  });
}

const state = (): GameState =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

describe('somebody walking into the scene', () => {
  it('reports a character the last beat moved into the room', () => {
    const s = state();
    // Garp starts at the house; put him on the mountain the way a schedule would.
    const garp = s.characters.find((c) => c.characterId === 'garp')!;
    garp.locationId = s.player.locationId;
    const context = contextWith(s, [turn([move('garp', s.player.locationId)])]);
    expect(context.arrivals.map((a) => a.name)).toContain('Monkey D. Garp');
  });

  it('reports a character the last beat moved out of it', () => {
    const s = state();
    const sabo = s.characters.find((c) => c.characterId === 'sabo')!;
    sabo.locationId = 'gray_terminal';
    const context = contextWith(s, [turn([move('sabo', 'gray_terminal')])]);
    expect(context.departures.map((d) => d.name)).toContain('Sabo');
  });

  it('says nothing on a turn where nobody moved', () => {
    const context = contextWith(state(), [turn([])]);
    expect(context.arrivals).toEqual([]);
    expect(context.departures).toEqual([]);
  });

  it('does not report the player’s own travel as somebody arriving', () => {
    // The player walking into a room is not three people appearing in it.
    const s = state();
    const context = contextWith(s, [turn([move('player', s.player.locationId)])]);
    expect(context.arrivals).toEqual([]);
  });

  it('says nothing on the opening, which has no previous beat', () => {
    const context = contextWith(state(), []);
    expect(context.arrivals).toEqual([]);
    expect(context.departures).toEqual([]);
  });
});

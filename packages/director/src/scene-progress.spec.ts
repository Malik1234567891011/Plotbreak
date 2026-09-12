import { describe, expect, it } from 'vitest';
import type { GameState, StateMutation, TurnRecord } from '@plotbreak/contracts';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import { sceneProgress } from './scene-progress.js';

/**
 * The numbers this came from: twenty turns of Ace, one location, 115 minutes
 * of world time, and every turn costing exactly six.
 */

const state = (): GameState =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

let n = 0;
const turn = (mutations: StateMutation[]): TurnRecord =>
  ({ turnId: `t${(n += 1)}`, mutations } as unknown as TurnRecord);

const mutation = (type: string, payload: Record<string, unknown>, subjectId = 'session'): StateMutation =>
  ({ mutationId: `m${(n += 1)}`, type, subjectId, reasonCode: 'X', payload } as unknown as StateMutation);

/** What an Ace turn on the mountain actually produced, over and over. */
const talking = (): TurnRecord =>
  turn([
    mutation('FLAG_SET', { flag: 'heard:sabo', value: true }),
    mutation('RELATIONSHIP_DELTA', { dimension: 'trust', amount: -2 }, 'sabo'),
    mutation('TIME_ADVANCE', { minutes: 6 }),
  ]);

describe('a scene that has stopped moving', () => {
  it('does not call a normal conversation stalled', () => {
    const progress = sceneProgress(state(), [talking(), talking(), talking()]);
    expect(progress.stalled).toBe(false);
  });

  it('calls six turns of the same room with nothing changing stalled', () => {
    const progress = sceneProgress(state(), Array.from({ length: 7 }, talking));
    expect(progress.turnsHere).toBeGreaterThanOrEqual(6);
    expect(progress.turnsSinceSomethingChanged).toBeGreaterThanOrEqual(4);
    expect(progress.stalled).toBe(true);
  });

  it('does not count a relationship sliding as the scene moving', () => {
    // This is the case, not an edge of it: three boys in a clearing whose
    // trust numbers drift while nothing happens is exactly the state being
    // detected, so it must not read as escape.
    expect(sceneProgress(state(), Array.from({ length: 8 }, talking)).stalled).toBe(true);
  });

  it('resets when something the player can point at changes', () => {
    const turns = [...Array.from({ length: 6 }, talking), turn([mutation('QUEST_STEP', { questId: 'q', stepId: 's' })])];
    expect(sceneProgress(state(), turns).turnsSinceSomethingChanged).toBe(0);
    expect(sceneProgress(state(), turns).stalled).toBe(false);
  });

  it('resets when the player leaves', () => {
    const s = state();
    const turns = [
      ...Array.from({ length: 6 }, talking),
      turn([mutation('LOCATION_CHANGE', { locationId: s.player.locationId }, 'player')]),
      talking(),
    ];
    expect(sceneProgress(s, turns).turnsHere).toBeLessThanOrEqual(2);
    expect(sceneProgress(s, turns).stalled).toBe(false);
  });
});

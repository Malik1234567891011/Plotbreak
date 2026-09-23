import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { runTurnPure } from './runtime.js';
import type { ModelGateway } from '../gateway/types.js';

/**
 * Quest completion is the model's claim about the beat it just wrote, and it
 * feeds `quest_completed` in product analytics. These cover what the runtime
 * accepts: real quests only, and each one once.
 */
const base = (): GameState =>
  createInitialState({
    sessionId: 'quests-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

function gatewayClaiming(completedQuestIds: string[] | undefined): ModelGateway {
  return {
    name: 'stub',
    async generateStructured() {
      return {
        value: {
          narrative: [{ speaker: 'narration', text: 'The boat is gone.' }],
          locationId: 'mt_colubo',
          presentCharacterIds: [],
          sceneSummary: 'x',
          sceneStatus: 'settled',
          suggestedResponses: ['I go on.'],
          ...(completedQuestIds ? { completedQuestIds } : {}),
        },
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
  } as unknown as ModelGateway;
}

const run = (claimed: string[] | undefined, state = base()) =>
  runTurnPure({
    gateway: gatewayClaiming(claimed), story: ACE, state, recentTurns: [], rendered: [],
    shape: 'append', actionText: 'I watch.', turnId: 't',
  });

const status = (state: GameState, questId: string) => state.quests.find((q) => q.questId === questId)?.status;

describe('pure quest completion', () => {
  it('completes nothing when the model leaves the field out', async () => {
    const result = await run(undefined);
    expect(result.completedQuestIds).toEqual([]);
  });

  it('records a claimed quest and marks it COMPLETED', async () => {
    const result = await run(['q_sabo_departure']);
    expect(result.completedQuestIds).toEqual(['q_sabo_departure']);
    expect(status(result.state, 'q_sabo_departure')).toBe('COMPLETED');
  });

  it('accepts a title in place of an id and drops ids the story does not define', async () => {
    const result = await run(['the boat from high town', 'q_invented']);
    expect(result.completedQuestIds).toEqual(['q_sabo_departure']);
  });

  it('does not complete the same quest twice', async () => {
    const first = await run(['q_leaving']);
    const second = await run(['q_leaving', 'q_leaving'], first.state);
    expect(first.completedQuestIds).toEqual(['q_leaving']);
    expect(second.completedQuestIds).toEqual([]);
    expect(second.state.quests.filter((q) => q.questId === 'q_leaving')).toHaveLength(1);
  });
});

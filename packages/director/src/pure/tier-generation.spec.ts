import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { QUALITY_TIERS } from '@plotbreak/contracts';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { runTurnPure } from './runtime.js';
import type { ModelGateway } from '../gateway/types.js';

/**
 * What the tier is allowed to change, and what it must not.
 *
 * A cheaper turn may be shorter and less considered. It may not see less of
 * the story, lose its speakers, or become a different game.
 */
const state = (): GameState =>
  createInitialState({
    sessionId: 'tier-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

/** Captures exactly what the gateway was asked for. */
function recording() {
  const calls: any[] = [];
  const gateway = {
    name: 'recording',
    async generateStructured(_r: unknown, _s: unknown, messages: readonly { role: string; content: string }[], opts: any) {
      calls.push({ messages: messages.map((m) => ({ role: m.role, content: m.content })), opts });
      return {
        value: {
          narrative: [{ speaker: 'sabo', text: 'Fine.' }],
          locationId: 'mt_colubo', presentCharacterIds: ['sabo'],
          sceneSummary: 'x', sceneStatus: 'live', suggestedResponses: ['I go.', 'I wait.'],
          timeAdvance: { amount: 5, unit: 'minutes', phrase: null },
          reaction: null, heroImage: null,
        },
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: opts?.model ?? 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
    streamText: () => { throw new Error('unused'); },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
  return { gateway, calls };
}

const runTier = async (tier: 'QUICK' | 'VIVID' | 'CINEMATIC' | 'APEX', rendered: any[] = []) => {
  const { gateway, calls } = recording();
  const p = QUALITY_TIERS[tier];
  const result = await runTurnPure({
    gateway, story: ACE, state: state(), recentTurns: [], rendered,
    shape: 'append', actionText: 'I go on.', turnId: 't',
    model: p.model, reasoningEffort: p.reasoningEffort, wordTarget: p.words, maxTokens: p.maxOutputTokens,
  });
  return { result, call: calls[0] };
};

describe('tier generation', () => {
  it('sends each tier to its own model and effort', async () => {
    for (const tier of ['QUICK', 'VIVID', 'CINEMATIC', 'APEX'] as const) {
      const { call } = await runTier(tier);
      expect(call.opts.model).toBe(QUALITY_TIERS[tier].model);
      expect(call.opts.reasoningEffort).toBe(QUALITY_TIERS[tier].reasoningEffort);
      expect(call.opts.maxTokens).toBe(QUALITY_TIERS[tier].maxOutputTokens);
    }
  });

  it('gives the cheapest tier exactly as much story as the dearest', async () => {
    // The whole point: Quick is shorter, not forgetful.
    const history = Array.from({ length: 6 }, (_, i) => ({
      user: `turn ${i}`, assistant: `beat ${i}`,
    }));
    const quick = await runTier('QUICK', history);
    const apex = await runTier('APEX', history);
    const historyOf = (call: any) => call.messages.filter((m: any) => m.role === 'assistant').length;
    expect(historyOf(quick.call)).toBe(6);
    expect(historyOf(apex.call)).toBe(historyOf(quick.call));
  });

  it('keeps the world header identical across tiers, so the cache is shared', async () => {
    const quick = await runTier('QUICK');
    const apex = await runTier('APEX');
    const header = (call: any) => call.messages.filter((m: any) => m.role === 'system').map((m: any) => m.content);
    expect(header(quick.call)).toEqual(header(apex.call));
  });

  it('puts the word target in this turn only, never in the replayed history', async () => {
    const history = [{ user: 'earlier turn', assistant: 'earlier beat' }];
    const { call } = await runTier('APEX', history);
    const users = call.messages.filter((m: any) => m.role === 'user');
    // The newest message carries it; the replayed one is untouched.
    expect(users.at(-1)!.content).toMatch(/roughly 250-450 words/);
    expect(users[0]!.content).toBe('earlier turn');
  });

  it('produces the same shape of turn on every tier', async () => {
    for (const tier of ['QUICK', 'VIVID', 'CINEMATIC', 'APEX'] as const) {
      const { result } = await runTier(tier);
      expect(result.blocks[0]!.speakerId).toBe('sabo');
      expect(result.suggestions).toHaveLength(2);
      expect(result.sceneStatus).toBe('live');
      expect(result.endStatePrompt).toMatch(/Day 1/);
    }
  });

  it('changing tier does not rewrite a single historical message', async () => {
    const history = [{ user: 'turn 0', assistant: 'beat 0' }];
    const before = JSON.parse(JSON.stringify(history));
    await runTier('QUICK', history);
    await runTier('APEX', history);
    expect(history).toEqual(before);
  });
});

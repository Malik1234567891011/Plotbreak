import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { runTurnPure } from './runtime.js';
import type { ModelGateway } from '../gateway/types.js';

const TURN = {
  narrative: [
    { speaker: 'narration', text: 'You come down the slope with the pipe across your shoulders.' },
    { speaker: 'sabo', text: 'He said "wait", which you did not.' },
    { speaker: 'luffy', text: 'I kept up! Mostly!' },
  ],
  locationId: 'mt_colubo',
  presentCharacterIds: ['sabo', 'luffy'],
  sceneSummary: 'Down the slope.',
  sceneStatus: 'live' as const,
  suggestedResponses: ['I keep walking.', 'I wait for him.'],
  timeAdvance: { amount: 8, unit: 'minutes' as const, phrase: null },
  reaction: { characterId: 'sabo', emotion: 'amused' as const },
};

const state = (): GameState =>
  createInitialState({
    sessionId: 'streaming-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

/** Streams the document in `size` slices when asked to, like the provider does. */
function gateway(options: { chunk?: number; stopAfter?: number } = {}): ModelGateway {
  return {
    name: 'stub',
    async generateStructured(_role: unknown, _schema: unknown, _messages: unknown, opts: any) {
      if (opts?.onTextDelta) {
        const doc = JSON.stringify(TURN);
        const size = options.chunk ?? 9;
        for (let i = 0; i < doc.length; i += size) {
          if (options.stopAfter !== undefined && i >= options.stopAfter) break;
          opts.onTextDelta(doc.slice(i, i + size));
        }
      }
      return {
        value: TURN,
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
    streamText: () => { throw new Error('unused'); },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

const run = (gw: ModelGateway, streamed: unknown[] | null) =>
  runTurnPure({
    gateway: gw, story: ACE, state: state(), recentTurns: [], rendered: [],
    shape: 'append', actionText: 'I head down.', turnId: 't',
    ...(streamed ? { onBlock: (b: unknown) => { streamed.push(b); } } : {}),
  });

describe('streamed turns', () => {
  it('delivers every block live, and the finished turn adds none of them again', async () => {
    const streamed: any[] = [];
    const result = await run(gateway(), streamed);
    // What the player saw live is exactly a prefix of the committed turn, so
    // the server can send the remainder as a plain slice.
    expect(streamed).toEqual(result.blocks.slice(0, streamed.length));
    expect(streamed).toHaveLength(result.blocks.length);
    // and nothing is left over to re-send.
    expect(result.blocks.slice(streamed.length)).toEqual([]);
  });

  it('produces byte-identical persisted history whether or not it streamed', async () => {
    // The cache economics depend on this: one model turn is one user record and
    // one canonical assistant record, no matter how the UI learned about it.
    const streamedRun = await run(gateway(), []);
    const plainRun = await run(gateway(), null);
    expect(streamedRun.rendered).toEqual(plainRun.rendered);
    expect(streamedRun.blocks).toEqual(plainRun.blocks);
    expect(streamedRun.endStatePrompt).toBe(plainRun.endStatePrompt);
  });

  it('falls back to the completed document when the stream is cut short', async () => {
    const streamed: any[] = [];
    // Cut off partway: some blocks arrive live, the rest cannot.
    const result = await run(gateway({ stopAfter: 120 }), streamed);
    expect(streamed.length).toBeLessThan(result.blocks.length);
    // The turn is still whole, and the remainder is exactly what was missed.
    expect(result.blocks).toHaveLength(3);
    expect(result.blocks.slice(0, streamed.length)).toEqual(streamed);
  });

  it('survives a listener that throws without losing the turn', async () => {
    const result = await runTurnPure({
      gateway: gateway(), story: ACE, state: state(), recentTurns: [], rendered: [],
      shape: 'append', actionText: 'I head down.', turnId: 't',
      onBlock: () => { throw new Error('client blew up'); },
    });
    expect(result.blocks).toHaveLength(3);
  });

  it('streams the same blocks regardless of how the provider chunks them', async () => {
    const fine: any[] = [];
    const coarse: any[] = [];
    await run(gateway({ chunk: 1 }), fine);
    await run(gateway({ chunk: 4096 }), coarse);
    expect(fine).toEqual(coarse);
  });
});

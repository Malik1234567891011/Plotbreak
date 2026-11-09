import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState, StoryVersion } from '@plotbreak/contracts';
import { runTurnPure } from './runtime.js';
import { earlyReaction, PURE_CONSTITUTION } from './narrator.js';
import type { ModelGateway } from '../gateway/types.js';
import { PROSE_WEBNOVEL } from './webnovel.js';

const WEBNOVEL: StoryVersion = { ...ACE, rules: { ...ACE.rules, proseStyle: 'webnovel' } };

/** The finished document. Field order is what the stub streams. */
const doc = (reaction: unknown, reactionFirst: boolean) => {
  const rest = {
    narrative: [
      { speaker: 'narration', text: 'You come down the slope.' },
      { speaker: 'sabo', text: 'Took you long enough.' },
    ],
    locationId: 'mt_colubo',
    presentCharacterIds: ['luffy'],
    sceneSummary: 'Down the slope.',
    sceneStatus: 'live' as const,
    suggestedResponses: ['I keep walking.', 'I wait for him.'],
    timeAdvance: { amount: 8, unit: 'minutes' as const, phrase: null },
  };
  return reactionFirst ? { reaction, ...rest } : { ...rest, reaction };
};

const state = (): GameState =>
  createInitialState({
    sessionId: 'webnovel-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  });

interface Seen { messages: Array<{ role: string; content: string }>; schemaKeys: string[] }

function gateway(value: Record<string, unknown>, seen: Seen, order: string[]): ModelGateway {
  return {
    name: 'stub',
    async generateStructured(_role: unknown, schema: any, messages: any, opts: any) {
      seen.messages = messages;
      seen.schemaKeys = Object.keys(schema.shape);
      if (opts?.onTextDelta) {
        const text = JSON.stringify(value);
        for (let i = 0; i < text.length; i += 7) {
          opts.onTextDelta(text.slice(i, i + 7));
          // Marks the moment the first prose has been streamed.
          if (text.slice(0, i + 7).includes('You come down') && !order.includes('prose')) order.push('prose');
        }
      }
      return {
        value,
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
    streamText: () => { throw new Error('unused'); },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

describe('webnovel prose style', () => {
  it('leaves a classic story exactly as it was: same constitution, face last, no early face', async () => {
    const seen = { messages: [], schemaKeys: [] } as Seen;
    const faces: unknown[] = [];
    const result = await runTurnPure({
      gateway: gateway(doc({ characterId: 'sabo', emotion: 'amused' }, false), seen, []),
      story: ACE, state: state(), recentTurns: [], rendered: [], shape: 'append',
      actionText: 'I head down.', turnId: 't',
      onReaction: (f) => { faces.push(f); },
    });
    expect(seen.messages[0]!.content.startsWith(PURE_CONSTITUTION)).toBe(true);
    expect(seen.schemaKeys[0]).toBe('narrative');
    expect(faces).toEqual([]);
    expect(result.reactionEarly).toBe(false);
    // Sabo is not present at the end of the beat, so the classic rule drops him.
    expect(result.reaction).toBeNull();
  });

  it('asks for the face first, sends it before any prose, and keeps it as the record', async () => {
    const seen = { messages: [], schemaKeys: [] } as Seen;
    const order: string[] = [];
    const result = await runTurnPure({
      gateway: gateway(doc({ characterId: 'sabo', emotion: 'amused' }, true), seen, order),
      story: WEBNOVEL, state: state(), recentTurns: [], rendered: [], shape: 'append',
      actionText: 'I head down.', turnId: 't',
      onReaction: (f) => { order.push(`face:${f.characterId}/${f.emotion}`); },
      onBlock: () => {},
    });
    expect(seen.schemaKeys[0]).toBe('reaction');
    expect(seen.messages[0]!.content).toContain(PROSE_WEBNOVEL);
    expect(seen.messages[0]!.content).not.toBe(PURE_CONSTITUTION);
    expect(order).toEqual(['face:sabo/amused', 'prose']);
    // Already on screen, so kept even though he is not in presentCharacterIds.
    expect(result.reactionEarly).toBe(true);
    expect(result.reaction).toEqual({ characterId: 'sabo', emotion: 'amused' });
  });

  it('sends nothing for a null face or a name that is not in the cast', async () => {
    for (const reaction of [null, { characterId: 'zoro', emotion: 'angry' }]) {
      const faces: unknown[] = [];
      const result = await runTurnPure({
        gateway: gateway(doc(reaction, true), { messages: [], schemaKeys: [] }, []),
        story: WEBNOVEL, state: state(), recentTurns: [], rendered: [], shape: 'append',
        actionText: 'I head down.', turnId: 't',
        onReaction: (f) => { faces.push(f); },
      });
      expect(faces).toEqual([]);
      expect(result.reaction).toBeNull();
      expect(result.reactionEarly).toBe(false);
    }
  });
});

describe('earlyReaction', () => {
  it('waits for the object to close, then reads it', () => {
    expect(earlyReaction('{"reaction":{"characterId":"so')).toBeUndefined();
    expect(earlyReaction('{"reaction":{"characterId":"sora","emotion":"warm"},"narr')).toEqual({ characterId: 'sora', emotion: 'warm' });
    expect(earlyReaction('{"reaction": null, "narrative"')).toBeNull();
  });
});

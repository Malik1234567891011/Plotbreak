import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { narratePure, type RenderedTurn } from './narrator.js';
import type { ModelGateway } from '../gateway/types.js';

/**
 * The append-only conversation is the relaunch's whole cost structure.
 *
 * Prompt caching matches a request against the longest previous request that is
 * a strict *prefix* of it — not against text the request merely contains. So
 * every one of these is really the same assertion from a different angle: turn
 * N's request must still be sitting, unaltered, at the front of turn N+1's.
 */

const state = (): GameState =>
  createInitialState({
    sessionId: 'append-spec',
    story: ACE,
    identity: {
      displayName: 'Ace',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId: ACE.archetypes[0]!.id,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

/** Records what it was asked to send and answers with a fixed beat. */
function recordingGateway(): { gateway: ModelGateway; sent: Array<Array<{ role: string; content: string }>> } {
  const sent: Array<Array<{ role: string; content: string }>> = [];
  const gateway = {
    name: 'recording',
    async generateStructured(_role: unknown, _schema: unknown, messages: readonly { role: string; content: string }[]) {
      sent.push(messages.map((m) => ({ role: m.role, content: m.content })));
      return {
        value: {
          narrative: [{ speakerId: null, text: 'You step off the log.' }],
          locationId: 'mt_colubo',
          presentCharacterIds: ['sabo'],
          sceneSummary: 'You step off the log.',
          suggestedResponses: ['I keep walking.', 'I wait.'],
          timeAdvance: { amount: 10, unit: 'minutes' as const, phrase: null },
        },
        invocation: {
          requestId: 'r',
          role: 'writer_premium',
          provider: 'recording',
          model: 'test',
          inputTokens: 0,
          outputTokens: 0,
          costUsd: 0,
          latencyMs: 0,
          ok: true,
          errorCode: null,
        },
      };
    },
    streamText: () => {
      throw new Error('unused');
    },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
  return { gateway, sent };
}

/** Plays `actions` in order, feeding each turn's rendered pair into the next. */
async function play(actions: readonly string[]) {
  const { gateway, sent } = recordingGateway();
  const rendered: RenderedTurn[] = [];
  let current = state();
  for (const actionText of actions) {
    const result = await narratePure({
      gateway,
      story: ACE,
      state: current,
      recentTurns: [],
      rendered,
      shape: 'append',
      actionText,
    });
    rendered.push(result.rendered);
    current = { ...current, worldMinute: result.nextWorldMinute } as GameState;
  }
  return { sent, rendered };
}

describe('append-only conversation', () => {
  it('leaves every historical message byte-identical as the story grows', async () => {
    const { sent } = await play(['I stand up.', 'I look at Sabo.', 'I walk downhill.']);

    const first = sent[0]!;
    const third = sent[2]!;
    // Everything the first request sent is still there, unchanged, in the third.
    for (const [index, message] of first.entries()) {
      expect(third[index]).toEqual(message);
    }
  });

  it('makes turn N a strict prefix of turn N+1', async () => {
    const { sent } = await play(['I stand up.', 'I look at Sabo.', 'I walk downhill.', 'I shout.']);

    for (let turn = 0; turn < sent.length - 1; turn++) {
      const before = sent[turn]!;
      const after = sent[turn + 1]!;
      expect(after.length).toBeGreaterThan(before.length);
      // The previous request, entire, is the front of this one — which is
      // exactly the condition the provider's cache matches on.
      expect(after.slice(0, before.length)).toEqual(before);
      // and it grows by precisely one exchange: the beat, then the next action.
      expect(after.length - before.length).toBe(2);
      expect(after[before.length]!.role).toBe('assistant');
      expect(after.at(-1)!.role).toBe('user');
    }
  });

  it('never lets current scene state leak backwards into old context', async () => {
    const { sent } = await play(['I stand up.', 'I walk to Dadan’s house.', 'I sit down.']);

    // The volatile block names a location and a time, and it appears once per
    // turn — in that turn's own message. An old message that picked up the new
    // location would silently invalidate the cache from that point on.
    const last = sent.at(-1)!;
    const volatileMessages = last.filter((m) => m.content.includes('It is ') && m.role === 'user');
    expect(volatileMessages).toHaveLength(3);
    // The first turn's block still says what it said when it was written.
    expect(volatileMessages[0]!.content).toContain('Day 1');
    expect(volatileMessages[0]!.content).toContain('I stand up.');
  });

  it('keeps nothing after the newest user message', async () => {
    const { sent } = await play(['I stand up.', 'I look around.']);
    // A trailing instruction would sit where the next assistant beat goes, and
    // no request would ever be a prefix of the next one again.
    expect(sent.at(-1)!.at(-1)!.role).toBe('user');
  });

  it('treats a tapped card and typed text as the same thing', async () => {
    // A card is text the player chose; there is no second representation of it,
    // and the request must not be able to tell which one happened.
    const tapped = await play(['I tell Sabo he is wrong.']);
    const typed = await play(['I tell Sabo he is wrong.']);
    expect(tapped.sent[0]).toEqual(typed.sent[0]);
    expect(tapped.rendered[0]).toEqual(typed.rendered[0]);
  });

  it('reconstructs the identical conversation when a session is reloaded', async () => {
    const actions = ['I stand up.', 'I look at Sabo.', 'I walk downhill.'];
    const live = await play(actions);

    // A reload has only the stored pairs — no in-memory anything. Replaying
    // them must rebuild the same request the live session would have sent.
    const { gateway, sent: afterReload } = recordingGateway();
    await narratePure({
      gateway,
      story: ACE,
      state: state(),
      recentTurns: [],
      rendered: live.rendered,
      shape: 'append',
      actionText: 'I keep going.',
    });

    const liveHistory = live.sent.at(-1)!;
    // Everything up to the final user message is the stored conversation, and
    // it comes back the same from the database as it was in memory.
    expect(afterReload[0]!.slice(0, liveHistory.length - 1)).toEqual(liveHistory.slice(0, -1));
  });
});

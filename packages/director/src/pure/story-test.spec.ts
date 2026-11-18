import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import type { ModelGateway } from '../gateway/types.js';
import { narratePure } from './narrator.js';
import { PRESSURE_MARKER, pressureFor, pressureNote, shouldPush } from './pressure.js';
import {
  CONTROL_ARM,
  PLAYER_FIRST_BRIEF,
  PUSH_CADENCE,
  SOMETHING_HAPPENS_BRIEF,
  storyTestBrief,
} from './story-test.js';

const TURN = {
  narrative: [{ speaker: 'narration', text: 'You head down.' }],
  locationId: ACE.locations[0]!.id,
  presentCharacterIds: [],
  sceneSummary: 'x',
  sceneStatus: 'live' as const,
  suggestedResponses: ['a', 'b', 'c'],
};

const state = (turnIndex = 0): GameState => ({
  ...createInitialState({
    sessionId: 'story-test-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  }),
  turnIndex,
}) as GameState;

/** Records the messages each call was sent. */
function recording(): { gateway: ModelGateway; sent: Array<Array<{ role: string; content: string }>> } {
  const sent: Array<Array<{ role: string; content: string }>> = [];
  const gateway = {
    name: 'stub',
    async generateStructured(_role: unknown, _schema: unknown, messages: any) {
      sent.push(messages);
      return {
        value: TURN,
        invocation: { requestId: 'r', role: 'writer_premium', provider: 'stub', model: 'stub',
          inputTokens: 0, outputTokens: 0, costUsd: 0, latencyMs: 0, ok: true, errorCode: null },
      };
    },
  } as unknown as ModelGateway;
  return { gateway, sent };
}

const narrate = (gateway: ModelGateway, storyTest?: typeof CONTROL_ARM, shape: 'append' | 'rebuilt' = 'append') =>
  narratePure({ gateway, story: ACE, state: state(), recentTurns: [], rendered: [], shape, actionText: 'I head down.', storyTest });

describe('storyteller test', () => {
  it('leaves the control prompt byte-identical to no test at all', async () => {
    for (const shape of ['append', 'rebuilt'] as const) {
      const a = recording();
      const b = recording();
      await narrate(a.gateway, undefined, shape);
      await narrate(b.gateway, CONTROL_ARM, shape);
      expect(b.sent).toEqual(a.sent);
      expect(storyTestBrief(CONTROL_ARM)).toBe('');
    }
  });

  it('puts each half last in the first system message, and only that half', async () => {
    for (const [arm, has, hasNot] of [
      [{ yes: true, push: false }, [PLAYER_FIRST_BRIEF], [SOMETHING_HAPPENS_BRIEF]],
      [{ yes: false, push: true }, [SOMETHING_HAPPENS_BRIEF], [PLAYER_FIRST_BRIEF]],
      [{ yes: true, push: true }, [PLAYER_FIRST_BRIEF, SOMETHING_HAPPENS_BRIEF], []],
    ] as const) {
      const r = recording();
      await narrate(r.gateway, arm);
      const system = r.sent[0]![0]!.content;
      for (const text of has) expect(system).toContain(text);
      for (const text of hasNot) expect(system).not.toContain(text);
      expect(system.endsWith(has[has.length - 1]!)).toBe(true);
      // Nothing else moves: the world brief and the player's turn are untouched.
      const control = recording();
      await narrate(control.gateway, CONTROL_ARM);
      expect(r.sent[0]!.slice(1)).toEqual(control.sent[0]!.slice(1));
    }
  });

  it('brings the first push forward to turn 5 and repeats it every 6 beats on the push half', () => {
    const base = { arcsClosed: 0, arcClosing: false, threadCount: 3 };
    const users = (n: number, pushedAt = -1) =>
      Array.from({ length: n }, (_, i) => (i === pushedAt ? `x ${PRESSURE_MARKER}` : 'x'));
    expect(shouldPush({ ...base, priorUsers: users(4), sessionTurn: 4, cadence: PUSH_CADENCE })).toBe(false);
    expect(shouldPush({ ...base, priorUsers: users(5), sessionTurn: 5, cadence: PUSH_CADENCE })).toBe(true);
    expect(shouldPush({ ...base, priorUsers: users(10, 5), sessionTurn: 10, cadence: PUSH_CADENCE })).toBe(false);
    expect(shouldPush({ ...base, priorUsers: users(11, 5), sessionTurn: 11, cadence: PUSH_CADENCE })).toBe(true);
    // Everybody else keeps turn 40.
    expect(shouldPush({ ...base, priorUsers: users(5), sessionTurn: 5 })).toBe(false);
  });

  it('pushes on turn 5 only for the push half, and drops the refusal line only for the yes half', () => {
    const priorUsers = Array.from({ length: 5 }, () => 'x');
    const at = (storyTest?: { yes: boolean; push: boolean }) =>
      pressureFor({ story: ACE, state: state(5), arcs: [], priorUsers, arcClosing: false, storyTest });
    expect(at()).toBeNull();
    expect(at(CONTROL_ARM)).toBeNull();
    expect(at({ yes: true, push: false })).toBeNull();
    expect(at({ yes: false, push: true })).toContain('a refusal is still a refusal');
    const both = at({ yes: true, push: true })!;
    expect(both).toContain(PRESSURE_MARKER);
    expect(both).not.toContain('refusal');
    // The default note is the note it always was.
    expect(pressureNote('t')).toBe(pressureNote('t', { yes: false }));
  });
});

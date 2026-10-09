import { afterEach, describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState, StoryArc } from '@plotbreak/contracts';
import {
  PRESSURE_MARKER,
  chooseThread,
  openThreads,
  pressureFor,
  pressureNote,
  shouldPush,
} from './pressure.js';

const state = (turnIndex = 0): GameState => ({
  ...createInitialState({
    sessionId: 'pressure-spec',
    story: ACE,
    identity: { displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null },
  }),
  turnIndex,
}) as GameState;

const arc = (open: string[], index = 1): StoryArc => ({
  arcIndex: index, title: 'x', recap: 'x', fromTurn: 0, toTurn: 100,
  carried: { standing: [], bonds: [], established: [], open },
}) as StoryArc;

/** `n` ordinary user turns, with pushes at the given positions. */
const users = (n: number, pushedAt: Record<number, string> = {}) =>
  Array.from({ length: n }, (_, i) => (pushedAt[i] ? `action ${i}\n${pressureNote(pushedAt[i]!)}` : `action ${i}`));

const base = { arcsClosed: 0, sessionTurn: 100, arcClosing: false, threadCount: 3 };

afterEach(() => {
  delete process.env.PLOTBREAK_PRESSURE_EVERY;
  delete process.env.PLOTBREAK_PRESSURE_FIRST;
  delete process.env.PLOTBREAK_PRESSURE_AFTER_BREAK;
});

describe('when to push', () => {
  it('never pushes in the opening stretch of a session', () => {
    expect(shouldPush({ ...base, priorUsers: users(10), sessionTurn: 11 })).toBe(false);
    expect(shouldPush({ ...base, priorUsers: users(39), sessionTurn: 40 })).toBe(false);
  });

  it('pushes once a session is deep enough and nothing has been pushed', () => {
    expect(shouldPush({ ...base, priorUsers: users(40), sessionTurn: 41 })).toBe(true);
  });

  it('waits the full cadence after the last push, then pushes again', () => {
    const pushed = users(60, { 40: 'a thread' });
    expect(shouldPush({ ...base, priorUsers: pushed.slice(0, 50), sessionTurn: 51 })).toBe(false);
    expect(shouldPush({ ...base, priorUsers: pushed.slice(0, 64), sessionTurn: 65 })).toBe(false);
    const later = users(65, { 40: 'a thread' });
    expect(shouldPush({ ...base, priorUsers: later, sessionTurn: 66 })).toBe(true);
  });

  it('pushes early in a new arc, because a break starts from a resting point', () => {
    const after = { ...base, arcsClosed: 1, sessionTurn: 500 };
    expect(shouldPush({ ...after, priorUsers: users(0) })).toBe(false);
    expect(shouldPush({ ...after, priorUsers: users(2) })).toBe(false);
    expect(shouldPush({ ...after, priorUsers: users(3) })).toBe(true);
  });

  it('never pushes while an arc is winding down — the two notes would fight', () => {
    expect(shouldPush({ ...base, priorUsers: users(80), arcClosing: true })).toBe(false);
  });

  it('never pushes with nothing to push', () => {
    expect(shouldPush({ ...base, priorUsers: users(80), threadCount: 0 })).toBe(false);
  });

  it('turns off entirely at zero', () => {
    process.env.PLOTBREAK_PRESSURE_EVERY = '0';
    expect(shouldPush({ ...base, priorUsers: users(200) })).toBe(false);
  });

  it('reads the cadence per call', () => {
    process.env.PLOTBREAK_PRESSURE_EVERY = '5';
    expect(shouldPush({ ...base, priorUsers: users(46, { 40: 't' }) })).toBe(true);
  });
});

describe('which thread', () => {
  it('starts with the first thread the story recorded', () => {
    expect(chooseThread(['a', 'b', 'c'], users(50))).toBe('a');
  });

  it('rotates to the least recently pushed', () => {
    expect(chooseThread(['a', 'b', 'c'], users(80, { 10: 'a' }))).toBe('b');
    expect(chooseThread(['a', 'b', 'c'], users(80, { 10: 'a', 40: 'b' }))).toBe('c');
    expect(chooseThread(['a', 'b', 'c'], users(80, { 10: 'a', 40: 'b', 70: 'c' }))).toBe('a');
  });

  it('does not count a thread as pushed because the player happened to quote it', () => {
    expect(chooseThread(['a', 'b'], ['I ask about "a"'])).toBe('a');
  });
});

describe('where threads come from', () => {
  it("uses the last closed arc's open threads when there is one", () => {
    expect(openThreads(ACE, state(), [arc(['old']), arc(['eli is missing', 'the barrels'], 2)])).toEqual([
      'eli is missing', 'the barrels',
    ]);
  });

  it("falls back to the story's unfinished threads before any arc has closed", () => {
    const threads = openThreads(ACE, state(), []);
    expect(threads.length).toBe(ACE.quests.length);
    expect(threads[0]).toContain(ACE.quests[0]!.title);
  });

  it('leaves out a thread this run has already finished', () => {
    const done = { ...state(), quests: [{ questId: ACE.quests[0]!.id, status: 'COMPLETED' as const,
      currentStepId: null, completedStepIds: [], startedAtWorldMinute: null }] } as GameState;
    expect(openThreads(ACE, done, []).some((t) => t.startsWith(ACE.quests[0]!.title))).toBe(false);
  });

  it('clips a paragraph-long thread so the note stays a note', () => {
    const [only] = openThreads(ACE, state(), [arc(['word '.repeat(200)])]);
    expect(only!.length).toBeLessThanOrEqual(301);
  });
});

describe('the whole decision', () => {
  it('produces a note naming the thread, with the marker the next turn looks for', () => {
    const note = pressureFor({ story: ACE, state: state(500), arcs: [arc(['Eli is missing'])],
      priorUsers: users(3), arcClosing: false });
    expect(note).toContain(PRESSURE_MARKER);
    expect(note).toContain('"Eli is missing"');
    expect(note).toContain('leave it for now');
  });

  it('produces nothing on an ordinary turn', () => {
    expect(pressureFor({ story: ACE, state: state(5), arcs: [], priorUsers: users(5), arcClosing: false })).toBeNull();
  });

  it('is found again by the next turn, so the cadence holds across real history', () => {
    const history = users(41);
    const note = pressureFor({ story: ACE, state: state(41), arcs: [], priorUsers: history, arcClosing: false });
    expect(note).not.toBeNull();
    const next = [...history, `action 41\n${note}`];
    expect(pressureFor({ story: ACE, state: state(42), arcs: [], priorUsers: next, arcClosing: false })).toBeNull();
  });
});

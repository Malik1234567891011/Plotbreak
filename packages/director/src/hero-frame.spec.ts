import { describe, expect, it } from 'vitest';
import type { CheckOutcome, MutationType, Resolution } from '@plotbreak/contracts';
import { buildBeats, heroImageDecision } from './director.js';
import type { TurnContext } from './context.js';

/**
 * A romance world that could never show you a picture.
 *
 * Twenty-five turns of Nine Weeks produced two hero frames — turn 1 and turn 10
 * — and none at all in the last fifteen, while the director's own log said
 * things like *"Worth a frame, but only 7 turns since the last one"* and
 * *"Ordinary beat; the persistent stage covers it"* on the turn where the
 * player stood on a bar and silenced a room.
 *
 * The cause was that `notable` was ENCOUNTER_START, QUEST_TRANSITION,
 * CRITICAL_SUCCESS and REVEAL — four combat-and-quest events, none of which a
 * slice-of-life world ever generates. The only remaining road was `landmark`,
 * which in such a world means "a new room" or "a new face", and both run out.
 */

const ctx = (over: {
  tier?: string;
  turnsSinceHeroImage?: number | null;
  mutations?: { type: MutationType }[];
  checks?: { outcome: CheckOutcome }[];
  /** Defaults past the opening window, so the settled rules are the default. */
  turnIndex?: number;
}): TurnContext =>
  ({
    tier: over.tier ?? 'VIVID',
    turnsSinceHeroImage: over.turnsSinceHeroImage ?? 6,
    presentCharacters: [],
    state: { flags: {}, turnIndex: over.turnIndex ?? 40 },
    resolution: {
      mutations: (over.mutations ?? []).map((m) => ({ ...m, reasonCode: 'X' })),
      checks: over.checks ?? [],
    } as unknown as Resolution,
  }) as unknown as TurnContext;

const ordinary = { locationChanged: false, firstVisit: false };

/** Just enough context for `buildBeats` to reach the state-reveal branch. */
const planBeats = (over: Record<string, unknown>) =>
  buildBeats(
    {
      story: { rules: { toneGuide: '' } },
      toneGuide: 'Warm, funny, slightly sunburnt.',
      scene: { locationName: 'The Longhouse Bar', dayPart: 'EVENING' },
      presentCharacters: [],
      quests: [],
      reveals: [],
      state: { flags: {} },
      ...over,
    } as unknown as TurnContext,
    'DIALOGUE',
    [],
  );

describe('a conversation world earning a frame', () => {
  it('gives a frame when somebody’s feeling about you changes', () => {
    const decision = heroImageDecision(
      ctx({ mutations: [{ type: 'RELATIONSHIP_DELTA' }] }),
      'DIALOGUE',
      ordinary,
    );
    expect(decision.eligible).toBe(true);
  });

  it('gives a frame when somebody refuses you — the world’s promised "real rejection"', () => {
    expect(heroImageDecision(ctx({ checks: [{ outcome: 'FAILURE' }] }), 'DIALOGUE', ordinary).eligible).toBe(true);
  });

  it('gives a frame when the stage is about to change a face', () => {
    expect(
      heroImageDecision(ctx({}), 'DIALOGUE', ordinary, { juno: 'delighted' }).eligible,
    ).toBe(true);
  });

  it('still says no to a genuinely flat beat', () => {
    const decision = heroImageDecision(ctx({}), 'DIALOGUE', ordinary, { juno: 'neutral' });
    expect(decision.eligible).toBe(false);
    expect(decision.reason).toMatch(/ordinary/i);
  });

  it('still spaces frames out, so they keep meaning something', () => {
    const justHadOne = ctx({
      turnsSinceHeroImage: 1,
      mutations: [{ type: 'RELATIONSHIP_DELTA' }],
    });
    expect(heroImageDecision(justHadOne, 'DIALOGUE', ordinary).eligible).toBe(false);
  });

  it('does not make the default tier wait ten turns any more', () => {
    const fiveTurnsOn = ctx({
      tier: 'VIVID',
      turnsSinceHeroImage: 5,
      mutations: [{ type: 'RELATIONSHIP_DELTA' }],
    });
    expect(heroImageDecision(fiveTurnsOn, 'DIALOGUE', ordinary).eligible).toBe(true);
  });
});

/**
 * The stamina tic.
 *
 * `buildBeats` emitted a `STATE_REVEAL` for every `RESOURCE_DELTA` with the
 * instruction *"Let the change be felt physically. The chip in the UI states
 * the number; the prose states the cost."* Six beats in a 25-turn romance run
 * spent their closing paragraph on being tired, twice in nearly the same words
 * on consecutive turns, because the writer was doing what it was told. The chip
 * the instruction promised had also been removed, so nothing stated the number.
 */
describe('when a resource change is worth a sentence', () => {
  const beats = (current: number, max: number, amount: number, polarity = 'GOOD_HIGH') =>
    planBeats({
      player: { resources: [{ id: 'energy', name: 'Energy', current, max, polarity }] },
      resolution: {
        observableFacts: [],
        privateFacts: [],
        mutations: [
          {
            mutationId: 'm1',
            type: 'RESOURCE_DELTA',
            subjectId: 'player',
            reasonCode: 'PARTIAL:interact',
            payload: { resourceId: 'energy', amount },
          },
        ],
        checks: [],
      },
    });

  it('says nothing about two points of energy off a full bar', () => {
    expect(beats(18, 20, -2).some((b) => b.kind === 'STATE_REVEAL')).toBe(false);
  });

  it('says something when the bar is nearly out, because that constrains the next move', () => {
    const reveal = beats(4, 20, -2).find((b) => b.kind === 'STATE_REVEAL');
    expect(reveal).toBeDefined();
    expect(reveal!.instruction).toMatch(/one clause/i);
    expect(reveal!.instruction).not.toMatch(/felt physically/i);
  });

  it('never tells the player they are running low on a bad-is-high resource', () => {
    expect(beats(1, 20, -2, 'GOOD_LOW').some((b) => b.kind === 'STATE_REVEAL')).toBe(false);
  });

  it('still announces an item the player gained', () => {
    const found = planBeats({
      player: { resources: [] },
      resolution: {
        observableFacts: [],
        privateFacts: [],
        mutations: [
          { mutationId: 'm2', type: 'ITEM_ADD', subjectId: 'player', reasonCode: 'X', payload: {} },
        ],
        checks: [],
      },
    });
    expect(found.some((b) => b.kind === 'STATE_REVEAL')).toBe(true);
  });
});

/**
 * The opening is heavier, and only the opening.
 *
 * A real five-turn session produced one frame: turn 1 earned it, turn 2 hit
 * the floor, and turns 3 and 4 both came back "worth a frame, but only 2 / 3
 * turns since the last one" — two beats that had earned art and were refused
 * in the five turns that decide whether somebody keeps playing.
 *
 * What changed is the waiting, not the earning. These hold both halves of
 * that: an earned beat is not made to wait during the opening, and an
 * unearned one still gets nothing.
 */
describe('the first ten turns', () => {
  const earned = { mutations: [{ type: 'RELATIONSHIP_DELTA' as MutationType }] };

  it('does not make an earned beat wait', () => {
    // One turn after the last frame, which the settled rules refuse outright.
    const opening = heroImageDecision(ctx({ ...earned, turnIndex: 3, turnsSinceHeroImage: 1 }), 'DIALOGUE', ordinary);
    expect(opening.eligible, opening.reason).toBe(true);
  });

  it('still refuses an ordinary beat, so nothing random appears', () => {
    // No relationship move, no failed check, no new room, no new face.
    const decision = heroImageDecision(ctx({ turnIndex: 2, turnsSinceHeroImage: 1 }), 'DIALOGUE', ordinary);
    expect(decision.eligible).toBe(false);
    expect(decision.reason).toMatch(/ordinary beat/i);
  });

  it('lets a landmark through on consecutive turns', () => {
    // The settled floor is 2, so a first visit one turn after a frame is
    // normally refused. In an opening it is the whole point.
    const decision = heroImageDecision(
      ctx({ turnIndex: 1, turnsSinceHeroImage: 1 }),
      'DIALOGUE',
      { locationChanged: true, firstVisit: true },
    );
    expect(decision.eligible, decision.reason).toBe(true);
  });

  it('hands back to the tier spacing once the opening is over', () => {
    const justInside = heroImageDecision(ctx({ ...earned, turnIndex: 9, turnsSinceHeroImage: 1 }), 'DIALOGUE', ordinary);
    const justOutside = heroImageDecision(ctx({ ...earned, turnIndex: 10, turnsSinceHeroImage: 1 }), 'DIALOGUE', ordinary);
    expect(justInside.eligible, 'turn 9 should still be an opening turn').toBe(true);
    expect(justOutside.eligible, 'turn 10 should be back to VIVID spacing').toBe(false);
    expect(justOutside.reason).toMatch(/a moment ago|only 1 turns/i);
  });

  it('is measured in turns played, not in frames delivered', () => {
    // A player who reached turn 30 is past the opening even if the world has
    // shown them almost nothing, because the opening is about the beginning
    // of the story rather than about topping up a quota.
    const late = heroImageDecision(ctx({ ...earned, turnIndex: 30, turnsSinceHeroImage: 1 }), 'DIALOGUE', ordinary);
    expect(late.eligible).toBe(false);
  });
});

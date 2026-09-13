import type { GameState, StateMutation, TurnRecord } from '@plotbreak/contracts';
import { lexicalSimilarity } from './memory.js';

/**
 * Whether anything has actually happened lately.
 *
 * Measured on the twenty-turn Ace transcript: **twenty turns, one location,
 * and 115 minutes of world time** — every turn cost exactly six. Ace's first
 * authored world event lands at world minute 1920, which at six minutes a turn
 * is about three hundred turns away, so nothing outside the clearing could
 * ever arrive. The scene was sealed. Three boys stood on the same mountain
 * having variations of the same argument, and the only thing that changed was
 * which variation.
 *
 * That is not a writing fault and it is not a world fault. Ace's mountain is
 * where the story starts and a fight does take minutes. It is a missing
 * measurement: nothing anywhere could see that the dramatic question had been
 * asked and answered four turns ago, so nothing could press.
 *
 * This is the measurement. What to do about it belongs to the director and the
 * writer, who are told; the engine does not get to decide that a scene is over.
 */

export interface SceneProgress {
  /**
   * Where the last beat left things, in the writer's own words.
   *
   * `endStatePrompt` is the one sentence a beat writes about what is now
   * hanging, so it is the closest thing the engine has to a register of the
   * foreground situation — and it costs nothing, because it is already
   * written and already stored.
   */
  readonly openSituation: string | null;
  /**
   * How many consecutive recent beats have restated the same situation
   * instead of moving it.
   *
   * The forty-turn Ace run exposed a subtler loop than the first one. Gray
   * Terminal introduced a blocked shortcut with two older boys controlling it,
   * Sabo laid out four options, and the story then drifted onto ships and
   * freedom and the wall while the boys evaporated. Nothing was repeated
   * word-for-word and nothing was in one place too long, so neither existing
   * counter saw it: what repeated was the *subject*.
   */
  readonly turnsSituationUnchanged: number;
  /** Consecutive recent turns spent in the location the player is in now. */
  readonly turnsHere: number;
  /** Turns since anything the player could point at changed. */
  readonly turnsSinceSomethingChanged: number;
  /**
   * The dramatic question has been asked and answered and is still being
   * asked. Both counters, because either alone is normal: a long conversation
   * in one room is a scene, and a quiet turn between two loud ones is pacing.
   */
  readonly stalled: boolean;
}

const STALE_TURNS_IN_PLACE = 6;
const STALE_TURNS_WITHOUT_CHANGE = 4;

/**
 * How alike two statements of where a beat left things have to be before the
 * story is going round rather than forward.
 *
 * The same threshold the card filter uses across turns, and for the same
 * reason: measured on real output, paraphrase of the same idea sits above it
 * and genuinely different ideas sit well below.
 */
const SAME_SITUATION = 0.4;
/**
 * Two *restatements*, which is three beats on the same thing — the count is of
 * beats that repeated the one before, so the first statement is not a repeat.
 * Three is where the brief puts it and where the Gray Terminal drift became
 * obvious to read.
 */
const STALE_TURNS_ON_ONE_QUESTION = 2;

/**
 * Flags that record that somebody was spoken to or seen, which every turn
 * with a person in it produces. They are how the world remembers a
 * conversation, not evidence that the conversation went anywhere.
 */
const CHATTER = /^(?:heard|spoke|met|mentioned|inspected):/;

function changesSomething(mutations: readonly StateMutation[]): boolean {
  return mutations.some((mutation) => {
    switch (mutation.type) {
      case 'FLAG_SET': {
        const flag = String((mutation.payload as { flag?: unknown }).flag ?? '');
        return flag.length > 0 && !CHATTER.test(flag);
      }
      case 'TIME_ADVANCE':
      case 'RELATIONSHIP_DELTA':
      case 'RESOURCE_DELTA':
      case 'ENCOUNTER_UPDATE':
        // Real, and not the same as the scene moving. A relationship sliding
        // two points while three people stand in a clearing is exactly the
        // state this is trying to detect, so it does not count as escape.
        return false;
      default:
        return true;
    }
  });
}

/** Where the player was at the end of a turn, if that turn moved them. */
function movedTo(mutations: readonly StateMutation[]): string | null {
  for (const mutation of mutations) {
    if (mutation.type !== 'LOCATION_CHANGE') continue;
    if (mutation.subjectId !== 'player') continue;
    const to = (mutation.payload as { locationId?: unknown }).locationId;
    if (typeof to === 'string') return to;
  }
  return null;
}

export function sceneProgress(
  state: GameState,
  recentTurns: readonly TurnRecord[],
): SceneProgress {
  // Only the last dozen matter; a stall is a recent condition, and a session
  // is not obliged to remember being stuck an hour ago.
  const window = recentTurns.slice(-12);

  let turnsHere = 0;
  for (let i = window.length - 1; i >= 0; i -= 1) {
    const moved = movedTo(window[i]!.mutations ?? []);
    if (moved !== null && moved !== state.player.locationId) break;
    turnsHere += 1;
    if (moved !== null) break;
  }

  let turnsSinceSomethingChanged = 0;
  for (let i = window.length - 1; i >= 0; i -= 1) {
    if (changesSomething(window[i]!.mutations ?? [])) break;
    turnsSinceSomethingChanged += 1;
  }

  // How long the story has been restating the same situation.
  const prompts = window
    .map((t) => t.endStatePrompt ?? '')
    .filter((p) => p.trim().length > 0);
  const openSituation = prompts.at(-1) ?? null;
  let turnsSituationUnchanged = 0;
  if (openSituation) {
    for (let i = prompts.length - 2; i >= 0; i -= 1) {
      if (lexicalSimilarity(openSituation, prompts[i]!) < SAME_SITUATION) break;
      turnsSituationUnchanged += 1;
    }
  }

  return {
    turnsHere,
    turnsSinceSomethingChanged,
    openSituation,
    turnsSituationUnchanged,
    // Two different stalls, and either one is a stall.
    //
    // The first is the room: six turns in one place with nothing changing,
    // which is the loop the first Ace playtest had. The second is the
    // question: three beats that keep arriving at the same place, which is
    // the loop the second one had — a scene whose point has been reached and
    // which carries on being about it.
    stalled:
      (turnsHere >= STALE_TURNS_IN_PLACE &&
        turnsSinceSomethingChanged >= STALE_TURNS_WITHOUT_CHANGE) ||
      turnsSituationUnchanged >= STALE_TURNS_ON_ONE_QUESTION,
  };
}

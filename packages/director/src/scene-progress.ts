import type { GameState, StateMutation, TurnRecord } from '@plotbreak/contracts';

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

  return {
    turnsHere,
    turnsSinceSomethingChanged,
    stalled:
      turnsHere >= STALE_TURNS_IN_PLACE &&
      turnsSinceSomethingChanged >= STALE_TURNS_WITHOUT_CHANGE,
  };
}

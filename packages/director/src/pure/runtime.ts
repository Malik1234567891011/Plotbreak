import type { GameState, StoryVersion, TurnRecord } from '@plotbreak/contracts';
import { commitTurn } from '@plotbreak/engine';
import type { ModelGateway } from '../gateway/types.js';
import { narratePure } from './narrator.js';

/**
 * The LLM_PURE turn, shaped so the existing API, database and client can carry
 * it without knowing anything changed.
 *
 * What this does NOT do, on purpose, is the whole point of the experiment:
 *
 *   no RuleBasedIntentParser        no seeded checks
 *   no ModelIntentParser            no beat plan
 *   no resolveIntent                no state deltas
 *   no RuleBasedDirector            no relationship arithmetic
 *   no encounter machinery          no memory proposals
 *
 * The model reads the player's words and the history and writes the turn. The
 * only state that moves is what the model itself reports about the scene it
 * just wrote — where everybody ended up, and what time it is. Metadata
 * describes the turn; it does not decide it.
 */

export interface PureTurnResult {
  readonly blocks: Array<{ type: string; speakerId: string | null; text: string; visibility: string; voiceEligible: boolean }>;
  readonly sceneSummary: string;
  readonly endStatePrompt: string;
  readonly suggestions: Array<{ text: string; intentHint: string; resourceCostLabel: null }>;
  readonly state: GameState;
  readonly telemetry: { promptChars: number; historyTurns: number; ms: number };
}

export async function runTurnPure(options: {
  readonly gateway: ModelGateway;
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly turnId: string;
}): Promise<PureTurnResult> {
  const started = Date.now();
  const { gateway, story, state, recentTurns, actionText, turnId } = options;

  const { turn, promptChars, historyTurns } = await narratePure({
    gateway, story, state, recentTurns, actionText,
  });

  const castIds = new Set(story.characters.map((c) => c.id));
  const blocks = turn.narrative.map((b) => ({
    type: b.speakerId && castIds.has(b.speakerId) ? 'DIALOGUE' : 'NARRATION',
    speakerId: b.speakerId && castIds.has(b.speakerId) ? b.speakerId : null,
    text: b.text,
    visibility: 'GROUP',
    voiceEligible: false,
  }));

  // The model's own account of the scene it just wrote, applied as the new
  // state. A location it invented is ignored rather than trusted, because the
  // client resolves ids — that is a rendering constraint, not a semantic one.
  const nextLocation = story.locations.some((l) => l.id === turn.locationId)
    ? turn.locationId
    : state.player.locationId;
  const present = new Set(turn.presentCharacterIds.filter((id) => castIds.has(id)));

  const moved: GameState = {
    ...state,
    player: { ...state.player, locationId: nextLocation },
    characters: state.characters.map((c) => {
      if (present.has(c.characterId)) return { ...c, locationId: nextLocation };
      // Somebody the model says is no longer here goes back to where the world
      // says they live. Crude, and the point of the experiment is to find out
      // whether crude is enough.
      if (c.locationId === nextLocation) {
        const home = story.characters.find((d) => d.id === c.characterId)?.homeLocationId;
        return home ? { ...c, locationId: home } : c;
      }
      return c;
    }),
    // Time moves because the story says it did; there is no clock arithmetic
    // here and the header shows the model's own phrase.
    worldMinute: state.worldMinute + 6,
    turnIndex: state.turnIndex + 1,
    revision: state.revision + 1,
  } as GameState;

  return {
    blocks,
    sceneSummary: turn.sceneSummary,
    endStatePrompt: turn.timeDisplay,
    suggestions: turn.suggestedResponses.map((text) => ({
      text,
      intentHint: 'freeform',
      resourceCostLabel: null,
    })),
    state: moved,
    telemetry: { promptChars, historyTurns, ms: Date.now() - started },
  };
}

/** Exported so the shim can keep the engine's commit bookkeeping if wanted. */
export { commitTurn };

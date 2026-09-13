import type { GameState, StoryVersion, TurnRecord } from '@plotbreak/contracts';
import { commitTurn } from '@plotbreak/engine';
import type { ModelGateway, ModelInvocation } from '../gateway/types.js';
import { narratePure, type RenderedTurn } from './narrator.js';

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
  /** Shown above the beat when the story jumped. Null when the scene continued. */
  readonly transition: string | null;
  /** Which pre-generated expression to show, if any. Never triggers generation. */
  readonly reaction: { readonly characterId: string; readonly emotion: string } | null;
  readonly suggestions: Array<{ text: string; intentHint: string; resourceCostLabel: null }>;
  readonly state: GameState;
  readonly telemetry: { promptChars: number; historyTurns: number; ms: number };
  /** What the provider billed and cached for this turn. */
  readonly invocation: ModelInvocation;
  /** Present when the provider compacted: store it and send it back next turn. */
  readonly compaction?: unknown;
  /** Store this verbatim; `append` replays it on every later turn. */
  readonly rendered: RenderedTurn;
}

export async function runTurnPure(options: {
  readonly gateway: ModelGateway;
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly turnId: string;
  /** A stored compaction artifact replacing the turns before `recentTurns`. */
  readonly prefixItems?: readonly unknown[];
  /** Compact once the input passes this many tokens. */
  readonly compactThreshold?: number;
  /** Which endpoint to use. Defaults to `PLOTBREAK_PURE_API`. */
  readonly api?: 'chat' | 'responses';
  /** `null` opts out of prompt caching entirely, which only a control arm wants. */
  readonly cacheKey?: string | null;
  readonly cacheRetention?: '24h' | 'in-memory';
  /** `append` keeps every request a strict extension of the last one. */
  readonly shape?: 'rebuilt' | 'append';
  /** Required by `append`: previous turns exactly as they were sent. */
  readonly rendered?: readonly RenderedTurn[];
}): Promise<PureTurnResult> {
  const started = Date.now();
  const { gateway, story, state, recentTurns, actionText, turnId } = options;

  const { turn, promptChars, historyTurns, invocation, rendered, nextWorldMinute, timeLabel, transition } =
    await narratePure({
    gateway, story, state, recentTurns, actionText,
    // One cache per session: every turn of a session shares the whole prefix.
    cacheKey:
      options.cacheKey === null
        ? undefined
        : (options.cacheKey ?? `pb:${state.sessionId ?? 'anon'}`),
    api: options.api,
    cacheRetention: options.cacheRetention,
    shape: options.shape,
    rendered: options.rendered,
    prefixItems: options.prefixItems,
    compactThreshold: options.compactThreshold,
  });

  const castIds = new Set(story.characters.map((c) => c.id));
  const blocks = turn.narrative.flatMap((b) =>
    // A block is a paragraph, and the contract caps one at 1,200 characters.
    // A longer one used to write to the database and then fail validation on
    // the way back out, so the turn returned 500 for ever and the player never
    // saw a beat the model had already been paid to write. Split rather than
    // truncate: the prose is fine, it is just one paragraph too long.
    splitForContract(b.text).map((text) => ({
      type: b.speakerId && castIds.has(b.speakerId) ? 'DIALOGUE' : 'NARRATION',
      speakerId: b.speakerId && castIds.has(b.speakerId) ? b.speakerId : null,
      text,
      visibility: 'GROUP',
      voiceEligible: false,
    })),
  );

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
    // Time moves because the story says it did — by the amount it says, not by
    // a flat six minutes a turn. The prose used to pass into morning while the
    // header still read "Day 1 · 5:34 PM"; the model now reports the jump it
    // narrated and the clock applies it.
    worldMinute: nextWorldMinute,
    turnIndex: state.turnIndex + 1,
    revision: state.revision + 1,
  } as GameState;

  return {
    blocks,
    sceneSummary: turn.sceneSummary,
    endStatePrompt: timeLabel,
    transition,
    // Only for somebody actually in the cast and actually in the scene: a face
    // belonging to a character who just left would be worse than no face.
    reaction:
      turn.reaction && castIds.has(turn.reaction.characterId) && present.has(turn.reaction.characterId)
        ? { characterId: turn.reaction.characterId, emotion: turn.reaction.emotion }
        : null,
    suggestions: turn.suggestedResponses.map((text) => ({
      // 320 is the contract's ceiling for a card, and the same read-side
      // validation that bricked a turn on a long paragraph applies here.
      text: clampCard(text),
      intentHint: 'freeform',
      resourceCostLabel: null,
    })),
    state: moved,
    telemetry: { promptChars, historyTurns, ms: Date.now() - started },
    invocation,
    compaction: invocation.compaction,
    rendered,
  };
}

/** Exported so the shim can keep the engine's commit bookkeeping if wanted. */
export { commitTurn };

/** The contract's per-block ceiling. Mirrored here so the split is honest. */
const BLOCK_LIMIT = 1200;

/**
 * Breaks an over-long paragraph on a sentence boundary, falling back to a word
 * boundary and finally to a hard cut, so the result always fits regardless of
 * what the model wrote.
 */
export function splitForContract(text: string, limit: number = BLOCK_LIMIT): string[] {
  if (text.length <= limit) return [text];
  const out: string[] = [];
  let rest = text;
  while (rest.length > limit) {
    const window = rest.slice(0, limit);
    const sentence = Math.max(
      window.lastIndexOf('. '),
      window.lastIndexOf('! '),
      window.lastIndexOf('? '),
      window.lastIndexOf('." '),
      window.lastIndexOf('!" '),
      window.lastIndexOf('?" '),
    );
    const cut = sentence > limit * 0.4 ? sentence + 1 : window.lastIndexOf(' ');
    const at = cut > 0 ? cut : limit;
    out.push(rest.slice(0, at).trim());
    rest = rest.slice(at).trim();
  }
  if (rest) out.push(rest);
  return out;
}

/** The contract's ceiling for a suggestion. A card this long is already wrong. */
const CARD_LIMIT = 320;

function clampCard(text: string): string {
  if (text.length <= CARD_LIMIT) return text;
  const cut = text.slice(0, CARD_LIMIT).lastIndexOf(' ');
  return `${text.slice(0, cut > 0 ? cut : CARD_LIMIT).trim()}…`;
}

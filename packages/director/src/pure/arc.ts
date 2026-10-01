import { ArcClosing, type ArcCarry, type StoryArc } from '@plotbreak/contracts';
import type { ModelGateway, ModelMessage } from '../gateway/types.js';

/**
 * Arcs — keeping a long session on the cheap side of the price cliff.
 *
 * Every turn re-sends the whole transcript, and past 272K input tokens the
 * provider charges 2x input and 1.5x output for the *full* request. Measured
 * against the credit ladder that is where Vivid, Cinematic and Apex all stop
 * making money. Closing an arc swaps a long stretch of transcript for a short
 * recap and puts the session back under the step. `docs/arcs.md` has the
 * margin table.
 *
 * The rule that keeps this from feeling like a system interrupting a story:
 * **the token count never causes the break.** It only starts asking the story
 * to land. The break itself fires on a beat the storyteller marked `settled`,
 * which is a moment it chose.
 */

/**
 * Read per call, not at import.
 *
 * As module constants these were fixed the first time anything imported the
 * file, which made the limits untestable and made behaviour depend on import
 * order. Reading `process.env` per call costs nothing at this frequency.
 */
/** Past this, start asking the story to find a resting point. */
export const softLimit = (): number => envInt('PLOTBREAK_ARC_SOFT_LIMIT', 180_000);
/** Backstop if it never settles. Still under the 272K step. */
export const hardLimit = (): number => envInt('PLOTBREAK_ARC_HARD_LIMIT', 260_000);
/** Tail of the closing arc kept verbatim, so the new arc opens mid-texture. */
export const keepTurns = (): number => envInt('PLOTBREAK_ARC_KEEP_TURNS', 12);

function envInt(name: string, fallback: number): number {
  const raw = Number(process.env[name]);
  return Number.isFinite(raw) && raw >= 0 ? raw : fallback;
}

/** Rough token count. Four characters per token is close enough to decide on. */
export function approxTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export function contextTokens(messages: readonly ModelMessage[]): number {
  return messages.reduce((n, m) => n + approxTokens(m.content), 0);
}

/**
 * The one extra line the storyteller gets while an arc is winding down.
 *
 * Deliberately not an instruction to end anything: an arc break is a place to
 * put the book down, not a conclusion. The model decides when, and says so
 * through the `sceneStatus` it already reports.
 */
export const ARC_CLOSING_NOTE = [
  '',
  'THIS ARC IS DRAWING TO A CLOSE. Over the next few beats, let the thread in front of the player reach',
  'somewhere a reader could put the book down — a decision made, a journey finished, a night that ends.',
  'Do not rush it, do not announce it, and do not resolve the story itself. When the moment genuinely',
  'arrives, mark the beat `settled`.',
].join('\n');

export type ArcDecision = 'continue' | 'closing' | 'close-now';

/**
 * Whether to leave the story alone, start winding it down, or close at this beat.
 *
 * `sceneStatus` is the storyteller's own judgement that the moment in front of
 * the player has finished, and it is already reported on every turn. Using it
 * is what makes the break land somewhere chosen rather than somewhere counted.
 */
export function arcDecision(opts: {
  readonly contextTokens: number;
  readonly sceneStatus: 'live' | 'settled';
  readonly turnsSinceArcStart: number;
}): ArcDecision {
  const soft = softLimit();
  const hard = hardLimit();
  if (soft === 0 || hard === 0) return 'continue';
  // An arc that has barely started cannot close, however big the prefix is —
  // that only happens when the carried context is itself enormous, and
  // breaking again immediately would produce two recaps and no story.
  if (opts.turnsSinceArcStart < keepTurns() * 2) return 'continue';
  if (opts.contextTokens >= hard) return 'close-now';
  if (opts.contextTokens < soft) return 'continue';
  return opts.sceneStatus === 'settled' ? 'close-now' : 'closing';
}

const CLOSING_PROMPT = [
  'The arc just ended. Write its record.',
  '',
  '`title` — what this stretch of the story would be called in a table of contents. Short, concrete,',
  "in the story's language. Name a thing that happened, not a theme.",
  '',
  '`recap` — what the player reads on the arc card. Three or four short paragraphs, second person,',
  'past tense, in the voice the story has been told in. It is a reminder, not a trailer: no questions',
  'to the reader, no "what happens next", no summarising the themes. Say what was done and what it',
  'cost. Somebody who played it should recognise their own run in it.',
  '',
  'Then the continuity. This is not shown to anyone — it is what the next arc is written against, and',
  'anything you leave out is forgotten for good. Be specific and use names.',
  '',
  '`standing` — who the player is now: titles, trade, property, money, reputation, condition.',
  '`bonds` — every significant relationship and where it currently stands, named.',
  '`established` — facts this story has committed to and must never contradict. Deaths, parentage,',
  'secrets learned, promises made, places found, what the player turned out to be.',
  '`open` — threads deliberately left unresolved, so the next arc can still pull them.',
].join('\n');

/**
 * Ask the model for the arc record.
 *
 * Built from the arc's own scene summaries plus a verbatim tail, rather than
 * from the whole transcript. Two reasons, and neither is only cost:
 *
 *  - 400 scene summaries are ~8K tokens against ~200K of transcript, so this
 *    costs about half a cent instead of a dollar on the premium tiers;
 *  - they are already one distilled line per turn, which is a better thing to
 *    summarise from than raw prose. The verbatim tail is there so the recap
 *    still has the texture of how the arc actually ended.
 *
 * Earlier arcs' `carried` goes in too, so continuity chains rather than
 * resetting at every break — arc three still knows what arc one established.
 */
export async function closeArc(options: {
  readonly gateway: ModelGateway;
  readonly storyTitle: string;
  readonly arcIndex: number;
  /** One line per turn, in order, for the whole arc being closed. */
  readonly sceneSummaries: readonly string[];
  /** The last few turns as they were sent, so the ending keeps its texture. */
  readonly tail: readonly { readonly user: string; readonly assistant: string }[];
  /** What earlier arcs established, so continuity chains across breaks. */
  readonly earlier?: readonly StoryArc[];
  readonly locale?: string;
  readonly model?: string;
}): Promise<ArcClosing> {
  const earlier = arcPrefix(options.earlier ?? []);
  const body = [
    `Story: ${options.storyTitle}`,
    `You are closing arc ${options.arcIndex}.`,
    '',
    ...(earlier ? [earlier, ''] : []),
    '## This arc, one line per beat',
    '',
    ...options.sceneSummaries.map((line, i) => `${i + 1}. ${line}`),
    '',
    '## How it ended, verbatim',
    '',
    ...options.tail.flatMap((turn) => [turn.user, turn.assistant, '']),
  ].join('\n');

  const result = await options.gateway.generateStructured(
    'writer_premium',
    ArcClosing,
    [
      { role: 'system', content: CLOSING_PROMPT },
      ...(options.locale === 'fr'
        ? [{ role: 'system' as const, content: 'Le titre et le récapitulatif sont en français. Les listes de continuité aussi.' }]
        : []),
      { role: 'user', content: body },
    ],
    { maxTokens: 2500, model: options.model, temperature: 0.6, timeoutMs: 120_000, nativeSchema: true },
  );
  return result.value;
}

/** One list, rendered the same way every time. Byte-identical or the cache dies. */
function renderList(label: string, items: readonly string[]): string[] {
  if (items.length === 0) return [];
  return [`${label}:`, ...items.map((item) => `- ${item}`), ''];
}

function renderCarry(carried: ArcCarry): string[] {
  return [
    ...renderList('Where the player stands', carried.standing),
    ...renderList('Bonds', carried.bonds),
    ...renderList('Established, and not to be contradicted', carried.established),
    ...renderList('Still open', carried.open),
  ];
}

/**
 * The closed arcs, as one system message.
 *
 * A system message rather than a faked exchange: this is context, not something
 * anybody said. It sits in the cached prefix with the constitution and the
 * world, and only changes when an arc closes — which is the one turn per arc
 * where a full cache miss is expected and paid for.
 */
export function arcPrefix(arcs: readonly StoryArc[]): string | null {
  if (arcs.length === 0) return null;
  const out: string[] = [
    '## Earlier arcs',
    '',
    'What came before, compacted. The prose is what the player was shown. The lists are the continuity',
    'this story is written against: treat every line as something that happened, and never contradict it.',
    '',
  ];
  for (const arc of arcs) {
    out.push(`### Arc ${arc.arcIndex} — ${arc.title}`, '', arc.recap, '', ...renderCarry(arc.carried));
  }
  return out.join('\n').trimEnd();
}

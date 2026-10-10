import type { GameState, StoryArc, StoryVersion } from '@plotbreak/contracts';
import { envInt } from './arc.js';

/**
 * World pressure — the story pushing back on a long run that has gone quiet.
 *
 * Measured on the two deepest runs in production (`docs/deep-run-pink-tide.md`):
 * once the player is driving a comfortable routine, the storyteller follows
 * them faithfully and never brings anything of its own. Pink Tide went 350
 * turns without its mystery appearing once, while twelve unresolved threads
 * sat in the prompt under "Still open". The constitution already says *the
 * world does not wait*; in replay the model ignored it 15 times out of 15, and
 * a note asking it to judge for itself whether things had gone quiet fired 1
 * time in 15. Naming one specific thread fired 15 in 15, with the player's
 * action carried out first in every one.
 *
 * So code chooses *when* and *which*, and the model chooses *how*. The note
 * rides in the turn's own user message, like the arc-closing note: it stays in
 * the replayed history byte-for-byte and never touches the cached prefix.
 */

/** Beats between pushes. `0` turns the whole mechanism off. */
export const pressureEvery = (): number => envInt('PLOTBREAK_PRESSURE_EVERY', 25);
/** No push before this turn of a session: an opening has its own momentum. */
export const pressureFirst = (): number => envInt('PLOTBREAK_PRESSURE_FIRST', 40);
/** After an arc break, the push comes this many beats into the new arc. */
export const pressureAfterBreak = (): number => envInt('PLOTBREAK_PRESSURE_AFTER_BREAK', 3);

/** The first line of the note. Also how a past push is found in the history. */
export const PRESSURE_MARKER = 'THE WORLD MOVES THIS BEAT.';

/** Longer than this and a thread is a paragraph, not something to name. */
const THREAD_LIMIT = 300;

export function pressureNote(thread: string): string {
  return [
    '',
    `${PRESSURE_MARKER} First resolve the player's action exactly as this world would — what cannot`,
    'happen here still does not, and a refusal is still a refusal — and keep their scene. Then let this',
    'unresolved thread reach the player from outside their plans — somebody tied to it arrives, word of',
    'it comes, something connected to it turns up, a cost from it comes due:',
    `"${thread}"`,
    'It arrives at the edge of the scene; it does not replace it. If the player is in the middle of',
    'danger, a confession or an intimate moment, let that moment finish and the thread arrive as it',
    'closes. If the story has already settled this thread, bring a different one that is still open.',
    'Do not resolve it and do not explain it. One of the three suggestions offers a way to follow it,',
    'and another lets the player leave it for now. This note is for this beat only: if the player then',
    'sets the thread aside, go where they went and let it rest until the world has a reason to bring it',
    'back.',
  ].join('\n');
}

/**
 * The threads a push can pull, most authoritative first.
 *
 * After an arc has closed, its `carried.open` is the story's own record of what
 * it left hanging. Before any arc has closed there is no such record, so the
 * story's authored threads that this run has not finished stand in.
 */
export function openThreads(story: StoryVersion, state: GameState, arcs: readonly StoryArc[]): string[] {
  const last = arcs[arcs.length - 1];
  if (last && last.carried.open.length > 0) return last.carried.open.map(clip);
  const closed = new Set(
    state.quests
      .filter((q) => q.status === 'COMPLETED' || q.status === 'FAILED' || q.status === 'EXPIRED')
      .map((q) => q.questId),
  );
  return story.quests
    .filter((q) => !closed.has(q.id))
    .map((q) => clip(q.summary ? `${q.title} — ${q.summary}` : q.title));
}

function clip(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= THREAD_LIMIT) return flat;
  const cut = flat.slice(0, THREAD_LIMIT).lastIndexOf(' ');
  return `${flat.slice(0, cut > 0 ? cut : THREAD_LIMIT)}…`;
}

/** Index of the most recent prior user message carrying a push, or -1. */
function lastPushAt(priorUsers: readonly string[]): number {
  for (let i = priorUsers.length - 1; i >= 0; i -= 1) {
    if (priorUsers[i]!.includes(PRESSURE_MARKER)) return i;
  }
  return -1;
}

/**
 * Whether this turn gets a push.
 *
 * `priorUsers` is the current arc's user messages, oldest first, exactly as
 * they were sent — the same rows the turn is about to replay. A past push is
 * recognised by its marker, so no new state has to be stored anywhere.
 */
export function shouldPush(opts: {
  /** The current arc's user messages as sent, oldest first. */
  readonly priorUsers: readonly string[];
  /** Arcs already closed on this session. */
  readonly arcsClosed: number;
  /** The session's turn number for the turn about to run. */
  readonly sessionTurn: number;
  /** An arc that is winding down is asked to land; a push would fight it. */
  readonly arcClosing: boolean;
  readonly threadCount: number;
}): boolean {
  const every = pressureEvery();
  if (every === 0 || opts.arcClosing || opts.threadCount === 0) return false;
  const inArc = opts.priorUsers.length;
  const last = lastPushAt(opts.priorUsers);
  if (last >= 0) return inArc - last >= every;
  // Nothing pushed yet in this arc.
  if (opts.arcsClosed > 0) return inArc >= pressureAfterBreak();
  return opts.sessionTurn >= pressureFirst() && inArc >= pressureFirst();
}

/**
 * Threads a push must never pick, whatever their score.
 *
 * A push makes something "come due" on the story's initiative. The continuity
 * record can hold a character's suicide attempt or an assault as an open
 * thread — Pink Tide's did — and dramatising that unprompted is not the
 * game's call. The player can always bring it up; the world does not.
 */
const SENSITIVE =
  /suicid|self[- ]?harm|automutil|scarif|overdose|surdose|se tuer|kill (?:him|her|them)sel|rape|viol\b|violée?s?\b|agression sexuelle|sexual assault|abus(?:e|é)s? sexuel|sexual abuse|eating disorder|anorexi|boulimi/i;

export function isSensitiveThread(thread: string): boolean {
  return SENSITIVE.test(thread);
}

function fold(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

/** Words common enough in either language that they say nothing about a thread. */
const STOP = new Set(
  ('apres avant alors aussi autre avec cette comme dans depuis donc elle elles encore entre etre faire leurs ' +
    'leur mais meme moins notre nous plus pour quand quel quelle sans sera sont sous tout tous toute toutes ' +
    'votre vous reste restent doit doivent jamais aucun aucune ainsi about after again their there these ' +
    'those which while would could should being other where every never still with from into that this ' +
    'have been they them what when your will remains remain unresolved unknown').split(' '),
);

/** The words that make a thread this thread: long or numbered, and not filler. */
function keywords(thread: string): Set<string> {
  return new Set(
    (fold(thread).match(/[a-z0-9-]+/g) ?? []).filter((w) => (w.length >= 5 || /\d/.test(w)) && !STOP.has(w)),
  );
}

/**
 * How present a thread already is in the recent beats, 0 to 1: the share of
 * its words that appear there. A thread the story is living in scores high;
 * one it has dropped scores near zero.
 */
export function threadPresence(thread: string, recentBeats: readonly string[]): number {
  const words = keywords(thread);
  if (words.size === 0) return 1;
  const seen = new Set(fold(recentBeats.join('\n')).match(/[a-z0-9-]+/g) ?? []);
  let hit = 0;
  for (const w of words) if (seen.has(w)) hit += 1;
  return hit / words.size;
}

/** How many recent beats the neglect score reads. */
const RECENT_BEATS = 40;

/**
 * Which thread to push: the most neglected one.
 *
 * Order alone is not enough. Pink Tide's arc recorded "no wedding date has been
 * chosen" first, so the first production push into that run delivered more
 * wedding admin to a player who had drifted into nothing but wedding admin,
 * while the missing man and the woman in the cave sat further down the list.
 * The thread to push is the one the recent story mentions least. Never a
 * sensitive one, never the one pushed last time unless it is all there is,
 * and ties go to the least recently pushed, then to the recorded order.
 */
export function chooseThread(
  threads: readonly string[],
  priorUsers: readonly string[],
  recentBeats: readonly string[] = [],
): string | null {
  const safe = threads.filter((t) => !isSensitiveThread(t));
  if (safe.length === 0) return null;
  const lastPushed = (thread: string): number => {
    for (let i = priorUsers.length - 1; i >= 0; i -= 1) {
      const user = priorUsers[i]!;
      if (user.includes(PRESSURE_MARKER) && user.includes(`"${thread}"`)) return i;
    }
    return -1;
  };
  const pushedAt = safe.map(lastPushed);
  const newest = Math.max(...pushedAt);
  const pool = safe
    .map((thread, order) => ({ thread, order, pushed: pushedAt[order]! }))
    .filter((c) => safe.length === 1 || newest < 0 || c.pushed !== newest);
  const beats = recentBeats.slice(-RECENT_BEATS).map((b) => b.split('\n[')[0]!);
  const scored = pool.map((c) => ({ ...c, presence: beats.length ? threadPresence(c.thread, beats) : 0 }));
  scored.sort((a, b) => a.presence - b.presence || a.pushed - b.pushed || a.order - b.order);
  return scored[0]!.thread;
}

/** The whole decision: the note to send this turn, or null. */
export function pressureFor(opts: {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly arcs: readonly StoryArc[];
  readonly priorUsers: readonly string[];
  /** The current arc's beats as sent, oldest first; how neglect is measured. */
  readonly priorAssistants?: readonly string[];
  readonly arcClosing: boolean;
}): string | null {
  const threads = openThreads(opts.story, opts.state, opts.arcs).filter((t) => !isSensitiveThread(t));
  const push = shouldPush({
    priorUsers: opts.priorUsers,
    arcsClosed: opts.arcs.length,
    sessionTurn: opts.state.turnIndex + 1,
    arcClosing: opts.arcClosing,
    threadCount: threads.length,
  });
  if (!push) return null;
  const thread = chooseThread(threads, opts.priorUsers, opts.priorAssistants ?? []);
  return thread ? pressureNote(thread) : null;
}

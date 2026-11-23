import type { SpeakerLine, StoryVersion, TurnRecord } from '@plotbreak/contracts';
// projections.ts imports this module too. The cycle is safe: neither module
// calls the other at load time, only from inside functions.
import { resolveAssetUrl } from './projections.js';

/**
 * The last thing a character said in a run, for the Continue row, the Library
 * row and (on the client, by the same rule) the credit wall.
 *
 * `runTurnPure` gives a block a `speakerId` only when the speaker is a cast id
 * (`packages/director/src/pure/runtime.ts`), so a cast id is what makes a line
 * quotable. Everything else is skipped: narration, the player, a speaker the
 * story no longer has, and a line marked `NPC_PRIVATE`, which the player was
 * never meant to have heard.
 *
 * Only the newest `lookback` turns are searched. A run where nobody has spoken
 * for three beats is better remembered by its narration recap than by a line
 * from twenty minutes ago.
 */
export const LAST_LINE_LOOKBACK = 3;
/** The contract's cap on `SpeakerLine.text`. */
export const LAST_LINE_MAX = 280;

type StoryCast = Pick<StoryVersion, 'characters' | 'version'>;
type TurnBlocks = Pick<TurnRecord, 'turnIndex' | 'blocks'>;

export function lastSpokenLine(
  story: StoryCast,
  turns: readonly TurnBlocks[],
  lookback: number = LAST_LINE_LOOKBACK,
): SpeakerLine | null {
  const cast = new Map(story.characters.map((c) => [c.id, c]));
  const newest = [...turns].sort((a, b) => b.turnIndex - a.turnIndex).slice(0, Math.max(0, lookback));
  for (const turn of newest) {
    for (let i = turn.blocks.length - 1; i >= 0; i -= 1) {
      const block = turn.blocks[i]!;
      if (block.type !== 'DIALOGUE' || block.visibility === 'NPC_PRIVATE') continue;
      const speaker = block.speakerId ? cast.get(block.speakerId) : undefined;
      if (!speaker) continue;
      const text = capLine(block.text);
      if (!text) continue;
      return {
        characterId: speaker.id,
        name: speaker.name,
        portrait: resolveAssetUrl(speaker.portrait, story.version),
        text,
        turnIndex: turn.turnIndex,
      };
    }
  }
  return null;
}

/** The first line of the newest beat's scene summary. The rule `ContinueCard.recapLine` has always used. */
export function recapLineOf(turns: readonly Pick<TurnRecord, 'sceneSummary'>[]): string | null {
  return turns.at(-1)?.sceneSummary.split('\n')[0] ?? null;
}

const CLOSING_QUOTE = /[”»"’」』]$/u;

/**
 * Trimmed, and cut on a word boundary with "…" when it runs past the cap.
 *
 * Stored dialogue carries its own quote marks, so a cut line keeps its closing
 * mark after the ellipsis rather than reading as an unclosed quotation.
 */
export function capLine(raw: string, max: number = LAST_LINE_MAX): string {
  const text = raw.trim();
  if (text.length <= max) return text;
  const close = CLOSING_QUOTE.exec(text)?.[0] ?? '';
  const room = max - 1 - close.length;
  let head = text.slice(0, room);
  // `slice` counts UTF-16 units, so it can split an emoji in two. A lone high
  // surrogate goes out as `\ud83d`, which a strict JSON decoder rejects, and it
  // would take the whole Discover payload down with it.
  if (/[\uD800-\uDBFF]$/.test(head)) head = head.slice(0, -1);
  const space = head.search(/\s\S*$/u);
  // A boundary in the last 40% only. One very long word is cut where it stands
  // rather than throwing most of the line away.
  if (space > room * 0.6) head = head.slice(0, space);
  head = head.replace(/[\s,;:—–-]+$/u, '');
  return `${head}…${close}`;
}

/**
 * Which face, if any, the player sees on this beat.
 *
 * The storyteller proposes; this decides. A proposal is refused when showing it
 * would carry no information — the same picture the player is already looking
 * at, an asset they saw a moment ago, or a fourth consecutive turn of one
 * character's face simply because they happen to be doing the talking.
 *
 * There is no target frequency here on purpose. Relevance decides, and showing
 * nothing is a perfectly good outcome.
 */

export interface ShownReaction {
  readonly characterId: string;
  readonly emotion: string;
}

/**
 * How far back an identical asset still counts as "just seen".
 *
 * The only thing being suppressed is a picture the player is already looking
 * at. A different expression on the same face is new information and is not
 * touched — "Sabo amused → Sabo worried" is exactly the kind of cut worth
 * having, and an early game that shows a relevant face nearly every turn is
 * the intended experience, not a problem to tune away.
 */
const EXACT_ASSET_WINDOW = 4;

/**
 * Reads back what was shown on a past beat.
 *
 * The marker is written into the assistant message that the append-only
 * conversation replays anyway, so recent history costs no storage and no extra
 * query — and it records what the player actually saw rather than what was
 * proposed, which is the distinction that matters here.
 */
export function parseShown(assistant: string): ShownReaction | null {
  const match = assistant.match(/· shown: ([^/\]\s]+)\/([^\]\s]+)\]/);
  if (!match || match[1] === 'nobody') return null;
  return { characterId: match[1]!, emotion: match[2]! };
}

/**
 * `recent` is most-recent-first, one entry per past beat, null where nothing
 * was shown.
 */
export function chooseReaction(
  proposed: ShownReaction | null | undefined,
  recent: readonly (ShownReaction | null)[],
): ShownReaction | null {
  if (!proposed) return null;

  // The identical picture, recently. Nothing about the screen would change, so
  // showing it again is the one case that carries no information.
  const sameAsset = recent
    .slice(0, EXACT_ASSET_WINDOW)
    .some((r) => r && r.characterId === proposed.characterId && r.emotion === proposed.emotion);
  if (sameAsset) return null;

  return proposed;
}

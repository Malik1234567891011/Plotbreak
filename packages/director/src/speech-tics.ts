import { nameKeys } from '@plotbreak/contracts';

/**
 * A character who says the same word first, every time.
 *
 * Measured over twenty turns of Ace: **Sabo opened seventeen of his
 * twenty-one lines with "Look,"** and **Luffy opened twenty of his
 * twenty-two with "Ace!" or "Ace."** The cast has four voice samples each and
 * none of them is that. Nobody wrote the tic; the context window grew it.
 *
 * The mechanism is the same one that grew the invented bruise. The writer is
 * handed the last few beats so the scene stays continuous, reads Sabo opening
 * with "Look," and matches it — which makes two, which makes it a pattern,
 * which makes the next one three. A model asked to be consistent with a voice
 * will reproduce the most recent evidence of that voice, and the most recent
 * evidence is its own last line.
 *
 * Prompt wording cannot reach this, because the writer is doing exactly what
 * it was told: keeping the character consistent. Something outside the beat
 * has to look across beats. `name-spam.ts` already does the within-a-line
 * version of this — one speaker, three vocatives, one sentence — and this is
 * the across-turns version.
 *
 * Fixed in place rather than dropped, for the same reason: "Look, Ace — next
 * time that line's not going to scare me off" is a good line wearing a tic,
 * and deleting the block would cost the player the beat.
 */

/** Openers that are a habit rather than a sentence: discourse markers and address. */
const OPENER = /^\s*["“«]?\s*([\p{L}'’-]+)\s*([,.!?—–-])\s*/u;

/**
 * Discourse markers, which are the ones safe to remove.
 *
 * "Look," "Listen," "Hey," carry nothing — the sentence after them is the
 * whole line. A name is handled separately below, because removing it changes
 * who is being spoken to and sometimes that is the only marker of it.
 */
const FILLER = new Set([
  'look', 'listen', 'hey', 'well', 'so', 'okay', 'ok', 'right', 'alright', 'now',
  'see', 'anyway', 'honestly', 'seriously', 'please',
  // French, authored rather than translated: these are the ones French prose
  // reaches for in the same position.
  'écoute', 'écoutez', 'bon', 'alors', 'bref', 'franchement', 'sérieux', 'tiens', 'attends',
]);

export const SPEECH_TIC_MARKER = 'Opens the same way every time';

/** How many of a speaker's recent lines have to share an opener before it is a tic. */
export const TIC_THRESHOLD = 2;

function openerOf(text: string): string | null {
  const match = OPENER.exec(text);
  if (!match) return null;
  return match[1]!.toLowerCase();
}

export interface SpeechTic {
  readonly blockIndex: number;
  readonly speakerId: string;
  readonly opener: string;
  /** How many of the speaker's recent lines already opened this way. */
  readonly streak: number;
}

/**
 * Blocks in this turn whose opener the speaker has already used recently.
 *
 * The threshold is on the *history*, not on this turn: a character is allowed
 * to say "Look," twice, and the third time is when it stops being emphasis and
 * starts being a verbal tic.
 */
export function findSpeechTics(
  blocks: ReadonlyArray<{ type: string; text: string; speakerId?: string | null }>,
  recentDialogue: ReadonlyArray<{ speakerId: string; text: string }>,
): SpeechTic[] {
  const history = new Map<string, Map<string, number>>();
  for (const line of recentDialogue) {
    const opener = openerOf(line.text);
    if (!opener) continue;
    const perSpeaker = history.get(line.speakerId) ?? new Map<string, number>();
    perSpeaker.set(opener, (perSpeaker.get(opener) ?? 0) + 1);
    history.set(line.speakerId, perSpeaker);
  }

  const tics: SpeechTic[] = [];
  blocks.forEach((block, blockIndex) => {
    if (block.type !== 'DIALOGUE' || !block.speakerId || block.speakerId === 'player') return;
    const opener = openerOf(block.text);
    if (!opener) return;
    const streak = history.get(block.speakerId)?.get(opener) ?? 0;
    if (streak >= TIC_THRESHOLD) {
      tics.push({ blockIndex, speakerId: block.speakerId, opener, streak });
    }
    // This line joins the record, so a beat that opens two of its own blocks
    // the same way is caught within the turn as well as across turns.
    const perSpeaker = history.get(block.speakerId) ?? new Map<string, number>();
    perSpeaker.set(opener, streak + 1);
    history.set(block.speakerId, perSpeaker);
  });
  return tics;
}

/**
 * Takes the tic off the front of the line and leaves the line.
 *
 * Only filler and direct address, and only when something is left afterwards.
 * "Look — nobody checks the eastern gate before noon" loses two words and
 * keeps everything that matters; "Ace." on its own is the whole line and is
 * left alone, because a character saying only a name is a beat, not a habit.
 *
 * Names are matched a word at a time, which the first version did not do and
 * which cost it half the bug. Ace's protagonist is "Portgas D. Ace"; Luffy
 * opened twenty lines with "Ace!"; `"ace" === "portgas d. ace"` is false, so
 * every one of them survived the repair. Nobody is addressed by their full
 * name, which is the whole reason `nameKeys` exists.
 */
export function stripOpener(text: string, speakerNames: readonly string[]): string {
  const match = OPENER.exec(text);
  if (!match) return text;
  const word = match[1]!.toLowerCase();
  const addressed = new Set(
    speakerNames.flatMap((name) => nameKeys(name)).map((key) => key.toLowerCase()),
  );
  const removable = FILLER.has(word) || addressed.has(word);
  if (!removable) return text;

  const lead = text.slice(0, match.index);
  const rest = text.slice(match.index + match[0].length);
  if (rest.trim().length === 0) return text;
  return (lead + rest.charAt(0).toUpperCase() + rest.slice(1)).replace(/\s{2,}/g, ' ').trim();
}

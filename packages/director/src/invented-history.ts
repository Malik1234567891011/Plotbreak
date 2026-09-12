import { nameKeys } from '@plotbreak/contracts';
import type { GameState, StoryVersion } from '@plotbreak/contracts';

/**
 * The writer giving the player a past they did not have.
 *
 * Caught live in Ace. Turn 12 resolved `Strike Sabo · Hard · FAILURE` — the
 * player swung and missed, and Sabo took nothing. Turn 13 opened:
 *
 *   *"He's got a split lip from earlier — your doing — and there's no room for
 *   joking, not after you landed the last hit."*
 *
 * Turn 15 kept building on it: *"the print of your last hit on his jaw — a
 * flush already bruising"*. Turn 17: *"The memory of your last fight is
 * between you, recent enough the bruise is still coming up."*
 *
 * None of it happened. And once it is on the page it is in the context window,
 * so the next beat treats it as established and the one after that treats
 * *that* as established. A missed punch became a running injury and a
 * relationship rupture inside three turns, and no amount of careful play could
 * walk it back, because the player was never told a thing had been invented —
 * it simply read as a story about a fight they did not remember winning.
 *
 * This is the reason a prompt line is not enough. A writer told "do not invent
 * history" still writes a bruise, because a bruise is good prose and the model
 * has no way to check. The engine does: it knows exactly who has been hit and
 * exactly what was promised. So it checks, and the repair pass takes the
 * sentence out.
 *
 * Deliberately narrow. Only claims the engine can *disprove* are flagged —
 * an injury on somebody at full health with no authored scar, a promise with
 * no obligation on the books. Everything the engine cannot adjudicate is left
 * to the writer, where it belongs.
 */

export interface InventedHistoryHit {
  readonly blockIndex: number;
  readonly sentence: string;
  /** Who the claim is about, as the player would name them. */
  readonly subject: string;
  /** What the engine says instead. */
  readonly reason: string;
}

/**
 * Damage, in the words prose uses for it.
 *
 * Present harm and remembered harm both: "blood on his mouth" is as much a
 * claim about the recent past as "you landed the last hit" is.
 */
const INJURY =
  /\b(?:split lip|bleeding|bloodied|blood (?:on|from|in|at) (?:his|her|their|your|the)|drawing blood|bruis(?:e|ed|es|ing)|black eye|swollen|swelling|welt|cut (?:lip|cheek|brow)|gash|wound(?:ed)?|winded|limp(?:ing)?|favou?ring (?:his|her|their|your) \w+|nursing (?:a |his |her |their |your )?(?:wound|arm|jaw|ribs|hand|shoulder)|broken (?:nose|rib|ribs|arm)|doubled over)\b/i;

/**
 * The other half: the player as the one who did it.
 *
 * "The print of your last hit on his jaw" is a claim about *his* jaw however
 * many times it says "your", so these never attribute to the player — the
 * possessive belongs to the blow, not to the body. Keeping them apart is what
 * stops the positional test below reading the agent as the casualty.
 */
const HARM_BY_PLAYER =
  /\b(?:the (?:print|mark) of your (?:last )?(?:hit|blow|punch)|where you (?:hit|caught|landed)|you landed (?:the|a|your)|landed (?:the|a) (?:last )?(?:hit|blow|punch)|knocked (?:him|her|them) (?:down|flat|out)|you (?:hit|struck|caught) (?:him|her|them) (?:hard|clean|square))\b/i;

const HARM_BY_PLAYER_FR =
  /\b(?:la marque de ton (?:dernier )?coup|là où tu (?:l['’]as )?(?:frappé|touché|atteint)|ton dernier coup|le coup que tu (?:lui )?as (?:mis|porté)|tu (?:l['’]as|les as) (?:touché|frappé|eu))\b/iu;

/** A claim that the two of you have a fight behind you. */
const PRIOR_FIGHT =
  /\b(?:the )?(?:memory|echo) of (?:your|the) last (?:fight|hit|blow)\b|\blast time you (?:hit|swung|fought|landed)\b|\bafter (?:what )?you (?:did to|landed on)\b|\bsince you (?:hit|struck|fought)\b/i;

/**
 * The same, in French.
 *
 * Authored against French, not translated — the tells are different. French
 * prose reaches for `le sang`, `la lèvre fendue`, `un bleu`, and for the
 * pronominal `il se tient les côtes`, none of which fall out of the English
 * list. A run in French goes through exactly the same validator, so leaving
 * this out would have meant the rule holding in one locale and not the other.
 */
const INJURY_FR =
  /\b(?:lèvre fendue|saigne|saignait|saignant|en sang|ensanglant\w*|bleu(?:s)? (?:sur|à)|un bleu|hématome|contusion|l['’]œil au beurre noir|enfl\w+|gonfl\w+|plaie|blessure|blessé\w*|boite|boitill\w+|se tient (?:les côtes|le ventre|la mâchoire)|nez cassé|côte cassée|plié en deux)\b/iu;

/** A claim that the two of you have a fight behind you, in French. */
const PRIOR_FIGHT_FR =
  /\b(?:le souvenir de (?:votre|ta) dernière (?:bagarre|empoignade)|la dernière fois que tu (?:l['’]as|as) (?:frappé|touché|combattu)|depuis que tu (?:l['’]as|as) frappé|après ce que tu (?:lui )?as fait)\b/iu;

/** A promise, an oath, a debt of word. */
const PROMISE =
  /\b(?:you (?:promised|swore|gave (?:me|us|him|her|them) your word|said you(?:'| wo)?(?:'d| would))|your promise|the promise you made|you owe me (?:that|this|a)|we had a deal|you agreed to)\b/i;

const PROMISE_FR =
  /\b(?:tu (?:as promis|avais promis|as juré|m['’]as donné ta parole|as dit que tu)|ta promesse|la promesse que tu|tu me (?:dois|devais) (?:bien )?(?:ça|cela)|on avait un accord|tu t['’]es engagé)\b/iu;

/** Injuries the author wrote into the character, which are not claims about play. */
function authoredHarm(story: StoryVersion, characterId: string): boolean {
  const def = story.characters.find((c) => c.id === characterId);
  if (!def) return false;
  const authored = [def.appearance, def.visualHook, def.silhouette, ...def.publicTraits].join(' ');
  return anyInjury(authored);
}

/** Both locales, always. A world can be played in either and the run may mix. */
function anyInjury(text: string): boolean {
  return INJURY.test(text) || INJURY_FR.test(text);
}

function anyPriorFight(text: string): boolean {
  return PRIOR_FIGHT.test(text) || PRIOR_FIGHT_FR.test(text);
}

/** A blow the player is said to have landed on somebody else. */
function anyHarmByPlayer(text: string): boolean {
  return HARM_BY_PLAYER.test(text) || HARM_BY_PLAYER_FR.test(text);
}

function anyPromise(text: string): boolean {
  return PROMISE.test(text) || PROMISE_FR.test(text);
}

/**
 * Whether this person has actually been hurt in this run.
 *
 * The encounter record is authoritative while a fight is live — it carries the
 * only hit points the game has — and `statuses` carries what a fight left
 * behind once it ends. A memory fact mentioning harm counts too, because that
 * is how an injury from twenty turns ago survives.
 */
function hasBeenHurt(
  story: StoryVersion,
  state: GameState,
  entityId: string,
  memoryText: readonly string[],
): boolean {
  const participant = state.encounter?.participants.find((p) => p.entityId === entityId);
  if (participant && (participant.downed || participant.health < participant.maxHealth)) return true;

  if (entityId === 'player') {
    if (state.player.statuses.length > 0) return true;
  } else {
    const runtime = state.characters.find((c) => c.characterId === entityId);
    if (runtime && runtime.statuses.length > 0) return true;
    // Runtime health starts at the authored `combatant.health` and only ever
    // goes down, so anything below it is damage the engine actually recorded.
    // Comparing against the author's number rather than against null matters:
    // every character starts with a number, so a null check would have read
    // the whole cast as permanently injured and this rule would never fire.
    const full = story.characters.find((c) => c.id === entityId)?.combatant?.health ?? null;
    if (runtime && runtime.health !== null && full !== null && runtime.health < full) return true;
  }

  // Memories are prose the writer wrote, so they phrase an injury any number
  // of ways — "you broke two of his ribs", "the cut over her eye". Grounding
  // is checked loosely on purpose: the cost of missing one is a false alarm on
  // a true fact, which is worse than letting an odd sentence through.
  return memoryText.some(
    (text) =>
      anyInjury(text) ||
      /\b(?:hurt|injur\w+|hit|struck|broke|broken|cut|beat|beaten|wound\w*|bruis\w*|bloodi\w*|blessé\w*|frapp\w+|cass\w+)\b/iu.test(
        text,
      ),
  );
}

/**
 * Whose body the prose is talking about.
 *
 * Position matters, not mere presence: *"He jabs straight in, catching you in
 * the ribs, and you are winded"* contains both a third person and a second
 * person, and the only injury in it is the player's. So the subject is the
 * last one named or pointed at **before** the injury phrase — which is how
 * English attaches it, and the reason this is not a bag-of-pronouns test.
 */
const SUBJECT_MARKER =
  /\b(?:he|him|his|she|her|hers|they|them|their|il|lui|elle|son|sa|ses|leur|leurs)\b|\byou(?:r|rs|rself)?\b|\b(?:tu|toi|ton|ta|tes)\b/giu;

const SECOND_PERSON_WORD = /^(?:you|your|yours|yourself|tu|toi|ton|ta|tes)$/iu;

type Subject = { readonly kind: 'player' } | { readonly kind: 'other' } | null;

function subjectBefore(sentence: string, upTo: number): Subject {
  const head = sentence.slice(0, upTo);
  let last: string | null = null;
  for (const match of head.matchAll(SUBJECT_MARKER)) last = match[0];
  if (!last) return null;
  return SECOND_PERSON_WORD.test(last) ? { kind: 'player' } : { kind: 'other' };
}

/** Where a claim about a body sits in the sentence, or -1. */
function injuryAt(sentence: string): number {
  for (const pattern of [INJURY, INJURY_FR]) {
    const match = pattern.exec(sentence);
    if (match) return match.index;
  }
  return -1;
}

/** Splits on sentence ends, keeping enough context to quote back. */
function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function findInventedHistory(
  blocks: ReadonlyArray<{ type: string; text: string; speakerId?: string | null }>,
  options: {
    readonly story: StoryVersion;
    readonly state: GameState;
    /** Everything the writer was actually given about the past. */
    readonly memoryText: readonly string[];
    readonly playerName: string;
  },
): InventedHistoryHit[] {
  const { story, state, memoryText, playerName } = options;
  const hits: InventedHistoryHit[] = [];

  const present = story.characters
    .filter((c) =>
      state.characters.some(
        (r) => r.characterId === c.id && r.alive && r.locationId === state.player.locationId,
      ),
    )
    .map((c) => ({ id: c.id, name: c.name }));

  const cast = story.characters.map((c) => ({
    id: c.id,
    name: c.name,
    keys: nameKeys(c.name).map((k) => k.toLowerCase()),
  }));

  blocks.forEach((block, blockIndex) => {
    for (const sentence of sentences(block.text)) {
      const lower = sentence.toLowerCase();

      // --- A blow the player never landed ---
      //
      // Never the player's own injury, whatever the possessives say, so this
      // is settled before the positional test below gets a chance to read
      // "your last hit" as a wound on the player.
      if (anyHarmByPlayer(sentence) || anyPriorFight(sentence)) {
        const named = cast.filter((c) => c.keys.some((key) => lower.includes(key)));
        const targets = named.length > 0 ? named : present;
        const open = targets.filter(
          (c) => !authoredHarm(story, c.id) && !hasBeenHurt(story, state, c.id, memoryText),
        );
        if (targets.length > 0 && open.length === targets.length) {
          hits.push({
            blockIndex,
            sentence,
            subject: open.map((c) => c.name).join(' / '),
            reason:
              open.length === 1
                ? `You have not landed a blow on ${open[0]!.name} in this run.`
                : 'Nobody in this scene has taken damage in this run.',
          });
        }
        continue;
      }

      // --- An injury on somebody who has not been hurt ---
      const claim = injuryAt(sentence);
      if (claim >= 0) {
        // Who the sentence is about, in the order the prose makes it clear.
        // A name before the injury beats a name after it, for the same reason
        // the pronoun test is positional.
        const named = cast.filter((c) =>
          c.keys.some((key) => lower.slice(0, claim + 1).includes(key) || lower.includes(key)),
        );
        const beforeClaim = named.filter((c) => c.keys.some((key) => lower.slice(0, claim).includes(key)));
        const subject = subjectBefore(sentence, claim);
        const attributed = beforeClaim.length > 0 ? beforeClaim : subject?.kind === 'player' ? [] : named;

        if (subject?.kind === 'player' && beforeClaim.length === 0) {
          if (!hasBeenHurt(story, state, 'player', memoryText)) {
            hits.push({
              blockIndex,
              sentence,
              subject: playerName,
              reason: 'You have taken no damage in this run.',
            });
          }
        } else if (attributed.length > 0) {
          for (const character of attributed) {
            if (authoredHarm(story, character.id)) continue;
            if (hasBeenHurt(story, state, character.id, memoryText)) continue;
            hits.push({
              blockIndex,
              sentence,
              subject: character.name,
              reason: `${character.name} has taken no damage in this run, and the world does not give them that mark.`,
            });
          }
        } else if (subject?.kind === 'other') {
          // "He's got a split lip from earlier — your doing." The prose names
          // nobody, which is the normal way to write a person already in
          // frame. It is still decidable: if *nobody* standing here has been
          // hurt, then whoever "he" is, he has not been. If any of them has,
          // the sentence is left alone rather than guessed at.
          const candidates = present.filter((c) => !authoredHarm(story, c.id));
          if (
            candidates.length > 0 &&
            candidates.every((c) => !hasBeenHurt(story, state, c.id, memoryText))
          ) {
            hits.push({
              blockIndex,
              sentence,
              subject: candidates.map((c) => c.name).join(' / '),
              reason:
                candidates.length === 1
                  ? `${candidates[0]!.name} has taken no damage in this run.`
                  : 'Nobody in this scene has taken damage in this run.',
            });
          }
        }
      }

      // --- A promise nobody made ---
      if (anyPromise(sentence)) {
        const grounded =
          state.obligations.length > 0 ||
          memoryText.some(
            (text) => anyPromise(text) || /\b(promis\w*|swore|agreed|deal|juré|parole|accord)\b/iu.test(text),
          );
        if (!grounded) {
          hits.push({
            blockIndex,
            sentence,
            subject: playerName,
            reason: 'Nothing in this run records a promise, an oath or a deal.',
          });
        }
      }
    }
  });

  // One finding per sentence is enough for the repair to act on.
  const seen = new Set<string>();
  return hits.filter((hit) => {
    const key = `${hit.blockIndex}:${hit.sentence}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

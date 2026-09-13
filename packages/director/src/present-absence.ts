import { nameKeys } from '@plotbreak/contracts';

/**
 * The writer writing somebody out of the room they are standing in.
 *
 * Caught live in Last Five. The opening beat has Coach Torakawa at the edge of
 * the court with her arms folded, and gives her a line. The player walks over
 * and puts an ultimatum to her. The next beat: *"You look for Coach Torakawa,
 * but there is only an empty folding chair, her jacket slung over it,"* and a
 * teammate saying *"You are talking to the wrong person."*
 *
 * The engine had her present the whole time. Nothing was capped and nothing was
 * hidden — the writer was handed her name, her voice, and what she knows, and
 * chose absence anyway, because an empty chair is an easier beat than a coach
 * who has to answer a hard question.
 *
 * That is the shape of it: absence is not a continuity slip here, it is an
 * escape hatch from a scene the player earned. The prompt now forbids it and
 * this catches what the prompt does not hold.
 */

/**
 * Ways a sentence says the person it is about is not here.
 *
 * Tested only against sentences that name a present character, which is what
 * lets them stay this loose without misreading ordinary prose. "The gym is
 * empty except for Torakawa" is about an empty room and a present person, so
 * the exemptions below matter as much as the patterns.
 */
const ABSENCE = [
  // Contractions included, and the typographic apostrophe with them: the live
  // beat that slipped through the first version of this said "Coach Torakawa
  // isn’t here", which the spelled-out pattern did not match. The negation is
  // required, not optional — "is here" must never match.
  /\b(?:is|are|was|were)(?:n['’]t\s+|\s+(?:not|no longer)\s+)(?:here|there|around|coming)\b/i,
  /\b(?:is|are|was|were)\s+(?:gone|missing|absent|elsewhere|nowhere)\b/i,
  /\bno\s+(?:sign|sight|trace)\s+of\b/i,
  /\b(?:look|looked|looking|search|searched|scan|scanned)\b[^,]{0,40}\bfor\b[^,]{0,40},?\s*but\b/i,
  /\b(?:has|had|have)\s+(?:already\s+)?(?:left|gone)\b/i,
  /\b(?:only|just)\s+(?:an?\s+)?(?:\w+\s+){0,2}empty\s+\w+/i,
  /\bnowhere\s+(?:to\s+be\s+)?(?:seen|found)\b/i,
  // Not here *yet*, which is the same claim pointed at the future.
  //
  // The third distinct wording this bug has arrived in — "Coach Torakawa isn't
  // here", "the platform is empty except for you", and "Mina hasn't come up
  // the platform, not yet" — so this one is written as a shape rather than a
  // phrase: a negated arrival, whatever verb it uses.
  /\b(?:has|have|had)(?:n['’]t|\s+not)\s+(?:yet\s+)?(?:come|arrived|shown|turned|appeared|made\s+it)\b/i,
  /\b(?:is|are|was|were)(?:n['’]t|\s+not)\s+(?:here|there|around)\s+yet\b/i,
  // "But there is no Teo at your elbow." The capital is what keeps this from
  // reading "there is no answer" as somebody having left the room; the sentence
  // is already known to name a present character before we get here.
  /\b(?:there\s+)?(?:is|are|was|were)\s+no\s+\p{Lu}[\p{Ll}\p{M}'’-]+/u,
  // Somewhere else, named. "She is at the meeting" — said of a character the
  // engine has standing at the sink two sentences earlier, in the same beat.
  /\b(?:is|are|was|were)\s+(?:still\s+|away\s+)?at\s+(?:the|her|his|their)\s+\w+/i,
  /\b(?:went|has\s+gone|had\s+gone|stepped)\s+(?:out|off|away|to)\b/i,
];

/** A sentence carrying a third-person subject, for blocks that already name them. */
const PRONOUN = /\b(?:he|she|they|him|her|them|his|their)\b/i;

/** "empty except for her" is a full room of one person, not an absence. */
const PRESENT_ANYWAY = /\b(?:except|save|apart|but)\s+(?:for|from)\b/i;

/**
 * Prose that empties the room without naming anybody in it.
 *
 * Caught live in Seven Days. The player asked Mina about the clock tower and
 * the beat answered "The platform is empty except for you and the sound of
 * your own words." She was standing in front of them. The sentence names
 * nobody, so the per-character check above never looked at it.
 *
 * "Except for you" is the giveaway and the reason the exemption below cannot
 * be a blanket one: "empty except for Torakawa" means she is there, and "empty
 * except for you" means everybody else is gone.
 */
const EMPTIED_ROOM = [
  /\b(?:is|are|was|were|stands?|stood|sits?|sat)\s+(?:completely\s+|quite\s+|otherwise\s+)?empty\s+(?:except|save|but)\s+for\s+(?:you|your)\b/i,
  /\byou\s+are\s+(?:completely\s+|quite\s+|entirely\s+)?alone\b/i,
  /\b(?:there\s+is|there's)\s+no\s?(?:one|body)\s+(?:else\s+)?(?:here|there|around|left)\b/i,
  /\bnobody\s+else\s+(?:is|was)\s+(?:here|there|around)\b/i,
  // Subject first, which the "there is nobody" form above does not cover.
  /\b(?:nobody|no\s?one)\s+(?:is|was)\s+(?:here|there|around|coming)\b/i,
  /\bthe\s+\w+\s+(?:is|was)\s+(?:completely\s+)?deserted\b/i,
];

export interface AbsenceClaim {
  readonly characterId: string;
  readonly name: string;
  readonly blockIndex: number;
  readonly sentence: string;
}

/**
 * Finds a present character the prose has written out of the room.
 *
 * Reported per block so the repair can drop the guilty block rather than the
 * beat, and matched on every word of the name, because prose alternates between
 * "Coach Torakawa" and "Torakawa" in one paragraph — and between "Juno Vale"
 * and "Juno" in every other world we have.
 *
 * This used to match the full name and the *last* word of it. For "Juno Vale"
 * that is "Juno Vale" and "Vale", and prose never says either: it says "Juno".
 * So in Nine Weeks — where the whole cast is first name plus surname — this
 * check could not fire at all, and did not, through twenty-five turns and six
 * distinct absence bugs. The patterns below were never losing; they were never
 * being consulted. `nameKeys` is the shared helper written for exactly this.
 */
export function findAbsenceOfPresent(
  blocks: readonly { readonly text: string }[],
  present: readonly { readonly id: string; readonly name: string }[],
): AbsenceClaim[] {
  const claims: AbsenceClaim[] = [];

  blocks.forEach((block, blockIndex) => {
    const sentences = block.text.split(/(?<=[.!?])\s+/);
    for (const character of present) {
      const names = usableNames(character.name);
      const named = (text: string): boolean =>
        names.some((name) => new RegExp(`\\b${escape(name)}\\b`, 'i').test(text));
      // A block that names somebody and then says "she is at the meeting" is
      // talking about her. Requiring the name in the same *sentence* missed it:
      // Mikoto was written draining a pot at the sink and, four sentences later,
      // placed at a meeting across the district, in one beat.
      const aboutThem = named(block.text);
      const sentence = sentences.find(
        (candidate) =>
          (named(candidate) || (aboutThem && PRONOUN.test(candidate))) &&
          !PRESENT_ANYWAY.test(candidate) &&
          ABSENCE.some((pattern) => pattern.test(candidate)),
      );
      if (!sentence) continue;
      claims.push({
        characterId: character.id,
        name: character.name,
        blockIndex,
        sentence: sentence.trim().slice(0, 140),
      });
    }
  });

  // And the version that names nobody at all.
  if (present.length > 0) {
    blocks.forEach((block, blockIndex) => {
      for (const sentence of block.text.split(/(?<=[.!?])\s+/)) {
        if (!EMPTIED_ROOM.some((pattern) => pattern.test(sentence))) continue;
        claims.push({
          characterId: present[0]!.id,
          name: present.map((c) => c.name).join(', '),
          blockIndex,
          sentence: sentence.trim().slice(0, 140),
        });
        break;
      }
    });
  }

  return claims;
}

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Words from a name that are safe to hunt for in a sentence.
 *
 * `nameKeys` keeps every word, titles included, because a player really does
 * type "ask the captain". Here the keys are matched against *prose*, where a
 * world may legitimately name somebody "The Quiet One" — and hunting for "the"
 * would flag every sentence ever written. The full name is always kept, so a
 * character whose name is nothing but these words still matches as written.
 */
const TOO_GENERIC = new Set(['the', 'and', 'her', 'his', 'one', 'two', 'old', 'new', 'boy', 'man']);

function usableNames(fullName: string): string[] {
  const keys = nameKeys(fullName).filter((key) => !TOO_GENERIC.has(key));
  return keys.length > 0 ? keys : [fullName];
}

/**
 * The same bug pointed the other way: a character the engine does not have in
 * the room, written into it.
 *
 * Caught live in Nine Weeks, twice, and it is the more damaging direction.
 * The player asked Juno to walk down to the dock. The invitation resolved as a
 * targetless action, so the engine moved the player alone — and the writer,
 * handed a dock with nobody on it, covered the hole:
 *
 *   *"Juno's footfalls keep time with yours until they don't."*
 *   *"Juno drags a hand along the top rail as they join you."*
 *
 * The media plan for that beat was `activeCharacterIds: []`. The next turn, the
 * engine's version won and the player was told *"Juno isn't beside you… you
 * can't call them into the golden light by wanting it enough."* One turn said a
 * friend walked to the water with you and the next said you imagined it.
 *
 * Writing somebody out of a room they are in is a continuity slip. Writing
 * somebody into a room they are not in is a promise the next turn has to break,
 * so it is reported at the same severity.
 *
 * Deliberately narrow. Prose is allowed to *mention* an absent character —
 * that is most of what a story about somebody who left is made of. Only
 * assertions of **shared physical space** count, which is why this matches
 * phrases rather than verbs: "beside you", "joins you", "you and Juno".
 */
const CO_PRESENCE = [
  /\b(?:in\s+front\s+of|beside|next\s+to|behind|across\s+from|opposite|alongside)\s+you\b/i,
  /\b(?:joins?|joined|follows?|followed)\s+you\b/i,
  /\bwith\s+yours\b/i,
  /\bboth\s+of\s+you\b/i,
  /\byou\s+both\b/i,
];

/** Any negation in the sentence: the writer describing an absence, correctly. */
// No leading word boundary on the contraction: in "isn't" the n follows an s,
// so \b would never match there — which is the form prose actually uses.
const NEGATED = /(?:n['’]t|\b(?:not|never|nothing|no\s+longer|without)\b)/i;

/** "you and Juno", "Juno and you" — co-presence stated as a pair. */
const pairedWithYou = (name: string): RegExp =>
  new RegExp(`\\byou\\s+and\\s+${escape(name)}\\b|\\b${escape(name)}\\s+and\\s+you\\b`, 'i');


/**
 * A character doing something, right here, right now.
 *
 * `CO_PRESENCE` only caught an absent person being *positioned* next to the
 * player — "beside you", "joins you", "you both". That is one way prose puts
 * somebody in a room and not the common one. Measured across the forty-turn
 * Ace run, **eleven of thirty-eight beats named somebody the engine had
 * somewhere else**, and almost none of them used a co-presence phrase. They
 * said *"Sabo jogs to keep up"*, *"Luffy laughs"*, *"Dadan shouts from the
 * doorway"* — a name and a verb, which is all it takes.
 *
 * So the test is the verb. Present tense is the register this engine writes
 * in — "You break into a run", "Sabo has already climbed" — which makes tense
 * a clean discriminator rather than a guess: a present-tense action verb after
 * a name is that person acting in this scene, and the past tense is somebody
 * remembering or reporting. That is exactly the line the existing allowances
 * draw. "Juno said they'd be at the bar" and "Cass says Juno ducked out" are
 * both about somebody who is not here, and both stay legal.
 *
 * A list rather than a part-of-speech test because the list can be read and
 * argued with, and because the failure mode of a missing verb is one missed
 * contradiction rather than a wrongly deleted beat.
 */
const SCENE_VERBS = [
  'jogs', 'runs', 'walks', 'steps', 'climbs', 'sits', 'stands', 'leans', 'turns', 'looks',
  'watches', 'grins', 'laughs', 'smiles', 'frowns', 'shrugs', 'nods', 'shakes', 'points',
  'reaches', 'grabs', 'takes', 'holds', 'drops', 'throws', 'catches', 'pulls', 'pushes',
  'says', 'asks', 'answers', 'replies', 'shouts', 'calls', 'mutters', 'whispers', 'snorts',
  'sighs', 'adds', 'tells', 'follows', 'keeps', 'moves', 'crouches', 'kneels', 'rolls',
  'swings', 'jumps', 'lands', 'ducks', 'waves', 'waits', 'breathes', 'blinks', 'stares',
  'glances', 'gestures', 'taps', 'kicks', 'hits', 'arrives', 'appears', 'joins', 'comes',
  'goes', 'leads', 'drags', 'carries', 'lifts', 'sets', 'puts', 'opens', 'closes', 'hops',
  'scrambles', 'sprints', 'vaults', 'crosses', 'settles', 'straightens', 'tilts', 'cocks',
];

/**
 * `Sabo jogs`, `Sabo already jogs`, `Sabo is jogging`.
 *
 * One optional adverb between the name and the verb, because that is how far
 * prose puts one, and the progressive form because it is as much a claim about
 * now as the simple present is. The adverbs are listed rather than matched as
 * `\w+ly`, which missed the commonest one of all: "Sabo already grins".
 */
const ADVERB = '(?:\\w+ly|already|still|just|then|now|almost|nearly|barely|only|half|finally)';
const actsHere = (name: string): RegExp =>
  new RegExp(
    `\\b${escape(name)}\\b\\s+(?:${ADVERB}\\s+)?(?:${SCENE_VERBS.join('|')})\\b` +
      `|\\b${escape(name)}\\b\\s+(?:is|are)\\s+(?:${ADVERB}\\s+)?\\w+ing\\b`,
    'i',
  );

export function findPresenceOfAbsent(
  blocks: readonly { readonly text: string }[],
  absent: readonly { readonly id: string; readonly name: string }[],
): AbsenceClaim[] {
  const claims: AbsenceClaim[] = [];

  blocks.forEach((block, blockIndex) => {
    const sentences = block.text.split(/(?<=[.!?])\s+/);
    for (const character of absent) {
      const names = usableNames(character.name);
      const sentence = sentences.find((candidate) => {
        if (!names.some((name) => new RegExp(`\\b${escape(name)}\\b`, 'i').test(candidate))) {
          return false;
        }
        // A sentence that says they are *not* here is the correct prose, not
        // the bug. Any negation is enough: "Juno isn't beside you" contains
        // "beside you" and is exactly what the writer should say when the
        // engine has nobody there. Narrating the shape of an absence is the
        // whole register of a story about somebody who left.
        if (ABSENCE.some((pattern) => pattern.test(candidate))) return false;
        if (NEGATED.test(candidate)) return false;
        return (
          CO_PRESENCE.some((pattern) => pattern.test(candidate)) ||
          names.some((name) => pairedWithYou(name).test(candidate)) ||
          names.some((name) => actsHere(name).test(candidate))
        );
      });
      if (!sentence) continue;
      claims.push({
        characterId: character.id,
        name: character.name,
        blockIndex,
        sentence: sentence.trim().slice(0, 140),
      });
    }
  });

  return claims;
}


// --- Travel the beat narrates and the world did not do -----------------------

/**
 * Prose that moves the player out of the room.
 *
 * Leaving is the claim, not walking: a beat may have somebody cross a clearing,
 * climb a tree or pace a deck without going anywhere. What this looks for is
 * the player being described as *gone from here* — down the ladder and onto the
 * trail, off along the path, out through the door.
 */
const LEAVES_HERE = [
  /\byou (?:leave|left|walk out of|step out of|head out of|climb down (?:from|out of))\b/i,
  /\byou (?:start|set off|head)(?:ed|s)? (?:down|up|off|out|back) (?:the |a |towards? |for )/i,
  /\byou (?:are|'re) (?:moving|walking|heading|going) (?:down|up|off|out|away|back|towards?)\b/i,
  /\byou (?:reach|arrive at|come out (?:on|onto)|make it to) the (?!edge|top of the ladder)/i,
  /\bbehind you, (?:the )?\w+ (?:falls|drops|fades|shrinks)\b/i,
];

export interface TravelClaim {
  readonly blockIndex: number;
  readonly sentence: string;
}

/**
 * Beats that walk the player out of a location the engine did not move them
 * out of.
 *
 * This is the second half of the product's first promise, and the eighty-turn
 * session broke it three times. Turn 49 is the cleanest: the player typed "I
 * decide I am done standing here, and start walking", the beat had them climb
 * down the rope ladder, reach the forest floor and start along the trail — and
 * the footer still said The Treehouse, because no travel clause existed for the
 * engine to commit. Turn 50 then had them standing on the treehouse boards
 * again.
 *
 * `ensureTravelIntent` fixes the case where the player named somewhere. It
 * cannot fix this one, because "start walking" names nowhere and the engine has
 * no way to know which way they went. So the rule is the other way round: if
 * the world did not move, the prose does not get to say it did. The beat can
 * have them stand up, turn, look at the trail, want to go. It cannot have them
 * arrive.
 */
export function findUnlicensedTravel(
  blocks: readonly { readonly type: string; readonly text: string }[],
  options: { readonly travelled: boolean },
): TravelClaim[] {
  if (options.travelled) return [];
  const claims: TravelClaim[] = [];
  blocks.forEach((block, blockIndex) => {
    if (block.type === 'DIALOGUE') return; // somebody *saying* they will go is fine
    for (const sentence of block.text.split(/(?<=[.!?…])\s+/)) {
      if (!LEAVES_HERE.some((pattern) => pattern.test(sentence))) continue;
      claims.push({ blockIndex, sentence: sentence.trim().slice(0, 140) });
      break;
    }
  });
  return claims;
}

import { z } from 'zod';
import type { GameState, StoryVersion, TurnRecord } from '@plotbreak/contracts';
import { charactersPresent } from '@plotbreak/engine';
import type { ModelGateway, ModelInvocation } from '../gateway/types.js';
import { formatStoryTime, minutesFor, transitionLabel } from './clock.js';
import { chooseReaction, parseShown, type ShownReaction } from './reaction.js';
import { NarrativeStreamParser, type StreamedBlock } from './stream-parse.js';

/**
 * LLM_PURE — the experiment.
 *
 * The production path compiles the player's sentence through a regex lexicon
 * and a deterministic engine *before* any model reads it, and then instructs a
 * model to narrate a decision already made. Both of the catastrophic failures
 * in the eighty-turn Ace session began in that compilation step, in rule code,
 * before a model was involved: a pipe slung across the shoulders became an
 * assault, and three explicit walks to a named house never produced a travel
 * action at all.
 *
 * This path deletes the compilation. One frontier model receives the world, the
 * cast, the full player-visible history and **the player's words verbatim**,
 * and writes the next turn. Nothing tells it what the player "really meant",
 * because nothing has decided.
 *
 * What it is allowed to know: story facts. What it is not allowed to know: the
 * old engine's interpretation of the current action. There is no parser result,
 * no beat plan, no check, no state delta, no relationship arithmetic in this
 * prompt. If any of those appear here later, the experiment is invalid.
 */

/**
 * The narrative constitution.
 *
 * Deliberately short. The production writer prompt is ~16,500 characters of
 * accumulated policy — 46% of a 9,000-token prompt, larger than the world, the
 * cast and the scene combined — and almost every line of it exists to
 * compensate for something the engine did upstream. None of that applies here,
 * so none of it is ported. Every rule below has to justify itself on its own.
 */
const CONSTITUTION = [
  'You are the narrator and every character of an interactive anime story. You write the next beat.',
  '',
  'WRITE TO THE PLAYER IN SECOND PERSON. "You grab the branch." "You tell Sabo he is wrong." The player is',
  'not somebody you describe from outside; they are the person this is happening to. Do not narrate them',
  'by name in the third person. Everyone else is described normally and speaks for themselves. Natural',
  'prose still matters more than the rule — not every sentence needs the word "you" in it.',
  '',
  'THE PLAYER\'S WORDS ARE WHAT THE PLAYER CHOSE. Read them literally and in context. Never quietly',
  'replace a clear action with a materially different one: somebody resting a weapon on their shoulder',
  'to talk is not attacking, and somebody saying they are walking to a place is going there. If they',
  'said it, it happens, unless something physically present stops it — and then show the thing that',
  'stopped it.',
  '',
  'REPAIR A HARMLESS MISTAKE, PROTECT A REAL ONE. When the player has an incidental detail wrong but what',
  'they want is obvious, do the thing they meant and correct the detail in passing — the can is under the',
  'flat stone rather than the floorboard, so you remember that, go to the stone, and open it. Never repair',
  'a mistake by bending something that matters: do not move an absent person into the room, undo an injury,',
  'hand over an object they never got, make an unwilling character agree, grant an ability they do not',
  'have, or quietly reverse a decision that already cost them something. Wrong detail, right intention —',
  'fix it and carry on. Wrong about the world itself — the world wins, on the page.',
  '',
  'IF THE PLAYER DELEGATES THE DETAIL, YOU CHOOSE IT AND YOU SHOW IT. "I tell him something I have never',
  'told anyone" means you decide what that is and put it on the page, in their words. Never write "you',
  'say it" and move on — the player must know what their own character just did, or the story has a hole',
  'in it that everything afterwards is built on.',
  '',
  'IF THE PLAYER WITHHOLDS IT, IT STAYS WITHHELD. "Something is bothering me and I do not want to say what"',
  'is a decision not to tell. Play the not-telling, and let it cost something. Do not decide what it was.',
  '',
  'THE WORLD DOES NOT WAIT. Characters have plans, boredom, obligations and tempers. They arrive, leave,',
  'interrupt, get hungry, give up waiting, start things. If a scene has made its point, something',
  'changes: somebody goes, something breaks, the weather turns, a person the player was not thinking',
  'about walks in. You do not need permission from the player to move the world.',
  '',
  'USE SELECTIVE NARRATIVE TIME. Play out in full any moment holding a real choice, an unresolved conflict,',
  'a relationship changing, a discovery, danger, or a consequence landing. Once a routine or a situation is',
  'established and the next ordinary stretch would only repeat it, let time move — hours, days, weeks,',
  'months or years, whatever fits — and pick the story up at the next moment worth playing. Never skip past',
  'a decision the player has not made yet, and never skip in order to reach an event you wanted to get to.',
  'Report the jump you just narrated in timeAdvance.',
  '',
  'ASK YOURSELF EACH BEAT WHETHER THIS ONE IS WORTH PLAYING. The test is not whether you can make the next',
  'few minutes interesting — you always can, and that is the trap. It is whether anything here has changed',
  'that the player would still remember in a week: a decision made, something learned, something between',
  'two people moving. If the last several beats have not produced one of those, the scene is finished.',
  'Close it, move the clock, and open somewhere that matters. A day of childhood is allowed to take thirty',
  'beats. It is not allowed to take three hundred.',
  '',
  'CANON IS PRESSURE, NOT A ROUTE. This world has forces in it that would grind on whether or not the',
  'player existed, and they push. They are not a schedule to be hit, and you never restore one behind the',
  'player\'s back. What the player has changed stays changed, through a time skip as much as anywhere.',
  '',
  'VARY WHERE THE PRESSURE COMES FROM. Not every problem is a big animal and a steep drop. People, money,',
  'class, family, rumour, curiosity, ambition, hunger, weather, boredom, a promise coming due — all of it',
  'is story. If the last few turns pushed with physical danger, push with something that is not.',
  '',
  'NOT EVERY BEAT NEEDS A JOKE. Be funny; this world is funny. But let fear, tenderness, awe, anger,',
  'embarrassment and silence sit there sometimes without being punctured.',
  '',
  'GROWTH IS EARNED. Something that took years to close does not open because the player asked twice.',
  'Let feeling accumulate out of what actually happens. A time skip may compress a routine; it may not',
  'resolve a turning point the player should have lived through.',
  '',
  'PEOPLE ARE WHERE THE STORY LAST PUT THEM. Read the history. If somebody left, they are gone until they',
  'come back, and coming back happens on the page. If the player walked somewhere, they are there.',
  '',
  'NOTHING HAPPENED THAT DID NOT HAPPEN. No injury, promise, fight or past event unless the history',
  'contains it. A missed swing is a missed swing next turn too.',
  '',
  'Characters stay recognisable and keep growing. A character is a way of thinking, not a catchphrase —',
  'if somebody has opened three recent lines the same way, they do not open a fourth that way. Everyone',
  'has a register they drop into when they stop performing; use it when the moment earns it.',
  '',
  'Write vivid, physical, specific prose. Most paragraphs say what is happening; some say what it feels',
  'like; very few say what it means. People talk — a room with people in it is loud. An ordinary beat',
  'runs roughly 150-300 words. Say less when little is happening, and take the room you need when',
  'something genuinely large is.',
  '',
  'THE SUGGESTIONS are three things this player could do next, in their own voice, first person, short',
  'enough to tap. They follow from the scene you just wrote, they mean genuinely different things, and',
  'they never reach for a person or an object that is not there.',
  '',
  'DECIDE EACH BEAT WHETHER THE MOMENT IS STILL RUNNING, and say so in sceneStatus. It is `live` while',
  'somebody is mid-swing or mid-argument, while a question is sitting there waiting for the player to',
  'answer, or while a decision is on the table. It is `settled` once that has played out and what comes',
  'next is a stretch — training, saving up, learning something, working, waiting on somebody else to',
  'move. A larger thread still being open does not make a scene live; half the point of waiting is to',
  'find out.',
  '',
  'WHEN sceneStatus IS `settled`, ONE OF THE THREE SUGGESTIONS OFFERS TO LET TIME PASS. Not the next',
  'five minutes — the stretch: "Over the next few weeks I keep at the reading and put every berry into',
  'the boat fund." "I spend the next few days helping around the mountain and wait to see what Goa does',
  'next." It is an ordinary action like any other and the player can ignore it. When the scene is `live`,',
  'all three stay in the moment. Never offer one as a way to reach an event you wanted to get to.',
  '',
  'This is a 13+ product. Fantasy violence and dark themes are fine. No sexual content. Never break the',
  'fiction to address the player directly.',
].join('\n');

const PureTurn = z
  .object({
    /** The beat, as the player reads it. Each entry is a paragraph or a line of dialogue. */
    narrative: z
      .array(
        z.object({
          /**
           * Who is saying this: a cast id, or `narration` for prose, or
           * `unknown` for a voice the player cannot place.
           *
           * A required choice rather than a nullable id, and that is the whole
           * point. Asked for an optional `speakerId`, the model wrote four-way
           * arguments with every line correct and only one of them attributed —
           * it knew who was talking and simply did not fill the field in. A
           * closed list with no null in it has to be answered for every block.
           */
          speaker: z.string(),
          text: z.string(),
        }),
      )
      .min(1)
      // Generous on purpose. A cap that rejects threw away 29 of 40 good Terra
      // turns once already; over-long output is trimmed after parsing instead,
      // never refused. The bound cannot be a Zod transform — `toJsonSchema`
      // renders one as a bare string and the model then returns one.
      .max(80),
    /** Where the beat ends. An id from the locations given. */
    locationId: z.string(),
    /** Who is physically present at the end of the beat. Ids from the cast. */
    presentCharacterIds: z.array(z.string()).max(20),
    /**
     * The jump the beat just narrated. Optional: a scene that simply continued
     * can leave it out, and a missing field is not worth failing a good turn
     * over. Code turns this into the header; it never decides the skip itself.
     */
    timeAdvance: z
      .object({
        amount: z.number().min(0),
        unit: z.enum(['minutes', 'hours', 'days', 'weeks', 'months', 'years']),
        /** The words used for a skip, e.g. "a few weeks later". */
        phrase: z.string().nullable().optional(),
      })
      .optional(),
    /** One short line for the recap. */
    sceneSummary: z.string(),
    /**
     * Whether the moment in front of the player is still running.
     *
     * `live` — somebody is mid-swing or mid-argument, a question is waiting on
     * an answer, a decision is on the table. `settled` — the scene has run its
     * course and what comes next is a stretch of time rather than the next
     * five minutes.
     *
     * Required, and asked for explicitly for the same reason `speaker` is: left
     * implicit, the judgement never got made and the story stayed inside one
     * afternoon for forty-five turns.
     */
    sceneStatus: z.enum(['live', 'settled']),
    /**
     * Whose face to show, chosen from art that already exists. This never
     * causes an image to be generated — it picks one of eight pre-rendered
     * expressions per character, and an unknown value falls back to neutral.
     */
    reaction: z
      .object({
        characterId: z.string(),
        emotion: z.enum(['neutral', 'warm', 'amused', 'surprised', 'confused', 'annoyed', 'angry', 'worried']),
      })
      .nullable()
      .optional(),
    /** Three things this player might plausibly do next, in their own voice, first person. */
    suggestedResponses: z.array(z.string()).min(1).max(10),
  })
  .strict();

export type PureTurn = z.infer<typeof PureTurn>;

/** Reserved speakers, which are never character ids. */
export const NARRATION = 'narration';
export const UNKNOWN_SPEAKER = 'unknown';

/**
 * The schema the model is actually shown, with this story's cast as an enum.
 *
 * Built per story so `speaker` is a closed list the provider enforces rather
 * than a free string the model can leave blank.
 */
/**
 * Maps whatever the model called somebody onto a cast id.
 *
 * The enum is advertised but not enforced by the provider, and a turn was lost
 * to `"monkey d. luffy"` — the right character, the wrong label. Names and
 * called-names resolve to ids; anything still unrecognised becomes narration
 * rather than a guess, because a wrong portrait is worse than none.
 */
function speakerLabels(story: StoryVersion): Map<string, string> {
  const byLabel = new Map<string, string>();
  for (const character of story.characters) {
    byLabel.set(character.id.toLowerCase(), character.id);
    byLabel.set(character.name.toLowerCase(), character.id);
    if (character.calledName) byLabel.set(character.calledName.toLowerCase(), character.id);
    const last = character.name.split(/\s+/).at(-1);
    if (last && last.length > 2 && !byLabel.has(last.toLowerCase())) byLabel.set(last.toLowerCase(), character.id);
  }
  return byLabel;
}

/** One label to one id, for the streaming path. Same table, same answers. */
function speakerLookup(story: StoryVersion): (raw: string) => string {
  const byLabel = speakerLabels(story);
  return (raw) => {
    const key = raw.trim().toLowerCase();
    if (key === NARRATION || key === UNKNOWN_SPEAKER) return key;
    return byLabel.get(key) ?? NARRATION;
  };
}

function speakerNormalizer(story: StoryVersion): (raw: unknown) => unknown {
  const byLabel = speakerLabels(story);
  return (raw) => {
    if (!raw || typeof raw !== 'object') return raw;
    const turn = raw as { narrative?: unknown };
    if (!Array.isArray(turn.narrative)) return raw;
    return {
      ...turn,
      narrative: turn.narrative.map((block) => {
        if (!block || typeof block !== 'object') return block;
        const item = block as { speaker?: unknown };
        if (typeof item.speaker !== 'string') return { ...item, speaker: NARRATION };
        const key = item.speaker.trim().toLowerCase();
        if (key === NARRATION || key === UNKNOWN_SPEAKER) return { ...item, speaker: key };
        return { ...item, speaker: byLabel.get(key) ?? NARRATION };
      }),
    };
  };
}

function schemaFor(story: StoryVersion): typeof PureTurn {
  const speakers: [string, ...string[]] = [
    NARRATION,
    UNKNOWN_SPEAKER,
    ...story.characters.map((c) => c.id),
  ];
  return PureTurn.extend({
    narrative: z
      .array(z.object({ speaker: z.enum(speakers), text: z.string() }))
      .min(1)
      .max(80),
  }) as unknown as typeof PureTurn;
}

/**
 * The whole player-visible story so far, verbatim.
 *
 * No summarisation. The production path sends four scene summaries and eight
 * dialogue lines; this sends every beat and every action as the player read
 * them. A frontier context window is not the bottleneck, and the eighty-turn
 * session's contradictions were all things a reader of the transcript would
 * have caught.
 */
function conversation(recentTurns: readonly TurnRecord[], cast: Map<string, string>): string {
  const out: string[] = [];
  for (const turn of recentTurns) {
    if (turn.actionText) out.push(`PLAYER: ${turn.actionText}`);
    for (const block of turn.blocks ?? []) {
      const who = block.speakerId ? (cast.get(block.speakerId) ?? block.speakerId) : null;
      out.push(who ? `${who}: ${block.text}` : block.text);
    }
  }
  return out.join('\n\n');
}

/**
 * Everything about the world worth knowing, straight from the bible.
 *
 * **Nothing in here may change between turns.** This block sits in the cached
 * prefix, and the docs are explicit that a content change before a breakpoint
 * prevents prefix matching — so one volatile word here costs the cache for
 * every token after it, which is the whole transcript.
 *
 * That is exactly what was happening: this function used to mark present
 * characters with "— HERE NOW" inside the cast list and end with a "## Right
 * now" block naming the location. Measured on the Astra run, caching stopped
 * dead at 7,066 tokens — the constitution plus the cast list up to the first
 * volatile marker — for every one of forty turns. A controlled probe confirmed
 * the mechanism: identical information with the volatile part moved after the
 * history caches 97% from the second request onward, and left in the prefix it
 * caches nothing except when the volatile string happens to repeat.
 *
 * Where the player is and who is with them now lives at the tail, next to the
 * action, where it belongs.
 */
export function worldBrief(story: StoryVersion): string {
  return [
    `# ${story.title}`,
    story.premise,
    '',
    '## Tone',
    story.rules.toneGuide,
    '',
    '## The player',
    story.protagonist.kind === 'NAMED'
      ? `${story.protagonist.name} (${story.protagonist.pronouns}). ${story.protagonist.description}`
      : 'The player names themselves; see the scene block below.',
    '',
    '## Cast',
    'Everything below is yours to play. A character is the whole of this, not the loudest line of it.',
    ...story.characters.map((c) =>
      [
        `### ${c.name} (id: ${c.id})${c.calledName && c.calledName !== c.name ? ` — called ${c.calledName}` : ''}`,
        c.role,
        c.cardBlurb,
        c.appearance ? `Looks: ${c.appearance}` : '',
        c.speechStyle ? `Speaks: ${c.speechStyle}` : '',
        c.socialStyle ? `Behaves: ${c.socialStyle}` : '',
        c.publicTraits.length ? `Traits: ${c.publicTraits.join('; ')}` : '',
        c.values.length ? `Holds to: ${c.values.join('; ')}` : '',
        c.goals.length ? `Wants: ${c.goals.join('; ')}` : '',
        c.fears.length ? `Afraid of: ${c.fears.join('; ')}` : '',
        c.boundaries.length ? `Will not: ${c.boundaries.join('; ')}` : '',
        // The private half is the difference between a person and a catchphrase,
        // and it was authored years ago and never sent.
        c.hiddenDrives.length ? `Underneath: ${c.hiddenDrives.join('; ')}` : '',
        c.secrets.length
          ? `Keeps back: ${c.secrets.map((secret) => secret.fact).join(' / ')}`
          : '',
        c.voiceSamples.length ? `Sounds like: ${c.voiceSamples.map((v) => `"${v}"`).join(' ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    ),
    '',
    '## Places',
    ...story.locations.map((l) => `- ${l.name} (id: ${l.id}): ${l.description}`),
    '',
    // The objects a story is actually about. Only the ones authored as quest
    // items, because those are the premise: Light's notebook and the rules on
    // its inside cover were sitting in the bible unread, which left the
    // storyteller running a story about a Death Note it had never been told
    // existed. Ordinary scenery stays out of the prompt.
    ...(() => {
      const premise = story.items.filter((item) => item.questItem);
      if (!premise.length) return [];
      return [
        '## Objects the story turns on',
        'These exist whether or not anybody is holding them. Where they are, who has them and who knows',
        'about them is the story\'s business, not a fixed fact.',
        ...premise.map((item) =>
          [`### ${item.name}`, item.description, item.loreText].filter(Boolean).join('\n'),
        ),
        '',
      ];
    })(),
    // Everything from here down is pressure, and the framing matters more than
    // the content: the same material read as a schedule produces a railroad.
    '## Forces in this world',
    'Groups with their own aims, which move whether or not the player is looking.',
    ...story.factions.map((f) => `- ${f.name}: ${f.description}`),
    '',
    '## Threads with pressure behind them',
    'Live questions, not a checklist. Any of them can be pulled on when a scene has run out of road,',
    'and any of them can be made permanently impossible by what the player does.',
    ...story.quests.map((q) => `- ${q.title}: ${q.summary}`),
    '',
    '## Things this world is capable of doing',
    'Possibilities, **not a schedule**. No timing is given because none is fixed. Some need conditions',
    'the player may never create, and some are already impossible because of what the player has done.',
    'Never steer the story to reach one of these, and never quietly put one back after the player has',
    'changed its prerequisites.',
    ...story.worldEvents.map((e) => `- ${e.publicCopy} — ${e.directorNotes}`),
    '',
    '## Where this could end up',
    ...story.endings.slice(0, 12).map((e) => `- ${e.name}: ${e.condition ?? ''}`),
  ].join('\n');
}

/** The volatile half, kept out of the cached prefix. */
function rightNow(story: StoryVersion, state: GameState): string {
  const here = story.locations.find((l) => l.id === state.player.locationId);
  const present = charactersPresent(state).map(
    (c) => story.characters.find((d) => d.id === c.characterId)?.name ?? c.characterId,
  );
  return [
    '## Right now',
    ...(story.protagonist.kind === 'NAMED'
      ? []
      : [`You are ${state.player.identity.displayName} (${state.player.identity.pronouns}).`]),
    `The player is at ${here?.name ?? state.player.locationId}.`,
    `Present: ${present.join(', ') || 'nobody'}.`,
    `It is ${formatStoryTime(state.worldMinute)}.`,
  ].join('\n');
}

export interface PureResult {
  readonly turn: PureTurn;
  readonly promptChars: number;
  readonly historyTurns: number;
  /** What the provider actually billed and cached, straight through. */
  readonly invocation: ModelInvocation;
  /**
   * Exactly what was sent as this turn's user message and what should be replayed
   * as the assistant's. Append-only caching depends on these two strings coming
   * back byte-identical on every later turn, so the caller stores them rather
   * than re-deriving them and hoping.
   */
  readonly rendered: { readonly user: string; readonly assistant: string };
  /** Where the clock ends up, once the narrated jump is applied. */
  readonly nextWorldMinute: number;
  /** The header for this beat, derived from the clock rather than from prose. */
  readonly timeLabel: string;
  /** Shown above the beat when time actually jumped. Null when it did not. */
  readonly transition: string | null;
  /** The face to show, after suppression. Null means show nothing. */
  readonly shown: ShownReaction | null;
}

/** A turn as it was actually sent, replayed verbatim on every later request. */
export interface RenderedTurn {
  readonly user: string;
  readonly assistant: string;
}

/**
 * Which endpoint Pure talks to. Chat Completions stays the default until the
 * Responses path is shown to produce the same story, because the only thing
 * worse than an unmigrated API is a migration that quietly changed the prose.
 */
function apiChoice(): 'chat' | 'responses' {
  return process.env.PLOTBREAK_PURE_API === 'responses' ? 'responses' : 'chat';
}

/** Provider-side compaction threshold in tokens. Unset means no compaction. */
function compactThreshold(): number | undefined {
  const raw = Number(process.env.PLOTBREAK_PURE_COMPACT);
  return Number.isFinite(raw) && raw > 0 ? raw : undefined;
}

export async function narratePure(options: {
  readonly gateway: ModelGateway;
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly model?: string;
  /** Routes the request to the cache that already holds this session's prefix. */
  readonly cacheKey?: string;
  /** Overrides `PLOTBREAK_PURE_API` for a single call, which the A/B harness needs. */
  readonly api?: 'chat' | 'responses';
  /** Overrides `PLOTBREAK_PURE_COMPACT` for a single call. */
  readonly compactThreshold?: number;
  /**
   * A stored `compaction` artifact standing in for the turns it replaced. When
   * present, `recentTurns` should hold only the turns *since* it was made.
   */
  readonly prefixItems?: readonly unknown[];
  /** How long the provider should hold this prefix. */
  readonly cacheRetention?: '24h' | 'in-memory';
  /**
   * `rebuilt` re-assembles one rolling user message every turn, which is what
   * Pure has always done and what makes every request uncacheable. `append`
   * sends the same content as a conversation that only ever grows.
   */
  readonly shape?: 'rebuilt' | 'append';
  /** Required by `append`: the previous turns exactly as they were sent. */
  readonly rendered?: readonly RenderedTurn[];
  /**
   * Called with each narrative block as soon as it closes, while the rest of
   * the turn is still being written. Purely a latency optimisation: the result
   * returned at the end is parsed and validated from the complete document
   * either way, and a listener that throws cannot fail the turn.
   */
  readonly onBlock?: (block: StreamedBlock) => void;
}): Promise<PureResult> {
  const { gateway, story, state, recentTurns, actionText } = options;
  const cast = new Map(story.characters.map((c) => [c.id, c.name]));

  const world = worldBrief(story);
  const history = conversation(recentTurns, cast);

  // The standing instruction. In `rebuilt` it trails the turn; in `append` it
  // has to live in the static header, because anything after the newest user
  // message occupies the slot next turn's assistant beat will take.
  const HOW =
    `Write the next beat as a list of blocks.\n\n` +
    `ONE BLOCK PER SPOKEN LINE. Every time a character from the cast says something out loud, that ` +
    `speech is its own block with speakerId set to their id. Never put a character's spoken words ` +
    `inside a narration block, and never leave speakerId null on a line somebody is saying — a shout, ` +
    `an interruption, a mutter, one word, a line called from offscreen by somebody the player can ` +
    `recognise, all of it. speakerId is null only for narration, or for a voice the player genuinely ` +
    `cannot identify. The player's own speech is narration: it is written to them in second person, ` +
    `not attributed to a cast id.\n\n` +
    `presentCharacterIds is who is physically in the scene at the END of this beat, standing where ` +
    `the player is. Not who was here when it started, not somebody who stayed behind, walked off, or ` +
    `was left at the house, not somebody nearby or just mentioned, not somebody being talked about. ` +
    `If you wrote them leaving or staying put while the player moved, they are not in the list.\n\n` +
    `Pick locationId from the places listed. Suggested responses are in the player's own voice, first ` +
    `person, and follow directly from what you just wrote. Set reaction to the one character whose ` +
    `face the player should see on this beat and the expression it wears, or null when nobody's ` +
    `reaction is the point. The end of each past beat records whose face was shown. Do not pick the ` +
    `same person two beats running unless their expression has genuinely changed, and leave it null on ` +
    `a beat that is mostly action or nobody's reaction in particular — a face on every single turn, ` +
    `usually the same one, reads as a tic rather than a reaction.`;

  const shape = options.shape ?? 'rebuilt';
  const normalizeSpeakers = speakerNormalizer(story);
  const normalizeSpeaker = speakerLookup(story);
  const parser = new NarrativeStreamParser();

  // This turn's user message. Identical text in both shapes; the difference is
  // only whether the transcript is concatenated in front of it.
  const userTurn =
    `${rightNow(story, state)}\n\n` +
    `## The player's action, verbatim\n\n${actionText}\n\n` +
    // Short enough to repeat, and it stays in history byte-for-byte, so it costs
    // one cached line per turn and keeps the constraints next to the output.
    `(JSON only. At most 3 suggestedResponses.)`;

  const messages =
    shape === 'append'
      ? [
          { role: 'system' as const, content: `${CONSTITUTION}\n\n${HOW}` },
          { role: 'system' as const, content: world },
          ...(options.rendered ?? []).flatMap((turn) => [
            { role: 'user' as const, content: turn.user },
            { role: 'assistant' as const, content: turn.assistant },
          ]),
          { role: 'user' as const, content: userTurn },
        ]
      : [
          { role: 'system' as const, content: CONSTITUTION },
          { role: 'system' as const, content: world },
          {
            role: 'user' as const,
            content:
              `## The story so far\n\n${history || (options.prefixItems?.length ? '(continues from the summary above)' : '(this is the opening)')}\n\n` +
              `${userTurn}\n\n` +
              HOW,
          },
        ];

  const result = await gateway.generateStructured('writer_premium', schemaFor(story), messages, {
    maxTokens: 4000,
    temperature: 0.9,
    timeoutMs: 120_000,
    promptCacheKey: options.cacheKey,
    api: options.api ?? apiChoice(),
    compactThreshold: options.compactThreshold ?? compactThreshold(),
    prefixItems: options.prefixItems,
    cacheRetention: options.cacheRetention,
    nativeSchema: shape === 'append',
    normalize: normalizeSpeakers,
    ...(options.onBlock
      ? {
          onTextDelta: (delta: string) => {
            for (const block of parser.push(delta)) {
              // Normalised on the way out so a streamed block is identical to
              // the one the final document produces, which is what lets the
              // caller treat the stream as a prefix of the finished turn.
              try {
                options.onBlock!({ speaker: normalizeSpeaker(block.speaker), text: block.text });
              } catch {
                // A listener failing is a delivery problem, not a story
                // problem. The completed document still produces the turn.
              }
            }
          },
        }
      : {}),
  });

  // Trim to what the client renders. Parsing succeeded; the beat is good even
  // when the model offered a fourth option nobody asked for.
  const turn: PureTurn = {
    ...result.value,
    narrative: result.value.narrative.slice(0, 40),
    presentCharacterIds: result.value.presentCharacterIds.slice(0, 8),
    suggestedResponses: result.value.suggestedResponses.slice(0, 3),
  };

  const nextWorldMinute = state.worldMinute + minutesFor(turn.timeAdvance);
  const timeLabel = formatStoryTime(nextWorldMinute);

  // Decided here rather than in the API, so the marker written into history is
  // what the player actually saw. Recording the proposal instead would let a
  // suppressed face keep suppressing its own successors.
  const shown = chooseReaction(
    turn.reaction ?? null,
    [...(options.rendered ?? [])].reverse().map((past) => parseShown(past.assistant)),
  );

  return {
    turn,
    nextWorldMinute,
    timeLabel,
    transition: transitionLabel(turn.timeAdvance),
    promptChars: JSON.stringify(messages).length,
    historyTurns: shape === 'append' ? (options.rendered?.length ?? 0) : recentTurns.length,
    invocation: result.invocation,
    shown,
    rendered: { user: userTurn, assistant: renderBeat(turn, cast, timeLabel, shown) },
  };
}

export const PURE_CONSTITUTION = CONSTITUTION;
/** Exported for the regression that proves a display name still maps to an id. */
export const PURE_SPEAKER_NORMALIZER = speakerNormalizer;

/**
 * The assistant's half of a turn, replayed on every later request.
 *
 * Rendered from the model's own output rather than from stored blocks, and
 * stored by the caller, so the string is guaranteed byte-identical next turn —
 * the whole append-only cache saving rests on that.
 */
export function renderBeat(
  turn: PureTurn,
  cast: Map<string, string>,
  timeLabel: string,
  shown: ShownReaction | null,
): string {
  const lines = turn.narrative.map((block) => {
    const who = cast.get(block.speaker) ?? null;
    return who ? `${who}: ${block.text}` : block.text;
  });
  return [
    ...lines,
    '',
    `[${timeLabel} · ${turn.locationId} · present: ${turn.presentCharacterIds.join(', ') || 'nobody'}` +
      `${shown ? ` · shown: ${shown.characterId}/${shown.emotion}` : ' · shown: nobody'}]`,
  ].join('\n');
}

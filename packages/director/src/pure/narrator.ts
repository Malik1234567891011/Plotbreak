import { z } from 'zod';
import type { GameState, StoryVersion, TurnRecord } from '@plotbreak/contracts';
import { charactersPresent } from '@plotbreak/engine';
import type { ModelGateway, ModelInvocation } from '../gateway/types.js';

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
  'THE PLAYER\'S WORDS ARE WHAT THE PLAYER CHOSE. Read them literally and in context. Never quietly',
  'replace a clear action with a materially different one: somebody resting a weapon on their shoulder',
  'to talk is not attacking, and somebody saying they are walking to a place is going there. If they',
  'said it, it happens, unless something physically present stops it — and then show the thing that',
  'stopped it.',
  '',
  'IF THE PLAYER DELEGATES THE DETAIL, YOU CHOOSE IT AND YOU SHOW IT. "I tell him something I have never',
  'told anyone" means you decide what that is and put it on the page, in their words. Never write "you',
  'say it" and move on — the player must know what their own character just did, or the story has a hole',
  'in it that everything afterwards is built on.',
  '',
  'THE WORLD DOES NOT WAIT. Characters have plans, boredom, obligations and tempers. They arrive, leave,',
  'interrupt, get hungry, give up waiting, start things. If a scene has made its point, something',
  'changes: somebody goes, something breaks, the weather turns, a person the player was not thinking',
  'about walks in. You do not need permission from the player to move the world.',
  '',
  'PEOPLE ARE WHERE THE STORY LAST PUT THEM. Read the history. If somebody left, they are gone until they',
  'come back, and coming back happens on the page. If the player walked somewhere, they are there.',
  '',
  'NOTHING HAPPENED THAT DID NOT HAPPEN. No injury, promise, fight or past event unless the history',
  'contains it. A missed swing is a missed swing next turn too.',
  '',
  'Characters stay recognisable and keep growing. A character is a way of thinking, not a catchphrase —',
  'if somebody has opened three recent lines the same way, they do not open a fourth that way.',
  '',
  'Write vivid, physical, specific prose. Most paragraphs say what is happening; some say what it feels',
  'like; very few say what it means. People talk — a room with people in it is loud.',
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
          /** A character id from the cast when somebody is speaking, else null. */
          speakerId: z.string().nullable(),
          text: z.string(),
        }),
      )
      .min(1)
      .max(30),
    /** Where the beat ends. An id from the locations given. */
    locationId: z.string(),
    /** Who is physically present at the end of the beat. Ids from the cast. */
    presentCharacterIds: z.array(z.string()).max(8),
    /** "Day 1 · late morning" — free text, for the header. */
    timeDisplay: z.string(),
    /** One short line for the recap. */
    sceneSummary: z.string(),
    /** Three things this player might plausibly do next, in their own voice, first person. */
    suggestedResponses: z.array(z.string()).min(2).max(3),
  })
  .strict();

export type PureTurn = z.infer<typeof PureTurn>;

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
function worldBrief(story: StoryVersion): string {
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
    ...story.characters.map((c) =>
      [
        `### ${c.name} (id: ${c.id})`,
        c.role,
        c.appearance ? `Looks: ${c.appearance}` : '',
        c.speechStyle ? `Speaks: ${c.speechStyle}` : '',
        c.socialStyle ? `Behaves: ${c.socialStyle}` : '',
        c.publicTraits.length ? `Traits: ${c.publicTraits.join(', ')}` : '',
        c.goals.length ? `Wants: ${c.goals.join('; ')}` : '',
        c.fears.length ? `Fears: ${c.fears.join('; ')}` : '',
        c.voiceSamples.length ? `Sounds like: ${c.voiceSamples.map((v) => `"${v}"`).join(' ')}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    ),
    '',
    '## Places',
    ...story.locations.map((l) => `- ${l.name} (id: ${l.id}): ${l.description}`),
    '',
    '## Where this could go',
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
  ].join('\n');
}

export interface PureResult {
  readonly turn: PureTurn;
  readonly promptChars: number;
  readonly historyTurns: number;
  /** What the provider actually billed and cached, straight through. */
  readonly invocation: ModelInvocation;
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
}): Promise<PureResult> {
  const { gateway, story, state, recentTurns, actionText } = options;
  const cast = new Map(story.characters.map((c) => [c.id, c.name]));

  const world = worldBrief(story);
  const history = conversation(recentTurns, cast);

  const messages = [
    { role: 'system' as const, content: CONSTITUTION },
    { role: 'system' as const, content: world },
    {
      role: 'user' as const,
      content:
        `## The story so far\n\n${history || (options.prefixItems?.length ? '(continues from the summary above)' : '(this is the opening)')}\n\n` +
        `${rightNow(story, state)}\n\n` +
        `## The player's action, verbatim\n\n${actionText}\n\n` +
        `Write the next beat. Use character ids from the cast for speakers. ` +
        `Pick locationId from the places listed. presentCharacterIds is who is physically there when ` +
        `the beat ends. Suggested responses are in the player's own voice, first person, and follow ` +
        `directly from what you just wrote.`,
    },
  ];

  const result = await gateway.generateStructured('writer_premium', PureTurn, messages, {
    maxTokens: 4000,
    temperature: 0.9,
    timeoutMs: 120_000,
    promptCacheKey: options.cacheKey,
    api: options.api ?? apiChoice(),
    compactThreshold: options.compactThreshold ?? compactThreshold(),
    prefixItems: options.prefixItems,
    cacheRetention: options.cacheRetention,
  });

  return {
    turn: result.value,
    promptChars: JSON.stringify(messages).length,
    historyTurns: recentTurns.length,
    invocation: result.invocation,
  };
}

export const PURE_CONSTITUTION = CONSTITUTION;

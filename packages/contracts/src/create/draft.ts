import { z } from 'zod';
import {
  ContentDescriptor,
  StoryVersion,
  type EndingDef,
  type StoryRules,
} from '../game/story.js';
import { QualityTier } from '../game/economy.js';

/**
 * The creator's working document.
 *
 * A `StoryVersion` is a large, strict, interlinked object — ids that must
 * resolve, predicates, schedules, attribute blocks. That is the right shape for
 * the engine and the wrong shape for somebody three sentences into an idea, so
 * a draft is its loose twin: everything optional, everything defaulted, nothing
 * cross-referential, and no field the creator would not recognise as a thing
 * they wrote.
 *
 * The bridge is one function, `draftToStoryVersion`, and it is the only place
 * that knows how a draft becomes a world. The contract stays authoritative:
 * publishing parses the result against `StoryVersion` and refuses on failure,
 * so a draft can never smuggle an invalid world into the catalog.
 */

export const DRAFT_TONES = ['warm', 'grim', 'funny', 'tense', 'dreamlike', 'epic'] as const;
export const DraftTone = z.enum(DRAFT_TONES);
export type DraftTone = z.infer<typeof DraftTone>;

export const DRAFT_LENGTHS = ['short', 'medium', 'long'] as const;
export const DraftLength = z.enum(DRAFT_LENGTHS);
export type DraftLength = z.infer<typeof DraftLength>;

/** Whether the story already knows who the player is. Mirrors `Protagonist.kind`. */
export const DRAFT_POVS = ['named', 'blank'] as const;
export const DraftPov = z.enum(DRAFT_POVS);
export type DraftPov = z.infer<typeof DraftPov>;

export const DRAFT_VISIBILITIES = ['PRIVATE', 'UNLISTED', 'PUBLIC'] as const;
export const DraftVisibility = z.enum(DRAFT_VISIBILITIES);
export type DraftVisibility = z.infer<typeof DraftVisibility>;

const short = (max: number) => z.string().max(max).default('');
const lines = (max: number) => z.array(z.string().max(max)).default([]);

/**
 * A person, in the fields `worldBrief` actually reads.
 *
 * The private half — `hiddenDrives`, `secrets`, `boundaries` — is the
 * difference between a person and a catchphrase, so the creator is asked for it
 * rather than left to discover the field exists.
 */
export const DraftCharacter = z
  .object({
    id: z.string(),
    name: z.string().max(60).default(''),
    /** What people call them, when it is not their name. */
    calledName: short(60),
    pronouns: z.string().max(40).default('they/them'),
    /** Their place in the story. "Your older brother", "the shop's owner". */
    role: short(120),
    /** One line for the cast card. */
    cardBlurb: short(240),
    appearance: short(600),
    speechStyle: short(300),
    socialStyle: short(300),
    publicTraits: lines(80),
    values: lines(120),
    goals: lines(160),
    fears: lines(120),
    boundaries: lines(160),
    hiddenDrives: lines(200),
    secrets: lines(300),
    voiceSamples: lines(200),
  })
  .strict();
export type DraftCharacter = z.infer<typeof DraftCharacter>;

export const DraftPlace = z
  .object({
    id: z.string(),
    name: z.string().max(80).default(''),
    description: short(600),
  })
  .strict();
export type DraftPlace = z.infer<typeof DraftPlace>;

export const DraftFaction = z
  .object({ id: z.string(), name: z.string().max(80).default(''), description: short(600) })
  .strict();
export type DraftFaction = z.infer<typeof DraftFaction>;

/** A live question with pressure behind it. Becomes a `QuestDef`. */
export const DraftThread = z
  .object({
    id: z.string(),
    title: z.string().max(120).default(''),
    summary: short(600),
  })
  .strict();
export type DraftThread = z.infer<typeof DraftThread>;

/** Something the world can do on its own. Never a schedule. */
export const DraftWorldEvent = z
  .object({
    id: z.string(),
    /** What a player standing there would see. */
    publicCopy: z.string().max(300).default(''),
    /** What it means, for the storyteller only. */
    directorNotes: short(600),
  })
  .strict();
export type DraftWorldEvent = z.infer<typeof DraftWorldEvent>;

/** An object the story turns on. Ordinary scenery does not belong here. */
export const DraftObject = z
  .object({
    id: z.string(),
    name: z.string().max(80).default(''),
    description: short(600),
    loreText: short(600),
  })
  .strict();
export type DraftObject = z.infer<typeof DraftObject>;

/**
 * A meter, described by what the world is like at each level.
 *
 * OOC asks for a number with a noun on it and a sentence about when it moves.
 * We ask the more useful question — what is different when it is low — because
 * "House Attention: 62/100" tells a storyteller nothing and "the building is
 * staging scenes around the people you care about" tells it what the next beat
 * is.
 */
export const DraftMeter = z
  .object({
    id: z.string(),
    name: z.string().max(40).default(''),
    max: z.number().int().min(1).max(999).default(100),
    start: z.number().int().min(0).max(999).default(50),
    polarity: z.enum(['GOOD_HIGH', 'GOOD_LOW']).default('GOOD_HIGH'),
    bands: z
      .array(
        z
          .object({ upTo: z.number().int(), behaviour: z.string().max(400).default('') })
          .strict(),
      )
      .default([]),
  })
  .strict();
export type DraftMeter = z.infer<typeof DraftMeter>;

/**
 * A place the story could end up, as a card.
 *
 * Rarity is OOC's best idea and it is already in `EndingDef`: it is not a
 * reward tier, it is how far off the common path this is — which is both what
 * the storyteller needs in order to notice the ending is in reach, and what a
 * collection screen is eventually built from.
 */
export const DraftEnding = z
  .object({
    id: z.string(),
    name: z.string().max(60).default(''),
    rarity: z.enum(['COMMON', 'UNCOMMON', 'RARE', 'UNIQUE']).default('COMMON'),
    /** The earliest turn this can be offered. A story that can end on turn three has not been one. */
    minTurn: z.number().int().min(0).max(500).default(10),
    /** When this is the right ending, said as a person would say it. Read, never parsed. */
    condition: short(1000),
    epilogue: short(2000),
    /** Optional nudge when a run is close. */
    hint: short(80),
  })
  .strict();
export type DraftEnding = z.infer<typeof DraftEnding>;

/** A player origin. Becomes an `ArchetypeDef`. */
export const DraftOrigin = z
  .object({
    id: z.string(),
    name: z.string().max(28).default(''),
    role: z.string().max(40).default(''),
    summary: z.string().max(220).default(''),
    playstyle: z.array(z.string().max(24)).default([]),
    blurb: short(600),
  })
  .strict();
export type DraftOrigin = z.infer<typeof DraftOrigin>;

export const DraftPitch = z
  .object({
    text: z.string().max(1500).default(''),
    tone: DraftTone.nullable().default(null),
    length: DraftLength.default('medium'),
    pov: DraftPov.default('blank'),
  })
  .strict()
  .default({ text: '', tone: null, length: 'medium', pov: 'blank' });
export type DraftPitch = z.infer<typeof DraftPitch>;

/**
 * Where a compile has got to.
 *
 * Compiling takes a hundred seconds, and holding an HTTP request open for a
 * hundred seconds from a phone does not work: backgrounding the app kills the
 * task, a tunnel between the handset and the server drops an idle connection,
 * and the client's own error handling reported all of it as "you are offline"
 * to somebody who was not. So the request starts the work and returns, the
 * work writes its result here, and the client watches this field.
 *
 * Lives on the draft rather than in a job table because it is a property of
 * the draft — there is at most one compile per draft, ever — and because the
 * client already polls the draft.
 */
export const CompileState = z
  .object({
    status: z.enum(['idle', 'running', 'done', 'refused', 'failed']).default('idle'),
    startedAt: z.string().nullable().default(null),
    /** The refusal, or what went wrong. Empty otherwise. */
    message: z.string().max(2000).default(''),
  })
  .strict()
  .default({ status: 'idle', startedAt: null, message: '' });
export type CompileState = z.infer<typeof CompileState>;

/**
 * How long a `running` compile is believed before it is treated as lost.
 *
 * Nothing resumes a compile whose process died holding it, so without this a
 * Railway restart at the wrong moment leaves a draft that says "building…"
 * forever and cannot be retried. Generous, because the honest failure is a
 * creator waiting two minutes too long rather than one told to start again
 * while the work is still running.
 */
export const COMPILE_STALE_MS = 6 * 60 * 1000;

export function compileIsStale(compile: CompileState, now = Date.now()): boolean {
  if (compile.status !== 'running' || !compile.startedAt) return false;
  return now - new Date(compile.startedAt).getTime() > COMPILE_STALE_MS;
}

export const StoryDraft = z
  .object({
    draftId: z.string(),
    ownerId: z.string(),
    /** Set once published; a second publish makes a new version of the same story. */
    storyId: z.string().nullable().default(null),
    publishedVersionId: z.string().nullable().default(null),
    publishedAt: z.string().nullable().default(null),
    createdAt: z.string(),
    updatedAt: z.string(),

    pitch: DraftPitch,
    compile: CompileState,

    // 1. Profile
    title: z.string().max(50).default(''),
    /** The card's one-line fantasy. "Be the brother who chose the village." */
    fantasyLabel: z.string().max(42).default(''),
    hook: short(200),
    coverDirection: short(600),

    // 2. World
    premise: short(2400),
    toneGuide: short(1200),
    hardCanon: lines(300),
    intensity: z.enum(['LIGHT', 'MODERATE', 'INTENSE']).default('MODERATE'),
    contentDescriptors: z.array(ContentDescriptor).default([]),

    // 3. Cast
    characters: z.array(DraftCharacter).default([]),

    // 4. Places
    places: z.array(DraftPlace).default([]),
    startingPlaceId: z.string().nullable().default(null),

    // 5. Opening
    protagonistKind: DraftPov.default('blank'),
    protagonistName: short(60),
    protagonistPronouns: short(40),
    protagonistDescription: short(600),
    /** The heading the setup screen uses instead of "Who are you?". */
    setupHeading: short(120),
    origins: z.array(DraftOrigin).default([]),
    opening: short(2000),
    openingSuggestions: z.array(z.string().max(120)).max(3).default([]),
    /** Shown to the player, never sent to the model. OOC calls this the Play Guide. */
    playGuide: short(1000),
    /** Up to three prose samples that set the voice. OOC calls these Plot Examples. */
    styleExamples: z.array(z.string().max(1200)).max(3).default([]),

    // 6. Pressure
    factions: z.array(DraftFaction).default([]),
    threads: z.array(DraftThread).default([]),
    worldEvents: z.array(DraftWorldEvent).default([]),
    objects: z.array(DraftObject).default([]),
    meters: z.array(DraftMeter).default([]),

    // 7. Endings
    endings: z.array(DraftEnding).default([]),

    // 8. Publish
    description: short(2000),
    tags: z.array(z.string().max(30)).max(10).default([]),
    mechanicsChips: z.array(z.string().max(30)).max(6).default([]),
    /** What the creator thinks this is meant to be played at. The player still chooses. */
    recommendedTier: QualityTier.default('VIVID'),
    visibility: DraftVisibility.default('PRIVATE'),
  })
  .strict();
export type StoryDraft = z.infer<typeof StoryDraft>;

/** Everything a client may send to `PATCH /v1/create/drafts/:id`. */
export const StoryDraftPatch = StoryDraft.omit({
  draftId: true,
  ownerId: true,
  storyId: true,
  publishedVersionId: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
}).partial();
export type StoryDraftPatch = z.infer<typeof StoryDraftPatch>;

export function emptyDraft(input: {
  draftId: string;
  ownerId: string;
  now: string;
}): StoryDraft {
  return StoryDraft.parse({
    draftId: input.draftId,
    ownerId: input.ownerId,
    createdAt: input.now,
    updatedAt: input.now,
  });
}

// ---------------------------------------------------------------------------
// Readiness
// ---------------------------------------------------------------------------

export const CREATE_STEPS = [
  'profile',
  'world',
  'cast',
  'places',
  'opening',
  'pressure',
  'endings',
  'publish',
] as const;
export type CreateStep = (typeof CREATE_STEPS)[number];

/** Steps a draft cannot be published without. Mirrors OOC's asterisks. */
export const REQUIRED_STEPS: readonly CreateStep[] = [
  'profile',
  'world',
  'cast',
  'places',
  'opening',
  'endings',
  'publish',
];

export interface DraftIssue {
  readonly step: CreateStep;
  /** A stable key the client turns into localised copy. */
  readonly code: string;
  /** Which entry in a list, when the issue is about one. */
  readonly index?: number;
}

export interface DraftReadiness {
  readonly ready: boolean;
  readonly issues: readonly DraftIssue[];
  /** Steps with at least one issue, in stepper order. */
  readonly blockedSteps: readonly CreateStep[];
}

const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/**
 * Why this draft cannot be published yet.
 *
 * Deliberately generous: it checks that a human wrote something real in the
 * places the narrator reads, not that every optional field is full. The strict
 * gate is `draftToStoryVersion` plus `StoryVersion.parse`, which runs at
 * publish and cannot be talked out of anything.
 */
export function draftReadiness(draft: StoryDraft): DraftReadiness {
  const issues: DraftIssue[] = [];
  const need = (ok: boolean, step: CreateStep, code: string, index?: number) => {
    if (!ok) issues.push(index === undefined ? { step, code } : { step, code, index });
  };

  need(draft.title.trim().length >= 2, 'profile', 'title_too_short');
  need(draft.fantasyLabel.trim().length > 0, 'profile', 'fantasy_label_missing');
  need(draft.hook.trim().length > 0, 'profile', 'hook_missing');

  need(words(draft.premise) >= 60, 'world', 'premise_too_short');
  need(draft.toneGuide.trim().length > 0, 'world', 'tone_missing');

  need(draft.characters.length >= 2, 'cast', 'need_two_characters');
  draft.characters.forEach((c, i) => {
    need(c.name.trim().length > 0, 'cast', 'character_name_missing', i);
    need(c.role.trim().length > 0, 'cast', 'character_role_missing', i);
    need(c.cardBlurb.trim().length > 0, 'cast', 'character_blurb_missing', i);
  });

  need(draft.places.length >= 1, 'places', 'need_one_place');
  draft.places.forEach((p, i) => {
    need(p.name.trim().length > 0, 'places', 'place_name_missing', i);
    need(p.description.trim().length > 0, 'places', 'place_description_missing', i);
  });
  const startingPlace = draft.startingPlaceId ?? draft.places[0]?.id ?? null;
  need(
    Boolean(startingPlace) && draft.places.some((p) => p.id === startingPlace),
    'places',
    'starting_place_unset',
  );

  const openingWords = words(draft.opening);
  need(openingWords >= 30, 'opening', 'opening_too_short');
  need(openingWords <= 400, 'opening', 'opening_too_long');
  if (draft.protagonistKind === 'named') {
    need(draft.protagonistName.trim().length > 0, 'opening', 'protagonist_name_missing');
    need(draft.protagonistDescription.trim().length > 0, 'opening', 'protagonist_description_missing');
  }
  draft.origins.forEach((o, i) => {
    need(o.name.trim().length > 0, 'opening', 'origin_name_missing', i);
    need(o.summary.trim().length > 0, 'opening', 'origin_summary_missing', i);
    need(o.playstyle.length >= 2, 'opening', 'origin_needs_two_tags', i);
  });

  need(draft.endings.length >= 1, 'endings', 'need_one_ending');
  draft.endings.forEach((e, i) => {
    need(e.name.trim().length > 0, 'endings', 'ending_name_missing', i);
    need(e.condition.trim().length > 0, 'endings', 'ending_condition_missing', i);
  });

  need(draft.description.trim().length > 0, 'publish', 'description_missing');
  need(draft.tags.length >= 1, 'publish', 'need_one_tag');

  const blocked = CREATE_STEPS.filter((step) => issues.some((issue) => issue.step === step));
  return { ready: issues.length === 0, issues, blockedSteps: blocked };
}

// ---------------------------------------------------------------------------
// The bridge
// ---------------------------------------------------------------------------

/** 3–18 across the board: a protagonist with no authored build is ordinary. */
const BASELINE_ATTRIBUTES = {
  might: 10,
  agility: 10,
  mind: 10,
  presence: 10,
  resolve: 10,
  arcana: 10,
} as const;

/** Slug-safe id from a name, with the index as the tie-breaker. */
export function draftId(prefix: string, name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40);
  return slug || `${prefix}_${index + 1}`;
}

/**
 * Two tags, because four cards a player cannot compare at a glance is four
 * cards nobody reads.
 *
 * Exported so the compiler pads where the creator can see it and edit it,
 * rather than having the bridge quietly invent a word at publish time. The
 * bridge still pads, as the last line of defence for a hand-edited origin.
 */
export function padPlaystyle(tags: readonly string[]): string[] {
  // A tag that does not fit is thrown away rather than cut. Three attempts at
  // teaching a model to count to 24 produced "Pursue legal contradicti" and
  // "Plan entries, escapes", and a card carrying those is worse than a card
  // carrying two good tags — which is what the floor below guarantees.
  const kept = tags.map((tag) => tag.trim()).filter((tag) => tag.length > 0 && tag.length <= 24);
  const filler = ['Balanced', 'Flexible'].filter((f) => !kept.includes(f));
  return [...kept, ...filler].slice(0, Math.max(2, Math.min(4, kept.length)));
}

export interface CompileOptions {
  readonly storyId: string;
  readonly storyVersionId: string;
  readonly version: number;
  readonly creatorId: string;
  readonly creatorName: string;
  readonly publishedAt: string | null;
}

/**
 * A draft, as the engine and the narrator see it.
 *
 * Every id is derived here rather than authored, because a creator typing ids
 * is a creator typing a reference that does not resolve. The only ids that
 * survive from the draft are the ones the draft itself generated.
 */
export function draftToStoryVersion(draft: StoryDraft, options: CompileOptions): StoryVersion {
  const places = draft.places.length
    ? draft.places
    : [{ id: 'start', name: 'The beginning', description: draft.premise.slice(0, 400) }];
  const startingLocationId =
    (draft.startingPlaceId && places.some((p) => p.id === draft.startingPlaceId)
      ? draft.startingPlaceId
      : null) ?? places[0]!.id;

  const rules: StoryRules = {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: draft.contentDescriptors.includes('ROMANCE'),
    startingLocationId,
    startWorldMinute: 8 * 60,
    startingItems: [],
    hardCanon: draft.hardCanon.filter((line) => line.trim().length > 0),
    toneGuide: draft.toneGuide,
    forkCostCredits: 120,
    loop: null,
    playGuide: draft.playGuide,
    styleExamples: draft.styleExamples.filter((line) => line.trim().length > 0),
  };

  const endings: EndingDef[] = draft.endings.map((e) => ({
    id: e.id,
    name: e.name,
    rarity: e.rarity,
    minTurn: e.minTurn,
    requires: {
      flagsSet: [],
      flagsUnset: [],
      hasItems: [],
      atLocation: null,
      completedEvents: [],
      minRelationship: [],
      minFactionReputation: [],
      beforeWorldMinute: null,
      afterWorldMinute: null,
    },
    condition: e.condition,
    epilogue: e.epilogue,
    hint: e.hint,
    image: null,
  }));

  return StoryVersion.parse({
    id: options.storyVersionId,
    storyId: options.storyId,
    version: options.version,
    title: draft.title,
    openingObligations: [],
    fantasyLabel: draft.fantasyLabel.slice(0, 42),
    hook: draft.hook,
    premise: draft.premise,
    creatorId: options.creatorId,
    creatorName: options.creatorName,
    official: false,
    coverImage: null,
    keyArt: null,
    tags: draft.tags,
    mechanicsChips: draft.mechanicsChips,
    contentDescriptors: draft.contentDescriptors,
    intensity: draft.intensity,
    creatorNote: '',
    rules,
    attributes: BASELINE_ATTRIBUTES,
    skills: [],
    resources: draft.meters.map((m) => ({
      id: m.id,
      name: m.name,
      max: m.max,
      start: Math.min(m.start, m.max),
      regenPerHour: 0,
      polarity: m.polarity,
      displayPriority: 5,
      visible: true,
      zeroStateConsequence: null,
      color: null,
      bands: m.bands.filter((b) => b.behaviour.trim().length > 0),
    })),
    items: draft.objects.map((o) => ({
      id: o.id,
      name: o.name,
      tags: [],
      stackable: false,
      maxStack: 1,
      equipSlot: null,
      attributeModifiers: {},
      skillModifiers: {},
      consumable: null,
      questItem: true,
      droppable: true,
      rarity: null,
      description: o.description,
      loreText: o.loreText,
      icon: null,
    })),
    abilities: [],
    locations: places.map((p, i) => ({
      id: p.id,
      name: p.name,
      shortName: '',
      description: p.description,
      artDirection: '',
      stageImage: null,
      connections: [],
      discoveredByDefault: true,
      mapPosition: { x: (i % 4) * 120, y: Math.floor(i / 4) * 120 },
      ambientSfx: [],
      takeableItems: [],
    })),
    characters: draft.characters.map((c) => ({
      id: c.id,
      name: c.name,
      role: c.role,
      cardBlurb: c.cardBlurb,
      ...(c.calledName.trim() ? { calledName: c.calledName } : {}),
      pronouns: c.pronouns || 'they/them',
      publicTraits: c.publicTraits,
      hiddenDrives: c.hiddenDrives,
      values: c.values,
      fears: c.fears,
      socialStyle: c.socialStyle,
      boundaries: c.boundaries,
      goals: c.goals,
      secrets: c.secrets.map((fact, i) => ({
        id: `${c.id}_secret_${i + 1}`,
        fact,
        visibility: 'NPC_PRIVATE' as const,
      })),
      speechStyle: c.speechStyle,
      voiceSamples: c.voiceSamples,
      appearance: c.appearance,
      homeLocationId: startingLocationId,
    })),
    factions: draft.factions.map((f) => ({
      id: f.id,
      name: f.name,
      description: f.description,
    })),
    quests: draft.threads.map((t) => ({
      id: t.id,
      title: t.title,
      summary: t.summary,
      kind: 'SIDE' as const,
      steps: [{ id: `${t.id}_step_1`, playerCopy: t.summary || t.title }],
    })),
    tendencies: [],
    // Possibilities, not a schedule. Everything a creator writes here is
    // something the world *can* do, so it is placed far enough out that the
    // clock never reaches it on its own and only the storyteller can pull it in.
    worldEvents: draft.worldEvents.map((e, i) => ({
      id: e.id,
      atWorldMinute: 60 * 24 * 365 * (i + 1),
      publicCopy: e.publicCopy,
      directorNotes: e.directorNotes,
    })),
    promises: [],
    endings,
    archetypes: draft.origins.map((o) => ({
      id: o.id,
      name: o.name.slice(0, 28),
      role: o.role.slice(0, 40),
      summary: o.summary.slice(0, 220),
      playstyle: padPlaystyle(o.playstyle),
      blurb: o.blurb,
    })),
    setupFields: [],
    protagonist:
      draft.protagonistKind === 'named'
        ? {
            kind: 'NAMED' as const,
            name: draft.protagonistName,
            pronouns: draft.protagonistPronouns || 'they/them',
            description: draft.protagonistDescription,
            setupHeading: draft.setupHeading,
            portrait: null,
          }
        : {
            kind: 'BLANK' as const,
            name: '',
            pronouns: '',
            description: '',
            setupHeading: draft.setupHeading,
            portrait: null,
          },
    coverDirection: draft.coverDirection,
    opening: draft.opening,
    openingSuggestions: draft.openingSuggestions.slice(0, 3),
    publishedAt: options.publishedAt,
  });
}

/** What the creator dashboard shows for one of their titles. */
export const CreatorTitle = z
  .object({
    draftId: z.string(),
    storyId: z.string().nullable(),
    title: z.string(),
    hook: z.string(),
    coverImage: z.string().nullable(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    visibility: DraftVisibility,
    ready: z.boolean(),
    runs: z.number().int().default(0),
    likes: z.number().int().default(0),
    comments: z.number().int().default(0),
    updatedAt: z.string(),
  })
  .strict();
export type CreatorTitle = z.infer<typeof CreatorTitle>;

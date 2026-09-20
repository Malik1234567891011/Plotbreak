import { z } from 'zod';
import type { StoryVersion, WorldText } from '@plotbreak/contracts';
import { frenchTypography, type Locale } from '@plotbreak/i18n';
import type { ModelGateway } from '../gateway/types.js';

/**
 * Writing a player-made world in the other language.
 *
 * ## Why this exists
 *
 * A creator types in one language and publishes to everybody. Until this, that
 * world reached the other language's shelf exactly as written — a French world
 * sitting in an English Discover, in French. The official catalogue never had
 * this problem because its French is authored by `npm run fr:adapt` into
 * fixture files; a stranger's world has no fixture and nobody to run the
 * script.
 *
 * ## What it produces
 *
 * The same `WorldText` overlay the official worlds use: dotted paths into the
 * story, addressed by **id** rather than index, carrying only prose. Not a
 * second copy of the world. The overlay mechanism already handles falling back
 * to the source for anything absent, which is what makes a partial or failed
 * translation harmless rather than a broken world.
 *
 * ## The tiers
 *
 * `TIER_A` and `TIER_B` are the same classification `infra/scripts/fr-manifest.ts`
 * uses, and that script now imports them from here. One definition: a field's
 * job is a property of where it sits in the schema, and two lists that drift
 * would mean the official catalogue and the player-made one disagree about what
 * a `speechStyle` is for.
 *
 * Tier C — ids, numbers, thresholds, asset keys, and `artDirection`, which is a
 * prompt for an image model trained on English — is everything not matched
 * here, and is deliberately left alone.
 */

/**
 * Style-bearing. The wording is the product.
 *
 * The title travels because covers carry it drawn into the art, per locale, so
 * the label has to say what the picture says.
 */
export const TIER_A: readonly RegExp[] = [
  /^title$/,
  /^hook$/,
  /^fantasyLabel$/,
  /^premise$/,
  /^description$/,
  /^creatorNote$/,
  /^opening$/,
  /^openingSuggestions$/,
  /^rules\.toneGuide$/,
  /^characters\.[^.]+\.(speechStyle|socialStyle|voiceSamples|cardBlurb|publicTraits|topics|role)$/,
  /^archetypes\.[^.]+\.(name|blurb|summary|playstyle)$/,
  /^endings\.[^.]+\.(title|name|epilogue|summary)$/,
  /^abilities\.[^.]+\.name$/,
  /^locations\.[^.]+\.(name|shortName)$/,
  /^items\.[^.]+\.name$/,
  /^mechanicsChips$/,
];

/** Semantic. The model needs the meaning; nothing here shapes a voice. */
export const TIER_B: readonly RegExp[] = [
  /^rules\.hardCanon$/,
  /^characters\.[^.]+\.(hiddenDrives|values|fears|boundaries|goals|appearance|visualHook)$/,
  /^characters\.[^.]+\.secrets\.[^.]+\.(fact|revealHint)$/,
  /^locations\.[^.]+\.description$/,
  /^items\.[^.]+\.description$/,
  /^abilities\.[^.]+\.description$/,
  /^skills\.[^.]+\.(name|description)$/,
  /^quests\.[^.]+\./,
  /^factions\.[^.]+\./,
];

export type Tier = 'A' | 'B';

export function tierFor(path: string): Tier | null {
  if (TIER_A.some((pattern) => pattern.test(path))) return 'A';
  if (TIER_B.some((pattern) => pattern.test(path))) return 'B';
  return null;
}

export interface TranslatableField {
  readonly path: string;
  readonly tier: Tier;
  readonly source: string | readonly string[];
}

/**
 * Proper nouns never travel.
 *
 * `STORY_AUDIT.md` §2: `Juno Vale` is `Juno Vale` in Paris. A character's or a
 * location's *name* is identity, and translating it makes the world a different
 * world — which is why `characters.*.name` is absent from Tier A while
 * `characters.*.role` ("your older sister") is in it. Locations are the
 * exception the audit allows, because "The lamp room" is a description wearing
 * a name.
 */
const NEVER: readonly RegExp[] = [/^characters\.[^.]+\.(name|calledName)$/, /^factions\.[^.]+\.name$/];

/**
 * Walk a story and collect everything with words in it.
 *
 * Arrays of objects are addressed by `id` so that reordering the cast cannot
 * silently reassign somebody's voice to somebody else — the same rule the
 * overlay format is built on.
 */
export function translatableFields(story: StoryVersion): TranslatableField[] {
  const found: TranslatableField[] = [];

  const visit = (value: unknown, path: string): void => {
    if (value === null || value === undefined) return;

    if (typeof value === 'string') {
      if (value.trim().length === 0) return;
      const tier = tierFor(path);
      if (tier && !NEVER.some((p) => p.test(path))) found.push({ path, tier, source: value });
      return;
    }

    if (Array.isArray(value)) {
      // An array of plain strings is one field, not many: `hardCanon` is a
      // list of sentences that belong together and read better translated
      // together.
      if (value.every((entry) => typeof entry === 'string')) {
        if (value.length === 0) return;
        const tier = tierFor(path);
        if (tier) found.push({ path, tier, source: value as readonly string[] });
        return;
      }
      for (const entry of value) {
        const id = (entry as { id?: unknown })?.id;
        if (typeof id === 'string') visit(entry, `${path}.${id}`);
      }
      return;
    }

    if (typeof value === 'object') {
      for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
        visit(entry, path ? `${path}.${key}` : key);
      }
    }
  };

  visit(story, '');
  return found;
}

// ---------------------------------------------------------------------------
// Asking the model
// ---------------------------------------------------------------------------

const Translated = z
  .object({
    fields: z.array(
      z.object({
        path: z.string(),
        /** A string field comes back as one string; a list comes back as a list. */
        text: z.union([z.string(), z.array(z.string())]),
      }),
    ),
  })
  .strict();

const LANGUAGE: Record<Locale, string> = { en: 'English', fr: 'French' };

/**
 * How many fields go in one request.
 *
 * Tier A is small on purpose, for the reason `fr-adapt` gives: a model asked
 * for twelve voices at once writes twelve variations of one voice, which is the
 * homogenisation the whole exercise exists to avoid. Tier B is large because
 * nothing in it competes for the same attention.
 */
const BATCH: Record<Tier, number> = { A: 10, B: 40 };

function brief(tier: Tier, from: Locale, to: Locale, story: StoryVersion): string {
  const shared = [
    `You are adapting an interactive fiction world from ${LANGUAGE[from]} into ${LANGUAGE[to]}.`,
    `The world is called "${story.title}". Its tone: ${story.rules.toneGuide}`,
    '',
    'Rules that are not negotiable:',
    '- Proper nouns never travel. Character names, place names and item names stay exactly as they are.',
    '- Return every path you were given, with the same shape: a string for a string, a list for a list.',
    '- Never add, explain, or soften. This is the same world, in another language.',
    '- No quotation marks around the whole value, and no markdown.',
  ];

  const styled =
    tier === 'A'
      ? [
          '',
          'These fields are style-bearing: the wording is the product. Write them as a native',
          `${LANGUAGE[to]} author would have written them if the other language had never existed.`,
          'Not a translation that reads translated — the same effect, reached the way this language reaches it.',
        ]
      : [
          '',
          'These fields carry meaning rather than voice. Accurate, idiomatic and unfussy.',
        ];

  const french =
    to === 'fr'
      ? [
          '',
          'French specifics: address the player as **tu**, never vous. Sentence case, not Title Case.',
          'Zero is singular. Use typographic apostrophes and proper accents.',
        ]
      : [];

  return [...shared, ...styled, ...french].join('\n');
}

export interface TranslationResult {
  readonly overlay: WorldText;
  /** Fields the model did not return. Absent paths fall back to the source. */
  readonly missing: readonly string[];
}

/**
 * Write one world into one other language.
 *
 * Partial results are a success, not a failure: the overlay falls back to the
 * source for anything absent, so a world that came back missing three fields is
 * a world that is 97% translated rather than one that is broken. Only a total
 * failure throws, and the caller retries that.
 */
export async function translateStory(options: {
  readonly gateway: ModelGateway;
  readonly story: StoryVersion;
  readonly from: Locale;
  readonly to: Locale;
}): Promise<TranslationResult> {
  const { gateway, story, from, to } = options;
  const fields = translatableFields(story);
  const text: Record<string, string | readonly string[]> = {};
  const missing: string[] = [];

  for (const tier of ['A', 'B'] as const) {
    const ofTier = fields.filter((field) => field.tier === tier);
    for (let start = 0; start < ofTier.length; start += BATCH[tier]) {
      const batch = ofTier.slice(start, start + BATCH[tier]);
      const payload = batch.map((field) => ({ path: field.path, text: field.source }));

      let answer: z.infer<typeof Translated>;
      try {
        const result = await gateway.generateStructured(
          tier === 'A' ? 'writer_premium' : 'writer_standard',
          Translated,
          [
            { role: 'system', content: brief(tier, from, to, story) },
            { role: 'user', content: JSON.stringify({ fields: payload }, null, 2) },
          ],
        );
        answer = result.value;
      } catch {
        // One batch failing is not the world failing. Its paths simply stay
        // absent, and the overlay falls back to the source for them.
        missing.push(...batch.map((field) => field.path));
        continue;
      }

      const byPath = new Map(answer.fields.map((field) => [field.path, field.text]));
      for (const field of batch) {
        const value = byPath.get(field.path);
        if (value === undefined) {
          missing.push(field.path);
          continue;
        }
        // Shape has to match, or a list field becomes one long string on screen.
        const sourceIsList = Array.isArray(field.source);
        if (sourceIsList !== Array.isArray(value)) {
          missing.push(field.path);
          continue;
        }
        text[field.path] = to === 'fr' ? applyTypography(value) : value;
      }
    }
  }

  return { overlay: { storyId: story.storyId, text }, missing };
}

/** French spacing and apostrophes, the same pass `fr:adapt` runs on authored text. */
function applyTypography(value: string | string[]): string | string[] {
  return Array.isArray(value) ? value.map(frenchTypography) : frenchTypography(value);
}

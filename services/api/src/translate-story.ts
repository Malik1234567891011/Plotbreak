import type { StoryVersion } from '@plotbreak/contracts';
import { LOCALES, type Locale } from '@plotbreak/i18n';
import { translateStory } from '@plotbreak/director';
import type { AppContext } from './context.js';
import { reletterCover, writeWebp } from './create-art.js';
import type { StoryTextRow } from './repo/types.js';

/**
 * Putting a player-made world into the other language.
 *
 * A creator types in one language and publishes to everybody, so without this a
 * French world sits on the English shelf in French. The official catalogue
 * never had the problem: its French is authored by `npm run fr:adapt` into
 * fixture files, and nobody is going to run that for a stranger's world at two
 * in the morning.
 *
 * Three properties this is built around:
 *
 *  - **Never blocks a publish.** The world goes live in the language it was
 *    written in; the overlay lands when it lands. `localizeStory` falls back to
 *    the source for anything absent, so "not translated yet" and "translated
 *    except three fields" are the same harmless shape.
 *  - **Per version, not per story.** A run pins a `story_version_id`, so a
 *    session started on v1 keeps reading v1's French after the creator
 *    publishes v2.
 *  - **The cover follows the title.** Covers carry the title drawn into them,
 *    per locale. A world whose French title arrives an hour after publishing
 *    needs its French cover re-set, which is why the untitled art is kept.
 */

/**
 * How many times a translation is attempted before it is left alone.
 *
 * A world that fails three times is failing for a reason retrying will not fix
 * — a model that will not touch the premise, most likely — and a sweep that
 * keeps paying for it forever is worse than a world that reads in one language.
 */
export const MAX_TRANSLATION_ATTEMPTS = 3;

/**
 * Re-letter the cover for one language.
 *
 * Covers carry the title drawn into the art, so a French shelf needs a French
 * cover — the same picture with the lettering swapped, which is exactly how
 * `docs/covers-v4/RECIPE.md` makes the official ones. It can only happen once
 * the translated title exists, which is here rather than at draw time.
 *
 * Only for art we drew. An uploaded picture is the creator's own photograph and
 * has no lettering to swap.
 */
async function reletterFor(
  ctx: AppContext,
  story: StoryVersion,
  locale: Locale,
  translatedTitle: string,
): Promise<boolean> {
  const sourceKey = story.coverImage;
  if (!sourceKey || !ctx.mediaGateway) return false;
  // An upload never went through the cover prompt, so there is no logo in it.
  if (!sourceKey.startsWith('generated/') && !sourceKey.endsWith('/cover')) return false;
  // A title the translator left alone is the same lettering. Nothing to redraw,
  // and `localizeStory` falls back to this cover anyway.
  if (translatedTitle.trim() === story.title.trim()) return false;

  const assetKey = `${sourceKey}.${locale}`;
  const bytes = await reletterCover({
    gateway: ctx.mediaGateway,
    story,
    sourceKey,
    from: story.title,
    to: translatedTitle,
    assetKey,
  });
  if (!bytes) return false;
  await writeWebp(bytes, assetKey);
  return true;
}

/** Every language this world is not already written in. */
export function targetLocales(story: StoryVersion): Locale[] {
  return LOCALES.filter((locale) => locale !== story.sourceLocale) as Locale[];
}

/**
 * Mark what a newly published version owes, without doing any of it.
 *
 * Written inside the publish so the retry sweep has something to find. A row
 * that never turns `ready` is the only record that a translation was owed at
 * all — the alternative is diffing the catalogue against itself to notice.
 */
export async function markTranslationsPending(ctx: AppContext, story: StoryVersion): Promise<void> {
  for (const locale of targetLocales(story)) {
    await ctx.repo
      .putStoryText({
        storyVersionId: story.id,
        locale,
        status: 'pending',
        text: {},
        missing: [],
        attempts: 0,
        error: null,
      })
      .catch(() => undefined);
  }
}

/**
 * Translate one version into one language, and record the outcome.
 *
 * Returns whether anything usable came back. A partial result counts: the
 * overlay falls back per field, so ninety per cent translated is ninety per
 * cent better than nothing.
 */
export async function translateInto(
  ctx: AppContext,
  story: StoryVersion,
  locale: Locale,
  previous?: StoryTextRow,
): Promise<boolean> {
  const attempts = (previous?.attempts ?? 0) + 1;
  if (!ctx.modelGateway) return false;

  try {
    const { overlay, missing } = await translateStory({
      gateway: ctx.modelGateway,
      story,
      from: story.sourceLocale as Locale,
      to: locale,
    });

    const translated = Object.keys(overlay.text).length;
    if (translated === 0) throw new Error('the model returned nothing usable');

    await ctx.repo.putStoryText({
      storyVersionId: story.id,
      locale,
      // `ready` with a short `missing` list is the normal good outcome, not a
      // compromise: those paths simply read in the source language.
      status: 'ready',
      text: overlay.text,
      missing,
      attempts,
      error: null,
    });

    // The cover follows the title: the shelf in this language now wants one
    // with these words on it. Best-effort — a world whose cover could not be
    // re-lettered falls back to the source cover, which is what it did before.
    const title = overlay.text['title'];
    if (typeof title === 'string') {
      await reletterFor(ctx, story, locale, title).catch(() => undefined);
    }
    return true;
  } catch (error) {
    await ctx.repo
      .putStoryText({
        storyVersionId: story.id,
        locale,
        status: attempts >= MAX_TRANSLATION_ATTEMPTS ? 'failed' : 'pending',
        text: previous?.text ?? {},
        missing: previous?.missing ?? [],
        attempts,
        error: (error as Error).message.slice(0, 500),
      })
      .catch(() => undefined);
    return false;
  }
}

/**
 * Start the work for a version that has just been published.
 *
 * Detached, like a compile: publishing answers immediately and the world is
 * live and playable in the language it was written in the whole time.
 */
export function translateInBackground(ctx: AppContext, story: StoryVersion): void {
  void (async () => {
    for (const locale of targetLocales(story)) {
      await translateInto(ctx, story, locale);
    }
  })();
}

/**
 * Pick up what was never finished.
 *
 * A process that dies mid-translation leaves a `pending` row and nothing to
 * resume it, and the publish that created it is long gone. This is what makes a
 * failed translation a delay rather than a permanent state.
 */
export async function sweepPendingTranslations(ctx: AppContext, limit = 5): Promise<number> {
  const pending = await ctx.repo.listPendingStoryText(limit).catch(() => []);
  let done = 0;
  for (const row of pending) {
    if (row.attempts >= MAX_TRANSLATION_ATTEMPTS) continue;
    const story = await ctx.repo.getStoryVersion(row.storyVersionId);
    if (!story) continue;
    if (await translateInto(ctx, story, row.locale, row)) done += 1;
  }
  return done;
}

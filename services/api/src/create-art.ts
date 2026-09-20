import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { draftToStoryVersion, type StoryDraft, type StoryVersion } from '@plotbreak/contracts';
import {
  coverTitleSwapPrompt,
  generatedCoverPrompt,
  keyArtPrompt,
  MediaGatewayError,
  type ImagePromptSpec,
  type MediaGateway,
} from '@plotbreak/director';
import { ownerFolder } from './create-uploads.js';

/**
 * Drawing a cover for a world nobody drew one for.
 *
 * A story reaches Discover only with a cover, and a creator is not required to
 * make one — so something has to, and it has to land on a shelf of twenty-five
 * v4 covers without looking like a different product.
 *
 * Those covers have the title **drawn into the illustration** as a bespoke
 * logo, and their French twins are the same picture handed back to an image
 * model with the lettering swapped. That is what this does. The one step of
 * `docs/covers-v4/RECIPE.md` that cannot be reproduced is its last one — a
 * person looking at each output and checking the spelling — so the lettering is
 * read back off the finished image and compared instead, with one retry.
 */

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const SEED_ROOT = resolve(REPO_ROOT, 'infra/seed/assets');
const ASSET_ROOT = process.env.ASSET_ROOT ?? SEED_ROOT;
/** Where to look, in order — the arrangement `media-routes.ts` serves from. */
const READ_ROOTS: readonly string[] = ASSET_ROOT === SEED_ROOT ? [ASSET_ROOT] : [ASSET_ROOT, SEED_ROOT];

export interface DraftArt {
  readonly coverImage: string;
  /** Null when the cover was drawn and the banner was not. */
  readonly keyArtImage: string | null;
}

/**
 * Where a drawn asset goes.
 *
 * Alongside uploads rather than under `<storyId>/cover`, which is where
 * official art lives, for two reasons. A draft has no story id until it is
 * published, and `/media/*` serves everything `immutable` for a year — so a
 * stable key would mean a creator who asks for another cover keeps being shown
 * the first one. A fresh id per draw is what makes "draw me another" work.
 */
function artKey(draft: StoryDraft, ownerId: string, kind: 'cover' | 'key'): string {
  return `generated/${ownerFolder(ownerId)}/${draft.draftId}/${kind}_${randomUUID().slice(0, 12)}`;
}

/**
 * A story to hang a prompt on.
 *
 * The story id is stable per draft because the cover direction picks its
 * staging, colour key and logo style by hashing it — that is variety *between*
 * worlds, and re-rolling it on every draw would make two covers for one world
 * look like covers for two. The version id is fresh every time, because it is
 * what the prompt's seed is built from, and a creator asking for another cover
 * is asking for a different one.
 */
function provisionalStory(draft: StoryDraft, creatorId: string, creatorName: string): StoryVersion {
  return draftToStoryVersion(draft, {
    storyId: draft.storyId ?? `story_draft_${draft.draftId}`,
    storyVersionId: `sv_draw_${randomUUID().replace(/-/g, '').slice(0, 16)}`,
    version: 1,
    creatorId,
    creatorName,
    publishedAt: new Date().toISOString(),
  });
}

export async function writeWebp(bytes: Buffer | Uint8Array, assetKey: string): Promise<void> {
  // WebP rather than the PNG official art is stored as, because there is no
  // optimisation pass behind this one: `optimize-art` is something a person
  // runs over the seed directory, and nobody runs it after a stranger
  // publishes a world. `/media/*` prefers `.webp` anyway.
  const encoded = await sharp(Buffer.from(bytes)).webp({ quality: 82 }).toBuffer();
  const path = join(ASSET_ROOT, `${assetKey}.webp`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, encoded);
}

/** The first root that actually has this asset. */
export function findAsset(assetKey: string): string | null {
  for (const root of READ_ROOTS) {
    const path = join(root, `${assetKey}.webp`);
    if (existsSync(path)) return path;
  }
  return null;
}

/**
 * Is the title on this cover actually the title?
 *
 * Compared on letters alone. A read-back `LA CHAMBRE 314` against an expected
 * `La Chambre 314` is a pass; `LA CHANBRE 314` is not. Accents are folded
 * because the reader is less reliable about them than the drawer is, and a
 * wrong accent is a far smaller problem than a wrong word.
 */
export function titleMatches(read: string, expected: string): boolean {
  const normalize = (value: string): string =>
    value
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');
  const want = normalize(expected);
  if (want.length === 0) return true;
  return normalize(read).includes(want);
}

/**
 * Generate, read the lettering back, and try once more if it is wrong.
 *
 * Two attempts rather than more: a model that has misspelt a title twice is
 * usually being asked for something it cannot set — very long, or dense with
 * accents — and a third go is likelier to cost money than to fix it. `spelled`
 * tells the caller which case it got.
 */
async function drawTitled(
  gateway: MediaGateway,
  spec: ImagePromptSpec,
  assetKey: string,
  title: string,
): Promise<{ bytes: Buffer; spelled: boolean }> {
  let last: Buffer | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const asset = await gateway.generateImage({ ...spec, assetKey });

    // Spec §19.5 — nothing reaches a player without passing acceptance. A cover
    // is the most public surface in the product, so this is not skippable even
    // though the prompt is ours rather than the creator's.
    const verdict = await gateway.moderateMedia(asset);
    if (!verdict.approved) {
      throw new MediaGatewayError(verdict.reason ?? 'rejected', 'REJECTED', false);
    }

    last = Buffer.from(asset.bytes);
    // A reader that fails is not a cover that failed. Keep the art.
    const read = await gateway.readText(asset.bytes).catch(() => '');
    if (read === '' || titleMatches(read, title)) return { bytes: last, spelled: true };
  }

  return { bytes: last!, spelled: false };
}

/**
 * Is the old title still sitting under the new one?
 *
 * The failure `docs/covers-v4/RECIPE.md` records from batch A: when the new
 * title is longer, the model keeps the old glyphs underneath and draws the new
 * ones over them. Both sets of words then read back.
 *
 * Skipped entirely when the old title is *part of* the new one — a title that
 * keeps a proper noun, or any case where one contains the other. There, finding
 * the old words proves nothing, and treating it as a failure would throw away a
 * cover that is perfectly correct.
 */
function leftBehind(read: string, from: string, to: string): boolean {
  if (titleMatches(to, from)) return false;
  return titleMatches(read, from);
}

/**
 * The same picture, re-lettered into another language.
 *
 * Returns null when it could not be done — no source on disk, a provider that
 * refused, or lettering that came back wrong twice. Null means that language
 * keeps falling back to the source cover, which is what it did before any of
 * this existed and is the right thing to degrade to.
 */
export async function reletterCover(options: {
  readonly gateway: MediaGateway;
  readonly story: StoryVersion;
  readonly sourceKey: string;
  readonly from: string;
  readonly to: string;
  readonly assetKey: string;
}): Promise<Buffer | null> {
  const { gateway, story, sourceKey, from, to, assetKey } = options;
  const path = findAsset(sourceKey);
  if (!path) return null;

  // The edits endpoint wants a PNG; what is on disk is the WebP we serve.
  const source = await sharp(await readFile(path)).png().toBuffer();
  const spec = coverTitleSwapPrompt(story, from, to);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    let asset;
    try {
      asset = await gateway.editImage({ ...spec, assetKey }, source);
    } catch {
      continue;
    }
    const verdict = await gateway.moderateMedia(asset);
    if (!verdict.approved) continue;

    const read = await gateway.readText(asset.bytes).catch(() => '');
    if (read === '') return Buffer.from(asset.bytes);
    if (titleMatches(read, to) && !leftBehind(read, from, to)) return Buffer.from(asset.bytes);
  }
  return null;
}

/**
 * Draw a cover, and a banner if the cover worked.
 *
 * Only the source language is drawn here. The other one needs the translated
 * title, which does not exist until the world is published and translated, so
 * it is re-lettered then — see `translate-story.ts`.
 *
 * The banner is best-effort on purpose. `StoryDetailScreen` renders
 * `keyArt ?? coverImage`, so a world with a cover and no banner looks slightly
 * worse, while a world with neither cannot be published at all. It carries no
 * title: the story page prints one as text directly over it.
 */
export async function drawDraftArt(options: {
  readonly draft: StoryDraft;
  readonly gateway: MediaGateway;
  readonly creatorId: string;
  readonly creatorName: string;
}): Promise<DraftArt> {
  const { draft, gateway, creatorId, creatorName } = options;
  const story = provisionalStory(draft, creatorId, creatorName);

  const coverImage = artKey(draft, creatorId, 'cover');
  const cover = await drawTitled(
    gateway,
    generatedCoverPrompt(story, story.title),
    coverImage,
    story.title,
  );
  await writeWebp(cover.bytes, coverImage);

  const keyArtImage = artKey(draft, creatorId, 'key');
  try {
    const banner = await gateway.generateImage({ ...keyArtPrompt(story), assetKey: keyArtImage });
    const verdict = await gateway.moderateMedia(banner);
    if (!verdict.approved) throw new MediaGatewayError('rejected', 'REJECTED', false);
    await writeWebp(banner.bytes, keyArtImage);
    return { coverImage, keyArtImage };
  } catch {
    return { coverImage, keyArtImage: null };
  }
}

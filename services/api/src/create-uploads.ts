import { createHash, randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

/**
 * Storing a picture somebody uploaded.
 *
 * Separate from `media-routes.ts`, which serves and generates *our* art. The
 * difference is not where the bytes go — both end up under `ASSET_ROOT` and
 * are served by the same route — it is that nothing here may be trusted, and
 * keeping that in its own file makes the difference hard to forget.
 */

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const SEED_ROOT = resolve(REPO_ROOT, 'infra/seed/assets');
const ASSET_ROOT = process.env.ASSET_ROOT ?? SEED_ROOT;

/** Eight megabytes, matching the limit the client shows. */
export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;

/**
 * What a card actually needs.
 *
 * A cover is shown at roughly 2:3 and a portrait square, both a few hundred
 * points wide. Storing the original means serving four megabytes to draw
 * something the size of a thumb.
 */
const SIZES = {
  cover: { width: 1005, height: 1490 },
  character: { width: 768, height: 768 },
} as const;

/**
 * The format, from the bytes rather than from what the client said it was.
 *
 * A content type in a request body is a claim. Magic bytes are evidence, and
 * the only two formats worth accepting are the two a phone produces.
 */
export function imageFormat(bytes: Buffer): 'image/jpeg' | 'image/png' | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a
  ) {
    return 'image/png';
  }
  return null;
}

/**
 * Re-encode, strip, and write.
 *
 * `sharp` drops metadata unless told to keep it, which is the behaviour we
 * want and are relying on: a phone photo carries GPS, and a creator publishing
 * their cover has not thought about telling strangers where they live.
 * `withMetadata()` must never appear in this file.
 *
 * `fit: 'cover'` rather than `'contain'` because a card has a shape and a
 * letterboxed photo in it looks like a mistake; the creator chose the picture
 * knowing where it goes.
 */
export async function storeUpload(
  bytes: Buffer,
  options: { readonly ownerId: string; readonly kind: 'cover' | 'character' },
): Promise<{ url: string; assetKey: string; bytes: number }> {
  const size = SIZES[options.kind];
  const encoded = await sharp(bytes, { failOn: 'error' })
    .rotate() // Honour the EXIF orientation *before* the EXIF is discarded.
    .resize({ ...size, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  // Owner first, so every picture one person uploaded can be found by prefix
  // when one of them has to go.
  const assetKey = `uploads/${options.ownerId}/${options.kind}_${randomUUID().slice(0, 12)}.jpg`;
  const path = join(ASSET_ROOT, assetKey);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, encoded);

  return { url: `/media/${assetKey}`, assetKey, bytes: encoded.length };
}

/** A stable, non-reversible folder per person, so a path never carries a user id. */
export function ownerFolder(userId: string): string {
  return createHash('sha256').update(userId).digest('hex').slice(0, 16);
}

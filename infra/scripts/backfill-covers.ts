/**
 * Draw covers for public worlds that went out without one.
 *
 * `draftReadiness` now refuses to publish a world to Everyone without a cover,
 * but that rule arrived after the catalogue did, and it cannot reach backwards:
 * a published `StoryVersion` is immutable and is not re-validated. So anything
 * already in Discover with `coverImage: null` stays there, coverless, forever.
 * This is the one-off that clears them.
 *
 * Art is written as **WebP into `infra/seed/assets`**, which is where the
 * twenty-five official worlds' art lives and is the half of `READ_ROOTS` that
 * ships inside the Docker image. Production's `ASSET_ROOT` is a Railway volume
 * this machine cannot write to, and `/media/*` falls through to the seed
 * directory, so committing the file is what actually puts it on a player's
 * screen. That is also why WebP rather than PNG: `.gitignore` excludes
 * `infra/seed/assets/**\/*.png` as masters.
 *
 *     npx tsx infra/scripts/backfill-covers.ts            # say what it would do
 *     npx tsx infra/scripts/backfill-covers.ts --write    # draw, write, commit-ready
 *     npx tsx infra/scripts/backfill-covers.ts --write --story story_user_xxx
 *
 * Costs two image generations per world. Run it deliberately.
 */
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';
import sharp from 'sharp';
import { StoryVersion, coverAssetKey, keyArtAssetKey, registerWorldText } from '@plotbreak/contracts';
import { type Locale } from '@plotbreak/i18n';
import { reletterCover, titleMatches } from '../../services/api/src/create-art.js';
import {
  generatedCoverPrompt,
  keyArtPrompt,
  createMediaGatewayFromEnv,
  type ImagePromptSpec,
  type MediaGateway,
} from '@plotbreak/director';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SEED_ROOT = join(REPO_ROOT, 'infra/seed/assets');

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const ONLY = args.find((a) => a.startsWith('--story='))?.slice('--story='.length) ?? null;
/**
 * Draw again over art that is already on disk.
 *
 * Two images is real money, so the default is to keep what is there — and to
 * widen the search to worlds that already have a cover, because re-drawing one
 * is the only reason to look at them.
 */
const REDRAW = args.includes('--redraw');

/** Matches the shape the publish route mints, so nothing downstream can tell them apart. */
function nextVersionId(): string {
  return `sv_user_${randomUUID().replace(/-/g, '').slice(0, 16)}`;
}

interface Row {
  story_id: string;
  story_version_id: string;
  title: string;
  definition: unknown;
}

async function writeWebp(bytes: Buffer | Uint8Array, assetKey: string): Promise<number> {
  const encoded = await sharp(Buffer.from(bytes)).webp({ quality: 82 }).toBuffer();
  const path = join(SEED_ROOT, `${assetKey}.webp`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, encoded);
  return encoded.length;
}

async function generate(gateway: MediaGateway, spec: ImagePromptSpec): Promise<Buffer> {
  const asset = await gateway.generateImage(spec);
  const verdict = await gateway.moderateMedia(asset);
  if (!verdict.approved) throw new Error(`moderation refused: ${verdict.reason ?? 'no reason given'}`);
  return Buffer.from(asset.bytes);
}

/**
 * Draw the cover with its title in it, then re-letter it for the other
 * language — the shelf's own arrangement, from `docs/covers-v4/RECIPE.md`.
 *
 * The spelling is read back rather than eyeballed, because this runs over
 * whatever is in the catalogue rather than over twenty-five covers somebody is
 * sitting and looking at.
 */
async function drawCover(
  gateway: MediaGateway,
  story: StoryVersion,
  coverKey: string,
  overlays: ReadonlyMap<Locale, Record<string, unknown>>,
): Promise<string> {
  const written: string[] = [];

  let art: Buffer | null = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    art = await generate(gateway, generatedCoverPrompt(story, story.title));
    const read = await gateway.readText(art).catch(() => '');
    if (read === '' || titleMatches(read, story.title)) break;
    if (attempt === 1) console.log('    (the title never came back spelled right; keeping the last one)');
  }
  written.push(`${coverKey}.webp ${((await writeWebp(art!, coverKey)) / 1024).toFixed(0)}KB`);

  // Every language this world already has words in.
  for (const [locale, text] of overlays) {
    if (locale === story.sourceLocale) continue;
    const title = text['title'];
    if (typeof title !== 'string' || title.trim() === story.title.trim()) continue;

    const key = `${coverKey}.${locale}`;
    const bytes = await reletterCover({
      gateway,
      story,
      sourceKey: coverKey,
      from: story.title,
      to: title,
      assetKey: key,
    });
    if (!bytes) {
      console.log(`    (${locale} could not be re-lettered; it falls back to the ${story.sourceLocale} cover)`);
      continue;
    }
    written.push(`${key}.webp ${((await writeWebp(bytes, key)) / 1024).toFixed(0)}KB`);
  }

  return written.join(', ');
}

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  // Only what is actually on a shelf. UNLISTED is a link somebody was handed
  // and PRIVATE is nobody, and neither was ever required to have a cover.
  const { rows } = await pool.query<Row>(
    `SELECT s.story_id, sv.story_version_id, sv.title, sv.definition
       FROM stories s
       JOIN story_versions sv ON sv.story_version_id = s.published_version_id
      WHERE s.official = false
        AND s.status = 'PUBLISHED'
        AND s.deleted_at IS NULL
        AND (COALESCE(sv.definition->>'coverImage', '') = '' OR $2::boolean)
        AND ($1::text IS NULL OR s.story_id = $1)
      ORDER BY sv.published_at`,
    [ONLY, REDRAW],
  );

  if (rows.length === 0) {
    console.log('Nothing to do: every public player-made world has a cover.');
    await pool.end();
    return;
  }

  console.log(`${rows.length} public world(s) with no cover:\n`);
  for (const row of rows) console.log(`  ${row.story_id}  ${row.title}`);
  if (!WRITE) {
    console.log('\nDry run. Pass --write to draw them.');
    await pool.end();
    return;
  }

  const gateway = createMediaGatewayFromEnv();
  if (!gateway) throw new Error('No image provider configured. Set OPENAI_API_KEY.');

  for (const row of rows) {
    // Through the contract, so a definition that has drifted from the schema
    // fails here rather than producing a prompt built from undefined.
    const story = StoryVersion.parse(row.definition);
    console.log(`\n${row.title} (${row.story_id})`);

    // Whatever this version has already been translated into, so each plate
    // carries that language's title rather than the source's.
    const { rows: overlays } = await pool.query<{ locale: string; text: unknown }>(
      `SELECT locale, text FROM story_version_text
        WHERE story_version_id = $1 AND status = 'ready'`,
      [row.story_version_id],
    );
    const overlayText = new Map<Locale, Record<string, unknown>>();
    for (const overlay of overlays) {
      const text = (overlay.text ?? {}) as Record<string, string | readonly string[]>;
      registerWorldText(overlay.locale as Locale, { storyId: story.id, text });
      overlayText.set(overlay.locale as Locale, text);
    }

    const coverKey = coverAssetKey(story.storyId);
    if (REDRAW || !existsSync(join(SEED_ROOT, `${coverKey}.webp`))) {
      console.log(`  cover  ${await drawCover(gateway, story, coverKey, overlayText)}`);
    } else {
      console.log(`  cover  ${coverKey}.webp  already drawn, keeping it`);
    }

    // Best-effort, exactly as at publish: the story page falls back to the
    // cover, so a missing banner is cosmetic and a missing cover is not.
    let keyArtKey: string | null = keyArtAssetKey(story.storyId);
    try {
      if (REDRAW || !existsSync(join(SEED_ROOT, `${keyArtKey}.webp`))) {
        const banner = await generate(gateway, keyArtPrompt(story));
        console.log(`  banner ${keyArtKey}.webp  ${(await writeWebp(banner, keyArtKey) / 1024).toFixed(0)} KB`);
      } else {
        console.log(`  banner ${keyArtKey}.webp  already drawn, keeping it`);
      }
    } catch (error) {
      keyArtKey = null;
      console.log(`  banner failed, keeping the cover: ${(error as Error).message}`);
    }

    // A **new version**, not an edit.
    //
    // `story_versions_immutable` refuses to change a published definition, and
    // it is right to: every live session pins a `story_version_id`, so editing
    // one rewrites a run somebody is in the middle of (§35.3). Publishing the
    // next version is the product's own answer — the runs already going stay on
    // the version they started, and the story page serves the new one.
    // Re-drawing writes the same asset keys, so the definition is unchanged and
    // there is nothing to publish. Minting a version anyway would detach every
    // live run from the one it is pinned to, for new bytes behind an old name.
    if (story.coverImage === coverKey && story.keyArt === keyArtKey) {
      console.log('  definition already points at this art; no new version needed');
      console.log('  (bump MEDIA_EPOCH so devices refetch the new bytes)');
      continue;
    }

    const nextVersion = { ...story, id: nextVersionId(), version: story.version + 1, coverImage: coverKey, keyArt: keyArtKey };
    const publishedAt = new Date().toISOString();

    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(
        `INSERT INTO story_versions
           (story_version_id, story_id, version, definition, title, fantasy_label, hook,
            intensity, content_descriptors, clarity_passed, published_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,$10)`,
        [
          nextVersion.id,
          nextVersion.storyId,
          nextVersion.version,
          JSON.stringify(nextVersion),
          nextVersion.title,
          nextVersion.fantasyLabel,
          nextVersion.hook,
          nextVersion.intensity,
          nextVersion.contentDescriptors,
          publishedAt,
        ],
      );
      await client.query(`UPDATE stories SET published_version_id = $2, updated_at = now() WHERE story_id = $1`, [
        nextVersion.storyId,
        nextVersion.id,
      ]);
      // And the creator's own draft, which is the copy they will republish from.
      // Leaving it null would mean the next thing they do is hit the new gate
      // over a cover their world already has.
      await client.query(
        `UPDATE story_drafts
            SET published_version_id = $2,
                document = jsonb_set(
                  jsonb_set(document::jsonb, '{coverImage}', to_jsonb($3::text)),
                  '{keyArtImage}',
                  CASE WHEN $4::text IS NULL THEN 'null'::jsonb ELSE to_jsonb($4::text) END),
                updated_at = now()
          WHERE story_id = $1`,
        [nextVersion.storyId, nextVersion.id, coverKey, keyArtKey],
      );
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    console.log(`  published v${nextVersion.version} (${nextVersion.id}); live runs stay on v${story.version}`);
  }

  await pool.end();
  console.log(
    `\nDone. The .webp files are under infra/seed/assets — commit them, or production ` +
      `serves a definition pointing at art its image does not carry.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

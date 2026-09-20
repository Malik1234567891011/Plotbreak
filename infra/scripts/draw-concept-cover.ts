/**
 * Draw a cover for a world that has a bible but no fixture yet.
 *
 * `generate-art.ts` works from `LAUNCH_CATALOG`, so it cannot help a concept
 * that has not been built into `packages/test-fixtures` — and the cover is the
 * thing you want *before* committing two thousand lines of fixture, because it
 * is how you find out whether the world looks like anything.
 *
 *   npx tsx infra/scripts/draw-concept-cover.ts --story=story_uncounted --prompt=path/to/prompt.txt
 *   npx tsx infra/scripts/draw-concept-cover.ts --story=… --prompt=… --title="UNCOUNTED"
 *
 * Writes `docs/covers-v4/<storyId>/en.png` plus a webp derivative, which is
 * exactly where `install-covers-v4.ts` expects to find a finished cover — so a
 * concept that gets built can be installed without redrawing it.
 *
 * With `--title`, the lettering is read back off the finished image and checked,
 * and it redraws once if the model could not spell it.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createMediaGatewayFromEnv } from '@plotbreak/director';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { localizeStory } from '@plotbreak/contracts';
import { reletterCover, titleMatches } from '../../services/api/src/create-art.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function arg(name: string): string | null {
  return process.argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? null;
}

/**
 * The French cover, which is the English one re-lettered.
 *
 * `docs/covers-v4/RECIPE.md` makes it by handing the finished cover back to an
 * image model with one instruction — same characters, same light, different
 * words. Two generations from text give two different pictures, which is not
 * what the shelf looks like.
 */
async function reletter(storyId: string, locale: string): Promise<void> {
  const gateway = createMediaGatewayFromEnv();
  if (!gateway) throw new Error('No image provider configured. Set OPENAI_API_KEY.');

  const story = LAUNCH_CATALOG.find((world) => world.storyId === storyId);
  if (!story) throw new Error(`${storyId} is not in LAUNCH_CATALOG; build the fixture first.`);

  const localized = localizeStory(story, locale as 'en' | 'fr');
  if (localized.title.trim() === story.title.trim()) {
    console.log(`${locale}: the title is unchanged, so the ${story.sourceLocale} cover already serves it.`);
    return;
  }

  const sourceKey = `${storyId}/cover`;
  const assetKey = `${sourceKey}.${locale}`;
  console.log(`re-lettering "${story.title}" \u2192 "${localized.title}"\u2026`);

  const bytes = await reletterCover({
    gateway,
    story,
    sourceKey,
    from: story.title,
    to: localized.title,
    assetKey,
  });
  if (!bytes) throw new Error('could not re-letter it: the words never came back right.');

  const out = join(ROOT, 'docs/covers-v4', storyId);
  await mkdir(out, { recursive: true });
  await writeFile(join(out, `${locale}.png`), bytes);
  const webp = await sharp(bytes).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toBuffer();
  await writeFile(join(ROOT, 'infra/seed/assets', `${assetKey}.webp`), webp);
  console.log(`  shipped infra/seed/assets/${assetKey}.webp (${Math.round(webp.length / 1024)} KB)`);
}

async function main(): Promise<void> {
  const storyId = arg('story');
  const promptPath = arg('prompt');
  const title = arg('title');
  const locale = arg('reletter');

  if (storyId && locale) return reletter(storyId, locale);

  if (!storyId || !promptPath) {
    throw new Error('need --story=story_x with either --prompt=path/to/prompt.txt or --reletter=fr');
  }

  const gateway = createMediaGatewayFromEnv();
  if (!gateway) throw new Error('No image provider configured. Set OPENAI_API_KEY.');

  const prompt = (await readFile(resolve(ROOT, promptPath), 'utf8')).trim();
  const out = join(ROOT, 'docs/covers-v4', storyId);
  await mkdir(out, { recursive: true });

  const spec = {
    assetKey: `${storyId}/cover`,
    kind: 'COVER' as const,
    aspect: 'PORTRAIT' as const,
    prompt,
    seed: `${storyId}:cover:concept`,
    alt: `Cover art for ${storyId}`,
    styleVersion: 'plotbreak-cover-v4-generated',
    titleSafeArea: null,
  };

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    console.log(`drawing (attempt ${attempt})…`);
    const asset = await gateway.generateImage(spec);
    const verdict = await gateway.moderateMedia(asset);
    if (!verdict.approved) throw new Error(`acceptance refused it: ${verdict.reason}`);

    const bytes = Buffer.from(asset.bytes);
    let spelled = true;
    if (title) {
      const read = await gateway.readText(asset.bytes).catch(() => '');
      console.log(`  lettering reads: ${JSON.stringify(read)}`);
      spelled = read === '' || titleMatches(read, title);
    }

    // Written either way — a misspelt cover is still worth looking at, and the
    // second attempt overwrites it.
    //
    // The master goes to `docs/covers-v4/<storyId>/en.png`, which is where
    // `install-covers-v4.ts` looks and which `.gitignore` deliberately excludes
    // — masters are large and reproducible. The webp derivative goes to
    // `infra/seed/assets`, which is the half of `READ_ROOTS` that ships inside
    // the image, and which *is* committed.
    await writeFile(join(out, 'en.png'), bytes);
    const webp = await sharp(bytes)
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    const served = join(ROOT, 'infra/seed/assets', storyId, 'cover.webp');
    await mkdir(dirname(served), { recursive: true });
    await writeFile(served, webp);
    console.log(
      `  master  docs/covers-v4/${storyId}/en.png (local only)\n` +
        `  shipped infra/seed/assets/${storyId}/cover.webp (${Math.round(webp.length / 1024)} KB)`,
    );

    if (spelled) return;
    if (attempt === 2) console.log('  the title never came back spelled right; keeping the last one.');
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

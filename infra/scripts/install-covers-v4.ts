/**
 * Installs the v4 covers (docs/covers-v4/<storyId>/{en,fr}.png) into
 * infra/seed/assets as cover.png / cover.fr.png + webp derivatives, and marks
 * the manifest so generate-art.ts treats them as current.
 *
 *   npx tsx infra/scripts/install-covers-v4.ts [--only=<storyId>]
 */
import { copyFile, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const SRC = join(ROOT, 'docs/covers-v4');
const ASSETS = join(ROOT, 'infra/seed/assets');
const MANIFEST = join(ASSETS, 'manifest.json');
const STYLE = 'plotbreak-cover-v4-titled';

async function exists(p: string): Promise<boolean> {
  return stat(p).then(() => true, () => false);
}

async function main(): Promise<void> {
  const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7) ?? null;
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8')) as Record<string, Record<string, unknown>>;
  let installed = 0;

  for (const storyId of (await readdir(SRC)).filter((d) => d.startsWith('story_'))) {
    if (only && storyId !== only) continue;
    for (const [src, dst] of [['en.png', 'cover'], ['fr.png', 'cover.fr']] as const) {
      const from = join(SRC, storyId, src);
      if (!(await exists(from))) { console.log(`  · ${storyId}/${src} missing, skipped`); continue; }
      const png = join(ASSETS, storyId, `${dst}.png`);
      await copyFile(from, png);
      const input = await readFile(png);
      const meta = await sharp(input).metadata();
      const webp = await sharp(input).resize({ width: 900, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toBuffer();
      await writeFile(join(ASSETS, storyId, `${dst}.webp`), webp);
      const key = `${storyId}/${dst}`;
      manifest[key] = {
        ...(manifest[key] ?? {}),
        assetKey: key,
        file: `${storyId}/${dst}.png`,
        kind: 'COVER',
        alt: manifest[`${storyId}/cover`]?.alt ?? `Cover art for ${storyId}`,
        width: meta.width,
        height: meta.height,
        styleVersion: STYLE,
        provenance: { provider: 'dare', model: dst === 'cover' ? 'seedream-5-pro' : 'nano-banana-2', createdAt: new Date().toISOString() },
      };
      installed++;
      console.log(`  ✓ ${key} (${meta.width}×${meta.height} → ${Math.round(webp.length / 1024)}KB webp)`);
    }
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\n${installed} covers installed. Bump MEDIA_EPOCH on Railway so devices refetch.`);
}

void main();

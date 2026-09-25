/**
 * Produces delivery derivatives from the generated masters (spec §36.3).
 *
 * Generation returns ~2MB PNGs. Those are the masters and stay on disk; what a
 * phone downloads is a WebP at the size it will actually display, which is
 * roughly an order of magnitude smaller.
 *
 *   npx tsx infra/scripts/optimize-art.ts
 */
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');

/**
 * Delivery widths by asset kind. A 3x phone shows a cover at ~450pt wide, so
 * 900px is the honest ceiling; anything more is bytes the player pays for and
 * cannot see.
 */
const TARGET_WIDTH: Array<{ match: RegExp; width: number }> = [
  { match: /\/cover(\.[a-z]{2})?$/, width: 900 },
  { match: /\/key$/, width: 1200 },
  { match: /\/stage_/, width: 1200 },
  { match: /^player\//, width: 800 },
  { match: /^hero\//, width: 1200 },
  // A prologue panel is full-bleed and vertical, so it is the widest thing on
  // screen rather than a card. The 700px default would show visibly soft on a
  // 3x phone, which is the one place we are trying to look expensive.
  { match: /\/prologue\//, width: 1200 },
];

function widthFor(assetKey: string): number {
  return TARGET_WIDTH.find((t) => t.match.test(assetKey))?.width ?? 700;
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (extname(entry.name) === '.png') yield path;
  }
}

async function main(): Promise<void> {
  const force = process.argv.includes('--force');
  let masterBytes = 0;
  let deliveryBytes = 0;
  let count = 0;
  let skipped = 0;

  for await (const path of walk(ASSET_DIR)) {
    const assetKey = relative(ASSET_DIR, path).replace(/\.png$/, '');
    const outPath = path.replace(/\.png$/, '.webp');

    // Never overwrite a .webp that is newer than its .png.
    //
    // This script assumes the .png is the master and the .webp is a derived
    // artefact. For the v4 titled covers that is backwards: the wordmark is
    // composited into the .webp, the .webp *is* the master, and the .png left
    // on a dev machine is the older untitled render. Running this to shrink
    // three unrelated frames therefore regenerated 25 covers from stale
    // masters, stripped every wordmark, and shipped them — `git add -A` did
    // the rest. The mtime check is the cheap version of "is the thing I am
    // about to destroy more recent than the thing I am making it from".
    //
    // `--force` is the escape hatch for a genuine re-encode.
    if (!force) {
      const [master, derived] = await Promise.all([
        stat(path).catch(() => null),
        stat(outPath).catch(() => null),
      ]);
      if (master && derived && derived.mtimeMs > master.mtimeMs) {
        skipped += 1;
        continue;
      }
    }

    const input = await readFile(path);
    masterBytes += input.length;

    const webp = await sharp(input)
      .resize({ width: widthFor(assetKey), withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();

    await writeFile(outPath, webp);
    deliveryBytes += webp.length;
    count++;

    console.log(
      `  ${assetKey}: ${Math.round(input.length / 1024)}KB → ${Math.round(webp.length / 1024)}KB webp`,
    );
  }

  const shrink = masterBytes > 0 ? Math.round((1 - deliveryBytes / masterBytes) * 100) : 0;
  console.log(
    `\n${count} assets. Masters ${(masterBytes / 1_048_576).toFixed(1)}MB → delivery ${(deliveryBytes / 1_048_576).toFixed(1)}MB ` +
      `(${shrink}% smaller).`,
  );
  if (skipped > 0) {
    console.log(
      `${skipped} left alone: their .webp is newer than the .png beside it, so the .webp is the master ` +
        `(a titled cover, say) and regenerating it would throw work away. Pass --force if you mean it.`,
    );
  }
}

void main();

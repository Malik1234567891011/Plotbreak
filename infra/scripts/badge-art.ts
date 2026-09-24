/**
 * Draw the badge icons.
 *
 * The set shipped with one emoji each, which is the right call while a screen
 * is being proven and the wrong one on a screen people are meant to want
 * something from: an emoji is somebody else's artwork, rendered differently on
 * every OS version, at a weight that has nothing to do with the rest of the
 * app. Thirteen generated marks instead, from one style spine, so they read as
 * a set.
 *
 * Written to the asset catalogue rather than served from the API, because this
 * is chrome: it has to be there on first launch, offline, before any request.
 *
 *   npm run badge-art              # only the ones that are missing
 *   npm run badge-art -- --force   # redraw everything
 *   npm run badge-art -- --only=deep_in,long_night
 */
import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { BADGES } from '@plotbreak/contracts';
import { OpenAiImageGateway } from '@plotbreak/director';

const ROOT = resolve(import.meta.dirname, '../..');
const ASSETS = join(ROOT, 'apps/ios/Plotbreak/Resources/Assets.xcassets/Badges');
/** 48pt at 3x. Displayed small, so anything larger is bundle weight. */
const PIXELS = 144;

/**
 * The half of the prompt that is the same every time.
 *
 * Every word here is doing one of two jobs: making thirteen separate requests
 * look like one set, or making a mark survive being 48 points wide. The
 * negatives matter more than the positives — a generated icon's default
 * failure is a detailed illustration that turns to mud at thumbnail size.
 */
const SPINE = [
  'A single game-achievement emblem icon, centred, on a pure flat #0E1117 background.',
  'One bold geometric mark with a heavy silhouette, readable at 48 pixels wide.',
  'Palette: a violet #7C6CFF core with a warm gold #F6BE55 accent, and nothing else.',
  'Soft inner glow, subtle bevel, thin rim light. Modern anime UI, premium mobile game.',
  'No text, no letters, no numbers, no words. No frame, no border, no ribbon, no badge shield outline.',
  'Not an illustration, not a scene, not a character, not a photo. No fine detail, no small elements,',
  'no gradients that wash out, no drop shadow onto the background, no busy texture.',
].join(' ');

/**
 * The subject for each badge.
 *
 * Deliberately an object or a shape rather than the badge's own words: "Play on
 * three different days" is a sentence, and a model handed a sentence draws the
 * sentence. A door, three marks, a wave — those are things.
 */
const SUBJECTS: Record<string, string> = {
  first_break: 'a narrow door standing ajar with light spilling through the gap',
  say_anything: 'a fountain pen nib with a single spark leaving its tip',
  // A tally arc came back reading as a decorative fan rather than a count.
  ten_turns: 'a fanned stack of three blank rounded cards, the front one upright',
  twenty_turns: 'a lightning bolt struck through a stack of coins',
  back_for_more: 'a looping return arrow closing on itself',
  ending_found: 'a film clapperboard closing, seen slightly from above',
  genre_hopper: 'three interlocking diamonds of different sizes',
  three_day_run: 'three stacked calendar leaves with the top one lifting',
  world_hopper: 'a folded paper map with a route pin at its centre',
  deep_in: 'a single cresting wave curling over on itself',
  ending_hunter: 'a laurel wreath closed around an empty centre',
  long_night: 'a crescent moon with one star inside its curve',
  rare_ending: 'a faceted gemstone throwing a hard highlight',
  // The long game. Heavier, more ornate marks than the starter set, so the
  // screen shows at a glance which ones are worth months.
  apex_run: 'an ornate crown seen straight on, with one gem at its centre',
  one_world_deep: 'a tall lit candle burned most of the way down, one flame',
  ending_collector: 'a ring of three antique keys hung together',
  month_of_nights: 'a row of three moons waxing from crescent to full',
  marathon: 'a tall obelisk with a single band of light around its top',
  // Community. Not Discord's own logo: a mark of ours, about saying hello.
  discord_hello: 'a rounded speech bubble with a small waving hand inside it',
};

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const force = argv.includes('--force');
  const only = argv.find((a) => a.startsWith('--only='))?.slice(7).split(',').filter(Boolean);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set.');
  // This script *is* the exception the tripwire guards, so it clears it for
  // itself rather than asking the operator to remember.
  delete process.env.PLOTBREAK_NO_IMAGE_GEN;

  const gateway = new OpenAiImageGateway({ apiKey });
  mkdirSync(ASSETS, { recursive: true });
  writeFileSync(
    join(ASSETS, 'Contents.json'),
    JSON.stringify({ info: { author: 'xcode', version: 1 } }, null, 2) + '\n',
  );

  const wanted = BADGES.filter((b) => !only || only.includes(b.id));
  let drawn = 0;
  let skipped = 0;

  for (const badge of wanted) {
    const subject = SUBJECTS[badge.id];
    if (!subject) {
      console.log(`  ? ${badge.id} — no subject written, skipping`);
      continue;
    }
    const dir = join(ASSETS, `badge_${badge.id}.imageset`);
    const png = join(dir, `badge_${badge.id}.png`);
    if (existsSync(png) && !force) {
      skipped += 1;
      continue;
    }

    mkdirSync(dir, { recursive: true });
    const started = Date.now();
    const asset = await gateway.generateImage({
      assetKey: `badges/${badge.id}`,
      kind: 'BADGE',
      aspect: 'SQUARE',
      prompt: `${SPINE} The subject is ${subject}.`,
      // Stable per badge, so a redraw of one mark is the same mark again
      // rather than a different one that no longer matches its twelve siblings.
      seed: `badge:${badge.id}:v1`,
      alt: `${badge.title}: ${badge.description}`,
      styleVersion: 'badge-v1',
      titleSafeArea: null,
    });

    writeFileSync(png, Buffer.from(asset.bytes));
    // 1024px of icon is 900KB of bundle nobody sees. sips ships with macOS.
    execFileSync('sips', ['-Z', String(PIXELS), png], { stdio: 'ignore' });
    writeFileSync(
      join(dir, 'Contents.json'),
      JSON.stringify(
        {
          images: [
            { filename: `badge_${badge.id}.png`, idiom: 'universal', scale: '1x' },
            { idiom: 'universal', scale: '2x' },
            { idiom: 'universal', scale: '3x' },
          ],
          info: { author: 'xcode', version: 1 },
        },
        null,
        2,
      ) + '\n',
    );
    drawn += 1;
    console.log(
      `  ✓ ${badge.id.padEnd(16)} ${((Date.now() - started) / 1000).toFixed(1)}s  $${asset.provenance.costUsd.toFixed(3)}`,
    );
  }

  console.log(`\n${drawn} drawn, ${skipped} already there. ${ASSETS}`);
  if (drawn > 0) console.log('Rebuild the app to pick them up (./build.sh regenerates the project).');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

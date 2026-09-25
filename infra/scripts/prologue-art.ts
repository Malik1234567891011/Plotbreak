/**
 * The three frames of a story's opening cinematic (see `StoryVersion.prologue`).
 *
 * Separate from `generate-art.ts` because these are not covers, portraits or
 * stages: they are three shots of one continuous moment, and the only thing
 * that makes them work is that they look like they came out of the same
 * episode. So they share a scene spine — one night, one moon, one palette, one
 * costume — and differ only in how close the camera is.
 *
 * Writes to `infra/seed/assets/` under the same key the story references, so
 * the API's `resolveAssetUrl` serves them with no further wiring.
 *
 *   npx tsx infra/scripts/prologue-art.ts --story=itachi [--force]
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMediaGatewayFromEnv, MediaGatewayError } from '@plotbreak/director';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');

/**
 * House rules, copied in spirit from `prompts.ts`.
 *
 * The no-lettering rule matters more here than anywhere else: these frames
 * carry the opening text, and text baked into the picture cannot be translated
 * into French or read by VoiceOver. The headline lives in the story data.
 */
const NEGATIVES = [
  'No text, no lettering, no captions, no watermarks, no logos, no signatures, no UI.',
  'No real people or celebrity likenesses.',
  'Not photorealistic. No 3D render look.',
  'No gore, no blood, no wounds.',
].join(' ');

const STYLE = [
  'Anime key visual in a painterly cel-shaded style.',
  'Cinematic composition, film-grade lighting, restrained palette with one saturated accent.',
  'Detailed but not cluttered. Confident linework. Subtle grain.',
].join(' ');

interface PrologueShot {
  readonly key: string;
  readonly prompt: string;
  readonly alt: string;
}

/**
 * Itachi.
 *
 * Note what this is *not*: the massacre, with the player as a bystander who
 * gets noticed. In this world the player **is** Itachi, thirteen, reporting to
 * his father and to the village's secret service without either knowing, and
 * the opening beat is his little brother sitting on the step with his shuriken
 * laid out in a row. A prologue that made Itachi a stranger with a drawn sword
 * would contradict the premise on the first screen and spoil the story the
 * world is actually about.
 *
 * What is kept is the shape, which is the part that works: extreme wide, then
 * medium, then a face looking back — world, then pressure, then somebody sees
 * you. The confrontation at the end is a seven-year-old holding out a shuriken,
 * handle first, which is the thing this story is actually about.
 *
 * Sasuke is described by costume and by where he sits rather than by age. That
 * is not squeamishness: `generate-art.ts` documents that stacking age words
 * into a prompt trips the provider's classifier and gets the whole request
 * refused, and Ace's cover was rejected twice before somebody worked it out.
 */
const SHOTS: Record<string, readonly PrologueShot[]> = {
  itachi: [
    {
      key: 'story_itachi/prologue/1',
      prompt: [
        'Extreme wide establishing shot, vertical composition, seen from high above.',
        'A traditional hidden village of tiled wooden roofs at night, warm orange lantern light in the windows,',
        'a walled clan compound at the near edge with a round paper-fan crest on its gate.',
        'Huge pale moon low in the sky, thin mist lying in the streets, deep indigo and slate blue palette,',
        'warm amber window light as the single saturated accent.',
        'On a rooftop in the foreground, very small in frame, the back of a slim figure in dark shinobi clothes',
        'with long dark hair tied low, standing still, looking down over the village.',
        'Lonely, quiet, enormous. The figure is tiny against the town.',
      ].join(' '),
      alt: 'A hidden village of tiled roofs at night under a huge moon, with a small figure standing on a rooftop above it.',
    },
    {
      key: 'story_itachi/prologue/2',
      prompt: [
        'Medium wide shot, vertical composition, at street level.',
        'A narrow stone lane inside a walled clan compound at night, wooden houses close on both sides,',
        'paper lanterns and one sliding door left open spilling warm light across the stones.',
        'The same huge pale moon above the rooftops, same indigo and slate palette, same thin mist.',
        'A slim figure in dark shinobi clothes with long dark hair tied low walks away from the viewer down the lane,',
        'seen from behind, a school satchel over one shoulder with the edge of a blank porcelain animal mask',
        'just visible where the flap has come open.',
        'Tense and quiet. Nobody else in the lane. No weapon drawn.',
      ].join(' '),
      alt: 'A narrow lantern-lit lane at night, a figure walking away with a porcelain mask showing at the top of their bag.',
    },
    {
      key: 'story_itachi/prologue/3',
      prompt: [
        'Close cinematic two-shot, vertical composition, low camera near the ground.',
        'The wooden step of a traditional house at night, warm light from the doorway behind.',
        'In the foreground, sitting on the step, a small child in a dark academy shirt with a round paper-fan crest',
        'on the shoulder, dark hair sticking up at the back, four practice throwing stars laid out in a neat row',
        'in the dirt beside them. The child is holding one out toward the viewer, handle first, not looking up.',
        'Behind and above, half in shadow, a slim older figure in dark shinobi clothes with long dark hair tied low',
        'has stopped and turned their head toward the viewer. Moonlight catches one side of the face,',
        'the rest falls into shadow. Tired dark eyes, faint lines beneath them. Calm, not threatening.',
        'Same moon, same indigo and amber palette as before. Intimate and still.',
      ].join(' '),
      alt: 'A child on a doorstep holding out a throwing star handle-first, while an older figure pauses and looks back.',
    },
  ],
};

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const story = args.find((a) => a.startsWith('--story='))?.split('=')[1] ?? 'itachi';
  const force = args.includes('--force');

  const shots = SHOTS[story];
  if (!shots) {
    console.error(`No prologue shots defined for "${story}". Known: ${Object.keys(SHOTS).join(', ')}`);
    process.exit(1);
  }

  const gateway = createMediaGatewayFromEnv();
  if (!gateway) {
    console.error('OPENAI_API_KEY is not set, so there is nothing to draw with.');
    process.exit(1);
  }

  for (const shot of shots) {
    const out = join(ASSET_DIR, `${shot.key}.png`);
    if (!force && (await exists(out))) {
      console.log(`skip   ${shot.key} (already drawn)`);
      continue;
    }
    console.log(`draw   ${shot.key}`);
    try {
      const asset = await gateway.generateImage({
        assetKey: shot.key,
        kind: 'KEY_ART',
        // Vertical, because the whole point is that it fills a phone.
        aspect: 'PORTRAIT',
        prompt: `${shot.prompt} ${STYLE} ${NEGATIVES}`,
        // Shared across the three so the provider keeps the look consistent.
        seed: `${story}-prologue`,
        alt: shot.alt,
        styleVersion: 'prologue-v1',
      });
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, asset.bytes);
      console.log(`  wrote ${out} (${asset.bytes.length} bytes)`);
    } catch (error) {
      const why = error instanceof MediaGatewayError ? error.message : String(error);
      console.error(`  FAILED ${shot.key}: ${why}`);
      process.exitCode = 1;
    }
  }
}

void main();

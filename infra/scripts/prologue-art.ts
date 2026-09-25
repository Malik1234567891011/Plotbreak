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
        'Extreme wide establishing shot, vertical composition, from a rooftop high above a ninja village at night.',
        'THE VILLAGE: a hidden ninja village in a forested valley ringed by a high outer wall.',
        'Round drum-shaped buildings with teal-green roofs mixed with traditional tiled wooden houses,',
        'warm orange lantern light in hundreds of windows, thin mist in the streets.',
        'FAR BACKGROUND, unmistakable: an immense grey cliff face on the far side of the valley,',
        'carved with four colossal stone portrait heads of past village leaders looking out over the rooftops,',
        'lit pale by the moon. A huge pale moon low in a deep indigo sky.',
        'MIDGROUND: a walled clan compound, its gate marked with a round red-and-white fan emblem,',
        'the top half red and the bottom half white.',
        'FOREGROUND, small in frame: the back of a slim young man standing alone on a tiled rooftop,',
        'long straight black hair tied loosely low behind, dark high-collared shinobi clothes,',
        'a metal forehead protector with a spiral-leaf emblem, looking down over the village.',
        'He is tiny against the valley. Lonely, quiet, enormous.',
      ].join(' '),
      alt: 'A hidden ninja village at night under a huge moon, a cliff carved with four giant stone faces behind it, and one small figure standing on a rooftop.',
    },
    {
      key: 'story_itachi/prologue/2',
      prompt: [
        'Medium wide shot, vertical composition, at street level inside a walled clan compound at night.',
        'A narrow stone lane between traditional wooden houses, each wall carrying the same round',
        'red-and-white fan emblem, top half red and bottom half white. Paper lanterns glowing warm orange,',
        'one sliding paper door left open spilling light across the stones.',
        'The same huge pale moon above the rooftops, same deep indigo and slate palette, same thin mist.',
        'A slim young man walks away from the viewer down the lane, seen from behind:',
        'long straight black hair tied loosely low, dark high-collared shinobi clothes,',
        'a metal forehead protector with a spiral-leaf emblem, and a shoulder bag',
        'from which the edge of a blank white porcelain animal mask is just visible.',
        'Tense and quiet. Nobody else in the lane. No weapon drawn.',
      ].join(' '),
      alt: 'A lantern-lit stone lane in a clan compound at night, a young shinobi walking away with a white porcelain mask showing in his bag.',
    },
    {
      key: 'story_itachi/prologue/3',
      prompt: [
        'Close cinematic two-shot, vertical composition, low camera near the ground, night.',
        'The wooden step of a traditional house, warm light from the open doorway behind.',
        'IN FRONT, sitting on the step: a young boy with black hair that sticks up spikily at the back,',
        'wearing a navy-blue high-collared shirt with a round red-and-white fan emblem on the back,',
        'white shorts. Four metal four-pointed throwing stars are laid out in a neat row in the dirt beside him.',
        'He holds a fifth out toward the viewer, gripped by the blade so the handle points outward,',
        'his eyes down, not looking up. Patient and a little sullen.',
        'BEHIND AND ABOVE, half in shadow, an older teenage boy has stopped and turned his head back:',
        'long straight black hair tied loosely low, a narrow pale face, pronounced tear-trough lines',
        'beneath calm dark eyes, dark high-collared shinobi clothes, a metal forehead protector with a',
        'spiral-leaf emblem. His expression is gentle and tired, not threatening.',
        'Moonlight catches one side of his face, the rest falls into shadow.',
        'Same moon, same indigo and warm amber palette as the previous shots. Intimate, still, affectionate.',
      ].join(' '),
      alt: 'A spiky-haired boy on a doorstep holding a throwing star out handle-first, while his older brother pauses on the step above and looks back at him.',
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

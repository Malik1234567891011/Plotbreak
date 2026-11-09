/**
 * The picture at the top of a story's opening beat (`StoryVersion.openingPanel`).
 *
 * One frame, not three: the opening beat is text, and this is the panel that
 * heads it, the way a webtoon episode opens. It is drawn *from the character's
 * own portrait* with the image-edit endpoint, so the woman in the opening panel
 * is visibly the same woman whose face heads every later beat. Generating from
 * text alone gave a stranger with the right hair colour.
 *
 * Written as `<assetKey>.png`; run `npm run optimize-art` (or cwebp) for the
 * `.webp` the API serves.
 *
 *   npx tsx infra/scripts/opening-panel-art.ts [--story=pink_tide] [--force]
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMediaGatewayFromEnv, MediaGatewayError } from '@plotbreak/director';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const ASSET_DIR = join(ROOT, 'infra/seed/assets');

const NEGATIVES = [
  'No text, no lettering, no captions, no speech bubbles, no watermarks, no logos, no UI.',
  'No real people or celebrity likenesses. Not photorealistic. No 3D render look. No gore.',
  'Every person shown is an adult.',
].join(' ');

const STYLE = [
  'Anime key visual, painterly cel-shaded, the same rendering and palette as the reference portrait.',
  'A single webtoon panel, vertical, cinematic composition, film-grade lighting, one saturated accent.',
  'The character from the reference image is the subject: keep her face, hair, skin tone, build and outfit exactly.',
].join(' ');

interface Panel {
  readonly story: string;
  readonly key: string;
  readonly reference: string;
  readonly prompt: string;
  readonly alt: string;
}

const PANELS: readonly Panel[] = [
  {
    story: 'pink_tide',
    key: 'story_pink_tide/opening',
    reference: 'story_pink_tide/sora.webp',
    prompt:
      'Sora standing waist-deep in the turquoise shallow end of a luxury infinity pool at 2pm, having just splashed the viewer: ' +
      'a sheet of water droplets frozen in the air between her and the camera, her bubblegum-pink hair wet and pushed back, ' +
      'an open white linen shirt over a white bikini, grinning, completely unrepentant, one hand still mid-flick. ' +
      'Behind her the pool edge vanishes into the ocean, white hot stone, a swim-up bar. Low camera at water level, bright tropical light.',
    alt: 'Sora in the shallow end of the infinity pool, pink hair wet, grinning after splashing you, the ocean behind her.',
  },
  {
    story: 'second_skin',
    key: 'story_second_skin/opening',
    reference: 'story_second_skin/kaia.webp',
    prompt:
      'Kaia landing on one knee on the stone floor of a vast candlelit ceremonial hall, a rain of shattered window glass falling around her, ' +
      'snow-leopard ears pinned back, long spotted tail curled for balance, blood on one sleeve, ' +
      'black raven feathers bursting along her left forearm. She looks up, straight at the viewer, fierce and wary. ' +
      'Behind her, rows of shocked onlookers and three armoured Crown Wardens on a gallery stair. Low dramatic angle, cold moonlight through the broken window, warm candlelight below.',
    alt: 'Kaia landing on one knee in the Heartstone Hall in a rain of broken glass, snow-leopard ears and spotted tail, black feathers bursting along her forearm.',
  },
  {
    story: 'good_morning_husband',
    key: 'story_good_morning_husband/opening',
    reference: 'story_good_morning_husband/hana.webp',
    prompt:
      'Hana at the stove of a small warm city-flat kitchen in the morning, in an oversized shirt, hair pinned up with a pencil, ' +
      'flipping pancakes in a pan, smiling back over her shoulder at the viewer as if at her husband, one hand reaching back. ' +
      'Two mugs on the counter, one chipped. Soft golden morning light through the window, steam from the pan. Intimate, cozy, slice-of-life.',
    alt: 'Hana at the stove in an oversized shirt, hair pinned up with a pencil, smiling back over her shoulder, spatula in hand, morning light.',
  },
  {
    story: 'zero_throne',
    key: 'story_zero_throne/opening',
    reference: 'story_zero_throne/rhea.webp',
    prompt:
      'Rhea in the foreground in a Helion flight jacket, standing her ground in an empty memorial plaza, sidearm drawn and lowered, looking past the viewer. ' +
      'Behind her, a seventeen-metre black ceramic mech kneels on the plaza floor, its chest cockpit open and glowing, ' +
      'shattered armoured glass and torn steel braces behind it, abandoned memorial banners. Low angle, overcast daylight, the mech towering.',
    alt: 'A seventeen-metre black ceramic mech kneeling in an empty memorial plaza, cockpit open, with Rhea in a Helion flight jacket standing her ground, sidearm drawn.',
  },
];

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
  const only = args.find((a) => a.startsWith('--story='))?.split('=')[1];
  const force = args.includes('--force');

  const gateway = createMediaGatewayFromEnv();
  if (!gateway) {
    console.error('OPENAI_API_KEY is not set, so there is nothing to draw with.');
    process.exit(1);
  }

  for (const panel of PANELS) {
    if (only && panel.story !== only) continue;
    const out = join(ASSET_DIR, `${panel.key}.png`);
    if (!force && (await exists(out))) {
      console.log(`skip   ${panel.key} (already drawn)`);
      continue;
    }
    console.log(`draw   ${panel.key}`);
    try {
      const source = new Uint8Array(await readFile(join(ASSET_DIR, panel.reference)));
      const asset = await gateway.editImage(
        {
          assetKey: panel.key,
          kind: 'KEY_ART',
          aspect: 'PORTRAIT',
          prompt: `${panel.prompt} ${STYLE} ${NEGATIVES}`,
          seed: `${panel.story}-opening`,
          alt: panel.alt,
          styleVersion: 'opening-panel-v1',
        },
        source,
      );
      await mkdir(dirname(out), { recursive: true });
      await writeFile(out, asset.bytes);
      console.log(`  wrote ${out} (${asset.bytes.length} bytes)`);
    } catch (error) {
      const why = error instanceof MediaGatewayError ? error.message : String(error);
      console.error(`  FAILED ${panel.key}: ${why}`);
      process.exitCode = 1;
    }
  }
}

void main();

// Cover style v2 bake-off: one OOC-style prompt per story on four PixAI models, no text in the image.
//
//   npx tsx docs/stories-50/tools/cover-bakeoff.mts --dry                       # print prompts + plan, no API
//   npx tsx --env-file=.env docs/stories-50/tools/cover-bakeoff.mts [--story=<slug>] [--model=<key>]
//
// Writes docs/stories-50/cover-style-v2/bakeoff/<story>-<model>.png and skips any that already exist,
// so a re-run never pays twice. Ledger label: cover-style-v2:bakeoff:<story>:<model>.
//
// The target (owner, 2026-11-22): OOC's "New OOC Originals" covers. One adult character, waist-up, a big
// face looking at the viewer with a playful or confident gesture; a polished gacha / light-novel finish
// (fine lineart, glowing light, detailed hair and eyes, glossy skin), vivid saturated colour in one theme,
// more skin within the limits, a simple moody backdrop, and no text (the title is set later in real type).
//
// The prompt is one text for every model: tags first for the SDXL models (Haruka v2, Hoshino v2), prose
// after for Tsubaki. Hard limits are said positively (an adult in her late twenties, the clothes named)
// and the forbidden things go in the negative prompt: naming them in a tag model's positive prompt draws
// them. Tsubaki.2 standard ignores negative prompts (its profile has negativePrompt "off").
import { access, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_NEGATIVE, pixaiGenerate, type PixaiMode, type PixaiModel } from '../../../infra/scripts/pixai.js';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../cover-style-v2/bakeoff');

const QUALITY = 'masterpiece, best quality, amazing quality, very aesthetic, absurdres, highly detailed';
const FINISH =
  'Polished gacha / light-novel cover illustration, premium mobile-game key art: fine clean lineart, very detailed ' +
  'hair strands and eyes with bright highlights, glossy skin shading, soft glowing light. Not flat TV-anime cel shading. ' +
  'Vivid, saturated colour in one strong colour theme, rich high-contrast lighting with glowing highlights and a strong ' +
  'rim light, a glossy polished finish. One character only, waist-up, her head about a quarter of the picture height. ' +
  'No text, no letters, no logo anywhere in the image.';

export const PROMPTS: Record<string, string> = {
  'married-to-the-shrine-fox': [
    `${QUALITY}, 1girl, solo, mature female, adult, fox ears, fox girl, multiple tails, long red hair, golden eyes,`,
    'red kimono, off-shoulder kimono, bare shoulders, collarbone, cleavage, gold obi, upper body, looking at viewer,',
    'finger to lips, smirk, shrine rooftop, night, full moon, paper lanterns, rim light, glowing, glossy skin, shiny hair.',
    'Kuzuha, a glamorous nine-tailed fox spirit who looks like a woman in her late twenties, with a mature face and a',
    'full adult figure. Waist-up and close, looking straight at the viewer with a teasing, confident smile, one finger',
    'raised to her lips. Copper-red hair to her waist in fine glowing strands, gold eyes, red fox ears with dark tips,',
    'nine red fox tails fanning behind her like slow flames. A crimson silk kimono with gold embroidery worn off both',
    'shoulders, a deep neckline with some cleavage, a fitted gold obi at her waist. Backdrop: a moonlit shrine roof, a',
    'vermilion torii and a few glowing lanterns, simple and moody. Colour theme: crimson and gold against deep moonlit',
    `blue. ${FINISH}`,
  ].join(' '),
  'the-maid-owns-the-house-now': [
    `${QUALITY}, 1girl, solo, mature female, adult, black hair, hair bun, loose hair strands, grey eyes, red lips,`,
    'black dress, off-shoulder dress, satin dress, sweetheart neckline, cleavage, bare shoulders, collarbone, upper body,',
    'looking at viewer, smirk, holding bell, mansion, grand staircase, red wallpaper, candlelight, rim light, glowing,',
    'glossy skin, shiny hair.',
    'Clara Voss, the new lady of an old seaside mansion: an elegant, glamorous woman in her late twenties with a mature',
    'face and a full hourglass adult figure. Waist-up and close, chin tilted up, looking down at the viewer with a cool,',
    'teasing half-smile, holding a small silver hand bell up by its black ribbon on one finger, like a dare. Dark hair',
    'pinned in a low knot with loose strands framing her face, level grey eyes, red lips. A fitted black satin',
    'off-the-shoulder evening dress with a deep sweetheart neckline showing some cleavage, bare shoulders and',
    'collarbones, no jewellery. Backdrop: the dim top of a grand staircase, a deep red damask wall and one warm lamp,',
    `simple and moody. Colour theme: red and black, with gold highlights. ${FINISH}`,
  ].join(' '),
};

export const NEGATIVE =
  `${DEFAULT_NEGATIVE}, text, letters, logo, title, words, loli, aged down, teenager, school uniform, maid headdress, ` +
  'apron, underwear, lingerie, nipples, see-through, worst quality, low quality, normal quality, jpeg artifacts, ' +
  'multiple girls, crowd, flat color, muted colors';

interface Variant {
  readonly key: string;
  readonly model: PixaiModel;
  readonly mode?: PixaiMode;
  readonly width: number;
  readonly height: number;
}

/** Tsubaki.3 at today's cover settings; the others at 832x1216 (inside every SDXL tier-0 range). */
export const VARIANTS: readonly Variant[] = [
  { key: 'tsubaki3-pro', model: 'tsubaki3', mode: 'pro', width: 1152, height: 1744 },
  { key: 'tsubaki2-standard', model: 'tsubaki2', mode: 'standard', width: 832, height: 1216 },
  { key: 'haruka2', model: 'haruka2', width: 832, height: 1216 },
  { key: 'hoshino2', model: 'hoshino2', width: 832, height: 1216 },
];

const exists = (p: string) => access(p).then(() => true, () => false);
const args = process.argv.slice(2);
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const stories = Object.keys(PROMPTS).filter((s) => !arg('story') || s === arg('story'));
const variants = VARIANTS.filter((v) => !arg('model') || v.key === arg('model'));

if (args.includes('--dry')) {
  for (const s of stories) console.log(`## ${s} (${PROMPTS[s]!.length} chars)\n\n${PROMPTS[s]}\n`);
  console.log(`## negative\n\n${NEGATIVE}\n`);
  for (const s of stories) for (const v of variants) console.log(`would draw ${s}-${v.key} (${v.width}x${v.height})`);
} else {
  await mkdir(OUT, { recursive: true });
  let credits = 0;
  for (const story of stories) {
    await Promise.all(
      variants.map(async (v) => {
        const file = join(OUT, `${story}-${v.key}.png`);
        if (await exists(file)) return console.log(`skip ${story}-${v.key} (exists)`);
        try {
          const r = await pixaiGenerate({
            prompt: PROMPTS[story]!,
            negativePrompt: NEGATIVE,
            model: v.model,
            mode: v.mode,
            width: v.width,
            height: v.height,
            label: `cover-style-v2:bakeoff:${story}:${v.key}`,
          });
          credits += r.paidQuota;
          await writeFile(file, r.png);
          console.log(`ok ${story}-${v.key} ${r.width}x${r.height} ${r.paidQuota} credits ${(r.latencyMs / 1000).toFixed(0)}s`);
        } catch (error) {
          console.log(`FAIL ${story}-${v.key}: ${String(error)}`);
        }
      }),
    );
  }
  console.log(`total ${credits} credits`);
}

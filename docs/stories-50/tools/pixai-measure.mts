// Measures one PixAI in-story image per variant, in parallel, to price in-story art.
//   npx tsx --env-file=.env docs/stories-50/tools/pixai-measure.mts tsubaki3:pro:1024x1536 tsubaki2:standard:1024x1536
// Writes docs/stories-50/test-cover/measure_<variant>.png. Costs one image per variant.
import { writeFileSync } from 'node:fs';
import { pixaiGenerate, type PixaiMode, type PixaiModel } from '../../../infra/scripts/pixai.js';

const PROMPT = [
  'Anime character portrait, waist up, painterly cel-shaded anime key visual, clean lineart, luminous eyes, soft rim light.',
  'SELENE VARRE, an adult court mage: long silver hair with a few thin braids, violet eyes, a dark navy and gold high-collared mage robe with a silver chain, black gloves, holding a tall silver staff topped with a blue crystal.',
  'Calm, guarded, curious expression, looking at the viewer. Plain softly lit background of a marble hall with stained-glass colour.',
  'No text, no lettering, no watermark, no logos.',
].join(' ');

const variants = process.argv.slice(2);
const results = await Promise.allSettled(
  variants.map((v) => {
    const [model, mode, size] = v.split(':') as [PixaiModel, PixaiMode, string];
    const [width, height] = size.split('x').map(Number) as [number, number];
    const name = v.replace(/:/g, '_');
    return pixaiGenerate({ prompt: PROMPT, model, mode, width, height, label: `measure:selene:${name}` }).then((r) => {
      writeFileSync(`docs/stories-50/test-cover/measure_${name}.png`, r.png);
      return `${v}: ${r.paidQuota} credits, ${(r.latencyMs / 1000).toFixed(1)} s, ${r.width}x${r.height}`;
    });
  }),
);
for (const r of results) console.log(r.status === 'fulfilled' ? r.value : `failed: ${String(r.reason)}`);

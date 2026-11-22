// Usage: npx tsx --env-file=.env <this> <outDir> key1 key2 ...
import { writeFileSync } from 'node:fs';
import { pixaiGenerate } from '/Users/omarlahmimi/Documents/Plotbreak/infra/scripts/pixai.ts';
const STYLE = [
  'Mobile game shop item icon, one object only, centered, small and fully inside the frame with wide empty margins, on a plain flat pure black background.',
  'Glossy anime gacha-game item art, clean dark lineart, soft cel shading, bright specular highlights, a few tiny white sparkles.',
  'The currency is moonstone crystals: each crystal is an octahedron that reads as a diamond shape from the front, milky pearl-white with a faint rainbow opal shimmer and crisp white facet edges.',
].join(' ');
const ITEMS: Record<string, string> = {
  starter: 'A small red Japanese paper gift envelope (pochi-bukuro) tied with a thin white cord, two moonstone crystals peeking out of its open top.',
  p1: 'A single moonstone crystal floating upright.',
  p2: 'Two moonstone crystals side by side, one slightly in front of the other.',
  p3: 'A small heap of about eight moonstone crystals.',
  p4: 'A round indigo cloth drawstring pouch (kinchaku) bulging and spilling moonstone crystals.',
  p5: 'A black lacquered wooden box with a red cord, lid lifted, packed full of moonstone crystals that glow softly.',
  p6: 'A large black lacquered treasure chest with red cords, lid open, overflowing with a mountain of glowing moonstone crystals and crystals spilling down its front.',
};
const NEG = 'text, letters, numbers, kanji, watermark, logo, signature, frame, border, card, panel, ui, button, person, girl, boy, hands, face, character, multiple objects, cropped, cut off, scenery, background objects, floor, table, gradient background, gold, coins';
const [outDir, ...keys] = process.argv.slice(2);
const results = await Promise.allSettled(keys.map((k) =>
  pixaiGenerate({ prompt: `${STYLE} ${ITEMS[k]} No text, no lettering.`, negativePrompt: NEG, model: 'tsubaki2', mode: 'lite', width: 1024, height: 1024, label: `design-v3:pack-icon:${k}` })
    .then((r) => { writeFileSync(`${outDir}/${k}.png`, r.png); return `${k}: ${r.paidQuota} credits, ${(r.latencyMs / 1000).toFixed(0)} s`; })));
for (const r of results) console.log(r.status === 'fulfilled' ? r.value : `failed: ${String(r.reason).slice(0, 200)}`);

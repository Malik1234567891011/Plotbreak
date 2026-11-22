// Usage (repo root): npx tsx --env-file=.env <this> <outDir> key1 key2 ...
// Credit-pack containers, each holding the canonical crystal (contextImages = the pack-1000 crystal).
import { readFileSync, writeFileSync } from 'node:fs';
import { pixaiGenerate, pixaiUpload } from '/Users/omarlahmimi/Documents/Plotbreak/infra/scripts/pixai.ts';
const STYLE = [
  'Mobile game shop item icon in the exact rendering style of the reference image: glossy anime gacha-game item art, thin dark lineart, soft cel shading, soft light from the upper left.',
  'The crystals are exact copies of the crystal in the reference image: the same elongated diamond (octahedron) cut, the same milky pearl-white body with a faint rainbow opal shimmer, the same crisp white facet edges. Every crystal is that crystal, only smaller: a long double-pointed diamond, pointed at both ends, never a single-pointed quartz shard.',
  'One object only, centered, fully inside the frame with wide empty margins, on a plain flat pure black background.',
].join(' ');
const ITEMS: Record<string, string> = {
  p2000: 'Three of the crystals in a small loose cluster, one upright and two leaning against it.',
  p10000: 'A small round tan leather drawstring pouch, open at the top, filled with the crystals, three crystals spilling out in front of it.',
  p20000: 'A round woven straw basket heaped above the rim with the crystals, a few crystals on the ground beside it.',
  p50000: 'A dark walnut wooden box with brass corners, its lid open, packed to the top with the crystals.',
  'p50000-v2': 'An open square wooden crate with slatted plank sides and rope handles, no lid at all, piled high above the top edge with the crystals.',
  'p50000-v3': 'A sturdy rectangular dark walnut box with flat sides, brass corner caps and no lid, heaped above the rim with the crystals.',
  p100000: 'A large dark walnut treasure chest with brass bands and a brass lock, lid thrown open, overflowing with a mountain of the crystals, crystals spilling down its front onto the ground.',
};
const NEG = 'text, letters, numbers, kanji, watermark, logo, signature, frame, border, card, panel, ui, button, person, hands, face, character, cropped, cut off, scenery, room, floor, table, gradient background, gold coins, gems of other colors, colored gems, red, purple, blue gems, sparkles, glow, light rays';
const [outDir, ...keys] = process.argv.slice(2);
const ref = await pixaiUpload(new Uint8Array(readFileSync(`${outDir}/ref-crystal.png`)), 'image/png');
const results = await Promise.allSettled(keys.map((k) => {
  const item = ITEMS[k] ?? ITEMS[k.replace(/-v\d+$/, '')];
  return pixaiGenerate({ prompt: `${STYLE} ${item} No text, no lettering.`, negativePrompt: NEG, model: 'tsubaki3', mode: 'pro', contextImages: [ref], width: 1024, height: 1024, label: `design-v3:pack:${k}` })
    .then((r) => { writeFileSync(`${outDir}/${k}.png`, r.png); return `${k}: ${r.paidQuota} credits, ${(r.latencyMs / 1000).toFixed(0)} s`; });
}));
for (const r of results) console.log(r.status === 'fulfilled' ? r.value : `failed: ${String(r.reason).slice(0, 300)}`);

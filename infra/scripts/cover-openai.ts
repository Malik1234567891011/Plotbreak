/**
 * Cover v5: romance-forward covers via the OpenAI image API (the art provider
 * the app already uses). Writes candidates to docs/covers-v5/<storyId>/en-<n>.png.
 *
 *   npx tsx --env-file=.env infra/scripts/cover-openai.ts <storyId> [count]
 *   npx tsx --env-file=.env infra/scripts/cover-openai.ts <storyId> --fr <en.png> "<FR TITLE>" "<EN TITLE>"
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const KEY = process.env.OPENAI_API_KEY!;
const MODEL = process.env.OPENAI_IMAGE_MODEL ?? 'gpt-image-2.6-sunburst';
const STYLE = `Anime light-novel / mobile-game cover illustration, portrait 2:3, premium polished Japanese anime key visual quality (like a modern seasonal anime poster or a Webtoon original cover). Glossy, detailed digital anime painting with clean lineart, luminous eyes, soft rim light, rich color depth. Not flat, not sketchy, not western cartoon, not 3D.`;
const RULES = `Every person in the image is an adult. She is drawn attractive and stylish in a commercial anime way, tasteful, nothing explicit, nothing see-through. Composed so her face still reads at thumbnail size, strong silhouette separation, high contrast. No watermark, no signature, no extra text, no logos, no speech bubbles, no borders.`;

const PROMPTS: Record<string, string> = {
  story_good_morning_husband: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "GOOD MORNING, HUSBAND" as a bespoke stylized logo: soft rounded handwritten romance script in warm white with a peach-pink glow and a tiny heart dotting the comma, placed in the lower third, large and perfectly legible, spelled exactly "GOOD MORNING, HUSBAND". No other text anywhere.

SCENE: a small bright modern apartment kitchen on a sunny Saturday morning. Sun pouring across the counter, a pan of pancakes on the hob, two mismatched mugs, plants on the windowsill, a paper list on the fridge. Cream, amber and peach.

CHARACTER, large in frame, from mid-thigh up, filling about three quarters of the cover, centred and close: HANA MORI, an extremely attractive adult woman of twenty-six, the viewer's wife of four years. Long glossy chestnut hair piled up messily and held with a drawing pencil, a few loose strands across her face, warm hazel eyes, a gold wedding band on her left hand. She wears her husband's oversized white button-up shirt as a sleep shirt, sleeves rolled, top buttons open at the collar, slipping off one shoulder, over soft grey lounge shorts, bare legs, barefoot. One hip against the counter, spatula in one hand, she looks straight at the viewer over a cup of coffee with a teasing, affectionate, slightly sleepy smile, as if she has just caught him staring and likes it.

MOOD: warm, flirty, cosy newlywed morning, sunlight glowing through her hair and the shirt's edges, a hint of a secret in her eyes. ${RULES}`,

  story_hush_house: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "HUSH HOUSE" as a bespoke stylized logo: thin elegant serif lettering in pale cream with a faint flickering red neon glow like a failing hallway light, placed in the lower third, large and perfectly legible, spelled exactly "HUSH HOUSE". No other text anywhere.

SCENE: the third-floor hallway of an old dark-brick apartment building at night. Warm lamplight from an open doorway, worn wooden floor, a tall window streaked with rain, and further down the corridor a single hallway light glowing an ominous red above door 309.

CHARACTER, large in frame, from mid-thigh up, filling about three quarters of the cover, close and centred-left: AYAME KUROSE, an extremely attractive adult woman of twenty-two, the viewer's neighbour in 314. Long straight black hair with a wine-red sheen where the light hits it, amber-brown eyes with faint tired shadows under them that only make her look more striking, slim. She leans against the frame of her open apartment door in an oversized charcoal knit sweater slipping off one bare shoulder, sleeves pulled over her hands, over short black shorts, bare legs, warm socks. She holds out a can of coffee toward the viewer with one hand and gives a dry, knowing, slightly flirtatious half-smile, head tilted, as if inviting them in while warning them about the hallway.

MOOD: cosy, intimate and a little dangerous; warm amber doorway light against the cold blue hallway and that one red light behind her. Romantic supernatural mystery, not gore. ${RULES}`,

  story_last_feather: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "LAST FEATHER" as a bespoke stylized logo: delicate glowing silver-white serif lettering with a single feather curling from the final R and soft halo light, placed in the lower third, large and perfectly legible, spelled exactly "LAST FEATHER". No other text anywhere.

SCENE: a small modern city apartment at night, rain streaking the window, blurred neon city lights beyond, warm lamplight inside.

CHARACTER, large in frame, from the waist up, filling about three quarters of the cover, close and centred: SERA, an extremely beautiful adult angel who appears to be about twenty-four, a fallen guardian sent to collect you who decided not to. Long straight silver-white hair that glows faintly from within, pale luminous grey-blue eyes, a thin broken halo of light flickering above her head, two huge white wings half open behind her with the top of the left wing torn. She wears a simple white off-the-shoulder sundress, damp from the rain, a thin silver chain at her collarbone. She leans toward the viewer reaching one hand out to touch their cheek, with a soft, tender, almost shy smile and eyes full of longing. A single white feather drifts down past her face, turning to ash at its tip.

BEHIND HER, small and secondary: the apartment door slightly ajar, and in the gap a tall man in a black suit with black wings folded like a coat, gold eyes catching the light.

MOOD: luminous, romantic and bittersweet; cool blue night against her warm inner glow. Seasonal romance anime heroine, not horror. ${RULES}`,
};

async function generate(prompt: string): Promise<Buffer> {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt, size: '1024x1536', quality: 'high', n: 1 }),
  });
  const j = (await res.json()) as { data?: { b64_json: string }[]; error?: { message: string } };
  if (!res.ok || !j.data?.[0]) throw new Error(j.error?.message ?? `HTTP ${res.status}`);
  return Buffer.from(j.data[0].b64_json, 'base64');
}

async function swapTitle(png: string, fr: string, en: string): Promise<Buffer> {
  const form = new FormData();
  form.append('model', MODEL);
  form.append('image', new Blob([await readFile(png)], { type: 'image/png' }), 'cover.png');
  form.append('size', '1024x1536');
  form.append('quality', 'high');
  form.append('prompt', `Reproduce this anime cover illustration identically — same character, pose, face, hair, clothing, background, colours, lighting and composition — with ONE change: completely remove the English title lettering "${en}" and replace it with the French title "${fr}", drawn in the same bespoke logo style with the same glow, same position, large and perfectly legible, spelled exactly "${fr}" with correct accents. The English words must not appear. No other text anywhere. Do not change anything else.`);
  const res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { authorization: `Bearer ${KEY}` }, body: form });
  const j = (await res.json()) as { data?: { b64_json: string }[]; error?: { message: string } };
  if (!res.ok || !j.data?.[0]) throw new Error(j.error?.message ?? `HTTP ${res.status}`);
  return Buffer.from(j.data[0].b64_json, 'base64');
}

async function main(): Promise<void> {
  const [storyId, a, b, c, d] = process.argv.slice(2);
  if (!storyId || !PROMPTS[storyId]) throw new Error(`usage: <storyId>; known: ${Object.keys(PROMPTS).join(', ')}`);
  const dir = join(process.cwd(), 'docs/covers-v5', storyId);
  await mkdir(dir, { recursive: true });
  if (a === '--fr') {
    await writeFile(join(dir, 'fr.png'), await swapTitle(b!, c!, d!));
    console.log(join(dir, 'fr.png'));
    return;
  }
  const count = Number(a ?? 2);
  await writeFile(join(dir, 'PROMPT.md'), `# ${storyId} cover v5 (${MODEL}, 1024x1536, high)\n\n${PROMPTS[storyId]}\n`);
  const out = await Promise.all(Array.from({ length: count }, async (_, i) => {
    const file = join(dir, `en-${i + 1}.png`);
    try { await writeFile(file, await generate(PROMPTS[storyId]!)); return file; } catch (e) { return `FAILED ${i + 1}: ${(e as Error).message}`; }
  }));
  console.log(out.join('\n'));
}

void main().catch((e) => { console.error(e); process.exit(1); });

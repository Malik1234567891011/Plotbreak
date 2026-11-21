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

  story_zero_throne_a: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "ZERO THRONE" as a bespoke stylized logo: sharp angular mecha-anime lettering in brushed chrome with a hot crimson edge glow and a thin scanline sheen, placed in the lower third, large and perfectly legible, spelled exactly "ZERO THRONE". No other text anywhere.

SCENE: a mech hangar on a space station at night, a towering black-and-chrome giant robot kneeling behind her with its cockpit open and its single eye glowing red, steam and sparks drifting, the hangar lit in cold blue with hot red warning lights.

CHARACTER, large in frame, from mid-thigh up, filling about three quarters of the cover, close and centred: RHEA, an extremely attractive adult woman of twenty-four, an elite rival mech pilot with orders to bring the viewer in. Deep crimson-red hair to the shoulder, slightly tousled, pale gold eyes, athletic hourglass figure, a short pale scar under her left jawline. Her black pilot bodysuit is unzipped to the waist and the sleeves are tied around her hips, over a fitted black sports crop top, bare toned midriff, a sheen of sweat after a sortie. She leans back against the robot's giant open hand, helmet hooked on two fingers, looking straight at the viewer with a confident, challenging, flirtatious smirk, as if she won and wants a rematch.

MOOD: hot, cocky, high-energy mecha romance; crimson rim light along her hair and body against the cold blue hangar. ${RULES}`,

  story_zero_throne_b: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "ZERO THRONE" as a bespoke stylized logo: sharp angular mecha-anime lettering in brushed chrome with a hot crimson edge glow and a thin scanline sheen, placed in the lower third, large and perfectly legible, spelled exactly "ZERO THRONE". No other text anywhere.

SCENE: the inside of a cramped mech cockpit, glowing red and gold holographic displays all around, a starfield and a space station visible through the canopy, alarm light pulsing.

CHARACTER, very close, from the hips up, filling most of the cover, as if she is leaning in toward the viewer in the tight cockpit: RHEA, an extremely attractive adult woman of twenty-four, an elite rival mech pilot with orders to bring the viewer in. Deep crimson-red hair to the shoulder, slightly tousled, pale gold eyes, athletic hourglass figure, a short pale scar under her left jawline. She wears a glossy black-and-crimson form-fitting pilot plugsuit with the front zip pulled down below her collarbone, hair falling forward, one hand braced on the console beside the viewer's head and the other holding a pilot's sidearm loosely pointed down. Her face is close to the viewer's, gold eyes half-lidded, a dangerous teasing smile, as if deciding whether to arrest them or kiss them.

MOOD: tense, intimate, enemies-to-lovers; her face lit by the red and gold hologram glow, everything else in shadow. ${RULES}`,

  story_zero_throne_c: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "ZERO THRONE" as a bespoke stylized logo: sharp angular mecha-anime lettering in brushed chrome with a hot crimson edge glow and a thin scanline sheen, placed in the lower third, large and perfectly legible, spelled exactly "ZERO THRONE". No other text anywhere.

SCENE: an armoured observation deck on a space station at night, a huge window behind her filled with a planet and the silhouette of a giant black robot standing outside in the void with its eye glowing red, reflections on the glass.

CHARACTER, large in frame, full body to mid-thigh, filling about three quarters of the cover: RHEA, an extremely attractive adult woman of twenty-four, an elite rival mech pilot with orders to bring the viewer in. Deep crimson-red hair to the shoulder, slightly tousled, pale gold eyes, athletic hourglass figure, a short pale scar under her left jawline. She sits on the edge of a steel console with her legs crossed, in a cropped black pilot jacket worn open over a fitted crimson top, short black tactical shorts, black thigh holster, tall black boots. She looks over her shoulder at the viewer, chin down, gold eyes glinting, a slow knowing smile, one gloved hand toying with a pair of handcuffs on a finger.

MOOD: sultry, dangerous, glamorous sci-fi; deep blacks and crimson with gold eye glint and cold planet light. ${RULES}`,

  story_zero_throne_d: `${STYLE}

THE TITLE IS PART OF THE ART. Render the words "ZERO THRONE" as a bespoke stylized logo: sharp angular mecha-anime lettering in brushed chrome with a hot crimson edge glow and a thin scanline sheen, placed in the lower third, large and perfectly legible, spelled exactly "ZERO THRONE". No other text anywhere.

SCENE: a mech hangar on a space station at night. Behind her, huge and imposing, a black-and-chrome giant robot kneels with its chest cockpit open and its single eye glowing red, filling the upper background so the mecha reads instantly. Cold blue hangar light, hot red warning lights, drifting steam and a few sparks.

CHARACTER, large in frame, from mid-thigh up, filling about three quarters of the cover, close and centred: RHEA, an extremely attractive, very feminine adult woman of twenty-four, an elite rival mech pilot. Long glossy crimson-red hair falling past her shoulders in soft waves, pale gold eyes with long lashes, glossy lips, a soft beautiful face, curvy hourglass figure, a tiny pale scar under her left jawline. She wears a glossy black-and-crimson form-fitting pilot plugsuit with the front zip pulled down below her collarbone, the top half slipping off one shoulder, a gold Helion pilot pendant at her throat. Graceful, alluring pose: hips cocked to one side, one hand lifting her hair off her neck, the other resting lightly on the robot's giant chrome finger beside her, chin tilted down, looking at the viewer through her lashes with a soft, teasing, dangerous smile, as if inviting them into the cockpit.

MOOD: glamorous, seductive, feminine mecha heroine; crimson rim light tracing her hair and silhouette against the cold blue hangar, the robot's red eye echoing her hair. Polished seasonal-anime key visual. ${RULES}`,
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

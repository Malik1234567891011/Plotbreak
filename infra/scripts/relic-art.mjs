// node infra/scripts/relic-art.mjs <outfile> <prompt> — one transparent relic icon via OpenAI images.
// Needs OPENAI_API_KEY. ~7¢ per image. Then: magick in.png -resize 512x512 -quality 88 out.webp
import { writeFileSync } from 'node:fs';
const [out, prompt] = process.argv.slice(2);
const style = 'Single collectible video-game item icon, one object only, centered with generous empty margin, three-quarter hero angle, ' +
  'premium anime-fantasy gacha item art in the style of Genshin Impact and Honkai Star Rail inventory icons, crisp painted detail, ' +
  'dramatic rim light, subtle magical glow and sparkles around the object, rich saturated colour, fully transparent background, ' +
  'no text, no letters, no frame, no border, no card, no hands, no people. Object: ';
const r = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  body: JSON.stringify({ model: process.env.IMG_MODEL ?? 'gpt-image-2.5-flare', prompt: style + prompt, size: '1024x1024', n: 1, output_format: 'png', background: 'transparent', quality: 'high' }),
});
const j = await r.json();
if (!r.ok) { console.log('ERR', r.status, JSON.stringify(j).slice(0, 400)); process.exit(1); }
writeFileSync(out, Buffer.from(j.data[0].b64_json, 'base64'));
console.log('ok', out, JSON.stringify(j.usage ?? {}));

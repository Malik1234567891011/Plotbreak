// Uploads one image and prints the media record over time (free: no generation).
//   npx tsx --env-file=.env docs/stories-50/tools/pixai-upload-probe.mts <image> [ephemeral]
import { readFileSync } from 'node:fs';
import { pixaiUpload } from '../../../infra/scripts/pixai.js';
const [file, eph] = process.argv.slice(2);
const type = file!.endsWith('.webp') ? 'image/webp' : file!.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
const id = await pixaiUpload(new Uint8Array(readFileSync(file!)), type, eph === 'ephemeral');
console.log('mediaId', id);
for (let i = 0; i < 4; i++) {
  const r = await fetch(`https://api.pixai.art/v2/media/batch?ids=${id}`, { headers: { Authorization: `Bearer ${process.env.PIXAI_API_KEY}` } });
  console.log(i * 3, 's', r.status, (await r.text()).slice(0, 400));
  await new Promise((res) => setTimeout(res, 3000));
}

// One PixAI cover generation, for measuring real API cost and time.
// Reads PIXAI_API_KEY from the repo-root .env. Never prints the key.
//
//   node docs/stories-50/tools/pixai-one-cover.mjs <prompt.txt> <out-basename>
//
// Writes <out-basename>.<ext>, <out-basename>.task.json and appends to runlog.tsv
// next to the prompt file. One task, batchSize 1. Refunds on failure are PixAI's.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const TSUBAKI3 = '2024383379556065549';
const WIDTH = 1152, HEIGHT = 1744; // the 2:3 XL size the bake-off shipped
const NEGATIVE = 'watermark, signature, subtitle, extra words, gibberish text, lowres, blurry, bad anatomy, extra fingers, deformed hands, nsfw, nude, child';

const [promptFile, outBase] = process.argv.slice(2);
if (!promptFile || !outBase) { console.error('usage: pixai-one-cover.mjs <prompt.txt> <out-basename>'); process.exit(2); }

const env = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const key = (env.match(/^PIXAI_API_KEY=(.*)$/m)?.[1] ?? '').trim().replace(/^["']|["']$/g, '');
if (!key) { console.error('PIXAI_API_KEY missing from .env'); process.exit(2); }
const auth = { Authorization: `Bearer ${key}` };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 1. Free: confirm the size is allowed for Tsubaki.3.
const sc = await fetch(`https://api.pixai.art/v2/generation-model/${TSUBAKI3}/size-config`, { headers: auth });
const scText = await sc.text();
console.log('size-config', sc.status, scText.slice(0, 600));

const prompt = fs.readFileSync(promptFile, 'utf8').trim();
const body = { modelVersionId: TSUBAKI3, prompt, negativePrompt: NEGATIVE, width: WIDTH, height: HEIGHT, batchSize: 1, mode: process.env.PIXAI_MODE || 'pro' };
if (process.env.PIXAI_USE_ASPECT === '1') { delete body.width; delete body.height; body.aspectRatio = '2:3'; body.size = '1.5k'; }
fs.writeFileSync(`${outBase}.request.json`, JSON.stringify({ ...body, prompt: `(${prompt.length} chars, see prompt file)` }, null, 2));
if (process.env.PIXAI_DRY === '1') { console.log('dry run, not creating a task'); process.exit(0); }

// 2. The one paid call.
const t0 = Date.now();
const cr = await fetch('https://api.pixai.art/v2/image/create', { method: 'POST', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
const crText = await cr.text();
console.log('create', cr.status, crText.slice(0, 400));
if (!cr.ok) process.exit(1);
const id = JSON.parse(crText).id;

// 3. Poll no faster than every 1.5 s.
let task;
for (let i = 0; i < 200; i++) {
  await sleep(2000);
  const r = await fetch(`https://api.pixai.art/v2/task/${id}`, { headers: auth });
  task = await r.json();
  if (['completed', 'failed', 'cancelled'].includes(task.status)) break;
}
const secs = ((Date.now() - t0) / 1000).toFixed(1);
fs.writeFileSync(`${outBase}.task.json`, JSON.stringify(task, null, 2));
console.log('status', task.status, 'paidQuota', task.paidQuota, 'seconds', secs);

let saved = '';
const url = task?.outputs?.mediaUrls?.find(Boolean);
if (url) {
  const img = await fetch(url);
  const ext = (img.headers.get('content-type') || 'image/png').split('/')[1].split(';')[0].replace('jpeg', 'jpg');
  saved = `${outBase}.${ext}`;
  fs.writeFileSync(saved, Buffer.from(await img.arrayBuffer()));
  console.log('saved', saved);
}
const log = path.join(path.dirname(promptFile), 'runlog.tsv');
if (!fs.existsSync(log)) fs.writeFileSync(log, 'when\tstory\tmodel\tmode\tsize\tpaidQuota\tseconds\tstatus\ttask\tfile\n');
fs.appendFileSync(log, [new Date().toISOString(), path.basename(outBase), 'tsubaki3', body.mode, body.width ? `${body.width}x${body.height}` : `${body.aspectRatio} ${body.size}`, task.paidQuota, secs, task.status, id, path.basename(saved)].join('\t') + '\n');

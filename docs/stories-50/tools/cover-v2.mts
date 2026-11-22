// Cover v2 production: the owner's pick from the cover-style-v2 bake-off (2026-11-22), for every new-50 story.
//
//   npx tsx docs/stories-50/tools/cover-v2.mts --dry [--only=<storyId>[,<storyId>...]]     # plan, no API
//   npx tsx --env-file=.env docs/stories-50/tools/cover-v2.mts [--only=...] [--force=<storyId>[,...]]
//
// Reads one prompt per story from docs/stories-50/cover-style-v2/prompts/<storyId>.txt, draws it on
// Tsubaki.2 standard at 832x1216 (2,600 credits, the bake-off's column 3) and saves the raw art, no text,
// to docs/stories-50/cover-style-v2/raw/<storyId>.png. A raw that already exists is skipped, so a re-run
// never pays twice; --force=<storyId> redraws that one (the old raw is kept as raw/rejected/<storyId>.png).
// Ledger label: cover-v2:<storyId>. The title is set afterwards in real type by cover-title.py.
//
// --cap=<credits> (default 200000) stops before a task would take the cover-v2 spend recorded in
// docs/stories-50/pixai-ledger.tsv past the cap. --jobs=<n> (default 5) tasks run at once; PixAI's
// waiting-queue limit is handled by pixai.ts.
//
// Tsubaki.2 standard ignores negative prompts (its profile has negativePrompt "off"), so every hard limit
// is also said positively in the prompt; the negative is still sent, with nsfw, nude and child in it.
import { access, mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_NEGATIVE, pixaiGenerate } from '../../../infra/scripts/pixai.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const V2 = join(ROOT, 'docs/stories-50/cover-style-v2');
const PROMPTS = join(V2, 'prompts');
const RAW = join(V2, 'raw');
const LEDGER = join(ROOT, 'docs/stories-50/pixai-ledger.tsv');

export const MODEL = { model: 'tsubaki2', mode: 'standard', width: 832, height: 1216 } as const;
export const CREDITS_PER_COVER = 2_600;

export const NEGATIVE =
  `${DEFAULT_NEGATIVE}, text, letters, logo, title, words, loli, shota, aged down, teenager, young-looking, ` +
  'school uniform, underwear, lingerie, nipples, see-through, topless, worst quality, low quality, ' +
  'normal quality, jpeg artifacts, multiple girls, multiple boys, crowd, flat color, muted colors';

const exists = (p: string) => access(p).then(() => true, () => false);
const args = process.argv.slice(2);
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const list = (name: string) => new Set((arg(name) ?? '').split(',').map((s) => s.trim()).filter(Boolean));
const only = list('only');
const force = list('force');
const cap = Number(arg('cap') ?? 200_000);
const jobs = Math.max(1, Number(arg('jobs') ?? 5));

/** cover-v2 credits already recorded in the ledger (every task, including any that failed or were lost). */
function spent(): number {
  if (!existsSync(LEDGER)) return 0;
  let total = 0;
  for (const line of readFileSync(LEDGER, 'utf8').split('\n')) {
    const cols = line.split('\t');
    if (cols[1]?.startsWith('cover-v2:') && cols[7] !== 'failed') total += Number(cols[5]) || 0;
  }
  return total;
}

const ids = (await readdir(PROMPTS))
  .filter((f) => f.endsWith('.txt'))
  .map((f) => f.slice(0, -4))
  .filter((id) => only.size === 0 || only.has(id) || force.has(id))
  .sort();
for (const id of [...only, ...force]) if (!ids.includes(id)) console.log(`no prompt for ${id} (prompts/${id}.txt)`);

const todo: string[] = [];
for (const id of ids) {
  if (!force.has(id) && (await exists(join(RAW, `${id}.png`)))) console.log(`skip ${id} (raw exists)`);
  else todo.push(id);
}

if (args.includes('--dry')) {
  for (const id of todo) {
    const prompt = (await readFile(join(PROMPTS, `${id}.txt`), 'utf8')).trim();
    console.log(`would draw ${id}${force.has(id) ? ' (force)' : ''}: ${prompt.length} chars`);
  }
  console.log(`${todo.length} to draw, ~${todo.length * CREDITS_PER_COVER} credits; cover-v2 spent so far ${spent()} of cap ${cap}`);
} else {
  await mkdir(join(RAW, 'rejected'), { recursive: true });
  let credits = 0;
  let reserved = 0;
  const queue = [...todo];
  const worker = async (): Promise<void> => {
    for (let id = queue.shift(); id; id = queue.shift()) {
      if (spent() + reserved + CREDITS_PER_COVER > cap) {
        console.log(`STOP ${id}: would pass the ${cap}-credit cap (spent ${spent()}, in flight ${reserved})`);
        continue;
      }
      reserved += CREDITS_PER_COVER;
      try {
        const prompt = (await readFile(join(PROMPTS, `${id}.txt`), 'utf8')).trim();
        const r = await pixaiGenerate({ prompt, negativePrompt: NEGATIVE, ...MODEL, label: `cover-v2:${id}` });
        const file = join(RAW, `${id}.png`);
        if (await exists(file)) await rename(file, join(RAW, 'rejected', `${id}.png`));
        await writeFile(file, r.png);
        credits += r.paidQuota;
        console.log(`ok ${id} ${r.width}x${r.height} ${r.paidQuota} credits ${(r.latencyMs / 1000).toFixed(0)}s`);
      } catch (error) {
        console.log(`FAIL ${id}: ${String(error)}`);
      } finally {
        reserved -= CREDITS_PER_COVER;
      }
    }
  };
  await Promise.all(Array.from({ length: jobs }, worker));
  console.log(`this run ${credits} credits; cover-v2 total ${spent()}`);
}

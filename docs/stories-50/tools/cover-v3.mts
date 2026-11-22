// Cover v3 draws: one manifest per story, any of the four PixAI models, no title painted unless the
// recipe paints it. The art is raw; cover-title-v3.py sets the title afterwards.
//
//   npx tsx docs/stories-50/tools/cover-v3.mts --dry [--only=<id>[,<id>...]] [--force=<id>[,...]]   # plan + prompts, no API
//   npx tsx --env-file=.env docs/stories-50/tools/cover-v3.mts [--only=...] [--force=...] [--cap=<credits>] [--jobs=4]
//
// Reads every docs/stories-50/cover-style-v3/manifest/<storyId>.json:
//   { storyId, recipe, model, mode?, width, height, prompt, negative, label }
// and draws each one whose raw is missing into docs/stories-50/cover-style-v3/raw/<storyId>.png through
// infra/scripts/pixai.ts (ledger label = manifest.label, e.g. cover-v3-test:<storyId>). A raw that exists
// is skipped, so a re-run never pays twice. --force=<id> redraws it and keeps the old one as
// raw/rejected/<storyId>-<timestamp>.png. --force alone draws only the forced stories.
//
// Every manifest is checked before anything is drawn, and a run with any invalid manifest draws nothing:
// the model and mode exist (no mode for Haruka v2 / Hoshino v2), the size is legal for the model, the
// negative contains nsfw, nude and child, and the positive prompt names nothing the hard limits forbid
// (an SDXL tag model draws what it reads). A painted recipe's prompt must contain the exact fixture title.
//
// --manifest-dir=<dir> reads manifests from elsewhere (for testing the checks with --dry).
// Concurrency 4 (--jobs). --cap (default 60,000) stops starting tasks once this run's credits plus the
// estimates in flight would pass it. Estimates are the measured prices in recipes.json; the total printed
// at the end is what PixAI actually charged (paidQuota).
import { access, mkdir, readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MODELS, pixaiGenerate, type PixaiMode, type PixaiModel } from '../../../infra/scripts/pixai.js';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const V3 = join(ROOT, 'docs/stories-50/cover-style-v3');
const RAW = join(V3, 'raw');
const FIXTURES = join(ROOT, 'packages/test-fixtures/src');

interface Manifest {
  readonly storyId: string;
  readonly recipe: string;
  readonly model: PixaiModel;
  readonly mode?: PixaiMode;
  readonly width: number;
  readonly height: number;
  readonly prompt: string;
  readonly negative: string;
  readonly label: string;
}

interface Recipe {
  readonly id: string;
  readonly name: string;
  readonly title: { readonly mode: 'typeset' | 'painted' };
}

const args = process.argv.slice(2);
const arg = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const list = (name: string) => new Set((arg(name) ?? '').split(',').map((s) => s.trim()).filter(Boolean));
const dry = args.includes('--dry');
const only = list('only');
const force = list('force');
const cap = Number(arg('cap') ?? 60_000);
const jobs = Math.max(1, Number(arg('jobs') ?? 4));
const manifestDir = resolve(arg('manifest-dir') ?? join(V3, 'manifest'));

const exists = (p: string) => access(p).then(() => true, () => false);
const recipesFile = JSON.parse(await readFile(join(V3, 'recipes.json'), 'utf8')) as {
  recipes: Recipe[];
  prices: Record<string, number>;
};
const recipes = new Map(recipesFile.recipes.map((r) => [r.id, r]));

/** Things the positive prompt must never name (hard limits, App Store 13+). */
const FORBIDDEN: readonly RegExp[] = [
  /\bnsfw\b/i, /\bnude\b/i, /\bnudity\b/i, /\bnaked\b/i, /\btopless\b/i, /\bnipples?\b/i,
  /\bunderwear\b/i, /\blingerie\b/i, /\bbra\b/i, /\bpanties\b/i, /\bbikini\b/i, /\bsee-through\b/i,
  /\bchild(ren)?\b/i, /\bkids?\b/i, /\bloli\b/i, /\bshota\b/i, /\bteen(ager)?s?\b/i, /\bunderage\b/i,
  /\blittle girl\b/i, /\blittle boy\b/i, /\byoung-looking\b/i, /\bpetite\b/i,
  /\bschool ?uniform\b/i, /\bserafuku\b/i, /\bschoolgirl\b/i, /\bsexy\b/i, /\bseductive\b/i,
  /\bspread legs\b/i,
];
/** Haruka v2 and Hoshino v2 blow these tags up (cover-style-v2/bakeoff.png); Tsubaki takes them in prose. */
const FORBIDDEN_SDXL: readonly RegExp[] = [/\bcleavage\b/i, /\b(large|huge|gigantic|big) breasts\b/i];
const NEGATIVE_MUST = ['nsfw', 'nude', 'child'];

/** Legal sizes: Tsubaki.3 512-2496 step 16; the others (SDXL tier 0, Tsubaki.2) 512-1280 step 8. */
function sizeProblem(m: Manifest): string | null {
  const [lo, hi, step] = m.model === 'tsubaki3' ? [512, 2496, 16] : [512, 1280, 8];
  for (const v of [m.width, m.height]) {
    if (!Number.isInteger(v) || v < lo || v > hi || v % step !== 0) return `${m.width}x${m.height} not legal for ${m.model} (${lo}-${hi}, step ${step})`;
  }
  return null;
}

async function fixtureTitle(storyId: string): Promise<string | null> {
  for (const f of (await readdir(FIXTURES)).filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts')).sort()) {
    const src = await readFile(join(FIXTURES, f), 'utf8');
    const start = src.indexOf(`storyId: '${storyId}'`);
    if (start < 0) continue;
    const m = /^\s+title: (['"])((?:\\.|(?!\1).)*)\1,\s*$/m.exec(src.slice(start));
    if (m) return m[2]!.replace(/\\'/g, "'").replace(/\\"/g, '"');
  }
  return null;
}

async function validate(file: string, m: Manifest): Promise<string[]> {
  const problems: string[] = [];
  const id = file.replace(/\.json$/, '');
  for (const key of ['storyId', 'recipe', 'model', 'width', 'height', 'prompt', 'negative', 'label'] as const) {
    if (m[key] === undefined || m[key] === '') problems.push(`missing ${key}`);
  }
  if (problems.length) return problems;
  if (m.storyId !== id) problems.push(`storyId ${m.storyId} does not match the file name ${file}`);
  if (!/^story_[a-z0-9_]+$/.test(m.storyId)) problems.push(`storyId ${m.storyId} is not story_<slug>`);
  const recipe = recipes.get(m.recipe);
  if (!recipe) problems.push(`unknown recipe ${m.recipe}`);
  if (!(m.model in MODELS)) problems.push(`unknown model ${m.model} (${Object.keys(MODELS).join(', ')})`);
  if (m.model === 'tsubaki3' && m.mode !== 'pro' && m.mode !== 'ultra') problems.push('tsubaki3 takes mode pro or ultra');
  if (m.model === 'tsubaki2' && !m.mode) problems.push('tsubaki2 needs a mode (lite, standard or pro)');
  if ((m.model === 'haruka2' || m.model === 'hoshino2') && m.mode) problems.push(`${m.model} has no inference profiles: drop mode`);
  const size = sizeProblem(m);
  if (size) problems.push(size);
  const neg = m.negative.toLowerCase();
  for (const word of NEGATIVE_MUST) if (!new RegExp(`\\b${word}\\b`).test(neg)) problems.push(`negative lacks "${word}"`);
  const sdxl = m.model === 'haruka2' || m.model === 'hoshino2';
  for (const re of sdxl ? [...FORBIDDEN, ...FORBIDDEN_SDXL] : FORBIDDEN) {
    const hit = re.exec(m.prompt);
    if (hit) problems.push(`prompt names "${hit[0]}" (hard limits: say it positively, put it in the negative)`);
  }
  if (!m.label.startsWith('cover-v3')) problems.push(`label ${m.label} should start with cover-v3 (ledger)`);
  if (recipe?.title.mode === 'painted') {
    const title = await fixtureTitle(m.storyId);
    if (!title) problems.push(`no fixture title for ${m.storyId}`);
    else if (!m.prompt.includes(`"${title}"`)) problems.push(`painted recipe: the prompt must quote the exact title "${title}"`);
  }
  return problems;
}

function estimate(m: Manifest): number | null {
  const key = m.mode ? `${m.model}:${m.mode}:${m.width}x${m.height}` : `${m.model}:${m.width}x${m.height}`;
  return recipesFile.prices[key] ?? null;
}

// ---------------------------------------------------------------- load and check

if (!(await exists(manifestDir))) {
  console.log(`no manifests: ${manifestDir} does not exist`);
  process.exit(1);
}
const files = (await readdir(manifestDir)).filter((f) => f.endsWith('.json')).sort();
const manifests: Manifest[] = [];
let invalid = 0;
for (const file of files) {
  const id = file.replace(/\.json$/, '');
  if ((only.size || force.size) && !only.has(id) && !force.has(id)) continue;
  let m: Manifest;
  try {
    m = JSON.parse(await readFile(join(manifestDir, file), 'utf8')) as Manifest;
  } catch (error) {
    console.log(`INVALID ${file}: ${String(error)}`);
    invalid += 1;
    continue;
  }
  const problems = await validate(file, m);
  if (problems.length) {
    console.log(`INVALID ${file}:\n  - ${problems.join('\n  - ')}`);
    invalid += 1;
  } else manifests.push(m);
}
for (const id of [...only, ...force]) if (!files.includes(`${id}.json`)) console.log(`no manifest for ${id}`);
if (invalid) {
  console.log(`${invalid} invalid manifest(s): nothing drawn`);
  process.exit(1);
}

const todo: Manifest[] = [];
for (const m of manifests) {
  if (!force.has(m.storyId) && (await exists(join(RAW, `${m.storyId}.png`)))) console.log(`skip ${m.storyId} (raw exists)`);
  else todo.push(m);
}

const fmt = (n: number) => n.toLocaleString('en-US');

if (dry) {
  let total = 0;
  let unknown = 0;
  for (const m of todo) {
    const est = estimate(m);
    if (est === null) unknown += 1;
    else total += est;
    const recipe = recipes.get(m.recipe)!;
    console.log(
      `\n## ${m.storyId}${force.has(m.storyId) ? ' (force)' : ''}: ${recipe.name} · ${m.model}${m.mode ? `:${m.mode}` : ''} ` +
        `${m.width}x${m.height} · ~${est === null ? '?' : fmt(est)} credits · label ${m.label}` +
        `${recipe.title.mode === 'painted' ? ' · title painted' : ''}`,
    );
    console.log(`prompt (${m.prompt.length} chars):\n${m.prompt}`);
    console.log(`negative:\n${m.negative}`);
  }
  console.log(
    `\n${todo.length} to draw, ~${fmt(total)} credits${unknown ? ` + ${unknown} at an unmeasured size` : ''} ` +
      `(cap ${fmt(cap)}, jobs ${jobs}). Dry run: nothing was sent to PixAI.`,
  );
} else {
  await mkdir(join(RAW, 'rejected'), { recursive: true });
  let credits = 0;
  let reserved = 0;
  let drawn = 0;
  const queue = [...todo];
  const worker = async (): Promise<void> => {
    for (let m = queue.shift(); m; m = queue.shift()) {
      const file = join(RAW, `${m.storyId}.png`);
      if (!force.has(m.storyId) && (await exists(file))) {
        console.log(`skip ${m.storyId} (raw appeared)`);
        continue;
      }
      const est = estimate(m) ?? 4_400;
      if (credits + reserved + est > cap) {
        console.log(`STOP ${m.storyId}: would pass the ${fmt(cap)}-credit cap (spent ${fmt(credits)}, in flight ${fmt(reserved)})`);
        continue;
      }
      reserved += est;
      try {
        const r = await pixaiGenerate({
          prompt: m.prompt,
          negativePrompt: m.negative,
          model: m.model,
          mode: m.mode,
          width: m.width,
          height: m.height,
          label: m.label,
        });
        if (await exists(file)) await rename(file, join(RAW, 'rejected', `${m.storyId}-${Date.now()}.png`));
        await writeFile(file, r.png);
        credits += r.paidQuota;
        drawn += 1;
        console.log(`ok ${m.storyId} ${m.model} ${r.width}x${r.height} ${fmt(r.paidQuota)} credits ${(r.latencyMs / 1000).toFixed(0)}s`);
      } catch (error) {
        console.log(`FAIL ${m.storyId}: ${String(error)}`);
      } finally {
        reserved -= est;
      }
    }
  };
  await Promise.all(Array.from({ length: jobs }, worker));
  console.log(`drew ${drawn} of ${todo.length}; this run ${fmt(credits)} credits`);
}

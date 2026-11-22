/**
 * Releases chosen new stories, and only those.
 *
 * Why not `npm run migrate`: it upserts the WHOLE LAUNCH_CATALOG. While the
 * new-50 are in flight, main holds stories registered raw, without art, and a
 * plain prod migrate would put every one of them live. This seeds only the
 * stories named, with the same SQL as migrate.ts `seedCatalog` (kept in step
 * by hand: if that function changes, change `seedOne` below).
 *
 * Two phases:
 *
 *   # A. Local: validate, stamp publishedAt, run the gates, seed the local DB, print the git steps.
 *   npx tsx infra/scripts/release-stories.ts story_skill_error story_rank_zero
 *   npx tsx infra/scripts/release-stories.ts --ready            # every story_* id in docs/stories-50/READY.md
 *
 *   # B. Production, after the commit is pushed and deployed (assets ship in the API image):
 *   npx tsx infra/scripts/release-stories.ts --prod --dry-run <ids>   # read-only transaction, writes nothing
 *   npx tsx infra/scripts/release-stories.ts --prod <ids>
 *
 * Flags: --dry-run (no file edits, no DB writes), --skip-tests, --url=<postgres> (phase A target;
 * default the local plotbreak_local), --prod (reads PROD_DATABASE_URL from the root .env, and only
 * then). A production run refuses to stamp files or skip the deploy check: stamp in phase A.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from 'pg';
import type { StoryVersion } from '@plotbreak/contracts';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const FIXTURES = join(ROOT, 'packages/test-fixtures/src');
const ASSETS = join(ROOT, 'infra/seed/assets');
const LOCAL_URL = 'postgres://localhost/plotbreak_local';

const args = process.argv.slice(2);
const flag = (name: string): boolean => args.includes(`--${name}`);
const option = (name: string): string | undefined =>
  args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const dryRun = flag('dry-run');
const prod = flag('prod');

function die(message: string): never {
  console.error(`\n✗ ${message}`);
  process.exit(1);
}

/** One KEY from the root .env, anchored, so PROD_DATABASE_URL and DATABASE_URL never cross. */
function dotenv(key: string): string | undefined {
  const raw = existsSync(join(ROOT, '.env')) ? readFileSync(join(ROOT, '.env'), 'utf8') : '';
  const match = raw.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match?.[1]?.trim().replace(/^["']|["']$/g, '') || undefined;
}

function requestedIds(): string[] {
  const ids = new Set<string>();
  if (flag('ready')) {
    const ready = join(ROOT, 'docs/stories-50/READY.md');
    if (!existsSync(ready)) die('docs/stories-50/READY.md does not exist yet.');
    for (const m of readFileSync(ready, 'utf8').matchAll(/\bstory_[a-z0-9_]+\b/g)) ids.add(m[0]);
  }
  for (const a of args.filter((x) => !x.startsWith('--'))) ids.add(a.startsWith('story_') ? a : `story_${a.replace(/-/g, '_')}`);
  if (ids.size === 0) die('Name the stories (story_<id> …) or pass --ready.');
  return [...ids];
}

/** The fixture file that defines a story: the one whose storyId line names it. */
function fixtureFile(storyId: string): string {
  const hits = readdirSync(FIXTURES)
    .filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && f !== 'index.ts')
    .filter((f) => new RegExp(`storyId:\\s*['"]${storyId}['"]`).test(readFileSync(join(FIXTURES, f), 'utf8')));
  if (hits.length !== 1) die(`${storyId}: expected one fixture file declaring it, found ${hits.length}.`);
  return join(FIXTURES, hits[0]!);
}

function assetPresent(key: string | null | undefined): boolean {
  return !!key && existsSync(join(ASSETS, `${key}.webp`));
}

/** Everything a released story needs: registered, wrapped with art keys, and every file on disk. */
function validate(story: StoryVersion): string[] {
  const problems: string[] = [];
  if (!story.coverImage) problems.push('not wrapped in withDerivedAssetKeys (no coverImage)');
  const keys: Array<[string, string | null | undefined]> = [
    ['cover', story.coverImage],
    ['key art', story.keyArt],
    ['opening panel', story.openingPanel?.assetKey],
    ...story.locations.map((l): [string, string | null] => [`stage ${l.id}`, l.stageImage]),
    ...story.characters.map((c): [string, string | null] => [`portrait ${c.id}`, c.portrait]),
  ];
  for (const [what, key] of keys) if (key && !assetPresent(key)) problems.push(`${what}: no ${key}.webp`);
  if (!story.openingPanel) problems.push('no openingPanel');
  return problems;
}

function runGate(label: string, cmd: string, cmdArgs: string[]): void {
  console.log(`\n▸ ${label}: ${cmd} ${cmdArgs.join(' ')}`);
  const r = spawnSync(cmd, cmdArgs, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  const out = `${r.stdout}\n${r.stderr}`;
  for (const line of out.split('\n')) if (/Test Files|Tests {2}|FAIL|error TS/.test(line)) console.log(`  ${line.trim()}`);
  if (r.status !== 0) die(`${label} failed (exit ${r.status}). Nothing was released.`);
}

interface Plan {
  storyId: string;
  title: string;
  action: 'new' | 'revised' | 'unchanged';
  version: number;
  versionId: string;
}

/** Same comparison as migrate.ts: a definition that differs, ignoring id and version, is a new version. */
async function planOne(client: Client, story: StoryVersion): Promise<Plan> {
  const { rows } = await client.query<{ version: number; definition: unknown }>(
    'SELECT version, definition FROM story_versions WHERE story_id = $1 ORDER BY version DESC LIMIT 1',
    [story.storyId],
  );
  const current = rows[0];
  if (!current) return { storyId: story.storyId, title: story.title, action: 'new', version: story.version, versionId: story.id };
  const { rows: diff } = await client.query<{ changed: boolean }>(
    `SELECT (($1::jsonb - 'id' - 'version') IS DISTINCT FROM ($2::jsonb - 'id' - 'version')) AS changed`,
    [JSON.stringify(current.definition), JSON.stringify(story)],
  );
  if (!diff[0]?.changed) {
    return { storyId: story.storyId, title: story.title, action: 'unchanged', version: current.version, versionId: '' };
  }
  const version = current.version + 1;
  return {
    storyId: story.storyId,
    title: story.title,
    action: 'revised',
    version,
    versionId: `${story.id.replace(/_\d+$/, '')}_${version}`,
  };
}

/** migrate.ts seedCatalog, for one story. */
async function seedOne(client: Client, story: StoryVersion, plan: Plan): Promise<void> {
  await client.query(
    `INSERT INTO stories (story_id, slug, creator_id, official, status)
     VALUES ($1,$2,NULL,true,'PUBLISHED')
     ON CONFLICT (story_id) DO UPDATE SET status = 'PUBLISHED', updated_at = now()`,
    [story.storyId, story.storyId.replace(/^story_/, '').replace(/_/g, '-')],
  );
  if (plan.action === 'unchanged') return;
  await client.query(
    `INSERT INTO story_versions (story_version_id, story_id, version, definition, title,
                                 fantasy_label, hook, intensity, content_descriptors,
                                 clarity_passed, published_at)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,true,COALESCE($10, now()))
     ON CONFLICT (story_version_id) DO NOTHING`,
    [
      plan.versionId,
      story.storyId,
      plan.version,
      JSON.stringify({ ...story, id: plan.versionId, version: plan.version }),
      story.title,
      story.fantasyLabel,
      story.hook,
      story.intensity,
      story.contentDescriptors,
      story.publishedAt,
    ],
  );
  await client.query('UPDATE stories SET published_version_id = $2 WHERE story_id = $1', [story.storyId, plan.versionId]);
  await client.query('INSERT INTO story_signals (story_id) VALUES ($1) ON CONFLICT DO NOTHING', [story.storyId]);
}

async function main(): Promise<void> {
  const ids = requestedIds();
  const stamp = new Date().toISOString();

  // 1. Every story is registered, wrapped, and has its art on disk.
  const chosen: StoryVersion[] = [];
  let invalid = 0;
  for (const id of ids) {
    const story = LAUNCH_CATALOG.find((s) => s.storyId === id);
    if (!story) {
      console.log(`✗ ${id}: not in LAUNCH_CATALOG`);
      invalid++;
      continue;
    }
    const problems = validate(story);
    if (problems.length) {
      console.log(`✗ ${id}: ${problems.join('; ')}`);
      invalid++;
      continue;
    }
    chosen.push(story);
  }
  if (invalid) die(`${invalid} of ${ids.length} not releasable. Nothing was changed.`);
  console.log(`✓ ${chosen.length} releasable: ${chosen.map((s) => s.title).join(', ')}`);

  // 2. publishedAt. Phase A stamps the fixture; production requires it already stamped,
  //    so the definition written to prod is exactly what main holds.
  const edited: string[] = [];
  const released = chosen.map((story) => {
    if (story.publishedAt) return story;
    if (prod) die(`${story.storyId} has publishedAt: null. Run phase A (without --prod), commit and push first.`);
    const file = fixtureFile(story.storyId);
    const src = readFileSync(file, 'utf8');
    const count = (src.match(/^\s{2}publishedAt:\s*null,\s*$/gm) ?? []).length;
    if (count !== 1) die(`${relative(ROOT, file)}: expected one top-level "publishedAt: null," line, found ${count}.`);
    if (!dryRun) writeFileSync(file, src.replace(/^(\s{2})publishedAt:\s*null,\s*$/m, `$1publishedAt: '${stamp}',`));
    edited.push(relative(ROOT, file));
    console.log(`${dryRun ? '· would stamp' : '✓ stamped'} ${relative(ROOT, file)} publishedAt ${stamp}`);
    return { ...story, publishedAt: stamp };
  });

  // 3. The gates, on the stamped files. Production ran them in phase A.
  if (!prod && !dryRun && !flag('skip-tests')) {
    runGate('tests', 'npm', ['test']);
    runGate('typecheck', 'npm', ['run', 'typecheck']);
  }

  // 4. Production must not list a story before the image with its art is live.
  if (prod) {
    spawnSync('git', ['fetch', '-q', 'origin'], { cwd: ROOT });
    const pushed = spawnSync('git', ['merge-base', '--is-ancestor', 'HEAD', 'origin/main'], { cwd: ROOT }).status === 0;
    if (!pushed) die('HEAD is not on origin/main. Push (and let Railway deploy) before releasing to production.');
    console.log('✓ HEAD is on origin/main. Make sure that deploy is live (art ships in the image).');
  }

  // 5. The database.
  const url = prod ? dotenv('PROD_DATABASE_URL') : (option('url') ?? LOCAL_URL);
  if (!url) die('No PROD_DATABASE_URL in the root .env.');
  if (!prod && url === dotenv('PROD_DATABASE_URL')) die('--url is the production database. Use --prod for that.');
  const client = new Client({
    connectionString: url,
    ssl: /supabase|amazonaws|render|neon/.test(url) ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();
  const target = prod ? 'PRODUCTION' : url.replace(/\/\/[^@]*@/, '//***@');
  try {
    // A dry run is a read-only transaction: Postgres itself refuses any write in it.
    await client.query(dryRun ? 'BEGIN READ ONLY' : 'BEGIN');
    const plans: Plan[] = [];
    for (const story of released) plans.push(await planOne(client, story));

    console.log(`\n${dryRun ? 'Would write' : 'Writing'} to ${target}:`);
    for (const p of plans) {
      console.log(`  ${p.action === 'new' ? '+' : p.action === 'revised' ? '↑' : '·'} ${p.title} (${p.action}${p.action === 'unchanged' ? '' : `, v${p.version}`})`);
    }

    // What a plain `npm run migrate` would also do right now, so nobody runs it by accident.
    const others = LAUNCH_CATALOG.filter((s) => !ids.includes(s.storyId));
    const otherPlans: Plan[] = [];
    for (const s of others) otherPlans.push(await planOne(client, s)); // one connection: one query at a time
    const surprises = otherPlans.filter((p) => p.action !== 'unchanged');
    if (surprises.length) {
      console.log(`\n⚠ A plain "npm run migrate" here would ALSO publish ${surprises.length} more:`);
      for (const p of surprises) console.log(`    ${p.action === 'new' ? '+' : '↑'} ${p.title} (${p.action})`);
    }
    const { rows: applied } = await client.query<{ filename: string }>('SELECT filename FROM schema_migrations');
    const pending = readdirSync(join(ROOT, 'infra/migrations'))
      .filter((f) => f.endsWith('.sql') && !applied.some((a) => a.filename === f));
    if (pending.length) console.log(`\n⚠ Schema migrations not applied here (this script never applies them): ${pending.join(', ')}`);

    if (dryRun) {
      await client.query('ROLLBACK');
      console.log('\nDry run: nothing written.');
    } else {
      for (let i = 0; i < released.length; i++) await seedOne(client, released[i]!, plans[i]!);
      await client.query('COMMIT');
      console.log(`\n✓ ${plans.filter((p) => p.action !== 'unchanged').length} written to ${target}.`);
    }
  } catch (error) {
    await client.query('ROLLBACK').catch(() => undefined);
    throw error;
  } finally {
    await client.end();
  }

  // 6. The rest is a person's job.
  if (!prod) {
    const ids_ = chosen.map((s) => s.storyId).join(' ');
    console.log(`
Next, by hand:
  git add ${edited.length ? edited.join(' ') : '(nothing stamped)'}
  git commit -m "Release: ${chosen.map((s) => s.title).join(', ')}"
  git pull --no-rebase origin main          # merged clean on 2026-11-22; re-run the gates if it brought code
  npm test 2>&1 | grep -E "Test Files|Tests |FAIL"; npm run typecheck
  git push origin main                      # Railway builds the image that carries the art
  # when that deploy is live:
  npx tsx infra/scripts/release-stories.ts --prod --dry-run ${ids_}
  npx tsx infra/scripts/release-stories.ts --prod ${ids_}
  # sessions pin versions, so players see a story the next time they open Discover`);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});

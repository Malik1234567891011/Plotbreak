/**
 * Run the translations a publish queued, on purpose.
 *
 * Publishing queues a world's other language and the API sweeps for what was
 * never finished — but a backfill of worlds that were published before any of
 * this existed is a bill somebody should decide to pay rather than discover.
 * So the sweep is also available here, with a limit, and dry by default.
 *
 *     npx tsx infra/scripts/translate-worlds.ts                 # what is owed
 *     npx tsx infra/scripts/translate-worlds.ts --write         # do up to --limit
 *     npx tsx infra/scripts/translate-worlds.ts --write --limit=1
 *     npx tsx infra/scripts/translate-worlds.ts --write --story=story_user_xxx
 *
 * Runs the same `translateInto` the server does, so what this proves is what
 * production will do rather than something shaped like it.
 */
import { createAppContext } from '../../services/api/src/context.js';
import { translateInto } from '../../services/api/src/translate-story.js';

const args = process.argv.slice(2);
const WRITE = args.includes('--write');
const LIMIT = Number(args.find((a) => a.startsWith('--limit='))?.slice('--limit='.length) ?? 20);
const ONLY = args.find((a) => a.startsWith('--story='))?.slice('--story='.length) ?? null;

async function main(): Promise<void> {
  const ctx = createAppContext();
  if (!ctx.modelGateway) throw new Error('No model provider configured. Set OPENAI_API_KEY.');

  const owed = await ctx.repo.listPendingStoryText(100);
  const rows: typeof owed = [];
  for (const row of owed) {
    const story = await ctx.repo.getStoryVersion(row.storyVersionId);
    if (!story) continue;
    if (ONLY && story.storyId !== ONLY) continue;
    rows.push(row);
  }

  if (rows.length === 0) {
    console.log('Nothing owed.');
    return;
  }

  console.log(`${rows.length} translation(s) owed:\n`);
  for (const row of rows) {
    const story = await ctx.repo.getStoryVersion(row.storyVersionId);
    console.log(
      `  ${story!.title.padEnd(26)} ${story!.sourceLocale} → ${row.locale}  ` +
        `(${row.status}, ${row.attempts} attempt${row.attempts === 1 ? '' : 's'})`,
    );
  }

  if (!WRITE) {
    console.log(`\nDry run. Pass --write to run up to ${LIMIT}. Each one is a model call per batch.`);
    return;
  }

  let done = 0;
  for (const row of rows.slice(0, LIMIT)) {
    const story = await ctx.repo.getStoryVersion(row.storyVersionId);
    if (!story) continue;
    process.stdout.write(`\n  ${story.title} → ${row.locale} … `);
    const ok = await translateInto(ctx, story, row.locale, row);
    const after = (await ctx.repo.getStoryText(row.storyVersionId)).find((r) => r.locale === row.locale);
    if (ok) {
      done += 1;
      console.log(
        `${Object.keys(after?.text ?? {}).length} fields` +
          (after?.missing.length ? `, ${after.missing.length} left in ${story.sourceLocale}` : ''),
      );
    } else {
      console.log(`failed (${after?.error ?? 'no reason recorded'})`);
    }
  }
  console.log(`\n${done}/${Math.min(rows.length, LIMIT)} translated.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

/**
 * How much French a world needs, before committing to writing it.
 *
 *   npm run fr:size                 # every world, least covered first
 *   npm run fr:size -- --world=story_ace
 *
 * `fr:adapt` sends tier A in batches of ten and tier B in batches of forty, so
 * the field counts here are the request counts, and the character total is what
 * the writing actually costs. Worth knowing before starting rather than after.
 */
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { worldTextCoverage } from '@plotbreak/contracts';
import { manifestFor } from './fr-manifest.js';

const only = process.argv.slice(2).find((a) => a.startsWith('--world='))?.slice('--world='.length);

const rows = (LAUNCH_CATALOG as unknown as Array<{ storyId: string; title: string }>)
  .filter((w) => (only ? w.storyId === only : true))
  .map((w) => {
    const fields = manifestFor(w as never);
    const a = fields.filter((f) => f.tier === 'A');
    const b = fields.filter((f) => f.tier === 'B');
    const chars = [...a, ...b].reduce((n, f) => n + f.chars, 0);
    return {
      title: w.title,
      storyId: w.storyId,
      // `worldTextCoverage` returns the *count* of translated keys, not a
      // fraction. Coverage is that count over the fields worth translating.
      coverage: a.length + b.length === 0
        ? 100
        : Math.min(100, Math.round((worldTextCoverage('fr', w.storyId) / (a.length + b.length)) * 100)),
      a: a.length,
      b: b.length,
      c: fields.length - a.length - b.length,
      chars,
      requests: Math.ceil(a.length / 10) + Math.ceil(b.length / 40),
    };
  })
  .sort((x, y) => x.coverage - y.coverage);

console.log('\ncoverage  tierA  tierB  skipped   chars  calls  world');
for (const r of rows) {
  console.log(
    `${String(r.coverage).padStart(7)}%  ${String(r.a).padStart(5)}  ${String(r.b).padStart(5)}  ` +
      `${String(r.c).padStart(7)}  ${r.chars.toLocaleString().padStart(6)}  ${String(r.requests).padStart(5)}  ${r.title}`,
  );
}
const todo = rows.filter((r) => r.coverage < 100);
console.log(
  `\n${todo.length} world(s) below full coverage, ${todo.reduce((n, r) => n + r.chars, 0).toLocaleString()} chars ` +
    `and ${todo.reduce((n, r) => n + r.requests, 0)} model calls outstanding.`,
);

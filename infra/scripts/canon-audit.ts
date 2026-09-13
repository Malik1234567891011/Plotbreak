/**
 * The launch catalogue's hard canon, and what the restored fields cost.
 */
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { worldBrief } from '@plotbreak/director';

const tok = (s: string) => Math.round(s.length / 4);
const stories = (LAUNCH_CATALOG as any[]).slice().sort((a, b) => a.storyId.localeCompare(b.storyId));

console.log('story                   canon  canonTok  archTok  itemTok  openTok  | briefTok');
const rows: Array<{ id: string; brief: number }> = [];
for (const s of stories) {
  const canon = s.rules.hardCanon as string[];
  const canonTok = tok(canon.join('\n'));
  const chosen = s.archetypes[0]?.id ?? null;
  const brief = worldBrief(s, chosen);
  const archTok = tok(
    s.archetypes.map((a: any) => [a.role, a.summary, a.blurb].join(' ')).join(' '),
  );
  const itemTok = tok(s.items.filter((i: any) => i.questItem).map((i: any) => `${i.description} ${i.loreText}`).join(' '));
  const openTok = tok(String(s.opening ?? ''));
  rows.push({ id: s.storyId, brief: tok(brief) });
  console.log(
    `  ${s.storyId.replace('story_', '').padEnd(22)} ${String(canon.length).padStart(3)}  ${String(canonTok).padStart(7)}  ${String(archTok).padStart(7)}  ${String(itemTok).padStart(7)}  ${String(openTok).padStart(7)}  | ${String(tok(brief)).padStart(7)}`,
  );
}
rows.sort((a, b) => a.brief - b.brief);
console.log(`\nstatic prefix: smallest ${rows[0]!.id} ${rows[0]!.brief} tok · median ${rows[Math.floor(rows.length / 2)]!.brief} tok · largest ${rows.at(-1)!.id} ${rows.at(-1)!.brief} tok`);

// Contradiction sweep: a canon entry naming somebody the cast does not contain,
// or a location that does not exist, is the cheap class of authoring bug.
console.log('\nhard-canon issues:');
let issues = 0;
for (const s of stories) {
  const canon = s.rules.hardCanon as string[];
  if (!canon.length) { console.log(`  ${s.storyId}: NO hardCanon authored`); issues += 1; continue; }
  const empty = canon.filter((c) => c.trim().length < 20);
  if (empty.length) { console.log(`  ${s.storyId}: ${empty.length} suspiciously short entries`); issues += 1; }
  const dupes = canon.length - new Set(canon.map((c) => c.trim())).size;
  if (dupes) { console.log(`  ${s.storyId}: ${dupes} duplicate entries`); issues += 1; }
}
if (!issues) console.log('  none — every launch story authors hard canon, no empties, no duplicates');

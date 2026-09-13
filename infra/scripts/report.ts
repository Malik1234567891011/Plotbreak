/**
 * One deterministic playtest report.
 *
 *   npm run report -- <sessionId>
 *   npm run report -- <sessionId> --from=1 --to=40
 *
 * Every number in a playtest write-up should come from here. Two earlier
 * reports on the *same* session disagreed — 13 checks against 7, 35 stalled
 * beats against 20 — and the engine had not changed between them. Both numbers
 * came from throwaway scripts, and the second one did
 * `const state = byRevision.get(turn.revisionAfter); if (!state) continue;`.
 * `session_snapshots` is not one row per turn (120 rows for 81 turns), so six
 * turns had no snapshot at their `revisionAfter` and were dropped **along with
 * their checks**. Contradictory telemetry is worse than none: it lets a fix
 * look like it worked.
 *
 * So: the unit is the turn row, every turn is counted, and a missing snapshot
 * degrades one measurement rather than discarding the turn.
 */
import { Pool } from 'pg';
import { readFileSync } from 'node:fs';
import { findPresenceOfAbsent, findUnlicensedTravel } from '@plotbreak/director';

const J = (v: unknown): any => (typeof v === 'string' ? JSON.parse(v) : v);

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const sessionId = argv.find((a) => !a.startsWith('--'));
  if (!sessionId) throw new Error('usage: npm run report -- <sessionId> [--from=N] [--to=N]');
  const flag = (n: string): number | undefined => {
    const raw = argv.find((a) => a.startsWith(`--${n}=`))?.slice(n.length + 3);
    return raw === undefined ? undefined : Number(raw);
  };
  const from = flag('from') ?? 0;
  const to = flag('to') ?? Number.MAX_SAFE_INTEGER;

  const url = readFileSync('.env', 'utf8').match(/^DATABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  const pool = new Pool({ connectionString: url });

  const { rows: snaps } = await pool.query(
    `SELECT revision, state FROM session_snapshots WHERE session_id=$1 ORDER BY revision`, [sessionId]);
  const byRevision = new Map<number, any>(snaps.map((r) => [r.revision, J(r.state)]));
  const { rows: turns } = await pool.query(
    `SELECT * FROM turns WHERE session_id=$1 ORDER BY turn_index`, [sessionId]);

  const inRange = turns.filter((t) => t.turn_index >= from && t.turn_index <= to);

  let checks = 0;
  const checkLabels = new Map<string, number>();
  let absentActing = 0, unlicensedTravel = 0, travelAsked = 0, travelCommitted = 0;
  let noSnapshot = 0;
  const locations = new Set<string>();
  const motifs = new Map<string, number>();
  const openers = new Map<string, number>();
  let words = 0, blocks = 0, dialogue = 0;

  for (const t of inRange) {
    const res = J(t.resolution), muts = J(t.mutations) ?? [], body = J(t.blocks) ?? [];
    // Counted from the turn row, never gated on a snapshot existing.
    for (const c of J(t.checks) ?? []) {
      checks += 1;
      checkLabels.set(c.label, (checkLabels.get(c.label) ?? 0) + 1);
    }
    const committed = (res?.normalizedActions ?? []).some((a: any) => a.verb === 'travel' || a.verb === 'move');
    if (committed) travelCommitted += 1;
    if (/\b(go|going|head|heading|walk|walking|leave|leaving|set off)\b/i.test(t.action_text ?? '')) travelAsked += 1;
    unlicensedTravel += findUnlicensedTravel(body, { travelled: committed }).length > 0 ? 1 : 0;

    for (const b of body) {
      const n = String(b.text).split(/\s+/).length;
      words += n; blocks += 1;
      if (b.type === 'DIALOGUE') {
        dialogue += 1;
        const first = String(b.text).replace(/^["“«\s]+/, '').split(/[\s,.!?]/)[0]?.toLowerCase();
        if (first) openers.set(`${b.speakerId}:${first}`, (openers.get(`${b.speakerId}:${first}`) ?? 0) + 1);
      }
      for (const w of String(b.text).toLowerCase().match(/\p{L}{5,}/gu) ?? []) {
        motifs.set(w, (motifs.get(w) ?? 0) + 1);
      }
    }

    const state = byRevision.get(t.revision_after);
    if (!state) { noSnapshot += 1; continue; }   // degrade one measurement, keep the turn
    locations.add(state.player.locationId);
    const here = new Set(state.characters.filter((c: any) => c.locationId === state.player.locationId).map((c: any) => c.characterId));
    const absent = state.characters.filter((c: any) => !here.has(c.characterId))
      .map((c: any) => ({ id: c.characterId, name: c.characterId }));
    if (findPresenceOfAbsent(body.map((b: any) => ({ text: b.text })), absent).length) absentActing += 1;
  }

  const top = (m: Map<string, number>, n: number) =>
    [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  const STOP = new Set(['their','there','about','which','would','could','still','after','before','against','through','around','because','something','nothing']);

  console.log(`# Playtest report — ${sessionId}`);
  console.log(`turns ${inRange.length} (index ${inRange[0]?.turn_index}–${inRange.at(-1)?.turn_index})` +
    (noSnapshot ? `, ${noSnapshot} without a state snapshot (presence/location skipped for those)` : ''));
  console.log(`\n## Checks — ${checks}`);
  for (const [label, n] of top(checkLabels, 12)) console.log(`  ${n}x ${label}`);
  console.log(`\n## Movement`);
  console.log(`  turns whose text mentions going somewhere: ${travelAsked}`);
  console.log(`  turns with a committed travel/move action:  ${travelCommitted}`);
  console.log(`  beats that narrate leaving with no travel:  ${unlicensedTravel}`);
  console.log(`  distinct locations: ${[...locations].join(', ') || '(none)'}`);
  console.log(`\n## Presence`);
  console.log(`  beats where an absent character acts: ${absentActing}`);
  console.log(`\n## Prose`);
  console.log(`  words/turn ${(words / Math.max(1, inRange.length)).toFixed(0)}  blocks/turn ${(blocks / Math.max(1, inRange.length)).toFixed(1)}  dialogue/turn ${(dialogue / Math.max(1, inRange.length)).toFixed(1)}`);
  console.log(`\n## Repeated openers (speaker:word)`);
  for (const [k, n] of top(openers, 8)) if (n > 1) console.log(`  ${n}x ${k}`);
  console.log(`\n## Motifs`);
  for (const [w, n] of top(motifs, 40).filter(([w]) => !STOP.has(w)).slice(0, 20)) console.log(`  ${n}x ${w}`);

  await pool.end();
}

void main().catch((e) => { console.error(e); process.exit(1); });

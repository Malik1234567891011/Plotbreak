/**
 * Does a steering note make a long run's world push again, without hijacking
 * the player?
 *
 * Replays real production turns: the exact prefix, arcs and verbatim history a
 * given turn was written against, and the player's own action from that turn.
 * Each point is generated under several conditions, then judged.
 *
 * Read-only against the database. Writes results to
 * `scratchpad/arc-pressure/<label>.jsonl`.
 *
 *   tsx --env-file=.env infra/scripts/arc-pressure-probe.ts --label=v1 \
 *     --points=sess_…:560,sess_…:912 --conditions=base,pressure --samples=3
 */
import { mkdirSync, appendFileSync, existsSync, readFileSync } from 'node:fs';
import pg from 'pg';
import { z } from 'zod';
import { GameState, StoryVersion, ArcCarry, QUALITY_TIERS, type StoryArc } from '@plotbreak/contracts';
import { runTurnPure, OpenAiGateway, arcDecision, arcPrefix, approxTokens, pressureNote, chooseThread, openThreads } from '@plotbreak/director';
import { NOTES } from './arc-pressure-notes.js';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, ...v] = a.replace(/^--/, '').split('=');
    return [k, v.join('=')];
  }),
);
const label = args.label ?? 'run';
const samples = Number(args.samples ?? 3);
const conditions = (args.conditions ?? 'base,pressure').split(',');
const points = (args.points ?? '').split(',').filter(Boolean).map((p) => {
  const [session, turn] = p.split(':');
  return { session: session!, turn: Number(turn) };
});
const tier = QUALITY_TIERS[(args.tier ?? 'QUICK') as keyof typeof QUALITY_TIERS];

const db = new pg.Client({ connectionString: process.env.DATABASE_URL });
const gateway = new OpenAiGateway({
  apiKey: process.env.OPENAI_API_KEY!,
  models: { writer_premium: 'gpt-5.6-terra' },
});

const PARTS: Record<string, number> = {
  night: 2 * 60, 'early morning': 6 * 60, morning: 10 * 60, midday: 12 * 60 + 30,
  afternoon: 15 * 60, evening: 19 * 60,
};
/** Inverse of `formatStoryTime`, close enough to reproduce the same header. */
function minuteFor(label: string): number {
  const m = /^(Day|Week|Month|Year) (\d+) · (.+)$/.exec(label.trim());
  if (!m) throw new Error(`unparsed time label: ${label}`);
  const n = Number(m[2]) - 1;
  const days = { Day: n, Week: n * 7, Month: n * 30, Year: n * 365 }[m[1] as 'Day'];
  return days * 1440 + (PARTS[m[3]!] ?? 12 * 60);
}

interface Loaded {
  story: StoryVersion;
  state: GameState;
  arcs: StoryArc[];
  rendered: { user: string; assistant: string }[];
  actionText: string;
  original: string;
  threads: string[];
  injected: string[];
}

async function load(sessionId: string, turn: number): Promise<Loaded> {
  const sess = await db.query(`SELECT story_version_id FROM story_sessions WHERE session_id=$1`, [sessionId]);
  const def = await db.query(`SELECT definition FROM story_versions WHERE story_version_id=$1`, [sess.rows[0].story_version_id]);
  const story = StoryVersion.parse(def.rows[0].definition);
  const snap = await db.query(
    `SELECT s.state FROM session_snapshots s JOIN story_sessions ss ON ss.session_id=s.session_id AND ss.revision=s.revision WHERE s.session_id=$1`,
    [sessionId],
  );
  const current = GameState.parse(snap.rows[0].state);
  const arcRows = await db.query(
    `SELECT arc_index, title, recap, carried, from_turn, to_turn FROM story_arcs WHERE session_id=$1 AND to_turn < $2 ORDER BY arc_index`,
    [sessionId, turn],
  );
  const arcs: StoryArc[] = arcRows.rows.map((r) => ({
    arcIndex: r.arc_index, title: r.title, recap: r.recap, carried: ArcCarry.parse(r.carried ?? {}),
    fromTurn: r.from_turn, toTurn: r.to_turn,
  }) as StoryArc);
  const arcStart = arcs.length ? arcs[arcs.length - 1]!.toTurn + 1 : 0;
  const msgs = await db.query(
    `SELECT turn_index, user_text, assistant_text FROM pure_conversation WHERE session_id=$1 AND turn_index >= $2 AND turn_index <= $3 ORDER BY turn_index`,
    [sessionId, arcStart, turn],
  );
  const target = msgs.rows.find((r) => r.turn_index === turn);
  if (!target) throw new Error(`no stored turn ${turn}`);
  const rendered = msgs.rows.filter((r) => r.turn_index < turn).map((r) => ({ user: r.user_text, assistant: r.assistant_text }));

  // Rebuild the state the turn was written against from its own header.
  const user: string = target.user_text;
  const where = /The player is at (.+)\.\n/.exec(user)![1]!;
  const presentNames = /Present: (.+)\.\n/.exec(user)![1]!.split(', ').filter((n) => n !== 'nobody');
  const when = /It is (.+)\.\n/.exec(user)![1]!;
  let loc = story.locations.find((l) => l.name === where)?.id ?? current.player.locationId;
  let presentIds = new Set(presentNames.map((n) => story.characters.find((c) => c.name === n)?.id).filter(Boolean));
  // `--presence=fixed`: the header the fixed runtime would have built, which is
  // exactly the previous beat's own report of who is there.
  const injected: string[] = [];
  {
    const prev = msgs.rows.find((r) => r.turn_index === turn - 1)?.assistant_text ?? '';
    const tag = /\[[^\]]*· ([a-z0-9_]+) · present: ([^·\]]*)/.exec(prev);
    if (tag) {
      const reported = new Set(tag[2]!.split(',').map((x: string) => x.trim()).filter((x: string) => x && x !== 'nobody'));
      for (const id of presentIds) if (!reported.has(id as string)) injected.push(id as string);
      if (args.presence === 'fixed') {
        loc = tag[1]!;
        presentIds = reported as Set<string | undefined>;
      }
    }
  }
  const state = GameState.parse({
    ...current,
    player: { ...current.player, locationId: loc },
    characters: current.characters.map((c) => ({ ...c, locationId: presentIds.has(c.characterId) ? loc : '__probe_elsewhere__' })),
    worldMinute: minuteFor(when),
  });
  const actionText = user.split("## The player's action, verbatim\n\n")[1]!.split('\n\n(JSON only')[0]!;
  const threads = arcs.length
    ? arcs[arcs.length - 1]!.carried.open
    : story.quests.map((q) => `${q.title}${q.summary ? ` — ${q.summary}` : ''}`);
  return { story, state, arcs, rendered, actionText, original: target.assistant_text, threads, injected };
}

const Verdict = z.object({
  threadSurfaced: z.boolean(),
  whichThread: z.string().nullable(),
  cameFromWorld: z.boolean(),
  honorsAction: z.enum(['fully', 'partly', 'no']),
  naturalness: z.number().int().min(1).max(5),
  suggestionFollowsThread: z.boolean(),
  /** 0-based index of the suggestion that follows the thread, and of one that sets it aside. */
  followIdx: z.number().int().nullable(),
  leaveIdx: z.number().int().nullable(),
  note: z.string(),
});

const FollowVerdict = z.object({
  respected: z.boolean(),
  /** The thread takes over the beat or blocks what the player chose. */
  dominates: z.boolean(),
  threadOnPage: z.boolean(),
  note: z.string(),
});

async function judge(p: Loaded, beat: string, suggestions: string[]) {
  const res = await gateway.generateStructured(
    'writer_premium',
    Verdict,
    [
      {
        role: 'system',
        content:
          'You audit one beat of an interactive story. Judge strictly from the text.\n' +
          '- threadSurfaced: does this beat put one of the listed unresolved threads ON THE PAGE (a person tied to it appears, news of it arrives, evidence turns up, a consequence lands)? A passing mention in someone\'s thoughts does not count.\n' +
          '- cameFromWorld: true only if the thread arrives through the world (somebody else, an event), not because the player\'s action went looking for it.\n' +
          '- honorsAction: does the beat first carry out what the player wrote?\n' +
          '- naturalness: 5 = arrives like good fiction, 1 = bolted on.\n' +
          '- suggestionFollowsThread: does any suggestion let the player follow the surfaced thread?\n' +
          '- followIdx / leaveIdx: 0-based index of the suggestion that pursues the thread, and of one that sets it aside or ignores it; null if none.\n' +
          '- note: one sentence, what happened.',
      },
      {
        role: 'user',
        content:
          `## Unresolved threads\n${p.threads.map((t) => `- ${t}`).join('\n')}\n\n` +
          `## The player's action\n${p.actionText}\n\n## The beat\n${beat}\n\n## Suggestions\n${suggestions.map((s) => `- ${s}`).join('\n')}`,
      },
    ],
    { maxTokens: 1200, model: 'gpt-5.6-terra', temperature: 0, timeoutMs: 120_000, nativeSchema: true },
  );
  return res.value;
}

/** Network blips on this machine are common; a turn is worth three tries. */
async function retry<T>(fn: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await fn();
    } catch (e) {
      const msg = (e as Error).message;
      if (attempt >= 4 || !/fetch failed|ECONN|ETIMEDOUT|ENOTFOUND|socket|429|50\d/.test(msg)) throw e;
      await new Promise((r) => setTimeout(r, 15_000 * attempt));
    }
  }
}

async function main(): Promise<void> {
  await db.connect();
  mkdirSync('scratchpad/arc-pressure', { recursive: true });
  const out = `scratchpad/arc-pressure/${label}.jsonl`;
  // Resume: skip anything already written.
  const done = new Set(
    existsSync(out)
      ? readFileSync(out, 'utf8').split('\n').filter(Boolean).map((l) => {
          const r = JSON.parse(l);
          return `${r.session}:${r.turn}:${r.cond}:${r.i}`;
        })
      : [],
  );
  for (const point of points) {
    const p = await load(point.session, point.turn);
    const context = approxTokens(arcPrefix(p.arcs) ?? '') + p.rendered.reduce((n, m) => n + approxTokens(m.user) + approxTokens(m.assistant), 0);
    const winding = arcDecision({ contextTokens: context, sceneStatus: 'live', turnsSinceArcStart: p.rendered.length });
    console.log(`\n=== ${point.session.slice(-8)}:${point.turn}  ctx≈${context}  arcs=${p.arcs.length}  closing=${winding !== 'continue'}`);
    console.log(`    action: ${p.actionText.slice(0, 140)}`);
    const jobs = conditions
      .flatMap((cond) => Array.from({ length: samples }, (_, i) => ({ cond, i })))
      .filter(({ cond, i }) => !done.has(`${point.session}:${point.turn}:${cond}:${i}`));
    if (jobs.length === 0) continue;
    await Promise.all(jobs.map(async ({ cond, i }) => {
      try {
        const result = await retry(() => runTurnPure({
          gateway, story: p.story, state: p.state, recentTurns: [], rendered: p.rendered,
          shape: 'append', api: 'responses', cacheRetention: '24h',
          cacheKey: `probe:${point.session}:${point.turn}`,
          model: tier.model, reasoningEffort: tier.reasoningEffort, wordTarget: tier.words, maxTokens: tier.maxOutputTokens,
          arcs: p.arcs, arcClosing: winding !== 'continue',
          notes: cond === 'ship'
            ? [pressureNote(chooseThread(openThreads(p.story, p.state, p.arcs), p.rendered.map((m) => m.user))!)]
            : NOTES[cond] ? [NOTES[cond]!.replace('{thread}', p.threads[(i * 5 + point.turn) % p.threads.length] ?? '')] : [],
          actionText: p.actionText, turnId: `probe-${cond}-${i}`,
        }));
        const beat = result.blocks.map((b) => (b.speakerId ? `${b.speakerId}: ${b.text}` : b.text)).join('\n');
        const suggestions = result.suggestions.map((s) => s.text);
        const verdict = await retry(() => judge(p, beat, suggestions));
        const watch = p.injected.map((id) => p.story.characters.find((c) => c.id === id)?.name.split(' ')[0] ?? id);
        const row = { label, session: point.session, turn: point.turn, cond, i, verdict, beat, suggestions, watch,
          present: result.state.characters.filter((c) => c.locationId === result.state.player.locationId).map((c) => c.characterId),
          sceneStatus: result.sceneStatus, inputTokens: result.invocation.inputTokens, costUsd: result.invocation.costUsd };
        // Follow-up: the player takes the thread, or sets it aside, and the
        // next beat runs with no note at all. Does the story respect it?
        let followup: unknown = null;
        if (cond === 'ship' && args.followup) {
          const mode = i % 2 === 0 ? 'leave' : 'follow';
          const idx = mode === 'leave' ? verdict.leaveIdx : verdict.followIdx;
          const action = idx != null ? suggestions[idx] : undefined;
          if (action) {
            const next = await retry(() => runTurnPure({
              gateway, story: p.story, state: result.state, recentTurns: [], rendered: [...p.rendered, result.rendered],
              shape: 'append', api: 'responses', cacheRetention: '24h',
              cacheKey: `probe:${point.session}:${point.turn}`,
              model: tier.model, reasoningEffort: tier.reasoningEffort, wordTarget: tier.words, maxTokens: tier.maxOutputTokens,
              arcs: p.arcs, arcClosing: false, notes: [], actionText: action, turnId: `probe-follow-${i}`,
            }));
            const nextBeat = next.blocks.map((b) => (b.speakerId ? `${b.speakerId}: ${b.text}` : b.text)).join('\n');
            const fv = await retry(() => gateway.generateStructured('writer_premium', FollowVerdict, [
              { role: 'system', content:
                'A thread was just raised in a story. The player then chose to ' +
                (mode === 'leave' ? 'SET IT ASIDE. respected = the beat carries out what the player chose and is mainly about that; the thread may still exist in the background (an object they kept, a person still in the room), which is normal fiction and does not count against it. dominates = the thread takes over the beat, a character pushes the player back toward it, or the beat ends by steering them to reconsider it.' :
                  'FOLLOW IT. respected = the next beat develops that thread concretely. dominates = false unless the beat is about something else entirely.') +
                ' threadOnPage = the thread is present in the beat at all. note: one sentence.' },
              { role: 'user', content: `## Thread\n${verdict.whichThread ?? '(unnamed)'}\n\n## Beat that raised it\n${beat}\n\n## Player chose\n${action}\n\n## Next beat\n${nextBeat}` },
            ], { maxTokens: 800, model: 'gpt-5.6-terra', temperature: 0, timeoutMs: 120_000, nativeSchema: true }));
            followup = { mode, action, verdict: fv.value, beat: nextBeat };
            console.log(`     ↳ ${mode}: respected=${fv.value.respected ? 'Y' : 'N'} dominates=${fv.value.dominates ? 'Y' : '-'} thread=${fv.value.threadOnPage ? 'Y' : '-'} | ${fv.value.note.slice(0, 140)}`);
          }
        }
        appendFileSync(out, `${JSON.stringify({ ...row, followup })}\n`);
        console.log(`  [${cond}#${i}] thread=${verdict.threadSurfaced ? 'Y' : '-'} world=${verdict.cameFromWorld ? 'Y' : '-'} honors=${verdict.honorsAction} nat=${verdict.naturalness} sugg=${verdict.suggestionFollowsThread ? 'Y' : '-'} | ${verdict.note.slice(0, 150)}`);
      } catch (e) {
        console.log(`  [${cond}#${i}] ERROR ${(e as Error).message.slice(0, 200)}`);
      }
    }));
  }
  await db.end();
}
void main().catch((e) => { console.error(e); process.exit(1); });

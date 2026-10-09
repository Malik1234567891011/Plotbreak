/**
 * A long session through the real API, played by a player who does not want
 * drama — the shape of both deep runs that went quiet.
 *
 * Point it at a local API started with an in-memory store and no Supabase, so
 * nothing is written anywhere real:
 *
 *   DATABASE_URL= SUPABASE_URL= SUPABASE_ANON_KEY= PORT=4300 \
 *     PLOTBREAK_PRESSURE_FIRST=10 PLOTBREAK_PRESSURE_EVERY=8 npm run api
 *   tsx --env-file=.env infra/scripts/pressure-longrun.ts --base=http://localhost:4300 \
 *     --story=story_pink_tide --turns=34 --label=cozy
 */
import { appendFileSync, mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { OpenAiGateway } from '@plotbreak/director';

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, ...v] = a.replace(/^--/, '').split('=');
  return [k, v.join('=')];
}));
const base = args.base ?? 'http://localhost:4300';
const storyId = args.story ?? 'story_pink_tide';
const turns = Number(args.turns ?? 34);
const label = args.label ?? 'cozy';

const gateway = new OpenAiGateway({ apiKey: process.env.OPENAI_API_KEY!, models: { writer_premium: 'gpt-5.6-terra' } });
const auth = { authorization: `Bearer guest_${randomUUID()}`, 'content-type': 'application/json' };

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const r = await fetch(`${base}${path}`, { method, headers: { ...auth, 'idempotency-key': randomUUID() }, body: body ? JSON.stringify(body) : undefined });
      const text = await r.text();
      if (r.status >= 500 && attempt < 3) throw new Error(`${r.status} ${text.slice(0, 200)}`);
      return (text ? JSON.parse(text) : {}) as T;
    } catch (e) {
      if (attempt >= 3) throw e;
      await new Promise((res) => setTimeout(res, 10_000 * attempt));
    }
  }
}

const Next = z.object({ action: z.string() });

async function playerMove(beat: string, suggestions: string[]): Promise<string> {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await playerMoveOnce(beat, suggestions);
    } catch (e) {
      if (attempt >= 5) throw e;
      await new Promise((res) => setTimeout(res, 15_000 * attempt));
    }
  }
}

async function playerMoveOnce(beat: string, suggestions: string[]): Promise<string> {
  const r = await gateway.generateStructured('writer_premium', Next, [
    { role: 'system', content:
      'You are a player in an interactive story app. You love slice-of-life: hanging out, romance, ' +
      'building a comfortable life with the people you like. You avoid drama and mysteries, but if ' +
      'something genuinely intriguing reaches you, you sometimes go along with it — about one time in ' +
      'three. Otherwise you steer back to the cosy thing you were doing. Write your next action in the ' +
      'first person, one or two sentences, in English. You may use a suggestion or write your own.' },
    { role: 'user', content: `## What just happened\n${beat}\n\n## Suggestions\n${suggestions.map((s) => `- ${s}`).join('\n')}` },
  ], { maxTokens: 300, model: 'gpt-5.6-luna', temperature: 0.9, timeoutMs: 60_000, nativeSchema: true });
  return r.value.action;
}

async function main(): Promise<void> {
  mkdirSync('scratchpad/arc-pressure', { recursive: true });
  const out = `scratchpad/arc-pressure/longrun-${label}.jsonl`;
  const created = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: { displayName: 'Alex', pronouns: 'he/him', ageBand: null },
  });
  const sessionId = created.session.sessionId as string;
  let revision = created.session.revision ?? 0;
  let beat = (created.openingTurn?.blocks ?? created.turn?.blocks ?? []).map((b: any) => b.text).join('\n') || '(the story opens)';
  let suggestions: string[] = (created.openingTurn?.suggestions ?? []).map((s: any) => s.text);
  for (let t = 1; t <= turns; t += 1) {
    const action = await playerMove(beat, suggestions);
    const accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`, {
      actionText: action, qualityTier: 'QUICK', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false,
    });
    if (!accepted.turnId) { console.log(`turn ${t}: refused ${JSON.stringify(accepted).slice(0, 200)}`); break; }
    let turn: any = null;
    for (let i = 0; i < 120; i += 1) {
      turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`);
      if (turn?.turn?.blocks?.length || turn?.blocks?.length) break;
      await new Promise((r) => setTimeout(r, 1500));
    }
    const record = turn.turn ?? turn;
    revision = record.revisionAfter ?? revision + 1;
    beat = (record.blocks ?? []).map((b: any) => (b.speakerId ? `${b.speakerId}: ${b.text}` : b.text)).join('\n');
    suggestions = (record.suggestions ?? []).map((s: any) => s.text);
    appendFileSync(out, `${JSON.stringify({ t, action, beat, suggestions, summary: record.sceneSummary })}\n`);
    console.log(`T${t}: ${action.slice(0, 90)}\n    → ${String(record.sceneSummary ?? '').slice(0, 160)}`);
  }
}
void main().catch((e) => { console.error(e); process.exit(1); });

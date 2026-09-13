/**
 * What the player actually experiences after tapping, in wall-clock time.
 *
 * A median request latency says nothing about whether the turn *feels* fast.
 * This records the offset of every user-visible milestone from the moment of
 * submission, then fetches the media the turn produced so pop-in can be
 * separated into selection, transfer and render-ready.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

interface Mark { readonly label: string; readonly ms: number; readonly detail?: string }

async function main(): Promise<void> {
  const turns = Number(process.argv.slice(2).find((a) => a.startsWith('--turns='))?.slice(8) ?? '6');
  const out = process.argv.slice(2).find((a) => a.startsWith('--out='))?.slice(6) ?? '/tmp/latency.json';

  const env = readFileSync('.env', 'utf8');
  const SUPA = env.match(/^SUPABASE_URL=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  const ANON = env.match(/^SUPABASE_ANON_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, '');
  let token = `guest_${crypto.randomUUID()}`;
  if (SUPA && ANON) {
    const su = await fetch(`${SUPA.replace(/\/$/, '')}/auth/v1/signup`, {
      method: 'POST',
      headers: { apikey: ANON, authorization: `Bearer ${ANON}`, 'content-type': 'application/json' },
      body: '{}',
    });
    token = ((await su.json()) as { access_token?: string }).access_token ?? token;
  }
  const H = { authorization: `Bearer ${token}`, 'content-type': 'application/json' };
  const call = async <T>(m: string, p: string, b?: unknown, x: Record<string, string> = {}): Promise<T> => {
    const r = await fetch(BASE + p, { method: m, headers: { ...H, ...x }, body: b === undefined ? undefined : JSON.stringify(b) });
    const t = await r.text();
    if (!r.ok) throw new Error(`${m} ${p} ${r.status} ${t.slice(0, 200)}`);
    return JSON.parse(t) as T;
  };

  const detail = await call<any>('GET', '/v1/stories/story_ace');
  const session = await call<any>('POST', '/v1/stories/story_ace/sessions', {
    identity: { displayName: detail.protagonist.name, pronouns: detail.protagonist.pronouns,
      archetypeId: detail.archetypes[0]?.id ?? null, advanced: {} },
    locale: 'en',
  });
  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;
  let cards: any[] = session.suggestions ?? [];

  const all: Array<{ turn: number; marks: Mark[] }> = [];

  for (let i = 0; i < turns; i += 1) {
    const actionText = cards[0]?.text ?? 'I look around and take stock of where we are.';
    const t0 = performance.now();
    const at = (): number => Math.round(performance.now() - t0);
    const marks: Mark[] = [];

    const accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`,
      { actionText, qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
      { 'idempotency-key': crypto.randomUUID() });
    // A. the 202 the client uses to show a loading state.
    marks.push({ label: 'A accepted (loading state)', ms: at() });

    const streamed = await fetch(`${BASE}/v1/turns/${accepted.turnId}/stream?token=${encodeURIComponent(accepted.streamToken)}`,
      { headers: { authorization: H.authorization } });
    const reader = streamed.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let textChars = 0;
    let firstText = false;
    let meaningful = false;
    let reactionUrl: string | null = null;
    let done = false;

    while (!done && at() < 180_000) {
      const chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() ?? '';
      for (const part of parts) {
        const name = part.match(/^event:\s*(\S+)/m)?.[1];
        if (!name) continue;
        const data = JSON.parse(part.match(/^data:\s*(.+)$/m)?.[1] ?? '{}');
        const payload = data.data ?? data;
        if (name === 'text.stream') {
          if (!firstText) { marks.push({ label: 'B first text', ms: at() }); firstText = true; }
          textChars += String(payload.text ?? '').length;
          // C. enough prose on screen that a player can start reading.
          if (!meaningful && textChars > 250) { marks.push({ label: 'C readable prose (250 chars)', ms: at() }); meaningful = true; }
        }
        if (name === 'reaction.ready') {
          reactionUrl = payload.url ?? null;
          marks.push({ label: 'D reaction.ready', ms: at(), detail: `${payload.characterId}/${payload.emotion}` });
        }
        if (name === 'media.queued' || name === 'media.completed') {
          marks.push({ label: `!! ${name} (dynamic generation)`, ms: at() });
        }
        if (name === 'turn.completed') {
          marks.push({ label: 'I full narrative delivered', ms: at() });
          marks.push({ label: 'J cards available', ms: at(), detail: `${(payload.suggestions ?? []).length} cards` });
          marks.push({ label: 'L turn.completed / input re-enabled', ms: at() });
          cards = payload.suggestions ?? cards;
          done = true;
        }
      }
    }
    await reader.cancel().catch(() => undefined);

    // E/F. the bytes behind the reaction the client was told about.
    if (reactionUrl) {
      const fetchStart = at();
      const res = await fetch(reactionUrl);
      const bytes = (await res.arrayBuffer()).byteLength;
      marks.push({ label: 'E reaction bytes complete', ms: at(), detail: `${bytes} B in ${at() - fetchStart} ms` });
    }

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? cards;
    // G/H. the stage backdrop the scene carries.
    const stage = after.scene?.stageImage;
    if (stage) {
      const s0 = at();
      const res = await fetch(stage);
      const bytes = (await res.arrayBuffer()).byteLength;
      marks.push({ label: 'H scene image bytes complete', ms: at(), detail: `${bytes} B in ${at() - s0} ms` });
    }

    all.push({ turn: i + 1, marks });
    console.log(`\n── turn ${i + 1} ──`);
    for (const m of marks) console.log(`  ${String(m.ms).padStart(6)} ms  ${m.label}${m.detail ? `  (${m.detail})` : ''}`);
  }

  writeFileSync(out, JSON.stringify(all, null, 2), 'utf8');
  const pick = (label: string) => all.map((t) => t.marks.find((m) => m.label.startsWith(label))?.ms).filter((x): x is number => x !== undefined);
  const med = (xs: number[]) => xs.length ? [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)]! : NaN;
  const p90 = (xs: number[]) => xs.length ? [...xs].sort((a, b) => a - b)[Math.min(xs.length - 1, Math.floor(xs.length * 0.9))]! : NaN;
  console.log('\n══ SUMMARY (ms from submit) ══');
  for (const [label, key] of [['accepted', 'A'], ['first text', 'B'], ['readable prose', 'C'], ['reaction.ready', 'D'], ['reaction bytes', 'E'], ['full narrative', 'I'], ['cards', 'J']] as const) {
    const xs = pick(key);
    console.log(`  ${label.padEnd(16)} median ${String(med(xs)).padStart(6)}  p90 ${String(p90(xs)).padStart(6)}  n=${xs.length}`);
  }
}
void main().catch((e) => { console.error(e); process.exit(1); });

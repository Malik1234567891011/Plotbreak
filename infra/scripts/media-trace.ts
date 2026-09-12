/**
 * Does a hero frame ever reach the player while they are still looking at it?
 *
 *   npm run media:trace
 *   npm run media:trace -- --story=story_ace --turns=3
 *
 * Plays real turns, watches the whole SSE stream to its end, and records for
 * each turn: whether the frame was planned, whether the stream announced it
 * arriving, and whether the turn ended up with one in the database.
 *
 * The three answers are different questions and the gap between them is the
 * bug. "Planned yes, announced no, stored yes" is art that exists and that the
 * player will only discover by scrolling back past it later.
 */
const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

interface Row {
  turn: number;
  planned: boolean;
  queued: boolean;
  announced: boolean;
  stored: boolean;
  msToAnnounce: number | null;
  msToCompleted: number | null;
}

async function token(): Promise<string> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return `guest_${crypto.randomUUID()}`;
  const r = await fetch(`${url.replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: '{}',
  });
  const body = (await r.json()) as { access_token?: string };
  if (!body.access_token) throw new Error('no anonymous session');
  return body.access_token;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const storyId = argv.find((a) => a.startsWith('--story='))?.slice(8) ?? 'story_ace';
  const turns = Number(argv.find((a) => a.startsWith('--turns='))?.slice(8) ?? 3);

  const auth = { authorization: `Bearer ${await token()}`, 'content-type': 'application/json' };
  const call = async <T>(method: string, path: string, body?: unknown, extra: Record<string, string> = {}): Promise<T> => {
    const r = await fetch(`${BASE}${path}`, {
      method, headers: { ...auth, ...extra },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await r.text();
    if (!r.ok) throw new Error(`${method} ${path} -> ${r.status} ${text.slice(0, 200)}`);
    return JSON.parse(text) as T;
  };

  const detail = await call<any>('GET', `/v1/stories/${storyId}`);
  const named = detail.protagonist?.kind === 'NAMED';
  const session = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: {
      displayName: named ? detail.protagonist.name : 'Tester',
      pronouns: named ? detail.protagonist.pronouns : 'they/them',
      archetypeId: detail.archetypes?.[0]?.id ?? null,
      advanced: {},
    },
  });

  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;
  let cards: any[] = session.suggestions ?? [];
  const rows: Row[] = [];

  for (let t = 1; t <= turns; t += 1) {
    if (!cards.length) {
      const fresh = await call<any>('GET', `/v1/sessions/${sessionId}`);
      cards = fresh.suggestions ?? [];
    }
    if (!cards.length) break;
    const pick = cards[(t - 1) % cards.length];

    const accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`, {
      actionText: pick.text, qualityTier: 'VIVID', sessionRevision: revision,
      selectedSuggestionId: pick.id ?? null, voicePreferred: false,
    }, { 'idempotency-key': crypto.randomUUID() });

    const row: Row = {
      turn: t, planned: false, queued: false, announced: false, stored: false,
      msToAnnounce: null, msToCompleted: null,
    };
    const began = Date.now();

    // Read the stream exactly as the app does: to the end, not to
    // `turn.completed`.
    const url = `${accepted.streamUrl}?token=${encodeURIComponent(accepted.streamToken)}`;
    const response = await fetch(url, { headers: { authorization: auth.authorization, accept: 'text/event-stream' } });
    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      const deadline = Date.now() + 180_000;
      try {
        while (Date.now() < deadline) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const frames = buffer.split('\n\n');
          buffer = frames.pop() ?? '';
          for (const frame of frames) {
            const line = frame.split('\n').find((l) => l.startsWith('data:'));
            if (!line) continue;
            let parsed: any;
            try { parsed = JSON.parse(line.slice(5).trim()); } catch { continue; }
            if (parsed.event === 'media.queued') { row.queued = true; row.planned = true; }
            if (parsed.event === 'media.completed') { row.announced = true; row.msToAnnounce = Date.now() - began; }
            if (parsed.event === 'turn.completed') { row.msToCompleted = Date.now() - began; }
          }
        }
      } finally {
        await reader.cancel().catch(() => undefined);
      }
    }

    // Give the job the time the API itself allows, then ask the database.
    for (let i = 0; i < 40; i += 1) {
      const turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
      if (turn?.heroImageUrl) { row.stored = true; break; }
      await new Promise((r) => setTimeout(r, 3000));
    }
    rows.push(row);

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];
  }

  console.log(`\nturn  planned  queued  announced  stored   stream closed at   frame announced at`);
  for (const r of rows) {
    console.log(
      `${String(r.turn).padStart(4)}  ${String(r.planned).padStart(7)}  ${String(r.queued).padStart(6)}  ` +
      `${String(r.announced).padStart(9)}  ${String(r.stored).padStart(6)}   ` +
      `${String(r.msToCompleted ?? '-').padStart(14)}ms   ${String(r.msToAnnounce ?? 'never').padStart(14)}`,
    );
  }
  const ghosts = rows.filter((r) => r.stored && !r.announced);
  console.log(
    ghosts.length
      ? `\n${ghosts.length} of ${rows.length} turn(s) got a frame the player was never told about.\n` +
        `Those are the images that appear only when the transcript is refetched.`
      : `\nEvery stored frame was announced on the stream.`,
  );
  process.exitCode = ghosts.length ? 1 : 0;
}

void main().catch((error) => { console.error(error); process.exit(1); });

/**
 * A short, genre-appropriate session in one story.
 *
 * Not a torture harness and not the Ace script with the names changed: each
 * story gets actions a real player of *that* story would type, including the
 * one thing that story is hardest at.
 *
 *   npm run cross-story -- --story=story_light --turns=10
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { Pool } from 'pg';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

/** Freeform a player of this particular story would actually write. */
const SCRIPTS: Record<string, string[]> = {
  story_itachi: [
    'I go and find Shisui, and I tell him what I actually think about the mission.',
    'I say nothing at the meeting and watch who looks at whom.',
    'I go home and spend the evening with Sasuke instead of reporting in.',
    'I tell my father I will not do what he is asking, and I do not explain myself.',
    'I ask Shisui what he would do if the clan and the village could not both be right.',
    'I sit on the roof and watch the village until it gets dark.',
  ],
  story_light: [
    'I test what the notebook actually does, carefully, with something I can verify.',
    'I tell my father I was studying all evening.',
    'I ask Ryuk a question and deliberately do not tell him why I want to know.',
    'Something is bothering me and I do not say what it is.',
    'I let them think I am not interested in the case at all.',
    'I watch how the detective reacts when the subject comes up, and say nothing.',
  ],
  story_last_five: [
    'I ask her straight out what she is not telling me.',
    'I go and look at the place it happened for myself.',
    'I tell them I am not going along with this.',
    'I sit with it for a while and do not say anything.',
    'I go through what we actually know so far, out loud.',
    'I try to fix the thing everyone has been avoiding.',
  ],
  // Investigation/thriller: press people, look at things properly, refuse once,
  // and take one risk. Paris, a killer nobody can shoot, three animals that can.
  story_fourth_beast: [
    'I ask Camille what exactly she grew down here, in plain words.',
    'I go and look at the place the last one was taken from, properly.',
    'I tell them I am not letting it out until somebody explains what it does.',
    'I ask Lina what she saw that night that she has not put in a report.',
    'I sit with it for a moment and watch how they react to each other.',
    'I follow the thing the police have decided is a coincidence.',
    'I ask who the man in the pale coat actually is, and who already knows.',
    'I take the risk and go up onto the roofline after it.',
  ],
  story_salt_road: [
    'I check the case is still where I left it, without making a show of it.',
    'I ask what is really on the other end of this road.',
    'I keep walking and let the silence sit.',
    'I refuse to hand it over, whatever they say.',
    'I look at what the weather is doing and decide whether to keep going.',
    'I ask them how long they have been doing this run.',
  ],
};

function seeded(seedText: string): () => number {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i += 1) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const arg = (k: string, d: string) => argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
  const storyId = arg('story', 'story_light');
  const turns = Number(arg('turns', '10'));
  const locale = arg('locale', 'en');
  // A tier per turn, cycled. Lets one session walk the whole ladder.
  const tiers = arg('tiers', 'VIVID').split(',');
  const out = arg('out', `/tmp/${storyId}.md`);
  const rng = seeded(arg('seed', `${storyId}-cross`));
  const pool = [...(SCRIPTS[storyId] ?? [])];

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
    if (!r.ok) throw new Error(`${m} ${p} ${r.status} ${t.slice(0, 300)}`);
    return JSON.parse(t) as T;
  };

  const detail = await call<any>('GET', `/v1/stories/${storyId}`);
  const session = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: {
      displayName: detail.protagonist?.name ?? 'Player',
      pronouns: detail.protagonist?.pronouns ?? 'they/them',
      archetypeId: detail.archetypes?.[0]?.id ?? null,
      advanced: {},
    },
    locale,
  });
  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;
  let cards: any[] = session.suggestions ?? [];

  if (process.env.DATABASE_URL) {
    const pg = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
      const { rows } = await pg.query<{ account_id: string; balance_after: string }>(
        `SELECT account_id, balance_after FROM wallet_ledger ORDER BY created_at DESC LIMIT 1`);
      if (rows[0]) {
        await pg.query(
          `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code, reference_id, idempotency_key, metadata, created_at)
           VALUES ($1,$2,'PROMO_GRANT',6000,$3,'PROMO_GRANT',NULL,$4,'{"source":"cross"}',now())`,
          [`led_${crypto.randomUUID()}`, rows[0].account_id, Number(rows[0].balance_after) + 6000, `cross:${crypto.randomUUID()}`]);
      }
    } finally { await pg.end(); }
  }

  const name = (id: string | null) =>
    id ? ((detail.cast ?? []).find((c: any) => (c.characterId ?? c.id) === id)?.name ?? id) : null;

  const md: string[] = [
    `# ${detail.title ?? storyId} — ${locale.toUpperCase()} playtest`,
    '',
    `${turns} turns · locale \`${locale}\` · session \`${sessionId}\``,
    '',
  ];
  const log: any[] = [];

  for (let i = 0; i < turns; i += 1) {
    const tap = cards.length > 0 && rng() < 0.55;
    let actionText: string;
    let how: string;
    if (tap) {
      actionText = cards[Math.floor(rng() * cards.length)].text;
      how = 'tapped';
    } else if (pool.length) {
      actionText = pool.shift()!;
      how = 'typed';
    } else {
      actionText = cards[0]?.text ?? 'I take stock of where I am.';
      how = 'tapped';
    }

    const t0 = Date.now();
    const accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`,
      { actionText, qualityTier: tiers[i % tiers.length], sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
      { 'idempotency-key': crypto.randomUUID() }).catch((e) => { md.push(`## Turn ${i + 1} — FAILED`, '', String(e).slice(0, 400), ''); return null; });
    if (!accepted) break;

    const media: any[] = [];
    let firstBlockMs: number | null = null;
    let blocks = 0;
    try {
      const streamed = await fetch(`${BASE}/v1/turns/${accepted.turnId}/stream?token=${encodeURIComponent(accepted.streamToken)}`,
        { headers: { authorization: H.authorization } });
      const reader = streamed.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let finished = false;
      while (!finished && Date.now() - t0 < 180_000) {
        const chunk = await reader.read();
        if (chunk.done) break;
        buffer += decoder.decode(chunk.value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';
        for (const part of parts) {
          const ev = part.match(/^event:\s*(\S+)/m)?.[1];
          if (!ev) continue;
          const data = JSON.parse(part.match(/^data:\s*(.+)$/m)?.[1] ?? '{}');
          const payload = data.data ?? data;
          if (ev === 'text.stream') { blocks += 1; if (firstBlockMs === null) firstBlockMs = Date.now() - t0; }
          if (ev === 'reaction.ready' || ev === 'media.queued' || ev === 'media.completed') media.push({ ev, payload });
          if (ev === 'turn.completed' || ev === 'turn.failed') finished = true;
        }
      }
      await reader.cancel().catch(() => undefined);
    } catch { /* the turn still lands */ }

    let turn: any = null;
    for (let wait = 0; wait < 150 && !turn; wait += 1) {
      turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
      if (!turn) await new Promise((r) => setTimeout(r, 1000));
    }
    if (!turn) { md.push(`## Turn ${i + 1} — never arrived`, ''); break; }
    const fullMs = Date.now() - t0;

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];

    const attributed = (turn.blocks ?? []).filter((b: any) => b.speakerId).length;
    log.push({
      turn: i + 1, tier: tiers[i % tiers.length], how, firstBlockMs, fullMs, streamedBlocks: blocks,
      blocks: (turn.blocks ?? []).length, attributed,
      words: (turn.blocks ?? []).reduce((a: number, b: any) => a + String(b.text).split(/\s+/).length, 0),
      time: turn.endStatePrompt, location: after.scene?.locationName,
      present: (after.scene?.presentCharacters ?? []).map((p: any) => p.name),
      media: media.map((m) => ({ ev: m.ev, id: m.payload.characterId ?? m.payload.kind, emotion: m.payload.emotion, url: m.payload.url })),
      stage: after.scene?.stageImage ?? null,
      cards: cards.map((c: any) => c.text),
    });

    md.push(`## Turn ${i + 1} — ${tiers[i % tiers.length]} · ${how}`, '', `**Player:** ${actionText}`, '');
    for (const b of turn.blocks ?? []) {
      const who = name(b.speakerId);
      md.push(who ? `> **${who}.** ${b.text}` : `> ${b.text}`, '');
    }
    for (const m of media) md.push(`*[media] ${m.ev} ${m.payload.characterId ?? ''}/${m.payload.emotion ?? ''}*`, '');
    md.push(`*${turn.endStatePrompt} · ${after.scene?.locationName} · present: ${(after.scene?.presentCharacters ?? []).map((p: any) => p.name).join(', ') || 'nobody'} · first block ${firstBlockMs}ms · full ${fullMs}ms*`, '');
    md.push('**Cards offered:**', '');
    for (const [n, c] of cards.entries()) md.push(`${n + 1}. ${c.text}`);
    md.push('');
    writeFileSync(out, md.join('\n'), 'utf8');
    process.stdout.write(`  t${i + 1}/${turns} ${how} ${firstBlockMs}ms→${fullMs}ms blocks=${blocks} attr=${attributed}/${(turn.blocks ?? []).length} @ ${after.scene?.locationName}\n`);
  }

  writeFileSync(out, md.join('\n'), 'utf8');
  writeFileSync(out.replace(/\.md$/, '.json'), JSON.stringify({ storyId, sessionId, log }, null, 2), 'utf8');
  console.log(`${out}`);
}
void main().catch((e) => { console.error(e); process.exit(1); });

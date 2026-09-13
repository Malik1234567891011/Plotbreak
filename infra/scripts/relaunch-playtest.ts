/**
 * One coherent Ace session, played the way a real player plays.
 *
 * Mostly taps the cards the story just offered, types something of their own
 * about a third of the time, pokes at things, talks to people, occasionally
 * takes a risk, occasionally refuses. No repeated probe phrases, no farming
 * animal encounters, no asking the story how long it can go on — the point is
 * to see the product we would ship, not to stress it.
 *
 *   npm run relaunch-playtest -- --turns=45 --out=/tmp/relaunch.md
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { Pool } from 'pg';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

/**
 * Things this player might type. Grouped only so one run covers the range;
 * the story, not the category, decides whether any of it lands.
 */
const FREEFORM: Record<string, string[]> = {
  social: [
    'I ask Sabo what he actually wants out of all this.',
    'I tell Luffy he can come, but he has to keep up on his own.',
    'I ask Dadan why she puts up with us at all.',
    'I tell Sabo I am glad he is here, and then immediately regret saying it.',
    'I ask Luffy what he thinks happens to people who leave this island.',
  ],
  explore: [
    'I go and look at the part of the forest we never bother with.',
    'I follow the smoke and see where it is coming from.',
    'I climb high enough to see what is past the trees.',
    'I go down to the water and look at what has washed up.',
    'I have a proper look at the thing we have been walking past for days.',
  ],
  quiet: [
    'I sit down and do not say anything for a while.',
    'I watch the light go and let them talk without me.',
    'I lie back and listen to the forest.',
  ],
  curious: [
    'I ask about the name I keep hearing people avoid saying.',
    'I want to know who those men were and what they wanted.',
    'I ask Sabo where he learned to read.',
  ],
  risk: [
    'I go across the gap rather than walk the long way round.',
    'I take the shortcut everyone says not to take.',
  ],
  refuse: [
    'No. I am not doing that, and I am not explaining why.',
    'I walk away from this and let them deal with it themselves.',
  ],
  goal: [
    'I want us to have enough put away that leaving is actually possible.',
    'I start working out what it would really take to get off this island.',
  ],
};

/** Deterministic, so a run can be repeated exactly. */
function seeded(seedText: string): () => number {
  let h = 1779033703 ^ seedText.length;
  for (let i = 0; i < seedText.length; i += 1) {
    h = Math.imul(h ^ seedText.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const arg = (k: string, d: string) => argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
  const turns = Number(arg('turns', '45'));
  const out = arg('out', '/tmp/relaunch-playtest.md');
  const rng = seeded(arg('seed', 'relaunch-1'));

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
    const r = await fetch(BASE + p, {
      method: m,
      headers: { ...H, ...x },
      body: b === undefined ? undefined : JSON.stringify(b),
    });
    const t = await r.text();
    if (!r.ok) throw new Error(`${m} ${p} ${r.status} ${t.slice(0, 300)}`);
    return JSON.parse(t) as T;
  };

  const detail = await call<any>('GET', '/v1/stories/story_ace');
  const session = await call<any>('POST', '/v1/stories/story_ace/sessions', {
    identity: {
      displayName: detail.protagonist.name,
      pronouns: detail.protagonist.pronouns,
      archetypeId: detail.archetypes[0]?.id ?? null,
      advanced: {},
    },
    locale: 'en',
  });
  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;

  // A 45-turn run costs more than the free grant, and running out halfway is
  // not the thing under test.
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
      const { rows } = await pool.query<{ account_id: string; balance_after: string }>(
        `SELECT account_id, balance_after FROM wallet_ledger ORDER BY created_at DESC LIMIT 1`,
      );
      if (rows[0]) {
        await pool.query(
          `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code, reference_id, idempotency_key, metadata, created_at)
           VALUES ($1,$2,'PROMO_GRANT',12000,$3,'PROMO_GRANT',NULL,$4,'{"source":"relaunch"}',now())`,
          [`led_${crypto.randomUUID()}`, rows[0].account_id, Number(rows[0].balance_after) + 12000, `relaunch:${crypto.randomUUID()}`],
        );
      }
    } finally {
      await pool.end();
    }
  }

  const name = (id: string | null) =>
    id ? ((detail.cast ?? []).find((c: any) => (c.characterId ?? c.id) === id)?.name ?? id) : null;

  const md: string[] = [
    '# Plotbreak relaunch candidate — organic Ace playtest',
    '',
    `Terra · append-only · ${turns} turns · session \`${sessionId}\``,
    '',
  ];
  const log: any[] = [];
  const categories = Object.keys(FREEFORM);
  const used = new Set<string>();
  let cards: any[] = session.suggestions ?? [];

  for (let i = 0; i < turns; i += 1) {
    // Mostly taps, because that is what players do; the rest is typed.
    const tap = cards.length > 0 && rng() < 0.65;
    let actionText: string;
    let how: string;
    if (tap) {
      const pick = cards[Math.floor(rng() * cards.length)];
      actionText = pick.text;
      how = 'tapped';
    } else {
      const category = categories[Math.floor(rng() * categories.length)]!;
      const pool = FREEFORM[category]!.filter((line) => !used.has(line));
      const line = (pool.length ? pool : FREEFORM[category]!)[Math.floor(rng() * (pool.length || FREEFORM[category]!.length))]!;
      used.add(line);
      actionText = line;
      how = `typed/${category}`;
    }

    let accepted: any;
    try {
      accepted = await call<any>(
        'POST',
        `/v1/sessions/${sessionId}/turns`,
        { actionText, qualityTier: 'VIVID', sessionRevision: revision, selectedSuggestionId: null, voicePreferred: false },
        { 'idempotency-key': crypto.randomUUID() },
      );
    } catch (error) {
      md.push(`## Turn ${i + 1} — FAILED`, '', '```', String(error).slice(0, 500), '```', '');
      break;
    }

    let turn: any = null;
    for (let wait = 0; wait < 150 && !turn; wait += 1) {
      turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
      if (!turn) await new Promise((r) => setTimeout(r, 1000));
    }
    if (!turn) {
      md.push(`## Turn ${i + 1} — never arrived`, '');
      break;
    }

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];

    const words = (turn.blocks ?? []).reduce((a: number, b: any) => a + String(b.text).split(/\s+/).length, 0);
    log.push({
      turn: i + 1,
      how,
      words,
      time: turn.endStatePrompt,
      location: after.scene?.locationName,
      present: (after.scene?.presentCharacters ?? []).map((p: any) => p.name),
      blocks: (turn.blocks ?? []).length,
    });

    md.push(`## Turn ${i + 1} — ${how}`, '');
    md.push(`**Player:** ${actionText}`, '');
    for (const b of turn.blocks ?? []) {
      const who = name(b.speakerId);
      md.push(who ? `> **${who}.** ${b.text}` : `> ${b.text}`, '');
    }
    md.push(
      `*${turn.endStatePrompt} · ${after.scene?.locationName} · present: ${(after.scene?.presentCharacters ?? []).map((p: any) => p.name).join(', ') || 'nobody'} · ${words} words*`,
      '',
    );
    md.push('**Cards offered:**', '');
    for (const [n, s] of cards.entries()) md.push(`${n + 1}. ${s.text}`);
    md.push('');

    writeFileSync(out, md.join('\n'), 'utf8');
    process.stdout.write(`t${i + 1}/${turns} ${how} ${words}w ${turn.endStatePrompt} @ ${after.scene?.locationName}\n`);
  }

  writeFileSync(out, md.join('\n'), 'utf8');
  writeFileSync(out.replace(/\.md$/, '.json'), JSON.stringify({ sessionId, log }, null, 2), 'utf8');
  console.log(`\n${out}\nsession ${sessionId}`);
}

void main().catch((e) => {
  console.error(e);
  process.exit(1);
});

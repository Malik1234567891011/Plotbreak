/**
 * The fixed adversarial replay.
 *
 * The same raw player actions submitted to whichever narrative runtime the API
 * is running, so two architectures can be read side by side. These are not
 * invented: every one is a shape that broke the production engine in the
 * eighty-turn Ace session, plus the delegation cases that produced undefined
 * canon.
 *
 *   npm run replay-cases -- --out=/tmp/cases-current.md
 */
import { writeFileSync } from 'node:fs';
import { Pool } from 'pg';
import { readFileSync } from 'node:fs';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

const CASES: Array<{ n: number; what: string; action: string }> = [
  { n: 1, what: 'Playful gesture near a weapon — became an eight-turn brawl',
    action: 'I turn to Sabo with a smirk, swinging my pipe across my shoulders. "Think you can keep up with me this time, or are you just here for the scenery?"' },
  { n: 2, what: 'Explicit movement — never committed',
    action: 'I’m done waiting. I walk to Dadan’s house.' },
  { n: 3, what: 'Multi-clause movement + NPC request — refusal ate the move',
    action: 'I head to Dadan’s house and tell Luffy to follow if he wants.' },
  { n: 4, what: 'Delegated secret — produced "you say it" and undefined canon',
    action: 'I tell Sabo something I have never told anyone.' },
  { n: 5, what: 'Delegated action — same failure',
    action: 'I do the thing everyone expects me not to do.' },
  { n: 6, what: 'Social disagreement',
    action: 'I tell Sabo he is wrong about the can and I am not letting him decide this one.' },
  { n: 7, what: 'Physical danger',
    action: 'I climb out along the thinnest branch until it starts to bend.' },
  { n: 8, what: 'Ignoring the obvious objective',
    action: 'I sit down against the tree and refuse to do anything at all.' },
  { n: 9, what: 'Leaving the region',
    action: 'I start down the mountain toward Gray Terminal on my own.' },
  { n: 10, what: 'Inventing a plausible personal plan',
    action: 'I decide we are going to steal a boat, and I start working out how.' },
];

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const out = argv.find((a) => a.startsWith('--out='))?.slice(6) ?? '/tmp/replay-cases.md';
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
  const md: string[] = ['# Fixed adversarial replay — Ace', '', `${new Date().toISOString().slice(0, 16).replace('T', ' ')}`, ''];

  for (const c of CASES) {
    // A fresh session per case, so each one is judged from the same opening
    // rather than from whatever the previous case did to the world.
    const s = await call<any>('POST', '/v1/stories/story_ace/sessions', {
      identity: {
        displayName: detail.protagonist.name, pronouns: detail.protagonist.pronouns,
        archetypeId: detail.archetypes[0]?.id ?? null, advanced: {},
      },
      locale: 'en',
    });
    const sessionId = s.session.sessionId;

    if (process.env.DATABASE_URL) {
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      try {
        const { rows } = await pool.query<{ account_id: string; balance_after: string }>(
          `SELECT account_id, balance_after FROM wallet_ledger ORDER BY created_at DESC LIMIT 1`);
        if (rows[0]) {
          await pool.query(
            `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code, reference_id, idempotency_key, metadata, created_at)
             VALUES ($1,$2,'PROMO_GRANT',600,$3,'PROMO_GRANT',NULL,$4,'{"source":"replay"}',now())`,
            [`led_${crypto.randomUUID()}`, rows[0].account_id, Number(rows[0].balance_after) + 600, `replay:${crypto.randomUUID()}`]);
        }
      } finally { await pool.end(); }
    }

    md.push(`## Case ${c.n} — ${c.what}`, '', `**Player:** ${c.action}`, '');
    try {
      const accepted = await call<any>('POST', `/v1/sessions/${sessionId}/turns`,
        { actionText: c.action, qualityTier: 'VIVID', sessionRevision: s.revision ?? 0, selectedSuggestionId: null, voicePreferred: false },
        { 'idempotency-key': crypto.randomUUID() });
      let turn: any = null;
      for (let i = 0; i < 90 && !turn; i += 1) {
        turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
        if (!turn) await new Promise((r) => setTimeout(r, 1000));
      }
      if (!turn) { md.push('**The turn never arrived.**', ''); continue; }
      for (const ck of turn.checks ?? []) md.push(`\`${ck.label} · ${ck.difficultyLabel} · ${ck.outcome}\``, '');
      for (const b of turn.blocks ?? []) {
        const who = b.speakerId ? (detail.cast ?? []).find((x: any) => (x.characterId ?? x.id) === b.speakerId)?.name : null;
        md.push(who ? `> **${who}.** ${b.text}` : `> ${b.text}`, '');
      }
      const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
      md.push(`*location: ${after.scene?.locationName} · present: ${(after.scene?.presentCharacters ?? []).map((p: any) => p.name).join(', ') || 'nobody'}*`, '');
      md.push('**Cards offered next:**', '');
      for (const [i, sug] of (after.suggestions ?? []).entries()) md.push(`${i + 1}. ${sug.text}`);
      md.push('');
    } catch (e) {
      md.push(`**Failed.** ${String(e).slice(0, 300)}`, '');
    }
    md.push('---', '');
  }

  writeFileSync(out, md.join('\n'), 'utf8');
  console.log(out);
}

void main().catch((e) => { console.error(e); process.exit(1); });

/**
 * A player's-eye transcript. Nothing the player cannot see.
 *
 *   npm run transcript -- --story=story_ace --turns=20
 *   npm run transcript -- --story=story_light --turns=20 --locale=fr
 *   npm run transcript -- --story=story_ace --turns=20 --out=/tmp/ace.md
 *
 * `playthrough.ts` exists already and logs the media plan, the beat plan, the
 * mutations, the check arithmetic and the resource movements — everything you
 * need to debug the engine. This is the opposite tool: it logs the screen.
 * Every card offered, which one was tapped, every line of prose with its
 * speaker, the check reveals the player actually sees, the state deltas the
 * UI actually prints, whether a frame appeared, and the location and clock in
 * the header. Nothing else, because everything else is invisible and reading
 * it changes how you judge the writing.
 *
 * Tap-only, taking the first card every time unless `--pick=` says otherwise,
 * because that is how most people will play and it is the run most likely to
 * be dull. A world that reads well on rails reads well.
 */
import { writeFileSync } from 'node:fs';
import { Pool } from 'pg';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

interface Block {
  readonly type: string;
  readonly speakerId?: string | null;
  readonly text: string;
}

interface Check {
  readonly label: string;
  readonly outcome: string;
  readonly difficultyLabel: string;
  readonly math: string | null;
}

interface Card {
  readonly id?: string;
  readonly text: string;
  readonly label?: string;
}

async function token(): Promise<string> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return `guest_${crypto.randomUUID()}`;
  const response = await fetch(`${url.replace(/\/$/, '')}/auth/v1/signup`, {
    method: 'POST',
    headers: { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: '{}',
  });
  const body = (await response.json()) as { access_token?: string };
  if (!body.access_token) throw new Error('no anonymous session');
  return body.access_token;
}

/** Who is speaking, in the words the player sees rather than an id. */
function speaker(block: Block, cast: Map<string, string>): string | null {
  if (!block.speakerId) return null;
  return cast.get(block.speakerId) ?? block.speakerId;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flag = (name: string): string | undefined =>
    argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const storyId = flag('story') ?? 'story_ace';
  const turns = Number(flag('turns') ?? 20);
  const locale = flag('locale') ?? 'en';
  const pick = Number(flag('pick') ?? 1);
  const out = flag('out') ?? `/tmp/transcript-${storyId}.md`;
  const tier = flag('tier') ?? 'VIVID';

  const auth = {
    authorization: `Bearer ${await token()}`,
    'content-type': 'application/json',
    'accept-language': locale,
  };
  const call = async <T>(method: string, path: string, body?: unknown, extra: Record<string, string> = {}): Promise<T> => {
    const response = await fetch(`${BASE}${path}`, {
      method,
      headers: { ...auth, ...extra },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`${method} ${path} -> ${response.status} ${text.slice(0, 300)}`);
    return JSON.parse(text) as T;
  };

  const detail = await call<any>('GET', `/v1/stories/${storyId}`);
  const named = detail.protagonist?.kind === 'NAMED';
  const cast = new Map<string, string>(
    (detail.cast ?? []).map((c: { characterId?: string; id?: string; name: string }) => [
      c.characterId ?? c.id,
      c.name,
    ]),
  );

  const md: string[] = [];
  const say = (line = ''): void => {
    md.push(line);
  };

  say(`# ${detail.story.title} — what a player sees`);
  say();
  say(
    `Tap-only, card ${pick}, ${turns} turns, ${tier}, locale \`${locale}\`. ` +
      `${new Date().toISOString().slice(0, 16).replace('T', ' ')}.`,
  );
  say();
  say(`> ${detail.story.hook}`);
  say();
  say('---');
  say();
  say('## Before you start');
  say();
  say('**Premise, as shown on the card.**');
  say();
  for (const para of String(detail.premise).split('\n\n')) say(`> ${para}`);
  say();
  say(`**What you can do here.** ${(detail.story.mechanicsChips ?? []).join(' · ')}`);
  say();
  if (detail.creatorNote) {
    say('**Creator note.**');
    say();
    say(`> ${detail.creatorNote}`);
    say();
  }
  if (named) {
    say(`**You are** ${detail.protagonist.name} (${detail.protagonist.pronouns}). ${detail.protagonist.description}`);
    say();
  }
  const archetypes = (detail.archetypes ?? []) as Array<{ id: string; name: string; role: string; blurb: string }>;
  if (archetypes.length > 0) {
    say(`**${detail.protagonist?.setupHeading ?? 'Choose a build'}**`);
    say();
    for (const a of archetypes) {
      say(`- **${a.name}** — *${a.role}*. ${a.blurb}`);
    }
    say();
    say(`Taking the first: **${archetypes[0]!.name}**.`);
    say();
  }

  const session = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: {
      displayName: named ? detail.protagonist.name : 'Tester',
      pronouns: named ? detail.protagonist.pronouns : 'they/them',
      archetypeId: archetypes[0]?.id ?? null,
      advanced: {},
      ...(locale === 'fr' ? { grammar: { gender: 'MASCULINE', thirdPerson: 'il' } } : {}),
    },
    locale,
  });

  const sessionId = session.session.sessionId;

  // A fresh guest gets 600 credits and a VIVID turn costs 60, so an untouched
  // wallet buys exactly ten turns and a twenty-turn run dies at eleven with a
  // 402. Harness-only: grant against the same ledger the wallet reads.
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
      const { rows } = await pool.query<{ account_id: string; balance_after: string }>(
        `SELECT account_id, balance_after FROM wallet_ledger ORDER BY created_at DESC LIMIT 1`,
      );
      const account = rows[0];
      if (account) {
        const grant = turns * 200;
        await pool.query(
          `INSERT INTO wallet_ledger (entry_id, account_id, type, amount, balance_after, reason_code,
                                      reference_id, idempotency_key, metadata, created_at)
           VALUES ($1,$2,'PROMO_GRANT',$3,$4,'PROMO_GRANT',NULL,$5,'{"source":"transcript"}',now())`,
          [
            `led_${crypto.randomUUID()}`,
            account.account_id,
            grant,
            Number(account.balance_after) + grant,
            `transcript:${crypto.randomUUID()}`,
          ],
        );
      }
    } finally {
      await pool.end();
    }
  }
  let revision = session.revision ?? 0;
  let cards: Card[] = session.suggestions ?? [];

  say('---');
  say();
  say('## Opening');
  say();
  for (const para of String(detail.opening).split('\n\n')) say(`> ${para}`);
  say();

  let cardsSeen = 0;
  /** turn id -> the line in `md` where its picture would appear. */
  const framePlaceholders = new Map<string, number>();

  for (let t = 1; t <= turns; t += 1) {
    if (cards.length === 0) {
      const fresh = await call<any>('GET', `/v1/sessions/${sessionId}`);
      cards = fresh.suggestions ?? [];
    }
    if (cards.length === 0) {
      say(`## Turn ${t}`);
      say();
      say('**No cards offered. A tap-only player is stuck here.**');
      say();
      break;
    }

    say(`## Turn ${t}`);
    say();
    say('**Offered:**');
    say();
    for (const [i, card] of cards.entries()) {
      cardsSeen += 1;
      say(`${i + 1}. ${i + 1 === pick ? '**' : ''}${card.text}${i + 1 === pick ? '**' : ''}`);
    }
    say();

    const chosen = cards[Math.min(pick, cards.length) - 1]!;
    say(`**Tapped:** ${chosen.text}`);
    say();

    let accepted: any;
    try {
      accepted = await call<any>(
        'POST',
        `/v1/sessions/${sessionId}/turns`,
        {
          actionText: chosen.text,
          qualityTier: tier,
          sessionRevision: revision,
          selectedSuggestionId: chosen.id ?? null,
          voicePreferred: false,
        },
        { 'idempotency-key': crypto.randomUUID() },
      );
    } catch (error) {
      say(`**The turn failed.** ${String(error).slice(0, 300)}`);
      say();
      break;
    }

    // Wait for the committed turn, which is what the screen settles on.
    let turn: any = null;
    for (let a = 0; a < 80 && !turn; a += 1) {
      turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
      if (!turn) await new Promise((r) => setTimeout(r, 1000));
    }
    if (!turn) {
      say('**The turn never arrived.**');
      say();
      break;
    }

    // Checks, as the player sees them.
    for (const check of (turn.checks ?? []) as Check[]) {
      const math = check.math ? ` — ${check.math}` : '';
      say(`\`${check.label} · ${check.difficultyLabel} · ${check.outcome}\`${math}`);
      say();
    }

    for (const block of (turn.blocks ?? []) as Block[]) {
      const who = speaker(block, cast);
      for (const para of String(block.text).split('\n\n')) {
        say(who ? `> **${who}.** ${para}` : `> ${para}`);
        say();
      }
    }

    const deltas = (turn.stateDeltas ?? []) as Array<{ label: string }>;
    if (deltas.length > 0) {
      say(`\`${deltas.map((d) => d.label).join('  ·  ')}\``);
      say();
    }

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];

    const scene = after.scene ?? {};
    const header = [scene.locationName, scene.dayLabel ?? scene.clockLabel, scene.timeLabel]
      .filter(Boolean)
      .join(' · ');
    if (header) {
      say(`*${header}*`);
      say();
    }
    // A frame is drawn after the beat is written and lands up to a minute
    // later, so asking now would always say no. The slot is remembered and
    // filled in at the end, which is also what the player's screen does.
    framePlaceholders.set(accepted.turnId, md.length);
    say('');
    say('');
    say('---');
    say();
  }

  // Give the last frames time to land, then ask which turns got one.
  process.stdout.write('waiting for the last frames… ');
  await new Promise((r) => setTimeout(r, 60_000));
  let framesSeen = 0;
  for (const [turnId, line] of framePlaceholders) {
    const final = await call<any>('GET', `/v1/turns/${turnId}`).catch(() => null);
    if (final?.heroImageUrl) {
      framesSeen += 1;
      md[line] = '*[a picture of this moment appears here]*';
    }
  }
  console.log('done');

  say('## What the player got');
  say();
  say(`- ${turns} turns, ${framesSeen} picture(s), ${cardsSeen} cards offered.`);
  say(`- Session \`${sessionId}\`.`);
  say();

  writeFileSync(out, md.join('\n'), 'utf8');
  console.log(`\n${out}`);
  console.log(`${turns} turns, ${framesSeen} frames, ${cardsSeen} cards.`);
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});

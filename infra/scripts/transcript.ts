/**
 * A player's-eye transcript. Nothing the player cannot see.
 *
 *   npm run transcript -- --story=story_ace --turns=20
 *   npm run transcript -- --story=story_light --turns=20 --locale=fr
 *   npm run transcript -- --story=story_ace --turns=20 --out=/tmp/ace.md
 *
 * `--session=<id> --user=<uuid>` carries on an existing run instead of
 * starting one, which is how a forty-turn session becomes an eighty-turn
 * session. It needs the API in dev-token mode — where the bearer *is* the user
 * id — because the anonymous account the first half was played on signed up
 * once and its token is long gone.
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
 * Two ways to play it.
 *
 * `--player=first` is tap-only, first card every time. It is the most likely
 * real session and the one most likely to be dull, and a world that reads well
 * on rails reads well.
 *
 * `--player=casual` is the other real session, and the more revealing one. Most
 * people do not press the same position forty times: they read three cards and
 * take whichever appeals, and every few turns they ignore all three and type
 * something. So this taps about two turns in three — weighted towards the first
 * card, because it is the one people read first, but not glued to it — and
 * types the rest.
 *
 * What it types is generated from what is **on the screen**, never from a
 * script: the people standing here, the objective in the header, and a concrete
 * noun lifted out of the beat that just happened. That is the only honest way
 * to do it. A hand-written list of forty moves is a path somebody chose in
 * advance, and it would test the path rather than the world — the run would be
 * as good as the moves, which is exactly the thing under test. Seeded, so the
 * same seed plays the same session twice.
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


/**
 * A seeded stream, so a run is reproducible and a bug found once can be found
 * again. mulberry32 over a string hash: short, well-distributed, and nothing
 * here needs more than that.
 */
function seeded(seedText: string): () => number {
  let h = 2166136261;
  for (const ch of seedText) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 16777619);
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

/** Weighted choice over a list, using the seeded stream. */
function weighted<T>(items: readonly T[], weights: readonly number[], rng: () => number): T {
  const total = weights.reduce((sum, w) => sum + w, 0);
  let roll = rng() * total;
  for (const [i, item] of items.entries()) {
    roll -= weights[i] ?? 0;
    if (roll <= 0) return item;
  }
  return items[items.length - 1]!;
}

/**
 * Words that are furniture in every beat, so lifting one as "the thing that
 * just happened" would say nothing. Everything else in the prose is fair game,
 * which is the point — the player is reacting to what they read.
 */
const DULL = new Set([
  'your', 'yours', 'that', 'this', 'they', 'them', 'their', 'there', 'then', 'than', 'with',
  'from', 'into', 'onto', 'over', 'under', 'about', 'against', 'between', 'before', 'after',
  'still', 'just', 'like', 'when', 'what', 'which', 'while', 'where', 'been', 'have', 'here',
  'says', 'said', 'look', 'looks', 'looking', 'know', 'knows', 'going', 'gone', 'want', 'back',
  'something', 'nothing', 'anything', 'everything', 'someone', 'nobody', 'again', 'down',
  'only', 'even', 'more', 'much', 'very', 'never', 'always', 'once', 'because', 'would',
  'could', 'should', 'might', 'will', 'does', 'doing', 'made', 'make', 'takes', 'take',
  'enough', 'right', 'first', 'last', 'other', 'against', 'without', 'around', 'through',
]);

/**
 * A concrete thing the last beat put in front of the player.
 *
 * The longest ordinary word the beat used, minus the furniture and minus
 * anybody's name. Crude, and it does not need to be better: a player types
 * about whatever caught their eye, and the point is that the sentence is about
 * *this* beat rather than about a script written before the run started.
 */
function somethingFromTheBeat(blocks: readonly Block[], names: readonly string[]): string | null {
  const taken = new Set(names.flatMap((n) => n.toLowerCase().split(/\s+/)));
  const words = blocks
    .flatMap((b) => b.text.toLowerCase().match(/[a-z']{5,}/g) ?? [])
    .filter((w) => !DULL.has(w) && !taken.has(w));
  if (words.length === 0) return null;
  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0]![0];
}

/**
 * The name a player would actually type.
 *
 * Whichever word of somebody's name the beat in front of them just used —
 * which is the only name they have seen. The warm-up run typed "I look at
 * Monkey D. Luffy and ask what they want", and nobody has ever typed that:
 * they read "Luffy" and they type "Luffy". Picking it out of the prose rather
 * than by a rule keeps this working in a world whose names run the other way
 * round, where the first word is the one people use.
 */
function asRead(fullName: string, blocks: readonly Block[]): string {
  const prose = blocks.map((b) => b.text).join(' ');
  const words = fullName.split(/\s+/).filter((w) => w.replace(/[.]/g, '').length > 2);
  const seen = words.filter((w) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(prose));
  // The shortest word the prose actually used; failing that, the last word,
  // which is right for the family-name-first worlds and no worse elsewhere.
  if (seen.length > 0) return seen.sort((a, b) => a.length - b.length)[0]!;
  return words[words.length - 1] ?? fullName;
}

/**
 * What a person types when they stop tapping.
 *
 * Four things people actually do, in roughly the proportion they do them:
 * talk to somebody who is standing there, react to the thing they just read,
 * push the story somewhere, and occasionally do the blunt obvious thing the
 * cards were too polite to offer. Every one is filled from live session data,
 * so none of it can be a move somebody chose in advance.
 */
function typedAction(
  args: {
    readonly present: ReadonlyArray<{ name: string }>;
    readonly blocks: readonly Block[];
    readonly objective: string | null;
    readonly rng: () => number;
  },
): string {
  const { present, blocks, objective, rng } = args;
  const pick = present.length > 0 ? present[Math.floor(rng() * present.length)]! : null;
  const who = pick ? asRead(pick.name, blocks) : null;
  const thing = somethingFromTheBeat(blocks, present.map((p) => p.name));

  const talk = who
    ? [
        `I look at ${who} and ask what they actually want out of today.`,
        `"${who}. Say what you mean," I tell them, and wait.`,
        `I ask ${who} how long they think this can go on for.`,
        `I tell ${who} something I have not told anyone, and watch what they do with it.`,
      ]
    : [];
  const react = thing
    ? [
        `I go and look at the ${thing} properly.`,
        `I ask about the ${thing}, out loud, to whoever will answer.`,
        `"The ${thing}," I say. "That is what this is about, isn't it?"`,
      ]
    : [];
  const push = [
    'I decide I am done standing here, and start walking.',
    'I go looking for a way out of here, and I do not explain myself.',
    'I say out loud that I want to leave, and mean it.',
    `I ask where we would go if we left right now${objective ? `, and whether it changes anything about ${objective.toLowerCase().replace(/\.$/, '')}` : ''}.`,
  ];
  const blunt = [
    'I stop talking and just watch them for a moment, to see who moves first.',
    'I do the thing everyone here is expecting me not to do.',
    'I sit down and refuse to move until somebody tells me the truth.',
  ];

  const pools = [talk, react, push, blunt].filter((p) => p.length > 0);
  const weights = pools.map((p) =>
    p === talk ? 4 : p === react ? 3 : p === push ? 2 : 1,
  );
  const pool = weighted(pools, weights, rng);
  return pool[Math.floor(rng() * pool.length)]!;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const flag = (name: string): string | undefined =>
    argv.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
  const storyId = flag('story') ?? 'story_ace';
  const turns = Number(flag('turns') ?? 20);
  const locale = flag('locale') ?? 'en';
  const pick = Number(flag('pick') ?? 1);
  const player = flag('player') ?? 'first';
  const resumeSession = flag('session') ?? null;
  const asUser = flag('user') ?? null;
  const rng = seeded(flag('seed') ?? 'casual-1');
  const out = flag('out') ?? `/tmp/transcript-${storyId}.md`;
  const tier = flag('tier') ?? 'VIVID';

  const auth = {
    authorization: `Bearer ${asUser ?? (await token())}`,
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
    `${player === 'casual' ? 'Played the way most people play it' : `Tap-only, card ${pick}`}, ` +
      `${turns} turns, ${tier}, locale \`${locale}\`. ` +
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

  // Carrying on, or starting fresh.
  const session = resumeSession
    ? await call<any>('GET', `/v1/sessions/${resumeSession}`)
    : await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
        identity: {
          displayName: named ? detail.protagonist.name : 'Tester',
          pronouns: named ? detail.protagonist.pronouns : 'they/them',
          archetypeId: archetypes[0]?.id ?? null,
          advanced: {},
          ...(locale === 'fr' ? { grammar: { gender: 'MASCULINE', thirdPerson: 'il' } } : {}),
        },
        locale,
      });

  const sessionId = resumeSession ?? session.session.sessionId;
  // Where the story already is, so the transcript's turn numbers continue the
  // ones the first half used rather than starting again at one.
  const startedAt = resumeSession ? (session.recentTurns?.at(-1)?.turnIndex ?? 0) : 0;

  // A fresh guest gets 600 credits and a VIVID turn costs 60, so an untouched
  // wallet buys exactly ten turns and a twenty-turn run dies at eleven with a
  // 402. Harness-only: grant against the same ledger the wallet reads.
  if (process.env.DATABASE_URL) {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
      // The account this run actually spends from. Picking the newest ledger
      // row is right for a fresh guest and wrong for a resumed session, which
      // may not have been the last account to move.
      const { rows } = asUser
        ? await pool.query<{ account_id: string; balance_after: string }>(
            `SELECT account_id, balance_after FROM wallet_ledger
             WHERE account_id = (SELECT account_id FROM wallet_accounts WHERE user_id = $1 LIMIT 1)
             ORDER BY created_at DESC LIMIT 1`,
            [asUser],
          )
        : await pool.query<{ account_id: string; balance_after: string }>(
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
  if (resumeSession) {
    say(`## Carrying on from turn ${startedAt}`);
    say();
    say(`> ${session.scene?.locationName ?? ''} · ${session.scene?.worldTimeLabel ?? ''}`);
    say();
  } else {
    say('## Opening');
    say();
    for (const para of String(detail.opening).split('\n\n')) say(`> ${para}`);
    say();
  }

  let cardsSeen = 0;
  let typesTapped = 0;
  let typesTyped = 0;
  // What the player can see when they decide what to type: the people standing
  // here, the objective in the header, and the beat they have just read.
  let present: Array<{ name: string }> = session.scene?.presentCharacters ?? [];
  let objective: string | null = session.scene?.objective ?? null;
  let lastBlocks: Block[] = [];
  /** turn id -> the line in `md` where its picture would appear. */
  const framePlaceholders = new Map<string, number>();

  for (let t = 1; t <= turns; t += 1) {
    if (cards.length === 0) {
      const fresh = await call<any>('GET', `/v1/sessions/${sessionId}`);
      cards = fresh.suggestions ?? [];
    }
    if (cards.length === 0) {
      say(`## Turn ${startedAt + t}`);
      say();
      say('**No cards offered. A tap-only player is stuck here.**');
      say();
      break;
    }

    // What this player does with the three cards.
    //
    // `first` always presses position one. `casual` reads them and takes
    // whichever appeals about two turns in three — first card most often,
    // because it is the one people read first — and the rest of the time
    // ignores all three and types.
    let chosenIndex = pick - 1;
    let typed: string | null = null;
    if (player === 'casual') {
      const taps = rng() < 0.66;
      if (taps) {
        chosenIndex = weighted([0, 1, 2], [45, 33, 22], rng);
        if (chosenIndex >= cards.length) chosenIndex = cards.length - 1;
      } else {
        typed = typedAction({ present, blocks: lastBlocks, objective, rng });
      }
    }

    say(`## Turn ${startedAt + t}`);
    say();
    say('**Offered:**');
    say();
    const highlight = typed === null ? chosenIndex : -1;
    for (const [i, card] of cards.entries()) {
      cardsSeen += 1;
      say(`${i + 1}. ${i === highlight ? '**' : ''}${card.text}${i === highlight ? '**' : ''}`);
    }
    say();

    const chosen = typed === null
      ? cards[Math.min(chosenIndex, cards.length - 1)]!
      : ({ text: typed } as Card);
    if (typed === null) {
      typesTapped += 1;
      say(`**Tapped card ${chosenIndex + 1}:** ${chosen.text}`);
    } else {
      typesTyped += 1;
      say(`**Typed:** ${chosen.text}`);
    }
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

    lastBlocks = (turn.blocks ?? []) as Block[];

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];
    present = after.scene?.presentCharacters ?? present;
    objective = after.scene?.objective ?? objective;

    const scene = after.scene ?? {};
    // `SessionSceneState` carries `worldTimeLabel` and `dayNumber`, not the
    // three fields this used to look for — which were all undefined, so twenty
    // turns of transcript printed a bare location and read as a session where
    // no time passed at all. It had; 115 minutes of it. The tool was lying
    // about the one thing it was there to record.
    // `worldTimeLabel` is already "Day 1 · 9:46 AM", so adding the day number
    // beside it printed "Day 1 · Day 1 · 9:46 AM". One field, not three.
    const header = [scene.locationName, scene.worldTimeLabel].filter(Boolean).join(' · ');
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
  say(`- ${typesTapped} turns tapped a card, ${typesTyped} typed something instead.`);
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

/**
 * Create mode, end to end, against a running API.
 *
 * Pitch → compile → inspect → publish → play. The point is not that the
 * endpoints answer — the route tests already say that — it is whether a world
 * a model built out of four sentences is one a person would want to play.
 *
 *   npm run create-e2e -- --pitch=lighthouse --turns=10 --locale=fr
 */
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.PLOTBREAK_API ?? 'http://localhost:4000';

/** Pitches written the way a real creator would write one: short and vague. */
const PITCHES: Record<string, { text: string; tone: string; length: string; pov: string; play: string[] }> = {
  lighthouse: {
    text: 'Two sisters keep a lighthouse on a rock off the coast. The supply boat is weeks late, the winter will not end, and there are eleven minutes missing from the log in the older one\'s handwriting.',
    tone: 'grim',
    length: 'medium',
    pov: 'blank',
    play: [
      'I ask her straight out about the eleven minutes.',
      'I go and read the log myself, properly, from the start of the winter.',
      'I say nothing and watch what she does with her hands.',
      'I climb up to the lamp and check it over.',
      'I tell her I am not angry, I just want to know.',
      'I go outside and look at the water for a while.',
      'I ask what happens to us if the boat does not come at all.',
      'Something is bothering me and I do not want to say what.',
      'I decide to stop asking and just do the work with her.',
      'I take the risk and say the thing neither of us has said.',
    ],
  },
  dojo: {
    text: 'A high school kendo club in a town nobody leaves. The captain graduated and left the club to me, and everyone who is left is better than I am. Nationals are in four months.',
    tone: 'warm',
    length: 'medium',
    pov: 'blank',
    play: [
      'I get to practice early and sweep the floor before anyone else arrives.',
      'I ask the strongest one in the club to teach me what she does.',
      'I tell them I am not going to pretend I am the best here.',
      'I lose on purpose to see what he does with an easy win.',
      'I go and find the old captain and ask why she picked me.',
      'I push the training harder than anyone wants and see who stays.',
      'I say nothing at the meeting and let them argue it out.',
      'I take the blame for the loss in front of the coach.',
      'I ask my rival what she actually thinks of me.',
      'I decide who fights first at nationals, and I tell them why.',
    ],
  },
  heist: {
    text: 'Paris, 1908. A locksmith who has gone straight is asked by her old crew to open one more door, and the thing behind it belongs to the man who put her brother in prison.',
    tone: 'tense',
    length: 'medium',
    pov: 'named',
    play: [
      'I go and look at the door myself, in daylight, like a customer.',
      'I ask what exactly is behind it, and I do not accept a vague answer.',
      'I tell them I will not do it if my brother is not part of the deal.',
      'I check who else they have spoken to about this.',
      'I sit with it overnight and do not give them an answer.',
      'I go and see my brother.',
      'I say yes, and I start building what I need.',
      'I lie to them about how long it will take.',
      'I watch the man who owns the door, from a distance, for an afternoon.',
      'I open it.',
    ],
  },
};

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const arg = (k: string, d: string) =>
    argv.find((a) => a.startsWith(`--${k}=`))?.slice(k.length + 3) ?? d;
  const key = arg('pitch', 'lighthouse');
  const pitch = PITCHES[key];
  if (!pitch) throw new Error(`unknown pitch ${key}. Have: ${Object.keys(PITCHES).join(', ')}`);
  const turns = Number(arg('turns', '10'));
  const locale = arg('locale', 'en');
  const out = arg('out', `/tmp/create-${key}-${locale}.md`);

  const env = (() => {
    try {
      return readFileSync('.env', 'utf8');
    } catch {
      return '';
    }
  })();
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
    if (!r.ok) throw new Error(`${m} ${p} ${r.status} ${t.slice(0, 600)}`);
    return JSON.parse(t) as T;
  };

  const md: string[] = [`# Create e2e — \`${key}\` — ${locale.toUpperCase()}`, ''];
  const say = (...lines: string[]) => {
    md.push(...lines);
    console.log(lines.join('\n'));
  };

  say('## The pitch', '', '> ' + pitch.text.replace(/\n/g, '\n> '), '', `tone \`${pitch.tone}\` · length \`${pitch.length}\` · pov \`${pitch.pov}\``, '');

  const started = await call<any>('POST', '/v1/create/drafts', {});
  const draftId = started.draft.draftId;

  const t0 = Date.now();
  // Compiling answers 202 and finishes in its own time; the client watches the
  // draft. Same thing here.
  await call<any>('POST', `/v1/create/drafts/${draftId}/compile`, {
    pitch: pitch.text,
    tone: pitch.tone,
    length: pitch.length,
    pov: pitch.pov,
    locale,
  });
  let compiled: any = null;
  for (let attempt = 0; attempt < 200; attempt += 1) {
    await new Promise((r) => setTimeout(r, 3000));
    const seen = await call<any>('GET', `/v1/create/drafts/${draftId}`);
    if (seen.draft.compile.status !== 'running') {
      compiled = seen;
      break;
    }
  }
  if (!compiled) throw new Error('compile never settled');
  if (compiled.draft.compile.status !== 'done') {
    console.log(`\n${compiled.draft.compile.status}: ${compiled.draft.compile.message}`);
    return;
  }
  const compileMs = Date.now() - t0;
  const d = compiled.draft;

  say(
    '## What it built',
    '',
    `Compiled in **${(compileMs / 1000).toFixed(1)}s**. Ready to publish: **${compiled.readiness.ready}**.`,
    compiled.readiness.ready ? '' : `Blocked on: ${compiled.readiness.blockedSteps.join(', ')} — ${JSON.stringify(compiled.readiness.issues)}`,
    '',
    `### ${d.title}`,
    `*${d.fantasyLabel}*`,
    '',
    d.hook,
    '',
    '**Premise**', '', d.premise, '',
    '**Tone**', '', d.toneGuide, '',
    '**True when the story begins**', '',
    ...d.hardCanon.map((f: string) => `- ${f}`),
    '',
    '**Cast**', '',
    ...d.characters.flatMap((c: any) => [
      `- **${c.name}** (${c.pronouns})${c.calledName ? ` — called ${c.calledName}` : ''} — ${c.role}`,
      `  - ${c.cardBlurb}`,
      c.hiddenDrives.length ? `  - underneath: ${c.hiddenDrives.join('; ')}` : '',
      c.secrets.length ? `  - keeps back: ${c.secrets.join(' / ')}` : '',
      c.boundaries.length ? `  - will not: ${c.boundaries.join('; ')}` : '',
      c.voiceSamples.length ? `  - sounds like: ${c.voiceSamples.join(' ')}` : '',
    ].filter(Boolean)),
    '',
    '**Places**', '',
    ...d.places.map((p: any) => `- ${p.name}${p.id === d.startingPlaceId ? ' *(opens here)*' : ''}: ${p.description}`),
    '',
    d.origins.length ? '**Origins**' : '',
    d.origins.length ? '' : '',
    ...d.origins.map((o: any) => `- **${o.name}** — ${o.role} · ${o.playstyle.join(', ')}\n  - ${o.summary}`),
    d.origins.length ? '' : '',
    '**Forces**', '',
    ...d.factions.map((f: any) => `- ${f.name}: ${f.description}`),
    '',
    '**Threads**', '',
    ...d.threads.map((t: any) => `- ${t.title}: ${t.summary}`),
    '',
    '**What the world can do**', '',
    ...d.worldEvents.map((e: any) => `- ${e.publicCopy} — *${e.directorNotes}*`),
    '',
    d.objects.length ? '**Objects the story turns on**' : '',
    ...d.objects.map((o: any) => `- **${o.name}**: ${o.description}`),
    d.objects.length ? '' : '',
    '**Endings**', '',
    ...d.endings.map((e: any) => `- \`${e.rarity}\` **${e.name}** (from turn ${e.minTurn}) — ${e.condition}${e.hint ? `\n  - hint: *${e.hint}*` : ''}`),
    '',
    '**Opening**', '', d.opening, '',
    d.openingSuggestions.length ? `Suggestions: ${d.openingSuggestions.map((s: string) => `\`${s}\``).join(' · ')}` : '',
    '',
    d.styleExamples.length ? '**How it sounds**' : '',
    ...d.styleExamples.map((s: string) => `> ${s}`),
    '',
  );

  if (!compiled.readiness.ready) {
    writeFileSync(out, md.join('\n'));
    console.log(`\nNot publishable. Wrote ${out}`);
    return;
  }

  const published = await call<any>('POST', `/v1/create/drafts/${draftId}/publish`, {
    visibility: 'PUBLIC',
  });
  const storyId = published.storyId;
  say('## Published', '', `\`${storyId}\` · version ${published.draft.publishedVersionId ? '1+' : '?'}`, '');

  const detail = await call<any>('GET', `/v1/stories/${storyId}`);
  const session = await call<any>('POST', `/v1/stories/${storyId}/sessions`, {
    identity: {
      displayName: detail.protagonist?.name || 'Sam',
      pronouns: detail.protagonist?.pronouns || 'they/them',
      archetypeId: detail.archetypes?.[0]?.id ?? null,
      advanced: {},
    },
    locale,
  });
  const sessionId = session.session.sessionId;
  let revision = session.revision ?? 0;
  let cards: any[] = session.suggestions ?? [];

  say('## Play', '', `session \`${sessionId}\` · ${turns} turns · locale \`${locale}\``, '');

  const pool = [...pitch.play];
  for (let i = 0; i < turns; i += 1) {
    const actionText = pool.shift() ?? cards[0]?.text ?? 'I take stock of where I am.';
    const accepted = await call<any>(
      'POST',
      `/v1/sessions/${sessionId}/turns`,
      {
        actionText,
        qualityTier: 'VIVID',
        sessionRevision: revision,
        selectedSuggestionId: null,
        voicePreferred: false,
      },
      { 'idempotency-key': crypto.randomUUID() },
    ).catch((e) => {
      say(`### Turn ${i + 1} — FAILED`, '', '```', String(e).slice(0, 700), '```', '');
      return null;
    });
    if (!accepted) break;

    // `/v1/turns/:id` is the turn itself, and it 404s until it exists.
    let turn: any = null;
    for (let wait = 0; wait < 180 && !turn; wait += 1) {
      turn = await call<any>('GET', `/v1/turns/${accepted.turnId}`).catch(() => null);
      if (!turn) await new Promise((r) => setTimeout(r, 1000));
    }
    if (!turn) {
      say(`### Turn ${i + 1} — never arrived`, '');
      break;
    }

    const after = await call<any>('GET', `/v1/sessions/${sessionId}`);
    revision = after.revision ?? revision;
    cards = after.suggestions ?? [];
    const name = (id: string | null) =>
      id ? ((detail.cast ?? []).find((c: any) => (c.characterId ?? c.id) === id)?.name ?? id) : null;

    say(
      `### Turn ${i + 1}`,
      '',
      `**You:** ${actionText}`,
      '',
      ...(turn.blocks ?? []).map((b: any) => {
        const who = name(b.speakerId);
        return who ? `> **${who}.** ${b.text}` : `> ${b.text}`;
      }),
      '',
      `*${turn.endStatePrompt ?? ''} · ${after.scene?.locationName ?? ''} · present: ${(after.scene?.presentCharacters ?? []).map((p: any) => p.name).join(', ') || 'nobody'}*`,
      '',
      cards.length ? `Suggestions: ${cards.map((c: any) => `\`${c.text}\``).join(' · ')}` : '',
      '',
    );
  }

  writeFileSync(out, md.join('\n'));
  console.log(`\nWrote ${out}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

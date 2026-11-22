import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { SEVEN_YEARS_EARLY } from './seven-years-early.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Seven Years Early, held to the promises on its own card: you remember the
 * next five days, every change blurs them, revenge is optional, and a player
 * who never pulls on the memo still gets a whole game.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalogue-wide specs do not see
 * it. The structural checks they would run are repeated here against this one
 * world, alongside the three checks every new story runs and the opener rules
 * from the stories plan.
 *
 * The failure this world is most exposed to is Good Morning, Husband's: the
 * mystery leaking into a run that did not ask for it, and a business thriller
 * turning into a ghost story on turn six. The second is the regression fantasy
 * collapsing into one long revenge quest, where the only way to win is to
 * destroy him.
 */

const S = SEVEN_YEARS_EARLY;

const start = (archetypeId = 'arch_code') =>
  createInitialState({
    sessionId: 'sess_seven_years_early',
    story: S,
    identity: {
      displayName: 'Alex Moreno',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const quest = (id: string) => S.quests.find((q) => q.id === id)!;
const event = (id: string) => S.worldEvents.find((e) => e.id === id)!;
const ending = (id: string) => S.endings.find((e) => e.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ step: s.id, route })));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-six. */
const AGES: Record<string, number> = { victor: 31, naomi: 34, sol: 23, ruiz: 46, osei: 61, vos: 58 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  victor: 'thirty-one',
  naomi: 'thirty-four',
  sol: 'twenty-three',
  ruiz: 'forty-six',
  osei: 'sixty-one',
  vos: 'fifty-eight',
};

/** Every flag something in this world can set, plus the engine's own vocabulary. */
const settable = (() => {
  const flags = new Set<string>(['left_the_map']);
  for (const s of steps) {
    for (const f of s.rewards.flags) flags.add(f);
    for (const r of s.succeedWhenAny) for (const f of r.setsFlags) flags.add(f);
  }
  for (const e of S.worldEvents) for (const f of e.setsFlags) flags.add(f);
  return flags;
})();
// `knows:` is deliberately absent: the engine never sets it, so a route must.
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:', 'cooldown:', 'route:', 'closed:'];
const canBeSet = (flag: string) => settable.has(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    const texts = [
      S.premise,
      S.opening,
      S.hook,
      ...S.openingSuggestions,
      ...S.characters.map((c) => c.cardBlurb),
      ...S.rules.styleExamples,
    ];
    for (const text of texts) expect(text).not.toContain('\\n');
  });

  it('clears the clarity checker with no errors, and the premise answers every question', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const missing = report.issues.filter((i) => i.code.startsWith('MISSING_') && !i.message.startsWith('Opening:'));
    expect(missing.map((i) => i.code)).toEqual([]);
  });

  it('meets the content bar for a world: premise, promises, cast and cards', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    expect(words(S.premise).length).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(S.promises.length).toBe(5);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
    expect(S.rules.startingItems.length).toBeGreaterThan(0);
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('keeps everything a 13+ reader sees on the right side of the line', () => {
    const everything = JSON.stringify(S);
    const FORBIDDEN =
      /\b(nude|naked|shirtless|topless|lingerie|underwear|cleavage|sexy|seduc\w*|undress\w*|gore|blood\w*|suicid\w*|self-harm|corpse)\b/i;
    expect(everything).not.toMatch(FORBIDDEN);
    expect(S.rules.allowsRomance).toBe(true);
    expect(S.rules.allowsCombat).toBe(false);
    expect(S.rules.toneGuide).toMatch(/at most a kiss/);
    expect(S.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
  });

  it('never describes the death past a floor and a door', () => {
    const death = S.rules.hardCanon.find((line) => line.startsWith('The player died'))!;
    expect(death).toMatch(/Nothing more than that is ever described\./);
    expect(S.rules.toneGuide).toMatch(/never described further/);
  });
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('"Victor Lane.');
  });

  it('ends on a question the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"So\. Partners\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the man introducing himself may appear, and a weekday is not a name.
    const ALLOWED = new Set(['Victor', 'Lane', 'Victor’s', 'I', 'Monday']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/\b[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one is doing exactly what killed you, on purpose.
    expect(risky).toMatch(/sign it/);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of S.openingSuggestions) {
      const intent = await parser.parse(card, { story: S, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-six');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(`${c.calledName ?? c.name.split(' ')[0]!}`);
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
  });

  it('describes people by build and clothes, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl\w*|boy\w*|young\w*|youth\w*|kid\w*|child\w*|minor|student|schoolgirl|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older)\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('hands the production storyteller every age, whichever job the player picks', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    for (const archetype of S.archetypes) {
      const brief = worldBrief(S, archetype.id);
      expect(brief, archetype.id).toContain('Victor Lane is thirty-one');
      expect(brief, archetype.id).toContain('Arden Vos fifty-eight');
      for (const id of archetype.startingAbilities) expect(brief, `${archetype.id}/${id}`).toContain(ability(id).name);
    }
  });
});

describe('the cover', () => {
  it('puts the title in the art and him in front', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('SEVEN YEARS EARLY');
    expect(cover).toContain('Victor Lane');
    expect(cover).toMatch(/no letters, no numbers/i);
    expect(cover).toMatch(/No other text anywhere\./);
    expect(S.openingPanel?.assetKey).toBe('story_seven_years_early/opening');
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('gives the title its own line and keeps every effect off his face', () => {
    const cover = S.coverDirection!;
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(cover.match(/\bTITLE:/g), 'exactly one TITLE: line').toHaveLength(1);
    expect(title).toContain('Seven Years Early');
    expect(title).toMatch(/upper third/);
    expect(cover).toMatch(/HIS FACE STAYS CLEAN/);
    expect(cover, 'people by costume and pose, not by age').not.toMatch(/\b(adult|older|aged?)\b/i);
  });

  it('opens on a panel of the one who speaks first, with no prologue', () => {
    const alt = S.openingPanel!.alt;
    expect(alt.length).toBeLessThanOrEqual(200);
    expect(alt.startsWith('Victor')).toBe(true);
    expect(S.opening.startsWith('"Victor Lane."')).toBe(true);
    expect(S.prologue ?? []).toEqual([]);
  });

  it('gives every character on a card a face to draw', () => {
    for (const c of S.characters.filter((c) => c.cardBlurb)) expect(c.appearance?.trim(), c.id).toBeTruthy();
  });
});

describe('the system lives where the production storyteller reads it', () => {
  it('starts every job with Call the Future', () => {
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('call_the_future');
  });

  it('puts both costs of the regression in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/exact until they change something/);
    expect(canon).toMatch(/Victor reads faces for a living/);
  });

  it('hands the player the proof of the date', () => {
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('your_phone');
    const phone = S.items.find((i) => i.id === 'your_phone')!;
    expect(phone.questItem).toBe(true);
    expect(phone.description).toMatch(/seven years before the night you died/);
  });

  it('names every titled character the way people say it', () => {
    expect(S.characters.find((c) => c.id === 'ruiz')!.calledName).toBe('Ruiz');
    expect(S.rules.toneGuide.length).toBeGreaterThan(200);
  });
});

describe('he is across the table, and he is not a monster', () => {
  it('starts with Victor at the table and Ruiz in the corner, and Naomi not here yet', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('victor');
    expect(present).toContain('ruiz');
    expect(present).not.toContain('naomi');
  });

  it('starts him liking the player, because he has not done anything yet', () => {
    const victor = S.characters.find((c) => c.id === 'victor')!;
    expect(victor.startingRelationship.trust).toBeGreaterThanOrEqual(35);
    expect(victor.startingRelationship.rivalry).toBe(0);
    expect(victor.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(victor.secrets.length).toBeGreaterThanOrEqual(3);
  });

  it('gives every answer at the table a route, including signing', () => {
    const table = steps.find((s) => s.id === 'the_table')!;
    const used = new Set(table.succeedWhenAny.flatMap((r) => r.predicate.flagsSet));
    for (const f of ['used:walk_away', 'used:play_along', 'used:say_it_to_his_face', 'used:pull_records', 'spoke:victor']) {
      expect(used.has(f), f).toBe(true);
    }
  });

  it('makes showing your hand expensive, and remembers it', () => {
    const face = ability('say_it_to_his_face');
    const suspicion = face.costs.find((c) => c.resourceId === 'suspicion')!;
    expect(suspicion.amount).toBeGreaterThanOrEqual(25);
    expect(ending('end_he_saw_you_coming').requires.flagsSet).toContain('victor_warned');
  });

  it('lets Naomi say no, and never as a prize', () => {
    const naomi = S.characters.find((c) => c.id === 'naomi')!;
    const romance = naomi.gates.find((g) => g.kind === 'ROMANCE')!;
    expect(romance.requires.flagsSet).toContain('naomi_interested');
    const what = steps.find((s) => s.id === 'what_she_is_to_you')!;
    const more = what.succeedWhenAny.find((r) => r.routeId === 'partners_and_more')!;
    expect(more.predicate.minRelationship.length).toBeGreaterThanOrEqual(2);
    expect(what.succeedWhenAny.some((r) => r.routeId === 'she_walked')).toBe(true);
  });
});

describe('the patent race runs on the clock whatever the player does', () => {
  it('files his patent on Wednesday at nine unless the player got to Osei first', () => {
    const files = event('we_victor_files');
    expect(files.atWorldMinute).toBe(2 * 1440 + 9 * 60);
    expect(files.requiresFlags).toEqual([]);
    expect(files.setsFlags).toEqual(['patent_his']);
    expect(files.cancelledByFlags).toContain('osei_retained');
  });

  it('only buys the player until Thursday at five by signing first', () => {
    const late = event('we_victor_files_late');
    expect(late.atWorldMinute).toBe(3 * 1440 + 17 * 60);
    expect(late.requiresFlags).toEqual(['osei_retained']);
    expect(late.cancelledByFlags).toEqual(['patent_yours']);
    const filed = steps.find((s) => s.id === 'file_first')!.succeedWhenAny.find((r) => r.routeId === 'filed_first')!;
    expect(filed.predicate.beforeWorldMinute).toBe(late.atWorldMinute);
  });

  it('settles both race steps even for a player who never enters it', () => {
    for (const id of ['get_an_attorney', 'file_first']) {
      const step = steps.find((s) => s.id === id)!;
      expect(step.succeedWhenAny.some((r) => r.predicate.flagsSet.join() === 'patent_his'), id).toBe(true);
    }
  });

  it('tells the storyteller what day each event lands on, since it never sees the clock', () => {
    const DAY = /\b(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\b/;
    for (const e of S.worldEvents) expect(`${e.publicCopy} ${e.directorNotes}`, e.id).toMatch(DAY);
  });

  it('keeps every event on the clock inside the one week', () => {
    for (const e of S.worldEvents) {
      expect(e.atWorldMinute, e.id).toBeGreaterThan(S.rules.startWorldMinute);
      expect(e.atWorldMinute, e.id).toBeLessThan(7 * 1440);
    }
  });
});

describe('revenge is optional', () => {
  it('has good endings that take no revenge at all', () => {
    for (const id of ['end_clean_hands', 'end_let_him_have_it']) {
      const e = ending(id);
      expect(e.requires.flagsUnset, id).toEqual(expect.arrayContaining(['victor_exposed', 'case_reopened']));
      expect(e.requires.flagsSet, id).not.toContain('pattern_proven');
    }
  });

  it('lets a player who lost the patent still end well', () => {
    expect(ending('end_let_him_have_it').requires.flagsSet).not.toContain('patent_yours');
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_same_handshake', 'end_he_saw_you_coming', 'end_walked_out']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });
});

describe('the memo is optional and behaves like it', () => {
  it('hides the whole Fourteen Seconds lead behind a flag only a curious player sets', () => {
    const lead = quest('q_fourteen_seconds');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_memo']);
  });

  it('never sets that flag from something everybody gets', () => {
    const events = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_memo'));
    for (const e of events) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
    const questsSetting = S.quests.filter((q) =>
      q.steps.some((s) => s.succeedWhenAny.some((r) => r.setsFlags.includes('knows:the_memo'))),
    );
    for (const q of questsSetting) {
      expect(q.startsActive, q.id).toBe(false);
      expect(q.discoverWhen?.flagsSet.every((f) => f.startsWith('visited:')), q.id).toBe(true);
    }
    expect(events.length + questsSetting.length, 'nothing opens the lead').toBeGreaterThanOrEqual(2);
  });

  it('keeps the locked abilities locked, in the world’s own words', () => {
    for (const id of ['follow_the_memo', 'set_the_trap']) {
      const a = ability(id);
      expect(a.unlockedByDefault, id).toBe(false);
      expect(a.requires.lockedCopy.length, id).toBeGreaterThan(30);
      expect(a.requires.lockedCopy, id).not.toMatch(/flag|predicate|locked/i);
    }
    expect(ability('follow_the_memo').requires.flagsSet).toEqual(['knows:the_memo']);
    expect(ability('set_the_trap').requires.flagsSet).toEqual(['knows:how_he_does_it']);
  });

  it('never plays the memo in hard canon for a player who did not go looking', () => {
    const memo = S.rules.hardCanon.find((line) => line.includes('voice memo'))!;
    expect(memo).toMatch(/only if the player goes looking/);
    expect(memo).toMatch(/never played unless the player plays it themselves/);
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['memo_heard', 'memo_answered', 'knows:it_wasnt_only_him', 'knows:vos_was_there', 'knows:the_memo']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length, 'the memo gates too much').toBeGreaterThanOrEqual(8);
  });
});

describe('your sister and your heart are on the clock too', () => {
  it('books the heart test for everybody, and lets it be missed', () => {
    expect(event('we_sol_reminds').requiresFlags).toEqual([]);
    expect(event('we_sol_reminds').setsFlags).toContain('knows:the_heart');
    const missed = event('we_clinic_missed');
    expect(missed.atWorldMinute).toBe(3 * 1440 + 17 * 60 + 30);
    expect(missed.cancelledByFlags).toEqual(['heart_checked']);
  });

  it('lets Sol quit college on Friday unless somebody found out', () => {
    const quits = event('we_sol_hands_it_in');
    expect(quits.requiresFlags).toEqual([]);
    expect(quits.cancelledByFlags).toContain('knows:sol_leaving_college');
    for (const f of quits.cancelledByFlags) expect(canBeSet(f), f).toBe(true);
  });
});

describe('nobody is only there to react', () => {
  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of S.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      expect(c.gates.length, `${c.id} has no gate`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(4);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  const content = (text: string) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(S.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of S.characters) {
      for (const b of S.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}% of their vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('does not let two of them run the same rhetorical move', () => {
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
      ['numbered points', /\b(?:First|Second|Third),/],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('uses expressions the generator draws and short names nobody shares', () => {
    for (const c of S.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
    const names = S.characters.map((c) => calledName(c));
    expect(new Set(names).size, names.join(', ')).toBe(names.length);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('the wiring holds', () => {
  it('points only at things that exist', () => {
    const locIds = new Set(S.locations.map((l) => l.id));
    const itemIds = new Set(S.items.map((i) => i.id));
    const charIds = new Set(S.characters.map((c) => c.id));
    const abIds = new Set(S.abilities.map((a) => a.id));
    const facIds = new Set(S.factions.map((f) => f.id));
    const resIds = new Set(S.resources.map((r) => r.id));
    const broken: string[] = [];

    for (const l of S.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} item owned by ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} scheduled at ${b.locationId}`);
    }
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push(`startingLocationId ${S.rules.startingLocationId}`);
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const o of S.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} needs ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants item ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    expect(broken, `dangling references: ${broken.join('; ')}`).toEqual([]);
  });

  it('never reads a flag nothing can set', () => {
    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!canBeSet(f)) dead.push(`${where} needs ${f}`);
    };
    for (const q of S.quests) {
      if (q.discoverWhen) check(q.id, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(st.id, p.flagsSet);
        for (const r of st.succeedWhenAny) check(`${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const c of S.characters) for (const g of c.gates) check(g.id, g.requires.flagsSet);
    for (const e of S.worldEvents) check(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const e of S.endings) check(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const a of S.abilities) if (a.requires) check(a.id, a.requires.flagsSet);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...S.archetypes.flatMap((a) => a.startingAbilities),
      ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap((s) => s.rewards.abilities),
    ]);
    const obtainable = new Set([
      ...S.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...S.rules.startingItems.map((i) => i.itemId),
      ...steps.flatMap((s) => s.rewards.items.map((i) => i.itemId)),
      ...S.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { step, route } of routes) {
      for (const f of route.predicate.flagsSet) {
        if (f.startsWith('used:')) expect(grantable.has(f.slice(5)), `${step}/${route.routeId}: ${f}`).toBe(true);
      }
      for (const i of route.predicate.hasItems) expect(obtainable.has(i), `${step}/${route.routeId}: ${i}`).toBe(true);
    }
  });

  it('closes only flags that something sets, and closes something somewhere', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
    for (const { step, route } of routes) {
      for (const f of route.closesFlags) expect(canBeSet(f), `${step}/${route.routeId} closes ${f}`).toBe(true);
    }
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const block = c.schedule.find((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(block !== undefined || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    const clashes = [...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias);
    expect(clashes).toEqual([]);
  });

  it('keeps archetype names out of the world itself', () => {
    const world = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(world, a.id).not.toContain(a.name);
  });
});

describe('the choices say what they do', () => {
  it('clears the choice-clarity checker with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
  });

  it('describes every ability in one short line that says whether it can fail and what it costs', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('gives every job one ability the storyteller can read', () => {
    for (const a of S.archetypes) expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(1);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('has exactly the twelve endings the storyteller reads', () => {
    expect(S.endings).toHaveLength(12);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('can actually meet the reputation its rare endings ask for', () => {
    for (const e of S.endings) {
      for (const need of e.requires.minFactionReputation) {
        const f = S.factions.find((x) => x.id === need.factionId)!;
        const fromArchetype = Math.max(
          0,
          ...S.archetypes.flatMap((a) => a.startingReputation.filter((r) => r.factionId === f.id).map((r) => r.amount)),
        );
        const fromSteps = steps
          .flatMap((s) => s.rewards.reputation)
          .filter((r) => r.factionId === f.id)
          .reduce((sum, r) => sum + r.amount, 0);
        expect(f.startingReputation + fromArchetype + fromSteps, `${e.id} on ${f.id}`).toBeGreaterThanOrEqual(need.value);
      }
    }
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(S.resources.length).toBe(3);
    for (const r of S.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('lets rest restore the day and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['energy']);
  });

  it('makes a scene in a café the way he finds out', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(S.factions[0]?.id).toBe('faction_scene');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('never lets the future heal', () => {
    const ripples = S.resources.find((r) => r.id === 'ripples')!;
    expect(ripples.regenPerHour).toBe(0);
    expect(ability('call_the_future').costs.some((c) => c.resourceId === 'ripples')).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { calledName, coverAssetKey, knownExpression } from '@plotbreak/contracts';
import { withDerivedAssetKeys } from './derive-assets.js';
import { FINALS_WEEK_OUTBREAK } from './finals-week-outbreak.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Finals Week Outbreak, held to the promises on its own card: the sick ones
 * are learning, there are not enough seats, and somebody in the building is
 * hiding a clock under her sleeve.
 *
 * The failure this world is most exposed to is the one every zombie story
 * drifts toward: the infected becoming scenery that the player shoots through.
 * They are sick classmates, so violence has to cost something every time,
 * and the rules of what they are learning have to live where the storyteller
 * production actually runs can read them.
 *
 * This world is not in `LAUNCH_CATALOG` yet, so the catalog-wide checks that
 * would normally guard it (routes, flags, references, expressions, names,
 * opening cards) are run here against it directly.
 */

const S = withDerivedAssetKeys(FINALS_WEEK_OUTBREAK);

const start = (archetypeId = 'arch_night_desk') =>
  createInitialState({
    sessionId: 'sess_fwo',
    story: S,
    identity: {
      displayName: 'Sam Adeyemi',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const character = (id: string) => S.characters.find((c) => c.id === id)!;
const event = (id: string) => S.worldEvents.find((e) => e.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = S.quests.flatMap((q) =>
  q.steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ quest: q.id, step: s.id, route }))),
);
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-one. */
const AGES: Record<string, number> = { nora: 24, kwame: 34, lily: 19, declan: 23, haas: 61 };

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    const texts = [
      S.premise,
      S.opening,
      S.hook,
      S.creatorNote,
      ...S.openingSuggestions,
      ...S.characters.map((c) => c.cardBlurb),
      ...S.rules.styleExamples,
    ];
    for (const text of texts) expect(text).not.toContain('\\n');
  });

  it('keeps the premise inside the card’s word budget', () => {
    const n = words(S.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(240);
  });
});

describe('it is wired as story #40', () => {
  it('uses the slate’s ids', () => {
    expect(S.id).toBe('sv_finals_week_outbreak_1');
    expect(S.storyId).toBe('story_finals_week_outbreak');
    expect(S.title).toBe('Finals Week Outbreak');
  });

  it('derives every asset key under its own prefix', () => {
    expect(S.coverImage).toBe(coverAssetKey('story_finals_week_outbreak'));
    expect(S.openingPanel?.assetKey).toBe('story_finals_week_outbreak/opening');
    for (const l of S.locations) expect(l.stageImage, l.id).toContain('story_finals_week_outbreak');
    for (const c of S.characters) expect(c.portrait, c.id).toContain('story_finals_week_outbreak');
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
    expect(head).toContain('Nora');
    expect(head).toMatch(/"They don’t do that,"/);
  });

  it('ends on a question that needs an answer now', () => {
    expect(S.opening.trim()).toMatch(/"Kill the screen, or hold that door\. Which\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the woman at the table, who is introduced on the page, may appear.
    const ALLOWED = new Set(['Nora', 'Nora’s']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
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
    // The risky one is meeting whatever has the keys.
    expect(risky).toMatch(/open the door/);
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

describe('the rules live where the storyteller can read them', () => {
  const canon = S.rules.hardCanon.join(' ');

  it('says the infected are sick classmates, not corpses', () => {
    expect(canon).toMatch(/Regulars are sick living people, not dead ones/);
    expect(canon).toMatch(/no gore on the page/i);
    expect(S.rules.toneGuide).toMatch(/never from wounds/);
  });

  it('spells out what they are learning, in order', () => {
    expect(canon).toMatch(/walked into doors.*turn handles.*keys.*words/);
  });

  it('puts the clock in hard canon: the roof, the gate, the exam, the seal, Lily', () => {
    expect(canon).toContain('6:30 a.m.');
    expect(canon).toContain('four seats in all');
    expect(canon).toContain('opens at 7:00 a.m.');
    expect(canon).toContain('At 9:00 a.m.');
    expect(canon).toContain('At noon');
    expect(canon).toMatch(/Lily Tran is Volunteer 31/);
  });

  it('makes the objects the story turns on quest items, which are what it reads', () => {
    for (const id of ['trial_binder', 'reset_doses', 'paper_wristband', 'lily_sketchbook', 'spare_radio']) {
      expect(S.items.find((i) => i.id === id)?.questItem, id).toBe(true);
    }
  });

  it('gives every archetype a starting ability, so the storyteller sees what the player can do', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThan(0);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, id).toBe(true);
    }
  });
});

describe('the night runs on a clock that can be broken', () => {
  it('orders the pressure: roof, gate, exam, seal, Lily', () => {
    const at = (id: string) => event(id).atWorldMinute;
    expect(at('we_helicopter')).toBe(6 * 60 + 30);
    expect(at('we_gate_opens')).toBe(7 * 60);
    expect(at('we_the_exam')).toBe(9 * 60);
    expect(at('we_the_seal')).toBe(12 * 60);
    expect(at('we_lily_turns')).toBe(14 * 60);
    expect(event('we_helicopter').locationId).toBe('library_roof');
    expect(event('we_the_exam').locationId).toBe('exam_hall');
  });

  it('lets the player stop Lily’s clock, and only by putting her to sleep', () => {
    expect(event('we_lily_turns').cancelledByFlags).toEqual(['lily_slept']);
    const setters = routes.filter(({ route }) => route.setsFlags.includes('lily_slept'));
    expect(setters.length).toBeGreaterThanOrEqual(2);
    for (const { route } of setters) expect(route.predicate.flagsSet).toContain('used:give_the_reset');
  });

  it('lets her refuse, and treats the refusal as hers', () => {
    const no = routes.find(({ route }) => route.routeId === 'she_said_no')!.route;
    expect(no.setsFlags).toContain('lily_refused');
    expect(no.closesFlags).toContain('lily_slept');
    expect(character('lily').boundaries.join(' ')).toMatch(/without saying yes/);
  });

  it('starts the opener two minutes before the librarian locks up', () => {
    expect(S.rules.startWorldMinute).toBe(2 * 60 + 7);
    expect(event('we_fenn_locks_up').atWorldMinute).toBe(2 * 60 + 10);
    expect(event('we_fenn_locks_up').cancelledByFlags).toEqual(expect.arrayContaining(['door_open', 'fenn_led_away']));
  });
});

describe('there are not enough seats, and every answer to that is an ending', () => {
  it('counts six people in the building and four seats on the roof', () => {
    expect(S.characters).toHaveLength(5); // plus the player
    expect(S.rules.hardCanon.join(' ')).toContain('Six uninfected people are in the main library');
    expect(character('kwame').secrets.map((s) => s.fact).join(' ')).toMatch(/Haas plus three/);
  });

  it('gives every way of answering it a destination', () => {
    const who = steps.find((s) => s.id === 'who_goes')!;
    expect(who.succeedWhenAny.map((r) => r.routeId)).toEqual(
      expect.arrayContaining(['you_flew', 'gave_it_away', 'all_or_nobody', 'haas_stays']),
    );
    for (const flag of ['flew_out', 'gave_up_seat', 'all_or_nobody', 'haas_stayed_behind']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });
});

describe('the study pill is optional and behaves like it', () => {
  it('hides the whole trial lead behind a flag only a curious player sets', () => {
    const lead = S.quests.find((q) => q.id === 'q_the_study_pill')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_trial']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_trial'));
    expect(sources.length, 'no event opens the lead').toBeGreaterThanOrEqual(1);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
    const fromRoutes = routes.filter(({ route }) => route.setsFlags.includes('knows:the_trial'));
    expect(fromRoutes.length).toBeGreaterThanOrEqual(1);
  });

  it('leaves most of the ending space reachable without it', () => {
    const lead = new Set(['records_public', 'records_burned', 'records_to_cordon', 'trial_answered']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => lead.has(f)));
    expect(ordinary.length, 'the lead gates too much').toBeGreaterThanOrEqual(7);
  });
});

describe('the locked abilities are granted, and say why in the world’s words', () => {
  for (const [id, flag, stepId] of [
    ['walk_with_them', 'knows:the_routine', 'learn_the_pattern'],
    ['give_the_reset', 'has_the_reset', 'fetch_the_reset'],
  ] as const) {
    it(`${id} is gated on ${flag} and granted by ${stepId}`, () => {
      const a = ability(id);
      expect(a.unlockedByDefault).toBe(false);
      expect(a.requires.flagsSet).toEqual([flag]);
      expect(a.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
      const step = steps.find((s) => s.id === stepId)!;
      expect(step.rewards.abilities).toContain(id);
      expect(step.rewards.flags).toContain(flag);
      expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
    });
  }
});

describe('hurting a Regular costs something every time', () => {
  it('makes the fight ability loud and frightening as well as tiring', () => {
    const costs = ability('force_it').costs.map((c) => c.resourceId);
    expect(costs).toEqual(expect.arrayContaining(['stamina', 'noise', 'panic']));
  });

  it('makes public violence raise the noise before the group frays', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction
    // in array order.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('noise');
    expect(S.factions[0]?.id).toBe('faction_group_chat');
  });

  it('lets the opener be survived without hurting anybody', () => {
    const first = steps.find((s) => s.id === 'the_next_minute')!;
    const gentle = first.succeedWhenAny.filter((r) => !r.predicate.flagsSet.includes('used:force_it'));
    expect(gentle.length).toBeGreaterThanOrEqual(4);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-one');
    expect(canon).toContain('post-secondary');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
      expect(c.visualHook, c.id).not.toMatch(AGE_WORDS);
      expect(c.silhouette, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });
});

describe('the cover', () => {
  it('puts the exact title in the art and keeps gore out of it', () => {
    const cover = S.coverDirection;
    expect(cover).toContain('FINALS WEEK OUTBREAK');
    expect(cover).toContain('Nora');
    expect(cover).toMatch(/no wounds, no blood/i);
    expect(cover).toMatch(/no letters, no numbers/i);
  });

  it('owns its lettering with a TITLE line and keeps every effect off her face', () => {
    const cover = S.coverDirection;
    expect(cover).toMatch(/TITLE: the words FINALS WEEK OUTBREAK .*upper third/);
    expect(cover).toContain('HER FACE STAYS CLEAN');
    expect(cover).not.toMatch(/\badult\b/i);
  });
});

describe('it is ready for art and release', () => {
  it('heads the opener with a panel of the woman who speaks first', () => {
    expect(S.openingPanel?.alt.length).toBeLessThanOrEqual(200);
    expect(S.openingPanel?.alt).toMatch(/^Nora\b/);
  });

  it('has no prologue and is dated only at release', () => {
    expect(S.prologue).toEqual([]);
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('hands the storyteller the laptop and the one rule everybody can use', () => {
    expect(S.rules.startingItems.map((i) => i.itemId)).toEqual(['your_laptop']);
    expect(S.items.find((i) => i.id === 'your_laptop')?.questItem).toBe(true);
    expect(S.rules.hardCanon.join(' ')).toMatch(/A loud noise/);
    for (const a of S.archetypes) expect(a.startingAbilities[0], a.id).toBe('go_dark');
  });
});

describe('nobody is only there to react', () => {
  it('has Nora at the table when the story starts, and nobody else dropped in', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(['nora']);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('gives Lily a secret, a want of her own, and a way to refuse', () => {
    const lily = character('lily');
    expect(lily.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(lily.fears.length).toBeGreaterThanOrEqual(2);
    expect(lily.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(lily.secrets.length).toBeGreaterThanOrEqual(2);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of S.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
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
      // Nora’s tell: the same sentence twice when she is frightened.
      ['says it twice', /([A-Z][^.?!]{6,}[.?!])\s+\1/],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
    const twice = S.characters.filter((c) => c.voiceSamples.some((v) => /([A-Z][^.?!]{6,}[.?!])\s+\1/.test(v)));
    expect(twice.map((c) => c.id)).toEqual(['nora']);
  });

  it('gives no two characters the same short name', () => {
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    expect(calledName(character('haas'))).toBe('Haas');
  });

  it('uses only expressions the reaction generator draws', () => {
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
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
    for (const c of S.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });

  it('can walk from the reading room to every place', () => {
    const seen = new Set([S.rules.startingLocationId]);
    const queue = [S.rules.startingLocationId];
    while (queue.length) {
      const id = queue.shift();
      const here = S.locations.find((l) => l.id === id)!;
      for (const c of here.connections) if (!seen.has(c.to)) (seen.add(c.to), queue.push(c.to));
    }
    expect(S.locations.filter((l) => !seen.has(l.id)).map((l) => l.id)).toEqual([]);
  });
});

describe('it points only at things that exist and can be had', () => {
  const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
  const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));
  const settable = new Set<string>([
    ...steps.flatMap((s) => [...s.rewards.flags, ...s.succeedWhenAny.flatMap((r) => r.setsFlags)]),
    ...S.worldEvents.flatMap((e) => e.setsFlags),
  ]);

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
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), where).toBe(true);
        else if (!engineSets(flag)) expect(settable.has(flag), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const s of steps) {
      const granted = new Set(s.rewards.items.map((i) => i.itemId));
      for (const r of s.succeedWhenAny) for (const i of r.predicate.hasItems) expect(granted.has(i), `${s.id}/${i}`).toBe(false);
    }
  });

  it('never gates something behind a flag nothing can set', () => {
    const dead: string[] = [];
    for (const e of S.endings) for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) if (!settable.has(f) && !engineSets(f)) dead.push(`${e.id}:${f}`);
    for (const a of S.abilities) for (const f of a.requires.flagsSet) if (!settable.has(f)) dead.push(`${a.id}:${f}`);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag && !settable.has(c.lockedByFlag)) dead.push(`${l.id}->${c.to}`);
    for (const q of S.quests) for (const f of q.discoverWhen?.flagsSet ?? []) if (!settable.has(f)) dead.push(`${q.id}:${f}`);
    for (const s of steps) for (const f of s.enterWhen?.flagsSet ?? []) if (!settable.has(f)) dead.push(`${s.id}:${f}`);
    for (const c of S.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!settable.has(f)) dead.push(`${g.id}:${f}`);
    for (const e of S.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) if (!settable.has(f) && !engineSets(f)) dead.push(`${e.id}:${f}`);
    expect(dead).toEqual([]);
  });

  it('has no dangling references', () => {
    const loc = new Set(S.locations.map((l) => l.id));
    const item = new Set(S.items.map((i) => i.id));
    const who = new Set(S.characters.map((c) => c.id));
    const fac = new Set(S.factions.map((f) => f.id));
    const res = new Set(S.resources.map((r) => r.id));
    const broken: string[] = [];
    for (const l of S.locations) {
      for (const c of l.connections) if (!loc.has(c.to)) broken.push(`${l.id}->${c.to}`);
      for (const t of l.takeableItems) {
        if (!item.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !who.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !loc.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!loc.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of S.abilities) for (const c of a.costs) if (!res.has(c.resourceId)) broken.push(`${a.id} costs ${c.resourceId}`);
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!item.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const r of a.startingReputation) if (!fac.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const e of S.worldEvents) {
      if (e.locationId && !loc.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) if (!who.has(m.characterId) || !loc.has(m.toLocationId)) broken.push(`${e.id} moves`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!who.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!loc.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const s of q.steps) {
        for (const r of s.rewards.reputation) if (!fac.has(r.factionId)) broken.push(`${s.id} rep ${r.factionId}`);
        for (const r of s.succeedWhenAny) {
          if (r.predicate.atLocation && !loc.has(r.predicate.atLocation)) broken.push(`${r.routeId} at`);
          for (const m of r.predicate.minRelationship) if (!who.has(m.characterId)) broken.push(`${r.routeId} on ${m.characterId}`);
        }
      }
    }
    for (const e of S.endings) for (const m of e.requires.minRelationship) if (!who.has(m.characterId)) broken.push(`${e.id} on ${m.characterId}`);
    expect(broken).toEqual([]);
  });

  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) owners.set(alias.toLowerCase(), (owners.get(alias.toLowerCase()) ?? new Set()).add(t.itemId));
      }
    }
    expect([...owners].filter(([, ids]) => ids.size > 1).map(([a]) => a)).toEqual([]);
  });

  it('closes something when a route is taken', () => {
    expect(routes.filter(({ route }) => route.closesFlags.length > 0).length).toBeGreaterThanOrEqual(5);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('fits every ending inside the twelve the storyteller reads', () => {
    expect(S.endings.length).toBeGreaterThanOrEqual(8);
    expect(S.endings.length).toBeLessThanOrEqual(12);
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('has real losses, not just flavours of escape', () => {
    for (const id of ['end_volunteer_31', 'end_twenty_one_days', 'end_on_your_own']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('lets the siege happen to a player who decided nothing', () => {
    // Twenty-One Days needs only the noon seal, which fires for everybody.
    const siege = S.endings.find((e) => e.id === 'end_twenty_one_days')!;
    expect(siege.requires.flagsSet).toEqual(['campus_sealed']);
    expect(siege.requires.minRelationship).toEqual([]);
    expect(event('we_the_seal').requiresFlags).toEqual([]);
  });

  it('tells the writer what each ending means, not only what unlocks it', () => {
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
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

  it('lets rest restore the night and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('spends stamina when a cost has no price on it', () => {
    const cheapest = [...S.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('stamina');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
      expect(r.regenPerHour, `${r.id} never comes back down`).toBeLessThan(0);
    }
  });
});

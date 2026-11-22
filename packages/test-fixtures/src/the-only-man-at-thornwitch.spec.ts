import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { THE_ONLY_MAN_AT_THORNWITCH } from './the-only-man-at-thornwitch.js';

/**
 * The Only Man at Thornwitch, held to the promise on its own card: the raven
 * chose you, and a player who never asks why the Hedge let him in still gets a
 * whole game out of a headmistress, a rival, a roommate and a five-day clock.
 *
 * The checks a new story is most likely to get wrong live here too: the system
 * has to be readable by the storyteller production actually runs, the opener
 * has to hand the player a choice inside a hundred and twenty words, every
 * person on the page is an adult on the page, and a proximity premise runs on
 * comedy and choice, never on bodies.
 */

const S = THE_ONLY_MAN_AT_THORNWITCH;

const start = (archetypeId = 'arch_reader') =>
  createInitialState({
    sessionId: 'sess_thornwitch',
    story: S,
    identity: {
      displayName: 'Tom Archer',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const quest = (id: string) => S.quests.find((q) => q.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const step = (id: string) => steps.find((s) => s.id === id)!;
const routes = steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ step: s, route: r })));
const event = (id: string) => S.worldEvents.find((e) => e.id === id)!;
const words = (text: string) => text.split(/\s+/).filter(Boolean);
const everything = JSON.stringify(S);

/** Ages as the bible states them. The player is twenty-one. */
const AGES: Record<string, number> = {
  ivy: 22,
  morgaine: 58,
  nadia: 20,
  sexton: 300,
  hester: 47,
  cass: 91,
  tobias: 73,
};

/** Flag prefixes the engine sets on its own, and the one flag it sets for leaving. */
const ENGINE_PREFIXES: Array<[prefix: string, kind: 'character' | 'location' | 'ability' | 'any']> = [
  ['met:', 'character'],
  ['spoke:', 'character'],
  ['attacked:', 'character'],
  ['engaged:', 'character'],
  ['visited:', 'location'],
  ['used:', 'ability'],
  ['inspected:', 'any'],
];

const authoredFlags = new Set<string>([
  ...steps.flatMap((s) => s.rewards.flags),
  ...routes.flatMap(({ route }) => route.setsFlags),
  ...S.worldEvents.flatMap((e) => e.setsFlags),
]);

const settable = (flag: string): boolean => {
  if (flag === 'left_the_map') return true;
  if (authoredFlags.has(flag)) return true;
  for (const [prefix, kind] of ENGINE_PREFIXES) {
    if (!flag.startsWith(prefix)) continue;
    const id = flag.slice(prefix.length);
    if (kind === 'character') return S.characters.some((c) => c.id === id);
    if (kind === 'location') return S.locations.some((l) => l.id === id);
    if (kind === 'ability') return S.abilities.some((a) => a.id === id);
    return true;
  }
  return false;
};

/** Every flag anything in the story reads, with where it is read. */
const readFlags = (): Array<[flag: string, where: string]> => {
  const out: Array<[string, string]> = [];
  for (const q of S.quests) {
    for (const f of q.discoverWhen?.flagsSet ?? []) out.push([f, `${q.id}/discoverWhen`]);
    for (const s of q.steps) {
      for (const f of s.enterWhen?.flagsSet ?? []) out.push([f, `${q.id}/${s.id}/enterWhen`]);
      for (const r of s.succeedWhenAny) {
        for (const f of r.predicate.flagsSet) out.push([f, `${s.id}/${r.routeId}`]);
        for (const f of r.predicate.flagsUnset) out.push([f, `${s.id}/${r.routeId} (unset)`]);
      }
    }
  }
  for (const a of S.abilities) for (const f of a.requires?.flagsSet ?? []) out.push([f, `ability ${a.id}`]);
  for (const e of S.worldEvents) {
    for (const f of e.requiresFlags) out.push([f, `${e.id}/requires`]);
    for (const f of e.cancelledByFlags) out.push([f, `${e.id}/cancelledBy`]);
  }
  for (const e of S.endings) {
    for (const f of e.requires.flagsSet) out.push([f, e.id]);
    for (const f of e.requires.flagsUnset) out.push([f, `${e.id} (unset)`]);
  }
  for (const l of S.locations) {
    for (const c of l.connections) if (c.lockedByFlag) out.push([c.lockedByFlag, `${l.id} -> ${c.to}`]);
  }
  for (const c of S.characters) {
    for (const g of c.gates) for (const f of g.requires.flagsSet ?? []) out.push([f, `${c.id}/${g.id}`]);
  }
  return out;
};

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
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has the headmistress speak to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('Morgaine');
    expect(head).toMatch(/"Give him back,"/);
  });

  it('ends on a demand the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/what did you do to my bird\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the headmistress, introduced by name and title, and the raven's one word.
    const ALLOWED = new Set(['Headmistress', 'Morgaine', 'Ashdown', 'No', 'I']);
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
    // The risky one is leaving with her bird, in front of everybody.
    expect(risky).toMatch(/walk out .*raven/);
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

  it('has an opening panel captioned by the person in it', () => {
    expect(S.openingPanel?.assetKey).toBe('story_the_only_man_at_thornwitch/opening');
    expect(S.openingPanel?.alt).toMatch(/^Morgaine\b/);
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
  });
});

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding the letter the Hedge sent, as a quest item', () => {
    const letter = S.items.find((i) => i.id === 'hedge_letter')!;
    expect(letter.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('hedge_letter');
  });

  it('gives every archetype a way to talk to the raven, so the storyteller sees it', () => {
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('ask_the_raven');
    expect(ability('ask_the_raven').unlockedByDefault).toBe(true);
  });

  it('puts the raven’s rule, the clock and Rule Forty-One in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/will not go back to Morgaine’s shoulder/);
    expect(canon).toMatch(/fourth day/);
    expect(canon).toMatch(/fifth morning/);
    expect(canon).toMatch(/Equinox lamp/);
    expect(canon).toMatch(/Rule Forty-One/);
    expect(canon).toMatch(/Severing/);
  });

  it('spells out how the bond grows, since the storyteller never sees a locked ability', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/grows in steps/);
    expect(canon).toMatch(/see what the raven sees/);
    expect(canon).toMatch(/headache behind the eyes/);
    expect(canon).toMatch(/answers his palm/);
    expect(canon).toMatch(/cut dead wood out of the Hedge and graft living wood in/);
  });

  it('gives the titled characters the name they are called by', () => {
    const byId = (id: string) => S.characters.find((c) => c.id === id)!;
    expect(byId('morgaine').calledName).toBe('Morgaine');
    expect(byId('hester').calledName).toBe('Hester');
  });

  it('passes the premise clarity check with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`);
    expect(errors).toEqual([]);
  });

  it('passes the choice clarity check with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    const errors = report.issues
      .filter((i) => (i as { severity?: string }).severity === 'ERROR')
      .map((i) => `${i.code}: ${i.message}`);
    expect(errors).toEqual([]);
    expect(report.passed).toBe(true);
  });

  it('describes every ability in ordinary words: whether it can fail and what it costs', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('keeps archetype names out of the canon, premise and cast', () => {
    const shared = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(shared, a.id).not.toContain(a.name);
  });
});

describe('the mystery is optional and behaves like it', () => {
  const MYSTERY = new Set([
    'knows:the_closing',
    'knows:the_hedgewarden',
    'knows:the_hedge_answers',
    'has_the_shears',
    'warden_door_open',
    'found_the_garden',
    'hedge_kept',
    'two_keys',
    'took_the_office',
    'hedge_let_go',
    'closing_exposed',
    'charter_restored',
  ]);

  it('hides the whole Hedge lead behind a flag only a curious player sets', () => {
    const lead = quest('q_why_the_hedge');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_hedge_wants_something']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_hedge_wants_something'));
    expect(sources.length).toBeGreaterThan(0);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('never sets it from a step a player finishes by waiting', () => {
    for (const s of steps.filter((x) => x.rewards.flags.includes('knows:the_hedge_wants_something'))) {
      for (const r of s.succeedWhenAny) {
        const deliberate = r.predicate.flagsSet.length > 0 || r.predicate.minRelationship.length > 0;
        expect(deliberate, `${s.id}/${r.routeId}`).toBe(true);
      }
    }
  });

  it('leaves most of the ending space reachable without it', () => {
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => MYSTERY.has(f)));
    expect(ordinary.length, 'the mystery gates too much').toBeGreaterThanOrEqual(8);
  });
});

describe('the raven chose you, and he has rules', () => {
  it('lets the player see through his eyes only once the bond is accepted', () => {
    const eye = ability('ravens_eye');
    expect(eye.unlockedByDefault).toBe(false);
    expect(eye.requires.flagsSet).toEqual(['bond:accepted']);
    const granting = steps.filter((s) => s.rewards.abilities.includes('ravens_eye'));
    expect(granting).toHaveLength(1);
    expect(granting[0]!.rewards.flags).toContain('bond:accepted');
  });

  it('keeps every locked ability locked in the world’s own words', () => {
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(a.requires.lockedCopy.length, a.id).toBeGreaterThan(30);
      expect(a.requires.lockedCopy, a.id).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('sends him back to her only when something real changed', () => {
    const back = step('whose_raven').succeedWhenAny.filter((r) => r.setsFlags.includes('sexton_went_back'));
    expect(back.length).toBeGreaterThanOrEqual(2);
    for (const r of back) {
      const why = r.predicate.flagsSet.some((f) => f === 'hedge_kept' || f === 'morgaine_confesses');
      expect(why, r.routeId).toBe(true);
    }
  });

  it('speaks in four words or fewer', () => {
    const sexton = S.characters.find((c) => c.id === 'sexton')!;
    for (const v of sexton.voiceSamples) expect(words(v).length, v).toBeLessThanOrEqual(4);
  });
});

describe('the clock runs whether or not the player does', () => {
  const ORDINAL = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

  it('brings the Chairs on the fourth day, lights the lamp that night, and sits on the fifth morning', () => {
    expect(Math.floor(event('we_the_chairs_arrive').atWorldMinute / 1440)).toBe(3);
    expect(Math.floor(event('we_the_lamp_night').atWorldMinute / 1440)).toBe(3);
    expect(Math.floor(event('we_the_sitting').atWorldMinute / 1440)).toBe(4);
    expect(event('we_the_sitting').locationId).toBe('chamber_of_chairs');
  });

  it('tells the storyteller the day and hour in every event note, since it never sees the timing', () => {
    for (const e of S.worldEvents) {
      const day = ORDINAL[Math.floor(e.atWorldMinute / 1440)];
      expect(e.directorNotes, e.id).toMatch(new RegExp(`^${day} (morning|afternoon|evening|night|day),`));
    }
  });

  it('lets Hester take the chair from a player who does nothing at all', () => {
    for (const id of ['we_the_lamp_night', 'we_the_sitting']) {
      expect(event(id).requiresFlags, id).toEqual([]);
      expect(event(id).cancelledByFlags, id).toEqual([]);
    }
    const onlyLamp = (r: { predicate: { flagsSet: string[]; minRelationship: unknown[]; hasItems: string[] } }) =>
      r.predicate.flagsSet.length === 1 && r.predicate.minRelationship.length === 0 && r.predicate.hasItems.length === 0;
    expect(step('what_she_is_hiding').succeedWhenAny.some((r) => onlyLamp(r) && r.predicate.flagsSet[0] === 'lamp_night')).toBe(true);
    const fail = step('the_lamp').succeedWhenAny.find((r) => r.routeId === 'let_it_fail')!;
    expect(fail.predicate.flagsSet).toEqual(['lamp_night']);
    expect(fail.setsFlags).toContain('lamp_failed');
    const crane = step('the_sitting').succeedWhenAny.find((r) => r.routeId === 'crane_appointed')!;
    expect(crane.predicate.flagsSet).toEqual(['lamp_failed']);
    expect(step('the_sitting').enterWhen?.flagsSet).toEqual(['sitting_called']);
  });
});

describe('the Severing is lawful, and beatable', () => {
  it('has at least three ways to stop it and one way it happens', () => {
    const writ = step('the_writ').succeedWhenAny;
    const stops = writ.filter((r) => r.closesFlags.includes('severed'));
    expect(stops.length).toBeGreaterThanOrEqual(3);
    const happens = writ.filter((r) => r.setsFlags.includes('severed'));
    expect(happens.map((r) => r.predicate.flagsSet)).toEqual([['crane_appointed']]);
  });

  it('tells the player about it by the second evening, if the first day is over', () => {
    const visit = event('we_hester_visits');
    expect(Math.floor(visit.atWorldMinute / 1440)).toBe(1);
    expect(visit.setsFlags).toContain('knows:the_severing');
    expect(quest('q_the_severing').discoverWhen?.flagsSet).toEqual(['knows:the_severing']);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is a man of twenty-one');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^(An (adult|older) (wo)?man|A (raven|cat))\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('uses no minor-coded word anywhere in the story', () => {
    const MINOR = /\b(teen\w*|girls?|boys?|kids?|child\w*|schoolgirl\w*|schoolboy\w*|underage|minors?|high school)\b/i;
    expect(everything.match(MINOR)?.[0] ?? null).toBeNull();
  });
});

describe('it stays inside a 13+ rating', () => {
  it('has no sexual content, nudity, gore or self-harm vocabulary', () => {
    const BANNED =
      /\b(nud(e|ity)|naked|sexy|sexual\w*|sensual\w*|breasts?|cleavage|lingerie|undress\w*|seduc\w*|arous\w*|thighs?|shirtless|panties|underwear|bathing|gore|gory|disembowel\w*|suicid\w*|self-harm)\b/i;
    expect(everything.match(BANNED)?.[0] ?? null).toBeNull();
  });

  it('caps romance at a kiss and says so where the storyteller reads it', () => {
    expect(S.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(S.rules.toneGuide).toMatch(/fan service/);
    expect(S.contentDescriptors).toContain('ROMANCE');
  });
});

describe('it is its own story', () => {
  it('uses no franchise term', () => {
    const FRANCHISE =
      /\b(quirks?|nen|chakra|hokage|shinobi|jutsu|hogwarts|gryffindor|slytherin|hufflepuff|ravenclaw|muggles?|quidditch|bankai|zanpakuto|devil fruit|isekai|sorting hat)\b/i;
    expect(everything.match(FRANCHISE)?.[0] ?? null).toBeNull();
  });
});

describe('the cover', () => {
  it('puts the title in the art, spelled exactly, and nothing else', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('TITLE:');
    expect(cover).toContain('spelled exactly THE ONLY MAN AT THORNWITCH');
    expect(cover).toMatch(/No other text anywhere\.$/);
    expect(cover).toMatch(/^SUBJECT: Ivy Calder/);
    expect(cover).toMatch(/HER FACE STAYS CLEAN/);
    expect(cover).toMatch(/stays on the chalk, the circles, the hall and the title, never on her face/);
    expect(S.publishedAt).toBeNull();
    expect(S.prologue).toEqual([]);
  });
});

describe('nobody is only there to react', () => {
  it('starts the headmistress, the raven, the rival, the roommate and the deputy in the hall', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['morgaine', 'sexton', 'ivy', 'nadia', 'hester']));
  });

  it('places everybody by schedule at every minute of the day, never by fallback', () => {
    for (const c of S.characters) {
      const sorted = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(sorted[0]!.startMinute, c.id).toBe(0);
      expect(sorted[sorted.length - 1]!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i]!.startMinute, c.id).toBe(sorted[i - 1]!.endMinute);
      expect(S.locations.some((l) => l.id === c.homeLocationId), c.id).toBe(true);
    }
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
      expect(c.appearance.length, `${c.id} has no appearance`).toBeGreaterThan(40);
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
        const shared = [...va].filter((w) => vb.has(w));
        const overlap = shared.length / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${shared.join(', ')}`).toBeLessThan(0.3);
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
  const locationIds = new Set(S.locations.map((l) => l.id));
  const characterIds = new Set(S.characters.map((c) => c.id));
  const itemIds = new Set(S.items.map((i) => i.id));
  const abilityIds = new Set(S.abilities.map((a) => a.id));
  const factionIds = new Set(S.factions.map((f) => f.id));
  const skillIds = new Set(S.skills.map((s) => s.id));
  const resourceIds = new Set(S.resources.map((r) => r.id));

  it('points at nothing that does not exist', () => {
    const missing: string[] = [];
    const need = (ok: boolean, what: string) => {
      if (!ok) missing.push(what);
    };
    need(locationIds.has(S.rules.startingLocationId), `start ${S.rules.startingLocationId}`);
    for (const i of S.rules.startingItems) need(itemIds.has(i.itemId), `starting item ${i.itemId}`);
    for (const l of S.locations) {
      for (const c of l.connections) need(locationIds.has(c.to), `${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        need(itemIds.has(t.itemId), `${l.id} item ${t.itemId}`);
        if (t.ownerId) need(characterIds.has(t.ownerId), `${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      for (const s of c.schedule) need(locationIds.has(s.locationId), `${c.id} schedule ${s.locationId}`);
    }
    for (const a of S.abilities) {
      for (const cost of a.costs) need(resourceIds.has(cost.resourceId), `${a.id} cost ${cost.resourceId}`);
      if (a.check?.skillId) need(skillIds.has(a.check.skillId), `${a.id} skill ${a.check.skillId}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) need(characterIds.has(id), `${q.id} cast ${id}`);
      for (const id of q.involvedLocationIds) need(locationIds.has(id), `${q.id} place ${id}`);
      for (const s of q.steps) {
        for (const i of s.rewards.items) need(itemIds.has(i.itemId), `${s.id} reward ${i.itemId}`);
        for (const id of s.rewards.abilities) need(abilityIds.has(id), `${s.id} ability ${id}`);
        for (const r of s.rewards.reputation) need(factionIds.has(r.factionId), `${s.id} faction ${r.factionId}`);
        for (const r of s.succeedWhenAny) {
          const p = r.predicate;
          if (p.atLocation) need(locationIds.has(p.atLocation), `${s.id}/${r.routeId} at ${p.atLocation}`);
          for (const id of p.hasItems) need(itemIds.has(id), `${s.id}/${r.routeId} has ${id}`);
          for (const m of p.minRelationship) need(characterIds.has(m.characterId), `${s.id}/${r.routeId} ${m.characterId}`);
        }
      }
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) need(itemIds.has(i.itemId), `${a.id} item ${i.itemId}`);
      for (const id of a.startingAbilities) need(abilityIds.has(id), `${a.id} ability ${id}`);
      for (const r of a.startingReputation) need(factionIds.has(r.factionId), `${a.id} faction ${r.factionId}`);
      for (const id of Object.keys(a.skillProficiencies)) need(skillIds.has(id), `${a.id} skill ${id}`);
    }
    for (const e of S.worldEvents) if (e.locationId) need(locationIds.has(e.locationId), `${e.id} at ${e.locationId}`);
    for (const e of S.endings) {
      for (const m of e.requires.minRelationship) need(characterIds.has(m.characterId), `${e.id} ${m.characterId}`);
    }
    expect(missing).toEqual([]);
  });

  it('reads no flag that nothing can set', () => {
    const orphans = readFlags()
      .filter(([flag]) => !settable(flag))
      .map(([flag, where]) => `${flag} (${where})`);
    expect(orphans).toEqual([]);
  });

  it('never makes a step demand what it hands out', () => {
    const circular: string[] = [];
    for (const s of steps) {
      const gives = new Set([...s.rewards.flags, ...s.rewards.items.map((i) => i.itemId)]);
      for (const f of s.enterWhen?.flagsSet ?? []) if (gives.has(f)) circular.push(`${s.id} enter ${f}`);
      for (const r of s.succeedWhenAny) {
        for (const f of [...r.predicate.flagsSet, ...r.predicate.hasItems]) {
          if (gives.has(f)) circular.push(`${s.id}/${r.routeId} ${f}`);
        }
      }
    }
    expect(circular).toEqual([]);
  });

  it('gives every route a used: flag for an ability the player can have by then', () => {
    const granted = new Set([
      ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap((s) => s.rewards.abilities),
    ]);
    for (const { step: s, route } of routes) {
      for (const f of route.predicate.flagsSet.filter((x) => x.startsWith('used:'))) {
        expect(granted.has(f.slice(5)), `${s.id}/${route.routeId} needs ${f}`).toBe(true);
      }
    }
  });

  it('only uses expressions the portrait set knows', () => {
    for (const c of S.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
  });

  it('gives no two characters the same short name', () => {
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('keeps aliases of takeable things unique', () => {
    const aliases = S.locations.flatMap((l) => l.takeableItems.flatMap((t) => t.aka.map((a) => a.toLowerCase())));
    expect(new Set(aliases).size).toBe(aliases.length);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('has exactly the twelve endings production reads, each with a real condition and epilogue', () => {
    expect(S.endings).toHaveLength(12);
    expect(new Set(S.endings.map((e) => e.id)).size).toBe(12);
    for (const e of S.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.requires.flagsSet.length + e.requires.minRelationship.length, e.id).toBeGreaterThan(0);
    }
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_the_severing', 'end_shown_the_gate', 'end_headmistress_crane', 'end_the_hedge_comes_down'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('can send a player down for a hex outside the Bowl', () => {
    const rule = quest('q_rule_forty_one');
    expect(rule.startsActive).toBe(true);
    for (const r of rule.steps[0]!.succeedWhenAny) expect(r.setsFlags, r.routeId).toContain('expelled');
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

  it('makes public violence raise the college’s attention before anything else', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(S.factions[0]?.id).toBe('faction_college');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

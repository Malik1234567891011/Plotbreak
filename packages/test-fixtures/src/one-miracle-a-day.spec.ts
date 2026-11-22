import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { ONE_MIRACLE_A_DAY } from './one-miracle-a-day.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * One Miracle a Day, held to the promises on its own card: a god with one
 * follower and one miracle a day, a tournament that hands the Hearth to whoever
 * wins it, and more believers as the only way to grow.
 *
 * The story is not in `LAUNCH_CATALOG` yet, so the catalog-wide checks
 * (`catalog.spec.ts`, `endings.spec.ts`) do not reach it. The ones a new story
 * can fail without anyone noticing are repeated here against this story alone.
 */

const S = ONE_MIRACLE_A_DAY;

const start = (archetypeId = 'arch_lost') =>
  createInitialState({
    sessionId: 'sess_one_miracle_a_day',
    story: S,
    identity: {
      displayName: 'Orrin',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ step: s.id, route: r })));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/**
 * Ages as the bible states them. The gods are given by how long they have
 * existed; the shape each one wears is stated beside it in hard canon.
 */
const AGES: Record<string, number> = { tamsin: 24, fortune: 600, duke: 41, ash: 63, wick: 400, sabine: 52 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  tamsin: 'twenty-four',
  fortune: 'about six hundred years',
  duke: 'forty-one',
  ash: 'sixty-three',
  wick: 'about four hundred years',
  sabine: 'fifty-two',
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

  it('keeps the premise in short paragraphs that say who, where, what and why now', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length).toBeLessThanOrEqual(70);
  });

  it('borrows no vocabulary from a famous system-sponsor story', () => {
    const text = JSON.stringify(S);
    expect(text).not.toMatch(/constellation|incarnation|scenario|star stream|dokkaebi|indirect message|sponsor/i);
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
    expect(head).toContain('Tamsin');
    expect(head).toMatch(/"I know you’re up there,"/);
  });

  it('ends on a question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Well\? Are you going to help me or not\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the two people on the sand may appear, introduced by what they are doing.
    const ALLOWED = new Set(['Iron', 'Duke', 'Tamsin', 'Reed’s', 'I']);
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
    // The risky one is a foul under the Gallery Pact, in front of the Arbiter.
    expect(risky).toMatch(/Duke’s axe/);
  });

  it('declares the opening panel, drawn around Tamsin', () => {
    expect(S.openingPanel?.assetKey).toBe('story_one_miracle_a_day/opening');
    expect(S.openingPanel?.alt).toMatch(/^Tamsin/);
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
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

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding the gold line, with one miracle and one follower on it', () => {
    // Production's storyteller reads quest items, never resources.
    const line = S.items.find((i) => i.id === 'gold_line')!;
    expect(line.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('gold_line');
    expect(line.description).toContain('[Miracles left today: 1]');
    expect(line.description).toContain('Tamsin Reed');
  });

  it('gives every god Work a Miracle and one domain ability, so the storyteller sees both', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities, a.id).toContain('work_a_miracle');
      expect(a.startingAbilities.length, a.id).toBe(2);
    }
    expect(ability('work_a_miracle').unlockedByDefault).toBe(true);
  });

  it('spells out miracles, burning, followers and the Pact in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/one miracle each day for every person who truly prays/);
    expect(canon).toMatch(/burning itself/);
    expect(canon).toMatch(/one more miracle from the next dawn/);
    expect(canon).toMatch(/Gallery Pact/);
    expect(canon).toMatch(/six years running keeps it for good/);
    expect(canon).toMatch(/no further than a kiss/);
  });

  it('says in hard canon what happens at the count of three', () => {
    // The opener runs on this clock, and quest notes never reach the storyteller.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/has lost her weapon gets the same count/);
    expect(canon).toMatch(/the Arbiter rings the bell and she has lost the bout/);
  });

  it('lets the sighted Arbiter hear a god, and gods hear each other', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Only its own followers and the sighted can hear it/);
    expect(canon).toMatch(/gods can always see and hear one another/);
  });

  it('keeps archetype names out of the fields that would make them coexist', () => {
    const shared = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(shared, a.name).not.toContain(a.name);
  });

  it('keeps literal gold-line text out of the tone guide, which also feeds the cover', () => {
    expect(S.rules.toneGuide).not.toContain('[');
  });

  it('says what every ability does in one short line', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect.length, a.id).toBeLessThan(120);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
    }
  });
});

describe('more believers, more miracles', () => {
  it('opens on a second follower, then five, and five lets you show yourself', () => {
    const quest = S.quests.find((q) => q.id === 'q_one_miracle')!;
    expect(quest.steps.map((s) => s.id)).toEqual(['a_second_prayer', 'a_congregation']);
    expect(quest.steps[0]!.rewards.flags).toContain('two_a_day');
    expect(quest.steps[1]!.rewards.flags).toContain('five_a_day');
    expect(quest.steps[1]!.rewards.abilities).toContain('show_yourself');
    expect(ability('show_yourself').requires!.flagsSet).toEqual(['five_a_day']);
  });

  it('makes taking Wick’s last follower cost Wick', () => {
    const route = routes.find((r) => r.route.routeId === 'took_wicks_baker')!.route;
    expect(route.closesFlags).toContain('wick_stays_lit');
  });

  it('keeps every gated ability honest about why it is closed', () => {
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(a.requires, a.id).toBeDefined();
      expect(a.requires!.lockedCopy.length, a.id).toBeGreaterThan(30);
      expect(a.requires!.lockedCopy, a.id).not.toMatch(/flag|predicate|locked/i);
    }
  });
});

describe('the Games run on a clock', () => {
  it('opens mid-bout on the first afternoon, in the Bowl', () => {
    expect(S.rules.startingLocationId).toBe('the_bowl');
    expect(S.rules.startWorldMinute).toBe(14 * 60 + 30);
  });

  it('holds the hearing on the second night and the final at dusk on the third day', () => {
    const hearing = S.worldEvents.find((e) => e.id === 'we_the_hearing')!;
    const final = S.worldEvents.find((e) => e.id === 'we_final_bell')!;
    expect(hearing.atWorldMinute).toBe(1440 + 20 * 60);
    expect(final.atWorldMinute).toBe(2880 + 19 * 60);
  });

  it('can be stopped from stealing the lamp and from turning the Hearth', () => {
    expect(S.worldEvents.find((e) => e.id === 'we_lamp_stolen')!.cancelledByFlags).toContain('lamp_guarded');
    expect(S.worldEvents.find((e) => e.id === 'we_hearth_turns')!.cancelledByFlags).toContain('hearth_won');
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/The player is a small god who has existed for about two hundred years/);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(calledName(c));
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });
});

describe('the cover', () => {
  it('puts the title in the art and keeps her face clean', () => {
    const cover = S.coverDirection;
    expect(cover).toContain('ONE MIRACLE A DAY');
    expect(cover).toContain('Tamsin');
    expect(cover).toMatch(/HER FACE STAYS CLEAN/);
    expect(cover).toMatch(/no letters, no numbers/i);
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('derives its asset keys from the story id', () => {
    const derived = withDerivedAssetKeys(S);
    expect(derived.coverImage).toMatch(/^story_one_miracle_a_day/);
    for (const c of derived.characters) expect(c.portrait, c.id).toMatch(/^story_one_miracle_a_day/);
  });
});

describe('nobody is only there to react', () => {
  it('starts the follower, the champion, the rival, the Arbiter and the neighbour in the Bowl', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['tamsin', 'duke', 'fortune', 'ash', 'wick']));
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
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

  it('draws only faces the portrait generator knows', () => {
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
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
      expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('the wiring holds', () => {
  const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
  const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));
  const settable = new Set<string>([
    ...steps.flatMap((s) => [...s.rewards.flags, ...s.succeedWhenAny.flatMap((r) => r.setsFlags)]),
    ...S.worldEvents.flatMap((e) => e.setsFlags),
  ]);

  it('has more than one way through, and choices that close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
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
      for (const flag of route.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${step}/${route.routeId} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) {
        expect(obtainable.has(itemId), `${step}/${route.routeId} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('points only at things that exist', () => {
    const locIds = new Set(S.locations.map((l) => l.id));
    const itemIds = new Set(S.items.map((i) => i.id));
    const charIds = new Set(S.characters.map((c) => c.id));
    const abIds = new Set(S.abilities.map((a) => a.id));
    const facIds = new Set(S.factions.map((f) => f.id));
    const resIds = new Set(S.resources.map((r) => r.id));
    const skillIds = new Set(S.skills.map((s) => s.id));
    const broken: string[] = [];

    for (const l of S.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check && !skillIds.has(a.check.skillId ?? '')) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} teaches ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!settable.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
    };
    for (const e of S.endings) check(`ending ${e.id}`, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const a of S.abilities) if (a.requires) check(`ability ${a.id}`, a.requires.flagsSet);
    for (const c of S.characters) for (const g of c.gates) check(`gate ${g.id}`, g.requires.flagsSet);
    for (const e of S.worldEvents) check(`event ${e.id}`, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const q of S.quests) {
      if (q.discoverWhen) check(`quest ${q.id}`, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(`step ${st.id}`, p.flagsSet);
        for (const r of st.succeedWhenAny) check(`route ${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const l of S.locations) {
      for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    }
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never demands the thing a step is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      for (const r of st.succeedWhenAny) for (const i of r.predicate.hasItems) expect(granted.has(i), st.id).toBe(false);
    }
  });

  it('leaves something worth taking, and keeps every alias unique', () => {
    const takeable = S.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    const aliases = takeable.flatMap((t) => t.aka.map((a) => a.toLowerCase()));
    expect(new Set(aliases).size).toBe(aliases.length);
  });

  it('passes the clarity checks the director runs', async () => {
    const { checkStoryClarity, checkNarrativeClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = (issues: ReadonlyArray<{ severity: string; code: string; message: string }>) =>
      issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`);
    expect(errors(checkStoryClarity(S).issues)).toEqual([]);
    expect(checkNarrativeClarity(S.premise, { story: S, kind: 'premise' }).passed).toBe(true);
    expect(errors(checkStoryChoiceClarity(S).issues)).toEqual([]);
  });

  it('tells the player the choice of domain is for the whole story', () => {
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });

  it('keeps every archetype distinct at a glance', () => {
    const tagSets = S.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
    for (const a of S.archetypes) expect(a.playstyle.length).toBeGreaterThanOrEqual(2);
  });

  it('seeds at least three promises', () => {
    expect(S.promises.length).toBeGreaterThanOrEqual(3);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
    expect(S.endings.indexOf(walk)).toBeLessThan(12);
  });

  it('keeps every ending a quest route leads to inside the twelve the storyteller reads', () => {
    const seen = S.endings.slice(0, 12).map((e) => e.id);
    expect(seen).toContain('end_a_seat_at_the_rail');
    expect(seen).toContain('end_a_city_that_prays');
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_the_sixth_year', 'end_gone_out', 'end_struck_from_the_register', 'end_carried_off_the_sand', 'end_fortunes_newest_face'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('tells the writer what each ending means and never ends on turn zero', () => {
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

  it('lets rest restore the god and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['flame']);
  });

  it('makes public violence get a god noticed before it fades', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW resource and docks the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('notice');
    expect(S.factions[0]?.id).toBe('faction_gallery');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('uses the whole item rarity of a small world: quest items, kit and one thing to eat', () => {
    expect(S.items.filter((i) => i.questItem).length).toBeGreaterThanOrEqual(4);
    expect(S.items.some((i) => i.consumable)).toBe(true);
  });
});

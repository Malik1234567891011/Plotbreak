import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import { RuleBasedIntentParser, checkStoryChoiceClarity, checkStoryClarity } from '@plotbreak/director';
import { THE_CULT_MASTER_WAKES_AS_A_SERVANT as STORY } from './the-cult-master-wakes-as-a-servant.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * The Cult Master Wakes as a Servant, held to the promise on its own card: a
 * legend in a body that cannot lift a full bucket, four days before the woman
 * who poured the wine rides up the mountain.
 *
 * This world is not in LAUNCH_CATALOG yet, so the structural checks the
 * catalog and director specs run over every launch world are repeated here
 * against it directly. When it is registered those will run twice, which is
 * cheap; until then they are the only thing standing between a typo in a flag
 * and a quest that waits forever.
 *
 * The failure this world is most exposed to is the power fantasy arriving on
 * turn one. The later forms are locked behind the body, both of those locks
 * are opened by quest steps, and the turn the player most wants to make, the
 * one that ends with Mok on the ground, has to read as a technique rather than
 * as a fight the parser starts on their behalf.
 */

const start = (archetypeId = 'arch_blade') =>
  createInitialState({
    sessionId: 'sess_cmws',
    story: STORY,
    identity: {
      displayName: 'Han Mu-gyeol',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).filter(Boolean).length;

const steps = STORY.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

describe('the three checkpoint checks', () => {
  it('grants every gated ability from some step’s rewards', () => {
    const rewarded = new Set(STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)));
    const gated = STORY.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length, 'the later forms should be gated').toBeGreaterThanOrEqual(2);
    for (const ability of gated) {
      expect(rewarded.has(ability.id), `${ability.id} is gated and nothing grants it`).toBe(true);
    }
  });

  it('puts the word "you" in every card blurb', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
    }
  });

  it('gives every location an inbound edge', () => {
    for (const location of STORY.locations) {
      const inbound = STORY.locations.some((other) =>
        other.id !== location.id && other.connections.some((c) => c.to === location.id),
      );
      expect(inbound, `${location.id} has no way in`).toBe(true);
    }
  });
});

describe('the opener', () => {
  it('is at most 120 words', () => {
    expect(words(STORY.opening)).toBeLessThanOrEqual(120);
    expect(words(STORY.opening)).toBeGreaterThanOrEqual(50);
  });

  it('lets a named character speak inside the first 60 words', () => {
    const speech = STORY.opening.indexOf('"');
    expect(speech, 'nobody speaks').toBeGreaterThan(-1);
    expect(words(STORY.opening.slice(0, speech))).toBeLessThan(60);
    const firstSixty = STORY.opening.split(/\s+/).slice(0, 60).join(' ');
    const speaker = STORY.characters.find((c) => firstSixty.includes(calledName(c)));
    expect(speaker?.id, 'the first voice has no name').toBe('mok');
  });

  it('ends on a demand that needs an answer now', () => {
    const last = STORY.opening.trim().split('\n\n').at(-1)!;
    expect(last).toMatch(/\?["”]?$|\bnow\b/);
    expect(last.trim().endsWith('"')).toBe(true);
  });

  it('asks the player to know no proper noun they have not been given', () => {
    const allowed = new Set(['You', 'Then', 'Kneel', 'Properly', 'Senior', 'Disciple', 'Mok', 'This', 'It', 'Your', 'At', 'Forehead', 'Tell', 'Do']);
    const capitals = STORY.opening
      .split(/\s+/)
      .map((w) => w.replace(/[^A-Za-z]/g, ''))
      .filter((w) => /^[A-Z]/.test(w));
    const strangers = capitals.filter((w) => !allowed.has(w));
    expect(strangers, strangers.join(', ')).toEqual([]);
  });

  it('offers three cards: one said, one done, one risky', () => {
    expect(STORY.openingSuggestions.length).toBe(3);
    const said = STORY.openingSuggestions.filter((s) => /["“]/.test(s));
    expect(said.length, 'exactly one card should be speech').toBe(1);
    for (const s of STORY.openingSuggestions) {
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
      expect(s.length).toBeLessThanOrEqual(320);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    // The risky card presses a nerve, which is the first Grave Form, and must
    // reach the engine as a technique rather than as a brawl.
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of STORY.openingSuggestions) {
      const intent = await parser.parse(card, { story: STORY, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent, violent.join(' | ')).toEqual([]);
  });

  it('puts the boot and the woman at the well in the yard, and nobody else important', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('mok');
    expect(present).toContain('seo_ah');
    expect(present).not.toContain('seol_hwa');
    expect(present).not.toContain('gong');
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minuteOfDay = ((STORY.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = STORY.characters.filter(
      (c) =>
        !c.schedule.some((b) => minuteOfDay >= b.startMinute && minuteOfDay < b.endMinute) &&
        c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });
});

describe('everybody is an adult, and the page stays 13+', () => {
  const NUMBERS: Record<string, number> = {
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50,
    sixty: 60, seventy: 70, eighty: 80, ninety: 90,
  };
  const UNITS: Record<string, number> = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  };
  const ageOf = (word: string): number | null => {
    const [tens, unit] = word.toLowerCase().split('-');
    if (!tens || NUMBERS[tens] === undefined) return null;
    return NUMBERS[tens]! + (unit ? UNITS[unit] ?? NaN : 0);
  };
  const canon = STORY.rules.hardCanon.join(' ');

  it('states every character’s age in hard canon, and every one is eighteen or more', () => {
    // Hard canon reaches the storyteller on every turn, so this is where an
    // age has to live to be binding rather than decorative.
    expect(canon).toMatch(/Everybody in this story is an adult\./);
    for (const c of STORY.characters) {
      const match = canon.match(new RegExp(`${calledName(c)} is ([a-z-]+)`));
      expect(match, `${c.id} has no age in hard canon`).not.toBeNull();
      const age = ageOf(match![1]!);
      expect(age, `${c.id}: ${match![1]}`).not.toBeNull();
      expect(age!, c.id).toBeGreaterThanOrEqual(18);
    }
  });

  it('states the age of the body the player wakes in', () => {
    expect(canon).toMatch(/twenty-year-old servant/);
    expect(canon).toMatch(/Dol’s, is twenty\./);
  });

  it('describes people to the portrait generator as adults, by costume rather than age', () => {
    for (const c of STORY.characters) {
      expect(c.appearance, c.id).toMatch(/^An (?:elderly )?adult (?:woman|man)\b/);
    }
  });

  const everything = (): string =>
    JSON.stringify({
      premise: STORY.premise,
      hook: STORY.hook,
      opening: STORY.opening,
      cards: STORY.openingSuggestions,
      canon: STORY.rules.hardCanon,
      tone: STORY.rules.toneGuide,
      styles: STORY.rules.styleExamples,
      characters: STORY.characters,
      items: STORY.items,
      locations: STORY.locations,
      quests: STORY.quests,
      events: STORY.worldEvents,
      endings: STORY.endings,
      archetypes: STORY.archetypes,
      setup: STORY.setupFields,
    });

  it('codes nobody as a minor', () => {
    expect(everything()).not.toMatch(
      /\b(child|children|kid|kids|boy|boys|girl|girls|teen|teenager|teenage|underage|minor|schoolgirl|schoolboy|loli|little sister|little brother)\b/i,
    );
  });

  it('keeps romance to a kiss and violence off the page', () => {
    expect(everything()).not.toMatch(
      /\b(sex|sexual|naked|nude|nudity|undress\w*|breasts?|lingerie|aroused|erotic|bedroom|suicide|self-harm|disembowel\w*|entrails|intestines|decapitat\w*|severed|dismember\w*)\b/i,
    );
  });

  it('borrows no franchise names', () => {
    expect(everything()).not.toMatch(
      /heavenly demon|mount hua|huashan|wudang|shaolin|emei|kunlun|namgung|moyong|return of the|murim heroes/i,
    );
  });

  it('is written in English', () => {
    expect(everything()).not.toMatch(/[぀-ヿ㐀-鿿가-힯]/);
  });
});

describe('the master remembers more than the body can do', () => {
  it('locks the fourth and sixth forms behind the body, in the world’s own words', () => {
    const wreath = STORY.abilities.find((a) => a.id === 'iron_wreath')!;
    const bell = STORY.abilities.find((a) => a.id === 'grave_bell')!;
    expect(wreath.requires.flagsSet).toEqual(['body_opened']);
    expect(bell.requires.flagsSet).toEqual(['breath_rebuilt']);
    for (const ability of [wreath, bell]) {
      expect(ability.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(ability.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('opens each lock with the step that grants the form behind it', () => {
    const rebuild = STORY.quests.find((q) => q.id === 'q_rebuild')!;
    const [open, fill] = rebuild.steps;
    expect(open!.succeedWhenAny.every((r) => r.setsFlags.includes('body_opened'))).toBe(true);
    expect(open!.rewards.abilities).toEqual(['iron_wreath']);
    expect(fill!.succeedWhenAny.every((r) => r.setsFlags.includes('breath_rebuilt'))).toBe(true);
    expect(fill!.rewards.abilities).toEqual(['grave_bell']);
  });

  it('describes every ability in under 120 characters', () => {
    for (const ability of STORY.abilities) {
      const effect = abilityEffect(STORY, ability);
      expect(effect.length, `${ability.id}: ${effect}`).toBeLessThan(120);
    }
  });

  it('makes the loudest form cost the disguise', () => {
    const bell = STORY.abilities.find((a) => a.id === 'grave_bell')!;
    const suspicion = bell.costs.find((c) => c.resourceId === 'suspicion');
    expect(suspicion?.amount ?? 0).toBeGreaterThanOrEqual(30);
    expect(bell.cooldownMinutes).toBeGreaterThanOrEqual(1440);
  });
});

describe('six people, six mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of STORY.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.gates.length, `${c.id} has no gate`).toBeGreaterThan(0);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(STORY.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of STORY.characters) {
      for (const b of STORY.characters) {
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
    ];
    for (const [label, pattern] of MOVES) {
      const users = STORY.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => STORY.characters.find((c) => c.id === id)!.voiceSamples.join(' | ').toLowerCase();
    expect(sample('mok')).toMatch(/that’s one|servant/);
    expect(sample('pyo')).toMatch(/eat|salt/);
    expect(sample('seo_ah')).toMatch(/feet|flinch/);
    expect(sample('gong')).toMatch(/young friend/);
    expect(sample('seol_hwa')).not.toMatch(/’(?:s|t|ll|re|ve|d|m)\b/);
  });

  it('gives no two characters the same short name', () => {
    const names = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses expressions the generator draws', () => {
    for (const c of STORY.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
  });
});

describe('the truce can genuinely fail', () => {
  it('lets the war come back because nobody did anything', () => {
    // The trap springs on a timer. The only thing the losing route needs is
    // that the timer went off, so the bad outcome is reachable by inaction.
    const letIt = routes.find(({ route }) => route.routeId === 'let_it_happen')!.route;
    expect(letIt.predicate.flagsSet).toEqual(['trap_sprung']);
    expect(letIt.predicate.minRelationship).toEqual([]);
    expect(letIt.predicate.hasItems).toEqual([]);
    const signing = STORY.worldEvents.find((e) => e.id === 'we_the_signing')!;
    expect(signing.setsFlags).toContain('trap_sprung');
    expect(signing.requiresFlags).toEqual([]);
    expect(signing.atWorldMinute).toBe(3 * 1440 + 12 * 60);
  });

  it('lets every way of stopping the trap cancel it', () => {
    const signing = STORY.worldEvents.find((e) => e.id === 'we_the_signing')!;
    const stops = routes.filter(({ step }) => step === 'the_signing').map(({ route }) => route);
    for (const route of stops) {
      if (route.routeId === 'let_it_happen') continue;
      expect(
        route.setsFlags.some((f) => signing.cancelledByFlags.includes(f)),
        `${route.routeId} does not stop the signing`,
      ).toBe(true);
    }
  });

  it('brings the delegation on the third evening', () => {
    const arrival = STORY.worldEvents.find((e) => e.id === 'we_delegation_arrives')!;
    expect(arrival.atWorldMinute).toBe(2 * 1440 + 18 * 60);
    expect(arrival.movesCharacters.map((m) => m.characterId)).toContain('seol_hwa');
  });

  it('lets somebody walk down the mountain, and reaches that early', () => {
    const walk = STORY.endings.find((e) => e.id === 'end_down_the_mountain')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('keeps most endings open to a player who never says their name in public', () => {
    const quiet = STORY.endings.filter((e) => !e.requires.flagsSet.includes('gravekeeper_returned'));
    expect(quiet.length).toBeGreaterThanOrEqual(8);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    expect(STORY.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(STORY.resources.length).toBe(3);
    for (const r of STORY.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one thing rest can restore', () => {
    const high = STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['breath']);
  });

  it('makes a public fight cost suspicion and standing with the sect', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW in array order and lowers the
    // first faction.
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(STORY.factions[0]?.id).toBe('faction_silver_pine');
  });

  it('drives every descending variable with some ability cost', () => {
    for (const r of STORY.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(STORY.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('gives every faction a rung above where it starts', () => {
    for (const f of STORY.factions) {
      expect(f.ranks.some((rank) => rank.atReputation > f.startingReputation), f.id).toBe(true);
    }
  });
});

describe('structure, as the catalog and director specs would check it', () => {
  it('has more than one way through, and closes something somewhere', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
      ...STORY.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const obtainable = new Set([
      ...STORY.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...STORY.rules.startingItems.map((i) => i.itemId),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
      ...STORY.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice('used:'.length)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) {
        expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      const demanded = [
        ...(step.succeedWhen?.hasItems ?? []),
        ...step.succeedWhenAny.flatMap((r) => r.predicate.hasItems),
      ];
      for (const itemId of demanded) expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
    }
  });

  it('points only at things that exist', () => {
    const locIds = new Set(STORY.locations.map((l) => l.id));
    const itemIds = new Set(STORY.items.map((i) => i.id));
    const charIds = new Set(STORY.characters.map((c) => c.id));
    const abIds = new Set(STORY.abilities.map((a) => a.id));
    const facIds = new Set(STORY.factions.map((f) => f.id));
    const resIds = new Set(STORY.resources.map((r) => r.id));
    const skillIds = new Set(STORY.skills.map((s) => s.id));
    const broken: string[] = [];

    for (const l of STORY.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} item owned by ${t.ownerId}`);
      }
    }
    for (const c of STORY.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of STORY.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of STORY.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of STORY.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of STORY.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(STORY.rules.startingLocationId)) broken.push(`start ${STORY.rules.startingLocationId}`);
    for (const e of STORY.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of STORY.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} needs ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
    }
    for (const q of STORY.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} rewards ${r}`);
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
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates on a flag nothing can set', () => {
    // The director spec's strict version: a flag read anywhere has to be
    // written by a route, a step reward, a world event, or the engine itself.
    // `knows:` is not an engine prefix, so every `knows:` flag read here is
    // one this world sets on purpose.
    const ENGINE_PREFIXES = [
      'met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:',
      'cooldown:', 'route:', 'closed:', 'played:', 'beat:', 'lost_to:',
    ];
    const ENGINE_FLAGS = ['left_the_map'];
    const producible = new Set<string>();
    for (const q of STORY.quests) {
      for (const st of q.steps) {
        for (const f of st.rewards.flags) producible.add(f);
        for (const r of st.succeedWhenAny) for (const f of r.setsFlags) producible.add(f);
      }
    }
    for (const e of STORY.worldEvents) for (const f of e.setsFlags) producible.add(f);
    for (const c of STORY.characters) {
      for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) producible.add(f);
    }

    const orphans: string[] = [];
    const check = (flags: readonly string[], where: string): void => {
      for (const flag of flags) {
        if (ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p))) continue;
        if (!producible.has(flag)) orphans.push(`${flag} (${where})`);
      }
    };
    for (const q of STORY.quests) {
      if (q.discoverWhen) check(q.discoverWhen.flagsSet, `${q.id}.discoverWhen`);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(p.flagsSet, `${q.id}/${st.id}`);
        for (const r of st.succeedWhenAny) check(r.predicate.flagsSet, `${q.id}/${st.id}/${r.routeId}`);
      }
    }
    for (const c of STORY.characters) for (const g of c.gates) check(g.requires.flagsSet, `${c.id}/${g.id}`);
    for (const e of STORY.worldEvents) check([...e.requiresFlags, ...e.cancelledByFlags], e.id);
    for (const e of STORY.endings) check([...e.requires.flagsSet, ...e.requires.flagsUnset], e.id);
    for (const a of STORY.abilities) check(a.requires.flagsSet, a.id);
    for (const l of STORY.locations) {
      for (const c of l.connections) if (c.lockedByFlag) check([c.lockedByFlag], `${l.id}->${c.to}`);
    }
    expect(orphans, orphans.join('\n')).toEqual([]);
  });

  it('never gates on standing nothing can earn', () => {
    const ceiling = new Map(STORY.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of STORY.archetypes) {
      for (const entry of archetype.startingReputation) {
        const floor = STORY.factions.find((f) => f.id === entry.factionId)?.startingReputation ?? 0;
        ceiling.set(entry.factionId, Math.max(ceiling.get(entry.factionId) ?? 0, floor + entry.amount));
      }
    }
    for (const q of STORY.quests) {
      for (const st of q.steps) {
        for (const gain of st.rewards.reputation) {
          ceiling.set(gain.factionId, (ceiling.get(gain.factionId) ?? 0) + Math.max(0, gain.amount));
        }
      }
    }
    const gates = [
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
      ...STORY.endings.flatMap((e) => e.requires.minFactionReputation),
    ];
    for (const gate of gates) {
      expect(ceiling.get(gate.factionId) ?? 0, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('shares no item alias between two items', () => {
    const owner = new Map<string, string>();
    for (const l of STORY.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.toLowerCase();
          const prior = owner.get(key);
          expect(prior === undefined || prior === t.itemId, `"${alias}" names ${prior} and ${t.itemId}`).toBe(true);
          owner.set(key, t.itemId);
        }
      }
    }
  });
});

describe('the copy clears the content bar', () => {
  it('keeps the store copy inside its windows', () => {
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
    const paragraphs = STORY.premise.split('\n\n');
    expect(words(STORY.premise)).toBeGreaterThanOrEqual(100);
    expect(words(STORY.premise)).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p), p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(STORY.promises.length).toBeGreaterThanOrEqual(3);
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
    expect(STORY.rules.startingItems.length).toBeGreaterThan(0);
    expect(STORY.rules.hardCanon.length).toBeGreaterThan(0);
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [STORY.premise, STORY.opening, STORY.hook, ...STORY.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });

  it('writes card blurbs that are about the player, not a restated role', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
      expect(c.cardBlurb, c.id).toMatch(/\byou\b|\byour\b/i);
    }
  });

  it('gives every ending a real condition and a real epilogue', () => {
    for (const e of STORY.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('passes the choice-screen clarity check', () => {
    const errors = checkStoryChoiceClarity(STORY).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const archetypeField = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(archetypeField.helpText.length).toBeGreaterThan(60);
    expect(archetypeField.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });

  it('passes the narrative clarity check', () => {
    const errors = checkStoryClarity(STORY).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('keeps the protagonist blank, so the name is the player’s', () => {
    expect(STORY.protagonist.kind).toBe('BLANK');
  });
});

describe('assets', () => {
  it('derives every art key under the story’s own prefix', () => {
    const prefix = 'story_the_cult_master_wakes_as_a_servant';
    expect(STORY.storyId).toBe(prefix);
    expect(STORY.id).toBe('sv_the_cult_master_wakes_as_a_servant_1');
    // No art exists yet, so nothing names a panel that would 404, and the
    // drop sets the publish date.
    expect(STORY.openingPanel ?? null).toBeNull();
    expect(STORY.publishedAt).toBeNull();
    const derived = withDerivedAssetKeys(STORY);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(String(key)).toMatch(new RegExp(`^${prefix}/`));
  });
});

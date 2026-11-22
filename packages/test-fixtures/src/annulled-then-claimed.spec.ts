import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { ANNULLED_THEN_CLAIMED as RAW } from './annulled-then-claimed.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Annulled, Then Claimed, held to the rules every new world in this batch
 * signs up to, and to the two things this one is most exposed to.
 *
 * The first is the opener. The whole store promise is one sentence said from
 * the back of a ballroom, so turn one has to be that sentence, a named person
 * saying it to the player, and a question that cannot wait. A version of this
 * world where the duke turns up on turn four is a different, worse story.
 *
 * The second is that "claimed" must never mean "taken". Every man in this
 * world who wants the player can be refused, the refusal is an authored route
 * that later content reads, and the nine days can run out on their own without
 * the player doing anything wrong.
 *
 * Not registered in index.ts on purpose: this file imports the fixture
 * directly, and the catalog-wide checks are copied below so the world is held
 * to them before it is added to the catalog.
 */

const STORY = withDerivedAssetKeys(RAW);

const start = (archetypeId = 'arch_tongue') =>
  createInitialState({
    sessionId: 'sess_atc',
    story: STORY,
    identity: {
      displayName: 'Celestine Mereval',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

/** Every flag a step, route or world event in this world can produce. */
function settable(): Set<string> {
  const flags = new Set<string>();
  for (const quest of STORY.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of STORY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  for (const c of STORY.characters) {
    for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) flags.add(f);
  }
  return flags;
}

const ENGINE_PREFIXES = [
  'met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:',
  'cooldown:', 'route:', 'closed:', 'played:', 'beat:', 'lost_to:',
];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

/** Everything a player or the storyteller reads, as one list of labelled strings. */
function playerFacingText(): Array<[string, string]> {
  const out: Array<[string, string]> = [
    ['title', STORY.title],
    ['fantasyLabel', STORY.fantasyLabel],
    ['hook', STORY.hook],
    ['premise', STORY.premise],
    ['creatorNote', STORY.creatorNote ?? ''],
    ['opening', STORY.opening],
    ['openingPanel.alt', STORY.openingPanel?.alt ?? ''],
    ['toneGuide', STORY.rules.toneGuide],
    ...STORY.rules.hardCanon.map((t, i): [string, string] => [`hardCanon[${i}]`, t]),
    ...STORY.rules.styleExamples.map((t, i): [string, string] => [`styleExamples[${i}]`, t]),
    ...STORY.openingSuggestions.map((t, i): [string, string] => [`suggestion[${i}]`, t]),
    ...STORY.mechanicsChips.map((t, i): [string, string] => [`chip[${i}]`, t]),
  ];
  for (const c of STORY.characters) {
    out.push(
      [`${c.id}.role`, c.role],
      [`${c.id}.cardBlurb`, c.cardBlurb],
      [`${c.id}.appearance`, c.appearance],
      [`${c.id}.speechStyle`, c.speechStyle],
      [`${c.id}.socialStyle`, c.socialStyle],
      [`${c.id}.visualHook`, c.visualHook],
      [`${c.id}.silhouette`, c.silhouette],
      ...c.voiceSamples.map((t, i): [string, string] => [`${c.id}.voice[${i}]`, t]),
      ...c.hiddenDrives.map((t, i): [string, string] => [`${c.id}.drive[${i}]`, t]),
      ...c.secrets.map((s): [string, string] => [`${c.id}.${s.id}`, `${s.fact} ${s.revealHint}`]),
      ...c.publicTraits.map((t, i): [string, string] => [`${c.id}.trait[${i}]`, t]),
    );
  }
  for (const l of STORY.locations) out.push([`${l.id}`, `${l.name} ${l.description} ${l.artDirection}`]);
  for (const i of STORY.items) out.push([`${i.id}`, `${i.name} ${i.description} ${i.loreText}`]);
  for (const a of STORY.abilities) out.push([`${a.id}`, `${a.name} ${a.description} ${a.requires?.lockedCopy ?? ''}`]);
  for (const q of STORY.quests) {
    out.push([q.id, `${q.title} ${q.summary} ${q.knownRewardCopy}`]);
    for (const s of q.steps) {
      out.push([`${q.id}/${s.id}`, `${s.playerCopy} ${s.directorNotes}`]);
      for (const r of s.succeedWhenAny) out.push([`${q.id}/${s.id}/${r.routeId}`, r.label]);
    }
  }
  for (const e of STORY.worldEvents) out.push([e.id, `${e.publicCopy} ${e.directorNotes}`]);
  for (const e of STORY.endings) out.push([e.id, `${e.name} ${e.condition} ${e.epilogue} ${e.hint}`]);
  for (const p of STORY.promises) out.push([p.id, `${p.label} ${p.seedHint} ${p.payoffHint}`]);
  for (const a of STORY.archetypes) out.push([a.id, `${a.name} ${a.role} ${a.summary} ${a.blurb}`]);
  for (const f of STORY.setupFields) out.push([f.id, `${f.label} ${f.helpText ?? ''} ${f.placeholder ?? ''}`]);
  for (const r of STORY.resources) {
    out.push([r.id, `${r.zeroStateConsequence} ${r.bands.map((b) => b.behaviour).join(' ')}`]);
  }
  for (const f of STORY.factions) out.push([f.id, `${f.name} ${f.description} ${f.ranks.map((r) => r.label).join(' ')}`]);
  return out;
}

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', STORY.premise],
      ['opening', STORY.opening],
      ['hook', STORY.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const suggestion of STORY.openingSuggestions) expect(suggestion).not.toContain('\\n');
  });

  it('is written in English and nothing else', () => {
    // Typographic punctuation is allowed; letters outside ASCII are not.
    for (const [field, text] of playerFacingText()) {
      const stripped = text.replace(/[’‘“”—–…]/g, '');
      expect(/^[\x09\x0A\x0D\x20-\x7E]*$/.test(stripped), `${field} has non-English characters`).toBe(true);
    }
  });
});

describe('the opener is the famous moment, and it asks', () => {
  const opening = STORY.opening;

  it('stays between fifty and a hundred and twenty words', () => {
    expect(words(opening)).toBeGreaterThanOrEqual(50);
    expect(words(opening)).toBeLessThanOrEqual(120);
  });

  it('has a named character speak to the player inside the first sixty words', () => {
    const first60 = opening.split(/\s+/).slice(0, 60).join(' ');
    expect(first60).toMatch(/["“]/);
    const named = STORY.characters.filter((c) => first60.includes(calledName(c)));
    expect(named.length, 'nobody with a name speaks early').toBeGreaterThan(0);
    expect(first60).toMatch(/\byou\b/i);
  });

  it('ends on a question that has to be answered now', () => {
    expect(opening.trim()).toMatch(/\?["”]?$/);
    // And the person asking is in the room on turn one.
    expect(opening).toContain('Kassian');
  });

  it('names nobody the player has to know already', () => {
    // Every capitalised word that is not the start of a sentence or a quote
    // has to be introduced in the opener itself.
    // "Butcher" is introduced as a name the court uses, and hardCanon says why.
    const introduced = new Set(['Prince', 'Edmund', 'Grand', 'Duke', 'Kassian', 'Vahl', 'Butcher', 'I', 'I’ll']);
    const tokens = opening.split(/\s+/);
    const unknown: string[] = [];
    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i]!.replace(/^["“(]+/, '');
      const word = token.replace(/[^A-Za-z’']+$/g, '');
      if (!/^[A-Z]/.test(word)) continue;
      const prev = tokens[i - 1]!;
      const sentenceStart = /[.!?:]["”]?$/.test(prev) || /^["“]/.test(tokens[i]!);
      if (sentenceStart) continue;
      if (!introduced.has(word)) unknown.push(word);
    }
    expect(unknown, 'proper nouns the player is assumed to know').toEqual([]);
  });

  it('offers one thing said, one thing done and one thing risky', () => {
    const [said, done, risky] = STORY.openingSuggestions;
    expect(STORY.openingSuggestions.length).toBe(3);
    expect(said, 'the first card is not dialogue').toMatch(/^["“]/);
    expect(done, 'the second card is not an action').toMatch(/^I\b/);
    expect(risky, 'the third card is not an action').toMatch(/^I\b/);
    // The risky one does something the court will talk about.
    expect(risky!.toLowerCase()).toMatch(/ring|wine|prince/);
    expect(new Set(STORY.openingSuggestions).size).toBe(3);
    for (const s of STORY.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of STORY.openingSuggestions) {
      const intent = await parser.parse(card, { story: STORY, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('puts the duke, the prince and the woman on his arm in the ballroom on turn one', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['kassian', 'edmund', 'rosalind', 'osric']));
  });

  it('keeps everybody else where their schedule says, not on the player', () => {
    const elsewhere = ['bette', 'signe', 'crane'];
    for (const c of STORY.characters) {
      const placed = locationForSchedule(c.schedule, STORY.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (elsewhere.includes(c.id)) expect(placed, c.id).not.toBe(STORY.rules.startingLocationId);
    }
  });

  it('gives the duke an answer that is due before the ball ends', () => {
    const [obligation] = STORY.openingObligations;
    expect(obligation?.withCharacterId).toBe('kassian');
    expect(STORY.rules.startWorldMinute + obligation!.dueInMinutes).toBeLessThanOrEqual(1440);
  });
});

describe('everybody is an adult, and the bible says how old', () => {
  const UNITS: Record<string, number> = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  };
  const TENS: Record<string, number> = {
    twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80,
  };
  const TEENS: Record<string, number> = {
    eighteen: 18, nineteen: 19,
  };
  const ageOf = (appearance: string): number | null => {
    const lead = appearance.trim().split(/[,\s]/)[0]!.toLowerCase();
    if (TEENS[lead]) return TEENS[lead]!;
    const [tens, unit] = lead.split('-');
    if (!tens || TENS[tens] === undefined) return null;
    return TENS[tens]! + (unit ? (UNITS[unit] ?? NaN) : 0);
  };

  it('opens every appearance with an age of eighteen or more', () => {
    for (const c of STORY.characters) {
      const age = ageOf(c.appearance);
      expect(age, `${c.id} has no stated age`).not.toBeNull();
      expect(age!, c.id).toBeGreaterThanOrEqual(18);
    }
  });

  it('states the player’s age in canon', () => {
    expect(STORY.rules.hardCanon.join(' ').toLowerCase()).toContain('twenty-four');
  });

  it('never uses a word that reads as a minor', () => {
    const MINOR = /\b(girl|girls|boy|boys|child|children|childlike|childish|kid|kids|teen|teens|teenage|teenager|minor|underage|schoolgirl|schoolboy|little sister|little brother)\b/i;
    for (const [field, text] of playerFacingText()) expect(text, field).not.toMatch(MINOR);
  });
});

describe('thirteen-plus, and original', () => {
  it('keeps the romance at a kiss and the violence off the page', () => {
    const DENY = /\b(naked|nude|nudity|undress\w*|lingerie|sex|sexual|sexy|bedded|seduc\w*|gore|gory|disembowel\w*|self-harm|suicide|suicidal|torture\w*)\b/i;
    for (const [field, text] of playerFacingText()) expect(text, field).not.toMatch(DENY);
    expect(STORY.rules.toneGuide).toMatch(/kiss/);
    expect(STORY.intensity).toBe('LIGHT');
  });

  it('uses no franchise vocabulary', () => {
    const FRANCHISE = /\b(quirk|quirks|nen|chakra|hokage|hunter association|system window|status window|jutsu|devil fruit|hogwarts)\b/i;
    for (const [field, text] of playerFacingText()) expect(text, field).not.toMatch(FRANCHISE);
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere a player can reach', () => {
    const granted = new Set([
      ...STORY.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const flags = settable();
    for (const ability of STORY.abilities) {
      const gated = !ability.unlockedByDefault || (ability.requires?.flagsSet.length ?? 0) > 0;
      if (!gated) continue;
      expect(granted.has(ability.id), `${ability.id} is gated and nothing grants it`).toBe(true);
      if (!ability.unlockedByDefault) {
        const rewarded = STORY.quests.some((q) => q.steps.some((s) => s.rewards.abilities.includes(ability.id)));
        expect(rewarded, `${ability.id} starts locked and no step reward unlocks it`).toBe(true);
      }
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(flags.has(flag) || engineSets(flag), `${ability.id} waits on "${flag}", which nothing sets`).toBe(true);
      }
      expect(ability.requires?.lockedCopy ?? '', ability.id).not.toMatch(/flag|predicate|locked|requirement/i);
    }
  });

  it('puts "you" in every card blurb', () => {
    for (const c of STORY.characters) expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
  });

  it('gives every location an inbound edge', () => {
    for (const l of STORY.locations) {
      const inbound = STORY.locations.some((o) => o.id !== l.id && o.connections.some((c) => c.to === l.id));
      expect(inbound, `${l.id} has no way in`).toBe(true);
    }
  });
});

describe('the catalog checks, held here before it joins the catalog', () => {
  const steps = STORY.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
  const routes = steps.flatMap(({ quest, step }) => step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })));

  it('meets the content bar', () => {
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(words(STORY.opening)).toBeGreaterThanOrEqual(50);
    expect(words(STORY.opening)).toBeLessThanOrEqual(150);
    expect(words(STORY.premise)).toBeGreaterThanOrEqual(120);
    expect(words(STORY.premise)).toBeLessThanOrEqual(250);
    const paragraphs = STORY.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p), p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(STORY.promises.length).toBe(5);
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
  });

  it('passes the narrative and choice clarity checkers', async () => {
    const { checkStoryClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const clarity = checkStoryClarity(STORY);
    expect(
      clarity.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`),
    ).toEqual([]);
    const choice = checkStoryChoiceClarity(STORY);
    expect(
      choice.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`),
    ).toEqual([]);
  });

  it('explains the archetype choice as fixed', () => {
    const field = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText?.length ?? 0).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/);
    const tagSets = STORY.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('has more than one way through, and closes doors', () => {
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
        expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const itemId of step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)) {
        expect(granted.has(itemId), `${quest}/${step.id} demands ${itemId}`).toBe(false);
      }
    }
  });

  it('gives every archetype something and leaves things worth taking', () => {
    for (const a of STORY.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length + Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length + a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
    }
    const takeable = STORY.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    for (const entry of takeable) {
      expect(STORY.items.some((i) => i.id === entry.itemId), entry.itemId).toBe(true);
      if (entry.ownerId) expect(STORY.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
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
    for (const l of STORY.locations) for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
    for (const c of STORY.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of STORY.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check && !skillIds.has(a.check.skillId ?? '')) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of STORY.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of STORY.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} -> ${x}`);
    for (const e of STORY.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of STORY.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
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
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const flags = settable();
    const dead: string[] = [];
    const check = (where: string, flag: string) => {
      if (!flags.has(flag) && !engineSets(flag)) dead.push(`${where} needs ${flag}`);
    };
    for (const e of STORY.endings) for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) check(e.id, f);
    for (const c of STORY.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) check(`${c.id}/${g.id}`, f);
    for (const l of STORY.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, c.lockedByFlag);
    for (const e of STORY.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) check(e.id, f);
    for (const q of STORY.quests) {
      if (q.discoverWhen) for (const f of q.discoverWhen.flagsSet) check(q.id, f);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) for (const f of p.flagsSet) check(st.id, f);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) check(`${st.id}/${r.routeId}`, f);
      }
    }
    expect(dead).toEqual([]);
  });

  it('never drops a character into the opening by fallback', () => {
    const minute = ((STORY.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = STORY.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('can be walked to from where it starts', () => {
    const reachable = new Set([STORY.rules.startingLocationId]);
    for (const l of STORY.locations) for (const c of l.connections) reachable.add(c.to);
    for (const l of STORY.locations) expect(reachable.has(l.id), l.id).toBe(true);
  });

  it('says what every ability does in one plain line', () => {
    for (const a of STORY.abilities) {
      const line = abilityEffect(STORY, a);
      expect(line.length, `${a.id}: ${line}`).toBeLessThan(120);
      expect(line, a.id).toMatch(/rolls |always works/);
      expect(line, a.id).toContain('costs ');
    }
  });

  it('uses expressions the generator draws and names nobody twice', () => {
    const unknown = STORY.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
    const names = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('derives every asset key under its own prefix', () => {
    expect(STORY.id).toBe('sv_annulled_then_claimed_1');
    expect(STORY.storyId).toBe('story_annulled_then_claimed');
    expect(STORY.openingPanel?.assetKey).toBe('story_annulled_then_claimed/opening');
    for (const key of [STORY.coverImage, STORY.keyArt, ...STORY.characters.map((c) => c.portrait)]) {
      if (key) expect(key).toMatch(/^story_annulled_then_claimed\//);
    }
  });
});

describe('claimed never means taken', () => {
  it('makes refusing the duke a route that later content reads', () => {
    const step = STORY.quests.find((q) => q.id === 'q_ill_take_her')!.steps[0]!;
    const no = step.succeedWhenAny.find((r) => r.routeId === 'refused_him')!;
    expect(no, 'there is no way to say no').toBeDefined();
    expect(no.setsFlags).toContain('refused_him');
    expect(no.predicate.hasItems).toEqual([]);
    expect(no.predicate.minRelationship).toEqual([]);
    const later = routes().filter((r) => r.predicate.flagsSet.includes('refused_him'));
    expect(later.length, 'refusing dead-ends the story').toBeGreaterThanOrEqual(1);
    // And a refusal at the ball can become a refusal for good, with its own ending.
    expect(routes().some((r) => r.setsFlags.includes('refused_for_good'))).toBe(true);
    expect(STORY.endings.some((e) => e.requires.flagsSet.includes('refused_for_good'))).toBe(true);
  });

  it('never marries anybody without both signatures in person', () => {
    const signing = STORY.quests.find((q) => q.id === 'q_nine_days')!.steps.find((s) => s.id === 'the_signing')!;
    for (const r of signing.succeedWhenAny) {
      expect(r.predicate.atLocation, r.routeId).toMatch(/^(the_chancery|vahlhold)$/);
      expect(r.predicate.flagsSet, r.routeId).toContain('contract_signed');
    }
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/sign the register in person/);
  });

  it('lets the prince be refused too', () => {
    expect(STORY.endings.some((e) => e.requires.flagsSet.includes('refused_edmund'))).toBe(true);
  });

  function routes() {
    return STORY.quests.flatMap((q) => q.steps).flatMap((s) => s.succeedWhenAny);
  }
});

describe('nine days run out on their own', () => {
  it('lets the steward be stopped by marrying, by exposing the loan, or by leaving', () => {
    const steward = STORY.worldEvents.find((e) => e.id === 'we_the_steward_named')!;
    expect(steward.atWorldMinute).toBe(9 * 1440 + 12 * 60);
    expect(steward.cancelledByFlags).toEqual(expect.arrayContaining(['married_the_duke', 'the_loan_exposed', 'left_the_map']));
  });

  it('gives every scheduled pressure an off switch something sets', () => {
    const flags = settable();
    for (const id of ['we_the_steward_named', 'we_father_sends_you_south']) {
      const event = STORY.worldEvents.find((e) => e.id === id)!;
      expect(event.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const f of event.cancelledByFlags) expect(flags.has(f) || engineSets(f), `${id}: ${f}`).toBe(true);
    }
  });

  it('offers losses reachable without a mistake', () => {
    for (const id of ['end_the_steward', 'end_sent_south']) {
      const ending = STORY.endings.find((e) => e.id === id)!;
      expect(ending.requires.minRelationship, id).toEqual([]);
      expect(ending.requires.hasItems, id).toEqual([]);
      expect(ending.requires.minFactionReputation, id).toEqual([]);
    }
  });

  it('lets somebody simply leave, and early', () => {
    const walk = STORY.endings.find((e) => e.id === 'end_gone_before_breakfast')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBe(4);
  });
});

describe('reputation ladders are climbable', () => {
  it('never gates on standing nothing can earn', () => {
    const earned = new Map(STORY.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of STORY.archetypes) {
      for (const entry of archetype.startingReputation) {
        const base = STORY.factions.find((f) => f.id === entry.factionId)!.startingReputation;
        earned.set(entry.factionId, Math.max(earned.get(entry.factionId)!, base + entry.amount));
      }
    }
    for (const q of STORY.quests) {
      for (const s of q.steps) {
        for (const entry of s.rewards.reputation) {
          if (entry.amount > 0) earned.set(entry.factionId, (earned.get(entry.factionId) ?? 0) + entry.amount);
        }
      }
    }
    const gates = [
      ...STORY.endings.flatMap((e) => e.requires.minFactionReputation),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation))),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) {
      expect(earned.get(gate.factionId) ?? -100, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const f of STORY.factions) {
      expect(f.ranks.length, f.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
  });

  it('sends a fight at a palace ball to the court and the broadsheet', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction and raises the FIRST GOOD_LOW.
    expect(STORY.factions[0]?.id).toBe('faction_court');
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scandal');
  });
});

describe('the state stays underneath the prose', () => {
  it('keeps three invisible banded variables', () => {
    expect(STORY.resources.length).toBe(3);
    for (const r of STORY.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo}`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of STORY.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      expect(STORY.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });
});

describe('seven people, seven mouths', () => {
  const content = (text: string): Set<string> =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(STORY.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of STORY.characters) {
      for (const b of STORY.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}%`).toBeLessThan(0.3);
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
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared voice in the samples the writer gets', () => {
    const sample = (id: string) => STORY.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    expect(sample('kassian').toLowerCase()).toMatch(/nine days|ask twice/);
    expect(sample('edmund')).toMatch(/\bWe\b/);
    expect(sample('rosalind')).toMatch(/isn’t it\?/);
    expect(sample('osric').toLowerCase()).toContain('the house');
    expect(sample('bette').toLowerCase()).toMatch(/pin|below stairs/);
    expect(sample('signe').toLowerCase()).toMatch(/frost take it|miles/);
    expect(sample('crane').toLowerCase()).toMatch(/my dear|collateral/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of STORY.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.gates.length, c.id).toBeGreaterThan(0);
      for (const s of c.secrets) expect(s.revealHint.length, `${c.id}/${s.id}`).toBeGreaterThan(10);
    }
  });
});

describe('the store card keeps the mystery', () => {
  it('does not answer its own questions on the card', () => {
    const premise = STORY.premise.toLowerCase();
    for (const spoiler of ['grain', 'wagons', 'writ', 'steward', 'loan', 'scissors', 'three days before']) {
      expect(premise, spoiler).not.toContain(spoiler);
    }
  });

  it('keeps the grain thread optional', () => {
    const lead = STORY.quests.find((q) => q.id === 'q_forty_wagons')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_deadline']);
  });
});

import { describe, expect, it } from 'vitest';
import {
  abilityEffect,
  archetypeGrants,
  calledName,
  knownExpression,
} from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import {
  RuleBasedIntentParser,
  checkNarrativeClarity,
  checkStoryChoiceClarity,
  checkStoryClarity,
  runTurn,
  worldBrief,
} from '@plotbreak/director';
import { RANK_ZERO } from './rank-zero.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Rank Zero, held to the slate's binding rules and to every structural bar the
 * launch catalogue is held to.
 *
 * It is not registered in `LAUNCH_CATALOG` yet, so none of the catalogue-wide
 * specs see it. This file runs the same checks against it directly, so the
 * world arrives at registration already clean.
 */

const story = RANK_ZERO;

const start = (archetypeId: string | null = 'arch_exam') =>
  createInitialState({
    sessionId: 'sess_rank_zero',
    story,
    identity: {
      displayName: 'Jun Ferreira',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Everything a player or the storyteller ever reads, as one list. */
const visibleText = (): string[] => [
  story.title,
  story.fantasyLabel,
  story.hook,
  story.premise,
  story.creatorNote,
  story.opening,
  story.openingPanel?.alt ?? '',
  ...story.openingSuggestions,
  ...story.mechanicsChips,
  ...story.rules.hardCanon,
  story.rules.toneGuide,
  ...story.rules.styleExamples,
  ...story.characters.flatMap((c) => [
    c.name,
    c.role,
    c.cardBlurb,
    c.appearance,
    c.visualHook,
    c.silhouette,
    c.speechStyle,
    c.socialStyle,
    ...c.voiceSamples,
    ...c.publicTraits,
    ...c.hiddenDrives,
    ...c.values,
    ...c.fears,
    ...c.boundaries,
    ...c.goals,
    ...c.secrets.flatMap((s) => [s.fact, s.revealHint]),
    ...c.schedule.map((b) => b.activity),
  ]),
  ...story.locations.flatMap((l) => [l.name, l.description, l.artDirection]),
  ...story.items.flatMap((i) => [i.name, i.description, i.loreText]),
  ...story.abilities.flatMap((a) => [a.name, a.description, a.requires?.lockedCopy ?? '']),
  ...story.factions.flatMap((f) => [f.name, f.description, ...f.ranks.map((r) => r.label)]),
  ...story.quests.flatMap((q) => [
    q.title,
    q.summary,
    q.knownRewardCopy,
    ...q.steps.flatMap((s) => [s.playerCopy, s.directorNotes, ...s.succeedWhenAny.map((r) => r.label)]),
  ]),
  ...story.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
  ...story.promises.flatMap((p) => [p.label, p.seedHint, p.payoffHint]),
  ...story.archetypes.flatMap((a) => [a.name, a.role, a.summary, a.blurb, ...a.playstyle]),
  ...story.setupFields.flatMap((f) => [f.label, f.helpText ?? '', f.placeholder ?? '']),
  ...story.endings.flatMap((e) => [e.name, e.condition, e.epilogue, e.hint]),
];

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [story.premise, story.opening, story.hook, ...story.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });

  it('is written in English only', () => {
    const foreign = visibleText().filter((t) => /[^\x00-\x7F‘’“”—–·…]/.test(t));
    expect(foreign).toEqual([]);
  });
});

describe('rule 1: the opener', () => {
  const opening = story.opening;

  it('is at most 120 words, and inside the catalogue’s 50–150 bar', () => {
    expect(words(opening)).toBeGreaterThanOrEqual(50);
    expect(words(opening)).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking within the first 60 words', () => {
    const first60 = opening.split(/\s+/).slice(0, 60).join(' ');
    expect(first60).toMatch(/[“"]/);
    expect(first60).toContain('says Riku Amano');
  });

  it('ends on a direct demand from a named character', () => {
    const lastQuote = opening.trim().match(/[“"]([^“"”]+)[”"]\s*$/)?.[1] ?? '';
    const lastSentence = lastQuote.trim().split(/(?<=[.!?])\s+/).pop() ?? '';
    expect(lastSentence.endsWith('?') || /^(Explain|Tell|Show|Answer|Give|Say)\b/.test(lastSentence)).toBe(true);
    const speakerLine = opening.trim().split(/\n\s*\n/).pop() ?? '';
    expect(speakerLine).toContain('Instructor Valk');
  });

  it('asks the player to know no proper noun the opening does not introduce', () => {
    const unintroduced = [
      'Lodestar', 'Gull Island', 'Calder', 'Gauge', 'Bureau', 'Trial Day', 'the Board',
      'Atrium', 'Bowl', 'Mei', 'Calla', 'Hale', 'Halvorsen', 'Ada', 'Kole',
      ...story.factions.map((f) => f.name),
      ...story.locations.map((l) => l.name),
    ];
    for (const term of unintroduced) expect(opening, term).not.toContain(term);
    // The two cast members it names arrive with what they are, in the same breath.
    expect(opening).toMatch(/Riku Amano, top name on the ranking board/);
    expect(opening).toMatch(/grey instructor’s coat[\s\S]*Instructor Valk/);
  });

  it('offers three cards: one said, one done, one risky', () => {
    const cards = story.openingSuggestions;
    expect(cards).toHaveLength(3);
    const said = cards.filter((c) => /^[“"]/.test(c));
    const done = cards.filter((c) => !/[“"”]/.test(c));
    expect(said, 'one card is pure dialogue').toHaveLength(1);
    expect(done, 'one card is pure action').toHaveLength(1);
    const risky = cards.find((c) => !said.includes(c) && !done.includes(c))!;
    expect(risky).toMatch(/burning column/);
  });

  it('demonstrates both openers’ voices in their own samples', () => {
    const valk = story.characters.find((c) => c.id === 'valk')!;
    const riku = story.characters.find((c) => c.id === 'riku')!;
    const line = 'Eleven thousand cadets on that machine. Not one fire. Explain this one.';
    expect(opening).toContain(line);
    expect(valk.voiceSamples.some((v) => v.includes(line))).toBe(true);
    expect(opening).toContain('Support track');
    expect(riku.voiceSamples.some((v) => v.includes('Support track'))).toBe(true);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });
});

describe('rule 2: adults only', () => {
  const NUMBER: Record<string, number> = {
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  };
  const ageOf = (appearance: string): number => {
    const head = appearance.split(',')[0]!.trim().toLowerCase();
    return head.split('-').reduce((sum, part) => sum + (NUMBER[part] ?? Number.NaN), 0);
  };

  it('states every character’s age, and every one is at least eighteen', () => {
    for (const c of story.characters) {
      const age = ageOf(c.appearance);
      expect(Number.isFinite(age), `${c.id}: "${c.appearance}"`).toBe(true);
      expect(age, c.id).toBeGreaterThanOrEqual(18);
    }
  });

  it('pins the ages the bible states', () => {
    const ages = Object.fromEntries(story.characters.map((c) => [c.id, ageOf(c.appearance)]));
    expect(ages).toEqual({ valk: 41, riku: 20, mei: 19, calla: 21, hale: 58, halvorsen: 34, ada: 38 });
  });

  it('says in canon that the academy is post-secondary and the player is an adult', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/college/i);
    expect(canon).toMatch(/at least eighteen/i);
    expect(canon).toMatch(/nineteen-year-old/i);
  });

  it('never uses a word that reads a character as a minor', () => {
    const MINOR = /\b(kids?|boys?|girls?|child|children|childhood|teens?|teenage|teenagers?|minors?|schoolboy|schoolgirl|underage|high school|middle school)\b/i;
    const hits = visibleText().filter((t) => MINOR.test(t));
    expect(hits).toEqual([]);
  });
});

describe('rule 3: rated 13+', () => {
  it('carries nothing explicit, gory or self-harming', () => {
    const EXPLICIT =
      /\b(naked|nude|nudity|sex|sexy|sexual|breasts?|cleavage|lingerie|underwear|undress\w*|thighs?|gore|gory|bloody|blood|entrails|disembowel\w*|suicide|self-harm|slit|corpse|kill\w*)\b/i;
    const hits = visibleText().filter((t) => EXPLICIT.test(t));
    expect(hits).toEqual([]);
  });

  it('caps romance at a kiss and rules out fan service in the tone guide', () => {
    expect(story.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(story.rules.toneGuide).toMatch(/never fan service/);
    expect(story.rules.allowsRomance).toBe(true);
  });
});

describe('rule 4: original', () => {
  it('borrows no franchise vocabulary', () => {
    const FRANCHISE =
      /\b(quirks?|quirkless|nen|chakra|hokage|jutsu|shinobi|hunter association|hunter exam|one for all|all might|pro heroes?|devil fruit|haki|cursed energy|stand users?|U\.A\.|yuuei|hero society|plus ultra)\b/i;
    const hits = visibleText().filter((t) => FRANCHISE.test(t));
    expect(hits).toEqual([]);
  });
});

describe('rule 5: the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    for (const ability of story.abilities.filter((a) => !a.unlockedByDefault)) {
      expect(granted.has(ability.id), `${ability.id} is gated and nothing grants it`).toBe(true);
    }
  });

  it('puts the word "you" in every card blurb', () => {
    for (const c of story.characters) {
      expect(/\byou\b/i.test(c.cardBlurb), `${c.id}: "${c.cardBlurb}"`).toBe(true);
      expect(c.cardBlurb.length).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase()).not.toBe(c.role.toLowerCase());
    }
  });

  it('gives every location an inbound edge', () => {
    for (const location of story.locations) {
      const inbound = story.locations.some((other) => other.connections.some((c) => c.to === location.id));
      expect(inbound, `${location.id} has no way in`).toBe(true);
    }
  });
});

describe('the catalogue’s structural bars', () => {
  it('meets the §43.1 content bar', () => {
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(words(story.premise)).toBeGreaterThanOrEqual(120);
    expect(words(story.premise)).toBeLessThanOrEqual(250);
    const paragraphs = story.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const paragraph of paragraphs) expect(words(paragraph)).toBeLessThanOrEqual(70);
    expect(story.promises.length).toBeGreaterThanOrEqual(3);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    expect(story.rules.hardCanon.length).toBeGreaterThan(0);
  });

  it('points only at things that exist', () => {
    const locIds = new Set(story.locations.map((l) => l.id));
    const itemIds = new Set(story.items.map((i) => i.id));
    const charIds = new Set(story.characters.map((c) => c.id));
    const abIds = new Set(story.abilities.map((a) => a.id));
    const facIds = new Set(story.factions.map((f) => f.id));
    const resIds = new Set(story.resources.map((r) => r.id));
    const skillIds = new Set(story.skills.map((s) => s.id));
    const broken: string[] = [];

    for (const l of story.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} skill ${a.check.skillId}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of story.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`start ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
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

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const obtainable = new Set([
      ...story.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...story.rules.startingItems.map((i) => i.itemId),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
      ...story.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), where).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), where).toBe(true);
    }
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never demands the item a step is about to hand out', () => {
    for (const { step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const route of step.succeedWhenAny) {
        for (const itemId of route.predicate.hasItems) expect(granted.has(itemId), step.id).toBe(false);
      }
    }
  });

  it('never gates on a flag nothing can set', () => {
    const settable = new Set<string>();
    for (const { step } of steps) {
      for (const f of step.rewards.flags) settable.add(f);
      for (const r of step.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
    }
    for (const e of story.worldEvents) for (const f of e.setsFlags) settable.add(f);
    const ENGINE = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const ok = (f: string) => settable.has(f) || f === 'left_the_map' || ENGINE.some((p) => f.startsWith(p));

    const dead: string[] = [];
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`${q.id} discover ${f}`);
      for (const st of q.steps) {
        for (const f of st.enterWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`${st.id} enter ${f}`);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) if (!ok(f)) dead.push(`${r.routeId} ${f}`);
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!ok(f)) dead.push(`${g.id} ${f}`);
    for (const e of story.worldEvents) for (const f of e.requiresFlags) if (!ok(f)) dead.push(`${e.id} ${f}`);
    for (const e of story.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) if (!ok(f)) dead.push(`${e.id} ${f}`);
    }
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) if (!ok(f)) dead.push(`${a.id} ${f}`);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !ok(c.lockedByFlag)) dead.push(`${l.id}->${c.to}`);
    }
    expect(dead).toEqual([]);
  });

  it('never gates on standing nothing can earn', () => {
    const ceiling = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    for (const a of story.archetypes) {
      for (const r of a.startingReputation) {
        const floor = story.factions.find((f) => f.id === r.factionId)!.startingReputation;
        ceiling.set(r.factionId, Math.max(ceiling.get(r.factionId)!, floor + r.amount));
      }
    }
    for (const { step } of steps) {
      for (const g of step.rewards.reputation) ceiling.set(g.factionId, ceiling.get(g.factionId)! + Math.max(0, g.amount));
    }
    const gates = [
      ...steps.flatMap(({ step }) => step.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation)),
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
    ];
    for (const g of gates) expect(ceiling.get(g.factionId)!, `${g.factionId} ${g.value}`).toBeGreaterThanOrEqual(g.value);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = story.rules.startWorldMinute % 1440;
    for (const c of story.characters) {
      const placed = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(placed || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('covers every minute of every character’s day', () => {
    for (const c of story.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
    }
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of story.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    expect([...owners].filter(([, items]) => items.size > 1).map(([a]) => a)).toEqual([]);
  });

  it('uses expressions the portrait generator draws', () => {
    const unknown = story.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('hands every player the cadet band, archetype or not', () => {
    const state = start(null);
    expect(state.player.inventory.map((i) => i.itemId)).toContain('cadet_band');
  });

  it('has endings for every kind of week, none before it has been one', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    for (const e of story.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });
});

describe('clarity checkers', () => {
  it('passes the story clarity standard with no errors', () => {
    const errors = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('answers all six questions a new reader has in the premise', () => {
    const report = checkNarrativeClarity(story.premise, { story, kind: 'premise' });
    expect(report.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(report.wordCount).toBeGreaterThan(100);
    expect(report.passed).toBe(true);
  });

  it('has no choice-clarity errors, and says the background is fixed', () => {
    const errors = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });

  it('gives every background a distinct, rules-visible shape', () => {
    for (const option of story.archetypes) {
      expect(option.name).not.toMatch(/—/);
      expect(option.summary.length).toBeGreaterThan(40);
      expect(option.playstyle.length).toBeGreaterThanOrEqual(2);
      for (const tag of option.playstyle) expect(tag.length).toBeLessThanOrEqual(24);
      const g = archetypeGrants(story, option);
      expect(g.abilities.length + g.skills.length + g.attributes.length + g.items.length, option.id).toBeGreaterThan(0);
    }
    const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('lets every ability state its own shape', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('shows the storyteller only the background the player chose', () => {
    const brief = worldBrief(story, 'arch_street');
    expect(brief).toContain('The Night Shift');
    for (const other of ['The Exam Paper', 'The Licensed Parent', 'The Repair Shop']) {
      expect(brief).not.toContain(other);
    }
  });
});

describe('the week is shaped like the bible says', () => {
  it('opens with Valk and Riku in the hall, and nobody the player has not met', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['valk', 'riku']));
    for (const absent of ['hale', 'halvorsen', 'ada']) expect(present).not.toContain(absent);
  });

  it('treats lying, refusing and walking out as real answers to Valk', () => {
    const answer = story.quests[0]!.steps[0]!;
    const ids = answer.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(expect.arrayContaining(['told_her_straight', 'covered_it', 'walked_out', 'ran_it_again']));
  });

  it('lets somebody walk away from the island, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_off_the_island')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('lets the week go badly without the player making a mistake', () => {
    const quiet = story.endings.find((e) => e.id === 'end_the_quiet_floor')!;
    expect(quiet.requires.minRelationship).toEqual([]);
    expect(quiet.requires.hasItems).toEqual([]);
    expect(quiet.requires.minFactionReputation).toEqual([]);
    const source = story.worldEvents.find((e) => e.setsFlags.includes('reclassification_ordered'))!;
    expect(source.requiresFlags).toEqual([]);
  });

  it('keeps the first fire optional: only a curious player opens it', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_first_fire')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_first_fire']);
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_first_fire'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
    const needsLead = new Set(['ada_came_back', 'knows:ada_kole', 'first_fire_answered']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => needsLead.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(story.endings.length - 2);
  });

  it('keeps the power’s full release locked until it is learned, in the world’s own words', () => {
    const release = story.abilities.find((a) => a.id === 'let_it_out')!;
    expect(release.unlockedByDefault).toBe(false);
    expect(release.requires?.flagsSet).toEqual(['knows:how_it_answers']);
    expect(release.requires!.lockedCopy.length).toBeGreaterThan(30);
    expect(release.requires!.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const grant = steps.find(({ step }) => step.rewards.abilities.includes('let_it_out'))!;
    expect(grant.step.rewards.flags).toContain('knows:how_it_answers');
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(4);
      for (const s of c.secrets) expect(s.revealHint.length, s.id).toBeGreaterThan(10);
    }
  });

  it('keeps seven voices that do not sound alike', () => {
    const vocab = (c: (typeof story.characters)[number]) =>
      new Set(
        c.voiceSamples
          .join(' ')
          .toLowerCase()
          .replace(/[^a-z]+/g, ' ')
          .split(' ')
          .filter((w) => w.length > 3),
      );
    const sets = story.characters.map((c) => ({ id: c.id, words: vocab(c) }));
    for (let i = 0; i < sets.length; i++) {
      for (let j = i + 1; j < sets.length; j++) {
        const a = sets[i]!;
        const b = sets[j]!;
        const shared = [...a.words].filter((w) => b.words.has(w)).length;
        const ratio = shared / Math.min(a.words.size, b.words.size);
        expect(ratio, `${a.id} and ${b.id} share vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('does not let two people share a rhetorical construction', () => {
    const MOVES = [/\bI(?: am|’m|'m) not (?:saying|telling|asking)\b/i, /\bnot \w+, but\b/i, /\bthe kind of \w+ that\b/i];
    for (const move of MOVES) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => move.test(v)));
      expect(users.length, String(move)).toBeLessThanOrEqual(1);
    }
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources).toHaveLength(3);
    for (const r of story.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo}`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one thing rest restores, and it is the body', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes a public brawl raise scrutiny and cost the academy', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(story.factions[0]!.id).toBe('faction_academy');
  });

  it('drives every descending variable from something the player can do', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const drivers = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(drivers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

describe('art', () => {
  it('ships with no art yet, and derives every key under its own prefix', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_rank_zero/opening');
    const derived = withDerivedAssetKeys(story);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(key, String(key)).toMatch(/^story_rank_zero\//);
  });
});

describe('the world plays', () => {
  it('runs a turn without an invalid narrative', async () => {
    const state = start();
    for (const text of ['I look around.', 'I ask them what is going on.', 'I wait and listen.', ...story.openingSuggestions]) {
      const result = await runTurn({
        story,
        state,
        memories: [],
        recentTurns: [],
        actionText: text,
        qualityTier: 'VIVID',
        turnId: 't1',
        seed: 'rank-zero-seed',
      });
      expect(result.report.valid, text).toBe(true);
      expect(result.narrative.blocks.length, text).toBeGreaterThan(0);
    }
  });
});

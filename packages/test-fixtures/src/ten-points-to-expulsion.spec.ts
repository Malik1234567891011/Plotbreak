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
import { TEN_POINTS_TO_EXPULSION } from './ten-points-to-expulsion.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Ten Points to Expulsion, held to the slate's binding rules and to every
 * structural bar the launch catalogue is held to.
 *
 * It is not registered in `LAUNCH_CATALOG` yet, so none of the catalogue-wide
 * specs see it. This file runs the same checks against it directly, so the
 * world arrives at registration already clean.
 *
 * The bet this world makes is that the number is the game, and production's
 * storyteller never reads the engine's resources. So beyond the usual bars,
 * this checks that the Tariff lives where the storyteller does look: hard
 * canon, the tone guide's band-notice format, and a quest item.
 */

const story = TEN_POINTS_TO_EXPULSION;

const start = (archetypeId: string | null = 'arch_small_print') =>
  createInitialState({
    sessionId: 'sess_ten_points',
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
const routeById = (id: string) => routes.find(({ route }) => route.routeId === id)!.route;

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

  it('has a named character speaking to the player within the first 60 words', () => {
    const first60 = opening.split(/\s+/).slice(0, 60).join(' ');
    expect(first60).toMatch(/[“"]Ren Harcourt\. Student president\.[”"]/);
    expect(first60).toMatch(/Don’t stand up/);
  });

  it('ends on a direct question from a named character', () => {
    const lastParagraph = opening.trim().split(/\n\s*\n/).pop() ?? '';
    expect(lastParagraph).toContain('Ren');
    const lastQuote = opening.trim().match(/[“"]([^“"”]+)[”"]\s*$/)?.[1] ?? '';
    expect(lastQuote.trim().endsWith('?')).toBe(true);
  });

  it('asks the player to know no proper noun the opening does not introduce', () => {
    const unintroduced = [
      'Tallis', 'Brackwater', 'Ledger', 'Tariff', 'Grey', 'Margot', 'Bastian', 'Marsh', 'Provost',
      'Key Seven', 'Standing Paper', 'the Board', 'Correction', 'Adjustment', 'clause nine', 'Stake',
      ...story.factions.map((f) => f.name),
      ...story.locations.map((l) => l.name),
    ];
    for (const term of unintroduced) expect(opening, term).not.toContain(term);
    // The two people it names arrive with what they are, in the same breath.
    expect(opening).toMatch(/Ren Harcourt\. Student president\./);
    expect(opening).toMatch(/your friend Yui/);
    // The stakes are stated rather than assumed.
    expect(opening).toMatch(/At zero, you are expelled/);
  });

  it('offers three cards: one said, one done, one risky', () => {
    const cards = story.openingSuggestions;
    expect(cards).toHaveLength(3);
    const said = cards.filter((c) => /^[“"]/.test(c));
    const done = cards.filter((c) => !/[“"”]/.test(c));
    expect(said, 'one card is pure dialogue').toHaveLength(1);
    expect(done, 'one card is pure action').toHaveLength(1);
    const risky = cards.find((c) => !said.includes(c) && !done.includes(c))!;
    expect(risky).toMatch(/Proctor!/);
  });

  it('demonstrates the opener’s voice in his own samples', () => {
    const ren = story.characters.find((c) => c.id === 'ren')!;
    const line = 'Fail the exam. Hand in a blank paper and this is yours. Nobody needs to know.';
    expect(opening).toContain(line);
    expect(ren.voiceSamples.some((v) => v.includes(line))).toBe(true);
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

  it('gives the storyteller a deadline to answer him by', () => {
    expect(story.openingObligations?.[0]?.withCharacterId).toBe('ren');
    expect(story.rules.startWorldMinute).toBe(8 * 60 + 59);
    expect(story.worldEvents.find((e) => e.id === 'we_the_bell')?.atWorldMinute).toBe(9 * 60);
  });

  it('shows a real charge in the format the storyteller is told to copy', () => {
    // The opener is the first beat of the transcript the storyteller reads,
    // so its band line has to match the tone guide's notice exactly.
    const notices = opening.match(/\[[^\]]+\]/g) ?? [];
    expect(notices).toHaveLength(1);
    expect(notices[0]).toMatch(/^\[-\d+ · [^·\]]+ · Balance 10\]$/);
  });
});

describe('rule 2: adults only', () => {
  const NUMBER: Record<string, number> = {
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  };
  /** The number word an appearance opens with: "Twenty-two, tall…" is 22. */
  const ageOf = (appearance: string): number => {
    const head = appearance.trim().toLowerCase().match(/^[a-z]+(?:-[a-z]+)?/)?.[0] ?? '';
    return head.split('-').reduce((sum, part) => sum + (NUMBER[part] ?? Number.NaN), 0);
  };
  const people = story.characters.filter((c) => c.id !== 'ledger');

  it('states every person’s age, and every one is at least eighteen', () => {
    for (const c of people) {
      const age = ageOf(c.appearance);
      expect(Number.isFinite(age), `${c.id}: "${c.appearance}"`).toBe(true);
      expect(age, c.id).toBeGreaterThanOrEqual(18);
      expect(c.appearance, c.id).toMatch(/^[A-Z][a-z]+(?:-[a-z]+)?, /);
    }
  });

  it('pins the ages the bible states', () => {
    const ages = Object.fromEntries(people.map((c) => [c.id, ageOf(c.appearance)]));
    expect(ages).toEqual({ ren: 22, yui: 19, grey: 36, margot: 21, bastian: 23, marsh: 57 });
  });

  it('makes the Ledger software with a service age, not a person', () => {
    const ledger = story.characters.find((c) => c.id === 'ledger')!;
    expect(ledger.pronouns).toBe('it/its');
    expect(ledger.appearance).toMatch(/^Twenty-three years in service and no body at all/);
    expect(ageOf(ledger.appearance)).toBe(23);
  });

  it('says in canon that the college is post-secondary and everybody is an adult', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/four-year residential college/i);
    expect(canon).toMatch(/Every student is an adult, at least eighteen/);
  });

  it('never uses a word that reads a character as a minor', () => {
    const MINOR = /\b(kids?|boys?|girls?|child|children|childhood|teens?|teenage|teenagers?|minors?|schoolboy|schoolgirl|underage|high school|middle school)\b/i;
    const hits = visibleText().filter((t) => MINOR.test(t));
    expect(hits).toEqual([]);
  });

  it('never codes the college as a secondary school', () => {
    // Blazers in an anime frame already lean high school, so the words around
    // them have to read as a college: stewards, not prefects; no uniform.
    const SCHOOL = /\b(prefects?|uniforms?|pupils?|headmaster|headmistress|homeroom|detention|form tutor|young (?:man|woman))\b/i;
    const hits = visibleText().filter((t) => SCHOOL.test(t));
    expect(hits).toEqual([]);
    const hall = story.locations.find((l) => l.id === 'exam_hall')!;
    expect(hall.artDirection).toMatch(/black academic gowns/);
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

  it('keeps fights in a ring with a medic, and says nothing is graphic', () => {
    expect(story.rules.toneGuide).toMatch(/nothing is graphic/);
    expect(story.intensity).toBe('MODERATE');
  });
});

describe('rule 4: original', () => {
  it('borrows no franchise vocabulary', () => {
    const FRANCHISE =
      /\b(class points?|private points?|advanced nurturing|koudo ikusei|s-system|hyakkaou|kakegurui|classroom of the elite|ayanokoji|horikita|jabami|yumeko|momobami|kirari|house pets?|pochi|mike|lookism|merit supremacy|student council election)\b/i;
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
    const gated = story.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.map((a) => a.id).sort()).toEqual(['invoke_audit', 'turn_the_key']);
    for (const ability of gated) {
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
    for (const i of story.items) {
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} skill ${s}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
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
    for (const o of story.openingObligations ?? []) {
      if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    }
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
    for (const e of story.worldEvents) {
      for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) if (!ok(f)) dead.push(`${e.id} ${f}`);
    }
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
    expect(gates.length).toBeGreaterThan(0);
    for (const g of gates) expect(ceiling.get(g.factionId)!, `${g.factionId} ${g.value}`).toBeGreaterThanOrEqual(g.value);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = story.rules.startWorldMinute % 1440;
    for (const c of story.characters) {
      const placed = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(placed, c.id).toBe(true);
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
    expect(calledName(story.characters.find((c) => c.id === 'grey')!)).toBe('Mr. Grey');
  });

  it('hands every player their band, archetype or not', () => {
    const state = start(null);
    expect(state.player.inventory.map((i) => i.itemId)).toContain('band');
    const band = story.items.find((i) => i.id === 'band')!;
    expect(band.droppable).toBe(false);
  });

  it('has endings for every kind of week, none before it has been one', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.length).toBeLessThanOrEqual(12);
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
    const brief = worldBrief(story, 'arch_small_print');
    expect(brief).toContain('You Read the Small Print');
    for (const other of ['You Work Every Shift', 'You Talk Your Way Out', 'You Box at the Boathouse']) {
      expect(brief).not.toContain(other);
    }
  });
});

describe('the number is the game, and the storyteller can see it', () => {
  it('puts the Tariff in hard canon, with the rewards and the fines', () => {
    const canon = story.rules.hardCanon.join(' ');
    for (const line of ['+200', '-2', '-50', 'lawful and unlimited', 'Notice', 'forty-eight hours']) {
      expect(canon, line).toContain(line);
    }
    expect(canon).toMatch(/starts the story at 10 points/);
    expect(canon).toMatch(/Yui Arakawa at 3/);
  });

  it('tells the storyteller to show every change as a band notice, with the balance', () => {
    expect(story.rules.toneGuide).toContain('[+1 · Held a door · Balance 11]');
    expect(story.rules.toneGuide).toMatch(/running balance correct/);
  });

  it('carries the Tariff as a quest item, so it reaches the storyteller’s lore', () => {
    const tariff = story.items.find((i) => i.id === 'tariff_sheet')!;
    expect(tariff.questItem).toBe(true);
    expect(tariff.description).toMatch(/Perfect paper: \+200/);
    expect(tariff.loreText).toMatch(/Adjustments may be made/);
  });

  it('writes every Ledger line in the Ledger’s own format', () => {
    const ledger = story.characters.find((c) => c.id === 'ledger')!;
    for (const line of ledger.voiceSamples) expect(line, line).toMatch(/^\[.+·.+\]$/);
  });

  it('keeps ten points scarce: help is capped and the card pays only for a blank paper', () => {
    const canon = story.rules.hardCanon.join(' ');
    const cap = 'Help and kitchen shifts pay at most five points a day between them';
    expect(canon).toContain(cap);
    expect(story.items.find((i) => i.id === 'tariff_sheet')!.description).toContain(cap);
    expect(canon).toMatch(/Ren’s card pays only if the player’s paper goes up blank at six/);
    const card = story.items.find((i) => i.id === 'rens_card')!;
    expect(card.description).toMatch(/only if the holder’s Standing Paper is blank/);
    expect(card.loreText).toMatch(/goes dark/);
    expect(card.loreText).not.toMatch(/works for whoever taps it/);
  });

  it('uses plain hyphens for minus signs, so the format is copyable', () => {
    expect(visibleText().filter((t) => t.includes('−'))).toEqual([]);
  });
});

describe('the week is shaped like the bible says', () => {
  it('opens with Ren, Yui and Mr. Grey in the hall, and nobody the player has not met', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['ren', 'yui', 'grey']));
    for (const absent of ['margot', 'bastian', 'marsh', 'ledger']) expect(present).not.toContain(absent);
  });

  it('treats taking it, refusing, lying, telling and walking out as real answers to Ren', () => {
    const answer = story.quests[0]!.steps[0]!;
    const ids = answer.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(
      expect.arrayContaining(['took_the_card', 'turned_him_down', 'told_him_yes', 'told_the_proctor', 'asked_him_why', 'walked_out', 'said_nothing']),
    );
  });

  it('never strands a player who does nothing at the exam', () => {
    // Every step on the main spine has a last route that a world event
    // satisfies, so a player who sits there silently still reaches six o’clock.
    for (const stepId of ['answer_ren', 'the_paper', 'six_oclock']) {
      const step = steps.find(({ step }) => step.id === stepId)!.step;
      const last = step.succeedWhenAny.at(-1)!;
      expect(last.predicate.flagsSet, stepId).toHaveLength(1);
      const source = story.worldEvents.find((e) => e.setsFlags.includes(last.predicate.flagsSet[0]!));
      expect(source, `${stepId}: ${last.predicate.flagsSet[0]}`).toBeDefined();
    }
  });

  it('puts something in the silent three hours between the bell and pens down', () => {
    // The storyteller gets no minutes and no step notes, so the sitting has to
    // be in canon and something has to happen in it.
    expect(story.rules.hardCanon.join(' ')).toMatch(/nine to twelve/);
    const mid = story.worldEvents.filter((e) => e.atWorldMinute > 9 * 60 && e.atWorldMinute < 12 * 60);
    expect(mid.map((e) => e.id)).toEqual(['we_mid_sitting']);
    expect(mid[0]!.requiresFlags).toEqual(['the_bell_rang']);
    expect(mid[0]!.publicCopy).toMatch(/Yui/);
  });

  it('lets somebody walk out of the college, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_outside_the_gate')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('lets the week go badly without the player making a mistake', () => {
    const zero = story.endings.find((e) => e.id === 'end_zero')!;
    expect(zero.requires.minRelationship).toEqual([]);
    expect(zero.requires.hasItems).toEqual([]);
    expect(zero.requires.minFactionReputation).toEqual([]);
    const byDefault = routeById('expelled_by_default');
    expect(byDefault.setsFlags).toContain('expelled');
    expect(byDefault.predicate.minRelationship).toEqual([]);
    expect(byDefault.predicate.hasItems).toEqual([]);
    expect(byDefault.predicate.flagsSet).toEqual(['hearing_called']);
    // Yui hits zero on her own unless somebody steps in.
    const yui = story.worldEvents.find((e) => e.id === 'we_yui_hits_zero')!;
    expect(yui.requiresFlags).toEqual([]);
    expect(yui.cancelledByFlags).toEqual(['yui_covered']);
  });

  it('makes the bribe a real, survivable choice with its own ending', () => {
    const thousand = story.endings.find((e) => e.id === 'end_the_thousand')!;
    expect(thousand.requires.flagsSet).toEqual(['paid_to_fail']);
    expect(thousand.rarity).toBe('COMMON');
    const hearing = story.worldEvents.find((e) => e.id === 'we_hearing_called')!;
    expect(hearing.cancelledByFlags).toContain('paid_to_fail');
  });

  it('opens the audit only with a perfect paper, in the world’s own words', () => {
    const audit = story.abilities.find((a) => a.id === 'invoke_audit')!;
    expect(audit.unlockedByDefault).toBe(false);
    expect(audit.requires?.flagsSet).toEqual(['earned_the_audit']);
    expect(audit.requires!.lockedCopy.length).toBeGreaterThan(30);
    expect(audit.requires!.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const grant = steps.find(({ step }) => step.rewards.abilities.includes('invoke_audit'))!;
    expect(grant.step.succeedWhenAny.some((r) => r.setsFlags.includes('earned_the_audit'))).toBe(true);
    expect(routeById('a_perfect_paper').predicate.flagsSet).toContain('sat_it_honestly');
  });

  it('keeps the key out of reach until somebody has it, in the world’s own words', () => {
    const key = story.abilities.find((a) => a.id === 'turn_the_key')!;
    expect(key.unlockedByDefault).toBe(false);
    expect(key.requires?.flagsSet).toEqual(['holds_the_key']);
    expect(key.requires!.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const grant = steps.find(({ step }) => step.rewards.abilities.includes('turn_the_key'))!;
    expect(grant.step.succeedWhenAny.some((r) => r.setsFlags.includes('holds_the_key'))).toBe(true);
  });

  it('keeps the last perfect paper optional: only a curious player opens it', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_last_perfect_paper')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:grey_was_a_student']);
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:grey_was_a_student'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
    const needsLead = new Set(['grey_was_there', 'knows:what_grey_saw', 'grey_answered']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => needsLead.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(story.endings.length - 1);
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

  it('has exactly one thing rest restores, and it is a clear head', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['focus']);
  });

  it('makes a public brawl raise heat and cost the council', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('heat');
    expect(story.factions[0]!.id).toBe('faction_council');
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
    for (const c of story.characters) expect(c.portrait, c.id).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_ten_points_to_expulsion/opening');
    const derived = withDerivedAssetKeys(story);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(key, String(key)).toMatch(/^story_ten_points_to_expulsion\//);
  });
});

describe('the world plays', () => {
  it('runs a turn without an invalid narrative', async () => {
    const state = start();
    for (const text of ['I look around.', 'I ask him what is going on.', 'I wait and listen.', ...story.openingSuggestions]) {
      const result = await runTurn({
        story,
        state,
        memories: [],
        recentTurns: [],
        actionText: text,
        qualityTier: 'VIVID',
        turnId: 't1',
        seed: 'ten-points-seed',
      });
      expect(result.report.valid, text).toBe(true);
      expect(result.narrative.blocks.length, text).toBeGreaterThan(0);
    }
  });
});

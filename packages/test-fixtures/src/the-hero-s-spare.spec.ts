import { describe, expect, it } from 'vitest';
import { abilityEffect, archetypeGrants, calledName, knownExpression } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import {
  RuleBasedIntentParser,
  checkNarrativeClarity,
  checkStoryChoiceClarity,
  checkStoryClarity,
  runTurn,
  worldBrief,
} from '@plotbreak/director';
import { THE_HERO_S_SPARE } from './the-hero-s-spare.js';
import { withDerivedAssetKeys } from './derive-assets.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The Hero's Spare, held to the promise on its own card: that the person the
 * summoning did not want still gets a whole game, whatever they type into the
 * first minute.
 *
 * The failure this world is most exposed to is a schedule that reads as a
 * rail. The third dawn is fixed and the sword is real, so the risk is that
 * every run becomes "find the one way to stop it". The tests below hold the
 * other shape: the first minute accepts talking, lying, refusing, fighting,
 * running and silence; the Returning can happen to a player who did nothing
 * wrong and still be an ending rather than a game over; walking out is
 * reachable early; and the fog in the north is a lead only a curious player
 * opens.
 *
 * It is not registered in `LAUNCH_CATALOG` yet, so none of the catalogue-wide
 * specs see it. This file runs the same checks against it directly, so the
 * world arrives at registration already clean.
 */

const story = THE_HERO_S_SPARE;

const start = (archetypeId: string | null = 'arch_nurse') =>
  createInitialState({
    sessionId: 'sess_hero_s_spare',
    story,
    identity: {
      displayName: 'Sam Okafor',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

const character = (id: string) => story.characters.find((c) => c.id === id)!;

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag a step, a route or a world event can write. */
const settable = (): Set<string> => {
  const flags = new Set<string>();
  for (const { step } of steps) {
    for (const f of step.rewards.flags) flags.add(f);
    for (const r of step.succeedWhenAny) for (const f of r.setsFlags) flags.add(f);
  }
  for (const e of story.worldEvents) for (const f of e.setsFlags) flags.add(f);
  return flags;
};

/** Everything a player or the storyteller ever reads, as one list. */
const visibleText = (): string[] => [
  story.title,
  story.fantasyLabel,
  story.hook,
  story.premise,
  story.creatorNote,
  story.opening,
  story.openingPanel?.alt ?? '',
  story.coverDirection,
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
  ...story.resources.flatMap((r) => [r.name, r.zeroStateConsequence ?? '', ...r.bands.map((b) => b.behaviour)]),
  ...story.quests.flatMap((q) => [
    q.title,
    q.summary,
    q.knownRewardCopy,
    ...q.steps.flatMap((s) => [s.playerCopy, s.directorNotes, ...s.succeedWhenAny.map((r) => r.label)]),
  ]),
  ...story.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
  ...story.promises.flatMap((p) => [p.label, p.seedHint, p.payoffHint]),
  ...story.archetypes.flatMap((a) => [a.name, a.role, a.summary, a.blurb, ...a.playstyle]),
  ...story.setupFields.flatMap((f) => [f.label, f.helpText, f.placeholder]),
  ...story.endings.flatMap((e) => [e.name, e.condition, e.epilogue, e.hint]),
];

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [story.premise, story.opening, story.hook, ...story.openingSuggestions, ...story.rules.styleExamples]) {
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
    expect(first60).toMatch(/"Don’t move,"/);
    expect(first60).toContain('Sergeant Mira Holt');
  });

  it('ends on a direct question from that named character', () => {
    const paragraphs = opening.trim().split(/\n\s*\n/);
    const last = paragraphs.at(-1)!;
    expect(last.trim()).toMatch(/^".*\?"$/);
    expect(last).toContain('What are you good for?');
    // The last line before it that names a speaker is Mira's.
    const attributed = paragraphs.filter((p) => /\bMira says\b|\bsays the woman\b/.test(p));
    expect(attributed.length).toBeGreaterThanOrEqual(2);
  });

  it('asks the player to know no proper noun the opening does not introduce', () => {
    const unintroduced = [
      'Corvane', 'Kai', 'Brandt', 'Odile', 'Castine', 'Emeric', 'Ilsabet', 'Severin', 'Bet', 'Tallis',
      'Ruth', 'Wenna', 'Aubrel', 'Fallowmere', 'Stilling', 'Burning King', 'Witness', 'Returning', 'Archivist',
      ...story.factions.map((f) => f.name),
      ...story.locations.map((l) => l.name),
      ...story.items.filter((i) => i.questItem).map((i) => i.name),
    ];
    for (const term of unintroduced) expect(opening, term).not.toMatch(new RegExp(`\\b${term}\\b`));
    // The one name it uses arrives in the speaker's own mouth.
    expect(opening).toMatch(/says the woman holding it[\s\S]*"Sergeant Mira Holt\./);
  });

  it('offers three cards: one said, one done, one risky', () => {
    const cards = story.openingSuggestions;
    expect(cards).toHaveLength(3);
    const said = cards.filter((c) => /^["“]/.test(c));
    const done = cards.filter((c) => !/["“”]/.test(c));
    expect(said, 'one card is pure dialogue').toHaveLength(1);
    expect(done, 'one card is pure action').toHaveLength(1);
    const risky = cards.find((c) => !said.includes(c) && !done.includes(c))!;
    expect(risky).toMatch(/blade/);
    expect(risky).toMatch(/"[^"]+"/);
  });

  it('gives Mira the opener’s closing line in her own samples', () => {
    const mira = character('mira');
    expect(mira.voiceSamples.some((v) => v.includes('What are you good for?'))).toBe(true);
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

  it('gives the first beat a panel under its own asset prefix', () => {
    expect(story.openingPanel?.assetKey).toBe('story_the_hero_s_spare/opening');
    expect(story.openingPanel?.alt).toMatch(/Mira Holt/);
  });

  it('shows the reading power before the first card asks about it', () => {
    expect(opening).toMatch(/Gold writing glows under the white\. Nobody else sees it\./);
    expect(story.openingSuggestions[0]).toMatch(/writing glowing in that chalk/);
    expect(story.openingPanel?.alt).toMatch(/gold writing/);
  });

  it('authors what the chalk says where production reads it', () => {
    // `worldBrief` sends hard canon but not the chalk stub, which is not a quest item.
    const at = story.rules.hardCanon.findIndex((f) => /calling line/.test(f) && /Light of another sky/.test(f));
    expect(at).toBeGreaterThan(0);
    expect(story.rules.hardCanon[at]).toMatch(/and bring them here to stand/);
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
    expect(ages).toEqual({ mira: 27, kai: 22, odile: 52, emeric: 71, ilsabet: 26, severin: 38, bet: 58 });
  });

  it('says in canon that everyone, the player included, is an adult', () => {
    const canon = story.rules.hardCanon[0]!;
    expect(canon).toMatch(/Everyone in this story is an adult/);
    expect(canon).toMatch(/The player is an adult/);
    expect(canon).toMatch(/twenty-two, is the youngest/);
  });

  it('never uses a word that reads a character as a minor', () => {
    const MINOR =
      /\b(kids?|boys?|girls?|child|children|childlike|childhood|teens?|teenage|teenagers?|minors?|schoolboy|schoolgirl|underage|high school|middle school|young|younger|youthful|little sister|little brother)\b/i;
    // "Youngest" is deliberately not in the list: the canon line that pins the
    // floor says "Kai Brandt, at twenty-two, is the youngest person in the cast".
    const hits = visibleText().filter((t) => MINOR.test(t));
    expect(hits).toEqual([]);
  });
});

describe('rule 3: rated 13+', () => {
  it('carries nothing explicit, gory or self-harming', () => {
    const EXPLICIT =
      /\b(naked|nude|nudity|sex|sexy|sexual|breasts?|cleavage|lingerie|underwear|undress\w*|thighs?|gore|gory|bloody|blood|bleed\w*|entrails|disembowel\w*|behead\w*|decapitat\w*|suicide|self-harm|slit|corpse|kill\w*)\b/i;
    // "without gore" is an instruction to the writer, not gore.
    const hits = visibleText().filter((t) => EXPLICIT.test(t.replace(/\b(?:no|without) gore\b/gi, '')));
    expect(hits).toEqual([]);
  });

  it('caps romance at a kiss and rules out fan service in the tone guide', () => {
    expect(story.rules.toneGuide).toMatch(/goes no further than a kiss/);
    expect(story.rules.toneGuide).toMatch(/never fan service/);
    expect(story.rules.toneGuide).toMatch(/no gore/);
    expect(story.rules.allowsRomance).toBe(true);
  });

  it('keeps every romance gate behind real trust', () => {
    const gates = story.characters.flatMap((c) => c.gates.filter((g) => g.kind === 'ROMANCE').map((g) => ({ c: c.id, g })));
    expect(gates.length).toBeGreaterThan(0);
    for (const { c, g } of gates) expect(g.requires.trust ?? 0, `${c}/${g.id}`).toBeGreaterThanOrEqual(60);
  });
});

describe('rule 4: original', () => {
  it('borrows no franchise vocabulary', () => {
    const FRANCHISE =
      /\b(quirks?|quirkless|nen|chakra|hokage|jutsu|shinobi|hunter association|hunter exam|one for all|all might|pro heroes?|devil fruit|haki|cursed energy|stand users?|status window|system window|demon lord|demon king|shield hero|cardinal weapon|return by death|tempest|rimuru|overlord|ainz|konosuba|aqua|isekai'd|truck-kun|great sage|wyndle)\b/i;
    const hits = visibleText().filter((t) => FRANCHISE.test(t));
    expect(hits).toEqual([]);
  });

  it('keeps the slate’s cast and none of the OOC titles', () => {
    for (const name of ['Odile', 'Kai Brandt', 'Mira Holt']) expect(story.characters.some((c) => c.name.includes(name)), name).toBe(true);
    expect(character('emeric').role).toMatch(/Archivist/);
    expect(visibleText().filter((t) => /isekai gone wrong|summoned with 3 sss/i.test(t))).toEqual([]);
  });
});

describe('rule 5: the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || a.requires.flagsSet.length > 0);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) {
      expect(ability.unlockedByDefault || granted.has(ability.id), `${ability.id} is gated and nothing grants it`).toBe(true);
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
      const inbound = story.locations.some(
        (other) => other.id !== location.id && other.connections.some((c) => c.to === location.id),
      );
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
    for (const i of story.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
      for (const s of Object.keys(i.skillModifiers)) if (!skillIds.has(s)) broken.push(`${i.id} skill ${s}`);
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
      if (e.requires.atLocation && !locIds.has(e.requires.atLocation)) broken.push(`${e.id} at ${e.requires.atLocation}`);
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
    const flags = settable();
    const ENGINE = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const ok = (f: string) => flags.has(f) || f === 'left_the_map' || ENGINE.some((p) => f.startsWith(p));

    const dead: string[] = [];
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`${q.id} discover ${f}`);
      for (const st of q.steps) {
        for (const f of st.enterWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`${st.id} enter ${f}`);
        for (const r of st.succeedWhenAny) {
          for (const f of [...r.predicate.flagsSet, ...r.predicate.flagsUnset]) if (!ok(f)) dead.push(`${r.routeId} ${f}`);
        }
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!ok(f)) dead.push(`${g.id} ${f}`);
    for (const e of story.worldEvents) {
      for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) if (!ok(f)) dead.push(`${e.id} ${f}`);
    }
    for (const e of story.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) if (!ok(f)) dead.push(`${e.id} ${f}`);
    }
    for (const a of story.abilities) for (const f of a.requires.flagsSet) if (!ok(f)) dead.push(`${a.id} ${f}`);
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

  it('can be walked to from where it starts', () => {
    const reached = new Set([story.rules.startingLocationId]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const l of story.locations) {
        if (!reached.has(l.id)) continue;
        for (const c of l.connections) {
          if (!reached.has(c.to)) {
            reached.add(c.to);
            grew = true;
          }
        }
      }
    }
    expect(story.locations.map((l) => l.id).filter((id) => !reached.has(id))).toEqual([]);
  });

  it('leaves something worth taking, and never lets two items answer to the same words', () => {
    const takeable = story.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    const owners = new Map<string, Set<string>>();
    for (const t of takeable) {
      for (const alias of t.aka) {
        const key = alias.trim().toLowerCase();
        owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
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

  it('hands every player their phone, archetype or not', () => {
    expect(start(null).player.inventory.map((i) => i.itemId)).toContain('your_phone');
  });

  it('has endings for every kind of three days, none before it has been one', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    // The storyteller is shown the first twelve. A thirteenth would be invisible to it.
    expect(story.endings.length).toBeLessThanOrEqual(12);
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
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
    expect(report.passed).toBe(true);
  });

  it('has no choice-clarity errors, and says the background is fixed', () => {
    const errors = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed for the whole story/);
    expect(checkStoryChoiceClarity(story).issues.map((i) => i.code)).toEqual([]);
  });

  it('gives every background a distinct, rules-visible shape', () => {
    for (const option of story.archetypes) {
      expect(option.summary.length).toBeGreaterThan(40);
      for (const tag of option.playstyle) expect(tag.length).toBeLessThanOrEqual(24);
      const g = archetypeGrants(story, option);
      expect(g.skills.length + g.attributes.length + g.items.length, option.id).toBeGreaterThan(0);
      expect(g.items.length, `${option.id} carries nothing from home`).toBe(1);
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
});

describe('what the storyteller is actually told', () => {
  // Production runs one model on `worldBrief` plus the transcript. It never
  // sees the map, so a door that exists only in `connections` does not exist
  // for it.
  it('names every exit in the description of the place it leaves from', () => {
    const missing: string[] = [];
    const bare = (s: string) => s.replace(/^The\s+/i, '').toLowerCase();
    for (const l of story.locations) {
      for (const c of l.connections) {
        const target = story.locations.find((x) => x.id === c.to)!;
        const text = l.description.toLowerCase();
        if (!text.includes(bare(target.name)) && !text.includes(bare(target.shortName))) missing.push(`${l.id} -> ${c.to}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('shows the storyteller only the background the player chose', () => {
    const brief = worldBrief(story, 'arch_boxer');
    expect(brief).toContain('You Boxed');
    for (const other of ['You Were a Night Nurse', 'You Were an Electrician', 'You Studied Law']) {
      expect(brief).not.toContain(other);
    }
  });

  it('puts the objects the story turns on in front of the storyteller', () => {
    const brief = worldBrief(story, 'arch_law');
    for (const item of ['The Circle’s Script', 'Your Phone', 'The First Page', 'The Book of Returnings', 'Wenna Holt’s Letter', 'The Sparrow in the Jar']) {
      expect(brief, item).toContain(`### ${item}`);
    }
    for (const ending of story.endings) expect(brief, ending.name).toContain(ending.name);
  });

  it('tells it how to handle a player who attacks, runs, lies or wanders', () => {
    const tone = story.rules.toneGuide;
    expect(tone).toMatch(/attacks Mira, runs, lies or refuses/);
    expect(tone).toMatch(/wanders off/);
    expect(tone).toMatch(/disarmed, down or yielding/);
  });

  it('gives the first day its pressure where production reads it', () => {
    // Quest steps reach it as title and summary only, and world events with no timing.
    const tone = story.rules.toneGuide;
    expect(tone).toMatch(/Kai talks his way past his guards/);
    expect(tone).toMatch(/at two in the afternoon Severin calls a Proving/);
    expect(tone).toMatch(/at five Kai is invested/);
  });

  it('tells it what each background carried from home, in the blurb it actually sends', () => {
    for (const option of story.archetypes) {
      const item = story.items.find((i) => i.id === option.startingItems[0]!.itemId)!;
      const noun = item.name.replace(/^(The|A|Pocket)\s+/i, '').split(' ').at(-1)!.toLowerCase();
      expect(option.blurb.toLowerCase(), option.id).toContain(noun === 'kit' ? 'pouch' : noun);
    }
  });

  it('keeps its own canon consistent', () => {
    // The ninth hero burned Aubrel 331 years ago and eleven spares have gone back since.
    expect(story.locations.find((l) => l.id === 'long_gallery')!.description).toMatch(/twenty heroes/);
    expect(visibleText().filter((t) => /Tenth Burning|blade falls at once/.test(t))).toEqual([]);
    expect(story.rules.hardCanon.join(' ')).toMatch(/six in the morning on Day 3/);
  });
});

describe('the first minute takes any answer', () => {
  const minute = story.quests.find((q) => q.id === 'q_one_minute')!.steps[0]!;

  it('opens with Mira, Kai and the priestess in the hall, and nobody the player has not met', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['mira', 'kai', 'odile']));
    for (const absent of ['emeric', 'ilsabet', 'severin', 'bet']) expect(present).not.toContain(absent);
  });

  it('treats reading, showing, lying, healing, refusing, fighting, running and silence as real answers', () => {
    const ids = minute.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(
      expect.arrayContaining([
        'read_the_circle', 'showed_the_phone', 'talked_your_way', 'tended_the_hero',
        'refused_to_perform', 'fought_the_blade', 'ran_for_it', 'let_the_sand_run',
      ]),
    );
    const silence = minute.succeedWhenAny.find((r) => r.routeId === 'let_the_sand_run')!;
    expect(silence.predicate.flagsSet).toEqual([]);
    expect(silence.predicate.afterWorldMinute).toBeGreaterThan(story.rules.startWorldMinute);
  });

  it('keeps the schedule whatever the answer, and says so in the world’s own words', () => {
    const pronounced = story.worldEvents.find((e) => e.id === 'we_the_pronouncement')!;
    expect(pronounced.atWorldMinute).toBe(8 * 60);
    expect(pronounced.requiresFlags).toEqual([]);
    expect(pronounced.cancelledByFlags).toEqual([]);
    expect(story.rules.hardCanon.join(' ')).toMatch(/Mira Holt will not strike in the first minute/);
  });
});

describe('the third dawn can go every way', () => {
  it('can arrive for a player who did nothing wrong', () => {
    const returning = story.worldEvents.find((e) => e.setsFlags.includes('returning_happened'))!;
    expect(returning.requiresFlags).toEqual([]);
    expect(returning.atWorldMinute).toBe(2 * 1440 + 6 * 60);
    const sentBack = story.endings.find((e) => e.id === 'end_sent_back')!;
    expect(sentBack.rarity).toBe('COMMON');
    expect(sentBack.requires.minRelationship).toEqual([]);
    expect(sentBack.requires.hasItems).toEqual([]);
    expect(sentBack.condition).toMatch(/must not read as a punishment/);
  });

  it('is cancelled only by something the player built', () => {
    const returning = story.worldEvents.find((e) => e.id === 'we_the_returning')!;
    const flags = settable();
    for (const f of returning.cancelledByFlags) expect(flags.has(f) || f === 'left_the_map', f).toBe(true);
    const stoppers = story.quests
      .find((q) => q.id === 'q_the_third_dawn')!
      .steps[0]!.succeedWhenAny.filter((r) => r.setsFlags.some((f) => returning.cancelledByFlags.includes(f)));
    expect(stoppers.length, 'too few ways to stop it').toBeGreaterThanOrEqual(7);
  });

  it('lets somebody walk out of the city, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_nobodys_spare')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('puts every one of the twelve endings behind a different set of flags', () => {
    const keys = story.endings.map((e) => JSON.stringify([...e.requires.flagsSet].sort()));
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('the power is real, and costs something', () => {
  it('lets the player read from turn one', () => {
    const read = story.abilities.find((a) => a.id === 'read_the_script')!;
    expect(read.unlockedByDefault).toBe(true);
    expect(read.requires.flagsSet).toEqual([]);
  });

  it('keeps crossing out locked until somebody in the world says it can be done', () => {
    const cross = story.abilities.find((a) => a.id === 'cross_it_out')!;
    expect(cross.unlockedByDefault).toBe(false);
    expect(cross.requires.flagsSet).toEqual(['knows:how_to_cross_out']);
    expect(cross.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(cross.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const grant = steps.find(({ step }) => step.rewards.abilities.includes('cross_it_out'))!;
    expect(grant.step.rewards.flags).toContain('knows:how_to_cross_out');
    // Ruth's margin, Wenna's letter, Emeric, or the player's own eyes on Kai's hand.
    expect(grant.step.succeedWhenAny.length).toBeGreaterThanOrEqual(4);
  });

  it('charges the one price nothing else in the world charges', () => {
    const cross = story.abilities.find((a) => a.id === 'cross_it_out')!;
    expect(cross.costs.map((c) => c.resourceId)).toContain('loosening');
    const others = story.abilities.filter((a) => a.id !== 'cross_it_out' && a.costs.some((c) => c.resourceId === 'loosening'));
    expect(others).toEqual([]);
  });
});

describe('the fog in the north is optional and behaves like it', () => {
  it('hides the whole lead behind a flag only a curious player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_last_line')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_stilling_speaks']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_stilling_speaks'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('leaves every ending but one reachable without it', () => {
    const lead = new Set(['the_last_line_crossed', 'through_the_gate', 'fog_answered', 'turned_back_from_the_fog']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => lead.has(f)));
    expect(ordinary.length).toBe(story.endings.length - 1);
  });

  it('keeps the road to it shut until something opens it', () => {
    const gate = story.locations.find((l) => l.id === 'north_gate')!;
    const road = gate.connections.find((c) => c.to === 'edge_of_stilling')!;
    expect(road.lockedByFlag).toBe('north_road_open');
    expect(story.locations.find((l) => l.id === 'edge_of_stilling')!.discoveredByDefault).toBe(false);
  });
});

describe('seven people, not seven functions', () => {
  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} keeps nothing back`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(4);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('gives Mira limits, a want of her own, and a way to refuse', () => {
    const mira = character('mira');
    expect(mira.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(mira.fears.length).toBeGreaterThanOrEqual(2);
    expect(mira.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(mira.secrets.length).toBeGreaterThanOrEqual(2);
    // She stopped the sword. That is not the same as trusting the person under it.
    expect(mira.startingRelationship.trust).toBeLessThan(25);
  });

  it('starts the hero closer to the player than anybody, because he is from home', () => {
    const kai = character('kai');
    for (const other of story.characters.filter((c) => c.id !== 'kai')) {
      expect(kai.startingRelationship.trust, other.id).toBeGreaterThan(other.startingRelationship.trust);
    }
  });

  it('keeps the voices apart', () => {
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

  it('does not let two people share a construction', () => {
    const MOVES = [/\bI(?: am|’m|'m) not (?:saying|telling|asking)\b/i, /\bnot \w+, but\b/i, /\bthe kind of \w+ that\b/i, /\bIt is written\b/];
    for (const move of MOVES) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => move.test(v)));
      expect(users.length, String(move)).toBeLessThanOrEqual(1);
    }
  });

  it('keeps each voice’s signature where the bible puts it', () => {
    expect(character('odile').voiceSamples.join(' ')).not.toMatch(/\b\w+’(?:t|s|re|ll|ve|d|m)\b|\b\w+'(?:t|re|ll|ve|d|m)\b/);
    expect(character('odile').voiceSamples.join(' ')).toMatch(/\bfriend\b/);
    // Odile's signature only means something if the people around her do contract.
    for (const id of ['kai', 'mira', 'bet']) {
      expect(character(id).voiceSamples.join(' '), id).toMatch(/\b\w+’(?:t|s|re|ll|m)\b/);
    }
    expect(character('kai').voiceSamples.join(' ')).toMatch(/\bOkay\b/);
    expect(character('kai').voiceSamples.join(' ')).toMatch(/\bHonestly\b/);
    expect(character('severin').voiceSamples.join(' ')).toMatch(/It is written/);
    expect(character('emeric').voiceSamples.join(' ')).toMatch(/\bFolio\b/);
    expect(character('ilsabet').voiceSamples.some((v) => (v.match(/\?/g) ?? []).length >= 2)).toBe(true);
    expect(character('bet').voiceSamples.join(' ')).toMatch(/\bMother\b/);
    expect(character('mira').voiceSamples.every((v) => /\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|forty|hundred)\b/i.test(v) || v.length < 70)).toBe(true);
  });

  it('puts the three faces of the cover first, the way the cover reads the cast', () => {
    expect(story.characters.slice(0, 3).map((c) => c.id)).toEqual(['mira', 'kai', 'odile']);
    for (const c of story.characters) expect(c.appearance.length, c.id).toBeGreaterThan(40);
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

  it('has exactly one thing rest restores, and it is the player’s nerve', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
  });

  it('makes a public fight raise the church’s scrutiny and cost the church’s standing', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW and the first faction, in array order.
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(story.factions[0]!.id).toBe('faction_church');
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
    for (const l of story.locations) expect(l.stageImage, l.id).toBeNull();
    const derived = withDerivedAssetKeys(story);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(key, String(key)).toMatch(/^story_the_hero_s_spare\//);
  });

  it('describes the cover by costume and pose, never by age', () => {
    expect(story.coverDirection.length).toBeGreaterThan(100);
    expect(story.coverDirection).not.toMatch(/\d|year-old|young|teen|girl|boy/i);
  });

  it('gives the cover its own TITLE line, spelled exactly, with effects kept off faces', () => {
    // A TITLE: line owns the lettering: generatedCoverPrompt drops its generic lower-third rules for it.
    const title = story.coverDirection.slice(story.coverDirection.indexOf('TITLE:'));
    expect(story.coverDirection).toMatch(/\bTITLE:/);
    expect(title).toContain(`spelled exactly ${story.title.toUpperCase()}`);
    expect(title).toMatch(/upper third/);
    expect(title).toMatch(/No other text anywhere\.$/);
    expect(story.coverDirection).toMatch(/FACE STAYS CLEAN/);
    expect(story.coverDirection).toMatch(/never on a face/);
    // The gold writing is the story's hook, and on a cover it must not turn into stray lettering.
    expect(story.coverDirection).toMatch(/nothing that reads as writing/);
  });

  it('names the panel character first, inside the 200-character alt', () => {
    const alt = story.openingPanel!.alt;
    expect(alt.length).toBeLessThanOrEqual(200);
    // The panel is drawn with this character's portrait as its reference image.
    expect(alt.startsWith('Mira ')).toBe(true);
    expect(story.opening).toMatch(/Sergeant Mira Holt/);
  });

  it('opens straight on the scene and leaves the release date to release day', () => {
    expect(story.prologue).toEqual([]);
    expect(isReleaseDate(story.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });
});

describe('the pipeline’s fixture rules', () => {
  // Production reads hard canon, quest items and each background's starting
  // abilities. It never reads resources, step notes or locked abilities.
  it('puts the power in a starting item every player holds', () => {
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('circle_script');
    const script = story.items.find((i) => i.id === 'circle_script')!;
    expect(script.questItem).toBe(true);
    expect(script.droppable).toBe(false);
    expect(start(null).player.inventory.map((i) => i.itemId)).toContain('circle_script');
  });

  it('starts every background with Read the Script, plus one of its own', () => {
    for (const option of story.archetypes) {
      expect(option.startingAbilities[0], option.id).toBe('read_the_script');
      expect(option.startingAbilities.length, option.id).toBe(2);
      expect(option.startingAbilities, option.id).not.toContain('cross_it_out');
    }
    const brief = worldBrief(story, 'arch_electrician');
    expect(brief).toContain('Can: Read the Script');
    expect(brief).toContain('Can: Rig It');
  });

  it('gives every titled character the name people actually call them', () => {
    for (const id of ['mira', 'odile', 'emeric', 'ilsabet', 'severin']) {
      expect(character(id).calledName, id).toBe(character(id).name.split(' ')[0]);
    }
  });

  it('states every age in hard canon, where the storyteller reads it', () => {
    const canon = story.rules.hardCanon[0]!;
    for (const age of ['twenty-seven', 'twenty-two', 'fifty-two', 'seventy-one', 'twenty-six', 'thirty-eight', 'fifty-eight']) {
      expect(canon).toContain(age);
    }
  });
});

describe('the world plays', () => {
  it('runs a turn without an invalid narrative, including the cards and a bad answer', async () => {
    const state = start();
    for (const text of [
      'I look around.',
      'I ask her what is going on.',
      'I wait and say nothing.',
      'I punch the sergeant.',
      'I lie and tell them I am a famous wizard.',
      ...story.openingSuggestions,
    ]) {
      const result = await runTurn({
        story,
        state,
        memories: [],
        recentTurns: [],
        actionText: text,
        qualityTier: 'VIVID',
        turnId: 't1',
        seed: 'hero-s-spare-seed',
      });
      expect(result.report.valid, text).toBe(true);
      expect(result.narrative.blocks.length, text).toBeGreaterThan(0);
    }
  });
});

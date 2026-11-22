import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { EVERY_PLATFORM_A_WORLD } from './every-platform-a-world.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Every Platform a World, held to the promise on its own card: three hands on
 * one ticket, and a choice the player can make on turn one.
 *
 * The world is exposed to two opposite failures. The first is that the good
 * night leaks — the long way round gets handed over and the ticket stops
 * mattering. The second is that the good night is unreachable — a home light
 * nobody can give, a lamp nobody can stand at, a deadline nothing can stop. The
 * tests below are mostly about the second, because a sandbox with a dead end in
 * it is a corridor.
 *
 * This world is not in LAUNCH_CATALOG yet, so the catalogue-wide checks are
 * ported here and run against it directly.
 */

const story = EVERY_PLATFORM_A_WORLD;

const start = (archetypeId = 'arch_nights') =>
  createInitialState({
    sessionId: 'sess_epaw',
    story,
    identity: {
      displayName: 'Sam Ashworth',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): string[] => text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

function settable(): Set<string> {
  const flags = new Set<string>();
  for (const quest of story.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  for (const character of story.characters) {
    for (const leave of character.companion?.leavesWhen ?? []) for (const flag of leave.setsFlags) flags.add(flag);
  }
  return flags;
}

const canBeSet = (flag: string): boolean => settable().has(flag) || engineSets(flag);

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

describe('ids and art follow the house conventions', () => {
  it('uses the slug everywhere it should', () => {
    expect(story.id).toBe('sv_every_platform_a_world_1');
    expect(story.storyId).toBe('story_every_platform_a_world');
    expect(story.version).toBe(1);
  });

  it('derives every generated-art key under the story prefix', () => {
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage).toBe('story_every_platform_a_world/cover');
    expect(derived.keyArt).toBe('story_every_platform_a_world/key');
    for (const character of derived.characters) {
      expect(character.portrait, character.id).toBe(`story_every_platform_a_world/${character.id}`);
    }
    expect(story.openingPanel?.assetKey).toBe('story_every_platform_a_world/opening');
    expect(story.openingPanel!.alt.length).toBeLessThanOrEqual(200);
  });

  it('ships no hand-written art keys, so nothing points at art that does not exist', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    for (const character of story.characters) expect(character.portrait, character.id).toBeNull();
  });
});

describe('the opener is a choice, not a lore dump', () => {
  const opening = story.opening;

  it('is short enough to read on one phone screen', () => {
    const count = words(opening).length;
    expect(count).toBeGreaterThanOrEqual(50);
    expect(count).toBeLessThanOrEqual(120);
  });

  it('has a named character speak inside the first sixty words', () => {
    const first60 = words(opening).slice(0, 60).join(' ');
    const names = story.characters.map((c) => calledName(c));
    const named = names.filter((n) => new RegExp(`\\b${n}\\b`).test(first60));
    expect(named, 'nobody is named in the first sixty words').not.toEqual([]);
    expect(first60).toMatch(/"/);
  });

  it('ends on a direct question', () => {
    expect(opening.trim().replace(/["”’]+$/, '')).toMatch(/\?$/);
  });

  it('asks the player to know no proper noun the opener does not introduce', () => {
    const tokens = opening.split(/\s+/).filter(Boolean);
    const proper: string[] = [];
    tokens.forEach((raw, i) => {
      const startsQuote = /^["“‘]/.test(raw);
      const word = raw.replace(/^[^A-Za-z]+/, '').replace(/[^A-Za-z’']+$/, '');
      if (!/^[A-Z]/.test(word)) return;
      const previous = tokens[i - 1];
      const sentenceStart = i === 0 || startsQuote || (previous !== undefined && /[.!?]["”’]?$/.test(previous));
      if (sentenceStart) return;
      proper.push(word);
    });
    const allowed = new Set(['I', 'Ren']);
    expect(proper.filter((w) => !allowed.has(w))).toEqual([]);
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [story.premise, story.opening, story.hook, ...story.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });

  it('offers three distinct moves: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions).toHaveLength(3);
    expect(new Set(story.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/"/);
    expect(done).toMatch(/^I /);
    expect(risky).toMatch(/^I /);
    expect(risky).toMatch(/"/);
    for (const card of story.openingSuggestions) expect(card).toMatch(/\bI\b/);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('puts all three travellers at the counter on turn one, and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['ren', 'okafor', 'isolde']));
    expect(present).not.toContain('conductor');
    expect(present).not.toContain('ida');
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    const placed = (c: (typeof story.characters)[number]) =>
      c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) || c.homeLocationId !== null;
    expect(story.characters.filter((c) => !placed(c)).map((c) => c.id)).toEqual([]);
  });
});

describe('the premise and card read cleanly', () => {
  it('fits the content bar', () => {
    const paragraphs = story.premise.split(/\n\s*\n/);
    const total = words(story.premise).length;
    expect(total).toBeGreaterThanOrEqual(120);
    expect(total).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(story.promises.length).toBeGreaterThanOrEqual(3);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    expect(story.rules.startingItems.length).toBeGreaterThan(0);
    expect(story.rules.hardCanon.length).toBeGreaterThan(0);
    expect(story.rules.styleExamples.length).toBeLessThanOrEqual(3);
  });

  it('passes the clarity standard with no errors and no missing questions', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const missing = checkNarrativeClarity(story.premise, { story, kind: 'premise' }).issues.filter((i) =>
      i.code.startsWith('MISSING_'),
    );
    expect(missing.map((m) => m.code)).toEqual([]);
  });

  it('has no choice-clarity errors on any setup screen', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(story);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual(
      [],
    );
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    for (const a of story.archetypes) {
      expect(a.name, a.id).not.toContain('—');
      expect(a.name.length, a.id).toBeLessThanOrEqual(28);
      expect(a.role.length, a.id).toBeGreaterThan(2);
      expect(a.summary.length, a.id).toBeGreaterThan(40);
    }
    const shapes = story.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(shapes).size).toBe(shapes.length);
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

describe('checkpoint invariants', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ...story.archetypes.flatMap((a) => a.startingAbilities),
    ]);
    const stranded = story.abilities.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(stranded).toEqual([]);
  });

  it('writes every card blurb to the player', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge', () => {
    const orphans = story.locations.filter(
      (l) => !story.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id)),
    );
    expect(orphans.map((l) => l.id)).toEqual([]);
  });
});

describe('the catalogue checks, run against this world', () => {
  it('has more than one way through, and closes something when a route is taken', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
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
    const broken: string[] = [];
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:') && !grantable.has(flag.slice(5))) broken.push(`${where} needs ${flag}`);
      }
      for (const itemId of route.predicate.hasItems) if (!obtainable.has(itemId)) broken.push(`${where} needs ${itemId}`);
    }
    expect(broken).toEqual([]);
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      const demanded = [...(step.succeedWhen?.hasItems ?? []), ...step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)];
      for (const itemId of demanded) expect(granted.has(itemId), `${quest}/${step.id} ${itemId}`).toBe(false);
    }
  });

  it('points only at things that exist', () => {
    const locIds = new Set(story.locations.map((l) => l.id));
    const itemIds = new Set(story.items.map((i) => i.id));
    const charIds = new Set(story.characters.map((c) => c.id));
    const abIds = new Set(story.abilities.map((a) => a.id));
    const facIds = new Set(story.factions.map((f) => f.id));
    const resIds = new Set(story.resources.map((r) => r.id));
    const broken: string[] = [];
    for (const l of story.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of story.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} ${r.factionId}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} teaches ${ab}`);
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
    expect(broken).toEqual([]);
  });

  it('reads no flag that nothing can set', () => {
    const read: Array<[string, string]> = [];
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) read.push([q.id, f]);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) for (const f of p?.flagsSet ?? []) read.push([st.id, f]);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) read.push([r.routeId, f]);
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) read.push([g.id, f]);
    for (const e of story.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) read.push([e.id, f]);
    for (const e of story.endings) for (const f of e.requires.flagsSet) read.push([e.id, f]);
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) read.push([a.id, f]);
    for (const l of story.locations) for (const c of l.connections) if (c.lockedByFlag) read.push([`${l.id}->${c.to}`, c.lockedByFlag]);
    const dead = read.filter(([, f]) => !canBeSet(f)).map(([where, f]) => `${where} reads ${f}`);
    expect(dead).toEqual([]);
  });

  it('never uses a relationship gate id as a flag', () => {
    const gateIds = new Set(story.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const all = JSON.stringify([story.quests, story.endings, story.worldEvents, story.abilities]);
    for (const id of gateIds) expect(all.includes(`"${id}"`), id).toBe(false);
  });

  it('lets no two takeable items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of story.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    expect([...owners.entries()].filter(([, s]) => s.size > 1).map(([a]) => a)).toEqual([]);
  });

  it('can reach every faction threshold it asks for', () => {
    const ceiling = (factionId: string): number => {
      const faction = story.factions.find((f) => f.id === factionId)!;
      const fromArchetype = Math.max(
        0,
        ...story.archetypes.map((a) => a.startingReputation.find((r) => r.factionId === factionId)?.amount ?? 0),
      );
      const fromRewards = story.quests
        .flatMap((q) => q.steps.flatMap((s) => s.rewards.reputation))
        .filter((r) => r.factionId === factionId && r.amount > 0)
        .reduce((sum, r) => sum + r.amount, 0);
      return faction.startingReputation + fromArchetype + fromRewards;
    };
    const asks = [
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
      ...story.quests.flatMap((q) =>
        q.steps.flatMap((s) => [
          ...(s.enterWhen?.minFactionReputation ?? []),
          ...s.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation),
        ]),
      ),
    ];
    for (const ask of asks) expect(ceiling(ask.factionId), ask.factionId).toBeGreaterThanOrEqual(ask.value);
  });

  it('draws every expression and names everybody distinctly', () => {
    const unknown = story.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
    const shortNames = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(shortNames).size).toBe(shortNames.length);
    expect(calledName(story.characters.find((c) => c.id === 'okafor')!)).toBe('Okafor');
    expect(calledName(story.characters.find((c) => c.id === 'isolde')!)).toBe('Isolde');
  });
});

describe('three hands, one ticket, and a long way round', () => {
  it('lets the ticket go to any of the three, on their own platform', () => {
    const whoRides = story.quests.find((q) => q.id === 'q_one_ticket')!.steps.find((s) => s.id === 'who_rides')!;
    const platforms = whoRides.succeedWhenAny.map((r) => r.predicate.atLocation).filter(Boolean);
    expect(platforms).toEqual(expect.arrayContaining(['platform_four', 'platform_six', 'platform_eight']));
    expect(whoRides.succeedWhenAny.some((r) => r.setsFlags.includes('kept_the_ticket'))).toBe(true);
  });

  it('relights each dark line from home, with the right light on the right platform, in a quest of its own', () => {
    const triples: Array<[string, string, string, string]> = [
      ['q_relight_four', 'clan_flame', 'platform_four', 'lamp_four_lit'],
      ['q_relight_six', 'survey_beacon', 'platform_six', 'lamp_six_lit'],
      ['q_relight_eight', 'moonstone_ring', 'platform_eight', 'lamp_eight_lit'],
    ];
    for (const [questId, item, platform, flag] of triples) {
      const quest = story.quests.find((q) => q.id === questId)!;
      expect(quest, questId).toBeDefined();
      expect(quest.discoverWhen?.flagsSet).toEqual(['knows:home_light']);
      // One step, one route: the engine closes a step on its first matching
      // route, so a shared step could relight only one lamp all night.
      expect(quest.steps).toHaveLength(1);
      const [route] = quest.steps[0]!.succeedWhenAny;
      expect(quest.steps[0]!.succeedWhenAny).toHaveLength(1);
      expect(route!.predicate.hasItems).toContain(item);
      expect(route!.predicate.atLocation).toBe(platform);
      expect(route!.setsFlags).toContain(flag);
      expect(route!.predicate.flagsSet).toContain('used:relight_a_lamp');
      expect(quest.steps[0]!.rewards.flags).toContain('a_lamp_relit');
    }
  });

  it('can light every dark lamp from at least two different quests', () => {
    for (const flag of ['lamp_four_lit', 'lamp_six_lit', 'lamp_eight_lit']) {
      const quests = new Set(routes.filter(({ route }) => route.setsFlags.includes(flag)).map(({ quest }) => quest));
      expect(quests.size, flag).toBeGreaterThanOrEqual(2);
    }
  });

  it('sends a second rider on the mended ticket, to any of the three platforms', () => {
    const half = story.quests.find((q) => q.id === 'q_the_other_half')!;
    const second = half.steps.find((s) => s.id === 'second_rider')!;
    expect(half.steps.indexOf(second)).toBe(half.steps.findIndex((s) => s.id === 'mend_it') + 1);
    const platforms = second.succeedWhenAny.map((r) => r.predicate.atLocation);
    expect(platforms).toEqual(['platform_four', 'platform_six', 'platform_eight']);
    for (const r of second.succeedWhenAny) expect(r.predicate.hasItems).toContain('mended_ticket');
  });

  it('makes every lit platform a place you can actually ride to and back from', () => {
    const concourse = story.locations.find((l) => l.id === 'the_concourse')!;
    const lit = ['salt_coast', 'glass_desert', 'bridge_city', 'owl_market', 'giants_snowfield', 'one_tree_forest'];
    for (const id of lit) {
      const place = story.locations.find((l) => l.id === id);
      expect(place, id).toBeDefined();
      expect(place!.discoveredByDefault, id).toBe(true);
      expect(concourse.connections.some((c) => c.to === id && !c.lockedByFlag), id).toBe(true);
      expect(place!.connections.some((c) => c.to === 'the_concourse'), id).toBe(true);
      expect(place!.description, id).toMatch(/last one to Lantern Cross|last train back|the train back|The way back/i);
    }
    const positions = story.locations.map((l) => `${l.mapPosition.x},${l.mapPosition.y}`);
    expect(new Set(positions).size).toBe(positions.length);
  });

  it('lets a player who crosses over be caught on the wrong side of dawn', () => {
    const crossers = routes.filter(({ route }) => route.setsFlags.includes('you_crossed_over'));
    const places = new Set(crossers.map(({ route }) => route.predicate.atLocation));
    for (const id of ['akebono_road', 'long_patience', 'moonward_court']) expect(places.has(id), id).toBe(true);
    const step = story.quests.find((q) => q.id === 'q_another_world')!.steps[0]!;
    for (const r of step.succeedWhenAny) expect(r.predicate.flagsSet).toEqual([]);
  });

  it('only closes the ticket as kept once the punch can no longer reach any deadline', () => {
    const whoRides = story.quests.find((q) => q.id === 'q_one_ticket')!.steps.find((s) => s.id === 'who_rides')!;
    const kept = whoRides.succeedWhenAny.find((r) => r.routeId === 'kept_it')!;
    const burns = story.worldEvents.find((e) => e.id === 'we_akebono_burns')!.atWorldMinute;
    expect(kept.predicate.afterWorldMinute).toBeGreaterThan(burns);
  });

  it('hides the long way behind a lead and a locked ability, in the world’s own words', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_long_way')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_handover']);
    const relight = story.abilities.find((a) => a.id === 'relight_a_lamp')!;
    expect(relight.unlockedByDefault).toBe(false);
    expect(relight.requires?.flagsSet).toEqual(['knows:home_light']);
    expect(relight.requires!.lockedCopy.length).toBeGreaterThan(30);
    expect(relight.requires!.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    expect(lead.steps[0]!.rewards.abilities).toContain('relight_a_lamp');
    expect(lead.steps[0]!.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
  });

  it('keeps Isolde’s lie private and findable', () => {
    const isolde = story.characters.find((c) => c.id === 'isolde')!;
    const lie = isolde.secrets.find((s) => s.id === 'isolde_the_lie')!;
    expect(lie.visibility).toBe('NPC_PRIVATE');
    expect(routes.some(({ route }) => route.setsFlags.includes('knows:isolde_lied'))).toBe(true);
  });

  it('runs the deadlines in order, and lets the player switch each one off', () => {
    const at = (id: string) => story.worldEvents.find((e) => e.id === id)!;
    const order = ['we_moonset', 'we_the_air_runs_out', 'we_akebono_burns', 'we_dawn'].map((id) => at(id).atWorldMinute);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(order[0]!).toBeGreaterThan(story.rules.startWorldMinute);
    for (const id of ['we_moonset', 'we_the_air_runs_out', 'we_akebono_burns', 'we_every_lamp_out']) {
      expect(at(id).cancelledByFlags.length, id).toBeGreaterThan(0);
    }
  });

  it('only cancels events with flags somebody can actually set', () => {
    for (const event of story.worldEvents) {
      for (const flag of [...event.cancelledByFlags, ...event.requiresFlags]) {
        expect(canBeSet(flag), `${event.id}: ${flag}`).toBe(true);
      }
    }
  });

  it('gives the lamp at dawn more than one keeper', () => {
    const keepers = routes.filter(({ route }) => route.setsFlags.includes('someone_at_the_lamp'));
    expect(keepers.length).toBeGreaterThanOrEqual(3);
    expect(keepers.some(({ route }) => route.setsFlags.includes('handed_the_lamp'))).toBe(true);
  });
});

describe('endings', () => {
  it('uses the whole rarity range, inside what the storyteller is shown', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.length).toBeLessThanOrEqual(12);
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });

  it('writes every ending properly', () => {
    for (const e of story.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) expect(canBeSet(f), `${e.id}: ${f}`).toBe(true);
    }
  });

  it('lets the night run out on a player who never chose', () => {
    const nobody = story.endings.find((e) => e.id === 'end_nobody_rides')!;
    expect(nobody.requires.minRelationship).toEqual([]);
    expect(nobody.requires.hasItems).toEqual([]);
  });

  it('lets somebody walk off the job, and reaches that early', () => {
    const walk = story.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk).toBeDefined();
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });
});

describe('voices', () => {
  const content = (text: string) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(story.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of story.characters) {
      for (const b of story.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        expect(shared / Math.min(va.size, vb.size), `${a.id}/${b.id}`).toBeLessThan(0.3);
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
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    expect(sample('ren')).toMatch(/stationmaster/i);
    expect(sample('okafor')).toMatch(/Item one/);
    expect(sample('okafor')).toMatch(/Copy\./);
    expect(sample('isolde')).toMatch(/Darling/);
    expect(sample('conductor')).toMatch(/Correct\./);
    expect(sample('conductor')).toMatch(/\d\d:\d\d/);
    expect(sample('ida')).toMatch(/\blove\b/);
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources.length).toBe(3);
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

  it('has exactly one thing rest can restore, and spends it by default', () => {
    const high = story.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['stamina']);
  });

  it('lands public violence on the lamps and the Night Staff', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('dimming');
    expect(story.factions[0]?.id).toBe('faction_station');
  });

  it('lets every descending variable rise and settle', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(r.regenPerHour, r.id).toBeLessThan(0);
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });
});

describe('content: adults, 13+, original', () => {
  const MINOR = /\b(child|children|kid|kids|teen|teens|teenage|teenager|boy|boys|girl|girls|schoolgirl|schoolboy|student|students|pupil|underage|minor|youngster|juvenile|loli|shota|high school|middle school)\b/i;

  it('never describes anyone in words that read as a minor', () => {
    const fields = [
      story.premise,
      story.opening,
      story.hook,
      ...story.characters.flatMap((c) => [
        c.name,
        c.role,
        c.cardBlurb,
        c.appearance,
        c.visualHook,
        c.silhouette,
        c.speechStyle,
        c.socialStyle,
        ...c.publicTraits,
        ...c.voiceSamples,
        ...c.hiddenDrives,
        ...c.secrets.map((s) => s.fact),
      ]),
      ...story.archetypes.flatMap((a) => [a.summary, a.blurb]),
    ];
    const hits = fields.filter((f) => MINOR.test(f)).map((f) => f.slice(0, 60));
    expect(hits).toEqual([]);
  });

  it('states every cast member’s adult age in the bible', async () => {
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/38_EVERY_PLATFORM_A_WORLD.md', import.meta.url),
      'utf8',
    );
    const headings = bible.split('\n').filter((line) => line.startsWith('### '));
    for (const c of story.characters) {
      const heading = headings.find((h) => h.includes(calledName(c)));
      expect(heading, c.id).toBeDefined();
      const age = Number(heading!.split('—')[1]?.match(/\d+/)?.[0]);
      expect(age, c.id).toBeGreaterThanOrEqual(18);
    }
    expect(bible).toMatch(/player is an adult/i);
  });

  it('borrows no franchise names', () => {
    const BANNED =
      /\b(galaxy express|harry potter|hogwarts|nine and three|9 ?3\/4|ghibli|spirited away|chihiro|demon slayer|hashira|one piece|naruto|akatsuki|itachi|hellsing|alucard|dracula|castlevania|starfleet|gundam|evangelion|konosuba|re:zero|mushoku|wonka|tardis|polar express)\b/i;
    expect(JSON.stringify(story)).not.toMatch(BANNED);
  });

  it('keeps romance and violence inside the rating', () => {
    expect(story.rules.allowsRomance).toBe(true);
    expect(story.intensity).toBe('MODERATE');
    expect(story.rules.toneGuide).toMatch(/at most a kiss/);
    const isolde = story.characters.find((c) => c.id === 'isolde')!;
    expect(isolde.boundaries.join(' ')).toMatch(/feed/);
  });
});

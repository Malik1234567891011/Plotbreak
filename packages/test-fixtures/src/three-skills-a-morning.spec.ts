import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { checkStoryChoiceClarity, checkStoryClarity } from '@plotbreak/director';
import { THREE_SKILLS_A_MORNING } from './three-skills-a-morning.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Three Skills a Morning, held to its own card: three cards at dawn, a gallows
 * at noon, a dragon's rent at sundown, and every one of the three cards a
 * different way to win.
 *
 * The world is not registered in the launch catalog yet, so the catalog's
 * structural battery runs here against this one story. When it is registered,
 * the catalog specs pick it up and the duplicated half of this file can go.
 *
 * The failure this world is most exposed to is a card that turns out to be the
 * only real answer. If [Read Lies] solves the morning and the other two are
 * flavour, the draw is a quiz with one right answer and the first decision of
 * the game is a trap. So most of what is specific here checks that each card,
 * and keeping none of them, has a road of its own to the noon bell.
 */

const story = THREE_SKILLS_A_MORNING;

const start = (archetypeId = 'arch_paralegal') =>
  createInitialState({
    sessionId: 'sess_tsam',
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

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  (step.succeedWhenAny ?? []).map((route) => ({ quest, step: step.id, route })),
);
const step = (questId: string, stepId: string) =>
  story.quests.find((q) => q.id === questId)!.steps.find((s) => s.id === stepId)!;
const route = (routeId: string) => routes.find((r) => r.route.routeId === routeId)!.route;
const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

/** Every flag something in this world can set, or the engine sets on its own. */
const settable = (): Set<string> => {
  const flags = new Set<string>();
  for (const q of story.quests) {
    for (const st of q.steps) {
      for (const f of st.rewards.flags) flags.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) flags.add(f);
    }
  }
  for (const e of story.worldEvents) for (const f of e.setsFlags) flags.add(f);
  return flags;
};
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (f: string): boolean => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', story.premise],
      ['opening', story.opening],
      ['hook', story.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const suggestion of story.openingSuggestions) expect(suggestion).not.toContain('\\n');
  });

  it('is English and carries no franchise vocabulary', () => {
    const all = JSON.stringify(story);
    expect(all).not.toMatch(/\bquirk|\bnen\b|chakra|hokage|hunter association|system window|skill draft/i);
    expect(all, 'em-dash in authored copy').not.toContain('—');
  });

  it('keeps the asset prefix the image pipeline will look for', () => {
    expect(story.id).toBe('sv_three_skills_a_morning_1');
    expect(story.storyId).toBe('story_three_skills_a_morning');
    expect(story.openingPanel?.assetKey.startsWith('story_three_skills_a_morning/')).toBe(true);
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage).toContain('story_three_skills_a_morning');
    for (const c of derived.characters) expect(c.portrait, c.id).toContain('story_three_skills_a_morning');
  });
});

describe('the opener drops you into the square and asks', () => {
  const opening = story.opening;
  const cast = story.characters.flatMap((c) => [c.name, calledName(c)]);

  it('has a named character speak to the player inside the first sixty words', () => {
    const first60 = words(opening).slice(0, 60).join(' ');
    expect(first60).toContain('"Morning, stranger,"');
    expect(cast.some((name) => first60.includes(`says ${name}`))).toBe(true);
  });

  it('ends on a direct question that needs answering now', () => {
    expect(opening.trim()).toMatch(/\?["”]$/);
    expect(opening.trim().endsWith('Do you speak for her?"')).toBe(true);
  });

  it('stays inside a hundred and twenty words', () => {
    expect(words(opening).length).toBeLessThanOrEqual(120);
  });

  it('names nobody the player has not just been shown', () => {
    const allowed = new Set(
      [
        ...story.characters.flatMap((c) => c.name.split(/\s+/)),
        'Dragon', 'Tongue', 'Perfect', 'Cooking', 'Read', 'Lies',
      ].map((w) => w.toLowerCase()),
    );
    const strangers: string[] = [];
    for (const match of opening.matchAll(/[A-Z][A-Za-z’']*/g)) {
      const word = match[0].replace(/[’'].*$/, '');
      if (allowed.has(word.toLowerCase())) continue;
      const before = opening.slice(0, match.index);
      const trimmed = before.replace(/["“”[\]\s]+$/, '');
      const sentenceInitial = trimmed === '' || /[.?!,]$/.test(trimmed) || /\n\s*["“[]?$/.test(before);
      if (!sentenceInitial) strangers.push(word);
    }
    expect(strangers, 'capitalised words that are neither cast, card nor sentence start').toEqual([]);
  });

  it('offers three answers: one said, one done, one risky', () => {
    const cards = story.openingSuggestions;
    expect(cards).toHaveLength(3);
    const said = cards.filter((c) => /"/.test(c));
    const done = cards.filter((c) => !/"/.test(c));
    expect(said.length).toBeGreaterThanOrEqual(1);
    expect(done.length).toBeGreaterThanOrEqual(1);
    expect(cards.some((c) => /gallows/i.test(c) && /prove/i.test(c)), 'no risky card').toBe(true);
    // Each card touches a different one of the three, so the first tap is the draw.
    for (const card of ['Perfect Cooking', 'Read Lies', 'Dragon Tongue']) {
      expect(cards.filter((c) => c.includes(card)), card).toHaveLength(1);
    }
  });

  it('owes the knight an answer by noon, on the record', () => {
    const owed = story.openingObligations.find((o) => o.withCharacterId === 'garrot')!;
    expect(owed.what).toMatch(/noon/);
    expect(story.rules.startWorldMinute + owed.dueInMinutes).toBe(12 * 60);
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const ungranted = story.abilities.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(ungranted, 'gated abilities nothing ever grants').toEqual([]);
  });

  it('writes every character card to the player', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('connects something to every location', () => {
    const lonely = story.locations.filter(
      (l) => !story.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id)),
    );
    expect(lonely.map((l) => l.id), 'locations with no inbound edge').toEqual([]);
  });
});

describe('the catalog battery, run against this one world', () => {
  it('has more than one way through', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
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
    for (const { quest, step: stepId, route: r } of routes) {
      const where = `${quest}/${stepId}/${r.routeId}`;
      for (const flag of r.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of r.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step: st } of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      const demanded = [
        ...(st.succeedWhen?.hasItems ?? []),
        ...(st.succeedWhenAny ?? []).flatMap((r) => r.predicate.hasItems),
      ];
      for (const itemId of demanded) expect(granted.has(itemId), `${quest}/${st.id}`).toBe(false);
    }
  });

  it('gives every archetype something the rules can see', () => {
    for (const a of story.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
    }
  });

  it('leaves real things to take, owned by real people', () => {
    const takeable = story.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    for (const entry of takeable) {
      expect(story.items.some((i) => i.id === entry.itemId), entry.itemId).toBe(true);
      if (entry.ownerId) expect(story.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
    }
  });

  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of story.locations) {
      for (const item of l.takeableItems) {
        for (const alias of item.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, ids]) => ids.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
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
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of story.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} -> ${x}`);
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const o of story.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
          for (const f of pred.flagsSet) {
            if (f.startsWith('used:') && !abIds.has(f.slice(5))) broken.push(`${st.id} uses ${f}`);
            if (f.startsWith('visited:') && !locIds.has(f.slice(8))) broken.push(`${st.id} visits ${f}`);
            if (f.startsWith('spoke:') && !charIds.has(f.slice(6))) broken.push(`${st.id} speaks ${f}`);
            if (f.startsWith('engaged:') && !charIds.has(f.slice(8))) broken.push(`${st.id} engages ${f}`);
          }
        }
      }
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates something behind a flag nothing can set', () => {
    const declared = settable();
    const read = (flags: readonly string[]) => flags.forEach((f) => declared.add(f));
    for (const q of story.quests) {
      if (q.discoverWhen) read(q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) read(p.flagsSet);
        for (const r of st.succeedWhenAny) read(r.predicate.flagsSet);
      }
    }
    for (const c of story.characters) for (const g of c.gates) read(g.requires.flagsSet);
    for (const e of story.worldEvents) read([...e.requiresFlags, ...e.cancelledByFlags]);

    const dead: string[] = [];
    for (const e of story.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) if (!declared.has(f) && !engineSets(f)) dead.push(`${e.id}: ${f}`);
    }
    for (const a of story.abilities) {
      for (const f of a.requires?.flagsSet ?? []) if (!declared.has(f) && !engineSets(f)) dead.push(`${a.id}: ${f}`);
    }
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !declared.has(c.lockedByFlag) && !engineSets(c.lockedByFlag)) dead.push(`${l.id}->${c.to}`);
    }
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('only reads a knows: flag that something actually sets', () => {
    // `knows:` is not an engine prefix, so every one of them has to come from
    // a route, a reward or a world event, or the gate is a wall.
    const sets = settable();
    const read = new Set<string>();
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) read.add(f);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, ...st.succeedWhenAny.map((r) => r.predicate)]) for (const f of p?.flagsSet ?? []) read.add(f);
      }
    }
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) read.add(f);
    for (const l of story.locations) for (const c of l.connections) if (c.lockedByFlag) read.add(c.lockedByFlag);
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) read.add(f);
    const walls = [...read].filter((f) => !engineSets(f) && !sets.has(f));
    expect(walls, walls.join(', ')).toEqual([]);
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

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = story.characters.filter(
      (c) =>
        !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('schedules every character for the whole day, with no gaps', () => {
    for (const c of story.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]?.startMinute, c.id).toBe(0);
      expect(blocks[blocks.length - 1]?.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
    }
  });

  it('closes something when a route is taken', () => {
    expect(routes.some(({ route: r }) => r.closesFlags.length > 0)).toBe(true);
  });

  it('uses only expressions the generator draws', () => {
    const unknown = story.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives every character a short name of their own', () => {
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    expect(calledName(story.characters.find((c) => c.id === 'cotter')!)).toBe('Cotter');
    expect(calledName(story.characters.find((c) => c.id === 'garrot')!)).toBe('Garrot');
  });
});

describe('the copy passes the house clarity bar', () => {
  it('raises no clarity error on the premise or the opening', () => {
    const report = checkStoryClarity(story);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`)).toEqual([]);
  });

  it('raises no clarity error on the archetype screen', () => {
    const report = checkStoryChoiceClarity(story);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
    for (const a of story.archetypes) expect(a.name, a.id).not.toMatch(/—|forward and/i);
  });

  it('says what every ability does, whether it can fail and what it costs', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('keeps the premise and the label inside their windows', () => {
    const n = words(story.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(250);
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(story.premise).not.toMatch(/\bnot \w+(?: \w+)?, but\b|the kind of \w+ that/i);
  });
});

describe('the draw is the first real decision', () => {
  const draw = step('q_the_first_draw', 'the_draw');

  it('offers each of the three cards and offers keeping none', () => {
    expect(draw.succeedWhenAny.map((r) => r.routeId).sort()).toEqual(
      ['kept_dragon_tongue', 'kept_perfect_cooking', 'kept_read_lies', 'let_them_fade'].sort(),
    );
  });

  it('makes keeping one card close the other two', () => {
    const cards = ['read_lies', 'dragon_tongue', 'perfect_cooking'];
    for (const card of cards) {
      const r = route(`kept_${card}`);
      expect(r.predicate.flagsSet).toEqual([`used:keep_${card}`]);
      expect(r.setsFlags).toContain(`kept:${card}`);
      expect(r.setsFlags).toContain('drew_today');
      expect([...r.closesFlags].sort()).toEqual(cards.filter((c) => c !== card).map((c) => `kept:${c}`).sort());
    }
    expect([...route('let_them_fade').closesFlags].sort()).toEqual(cards.map((c) => `kept:${c}`).sort());
  });

  it('lets only one card be kept a morning, and charges a memory for it', () => {
    for (const id of ['keep_read_lies', 'keep_dragon_tongue', 'keep_perfect_cooking']) {
      const a = story.abilities.find((x) => x.id === id)!;
      expect(a.unlockedByDefault, id).toBe(true);
      expect(a.requires.flagsUnset, id).toEqual(['drew_today']);
      expect(a.costs.map((c) => c.resourceId), id).toEqual(['forgetting']);
    }
    const forgetting = story.resources.find((r) => r.id === 'forgetting')!;
    expect(forgetting.regenPerHour, 'what the cards take does not come back').toBe(0);
  });

  it('gives each card power only to the player who kept it, and only until they sleep', () => {
    const secondDawn = story.worldEvents.find((e) => e.setsFlags.includes('first_draw_spent'));
    expect(secondDawn, 'nothing ever ends day one’s card').toBeDefined();
    expect(secondDawn!.atWorldMinute).toBeGreaterThan(1440);
    for (const card of ['read_lies', 'dragon_tongue', 'perfect_cooking']) {
      const a = story.abilities.find((x) => x.id === card)!;
      expect(a.unlockedByDefault, card).toBe(false);
      expect(a.requires.flagsSet, card).toEqual([`kept:${card}`]);
      expect(a.requires.flagsUnset, card).toContain('first_draw_spent');
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('gives each card its own road past the noon bell, and the cardless a road too', () => {
    const noon = step('q_the_noon_bell', 'before_the_bell').succeedWhenAny;
    const needs = (card: string) => noon.filter((r) => r.predicate.flagsSet.includes(`used:${card}`));
    expect(needs('read_lies').length, 'Read Lies').toBeGreaterThan(0);
    expect(needs('dragon_tongue').length, 'Dragon Tongue').toBeGreaterThan(0);
    const cardless = noon.filter(
      (r) => !r.predicate.flagsSet.some((f) => /^used:(read_lies|dragon_tongue|perfect_cooking)$/.test(f)),
    );
    expect(cardless.length, 'a player who kept nothing cannot save her').toBeGreaterThanOrEqual(3);
    // Perfect Cooking's road runs through the rent, which is the deeper one.
    const rent = step('q_rent_day', 'pay_the_hill').succeedWhenAny;
    expect(rent.some((r) => r.predicate.flagsSet.includes('used:perfect_cooking'))).toBe(true);
  });

  it('puts the rules of the draw where the storyteller reads them', () => {
    // Production reads hard canon, the premise and quest items, never the
    // abilities list, so the draw has to live in those.
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/three cards/i);
    expect(canon).toMatch(/until the player next sleeps/i);
    expect(canon).toMatch(/memory/i);
    const drawItem = story.items.find((i) => i.id === 'morning_draw')!;
    expect(drawItem.questItem).toBe(true);
    expect(drawItem.description).toMatch(/\[Dragon Tongue\].*\[Perfect Cooking\].*\[Read Lies\]/);
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('morning_draw');
  });
});

describe('noon is a real clock', () => {
  it('has the condemned, the knight, the reeve and the witness in the square at dawn', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    for (const id of ['nell', 'garrot', 'cotter', 'pim']) expect(present, id).toContain(id);
    for (const id of ['haldis', 'ysolde', 'quell']) expect(present, id).not.toContain(id);
  });

  it('accepts silence as an answer and still lets the silent save her', () => {
    const answer = step('q_the_noon_bell', 'answer_the_knight');
    expect(answer.succeedWhenAny.map((r) => r.routeId)).toEqual(['spoke_for_her', 'stayed_silent']);
    expect(answer.rewards.flags).toContain('assize_answered');
    const bell = step('q_the_noon_bell', 'before_the_bell');
    expect(bell.enterWhen?.flagsSet).toEqual(['assize_answered']);
  });

  it('offers at least five lawful reasons, due at the bell', () => {
    const bell = step('q_the_noon_bell', 'before_the_bell');
    expect(bell.deadlineWorldMinute).toBe(12 * 60);
    expect(bell.succeedWhenAny.length).toBeGreaterThanOrEqual(5);
    for (const r of bell.succeedWhenAny) expect(r.setsFlags, r.routeId).toContain('nell_reprieved');
  });

  it('rings the bell unless something the player can do stops it', () => {
    const bell = story.worldEvents.find((e) => e.id === 'we_the_noon_bell')!;
    expect(bell.atWorldMinute).toBe(12 * 60);
    expect(bell.cancelledByFlags.length).toBeGreaterThan(0);
    const flags = settable();
    for (const f of bell.cancelledByFlags) expect(flags.has(f), f).toBe(true);
    expect(bell.directorNotes).toMatch(/never shown/i);
  });

  it('gives every scheduled pressure a way to be switched off, or a reason it cannot be', () => {
    const flags = settable();
    for (const e of story.worldEvents) {
      for (const f of e.cancelledByFlags) expect(flags.has(f), `${e.id}: ${f}`).toBe(true);
    }
    const sundown = story.worldEvents.find((e) => e.id === 'we_the_hill_stands_up')!;
    expect(sundown.cancelledByFlags).toEqual(expect.arrayContaining(['rent_paid', 'rent_deferred']));
  });
});

describe('everyone is an adult and the copy says so', () => {
  const AGES: Record<string, [number, RegExp]> = {
    nell: [24, /^Twenty-four,/],
    garrot: [52, /^Fifty-two,/],
    haldis: [400, /^About four hundred years old/],
    ysolde: [47, /^Forty-seven,/],
    cotter: [44, /^Forty-four,/],
    pim: [31, /^Thirty-one,/],
    quell: [39, /^Thirty-nine,/],
  };

  it('states an adult age at the top of every appearance', () => {
    expect(story.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    for (const c of story.characters) {
      const [age, pattern] = AGES[c.id]!;
      expect(age, c.id).toBeGreaterThanOrEqual(18);
      expect(c.appearance, c.id).toMatch(pattern);
    }
  });

  it('never uses a word that reads as young', () => {
    expect(JSON.stringify(story)).not.toMatch(
      /\b(girl|girls|boy|boys|teen|teens|teenage|teenager|child|children|kid|kids|minor|schoolgirl|schoolboy)\b/i,
    );
  });

  it('keeps romance at a kiss and says so to the writer', () => {
    expect(story.rules.toneGuide).toMatch(/up to a kiss/);
    expect(story.rules.toneGuide).toMatch(/never fan service/);
    expect(story.contentDescriptors).not.toContain('SEXUAL_CONTENT');
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
    const vocab = new Map(story.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of story.characters) {
      for (const b of story.characters) {
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
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared habit in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    expect(sample('nell')).toMatch(/stranger/);
    expect(sample('garrot')).toMatch(/Three times|Speaker/);
    expect(sample('ysolde')).toMatch(/lodger/);
    expect(sample('cotter')).toMatch(/In fairness/);
    expect(sample('pim')).toMatch(/right\?/);
    expect(sample('haldis')).toMatch(/Tenant|winters/);
    expect(sample('quell')).toMatch(/Let us be clear/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
      expect(c.artSeed, c.id).toBe(`tsam-${c.id}-01`);
      for (const s of c.secrets) expect(s.revealHint.length, s.id).toBeGreaterThan(10);
    }
  });

  it('never lets the reeve say a sentence Read Lies would catch', () => {
    // The whole design rests on this: the card breaks Pim and hears nothing
    // from Cotter, so [Read Lies] alone cannot solve the case.
    const cotter = story.characters.find((c) => c.id === 'cotter')!;
    expect(cotter.boundaries.join(' ')).toMatch(/never state an outright falsehood/i);
    expect(story.rules.hardCanon.join(' ')).toMatch(/does not catch silence, half-truths/);
  });
});

describe('where it can end', () => {
  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('lets somebody simply leave, and early', () => {
    const leave = story.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(leave).toBeDefined();
    expect(leave.minTurn).toBeLessThanOrEqual(22);
  });

  it('offers a loss reachable by doing nothing at all', () => {
    const bell = story.endings.find((e) => e.requires.flagsSet.includes('nell_hanged'));
    expect(bell, 'the hanging has no ending').toBeDefined();
    // `nell_hanged` comes from a world event with no requirement, so silence reaches it.
    const source = story.worldEvents.find((e) => e.setsFlags.includes('nell_hanged'))!;
    expect(source.requiresFlags).toEqual([]);
  });

  it('keeps the Door endings behind the cost having been noticed', () => {
    const door = story.worldEvents.find((e) => e.setsFlags.includes('door_offered'))!;
    expect(door.requiresFlags).toEqual(['knows:the_cost']);
    const unique = story.endings.filter((e) => e.rarity === 'UNIQUE');
    expect(unique.length).toBeGreaterThanOrEqual(2);
    expect(story.endings.filter((e) => e.rarity !== 'UNIQUE').length).toBeGreaterThanOrEqual(8);
  });

  it('tells the writer what each ending means', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    for (const e of story.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('never gates an ending on standing nobody can reach', () => {
    for (const e of story.endings) {
      for (const need of e.requires.minFactionReputation) {
        const faction = story.factions.find((f) => f.id === need.factionId)!;
        const earned = story.quests
          .flatMap((q) => q.steps.flatMap((s) => s.rewards.reputation))
          .filter((r) => r.factionId === need.factionId && r.amount > 0)
          .reduce((sum, r) => sum + r.amount, 0);
        expect(faction.startingReputation + earned, `${e.id} on ${need.factionId}`).toBeGreaterThanOrEqual(need.value);
      }
    }
  });
});

describe('the state stays underneath the prose', () => {
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

  it('gives resting exactly one honest thing to restore', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
  });

  it('sends a public fight to the town’s whispers and the town’s standing', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('whispers');
    expect(story.factions[0]?.id).toBe('faction_kettlecross');
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const movers = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(movers.length, r.id).toBeGreaterThan(0);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const f of story.factions) {
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, archetypeGrants } from '@plotbreak/contracts';
import { STRUCK_FROM_THE_REGISTER as story } from './struck-from-the-register.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Struck From the Register, held to the bar slate #31 was written against.
 *
 * The world is not in `LAUNCH_CATALOG` yet, so none of the catalog-wide specs
 * see it. Everything they would have caught is mirrored here, against this one
 * story, plus the three checks the stories checkpoint says to run by hand on
 * every new world, plus what is particular to this one: the first beat is a
 * sister with a blade raised over your name, and every answer to her has to be
 * an authored route rather than a failure to trigger something.
 */

const start = (archetypeId = 'arch_training') =>
  createInitialState({
    sessionId: 'sess_sftr',
    story,
    identity: {
      displayName: 'Seol Haram',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

const ENGINE_PREFIXES = [
  'met:',
  'spoke:',
  'attacked:',
  'engaged:',
  'visited:',
  'used:',
  'inspected:',
  'cooldown:',
  'route:',
  'closed:',
  'played:',
  'beat:',
  'lost_to:',
];
const engineSets = (flag: string): boolean =>
  flag === 'left_the_map' || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

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
    for (const departure of character.companion?.leavesWhen ?? []) for (const flag of departure.setsFlags) flags.add(flag);
  }
  return flags;
}

const allRoutes = () =>
  story.quests.flatMap((quest) =>
    quest.steps.flatMap((step) => step.succeedWhenAny.map((route) => ({ quest, step, route }))),
  );

async function parseCard(card: string) {
  const { RuleBasedIntentParser } = await import('@plotbreak/director');
  const parser = new RuleBasedIntentParser();
  return parser.parse(card, { story, state: start(), intentId: 'intent_sftr_probe', addressee: null });
}

describe('the raw export', () => {
  it('ships with null asset keys and derives them under its own prefix', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    for (const character of story.characters) expect(character.portrait, character.id).toBeNull();

    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage).toMatch(/^story_struck_from_the_register/);
    expect(derived.keyArt).toMatch(/^story_struck_from_the_register/);
    for (const character of derived.characters) {
      expect(character.portrait, character.id).toMatch(/^story_struck_from_the_register/);
    }
    for (const location of derived.locations) {
      expect(location.stageImage, location.id).toMatch(/^story_struck_from_the_register/);
    }
    expect(story.openingPanel?.assetKey).toBe('story_struck_from_the_register/opening');
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [story.premise, story.opening, story.hook, ...story.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });
});

describe('the opener', () => {
  it('is between 50 and 120 words', () => {
    const count = words(story.opening).length;
    expect(count).toBeGreaterThanOrEqual(50);
    expect(count).toBeLessThanOrEqual(120);
  });

  it('has Siwon speaking inside the first 60 words', () => {
    const first60 = words(story.opening).slice(0, 60).join(' ');
    expect(first60).toContain('"');
    expect(first60).toMatch(/Siwon says/);
  });

  it('ends on a demand that needs an answer now', () => {
    expect(story.opening.trim()).toMatch(/(\?|Answer me\.)"$/);
  });

  it('names nobody the player has to know already', () => {
    // A capitalised word that is not the first word of a sentence is a proper
    // noun. The only one allowed is the sister the same paragraph introduces.
    const allowed = new Set(['Siwon', 'I']);
    const sentences = story.opening.split(/(?<=[.!?]["”]?)\s+|\n+/);
    const strays: string[] = [];
    for (const sentence of sentences) {
      const tokens = words(sentence.replace(/^["“]+/, ''));
      for (const token of tokens.slice(1)) {
        const bare = token.replace(/^["“(]+/, '').replace(/[’'].*$/, '').replace(/[^A-Za-z]+$/, '');
        if (/^[A-Z]/.test(bare) && !allowed.has(bare)) {
          // A word straight after an opening quote starts the quoted sentence.
          if (/^["“]/.test(token)) continue;
          strays.push(bare);
        }
      }
    }
    expect(strays).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions).toHaveLength(3);
    expect(said).toMatch(/^"/);
    expect(done).toMatch(/^I /);
    expect(done).not.toContain('"');
    expect(risky).toMatch(/contest/i);
    for (const card of story.openingSuggestions) {
      expect(card, card).toMatch(/\bI\b/);
      expect(card, card).not.toMatch(/^(Ask|Tell|Go|Talk|Look)\b/);
    }
  });

  it('offers no card the parser turns into a fight', async () => {
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parseCard(card);
      if (intent.actions.some((action) => action.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('opens in the register hall, with Siwon in the room and her love for the player high', () => {
    expect(story.rules.startingLocationId).toBe('register_hall');
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('siwon');
    expect(present).toContain('yeon');
    expect(present).toContain('jae');
    const siwon = story.characters.find((c) => c.id === 'siwon')!;
    expect(siwon.startingRelationship.affection).toBeGreaterThanOrEqual(65);
  });
});

describe('the stories checkpoint, run as tests', () => {
  it('1. grants every gated ability somewhere', () => {
    const granted = new Set<string>();
    for (const quest of story.quests) for (const step of quest.steps) for (const id of step.rewards.abilities) granted.add(id);
    for (const archetype of story.archetypes) for (const id of archetype.startingAbilities) granted.add(id);
    const orphans = story.abilities.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(orphans).toEqual([]);
  });

  it('2. puts "you" in every cardBlurb', () => {
    for (const character of story.characters) {
      expect(character.cardBlurb, character.id).toMatch(/\byou\b/i);
      expect(character.cardBlurb.length, character.id).toBeGreaterThan(20);
      expect(character.cardBlurb, character.id).not.toBe(character.role);
    }
  });

  it('3. gives every location an inbound edge, and reaches all of them from the start', () => {
    const inbound = new Set(story.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const location of story.locations) expect(inbound.has(location.id), location.id).toBe(true);

    const seen = new Set([story.rules.startingLocationId]);
    const queue = [story.rules.startingLocationId];
    while (queue.length) {
      const id = queue.shift()!;
      const here = story.locations.find((l) => l.id === id)!;
      for (const edge of here.connections) {
        if (!seen.has(edge.to)) {
          seen.add(edge.to);
          queue.push(edge.to);
        }
      }
    }
    expect([...seen].sort()).toEqual(story.locations.map((l) => l.id).sort());
  });

  it('never uses a relationship gate id as if it were a flag', () => {
    const gateIds = new Set(story.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const misuse: string[] = [];
    for (const { route } of allRoutes()) {
      for (const flag of route.predicate.flagsSet) if (gateIds.has(flag)) misuse.push(`${route.routeId}: ${flag}`);
    }
    for (const event of story.worldEvents) {
      for (const flag of [...event.cancelledByFlags, ...event.requiresFlags]) {
        if (gateIds.has(flag)) misuse.push(`${event.id}: ${flag}`);
      }
    }
    expect(misuse).toEqual([]);
  });
});

describe('adults only', () => {
  const NUMBER: Record<string, number> = {
    eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80,
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
  };
  const ageOf = (appearance: string): number => {
    const first = appearance.split(/[,\s]/)[0]!.toLowerCase();
    return first.split('-').reduce((sum, part) => sum + (NUMBER[part] ?? Number.NaN), 0);
  };

  it('states an adult age at the start of every appearance', () => {
    for (const character of story.characters) {
      const age = ageOf(character.appearance);
      expect(Number.isNaN(age), `${character.id} has no stated age`).toBe(false);
      expect(age, character.id).toBeGreaterThanOrEqual(18);
    }
  });

  it('describes nobody in words that read as a minor', () => {
    const MINOR = /\b(teen|teens|teenage|teenager|kid|kids|child|children|schoolgirl|schoolboy|underage|minor|loli|little girl|little boy|high school|middle school)\b/i;
    for (const character of story.characters) {
      const text = JSON.stringify(character);
      expect(text, character.id).not.toMatch(MINOR);
    }
  });

  it('keeps the romance with Yeon alone and the sister bond explicit', () => {
    const romanceGates = story.characters.flatMap((c) => c.gates.filter((g) => g.kind === 'ROMANCE').map(() => c.id));
    expect(romanceGates).toEqual(['yeon']);
    expect(story.rules.hardCanon.join(' ')).toMatch(/family and nothing else/);
    expect(story.rules.toneGuide).toMatch(/never further than a kiss/);
  });
});

describe('the catalog-wide rules, mirrored', () => {
  it('meets the card minimums', () => {
    expect(story.promises.length).toBeGreaterThanOrEqual(3);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    expect(story.openingSuggestions).toHaveLength(3);
    expect(story.rules.startingItems.length).toBeGreaterThan(0);
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
  });

  it('writes a premise that is long enough, in short paragraphs', () => {
    const paragraphs = story.premise.split(/\n\n+/);
    const count = words(story.premise).length;
    expect(count).toBeGreaterThanOrEqual(120);
    expect(count).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const paragraph of paragraphs) expect(words(paragraph).length, paragraph.slice(0, 40)).toBeLessThanOrEqual(70);
  });

  it('passes the narrative and choice clarity checkers with no errors', async () => {
    const { checkStoryClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const narrative = checkStoryClarity(story);
    const choice = checkStoryChoiceClarity(story);
    const errors = [...narrative.issues, ...choice.issues].filter((i) => i.severity === 'ERROR').map((i) => i.message);
    expect(errors).toEqual([]);
  });

  it('has no dangling references', () => {
    const itemIds = new Set(story.items.map((i) => i.id));
    const locIds = new Set(story.locations.map((l) => l.id));
    const charIds = new Set(story.characters.map((c) => c.id));
    const facIds = new Set(story.factions.map((f) => f.id));
    const abilityIds = new Set(story.abilities.map((a) => a.id));
    const broken: string[] = [];

    for (const location of story.locations) {
      for (const edge of location.connections) if (!locIds.has(edge.to)) broken.push(`${location.id} -> ${edge.to}`);
      for (const take of location.takeableItems) {
        if (!itemIds.has(take.itemId)) broken.push(`${location.id} offers ${take.itemId}`);
        if (take.ownerId && !charIds.has(take.ownerId)) broken.push(`${take.itemId} owned by ${take.ownerId}`);
      }
    }
    for (const character of story.characters) {
      for (const block of character.schedule) if (!locIds.has(block.locationId)) broken.push(`${character.id} at ${block.locationId}`);
      if (character.homeLocationId && !locIds.has(character.homeLocationId)) broken.push(`${character.id} home`);
    }
    for (const event of story.worldEvents) {
      if (event.locationId && !locIds.has(event.locationId)) broken.push(`${event.id} at ${event.locationId}`);
      for (const move of event.movesCharacters) {
        if (!charIds.has(move.characterId) || !locIds.has(move.toLocationId)) broken.push(`${event.id} moves ${move.characterId}`);
      }
    }
    for (const quest of story.quests) {
      for (const id of quest.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${quest.id} involves ${id}`);
      for (const id of quest.involvedLocationIds) if (!locIds.has(id)) broken.push(`${quest.id} at ${id}`);
      for (const step of quest.steps) {
        for (const id of step.rewards.abilities) if (!abilityIds.has(id)) broken.push(`${step.id} grants ${id}`);
        for (const r of step.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${step.id} rep ${r.factionId}`);
        for (const route of step.succeedWhenAny) {
          const p = route.predicate;
          for (const i of p.hasItems) if (!itemIds.has(i)) broken.push(`${route.routeId} wants ${i}`);
          if (p.atLocation && !locIds.has(p.atLocation)) broken.push(`${route.routeId} at ${p.atLocation}`);
          for (const r of p.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${route.routeId} on ${r.characterId}`);
          for (const r of p.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${route.routeId} on ${r.factionId}`);
        }
      }
    }
    for (const archetype of story.archetypes) {
      for (const s of archetype.startingItems) if (!itemIds.has(s.itemId)) broken.push(`${archetype.id} item ${s.itemId}`);
      for (const r of archetype.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${archetype.id} rep ${r.factionId}`);
    }
    for (const s of story.rules.startingItems) if (!itemIds.has(s.itemId)) broken.push(`start item ${s.itemId}`);
    expect(broken).toEqual([]);
  });

  it('gives no two takeable items the same alias', () => {
    const seen = new Map<string, string>();
    const clashes: string[] = [];
    for (const location of story.locations) {
      for (const take of location.takeableItems) {
        for (const alias of take.aka ?? []) {
          const key = alias.toLowerCase();
          const owner = seen.get(key);
          if (owner && owner !== take.itemId) clashes.push(`${alias}: ${owner} / ${take.itemId}`);
          seen.set(key, take.itemId);
        }
      }
    }
    expect(clashes).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const declared = settable();
    for (const quest of story.quests) {
      if (quest.discoverWhen) for (const f of quest.discoverWhen.flagsSet) declared.add(f);
      for (const step of quest.steps) {
        for (const p of [step.enterWhen, step.succeedWhen, step.failWhen]) if (p) for (const f of p.flagsSet) declared.add(f);
        for (const route of step.succeedWhenAny) for (const f of route.predicate.flagsSet) declared.add(f);
      }
    }
    for (const character of story.characters) for (const gate of character.gates) for (const f of gate.requires.flagsSet) declared.add(f);
    for (const event of story.worldEvents) for (const f of [...event.requiresFlags, ...event.cancelledByFlags]) declared.add(f);

    const dead: string[] = [];
    for (const ending of story.endings) {
      for (const f of ending.requires.flagsSet) if (!declared.has(f) && !engineSets(f)) dead.push(`${ending.id}: ${f}`);
    }
    for (const ability of story.abilities) {
      for (const f of ability.requires?.flagsSet ?? []) if (!declared.has(f) && !engineSets(f)) dead.push(`${ability.id}: ${f}`);
    }
    for (const location of story.locations) {
      for (const edge of location.connections) {
        if (edge.lockedByFlag && !declared.has(edge.lockedByFlag) && !engineSets(edge.lockedByFlag)) dead.push(`${location.id}: ${edge.lockedByFlag}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it('has every flag an ending, an event, a gate or a lock reads actually set by something', () => {
    // Stricter than the catalog rule above: nothing here relies on the
    // director inventing a flag during play.
    const flags = settable();
    const missing: string[] = [];
    const want = (where: string, list: readonly string[]) => {
      for (const f of list) if (!flags.has(f) && !engineSets(f)) missing.push(`${where}: ${f}`);
    };
    for (const ending of story.endings) want(ending.id, ending.requires.flagsSet);
    for (const event of story.worldEvents) want(event.id, [...event.requiresFlags, ...event.cancelledByFlags]);
    for (const character of story.characters) for (const gate of character.gates) want(gate.id, gate.requires.flagsSet);
    for (const ability of story.abilities) want(ability.id, ability.requires?.flagsSet ?? []);
    for (const location of story.locations) for (const edge of location.connections) if (edge.lockedByFlag) want(location.id, [edge.lockedByFlag]);
    for (const { route } of allRoutes()) want(route.routeId, route.predicate.flagsSet);
    for (const quest of story.quests) {
      if (quest.discoverWhen) want(quest.id, quest.discoverWhen.flagsSet);
      for (const step of quest.steps) if (step.enterWhen) want(step.id, step.enterWhen.flagsSet);
    }
    expect(missing).toEqual([]);
  });

  it('only keys a route on an ability the player can actually have', () => {
    const grantable = new Set(story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id));
    for (const quest of story.quests) for (const step of quest.steps) for (const id of step.rewards.abilities) grantable.add(id);
    const dead: string[] = [];
    for (const { route } of allRoutes()) {
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:') && !grantable.has(flag.slice(5))) dead.push(`${route.routeId}: ${flag}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it('only asks for items the player can obtain, and never for the item a step awards', () => {
    const obtainable = new Set(story.rules.startingItems.map((s) => s.itemId));
    for (const location of story.locations) for (const take of location.takeableItems) obtainable.add(take.itemId);
    for (const archetype of story.archetypes) for (const s of archetype.startingItems) obtainable.add(s.itemId);
    for (const quest of story.quests) for (const step of quest.steps) for (const i of step.rewards.items) obtainable.add(i.itemId);
    const bad: string[] = [];
    for (const { step, route } of allRoutes()) {
      for (const item of route.predicate.hasItems) {
        if (!obtainable.has(item)) bad.push(`${route.routeId} wants ${item}`);
        if (step.rewards.items.some((r) => r.itemId === item)) bad.push(`${step.id} demands what it awards: ${item}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('closes something with at least one route', () => {
    expect(allRoutes().some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('places every character deliberately at the start minute', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    for (const character of story.characters) {
      const scheduled = character.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || !!character.homeLocationId, character.id).toBe(true);
    }
  });

  it('uses only known expressions and unique called names', async () => {
    const { knownExpression, calledName } = await import('@plotbreak/contracts');
    for (const character of story.characters) {
      for (const expression of character.expressions) expect(knownExpression(expression), `${character.id}/${expression}`).toBe(true);
    }
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('writes endings the catalog will accept', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const ending of story.endings) {
      expect(ending.minTurn, ending.id).toBeGreaterThan(0);
      expect(ending.condition.length, ending.id).toBeGreaterThan(80);
      expect(ending.epilogue.length, ending.id).toBeGreaterThan(60);
      expect(ending.name.length, ending.id).toBeLessThanOrEqual(60);
    }
  });

  it('never asks for more faction standing than the story can give', () => {
    const ceiling = new Map<string, number>();
    for (const faction of story.factions) {
      const best = Math.max(
        0,
        ...story.archetypes.map(
          (a) => a.startingReputation.find((r) => r.factionId === faction.id)?.amount ?? 0,
        ),
      );
      let total = faction.startingReputation + best;
      for (const quest of story.quests) {
        for (const step of quest.steps) {
          for (const r of step.rewards.reputation) if (r.factionId === faction.id && r.amount > 0) total += r.amount;
        }
      }
      ceiling.set(faction.id, total);
    }
    const over: string[] = [];
    for (const ending of story.endings) {
      for (const r of ending.requires.minFactionReputation) {
        if (r.value > ceiling.get(r.factionId)!) over.push(`${ending.id}: ${r.factionId} ${r.value} > ${ceiling.get(r.factionId)}`);
      }
    }
    for (const { route } of allRoutes()) {
      for (const r of route.predicate.minFactionReputation) {
        if (r.value > ceiling.get(r.factionId)!) over.push(`${route.routeId}: ${r.factionId}`);
      }
    }
    expect(over).toEqual([]);
  });

  it('describes every ability in a line the player can read', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('makes the archetype choice permanent, distinct and real', () => {
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);

    const tags = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tags).size).toBe(tags.length);
    const signatures = story.archetypes.map((a) => JSON.stringify(archetypeGrants(story, a)));
    expect(new Set(signatures).size).toBe(signatures.length);
    for (const archetype of story.archetypes) {
      const g = archetypeGrants(story, archetype);
      expect(g.abilities.length + g.skills.length + g.attributes.length + g.items.length, archetype.id).toBeGreaterThan(0);
      expect(archetype.name.length, archetype.id).toBeLessThanOrEqual(28);
      expect(archetype.playstyle.length, archetype.id).toBeGreaterThanOrEqual(2);
      expect(archetype.playstyle.length, archetype.id).toBeLessThanOrEqual(4);
    }
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

  it('demonstrates each declared voice in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ').toLowerCase();
    expect(sample('siwon')).toMatch(/brother/);
    expect(sample('jae')).toMatch(/eldest/);
    expect(sample('han')).toMatch(/young master/);
    expect(sample('yeon')).toMatch(/cheaper|paid/);
    expect(sample('doha')).toMatch(/odds|silver/);
    expect(sample('minseo')).toMatch(/form eleven|clause|sundown/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('three quiet numbers', () => {
  it('keeps all three invisible, banded and topped at max', () => {
    expect(story.resources.map((r) => r.id)).toEqual(['stamina', 'scandal', 'rift']);
    for (const resource of story.resources) {
      expect(resource.visible, resource.id).toBe(false);
      expect(resource.bands.length, resource.id).toBeGreaterThanOrEqual(3);
      expect(resource.bands[resource.bands.length - 1]!.upTo, resource.id).toBe(resource.max);
      for (const band of resource.bands) {
        expect(band.behaviour.length, resource.id).toBeGreaterThan(80);
        expect(band.behaviour, resource.id).not.toContain(resource.name.toLowerCase());
      }
    }
  });

  it('has exactly one GOOD_HIGH, so a night’s rest restores the body and nothing else', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('drives every descending number with an ability that costs it', () => {
    for (const resource of story.resources.filter((r) => r.polarity === 'GOOD_LOW')) {
      const drivers = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === resource.id));
      expect(drivers.length, resource.id).toBeGreaterThan(0);
      expect(resource.regenPerHour, resource.id).toBeLessThan(0);
    }
  });

  it('sends public violence to scandal and the watch', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('scandal');
    expect(story.factions[0]!.id).toBe('faction_watch');
  });
});

describe('every answer to her is a story', () => {
  const answer = story.quests.find((q) => q.id === 'q_struck')!.steps[0]!;

  it('authors leaving, contesting, refusing and walking out as routes', () => {
    const keys = answer.succeedWhenAny.flatMap((r) => r.predicate.flagsSet);
    expect(keys).toEqual(
      expect.arrayContaining(['used:bow_out', 'used:claim_the_contest', 'used:hold_your_ground', 'visited:sword_street']),
    );
    expect(answer.succeedWhenAny.some((r) => r.predicate.hasItems.includes('house_register'))).toBe(true);
  });

  it('wins the contest only by waiting for her blade', () => {
    const contest = story.quests.find((q) => q.id === 'q_the_contest')!.steps[0]!;
    const winning = contest.succeedWhenAny.filter((r) => r.setsFlags.includes('name_kept'));
    expect(winning.map((r) => r.predicate.flagsSet)).toEqual([['used:answer_the_blade']]);
    expect(winning[0]!.setsFlags).toContain('hand_seen');
    const forms = contest.succeedWhenAny.find((r) => r.predicate.flagsSet.includes('used:house_forms'))!;
    expect(forms.setsFlags).toContain('name_struck');
  });

  it('makes the feud bout reachable by winning, with no mistake required', () => {
    const feud = story.endings.find((e) => e.id === 'end_the_feud_bout')!;
    expect(feud.requires.minRelationship).toEqual([]);
    expect(feud.requires.hasItems ?? []).toEqual([]);
    const letter = story.worldEvents.find((e) => e.setsFlags.includes('feud_called'))!;
    expect(letter.requiresFlags).toEqual(['hand_seen']);
    expect(letter.cancelledByFlags).toEqual(['pact_settled']);
    expect(settable()).toContain('bout_over');
  });

  it('keeps the returning cut locked until somebody teaches it', () => {
    const cut = story.abilities.find((a) => a.id === 'the_returning_cut')!;
    expect(cut.unlockedByDefault).toBe(false);
    expect(cut.requires?.flagsSet).toEqual(['second_cut_learned']);
    expect(cut.requires?.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const teacher = story.quests.find((q) => q.id === 'q_second_cut')!.steps[0]!;
    expect(teacher.rewards.abilities).toEqual(['the_returning_cut']);
    for (const route of teacher.succeedWhenAny) expect(route.predicate.flagsSet, route.routeId).toContain('used:answer_the_blade');
  });

  it('lets the sundown clock run out into an ending rather than a wall', () => {
    const bell = story.worldEvents.find((e) => e.id === 'we_sundown_bell')!;
    expect(bell.atWorldMinute).toBe(18 * 60 + 40);
    expect(bell.setsFlags).toEqual(['token_lapsed']);
    expect(story.endings.some((e) => e.requires.flagsSet.includes('carrying_unlicensed'))).toBe(true);
  });

  it('keeps the mystery out of the premise', () => {
    expect(story.premise).not.toMatch(/\bpact\b|\bHan\b|second cut|answering/i);
  });

  it('spreads its endings over every rarity and lets the walk-away come early', () => {
    expect(new Set(story.endings.map((e) => e.rarity))).toEqual(new Set(['COMMON', 'UNCOMMON', 'RARE', 'UNIQUE']));
    const road = story.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(road.minTurn).toBeLessThanOrEqual(22);
  });
});

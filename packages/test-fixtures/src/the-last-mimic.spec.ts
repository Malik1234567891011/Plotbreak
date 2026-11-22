import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import type { StoryVersion } from '@plotbreak/contracts';
import { THE_LAST_MIMIC } from './the-last-mimic.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * The Last Mimic, held to the promise on its own card: you are the treasure,
 * and everybody in the building wants what is inside you.
 *
 * The failure this world is most exposed to is the body. A player who is a
 * chest cannot walk, cannot talk in their own voice and cannot pick anything
 * up, and a world that forgets that for one beat turns into an ordinary
 * dungeon crawl with a funny costume. The other failure is the mystery leaking:
 * "why a box" is optional, and a player who only wants to bargain with a thief
 * must never be handed a summoning circle on turn six.
 *
 * Not registered in `index.ts` yet, so the catalog-wide invariants do not see
 * it. The ones that matter are copied here rather than skipped.
 */

const story: StoryVersion = THE_LAST_MIMIC;

const start = (archetypeId = 'arch_shop') =>
  createInitialState({
    sessionId: 'sess_last_mimic',
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

const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

/** Every flag a route, a step reward, an event or a departing companion can set. */
const settable = (() => {
  const out = new Set<string>();
  for (const q of story.quests) {
    for (const st of q.steps) {
      for (const f of st.rewards.flags) out.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) out.add(f);
    }
  }
  for (const e of story.worldEvents) for (const f of e.setsFlags) out.add(f);
  for (const c of story.characters) {
    for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) out.add(f);
  }
  return out;
})();
const canBeSet = (flag: string): boolean => settable.has(flag) || engineSets(flag);

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

  it('keeps the premise readable on a phone', () => {
    const paragraphs = story.premise.split('\n\n');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    const total = words(story.premise).length;
    expect(total).toBeGreaterThanOrEqual(120);
    expect(total).toBeLessThanOrEqual(250);
    // The summoning is the optional mystery. The card must not give it away.
    expect(story.premise.toLowerCase()).not.toContain('summon');
  });

  it('fits the fantasy on one line of the card', () => {
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
  });
});

describe('the opener puts a person in front of you and asks you something', () => {
  const opening = story.opening;
  const allWords = words(opening);

  it('is short enough to read before deciding', () => {
    expect(allWords.length).toBeGreaterThanOrEqual(50);
    expect(allWords.length).toBeLessThanOrEqual(120);
  });

  it('has a named character speak to you inside the first sixty words', () => {
    const first60 = allWords.slice(0, 60).join(' ');
    expect(first60).toContain('"');
    expect(first60).toContain('Lirelle');
  });

  it('ends on a direct question', () => {
    expect(opening.trim().endsWith('?"')).toBe(true);
  });

  it('names nobody the player is expected to already know', () => {
    // Lirelle and Bruno are named by the scene itself, the way a stranger's
    // name is heard. Nothing else is a proper noun the player has to bring.
    const capitalised = opening
      .replace(/(^|[.!?"\n]\s*)[A-Z]\w*/g, '')
      .match(/\b[A-Z][a-z]+\b/g) ?? [];
    for (const name of capitalised) expect(['Lirelle', 'Bruno', 'Mimics']).toContain(name);
  });

  it('offers three cards: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions.length).toBe(3);
    expect(new Set(story.openingSuggestions).size).toBe(3);
    for (const card of story.openingSuggestions) expect(card).toMatch(/\bI\b/);
    expect(said?.startsWith('"')).toBe(true);
    expect(done?.startsWith('"')).toBe(false);
    expect(risky?.startsWith('"')).toBe(false);
    expect(risky).toMatch(/wrist/);
  });

  it('offers no card the parser turns into a fight', async () => {
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

  it('starts with exactly the thief and her shield in the vault', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['bruno', 'lirelle']);
    expect(story.rules.startingLocationId).toBe('the_ninth_vault');
  });

  it('never drops a character into the opening by fallback', () => {
    for (const c of story.characters) {
      expect(locationForSchedule(c.schedule, story.rules.startWorldMinute), c.id).not.toBeNull();
    }
  });
});

describe('checkpoint: every gated ability can actually be had', () => {
  it('grants every ability that is not unlocked by default somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const orphans = story.abilities.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(orphans, 'abilities nothing ever grants').toEqual([]);
  });

  it('gates abilities only on flags the world can set', () => {
    for (const ability of story.abilities) {
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(canBeSet(flag), `${ability.id} waits on ${flag}`).toBe(true);
      }
    }
  });

  it('only asks a route for an ability somebody can have', () => {
    const grantable = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    for (const { quest, step, route } of routes) {
      for (const flag of route.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${quest}/${step}/${route.routeId}`).toBe(true);
      }
    }
  });

  it('says what each ability does in a line the player can read', async () => {
    const { abilityEffect } = await import('@plotbreak/contracts');
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });
});

describe('checkpoint: every card talks to you', () => {
  it('puts the player in every character card', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });
});

describe('checkpoint: every place can be walked into', () => {
  it('gives every location an inbound edge', () => {
    const orphans = story.locations.filter(
      (l) => !story.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id)),
    );
    expect(orphans.map((l) => l.id)).toEqual([]);
  });

  it('can reach every location from the vault, unlocked doors included', () => {
    const seen = new Set([story.rules.startingLocationId]);
    const queue = [story.rules.startingLocationId];
    while (queue.length > 0) {
      const id = queue.shift()!;
      const here = story.locations.find((l) => l.id === id)!;
      for (const c of here.connections) {
        if (!seen.has(c.to)) {
          seen.add(c.to);
          queue.push(c.to);
        }
      }
    }
    expect(story.locations.filter((l) => !seen.has(l.id)).map((l) => l.id)).toEqual([]);
  });

  it('locks doors only behind flags the world can set', () => {
    for (const l of story.locations) {
      for (const c of l.connections) {
        if (c.lockedByFlag) expect(canBeSet(c.lockedByFlag), `${l.id} -> ${c.to}`).toBe(true);
      }
    }
  });
});

describe('everything it points at exists', () => {
  it('has no dangling references', () => {
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
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of story.archetypes) {
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of story.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`start item ${i.itemId}`);
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
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
            const used = f.startsWith('used:') ? f.slice(5) : null;
            if (used && !abIds.has(used)) broken.push(`${st.id} uses ${used}`);
            const visited = f.startsWith('visited:') ? f.slice(8) : null;
            if (visited && !locIds.has(visited)) broken.push(`${st.id} visits ${visited}`);
            const person = /^(met|spoke):(.+)$/.exec(f)?.[2];
            if (person && !charIds.has(person)) broken.push(`${st.id} meets ${person}`);
          }
        }
      }
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything on a flag nothing sets', () => {
    const dead: string[] = [];
    const need = (where: string, flags: readonly string[]): void => {
      for (const f of flags) if (!canBeSet(f)) dead.push(`${where} needs ${f}`);
    };
    for (const e of story.endings) need(e.id, e.requires.flagsSet);
    for (const c of story.characters) for (const g of c.gates) need(g.id, g.requires.flagsSet);
    for (const e of story.worldEvents) need(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const q of story.quests) {
      if (q.discoverWhen) need(q.id, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) need(st.id, p.flagsSet);
        for (const r of st.succeedWhenAny) need(`${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('branches, and some branches cost something', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never demands the thing a step is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const r of step.succeedWhenAny) {
        for (const i of r.predicate.hasItems) expect(granted.has(i), `${quest}/${step.id}`).toBe(false);
      }
    }
  });
});

describe('the cast are people, not meters', () => {
  it('gives everybody something to want, fear and refuse', () => {
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    for (const c of story.characters) {
      expect(c.fears.length, `${c.id} fears`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} drives`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} boundaries`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} goals`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} topics`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} speech`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} hook`).toBeGreaterThan(20);
      expect(c.gates.length, `${c.id} gates`).toBeGreaterThan(0);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('makes every gate one the right relationship can open', () => {
    for (const c of story.characters) {
      for (const g of c.gates) {
        for (const [dim, value] of Object.entries(g.requires)) {
          if (typeof value === 'number') expect(value, `${g.id} ${dim}`).toBeLessThanOrEqual(100);
        }
      }
    }
  });

  it('keeps the five voices apart', () => {
    const STOP = new Set(
      'that this with have your what when then them they their there from into been were would could should about just like because which while only every never once some much more most than very where here'.split(
        ' ',
      ),
    );
    const vocab = (id: string): Set<string> =>
      new Set(
        story.characters
          .find((c) => c.id === id)!
          .voiceSamples.join(' ')
          .toLowerCase()
          .match(/[a-z’']{4,}/g)!
          .filter((w) => !STOP.has(w)),
      );
    const ids = story.characters.map((c) => c.id);
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = vocab(ids[i]!);
        const b = vocab(ids[j]!);
        const shared = [...a].filter((w) => b.has(w)).length;
        const overlap = shared / new Set([...a, ...b]).size;
        expect(overlap, `${ids[i]} / ${ids[j]}`).toBeLessThan(0.3);
      }
    }
  });

  it('gives each signature move to exactly one person', () => {
    const MOVES: Record<string, RegExp> = {
      restart: /\bRight\.\s/,
      favour: /\bdo me a favour\b/i,
      shouting: /\b[A-Z]{3,}\b/,
      nickname: /\bBox\b/,
      gran: /\bmy gran\b/i,
      ledger: /\b(entry|inventory|notes)\b/i,
      valuation: /\b(Condition|Provenance):/,
    };
    for (const [move, pattern] of Object.entries(MOVES)) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${move}: ${users.join(', ')}`).toBe(1);
    }
  });

  it('draws only faces the generator has', async () => {
    const { knownExpression } = await import('@plotbreak/contracts');
    const unknown = story.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
    );
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', async () => {
    const { calledName } = await import('@plotbreak/contracts');
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('everybody is an adult, and says so', () => {
  const AGES: Record<string, RegExp> = {
    lirelle: /hundred and sixty-three/,
    ash: /fifty-one when he died/,
    pell: /twenty-four/,
    bruno: /thirty-eight/,
    edda: /fifty-two/,
  };

  it('states every age in the appearance the portrait generator reads', () => {
    expect(Object.keys(AGES).sort()).toEqual(story.characters.map((c) => c.id).sort());
    for (const c of story.characters) expect(c.appearance, c.id).toMatch(AGES[c.id]!);
  });

  it('describes nobody in words that read as a minor', () => {
    const MINOR = /\b(child|children|kid|kids|teen|teens|teenage|teenager|young|youngster|little|girl|girls|boy|boys|schoolgirl|schoolboy|minor|underage|petite)\b/i;
    for (const c of story.characters) {
      const text = [c.appearance, c.role, c.cardBlurb, c.visualHook, c.silhouette, ...c.publicTraits, ...c.voiceSamples].join(' ');
      expect(text, c.id).not.toMatch(MINOR);
    }
  });

  it('keeps the whole world at 13+', () => {
    const all = JSON.stringify(story);
    expect(all).not.toMatch(
      /\b(naked|nude|nudity|sex|sexual|sexy|breasts?|cleavage|lingerie|seductive|disembowel\w*|entrails|gore|suicide|self-harm|slit (?:her|his|their) wrists?)\b/i,
    );
  });

  it('borrows nothing from anybody else’s franchise', () => {
    const all = JSON.stringify(story);
    expect(all).not.toMatch(/\b(quirk|nen|chakra|hokage|hunter association|system window|status window|rimuru|tempest)\b/i);
    expect(all).not.toContain('Lirael');
  });
});

describe('the mystery is optional and behaves like it', () => {
  it('hides the whole "why a box" lead behind a flag only a curious player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_why_a_box')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_echoes']);
  });

  it('never sets that flag from an event everybody gets', () => {
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_echoes'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, e.id).toBeGreaterThan(0);
  });

  it('keeps the locked abilities locked, in the world’s own words', () => {
    const gated = story.abilities.filter((a) => (a.requires?.flagsSet.length ?? 0) > 0);
    expect(gated.map((a) => a.id).sort()).toEqual(['grow_legs', 'wear_a_shape']);
    for (const ability of gated) {
      expect(ability.requires!.lockedCopy.length, ability.id).toBeGreaterThan(30);
      expect(ability.requires!.lockedCopy, ability.id).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['the_door_answered', 'went_home', 'seeded_the_vault', 'knows:how_mimics_are_made', 'knows:why_you_woke']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(8);
  });
});

describe('you can lose by doing nothing about the stair', () => {
  it('lets the chime find you if nobody stops it', () => {
    const found = story.worldEvents.find((e) => e.id === 'we_the_chime_finds_you')!;
    expect(found.setsFlags).toContain('caught');
    expect(found.requiresFlags).toEqual(['quell_on_the_stair']);
    for (const f of found.cancelledByFlags) expect(canBeSet(f), f).toBe(true);
  });

  it('makes that loss reachable without a single mistake', () => {
    const shelf = story.endings.find((e) => e.id === 'end_the_workshop_shelf')!;
    expect(shelf.requires.flagsSet).toEqual(['caught']);
    expect(shelf.requires.minRelationship).toEqual([]);
    expect(shelf.requires.hasItems).toEqual([]);
  });

  it('lets you walk out on everybody, early', () => {
    const walk = story.endings.find((e) => e.id === 'end_into_the_walls')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
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

  it('gives rest something to restore, and only the body', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['strength']);
  });

  it('sends public violence to the rumour and the Guild', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('rumour');
    expect(story.factions[0]?.id).toBe('faction_guild');
  });

  it('lets the player actually move every bad meter', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });
});

describe('choices are clear and the copy passes the house checks', () => {
  it('passes the narrative clarity check with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => e.message)).toEqual([]);
  });

  it('passes the choice clarity check with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => e.message)).toEqual([]);
  });

  it('says the background is fixed for the whole story', () => {
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/fixed for the whole story/);
    expect(field.helpText).toMatch(/later/);
  });

  it('gives every archetype a distinct playstyle and a first trick', () => {
    const styles = story.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(styles).size).toBe(styles.length);
    for (const a of story.archetypes) expect(a.startingAbilities.length, a.id).toBe(1);
  });

  it('puts the archetype and the cast in what the storyteller reads', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    const brief = worldBrief(story, 'arch_voices');
    expect(brief).toContain('You Did Voices');
    for (const c of story.characters) expect(brief).toContain(c.name);
  });
});

describe('art is declared later, not now', () => {
  it('ships raw with no art keys', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    for (const c of story.characters) expect(c.portrait, c.id).toBeNull();
  });

  it('derives keys under its own prefix once wrapped', () => {
    const derived = withDerivedAssetKeys(story);
    expect(story.storyId).toBe('story_the_last_mimic');
    expect(story.id).toBe('sv_the_last_mimic_1');
    expect(JSON.stringify(derived.coverImage ?? derived.keyArt)).toContain('story_the_last_mimic');
    expect(story.openingPanel?.assetKey.startsWith('story_the_last_mimic/')).toBe(true);
  });
});

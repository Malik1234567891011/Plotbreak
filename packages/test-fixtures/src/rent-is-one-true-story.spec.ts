import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { RENT_IS_ONE_TRUE_STORY as STORY } from './rent-is-one-true-story.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Rent Is One True Story, held to what the premise promises and to every gate
 * the launch catalog would apply if it were in it.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalog-wide specs in this
 * package and in the director do not see it. Everything they check is
 * re-run here against this one world, so the story is ready to register the
 * day somebody adds it to `index.ts`.
 *
 * The failure this world is most exposed to is the rent turning into a meter:
 * a "truth" button that fills a bar. So the checks below care about the door
 * (he never crosses it, and he is the only person at it on minute one), the
 * lie (it is allowed, it costs something real, and it has its own ending), and
 * the honest loss (the building can be sold to somebody who played kindly and
 * simply never ran the daylight errand).
 */

const start = (archetypeId: string | null = 'arch_night_shift') =>
  createInitialState({
    sessionId: 'sess_rent',
    story: STORY,
    identity: {
      displayName: 'Jules Marrow',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): string[] => text.split(/\s+/).filter(Boolean);

const steps = STORY.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag a single playthrough could ever set, plus the engine's own vocabulary. */
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

function settable(): Set<string> {
  const flags = new Set<string>();
  for (const quest of STORY.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of STORY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  for (const character of STORY.characters) {
    for (const departure of character.companion?.leavesWhen ?? []) for (const flag of departure.setsFlags) flags.add(flag);
  }
  return flags;
}

/** Every text field a player or the storyteller can read, flattened. */
const everything = JSON.stringify(STORY);

const AGES: Record<string, { age: number; word: RegExp }> = {
  elias: { age: 29, word: /twenty-nine/i },
  celine: { age: 34, word: /thirty-four/i },
  dee: { age: 31, word: /thirty-one/i },
  tom: { age: 58, word: /fifty-eight/i },
  gus: { age: 89, word: /eighty-nine/i },
};

describe('the opener', () => {
  const opening = STORY.opening;

  it('is between fifty and a hundred and twenty words', () => {
    const count = words(opening).length;
    expect(count).toBeGreaterThanOrEqual(50);
    expect(count).toBeLessThanOrEqual(120);
  });

  it('has a named character speak to the player within the first sixty words', () => {
    const firstQuote = opening.indexOf('"');
    expect(firstQuote).toBeGreaterThan(0);
    expect(words(opening.slice(0, firstQuote)).length).toBeLessThan(60);
    // He names himself in that first line, so nobody arrives unexplained.
    const firstLine = opening.slice(firstQuote, opening.indexOf('"', firstQuote + 1) + 1);
    expect(firstLine).toContain('Elias Varga');
  });

  it('ends on a demand the player has to answer now', () => {
    const last = opening.trim();
    expect(last.endsWith('?"') || /Tell me something true[^"]*\."$/.test(last), last.slice(-80)).toBe(true);
  });

  it('names nobody and nowhere the player could not already know', () => {
    for (const c of STORY.characters.filter((c) => c.id !== 'elias')) {
      expect(opening, c.name).not.toContain(c.name.split(' ').at(-1)!);
      expect(opening, c.name).not.toContain(calledName(c));
    }
    for (const place of ['Varga House', 'Ashby Street', 'Anselm', 'Orchid Room', 'Records Office', 'Laundromat']) {
      expect(opening, place).not.toContain(place);
    }
  });

  it('puts the man it describes at the door, and nobody else in the scene', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(['elias']);
  });

  it('keeps him on the landing side, in the data as well as the prose', () => {
    const elias = STORY.characters.find((c) => c.id === 'elias')!;
    expect(elias.schedule[0]).toMatchObject({ startMinute: 0, locationId: 'apartment_4c' });
    expect(elias.schedule[0]!.activity).toMatch(/not coming in/);
    expect(elias.boundaries.join(' ')).toMatch(/threshold uninvited/);
  });

  it('says what each opening card leads to in fields production actually sends', () => {
    // runTurnPure never sends quest step directorNotes or secret revealHints.
    // What he does when asked in, or shut out, has to live where it reads:
    // his boundaries ("Will not:").
    const elias = STORY.characters.find((c) => c.id === 'elias')!;
    const willNot = elias.boundaries.join(' ');
    expect(willNot).toMatch(/first time he is asked in/);
    expect(willNot).toMatch(/shut door/);
    expect(willNot).toMatch(/November 1974 to anybody who asks/);
    // A sincere answer about the player's own life is never called a lie,
    // and the author's own sample marks the lie as the player's.
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/never calls a sincere answer a lie/);
    expect(STORY.rules.styleExamples[0]).toMatch(/lighthouse,\\?" you lie\./);
    // What lying costs over time lives in canon, not only in invisible bands.
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/Lying to him costs the liar slowly/);
  });

  it('asks nothing on the setup screen that the storyteller never reads', () => {
    // Only archetype, displayName and pronouns reach runTurnPure; appearance
    // reaches the portrait generator, and says so.
    const ids = STORY.setupFields.map((f) => f.id);
    expect(ids).toEqual(['displayName', 'pronouns', 'archetype', 'appearance']);
    expect(STORY.setupFields.find((f) => f.id === 'appearance')!.label).toMatch(/portrait/);
  });

  it('offers three answers: one said, one done, one risky', () => {
    const [said, done, risky] = STORY.openingSuggestions;
    expect(STORY.openingSuggestions).toHaveLength(3);
    expect(said!.startsWith('"'), said).toBe(true);
    expect(done, done).not.toContain('"');
    expect(risky, risky).toMatch(/come in/i);
    for (const card of STORY.openingSuggestions) {
      expect(card, card).toMatch(/\bI\b/);
      expect(card, card).not.toMatch(/^(?:Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get)\b/);
      expect(card.length, card).toBeLessThanOrEqual(320);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    // test-fixtures cannot import the director statically: the director
    // depends on this package. A dynamic import breaks the cycle.
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
});

describe('adults only, and a 13+ story', () => {
  it('casts nobody under eighteen and states every age where the art reads it', () => {
    expect(STORY.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    for (const c of STORY.characters) {
      const entry = AGES[c.id]!;
      expect(entry.age, c.id).toBeGreaterThanOrEqual(18);
      expect(c.appearance, c.id).toMatch(entry.word);
    }
  });

  it('never describes anybody in words that read as a minor', () => {
    // "young" is in here because Gus once called the player "young person",
    // which in British usage is the safeguarding term for under-eighteens,
    // and the storyteller would have said it to the player every scene.
    const MINOR =
      /\b(?:child|children|childlike|kid|kids|teen|teens|teenage|teenager|minor|underage|boy|girl|schoolgirl|schoolboy|youthful|young|petite|baby-faced|loli|shota|high school|middle school)\b/i;
    for (const c of STORY.characters) {
      for (const text of [c.appearance, c.visualHook, c.silhouette, c.cardBlurb, c.role, c.speechStyle, ...c.goals, ...c.voiceSamples]) {
        expect(text, c.id).not.toMatch(MINOR);
      }
    }
    for (const a of STORY.archetypes) expect(`${a.summary} ${a.blurb}`, a.id).not.toMatch(MINOR);
    expect(STORY.openingPanel?.alt ?? '').not.toMatch(MINOR);
    expect(everything.match(MINOR)?.[0] ?? null).toBeNull();
  });

  it('tells the storyteller, in hard canon, that everybody including the player is an adult', () => {
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Everybody in this story is an adult/);
    expect(canon).toMatch(/The player is a grown adult/);
  });

  it('keeps romance to a kiss and violence off the page', () => {
    const EXPLICIT =
      /\b(?:nude|nudity|naked|sex|sexual|sexy|breasts?|cleavage|lingerie|undress(?:es|ed|ing)?|aroused|moan(?:s|ed|ing)?|gore|gory|entrails|disembowel\w*|severed|dismember\w*|self-harm|suicide|suicidal|bloodbath|blood-soaked)\b/i;
    expect(everything.match(EXPLICIT)?.[0] ?? null).toBeNull();
    expect(STORY.rules.toneGuide).toMatch(/at most a kiss/);
    // The tone guide alone is not enough: a live brief can override it, and
    // what it keeps is hard canon. So the ceiling lives there too.
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/one kiss and no further/);
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/off it/);
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/Nobody in this story is bitten on the page/);
    expect(STORY.contentDescriptors).toContain('ROMANCE');
    expect(STORY.rules.allowsCombat).toBe(false);
  });
});

describe('original and in English', () => {
  it('borrows no franchise names, terms or symbols', () => {
    const BORROWED =
      /\b(?:kindred|camarilla|masquerade|volturi|cullen|dracula|alucard|hellsing|nosferatu|lestat|twilight|true blood|vampire diaries|quirk|nen|chakra|hokage|hunter association|system window|21st century)\b/i;
    expect(everything.match(BORROWED)?.[0] ?? null).toBeNull();
  });

  it('is written in English, without accented spellings', () => {
    expect(everything.match(/[À-ÿ]/)?.[0] ?? null).toBeNull();
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [STORY.premise, STORY.opening, STORY.hook, ...STORY.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = STORY.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) expect(granted.has(ability.id), `${ability.id} is never granted`).toBe(true);
  });

  it('writes every card blurb to the player', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase(), c.id).not.toBe(c.role.toLowerCase());
    }
  });

  it('gives every location an inbound edge', () => {
    const inbound = new Set(STORY.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of STORY.locations) expect(inbound.has(l.id), `nothing leads to ${l.id}`).toBe(true);
  });
});

describe('what the launch catalog would check', () => {
  it('has more than one way through, and closes something when a route is taken', () => {
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
      const demanded = [...(step.succeedWhen?.hasItems ?? []), ...step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)];
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
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
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
    for (const i of STORY.items) {
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} modifies ${s}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of STORY.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of STORY.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of STORY.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(STORY.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of STORY.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const o of STORY.openingObligations) {
      if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    }
    for (const e of STORY.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
    }
    for (const q of STORY.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [q.discoverWhen, st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
          for (const f of pred.flagsSet) {
            if (f.startsWith('used:') && !abIds.has(f.slice(5))) broken.push(`${st.id} uses ${f}`);
            if ((f.startsWith('spoke:') || f.startsWith('met:')) && !charIds.has(f.split(':')[1]!)) broken.push(`${st.id} ${f}`);
          }
        }
      }
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const declared = settable();
    const set = settable();
    const read = (flags: readonly string[]) => flags.forEach((f) => declared.add(f));
    for (const q of STORY.quests) {
      if (q.discoverWhen) read(q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) read(p.flagsSet);
        for (const r of st.succeedWhenAny) read(r.predicate.flagsSet);
      }
    }
    for (const c of STORY.characters) for (const g of c.gates) read(g.requires.flagsSet);
    for (const e of STORY.worldEvents) read([...e.requiresFlags, ...e.cancelledByFlags]);

    const dead: string[] = [];
    // Endings, ability locks and doors: declared somewhere is enough (the catalog's bar).
    for (const e of STORY.endings) for (const f of e.requires.flagsSet) if (!declared.has(f) && !engineSets(f)) dead.push(`${e.id}: ${f}`);
    for (const a of STORY.abilities) for (const f of a.requires?.flagsSet ?? []) if (!declared.has(f) && !engineSets(f)) dead.push(`${a.id}: ${f}`);
    for (const l of STORY.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !declared.has(c.lockedByFlag) && !engineSets(c.lockedByFlag)) dead.push(`${l.id}->${c.to}: ${c.lockedByFlag}`);
    }
    // Predicates: the stricter bar. Reading a flag does not make it exist.
    const strict = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!set.has(f) && !engineSets(f)) dead.push(`${where}: ${f}`);
    };
    for (const q of STORY.quests) {
      if (q.discoverWhen) strict(`${q.id}/discover`, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) strict(`${q.id}/${st.id}`, p.flagsSet);
        for (const r of st.succeedWhenAny) strict(`${q.id}/${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const c of STORY.characters) for (const g of c.gates) strict(`${c.id}/${g.id}`, g.requires.flagsSet);
    for (const e of STORY.endings) strict(e.id, e.requires.flagsSet);
    for (const e of STORY.worldEvents) strict(e.id, e.requiresFlags);
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never uses a relationship gate id as a flag', () => {
    const gateIds = new Set(STORY.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const flagsRead = [
      ...STORY.endings.flatMap((e) => e.requires.flagsSet),
      ...routes.flatMap(({ route }) => route.predicate.flagsSet),
      ...STORY.abilities.flatMap((a) => a.requires?.flagsSet ?? []),
    ];
    expect(flagsRead.filter((f) => gateIds.has(f))).toEqual([]);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((STORY.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = STORY.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('gives every character a whole day, with no hole for the engine to guess at', () => {
    for (const c of STORY.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i += 1) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
    }
  });

  it('uses expressions the reaction deck draws, and gives nobody the same short name', () => {
    for (const c of STORY.characters) for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    const names = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    expect(calledName(STORY.characters.find((c) => c.id === 'tom')!)).toBe('Father Tom');
  });

  it('does not let two takeable things answer to the same word', () => {
    const seen = new Map<string, string>();
    for (const l of STORY.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka ?? []) {
          const key = alias.toLowerCase();
          expect(seen.get(key) ?? t.itemId, `${alias} means two things`).toBe(t.itemId);
          seen.set(key, t.itemId);
        }
      }
    }
  });

  it('hands every player the key and the lease, archetype or not', () => {
    const state = start(null);
    expect(STORY.rules.hardCanon.length).toBeGreaterThan(0);
    expect(STORY.rules.startingItems.length).toBeGreaterThan(0);
    for (const entry of STORY.rules.startingItems) {
      expect(state.player.inventory.find((i) => i.itemId === entry.itemId)?.quantity, entry.itemId).toBe(entry.qty);
    }
  });
});

describe('what the director would check', () => {
  it('meets the content bar', () => {
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
    const opening = STORY.opening.split(/\s+/).length;
    expect(opening).toBeGreaterThanOrEqual(50);
    expect(opening).toBeLessThanOrEqual(150);
    const premise = STORY.premise.split(/\s+/).length;
    expect(premise).toBeGreaterThanOrEqual(120);
    expect(premise).toBeLessThanOrEqual(250);
    const paragraphs = STORY.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(p.split(/\s+/).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(STORY.promises.length).toBeGreaterThanOrEqual(3);
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
    expect(STORY.openingSuggestions).toHaveLength(3);
  });

  it('passes the narrative clarity standard, premise and all', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(STORY).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message} ${e.evidence ?? ''}`)).toEqual([]);
    const premise = checkNarrativeClarity(STORY.premise, { story: STORY, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(premise.passed).toBe(true);
  });

  it('passes choice clarity on the setup screen', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(STORY);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    for (const a of STORY.archetypes) {
      expect(a.name, a.id).not.toMatch(/—/);
      for (const tag of a.playstyle) expect(tag.length, `${a.id}: ${tag}`).toBeLessThanOrEqual(24);
    }
    expect(new Set(STORY.archetypes.map((a) => a.playstyle.join('|'))).size).toBe(STORY.archetypes.length);
    const signatures = STORY.archetypes.map((a) =>
      JSON.stringify([a.attributeBonus, a.skillProficiencies, a.startingItems, a.startingAbilities]),
    );
    expect(new Set(signatures).size).toBe(signatures.length);
  });

  it('says what every ability does, whether it can fail, and what it costs', () => {
    for (const ability of STORY.abilities) {
      const effect = abilityEffect(STORY, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, `${ability.id}: ${effect}`).toBeLessThan(120);
    }
  });

  it('runs a turn without an invalid narrative', async () => {
    const { runTurn } = await import('@plotbreak/director');
    for (const actionText of ['I look around.', 'I tell him I grew up in a lighthouse.', 'I wait and listen.']) {
      const result = await runTurn({
        story: STORY,
        state: start(),
        memories: [],
        recentTurns: [],
        actionText,
        qualityTier: 'VIVID',
        turnId: 't1',
        seed: 'launch-seed',
      });
      expect(result.report.valid, actionText).toBe(true);
      expect(result.narrative.blocks.length).toBeGreaterThan(0);
    }
  });
});

describe('the rent is a choice, not a meter', () => {
  it('makes asking him in free to say and expensive to have said', () => {
    const invite = STORY.abilities.find((a) => a.id === 'invite_in')!;
    expect(invite.check).toBeNull();
    expect(abilityEffect(STORY, invite)).toMatch(/always works/);
    expect(invite.costs).toEqual([{ resourceId: 'hunger', amount: 8 }]);
  });

  it('lets the player lie, charges for it, and gives the liar an ending of their own', () => {
    const lie = STORY.abilities.find((a) => a.id === 'lie_to_him')!;
    expect(lie.unlockedByDefault).toBe(true);
    expect(lie.costs.map((c) => c.resourceId)).toEqual(['arrears']);
    const fiction = STORY.endings.find((e) => e.id === 'end_paid_in_fiction')!;
    expect(fiction.requires.flagsSet).toContain('lied_on_rent');
    expect(fiction.requires.flagsUnset).toContain('told_him_true');
  });

  it('answers every way of meeting the first knock, including shutting the door', () => {
    const first = STORY.quests.find((q) => q.id === 'q_rent_is_due')!.steps[0]!;
    const used = first.succeedWhenAny.flatMap((r) => r.predicate.flagsSet);
    for (const id of ['tell_something_true', 'lie_to_him', 'ask_him_one_back', 'invite_in', 'keep_the_door']) {
      expect(used, id).toContain(`used:${id}`);
    }
  });

  it('keeps the old words locked until the priest teaches them, in the world’s own voice', () => {
    const words_ = STORY.abilities.find((a) => a.id === 'take_back_the_welcome')!;
    expect(words_.unlockedByDefault).toBe(false);
    expect(words_.requires?.flagsSet).toEqual(['knows:the_old_words']);
    expect(words_.requires?.lockedCopy ?? '').not.toMatch(/flag|predicate|locked/i);
    const teach = STORY.quests.find((q) => q.id === 'q_the_porch_game')!.steps[0]!;
    expect(teach.rewards.flags).toContain('knows:the_old_words');
    expect(teach.rewards.abilities).toContain('take_back_the_welcome');
  });

  it('keeps the basement shut until the player knows what sleeps in it', () => {
    const lobby = STORY.locations.find((l) => l.id === 'the_lobby')!;
    expect(lobby.connections.find((c) => c.to === 'the_basement')?.lockedByFlag).toBe('knows:what_he_is');
    expect(STORY.locations.find((l) => l.id === 'the_basement')!.discoveredByDefault).toBe(false);
  });

  it('gives a fight somewhere to land: on his hunger and on the people who live here', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW resource and costs the first faction.
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('hunger');
    expect(STORY.factions[0]!.id).toBe('faction_tenants');
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/never strikes a tenant/);
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(STORY.resources).toHaveLength(3);
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

  it('has exactly one thing rest restores, and it is the player’s own sleep', () => {
    expect(STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['energy']);
  });

  it('leaves no descending variable inert', () => {
    for (const r of STORY.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = STORY.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('makes every faction an ending needs reachable from start, background and rewards', () => {
    for (const f of STORY.factions) {
      expect(f.ranks.length, f.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
    for (const ending of STORY.endings) {
      for (const need of ending.requires.minFactionReputation) {
        const faction = STORY.factions.find((f) => f.id === need.factionId)!;
        const fromBackground = Math.max(
          0,
          ...STORY.archetypes.flatMap((a) => a.startingReputation.filter((r) => r.factionId === need.factionId).map((r) => r.amount)),
        );
        const fromSteps = steps
          .flatMap(({ step }) => step.rewards.reputation)
          .filter((r) => r.factionId === need.factionId)
          .reduce((sum, r) => sum + r.amount, 0);
        expect(faction.startingReputation + fromBackground + fromSteps, `${ending.id} on ${need.factionId}`).toBeGreaterThanOrEqual(
          need.value,
        );
      }
    }
  });
});

describe('five people who could not be swapped for each other', () => {
  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of STORY.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.secrets.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('strips the speaker names off and still tells them apart', () => {
    const vocab = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^a-z\s]/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    const voices = STORY.characters.map((c) => ({ id: c.id, w: vocab(c.voiceSamples.join(' ')) }));
    for (let i = 0; i < voices.length; i += 1) {
      for (let j = i + 1; j < voices.length; j += 1) {
        const a = voices[i]!;
        const b = voices[j]!;
        const shared = [...a.w].filter((w) => b.w.has(w)).length;
        const overlap = shared / Math.min(a.w.size, b.w.size);
        expect(overlap, `${a.id} and ${b.id} talk alike (${overlap.toFixed(2)})`).toBeLessThan(0.3);
      }
    }
  });

  it('keeps the tired rhetorical moves out of everybody’s mouth', () => {
    const MOVES = [
      /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i,
      /\bI am not (?:upset|telling|asking|saying)\b/i,
      /\bnot \w+(?: \w+)?, but \w+/i,
      /\bthe kind of \w+ that\b/i,
    ];
    for (const c of STORY.characters) {
      for (const line of c.voiceSamples) for (const move of MOVES) expect(line, c.id).not.toMatch(move);
    }
  });

  it('lets nobody be won, and lets Elias leave', () => {
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/not a prize and cannot be won/);
    const romance = STORY.characters.flatMap((c) => c.gates).filter((g) => g.kind === 'ROMANCE');
    expect(romance.map((g) => g.id)).toEqual(['elias_falls']);
  });
});

describe('it can end well, badly, early, or strangely', () => {
  it('uses the whole rarity range', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBe(4);
    for (const e of STORY.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets somebody walk out, and reaches that early', () => {
    const walk = STORY.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.id).toBe('end_notice_given');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('can lose the building without the player making a mistake', () => {
    // The tax sale comes from the clock, not from anything the player did.
    const sold = STORY.endings.find((e) => e.id === 'end_sold_at_ten_past_ten')!;
    expect(sold.requires.minRelationship).toEqual([]);
    expect(sold.requires.hasItems).toEqual([]);
    const auction = STORY.worldEvents.find((e) => e.setsFlags.includes('building_sold'))!;
    expect(auction.requiresFlags).toEqual([]);
    expect(auction.cancelledByFlags).toEqual(['sale_stopped']);
  });

  it('lets the daylight errand be run in time', () => {
    const stop = STORY.quests.find((q) => q.id === 'q_lot_fourteen')!.steps[1]!;
    const auction = STORY.worldEvents.find((e) => e.id === 'we_the_auction')!;
    expect(stop.deadlineWorldMinute).toBeLessThan(auction.atWorldMinute);
  });
});

describe('art is declared, not drawn', () => {
  it('exports the raw story with no art, and the opening panel under its own key', () => {
    expect(STORY.coverImage).toBeNull();
    expect(STORY.keyArt).toBeNull();
    for (const c of STORY.characters) expect(c.portrait, c.id).toBeNull();
    expect(STORY.openingPanel?.assetKey).toBe('story_rent_is_one_true_story/opening');
  });

  it('derives every key under the story’s own prefix', () => {
    const derived = withDerivedAssetKeys(STORY);
    const prefix = 'story_rent_is_one_true_story/';
    expect(derived.coverImage).toBe(`${prefix}cover`);
    expect(derived.keyArt?.startsWith(prefix)).toBe(true);
    for (const l of derived.locations) expect(l.stageImage?.startsWith(prefix), l.id).toBe(true);
    for (const c of derived.characters) expect(c.portrait, c.id).toBe(`${prefix}${c.id}`);
  });
});

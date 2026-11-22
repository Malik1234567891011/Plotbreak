import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { checkStoryChoiceClarity, checkStoryClarity, RuleBasedIntentParser } from '@plotbreak/director';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THREE_HEROINES_AND_A_PORTER } from './three-heroines-and-a-porter.js';

/**
 * Three Heroines and a Porter, held to the promises on its own card: three
 * women who each want something different from the player, a class that costs
 * a memory every time it is used, and a classless porter who turns out to be
 * the most important person in the room only if the player goes looking.
 *
 * The story is not in the launch catalog yet, so the catalog's structural
 * checks are run here against this one world, alongside the checks every new
 * story in the fifty is held to: the opener, the ages, the voices, and the
 * three from the stories checkpoint.
 */

const S = THREE_HEROINES_AND_A_PORTER;

const start = (archetypeId = 'arch_cook') =>
  createInitialState({
    sessionId: 'sess_three_heroines',
    story: S,
    identity: {
      displayName: 'Kai Mendes',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const quest = (id: string) => S.quests.find((q) => q.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = S.quests.flatMap((q) =>
  q.steps.flatMap((st) => st.succeedWhenAny.map((route) => ({ quest: q.id, step: st.id, route }))),
);
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-two unless they say otherwise. */
const AGES: Record<string, number> = {
  rin: 22,
  maya: 23,
  saki: 21,
  bastian: 35,
  odessa: 57,
  grete: 48,
  hesper: 63,
};

/** Flags that only exist once the player has gone after the porter mystery. */
const MYSTERY_FLAGS = ['knows:porter', 'porter_named', 'porter_can_carry', 'porters_share', 'classes_lifted', 'sent_home'];

/** Every flag the world can set from authoring: rewards, routes and events. */
const settable = new Set<string>([
  ...steps.flatMap((st) => st.rewards.flags),
  ...routes.flatMap(({ route }) => route.setsFlags),
  ...S.worldEvents.flatMap((e) => e.setsFlags),
]);

/** The flag families the engine writes from play. */
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (flag: string) => flag === 'left_the_map' || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

describe('who it is and where its art goes', () => {
  it('uses the slate’s ids and asset key prefix', () => {
    expect(S.id).toBe('sv_three_heroines_and_a_porter_1');
    expect(S.storyId).toBe('story_three_heroines_and_a_porter');
    expect(S.openingPanel?.assetKey).toBe('story_three_heroines_and_a_porter/opening');
    expect(S.coverImage).toBeNull();
    expect(S.keyArt).toBeNull();
  });
});

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    const texts = [
      S.premise,
      S.opening,
      S.hook,
      ...S.openingSuggestions,
      ...S.characters.map((c) => c.cardBlurb),
      ...S.rules.styleExamples,
    ];
    for (const text of texts) expect(text).not.toContain('\\n');
  });

  it('passes the narrative clarity standard, premise and opening both', () => {
    const report = checkStoryClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const missing = report.issues.filter((i) => i.code.startsWith('MISSING_') && !i.message.startsWith('Opening:'));
    expect(missing.map((m) => m.code)).toEqual([]);
  });

  it('keeps the premise to short paragraphs a phone can hold', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
  });
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person speak inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toMatch(/"Classless," says Sir Bastian/);
  });

  it('ends on a direct question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Don’t let them vote on you\. You decide\. Are you coming with us, or not\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the people in the room and the classes the crystal just read may appear.
    const ALLOWED = new Set(['Sir', 'Bastian', 'Rin', 'Maya', 'Saki', 'Sword', 'Saint', 'Archmage']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one is the crystal, in front of the whole Choir.
    expect(risky).toMatch(/crystal/);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of S.openingSuggestions) {
      const intent = await parser.parse(card, { story: S, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('puts the obligation in the knight’s hands, due the same night', () => {
    expect(S.openingObligations).toHaveLength(1);
    expect(S.openingObligations[0]!.withCharacterId).toBe('bastian');
    expect(S.openingObligations[0]!.dueInMinutes).toBeLessThanOrEqual(180);
  });
});

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding the club’s kit as quest items', () => {
    // Production's storyteller reads quest items, never resources or the
    // general ability list.
    for (const id of ['club_pack', 'cut_rope', 'your_phone']) {
      expect(S.items.find((i) => i.id === id)?.questItem, id).toBe(true);
      expect(S.rules.startingItems.map((i) => i.itemId)).toContain(id);
    }
  });

  it('spells out the cost, the player’s exemption and the porter in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/paid for with a memory of the world the hero came from/);
    expect(canon).toMatch(/settling/);
    expect(canon).toMatch(/loses nothing and remembers everything/);
    expect(canon).toMatch(/cannot gain one/);
    expect(canon).toMatch(/Revealed only through play, never early/);
    expect(canon).toContain('PORTER');
    expect(canon).toMatch(/The Sending is real/);
    expect(canon).toMatch(/not prizes/);
  });

  it('authors exactly as many endings as the storyteller reads', () => {
    // `worldBrief` reads the first twelve.
    expect(S.endings.length).toBe(12);
  });

  it('keeps the tone guide free of literal window text', () => {
    expect(S.rules.toneGuide).not.toMatch(/\[/);
    expect(S.rules.toneGuide).toMatch(/no fan service|never fan service/i);
    expect(S.rules.toneGuide).toMatch(/kiss/);
  });

  it('gives every archetype a starting ability the storyteller can see, and something more', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThan(0);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, id).toBe(true);
      for (const tag of a.playstyle) expect(tag.length, `${a.id}: ${tag}`).toBeLessThanOrEqual(24);
    }
  });

  it('describes every ability in under a line', () => {
    for (const a of S.abilities) expect(abilityEffect(S, a).length, a.id).toBeLessThan(120);
  });
});

describe('the porter is a mystery the player earns', () => {
  const lead = quest('q_struck_line');

  it('is a lead that only opens on a deliberate flag', () => {
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_blank_line']);
  });

  it('only lets an event open the mystery for a player already pulling on it', () => {
    const openers = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_blank_line'));
    expect(openers.length).toBeGreaterThan(0);
    for (const e of openers) expect(e.requiresFlags.length, e.id).toBeGreaterThan(0);
  });

  it('can be opened in more than one way', () => {
    const fromRoutes = routes.filter(({ route }) => route.setsFlags.includes('knows:the_blank_line'));
    const fromEvents = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_blank_line'));
    expect(fromRoutes.length + fromEvents.length).toBeGreaterThanOrEqual(3);
  });

  it('does not rely on a one-shot event to open the archive door', () => {
    // A world event whose requiresFlags are unset when its minute passes is
    // skipped for good, so a route has to open the door too.
    const doorRoutes = routes.filter(({ route }) => route.setsFlags.includes('archive_open'));
    expect(doorRoutes.length).toBeGreaterThanOrEqual(2);
  });

  it('keeps most endings reachable by a player who never asks', () => {
    const plain = S.endings.filter((e) => !e.requires.flagsSet.some((f) => MYSTERY_FLAGS.includes(f)));
    expect(plain.length).toBeGreaterThanOrEqual(8);
  });

  it('gives every locked ability a reason in the fiction, not the engine', () => {
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(a.requires.lockedCopy.length, a.id).toBeGreaterThan(30);
      expect(a.requires.lockedCopy, a.id).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('closes the other two loads when the porter picks one', () => {
    const last = steps.find((st) => st.id === 'the_last_load')!;
    expect(last.succeedWhenAny).toHaveLength(3);
    for (const route of last.succeedWhenAny) expect(route.closesFlags.length, route.routeId).toBe(2);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/The player is in their twenties/);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(calledName(c));
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|schoolgirl|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
    expect(S.hook).not.toMatch(/\b(teen\w*|girl|boy|kid|child\w*|schoolgirl)\b/i);
  });
});

describe('the cover', () => {
  it('puts the title in the art, keeps the porter faceless and rules out fan service', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('THREE HEROINES AND A PORTER');
    expect(cover).toMatch(/face never shown/);
    expect(cover).toMatch(/No fan service/);
    expect(cover).toMatch(/No other text anywhere/);
    for (const name of ['Rin', 'Maya', 'Saki']) expect(cover).toContain(name);
  });
});

describe('nobody is only there to react', () => {
  it('starts the three heroines, the knight and the High Cantor in the Hall', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['rin', 'maya', 'saki', 'bastian', 'odessa']));
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of S.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(4);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('gives each heroine a want of her own and a way to refuse the player', () => {
    for (const id of ['rin', 'maya', 'saki']) {
      const c = S.characters.find((x) => x.id === id)!;
      expect(c.boundaries.length, id).toBeGreaterThanOrEqual(2);
      expect(c.hiddenDrives.length, id).toBeGreaterThanOrEqual(2);
      expect(c.secrets.length, id).toBeGreaterThanOrEqual(2);
      expect(c.gates.some((g) => g.kind === 'ROMANCE'), id).toBe(true);
    }
  });

  const content = (text: string) =>
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 3),
    );

  it('keeps every pair of them lexically apart', () => {
    const vocab = new Map(S.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of S.characters) {
      for (const b of S.characters) {
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
      ['numbered points', /\b(?:First|Second|Third),/],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
    // Numbered points belong to Maya.
    const numbered = S.characters.filter((c) => c.voiceSamples.some((v) => /\bFirst,/.test(v))).map((c) => c.id);
    expect(numbered).toEqual(['maya']);
  });

  it('uses expressions the generator draws, and short names nobody shares', () => {
    for (const c of S.characters) for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    const short = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(short).size).toBe(short.length);
    expect(calledName(S.characters.find((c) => c.id === 'bastian')!)).toBe('Bastian');
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((S.rules.startWorldMinute % 1440) + 1440) % 1440;
    const placed = (c: (typeof S.characters)[number]) =>
      c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) || c.homeLocationId !== null;
    expect(S.characters.filter((c) => !placed(c)).map((c) => c.id)).toEqual([]);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('the catalog’s structural checks, run on this world', () => {
  it('has more than one way through, and some routes shut doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...S.archetypes.flatMap((a) => a.startingAbilities),
      ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap((s) => s.rewards.abilities),
    ]);
    const obtainable = new Set([
      ...S.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...S.rules.startingItems.map((i) => i.itemId),
      ...steps.flatMap((s) => s.rewards.items.map((i) => i.itemId)),
      ...S.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { quest: q, step, route } of routes) {
      const where = `${q}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      const demanded = [...(st.succeedWhen?.hasItems ?? []), ...st.succeedWhenAny.flatMap((r) => r.predicate.hasItems)];
      for (const itemId of demanded) expect(granted.has(itemId), `${st.id} awards ${itemId}`).toBe(false);
    }
  });

  it('leaves something worth taking, and no two things answer to the same words', () => {
    const takeable = S.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    const owners = new Map<string, Set<string>>();
    for (const entry of takeable) {
      for (const alias of entry.aka ?? []) {
        const key = alias.trim().toLowerCase();
        owners.set(key, (owners.get(key) ?? new Set()).add(entry.itemId));
      }
    }
    expect([...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias)).toEqual([]);
  });

  it('points only at things that exist', () => {
    const locIds = new Set(S.locations.map((l) => l.id));
    const itemIds = new Set(S.items.map((i) => i.id));
    const charIds = new Set(S.characters.map((c) => c.id));
    const abIds = new Set(S.abilities.map((a) => a.id));
    const facIds = new Set(S.factions.map((f) => f.id));
    const resIds = new Set(S.resources.map((r) => r.id));
    const broken: string[] = [];

    for (const l of S.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} item owned by ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of S.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const o of S.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push('obligation');
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        for (const pred of [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)]) {
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

  it('never gates something behind a flag nothing can set', () => {
    const declared = new Set<string>(settable);
    for (const q of S.quests) {
      if (q.discoverWhen) for (const f of q.discoverWhen.flagsSet) declared.add(f);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) for (const f of p.flagsSet) declared.add(f);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) declared.add(f);
      }
    }
    const dead: string[] = [];
    for (const e of S.endings) for (const f of e.requires.flagsSet) if (!declared.has(f) && !engineSets(f)) dead.push(`${e.id}: ${f}`);
    for (const a of S.abilities) for (const f of a.requires.flagsSet) if (!settable.has(f) && !engineSets(f)) dead.push(`${a.id}: ${f}`);
    for (const l of S.locations) {
      for (const c of l.connections) {
        if (c.lockedByFlag && !settable.has(c.lockedByFlag) && !engineSets(c.lockedByFlag)) dead.push(`${l.id}->${c.to}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it('never uses a gate id as a flag', () => {
    const gateIds = new Set(S.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const read = [
      ...routes.flatMap(({ route }) => route.predicate.flagsSet),
      ...S.endings.flatMap((e) => e.requires.flagsSet),
      ...S.abilities.flatMap((a) => a.requires.flagsSet),
    ];
    expect(read.filter((f) => gateIds.has(f))).toEqual([]);
  });

  it('has no quest flag that only a skipped event could set', () => {
    // Every flag a predicate reads that is not the engine's own must have a
    // source that is not a conditional one-shot event.
    const reliable = new Set<string>([
      ...steps.flatMap((st) => st.rewards.flags),
      ...routes.flatMap(({ route }) => route.setsFlags),
      ...S.worldEvents.filter((e) => e.requiresFlags.length === 0).flatMap((e) => e.setsFlags),
    ]);
    const fragile = routes
      .flatMap(({ route }) => route.predicate.flagsSet)
      .filter((f) => !engineSets(f) && !reliable.has(f));
    expect([...new Set(fragile)]).toEqual([]);
  });

  it('passes choice clarity on the setup screen', () => {
    const report = checkStoryChoiceClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('names only flags this world or the engine sets', () => {
    for (const e of S.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) {
        if (engineSets(f)) continue;
        expect(settable.has(f), `${e.id} reads ${f}`).toBe(true);
      }
    }
  });

  it('tells the writer what each ending means and never ends on turn zero', () => {
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk).toBeDefined();
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('can be lost by a pleasant week where nobody says anything', () => {
    const drift = S.endings.find((e) => e.id === 'end_three_heroes_and_a_stranger')!;
    expect(drift.rarity).toBe('COMMON');
    expect(drift.requires.minRelationship).toEqual([]);
    expect(drift.requires.flagsUnset).toEqual(expect.arrayContaining(['keeper_of_home', 'heroes_told']));
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('gives each heroine an ending of her own', () => {
    for (const flag of ['rin_said_it', 'maya_said_it', 'saki_said_it']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(S.resources.length).toBe(3);
    for (const r of S.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('lets rest restore the day and nothing else', () => {
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes a fight in the palace raise the escort’s watch first', () => {
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(S.factions[0]?.id).toBe('faction_escort');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('makes leaning on their classes the thing that costs them', () => {
    const lean = ability('lean_on_them');
    expect(lean.check).toBeNull();
    expect(lean.costs.map((c) => c.resourceId)).toEqual(['fading']);
    expect(ability('carry_them_home').requires.maxResources).toEqual([{ resourceId: 'fading', value: 75 }]);
  });
});

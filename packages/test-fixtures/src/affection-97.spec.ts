import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { AFFECTION_97 } from './affection-97.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Affection: 97, held to the promises on its own card: a prince who says he
 * despises you, a number over his head that says otherwise, a bride with her
 * own plan, a knight with no number, and a window that closes the first time
 * he says it himself.
 *
 * The story is not in the launch catalog yet, so the catalog-wide wiring checks
 * do not run on it. The ones that have caught real bugs are repeated here, next
 * to the three checks every new story runs and the checks for the opener and
 * the ages.
 */

const S = AFFECTION_97;

const start = (archetypeId = 'arch_old_name') =>
  createInitialState({
    sessionId: 'sess_affection_97',
    story: S,
    identity: {
      displayName: 'Elise Marlowe',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = S.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ quest: q.id, step: s.id, route: r }))));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-three. */
const AGES: Record<string, number> = { aldric: 25, viola: 24, bastien: 27, ottilie: 51, cress: 29, maren: 31 };

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
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('The crown prince, Aldric,');
    expect(head).toContain('"I despise you," he says.');
  });

  it('ends on a question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Do you understand\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the prince, introduced by his title, may appear.
    const ALLOWED = new Set(['Aldric', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
  });

  it('puts the window on the page, rising while he says the opposite', () => {
    expect(S.opening).toContain('[Affection 97 ▲]');
    expect(S.opening).toContain('[Affection 98 ▲]');
    expect(S.opening.indexOf('I despise you')).toBeLessThan(S.opening.indexOf('[Affection 97 ▲]'));
  });

  it('is the same opener the bible signs off on', () => {
    const bible = readFileSync(
      fileURLToPath(new URL('../../../docs/story-bibles/new50/44_AFFECTION_97.md', import.meta.url)),
      'utf8',
    ).replace(/’/g, "'");
    for (const paragraph of S.opening.split('\n\n')) {
      expect(bible, paragraph).toContain(`> ${paragraph.replace(/’/g, "'")}`);
    }
    for (const card of S.openingSuggestions) expect(bible, card).toContain(card.replace(/’/g, "'"));
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The done one closes the distance he asked for; the risky one tells him
    // about the window.
    expect(done).toMatch(/step closer/);
    expect(risky).toMatch(/number up there/);
  });

  it('writes every card as something the player says or does', () => {
    for (const s of S.openingSuggestions) {
      expect(s.length, s).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s, s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get)\b/);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of S.openingSuggestions) {
      const intent = await parser.parse(card, { story: S, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('puts the opening panel where the asset pipeline will look', () => {
    expect(S.openingPanel?.assetKey).toBe('story_affection_97/opening');
    expect(withDerivedAssetKeys(S).coverImage).toBe('story_affection_97/cover');
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-three');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(calledName(c));
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    // The title is painted into the cover, and it is the only number allowed there.
    expect(S.coverDirection).toContain('AFFECTION: 97');
    expect((S.coverDirection ?? '').replaceAll('AFFECTION: 97', '')).not.toMatch(AGE_WORDS);
  });
});

describe('it stays thirteen-plus', () => {
  it('caps romance at a kiss, asked for, in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/no further than a kiss/);
    expect(canon).toMatch(/without being asked/);
    expect(S.rules.allowsCombat).toBe(false);
    expect(S.intensity).toBe('LIGHT');
  });

  it('has nothing explicit or graphic anywhere a player or the storyteller reads', () => {
    const BANNED = /\b(nude|naked|sex\w*|undress\w*|lingerie|cleavage|gore|blood\w*|suicid\w*|self-harm|wound\w*|corpse)\b/i;
    const texts = [
      S.premise,
      S.opening,
      S.hook,
      S.creatorNote,
      S.rules.toneGuide,
      S.coverDirection ?? '',
      ...S.openingSuggestions,
      ...S.rules.hardCanon,
      ...S.rules.styleExamples,
      ...S.characters.flatMap((c) => [c.appearance, c.cardBlurb, ...c.voiceSamples, ...c.secrets.map((s) => s.fact)]),
      ...S.endings.flatMap((e) => [e.condition, e.epilogue]),
      ...S.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
      ...S.items.flatMap((i) => [i.description, i.loreText]),
      ...S.locations.flatMap((l) => [l.description, l.artDirection]),
    ];
    const hits = texts.filter((t) => BANNED.test(t)).map((t) => t.slice(0, 60));
    expect(hits).toEqual([]);
  });
});

describe('it is its own story', () => {
  it('borrows no names or terms from other fiction or apps', () => {
    const BORROWED = /\b(OOC|Bridgerton|Westeros|Regency|isekai|villainess|otome|system window|status window|level up|stat screen|HP|MP|EXP)\b/i;
    const texts = [
      S.title,
      S.premise,
      S.opening,
      S.hook,
      S.creatorNote,
      S.rules.toneGuide,
      ...S.rules.hardCanon,
      ...S.characters.flatMap((c) => [c.name, c.role, c.cardBlurb, ...c.voiceSamples]),
      ...S.locations.map((l) => l.name),
      ...S.items.map((i) => i.name),
      ...S.quests.map((q) => q.title),
      ...S.endings.map((e) => e.name),
    ];
    const hits = texts.filter((t) => BORROWED.test(t)).map((t) => t.slice(0, 60));
    expect(hits).toEqual([]);
  });

  it('is written in English, title included', () => {
    expect(S.title).toBe('Affection: 97');
    expect(S.rules.hardCanon.join(' ')).not.toMatch(/[àâçéèêëîïôûùüÿœæ]/i);
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
    for (const c of S.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('the window lives where the storyteller can read it', () => {
  it('starts the player holding the window, written out', () => {
    // Production reads quest items, never step notes, so the window is an item.
    const window = S.items.find((i) => i.id === 'the_window')!;
    expect(window.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('the_window');
    expect(window.description).toContain('[Affection 97 ▲]');
    expect(window.description).toMatch(/Only you can see it/);
  });

  it('spells out the window’s rules and how it closes in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/always true/);
    expect(canon).toMatch(/closes for good the first time Aldric says out loud/);
    expect(canon).toMatch(/Only the player can see it/);
    expect(canon).toMatch(/Midsummer Rite/);
  });

  it('gives every background one ability the storyteller can see', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThan(0);
      for (const id of a.startingAbilities) expect(ability(id), `${a.id} -> ${id}`).toBeDefined();
    }
    expect(new Set(S.archetypes.map((a) => a.startingAbilities[0])).size).toBe(S.archetypes.length);
  });

  it('never puts two archetype names where they would read as coexisting', () => {
    const haystack = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    const named = S.archetypes.filter((a) => haystack.includes(a.name));
    expect(named.map((a) => a.id)).toEqual([]);
  });
});

describe('the first answer is the player’s, every way', () => {
  const room = steps.find((s) => s.id === 'the_music_room')!;

  it('answers the opener four ways, telling him included', () => {
    const ids = room.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(expect.arrayContaining(['did_as_told', 'called_his_bluff', 'stepped_closer', 'told_him']));
    const told = room.succeedWhenAny.find((r) => r.routeId === 'told_him')!;
    expect(told.setsFlags).toContain('he_knows_about_the_window');
  });

  it('lets the number turn on her only if he knows it exists', () => {
    const caught = routes.find((r) => r.route.routeId === 'he_caught_you')!.route;
    expect(caught.predicate.flagsSet).toEqual(expect.arrayContaining(['used:play_the_number', 'he_knows_about_the_window']));
    expect(caught.closesFlags).toContain('he_said_it');
  });

  it('closes the window only when he says it himself, or answers her', () => {
    const said = routes.filter(({ route }) => route.setsFlags.includes('he_said_it'));
    expect(said.map(({ route }) => route.routeId).sort()).toEqual(['he_said_it_himself', 'you_said_it_first']);
  });

  it('sends the search only after the Queen has noticed, and calls it off for her allies and her equals', () => {
    const search = S.worldEvents.find((e) => e.id === 'we_the_search')!;
    expect(search.requiresFlags).toEqual(['queen_noticed']);
    expect(search.cancelledByFlags).toEqual(expect.arrayContaining(['queen_protege', 'queen_disarmed']));
  });

  it('holds the rite and the rehearsal only while the betrothal stands', () => {
    for (const id of ['we_the_rehearsal', 'we_the_midsummer_rite']) {
      const e = S.worldEvents.find((x) => x.id === id)!;
      expect(e.cancelledByFlags, id).toEqual(expect.arrayContaining(['rite_broken', 'ran_with_him']));
    }
  });
});

describe('the wish is optional and behaves like it', () => {
  it('hides the fountain behind a flag only a curious player sets', () => {
    const lead = S.quests.find((q) => q.id === 'q_the_wish')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_fountain']);
    const events = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_fountain'));
    expect(events.length).toBeGreaterThan(0);
    for (const e of events) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('keeps the locked ability locked, in the world’s own words', () => {
    const trace = ability('trace_the_wish');
    expect(trace.unlockedByDefault).toBe(false);
    expect(trace.requires.flagsSet).toEqual(['knows:the_fountain']);
    expect(trace.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(trace.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('keeps the sunken garden shut until the player knows it is there', () => {
    const garden = S.locations.find((l) => l.id === 'sunken_garden')!;
    expect(garden.discoveredByDefault).toBe(false);
    const ways = S.locations.flatMap((l) => l.connections.filter((c) => c.to === 'sunken_garden'));
    expect(ways.length).toBeGreaterThan(0);
    for (const w of ways) expect(w.lockedByFlag).toBe('knows:the_fountain');
  });

  it('leaves most of the ending space reachable without it', () => {
    const wish = new Set(['fountain_answered', 'wish_answered', 'knows:who_wished', 'found_the_coin']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => wish.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(9);
  });
});

describe('nobody is only there to react', () => {
  it('starts with Aldric in the music room and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(['aldric']);
  });

  it('starts Aldric at ninety-seven, and nowhere near trusting her', () => {
    const aldric = S.characters.find((c) => c.id === 'aldric')!;
    expect(aldric.startingRelationship.affection).toBe(97);
    expect(aldric.startingRelationship.trust).toBeLessThan(50);
    expect(aldric.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(aldric.secrets.length).toBeGreaterThanOrEqual(3);
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
  });

  it('gives no two people the same short name, and only faces that exist', () => {
    const called = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size).toBe(called.length);
    expect(calledName(S.characters.find((c) => c.id === 'aldric')!)).toBe('Aldric');
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });
});

describe('the wiring holds', () => {
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
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} scheduled at ${b.locationId}`);
    }
    for (const a of S.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push(`startingLocationId ${S.rules.startingLocationId}`);
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
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

  it('never gates something behind a flag nothing can set', () => {
    const declared = new Set<string>();
    for (const st of steps) {
      for (const f of st.rewards.flags) declared.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) declared.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) declared.add(f);
    const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

    const needed: Array<[string, string]> = [];
    for (const e of S.endings) for (const f of e.requires.flagsSet) needed.push([`ending ${e.id}`, f]);
    for (const a of S.abilities) for (const f of a.requires?.flagsSet ?? []) needed.push([`ability ${a.id}`, f]);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) needed.push([`way ${l.id}->${c.to}`, c.lockedByFlag]);
    for (const q of S.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) needed.push([`quest ${q.id}`, f]);
      for (const st of q.steps) {
        for (const f of st.enterWhen?.flagsSet ?? []) needed.push([`step ${st.id}`, f]);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) needed.push([`route ${r.routeId}`, f]);
      }
    }
    for (const c of S.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) needed.push([`gate ${g.id}`, f]);
    for (const e of S.worldEvents) for (const f of e.requiresFlags) needed.push([`event ${e.id}`, f]);

    const dead = needed.filter(([, f]) => !declared.has(f) && !engineSets(f)).map(([where, f]) => `${where} needs ${f}`);
    expect(dead).toEqual([]);
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
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      for (const r of st.succeedWhenAny) {
        for (const itemId of r.predicate.hasItems) expect(granted.has(itemId), `${st.id}/${r.routeId}`).toBe(false);
      }
    }
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('branches, and some branches shut doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
    expect(new Set(routes.map(({ route }) => route.routeId)).size).toBeGreaterThan(routes.length / 2);
  });

  it('can reach every reputation it gates on, from any background', () => {
    const rewards = (factionId: string) =>
      steps.flatMap((s) => s.rewards.reputation).filter((r) => r.factionId === factionId).reduce((n, r) => n + r.amount, 0);
    const gates = [
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
      ...S.endings.flatMap((e) => e.requires.minFactionReputation),
    ];
    for (const g of gates) {
      const f = S.factions.find((x) => x.id === g.factionId)!;
      expect(f.startingReputation + rewards(f.id), `${f.id} gate ${g.value}`).toBeGreaterThanOrEqual(g.value);
    }
    for (const f of S.factions) {
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
  });

  it('keeps every ability effect short enough for a chip', () => {
    for (const a of S.abilities) expect(abilityEffect(S, a).length, a.id).toBeLessThan(120);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_sent_home', 'end_the_number_falls', 'end_ninety_seven_forever', 'end_the_coach_at_dawn']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('lets him say it as the common good ending, and not after she used the number on him', () => {
    const loud = S.endings.find((e) => e.id === 'end_out_loud')!;
    expect(loud.rarity).toBe('COMMON');
    expect(loud.requires.flagsSet).toContain('he_said_it');
    expect(loud.requires.flagsUnset).toEqual(expect.arrayContaining(['he_found_out', 'rite_sealed']));
  });

  it('makes choosing the knight a real ending of its own', () => {
    const knight = S.endings.find((e) => e.id === 'end_no_number')!;
    expect(knight.requires.flagsSet).toEqual(['chose_bastien']);
    expect(knight.condition).toMatch(/never read as second prize/);
  });

  it('fits every ending into what the storyteller reads', () => {
    // It reads only the first twelve.
    expect(S.endings.length).toBeLessThanOrEqual(12);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
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

  it('lets rest restore her nerve and nothing else', () => {
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('makes a public scene cost talk and the court before anything else', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('gossip');
    expect(S.factions[0]?.id).toBe('faction_court');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(S.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), `${r.id} never moves`).toBe(true);
      expect(r.regenPerHour, r.id).toBeLessThan(0);
    }
  });
});

describe('a new reader can follow it', () => {
  it('has a premise long enough to set the scene and short enough to read', () => {
    const n = words(S.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(250);
  });

  it('passes the narrative clarity standard with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('passes the choice clarity standard with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });
});

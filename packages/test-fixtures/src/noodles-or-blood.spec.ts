import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { NOODLES_OR_BLOOD } from './noodles-or-blood.js';

/**
 * Noodles or Blood, held to the promises on its own card: a rent you can pay,
 * fight or refuse; fights that go on the record anywhere but one landing; a
 * floor that can close; somebody who framed bed 307; and a floor you can end
 * up running yourself.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalog-wide checks a new world
 * would otherwise inherit (routes, references, flags, the opening cards, the
 * expressions, the endings) are run here against this story alone.
 */

const S = NOODLES_OR_BLOOD;

const start = (archetypeId = 'arch_kitchen') =>
  createInitialState({
    sessionId: 'sess_noodles_or_blood',
    story: S,
    identity: {
      displayName: 'Kai Morrow',
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
const routes = S.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ q: q.id, s: s.id, r }))));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is at least nineteen. */
const AGES: Record<string, [number, string]> = {
  daigo: [22, 'twenty-two'],
  rumi: [20, 'twenty'],
  ken: [24, 'twenty-four'],
  bunta: [19, 'nineteen'],
  mabuchi: [23, 'twenty-three'],
  fujii: [58, 'fifty-eight'],
};

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

  it('is written in English, with nothing outside plain text and curly quotes', () => {
    const outside = JSON.stringify(S).match(/[^\x20-\x7E’]/g) ?? [];
    expect([...new Set(outside)]).toEqual([]);
  });

  it('keeps the premise inside the card’s word budget and passes the clarity check', async () => {
    const n = words(S.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(240);
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => e.code)).toEqual([]);
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
    expect(head).toContain('Daigo');
    expect(head).toMatch(/^"Rent’s due, Transfer\."/);
  });

  it('ends on a question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Well\? Noodles, or the stairs\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the two people introduced in the scene, and what Daigo calls you, may
    // appear.
    const ALLOWED = new Set(['Daigo', 'Rumi', 'Transfer', 'I']);
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
    for (const card of S.openingSuggestions) expect(card, card).toMatch(/\bI\b/);
    // The risky one accepts the stairs without throwing anything.
    expect(risky).toMatch(/stairwell door/);
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

  it('puts the rent on a clock that runs out at curfew', () => {
    const [due] = S.openingObligations;
    expect(due?.withCharacterId).toBe('daigo');
    expect(S.rules.startWorldMinute + due!.dueInMinutes).toBe(23 * 60);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/player is .*at least nineteen/);
    expect(canon).toMatch(/post-secondary/);
    for (const c of S.characters) {
      const age = AGES[c.id];
      expect(age, `${c.id} has no stated age`).toBeDefined();
      expect(age![0]).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toMatch(new RegExp(`${c.name}[^.]{0,20}\\b${age![1]}\\b`));
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('never uses a word that reads as a minor anywhere', () => {
    const MINOR = /\b(teen\w*|schoolgirl|schoolboy|high school|middle school|underage|minors?|kids?|child\w*)\b/i;
    expect(JSON.stringify(S)).not.toMatch(MINOR);
  });
});

describe('content stays at thirteen and up, and stays original', () => {
  it('keeps romance to a kiss and fights free of gore', () => {
    const text = JSON.stringify(S);
    expect(S.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
    expect(text).not.toMatch(/\b(sex\w*|naked|nude|undress\w*|gore|gory|bloodied|bloody|guts|entrails|severed|stab\w*|suicid\w*|self-harm)\b/i);
  });

  it('borrows no franchise names or terms', () => {
    const BANNED =
      /\b(Iron Fist|Lookism|Suzuran|Toman|Quirks?|Nen|chakra|Crows Zero|Tokyo Revengers|Wind Breaker|Bofurin|Furin|Houou|Hakuran|Kantou Manji|Bonten|Valhalla|Black Dragons)\b/i;
    expect(JSON.stringify(S)).not.toMatch(BANNED);
  });
});

describe('the cover, the opening panel and the release', () => {
  it('gives the title its own TITLE: line, spelled exactly, and keeps every effect off faces', () => {
    // generatedCoverPrompt drops the generic lower-third rules only when the
    // direction carries its own TITLE: line.
    const cover = S.coverDirection!;
    expect(cover.indexOf('TITLE:')).toBeGreaterThan(-1);
    const titleLine = cover.slice(cover.indexOf('TITLE:'));
    expect(titleLine).toContain('Noodles or Blood');
    expect(titleLine).toContain('Spelled exactly NOODLES OR BLOOD');
    expect(titleLine).toMatch(/upper third/);
    expect(cover).toMatch(/HIS FACE STAYS CLEAN/);
    expect(cover).toMatch(/never on a face/);
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('declares the opening panel under the story’s own asset prefix', () => {
    expect(S.id).toBe('sv_noodles_or_blood_1');
    expect(S.storyId).toBe('story_noodles_or_blood');
    expect(S.openingPanel?.assetKey).toBe('story_noodles_or_blood/opening');
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
  });

  it('starts the panel alt with the first name of whoever speaks in the opener', () => {
    // opening-panel-art.ts uses that character's portrait as the reference.
    const firstNamed = S.characters
      .map((c) => ({ c, at: S.opening.indexOf(calledName(c)) }))
      .filter((x) => x.at >= 0)
      .sort((a, b) => a.at - b.at)[0]!.c;
    expect(firstNamed.id).toBe('daigo');
    expect(S.openingPanel!.alt.startsWith(`${firstNamed.name.split(' ')[0]!} `)).toBe(true);
  });

  it('draws a portrait for everybody with a card', () => {
    for (const c of S.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.length, c.id).toBeGreaterThan(80);
    }
  });

  it('opens straight on the scene and has no release date yet', () => {
    expect(S.prologue).toEqual([]);
    expect(S.publishedAt).toBeNull();
  });

  it('says what everybody is actually called', () => {
    for (const c of S.characters) expect(c.calledName, c.id).toBeTruthy();
  });

  it('tells the storyteller what the invisible variables look like', () => {
    // Production's storyteller never reads resources, so the warden's
    // attention and the landing's bruises have to be in hard canon.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/warden’s attention/);
    expect(canon).toMatch(/Bruises from the landing/);
  });
});

describe('the rent is the opener, and every answer to it is a route', () => {
  it('starts the rent and the record live, and nothing else', () => {
    expect(S.quests.filter((q) => q.startsActive).map((q) => q.id)).toEqual(['q_rent_is_due', 'q_on_the_record']);
  });

  it('lets the player cook, fight, swing, refuse, bluff or walk off', () => {
    const first = quest('q_rent_is_due').steps[0]!;
    expect(first.succeedWhenAny.map((r) => r.routeId)).toEqual([
      'cooked',
      'took_the_stairs',
      'fought_on_the_landing',
      'swung_in_the_corridor',
      'refused',
      'talked',
      'walked',
      'slipped_out',
    ]);
  });

  it('keeps a fight on the landing off the record and puts one anywhere else on it', () => {
    // Routes are checked in array order and the first match wins, so the
    // landing route has to come before the corridor one.
    const first = quest('q_rent_is_due').steps[0]!.succeedWhenAny;
    const landing = first.find((r) => r.routeId === 'fought_on_the_landing')!;
    const corridor = first.find((r) => r.routeId === 'swung_in_the_corridor')!;
    expect(landing.predicate.atLocation).toBe('back_stairs');
    expect(landing.setsFlags).not.toContain('third_incident');
    expect(corridor.setsFlags).toContain('third_incident');
    expect(first.indexOf(landing)).toBeLessThan(first.indexOf(corridor));
  });

  it('writes the third incident for a blow at the warden or at Mabuchi', () => {
    const record = quest('q_on_the_record').steps[0]!.succeedWhenAny;
    for (const id of ['hit_mabuchi', 'hit_the_warden']) {
      expect(record.find((r) => r.routeId === id)!.setsFlags, id).toContain('third_incident');
    }
  });

  it('saves the floor at the review only while the third incident is unwritten', () => {
    const review = quest('q_the_review').steps[0]!.succeedWhenAny;
    for (const r of review.filter((x) => x.setsFlags.includes('floor_saved'))) {
      expect(r.predicate.flagsUnset, r.routeId).toContain('third_incident');
    }
    expect(review.at(-1)!.setsFlags).toEqual(['floor_closed']);
  });

  it('puts the rent, the evidence and the record where the storyteller reads them', () => {
    // Production's storyteller reads quest items, never resources.
    for (const id of ['food_money', 'noodle_bowls', 'the_grinder', 'window_note', 'tool_tags', 'ken_tab_book', 'incident_book', 'daigo_results_slip']) {
      expect(S.items.find((i) => i.id === id)?.questItem, id).toBe(true);
    }
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('food_money');
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/nothing to the face, nothing in your hands/);
    expect(canon).toMatch(/third incident/);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    const gated = S.abilities.filter((x) => !x.unlockedByDefault);
    expect(gated.map((a) => a.id)).toEqual(['call_the_floor']);
    for (const a of gated) expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('gated things open, and say so in the fiction', () => {
  it('locks Call the Floor behind feeding the floor, in words the player reads', () => {
    const call = ability('call_the_floor');
    expect(call.requires.flagsSet).toEqual(['floor_follows_you']);
    expect(call.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(call.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const feeding = quest('q_last_week').steps[0]!;
    expect(feeding.rewards.flags).toContain('floor_follows_you');
  });

  it('never gates anything behind a flag nothing sets', () => {
    const settable = new Set<string>(['left_the_map']);
    for (const st of steps) {
      for (const f of st.rewards.flags) settable.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) settable.add(f);
    const ENGINE = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const ok = (f: string) => settable.has(f) || ENGINE.some((p) => f.startsWith(p));

    const read: Array<[string, string]> = [];
    for (const q of S.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) read.push([q.id, f]);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) for (const f of [...(p?.flagsSet ?? []), ...(p?.flagsUnset ?? [])]) read.push([st.id, f]);
        for (const r of st.succeedWhenAny) for (const f of [...r.predicate.flagsSet, ...r.predicate.flagsUnset]) read.push([`${st.id}/${r.routeId}`, f]);
      }
    }
    for (const c of S.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) read.push([g.id, f]);
    for (const e of S.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) read.push([e.id, f]);
    for (const e of S.endings) for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) read.push([e.id, f]);
    for (const a of S.abilities) for (const f of a.requires.flagsSet) read.push([a.id, f]);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) read.push([`${l.id}->${c.to}`, c.lockedByFlag]);

    const dead = read.filter(([, f]) => !ok(f)).map(([where, f]) => `${where} needs ${f}`);
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
    for (const { q, s, r } of routes) {
      for (const f of r.predicate.flagsSet.filter((x) => x.startsWith('used:'))) {
        expect(grantable.has(f.slice(5)), `${q}/${s}/${r.routeId} needs ${f}`).toBe(true);
      }
      for (const i of r.predicate.hasItems) expect(obtainable.has(i), `${q}/${s}/${r.routeId} needs ${i}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      for (const r of st.succeedWhenAny) for (const i of r.predicate.hasItems) expect(granted.has(i), st.id).toBe(false);
    }
  });

  it('closes doors when routes are taken, and branches everywhere', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ r }) => r.closesFlags.length > 0)).toBe(true);
  });
});

describe('everything points at something that exists', () => {
  it('has no dangling references', () => {
    const locIds = new Set(S.locations.map((l) => l.id));
    const itemIds = new Set(S.items.map((i) => i.id));
    const charIds = new Set(S.characters.map((c) => c.id));
    const abIds = new Set(S.abilities.map((a) => a.id));
    const facIds = new Set(S.factions.map((f) => f.id));
    const resIds = new Set(S.resources.map((r) => r.id));
    const skillIds = new Set(S.skills.map((s) => s.id));
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
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const i of S.items) {
      for (const k of Object.keys(i.skillModifiers)) if (!skillIds.has(k)) broken.push(`${i.id} modifies ${k}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const k of Object.keys(a.skillProficiencies)) if (!skillIds.has(k)) broken.push(`${a.id} skill ${k}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const o of S.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    const preds = [
      ...S.endings.map((e) => e.requires),
      ...S.quests.flatMap((q) => [
        q.discoverWhen,
        ...q.steps.flatMap((st) => [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)]),
      ]),
    ];
    for (const p of preds) {
      if (!p) continue;
      for (const i of p.hasItems) if (!itemIds.has(i)) broken.push(`wants item ${i}`);
      if (p.atLocation && !locIds.has(p.atLocation)) broken.push(`at ${p.atLocation}`);
      for (const r of p.minRelationship) if (!charIds.has(r.characterId)) broken.push(`on ${r.characterId}`);
      for (const r of p.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`on ${r.factionId}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
    }
    expect(broken).toEqual([]);
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) owners.set(alias.toLowerCase(), (owners.get(alias.toLowerCase()) ?? new Set()).add(t.itemId));
      }
    }
    expect([...owners].filter(([, ids]) => ids.size > 1).map(([a]) => a)).toEqual([]);
  });

  it('leaves no place nobody can walk to', () => {
    const orphans = S.locations.filter(
      (l) => !l.discoveredByDefault && !S.locations.some((o) => o.connections.some((c) => c.to === l.id)),
    );
    expect(orphans.map((l) => l.id)).toEqual([]);
  });
});

describe('the setup screen says what it is asking', () => {
  it('passes the choice clarity check with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code} ${e.optionId ?? ''}`)).toEqual([]);
  });

  it('says the trade is fixed for the whole story', () => {
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/fixed for the whole story/);
    expect(field.helpText).toMatch(/cannot be changed later/);
  });

  it('gives every trade two abilities the storyteller can see, and different ones', () => {
    const seen = new Set<string>();
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBe(2);
      for (const id of a.startingAbilities) {
        expect(seen.has(id), `${id} is given twice`).toBe(false);
        seen.add(id);
      }
    }
  });

  it('keeps the trades out of canon, so they never read as people in the world', () => {
    const canon = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(canon, a.name).not.toContain(a.name);
  });

  it('states what every ability does in plain words', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });
});

describe('nobody is only there to react', () => {
  it('starts Daigo and Rumi in the common room, and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['daigo', 'rumi']);
  });

  it('places everybody by schedule, all day, every day', () => {
    for (const c of S.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
      expect(c.homeLocationId, c.id).not.toBeNull();
    }
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
      expect(c.combatant, `${c.id} cannot be fought`).not.toBeNull();
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('uses only faces the generator draws, and a different short name for each', () => {
    for (const c of S.characters) for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
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
});

describe('it can end badly, early and in many ways', () => {
  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range, and fits in what the storyteller reads', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    // Only the first twelve reach the storyteller.
    expect(S.endings.length).toBeLessThanOrEqual(12);
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_boxes_in_the_corridor', 'end_bed_307_again', 'end_both_floors', 'end_headfirst']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('tells the writer what each ending means, not only what unlocks it', () => {
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

  it('lets rest restore the day and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes public violence raise the heat and cost the warden’s goodwill', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('heat');
    expect(S.factions[0]?.id).toBe('faction_office');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('can reach every faction rank a gate or ending asks for', () => {
    for (const e of S.endings) {
      for (const need of e.requires.minFactionReputation) {
        const f = S.factions.find((x) => x.id === need.factionId)!;
        const gains =
          f.startingReputation +
          steps.flatMap((s) => s.rewards.reputation).filter((r) => r.factionId === f.id && r.amount > 0).reduce((n, r) => n + r.amount, 0) +
          Math.max(0, ...S.archetypes.flatMap((a) => a.startingReputation).filter((r) => r.factionId === f.id).map((r) => r.amount));
        expect(gains, `${e.id} needs ${f.id} ${need.value}`).toBeGreaterThanOrEqual(need.value);
      }
    }
  });
});

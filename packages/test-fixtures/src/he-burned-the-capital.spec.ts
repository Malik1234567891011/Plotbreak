import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { HE_BURNED_THE_CAPITAL } from './he-burned-the-capital.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * He Burned the Capital, held to the promise in its own opener: the most
 * dangerous man in the kingdom is asking, and "tell me no" is a real answer.
 *
 * The failure this world is most exposed to is the genre's own. An obsessive
 * lead slides, one beat at a time, into a man who takes what he wants, and a
 * 13+ romance becomes a story about being captured. So the first thing checked
 * here is that a no is honoured by the rules as well as the prose: it always
 * works, it never inflames him, it closes the yes, and it leads somewhere that
 * is not written as a punishment.
 *
 * The second is that the rumour has a real answer under it, and that the
 * answer does not let anybody off: the prince lit the match, and the duke is
 * still responsible for nine people.
 *
 * The story is not in `LAUNCH_CATALOG` yet, so the catalog-wide specs do not
 * reach it. The checks a new story can fail without anybody noticing are
 * repeated here against this story alone.
 */

const S = HE_BURNED_THE_CAPITAL;

const start = (archetypeId = 'arch_steward') =>
  createInitialState({
    sessionId: 'sess_hbtc',
    story: S,
    identity: {
      displayName: 'Elise Marchand',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const character = (id: string) => S.characters.find((c) => c.id === id)!;
const ending = (id: string) => S.endings.find((e) => e.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ step: s.id, route: r })));
const route = (id: string) => routes.find((r) => r.route.routeId === id)!.route;
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. */
const AGES: Record<string, number> = { lucien: 29, remy: 26, mara: 24, agathe: 61, ottilie: 36, isaure: 48 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  lucien: 'twenty-nine',
  remy: 'twenty-six',
  mara: 'twenty-four',
  agathe: 'sixty-one',
  ottilie: 'thirty-six',
  isaure: 'forty-eight',
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

  it('keeps the premise in short paragraphs that say who, where, what and why now', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
  });

  it('borrows nothing from the title it answers, or from any famous franchise', () => {
    const text = JSON.stringify(S);
    expect(text).not.toMatch(/World I Burned|Make You Mine/i);
    expect(text).not.toMatch(/\b(quirk|chakra|hokage|nen user|hunter association|status window|system window)\b/i);
  });

  it('keeps the player’s gender out of the authored lines, so any pronouns work', () => {
    // The slate pitches a runaway noblewoman and the placeholder says she/her,
    // but the protagonist is BLANK and the player may type anything.
    const lines = [
      S.premise,
      S.opening,
      S.hook,
      ...S.rules.hardCanon,
      ...S.openingSuggestions,
      ...S.characters.flatMap((c) => [c.cardBlurb, ...c.voiceSamples]),
      ...S.abilities.map((a) => a.description),
    ].join(' ');
    expect(lines).not.toMatch(/\b(my lady|milady|his runaway bride|the runaway bride|daughter of a house)\b/i);
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
    expect(head).toContain('Sister Agathe');
    expect(head).toMatch(/"Stay behind me,"/);
  });

  it('ends on a demand the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"Come home\. Or tell me no\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the nun, introduced by what she is doing, may appear. The man in the
    // doorway is "the man you were promised to" until he says otherwise.
    const ALLOWED = new Set(['Agathe', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
  });

  it('shows the fire and the gloves before anybody names them', () => {
    expect(S.opening).toMatch(/candle .* leans toward the door/);
    expect(S.opening).toContain('Gloved.');
    expect(S.opening).not.toMatch(/Oathfire|Lucien|Ardent|Stillwater|Aubrais/);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    expect(done).toMatch(/take back my ring/);
    // Running again, at night, with twelve riders outside, onto a black lake.
    expect(risky).toMatch(/bolt .* boats on the lake/);
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

  it('puts the man, the nun and the maid in the chapel, and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['agathe', 'lucien', 'mara']);
  });
});

describe('he takes no for an answer', () => {
  it('says so in hard canon, in plain words', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Lucien will not take the player anywhere by force/);
    expect(canon).toMatch(/If the player tells him no and means it, he accepts it/);
  });

  it('makes a no always available, always work, and never inflame him', () => {
    const no = ability('say_no');
    expect(no.unlockedByDefault).toBe(true);
    expect(no.check).toBeNull();
    expect(no.requires.flagsSet).toEqual([]);
    expect(no.costs.map((c) => c.resourceId)).not.toContain('smoulder');
  });

  it('writes force into his limits, not just his manners', () => {
    expect(character('lucien').boundaries.join(' ')).toMatch(/Will not take you anywhere by force/);
  });

  it('lets the first answer close the other one', () => {
    expect(route('told_him_no').closesFlags).toContain('took_his_hand');
    expect(route('took_his_hand').closesFlags).toContain('told_him_no');
  });

  it('leads a no somewhere that is not a punishment', () => {
    const no = ending('end_tell_me_no');
    expect(no.requires.flagsSet).toEqual(['parted_from_him']);
    expect(no.rarity).toBe('COMMON');
    expect(no.condition).toMatch(/not a failure/);
    expect(no.condition).toMatch(/Do not punish the choice/);
  });

  it('only sends him to surrender if the player actually said no', () => {
    const walk = S.worldEvents.find((e) => e.id === 'we_he_walks_out')!;
    expect(walk.requiresFlags).toContain('told_him_no');
    expect(walk.cancelledByFlags).toContain('took_his_hand');
  });

  it('keeps the romance at a kiss and the fire off the wound', () => {
    // Hard canon, not the tone guide: the tone guide is also the cover's mood
    // text, and the image model reads "kiss" or "wound" as subject matter.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/up to a kiss, and no further/);
    expect(canon).toMatch(/No sexual content, no undressing, no lingering on bodies/);
    expect(canon).toMatch(/never the wound/);
    expect(S.rules.toneGuide).not.toMatch(/\b(kiss\w*|sexual|undress\w*|body|bodies|lingering|wound\w*|knife|knives|blood|dead|died|danger)\b/i);
    expect(S.intensity).not.toBe('INTENSE');
  });
});

describe('the rumour has a real answer under it', () => {
  it('puts the whole truth in hard canon, so the storyteller never contradicts it', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Lucien set fire to the Hall of Seals/);
    expect(canon).toMatch(/Nine people died/);
    expect(canon).toMatch(/The writ was never in the Hall of Seals\. Prince Remy took it out the day before the fire/);
  });

  it('leaves the writ where somebody can take it: in the prince’s saddlebag', () => {
    const inMossford = S.locations.find((l) => l.id === 'mossford')!.takeableItems.find((t) => t.itemId === 'treason_writ')!;
    expect(inMossford.ownerId).toBe('remy');
    expect(S.items.find((i) => i.id === 'treason_writ')!.questItem).toBe(true);
    const caseOnTheRoad = S.locations.flatMap((l) => l.takeableItems).find((t) => t.itemId === 'empty_writ_case')!;
    expect(caseOnTheRoad.ownerId).toBe('isaure');
  });

  it('keeps the cards from answering the mysteries before play', () => {
    // The story page shows every card blurb, and the storyteller reads each one
    // as the public line about that character.
    expect(character('mara').cardBlurb).not.toMatch(/how he (knew|found)|where to find you|sister/i);
    expect(character('agathe').cardBlurb).not.toMatch(/letter|order|hand you over/i);
    expect(character('lucien').cardBlurb).not.toMatch(/scaffold|writ|Hall of Seals/i);
  });

  it('tells the storyteller when the secrets come out, where it actually reads', () => {
    // runTurnPure sends secret facts and world-event notes but never a
    // revealHint or a step's directorNotes, so the pacing lives in hard canon.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/never on the first night/);
    expect(canon).toMatch(/A yes does not mean riding tonight/);
    expect(canon).toMatch(/does not defend himself/);
    expect(canon).toMatch(/central secret/);
    expect(canon).toMatch(/Mara confesses the letters when she is asked straight/);
    const hands = S.worldEvents.find((e) => e.id === 'we_his_hands')!;
    expect(hands.directorNotes).toMatch(/^Only after the player has sat at his fire/);
  });

  it('keeps the prince likeable on his card', () => {
    const remy = character('remy');
    expect(remy.cardBlurb).not.toMatch(/writ|match|lied|fire he/i);
    expect(remy.secrets.some((s) => /took the Writ of Forfeiture/.test(s.fact))).toBe(true);
  });

  it('only burns Mossford for a player who went to the prince, and stops once he is caught', () => {
    const fire = S.worldEvents.find((e) => e.id === 'we_fire_in_mossford')!;
    // Any conversation with him counts, not only the one at the lantern: the
    // first night's routes exclude each other, so a route flag would leave most
    // players without the fire or the boat.
    expect(fire.requiresFlags).toEqual(['spoke:remy']);
    expect(route('sailed_with_remy').predicate.flagsSet).toEqual(['spoke:remy']);
    expect(fire.cancelledByFlags).toEqual(expect.arrayContaining(['remy_exposed', 'sailed_with_remy']));
  });

  it('never lets the truth clear him of the nine', () => {
    const ashes = ending('end_what_the_ashes_said');
    expect(ashes.condition).toMatch(/he is still tried, because nine people died/);
  });
});

describe('the banked word is locked, granted and honest', () => {
  it('keeps the word locked behind knowing it, in the world’s own words', () => {
    const word = ability('bank_the_fire');
    expect(word.unlockedByDefault).toBe(false);
    expect(word.requires.flagsSet).toEqual(['knows:the_banked_word']);
    expect(word.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(word.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('grants it where the player learns it', () => {
    const lead = S.quests.find((q) => q.id === 'q_the_banked_word')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:his_hands']);
    expect(lead.steps[0]!.rewards.abilities).toContain('bank_the_fire');
  });

  it('only opens the lead for a player who went looking at him', () => {
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:his_hands'));
    for (const event of sources) expect(event.requiresFlags.length, event.id).toBeGreaterThan(0);
    expect(routes.some(({ route: r }) => r.setsFlags.includes('knows:his_hands'))).toBe(true);
  });

  it('makes the word the difference between losing him and keeping him at the gate', () => {
    const gate = S.worldEvents.find((e) => e.id === 'we_the_gate_forced')!;
    expect(gate.setsFlags).toContain('he_called_the_fire');
    expect(ending('end_burned_out').requires.flagsUnset).toContain('used:bank_the_fire');
    expect(route('banked_his_fire').predicate.flagsSet).toEqual(['he_called_the_fire', 'used:bank_the_fire']);
  });

  it('leaves nearly every ending reachable without it', () => {
    const without = S.endings.filter((e) => !e.requires.flagsSet.includes('knows:the_banked_word'));
    expect(without.length).toBeGreaterThanOrEqual(10);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\. The player is twenty-two\./);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(calledName(c));
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
  });

  it('never puts a minor anywhere the storyteller reads', () => {
    // The first hard-canon line says, in so many words, that no children
    // appear. Everything else must not contradict it.
    const { rules, ...rest } = S;
    const text = JSON.stringify([rest, rules.hardCanon.slice(1), rules.toneGuide, rules.styleExamples]);
    expect(text).not.toMatch(/\b(boys?|girls?|child|children|kids?|teen\w*)\b/i);
    expect(rules.hardCanon[0]).toMatch(/No children appear in this story\./);
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|minor|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
    expect(S.openingPanel!.alt).not.toMatch(AGE_WORDS);
  });
});

describe('nobody is only there to react', () => {
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

  it('gives him limits, wants and secrets of his own, like a person rather than a prize', () => {
    const lucien = character('lucien');
    expect(lucien.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(lucien.fears.length).toBeGreaterThanOrEqual(3);
    expect(lucien.secrets.length).toBeGreaterThanOrEqual(3);
    expect(lucien.hiddenDrives.length).toBeGreaterThanOrEqual(2);
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
      ['for the record', /\bfor the record\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('draws only faces the portrait generator knows', () => {
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('casts him first, so the cover and the card lead with the man in the doorway', () => {
    expect(S.characters[0]!.id).toBe('lucien');
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

describe('the wiring holds', () => {
  const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
  const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));
  const settable = new Set<string>([
    ...steps.flatMap((s) => [...s.rewards.flags, ...s.succeedWhenAny.flatMap((r) => r.setsFlags)]),
    ...S.worldEvents.flatMap((e) => e.setsFlags),
  ]);

  it('has more than one way through, and choices that close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.filter(({ route: r }) => r.closesFlags.length > 0).length).toBeGreaterThanOrEqual(3);
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
    for (const { step, route: r } of routes) {
      for (const flag of r.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${step}/${r.routeId} needs ${flag}`).toBe(true);
      }
      for (const itemId of r.predicate.hasItems) {
        expect(obtainable.has(itemId), `${step}/${r.routeId} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('points only at things that exist', () => {
    const locIds = new Set(S.locations.map((l) => l.id));
    const itemIds = new Set(S.items.map((i) => i.id));
    const charIds = new Set(S.characters.map((c) => c.id));
    const abIds = new Set(S.abilities.map((a) => a.id));
    const facIds = new Set(S.factions.map((f) => f.id));
    const resIds = new Set(S.resources.map((r) => r.id));
    const skillIds = new Set(S.skills.map((s) => s.id));
    const broken: string[] = [];

    if (!locIds.has(S.rules.startingLocationId)) broken.push(`start ${S.rules.startingLocationId}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`start item ${i.itemId}`);
    for (const l of S.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const i of S.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
      for (const s of Object.keys(i.skillModifiers)) if (!skillIds.has(s)) broken.push(`${i.id} boosts ${s}`);
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check && !skillIds.has(a.check.skillId ?? '')) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of S.factions) {
      for (const other of [...f.allies, ...f.enemies]) if (!facIds.has(other)) broken.push(`${f.id} knows ${other}`);
    }
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} wants ${i}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} teaches ${ab}`);
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
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!settable.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
    };
    for (const e of S.endings) check(`ending ${e.id}`, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const a of S.abilities) check(`ability ${a.id}`, a.requires.flagsSet);
    for (const c of S.characters) for (const g of c.gates) check(`gate ${g.id}`, g.requires.flagsSet);
    for (const e of S.worldEvents) check(`event ${e.id}`, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const q of S.quests) {
      if (q.discoverWhen) check(`quest ${q.id}`, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(`step ${st.id}`, [...p.flagsSet, ...p.flagsUnset]);
        for (const r of st.succeedWhenAny) check(`route ${st.id}/${r.routeId}`, [...r.predicate.flagsSet, ...r.predicate.flagsUnset]);
      }
    }
    for (const l of S.locations) {
      for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    }
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never uses a relationship gate id as if it were a flag', () => {
    const gateIds = new Set(S.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const read = [
      ...S.endings.flatMap((e) => [...e.requires.flagsSet, ...e.requires.flagsUnset]),
      ...S.worldEvents.flatMap((e) => [...e.requiresFlags, ...e.cancelledByFlags]),
      ...routes.flatMap(({ route: r }) => [...r.predicate.flagsSet, ...r.predicate.flagsUnset]),
    ];
    expect(read.filter((f) => gateIds.has(f))).toEqual([]);
  });

  it('never demands the thing a step is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      for (const r of st.succeedWhenAny) for (const i of r.predicate.hasItems) expect(granted.has(i), st.id).toBe(false);
    }
  });

  it('leaves something worth taking, and keeps every alias unique', () => {
    const takeable = S.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    const aliases = takeable.flatMap((t) => t.aka.map((a) => a.toLowerCase()));
    expect(new Set(aliases).size).toBe(aliases.length);
  });

  it('puts the ring in his hand in the opening scene, so taking it back is possible', () => {
    const ring = S.locations
      .find((l) => l.id === S.rules.startingLocationId)!
      .takeableItems.find((t) => t.itemId === 'betrothal_ring')!;
    expect(ring.ownerId).toBe('lucien');
  });

  it('passes the clarity checks the director runs', async () => {
    const { checkStoryClarity, checkNarrativeClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = (issues: ReadonlyArray<{ severity: string; code: string; message: string }>) =>
      issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`);
    expect(errors(checkStoryClarity(S).issues)).toEqual([]);
    const premise = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(premise.passed).toBe(true);
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(errors(checkStoryChoiceClarity(S).issues)).toEqual([]);
  });

  it('says what every ability does in one short line', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect.length, a.id).toBeLessThan(120);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
    }
  });

  it('tells the player the upbringing is for the whole story', () => {
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed for the whole story/);
  });

  it('keeps every archetype distinct, and out of the fields that would make them coexist', () => {
    const tagSets = S.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
    const shared = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) {
      expect(a.playstyle.length).toBeGreaterThanOrEqual(2);
      expect(shared, a.name).not.toContain(a.name);
    }
  });

  it('keeps a blank protagonist and asks for a name', () => {
    expect(S.protagonist.kind).toBe('BLANK');
    expect(S.setupFields.find((f) => f.id === 'displayName')?.required).toBe(true);
    expect(S.setupFields.find((f) => f.id === 'pronouns')?.placeholder).toBe('e.g. she/her');
  });

  it('seeds the five promises the bible makes', () => {
    expect(S.promises.map((p) => p.kind).sort()).toEqual(['FINALE', 'MYSTERY', 'RELATIONSHIP', 'RIVAL', 'THEME']);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('keeps to twelve endings, because the storyteller reads twelve', () => {
    expect(S.endings.length).toBeLessThanOrEqual(12);
    expect(S.endings.length).toBeGreaterThanOrEqual(10);
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('never asks for more standing than the story can hand out', () => {
    // Outside quest rewards the engine only ever lowers faction standing, so
    // the ceiling is the start, the best archetype and every positive reward.
    for (const e of S.endings) {
      for (const need of e.requires.minFactionReputation) {
        const faction = S.factions.find((f) => f.id === need.factionId)!;
        const archetype = Math.max(
          0,
          ...S.archetypes.flatMap((a) => a.startingReputation.filter((r) => r.factionId === need.factionId).map((r) => r.amount)),
        );
        const rewards = steps
          .flatMap((s) => s.rewards.reputation)
          .filter((r) => r.factionId === need.factionId && r.amount > 0)
          .reduce((sum, r) => sum + r.amount, 0);
        expect(faction.startingReputation + archetype + rewards, `${e.id} on ${need.factionId}`).toBeGreaterThanOrEqual(need.value);
      }
    }
  });

  it('has real losses, not just flavours of romance', () => {
    for (const id of ['end_the_traitors_runaway', 'end_burned_out', 'end_the_princes_ship']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('can end without him in at least four ways', () => {
    const withoutHim = S.endings.filter((e) =>
      e.requires.flagsSet.some((f) =>
        ['parted_from_him', 'took_the_veil', 'left_the_map', 'sailed_with_remy', 'in_crown_custody'].includes(f),
      ),
    );
    expect(withoutHim.length).toBeGreaterThanOrEqual(4);
  });

  it('tells the writer what each ending means and never ends on turn zero', () => {
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

  it('lets rest restore the player’s composure and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource. Neither the crown nor his
    // fire should be repaired by a nap.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('spends composure when a cost has no price on it', () => {
    const cheapest = [...S.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('composure');
  });

  it('makes violence in the convent bring the crown and cost the sisters', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW and docks the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('pursuit');
    expect(S.factions[0]?.id).toBe('faction_stillwater');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('has quest items for the storyteller to turn on, and one thing to drink', () => {
    expect(S.items.filter((i) => i.questItem).length).toBeGreaterThanOrEqual(4);
    expect(S.items.some((i) => i.consumable?.resourceId === 'composure')).toBe(true);
  });
});

describe('the art it will ask for', () => {
  it('derives every asset key from the story id', () => {
    const derived = withDerivedAssetKeys(S);
    expect(derived.coverImage).toMatch(/^story_he_burned_the_capital/);
    expect(derived.keyArt).toMatch(/^story_he_burned_the_capital/);
    for (const c of derived.characters) expect(c.portrait, c.id).toMatch(/^story_he_burned_the_capital/);
    for (const l of derived.locations) expect(l.stageImage, l.id).toMatch(/^story_he_burned_the_capital/);
    expect(S.openingPanel?.assetKey).toBe('story_he_burned_the_capital/opening');
  });

  it('ships raw, with no keys until somebody generates the art', () => {
    expect(S.coverImage).toBeNull();
    expect(S.keyArt).toBeNull();
    for (const c of S.characters) expect(c.portrait, c.id).toBeNull();
  });

  it('puts the title in the art and keeps his face clean', () => {
    expect(S.coverDirection).toContain('HE BURNED THE CAPITAL');
    expect(S.coverDirection).toMatch(/HIS FACE STAYS CLEAN/);
    expect(S.coverDirection).toMatch(/No other text anywhere/);
  });

  it('paints the title on its own TITLE line, with its style, its place and its exact spelling', () => {
    const cover = S.coverDirection!;
    expect(cover.match(/TITLE:/g)).toHaveLength(1);
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(title).toContain('He Burned the Capital');
    expect(title).toContain('spelled exactly HE BURNED THE CAPITAL');
    expect(title).toMatch(/upper third/);
    expect(title).toMatch(/serif logo/);
    expect(cover.startsWith('SUBJECT: Grand Duke Lucien Ardent')).toBe(true);
  });

  it('keeps every effect on the candles, the smoke and the title, never on his face', () => {
    const cover = S.coverDirection!;
    expect(cover).toMatch(/never on his face/);
    expect(cover).not.toMatch(/\b(sexy|alluring|shirtless|bare-chested|muscular|blood\w*|wound\w*|corpse\w*)\b/i);
  });

  it('draws the opening panel from the portrait of the man who asks the question', () => {
    const panel = S.openingPanel!;
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    expect(panel.alt.startsWith(`${calledName(character('lucien'))}, `)).toBe(true);
    // He speaks the line the opener ends on.
    expect(S.opening.trim().endsWith('"Come home. Or tell me no."')).toBe(true);
    // infra/scripts/opening-panel-art.ts picks the reference portrait like this.
    // His name starts with a title, so it is the second pass that finds him:
    // he is cast first and the alt names him "the Grand Duke".
    const first = (name: string) => name.split(' ')[0]!;
    const reference =
      S.characters.find((c) => panel.alt.toLowerCase().startsWith(first(c.name).toLowerCase())) ??
      S.characters.find((c) => panel.alt.includes(first(c.name))) ??
      S.characters.find((c) => c.cardBlurb.trim().length > 0);
    expect(reference?.id).toBe('lucien');
  });

  it('gives every carded character a concrete appearance to draw from', () => {
    for (const c of S.characters) {
      if (c.cardBlurb.trim()) expect(c.appearance.length, c.id).toBeGreaterThan(120);
    }
  });

  it('opens straight on the scene and ships unpublished', () => {
    expect(S.prologue).toEqual([]);
    expect(S.publishedAt).toBeNull();
  });
});

describe('the system lives where the storyteller can read it', () => {
  // Production's storyteller reads hard canon, quest items and the chosen
  // archetype's starting abilities. It never reads resources, revealHints,
  // step notes or the rest of the ability list.

  it('starts the player wearing the guest’s cord, a quest item that carries the house rule', () => {
    expect(S.rules.startingItems.map((i) => i.itemId)).toEqual(['mothers_knife', 'travel_purse', 'guests_cord']);
    const cord = S.items.find((i) => i.id === 'guests_cord')!;
    expect(cord.questItem).toBe(true);
    expect(cord.loreText).toMatch(/nobody takes you out through it by force/);
    expect(cord.loreText).toMatch(/Only the prioress can cut it/);
    expect(cord.loreText).toMatch(/grey veil/);
    expect(S.rules.hardCanon.join(' ')).toMatch(/the white guest’s cord Sister Agathe tied/);
    expect(start().player.inventory.find((i) => i.itemId === 'guests_cord')?.quantity).toBe(1);
  });

  it('gives every background both answers to his question plus one move of its own, all usable from turn one', () => {
    const own = new Set<string>();
    for (const a of S.archetypes) {
      expect(a.startingAbilities.slice(0, 2), a.id).toEqual(['say_no', 'take_his_hand']);
      expect(a.startingAbilities.length, a.id).toBe(3);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id} ${id}`).toBe(true);
      own.add(a.startingAbilities[2]!);
    }
    expect(own.size).toBe(S.archetypes.length);
  });

  it('spells out in hard canon how each of the three pressures moves', () => {
    const canon = S.rules.hardCanon.join(' ');
    // Composure.
    expect(canon).toMatch(/a night’s sleep, a meal or a bowl of Agathe’s willow-bark tea puts it back/);
    // Pursuit.
    expect(canon).toMatch(/The crown closes in whatever anybody does/);
    expect(canon).toMatch(/Anything loud brings it faster/);
    // Smoulder, and the promise that a no never feeds it.
    expect(canon).toMatch(/Lucien’s fire answers to provocation, never to refusal/);
    expect(canon).toMatch(/A plain no never does/);
  });

  it('never names a background in hard canon, so the other three stay unreal', () => {
    const canon = S.rules.hardCanon.join('\n');
    for (const a of S.archetypes) expect(canon, a.id).not.toContain(a.name);
  });
});

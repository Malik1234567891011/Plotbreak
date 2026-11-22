import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THREE_FEET_APART } from './three-feet-apart.js';
import { withDerivedAssetKeys } from './derive-assets.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Three Feet Apart, held to the promise on its own card: a rule you can
 * measure, a rival who is a person rather than a prize, and a week in which
 * every door is a negotiation.
 *
 * The failure this world is most exposed to is the rule going soft. If the
 * knot stops mattering, the story is two people sharing a room for no reason;
 * if it becomes a joke, the forfeit stops being a choice. So the rule lives
 * where production's storyteller reads it (hard canon and a quest item the
 * player starts holding), and the walk-away is a real, early, costly ending.
 *
 * This world is not in LAUNCH_CATALOG yet, so the checks the catalog-wide
 * specs would run on it are repeated here, against this story alone.
 */

const S = THREE_FEET_APART;

const start = (archetypeId = 'arch_wards') =>
  createInitialState({
    sessionId: 'sess_three_feet_apart',
    story: S,
    identity: {
      displayName: 'Ilse Marrant',
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
const routes = S.quests.flatMap((q) =>
  q.steps.flatMap((st) => st.succeedWhenAny.map((route) => ({ quest: q.id, step: st.id, route }))),
);
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-seven. */
const AGES: Record<string, number> = { caius: 28, thessaly: 61, prin: 20, corvina: 34, hollis: 31 };

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
    expect(head).toContain('Caius');
    expect(head).toMatch(/"Stop\. Don’t take another one\."/);
  });

  it('ends on a question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/Where were you going\?"$/);
  });

  it('shows the rule working before anybody explains it', () => {
    const grey = S.opening.indexOf('gone grey');
    const rule = S.opening.indexOf('Past three feet');
    const clears = S.opening.indexOf('drains out');
    expect(grey).toBeGreaterThan(-1);
    expect(rule).toBeGreaterThan(grey);
    expect(clears).toBeGreaterThan(rule);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the rival, introduced in the same sentence, may appear.
    const ALLOWED = new Set(['Caius', 'Wren', 'I']);
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
    // The risky one tests the rule itself, in front of the whole court.
    expect(risky).toMatch(/step back/);
  });
});

describe('ids and art follow the house convention', () => {
  it('uses the story prefix for its ids and its opening panel', () => {
    expect(S.id).toBe('sv_three_feet_apart_1');
    expect(S.storyId).toBe('story_three_feet_apart');
    expect(S.openingPanel?.assetKey).toBe('story_three_feet_apart/opening');
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('derives every asset key under the same prefix', () => {
    const derived = withDerivedAssetKeys(S);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(String(key)).toMatch(/^story_three_feet_apart\//);
  });
});

describe('the rule lives where the storyteller can read it', () => {
  it('starts the player holding the knot, as a quest item', () => {
    // Production's storyteller reads quest items, never resources or steps.
    const knot = S.items.find((i) => i.id === 'hostage_knot')!;
    expect(knot.questItem).toBe(true);
    expect(knot.droppable).toBe(false);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('hostage_knot');
    expect(knot.description).toMatch(/three feet/);
    expect(knot.loreText).toMatch(/stone/);
  });

  it('spells out the forfeit, the lie rule and the culprit in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/whoever is left behind/);
    expect(canon).toMatch(/within about a minute/);
    expect(canon).toMatch(/lie told aloud/);
    expect(canon).toMatch(/Corvina Ashdown wrote it/);
    expect(canon).toMatch(/Nobody bleeds/);
  });

  it('keeps all three ways off, and the word that matters, in canon and on the treaty copy', () => {
    const canon = S.rules.hardCanon.join(' ');
    const roll = S.items.find((i) => i.id === 'treaty_roll')!;
    expect(roll.questItem).toBe(true);
    for (const text of [canon, roll.loreText]) {
      expect(text).toMatch(/writes (?:the names|them) again/);
      expect(text).toMatch(/unpick it together/);
      expect(text).toMatch(/forfeit/);
      expect(text).toMatch(/alone/);
    }
  });

  it('closes the shortcuts: only the terms undo it, and the Queen is no referee', () => {
    // The pure storyteller is told the player can change any canon afterwards,
    // so a fire mage burning the cord or a half-true answer would end the week
    // on turn two unless canon says, in as many words, that neither works.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Nothing but its three terms undoes the knot/);
    expect(canon).toMatch(/convenient truth as a lie/);
    expect(canon).toMatch(/grants neither candidate a private audience/);
    expect(canon).toMatch(/only in open court/);
  });

  it('keeps the exam a secret the setup screen does not give away', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/never known who found the flaw/);
    const grudge = S.setupFields.find((f) => f.id === 'the_grudge')!;
    for (const o of grudge.options) expect(o.label, o.id).not.toMatch(/flaw|reported/i);
    const why = steps.find((st) => st.id === 'why_it_was_split')!;
    expect(why.directorNotes).toMatch(/never known who found the flaw/);
    expect(why.directorNotes).not.toMatch(/\b(her|his) share\b/);
  });

  it('puts every reveal trigger where production reads it', () => {
    // runTurnPure reads boundaries and secret facts, never revealHint.
    const willNot = (id: string) => S.characters.find((c) => c.id === id)!.boundaries.join(' ');
    expect(willNot('caius')).toMatch(/night before the exam/);
    expect(willNot('caius')).toMatch(/why he suspects the Chancellor/);
    expect(willNot('prin')).toMatch(/three late slips/);
    expect(willNot('corvina')).toMatch(/once you have proof/);
    expect(willNot('hollis')).toMatch(/where everybody was standing/);
    expect(willNot('thessaly')).toMatch(/what the knot costs/);
  });

  it('gives every school its own spell, reachable only by choosing it', () => {
    // The storyteller sees the chosen archetype's starting abilities and no others.
    const schools = new Set(S.archetypes.flatMap((a) => a.startingAbilities));
    expect(schools.size).toBe(S.archetypes.length);
    for (const id of schools) expect(ability(id).unlockedByDefault, id).toBe(false);
  });

  it('makes walking away possible, unchecked and expensive', () => {
    const walk = ability('walk_away');
    expect(walk.unlockedByDefault).toBe(true);
    expect(walk.check).toBeNull();
    expect(walk.costs).toEqual([{ resourceId: 'strain', amount: 40 }]);
  });
});

describe('the gated moves open only once you know enough', () => {
  const GATES: Array<[abilityId: string, flag: string]> = [
    ['name_the_writer', 'knows:who_wrote_it'],
    ['unpick_the_knot', 'knows:the_terms'],
    ['swear_together', 'knows:the_loophole'],
  ];

  for (const [abilityId, flag] of GATES) {
    it(`locks ${abilityId} behind ${flag}, in the world's own words`, () => {
      const a = ability(abilityId);
      expect(a.unlockedByDefault).toBe(false);
      expect(a.requires.flagsSet).toEqual([flag]);
      expect(a.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
      const granting = steps.filter((st) => st.rewards.abilities.includes(abilityId));
      expect(granting, `${abilityId} is granted by ${granting.length} steps`).toHaveLength(1);
    });
  }

  it('makes the loophole a thing you find in the vault, not a thing you are told', () => {
    const sources = routes.filter(({ route }) => route.setsFlags.includes('knows:the_loophole'));
    expect(sources.map(({ route }) => route.routeId)).toEqual(['read_the_vault_copy']);
    expect(sources[0]!.route.predicate.atLocation).toBe('treaty_vault');
  });

  it('opens the vault door only once you know the knot was written', () => {
    const door = S.locations
      .find((l) => l.id === 'royal_library')!
      .connections.find((c) => c.to === 'treaty_vault')!;
    expect(door.lockedByFlag).toBe('knows:it_was_written');
  });

  it('gives the culprit more than one thread, so no single clue is a lock', () => {
    const whose = steps.find((st) => st.id === 'whose_hand')!;
    expect(whose.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is a court mage of twenty-seven');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
    expect(canon).toMatch(/takes students from nineteen/);
    // The Queen speaks and acts on the page, so she has an age too.
    expect(canon).toContain('The Queen of Hesper is fifty-four');
  });

  it('caps romance at a kiss, off the page as well as on it', () => {
    // The shared narrator lets intimacy happen off the page; a forced-proximity
    // story in a 13+ app has to close that door itself.
    expect(S.rules.toneGuide).toMatch(/Nothing goes further than a kiss, on the page or off it/);
    expect(S.rules.toneGuide).toMatch(/no fade-to-black/);
    expect(S.rules.toneGuide).toMatch(/cuts away before anyone undresses/);
    for (const st of steps) expect(st.directorNotes, st.id).not.toMatch(/\bwash/i);
    for (const e of S.worldEvents) expect(e.directorNotes, e.id).not.toMatch(/\bwash/i);
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });
});

describe('the cover', () => {
  it('puts the title in the art and the green glow nowhere near his face', () => {
    const cover = S.coverDirection!;
    // Its own TITLE: line, with style, placement and the exact spelling.
    expect(cover).toMatch(/TITLE: the words Three Feet Apart painted into the art in the upper third/);
    expect(cover).toContain('spelled exactly Three Feet Apart');
    expect(cover).toContain('Caius');
    expect(cover).toMatch(/never on his face/i);
    expect(cover).toMatch(/HIS FACE STAYS CLEAN/);
    expect(cover).toMatch(/no letters or numbers/i);
  });

  it('draws the opening panel from the man who speaks first', () => {
    const alt = S.openingPanel!.alt;
    expect(alt.startsWith('Caius ')).toBe(true);
    expect(alt.length).toBeLessThanOrEqual(200);
    // opening-panel-art.ts matches the alt against the first word of `name`,
    // which is "Lord" here, then falls back to the first character with a
    // card blurb. Keeping him first keeps his portrait as the reference.
    expect(S.characters.find((c) => c.cardBlurb.trim())!.id).toBe('caius');
    expect(S.prologue ?? []).toHaveLength(0);
  });

  it('gives every titled character the name the court calls them', () => {
    for (const c of S.characters) {
      if (/^(Lord|Lady|Archmage)\b/.test(c.name)) expect(c.calledName, c.id).toBe(c.name.split(' ')[1]);
    }
  });
});

describe('nobody is only there to react', () => {
  it('starts the whole cast in the hall, by schedule', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['caius', 'thessaly', 'prin', 'corvina', 'hollis']));
  });

  it('starts him as a rival, not a love interest', () => {
    const caius = S.characters.find((c) => c.id === 'caius')!;
    expect(caius.startingRelationship.rivalry).toBeGreaterThanOrEqual(70);
    expect(caius.startingRelationship.trust).toBeLessThanOrEqual(20);
    expect(caius.startingRelationship.respect).toBeGreaterThanOrEqual(50);
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

  it('gives no two characters the same short name', async () => {
    const { calledName } = await import('@plotbreak/contracts');
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size, names.join(', ')).toBe(names.length);
  });

  it('uses expressions the generator draws', async () => {
    const { knownExpression } = await import('@plotbreak/contracts');
    const unknown = S.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
    );
    expect(unknown).toEqual([]);
  });

  it('writes card blurbs that are more than the role and talk to the player', () => {
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase(), c.id).not.toBe(c.role.toLowerCase());
    }
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...steps.flatMap((st) => st.rewards.abilities),
      ...S.archetypes.flatMap((a) => a.startingAbilities),
    ]);
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('what the catalog checks would say', () => {
  it('has more than one way through, and choices that close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...S.archetypes.flatMap((a) => a.startingAbilities),
      ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap((st) => st.rewards.abilities),
    ]);
    const obtainable = new Set([
      ...S.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...S.rules.startingItems.map((i) => i.itemId),
      ...steps.flatMap((st) => st.rewards.items.map((i) => i.itemId)),
      ...S.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (!flag.startsWith('used:')) continue;
        expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) {
        expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const st of steps) {
      const granted = new Set(st.rewards.items.map((i) => i.itemId));
      const demanded = [...(st.succeedWhen?.hasItems ?? []), ...st.succeedWhenAny.flatMap((r) => r.predicate.hasItems)];
      for (const itemId of demanded) expect(granted.has(itemId), `${st.id}/${itemId}`).toBe(false);
    }
  });

  it('gives every archetype something the rules can see, under a unique id', () => {
    for (const a of S.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
    }
    expect(new Set(S.archetypes.map((a) => a.id)).size).toBe(S.archetypes.length);
  });

  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, ids]) => ids.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
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
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
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
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates something behind a flag nothing can set', () => {
    // Stricter than the catalog: a flag only counts if something actually sets
    // it, not merely because a predicate somewhere reads it.
    const settable = new Set<string>(['left_the_map']);
    for (const st of steps) {
      for (const f of st.rewards.flags) settable.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) settable.add(f);
    const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const ok = (f: string) => settable.has(f) || ENGINE_PREFIXES.some((p) => f.startsWith(p));

    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!ok(f)) dead.push(`${where} needs ${f}`);
    };
    for (const e of S.endings) check(`ending ${e.id}`, e.requires.flagsSet);
    for (const a of S.abilities) if (a.requires) check(`ability ${a.id}`, a.requires.flagsSet);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    for (const q of S.quests) {
      if (q.discoverWhen) check(`quest ${q.id}`, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        if (st.enterWhen) check(`step ${st.id}`, st.enterWhen.flagsSet);
        for (const r of st.succeedWhenAny) check(`route ${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const c of S.characters) for (const g of c.gates) check(`gate ${g.id}`, g.requires.flagsSet);
    for (const e of S.worldEvents) check(`event ${e.id}`, e.requiresFlags);
    expect(dead, dead.join('; ')).toEqual([]);
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

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((S.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = S.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('starts with hard canon and states each ability’s shape plainly', async () => {
    const { abilityEffect } = await import('@plotbreak/contracts');
    expect(S.rules.hardCanon.length).toBeGreaterThan(0);
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });
});

describe('it can end badly, early and in many ways', () => {
  it('names only flags this world can set, and explains every ending', () => {
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });

  it('lets the player walk away early, out of court or out of reach', () => {
    const bridge = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(bridge.minTurn).toBeLessThanOrEqual(22);
    const forfeit = S.endings.find((e) => e.requires.flagsSet.includes('forfeit_paid'))!;
    expect(forfeit.minTurn).toBeLessThanOrEqual(22);
    // And the forfeit is reachable from the very first step.
    const first = steps.find((st) => st.id === 'the_hall')!;
    expect(first.succeedWhenAny.some((r) => r.setsFlags.includes('forfeit_paid'))).toBe(true);
  });

  it('lets the chair lapse because nobody decided anything', () => {
    // The honest failure: seven days of doing nothing in particular. It must
    // not require a relationship, an item, or a mistake.
    const lapse = routes.find(({ route }) => route.routeId === 'nobody_stands')!.route;
    expect(lapse.predicate.minRelationship).toEqual([]);
    expect(lapse.predicate.hasItems).toEqual([]);
    expect(lapse.predicate.flagsSet).toEqual(['conclave_day']);
    const conclave = S.worldEvents.find((e) => e.setsFlags.includes('conclave_day'))!;
    expect(conclave.requiresFlags).toEqual([]);
    expect(conclave.atWorldMinute).toBeGreaterThanOrEqual(7 * 1440);
  });

  it('gets a freed player through the Conclave without the court behind them', () => {
    // Wards and mending start the court at 30, under the 35 that standing for
    // the chair needs; without this, Still Rivals had no way in for them.
    const free = routes.find(({ route }) => route.routeId === 'came_free')!.route;
    expect(free.predicate.flagsSet).toEqual(['knot_untied', 'conclave_day']);
    expect(free.predicate.minRelationship).toEqual([]);
    expect(free.predicate.minFactionReputation).toEqual([]);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_the_chair_lapses', 'end_grey_to_the_shoulder', 'end_over_the_bridge']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('keeps most endings reachable without ever being kind to him', () => {
    const romance = S.endings.filter((e) => e.requires.minRelationship.some((r) => r.dimension === 'affection'));
    expect(S.endings.length - romance.length).toBeGreaterThanOrEqual(7);
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

  it('lets rest restore patience and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('makes violence pull the cord before it starts a rumour', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('strain');
    expect(S.factions[0]?.id).toBe('faction_court');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

describe('a new reader understands it', () => {
  it('passes the clarity standard with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('answers every question a premise has to answer', async () => {
    const { checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(report.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
  });

  it('offers a setup screen whose choices are clear', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.optionId ?? '-'}: ${e.message}`)).toEqual([]);
  });
});

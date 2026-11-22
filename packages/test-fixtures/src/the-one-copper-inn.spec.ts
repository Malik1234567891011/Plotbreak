import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THE_ONE_COPPER_INN } from './the-one-copper-inn.js';
import { withDerivedAssetKeys } from './derive-assets.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The One-Copper Inn, held to the promise on its own card: that patching a
 * roof and serving a supper are moves in the hunt, not breaks from it.
 *
 * The failure this world is most exposed to is a split down the middle: a cosy
 * inn game in one half, a dragon chase in the other, and nothing joining them.
 * So the joints are pinned here. The charter only protects a working inn, the
 * inspection only passes on real work and the real paper, and the paper is in
 * the neighbour's biscuit tin until the player has done a day's graft.
 *
 * It is also one of fifty stories written to one standard, so the opener,
 * the ages and the three checks every new story runs are pinned too.
 */

const S = THE_ONE_COPPER_INN;

const start = (archetypeId = 'arch_cook') =>
  createInitialState({
    sessionId: 'sess_one_copper_inn',
    story: S,
    identity: {
      displayName: 'Sam Okoro',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const item = (id: string) => S.items.find((i) => i.id === id)!;
const step = (id: string) => S.quests.flatMap((q) => q.steps).find((s) => s.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them, in numbers and in the words hard canon uses. The player is twenty-nine. */
const AGES: Record<string, [number, string]> = {
  ember: [212, 'two hundred and twelve'],
  wren: [34, 'thirty-four'],
  tobin: [22, 'twenty-two'],
  marla: [71, 'seventy-one'],
  thatch: [49, 'forty-nine'],
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
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('"Ember," she says. "Call me that. One room, seven nights."');
  });

  it('ends on a question the player has to answer now', () => {
    // No contraction: she is frightened, and her voice drops them when she is.
    expect(S.opening.trim()).toMatch(/"And you did not see me\. Yes or no\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the guest who names herself and the stablehand introduced as yours may
    // appear, plus what he calls the player.
    const ALLOWED = new Set(['Ember', 'Tobin', 'Boss', 'I']);
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
    expect(said).toMatch(/^"Yes\./);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one walks out to the people with crossbows.
    expect(risky).toMatch(/torches/);
  });
});

describe('the system lives where the storyteller can read it', () => {
  it('makes the scale, the deed and the charter quest items, and starts the player holding the deed', () => {
    // Production's storyteller reads quest items, never resources or step notes.
    for (const id of ['dragon_scale', 'inn_deed', 'lantern_charter']) expect(item(id).questItem, id).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('inn_deed');
    expect(item('inn_deed').description).toMatch(/with its charter, where found/);
  });

  it('spells out the charter, the compass scale and the seven nights in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/between lamp-lighting and dawn/);
    expect(canon).toMatch(/working inn/);
    expect(canon).toMatch(/may not refuse a paying traveller/);
    expect(canon).toMatch(/turns in the hand toward the dragon it came from/);
    expect(canon).toMatch(/seven nights/);
    expect(canon).toMatch(/biscuit tin/);
  });

  it('gives every archetype a starting ability, so the storyteller sees one', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThan(0);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id}/${id}`).toBe(true);
    }
  });

  it('keeps bracketed text out of the tone guide, which also feeds the cover', () => {
    expect(S.rules.toneGuide).not.toMatch(/[[\]]/);
  });
});

describe('the cosy work is the hunt', () => {
  it('makes a working inn out of the slow-life verbs', () => {
    const routes = step('make_it_an_inn').succeedWhenAny;
    const used = routes.flatMap((r) => r.predicate.flagsSet);
    expect(used).toEqual(expect.arrayContaining(['used:keep_house', 'used:cook_supper']));
    expect(step('make_it_an_inn').rewards.flags).toContain('inn_is_working');
  });

  it('keeps the charter in the neighbour’s tin until the player has done a day’s work', () => {
    const cottage = S.locations.find((l) => l.id === 'marlas_cottage')!;
    const charter = cottage.takeableItems.find((t) => t.itemId === 'lantern_charter')!;
    expect(charter.ownerId).toBe('marla');
    const gate = S.characters.find((c) => c.id === 'marla')!.gates.find((g) => g.id === 'marla_gives_the_charter')!;
    expect(gate.requires.flagsSet).toContain('roof_patched');
    const patched = step('make_it_an_inn').succeedWhenAny.find((r) => r.setsFlags.includes('roof_patched'))!;
    expect(patched.predicate.flagsSet).toEqual(['used:keep_house']);
  });

  it('holds the inspection at noon on the third day, after the captain petitions for it', () => {
    const petition = S.worldEvents.find((e) => e.id === 'we_the_petition')!;
    const inspection = S.worldEvents.find((e) => e.id === 'we_the_inspection')!;
    expect(petition.setsFlags).toContain('inspection_called');
    expect(inspection.atWorldMinute).toBe(2 * 1440 + 12 * 60);
    expect(inspection.requiresFlags).toEqual(['inspection_called']);
    expect(step('the_inspection').enterWhen?.flagsSet).toEqual(['inspection_called']);
  });

  it('passes the inspection fairly only on a working inn and the real paper', () => {
    const fair = step('the_inspection').succeedWhenAny.find((r) => r.routeId === 'passed_fairly')!;
    expect(fair.predicate.flagsSet).toEqual(['inn_is_working', 'charter_in_hand']);
    expect(fair.setsFlags).toContain('guest_right_held');
  });

  it('turns a failed inspection into a lost guest and an ending that says so', () => {
    const failed = step('the_inspection').succeedWhenAny.find((r) => r.routeId === 'failed_it')!;
    expect(failed.setsFlags).toContain('charter_voided');
    const dusk = step('the_last_nights').succeedWhenAny.find((r) => r.routeId === 'taken_at_dusk')!;
    expect(dusk.predicate.flagsSet).toEqual(['charter_voided']);
    expect(dusk.setsFlags).toContain('ember_taken');
    expect(S.endings.find((e) => e.id === 'end_taken_alive')!.requires.flagsSet).toEqual(['ember_taken']);
  });

  it('makes cooking and buying cost the house, and lying cost the secret', () => {
    for (const id of ['cook_supper', 'haggle']) {
      expect(ability(id).costs.map((c) => c.resourceId), id).toContain('debt');
    }
    for (const id of ['spin_a_story', 'stand_in_the_door', 'slip_away', 'warm_the_scale']) {
      expect(ability(id).costs.map((c) => c.resourceId), id).toContain('suspicion');
    }
  });
});

describe('what is locked opens in the story, not in a menu', () => {
  const GATED: Array<[id: string, flag: string, stepId: string]> = [
    ['warm_the_scale', 'knows:the_scale_points', 'what_it_does'],
    ['call_her_name', 'knows:her_name', 'her_name'],
  ];

  for (const [id, flag, stepId] of GATED) {
    it(`grants ${id} once, from ${stepId}, in the world’s own words`, () => {
      const a = ability(id);
      expect(a.unlockedByDefault).toBe(false);
      expect(a.requires.flagsSet).toEqual([flag]);
      expect(a.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);

      const granting = steps.filter((s) => s.rewards.abilities.includes(id));
      expect(granting.map((s) => s.id)).toEqual([stepId]);
      expect(granting[0]!.rewards.flags).toContain(flag);
      expect(granting[0]!.succeedWhenAny.length).toBeGreaterThanOrEqual(2);
    });
  }

  it('never gives her name for the asking', () => {
    for (const route of step('her_name').succeedWhenAny) {
      const ember = route.predicate.minRelationship.filter((m) => m.characterId === 'ember' && m.dimension === 'trust');
      expect(ember.length, route.routeId).toBe(1);
      expect(ember[0]!.value, route.routeId).toBeGreaterThanOrEqual(60);
      expect(route.predicate.flagsSet.length, `${route.routeId} needs a deed, not a question`).toBeGreaterThan(0);
    }
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-nine');
    for (const c of S.characters) {
      const age = AGES[c.id];
      expect(age, `${c.id} has no stated age`).toBeDefined();
      expect(age![0]).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
      expect(canon, c.id).toContain(age![1]);
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
    expect(S.openingPanel?.alt).not.toMatch(AGE_WORDS);
  });

  it('keeps the romance at a kiss', () => {
    expect(S.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(S.contentDescriptors).not.toContain('SEXUAL_CONTENT');
  });
});

describe('the art it will ask for', () => {
  it('puts the title in the cover art and every glow somewhere other than her face', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('THE ONE-COPPER INN');
    expect(cover).toMatch(/^SUBJECT: Ember\b/);
    expect(cover).toMatch(/never on her face/i);
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('draws her clearly adult, in the cover-style-v2 appeal and inside its limits', () => {
    const cover = S.coverDirection!;
    expect(cover).toMatch(/grown woman who looks in her late twenties, tall and long-limbed, with a mature face/);
    expect(cover).not.toMatch(/\b(teen\w*|girls?|young\w*|youth\w*|kids?|child\w*|student\w*|little|petite|school\w*)\b/i);
    expect(cover).not.toMatch(/\b(nude|naked|nipples?|lingerie|underwear|bikini|swim\w*|spread|lying|sexy)\b/i);
  });

  it('declares an opening panel led by the character whose portrait it references', () => {
    expect(S.openingPanel?.assetKey).toBe('story_the_one_copper_inn/opening');
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
    expect(S.openingPanel!.alt).toMatch(/^Ember\b/);
  });

  it('derives every generated key under this story’s own prefix', () => {
    const derived = withDerivedAssetKeys(S);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(key).toMatch(/^story_the_one_copper_inn\//);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('ships raw: no hand-written art keys, and dated only at release', () => {
    expect(S.coverImage).toBeNull();
    expect(S.keyArt).toBeNull();
    for (const c of S.characters) expect(c.portrait, c.id).toBeNull();
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
    expect(S.prologue).toEqual([]);
  });

  it('gives every character with a card a concrete appearance to draw', () => {
    for (const c of S.characters) expect(c.appearance.length, c.id).toBeGreaterThan(80);
  });
});

describe('nobody is only there to react', () => {
  it('starts the guest and the stablehand in the common room, and the captain outside', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['ember', 'tobin']));
    expect(present).not.toContain('wren');
  });

  it('brings the captain to the door within the first half hour', () => {
    const knock = S.worldEvents.find((e) => e.id === 'we_the_knock')!;
    expect(knock.atWorldMinute).toBeLessThanOrEqual(30);
    expect(knock.movesCharacters).toEqual([{ characterId: 'wren', toLocationId: 'common_room' }]);
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

  it('gives each titled character a name the storyteller can use', () => {
    const called = S.characters.map((c) => c.calledName ?? c.name);
    expect(new Set(called).size).toBe(called.length);
    expect(S.characters.find((c) => c.id === 'wren')!.calledName).toBe('Wren');
    expect(S.characters.find((c) => c.id === 'marla')!.calledName).toBe('Marla');
    expect(S.characters.find((c) => c.id === 'thatch')!.calledName).toBe('Thatch');
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
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('has exactly twelve endings, so the storyteller reads every one', () => {
    expect(S.endings).toHaveLength(12);
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = [
      'end_taken_alive',
      'end_four_hundred_crowns',
      'end_you_didnt_see_her',
      'end_last_night_of_the_inn',
      'end_the_road_out',
    ];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('has a slow-life ending that needs no dragon outcome at all', () => {
    const inn = S.endings.find((e) => e.id === 'end_the_one_copper_inn')!;
    const dragon = ['seven_nights_kept', 'she_flew', 'she_stayed', 'left_with_her', 'scale_returned'];
    expect(inn.requires.flagsSet.some((f) => dragon.includes(f))).toBe(false);
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

  it('makes a fight at the inn tell the valley before it costs the house', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction in array order.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(S.factions[0]?.id).toBe('faction_brindle_ford');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('tells the player their job is fixed before they pick it', () => {
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toContain('stays fixed for the whole story');
  });
});

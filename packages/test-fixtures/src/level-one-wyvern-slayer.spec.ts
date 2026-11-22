import { describe, expect, it } from 'vitest';
import { knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { LEVEL_ONE_WYVERN_SLAYER } from './level-one-wyvern-slayer.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Level One, Wyvern Slayer, held to the promise on its own card: the player is
 * strong from the first line, and the whole story is a town that measured them
 * wrong.
 *
 * The failure this world is most exposed to is the power fantasy going soft in
 * one of two directions. Either the storyteller "explains" the strength with a
 * curse or a hidden screen and turns a person into a gimmick, or the town stops
 * pushing back and the player wins every scene by existing. So the checks here
 * are mostly about pressure: a prize everybody wants, a rule that says it is not
 * yours, a rival with a reason, and a second wyvern that comes whether or not
 * anybody planned for it.
 */

const S = LEVEL_ONE_WYVERN_SLAYER;

const start = (archetypeId = 'arch_woodcutter') =>
  createInitialState({
    sessionId: 'sess_lows',
    story: S,
    identity: {
      displayName: 'Rowan Hale',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const character = (id: string) => S.characters.find((c) => c.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const step = (id: string) => steps.find((s) => s.id === id)!;
const event = (id: string) => S.worldEvents.find((e) => e.id === id)!;
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-eight. */
const AGES: Record<string, [number, string]> = {
  fia: [22, 'twenty-two'],
  tamsin: [27, 'twenty-seven'],
  gale: [29, 'twenty-nine'],
  harl: [34, 'thirty-four'],
  marguerite: [46, 'forty-six'],
  orsk: [63, 'sixty-three'],
};

/** Everything the storyteller or the player can read, as one list. */
const prose = (): string[] => [
  S.premise,
  S.hook,
  S.opening,
  S.creatorNote,
  S.rules.toneGuide,
  S.coverDirection,
  ...S.openingSuggestions,
  ...S.rules.hardCanon,
  ...S.rules.styleExamples,
  ...S.characters.flatMap((c) => [
    c.role,
    c.cardBlurb,
    c.appearance,
    c.socialStyle,
    c.speechStyle,
    ...c.voiceSamples,
    ...c.hiddenDrives,
    ...c.secrets.map((s) => s.fact),
  ]),
  ...S.items.flatMap((i) => [i.description, i.loreText]),
  ...S.locations.map((l) => l.description),
  ...S.quests.flatMap((q) => [q.summary, ...q.steps.map((s) => s.directorNotes)]),
  ...S.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
  ...S.endings.flatMap((e) => [e.condition ?? '', e.epilogue]),
  ...S.resources.flatMap((r) => r.bands.map((b) => b.behaviour)),
  ...S.archetypes.flatMap((a) => [a.summary, a.blurb]),
];

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player or the storyteller reads', () => {
    for (const text of prose()) expect(text).not.toContain('\\n');
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
    expect(head).toContain('TAMSIN');
    expect(head).toContain('"You dragged that in? Alone?"');
  });

  it('ends on a demand the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/Porter, a silver a day\. Take it now, or carry your lizard home\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the badge, the man who introduces himself and the rank may appear.
    const ALLOWED = new Set(['TAMSIN', 'Gale', 'B-rank', 'LEVEL', 'I']);
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
    expect(done).toMatch(/^I /);
    expect(done).toMatch(/crystal/);
    // The risky one is the strength itself, in front of the whole hall.
    expect(risky).toMatch(/^I lift the head/);
  });

  it('shows Fia in the hall as the one person not laughing', () => {
    expect(S.opening).toContain('Then everyone, except a woman measuring the wound with a tape.');
  });

  it('draws the opening panel on Tamsin, with nothing in it to read', () => {
    expect(S.openingPanel!.assetKey).toBe(`${S.storyId}/opening`);
    const alt = S.openingPanel!.alt;
    expect(alt.startsWith('Tamsin ')).toBe(true);
    expect(alt.length).toBeLessThanOrEqual(200);
    expect(alt).not.toMatch(/\d/);
  });

  it('puts the three faces of the opener in the hall when it starts', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['tamsin', 'gale', 'fia']));
    expect(S.rules.startingLocationId).toBe('guild_hall');
  });
});

describe('the premise lives where the storyteller can read it', () => {
  it('starts the player holding the head, and makes the head and its stone story objects', () => {
    // Production's storyteller reads quest items, never the ordinary ones.
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('wyvern_head');
    // The notice's struck-through name and the iron tag are clues and the
    // finale seed, so they are story objects too.
    for (const id of ['wyvern_head', 'eye_stone', 'wyvern_notice', 'guild_tag']) {
      expect(S.items.find((i) => i.id === id)?.questItem, id).toBe(true);
    }
    expect(S.items.find((i) => i.id === 'eye_stone')!.description).toMatch(/draw/);
  });

  it('spells out the draw, the number, the stone, the rule and the mate in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/called the draw, goes into whoever killed it/);
    expect(canon).toMatch(/crystal reads them at level 1/);
    expect(canon).toMatch(/eye-stone .* about three days/);
    expect(canon).toMatch(/Rule Twelve/);
    expect(canon).toMatch(/Wyverns pair for life/);
  });

  it('never lets the storyteller explain the strength away', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/no curse, no gift from a god, no hidden screen and no voice in their head/);
    expect(S.rules.toneGuide).toMatch(/Never explain the player’s strength as a curse, a god, a hidden screen/);
  });

  it('tells the storyteller what every history can do', () => {
    // It only reads the chosen archetype's starting abilities.
    for (const a of S.archetypes) {
      expect(a.startingAbilities, a.id).toContain('full_swing');
      expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(2);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id}/${id}`).toBe(true);
    }
  });

  it('keeps the four histories mutually exclusive', () => {
    // The storyteller treats archetypes as coexisting world facts when two or
    // more of their names appear in hard canon, the premise or the cast. These
    // are one player's past, so none of them may.
    const asserted = [...S.rules.hardCanon, S.premise, ...S.characters.map((c) => c.name)].join('\n');
    for (const a of S.archetypes) expect(asserted, a.name).not.toContain(a.name);
  });
});

describe('the eye-stone is the prize everybody wants', () => {
  it('keeps cracking it locked until somebody explains what it is, and then grants it', () => {
    const crack = ability('crack_the_eye');
    expect(crack.unlockedByDefault).toBe(false);
    expect(crack.requires.flagsSet).toEqual(['knows:the_eye_stone']);
    expect(crack.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(crack.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);

    const granting = steps.filter((s) => s.rewards.abilities.includes('crack_the_eye'));
    expect(granting.map((s) => s.id)).toEqual(['the_rule']);
    expect(granting[0]!.rewards.flags).toContain('knows:the_eye_stone');
  });

  it('gives the first night a real answer for each person who wants the stone', () => {
    const routes = step('the_first_night').succeedWhenAny.map((r) => r.routeId);
    expect(routes).toEqual(expect.arrayContaining(['guarded_it', 'sold_it', 'cracked_it', 'went_to_bed']));
  });

  it('lets Gale take it from a player who simply went to sleep', () => {
    const asleep = step('the_first_night').succeedWhenAny.find((r) => r.routeId === 'went_to_bed')!;
    expect(asleep.predicate.flagsSet).toEqual(['gale_tried_the_stone']);
    expect(asleep.setsFlags).toContain('gale_took_the_draw');
  });

  it('sends Gale over the yard wall after the first midnight, unless the stone is already gone', () => {
    const hammer = event('we_gale_at_the_yard');
    expect(hammer.locationId).toBe('carcass_yard');
    expect(hammer.atWorldMinute).toBeGreaterThan(24 * 60);
    expect(hammer.atWorldMinute).toBeLessThan(24 * 60 + 6 * 60);
    expect(hammer.cancelledByFlags).toEqual(expect.arrayContaining(['stone_cracked', 'sold_the_stone']));
  });

  it('has the Ascent House bid on it the first afternoon', () => {
    expect(event('we_the_offer').atWorldMinute).toBeLessThan(24 * 60);
    expect(S.items.find((i) => i.id === 'ascent_offer')!.description).toMatch(/four hundred gold/i);
  });
});

describe('the rule says the kill is not yours, and the player can beat it', () => {
  it('lets the player claim the kill more than one way, and give it away', () => {
    const claim = step('the_claim').succeedWhenAny;
    expect(claim.filter((r) => r.setsFlags.includes('kill_is_yours')).length).toBeGreaterThanOrEqual(3);
    expect(claim.some((r) => r.setsFlags.includes('gale_got_the_kill'))).toBe(true);
  });

  it('holds a public proving only once the first night is over', () => {
    const proving = event('we_the_proving');
    expect(proving.requiresFlags).toEqual(['first_night_over']);
    expect(proving.setsFlags).toEqual(['proving_called']);
    expect(proving.cancelledByFlags).toContain('claim_settled');
  });
});

describe('Gale is a rival, not a monster', () => {
  it('has a reason to want the stone and a thing to hide', () => {
    const gale = character('gale');
    expect(gale.hiddenDrives.join(' ')).toMatch(/A-rank/);
    expect(gale.secrets.map((s) => s.id)).toEqual(expect.arrayContaining(['gale_the_ridge', 'gale_the_hammer']));
    expect(gale.boundaries.join(' ')).toMatch(/unless he is certain he wins/);
  });

  it('opens the porter story only when the player talks to the porter', () => {
    const porter = S.quests.find((q) => q.id === 'q_the_porter')!;
    expect(porter.kind).toBe('SIDE');
    expect(porter.discoverWhen?.flagsSet).toEqual(['spoke:harl']);
  });

  it('lets the player learn what happened on the ridge three different ways', () => {
    const ways = step('hear_it').succeedWhenAny.filter((r) => r.setsFlags.includes('knows:the_left_porter'));
    expect(ways.length).toBe(3);
  });
});

describe('the second wyvern is a clock', () => {
  it('rises on its own, and rises faster when somebody handles the head', () => {
    const scent = S.resources.find((r) => r.id === 'scent')!;
    expect(scent.polarity).toBe('GOOD_LOW');
    expect(scent.regenPerHour).toBeGreaterThan(0);
    expect(ability('show_the_head').costs.map((c) => c.resourceId)).toContain('scent');
  });

  it('comes down on the town by the third night whatever anybody planned', () => {
    const comes = event('we_the_mate_comes');
    expect(comes.atWorldMinute).toBeLessThanOrEqual(3 * 1440);
    expect(comes.requiresFlags).toEqual([]);
    expect(comes.setsFlags).toEqual(['the_mate_came']);
    expect(comes.cancelledByFlags).toEqual(expect.arrayContaining(['mate_answered', 'led_it_away']));
  });

  it('tells everybody it exists on the first evening, without the player doing anything', () => {
    const carter = event('we_the_carter');
    expect(carter.atWorldMinute).toBeLessThan(24 * 60);
    expect(carter.requiresFlags).toEqual([]);
    expect(carter.setsFlags).toEqual(['knows:the_mate']);
  });

  it('can be met at least four ways', () => {
    expect(step('face_it').succeedWhenAny.length).toBeGreaterThanOrEqual(4);
  });

  it('lets the town burn without the player making a mistake', () => {
    const burned = S.endings.find((e) => e.id === 'end_the_ford_burned')!;
    expect(burned.requires.flagsSet).toEqual(['the_mate_came']);
    expect(burned.requires.minRelationship ?? []).toEqual([]);
  });
});

describe('the mystery is optional and behaves like it', () => {
  it('hides the rafters behind a lead only a curious player opens', () => {
    const lead = S.quests.find((q) => q.id === 'q_the_rafters')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_rafters']);
  });

  it('never opens it from a world event everybody gets', () => {
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_rafters'));
    expect(sources.length, 'nothing opens the lead').toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('keeps the founders’ cut locked, in the world’s own words, until the lead grants it', () => {
    const cut = ability('founders_cut');
    expect(cut.unlockedByDefault).toBe(false);
    expect(cut.requires.flagsSet).toEqual(['knows:the_founders_way']);
    expect(cut.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(cut.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const asked = step('ask_about_them');
    expect(asked.rewards.abilities).toEqual(['founders_cut']);
    for (const route of asked.succeedWhenAny) expect(route.setsFlags, route.routeId).toContain('knows:the_founders_way');
  });

  it('leaves most of the ending space reachable without it', () => {
    const lead = new Set(['crystal_exposed', 'kept_the_secret', 'sold_the_secret', 'rafters_answered', 'the_town_held']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => lead.has(f)));
    expect(ordinary.length, 'the mystery gates too much').toBeGreaterThanOrEqual(8);
  });
});

describe('Fia is a person, not a cheerleader', () => {
  it('gives her limits, a want of her own, and a way to refuse', () => {
    const fia = character('fia');
    expect(fia.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(fia.fears.length).toBeGreaterThanOrEqual(2);
    expect(fia.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(fia.secrets.length).toBeGreaterThanOrEqual(2);
    expect(fia.boundaries.join(' ')).toMatch(/even to help you/);
  });

  it('only lets romance open after her own secret is out, and keeps it at a kiss', () => {
    const gate = character('fia').gates.find((g) => g.kind === 'ROMANCE')!;
    expect(gate.requires.flagsSet).toEqual(['fia_number_known']);
    // The limit lives in hard canon, which the storyteller reads; the tone
    // guide is also the cover prompt's mood line and stays free of it.
    expect(S.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
    expect(S.rules.toneGuide).not.toMatch(/kiss|gore/);
    expect(step('partners').directorNotes).toMatch(/no further than a kiss/);
  });

  it('can part as friends, without a mistake', () => {
    const parted = step('partners').succeedWhenAny.find((r) => r.routeId === 'parted_friends')!;
    expect(parted.predicate.minRelationship ?? []).toEqual([]);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-eight');
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
      expect(c.visualHook, c.id).not.toMatch(AGE_WORDS);
      expect(c.silhouette, c.id).not.toMatch(AGE_WORDS);
    }
    // The cover goes further: no age word at all, not even "adult". The house
    // rules carry the age policy (generate-art.ts, Ace's refused cover).
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
    expect(S.coverDirection).not.toMatch(/\b(adult|older|aged?)\b/i);
  });

  it('has nobody anywhere in it who reads as under eighteen', () => {
    const MINOR = /\b(teen(?:s|age|ager|agers)?|girls?|boys?|kids?|child(?:ren|ish|like)?|minors?|underage|schoolgirl|schoolboy|high school|youngsters?)\b/i;
    for (const text of prose()) expect(text).not.toMatch(MINOR);
  });
});

describe('original, and nobody else’s words', () => {
  it('borrows no franchise term', () => {
    const FRANCHISE = /\b(isekai|status window|quirk|chakra|hokage|hunter association|section nine|reincarnat\w*|summoned hero)\b/i;
    for (const text of prose()) expect(text).not.toMatch(FRANCHISE);
  });

  it('puts the title in the cover art and keeps every other word out of it', () => {
    const cover = S.coverDirection;
    expect(cover).toContain('LEVEL ONE, WYVERN SLAYER');
    // Its own TITLE: line owns the lettering, so the generic cover rules drop.
    expect(cover).toMatch(/\bTITLE: .*spelled exactly LEVEL ONE, WYVERN SLAYER\b/);
    expect(cover).toMatch(/HER FACE STAYS CLEAN/);
    expect(cover).toContain('Fia Quenby');
    expect(cover).toMatch(/no letters, no numbers/i);
    expect(cover).toMatch(/no blood and no wound/i);
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

  it('gives everybody a home and somewhere to be all day', () => {
    const places = new Set(S.locations.map((l) => l.id));
    for (const c of S.characters) {
      expect(places.has(c.homeLocationId!), `${c.id} has no home`).toBe(true);
      const covered = c.schedule.reduce((sum, b) => sum + (b.endMinute - b.startMinute), 0);
      expect(covered, `${c.id} disappears for part of the day`).toBe(1440);
      for (const b of c.schedule) expect(places.has(b.locationId), `${c.id}@${b.startMinute}`).toBe(true);
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
      ['pet name', /\b(?:darling|friend|love|dear)\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('only asks for faces the generator draws', () => {
    for (const c of S.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}/${e}`).toBe(true);
    }
  });

  it('gives no two of them the same short name', () => {
    const short = S.characters.map((c) => c.calledName ?? c.name.split(' ')[0]!);
    expect(new Set(short).size).toBe(short.length);
  });
});

describe('it fits every history', () => {
  it('never says the wyvern was killed with an edge, because one history used a fence post', () => {
    const wound = [
      S.items.find((i) => i.id === 'wyvern_head')!.description,
      character('fia').cardBlurb,
      ...character('fia').voiceSamples,
      event('we_the_proving').publicCopy,
      event('we_the_proving').directorNotes,
      step('the_claim').directorNotes,
      S.endings.find((e) => e.id === 'end_a_silver_a_day')!.condition ?? '',
    ];
    for (const text of wound) expect(text).not.toMatch(/\b(cut|stroke|severed)\b/i);
  });
});

describe('ready for the release script', () => {
  it('ships undated, so release-stories stamps it on the day it goes out', () => {
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('carries a tag that files it on the Fantasy shelf', () => {
    expect(S.tags).toContain('High fantasy');
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

describe('it can end badly, early and in many ways', () => {
  it('has exactly the twelve endings the storyteller reads', () => {
    expect(S.endings).toHaveLength(12);
    for (const e of S.endings) expect((e.condition ?? '').length, e.id).toBeGreaterThan(80);
  });

  it('lets the player walk out early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.id).toBe('end_carry_your_lizard_home');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_a_silver_a_day', 'end_the_ford_burned', 'end_four_hundred_gold', 'end_carry_your_lizard_home'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
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

  it('lets rest restore the body and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes a brawl in the hall start the town talking, not bring the wyvern', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction
    // in array order.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('rumour');
    expect(S.factions[0]?.id).toBe('faction_guild');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

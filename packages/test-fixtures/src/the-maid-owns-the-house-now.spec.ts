import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { abilityEffect, archetypeGrants, calledName, knownExpression } from '@plotbreak/contracts';
import { THE_MAID_OWNS_THE_HOUSE_NOW as STORY } from './the-maid-owns-the-house-now.js';
import { withDerivedAssetKeys } from './derive-assets.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The Maid Owns the House Now, held to its own bible and to every catalog-wide
 * check it would meet if it were registered.
 *
 * It is not in `LAUNCH_CATALOG` yet, so none of the catalog, endings,
 * invariant, director or clarity suites see it. Each of those checks is
 * replicated here against this one world, so registering it later is a
 * one-line change that cannot turn anything red.
 *
 * The world-specific half guards what the bible is emphatic about: the apron
 * is held out on turn one by somebody named, refusing it is an authored route
 * rather than an absence, Clara is an employer who can say no rather than a
 * prize, and the house can be lost without the player making a mistake.
 */

const start = (archetypeId: string | null = 'arch_socialite') =>
  createInitialState({
    sessionId: 'sess_tmohn',
    story: STORY,
    identity: {
      displayName: 'Julian Avery',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

const steps = STORY.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag this world can write, the way the endings suite counts them. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map', 'qualified']);
  for (const { step } of steps) {
    for (const flag of step.rewards.flags) flags.add(flag);
    for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
  }
  for (const event of STORY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

/** The reserved observation families `recordObservations` writes. `knows:` is deliberately not one. */
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (flag: string): boolean =>
  flag === 'left_the_map' || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

/** Everything the narrator or the player actually reads. Hidden notes are checked separately. */
function proseFields(): string[] {
  return [
    STORY.title,
    STORY.fantasyLabel,
    STORY.hook,
    STORY.premise,
    STORY.opening,
    STORY.creatorNote,
    ...STORY.openingSuggestions,
    ...STORY.rules.styleExamples,
    STORY.openingPanel?.alt ?? '',
    ...STORY.characters.flatMap((c) => [
      c.name,
      c.role,
      c.cardBlurb,
      c.appearance,
      c.visualHook,
      c.silhouette,
      c.speechStyle,
      ...c.voiceSamples,
      ...c.publicTraits,
    ]),
    ...STORY.locations.flatMap((l) => [l.name, l.description, l.artDirection]),
    ...STORY.items.flatMap((i) => [i.name, i.description, i.loreText]),
    ...STORY.quests.flatMap((q) => [q.title, q.summary, ...q.steps.map((s) => s.playerCopy)]),
    ...STORY.worldEvents.map((e) => e.publicCopy),
    ...STORY.endings.flatMap((e) => [e.name, e.epilogue]),
    ...STORY.archetypes.flatMap((a) => [a.name, a.summary, a.blurb]),
  ];
}

describe('the opener', () => {
  it('is short enough to read before deciding, and long enough to stand in', () => {
    expect(words(STORY.opening)).toBeGreaterThanOrEqual(50);
    expect(words(STORY.opening), 'the opener is over 120 words').toBeLessThanOrEqual(120);
  });

  it('has a named person speak to the player within the first sixty words', () => {
    const first60 = STORY.opening.trim().split(/\s+/).slice(0, 60).join(' ');
    expect(first60).toContain('Clara');
    expect(first60, 'nobody says anything in the first sixty words').toMatch(/["“]/);
    // And she is speaking to the player, not about them.
    expect(first60).toMatch(/young master/);
  });

  it('ends on a direct question the player has to answer', () => {
    expect(STORY.opening.trim()).toMatch(/\?["”’]?$/);
  });

  it('asks the player to know no proper noun but the speaker', () => {
    // A capitalised word that is not the first word of a sentence is a name.
    // The only one allowed is the person holding out the apron.
    const ALLOWED = new Set(['Clara', 'Voss', 'I']);
    const prose = STORY.opening.replace(/["“”]/g, '');
    const sentences = prose.split(/(?<=[.?!])\s+|\n+/).filter((s) => s.trim().length > 0);
    const names: string[] = [];
    for (const sentence of sentences) {
      const tokens = sentence.trim().split(/\s+/).slice(1);
      for (const token of tokens) {
        const bare = token.replace(/[^\p{L}’']/gu, '').replace(/[’'].*$/, '');
        if (/^\p{Lu}/u.test(bare) && !ALLOWED.has(bare)) names.push(bare);
      }
    }
    expect(names, `the opener assumes the player knows: ${names.join(', ')}`).toEqual([]);
  });

  it('avoids the constructions the clarity checker flags', () => {
    for (const text of [STORY.opening, STORY.premise]) {
      expect(text).not.toMatch(/—/);
      expect(text).not.toMatch(/\bthe kind of \w+ that\b/i);
      expect(text).not.toMatch(/\bsomething like\b/i);
    }
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = STORY.openingSuggestions;
    expect(STORY.openingSuggestions.length).toBe(3);
    expect(said, 'the first card is not dialogue').toMatch(/^["“]/);
    expect(done, 'the second card is speech, not an action').not.toMatch(/^["“]/);
    expect(done).toMatch(/apron/);
    // The risky one: acting as if nothing changed, in front of the new owner.
    expect(risky).toMatch(/bell/);
    expect(new Set(STORY.openingSuggestions).size).toBe(3);
    for (const card of STORY.openingSuggestions) {
      expect(card, card).toMatch(/\bI\b/);
      expect(card).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
      expect(card.length).toBeLessThanOrEqual(320);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of STORY.openingSuggestions) {
      const intent = await parser.parse(card, {
        story: STORY,
        state,
        intentId: 'intent_card_probe',
        addressee: null,
      });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent, `these cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const flags = settable();
    const gated = STORY.abilities.filter((a) => !a.unlockedByDefault || (a.requires?.flagsSet.length ?? 0) > 0);
    expect(gated.length, 'nothing is gated, so the test is vacuous').toBeGreaterThan(0);
    for (const ability of gated) {
      expect(granted.has(ability.id), `${ability.id} is locked and nothing grants it`).toBe(true);
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(flags.has(flag) || engineSets(flag), `${ability.id} waits on "${flag}", which nothing sets`).toBe(true);
      }
      expect(ability.requires?.lockedCopy ?? '', `${ability.id} has no locked copy`).not.toBe('');
    }
  });

  it('writes every cardBlurb to the player', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb, `${c.id}'s card never says "you"`).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length).toBeGreaterThan(20);
      expect(c.cardBlurb).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge', () => {
    for (const location of STORY.locations) {
      const inbound = STORY.locations.some(
        (other) => other.id !== location.id && other.connections.some((edge) => edge.to === location.id),
      );
      expect(inbound, `${location.id} has no way in`).toBe(true);
    }
  });
});

describe('everybody is an adult, and reads as one', () => {
  const AGES: Record<string, number> = {
    clara: 30,
    midge: 22,
    pemberton: 58,
    hugo: 63,
    augustin: 56,
    silas: 44,
  };
  const AGE_WORDS: Record<number, string> = {
    30: 'thirty',
    22: 'twenty-two',
    58: 'fifty-eight',
    63: 'sixty-three',
    56: 'fifty-six',
    44: 'forty-four',
  };

  it('states an adult age for every member of the cast in hard canon, so the storyteller has them on every turn', () => {
    expect(Object.keys(AGES).sort()).toEqual(STORY.characters.map((c) => c.id).sort());
    const canon = STORY.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('twenty-nine');
    for (const c of STORY.characters) {
      const age = AGES[c.id]!;
      expect(age, c.id).toBeGreaterThanOrEqual(18);
      expect(canon, `${c.id} is not named in the ages line`).toContain(c.name);
      const after = canon.slice(canon.indexOf(c.name) + c.name.length, canon.indexOf(c.name) + c.name.length + 50);
      expect(after, `${c.id}'s age does not follow the name`).toContain(AGE_WORDS[age]!);
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORD = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of STORY.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORD);
    }
    expect(STORY.coverDirection).not.toMatch(AGE_WORD);
    expect(STORY.openingPanel!.alt).not.toMatch(AGE_WORD);
  });

  it('puts the player and the youngest of the cast in hard canon as adults', () => {
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Everyone in this story is an adult/);
    expect(canon).toMatch(/player is in their twenties/);
    expect(canon).toMatch(/Midge is twenty-two/);
  });

  it('uses no wording that reads as a child', () => {
    const CHILDLIKE = /\b(child|children|kid|kids|teen|teens|teenage|teenager|schoolgirl|schoolboy|little girl|little boy|underage|minor|petite|girlish|boyish|loli|tiny)\b/i;
    for (const c of STORY.characters) {
      for (const text of [c.appearance, c.visualHook, c.silhouette, c.cardBlurb, c.role]) {
        expect(text, `${c.id}: ${text}`).not.toMatch(CHILDLIKE);
      }
    }
    for (const text of [STORY.opening, STORY.premise, STORY.hook]) expect(text).not.toMatch(CHILDLIKE);
  });
});

describe('13+ and no fan service', () => {
  it('keeps every player-facing line clean', () => {
    const SUGGESTIVE =
      /\b(naked|nude|nudity|lingerie|underwear|breasts?|cleavage|thighs?|sexy|seductive|seduce|undress\w*|grope|aroused|sensual|busty|lust\w*|sex|sexual|bedroom eyes|blood\w*|gore|corpse|stab\w*|suicide|self-harm|overdose)\b/i;
    for (const text of proseFields()) {
      expect(text, text.slice(0, 80)).not.toMatch(SUGGESTIVE);
    }
  });

  it('tells the narrator where the romance stops', () => {
    // Hard canon, not the tone guide: the tone guide is also the cover's mood text.
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/no further than a kiss/);
    expect(canon).toMatch(/No fan service/);
    expect(canon).toMatch(/never a danger to himself/);
    expect(STORY.rules.toneGuide).not.toMatch(/\b(kiss\w*|body|bodies|fan service|lingering\w*|hurt|danger)\b/i);
    expect(STORY.intensity).toBe('LIGHT');
    expect(STORY.rules.allowsCombat).toBe(false);
  });

  it('is original: no franchise names or terms', () => {
    const FRANCHISE =
      /\b(ooc|downton|crawley|kaguya|maid-sama|misaki|usui|hayate|phantomhive|kuroshitsuji|black butler|tohru|kobayashi|emilia|subaru|re:zero|my maid became|maid caf[eé]|moe moe|goshujin|senpai|onii-chan|ojou-sama|bocchan|ara ara)\b/i;
    const everything = JSON.stringify(STORY);
    expect(everything).not.toMatch(FRANCHISE);
  });

  it('is written in English', () => {
    expect(JSON.stringify(STORY)).not.toMatch(/[぀-ヿ一-鿿가-힯]/);
  });
});

describe('the system lives where the storyteller can read it', () => {
  // Production's storyteller reads hard canon, quest items and the chosen
  // archetype's starting abilities. It never reads resources, step notes or
  // the rest of the ability list.
  const ability = (id: string) => STORY.abilities.find((a) => a.id === id)!;

  it('starts the player holding Clara’s written terms, a quest item', () => {
    expect(STORY.rules.startingItems.map((i) => i.itemId)).toEqual(['signet_ring', 'claras_terms']);
    const terms = STORY.items.find((i) => i.id === 'claras_terms')!;
    expect(terms.questItem).toBe(true);
    expect(terms.loreText).toMatch(/docked in writing/);
    expect(terms.loreText).toMatch(/The door opens both ways/);
    const state = start();
    expect(state.player.inventory.find((i) => i.itemId === 'claras_terms')?.quantity).toBe(1);
  });

  it('gives every background Know the House plus one move of its own, all usable from turn one', () => {
    const seconds = new Set<string>();
    for (const a of STORY.archetypes) {
      expect(a.startingAbilities, a.id).toContain('know_the_house');
      expect(a.startingAbilities.length, a.id).toBe(2);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id} ${id}`).toBe(true);
      seconds.add(a.startingAbilities.find((id) => id !== 'know_the_house')!);
    }
    expect(seconds.size).toBe(STORY.archetypes.length);
  });

  it('spells out the terms, the wages, the work, the town, the lies and the clock in hard canon', () => {
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/a wage paid in cash every Friday/);
    expect(canon).toMatch(/Pulling rank on her costs a day’s wage/);
    expect(canon).toMatch(/never done a day of household work/);
    expect(canon).toMatch(/Hugo will teach it if he is asked properly/);
    expect(canon).toMatch(/reaches the pub and the Gazette’s society page within a day/);
    expect(canon).toMatch(/Hugo always checks/);
    expect(canon).toMatch(/Today is day one of fourteen/);
    expect(canon).toMatch(/the loan falls due at nine on the morning of day fifteen/);
  });

  it('never names a background in hard canon, so the other three stay unreal', () => {
    const canon = STORY.rules.hardCanon.join('\n');
    for (const a of STORY.archetypes) expect(canon, a.id).not.toContain(a.name);
  });
});

describe('the art', () => {
  const cover = STORY.coverDirection;

  it('paints the title into the cover on its own TITLE line, spelled exactly', () => {
    expect(cover.match(/TITLE:/g)).toHaveLength(1);
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(title).toContain('The Maid Owns the House Now');
    expect(title).toContain('spelled exactly THE MAID OWNS THE HOUSE NOW');
    expect(title).toMatch(/upper third/);
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('keeps every effect off her face, and keeps her out of a maid costume', () => {
    expect(cover.startsWith('SUBJECT: Clara Voss')).toBe(true);
    expect(cover).toMatch(/HER FACE STAYS CLEAN/);
    expect(cover).toMatch(/not in a maid costume: no frills, no lace/);
    expect(cover).not.toMatch(/\b(sexy|alluring|curvy|curvaceous|cleavage|figure|legs|skirt)\b/i);
  });

  it('draws the opening panel from the portrait of the person who speaks first', () => {
    const alt = STORY.openingPanel!.alt;
    expect(alt.length).toBeLessThanOrEqual(200);
    expect(alt.startsWith('Clara')).toBe(true);
    expect(STORY.opening.indexOf('Clara')).toBeLessThan(STORY.opening.indexOf('"'));
  });

  it('gives every carded character a concrete appearance', () => {
    for (const c of STORY.characters) {
      if (c.cardBlurb.trim()) expect(c.appearance.length, c.id).toBeGreaterThan(80);
    }
  });

  it('is dated only at release: release-stories stamps publishedAt', () => {
    expect(isReleaseDate(STORY.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });
});

describe('the apron is a choice, not a gate', () => {
  it('starts in the front hall at half past six', () => {
    expect(STORY.rules.startingLocationId).toBe('the_front_hall');
    expect(STORY.rules.startWorldMinute).toBe(6 * 60 + 30);
  });

  it('has Clara in the hall, holding it out', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('clara');
  });

  it('does not let the rest of the cast wander into the opening', () => {
    for (const c of STORY.characters) {
      const placed = locationForSchedule(c.schedule, STORY.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'clara') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(STORY.rules.startingLocationId);
    }
  });

  it('makes refusing the apron a route rather than an absence', () => {
    const step = STORY.quests.find((q) => q.id === 'q_three_hundred_stairs')!.steps[0]!;
    for (const id of ['pulled_rank', 'walked_out']) {
      const route = step.succeedWhenAny.find((r) => r.routeId === id)!;
      expect(route, `there is no ${id} route`).toBeDefined();
      expect(route.setsFlags).toContain('refused_the_apron');
      expect(route.predicate.hasItems).toEqual([]);
      expect(route.predicate.minRelationship).toEqual([]);
    }
    // A run that refuses still has somewhere to go.
    const later = STORY.endings.filter((e) => e.requires.flagsSet.includes('refused_the_apron'));
    expect(later.length, 'refusing dead-ends the story').toBeGreaterThanOrEqual(1);
  });

  it('gives every first-turn move a step it can finish', () => {
    // Said (bargain), done (apron or work), risky (pull rank), walk out.
    const step = STORY.quests.find((q) => q.id === 'q_three_hundred_stairs')!.steps[0]!;
    expect(step.succeedWhenAny.map((r) => r.routeId)).toEqual(
      expect.arrayContaining(['took_the_apron', 'got_to_work', 'bargained', 'pulled_rank', 'walked_out']),
    );
    const pull = STORY.abilities.find((a) => a.id === 'pull_rank')!;
    expect(pull.affordances).toContain('ring for breakfast');
  });
});

describe('Clara is an employer, not a prize', () => {
  const clara = STORY.characters.find((c) => c.id === 'clara')!;

  it('is a person with her own life', () => {
    expect(clara.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(clara.fears.length).toBeGreaterThanOrEqual(2);
    expect(clara.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(clara.secrets.length).toBeGreaterThanOrEqual(2);
    expect(clara.voiceSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('can say no, dock a wage, and will only be courted as an equal', () => {
    const boundaries = clara.boundaries.join(' ').toLowerCase();
    expect(boundaries).toContain('docks a day’s wage');
    expect(boundaries).toContain('only as an equal');
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/Clara is not a prize/);
  });

  it('keeps the romance optional and late', () => {
    const romance = STORY.endings.find((e) => e.id === 'end_the_lady_of_the_house')!;
    expect(romance.rarity).toBe('RARE');
    expect(romance.minTurn).toBeGreaterThanOrEqual(35);
    const others = STORY.endings.filter((e) => e.id !== romance.id);
    expect(others.every((e) => !e.requires.flagsSet.includes('said_it_to_her'))).toBe(true);
  });
});

describe('the house can be lost without a mistake', () => {
  it('offers a loss that needs nothing but the clock', () => {
    const sold = STORY.endings.find((e) => e.id === 'end_sold')!;
    expect(sold.requires.minRelationship).toEqual([]);
    expect(sold.requires.hasItems).toEqual([]);
    expect(sold.requires.minFactionReputation).toEqual([]);
    const foreclosed = routes.find(({ route }) => route.routeId === 'foreclosed')!.route;
    expect(foreclosed.predicate.flagsSet).toEqual(['note_due']);
    expect(foreclosed.predicate.minRelationship).toEqual([]);
    const due = STORY.worldEvents.find((e) => e.id === 'we_the_loan_falls_due')!;
    expect(due.setsFlags).toContain('note_due');
  });

  it('lets somebody simply leave, and early', () => {
    const walk = STORY.endings.find((e) => e.id === 'end_the_door_still_opens')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('gives every scheduled pressure a way to be switched off, where it should be', () => {
    const flags = settable();
    for (const id of ['we_the_night_tray', 'we_silas_finds_the_chute', 'we_the_loan_falls_due']) {
      const event = STORY.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags, `${id} is cancelled by "${flag}", which nothing sets`).toContain(flag);
      }
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
    const vocab = new Map(STORY.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of STORY.characters) {
      for (const b of STORY.characters) {
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
    ];
    for (const [label, pattern] of MOVES) {
      const users = STORY.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => STORY.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Clara counts things and docks wages.
    expect(sample('clara')).toMatch(/One: .*Two: /);
    expect(sample('clara')).toMatch(/docked/);
    // Midge talks in headlines.
    expect(sample('midge')).toMatch(/\b[A-Z]{4,} [A-Z]{4,}/);
    // Lady Pemberton says "darling" and nobody else does.
    expect(sample('pemberton')).toMatch(/darling/);
    for (const c of STORY.characters) if (c.id !== 'pemberton') expect(sample(c.id)).not.toMatch(/darling/);
    // Hugo speaks in "one" and calls a triumph adequate.
    expect(sample('hugo')).toMatch(/One does not/);
    expect(sample('hugo')).toMatch(/[Aa]dequate/);
    // Augustin is in exile, with biscuits.
    expect(sample('augustin')).toMatch(/my heir/);
    expect(sample('augustin')).toMatch(/temporary embarrassment/i);
    // Silas states the procedure and the sum.
    expect(sample('silas')).toMatch(/Just so we are clear/);
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of STORY.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });

  it('gives no two of them the same short name', () => {
    const called = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size, called.join(', ')).toBe(called.length);
  });

  it('only uses faces the reaction generator draws', () => {
    const unknown = STORY.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
    );
    expect(unknown).toEqual([]);
  });
});

describe('the state stays underneath the prose', () => {
  it('keeps three invisible banded variables', () => {
    expect(STORY.resources.length).toBe(3);
    for (const r of STORY.resources) {
      expect(r.visible, `${r.id} is on the screen`).toBe(false);
      expect(r.bands.length, `${r.id} has no bands`).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), `${r.id} top band`).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('has something the player can do that moves each descending one, and lets it fall back', () => {
    for (const r of STORY.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      const driven = STORY.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(driven, `nothing the player can do changes ${r.id}`).toBe(true);
      expect(r.regenPerHour, `${r.id} never comes back down`).toBeLessThan(0);
    }
  });

  it('sends a fight in the hall to the town, and to the gossip', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction and raises the FIRST GOOD_LOW.
    expect(STORY.factions[0]?.id).toBe('faction_kestrel_bay');
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scandal');
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const faction of STORY.factions) {
      expect(faction.ranks.length, `${faction.id} has no ladder`).toBeGreaterThanOrEqual(3);
      const top = Math.max(...faction.ranks.map((r) => r.atReputation));
      expect(top, `${faction.id} starts at its own ceiling`).toBeGreaterThan(faction.startingReputation);
    }
  });

  it('never gates on standing nothing can earn', () => {
    const ceiling = new Map(STORY.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of STORY.archetypes) {
      for (const entry of archetype.startingReputation) {
        const floor = STORY.factions.find((f) => f.id === entry.factionId)?.startingReputation ?? 0;
        ceiling.set(entry.factionId, Math.max(ceiling.get(entry.factionId) ?? 0, floor + entry.amount));
      }
    }
    for (const { step } of steps) {
      for (const gain of step.rewards.reputation) {
        ceiling.set(gain.factionId, (ceiling.get(gain.factionId) ?? 0) + Math.max(0, gain.amount));
      }
    }
    const gates = [
      ...STORY.endings.flatMap((e) => e.requires.minFactionReputation),
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
      ...steps.flatMap(({ step }) => step.enterWhen?.minFactionReputation ?? []),
    ];
    expect(gates.length, 'no faction gates at all, so the ladders are decoration').toBeGreaterThan(0);
    for (const gate of gates) {
      expect(ceiling.get(gate.factionId) ?? -100, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('schedules everybody somewhere that exists', () => {
    const locations = new Set(STORY.locations.map((l) => l.id));
    for (const c of STORY.characters) {
      for (const block of c.schedule) expect(locations, `${c.id} -> ${block.locationId}`).toContain(block.locationId);
      if (c.homeLocationId) expect(locations, `${c.id} lives nowhere`).toContain(c.homeLocationId);
    }
  });
});

/** What `catalog.spec.ts`, `endings.spec.ts` and `catalogue-invariants.spec.ts` would check. */
describe('the catalog-wide checks, for this world', () => {
  it('has more than one way through, and closes doors', () => {
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
      for (const itemId of route.predicate.hasItems) {
        expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const itemId of step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)) {
        expect(granted.has(itemId), `${quest}/${step.id} awards ${itemId}`).toBe(false);
      }
    }
  });

  it('gives every archetype something the rules can see', () => {
    for (const archetype of STORY.archetypes) {
      const grants = archetypeGrants(STORY, archetype);
      const total = grants.abilities.length + grants.skills.length + grants.attributes.length + grants.items.length;
      expect(total, `${archetype.id} grants nothing`).toBeGreaterThan(0);
    }
    const ids = STORY.archetypes.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves something worth taking, owned by somebody real', () => {
    const takeable = STORY.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    for (const entry of takeable) {
      expect(STORY.items.some((item) => item.id === entry.itemId), entry.itemId).toBe(true);
      if (entry.ownerId) expect(STORY.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
    }
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const location of STORY.locations) {
      for (const item of location.takeableItems) {
        for (const alias of item.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
        }
      }
    }
    const collisions = [...owners.entries()].filter(([, items]) => items.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
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
    }
    for (const a of STORY.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const i of STORY.items) {
      for (const skill of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(skill)) broken.push(`${i.id} modifies ${skill}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of STORY.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of STORY.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of STORY.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    for (const e of STORY.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of STORY.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} needs ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
    }
    for (const q of STORY.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
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
    expect(broken, `dangling references: ${broken.join('; ')}`).toEqual([]);
  });

  it('never reads a flag nothing can set', () => {
    const flags = settable();
    const orphans: string[] = [];
    const check = (read: readonly string[], where: string): void => {
      for (const flag of read) if (!engineSets(flag) && !flags.has(flag)) orphans.push(`${flag} (${where})`);
    };
    for (const q of STORY.quests) {
      if (q.discoverWhen) check(q.discoverWhen.flagsSet, `${q.id}.discoverWhen`);
      for (const st of q.steps) {
        if (st.enterWhen) check(st.enterWhen.flagsSet, `${q.id}/${st.id}.enterWhen`);
        for (const r of st.succeedWhenAny) check(r.predicate.flagsSet, `${q.id}/${st.id}/${r.routeId}`);
      }
    }
    for (const c of STORY.characters) for (const g of c.gates) check(g.requires.flagsSet, `${c.id}/${g.id}`);
    for (const e of STORY.worldEvents) check([...e.requiresFlags, ...e.cancelledByFlags], e.id);
    for (const e of STORY.endings) check([...e.requires.flagsSet, ...e.requires.flagsUnset], e.id);
    for (const a of STORY.abilities) check(a.requires?.flagsSet ?? [], a.id);
    expect(orphans, `reads flags nothing sets:\n  ${orphans.join('\n  ')}`).toEqual([]);
  });

  it('never uses a relationship gate id as if it were a flag', () => {
    const gateIds = new Set(STORY.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const reads = [
      ...routes.flatMap(({ route }) => route.predicate.flagsSet),
      ...STORY.endings.flatMap((e) => e.requires.flagsSet),
      ...STORY.characters.flatMap((c) => c.gates.flatMap((g) => g.requires.flagsSet)),
    ];
    expect(reads.filter((f) => gateIds.has(f))).toEqual([]);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((STORY.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = STORY.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('meets the ending bar', () => {
    expect(STORY.endings.length).toBeGreaterThanOrEqual(3);
    expect(STORY.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const ending of STORY.endings) {
      expect(ending.name.length, ending.id).toBeGreaterThan(0);
      expect(ending.minTurn, ending.name).toBeGreaterThan(0);
      expect(ending.condition.length, ending.name).toBeGreaterThan(80);
      expect(ending.epilogue.length, ending.name).toBeGreaterThan(60);
    }
  });

  it('authors hard canon', () => {
    expect(STORY.rules.hardCanon.length).toBeGreaterThan(0);
  });
});

/** What `director.spec.ts` and `choice-clarity.spec.ts` would check. */
describe('the director and clarity checks, for this world', () => {
  it('meets the §43.1 content bar', () => {
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(words(STORY.premise)).toBeGreaterThanOrEqual(120);
    expect(words(STORY.premise)).toBeLessThanOrEqual(250);
    const paragraphs = STORY.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const paragraph of paragraphs) expect(words(paragraph)).toBeLessThanOrEqual(70);
    expect(STORY.promises.length).toBeGreaterThanOrEqual(3);
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
    expect(STORY.rules.startingItems.length).toBeGreaterThan(0);
    const reachable = new Set([STORY.rules.startingLocationId]);
    for (const location of STORY.locations) for (const edge of location.connections) reachable.add(edge.to);
    for (const location of STORY.locations) expect(reachable.has(location.id), location.id).toBe(true);
  });

  it('hands a player who skips the background the signet ring', () => {
    const state = start(null);
    expect(state.player.inventory.find((i) => i.itemId === 'signet_ring')?.quantity).toBe(1);
  });

  it('passes the narrative clarity standard', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(STORY).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const missing = checkNarrativeClarity(STORY.premise, { story: STORY, kind: 'premise' }).issues.filter((i) =>
      i.code.startsWith('MISSING_'),
    );
    expect(missing.map((m) => m.code)).toEqual([]);
  });

  it('explains the background choice and says it is fixed', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(STORY);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    expect(field.helpText).toMatch(/later|cannot be changed/i);
    for (const option of STORY.archetypes) {
      expect(option.name).not.toMatch(/—/);
      expect(option.summary.length).toBeGreaterThan(40);
      expect(option.playstyle.length).toBeGreaterThanOrEqual(2);
      for (const tag of option.playstyle) expect(tag.length, tag).toBeLessThanOrEqual(24);
    }
    const tagSets = STORY.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('lets every ability state its own shape', () => {
    for (const ability of STORY.abilities) {
      const effect = abilityEffect(STORY, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });
});

describe('the copy and the art', () => {
  it('has no literal backslash-n anywhere', () => {
    expect(JSON.stringify(STORY)).not.toMatch(/\\\\n/);
  });

  it('does not answer its own mysteries on the store card', () => {
    const premise = STORY.premise.toLowerCase();
    for (const secret of ['attic', 'pension', 'pemberton', 'ellery', 'painting', 'loan', 'augustin']) {
      expect(premise, `the premise gives away "${secret}"`).not.toContain(secret);
    }
    // The story page shows every cast card, and the chips and the creator's
    // note, before the player taps Play. None of them may say where the
    // creaking floorboard is or who is standing on it.
    for (const c of STORY.characters) {
      const card = `${c.role} ${c.cardBlurb} ${c.visualHook} ${c.silhouette} ${c.appearance} ${c.publicTraits.join(' ')}`.toLowerCase();
      for (const secret of ['attic', 'box room']) {
        expect(card, `${c.id}'s card gives away "${secret}"`).not.toContain(secret);
      }
    }
    const storePage = [STORY.hook, STORY.fantasyLabel, STORY.creatorNote, ...STORY.mechanicsChips].join(' ').toLowerCase();
    for (const secret of ['attic', 'box room']) {
      expect(storePage, `the store page gives away "${secret}"`).not.toContain(secret);
    }
  });

  it('keeps a blank protagonist and no prologue', () => {
    expect(STORY.protagonist.kind).toBe('BLANK');
    expect(STORY.prologue).toEqual([]);
  });

  it('derives every asset key under its own prefix', () => {
    const derived = withDerivedAssetKeys(STORY);
    const prefix = 'story_the_maid_owns_the_house_now/';
    expect(derived.coverImage).toBe(`${prefix}cover`);
    expect(derived.keyArt).toBe(`${prefix}key`);
    for (const l of derived.locations) expect(l.stageImage).toBe(`${prefix}stage_${l.id}`);
    for (const c of derived.characters) expect(c.portrait).toBe(`${prefix}${c.id}`);
    expect(STORY.openingPanel?.assetKey).toBe(`${prefix}opening`);
    expect(STORY.storyId).toBe('story_the_maid_owns_the_house_now');
    expect(STORY.id).toBe('sv_the_maid_owns_the_house_now_1');
  });
});

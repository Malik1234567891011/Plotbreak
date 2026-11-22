import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { ONE_WEEK_SHE_SAID } from './one-week-she-said.js';

/**
 * One Week, She Said, held to the promise on its own card: the player holds all
 * the power on turn one, and every way of using it is a story.
 *
 * The failure this world is most exposed to is the obvious one: a redemption
 * arc on rails, where every road leads to forgiveness and the closed door is a
 * game over. So most of what is checked here is that refusal, revenge and
 * silence are authored routes with endings of their own.
 *
 * The story is not in the launch catalog yet, so `catalog.spec`,
 * `endings.spec` and the director's content bar do not run on it. The checks
 * from those that a new world most often fails are repeated at the bottom.
 */

const S = ONE_WEEK_SHE_SAID;

const start = (archetypeId = 'arch_steady') =>
  createInitialState({
    sessionId: 'sess_one_week',
    story: S,
    identity: {
      displayName: 'Ren Mizuno',
      pronouns: 'he/him',
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
const routes = steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ step: s.id, route: r })));
const route = (id: string) => routes.find((r) => r.route.routeId === id)!.route;
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-six. */
const AGES: Record<string, number> = { mika: 26, jun: 27, aya: 29, kenta: 30, tamura: 71, daisuke: 26 };

/** Every flag a route, a step reward or a world event can set. */
const settable = (): Set<string> => {
  const out = new Set<string>();
  for (const s of steps) {
    for (const f of s.rewards.flags) out.add(f);
    for (const r of s.succeedWhenAny) for (const f of r.setsFlags) out.add(f);
  }
  for (const e of S.worldEvents) for (const f of e.setsFlags) out.add(f);
  return out;
};

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

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

  it('is written in English and nothing else', () => {
    // A stray Japanese honorific or a line of kana is the most likely leak in
    // a story set in a Japanese city. Names are romanised; that is all.
    expect(JSON.stringify(S)).not.toMatch(/[぀-ヿ一-龯]/);
    expect(JSON.stringify(S)).not.toMatch(/-(?:san|kun|chan|senpai|sama)\b/i);
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
    expect(S.opening.trimStart()).toMatch(/^"/);
    expect(head).toContain('Mika');
    expect(head).toMatch(/"One week," she says\./);
  });

  it('ends on a question the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"So\. Yes or no\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. The
    // only ones allowed are the woman at the door, the name she gave the
    // player (introduced in the same sentence), and the day of the week.
    const ALLOWED = new Set(['Mika', 'Arai', 'Footnote', 'Sunday', 'I']);
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
    expect(done).not.toMatch(/"/);
    // The risky one makes her pay for the door before she is through it.
    expect(risky).toMatch(/^I /);
    expect(risky).toMatch(/camera/i);
    for (const card of S.openingSuggestions) expect(card, card).toMatch(/\bI\b/);
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
    expect(violent, violent.join(' | ')).toEqual([]);
  });
});

describe('she is at the door and nobody else is', () => {
  it('starts at twenty to midnight in the player’s apartment', () => {
    expect(S.rules.startingLocationId).toBe('apartment_2c');
    expect(S.rules.startWorldMinute).toBe(23 * 60 + 40);
  });

  it('puts Mika in the opening scene and keeps the rest of the cast out of it', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('mika');
    for (const id of ['jun', 'aya', 'kenta', 'tamura', 'daisuke']) expect(present, id).not.toContain(id);
  });
});

describe('every answer at the door is a story', () => {
  const door = steps.find((s) => s.id === 'at_the_door')!;

  it('makes the closed door a route, not a game over', () => {
    const shut = route('shut_the_door');
    expect(shut.setsFlags).toContain('turned_her_away');
    // She ends up downstairs, under the player’s floor, with an ending of her own.
    const found = S.worldEvents.find((e) => e.id === 'we_tamura_finds_her')!;
    expect(found.requiresFlags).toEqual(['turned_her_away']);
    expect(found.setsFlags).toContain('mika_downstairs');
    expect(S.endings.some((e) => e.requires.flagsSet.includes('turned_her_away'))).toBe(true);
  });

  it('offers at least four ways to answer, including making her say it first', () => {
    expect(door.succeedWhenAny.length).toBeGreaterThanOrEqual(4);
    expect(door.succeedWhenAny.map((r) => r.routeId)).toEqual(
      expect.arrayContaining(['shut_the_door', 'made_her_say_it', 'let_in_quietly', 'let_in_on_terms']),
    );
  });

  it('lets the player get even, and gives revenge an ending that is not a punishment', () => {
    expect(route('made_her_pay').predicate.flagsSet).toEqual(['used:hold_it_over_her']);
    expect(route('exposed_her').predicate.flagsSet).toContain('used:make_it_public');
    for (const id of ['end_paid_in_full', 'end_thirty_four_classmates']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('lets the whole week pass with nothing said, and calls that a decision', () => {
    const silent = route('never_brought_it_up');
    expect(silent.predicate.minRelationship).toEqual([]);
    expect(silent.predicate.hasItems).toEqual([]);
    expect(silent.predicate.afterWorldMinute).toBeDefined();
    const ending = S.endings.find((e) => e.id === 'end_eight_polite_nights')!;
    expect(ending.requires.flagsSet).toContain('left_unsaid');
  });

  it('makes going through her bag possible and costly', () => {
    const snoop = ability('look_through_her_things');
    expect(snoop.costs.map((c) => c.resourceId)).toContain('guard');
    expect(route('read_her_phone').predicate.hasItems).toEqual(['mika_phone']);
    expect(route('found_it_in_her_bag').closesFlags).toContain('she_gave_it_back');
  });
});

describe('she is a person, not a prize', () => {
  it('gives her limits, a want of her own, and a way to refuse', () => {
    const mika = character('mika');
    expect(mika.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(mika.fears.length).toBeGreaterThanOrEqual(2);
    expect(mika.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(mika.secrets.length).toBeGreaterThanOrEqual(3);
    expect(mika.voiceSamples.length).toBeGreaterThanOrEqual(5);
  });

  it('does not start her liking the player', () => {
    const r = character('mika').startingRelationship;
    expect(r.trust).toBeLessThanOrEqual(20);
    expect(r.affection).toBeLessThanOrEqual(20);
  });

  it('puts romance behind a real apology and real trust', () => {
    const gate = character('mika').gates.find((g) => g.kind === 'ROMANCE')!;
    expect(gate.requires.flagsSet).toContain('she_apologised');
    expect(gate.requires.trust).toBeGreaterThanOrEqual(60);
    const stay = S.endings.find((e) => e.id === 'end_stay_another_week')!;
    expect(stay.requires.flagsSet).toContain('she_apologised');
  });

  it('lets her go back to Kenta, and makes that partly the player’s doing', () => {
    expect(route('she_went_back').predicate.flagsSet).toContain('used:hold_it_over_her');
    expect(S.endings.some((e) => e.requires.flagsSet.includes('she_went_back'))).toBe(true);
  });

  it('keeps Kenta’s menace inside the rating', () => {
    const kenta = character('kenta');
    expect(kenta.boundaries.join(' ')).toMatch(/never raise a hand/i);
    expect(S.rules.hardCanon.join(' ')).toMatch(/Kenta has never hit anyone/);
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

  it('gives everyone a name the storyteller can tell apart, and faces the art can draw', () => {
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    for (const c of S.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}/${e}`).toBe(true);
    }
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-six');
    expect(canon).toMatch(/were all eighteen/);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
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

  it('never calls anybody a minor anywhere in the story', () => {
    const text = JSON.stringify(S);
    expect(text).not.toMatch(/\b(teen\w*|girl\w*|boy\w*|kid\w*|child\w*|student\w*|minor|underage|schoolgirl|schoolboy)\b/i);
  });

  it('stays inside a 13+ rating', () => {
    const text = JSON.stringify(S);
    expect(text).not.toMatch(
      /\b(sex\w*|nude|naked|nudity|undress\w*|lingerie|underwear|bra|cleavage|thighs?|blood\w*|gore|wound\w*|suicid\w*|self-harm|overdose|razor)\b/i,
    );
    expect(S.rules.allowsCombat).toBe(false);
    expect(S.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(S.rules.toneGuide).toMatch(/no injury detail/);
  });

  it('closes the fade-to-black the production storyteller would otherwise use', () => {
    // The pure narrator's constitution moves intimacy off the page. Here the
    // limit has to hold off the page too, and the sofa is never paid for in
    // anything but money and chores.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/no further than a kiss, on the page or off it/);
    expect(canon).toMatch(/no fade-to-black/);
    expect(canon).toMatch(/money and housework and nothing else/);
    expect(S.rules.toneGuide).toMatch(/never fan service/);
    expect(S.rules.toneGuide).toMatch(/not even off the page/);
  });

  it('keeps the school year out of scenes and out of uniforms', () => {
    expect(S.rules.hardCanon[1]).toMatch(/never played as a scene or a flashback/);
    expect(S.rules.hardCanon[1]).toMatch(/no uniforms/);
  });
});

describe('what the production storyteller can actually see', () => {
  it('shows it the props the mystery and the rival hang on', () => {
    // The pure narrator lists only quest items as objects the story turns on.
    for (const id of ['appointment_book', 'mika_phone', 'old_notebook']) {
      expect(S.items.find((i) => i.id === id)!.questItem, id).toBe(true);
    }
  });

  it('maps the clock’s day numbers onto the weekdays the deadlines use', () => {
    // formatStoryTime only says "Day N"; every deadline in canon is a weekday.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Day 1 is the Saturday she arrives/);
    expect(canon).toMatch(/Day 7 Friday/);
    expect(canon).toMatch(/Day 9 Sunday/);
    expect(canon).toMatch(/"Next Sunday" always means Day 9, never tomorrow/);
  });

  it('says why tonight, so the storyteller does not invent it on turn one', () => {
    expect(S.rules.hardCanon.join(' ')).toMatch(/night manager found him/);
  });

  it('keeps the landlady’s secret off her card', () => {
    expect(character('tamura').cardBlurb).not.toMatch(/stray|fed/i);
  });

  it('only stages the last night for a player who let her stay', () => {
    // Production reads world events with no conditions, so the prose says it too.
    for (const id of ['we_last_night', 'we_jun_turns_up', 'we_tamura_hears_the_cat']) {
      const e = S.worldEvents.find((x) => x.id === id)!;
      expect(e.requiresFlags, id).toEqual(['she_stays']);
      expect(e.directorNotes, id).toMatch(/^Only if she (?:is|has been) staying in 2C\./);
    }
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

describe('the gated ability stays gated, in the world’s own words', () => {
  it('opens Stand Between Them only once the player knows about Kenta', () => {
    const face = ability('face_kenta');
    expect(face.unlockedByDefault).toBe(false);
    expect(face.requires.flagsSet).toEqual(['knows:about_kenta']);
    expect(face.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(face.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    // Every way of learning about him sets the flag, and the step that grants
    // the ability cannot be finished without learning it, or deciding not to.
    const why = steps.find((s) => s.id === 'why_your_door')!;
    expect(why.rewards.abilities).toEqual(['face_kenta']);
    const learning = why.succeedWhenAny.filter((r) => r.routeId !== 'didnt_ask');
    for (const r of learning) expect(r.setsFlags, r.routeId).toContain('knows:about_kenta');
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

  it('has real losses, not just flavours of forgiveness', () => {
    const losses = [
      'end_back_across_the_river',
      'end_the_door_stayed_shut',
      'end_paid_in_full',
      'end_eight_polite_nights',
      'end_one_more_week',
    ];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('keeps the walk-away last, past the twelve the storyteller reads', () => {
    expect(S.endings.at(-1)!.requires.flagsSet).toEqual(['left_the_map']);
  });

  it('meets the ending bar', () => {
    expect(S.endings.length).toBeGreaterThanOrEqual(3);
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
  });
});

describe('the clocks under the week', () => {
  it('runs the four deadlines on the right days', () => {
    const at = (id: string) => S.worldEvents.find((e) => e.id === id)!;
    expect(at('we_lease_deadline').atWorldMinute).toBe(6 * 1440 + 17 * 60);
    expect(at('we_kenta_at_the_stairs').atWorldMinute).toBeLessThan(at('we_lease_deadline').atWorldMinute);
    expect(at('we_the_reunion').atWorldMinute).toBe(7 * 1440 + 19 * 60);
    expect(at('we_keys').atWorldMinute).toBe(8 * 1440 + 10 * 60);
  });

  it('lets the player switch each pressure off by acting', () => {
    const at = (id: string) => S.worldEvents.find((e) => e.id === id)!;
    expect(at('we_kenta_at_the_stairs').cancelledByFlags).toContain('location_sharing_off');
    expect(at('we_lease_deadline').cancelledByFlags).toContain('documents_sorted');
    const sources = settable();
    for (const e of S.worldEvents) {
      for (const f of e.cancelledByFlags) expect(sources.has(f), `${e.id} cancelled by ${f}`).toBe(true);
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
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['energy']);
    const cheapest = [...S.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('energy');
  });

  it('makes public violence travel as gossip and reach the landlady first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('gossip');
    expect(S.factions[0]?.id).toBe('faction_hinode');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('gives every faction a ladder worth climbing', () => {
    for (const f of S.factions) {
      expect(f.ranks.length, f.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
  });

  it('describes every ability in a line a player can act on', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect.length, a.id).toBeLessThan(120);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toContain('costs ');
    }
  });
});

describe('the catalog checks, until it is in the catalog', () => {
  it('has more than one way through, and closes doors behind the player', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route: r }) => r.closesFlags.length > 0)).toBe(true);
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

  it('never demands the thing it is about to hand you', () => {
    for (const s of steps) {
      const granted = new Set(s.rewards.items.map((i) => i.itemId));
      for (const itemId of s.succeedWhenAny.flatMap((r) => r.predicate.hasItems)) {
        expect(granted.has(itemId), `${s.id} demands ${itemId}`).toBe(false);
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
    const broken: string[] = [];

    for (const l of S.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owned by ${t.ownerId}`);
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
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    for (const e of S.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} needs ${r.factionId}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
        }
      }
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    // Stricter than the catalog: there, reading a flag in a predicate counts
    // as declaring it. Here every flag a gate, an ending or a lock waits on
    // must be set by a route, a reward or a world event, or by the engine.
    const sources = settable();
    const ok = (f: string) => sources.has(f) || engineSets(f);
    const dead: string[] = [];
    for (const e of S.endings) for (const f of e.requires.flagsSet) if (!ok(f)) dead.push(`ending ${e.id}: ${f}`);
    for (const a of S.abilities) for (const f of a.requires?.flagsSet ?? []) if (!ok(f)) dead.push(`ability ${a.id}: ${f}`);
    for (const l of S.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !ok(c.lockedByFlag)) dead.push(`${l.id}->${c.to}: ${c.lockedByFlag}`);
    }
    for (const c of S.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!ok(f)) dead.push(`gate ${g.id}: ${f}`);
    for (const q of S.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`quest ${q.id}: ${f}`);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) for (const f of p?.flagsSet ?? []) if (!ok(f)) dead.push(`step ${st.id}: ${f}`);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) if (!ok(f)) dead.push(`route ${r.routeId}: ${f}`);
      }
    }
    for (const e of S.worldEvents) for (const f of e.requiresFlags) if (!ok(f)) dead.push(`event ${e.id}: ${f}`);
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    const dumped = S.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('gives no two takeable things the same nickname', () => {
    const seen = new Map<string, string>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.toLowerCase();
          expect(seen.get(key) ?? t.itemId, `"${alias}" means two things`).toBe(t.itemId);
          seen.set(key, t.itemId);
        }
      }
    }
  });

  it('meets the director’s content bar', () => {
    const opening = words(S.opening).length;
    expect(opening).toBeGreaterThanOrEqual(50);
    expect(opening).toBeLessThanOrEqual(150);
    const premiseWords = words(S.premise).length;
    expect(premiseWords).toBeGreaterThanOrEqual(100);
    const paragraphs = S.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(S.promises.length).toBeGreaterThanOrEqual(5);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
    expect(S.openingSuggestions).toHaveLength(3);
    expect(S.rules.startingItems.length).toBeGreaterThan(0);
    expect(S.rules.hardCanon.length).toBeGreaterThan(0);
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('passes the premise and opening clarity checks', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => i.message)).toEqual([]);
    expect(report.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
  });

  it('passes the choice clarity check for the archetype screen', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => i.message)).toEqual([]);
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed for the whole story/);
  });

  it('gives every archetype its own move the storyteller can see', () => {
    // Production's storyteller reads only the chosen archetype's starting
    // abilities, as its "Can:" line. Each gets a different one.
    const firsts = S.archetypes.map((a) => a.startingAbilities[0]);
    for (const [i, id] of firsts.entries()) expect(id, S.archetypes[i]!.id).toBeDefined();
    expect(new Set(firsts).size).toBe(S.archetypes.length);
  });

  it('keeps every archetype name out of the world the storyteller reads', () => {
    // Two archetype names in canon, premise or cast read as two people who
    // both exist. One is a coincidence; the check is for none.
    const world = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(world, a.id).not.toContain(a.name);
  });
});

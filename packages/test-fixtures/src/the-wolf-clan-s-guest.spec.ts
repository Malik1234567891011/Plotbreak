import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { THE_WOLF_CLAN_S_GUEST } from './the-wolf-clan-s-guest.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * The Wolf Clan's Guest, held to the promises on its own card: four brothers
 * who each want you under their roof for a reason that is not you, a law that
 * makes you choose one of them in the first minute, and a pass that closes on
 * the fourth day whether or not anybody has decided anything.
 *
 * The story is not in the launch catalog yet, so the catalog-wide wiring checks
 * do not run on it. The ones that have caught real bugs are repeated here, next
 * to the three checks every new story runs and the checks for the opener and
 * the ages.
 */

const S = THE_WOLF_CLAN_S_GUEST;

const start = (archetypeId = 'arch_mapmaker') =>
  createInitialState({
    sessionId: 'sess_the_wolf_clan_s_guest',
    story: S,
    identity: {
      displayName: 'Elin Marsh',
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
const steps = S.quests.flatMap((q) => q.steps);
const step = (id: string) => steps.find((s) => s.id === id)!;
const routes = S.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.map((r) => ({ quest: q.id, step: s.id, route: r }))));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. */
const AGES: Record<string, number> = { varek: 31, sil: 27, ronan: 25, tam: 21, aud: 56, dagny: 26, kell: 44 };
const IN_WORDS: Record<number, string> = {
  21: 'twenty-one',
  25: 'twenty-five',
  26: 'twenty-six',
  27: 'twenty-seven',
  31: 'thirty-one',
  44: 'forty-four',
  56: 'fifty-six',
};

/** Everything a player or the storyteller reads. */
const prose = () => [
  S.title,
  S.premise,
  S.opening,
  S.hook,
  S.fantasyLabel,
  S.creatorNote,
  S.rules.toneGuide,
  S.openingPanel?.alt ?? '',
  S.coverDirection,
  ...S.openingSuggestions,
  ...S.mechanicsChips,
  ...S.rules.hardCanon,
  ...S.rules.styleExamples,
  ...S.characters.flatMap((c) => [
    c.name,
    c.role,
    c.appearance,
    c.cardBlurb,
    c.speechStyle,
    c.socialStyle,
    c.visualHook,
    c.silhouette,
    ...c.voiceSamples,
    ...c.publicTraits,
    ...c.hiddenDrives,
    ...c.values,
    ...c.fears,
    ...c.boundaries,
    ...c.goals,
    ...c.secrets.flatMap((s) => [s.fact, s.revealHint]),
    ...c.schedule.map((b) => b.activity),
  ]),
  ...S.endings.flatMap((e) => [e.name, e.condition, e.epilogue]),
  ...S.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
  ...S.items.flatMap((i) => [i.name, i.description, i.loreText]),
  ...S.locations.flatMap((l) => [l.name, l.description, l.artDirection]),
  ...S.abilities.flatMap((a) => [a.name, a.description]),
  ...S.quests.flatMap((q) => [q.title, q.summary, ...q.steps.flatMap((s) => [s.playerCopy, s.directorNotes])]),
  ...S.factions.flatMap((f) => [f.name, f.description, ...f.ranks.map((r) => r.label)]),
  ...S.promises.flatMap((p) => [p.label, p.seedHint, p.payoffHint]),
  ...S.archetypes.flatMap((a) => [a.name, a.role, a.summary, a.blurb]),
];

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of prose()) expect(text).not.toContain('\\n');
  });
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named brother talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('"Easy. I’m Varek.');
  });

  it('ends on a demand the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/Pick who you trust\. Now\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the four brothers may appear, and Varek introduces all of them.
    const ALLOWED = new Set(['Varek', 'Ronan', 'Tam', 'Sil', 'I', 'I’m', 'I’ll']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
    for (const name of ['Greyhowe', 'Company', 'Aud', 'Kell', 'Dagny', 'Cold Ridge']) {
      expect(S.opening, name).not.toContain(name);
    }
  });

  it('introduces each brother before the player has to choose between them', () => {
    const choice = S.opening.indexOf('Pick who you trust');
    for (const name of ['Varek', 'Ronan', 'Tam', 'Sil']) {
      expect(S.opening.indexOf(name), name).toBeGreaterThan(-1);
      expect(S.opening.indexOf(name), name).toBeLessThan(choice);
    }
  });

  it('gives every name a face the player can point at', () => {
    // Four bare names are not a choice. Each one comes with something visible,
    // so the done card ("Tam’s sleeve") has somebody to reach for.
    for (const cue of [
      /grey ears flat\. "Easy\. I’m Varek\./,
      /I’m Varek\. Ronan found you\." The redhead grins\./,
      /"Tam carried you\." The tall pale one goes pink\./,
      /"Sil kept you alive\." The one by the kettle shrugs\./,
    ]) {
      expect(S.opening).toMatch(cue);
    }
  });

  it('never genders the player', () => {
    // The player is BLANK and picks their own pronouns. The opening argument is
    // about "the stranger", which is also the word the law uses.
    expect(S.protagonist.kind).toBe('BLANK');
    const argument = S.opening.split('\n\n').slice(0, 3).join(' ');
    expect(argument).toMatch(/the stranger/);
    expect(argument).not.toMatch(/\b(her|she|him|he)\b/i);
    for (const card of S.openingSuggestions) expect(card).not.toMatch(/\b(her|she|herself|himself)\b/i);
  });

  it('is the same opener the bible signs off on', () => {
    const bible = readFileSync(
      fileURLToPath(new URL('../../../docs/story-bibles/new50/45_THE_WOLF_CLAN_S_GUEST.md', import.meta.url)),
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
    expect(said).toMatch(/Varek/);
    expect(done).not.toMatch(/^"/);
    expect(done).toMatch(/Tam’s sleeve/);
    expect(risky).not.toMatch(/^"/);
    expect(risky).toMatch(/run for the tent flap/);
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

  it('brings the clan mother to the flap before the deadline the opener sets', () => {
    const obligation = S.openingObligations[0]!;
    expect(obligation.withCharacterId).toBe('aud');
    const flap = S.worldEvents.find((e) => e.id === 'we_aud_at_the_flap')!;
    expect(flap.locationId).toBe(S.rules.startingLocationId);
    expect(flap.requiresFlags).toEqual([]);
    expect(flap.movesCharacters).toEqual([{ characterId: 'aud', toLocationId: 'the_warm_tent' }]);
    expect(flap.atWorldMinute - S.rules.startWorldMinute).toBeLessThanOrEqual(obligation.dueInMinutes);
    expect(flap.atWorldMinute).toBeGreaterThan(S.rules.startWorldMinute);
  });

  it('puts the opening panel where the asset pipeline will look', () => {
    expect(S.openingPanel?.assetKey).toBe('story_the_wolf_clan_s_guest/opening');
    expect(withDerivedAssetKeys(S).coverImage).toBe('story_the_wolf_clan_s_guest/cover');
    expect(S.id).toBe('sv_the_wolf_clan_s_guest_1');
    expect(S.storyId).toBe('story_the_wolf_clan_s_guest');
  });
});

describe('the art and release pipeline', () => {
  it('puts the title in the art and every effect off their faces', () => {
    const cover = S.coverDirection;
    expect(cover).toMatch(/\bTITLE:/);
    expect(cover).toContain(`"${S.title}"`);
    expect(cover).toContain('spelled exactly THE WOLF CLAN’S GUEST');
    for (const name of ['Varek', 'Ronan', 'Tam', 'Sil']) expect(cover, name).toContain(name);
    expect(cover).toMatch(/never on their faces/i);
    expect(cover).toMatch(/entirely human faces and hands/);
  });

  it('opens on a panel of the brother who speaks to the player', () => {
    const panel = S.openingPanel!;
    expect(panel.assetKey).toBe(`${S.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    // The art script takes the character whose first name starts the alt as
    // the panel's reference portrait.
    const subject = S.characters.find((c) => panel.alt.startsWith(c.name.split(' ')[0]!));
    expect(subject?.id).toBe('varek');
    expect(S.opening).toContain('I’m Varek.');
  });

  it('opens straight on the scene and is not dated yet', () => {
    expect(S.prologue).toEqual([]);
    expect(S.publishedAt).toBeNull();
  });

  it('calls titled people by the name the world uses', () => {
    for (const c of S.characters.filter((x) => x.name.includes(' '))) {
      expect(c.calledName, c.id).toBeTruthy();
      expect(c.name, c.id).toContain(c.calledName!);
    }
  });

  it('puts the story’s system where the storyteller reads it', () => {
    // runTurnPure never reads resources, step notes, world-event timing or
    // locked abilities, so the law, the calendar and the costs are canon.
    const canon = S.rules.hardCanon.join('\n');
    expect(canon).toMatch(/the guest can call on guest-right out loud/);
    expect(canon).toMatch(/The three days run on a calendar the whole camp knows/);
    expect(canon).toMatch(/A stranger in camp is watched/);
    expect(canon).toMatch(/Playing one brother against another works, and it costs all four/);
    expect(canon).toMatch(/a fire, food and a night’s sleep bring them back/);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('borrowed_cloak');
    for (const arch of S.archetypes) {
      expect(arch.startingAbilities.length, arch.id).toBeGreaterThan(0);
      for (const id of arch.startingAbilities) expect(ability(id)?.unlockedByDefault, `${arch.id} starts ${id}`).toBe(true);
    }
    expect(new Set(S.archetypes.map((a) => a.startingAbilities.join())).size).toBe(S.archetypes.length);
    expect(S.rules.toneGuide.length).toBeGreaterThan(200);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    for (const c of S.characters) {
      const age = AGES[c.id];
      expect(age, `${c.id} has no stated age`).toBeDefined();
      expect(age!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toMatch(new RegExp(`\\b${calledName(c)}(?: is)? ${IN_WORDS[age!]}\\b`));
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    // Portraits, the opening panel and the cover are drawn from these, and an
    // image model reads "twenty-one" as younger than it is. The ages live in
    // the first line of hard canon and in the bible.
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|eldest|youngest|\d+)\b/i;
    const NUMBERS = new RegExp(`\\b(${Object.values(IN_WORDS).join('|')})\\b`, 'i');
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
      expect(c.appearance, c.id).not.toMatch(NUMBERS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
    expect(S.coverDirection).not.toMatch(NUMBERS);
    expect(S.openingPanel?.alt).not.toMatch(AGE_WORDS);
  });

  it('uses no word that reads as under eighteen, anywhere', () => {
    // Tam is the last of four brothers, never the "youngest" of anything, and
    // the wolf-kin are never cubs or pups.
    const MINOR = /\b(teen\w*|girl\w*|boy\w*|young\w*|youth\w*|kid|kids|child\w*|pup|pups|puppy|cub|cubs|minor|underage|school\w*|lad|lass)\b/i;
    const hits = prose().filter((t) => MINOR.test(t)).map((t) => `${t.match(MINOR)?.[0]}: ${t.slice(0, 60)}`);
    expect(hits).toEqual([]);
  });
});

describe('it stays thirteen-plus', () => {
  it('caps romance at a kiss, chosen, in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/at most a kiss/);
    expect(canon).toMatch(/Nobody takes what is not offered/);
    expect(canon).toMatch(/Violence has consequences rather than detail/);
    expect(S.rules.toneGuide).toMatch(/nothing past a kiss/);
    expect(S.intensity).toBe('MODERATE');
  });

  it('has nothing explicit or graphic anywhere a player or the storyteller reads', () => {
    const BANNED =
      /\b(nude|naked|sex\w*|undress\w*|lingerie|cleavage|bare (?:chest|skin)|abs|gore|gory|entrails|disembowel\w*|dismember\w*|severed|suicid\w*|self-harm|corpse\w*|bloody|bleeding|torture\w*)\b/i;
    const hits = prose().filter((t) => BANNED.test(t)).map((t) => `${t.match(BANNED)?.[0]}: ${t.slice(0, 60)}`);
    expect(hits).toEqual([]);
  });

  it('settles fights between brothers on the ground, never with blades', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/never with blades/);
    expect(canon).toMatch(/The clan does not kill guests/);
  });

  it('keeps everybody dressed: the player on waking, and Tam either side of the old shape', () => {
    // The narrator reads hard canon and nothing else in its prompt bans
    // nudity, so the two classic setups are closed here in so many words.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/The player woke fully dressed in their own travelling clothes/);
    expect(canon).toMatch(/Nobody shared the bed/);
    expect(canon).toMatch(/he is always dressed when he is himself, and the change itself is never shown or described/);
    const den = S.locations.find((l) => l.id === 'the_old_den')!;
    expect(den.description).not.toMatch(/clothes/);
    expect(step('find_the_den').directorNotes).not.toMatch(/clothes|wait outside/);
  });
});

/** The tone guide's own ban list names the words it bans; nothing else may. */
const VOCAB_GUARD = /This is a clan, not a pack\.[\s\S]*?never use those words\./;

describe('it is its own story', () => {
  it('borrows no names or pack-romance terms from other fiction or apps', () => {
    const BORROWED =
      /\b(alpha\w*|omega\w*|beta|mate|mates|mated|mating|fated|luna|lycan\w*|werewol\w*|pack bond|rejected mate|OOC|Wildbound|Inuyasha|Twilight|Narnia|Westeros|Stark|direwol\w*|skinchanger\w*|old blood|old-blood|Skyrim|Witcher|Ghibli|Mononoke)\b/i;
    const hits = prose()
      .map((t) => t.replace(VOCAB_GUARD, ''))
      .filter((t) => BORROWED.test(t))
      .map((t) => `${t.match(BORROWED)?.[0]}: ${t.slice(0, 60)}`);
    expect(hits).toEqual([]);
  });

  it('tells the narrator, in hard canon, to stay out of pack-romance vocabulary', () => {
    // Not in the tone guide: that is also the mood line of every portrait and
    // cover prompt, and an image model reads "werewolf" as a request.
    const guard = S.rules.hardCanon.join('\n').match(VOCAB_GUARD)?.[0];
    expect(guard).toBeDefined();
    for (const word of ['alpha', 'omega', 'mate', 'fated', 'werewolf', 'direwolf']) expect(guard, word).toContain(word);
    expect(S.rules.toneGuide).not.toMatch(/\b(alpha|omega|mate|fated|werewol\w*|direwol\w*|skinchanger\w*|beast\w*)\b/i);
  });

  it('is written in English, title included', () => {
    expect(S.title).toBe('The Wolf Clan’s Guest');
    const accented = prose().filter((t) => /[àâçéèêëîïôûùüÿœæñäöß]/i.test(t)).map((t) => t.slice(0, 60));
    expect(accented).toEqual([]);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    const gated = S.abilities.filter((x) => !x.unlockedByDefault);
    expect(gated.map((a) => a.id).sort()).toEqual(['follow_the_white_tracks', 'invoke_guest_right']);
    for (const a of gated) expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
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

describe('the first answer is the player’s, every way', () => {
  const claim = step('name_a_host');

  it('lets the player name any of the four brothers', () => {
    const ids = claim.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(expect.arrayContaining(['host_varek', 'host_sil', 'host_ronan', 'host_tam']));
  });

  it('turns refusing, running and fighting into routes rather than dead ends', () => {
    const want: Record<string, string> = {
      spoke_for_yourself: 'used:stand_your_ground',
      ran_for_it: 'used:slip_away',
      fought_your_way: 'used:fight',
    };
    for (const [id, flag] of Object.entries(want)) {
      const r = claim.succeedWhenAny.find((x) => x.routeId === id)!;
      expect(r, id).toBeDefined();
      expect(r.predicate.flagsSet, id).toEqual([flag]);
    }
  });

  it('lands every answer with exactly one host, and shuts the other four', () => {
    const HOSTS = ['host:varek', 'host:sil', 'host:ronan', 'host:tam', 'host:aud'];
    for (const r of claim.succeedWhenAny) {
      expect(r.setsFlags, r.routeId).toContain('has_a_host');
      const mine = r.setsFlags.filter((f) => HOSTS.includes(f));
      expect(mine, r.routeId).toHaveLength(1);
      expect([...r.closesFlags].sort(), r.routeId).toEqual(HOSTS.filter((h) => h !== mine[0]).sort());
    }
  });

  it('unlocks guest-right the moment somebody answers for the player', () => {
    const guest = ability('invoke_guest_right');
    expect(guest.requires.flagsSet).toEqual(['has_a_host']);
    expect(claim.rewards.abilities).toContain('invoke_guest_right');
    expect(guest.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(guest.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('makes the first night survivable by working, talking, lying, flirting or watching', () => {
    const night = step('the_first_night');
    const used = night.succeedWhenAny.flatMap((r) => r.predicate.flagsSet);
    expect(used).toEqual(
      expect.arrayContaining(['used:earn_your_keep', 'used:speak_plainly', 'used:bluff', 'used:let_him_close', 'used:read_them']),
    );
  });
});

describe('the price is said out loud, and can go either way', () => {
  const fire = step('the_midwinter_fire');

  it('lets nobody speaking up be the honest result, not a mistake', () => {
    const traded = fire.succeedWhenAny.find((r) => r.routeId === 'were_traded')!;
    expect(traded.predicate.minRelationship).toEqual([]);
    expect(traded.predicate.hasItems).toEqual([]);
    expect(traded.predicate.minFactionReputation).toEqual([]);
    expect(traded.setsFlags).toContain('traded_to_the_company');
  });

  it('keeps the player three different ways: a host, their own work, or the truth about the road', () => {
    const kept = fire.succeedWhenAny.filter((r) => r.setsFlags.includes('kept_by_the_clan')).map((r) => r.routeId);
    expect(kept.sort()).toEqual(['earned_it', 'exposed_the_road', 'host_stood_up']);
  });

  it('closes the pass on the fourth day, and only lets the south routes through before it', () => {
    const closes = S.worldEvents.find((e) => e.id === 'we_the_pass_closes')!;
    expect(closes.atWorldMinute).toBe(3 * 1440 + 16 * 60);
    expect(closes.requiresFlags).toEqual([]);
    const south = routes.filter(({ route }) => route.setsFlags.includes('went_south') && route.predicate.atLocation);
    expect(south.length).toBeGreaterThanOrEqual(2);
    for (const { route } of south) {
      expect(route.predicate.atLocation, route.routeId).toBe('the_boundary_stones');
      expect(route.predicate.beforeWorldMinute, route.routeId).not.toBeNull();
      expect(route.predicate.beforeWorldMinute!, route.routeId).toBeLessThanOrEqual(closes.atWorldMinute);
    }
    const snowed = routes.find(({ route }) => route.routeId === 'snowed_in')!.route;
    expect(snowed.predicate.flagsSet).toEqual(['pass_shut']);
  });
});

describe('four brothers, and nobody is a prize', () => {
  it('starts with all four brothers in the tent and their mother outside it', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['ronan', 'sil', 'tam', 'varek']);
  });

  it('never lets the eldest claim the rescue, anywhere the narrator reads', () => {
    // The lantern payoff depends on Varek being the one brother who claims
    // nothing. Production reads the hook, the premise and every quest summary.
    expect(S.rules.hardCanon.join(' ')).toMatch(/Varek claims no part in it/);
    expect(S.premise).toMatch(/The eldest claims no part in it/);
    expect(S.hook).toMatch(/The eldest claims nothing/);
    const CLAIM_ALL = /\b(four brothers each|each of them says he found|four (?:brothers|men) arguing over who found)\b/i;
    for (const text of [S.hook, S.premise, ...S.quests.map((q) => q.summary), ...S.promises.map((p) => p.seedHint)]) {
      expect(text).not.toMatch(CLAIM_ALL);
    }
  });

  it('gives the narrator the custom that lands a runner or a refuser with a host', () => {
    // Quest steps and their director notes never reach the production
    // narrator, so the payoff for the risky opening card lives in hard canon.
    const guestRight = S.rules.hardCanon.find((c) => c.startsWith('Guest-right'))!;
    expect(guestRight).toMatch(/a stranger who runs belongs to whoever catches them/);
    expect(guestRight).toMatch(/becomes the clan mother’s own guest/);
  });

  it('lets the player choose any brother, or none, or break them', () => {
    const hearth = step('the_hearth_choice').succeedWhenAny.map((r) => r.routeId);
    expect(hearth.sort()).toEqual(['chose_nobody', 'chose_ronan', 'chose_sil', 'chose_tam', 'chose_varek', 'set_them_at_each_other']);
  });

  it('gives every brother an ending of his own, and nobody an ending too', () => {
    for (const id of ['varek', 'sil', 'ronan', 'tam']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(`heart:${id}`)), id).toBe(true);
    }
    const guest = S.endings.find((e) => e.id === 'end_guest_until_spring')!;
    expect(guest.rarity).toBe('COMMON');
    expect(guest.requires.flagsUnset).toEqual(expect.arrayContaining(['heart:varek', 'heart:sil', 'heart:ronan', 'heart:tam']));
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of S.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
    for (const id of ['varek', 'sil', 'ronan', 'tam']) {
      expect(character(id).voiceSamples.length, id).toBeGreaterThanOrEqual(4);
      expect(character(id).secrets.length, id).toBeGreaterThanOrEqual(2);
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

  it('keeps each brother’s verbal tic his own', () => {
    const tic = (id: string, pattern: RegExp) =>
      S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
    expect(tic('varek', /^Listen\./)).toEqual(['varek']);
    expect(tic('ronan', /^Ha!/)).toEqual(['ronan']);
    expect(tic('sil', /^Hm\./)).toEqual(['sil']);
    expect(tic('dagny', /^Let me save us both some time/)).toEqual(['dagny']);
    expect(tic('kell', /^Regrettably/)).toEqual(['kell']);
  });

  it('gives no two people the same short name, and only faces that exist', () => {
    const called = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size).toBe(called.length);
    expect(calledName(character('aud'))).toBe('Aud');
    expect(calledName(character('kell'))).toBe('Kell');
    expect(calledName(character('dagny'))).toBe('Dagny');
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });
});

describe('the white wolf is optional and behaves like it', () => {
  it('hides the whole lead behind a flag only a curious player sets', () => {
    const lead = S.quests.find((q) => q.id === 'q_the_white_wolf')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_white_wolf']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_white_wolf'));
    expect(sources.length, 'nothing opens the lead').toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('keeps the tracking ability locked, in the world’s own words', () => {
    const tracks = ability('follow_the_white_tracks');
    expect(tracks.unlockedByDefault).toBe(false);
    expect(tracks.requires.flagsSet).toEqual(['knows:the_white_wolf']);
    expect(tracks.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(tracks.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('keeps the den shut until the player has found it', () => {
    const den = S.locations.find((l) => l.id === 'the_old_den')!;
    expect(den.discoveredByDefault).toBe(false);
    const ways = S.locations.flatMap((l) => l.connections.filter((c) => c.to === 'the_old_den'));
    expect(ways.length).toBeGreaterThan(0);
    for (const w of ways) expect(w.lockedByFlag).toBe('found_the_old_den');
  });

  it('never says what Tam is on the card, the premise or the opener', () => {
    for (const text of [S.hook, S.premise, S.opening, S.fantasyLabel, ...S.openingSuggestions]) {
      expect(text).not.toMatch(/white wolf|old shape/i);
    }
  });

  it('leaves most of the ending space reachable without it', () => {
    const wolf = new Set(['kept_tams_secret', 'wolf_answered', 'sold_the_wolf', 'den_found', 'found_the_old_den', 'knows:the_white_wolf']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => wolf.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(9);
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
    for (const i of S.items) if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push(`startingLocationId ${S.rules.startingLocationId}`);
    for (const o of S.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
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

  const declared = () => {
    const set = new Set<string>();
    for (const st of steps) {
      for (const f of st.rewards.flags) set.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) set.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) set.add(f);
    return set;
  };
  const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
  const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

  it('never gates something behind a flag nothing can set', () => {
    const set = declared();
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

    const dead = needed.filter(([, f]) => !set.has(f) && !engineSets(f)).map(([where, f]) => `${where} needs ${f}`);
    expect(dead).toEqual([]);
  });

  it('cancels and closes only on flags something can set', () => {
    const set = declared();
    const dead: string[] = [];
    for (const e of S.worldEvents) for (const f of e.cancelledByFlags) if (!set.has(f) && !engineSets(f)) dead.push(`${e.id} cancels on ${f}`);
    for (const { route } of routes) for (const f of route.closesFlags) if (!set.has(f)) dead.push(`${route.routeId} closes ${f}`);
    for (const e of S.endings) for (const f of e.requires.flagsUnset) if (!set.has(f) && !engineSets(f)) dead.push(`${e.id} unset ${f}`);
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
    for (const { quest, step: st, route } of routes) {
      const where = `${quest}/${st}/${route.routeId}`;
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

  it('gives every background something of its own to carry', () => {
    for (const a of S.archetypes) {
      const grants = a.startingItems.length + a.startingAbilities.length + a.startingReputation.length;
      expect(grants, a.id).toBeGreaterThan(0);
    }
    expect(new Set(S.archetypes.map((a) => a.startingItems[0]?.itemId)).size).toBe(S.archetypes.length);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('covers every minute of every day for everybody', () => {
    for (const c of S.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, `${c.id} gap`).toBe(blocks[i - 1]!.endMinute);
    }
  });

  it('branches, and some branches shut doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
    expect(new Set(routes.map(({ route }) => route.routeId)).size).toBe(routes.length);
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

  it('gives no two takeable items a name the parser could confuse', () => {
    const seen = new Map<string, string>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const aka of t.aka) {
          const key = aka.toLowerCase();
          expect(seen.get(key) ?? t.itemId, `${aka} names two things`).toBe(t.itemId);
          seen.set(key, t.itemId);
        }
      }
    }
  });
});

describe('it can end badly, early and in many ways', () => {
  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.id).toBe('end_back_into_the_snow');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('cancels the clan’s big night for a player who has already walked out', () => {
    for (const id of ['we_the_midwinter_fire', 'we_ronan_stands']) {
      expect(S.worldEvents.find((e) => e.id === id)!.cancelledByFlags, id).toContain('left_the_map');
    }
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_returned_with_interest', 'end_the_price_of_a_pelt', 'end_four_tents', 'end_back_into_the_snow']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('fits every ending into what the storyteller reads', () => {
    // It reads only the first twelve.
    expect(S.endings.length).toBeLessThanOrEqual(12);
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.condition, e.id).toMatch(/\bplayer\b/);
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

  it('lets rest restore warmth and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource. A nap must not refill the
    // camp's trust or the brothers' patience.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['warmth']);
  });

  it('makes a fight in camp cost the camp’s trust and the clan before anything else', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(S.factions[0]?.id).toBe('faction_greyhowe');
    expect(ability('fight').costs.map((c) => c.resourceId)).toContain('suspicion');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(S.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), `${r.id} never moves`).toBe(true);
      expect(r.regenPerHour, r.id).toBeLessThan(0);
    }
  });

  it('makes leaning on one brother and playing them off both cost the family', () => {
    expect(ability('let_him_close').costs).toEqual([{ resourceId: 'friction', amount: 6 }]);
    expect(ability('play_them_off').costs[0]!.amount).toBeGreaterThan(ability('let_him_close').costs[0]!.amount);
  });
});

describe('a new reader can follow it', () => {
  it('has a premise long enough to set the scene and short enough to read', () => {
    const n = words(S.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(250);
    const paragraphs = S.premise.split('\n\n');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
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

  it('tells the player the archetype is permanent', () => {
    const field = S.setupFields.find((f) => f.id === 'archetype')!;
    expect(field.helpText).toMatch(/keep it for the whole story/);
  });
});

import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THE_ONLY_GIRL_AT_BLACKTHORN } from './the-only-girl-at-blackthorn.js';

/**
 * The Only Girl at Blackthorn, held to the promise on its own card: ranked
 * first, and nobody voted you in.
 *
 * The failure this world is most exposed to is the vote going soft. The whole
 * story is three yes votes out of four on the seventh morning, so every vote
 * has to be winnable more than one way, losable at least one way, and the
 * count has to be the only thing that decides the Taking. If a roommate's yes
 * can be had for free, or never had at all, the week stops meaning anything.
 *
 * It is also a one-woman-and-four-men academy story, and the checks for that
 * are blunt on purpose: everybody is an adult on the page, nobody is described
 * by their body, the partition is never a joke, and each of the four can say no.
 */

const S = THE_ONLY_GIRL_AT_BLACKTHORN;

const start = (archetypeId = 'arch_old_knight') =>
  createInitialState({
    sessionId: 'sess_only_girl_at_blackthorn',
    story: S,
    identity: {
      displayName: 'Talia Brennan',
      pronouns: 'she/her',
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
  q.steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ quest: q.id, step: s.id, route }))),
);
const route = (id: string) => routes.find(({ route: r }) => r.routeId === id)!.route;
const words = (text: string) => text.split(/\s+/).filter(Boolean);
/** The title, and the cover's two-line lettering of it, struck out. */
const withoutTitle = (text: string) => text.replace(/the only girl at( blackthorn)?/gi, '');

/** Ages as the bible states them. The player is nineteen. */
const AGES: Record<string, number> = {
  rowan: 20,
  aren: 20,
  gideon: 22,
  felix: 20,
  dunmore: 50,
  orme: 54,
  greaves: 61,
  marr: 23,
};

const ROOMMATES = ['rowan', 'aren', 'gideon', 'felix'] as const;
const VOTE = (id: string) => `vote:${id}_yes`;

/** The engine's own flag vocabulary, from `recordObservations` and the director. */
const ENGINE_PREFIXES = [
  'met:',
  'spoke:',
  'attacked:',
  'engaged:',
  'visited:',
  'used:',
  'inspected:',
  'cooldown:',
  'route:',
  'closed:',
  'played:',
  'beat:',
  'lost_to:',
];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string) => ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

/** Every flag the story itself writes: step rewards, routes and the timetable. */
const authoredFlags = new Set<string>([
  ...steps.flatMap((s) => s.rewards.flags),
  ...routes.flatMap(({ route: r }) => r.setsFlags),
  ...S.worldEvents.flatMap((e) => e.setsFlags),
]);
const producible = (flag: string) => authoredFlags.has(flag) || engineSets(flag);

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

  it('meets the content bar every launch world meets', () => {
    expect(S.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    const paragraphs = S.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length).toBeLessThanOrEqual(70);
    expect(S.promises.length).toBeGreaterThanOrEqual(3);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
    expect(S.rules.hardCanon.length).toBeGreaterThan(0);
  });
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named roommate speak inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('"Wrong room,"');
    expect(head).toContain('Rowan');
  });

  it('ends on a direct question the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"So where are you sleeping tonight\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. The
    // three roommates introduce themselves on the page; nothing else is named.
    const ALLOWED = new Set(['Rowan', 'Aren', 'Gideon', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
    // And the academy, the Provost, the Taking and the Charter stay out of it.
    expect(S.opening).not.toMatch(/Blackthorn|Provost|Taking|Charter|Orme|Felix/);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one is the provocation: Rowan's own bed.
    expect(risky).toMatch(/Rowan’s bed/);
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
    expect(violent, `these cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
  });

  it('starts in the Rook with exactly the four roommates in it', () => {
    expect(S.rules.startingLocationId).toBe('the_rook');
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect([...present].sort()).toEqual([...ROOMMATES].sort());
  });
});

describe('the vote is the game, and it is honest', () => {
  const taking = quest('q_the_taking').steps[0]!;

  it('takes the player only with three or four votes, or by the Charter', () => {
    for (const r of taking.succeedWhenAny) {
      if (!r.setsFlags.includes('taken')) continue;
      const votes = r.predicate.flagsSet.filter((f) => f.startsWith('vote:'));
      if (r.routeId === 'struck_down_the_taking') {
        expect(r.predicate.flagsSet).toContain('used:invoke_the_charter');
        expect(r.predicate.atLocation).toBe('the_chapel');
        continue;
      }
      expect(votes.length, r.routeId).toBeGreaterThanOrEqual(3);
      expect(r.predicate.flagsSet, r.routeId).toContain('taking_day');
    }
    // Every three-of-four combination is there.
    const combos = taking.succeedWhenAny
      .map((r) => r.predicate.flagsSet.filter((f) => f.startsWith('vote:')).sort().join('+'))
      .filter((c) => c.split('+').length === 3);
    expect(new Set(combos).size).toBe(4);
  });

  it('lets the seventh morning arrive with nobody taking you, and asks nothing for it', () => {
    // The honest failure, reachable by a player who did nothing wrong.
    const notTaken = route('not_taken');
    expect(notTaken.predicate.flagsSet).toEqual(['taking_day']);
    expect(notTaken.predicate.minRelationship).toEqual([]);
    expect(notTaken.predicate.hasItems).toEqual([]);
    expect(notTaken.setsFlags).toContain('lanceless');
    // And the routes that take you come first, so a yes is never shadowed.
    const ids = taking.succeedWhenAny.map((r) => r.routeId);
    expect(ids[ids.length - 1]).toBe('not_taken');
  });

  it('lets every roommate be won more than one way, and lost at least one', () => {
    for (const id of ROOMMATES) {
      const wins = routes.filter(({ route: r }) => r.setsFlags.includes(VOTE(id)));
      const losses = routes.filter(({ route: r }) => r.closesFlags.includes(VOTE(id)));
      expect(wins.length, `${id} has too few ways to yes`).toBeGreaterThanOrEqual(2);
      expect(losses.length, `${id} cannot be lost`).toBeGreaterThanOrEqual(1);
    }
  });

  it('holds the Taking in the chapel on the seventh morning, with the four in the room', () => {
    const event = S.worldEvents.find((e) => e.id === 'we_the_taking')!;
    expect(event.setsFlags).toEqual(['taking_day']);
    expect(event.locationId).toBe('the_chapel');
    expect(Math.floor(event.atWorldMinute / 1440)).toBe(7);
    const moved = event.movesCharacters.map((m) => m.characterId);
    for (const id of ROOMMATES) expect(moved).toContain(id);
  });

  it('punishes a thrown bout, because Rowan would', () => {
    const thrown = route('threw_the_bout');
    expect(thrown.closesFlags).toContain(VOTE('rowan'));
    expect(thrown.setsFlags).not.toContain(VOTE('rowan'));
  });

  it('lets the player protect Gideon by costing herself his vote', () => {
    const spared = route('told_him_to_vote_no');
    expect(spared.closesFlags).toContain(VOTE('gideon'));
    const ending = S.endings.find((e) => e.id === 'end_the_other_end')!;
    expect(ending.requires.flagsUnset).toContain('gideon_spared');
  });
});

describe('the secrets are earned, not announced', () => {
  it('hides Cadet Seventeen behind a lead only a curious player opens', () => {
    const lead = quest('q_cadet_seventeen');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_gap_in_the_rolls']);
    // Nothing everybody gets opens it.
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:the_gap_in_the_rolls'));
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('keeps the two locked abilities locked, in the world’s own words', () => {
    for (const id of ['invoke_the_charter', 'seventeens_guard']) {
      const a = ability(id);
      expect(a.unlockedByDefault, id).toBe(false);
      expect(a.requires.lockedCopy.length, id).toBeGreaterThan(30);
      expect(a.requires.lockedCopy, id).not.toMatch(/flag|predicate|locked/i);
    }
    expect(ability('invoke_the_charter').requires.flagsSet).toEqual(['knows:the_charter_by_heart']);
    expect(ability('seventeens_guard').requires.flagsSet).toEqual(['knows:seventeens_guard']);
  });

  it('teaches the Charter through Felix, so the fifth way out is earned', () => {
    const granting = steps.filter((s) => s.rewards.abilities.includes('invoke_the_charter'));
    expect(granting.map((s) => s.id)).toEqual(['give_him_evidence']);
    expect(granting[0]!.rewards.flags).toContain('knows:the_charter_by_heart');
  });

  it('keeps most of the ending space reachable without the mystery', () => {
    const mystery = new Set(['seventeen_restored', 'knows:cadet_seventeen', 'seventeen_answered']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(10);
  });

  it('keeps every secret off the public cast card, and its reveal rule where the storyteller reads it', () => {
    const blurb = (id: string) => S.characters.find((c) => c.id === id)!.cardBlurb;
    expect(blurb('marr')).not.toMatch(/\bbed\b|porters/i);
    expect(blurb('gideon')).not.toMatch(/purse|Marshal|lord|paying/i);
    // `revealHint` is never sent, so each rule is a boundary too.
    const guards: Array<[string, RegExp]> = [
      ['gideon', /Marshal’s purse/],
      ['aren', /what the letter said/],
      ['orme', /his own Taking/],
      ['greaves', /the page he kept/],
      ['felix', /gap in the rolls/],
    ];
    for (const [id, rule] of guards) {
      const c = S.characters.find((x) => x.id === id)!;
      expect(c.boundaries.some((b) => rule.test(b)), id).toBe(true);
    }
  });

  it('lets the burned letter be learned three ways, and lets each one cost something different', () => {
    const step = quest('q_the_burned_letter').steps[0]!;
    expect(step.succeedWhenAny.map((r) => r.routeId).sort()).toEqual(['greaves_told_you', 'he_told_you', 'read_the_ashes']);
    for (const r of step.succeedWhenAny) expect(r.setsFlags).toContain('knows:the_queens_order');
    const letter = S.locations.find((l) => l.id === 'the_rook')!.takeableItems.find((t) => t.itemId === 'burned_letter')!;
    expect(letter.ownerId).toBe('aren');
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is nineteen');
    expect(canon).toMatch(/nobody under eighteen/);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
    // The two offstage names the storyteller can bring on, and everybody else.
    expect(canon).toContain('Queen Merewen is fifty-two');
    expect(canon).toContain('Lord Marshal Hargrave is fifty-eight');
    expect(canon).toMatch(/Everyone else who appears in a scene.*is an adult/);
  });

  it('makes her a woman whatever pronouns the last run carried over', () => {
    // Play reuses the last story's pronouns, and the storyteller reads them
    // every turn. The premise has to win.
    expect(S.rules.hardCanon.some((f) => /player character is a woman.*she and her/.test(f))).toBe(true);
    const pronouns = S.setupFields.find((f) => f.id === 'pronouns')!;
    expect(pronouns.helpText).toMatch(/calls you she/);
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      // Portraits are drawn from this line, and a cadet in an academy reads
      // younger to an image model unless it is told otherwise.
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(withoutTitle(S.coverDirection)).not.toMatch(AGE_WORDS);
  });

  it('never uses a childlike word anywhere in the world but its title', () => {
    // The title is the genre's own phrase for the first woman through the
    // gate, and the world it names says she is nineteen in its first line of
    // canon. The cover letters it, so it is struck wherever it is the title;
    // everything else is held to the full list.
    const CHILDLIKE = /\b(teen\w*|girls?|boys?|kids?|child\w*|schoolgirl\w*|schoolboy\w*|minors?|underage|loli\w*)\b/i;
    const text = withoutTitle(JSON.stringify({ ...S, title: '' }));
    expect(text.match(CHILDLIKE)?.[0] ?? null).toBeNull();
  });
});

describe('the cover', () => {
  it('letters the title into the art, spelled exactly, on its own line', () => {
    const cover = S.coverDirection;
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(cover).toMatch(/\bTITLE:/);
    expect(title).toContain('Spelled exactly The Only Girl at Blackthorn');
    expect(title).toMatch(/upper third/);
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('draws the four from the doorway, so the title never sits beside a drawn face of hers', () => {
    const cover = S.coverDirection;
    expect(cover).toContain('Rowan');
    expect(cover).toMatch(/seen from the doorway as if the viewer has just walked in/);
    expect(cover).toMatch(/Nobody else is in the picture/);
    expect(cover).not.toMatch(/\b(she|her|woman|lady)\b/i);
  });

  it('keeps every effect on the steel and the title, never on a face', () => {
    expect(S.coverDirection).toMatch(/never on a face/);
    expect(S.coverDirection).toMatch(/FACES STAY CLEAN/);
  });

  it('feeds the cover and every portrait a tone guide with no body words in it', () => {
    // `toneGuide` is the cover's mood line and the world line of every
    // portrait prompt, and an image model reads a forbidden noun as a request.
    const BODY = /\b(bod(y|ies)|undress\w*|bath\w*|naked|nude|figure-hugging|changing room)\b/i;
    expect(S.rules.toneGuide.match(BODY)?.[0] ?? null).toBeNull();
  });
});

describe('thirteen-plus, and nothing is fan service', () => {
  it('keeps bodies, sex and gore out of everything the storyteller is handed as material', () => {
    // The tone guide names what is forbidden, so it is the one field allowed
    // to say the words.
    const material = JSON.stringify({ ...S, rules: { ...S.rules, toneGuide: '' } });
    const BANNED =
      /\b(nude|naked|nudity|cleavage|lingerie|breasts?|thighs?|undress\w*|sexy|sexual\w*|bedroom|bath\w*|gore|gory|blood\w*|suicid\w*|self-harm)\b/i;
    expect(material.match(BANNED)?.[0] ?? null).toBeNull();
  });

  it('never puts two people in one bed, and says what happens instead', () => {
    // The turn-1 risky card is Rowan's bed, and step notes never reach the
    // storyteller, so the guard lives where it reads: tone guide and boundaries.
    expect(S.rules.toneGuide).toMatch(/Nobody shares a bed, ever/);
    const rowan = S.characters.find((c) => c.id === 'rowan')!;
    expect(rowan.boundaries.some((b) => /share it.*sleeps on the floor/.test(b))).toBe(true);
  });

  it('stops every romance at a kiss and says so', () => {
    expect(S.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(S.rules.toneGuide).toMatch(/fan service/);
    expect(S.rules.toneGuide).toMatch(/partition is about dignity/);
  });

  it('lets each of the four roommates refuse, and gives each a romance of his own', () => {
    for (const id of ROOMMATES) {
      const c = S.characters.find((x) => x.id === id)!;
      expect(c.boundaries.length, id).toBeGreaterThanOrEqual(2);
      expect(c.gates.find((g) => g.kind === 'ROMANCE'), `${id} has no romance gate`).toBeDefined();
    }
    const romanceEndings = S.endings.filter((e) => e.requires.minRelationship.some((r) => r.dimension === 'affection'));
    expect(new Set(romanceEndings.flatMap((e) => e.requires.minRelationship.map((r) => r.characterId)))).toEqual(
      new Set(ROOMMATES),
    );
  });
});

describe('it is its own story', () => {
  it('borrows no franchise name and no competitor tagline', () => {
    const text = JSON.stringify(S);
    const BORROWED =
      /\b(Hogwarts|Tortall|Alanna|Keladry|Protector of the Small|Mulan|Fire Emblem|Garreg Mach|Code Geass|Ouran|Mahouka|Danmachi|Solo Leveling|Classroom of the Elite|Chivalry of a Failed Knight|Rakudai|Akademeia|Lumencia)\b/i;
    expect(text.match(BORROWED)?.[0] ?? null).toBeNull();
  });

  it('is written in English', () => {
    expect(S.premise).toMatch(/\bthe\b/);
    expect(JSON.stringify(S)).not.toMatch(/[àâçéèêëîïôûùüÿœ]/i);
  });
});

describe('art is not commissioned yet, and says so consistently', () => {
  it('declares no generated art, all or nothing', () => {
    expect(S.coverImage).toBeNull();
    expect(S.keyArt).toBeNull();
    for (const l of S.locations) expect(l.stageImage, l.id).toBeNull();
    for (const c of S.characters) expect(c.portrait, c.id).toBeNull();
  });

  it('declares the opening panel under the story’s own asset prefix', () => {
    expect(S.storyId).toBe('story_the_only_girl_at_blackthorn');
    expect(S.openingPanel?.assetKey).toBe('story_the_only_girl_at_blackthorn/opening');
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
    // The panel is drawn with the first-named character's portrait as its
    // reference, and Rowan is the one who speaks in the opener.
    expect(S.openingPanel!.alt).toMatch(/^Rowan /);
  });

  it('opens straight on the scene and is not dated until release', () => {
    expect((S as { prologue?: unknown[] }).prologue ?? []).toEqual([]);
    expect(S.publishedAt).toBeNull();
  });
});

describe('the system lives where the storyteller reads it', () => {
  it('gives every background the sword, and something of its own', () => {
    // Production's storyteller sees abilities only as the chosen background's
    // starting abilities, so a background that lists none tells it nothing.
    for (const a of S.archetypes) {
      expect(a.startingAbilities, a.id).toContain('cross_blades');
      expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(2);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id}: ${id}`).toBe(true);
    }
    const sets = S.archetypes.map((a) => [...a.startingAbilities].sort().join('|'));
    expect(new Set(sets).size).toBe(sets.length);
  });

  it('puts the two learned abilities in hard canon, since locked abilities are never sent', () => {
    const canon = S.rules.hardCanon.join('\n');
    expect(canon).toMatch(/learned, never issued, and the player starts with neither/);
    expect(canon).toContain('Seventeen’s Guard');
    expect(canon).toMatch(/quote article and line to a master’s face/);
  });

  it('starts her holding the tabard, which the storyteller reads as an object the story turns on', () => {
    expect(S.rules.startingItems).toEqual([{ itemId: 'trial_tabard', qty: 1 }]);
    expect(S.items.find((i) => i.id === 'trial_tabard')!.questItem).toBe(true);
  });

  it('calls the titled cast by name', () => {
    const called = (id: string) => S.characters.find((c) => c.id === id)!.calledName;
    expect(called('aren')).toBe('Aren');
    expect(called('orme')).toBe('Orme');
    expect(called('greaves')).toBe('Greaves');
  });
});

describe('nobody is only there to react', () => {
  it('keeps the masters and Marr out of the Rook when the story starts', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    for (const id of ['dunmore', 'orme', 'greaves', 'marr']) expect(present).not.toContain(id);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((S.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = S.characters.filter(
      (c) => !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('gives everybody a whole day to be somewhere', () => {
    for (const c of S.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks[blocks.length - 1]!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
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
      ['numbered points', /\b(?:One|Two|Three),/],
      ['doesn’t care', /\bdoesn’t care\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('uses expressions the generator draws', async () => {
    const { knownExpression } = await import('@plotbreak/contracts');
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', async () => {
    const { calledName } = await import('@plotbreak/contracts');
    const names = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
    // Titles are not names: nobody is called "Prince", "Sir" or "Lord".
    for (const n of names) expect(n).not.toMatch(/^(prince|sir|lord|provost)\b/);
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
      expect(c.cardBlurb.toLowerCase(), c.id).not.toBe(c.role.toLowerCase());
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

/**
 * The catalog's structural checks, run here because this story is not in the
 * launch catalog yet and so nothing else holds it to them.
 */
describe('the catalog’s structural checks, for this story alone', () => {
  it('has more than one way through, and some routes close doors', () => {
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
    const broken: string[] = [];
    for (const { quest: q, step, route: r } of routes) {
      for (const flag of r.predicate.flagsSet) {
        if (flag.startsWith('used:') && !grantable.has(flag.slice(5))) broken.push(`${q}/${step}/${r.routeId}: ${flag}`);
      }
      for (const item of r.predicate.hasItems) {
        if (!obtainable.has(item)) broken.push(`${q}/${step}/${r.routeId}: ${item}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('never demands the thing it is about to hand you', () => {
    for (const step of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const r of step.succeedWhenAny) {
        for (const item of r.predicate.hasItems) expect(granted.has(item), `${step.id}: ${item}`).toBe(false);
      }
    }
  });

  it('gives every background something to start with', () => {
    for (const a of S.archetypes) {
      const gives =
        a.startingItems.length + a.startingAbilities.length + a.startingReputation.length + Object.keys(a.skillProficiencies).length;
      expect(gives, a.id).toBeGreaterThan(0);
    }
  });

  it('points only at things that exist', () => {
    const loc = new Set(S.locations.map((l) => l.id));
    const item = new Set(S.items.map((i) => i.id));
    const char = new Set(S.characters.map((c) => c.id));
    const ab = new Set(S.abilities.map((a) => a.id));
    const fac = new Set(S.factions.map((f) => f.id));
    const res = new Set(S.resources.map((r) => r.id));
    const skill = new Set(S.skills.map((s) => s.id));
    const broken: string[] = [];
    for (const l of S.locations) {
      for (const c of l.connections) if (!loc.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!item.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !char.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !loc.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!loc.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!res.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skill.has(a.check.skillId)) broken.push(`${a.id} skill ${a.check.skillId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!item.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const x of a.startingAbilities) if (!ab.has(x)) broken.push(`${a.id} ability ${x}`);
      for (const r of a.startingReputation) if (!fac.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skill.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!fac.has(x)) broken.push(`${f.id} ${x}`);
    for (const i of S.rules.startingItems) if (!item.has(i.itemId)) broken.push(`start ${i.itemId}`);
    if (!loc.has(S.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of S.worldEvents) {
      if (e.locationId && !loc.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!char.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!loc.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const e of S.endings) {
      for (const r of e.requires.minRelationship) if (!char.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!item.has(i)) broken.push(`${e.id} ${i}`);
    }
    for (const q of S.quests) {
      for (const id of q.involvedCharacterIds) if (!char.has(id)) broken.push(`${q.id} ${id}`);
      for (const id of q.involvedLocationIds) if (!loc.has(id)) broken.push(`${q.id} ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!item.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const r of st.rewards.abilities) if (!ab.has(r)) broken.push(`${st.id} grants ${r}`);
        for (const r of st.rewards.reputation) if (!fac.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        for (const pred of [st.enterWhen, st.succeedWhen, ...st.succeedWhenAny.map((r) => r.predicate)]) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!item.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !loc.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!char.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!fac.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('never gates anything on a flag nothing can set', () => {
    // Stricter than the catalog's version: every flag has to be written by a
    // route, a reward, the timetable or the engine.
    const dead: string[] = [];
    const check = (flags: readonly string[], where: string) => {
      for (const f of flags) if (!producible(f)) dead.push(`${f} (${where})`);
    };
    for (const q of S.quests) {
      if (q.discoverWhen) check(q.discoverWhen.flagsSet, `${q.id}.discoverWhen`);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(p.flagsSet, `${q.id}/${st.id}`);
        for (const r of st.succeedWhenAny) check(r.predicate.flagsSet, `${q.id}/${st.id}/${r.routeId}`);
      }
    }
    for (const c of S.characters) for (const g of c.gates) check(g.requires.flagsSet, `${c.id}/${g.id}`);
    for (const e of S.worldEvents) check([...e.requiresFlags, ...e.cancelledByFlags], e.id);
    for (const e of S.endings) check([...e.requires.flagsSet, ...e.requires.flagsUnset], e.id);
    for (const a of S.abilities) check(a.requires.flagsSet, a.id);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) check([c.lockedByFlag], `${l.id}->${c.to}`);
    expect(dead).toEqual([]);
  });

  it('never gates on standing nothing can earn', () => {
    const ceiling = new Map(S.factions.map((f) => [f.id, f.startingReputation]));
    for (const a of S.archetypes) {
      for (const r of a.startingReputation) {
        const floor = S.factions.find((f) => f.id === r.factionId)!.startingReputation;
        ceiling.set(r.factionId, Math.max(ceiling.get(r.factionId)!, floor + r.amount));
      }
    }
    for (const st of steps) {
      for (const g of st.rewards.reputation) ceiling.set(g.factionId, ceiling.get(g.factionId)! + Math.max(0, g.amount));
    }
    for (const st of steps) {
      for (const p of [st.enterWhen, st.succeedWhen, ...st.succeedWhenAny.map((r) => r.predicate)]) {
        if (!p) continue;
        for (const g of p.minFactionReputation) {
          expect(ceiling.get(g.factionId)!, `${st.id} needs ${g.factionId} ${g.value}`).toBeGreaterThanOrEqual(g.value);
        }
      }
    }
  });

  it('can be walked to from where it starts', () => {
    const seen = new Set([S.rules.startingLocationId]);
    const queue = [S.rules.startingLocationId];
    while (queue.length) {
      const id = queue.shift()!;
      const here = S.locations.find((l) => l.id === id)!;
      for (const c of here.connections) {
        if (seen.has(c.to)) continue;
        seen.add(c.to);
        queue.push(c.to);
      }
    }
    for (const l of S.locations) expect(seen.has(l.id), `${l.id} cannot be walked to`).toBe(true);
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

  it('shows a clear build screen, with a permanence line and distinct options', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => i.message)).toEqual([]);
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    const tags = S.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tags).size).toBe(tags.length);
  });

  it('describes every ability by whether it can fail and what it costs', async () => {
    const { abilityEffect } = await import('@plotbreak/contracts');
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('passes the clarity standard, premise included', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const premise = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(premise.passed).toBe(true);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('meets the ending bar, inside the twelve the storyteller reads', () => {
    expect(S.endings.length).toBeGreaterThanOrEqual(3);
    expect(S.endings.length).toBeLessThanOrEqual(12);
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    for (const id of ['end_sent_home', 'end_struck_from_the_rolls', 'end_the_road_down', 'end_lanceless']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
    }
  });

  it('ends the story by expulsion for striking a master, and only a master', () => {
    const expelling = routes.filter(({ route: r }) => r.setsFlags.includes('expelled')).map(({ route: r }) => r.predicate.flagsSet);
    expect(expelling).toEqual([['attacked:greaves'], ['attacked:orme']]);
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

  it('makes steel drawn outside the yard cost the masters’ patience first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(S.factions[0]?.id).toBe('faction_masters');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { CREST_ACADEMY } from './crest-academy.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Crest Academy, held to the promise on its own card: five points to spend and
 * ten seconds left, in a school where everybody else's numbers are better.
 *
 * The failure this world is most exposed to is the stat system going soft.
 * Production's storyteller never sees the engine's resources, so if the crest,
 * its five lines and its unspent points do not live in places the storyteller
 * reads, the window of light becomes decoration by turn three and the player's
 * one advantage quietly stops existing.
 *
 * It is also a harem-shaped academy story with three women in the cast, and
 * the checks for that are blunt on purpose: everybody is an adult on the page,
 * nobody is described by their body, and each of them can say no.
 */

const S = CREST_ACADEMY;

const start = (archetypeId = 'arch_forge') =>
  createInitialState({
    sessionId: 'sess_crest_academy',
    story: S,
    identity: {
      displayName: 'Ren Marlow',
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
const routes = S.quests.flatMap((q) =>
  q.steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ quest: q.id, step: s.id, route }))),
);
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is nineteen. */
const AGES: Record<string, number> = {
  seraphine: 20,
  mio: 21,
  isolde: 21,
  brannoch: 47,
  varro: 22,
  piers: 20,
};

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
  ...routes.flatMap(({ route }) => route.setsFlags),
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

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('Seraphine');
    expect(head).toMatch(/"[^"]*\byou\b[^"]*"/);
  });

  it('ends on a demand the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Well\? Yield, or spend them\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the rival, whose name the crowd shouts, and the crest's own line names
    // may appear.
    const ALLOWED = new Set(['Seraphine', 'Strength', 'Speed', 'Mana', 'Guard', 'Charm', 'Unspent', 'I']);
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
    // The risky one spends everything on the one line that cannot win a duel.
    expect(risky).toMatch(/Charm/);
    expect(risky).toMatch(/dinner/);
    // Only the risky one spends all five, so a tap on the done card keeps the
    // mid-swing spend the card and the style examples sell.
    expect(S.openingSuggestions.filter((s) => /all five points into/.test(s))).toEqual([risky]);
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
});

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding their crest, with five lines and five unspent points on it', () => {
    // Production's storyteller reads quest items, never resources, so the
    // crest is a quest item the player starts with.
    const crest = S.items.find((i) => i.id === 'scholarship_crest')!;
    expect(crest.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('scholarship_crest');
    expect(crest.description).toContain('[Strength 2, Speed 2, Mana 2, Guard 2, Charm 2]');
    expect(crest.description).toContain('[Unspent: 5]');
    // The world brief re-sends this every turn, so the numbers are written as
    // where the crest started, never as what it reads now.
    expect(crest.description).toMatch(/The morning it was issued it read \[Strength 2/);
    expect(crest.description).toMatch(/as they stand right now/);
  });

  it('gives every background the power to spend a point, so the storyteller sees it', () => {
    // It only reads the chosen archetype's starting abilities.
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('spend_a_point');
    expect(ability('spend_a_point').unlockedByDefault).toBe(true);
  });

  it('spells out the rules of the crest in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    for (const line of ['Strength', 'Speed', 'Mana', 'Guard', 'Charm']) expect(canon).toContain(line);
    expect(canon).toMatch(/zero/);
    expect(canon).toMatch(/clause nine/i);
    expect(canon).toMatch(/clause fourteen/i);
  });

  it('keeps literal crest text out of the tone guide, which also feeds the cover', () => {
    expect(S.rules.toneGuide).not.toMatch(/\[|\d/);
  });

  it('keeps the archetype names out of canon and premise, so only the chosen one is shown', () => {
    const shown = `${S.rules.hardCanon.join(' ')} ${S.premise}`;
    for (const a of S.archetypes) expect(shown, a.id).not.toContain(a.name);
  });
});

describe('the first duel is a real choice with six honest answers', () => {
  const duel = quest('q_first_duel');

  it('starts active and has a route for every kind of answer', () => {
    expect(duel.startsActive).toBe(true);
    const ids = duel.steps[0]!.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(
      expect.arrayContaining(['yielded', 'fought_her', 'refused_to_yield', 'haggled', 'quoted_the_code', 'walked_off']),
    );
  });

  it('makes yielding a shield rather than a loss', () => {
    const yielded = duel.steps[0]!.succeedWhenAny.find((r) => r.routeId === 'yielded')!;
    expect(yielded.setsFlags).toContain('serving_seraphine');
    // Clause nine closes the Ladder for anybody under yield terms.
    const ladder = S.worldEvents.find((e) => e.id === 'we_the_ladder')!;
    expect(ladder.cancelledByFlags).toContain('serving_seraphine');
    // And it has its own ending that is not a defeat.
    const books = S.endings.find((e) => e.id === 'end_a_year_of_books')!;
    expect(books.requires.flagsSet).toContain('serving_seraphine');
    expect(books.rarity).toBe('COMMON');
  });

  it('zeroes the crest only for a player who ignored the Ladder entirely', () => {
    const forfeits = S.worldEvents.find((e) => e.id === 'we_the_forfeits')!;
    expect(forfeits.setsFlags).toContain('crest_zeroed');
    expect(forfeits.requiresFlags).toContain('ladder_posted');
    expect(forfeits.cancelledByFlags).toEqual(expect.arrayContaining(['survived_the_ladder', 'serving_seraphine']));
    expect(quest('q_the_ladder').steps[0]!.rewards.flags).toContain('survived_the_ladder');
  });
});

describe('the secrets are earned, not announced', () => {
  it('teaches the gate counter only through Brannoch, and only for keeping the Code', () => {
    const counter = ability('gate_counter');
    expect(counter.unlockedByDefault).toBe(false);
    expect(counter.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(counter.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const granting = steps.filter((s) => s.rewards.abilities.includes('gate_counter'));
    expect(granting.map((s) => s.id)).toEqual(['earn_the_counter']);
    expect(granting[0]!.succeedWhenAny.length).toBeGreaterThanOrEqual(2);
  });

  it('hides where the five points come from behind a lead only a curious player opens', () => {
    const lead = quest('q_the_five');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:brannoch_low']);
    // Nothing everybody gets opens it: every event that sets the flag needs the
    // player to have gone somewhere on purpose.
    const sources = S.worldEvents.filter((e) => e.setsFlags.includes('knows:brannoch_low'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('lets the player give a point back only once they know whose points they are', () => {
    const give = ability('give_a_point');
    expect(give.unlockedByDefault).toBe(false);
    expect(give.requires.flagsSet).toEqual(['knows:the_five']);
    const granting = steps.filter((s) => s.rewards.abilities.includes('give_a_point'));
    expect(granting.map((s) => s.id)).toEqual(['find_the_register']);
    expect(granting[0]!.rewards.flags).toContain('knows:the_five');
  });

  it('keeps most of the endings reachable without either secret', () => {
    const secret = new Set(['knows:gate_counter', 'knows:the_five', 'gave_a_point_back', 'beat_varro']);
    const ordinary = S.endings.filter((e) => !e.requires.flagsSet.some((f) => secret.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(8);
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
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('never uses a childlike word anywhere in the world', () => {
    const CHILDLIKE = /\b(teen\w*|girls?|boys?|kids?|child\w*|schoolgirl\w*|schoolboy\w*|minors?|underage|loli\w*)\b/i;
    const text = JSON.stringify(S);
    expect(text.match(CHILDLIKE)?.[0] ?? null).toBeNull();
  });
});

describe('thirteen-plus, and nothing is fan service', () => {
  it('keeps bodies, sex and gore out of everything the storyteller is handed as material', () => {
    // The tone guide names what is forbidden, so it is the one field allowed
    // to say the words.
    const material = JSON.stringify({ ...S, rules: { ...S.rules, toneGuide: '' } });
    const BANNED =
      /\b(nude|naked|nudity|cleavage|lingerie|breasts?|thighs?|undress\w*|sexy|sexual\w*|bedroom|gore|gory|blood\w*|suicid\w*|self-harm)\b/i;
    expect(material.match(BANNED)?.[0] ?? null).toBeNull();
  });

  it('stops every romance at a kiss and says so', () => {
    expect(S.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(S.rules.toneGuide).toMatch(/fan service/);
  });

  it('lets each of the three romanceable leads refuse', () => {
    for (const id of ['seraphine', 'mio', 'isolde']) {
      const c = S.characters.find((x) => x.id === id)!;
      expect(c.boundaries.length, id).toBeGreaterThanOrEqual(2);
      const romance = c.gates.find((g) => g.kind === 'ROMANCE');
      expect(romance, `${id} has no romance gate`).toBeDefined();
    }
  });
});

describe('it is its own story', () => {
  it('borrows no franchise name and no competitor tagline', () => {
    const text = JSON.stringify(S);
    const BORROWED =
      /\b(Lumencia|Sword and Sorcery|swords and spells|swordwork and sorcery|weakest crest|Society of the Ring|Hogwarts|Mahouka|Danmachi|Solo Leveling|Classroom of the Elite|Chivalry of a Failed Knight|Rakudai|Akademeia)\b/i;
    expect(text.match(BORROWED)?.[0] ?? null).toBeNull();
  });
});

describe('the cover', () => {
  it('puts the title in the art and keeps the crest window off her face', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('CREST ACADEMY');
    expect(cover).toContain('Seraphine');
    expect(cover).toMatch(/FACE STAYS CLEAN/);
    expect(cover).toMatch(/no letters, no numbers/i);
  });

  it('gives the title its own line: style, placement and exact spelling', () => {
    const cover = S.coverDirection!;
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(cover).toMatch(/TITLE: /);
    expect(title).toMatch(/upper third/);
    expect(title).toMatch(/logo/);
    expect(title).toMatch(/spelled exactly CREST ACADEMY/);
    expect(title).toMatch(/No other text anywhere\.$/);
    expect(S.title.toUpperCase()).toBe('CREST ACADEMY');
  });

  it('keeps every effect on objects and the title, never on a face', () => {
    expect(S.coverDirection).toMatch(/Every light effect stays on the window, the blade and the title, never on her face\./);
  });

  it('declares the opening panel under the story’s own asset prefix', () => {
    expect(S.storyId).toBe('story_crest_academy');
    expect(S.openingPanel?.assetKey).toBe('story_crest_academy/opening');
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
  });

  it('opens the panel on Seraphine, the one who speaks in the opener, and draws it from her portrait', () => {
    const alt = S.openingPanel!.alt;
    const seraphine = S.characters.find((c) => c.id === 'seraphine')!;
    expect(S.opening).toMatch(/^"Commoner\." Across the duelling ring, a noblewoman/);
    expect(alt.startsWith(`${seraphine.calledName} `)).toBe(true);
    // The lookup in infra/scripts/opening-panel-art.ts, verbatim. It keys on
    // the first word of `name`, which for "Lady Seraphine Aldric" is a title,
    // so she is found by the last fallback: the first character with a card
    // blurb. Keep her first in the cast.
    const named =
      S.characters.find((c) => alt.toLowerCase().startsWith(c.name.split(' ')[0]!.toLowerCase())) ??
      S.characters.find((c) => alt.includes(c.name.split(' ')[0]!)) ??
      S.characters.find((c) => c.cardBlurb.trim().length > 0);
    expect(named?.id).toBe('seraphine');
  });
});

describe('ready for art and release', () => {
  it('gives every character with a card a concrete appearance', () => {
    for (const c of S.characters.filter((x) => x.cardBlurb.trim())) {
      expect((c.appearance ?? '').length, c.id).toBeGreaterThanOrEqual(100);
    }
  });

  it('opens straight on the scene and is not dated until release', () => {
    expect(S.prologue).toEqual([]);
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('gives every titled character the name people actually call them', () => {
    const titled = S.characters.filter((c) => /^(Lady|Lord|Princess|Instructor)\b/.test(c.name));
    expect(titled.map((c) => c.id)).toEqual(['seraphine', 'isolde', 'brannoch', 'varro', 'piers']);
    for (const c of titled) {
      expect(c.calledName, c.id).toBeTruthy();
      expect(c.name, c.id).toContain(c.calledName!);
    }
  });

  it('sets the tone guide the cover’s mood is read from', () => {
    expect(S.rules.toneGuide.length).toBeGreaterThan(200);
  });
});

describe('nobody is only there to react', () => {
  it('starts the rival, the instructor and the maid-knight at the Ring', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['seraphine', 'brannoch', 'mio']));
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
      ['numbered points', /\b(?:First|Second|Third),/],
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

/**
 * The catalog's structural checks, run here because this story is not in the
 * launch catalog yet and so nothing else holds it to them.
 */
describe('the catalog’s structural checks, for this story alone', () => {
  it('has more than one way through, and some routes close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
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
    for (const { quest: q, step, route } of routes) {
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:') && !grantable.has(flag.slice(5))) broken.push(`${q}/${step}/${route.routeId}: ${flag}`);
      }
      for (const item of route.predicate.hasItems) {
        if (!obtainable.has(item)) broken.push(`${q}/${step}/${route.routeId}: ${item}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('never demands the thing it is about to hand you', () => {
    for (const step of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const route of step.succeedWhenAny) {
        for (const item of route.predicate.hasItems) expect(granted.has(item), `${step.id}: ${item}`).toBe(false);
      }
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
    // Stricter than the catalog's version: a flag merely being read somewhere
    // does not count as declaring it. Every flag has to be written by a route,
    // a reward, the timetable or the engine.
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
    for (const e of S.endings) check(e.requires.flagsSet, e.id);
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
    for (const { route } of routes) {
      for (const g of route.predicate.minFactionReputation) {
        expect(ceiling.get(g.factionId)!, `${route.routeId} needs ${g.factionId} ${g.value}`).toBeGreaterThanOrEqual(g.value);
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
});

describe('it can end badly, early and in many ways', () => {
  it('meets the ending bar', () => {
    expect(S.endings.length).toBeGreaterThanOrEqual(3);
    expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
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
    const losses = ['end_zero_in_a_line', 'end_the_last_scholar', 'end_bought_in', 'end_down_the_cliff_stairs'];
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

  it('lets rest restore the day and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes a fight outside the Ring cost the academy’s patience first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('censure');
    expect(S.factions[0]?.id).toBe('faction_academy');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

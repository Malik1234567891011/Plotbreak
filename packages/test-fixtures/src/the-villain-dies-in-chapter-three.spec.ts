import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THE_VILLAIN_DIES_IN_CHAPTER_THREE } from './the-villain-dies-in-chapter-three.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The Villain Dies in Chapter Three, held to the promise on its own card: you
 * are the villain, you die at midnight, and you know it.
 *
 * The failure this world is most exposed to is the foreknowledge going soft.
 * Production's storyteller never sees the engine's resources, so if the
 * chapter as the book wrote it, the Duel Code and the pull of the book do not
 * live in places the storyteller reads, the player's one advantage stops
 * existing by turn three and the day stops leaning toward midnight.
 *
 * The world is not registered in `index.ts` yet, so the catalog, endings,
 * choice-clarity and protagonist specs do not see it. Their invariants are
 * repeated here against this one story, plus the three the 50-story checkpoint
 * added: gated abilities are granted, card blurbs address the player, and
 * every location has a way in.
 *
 * One of them cannot be repeated, only flagged: `protagonist.spec.ts` lists
 * the NAMED worlds by storyId and requires every other one to be BLANK. The
 * commit that registers this story must add
 * 'story_the_villain_dies_in_chapter_three' to that list, or `npm test` goes
 * red. What that spec checks of a NAMED world is repeated below.
 */

const S = THE_VILLAIN_DIES_IN_CHAPTER_THREE;

const start = (archetypeId = 'arch_reread') =>
  createInitialState({
    sessionId: 'sess_villain_dies',
    story: S,
    identity: {
      displayName: 'Severin Grauen',
      pronouns: 'he/him',
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
    expect(S.promises.length).toBe(5);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
    expect(S.rules.hardCanon.length).toBeGreaterThan(0);
  });

  it('passes narrative clarity on the premise', async () => {
    const { checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    expect(report.passed).toBe(true);
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
    expect(head).toContain('Elara');
    expect(head).toMatch(/"[^"]*\byou\b[^"]*"/);
  });

  it('ends on a demand the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Well, my lord\? Finish the sentence\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the heroine, who introduces herself, may appear. A dash that cuts a line
    // off ends a sentence too.
    const ALLOWED = new Set(['Elara', 'Wynn', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]—]$/.test(before);
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
    // The risky one does exactly what the book says gets you killed.
    expect(risky).toMatch(/finish the line/i);
    expect(risky).toMatch(/book/);
    // Only the said card backs down. A bow is the same apology done with the
    // body, and both lead to the same furious second beat.
    for (const card of [done, risky]) expect(card).not.toMatch(/\b(bow|kneel|sorry|apologi[sz]e|take it back)\b/i);
    // The done card acts on what the player knows from the book.
    expect(done).toMatch(/midnight/);
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

  it('starts with the three people the opener puts in the courtyard', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['elara', 'cassian', 'felis']));
  });
});

describe('the foreknowledge lives where the storyteller can read it', () => {
  it('starts the player holding the chapter they remember', () => {
    // Production's storyteller reads quest items, never resources.
    const pages = S.items.find((i) => i.id === 'pages_you_remember')!;
    expect(pages.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('pages_you_remember');
    for (const beat of ['courtyard', 'noon bell', 'nine seconds', 'note', 'iron door', 'midnight bell']) {
      expect(pages.description, beat).toContain(beat);
    }
  });

  it('spells out the chapter, the Code and the pull of the book in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Chapter three, as the book wrote it/);
    expect(canon).toMatch(/The Duel Code/);
    expect(canon).toMatch(/noon bell/);
    expect(canon).toMatch(/The book pulls/);
    expect(canon).toMatch(/Cold Ember/);
  });

  it('tells the storyteller both halves of the trade, since it never reads resources or abilities', () => {
    // Leaning on the villain or on the book pulls the day back; breaking a
    // scene for a new reason loosens it. Without the first half, three of four
    // archetypes play a world where foreknowledge is free.
    const pull = S.rules.hardCanon.find((fact) => fact.startsWith('The book pulls'))!;
    expect(pull).toMatch(/The pull answers the player/);
    expect(pull).toMatch(/name and menace/);
    expect(pull).toMatch(/what the book says is coming/);
    expect(pull).toMatch(/loosens it/);
  });

  it('gives the storyteller the villain’s line word for word, so every session finishes it the same way', () => {
    const pages = S.items.find((i) => i.id === 'pages_you_remember')!;
    expect(pages.description).toMatch(/word for word, "\.\.\.commoner trash [^"]+"/);
    expect(ability('play_the_villain').affordances).toContain('finish the line');
  });

  it('keeps every card blurb true to the secrets the storyteller also reads', () => {
    // He wrote back once, about a hawk. Her card may not say he never did.
    const viveka = S.characters.find((c) => c.id === 'viveka')!;
    expect(viveka.secrets.map((s) => s.fact).join(' ')).toMatch(/wrote back/);
    expect(viveka.cardBlurb).not.toMatch(/answered none|never (once )?(answered|wrote)/i);
  });

  it('keeps the archetype names out of canon and premise, so only the chosen one is shown', () => {
    const shown = `${S.rules.hardCanon.join(' ')} ${S.premise}`;
    for (const a of S.archetypes) expect(shown, a.id).not.toContain(a.name);
  });

  it('plays a named villain, so the setup screen asks how you read rather than who you are', () => {
    expect(S.protagonist?.kind).toBe('NAMED');
    expect(S.protagonist?.name).toBe('Severin Grauen');
    const ids = S.setupFields.map((f) => f.id);
    expect(ids).not.toContain('displayName');
    expect(ids).not.toContain('pronouns');
    expect(ids).toContain('archetype');
  });

  it('passes what protagonist.spec asks of every NAMED world', () => {
    // Repeated here because that spec only sees registered worlds, and lists
    // the NAMED ones by storyId; see the header.
    const p = S.protagonist;
    expect(p.kind).toBe('NAMED');
    expect(p.name.trim().length).toBeGreaterThan(0);
    expect(p.pronouns).not.toBe('');
    expect(p.setupHeading).not.toBe('');
    expect(S.setupFields.map((f) => f.id)).not.toContain('appearance');
  });

  it('asks a setup question its options actually answer', () => {
    // "How far" is not answered by "You Skipped to the Fights" or "You Read
    // the Comments". How you read it is.
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.label).toMatch(/how did you read the book/i);
    expect(S.protagonist.setupHeading).toMatch(/reader/i);
  });
});

describe('the shelf can find it', () => {
  it('files it under School and Fantasy, not only Action', async () => {
    // The academy is the main pull, so a reader browsing School has to see it.
    // The taxonomy lives in the API; loaded by path so this package keeps its
    // one-way dependency and tsc's rootDir.
    const { fileURLToPath } = await import('node:url');
    const path = fileURLToPath(new URL('../../../services/api/src/catalog-taxonomy.ts', import.meta.url));
    const { categoriesFor } = (await import(/* @vite-ignore */ path)) as {
      categoriesFor: (story: typeof S) => string[];
    };
    expect(categoriesFor(S)).toEqual(expect.arrayContaining(['action', 'fantasy', 'school']));
  });
});

describe('the day has a shape and every scene in it can be broken', () => {
  const chapter = quest('q_chapter_three');

  it('starts active with five honest answers to the half-said line', () => {
    expect(chapter.startsActive).toBe(true);
    const ids = chapter.steps[0]!.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(expect.arrayContaining(['apologised', 'finished_it', 'broke_character', 'walked_off', 'drew_on_her']));
  });

  it('lets the player survive midnight in several ways, and die in one', () => {
    const midnight = chapter.steps.find((s) => s.id === 'midnight')!;
    const surviving = midnight.succeedWhenAny.filter((r) => r.setsFlags.includes('survived_midnight'));
    expect(surviving.length).toBeGreaterThanOrEqual(4);
    const asWritten = midnight.succeedWhenAny.find((r) => r.routeId === 'as_written')!;
    expect(asWritten.predicate.flagsSet).toEqual(expect.arrayContaining(['woke_the_ember', 'cassian_on_the_steps']));
  });

  it('answers who opened the door three different ways', () => {
    const find = quest('q_the_open_door').steps[0]!;
    expect(find.succeedWhenAny.length).toBe(3);
    for (const r of find.succeedWhenAny) expect(r.setsFlags, r.routeId).toContain('knows:the_order');
  });

  it('keeps the undercroft behind a lead only a curious player opens', () => {
    const lead = quest('q_under_the_chapel');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['visited:chapel_steps']);
    expect(S.locations.find((l) => l.id === 'the_undercroft')!.discoveredByDefault).toBe(false);
  });

  it('keeps both relic powers locked, in the world’s own words, until they are earned', () => {
    for (const id of ['answer_the_ember', 'close_the_door']) {
      const a = ability(id);
      expect(a.unlockedByDefault, id).toBe(false);
      expect(a.requires.flagsSet.length, id).toBeGreaterThan(0);
      expect(a.requires.lockedCopy.length, id).toBeGreaterThan(30);
      expect(a.requires.lockedCopy, id).not.toMatch(/flag|predicate|locked/i);
    }
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in the bible and in hard canon, all eighteen or over', async () => {
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/30_THE_VILLAIN_DIES_IN_CHAPTER_THREE.md', import.meta.url),
      'utf8',
    );
    const ages = new Map<string, number>();
    for (const match of bible.matchAll(/^### (.+), (\d+)\s*$/gm)) ages.set(match[1]!, Number(match[2]));
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/is twenty/);
    expect(canon).toMatch(/nobody under eighteen/);
    for (const c of S.characters) {
      expect(ages.get(c.name), `${c.name} has no stated age in the bible`).toBeDefined();
      expect(ages.get(c.name)!, c.name).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.name);
    }
  });

  it('puts nobody under eighteen in a backstory either', async () => {
    // Kerr lost to a Grauen in the Ring thirty years ago, and Vellmar admits
    // nobody under eighteen; Viveka's hawk letter is from two years ago. Every
    // "N years ago" a character carries has to land them at eighteen or over.
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/30_THE_VILLAIN_DIES_IN_CHAPTER_THREE.md', import.meta.url),
      'utf8',
    );
    const ages = new Map<string, number>();
    for (const match of bible.matchAll(/^### (.+), (\d+)\s*$/gm)) ages.set(match[1]!, Number(match[2]));
    const NUMBER: Record<string, number> = { one: 1, two: 2, three: 3, four: 4, five: 5, ten: 10, twenty: 20, thirty: 30 };
    for (const c of S.characters) {
      const own = [...c.hiddenDrives, ...c.secrets.map((s) => s.fact), c.role].join(' ');
      for (const m of own.matchAll(/\b(\w+) years ago\b/gi)) {
        const n = NUMBER[m[1]!.toLowerCase()] ?? Number(m[1]);
        expect(Number.isFinite(n), `${c.id}: "${m[0]}" is not a number this check knows`).toBe(true);
        expect(ages.get(c.name)! - n, `${c.id}: ${m[0]}`).toBeGreaterThanOrEqual(18);
      }
    }
    // The man who beat Kerr was the Duke, so he was in the Ring then too.
    expect(ages.get('Duke Ulric Grauen')! - 30).toBeGreaterThanOrEqual(18);
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

  it('lets each romanceable lead refuse', () => {
    for (const id of ['elara', 'viveka']) {
      const c = S.characters.find((x) => x.id === id)!;
      expect(c.boundaries.length, id).toBeGreaterThanOrEqual(2);
      expect(c.gates.some((g) => g.kind === 'ROMANCE'), `${id} has no romance gate`).toBe(true);
    }
  });
});

describe('it is its own story', () => {
  it('borrows no franchise name and no competitor title', () => {
    const text = JSON.stringify(S);
    const BORROWED =
      /\b(Reinhard|Overlord|Re:Zero|Mushoku|Tensura|Slime|Bakarina|Katarina|Hamefura|Villainess Level 99|Omniscient Reader|Kim Dokja|Trash of the Count|Cale Henituse|Solo Leveling|Hogwarts|Isekai)\b/i;
    expect(text.match(BORROWED)?.[0] ?? null).toBeNull();
  });
});

describe('the cover', () => {
  it('puts the title in the art and keeps everything else free of text', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('THE VILLAIN DIES IN CHAPTER THREE');
    expect(cover).toMatch(/no letters or numbers/i);
  });

  it('gives the title its own TITLE: line, spelled exactly, and keeps every effect off faces', () => {
    // generatedCoverPrompt drops the generic lower-third rules only when the
    // direction carries its own TITLE: line.
    const cover = S.coverDirection!;
    const titleLine = cover.slice(cover.indexOf('TITLE:'));
    expect(cover.indexOf('TITLE:')).toBeGreaterThan(-1);
    expect(titleLine).toContain('The Villain Dies in Chapter Three');
    expect(titleLine).toMatch(/upper third/);
    expect(cover).toMatch(/never on a face/);
    expect(cover).toMatch(/FACES STAY CLEAN/);
  });

  it('declares the opening panel under the story’s own asset prefix', () => {
    expect(S.id).toBe('sv_the_villain_dies_in_chapter_three_1');
    expect(S.storyId).toBe('story_the_villain_dies_in_chapter_three');
    expect(S.openingPanel?.assetKey).toBe('story_the_villain_dies_in_chapter_three/opening');
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
  });

  it('starts the panel alt with the first name of whoever speaks in the opener', () => {
    // opening-panel-art.ts uses that character's portrait as the reference.
    const speaker = S.characters.find((c) => S.opening.includes(`says ${c.name}`))!;
    expect(speaker.id).toBe('elara');
    expect(S.openingPanel!.alt.startsWith(`${speaker.name.split(' ')[0]!} `)).toBe(true);
  });

  it('opens straight on the scene and is dated only at release', () => {
    expect(S.prologue).toEqual([]);
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('says what every titled character is actually called', () => {
    const TITLED = /^(Lady|Lord|Duke|Duchess|Sir|Dame|Master|Prince|Princess|King|Queen)\b/;
    const titled = S.characters.filter((c) => TITLED.test(c.name));
    expect(titled.map((c) => c.id).sort()).toEqual(['duke_grauen', 'viveka']);
    for (const c of titled) expect(c.calledName, c.id).toBeTruthy();
  });
});

describe('nobody is only their chapter', () => {
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
    const gated = S.abilities.filter((x) => !x.unlockedByDefault);
    expect(gated.length, 'nothing is gated, so this check proves nothing').toBeGreaterThan(0);
    for (const a of gated) expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
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

  it('never repeats a route id', () => {
    const ids = routes.map(({ route }) => route.routeId);
    expect(new Set(ids).size).toBe(ids.length);
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
    for (const i of S.items) {
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skill.has(s)) broken.push(`${i.id} modifies ${s}`);
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
    // A flag merely being read somewhere does not count as declaring it. Every
    // flag has to be written by a route, a reward, the timetable or the engine.
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
    expect(field.helpText).toMatch(/fixed for the whole story/i);
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
  it('meets the ending bar, and fits in what the storyteller reads', () => {
    // The pure narrator reads the first twelve endings and no more.
    expect(S.endings.length).toBeGreaterThanOrEqual(3);
    expect(S.endings.length).toBeLessThanOrEqual(12);
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
    for (const id of ['end_as_written', 'end_sent_down', 'end_not_my_story']) {
      expect(S.endings.some((e) => e.id === id), id).toBe(true);
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

  it('lets rest restore composure and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('makes steel drawn in public cost the academy’s patience first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scandal');
    expect(S.factions[0]?.id).toBe('faction_academy');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

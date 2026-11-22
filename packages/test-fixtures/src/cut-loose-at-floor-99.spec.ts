import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { CUT_LOOSE_AT_FLOOR_99 as STORY } from './cut-loose-at-floor-99.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Cut Loose at Floor 99, held to the thing on its card: the betrayal is turn
 * one, and the player starts the story holding the betrayers' lives.
 *
 * This world is not in `index.ts` yet, so none of the catalog-wide specs see
 * it. The structural checks they would run are repeated here, next to the
 * three checkpoint checks and the house rules for a new story: an opener that
 * puts a named person's voice in the first sixty words and ends on a question,
 * an all-adult cast with ages on the page, content that stays 13+, and nothing
 * borrowed from somebody else's world.
 */

const PARTY = ['lucan', 'elsbeth', 'kes', 'bran'] as const;

const start = (archetypeId = 'arch_anchor') =>
  createInitialState({
    sessionId: 'sess_cl99',
    story: STORY,
    identity: {
      displayName: 'Wren Abara',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const steps = STORY.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag a route, a step reward or a world event can set. */
function settable(): Set<string> {
  const flags = new Set<string>();
  for (const { step } of steps) {
    for (const flag of step.rewards.flags) flags.add(flag);
    for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
  }
  for (const event of STORY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

/** All the prose a player or the storyteller can read, with where it came from. */
function allProse(): Array<[string, string]> {
  const out: Array<[string, string]> = [
    ['title', STORY.title],
    ['fantasyLabel', STORY.fantasyLabel],
    ['hook', STORY.hook],
    ['premise', STORY.premise],
    ['creatorNote', STORY.creatorNote],
    ['opening', STORY.opening],
    ['toneGuide', STORY.rules.toneGuide],
    ...STORY.rules.hardCanon.map((line, i): [string, string] => [`hardCanon[${i}]`, line]),
    ...STORY.rules.styleExamples.map((line, i): [string, string] => [`styleExamples[${i}]`, line]),
    ...STORY.openingSuggestions.map((line, i): [string, string] => [`suggestion[${i}]`, line]),
  ];
  for (const c of STORY.characters) {
    for (const [field, value] of Object.entries(c)) {
      if (typeof value === 'string') out.push([`${c.id}.${field}`, value]);
      if (Array.isArray(value)) {
        for (const entry of value) {
          if (typeof entry === 'string') out.push([`${c.id}.${field}`, entry]);
          else if (entry && typeof entry === 'object') out.push([`${c.id}.${field}`, JSON.stringify(entry)]);
        }
      }
    }
  }
  for (const l of STORY.locations) out.push([l.id, `${l.name} ${l.description} ${l.artDirection}`]);
  for (const i of STORY.items) out.push([i.id, `${i.name} ${i.description} ${i.loreText}`]);
  for (const a of STORY.abilities) out.push([a.id, `${a.name} ${a.description} ${a.requires.lockedCopy}`]);
  for (const f of STORY.factions) out.push([f.id, `${f.name} ${f.description}`]);
  for (const r of STORY.resources) out.push([r.id, `${r.zeroStateConsequence} ${r.bands.map((b) => b.behaviour).join(' ')}`]);
  for (const q of STORY.quests) {
    out.push([q.id, `${q.title} ${q.summary} ${q.knownRewardCopy}`]);
    for (const s of q.steps) {
      out.push([`${q.id}/${s.id}`, `${s.playerCopy} ${s.directorNotes} ${s.succeedWhenAny.map((r) => r.label).join(' ')}`]);
    }
  }
  for (const e of STORY.worldEvents) out.push([e.id, `${e.publicCopy} ${e.directorNotes}`]);
  for (const p of STORY.promises) out.push([p.id, `${p.label} ${p.seedHint} ${p.payoffHint}`]);
  for (const a of STORY.archetypes) out.push([a.id, `${a.name} ${a.role} ${a.summary} ${a.blurb}`]);
  for (const f of STORY.setupFields) out.push([f.id, `${f.label} ${f.helpText} ${f.placeholder} ${f.options.map((o) => o.label).join(' ')}`]);
  for (const e of STORY.endings) out.push([e.id, `${e.name} ${e.condition} ${e.epilogue}`]);
  out.push(['openingPanel', STORY.openingPanel?.alt ?? '']);
  return out;
}

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', STORY.premise],
      ['opening', STORY.opening],
      ['hook', STORY.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const suggestion of STORY.openingSuggestions) expect(suggestion).not.toContain('\\n');
  });

  it('is English only', () => {
    // Straight and curly punctuation, an em dash, and nothing else outside ASCII.
    for (const [where, text] of allProse()) {
      const stray = text.replace(/[\x20-\x7E\n’‘“”—–]/g, '');
      expect(stray, `${where} has non-English characters`).toBe('');
    }
  });
});

describe('the opener', () => {
  const words = STORY.opening.trim().split(/\s+/);
  const castFirstNames = new Set(
    STORY.characters.flatMap((c) => [c.name.split(' ')[0]!, calledName(c)].filter((n) => n !== 'The')),
  );

  it('is between fifty and a hundred and twenty words', () => {
    expect(words.length).toBeGreaterThanOrEqual(50);
    expect(words.length).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking within the first sixty words', () => {
    const firstQuote = words.findIndex((w) => /^["“]/.test(w));
    expect(firstQuote, 'nobody speaks').toBeGreaterThanOrEqual(0);
    expect(firstQuote, 'the first line of dialogue is too late').toBeLessThan(60);
    // The line is attributed by name in the same paragraph.
    const paragraph = STORY.opening.split('\n\n').find((p) => /["“]/.test(p))!;
    const speaker = [...castFirstNames].find((name) => new RegExp(`\\b${name} says\\b`).test(paragraph));
    expect(speaker, `first line is not attributed to a cast member: ${paragraph}`).toBe('Lucan');
  });

  it('ends on a direct question the player has to answer', () => {
    expect(STORY.opening.trim().replace(/["”’]+$/, '')).toMatch(/\?$/);
  });

  it('uses no proper noun the player has not just been introduced to', () => {
    // Every capitalised word that does not start a sentence or a line of
    // dialogue is a cast member named in the beat itself.
    const strangers: string[] = [];
    for (const paragraph of STORY.opening.split('\n\n')) {
      const tokens = paragraph.split(/\s+/);
      tokens.forEach((token, i) => {
        const word = token.replace(/^["“‘(]+/, '').replace(/[^A-Za-z’'-]+$/, '');
        if (!/^[A-Z]/.test(word)) return;
        if (i === 0 || /^["“]/.test(token)) return;
        if (/[.!?:]["”]?$/.test(tokens[i - 1]!)) return;
        if (castFirstNames.has(word)) return;
        strangers.push(word);
      });
    }
    expect(strangers).toEqual([]);
    for (const name of ['Lucan', 'Elsbeth']) expect(STORY.opening).toContain(name);
  });

  it('offers three answers: one said, one done, one risky', () => {
    const [said, done, risky] = STORY.openingSuggestions;
    expect(STORY.openingSuggestions).toHaveLength(3);
    expect(said, 'said').toMatch(/^["“]/);
    expect(done, 'done').toMatch(/^I /);
    expect(risky, 'risky').toMatch(/^I /);
    // The risky one does something to one of the four, which is the whole
    // question the Voice just asked.
    expect(risky).toMatch(/Lucan/);
    for (const s of STORY.openingSuggestions) expect(s.length).toBeLessThanOrEqual(160);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of STORY.openingSuggestions) {
      const intent = await parser.parse(card, { story: STORY, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });
});

describe('adults only, and 13+', () => {
  const AGES: Record<string, number> = {
    lucan: 26,
    voice: 87,
    elsbeth: 24,
    taro: 27,
    kes: 22,
    bran: 31,
    sallow: 88,
    hesper: 56,
  };
  const UNITS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const spell = (n: number): string => TENS[Math.floor(n / 10)]! + (n % 10 ? `-${UNITS[n % 10]}` : '');

  it('states every character’s age in hard canon, and every one is eighteen or older', () => {
    // The storyteller reads hard canon; the portrait generator reads appearance.
    // Ages go where the storyteller will see them, as in the pilot.
    expect(Object.keys(AGES).sort()).toEqual(STORY.characters.map((c) => c.id).sort());
    const canon = STORY.rules.hardCanon.join(' ');
    for (const c of STORY.characters) {
      expect(AGES[c.id]!, c.id).toBeGreaterThanOrEqual(18);
      expect(canon, `${c.id} has no age in hard canon`).toMatch(new RegExp(`${c.name}(?: is)? ${spell(AGES[c.id]!)}\\b`));
    }
  });

  it('draws every portrait as an adult, by costume and build, never by a number', () => {
    const NUMBER = new RegExp(`\\b(${TENS.filter(Boolean).join('|')})(-\\w+)?\\b`, 'i');
    for (const c of STORY.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older|elderly) (man|woman)\b/);
      expect(c.appearance, c.id).not.toMatch(NUMBER);
    }
  });

  it('states the player’s age and keeps the years adding up', () => {
    // "Best friend for eight years" has to start at eighteen, not seventeen,
    // and the storyteller only reads hard canon for the player.
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/The player is twenty-six/);
    expect(canon).toMatch(/met at the delvers’ hostel at eighteen/);
    expect(AGES.lucan! - 8).toBeGreaterThanOrEqual(18);
    // Join dates: Bran five years ago, Elsbeth three, Kes two.
    expect(AGES.bran! - 5).toBeGreaterThanOrEqual(18);
    expect(AGES.elsbeth! - 3).toBeGreaterThanOrEqual(18);
    expect(AGES.kes! - 2).toBeGreaterThanOrEqual(18);
    expect(canon).toMatch(/Bran joined five years ago, Elsbeth three years ago and Kes two years ago/);
  });

  it('never uses a childlike or minor-coded word', () => {
    const MINOR =
      /\b(child|children|childlike|kid|kids|teen|teens|teenage|teenager|girl|girls|boy|boys|minor|minors|underage|schoolgirl|schoolboy|school uniform|loli|youngster|little sister|little brother|petite)\b/i;
    for (const [where, text] of allProse()) expect(text, where).not.toMatch(MINOR);
  });

  it('keeps romance at a kiss and violence off the body', () => {
    const ADULT =
      /\b(naked|nude|nudity|sex|sexual|sexy|lingerie|undress\w*|in bed|bedroom|breasts?|cleavage|gore|gory|entrails|disembowel\w*|decapitat\w*|dismember\w*|suicide|self-harm|slit (?:his|her|their) wrists?)\b/i;
    for (const [where, text] of allProse()) expect(text, where).not.toMatch(ADULT);
    expect(STORY.contentDescriptors).not.toContain('SUGGESTIVE_THEMES');
    expect(STORY.intensity).not.toBe('INTENSE');
  });
});

describe('original', () => {
  it('borrows no name or term from another world', () => {
    const BORROWED =
      /\b(Aincrad|Kirito|Asuna|Sung Jin|Jinwoo|Solo Leveling|Shadow Monarch|Rimuru|Tempest|Ainz|Nazarick|Overlord|Danmachi|Bell Cranel|Hestia|Made in Abyss|Abyss|Nanachi|Shield Hero|Naofumi|Dungeon Meshi|Laios|Delicious in Dungeon|Frieren|Himmel|Hunter Association|Gate of|S-rank|A-rank|E-rank|status window|system window|level up|levelled up|leveled up|isekai|reincarnat\w*|Banished from the Hero|Beast Tamer|Ragna|Reg\b|Riko|Ozen|Bondrewd|Naruto|Konoha|Itachi|Akatsuki|Goku|Luffy|Zoro|Gojo|Sukuna|Mana Stone|Dungeon Core|Hero Party)\b/i;
    for (const [where, text] of allProse()) expect(text, where).not.toMatch(BORROWED);
  });

  it('never draws her held or sealed in the rock', () => {
    const hollow = STORY.locations.find((l) => l.id === 'agathes_hollow')!;
    const sealed = /\b(held in|sealed|encased|embedded|to the shoulders|up to her shoulders|in the rock)\b/i;
    expect(`${hollow.description} ${hollow.artDirection}`).not.toMatch(sealed);
    const voice = STORY.characters.find((c) => c.id === 'voice')!;
    for (const s of voice.secrets) expect(s.fact, s.id).not.toMatch(sealed);
  });

  it('draws the Rim as a walled city, not rings around a pit', () => {
    const rim = STORY.locations.find((l) => l.id === 'the_rim')!;
    expect(rim.artDirection).not.toMatch(/terraced|rings around|giant dark pit/i);
  });
});

describe('the catalog', () => {
  it('uses tags the category rail files', () => {
    // services/api/src/catalog-taxonomy.ts: Dark fantasy -> Fantasy,
    // Monsters -> Action, Mystery -> Mystery, Survival -> Adventure.
    expect(STORY.tags).toEqual(expect.arrayContaining(['Dark fantasy', 'Monsters', 'Mystery', 'Survival']));
  });
});

/**
 * The three checks every new story has to pass before it reaches a reviewer.
 */
describe('checkpoint', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = STORY.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) {
      expect(granted.has(ability.id), `${ability.id} is locked and nothing grants it`).toBe(true);
    }
  });

  it('puts the word "you" in every cardBlurb', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge', () => {
    for (const l of STORY.locations) {
      const inbound = STORY.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id));
      expect(inbound, `nothing leads to ${l.id}`).toBe(true);
    }
  });
});

describe('turn one is the fall', () => {
  it('starts on the bottom floor ten minutes after the rope was cut', () => {
    expect(STORY.rules.startingLocationId).toBe('the_sump');
    expect(STORY.rules.startWorldMinute).toBe(18 * 60 + 10);
    const state = start();
    expect(state.player.locationId).toBe('the_sump');
    expect(state.player.inventory.map((i) => i.itemId)).toContain('cut_rope_end');
  });

  it('has the Voice in the room and nobody else', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toEqual(['voice']);
  });

  it('keeps the four of them on the ledge above, where the opening left them', () => {
    for (const id of PARTY) {
      const c = STORY.characters.find((x) => x.id === id)!;
      expect(locationForSchedule(c.schedule, STORY.rules.startWorldMinute), id).toBe('the_last_door');
    }
  });

  it('never drops a character into the opening scene by fallback', () => {
    for (const c of STORY.characters) {
      const placed = locationForSchedule(c.schedule, STORY.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} has nowhere to be at the start`).not.toBeNull();
      if (c.id === 'voice') continue;
      expect(placed, `${c.id} lands on the player`).not.toBe('the_sump');
    }
  });

  it('makes every answer to her question a route', () => {
    const first = STORY.quests.find((q) => q.id === 'q_finally')!.steps[0]!;
    const needs = first.succeedWhenAny.flatMap((r) => r.predicate.flagsSet);
    for (const flag of [
      'used:hold_the_threads',
      'used:let_them_all_go',
      'used:cut_a_thread',
      'used:listen_down_the_line',
      'spoke:voice',
    ]) {
      expect(needs, flag).toContain(flag);
    }
    const hold = first.succeedWhenAny.find((r) => r.routeId === 'held_them')!;
    const drop = first.succeedWhenAny.find((r) => r.routeId === 'let_them_all_go')!;
    expect(hold.closesFlags).toContain('let_them_all_go');
    expect(drop.closesFlags).toContain('held_the_threads');
  });

  it('says the thread mechanic where the storyteller will read it', () => {
    // Production reads hard canon and the premise, never the ability list.
    const canon = STORY.rules.hardCanon.join(' ');
    for (const name of ['Lucan', 'Elsbeth', 'Kes', 'Bran']) expect(canon).toContain(name);
    expect(canon).toMatch(/thread/);
    expect(STORY.premise).toMatch(/threads are still tied/);
  });

  it('tells the storyteller a tug cannot kill anybody on turn one', () => {
    // The risky card pulls Lucan's thread. Production never reads the bible,
    // the abilities or the quest notes, so the calibration lives in hard canon
    // or the villain and the Heartglass can go into the pit on turn one.
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/never enough by itself to throw anybody off a ledge or kill them/);
    expect(canon).toMatch(/over hours, not in the same instant/);
    expect(canon).toMatch(/Kes catches his collar/);
  });
});

describe('the Voice', () => {
  const voice = STORY.characters.find((c) => c.id === 'voice')!;

  it('keeps her name off the store card and out of her own name field', () => {
    expect(voice.name).not.toMatch(/Agathe|Lorne/);
    for (const text of [STORY.premise, STORY.hook, STORY.fantasyLabel, STORY.opening, voice.cardBlurb]) {
      expect(text).not.toMatch(/Agathe|Lorne/);
    }
  });

  it('keeps the store page from giving away who she is or what Sallow did', () => {
    // projections.ts sends every cast role and cardBlurb to the story page.
    const sallow = STORY.characters.find((c) => c.id === 'sallow')!;
    const SPOILER = /sixty-one|did to somebody|rope he cut|exactly what was just done/i;
    for (const [where, text] of [
      ['hook', STORY.hook],
      ['fantasyLabel', STORY.fantasyLabel],
      ['sallow.role', sallow.role],
      ['sallow.cardBlurb', sallow.cardBlurb],
      ['voice.role', voice.role],
      ['voice.cardBlurb', voice.cardBlurb],
    ] as const) {
      expect(text, where).not.toMatch(SPOILER);
    }
  });

  it('tells the storyteller how her name is earned, since reveal hints never reach it', () => {
    const boundaries = voice.boundaries.join(' ');
    expect(boundaries).toMatch(/what happened to her rather than what she is/);
    expect(boundaries).toMatch(/badge/);
  });

  it('cannot be fought, and will not force the player', () => {
    expect(voice.combatant).toBeNull();
    expect(voice.boundaries.join(' ')).toMatch(/Will not force/);
  });

  it('makes carrying her out something the player earns', () => {
    const take = STORY.abilities.find((a) => a.id === 'take_her_thread')!;
    expect(take.unlockedByDefault).toBe(false);
    expect(take.requires.flagsSet).toEqual(['knows:her_name']);
    expect(take.requires.lockedCopy).not.toMatch(/flag|locked|predicate/i);
  });
});

describe('four betrayers, four kinds of guilty', () => {
  it('gives each of the four a different relationship to the cut', () => {
    const hardCanon = STORY.rules.hardCanon.join(' ');
    expect(hardCanon).toMatch(/Lucan Harrow cut/);
    expect(hardCanon).toMatch(/Kes agreed/);
    expect(hardCanon).toMatch(/Elsbeth saw the knife and looked away/);
    expect(hardCanon).toMatch(/Bran was two flights up/);
  });

  it('lets the player find out what each of them hides', () => {
    for (const id of PARTY) {
      const c = STORY.characters.find((x) => x.id === id)!;
      expect(c.secrets.length, id).toBeGreaterThan(0);
      for (const s of c.secrets) expect(s.revealHint.length, `${id}/${s.id}`).toBeGreaterThan(20);
    }
  });
});

describe('eight people, eight mouths', () => {
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
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}%`).toBeLessThan(0.3);
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

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of STORY.characters) {
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('uses expressions the generator draws', () => {
    const unknown = STORY.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const words = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(words).size).toBe(words.length);
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
    expect(STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['mana']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of STORY.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      expect(STORY.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('sends a public fight to the deep and to the Tally House', () => {
    // PUBLIC_VIOLENCE raises the first descending resource and lowers the
    // first faction, in array order.
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('tremor');
    expect(STORY.factions[0]!.id).toBe('faction_tally');
  });

  it('lets the bottom floor loosen its grip', () => {
    expect(STORY.resources.find((r) => r.id === 'undertow')!.regenPerHour).toBeLessThan(0);
  });

  it('states what every ability does in a line a player can read', () => {
    for (const ability of STORY.abilities) {
      const effect = abilityEffect(STORY, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
      if (!ability.unlockedByDefault && ability.requires.flagsSet.length) {
        expect(ability.requires.lockedCopy.length, ability.id).toBeGreaterThan(30);
        expect(ability.requires.lockedCopy, ability.id).not.toMatch(/flag|locked|predicate/i);
      }
    }
  });
});

describe('the wiring a catalog spec would check', () => {
  it('has more than one way through, and choices that close doors', () => {
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
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const itemId of [...(step.succeedWhen?.hasItems ?? []), ...step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)]) {
        expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
      }
    }
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
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of STORY.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of STORY.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const i of STORY.items) {
      for (const skill of Object.keys(i.skillModifiers)) if (!skillIds.has(skill)) broken.push(`${i.id} modifies ${skill}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of STORY.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const skill of Object.keys(a.skillProficiencies)) if (!skillIds.has(skill)) broken.push(`${a.id} skill ${skill}`);
    }
    for (const f of STORY.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const e of STORY.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const q of STORY.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} teaches ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} item ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    for (const e of STORY.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
    }
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('reads only flags something in this world can set', () => {
    const flags = settable();
    const dead: string[] = [];
    const check = (where: string, list: readonly string[]) => {
      for (const flag of list) if (!flags.has(flag) && !engineSets(flag)) dead.push(`${where} reads ${flag}`);
    };
    for (const q of STORY.quests) {
      if (q.discoverWhen) check(q.id, [...q.discoverWhen.flagsSet, ...q.discoverWhen.flagsUnset]);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(st.id, [...p.flagsSet, ...p.flagsUnset]);
        for (const r of st.succeedWhenAny) {
          check(`${st.id}/${r.routeId}`, [...r.predicate.flagsSet, ...r.predicate.flagsUnset, ...r.closesFlags]);
        }
      }
    }
    for (const c of STORY.characters) for (const g of c.gates) check(`${c.id}/${g.id}`, [...g.requires.flagsSet, ...g.requires.flagsUnset]);
    for (const e of STORY.worldEvents) check(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const a of STORY.abilities) check(a.id, [...a.requires.flagsSet, ...a.requires.flagsUnset]);
    for (const e of STORY.endings) check(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const l of STORY.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never uses a relationship gate id as a flag', () => {
    const gateIds = new Set(STORY.characters.flatMap((c) => c.gates.map((g) => g.id)));
    for (const flag of settable()) expect(gateIds.has(flag), flag).toBe(false);
  });

  it('can be walked to from where it starts', () => {
    const seen = new Set([STORY.rules.startingLocationId]);
    const queue = [STORY.rules.startingLocationId];
    while (queue.length) {
      const id = queue.shift()!;
      const here = STORY.locations.find((l) => l.id === id)!;
      for (const c of here.connections) {
        if (!seen.has(c.to)) {
          seen.add(c.to);
          queue.push(c.to);
        }
      }
    }
    expect(STORY.locations.map((l) => l.id).filter((id) => !seen.has(id))).toEqual([]);
  });

  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of STORY.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
  });

  it('never gates on standing nothing can earn, and every rank is reachable', () => {
    const ceiling = new Map<string, number>();
    for (const f of STORY.factions) {
      const bestArchetype = Math.max(
        0,
        ...STORY.archetypes.map((a) => a.startingReputation.filter((r) => r.factionId === f.id).reduce((n, r) => n + r.amount, 0)),
      );
      const rewards = steps.reduce(
        (n, { step }) => n + step.rewards.reputation.filter((r) => r.factionId === f.id).reduce((m, r) => m + r.amount, 0),
        0,
      );
      ceiling.set(f.id, f.startingReputation + bestArchetype + rewards);
      for (const rank of f.ranks) expect(rank.atReputation, `${f.id}/${rank.label}`).toBeLessThanOrEqual(ceiling.get(f.id)!);
    }
    const needs = [
      ...STORY.endings.flatMap((e) => e.requires.minFactionReputation.map((r) => ({ where: e.id, ...r }))),
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation.map((r) => ({ where: route.routeId, ...r }))),
    ];
    for (const need of needs) expect(need.value, need.where).toBeLessThanOrEqual(ceiling.get(need.factionId)!);
  });

  it('gives every archetype something the rules can see', () => {
    for (const a of STORY.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
    }
    const ids = STORY.archetypes.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('keeps archetype names out of the world’s own facts', () => {
    // Two or more named in hard canon, the premise or the cast and the
    // storyteller treats every option as real at once.
    const asserted = [...STORY.rules.hardCanon, STORY.premise, ...STORY.characters.map((c) => c.name)].join('\n');
    for (const a of STORY.archetypes) expect(asserted, a.name).not.toContain(a.name);
  });
});

describe('where it can end', () => {
  it('has exactly twelve endings, because the storyteller reads twelve', () => {
    expect(STORY.endings).toHaveLength(12);
    expect(new Set(STORY.endings.map((e) => e.id)).size).toBe(12);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('writes every ending as a condition and an epilogue, not a stub', () => {
    for (const e of STORY.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.minTurn, e.id).toBeGreaterThanOrEqual(12);
      const gated =
        e.requires.flagsSet.length +
        e.requires.hasItems.length +
        e.requires.minRelationship.length +
        e.requires.minFactionReputation.length;
      expect(gated, `${e.id} is reachable from turn zero`).toBeGreaterThan(0);
    }
  });

  it('offers a loss reachable without a mistake, and a way to simply leave', () => {
    const loss = STORY.endings.find((e) => e.id === 'end_four_shares')!;
    expect(loss.requires.minRelationship).toEqual([]);
    expect(loss.requires.hasItems).toEqual([]);
    const leave = STORY.endings.find((e) => e.id === 'end_nobodys_rope')!;
    expect(leave.requires.flagsSet).toEqual(['left_the_map']);
    expect(leave.minTurn).toBeLessThanOrEqual(20);
  });

  it('switches the waking deep off three different ways', () => {
    const rises = STORY.worldEvents.find((e) => e.id === 'we_the_deep_rises')!;
    expect(rises.cancelledByFlags.length).toBe(3);
    const where = STORY.quests.find((q) => q.id === 'q_the_heartglass')!.steps.find((s) => s.id === 'where_it_goes')!;
    const settles = new Set(where.succeedWhenAny.flatMap((r) => r.setsFlags));
    for (const flag of rises.cancelledByFlags) expect(settles.has(flag), flag).toBe(true);
  });
});

describe('the copy carries the story bar', () => {
  it('keeps the premise in readable paragraphs', () => {
    const paragraphs = STORY.premise.split('\n\n');
    const words = STORY.premise.trim().split(/\s+/).length;
    expect(words).toBeGreaterThanOrEqual(100);
    expect(words).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(p.trim().split(/\s+/).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(STORY.premise).not.toContain('—');
  });

  it('has the cast, promises and fantasy label a store card needs', () => {
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
    expect(STORY.promises.length).toBeGreaterThanOrEqual(3);
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(STORY.rules.styleExamples.length).toBeLessThanOrEqual(3);
    expect(STORY.rules.proseStyle).toBe('webnovel');
  });

  it('explains the archetype choice as permanent and everything else as open', () => {
    const field = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed for the whole story/);
    expect(field.helpText).toMatch(/none of it is decided here/);
  });

  it('passes the narrative and choice clarity checks with no errors', async () => {
    const { checkStoryClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const narrative = checkStoryClarity(STORY);
    expect(narrative.issues.filter((i) => i.severity === 'ERROR'), JSON.stringify(narrative.issues)).toEqual([]);
    const choice = checkStoryChoiceClarity(STORY);
    expect(choice.issues.filter((i) => i.severity === 'ERROR'), JSON.stringify(choice.issues)).toEqual([]);
  });

  it('briefs the storyteller with one player and the prize', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    const brief = worldBrief(STORY, 'arch_lantern');
    expect(brief).toContain('## Who the player is');
    expect(brief).toContain('You Kept the Lamps Lit');
    expect(brief).not.toContain('You Did the Talking');
    expect(brief).toContain('The Heartglass');
  });
});

describe('art', () => {
  it('asks for every key under its own prefix', () => {
    expect(STORY.id).toBe('sv_cut_loose_at_floor_99_1');
    expect(STORY.storyId).toBe('story_cut_loose_at_floor_99');
    expect(STORY.openingPanel?.assetKey).toBe('story_cut_loose_at_floor_99/opening');
    expect((STORY.openingPanel?.alt ?? '').length).toBeLessThanOrEqual(200);
    const derived = withDerivedAssetKeys(STORY);
    const keys = [
      derived.coverImage,
      derived.keyArt,
      ...derived.locations.map((l) => l.stageImage),
      ...derived.characters.map((c) => c.portrait),
    ];
    for (const key of keys) expect(key, String(key)).toMatch(/^story_cut_loose_at_floor_99\//);
  });
});

/**
 * What the art and release pipeline needs from a new-50 fixture
 * (docs/stories-50/PIPELINE.md, after the #7 Skill: ERROR pilot).
 */
describe('the release pipeline', () => {
  it('directs its own cover, title lettering included', () => {
    const cover = STORY.coverDirection;
    const title = cover.split(/(?<=[.:]) (?=TITLE:)/)[1] ?? '';
    expect(title, 'no TITLE: line').toMatch(/^TITLE:/);
    expect(title).toContain('Cut Loose at Floor 99');
    expect(title).toContain('CUT LOOSE AT FLOOR 99');
    expect(title).toMatch(/lower third/);
    // Effects on objects and the title, never on faces.
    expect(cover).toMatch(/FACE STAYS CLEAN/);
    expect(cover).toMatch(/never on her face/);
    // People by costume and pose, never by age.
    expect(cover).not.toMatch(/\b(young|younger|youthful|old|older|elderly|aged|teen\w*|girl|boy|child\w*|kid|years? old|twenty|thirty|forty|fifty|sixty|seventy|eighty)\b/i);
  });

  it('opens on a panel of the character who speaks first', () => {
    const panel = STORY.openingPanel!;
    expect(panel.assetKey).toBe(`${STORY.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    const speakers = [...STORY.opening.matchAll(/\b([A-Z][a-z]+) says\b/g)].map((m) => m[1]!);
    expect(speakers[0]).toBe('Lucan');
    expect(panel.alt.startsWith(`${speakers[0]} `)).toBe(true);
  });

  it('has no prologue and no release date yet', () => {
    expect(STORY.prologue).toEqual([]);
    expect(STORY.publishedAt).toBeNull();
  });

  it('gives every carded character a portrait to be drawn from', () => {
    for (const c of STORY.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.split(',').length, c.id).toBeGreaterThanOrEqual(4);
    }
  });

  it('puts the thread system where the storyteller reads it', async () => {
    const threads = STORY.items.find((i) => i.id === 'four_threads')!;
    expect(threads.questItem).toBe(true);
    expect(STORY.rules.startingItems.map((i) => i.itemId)).toContain('four_threads');
    const CORE = ['hold_the_threads', 'listen_down_the_line', 'tug_the_line', 'cut_a_thread', 'let_them_all_go'];
    const { worldBrief } = await import('@plotbreak/director');
    for (const a of STORY.archetypes) {
      expect(a.startingAbilities.slice(0, CORE.length), a.id).toEqual(CORE);
      const brief = worldBrief(STORY, a.id);
      expect(brief, a.id).toContain('### Your Four Threads');
      expect(brief, a.id).toContain('Can: Hold the Threads');
      expect(brief, a.id).toContain('Can: Let Them All Go');
    }
    expect(STORY.rules.toneGuide.length).toBeGreaterThan(200);
  });

  it('names titled people by what they are called', () => {
    const called = Object.fromEntries(STORY.characters.map((c) => [c.id, calledName(c)]));
    expect(called).toMatchObject({ voice: 'The Voice', sallow: 'Sallow', kes: 'Kes', taro: 'Taro', hesper: 'Hesper' });
  });
});

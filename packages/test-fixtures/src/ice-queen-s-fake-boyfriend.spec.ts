import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { ICE_QUEEN_S_FAKE_BOYFRIEND } from './ice-queen-s-fake-boyfriend.js';
import { GOOD_MORNING_HUSBAND } from './good-morning-husband.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Ice Queen's Fake Boyfriend, held to the promises on its own card: a partner
 * from turn one with rules she wrote herself, a gala on Saturday at nine that
 * happens whatever the player does, and a deal that runs out at midnight unless
 * somebody says what it is first.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalogue-wide specs do not see
 * it. The structural checks they would run are repeated here against this one
 * world, alongside the three checks every new story runs and the opener rules
 * from the stories plan.
 */

const S = ICE_QUEEN_S_FAKE_BOYFRIEND;
const SLUG = 'ice_queen_s_fake_boyfriend';

const start = (archetypeId = 'arch_cart') =>
  createInitialState({
    sessionId: 'sess_ice_queen_s_fake_boyfriend',
    story: S,
    identity: {
      displayName: 'Sam Rivera',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ step: s.id, route })));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty or older. */
const AGES: Record<string, number> = { akane: 21, darren: 24, mei: 22, ito: 51, evelyn: 50 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  akane: 'Akane Hollis is twenty-one',
  darren: 'Darren Cole is twenty-four',
  mei: 'is twenty-two',
  ito: 'Professor Ito is fifty-one',
  evelyn: 'Evelyn Hollis is fifty',
};

const BIBLE = readFileSync(
  new URL('../../../docs/story-bibles/new50/24_ICE_QUEEN_S_FAKE_BOYFRIEND.md', import.meta.url),
  'utf8',
);

/** Every flag something in this world can set, plus the engine's own vocabulary. */
const settable = (() => {
  const flags = new Set<string>(['left_the_map']);
  for (const s of steps) {
    for (const f of s.rewards.flags) flags.add(f);
    for (const r of s.succeedWhenAny) for (const f of r.setsFlags) flags.add(f);
  }
  for (const e of S.worldEvents) for (const f of e.setsFlags) flags.add(f);
  return flags;
})();
// `knows:` is deliberately absent: the engine never sets it, so a route must.
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:', 'cooldown:', 'route:', 'closed:'];
const canBeSet = (flag: string) => settable.has(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

/** Everything a player can read, in one string. */
const playerFacing = () =>
  [
    S.title,
    S.fantasyLabel,
    S.hook,
    S.premise,
    S.creatorNote,
    ...S.mechanicsChips,
    S.opening,
    ...S.openingSuggestions,
    S.openingPanel?.alt ?? '',
    ...S.rules.styleExamples,
    ...S.characters.flatMap((c) => [c.name, c.role, c.cardBlurb, ...c.voiceSamples, ...c.gates.map((g) => g.label)]),
    ...S.locations.flatMap((l) => [l.name, l.description, ...l.connections.map((c) => c.label ?? '')]),
    ...S.items.flatMap((i) => [i.name, i.description, i.loreText]),
    ...S.abilities.flatMap((a) => [a.name, a.description, a.requires?.lockedCopy ?? '']),
    ...S.quests.flatMap((q) => [q.title, q.summary, q.knownRewardCopy, ...q.steps.map((s) => s.playerCopy)]),
    ...S.worldEvents.map((e) => e.publicCopy),
    ...S.archetypes.flatMap((a) => [a.name, a.role, a.summary, a.blurb, ...a.playstyle]),
    ...S.setupFields.flatMap((f) => [f.label, f.helpText ?? '', f.placeholder ?? '']),
    ...S.endings.flatMap((e) => [e.name, e.epilogue]),
  ].join('\n');

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

  it('clears the clarity checker with no errors, and the premise answers every question', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const missing = report.issues.filter((i) => i.code.startsWith('MISSING_') && !i.message.startsWith('Opening:'));
    expect(missing.map((i) => i.code)).toEqual([]);
    const premise = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(premise.passed).toBe(true);
  });

  it('meets the content bar for a world: premise, promises, cast and cards', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    expect(words(S.premise).length).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(S.promises).toHaveLength(5);
    expect(new Set(S.promises.map((p) => p.kind)).size).toBe(5);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
    expect(S.rules.startingItems.length).toBeGreaterThan(0);
    expect(S.fantasyLabel.length).toBeLessThanOrEqual(42);
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('keeps everything a 13+ reader sees on the right side of the line', () => {
    const everything = JSON.stringify(S);
    const FORBIDDEN =
      /\b(nude|naked|shirtless|topless|lingerie|underwear|cleavage|sexy|sexual|seduc\w*|undress\w*|bedroom eyes|gore|blood\w*|suicid\w*|self-harm|corpse)\b/i;
    expect(everything).not.toMatch(FORBIDDEN);
    expect(S.rules.allowsRomance).toBe(true);
    expect(S.rules.allowsCombat).toBe(false);
    expect(S.intensity).toBe('LIGHT');
    expect(S.contentDescriptors).toContain('ROMANCE');
    expect(S.rules.toneGuide).toMatch(/as far as a kiss and no further/);
    expect(S.rules.toneGuide).toMatch(/No fan service/);
  });

  it('is its own story, in English', () => {
    const everything = JSON.stringify(S) + BIBLE;
    // Nearby fake-dating and ice-princess properties, and the obvious sources.
    const FRANCHISE =
      /\b(Kaguya|Shirogane|Shuchiin|Nisekoi|Toradora|Oregairu|Horimiya|Kanojo|Rent-a-Girlfriend|Chizuru|Komi|Himuro|Kaguya-sama|Ouran|Maid-sama|Misaki Ayuzawa|Snow White with the Red Hair|Frozen|Elsa)\b/;
    expect(everything).not.toMatch(FRANCHISE);
    expect(everything).not.toMatch(/[぀-ヿ一-鿿가-힯]/);
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
    expect(head).toContain('Akane');
    expect(head).toContain('"You," she murmurs, "are about to help me.');
  });

  it('ends on a direct question the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"So\. How did you two meet\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the two people the scene introduces may appear, and the nickname the
    // same sentence explains.
    const ALLOWED = new Set(['Akane', 'Darren', 'Ice', 'Queen', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/\b[A-Z][A-Za-z’'-]*/g)) {
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
    // The risky one tells the truth on the spot.
    expect(risky).toMatch(/never met her/);
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

  it('is the opener the bible signed off', () => {
    const quoted = BIBLE.split('## Opening scene')[1]!.split('**Suggestions')[0]!;
    const fromBible = quoted
      .split('\n')
      .filter((l) => l.startsWith('>'))
      .map((l) => l.replace(/^> ?/, ''))
      .join(' ');
    const norm = (t: string) => words(t.replace(/[’']/g, "'")).join(' ');
    expect(norm(fromBible)).toBe(norm(S.opening));
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is an adult, a second-year student at Fairholm University, twenty or older');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
    expect(canon).toContain('Lena Ortiz');
    expect(canon).toContain('Gideon Cole is sixty-one');
  });

  it('agrees with the bible about every age', () => {
    const fromBible = new Map<string, number>();
    for (const m of BIBLE.matchAll(/^### (.+?) \((\d+)\)/gm)) fromBible.set(m[1]!, Number(m[2]));
    for (const c of S.characters) {
      const age = fromBible.get(c.name) ?? fromBible.get(calledName(c));
      expect(age, `${c.name} has no heading with an age in the bible`).toBe(AGES[c.id]);
    }
    for (const age of fromBible.values()) expect(age).toBeGreaterThanOrEqual(18);
    expect(BIBLE).toMatch(/The player is an adult second-year student, twenty or older/);
  });

  it('describes people by build and clothes, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|little|petite|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      for (const text of [c.appearance, c.visualHook, c.silhouette]) expect(text, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('never uses a word that reads as a minor, anywhere a player looks', () => {
    const MINOR = /\b(teen\w*|underage|minors?|schoolgirls?|schoolboys?|high school|middle school|child\w*|kids?|little girl|little boy)\b/i;
    expect(playerFacing()).not.toMatch(MINOR);
    expect(S.rules.hardCanon.join(' ')).not.toMatch(MINOR);
    expect(S.rules.toneGuide).not.toMatch(MINOR);
  });

  it('hands the production storyteller every age, whichever job the player picks', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    for (const archetype of S.archetypes) {
      const brief = worldBrief(S, archetype.id);
      for (const phrase of Object.values(AGE_WORDS_IN_CANON)) expect(brief, `${archetype.id}: ${phrase}`).toContain(phrase);
      for (const id of archetype.startingAbilities) expect(brief, `${archetype.id}/${id}`).toContain(ability(id).name);
    }
  });
});

describe('the cover and the ids', () => {
  it('puts the title in the art and her alone in front', () => {
    const cover = S.coverDirection;
    expect(cover).toContain("spelled exactly ICE QUEEN'S FAKE BOYFRIEND");
    expect(cover).toContain('Akane Hollis');
    expect(cover).toContain('An adult woman');
    expect(cover).toMatch(/No other text anywhere/);
    expect(S.characters[0]?.id).toBe('akane');
  });

  it('mirrors Good Morning, Husband on ids and asset keys', () => {
    expect(GOOD_MORNING_HUSBAND.id).toBe('sv_good_morning_husband_1');
    expect(S.id).toBe(`sv_${SLUG}_1`);
    expect(S.storyId).toBe(`story_${SLUG}`);
    expect(S.version).toBe(GOOD_MORNING_HUSBAND.version);
    expect(S.openingPanel?.assetKey).toBe(`story_${SLUG}/opening`);
    expect(GOOD_MORNING_HUSBAND.openingPanel?.assetKey).toBe(`${GOOD_MORNING_HUSBAND.storyId}/opening`);
    expect(S.openingPanel!.alt.length).toBeLessThanOrEqual(200);
    // Raw, like its model: no art is declared by hand.
    expect(S.coverImage).toBeNull();
    expect(S.keyArt).toBeNull();
    for (const c of S.characters) expect(c.portrait, c.id).toBeNull();
    expect(S.publishedAt).toBeNull();
    const derived = withDerivedAssetKeys(S);
    expect(derived.coverImage).toBe(`story_${SLUG}/cover`);
    expect(derived.keyArt).toBe(`story_${SLUG}/key`);
    expect(derived.characters.find((c) => c.id === 'akane')?.portrait).toBe(`story_${SLUG}/akane`);
    expect(derived.locations.find((l) => l.id === 'founders_quad')?.stageImage).toBe(`story_${SLUG}/stage_founders_quad`);
  });
});

describe('she can say no, and the week ends whatever the player does', () => {
  it('starts on the quad with exactly the two people in the opener', () => {
    expect(S.rules.startingLocationId).toBe('founders_quad');
    expect(S.rules.startWorldMinute).toBe(12 * 60 + 40);
    expect(charactersPresent(start()).map((c) => c.characterId).sort()).toEqual(['akane', 'darren']);
  });

  it('starts her as a stranger with a wall, not a fan', () => {
    const akane = S.characters.find((c) => c.id === 'akane')!;
    expect(akane.startingRelationship.trust).toBeLessThan(30);
    expect(akane.startingRelationship.affection).toBeLessThan(akane.startingRelationship.respect);
    expect(akane.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(akane.secrets.length).toBeGreaterThanOrEqual(2);
    expect(S.resources.find((r) => r.id === 'frost')!.start).toBeGreaterThanOrEqual(60);
  });

  it('puts her four rules and the favour where the storyteller reads them', () => {
    const canon = S.rules.hardCanon.join(' ');
    for (const rule of ['rule one', 'rule two', 'rule three', 'rule four', 'one favour']) expect(canon).toContain(rule);
    expect(canon).toMatch(/It was not random/);
    expect(S.items.find((i) => i.id === 'the_deal')!.questItem).toBe(true);
  });

  it('earns the romance and never forces it', () => {
    const romance = S.characters.find((c) => c.id === 'akane')!.gates.find((g) => g.kind === 'ROMANCE')!;
    expect(romance.requires.trust).toBeGreaterThanOrEqual(60);
    expect(romance.requires.affection).toBeGreaterThanOrEqual(60);
    const say = steps.find((s) => s.id === 'say_what_this_is')!;
    const real = say.succeedWhenAny.find((r) => r.routeId === 'made_it_real')!;
    expect(real.predicate.minRelationship.length).toBeGreaterThanOrEqual(2);
    // The honest default: the clock ends it and nobody said anything.
    const last = say.succeedWhenAny.at(-1)!;
    expect(last.predicate.flagsSet).toEqual(['midnight_passed']);
    expect(last.predicate.minRelationship).toEqual([]);
  });

  it('lets the player refuse the deal outright, or ask for the real thing', () => {
    const terms = steps.find((s) => s.id === 'the_terms')!;
    for (const id of ['turned_her_down', 'asked_for_real']) {
      const r = terms.succeedWhenAny.find((x) => x.routeId === id)!;
      expect(r.closesFlags, id).toContain('deal_struck');
    }
  });

  it('holds the announcement on Saturday at nine unless somebody stops it', () => {
    const announce = S.worldEvents.find((e) => e.id === 'we_the_announcement')!;
    expect(announce.atWorldMinute).toBe(5 * 1440 + 21 * 60);
    expect(announce.requiresFlags).toEqual([]);
    expect(announce.cancelledByFlags).toEqual(['announcement_stopped']);
    const speeches = steps.find((s) => s.id === 'the_speeches')!;
    for (const r of speeches.succeedWhenAny.slice(0, -1)) expect(r.setsFlags, r.routeId).toContain('announcement_stopped');
    expect(speeches.succeedWhenAny.at(-1)!.predicate.flagsSet).toEqual(['announcement_made']);
  });

  it('runs the deal out at midnight after the gala', () => {
    const midnight = S.worldEvents.find((e) => e.id === 'we_midnight')!;
    expect(midnight.atWorldMinute).toBe(6 * 1440);
    expect(midnight.requiresFlags).toEqual(['deal_struck']);
    for (const f of midnight.cancelledByFlags) expect(canBeSet(f), f).toBe(true);
  });

  it('tells the storyteller what day each event lands on, since it never sees the clock', () => {
    const DAY = /\b(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\b/;
    for (const e of S.worldEvents) expect(`${e.publicCopy} ${e.directorNotes}`, e.id).toMatch(DAY);
  });

  it('keeps every schedule whole, from midnight to midnight', () => {
    for (const c of S.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]?.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)?.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i += 1) expect(blocks[i]!.startMinute, `${c.id} #${i}`).toBe(blocks[i - 1]!.endMinute);
    }
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
      expect(c.gates.length, `${c.id} has no gate`).toBeGreaterThan(0);
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
      ['rules by number', /\bRule (?:one|two|three|four)\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('uses expressions the generator draws and short names nobody shares', () => {
    for (const c of S.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
    const names = S.characters.map((c) => calledName(c));
    expect(new Set(names).size, names.join(', ')).toBe(names.length);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward, together with its gate flag', () => {
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      const granting = steps.filter((s) => s.rewards.abilities.includes(a.id));
      expect(granting.length, `${a.id} is never granted`).toBeGreaterThan(0);
      expect(a.requires?.flagsSet.length, `${a.id} has no gate flag`).toBeGreaterThan(0);
      for (const flag of a.requires!.flagsSet) {
        expect(
          granting.some((s) => s.rewards.flags.includes(flag)),
          `${a.id} is granted by a step that does not set ${flag}`,
        ).toBe(true);
      }
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byou/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
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
    const skillIds = new Set(S.skills.map((s) => s.id));
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
    for (const a of S.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const i of S.items) {
      for (const skill of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(skill)) broken.push(`${i.id} modifies ${skill}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const skill of Object.keys(a.skillProficiencies)) if (!skillIds.has(skill)) broken.push(`${a.id} trains ${skill}`);
    }
    for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    for (const i of S.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(S.rules.startingLocationId)) broken.push(`startingLocationId ${S.rules.startingLocationId}`);
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
    expect(broken, `dangling references: ${broken.join('; ')}`).toEqual([]);
  });

  it('never reads a flag nothing can set', () => {
    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!canBeSet(f)) dead.push(`${where} needs ${f}`);
    };
    for (const q of S.quests) {
      if (q.discoverWhen) check(q.id, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(st.id, p.flagsSet);
        for (const r of st.succeedWhenAny) check(`${st.id}/${r.routeId}`, [...r.predicate.flagsSet, ...r.predicate.flagsUnset]);
      }
    }
    for (const c of S.characters) for (const g of c.gates) check(g.id, g.requires.flagsSet);
    for (const e of S.worldEvents) check(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const e of S.endings) check(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const a of S.abilities) if (a.requires) check(a.id, a.requires.flagsSet);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    expect(dead, dead.join('; ')).toEqual([]);
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
    for (const { step, route } of routes) {
      for (const f of route.predicate.flagsSet) {
        if (f.startsWith('used:')) expect(grantable.has(f.slice(5)), `${step}/${route.routeId}: ${f}`).toBe(true);
      }
      for (const i of route.predicate.hasItems) expect(obtainable.has(i), `${step}/${route.routeId}: ${i}`).toBe(true);
    }
  });

  it('closes only flags that something sets, and closes something somewhere', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
    for (const { step, route } of routes) {
      for (const f of route.closesFlags) expect(canBeSet(f), `${step}/${route.routeId} closes ${f}`).toBe(true);
    }
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const block = c.schedule.find((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(block !== undefined || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of S.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
        }
      }
    }
    const clashes = [...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias);
    expect(clashes).toEqual([]);
  });

  it('keeps archetype names out of the world itself', () => {
    const world = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
    for (const a of S.archetypes) expect(world, a.id).not.toContain(a.name);
  });
});

describe('the choices say what they do', () => {
  it('clears the choice-clarity checker with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/fixed for the whole story/);
    const tagSets = S.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('describes every ability in one short line that says whether it can fail and what it costs', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('gives every job one ability the storyteller can read', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(1);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id}/${id}`).toBe(true);
    }
  });
});

describe('it can end badly, early and in many ways', () => {
  it('has exactly the twelve endings the storyteller reads', () => {
    expect(S.endings).toHaveLength(12);
    for (const e of S.endings) {
      expect(e.minTurn, e.id).toBeGreaterThanOrEqual(18);
      expect(e.minTurn, e.id).toBeLessThanOrEqual(34);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_the_announcement', 'end_the_clause', 'end_not_my_problem', 'end_front_page'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
    // Doing nothing all week reaches one: the announcement needs no player flag.
    const nothing = S.endings.find((e) => e.id === 'end_the_announcement')!;
    expect(nothing.requires.flagsSet).toEqual(['announcement_made']);
  });

  it('can actually meet the reputation its endings ask for', () => {
    for (const e of S.endings) {
      for (const need of e.requires.minFactionReputation) {
        const f = S.factions.find((x) => x.id === need.factionId)!;
        const fromArchetype = Math.max(
          0,
          ...S.archetypes.flatMap((a) => a.startingReputation.filter((r) => r.factionId === f.id).map((r) => r.amount)),
        );
        const fromSteps = steps
          .flatMap((s) => s.rewards.reputation)
          .filter((r) => r.factionId === f.id)
          .reduce((sum, r) => sum + r.amount, 0);
        expect(f.startingReputation + fromArchetype + fromSteps, `${e.id} on ${f.id}`).toBeGreaterThanOrEqual(need.value);
      }
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

  it('lets rest restore the week and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['energy']);
  });

  it('makes a fight on the quad a gossip problem and a council matter first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(S.factions[0]?.id).toBe('faction_council');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('thaws her guard slowly on its own', () => {
    const frost = S.resources.find((r) => r.id === 'frost')!;
    expect(frost.regenPerHour).toBeLessThan(0);
  });
});

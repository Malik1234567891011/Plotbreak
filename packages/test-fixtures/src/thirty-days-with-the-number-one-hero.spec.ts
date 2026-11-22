import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { THIRTY_DAYS_WITH_THE_NUMBER_ONE_HERO } from './thirty-days-with-the-number-one-hero.js';

/**
 * Thirty Days With the Number One Hero, held to the promises on its own card:
 * a fake relationship with a real audience, a hero who asks before he holds
 * your hand, a villain who never lies to you, and a breakup that was written
 * before you met.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalogue-wide specs do not see
 * it. The structural checks they would run are repeated here against this one
 * world, alongside the three checks every new story runs and the opener rules
 * from the stories plan.
 */

const S = THIRTY_DAYS_WITH_THE_NUMBER_ONE_HERO;

const start = (archetypeId = 'arch_words') =>
  createInitialState({
    sessionId: 'sess_thirty_days',
    story: S,
    identity: {
      displayName: 'Alex Moreau',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const step = (id: string) => steps.find((s) => s.id === id)!;
const routes = steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ step: s.id, route })));
const words = (text: string) => text.split(/\s+/).filter(Boolean);
const DAY = 1440;

/** Ages as the bible states them. The player is twenty-three. */
const AGES: Record<string, number> = { ace: 27, shade: 28, jo: 24, mira: 36, kite: 29, dex: 31 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  ace: 'twenty-seven',
  shade: 'twenty-eight',
  jo: 'twenty-four',
  mira: 'thirty-six',
  kite: 'twenty-nine',
  dex: 'thirty-one',
};

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
    const { checkStoryClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(S);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const missing = report.issues.filter((i) => i.code.startsWith('MISSING_') && !i.message.startsWith('Opening:'));
    expect(missing.map((i) => i.code)).toEqual([]);
  });

  it('meets the content bar for a world: premise, promises, cast and cards', () => {
    const paragraphs = S.premise.split('\n\n');
    expect(words(S.premise).length).toBeGreaterThanOrEqual(100);
    expect(words(S.premise).length).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(S.promises.length).toBeGreaterThanOrEqual(5);
    expect(new Set(S.promises.map((p) => p.kind)).size).toBe(S.promises.length);
    expect(S.characters.length).toBeGreaterThanOrEqual(4);
    expect(S.rules.startingItems.length).toBeGreaterThan(0);
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('keeps everything a 13+ reader sees on the right side of the line', () => {
    const everything = JSON.stringify(S);
    const FORBIDDEN =
      /\b(nude|naked|shirtless|topless|lingerie|underwear|cleavage|sexy|seduc\w*|undress\w*|gore|blood\w*|suicid\w*|self-harm|corpse)\b/i;
    expect(everything).not.toMatch(FORBIDDEN);
    expect(S.rules.allowsRomance).toBe(true);
    expect(S.rules.toneGuide).toMatch(/at most as far as a kiss/);
    expect(S.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
    expect(S.contentDescriptors).toContain('FANTASY_VIOLENCE');
  });

  it('uses no franchise vocabulary for powers', () => {
    const everything = JSON.stringify(S);
    expect(everything).not.toMatch(/\b(quirk\w*|nen|chakra|hokage|ki blast|one for all|plus ultra)\b/i);
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
    expect(head).toContain('Ace Valor');
    expect(head).toContain('"Smile," he says');
  });

  it('ends on a question the player has to answer now, in front of everybody', () => {
    expect(S.opening.trim()).toMatch(/"So," the reporter shouts, "how long have you two been together\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the hero, introduced in the same sentence as what he is, may appear.
    const ALLOWED = new Set(['Ace', 'Valor', 'I']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/\b[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
    expect(S.opening).toContain('Ace Valor, the number one hero in the city');
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one lets go of his hand in front of forty cameras.
    expect(risky).toMatch(/let go of his hand/);
    expect(risky).toMatch(/microphone/);
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
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-three');
    expect(canon).toContain('after university');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(calledName(c));
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
  });

  it('describes people by build and clothes, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl\w*|boy\w*|young\w*|youth\w*|kid\w*|child\w*|minor|student|schoolgirl|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An adult\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('hands the production storyteller every age, whichever job the player picks', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    for (const archetype of S.archetypes) {
      const brief = worldBrief(S, archetype.id);
      expect(brief, archetype.id).toContain('Ace Valor is twenty-seven');
      expect(brief, archetype.id).toContain('Silver Kite twenty-nine');
      for (const id of archetype.startingAbilities) expect(brief, `${archetype.id}/${id}`).toContain(ability(id).name);
    }
  });
});

describe('the cover', () => {
  it('puts the title in the art and the hero in front', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('THIRTY DAYS WITH THE NUMBER ONE HERO');
    expect(cover).toContain('Ace Valor');
    expect(cover).toContain('Shade');
    expect(cover).toMatch(/no letters on the backdrop, no numbers/i);
    expect(S.openingPanel?.assetKey).toBe('story_thirty_days_with_the_number_one_hero/opening');
    expect(S.publishedAt).toBeNull();
  });
});

describe('a fake relationship with a real audience', () => {
  it('starts on the press stage with the hero, his manager and the streamer in the crowd', () => {
    expect(S.rules.startingLocationId).toBe('tower_plaza');
    expect(S.rules.startWorldMinute).toBe(11 * 60 + 5);
    expect(charactersPresent(start()).map((c) => c.characterId).sort()).toEqual(['ace', 'dex', 'mira']);
  });

  it('gives the agreement a deadline the same afternoon', () => {
    const [obligation] = S.openingObligations;
    expect(obligation?.withCharacterId).toBe('mira');
    expect(S.rules.startWorldMinute + obligation!.dueInMinutes).toBe(17 * 60);
  });

  it('makes him ask before he touches the player, every time', () => {
    const ace = S.characters.find((c) => c.id === 'ace')!;
    expect(ace.boundaries[0]).toMatch(/never touch the player without asking/i);
    expect(S.rules.hardCanon.join(' ')).toMatch(/asks before he touches the player’s hand, every single time/);
    expect(ace.voiceSamples[0]).toMatch(/^Is it okay if I hold your hand\?/);
  });

  it('lets the player refuse the whole deal and still have a story', () => {
    const deal = step('the_agreement_step');
    const refuse = deal.succeedWhenAny.find((r) => r.routeId === 'refused_the_deal')!;
    expect(refuse.setsFlags).toContain('refused_the_deal');
    expect(refuse.closesFlags).toEqual(expect.arrayContaining(['signed', 'fake_dating']));
    expect(S.endings.some((e) => e.requires.flagsSet.includes('refused_the_deal'))).toBe(true);
    // Every signed-only event switches itself off for a player who said no.
    for (const e of S.worldEvents.filter((x) => x.requiresFlags.includes('signed'))) {
      expect(e.cancelledByFlags, e.id).toContain('refused_the_deal');
    }
  });

  it('earns the romance and never forces it', () => {
    const ace = S.characters.find((c) => c.id === 'ace')!;
    const romance = ace.gates.find((g) => g.kind === 'ROMANCE')!;
    expect(romance.requires.trust).toBeGreaterThanOrEqual(50);
    expect(romance.requires.affection).toBeGreaterThanOrEqual(50);
    const stay = step('day_thirty_one').succeedWhenAny.find((r) => r.routeId === 'stayed_together')!;
    expect(stay.predicate.minRelationship.length).toBeGreaterThanOrEqual(1);
    // The honest default: the month ends and the player goes home.
    const home = step('day_thirty_one').succeedWhenAny.at(-1)!;
    expect(home.routeId).toBe('walked_away_clean');
    expect(home.predicate.minRelationship).toEqual([]);
    expect(home.predicate.flagsSet).toEqual(['vote_called']);
    // Keeping it a job is a real way through the off-camera step.
    const job = step('off_camera').succeedWhenAny.find((r) => r.routeId === 'kept_it_professional')!;
    expect(job.predicate.minRelationship).toEqual([]);
  });

  it('only lets the player use his real name once he has given it', () => {
    const nate = ability('call_him_nate');
    expect(nate.unlockedByDefault).toBe(false);
    expect(nate.requires.flagsSet).toEqual(['knows:his_name']);
    expect(nate.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(nate.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
    const givers = routes.filter(({ route }) => route.setsFlags.includes('knows:his_name'));
    expect(givers.length).toBeGreaterThanOrEqual(2);
  });
});

describe('the gala is on day thirty whatever the player does', () => {
  it('holds the gala at seven on day thirty with nothing able to stop it', () => {
    const gala = S.worldEvents.find((e) => e.id === 'we_gala_night')!;
    expect(gala.atWorldMinute).toBe(29 * DAY + 19 * 60);
    expect(gala.requiresFlags).toEqual([]);
    expect(gala.cancelledByFlags).toEqual([]);
  });

  it('plays the footage at half past nine unless somebody got there first', () => {
    const broadcast = S.worldEvents.find((e) => e.id === 'we_the_broadcast')!;
    expect(broadcast.atWorldMinute).toBe(29 * DAY + 21 * 60 + 30);
    expect(broadcast.cancelledByFlags).toEqual(expect.arrayContaining(['the_truth_is_out', 'shade_stood_down']));
    for (const f of broadcast.cancelledByFlags) expect(canBeSet(f), f).toBe(true);
  });

  it('always reaches a verdict: either the truth comes out or Shade stood down', () => {
    const vote = step('the_vote');
    const shade = vote.succeedWhenAny.find((r) => r.routeId === 'shade_played_it')!;
    expect(shade.predicate.flagsSet).toEqual(['shade_broadcast']);
    const lie = vote.succeedWhenAny.find((r) => r.routeId === 'the_lie_held')!;
    expect(lie.predicate.flagsSet).toEqual(['gala_night', 'shade_stood_down']);
  });

  it('tells the storyteller what day each event lands on, since its clock turns to weeks', () => {
    for (const e of S.worldEvents) {
      const m = e.publicCopy.match(/^Day (\d+), (\d\d):(\d\d)\./);
      expect(m, e.id).not.toBeNull();
      const [, day, hh, mm] = m!;
      expect((Number(day) - 1) * DAY + Number(hh) * 60 + Number(mm), e.id).toBe(e.atWorldMinute);
    }
  });
});

describe('the villain who noticed you', () => {
  it('never lies to the player, and the storyteller is told so', () => {
    const shade = S.characters.find((c) => c.id === 'shade')!;
    expect(shade.boundaries.join(' ')).toMatch(/Never lies to the player/);
    expect(S.rules.hardCanon.join(' ')).toMatch(/never lies to the player/);
  });

  it('only answers the signal once he has given it', () => {
    const light = ability('leave_a_light_on');
    expect(light.unlockedByDefault).toBe(false);
    expect(light.requires.flagsSet).toEqual(['shade_gave_signal']);
    expect(step('the_fire_escape').rewards.flags).toContain('shade_gave_signal');
    expect(step('the_fire_escape').rewards.abilities).toContain('leave_a_light_on');
  });

  it('keeps the old cinema hidden until the mask comes off', () => {
    const cinema = S.locations.find((l) => l.id === 'the_starlight')!;
    expect(cinema.discoveredByDefault).toBe(false);
    const way = S.locations.flatMap((l) => l.connections).find((c) => c.to === 'the_starlight')!;
    expect(way.lockedByFlag).toBe('knows:the_starlight');
    expect(step('the_mask').rewards.flags).toContain('knows:the_starlight');
  });

  it('has an ending for falling for him, for backing him, and for stopping him', () => {
    for (const flag of ['with_shade', 'shade_played_it', 'shade_stood_down']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });
});

describe('the mystery is optional and pays out', () => {
  it('opens the archive only once the player knows something happened', () => {
    const way = S.locations.flatMap((l) => l.connections).find((c) => c.to === 'tower_archive')!;
    expect(way.lockedByFlag).toBe('knows:the_archive');
    expect(step('what_was_he_doing').rewards.flags).toEqual(
      expect.arrayContaining(['knows:something_happened', 'knows:the_archive']),
    );
  });

  it('offers more than one door into it', () => {
    expect(step('what_was_he_doing').succeedWhenAny.length).toBeGreaterThanOrEqual(4);
    expect(step('the_footage').succeedWhenAny.length).toBeGreaterThanOrEqual(3);
  });

  it('only hands over the footage once the player holds it', () => {
    const play = ability('play_the_footage');
    expect(play.unlockedByDefault).toBe(false);
    expect(play.requires.flagsSet).toEqual(['footage_in_hand']);
    expect(step('the_footage').rewards.abilities).toContain('play_the_footage');
  });

  it('leaves most endings open to a player who never asks about Ferris Street', () => {
    const MYSTERY = /^(knows:ferris_street|knows:rafe_quinn|has_the_footage|footage_in_hand|you_played_it)$/;
    const open = S.endings.filter((e) => !e.requires.flagsSet.some((f) => MYSTERY.test(f)));
    expect(open.length).toBeGreaterThanOrEqual(8);
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
      ['forecasts', /\bForecast:/],
      ['triage', /\bTriage\b/],
      ['deal offers', /\bHere’s my offer\b/],
      ['addressing chat', /\bChat,/],
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
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} checks ${a.check.skillId}`);
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const i of S.items) {
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} modifies ${s}`);
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
    for (const o of S.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
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
        for (const r of st.succeedWhenAny) check(`${st.id}/${r.routeId}`, r.predicate.flagsSet);
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
    for (const { step: id, route } of routes) {
      for (const f of route.predicate.flagsSet) {
        if (f.startsWith('used:')) expect(grantable.has(f.slice(5)), `${id}/${route.routeId}: ${f}`).toBe(true);
      }
      for (const i of route.predicate.hasItems) expect(obtainable.has(i), `${id}/${route.routeId}: ${i}`).toBe(true);
    }
  });

  it('closes only flags that something sets, and closes something somewhere', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
    for (const { step: id, route } of routes) {
      for (const f of route.closesFlags) expect(canBeSet(f), `${id}/${route.routeId} closes ${f}`).toBe(true);
    }
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const block = c.schedule.find((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(block !== undefined || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('covers every minute of every day in every schedule', () => {
    for (const c of S.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]!.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
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
    // Two archetype names found in canon read as things that coexist in the world.
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
    for (const a of S.archetypes) expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(1);
  });
});

describe('it can end badly, early and in many ways', () => {
  it('has exactly the twelve endings the storyteller reads', () => {
    expect(S.endings).toHaveLength(12);
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
    const losses = ['end_day_thirty_one', 'end_the_lie_held', 'end_clear_your_desk', 'end_wrong_spot', 'end_the_villain_was_right'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('can actually meet the reputation its rare endings ask for', () => {
    // Ceiling from the starting value, the best archetype bonus and every step reward.
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

  it('lets rest restore the day and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['energy']);
  });

  it('makes a fight in public the city looking harder first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(S.factions[0]?.id).toBe('faction_public');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

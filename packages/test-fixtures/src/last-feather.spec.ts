import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { StoryVersion, localizeStory } from '@plotbreak/contracts';
import { LAST_FEATHER } from './index.js';

/**
 * Last Feather, held to the findings it was written from.
 *
 * `docs/early-dropout-analysis.md` measured what loses players in turns 1–3:
 * an opening about somebody else, a first move that freezes the scene, three
 * names by reply 2, one person with two names, and 40-word option cards. Each
 * of those is a property of the authoring, so each is checked here rather than
 * remembered.
 */

const start = () =>
  createInitialState({
    sessionId: 'sess_lf',
    story: LAST_FEATHER,
    identity: {
      displayName: 'Noa Castellane',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId: 'arch_fast',
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

describe('the opening is about you, and Sera is in it', () => {
  it('opens on the player, in the second person, on the first word', () => {
    expect(LAST_FEATHER.opening.startsWith('You died at 2:14.')).toBe(true);
  });

  it('puts Sera in the kitchen on turn one', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present, 'nobody is in the room the story opens in').toContain('sera');
  });

  it('keeps Vael behind the door, and everybody else out of the opening scene', () => {
    const present = new Set(charactersPresent(start()).map((c) => c.characterId));
    expect(present.has('vael'), 'Vael is in the kitchen; he should be knocking').toBe(false);
    expect(present.has('mika')).toBe(false);
    expect(present.has('orin')).toBe(false);
    const vaelAt = locationForSchedule(
      LAST_FEATHER.characters.find((c) => c.id === 'vael')!.schedule,
      LAST_FEATHER.rules.startWorldMinute,
    );
    expect(vaelAt).toBe('landing');
  });

  it('names only Sera in the opening prose, and only Sera and Vael on the prologue', () => {
    const named = LAST_FEATHER.characters.filter((c) => LAST_FEATHER.opening.includes(c.name)).map((c) => c.id);
    expect(named).toEqual(['sera']);
    const prologueText = LAST_FEATHER.prologue.map((p) => `${p.headline} ${p.subline}`).join(' ');
    for (const c of LAST_FEATHER.characters) {
      if (c.id === 'sera' || c.id === 'vael') continue;
      expect(prologueText, `${c.name} is introduced before turn 4`).not.toContain(c.name);
    }
  });

  it('gives every person one single-word name', () => {
    // Second Skin's Ren was also "Maren Tovi" on the speaker label, which read
    // as two different people.
    for (const c of LAST_FEATHER.characters) {
      expect(c.name.split(/\s+/), c.id).toHaveLength(1);
      expect(c.calledName ?? c.name).toBe(c.name);
    }
  });
});

describe('the first move escalates', () => {
  it('offers three short options of 15–25 words', () => {
    expect(LAST_FEATHER.openingSuggestions).toHaveLength(3);
    for (const option of LAST_FEATHER.openingSuggestions) {
      expect(words(option), option).toBeGreaterThanOrEqual(15);
      expect(words(option), option).toBeLessThanOrEqual(25);
    }
  });

  it('never makes the first move holding somebody back', () => {
    // "I turn to Ren. 'Do not.'" ended 16 of 17 Second Skin sessions by turn 3.
    const RESTRAINT = /\b(do not|don['’]t|stop|wait|stay|hold (?:on|her|him) back)\b/i;
    for (const option of LAST_FEATHER.openingSuggestions) {
      expect(RESTRAINT.test(option), option).toBe(false);
    }
  });

  it('tells the storyteller nobody orders the player to stay put early', () => {
    expect(LAST_FEATHER.rules.toneGuide).toMatch(/first three beats/i);
    expect(LAST_FEATHER.rules.toneGuide).toMatch(/nobody orders the player to stay/i);
  });
});

describe('the feathers', () => {
  const feathers = LAST_FEATHER.resources.find((r) => r.id === 'feathers')!;

  it('starts at seven, never regrows and is never on the screen', () => {
    expect(feathers.start).toBe(7);
    expect(feathers.max).toBe(7);
    expect(feathers.regenPerHour).toBe(0);
    expect(feathers.visible).toBe(false);
  });

  it('prices every miracle at exactly one feather', () => {
    const miracles = ['hide_us', 'stop_time', 'mend', 'open_any_door', 'her_sight', 'the_last_feather'];
    for (const id of miracles) {
      const ability = LAST_FEATHER.abilities.find((a) => a.id === id);
      expect(ability, id).toBeDefined();
      expect(ability!.costs.find((c) => c.resourceId === 'feathers')?.amount, id).toBe(1);
    }
  });

  it('only lets the last one be spent when it is the last one', () => {
    const last = LAST_FEATHER.abilities.find((a) => a.id === 'the_last_feather')!;
    expect(last.requires.maxResources).toEqual([{ resourceId: 'feathers', value: 1 }]);
  });

  it('carries the system where production can read it', () => {
    // `runTurnPure`'s world brief carries hard canon and the tone guide, not
    // `resources`. A feather system written only as a resource is invisible
    // to the storyteller that actually runs.
    const canon = LAST_FEATHER.rules.hardCanon.join(' ');
    expect(canon).toMatch(/seven feathers/i);
    expect(canon).toMatch(/costs Sera exactly one feather/i);
    expect(LAST_FEATHER.rules.toneGuide).toMatch(/Name the cost of every miracle/);
  });

  it('describes every band as behaviour, and reaches the ceiling', () => {
    for (const resource of LAST_FEATHER.resources) {
      expect(resource.visible, `${resource.id} is on the screen`).toBe(false);
      expect(resource.bands.length, resource.id).toBeGreaterThanOrEqual(3);
      for (const band of resource.bands) {
        expect(band.behaviour.length, `${resource.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(resource.name.toLowerCase());
      }
      expect(Math.max(...resource.bands.map((b) => b.upTo)), resource.id).toBe(resource.max);
    }
  });

  it('has something the player does that moves the chase', () => {
    for (const resource of LAST_FEATHER.resources) {
      if (resource.polarity !== 'GOOD_LOW') continue;
      const driven = LAST_FEATHER.abilities.some((a) => a.costs.some((c) => c.resourceId === resource.id));
      expect(driven, `nothing the player can do changes ${resource.id}`).toBe(true);
    }
  });
});

describe('the cast do not share a mouth', () => {
  it('gives everybody three or more voice samples', () => {
    for (const c of LAST_FEATHER.characters) {
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
    }
  });

  it('gives every character something to want, fear and refuse', () => {
    for (const c of LAST_FEATHER.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not trying to get anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      for (const secret of c.secrets) {
        expect(secret.revealHint.length, `${c.id}/${secret.id} has no way out`).toBeGreaterThan(10);
      }
    }
  });

  it('keeps Sera from lying and from giving orders', () => {
    const sera = LAST_FEATHER.characters.find((c) => c.id === 'sera')!;
    expect(sera.boundaries.join(' ')).toMatch(/Will not lie/);
    expect(sera.boundaries.join(' ')).toMatch(/Will not order the player/);
  });
});

describe('nobody lives in a corridor', () => {
  it('never schedules anybody asleep somewhere anybody can walk in', () => {
    const PUBLIC = new Set(['landing', 'street', 'roof', 'store', 'hospital', 'bridge', 'cathedral']);
    for (const c of LAST_FEATHER.characters) {
      for (const block of c.schedule) {
        if (!/asleep/i.test(block.activity)) continue;
        expect(PUBLIC.has(block.locationId), `${c.id} sleeps in ${block.locationId}`).toBe(false);
      }
    }
  });

  it('never lands somebody in the kitchen because their schedule ran out', () => {
    for (const c of LAST_FEATHER.characters) {
      const placed = locationForSchedule(c.schedule, LAST_FEATHER.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} has neither a scheduled place nor a home`).not.toBeNull();
      if (c.id === 'sera') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(
        LAST_FEATHER.rules.startingLocationId,
      );
    }
  });
});

describe('Last Feather as a world', () => {
  it('keeps the premise inside the length the schema asks for', () => {
    expect(words(LAST_FEATHER.premise)).toBeGreaterThanOrEqual(120);
    expect(words(LAST_FEATHER.premise)).toBeLessThanOrEqual(250);
  });

  it('does not print the answer to its own mystery on the store card', () => {
    // Why she refused is the `p_why` payoff. The bridge belongs to the run.
    for (const text of [LAST_FEATHER.premise, LAST_FEATHER.hook, LAST_FEATHER.creatorNote]) {
      expect(text.toLowerCase()).not.toContain('bridge');
    }
  });

  it('offers the six endings the bible names, and more than one loss', () => {
    expect(LAST_FEATHER.endings.map((e) => e.name)).toEqual([
      'Morning',
      'Mortal',
      'Ash',
      'The Ledger',
      'Fallen Together',
      'Walk Away',
    ]);
    const losses = LAST_FEATHER.endings.filter((e) =>
      /last_feather_gone|went_with_vael|sera_sent_away/.test(e.requires.flagsSet.join(' ')) &&
      !e.requires.flagsSet.includes('sera_chose_to_stay'),
    );
    expect(losses.length).toBeGreaterThanOrEqual(3);
  });

  it('plays a four-frame prologue: the night, Sera, Vael, the feathers', () => {
    expect(LAST_FEATHER.prologue.map((p) => p.assetKey)).toEqual([
      'story_last_feather/prologue/1',
      'story_last_feather/prologue/2',
      'story_last_feather/prologue/3',
      'story_last_feather/prologue/4',
    ]);
    expect(LAST_FEATHER.prologue.map((p) => p.headline)).toEqual([
      'You were supposed to die tonight.',
      'Sera',
      'Vael',
      'Seven feathers left.',
    ]);
    for (const panel of LAST_FEATHER.prologue) expect(panel.alt.length).toBeGreaterThan(40);
  });

  it('lets the player invent themselves', () => {
    expect(LAST_FEATHER.protagonist.kind).toBe('BLANK');
    expect(LAST_FEATHER.setupFields.map((f) => f.id)).toContain('displayName');
  });
});

describe('Dernière Plume', () => {
  // About 60% of our sessions see the French opening.
  const fr = localizeStory(LAST_FEATHER, 'fr');

  it('has French for the things a player reads first', () => {
    expect(fr.title).toBe('Dernière Plume');
    expect(fr.opening).not.toBe(LAST_FEATHER.opening);
    expect(fr.premise).not.toBe(LAST_FEATHER.premise);
    expect(fr.hook).not.toBe(LAST_FEATHER.hook);
    expect(fr.characters.find((c) => c.id === 'sera')!.voiceSamples).not.toEqual(
      LAST_FEATHER.characters.find((c) => c.id === 'sera')!.voiceSamples,
    );
  });

  it('keeps the French options short too', () => {
    expect(fr.openingSuggestions).toHaveLength(3);
    for (const option of fr.openingSuggestions) {
      expect(words(option), option).toBeGreaterThanOrEqual(15);
      expect(words(option), option).toBeLessThanOrEqual(25);
    }
  });

  it('translates prose and nothing the rules read', () => {
    // `localizeStory` writes whatever path it is given. A translated flag,
    // enum, expression or id is a French world whose endings and portraits
    // no longer match its own rules.
    expect(StoryVersion.safeParse(fr).success).toBe(true);
    const structure = (s: StoryVersion) => ({
      rules: [s.rules.defeatMode, s.rules.progressionMode, s.rules.startingLocationId],
      skills: s.skills.map((k) => [k.id, k.attribute]),
      abilities: s.abilities.map((a) => [a.id, a.tags, a.targetRule, a.check?.attribute, a.requires.flagsSet]),
      characters: s.characters.map((c) => [c.id, c.name, c.expressions, c.knowledgeScope, c.gates.map((g) => [g.kind, g.requires.flagsSet])]),
      quests: s.quests.map((q) => [q.kind, q.steps.map((st) => [st.rewards.flags, st.enterWhen?.flagsSet, st.succeedWhenAny.map((r) => [r.setsFlags, r.predicate.flagsSet])])]),
      events: s.worldEvents.map((e) => [e.setsFlags, e.requiresFlags, e.cancelledByFlags]),
      endings: s.endings.map((e) => [e.rarity, e.requires.flagsSet, e.requires.flagsUnset]),
      setup: s.setupFields.map((f) => [f.id, f.kind]),
      prologue: s.prologue.map((p) => p.assetKey),
    });
    expect(structure(fr)).toEqual(structure(LAST_FEATHER));
  });
});

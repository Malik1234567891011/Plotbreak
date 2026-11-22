import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { SKILL_ERROR } from './skill-error.js';

/**
 * Skill: ERROR, held to the promises on its own card: a skill that grows each
 * time you use it, a court that wants it controlled, and nobody in the cast who
 * is only there to react to the player.
 *
 * It is also the pilot for fifty stories, so the checks a writer is most likely
 * to get wrong without noticing live here: the system has to be readable by
 * the storyteller that production actually runs, the opener has to hand the
 * player a choice inside a hundred and twenty words, and every person on the
 * page is an adult on the page.
 */

const S = SKILL_ERROR;

const start = (archetypeId = 'arch_ops') =>
  createInitialState({
    sessionId: 'sess_skill_error',
    story: S,
    identity: {
      displayName: 'Sam Okafor',
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
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-four. */
const AGES: Record<string, number> = { selene: 24, aurelia: 22, daichi: 27, hask: 43, matthias: 52 };

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
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('Daichi');
    expect(head).toMatch(/"[^"]*\byou\b[^"]*"|"What did you get\?/);
  });

  it('ends on a demand the player has to answer', () => {
    expect(S.opening.trim()).toMatch(/"Kneel," he says, "and show us\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the coworker and the skill names read off the scroll may appear.
    const ALLOWED = new Set(['Daichi', 'Hero', 'Saint', 'Sword', 'ERROR', 'I']);
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
    // The risky one is the skill itself, used in front of the whole court.
    expect(risky).toMatch(/red line/);
  });
});

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding their window, with the ERROR and the counter on it', () => {
    // Production's storyteller reads quest items, never resources or the
    // ability list, so the window is a quest item the player starts with.
    const window = S.items.find((i) => i.id === 'status_window')!;
    expect(window.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('status_window');
    expect(window.description).toContain('ERROR');
    expect(window.description).toContain('3%');
  });

  it('gives every job the skill’s first stage, so the storyteller sees it', () => {
    // It only reads the chosen archetype's starting abilities.
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('read_window');
    expect(ability('read_window').unlockedByDefault).toBe(true);
  });

  it('spells out the growth order and the real name in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Read .*then .*Crash.*then .*Rewrite/);
    expect(canon).toContain('3% loaded');
    expect(canon).toContain('[Summoner]');
    expect(canon).toMatch(/red static/);
  });

  it('keeps literal window text out of the tone guide, which also feeds the cover', () => {
    expect(S.rules.toneGuide).not.toMatch(/\[|ERROR|%/);
  });
});

describe('the skill grows by being used, not by being narrated', () => {
  const ORDER: Array<[stage: string, previous: string, flag: string]> = [
    ['crash_skill', 'read_window', 'error:crash'],
    ['rewrite_line', 'crash_skill', 'error:rewrite'],
    ['open_the_circle', 'rewrite_line', 'error:full'],
  ];

  for (const [stage, previous, flag] of ORDER) {
    it(`unlocks ${stage} only after ${previous} has been used`, () => {
      const a = ability(stage);
      expect(a.unlockedByDefault).toBe(false);
      expect(a.requires.flagsSet).toEqual([flag]);
      expect(a.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);

      const granting = steps.filter((s) => s.rewards.abilities.includes(stage));
      expect(granting, `${stage} is granted by ${granting.length} steps`).toHaveLength(1);
      const step = granting[0]!;
      expect(step.rewards.flags).toContain(flag);
      expect(step.succeedWhenAny.length).toBeGreaterThanOrEqual(2);
      for (const route of step.succeedWhenAny) {
        expect(route.predicate.flagsSet, `${step.id}/${route.routeId}`).toContain(`used:${previous}`);
      }
    });
  }

  it('makes every use of the skill leak static', () => {
    for (const id of ['read_window', 'crash_skill', 'rewrite_line', 'open_the_circle']) {
      expect(ability(id).costs.map((c) => c.resourceId), id).toContain('overflow');
    }
  });

  it('chokes the two biggest stages when the static is already thick', () => {
    expect(ability('rewrite_line').requires.maxResources).toEqual([{ resourceId: 'overflow', value: 80 }]);
    expect(ability('open_the_circle').requires.maxResources).toEqual([{ resourceId: 'overflow', value: 60 }]);
  });
});

describe('the court wants it controlled, by law', () => {
  it('holds an Audit at the Cathedral on the third morning', () => {
    const audit = S.worldEvents.find((e) => e.id === 'we_the_audit')!;
    expect(audit.atWorldMinute).toBeGreaterThanOrEqual(3 * 1440);
    expect(audit.locationId).toBe('cathedral');
    expect(audit.setsFlags).toContain('audit_morning');
  });

  it('has a lawful verdict for each thing the court wants, and an ending for each', () => {
    const verdict = steps.find((s) => s.id === 'the_audit')!;
    const routes = verdict.succeedWhenAny.map((r) => r.routeId);
    expect(routes).toEqual(expect.arrayContaining(['registered', 'sealed']));
    for (const flag of ['registered_to_crown', 'sealed']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });

  it('lets the player keep it, too', () => {
    const verdict = steps.find((s) => s.id === 'the_audit')!;
    const free = verdict.succeedWhenAny.filter((r) => r.setsFlags.includes('unregistered'));
    expect(free.length).toBeGreaterThanOrEqual(2);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-four');
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
});

describe('the cover', () => {
  it('puts the title in the art and the glitch nowhere near her face', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('SKILL: ERROR');
    expect(cover).toContain('Selene');
    expect(cover).toMatch(/never on her face/i);
    expect(cover).toMatch(/no letters, no numbers/i);
  });
});

describe('nobody is only there to react', () => {
  it('starts the king, the mage and the coworker in the hall', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['selene', 'daichi', 'matthias']));
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

describe('it can end badly, early and in many ways', () => {
  it('lets the player walk away early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_the_crowns_weapon', 'end_sealed', 'end_north_with_the_others', 'end_too_large_to_display'];
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

  it('makes public violence raise the court’s suspicion before the static', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource in array order.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(S.factions[0]?.id).toBe('faction_crown');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

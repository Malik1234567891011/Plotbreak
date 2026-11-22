import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { withDerivedAssetKeys } from './derive-assets.js';
import { THE_RANKING_BOARD } from './the-ranking-board.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The Ranking Board, held to the slate's quality bar (docs/stories-50/PLAN.md
 * section 7) and to the promise on its own card: that the board is turn one,
 * and that saying no to it is a real answer rather than an absence.
 *
 * This world is not in `LAUNCH_CATALOG` yet, so the catalog-wide specs do not
 * see it. The structural checks they would run are repeated here against this
 * story directly, together with the three checks from
 * docs/stories-checkpoint.md that have each been hit more than once: a gated
 * ability nothing grants, a cardBlurb with no "you" in it, and a location
 * nothing points at.
 */

const story = THE_RANKING_BOARD;

const start = (archetypeId = 'arch_docks') =>
  createInitialState({
    sessionId: 'sess_trb',
    story,
    identity: {
      displayName: 'Jun Arashi',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Flags this world can actually write: rewards, routes, events, and the engine's own. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map']);
  for (const { step } of steps) {
    for (const flag of step.rewards.flags) flags.add(flag);
    for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (flag: string): boolean => ENGINE_PREFIXES.some((p) => flag.startsWith(p));

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

describe('identity and asset keys follow the house convention', () => {
  it('uses the story_the_ranking_board prefix everywhere a key is derived', () => {
    expect(story.id).toBe('sv_the_ranking_board_1');
    expect(story.storyId).toBe('story_the_ranking_board');
    expect(story.openingPanel?.assetKey).toBe('story_the_ranking_board/opening');
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage).toBe('story_the_ranking_board/cover');
    expect(derived.keyArt).toBe('story_the_ranking_board/key');
    for (const c of derived.characters) expect(c.portrait).toBe(`story_the_ranking_board/${c.id}`);
    for (const l of derived.locations) expect(l.stageImage).toBe(`story_the_ranking_board/stage_${l.id}`);
  });

  it('ships raw, with no art declared, because none has been generated', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    for (const c of story.characters) expect(c.portrait, c.id).toBeNull();
  });
});

describe('the opener (quality bar, item 1)', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', story.premise],
      ['opening', story.opening],
      ['hook', story.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const suggestion of story.openingSuggestions) expect(suggestion).not.toContain('\\n');
  });

  it('is at most 120 words', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking to the player inside the first 60 words', () => {
    const first60 = words(story.opening).slice(0, 60).join(' ');
    const speaker = story.characters.find((c) => first60.includes(calledName(c)));
    expect(speaker?.id, 'nobody is named in the first 60 words').toBe('tetsu');
    expect(first60, 'nobody speaks in the first 60 words').toMatch(/"[^"]+"/);
    expect(first60).toMatch(/\byour?\b/i);
  });

  it('ends on a direct question that needs an answer now', () => {
    expect(story.opening.trim()).toMatch(/\?"?$/);
  });

  it('uses no proper noun the player would have to know already', () => {
    // Every capitalised word that does not start a sentence or a line of
    // dialogue must be somebody the opening itself puts in front of you.
    const cast = new Set(story.characters.map((c) => calledName(c)));
    const chunks = story.opening
      .replace(/["“”]/g, '\n')
      .split(/(?<=[.!?:])\s+|\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const strangers: string[] = [];
    for (const chunk of chunks) {
      for (const word of words(chunk).slice(1)) {
        const clean = word.replace(/[^A-Za-z’'-]/g, '');
        if (/^[A-Z][a-z]/.test(clean) && !cast.has(clean)) strangers.push(clean);
      }
    }
    expect(strangers).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions.length).toBe(3);
    expect(said, 'the first card should be speech').toMatch(/^"/);
    expect(done, 'the second card should be an action').toMatch(/^I /);
    expect(risky, 'the third card should be an action').toMatch(/^I /);
    // The risky one goes over everybody's head, to the top of the board.
    expect(risky).toMatch(/number one/i);
    for (const s of story.openingSuggestions) {
      expect(s, s).toMatch(/\bI\b/);
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    // Ace's first card was read as an assault by the parser, and the player
    // got a fistfight for tapping dialogue. The risky card here is a public
    // challenge, not a punch, and the parser has to agree.
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });
});

describe('the board is turn one', () => {
  it('starts in the Yard at ten to eight on the first morning', () => {
    expect(story.rules.startingLocationId).toBe('the_yard');
    expect(story.rules.startWorldMinute).toBe(7 * 60 + 50);
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('student_card');
  });

  it('puts the man who shoved you, and your roommate, actually in the Yard', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('tetsu');
    expect(present).toContain('minho');
  });

  it('does not let the rest of the cast wander into the opening by default', () => {
    for (const c of story.characters) {
      const placed = locationForSchedule(c.schedule, story.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the starting minute`).not.toBeNull();
      if (c.id === 'tetsu' || c.id === 'minho') continue;
      expect(placed, `${c.id} arrives in the opening scene by default`).not.toBe(story.rules.startingLocationId);
    }
  });

  it('makes saying no a route rather than an absence', () => {
    const first = story.quests.find((q) => q.id === 'q_challenge_accepted')!;
    expect(first.startsActive).toBe(true);
    const walk = first.steps[0]!.succeedWhenAny.find((r) => r.routeId === 'walked_out')!;
    expect(walk, 'there is no way to say no').toBeDefined();
    expect(walk.setsFlags).toContain('white_flag');
    expect(walk.predicate.hasItems).toEqual([]);
    expect(walk.predicate.minRelationship).toEqual([]);
    // And a run that refuses still has somewhere to go.
    const later = routes.filter(({ route }) =>
      route.predicate.flagsSet.some((f) => f === 'white_flag' || f === 'flagged_for_term' || f === 'refused_the_board'),
    );
    expect(later.length, 'refusing dead-ends the story').toBeGreaterThanOrEqual(2);
    expect(story.endings.some((e) => e.requires.flagsSet.includes('never_ranked'))).toBe(true);
  });

  it('lets an instructor arrive to call it, so nobody takes a strike over a shove', () => {
    const dam = story.worldEvents.find((e) => e.id === 'we_dam_calls_it')!;
    expect(dam.locationId).toBe('the_yard');
    expect(dam.atWorldMinute).toBeGreaterThan(story.rules.startWorldMinute);
    expect(dam.movesCharacters).toEqual([{ characterId: 'dam', toLocationId: 'the_yard' }]);
  });
});

describe('adults only, 13+ content, and original (quality bar, items 2 and 3)', () => {
  const bible = readFileSync(
    new URL('../../../docs/story-bibles/new50/35_THE_RANKING_BOARD.md', import.meta.url),
    'utf8',
  );

  it('states an adult age for every character, in the bible and in the fixture', () => {
    for (const c of story.characters) {
      const heading = bible.match(new RegExp(`^### ${c.name}, (\\d+)`, 'm'));
      expect(heading, `${c.name} has no age in the bible`).not.toBeNull();
      const age = Number(heading![1]);
      expect(age, c.name).toBeGreaterThanOrEqual(18);
      expect(c.role, `${c.id}'s role does not carry the bible's age`).toContain(String(age));
    }
    expect(story.rules.hardCanon.join(' ')).toMatch(/eighteen or older/);
  });

  it('never describes anybody in words that read as a minor', () => {
    const MINOR = /\b(kids?|child|children|childlike|boys?|girls?|teens?|teenagers?|schoolboy|schoolgirl|high school|underage|minor|little sister|little brother|loli)\b/i;
    const text = JSON.stringify(story);
    expect(text.match(MINOR)?.[0] ?? null).toBeNull();
  });

  it('keeps the content inside a 13+ rating', () => {
    const ADULT = /\b(nude|naked|nudity|sex|sexual|sexy|breasts?|cleavage|lingerie|bikini|underwear|gore|gory|disembowel|suicide|self-harm|overdose)\b/i;
    expect(JSON.stringify(story).match(ADULT)?.[0] ?? null).toBeNull();
    expect(story.contentDescriptors).not.toContain('SUGGESTIVE_THEMES');
    expect(story.intensity).not.toBe('INTENSE');
  });

  it('borrows no franchise names or terms', () => {
    const FRANCHISE = /\b(quirk|nen|chakra|hokage|hunter association|system window|lookism|street fighter|tekken|ippo|kengan|baki|one punch|shonen jump|solo leveling)\b/i;
    expect(JSON.stringify(story).match(FRANCHISE)?.[0] ?? null).toBeNull();
    expect(bible.replace(/^\*\*Title collision.*$/m, '').match(FRANCHISE)?.[0] ?? null).toBeNull();
  });

  it('is written in English', () => {
    expect(story.sourceLocale).toBe('en');
  });
});

describe('the three checkpoint checks (docs/stories-checkpoint.md)', () => {
  it('1. grants every gated ability somewhere, and keeps it gated by a flag that can be set', () => {
    const granted = new Set([
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ...story.archetypes.flatMap((a) => a.startingAbilities),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length, 'this world means to gate two techniques').toBeGreaterThanOrEqual(2);
    for (const ability of gated) {
      expect(granted.has(ability.id), `${ability.id} is gated and nothing ever grants it`).toBe(true);
    }
    const flags = settable();
    for (const ability of story.abilities) {
      for (const flag of ability.requires.flagsSet) {
        if (engineSets(flag)) continue;
        expect(flags, `${ability.id} needs "${flag}", which nothing sets`).toContain(flag);
      }
      if (ability.requires.flagsSet.length > 0) {
        expect(ability.requires.lockedCopy.length, ability.id).toBeGreaterThan(30);
        expect(ability.requires.lockedCopy).not.toMatch(/flag|predicate|locked|requirement/i);
      }
    }
  });

  it('2. puts "you" in every cardBlurb, and says more than the role', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase()).not.toBe(c.role.toLowerCase());
      expect(/\byou\b/i.test(c.cardBlurb), `${c.id}: "${c.cardBlurb}"`).toBe(true);
    }
  });

  it('3. gives every location an inbound edge, and every edge a real destination', () => {
    const ids = new Set(story.locations.map((l) => l.id));
    for (const l of story.locations) {
      const inbound = story.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id));
      expect(inbound, `${l.id} has nothing pointing at it`).toBe(true);
      for (const c of l.connections) expect(ids, `${l.id} -> ${c.to}`).toContain(c.to);
    }
  });

  it('can walk to every location from the Yard, through locks that can be opened', () => {
    const flags = settable();
    const seen = new Set<string>([story.rules.startingLocationId]);
    const queue = [story.rules.startingLocationId];
    while (queue.length > 0) {
      const id = queue.shift()!;
      const here = story.locations.find((l) => l.id === id)!;
      for (const edge of here.connections) {
        if (edge.lockedByFlag) expect(flags, `${here.id}->${edge.to} is locked forever`).toContain(edge.lockedByFlag);
        if (!seen.has(edge.to)) {
          seen.add(edge.to);
          queue.push(edge.to);
        }
      }
    }
    expect([...seen].sort()).toEqual(story.locations.map((l) => l.id).sort());
  });
});

describe('every route can be taken and every reference resolves', () => {
  it('has real branches, and some of them close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const obtainable = new Set([
      ...story.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...story.rules.startingItems.map((i) => i.itemId),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
      ...story.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
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

  it('never demands the thing a step is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const itemId of step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)) {
        expect(granted.has(itemId), `${quest}/${step.id} awards the ${itemId} it demands`).toBe(false);
      }
    }
  });

  it('names only flags something in this world sets', () => {
    const flags = settable();
    const read: Array<[string, string]> = [];
    for (const e of story.endings) for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) read.push([`ending ${e.id}`, f]);
    for (const e of story.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) read.push([`event ${e.id}`, f]);
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) read.push([`quest ${q.id}`, f]);
      for (const s of q.steps) {
        for (const f of s.enterWhen?.flagsSet ?? []) read.push([`step ${s.id}`, f]);
        for (const r of s.succeedWhenAny) for (const f of [...r.predicate.flagsSet, ...r.predicate.flagsUnset]) read.push([`route ${r.routeId}`, f]);
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) read.push([`gate ${g.id}`, f]);
    for (const [where, flag] of read) {
      if (engineSets(flag)) continue;
      expect(flags, `${where} reads "${flag}", which nothing sets`).toContain(flag);
    }
  });

  it('never uses a relationship gate id as if it were a flag', () => {
    // The second most repeated authoring error: a gate opens a topic and
    // never writes anything.
    const gateIds = new Set(story.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const flags = settable();
    for (const id of gateIds) expect(flags.has(id), `${id} is a gate, not a flag`).toBe(false);
  });

  it('points only at things that exist', () => {
    const loc = new Set(story.locations.map((l) => l.id));
    const item = new Set(story.items.map((i) => i.id));
    const char = new Set(story.characters.map((c) => c.id));
    const res = new Set(story.resources.map((r) => r.id));
    const fac = new Set(story.factions.map((f) => f.id));
    for (const l of story.locations) {
      for (const t of l.takeableItems) {
        expect(item, `${l.id} offers ${t.itemId}`).toContain(t.itemId);
        if (t.ownerId) expect(char, `${l.id} owner ${t.ownerId}`).toContain(t.ownerId);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId) expect(loc, `${c.id} home`).toContain(c.homeLocationId);
      for (const b of c.schedule) expect(loc, `${c.id} scheduled at ${b.locationId}`).toContain(b.locationId);
    }
    for (const a of story.abilities) for (const cost of a.costs) expect(res, `${a.id} costs`).toContain(cost.resourceId);
    for (const a of story.abilities) if (a.countersTendency) expect(story.tendencies.map((t) => t.id)).toContain(a.countersTendency);
    for (const a of story.archetypes) {
      for (const i of a.startingItems) expect(item, `${a.id} item`).toContain(i.itemId);
      for (const r of a.startingReputation) expect(fac, `${a.id} rep`).toContain(r.factionId);
    }
    for (const f of story.factions) for (const x of [...f.allies, ...f.enemies]) expect(fac).toContain(x);
    for (const e of story.worldEvents) {
      if (e.locationId) expect(loc, e.id).toContain(e.locationId);
      for (const m of e.movesCharacters) {
        expect(char, e.id).toContain(m.characterId);
        expect(loc, e.id).toContain(m.toLocationId);
      }
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) expect(char, q.id).toContain(id);
      for (const id of q.involvedLocationIds) expect(loc, q.id).toContain(id);
      for (const s of q.steps) {
        for (const r of s.rewards.items) expect(item, s.id).toContain(r.itemId);
        for (const r of s.rewards.abilities) expect(story.abilities.map((a) => a.id), s.id).toContain(r);
        for (const r of s.rewards.reputation) expect(fac, s.id).toContain(r.factionId);
        for (const route of s.succeedWhenAny) {
          const p = route.predicate;
          if (p.atLocation) expect(loc, route.routeId).toContain(p.atLocation);
          for (const m of p.minRelationship) expect(char, route.routeId).toContain(m.characterId);
          for (const m of p.minFactionReputation) expect(fac, route.routeId).toContain(m.factionId);
        }
      }
    }
    for (const e of story.endings) {
      for (const m of e.requires.minRelationship) expect(char, e.id).toContain(m.characterId);
      for (const m of e.requires.minFactionReputation) expect(fac, e.id).toContain(m.factionId);
    }
  });

  it('gives every archetype something the rules can see', () => {
    for (const a of story.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, `${a.id} grants nothing`).toBeGreaterThan(0);
      for (const skill of Object.keys(a.skillProficiencies)) expect(story.skills.map((s) => s.id)).toContain(skill);
    }
  });
});

describe('the scandal is optional and behaves like it', () => {
  it('keeps the stand-down lead a lead', () => {
    const lead = story.quests.find((q) => q.id === 'q_stand_downs')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
  });

  it('keeps the break-in behind knowing where to look', () => {
    const forms = story.abilities.find((a) => a.id === 'pull_the_forms')!;
    expect(forms.unlockedByDefault).toBe(false);
    expect(forms.requires.flagsSet).toEqual(['knows:the_stand_downs']);
    // Only a person, a record or a spreadsheet teaches it; no world event
    // hands it to everybody.
    for (const event of story.worldEvents) expect(event.setsFlags).not.toContain('knows:the_stand_downs');
    const sources = routes.filter(({ route }) => route.setsFlags.includes('knows:the_stand_downs'));
    expect(sources.length).toBeGreaterThanOrEqual(3);
    for (const { route } of sources) {
      const deliberate =
        route.predicate.minRelationship.length > 0 ||
        route.predicate.hasItems.length > 0 ||
        route.predicate.flagsSet.some((f) => f.startsWith('used:'));
      expect(deliberate, `${route.routeId} hands the scandal to a player who did nothing`).toBe(true);
    }
  });

  it('leaves most of the ending space reachable without it', () => {
    const scandal = new Set(['table_exposed', 'used_as_leverage', 'proof_in_hand', 'knows:the_stand_downs']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => scandal.has(f)));
    expect(ordinary.length, 'the scandal gates too much').toBeGreaterThanOrEqual(9);
  });
});

describe('people, not numbers', () => {
  it('gives the number one limits, a want of her own and a way to refuse', () => {
    const soyeon = story.characters.find((c) => c.id === 'soyeon')!;
    expect(soyeon.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(soyeon.fears.length).toBeGreaterThanOrEqual(2);
    expect(soyeon.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(soyeon.secrets.length).toBeGreaterThanOrEqual(2);
    expect(soyeon.voiceSamples.length).toBeGreaterThanOrEqual(4);
    expect(soyeon.boundaries.join(' ').toLowerCase()).toContain('will not throw a fight');
  });

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.topics.length, `${c.id} cannot be asked about anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, `${c.id} has no declared voice`).toBeGreaterThan(60);
      expect(c.visualHook.length, `${c.id} is not memorable`).toBeGreaterThan(20);
      expect(c.gates.length, `${c.id} cannot be got closer to`).toBeGreaterThan(0);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('keeps every pair of them lexically apart', () => {
    const content = (text: string): Set<string> =>
      new Set(
        text
          .toLowerCase()
          .replace(/[^a-z\s]/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length > 3),
      );
    const vocab = new Map(story.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of story.characters) {
      for (const b of story.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w));
        const overlap = shared.length / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${shared.join(', ')}`).toBeLessThan(0.3);
      }
    }
  });

  it('does not let two of them run the same rhetorical move', () => {
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
      ['okay okay okay', /\bokay okay okay\b/i],
      ['understood?', /\bunderstood\?/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Tetsu talks about himself by his number when he is cocky.
    expect(sample('tetsu')).toMatch(/Eighty-seven/);
    // Soyeon states counts and measurements instead of opinions.
    expect(sample('soyeon')).toMatch(/four times|twelve days/);
    // Minho opens with the triple okay and lives in statistics.
    expect(sample('minho')).toMatch(/Okay okay okay/);
    expect(sample('minho').toLowerCase()).toContain('statistic');
    // Hajun says "we" when he means himself.
    expect(sample('hajun')).toMatch(/\bWe think\b/);
    // Nari names the anatomy and the centimetres.
    expect(sample('nari').toLowerCase()).toMatch(/centimetre|brow bone|ankle/);
    // Coach Dam calls you by your room number and ends on "Understood?".
    expect(sample('dam')).toMatch(/Four-Twelve/);
    expect(sample('dam')).toMatch(/Understood\?/);
  });

  it('lets the people who watch streams learn your habits', () => {
    const scouts = story.characters.filter((c) => c.scouting !== null).map((c) => c.id);
    expect(scouts).toEqual(expect.arrayContaining(['soyeon', 'hajun', 'tetsu']));
    const tendencies = new Set(story.tendencies.map((t) => t.id));
    for (const t of story.tendencies) {
      expect(story.abilities.some((a) => a.tendencies.includes(t.id)), `nothing feeds ${t.id}`).toBe(true);
      expect(story.abilities.some((a) => a.countersTendency === t.id), `nothing counters ${t.id}`).toBe(true);
    }
    for (const a of story.abilities) for (const t of a.tendencies) expect(tendencies).toContain(t);
  });

  it('uses expressions the generator draws and names no two people alike', () => {
    for (const c of story.characters) for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('the week can genuinely go wrong', () => {
  it('offers a loss reachable without a mistake', () => {
    // Watching Scout Night from the top row is what happens to a player who
    // simply does not climb. It must not need anything but the clock.
    const ending = story.endings.find((e) => e.id === 'end_scout_night_without_you')!;
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
    expect(ending.requires.flagsSet).toEqual(['scout_night']);
    const night = story.worldEvents.find((e) => e.id === 'we_scout_night')!;
    expect(night.requiresFlags).toEqual([]);
    expect(night.cancelledByFlags).toEqual([]);
  });

  it('lets somebody simply walk down the hill, and early', () => {
    const walk = story.endings.find((e) => e.id === 'end_pier_six')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('can expel you, and that comes from what you did', () => {
    const expelled = routes.filter(({ route }) => route.setsFlags.includes('expelled'));
    expect(expelled.length).toBeGreaterThan(0);
    const quest = story.quests.find((q) => q.id === 'q_outside_the_circle')!;
    expect(quest.discoverWhen?.flagsSet).toEqual(['used:settle_it_outside']);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.length).toBeGreaterThanOrEqual(10);
  });

  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_tetsu_goes_stale', 'we_tetsu_challenged', 'we_number_three_moves', 'we_hajun_sits_down', 'we_minho_wants_in']) {
      const event = story.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, `${id} fires whatever the player does`).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) {
        expect(flags.has(flag) || engineSets(flag), `${id} is cancelled by "${flag}", which nothing sets`).toBe(true);
      }
    }
  });
});

describe('four ladders, each climbable', () => {
  it('never gates on standing nothing can earn', () => {
    const earned = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of story.archetypes) {
      for (const entry of archetype.startingReputation) {
        const base = story.factions.find((f) => f.id === entry.factionId)!.startingReputation;
        earned.set(entry.factionId, Math.max(earned.get(entry.factionId)!, base + entry.amount));
      }
    }
    for (const { step } of steps) {
      for (const entry of step.rewards.reputation) earned.set(entry.factionId, (earned.get(entry.factionId) ?? 0) + entry.amount);
    }
    const gates = [
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) {
      expect(earned.get(gate.factionId) ?? -100, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const faction of story.factions) {
      expect(faction.ranks.length, faction.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...faction.ranks.map((r) => r.atReputation)), faction.id).toBeGreaterThan(faction.startingReputation);
    }
  });

  it('sends a fight outside the circle to the proctors first', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction and raises the FIRST GOOD_LOW
    // resource in array order.
    expect(story.factions[0]?.id).toBe('faction_proctors');
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('heat');
  });
});

describe('the state stays underneath the prose', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources.length).toBe(3);
    for (const r of story.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo} names itself`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore, and spends it first', () => {
    const high = story.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['wind']);
    const cheapest = [...high].sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('wind');
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of story.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
      expect(r.regenPerHour, `${r.id} never comes back down`).toBeLessThan(0);
    }
  });

  it('never drops a character into the opening by fallback', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    for (const c of story.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('covers every minute of every character’s day', () => {
    for (const c of story.characters) {
      const blocks = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(blocks[0]?.startMinute, c.id).toBe(0);
      expect(blocks.at(-1)?.endMinute, c.id).toBe(1440);
      for (let i = 1; i < blocks.length; i++) expect(blocks[i]!.startMinute, c.id).toBe(blocks[i - 1]!.endMinute);
    }
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('keeps the premise inside the window', () => {
    const n = words(story.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(250);
  });

  it('does not answer its own mystery on the store card', () => {
    const card = `${story.premise} ${story.hook} ${story.fantasyLabel}`.toLowerCase();
    for (const spoiler of ['shoulder', 'kwan', 'long table', 'hajun', 'stand-down', 'injur']) {
      expect(card, spoiler).not.toContain(spoiler);
    }
  });

  it('passes the narrative clarity validator with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('passes the choice clarity validator with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.optionId ?? '-'}: ${e.message}`)).toEqual([]);
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('has every ability state its own shape in under 120 characters', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('pays off five promises across the five kinds that matter here', () => {
    expect(story.promises.length).toBe(5);
    expect(new Set(story.promises.map((p) => p.kind))).toEqual(new Set(['FINALE', 'RIVAL', 'RELATIONSHIP', 'MYSTERY', 'THEME']));
  });
});

describe('the art and release pipeline (docs/stories-50/PIPELINE.md)', () => {
  const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;

  it('states every cast age in hard canon, where the storyteller reads it', () => {
    const canon = story.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/The player, a transfer, is an adult too\./);
    for (const c of story.characters) expect(canon, c.id).toContain(calledName(c));
  });

  it('describes people by build and costume, never by an age word', () => {
    for (const c of story.characters.filter((c) => c.cardBlurb.trim())) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(story.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('paints the title into the cover and keeps every effect off the faces', () => {
    const cover = story.coverDirection;
    expect(cover).toMatch(/TITLE: the words THE RANKING BOARD /);
    expect(cover).toContain('spelled exactly THE RANKING BOARD');
    expect(cover.toUpperCase()).toContain(story.title.toUpperCase());
    expect(cover).toContain('Soyeon');
    expect(cover).toMatch(/never on their faces/i);
    expect(cover).toMatch(/no letters, no numbers/i);
  });

  it('draws the opening panel around the man who speaks first', () => {
    const panel = story.openingPanel!;
    expect(panel.assetKey).toBe(`${story.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    const firstQuote = story.opening.search(/["“]/);
    const speaker = story.characters.find((c) => story.opening.slice(firstQuote, firstQuote + 80).includes(calledName(c)));
    expect(speaker?.id).toBe('tetsu');
    expect(panel.alt.startsWith(`${calledName(speaker!)},`)).toBe(true);
  });

  it('opens straight on the scene and is dated only at release', () => {
    expect(story.prologue ?? []).toHaveLength(0);
    expect(isReleaseDate(story.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('puts the board itself where the storyteller reads it', () => {
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('student_card');
    expect(story.items.find((i) => i.id === 'student_card')?.questItem).toBe(true);
    for (const a of story.archetypes) {
      expect(a.startingAbilities, a.id).toEqual(expect.arrayContaining(['call_out', 'walk_out']));
      expect(a.startingAbilities.length, a.id).toBeGreaterThanOrEqual(3);
      for (const id of a.startingAbilities) {
        expect(story.abilities.find((x) => x.id === id)?.unlockedByDefault, `${a.id}: ${id}`).toBe(true);
      }
    }
    expect(new Set(story.archetypes.map((a) => a.startingAbilities[2])).size).toBe(story.archetypes.length);
    expect(story.rules.toneGuide.trim().length).toBeGreaterThan(200);
    expect(story.characters.find((c) => c.id === 'dam')?.calledName).toBe('Coach Dam');
  });
});

import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { checkStoryChoiceClarity, checkStoryClarity } from '@plotbreak/director';
import { RESTART_AT_EIGHTEEN as story } from './restart-at-eighteen.js';

/**
 * Restart at Eighteen, held to the promise on its own card: one night, three
 * regrets inside one hour, and a player who knows exactly what is coming and
 * still has to persuade people to choose differently.
 *
 * The failures this world is most exposed to:
 *
 * - The window eats the story. A stat screen is the hook, and a world that
 *   leans on it turns into a spreadsheet with a party in the background.
 * - The night cannot go wrong. A do-over where every regret is fixable by
 *   being in the right place reads as a checklist, so the losses have to be
 *   reachable without a mistake.
 * - Somebody reads as younger than eighteen. Graduation night is exactly the
 *   setting where that slips in by accident, so it is checked as text.
 *
 * The world is not registered in `index.ts` yet, so the catalog-wide
 * invariants in `catalog.spec.ts`, `endings.spec.ts` and
 * `catalogue-invariants.spec.ts` do not reach it. The ones that matter are
 * repeated here, against this world only.
 */

const start = (archetypeId = 'arch_stayed') =>
  createInitialState({
    sessionId: 'sess_rae',
    story,
    identity: {
      displayName: 'Kai Moreno',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag a route, a step reward or a world event can set. */
const settable = new Set<string>([
  ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.flags)),
  ...routes.flatMap(({ route }) => route.setsFlags),
  ...story.worldEvents.flatMap((e) => e.setsFlags),
]);
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (flag: string): boolean =>
  flag === 'left_the_map' || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));
const canBeSet = (flag: string): boolean => settable.has(flag) || engineSets(flag);

const grantable = new Set<string>([
  ...story.archetypes.flatMap((a) => a.startingAbilities),
  ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
  ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
]);

describe('prose is prose', () => {
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

  it('keeps the premise in the length and shape the store card expects', () => {
    const paragraphs = story.premise.split('\n\n');
    expect(words(story.premise).length).toBeGreaterThanOrEqual(120);
    expect(words(story.premise).length).toBeLessThanOrEqual(240);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const paragraph of paragraphs) expect(words(paragraph).length, paragraph.slice(0, 40)).toBeLessThanOrEqual(70);
  });

  it('passes the premise and setup-screen clarity checks with no errors', () => {
    const premise = checkStoryClarity(story);
    expect(premise.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const choices = checkStoryChoiceClarity(story);
    expect(choices.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`)).toEqual([]);
  });
});

describe('the opener asks for an answer now', () => {
  const cast = new Set(story.characters.map((c) => calledName(c)));

  it('is under 120 words', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('has a named character speak to the player inside the first 60 words', () => {
    const firstQuote = story.opening.search(/["“]/);
    expect(firstQuote, 'nobody speaks').toBeGreaterThan(-1);
    const before = story.opening.slice(0, firstQuote);
    expect(words(before).length).toBeLessThanOrEqual(60);
    expect([...cast].some((name) => before.includes(name)), 'the speaker is not named before speaking').toBe(true);
  });

  it('ends on a direct question', () => {
    expect(story.opening.trim()).toMatch(/\?["”]?$/);
  });

  it('names nobody the player is expected to know already', () => {
    // Every capitalised word that is not the start of a sentence, a line or a
    // quotation must be a cast name or a stat the window itself spells out.
    const allowed = new Set([...cast, 'Charm', 'Grit', 'Wits', 'Luck']);
    const proper: string[] = [];
    let sentenceStart = true;
    for (const raw of story.opening.split(/\s+/)) {
      const opensQuote = /^["“[(]/.test(raw);
      const word = raw.replace(/^["“[(]+/, '').replace(/[^A-Za-z’']+$/, '');
      if (/^[A-Z][a-z]/.test(word) && !sentenceStart && !opensQuote && !allowed.has(word)) proper.push(word);
      sentenceStart = /[.!?:\]]["”)]?$/.test(raw);
    }
    expect(proper).toEqual([]);
  });

  it('offers exactly three first-person cards: one said, one done, one risky', () => {
    expect(story.openingSuggestions.length).toBe(3);
    const [said, done, risky] = story.openingSuggestions as [string, string, string];
    for (const card of story.openingSuggestions) {
      expect(card).toMatch(/\bI\b/);
      expect(card.length).toBeLessThanOrEqual(320);
      expect(card).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
    expect(said, 'the said card is dialogue').toMatch(/^["“]/);
    expect(done, 'the done card is an action').toMatch(/^I /);
    expect(risky, 'the risky card says the impossible thing').toMatch(/future/i);
  });

  it('offers no opening card the parser turns into a fight', async () => {
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

describe('everybody here is an adult, and the text never says otherwise', () => {
  const MINOR_CODED =
    /\b(kids?|child|children|childlike|childhood|teens?|teenagers?|teenage|minors?|underage|juvenile|adolescents?|schoolgirls?|schoolboys?|high school|middle school|boys?|girls?|thirteen|fourteen|fifteen|sixteen|seventeen)\b/i;

  /**
   * The one sentence allowed to contain those words is the hard-canon line
   * that bans them by name, because the storyteller has no age rule of its own
   * and obeys a named list better than a principle. It is one sentence with no
   * full stop inside it, so it can be cut out exactly before the scan.
   */
  const BAN = /Words that read younger are banned[^.]*\./;

  it('bans the words that read younger by name, in the hard canon the storyteller reads', () => {
    const line = story.rules.hardCanon.find((l) => BAN.test(l));
    expect(line, 'no ban sentence in the hard canon').toBeDefined();
    const sentence = BAN.exec(line!)![0];
    for (const word of ['kid', 'teen', 'teenager', 'boy', 'girl', 'school', 'high school', 'senior year', 'prom', 'teachers']) {
      expect(sentence, word).toContain(`"${word}"`);
    }
    expect(line).toMatch(/no further than eighteen/);
  });

  it('uses no age word that reads as younger than eighteen anywhere else in the world', () => {
    const text = JSON.stringify(story);
    expect(text.match(BAN), 'the ban sentence is not found in the serialised world').not.toBeNull();
    expect(text.replace(BAN, '').match(MINOR_CODED)?.[0] ?? null).toBeNull();
  });

  it('never ties a character to a younger age, even in the past tense', () => {
    const text = JSON.stringify(story);
    expect(text).not.toMatch(/\b(?:since|when) (?:you|he|she|they) (?:were|was)(?: both)? (?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b/i);
  });

  it('says so in the hard canon the storyteller reads', () => {
    expect(story.rules.hardCanon.some((line) => /eighteen or older/.test(line))).toBe(true);
  });

  it('states every character’s age in the bible, and every age is eighteen or more', async () => {
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/39_RESTART_AT_EIGHTEEN.md', import.meta.url),
      'utf8',
    );
    const sections = bible.split(/^### /m).slice(1);
    for (const character of story.characters) {
      const section = sections.find((s) => s.startsWith(character.name));
      expect(section, `${character.name} has no section in the bible`).toBeDefined();
      const age = Number(/\*\*Age:\*\*\s*(\d+)/.exec(section ?? '')?.[1]);
      expect(age, `${character.name} has no stated age`).toBeGreaterThanOrEqual(18);
    }
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere, behind flags something can set', () => {
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || (a.requires?.flagsSet.length ?? 0) > 0);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) {
      expect(grantable.has(ability.id), `${ability.id} is never granted`).toBe(true);
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(canBeSet(flag), `${ability.id} waits on ${flag}, which nothing sets`).toBe(true);
      }
    }
  });

  it('puts the player in every character card', () => {
    for (const character of story.characters) {
      expect(character.cardBlurb, character.id).toMatch(/\byou\b/i);
      expect(character.cardBlurb.length, character.id).toBeGreaterThan(20);
      expect(character.cardBlurb, character.id).not.toBe(character.role);
    }
  });

  it('gives every location a way in from somewhere else', () => {
    for (const location of story.locations) {
      const inbound = story.locations.some(
        (other) => other.id !== location.id && other.connections.some((c) => c.to === location.id),
      );
      expect(inbound, `${location.id} has no inbound edge`).toBe(true);
    }
  });
});

describe('the opening scene is the right room', () => {
  it('has Jun and the window in it, and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['jun', 'the_system']);
  });

  it('puts nobody in the opening scene by fallback', () => {
    const minute = story.rules.startWorldMinute % 1440;
    for (const c of story.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('can walk from the bedroom to everywhere that is not hidden', () => {
    const seen = new Set([story.rules.startingLocationId]);
    const queue = [story.rules.startingLocationId];
    while (queue.length > 0) {
      const id = queue.shift()!;
      const here = story.locations.find((l) => l.id === id)!;
      for (const c of here.connections) {
        if (c.lockedByFlag || seen.has(c.to)) continue;
        seen.add(c.to);
        queue.push(c.to);
      }
    }
    const unreached = story.locations.filter((l) => l.discoveredByDefault && !seen.has(l.id)).map((l) => l.id);
    expect(unreached).toEqual([]);
  });
});

describe('the cast are people, not prizes', () => {
  it('gives Sara limits, a want of her own, and a way to refuse', () => {
    const sara = story.characters.find((c) => c.id === 'sara')!;
    expect(sara.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(sara.fears.length).toBeGreaterThanOrEqual(2);
    expect(sara.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(sara.secrets.length).toBeGreaterThanOrEqual(2);
    expect(sara.voiceSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(3);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('uses expressions the generator draws', () => {
    const unknown = story.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const called = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size).toBe(called.length);
  });

  it('keeps every pair of voices lexically apart', () => {
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
        const shared = [...va].filter((w) => vb.has(w)).length;
        expect(shared / Math.min(va.size, vb.size), `${a.id} and ${b.id}`).toBeLessThan(0.3);
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
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    expect(sample('the_system')).toMatch(/^\[/); // bracketed
    expect(sample('the_system')).toMatch(/\d{2}:\d{2}/); // timestamped
    expect(sample('theo')).toMatch(/Legend/); // calls everybody legend
    expect(sample('dad')).toMatch(/the nine/); // tools by size
    expect(sample('graham')).toMatch(/get said|misremembered/); // passive consequences
    expect(sample('sara')).toMatch(/\d:\d{2}|Eleven/); // gives times out loud
  });
});

describe('the attempt-one mystery is optional and behaves like it', () => {
  it('hides the whole lead behind a flag only a curious player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_attempt_two')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_log']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_log'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const event of sources) expect(event.requiresFlags.length, event.id).toBeGreaterThan(0);
  });

  it('keeps the locked abilities locked, in the world’s own words', () => {
    const locked = story.abilities.filter((a) => (a.requires?.flagsSet.length ?? 0) > 0);
    expect(locked.map((a) => a.id).sort()).toEqual(['keep_this_draft', 'open_the_log', 'wake_at_28']);
    for (const ability of locked) {
      expect(ability.requires!.lockedCopy.length, ability.id).toBeGreaterThan(30);
      expect(ability.requires!.lockedCopy, ability.id).not.toMatch(/flag|predicate|locked/i);
    }
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['knows:attempt_one', 'saw_the_save_room', 'knows:the_log', 'knows:what_the_window_is']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(10);
  });
});

describe('the night can genuinely go wrong', () => {
  it('lets nothing change, with no mistake required', () => {
    const same = story.endings.find((e) => e.id === 'end_the_same_night')!;
    expect(same.requires.minRelationship).toEqual([]);
    expect(same.requires.hasItems).toEqual([]);
    const route = routes.find(({ route }) => route.routeId === 'changed_nothing')!.route;
    expect(route.predicate.minRelationship).toEqual([]);
    expect(route.predicate.hasItems).toEqual([]);
  });

  it('lets the player walk out of town, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_the_long_way_out')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('plays each of the three regrets on its old time unless a settable flag stops it', () => {
    for (const id of ['we_the_signature', 'we_the_fire', 'we_sara_gives_up']) {
      const event = story.worldEvents.find((e) => e.id === id)!;
      expect(event.requiresFlags, id).toEqual([]);
      expect(event.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) expect(canBeSet(flag), `${id} / ${flag}`).toBe(true);
    }
  });

  it('pulls the night back on its own', () => {
    const ripple = story.resources.find((r) => r.id === 'ripple')!;
    expect(ripple.regenPerHour).toBeLessThan(0);
    const pullbacks = story.worldEvents.filter((e) => e.requiresFlags.some((f) => ['garage_kept', 'no_fireworks'].includes(f)));
    expect(pullbacks.length).toBe(2);
  });

  it('uses the whole rarity range, with a common ending and real conditions', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const ending of story.endings) {
      expect(ending.minTurn, ending.id).toBeGreaterThan(0);
      expect(ending.condition.length, ending.id).toBeGreaterThan(80);
      expect(ending.epilogue.length, ending.id).toBeGreaterThan(60);
    }
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources.length).toBe(3);
    for (const r of story.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one thing rest can restore, and it is the night’s nerve', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
  });

  it('makes a public fight cost strangeness first', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('strangeness');
    expect(story.factions[0]?.id).toBe('faction_the_class');
  });

  it('drives every descending variable from an ability cost', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('describes every ability in the setup screen’s plain shape', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('keeps archetype tags short and the choice explained as permanent', () => {
    for (const a of story.archetypes) {
      expect(a.playstyle.length, a.id).toBeGreaterThanOrEqual(2);
      for (const tag of a.playstyle) expect(tag.length, `${a.id}: ${tag}`).toBeLessThanOrEqual(24);
    }
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText?.length ?? 0).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });
});

describe('catalog invariants, for a world not yet in the catalog', () => {
  it('has more than one way through, and some choices close doors', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('never offers a route nobody could take', () => {
    const obtainable = new Set([
      ...story.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...story.rules.startingItems.map((i) => i.itemId),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
      ...story.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), where).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const itemId of step.succeedWhenAny.flatMap((r) => r.predicate.hasItems)) {
        expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
      }
    }
  });

  it('gives every archetype something the rules can see', () => {
    for (const a of story.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
    }
    expect(new Set(story.archetypes.map((a) => a.id)).size).toBe(story.archetypes.length);
  });

  it('points only at things that exist', () => {
    const locIds = new Set(story.locations.map((l) => l.id));
    const itemIds = new Set(story.items.map((i) => i.id));
    const charIds = new Set(story.characters.map((c) => c.id));
    const abIds = new Set(story.abilities.map((a) => a.id));
    const facIds = new Set(story.factions.map((f) => f.id));
    const resIds = new Set(story.resources.map((r) => r.id));
    const broken: string[] = [];
    for (const l of story.locations) {
      for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
      for (const t of l.takeableItems) {
        if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const q of story.quests) {
      for (const st of q.steps) {
        for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const p of preds) {
          if (!p) continue;
          if (p.atLocation && !locIds.has(p.atLocation)) broken.push(`${st.id} at ${p.atLocation}`);
          for (const i of p.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} item ${i}`);
          for (const r of p.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
        }
      }
    }
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId) || !locIds.has(m.toLocationId)) broken.push(`${e.id} moves ${m.characterId}`);
      }
    }
    for (const o of story.openingObligations) if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push('obligation');
    expect(broken).toEqual([]);
  });

  it('never gates something behind a flag nothing can set', () => {
    const dead: string[] = [];
    for (const e of story.endings) for (const f of e.requires.flagsSet) if (!canBeSet(f)) dead.push(`${e.id}: ${f}`);
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) if (!canBeSet(f)) dead.push(`${a.id}: ${f}`);
    for (const l of story.locations) for (const c of l.connections) if (c.lockedByFlag && !canBeSet(c.lockedByFlag)) dead.push(`${l.id}: ${c.lockedByFlag}`);
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!canBeSet(f)) dead.push(`${q.id}: ${f}`);
      for (const st of q.steps) {
        for (const f of st.enterWhen?.flagsSet ?? []) if (!canBeSet(f)) dead.push(`${st.id}: ${f}`);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) if (!canBeSet(f)) dead.push(`${r.routeId}: ${f}`);
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!canBeSet(f)) dead.push(`${g.id}: ${f}`);
    for (const e of story.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) if (!canBeSet(f)) dead.push(`${e.id}: ${f}`);
    expect(dead).toEqual([]);
  });

  it('never shares an item alias between two items, and keeps hard canon', () => {
    const owner = new Map<string, string>();
    for (const l of story.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.toLowerCase();
          expect(owner.get(key) ?? t.itemId, `"${alias}" names two items`).toBe(t.itemId);
          owner.set(key, t.itemId);
        }
      }
    }
    expect(story.rules.hardCanon.length).toBeGreaterThan(0);
  });

  it('ships raw, with the art keys left to the catalog', () => {
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_restart_at_eighteen/opening');
    expect(story.prologue ?? []).toEqual([]);
  });
});

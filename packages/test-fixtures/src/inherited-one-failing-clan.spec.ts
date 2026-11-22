import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { charactersPresent, createInitialState, locationForSchedule } from '@plotbreak/engine';
import { INHERITED_ONE_FAILING_CLAN as S } from './inherited-one-failing-clan.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * "Inherited: One Failing Clan" is a story about a family the player did not
 * choose, a debt they did not sign, and a week to find out whether nine people
 * will drink to them. These tests pin the shape that has to survive editing:
 *
 *   - the opener puts a named person in front of the player with a demand that
 *     needs an answer now;
 *   - everybody is an adult and the file says so;
 *   - midnight comes whether the player does anything or not, and doing nothing
 *     is a route rather than a dead end;
 *   - the family can walk, Ryo can go over, and the passbook can be asked for
 *     or simply taken;
 *   - every system the production storyteller needs is somewhere it reads.
 *
 * The story is not in LAUNCH_CATALOG yet (its art is not generated), so the
 * catalogue-wide checks in catalog.spec, endings.spec, catalogue-invariants and
 * the director's choice-clarity do not reach it. The ones that matter are
 * repeated here, against this file alone.
 */

function start(archetypeId = 'arch_books') {
  return createInitialState({
    sessionId: 'sess_inherited_one_failing_clan',
    story: S,
    identity: {
      displayName: 'Kai Morimoto',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });
}

/** Every flag a route, a step reward or a world event can set. */
function settable(): Set<string> {
  const flags = new Set<string>();
  for (const quest of S.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of S.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

const steps = S.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

const route = (questId: string, stepId: string, routeId: string) => {
  const step = S.quests.find((q) => q.id === questId)!.steps.find((s) => s.id === stepId)!;
  const found = step.succeedWhenAny.find((r) => r.routeId === routeId);
  expect(found, `${questId}/${stepId}/${routeId}`).toBeDefined();
  return found!;
};

const AGES: Record<string, number> = {
  ryo: 34,
  saeko: 29,
  kagami: 63,
  mariko: 26,
  hachi: 61,
  nori: 44,
};

const NUMBER_WORDS: Record<number, string> = {
  25: 'twenty-five',
  26: 'twenty-six',
  29: 'twenty-nine',
  34: 'thirty-four',
  44: 'forty-four',
  61: 'sixty-one',
  63: 'sixty-three',
};

const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;

describe('Inherited: One Failing Clan', () => {
  it('writes real line breaks, never a literal backslash-n', () => {
    const prose = [
      S.premise,
      S.opening,
      S.hook,
      S.creatorNote,
      ...S.rules.styleExamples,
      ...S.rules.hardCanon,
      ...S.endings.flatMap((e) => [e.condition, e.epilogue]),
    ];
    for (const text of prose) expect(text).not.toContain('\\n');
  });

  describe('the opener', () => {
    const opener = S.opening;
    const openerWords = words(opener);

    it('stays inside 120 words', () => {
      expect(openerWords.length).toBeGreaterThanOrEqual(50);
      expect(openerWords.length).toBeLessThanOrEqual(120);
    });

    it('has a named person speak to the player inside the first 60 words', () => {
      const head = openerWords.slice(0, 60).join(' ');
      expect(head).toContain('Kagami');
      const quoted = [...head.matchAll(/"([^"]+)"/g)].map((m) => m[1]!);
      expect(
        quoted.some((line) => /\byour?\b/i.test(line)),
        'nothing in the first 60 words is said to the player',
      ).toBe(true);
    });

    it('ends on a question the player has to answer now', () => {
      expect(opener.trim()).toMatch(/\?["”]?$/);
      expect(opener).toMatch(/midnight/);
    });

    it('names nobody the player is expected to know already', () => {
      // Every capitalised word that is not opening a sentence or a line of
      // dialogue has to be introduced on the page. Kagami names himself.
      const stray: string[] = [];
      const pattern = /(^|[\s"“(])([A-Z][a-z’']+)/g;
      for (const match of opener.matchAll(pattern)) {
        const index = match.index! + match[1]!.length;
        const before = opener.slice(0, index).replace(/["“\s]+$/, '');
        const startsSentence = before.length === 0 || /[.!?]$/.test(before) || match[1] === '"' || match[1] === '“';
        if (!startsSentence && !['I', 'Kagami'].includes(match[2]!)) stray.push(match[2]!);
      }
      expect(stray, `proper nouns the player has not been told: ${stray.join(', ')}`).toEqual([]);
      expect(opener).toMatch(/"Kagami," he says/);
    });

    it('offers one thing said, one thing done and one thing risky', () => {
      const [said, done, risky] = S.openingSuggestions;
      expect(S.openingSuggestions).toHaveLength(3);
      expect(said).toMatch(/^"/);
      expect(done).toMatch(/^I /);
      expect(done).not.toContain('"');
      expect(risky).toMatch(/^I /);
      expect(risky).toMatch(/note/);
      expect(risky).toMatch(/tear/);
      for (const card of S.openingSuggestions) {
        expect(card).toMatch(/\bI\b/);
        expect(card).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
      }
    });

    it('offers no opening card the parser turns into a fight', async () => {
      const { RuleBasedIntentParser } = await import('@plotbreak/director');
      const parser = new RuleBasedIntentParser();
      const state = start();
      const violent: string[] = [];
      for (const card of S.openingSuggestions) {
        const intent = await parser.parse(card, {
          story: S,
          state,
          intentId: 'intent_card_probe',
          addressee: null,
        });
        if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
      }
      expect(violent, `these cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
    });

    it('passes the clarity check the catalogue runs on premise and opener', async () => {
      const { checkStoryClarity } = await import('@plotbreak/director');
      const report = checkStoryClarity(S);
      const errors = report.issues.filter((issue) => issue.severity === 'ERROR');
      expect(errors, JSON.stringify(errors)).toEqual([]);
      expect(report.passed).toBe(true);
    });
  });

  describe('everybody is an adult', () => {
    it('says so first in hard canon, with every age', () => {
      const first = S.rules.hardCanon[0]!;
      expect(first).toMatch(/^Everyone in this story is an adult\. The player is twenty-five\./);
      for (const character of S.characters) {
        const surname = character.name.split(' ').slice(-1)[0]!;
        expect(first, character.id).toContain(surname);
        expect(first, character.id).toContain(NUMBER_WORDS[AGES[character.id]!]!);
      }
      expect(first).toMatch(/Bun, twenty-one, the youngest/);
    });

    it('has an age for every character and every one of them is eighteen or over', () => {
      for (const character of S.characters) {
        expect(AGES[character.id], `${character.id} has no stated age`).toBeDefined();
        expect(AGES[character.id]!).toBeGreaterThanOrEqual(18);
      }
      expect(Object.keys(AGES).sort()).toEqual(S.characters.map((c) => c.id).sort());
    });

    it('describes adults in words an image model cannot read as anything else', () => {
      for (const character of S.characters) {
        expect(character.appearance, character.id).toMatch(/^An (adult|older) (man|woman)\b/);
        expect(character.appearance, character.id).not.toMatch(AGE_WORDS);
        expect(character.visualHook, character.id).not.toMatch(AGE_WORDS);
        expect(character.silhouette, character.id).not.toMatch(AGE_WORDS);
      }
      expect(S.coverDirection).not.toMatch(AGE_WORDS);
      expect(S.openingPanel?.alt ?? '').not.toMatch(AGE_WORDS);
    });
  });

  describe('the funeral', () => {
    it('starts at the funeral, twenty to seven, with Kagami and Ryo in the room', () => {
      const state = start();
      expect(S.rules.startingLocationId).toBe('funeral_hall');
      expect(S.rules.startWorldMinute).toBe(18 * 60 + 40);
      const present = charactersPresent(state).map((c) => c.characterId);
      expect(present).toContain('kagami');
      expect(present).toContain('ryo');
      // Mariko stands beside her father at the vigil and does not bow; the
      // detective waits outside the gate rather than come into a funeral.
      expect(present).toContain('mariko');
      expect(present).not.toContain('nori');
    });

    it('hands every player the seal and nothing that already solves the night', () => {
      for (const archetype of S.archetypes) {
        const state = start(archetype.id);
        const held = state.player.inventory.map((entry) => entry.itemId);
        expect(held, archetype.id).toContain('heron_seal');
        for (const answer of ['blue_passbook', 'coop_transfer', 'debt_note', 'favour_book']) {
          expect(held, `${archetype.id} starts with ${answer}`).not.toContain(answer);
        }
      }
    });

    it('puts Kagami at the funeral and the Lantern on the evenings he says he will be', () => {
      const kagami = S.characters.find((c) => c.id === 'kagami')!;
      expect(locationForSchedule(kagami.schedule, 18 * 60 + 40)).toBe('funeral_hall');
      expect(locationForSchedule(kagami.schedule, 23 * 60 + 30)).toBe('lantern_bar');
      const mariko = S.characters.find((c) => c.id === 'mariko')!;
      expect(locationForSchedule(mariko.schedule, 20 * 60)).toBe('breakwater');
    });
  });

  describe('the debt', () => {
    it('is owed to Kagami and falls due at midnight', () => {
      const [obligation] = S.openingObligations;
      expect(obligation?.withCharacterId).toBe('kagami');
      expect(S.rules.startWorldMinute + obligation!.dueInMinutes).toBe(24 * 60);
      const calling = S.worldEvents.find((e) => e.id === 'we_the_calling')!;
      expect(calling.atWorldMinute).toBe(24 * 60);
      expect(calling.locationId).toBe('lantern_bar');
      expect(calling.setsFlags).toContain('midnight_called');
    });

    it('can be dealt with before midnight in ways the calling notices', () => {
      const calling = S.worldEvents.find((e) => e.id === 'we_the_calling')!;
      const flags = settable();
      for (const flag of calling.cancelledByFlags) expect(flags, flag).toContain(flag);
      expect(calling.cancelledByFlags).toEqual(expect.arrayContaining(['debt_paid', 'debt_cancelled', 'note_stolen']));
    });

    it('lets midnight come on a player who did nothing, and calls that a route', () => {
      const letItGo = route('q_ten_million', 'find_the_money', 'let_midnight_come');
      expect(letItGo.predicate.flagsSet).toEqual(['midnight_called']);
      expect(letItGo.predicate.hasItems).toEqual([]);
      expect(letItGo.setsFlags).toContain('pier_lost');
      const lost = S.endings.find((e) => e.id === 'end_kagamis_pier')!;
      expect(lost.requires.flagsSet).toEqual(['pier_lost']);
      expect(lost.rarity).toBe('COMMON');
    });

    it('keeps the co-op transfer from settling the money', () => {
      const sealed = route('q_ten_million', 'find_the_money', 'sealed_the_transfer');
      expect(sealed.setsFlags).toContain('still_owes_kagami');
      expect(sealed.setsFlags).not.toContain('debt_paid');
      expect(sealed.predicate.hasItems).toContain('coop_transfer');
    });

    it('treats asking Saeko and going behind her as two different answers', () => {
      const asked = route('q_ten_million', 'find_the_money', 'paid_from_the_fund');
      const took = route('q_ten_million', 'find_the_money', 'took_the_fund');
      expect(asked.predicate.minRelationship.some((r) => r.characterId === 'saeko')).toBe(true);
      expect(took.setsFlags).toContain('went_behind_saeko');
      const step = S.quests.find((q) => q.id === 'q_ten_million')!.steps.find((s) => s.id === 'find_the_money')!;
      const order = step.succeedWhenAny.map((r) => r.routeId);
      expect(order.indexOf('paid_from_the_fund')).toBeLessThan(order.indexOf('took_the_fund'));
    });

    it('lets spending the members’ money close the kind ending', () => {
      const closed = route('q_the_heir', 'the_cup', 'poured_no_cups');
      expect(closed.predicate.flagsUnset).toContain('spent_the_fund');
      expect(closed.predicate.hasItems).toContain('blue_passbook');
    });
  });

  describe('the family', () => {
    it('can lose Ryo to Kagami when the pier goes', () => {
      const over = route('q_the_heir', 'what_ryo_agreed', 'ryo_went_over');
      expect(over.predicate.flagsSet).toEqual(['pier_lost']);
      expect(over.closesFlags).toContain('ryo_stays');
    });

    it('can walk on the seventh day', () => {
      const walked = route('q_the_heir', 'the_cup', 'some_walked');
      expect(walked.predicate.flagsSet).toEqual(['seventh_day']);
      const seventh = S.worldEvents.find((e) => e.id === 'we_the_seventh_day')!;
      expect(seventh.setsFlags).toContain('seventh_day');
      expect(seventh.atWorldMinute).toBeGreaterThan(7 * 1440);
    });

    it('can be sworn in full, because the reputation it asks for can be earned', () => {
      const sworn = route('q_the_heir', 'the_cup', 'all_nine_drank');
      const need = sworn.predicate.minFactionReputation.find((r) => r.factionId === 'faction_hayami')!.value;
      const startRep = S.factions.find((f) => f.id === 'faction_hayami')!.startingReputation;
      const earnable = S.quests
        .filter((q) => q.id !== 'q_what_it_becomes')
        .flatMap((q) => q.steps)
        .filter((s) => s.id !== 'the_cup')
        .flatMap((s) => s.rewards.reputation)
        .filter((r) => r.factionId === 'faction_hayami')
        .reduce((sum, r) => sum + r.amount, 0);
      expect(startRep + earnable).toBeGreaterThanOrEqual(need);
    });
  });

  describe('what production reads', () => {
    it('keeps every lever against the debt in something the storyteller sees', () => {
      const questItems = S.items.filter((i) => i.questItem).map((i) => i.id);
      expect(questItems).toEqual(
        expect.arrayContaining([
          'heron_seal',
          'debt_note',
          'blue_passbook',
          'coop_transfer',
          'grandfathers_letter',
          'favour_book',
          'resort_contract',
        ]),
      );
      const canon = S.rules.hardCanon.join(' ');
      for (const fact of ['ten million', 'midnight', 'harbour code', 'Heron Seal', 'blue passbook', 'green safe', 'four hundred million', 'black to play']) {
        expect(canon.toLowerCase(), fact).toContain(fact.toLowerCase());
      }
    });

    it('stays inside the twelve endings the storyteller reads', () => {
      expect(S.endings.length).toBeLessThanOrEqual(12);
    });

    it('starts every archetype able to speak as the boss', () => {
      for (const archetype of S.archetypes) {
        expect(archetype.startingAbilities, archetype.id).toContain('speak_as_boss');
      }
    });

    it('never asserts an archetype as a person in the world', () => {
      const world = [S.premise, ...S.rules.hardCanon, ...S.characters.map((c) => c.name)].join(' ');
      const named = S.archetypes.filter((a) => new RegExp(`\\b${a.name}\\b`).test(world));
      expect(named.map((a) => a.name)).toEqual([]);
    });

    it('keeps the premise inside the window', () => {
      const count = words(S.premise).length;
      expect(count).toBeGreaterThanOrEqual(120);
      expect(count).toBeLessThanOrEqual(250);
    });

    it('does not spend the secrets in the premise', () => {
      const premise = S.premise.toLowerCase();
      for (const secret of ['passbook', 'resort', 'transfer', 'letter', 'four hundred']) {
        expect(premise, secret).not.toContain(secret);
      }
    });
  });

  describe('the people', () => {
    it('writes each of them as a person rather than a function', () => {
      for (const c of S.characters) {
        expect(c.fears.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.values.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.hiddenDrives.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.boundaries.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.goals.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
        for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
      }
    });

    const content = (text: string): Set<string> =>
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
          expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}%`).toBeLessThan(0.3);
        }
      }
    });

    it('does not let two of them run the same rhetorical move', () => {
      const MOVES: Array<[string, RegExp]> = [
        ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling)\b/i],
        ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
        ['the kind of X that', /\bthe kind of \w+ that\b/i],
        ['numbered list', /\b(?:First|Second|Third),/],
      ];
      for (const [label, pattern] of MOVES) {
        const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
        expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
      }
    });

    it('demonstrates each declared voice in the samples the writer gets', () => {
      const sample = (id: string) => S.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
      expect(sample('ryo')).toMatch(/^Boss\. \.\.\.Boss\./);
      expect(sample('saeko')).toMatch(/Assets:.*Liabilities:/);
      expect(sample('saeko')).toMatch(/\bNet\b/);
      expect(sample('kagami')).toContain('young boss');
      expect(sample('mariko')).toContain('the chairman');
      expect(sample('mariko')).not.toMatch(/\bfather\b/);
      expect(sample('hachi')).toMatch(/^Have you eaten\?/);
      expect(sample('nori')).toMatch(/what I know.*what I can prove/i);
    });

    it('gives every card blurb a you in it, and makes it more than the role', () => {
      for (const c of S.characters) {
        expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
        expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
        expect(c.cardBlurb, c.id).not.toBe(c.role);
      }
    });

    it('uses expressions the portrait generator draws', () => {
      for (const c of S.characters) {
        for (const expression of c.expressions) {
          expect(knownExpression(expression), `${c.id}: ${expression}`).toBe(true);
        }
      }
    });

    it('gives no two of them the same short name', () => {
      const names = S.characters.map((c) => calledName(c));
      expect(new Set(names).size).toBe(names.length);
      expect(calledName(S.characters.find((c) => c.id === 'kagami')!)).toBe('Kagami');
      expect(calledName(S.characters.find((c) => c.id === 'mariko')!)).toBe('Mariko');
      expect(calledName(S.characters.find((c) => c.id === 'hachi')!)).toBe('Hachi');
      expect(calledName(S.characters.find((c) => c.id === 'nori')!)).toBe('Nori');
    });

    it('never drops anybody into the opening scene by fallback', () => {
      const minute = ((S.rules.startWorldMinute % 1440) + 1440) % 1440;
      for (const c of S.characters) {
        const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
        expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
        for (const block of c.schedule) {
          expect(S.locations.some((l) => l.id === block.locationId), `${c.id} -> ${block.locationId}`).toBe(true);
        }
      }
    });
  });

  /**
   * The three checks every new story on the slate must pass.
   */
  describe('the three slate checks', () => {
    it('grants every gated ability somewhere', () => {
      const granted = new Set([
        ...S.archetypes.flatMap((a) => a.startingAbilities),
        ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
        ...S.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ]);
      // `requires` always parses to an object, so gated means it actually
      // asks for something, or the ability starts locked.
      const asks = (a: (typeof S.abilities)[number]): boolean =>
        a.requires.flagsSet.length + a.requires.flagsUnset.length +
          a.requires.minResources.length + a.requires.maxResources.length > 0;
      const gated = S.abilities.filter((a) => !a.unlockedByDefault || asks(a));
      expect(gated.map((a) => a.id)).toContain('call_in_a_favour');
      expect(gated.length).toBeGreaterThan(0);
      for (const ability of gated) {
        expect(granted.has(ability.id), `${ability.id} is gated and never granted`).toBe(true);
        const flags = settable();
        for (const flag of ability.requires.flagsSet) {
          expect(flags.has(flag) || engineSets(flag), `${ability.id} waits on ${flag}`).toBe(true);
        }
      }
    });

    it('puts the word you in every card blurb', () => {
      for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
    });

    it('gives every location an inbound edge', () => {
      for (const location of S.locations) {
        const inbound = S.locations.some((other) => other.connections.some((c) => c.to === location.id));
        expect(inbound, `${location.id} has no way in`).toBe(true);
      }
    });
  });

  /**
   * What catalog.spec, endings.spec, catalogue-invariants.spec and the
   * director's choice-clarity.spec would check if this story were registered.
   */
  describe('catalogue invariants, applied here', () => {
    it('has more than one way through', () => {
      expect(routes.length).toBeGreaterThanOrEqual(3);
    });

    it('never offers a route nobody could take', () => {
      const grantable = new Set([
        ...S.archetypes.flatMap((a) => a.startingAbilities),
        ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
        ...S.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ]);
      const obtainable = new Set([
        ...S.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
        ...S.rules.startingItems.map((i) => i.itemId),
        ...S.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
        ...S.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
      ]);
      for (const { quest, step, route: r } of routes) {
        const where = `${quest}/${step}/${r.routeId}`;
        for (const flag of r.predicate.flagsSet) {
          if (!flag.startsWith('used:')) continue;
          expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
        }
        for (const itemId of r.predicate.hasItems) {
          expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
        }
      }
    });

    it('never demands the thing it is about to hand you', () => {
      for (const { quest, step } of steps) {
        const granted = new Set(step.rewards.items.map((i) => i.itemId));
        const demanded = [
          ...(step.succeedWhen?.hasItems ?? []),
          ...step.succeedWhenAny.flatMap((r) => r.predicate.hasItems),
        ];
        for (const itemId of demanded) expect(granted.has(itemId), `${quest}/${step.id} ${itemId}`).toBe(false);
      }
    });

    it('points only at things that exist', () => {
      const locIds = new Set(S.locations.map((l) => l.id));
      const itemIds = new Set(S.items.map((i) => i.id));
      const charIds = new Set(S.characters.map((c) => c.id));
      const abIds = new Set(S.abilities.map((a) => a.id));
      const facIds = new Set(S.factions.map((f) => f.id));
      const resIds = new Set(S.resources.map((r) => r.id));
      const broken: string[] = [];
      for (const l of S.locations) {
        for (const c of l.connections) if (!locIds.has(c.to)) broken.push(`${l.id} -> ${c.to}`);
        for (const t of l.takeableItems) {
          if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
          if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} owner ${t.ownerId}`);
        }
      }
      for (const c of S.characters) {
        if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      }
      for (const a of S.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} cost`);
      for (const a of S.archetypes) {
        for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
        for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
        for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      }
      for (const f of S.factions) for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} ${x}`);
      for (const e of S.worldEvents) {
        if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
        for (const m of e.movesCharacters) {
          if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
          if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
        }
      }
      for (const e of S.endings) {
        for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
        for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} ${i}`);
      }
      for (const q of S.quests) {
        for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} ${id}`);
        for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} ${id}`);
        for (const st of q.steps) {
          for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
          for (const r of st.rewards.abilities) if (!abIds.has(r)) broken.push(`${st.id} grants ${r}`);
          for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
          const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
          for (const pred of preds) {
            if (!pred) continue;
            for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
            if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
            for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} ${r.characterId}`);
            for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} ${r.factionId}`);
          }
        }
      }
      expect(broken, broken.join('; ')).toEqual([]);
    });

    it('never gates something behind a flag nothing can set', () => {
      const flags = settable();
      const dead: string[] = [];
      const check = (where: string, list: readonly string[]) => {
        for (const f of list) if (!flags.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
      };
      for (const e of S.endings) check(`ending ${e.id}`, e.requires.flagsSet);
      for (const a of S.abilities) check(`ability ${a.id}`, a.requires.flagsSet);
      for (const c of S.characters) for (const g of c.gates) check(`gate ${g.id}`, g.requires.flagsSet ?? []);
      for (const e of S.worldEvents) check(`event ${e.id}`, [...e.requiresFlags, ...e.cancelledByFlags]);
      for (const q of S.quests) {
        if (q.discoverWhen) check(`quest ${q.id}`, q.discoverWhen.flagsSet);
        for (const st of q.steps) {
          for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(`step ${st.id}`, p.flagsSet);
          for (const r of st.succeedWhenAny) {
            check(`route ${r.routeId}`, [...r.predicate.flagsSet, ...r.predicate.flagsUnset]);
            check(`route ${r.routeId} closes`, r.closesFlags);
          }
        }
      }
      for (const l of S.locations) {
        for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
      }
      expect(dead, dead.join('; ')).toEqual([]);
    });

    it('closes something when a route is taken, at least somewhere', () => {
      expect(routes.some(({ route: r }) => r.closesFlags.length > 0)).toBe(true);
    });

    it('never lets two different items answer to the same words', () => {
      const owners = new Map<string, Set<string>>();
      for (const location of S.locations) {
        for (const item of location.takeableItems) {
          for (const alias of item.aka ?? []) {
            const key = alias.trim().toLowerCase();
            owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
          }
        }
      }
      const collisions = [...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias);
      expect(collisions).toEqual([]);
    });

    it('tells every ability’s effect in a line a player can read', () => {
      for (const ability of S.abilities) {
        const effect = abilityEffect(S, ability);
        expect(effect.length, `${ability.id}: ${effect}`).toBeLessThan(120);
        expect(effect, ability.id).toMatch(/rolls |always works/);
        expect(effect, ability.id).toMatch(/costs /);
      }
    });

    it('does not let the story end before it has been one, and says what each ending means', () => {
      for (const ending of S.endings) {
        expect(ending.minTurn, ending.id).toBeGreaterThan(0);
        expect(ending.condition.length, ending.id).toBeGreaterThan(80);
        expect(ending.epilogue.length, ending.id).toBeGreaterThan(60);
      }
      expect(S.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    });

    it('lets every faction gate be earned and every faction be climbed', () => {
      for (const faction of S.factions) {
        expect(faction.ranks.length, faction.id).toBeGreaterThanOrEqual(3);
        const top = Math.max(...faction.ranks.map((r) => r.atReputation));
        expect(top, faction.id).toBeGreaterThan(faction.startingReputation);
      }
      for (const { quest, step, route: r } of routes) {
        for (const need of r.predicate.minFactionReputation) {
          const faction = S.factions.find((f) => f.id === need.factionId)!;
          const earnable = S.quests
            .flatMap((q) => q.steps)
            .filter((s) => s.id !== step)
            .flatMap((s) => s.rewards.reputation)
            .filter((rep) => rep.factionId === need.factionId && rep.amount > 0)
            .reduce((sum, rep) => sum + rep.amount, 0);
          const archetypeBest = Math.max(
            0,
            ...S.archetypes.flatMap((a) => a.startingReputation.filter((x) => x.factionId === need.factionId).map((x) => x.amount)),
          );
          expect(
            faction.startingReputation + earnable + archetypeBest,
            `${quest}/${step}/${r.routeId} needs ${need.factionId} ${need.value}`,
          ).toBeGreaterThanOrEqual(need.value);
        }
      }
    });
  });

  describe('the hidden state', () => {
    it('keeps three invisible variables, each with bands the writer can act on', () => {
      expect(S.resources).toHaveLength(3);
      for (const resource of S.resources) {
        expect(resource.visible, resource.id).toBe(false);
        expect(resource.bands.length, resource.id).toBeGreaterThanOrEqual(3);
        expect(resource.bands.at(-1)!.upTo, resource.id).toBe(resource.max);
        for (const band of resource.bands) {
          expect(band.behaviour.length, resource.id).toBeGreaterThan(80);
          expect(band.behaviour.toLowerCase(), resource.id).not.toContain(resource.name.toLowerCase());
        }
      }
    });

    it('lets only nerve refill on rest', () => {
      expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
    });

    it('puts heat first among the descending pair and the ward first among the factions', () => {
      expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('heat');
      expect(S.factions[0]!.id).toBe('faction_ward');
    });

    it('lets something the player does raise each descending variable', () => {
      for (const resource of S.resources.filter((r) => r.polarity === 'GOOD_LOW')) {
        const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === resource.id && c.amount > 0));
        expect(raisers.length, resource.id).toBeGreaterThan(0);
        expect(resource.regenPerHour, resource.id).toBeLessThan(0);
      }
    });
  });

  describe('the endings', () => {
    it('uses the whole rarity range', () => {
      expect(new Set(S.endings.map((e) => e.rarity))).toEqual(new Set(['COMMON', 'UNCOMMON', 'RARE', 'UNIQUE']));
    });

    it('lets a player walk back to their old life early', () => {
      const away = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
      expect(away).toBeDefined();
      expect(away.minTurn).toBeLessThanOrEqual(22);
    });

    it('can end with the family closed kindly, handed to Ryo, or broken', () => {
      const needs = new Set(S.endings.flatMap((e) => e.requires.flagsSet));
      for (const flag of ['family_dissolved', 'ryo_is_boss', 'informed_on_the_family', 'ruled_by_fear', 'pier_lost']) {
        expect(needs, flag).toContain(flag);
      }
    });
  });

  // What the art and release pipeline reads (docs/stories-50/PIPELINE.md,
  // "What the 49 writers need in the fixture"), pinned the way the pilot,
  // Skill: ERROR, shipped it.
  describe('ready for art and release', () => {
    it('opens on a panel of the man who speaks first, by his first name', () => {
      const kagami = S.characters.find((c) => c.id === 'kagami')!;
      expect(S.openingPanel?.assetKey).toBe(`${S.storyId}/opening`);
      const alt = S.openingPanel?.alt ?? '';
      expect(alt.length).toBeGreaterThan(0);
      expect(alt.length).toBeLessThanOrEqual(200);
      // opening-panel-art.ts picks the reference portrait by the first word of
      // a character's name, so "Kagami…" would have drawn Ryo instead.
      expect(alt.startsWith(kagami.name.split(' ')[0]!)).toBe(true);
      expect(S.opening).toMatch(/"Kagami," he says/);
    });

    it('letters its own title on the cover, spelled exactly', () => {
      const cover = S.coverDirection ?? '';
      const title = cover.slice(cover.indexOf('TITLE:'));
      expect(cover).toContain('TITLE:');
      expect(S.title).toBe('Inherited: One Failing Clan');
      expect(title).toContain(`spelled exactly ${S.title.toUpperCase()}`);
      expect(title).toMatch(/upper third/);
      expect(cover).not.toMatch(/lower third/i);
      expect(cover).toMatch(/never on a face/);
    });

    it('keeps injury and undress out of the tone guide, which is also the cover’s mood text', () => {
      expect(S.rules.toneGuide.length).toBeGreaterThan(200);
      expect(S.rules.toneGuide).not.toMatch(/finger|tattoo|strip|lip|broken hand|hospital|drug|gun|blood/i);
      expect(S.rules.toneGuide).toMatch(/nobody harms themselves/);
      const canon = S.rules.hardCanon.join(' ');
      expect(canon).toMatch(/cuts off a finger/);
      expect(canon).toMatch(/Guns are almost unheard of/);
    });

    it('puts the hidden pressures where the storyteller reads them', () => {
      const canon = S.rules.hardCanon.join(' ').toLowerCase();
      for (const pressure of ['police attention', 'the feud', 'nerve']) expect(canon, pressure).toContain(pressure);
      expect(S.rules.startingItems.map((i) => i.itemId)).toEqual(['heron_seal']);
      for (const archetype of S.archetypes) expect(archetype.startingAbilities.length, archetype.id).toBeGreaterThan(1);
    });

    it('draws a portrait for everybody on a card', () => {
      for (const character of S.characters.filter((c) => c.cardBlurb.trim())) {
        expect(character.appearance?.trim(), character.id).toBeTruthy();
      }
    });

    it('has no prologue and is dated only at release', () => {
      expect(S.prologue ?? []).toEqual([]);
      expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
    });
  });
});

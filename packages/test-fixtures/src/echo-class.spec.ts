import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { ECHO_CLASS } from './echo-class.js';

/**
 * Echo Class, held to the promise on its own card: copy any power you touch,
 * for sixty seconds, starting with the strongest student in the building.
 *
 * This world is not in `LAUNCH_CATALOG` yet, so `catalog.spec` and the
 * director's clarity sweep do not see it. Everything those suites would ask of
 * a launch world is asked here instead, plus the three checks the story
 * checkpoint added after the first slate: every gated ability is granted
 * somewhere, every card speaks to the player, and every place can be reached.
 */

const story = ECHO_CLASS;
const bible = readFileSync(new URL('../../../docs/story-bibles/new50/06_ECHO_CLASS.md', import.meta.url), 'utf8');
const imagePlan = bible.slice(bible.indexOf('## Image plan'));

const start = (archetypeId = 'arch_stunt') =>
  createInitialState({
    sessionId: 'sess_echo_class',
    story,
    identity: {
      displayName: 'Ren Ashby',
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

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

/** Everything a player can read, in one place, for the content checks. */
const playerFacing = (): Array<[string, string]> => [
  ['title', story.title],
  ['fantasyLabel', story.fantasyLabel],
  ['hook', story.hook],
  ['premise', story.premise],
  ['creatorNote', story.creatorNote ?? ''],
  ['opening', story.opening],
  ...story.openingSuggestions.map((s, i): [string, string] => [`suggestion ${i}`, s]),
  ...story.mechanicsChips.map((s, i): [string, string] => [`chip ${i}`, s]),
  ...story.characters.flatMap((c): Array<[string, string]> => [
    [`${c.id}.role`, c.role],
    [`${c.id}.cardBlurb`, c.cardBlurb],
    [`${c.id}.appearance`, c.appearance],
    ...c.voiceSamples.map((v, i): [string, string] => [`${c.id}.voice ${i}`, v]),
  ]),
  ...story.items.flatMap((i): Array<[string, string]> => [
    [`${i.id}.name`, i.name],
    [`${i.id}.description`, i.description],
    [`${i.id}.loreText`, i.loreText ?? ''],
  ]),
  ...story.locations.map((l): [string, string] => [`${l.id}.description`, l.description]),
  ...story.quests.flatMap((q): Array<[string, string]> => [
    [`${q.id}.summary`, q.summary],
    ...q.steps.map((s): [string, string] => [`${q.id}/${s.id}.playerCopy`, s.playerCopy]),
  ]),
  ...story.worldEvents.map((e): [string, string] => [`${e.id}.publicCopy`, e.publicCopy]),
  ...story.endings.map((e): [string, string] => [`${e.id}.epilogue`, e.epilogue]),
  ...story.archetypes.flatMap((a): Array<[string, string]> => [
    [`${a.id}.summary`, a.summary],
    [`${a.id}.blurb`, a.blurb ?? ''],
  ]),
];

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of playerFacing()) {
      expect(text, field).not.toContain('\\n');
    }
  });

  it('is written in English, with no stray script from another language', () => {
    const foreign = playerFacing().filter(([, text]) => /[^\x00-\x7F’‘“”—–·…]/.test(text));
    expect(foreign.map(([field]) => field)).toEqual([]);
  });
});

describe('the opener', () => {
  const paragraphs = story.opening.split('\n\n');

  it('is short enough to read in one breath', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('puts a named character’s voice in the first sixty words', () => {
    const quote = story.opening.indexOf('"');
    expect(quote, 'nobody speaks').toBeGreaterThan(-1);
    expect(words(story.opening.slice(0, quote)).length).toBeLessThanOrEqual(60);
    const speaking = paragraphs.find((p) => p.includes('"'))!;
    const names = story.characters.flatMap((c) => [calledName(c), c.name.split(' ')[0]!]);
    expect(names.some((n) => speaking.includes(n)), `unattributed: ${speaking}`).toBe(true);
  });

  it('ends on a question or a demand the player has to answer', () => {
    const last = paragraphs[paragraphs.length - 1]!;
    expect(last).toMatch(/"[^"]*\?[^"]*"/);
  });

  it('names nobody the player is expected to know already', () => {
    // Every capitalised word that is not the start of a sentence or a quote is
    // a proper noun. The only one allowed is the person speaking.
    const allowed = new Set(['Yuna']);
    const strangers: string[] = [];
    const re = /[A-Z][a-z’']+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(story.opening))) {
      const before = story.opening.slice(0, m.index).trimEnd();
      const prev = before.slice(-1);
      if (before === '' || '.!?"\n'.includes(prev)) continue;
      if (!allowed.has(m[0])) strangers.push(m[0]);
    }
    expect(strangers).toEqual([]);
  });

  it('starts with the person who is speaking in the room', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('yuna');
  });

  it('offers three cards: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions).toHaveLength(3);
    expect(said).toMatch(/^"/);
    expect(done).toMatch(/^I /);
    expect(risky).toMatch(/^I /);
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

describe('the premise and the choices read clearly', () => {
  it('passes the narrative clarity check with no errors', async () => {
    const { checkStoryClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('passes the choice clarity check with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const errors = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('describes every ability in a line short enough for a chip', () => {
    for (const ability of story.abilities) {
      expect(abilityEffect(story, ability).length, ability.id).toBeLessThan(120);
    }
  });
});

describe('the checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const stranded = story.abilities.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(stranded).toEqual([]);
  });

  it('speaks to the player in every character card', () => {
    const silent = story.characters.filter((c) => !/\byou\b/i.test(c.cardBlurb)).map((c) => c.id);
    expect(silent).toEqual([]);
  });

  it('keeps Teo’s card from giving away who he reports to', () => {
    // `teo_reports` is the reveal of "Three to One" and the `teo_comes_clean`
    // gate; the card may say he knew, never who asked or that he is paid.
    const teo = story.characters.find((c) => c.id === 'teo')!;
    expect(teo.cardBlurb).not.toMatch(/\b(?:pay|paid|paying|report|reports|reporting|Rook|debt|owes)\b/i);
  });

  it('gives every location a way in', () => {
    const orphans = story.locations.filter(
      (l) => !story.locations.some((o) => o.id !== l.id && o.connections.some((c) => c.to === l.id)),
    );
    expect(orphans.map((l) => l.id)).toEqual([]);
  });
});

describe('the world is wired up', () => {
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
    const broken: string[] = [];
    for (const { quest, step, route } of routes) {
      const where = `${quest}/${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:') && !grantable.has(flag.slice(5))) broken.push(`${where} needs ${flag}`);
      }
      for (const itemId of route.predicate.hasItems) {
        if (!obtainable.has(itemId)) broken.push(`${where} needs ${itemId}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const r of step.succeedWhenAny) {
        for (const itemId of r.predicate.hasItems) expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
      }
    }
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
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    }
    for (const i of story.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const f of story.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`starting ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push(`start ${story.rules.startingLocationId}`);
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const mv of e.movesCharacters) {
        if (!charIds.has(mv.characterId)) broken.push(`${e.id} moves ${mv.characterId}`);
        if (!locIds.has(mv.toLocationId)) broken.push(`${e.id} moves to ${mv.toLocationId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} on ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('reads no flag that nothing can set', () => {
    // Stricter than catalog.spec, which accepts any flag some predicate reads
    // as "declared". Here every flag a world reads must be produced by a
    // reward, a route, a world event or the engine itself.
    const settable = new Set<string>();
    for (const q of story.quests) {
      for (const st of q.steps) {
        for (const f of st.rewards.flags) settable.add(f);
        for (const r of st.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
      }
    }
    for (const e of story.worldEvents) for (const f of e.setsFlags) settable.add(f);
    for (const c of story.characters) {
      for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) settable.add(f);
    }

    const dead: string[] = [];
    const need = (where: string, flags: readonly string[]): void => {
      for (const f of flags) if (!settable.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
    };
    for (const q of story.quests) {
      if (q.discoverWhen) need(q.id, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) need(`${q.id}/${st.id}`, p.flagsSet);
        for (const r of st.succeedWhenAny) need(`${q.id}/${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const c of story.characters) for (const g of c.gates) need(`${c.id}/${g.id}`, g.requires.flagsSet);
    for (const e of story.worldEvents) need(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const e of story.endings) need(e.id, e.requires.flagsSet);
    for (const a of story.abilities) if (a.requires) need(a.id, a.requires.flagsSet);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag) need(`${l.id}->${c.to}`, [c.lockedByFlag]);
    }
    expect(dead).toEqual([]);
  });

  it('places everybody on purpose at the opening minute', () => {
    const minute = story.rules.startWorldMinute % 1440;
    const placed = story.characters.filter(
      (c) => c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) || c.homeLocationId,
    );
    expect(placed).toHaveLength(story.characters.length);
  });

  it('covers every minute of every schedule', () => {
    for (const c of story.characters) {
      const sorted = [...c.schedule].sort((a, b) => a.startMinute - b.startMinute);
      expect(sorted[0]!.startMinute, c.id).toBe(0);
      expect(sorted[sorted.length - 1]!.endMinute, c.id).toBe(1440);
      for (let i = 1; i < sorted.length; i++) expect(sorted[i]!.startMinute, c.id).toBe(sorted[i - 1]!.endMinute);
    }
  });

  it('closes a door somewhere when a route is taken', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('keeps every takeable alias unique', () => {
    const seen = new Map<string, string>();
    const clashes: string[] = [];
    for (const l of story.locations) {
      for (const t of l.takeableItems) {
        for (const alias of t.aka) {
          const key = alias.toLowerCase();
          const prior = seen.get(key);
          if (prior && prior !== t.itemId) clashes.push(`${alias}: ${prior} / ${t.itemId}`);
          seen.set(key, t.itemId);
        }
      }
    }
    expect(clashes).toEqual([]);
  });
});

describe('the cast are people', () => {
  it('uses expressions the generator draws', () => {
    const unknown = story.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
    );
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const called = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size).toBe(called.length);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.gates.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
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
        const shared = [...va].filter((w) => vb.has(w)).length;
        expect(shared / Math.min(va.size, vb.size), `${a.id} / ${b.id}`).toBeLessThan(0.3);
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
});

describe('everyone is an adult and the content stays 13+', () => {
  const AGES: Record<string, [number, string]> = {
    yuna: [21, 'Twenty-one'],
    teo: [22, 'Twenty-two'],
    adair: [47, 'Forty-seven'],
    rook: [23, 'Twenty-three'],
    marsh: [52, 'Fifty-two'],
  };

  it('states an adult age for every character, first thing in their appearance', () => {
    expect(story.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    for (const c of story.characters) {
      const [age, word] = AGES[c.id]!;
      expect(age, c.id).toBeGreaterThanOrEqual(18);
      expect(c.appearance.startsWith(`${word},`), c.id).toBe(true);
    }
  });

  it('states every age in the bible, including the people who are only named', () => {
    const named: Array<[string, number]> = [
      ['Yuna Takeda', 21],
      ['Teo Vance', 22],
      ['Professor Imogen Adair', 47],
      ['Callum Rook, called Rook', 23],
      ['Registrar Delphine Marsh, called Marsh', 52],
      ['Arlo Wren', 50],
      ['Moss Keller', 20],
      ['Dita Ferro', 22],
      ['Sami and Nour Haddad', 21],
      ['Hollis Grey', 22],
      ['Juno Achebe', 21],
    ];
    for (const [name, age] of named) {
      expect(age, name).toBeGreaterThanOrEqual(18);
      expect(bible, name).toContain(`${name} (${age})`);
    }
  });

  it('keeps Arlo Wren an adult wherever he is on the page', () => {
    const visiting = story.endings.find((e) => e.id === 'end_visiting_hours')!;
    expect(visiting.epilogue).toMatch(/Arlo Wren is fifty\b/);
    expect(story.rules.hardCanon.join(' ')).toMatch(/Arlo Wren, then a twenty-four-year-old/);
  });

  it('says the academy is post-secondary', () => {
    expect(story.premise).toMatch(/admits at eighteen/);
    expect(story.rules.hardCanon.join(' ')).toMatch(/post-secondary/);
  });

  it('uses no word that reads as a minor', () => {
    const MINOR =
      /\b(?:girls?|boys?|kids?|teens?|teenagers?|teenage|child|children|childlike|minors?|schools?|schoolgirls?|schoolboys?|underage|young)\b/i;
    const hits = playerFacing().filter(([, text]) => MINOR.test(text)).map(([field]) => field);
    expect(hits).toEqual([]);
    // The cover and portraits are briefed from the bible, so its image plan
    // and every art direction line are held to the same words.
    expect(imagePlan, 'bible image plan').not.toMatch(MINOR);
    const art = story.locations.filter((l) => MINOR.test(l.artDirection)).map((l) => l.id);
    expect(art).toEqual([]);
    expect(story.coverDirection, 'coverDirection').not.toMatch(MINOR);
    expect(story.openingPanel?.alt ?? '', 'openingPanel.alt').not.toMatch(MINOR);
  });

  it('borrows no franchise vocabulary', () => {
    const FRANCHISE =
      /\b(?:quirks?|nen|chakra|hokage|hunter association|plus ultra|one for all|all might|pro heroes?|pros|U\.A\.)\b/i;
    const hits = playerFacing().filter(([, text]) => FRANCHISE.test(text)).map(([field]) => field);
    expect(hits).toEqual([]);
    expect(JSON.stringify(story)).not.toMatch(FRANCHISE);
    expect(bible).not.toMatch(FRANCHISE);
  });
});

describe('ready for art and release (docs/stories-50/PIPELINE.md)', () => {
  it('paints its own title into the cover, spelled exactly', () => {
    const title = story.coverDirection.slice(story.coverDirection.indexOf('TITLE:'));
    expect(story.coverDirection).toContain('TITLE:');
    expect(title).toContain('Echo Class');
    expect(title).toContain('spelled exactly ECHO CLASS');
    expect(title).toMatch(/No other text anywhere\.$/);
  });

  it('keeps every cover effect off her face', () => {
    expect(story.coverDirection).toMatch(/HER FACE STAYS CLEAN/);
    expect(story.coverDirection).toMatch(/never on her face/);
  });

  it('opens on a panel of the person who speaks first', () => {
    const panel = story.openingPanel!;
    expect(panel.assetKey).toBe(`${story.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    expect(panel.alt.startsWith('Yuna')).toBe(true);
    expect(story.opening).toContain('Yuna says');
  });

  it('draws every carded character from a concrete appearance', () => {
    const vague = story.characters
      .filter((c) => c.cardBlurb.trim() && words(c.appearance).length < 12)
      .map((c) => c.id);
    expect(vague).toEqual([]);
  });

  it('opens straight on the scene and is not dated yet', () => {
    expect(story.prologue).toEqual([]);
    expect(story.publishedAt).toBeNull();
  });

  it('puts the system where the storyteller reads it', () => {
    for (const a of story.archetypes) expect(a.startingAbilities, a.id).toContain('echo_touch');
    const held = new Set(story.rules.startingItems.map((i) => i.itemId));
    const premiseItems = story.items.filter((i) => i.questItem && held.has(i.id)).map((i) => i.id);
    expect(premiseItems).toEqual(expect.arrayContaining(['transfer_file', 'rank_band']));
    expect(story.rules.hardCanon.join(' ')).toMatch(/sixty seconds/);
    expect(story.rules.toneGuide.length).toBeGreaterThan(200);
  });

  it('calls its titled characters by name', () => {
    const titled = story.characters.filter((c) => /^(?:Professor|Registrar)\b/.test(c.name) || c.id === 'marsh');
    for (const c of titled) expect(c.calledName, c.id).toBeTruthy();
  });
});

describe('the hidden rule stays hidden until it is learned', () => {
  it('keeps the Wren thread a lead only hearing about him opens', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_last_echo')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['heard_of_wren']);
  });

  it('locks holding past sixty behind knowing it is possible, in the world’s own words', () => {
    const hold = story.abilities.find((a) => a.id === 'hold_past_sixty')!;
    expect(hold.unlockedByDefault).toBe(false);
    expect(hold.requires?.flagsSet).toEqual(['knows:the_hold']);
    expect(hold.requires?.lockedCopy.length).toBeGreaterThan(30);
    expect(hold.requires?.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('grants it in the same step that teaches it', () => {
    const findOut = story.quests.find((q) => q.id === 'q_the_last_echo')!.steps.find((s) => s.id === 'find_out')!;
    expect(findOut.rewards.abilities).toContain('hold_past_sixty');
    expect(findOut.rewards.flags).toContain('knows:the_hold');
  });

  it('never mentions the hold in the premise or the opener', () => {
    for (const text of [story.premise, story.opening, story.hook]) {
      expect(text).not.toMatch(/past sixty|longer than sixty|Wren|eleven minutes/i);
    }
  });
});

describe('the week can genuinely go wrong', () => {
  it('has at least three losing endings', () => {
    const losses = ['end_expelled', 'end_restricted', 'end_transfer_out'];
    for (const id of losses) expect(story.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('lets the Registry restrict a player who simply never turned up', () => {
    // The honest failure mode of somebody who hoped the problem would go away.
    const route = routes.find(({ route: r }) => r.routeId === 'restricted_for_cause')!.route;
    expect(route.predicate.minRelationship).toEqual([]);
    expect(route.predicate.hasItems).toEqual([]);
    expect(route.setsFlags).toContain('restricted');
  });

  it('lets somebody walk out, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_transfer_out')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('can reach the top of the Board on reputation the quests actually pay', () => {
    const board = story.factions.find((f) => f.id === 'faction_board')!;
    const paid = story.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.rewards.reputation)
      .filter((r) => r.factionId === 'faction_board')
      .reduce((sum, r) => sum + r.amount, board.startingReputation);
    const needed = story.endings
      .flatMap((e) => e.requires.minFactionReputation)
      .filter((r) => r.factionId === 'faction_board')
      .reduce((max, r) => Math.max(max, r.value), 0);
    expect(paid).toBeGreaterThanOrEqual(needed);
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources).toHaveLength(3);
    for (const r of story.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo}`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('lets rest restore the body and nothing else', () => {
    const high = story.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['stamina']);
  });

  it('spends stamina when a cost has no price on it', () => {
    const cheapest = [...story.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('stamina');
  });

  it('lands a public fight on scrutiny and on the academy', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
    expect(story.factions[0]?.id).toBe('faction_larkspur');
  });

  it('drives every descending variable with some ability cost', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const drivers = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(drivers.length, r.id).toBeGreaterThan(0);
    }
  });
});

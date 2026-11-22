import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { THE_MORNING_OF_THE_GALLOWS } from './the-morning-of-the-gallows.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * The Morning of the Gallows, held to the promise on its own card: you were
 * hanged once, you remember it, and the woman who signed the warrant is the
 * one holding the cell door open.
 *
 * This world is not in `LAUNCH_CATALOG` yet, so `catalog.spec` and the
 * director's clarity sweep do not see it. Everything those suites would ask of
 * a launch world is asked here instead, plus the three checks the story
 * checkpoint added after the first slate: every gated ability is granted
 * somewhere, every card speaks to the player, and every place can be reached.
 */

const story = THE_MORNING_OF_THE_GALLOWS;

const start = (archetypeId = 'arch_watch') =>
  createInitialState({
    sessionId: 'sess_the_morning_of_the_gallows',
    story,
    identity: {
      displayName: 'Aldo Wenlock',
      pronouns: 'he/him',
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

  it('is short enough to read in one breath, and long enough to land', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
    expect(words(story.opening).length).toBeGreaterThanOrEqual(50);
  });

  it('puts a named character’s voice in the first sixty words', () => {
    const quote = story.opening.indexOf('"');
    expect(quote, 'nobody speaks').toBeGreaterThan(-1);
    expect(words(story.opening.slice(0, quote)).length).toBeLessThanOrEqual(60);
    const speaking = paragraphs.find((p) => p.includes('"'))!;
    const names = story.characters.flatMap((c) => [calledName(c), c.name.split(' ')[0]!]);
    expect(names.some((n) => speaking.includes(n)), `unattributed: ${speaking}`).toBe(true);
  });

  it('ends on her question: walk out now, or die like last time', () => {
    const last = paragraphs[paragraphs.length - 1]!;
    expect(last.trimEnd().endsWith('"')).toBe(true);
    expect(last).toMatch(/"Are you walking out with me now,"/);
    expect(last).toMatch(/"or staying to die like last time\?"/);
  });

  it('says it is a rewind, not a rescue', () => {
    expect(story.opening).toMatch(/three years from this morning/);
  });

  it('opens the panel on Isra, the one who speaks, and draws it from her portrait', () => {
    const panel = story.openingPanel!;
    expect(panel.assetKey).toBe(`${story.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    const isra = story.characters.find((c) => c.id === 'isra')!;
    expect(panel.alt.startsWith(`${isra.calledName},`)).toBe(true);
    // The lookup in infra/scripts/opening-panel-art.ts, verbatim. It keys on
    // the first word of `name`, which for "Lady Isra Vane" is a title, so she
    // is found by the last fallback: the first character with a card blurb.
    // Keep her first in the cast, and keep the other names' first words
    // ("Prince", "Sergeant", "Sabine", "Hangman") out of the alt.
    const named =
      story.characters.find((c) => panel.alt.toLowerCase().startsWith(c.name.split(' ')[0]!.toLowerCase())) ??
      story.characters.find((c) => panel.alt.includes(c.name.split(' ')[0]!)) ??
      story.characters.find((c) => c.cardBlurb.trim().length > 0);
    expect(named?.id).toBe('isra');
    expect(panel.alt).not.toMatch(/\b(?:teen\w*|girls?|boys?|young\w*|kids?|child\w*|little|petite|adults?|old(?:er)?|aged?|\d+)\b/i);
  });

  it('names nobody the player is expected to know already', () => {
    // Every capitalised word that is not the start of a sentence or a quote is
    // a proper noun. The only one allowed is the person speaking.
    const allowed = new Set(['Isra']);
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

  it('starts with Isra at the door and the sergeant asleep at his desk', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('isra');
    expect(present).toContain('hob');
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
    const skillIds = new Set(story.skills.map((s) => s.id));
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
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} checks ${a.check.skillId}`);
    }
    for (const i of story.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} modifies ${s}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} trains ${s}`);
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
    for (const e of story.endings) need(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
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

  it('gives the first morning at least three ways to go, and every kind of knight a start', () => {
    const cellDoor = story.quests.find((q) => q.id === 'q_walk_or_stay')!.steps.find((s) => s.id === 'the_cell_door')!;
    expect(cellDoor.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
    for (const a of story.archetypes) {
      expect(a.startingAbilities.length + a.startingItems.length, a.id).toBeGreaterThan(0);
    }
  });
});

describe('the regression is visible to the storyteller', () => {
  it('starts the player holding the rope mark and the signet, as quest items', () => {
    const starting = story.rules.startingItems.map((i) => i.itemId);
    for (const id of ['rope_mark', 'your_signet']) {
      expect(starting, id).toContain(id);
      expect(story.items.find((i) => i.id === id)?.questItem, id).toBe(true);
    }
  });

  it('gives every kind of knight the memory of the first life', () => {
    for (const a of story.archetypes) expect(a.startingAbilities, a.id).toContain('remember_it');
  });

  it('puts who remembers, and the one rule of the knot, in hard canon', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Exactly three people remember the first life: the player, Isra, and Hangman Tull/);
    expect(canon).toMatch(/There is no third morning/);
  });

  it('keeps to the twelve endings the storyteller reads', () => {
    expect(story.endings.length).toBeLessThanOrEqual(12);
  });
});

describe('the Prince’s guilt stays hidden until it is found', () => {
  it('never puts it in the premise, the hook, the opener or his card', () => {
    const corvin = story.characters.find((c) => c.id === 'corvin')!;
    const GUILT = /nightbell|stillroom|cask|his father|poisons?ing (?:his|the king)|the prince (?:is|was) /i;
    for (const [field, text] of [
      ['premise', story.premise],
      ['hook', story.hook],
      ['opening', story.opening],
      ['corvin.cardBlurb', corvin.cardBlurb],
      ['corvin.role', corvin.role],
    ] as const) {
      expect(text, field).not.toMatch(GUILT);
    }
  });

  it('lets no card join the dots before the first tap', () => {
    // The detail screen shows every card before play. Who buys the sergeant,
    // and that the Hangman tied the knot, are found in play.
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).not.toMatch(/buy (?:your|the) sergeant|sergeant’s debt|tied the knot/i);
    }
  });

  it('tells the storyteller never to narrate it', () => {
    expect(story.rules.hardCanon.join(' ')).toMatch(/Never state this in narration/);
    expect(story.rules.toneGuide).toMatch(/never state it in narration/);
  });
});

describe('the knot stays hidden until it is learned', () => {
  it('keeps the Hangman’s thread a lead only meeting him opens', () => {
    const lead = story.quests.find((q) => q.id === 'q_no_third_morning')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['met:tull']);
  });

  it('locks seeing the rope line behind knowing the knot, in the world’s own words', () => {
    const see = story.abilities.find((a) => a.id === 'see_the_line')!;
    expect(see.unlockedByDefault).toBe(false);
    expect(see.requires?.flagsSet).toEqual(['knows:the_knot']);
    expect(see.requires?.lockedCopy.length).toBeGreaterThan(30);
    expect(see.requires?.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('grants it in the same step that teaches it', () => {
    const ask = story.quests.find((q) => q.id === 'q_no_third_morning')!.steps.find((s) => s.id === 'ask_the_hangman')!;
    expect(ask.rewards.abilities).toContain('see_the_line');
    expect(ask.rewards.flags).toContain('knows:the_knot');
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
      expect(c.secrets.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(4);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('makes Isra the deepest of them', () => {
    const isra = story.characters.find((c) => c.id === 'isra')!;
    expect(isra.startingRelationship.affection).toBeGreaterThanOrEqual(65);
    expect(isra.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(isra.fears.length).toBeGreaterThanOrEqual(2);
    expect(isra.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(isra.secrets.length).toBeGreaterThanOrEqual(2);
    expect(isra.voiceSamples.length).toBeGreaterThanOrEqual(4);
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
      ['I am not upset', /\bI(?:’m| am) not (?:upset|telling|asking|saying)\b/i],
    ];
    for (const [label, pattern] of MOVES) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });
});

describe('everyone is an adult and the content stays 13+', () => {
  const AGES: Record<string, [number, string]> = {
    isra: [26, 'twenty-six'],
    corvin: [30, 'thirty'],
    hob: [54, 'fifty-four'],
    sabine: [32, 'thirty-two'],
    tull: [66, 'sixty-six'],
  };

  it('states an adult age for every character in hard canon, and draws them as adults', () => {
    expect(story.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    const first = story.rules.hardCanon[0]!;
    for (const c of story.characters) {
      const [age, word] = AGES[c.id]!;
      expect(age, c.id).toBeGreaterThanOrEqual(18);
      expect(first, c.id).toMatch(new RegExp(`${calledName(c)}[^,.]* ${word}\\b`));
      // Portraits are drawn from appearance: an adult, then costume, never a number.
      expect(c.appearance, c.id).toMatch(/^An (?:adult|older) (?:woman|man), /);
      expect(c.appearance, c.id).not.toMatch(/\b(?:twenty|thirty|forty|fifty|sixty|seventy)\b|\d/i);
    }
  });

  it('opens hard canon on the cast’s ages, every one of them by name', () => {
    const first = story.rules.hardCanon[0]!;
    expect(first.startsWith('Everyone in this story is an adult.')).toBe(true);
    for (const c of story.characters) expect(first, c.id).toContain(calledName(c));
  });

  it('uses no word that reads as a minor', () => {
    const MINOR = /\b(?:girls?|boys?|kids?|teens?|teenagers?|teenage|child|children|childlike|minors?|schoolgirls?|schoolboys?|underage|young(?:er|est)?)\b/i;
    const hits = playerFacing().filter(([, text]) => MINOR.test(text)).map(([field]) => field);
    expect(hits).toEqual([]);
  });

  // The 13+ lines live in hard canon, which the storyteller reads every turn.
  // The tone guide is also every image prompt's mood, so it carries none of them.
  it('keeps the gallows to timber and crowd, and romance to a kiss', () => {
    const GORE = /\b(?:blood(?:y|ied)?|gore|corpse|entrails|strangl\w*|choking|dangling|severed|naked|undress\w*|bed(?:ded)?\s+(?:her|him))\b/i;
    const hits = playerFacing().filter(([, text]) => GORE.test(text)).map(([field]) => field);
    expect(hits).toEqual([]);
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/goes up to a kiss and no further/);
    expect(canon).toMatch(/described by its timber and its crowd, never by a body/);
  });

  it('keeps self-harm and the mechanics of a hanging off the page', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Nobody in this story harms themselves/);
    expect(canon).toMatch(/there is no third morning/);
    expect(canon).toMatch(/Never give the mechanics of a hanging/);
    // Drop figures and knot placement, anywhere the storyteller reads them.
    const MECHANICS = /\b(?:\d+|nine) stone\b|\b(?:\d+|six)-foot\b|\bleft ear\b|\bclean drop\b|\btalks in lengths\b/i;
    expect(JSON.stringify(story)).not.toMatch(MECHANICS);
  });

  it('says outright that the gallows takes adults only', () => {
    expect(story.rules.hardCanon[0]).toMatch(/Sabine’s brother was twenty-four/);
    expect(story.rules.hardCanon[0]).toMatch(/nobody under eighteen is ever condemned/);
  });

  it('asks the art for a bare gallows, never a noose', () => {
    expect(story.coverDirection).toMatch(/no rope and no noose anywhere in the image/);
    for (const l of story.locations) {
      if (/gallows/i.test(l.artDirection ?? '')) expect(l.artDirection, l.id).toMatch(/bare/);
      expect(l.artDirection ?? '', l.id).not.toMatch(/rafters/);
    }
  });

  it('borrows no franchise vocabulary', () => {
    const FRANCHISE = /\b(?:regressor|returner|heavenly demon|murim|status window|system window|return by death|re:zero|cheonma|sword saint)\b/i;
    const hits = playerFacing().filter(([, text]) => FRANCHISE.test(text)).map(([field]) => field);
    expect(hits).toEqual([]);
    expect(JSON.stringify(story)).not.toMatch(FRANCHISE);
    // The Nixon scandal, to most App Store readers. Ids may keep the old word.
    expect(JSON.stringify(story)).not.toMatch(/Watergate/);
  });
});

describe('ready for art and release', () => {
  const cover = story.coverDirection ?? '';

  it('gives the title its own line: style, placement and exact spelling', () => {
    expect(cover.match(/TITLE:/g)).toHaveLength(1);
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(title).toContain(`the title ${story.title} painted into the art in the upper third`);
    expect(title).toMatch(/engraved serif logo/);
    // generatedCoverPrompt capitalises the wordmark, so the spelling line agrees with it.
    expect(title).toContain(`spelled exactly ${story.title.toUpperCase()}, large and legible at thumbnail size`);
    expect(title).toMatch(/No other text anywhere\.$/);
  });

  it('puts Isra alone in front, by costume and pose, never by an age word', () => {
    expect(cover).toMatch(/^SUBJECT: Isra Vane, .* alone and unmistakable in the foreground/);
    expect(cover).not.toMatch(
      /\b(?:teen\w*|girls?|boys?|young\w*|youth\w*|kids?|child\w*|student\w*|little|petite|small|adults?|older|aged?|\d+)\b/i,
    );
    // Coat and pose, nothing lingering.
    expect(cover).not.toMatch(/\b(?:legs?|thighs?|skin-tight|figure|curv\w*|bare (?:skin|shoulders?))\b/i);
  });

  it('keeps every effect on the keys, the sunrise and the title, never on her face', () => {
    expect(cover).toMatch(/HER FACE STAYS CLEAN: no marks, glow, glints or shadows on her face or skin\./);
    expect(cover).toMatch(/Every light effect stays on the iron keys, the distant sunrise and the title, never on her face\./);
  });

  it('keeps the tone guide, which every image prompt carries as its mood, to mood', () => {
    expect(story.rules.toneGuide.length).toBeGreaterThan(200);
    expect(story.rules.toneGuide).not.toMatch(
      /\b(?:adults?|kiss\w*|romance|bod(?:y|ies)|harm\w*|hang\w*|noose|rope|knot|gallows|blood\w*|wound\w*|young\w*)\b/i,
    );
  });

  it('paces the reveals in hard canon, where the storyteller reads it', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Nobody volunteers a secret\./);
    expect(canon).toMatch(/Tull explains the knot only to someone who comes to his house and asks plainly/);
  });

  it('gives every face on a cast card a concrete appearance to draw from', () => {
    for (const c of story.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.length, c.id).toBeGreaterThan(120);
      expect(c.visualHook.trim(), c.id).not.toBe('');
      expect(c.silhouette.trim(), c.id).not.toBe('');
    }
  });

  it('gives every titled character the name people actually call them', () => {
    const titled = story.characters.filter((c) => /^(?:Lady|Prince|Sergeant|Hangman)\b/.test(c.name));
    expect(titled.map((c) => c.id)).toEqual(['isra', 'corvin', 'hob', 'tull']);
    for (const c of titled) {
      expect(c.calledName, c.id).toBeTruthy();
      expect(c.name, c.id).toContain(c.calledName!);
      expect(calledName(c), c.id).toBe(c.calledName);
    }
  });

  it('opens straight on the scene and is not dated until release', () => {
    expect(story.prologue).toEqual([]);
    expect(isReleaseDate(story.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });
});

describe('the week can genuinely go wrong', () => {
  it('has the losing endings', () => {
    const losses = ['end_the_same_gallows', 'end_his_captain_again', 'end_someone_elses_rope', 'end_her_signature'];
    for (const id of losses) expect(story.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('hangs a player who strikes the Prince without proof, at the next assize', () => {
    const assize = story.worldEvents.find((e) => e.id === 'we_the_assize')!;
    expect(assize.requiresFlags).toEqual(['struck_the_prince']);
    expect(assize.cancelledByFlags).toEqual(['corvin_accused']);
    expect(assize.setsFlags).toContain('condemned');
  });

  it('lets the grey coat buy the sergeant if nobody stops her', () => {
    const sold = story.worldEvents.find((e) => e.id === 'we_the_marker_sold')!;
    expect(sold.requiresFlags).toEqual([]);
    expect(sold.cancelledByFlags).toEqual(['hob_debt_paid']);
  });

  it('lets somebody walk out, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_the_south_road')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
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

  it('lands a public fight on suspicion and on the Crown’s law', () => {
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('suspicion');
    expect(story.factions[0]?.id).toBe('faction_crown');
  });

  it('drives every descending variable with some ability cost', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const drivers = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(drivers.length, r.id).toBeGreaterThan(0);
    }
  });

  it('builds a starting state for every kind of knight, in the cell, holding the mark', () => {
    for (const a of story.archetypes) {
      const { player } = start(a.id);
      expect(player.locationId, a.id).toBe('watergate_cells');
      expect(player.abilities, a.id).toContain('remember_it');
      expect(player.inventory.map((i) => i.itemId), a.id).toContain('rope_mark');
    }
  });
});

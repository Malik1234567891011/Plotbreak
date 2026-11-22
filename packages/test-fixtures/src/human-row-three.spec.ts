import { describe, expect, it } from 'vitest';
import { abilityEffect, archetypeGrants, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { HUMAN_ROW_THREE } from './human-row-three.js';

/**
 * Human, Row Three, held to the promises on its own card: a roll call that has
 * to be answered, five Houses with a lantern each, a name that has to be
 * earned, and a cast where every monster wants something of their own.
 *
 * The story is not in the launch catalog yet, so the structural checks that
 * `catalog.spec.ts`, `choice-clarity.spec.ts` and `story-checks.ts` would run
 * on it are repeated here, against this story alone.
 */

const S = HUMAN_ROW_THREE;

const identity = (archetypeId: string) => ({
  displayName: 'Jordan Reyes',
  pronouns: 'they/them',
  ageBand: null,
  archetypeId,
  worldKnowsAboutYou: '',
  advanced: {},
  portraitAssetId: null,
});

const start = (archetypeId = 'arch_folklore') =>
  createInitialState({ sessionId: 'sess_human_row_three', story: S, identity: identity(archetypeId) });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny.map((route) => ({ step: s.id, route })));
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is twenty-one. Mr. Bones's is his age at death. */
const AGES: Record<string, number> = { garra: 21, vey: 131, sylph: 22, bones: 51, teague: 24, keeper: 61 };

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

  it('carries the asset keys the catalog derives for it', () => {
    expect(S.id).toBe('sv_human_row_three_1');
    expect(S.storyId).toBe('story_human_row_three');
    expect(S.openingPanel?.assetKey).toBe('story_human_row_three/opening');
    expect(S.openingPanel?.alt).toMatch(/^Ishiko /);
    expect(S.publishedAt).toBeNull();
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
    expect(head).toContain('Ishiko');
    expect(head).toContain('They told us you’d be bigger."');
    expect(head).toMatch(/"[^"]*\byou\b[^"]*"/);
  });

  it('ends on the question the register asks', () => {
    expect(S.opening.trim()).toMatch(/"So\. Present, or absent\?"$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the two classmates the scene introduces may appear.
    const ALLOWED = new Set(['Ishiko', 'Sylph', 'I']);
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
    // The risky one goes for the register itself, in front of the whole room.
    expect(risky).toMatch(/real name over "Human"/);
    // The done card is a stare, not a once-over: turn 1 never invites a body description.
    expect(done).not.toMatch(/up and down|look \w+ over/i);
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

describe('the system lives where the storyteller can read it', () => {
  it('starts the player holding their papers, with paragraph nine on them', () => {
    // Production's storyteller reads quest items, never resources or steps.
    const papers = S.items.find((i) => i.id === 'exchange_papers')!;
    expect(papers.questItem).toBe(true);
    expect(S.rules.startingItems.map((i) => i.itemId)).toContain('exchange_papers');
    expect(papers.loreText).toMatch(/Paragraph nine/);
  });

  it('makes the register and the lanterns quest items', () => {
    for (const id of ['the_register', 'five_lanterns']) {
      expect(S.items.find((i) => i.id === id)?.questItem, id).toBe(true);
    }
    expect(S.items.find((i) => i.id === 'the_register')!.description).toContain('Human. Row three.');
  });

  it('answers the risky opening card in a field production reads', () => {
    // worldBrief sends each quest as title and summary only, so what happens
    // when the player reaches for the pen has to live on Mr. Bones himself.
    const bones = S.characters.find((c) => c.id === 'bones')!;
    expect(bones.boundaries.join(' ')).toMatch(/book closed on its fingers/);
    expect(S.rules.hardCanon[3]).toMatch(/Walking out before answering is marked absent on the spot/);
  });

  it('gives every archetype the verb roll call asks for', () => {
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('answer_for_yourself');
    expect(ability('answer_for_yourself').unlockedByDefault).toBe(true);
  });

  it('spells out roll call, paragraph nine, the ward, naming and the vote in hard canon', () => {
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/twice a day: half past eight in homeroom, and six in the evening/);
    expect(canon).toMatch(/Paragraph nine of the Accord/);
    expect(canon).toMatch(/Founders’ ward/);
    expect(canon).toMatch(/heads of three different Houses vouch/);
    expect(canon).toMatch(/Three lit keeps it open/);
  });
});

describe('the week runs on a clock', () => {
  const event = (id: string) => S.worldEvents.find((e) => e.id === id)!;

  it('starts at morning roll on the first day', () => {
    expect(S.rules.startWorldMinute).toBe(8 * 60 + 30);
    expect(S.rules.startingLocationId).toBe('homeroom');
  });

  it('takes evening roll in the Great Hall at six', () => {
    expect(event('we_evening_roll').atWorldMinute).toBe(18 * 60);
    expect(event('we_evening_roll').locationId).toBe('great_hall');
  });

  it('holds the Lantern Vote on the seventh evening with all five heads in the hall', () => {
    const vote = event('we_vote_night');
    expect(vote.atWorldMinute).toBe(6 * 1440 + 20 * 60);
    expect(vote.setsFlags).toContain('vote_night');
    expect(vote.movesCharacters.map((m) => m.characterId).sort()).toEqual(['bones', 'garra', 'sylph', 'teague', 'vey']);
  });

  it('ends the vote lit by any of three roads, or dark by default', () => {
    const vote = steps.find((s) => s.id === 'the_vote')!;
    const ids = vote.succeedWhenAny.map((r) => r.routeId);
    expect(ids).toEqual(['lit_by_the_register', 'lit_by_the_gate', 'lit_by_the_lake', 'dark_windows']);
    expect(vote.succeedWhenAny.at(-1)!.setsFlags).toEqual(['briar_closed']);
  });

  it('holds the vote even for a player who never counted the lanterns', () => {
    const lanterns = S.quests.find((q) => q.id === 'q_five_lanterns')!;
    expect(lanterns.discoverWhen?.flagsSet).toEqual(['first_roll_done']);
    const count = steps.find((s) => s.id === 'count_the_lanterns')!;
    expect(count.succeedWhenAny.at(-1)!.predicate.flagsSet).toEqual(['vote_night']);
  });

  it('carries out paragraph nine for two absences or harm to a named student', () => {
    const nine = steps.find((s) => s.id === 'stay_on_the_register')!;
    const collected = nine.succeedWhenAny.filter((r) => r.setsFlags.includes('collected'));
    expect(collected.some((r) => r.predicate.flagsSet.includes('marked_absent'))).toBe(true);
    expect(collected.some((r) => r.predicate.flagsSet.some((f) => f.startsWith('attacked:')))).toBe(true);
    // A contest Ishiko agreed to is not paragraph nine.
    expect(collected.some((r) => r.predicate.flagsSet.includes('attacked:garra'))).toBe(false);
  });
});

describe('a name is earned, and "Human" is allowed to be enough', () => {
  it('names the player only when three Houses vouch in the Great Hall', () => {
    const vouch = steps.find((s) => s.id === 'three_houses')!;
    expect(vouch.rewards.flags).toContain('named_in_register');
    for (const r of vouch.succeedWhenAny) {
      expect(r.predicate.atLocation, r.routeId).toBe('great_hall');
      expect(r.predicate.minRelationship, r.routeId).toHaveLength(3);
    }
  });

  it('has an ending for staying Human on purpose', () => {
    const human = S.endings.find((e) => e.id === 'end_human_will_do')!;
    expect(human.requires.flagsUnset).toContain('named_in_register');
  });
});

describe('the last human is a lead, never a corridor', () => {
  const lead = S.quests.find((q) => q.id === 'q_the_open_line')!;

  it('opens only for a player who goes looking', () => {
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_open_line']);
  });

  it('keeps the vote a whole game without it', () => {
    const leadFlags = new Set(lead.steps.flatMap((s) => [...s.rewards.flags, ...s.succeedWhenAny.flatMap((r) => r.setsFlags)]));
    const needing = S.endings.filter((e) => e.requires.flagsSet.some((f) => leadFlags.has(f))).map((e) => e.id);
    expect(needing.sort()).toEqual(['end_marked_at_last', 'end_the_next_keeper']);
  });

  it('keeps her off the detail page', () => {
    // Story Detail shows every cardBlurb before turn 1.
    const keeper = S.characters.find((c) => c.id === 'keeper')!;
    expect(keeper.cardBlurb).not.toMatch(/forty-one|Penhallow|\bAda\b|loaf|bread|human/i);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is twenty-one');
    expect(canon).toMatch(/post-secondary/);
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
    // Off-cast adults the storyteller voices or names have ages too.
    expect(canon).toMatch(/Gate-Warden Grenna is seventy-nine/);
    expect(canon).toMatch(/Mr\. Pruitt, the Exchange Office clerk, is fifty-eight/);
    expect(canon).toMatch(/June is sixty-six/);
    expect(S.rules.hardCanon[2]).toMatch(/troll of twenty/);
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('never reaches for a minor-coded word anywhere in the story', () => {
    const MINOR = /\b(teen\w*|girls?|boys?|kids?|child\w*|schoolgirl|schoolboy|minors?|underage|high school|middle school|loli\w*|shota\w*)\b/i;
    expect(JSON.stringify(S)).not.toMatch(MINOR);
  });
});

describe('the cover', () => {
  it('puts the title in the art and the oni in front', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('HUMAN, ROW THREE');
    expect(cover).toContain('Ishiko');
    expect(cover).toMatch(/no letters, no numbers/i);
  });

  it('poses and dresses everybody for a 13+ shelf', () => {
    const RISKY = /leaning (forward|in)|toward the viewer|uniform|cleavage|soaked|white shirt/i;
    expect(S.coverDirection).not.toMatch(RISKY);
    for (const c of S.characters) {
      expect(c.appearance, c.id).not.toMatch(RISKY);
      expect(c.silhouette, c.id).not.toMatch(RISKY);
    }
  });

  it('labels the bar and the wine bottles', () => {
    expect(S.contentDescriptors).toContain('ALCOHOL_REFERENCES');
  });
});

describe('nobody is only there to react', () => {
  it('starts the teacher, the oni, the harpy and the Countess in homeroom', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['bones', 'garra', 'sylph', 'vey']));
    expect(present).not.toContain('keeper');
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const block = c.schedule.find((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(block ?? c.homeLocationId, c.id).toBeTruthy();
    }
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
      expect(c.appearance.length, `${c.id} has no appearance`).toBeGreaterThan(0);
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

  it('gives no two characters the same short name', () => {
    const words = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(words).size).toBe(words.length);
  });

  it('uses expressions the generator draws', () => {
    const unknown = S.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
      expect(a.requires?.lockedCopy.length ?? 0, a.id).toBeGreaterThan(30);
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
    }
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('the catalog’s structural checks, run on this story alone', () => {
  it('has more than one way through, and some routes shut a door', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
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
      const where = `${step}/${route.routeId}`;
      for (const flag of route.predicate.flagsSet) {
        if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), `${where} needs ${flag}`).toBe(true);
      }
      for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const s of steps) {
      const granted = new Set(s.rewards.items.map((i) => i.itemId));
      const demanded = [...(s.succeedWhen?.hasItems ?? []), ...s.succeedWhenAny.flatMap((r) => r.predicate.hasItems)];
      for (const itemId of demanded) expect(granted.has(itemId), `${s.id} awards ${itemId}`).toBe(false);
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
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} item owned by ${t.ownerId}`);
      }
    }
    for (const c of S.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} scheduled at ${b.locationId}`);
    }
    for (const a of S.abilities) for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
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
          for (const f of pred.flagsSet) {
            for (const prefix of ['spoke:', 'attacked:', 'met:']) {
              if (f.startsWith(prefix) && !charIds.has(f.slice(prefix.length))) broken.push(`${st.id} reads ${f}`);
            }
            if (f.startsWith('visited:') && !locIds.has(f.slice(8))) broken.push(`${st.id} reads ${f}`);
            if (f.startsWith('used:') && !abIds.has(f.slice(5))) broken.push(`${st.id} reads ${f}`);
          }
        }
      }
    }
    expect(broken, `dangling references: ${broken.join('; ')}`).toEqual([]);
  });

  it('never gates something behind a flag nothing can set', () => {
    const declared = new Set<string>();
    for (const st of steps) {
      for (const f of st.rewards.flags) declared.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) declared.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) declared.add(f);
    const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const engineSets = (f: string) => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

    // Stricter than the catalog: every flag read anywhere must also be set
    // somewhere, so a predicate cannot "declare" a flag just by reading it.
    const dead: string[] = [];
    const check = (where: string, flags: readonly string[]) => {
      for (const f of flags) if (!declared.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
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
    for (const e of S.endings) check(e.id, e.requires.flagsSet);
    for (const a of S.abilities) if (a.requires) check(a.id, a.requires.flagsSet);
    for (const l of S.locations) for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    expect(dead, `unreachable content: ${dead.join('; ')}`).toEqual([]);
  });

  it('never uses a relationship gate id as a flag', () => {
    const gateIds = new Set(S.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const read = [
      ...S.endings.flatMap((e) => e.requires.flagsSet),
      ...routes.flatMap(({ route }) => route.predicate.flagsSet),
      ...S.abilities.flatMap((a) => a.requires?.flagsSet ?? []),
    ];
    expect(read.filter((f) => gateIds.has(f))).toEqual([]);
  });
});

describe('the choice screen explains itself', () => {
  it('has no clarity errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
  });

  it('says what is being chosen and that it is fixed', () => {
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });

  it('makes every option distinct and mechanically real', () => {
    const tagSets = S.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
    for (const option of S.archetypes) {
      expect(option.name, option.id).not.toMatch(/—/);
      expect(option.summary.length, option.id).toBeGreaterThan(40);
      const grants = archetypeGrants(S, option);
      expect(grants.abilities.length + grants.skills.length + grants.attributes.length + grants.items.length, option.id).toBeGreaterThan(0);
    }
  });

  it('gives every ability a plain one-line effect', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('gives every archetype an ability of its own beside the shared one', () => {
    for (const a of S.archetypes) {
      expect(a.startingAbilities.length, a.id).toBe(2);
      for (const id of a.startingAbilities) expect(ability(id).unlockedByDefault, `${a.id} ${id}`).toBe(true);
    }
    const own = S.archetypes.map((a) => a.startingAbilities[1]);
    expect(new Set(own).size).toBe(S.archetypes.length);
    for (const a of S.archetypes) expect(() => start(a.id), a.id).not.toThrow();
  });
});

describe('it can end badly, early and in many ways', () => {
  it('keeps exactly twelve endings, all of which the storyteller reads', () => {
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

  it('gates the Countess and Sylph endings on flags every path can set', () => {
    // took_veys_tea and knows_sylphs_stake sit behind routes that close their
    // step first, so the endings read flags that do not depend on route order.
    expect(S.endings.find((e) => e.id === 'end_every_tooth')!.requires.flagsSet).toEqual(['briar_open', 'spoke:vey']);
    expect(S.endings.find((e) => e.id === 'end_first_post')!.requires.flagsSet).toEqual(['briar_open', 'in_the_book']);
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_collected', 'end_dark_windows', 'end_a_year_and_a_day', 'end_back_through_the_gate'];
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
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['nerve']);
  });

  it('makes public violence bring the wardens before anything else', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('alarm');
    expect(S.factions[0]?.id).toBe('faction_gate');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

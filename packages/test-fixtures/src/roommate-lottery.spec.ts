import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { ROOMMATE_LOTTERY } from './roommate-lottery.js';

/**
 * Roommate Lottery, held to the promises on its own card: a roommate with two
 * million followers who can say no, a hearing on Friday that settles the room
 * whatever the player does, and a secret the player can keep, sell or lose.
 *
 * It is not in `LAUNCH_CATALOG` yet, so the catalogue-wide specs do not see
 * it. The structural checks they would run are repeated here against this one
 * world, alongside the three checks every new story runs and the opener rules
 * from the stories plan.
 */

const S = ROOMMATE_LOTTERY;

const start = (archetypeId = 'arch_lab') =>
  createInitialState({
    sessionId: 'sess_roommate_lottery',
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
const AGES: Record<string, number> = { yuri: 21, ben: 20, haneul: 29, kit: 22, jonah: 21, park: 48 };
const AGE_WORDS_IN_CANON: Record<string, string> = {
  yuri: 'twenty-one',
  ben: 'twenty',
  haneul: 'twenty-nine',
  kit: 'twenty-two',
  jonah: 'twenty-one',
  park: 'forty-eight',
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
    expect(S.promises.length).toBeGreaterThanOrEqual(3);
    expect(S.characters.length).toBeGreaterThanOrEqual(3);
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
    expect(S.rules.allowsCombat).toBe(false);
    expect(S.rules.toneGuide).toMatch(/at most a kiss/);
    expect(S.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
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
    expect(head).toContain('"Yuri Sakamoto.');
  });

  it('ends on a demand the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"You have until I finish this coffee to prove it’s yours\. Starting now\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the woman introducing herself may appear. The room number "12C" is not a
    // name, so a capital glued to digits is skipped.
    const ALLOWED = new Set(['Yuri', 'Sakamoto', 'I’m', 'I']);
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
    // The risky one ends the clock by drinking it.
    expect(risky).toMatch(/coffee/);
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
    expect(canon).toContain('The player is a third-year undergraduate, twenty or older');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(`${c.calledName ?? c.name.split(' ')[0]!}`);
      expect(canon, c.id).toContain(AGE_WORDS_IN_CANON[c.id]!);
    }
  });

  it('describes people by build and clothes, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl\w*|boy\w*|young\w*|youth\w*|kid\w*|child\w*|minor|student|schoolgirl|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older)\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });

  it('hands the production storyteller every age, whichever job the player picks', async () => {
    const { worldBrief } = await import('@plotbreak/director');
    for (const archetype of S.archetypes) {
      const brief = worldBrief(S, archetype.id);
      expect(brief, archetype.id).toContain('Yuri Sakamoto is twenty-one');
      expect(brief, archetype.id).toContain('Ms. Park Eun-ha forty-eight');
      for (const id of archetype.startingAbilities) expect(brief, `${archetype.id}/${id}`).toContain(ability(id).name);
    }
  });
});

describe('the cover', () => {
  it('puts the title in the art and her in front', () => {
    const cover = S.coverDirection!;
    expect(cover).toContain('ROOMMATE LOTTERY');
    expect(cover).toContain('Yuri Sakamoto');
    expect(cover).toMatch(/no letters, no numbers/i);
    expect(S.openingPanel?.assetKey).toBe('story_roommate_lottery/opening');
    expect(S.publishedAt).toBeNull();
  });
});

describe('she can say no, and the week ends whatever the player does', () => {
  it('starts with only her in the room', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toEqual(['yuri']);
  });

  it('starts her as a rival, not a fan', () => {
    const yuri = S.characters.find((c) => c.id === 'yuri')!;
    expect(yuri.startingRelationship.rivalry).toBeGreaterThan(yuri.startingRelationship.affection);
    expect(yuri.startingRelationship.trust).toBeLessThan(30);
    expect(yuri.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(yuri.secrets.length).toBeGreaterThanOrEqual(2);
  });

  it('earns the romance and never forces it', () => {
    const romance = S.characters.find((c) => c.id === 'yuri')!.gates.find((g) => g.kind === 'ROMANCE')!;
    expect(romance.requires.flagsSet).toContain('knows:the_real_yuri');
    const say = steps.find((s) => s.id === 'say_what_this_is')!;
    const together = say.succeedWhenAny.find((r) => r.routeId === 'together')!;
    expect(together.predicate.minRelationship.length).toBeGreaterThanOrEqual(2);
    // The honest default: the week ends and nobody said anything.
    const nothing = say.succeedWhenAny.find((r) => r.routeId === 'said_nothing')!;
    expect(nothing.predicate.minRelationship).toEqual([]);
    expect(nothing.predicate.flagsSet).toEqual(['hearing_over']);
  });

  it('holds the hearing on Friday at ten, and it always reaches a verdict', () => {
    const hearing = S.worldEvents.find((e) => e.id === 'we_the_hearing')!;
    expect(hearing.atWorldMinute).toBe(6 * 1440 + 10 * 60);
    expect(hearing.requiresFlags).toEqual([]);
    expect(hearing.cancelledByFlags).toEqual([]);
    const verdict = steps.find((s) => s.id === 'the_hearing')!;
    const last = verdict.succeedWhenAny.at(-1)!;
    expect(last.predicate.flagsSet).toEqual(['hearing_day']);
    const prep = steps.find((s) => s.id === 'build_your_case')!;
    expect(prep.succeedWhenAny.at(-1)!.predicate.flagsSet).toEqual(['hearing_day']);
  });

  it('tells the storyteller what day each event lands on, since it never sees the clock', () => {
    const DAY = /\b(Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday)\b/;
    for (const e of S.worldEvents) expect(`${e.publicCopy} ${e.directorNotes}`, e.id).toMatch(DAY);
  });
});

describe('her secret can be kept, sold or lost', () => {
  it('lets the player switch off every event that exposes her', () => {
    for (const id of ['we_the_post', 'we_the_window']) {
      const e = S.worldEvents.find((x) => x.id === id)!;
      expect(e.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const f of e.cancelledByFlags) expect(canBeSet(f), `${id} cancelled by ${f}, which nothing sets`).toBe(true);
    }
  });

  it('only offers the sale once somebody is buying', () => {
    expect(ability('sell_the_tip').requires.flagsSet).toEqual(['quadwatch_bounty']);
    expect(ability('sell_the_tip').costs).toEqual([{ resourceId: 'exposure', amount: 40 }]);
  });

  it('keeps the way through the lobby locked until the player knows why it matters', () => {
    const hide = ability('keep_her_hidden');
    expect(hide.unlockedByDefault).toBe(false);
    expect(hide.requires.flagsSet).toEqual(['knows:her_reason']);
    expect(hide.requires.lockedCopy.length).toBeGreaterThan(30);
    expect(hide.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);
  });

  it('has an ending for each way it can go', () => {
    for (const flag of ['sold_her_out', 'exposed', 'she_feels_safe']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
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
    }
    for (const a of S.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
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
    for (const e of S.worldEvents) check(e.id, e.requiresFlags);
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
    const losses = ['end_floor_twelve_door_c', 'end_five_hundred_dollars', 'end_the_long_commute', 'end_two_doors_down'];
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

  it('makes a fight in the corridor a privacy problem first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('exposure');
    expect(S.factions[0]?.id).toBe('faction_housing');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });
});

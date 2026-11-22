import { describe, expect, it } from 'vitest';
import { abilityEffect, archetypeGrants, calledName, knownExpression } from '@plotbreak/contracts';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { VILLAIN_TRACK } from './villain-track.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Villain Track, held to the promise on its own card: a player handed a black
 * mask and a deadline has a whole game whether they take the badge, refuse it,
 * or give it back.
 *
 * The world is not registered in `index.ts` yet, so the catalog, endings,
 * director and choice-clarity specs do not see it. Every invariant they would
 * have applied is repeated here against this one story, plus the three the
 * 50-story checkpoint added: gated abilities are granted, card blurbs address
 * the player, and every location has a way in.
 */

const story = VILLAIN_TRACK;

const start = (archetypeId = 'arch_unnoticed') =>
  createInitialState({
    sessionId: 'sess_vt',
    story,
    identity: {
      displayName: 'Noor Haddad',
      pronouns: 'she/her',
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

const words = (text: string): number => text.trim().split(/\s+/).length;

/** Every flag something in this world can set. */
const settable = (): Set<string> => {
  const flags = new Set<string>();
  for (const q of story.quests) {
    for (const st of q.steps) {
      for (const f of st.rewards.flags) flags.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) flags.add(f);
    }
  }
  for (const e of story.worldEvents) for (const f of e.setsFlags) flags.add(f);
  for (const c of story.characters) {
    for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) flags.add(f);
  }
  return flags;
};

/** The closed list from the catalog spec. `knows:` is deliberately not in it. */
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (f: string): boolean => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

describe('the 50-story checkpoint', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || a.requires);
    expect(gated.length, 'nothing is gated, so this check proves nothing').toBeGreaterThan(0);
    const orphaned = gated.filter((a) => !a.unlockedByDefault && !granted.has(a.id)).map((a) => a.id);
    expect(orphaned, 'gated abilities nothing hands out').toEqual([]);
  });

  it('writes every card blurb to the player', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase(), c.id).not.toBe(c.role.toLowerCase());
      expect(/\byou\b/i.test(c.cardBlurb), `${c.id}: "${c.cardBlurb}"`).toBe(true);
    }
  });

  it('gives every location a way in', () => {
    const inbound = new Set(story.locations.flatMap((l) => l.connections.map((c) => c.to)));
    const orphans = story.locations.filter((l) => !inbound.has(l.id)).map((l) => l.id);
    expect(orphans, 'locations nothing connects to').toEqual([]);
  });
});

describe('the opener', () => {
  it('stays inside 50 to 120 words', () => {
    expect(words(story.opening)).toBeGreaterThanOrEqual(50);
    expect(words(story.opening)).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking inside the first 60 words', () => {
    const firstQuote = story.opening.search(/["“]/);
    expect(firstQuote, 'nobody speaks').toBeGreaterThan(-1);
    expect(words(story.opening.slice(0, firstQuote)), 'the first line of dialogue comes too late').toBeLessThan(60);
    const firstParagraphWithSpeech = story.opening
      .split(/\n\s*\n/)
      .find((p) => /["“]/.test(p))!;
    const named = story.characters.some((c) => firstParagraphWithSpeech.includes(calledName(c)));
    expect(named, `the first speaker is not named: ${firstParagraphWithSpeech}`).toBe(true);
  });

  it('ends on a question the player has to answer', () => {
    expect(story.opening.trim()).toMatch(/\?["”]?$/);
  });

  it('offers one said, one done and one risky card', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions).toHaveLength(3);
    expect(said, 'the first card should be speech').toMatch(/^["“]/);
    expect(done, 'the second card should be an action').not.toMatch(/^["“]/);
    expect(risky, 'the third card should be an action').not.toMatch(/^["“]/);
    expect(risky, 'the third card should be the risky one').toMatch(/\blift\b/i);
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const text of [story.premise, story.opening, story.hook, ...story.openingSuggestions]) {
      expect(text).not.toContain('\\n');
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const [{ RuleBasedIntentParser }] = await Promise.all([import('@plotbreak/director')]);
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent, `these opening cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
  });

  it('puts the people the opener names in the room', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('celeste');
    expect(present).toContain('juno');
  });
});

describe('what the production storyteller is told', () => {
  it('names every gifted cast member’s gift in the brief runTurnPure sends', async () => {
    // Combatant tags never reach the storyteller. If a gift is not in the
    // brief, the model invents one the first time it comes up.
    const { worldBrief } = await import('@plotbreak/director');
    const brief = worldBrief(story, 'arch_signal');
    for (const gift of ['steps through light', 'in the dark she is only', 'wrong note', 'pocket of air', 'holds his breath', 'throws any sound']) {
      expect(brief, gift).toContain(gift);
    }
  });

  it('keeps another franchise’s department and licence names out of the story', () => {
    const everything = JSON.stringify(story);
    expect(everything).not.toMatch(/hero course|provisional|hero school/i);
    // A black mask is a prop; "Black Mask" capitalised is somebody else's villain.
    expect(everything).not.toMatch(/Black Mask/);
  });
});

describe('everybody is an adult, and the bible says so', () => {
  it('states an age of 18 or over for every character', async () => {
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/02_VILLAIN_TRACK.md', import.meta.url),
      'utf8',
    );
    const ages = new Map<string, number>();
    for (const match of bible.matchAll(/^### (.+), (\d+)\s*$/gm)) ages.set(match[1]!, Number(match[2]));
    for (const c of story.characters) {
      expect(ages.get(c.name), `${c.name} has no stated age in the bible`).toBeDefined();
      expect(ages.get(c.name)!, c.name).toBeGreaterThanOrEqual(18);
    }
  });

  it('never uses a word that reads as a minor', () => {
    const MINOR = /\b(girls?|boys?|kids?|child|children|teens?|teenagers?|schoolgirls?|schoolboys?|minors?)\b/i;
    const texts = [
      story.premise,
      story.hook,
      story.opening,
      ...story.openingSuggestions,
      ...story.rules.hardCanon,
      ...story.characters.flatMap((c) => [c.role, c.cardBlurb, c.appearance, ...c.voiceSamples]),
      ...story.archetypes.flatMap((a) => [a.summary, a.blurb]),
    ];
    const hits = texts.filter((t) => MINOR.test(t));
    expect(hits).toEqual([]);
  });

  it('states every age in hard canon too, where the storyteller reads it', async () => {
    const { readFileSync } = await import('node:fs');
    const bible = readFileSync(
      new URL('../../../docs/story-bibles/new50/02_VILLAIN_TRACK.md', import.meta.url),
      'utf8',
    );
    const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const inWords = (n: number): string => `${TENS[Math.floor(n / 10)]}${n % 10 ? `-${ONES[n % 10]}` : ''}`;
    const canon = story.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toMatch(/eighteen or older/);
    for (const match of bible.matchAll(/^### (.+), (\d+)\s*$/gm)) {
      expect(canon, match[1]).toMatch(new RegExp(`${match[1]}(?: is)? ${inWords(Number(match[2]))}\\b`));
    }
  });

  it('describes people by build and costume, never by an age word', () => {
    // Portraits and the cover are drawn from these, and an image model reads
    // "twenty" or "student" as younger than it is.
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|\d+)\b/i;
    for (const c of story.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      expect(c.appearance, c.id).not.toMatch(AGE_WORDS);
    }
    expect(story.coverDirection).not.toMatch(AGE_WORDS);
    expect(story.openingPanel?.alt).not.toMatch(AGE_WORDS);
  });
});

describe('the art and release pipeline', () => {
  it('puts the title in the art and every effect off her face', () => {
    const cover = story.coverDirection;
    expect(cover).toMatch(/\bTITLE:/);
    expect(cover).toContain('"Villain Track"');
    expect(cover).toContain('spelled exactly VILLAIN TRACK');
    expect(cover).toContain('Celeste');
    expect(cover).toMatch(/never on her face/i);
    expect(cover).toMatch(/no letters and no numbers/i);
  });

  it('opens on a panel of the person asking the question', () => {
    const panel = story.openingPanel!;
    expect(panel.assetKey).toBe(`${story.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    // The art script takes the character whose first name starts the alt as
    // the panel's reference portrait.
    const subject = story.characters.find((c) => panel.alt.startsWith(c.name.split(' ')[0]!));
    expect(subject?.id).toBe('celeste');
    const lastBeat = story.opening.trim().split(/\n\s*\n/).at(-1)!;
    expect(lastBeat).toContain('Celeste');
    expect(lastBeat.trim()).toMatch(/\?"$/);
  });

  it('opens straight on the scene and is dated only at release', () => {
    expect(story.prologue).toEqual([]);
    expect(isReleaseDate(story.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('calls titled people by the name the world uses', () => {
    for (const c of story.characters.filter((x) => /^(Dean|Professor|Officer)\b/.test(x.name))) {
      expect(c.calledName, c.id).toBeTruthy();
      expect(c.name, c.id).toContain(c.calledName!);
    }
    expect(calledName(story.characters.find((c) => c.id === 'marrow')!)).toBe('Marrow');
    expect(calledName(story.characters.find((c) => c.id === 'dray')!)).toBe('Dray');
  });

  it('puts the story’s system where the storyteller reads it', () => {
    // runTurnPure never reads resources, step notes or locked abilities.
    const canon = story.rules.hardCanon.join('\n');
    expect(canon).toMatch(/villain name on Name Night/);
    expect(canon).toMatch(/a limit and a cost/);
    expect(canon).toMatch(/paper in front of a camera/);
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('black_mask');
    for (const arch of story.archetypes) {
      expect(arch.startingAbilities.length, arch.id).toBeGreaterThan(0);
      for (const id of arch.startingAbilities) expect(story.abilities.some((a) => a.id === id), id).toBe(true);
    }
    expect(story.rules.toneGuide.length).toBeGreaterThan(200);
  });
});

describe('every launch-world invariant, applied here', () => {
  it('has more than one way through', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
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
      for (const itemId of route.predicate.hasItems) {
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
      for (const itemId of demanded) expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
    }
  });

  it('gives every archetype something the rules can see', () => {
    for (const archetype of story.archetypes) {
      const grants = archetypeGrants(story, archetype);
      const total = grants.abilities.length + grants.skills.length + grants.attributes.length + grants.items.length;
      expect(total, archetype.id).toBeGreaterThan(0);
    }
  });

  it('leaves something worth taking, owned by someone who exists', () => {
    const takeable = story.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    for (const entry of takeable) {
      expect(story.items.some((item) => item.id === entry.itemId), entry.itemId).toBe(true);
      if (entry.ownerId) expect(story.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
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
      for (const t of l.takeableItems) if (!itemIds.has(t.itemId)) broken.push(`${l.id} offers ${t.itemId}`);
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} checks ${a.check.skillId}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of story.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`starting ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push(`start ${story.rules.startingLocationId}`);
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} to ${m.toLocationId}`);
      }
    }
    for (const o of story.openingObligations) {
      if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
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
    expect(broken, broken.join('; ')).toEqual([]);
  });

  it('never gates anything behind a flag nothing can set', () => {
    const flags = settable();
    const dead: string[] = [];
    const need = (flag: string, where: string): void => {
      if (!flags.has(flag) && !engineSets(flag)) dead.push(`${where} needs ${flag}`);
    };
    for (const e of story.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) need(f, `ending ${e.id}`);
    }
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) need(f, `ability ${a.id}`);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag) need(c.lockedByFlag, `${l.id}->${c.to}`);
    }
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) need(f, `${q.id} discovery`);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) for (const f of p?.flagsSet ?? []) need(f, `${q.id}/${st.id}`);
        for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) need(f, `${q.id}/${st.id}/${r.routeId}`);
      }
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) need(f, `gate ${g.id}`);
    for (const e of story.worldEvents) for (const f of e.requiresFlags) need(f, `event ${e.id}`);
    expect(dead, dead.join('; ')).toEqual([]);
  });

  it('never gates on standing nothing can earn', () => {
    const ceiling = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    for (const archetype of story.archetypes) {
      for (const entry of archetype.startingReputation) {
        const floor = story.factions.find((f) => f.id === entry.factionId)?.startingReputation ?? 0;
        ceiling.set(entry.factionId, Math.max(ceiling.get(entry.factionId) ?? 0, floor + entry.amount));
      }
    }
    for (const q of story.quests) {
      for (const st of q.steps) {
        for (const gain of st.rewards.reputation) {
          ceiling.set(gain.factionId, (ceiling.get(gain.factionId) ?? 0) + Math.max(0, gain.amount));
        }
      }
    }
    const gates = [
      ...story.quests.flatMap((q) =>
        q.steps.flatMap((st) => [
          ...(st.enterWhen?.minFactionReputation ?? []),
          ...(st.succeedWhen?.minFactionReputation ?? []),
          ...st.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation),
        ]),
      ),
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
    ];
    for (const gate of gates) expect(ceiling.get(gate.factionId) ?? 0, gate.factionId).toBeGreaterThanOrEqual(gate.value);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = story.characters.filter(
      (c) =>
        !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('can be walked to from where it starts', () => {
    const reachable = new Set([story.rules.startingLocationId]);
    for (const l of story.locations) for (const edge of l.connections) reachable.add(edge.to);
    for (const l of story.locations) expect(reachable.has(l.id), l.id).toBe(true);
  });

  it('closes something when a route is taken', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('uses expressions the generator draws', () => {
    const unknown = story.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
    );
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const called = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(called).size, called.join(', ')).toBe(called.length);
  });

  it('never lets two different items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of story.locations) {
      for (const item of l.takeableItems) {
        for (const alias of item.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, items]) => items.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
  });

  it('authors hard canon', () => {
    expect(story.rules.hardCanon.length).toBeGreaterThan(0);
  });
});

describe('the endings', () => {
  it('offers more than one destination, and at least one that is not a win', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('does not end before it has been a story, and says what each ending means', () => {
    for (const e of story.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets the charge go off without the player making a mistake', () => {
    // Page Nine is the ordinary loss for a player who never read past their
    // own lines. It must need nothing the player has to earn.
    const pageNine = story.endings.find((e) => e.id === 'end_page_nine')!;
    expect(pageNine.requires.minRelationship).toEqual([]);
    expect(pageNine.requires.hasItems).toEqual([]);
    const charge = story.worldEvents.find((e) => e.setsFlags.includes('pier_burned'))!;
    expect(charge.requiresFlags).toEqual([]);
  });

  it('lets somebody walk away, early', () => {
    const ferry = story.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(ferry.minTurn).toBeLessThanOrEqual(22);
  });
});

describe('the Bridge Night lead is optional and behaves like it', () => {
  it('hides the lead behind a flag only a curious or loyal player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_pale_duke')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows_bridge_seam'));
    expect(sources.length).toBeGreaterThanOrEqual(2);
    for (const e of sources) expect(e.requiresFlags.length, `${e.id} fires for everybody`).toBeGreaterThan(0);
  });

  it('leaves most endings reachable without it', () => {
    const mystery = new Set(['bridge_night_known', 'holds_the_leash', 'marrow_free', 'went_real']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(8);
  });
});

describe('the cast are people, not meters', () => {
  it('gives everybody something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('does not let any two of them run the same rhetorical move', () => {
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
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}%`).toBeLessThan(0.3);
      }
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
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo}`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one thing rest can restore', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('lets every pressure actually rise', () => {
    // A GOOD_LOW resource nothing raises is a band nobody ever sees.
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raised = story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(raised, r.id).toBe(true);
    }
  });
});

describe('the storefront reads clearly', () => {
  it('meets the content bar', () => {
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
    expect(words(story.premise)).toBeGreaterThanOrEqual(100);
    const paragraphs = story.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p), p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(story.promises.length).toBeGreaterThanOrEqual(3);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
  });

  it('passes narrative clarity on the premise', async () => {
    const { checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkNarrativeClarity(story.premise, { story, kind: 'premise' });
    expect(
      report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.code}: ${i.message}`),
    ).toEqual([]);
    expect(report.passed).toBe(true);
  });

  it('passes choice clarity on every choice screen', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(story);
    expect(
      report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`),
    ).toEqual([]);
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
    for (const option of story.archetypes) {
      expect(option.name, option.id).not.toMatch(/—/);
      expect(option.summary.length, option.id).toBeGreaterThan(40);
      expect(option.playstyle.length, option.id).toBeGreaterThanOrEqual(2);
    }
    const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('says what every ability does, whether it can fail, and what it costs', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });
});

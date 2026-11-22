import { describe, expect, it } from 'vitest';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import {
  RuleBasedIntentParser,
  checkStoryChoiceClarity,
  checkStoryClarity,
  worldBrief,
} from '@plotbreak/director';
import { RESCUE_RATING } from './rescue-rating.js';

/**
 * Rescue Rating, held to the promise on its card: the best save of your life,
 * live, and the woman in your arms is the most wanted thief in the city.
 *
 * This world is not in `LAUNCH_CATALOG` yet, so none of the catalogue-wide
 * specs (catalog, endings, catalogue-invariants) see it. The checks they would
 * run are repeated here, against this story alone, until it is registered.
 *
 * The failure this world is most exposed to is that the camera stops being the
 * mechanic. Every public choice is supposed to come back as a number and three
 * lines of chat, and Sloane's one rule — no camera sees her unless somebody is
 * touching her — has to hold in every beat. Most of what is pinned below exists
 * so the writer is told that, and told it in the places it actually reads.
 */

const story = RESCUE_RATING;

const start = (archetypeId: string | null = 'arch_heavy') =>
  createInitialState({
    sessionId: 'sess_rescue_rating',
    story,
    identity: {
      displayName: 'Jules Arden',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

/** Every flag something in this world writes, the way `endings.spec` counts them. */
function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map']);
  for (const quest of story.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = [
  'met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:', 'knows:', 'route:', 'closed:',
];
const engineSets = (flag: string): boolean =>
  flag === 'left_the_map' || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

/** Every string a player or the writer will read, for the content sweeps. */
function everyString(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const v of value) everyString(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) everyString(v, out);
  return out;
}

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    const offenders = everyString(story).filter((s) => s.includes('\\n'));
    expect(offenders.map((s) => s.slice(0, 60))).toEqual([]);
  });

  it('avoids the three tics the writer copies from its examples', () => {
    const TICS: Array<[string, RegExp]> = [
      ['not X, but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s’']{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
      ['something like / something between', /\bsomething (?:like|between)\b/i],
    ];
    const prose = [story.premise, story.opening, ...story.rules.styleExamples, story.rules.toneGuide];
    for (const [label, pattern] of TICS) {
      const hits = prose.filter((p) => pattern.test(p));
      expect(hits.map((h) => h.slice(0, 60)), label).toEqual([]);
    }
  });
});

describe('the opener', () => {
  const opening = story.opening;

  it('fits on a phone: between fifty and a hundred and twenty words', () => {
    const count = words(opening).length;
    expect(count).toBeGreaterThanOrEqual(50);
    expect(count).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking inside the first sixty words', () => {
    const firstQuote = opening.indexOf('"');
    expect(firstQuote, 'nobody speaks').toBeGreaterThan(-1);
    const before = opening.slice(0, firstQuote);
    expect(words(before).length).toBeLessThanOrEqual(60);
    // The speaker is named on the page before she speaks.
    expect(before).toContain('Sloane');
  });

  it('ends on a question put to the player', () => {
    expect(opening.trim()).toMatch(/\?["”]?$/);
    const lastLine = opening.trim().split('\n').pop()!;
    expect(lastLine).toMatch(/\b(you|hero)\b/i);
  });

  it('never leans on a name the player has not been told', () => {
    // The chat introduces Sloane by name and says who she is in the next
    // line. Everything else in this world is introduced later, by somebody.
    for (const noun of [
      'Tallyhouse', 'Calder', 'Dante', 'Roe', 'Ladder', 'Feed', 'Bureau', 'Kit', 'Navarro',
      'Mensah', 'Underline', 'Span', 'Vask', 'Corinne', 'Pier', 'Run Sheet', 'Harrow',
    ]) {
      expect(opening, noun).not.toContain(noun);
    }
    expect(opening).toMatch(/MOST WANTED/);
  });

  it('talks to every player the same way, whatever their pronouns or power', () => {
    // The chat uses the player's pronouns or rank number, never "bro".
    expect(opening).not.toMatch(/\b(bro|dude|girl|king|queen)\b/i);
    // Only one archetype flies, so no card may assume the player is in the air.
    for (const s of story.openingSuggestions) expect(s, s).not.toMatch(/\b(land|fly|flying|hover)\b/i);
  });

  it('shows the camera mechanic before it asks anything', () => {
    // The rating as a number and the chat in capitals, which is the format the
    // tone guide then asks the writer to keep.
    expect(opening).toMatch(/\d\.\d/);
    expect(opening).toMatch(/^[A-Z’' ]{12,}$/m);
    expect(opening).toMatch(/camera/i);
  });

  it('offers three responses: one said, one done, one risky', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions).toHaveLength(3);
    expect(said).toMatch(/^["“]/);
    expect(done).toMatch(/^I /);
    expect(done).not.toMatch(/["“]/);
    expect(risky).toMatch(/camera off/i);
    for (const s of story.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, {
        story,
        state,
        intentId: 'intent_card_probe',
        addressee: null,
      });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });

  it('has an opening panel on the story’s own asset key', () => {
    expect(story.openingPanel?.assetKey).toBe('story_rescue_rating/opening');
    const alt = story.openingPanel?.alt ?? '';
    expect(alt.length).toBeGreaterThan(40);
    expect(alt.length).toBeLessThanOrEqual(200);
    // The panel is drawn with the portrait of whoever the alt names first, and
    // that has to be the person who speaks in the opener.
    expect(alt.startsWith('Sloane ')).toBe(true);
  });
});

describe('ready for the art and release pipeline', () => {
  it('opens straight on the scene and has no release date yet', () => {
    expect(story.prologue).toEqual([]);
    expect(story.publishedAt).toBeNull();
  });

  it('gives every card a face to draw', () => {
    for (const c of story.characters) {
      if (!c.cardBlurb.trim()) continue;
      expect(c.appearance.trim().length, c.id).toBeGreaterThan(80);
    }
  });

  it('puts the camera in every player’s hands, where the narrator reads it', () => {
    for (const archetype of story.archetypes) {
      expect(archetype.startingAbilities, archetype.id).toContain('go_dark');
      expect(worldBrief(story, archetype.id), archetype.id).toContain('Go Dark');
    }
    const cam = story.items.find((i) => i.id === 'shoulder_cam')!;
    expect(cam.questItem).toBe(true);
    expect(story.rules.startingItems.map((i) => i.itemId)).toContain('shoulder_cam');
  });
});

describe('the roof at twenty to ten', () => {
  it('starts on Pier Tower roof at 21:40 with Sloane in your arms', () => {
    const state = start();
    expect(state.player.locationId).toBe('the_rooftop');
    expect(story.rules.startWorldMinute).toBe(21 * 60 + 40);
    const here = charactersPresent(state).map((c) => c.characterId);
    expect(here).toContain('sloane');
  });

  it('keeps the rest of the cast off the roof until their events land them there', () => {
    const here = charactersPresent(start()).map((c) => c.characterId);
    for (const id of ['dante', 'kit', 'vask', 'mensah']) expect(here, id).not.toContain(id);
    // Mensah and Dante arrive on purpose, two and six minutes in.
    const mensah = story.worldEvents.find((e) => e.id === 'we_mensah_on_the_stairs')!;
    const dante = story.worldEvents.find((e) => e.id === 'we_dante_lands')!;
    expect(mensah.movesCharacters).toEqual([{ characterId: 'mensah', toLocationId: 'the_rooftop' }]);
    expect(dante.movesCharacters).toEqual([{ characterId: 'dante', toLocationId: 'the_rooftop' }]);
    expect(mensah.atWorldMinute).toBeGreaterThan(story.rules.startWorldMinute);
    expect(dante.atWorldMinute).toBeGreaterThan(mensah.atWorldMinute);
  });

  it('drops the arm ten minutes before the cue on the page', () => {
    const page = story.items.find((i) => i.id === 'laminated_page')!;
    expect(page.description).toContain('21:50');
    expect(story.rules.hardCanon.join(' ')).toMatch(/Dante Roe at 21:50/);
    expect(story.rules.hardCanon.join(' ')).toMatch(/ten minutes early/);
  });

  it('lets a player who holds on keep holding on', () => {
    // The step notes never reach the narrator, so the rule lives in the tone guide.
    expect(story.rules.toneGuide).toMatch(/keeps hold of Sloane she stays held/);
    const sloane = story.characters.find((c) => c.id === 'sloane')!;
    expect(sloane.boundaries.join(' ')).toMatch(/does not get her free/);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = story.rules.startWorldMinute % 1440;
    const dumped = story.characters.filter(
      (c) =>
        !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) &&
        c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('starts every player with the camera and the licence', () => {
    const inventory = start().player.inventory.map((i) => i.itemId);
    expect(inventory).toContain('shoulder_cam');
    expect(inventory).toContain('licence_card');
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || a.requires);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) {
      if (ability.unlockedByDefault) continue;
      expect(granted.has(ability.id), `${ability.id} is never granted`).toBe(true);
    }
    // And whatever an ability's `requires` asks for, something sets.
    const flags = settable();
    for (const ability of story.abilities) {
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(flags.has(flag) || engineSets(flag), `${ability.id} needs ${flag}`).toBe(true);
      }
    }
  });

  it('writes every card blurb to the player', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge', () => {
    for (const location of story.locations) {
      const inbound = story.locations.some(
        (other) => other.id !== location.id && other.connections.some((c) => c.to === location.id),
      );
      expect(inbound, `${location.id} has no way in`).toBe(true);
    }
  });
});

describe('wired like a launch world', () => {
  const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
  const routes = steps.flatMap(({ quest, step }) =>
    step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
  );

  it('has more than one way through, and some routes shut doors', () => {
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
      for (const itemId of route.predicate.hasItems) {
        expect(obtainable.has(itemId), `${where} needs ${itemId}`).toBe(true);
      }
    }
  });

  it('never demands the thing it is about to hand you', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const route of step.succeedWhenAny) {
        for (const itemId of route.predicate.hasItems) {
          expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
        }
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
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check && !skillIds.has(a.check.skillId ?? '')) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} item ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} ability ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
    }
    for (const f of story.factions) {
      for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
    }
    for (const i of story.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} modifies ${s}`);
    }
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId) || !locIds.has(m.toLocationId)) broken.push(`${e.id} moves ${m.characterId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} ${r.characterId}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} ${r.factionId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} item ${i}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
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

  it('never gates anything behind a flag nothing can set', () => {
    const flags = settable();
    const dead: string[] = [];
    const need = (where: string, list: readonly string[]): void => {
      for (const f of list) if (!flags.has(f) && !engineSets(f)) dead.push(`${where} needs ${f}`);
    };
    for (const q of story.quests) {
      if (q.discoverWhen) need(q.id, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) need(st.id, p.flagsSet);
        for (const r of st.succeedWhenAny) need(`${st.id}/${r.routeId}`, r.predicate.flagsSet);
      }
    }
    for (const c of story.characters) for (const g of c.gates) need(g.id, g.requires.flagsSet ?? []);
    for (const e of story.worldEvents) need(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const e of story.endings) need(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag) need(`${l.id}->${c.to}`, [c.lockedByFlag]);
    }
    expect(dead).toEqual([]);
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const location of story.locations) {
      for (const item of location.takeableItems) {
        for (const alias of item.aka ?? []) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, ids]) => ids.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
  });

  it('keeps ids unique', () => {
    for (const list of [story.locations, story.items, story.abilities, story.characters, story.quests, story.archetypes, story.endings, story.worldEvents]) {
      const ids = list.map((x) => x.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('authors hard canon', () => {
    expect(story.rules.hardCanon.length).toBeGreaterThanOrEqual(5);
  });
});

describe('six voices', () => {
  const people = story.characters.filter((c) => c.id !== 'chat');

  it('gives every one of them something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.topics.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
      expect(c.gates.length, c.id).toBeGreaterThan(0);
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
    ];
    for (const [label, pattern] of MOVES) {
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v)));
      expect(users.length, label).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared differentiator in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Sloane bargains and calls the player "hero".
    expect(sample('sloane')).toMatch(/owe you|hero/i);
    // Dante calls them "rookie" and talks to the camera.
    expect(sample('dante')).toMatch(/Rookie/);
    // Kit calls them by their rank number when she is annoyed.
    expect(sample('kit')).toMatch(/Four-one-one-two/);
    // Vask speaks in production language.
    expect(sample('vask')).toMatch(/Lovely|in the edit|From the top/);
    // Mensah says "in order" and "Licensee".
    expect(sample('mensah')).toMatch(/In order/);
    expect(sample('mensah')).toMatch(/Licensee/);
    // The chat shouts in capitals and calls the player by rank number.
    expect(sample('chat')).toMatch(/4112/);
    expect(sample('chat')).toMatch(/[A-Z]{4,} [A-Z]{4,}/);
  });

  it('only uses expressions the art pipeline knows', () => {
    for (const c of story.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
  });

  it('gives everybody a name the writer can use once and keep', () => {
    const names = story.characters.map((c) => calledName(c));
    expect(new Set(names).size).toBe(names.length);
    expect(calledName(story.characters.find((c) => c.id === 'vask')!)).toBe('Vask');
    expect(calledName(story.characters.find((c) => c.id === 'mensah')!)).toBe('Mensah');
  });

  it('is a cast of adults, and says how old each of them is', () => {
    // The ages live in the canon the narrator reads. The appearance, which the
    // portraits are drawn from, says "An adult woman" or "An adult man" and no
    // number, as the pilot's does.
    const AGES: Record<string, [number, string]> = {
      sloane: [27, 'Sloane Lyle is twenty-seven'],
      dante: [29, 'Dante Roe twenty-nine'],
      kit: [31, 'Kit Navarro thirty-one'],
      vask: [44, 'Corinne Vask forty-four'],
      mensah: [46, 'Tobiah Mensah forty-six'],
    };
    const canon = story.rules.hardCanon.join(' ');
    for (const c of people) {
      const entry = AGES[c.id];
      expect(entry, `${c.id} has no stated age`).toBeDefined();
      expect(entry![0]).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(entry![1]);
      expect(c.appearance, c.id).toMatch(/^An adult (woman|man),/);
    }
    // The chat is a crowd, and the canon says who is allowed in it.
    const chat = story.characters.find((c) => c.id === 'chat')!;
    expect(chat.appearance).toMatch(/^Not a person/);
    expect(chat.speechStyle).toMatch(/verified adult/);
    expect(story.rules.hardCanon.join(' ')).toMatch(/Every character in this story is an adult/);
  });
});

describe('content: adults, 13+, original', () => {
  const all = everyString(story).join('\n');

  it('has no minor-coded words anywhere', () => {
    expect(all).not.toMatch(
      /\b(teen|teens|teenage|teenager|schoolgirl|schoolboy|child|children|kid|kids|minor|minors|underage|high school|middle school|little girl|little boy|loli|shota|year-old)\b/i,
    );
  });

  it('stays at a kiss and keeps injuries off the page', () => {
    expect(all).not.toMatch(
      /\b(naked|nude|nudity|sex|sexual|sexy|breasts?|cleavage|lingerie|undress\w*|bedroom scene|gore|gory|disembowel\w*|decapitat\w*|entrails|suicide|self-harm|overdose)\b/i,
    );
    // The romance ceiling is written down where the writer reads it.
    expect(story.rules.toneGuide).toMatch(/up to a kiss/i);
  });

  it('borrows no franchise vocabulary', () => {
    expect(all).not.toMatch(
      /\b(quirks?|nen|chakra|hokage|hunter association|pro heroes|pro hero|hero tv|sternbild|all might|plus ultra|one for all|system window|status window|hero association|hero agency)\b/i,
    );
  });

  it('is written in English', () => {
    expect(story.premise).toMatch(/\bthe\b/);
    expect(all).not.toMatch(/[àâçéèêëîïôûùüÿœæ]/i);
  });
});

describe('clarity and the director’s content bar', () => {
  it('passes the premise and opening clarity checks', () => {
    const report = checkStoryClarity(story);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('passes the setup choice clarity checks', () => {
    const report = checkStoryChoiceClarity(story);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
  });

  it('keeps the premise inside the window, in short paragraphs', () => {
    const count = words(story.premise).length;
    expect(count).toBeGreaterThanOrEqual(120);
    expect(count).toBeLessThanOrEqual(250);
    const paragraphs = story.premise.split('\n\n');
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
  });

  it('does not answer its own mystery on the store card', () => {
    const card = `${story.premise} ${story.hook} ${story.fantasyLabel}`.toLowerCase();
    for (const secret of ['set piece', 'run sheet', 'staged', 'tallyhouse', 'harrow', 'dial', 'counting floor']) {
      expect(card, secret).not.toContain(secret);
    }
  });

  it('has a cover direction: one figure by costume and pose, a clean face, and the title as the only text', () => {
    const cover = story.coverDirection ?? '';
    expect(cover).toMatch(/^SUBJECT: Sloane Lyle,/);
    // People on a cover are described by costume and pose, never by age words
    // (PLAN.md section 7, the lesson of Ace's refused cover).
    expect(cover).not.toMatch(/\b(adult|young|younger|old|older|aged?|years?|girl|boy|teen\w*)\b/i);
    expect(cover).toMatch(/HER FACE STAYS CLEAN/);
    expect(cover).toMatch(/never on her face/);
    // Its own TITLE: line owns the lettering, spelled as the title is.
    expect(cover).toMatch(/TITLE: .*upper third.*spelled exactly RESCUE RATING/);
    expect(story.title.toUpperCase()).toBe('RESCUE RATING');
    expect(cover).toMatch(/No other text anywhere/);
  });

  it('keeps the secrets out of the cast cards and the sample lines', () => {
    const cards = story.characters.map((c) => c.cardBlurb).join(' ');
    expect(cards).not.toMatch(/dropped the crane|on purpose|set piece|Harrow/i);
    const samples = story.characters.flatMap((c) => c.voiceSamples).join(' ');
    expect(samples).not.toMatch(/Harrow|counting down/i);
  });

  it('has the promises, cast and suggestions the director needs', () => {
    expect(story.promises.length).toBeGreaterThanOrEqual(3);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    expect(story.openingSuggestions).toHaveLength(3);
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
  });

  it('tells the player their power is fixed before they choose it', () => {
    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/);
  });

  it('describes every ability in one short line that says whether it can fail and what it costs', () => {
    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect.length, `${ability.id}: ${effect}`).toBeLessThan(120);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      if (ability.costs.length > 0) expect(effect, ability.id).toMatch(/costs /);
    }
  });

  it('tells the narrator what each power can do', () => {
    for (const archetype of story.archetypes) {
      const brief = worldBrief(story, archetype.id);
      expect(brief, archetype.id).toContain(archetype.name);
      const power = story.abilities.find((a) => a.id === archetype.startingAbilities[0])!;
      expect(brief, archetype.id).toContain(power.name);
    }
    // Sloane's rule is in the canon the narrator reads every turn.
    expect(worldBrief(story, 'arch_quick')).toMatch(/Cameras cannot see her unless somebody is touching her/);
  });
});

describe('three invisible numbers', () => {
  it('keeps three invisible banded variables', () => {
    expect(story.resources).toHaveLength(3);
    for (const r of story.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(r.bands[r.bands.length - 1]!.upTo, r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase(), `${r.id}@${band.upTo}`).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    const high = story.resources.filter((r) => r.polarity === 'GOOD_HIGH');
    expect(high.map((r) => r.id)).toEqual(['stamina']);
  });

  it('has something the player can do that moves each descending one, and lets each one cool', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisedBy = story.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(raisedBy.length, `${r.id} cannot be moved`).toBeGreaterThan(0);
      expect(r.regenPerHour, `${r.id} never cools`).toBeLessThan(0);
    }
  });

  it('sends a public fight to the law first', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW and docks the first faction.
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('heat');
    expect(story.factions[0]!.id).toBe('faction_bureau');
  });

  it('makes switching the camera off a real choice with a real price', () => {
    const dark = story.abilities.find((a) => a.id === 'go_dark')!;
    expect(dark.unlockedByDefault).toBe(true);
    expect(dark.costs.map((c) => c.resourceId).sort()).toEqual(['backlash', 'heat']);
    expect(dark.affordances).toContain('turn the camera off');
  });
});

describe('factions', () => {
  it('never gates on standing nothing can earn', () => {
    const earned = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    const archetypeBest = new Map<string, number>();
    for (const archetype of story.archetypes) {
      for (const entry of archetype.startingReputation) {
        archetypeBest.set(entry.factionId, Math.max(archetypeBest.get(entry.factionId) ?? 0, entry.amount));
      }
    }
    for (const [id, amount] of archetypeBest) earned.set(id, earned.get(id)! + amount);
    for (const quest of story.quests) {
      for (const step of quest.steps) {
        for (const entry of step.rewards.reputation) {
          earned.set(entry.factionId, (earned.get(entry.factionId) ?? 0) + entry.amount);
        }
      }
    }
    const gates = [
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation))),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) {
      expect(earned.get(gate.factionId) ?? -100, `${gate.factionId} needs ${gate.value}`).toBeGreaterThanOrEqual(gate.value);
    }
  });

  it('gives every ladder a rung above where it starts', () => {
    for (const faction of story.factions) {
      expect(faction.ranks.length, faction.id).toBeGreaterThanOrEqual(3);
      const top = Math.max(...faction.ranks.map((r) => r.atReputation));
      expect(top, faction.id).toBeGreaterThan(faction.startingReputation);
    }
  });
});

describe('Friday is not owed to anybody', () => {
  it('lets the set piece be stopped more than one way', () => {
    const cable = story.worldEvents.find((e) => e.id === 'we_the_cable')!;
    expect(cable.requiresFlags).toEqual([]);
    expect(cable.cancelledByFlags).toEqual(
      expect.arrayContaining(['bridge_stopped', 'told_the_city', 'bureau_is_moving']),
    );
    const flags = settable();
    for (const flag of cable.cancelledByFlags) expect(flags, flag).toContain(flag);
  });

  it('gives every scheduled threat to the player a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_grey_jackets', 'we_the_warrant', 'we_licence_pulled', 'we_licence_review']) {
      const event = story.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) expect(flags, `${id}: ${flag}`).toContain(flag);
    }
  });

  it('still tells a player who handed the case back what Friday is', () => {
    const page = story.worldEvents.find((e) => e.id === 'we_sloane_sends_a_page')!;
    expect(page.requiresFlags).toEqual(['case_handed_back']);
    expect(page.setsFlags).toContain('knows:the_bridge');
  });

  it('only opens the Run Sheet once the case is open', () => {
    const read = story.abilities.find((a) => a.id === 'read_the_run_sheet')!;
    expect(read.unlockedByDefault).toBe(false);
    expect(read.requires?.flagsSet).toEqual(['case_open']);
    const opened = story.quests
      .flatMap((q) => q.steps)
      .flatMap((s) => s.succeedWhenAny)
      .filter((r) => r.setsFlags.includes('case_open'));
    expect(opened.length).toBeGreaterThanOrEqual(3);
  });
});

describe('endings', () => {
  it('names only flags something in this world sets', () => {
    const flags = settable();
    for (const ending of story.endings) {
      for (const flag of [...ending.requires.flagsSet, ...ending.requires.flagsUnset]) {
        if (engineSets(flag)) continue;
        expect(flags, `${ending.name} needs "${flag}"`).toContain(flag);
      }
    }
  });

  it('offers a loss reachable by doing nothing', () => {
    const ending = story.endings.find((e) => e.id === 'end_top_ten_night')!;
    expect(ending.requires.flagsSet).toEqual(['the_cable_went']);
    expect(ending.requires.minRelationship).toEqual([]);
    expect(ending.requires.hasItems).toEqual([]);
    expect(ending.requires.minFactionReputation).toEqual([]);
  });

  it('lets somebody simply leave, and early', () => {
    const walk = story.endings.find((e) => e.id === 'end_logged_off')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range and never ends before it has been a story', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
    for (const ending of story.endings) {
      expect(ending.minTurn, ending.id).toBeGreaterThan(0);
      expect(ending.condition.length, ending.id).toBeGreaterThan(80);
      expect(ending.epilogue.length, ending.id).toBeGreaterThan(60);
    }
  });

  it('keeps the twelve the narrator reads', () => {
    // `worldBrief` passes the first twelve endings to the narrator.
    expect(story.endings.length).toBeLessThanOrEqual(12);
  });
});

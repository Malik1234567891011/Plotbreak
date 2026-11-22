import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { withDerivedAssetKeys } from './derive-assets.js';
import { NOVA_HOUSE } from './nova-house.js';

/**
 * Nova House, held to the three things its bible cannot survive getting wrong.
 *
 * The opening is the hook: somebody at dinner thinks about killing the player,
 * and the woman who served the soup asks what is wrong with it. That only works
 * if all three suspects are actually at the table on turn one and nobody else
 * wanders in.
 *
 * The mystery has to be solvable more than one way, and getting it wrong has to
 * be a real route with a real ending rather than a dead end.
 *
 * And the murder has to happen if the player does nothing. A whodunit where the
 * world waits politely for the detective is not a whodunit.
 *
 * The story is not in LAUNCH_CATALOG yet, so the catalog-wide checks are
 * repeated here against this world alone.
 */

const story = NOVA_HOUSE;

const start = (archetypeId = 'arch_words') =>
  createInitialState({
    sessionId: 'sess_nova',
    story,
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

const words = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

function settable(): Set<string> {
  const flags = new Set<string>();
  for (const { step } of steps) {
    for (const flag of step.rewards.flags) flags.add(flag);
    for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
  }
  for (const event of story.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

describe('the opener', () => {
  it('starts at the dinner table at ten past seven', () => {
    expect(story.rules.startingLocationId).toBe('the_dining_room');
    expect(story.rules.startWorldMinute).toBe(19 * 60 + 10);
  });

  it('has a named character speak to the player inside the first 60 words', () => {
    const head = words(story.opening).slice(0, 60).join(' ');
    expect(head).toContain('Lena');
    expect(head).toMatch(/["“]/);
    // She names herself inside her own line, so the player is never asked to
    // know who she is already.
    expect(story.opening).toMatch(/["“]I’m Lena\./);
  });

  it('ends on a direct question', () => {
    expect(story.opening.trim()).toMatch(/\?["”]$/);
  });

  it('runs to 120 words at most', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('asks the player to know no proper noun they have not been told', () => {
    const ALLOWED = new Set(['I', 'I’m', 'I’ll', 'Lena']);
    const tokens = story.opening.replace(/\n+/g, ' ').split(/\s+/).filter(Boolean);
    const named: string[] = [];
    tokens.forEach((token, i) => {
      const previous = tokens[i - 1];
      const initial = i === 0 || /^["“]/.test(token) || (previous !== undefined && /[.?!:]["”’]?$/.test(previous));
      if (initial) return;
      const bare = token.replace(/^["“‘]+|[.,;:?!"”]+$/g, '');
      if (/^[A-Z]/.test(bare) && !ALLOWED.has(bare)) named.push(bare);
    });
    expect(named, `mid-sentence proper nouns: ${named.join(', ')}`).toEqual([]);
  });

  it('does not name the planner in the opening scene', () => {
    expect(story.opening).not.toContain('Sable');
    expect(story.opening).not.toContain('Haru');
  });

  it('has all three suspects at the table and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(expect.arrayContaining(['haru', 'lena', 'sable']));
    for (const absent of ['ruth', 'sorrell', 'corin']) expect(present, absent).not.toContain(absent);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minuteOfDay = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = story.characters.filter(
      (c) =>
        !c.schedule.some((b) => minuteOfDay >= b.startMinute && minuteOfDay < b.endMinute) &&
        c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('offers three cards that are three different moves: one said, one done, one risky', () => {
    expect(story.openingSuggestions.length).toBe(3);
    const [said, done, risky] = story.openingSuggestions as [string, string, string];
    for (const s of story.openingSuggestions) {
      expect(s, s).toMatch(/\bI\b/);
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
    // Said: spoken aloud, and a lie the straight-face ability recognises.
    expect(said).toMatch(/^["“]/);
    const straightFace = story.abilities.find((a) => a.id === 'keep_a_straight_face')!;
    expect(straightFace.affordances.some((a) => said.toLowerCase().includes(a))).toBe(true);
    // Done: an action with no line of dialogue, breaking the house rule.
    expect(done).not.toMatch(/["“]/);
    const listen = story.abilities.find((a) => a.id === 'listen_in')!;
    expect(listen.affordances.some((a) => done.toLowerCase().includes(a))).toBe(true);
    // Risky: calling out the threat in front of everybody.
    const callOut = story.abilities.find((a) => a.id === 'call_it_out')!;
    expect(callOut.affordances.some((a) => risky.toLowerCase().includes(a))).toBe(true);
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card.slice(0, 70));
    }
    expect(violent, `these cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
  });

  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', story.premise],
      ['opening', story.opening],
      ['hook', story.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const s of story.openingSuggestions) expect(s).not.toContain('\\n');
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere every player can reach', () => {
    const granted = new Set(steps.flatMap(({ step }) => step.rewards.abilities));
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || (a.requires?.flagsSet.length ?? 0) > 0);
    expect(gated.length, 'nothing is gated, so the check proves nothing').toBeGreaterThan(0);
    for (const ability of gated) {
      expect(granted, `${ability.id} is never granted by a quest step`).toContain(ability.id);
    }
    const flags = settable();
    for (const ability of story.abilities) {
      for (const flag of ability.requires?.flagsSet ?? []) {
        expect(flags, `${ability.id} needs ${flag}, which nothing sets`).toContain(flag);
      }
      if (ability.requires) expect(ability.requires.lockedCopy).not.toMatch(/flag|predicate|locked|requirement/i);
    }
  });

  it('writes every cardBlurb to the player', () => {
    for (const c of story.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb, c.id).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge, and reaches all of them from the start', () => {
    for (const l of story.locations) {
      const inbound = story.locations.some((other) => other.id !== l.id && other.connections.some((c) => c.to === l.id));
      expect(inbound, `${l.id} has no way in`).toBe(true);
    }
    const seen = new Set([story.rules.startingLocationId]);
    const queue = [story.rules.startingLocationId];
    while (queue.length > 0) {
      const id = queue.shift();
      const here = story.locations.find((l) => l.id === id)!;
      for (const c of here.connections) {
        if (seen.has(c.to)) continue;
        seen.add(c.to);
        queue.push(c.to);
      }
    }
    expect([...seen].sort()).toEqual(story.locations.map((l) => l.id).sort());
  });
});

describe('catalog-style wiring', () => {
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
        if (t.ownerId && !charIds.has(t.ownerId)) broken.push(`${l.id} item owned by ${t.ownerId}`);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} scheduled at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) if (!itemIds.has(i.itemId)) broken.push(`${a.id} starts ${i.itemId}`);
      for (const ab of a.startingAbilities) if (!abIds.has(ab)) broken.push(`${a.id} starts ${ab}`);
      for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
    }
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push('startingLocationId');
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
      }
    }
    for (const e of story.endings) {
      for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
      for (const r of e.requires.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${e.id} on ${r.factionId}`);
    }
    for (const q of story.quests) {
      for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
      for (const st of q.steps) {
        for (const ab of st.rewards.abilities) if (!abIds.has(ab)) broken.push(`${st.id} grants ${ab}`);
        for (const r of st.rewards.reputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} rep ${r.factionId}`);
        const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
        for (const pred of preds) {
          if (!pred) continue;
          for (const i of pred.hasItems) if (!itemIds.has(i)) broken.push(`${st.id} wants item ${i}`);
          if (pred.atLocation && !locIds.has(pred.atLocation)) broken.push(`${st.id} at ${pred.atLocation}`);
          for (const r of pred.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
          for (const r of pred.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
          for (const f of pred.flagsSet) {
            if (f.startsWith('used:') && !abIds.has(f.slice(5))) broken.push(`${st.id} uses ${f}`);
            if (f.startsWith('spoke:') && !charIds.has(f.slice(6))) broken.push(`${st.id} speaks ${f}`);
          }
        }
      }
    }
    expect(broken, `dangling references: ${broken.join('; ')}`).toEqual([]);
  });

  it('never offers a route nobody could take', () => {
    const grantable = new Set([
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap(({ step }) => step.rewards.abilities),
    ]);
    const obtainable = new Set([
      ...story.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...story.rules.startingItems.map((i) => i.itemId),
      ...steps.flatMap(({ step }) => step.rewards.items.map((i) => i.itemId)),
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

  it('reads no flag that nothing sets', () => {
    const flags = settable();
    const dead: string[] = [];
    const check = (where: string, list: readonly string[]) => {
      for (const f of list) if (!flags.has(f) && !engineSets(f)) dead.push(`${where}: ${f}`);
    };
    for (const q of story.quests) {
      if (q.discoverWhen) check(`${q.id} discover`, q.discoverWhen.flagsSet);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) check(st.id, [...p.flagsSet, ...p.flagsUnset]);
        for (const r of st.succeedWhenAny) {
          check(r.routeId, [...r.predicate.flagsSet, ...r.predicate.flagsUnset]);
          check(`${r.routeId} closes`, r.closesFlags);
        }
      }
    }
    for (const c of story.characters) for (const g of c.gates) check(`${c.id}/${g.id}`, g.requires.flagsSet);
    for (const e of story.worldEvents) check(e.id, [...e.requiresFlags, ...e.cancelledByFlags]);
    for (const e of story.endings) check(e.id, [...e.requires.flagsSet, ...e.requires.flagsUnset]);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag) check(`${l.id}->${c.to}`, [c.lockedByFlag]);
    }
    expect(dead, `unreachable content: ${dead.join('; ')}`).toEqual([]);
  });

  it('never demands the item a step is about to hand out', () => {
    for (const { quest, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const r of step.succeedWhenAny) {
        for (const itemId of r.predicate.hasItems) expect(granted.has(itemId), `${quest}/${step.id}`).toBe(false);
      }
    }
  });

  it('closes something when a route is taken, somewhere', () => {
    expect(routes.length).toBeGreaterThanOrEqual(3);
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
    expect(calledName(story.characters.find((c) => c.id === 'sorrell')!)).toBe('Sorrell');
  });

  it('never lets two items answer to the same words', () => {
    const owners = new Map<string, Set<string>>();
    for (const l of story.locations) {
      for (const item of l.takeableItems) {
        for (const alias of item.aka) {
          const key = alias.trim().toLowerCase();
          owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
        }
      }
    }
    const collisions = [...owners].filter(([, ids]) => ids.size > 1).map(([alias]) => alias);
    expect(collisions).toEqual([]);
  });

  it('describes every ability in a short line that says whether it can fail and what it costs', () => {
    for (const a of story.abilities) {
      const effect = abilityEffect(story, a);
      expect(effect.length, `${a.id}: ${effect}`).toBeLessThan(120);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
    }
  });

  it('passes the premise and choice clarity checks with no errors', async () => {
    const { checkStoryClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const narrative = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(narrative.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const choice = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(choice.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
  });

  it('tells the player the archetype is permanent and does not decide the story', () => {
    const field = story.setupFields.find((f) => f.id === 'archetype')!;
    expect(field.helpText).toMatch(/fixed for the whole story/);
    for (const a of story.archetypes) {
      expect(a.name.length, a.id).toBeLessThanOrEqual(28);
      expect(a.playstyle.length, a.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('mirrors the GMH ids and asset keys', () => {
    expect(story.id).toBe('sv_nova_house_1');
    expect(story.storyId).toBe('story_nova_house');
    expect(story.coverImage).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_nova_house/opening');
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage ?? '').toMatch(/^story_nova_house/);
  });
});

describe('adults only', () => {
  const bible = readFileSync(new URL('../../../docs/story-bibles/new50/03_NOVA_HOUSE.md', import.meta.url), 'utf8');
  const ages = new Map([...bible.matchAll(/^### (.+?) \((\d+)\)/gm)].map((m) => [m[1]!, Number(m[2])]));

  it('states every character’s age in the bible, and every one is 18 or over', () => {
    for (const c of story.characters) {
      const age = ages.get(c.name);
      expect(age, `${c.name} has no stated age in the bible`).toBeDefined();
      expect(age!, c.name).toBeGreaterThanOrEqual(18);
    }
  });

  it('says so in hard canon', () => {
    expect(story.rules.hardCanon.join(' ')).toMatch(/Everyone in this story is an adult/);
  });

  it('uses no word that reads as a minor', () => {
    const MINOR = /\b(child|children|kid|kids|teen|teens|teenage|teenager|boy|boys|girl|girls|schoolgirl|schoolboy|minor|minors|underage|high school|middle school|loli|little sister|little brother)\b/i;
    const texts: Array<[string, string]> = [
      ['premise', story.premise],
      ['hook', story.hook],
      ['opening', story.opening],
      ['openingPanel', story.openingPanel?.alt ?? ''],
      ...story.openingSuggestions.map((s, i) => [`card${i}`, s] as [string, string]),
      ...story.characters.flatMap((c) =>
        [c.role, c.cardBlurb, c.appearance, c.visualHook, c.silhouette, ...c.voiceSamples].map(
          (t) => [c.id, t] as [string, string],
        ),
      ),
      ...story.archetypes.flatMap((a) => [a.summary, a.blurb].map((t) => [a.id, t] as [string, string])),
    ];
    for (const [where, text] of texts) expect(text, where).not.toMatch(MINOR);
  });
});

describe('the mystery', () => {
  it('can be solved at least three different kinds of way', () => {
    const naming = routes.filter(({ route }) => route.setsFlags.includes('knows_it_is_sable'));
    expect(naming.length).toBeGreaterThanOrEqual(3);
    const kinds = new Set(
      naming.map(({ route }) =>
        route.predicate.hasItems.length > 0
          ? 'evidence'
          : route.predicate.flagsSet.some((f) => f.startsWith('used:'))
            ? 'ability'
            : 'conversation',
      ),
    );
    expect(kinds.size).toBe(3);
  });

  it('lets the player accuse the wrong housemate, and that has an ending', () => {
    const wrong = routes.filter(({ route }) => route.setsFlags.includes('accused_the_wrong_one'));
    expect(wrong.map(({ route }) => route.routeId).sort()).toEqual(['blamed_haru', 'blamed_lena']);
    expect(story.endings.some((e) => e.requires.flagsSet.includes('accused_the_wrong_one'))).toBe(true);
  });

  it('hides the vial in the dome, owned by the planner', () => {
    const dome = story.locations.find((l) => l.id === 'the_dome')!;
    const vial = dome.takeableItems.find((t) => t.itemId === 'stillwater_vial');
    expect(vial?.ownerId).toBe('sable');
  });

  it('keeps the planner unreadable, and says why she will not hurt the house', () => {
    const sable = story.characters.find((c) => c.id === 'sable')!;
    expect(sable.boundaries.join(' ')).toMatch(/Will not hurt anybody in this house/);
    expect(sable.secrets.some((s) => s.visibility === 'NPC_PRIVATE' && s.fact.includes('Stillwater'))).toBe(true);
  });
});

describe('the murder happens unless somebody stops it', () => {
  it('holds Founders’ Night on Saturday at nine, in the parlour', () => {
    const night = story.worldEvents.find((e) => e.id === 'we_founders_night')!;
    expect(night.atWorldMinute).toBe(9900);
    expect(night.locationId).toBe('the_parlour');
    expect(night.requiresFlags).toEqual([]);
  });

  it('lets the poison go round with no relationship and no item', () => {
    const poison = routes.find(({ route }) => route.routeId === 'the_glass_went_round')!.route;
    expect(poison.predicate.minRelationship).toEqual([]);
    expect(poison.predicate.hasItems).toEqual([]);
    expect(poison.setsFlags).toContain('sorrell_poisoned');
  });

  it('offers at least three ways to stop it', () => {
    const stops = routes.filter(({ route }) => route.setsFlags.includes('no_poison'));
    expect(stops.length).toBeGreaterThanOrEqual(3);
  });

  it('ends on The Toast with nothing but the poison', () => {
    const toast = story.endings.find((e) => e.id === 'end_the_toast')!;
    expect(toast.requires.flagsSet).toEqual(['sorrell_poisoned']);
    expect(toast.requires.minRelationship).toEqual([]);
    expect(toast.requires.hasItems).toEqual([]);
  });

  it('lets the player walk away early', () => {
    const walk = story.endings.find((e) => e.id === 'end_the_new_one_left')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(20);
  });

  it('uses the whole rarity range, with long enough condition and epilogue copy', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    for (const e of story.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.minTurn, e.id).toBeGreaterThan(0);
    }
  });

  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_the_third_fire', 'we_the_order', 'we_report_due', 'we_lena_draws_your_hands', 'we_founders_night', 'we_the_last_bus']) {
      const event = story.worldEvents.find((e) => e.id === id)!;
      expect(event, id).toBeDefined();
      expect(event.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const flag of event.cancelledByFlags) expect(flags, `${id}: ${flag}`).toContain(flag);
    }
  });
});

describe('the people', () => {
  it('casts the three suspects first', () => {
    expect(story.characters.map((c) => c.id)).toEqual(['haru', 'lena', 'sable', 'ruth', 'sorrell', 'corin']);
  });

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
      expect(c.secrets.length, c.id).toBeGreaterThan(0);
      for (const s of c.secrets) expect(s.revealHint.length, `${c.id}/${s.id}`).toBeGreaterThan(10);
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
    const vocab = new Map(story.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of story.characters) {
      for (const b of story.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id}`).toBeLessThan(0.3);
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

  it('demonstrates each declared differentiator in the samples', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples.join(' | ');
    // Haru talks in kitchen slang.
    expect(sample('haru')).toMatch(/\bbehind\b|\bservice\b/);
    // Lena slips tense and calls her visions frames.
    expect(sample('lena')).toMatch(/Sorry\. You’re about to\./);
    expect(sample('lena')).toMatch(/\bframe\b/);
    // Sable measures in arm's lengths.
    expect(sample('sable')).toMatch(/Arm’s length/);
    // Ruth numbers her rules.
    expect(sample('ruth')).toMatch(/House rule five/);
    // Sorrell ends on soft questions and speaks of his sister.
    expect(sample('sorrell')).toMatch(/\?/);
    expect(sample('sorrell')).toMatch(/sister/);
    // Corin says "I think" about things he should know.
    expect(sample('corin')).toMatch(/I think/);
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
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('gives resting exactly one honest thing to restore', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['focus']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of story.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('makes reading people cost the house’s trust', () => {
    for (const id of ['listen_in', 'go_under']) {
      const ability = story.abilities.find((a) => a.id === id)!;
      expect(ability.costs.map((c) => c.resourceId), id).toContain('distrust');
    }
  });

  it('sends a public scene to the college and the scrutiny meter', () => {
    expect(story.factions[0]?.id).toBe('faction_college');
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('scrutiny');
  });

  it('never gates on standing nothing can earn, and every ladder can be climbed', () => {
    const earned = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    for (const a of story.archetypes) {
      for (const entry of a.startingReputation) {
        const base = story.factions.find((f) => f.id === entry.factionId)!.startingReputation;
        earned.set(entry.factionId, Math.max(earned.get(entry.factionId)!, base + entry.amount));
      }
    }
    for (const { step } of steps) {
      for (const entry of step.rewards.reputation) {
        earned.set(entry.factionId, (earned.get(entry.factionId) ?? 0) + entry.amount);
      }
    }
    const gates = [
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const gate of gates) expect(earned.get(gate.factionId)!, gate.factionId).toBeGreaterThanOrEqual(gate.value);
    for (const f of story.factions) {
      const top = Math.max(...f.ranks.map((r) => r.atReputation));
      expect(top, f.id).toBeGreaterThan(f.startingReputation);
      expect(earned.get(f.id)!, `${f.id} top rung`).toBeGreaterThanOrEqual(top);
    }
  });

  it('schedules everybody somewhere that exists, all day', () => {
    const locations = new Set(story.locations.map((l) => l.id));
    for (const c of story.characters) {
      let cursor = 0;
      for (const block of c.schedule) {
        expect(locations, `${c.id} -> ${block.locationId}`).toContain(block.locationId);
        expect(block.startMinute, `${c.id} has a gap at ${cursor}`).toBe(cursor);
        cursor = block.endMinute;
      }
      expect(cursor, `${c.id} day ends early`).toBe(1440);
    }
  });
});

describe('the copy', () => {
  it('keeps the premise inside the window', () => {
    const count = words(story.premise).length;
    expect(count).toBeGreaterThanOrEqual(120);
    expect(count).toBeLessThanOrEqual(250);
  });

  it('keeps the fantasy label short enough for the card', () => {
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
  });

  it('does not answer its own mystery on the store card', () => {
    for (const text of [story.premise, story.hook, story.fantasyLabel]) {
      expect(text).not.toContain('Sable');
      expect(text.toLowerCase()).not.toContain('stillwater');
    }
  });
});

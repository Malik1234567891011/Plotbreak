import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { withDerivedAssetKeys } from './derive-assets.js';
import { THIN_WALLS } from './thin-walls.js';

/**
 * Thin Walls, held to the things its bible cannot survive getting wrong.
 *
 * The opening is the hook: at seven minutes past two the rival knocks on the
 * player's bedroom wall and offers a truce. That only works if she is actually
 * present on turn one, and nobody else is.
 *
 * The wall has to cut both ways. Listening to her, and using what you heard,
 * are real abilities that work and that cost her guard, and the endings know
 * the difference between winning clean and winning with her argument.
 *
 * The conferral rule has to have teeth: talking about the case with her is a
 * route that disqualifies both of them unless somebody tells Lund first.
 *
 * And losing to her has to be a full ending rather than a fail state, as does
 * saying nothing for nine days.
 *
 * The story is not in LAUNCH_CATALOG yet, so the catalog-wide checks are
 * repeated here against this world alone.
 */

const story = THIN_WALLS;

const start = (archetypeId = 'arch_all_nighter') =>
  createInitialState({
    sessionId: 'sess_thin_walls',
    story,
    identity: {
      displayName: 'Alex Moreau',
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
const route = (id: string) => routes.find(({ route: r }) => r.routeId === id)!.route;
const ending = (id: string) => story.endings.find((e) => e.id === id)!;
const ability = (id: string) => story.abilities.find((a) => a.id === id)!;
const character = (id: string) => story.characters.find((c) => c.id === id)!;
const event = (id: string) => story.worldEvents.find((e) => e.id === id)!;

function settable(): Set<string> {
  const flags = new Set<string>();
  for (const { step } of steps) {
    for (const flag of step.rewards.flags) flags.add(flag);
    for (const r of step.succeedWhenAny) for (const flag of r.setsFlags) flags.add(flag);
  }
  for (const e of story.worldEvents) for (const flag of e.setsFlags) flags.add(flag);
  return flags;
}

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = ['left_the_map'];
const engineSets = (flag: string): boolean =>
  ENGINE_FLAGS.includes(flag) || ENGINE_PREFIXES.some((p) => flag.startsWith(p));

describe('the opener', () => {
  it('starts at the wall at seven minutes past two', () => {
    expect(story.rules.startingLocationId).toBe('the_wall');
    expect(story.rules.startWorldMinute).toBe(2 * 60 + 7);
  });

  it('has a named character speak to the player inside the first 60 words', () => {
    const head = words(story.opening).slice(0, 60).join(' ');
    expect(head).toContain('Nadia');
    expect(head).toMatch(/["“]/);
    // She names herself inside her own line, so the player is never asked to
    // know who she is already.
    expect(story.opening).toMatch(/["“]Hi\. It’s Nadia\./);
  });

  it('ends on a direct question', () => {
    expect(story.opening.trim()).toMatch(/\?["”]$/);
  });

  it('runs to 120 words at most', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('asks the player to know no proper noun they have not been told', () => {
    const ALLOWED = new Set(['I', 'I’m', 'I’ve', 'I’ll', 'Nadia']);
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

  it('keeps the rest of the cast out of the opening scene', () => {
    for (const name of ['Sam', 'Theo', 'Lund', 'Elliot', 'Penrose', 'Larkin']) {
      expect(story.opening, name).not.toContain(name);
    }
  });

  it('has Nadia on the other side of the wall and nobody else in the scene', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toEqual(['nadia']);
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
    // Said: spoken aloud, and a deal the terms ability recognises.
    expect(said).toMatch(/^["“]/);
    expect(ability('make_terms').affordances.some((a) => said.toLowerCase().includes(a))).toBe(true);
    // Done: an action with no line of dialogue, going round to her actual door.
    expect(done).not.toMatch(/["“]/);
    expect(done).toMatch(/landing/);
    expect(done).toMatch(/door/);
    // Risky: refusing, and pointing out that the wall has only worked one way.
    expect(risky).toMatch(/^["“]/);
    expect(ability('needle').affordances.some((a) => risky.toLowerCase().includes(a))).toBe(true);
    expect(risky).toMatch(/heard/);
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
      ['creatorNote', story.creatorNote],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const s of story.openingSuggestions) expect(s).not.toContain('\\n');
    for (const s of story.rules.styleExamples) expect(s).not.toContain('\\n');
  });

  it('has no prologue', () => {
    expect(story.prologue ?? []).toEqual([]);
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere every player can reach', () => {
    const granted = new Set(steps.flatMap(({ step }) => step.rewards.abilities));
    const gated = story.abilities.filter((a) => !a.unlockedByDefault || (a.requires?.flagsSet.length ?? 0) > 0);
    expect(gated.map((a) => a.id).sort()).toEqual(['reopen_it', 'turn_her_argument', 'withdraw']);
    for (const a of gated) {
      expect(granted, `${a.id} is never granted by a quest step`).toContain(a.id);
    }
    const flags = settable();
    for (const a of story.abilities) {
      for (const flag of a.requires?.flagsSet ?? []) {
        expect(flags, `${a.id} needs ${flag}, which nothing sets`).toContain(flag);
      }
      if (a.requires && (a.requires.flagsSet.length > 0 || !a.unlockedByDefault)) {
        expect(a.requires.lockedCopy.length, a.id).toBeGreaterThan(30);
        expect(a.requires.lockedCopy, a.id).not.toMatch(/flag|predicate|locked|requirement/i);
      }
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
    for (const i of story.items) {
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
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
            if (f.startsWith('visited:') && !locIds.has(f.slice(8))) broken.push(`${st.id} visits ${f}`);
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
    expect(routes.some(({ route: r }) => r.closesFlags.length > 0)).toBe(true);
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
    expect(calledName(character('lund'))).toBe('Lund');
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
    expect(field.helpText).not.toContain('Nadia');
    for (const a of story.archetypes) {
      expect(a.name.length, a.id).toBeLessThanOrEqual(28);
      expect(a.playstyle.length, a.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('mirrors the GMH ids and asset keys', () => {
    expect(story.id).toBe('sv_thin_walls_1');
    expect(story.storyId).toBe('story_thin_walls');
    expect(story.coverImage).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_thin_walls/opening');
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage ?? '').toMatch(/^story_thin_walls/);
  });
});

describe('adults only', () => {
  const bible = readFileSync(new URL('../../../docs/story-bibles/new50/21_THIN_WALLS.md', import.meta.url), 'utf8');
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

describe('the wall cuts both ways', () => {
  it('makes listening, needling and using what you heard put her guard back up', () => {
    for (const id of ['listen_in', 'needle', 'keep_a_straight_face', 'turn_her_argument']) {
      expect(ability(id).costs.map((c) => c.resourceId), id).toContain('guard');
    }
  });

  it('locks her argument behind actually hearing it, and hearing it has three different prices', () => {
    expect(ability('turn_her_argument').requires?.flagsSet).toEqual(['heard_her_argument']);
    expect(route('listened').predicate.flagsSet).toEqual(['used:listen_in']);
    expect(route('she_told_you').predicate.minRelationship).toEqual([
      { characterId: 'nadia', dimension: 'trust', value: 60 },
    ]);
    expect(route('kept_your_ears_shut').closesFlags).toContain('heard_her_argument');
  });

  it('lets the endings tell winning clean from winning with her argument', () => {
    expect(ending('end_first_place').requires.flagsUnset).toContain('used_her_argument');
    expect(ending('end_her_argument').requires.flagsSet).toEqual(['you_won_the_moot', 'used_her_argument']);
    const eleven = ending('end_eleven_centimetres');
    expect(eleven.requires.flagsSet).toEqual(expect.arrayContaining(['together', 'clean_hands']));
    expect(eleven.requires.flagsUnset).toEqual(expect.arrayContaining(['used_her_argument', 'conferred']));
  });

  it('keeps what the wall carries out of anything intimate', () => {
    expect(story.rules.toneGuide).toMatch(/never carries anything intimate/);
    expect(story.rules.toneGuide).toMatch(/no further than a kiss/);
    expect(story.contentDescriptors).toContain('ROMANCE');
    const prose = [
      ...story.endings.flatMap((e) => [e.condition, e.epilogue]),
      ...story.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
      ...story.rules.styleExamples,
    ].join(' ');
    expect(prose).not.toMatch(/\b(bed|beds|bedsheets|naked|undress\w*|sex|sexual|kissing her neck)\b/i);
  });
});

describe('the conferral rule has teeth', () => {
  it('states the rule and who it hands the place to', () => {
    expect(story.rules.hardCanon.join(' ')).toMatch(/disqualifies both of them, and the place goes to the third-ranked student, Elliot Ashby/);
  });

  it('turns arguing the case with her into a conferral', () => {
    const sparred = route('sparred_with_her');
    expect(sparred.setsFlags).toContain('conferred');
    expect(sparred.closesFlags).toContain('clean_hands');
  });

  it('files the complaint unless somebody gets there first', () => {
    const complaint = event('we_the_complaint');
    expect(complaint.setsFlags).toEqual(['breach_reported']);
    expect(complaint.requiresFlags).toEqual(['elliot_has_proof']);
    expect(complaint.cancelledByFlags).toEqual(expect.arrayContaining(['told_lund_first', 'elliot_stood_down']));
  });

  it('gives every scheduled pressure a way to be switched off', () => {
    const flags = settable();
    for (const id of ['we_coffee_at_seven', 'we_elliot_notices', 'we_side_b', 'we_the_complaint', 'we_the_board']) {
      const e = event(id);
      expect(e.cancelledByFlags.length, id).toBeGreaterThan(0);
      for (const flag of e.cancelledByFlags) expect(flags, `${id}: ${flag}`).toContain(flag);
    }
  });

  it('checks for a proven breach before anything else on moot day', () => {
    const moot = story.quests.find((q) => q.id === 'q_the_final_moot')!.steps.find((s) => s.id === 'the_moot')!;
    expect(moot.succeedWhenAny[0]?.routeId).toBe('disqualified');
    expect(moot.succeedWhenAny[0]?.predicate.flagsSet).toEqual(['breach_reported']);
    expect(ending('end_conferral').requires.flagsSet).toEqual(['disqualified']);
  });

  it('makes honesty cost something when there is something to confess', () => {
    expect(route('confessed_it').predicate.flagsSet).toContain('conferred');
    expect(route('confessed_it').setsFlags).toContain('breach_reported');
    expect(route('told_lund_yourself').predicate.flagsUnset).toContain('conferred');
  });

  it('funds the second clerkship only for somebody who told Lund first', () => {
    expect(event('we_the_board').requiresFlags).toEqual(['told_lund_first']);
    expect(route('split_bench').predicate.flagsSet).toContain('second_place_funded');
  });
});

describe('the rivalry can go either way', () => {
  it('lets her win with no relationship and no item', () => {
    const lost = route('she_won');
    expect(lost.predicate.minRelationship).toEqual([]);
    expect(lost.predicate.hasItems).toEqual([]);
    expect(ending('end_second_again').requires.flagsSet).toEqual(['she_won_the_moot']);
  });

  it('has an ending for winning, losing, stepping back and being thrown out', () => {
    for (const flag of ['you_won_the_moot', 'she_won_the_moot', 'you_withdrew', 'disqualified', 'both_clerkships']) {
      expect(story.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });

  it('lets nine polite days end in nothing said, with nothing required', () => {
    const silent = route('said_nothing');
    expect(silent.predicate.minRelationship).toEqual([]);
    expect(silent.predicate.hasItems).toEqual([]);
    expect(ending('end_nothing_said').requires.flagsSet).toEqual(['said_nothing', 'moot_decided']);
  });

  it('lets the player walk away early', () => {
    const walk = ending('end_moved_out');
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('uses the whole rarity range, with long enough condition and epilogue copy', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.length).toBeGreaterThanOrEqual(10);
    for (const e of story.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
  });
});

describe('the old case is optional', () => {
  const OLD_CASE = ['knows:theo_left', 'knows:the_old_case', 'old_case_known', 'case_reopened', 'read_the_file', 'theo_went_back_in', 'old_case_answered'];

  it('stays hidden until Theo lets slip that he left', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_old_case')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).not.toBe(true);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:theo_left']);
    const slip = story.worldEvents.filter((e) => e.setsFlags.includes('knows:theo_left'));
    expect(slip.length).toBeGreaterThan(0);
    for (const e of slip) expect(e.requiresFlags.length, e.id).toBeGreaterThan(0);
  });

  it('describes the locked reopening in the world’s words', () => {
    const reopen = ability('reopen_it');
    expect(reopen.unlockedByDefault).toBe(false);
    expect(reopen.requires?.lockedCopy.length).toBeGreaterThan(30);
  });

  it('leaves most endings reachable by a player who never sits at his counter after closing', () => {
    const without = story.endings.filter((e) => !e.requires.flagsSet.some((f) => OLD_CASE.includes(f)));
    expect(without.length).toBeGreaterThanOrEqual(10);
  });
});

describe('she is a person, not a prize', () => {
  const nadia = character('nadia');

  it('starts her as a rival who respects you', () => {
    expect(nadia.startingRelationship.respect).toBeGreaterThanOrEqual(70);
    expect(nadia.startingRelationship.rivalry).toBeGreaterThanOrEqual(70);
    expect(nadia.startingRelationship.trust).toBeLessThan(40);
  });

  it('gives her more than one of everything', () => {
    expect(nadia.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(nadia.fears.length).toBeGreaterThanOrEqual(2);
    expect(nadia.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(nadia.secrets.length).toBeGreaterThanOrEqual(2);
    expect(nadia.voiceSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('will not be let win', () => {
    expect(nadia.boundaries.join(' ')).toMatch(/Will not be let win/);
    expect(ending('end_conceded').condition).toMatch(/furious/);
  });

  it('puts the romance behind trust and affection, not the moot', () => {
    const romance = nadia.gates.filter((g) => g.kind === 'ROMANCE');
    expect(romance.length).toBe(1);
    expect(romance[0]!.requires.trust).toBeGreaterThan(nadia.startingRelationship.trust);
    expect(romance[0]!.requires.affection).toBeGreaterThan(nadia.startingRelationship.affection);
  });
});

describe('the people', () => {
  it('casts her first and the bench last but one', () => {
    expect(story.characters.map((c) => c.id)).toEqual(['nadia', 'sam', 'theo', 'lund', 'elliot']);
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
    const sample = (id: string) => character(id).voiceSamples.join(' | ');
    // Nadia numbers her points and keeps count of your concessions.
    expect(sample('nadia')).toMatch(/Three terms\. One:/);
    expect(sample('nadia')).toMatch(/Concession number/);
    // Sam narrates in a hushed documentary voice and talks in levels.
    expect(sample('sam')).toMatch(/here we observe/);
    expect(sample('sam')).toMatch(/Levels/);
    // Theo answers with an order.
    expect(sample('theo')).toMatch(/Flat white/);
    // Lund opens with one word and uses one Latin phrase, translated.
    expect(sample('lund')).toMatch(/^Sit\./);
    expect(sample('lund')).toMatch(/Res ipsa loquitur\. The thing speaks for itself/);
    // Elliot asks light questions in a row and remembers small details.
    expect(sample('elliot')).toMatch(/How’s your mum’s knee\?/);
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

  it('lets her guard come down on its own, slowly', () => {
    const guard = story.resources.find((r) => r.id === 'guard')!;
    expect(guard.regenPerHour).toBeLessThan(0);
    expect(guard.start).toBeGreaterThanOrEqual(50);
  });

  it('sends a public scene to the faculty and the exposure meter', () => {
    expect(story.factions[0]?.id).toBe('faction_faculty');
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('exposure');
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
      ...routes.flatMap(({ route: r }) => r.predicate.minFactionReputation),
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

  it('puts the final nine days after the knock, in order', () => {
    const moot = event('we_moot_day');
    expect(moot.atWorldMinute).toBe(9 * 1440 + 10 * 60);
    expect(moot.locationId).toBe('the_old_court');
    for (const e of story.worldEvents) {
      expect(e.atWorldMinute, e.id).toBeGreaterThan(story.rules.startWorldMinute);
      expect(e.atWorldMinute, e.id).toBeLessThanOrEqual(moot.atWorldMinute);
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

  it('keeps the store card free of the brother’s story and the third-placed plot', () => {
    for (const text of [story.premise, story.hook, story.fantasyLabel]) {
      expect(text).not.toContain('Theo');
      expect(text).not.toContain('Elliot');
    }
  });
});

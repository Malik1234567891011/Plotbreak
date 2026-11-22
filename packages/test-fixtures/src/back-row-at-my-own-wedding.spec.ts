import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { withDerivedAssetKeys } from './derive-assets.js';
import { BACK_ROW_AT_MY_OWN_WEDDING } from './back-row-at-my-own-wedding.js';

/**
 * Back Row at My Own Wedding, held to the things its bible cannot survive
 * getting wrong.
 *
 * The opening is the hook: four minutes late to your own wedding, your brother
 * at the altar in your suit, and your bride asking you, in front of two hundred
 * guests, to sit in the back. That only works if she is in the chapel on turn
 * one and says it to you directly.
 *
 * The player is innocent, and that is canon rather than a twist, so the story
 * is about proof and price rather than whether. Proof has to come from more
 * than one place. Doing nothing has to be a full ending rather than a fail
 * state, walking out has to be reachable early, and revenge has to cost
 * somebody who is not the brother.
 *
 * The story is not in LAUNCH_CATALOG yet, so the catalog-wide checks are
 * repeated here against this world alone.
 */

const story = BACK_ROW_AT_MY_OWN_WEDDING;

const start = (archetypeId = 'arch_claims') =>
  createInitialState({
    sessionId: 'sess_back_row',
    story,
    identity: {
      displayName: 'Daniel Hale',
      pronouns: 'he/him',
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
const stepOf = (id: string) => steps.find(({ step }) => step.id === id)!.step;
const quest = (id: string) => story.quests.find((q) => q.id === id)!;
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
  it('starts in the chapel at four minutes past twelve', () => {
    expect(story.rules.startingLocationId).toBe('the_chapel');
    expect(story.rules.startWorldMinute).toBe(12 * 60 + 4);
  });

  it('has a named character speak to the player inside the first 60 words', () => {
    const head = words(story.opening).slice(0, 60).join(' ');
    expect(head).toContain('Elena');
    expect(head).toMatch(/["“]/);
    expect(head).toMatch(/["“]I’m sorry,["”] Elena says/);
  });

  it('ends on a direct question', () => {
    expect(story.opening.trim()).toMatch(/\?["”]$/);
    expect(story.opening).toMatch(/Sit in the back\. Can you do that for me\?["”]$/);
  });

  it('runs to 120 words at most', () => {
    expect(words(story.opening).length).toBeLessThanOrEqual(120);
  });

  it('asks the player to know no proper noun they have not been told', () => {
    const ALLOWED = new Set(['I', 'I’m', 'Elena', 'Marcus', 'ELENA', 'MARCUS']);
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
    // Both names arrive with what they are to you attached.
    expect(story.opening).toContain('your brother Marcus');
    expect(story.opening).toContain('your bride');
  });

  it('keeps the rest of the cast, and the hotel, out of the opening text', () => {
    for (const name of ['June', 'Sami', 'Benny', 'Constance', 'Arthur', 'Hale', 'Desmond']) {
      expect(story.opening, name).not.toContain(name);
    }
  });

  it('shows the crossed-out name on the welcome board', () => {
    expect(story.opening).toMatch(/struck through/);
    expect(story.opening).toMatch(/ring box/);
  });

  it('has the bride, the brother and the grandmother in the chapel on turn one', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    for (const id of ['elena', 'marcus', 'constance']) expect(present, id).toContain(id);
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
    // Said: refusing her, out loud, and demanding the charge.
    expect(said).toMatch(/^["“]/);
    expect(said).toMatch(/tell me what/);
    // Done: doing exactly what she asked, with no line of dialogue.
    expect(done).not.toMatch(/["“]/);
    expect(ability('take_the_back_row').affordances.some((a) => done.toLowerCase().includes(a))).toBe(true);
    // Risky: the aisle, the ring, two hundred witnesses.
    expect(risky).not.toMatch(/["“]/);
    expect(risky).toMatch(/aisle/);
    expect(risky).toMatch(/ring box/);
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
    expect(gated.map((a) => a.id).sort()).toEqual(['ask_about_1966', 'show_the_proof']);
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
    for (const { quest: q, step, route: r } of routes) {
      const where = `${q}/${step}/${r.routeId}`;
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
    for (const { quest: q, step } of steps) {
      const granted = new Set(step.rewards.items.map((i) => i.itemId));
      for (const r of step.succeedWhenAny) {
        for (const itemId of r.predicate.hasItems) expect(granted.has(itemId), `${q}/${step.id}`).toBe(false);
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
    expect(calledName(character('constance'))).toBe('Grandmother Hale');
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
    expect(field.helpText).toMatch(/whether you stop the wedding/);
    expect(field.helpText).not.toContain('Elena');
    for (const a of story.archetypes) {
      expect(a.name.length, a.id).toBeLessThanOrEqual(28);
      expect(a.playstyle.length, a.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps archetype names out of the canon, so the narrator never treats them as people', () => {
    const canon = [story.premise, ...story.rules.hardCanon, ...story.characters.map((c) => c.name)].join(' ');
    for (const a of story.archetypes) expect(canon, a.id).not.toContain(a.name);
  });

  it('mirrors the GMH ids and asset keys', () => {
    expect(story.id).toBe('sv_back_row_at_my_own_wedding_1');
    expect(story.storyId).toBe('story_back_row_at_my_own_wedding');
    expect(story.coverImage).toBeNull();
    expect(story.keyArt).toBeNull();
    for (const c of story.characters) expect(c.portrait, c.id).toBeNull();
    expect(story.openingPanel?.assetKey).toBe('story_back_row_at_my_own_wedding/opening');
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage ?? '').toMatch(/^story_back_row_at_my_own_wedding/);
  });
});

describe('adults only, and 13+', () => {
  const bible = readFileSync(
    new URL('../../../docs/story-bibles/new50/27_BACK_ROW_AT_MY_OWN_WEDDING.md', import.meta.url),
    'utf8',
  );
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

  it('keeps romance to a kiss, and violence to a scuffle', () => {
    expect(story.rules.toneGuide).toMatch(/up to a kiss, and never more/);
    expect(story.rules.hardCanon.join(' ')).toMatch(/Violence here is a scuffle, never a fight scene/);
    expect(story.rules.allowsCombat).toBe(false);
    const prose = [
      ...story.endings.flatMap((e) => [e.condition, e.epilogue]),
      ...story.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
      ...story.rules.styleExamples,
      ...story.characters.flatMap((c) => c.voiceSamples),
    ].join(' ');
    expect(prose).not.toMatch(/\b(bed|beds|bedsheets|naked|undress\w*|sex|sexual|blood|bleeding|gore)\b/i);
  });
});

describe('the player is innocent, and has to prove it', () => {
  it('says so in hard canon, with what actually happened', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/The player did not cheat on Elena/);
    expect(canon).toMatch(/June Arden cried over a ruined flower delivery and the player hugged her/);
  });

  it('offers at least three independent ways to prove the photograph is a cropped hug', () => {
    const prove = stepOf('prove_it').succeedWhenAny;
    expect(prove.length).toBeGreaterThanOrEqual(3);
    const items = prove.flatMap((r) => r.predicate.hasItems);
    expect(new Set(items).size).toBeGreaterThanOrEqual(3);
    expect(items).toEqual(expect.arrayContaining(['rehearsal_card', 'second_phone', 'reprint_order']));
    expect(stepOf('prove_it').rewards.abilities).toEqual(['show_the_proof']);
  });

  it('will not let Elena be talked round, only shown', () => {
    expect(ability('show_the_proof').requires?.flagsSet).toEqual(['proof_in_hand']);
    for (const r of stepOf('show_her').succeedWhenAny) {
      expect(r.predicate.flagsSet, r.routeId).toContain('used:show_the_proof');
    }
    expect(character('elena').boundaries.join(' ')).toMatch(/Will not be told what she saw/);
  });
});

describe('doing nothing, walking out and revenge are all real', () => {
  it('lets the vows happen by default unless somebody stops them', () => {
    const vows = event('we_the_vows');
    expect(vows.atWorldMinute).toBe(12 * 60 + 20);
    expect(vows.requiresFlags).toEqual([]);
    expect(vows.setsFlags).toEqual(['the_vows_were_said']);
    expect(vows.cancelledByFlags).toEqual(expect.arrayContaining(['ceremony_stopped', 'ceremony_paused']));
    const watched = route('watched_it_happen');
    expect(watched.predicate.flagsSet).toEqual(['the_vows_were_said']);
    expect(watched.predicate.minRelationship).toEqual([]);
    expect(route('they_said_them').setsFlags).toContain('elena_married_marcus');
  });

  it('makes the back row a full ending that needs no relationship and no item', () => {
    const back = ending('end_the_back_row');
    expect(back.requires.minRelationship).toEqual([]);
    expect(back.requires.hasItems).toEqual([]);
    expect(back.requires.minFactionReputation).toEqual([]);
    expect(back.condition).toMatch(/not a punishment/);
  });

  it('lets the player walk out early', () => {
    const walk = ending('end_the_coast_road');
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(20);
  });

  it('makes revenge cost somebody who is not the brother', () => {
    const won = ending('end_the_groom_who_won');
    expect(won.requires.flagsSet).toEqual(expect.arrayContaining(['ruined_marcus', 'exposed_in_public']));
    expect(won.requires.flagsUnset).toContain('elena_chose_you');
    expect(won.condition).toMatch(/boatyard/);
    expect(won.condition).toMatch(/Grandmother/);
    expect(ending('end_raise_a_glass').condition).toMatch(/price/);
    expect(ability('take_the_microphone').costs.map((c) => c.resourceId)).toContain('gossip');
  });

  it('has an ending for every answer to midnight', () => {
    for (const flag of ['married_before_midnight', 'let_the_trust_go', 'paper_marriage', 'no_wedding_yet']) {
      expect(story.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });

  it('uses the whole rarity range, with long enough condition and epilogue copy', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.length).toBeGreaterThanOrEqual(10);
    expect(story.endings.length).toBeLessThanOrEqual(12);
    for (const e of story.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
  });
});

describe('1966 is optional', () => {
  const SIXTY_SIX = ['knows:1966', 'constance_told_you', 'read_arthurs_letter', 'the_family_pattern'];

  it('stays hidden until the player tells Grandmother about the errand', () => {
    const lead = quest('q_sixty_years_ago');
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).not.toBe(true);
    expect(lead.discoverWhen?.flagsSet).toEqual(['constance_saw_the_pattern']);
    expect(story.worldEvents.some((e) => e.setsFlags.includes('constance_saw_the_pattern'))).toBe(false);
    expect(stepOf('tell_her').rewards.abilities).toEqual(['ask_about_1966']);
  });

  it('describes the locked question in the world’s words', () => {
    const ask = ability('ask_about_1966');
    expect(ask.unlockedByDefault).toBe(false);
    expect(ask.requires?.lockedCopy.length).toBeGreaterThan(30);
  });

  it('leaves most endings reachable by a player who never hears the name Arthur', () => {
    const without = story.endings.filter((e) => !e.requires.flagsSet.some((f) => SIXTY_SIX.includes(f)));
    expect(without.length).toBeGreaterThanOrEqual(10);
    for (const text of [story.premise, story.hook, story.fantasyLabel, story.opening]) {
      expect(text).not.toContain('Arthur');
      expect(text).not.toContain('1966');
    }
  });
});

describe('she is a person, not a prize', () => {
  const elena = character('elena');

  it('starts her still in love and not trusting you', () => {
    expect(elena.startingRelationship.affection).toBeGreaterThanOrEqual(50);
    expect(elena.startingRelationship.trust).toBeLessThanOrEqual(25);
  });

  it('gives her more than one of everything', () => {
    expect(elena.boundaries.length).toBeGreaterThanOrEqual(2);
    expect(elena.fears.length).toBeGreaterThanOrEqual(2);
    expect(elena.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(elena.secrets.length).toBeGreaterThanOrEqual(3);
    expect(elena.voiceSamples.length).toBeGreaterThanOrEqual(4);
  });

  it('puts the romance behind the truth, not behind winning', () => {
    const romance = elena.gates.filter((g) => g.kind === 'ROMANCE');
    expect(romance.length).toBe(1);
    expect(romance[0]!.requires.trust).toBeGreaterThan(elena.startingRelationship.trust);
    expect(romance[0]!.requires.affection).toBeGreaterThan(elena.startingRelationship.affection);
    expect(romance[0]!.requires.flagsSet).toEqual(['elena_knows_the_truth']);
  });

  it('keeps June’s romance slow, and behind her being honest first', () => {
    const june = character('june');
    const romance = june.gates.filter((g) => g.kind === 'ROMANCE');
    expect(romance.length).toBe(1);
    expect(romance[0]!.requires.flagsSet).toEqual(['june_in_the_open']);
    expect(quest('q_the_woman_in_the_photograph').discoverWhen?.flagsSet).toEqual(['knows:the_photograph']);
  });
});

describe('the people', () => {
  it('casts the bride, the brother and the grandmother first', () => {
    expect(story.characters.map((c) => c.id)).toEqual(['elena', 'marcus', 'constance', 'june', 'sami', 'benny']);
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
      for (const s of c.secrets) {
        expect(s.visibility, `${c.id}/${s.id}`).toBe('NPC_PRIVATE');
        expect(s.revealHint.length, `${c.id}/${s.id}`).toBeGreaterThan(10);
      }
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
    // Elena counts, and asks one question at a time.
    expect(sample('elena')).toMatch(/Eleven calls\. One voicemail\. One photograph\./);
    expect(sample('elena')).toMatch(/Yes or no\./);
    // Marcus slows you down with "hey" and calls you brother.
    expect(sample('marcus')).toMatch(/^Hey\. Hey\./);
    expect(sample('marcus')).toMatch(/brother/);
    // Constance says "darling" as a reprimand and refers to herself in the third person.
    expect(sample('constance')).toMatch(/darling/);
    expect(sample('constance')).toMatch(/Constance Hale does not/);
    // June talks in times and headset English.
    expect(sample('june')).toMatch(/Twelve-oh-six/);
    expect(sample('june')).toMatch(/Copy\. Copy that\./);
    // Sami does triage on you.
    expect(sample('sami')).toMatch(/Pupils equal, colour terrible/);
    // Benny gives evidence as frames and times as light.
    expect(sample('benny')).toMatch(/Frame two-two-one-four/);
    expect(sample('benny')).toMatch(/Golden hour/);
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
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of story.resources) {
      if (r.polarity !== 'GOOD_LOW') continue;
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('sends a public scene to the guests and the gossip', () => {
    expect(story.factions[0]?.id).toBe('faction_guests');
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('gossip');
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

  it('runs the clock to midnight and the morning after, in order', () => {
    const midnight = event('we_midnight');
    expect(midnight.atWorldMinute).toBe(1440);
    expect(midnight.setsFlags).toEqual(['midnight_passed']);
    for (const e of story.worldEvents) {
      expect(e.atWorldMinute, e.id).toBeGreaterThan(story.rules.startWorldMinute);
      expect(e.atWorldMinute, e.id).toBeLessThanOrEqual(event('we_sunday_brunch').atWorldMinute);
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

  it('keeps the store card free of what the player has to find out', () => {
    for (const text of [story.premise, story.hook, story.fantasyLabel]) {
      for (const secret of ['June', 'cold room', 'trust', '1966', 'Arthur', 'lender', 'second phone', 'boatyard']) {
        expect(text, secret).not.toContain(secret);
      }
    }
  });
});

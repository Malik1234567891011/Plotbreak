import { describe, expect, it } from 'vitest';
import { advanceQuests, createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { CLEANUP_CREW_E_RANK as story } from './cleanup-crew-e-rank.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Cleanup Crew, E-Rank is not in the launch catalog yet, so none of the
 * catalog-wide suites (catalog.spec, choice-clarity.spec, director.spec's
 * content bar) run on it. The checks they would make are repeated here, on
 * this world, so it arrives in the catalog already passing them.
 */

const start = (archetypeId = 'arch_lifer') =>
  createInitialState({
    sessionId: 'sess_cce',
    story,
    identity: {
      displayName: 'Han Yu-ri',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const words = (text: string): number => text.trim().split(/\s+/).length;

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

/** Every flag something in the world can actually set. */
function settable(): Set<string> {
  const out = new Set<string>();
  for (const q of story.quests) {
    for (const st of q.steps) {
      for (const f of st.rewards.flags) out.add(f);
      for (const r of st.succeedWhenAny) for (const f of r.setsFlags) out.add(f);
    }
  }
  for (const e of story.worldEvents) for (const f of e.setsFlags) out.add(f);
  for (const c of story.characters) {
    for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) out.add(f);
  }
  return out;
}
const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const engineSets = (f: string): boolean => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));

/** All the prose a player or the storyteller can read, as one string. */
const allText = JSON.stringify(story);

describe('Cleanup Crew, E-Rank', () => {
  // --- The three checkpoint checks -------------------------------------------

  describe('the checkpoint checks', () => {
    it('grants every gated ability somewhere', () => {
      const granted = new Set([
        ...story.archetypes.flatMap((a) => a.startingAbilities),
        ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ]);
      const gated = story.abilities.filter((a) => !a.unlockedByDefault).map((a) => a.id);
      expect(gated.length, 'the class abilities should start locked').toBeGreaterThanOrEqual(4);
      expect(gated.filter((id) => !granted.has(id)), 'gated but never granted').toEqual([]);
    });

    it('says "you" in every card blurb', () => {
      for (const c of story.characters) {
        expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
        expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
        expect(c.cardBlurb, c.id).not.toBe(c.role);
      }
    });

    it('gives every location an inbound edge', () => {
      const inbound = new Set(story.locations.flatMap((l) => l.connections.map((c) => c.to)));
      expect(story.locations.filter((l) => !inbound.has(l.id)).map((l) => l.id)).toEqual([]);
    });
  });

  // --- The opener ------------------------------------------------------------

  describe('the opener', () => {
    const opening = story.opening;
    const first60 = opening.trim().split(/\s+/).slice(0, 60).join(' ');

    it('is between 50 and 120 words', () => {
      expect(words(opening)).toBeGreaterThanOrEqual(50);
      expect(words(opening)).toBeLessThanOrEqual(120);
    });

    it('has a named character speak to the player inside the first 60 words', () => {
      expect(first60).toMatch(/"[^"]+"/);
      expect(first60).toContain('Hae-won');
      // Introduced by what she is to the player, in the same sentence as her name.
      expect(opening).toMatch(/Seo Hae-won, the guild healer who stayed behind/);
    });

    it('ends on a question that needs an answer now', () => {
      expect(opening.trim()).toMatch(/\?\]?$/);
    });

    it('names nothing the player has to know already', () => {
      for (const name of [
        ...story.locations.map((l) => l.name),
        ...story.factions.map((f) => f.name),
        ...story.items.map((i) => i.name),
      ]) {
        expect(opening, name).not.toContain(name);
      }
      const named = story.characters.filter((c) => c.id !== 'hae_won' && opening.includes(calledName(c)));
      expect(named.map((c) => c.id), 'only Hae-won is named in the opener').toEqual([]);
    });

    it('offers three different moves: one said, one done, one risky', () => {
      const [said, done, risky] = story.openingSuggestions;
      expect(story.openingSuggestions).toHaveLength(3);
      expect(said, 'said').toMatch(/^"/);
      expect(done, 'done').toMatch(/^I /);
      expect(done, 'done').not.toMatch(/"/);
      expect(risky, 'risky').toMatch(/Accept/);
      for (const card of story.openingSuggestions) {
        expect(card).toMatch(/\bI\b/);
        expect(card.length).toBeLessThanOrEqual(320);
        expect(card).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get)\b/);
      }
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

    it('starts in the hall with only the healer and the window present', () => {
      const state = start();
      expect(state.player.locationId).toBe('ash_hall');
      expect(story.rules.startWorldMinute % 1440).toBe(23 * 60 + 52);
      const present = charactersPresent(state).map((c) => c.characterId).sort();
      expect(present).toEqual(['hae_won', 'the_system']);
    });
  });

  // --- Adults only, 13+ ---------------------------------------------------------

  describe('content rating', () => {
    const NUMBER: Record<string, number> = {
      eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70,
      one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    };
    const ageOf = (appearance: string): number | null => {
      const m = appearance.match(/^([A-Za-z]+)(?:-([A-Za-z]+))?,/);
      if (!m) return null;
      const tens = NUMBER[m[1]!.toLowerCase()];
      if (tens === undefined) return null;
      return tens + (m[2] ? NUMBER[m[2].toLowerCase()] ?? 0 : 0);
    };

    it('states an adult age for every person in the cast', () => {
      for (const c of story.characters) {
        if (c.id === 'the_system') continue;
        const age = ageOf(c.appearance);
        expect(age, `${c.id} appearance should open with an age`).not.toBeNull();
        expect(age!, c.id).toBeGreaterThanOrEqual(18);
      }
      const ages = Object.fromEntries(
        story.characters.filter((c) => c.id !== 'the_system').map((c) => [c.id, ageOf(c.appearance)]),
      );
      expect(ages).toEqual({ hae_won: 24, jin: 27, ryu: 29, baek: 51, pyo: 58 });
    });

    it('tells the storyteller first that everyone is an adult, with every age', () => {
      const canon = story.rules.hardCanon[0]!;
      expect(canon).toMatch(/^Everyone in this story is an adult\./);
      expect(canon).toMatch(/licenses nobody under nineteen/);
      for (const age of ['twenty-four', 'twenty-seven', 'twenty-nine', 'fifty-one', 'fifty-eight', 'forty-four']) {
        expect(canon, age).toContain(age);
      }
      // The trainees in the second relapse are stated as adults wherever they appear.
      expect(allText).not.toMatch(/new-licence hunters/);
      expect(story.worldEvents.find((e) => e.id === 'we_the_tower_goes_red')!.publicCopy).toMatch(/in their twenties/);
    });

    it('keeps the System a voice rather than a person', () => {
      const system = story.characters.find((c) => c.id === 'the_system')!;
      expect(system.pronouns).toBe('it/its');
      expect(system.combatant).toBeNull();
      expect(system.appearance).toMatch(/^Not a body/);
    });

    it('uses no word that reads as a minor', () => {
      expect(allText).not.toMatch(/\b(child|childlike|kid|kids|teen|teenager|schoolgirl|schoolboy|underage|little girl|little boy|high school)\b/i);
    });

    it('stays inside a 13+ rating', () => {
      expect(allText).not.toMatch(/\b(nude|naked|nudity|sexual|sex|gore|gory|suicide|self-harm|disembowel)\b/i);
      expect(story.endings.find((e) => e.id === 'end_the_clinic')!.condition).toMatch(/no further than a kiss/);
      expect(story.rules.toneGuide).toMatch(/no further than a kiss/);
    });

    it('borrows no franchise vocabulary', () => {
      expect(allText).not.toMatch(
        /\b(hunter association|status window|system window|daily quest|shadow monarch|double dungeon|red gate|awakened|awakening|arise|quirk|nen|chakra|hokage|monarch)\b/i,
      );
    });

    it('is written in English', () => {
      expect(allText).not.toMatch(/[぀-ヿ一-鿿가-힯]/);
    });
  });

  // --- Catalog checks, replicated -----------------------------------------------

  describe('catalog checks', () => {
    it('meets the content bar', () => {
      expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
      expect(words(story.premise)).toBeGreaterThanOrEqual(100);
      expect(words(story.premise)).toBeLessThanOrEqual(250);
      const paragraphs = story.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
      for (const p of paragraphs) expect(words(p)).toBeLessThanOrEqual(70);
      expect(story.promises.length).toBeGreaterThanOrEqual(3);
      expect(story.characters.length).toBeGreaterThanOrEqual(3);
      expect(story.openingSuggestions).toHaveLength(3);
    });

    it('passes the narrative clarity standard', async () => {
      const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
      const report = checkStoryClarity(story);
      const errors = report.issues.filter((i) => i.severity === 'ERROR');
      expect(errors.map((e) => `${e.code}: ${e.message} [${e.evidence ?? ''}]`)).toEqual([]);
      const premise = checkNarrativeClarity(story.premise, { story, kind: 'premise' });
      expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    });

    it('has no clarity errors on any choice screen', async () => {
      const { checkStoryChoiceClarity } = await import('@plotbreak/director');
      const report = checkStoryChoiceClarity(story);
      expect(
        report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`),
      ).toEqual([]);
    });

    it('explains the archetype choice and says it is permanent', () => {
      const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
      expect(field.helpText.length).toBeGreaterThan(60);
      expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
      for (const a of story.archetypes) {
        expect(a.name).not.toMatch(/—/);
        expect(a.summary.length).toBeGreaterThan(40);
        expect(a.playstyle.length).toBeGreaterThanOrEqual(2);
        for (const tag of a.playstyle) expect(tag.length, tag).toBeLessThanOrEqual(24);
      }
      const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
      expect(new Set(tagSets).size).toBe(tagSets.length);
    });

    it('keeps archetype names out of the canon the storyteller reads', () => {
      const canon = [story.premise, ...story.rules.hardCanon, ...story.characters.map((c) => c.name)].join(' ');
      for (const a of story.archetypes) expect(canon, a.name).not.toContain(a.name);
    });

    it('says what every ability does in ordinary words', () => {
      for (const ability of story.abilities) {
        const effect = abilityEffect(story, ability);
        expect(effect, ability.id).toMatch(/rolls |always works/);
        expect(effect, ability.id).toMatch(/costs /);
        expect(effect.length, ability.id).toBeLessThan(120);
      }
    });

    it('uses expressions the generator draws', () => {
      const unknown = story.characters.flatMap((c) =>
        c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`),
      );
      expect(unknown).toEqual([]);
    });

    it('gives no two characters the same short name', () => {
      const names = story.characters.map((c) => calledName(c).toLowerCase());
      expect(new Set(names).size).toBe(names.length);
      expect(names).toEqual(['hae-won', 'jin', 'ryu', 'baek', 'pyo', 'system']);
    });

    it('never lets two items answer to the same words', () => {
      const owners = new Map<string, Set<string>>();
      for (const l of story.locations) {
        for (const t of l.takeableItems) {
          for (const alias of t.aka) {
            const key = alias.trim().toLowerCase();
            owners.set(key, (owners.get(key) ?? new Set()).add(t.itemId));
          }
        }
      }
      expect([...owners].filter(([, ids]) => ids.size > 1).map(([a]) => a)).toEqual([]);
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
          if (flag.startsWith('used:')) expect(grantable.has(flag.slice(5)), where).toBe(true);
        }
        for (const itemId of route.predicate.hasItems) expect(obtainable.has(itemId), where).toBe(true);
      }
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
        if (a.check && a.check.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
      }
      for (const i of story.items) {
        for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} mods ${s}`);
        if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
      }
      for (const a of story.archetypes) {
        for (const s of Object.keys(a.skillProficiencies)) if (!skillIds.has(s)) broken.push(`${a.id} skill ${s}`);
        for (const r of a.startingReputation) if (!facIds.has(r.factionId)) broken.push(`${a.id} rep ${r.factionId}`);
      }
      for (const e of story.worldEvents) {
        if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
        for (const m of e.movesCharacters) {
          if (!charIds.has(m.characterId) || !locIds.has(m.toLocationId)) broken.push(`${e.id} moves ${m.characterId}`);
        }
      }
      for (const o of story.openingObligations) {
        if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation ${o.withCharacterId}`);
      }
      for (const q of story.quests) {
        for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
        for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
        for (const st of q.steps) {
          for (const rep of st.rewards.reputation) if (!facIds.has(rep.factionId)) broken.push(`${st.id} rep`);
          const preds = [st.enterWhen, st.succeedWhen, st.failWhen, ...st.succeedWhenAny.map((r) => r.predicate)];
          for (const p of preds) {
            if (!p) continue;
            if (p.atLocation && !locIds.has(p.atLocation)) broken.push(`${st.id} at ${p.atLocation}`);
            for (const r of p.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${st.id} on ${r.characterId}`);
            for (const r of p.minFactionReputation) if (!facIds.has(r.factionId)) broken.push(`${st.id} on ${r.factionId}`);
          }
        }
      }
      for (const e of story.endings) {
        for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
      }
      expect(broken).toEqual([]);
    });

    it('only reads flags something can set', () => {
      const can = settable();
      const reads: Array<[string, string]> = [];
      for (const q of story.quests) {
        for (const f of q.discoverWhen?.flagsSet ?? []) reads.push([`${q.id} discover`, f]);
        for (const st of q.steps) {
          for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) for (const f of p?.flagsSet ?? []) reads.push([st.id, f]);
          for (const r of st.succeedWhenAny) for (const f of r.predicate.flagsSet) reads.push([`${st.id}/${r.routeId}`, f]);
        }
      }
      for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet ?? []) reads.push([g.id, f]);
      for (const e of story.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) reads.push([e.id, f]);
      for (const e of story.endings) for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) reads.push([e.id, f]);
      for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) reads.push([a.id, f]);
      for (const l of story.locations) for (const c of l.connections) if (c.lockedByFlag) reads.push([`${l.id}->${c.to}`, c.lockedByFlag]);
      const dead = reads.filter(([, f]) => !can.has(f) && !engineSets(f)).map(([w, f]) => `${w}: ${f}`);
      expect(dead).toEqual([]);
    });

    it('never gates a faction route above the reputation anyone can reach', () => {
      for (const f of story.factions) {
        const bestStart = Math.max(
          0,
          ...story.archetypes.map((a) =>
            a.startingReputation.filter((r) => r.factionId === f.id).reduce((s, r) => s + r.amount, 0),
          ),
        );
        const rewards = story.quests
          .flatMap((q) => q.steps.flatMap((s) => s.rewards.reputation))
          .filter((r) => r.factionId === f.id)
          .reduce((s, r) => s + r.amount, 0);
        const ceiling = f.startingReputation + bestStart + rewards;
        for (const { route } of routes) {
          for (const gate of route.predicate.minFactionReputation.filter((g) => g.factionId === f.id)) {
            expect(gate.value, `${route.routeId} on ${f.id}`).toBeLessThanOrEqual(ceiling);
          }
        }
        expect(f.ranks.length).toBeGreaterThanOrEqual(3);
      }
    });

    it('puts every character somewhere at the opening minute', () => {
      const minute = story.rules.startWorldMinute % 1440;
      for (const c of story.characters) {
        const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
        expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
      }
    });

    it('gives every ending a real threshold and a real epilogue', () => {
      for (const e of story.endings) {
        expect(e.minTurn, e.id).toBeGreaterThan(0);
        expect(e.condition.length, e.id).toBeGreaterThan(80);
        expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      }
    });

    it('closes something when a route is taken', () => {
      expect(routes.filter(({ route }) => route.closesFlags.length > 0).length).toBeGreaterThanOrEqual(5);
    });
  });

  // --- Mirrors of Good Morning, Husband's own suite ---------------------------

  describe('authoring', () => {
    it('has no literal backslash-n in any prose', () => {
      expect(allText).not.toMatch(/\\\\n/);
    });

    it('hides an optional mystery behind a flag', () => {
      const room = story.locations.find((l) => l.id === 'caretakers_room')!;
      expect(room.discoveredByDefault).toBe(false);
      const door = story.locations
        .flatMap((l) => l.connections)
        .find((c) => c.to === 'caretakers_room')!;
      expect(door.lockedByFlag).toBe('saw_the_door');
      const lead = story.quests.find((q) => q.id === 'q_the_unmapped_room')!;
      expect(lead.kind).toBe('LEAD');
      expect(lead.discoverWhen?.flagsSet).toEqual(['took_the_class']);
    });

    it('explains every locked ability in the fiction', () => {
      for (const a of story.abilities.filter((x) => (x.requires?.flagsSet.length ?? 0) + (x.requires?.flagsUnset.length ?? 0) > 0)) {
        expect(a.requires!.lockedCopy.length, a.id).toBeGreaterThan(30);
        expect(a.requires!.lockedCopy, a.id).not.toMatch(/flag|predicate|locked/i);
      }
    });

    it('gives every character depth', () => {
      for (const c of story.characters) {
        expect(c.hiddenDrives.length, c.id).toBeGreaterThanOrEqual(2);
        expect(c.secrets.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
        expect(c.boundaries.length, c.id).toBeGreaterThanOrEqual(2);
        expect(c.fears.length, c.id).toBeGreaterThanOrEqual(2);
        expect(c.speechStyle.length, c.id).toBeGreaterThan(80);
      }
    });

    it('keeps every pair of voices lexically apart', () => {
      const content = (text: string) =>
        new Set(
          text
            .toLowerCase()
            .replace(/[^a-z\s]/g, ' ')
            .split(/\s+/)
            .filter((w) => w.length > 3),
        );
      for (const a of story.characters) {
        for (const b of story.characters) {
          if (a.id >= b.id) continue;
          const va = content(a.voiceSamples.join(' '));
          const vb = content(b.voiceSamples.join(' '));
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
        const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v)));
        expect(users.length, label).toBeLessThanOrEqual(1);
      }
    });

    it('demonstrates each voice’s signature in its samples', () => {
      const sig: Record<string, RegExp> = {
        hae_won: /\bcleaner\b|\bpulse\b/i,
        jin: /\bunfortunately\b|\btriple time\b/i,
        ryu: /better offer/i,
        baek: /six o’clock|licence number/i,
        pyo: /son of a mop|thirty-one/i,
        the_system: /^\[/,
      };
      for (const c of story.characters) {
        expect(c.voiceSamples.some((v) => sig[c.id]!.test(v)), c.id).toBe(true);
      }
    });

    it('lets the System speak only in square brackets', () => {
      const system = story.characters.find((c) => c.id === 'the_system')!;
      for (const v of system.voiceSamples) expect(v, v).toMatch(/^\[.*\]$/);
      for (const v of system.voiceSamples) expect(v).not.toMatch(/!/);
    });
  });

  // --- The class is a choice -------------------------------------------------

  describe('the hidden class', () => {
    const first = story.quests.find((q) => q.id === 'q_the_relapse')!.steps[0]!;
    const late = story.quests.find((q) => q.id === 'q_the_class')!.steps[1]!;

    it('offers yes and no as authored routes in the first minute', () => {
      const ids = first.succeedWhenAny.map((r) => r.routeId);
      expect(ids).toContain('said_yes');
      expect(ids).toContain('said_no');
      expect(ids.length).toBeGreaterThanOrEqual(6);
    });

    it('lets a refuser say yes later, and stay a cleaner on purpose', () => {
      const yes = late.succeedWhenAny.find((r) => r.routeId === 'said_yes_late')!;
      expect(yes.predicate.flagsSet).toContain('refused_the_class');
      expect(yes.setsFlags).toContain('took_the_class');
      expect(late.succeedWhenAny.some((r) => r.routeId === 'stayed_a_cleaner')).toBe(true);
    });

    it('gates the class abilities on the decision, not on luck', () => {
      for (const id of ['sign_off', 'take_inventory', 'put_it_back', 'close_out']) {
        const a = story.abilities.find((x) => x.id === id)!;
        expect(a.unlockedByDefault, id).toBe(false);
        expect(a.requires?.flagsSet, id).toContain('took_the_class');
      }
      // Granted where everybody passes, so a late yes is not a dead route.
      expect(first.rewards.abilities).toEqual(['sign_off', 'take_inventory', 'put_it_back']);
    });

    it('lets enough endings happen without the class', () => {
      const needsClass = (e: (typeof story.endings)[number]) =>
        e.requires.flagsSet.some((f) => ['took_the_class', 'class_went_public', 'class_kept_quiet', 'signed_with_goldcrest', 'closed_the_tower_gate', 'found_the_ledger'].includes(f));
      expect(story.endings.filter((e) => !needsClass(e)).length).toBeGreaterThanOrEqual(5);
    });

    it('puts the class powers and the fight rule where the storyteller reads them', () => {
      // Production reads hard canon, not ability descriptions or step notes.
      const canon = story.rules.hardCanon.join(' ');
      expect(canon).toMatch(/A Custodian can do four things/);
      expect(canon).toMatch(/sign off a room/);
      expect(canon).toMatch(/inventory of a room/);
      expect(canon).toMatch(/cannot be done again for about an hour/);
      expect(canon).toMatch(/close a whole gate for good/);
      expect(canon).toMatch(/done the hard way, without the class/);
      expect(canon).toMatch(/Every fight inside a relapsing gate makes the bell ring sooner/);
    });

    describe('on the engine path, a yes always lands', () => {
      const play = (...abilities: string[]) => {
        const state = start();
        for (const id of abilities) {
          state.flags[`used:${id}`] = true;
          advanceQuests(state, story);
        }
        return state.flags;
      };

      it('takes a yes after the pillar was lifted first', () => {
        const flags = play('do_the_job', 'accept_the_class');
        expect(flags.took_the_class).toBe(true);
        expect(flags.took_it_late).toBe(true);
      });

      it('takes a yes after a no, during the night', () => {
        const flags = play('refuse_the_class', 'accept_the_class');
        expect(flags.refused_the_class).toBe(true);
        expect(flags.took_the_class).toBe(true);
      });

      it('takes a yes after a splint and a no', () => {
        expect(play('patch_up', 'refuse_the_class', 'accept_the_class').took_the_class).toBe(true);
      });

      it('does not call a first-minute yes late', () => {
        const flags = play('accept_the_class');
        expect(flags.took_the_class).toBe(true);
        expect(flags.took_it_late).toBeFalsy();
      });

      it('leaves the class alone for somebody who never says yes', () => {
        expect(play('do_the_job', 'refuse_the_class').took_the_class).toBeFalsy();
      });

      it('lets a player who answered the window first still fight to the bottom', () => {
        const fight = story.quests
          .find((q) => q.id === 'q_the_relapse')!
          .steps[1]!.succeedWhenAny.find((r) => r.routeId === 'fought_to_the_bottom')!;
        expect(fight.predicate.flagsSet).not.toContain('freed_hae_won');
      });
    });

    it('never spoils the mystery in the premise', () => {
      expect(story.premise).not.toMatch(/Custodian|Deok-sun|shard|21:40|ledger/i);
    });
  });

  // --- Pressure that can be answered ----------------------------------------

  describe('the clock', () => {
    it('makes every pressure event cancellable by a flag the world can set', () => {
      const can = settable();
      for (const id of ['we_the_collapse', 'we_hounds_go_for_jin', 'we_the_tower_goes_red', 'we_the_contract_rolls_over']) {
        const e = story.worldEvents.find((x) => x.id === id)!;
        expect(e.cancelledByFlags.length, id).toBeGreaterThan(0);
        for (const f of e.cancelledByFlags) expect(can.has(f), `${id}: ${f}`).toBe(true);
      }
    });

    it('fires the collapse at six on the first morning', () => {
      const collapse = story.worldEvents.find((e) => e.id === 'we_the_collapse')!;
      expect(collapse.atWorldMinute).toBe(24 * 60 + 6 * 60);
      expect(collapse.cancelledByFlags).toEqual(['the_seal_broke']);
      expect(story.openingObligations[0]!.dueInMinutes).toBe(collapse.atWorldMinute - story.rules.startWorldMinute);
    });

    it('has a loss with no relationship or item requirement, and an early walk-away', () => {
      const losses = ['end_six_oclock', 'end_contractor_personnel', 'end_hand_in_the_vest'].map(
        (id) => story.endings.find((e) => e.id === id)!,
      );
      for (const e of losses) {
        expect(e.requires.minRelationship, e.id).toEqual([]);
        expect(e.requires.hasItems, e.id).toEqual([]);
      }
      expect(story.endings.find((e) => e.id === 'end_hand_in_the_vest')!.minTurn).toBeLessThanOrEqual(22);
    });

    it('spreads endings across at least four rarities', () => {
      expect(new Set(story.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
    });
  });

  // --- Variables ---------------------------------------------------------------

  describe('variables', () => {
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

    it('gives resting exactly one honest thing to restore', () => {
      expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
    });

    it('lets violence land on the toll and the Bureau', () => {
      expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('toll');
      expect(story.factions[0]!.id).toBe('faction_bureau');
    });

    it('drives every descending variable with something the player can do', () => {
      for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
        expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
      }
    });
  });

  // --- Ids and art ---------------------------------------------------------------

  describe('ids and asset keys', () => {
    it('follows the catalog id conventions with null art', () => {
      expect(story.id).toBe('sv_cleanup_crew_e_rank_1');
      expect(story.storyId).toBe('story_cleanup_crew_e_rank');
      expect(story.coverImage).toBeNull();
      expect(story.keyArt).toBeNull();
      expect(story.openingPanel?.assetKey).toBe('story_cleanup_crew_e_rank/opening');
      for (const c of story.characters) expect(c.portrait, c.id).toBeNull();
    });

    it('carries what the art and release pipeline reads', () => {
      // docs/stories-50/PIPELINE.md, "What the 49 writers need in the fixture".
      const cover = story.coverDirection;
      expect(cover).toMatch(/\bTITLE:/);
      expect(cover).toContain('Cleanup Crew, E-Rank');
      expect(cover).toContain('CLEANUP CREW, E-RANK');
      expect(cover).toMatch(/FACES STAY CLEAN/);
      expect(cover).not.toMatch(/\b(young|younger|youthful|girl|boy|teen|aged|years old)\b/i);
      const alt = story.openingPanel!.alt;
      expect(alt.length).toBeLessThanOrEqual(200);
      const hae = story.characters.find((c) => c.id === 'hae_won')!;
      expect(alt.startsWith(hae.name.split(' ')[0]!), 'the panel art takes its reference from the first name').toBe(true);
      expect(alt).toContain(calledName(hae));
      for (const c of story.characters.filter((x) => x.cardBlurb.trim())) {
        expect(c.appearance.length, c.id).toBeGreaterThan(80);
      }
      expect(story.prologue).toEqual([]);
      expect(story.publishedAt).toBeNull();
    });

    it('puts the class offer in a starting quest item and every starting kit', () => {
      const window = story.items.find((i) => i.id === 'your_window')!;
      expect(window.questItem).toBe(true);
      expect(story.rules.startingItems.map((i) => i.itemId)).toContain('your_window');
      for (const a of story.archetypes) {
        expect(a.startingAbilities, a.id).toEqual(expect.arrayContaining(['do_the_job', 'accept_the_class', 'refuse_the_class']));
      }
      expect(story.rules.toneGuide.length).toBeGreaterThan(200);
    });

    it('derives asset keys under the story prefix', () => {
      const derived = withDerivedAssetKeys(story);
      expect(derived.coverImage).toMatch(/^story_cleanup_crew_e_rank\//);
      expect(derived.keyArt).toMatch(/^story_cleanup_crew_e_rank\//);
      for (const c of derived.characters) expect(c.portrait, c.id).toMatch(/^story_cleanup_crew_e_rank\//);
      for (const l of derived.locations) expect(l.stageImage, l.id).toMatch(/^story_cleanup_crew_e_rank\//);
    });
  });
});

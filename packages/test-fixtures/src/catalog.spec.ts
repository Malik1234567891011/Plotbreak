import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from './index.js';

/**
 * Is this a game, or an AI chat with statistics drawn around it?
 *
 * These are the structural half of that question — the half a test can answer
 * without playing. A world that fails one of them can still produce good prose;
 * it just cannot produce two runs that differ.
 */
describe('every launch world', () => {
  for (const story of LAUNCH_CATALOG) {
    describe(story.title, () => {
      const steps = story.quests.flatMap((quest) =>
        quest.steps.map((step) => ({ quest: quest.id, step })),
      );
      const routes = steps.flatMap(({ quest, step }) =>
        (step.succeedWhenAny ?? []).map((route) => ({ quest, step: step.id, route })),
      );

      it('has more than one way through', () => {
        // A world where every step has exactly one predicate is the same run
        // for everybody, however well it is written.
        expect(routes.length, 'no branching steps at all').toBeGreaterThanOrEqual(3);
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
            const abilityId = flag.slice('used:'.length);
            expect(grantable.has(abilityId), `${where} needs ${abilityId}, which nobody can have`).toBe(true);
          }
          for (const itemId of route.predicate.hasItems) {
            expect(obtainable.has(itemId), `${where} needs ${itemId}, which nothing gives out`).toBe(true);
          }
        }
      });

      it('never demands the thing it is about to hand you', () => {
        for (const { quest, step } of steps) {
          const granted = new Set(step.rewards.items.map((i) => i.itemId));
          const demanded = [
            ...(step.succeedWhen?.hasItems ?? []),
            ...(step.succeedWhenAny ?? []).flatMap((r) => r.predicate.hasItems),
          ];
          for (const itemId of demanded) {
            expect(
              granted.has(itemId),
              `${quest}/${step.id} can only be finished by someone who already has the ${itemId} it awards`,
            ).toBe(false);
          }
        }
      });

      it('gives every archetype something the rules can see', () => {
        for (const archetype of story.archetypes) {
          const total =
            Object.keys(archetype.attributeBonus).length +
            Object.keys(archetype.skillProficiencies).length +
            archetype.startingAbilities.length +
            archetype.startingItems.length;
          expect(total, `${archetype.id} grants nothing`).toBeGreaterThan(0);
        }
      });

      it('leaves something worth taking somewhere in the world', () => {
        if (story.items.length === 0) return;
        const takeable = story.locations.flatMap((l) => l.takeableItems);
        expect(takeable.length, 'nothing anywhere can be picked up or stolen').toBeGreaterThan(0);
        for (const entry of takeable) {
          expect(story.items.some((item) => item.id === entry.itemId), entry.itemId).toBe(true);
          if (entry.ownerId) {
            expect(story.characters.some((c) => c.id === entry.ownerId), entry.ownerId).toBe(true);
          }
        }
      });

      /**
       * Everything a world points at has to exist, and everything it gates has
       * to be openable.
       *
       * Authoring Ace and Light produced six bugs of exactly this shape and
       * none of them was visible by reading the file: two endings requiring a
       * flag nothing set, an ability gated on a flag nothing set, three travel
       * connections locked behind flags nothing set, and three locations
       * nothing connected to. Zod validated all of it happily, because every
       * one of them is a well-formed string in the right field.
       */
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
        for (const f of story.factions) {
          for (const x of [...f.allies, ...f.enemies]) if (!facIds.has(x)) broken.push(`${f.id} refs ${x}`);
        }
        for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`startingItems ${i.itemId}`);
        if (!locIds.has(story.rules.startingLocationId)) broken.push(`startingLocationId ${story.rules.startingLocationId}`);
        for (const e of story.worldEvents) if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
        for (const o of story.openingObligations) {
          if (o.withCharacterId && !charIds.has(o.withCharacterId)) broken.push(`obligation with ${o.withCharacterId}`);
        }
        for (const e of story.endings) {
          for (const r of e.requires.minRelationship) if (!charIds.has(r.characterId)) broken.push(`${e.id} needs ${r.characterId}`);
          for (const i of e.requires.hasItems) if (!itemIds.has(i)) broken.push(`${e.id} needs item ${i}`);
        }
        for (const q of story.quests) {
          for (const id of q.involvedCharacterIds) if (!charIds.has(id)) broken.push(`${q.id} involves ${id}`);
          for (const id of q.involvedLocationIds) if (!locIds.has(id)) broken.push(`${q.id} involves ${id}`);
          for (const st of q.steps) {
            for (const r of st.rewards.items) if (!itemIds.has(r.itemId)) broken.push(`${st.id} rewards ${r.itemId}`);
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

      it('never gates something behind a flag nothing can set', () => {
        const settable = new Set<string>();
        for (const q of story.quests) {
          for (const st of q.steps) {
            for (const f of st.rewards.flags) settable.add(f);
            for (const r of st.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
          }
        }
        for (const e of story.worldEvents) for (const f of e.setsFlags) settable.add(f);
        // The third flag source, and the one I missed first time round: a
        // companion walking off sets flags too. Blackwake's `nessa_gone` and
        // `rook_gone` come from `leavesWhen`, and reading this test's first
        // version you would have concluded that world was broken when it was
        // the test that was.
        for (const c of story.characters) {
          for (const d of c.companion?.leavesWhen ?? []) for (const f of d.setsFlags) settable.add(f);
        }

        // The engine's own vocabulary, from `recordObservations` in
        // packages/engine/src/commit.ts, whose comment says outright that
        // "anything a story invents beyond that has to be produced by a step
        // reward or a route, which the launch-catalog tests enforce." This is
        // that enforcement, so it has to know the reserved set — and it is a
        // closed list on purpose: `knows:` is not in it, and a world using
        // that prefix has a typo rather than a feature.
        const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
        const ENGINE_FLAGS = ['left_the_map'];
        const engineSets = (f: string): boolean =>
          ENGINE_FLAGS.includes(f) || ENGINE_PREFIXES.some((p) => f.startsWith(p));

        // Flags the director sets during play rather than a route awarding them.
        // A world declares those by reading them in a predicate somewhere.
        const declared = new Set<string>(settable);
        const read = (flags: readonly string[]): void => {
          for (const f of flags) declared.add(f);
        };
        for (const q of story.quests) {
          if (q.discoverWhen) read(q.discoverWhen.flagsSet);
          for (const st of q.steps) {
            for (const p of [st.enterWhen, st.succeedWhen, st.failWhen]) if (p) read(p.flagsSet);
            for (const r of st.succeedWhenAny) read(r.predicate.flagsSet);
          }
        }
        for (const c of story.characters) for (const g of c.gates) read(g.requires.flagsSet);
        for (const e of story.worldEvents) read([...e.requiresFlags, ...e.cancelledByFlags]);

        const dead: string[] = [];
        for (const e of story.endings) {
          for (const f of e.requires.flagsSet) if (!declared.has(f) && !engineSets(f)) dead.push(`ending ${e.id} needs ${f}`);
        }
        for (const a of story.abilities) {
          if (!a.requires) continue;
          for (const f of a.requires.flagsSet) if (!declared.has(f) && !engineSets(f)) dead.push(`ability ${a.id} needs ${f}`);
        }
        for (const l of story.locations) {
          for (const c of l.connections) {
            if (c.lockedByFlag && !declared.has(c.lockedByFlag) && !engineSets(c.lockedByFlag)) dead.push(`${l.id}->${c.to} locked by ${c.lockedByFlag}`);
          }
        }
        expect(dead, `unreachable content: ${dead.join('; ')}`).toEqual([]);
      });

      /**
       * Nobody arrives in the opening scene by accident.
       *
       * `createInitialState` places a character by schedule, then by
       * `homeLocationId`, then — as a last resort — at the player's own
       * starting location. That last fallback is silent and it is where
       * Red-Haired Shanks ended up standing in a children's forest on Dawn
       * Island, because his schedule began twenty minutes after the story did.
       * Blackwake had the same shape: a Fleet captain hunting the player was
       * beside them in the market on turn one, because she had no schedule at
       * all.
       *
       * A character who should be in the opening is put there deliberately.
       * This catches the ones who are not.
       */
      /**
       * An authored card has to mean what the parser thinks it means.
       *
       * Ace's first card was a threat aimed at a seven-year-old that ended
       * "...because Sabo is laughing and I will hit him" — an idiom. The
       * parser read `hit` as a verb with a present target, so a player who
       * tapped dialogue got a fistfight with the wrong person, a failed Strike
       * check, and two people newly afraid of them. The card was word-perfect
       * prose and completely wrong as an input.
       *
       * This runs the real parser rather than a word list, because the rule it
       * is protecting is the parser's rule.
       */
      it('offers no opening card the parser turns into a fight', async () => {
        if (story.openingSuggestions.length === 0) return;
        const [{ RuleBasedIntentParser }, { createInitialState }] = await Promise.all([
          import('@plotbreak/director'),
          import('@plotbreak/engine'),
        ]);
        const parser = new RuleBasedIntentParser();
        const state = createInitialState({
          sessionId: `sess_cards_${story.storyId}`,
          story,
          identity: {
            displayName: story.protagonist.kind === 'NAMED' ? story.protagonist.name : 'Tester',
            pronouns: story.protagonist.pronouns || 'they/them',
            ageBand: null,
            archetypeId: story.archetypes[0]?.id ?? null,
            worldKnowsAboutYou: '',
            advanced: {},
            portraitAssetId: null,
          },
        });

        const violent: string[] = [];
        for (const card of story.openingSuggestions) {
          const intent = await parser.parse(card, {
            story,
            state,
            intentId: 'intent_card_probe',
            addressee: null,
          });
          // `actions[].verb`, not `intent.verb`. The first version of this
          // test read a field that does not exist, so it passed on the exact
          // card that caused the bug — which is worse than having no test,
          // because it reported the world as clean.
          if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card.slice(0, 70));
        }
        expect(
          violent,
          `these opening cards parse as an attack: ${violent.join(' | ')}`,
        ).toEqual([]);
      });

      it('never drops a character into the opening scene by fallback', () => {
        const minuteOfDay = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
        const scheduledAtStart = (character: (typeof story.characters)[number]): string | null => {
          for (const block of character.schedule) {
            if (minuteOfDay >= block.startMinute && minuteOfDay < block.endMinute) {
              return block.locationId;
            }
          }
          return null;
        };
        const dumped = story.characters.filter(
          (c) => scheduledAtStart(c) === null && c.homeLocationId === null,
        );
        expect(
          dumped.map((c) => c.id),
          `these have no place at the opening minute and will be placed on the player: ` +
            dumped.map((c) => c.id).join(', '),
        ).toEqual([]);
      });

      it('can be walked to from where it starts', () => {
        // A location with no inbound connection that is not discovered by
        // default is content nobody will ever see.
        const orphans = story.locations.filter(
          (l) =>
            !l.discoveredByDefault &&
            !story.locations.some((other) => other.connections.some((c) => c.to === l.id)),
        );
        expect(orphans.map((l) => l.id), 'locations nothing connects to').toEqual([]);
      });

      it('closes something when a route is taken, at least somewhere', () => {
        // A choice that costs nothing is not a choice. Not every route needs to
        // shut a door, but a world where none of them ever does has no branches
        // that matter.
        if (routes.length === 0) return;
        expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
      });
    });
  }
});

/**
 * A world whose art exists must actually ask for it.
 *
 * `derive-assets.ts` says this failure is "invisible in tests and only shows up
 * in a screenshot, so it is designed out rather than guarded against". It was
 * not designed out: Hush House, Window Seven and Good Morning, Husband were
 * exported raw — correct while their art was uncommissioned, and silently wrong
 * the moment it was generated. 180 files sat on disk while the catalog served
 * null and every card drew a gradient.
 *
 * So: guarded against, since the design did not hold.
 */
describe('worlds that have art declare it', () => {
  const assetsRoot = new URL('../../../infra/seed/assets/', import.meta.url);

  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} declares a cover if one has been generated`, async () => {
      const { existsSync } = await import('node:fs');
      const generated = existsSync(new URL(`${story.storyId}/cover.webp`, assetsRoot));
      if (!generated) return; // Art not commissioned yet: null keys are correct.
      expect(story.coverImage, `${story.title} has cover art on disk but declares none`).toBeTruthy();
      expect(story.keyArt, `${story.title} has art on disk but declares no key art`).toBeTruthy();
    });
  }
});

/**
 * Every expression a world authors must resolve to a face that exists.
 *
 * Reaction decks are generated from a fixed eight, and worlds name expressions
 * in their own voice — `sulking`, `implacable`, `unimpressed`. Nothing
 * reconciled the two, so the director picked an authored word, the asset key
 * had never been drawn, and the frame 404'd silently. Measured when this was
 * written: **257 of 374 authored expressions across the catalog had no asset.**
 * Sixty-four of Itachi's eighty-nine files are reaction frames and only
 * `neutral` could be reached, which is why a world with eighty-nine images
 * looked like a world with none.
 *
 * `toReactionEmotion` maps the authored word onto one of the eight. This checks
 * the map actually covers what the catalog says, so a new world introducing a
 * new word fails here rather than shipping an invisible hole.
 */
describe('authored expressions resolve to a real face', () => {
  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} uses expressions the generator draws`, async () => {
      const { knownExpression } = await import('@plotbreak/contracts');
      const unknown = story.characters
        .flatMap((c) => c.expressions.map((e) => ({ character: c.name, expression: e })))
        .filter(({ expression }) => !knownExpression(expression));
      expect(
        unknown.map((u) => `${u.character}: ${u.expression}`),
        'add these to EMOTION_SYNONYMS in packages/contracts/src/game/assets.ts',
      ).toEqual([]);
    });
  }
});

/**
 * No two people on screen answer to the same word.
 *
 * The chips, the cards and the witness lines call a character by one word.
 * `shortName` derives it by taking the first word that is not a title, which
 * is right for most names and silently wrong for the rest: Ace's Monkey D.
 * Luffy and Monkey D. Garp were both "Monkey", and Blackwake once had two
 * captains in a scene who were both "Captain". A player reading
 * "Monkey is afraid of you" cannot tell which one, and the check label beside
 * it said "Monkey D. Luffy" — two names for the same person in one turn.
 *
 * The fix is `CharacterDef.calledName`, authored by the world that knows. This
 * is what makes a world that needs it fail here instead of shipping.
 */
describe('every character has a name of their own', () => {
  for (const story of LAUNCH_CATALOG) {
    it(`${story.title} gives no two characters the same short name`, async () => {
      const { calledName } = await import('@plotbreak/contracts');
      const byWord = new Map<string, string[]>();
      for (const character of story.characters) {
        const word = calledName(character).toLowerCase();
        byWord.set(word, [...(byWord.get(word) ?? []), character.name]);
      }
      const collisions = [...byWord.entries()]
        .filter(([, names]) => names.length > 1)
        .map(([word, names]) => `${word}: ${names.join(' / ')}`);
      expect(collisions, 'set calledName on these characters').toEqual([]);
    });

  }
});

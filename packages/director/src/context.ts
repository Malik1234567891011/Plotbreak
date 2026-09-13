import type {
  AddressPair,
  CharacterDef,
  GameState,
  IntentDialogue,
  MemoryFact,
  PlayerGrammar,
  QualityTier,
  RelationshipState,
  Resolution,
  StoryVersion,
  TurnRecord,
} from '@plotbreak/contracts';
import { QUALITY_TIERS, nameKeys, playerGrammar } from '@plotbreak/contracts';
import {
  abandonedObjectiveNote,
  approachingEndings,
  charactersPresent,
  eligibleEndings,
  composeStory,
  crewFlag,
  crewRoster,
  formatWorldTime,
  relationshipLabel,
  relationshipTone,
  topObjective,
  dayPart,
  dayPartLabel,
  formatClock,
  lightAt,
} from '@plotbreak/engine';
import type { DayPart, RelationshipTone } from '@plotbreak/engine';
import { retrieveLore } from './authored-lore.js';
import { lexicalSimilarity, retrieveMemories, type ScoredFact } from './memory.js';
import { sceneProgress, type SceneProgress } from './scene-progress.js';
import { addressState } from './address-fr.js';
import { pressureOf } from '@plotbreak/engine';

/**
 * Spec §17.5 — the context budget.
 *
 * Never send full lifetime history. This assembles the nine layers the spec
 * lists, sized by quality tier, and hands the director structured state rather
 * than a wall of transcript. Summaries are never substituted for authoritative
 * inventory or quest state.
 */

/**
 * The relationship a character with no `RelationshipState` reads as.
 *
 * Was the literal `'Wary'`, which is the English wording of a state rather than
 * the state itself. Going through `relationshipLabel` means the fallback is
 * translated like every other rung of the ladder.
 */
const NEUTRAL_RELATIONSHIP: RelationshipState = {
  characterId: '',
  trust: 0,
  affection: 0,
  respect: 0,
  fear: 0,
  rivalry: 0,
  lastChangedTurn: -1,
  unlockedGates: [],
};

export interface PresentCharacterContext {
  readonly def: CharacterDef;
  /**
   * How the character reads, **as an id**.
   *
   * Added because the label was being compared against literal English —
   * `relationshipLabel === 'Rival'` in `director.ts` — which is a latent bug in
   * English (a copy edit breaks it silently) and a certain one in French. Any
   * code that wants to *branch* on the relationship uses this; only code that
   * wants to *show* it uses the label.
   */
  readonly relationshipTone: RelationshipTone;
  /** Already in the session's locale. Shown to the player and read by the model. */
  readonly relationshipLabel: string;
  readonly relationship: { trust: number; affection: number; respect: number; fear: number; rivalry: number };
  /**
   * `tu` or `vous`, both ways, in French runs. Step 9.
   *
   * Carried here rather than derived at each model stage so the two cannot
   * disagree — the whole reason `speaker-brief.ts` exists. Present in English
   * runs too, where nothing reads it, because a field that exists only
   * sometimes is a field every caller has to guard.
   */
  readonly address: AddressPair;
  /** Only what this NPC could know — filtered before it ever reaches a prompt. */
  readonly knownMemories: ScoredFact[];
  readonly revealableSecrets: Array<{ id: string; fact: string }>;
  readonly openGates: string[];
  /**
   * Beats since the prose last named them or gave them a line.
   *
   * A person the engine has standing in the room and the writing has not
   * acknowledged for four turns has disappeared as far as the player is
   * concerned — not written out, which `present-absence.ts` catches, just
   * dropped. Ace put Dadan in the clearing from turn 12 and then did not
   * mention her on 16, 17, 18 or 20 while the other two talked over her.
   *
   * Null when they have not been mentioned anywhere in the window, which is
   * the case on the turn they arrive.
   */
  readonly turnsSinceMentioned: number | null;
}

export interface TurnContext {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly tier: QualityTier;

  // Layer 1 — immutable rules.
  readonly hardCanon: readonly string[];
  readonly toneGuide: string;

  // Layer 2 — the scene as it stands.
  readonly scene: {
    readonly locationId: string;
    readonly locationName: string;
    readonly locationDescription: string;
    readonly artDirection: string;
    /** `Day 3 · 4:15 PM` / `Jour 3 · 16:15`, in the session's locale. */
    readonly worldTimeLabel: string;
    /** The word — `Afternoon`, `Après-midi`. For prose. */
    readonly dayPart: string;
    /** The id — `AFTERNOON`. For branching. */
    readonly dayPartId: DayPart;
    /** `4:44 PM`, `16:44` — the clock the header is showing the player. */
    readonly clock: string;
    /** What the light is doing, so the prose cannot contradict the clock. */
    readonly light: string;
    readonly presentCharacterIds: readonly string[];
  };

  // Layer 3 — the player.
  readonly player: {
    readonly name: string;
    /** Free text the player wrote. Self-expression, not a grammar signal. */
    readonly pronouns: string;
    /**
     * How the narration must agree with this player, declared on setup.
     *
     * The grammar signal, as opposed to `pronouns` above. English does not
     * collect it and reads `UNSPECIFIED`; French cannot write a sentence
     * without it. `WRITER_POLICY_FR` turns it into a rule; `agree()` in
     * `@plotbreak/i18n` is the deterministic half.
     */
    readonly grammar: PlayerGrammar;
    readonly about: string;
    /** The archetype's name, so the prose knows what kind of person this is. */
    readonly archetype: string | null;
    /** What the player wrote about how they look, if they wrote anything. */
    readonly appearance: string;
    /**
     * Every other setup answer, as question and answer in plain words.
     *
     * Option ids mean nothing to a writer, so a chosen option is resolved to
     * its label here. Without this the advanced questions were collected,
     * stored, and read by nothing.
     */
    readonly setupAnswers: ReadonlyArray<{ question: string; answer: string }>;
    readonly resources: Array<{ id: string; name: string; current: number; max: number; polarity: string }>;
    readonly statuses: string[];
    readonly inventoryNames: string[];
    readonly abilityNames: string[];
  };

  // Layer 4 — objectives and standing.
  readonly objective: string | null;
  /**
   * Present when the authored trajectory and the actual one have come apart.
   * Not an instruction to herd the player back — the opposite.
   */
  readonly abandonedObjective: string | null;
  readonly activeQuests: Array<{ id: string; title: string; step: string; directorNotes: string }>;
  readonly factions: Array<{ name: string; rank: string; reputation: number }>;

  /**
   * Who travels with the player, and how that is going. Spec §14.7.
   *
   * Companions are not a subset of `presentCharacters`: they are the people who
   * are there in every scene whether they were scheduled to be or not, and the
   * writer has to know that a navigator who has stopped correcting you is still
   * on the deck. Empty in every world that has no companions at all.
   */
  readonly crew: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly station: string;
    readonly mood: string;
    /** Their opinions of each other, where they are strong enough to matter. */
    readonly frictionWith: readonly string[];
  }>;

  // Layer 5 — who is on stage, and what they may know.
  readonly presentCharacters: readonly PresentCharacterContext[];

  // Layer 6 — the last few turns only.
  readonly recentTurns: readonly { actionText: string | null; sceneSummary: string }[];

  /**
   * What has actually been said lately, and by whom.
   *
   * A scene summary does not carry a voice, so nothing downstream could see
   * that Sabo had opened seventeen of his last twenty-one lines with "Look,"
   * and Luffy twenty of twenty-two with "Ace!". It is a loop through the
   * context window rather than a fault in the character: the model reads its
   * own last beat, matches it, and the match is then what the next beat reads.
   * Somebody has to be able to see across turns to break it, which means
   * somebody has to be given the lines.
   */
  readonly recentDialogue: readonly { speakerId: string; text: string }[];

  /**
   * The cards already offered, newest last.
   *
   * A set of three is only a choice if the three differ, and three sets in a
   * row are only a story if they move. Response generation compares against
   * this before it offers anything.
   *
   * Two turns, not four. An exit the player keeps not taking has to come back
   * rather than vanish, and a short window is what makes a dropped card a
   * pause instead of a removal.
   */
  readonly recentSuggestions: readonly string[];

  /**
   * Who walked into this scene, and who walked out, since the last beat.
   *
   * Schedules and world events move people at **commit**, which is after the
   * writer has run — so a character put in the room by the clock is invisible
   * to the beat that should have shown them arriving, and simply exists in the
   * next one. Turn 33 of the forty-turn Ace run had Luffy, Dadan *and* Garp
   * arrive on Mount Colubo and Sabo leave, in a single turn, none of it
   * narrated. Garp is a Marine vice-admiral and the player's grandfather; he
   * appeared standing there.
   *
   * Derived from the previous beat's `LOCATION_CHANGE` mutations rather than
   * from a stored roster, so nothing new has to be persisted: whoever the last
   * turn moved into the room the player is standing in has just arrived, and
   * whoever it moved out of it has just gone.
   */
  readonly arrivals: readonly { id: string; name: string }[];
  readonly departures: readonly { id: string; name: string }[];

  /**
   * Whether the scene has stopped moving. See `scene-progress.ts`.
   *
   * Twenty turns of Ace never left Mount Colubo and advanced the world clock
   * by 115 minutes, so the first authored world event — three hundred turns
   * away at that rate — could never arrive. Nothing could see that, so nothing
   * pressed.
   */
  readonly sceneProgress: SceneProgress;

  /**
   * Images, gestures and props the last few beats have leant on.
   *
   * Not a banned list — a world is allowed its cicadas, and Ace's mountain
   * should sound like Ace's mountain. This is what the writer has already
   * spent, so it can reach for something else rather than the nearest thing it
   * just used.
   */
  readonly recentMotifs: readonly string[];

  /**
   * How many turns since the last hero frame, or null if there has never been
   * one. Spec §19.6 — image cadence is a rhythm, not a per-turn coin flip.
   */
  readonly turnsSinceHeroImage: number | null;

  // Layer 7 — retrieved canon.
  readonly retrievedFacts: readonly ScoredFact[];

  /**
   * What the player is on the hook for, and how hard it is pressing.
   *
   * Only what is *live*: an obligation forty minutes out is not news, and a
   * writer handed every open promise every turn will mention them every turn,
   * which reads as the game nagging. `SOON`, `NOW` and `LATE` are the ones
   * worth a sentence; `LATER` is carried so cards can know the pressure exists
   * without the prose announcing it.
   */
  /**
   * Who the player aimed this turn at, present or not.
   *
   * Carried so the validator can check that a question put to somebody who is
   * not in the room is answered by their absence rather than by whoever
   * happens to be standing nearby.
   */
  readonly addressedIds: readonly string[];

  readonly obligations: readonly {
    readonly what: string;
    readonly withName: string | null;
    readonly pressure: 'LATER' | 'SOON' | 'NOW' | 'LATE';
    readonly minutesLeft: number | null;
  }[];

  // Layer 8 — arc and promises.
  readonly arc: {
    readonly episode: number;
    readonly pacingStage: string;
    readonly tension: number;
    readonly promises: Array<{ id: string; label: string; stage: string; seedHint: string; payoffHint: string; weight: number }>;
  };

  /**
   * Where this run could actually end up, from here.
   *
   * Destinations, not a route: eligibility is computed from what the player has
   * already done, and nothing is steered toward. Usually empty, which is
   * correct — most turns are not near an ending.
   */
  readonly endings: {
    readonly available: ReadonlyArray<{ id: string; name: string; rarity: string; when: string; epilogue: string }>;
    readonly approaching: ReadonlyArray<{ id: string; name: string; hint: string }>;
  };

  // Layer 9 — what the engine already decided.
  readonly resolution: Resolution;

  /** The player's own parsed speech, so the writer can open the beat with it. */
  readonly playerDialogue: readonly IntentDialogue[];

  /**
   * What the player actually typed, verbatim.
   *
   * The engine decides the outcome and the beat plan describes it, but neither
   * carries the specific thing the player did — so a beat written from the plan
   * alone reads as a reply to some generic attempt. "I hand Kael my acceptance
   * letter" came back as prose that never mentioned a letter. Untrusted input:
   * it reaches the model through the untrusted channel, never as instructions.
   */
  readonly playerAction: string;
}

export interface BuildContextOptions {
  readonly story: StoryVersion;
  readonly state: GameState;
  readonly resolution: Resolution;
  readonly tier: QualityTier;
  readonly memories: readonly MemoryFact[];
  readonly recentTurns: readonly TurnRecord[];
  readonly actionText: string;
  readonly playerDialogue?: readonly IntentDialogue[];
  /** NPC ids the player's action was aimed at, for the address validator. */
  readonly addressedIds?: readonly string[];
}

export function buildTurnContext(options: BuildContextOptions): TurnContext {
  // Spec §11.9 — the director and writer see the composed world too, so a
  // generated person appears in the cast, can be a speaker, and can be
  // retrieved against, exactly like an authored one.
  const story = composeStory(options.story, options.state);
  const { state, resolution, tier, memories, recentTurns, actionText } = options;
  const config = QUALITY_TIERS[tier];

  const location = story.locations.find((l) => l.id === state.player.locationId);
  const present = charactersPresent(state);
  const presentIds = present.map((p) => p.characterId);

  // Entities in play this turn drive the overlap term in retrieval.
  const entityIds = [
    ...presentIds,
    state.player.locationId,
    ...resolution.mutations.map((m) => m.subjectId),
  ];

  const query = `${actionText} ${resolution.observableFacts.join(' ')}`;

  const retrievedFacts = [
    ...retrieveMemories(
      memories,
      state,
      { text: query, entityIds, limit: config.memoryBudget },
      lexicalSimilarity,
    ),
    // What the *author* wrote about the rest of the world, when this turn is
    // actually about it. On its own budget so it can never crowd out what
    // happened two turns ago. See `authored-lore.ts`.
    ...retrieveLore(story, state, { text: query, entityIds }),
  ];

  const obligations = state.obligations
    .filter((obligation) => obligation.status === 'OPEN')
    .map((obligation) => ({
      what: obligation.what,
      withName: obligation.withCharacterId
        ? (story.characters.find((c) => c.id === obligation.withCharacterId)?.name ?? null)
        : null,
      pressure: pressureOf(obligation, state.worldMinute),
      minutesLeft:
        obligation.dueWorldMinute !== null
          ? obligation.dueWorldMinute - state.worldMinute
          : obligation.budgetMinutes,
    }));

  const presentCharacters: PresentCharacterContext[] = present
    .map((runtime) => {
      const def = story.characters.find((c) => c.id === runtime.characterId);
      if (!def) return null;
      const rel = state.relationships.find((r) => r.characterId === def.id);
      const dimensions = {
        trust: rel?.trust ?? 0,
        affection: rel?.affection ?? 0,
        respect: rel?.respect ?? 0,
        fear: rel?.fear ?? 0,
        rivalry: rel?.rivalry ?? 0,
      };

      return {
        def,
        relationshipTone: rel ? relationshipTone(rel) : 'WARY',
        relationshipLabel: rel
          ? relationshipLabel(rel, state.locale)
          : relationshipLabel(NEUTRAL_RELATIONSHIP, state.locale),
        relationship: dimensions,
        address: addressState(def, rel),
        turnsSinceMentioned: turnsSinceMentioned(def, recentTurns),
        // Per-NPC retrieval, filtered to their own knowledge scope.
        knownMemories: retrieveMemories(
          memories,
          state,
          { text: query, entityIds, limit: Math.max(2, Math.floor(config.memoryBudget / 2)), forCharacter: def },
          lexicalSimilarity,
        ),
        // A secret is only offered to the writer once its gate has opened.
        revealableSecrets: def.secrets
          .filter((secret) => runtime.revealedSecretIds.includes(secret.id))
          .map((secret) => ({ id: secret.id, fact: secret.fact })),
        openGates: rel?.unlockedGates ?? [],
      } satisfies PresentCharacterContext;
    })
    .filter((c): c is PresentCharacterContext => c !== null);

  const activeQuests = state.quests
    .filter((q) => q.status === 'ACTIVE' || q.status === 'BLOCKED')
    .map((progress) => {
      const def = story.quests.find((q) => q.id === progress.questId);
      const step = def?.steps.find((s) => s.id === progress.currentStepId);
      return {
        id: progress.questId,
        title: def?.title ?? progress.questId,
        step: step?.playerCopy ?? '',
        directorNotes: step?.directorNotes ?? '',
      };
    });

  const promises = state.arc.promises.map((p) => {
    const def = story.promises.find((d) => d.id === p.promiseId);
    return {
      id: p.promiseId,
      label: def?.label ?? p.promiseId,
      stage: p.stage,
      seedHint: def?.seedHint ?? '',
      payoffHint: def?.payoffHint ?? '',
      weight: def?.weight ?? 0.5,
    };
  });

  return {
    story,
    state,
    tier,
    hardCanon: story.rules.hardCanon,
    toneGuide: story.rules.toneGuide,
    endings: {
      available: eligibleEndings(story, state).map(({ def }) => ({
        id: def.id,
        name: def.name,
        rarity: def.rarity,
        when: def.condition,
        epilogue: def.epilogue,
      })),
      approaching: approachingEndings(story, state).map((def) => ({
        id: def.id,
        name: def.name,
        hint: def.hint,
      })),
    },
    scene: {
      locationId: state.player.locationId,
      locationName: location?.name ?? state.player.locationId,
      locationDescription: location?.description ?? '',
      artDirection: location?.artDirection ?? '',
      // In the session's locale, not the interface's: these strings are read
      // by the writer as well as shown on the HUD, and the run's language is
      // the one the prose is in.
      worldTimeLabel: formatWorldTime(state.worldMinute, state.locale),
      dayPart: dayPartLabel(state.worldMinute, state.locale),
      dayPartId: dayPart(state.worldMinute),
      clock: formatClock(state.worldMinute, state.locale),
      light: lightAt(state.worldMinute, state.locale),
      presentCharacterIds: presentIds,
    },
    player: {
      name: state.player.identity.displayName,
      pronouns: state.player.identity.pronouns,
      grammar: playerGrammar(state.player.identity),
      about: state.player.identity.worldKnowsAboutYou,
      // Setup asks four questions and the screen promises the world will use
      // the answers. Only two of them were reaching the prose.
      archetype:
        story.archetypes.find((a) => a.id === state.player.identity.archetypeId)?.name ??
        state.player.identity.advanced.customArchetype ??
        null,
      appearance: state.player.identity.advanced.appearance ?? '',
      setupAnswers: Object.entries(state.player.identity.advanced)
        .filter(([id]) => id !== 'appearance' && id !== 'customArchetype')
        .flatMap(([id, value]) => {
          if (!value) return [];
          const field = story.setupFields.find((f) => f.id === id);
          if (!field) return [];
          const answer = field.options.find((o) => o.id === value)?.label ?? value;
          return [{ question: field.label, answer }];
        }),
      resources: state.player.resources.map((r) => {
        const def = story.resources.find((d) => d.id === r.id);
        return {
          id: r.id,
          name: def?.name ?? r.id,
          current: r.current,
          max: r.max,
          polarity: def?.polarity ?? 'GOOD_HIGH',
        };
      }),
      statuses: state.player.statuses.map((s) => s.label),
      inventoryNames: state.player.inventory.map(
        (e) => story.items.find((i) => i.id === e.itemId)?.name ?? e.itemId,
      ),
      abilityNames: state.player.abilities.map(
        (id) => story.abilities.find((a) => a.id === id)?.name ?? id,
      ),
    },
    crew: crewRoster(state, story).map((member) => ({
      id: member.def.id,
      name: member.def.name,
      station: member.companion.station,
      mood: member.moodLabel,
      frictionWith: member.companion.bonds
        .filter((bond) => bond.value <= -2 && Boolean(state.flags[crewFlag(bond.characterId)]))
        .map((bond) => story.characters.find((c) => c.id === bond.characterId)?.name ?? bond.characterId),
    })),
    objective: topObjective(state, story),
    // §16.8 — set when the player has walked away from the authored thread.
    abandonedObjective: abandonedObjectiveNote(state, story),
    activeQuests,
    factions: state.factions.map((f) => ({
      name: story.factions.find((d) => d.id === f.factionId)?.name ?? f.factionId,
      rank: f.rankLabel,
      reputation: f.reputation,
    })),
    obligations,
    addressedIds: options.addressedIds ?? [],
    presentCharacters,
    // Spec §17.5 layer 6 — the last 2–4 turns, never the whole history.
    turnsSinceHeroImage: turnsSinceHeroImage(recentTurns),
    recentTurns: recentTurns.slice(-4).map((t) => ({
      actionText: t.actionText,
      sceneSummary: t.sceneSummary,
    })),
    recentDialogue: recentTurns
      .slice(-4)
      .flatMap((t) =>
        (t.blocks ?? [])
          .filter((b) => b.type === 'DIALOGUE' && b.speakerId && b.speakerId !== 'player')
          .map((b) => ({ speakerId: b.speakerId as string, text: b.text })),
      ),
    recentSuggestions: recentTurns.slice(-2).flatMap((t) => (t.suggestions ?? []).map((sug) => sug.text)),
    recentMotifs: recentMotifs(recentTurns.slice(-3)),
    sceneProgress: sceneProgress(state, recentTurns),
    ...movementSinceLastBeat(story, state, recentTurns),
    retrievedFacts,
    arc: {
      episode: state.arc.episode,
      pacingStage: state.arc.pacingStage,
      tension: state.arc.tensionScore,
      promises,
    },
    resolution,
    playerAction: actionText,
    playerDialogue: options.playerDialogue ?? [],
  };
}

/**
 * Rough token accounting so cost telemetry and the §17.5 budget can be enforced
 * without pulling in a tokenizer. Four characters per token is close enough for
 * budgeting decisions.
 */
export function estimateTokens(value: unknown): number {
  return Math.ceil(JSON.stringify(value).length / 4);
}


/**
 * Turns since a hero frame last appeared.
 *
 * Read off the turn log rather than kept as state, because the log is the
 * record of what the player actually saw — a frame that failed to generate
 * should not count as one they were shown.
 */
/**
 * The concrete nouns and gestures the last few beats spent.
 *
 * Deliberately a frequency list of ordinary words rather than a curated motif
 * vocabulary: what matters is not which image it is, it is that the same one
 * is back for the fourth time. Ace's transcript leant on cicadas, sap, bark
 * and knuckles until the mountain stopped being a place and became a texture.
 *
 * Only words used more than once survive, because a thing said once is not yet
 * a habit, and only the top handful are carried, because a long list reads as
 * a prohibition and this is meant to read as a reminder.
 */
function recentMotifs(recentTurns: readonly TurnRecord[]): string[] {
  const counts = new Map<string, number>();
  for (const turn of recentTurns) {
    for (const block of turn.blocks ?? []) {
      for (const word of block.text.toLowerCase().match(/\p{L}{4,}/gu) ?? []) {
        if (MOTIF_STOPWORDS.has(word)) continue;
        counts.set(word, (counts.get(word) ?? 0) + 1);
      }
    }
  }
  return [...counts.entries()]
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([word]) => word);
}

/**
 * Words a beat repeats because it is a beat, not because it is repeating
 * itself. Function words, the second person, and the verbs every sentence in
 * an interactive story needs.
 */
const MOTIF_STOPWORDS = new Set([
  'your', 'yours', 'that', 'this', 'they', 'them', 'their', 'there', 'then', 'than', 'with',
  'from', 'into', 'onto', 'over', 'under', 'about', 'against', 'between', 'before', 'after',
  'still', 'just', 'like', 'when', 'what', 'which', 'while', 'where', 'because', 'been', 'have',
  'has', 'had', 'does', 'doing', 'said', 'says', 'saying', 'look', 'looks', 'looking', 'know',
  'knows', 'going', 'gone', 'want', 'wants', 'could', 'would', 'should', 'might', 'will',
  'something', 'nothing', 'anything', 'everything', 'someone', 'nobody', 'again', 'back',
  'down', 'here', 'only', 'even', 'more', 'much', 'very', 'never', 'always', 'once',
  'tes', 'vous', 'pour', 'dans', 'avec', 'mais', 'plus', 'tout', 'comme', 'sans', 'elle',
]);

/**
 * How many beats ago the prose last acknowledged this person.
 *
 * Named in narration or given a line — both count, because a character noticed
 * in a sentence is a character who is still in the room. Every word of their
 * name is checked, the same way `nameKeys` is used everywhere else, so "Curly
 * Dadan" is found when the prose writes "Dadan".
 */
/**
 * Arrivals and departures the player has not been told about yet.
 *
 * Only the beat immediately before this one, because an arrival is news for
 * exactly one turn. Only people the story has a name for, because the point is
 * that the writer can say "Garp comes up the path" rather than that something
 * changed in a table.
 */
function movementSinceLastBeat(
  story: StoryVersion,
  state: GameState,
  recentTurns: readonly TurnRecord[],
): { arrivals: { id: string; name: string }[]; departures: { id: string; name: string }[] } {
  const last = recentTurns.at(-1);
  if (!last) return { arrivals: [], departures: [] };

  const here = state.player.locationId;
  const present = new Set(charactersPresent(state).map((c) => c.characterId));
  const arrivals: { id: string; name: string }[] = [];
  const departures: { id: string; name: string }[] = [];

  for (const mutation of last.mutations ?? []) {
    if (mutation.type !== 'LOCATION_CHANGE') continue;
    if (mutation.subjectId === 'player') continue;
    const def = story.characters.find((c) => c.id === mutation.subjectId);
    if (!def) continue;
    const to = (mutation.payload as { locationId?: unknown }).locationId;
    if (typeof to !== 'string') continue;
    if (to === here && present.has(def.id)) arrivals.push({ id: def.id, name: def.name });
    else if (to !== here && !present.has(def.id)) departures.push({ id: def.id, name: def.name });
  }

  return { arrivals, departures };
}

function turnsSinceMentioned(def: CharacterDef, recentTurns: readonly TurnRecord[]): number | null {
  const keys = nameKeys(def.name).map((k) => k.toLowerCase());
  const window = recentTurns.slice(-6);
  for (let i = window.length - 1; i >= 0; i -= 1) {
    const turn = window[i]!;
    const named = (turn.blocks ?? []).some(
      (block) =>
        block.speakerId === def.id ||
        keys.some((key) => block.text.toLowerCase().includes(key)),
    );
    if (named) return window.length - 1 - i;
  }
  return null;
}

function turnsSinceHeroImage(recentTurns: readonly TurnRecord[]): number | null {
  for (let i = recentTurns.length - 1; i >= 0; i--) {
    // Distance to the turn being planned, which is not in `recentTurns` — so
    // a frame on the immediately previous turn is one turn ago, not zero. The
    // off-by-one here made every gap read one turn shorter than it was, and
    // the spacing rule reject frames it should have allowed.
    if (recentTurns[i]?.heroImageUrl) return recentTurns.length - i;
  }
  return null;
}

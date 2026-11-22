import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression, type QuestPredicate } from '@plotbreak/contracts';
import { PACK_RANK } from './pack-rank.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Pack Rank, held to the promise on its own card: no claws, no fangs, no
 * reason to kneel.
 *
 * The failures this world is most exposed to are a first beat that does not
 * hand the player a real choice, a refusal that silently ends the story, and a
 * thirty-year-old mystery that leaks into a run that never climbed to the
 * archive. The rest of this file is the catalogue checkpoint, run on one world.
 */

const story = PACK_RANK;

const start = (archetypeId = 'arch_wrestler') =>
  createInitialState({
    sessionId: 'sess_pack_rank',
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

const words = (text: string) => text.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w));

const steps = story.quests.flatMap((q) => q.steps);
const routes = steps.flatMap((s) => s.succeedWhenAny);

/** Every predicate the engine evaluates, with where it came from. */
const predicates: Array<[string, QuestPredicate]> = [
  ...story.quests.flatMap((q) => (q.discoverWhen ? [[`${q.id}/discover`, q.discoverWhen] as [string, QuestPredicate]] : [])),
  ...story.quests.flatMap((q) =>
    q.steps.flatMap((s) =>
      [
        [`${q.id}/${s.id}/enter`, s.enterWhen],
        [`${q.id}/${s.id}/succeed`, s.succeedWhen],
        [`${q.id}/${s.id}/fail`, s.failWhen],
        ...s.succeedWhenAny.map((r) => [`${q.id}/${s.id}/${r.routeId}`, r.predicate] as const),
      ].filter((pair): pair is [string, QuestPredicate] => pair[1] !== null),
    ),
  ),
  ...story.endings.map((e) => [e.id, e.requires] as [string, QuestPredicate]),
];

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
const ENGINE_FLAGS = new Set(['left_the_map']);

const settable = new Set<string>([
  ...routes.flatMap((r) => r.setsFlags),
  ...steps.flatMap((s) => s.rewards.flags),
  ...story.worldEvents.flatMap((e) => e.setsFlags),
]);

const characterIds = new Set(story.characters.map((c) => c.id));
const locationIds = new Set(story.locations.map((l) => l.id));
const itemIds = new Set(story.items.map((i) => i.id));
const abilityIds = new Set(story.abilities.map((a) => a.id));
const factionIds = new Set(story.factions.map((f) => f.id));
const skillIds = new Set(story.skills.map((s) => s.id));

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player reads', () => {
    for (const [field, text] of [
      ['premise', story.premise],
      ['opening', story.opening],
      ['hook', story.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const suggestion of story.openingSuggestions) expect(suggestion).not.toContain('\\n');
  });

  it('keeps the premise between 120 and 250 words, with no em-dashes', () => {
    const n = words(story.premise).length;
    expect(n).toBeGreaterThanOrEqual(120);
    expect(n).toBeLessThanOrEqual(250);
    expect(story.premise).not.toContain('—');
    expect(story.opening).not.toContain('—');
  });

  it('passes the premise and choice clarity checks with no errors', async () => {
    const { checkStoryClarity, checkStoryChoiceClarity } = await import('@plotbreak/director');
    const narrative = checkStoryClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(narrative.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
    const choice = checkStoryChoiceClarity(story).issues.filter((i) => i.severity === 'ERROR');
    expect(choice.map((i) => `${i.code}: ${i.message}`)).toEqual([]);
  });
});

describe('the opener hands the player a real choice', () => {
  const opening = story.opening;
  const castNames = new Set(story.characters.map((c) => calledName(c)));

  it('is at most 120 words', () => {
    expect(words(opening).length).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking within the first 60 words', () => {
    const first60 = words(opening).slice(0, 60).map((w) => w.replace(/[^A-Za-z]/g, ''));
    const speaker = first60.find((w) => castNames.has(w));
    expect(speaker, 'nobody named speaks early').toBeDefined();
    expect(opening).toMatch(new RegExp(`says ${speaker}`));
  });

  it('ends on a direct question', () => {
    expect(opening.trim().replace(/["”’]+$/, '')).toMatch(/\?$/);
  });

  it('names nobody the player has not just met', () => {
    const sentences = opening.split(/(?<=[.!?]["”]?)\s+|\n+/);
    const properNouns = new Set<string>();
    for (const sentence of sentences) {
      const ws = words(sentence.replace(/^["“]/, '')).slice(1);
      for (const w of ws) {
        const bare = w.replace(/[^A-Za-z']/g, '');
        if (/^[A-Z][a-z]/.test(bare)) properNouns.add(bare);
      }
    }
    for (const noun of properNouns) expect(castNames.has(noun), noun).toBe(true);
  });

  it('offers three cards: one said, one done, one risky, all in the first person', () => {
    expect(story.openingSuggestions).toHaveLength(3);
    const [said, done, risky] = story.openingSuggestions;
    expect(said).toMatch(/^["“]/);
    expect(done).not.toMatch(/["“]/);
    expect(risky).toMatch(/\btake\b.*\boff her\b/);
    for (const card of story.openingSuggestions) expect(card).toMatch(/\bI\b/);
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

  it('puts the speaker in the hall when the story starts', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('ruka');
  });
});

describe('everybody is an adult, and it reads that way', () => {
  const AGES: Record<string, [string, number]> = {
    ruka: ['Ruka Varn', 20],
    lio: ['Lio Solenne', 21],
    pim: ['Pim Hollowell', 19],
    stagg: ['Halvard Stagg', 51],
    fenn: ['Fenn Asari', 22],
    bryn: ['Bryn Holt', 23],
  };
  const NUMBER: Record<string, number> = {
    nineteen: 19, twenty: 20, 'twenty-one': 21, 'twenty-two': 22, 'twenty-three': 23, 'twenty-four': 24, 'fifty-one': 51,
  };

  it('states every age in the appearance, and every age is 18 or over', () => {
    expect(story.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    for (const c of story.characters) {
      const lead = c.appearance.split(',')[0]!.toLowerCase();
      expect(NUMBER[lead], `${c.id}: "${lead}"`).toBe(AGES[c.id]![1]);
      expect(NUMBER[lead]!).toBeGreaterThanOrEqual(18);
      expect(c.name).toBe(AGES[c.id]![0]);
    }
  });

  it('states the same ages in the bible', () => {
    const bible = readFileSync(new URL('../../../docs/story-bibles/new50/18_PACK_RANK.md', import.meta.url), 'utf8');
    for (const [name, age] of Object.values(AGES)) expect(bible).toContain(`### ${name}, ${age},`);
  });

  it('uses no word that reads as a minor, and no 13+ breach', () => {
    const text = JSON.stringify(story);
    expect(text).not.toMatch(/\b(girls?|boys?|kids?|child|children|teens?|teenagers?|teenage|schoolgirl|schoolboy|high school|middle school|underage|loli)\b/i);
    expect(text).not.toMatch(/\b(naked|nude|nudity|sexual|sex|lingerie|cleavage|gore|gory|suicide|self-harm)\b/i);
    expect(story.rules.hardCanon.join(' ')).toMatch(/college/i);
  });

  it('borrows no franchise names or terms', () => {
    const text = JSON.stringify(story);
    expect(text).not.toMatch(/\b(OOC|Beastars|Cherryton|Legoshi|Legosi|Haru|Louis|Seton|Zootopia|Greymane|Ardent|Hokage|chakra|Quirk|Pok[eé]mon)\b/i);
  });
});

describe('the catalogue checkpoint', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...steps.flatMap((s) => s.rewards.abilities),
      ...story.archetypes.flatMap((a) => a.startingAbilities),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.map((a) => a.id).sort()).toEqual(['read_the_old_order', 'teach_the_stand']);
    for (const a of gated) expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
  });

  it('writes every card blurb to the player', () => {
    for (const c of story.characters) expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
  });

  it('gives every location an inbound edge', () => {
    const inbound = new Set(story.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of story.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });

  it('points every connection, schedule, owner and takeable at something real', () => {
    for (const l of story.locations) {
      for (const c of l.connections) expect(locationIds.has(c.to), `${l.id} -> ${c.to}`).toBe(true);
      for (const t of l.takeableItems) {
        expect(itemIds.has(t.itemId), t.itemId).toBe(true);
        if (t.ownerId) expect(characterIds.has(t.ownerId), t.ownerId).toBe(true);
      }
    }
    for (const c of story.characters) {
      if (c.homeLocationId) expect(locationIds.has(c.homeLocationId), c.id).toBe(true);
      for (const block of c.schedule) expect(locationIds.has(block.locationId), `${c.id}@${block.startMinute}`).toBe(true);
    }
    expect(locationIds.has(story.rules.startingLocationId)).toBe(true);
    for (const i of story.rules.startingItems) expect(itemIds.has(i.itemId)).toBe(true);
  });

  it('points every quest, event, ending and archetype at something real', () => {
    for (const [where, p] of predicates) {
      if (p.atLocation) expect(locationIds.has(p.atLocation), where).toBe(true);
      for (const i of p.hasItems) expect(itemIds.has(i), `${where}: ${i}`).toBe(true);
      for (const r of p.minRelationship) expect(characterIds.has(r.characterId), where).toBe(true);
      for (const f of p.minFactionReputation) expect(factionIds.has(f.factionId), where).toBe(true);
      for (const flag of [...p.flagsSet, ...p.flagsUnset]) {
        const [prefix, id] = flag.split(':') as [string, string | undefined];
        if (id === undefined) continue;
        if (prefix === 'used') expect(abilityIds.has(id), `${where}: ${flag}`).toBe(true);
        if (['met', 'spoke', 'attacked', 'engaged'].includes(prefix)) expect(characterIds.has(id), `${where}: ${flag}`).toBe(true);
        if (prefix === 'visited') expect(locationIds.has(id), `${where}: ${flag}`).toBe(true);
        if (prefix === 'inspected') expect(itemIds.has(id), `${where}: ${flag}`).toBe(true);
      }
    }
    for (const s of steps) {
      for (const i of s.rewards.items) expect(itemIds.has(i.itemId), s.id).toBe(true);
      for (const a of s.rewards.abilities) expect(abilityIds.has(a), s.id).toBe(true);
      for (const r of s.rewards.reputation) expect(factionIds.has(r.factionId), s.id).toBe(true);
    }
    for (const e of story.worldEvents) {
      if (e.locationId) expect(locationIds.has(e.locationId), e.id).toBe(true);
      for (const m of e.movesCharacters) {
        expect(characterIds.has(m.characterId), e.id).toBe(true);
        expect(locationIds.has(m.toLocationId), e.id).toBe(true);
      }
    }
    for (const a of story.archetypes) {
      for (const i of a.startingItems) expect(itemIds.has(i.itemId), a.id).toBe(true);
      for (const s of Object.keys(a.skillProficiencies)) expect(skillIds.has(s), `${a.id}: ${s}`).toBe(true);
      for (const r of a.startingReputation) expect(factionIds.has(r.factionId), a.id).toBe(true);
    }
    for (const ab of story.abilities) {
      if (ab.check?.skillId) expect(skillIds.has(ab.check.skillId), ab.id).toBe(true);
    }
  });

  it('can set every flag anything waits on', () => {
    const waitedOn = [
      ...predicates.flatMap(([where, p]) => [...p.flagsSet, ...p.flagsUnset].map((f) => [where, f] as const)),
      ...story.worldEvents.flatMap((e) => [...e.requiresFlags, ...e.cancelledByFlags].map((f) => [e.id, f] as const)),
      ...story.abilities.flatMap((a) => (a.requires?.flagsSet ?? []).map((f) => [a.id, f] as const)),
      ...story.characters.flatMap((c) =>
        c.gates.flatMap((g) => [...g.requires.flagsSet, ...g.requires.flagsUnset].map((f) => [g.id, f] as const)),
      ),
    ];
    const orphans = waitedOn.filter(
      ([, f]) => !settable.has(f) && !ENGINE_FLAGS.has(f) && !ENGINE_PREFIXES.some((p) => f.startsWith(p)),
    );
    expect(orphans.map(([w, f]) => `${w}: ${f}`)).toEqual([]);
  });

  it('never uses a relationship gate id as a flag', () => {
    const gateIds = new Set(story.characters.flatMap((c) => c.gates.map((g) => g.id)));
    const all = [...settable, ...predicates.flatMap(([, p]) => p.flagsSet)];
    expect(all.filter((f) => gateIds.has(f))).toEqual([]);
  });

  it('describes every ability in a short line the card can show', () => {
    for (const a of story.abilities) {
      const effect = abilityEffect(story, a);
      expect(effect.length, `${a.id}: ${effect}`).toBeLessThan(120);
      expect(effect, a.id).toMatch(/rolls|always works/);
    }
  });

  it('draws every expression from the known set', () => {
    for (const c of story.characters) {
      for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    }
  });

  it('gives everybody a distinct short name, and the coach his surname', () => {
    const names = story.characters.map((c) => calledName(c));
    expect(new Set(names).size).toBe(names.length);
    expect(calledName(story.characters.find((c) => c.id === 'stagg')!)).toBe('Stagg');
  });

  it('derives every art key from the story id', () => {
    const derived = withDerivedAssetKeys(story);
    expect(story.id).toBe('sv_pack_rank_1');
    expect(story.storyId).toBe('story_pack_rank');
    expect(story.openingPanel?.assetKey).toBe('story_pack_rank/opening');
    expect(derived.coverImage).toBe('story_pack_rank/cover');
    expect(derived.keyArt).toBe('story_pack_rank/key');
    for (const l of derived.locations) expect(l.stageImage).toBe(`story_pack_rank/stage_${l.id}`);
    for (const c of derived.characters) expect(c.portrait).toBe(`story_pack_rank/${c.id}`);
  });
});

describe('the cast are people, not meters', () => {
  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.topics.length, c.id).toBeGreaterThan(0);
      expect(c.gates.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      expect(c.visualHook.length, c.id).toBeGreaterThan(20);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
    }
  });

  it('keeps six voices apart', () => {
    const vocab = (c: (typeof story.characters)[number]) =>
      new Set(c.voiceSamples.join(' ').toLowerCase().match(/[a-z’']{4,}/g) ?? []);
    const cast = story.characters;
    for (let i = 0; i < cast.length; i++) {
      for (let j = i + 1; j < cast.length; j++) {
        const a = vocab(cast[i]!);
        const b = vocab(cast[j]!);
        const shared = [...a].filter((w) => b.has(w)).length;
        const overlap = shared / Math.min(a.size, b.size);
        expect(overlap, `${cast[i]!.id} and ${cast[j]!.id} sound alike`).toBeLessThan(0.3);
      }
    }
  });

  it('gives Ruka a reason for the tray she will not say out loud', () => {
    const ruka = story.characters.find((c) => c.id === 'ruka')!;
    expect(ruka.secrets.map((s) => s.id)).toEqual(['ruka_the_roar', 'ruka_the_lifeline']);
    expect(ruka.secrets.every((s) => s.visibility === 'NPC_PRIVATE')).toBe(true);
  });
});

describe('refusing is a route, not a game over', () => {
  it('lets the player walk to the back of the line on the first beat', () => {
    const walk = routes.find((r) => r.routeId === 'walked_to_the_back')!;
    expect(walk.predicate.flagsSet).toEqual(['used:walk_away']);
    expect(story.abilities.find((a) => a.id === 'walk_away')!.check).toBeNull();
  });

  it('carries a refusal into the next step instead of stalling it', () => {
    const bout = steps.find((s) => s.id === 'the_first_bout')!;
    expect(bout.succeedWhenAny.some((r) => r.predicate.flagsSet.includes('refused_the_tray'))).toBe(true);
  });

  it('still leaves a way onto the wall that needs no fight', () => {
    const vouched = routes.find((r) => r.routeId === 'the_warren_vouched')!;
    expect(vouched.predicate.flagsSet.some((f) => f.startsWith('used:') || f.startsWith('attacked:'))).toBe(false);
  });

  it('makes losing the first bout a way onto the wall', () => {
    const lost = routes.find((r) => r.routeId === 'lost_to_her')!;
    expect(lost.setsFlags).toContain('ranked');
    expect(routes.find((r) => r.routeId === 'kept_the_first')!.predicate.flagsSet).toEqual(['ranked']);
  });
});

describe('the old name stays optional', () => {
  it('hides the lead behind a flag only a curious player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_the_old_order')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_old_name']);
  });

  it('never sets that flag from a world event everybody gets', () => {
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_old_name'));
    for (const event of sources) expect(event.requiresFlags.length, event.id).toBeGreaterThan(0);
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['the_truth_is_out', 'old_name_answered', 'knows:edda_marsh', 'lio_knows_about_his_father']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(9);
  });
});

describe('the ending space', () => {
  it('uses the whole rarity range and fits the storyteller’s window', () => {
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.length).toBeLessThanOrEqual(12);
    for (const e of story.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
    }
  });

  it('lets somebody take the last bus down, and reaches that early', () => {
    const leave = story.endings.find((e) => e.id === 'end_last_bus_down')!;
    expect(leave.requires.flagsSet).toContain('left_the_map');
    expect(leave.minTurn).toBeLessThanOrEqual(22);
  });

  it('can send the player home if the moon comes first', () => {
    const home = story.endings.find((e) => e.id === 'end_sent_home')!;
    expect(home.requires.flagsUnset).toContain('on_the_order');
    expect(story.worldEvents.some((e) => e.setsFlags.includes('moon_count_read') && e.requiresFlags.length === 0)).toBe(true);
  });

  it('fights the Moon Bout before the Order is read', () => {
    const bout = story.worldEvents.find((e) => e.id === 'we_the_moon_bout')!;
    const count = story.worldEvents.find((e) => e.id === 'we_the_moon_count')!;
    expect(bout.atWorldMinute).toBeLessThan(count.atWorldMinute);
    expect(count.atWorldMinute).toBeLessThan(7 * 1440);
  });

  it('can earn every faction standing anything asks for', () => {
    const ceiling = (factionId: string) => {
      const f = story.factions.find((x) => x.id === factionId)!;
      const fromQuests = steps
        .flatMap((s) => s.rewards.reputation)
        .filter((r) => r.factionId === factionId && r.amount > 0)
        .reduce((sum, r) => sum + r.amount, 0);
      const fromArchetype = Math.max(
        0,
        ...story.archetypes.flatMap((a) => a.startingReputation.filter((r) => r.factionId === factionId).map((r) => r.amount)),
      );
      return f.startingReputation + fromQuests + fromArchetype;
    };
    for (const [where, p] of predicates) {
      for (const need of p.minFactionReputation) {
        expect(ceiling(need.factionId), `${where}: ${need.factionId} ${need.value}`).toBeGreaterThanOrEqual(need.value);
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
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one thing rest can restore', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('spends legs rather than standing when a cost has no price on it', () => {
    const cheapest = [...story.resources]
      .filter((r) => r.polarity === 'GOOD_HIGH')
      .sort((a, b) => a.displayPriority - b.displayPriority)[0];
    expect(cheapest?.id).toBe('stamina');
  });

  it('puts the school’s fur up first when somebody fights outside the chalk', () => {
    // PUBLIC_VIOLENCE raises the first GOOD_LOW and drops the first faction.
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('hackles');
    expect(story.factions[0]?.id).toBe('faction_faculty');
  });

  it('drives every descending variable from something the player does', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raised = story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(raised, `${r.id} is inert`).toBe(true);
    }
  });
});

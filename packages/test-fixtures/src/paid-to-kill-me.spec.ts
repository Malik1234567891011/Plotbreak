import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent, locationForSchedule } from '@plotbreak/engine';
import { abilityEffect, archetypeGrants, calledName, knownExpression } from '@plotbreak/contracts';
import { withDerivedAssetKeys } from './derive-assets.js';
import { PAID_TO_KILL_ME as RAW } from './paid-to-kill-me.js';

/**
 * Paid to Kill Me, held to the rules every new world is held to, plus the ones
 * this world in particular can get wrong.
 *
 * It is not in `LAUNCH_CATALOG` yet, so nothing catalog-wide sees it. The
 * catalog and director checks that matter are ported here: no route nobody can
 * take, no flag nothing sets, no dangling reference, no orphan place, no
 * opening card the parser reads as a fight. Then the three checkpoint checks:
 * every gated ability is granted somewhere, every card blurb talks to "you",
 * and every location has a way in.
 *
 * And the two things specific to this world. Two attempts on one life by two
 * people who do not know about each other, so both culprits have to be in the
 * secrets the writer reads. And a deadline with a bell on it, so there has to
 * be more than one way to make the bell stop.
 */

const STORY = withDerivedAssetKeys(RAW);

const start = (archetypeId = 'arch_left') =>
  createInitialState({
    sessionId: 'sess_ptkm',
    story: STORY,
    identity: {
      displayName: 'Elena Moreau',
      pronouns: 'she/her',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];

function settable(): Set<string> {
  const flags = new Set<string>(['left_the_map']);
  for (const quest of STORY.quests) {
    for (const step of quest.steps) {
      for (const flag of step.rewards.flags) flags.add(flag);
      for (const route of step.succeedWhenAny) for (const flag of route.setsFlags) flags.add(flag);
    }
  }
  for (const event of STORY.worldEvents) for (const flag of event.setsFlags) flags.add(flag);
  return flags;
}

const canBeSet = (flag: string, flags: Set<string>) =>
  flags.has(flag) || ENGINE_PREFIXES.some((prefix) => flag.startsWith(prefix));

const words = (text: string) => text.split(/\s+/).filter(Boolean);

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) for (const v of value) allStrings(v, out);
  else if (value && typeof value === 'object') for (const v of Object.values(value)) allStrings(v, out);
  return out;
}

const corpus = allStrings(STORY).join('\n');

describe('identity and assets', () => {
  it('uses the story #43 identifiers', () => {
    expect(STORY.id).toBe('sv_paid_to_kill_me_1');
    expect(STORY.storyId).toBe('story_paid_to_kill_me');
    expect(STORY.title).toBe('Paid to Kill Me');
    expect(STORY.openingPanel?.assetKey).toBe('story_paid_to_kill_me/opening');
  });

  it('derives every asset key under the story prefix', () => {
    const keys = allStrings(STORY).filter((s) => /^story_[a-z0-9_]+\//.test(s));
    expect(keys.length).toBeGreaterThan(0);
    for (const key of keys) expect(key.startsWith('story_paid_to_kill_me/'), key).toBe(true);
  });

  it('keeps the gallery label inside the card', () => {
    expect(STORY.fantasyLabel.length).toBeLessThanOrEqual(42);
  });
});

describe('the prose', () => {
  it('has no literal backslash-n anywhere', () => {
    // A `\\n` inside a single-quoted string renders as two characters on the
    // phone, not a paragraph break.
    expect(corpus.includes('\\n')).toBe(false);
  });

  it('is English only', () => {
    expect(corpus).not.toMatch(/[぀-ヿ一-鿿가-힯Ѐ-ӿ]/);
    expect(corpus).not.toMatch(/\b(?:bonjour|merci|monsieur|madame|oui|senpai|sensei|-chan|-kun|-sama)\b/i);
  });

  it('writes a premise the brief can read', () => {
    const paragraphs = STORY.premise.split('\n\n');
    expect(words(STORY.premise).length).toBeGreaterThanOrEqual(120);
    expect(words(STORY.premise).length).toBeLessThanOrEqual(250);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p).length, p.slice(0, 40)).toBeLessThanOrEqual(70);
  });
});

describe('the opener', () => {
  const opening = STORY.opening;
  const tokens = words(opening);

  it('is at most 120 words', () => {
    expect(tokens.length).toBeLessThanOrEqual(120);
    expect(tokens.length).toBeGreaterThanOrEqual(50);
  });

  it('has a named character speak within the first 60 words', () => {
    const first60 = tokens.slice(0, 60);
    const named = first60.findIndex((w) => w.replace(/[^A-Za-z]/g, '') === 'Kael');
    const speaks = first60.findIndex((w) => w.startsWith('"'));
    expect(named, 'Kael is not named in the first 60 words').toBeGreaterThanOrEqual(0);
    expect(speaks, 'nobody speaks in the first 60 words').toBeGreaterThan(named);
  });

  it('ends on a direct question', () => {
    expect(opening.trim()).toMatch(/\?["”]?$/);
  });

  it('uses no proper noun the player must already know', () => {
    // Kael is introduced as "your new bodyguard" in the same sentence. Every
    // other capital is the start of a sentence or of a line of dialogue.
    const allowed = new Set(['Kael', 'I']);
    const unknown: string[] = [];
    tokens.forEach((token, i) => {
      const bare = token.replace(/^["“(]+/, '').replace(/[^A-Za-z’']+$/, '');
      if (!/^[A-Z]/.test(bare)) return;
      const prev = tokens[i - 1];
      const sentenceStart = i === 0 || /^["“]/.test(token) || (prev !== undefined && /[.!?]["”]?$/.test(prev));
      if (sentenceStart) return;
      if (!allowed.has(bare.replace(/[’'].*$/, ''))) unknown.push(bare);
    });
    expect(unknown).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = STORY.openingSuggestions;
    expect(STORY.openingSuggestions).toHaveLength(3);
    expect(said).toMatch(/^"/);
    expect(done).toMatch(/^I /);
    expect(risky).toMatch(/^I /);
    expect(risky).toMatch(/knife/);
    expect(new Set(STORY.openingSuggestions).size).toBe(3);
    for (const s of STORY.openingSuggestions) {
      expect(s).toMatch(/\bI\b/);
      expect(s.length).toBeLessThanOrEqual(320);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    const violent: string[] = [];
    for (const card of STORY.openingSuggestions) {
      const intent = await parser.parse(card, { story: STORY, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card);
    }
    expect(violent).toEqual([]);
  });
});

describe('adults only', () => {
  const AGES: Record<string, [number, string]> = {
    kael: [27, 'Twenty-seven'],
    viktor: [54, 'Fifty-four'],
    ines: [26, 'Twenty-six'],
    sato: [63, 'Sixty-three'],
    vesna: [31, 'Thirty-one'],
    pell: [68, 'Sixty-eight'],
  };

  it('states an adult age for every character', () => {
    expect(STORY.characters.map((c) => c.id).sort()).toEqual(Object.keys(AGES).sort());
    for (const c of STORY.characters) {
      const [age, word] = AGES[c.id]!;
      expect(age).toBeGreaterThanOrEqual(18);
      expect(c.appearance.startsWith(word), `${c.id} appearance does not open on the age`).toBe(true);
    }
  });

  it('uses no word that reads as a minor', () => {
    expect(corpus).not.toMatch(
      /\b(?:teens?|teenage[rd]?s?|child|children|childlike|kids?|schoolgirls?|schoolboys?|school|minors?|underage|juvenile|loli|boys?|girls?|little (?:boy|girl))\b/i,
    );
  });

  it('puts the backstory at a post-secondary college', () => {
    expect(corpus).toMatch(/\bcollege\b/);
  });
});

describe('13+ content', () => {
  it('has no sexual content, nudity, gore or self-harm', () => {
    // The tone guide is the one place allowed to name these, because it is
    // where the writer is told not to do them.
    const story = allStrings({ ...STORY, rules: { ...STORY.rules, toneGuide: '' } }).join('\n');
    expect(STORY.rules.toneGuide).toMatch(/Never sexual/);
    expect(story).not.toMatch(
      /\b(?:nude|naked|nudity|sex|sexual|sexy|undress\w*|lingerie|breasts?|gore|gory|entrails|disembowel\w*|suicid\w*|self-harm|overdose|blood-soaked)\b/i,
    );
  });

  it('caps the romance at a kiss and says so', () => {
    expect(STORY.rules.toneGuide).toMatch(/as far as a kiss/);
    // The player-first brief overrides the tone guide; only hard canon survives it.
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/no further than a kiss/);
    expect(STORY.contentDescriptors).toContain('ROMANCE');
    expect(STORY.intensity).toBe('MODERATE');
  });

  it('never lets the grandmother’s death read as one she chose', () => {
    const letter = STORY.items.find((i) => i.id === 'odile_letter')!;
    expect(letter.loreText).not.toMatch(/could not live|I am sorry/);
    expect(corpus).not.toMatch(/could not live with/);
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/gap in Odile’s row of pill bottles is the bottle Viktor took/);
  });
});

describe('what the production narrator can read', () => {
  // runTurnPure sends hard canon, the cast (socialStyle, hiddenDrives,
  // secrets), location descriptions and quest items only. Quest step
  // directorNotes and promises never reach it.
  it('puts the daybook entry where the narrator reads it', () => {
    const suite = STORY.locations.find((l) => l.id === 'odile_suite')!;
    const daybook = STORY.items.find((i) => i.id === 'odile_daybook')!;
    expect(suite.description).toMatch(/M\.S\. 11 pm\. Told her\. All of it\./);
    expect(daybook.questItem).toBe(true);
  });

  it('tells the narrator what Kael does if he is thrown out on turn one', () => {
    const kael = STORY.characters.find((c) => c.id === 'kael')!;
    expect(kael.socialStyle).toMatch(/roof across the road/);
    expect(kael.socialStyle).toMatch(/takes the knife/);
  });

  it('gives the client a motive that killing the heir actually serves', () => {
    const sato = STORY.characters.find((c) => c.id === 'sato')!;
    expect(sato.hiddenDrives.join(' ')).not.toMatch(/end the Ravelle line/);
    expect(sato.hiddenDrives.join(' ')).toMatch(/loved most/);
  });
});

describe('original', () => {
  it('borrows no franchise term or title', () => {
    expect(corpus).not.toMatch(
      /\b(?:quirk|chakra|hokage|shinobi|nen|hunter association|continental|high table|excommunicado|status window|system window|bankai|zanpakuto|devil fruit|jujutsu|cursed energy|hogwarts|death note|thorn princess|the hero who came)\b/i,
    );
    expect(STORY.title).not.toMatch(/hero/i);
  });
});

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set<string>([
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
      ...STORY.archetypes.flatMap((a) => a.startingAbilities),
    ]);
    const gated = STORY.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length).toBeGreaterThan(0);
    for (const ability of gated) expect(granted.has(ability.id), `${ability.id} is never granted`).toBe(true);
  });

  it('puts "you" in every card blurb', () => {
    for (const c of STORY.characters) {
      expect(c.cardBlurb, c.id).toMatch(/\byou\b/i);
      expect(c.cardBlurb.length).toBeGreaterThan(20);
      expect(c.cardBlurb).not.toBe(c.role);
    }
  });

  it('gives every location an inbound edge', () => {
    const inbound = new Set(STORY.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of STORY.locations) expect(inbound.has(l.id), `${l.id} has no way in`).toBe(true);
  });
});

describe('nothing points at nothing', () => {
  const locations = new Set(STORY.locations.map((l) => l.id));
  const characters = new Set(STORY.characters.map((c) => c.id));
  const items = new Set(STORY.items.map((i) => i.id));
  const factions = new Set(STORY.factions.map((f) => f.id));
  const abilities = new Set(STORY.abilities.map((a) => a.id));
  const skills = new Set(STORY.skills.map((s) => s.id));

  it('connects only real places', () => {
    expect(locations.has(STORY.rules.startingLocationId)).toBe(true);
    for (const l of STORY.locations) for (const c of l.connections) expect(locations.has(c.to), `${l.id} -> ${c.to}`).toBe(true);
  });

  it('schedules and homes everybody somewhere real', () => {
    for (const c of STORY.characters) {
      expect(locations.has(c.homeLocationId!), `${c.id} home`).toBe(true);
      for (const block of c.schedule) expect(locations.has(block.locationId), `${c.id} ${block.activity}`).toBe(true);
    }
  });

  it('keeps takeable items real and owned by real people', () => {
    for (const l of STORY.locations) {
      for (const t of l.takeableItems) {
        expect(items.has(t.itemId), t.itemId).toBe(true);
        if (t.ownerId) expect(characters.has(t.ownerId), t.ownerId).toBe(true);
      }
    }
    expect(STORY.rules.startingItems.length).toBeGreaterThan(0);
    for (const s of STORY.rules.startingItems) expect(items.has(s.itemId)).toBe(true);
  });

  it('references only real things from quests, events, endings and archetypes', () => {
    for (const q of STORY.quests) {
      for (const id of q.involvedCharacterIds) expect(characters.has(id), `${q.id} ${id}`).toBe(true);
      for (const id of q.involvedLocationIds) expect(locations.has(id), `${q.id} ${id}`).toBe(true);
      for (const s of q.steps) {
        for (const r of s.rewards.items) expect(items.has(r.itemId)).toBe(true);
        for (const a of s.rewards.abilities) expect(abilities.has(a)).toBe(true);
        for (const r of s.rewards.reputation) expect(factions.has(r.factionId)).toBe(true);
        for (const route of s.succeedWhenAny) {
          const p = route.predicate;
          if (p.atLocation) expect(locations.has(p.atLocation), route.routeId).toBe(true);
          for (const i of p.hasItems) expect(items.has(i), route.routeId).toBe(true);
          for (const m of p.minRelationship) expect(characters.has(m.characterId), route.routeId).toBe(true);
          for (const m of p.minFactionReputation) expect(factions.has(m.factionId), route.routeId).toBe(true);
        }
      }
    }
    for (const e of STORY.worldEvents) {
      if (e.locationId) expect(locations.has(e.locationId), e.id).toBe(true);
      for (const m of e.movesCharacters) {
        expect(characters.has(m.characterId), e.id).toBe(true);
        expect(locations.has(m.toLocationId), e.id).toBe(true);
      }
    }
    for (const e of STORY.endings) {
      for (const m of e.requires.minRelationship) expect(characters.has(m.characterId), e.id).toBe(true);
      for (const m of e.requires.minFactionReputation) expect(factions.has(m.factionId), e.id).toBe(true);
    }
    for (const a of STORY.archetypes) {
      for (const s of Object.keys(a.skillProficiencies)) expect(skills.has(s), `${a.id} ${s}`).toBe(true);
      for (const i of a.startingItems) expect(items.has(i.itemId)).toBe(true);
      for (const r of a.startingReputation) expect(factions.has(r.factionId)).toBe(true);
    }
    for (const ab of STORY.abilities) if (ab.check?.skillId) expect(skills.has(ab.check.skillId), ab.id).toBe(true);
    for (const o of STORY.openingObligations) expect(characters.has(o.withCharacterId ?? '')).toBe(true);
  });

  it('can reach every place from the start, locks aside', () => {
    const seen = new Set([STORY.rules.startingLocationId]);
    const queue = [STORY.rules.startingLocationId];
    while (queue.length) {
      const id = queue.shift();
      const here = STORY.locations.find((l) => l.id === id)!;
      for (const c of here.connections) if (!seen.has(c.to)) (seen.add(c.to), queue.push(c.to));
    }
    expect([...locations].filter((l) => !seen.has(l))).toEqual([]);
  });
});

describe('every route someone can take', () => {
  const flags = settable();
  const obtainable = new Set<string>([
    ...STORY.rules.startingItems.map((i) => i.itemId),
    ...STORY.locations.flatMap((l) => l.takeableItems.map((t) => t.itemId)),
    ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.items.map((i) => i.itemId))),
    ...STORY.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
  ]);
  const usable = new Set<string>([
    ...STORY.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
    ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ...STORY.archetypes.flatMap((a) => a.startingAbilities),
  ]);

  it('has plenty of routes, and some of them close others', () => {
    const routes = STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny));
    expect(routes.length).toBeGreaterThanOrEqual(3);
    expect(routes.some((r) => r.closesFlags.length > 0)).toBe(true);
  });

  it('only asks for abilities the player can have and items the player can get', () => {
    for (const q of STORY.quests) {
      for (const s of q.steps) {
        for (const r of s.succeedWhenAny) {
          for (const f of r.predicate.flagsSet) {
            if (f.startsWith('used:')) expect(usable.has(f.slice(5)), `${r.routeId} needs ${f}`).toBe(true);
          }
          for (const i of r.predicate.hasItems) expect(obtainable.has(i), `${r.routeId} needs ${i}`).toBe(true);
          for (const i of r.predicate.hasItems) {
            expect(s.rewards.items.map((x) => x.itemId), `${s.id} demands the item it rewards`).not.toContain(i);
          }
        }
      }
    }
  });

  it('never waits on a flag nothing can set', () => {
    const needed: Array<[string, string]> = [];
    for (const q of STORY.quests) {
      if (q.discoverWhen) for (const f of q.discoverWhen.flagsSet) needed.push([q.id, f]);
      for (const s of q.steps) {
        if (s.enterWhen) for (const f of s.enterWhen.flagsSet) needed.push([s.id, f]);
        for (const r of s.succeedWhenAny) {
          for (const f of r.predicate.flagsSet) needed.push([r.routeId, f]);
          for (const f of r.closesFlags) needed.push([r.routeId, f]);
        }
      }
    }
    for (const e of STORY.worldEvents) {
      for (const f of e.requiresFlags) needed.push([e.id, f]);
      for (const f of e.cancelledByFlags) needed.push([e.id, f]);
    }
    for (const e of STORY.endings) for (const f of e.requires.flagsSet) needed.push([e.id, f]);
    for (const c of STORY.characters) for (const g of c.gates) for (const f of g.requires.flagsSet ?? []) needed.push([g.id, f]);
    for (const l of STORY.locations) for (const c of l.connections) if (c.lockedByFlag) needed.push([`${l.id}->${c.to}`, c.lockedByFlag]);
    for (const a of STORY.abilities) for (const f of a.requires?.flagsSet ?? []) needed.push([a.id, f]);

    const dead = needed.filter(([, f]) => !canBeSet(f, flags)).map(([where, f]) => `${where}: ${f}`);
    expect(dead).toEqual([]);
  });

  it('gives each archetype something real', () => {
    for (const a of STORY.archetypes) {
      const g = archetypeGrants(STORY, a);
      expect(g.skills.length + g.items.length + g.abilities.length, a.id).toBeGreaterThan(0);
      expect(a.name).not.toMatch(/—/);
    }
    const styles = STORY.archetypes.map((a) => [...a.playstyle].sort().join('|'));
    expect(new Set(styles).size).toBe(styles.length);
  });
});

describe('the clarity standard', () => {
  it('passes narrative clarity with no errors', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(STORY);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const premise = checkNarrativeClarity(STORY.premise, { story: STORY, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
  });

  it('passes choice clarity with no errors', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(STORY);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`)).toEqual([]);
    const field = STORY.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);
  });

  it('describes every ability in one short line', () => {
    for (const ability of STORY.abilities) {
      const effect = abilityEffect(STORY, ability);
      expect(effect.length, `${ability.id}: ${effect}`).toBeLessThan(120);
      expect(effect).toMatch(/rolls |always works/);
      expect(effect).toMatch(/costs /);
    }
  });

  it('sends the writer no more than twelve endings', () => {
    expect(STORY.endings.length).toBeLessThanOrEqual(12);
    expect(STORY.promises.length).toBeGreaterThanOrEqual(3);
    expect(STORY.characters.length).toBeGreaterThanOrEqual(3);
  });
});

describe('the cast', () => {
  it('uses expressions the generator draws', () => {
    const unknown = STORY.characters.flatMap((c) => c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}: ${e}`));
    expect(unknown).toEqual([]);
  });

  it('gives no two characters the same short name', () => {
    const names = STORY.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('gives everybody fears, values, drives, boundaries, goals and a voice', () => {
    for (const c of STORY.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(3);
      expect(c.speechStyle.length, c.id).toBeGreaterThan(60);
      for (const s of c.secrets) expect(s.revealHint.length, s.id).toBeGreaterThan(10);
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
    const vocab = new Map(STORY.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of STORY.characters) {
      for (const b of STORY.characters) {
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
      const users = STORY.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });
});

describe('turn one', () => {
  it('starts in your room at twenty to seven on Tuesday', () => {
    expect(STORY.rules.startingLocationId).toBe('your_bedroom');
    expect(STORY.rules.startWorldMinute).toBe(6 * 60 + 40);
  });

  it('has Kael in the chair', () => {
    expect(charactersPresent(start()).map((c) => c.characterId)).toContain('kael');
  });

  it('does not let anybody else wander into the bedroom', () => {
    for (const c of STORY.characters) {
      const placed = locationForSchedule(c.schedule, STORY.rules.startWorldMinute) ?? c.homeLocationId;
      expect(placed, `${c.id} is nowhere at the start`).not.toBeNull();
      if (c.id === 'kael') continue;
      expect(placed, `${c.id} arrives in the opening scene`).not.toBe(STORY.rules.startingLocationId);
      expect(c.homeLocationId).not.toBe(STORY.rules.startingLocationId);
    }
  });

  it('owes the player a signing on Friday at ten', () => {
    const due = STORY.rules.startWorldMinute + STORY.openingObligations[0]!.dueInMinutes;
    expect(due).toBe(3 * 1440 + 10 * 60);
    expect(STORY.worldEvents.find((e) => e.id === 'we_the_signing')!.atWorldMinute).toBe(due);
  });
});

describe('two attempts, two culprits', () => {
  it('puts the poisoner and the client in the secrets the writer reads', () => {
    const fact = (id: string, secret: string) =>
      STORY.characters.find((c) => c.id === id)!.secrets.find((s) => s.id === secret)!.fact;
    expect(fact('viktor', 'viktor_the_glass')).toMatch(/heart tablets/);
    expect(fact('sato', 'sato_the_client')).toMatch(/She is the client/);
    expect(STORY.rules.hardCanon.join(' ')).toMatch(/neither knows about the other/);
  });

  it('can solve each attempt without the other', () => {
    const glass = STORY.quests.find((q) => q.id === 'q_the_poisoner')!;
    const client = STORY.quests.find((q) => q.id === 'q_the_client')!;
    expect(glass.discoverWhen!.flagsSet).not.toContain('client_named');
    expect(client.discoverWhen!.flagsSet).not.toContain('poisoner_named');
  });

  it('offers three ways into the glass and three ways to the client', () => {
    const steps = STORY.quests.flatMap((q) => q.steps);
    expect(steps.find((s) => s.id === 'the_glass')!.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
    expect(steps.find((s) => s.id === 'name_the_client')!.succeedWhenAny.length).toBeGreaterThanOrEqual(3);
  });
});

describe('the bell', () => {
  it('has four ways to make it stop', () => {
    const step = STORY.quests.find((q) => q.id === 'q_the_bell')!.steps[0]!;
    expect(step.succeedWhenAny.map((r) => r.routeId).sort()).toEqual(
      ['bought_it_out', 'client_cancelled', 'faked_it', 'stopped_vesna'].sort(),
    );
  });

  it('stops ringing whichever way it was silenced', () => {
    const rings = STORY.worldEvents.find((e) => e.id === 'we_the_bell_rings')!;
    for (const flag of ['the_bell_is_quiet', 'faked_your_death', 'contract_cancelled', 'contract_bought_out', 'vesna_beaten']) {
      expect(rings.cancelledByFlags).toContain(flag);
    }
  });
});

describe('endings', () => {
  it('lets the player walk away early', () => {
    const walk = STORY.endings.find((e) => e.requires.flagsSet.includes('left_the_map'));
    expect(walk).toBeDefined();
    expect(walk!.minTurn).toBeLessThanOrEqual(22);
  });

  it('spreads across at least four rarities', () => {
    expect(new Set(STORY.endings.map((e) => e.rarity)).size).toBeGreaterThanOrEqual(4);
  });

  it('never gates on standing nothing can earn', () => {
    const earned = new Map(STORY.factions.map((f) => [f.id, f.startingReputation]));
    for (const a of STORY.archetypes) {
      for (const entry of a.startingReputation) {
        const base = STORY.factions.find((f) => f.id === entry.factionId)!.startingReputation;
        earned.set(entry.factionId, Math.max(earned.get(entry.factionId)!, base + entry.amount));
      }
    }
    for (const q of STORY.quests) {
      for (const s of q.steps) {
        for (const r of s.rewards.reputation) earned.set(r.factionId, (earned.get(r.factionId) ?? 0) + r.amount);
      }
    }
    const gates = [
      ...STORY.endings.flatMap((e) => e.requires.minFactionReputation),
      ...STORY.quests.flatMap((q) => q.steps.flatMap((s) => s.succeedWhenAny.flatMap((r) => r.predicate.minFactionReputation))),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const g of gates) expect(earned.get(g.factionId)!, `${g.factionId} needs ${g.value}`).toBeGreaterThanOrEqual(g.value);
    for (const f of STORY.factions) {
      expect(f.ranks.length).toBeGreaterThanOrEqual(3);
      expect(Math.max(...f.ranks.map((r) => r.atReputation))).toBeGreaterThan(f.startingReputation);
    }
  });
});

describe('the three invisible pressures', () => {
  it('has three banded, invisible resources', () => {
    expect(STORY.resources).toHaveLength(3);
    for (const r of STORY.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      for (const b of r.bands) {
        expect(b.behaviour.length).toBeGreaterThan(80);
        expect(b.behaviour).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('has exactly one resource that rest refills, and it is composure', () => {
    expect(STORY.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['composure']);
  });

  it('sends a fight to exposure first and to the board first', () => {
    expect(STORY.resources.find((r) => r.polarity === 'GOOD_LOW')!.id).toBe('exposure');
    expect(STORY.factions[0]!.id).toBe('faction_board');
  });

  it('drives every descending pressure with an ability', () => {
    for (const r of STORY.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const drivers = STORY.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id && c.amount > 0));
      expect(drivers.length, `${r.id} has nothing that raises it`).toBeGreaterThan(0);
    }
  });
});

/** docs/stories-50/PIPELINE.md, "What the 49 writers need in the fixture". */
describe('the art and release pipeline', () => {
  it('directs its own cover, with a title line that spells the title', () => {
    const direction = STORY.coverDirection;
    const title = direction.slice(direction.indexOf('TITLE:'));
    expect(direction).toMatch(/\bTITLE:/);
    expect(title).toContain('Paid to Kill Me');
    expect(title).toMatch(/upper third/);
  });

  it('keeps cover effects off his face and describes nobody by age', () => {
    expect(STORY.coverDirection).toMatch(/FACE STAYS CLEAN/);
    expect(STORY.coverDirection).not.toMatch(
      /\b(?:young\w*|older|elderly|aged|adults?|twenty|thirty|forty|fifty|sixty|seventy|years? old|teen\w*|\d+)\b/i,
    );
  });

  it('opens on a panel of the man who speaks first', () => {
    expect(STORY.openingPanel!.alt.length).toBeLessThanOrEqual(200);
    expect(STORY.openingPanel!.alt.startsWith('Kael ')).toBe(true);
    expect(STORY.opening.slice(0, STORY.opening.indexOf('"'))).toContain('Kael');
  });

  it('draws every portrait from a concrete appearance', () => {
    for (const c of STORY.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.length, c.id).toBeGreaterThan(80);
    }
  });

  it('has no prologue and no release date yet', () => {
    expect(STORY.prologue).toEqual([]);
    expect(STORY.publishedAt).toBeNull();
  });

  it('puts the system where the narrator reads it', () => {
    const letter = STORY.items.find((i) => i.id === 'odile_letter')!;
    expect(STORY.rules.startingItems.map((i) => i.itemId)).toContain('odile_letter');
    expect(letter.questItem).toBe(true);
    for (const a of STORY.archetypes) {
      expect(a.startingAbilities.length, a.id).toBeGreaterThan(0);
      for (const id of a.startingAbilities) {
        expect(STORY.abilities.find((x) => x.id === id)?.unlockedByDefault, `${a.id}: ${id}`).toBe(true);
      }
    }
    const canon = STORY.rules.hardCanon.join(' ');
    expect(canon).toMatch(/rule four/);
    expect(canon).toMatch(/made to look dead/);
    expect(canon).toMatch(/by lunchtime/);
    expect(STORY.rules.toneGuide.length).toBeGreaterThan(200);
  });

  it('gives every titled character the name people call them', () => {
    for (const c of STORY.characters.filter((x) => /^(?:Lady|Lord|Dr\.|Sir)\s/.test(x.name))) {
      expect(c.calledName, c.id).toBeTruthy();
    }
    expect(calledName(STORY.characters.find((c) => c.id === 'ines')!)).toBe('Ines');
  });
});

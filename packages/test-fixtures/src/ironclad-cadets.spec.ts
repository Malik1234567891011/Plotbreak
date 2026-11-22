import { describe, expect, it } from 'vitest';
import { charactersPresent, createInitialState } from '@plotbreak/engine';
import type { StoryVersion } from '@plotbreak/contracts';
import { IRONCLAD_CADETS } from './ironclad-cadets.js';
import { withDerivedAssetKeys } from './derive-assets.js';

/**
 * Unit Nine (working title Ironclad Cadets, which the ids keep), held to the
 * promise on its own card: the suit is scrap at six and it asked you to stay,
 * and everything after that is the player's to decide.
 *
 * This world is not in LAUNCH_CATALOG yet, so none of the catalog-wide specs
 * see it. The structural checks they would run are ported here for this one
 * story, alongside the checks that are specific to it: the opener contract,
 * the adults-only cast, the 13+ ceiling, and the three checkpoint checks every
 * new world in the fifty-story slate carries.
 */

const story: StoryVersion = IRONCLAD_CADETS;

const identity = (archetypeId: string | null = 'arch_garage') => ({
  displayName: 'Rook Adeyemi',
  pronouns: 'they/them',
  ageBand: null,
  archetypeId,
  worldKnowsAboutYou: '',
  advanced: {},
  portraitAssetId: null,
});

const start = (archetypeId: string | null = 'arch_garage') =>
  createInitialState({ sessionId: 'sess_ironclad', story, identity: identity(archetypeId) });

const steps = story.quests.flatMap((quest) => quest.steps.map((step) => ({ quest: quest.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);
const words = (text: string): number => text.trim().split(/\s+/).length;

/** Everything a player can read, in one string, for the content sweeps. */
const playerFacing = (): string =>
  [
    story.title,
    story.fantasyLabel,
    story.hook,
    story.premise,
    story.creatorNote,
    story.opening,
    story.openingPanel?.alt ?? '',
    ...story.openingSuggestions,
    ...story.rules.hardCanon,
    story.rules.toneGuide,
    ...story.rules.styleExamples,
    ...story.items.flatMap((i) => [i.name, i.description, i.loreText]),
    ...story.abilities.flatMap((a) => [a.name, a.description, a.requires?.lockedCopy ?? '']),
    ...story.locations.flatMap((l) => [l.name, l.description, l.artDirection]),
    ...story.factions.flatMap((f) => [f.name, f.description]),
    ...story.characters.flatMap((c) => [
      c.name,
      c.role,
      c.cardBlurb,
      c.appearance,
      c.visualHook,
      c.silhouette,
      c.speechStyle,
      c.socialStyle,
      ...c.voiceSamples,
      ...c.publicTraits,
      ...c.hiddenDrives,
      ...c.secrets.flatMap((s) => [s.fact, s.revealHint]),
    ]),
    ...story.quests.flatMap((q) => [
      q.title,
      q.summary,
      ...q.steps.flatMap((s) => [s.playerCopy, s.directorNotes, ...s.succeedWhenAny.map((r) => r.label)]),
    ]),
    ...story.worldEvents.flatMap((e) => [e.publicCopy, e.directorNotes]),
    ...story.promises.flatMap((p) => [p.label, p.seedHint, p.payoffHint]),
    ...story.archetypes.flatMap((a) => [a.name, a.role, a.summary, a.blurb]),
    ...story.endings.flatMap((e) => [e.name, e.condition, e.epilogue, e.hint]),
    story.coverDirection,
  ].join('\n');

describe('the three checkpoint checks', () => {
  it('grants every gated ability somewhere', () => {
    const granted = new Set([
      ...story.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...story.archetypes.flatMap((a) => a.startingAbilities),
      ...story.quests.flatMap((q) => q.steps.flatMap((s) => s.rewards.abilities)),
    ]);
    const gated = story.abilities.filter((a) => !a.unlockedByDefault);
    expect(gated.length, 'no gated abilities at all').toBeGreaterThan(0);
    for (const ability of gated) {
      expect(granted.has(ability.id), `${ability.id} is gated and nothing grants it`).toBe(true);
    }
  });

  it('says "you" in every card blurb', () => {
    for (const c of story.characters) {
      expect(/\byou\b/i.test(c.cardBlurb), `${c.id}: "${c.cardBlurb}"`).toBe(true);
    }
  });

  it('gives every location an inbound edge', () => {
    for (const l of story.locations) {
      const inbound = story.locations.some((other) => other.connections.some((c) => c.to === l.id));
      expect(inbound, `${l.id} has no way in`).toBe(true);
    }
  });
});

describe('the opener', () => {
  it('is short enough to read on one screen', () => {
    expect(words(story.opening)).toBeGreaterThanOrEqual(50);
    expect(words(story.opening)).toBeLessThanOrEqual(120);
  });

  it('has a named character speaking inside the first sixty words', () => {
    const first60 = story.opening.trim().split(/\s+/).slice(0, 60).join(' ');
    expect(first60).toMatch(/"[^"]+"/);
    const named = story.characters.filter((c) => c.pronouns !== 'it/its');
    expect(named.some((c) => first60.includes(c.name) || first60.includes(c.calledName ?? c.name))).toBe(true);
  });

  it('ends on a direct question to the player', () => {
    expect(story.opening.trim()).toMatch(/\?["”]?$/);
  });

  it('names nothing the player would have to know already', () => {
    const worldTerms = [
      'Unit Nine',
      'Pip',
      'Gullwater',
      'Northgate',
      'Trials',
      'Board',
      'Seawall',
      'rustback',
      'Ruiz',
      'Graf',
      'Haldor',
      ...story.locations.map((l) => l.name),
      ...story.factions.map((f) => f.name),
      ...story.items.map((i) => i.name),
    ];
    for (const term of worldTerms) {
      expect(story.opening.includes(term), `opening leans on "${term}"`).toBe(false);
    }
  });

  it('offers one thing to say, one thing to do, and one risk', () => {
    const [said, done, risky] = story.openingSuggestions;
    expect(story.openingSuggestions.length).toBe(3);
    expect(new Set(story.openingSuggestions).size).toBe(3);
    expect(said, 'the first card is speech').toMatch(/^"/);
    expect(done, 'the second card is an action').not.toMatch(/"/);
    expect(risky, 'the third card takes the controls').toMatch(/controls/);
    for (const s of story.openingSuggestions) {
      expect(s.length).toBeLessThanOrEqual(320);
      expect(s, s).toMatch(/\bI\b/);
      expect(s).not.toMatch(/^(Ask|Tell|Go|Check|Talk|Look|Climb|Enter|Get) /);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start(story.archetypes[0]?.id ?? null);
    const violent: string[] = [];
    for (const card of story.openingSuggestions) {
      const intent = await parser.parse(card, { story, state, intentId: 'intent_card_probe', addressee: null });
      if (intent.actions.some((a) => a.verb === 'attack')) violent.push(card.slice(0, 70));
    }
    expect(violent, `these cards parse as an attack: ${violent.join(' | ')}`).toEqual([]);
  });

  it('asks for its own opening panel', () => {
    expect(story.openingPanel?.assetKey).toBe('story_ironclad_cadets/opening');
    expect((story.openingPanel?.alt ?? '').length).toBeLessThanOrEqual(200);
    // The panel is drawn with the first-named character's portrait as reference,
    // so it has to be the one who speaks in the opener.
    expect(story.openingPanel?.alt.startsWith('Kaede ')).toBe(true);
  });
});

describe('everybody is an adult', () => {
  const AGES: Record<string, number> = { kaede: 22, tova: 23, haldor: 22, ruiz: 52, graf: 58 };
  const NUMBER_WORDS: Record<number, string> = {
    22: 'twenty-two',
    23: 'twenty-three',
    52: 'fifty-two',
    58: 'fifty-eight',
  };

  it('states every human age in hard canon, and every one is eighteen or over', () => {
    const canon = story.rules.hardCanon.join(' ');
    for (const c of story.characters) {
      if (c.pronouns === 'it/its') continue;
      const age = AGES[c.id];
      expect(age, `${c.id} has no stated age`).toBeDefined();
      expect(age!, c.id).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toMatch(new RegExp(`${c.name} (is )?${NUMBER_WORDS[age!]!}\\b`));
    }
  });

  it('draws people as adults by costume, never by an age number (the art is painted from appearance)', () => {
    for (const c of story.characters) {
      if (c.pronouns === 'it/its') continue;
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (woman|man),/);
      expect(c.appearance, c.id).not.toMatch(/\b(twenty|thirty|forty|fifty|sixty)\b|\d/i);
    }
  });

  it('writes the machine as an adult voice with a long service record', () => {
    const pip = story.characters.find((c) => c.id === 'pip')!;
    expect(pip.pronouns).toBe('it/its');
    expect(pip.role).toMatch(/twenty-three years in service/);
  });

  it('says so in hard canon, and puts the player at twenty-one', () => {
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/Everybody at the academy is an adult/);
    expect(canon).toMatch(/twenty-one-year-old/);
    expect(canon).toMatch(/eighteen or older/);
    // The one named character who never appears on stage still has an age.
    expect(canon).toMatch(/Paz Ruiz, who was thirty/);
  });

  it('uses no word that reads a character as a minor', () => {
    const MINOR =
      /\b(kid|kids|child|children|childlike|teen|teens|teenage|teenager|boy|boys|girl|girls|minor|minors|underage|schoolgirl|schoolboy|high school|middle school|loli|little sister|little brother|young|adolescent|adolescents|juvenile|juveniles|youth|youths|youngster|youngsters|freshman|freshmen|sophomore|sophomores|preteen|preteens|tween|tweens)\b/i;
    const hit = playerFacing().match(MINOR);
    expect(hit?.[0] ?? null).toBeNull();
  });
});

describe('the 13+ ceiling', () => {
  it('caps romance at a kiss in the tone guide', () => {
    expect(story.rules.toneGuide).toMatch(/up to a kiss and no further/);
    expect(story.rules.toneGuide).toMatch(/nobody is ever described by their body/);
  });

  it('has no sexual content, nudity, gore or self-harm anywhere', () => {
    const BANNED =
      /\b(sex|sexy|sexual|naked|nude|nudity|undress\w*|lingerie|breasts?|cleavage|thighs?|curves|seduc\w*|aroused|bedroom eyes|gore|gory|entrails|disembowel\w*|decapitat\w*|dismember\w*|blood\w*|bleed\w*|corpses?|suicide|suicidal|self-harm|slit (?:her|his|their) wrists?)\b/i;
    const hit = playerFacing().match(BANNED);
    expect(hit?.[0] ?? null).toBeNull();
  });

  it('keeps the content descriptors honest about what is in it', () => {
    expect(story.contentDescriptors).toEqual(
      expect.arrayContaining(['FANTASY_VIOLENCE', 'ROMANCE', 'PSYCHOLOGICAL_THEMES']),
    );
    expect(story.rules.allowsRomance).toBe(true);
  });
});

describe('it is its own story', () => {
  it('borrows no franchise names or terms', () => {
    const FRANCHISE =
      /\b(Gundam|Zaku|Newtype|Evangelion|NERV|Neon Genesis|Code Geass|Knightmare|Franxx|Pacific Rim|Jaeger|Kaiju|Drift compatib\w*|Mazinger|Macross|Gurren|Lagann|Zoids|Titanfall|Armored Core|Voltron|Transformers?|Autobots?|Decepticons?|Escaflowne|Patlabor|Full Metal Panic|Arbalest|Aldnoah|Kyoukai|Valvrave|Eureka Seven|Getter|Robotech|Battletech|Mechwarrior|Mech Cadets?|Mech Cadet Yu)\b/i;
    const hit = playerFacing().match(FRANCHISE);
    expect(hit?.[0] ?? null).toBeNull();
  });

  it('keeps the shelf title clear of Mech Cadets', () => {
    // The working title "Ironclad Cadets" was one synonym from Netflix's "Mech Cadets",
    // which has the same hook: a cleaner chosen by the academy's machine.
    expect(story.title).toBe('Unit Nine');
    expect(story.title).not.toMatch(/cadet|mech/i);
    expect(story.fantasyLabel).not.toMatch(/mechanic|ace\b/i);
  });

  it('art-directs its own cover, with the title spelled into it', () => {
    expect(story.coverDirection.trim().length).toBeGreaterThan(200);
    expect(story.coverDirection).toContain('TITLE:');
    expect(story.coverDirection).toContain(`spelled exactly ${story.title.toUpperCase()}`);
    expect(story.coverDirection).toMatch(/No other text anywhere/);
  });

  it('is written in English and ships with no literal backslash-n', () => {
    for (const [field, text] of [
      ['premise', story.premise],
      ['opening', story.opening],
      ['hook', story.hook],
    ] as const) {
      expect(text, field).not.toContain('\\n');
    }
    for (const s of story.openingSuggestions) expect(s).not.toContain('\\n');
    // Nothing outside Latin script and typographic punctuation.
    expect(playerFacing()).not.toMatch(/[Ѐ-ӿ぀-ヿ一-鿿가-힯]/);
  });
});

describe('ready for art and release (docs/stories-50/PIPELINE.md)', () => {
  it('opens straight on the scene and ships unpublished', () => {
    expect(story.prologue).toEqual([]);
    // Null until release day; a date set now makes the API report it updated on every request.
    expect(story.publishedAt).toBeNull();
  });

  it('gives every carded character a concrete appearance to paint a portrait from', () => {
    for (const c of story.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.length, c.id).toBeGreaterThan(120);
      expect(c.visualHook.length, c.id).toBeGreaterThan(0);
    }
  });

  it('keeps the cover effects on objects and the title, never on a face', () => {
    expect(story.coverDirection).toMatch(/HER FACE STAYS CLEAN/);
    expect(story.coverDirection).toMatch(/never on her face/);
    expect(story.coverDirection).not.toMatch(/\b(twenty|thirty|forty|fifty|years? old|aged)\b/i);
  });

  it('puts the suit’s system where the narrator reads it', () => {
    // runTurnPure never reads resources, step notes or locked abilities. It reads
    // hard canon, quest items and each archetype's starting abilities.
    const link = story.items.find((i) => i.id === 'nine_link')!;
    expect(story.rules.startingItems[0]?.itemId).toBe('nine_link');
    expect(link.questItem).toBe(true);
    expect(link.droppable).toBe(false);
    const canon = story.rules.hardCanon.join(' ');
    expect(canon).toMatch(/rear seat has its own controls/);
    expect(canon).toMatch(/every step and every fight wears it/);
    expect(canon).toMatch(/command tower notices/);
    expect(canon).toMatch(/It is the limiter/);
    for (const a of story.archetypes) {
      expect(a.startingAbilities[0], a.id).toBe('take_a_step');
      expect(a.startingAbilities.length, a.id).toBe(2);
      for (const id of a.startingAbilities) {
        expect(story.abilities.find((x) => x.id === id)?.unlockedByDefault, `${a.id} ${id}`).toBe(true);
      }
    }
    expect(new Set(story.archetypes.map((a) => a.startingAbilities[1])).size).toBe(story.archetypes.length);
  });

  it('names its titled characters the way people address them', () => {
    const called = Object.fromEntries(story.characters.map((c) => [c.id, c.calledName]));
    expect(called).toMatchObject({ kaede: 'Kaede', ruiz: 'Ruiz', graf: 'Graf' });
    expect(story.rules.toneGuide.length).toBeGreaterThan(200);
  });
});

describe('the copy is the right length and says the right amount', () => {
  it('meets the content bar', () => {
    expect(story.fantasyLabel.length).toBeLessThanOrEqual(42);
    const premiseWords = words(story.premise);
    expect(premiseWords).toBeGreaterThanOrEqual(120);
    expect(premiseWords).toBeLessThanOrEqual(250);
    const paragraphs = story.premise.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    for (const p of paragraphs) expect(words(p), p.slice(0, 40)).toBeLessThanOrEqual(70);
    expect(story.promises.length).toBe(5);
    expect(story.characters.length).toBeGreaterThanOrEqual(3);
    // Em-dashes are a tell; the house limit is one per ninety words.
    const dashes = (story.premise.match(/—/g) ?? []).length;
    expect(dashes).toBeLessThanOrEqual(Math.floor(premiseWords / 90));
  });

  it('passes the narrative clarity standard', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const report = checkStoryClarity(story);
    const errors = report.issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);

    const premise = checkNarrativeClarity(story.premise, { story, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(premise.passed).toBe(true);
  });

  it('passes the choice clarity standard', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const { abilityEffect, archetypeGrants } = await import('@plotbreak/contracts');
    const report = checkStoryChoiceClarity(story);
    expect(
      report.issues.filter((i) => i.severity === 'ERROR').map((i) => `${i.optionId ?? '-'}: ${i.message}`),
    ).toEqual([]);

    const field = story.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText.length).toBeGreaterThan(60);
    expect(field.helpText).toMatch(/fixed|permanent|keep it|for the whole story/i);

    for (const option of story.archetypes) {
      expect(option.name).not.toMatch(/—/);
      expect(option.summary.length).toBeGreaterThan(40);
      expect(option.playstyle.length).toBeGreaterThanOrEqual(2);
      const grants = archetypeGrants(story, option);
      expect(
        grants.abilities.length + grants.skills.length + grants.attributes.length + grants.items.length,
        `${option.id} grants nothing`,
      ).toBeGreaterThan(0);
    }
    const tagSets = story.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);

    for (const ability of story.abilities) {
      const effect = abilityEffect(story, ability);
      expect(effect, ability.id).toMatch(/rolls |always works/);
      expect(effect, ability.id).toMatch(/costs /);
      expect(effect.length, ability.id).toBeLessThan(120);
    }
  });

  it('does not answer its own mystery on the store card', () => {
    const card = [story.hook, story.premise, story.fantasyLabel, story.creatorNote].join(' ');
    expect(card).not.toMatch(/Paz|limiter|Graf|log/);
  });
});

describe('the cast', () => {
  it('has Kaede at the glass and Pip in the speaker when the story starts, and nobody else', () => {
    const present = charactersPresent(start()).map((c) => c.characterId).sort();
    expect(present).toEqual(['kaede', 'pip']);
  });

  it('never drops a character into the opening scene by fallback', () => {
    const minute = ((story.rules.startWorldMinute % 1440) + 1440) % 1440;
    const dumped = story.characters.filter(
      (c) =>
        !c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute) && c.homeLocationId === null,
    );
    expect(dumped.map((c) => c.id)).toEqual([]);
  });

  it('starts Kaede as a rival rather than a friend', () => {
    const kaede = story.characters.find((c) => c.id === 'kaede')!;
    expect(kaede.startingRelationship.rivalry).toBeGreaterThanOrEqual(40);
    expect(kaede.startingRelationship.trust).toBeLessThan(20);
    expect(kaede.gates.some((g) => g.kind === 'ROMANCE')).toBe(true);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of story.characters) {
      expect(c.fears.length, c.id).toBeGreaterThan(0);
      expect(c.values.length, c.id).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, c.id).toBeGreaterThan(0);
      expect(c.boundaries.length, c.id).toBeGreaterThan(0);
      expect(c.goals.length, c.id).toBeGreaterThan(0);
      expect(c.voiceSamples.length, c.id).toBeGreaterThanOrEqual(4);
      expect(c.secrets.length, c.id).toBeGreaterThanOrEqual(2);
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
      const users = story.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label}: ${users.join(', ')}`).toBeLessThanOrEqual(1);
    }
  });

  it('demonstrates each declared voice in the samples the writer gets', () => {
    const sample = (id: string) => story.characters.find((c) => c.id === id)!.voiceSamples;
    // Kaede never uses a contraction.
    for (const line of sample('kaede')) expect(line, line).not.toMatch(/\w[’']\w/);
    // Tova checks you are still with her.
    expect(sample('tova').join(' ')).toMatch(/yeah\?/);
    // Haldor says "one" when he is being superior.
    expect(sample('haldor').join(' ')).toMatch(/\bOne doesn’t|\bone cares/);
    // Ruiz gives work orders and talks to the suit.
    expect(sample('ruiz').join(' ')).toMatch(/Understood\?/);
    expect(sample('ruiz').join(' ')).toMatch(/Easy, Nine/);
    // Graf speaks for the academy as "we".
    expect(sample('graf').join(' ')).toMatch(/\bwe\b/i);
    // Pip thinks in numbered lists.
    expect(sample('pip').join(' ')).toMatch(/One: .* Two: /);
  });

  it('uses only expressions the portrait set can draw', async () => {
    const { knownExpression } = await import('@plotbreak/contracts');
    const unknown = story.characters.flatMap((c) =>
      c.expressions.filter((e) => !knownExpression(e)).map((e) => `${c.id}:${e}`),
    );
    expect(unknown).toEqual([]);
  });

  it('never gives two people the same short name', async () => {
    const { calledName } = await import('@plotbreak/contracts');
    const names = story.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it('derives a portrait key for everybody under this story', () => {
    const derived = withDerivedAssetKeys(story);
    expect(derived.coverImage).toMatch(/^story_ironclad_cadets\//);
    for (const c of derived.characters) expect(c.portrait, c.id).toMatch(/^story_ironclad_cadets\//);
    for (const l of derived.locations) expect(l.stageImage, l.id).toMatch(/^story_ironclad_cadets\//);
  });
});

describe('the Gullwater lead is optional and behaves like it', () => {
  it('hides the lead behind a flag only a curious player sets', () => {
    const lead = story.quests.find((q) => q.id === 'q_eleven_years')!;
    expect(lead.kind).toBe('LEAD');
    expect(lead.startsActive).toBe(false);
    expect(lead.discoverWhen?.flagsSet).toEqual(['knows:the_recorder']);
  });

  it('never opens it from an event everybody gets', () => {
    const sources = story.worldEvents.filter((e) => e.setsFlags.includes('knows:the_recorder'));
    expect(sources.length).toBeGreaterThan(0);
    for (const e of sources) expect(e.requiresFlags.length, e.id).toBeGreaterThan(0);
  });

  it('leaves most of the ending space reachable without it', () => {
    const mystery = new Set(['the_log_is_public', 'gullwater_answered', 'ruiz_knows_the_truth', 'heard_the_log']);
    const ordinary = story.endings.filter((e) => !e.requires.flagsSet.some((f) => mystery.has(f)));
    expect(ordinary.length).toBeGreaterThanOrEqual(8);
  });

  it('keeps the locked abilities locked in the world’s own words', () => {
    for (const ability of story.abilities.filter((a) => !a.unlockedByDefault)) {
      expect(ability.requires, ability.id).toBeDefined();
      expect(ability.requires!.flagsSet.length, ability.id).toBeGreaterThan(0);
      expect(ability.requires!.lockedCopy.length, ability.id).toBeGreaterThan(30);
      expect(ability.requires!.lockedCopy, ability.id).not.toMatch(/flag|predicate|locked/i);
    }
  });
});

describe('the suit can genuinely be lost', () => {
  it('has more than one way for Unit Nine to end up as scrap', () => {
    const scrap = story.endings.filter((e) =>
      e.requires.flagsSet.some((f) => f === 'unit_nine_cut' || f === 'lost_the_trials'),
    );
    expect(scrap.length).toBeGreaterThanOrEqual(3);
  });

  it('lets the Trials be lost without a mistake', () => {
    const lost = routes.find(({ route }) => route.routeId === 'lost_it')!.route;
    expect(lost.predicate.minRelationship).toEqual([]);
    expect(lost.predicate.hasItems).toEqual([]);
    const cut = routes.find(({ route }) => route.routeId === 'cut_up')!.route;
    expect(cut.predicate.minRelationship).toEqual([]);
    expect(cut.predicate.hasItems).toEqual([]);
  });

  it('lets somebody walk away, and reaches that early', () => {
    const walk = story.endings.find((e) => e.id === 'end_down_the_cliff_road')!;
    expect(walk.requires.flagsSet).toContain('left_the_map');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });
});

describe('endings', () => {
  it('uses the whole rarity range, and no more than the storyteller reads', () => {
    expect(story.endings.length).toBeGreaterThanOrEqual(3);
    expect(story.endings.length).toBeLessThanOrEqual(12);
    expect(new Set(story.endings.map((e) => e.rarity)).size).toBe(4);
    expect(story.endings.some((e) => e.rarity === 'COMMON' || e.rarity === 'UNCOMMON')).toBe(true);
  });

  it('gives every ending a turn floor, a real condition and a real epilogue', () => {
    for (const e of story.endings) {
      expect(e.minTurn, e.id).toBeGreaterThan(0);
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.name.length, e.id).toBeLessThanOrEqual(60);
    }
  });
});

describe('the world is wired up', () => {
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
    for (const a of story.archetypes) {
      const total =
        Object.keys(a.attributeBonus).length +
        Object.keys(a.skillProficiencies).length +
        a.startingAbilities.length +
        a.startingItems.length;
      expect(total, a.id).toBeGreaterThan(0);
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
      if (c.homeLocationId && !locIds.has(c.homeLocationId)) broken.push(`${c.id} home ${c.homeLocationId}`);
      for (const b of c.schedule) if (!locIds.has(b.locationId)) broken.push(`${c.id} at ${b.locationId}`);
    }
    for (const a of story.abilities) {
      for (const cost of a.costs) if (!resIds.has(cost.resourceId)) broken.push(`${a.id} costs ${cost.resourceId}`);
      if (a.check?.skillId && !skillIds.has(a.check.skillId)) broken.push(`${a.id} rolls ${a.check.skillId}`);
    }
    for (const i of story.items) {
      for (const s of Object.keys(i.skillModifiers ?? {})) if (!skillIds.has(s)) broken.push(`${i.id} mods ${s}`);
      if (i.consumable && !resIds.has(i.consumable.resourceId)) broken.push(`${i.id} restores ${i.consumable.resourceId}`);
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
    for (const i of story.rules.startingItems) if (!itemIds.has(i.itemId)) broken.push(`start ${i.itemId}`);
    if (!locIds.has(story.rules.startingLocationId)) broken.push(`startingLocationId`);
    for (const e of story.worldEvents) {
      if (e.locationId && !locIds.has(e.locationId)) broken.push(`${e.id} at ${e.locationId}`);
      for (const m of e.movesCharacters) {
        if (!charIds.has(m.characterId)) broken.push(`${e.id} moves ${m.characterId}`);
        if (!locIds.has(m.toLocationId)) broken.push(`${e.id} moves to ${m.toLocationId}`);
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
    expect(broken).toEqual([]);
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
    // `knows:` is deliberately not here: the engine never sets it.
    const ENGINE_PREFIXES = ['met:', 'spoke:', 'attacked:', 'engaged:', 'visited:', 'used:', 'inspected:'];
    const engineSets = (f: string): boolean => f === 'left_the_map' || ENGINE_PREFIXES.some((p) => f.startsWith(p));
    const ok = (f: string): boolean => settable.has(f) || engineSets(f);

    const dead: string[] = [];
    for (const e of story.endings) for (const f of e.requires.flagsSet) if (!ok(f)) dead.push(`ending ${e.id}: ${f}`);
    for (const a of story.abilities) for (const f of a.requires?.flagsSet ?? []) if (!ok(f)) dead.push(`ability ${a.id}: ${f}`);
    for (const l of story.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !ok(c.lockedByFlag)) dead.push(`${l.id}->${c.to}: ${c.lockedByFlag}`);
    }
    for (const c of story.characters) for (const g of c.gates) for (const f of g.requires.flagsSet) if (!ok(f)) dead.push(`gate ${g.id}: ${f}`);
    for (const q of story.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!ok(f)) dead.push(`quest ${q.id}: ${f}`);
      for (const st of q.steps) {
        for (const p of [st.enterWhen, st.succeedWhen, ...st.succeedWhenAny.map((r) => r.predicate)]) {
          for (const f of p?.flagsSet ?? []) if (!ok(f)) dead.push(`step ${st.id}: ${f}`);
        }
      }
    }
    for (const e of story.worldEvents) for (const f of [...e.requiresFlags, ...e.cancelledByFlags]) if (!ok(f)) dead.push(`event ${e.id}: ${f}`);
    expect(dead).toEqual([]);
  });

  it('can reach every location from where it starts', () => {
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
    expect(story.locations.filter((l) => !seen.has(l.id)).map((l) => l.id)).toEqual([]);
  });

  it('closes something when a route is taken', () => {
    expect(routes.some(({ route }) => route.closesFlags.length > 0)).toBe(true);
  });

  it('leaves things worth taking, and every alias names one thing', () => {
    const takeable = story.locations.flatMap((l) => l.takeableItems);
    expect(takeable.length).toBeGreaterThan(0);
    const aliases = takeable.flatMap((t) => t.aka.map((a) => a.toLowerCase()));
    expect(new Set(aliases).size, 'an alias points at two items').toBe(aliases.length);
  });

  it('puts the world kit in the player’s hands with no archetype at all', () => {
    const state = start(null);
    expect(story.rules.startingItems.length).toBeGreaterThan(0);
    for (const entry of story.rules.startingItems) {
      expect(state.player.inventory.find((i) => i.itemId === entry.itemId)?.quantity, entry.itemId).toBe(entry.qty);
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

  it('gives rest exactly one honest thing to restore', () => {
    expect(story.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('sends a public fight to the academy and its attention', () => {
    // PUBLIC_VIOLENCE drops the FIRST faction and raises the FIRST GOOD_LOW.
    expect(story.factions[0]?.id).toBe('faction_academy');
    expect(story.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('heat');
  });

  it('has something the player can do that moves each descending one', () => {
    for (const r of story.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      expect(story.abilities.some((a) => a.costs.some((c) => c.resourceId === r.id)), r.id).toBe(true);
    }
  });

  it('gives every faction ladder a rung above where it starts, and gates only on standing that can be earned', () => {
    for (const f of story.factions) {
      expect(f.ranks.length, f.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...f.ranks.map((r) => r.atReputation)), f.id).toBeGreaterThan(f.startingReputation);
    }
    const ceiling = new Map(story.factions.map((f) => [f.id, f.startingReputation]));
    for (const a of story.archetypes) {
      for (const entry of a.startingReputation) {
        const floor = story.factions.find((f) => f.id === entry.factionId)!.startingReputation;
        ceiling.set(entry.factionId, Math.max(ceiling.get(entry.factionId)!, floor + entry.amount));
      }
    }
    for (const q of story.quests) {
      for (const s of q.steps) {
        for (const g of s.rewards.reputation) ceiling.set(g.factionId, ceiling.get(g.factionId)! + Math.max(0, g.amount));
      }
    }
    const gates = [
      ...story.endings.flatMap((e) => e.requires.minFactionReputation),
      ...routes.flatMap(({ route }) => route.predicate.minFactionReputation),
    ];
    expect(gates.length).toBeGreaterThan(0);
    for (const g of gates) expect(ceiling.get(g.factionId)!, `${g.factionId} ${g.value}`).toBeGreaterThanOrEqual(g.value);
  });
});

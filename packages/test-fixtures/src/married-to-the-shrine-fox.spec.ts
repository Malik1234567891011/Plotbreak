import { describe, expect, it } from 'vitest';
import { createInitialState, charactersPresent } from '@plotbreak/engine';
import { abilityEffect, calledName, knownExpression } from '@plotbreak/contracts';
import { MARRIED_TO_THE_SHRINE_FOX } from './married-to-the-shrine-fox.js';
import { isReleaseDate, RELEASE_DATE_RULE } from './release-date.js';

/**
 * Married to the Shrine Fox, held to the promise on its own card: a fox who
 * says you owe her a wedding, and an honest answer to her in every direction.
 *
 * The failure this world is most exposed to is the fox becoming a prize: a
 * meter to fill, a yes the story is herding toward, a refusal written as the
 * wrong answer. So the checks that matter most here are that no is allowed,
 * that doing nothing is an ending with no relationship arithmetic behind it,
 * and that she has limits, fears and a want of her own.
 *
 * It is also one of the fifty, so the slate's bar lives here too: the opener
 * hands the player a choice inside a hundred and twenty words, every person on
 * the page is an adult on the page, and the three checks every new story runs.
 * The story is not in `LAUNCH_CATALOG` yet, so the last block runs the
 * catalog's own gates on it directly.
 */

const S = MARRIED_TO_THE_SHRINE_FOX;

const start = (archetypeId = 'arch_hands') =>
  createInitialState({
    sessionId: 'sess_mtsf',
    story: S,
    identity: {
      displayName: 'Ren Asano',
      pronouns: 'they/them',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const ability = (id: string) => S.abilities.find((a) => a.id === id)!;
const character = (id: string) => S.characters.find((c) => c.id === id)!;
const steps = S.quests.flatMap((q) => q.steps);
const step = (id: string) => steps.find((s) => s.id === id)!;
const words = (text: string) => text.split(/\s+/).filter(Boolean);

/** Ages as the bible states them. The player is an adult heir of twenty-six or older. */
const AGES: Record<string, number> = { kuzuha: 1000, sora: 23, oboro: 600, tadokoro: 56, ume: 81 };

describe('prose is prose', () => {
  it('never ships a literal backslash-n in anything a player or the storyteller reads', () => {
    const texts = [
      S.premise,
      S.opening,
      S.hook,
      ...S.openingSuggestions,
      ...S.characters.map((c) => c.cardBlurb),
      ...S.rules.styleExamples,
      ...S.rules.hardCanon,
      ...S.endings.map((e) => e.condition),
    ];
    for (const text of texts) expect(text).not.toContain('\\n');
  });
});

describe('the opener hands the player a choice', () => {
  it('is short enough to read on a phone in one breath', () => {
    const n = words(S.opening).length;
    expect(n).toBeGreaterThanOrEqual(50);
    expect(n).toBeLessThanOrEqual(120);
  });

  it('has a named person talk to the player inside the first sixty words', () => {
    const head = words(S.opening).slice(0, 60).join(' ');
    expect(head).toContain('"You’re late,"');
    expect(head).toContain('Kuzuha');
  });

  it('ends on a demand the player has to answer now', () => {
    expect(S.opening.trim()).toMatch(/"Kneel and say yes\. Or don’t, and tell me why\."$/);
  });

  it('names nobody the player is expected to know already', () => {
    // A capital letter that is not starting a sentence is a proper noun. Only
    // the fox, who introduces herself, may appear.
    const ALLOWED = new Set(['Kuzuha', 'I', 'I’m', 'I’ve']);
    const strays: string[] = [];
    for (const m of S.opening.matchAll(/[A-Z][A-Za-z’'-]*/g)) {
      const before = S.opening.slice(0, m.index).replace(/[\s"“”[]+$/, '');
      const sentenceStart = before.length === 0 || /[.?!:\]]$/.test(before);
      if (!sentenceStart && !ALLOWED.has(m[0])) strays.push(m[0]);
    }
    expect(strays).toEqual([]);
  });

  it('offers three different moves: one said, one done, one risky', () => {
    const [said, done, risky] = S.openingSuggestions;
    expect(S.openingSuggestions).toHaveLength(3);
    expect(new Set(S.openingSuggestions).size).toBe(3);
    expect(said).toMatch(/^"/);
    expect(done).not.toMatch(/^"/);
    expect(risky).not.toMatch(/^"/);
    // The risky one is the answer nobody has given her in three hundred years.
    expect(risky).toMatch(/kneel and say yes/i);
  });

  it('cannot end the story on the risky card', () => {
    // A yes on the offering box is a promise, not the wedding, and no ending
    // can be offered before the story has been one.
    expect(S.rules.hardCanon.join(' ')).toMatch(/Saying yes or no anywhere else is a promise, not the answer/);
    for (const ending of S.endings) expect(ending.minTurn, ending.id).toBeGreaterThanOrEqual(14);
  });

  it('turns a first-night yes into preparation, in the canon the storyteller reads', () => {
    // Step notes never reach production's storyteller, so the brake on a
    // turn-three wedding has to be hard canon, right after the three answers.
    const canon = S.rules.hardCanon;
    const answers = canon.findIndex((c) => c.startsWith('Answering the vow means'));
    const guard = canon.findIndex((c) => c.startsWith('Nobody in three hundred years has said yes'));
    expect(answers).toBeGreaterThanOrEqual(0);
    expect(guard).toBe(answers + 1);
    expect(canon[guard]).toMatch(/bridal robes/);
    expect(canon[guard]).toMatch(/rite book/);
    expect(canon[guard]).toMatch(/Sora to read the words/);
    expect(canon[guard]).toMatch(/an engagement she does not quite believe/);
  });
});

describe('the vow lives where the storyteller can read it', () => {
  it('spells out the three answers, the clock and the price of each in hard canon', () => {
    // Production's storyteller reads hard canon on every turn, and never the
    // quest steps or the ability list.
    const canon = S.rules.hardCanon.join(' ');
    expect(canon).toMatch(/a wedding; the vow refused out loud, to her face; or the vow rewritten/);
    expect(canon).toContain('forty-ninth morning');
    expect(canon).toMatch(/ordinary red fox who remembers nothing/);
    expect(canon).toMatch(/more than one night at a time/);
    expect(canon).toMatch(/cannot pass the lowest gate/);
  });

  it('keeps the vow itself as a quest item, word for word, on the altar wall', () => {
    const board = S.items.find((i) => i.id === 'the_vow_board')!;
    expect(board.questItem).toBe(true);
    expect(board.description).toContain('owes you the wedding I did not give');
    const hall = S.locations.find((l) => l.id === 'main_hall')!;
    expect(hall.takeableItems.find((t) => t.itemId === 'the_vow_board')?.ownerId).toBe('kuzuha');
  });

  it('starts the player holding the keys and a letter that names a sealed condition', () => {
    expect(S.rules.startingItems.map((i) => i.itemId)).toEqual(['shrine_keys', 'lawyers_letter']);
    const letter = S.items.find((i) => i.id === 'lawyers_letter')!;
    expect(letter.questItem).toBe(true);
    expect(letter.description).toMatch(/sealed letter addressed to Ms Sora Yanagi/);
  });

  it('gives every background the keeper’s bell, so the storyteller always sees it', () => {
    // It only reads the chosen archetype's starting abilities.
    expect(ability('ring_the_bell').unlockedByDefault).toBe(true);
    for (const a of S.archetypes) expect(a.startingAbilities, a.id).toContain('ring_the_bell');
  });

  it('sets the 13+ line in hard canon, where the storyteller reads it', () => {
    const romance = S.rules.hardCanon.find((f) => f.startsWith('Romance in this story'))!;
    expect(romance).toMatch(/as far as a kiss and no further/);
    expect(romance).toMatch(/No fan service/);
  });

  it('keeps the tone guide, which every image prompt carries as its mood, free of romance, body and age words', () => {
    expect(S.rules.toneGuide).toMatch(/^Romantic comedy with a clock in it\./);
    expect(S.rules.toneGuide).not.toMatch(
      /\b(adults?|kiss\w*|romance|flirt\w*|fan service|bod(y|ies)|lingering\w*|bath\w*|young\w*|girls?|boys?)\b/i,
    );
  });

  it('keeps the style samples the storyteller imitates out of the bath', () => {
    for (const example of S.rules.styleExamples) expect(example).not.toMatch(/\bbath\w*/i);
  });

  it('declares the sake at the wedding', () => {
    expect(S.contentDescriptors).toContain('ALCOHOL_REFERENCES');
  });
});

describe('she is a person, not a prize', () => {
  it('is on the offering box when the story starts, and Sora is not there yet', () => {
    const present = charactersPresent(start()).map((c) => c.characterId);
    expect(present).toContain('kuzuha');
    expect(present).not.toContain('sora');
    const arrival = S.worldEvents.find((e) => e.id === 'we_sora_comes_up')!;
    expect(arrival.atWorldMinute).toBeGreaterThan(S.rules.startWorldMinute);
  });

  it('starts owed rather than trusting, because eleven keepers said no', () => {
    const kuzuha = character('kuzuha');
    expect(kuzuha.startingRelationship.trust).toBeLessThanOrEqual(20);
    expect(kuzuha.startingRelationship.affection).toBeLessThan(50);
  });

  it('gives her limits, a want of her own, and a way to refuse', () => {
    const kuzuha = character('kuzuha');
    expect(kuzuha.boundaries.length).toBeGreaterThanOrEqual(3);
    expect(kuzuha.fears.length).toBeGreaterThanOrEqual(2);
    expect(kuzuha.hiddenDrives.length).toBeGreaterThanOrEqual(2);
    expect(kuzuha.secrets.length).toBeGreaterThanOrEqual(2);
    expect(kuzuha.voiceSamples.length).toBeGreaterThanOrEqual(4);
    expect(kuzuha.boundaries.join(' ')).toMatch(/pitied/);
  });

  it('gives the whole cast something to want, fear and refuse', () => {
    for (const c of S.characters) {
      expect(c.fears.length, `${c.id} fears nothing`).toBeGreaterThan(0);
      expect(c.values.length, `${c.id} values nothing`).toBeGreaterThan(0);
      expect(c.hiddenDrives.length, `${c.id} wants nothing privately`).toBeGreaterThan(0);
      expect(c.boundaries.length, `${c.id} would do anything`).toBeGreaterThan(0);
      expect(c.goals.length, `${c.id} is not after anything`).toBeGreaterThan(0);
      expect(c.secrets.length, `${c.id} has no secret`).toBeGreaterThan(0);
      expect(c.voiceSamples.length, `${c.id} has too few samples`).toBeGreaterThanOrEqual(4);
      for (const secret of c.secrets) expect(secret.revealHint.length, secret.id).toBeGreaterThan(10);
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
    const vocab = new Map(S.characters.map((c) => [c.id, content(c.voiceSamples.join(' '))]));
    for (const a of S.characters) {
      for (const b of S.characters) {
        if (a.id >= b.id) continue;
        const va = vocab.get(a.id)!;
        const vb = vocab.get(b.id)!;
        const shared = [...va].filter((w) => vb.has(w)).length;
        const overlap = shared / Math.min(va.size, vb.size);
        expect(overlap, `${a.id} and ${b.id} share ${Math.round(overlap * 100)}% of their vocabulary`).toBeLessThan(0.3);
      }
    }
  });

  it('keeps the formal register to two of them, so the cast does not sound like one translation', () => {
    // Sora and Oboro never contract; everybody else does, the way people talk.
    const formal = S.characters.filter((c) => !c.voiceSamples.some((v) => /\w[’']\w/.test(v))).map((c) => c.id);
    expect(formal.length, `contraction-free: ${formal.join(', ')}`).toBeLessThanOrEqual(2);
    expect(formal.sort()).toEqual(['oboro', 'sora']);
  });

  it('leads every cast card with the hook, not a design note', () => {
    for (const c of S.characters) {
      expect(c.cardBlurb, c.id).not.toMatch(/\b(allowed|remember which)\b/i);
    }
    expect(character('kuzuha').cardBlurb).toMatch(/^She ate your dinner/);
    expect(character('kuzuha').cardBlurb).toContain('Nobody has ever said yes');
  });

  it('does not let two of them run the same rhetorical move', () => {
    const MOVES: Array<[string, RegExp]> = [
      ['negate-then-correct', /\bI(?:’m| am)? ?not (?:going to )?(?:say|tell|saying|telling|upset|asking)\b/i],
      ['not X but Y', /\bnot (?:a|an|the|merely|simply|just)?\s*[\w\s]{2,28},\s*but\s+/i],
      ['the kind of X that', /\bthe kind of \w+ that\b/i],
      ['numbered points', /\b(?:First|Second|Third),/],
    ];
    for (const [label, pattern] of MOVES) {
      const users = S.characters.filter((c) => c.voiceSamples.some((v) => pattern.test(v))).map((c) => c.id);
      expect(users.length, `${label} is shared by ${users.join(' and ')}`).toBeLessThanOrEqual(1);
    }
  });
});

describe('every answer is allowed, including no', () => {
  const altar = step('the_altar');

  it('takes a wedding, a refusal to her face and new terms at the altar, and two harder answers', () => {
    const routes = altar.succeedWhenAny.map((r) => r.routeId);
    expect(routes).toEqual(
      expect.arrayContaining([
        'married_meaning_it',
        'married_for_the_board',
        'refused_to_her_face',
        'rewrote_it',
        'released_her',
        'sealed_her',
      ]),
    );
  });

  it('marks every answer that settles the vow, so the lapse cannot also fire', () => {
    for (const route of altar.succeedWhenAny.filter((r) => r.routeId !== 'sealed_her')) {
      expect(route.setsFlags, route.routeId).toContain('vow_answered');
    }
    const lapse = S.worldEvents.find((e) => e.id === 'we_forty_ninth_morning')!;
    expect(lapse.cancelledByFlags).toEqual(expect.arrayContaining(['vow_answered', 'vow_dissolved', 'sealed_her']));
  });

  it('has an ending for every way of answering her', () => {
    for (const flag of ['married_for_duty', 'married_meaning_it', 'vow_refused', 'vow_rewritten', 'released_her', 'sealed_her', 'took_oboros_deal', 'vow_lapsed']) {
      expect(S.endings.some((e) => e.requires.flagsSet.includes(flag)), flag).toBe(true);
    }
  });

  it('lets the vow lapse because nobody said anything', () => {
    // The honest failure of this story, reachable by being pleasant for three
    // days and never answering. It must not require a mistake.
    const lapse = S.worldEvents.find((e) => e.id === 'we_forty_ninth_morning')!;
    expect(lapse.requiresFlags).toEqual([]);
    expect(lapse.setsFlags).toEqual(['vow_lapsed']);
    expect(lapse.atWorldMinute).toBe(3 * 1440 + 6 * 60);
    const lantern = S.endings.find((e) => e.id === 'end_the_last_lantern')!;
    expect(lantern.requires.flagsSet).toEqual(['vow_lapsed']);
    expect(lantern.requires.minRelationship).toEqual([]);
    expect(lantern.requires.hasItems).toEqual([]);
  });

  it('lets somebody walk down the steps, and reaches that early', () => {
    const walk = S.endings.find((e) => e.requires.flagsSet.includes('left_the_map'))!;
    expect(walk.id).toBe('end_the_last_bus');
    expect(walk.minTurn).toBeLessThanOrEqual(22);
  });

  it('puts walking away, the sale and the lapse inside the twelve endings the storyteller reads', () => {
    const read = S.endings.slice(0, 12).map((e) => e.id);
    for (const id of ['end_the_last_bus', 'end_the_ropeway', 'end_the_last_lantern', 'end_the_keeper', 'end_mist_on_the_steps']) {
      expect(read, id).toContain(id);
    }
  });

  it('has real losses, not just flavours of winning', () => {
    const losses = ['end_the_keeper', 'end_the_ropeway', 'end_mist_on_the_steps', 'end_the_last_lantern', 'end_sealed_under_the_cedar', 'end_the_last_bus', 'end_before_the_rains'];
    for (const id of losses) expect(S.endings.some((e) => e.id === id), id).toBe(true);
  });

  it('uses the whole rarity range', () => {
    expect(new Set(S.endings.map((e) => e.rarity)).size).toBe(4);
  });

  it('lets the mountain be sold, and lets the wall decide what that sale is', () => {
    const signature = step('the_signature');
    expect(signature.succeedWhenAny.find((r) => r.routeId === 'signed')?.setsFlags).toContain('sold_the_mountain');
    const slump = S.worldEvents.find((e) => e.id === 'we_wall_slumps')!;
    expect(slump.setsFlags).toEqual(['wall_moved']);
    expect(S.endings.find((e) => e.id === 'end_the_ropeway')?.requires.flagsUnset).toContain('wall_moved');
    expect(S.endings.find((e) => e.id === 'end_before_the_rains')?.requires.flagsSet).toContain('wall_moved');
  });
});

describe('the three gated abilities are earned, not narrated', () => {
  const GATED: Array<[id: string, flag: string, step: string]> = [
    ['keepers_ward', 'knows:the_ward', 'learn_the_rites'],
    ['borrow_foxfire', 'foxfire_offered', 'the_offer_of_fire'],
    ['rewrite_the_vow', 'knows:why_she_waits', 'read_the_diary'],
  ];

  for (const [id, flag, stepId] of GATED) {
    it(`grants ${id} at ${stepId} and keeps it behind ${flag}`, () => {
      const a = ability(id);
      expect(a.unlockedByDefault).toBe(false);
      expect(a.requires.flagsSet).toEqual([flag]);
      expect(a.requires.lockedCopy.length).toBeGreaterThan(30);
      expect(a.requires.lockedCopy).not.toMatch(/flag|predicate|locked/i);

      const granting = steps.filter((s) => s.rewards.abilities.includes(id));
      expect(granting.map((s) => s.id)).toEqual([stepId]);
      expect(granting[0]!.rewards.flags).toContain(flag);
      expect(granting[0]!.succeedWhenAny.length).toBeGreaterThanOrEqual(2);
    });
  }

  it('makes her fire cost her tails, and the ward cost the mountain’s patience', () => {
    expect(ability('borrow_foxfire').costs.map((c) => c.resourceId)).toEqual(['fading']);
    expect(ability('keepers_ward').costs.map((c) => c.resourceId)).toContain('unrest');
    expect(ability('ring_the_bell').costs.map((c) => c.resourceId)).toEqual(['unrest']);
  });
});

describe('the three checks every new story runs', () => {
  it('grants every gated ability in some step reward', () => {
    const granted = new Set(steps.flatMap((s) => s.rewards.abilities));
    for (const a of S.abilities.filter((x) => !x.unlockedByDefault)) {
      expect(granted.has(a.id), `${a.id} is never granted`).toBe(true);
    }
  });

  it('addresses the player in every card blurb', () => {
    for (const c of S.characters) expect(c.cardBlurb, c.id).toMatch(/\byour?\b/i);
  });

  it('gives every place a way in', () => {
    const inbound = new Set(S.locations.flatMap((l) => l.connections.map((c) => c.to)));
    for (const l of S.locations) expect(inbound.has(l.id), `${l.id} cannot be reached`).toBe(true);
  });
});

describe('everybody on the page is an adult, on the page', () => {
  it('states every age in hard canon, all eighteen or over', () => {
    const canon = S.rules.hardCanon[0]!;
    expect(canon).toMatch(/^Everyone in this story is an adult\./);
    expect(canon).toContain('The player is an adult');
    for (const c of S.characters) {
      expect(AGES[c.id], `${c.id} has no stated age`).toBeDefined();
      expect(AGES[c.id]!).toBeGreaterThanOrEqual(18);
      expect(canon, c.id).toContain(c.calledName ?? c.name.split(' ')[0]!);
    }
    // The player can never be younger, and the people in the backstory have ages too.
    expect(canon).toContain('twenty-six or older');
    expect(canon).toMatch(/Seiji, the first keeper, was thirty when he wrote the vow/);
    expect(canon).toMatch(/every keeper Kuzuha ever proposed to was a grown adult/);
    expect(canon).toMatch(/Any earlier visit the player made to the mountain was as an adult/);
  });

  it('gives no background a childhood on the mountain', () => {
    // The storyteller reads the chosen archetype's summary and blurb every
    // turn. A childhood memory of the fox would invite her to remember the
    // player small, which a romance must never do.
    const CHILDHOOD = /\b(long ago|child\w*|kids?|little|young\w*|boy|girl|made it up|when you were)\b/i;
    for (const a of S.archetypes) {
      expect(a.summary, a.id).not.toMatch(CHILDHOOD);
      expect(a.blurb, a.id).not.toMatch(CHILDHOOD);
    }
    const local = S.archetypes.find((a) => a.id === 'arch_local')!;
    expect(`${local.summary} ${local.blurb}`).toMatch(/twenty/);
    const charm = S.items.find((i) => i.id === 'fox_charm')!;
    expect(charm.description).toMatch(/the summer you turned twenty/);
  });

  it('never lets fading make her look younger', () => {
    expect(S.rules.hardCanon.join(' ')).toMatch(/Fading never makes the woman look younger or smaller/);
  });

  it('describes people by build and costume, never by an age word', () => {
    const AGE_WORDS = /\b(teen\w*|girl|boy|young\w*|youth\w*|kid|child\w*|student|little|petite|\d+)\b/i;
    for (const c of S.characters) {
      expect(c.appearance, c.id).toMatch(/^An (adult|older) (wo)?man\b/);
      for (const text of [c.appearance, c.visualHook, c.silhouette]) expect(text, c.id).not.toMatch(AGE_WORDS);
    }
    expect(S.coverDirection).not.toMatch(AGE_WORDS);
  });
});

describe('the cover', () => {
  it('puts the title in the art, on its own TITLE line, spelled exactly', () => {
    const cover = S.coverDirection;
    const title = cover.slice(cover.indexOf('TITLE:'));
    expect(cover.match(/TITLE:/g)).toHaveLength(1);
    expect(title).toContain(`the title ${S.title} painted into the art in the upper third`);
    // generate-art capitalises the wordmark, so the spelling line agrees with it.
    expect(title).toContain(`spelled exactly ${S.title.toUpperCase()}, large and legible at thumbnail size`);
    expect(title).toMatch(/No other text anywhere\.$/);
  });

  it('puts the fox alone in front, by costume and pose, never by an age word', () => {
    const cover = S.coverDirection;
    expect(cover).toMatch(/^SUBJECT: Kuzuha, .* alone and unmistakable in the foreground/);
    expect(cover).not.toMatch(
      /\b(teen\w*|girls?|boys?|young\w*|youth\w*|kids?|child\w*|student\w*|little|petite|small|adults?|older|aged?|\d+)\b/i,
    );
    // Robes and pose, nothing lingering: no legs, skin, figure or curves.
    expect(cover).not.toMatch(/\b(legs?|thighs?|skin-tight|figure|curv\w*|bare\w*|long-limbed)\b/i);
  });

  it('keeps every effect on the tails, the lanterns and the title, never on her face', () => {
    const cover = S.coverDirection;
    expect(cover).toMatch(/HER FACE STAYS CLEAN: no glow, flame, sparks or marks on her face or skin\./);
    expect(cover).toMatch(/stays on the tails, the lanterns and the title, never on her face/);
  });

  it('casts the fox first, so the composed art leads with her', () => {
    expect(S.characters[0]?.id).toBe('kuzuha');
  });
});

describe('the opening panel', () => {
  it('is keyed to the story and drawn from the fox who speaks first', () => {
    const panel = S.openingPanel!;
    expect(panel.assetKey).toBe(`${S.storyId}/opening`);
    expect(panel.alt.length).toBeLessThanOrEqual(200);
    // opening-panel-art.ts takes the character whose first name starts the alt
    // and uses that character's portrait as the reference image.
    const named = S.characters.find((c) => panel.alt.startsWith(c.name.split(' ')[0]!))!;
    expect(named.id).toBe('kuzuha');
    expect(words(S.opening).slice(0, 60).join(' ')).toContain(named.name);
    expect(panel.alt).not.toMatch(/\b(teen\w*|girls?|boys?|young\w*|kids?|child\w*|little|petite|adults?|legs?)\b/i);
  });
});

describe('release shape', () => {
  it('opens straight on the scene and is dated only at release', () => {
    expect(S.prologue).toEqual([]);
    expect(isReleaseDate(S.publishedAt), RELEASE_DATE_RULE).toBe(true);
  });

  it('gives every face on a cast card a concrete appearance to draw from', () => {
    for (const c of S.characters.filter((x) => x.cardBlurb.trim())) {
      expect(c.appearance.length, c.id).toBeGreaterThan(120);
      expect(c.visualHook.trim(), c.id).not.toBe('');
      expect(c.silhouette.trim(), c.id).not.toBe('');
    }
  });

  it('names the developer the way the town does', () => {
    // Nobody in Sugino calls him Isao; the derived short name would.
    expect(character('tadokoro').calledName).toBe('Tadokoro');
    expect(calledName(character('tadokoro'))).toBe('Tadokoro');
  });
});

describe('the state is small and does the engine’s homework', () => {
  it('keeps three invisible banded variables', () => {
    expect(S.resources.length).toBe(3);
    for (const r of S.resources) {
      expect(r.visible, r.id).toBe(false);
      expect(r.bands.length, r.id).toBeGreaterThanOrEqual(3);
      expect(Math.max(...r.bands.map((b) => b.upTo)), r.id).toBe(r.max);
      for (const band of r.bands) {
        expect(band.behaviour.length, `${r.id}@${band.upTo}`).toBeGreaterThan(80);
        expect(band.behaviour.toLowerCase()).not.toContain(r.name.toLowerCase());
      }
    }
  });

  it('lets rest restore the climb and nothing else', () => {
    // `resolveRest` refills every GOOD_HIGH resource.
    expect(S.resources.filter((r) => r.polarity === 'GOOD_HIGH').map((r) => r.id)).toEqual(['stamina']);
  });

  it('makes violence on holy ground offend the mountain first', () => {
    // PUBLIC_VIOLENCE takes the first GOOD_LOW resource and the first faction.
    expect(S.resources.find((r) => r.polarity === 'GOOD_LOW')?.id).toBe('unrest');
    expect(S.factions[0]?.id).toBe('faction_mountain');
  });

  it('gives every descending variable an ability that raises it', () => {
    for (const r of S.resources.filter((x) => x.polarity === 'GOOD_LOW')) {
      const raisers = S.abilities.filter((a) => a.costs.some((c) => c.resourceId === r.id));
      expect(raisers.length, `${r.id} never moves`).toBeGreaterThan(0);
    }
  });

  it('greys her tails on their own, toward the forty-ninth morning', () => {
    const fading = S.resources.find((r) => r.id === 'fading')!;
    expect(fading.regenPerHour).toBeGreaterThan(0);
    expect(fading.start).toBe(33);
  });
});

describe('it would pass the catalog’s own gates', () => {
  it('passes the clarity standard, and the premise answers all six questions', async () => {
    const { checkStoryClarity, checkNarrativeClarity } = await import('@plotbreak/director');
    const errors = checkStoryClarity(S).issues.filter((i) => i.severity === 'ERROR');
    expect(errors.map((e) => `${e.code}: ${e.message}`)).toEqual([]);
    const premise = checkNarrativeClarity(S.premise, { story: S, kind: 'premise' });
    expect(premise.issues.filter((i) => i.code.startsWith('MISSING_')).map((i) => i.code)).toEqual([]);
    expect(premise.passed).toBe(true);
    expect(premise.wordCount).toBeGreaterThan(100);
  });

  it('has no clarity errors on the archetype screen', async () => {
    const { checkStoryChoiceClarity } = await import('@plotbreak/director');
    const report = checkStoryChoiceClarity(S);
    expect(report.issues.filter((i) => i.severity === 'ERROR').map((i) => i.message)).toEqual([]);
    const field = S.setupFields.find((f) => f.kind === 'ARCHETYPE')!;
    expect(field.helpText).toMatch(/fixed|for the whole story/i);
    // Production's storyteller reads only the archetype, plus name and
    // pronouns; appearance reaches the portrait. Nothing else is worth asking.
    expect(S.setupFields.map((f) => f.id)).toEqual(['displayName', 'pronouns', 'archetype', 'appearance']);
    const tagSets = S.archetypes.map((a) => a.playstyle.join('|'));
    expect(new Set(tagSets).size).toBe(tagSets.length);
  });

  it('gives every ability a card that says its shape', () => {
    for (const a of S.abilities) {
      const effect = abilityEffect(S, a);
      expect(effect, a.id).toMatch(/rolls |always works/);
      expect(effect, a.id).toMatch(/costs /);
      expect(effect.length, a.id).toBeLessThan(120);
    }
  });

  it('uses expressions the generator draws, and short names nobody shares', () => {
    for (const c of S.characters) for (const e of c.expressions) expect(knownExpression(e), `${c.id}: ${e}`).toBe(true);
    const short = S.characters.map((c) => calledName(c).toLowerCase());
    expect(new Set(short).size).toBe(short.length);
  });

  it('writes card blurbs about story function, not job titles', () => {
    for (const c of S.characters) {
      expect(c.cardBlurb.length, c.id).toBeGreaterThan(20);
      expect(c.cardBlurb.toLowerCase()).not.toBe(c.role.toLowerCase());
    }
  });

  it('tells the writer what each ending means, and never ends before it has been a story', () => {
    for (const e of S.endings) {
      expect(e.condition.length, e.id).toBeGreaterThan(80);
      expect(e.epilogue.length, e.id).toBeGreaterThan(60);
      expect(e.minTurn, e.id).toBeGreaterThan(0);
    }
  });

  it('never gates something behind a flag nothing can set', () => {
    const settable = new Set<string>();
    for (const s of steps) {
      for (const f of s.rewards.flags) settable.add(f);
      for (const r of s.succeedWhenAny) for (const f of r.setsFlags) settable.add(f);
    }
    for (const e of S.worldEvents) for (const f of e.setsFlags) settable.add(f);
    const engine = (f: string) => f === 'left_the_map' || /^(met|spoke|attacked|engaged|visited|used|inspected):/.test(f);
    const dead: string[] = [];
    for (const e of S.endings) {
      for (const f of [...e.requires.flagsSet, ...e.requires.flagsUnset]) if (!settable.has(f) && !engine(f)) dead.push(`${e.id}: ${f}`);
    }
    for (const a of S.abilities) for (const f of a.requires.flagsSet) if (!settable.has(f)) dead.push(`${a.id}: ${f}`);
    for (const l of S.locations) {
      for (const c of l.connections) if (c.lockedByFlag && !settable.has(c.lockedByFlag)) dead.push(`${l.id}->${c.to}`);
    }
    for (const q of S.quests) {
      for (const f of q.discoverWhen?.flagsSet ?? []) if (!settable.has(f) && !engine(f)) dead.push(`${q.id}: ${f}`);
    }
    expect(dead).toEqual([]);
  });

  it('never offers a route that needs an ability or item nobody can have', () => {
    const grantable = new Set([
      ...S.archetypes.flatMap((a) => a.startingAbilities),
      ...S.abilities.filter((a) => a.unlockedByDefault).map((a) => a.id),
      ...steps.flatMap((s) => s.rewards.abilities),
    ]);
    const obtainable = new Set([
      ...S.archetypes.flatMap((a) => a.startingItems.map((i) => i.itemId)),
      ...S.rules.startingItems.map((i) => i.itemId),
      ...steps.flatMap((s) => s.rewards.items.map((i) => i.itemId)),
      ...S.locations.flatMap((l) => l.takeableItems.map((i) => i.itemId)),
    ]);
    for (const s of steps) {
      const handed = new Set(s.rewards.items.map((i) => i.itemId));
      for (const r of s.succeedWhenAny) {
        for (const f of r.predicate.flagsSet.filter((x) => x.startsWith('used:'))) {
          expect(grantable.has(f.slice(5)), `${s.id}/${r.routeId} needs ${f}`).toBe(true);
        }
        for (const i of r.predicate.hasItems) {
          expect(obtainable.has(i), `${s.id}/${r.routeId} needs ${i}`).toBe(true);
          expect(handed.has(i), `${s.id} demands the ${i} it hands out`).toBe(false);
        }
      }
    }
  });

  it('places everybody somewhere at the opening minute, on purpose', () => {
    const minute = S.rules.startWorldMinute % 1440;
    for (const c of S.characters) {
      const scheduled = c.schedule.some((b) => minute >= b.startMinute && minute < b.endMinute);
      expect(scheduled || c.homeLocationId !== null, c.id).toBe(true);
    }
  });

  it('offers no opening card the parser turns into a fight', async () => {
    const { RuleBasedIntentParser } = await import('@plotbreak/director');
    const parser = new RuleBasedIntentParser();
    const state = start();
    for (const card of S.openingSuggestions) {
      const intent = await parser.parse(card, { story: S, state, intentId: 'intent_card_probe', addressee: null });
      expect(intent.actions.some((a) => a.verb === 'attack'), card).toBe(false);
    }
  });
});

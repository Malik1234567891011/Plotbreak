import { describe, expect, it } from 'vitest';
import { createInitialState } from '@plotbreak/engine';
import { LIGHT } from './index.js';

/**
 * Light, held to the four things this bible names as tests rather than as
 * preferences.
 *
 * §22 — if he does not kill the bait, L does not magically receive the Kanto
 * proof. The whole product is the claim that the famous mistakes were choices,
 * and a world where refusing one changes nothing has conceded the argument.
 *
 * §58 — an explicit instruction to Mikami is obeyed, and he does not break it
 * because a famous ending needs him to. This is the single most important
 * mechanical guarantee in the world and the only way to hold it is a test.
 *
 * §20 and §77 — suspicion is per-person and there is no suspicion meter. The
 * resources here are facts in the world; who holds them is character state.
 * A single `suspicion` resource appearing later would break both sections at
 * once and would look entirely reasonable while doing it.
 *
 * §110 — the bible ships a list of failure modes, and five of them are voice
 * claims: Misa is not comic relief, Near is not a white-haired L, Mello is not
 * an angry Near, Mikami does not clone Light, and choice sets are never a
 * clever answer against an idiot canon answer. Those get read here.
 */

const start = (archetypeId = 'arch_the_game') =>
  createInitialState({
    sessionId: 'sess_light',
    story: LIGHT,
    identity: {
      displayName: 'Light Yagami',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const steps = LIGHT.quests.flatMap((q) => q.steps.map((step) => ({ quest: q.id, step })));
const stepById = (id: string) => steps.find((s) => s.step.id === id)!.step;

describe('the afternoon is an afternoon', () => {
  it('opens in the classroom with control handed over immediately', () => {
    // §5 — do not begin with lore, begin in the classroom, give control almost
    // at once. A deadline in the first hour would be the story telling him
    // something is already happening to him. Nothing is.
    expect(LIGHT.rules.startingLocationId).toBe('daikoku_classroom');
    expect(LIGHT.openingObligations).toEqual([]);
    expect(LIGHT.opening.toLowerCase()).not.toMatch(/shinigami|death god|kira/);
  });

  it('starts him knowing nothing about the supernatural', () => {
    // §14 — he does not start omniscient, and Ryuk will not volunteer what the
    // player needs. The stat that governs it starts nearly empty.
    expect(LIGHT.attributes.arcana).toBeLessThan(6);
    expect(LIGHT.attributes.mind).toBeGreaterThan(20);
    const lore = LIGHT.skills.find((s) => s.id === 'shinigami_lore')!;
    expect(lore.attribute).toBe('arcana');
  });

  it('leaves the notebook in the yard rather than in his hands', () => {
    // §5 — if he leaves it, it does not teleport into his bedroom because canon
    // needs him to have it. So it starts as something in a place.
    expect(LIGHT.rules.startingItems.map((i) => i.itemId)).not.toContain('death_note');
    const yard = LIGHT.locations.find((l) => l.id === 'daikoku_classroom')!;
    expect(yard.takeableItems.map((t) => t.itemId)).toContain('death_note');
  });

  it('offers walking away as a real route on the first step', () => {
    const first = stepById('q_note_pick_up');
    const leaving = first.succeedWhenAny.find((r) => r.setsFlags.includes('never_took_notebook'));
    expect(leaving, 'no route declines the notebook').toBeDefined();
    expect(leaving!.closesFlags).toContain('has_notebook');
  });
});

describe('the bible’s own named tests', () => {
  it('gives the broadcast four answers, one of which is finding out why', () => {
    // §22 — all four cards are real, and the fourth is the one that makes this
    // a strategy game rather than a morality quiz.
    const tailor = stepById('q_tailor_decide');
    expect(tailor.succeedWhenAny).toHaveLength(4);
    const investigate = tailor.succeedWhenAny.find((r) => r.predicate.hasItems.includes('ntv_file'));
    expect(investigate, 'cannot read the broadcast file first').toBeDefined();
  });

  it('denies L the Kanto breakthrough when the bait is refused', () => {
    // §22, stated as a mechanism: the region only enters the world if he
    // answers. Refusing closes it and nothing sets it by another route.
    const tailor = stepById('q_tailor_decide');
    const killing = tailor.succeedWhenAny.filter((r) => r.setsFlags.includes('l_knows_kanto'));
    const refusing = tailor.succeedWhenAny.filter((r) => r.closesFlags.includes('l_knows_kanto'));
    expect(killing.length, 'nothing gives L the region').toBeGreaterThan(0);
    expect(refusing.length, 'nothing denies L the region').toBeGreaterThan(0);

    // And no other route or event hands it over.
    const otherSources = steps
      .filter((s) => s.step.id !== 'q_tailor_decide')
      .flatMap((s) => s.step.succeedWhenAny)
      .filter((r) => r.setsFlags.includes('l_knows_kanto'));
    expect(otherSources, 'something else leaks the region to L').toEqual([]);
    expect(
      LIGHT.worldEvents.filter((e) => e.setsFlags.includes('l_knows_kanto')),
      'a world event leaks the region to L',
    ).toEqual([]);

    const noReaction = LIGHT.endings.find((e) => e.id === 'end_no_reaction')!;
    expect(noReaction.requires.flagsUnset).toContain('l_knows_kanto');
  });

  it('lets Raye finish, and only opens Naomi if he does not', () => {
    // §110 lists "Raye survives but Naomi follows identical canon route" as a
    // failure. She is a consequence, so her step cannot be entered otherwise.
    const raye = stepById('q_fbi_raye');
    const clearing = raye.succeedWhenAny.filter((r) => r.setsFlags.includes('cleared_by_fbi'));
    expect(clearing.length, 'nothing clears him').toBeGreaterThan(0);
    for (const route of clearing) {
      expect(route.closesFlags, `${route.routeId} leaves Naomi armed`).toContain('naomi_active');
    }
    expect(stepById('q_fbi_naomi').enterWhen?.flagsSet).toContain('naomi_active');
  });

  it('honours an explicit instruction to Mikami', () => {
    // §58. The one guarantee in this world that has to be mechanical: an
    // explicit order binds, and the binding has to be what the winning route
    // reads, or the famous ending can arrive anyway.
    const instruct = stepById('q_proxy_instruct');
    const explicit = instruct.succeedWhenAny.find((r) => r.setsFlags.includes('mikami_bound'))!;
    const vague = instruct.succeedWhenAny.find((r) => r.setsFlags.includes('mikami_improvised'))!;
    expect(explicit.closesFlags, 'an explicit order still allows improvising').toContain(
      'mikami_improvised',
    );
    expect(vague.closesFlags, 'a vague order still counts as bound').toContain('mikami_bound');

    // The ending that exists because of it reads the binding, not a guess.
    const obeys = LIGHT.endings.find((e) => e.id === 'end_mikami_obeys')!;
    expect(obeys.requires.flagsSet).toContain('mikami_bound');

    // And he says the instruction back, which is how the player can tell which
    // case they are in.
    const mikami = LIGHT.characters.find((c) => c.id === 'mikami')!;
    expect(mikami.voiceSamples.join(' ')).toMatch(/repeated it so that you know/i);
    expect(mikami.boundaries.join(' ')).toMatch(/explicit instruction/i);
  });

  it('makes saying nothing at the warehouse a real and better move', () => {
    // The last item on the §1 list. Waiting has to be available, has to be
    // distinguishable, and has to lead somewhere the announcing route cannot.
    const wait = stepById('q_yb_wait');
    const silent = wait.succeedWhenAny.find((r) => r.setsFlags.includes('waited_in_silence'))!;
    const announced = wait.succeedWhenAny.find((r) => r.setsFlags.includes('announced_early'))!;
    expect(silent.closesFlags).toContain('announced_early');
    expect(announced.closesFlags).toContain('waited_in_silence');
    expect(stepById('q_yb_outcome').enterWhen?.flagsSet).toContain('waited_in_silence');
    expect(LIGHT.endings.find((e) => e.id === 'end_i_waited')!.requires.flagsSet).toContain(
      'caught_the_swap',
    );
  });

  it('needs a proxy to exist before Near can substitute one', () => {
    // §57 and §110 — with no proxy there is nothing to watch and nothing to
    // swap, and no equivalent is invented.
    const outcome = stepById('q_yb_outcome');
    const exposed = outcome.succeedWhenAny.find((r) => r.setsFlags.includes('near_exposed_you'))!;
    expect(exposed.predicate.flagsSet).toContain('using_proxy');
  });

  it('never offers a clever answer against an idiot one', () => {
    // §110's last failure mode. Every multi-route step has at least two routes
    // that cost a resource or a relationship, so no fork is free-versus-stupid.
    for (const { step } of steps) {
      if (step.succeedWhenAny.length < 2) continue;
      const substantive = step.succeedWhenAny.filter(
        (r) =>
          r.closesFlags.length > 0 ||
          r.predicate.minRelationship.length > 0 ||
          r.predicate.hasItems.length > 0 ||
          r.predicate.flagsSet.some((f) => f.startsWith('used:')),
      );
      expect(
        substantive.length,
        `${step.id} has routes that cost nothing and close nothing`,
      ).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('there is no suspicion meter', () => {
  it('never has a resource that is somebody’s opinion of the player', () => {
    // §77. Exposure is facts that exist; belief is per-character state.
    const names = LIGHT.resources.map((r) => r.id);
    expect(names).not.toContain('suspicion');
    for (const resource of LIGHT.resources) {
      expect(
        resource.name.toLowerCase(),
        `${resource.id} reads as somebody's opinion`,
      ).not.toMatch(/suspicion|guilt|trust/);
    }
  });

  it('keeps every resource invisible', () => {
    // A morality meter is forbidden and a visible number is one by accident.
    expect(LIGHT.resources.filter((r) => r.visible).map((r) => r.id)).toEqual([]);
  });

  it('describes Exposure as material rather than as belief', () => {
    const exposure = LIGHT.resources.find((r) => r.id === 'exposure')!;
    expect(exposure.polarity).toBe('GOOD_LOW');
    expect(exposure.regenPerHour, 'facts should not decay on their own').toBe(0);
    const top = [...exposure.bands].sort((a, b) => b.upTo - a.upTo)[0]!;
    expect(top.behaviour.toLowerCase()).toMatch(/case|assembled|demonstrat/);
  });

  it('gives the three investigators different things to reason from', () => {
    // §20 and §42 — L, Soichiro and Aizawa must not be one opinion with three
    // faces, so their knowledge scopes have to actually differ.
    const scope = (id: string) =>
      new Set(LIGHT.characters.find((c) => c.id === id)!.knowledgeScope);
    const pairs: Array<[string, string]> = [
      ['l', 'soichiro'],
      ['l', 'aizawa'],
      ['soichiro', 'aizawa'],
      ['l', 'near'],
    ];
    for (const [a, b] of pairs) {
      const first = scope(a);
      const second = scope(b);
      const shared = [...first].filter((x) => second.has(x)).length;
      expect(
        shared / Math.min(first.size, second.size),
        `${a} and ${b} reason from the same material`,
      ).toBeLessThan(0.75);
    }
  });

  it('puts L’s real name beyond deduction', () => {
    const l = LIGHT.characters.find((c) => c.id === 'l')!;
    const name = l.secrets.find((s) => s.id === 'l_real_name')!;
    expect(name.visibility).toBe('CREATOR_ONLY');
    expect(name.revealHint.toLowerCase()).toMatch(/not obtainable/);
  });

  it('makes pattern the thing public violence feeds', () => {
    const firstDescending = LIGHT.resources.find((r) => r.polarity === 'GOOD_LOW')!;
    expect(firstDescending.id).toBe('pattern');
    expect(firstDescending.start).toBe(0);
  });

  it('gives resting exactly one honest thing to restore', () => {
    const restored = LIGHT.resources.filter((r) => r.polarity === 'GOOD_HIGH' && r.regenPerHour > 0);
    expect(restored.map((r) => r.id)).toEqual(['composure']);
  });
});

describe('the notebook is an object', () => {
  it('keeps the real one and the fake one as separate things', () => {
    // §12 and §110 — "warehouse notebook truth changes mid-scene" is a listed
    // failure, and the only way to make it impossible is two rows.
    const ids = LIGHT.items.map((i) => i.id);
    expect(ids).toContain('death_note');
    expect(ids).toContain('fake_note');
    const fake = LIGHT.items.find((i) => i.id === 'fake_note')!;
    expect(fake.tags).not.toContain('supernatural');
    expect(fake.attributeModifiers).toEqual({});
  });

  it('keeps pages and scraps as things with their own power', () => {
    for (const id of ['note_page', 'note_scrap']) {
      const item = LIGHT.items.find((i) => i.id === id)!;
      expect(item.tags, `${id} is not supernatural`).toContain('supernatural');
      expect(item.stackable, `${id} cannot be divided`).toBe(true);
    }
  });

  it('separates losing the memories from losing the object', () => {
    // Ownership and possession are different words and the story turns on it.
    const relinquish = LIGHT.abilities.find((a) => a.id === 'ab_relinquish')!;
    const touch = LIGHT.abilities.find((a) => a.id === 'ab_touch_to_remember')!;
    expect(relinquish.tags).toContain('memory');
    expect(touch.requires?.flagsSet).toContain('relinquished_ownership');
  });

  it('never lets a memory-less Light be written as still scheming', () => {
    // §11 and §110. The instruction has to reach the writer, so it lives in
    // director notes rather than only in a code comment.
    const give = stepById('q_memory_give_it_up');
    expect(give.directorNotes.toLowerCase()).toMatch(/sincerely/);
    expect(give.directorNotes.toLowerCase()).toMatch(/secretly evil/);
  });
});

describe('fourteen people, fourteen mouths', () => {
  const cast = LIGHT.characters;

  it('gives everybody enough samples to hold a voice', () => {
    for (const who of cast) {
      expect(who.voiceSamples.length, `${who.id} has too few samples`).toBeGreaterThanOrEqual(3);
      expect(who.speechStyle.length, `${who.id} has no speech style`).toBeGreaterThan(60);
    }
  });

  it('keeps every pair of them lexically apart', () => {
    const words = (who: (typeof cast)[number]): Set<string> =>
      new Set(
        who.voiceSamples
          .join(' ')
          .toLowerCase()
          .replace(/[^a-z’ ]/g, ' ')
          .split(/\s+/)
          .filter((w) => w.length > 4),
      );
    for (let i = 0; i < cast.length; i += 1) {
      for (let j = i + 1; j < cast.length; j += 1) {
        const a = words(cast[i]!);
        const b = words(cast[j]!);
        const shared = [...a].filter((w) => b.has(w)).length;
        expect(
          shared / Math.min(a.size, b.size),
          `${cast[i]!.id} and ${cast[j]!.id} share too much vocabulary`,
        ).toBeLessThan(0.34);
      }
    }
  });

  it('reads back each of §110’s five voice denials', () => {
    const find = (id: string) => cast.find((c) => c.id === id)!;

    // Misa is devoted and impulsive, never stupid (§36).
    expect(find('misa').voiceSamples.join(' ')).toMatch(/do you understand how much|say it properly/i);
    expect(find('misa').hiddenDrives.join(' ')).toMatch(/rather be used by him/i);

    // Near is not an L clone: he does not gamble a percentage out loud (§51).
    expect(find('near').speechStyle).toMatch(/no percentages/i);
    expect(find('near').voiceSamples.join(' ')).not.toMatch(/per cent|percent/i);
    // L does.
    expect(find('l').voiceSamples.join(' ')).toMatch(/per cent/i);

    // Mello is not an angry Near: he moves on partial information (§52).
    expect(find('mello').voiceSamples.join(' ')).toMatch(/don’t need the whole picture/i);

    // Mikami thinks like Light, which is his strength and his weakness (§56).
    expect(find('mikami').role.toLowerCase()).toMatch(/exactly what he is (explicitly )?told/);
    expect(find('mikami').speechStyle).toMatch(/deference/i);

    // Ryuk has no stake and does not meme-spam (§15).
    expect(find('ryuk').voiceSamples.join(' ')).toMatch(/I have a seat|don’t have a stake/i);
  });

  it('gives Ryuk the ending in advance, as flavour', () => {
    const ryuk = LIGHT.characters.find((c) => c.id === 'ryuk')!;
    const told = ryuk.secrets.find((s) => s.id === 'ryuk_the_ending')!;
    expect(told.revealHint.toLowerCase()).toMatch(/never sounds like a warning/);
    expect(ryuk.voiceSamples.join(' ')).toMatch(/I write your name/i);
  });

  it('makes the family warm enough to be worth losing', () => {
    for (const id of ['sayu', 'sachiko', 'soichiro']) {
      const who = LIGHT.characters.find((c) => c.id === id)!;
      expect(who.startingRelationship.affection, `${id} does not love him`).toBeGreaterThan(85);
      expect(who.homeLocationId).toBe('yagami_home');
    }
    // And the smallest ending requires having actually spent the evenings.
    const family = LIGHT.endings.find((e) => e.id === 'end_family')!;
    expect(family.requires.minRelationship.length).toBeGreaterThan(1);
  });
});

describe('the world holds together on the ground', () => {
  it('boots into a real state with every archetype', () => {
    for (const archetype of LIGHT.archetypes) {
      const state = start(archetype.id);
      expect(state.player.locationId).toBe('daikoku_classroom');
      const composure = state.player.resources.find((r) => r.id === 'composure');
      expect(composure?.current, `${archetype.id} has no composure`).toBeGreaterThan(0);
      expect(
        state.player.inventory.some((i) => i.itemId === 'school_bag'),
        `${archetype.id} has no bag`,
      ).toBe(true);
    }
  });

  it('starts with pattern and exposure at nothing at all', () => {
    const state = start();
    for (const id of ['pattern', 'exposure']) {
      const resource = state.player.resources.find((r) => r.id === id);
      expect(resource?.current, `${id} starts above zero`).toBe(0);
    }
  });

  it('keeps the endgame world closed at the start', () => {
    const open = LIGHT.locations.filter((l) => l.discoveredByDefault).map((l) => l.id);
    expect(open.sort()).toEqual(
      ['daikoku_classroom', 'gamou_prep', 'kanto_street', 'light_bedroom', 'yagami_home'].sort(),
    );
    for (const id of ['yellow_box', 'spk_hq', 'mello_mafia', 'confinement']) {
      expect(open, `${id} is open on the first afternoon`).not.toContain(id);
    }
  });

  it('leaves the briefcase in the hall rather than behind a puzzle', () => {
    const home = LIGHT.locations.find((l) => l.id === 'yagami_home')!;
    const notes = home.takeableItems.find((t) => t.itemId === 'fathers_notes')!;
    expect(notes.ownerId).toBe('soichiro');
    // It is a decision made in eleven seconds, not a lock to pick.
    expect(home.connections.some((c) => c.lockedByFlag !== null && c.to === 'light_bedroom')).toBe(
      false,
    );
  });
});

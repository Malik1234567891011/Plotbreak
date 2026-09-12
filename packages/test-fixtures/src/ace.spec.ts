import { describe, expect, it } from 'vitest';
import { createInitialState } from '@plotbreak/engine';
import { ACE } from './index.js';

/**
 * Ace, held to the three claims this world makes that nothing catalogue-wide
 * can see.
 *
 * One: **nothing famous is scheduled.** §135 says famous events are pending
 * pressures, and §136 says break means break. A world built from a famous life
 * fails in exactly one way — by quietly restoring the shape it was supposed to
 * let the player break — so every route that prevents a famous beat is checked
 * for actually closing it, and the famous ending is checked for costing a chain
 * the player has to build rather than being where a passive run lands.
 *
 * Two: **pride is the mechanism, not a stat.** §9 and §11 make the tragedy a
 * consequence of the thing that makes him worth following, so Pride is the only
 * resource here whose top band is fatal, and it has to be walkable in both
 * directions — a world where it only rises is a world with one ending.
 *
 * Three: **twelve people, twelve mouths.** The bible is specific that Ace is
 * not a cool fire guy, Luffy is not a genius, Dadan is not a sentimental
 * mother and Teach is not a silent mastermind. Those are voice claims, and a
 * voice claim that no test reads is a voice claim the next writer flattens.
 */

const start = (archetypeId = 'arch_be_worth_it') =>
  createInitialState({
    sessionId: 'sess_ace',
    story: ACE,
    identity: {
      displayName: 'Portgas D. Ace',
      pronouns: 'he/him',
      ageBand: null,
      archetypeId,
      worldKnowsAboutYou: '',
      advanced: {},
      portraitAssetId: null,
    },
  });

const steps = ACE.quests.flatMap((q) => q.steps.map((step) => ({ quest: q.id, step })));
const routes = steps.flatMap(({ quest, step }) =>
  step.succeedWhenAny.map((route) => ({ quest, step: step.id, route })),
);

describe('the opening is the opening', () => {
  it('starts him on the mountain at ten with no appointment', () => {
    // §12 — the pressure is a small boy who will not go home, and inventing a
    // clock here would be the one thing the bible forbids, which is opening
    // with Roger.
    expect(ACE.rules.startingLocationId).toBe('mt_colubo');
    expect(ACE.openingObligations).toEqual([]);
    expect(ACE.attributes.arcana).toBeLessThan(8);
  });

  it('has the two boys the opening is about scheduled where it happens', () => {
    const hour = Math.floor(ACE.rules.startWorldMinute / 60) * 60;
    for (const id of ['luffy', 'sabo']) {
      const who = ACE.characters.find((c) => c.id === id);
      const block = who?.schedule.find((b) => b.startMinute <= hour && b.endMinute > hour);
      expect(block, `${id} is not scheduled anywhere at the opening hour`).toBeDefined();
    }
  });

  it('names nobody in the opening prose who is not in the world', () => {
    const named = ACE.opening.match(/\b[A-Z][a-z]{2,}\b/g) ?? [];
    const known = new Set([
      ...ACE.characters.flatMap((c) => c.name.split(/[\s.]+/)),
      ...ACE.locations.flatMap((l) => l.name.split(/\s+/)),
      'Ace',
      'He',
      'You',
      'It',
      'Up',
      'Look',
      'Eleven',
      'Yesterday',
      'Walking',
      'Leaving',
      'Death',
    ]);
    const strangers = named.filter((w) => !known.has(w));
    expect(strangers, `opening names ${strangers.join(', ')}`).toEqual([]);
  });
});

describe('nothing famous is scheduled', () => {
  it('keeps every famous beat behind a predicate that can stop being true', () => {
    // The five pressures §135 names, each of which must be a quest with a
    // discovery condition rather than an event on a clock.
    for (const id of ['q_sabo_departure', 'q_whitebeard', 'q_teach', 'q_marineford']) {
      const quest = ACE.quests.find((q) => q.id === id);
      expect(quest, `${id} missing`).toBeDefined();
      expect(quest!.discoverWhen, `${id} is unconditional`).not.toBeNull();
      expect(quest!.startsActive, `${id} starts active`).toBe(false);
    }
  });

  it('puts nothing famous on a timestamp', () => {
    // `worldEvents` is for what happens to the world regardless of Ace. A
    // famous decision on a clock is the rail this world exists to not be.
    for (const event of ACE.worldEvents) {
      expect(
        event.requiresFlags.length + event.cancelledByFlags.length,
        `${event.id} fires on time alone with nothing able to stop it`,
      ).toBeGreaterThan(0);
    }
  });

  it('closes the drowning when Sabo is kept alive, rather than re-arming it', () => {
    // §136 — if Sabo lives, nothing kills him another way.
    const sea = steps.find((s) => s.step.id === 'q_sabo_sea')!.step;
    const saving = sea.succeedWhenAny.filter((r) => r.setsFlags.includes('sabo_alive'));
    expect(saving.length, 'no route keeps him alive').toBeGreaterThan(0);
    for (const route of saving) {
      expect(route.closesFlags, `${route.routeId} does not close the drowning`).toContain('sabo_dead');
    }
    // And the world event that picks him out of the water cannot fire on a run
    // where he never went in.
    const picked = ACE.worldEvents.find((e) => e.id === 'we_sabo_picked_up')!;
    expect(picked.requiresFlags).toContain('sabo_dead');
  });

  it('cancels the whole execution apparatus when he is talked down at the rail', () => {
    // §79 — if Ace does not chase Teach there is no Banaro inevitability, and
    // the war over his execution must not assemble by another route.
    const scheduled = ACE.worldEvents.find((e) => e.id === 'we_execution_scheduled')!;
    expect(scheduled.cancelledByFlags).toContain('listened_to_whitebeard');
    expect(scheduled.requiresFlags).toContain('ace_captured');

    const listened = routes.find((r) => r.route.setsFlags.includes('listened_to_whitebeard'))!;
    expect(listened.route.closesFlags).toContain('ace_captured');
  });

  it('makes the famous ending a chain rather than a default', () => {
    const famous = ACE.endings.find((e) => e.id === 'end_fire_fist')!;
    expect(famous.rarity).not.toBe('COMMON');
    expect(famous.requires.flagsSet).toContain('ace_freed');
    expect(famous.requires.flagsSet).toContain('turned_back_at_akainu');
    expect(famous.minTurn).toBeGreaterThan(50);

    // And the alternative to it is not a lesser ending.
    const ran = ACE.endings.find((e) => e.id === 'end_i_ran')!;
    expect(ran.condition.toLowerCase()).toContain('not cowardice');
  });

  it('leaves somewhere to arrive without ever leaving the island', () => {
    // Four quiet endings exist so that a player who spends the story on a
    // mountain with two boys has arrived rather than failed.
    const homebound = ACE.endings.filter(
      (e) =>
        e.requires.flagsSet.includes('stayed_on_dawn_island') ||
        e.requires.flagsSet.includes('asl_brotherhood'),
    );
    expect(homebound.length).toBeGreaterThanOrEqual(2);
    const dawn = ACE.endings.find((e) => e.id === 'end_dawn_island')!;
    expect(dawn.condition.toLowerCase()).toContain('must not be written as a failure');
  });

  it('never requires the fruit to reach an ending', () => {
    // §46 — a run where he never eats it is a legitimate major AU, which is
    // only true if no destination silently assumes Fire Fist exists.
    const fireGated = ACE.endings.filter((e) => e.requires.flagsSet.includes('ate_mera_mera'));
    expect(fireGated.map((e) => e.id), 'an ending requires the fruit').toEqual([]);
    const noFire = ACE.endings.find((e) => e.id === 'end_no_fire')!;
    expect(noFire.requires.flagsUnset).toContain('ate_mera_mera');
  });
});

describe('pride is the mechanism', () => {
  it('is the only resource whose worst state is the top of its range', () => {
    const pride = ACE.resources.find((r) => r.id === 'pride')!;
    expect(pride.polarity).toBe('GOOD_LOW');
    expect(pride.visible).toBe(false);
    const top = [...pride.bands].sort((a, b) => b.upTo - a.upTo)[0]!;
    expect(top.upTo).toBe(100);
    // The top band has to describe dying rather than being difficult.
    expect(top.behaviour.toLowerCase()).toMatch(/\bdie\b|\bdeath\b|\bkilled\b/);
  });

  it('can be walked down as well as up', () => {
    const spends = ACE.abilities.filter((a) =>
      a.costs.some((c) => c.resourceId === 'pride' && c.amount < 0),
    );
    const raises = ACE.abilities.filter((a) =>
      a.costs.some((c) => c.resourceId === 'pride' && c.amount > 0),
    );
    expect(spends.length, 'nothing lowers pride').toBeGreaterThan(0);
    expect(raises.length, 'nothing raises pride').toBeGreaterThan(0);
  });

  it('gives resting exactly one honest thing to restore', () => {
    // A world where nothing regenerates tells the player they slept and
    // changes nothing.
    const restored = ACE.resources.filter((r) => r.polarity === 'GOOD_HIGH' && r.regenPerHour > 0);
    expect(restored.map((r) => r.id)).toEqual(['fuel']);
  });

  it('sends public violence to the bounty rather than to his character', () => {
    // The generic cost path and PUBLIC_VIOLENCE both take the first GOOD_LOW in
    // array order, so which resource is first is a design decision.
    const firstDescending = ACE.resources.find((r) => r.polarity === 'GOOD_LOW')!;
    expect(firstDescending.id).toBe('notoriety');
  });

  it('makes the climax a set of actions rather than a set of feelings', () => {
    // §133 — Ace choices are active, not three introspections. Every route out
    // of the provocation is an ability the player used.
    const provocation = steps.find((s) => s.step.id === 'q_mf_provocation')!.step;
    expect(provocation.succeedWhenAny.length).toBe(4);
    for (const route of provocation.succeedWhenAny) {
      expect(
        route.predicate.flagsSet.some((f) => f.startsWith('used:')),
        `${route.routeId} is not something the player did`,
      ).toBe(true);
    }
  });

  it('lets Worth rise from evidence rather than from reassurance', () => {
    const worth = ACE.resources.find((r) => r.id === 'worth')!;
    expect(worth.polarity).toBe('GOOD_HIGH');
    expect(worth.regenPerHour).toBe(0);
    // Standing in front of somebody moves it. Nothing anybody says does.
    const movers = ACE.abilities.filter((a) => a.costs.some((c) => c.resourceId === 'worth'));
    expect(movers.length).toBeGreaterThan(0);
  });
});

describe('twelve people, twelve mouths', () => {
  const cast = ACE.characters;

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
        const overlap = shared / Math.min(a.size, b.size);
        expect(
          overlap,
          `${cast[i]!.id} and ${cast[j]!.id} share ${Math.round(overlap * 100)}% of their vocabulary`,
        ).toBeLessThan(0.34);
      }
    }
  });

  it('demonstrates the bible’s specific denials in the samples the writer reads', () => {
    // Each of these is the bible saying "do not reduce him to". A denial that
    // lives only in a comment is a denial the next writer does not see.
    const find = (id: string) => cast.find((c) => c.id === id)!;

    // Luffy's intelligence is emotional certainty, not cleverness (§22).
    expect(find('luffy').voiceSamples.join(' ')).toMatch(/keep up|I got up|walk the same way/i);
    // Dadan is family through action and cannot say so (§27).
    expect(find('dadan').voiceSamples.join(' ')).toMatch(/didn’t cook it for you|wasn’t worried/i);
    // Whitebeard wants nothing (§60).
    expect(find('whitebeard').voiceSamples.join(' ')).toMatch(/don’t want the One Piece|wanted a family/i);
    // Teach is loud and sincere, not a silent mastermind (§74).
    expect(find('teach').voiceSamples.join(' ')).toMatch(/zehahaha|dreams never end/i);
    // Marco names the pride out loud, bored (§69).
    expect(find('marco').voiceSamples.join(' ')).toMatch(/never take anyone with you/i);
    // Garp cannot say the important thing in the important sentence (§30).
    expect(find('garp').voiceSamples.join(' ')).toMatch(/don’t ask me that|couldn’t think of anywhere/i);
  });

  it('gives everybody something to want, fear and refuse', () => {
    for (const who of cast) {
      expect(who.goals.length, `${who.id} wants nothing`).toBeGreaterThan(0);
      expect(who.fears.length, `${who.id} fears nothing`).toBeGreaterThan(0);
      // Akainu is the one character with nothing he will not do, which is the
      // characterisation rather than an omission.
      if (who.id !== 'akainu') {
        expect(who.boundaries.length, `${who.id} refuses nothing`).toBeGreaterThan(0);
      }
    }
  });

  it('never writes the shinigami-free cast as knowing things they cannot', () => {
    // §33 — nothing hands Ace a memory of Rouge. Only people who were there or
    // hold paper can tell him, so nobody else has her in scope.
    const knowsRouge = cast.filter((c) => c.knowledgeScope.includes('rouge'));
    expect(knowsRouge.map((c) => c.id)).toEqual(['garp']);
  });
});

describe('the world holds together on the ground', () => {
  it('boots into a real state with every archetype', () => {
    for (const archetype of ACE.archetypes) {
      const state = start(archetype.id);
      expect(state.player.locationId).toBe('mt_colubo');
      const pride = state.player.resources.find((r) => r.id === 'pride');
      expect(pride?.current, `${archetype.id} has no pride`).toBeGreaterThan(0);
      for (const entry of ACE.rules.startingItems) {
        expect(
          state.player.inventory.some((i) => i.itemId === entry.itemId),
          `${archetype.id} did not receive ${entry.itemId}`,
        ).toBe(true);
      }
    }
  });

  it('keeps the late world out of a ten-year-old’s reach', () => {
    const openAtStart = ACE.locations.filter((l) => l.discoveredByDefault).map((l) => l.id);
    expect(openAtStart).toEqual(
      expect.arrayContaining(['mt_colubo', 'dadan_house', 'asl_treehouse', 'gray_terminal']),
    );
    for (const id of ['moby_dick_deck', 'banaro', 'impel_down', 'marineford_platform']) {
      expect(openAtStart, `${id} is reachable at ten`).not.toContain(id);
    }
  });

  it('never puts the platform one step from anywhere ordinary', () => {
    // The execution is not a place you travel to. Only the cell reaches it.
    const inbound = ACE.locations
      .filter((l) => l.connections.some((c) => c.to === 'marineford_platform'))
      .map((l) => l.id);
    // The battlefield connects back because they are two views of one plaza.
    // What must not be true is that anywhere ordinary reaches it.
    expect(inbound.sort()).toEqual(['impel_down', 'marineford_battlefield']);
  });

  it('puts the record somewhere a player has to go and get it', () => {
    const holder = ACE.locations.find((l) =>
      l.takeableItems.some((t) => t.itemId === 'roger_record'),
    );
    expect(holder?.id).toBe('dadan_house');
    // And it belongs to her, so taking it is a different act from finding it.
    const entry = holder!.takeableItems.find((t) => t.itemId === 'roger_record')!;
    expect(entry.ownerId).toBe('dadan');
  });
});

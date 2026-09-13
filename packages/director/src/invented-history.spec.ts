import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { createInitialState } from '@plotbreak/engine';
import type { GameState } from '@plotbreak/contracts';
import { findInventedHistory } from './invented-history.js';

/**
 * Ace, turns 12 to 17, which is where this was found.
 *
 * The player swung at Sabo and missed — `Strike Sabo · Hard · FAILURE`, no
 * damage, no mutation saying otherwise. The next three beats built an injury
 * out of it anyway, and each one read the last as established.
 */

const state = (): GameState =>
  createInitialState({
    sessionId: 's', story: ACE,
    identity: {
      displayName: 'Ace', pronouns: 'he/him', ageBand: null,
      archetypeId: ACE.archetypes[0]!.id, worldKnowsAboutYou: '', advanced: {}, portraitAssetId: null,
    },
  });

const narration = (text: string) => [{ type: 'NARRATION', text, speakerId: null }];

const find = (text: string, s: GameState = state(), memoryText: string[] = []) =>
  findInventedHistory(narration(text), { story: ACE, state: s, memoryText, playerName: 'Ace' });

/** A live fight in which Sabo has actually been hit. */
function fighting(hurt: 'sabo' | 'player' | 'none'): GameState {
  const s = state();
  s.encounter = {
    ...(s.encounter ?? {}),
    encounterId: 'enc1', objective: 'Settle it', round: 1, activeEntityId: 'player',
    turnOrder: ['player', 'sabo'], environmentalAffordances: [], escapeCondition: '',
    surrenderAllowed: true,
    zones: [{ id: 'near', label: 'Close quarters', adjacentTo: [] }],
    participants: [
      {
        entityId: 'player', kind: 'PLAYER', team: 'ALLY', initiative: 10,
        health: hurt === 'player' ? 6 : 20, maxHealth: 20, zoneId: 'near', statuses: [], downed: false,
      },
      {
        entityId: 'sabo', kind: 'NPC', team: 'ENEMY', initiative: 8,
        health: hurt === 'sabo' ? 6 : 20, maxHealth: 20, zoneId: 'near', statuses: [], downed: false,
      },
    ],
  } as GameState['encounter'];
  return s;
}

describe('a miss does not become a landed hit', () => {
  it('catches the beats that grew an injury out of a failed attack', () => {
    const s = fighting('none');
    for (const text of [
      'He’s got a split lip from earlier—your doing—and there’s no room for joking, not after you landed the last hit.',
      'You can see the print of your last hit on his jaw—a flush already bruising.',
      'The memory of your last fight is between you, recent enough the bruise is still coming up.',
    ]) {
      const hits = find(text, s);
      expect(hits.length, text).toBeGreaterThan(0);
      expect(hits[0]!.subject, text).toContain('Sabo');
    }
  });

  it('says nothing once the hit actually landed', () => {
    const s = fighting('sabo');
    expect(find('You can see the print of your last hit on his jaw. Sabo does not grin back.', s)).toEqual([]);
  });

  it('leaves the player’s own injuries alone when the player has taken damage', () => {
    const s = fighting('player');
    expect(find('He jabs straight in, catching you in the ribs, and you are winded.', s)).toEqual([]);
  });

  it('does not flag a scar the author wrote into the character', () => {
    // Nothing in Ace's cast is authored with a wound, so this is asserted the
    // other way: an authored mark makes the same sentence legal.
    const story = {
      ...ACE,
      characters: ACE.characters.map((c) =>
        c.id === 'sabo' ? { ...c, appearance: `${c.appearance} A long scar and a badly healed wound over one eye.` } : c,
      ),
    };
    const hits = findInventedHistory(narration('Sabo turns, and the old wound over his eye catches the light.'), {
      story, state: state(), memoryText: [], playerName: 'Ace',
    });
    expect(hits).toEqual([]);
  });

  it('accepts an injury the memories carry', () => {
    expect(
      find('Sabo is still favouring his ribs.', state(), ['You broke two of Sabo’s ribs on the cliff path.']),
    ).toEqual([]);
  });
});

describe('a promise nobody made', () => {
  it('catches an oath with no obligation on the books', () => {
    expect(find('“You promised me a ship,” he says, not looking at you.').length).toBeGreaterThan(0);
    expect(find('You swore you would not leave without him.').length).toBeGreaterThan(0);
  });

  it('says nothing when the run is actually carrying one', () => {
    const s = state();
    s.obligations = [
      {
        id: 'o1', what: 'Meet Sabo at the cliff before dark', kind: 'APPOINTMENT', status: 'OPEN',
        withCharacterId: 'sabo', dueWorldMinute: 900, budgetMinutes: null, createdTurn: 3,
      },
    ];
    expect(find('You promised him you would be there.', s)).toEqual([]);
  });
});

describe('ordinary prose is left alone', () => {
  it('does not read a fight that is happening now as a fight that happened before', () => {
    const s = fighting('none');
    for (const text of [
      'Sabo sets his feet and raises the pipe.',
      'The cicadas are shrieking overhead, louder than any seven-year-old could ever be.',
      'He looks at you like a rival, not a friend.',
      'You feel your blood up.',
    ]) {
      expect(find(text, s), text).toEqual([]);
    }
  });
});

describe('it holds in French', () => {
  it('catches the same invention in French prose', () => {
    const s = fighting('none');
    expect(find('Sabo a la lèvre fendue — c’est toi qui l’as fait.', s)[0]?.subject).toContain('Sabo');
    expect(find('« Tu as promis un navire », dit-il sans te regarder.', s).length).toBeGreaterThan(0);
  });

  it('says nothing when the hit landed', () => {
    expect(find('Sabo a la lèvre fendue.', fighting('sabo'))).toEqual([]);
  });
});

/**
 * The exact sentences that grew a forty-turn injury out of a clean miss.
 *
 * Turn 2 of the eighty-turn session resolved `Strike Sabo · FAILURE` and the
 * engine's own fact was **"Your strike misses Sabo."** Turn 3's beat then said
 * Sabo was "still rubbing the spot where your last swing caught him", and every
 * later beat built on that: a gouge in his sleeve, a nearly-broken nose, blood
 * on his shirt, a knockdown, and by turn 28 a tooth Ace had broken.
 *
 * None of it had an event. The guard existed and did not catch these, because
 * the phrasings are possessive — *your swing caught him* rather than *you hit
 * him* — and were not in the pattern.
 */
describe('a miss stays a miss, however the sentence is arranged', () => {
  it('catches the possessive phrasings the first version missed', () => {
    const s = fighting('none');
    for (const text of [
      'Sabo is still rubbing the spot where your last swing caught him.',
      'His hand is pressed flat over the gouge you left in his sleeve earlier.',
      'Your last blow landed harder than you meant it to.',
      'The mark of your swing is coming up along his jaw.',
    ]) {
      expect(find(text, s).length, text).toBeGreaterThan(0);
    }
  });

  it('still says nothing once a blow has actually landed', () => {
    const s = fighting('sabo');
    expect(find('Sabo is still rubbing the spot where your last swing caught him.', s)).toEqual([]);
  });
});

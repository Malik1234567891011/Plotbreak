import { describe, expect, it } from 'vitest';
import { burnedOpeners, findSpeechTics, stripOpener } from './speech-tics.js';

/**
 * Measured over twenty turns of Ace: Sabo opened seventeen of twenty-one lines
 * with "Look," and Luffy twenty of twenty-two with "Ace!". Neither is in the
 * character's voice samples. The context window grew both.
 */

const line = (speakerId: string, text: string) => ({ type: 'DIALOGUE', text, speakerId });
const said = (speakerId: string, ...texts: string[]) => texts.map((text) => ({ speakerId, text }));

describe('a voice that has collapsed into one word', () => {
  it('catches the third time, not the first', () => {
    const history = said('sabo', 'Look, nobody checks the gate.');
    expect(findSpeechTics([line('sabo', 'Look, you are not listening.')], history)).toEqual([]);

    const twice = said('sabo', 'Look, nobody checks the gate.', 'Look, I said no.');
    expect(findSpeechTics([line('sabo', 'Look, you are not listening.')], twice)).toHaveLength(1);
  });

  it('catches the vocative version', () => {
    const history = said('luffy', 'Ace! I got up.', 'Ace! Do it again.');
    const tics = findSpeechTics([line('luffy', 'Ace! You can’t run faster than me!')], history);
    expect(tics).toHaveLength(1);
    expect(tics[0]!.opener).toBe('ace');
  });

  it('keeps each speaker’s habit to themselves', () => {
    const history = said('sabo', 'Look, nobody checks.', 'Look, I said no.');
    expect(findSpeechTics([line('luffy', 'Look, meat!')], history)).toEqual([]);
  });

  it('catches a beat that opens two of its own lines the same way', () => {
    const history = said('sabo', 'Look, nobody checks.', 'Look, I said no.');
    const tics = findSpeechTics(
      [line('sabo', 'Look, you are not listening.'), line('sabo', 'Look, I mean it.')],
      history,
    );
    expect(tics).toHaveLength(2);
  });

  it('says nothing about narration or the player', () => {
    const history = said('sabo', 'Look, nobody checks.', 'Look, I said no.');
    expect(
      findSpeechTics(
        [
          { type: 'NARRATION', text: 'Look, the light is going.', speakerId: null },
          line('player', 'Look, I am going anyway.'),
        ],
        history,
      ),
    ).toEqual([]);
  });
});

describe('the repair takes the tic, not the line', () => {
  it('removes a filler opener and keeps the sentence', () => {
    expect(stripOpener('Look, you are not listening to me.', ['Ace'])).toBe(
      'You are not listening to me.',
    );
    expect(stripOpener('Écoute, personne ne surveille la porte.', ['Ace'])).toBe(
      'Personne ne surveille la porte.',
    );
  });

  it('removes direct address when it is only address', () => {
    expect(stripOpener('Ace! You can’t run faster than me!', ['Ace', 'Sabo'])).toBe(
      'You can’t run faster than me!',
    );
  });

  it('matches the name people actually use, not the one on the record', () => {
    // Ace's protagonist is "Portgas D. Ace" and Luffy calls him "Ace". The
    // first version compared the whole string and stripped none of the twenty
    // lines that opened with it.
    expect(stripOpener('Ace! I’m coming. You said keep up.', ['Portgas D. Ace'])).toBe(
      'I’m coming. You said keep up.',
    );
    expect(stripOpener('Dadan! Get down here.', ['Curly Dadan'])).toBe('Get down here.');
  });

  it('leaves a line that is only the name', () => {
    expect(stripOpener('Ace.', ['Ace'])).toBe('Ace.');
  });

  it('leaves an opener that is doing work', () => {
    expect(stripOpener('Nobody checks the gate before noon.', ['Ace'])).toBe(
      'Nobody checks the gate before noon.',
    );
    expect(stripOpener('No, listen. You didn’t pick your father.', ['Ace'])).toBe(
      'No, listen. You didn’t pick your father.',
    );
  });
});

/**
 * The repair strips a tic after the fact, which fixes the line and leaves the
 * habit. Telling the writer which openers are spent is the half that stops it
 * being written.
 */
describe('openers a character has already spent', () => {
  const nameOf = (id: string) => ({ sabo: 'Sabo', luffy: 'Monkey D. Luffy' })[id] ?? id;

  it('reports an opener used twice, per character', () => {
    const spent = burnedOpeners(
      [...said('sabo', 'Look, nobody checks.', 'Look, I said no.'), ...said('luffy', 'Ace! I got it.')],
      nameOf,
    );
    expect(spent['Sabo']).toContain('look');
    expect(spent['Monkey D. Luffy']).toBeUndefined();
  });

  it('keeps one character’s habit off another', () => {
    const spent = burnedOpeners(said('sabo', 'Look, nobody checks.', 'Look, I said no.'), nameOf);
    expect(Object.keys(spent)).toEqual(['Sabo']);
  });

  it('says nothing when nobody has a habit yet', () => {
    expect(burnedOpeners(said('sabo', 'Look, nobody checks.'), nameOf)).toEqual({});
  });
});

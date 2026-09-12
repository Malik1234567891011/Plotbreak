import { describe, expect, it } from 'vitest';
import { ACE } from '@plotbreak/test-fixtures';
import { heroFramePrompt } from './prompts.js';

/**
 * Nine of thirteen hero frames in the forty-turn Ace run were wrong.
 *
 * Not stylistically — the style was fine throughout. They drew a different
 * place, or a different person, or the same person twice. Every one of those
 * traces back to something the prompt was never told.
 */

const character = (id: string) => ACE.characters.find((c) => c.id === id)!;

const promptFor = (over: Partial<Parameters<typeof heroFramePrompt>[0]> = {}) =>
  heroFramePrompt({
    story: ACE,
    locationId: 'mt_colubo',
    presentCharacters: [character('luffy'), character('sabo')],
    absentCharacters: [character('dadan'), character('garp')],
    shotType: 'TWO_SHOT',
    turnId: 't1',
    sceneFacts: ['You tell Sabo what you actually meant.'],
    player: {
      name: 'Portgas D. Ace',
      appearance: ACE.protagonist.description,
      condition: 'unhurt',
      carrying: ['The Pipe'],
    },
    timeOfDay: 'morning',
    ...over,
  }).prompt;

describe('the frame knows where it is', () => {
  it('names the location, not only its art direction', () => {
    // "Bright dense green, hard tropical daylight" describes a forest and does
    // not say which one. Turns 12, 13 and 33 drew Dadan's camp for beats set
    // on the mountain.
    expect(promptFor()).toContain('Mount Colubo');
  });
});

describe('the frame knows who is in it', () => {
  it('closes the cast list', () => {
    const prompt = promptFor();
    expect(prompt).toContain('ONLY these characters appear');
    expect(prompt).toContain('Nobody else is in the picture');
  });

  it('names who must not appear', () => {
    // `activeCharacterIds` on turn 13 was ["luffy","sabo","dadan"] while the
    // player was on the mountain and Dadan was down at the house. She was
    // drawn. Naming her as absent is what keeps her out.
    const prompt = promptFor();
    expect(prompt).toContain('must NOT appear');
    expect(prompt).toContain('Curly Dadan');
  });

  it('forbids drawing anybody twice', () => {
    // Turns 25 and 26 each contain two Luffys.
    expect(promptFor()).toContain('Never draw the same character twice');
  });
});

describe('the frame knows who the player is', () => {
  it('names and describes the protagonist', () => {
    const prompt = promptFor();
    expect(prompt).toContain('Portgas D. Ace');
    expect(prompt).toContain('Ten. Wiry, freckled');
  });

  it('separates the player from the cast standing next to them', () => {
    // The over-the-shoulder figure was drawn as Luffy on three frames, twice
    // with Luffy also in shot.
    expect(promptFor()).toContain('is NOT any of the characters listed above');
    expect(promptFor()).toContain('must not be drawn wearing');
  });

  it('pins the protagonist to this story’s version of them', () => {
    // Turn 20 drew ten-year-old Ace as his adult self, tattoo and hat included.
    const prompt = promptFor();
    expect(prompt).toContain('no other era or version of this character');
    expect(prompt).toContain('insignia they are known for at any other point');
  });

  it('says nothing about a player it was given nothing about', () => {
    const prompt = promptFor({ player: undefined });
    expect(prompt).not.toContain('is NOT any of the characters listed above');
  });
});

describe('the frame knows what is happening', () => {
  it('states the moment when there is one', () => {
    expect(promptFor()).toContain('This frame is of this moment specifically');
  });

  it('still closes the cast when there is no cast', () => {
    // Turn 20 sent an empty cast and the generator invented three people.
    const prompt = promptFor({ presentCharacters: [] });
    expect(prompt).toContain('No named character is in this frame');
  });
});

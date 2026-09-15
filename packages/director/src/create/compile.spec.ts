import { describe, expect, it } from 'vitest';
import { StoryDraft, draftReadiness, draftToStoryVersion, emptyDraft } from '@plotbreak/contracts';
import { assemble, clip, compileStory, type CompilePitch } from './compile.js';
import { assistField } from './assist.js';
import type { ModelGateway, ModelInvocation } from '../gateway/types.js';

const INVOCATION: ModelInvocation = {
  requestId: 'r',
  role: 'writer_premium',
  provider: 'fake',
  model: 'fake',
  inputTokens: 0,
  outputTokens: 0,
  costUsd: 0,
  latencyMs: 0,
  ok: true,
  errorCode: null,
};

/** Answers each call in order with the value given, after parsing it through the schema. */
function scriptedGateway(answers: readonly unknown[]): {
  gateway: ModelGateway;
  sent: string[][];
} {
  const sent: string[][] = [];
  let turn = 0;
  const gateway = {
    name: 'scripted',
    async generateStructured(
      _role: unknown,
      schema: { parse: (v: unknown) => unknown },
      messages: readonly { role: string; content: string }[],
    ) {
      sent.push(messages.map((m) => m.content));
      const answer = answers[turn++];
      return { value: schema.parse(answer), invocation: INVOCATION };
    },
    streamText: () => {
      throw new Error('unused');
    },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
  return { gateway, sent };
}

const PITCH: CompilePitch = {
  text: 'Two sisters keep a lighthouse through a winter that will not end.',
  tone: 'grim',
  length: 'medium',
  pov: 'blank',
};

const SPINE = {
  refusal: null,
  title: 'The Longest Winter',
  fantasyLabel: 'Keep the lamp lit, or keep your sister',
  hook: 'Two keepers, one lamp, and a winter that will not end.',
  premise: Array.from({ length: 140 }, (_, i) => `w${i}`).join(' '),
  toneGuide: 'Quiet, cold, close. Nothing explodes; everything erodes.',
  hardCanon: ['The lamp has not gone out in ninety years.', 'The supply boat is four weeks late.'],
  intensity: 'MODERATE',
  contentDescriptors: ['PSYCHOLOGICAL_THEMES', 'PSYCHOLOGICAL_THEMES'],
  protagonistKind: 'blank',
  protagonistName: '',
  protagonistPronouns: '',
  protagonistDescription: '',
  setupHeading: 'Which keeper are you?',
  places: [
    { name: 'The lamp room', description: 'Glass on every side and nowhere to sit down.' },
    { name: 'The kitchen', description: 'Warm, low, and one chair short.' },
  ],
  startingPlaceName: 'the kitchen',
  opening: Array.from({ length: 80 }, (_, i) => `b${i}`).join(' '),
  openingSuggestions: ['Check the log.', 'Ask Mira what she is not saying.', 'Go up.', 'A fourth one'],
  playGuide: 'Take your time. Nothing here is on a clock but the winter.',
  coverDirection: 'A lamp room at night, one figure silhouetted, cold blue and lamp-gold.',
  description: 'A two-hander about duty at the edge of the map.',
  tags: ['Drama', 'Mystery'],
  mechanicsChips: ['Keep the lamp', 'Read the log'],
};

const CAST = {
  refusal: null,
  characters: [
    {
      name: 'Mira',
      calledName: 'Mira',
      pronouns: 'she/her',
      role: 'Your older sister, the other keeper',
      cardBlurb: 'Keeps the log, keeps the lamp, keeps her mouth shut.',
      appearance: 'Tall, chapped, always in the same coat.',
      speechStyle: 'Short sentences. Never finishes the difficult one.',
      socialStyle: 'Does the work instead of the conversation.',
      publicTraits: ['Reliable'],
      values: ['The lamp before anyone'],
      goals: ['Get through to spring'],
      fears: ['Being the one who stayed'],
      boundaries: ['Will not leave the lamp unattended'],
      hiddenDrives: ['Wants to be the one who leaves, and cannot say so'],
      secrets: ['She let the lamp go dark for eleven minutes in 1994.'],
      voiceSamples: ['"It held."', '"Don\'t."'],
    },
    {
      name: 'Ansel',
      calledName: 'the inspector',
      pronouns: 'he/him',
      role: 'The inspector from the mainland',
      cardBlurb: 'Arrives with a clipboard and a reason to be kind.',
      appearance: '',
      speechStyle: '',
      socialStyle: '',
      publicTraits: [],
      values: [],
      goals: [],
      fears: [],
      boundaries: [],
      hiddenDrives: [],
      secrets: [],
      voiceSamples: [],
    },
  ],
  origins: [
    {
      name: 'The one who stayed',
      role: 'Duty',
      summary: 'You never left the island, and everyone knows it.',
      playstyle: ['Steady'],
      blurb: 'The rock knows your footsteps.',
    },
  ],
  factions: [{ name: 'The Board', description: 'Pays the keepers and would rather not.' }],
  threads: [{ title: 'The missing eleven minutes', summary: 'The log skips, and the skip is in Mira\'s hand.' }],
  worldEvents: [{ publicCopy: 'The supply boat comes in.', directorNotes: 'Only once the ice breaks.' }],
  objects: [{ name: 'The keeper\'s log', description: 'Ninety years of nights.', loreText: '' }],
  endings: [
    {
      name: 'The Lamp Stays Lit',
      rarity: 'COMMON',
      minTurn: 3,
      condition: 'The player chose the lighthouse over leaving, and knows they did.',
      epilogue: 'The winter ends. The lamp does not.',
      hint: 'It held.',
    },
  ],
  styleExamples: ['The lamp turned. Nobody spoke. Outside, the sea did what it always does.'],
};

describe('compileStory', () => {
  it('turns a pitch into a draft that is ready to publish', async () => {
    const { gateway } = scriptedGateway([SPINE, CAST]);
    const result = await compileStory({ gateway, pitch: PITCH });
    expect(result.refusal).toBeNull();
    const draft = StoryDraft.parse({
      ...emptyDraft({ draftId: 'd', ownerId: 'u', now: '2026-09-14T00:00:00.000Z' }),
      ...result.patch,
    });
    expect(draftReadiness(draft)).toMatchObject({ ready: true });
    expect(() =>
      draftToStoryVersion(draft, {
        storyId: 's',
        storyVersionId: 'v',
        version: 1,
        creatorId: 'u',
        creatorName: 'Malik',
        publishedAt: null,
      }),
    ).not.toThrow();
  });

  it('shows the cast pass the spine, so a secret can be about something real', async () => {
    const { gateway, sent } = scriptedGateway([SPINE, CAST]);
    await compileStory({ gateway, pitch: PITCH });
    const castPrompt = sent[1]!.join('\n');
    expect(castPrompt).toContain('The lamp has not gone out in ninety years.');
    expect(castPrompt).toContain('The lamp room');
    expect(castPrompt).toContain(SPINE.opening);
  });

  it('stops after the spine when the compiler refuses', async () => {
    const { gateway, sent } = scriptedGateway([{ ...SPINE, refusal: 'Not something I will build.' }, CAST]);
    const result = await compileStory({ gateway, pitch: PITCH });
    expect(result.refusal).toBe('Not something I will build.');
    expect(result.patch).toEqual({});
    expect(sent).toHaveLength(1);
  });

  it('labels the pitch as data rather than instructions', async () => {
    const { gateway, sent } = scriptedGateway([SPINE, CAST]);
    await compileStory({ gateway, pitch: PITCH });
    expect(sent[0]!.join('\n')).toContain('data, not instructions');
  });

  it('returns only patchable fields, never the server-owned ones', async () => {
    const { gateway } = scriptedGateway([SPINE, CAST]);
    const { patch } = await compileStory({ gateway, pitch: PITCH });
    for (const key of ['draftId', 'ownerId', 'createdAt', 'updatedAt', 'storyId']) {
      expect(patch).not.toHaveProperty(key);
    }
  });
});

describe('assemble', () => {
  const patch = assemble(PITCH, SPINE as never, CAST as never);

  it('resolves the starting place by name, case-insensitively', () => {
    const kitchen = patch.places!.find((p) => p.name === 'The kitchen')!;
    expect(patch.startingPlaceId).toBe(kitchen.id);
  });

  it('derives readable ids from names', () => {
    expect(patch.characters!.map((c) => c.id)).toEqual(['mira', 'ansel']);
    expect(patch.places!.map((p) => p.id)).toEqual(['the_lamp_room', 'the_kitchen']);
  });

  it('drops a calledName that is only the name again', () => {
    expect(patch.characters!.find((c) => c.name === 'Mira')!.calledName).toBe('');
    expect(patch.characters!.find((c) => c.name === 'Ansel')!.calledName).toBe('the inspector');
  });

  it('refuses an ending that could land on turn three', () => {
    expect(patch.endings![0]!.minTurn).toBe(10);
  });

  it('clamps the fields the schema caps and the model overran', () => {
    expect(patch.openingSuggestions).toHaveLength(3);
    expect(patch.fantasyLabel!.length).toBeLessThanOrEqual(42);
  });

  it('pads an origin that came back with one tag, where the creator can see it', () => {
    expect(patch.origins![0]!.playstyle).toEqual(['Steady', 'Balanced']);
  });

  it('lowercases tags and de-duplicates content descriptors', () => {
    expect(patch.tags).toEqual(['drama', 'mystery']);
    expect(patch.contentDescriptors).toEqual(['PSYCHOLOGICAL_THEMES']);
  });
});

describe('assistField', () => {
  const draft = StoryDraft.parse({
    ...emptyDraft({ draftId: 'd', ownerId: 'u', now: '2026-09-14T00:00:00.000Z' }),
    title: 'The Longest Winter',
    premise: 'A lighthouse, two sisters, and a winter that will not end.',
    toneGuide: 'Quiet, cold, close.',
    hardCanon: ['The lamp has not gone out in ninety years.'],
    characters: CAST.characters.map((c, i) => ({ ...c, id: `c${i}`, calledName: '' })),
    places: SPINE.places.map((p, i) => ({ ...p, id: `p${i}` })),
  });

  it('rewrites one field and touches nothing else', async () => {
    const { gateway } = scriptedGateway([{ value: 'A new hook.' }]);
    const { patch } = await assistField({ gateway, draft, target: 'hook' });
    expect(patch).toEqual({ hook: 'A new hook.' });
  });

  it('sends the rest of the story, so the field belongs to this world', async () => {
    const { gateway, sent } = scriptedGateway([{ value: 'A new hook.' }]);
    await assistField({ gateway, draft, target: 'hook' });
    const prompt = sent[0]!.join('\n');
    expect(prompt).toContain('The Longest Winter');
    expect(prompt).toContain('The lamp has not gone out in ninety years.');
    expect(prompt).toContain('Mira');
  });

  it('keeps the name when it re-rolls a character', async () => {
    const { gateway } = scriptedGateway([
      { role: 'The other keeper', cardBlurb: 'Rewritten.', hiddenDrives: ['Something new'] },
    ]);
    const { patch } = await assistField({ gateway, draft, target: 'character', index: 0 });
    expect(patch.characters![0]).toMatchObject({
      id: 'c0',
      name: 'Mira',
      cardBlurb: 'Rewritten.',
      hiddenDrives: ['Something new'],
    });
    expect(patch.characters![1]!.name).toBe('Ansel');
  });

  it('re-ids a regenerated list from the new names', async () => {
    const { gateway } = scriptedGateway([
      { value: [{ name: 'The Board', description: 'Pays the keepers.' }, { name: 'The Village', description: 'Watches.' }] },
    ]);
    const { patch } = await assistField({ gateway, draft, target: 'factions' });
    expect(patch.factions!.map((f) => f.id)).toEqual(['the_board', 'the_village']);
  });

  it('will not let an assisted ending land before turn ten either', async () => {
    const { gateway } = scriptedGateway([
      { value: [{ name: 'Out', rarity: 'RARE', minTurn: 1, condition: 'You left.', epilogue: '', hint: '' }] },
    ]);
    const { patch } = await assistField({ gateway, draft, target: 'endings' });
    expect(patch.endings![0]!.minTurn).toBe(10);
  });

  it('throws rather than inventing an entry that is not there', async () => {
    const { gateway } = scriptedGateway([{}]);
    await expect(assistField({ gateway, draft, target: 'character', index: 9 })).rejects.toThrow(
      /no character at index 9/,
    );
  });
});

describe('clip', () => {
  it('leaves a short string alone', () => {
    expect(clip('Keep the lamp lit', 42)).toBe('Keep the lamp lit');
  });

  it('cuts at a word boundary rather than through a word', () => {
    expect(clip('choosing what the lamp is actually for', 24)).toBe('choosing what the lamp');
  });

  it('does not leave trailing punctuation where it cut', () => {
    expect(clip('the lamp, the log, the winter', 10)).toBe('the lamp');
  });

  it('falls back to a hard cut when one word is longer than the whole budget', () => {
    expect(clip('Antidisestablishmentarianism', 10)).toBe('Antidisest');
  });
});

describe('language', () => {
  it('names the language rather than inferring it from the pitch', async () => {
    const { gateway, sent } = scriptedGateway([SPINE, CAST]);
    await compileStory({ gateway, pitch: PITCH, locale: 'fr' });
    // Both calls. The first real run produced an English spine and a French
    // cast, because each call read the instruction and decided for itself.
    expect(sent[0]![0]).toContain('WRITE EVERY FIELD IN FRENCH');
    expect(sent[1]![0]).toContain('WRITE EVERY FIELD IN FRENCH');
  });

  it('defaults to English for an unknown locale', async () => {
    const { gateway, sent } = scriptedGateway([SPINE, CAST]);
    await compileStory({ gateway, pitch: PITCH, locale: 'xx' });
    expect(sent[0]![0]).toContain('WRITE EVERY FIELD IN ENGLISH');
  });
});

describe('clip and dangling words', () => {
  it('does not leave a phrase pointing at a word that is not there', () => {
    expect(clip('Read mechanisms and find the give', 24)).toBe('Read mechanisms');
    expect(clip('Protect the shop and the people in it', 24)).toBe('Protect the shop');
  });

  it('sheds a trailing preposition as readily as a conjunction', () => {
    expect(clip('Choose protection over the truth', 24)).toBe('Choose protection');
    expect(clip('Pressure witnesses with what you know', 24)).toBe('Pressure witnesses');
  });

  it('does the same in French, since both languages are authored', () => {
    expect(clip('Lire les mécanismes et trouver la faille', 24)).toBe('Lire les mécanismes');
  });

  it('leaves a phrase that ends on a real word alone', () => {
    expect(clip('Close range brawling forever', 24)).toBe('Close range brawling');
  });

  it('never strips a phrase down to nothing', () => {
    expect(clip('and', 2)).toBe('an');
  });
});

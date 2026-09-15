import { describe, expect, it } from 'vitest';
import { StoryVersion } from '../game/story.js';
import {
  draftReadiness,
  padPlaystyle,
  draftToStoryVersion,
  emptyDraft,
  StoryDraft,
  StoryDraftPatch,
  type StoryDraft as Draft,
} from './draft.js';

const NOW = '2026-09-14T10:00:00.000Z';

function filled(overrides: Partial<Draft> = {}): Draft {
  const base = emptyDraft({ draftId: 'd1', ownerId: 'u1', now: NOW });
  return StoryDraft.parse({
    ...base,
    title: 'The Longest Winter',
    fantasyLabel: 'Keep the lamp lit, or keep your sister',
    hook: 'Two keepers, one lamp, and a winter that will not end.',
    premise: Array.from({ length: 70 }, (_, i) => `word${i}`).join(' '),
    toneGuide: 'Quiet, cold, close. Nothing explodes; everything erodes.',
    hardCanon: ['The lamp has never gone out in ninety years.'],
    characters: [
      {
        id: 'mira',
        name: 'Mira',
        calledName: '',
        pronouns: 'she/her',
        role: 'Your older sister, the other keeper',
        cardBlurb: 'Keeps the log, keeps the lamp, keeps her mouth shut.',
        appearance: '',
        speechStyle: '',
        socialStyle: '',
        publicTraits: [],
        values: [],
        goals: [],
        fears: [],
        boundaries: [],
        hiddenDrives: ['Wants to be the one who leaves, and cannot say so'],
        secrets: ['She let the lamp go dark for eleven minutes in 1994.'],
        voiceSamples: [],
      },
      {
        id: 'ansel',
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
    places: [
      { id: 'lamp_room', name: 'The lamp room', description: 'Glass on every side and no way to sit down.' },
      { id: 'kitchen', name: 'The kitchen', description: 'Warm, low, and one chair short.' },
    ],
    startingPlaceId: 'lamp_room',
    opening: Array.from({ length: 60 }, (_, i) => `beat${i}`).join(' '),
    openingSuggestions: ['Check the log.', 'Ask Mira about the inspector.'],
    endings: [
      {
        id: 'lamp_stays_lit',
        name: 'The Lamp Stays Lit',
        rarity: 'COMMON',
        minTurn: 10,
        condition: 'The player chose the lighthouse over leaving, and knows they did.',
        epilogue: 'The winter ends. The lamp does not.',
        hint: '',
      },
    ],
    description: 'A two-hander about duty at the edge of the map.',
    tags: ['drama'],
    ...overrides,
  });
}

describe('StoryDraft', () => {
  it('starts empty and parseable', () => {
    const draft = emptyDraft({ draftId: 'd1', ownerId: 'u1', now: NOW });
    expect(draft.title).toBe('');
    expect(draft.characters).toEqual([]);
    expect(draft.visibility).toBe('PRIVATE');
    expect(draft.recommendedTier).toBe('VIVID');
  });

  it('accepts a partial patch without the server-owned fields', () => {
    const patch = StoryDraftPatch.parse({ title: 'New name', tags: ['drama'] });
    expect(patch).toEqual({ title: 'New name', tags: ['drama'] });
    expect(StoryDraftPatch.safeParse({ ownerId: 'someone-else' }).success).toBe(false);
  });
});

describe('draftReadiness', () => {
  it('blocks an empty draft on every required step', () => {
    const readiness = draftReadiness(emptyDraft({ draftId: 'd1', ownerId: 'u1', now: NOW }));
    expect(readiness.ready).toBe(false);
    expect(readiness.blockedSteps).toEqual([
      'profile',
      'world',
      'cast',
      'places',
      'opening',
      'endings',
      'publish',
    ]);
  });

  it('passes a filled draft', () => {
    expect(draftReadiness(filled())).toMatchObject({ ready: true, issues: [] });
  });

  it('names the character that is missing a role', () => {
    const draft = filled();
    const broken = { ...draft, characters: [{ ...draft.characters[1]!, role: '' }, draft.characters[0]!] };
    const readiness = draftReadiness(broken);
    expect(readiness.ready).toBe(false);
    expect(readiness.issues).toContainEqual({ step: 'cast', code: 'character_role_missing', index: 0 });
  });

  it('rejects a starting place that is not one of the places', () => {
    const readiness = draftReadiness(filled({ startingPlaceId: 'nowhere' }));
    expect(readiness.issues).toContainEqual({ step: 'places', code: 'starting_place_unset' });
  });

  it('rejects an opening nobody could read as a scene', () => {
    expect(draftReadiness(filled({ opening: 'You wake up.' })).issues).toContainEqual({
      step: 'opening',
      code: 'opening_too_short',
    });
  });

  it('requires two tags on an origin so the cards can be compared', () => {
    const readiness = draftReadiness(
      filled({
        origins: [
          { id: 'keeper', name: 'The Keeper', role: 'Duty', summary: 'You stayed.', playstyle: ['Steady'], blurb: '' },
        ],
      }),
    );
    expect(readiness.issues).toContainEqual({ step: 'opening', code: 'origin_needs_two_tags', index: 0 });
  });
});

describe('draftToStoryVersion', () => {
  const options = {
    storyId: 's1',
    storyVersionId: 'sv1',
    version: 1,
    creatorId: 'u1',
    creatorName: 'Malik',
    publishedAt: NOW,
  };

  it('produces something the StoryVersion contract accepts', () => {
    const story = draftToStoryVersion(filled(), options);
    expect(StoryVersion.safeParse(story).success).toBe(true);
    expect(story.official).toBe(false);
    expect(story.creatorName).toBe('Malik');
    expect(story.rules.startingLocationId).toBe('lamp_room');
  });

  it('carries the private half of a character through', () => {
    const story = draftToStoryVersion(filled(), options);
    const mira = story.characters.find((c) => c.id === 'mira')!;
    expect(mira.hiddenDrives).toEqual(['Wants to be the one who leaves, and cannot say so']);
    expect(mira.secrets).toEqual([
      {
        id: 'mira_secret_1',
        fact: 'She let the lamp go dark for eleven minutes in 1994.',
        visibility: 'NPC_PRIVATE',
        revealHint: '',
      },
    ]);
  });

  it('keeps calledName only when it differs from nothing', () => {
    const story = draftToStoryVersion(filled(), options);
    expect(story.characters.find((c) => c.id === 'ansel')!.calledName).toBe('the inspector');
    expect(story.characters.find((c) => c.id === 'mira')!.calledName).toBeUndefined();
  });

  it('falls back to the first place when no starting place is set', () => {
    const story = draftToStoryVersion(filled({ startingPlaceId: null }), options);
    expect(story.rules.startingLocationId).toBe('lamp_room');
  });

  it('puts world events far enough out that the clock never reaches one on its own', () => {
    const story = draftToStoryVersion(
      filled({
        worldEvents: [
          { id: 'storm', publicCopy: 'The storm arrives.', directorNotes: 'Only if the lamp is unattended.' },
        ],
      }),
      options,
    );
    expect(story.worldEvents[0]!.atWorldMinute).toBeGreaterThan(60 * 24 * 300);
  });

  it('pads an origin up to the two tags the card needs', () => {
    const story = draftToStoryVersion(
      filled({
        origins: [
          { id: 'keeper', name: 'The Keeper', role: 'Duty', summary: 'You stayed.', playstyle: ['Steady'], blurb: 'x' },
        ],
      }),
      options,
    );
    expect(story.archetypes[0]!.playstyle.length).toBeGreaterThanOrEqual(2);
  });

  it('turns a thread into a quest with a step, because the contract needs one', () => {
    const story = draftToStoryVersion(
      filled({ threads: [{ id: 'the_log', title: 'The log', summary: 'Eleven minutes are missing.' }] }),
      options,
    );
    expect(story.quests[0]!.steps).toHaveLength(1);
    expect(story.quests[0]!.steps[0]!.playerCopy).toBe('Eleven minutes are missing.');
  });

  it('marks every authored object as a quest item, since ordinary scenery is not authored', () => {
    const story = draftToStoryVersion(
      filled({ objects: [{ id: 'the_log', name: 'The keeper\'s log', description: 'Ninety years of nights.', loreText: '' }] }),
      options,
    );
    expect(story.items[0]!.questItem).toBe(true);
  });

  it('carries the play guide and the style examples onto the rules', () => {
    const story = draftToStoryVersion(
      filled({ playGuide: 'Take your time.', styleExamples: ['The lamp turned. Nobody spoke.'] }),
      options,
    );
    expect(story.rules.playGuide).toBe('Take your time.');
    expect(story.rules.styleExamples).toEqual(['The lamp turned. Nobody spoke.']);
  });
});


describe('padPlaystyle', () => {
  it('keeps tags that fit', () => {
    expect(padPlaystyle(['Close range', 'Hard to move'])).toEqual(['Close range', 'Hard to move']);
  });

  it('throws away a tag that would have to be cut, rather than shipping half of one', () => {
    expect(padPlaystyle(['Close range', 'Pursue legal contradictions and gaps'])).toEqual([
      'Close range',
      'Balanced',
    ]);
  });

  it('never leaves fewer than two, because four cards nobody can compare is four nobody reads', () => {
    expect(padPlaystyle([]).length).toBe(2);
    expect(padPlaystyle(['Steady'])).toEqual(['Steady', 'Balanced']);
  });

  it('never gives more than four', () => {
    expect(padPlaystyle(['a', 'b', 'c', 'd', 'e']).length).toBe(4);
  });
});

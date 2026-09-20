import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { localizeStory, registerWorldText, type StoryVersion } from '@plotbreak/contracts';
import { tierFor, translatableFields, translateStory } from './translate.js';
import type { ModelGateway } from '../gateway/types.js';

const story = LAUNCH_CATALOG[0] as StoryVersion;

/** Answers every batch by echoing the paths back with a marker. */
function echoGateway(transform: (text: string) => string = (t) => `[fr] ${t}`): ModelGateway {
  return {
    name: 'echo',
    async generateStructured(_role: unknown, _schema: unknown, messages: readonly { content: string }[]) {
      const payload = JSON.parse(messages[messages.length - 1]!.content) as {
        fields: { path: string; text: string | string[] }[];
      };
      return {
        value: {
          fields: payload.fields.map((field) => ({
            path: field.path,
            text: Array.isArray(field.text) ? field.text.map(transform) : transform(field.text),
          })),
        },
        invocation: {},
      };
    },
    streamText: () => {
      throw new Error('unused');
    },
    embed: async () => [],
    moderate: async () => ({ flagged: false, categories: [], playerFacingMessage: null }),
  } as unknown as ModelGateway;
}

describe('what is translatable', () => {
  it('classifies a field by where it sits, not by what it says', () => {
    expect(tierFor('title')).toBe('A');
    expect(tierFor('characters.juno.speechStyle')).toBe('A');
    expect(tierFor('characters.juno.hiddenDrives')).toBe('B');
    // Tier C, and the interesting one: a prompt for an image model trained on
    // English. Translating it costs money and makes the art worse.
    expect(tierFor('locations.lamp_room.artDirection')).toBeNull();
    expect(tierFor('rules.startingLocationId')).toBeNull();
  });

  it('never offers a proper noun for translation', () => {
    const paths = translatableFields(story).map((f) => f.path);
    expect(paths.some((p) => /^characters\.[^.]+\.name$/.test(p))).toBe(false);
    expect(paths.some((p) => /^characters\.[^.]+\.calledName$/.test(p))).toBe(false);
    // …while the role, which is a description rather than a name, does travel.
    expect(paths.some((p) => /^characters\.[^.]+\.role$/.test(p))).toBe(true);
  });

  it('addresses list members by id so a reordered cast keeps its voices', () => {
    const paths = translatableFields(story).map((f) => f.path);
    const character = paths.find((p) => p.startsWith('characters.'));
    expect(character).toBeDefined();
    // `characters.juno.speechStyle`, never `characters.0.speechStyle`.
    expect(character).not.toMatch(/^characters\.\d+\./);
  });

  it('finds real prose in a real world', () => {
    const fields = translatableFields(story);
    expect(fields.length).toBeGreaterThan(20);
    expect(fields.every((f) => f.source.length > 0)).toBe(true);
    expect(fields.some((f) => f.path === 'title')).toBe(true);
  });
});

describe('translating a world', () => {
  it('produces an overlay that localizeStory can apply', async () => {
    const { overlay, missing } = await translateStory({
      gateway: echoGateway(),
      story,
      from: 'en',
      to: 'fr',
    });
    expect(missing).toEqual([]);
    expect(overlay.text['title']).toContain('[fr]');

    // Registered under the version id, which is what the repository does for a
    // player-made world.
    registerWorldText('fr', { storyId: story.id, text: overlay.text });
    const french = localizeStory(story, 'fr');
    expect(french.title).toContain('[fr]');
    // Names never travel, whatever the overlay says.
    expect(french.characters[0]!.name).toBe(story.characters[0]!.name);
    // And the cover picks up its localised variant.
    expect(french.coverImage).toBe(`${story.coverImage}.fr`);
  });

  it('keeps a list a list', async () => {
    const { overlay } = await translateStory({ gateway: echoGateway(), story, from: 'en', to: 'fr' });
    const lists = Object.entries(overlay.text).filter(([, value]) => Array.isArray(value));
    expect(lists.length).toBeGreaterThan(0);
    // A list that comes back as one string renders as a paragraph where a
    // bulleted set of facts should be.
    for (const [, value] of lists) expect(Array.isArray(value)).toBe(true);
  });

  it('reports a field whose shape changed rather than storing it', async () => {
    const gateway = {
      ...echoGateway(),
      async generateStructured(_role: unknown, _schema: unknown, messages: readonly { content: string }[]) {
        const payload = JSON.parse(messages[messages.length - 1]!.content) as {
          fields: { path: string; text: string | string[] }[];
        };
        return {
          // Everything flattened to a string, lists included.
          value: {
            fields: payload.fields.map((f) => ({ path: f.path, text: 'flat' })),
          },
          invocation: {},
        };
      },
    } as unknown as ModelGateway;

    const { overlay, missing } = await translateStory({ gateway, story, from: 'en', to: 'fr' });
    expect(missing.length).toBeGreaterThan(0);
    for (const [, value] of Object.entries(overlay.text)) expect(typeof value).toBe('string');
  });

  it('survives a batch that fails, and says which paths it lost', async () => {
    let call = 0;
    const gateway = {
      ...echoGateway(),
      async generateStructured(_role: unknown, _schema: unknown, messages: readonly { content: string }[]) {
        call += 1;
        if (call === 1) throw new Error('provider fell over');
        const payload = JSON.parse(messages[messages.length - 1]!.content) as {
          fields: { path: string; text: string | string[] }[];
        };
        return {
          value: {
            fields: payload.fields.map((f) => ({
              path: f.path,
              text: Array.isArray(f.text) ? f.text.map((t) => `[fr] ${t}`) : `[fr] ${f.text}`,
            })),
          },
          invocation: {},
        };
      },
    } as unknown as ModelGateway;

    const { overlay, missing } = await translateStory({ gateway, story, from: 'en', to: 'fr' });
    // The lost batch's paths are named, and everything else still landed.
    expect(missing.length).toBeGreaterThan(0);
    expect(Object.keys(overlay.text).length).toBeGreaterThan(0);
  });

  it('applies French typography, and only to French', async () => {
    const fr = await translateStory({
      gateway: echoGateway((t) => `Vraiment ? ${t}`),
      story,
      from: 'en',
      to: 'fr',
    });
    // A narrow no-break space before the question mark.
    expect(String(fr.overlay.text['title'])).toMatch(/Vraiment[  ]\?/);

    const en = await translateStory({
      gateway: echoGateway((t) => `Really ? ${t}`),
      story,
      from: 'fr',
      to: 'en',
    });
    expect(String(en.overlay.text['title'])).toContain('Really ? ');
  });
});

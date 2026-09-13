import { describe, expect, it } from 'vitest';
import { LAUNCH_CATALOG } from './index.js';

/**
 * Authoring invariants whose violation is a bug rather than a matter of taste.
 *
 * Every one of these encodes something a playtest already found the expensive
 * way: two objects answering to the same words, a creature the storyteller had
 * to invent because nothing named it, an ability referenced by an archetype
 * that resolves to nothing. They are cheap, static, and they run without a
 * model.
 */
const stories = LAUNCH_CATALOG as unknown as any[];

describe('launch catalogue authoring', () => {
  it('never lets two different items in a story answer to the same words', () => {
    // Ace's money can and the tin under Dadan's floor both answered to "the
    // tin", and a beat put the boys' money under a floorboard.
    const collisions: string[] = [];
    for (const story of stories) {
      const owners = new Map<string, Set<string>>();
      for (const location of story.locations) {
        for (const item of location.takeableItems ?? []) {
          for (const alias of item.aka ?? []) {
            const key = String(alias).trim().toLowerCase();
            owners.set(key, (owners.get(key) ?? new Set()).add(item.itemId));
          }
        }
      }
      for (const [alias, items] of owners) {
        if (items.size > 1) collisions.push(`${story.storyId}: "${alias}" → ${[...items].join(' / ')}`);
      }
    }
    expect(collisions).toEqual([]);
  });

  it('authors hard canon for every launchable story', () => {
    // The foundational truths. Without them a session invents its own and two
    // locales disagree about what the world contains.
    const missing = stories.filter((s) => !s.rules.hardCanon?.length).map((s) => s.storyId);
    expect(missing).toEqual([]);
  });

  it('resolves every ability an archetype starts with', () => {
    const broken: string[] = [];
    for (const story of stories) {
      const abilities = new Set(story.abilities.map((a: any) => a.id));
      for (const archetype of story.archetypes) {
        for (const id of archetype.startingAbilities ?? []) {
          if (!abilities.has(id)) broken.push(`${story.storyId}: ${archetype.name} → ${id}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('resolves every item an archetype or location references', () => {
    const broken: string[] = [];
    for (const story of stories) {
      const items = new Set(story.items.map((i: any) => i.id));
      for (const archetype of story.archetypes) {
        for (const entry of archetype.startingItems ?? []) {
          if (!items.has(entry.itemId)) broken.push(`${story.storyId}: ${archetype.name} → ${entry.itemId}`);
        }
      }
      for (const location of story.locations) {
        for (const entry of location.takeableItems ?? []) {
          if (!items.has(entry.itemId)) broken.push(`${story.storyId}: ${location.id} → ${entry.itemId}`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it('gives every story at least one archetype to start from', () => {
    const empty = stories.filter((s) => !s.archetypes?.length).map((s) => s.storyId);
    expect(empty).toEqual([]);
  });

  it('keeps archetype ids unique within a story', () => {
    const dupes: string[] = [];
    for (const story of stories) {
      const ids = story.archetypes.map((a: any) => a.id);
      if (new Set(ids).size !== ids.length) dupes.push(story.storyId);
    }
    expect(dupes).toEqual([]);
  });
});

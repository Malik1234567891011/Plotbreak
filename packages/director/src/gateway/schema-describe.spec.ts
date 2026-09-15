import { describe as group, expect, it } from 'vitest';
import { z } from 'zod';
import { toJsonSchema } from './anthropic.js';

/**
 * A field description is the cheapest instruction there is, and it was being
 * silently thrown away.
 *
 * The Create compiler had careful per-field guidance — "never a genre label",
 * "42 characters, counted" — sitting beside each field where nothing could
 * read it, and the first real compile produced a fantasy label reading "Winter
 * Gothic Mystery". It looked like a prompt problem until the schema was
 * printed.
 */
group('toJsonSchema descriptions', () => {
  it('carries a description onto the property the model reads', () => {
    const schema = z.object({
      fantasyLabel: z.string().describe('What the player gets to be. Never a genre label.'),
    });
    const json = toJsonSchema(schema) as { properties: Record<string, { description?: string }> };
    expect(json.properties.fantasyLabel!.description).toBe(
      'What the player gets to be. Never a genre label.',
    );
  });

  it('finds it through .default(), which is where most of ours sit', () => {
    const schema = z.object({ hook: z.string().describe('One sentence.').default('') });
    const json = toJsonSchema(schema) as { properties: Record<string, { description?: string }> };
    expect(json.properties.hook!.description).toBe('One sentence.');
  });

  it('finds it through .optional() and .nullable() too', () => {
    const schema = z.object({
      a: z.string().describe('A.').optional(),
      b: z.string().describe('B.').nullable(),
    });
    const json = toJsonSchema(schema) as { properties: Record<string, { description?: string }> };
    expect(json.properties.a!.description).toBe('A.');
    expect(json.properties.b!.description).toBe('B.');
  });

  it('describes arrays and the objects inside them', () => {
    const schema = z.object({
      places: z
        .array(z.object({ name: z.string().describe('The place.') }).strict())
        .describe('Three to eight places.'),
    });
    const json = toJsonSchema(schema) as {
      properties: {
        places: { description?: string; items: { properties: { name: { description?: string } } } };
      };
    };
    expect(json.properties.places.description).toBe('Three to eight places.');
    expect(json.properties.places.items.properties.name.description).toBe('The place.');
  });

  it('leaves an undescribed field exactly as it was', () => {
    const json = toJsonSchema(z.object({ plain: z.string() })) as {
      properties: Record<string, Record<string, unknown>>;
    };
    expect(json.properties.plain).toEqual({ type: 'string' });
  });

  it('keeps the constraints alongside the description', () => {
    const json = toJsonSchema(
      z.object({ label: z.string().max(42).describe('42 characters or fewer.') }),
    ) as { properties: Record<string, Record<string, unknown>> };
    expect(json.properties.label).toEqual({
      type: 'string',
      maxLength: 42,
      description: '42 characters or fewer.',
    });
  });
});

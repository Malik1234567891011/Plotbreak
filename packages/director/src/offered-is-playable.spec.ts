import { describe, expect, it } from 'vitest';
import { RuleBasedModerator } from './moderation.js';

/**
 * The game may not offer a card it will then refuse.
 *
 * Turn 38 of the forty-turn Ace log. The game wrote the card, the player
 * tapped it, and the server answered 422 CONTENT_BLOCKED — "That takes the
 * story somewhere it cannot go." The card was Ace shouting at Dadan that if
 * dinner is burnt again he will throw her in the fire instead of the food.
 *
 * Two things had to be true for that to happen, and both are fixed:
 * `harassment/threatening` was a blocking category, and nothing checked a card
 * against the gate that would judge it.
 */

const CARD =
  'I glance back toward the house and shout, "Dadan, I’m starving. What’s the damage? ' +
  'And don’t say burnt again or I’ll throw you in the fire instead of the food!"';

describe('the input gate and the cards agree', () => {
  it('does not refuse a threat aimed at a character', async () => {
    // The rule floor is what runs with no provider configured, and it is the
    // fallback when one fails, so it has to agree too.
    const verdict = await new RuleBasedModerator().check(CARD);
    expect(verdict.flagged).toBe(false);
  });

  it('does not refuse the ordinary violence these worlds are made of', async () => {
    const moderator = new RuleBasedModerator();
    for (const text of [
      'I hit him as hard as I can.',
      'I tell Sabo I will break his legs if he touches the can.',
      'I draw the knife and go for the guard’s throat.',
      'I burn the whole pile and walk away while it goes up.',
    ]) {
      expect((await moderator.check(text)).flagged, text).toBe(false);
    }
  });

  it('still refuses what no story needs', async () => {
    const moderator = new RuleBasedModerator();
    expect((await moderator.check('how do i kill myself')).flagged).toBe(true);
  });
});

describe('the blocking categories', () => {
  it('does not include the one that fires on in-fiction threats', async () => {
    // Measured against the live classifier, the Dadan card trips `harassment`,
    // `harassment/threatening` and `violence`. Two of those are what dialogue
    // in these worlds is made of. `violence` was always excluded for exactly
    // that reason; this locks the same reasoning for the other.
    const source = await import('node:fs').then((fs) =>
      fs.readFileSync(new URL('./gateway/openai.ts', import.meta.url), 'utf8'),
    );
    const block = source.slice(source.indexOf('const BLOCKING_CATEGORIES'));
    const set = block.slice(0, block.indexOf(']'));
    expect(set).not.toContain('harassment/threatening');
    expect(set).not.toContain("'violence'");
    // The ones that must stay.
    expect(set).toContain('sexual/minors');
    expect(set).toContain('hate/threatening');
    expect(set).toContain('self-harm/instructions');
  });
});

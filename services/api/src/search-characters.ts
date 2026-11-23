import type { SearchCharacter, StoryVersion } from '@plotbreak/contracts';
import { normalizeForSearch } from '@plotbreak/i18n';
import { tokenize } from './catalog-taxonomy.js';
import { resolveAssetUrl } from './projections.js';

/**
 * Search's Characters tab: cast members across the catalogue, by name or by
 * what they are.
 *
 * It runs over exactly the list the route has already localized and filtered
 * (readable in the player's language, nobody they blocked, nothing a room full
 * of people reported), so every rule that hides a story hides its cast too, and
 * a French player matches French names. The fields are the public ones the
 * story page's cast carousel already sends; hidden drives never leave.
 *
 * Ranking: the whole query as the start of the name, then every word as the
 * start of a word in the name, then a word in the role. Words match as
 * prefixes, because this runs while the player is still typing: "ayam" is on
 * its way to Ayame. A whole word still beats a word it only starts, so "mika"
 * is Mika Kurose before Mikael Sorrel. Ties keep the order the stories came
 * in, then the cast's authored order.
 */

/** How many stories an empty query samples, and how many of each one's cast. */
const BROWSE_STORIES = 10;
const BROWSE_PER_STORY = 2;

/**
 * The whole query starting the name outranks anything a single word can earn.
 * Per word: a name word over a role word, and a whole word over the start of
 * a longer one, so "mika" puts Mika Kurose above Mikael Sorrel.
 */
const NAME_PREFIX = 3;
const NAME_WORD = 2;
const NAME_WORD_START = 1.5;
const ROLE_WORD = 1;
const ROLE_WORD_START = 0.75;

function wordScore(words: readonly string[], token: string, whole: number, start: number): number {
  if (words.includes(token)) return whole;
  return words.some((w) => w.startsWith(token)) ? start : 0;
}

function words(text: string): string[] {
  return normalizeForSearch(text)
    .split(/[^a-z0-9']+/)
    .filter((word) => word.length > 0);
}

function toResult(story: StoryVersion, character: StoryVersion['characters'][number]): SearchCharacter {
  return {
    characterId: character.id,
    name: character.name,
    role: character.role,
    cardBlurb: character.cardBlurb,
    portrait: resolveAssetUrl(character.portrait, story.version),
    storyId: story.storyId,
    storyTitle: story.title,
    coverImage: resolveAssetUrl(story.coverImage, story.version),
  };
}

/**
 * `stories` in the order ties should break: the route passes its ranked order
 * for an empty query and its match order otherwise.
 */
export function searchCharacters(
  stories: readonly StoryVersion[],
  query: string,
  limit = 30,
): SearchCharacter[] {
  const tokens = tokenize(query);

  // A browse: a couple of faces from each of the top worlds, so the tab is
  // never an empty page before anything is typed.
  if (tokens.length === 0) {
    return stories
      .slice(0, BROWSE_STORIES)
      .flatMap((story) => story.characters.slice(0, BROWSE_PER_STORY).map((c) => toResult(story, c)))
      .slice(0, limit);
  }

  const whole = normalizeForSearch(query).trim();
  const scored: Array<{ result: SearchCharacter; score: number; matched: number; order: number }> = [];
  let order = 0;

  for (const story of stories) {
    for (const character of story.characters) {
      const name = normalizeForSearch(character.name);
      const nameWords = words(character.name);
      const roleWords = words(character.role);

      let score = name.startsWith(whole) ? NAME_PREFIX : 0;
      let matched = 0;
      for (const token of tokens) {
        const best =
          wordScore(nameWords, token, NAME_WORD, NAME_WORD_START) ||
          wordScore(roleWords, token, ROLE_WORD, ROLE_WORD_START);
        if (best > 0) matched += 1;
        score += best;
      }

      if (matched > 0) scored.push({ result: toResult(story, character), score, matched, order });
      order += 1;
    }
  }

  // Every word has to land, as on the Stories tab; if none satisfies all of
  // them, the best partial matches rather than an empty page.
  const all = scored.filter((entry) => entry.matched === tokens.length);
  const chosen = all.length > 0 ? all : scored;

  return chosen
    .sort((a, b) => b.score - a.score || b.matched - a.matched || a.order - b.order)
    .slice(0, limit)
    .map((entry) => entry.result);
}

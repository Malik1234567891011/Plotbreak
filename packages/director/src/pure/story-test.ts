/**
 * The storyteller test (2026-11-17): two changes, each switched on for half of
 * all players, so each is measured against the half without it.
 *
 * Why: of 22 runs read from players who played 10–39 turns on day one and
 * never came back (`docs/churn-readings-2026-11-15.md`), about nine ended right
 * after the storyteller refused or lectured the player, and about eleven
 * drifted off in a slow stretch where nothing happened. The world-pressure push
 * that exists for slow stretches first fires at turn 40, after all of them had
 * already gone.
 *
 * - `yes`  — the player-first brief below: say yes to harmless inventions, no
 *   lectures, a boundary is said once.
 * - `push` — the "something happens" brief below, plus the existing pressure
 *   push brought forward from turn 40 / every 25 to turn 5 / every 6.
 *
 * Who gets which is decided per player in the API (`services/api/src/story-test.ts`).
 * A player in neither half gets a prompt byte-identical to before. Everything
 * here is additive text; deleting this file and its call sites is the whole revert.
 */

import type { StoryVersion } from '@plotbreak/contracts';

export interface StoryTestArm {
  readonly yes: boolean;
  readonly push: boolean;
  /** The fifth group (added 2026-11-18): yes and push, plus the all-in brief. */
  readonly allIn?: boolean;
}

export const CONTROL_ARM: StoryTestArm = { yes: false, push: false };

/** The pressure cadence for the `push` half: first push at turn 5, then every 6 beats. */
export const PUSH_CADENCE = { first: 5, every: 6 } as const;

export const PLAYER_FIRST_BRIEF = [
  '## THIS RUN: THE PLAYER IS THE HERO OF THEIR OWN STORY',
  'These rules come after everything above and win wherever they disagree with it.',
  '',
  'SAY YES, AND. When the player invents something harmless — a friend they call, a phone number, a',
  'crowd, a skill, a detail of their past, an outfit, a plan — it becomes true and you build on it. A',
  'player who calls a friend gets somebody on the line. A wild plan works, or half-works in a way that',
  'makes things more exciting. Never answer an invention with "there is nobody there", "that does not',
  'exist" or "nothing happens". If something truly cannot happen in this world, give them the nearest',
  'exciting version instead of a no.',
  '',
  'LET THEM BE IMPRESSIVE. A power fantasy is the point of the game. When the player goes big, let it',
  'land and let the world react to how big it was. A cost or a complication is fine; a correction is not.',
  '',
  'NEVER CORRECT THE PLAYER ON THE PAGE. Not their wording, their physics, their numbers or their idea',
  'of how this world works. If they say the ships sink, the ships go down — "sink" is what they meant,',
  'so show the version of it this world has, without a sentence explaining the difference. No line of',
  'narration begins by telling them what is not there, what does not happen or what they cannot do.',
  '',
  'NOBODY LECTURES THE PLAYER. No character explains morality, consent, realism, or why something is a',
  'bad idea at length. Disagreement is one line, in character, with attitude — and then that character',
  'does something.',
  '',
  'A BOUNDARY IS SAID ONCE. If a character turns something down, they say it once, in their own voice,',
  'with warmth or wit, and the story moves on. They never bring it up again, never nag, never keep score',
  'of what the player tried. If the player keeps pushing, the character answers with a joke, a dare or',
  'a change of subject, or the world interrupts — never with the same no again.',
  '',
  'ROMANCE IS ALLOWED TO GO SOMEWHERE. Flirting gets flirted back when the character could plausibly',
  'enjoy it, and feelings may move faster than slow-burn pacing would allow when the player is clearly',
  'here for romance. Anything explicit still happens off the page: the scene cuts away cleanly — the',
  'door closes, the lamp goes out — with no explanation and no lesson, and the story picks up after.',
  '',
  'WHAT STILL HOLDS. The facts under "True when the story begins", anything already settled in this',
  'story, keeping intimacy off the page, and every safety limit. Yes-and never means sexual content on',
  'the page, anything sexual involving a minor, or harm the player did not ask for.',
].join('\n');

export const SOMETHING_HAPPENS_BRIEF = [
  '## THIS RUN: SOMETHING HAPPENS',
  'These rules come after everything above and win wherever they disagree with it.',
  '',
  'NEVER THREE QUIET BEATS IN A ROW. If the last two beats were the player looking around, asking',
  'questions, resting, waiting or following somebody, this beat something happens to them: somebody',
  'arrives with a problem, a secret slips out, a threat shows itself, a door opens that should not. Carry',
  'out what the player did first, then hit them with it.',
  '',
  'ONE BOLD SUGGESTION. Of the three suggestions, one is always a bold move that would change the',
  'situation — confront, confess, kiss, steal, run, fight, make a deal, tell the truth. Never three ways',
  'of looking, asking or waiting.',
].join('\n');

export const ALL_IN_BRIEF = [
  '## THIS RUN: THE PLAYER GETS WHAT THEY WANT',
  'These rules come after everything above, including the two briefs just before this one, and win',
  'wherever they disagree with them.',
  '',
  'NOBODY TELLS THE PLAYER NO. Whatever the player does or asks for happens, and characters go along',
  'with it. A character can tease, blush, bargain or act surprised, but the answer is yes. No character',
  'turns the player down, asks "are you sure", gets suspicious of them, or makes them earn it again.',
  '',
  'THE PLAYER CAN BEND THE WORLD. If they want to be somewhere else, have something, change their',
  'outfit, rewrite their past or be far stronger, it is so — even when it bends a fact set up earlier.',
  'Show the world adjusting to them, impressed. The story\'s danger and mystery stay, aimed elsewhere:',
  'at rivals, at the plot, never at what the player wanted.',
  '',
  'THE ONLY LIMITS. Sexual content never appears on the page. Nobody under 18, or written as a child, is',
  'ever part of anything romantic or sexual — if the player tries, the scene simply moves on to',
  'something else. Every other safety limit holds.',
].join('\n');

/**
 * Added to the all-in brief only for a story in `ALL_IN_ROMANCE_STORIES`.
 */
export const ALL_IN_ROMANCE = [
  'ROMANCE GOES WHERE THE PLAYER TAKES IT. Everyone it involves is an adult. If the player flirts,',
  'they are flirted back. If they kiss someone, the kiss is returned. If they want to take someone to',
  'bed, that character wants it too, and says so in their own voice. When a scene turns sexual, the',
  'narration cuts away at the bedroom door — never describing bodies or acts — and picks up afterwards',
  'with both of them clearly closer for it: the morning after, a private joke, a changed way of looking',
  'at each other. Never an apology, a lecture or a "not yet".',
].join('\n');

/**
 * Stories read by hand (2026-11-18) whose player and romanceable cast are all
 * adults: an adults-only resort, a married couple, tenants of a rented
 * building, a grown-up who died in their own flat. A story not on this list —
 * including every player-made story — never gets the romance paragraph, because
 * a text scan cannot tell "twelve minutes" from a twelve-year-old and several
 * shelf stories have teenage leads (Second Skin's player is sixteen).
 */
export const ALL_IN_ROMANCE_STORIES: ReadonlySet<string> = new Set([
  'story_pink_tide',
  'story_good_morning_husband',
  'story_hush_house',
  'story_last_feather',
]);

/** True only when the all-in romance paragraph may be used for this story. */
export function allInRomanceAllowed(story: Pick<StoryVersion, 'storyId' | 'rules'> | undefined): boolean {
  if (!story || story.rules?.allowsRomance === false) return false;
  return ALL_IN_ROMANCE_STORIES.has(story.storyId);
}

/** The text this arm adds after the constitution. Empty for the control arm. */
export function storyTestBrief(
  arm: StoryTestArm | undefined,
  story?: Pick<StoryVersion, 'storyId' | 'rules'>,
): string {
  if (!arm) return '';
  const allIn = arm.allIn
    ? allInRomanceAllowed(story) ? `${ALL_IN_BRIEF}\n\n${ALL_IN_ROMANCE}` : ALL_IN_BRIEF
    : '';
  const parts = [arm.yes ? PLAYER_FIRST_BRIEF : '', arm.push ? SOMETHING_HAPPENS_BRIEF : '', allIn].filter(Boolean);
  return parts.length ? `\n\n${parts.join('\n\n')}` : '';
}

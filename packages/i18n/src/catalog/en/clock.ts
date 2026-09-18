/**
 * The story clock.
 *
 * Shown above every beat, which made it the most-read English text in a French
 * session: `formatStoryTime` built its label from literals, so a French player
 * read "Day 1 · morning" on top of French prose, every turn, in every run.
 *
 * These are keys rather than prose in the director because the label is *not*
 * the prompt — the prompt stays English on purpose, whatever language the story
 * is told in. Only the half a player reads is translated.
 */
export const clock = {
  'clock.day': 'Day {n} · {when}',
  'clock.week': 'Week {n} · {when}',
  'clock.month': 'Month {n} · {when}',
  'clock.year': 'Year {n} · {when}',

  'clock.night': 'night',
  'clock.early_morning': 'early morning',
  'clock.morning': 'morning',
  'clock.midday': 'midday',
  'clock.afternoon': 'afternoon',
  'clock.evening': 'evening',

  /** The fallback above a time skip, when the storyteller gave no phrase of its own. */
  'clock.later_minutes': '{n, plural, one {# minute later} other {# minutes later}}',
  'clock.later_hours': '{n, plural, one {# hour later} other {# hours later}}',
  'clock.later_days': '{n, plural, one {# day later} other {# days later}}',
  'clock.later_weeks': '{n, plural, one {# week later} other {# weeks later}}',
  'clock.later_months': '{n, plural, one {# month later} other {# months later}}',
  'clock.later_years': '{n, plural, one {# year later} other {# years later}}',
} as const;

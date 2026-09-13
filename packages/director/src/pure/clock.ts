/**
 * Story time.
 *
 * The storyteller decides *that* time moved and by how much; this decides what
 * the header says. Nothing here ever chooses to skip — it only does arithmetic
 * on a skip that was already narrated, which is why the clock stopped agreeing
 * with the prose in the first place: the runtime added six minutes a turn
 * regardless of whether the model had just written a night passing.
 */

export type TimeUnit = 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

/** A transition the model narrated, as it reports it. */
export interface TimeAdvance {
  readonly amount: number;
  readonly unit: TimeUnit;
  /** The words it used, when it skipped. "a few weeks later". */
  readonly phrase?: string | null;
}

const MINUTES: Record<TimeUnit, number> = {
  minutes: 1,
  hours: 60,
  days: 60 * 24,
  weeks: 60 * 24 * 7,
  // Calendar months and years are not needed to the day here, and pretending
  // otherwise would be the false precision the display is trying to avoid.
  months: 60 * 24 * 30,
  years: 60 * 24 * 365,
};

const DAY = 60 * 24;

/** How far the clock moves. Clamped: a model typo should not skip a century. */
export function minutesFor(advance: TimeAdvance | undefined): number {
  if (!advance) return DEFAULT_BEAT_MINUTES;
  const amount = Number.isFinite(advance.amount) ? Math.max(0, advance.amount) : 0;
  const minutes = Math.round(amount * (MINUTES[advance.unit] ?? 1));
  return Math.min(minutes, MINUTES.years * 20);
}

/** What a beat costs when the model says nothing about time. */
export const DEFAULT_BEAT_MINUTES = 6;

/** Whether this transition is a skip rather than the scene simply continuing. */
export function isSkip(advance: TimeAdvance | undefined): boolean {
  return minutesFor(advance) >= 60 * 3;
}

function partOfDay(minuteOfDay: number): string {
  const hour = Math.floor(minuteOfDay / 60);
  if (hour < 5) return 'night';
  if (hour < 8) return 'early morning';
  if (hour < 12) return 'morning';
  if (hour < 14) return 'midday';
  if (hour < 18) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
}

/**
 * The header string.
 *
 * Coarser the further out it goes, on purpose. "Day 412" is arithmetic nobody
 * asked for; after a couple of months the honest unit is months, and the story
 * says the rest.
 */
export function formatStoryTime(worldMinute: number): string {
  const minute = Math.max(0, Math.round(worldMinute));
  const dayIndex = Math.floor(minute / DAY);
  const when = partOfDay(minute % DAY);

  if (dayIndex < 14) return `Day ${dayIndex + 1} · ${when}`;
  if (dayIndex < 56) return `Week ${Math.floor(dayIndex / 7) + 1} · ${when}`;
  if (dayIndex < 730) return `Month ${Math.floor(dayIndex / 30) + 1} · ${when}`;
  return `Year ${Math.floor(dayIndex / 365) + 1} · ${when}`;
}

/**
 * The line shown above a beat that jumped. Null when the scene just continued,
 * so the UI only ever marks a real transition.
 */
export function transitionLabel(advance: TimeAdvance | undefined): string | null {
  if (!advance || !isSkip(advance)) return null;
  const phrase = advance.phrase?.trim();
  if (phrase) return phrase.charAt(0).toUpperCase() + phrase.slice(1);
  const plural = advance.amount === 1 ? advance.unit.replace(/s$/, '') : advance.unit;
  return `${advance.amount} ${plural} later`;
}

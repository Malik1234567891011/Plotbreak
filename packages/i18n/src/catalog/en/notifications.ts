/**
 * Reminders.
 *
 * Two of them, both scheduled on the device rather than pushed from a server:
 * the daily grant is claimable at a time the wallet already tells the client,
 * and the run somebody left unfinished is one the client already has in its
 * library. Neither needs an APNs certificate to be right.
 *
 * Copy rule for anything that lands on a lock screen: say the thing, do not
 * sell it. A notification that reads like an advertisement is the one that gets
 * the whole app's notifications turned off, and there is no second chance at
 * that permission.
 */
export const notifications = {
  /* --- Asking ------------------------------------------------------------ */

  // Our own alert, shown before the system's. iOS grants exactly one system
  // prompt per install, so "not now" here keeps that one shot rather than
  // spending it on somebody who was always going to decline.
  'notifications.ask_title': 'Want a nudge?',
  'notifications.ask_body':
    'We can tell you when your daily credits are ready, and when a story is waiting on you. Nothing else, ever.',
  'notifications.ask_yes': 'Remind me',
  'notifications.ask_no': 'Not now',

  /* --- What lands on the lock screen ------------------------------------- */

  'notifications.daily_title': 'Your daily credits are ready',
  'notifications.daily_body': '300 free credits, waiting in your wallet.',
  /** The title is the story's own name, so the body does not repeat it. */
  'notifications.story_body': 'Waiting for you to find out what happens next.',

  /* --- Settings ---------------------------------------------------------- */

  'notifications.section': 'Reminders',
  'notifications.daily_toggle': 'Daily credits',
  'notifications.daily_toggle_help': 'Once a day, when your free credits are ready to claim.',
  'notifications.story_toggle': 'Story reminders',
  'notifications.story_toggle_help': 'Once a day, about the run you left unfinished.',
  'notifications.denied': 'Notifications are turned off for Plotbreak.',
  'notifications.open_settings': 'Open Settings',
  /** The badge-credits reminder: money already earned and never collected. */
  'notifications.badges_title': 'Credits waiting in your badges',
  'notifications.badges_body': 'You have earned credits you have not collected yet. Tap to claim them.',
} as const;

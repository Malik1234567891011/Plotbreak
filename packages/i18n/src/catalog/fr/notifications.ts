/** Voir `en/notifications.ts` : les deux rappels, programmés sur l’appareil. */
export const notifications = {
  /* --- Demander ---------------------------------------------------------- */

  'notifications.ask_title': 'On te fait signe ?',
  'notifications.ask_body':
    'On peut te prévenir quand tes crédits du jour sont prêts, et quand une histoire t’attend. Rien d’autre, jamais.',
  'notifications.ask_yes': 'Préviens-moi',
  'notifications.ask_no': 'Pas maintenant',

  /* --- Ce qui arrive sur l’écran verrouillé ------------------------------ */

  'notifications.daily_title': 'Tes crédits du jour sont prêts',
  'notifications.daily_body': '300 crédits gratuits t’attendent dans ton porte-monnaie.',
  /** Le titre est le nom de l’histoire, donc le corps ne le répète pas. */
  'notifications.story_body': 'Elle attend que tu découvres la suite.',

  /* --- Réglages ---------------------------------------------------------- */

  'notifications.section': 'Rappels',
  'notifications.daily_toggle': 'Crédits du jour',
  'notifications.daily_toggle_help': 'Une fois par jour, quand tes crédits gratuits sont prêts.',
  'notifications.story_toggle': 'Rappels d’histoire',
  'notifications.story_toggle_help': 'Une fois par jour, pour la partie que tu as laissée en cours.',
  // Plotbreak is the product's name.
  // fr-lint-disable-next-line FRC002
  'notifications.denied': 'Les notifications sont désactivées pour Plotbreak.',
  'notifications.open_settings': 'Ouvrir les réglages',
} as const;

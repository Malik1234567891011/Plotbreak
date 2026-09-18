/**
 * L'horloge du récit, en français.
 *
 * `Jour 1 · matin`. Pas de majuscule sur le moment de la journée : en français
 * ce n'est pas un titre, c'est un complément.
 *
 * `matinée` plutôt que `matin` aurait été plus élégant seul, mais la ligne se
 * lit `Jour 3 · matin` et les six moments doivent avoir la même forme.
 */
export const clock = {
  'clock.day': 'Jour {n} · {when}',
  'clock.week': 'Semaine {n} · {when}',
  'clock.month': 'Mois {n} · {when}',
  'clock.year': 'An {n} · {when}',

  'clock.night': 'nuit',
  'clock.early_morning': 'petit matin',
  'clock.morning': 'matin',
  'clock.midday': 'midi',
  'clock.afternoon': 'après-midi',
  'clock.evening': 'soir',

  'clock.later_minutes': '{n, plural, one {# minute plus tard} other {# minutes plus tard}}',
  'clock.later_hours': '{n, plural, one {# heure plus tard} other {# heures plus tard}}',
  'clock.later_days': '{n, plural, one {# jour plus tard} other {# jours plus tard}}',
  'clock.later_weeks': '{n, plural, one {# semaine plus tard} other {# semaines plus tard}}',
  'clock.later_months': '{n, plural, one {# mois plus tard} other {# mois plus tard}}',
  'clock.later_years': '{n, plural, one {# an plus tard} other {# ans plus tard}}',
} as const;

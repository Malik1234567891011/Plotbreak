/**
 * Plotbreak Pass — l’abonnement hebdomadaire — et le tableau des demandes
 * d’histoires qui va avec. Voir docs/plotbreak-pass.md.
 *
 * Apple relit ce texte. La phrase de renouvellement doit dire le prix, la
 * période, que ça se renouvelle jusqu’à résiliation, et où résilier.
 */
export const pass = {
  'pass.title': 'Plotbreak Pass',
  'pass.tagline': 'Plus d’histoire, chaque jour.',
  'pass.price_week': '{price} / semaine',
  'pass.perk_daily': '+{credits} crédits bonus chaque jour, environ {count, plural, one {# tour de plus} other {# tours de plus}}',
  'pass.perk_free': 'En plus de tes crédits gratuits du jour',
  'pass.perk_requests': 'Demande une histoire et vote. La demande la plus votée du mois est réalisée.',
  'pass.cta': 'Prendre le Pass · {price}/semaine',
  'pass.legal': 'Renouvellement automatique chaque semaine à {price} jusqu’à résiliation. Résilie quand tu veux dans Réglages › ton nom › Abonnements, au moins 24 heures avant le prochain renouvellement.',
  'pass.terms': 'Conditions d’utilisation',
  'pass.privacy': 'Confidentialité',
  'pass.active': 'Pass actif',
  'pass.renews': 'Se renouvelle {when}',
  'pass.bonus_waiting': 'Tes {credits} crédits Pass du jour t’attendent. Récupère-les plus bas.',
  'pass.bonus_in': 'Tes {credits} crédits Pass du jour sont arrivés.',
  'pass.manage': 'Gérer l’abonnement',
  'pass.open_requests': 'Demandes d’histoires',
  'pass.sign_in': 'Connecte-toi pour prendre le Pass',
  'pass.welcome': 'Bienvenue dans le Pass. {credits} crédits ajoutés.',
  'pass.claim_both': 'Récupérer {free} + {bonus} crédits Pass',
  'pass.claim_bonus': 'Récupérer {bonus} crédits Pass',

  'requests.title': 'Demandes d’histoires',
  'requests.intro': 'Propose l’histoire que tu veux jouer. Les membres du Pass votent, et la demande la plus votée du mois devient une histoire Plotbreak.',
  'requests.placeholder': 'Un rōnin qui ne peut se battre que les jours de pluie…',
  'requests.submit': 'Envoyer la demande',
  'requests.sending': 'Envoi…',
  'requests.sent': 'Demande envoyée. Va chercher des votes.',
  'requests.cooldown': 'Tu pourras envoyer une autre demande {when}.',
  'requests.empty': 'Aucune demande pour l’instant. Lance-toi.',
  'requests.votes': '{count, plural, one {# vote} other {# votes}}',
  'requests.vote': 'Voter',
  'requests.voted': 'Voté',
  'requests.mine': 'La tienne',
  'requests.planned': 'En préparation',
  'requests.by': 'par {name}',
  'requests.join': 'Prends le Pass pour demander des histoires et voter',
  'requests.chars_left': '{count, plural, one {# caractère restant} other {# caractères restants}}',
} as const;

/**
 * Plotbreak Pass — the weekly subscription — and the story-request board that
 * comes with it. See docs/plotbreak-pass.md.
 *
 * Apple reviews this copy. The renewal sentence must say the price, the period,
 * that it renews until cancelled, and where to cancel; do not soften it.
 */
export const pass = {
  'pass.title': 'Plotbreak Pass',
  /** The one-line pitch under the title. */
  'pass.tagline': 'More story, every single day.',
  /** {price} is StoreKit's own localised string, e.g. "$2.99". */
  'pass.price_week': '{price} / week',
  /** {credits} is pre-formatted. {count} is the turns it buys at the default quality. */
  'pass.perk_daily': '+{credits} bonus credits every day, about {count, plural, one {# extra turn} other {# extra turns}}',
  'pass.perk_free': 'On top of your free daily credits',
  'pass.perk_requests': 'Request a story and vote. The top request each month gets made.',
  'pass.cta': 'Get the Pass · {price}/week',
  'pass.legal': 'Renews automatically every week at {price} until you cancel. Cancel anytime in Settings › your name › Subscriptions, at least 24 hours before the next renewal.',
  /** Link to the Terms of Use (EULA). The document. */
  'pass.terms': 'Terms of Use',
  'pass.privacy': 'Privacy Policy',
  'pass.active': 'Pass active',
  /** {when} is "in 5 days" or "in 3 hours". */
  'pass.renews': 'Renews {when}',
  'pass.bonus_waiting': 'Today’s {credits} Pass credits are waiting. Claim them below.',
  'pass.bonus_in': 'Today’s {credits} Pass credits are in.',
  'pass.manage': 'Manage subscription',
  'pass.open_requests': 'Story requests',
  'pass.sign_in': 'Sign in to get the Pass',
  /** After subscribing. {credits} is today's Pass credits, already added. */
  'pass.welcome': 'Welcome to the Pass. {credits} credits added.',
  /** The daily claim button for a Pass holder. Both numbers pre-formatted. */
  'pass.claim_both': 'Claim {free} + {bonus} Pass credits',
  'pass.claim_bonus': 'Claim {bonus} Pass credits',

  'requests.title': 'Story requests',
  'requests.intro': 'Pitch the story you want to play. Pass holders vote, and the most-voted request each month becomes a Plotbreak story.',
  /** An example pitch, shown greyed out in the empty text box. */
  'requests.placeholder': 'A ronin who can only fight on rainy days…',
  'requests.submit': 'Send request',
  'requests.sending': 'Sending…',
  'requests.sent': 'Request sent. Rally some votes.',
  /** {when} is "in 5 days". */
  'requests.cooldown': 'You can send another request {when}.',
  'requests.empty': 'No requests yet. Be the first.',
  'requests.votes': '{count, plural, one {# vote} other {# votes}}',
  /** Button: add your vote to this request. */
  'requests.vote': 'Vote',
  /** The same button once you have voted. */
  'requests.voted': 'Voted',
  /** Tag on a request the viewer wrote. */
  'requests.mine': 'Yours',
  /** Tag on a request we have picked to make. */
  'requests.planned': 'In the works',
  /** {name} is the requester's display name. */
  'requests.by': 'by {name}',
  'requests.join': 'Get the Pass to request stories and vote',
  'requests.chars_left': '{count, plural, one {# character left} other {# characters left}}',
} as const;

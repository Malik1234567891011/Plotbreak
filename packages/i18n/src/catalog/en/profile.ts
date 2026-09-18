/** PR-01 / PR-02 — the profile screen and every setting on it. */
export const profile = {
  'profile.title': 'Profile',
  'profile.guest': 'Guest',
  'profile.guest_explainer':
    "You're playing as a guest. Sign in to save this world and continue anywhere.",
  'profile.sign_in': 'Sign in',
  'profile.sign_out': 'Sign out',
  'profile.sign_out_confirm_title': 'Sign out?',
  'profile.gameplay': 'Gameplay',
  'profile.advanced_relationship_stats': 'Show advanced relationship stats',
  'profile.advanced_relationship_stats_hint':
    'Reveals the numbers behind Trusted, Rival, and the rest.',
  'profile.check_math': 'Show check maths',
  'profile.check_math_hint': 'Shows the roll and modifiers, where the world allows it.',
  'profile.audio_visual': 'Audio & visual',
  'profile.reduce_motion': 'Reduce motion',
  'profile.reduce_motion_hint': 'Removes parallax and non-essential animation.',
  'profile.voice_autoplay': 'Autoplay character voice',
  'profile.haptics': 'Haptics',
  'profile.privacy_safety': 'Privacy & safety',
  /** Abuse/safety reports the player filed, not a changelog. `signalements`. */
  'profile.report_history': 'Report history',
  'profile.creator_teaser': 'Making your own worlds',
  'profile.wallet': 'Wallet & purchases',
  'profile.account': 'Account',

  // The language switch. Hidden behind seven taps until step 7; see
  // DEVICE_LOCALE_AUTODETECT.
  'profile.language': 'Language',
  'profile.language_hint':
    'Applies to new stories. A story already started keeps the language it began in.',
  /** "Follow whatever the phone is set to" — not the name of a device. */
  'profile.language_device': 'Device',
  'profile.language_current': 'New stories will be in {name}.',
  /** The two switches that show the engine's working, behind a disclosure. */
  'profile.advanced_gameplay': 'Advanced gameplay',
  'profile.advanced_gameplay_hint': 'Relationship numbers and check maths',
  'profile.badges': 'Badges',
  'profile.badges_summary': '{earned} of {total} earned',
  'profile.badges_unclaimed': '{count, plural, one {# reward to collect} other {# rewards to collect}}',
  /* -- The badges screen -- */

  'badges.ready': 'Ready to collect',
  'badges.in_progress': 'In progress',
  'badges.earned': 'Earned',
  'badges.claim': 'Collect {credits}',
  'badges.claim_a11y': 'Collect {credits} credits for {title}.',
  'badges.progress': '{done} of {target}',
  'badges.guest': 'Sign in to keep the badges you earn.',
  /**
   * The gear in Profile's corner, and the screen behind it.
   *
   * Profile was doing two jobs in one scroll: who you are and what you have
   * played, mixed with account plumbing nobody opens twice.
   */
  'settings.title': 'Settings',
  'settings.my_information': 'My information',
  'settings.app_version': 'App version',
  'settings.personalization': 'What you like',
  'settings.save_preferences': 'Save',
  'settings.a11y': 'Settings',
  'profile.service': 'Service',
  'settings.account': 'Account',
  'settings.account_guest': 'Playing as a guest',
  'settings.account_unknown': 'Signed in',
  'settings.account_guest_hint': 'Sign in to keep your worlds if you change phones.',
  'settings.age_range': 'Age range',
  'settings.age_unknown': 'Not set',
  'settings.age_hint': 'You told us this once, to decide which worlds to show.',
  /** Under the name on the identity card. */
  'profile.stats_line': '{worlds, plural, one {# world} other {# worlds}} · {turns, plural, one {# turn} other {# turns}} · {badges, plural, one {# badge} other {# badges}}',
  /** The white pill on the identity card; opens the wallet. */
  'profile.add_credits': 'Add credits',
  /** Section label over Badges and Wallet. */
  'profile.benefits': 'Benefits',
  /** Row that opens Settings. */
  'profile.session_settings': 'Session settings',
  /** Row and screen title for bookmarked worlds. */
  'profile.saved_worlds': 'Saved worlds',
  /** Empty state title. */
  'profile.saved_empty_title': 'Nothing saved yet',
  /** Empty state body. */
  'profile.saved_empty_body': 'Hold a world on Discover and tap Save, and it will wait here.',
  /** Trailing note on the Badges row. */
  'profile.badges_to_collect': '{count, plural, one {# to collect} other {# to collect}}',
  /** Label over the name field in Settings. */
  'profile.display_name': 'Display name',
  'profile.blocked': 'Blocked people',
  'profile.blocked_body': 'You do not see their worlds or their comments.',
  'profile.blocked_empty': 'Nobody blocked',
  'profile.blocked_empty_body': 'Anyone you block from a story will appear here, and you can undo it.',
  'profile.blocked_unknown': 'Someone',
  'profile.unblock': 'Unblock',
  'badges.reward_a11y': 'Worth {credits} credits.',

  /* --- Badge names ---------------------------------------------------------
   *
   * The definitions in `@plotbreak/contracts` carry an English title and
   * description because a badge is content and content ships with releases.
   * These are the same words as keys, so the screen is not the one place in
   * the app that stays English — the client prefers a key and falls back to
   * the contract string for a badge whose copy has not been written yet.
   */

  'badge.first_break.title': 'First Break',
  'badge.first_break.body': 'Start your first world.',
  'badge.say_anything.title': 'Say Anything',
  'badge.say_anything.body': 'Type something of your own instead of tapping a card.',
  'badge.ten_turns.title': 'Ten Turns',
  'badge.ten_turns.body': 'Play ten turns, anywhere.',
  'badge.twenty_turns.title': 'Twenty Turns',
  'badge.twenty_turns.body': 'Play twenty turns. We will cover most of them.',
  'badge.back_for_more.title': 'Back For More',
  'badge.back_for_more.body': 'Return to a world you had left.',
  'badge.ending_found.title': 'Ending Found',
  'badge.ending_found.body': 'Reach an ending.',
  'badge.genre_hopper.title': 'Genre Hopper',
  'badge.genre_hopper.body': 'Play worlds in three different genres.',
  'badge.three_day_run.title': 'Three Day Run',
  'badge.three_day_run.body': 'Play on three different days.',
  'badge.world_hopper.title': 'World Hopper',
  'badge.world_hopper.body': 'Start five different worlds.',
  'badge.deep_in.title': 'Deep In',
  'badge.deep_in.body': 'Reach fifty turns in a single run.',
  'badge.ending_hunter.title': 'Ending Hunter',
  'badge.ending_hunter.body': 'Reach five different endings.',
  'badge.long_night.title': 'Long Night',
  'badge.long_night.body': 'Play a hundred turns in one world.',
  'badge.apex_run.title': 'No Expense Spared',
  'badge.apex_run.body': 'Play fifty turns at the very highest quality.',
  'badge.one_world_deep.title': 'Three Hundred',
  'badge.one_world_deep.body': 'Reach three hundred turns inside a single world.',
  'badge.ending_collector.title': 'Completionist',
  'badge.ending_collector.body': 'Finish twenty separate runs.',
  'badge.month_of_nights.title': 'Thirty Nights',
  'badge.month_of_nights.body': 'Play on thirty different days.',
  'badge.marathon.title': 'One Thousand',
  'badge.marathon.body': 'Play a thousand turns.',
  'badge.rare_ending.title': 'Rare Ending',
  'badge.rare_ending.body': 'Find an ending almost nobody finds.',
  'badges.secret_title': '???',
  'badges.secret_body': 'Some endings are harder to find than others.',
} as const;

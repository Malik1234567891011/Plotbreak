/** Keys for the `onboarding` area. Values are the exact strings the app shipped. */
export const onboarding = {
  /* ---------------------------------------------------------------------- */
  /* OB-01 — splash                                                         */
  /* ---------------------------------------------------------------------- */

  /**
   * Shown under the wordmark only when boot takes longer than 800ms. A status,
   * not an instruction — `Chargement…`, with the ellipsis character U+2026.
   */
  'onboarding.loading': 'Loading…',

  /* ---------------------------------------------------------------------- */
  /* OB-02 — the age gate                                                   */
  /* ---------------------------------------------------------------------- */

  /** Headline of the age gate — before you enter the app, not a building. */
  'onboarding.age_gate_title': 'Before you enter',
  'onboarding.age_gate_body':
    'Some worlds here deal with conflict, danger, and difficult choices. Tell us your age band so we can show you the right ones.',
  /**
   * The four age bands. Chip labels, so they must stay short. The ranges use
   * an en dash (U+2013) with a space either side; French keeps the same
   * digits and dash, and adds a non-breaking space if the typography calls
   * for one.
   */
  'onboarding.age_band_under_13': 'Under 13',
  'onboarding.age_band_13_17': '13 – 17',
  'onboarding.age_band_18_24': '18 – 24',
  'onboarding.age_band_25_plus': '25 or older',
  /**
   * Shown when the player picks "Under 13". PLOTBREAK is the product name and is
   * never translated. Warm, not scolding — they told the truth.
   */
  'onboarding.age_too_young':
    'PLOTBREAK is built for players aged 13 and over. Thanks for being honest with us.',
  /** Advance to the next step of onboarding. */
  'onboarding.continue': 'Continue',
  /** Link to the published privacy policy. The document, not the concept. */
  'onboarding.privacy': 'Privacy',
  /** Link to the published terms of service. Not "conditions" as in weather. */
  'onboarding.terms': 'Terms',

  /* ---------------------------------------------------------------------- */
  /* OB-03 — taste picker                                                   */
  /* ---------------------------------------------------------------------- */

  /**
   * Headline of the optional genre picker. `play` is play-a-story, the way you
   * play a game — not play music and not act a part. The full stop is part of
   * the line.
   */
  'onboarding.taste_title': "Pick anything you'd actually play.",
  /**
   * "Discover" is the name of the tab, so it travels with `nav.discover` —
   * translate the two the same way.
   */
  'onboarding.taste_body':
    'Up to five. This decides what the top of Discover shows you — nothing is hidden either way, and you can change it whenever you like. Skipping is fine.',
  /** Skip this optional step — `Passer`, not "jump" and not "skip a beat". */
  'onboarding.skip': 'Skip',
  /**
   * OB-04, the shop window. Five worlds, and a way past them.
   */
  'onboarding.showcase_title': 'Pick your first story.',
  /**
   * Design v3. The ◆ is drawn as the crystal on screen; the 600 is the
   * starting balance, a literal, as in `misc.sign_in_bonus`. Never a turn count.
   */
  'onboarding.showcase_body': 'You start with ◆600.',
  'onboarding.showcase_card_a11y': '{title}. Start this story.',
  'onboarding.see_all_stories': 'See all stories',
  /**
   * Design v3, step 1 of 3 (board OnbProfile): the age gate, asked under the
   * name as a date typed in three numbers. Only the age band is kept.
   */
  'onboarding.birthday_heading': 'And your birthday?',
  /** Under the date. "Under-13s" are the players the gate exists for. */
  'onboarding.birthday_note': 'Only used to keep under-13s safe. Nobody else sees it.',
  /** Accessible names of the three numbers, in the order the language writes a date. */
  'onboarding.birthday_month': 'Month',
  'onboarding.birthday_day': 'Day',
  'onboarding.birthday_year': 'Year',
  /** The empty numbers: two letters, two letters, four letters, as on a form. */
  'onboarding.birthday_month_short': 'MM',
  'onboarding.birthday_day_short': 'DD',
  'onboarding.birthday_year_short': 'YYYY',
  /** Beside the disabled Next, until the date is a whole one. */
  'onboarding.birthday_finish_year': 'Finish the year to go on',
  /** Beside the disabled Next, when all three are typed but name no real day. */
  'onboarding.birthday_check': 'Check the date',
  /** Advance one onboarding step. */
  'onboarding.next': 'Next',
  /** Go back one onboarding step. */
  'onboarding.previous': 'Previous',
  /** First line of the legal footer; the links follow on the next line. */
  'onboarding.legal_footer': 'By clicking continue, you agree to our',
  /** The linked document's name. */
  'onboarding.terms_of_service': 'Terms of Service',
  /** The linked document's name. */
  'onboarding.privacy_policy': 'Privacy Policy',
  /** Between the two legal links. */
  'onboarding.legal_and': 'and',
  /** Step 1 of 3 — the display name, with the birthday under it. */
  'onboarding.name_title': 'What should characters call you?',
  /** Under the title; the path names two screens the way they are labelled. */
  'onboarding.name_hint': 'They say it out loud. You can pick a different name in any story.',
  /** The empty name field. */
  'onboarding.name_placeholder': 'Your name',
  /** Accessible name of the cross in the field. */
  'onboarding.name_clear_a11y': 'Clear name',
  /** Step 2 of 3, second question. */
  'onboarding.audience_title': 'Filter by audience?',
  /** Audience radio card. */
  'onboarding.audience_male': 'Male',
  /** Audience radio card. */
  'onboarding.audience_female': 'Female',
  /** Audience radio card — no lean either way. */
  'onboarding.audience_neutral': 'Neutral',
  /** Step 2 of 3, first question. */
  'onboarding.genres_title': 'What do you like to read?',
  /** Design v3: under the genres question. Discover is the tab, by name. The cap is five. */
  'onboarding.genres_body': 'Pick up to five. Discover opens on these.',
  /** Accessible name of the progress bar. */
  'onboarding.step_a11y': 'Step {step} of {total}',
  /** Design v3: the small counter beside the step dashes, "1 of 3". */
  'onboarding.step_short': '{step} of {total}',
} as const;

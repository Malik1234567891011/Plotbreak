/**
 * Keys for Create mode — the fourth tab, where a person makes a world.
 *
 * Two registers live here and they are different jobs. The **chrome** (tabs,
 * buttons, step names) is the app talking. The **field help** is a writing
 * teacher talking: every one of those lines exists to answer "what do you
 * actually want in this box", and the answer is always concrete, because a
 * creator who is told to "describe the tone" writes an adjective and a creator
 * who is told "what the prose refuses to do" writes something usable.
 */
export const create = {
  'nav.create': 'Create',

  /* --- The dashboard ----------------------------------------------------- */

  'create.title_count': '{count, plural, one {# story} other {# stories}}',
  'create.filter_all': 'All',
  'create.filter_drafts': 'Drafts',
  'create.filter_published': 'Published',
  'create.filter_empty': 'Nothing here yet.',
  'create.new_story': 'New story',
  'create.untitled': 'Untitled story',
  'create.unnamed': 'Unnamed',
  'create.status_draft': 'Draft',
  'create.ready_to_publish': 'Ready to publish',
  'create.keep_going': 'Still being written',
  'create.metric_plays': 'plays',
  'create.metric_likes': 'likes',
  'create.metric_comments': 'comments',
  'create.edit': 'Edit',
  'create.open_story': 'Open story',
  'create.delete': 'Delete',
  'create.delete_title': 'Delete this story?',
  'create.delete_body': 'This cannot be undone.',
  'create.delete_confirm': 'Delete',
  'create.empty_title': 'Make a world',
  'create.empty_body':
    'Describe a story in a few sentences and it will be built for you — the people, the places, the things already going wrong, and the ways it can end. Then you change whatever you like.',
  'create.not_found': 'That story is not here',
  'create.not_found_body': 'It may have been deleted on another device.',

  /* --- The pitch --------------------------------------------------------- */

  'create.pitch_heading': "What's your story?",
  'create.pitch_body':
    'A few sentences is plenty. Say who is in it, where it happens, and what is already going wrong.',
  'create.pitch_placeholder':
    'Two sisters keep a lighthouse on a rock off the coast. The supply boat is weeks late, the winter will not end, and there are eleven minutes missing from the log in the older one’s handwriting.',
  'create.pitch_tone': 'Tone',
  'create.pitch_length': 'Length',
  'create.pitch_pov': 'Who do you play?',
  'create.build_story': 'Build my story',
  'create.start_empty': 'Or start from an empty story',

  'create.tone_warm': 'Warm',
  'create.tone_grim': 'Grim',
  'create.tone_funny': 'Funny',
  'create.tone_tense': 'Tense',
  'create.tone_dreamlike': 'Dreamlike',
  'create.tone_epic': 'Epic',

  'create.length_short': 'Short',
  'create.length_medium': 'Full',
  'create.length_long': 'Long',

  'create.pov_named': 'Someone the story already knows',
  'create.pov_named_body': 'A named character, with a history the world remembers.',
  'create.pov_blank': 'Yourself',
  'create.pov_blank_body': 'Players invent who they are before they start.',

  'create.compiling_title': 'Building your world',
  'create.compiling_reading': 'Reading your pitch…',
  'create.compiling_world': 'Writing the world, the places and the opening…',
  'create.compiling_cast': 'Casting the people and setting things in motion…',
  'create.compiling_finishing': 'Nearly there…',
  'create.compiling_wait':
    'This takes a minute or two. It carries on without you — leave the app, or come back later, and it will be waiting.',
  'create.refused_title': 'Not this one',

  /* --- The builder shell ------------------------------------------------- */

  'create.step_profile': 'Profile',
  'create.step_world': 'World',
  'create.step_cast': 'Cast',
  'create.step_places': 'Places',
  'create.step_opening': 'Opening',
  'create.step_pressure': 'Pressure',
  'create.step_endings': 'Endings',
  'create.step_publish': 'Publish',

  'create.previous': 'Previous',
  'create.next': 'Next',
  'create.publish': 'Publish',
  'create.update': 'Update',
  'create.saving': 'Saving…',
  'create.saved': 'Saved',
  'create.auto_generate': 'Auto-generate',
  'create.writing': 'Writing…',
  'create.needs_work': 'Before you can publish',
  'create.collapse': 'Collapse',
  'create.expand': 'Expand',
  'create.one_per_line': 'One per line',

  /* --- Fields ------------------------------------------------------------ */

  'create.f_title': 'Title',
  'create.f_title_help': 'Two to five words. Not a sentence.',
  'create.f_title_ph': 'The Longest Winter',
  'create.f_fantasy': 'The fantasy',
  'create.f_fantasy_help': 'What the player gets to be, in one line. This is the line on the card.',
  'create.f_fantasy_ph': 'Keep the lamp lit, or keep your sister',
  'create.f_hook': 'Hook',
  'create.f_hook_help': 'One sentence that makes somebody tap it. Concrete, not atmospheric.',
  'create.f_hook_ph': 'Two keepers, one lamp, and a winter that will not end.',
  'create.f_cover': 'Cover art',
  'create.f_cover_help': 'Subject, staging, palette, mood. One sentence. We draw it.',
  'create.f_cover_ph': 'A lamp room at night, one figure silhouetted, cold blue and lamp-gold.',

  'create.f_premise': 'Premise',
  'create.f_premise_help':
    '120 to 240 words. The world, the situation, and what is already under pressure. Never what the player will do.',
  'create.f_premise_ph': 'Where this happens, who is in it, and what is already going wrong.',
  'create.f_tone': 'Tone',
  'create.f_tone_help':
    'How this sounds on the page: rhythm, distance, diction, and what the prose refuses to do.',
  'create.f_tone_ph': 'Quiet, cold, close. Nothing explodes; everything erodes.',
  'create.f_canon': 'True when the story begins',
  'create.f_canon_help':
    'Facts the storyteller may never contradict. Concrete and checkable. Not what happens next.',
  'create.f_canon_ph': 'The lamp has not gone out in ninety years.',
  'create.f_intensity': 'Intensity',
  'create.f_intensity_help': 'How hard this world hits.',
  'create.intensity_light': 'Light',
  'create.intensity_moderate': 'Moderate',
  'create.intensity_intense': 'Intense',

  'create.cast_intro':
    'The people. Everything under “inner life” is the difference between a person and a catchphrase — the storyteller plays all of it, and the player only ever sees what a scene reveals.',
  'create.add_character': 'Add a character',
  'create.f_name': 'Name',
  'create.f_role': 'Role',
  'create.f_role_help': 'Their place in the story, from the player’s side of it.',
  'create.f_role_ph': 'Your older sister, the other keeper',
  'create.f_called': 'Called',
  'create.f_called_help': 'What people call them, if it is not their name.',
  'create.f_pronouns': 'Pronouns',
  'create.f_blurb': 'Cast card line',
  'create.f_blurb_help': 'One line, the way the world would introduce them.',
  'create.f_appearance': 'Looks',
  'create.f_speech': 'Speaks',
  'create.f_speech_help': 'Length, register, and what they never say.',
  'create.f_social': 'Behaves',
  'create.f_social_help': 'How they are around other people.',
  'create.f_inner_life': 'Inner life',
  'create.f_inner_life_help': 'None of this is shown to the player. All of it is played.',
  'create.f_wants': 'Wants',
  'create.f_holds': 'Holds to',
  'create.f_afraid': 'Afraid of',
  'create.f_will_not': 'Will not',
  'create.f_will_not_help': 'Whatever the pressure.',
  'create.f_underneath': 'Underneath',
  'create.f_underneath_help': 'What they want and would not say out loud.',
  'create.f_secrets': 'Keeps back',
  'create.f_secrets_help': 'Things they know and are not telling. Each one a fact, not a hint.',
  'create.f_voice': 'Sounds like',
  'create.f_voice_help': 'Lines they would actually say.',
  'create.f_traits': 'Traits',

  'create.places_intro': 'Where this happens. Three or four is plenty to start.',
  'create.add_place': 'Add a place',
  'create.opens_here': 'The story opens here',
  'create.set_opening_place': 'Open the story here',
  'create.f_place_name': 'Name',
  'create.f_place_desc': 'What it is like',
  'create.f_place_desc_help': 'And what is in it that a scene could happen over.',

  'create.f_pov': 'Who does the player play?',
  'create.f_pov_help': 'This decides what the setup screen asks them.',
  'create.f_hero_name': 'Their name',
  'create.f_hero_pronouns': 'Their pronouns',
  'create.f_hero_desc': 'Who they are',
  'create.f_setup_heading': 'The setup question',
  'create.f_setup_heading_help': 'What the world asks instead of “Who are you?”',
  'create.f_setup_heading_ph': 'Which keeper are you?',
  'create.f_opening': 'The opening',
  'create.f_opening_help':
    '60 to 150 words, second person. It ends on a moment they have to answer. Do not ask them a question; put them in a situation.',
  'create.f_opening_ph': 'The first thing the player reads.',
  'create.f_suggestions': 'First things to try',
  'create.f_suggestions_help': 'Up to three, in the player’s own voice. Never “explore”.',
  'create.f_origins': 'Origins',
  'create.f_origins_help':
    'Different pasts a player can start from. Each one changes who they already were. Optional.',
  'create.origins_empty': 'None yet. Auto-generate writes two or three.',
  'create.f_play_guide': 'A note to the player',
  'create.f_play_guide_help': 'Shown once, before they start. Never sent to the storyteller.',
  'create.f_style': 'How it sounds',
  'create.f_style_help':
    'Up to three short samples in your story’s voice. Not scenes — samples. This is the strongest control you have over the writing.',

  'create.pressure_intro':
    'What pushes, whether or not the player is looking. All of this is optional, and all of it makes the story better.',
  'create.pressure_empty': 'None yet. Auto-generate writes a set.',
  'create.f_factions': 'Forces',
  'create.f_factions_help': 'Groups with their own aims.',
  'create.f_threads': 'Threads',
  'create.f_threads_help': 'Live questions a scene can be pulled towards. Never a checklist.',
  'create.f_events': 'What this world can do',
  'create.f_events_help': 'Possibilities, never a schedule.',
  'create.f_objects': 'Objects the story turns on',
  'create.f_objects_help': 'Only the ones the premise depends on.',

  'create.endings_intro':
    'Where this can end up. Rarity is how far off the common path an ending is, not how good it is — and the rare ones are why somebody plays your story twice.',
  'create.add_ending': 'Add an ending',
  'create.ending_from_turn': 'From turn {turn}',
  'create.f_ending_name': 'Name',
  'create.f_rarity': 'Rarity',
  'create.f_rarity_help': 'How far off the common path this is.',
  'create.rarity_common': 'Common',
  'create.rarity_uncommon': 'Uncommon',
  'create.rarity_rare': 'Rare',
  'create.rarity_unique': 'Unique',
  'create.f_min_turn': 'Earliest turn',
  'create.f_min_turn_help': 'A story that can end on turn three has not been a story yet.',
  'create.f_condition': 'When this is the right ending',
  'create.f_condition_help': 'Say it as a person would. Nobody parses this; it is read.',
  'create.f_epilogue': 'Epilogue',
  'create.f_epilogue_help': 'What the world looks like afterwards.',
  'create.f_hint': 'Hint',
  'create.f_hint_help': 'One line, shown to a player who is close to it.',

  'create.f_description': 'Description',
  'create.f_description_help': 'What this is, to somebody deciding whether to play it. Never spoil an ending.',
  'create.f_tags': 'Tags',
  'create.f_tags_help': 'Three to six. Lowercase.',
  'create.f_chips': 'What you can do here',
  'create.f_chips_help': 'Two to four, three words or fewer each.',
  'create.f_tier': 'Meant to be played at',
  'create.f_tier_help': 'A recommendation. Players still choose and pay for their own.',
  'create.f_visibility': 'Who can play it',
  'create.f_visibility_help': 'You can change this at any time.',
  'create.visibility_private': 'Only me',
  'create.visibility_private_body': 'Nobody else can find or open it.',
  'create.visibility_unlisted': 'Anyone with the link',
  'create.visibility_unlisted_body': 'Not in Discover, but shareable.',
  'create.visibility_public': 'Everyone',
  'create.visibility_public_body': 'It can appear in Discover.',

  /* --- Publishing -------------------------------------------------------- */

  'create.publish_title': 'Publish this story',
  'create.update_title': 'Publish an update',
  'create.publish_body':
    'Everyone already playing stays on the version they started. New runs get this one.',
  'create.publish_blocked': 'A few things are still missing:',
  'create.published_title': 'Published',
  'create.published_body': 'Your story is live. You can keep editing and publish again whenever you like.',
  'create.keep_editing': 'Keep editing',

  /* --- When a call fails --------------------------------------------------
   *
   * The server sends a stable code and a sentence; the sentence is English,
   * because every server string in this product is. These are the words the
   * client shows instead, so a French creator does not read an English
   * apology. Anything not listed here falls back to the server's own text.
   */

  'create.err_pitch_too_short': 'Tell me a little more about your story first.',
  'create.err_not_ready': 'A few things are still missing. They are marked below.',
  'create.err_insufficient_credits': 'Not enough credits for that.',
  'create.err_draft_not_found': 'That story is not here any more.',
  'create.err_too_many_drafts': 'You have a lot of stories on the go. Finish or delete one first.',
  'create.err_published_story': 'This story is published. Make it private first, then delete it.',
  'create.err_not_published': 'Publish this story before you share it.',
  'create.err_no_model': 'Story building is unavailable right now. Try again in a moment.',
  'create.err_compile_failed': 'Something in this story did not fit. We are looking at it.',
  'create.err_not_there': 'There is nothing to write there.',
  'create.err_invalid_patch': 'That change did not save. Try again.',

  /* --- Why a story is not ready ------------------------------------------ */

  'create.issue_title_too_short': 'Give it a title.',
  'create.issue_fantasy_label_missing': 'Write the one-line fantasy.',
  'create.issue_hook_missing': 'Write the hook.',
  'create.issue_premise_too_short': 'The premise needs at least 60 words.',
  'create.issue_tone_missing': 'Describe how this sounds.',
  'create.issue_need_two_characters': 'A story needs at least two people in it.',
  'create.issue_character_name_missing_n': 'Character {n} has no name.',
  'create.issue_character_role_missing_n': 'Character {n} has no role.',
  'create.issue_character_blurb_missing_n': 'Character {n} has no cast card line.',
  'create.issue_need_one_place': 'Add somewhere for this to happen.',
  'create.issue_place_name_missing_n': 'Place {n} has no name.',
  'create.issue_place_description_missing_n': 'Place {n} has no description.',
  'create.issue_starting_place_unset': 'Choose where the story opens.',
  'create.issue_opening_too_short': 'The opening needs at least 30 words.',
  'create.issue_opening_too_long': 'The opening is too long — keep it under 400 words.',
  'create.issue_protagonist_name_missing': 'Name the character the player plays.',
  'create.issue_protagonist_description_missing': 'Say who the player character is.',
  'create.issue_origin_name_missing_n': 'Origin {n} has no name.',
  'create.issue_origin_summary_missing_n': 'Origin {n} has no summary.',
  'create.issue_origin_needs_two_tags_n': 'Origin {n} needs at least two tags.',
  'create.issue_need_one_ending': 'A story needs somewhere it can end.',
  'create.issue_ending_name_missing_n': 'Ending {n} has no name.',
  'create.issue_ending_condition_missing_n': 'Ending {n} does not say when it happens.',
  'create.issue_description_missing': 'Write the description.',
  'create.issue_need_one_tag': 'Add at least one tag.',
  'create.err_already_compiling': 'This story is already being built. Give it a moment.',
} as const;

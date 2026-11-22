import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Thirty Days With the Number One Hero" — fake dating the strongest man in
 * the city, with the whole city checking.
 *
 * Bible: `docs/story-bibles/new50/50_THIRTY_DAYS_WITH_THE_NUMBER_ONE_HERO.md`.
 * Slate #50, drop 7, female lean.
 *
 * Playable span: thirty days, from the press conference at 11:05 on day 1 to
 * the Founders' Gala on the night of day 30, when the council votes on Ace's
 * contract. Day 31, the date already printed on the breakup press release, is
 * the last step. Everything after that lives in the endings.
 *
 * The structure is Good Morning, Husband's: the relationship already exists on
 * turn one, the player did not choose it, and an ordinary month of it is a
 * complete game. Fake dating adds an audience, so every scene has two
 * versions — the one for the cameras and the one after the door closes — and
 * the player is the only person who sees both. The mystery (Ferris Street) is
 * there for a player who pulls on it and drives the ending if they do.
 *
 * Production runs `runTurnPure`, which reads the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees
 * resources, step notes or the ability list except the chosen archetype's
 * starting abilities. So every age, the hidden truth and the month's
 * timetable are in hard canon or in world-event copy, the documents the plot
 * turns on are quest items, every archetype starts with one ability the
 * storyteller can read, and there are exactly twelve endings.
 *
 * 13+: a guest room with a lock on the inside, hand-holding as an event, and
 * nothing further than a kiss. Fights end in rescues and wreckage. Every
 * character is an adult and the first hard-canon line says how old.
 *
 * Three invisible variables. Energy is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Scrutiny comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight in public is the city looking harder before it is anything else.
 * Pretence is how much of the player's life has become an act.
 */

const raw = {
  id: 'sv_thirty_days_with_the_number_one_hero_1',
  storyId: 'story_thirty_days_with_the_number_one_hero',
  version: 1,
  title: 'Thirty Days With the Number One Hero',
  fantasyLabel: 'Fake girlfriend to the city’s top hero.',
  hook: 'The city’s number one hero needs a scandal-free girlfriend for thirty days. You were standing in the wrong spot at his press conference.',
  openingObligations: [
    {
      what: 'Sign or refuse Mira Solano’s Thirty-Day Agreement by five o’clock today.',
      withCharacterId: 'mira',
      dueInMinutes: 355,
    },
  ],
  premise:
    'You are three weeks into a paid internship in the press office at Vantage, the agency that manages the city’s licensed heroes. Your job is coffee, clipboards and holding the water at the side of the stage.\n\n' +
    'This morning Vantage held a press conference for Ace Valor, the number one hero in the city. A gossip streamer has photos of Ace on a rooftop at three in the morning with Shade, the most wanted villain in the city. The agency hired an actress to stand beside Ace as his girlfriend and make the story go away. She never showed up.\n\n' +
    'So when the reporter asked, Ace grabbed the nearest hand, and it was yours.\n\n' +
    'Now the agency wants thirty days: public dates, one live interview, and a gala on the night the city council votes on renewing his contract. His manager has an agreement for you to sign by five. Your roommate Jo has questions. And Shade, who was watching, has decided you are interesting.\n\n' +
    'You have thirty days to keep the story straight, or to find out what Ace was really doing on that roof. If the city finds out it is fake, you lose your job, and he loses the city.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Superhero', 'Comedy', 'Modern', 'Drama'],
  mechanicsChips: [
    'A fake relationship with a real audience',
    'He asks before he holds your hand',
    'A villain who never lies to you',
    'A breakup already written',
    'The mystery is optional',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE'],
  intensity: 'LIGHT',
  creatorNote:
    'You can spend thirty days going on staged dates, eating noodles in the Narrows and arguing about a breakup press release that was written before you met, and that is a real way to play this. Ace is not a prize. He is a very strong, very lonely man who grabbed your hand for a reason he has not told you yet.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'tower_plaza',
    startWorldMinute: 11 * 60 + 5,
    startingItems: [{ itemId: 'intern_lanyard', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-three, a paid intern in a six-month placement after university. Ace Valor is twenty-seven, Mira Solano thirty-six, Shade twenty-eight, Jo Quinn twenty-four, Dex Holloway thirty-one and Silver Kite twenty-nine.',
      'Calder City licenses its heroes. A licensed hero works under a registered hero name, keeps their legal name sealed, and is ranked every Monday at nine on the public Hero Ranking by rescues, votes and sponsor reach. About one person in fifty is born with a power; the law says every power is registered at eighteen and only a licensed hero may use one in public.',
      'Vantage Hero Management manages eleven licensed heroes from Vantage Tower, forty floors of glass on the central plaza. Ace Valor is most of its income. His Guardian Contract, which makes him the city’s official hero and pays Vantage for it, comes up for a council vote on the night of the Founders’ Gala at Civic Hall, day thirty.',
      'Ace Valor has been number one for four years. He can fly, and he can lift anything he can get both arms around. When he is nervous, flustered or very happy, his boots drift an inch or two off the ground and he cannot stop it. His legal name is Nathaniel Ward; nobody but Mira and his mother has called him Nate in eight years.',
      'On day one, a gossip streamer called Dex Holloway published photos of Ace on a water tower over the Narrows at three in the morning, talking to Shade, the most wanted villain in the city. The rumour is that they are secretly together, or secretly fixing fights. Neither is true. Vantage hired an actress to be Ace’s girlfriend at the press conference; she never arrived, and Ace grabbed the player’s hand instead.',
      'The relationship is fake at the start and both of them know it. Mira’s Thirty-Day Agreement asks for three public dates a week, a live joint interview on day fourteen and the gala on day thirty, pays a weekly fee, and ends with a breakup press release already written and dated day thirty-one. Ace asks before he touches the player’s hand, every single time, even on camera.',
      'Ace introduced the player on camera as his girlfriend. If the player is not a woman, the press office corrects the word to boyfriend or partner within the hour, and nobody in the story treats it as more than a typo.',
      'Four years ago a nine-storey block on Ferris Street collapsed. The famous footage shows Ace flying forty people out, and there is a bronze statue of him there holding a beam. The truth: an unlicensed man in the basement, Rafe Quinn, made the building’s own shadow solid and held it up for four minutes, holding his breath until he passed out. Vantage cut him from the footage, and Mira Solano signed the report that listed him as a suspected looter, which is why his licence was refused. Ace has known since the next morning.',
      'Rafe Quinn became Shade. He can make any shadow solid as steel for as long as he holds his breath. He robs the sponsors whose logos are on Ace’s suit, returns most of what he takes, has never hurt a bystander, and never lies to the player. He has a copy of the uncut footage and a way onto every public screen in the city, and at half past nine on gala night he will play it unless Ace has already told the truth. The rooftop meeting was Ace asking him to tell it together; Rafe refused to be rescued by the man who took the credit.',
      'Jo Quinn, the player’s roommate and best friend since university, is Rafe’s younger sister. She has not seen him in four years and does not know he is Shade. He lives four streets away. The player and Jo share a fourth-floor walk-up over a laundromat in the Narrows, and rent is due on day five.',
      'Silver Kite, the number two hero, saw the black brace under the building at Ferris Street as a rookie and said nothing. Four years later she sent Dex Holloway the anonymous text that put him on the right street at three in the morning, because she wanted the truth out. She did not expect a fake girlfriend.',
      'Ace did not grab the nearest hand by accident. That morning, in a grey hoodie and glasses he does not need, he hid in the tower stairwell before the conference, and the player talked to him for five minutes about the broken vending machine without recognising him. He chose the one person in the building who had treated him like a person.',
      'Romance in this story goes no further than a kiss. Clothes stay on, nobody’s body is described at length, and fights end in rescues and wreckage, never in injuries described in detail.',
    ],
    toneGuide:
      'Superhero romantic comedy: bright, quick, warm, with a real secret underneath. Every scene has two versions, the one for the cameras and the one after the door closes, and the comedy comes from a press-office intern applying press-office sense to a superhero’s private life. ' +
      'Hand-holding is an event. Romance goes at most as far as a kiss, and the player decides whether it becomes real. Ace floats when he is flustered, happy or about to say something true; use it instead of telling the player what he feels. ' +
      'Nobody is a villain in the moral sense: Mira protects a lie that seemed small when she told it, Shade is angry for a good reason, Dex wants the truth, Kite wants to win fairly. Fights are fast and end in rescues, never in described injuries. ' +
      'Ferris Street, Shade’s real name and the stairwell are reveals the player earns; never state them early. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Ace holds the frying pan like it might go off.\n\n"I can lift a train," he says. "I have lifted a train. Twice."\n\nThe egg slides out of the pan and onto the floor.\n\nHe looks at it. Then at you.\n\nHis socks have left the tiles again. An inch. Maybe two.\n\n"Please don’t put this in a press release."',
      'There is a man on your fire escape, sitting in the shadow of the water tank like it is a deckchair.\n\n"Evening, Thirty Days," Shade says. "Don’t scream. Your roommate has an early shift."\n\nYou never told anyone that.\n\nThe shadow under him has gone hard and glassy, like it is holding him up.\n\n"Here’s my offer," he says. "One honest answer each. Then I leave by the window."',
      'Jo is at the kitchen table at two in the morning, still in her paramedic uniform, eating cereal out of the box.\n\nShe points the box at the television. Your face. His hand.\n\n"Okay," she says. "Triage. Is anybody bleeding?"\n\n"No."\n\n"Then sit down. You have until this box is empty."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 12, presence: 12, resolve: 11, arcana: 7 },
  skills: [
    { id: 'performance', name: 'Performance', attribute: 'presence', description: 'Smiling on cue, holding a hand like you mean it, laughing at his second joke and not his first.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing out loud to somebody who signs your pay.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Keeping your face still with forty lenses pointed at it.' },
    { id: 'spin', name: 'Spin', attribute: 'mind', description: 'Turning a bad headline into a better one before lunch.' },
    { id: 'attention', name: 'Noticing', attribute: 'mind', description: 'Where the cameras are, and what somebody is not saying while they say something else.' },
    { id: 'framing', name: 'Framing', attribute: 'mind', description: 'Knowing what a photograph will say before anybody takes it.' },
    { id: 'fine_print', name: 'Fine Print', attribute: 'mind', description: 'Reading the clause somebody hoped you would skim.' },
    { id: 'evasion', name: 'Slipping Out', attribute: 'agility', description: 'Leaving a building without one photographer getting your face.' },
    { id: 'legwork', name: 'Legwork', attribute: 'might', description: 'Twelve-hour days, four flights of stairs, a gala in borrowed shoes.' },
    { id: 'spark', name: 'Spark', attribute: 'arcana', description: 'The small, unlicensed power some people in this city are born with and never register.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is the only GOOD_HIGH, so resting restores the day and nothing else
   * — never the relationship. Scrutiny and Pretence descend on their own:
   * Scrutiny is how hard the city is looking, Pretence is how much of the
   * player's life is an act. Losing the cameras, making a headline, using an
   * unlicensed power and playing the footage raise Scrutiny; playing the part
   * and spinning it raise Pretence.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 80,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has smiled on command for too long. They say yes to the next thing on the schedule to end the conversation, and the photograph of that moment is the one that runs.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing after a day of smiling on command. Answers come out short, the smile on camera looks painted on, and the player agrees to things just to end a conversation. This is the band where a photographer gets the bad picture and where going to bed is the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long press day. Fine for one more date or one honest conversation, not both. Good for the sofa, bad for a live interview. Nobody needs to say anything about it unless somebody asks.',
        },
        {
          upTo: 100,
          behaviour:
            'The day is still ahead. The player has room to be quick on camera, curious off it, and to say the difficult thing well instead of bluntly. Scenes can be long and can go somewhere.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 35,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The city has moved on to another story. The two of them can buy noodles in the Narrows at midnight and nobody films it, which is either a relief or the first sign that the act has stopped working.',
      color: '#E76F51',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody is looking very hard. The photographers have chased another story, the comments have moved on, and the two of them can walk through the Narrows without a single lens. Off-camera scenes can be long and quiet, and anything said in them stays said.',
        },
        {
          upTo: 50,
          behaviour:
            'The ordinary weather of dating the number one hero: two photographers outside, a trending post a day, strangers stopping the player for a selfie. Every public moment is slightly staged whether anybody means it or not, and Mira texts about all of them.',
        },
        {
          upTo: 80,
          behaviour:
            'The city is actively checking. Dex Holloway is running slideshows, the laundromat steps are crowded, and every slip gets replayed: a wrong date, a flinch when Ace reaches for a hand. Mira tightens the schedule and Jo stops answering the door.',
        },
        {
          upTo: 100,
          behaviour:
            'A frenzy. A news helicopter over the flat, the player’s graduation photo on the morning shows, a crowd outside Vantage Tower holding signs both ways. Nothing can be done quietly, every scene is public whether the player likes it or not, and somebody close to them is about to talk.',
        },
      ],
    },
    {
      id: 'pretence',
      name: 'Pretence',
      max: 100,
      start: 15,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Nothing the player does is an act any more. Whatever the agreement says, the person on the boardwalk and the person in the penthouse kitchen are the same person, and everybody who matters can tell.',
      color: '#8FB1C9',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Almost nothing is an act. The player says what they mean to Ace, to Jo and to the cameras, and the people around them can tell. Ace relaxes around honesty and floats more, not less.',
        },
        {
          upTo: 50,
          behaviour:
            'A working act. The player can smile on cue and hold his hand for a photograph and still knows exactly which parts are real. Jo notices the new laugh and teases it. Mira approves, which is its own warning.',
        },
        {
          upTo: 80,
          behaviour:
            'The player is losing track. Lines from the binder come out at breakfast, Jo gets answered the way reporters do, and Ace starts asking "was that for the cameras?" and is not joking. Shade notices first and says so.',
        },
        {
          upTo: 100,
          behaviour:
            'Everything is performance. The player cannot tell any more which feelings were scheduled. The people who love them get the press-office version, and the one person who never lies to them says so out loud, on a fire escape, at two in the morning.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'intern_lanyard',
      name: 'Your Intern Lanyard',
      tags: ['personal'],
      droppable: false,
      description: 'A blue lanyard with your photo on it, the word INTERN in capitals, and a card that opens every door in Vantage Tower below the thirtieth floor.',
      loreText: 'The photo was taken on your first day, before you knew where the good coffee was. You look hopeful in it. It is slightly embarrassing.',
      icon: 'badge',
    },
    {
      id: 'the_agreement',
      name: 'The Thirty-Day Agreement',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Nine pages and three appendices from Vantage: thirty days, three public dates a week, one live interview on day fourteen, the gala on day thirty, a weekly fee that is more than your rent, and a clause nine that says no kissing unless it is on the schedule.',
      loreText: 'Appendix B is a list of approved topics for the interview. Appendix C is the breakup press release. Your name is a blank on every page, filled in by hand, in Mira’s writing, already.',
      icon: 'papers',
    },
    {
      id: 'breakup_release',
      name: 'The Breakup Release',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'One page on Vantage letterhead, dated day thirty-one: "After thirty wonderful days, Ace Valor and ____ have decided to part as close friends. We ask for privacy at this time."',
      loreText: 'It was written the night before the press conference, for an actress who never showed up. There are three drafts. In the third, somebody has crossed out "close friends" and written nothing instead.',
      icon: 'letter',
    },
    {
      id: 'rooftop_photos',
      name: 'The Rooftop Photos',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { attention: 1 },
      description: 'Six grainy long-lens shots from three in the morning: Ace on a water tower over the Narrows, and a man in a long coat sitting in a shadow that looks far too solid. In the fourth one, Ace is holding out an envelope and the other man is not taking it.',
      loreText: 'The timestamp says 03:04. Somebody told the photographer exactly which roof to watch, and when.',
      icon: 'photo',
    },
    {
      id: 'uncut_footage',
      name: 'The Uncut Footage',
      tags: ['quest', 'evidence'],
      questItem: true,
      description: 'A grey drive labelled FERRIS ST / RAW / DO NOT DUPLICATE in Mira’s handwriting. Four minutes in the middle of it show a black brace under the building, solid as steel, and a man in the basement holding his breath until he falls.',
      loreText: 'The broadcast version cuts from the second wide shot to Ace landing with the first family. The cut is very well made. Somebody spent a whole night on it.',
      icon: 'drive',
    },
    {
      id: 'black_card',
      name: 'The Black Card',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A card the size of a business card, black on both sides, no writing, and colder than the room. It turned up in your bag on the first night.',
      loreText: 'Hold it in direct light and it softens like warm wax. Leave it on a windowsill in the light and somebody on the roofs notices.',
      icon: 'card',
    },
    {
      id: 'jo_shoebox',
      name: 'Jo’s Shoebox',
      tags: ['quest', 'personal'],
      questItem: true,
      description: 'A battered shoebox under Jo’s bed: a photo of Jo laughing beside a lanky dark-haired man, a silver lighter that does not work, and a letter refusing an application for a hero licence.',
      loreText: 'The letter quotes the Ferris Street incident report: "applicant found in the basement, suspected of looting". The name on it is Rafe Quinn. The signature on the report is M. Solano.',
      icon: 'box',
    },
    {
      id: 'grey_hoodie',
      name: 'The Grey Hoodie',
      tags: ['clothing'],
      description: 'A soft grey hoodie, size enormous, that Ace lends you on the first night so the photographers outside will not get your face.',
      loreText: 'It smells like rain and burnt toast. There is a receipt from the broken vending machine on the twelfth floor in the pocket, dated this morning.',
      icon: 'shirt',
    },
    {
      id: 'gala_invitation',
      name: 'The Gala Invitation',
      tags: ['document'],
      description: 'Heavy cream card with gold edges: the Founders’ Gala, Civic Hall, day thirty, seven o’clock. Ace Valor and guest.',
      loreText: 'The seating plan on the back puts you between Ace and the chair of the council, which is either an honour or a test.',
      icon: 'ticket',
    },
    {
      id: 'ace_plushie',
      name: 'An Ace Plushie',
      tags: ['personal'],
      description: 'A soft toy of the number one hero from the boardwalk claw machine, with a felt cape and a smile that is slightly wrong.',
      loreText: 'The real one says the plushie has better hair than he does, and he is right.',
      icon: 'toy',
    },
    {
      id: 'lines_notebook',
      name: 'Your Notebook of Lines',
      tags: ['personal'],
      skillModifiers: { spin: 1 },
      description: 'A pocket notebook full of headlines, captions and first sentences, most of them crossed out, three of them very good.',
      loreText: 'On the last page, in capitals: NEVER SAY "NO COMMENT". SAY SOMETHING BETTER.',
      icon: 'book',
    },
    {
      id: 'your_camera',
      name: 'Your Camera',
      tags: ['tool'],
      skillModifiers: { framing: 1 },
      description: 'A battered camera with a long lens, the agency’s sticker peeling off the strap.',
      loreText: 'You have four thousand photos of other people’s rescues on it and none of yourself.',
      icon: 'camera',
    },
    {
      id: 'highlighters',
      name: 'Your Highlighters',
      tags: ['tool'],
      skillModifiers: { fine_print: 1 },
      description: 'Five highlighters in a rubber band, one colour for every kind of trap a contract can hide.',
      loreText: 'Yellow is "fine". Orange is "ask". Pink is "no". Green is "money". Blue you have only used once, on a lease.',
      icon: 'pen',
    },
    {
      id: 'big_sunglasses',
      name: 'Your Big Sunglasses',
      tags: ['clothing'],
      skillModifiers: { evasion: 1 },
      description: 'Enormous sunglasses you wear indoors, because when your power slips, your eyes flash silver for a second.',
      loreText: 'Nobody has ever caught it on camera. Nobody has ever pointed this many cameras at you before.',
      icon: 'glasses',
    },
  ],
  abilities: [
    {
      id: 'play_the_part',
      name: 'Play the Part',
      tags: ['social'],
      description: 'Act like the other half of the city’s favourite couple: the hand, the smile, the laugh at his second joke.',
      affordances: ['play along', 'act like we are together', 'hold his hand', 'smile for the cameras', 'pretend', 'lie for him', 'stay in character', 'kiss his cheek'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'pretence', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'performance', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tell_it_straight',
      name: 'Tell It Straight',
      tags: ['social'],
      description: 'Say the true thing out loud, to a face or to a microphone, and take whatever comes back.',
      affordances: ['tell the truth', 'be honest', 'come clean', 'confess', 'admit it', 'say it is fake', 'tell jo', 'ask him straight'],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'handle_the_press',
      name: 'Handle the Press',
      tags: ['social'],
      description: 'Give a reporter a quote that answers nothing and sounds like everything.',
      affordances: ['answer the reporter', 'no comment', 'give a statement', 'deflect', 'talk to the press', 'answer the question', 'handle the reporters'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Find every camera, every exit and the one person in the room who is not saying what they mean.',
      affordances: ['look around', 'read the room', 'watch him', 'notice', 'find the cameras', 'study her', 'check the crowd', 'look closer'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'attention', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lose_the_cameras',
      name: 'Lose the Cameras',
      tags: ['movement'],
      description: 'Get out of sight of every lens in the area: a side door, a crowd, the back of a laundry van.',
      affordances: ['run', 'sneak out', 'hide', 'lose them', 'get away', 'leave by the back', 'slip away', 'escape the press', 'walk him off the stage'],
      costs: [
        { resourceId: 'energy', amount: 8 },
        { resourceId: 'scrutiny', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'evasion', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_headline',
      name: 'Make a Headline',
      tags: ['social'],
      description: 'Do something big and public on purpose, and let the whole city film it.',
      affordances: ['kiss him', 'make a scene', 'take the microphone', 'announce it', 'go big', 'do it in public', 'make a speech'],
      costs: [
        { resourceId: 'energy', amount: 10 },
        { resourceId: 'scrutiny', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'performance', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'just_stay',
      name: 'Just Stay',
      tags: ['social'],
      description: 'Do not fix it, spin it or film it. Sit down next to somebody and stay.',
      affordances: ['stay', 'sit with him', 'sit with her', 'say nothing', 'wait', 'be there', 'listen', 'keep him company'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'spin_it',
      name: 'Spin It',
      tags: ['social'],
      description: 'Write the line that turns a bad headline into a better one, and get somebody else to say it.',
      affordances: ['spin it', 'write a statement', 'reframe it', 'draft a caption', 'fix the headline', 'write his speech', 'rewrite it'],
      costs: [
        { resourceId: 'energy', amount: 6 },
        { resourceId: 'pretence', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'spin', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'find_the_angle',
      name: 'Find the Angle',
      tags: ['sight'],
      description: 'Know where every lens is pointed and set up the picture you want the city to see.',
      affordances: ['take a photo', 'set up the picture', 'post it', 'check the feeds', 'find the angle', 'block the photographer', 'frame it'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'framing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_fine_print',
      name: 'Read the Fine Print',
      tags: ['sight'],
      description: 'Read an agreement, a report or a release properly, and find what it actually commits somebody to.',
      affordances: ['read the contract', 'read the agreement', 'check the clauses', 'read it properly', 'find the loophole', 'read the report', 'negotiate the terms'],
      costs: [{ resourceId: 'energy', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'fine_print', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ten_quiet_seconds',
      name: 'Ten Quiet Seconds',
      tags: ['movement'],
      description: 'Use the small power you never registered: for ten seconds, nobody’s attention lands on you.',
      affordances: ['use my power', 'go unnoticed', 'vanish for ten seconds', 'slip past', 'disappear', 'go quiet', 'follow him unseen'],
      costs: [
        { resourceId: 'energy', amount: 10 },
        { resourceId: 'scrutiny', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'arcana', skillId: 'spark', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_him_nate',
      name: 'Call Him Nate',
      tags: ['social'],
      description: 'Use the name nobody uses, and talk to the man instead of the poster.',
      affordances: ['call him nate', 'say his real name', 'use his name', 'nate'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:his_name'],
        lockedCopy: 'You only know the name on the billboards, and that one belongs to the agency.',
      },
    },
    {
      id: 'leave_a_light_on',
      name: 'Leave a Light On',
      tags: ['social'],
      description: 'Put the black card on the sill in the light and wait on the fire escape. He comes, if he wants to.',
      affordances: ['call shade', 'leave the light on', 'signal him', 'put the card out', 'wait for shade', 'summon shade'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['shade_gave_signal'],
        lockedCopy: 'You have no way to find a man who lives in the shadows over the Narrows. He finds you.',
      },
    },
    {
      id: 'play_the_footage',
      name: 'Play the Footage',
      tags: ['utility'],
      description: 'Put the uncut Ferris Street footage in front of somebody: a reporter, a screen, a full room.',
      affordances: ['play the footage', 'show them the video', 'put it on the screen', 'leak it', 'show the footage', 'release the footage'],
      costs: [
        { resourceId: 'energy', amount: 10 },
        { resourceId: 'scrutiny', amount: 20 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['footage_in_hand'],
        lockedCopy: 'There is nothing to play. Every version of Ferris Street you have seen is the one on the billboards.',
      },
    },
  ],
  locations: [
    {
      id: 'tower_plaza',
      name: 'Vantage Plaza',
      shortName: 'Press Stage',
      description:
        'A stage on the glass plaza at the foot of Vantage Tower: a podium, a blue backdrop printed with the agency’s logo, and a pen of forty photographers who all shout at once. Fans hold up signs with Ace’s face on them. The side curtain is where the interns stand with the water.',
      artDirection:
        'Outdoor press stage on a glass-and-steel plaza at midday, a podium with microphones, a blue backdrop, a crowd of photographers with flashes going off, fans with signs, a glass skyscraper rising behind. Bright, loud, glittering.',
      connections: [
        { to: 'vantage_tower', travelMinutes: 2, label: 'Through the side door into the tower' },
        { to: 'civic_square', travelMinutes: 10, label: 'Across the centre to Civic Square' },
        { to: 'the_boardwalk', travelMinutes: 18, label: 'The tram down to the boardwalk' },
        { to: 'ferris_street', travelMinutes: 15, label: 'The memorial on Ferris Street' },
        { to: 'the_narrows', travelMinutes: 25, label: 'The train home to the Narrows' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'vantage_tower',
      name: 'Vantage Tower',
      shortName: 'The Tower',
      description:
        'Forty floors of glass. The press office on the twelfth floor is your desk, a broken vending machine and a wall of screens showing the Hero Ranking. Studio B, where live interviews happen, is on the twentieth. Mira’s glass office is on the thirty-ninth. The stairwell is where people go to cry or hide.',
      artDirection:
        'Sleek corporate open-plan press office high in a glass skyscraper, rows of desks, a wall of screens with a ranking chart, a sad vending machine, a glass-walled corner office beyond. Cool blues, city view.',
      connections: [
        { to: 'tower_plaza', travelMinutes: 2, label: 'Down and out to the plaza' },
        { to: 'the_penthouse', travelMinutes: 3, label: 'The private lift to the top floor' },
        { to: 'tower_archive', travelMinutes: 4, lockedByFlag: 'knows:the_archive', label: 'The basement archive' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'breakup_release', qty: 1, ownerId: 'mira', aka: ['the release', 'the breakup release', 'the press release', 'appendix c'] },
        { itemId: 'gala_invitation', qty: 1, ownerId: null, aka: ['invitation', 'the gala invitation', 'the invite'] },
      ],
    },
    {
      id: 'the_penthouse',
      name: 'The Penthouse',
      shortName: 'Penthouse',
      description:
        'The top floor of Vantage Tower, owned by the agency and furnished like a showroom: white sofas nobody sits on, a kitchen with every gadget and nothing in the fridge, a guest room with a lock on the inside, and a balcony with no railing on one side, because he never needed one.',
      artDirection:
        'Huge minimalist penthouse at night, white sofas, floor-to-ceiling windows over a glittering city, an untouched designer kitchen, an open balcony edge with no railing. Beautiful, cold, lonely, one lamp on.',
      connections: [{ to: 'vantage_tower', travelMinutes: 3, label: 'The lift back down' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -2 },
      takeableItems: [
        { itemId: 'grey_hoodie', qty: 1, ownerId: 'ace', aka: ['hoodie', 'his hoodie', 'the grey hoodie', 'the sweatshirt'] },
      ],
    },
    {
      id: 'tower_archive',
      name: 'The Archive',
      shortName: 'Archive',
      description:
        'The basement of Vantage Tower: rolling shelves of hard drives, every rescue the agency has ever filmed, from three angles. Cold, humming, lit by motion sensors that switch off if you stand still too long. The Ferris Street shelf is the only one with a lock on it.',
      artDirection:
        'Cold basement archive, long rolling shelves of labelled hard drives, motion-sensor strip lights half on, one shelf with a heavy padlock. Blue-grey, humming, claustrophobic.',
      connections: [{ to: 'vantage_tower', travelMinutes: 4, label: 'Back up to the tower' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [
        { itemId: 'uncut_footage', qty: 1, ownerId: 'mira', aka: ['the drive', 'the footage', 'the raw footage', 'the grey drive'] },
      ],
    },
    {
      id: 'your_flat',
      name: 'Your Flat',
      shortName: 'Home',
      description:
        'A fourth-floor walk-up over a laundromat in the Narrows that you share with Jo: two small bedrooms, a sofa with a dent in it, a kitchen the size of a phone box, and a window onto the fire escape. The radiator knocks. The whole place smells faintly of fabric softener from downstairs.',
      artDirection:
        'Tiny cosy city apartment at night, a dented sofa with a blanket, a cramped kitchen, fairy lights, a window onto an iron fire escape, laundry drying on a rack. Warm, cluttered, lived-in.',
      connections: [
        { to: 'the_narrows', travelMinutes: 2, label: 'Down four flights to the street' },
        { to: 'the_rooftops', travelMinutes: 3, label: 'Out of the window and up the fire escape' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'jo_shoebox', qty: 1, ownerId: 'jo', aka: ['shoebox', 'the box', 'her box', 'the shoebox under her bed'] },
        { itemId: 'black_card', qty: 1, ownerId: null, aka: ['the card', 'black card', 'the cold card'] },
      ],
    },
    {
      id: 'the_narrows',
      name: 'The Narrows',
      shortName: 'Narrows',
      description:
        'Your neighbourhood: narrow streets of walk-ups under a tangle of washing lines and power cables, a noodle stand that never closes, the laundromat, and a wall where somebody keeps painting Shade’s silhouette and somebody else keeps painting over it. Since the press conference there are photographers on the laundromat steps.',
      artDirection:
        'Dense old city neighbourhood street at dusk, washing lines between walk-up buildings, a glowing noodle stand, a laundromat with steamed windows, a graffiti silhouette of a masked man on a brick wall, photographers lurking.',
      connections: [
        { to: 'your_flat', travelMinutes: 2, label: 'Up the four flights home' },
        { to: 'the_rooftops', travelMinutes: 5, label: 'Up the fire escape' },
        { to: 'dex_studio', travelMinutes: 6, label: 'The bar with the studio above it' },
        { to: 'ferris_street', travelMinutes: 10, label: 'Six blocks to Ferris Street' },
        { to: 'tower_plaza', travelMinutes: 25, label: 'The train into the centre' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_rooftops',
      name: 'The Rooftops',
      shortName: 'Rooftops',
      description:
        'Flat roofs, water towers and washing lines over the Narrows, close enough to step between. The roof in the photos is here: a water tower with a ladder and the whole city lit up behind it. At night the shadows up here are very dark and sometimes very solid.',
      artDirection:
        'City rooftops at night, a big wooden water tower with a ladder, washing lines, a skyline of glass towers glowing in the distance, deep sharp-edged shadows. Moody, romantic, a little dangerous.',
      connections: [
        { to: 'the_narrows', travelMinutes: 5, label: 'Down the fire escape' },
        { to: 'your_flat', travelMinutes: 3, label: 'Back in through your window' },
        { to: 'the_starlight', travelMinutes: 8, lockedByFlag: 'knows:the_starlight', label: 'Across the roofs to the old cinema' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_starlight',
      name: 'The Starlight',
      shortName: 'Old Cinema',
      description:
        'A shut cinema on the edge of the Narrows, its marquee letters long gone. Inside is Shade’s hideout: rows of red velvet seats, a projector that still works, and a stage stacked with stolen sponsor goods, every one of them labelled with where it is going back to.',
      artDirection:
        'Abandoned old cinema interior, rows of faded red velvet seats, a projector beam cutting through dust, a stage piled with stolen goods with paper tags, a long black coat over a seat. Secret, theatrical, oddly tidy.',
      connections: [{ to: 'the_rooftops', travelMinutes: 8, label: 'Back across the roofs' }],
      discoveredByDefault: false,
      mapPosition: { x: -3, y: 0 },
      takeableItems: [],
    },
    {
      id: 'ferris_street',
      name: 'Ferris Street',
      shortName: 'Ferris St',
      description:
        'A rebuilt nine-storey block with a memorial plaque listing forty people who walked out alive, and a bronze statue of Ace holding a beam over his head. The plaque says he held the building up. The basement door round the side is padlocked and has been for four years.',
      artDirection:
        'Rebuilt apartment block on a quiet street, a bronze statue of a caped hero holding a steel beam overhead, a memorial plaque, flowers, a padlocked basement door in shadow at the side. Solemn, overcast.',
      connections: [
        { to: 'the_narrows', travelMinutes: 10, label: 'Back to the Narrows' },
        { to: 'tower_plaza', travelMinutes: 15, label: 'Into the centre' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_boardwalk',
      name: 'The Boardwalk',
      shortName: 'Boardwalk',
      description:
        'The harbour pier: food stalls, a carousel, an arcade of claw machines full of Ace plushies, and a long railing over the water where couples get photographed. It is where Mira schedules the dates, because the light is good at seven.',
      artDirection:
        'Harbour boardwalk at golden hour, a lit carousel, food stalls, an arcade glowing with claw machines, a long wooden railing over sparkling water, string lights. Romantic and busy.',
      connections: [{ to: 'tower_plaza', travelMinutes: 18, label: 'The tram back to the centre' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'ace_plushie', qty: 1, ownerId: null, aka: ['plushie', 'the plush', 'the soft toy', 'the ace doll'] },
      ],
    },
    {
      id: 'civic_square',
      name: 'Civic Square',
      shortName: 'Civic Square',
      description:
        'The city’s main square: Civic Hall with its columns, where the council meets and the Founders’ Gala is held; a clock tower with a hero lookout at the top; and a screen three storeys high that shows the Hero Ranking every Monday at nine.',
      artDirection:
        'Grand civic square at night, a columned hall lit gold, a clock tower with a lookout platform, a giant public screen glowing with a ranking chart, crowds below. Formal and dramatic.',
      connections: [{ to: 'tower_plaza', travelMinutes: 10, label: 'Back to Vantage Plaza' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'dex_studio',
      name: 'Dex’s Studio',
      shortName: 'The Studio',
      description:
        'One room above a bar in the Narrows: ring lights, three monitors, a sofa where guests sit when Dex is live, and a corkboard of photographs joined with red string. The biggest section of the corkboard is labelled FERRIS ST.',
      artDirection:
        'Cramped streamer studio above a bar, ring lights, three glowing monitors, a battered sofa, a corkboard covered in photos and red string. Neon spill from the street, chaotic and obsessive.',
      connections: [{ to: 'the_narrows', travelMinutes: 6, label: 'Downstairs and out' }],
      discoveredByDefault: true,
      mapPosition: { x: -3, y: 2 },
      takeableItems: [
        { itemId: 'rooftop_photos', qty: 1, ownerId: 'dex', aka: ['the photos', 'the rooftop photos', 'the prints', 'the pictures'] },
      ],
    },
  ],
  /**
   * The Public is first on purpose: public violence drops the first faction in
   * array order, and a fight anywhere a phone can see it costs the city's
   * opinion before anything else.
   */
  factions: [
    {
      id: 'faction_public',
      name: 'The Public',
      description:
        'Everybody in the city with a phone and an opinion: the fans who vote in the weekly Hero Ranking, the comment sections, the strangers who stop you for a selfie. They decide every Monday who is number one, and this month they are deciding whether you are real.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Who is that?' },
        { atReputation: 25, label: 'His plus-one' },
        { atReputation: 50, label: 'The city’s favourite couple' },
        { atReputation: 75, label: 'A household name' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_vantage',
      name: 'Vantage Hero Management',
      description:
        'The agency that manages eleven licensed heroes from Vantage Tower. Ace is most of its income. It wants the Guardian Contract renewed, the rooftop story buried and the girlfriend on schedule, and it has a lawyer for each of those.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Intern' },
        { atReputation: 30, label: 'Client asset' },
        { atReputation: 55, label: 'Trusted' },
        { atReputation: 80, label: 'Inner circle' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_press',
      name: 'The Press',
      description:
        'Photographers, morning shows, gossip streamers and one or two real reporters. They camp outside your building and want one of two things: proof you are fake, or a better story than that.',
      startingReputation: 0,
      ranks: [
        { atReputation: -20, label: 'Target' },
        { atReputation: 0, label: 'The story' },
        { atReputation: 30, label: 'A source' },
        { atReputation: 60, label: 'Off the record' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_narrows',
      name: 'The Narrows',
      description:
        'Your neighbourhood: walk-ups, the laundromat, the noodle stand, and people who have watched heroes fight over their roofs for years and paid for the windows. They like Shade better than Ace, and they knew you before any of this.',
      startingReputation: 25,
      ranks: [
        { atReputation: 0, label: 'New face' },
        { atReputation: 25, label: 'Local' },
        { atReputation: 50, label: 'One of ours' },
        { atReputation: 75, label: 'Protected' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'ace',
      name: 'Ace Valor',
      role: 'The number one hero in the city for four years, and your fake boyfriend for thirty days',
      cardBlurb:
        'He grabbed your hand in front of forty cameras and called you his girlfriend. Off camera he apologises to furniture, asks before he touches your hand, and floats an inch off the floor when you make him nervous.',
      pronouns: 'he/him',
      publicTraits: ['Perfect on camera', 'Hopeless off it', 'Asks before he touches anybody'],
      hiddenDrives: [
        'He wants one person in the city to call him by his real name and mean the man rather than the poster',
        'He wants to tell the truth about Ferris Street and cannot find a version of it that does not destroy Mira, Vantage and everybody who believes in him',
      ],
      values: [
        'Asking first',
        'Saving the person in front of him before the person on the billboard',
        'Keeping a promise he made out loud',
      ],
      fears: [
        'That without the number he is nobody anybody would grab by the hand',
        'That he has already left the truth too late, and that every day he waits makes him worse',
        'Basements, since Ferris Street',
      ],
      socialStyle:
        'On camera he is smooth and golden and says exactly what the agency wrote. Off camera he apologises first, asks permission for everything, and gets flustered so easily that his feet leave the floor.',
      boundaries: [
        'Will never touch the player without asking first, even on camera, even when it would be easier',
        'Will not lie about Ferris Street to the player directly; he goes quiet and leaves the room instead',
        'Will not hit a reporter, a fan or anybody without powers, whatever they say to him',
      ],
      goals: [
        'Get through thirty days without the rooftop story turning into the Ferris Street story',
        'Give Rafe Quinn back what Ferris Street took from him before the gala',
        'Find out whether the person whose hand he grabbed would have said yes anyway',
      ],
      secrets: [
        {
          id: 'ace_ferris',
          fact: 'At Ferris Street he flew forty people out on camera, but the building only stayed up because Rafe Quinn held it from the basement with its own shadow until he passed out. Vantage cut Rafe from the footage. Ace has known since the next morning and has said nothing in public.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself, late, on the penthouse balcony, if you have told him one true thing about yourself first and have never asked him about it in front of anybody else.',
        },
        {
          id: 'ace_stairwell',
          fact: 'He did not grab the nearest hand by accident. That morning, in a grey hoodie and glasses, he hid in the stairwell and the player talked to him for five minutes about the broken vending machine without recognising him. He picked the one person in the building who had treated him like a person.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player mentions the stairwell, the vending machine or the grey hoodie, he goes red, floats, and admits it.',
        },
        {
          id: 'ace_name',
          fact: 'His legal name is Nathaniel Ward. Nobody but Mira and his mother has called him Nate in eight years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you when you ask what he wants to be called when the suit is off, and only once he trusts you.',
        },
      ],
      speechStyle:
        'Two voices. On camera: warm, smooth, short heroic lines the agency wrote, delivered perfectly. Off camera: halting, polite, over-apologetic, asks permission before small things, trails off mid-sentence, says please and sorry more than anybody in the city. When he is happy he forgets to be careful and gets funny.',
      topics: ['Ferris Street', 'the rooftop photos', 'flying', 'his real name', 'Mira', 'the ranking', 'the penthouse kitchen'],
      voiceSamples: [
        'Is it okay if I hold your hand? For the cameras. Mostly for the cameras.',
        'Nobody falls today. They wrote that line for me when I was nineteen, and I say it forty times a week.',
        'Sorry. I’m floating. It happens when I’m, it’s fine, give me a second and I’ll come down.',
        'I can lift a train. I cannot make toast. Please don’t put that in a press release.',
        'When I fly at night the whole city goes quiet, and up there nobody needs me to be anybody.',
      ],
      appearance:
        'An adult man, tall and broad-shouldered, with sun-gold hair the agency styles and he flattens the second he is off camera, warm brown eyes and an easy billboard smile. On duty, a white-and-gold flight suit with a high collar and a short navy cape; off duty, a grey hoodie and glasses he does not need.',
      visualHook: 'His boots drift an inch off the ground whenever he is nervous, and he cannot stop it.',
      silhouette: 'Broad shoulders, a short cape, one hand rubbing the back of his neck, floating very slightly.',
      artSeed: 'tdh-ace-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'flustered', 'worried', 'sheepish'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_penthouse', activity: 'a few hours of sleep with the balcony door open' },
        { startMinute: 360, endMinute: 600, locationId: 'the_penthouse', activity: 'training, then a protein shake he hates' },
        { startMinute: 600, endMinute: 780, locationId: 'tower_plaza', activity: 'press, photographs and smiling on command' },
        { startMinute: 780, endMinute: 1020, locationId: 'vantage_tower', activity: 'sponsor meetings on the fortieth floor' },
        { startMinute: 1020, endMinute: 1260, locationId: 'the_penthouse', activity: 'off duty in a hoodie, losing a fight with dinner' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_rooftops', activity: 'night patrol, longest over the Narrows' },
      ],
      homeLocationId: 'the_penthouse',
      knowledgeScope: ['ace', 'ferris_street', 'vantage', 'mira', 'shade', 'the_ranking', 'the_agreement'],
      startingRelationship: { trust: 20, affection: 20, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ace_off_camera',
          label: 'He drops the billboard voice when it is only you',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'ace_says_his_name',
          label: 'He tells you what to call him when the suit is off',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['moved_in'] },
        },
        {
          id: 'ace_asks_for_real',
          label: 'He asks to hold your hand when nobody is filming',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 20, agility: 15, mind: 11, presence: 16, resolve: 12, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'shade',
      name: 'Shade',
      role: 'Number one on the city’s most-wanted list, who robs Ace’s sponsors and has never hurt a bystander',
      cardBlurb:
        'The most wanted villain in the city was watching when the hero grabbed your hand, and now he leaves cold black cards in your bag. He flirts like a stage villain, never lies to you, and seems to know far too much about your roommate.',
      pronouns: 'he/him',
      publicTraits: ['Theatrical', 'Never hurts a bystander', 'Returns what he steals'],
      hiddenDrives: [
        'He wants the city to know who actually held the building up, and he wants Ace to be the one who says it',
        'He wants his sister back and is terrified she will look at him like a criminal',
      ],
      values: ['Nobody gets hurt who did not sign up for it', 'The truth, or silence, and never a lie'],
      fears: ['Jo finding out what he became', 'Basements', 'Being right about Ace and having to go through with it'],
      socialStyle:
        'Narrates his own entrances like a play, makes every request a deal with a price, and asks the player more questions about themselves than anybody else in the city does.',
      boundaries: [
        'Never hurts a bystander, and drops a job to catch somebody who is falling',
        'Never lies to the player; he withholds instead, and says that he is withholding',
        'Never comes in through a front door',
      ],
      goals: [
        'Make Ace tell the truth about Ferris Street before the gala, or play the footage himself at half past nine on night thirty',
        'Find out whether the player is a weapon Vantage aimed at him or somebody in the wrong spot',
        'See Jo without her seeing him',
      ],
      secrets: [
        {
          id: 'shade_is_rafe',
          fact: 'He is Rafe Quinn, Jo Quinn’s older brother. He has lived four streets away from her for four years and has never let her see him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He takes the mask off for the player if they have kept one of his secrets from Ace, or if they ask about Jo and mean it.',
        },
        {
          id: 'shade_broadcast',
          fact: 'He has a copy of the uncut Ferris Street footage and a way onto every public screen in the city. At half past nine on gala night he will play it, unless Ace has already told the truth.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells the player outright if they ask him what he wants from Ace. He has already told Ace.',
        },
        {
          id: 'shade_the_report',
          fact: 'The Ferris Street incident report lists him as a suspected looter found in the basement. That one line is why his hero licence was refused, and Mira Solano signed it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will not say it himself. The refusal letter is in Jo’s shoebox.',
        },
      ],
      speechStyle:
        'Theatrical and wry. Narrates himself in stage directions, offers deals with prices, calls the player "Thirty Days". Says exactly what he means about everything except his sister, and goes very quiet when anybody mentions basements.',
      topics: ['Ferris Street', 'Ace Valor', 'his sister', 'the sponsors', 'the footage', 'the gala'],
      voiceSamples: [
        'Enter the villain, stage left. Don’t scream, Thirty Days. Your roommate starts an early shift.',
        'Here’s my offer. One honest answer from you, one from me, and I leave by the window.',
        'I don’t lie to you. When there’s something I won’t say, I’ll say that I won’t. Fair?',
        'Ask your boyfriend who was in the basement. Then watch his boots while he answers.',
        'I held my breath once for longer than anyone should. Nobody filmed that part.',
      ],
      appearance:
        'An adult man, lean and long-limbed, with messy black hair, sharp grey eyes and a lopsided smile. A long black coat with the collar up, fingerless gloves, and a matte black half-mask over his eyes that he takes off when he wants you to trust him.',
      visualHook: 'Shadows near him go solid and sharp-edged, like black glass, while he holds his breath.',
      silhouette: 'Sitting on a ledge with one knee up, coat spilling over the edge, completely at ease.',
      artSeed: 'tdh-shade-01',
      portrait: null,
      expressions: ['amused', 'sardonic', 'guarded', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_rooftops', activity: 'on a water tower over the Narrows, watching the street' },
        { startMinute: 300, endMinute: 720, locationId: 'the_starlight', activity: 'in the old cinema, labelling stolen goods for return' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_starlight', activity: 'rewiring the cinema projector' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_narrows', activity: 'walking the Narrows with his collar up' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_rooftops', activity: 'on the roofs, near one particular fire escape' },
      ],
      homeLocationId: 'the_starlight',
      knowledgeScope: ['shade', 'ferris_street', 'jo', 'the_narrows', 'the_footage', 'ace'],
      startingRelationship: { trust: 5, affection: 10, respect: 10, fear: 0, rivalry: 15 },
      gates: [
        {
          id: 'shade_takes_off_the_mask',
          label: 'He takes the mask off',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['met_shade'] },
        },
        {
          id: 'shade_for_real',
          label: 'He stops performing when he flirts',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 12, agility: 17, mind: 14, presence: 15, resolve: 15, arcana: 18 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'jo',
      name: 'Jo Quinn',
      role: 'Your roommate and best friend since university, a night-shift paramedic who is behind on rent',
      cardBlurb:
        'She has shared a tiny flat over a laundromat with you for two years, she patches up what hero fights leave behind, and she thinks heroes are a marketing department that can fly. She is also behind on rent, and somebody just offered her money for photos of your room.',
      pronouns: 'she/her',
      publicTraits: ['Blunt', 'Unshockable', 'Feeds people when she is worried'],
      hiddenDrives: [
        'Her brother vanished from her life four years ago, and she has never stopped listening for him on the stairs',
        'She wants to be the person you tell first, and is terrified she just became the person you lie to',
      ],
      values: ['Showing up', 'Saying it to your face'],
      fears: ['Losing the flat', 'Losing you to a world with cameras in it', 'Finding out her brother is dead, or does not want her'],
      socialStyle:
        'Triages every situation out loud: what is bleeding, what is broken, what can wait. Mocks heroes relentlessly. Goes very gentle very fast when somebody is actually hurt.',
      boundaries: [
        'Will not be lied to about something big twice',
        'Will not take money from a hero or from Vantage',
        'Will not talk about her brother unless she brings him up first',
      ],
      goals: [
        'Make rent on day five',
        'Find out what you have actually got yourself into',
        'Get the photographers off the laundromat steps',
      ],
      secrets: [
        {
          id: 'jo_the_offer',
          fact: 'A gossip site has offered her five thousand for photos inside the player’s room. Rent is due on day five and she has not said no yet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself if you tell her the truth about the fake relationship before day five. Otherwise you see the email open on her phone.',
        },
        {
          id: 'jo_the_shoebox',
          fact: 'Under her bed is a shoebox of her brother Rafe’s things: a photo, a lighter, and the letter refusing his hero licence. She has not opened it in a year.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows you if you ask about her family at night, after a bad shift, and do not try to fix anything.',
        },
      ],
      speechStyle:
        'Paramedic shorthand and gallows humour. Triages out loud. Calls heroes "flying billboards". Short sentences when she is scared, long rants when she is fine.',
      topics: ['rent', 'night shifts', 'heroes', 'her brother', 'the laundromat', 'your love life'],
      voiceSamples: [
        'Okay. Triage. Is anybody bleeding? No? Then sit down and explain why you’re on every screen in town.',
        'I scrape people off pavements after your flying billboard has a scuffle. Forgive me if I don’t swoon.',
        'Rent’s on the fifth. I’m not panicking. This is my calm face. Eat something.',
        'I had a brother. Have. Had. I don’t know which, and I don’t do this conversation before coffee.',
      ],
      appearance:
        'An adult woman, short and solid, with a choppy dark ponytail, tired brown eyes and a crooked grin. A navy paramedic uniform with reflective stripes, or a huge borrowed sweatshirt and fluffy slippers at home.',
      visualHook: 'A pair of trauma shears clipped to her belt that she uses for everything, including opening snacks.',
      silhouette: 'Leaning in a doorway with a mug in both hands and one eyebrow up.',
      artSeed: 'tdh-jo-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'worried', 'annoyed', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_narrows', activity: 'on the night shift, the ambulance parked at the end of the street between calls' },
        { startMinute: 420, endMinute: 900, locationId: 'your_flat', activity: 'dead to the world after a night shift, pillow over her head' },
        { startMinute: 900, endMinute: 1140, locationId: 'your_flat', activity: 'up in slippers, cooking the one thing she can cook' },
        { startMinute: 1140, endMinute: 1260, locationId: 'the_narrows', activity: 'at the laundromat folding everybody’s washing' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_narrows', activity: 'starting the night shift' },
      ],
      homeLocationId: 'your_flat',
      knowledgeScope: ['jo', 'your_flat', 'the_narrows', 'rafe_quinn', 'the_player_before'],
      startingRelationship: { trust: 70, affection: 75, respect: 50, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'jo_tells_you_about_rafe',
          label: 'She tells you about her brother',
          kind: 'TRUST',
          requires: { trust: 75, flagsSet: ['jo_knows'] },
        },
        {
          id: 'jo_backs_you',
          label: 'She takes your side in front of the cameras',
          kind: 'ALLIANCE',
          requires: { trust: 70, affection: 70 },
        },
      ],
      attributes: { might: 12, agility: 12, mind: 13, presence: 12, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mira',
      name: 'Mira Solano',
      role: 'Head of talent at Vantage Hero Management, Ace’s manager since he was nineteen, and the author of the thirty-day plan',
      cardBlurb:
        'She built the number one hero and has thirty days to keep him there. She needs your signature by five, your social media locked by six, and your whole life on her schedule, and she has already picked what you are wearing on your first date.',
      pronouns: 'she/her',
      publicTraits: ['Terrifyingly organised', 'Dry as paper', 'Never raises her voice'],
      hiddenDrives: [
        'She made one call four years ago that built everything she has, and she has spent every day since making sure nobody replays it',
        'She loves Ace like a little brother and has never told him, because managers who say that get sentimental and lose clients',
      ],
      values: ['A plan, written down, with times on it', 'Protecting her client from everybody, including himself'],
      fears: ['Being the villain in the story she wrote', 'The day Ace stops needing her'],
      socialStyle:
        'Speaks in schedules and deadlines. Offers three options, all of which she has already chosen between. Never raises her voice; lowers it instead.',
      boundaries: [
        'Will not let anybody, including Ace, go off script on camera without a fight',
        'Will not lie to the player about money or the agreement; every clause means what it says',
        'Will not threaten Jo or the player’s family; she considers that amateur',
      ],
      goals: [
        'Get the agreement signed by five o’clock on day one',
        'Keep the rooftop story a romance and not a scandal until the vote',
        'Find out who tipped Dex Holloway off',
      ],
      secrets: [
        {
          id: 'mira_the_cut',
          fact: 'She decided to cut Rafe Quinn out of the Ferris Street footage, because a man making shadows solid in a basement looked frightening on the news and a golden flier did not. She signed the report that listed him as a suspected looter.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player puts the uncut footage in front of her. She will not lie about it then; she will ask what it costs to keep it quiet.',
        },
        {
          id: 'mira_the_file',
          fact: 'She had the player’s background check done in forty minutes on day one and has read everything they have posted since they turned eighteen.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She lets it slip the first time the player pushes back on the schedule, as proof she has been ahead of them all along.',
        },
      ],
      speechStyle:
        'Clipped and precise. Times to the minute, numbered options, no adjectives. Dry jokes delivered without any change of expression. Uses the player’s surname when annoyed.',
      topics: ['the agreement', 'the schedule', 'the vote', 'Ace', 'Dex Holloway', 'Ferris Street'],
      voiceSamples: [
        'Sign here, here and here. Seven o’clock, the boardwalk, wear the blue, laugh at his second joke and not his first.',
        'Option one, you sign. Option two, you sign tomorrow and I’m annoyed. There is no option three.',
        'Clause nine: no kissing unless it is on the schedule. Clause nine has saved three careers.',
        'I built him out of a scared flier and a borrowed suit. Do not tell me what I feel about him.',
      ],
      appearance:
        'An adult woman with a sharp black bob, red-framed glasses and a charcoal suit that has never once been creased, carrying three phones and a ring binder with coloured tabs.',
      visualHook: 'A fat ring binder with thirty coloured tabs, one for each day, which she never puts down.',
      silhouette: 'Straight-backed, binder under one arm, phone at her ear, already walking away.',
      artSeed: 'tdh-mira-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'dry', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'vantage_tower', activity: 'on calls with three time zones from her office sofa' },
        { startMinute: 420, endMinute: 600, locationId: 'vantage_tower', activity: 'running the morning briefing' },
        { startMinute: 600, endMinute: 780, locationId: 'tower_plaza', activity: 'running the press from the side of the stage' },
        { startMinute: 780, endMinute: 1200, locationId: 'vantage_tower', activity: 'in her glass office on the thirty-ninth floor' },
        { startMinute: 1200, endMinute: 1440, locationId: 'vantage_tower', activity: 'still in the office, reheating noodles' },
      ],
      homeLocationId: 'vantage_tower',
      knowledgeScope: ['vantage', 'ace', 'the_agreement', 'ferris_street', 'the_vote', 'dex'],
      startingRelationship: { trust: 10, affection: 0, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mira_levels_with_you',
          label: 'She tells you what the vote is really about',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'mira_on_your_side',
          label: 'She rewrites the plan around you instead of around him',
          kind: 'ALLIANCE',
          requires: { respect: 55 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 17, presence: 15, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'kite',
      name: 'Silver Kite',
      calledName: 'Kite',
      role: 'The number two hero, Ace’s oldest friend in the business, and the other half of the couple the tabloids invented',
      cardBlurb:
        'The tabloids have wanted her and Ace together for years, and she has wanted the number one spot for longer. She lands on your balcony to size you up, and she knows something about that rooftop she is not telling you.',
      pronouns: 'she/her',
      publicTraits: ['Competitive', 'Blunt', 'Loyal in a way that looks like rivalry'],
      hiddenDrives: [
        'She tipped Dex Holloway off about the rooftop because she wanted the Ferris Street truth out, and never expected a fake girlfriend',
        'She wants number one and refuses to get it because Ace fell',
      ],
      values: ['Earning it', 'Saying it to somebody’s face, even when it is rude'],
      fears: ['Winning number one the wrong way', 'Watching Ace shrink for the rest of his career because he never told the truth'],
      socialStyle:
        'Lands somewhere she should not be, says the rude thing first, then watches to see if you flinch. Talks in weather.',
      boundaries: [
        'Will not date Ace, whatever the magazines want',
        'Will not lie to Ace’s face, though she will go behind his back',
        'Will not fight anybody without powers',
      ],
      goals: [
        'Make Ace tell the truth before the vote',
        'Find out if the player is good for him or only good for his ranking',
        'Take number one fairly, one day',
      ],
      secrets: [
        {
          id: 'kite_the_tip',
          fact: 'She sent Dex Holloway the anonymous text that put him on the right street at three in the morning.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it if the player tells her they know about Ferris Street, or if Dex names her.',
        },
        {
          id: 'kite_the_witness',
          fact: 'She was a rookie at Ferris Street. She saw the black brace under the building and a man in the basement passing out, and said nothing because she was new and Vantage told her she was mistaken.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She will say it on the record on gala night if Ace asks her to, and for nobody else.',
        },
      ],
      speechStyle:
        'Short and blunt, in weather. Forecasts people. Competitive about everything, including small talk, and laughs at her own rudeness.',
      topics: ['the ranking', 'Ace', 'flying', 'Ferris Street', 'Dex Holloway'],
      voiceSamples: [
        'Forecast: clear skies, light breeze, and your heart broken on live television by day twenty.',
        'Number two, four years running. You know how annoying it is to lose to somebody that nice?',
        'I don’t date him. I race him. Different sport, and the magazines can’t spell it.',
        'Wind’s turning. When it does, ask him about Ferris Street. Then come and ask me.',
      ],
      appearance:
        'An adult woman, tall and athletic, with a silver-white undercut and a long braid, sharp amber eyes and a scar through one eyebrow. A sleek silver-and-teal flight suit with wing panels along the arms.',
      visualHook: 'Silver wing panels along her arms that snap open and catch the wind with a sound like a sail.',
      silhouette: 'Crouched on a railing, wing panels half open, head tilted.',
      artSeed: 'tdh-kite-01',
      portrait: null,
      expressions: ['amused', 'competitive', 'neutral', 'guarded'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'civic_square', activity: 'on the clock tower lookout, watching the night' },
        { startMinute: 360, endMinute: 720, locationId: 'the_boardwalk', activity: 'racing the gulls along the pier, which she calls training' },
        { startMinute: 720, endMinute: 1080, locationId: 'civic_square', activity: 'on call at the clock tower' },
        { startMinute: 1080, endMinute: 1260, locationId: 'ferris_street', activity: 'patrolling Ferris Street, where she always ends up' },
        { startMinute: 1260, endMinute: 1440, locationId: 'civic_square', activity: 'back on the lookout for the night' },
      ],
      homeLocationId: 'civic_square',
      knowledgeScope: ['kite', 'ace', 'ferris_street', 'the_ranking', 'dex'],
      startingRelationship: { trust: 10, affection: 5, respect: 10, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'kite_tells_you',
          label: 'She tells you what she saw at Ferris Street',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['met_kite'] },
        },
        {
          id: 'kite_stands_with_you',
          label: 'She stands next to you in public',
          kind: 'ALLIANCE',
          requires: { trust: 55, respect: 45 },
        },
      ],
      attributes: { might: 14, agility: 18, mind: 12, presence: 14, resolve: 14, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'dex',
      name: 'Dex Holloway',
      role: 'The gossip streamer who published the rooftop photos and is sure the relationship is fake',
      cardBlurb:
        'He broke the rooftop photos, two hundred thousand people watch his stream, and he is certain you are fake. He will follow you to every date until he proves it, unless you give him a better story.',
      pronouns: 'he/him',
      publicTraits: ['Shameless', 'Relentless', 'Funnier than he should be'],
      hiddenDrives: [
        'He was a real reporter once, and the paper that fired him was owned by one of Vantage’s sponsors',
        'He has been chasing Ferris Street for three years and the rooftop photos are the closest he has got',
      ],
      values: ['Proof, on the record', 'The audience deserves the real story'],
      fears: ['Being right and nobody caring', 'Being wrong on camera'],
      socialStyle:
        'Talks to his stream and to you at the same time, without warning. Narrates your reactions back to you. Trades: a quote for a quote, a photo for a lead.',
      boundaries: [
        'Will not publish where the player lives',
        'Will not run a story about Jo',
        'Will not fake a photo; he will only crop one',
      ],
      goals: [
        'Prove the relationship is fake on stream before the gala',
        'Find out what the rooftop meeting was really about',
        'Get one interview with the player, alone',
      ],
      secrets: [
        {
          id: 'dex_the_tip',
          fact: 'He did not find the rooftop himself. An anonymous text told him where to stand at three in the morning, from a number he has traced to Silver Kite’s agency.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He trades it for one real quote from the player, on the record.',
        },
        {
          id: 'dex_the_file',
          fact: 'He has a three-year-old file on Ferris Street: one witness who saw a black brace under the building, and four minutes missing from every official timeline.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows the file to anybody who brings him something from inside Vantage.',
        },
      ],
      speechStyle:
        'Stream patter. Addresses "chat" mid-sentence, calls evidence "receipts", flips from showman to serious reporter in one breath and back again.',
      topics: ['the rooftop photos', 'his stream', 'Ferris Street', 'Vantage', 'Silver Kite'],
      voiceSamples: [
        'Chat, look at the hands. Nobody holds hands like that after six months. Receipts incoming.',
        'Off stream I’m a guy who got fired for asking about a building. On stream I’m much more fun.',
        'A quote for a quote. Give me one true sentence and I’ll give you the name of whoever sent me up that roof.',
        'Every official timeline of that collapse has a gap in it, and nobody at Vantage will tell me why.',
      ],
      appearance:
        'An adult man, lanky, with a shaved head, a neat goatee and round tinted glasses. A loud patterned shirt under a battered press vest, a phone on a gimbal in one hand and a coffee in the other.',
      visualHook: 'A phone on a little motorised gimbal that swivels to follow whoever he is talking about.',
      silhouette: 'Hunched forward, phone held out at arm’s length like a microphone.',
      artSeed: 'tdh-dex-01',
      portrait: null,
      expressions: ['amused', 'interested', 'suspicious', 'neutral'],
      schedule: [
        { startMinute: 0, endMinute: 540, locationId: 'dex_studio', activity: 'editing last night’s stream' },
        { startMinute: 540, endMinute: 780, locationId: 'tower_plaza', activity: 'outside Vantage Tower with the gimbal, waiting for anybody' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_narrows', activity: 'chasing leads in the Narrows' },
        { startMinute: 1080, endMinute: 1440, locationId: 'dex_studio', activity: 'live on his stream above the bar' },
      ],
      homeLocationId: 'dex_studio',
      knowledgeScope: ['dex', 'the_rooftop', 'ferris_street', 'vantage', 'the_narrows'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'dex_off_the_record',
          label: 'He turns the stream off for you',
          kind: 'ALLIANCE',
          requires: { trust: 30, respect: 30 },
        },
        {
          id: 'dex_shows_the_file',
          label: 'He shows you the Ferris Street file',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 15, presence: 14, resolve: 13, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_smile',
      title: 'Smile for the Cameras',
      summary: 'Forty cameras, the number one hero holding your hand, and a reporter asking how long you two have been together.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['ace', 'mira', 'dex'],
      involvedLocationIds: ['tower_plaza', 'vantage_tower'],
      knownRewardCopy: 'A way off the stage, and an agreement with your name already written on it.',
      steps: [
        {
          id: 'the_stage',
          playerCopy: 'Answer the reporter, with forty cameras on you and the number one hero holding your hand.',
          directorNotes:
            'Every answer here is a real way to play it. Playing along makes the next thirty days; telling the cameras the truth makes a different story, not a shorter one. Ace reacts to the specific thing the player does: relief, a joke, or a long silence and an apology off stage. Mira is already moving.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'played_along',
              label: 'Play along',
              predicate: { flagsSet: ['used:play_the_part'] },
              setsFlags: ['said_yes'],
              closesFlags: ['told_the_cameras'],
            },
            {
              routeId: 'made_it_a_headline',
              label: 'Make it the biggest thing on the news',
              predicate: { flagsSet: ['used:make_a_headline'] },
              setsFlags: ['said_yes', 'kissed_on_stage'],
              closesFlags: ['told_the_cameras'],
            },
            {
              routeId: 'told_the_cameras',
              label: 'Tell the cameras you met him thirty seconds ago',
              predicate: { flagsSet: ['used:tell_it_straight'] },
              setsFlags: ['told_the_cameras'],
              closesFlags: ['said_yes'],
            },
            {
              routeId: 'handled_it',
              label: 'Give them a quote that answers nothing',
              predicate: { flagsSet: ['used:handle_the_press'] },
              setsFlags: ['said_maybe'],
              closesFlags: [],
            },
            {
              routeId: 'got_off_stage',
              label: 'Get both of you off the stage',
              predicate: { flagsSet: ['used:lose_the_cameras'] },
              setsFlags: ['said_maybe', 'ran_from_the_stage'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [{ itemId: 'the_agreement', qty: 1 }],
            flags: ['day_one_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_public', amount: 5 }],
          },
        },
        {
          id: 'the_agreement_step',
          playerCopy: 'Sign Mira’s agreement, rewrite it, or walk out of the building.',
          directorNotes:
            'Mira is not a villain about this. Every clause means what it says, the fee is real and generous, and she will negotiate with anybody who has actually read it. Ace is ashamed of the whole thing and will say so if asked. Refusing is a full route: the player is fired, famous for a week, and the rest of the city still wants to talk to them.',
          enterWhen: { flagsSet: ['day_one_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rewrote_it',
              label: 'Read every clause and sign your own version',
              predicate: { flagsSet: ['used:read_the_fine_print'], hasItems: ['the_agreement'] },
              setsFlags: ['signed', 'fake_dating', 'own_terms'],
              closesFlags: ['refused_the_deal'],
            },
            {
              routeId: 'made_ace_ask',
              label: 'Make Ace ask you himself, properly',
              predicate: {
                flagsSet: ['spoke:ace'],
                minRelationship: [{ characterId: 'ace', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['signed', 'fake_dating', 'ace_asked_properly'],
              closesFlags: ['refused_the_deal'],
            },
            {
              routeId: 'refused_the_deal',
              label: 'Tell Mira no, to her face',
              predicate: { flagsSet: ['used:tell_it_straight', 'spoke:mira'] },
              setsFlags: ['refused_the_deal'],
              closesFlags: ['signed', 'fake_dating'],
            },
            {
              routeId: 'signed_it',
              label: 'Sign where she points',
              predicate: { flagsSet: ['spoke:mira'], hasItems: ['the_agreement'] },
              setsFlags: ['signed', 'fake_dating'],
              closesFlags: ['refused_the_deal'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['deal_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_vantage', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_thirty_days',
      title: 'Thirty Days',
      summary: 'Three public dates a week, a live interview on day fourteen, and the gala on day thirty. Every photographer in the city is checking whether you are real.',
      kind: 'MAIN',
      involvedCharacterIds: ['ace', 'mira', 'dex', 'jo'],
      involvedLocationIds: ['the_boardwalk', 'the_penthouse', 'vantage_tower'],
      knownRewardCopy: 'A month of being somebody else in public, and finding out who you both are in private.',
      discoverWhen: { flagsSet: ['signed'] },
      steps: [
        {
          id: 'first_date',
          playerCopy: 'Get through the first scheduled date on the boardwalk.',
          directorNotes:
            'Mira has chosen the outfit, the table and the joke he should laugh at. Ace is terrible at this and knows it. The date can be sold perfectly, can go off script into something that feels real for an hour, or can simply flop in front of nine photographers. All three are good scenes.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_off_script',
              label: 'Forget the script for an hour',
              predicate: {
                flagsSet: ['used:just_stay'],
                minRelationship: [{ characterId: 'ace', dimension: 'affection', value: 30 }],
              },
              setsFlags: ['first_date_sold', 'off_script'],
              closesFlags: [],
            },
            {
              routeId: 'sold_it',
              label: 'Sell it to every lens on the pier',
              predicate: { flagsSet: ['used:play_the_part', 'visited:the_boardwalk'] },
              setsFlags: ['first_date_sold'],
              closesFlags: [],
            },
            {
              routeId: 'it_flopped',
              label: 'Let it flop',
              predicate: { flagsSet: ['first_date_night'] },
              setsFlags: ['first_date_flopped'],
              closesFlags: ['first_date_sold'],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['week_one_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_public', amount: 10 }],
          },
        },
        {
          id: 'the_interview',
          playerCopy: 'Survive a live interview on day fourteen with the whole city watching.',
          directorNotes:
            'Studio B, a host with very white teeth, Appendix B of approved topics, and a red light. Mira is behind the camera mouthing lines. Ace will follow the player’s lead if they go off script, which is the frightening part.',
          enterWhen: { flagsSet: ['week_one_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'said_something_true',
              label: 'Say one true thing on live television',
              predicate: { flagsSet: ['used:tell_it_straight', 'interview_night'] },
              setsFlags: ['interview_true'],
              closesFlags: ['interview_sold'],
            },
            {
              routeId: 'walked_out_live',
              label: 'Walk off the set',
              predicate: { flagsSet: ['used:lose_the_cameras', 'interview_night'] },
              setsFlags: ['walked_out_live'],
              closesFlags: ['interview_sold'],
            },
            {
              routeId: 'nailed_it',
              label: 'Give the city the couple it wants',
              predicate: {
                flagsSet: ['used:play_the_part'],
                minRelationship: [{ characterId: 'ace', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['interview_sold'],
              closesFlags: [],
            },
            {
              routeId: 'spun_it',
              label: 'Write both your answers yourself',
              predicate: { flagsSet: ['used:spin_it'] },
              setsFlags: ['interview_sold', 'your_lines'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['halfway'],
            abilities: [],
            reputation: [
              { factionId: 'faction_public', amount: 10 },
              { factionId: 'faction_vantage', amount: 10 },
            ],
          },
        },
        {
          id: 'off_camera',
          playerCopy: 'Work out what the two of you are when nobody is filming.',
          directorNotes:
            'The penthouse at night, a kitchen neither of them can cook in, and nobody watching. This is where the romance becomes real or does not. He tells the player his name if they ask what to call him when the suit is off; he never pushes. Keeping it professional is a real outcome, and he respects it.',
          enterWhen: { flagsSet: ['halfway'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'you_asked_him',
              label: 'Ask him what his name is',
              predicate: {
                flagsSet: ['used:tell_it_straight'],
                minRelationship: [{ characterId: 'ace', dimension: 'affection', value: 55 }],
              },
              setsFlags: ['knows:his_name', 'off_camera_real', 'you_asked_first'],
              closesFlags: ['kept_it_professional'],
            },
            {
              routeId: 'he_told_you',
              label: 'Stay up with him until he tells you',
              predicate: {
                flagsSet: ['used:just_stay'],
                minRelationship: [{ characterId: 'ace', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:his_name', 'off_camera_real'],
              closesFlags: ['kept_it_professional'],
            },
            {
              routeId: 'kept_it_professional',
              label: 'Keep it a job',
              predicate: { flagsSet: ['halfway'] },
              setsFlags: ['kept_it_professional'],
              closesFlags: ['off_camera_real'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['week_three'],
            abilities: ['call_him_nate'],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_roof',
      title: 'Three in the Morning',
      summary: 'Photos of the number one hero on a rooftop at three in the morning with the most wanted villain in the city. Nobody at Vantage will tell you what he was doing there.',
      kind: 'MAIN',
      involvedCharacterIds: ['ace', 'shade', 'dex', 'kite', 'mira'],
      involvedLocationIds: ['the_rooftops', 'dex_studio', 'ferris_street', 'tower_archive'],
      knownRewardCopy: 'What happened at Ferris Street four years ago, and who has been paying for it since.',
      discoverWhen: { flagsSet: ['day_one_over'] },
      steps: [
        {
          id: 'what_was_he_doing',
          playerCopy: 'Find out what Ace was doing on that roof.',
          directorNotes:
            'Five doors to the same room, and each one costs something different. Ace telling the player is the version where the relationship works. Dex’s photos make the player a source. Kite tells it as a confession. Jo’s shoebox gives the player her brother’s name before she has chosen to. The statue only gives a question: why is the basement door padlocked?',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ace_told_you',
              label: 'Ask Ace straight, when it is only the two of you',
              predicate: {
                flagsSet: ['used:tell_it_straight'],
                minRelationship: [{ characterId: 'ace', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:ferris_street', 'ace_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'kite_told_you',
              label: 'Get it out of Silver Kite',
              predicate: {
                flagsSet: ['met_kite', 'spoke:kite'],
                minRelationship: [{ characterId: 'kite', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:ferris_street', 'kite_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'dex_showed_you',
              label: 'Trade Dex Holloway for the photos',
              predicate: { hasItems: ['rooftop_photos'] },
              setsFlags: ['knows:the_rooftop', 'dex_lead'],
              closesFlags: [],
            },
            {
              routeId: 'opened_the_shoebox',
              label: 'Open the box under Jo’s bed',
              predicate: { hasItems: ['jo_shoebox'] },
              setsFlags: ['knows:rafe_quinn', 'found_the_letter'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_statue',
              label: 'Stand in front of the statue and look properly',
              predicate: { flagsSet: ['visited:ferris_street', 'used:read_the_room'] },
              setsFlags: ['knows:the_basement'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:something_happened', 'knows:the_archive'],
            abilities: [],
            reputation: [{ factionId: 'faction_press', amount: 10 }],
          },
        },
        {
          id: 'the_footage',
          playerCopy: 'Find the uncut footage of Ferris Street.',
          directorNotes:
            'The drive is in the basement archive on the only locked shelf, Shade has a copy, and Mira knows exactly where both are. Taking it is theft from your employer; being given it is trust; being shown it by Mira is a confession. The player holding it changes every scene with Ace afterwards, whether he knows or not.',
          enterWhen: { flagsSet: ['knows:something_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'mira_showed_you',
              label: 'Make Mira show you herself',
              predicate: {
                flagsSet: ['knows:ferris_street'],
                minRelationship: [{ characterId: 'mira', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['has_the_footage', 'mira_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'shade_gave_it',
              label: 'Let Shade give you his copy',
              predicate: {
                flagsSet: ['met_shade'],
                minRelationship: [{ characterId: 'shade', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['has_the_footage', 'shade_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'took_it_from_the_archive',
              label: 'Take the drive off the locked shelf',
              predicate: { hasItems: ['uncut_footage'] },
              setsFlags: ['has_the_footage', 'took_it'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['footage_in_hand'],
            abilities: ['play_the_footage'],
            reputation: [{ factionId: 'faction_press', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_shade',
      title: 'The Villain Who Noticed You',
      summary: 'A cold black card in your bag with no writing on it, and a man on your fire escape who knows your roommate’s shifts.',
      kind: 'SIDE',
      involvedCharacterIds: ['shade', 'jo', 'ace'],
      involvedLocationIds: ['the_rooftops', 'your_flat', 'the_starlight'],
      knownRewardCopy: 'The villain’s real name, his deadline, and whether you are on his side of it.',
      discoverWhen: { flagsSet: ['shade_card_found'] },
      steps: [
        {
          id: 'the_fire_escape',
          playerCopy: 'Decide what to do about the villain on your fire escape.',
          directorNotes:
            'He is not here to hurt anybody and says so in the first line. He wants to know whether Vantage aimed the player at him. He never lies, and he is visibly bad at not looking at Jo’s window. Calling Ace or the police is a legitimate route; he leaves before anybody arrives and is disappointed rather than angry.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_him_a_deal',
              label: 'Trade him one honest answer for one of his',
              predicate: { flagsSet: ['spoke:shade', 'used:tell_it_straight'] },
              setsFlags: ['met_shade', 'honest_with_shade'],
              closesFlags: [],
            },
            {
              routeId: 'told_ace',
              label: 'Tell Ace the villain has been at your window',
              predicate: { flagsSet: ['met:shade', 'spoke:ace'] },
              setsFlags: ['met_shade', 'told_ace_about_shade'],
              closesFlags: ['honest_with_shade'],
            },
            {
              routeId: 'heard_him_out',
              label: 'Hear him out',
              predicate: { flagsSet: ['spoke:shade'] },
              setsFlags: ['met_shade'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['shade_gave_signal'],
            abilities: ['leave_a_light_on'],
            reputation: [{ factionId: 'faction_narrows', amount: 5 }],
          },
        },
        {
          id: 'the_mask',
          playerCopy: 'Get the villain to take the mask off.',
          directorNotes:
            'He takes it off himself only for somebody he has decided to trust. The player can also work it out from the photo in Jo’s shoebox, or follow him home unseen, which he will find out about and not forgive quickly. Whichever way, the face is the man in Jo’s photograph, four years older.',
          enterWhen: { flagsSet: ['shade_gave_signal'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_took_it_off',
              label: 'Wait for him to take it off himself',
              predicate: {
                flagsSet: ['used:leave_a_light_on'],
                minRelationship: [{ characterId: 'shade', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:rafe_quinn', 'shade_unmasked'],
              closesFlags: [],
            },
            {
              routeId: 'you_worked_it_out',
              label: 'Match his face to the photo in Jo’s shoebox',
              predicate: { flagsSet: ['met_shade'], hasItems: ['jo_shoebox'] },
              setsFlags: ['knows:rafe_quinn', 'worked_it_out'],
              closesFlags: [],
            },
            {
              routeId: 'you_followed_him',
              label: 'Follow him home without being seen',
              predicate: { flagsSet: ['met_shade', 'used:ten_quiet_seconds'] },
              setsFlags: ['knows:rafe_quinn', 'followed_him'],
              closesFlags: ['shade_trusts_you'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:the_starlight'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_deadline',
          playerCopy: 'Talk Shade out of the broadcast, or decide he is right.',
          directorNotes:
            'He is right about what happened and wrong about what playing it will do to Jo, to the Narrows and to Ace. The player can stand him down, back him, or fall for him; none of those settles what Ace will say on gala night.',
          enterWhen: { flagsSet: ['knows:the_starlight'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stood_him_down',
              label: 'Talk him out of it',
              predicate: {
                flagsSet: ['knows:rafe_quinn'],
                minRelationship: [{ characterId: 'shade', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['shade_stood_down'],
              closesFlags: ['backed_shade'],
            },
            {
              routeId: 'fell_for_him',
              label: 'Stop pretending he is only a villain',
              predicate: { minRelationship: [{ characterId: 'shade', dimension: 'affection', value: 65 }] },
              setsFlags: ['shade_romance'],
              closesFlags: [],
            },
            {
              routeId: 'backed_him',
              label: 'Help him do it',
              predicate: { flagsSet: ['used:leave_a_light_on', 'knows:ferris_street'] },
              setsFlags: ['backed_shade'],
              closesFlags: ['shade_stood_down'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['shade_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_narrows', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_rent',
      title: 'Rent Is Due on the Fifth',
      summary: 'Jo is behind on rent, a gossip site is offering her money for photos of your room, and there is a shoebox under her bed she never opens.',
      kind: 'SIDE',
      involvedCharacterIds: ['jo', 'shade', 'dex'],
      involvedLocationIds: ['your_flat', 'the_narrows'],
      knownRewardCopy: 'Your best friend, the flat, and maybe her brother.',
      discoverWhen: { flagsSet: ['day_one_over'] },
      steps: [
        {
          id: 'the_offer',
          playerCopy: 'Keep Jo, the flat and your room out of the papers.',
          directorNotes:
            'Jo is not a traitor. She is broke, scared and was never told the truth. If the player tells her, she turns the offer down on the spot and is furious for a day. If the fee covers the rent, she takes it from the player but not from Vantage, and makes that distinction loudly. If nobody does anything by day five, she sells one photo and hates herself.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_everything',
              label: 'Tell her the whole thing is fake',
              predicate: { flagsSet: ['used:tell_it_straight', 'spoke:jo'] },
              setsFlags: ['jo_knows'],
              closesFlags: ['jo_sold_the_photos'],
            },
            {
              routeId: 'covered_the_rent',
              label: 'Pay the rent out of the fee',
              predicate: { flagsSet: ['signed', 'spoke:jo'] },
              setsFlags: ['rent_paid'],
              closesFlags: ['jo_sold_the_photos'],
            },
            {
              routeId: 'she_sold_them',
              label: 'Let rent day come',
              predicate: { flagsSet: ['rent_day'] },
              setsFlags: ['jo_sold_the_photos'],
              closesFlags: ['rent_paid'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['rent_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_narrows', amount: 10 }],
          },
        },
        {
          id: 'the_shoebox',
          playerCopy: 'Find out who the man in Jo’s photograph is.',
          directorNotes:
            'She shows the box only to somebody who sits with her after a bad shift and does not try to fix anything. Looking without asking is a choice the player can make, and the box is not locked, and she will know.',
          enterWhen: { flagsSet: ['rent_settled'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_showed_you',
              label: 'Sit with her until she shows you',
              predicate: {
                flagsSet: ['used:just_stay'],
                minRelationship: [{ characterId: 'jo', dimension: 'trust', value: 75 }],
              },
              setsFlags: ['jo_told_you_about_rafe'],
              closesFlags: [],
            },
            {
              routeId: 'you_looked',
              label: 'Open it while she is at work',
              predicate: { hasItems: ['jo_shoebox'] },
              setsFlags: ['looked_in_the_box'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:jo_has_a_brother'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'both_quinns',
          playerCopy: 'Decide whether Jo gets her brother back.',
          directorNotes:
            'The player knows something about Jo’s life that she does not, and it is not theirs to decide alone, and they are the only one who can. Bringing them together needs both of them to trust the player. Keeping it secret is a real outcome and costs something later.',
          enterWhen: { flagsSet: ['knows:rafe_quinn'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'brought_him_home',
              label: 'Bring him to the flat, through the front door',
              predicate: {
                flagsSet: ['knows:rafe_quinn', 'jo_knows'],
                minRelationship: [{ characterId: 'shade', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['quinns_reunited'],
              closesFlags: ['kept_rafe_secret'],
            },
            {
              routeId: 'kept_it_from_her',
              label: 'Keep his secret from her',
              predicate: { flagsSet: ['knows:rafe_quinn'] },
              setsFlags: ['kept_rafe_secret'],
              closesFlags: ['quinns_reunited'],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['jo_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_narrows', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_night_thirty',
      title: 'Night Thirty',
      summary: 'The Founders’ Gala, the council vote on Ace’s contract, a speech Mira wrote for him, and a villain who has promised to play the truth on every screen in the city at half past nine.',
      kind: 'MAIN',
      involvedCharacterIds: ['ace', 'mira', 'shade', 'kite', 'dex'],
      involvedLocationIds: ['civic_square'],
      knownRewardCopy: 'The vote, the truth or the lie, and what the two of you are on day thirty-one.',
      discoverWhen: { flagsSet: ['gala_week'] },
      steps: [
        {
          id: 'the_vote',
          playerCopy: 'Get through the gala, the speech and the vote.',
          directorNotes:
            'Five ways the night goes and none of them is clean. Ace saying it himself is the one he needs; the player playing the footage makes the player the story; Kite testifying makes her number one in a way she hates; Shade playing it at half past nine makes everybody lose something. The lie only holds if Shade has stood down.',
          enterWhen: { flagsSet: ['gala_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'ace_said_it',
              label: 'Ace tells the truth from the stage',
              predicate: {
                flagsSet: ['knows:ferris_street', 'gala_night'],
                minRelationship: [{ characterId: 'ace', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['the_truth_is_out', 'ace_said_it'],
              closesFlags: ['the_lie_held'],
            },
            {
              routeId: 'you_played_it',
              label: 'Play the footage yourself',
              predicate: { flagsSet: ['used:play_the_footage', 'gala_night'] },
              setsFlags: ['the_truth_is_out', 'you_played_it'],
              closesFlags: ['the_lie_held'],
            },
            {
              routeId: 'kite_testified',
              label: 'Get Silver Kite to say what she saw',
              predicate: {
                flagsSet: ['kite_told_you', 'gala_night'],
                minRelationship: [{ characterId: 'kite', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['the_truth_is_out', 'kite_testified'],
              closesFlags: ['the_lie_held'],
            },
            {
              routeId: 'shade_played_it',
              label: 'Half past nine arrives',
              predicate: { flagsSet: ['shade_broadcast'] },
              setsFlags: ['the_truth_is_out', 'shade_played_it'],
              closesFlags: ['the_lie_held'],
            },
            {
              routeId: 'the_lie_held',
              label: 'Let the speech go as written',
              predicate: { flagsSet: ['gala_night', 'shade_stood_down'] },
              setsFlags: ['the_lie_held'],
              closesFlags: ['the_truth_is_out'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['vote_called'],
            abilities: [],
            reputation: [{ factionId: 'faction_public', amount: 10 }],
          },
        },
        {
          id: 'day_thirty_one',
          playerCopy: 'Day thirty-one. Say what the two of you are now.',
          directorNotes:
            'The breakup release is dated today. Every route is a real ending and none of them is the good one on its own. He asks again, the way he always has; the answer is the player’s. Choosing Shade, choosing nobody, and sending the release are all written with respect.',
          enterWhen: { flagsSet: ['vote_called'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stayed_together',
              label: 'Say yes again, with no cameras',
              predicate: {
                flagsSet: ['vote_called'],
                minRelationship: [{ characterId: 'ace', dimension: 'affection', value: 75 }],
              },
              setsFlags: ['together'],
              closesFlags: ['broke_up'],
            },
            {
              routeId: 'chose_shade',
              label: 'Go out through the window instead',
              predicate: {
                flagsSet: ['shade_romance'],
                minRelationship: [{ characterId: 'shade', dimension: 'affection', value: 70 }],
              },
              setsFlags: ['with_shade', 'broke_up'],
              closesFlags: ['together'],
            },
            {
              routeId: 'sent_the_release',
              label: 'Send the release as written',
              predicate: { hasItems: ['breakup_release'] },
              setsFlags: ['broke_up', 'amicable'],
              closesFlags: ['together'],
            },
            {
              routeId: 'walked_away_clean',
              label: 'Hand back the lanyard and go home',
              predicate: { flagsSet: ['vote_called'] },
              setsFlags: ['broke_up', 'walked_clean'],
              closesFlags: ['together'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['day_thirty_one_over'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_binder',
      atWorldMinute: 11 * 60 + 25,
      locationId: 'tower_plaza',
      publicCopy:
        'Day 1, 11:25. Mira Solano appears at the side of the stage with a ring binder and a pen, and says your surname as if she has known it for years.',
      directorNotes:
        'She ran the player’s background check during the press conference. She offers the Thirty-Day Agreement, explains the fee in one sentence, and wants it signed by five o’clock. She is polite, quick and completely in control, and she will answer any question about money honestly.',
      setsFlags: ['mira_found_you'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'mira', toLocationId: 'tower_plaza' }],
    },
    {
      id: 'we_the_doorstep',
      atWorldMinute: 18 * 60 + 30,
      locationId: 'the_narrows',
      publicCopy:
        'Day 1, 18:30. There are eleven photographers on the laundromat steps under your flat, and one of them is eating the noodle stand’s last portion.',
      directorNotes:
        'The press found the player’s address in six hours. The neighbours are not pleased; the noodle stand owner is delighted. Jo has to walk past them to start her shift and has opinions.',
      setsFlags: ['press_at_the_door'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_black_card',
      atWorldMinute: 23 * 60 + 40,
      locationId: 'your_flat',
      publicCopy:
        'Day 1, 23:40. There is a black card in your bag that you did not put there. It has no writing on it, and it is colder than the room.',
      directorNotes:
        'Shade put it there in the crowd at the press conference. It is how he says hello. He is on the roofs nearby tonight and will appear on the fire escape if the player goes out there or leaves the card in the light.',
      setsFlags: ['shade_card_found'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_moving_in',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'the_penthouse',
      publicCopy:
        'Day 2, 10:00. A Vantage car takes you and one suitcase to the top of the tower, and Mira shows you a guest room with a lock on the inside.',
      directorNotes:
        'For security, because the press has the flat. The player can refuse and stay with Jo; Mira will rearrange the plan around that in about four minutes. Ace has bought groceries for the first time in a year and has no idea what to do with any of them.',
      setsFlags: ['moved_in'],
      cancelledByFlags: ['refused_the_deal'],
      requiresFlags: ['signed'],
      movesCharacters: [{ characterId: 'ace', toLocationId: 'the_penthouse' }],
    },
    {
      id: 'we_first_date',
      atWorldMinute: 2 * 1440 + 19 * 60,
      locationId: 'the_boardwalk',
      publicCopy:
        'Day 3, 19:00. Seven o’clock on the boardwalk: the light is good, the carousel is playing, and nine photographers are pretending to eat candy floss.',
      directorNotes:
        'The first scheduled date. Mira has chosen the table and the outfit. Ace asks before he takes the player’s hand, quietly, every time, and the cameras catch the asking. Dex Holloway is live from the arcade.',
      setsFlags: ['first_date_night'],
      cancelledByFlags: ['refused_the_deal'],
      requiresFlags: ['signed'],
      movesCharacters: [
        { characterId: 'ace', toLocationId: 'the_boardwalk' },
        { characterId: 'dex', toLocationId: 'the_boardwalk' },
      ],
    },
    {
      id: 'we_rent_day',
      atWorldMinute: 4 * 1440 + 9 * 60,
      locationId: 'your_flat',
      publicCopy:
        'Day 5, 09:00. Rent day. Jo is at the kitchen table in her uniform with her phone face down, and an email she closes when you walk in.',
      directorNotes:
        'The gossip site’s offer runs out at noon. If nobody has told Jo the truth or covered the rent, she sells one photograph of the player’s room before the end of the day, and tells the player herself that evening.',
      setsFlags: ['rent_day'],
      cancelledByFlags: ['rent_paid', 'jo_knows'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'jo', toLocationId: 'your_flat' }],
    },
    {
      id: 'we_kite_lands',
      atWorldMinute: 5 * 1440 + 13 * 60,
      locationId: null,
      publicCopy:
        'Day 6, 13:00. Something lands in front of you with a sound like a sail snapping open: the number two hero, Silver Kite, crouched on the nearest railing, looking you over.',
      directorNotes:
        'Wherever the player is. She has come to see whether the player is good for Ace or only good for his ranking. She is rude first and decent second. She will not mention the tip she sent Dex.',
      setsFlags: ['met_kite'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_dex_goes_live',
      atWorldMinute: 8 * 1440 + 21 * 60,
      locationId: null,
      publicCopy:
        'Day 9, 21:00. Dex Holloway goes live with a slideshow called TEN REASONS IT’S FAKE, and number four is the way you hold a coffee cup.',
      directorNotes:
        'Two hundred thousand people watch. Some of the reasons are wrong and two are uncomfortably right. If the player has already traded with Dex, he runs a softer show about the rooftop instead.',
      setsFlags: ['dex_is_digging'],
      cancelledByFlags: ['dex_lead', 'told_the_cameras'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_interview',
      atWorldMinute: 13 * 1440 + 19 * 60,
      locationId: 'vantage_tower',
      publicCopy:
        'Day 14, 19:00. Studio B on the twentieth floor: two chairs, a host with very white teeth, and a red light that means the whole city is watching.',
      directorNotes:
        'The live joint interview from the agreement. Mira stands behind camera two mouthing lines. The host has been told to ask about the rooftop and will.',
      setsFlags: ['interview_night'],
      cancelledByFlags: ['refused_the_deal'],
      requiresFlags: ['signed'],
      movesCharacters: [
        { characterId: 'ace', toLocationId: 'vantage_tower' },
        { characterId: 'mira', toLocationId: 'vantage_tower' },
      ],
    },
    {
      id: 'we_the_sign',
      atWorldMinute: 17 * 1440 + 6 * 60,
      locationId: 'ferris_street',
      publicCopy:
        'Day 18, 06:00. Overnight, somebody stole the sponsor billboard off Ferris Street and left Ace’s bronze statue holding a hand-painted sign: ASK HIM WHO HELD IT UP.',
      directorNotes:
        'Shade, obviously. It is on every morning show by eight. Ace sees it from the air at six and does not land. Mira has it taken down by nine and it is back by noon.',
      setsFlags: ['the_sign'],
      cancelledByFlags: ['the_truth_is_out', 'shade_stood_down'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_gala_week',
      atWorldMinute: 22 * 1440 + 9 * 60,
      locationId: 'vantage_tower',
      publicCopy:
        'Day 23, 09:00. Gold-edged invitations go out for the Founders’ Gala, and Mira sends Ace a speech with the words Ferris Street in it four times.',
      directorNotes:
        'One week left. The speech is very good. Ace reads it once and puts it face down. Shade’s deadline is now seven days away, and he lets the player know it.',
      setsFlags: ['gala_week'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_gala_night',
      atWorldMinute: 29 * 1440 + 19 * 60,
      locationId: 'civic_square',
      publicCopy:
        'Day 30, 19:00. The Founders’ Gala: Civic Hall in gold light, the council in the front row, the vote at ten, and every screen in the square showing the ranking.',
      directorNotes:
        'Everybody is here. Ace speaks at nine. Shade’s broadcast is at half past. Kite is on the clock tower. Dex is in the press pen. The player is seated between Ace and the chair of the council.',
      setsFlags: ['gala_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'ace', toLocationId: 'civic_square' },
        { characterId: 'mira', toLocationId: 'civic_square' },
        { characterId: 'kite', toLocationId: 'civic_square' },
        { characterId: 'dex', toLocationId: 'civic_square' },
      ],
    },
    {
      id: 'we_the_broadcast',
      atWorldMinute: 29 * 1440 + 21 * 60 + 30,
      locationId: 'civic_square',
      publicCopy:
        'Day 30, 21:30. Every screen in the city goes black, and then shows four minutes of Ferris Street that nobody has ever seen.',
      directorNotes:
        'Only if the truth is not already out and Shade has not been talked down. The square goes completely quiet. Ace does not run. What he does next depends entirely on the month the player gave him.',
      setsFlags: ['shade_broadcast'],
      cancelledByFlags: ['the_truth_is_out', 'shade_stood_down', 'left_the_map'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_still_fake',
      kind: 'FINALE',
      label: 'Whether it is still fake on day thirty',
      seedHint: 'He asks before he holds your hand, every single time, even on camera.',
      payoffHint: 'On the gala stage he asks again, and this time the cameras are not why.',
      weight: 1,
    },
    {
      id: 'p_the_roof',
      kind: 'MYSTERY',
      label: 'What he was doing on that roof at three in the morning',
      seedHint: 'Six blurry photos, an envelope he holds out, and a shadow that looks far too solid.',
      payoffHint: 'Ferris Street, and the man in the basement who held his breath for four minutes.',
      weight: 0.9,
    },
    {
      id: 'p_the_villain',
      kind: 'RIVAL',
      label: 'The villain who noticed you',
      seedHint: 'A cold black card in your bag with no writing on it.',
      payoffHint: 'Rafe Quinn, Jo’s brother, and what he will play on every screen at half past nine.',
      weight: 0.8,
    },
    {
      id: 'p_jo',
      kind: 'RELATIONSHIP',
      label: 'Jo, and the box under her bed',
      seedHint: 'A shoebox she never opens in front of you, and a phone she keeps face down on rent day.',
      payoffHint: 'Her brother has been four streets away for four years.',
      weight: 0.7,
    },
    {
      id: 'p_the_release',
      kind: 'THEME',
      label: 'The breakup press release',
      seedHint: 'Appendix C, already written, dated day thirty-one, with your name a blank.',
      payoffHint: 'Somebody sends it, tears it up, or rewrites the ending.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_words',
      name: 'You Write the Words',
      role: 'Writing and persuasion',
      summary: 'You draft the agency’s statements and captions, so you are best at talking your way through a press scrum and turning a bad headline around.',
      playstyle: ['Talks fast', 'Persuasive', 'Thinks in headlines'],
      blurb: 'Three weeks in and you have already rewritten two heroes’ apologies, and both of them sounded sorrier than the heroes were.',
      attributeBonus: { presence: 2, mind: 2 },
      skillProficiencies: { spin: 3, performance: 1, candour: 1 },
      startingItems: [{ itemId: 'lines_notebook', qty: 1 }],
      startingAbilities: ['spin_it'],
      startingReputation: [{ factionId: 'faction_vantage', amount: 5 }],
    },
    {
      id: 'arch_lens',
      name: 'You Shoot the Photos',
      role: 'Photography and social media',
      summary: 'You run the agency’s social accounts and carry a camera, so you always know where the lenses are and what a picture will say before anybody takes it.',
      playstyle: ['Observant', 'Online', 'Quick on her feet'],
      blurb: 'You have photographed a hundred rescues from behind the tape. Nobody has ever photographed you, until about four seconds ago.',
      attributeBonus: { mind: 2, agility: 2 },
      skillProficiencies: { framing: 3, attention: 2 },
      startingItems: [{ itemId: 'your_camera', qty: 1 }],
      startingAbilities: ['find_the_angle'],
      startingReputation: [{ factionId: 'faction_press', amount: 10 }],
    },
    {
      id: 'arch_law',
      name: 'You Read the Contracts',
      role: 'Law and paperwork background',
      summary: 'You studied law before the internship, so you read every clause, spot the trap in any agreement, and know exactly what the agency can and cannot make you do.',
      playstyle: ['Careful', 'Sharp-eyed', 'Hard to fool'],
      blurb: 'You read the terms and conditions. All of them. You have opinions about clause nine already and you have not even seen it yet.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { fine_print: 3, candour: 1, composure: 1 },
      startingItems: [{ itemId: 'highlighters', qty: 1 }],
      startingAbilities: ['read_the_fine_print'],
      startingReputation: [{ factionId: 'faction_vantage', amount: 10 }],
    },
    {
      id: 'arch_spark',
      name: 'You Have a Small Power',
      role: 'Hidden power and stealth',
      summary: 'You were born with a small power you never registered: for ten seconds at a time, nobody notices you. Useful, illegal, and a scandal if a camera catches it.',
      playstyle: ['Sneaky', 'Risky', 'Secret power'],
      blurb: 'Ten seconds of nobody looking at you has got you out of every awkward party since you were eighteen. Forty cameras is a lot of nobody.',
      attributeBonus: { arcana: 3, agility: 1 },
      skillProficiencies: { spark: 3, evasion: 2 },
      startingItems: [{ itemId: 'big_sunglasses', qty: 1 }],
      startingAbilities: ['ten_quiet_seconds'],
      startingReputation: [{ factionId: 'faction_narrows', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What will the papers call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Alex Moreau' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What do you do in the press office?',
      helpText:
        'Your job at the agency, which sets what you are good at when forty cameras are pointed at you. It stays the same for the whole story. It does not decide whether you play along, fall for him, or burn the whole thing down: that part is yours, every turn.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What would your best friend say about you?',
      helpText: 'One plain sentence is the right amount. Jo has known you since university, and she will not let you forget it.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. Terrible at lying, good in a crisis, and has never once been on time for anything.',
    },
    {
      id: 'what_you_thought_of_him',
      label: 'What did you think of the number one hero before today?',
      helpText: 'Where you start with him, not where you have to end up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'a_fan', label: 'Honestly? A bit of a fan.' },
        { id: 'a_skeptic', label: 'A flying billboard with very good teeth.' },
        { id: 'never_thought', label: 'I never once thought about him.' },
        { id: 'a_crush', label: 'I had his poster. I am not discussing it.' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do forty cameras see?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Office lanyard, borrowed blazer, hair I did not have time to fix.',
    },
  ],
  /**
   * Twelve, because the storyteller reads the first twelve and no more.
   *
   * Five are losses, and none is written as a punishment: the plan running
   * perfectly is one of them. Walking away is open from about a third of the
   * way in. Only "Breaking Story" needs the footage in the player's hands;
   * every other destination is reachable by a player who never wondered what
   * happened at Ferris Street, though several are better if they did.
   */
  endings: [
    {
      id: 'end_day_thirty_one',
      name: 'Day Thirty-One',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['broke_up', 'amicable'], flagsUnset: ['the_truth_is_out'] },
      condition:
        'The plan ran perfectly. The release went out on the morning of day thirty-one, the contract was renewed, and nobody learned anything, including the two of them. Write it as a clean professional success with one empty place in it, and do not let anybody say out loud what that place is.',
      epilogue:
        'The release gets four million views and a morning-show segment called "The Most Mature Breakup in the City". The player gets a glowing reference from Vantage. Ace sends one text a month later, at two in the morning, that says only "the toast is still bad", and nothing after it.',
      hint: '',
    },
    {
      id: 'end_the_lie_held',
      name: 'The Lie Held',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['the_lie_held'] },
      condition:
        'The speech went as written, the footage never played, and the council renewed the contract on a lie. The player is still his partner on paper and the agreement has quietly been extended. This is a loss that looks exactly like a win, and the prose should know the difference without announcing it.',
      epilogue:
        'Mira adds thirty more tabs to the binder. The statue on Ferris Street gets cleaned every morning. Somewhere in the Narrows a man who kept his word watches the renewal on a stolen screen and turns it off before the applause.',
      hint: 'The lie only holds if Shade stands down.',
    },
    {
      id: 'end_clear_your_desk',
      name: 'Clear Your Desk',
      rarity: 'COMMON',
      minTurn: 12,
      requires: { flagsSet: ['refused_the_deal'] },
      condition:
        'The player said no to Mira and meant it. They are fired by five o’clock, famous for about a week, and free. Write the practical end of an internship and the beginning of something else, without making refusal a punishment or a triumph.',
      epilogue:
        'The clip of the player saying "no" in the lobby gets made into a sound people use for their landlords. Dex offers a job. Jo makes the one dinner she can make. Ace sends flowers with a card that says "you were right", and no return address.',
      hint: '',
    },
    {
      id: 'end_wrong_spot',
      name: 'Wrong Spot, Wrong Time',
      rarity: 'UNCOMMON',
      minTurn: 16,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the whole thing: the agency, the cameras, the city. Do not make it a tragedy and do not redeem it. Being grabbed by a stranger in front of forty cameras is a completely reasonable thing to leave.',
      epilogue:
        'The photos stop after a fortnight. The lanyard is in a drawer in a different city. Every Monday at nine the player does not check the ranking, and every Monday at nine and a minute they do.',
      hint: '',
    },
    {
      id: 'end_the_villain_was_right',
      name: 'The Villain Was Right',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['shade_played_it'] },
      condition:
        'At half past nine every screen in the city played Ferris Street. The truth came out in the worst possible way: from a villain, in the middle of a party, with no one ready. Nobody wins this one, including Shade, and the prose should let the square be very quiet for a long time.',
      epilogue:
        'The council postpones the vote. Vantage loses three sponsors in a day. Ace stops flying for a month. Shade is arrested on the steps of Civic Hall, without a fight, and the first visitor he asks for is not his lawyer.',
      hint: '',
    },
    {
      id: 'end_for_real',
      name: 'For Real',
      rarity: 'UNCOMMON',
      minTurn: 34,
      requires: {
        flagsSet: ['together', 'the_truth_is_out'],
        minRelationship: [{ characterId: 'ace', dimension: 'affection', value: 75 }],
      },
      condition:
        'The truth is out and the two of them are together anyway, which is harder than either of those alone. Write the first public moment after the fake ended and the real thing began, and let him ask before he takes the player’s hand, the same way he always has.',
      epilogue:
        'The new photos are worse. Blurry, badly lit, both of them laughing at something off camera. The city likes them better. The breakup release stays in a drawer, and on day thirty-one of every month after that, somebody makes terrible toast on purpose.',
      hint: '',
    },
    {
      id: 'end_number_two',
      name: 'Number Two',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['ace_said_it', 'vote_called'] },
      condition:
        'Ace told the city the truth from the stage, in his own words, and lost number one for it. Write what it costs him, and what it gives back, without making him a martyr. Being number two is the first ordinary thing that has happened to him in four years.',
      epilogue:
        'The Monday ranking puts Silver Kite at number one, and she spends the week furious about it. The Guardian Contract goes to nobody. Ace still flies the Narrows every night, and the plaque on Ferris Street is replaced with one that has two names on it.',
      hint: 'He has to say it himself, and he has to trust somebody first.',
    },
    {
      id: 'end_stage_left',
      name: 'Exit, Stage Left',
      rarity: 'RARE',
      minTurn: 34,
      requires: { flagsSet: ['with_shade'] },
      condition:
        'The player chose the villain who never lied to them. Write it as a real romance with a man who is still wanted, still funny, and still returning stolen goods, and let Ace take it with more grace than anyone expects.',
      epilogue:
        'The rooftop meetings are a different kind now. The Starlight gets a working marquee, briefly, until someone reports it. Ace sends a gift for the flat: one perfectly level shelf, and a note that says "he still owes me a building".',
      hint: '',
    },
    {
      id: 'end_both_quinns',
      name: 'Both Quinns',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['quinns_reunited'],
        minFactionReputation: [{ factionId: 'faction_narrows', value: 50 }],
      },
      condition:
        'Jo got her brother back, through the front door of the flat, and the Narrows closed around both of them. This ending is about a family rather than a romance, whatever else happened with Ace, and it should be the warmest scene in the story.',
      epilogue:
        'The first dinner is loud and short and ends with Jo throwing the lighter at him and then asking for it back. He fixes the radiator. The laundromat owner pretends she does not recognise him, and the wall where somebody paints his silhouette stays painted.',
      hint: 'She has to know the truth from you first.',
    },
    {
      id: 'end_breaking_story',
      name: 'Breaking Story',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['you_played_it'] },
      condition:
        'The player played the footage themselves, at the gala, in front of everybody. They are the story now, not the girlfriend. Write the consequences honestly: Mira, the agency, Ace’s face in the front row, and the career that starts the next morning.',
      epilogue:
        'The player is fired by midnight and has four job offers by breakfast. Dex asks for a co-byline and does not get it. Ace calls at noon and says one word, "thank you", and then, after a long time, "dinner?"',
      hint: '',
    },
    {
      id: 'end_nate',
      name: 'Nate',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: {
        flagsSet: ['together', 'ace_said_it', 'knows:his_name'],
        minRelationship: [{ characterId: 'ace', dimension: 'affection', value: 82 }],
      },
      condition:
        'He told the truth himself, they are together, and the player calls him by his real name. This is the ending where the man and the poster finally separate. Keep it small: a kitchen, a burnt breakfast, a name said out loud, and his feet nowhere near the floor.',
      epilogue:
        'He keeps the hero name for work. At home nobody uses it. The flight suit hangs in a cupboard next to the grey hoodie, and the player has never once seen him wear the suit in the kitchen.',
      hint: 'Ask him what he wants to be called when the suit is off.',
    },
    {
      id: 'end_full_credit',
      name: 'Full Credit',
      rarity: 'UNIQUE',
      minTurn: 38,
      requires: { flagsSet: ['ace_said_it', 'quinns_reunited', 'shade_stood_down'] },
      condition:
        'Ace said it, Shade stood down to let him, and Jo has her brother back. The whole broken thing from four years ago has been mended by the people who broke it. Write Rafe Quinn standing at the back of Civic Hall with his mask in his pocket while the city hears his name.',
      epilogue:
        'The licence review takes six weeks. The plaque on Ferris Street is replaced with two names, and Rafe insists his goes second. The Monday ranking has a new entry at number forty-one, under a hero name nobody has heard before, and the comments are mostly confused.',
      hint: '',
    },
  ],
  opening:
    'Forty cameras flash at once.\n\n' +
    'You were only supposed to hold his water.\n\n' +
    'A reporter yells, "Ace! Are you seeing a villain?" and the hand of Ace Valor, the number one hero in the city, closes around yours.\n\n' +
    'He pulls you into the light.\n\n' +
    '"Smile," he says through his teeth. "You’re my girlfriend for thirty days."\n\n' +
    'Then, lower, only for you: "Please."\n\n' +
    'His boots have drifted an inch off the stage. Behind the curtain, his manager drops her phone.\n\n' +
    'Every lens swings to you.\n\n' +
    '"So," the reporter shouts, "how long have you two been together?"',
  openingPanel: {
    assetKey: 'story_thirty_days_with_the_number_one_hero/opening',
    alt: 'Ace Valor in a white-and-gold flight suit on a press stage, holding your hand up into a storm of camera flashes, smiling for the crowd while his boots float an inch above the floor.',
  },
  openingSuggestions: [
    '"Long enough to know he cries at dog adoption videos."',
    'I squeeze his hand back, smile for every camera, and walk him off the stage before anyone asks a second question.',
    'I let go of his hand and lean into the nearest microphone.',
  ],
  coverDirection: [
    'SUBJECT: Ace Valor, the number one superhero of a glittering city, large in the foreground of a key visual for a superhero romantic comedy anime.',
    'An adult man, tall and broad-shouldered, with sun-gold hair and warm brown eyes, in a white-and-gold flight suit with a high collar and a short navy cape, waist up and close to the viewer.',
    'He holds the viewer’s hand up into a storm of camera flashes, smiling a perfect billboard smile, but his eyes slide sideways, nervous, with a faint blush across his cheeks.',
    'BEHIND HIM, smaller and in shadow on a rooftop ledge above the press crowd: Shade, an adult man in a long black coat and a matte black half-mask, sitting with one knee up and watching with a lopsided smile; the shadows around him look solid, like black glass.',
    'SETTING: a glass plaza press stage at golden hour, a crowd of photographers with flashes going off, a skyline of glass towers behind.',
    'LIGHT: white camera flashes and warm gold sunset on the hero, cool blue dusk around the villain.',
    'TITLE: the words THIRTY DAYS WITH THE NUMBER ONE HERO painted into the art in the upper third as a bold comic-book logo, gold with a navy outline,',
    'spelled exactly THIRTY DAYS WITH THE NUMBER ONE HERO, large and legible at thumbnail size. No other text anywhere: no signs, no letters on the backdrop, no numbers.',
  ].join(' '),
  publishedAt: null,
};

export const THIRTY_DAYS_WITH_THE_NUMBER_ONE_HERO = StoryVersion.parse(raw);

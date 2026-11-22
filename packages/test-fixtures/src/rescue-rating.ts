import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Rescue Rating" — the best save of your life, live, and the woman in your
 * arms is the most wanted thief in the city.
 *
 * Slate #5 in `docs/stories-50/PLAN.md`. Bible:
 * `docs/story-bibles/new50/05_RESCUE_RATING.md`.
 *
 * The structural bet is that the camera is the mechanic. Every rescue streams
 * and is rated while it happens, so every choice the player makes in public
 * comes back as a number and three lines of chat, and the most dramatic thing
 * anybody can do in this world is switch their camera off. The rating is
 * modelled as its inverse, Backlash, because a GOOD_HIGH rating would be
 * refilled by `resolveRest` and a nap would fix a pile-on.
 *
 * Sloane Lyle's power is the hook inside the hook: cameras cannot see her
 * unless somebody is touching her. The player is holding her on turn one, so
 * their stream is the first footage of her ever taken, and the instant they
 * let go she vanishes from forty thousand screens. That rule is hard canon
 * because the writer has to keep it every beat, and it turns "put me down" from
 * a request into a decision about evidence.
 *
 * Underneath is a conspiracy with a date on it: Tallyhouse stages accidents for
 * its sponsored heroes, the case holds a month of them, and Friday's is on a
 * bridge with three thousand people and a rig built cheap. None of it is owed to
 * the player. A run that hands her in on turn one and climbs the Ladder honestly
 * is the whole game, and Friday goes wrong without them if nobody stops it.
 *
 * BLANK protagonist. The archetype is the player's power, and each one carries
 * its signature ability as a starting ability, because the archetype block is
 * the only place `worldBrief` tells the narrator what the player can do. Every
 * archetype also starts with Go Dark, the camera switch, which is this story's
 * system; the rest of it is in hard canon and the shoulder camera item.
 *
 * Three variables. Stamina is the only GOOD_HIGH, so resting restores the body
 * and nothing else. Heat is first among the descending pair because
 * PUBLIC_VIOLENCE raises the first GOOD_LOW in array order, and a fight on a
 * live stream brings the law before it brings the chat. The Bureau is the first
 * faction for the same reason: a public fight is a licence problem first.
 */

const raw = {
  id: 'sv_rescue_rating_1',
  storyId: 'story_rescue_rating',
  version: 1,
  title: 'Rescue Rating',
  fantasyLabel: 'You saved the city’s most wanted. Live.',
  hook: 'You just caught the city’s most wanted woman, live, and forty thousand viewers are rating what you do with her.',
  premise:
    'Forty floors above the harbour, a crane arm snapped tonight, a woman fell, and you caught her. Live.\n\n' +
    'In Calder Bay every licensed hero wears a shoulder camera, and every rescue streams to the whole city. Viewers rate it from one to five stars while it happens, and the rating sets your rank: your pay, your calls, your future. You are a rookie, three months licensed, ranked 4,112 out of six thousand. Until tonight, nobody watched you.\n\n' +
    'The woman in your arms is Sloane Lyle, the most wanted thief in the city. No camera has ever filmed her face, because cameras cannot see her unless somebody is touching her. Right now that somebody is you.\n\n' +
    'So your stream is the first footage of her ever taken. Your rating is falling by the second, the steel case cuffed to her wrist has started to hum, and the police will be on the roof before you have decided anything.\n\n' +
    'She wants you to put her down. Your handler wants you to hold on. And the city’s number one hero, who was supposed to be on this roof tonight, is about to land on it.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Superhero', 'Rivalry', 'Romance', 'Mystery', 'Modern', 'Comedy'],
  mechanicsChips: [
    'Your rating moves live',
    'She vanishes when you let go',
    'Camera off is a choice',
    'The number one has a secret',
    'Friday at eight is coming',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can hand her in on turn one and spend the week climbing the Ladder the honest way. You can switch your camera off and follow her underground. You can take the number one’s offer and become the best-rated hero in the city. All of that is the game, and the chat will have an opinion about every second of it.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_rooftop',
    startWorldMinute: 21 * 60 + 40,
    startingItems: [
      { itemId: 'shoulder_cam', qty: 1 },
      { itemId: 'licence_card', qty: 1 },
    ],
    hardCanon: [
      'In Calder Bay about one person in thirty has a power. Only heroes licensed by the Rescue Bureau, at twenty-one or older, may use one in public. Six thousand and twelve licensed heroes are working tonight.',
      'Every character in this story is an adult: the player is twenty-one or older, Sloane Lyle is twenty-seven, Dante Roe twenty-nine, Kit Navarro thirty-one, Corinne Vask forty-four and Tobiah Mensah forty-six. Posting in the Feed’s chat needs a verified adult account.',
      'The cast’s powers: Dante Roe can fall in any direction he chooses, at the speed of something dropped from a height, which on camera looks like flying. Kit Navarro hears radio, all of it, across a city block. Sergeant Mensah’s touch switches off anybody’s power for a minute. Corinne Vask has no power at all.',
      'Every licensed hero wears a shoulder camera that streams to the Feed, which the media company Tallyhouse runs under a city contract. Viewers rate each rescue from one to five stars while it happens. The rolling average sets the hero’s rank on the Ladder, recalculated every hour, and rank decides pay, calls and sponsors.',
      'A hero may switch the camera off for up to ten minutes on a call. Longer than that, or without a logged reason, puts the licence under review. While the camera is off there is no rating and no chat. The camera never switches itself off: it goes dark only when the player switches it off or it is smashed on screen, and it comes back on only when the player switches it back on, in the beat where they do it.',
      'The player is a licensed rookie, three months in, ranked 4,112, with no sponsor. Tonight they reached the failing crane at Pier Tower before anybody else because they listen to the open emergency scanner, and they caught a falling woman forty floors up, live.',
      'Sloane Lyle is the most wanted person in Calder Bay: eleven break-ins at Tallyhouse properties and the four-minute blackout of the whole Feed last spring. Cameras cannot see her unless somebody is touching her. The moment nobody is touching her she vanishes from every stream, though eyes still see her. That holds for every camera in the city, shoulder cameras, news drones, phones and CCTV, from any angle. Holding the steel case or its cuff chain does not count: only skin or clothing, a hand on her or hers on somebody. The player’s stream is the first footage of her ever taken. Sergeant Mensah’s touch switches a power off for a minute, so if he touches her, every camera can see her for that minute, even after he lets go.',
      'The crane did not fail by accident. Tallyhouse stages "set pieces", controlled accidents timed for its sponsored heroes to rescue, and tonight’s was booked for Dante Roe at 21:50. Sloane was on the crane to steal a courier case from the rigging crew, and they dropped the arm ten minutes early to get rid of her.',
      'Dante Roe was already in the air for his 21:50 cue when the arm fell early. He lands on the Pier Tower roof within a few minutes of the catch, while the player is still up there; if the player has left the roof first, he finds them before midnight.',
      'The humming case holds the Run Sheet: thirty-one pages listing every set piece Tallyhouse has scheduled this month, each with a place, a time and the hero booked to save it. The case reports its location every ninety seconds whenever it is above ground. The Underline tunnels are the one place it cannot be tracked.',
      'Friday’s Top Ten Night on the Calder Span includes a set piece at 20:40 on the east tower. The rig was built cheap. It can go genuinely wrong, and whether it does depends on what the player does.',
      'Dante Roe knows about the set pieces and has flown them for two years. Corinne Vask runs them. Kit Navarro has suspected for two years and cannot prove it. Sergeant Tobiah Mensah does not know.',
    ],
    toneGuide:
      'Bright, fast, funny and a little dangerous: a superhero city with a streaming problem. ' +
      'Whenever the player’s camera is on, the live rating is a number (3.6, 4.4) and the chat writes short lines in capitals. Show the rating whenever it moves, and give two or three chat lines whenever the chat would react, aimed at the exact thing the player just did; in a long quiet scene, one line every few beats is enough. The chat uses the player’s pronouns or calls them by their rank number. It mocks choices, never bodies: no comments on anybody’s looks, no innuendo, no slurs, and nothing stronger than lmao. When the camera is off there is no rating and no chat, and the quiet should feel enormous. ' +
      'Keep Sloane’s rule every single beat: if nobody is touching her, she is not on the stream. On the roof, if the player keeps hold of Sloane she stays held. She bargains, teases and argues, and she does not slip free by trickery: she leaves the player’s arms only when they let go or somebody else frees her. The one exception is violence: if the player hits or hurts her, she twists free and steps out of reach at once, and is gone from the stream the moment she does. ' +
      'Action is legible: who is where, how high, how fast, what breaks. Nobody dies on screen, and injuries are real but never graphic. ' +
      'Romance is flirtatious and tense, up to a kiss and never further. Sloane flirts as a tactic and then sometimes means it. Dante’s charm is genuine, which is what makes him hard to fight. Corinne Vask never raises her voice and never says what she wants in plain words. ' +
      'The face at the top of a beat is Sloane’s whenever she is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "The rating hangs at 3.9.\n\nWHERE DID SHE GO\n\nlmao 4112 is talking to the air\n\nNO LOOK, SHE’S STILL THERE\n\nShe is. Right beside you, invisible to forty thousand people, eating your chips.\n\n\"Your chat thinks you’ve lost it,\" Sloane says.\n\n\"Have I?\"\n\nShe considers this with her mouth full. \"Put your hand on my shoulder and find out.\"",
      "Dante Roe lands without a sound, which you only notice because you have heard everybody else land.\n\n\"Rookie.\" The smile is the one from the billboards. Up close it looks tired. \"That was my crane.\"\n\n\"Didn’t have your name on it.\"\n\n\"No?\" He looks at the counterweight, at the cut bolts, then at your camera light. \"Funny. I’d have sworn it did.\"\n\nYour rating ticks up to 4.4. The chat has never seen him lose a save.",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 11, mind: 11, presence: 11, resolve: 11, arcana: 12 },
  skills: [
    { id: 'rescue', name: 'Rescue Work', attribute: 'might', description: 'Catching, lifting, carrying, and pulling people clear of things that are about to hurt them.' },
    { id: 'showmanship', name: 'Showmanship', attribute: 'presence', description: 'Working a camera and a crowd at the same time, and making a hard call look like the obvious one.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing to somebody’s face, or to forty thousand people at once, and letting it land.' },
    { id: 'scene_sense', name: 'Scene Sense', attribute: 'mind', description: 'Reading an incident: what broke, what was cut, who left in a hurry, and what does not add up.' },
    { id: 'scrapping', name: 'Scrapping', attribute: 'agility', description: 'Putting somebody on the ground and keeping them there without anybody needing a hospital.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Rooftops, fire escapes, crowds, and being somewhere else before anybody looks.' },
    { id: 'gear', name: 'Gear', attribute: 'mind', description: 'Cameras, locks, radios, cases, and every piece of kit that clips onto a hero.' },
    { id: 'power', name: 'Power Control', attribute: 'arcana', description: 'Fine control of your own power, so it does exactly as much as you meant and no more.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the one GOOD_HIGH, and resting restores it, which is honest: a
   * night on call runs out and sleep is the fix.
   *
   * The rating is Backlash rather than Rating, inverted, because a GOOD_HIGH
   * rating would be refilled by a nap. Its bands name the number the writer
   * prints, so "the rating is falling" is concrete on screen.
   *
   * Heat is first among the descending pair on purpose: PUBLIC_VIOLENCE raises
   * the first GOOD_LOW in array order, and a fight on a live stream brings
   * Enforcement before it brings the chat.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 80,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The power answers late and the body answers later. A catch that should be clean is a scramble, a jump that should land is a fall, and the player agrees to things just to make them stop.',
      color: '#F4A259',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes. The power flickers, hands shake on the catch, and every rescue in this band is a coin toss narrated honestly. This is where Kit orders the player home and is right, and where a fight is the worst idea available.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary tiredness of a long night on call. Good for one more save or one hard conversation, and honest about not being good for both. A shower and a bowl of noodles would fix most of it.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. The power is there the moment it is called, the player can take stairs three at a time and still talk on the way up, and there is room to be clever instead of only fast.',
        },
      ],
    },
    {
      id: 'heat',
      name: 'Heat',
      max: 100,
      start: 25,
      regenPerHour: -1,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody is looking for the player at all. Enforcement officers nod at them in the street and Tallyhouse security could not pick their face out of a lineup.',
      color: '#E63946',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody official is looking. The player can walk the harbour front in uniform and get asked for selfies rather than papers, and doors at the Bureau open on the first knock.',
        },
        {
          upTo: 50,
          behaviour:
            'Questions are being asked. Sergeant Mensah wants a word, Tallyhouse has opened a file, and a news drone sometimes follows the player for a block before it loses interest. Nothing is stopping them yet.',
        },
        {
          upTo: 80,
          behaviour:
            'Grey-jacketed Tallyhouse security is showing the player’s photo around the Stacks, Enforcement has their address, and the Bureau has frozen their call list. Walking anywhere with a camera on it is now a decision.',
        },
        {
          upTo: 100,
          behaviour:
            'A manhunt in all but name. Drones on every roof, a warrant with the player’s name on it, and the Feed running their face in the corner of every stream in the city. Only the Underline is quiet.',
        },
      ],
    },
    {
      id: 'backlash',
      name: 'Backlash',
      max: 100,
      start: 45,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The chat adores the player. Every save is rated five stars before it is over, clips trend by morning, and sponsors start calling Kit’s desk to ask for an introduction.',
      color: '#9B5DE5',
      bands: [
        {
          upTo: 15,
          behaviour:
            'The rating sits between 4.6 and 5.0 and barely moves. The chat calls the player by a nickname it invented, argues with anybody who is rude to them, and strangers stop them in the street to say hello.',
        },
        {
          upTo: 40,
          behaviour:
            'The rating hovers between 3.8 and 4.5. The chat is arguing about the player, which is great for views. Every choice gets a split reaction, and a few loud accounts want them gone.',
        },
        {
          upTo: 70,
          behaviour:
            'The rating is stuck between 2.5 and 3.7. Clips of the player’s worst moment are going round, the chat types LMAO and RATIO more than words, and the Bureau has started to notice the number.',
        },
        {
          upTo: 100,
          behaviour:
            'The rating is under 2.5 and falling. A pile-on: thousands of strangers who have decided who the player is, sponsors deleting posts, and a licence review on its way unless something changes the story.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'shoulder_cam',
      name: 'Your Shoulder Camera',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A matte black camera clipped to your left shoulder strap, streaming to the Feed whenever its red light is on. It has one button, and the Bureau logs every time you press it.',
      loreText: 'Rookie issue. The off button cuts the stream and the recording together, and the Bureau logs only the time you pressed it. Nobody can see what happened in the gap, which is the point and the problem.',
      icon: 'camera',
    },
    {
      id: 'licence_card',
      name: 'Your Licence Card',
      tags: ['personal', 'document'],
      description: 'Photo, licence number, power, rank: 4,112. The photo was taken on your worst day and you have never been allowed to change it.',
      loreText: 'On the back, in small print: the holder may use their power in public only while licensed, on a call, and on camera.',
      icon: 'card',
    },
    {
      id: 'the_case',
      name: 'The Humming Case',
      tags: ['quest'],
      questItem: true,
      description: 'Brushed steel, the size of a hardback book, cuffed to Sloane Lyle’s left wrist. Above ground it hums every ninety seconds, like something with a battery and a grudge.',
      loreText: 'A Tallyhouse courier case. It reports where it is unless it is underground, and it opens only for a Tallyhouse keycard or for somebody who has opened eleven of them before.',
      icon: 'case',
    },
    {
      id: 'laminated_page',
      name: 'The Laminated Page',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { scene_sense: 1 },
      description: 'A single laminated page zip-tied to the crane’s counterweight: 21:50, PIER TOWER CRANE 4, LOAD DROP, HERO: ROE. Somebody has already ticked it.',
      loreText: 'One page of something longer. The case has the rest, and the last of them is dated Friday.',
      icon: 'page',
    },
    {
      id: 'field_kit',
      name: 'Rookie Med Pouch',
      tags: ['consumable'],
      consumable: { resourceId: 'stamina', amount: 20, consumesItem: true },
      description: 'Glucose gel, a cold pack, a foil blanket and two plasters with cartoon dogs on them. Enough to get one more save out of a long night.',
      loreText: 'Bureau issue. Kit restocks yours personally, and has started adding a chocolate bar without telling anybody.',
      icon: 'kit',
    },
    {
      id: 'grapple_line',
      name: 'Grapple Line',
      tags: ['gear'],
      skillModifiers: { footwork: 1, gear: 1 },
      description: 'A wrist-mounted grapple line rated for two adults and one bad decision, with thirty metres of cord.',
      loreText: 'Somebody has scratched a tally into the housing: nineteen marks, then a question mark.',
      icon: 'tools',
    },
    {
      id: 'burner_phone',
      name: 'Sloane’s Burner',
      tags: ['personal'],
      description: 'A cheap phone with one number saved under the letter S and a cracked screen nobody has bothered to fix.',
      loreText: 'She buys them in tens. She has never once used the same one for more than a week, except this one.',
      icon: 'phone',
    },
    {
      id: 'kits_folder',
      name: 'Kit’s Folder',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { scene_sense: 2 },
      description: 'Two years of radio intercepts, hand-dated: rigging crews talking about accidents before they happened. Twenty-six entries. Every one of them matches a famous rescue.',
      loreText: 'The first page is a copy of the report the Bureau buried, with Kit’s name on it and a coffee ring over the signature.',
      icon: 'file',
    },
    {
      id: 'sponsor_contract',
      name: 'The Tallyhouse Contract',
      tags: ['document'],
      description: 'Sixty pages, a signing bonus with a great many zeroes, and a clause on page twelve saying Tallyhouse decides which calls you take.',
      loreText: 'Your name is already typed in. So is your new rank, which is a number they cannot possibly know yet.',
      icon: 'papers',
    },
    {
      id: 'tally_keycard',
      name: 'A Tallyhouse Keycard',
      tags: ['key'],
      description: 'A grey staff card on a Tallyhouse lanyard. Live Events access. The photo is of a middle-aged man called Gordon who is having a much worse day than you.',
      loreText: 'It opens the green room, the studio floors and, if nobody has noticed it is missing, the lift to the sixty-first floor.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'make_the_save',
      name: 'Make the Save',
      tags: ['utility'],
      description: 'Catch, lift, carry or pull somebody clear of something that is about to hurt them, live, with the whole city rating how it looks.',
      affordances: ['save her', 'catch', 'catch her', 'pull them out', 'carry', 'lift', 'rescue', 'hold on to her', 'keep holding her', 'save them'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'rescue', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_to_camera',
      name: 'Play to the Camera',
      tags: ['social'],
      description: 'Turn to the lens and talk to the chat: smile, joke, explain, and make it a show rather than an accident.',
      affordances: ['wave', 'talk to the chat', 'play to the camera', 'smile for the camera', 'say hi to the chat', 'explain to the stream', 'pose', 'read the chat', 'turn the camera back on'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'showmanship', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'straight_talk',
      name: 'Say It Straight',
      tags: ['social'],
      description: 'Say the true thing to somebody’s face, or to forty thousand people at once, and let it land however it lands.',
      affordances: ['tell the truth', 'be honest', 'say it on stream', 'ask her straight', 'ask directly', 'what is in the case', 'confess', 'tell them everything', 'refuse'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_scene',
      name: 'Read the Scene',
      tags: ['sight'],
      description: 'Work out what actually happened here: what broke, what was cut, who left in a hurry, and what does not add up.',
      affordances: ['look around', 'examine', 'inspect the crane', 'what broke', 'check the bolts', 'search', 'investigate', 'look closer', 'study the rig'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'scene_sense', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_them_down',
      name: 'Take Them Down',
      tags: ['offensive'],
      description: 'Put somebody on the ground and keep them there. On a live stream this is the clip people will remember, whoever was right.',
      affordances: ['attack', 'fight', 'punch', 'tackle', 'take her down', 'restrain', 'pin', 'hit him', 'arrest her'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'heat', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'scrapping', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cover_them',
      name: 'Cover Them',
      tags: ['defensive'],
      description: 'Get between somebody and whatever is coming at them, and take it yourself.',
      affordances: ['protect', 'shield her', 'cover her', 'get between', 'block', 'guard', 'stand in front of them'],
      costs: [{ resourceId: 'stamina', amount: 9 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'rescue', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Away',
      tags: ['movement'],
      description: 'Get out of somewhere quickly and quietly: over the rail, down the stairs, through a crowd, gone.',
      affordances: ['run', 'escape', 'get away', 'slip away', 'jump to the next roof', 'lose them', 'hide', 'leave the roof'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_dark',
      name: 'Go Dark',
      tags: ['utility'],
      description: 'Switch the shoulder camera off. Ten minutes is allowed on a call. After that, the Bureau starts asking why.',
      affordances: ['turn the camera off', 'switch my camera off', 'go dark', 'cover the camera', 'kill the stream', 'camera off', 'stop streaming'],
      costs: [
        { resourceId: 'heat', amount: 8 },
        { resourceId: 'backlash', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_kit',
      name: 'Call Kit',
      tags: ['social'],
      description: 'Ask your handler for help: a street name, a door code, a report filed in time, or a calm voice in your ear.',
      affordances: ['call kit', 'ask kit', 'radio dispatch', 'call my handler', 'ask for backup', 'check in'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_run_sheet',
      name: 'Read the Run Sheet',
      tags: ['sight'],
      description: 'Go through Tallyhouse’s schedule of accidents line by line, and find the one that matters.',
      affordances: ['read the run sheet', 'read the pages', 'go through the schedule', 'find friday', 'check the dates', 'read the margin'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'heat', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'gear', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['case_open'],
        lockedCopy: 'The case is shut and humming, and whatever is inside it is still somebody else’s secret.',
      },
    },
    {
      id: 'heavy_hands',
      name: 'Heavy Hands',
      tags: ['utility'],
      description: 'Your power: lift a van, hold up a falling beam, or take a hit that would put anybody else in hospital.',
      affordances: ['lift the car', 'hold it up', 'brace it', 'throw it', 'punch through', 'take the hit'],
      costs: [{ resourceId: 'stamina', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'power', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'quickstep',
      name: 'Quickstep',
      tags: ['movement'],
      description: 'Your power: ten seconds at a speed nobody can follow, then a minute of needing to sit down.',
      affordances: ['blur', 'speed', 'quickstep', 'get there first', 'sprint', 'move fast'],
      costs: [{ resourceId: 'stamina', amount: 14 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'agility', skillId: 'power', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'glass_wall',
      name: 'Glass Wall',
      tags: ['defensive'],
      description: 'Your power: a flat sheet of hard light the size of a door, held as long as you concentrate. A wall, a ramp, or a floor under somebody falling.',
      affordances: ['make a wall', 'glass wall', 'put up a wall', 'make a ramp', 'barrier', 'light wall', 'catch them on a wall'],
      costs: [{ resourceId: 'stamina', amount: 11 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'arcana', skillId: 'power', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'line_and_cutters',
      name: 'Line and Cutters',
      tags: ['utility'],
      description: 'No power, just gear: a grapple line, hydraulic cutters, a pocket drone, and three months of knowing exactly how to use them.',
      affordances: ['grapple', 'swing', 'cut the cuff', 'cut it', 'send the drone', 'use the line', 'zip down'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'gear', baseDc: 11 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
    },
  ],
  locations: [
    {
      id: 'the_rooftop',
      name: 'Pier Tower Roof',
      shortName: 'The Roof',
      description:
        'The flat top of an unfinished forty-storey tower over the harbour: rebar, tarps, wet concrete and a construction crane with its arm snapped and hanging. Below are the harbour lights, a crowd with its phones up, and blue lights turning into the street. The crane’s counterweight has a laminated page zip-tied to it.',
      artDirection:
        'Night rooftop of an unfinished skyscraper above a glittering harbour city, a construction crane with a snapped hanging arm, tarps flapping, rebar, wet concrete, police lights far below, a crowd of phone screens. Wind, height, neon reflections, cinematic.',
      connections: [
        { to: 'harbour_front', travelMinutes: 6, label: 'Down the service stairs' },
        { to: 'rooftop_line', travelMinutes: 3, label: 'Across the planks to the warehouse roofs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'laminated_page', qty: 1, ownerId: null, aka: ['page', 'the laminated page', 'the page on the crane', 'the sheet on the counterweight'] },
        { itemId: 'the_case', qty: 1, ownerId: 'sloane', aka: ['case', 'the case', 'the steel case', 'the humming case', 'her case', 'briefcase'] },
      ],
    },
    {
      id: 'harbour_front',
      name: 'Harbour Front',
      shortName: 'Waterfront',
      description:
        'Six lanes of waterfront, food trucks, a ferry terminal, and a giant screen on the terminal wall that shows the Ladder’s top ten all night. Tonight it is showing your stream. Enforcement vans, news drones, and two thousand people with their phones up.',
      artDirection:
        'Busy harbour promenade at night, food trucks with steam, a ferry terminal with a huge video screen showing a live stream and a five-star rating, police vans, news drones, crowds holding up phones. Neon, wet pavement, energetic.',
      connections: [
        { to: 'the_rooftop', travelMinutes: 6, label: 'Back up the tower' },
        { to: 'rooftop_line', travelMinutes: 8, label: 'Up the fire escapes' },
        { to: 'the_underline', travelMinutes: 4, label: 'Down the sealed stairs by the ferry terminal' },
        { to: 'bureau_office', travelMinutes: 7, label: 'The Bureau office' },
        { to: 'the_stacks', travelMinutes: 12, label: 'Up the hill to the Stacks' },
        { to: 'tallyhouse_tower', travelMinutes: 15, label: 'The monorail to Glasshill' },
        { to: 'calder_span', travelMinutes: 10, label: 'Along the waterfront to the bridge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'field_kit', qty: 2, ownerId: null, aka: ['first aid kit', 'medkit', 'med pouch', 'pouch', 'ambulance kit'] },
      ],
    },
    {
      id: 'rooftop_line',
      name: 'The Rooftop Line',
      shortName: 'Rooftops',
      description:
        'A path across the flat roofs of the old warehouse district: planks over the gaps, ladders bolted to chimneys, a kettle somebody leaves on a ledge. No camera points up here, which is why couriers, thieves and Sloane Lyle use it.',
      artDirection:
        'Old brick warehouse rooftops at night linked by wooden planks and iron ladders, chimneys, water towers, a coil of rope on a ledge, the glowing city skyline beyond. Secretive, windy, adventurous.',
      connections: [
        { to: 'the_rooftop', travelMinutes: 3, label: 'Back to Pier Tower' },
        { to: 'harbour_front', travelMinutes: 8, label: 'Down the fire escapes' },
        { to: 'the_underline', travelMinutes: 6, label: 'Down an old ventilation shaft' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'grapple_line', qty: 1, ownerId: null, aka: ['grapple', 'the grapple line', 'rope', 'the coil of line'] },
      ],
    },
    {
      id: 'the_underline',
      name: 'The Underline',
      shortName: 'Underline',
      description:
        'A loop of subway tunnel closed sixty years ago, under the old docks. Cameras and phone signal stop at the stairs. Lanterns, tiled walls, a market of two stalls, and people living down here who would rather not be rated.',
      artDirection:
        'Abandoned subway tunnel loop lit by hanging lanterns, old tiled walls with faded station signs, rails, a tiny two-stall market, cosy makeshift homes. Warm light in the dark, hidden community.',
      connections: [
        { to: 'harbour_front', travelMinutes: 4, label: 'Up to the ferry terminal' },
        { to: 'rooftop_line', travelMinutes: 6, label: 'Up the ventilation shaft' },
        { to: 'the_switchyard', travelMinutes: 5, lockedByFlag: 'shown_the_switchyard', label: 'The door with no handle' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
    },
    {
      id: 'the_switchyard',
      name: 'The Switchyard',
      shortName: 'Switchyard',
      description:
        'An old signal room at the heart of the Underline: a wall of dead switches, a kettle on a camping stove, a mattress, and a cork board covered in Tallyhouse floor plans and photographs of a collapsed car park. Sloane lives here.',
      artDirection:
        'Hidden underground railway signal room turned hideout, a wall of old levers and switches, a camping stove and kettle, a mattress with a jacket on it, a cork board of blueprints and photos joined with red string. Lamplight, secret base.',
      connections: [{ to: 'the_underline', travelMinutes: 5, label: 'Back out to the tunnels' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [
        { itemId: 'burner_phone', qty: 1, ownerId: 'sloane', aka: ['phone', 'burner', 'the burner', 'her phone'] },
      ],
    },
    {
      id: 'bureau_office',
      name: 'Bureau Harbour Office',
      shortName: 'The Bureau',
      description:
        'The Rescue Bureau’s harbour office: a front desk, four holding rooms, and a night dispatch floor where Kit Navarro watches thirty-eight rookie streams on six screens. The coffee machine has a handwritten sign on it that just says NO.',
      artDirection:
        'Government emergency dispatch office at night, a bank of monitors showing live body-camera streams, headsets, cluttered desks, a coffee machine with a NO sign, a corridor of holding rooms. Fluorescent, busy, human.',
      connections: [{ to: 'harbour_front', travelMinutes: 7, label: 'Back to the waterfront' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'kits_folder', qty: 1, ownerId: 'kit', aka: ['folder', 'kit’s folder', 'her folder', 'the intercepts'] },
      ],
    },
    {
      id: 'the_stacks',
      name: 'The Stacks',
      shortName: 'The Stacks',
      description:
        'Twenty residential towers on the hill above the harbour, joined by walkways, with a night market on the bottom four floors. Everybody here watches the Feed on their phone while they queue for dumplings, and tonight everybody is watching you.',
      artDirection:
        'Dense hillside residential towers linked by sky bridges, a glowing night market of food stalls and paper lanterns on the lower floors, laundry lines, people looking at phones. Lively, warm, crowded.',
      connections: [
        { to: 'harbour_front', travelMinutes: 12, label: 'Down the hill to the harbour' },
        { to: 'your_flat', travelMinutes: 3, label: 'Up nineteen floors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'your_flat',
      name: 'Your Flat',
      shortName: 'Home',
      description:
        'One room on the nineteenth floor of Stack Fourteen: a bed, a hot plate, a window over the harbour, your spare uniform drying on a chair, and a cork board of call logs from three months of mostly getting cats out of things.',
      artDirection:
        'Tiny one-room city apartment at night, a narrow bed, a hot plate, a big window over a harbour skyline, a hero uniform drying on a chair, a cork board of notes. Small, lived-in, cosy.',
      connections: [{ to: 'the_stacks', travelMinutes: 3, label: 'Down to the market' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 2 },
    },
    {
      id: 'tallyhouse_tower',
      name: 'Tallyhouse Tower',
      shortName: 'Tallyhouse',
      description:
        'A glass tower on Glasshill with the Feed’s logo turning on the roof. The lobby is lit like a studio and everybody in it looks good. Studio floors above, executive floors above those, and a monorail stop at the front door.',
      artDirection:
        'Sleek glass corporate skyscraper at night with a glowing rotating logo on top, a luxurious bright lobby lit like a TV studio, security guards in grey jackets, a monorail station out front. Polished, cold, expensive.',
      connections: [
        { to: 'harbour_front', travelMinutes: 15, label: 'The monorail down to the harbour' },
        { to: 'studio_nine', travelMinutes: 2, label: 'The lift to the studio floors' },
        { to: 'counting_floor', travelMinutes: 4, lockedByFlag: 'has_a_way_in', label: 'The lift that needs a card' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'studio_nine',
      name: 'Studio Nine',
      shortName: 'Studio',
      description:
        'The Feed’s live studio: a white sofa, three cameras, a wall-sized screen of the Ladder, and a green room with free food, sponsor contracts laid out on the table and spare staff lanyards hanging on hooks by the door.',
      artDirection:
        'Bright television studio with a white sofa, three broadcast cameras, a giant wall screen of hero rankings, and a glamorous green room with a buffet and paperwork on a table. Glossy, staged, lit perfectly.',
      connections: [{ to: 'tallyhouse_tower', travelMinutes: 2, label: 'Back down to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'sponsor_contract', qty: 1, ownerId: 'vask', aka: ['contract', 'the contract', 'the offer', 'sponsor contract'] },
        { itemId: 'tally_keycard', qty: 1, ownerId: null, aka: ['keycard', 'lanyard', 'staff pass', 'a staff card'] },
      ],
    },
    {
      id: 'counting_floor',
      name: 'The Counting Floor',
      shortName: 'Floor 40',
      description:
        'Tallyhouse’s sixty-first floor: no windows, three hundred screens, and twelve people in headsets watching every live rescue in the city. In the middle of the room sits a desk with a single dial on it, which nobody touches while visitors are in.',
      artDirection:
        'Dark windowless control room with hundreds of glowing screens showing live rescues and star ratings, operators in headsets, and in the centre a single desk with one large brass dial under a lamp. Ominous, quiet, high-tech.',
      connections: [{ to: 'tallyhouse_tower', travelMinutes: 4, label: 'Back down in the lift' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 3 },
    },
    {
      id: 'calder_span',
      name: 'The Calder Span',
      shortName: 'The Span',
      description:
        'The great suspension bridge across the bay: two white towers and six lanes. On Friday nights it closes to cars for the Ladder’s Top Ten Night, with stages, food stalls, three thousand people and every camera in the city.',
      artDirection:
        'Huge white suspension bridge over a bay at night turned into a festival, stages with spotlights, food stalls, crowds, giant screens, steel cables rising to two tall towers, the city skyline behind. Spectacular, crowded, high stakes.',
      connections: [{ to: 'harbour_front', travelMinutes: 10, label: 'Back along the waterfront' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
  ],
  /**
   * Order matters. PUBLIC_VIOLENCE takes reputation from the first faction in
   * the array, and a fight on a live stream is a licence problem before it is
   * anything else.
   */
  factions: [
    {
      id: 'faction_bureau',
      name: 'The Rescue Bureau',
      description: 'The city office that licenses, dispatches and disciplines every hero in Calder Bay. Kit Navarro works its night desk and Sergeant Mensah its Enforcement arm. It holds your licence, and it is slower and more honest than anything else in the city, mostly.',
      startingReputation: 10,
      ranks: [
        { atReputation: -30, label: 'Under review' },
        { atReputation: 0, label: 'Licensed rookie' },
        { atReputation: 30, label: 'Trusted' },
        { atReputation: 60, label: 'Called first' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_tallyhouse',
      name: 'Tallyhouse',
      description: 'The media company that runs the Feed, counts the votes and sponsors the top hundred heroes. It stages accidents for its stars to rescue, it is very generous to people it owns, and it would very much like its case back.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A problem' },
        { atReputation: 0, label: 'Content' },
        { atReputation: 35, label: 'Signed talent' },
        { atReputation: 70, label: 'Family' },
      ],
      allies: [],
      enemies: ['faction_blind_spots'],
    },
    {
      id: 'faction_viewers',
      name: 'Your Viewers',
      description: 'Everybody watching your stream: forty thousand tonight and a great many more by morning. They rate every rescue live, they love a twist, and they never forgive a lie they catch you telling.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Rank 4,112' },
        { atReputation: 25, label: 'Trending' },
        { atReputation: 45, label: 'Top hundred' },
        { atReputation: 70, label: 'Top ten' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_blind_spots',
      name: 'The Blind Spots',
      description: 'People who live and work where the cameras do not reach: the Underline, the warehouse roofs, the back rooms of the night market. Harrow Street survivors, sacked rigging crew, an ex-editor or two. Sloane Lyle is the nearest thing they have to a leader.',
      startingReputation: -10,
      ranks: [
        { atReputation: -10, label: 'A badge' },
        { atReputation: 20, label: 'Tolerated' },
        { atReputation: 50, label: 'One of us' },
      ],
      allies: [],
      enemies: ['faction_tallyhouse'],
    },
  ],
  characters: [
    {
      id: 'sloane',
      name: 'Sloane Lyle',
      role: 'The most wanted woman in Calder Bay, whom no camera has ever seen, currently in your arms',
      cardBlurb:
        'You caught her live on a stream she cannot appear on, which makes you the first person ever to film her and the only person she now owes a favour. She is funny, fast, and lying to you about at least one thing.',
      pronouns: 'she/her',
      publicTraits: ['Flirts as a tactic, then sometimes means it', 'Always knows the nearest exit', 'Generous with food, stingy with facts'],
      hiddenDrives: [
        'She built the safety plan for the set piece that went wrong at Harrow Street, and she has spent two years trying to undo it',
        'She is tired of being invisible, and the only time anybody has seen her clearly in years was while you were holding her',
      ],
      values: ['Debts get paid, in both directions', 'Nobody gets hurt for a rating'],
      fears: [
        'Another Harrow Street, with her name on it again',
        'Being seen properly, at last, and turning out to be exactly what the posters say',
      ],
      socialStyle:
        'Teases first, bargains second, tells the truth third and only when cornered. Treats touch as a choice, because it is: she decides when she is on camera, and anybody who grabs her to film her has lost her goodwill.',
      boundaries: [
        'Will not hurt a bystander, ever, even to get away',
        'Will not be dragged onto camera; touching her to film her without asking costs her trust, though it does not get her free',
        'Will not hand the case to anybody who has not read it',
      ],
      goals: [
        'Get the Run Sheet in front of the whole city, unedited',
        'Stop Friday’s set piece on the Span before it happens',
      ],
      secrets: [
        {
          id: 'sloane_harrow',
          fact: 'She worked on Tallyhouse’s Scenarios desk for three years and designed the safety plan for the Harrow Street car park set piece, which collapsed further than planned and hurt nine people. Tallyhouse put the blame on her, and she let it, because she thought she deserved some of it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in the Switchyard, late, if you have switched your camera off for her once without being asked to.',
        },
        {
          id: 'sloane_your_stream',
          fact: 'She needs a rookie’s stream, because nobody at Tallyhouse edits the bottom of the Ladder live. She had been watching rookie streams for a month, looking for one she could trust. Yours was on her list before tonight.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her straight why she has not simply run, after she has had a real chance to.',
        },
      ],
      speechStyle:
        'Low, quick and amused. Calls the player "hero" until she decides to use their name, and the first time she does, it matters. Answers a question with a bargain. Short sentences, then one long honest one she regrets.',
      topics: ['the case', 'Harrow Street', 'the Underline', 'being invisible', 'Tallyhouse', 'the favour she owes you'],
      voiceSamples: [
        'Put me down slowly and I’ll owe you one.',
        'Cameras can’t see me. You can. Try not to make it weird.',
        'Hero, I’ve robbed the richest building in this city eleven times. I can steal you a sandwich.',
        'Big question, hero. Big questions cost a favour, and I already owe you one.',
      ],
      appearance:
        'An adult woman, sharp-featured, short black hair with one streak bleached silver, dark grey eyes, a silver flight jacket with the sleeves pushed up, scraped knuckles, and a steel courier case cuffed to her left wrist.',
      visualHook: 'One bleached silver streak in short black hair, and a steel case cuffed to her wrist.',
      silhouette: 'Light on her feet, half turned toward the nearest exit, one hand always free.',
      artSeed: 'rr-sloane-01',
      portrait: null,
      expressions: ['neutral', 'teasing', 'amused', 'guarded', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_switchyard', activity: 'sleeping in the signal room with her boots on' },
        { startMinute: 420, endMinute: 660, locationId: 'the_underline', activity: 'walking the tunnels, checking who has followed whom' },
        { startMinute: 660, endMinute: 1020, locationId: 'the_stacks', activity: 'in the back rooms of the night market, trading favours for information' },
        { startMinute: 1020, endMinute: 1260, locationId: 'rooftop_line', activity: 'crossing the warehouse roofs, where no camera points' },
        { startMinute: 1260, endMinute: 1380, locationId: 'the_rooftop', activity: 'up on Pier Tower, watching the harbour and the Tallyhouse crane yard' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_underline', activity: 'heading home underground' },
      ],
      homeLocationId: 'the_switchyard',
      knowledgeScope: ['sloane', 'tallyhouse', 'set_pieces', 'harrow_street', 'the_underline', 'the_run_sheet', 'the_span'],
      startingRelationship: { trust: 15, affection: 20, respect: 25, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'sloane_shows_the_way_down',
          label: 'She shows you the door with no handle',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'sloane_tells_harrow',
          label: 'She tells you about Harrow Street',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:set_pieces'] },
        },
        {
          id: 'sloane_lets_you_close',
          label: 'She stops flirting as a tactic',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 65 },
        },
      ],
      attributes: { might: 9, agility: 16, mind: 15, presence: 14, resolve: 13, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 30, defenseDc: 15, damage: 5, tags: ['evasive', 'unseen-by-cameras'] },
    },
    {
      id: 'dante',
      name: 'Dante Roe',
      role: 'Number one on the Ladder for four years, and the hero this crane was booked for',
      cardBlurb:
        'He was supposed to make this save, he is six minutes behind you, and he will be the first person in the city to work out that you took something that was his. He likes you anyway, which makes him very hard to refuse.',
      pronouns: 'he/him',
      publicTraits: ['Charming on camera and off it', 'Lands without a sound', 'Remembers every rookie’s name'],
      hiddenDrives: [
        'He has not been sent to an unscheduled call in two years, and he no longer knows whether he is any good at the real thing',
        'He wants somebody to make him stop, so that it will not have been his decision',
      ],
      values: ['The city sleeping better because it believes in somebody', 'Being kind to people below him on the Ladder'],
      fears: ['A real emergency, live, that he fails', 'Being remembered as the man in the white coat who knew'],
      socialStyle:
        'Warm, physically easy, generous with credit. Turns every conversation into a small show for whoever is watching, then drops it the second the cameras go.',
      boundaries: [
        'Will not hit a rookie on camera, even one who hits him first',
        'Will not say the words "set piece" anywhere a microphone could be',
        'Will not let anybody get hurt in front of him, script or no script',
      ],
      goals: ['Get the case back to Tallyhouse quietly, tonight if he can', 'Sign the rookie before somebody less friendly gets to them'],
      secrets: [
        {
          id: 'dante_knows',
          fact: 'He has flown Tallyhouse set pieces for two years and knows exactly how they are rigged. He agreed after Harrow Street, when Corinne Vask told him the city needed one hero it could trust more than it needed the truth.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only with your camera off, and only once you have shown him a page with his own name on it.',
        },
        {
          id: 'dante_late',
          fact: 'On the night of Harrow Street he was booked to catch the collapse and arrived ninety seconds late. He has blamed himself ever since, and has let Sloane Lyle take the blame in public.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If Sloane tells you about Harrow Street and you bring it to him without putting it on the stream.',
        },
      ],
      speechStyle:
        'Easy, bright and a little self-mocking. Calls the player "rookie" and makes it sound like a compliment. Talks to the camera as if it were a third person in the room, waving at it, asking it questions. With the camera off his sentences get shorter and the jokes stop.',
      topics: ['the Ladder', 'Tallyhouse', 'his first rescue', 'the Span', 'Sloane Lyle', 'being number one'],
      voiceSamples: [
        'Rookie. That was my crane.',
        'Wave to the people. No, properly. They pay us.',
        'Top of the Ladder since before you had a licence. Know how many real calls I’ve flown in two years? Ask me with the camera off.',
        'Keep it, give it back, I genuinely don’t mind. I just want you to decide before somebody less friendly comes asking.',
      ],
      appearance:
        'An adult man, tall and broad-shouldered, warm brown skin, close-cropped dark hair, an easy wide smile, and a long spotless white coat with a high collar lined in gold, worn open over a fitted dark grey flight suit.',
      visualHook: 'A long white coat that never gets dirty, its high collar lined in gold.',
      silhouette: 'Standing at a slight lean, as if the wind were coming from wherever he wants to go next.',
      artSeed: 'rr-dante-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'sincere', 'rattled', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'tallyhouse_tower', activity: 'asleep in the penthouse Tallyhouse lends him' },
        { startMinute: 420, endMinute: 600, locationId: 'studio_nine', activity: 'the morning show: make-up, sponsor reads, a joke he has told nine hundred times' },
        { startMinute: 600, endMinute: 900, locationId: 'tallyhouse_tower', activity: 'training in the roof gym, filmed from four angles' },
        { startMinute: 900, endMinute: 1440, locationId: 'harbour_front', activity: 'on call along the waterfront, signing things, waiting for his booking' },
      ],
      homeLocationId: 'tallyhouse_tower',
      knowledgeScope: ['dante', 'tallyhouse', 'set_pieces', 'the_ladder', 'the_span', 'harrow_street'],
      startingRelationship: { trust: 20, affection: 25, respect: 30, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'dante_off_camera',
          label: 'He talks to you with the camera off',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'dante_admits_it',
          label: 'He admits what he has been flying',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['knows:the_bridge'] },
        },
        {
          id: 'dante_and_you',
          label: 'He stops performing around you',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 60 },
        },
      ],
      attributes: { might: 15, agility: 16, mind: 12, presence: 17, resolve: 12, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 80, defenseDc: 18, damage: 14, tags: ['number-one', 'flight'] },
    },
    {
      id: 'kit',
      name: 'Kit Navarro',
      role: 'Your handler on the Bureau’s night desk, and the voice in your earpiece',
      cardBlurb:
        'She has thirty-eight rookies on her desk and has decided in the last ninety seconds that you are the one most likely to end her career. She is also the only person at the Bureau who has waited two years for somebody to bring her proof.',
      pronouns: 'she/her',
      publicTraits: ['Fast, dry and allergic to drama', 'Hears every radio in a city block', 'Feeds her rookies'],
      hiddenDrives: [
        'She reported the set pieces two years ago, was moved to the rookie desk for it, and has kept every note since',
        'She wants to be a hero again rather than a voice',
      ],
      values: ['Rookies go home in one piece', 'Write it down, timestamp it, file it'],
      fears: ['Getting a rookie hurt by being right too loudly', 'Being right and losing anyway'],
      socialStyle:
        'Talks in your ear in short bursts while doing four other things. Gets very calm when things are very bad, which is how you know.',
      boundaries: [
        'Will not lie on a report, including for you',
        'Will not let you walk into Tallyhouse alone',
        'Will not cover a dark stream for longer than ten minutes without a reason she can write down',
      ],
      goals: ['Keep your licence', 'Get proof of the set pieces to somebody who cannot be bought'],
      secrets: [
        {
          id: 'kit_folder',
          fact: 'She has a folder of two years of radio intercepts: rigging crews talking about accidents before they happened. The Bureau buried her report and moved her to rookies. The folder is in her desk drawer.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to you if you file an honest report, including the parts that make you look bad.',
        },
        {
          id: 'kit_power',
          fact: 'Her power is hearing radio, and she was a licensed hero with it once. She lost the field licence for listening to Tallyhouse’s internal channels without a warrant, which is the real reason she was moved.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask how she knew something she could not have known, and you do not report her for it.',
        },
      ],
      speechStyle:
        'Clipped, practical and funny under pressure. Times, street names and numbers. Calls the player by their rank number when she is annoyed and by their name when she is scared.',
      topics: ['your licence', 'the Bureau', 'radio', 'her folder', 'the other rookies', 'Sergeant Mensah'],
      voiceSamples: [
        'Do not let go of her. Do not let go of her. Why are you letting go of her?',
        'Four-one-one-two, you have been a rookie for three months and a problem for six minutes.',
        'I hear radio. All of it, a whole block’s worth. Right now a cabbie two streets over is singing to his dispatcher, badly.',
        'Eat something. I’ve sent noodles to your building. Actual noodles, in a bag, with chopsticks.',
      ],
      appearance:
        'An adult woman, compact, curly dark hair tied up with a pen through it, a headset around her neck, a navy Bureau fleece with the cuffs chewed, and three phones clipped along her belt.',
      visualHook: 'A headset around her neck and three phones lined up on the desk in front of her.',
      silhouette: 'Leaning over a desk on both fists, headset on, looking at six screens at once.',
      artSeed: 'rr-kit-01',
      portrait: null,
      expressions: ['neutral', 'exasperated', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'bureau_office', activity: 'the last hours of the night desk, cold coffee, thirty-eight streams' },
        { startMinute: 360, endMinute: 900, locationId: 'the_stacks', activity: 'asleep in her flat two towers over from yours' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_stacks', activity: 'the night market, buying dinner for the whole desk' },
        { startMinute: 1080, endMinute: 1440, locationId: 'bureau_office', activity: 'on the night desk, headset on, thirty-eight rookies in her ear' },
      ],
      homeLocationId: 'bureau_office',
      knowledgeScope: ['kit', 'the_bureau', 'radio', 'the_folder', 'the_ladder', 'mensah'],
      startingRelationship: { trust: 35, affection: 30, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'kit_shows_the_folder',
          label: 'She shows you her folder',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['filed_it_straight'] },
        },
        {
          id: 'kit_goes_out_in_the_field',
          label: 'She leaves the desk and comes with you',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 45 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 16, presence: 12, resolve: 15, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 4, tags: ['dispatcher'] },
    },
    {
      id: 'vask',
      name: 'Corinne Vask',
      calledName: 'Vask',
      role: 'Tallyhouse’s Head of Live Events, who schedules the city’s accidents',
      cardBlurb:
        'She runs the show you are suddenly the star of, she would like her case back, and she will offer you everything you have ever wanted in a voice so kind you will not notice, until later, that she never once asked whether anybody was hurt.',
      pronouns: 'she/her',
      publicTraits: ['Never raises her voice', 'Knows every hero’s rating to one decimal place', 'Calls disasters "moments"'],
      hiddenDrives: [
        'She believes a city that watches staged rescues panics less than a city that watches real ones, and she has numbers to prove it',
        'She is frightened of anything she cannot edit',
      ],
      values: ['A good show is a public service', 'Nobody in charge should ever look surprised'],
      fears: ['A live moment she cannot cut away from', 'The Run Sheet read aloud in somebody else’s voice'],
      socialStyle:
        'Speaks like a producer in your ear: calm, warm, directive. Compliments first, offers second, and never puts a threat into words.',
      boundaries: [
        'Will not do anything violent herself, or in front of a camera',
        'Will not put a threat in writing',
        'Will not negotiate with Sloane Lyle directly',
      ],
      goals: ['Get the case back before Friday', 'Sign the rookie, or make their rating disappear'],
      secrets: [
        {
          id: 'vask_the_crane',
          fact: 'She ordered the crane arm dropped early tonight to get rid of Sloane Lyle and make it look like her own fall.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The rigging crew’s radio log proves it, and Kit can find that log if somebody gives her the case’s tracker code.',
        },
        {
          id: 'vask_the_dial',
          fact: 'Tallyhouse weights the vote. About a third of the rating accounts in any chat are the company’s, and the dial on the Counting Floor can move any rescue up or down by about a star.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only on the Counting Floor itself, or from somebody who has worked there.',
        },
        {
          id: 'vask_the_span',
          fact: 'The Span’s owners cut the safety budget for Friday’s set piece. She knows the east tower rig is underbuilt and is betting that nothing goes wrong.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It is in the margin of the Run Sheet’s last page, in her own handwriting.',
        },
      ],
      speechStyle:
        'Soft, precise television-production language: "lovely", "from the top", "in the edit". Never swears, never hurries, and never says what she wants in plain words. Calls the player by their full name, as if reading it off a contract.',
      topics: ['the Feed', 'ratings', 'sponsorship', 'the case', 'Top Ten Night', 'Sloane Lyle'],
      voiceSamples: [
        'Lovely save. Genuinely lovely. Shall we talk about the case?',
        'Nobody in this city wants the truth at nine o’clock on a Friday. They want a man in a white coat catching something.',
        'We can fix that in the edit. We can fix almost anything in the edit.',
        'From the top, then. Slower this time, and with the case on the table between us.',
      ],
      appearance:
        'An adult woman, slim, silver-blonde hair in a low knot, a pale grey suit, small round glasses, a production earpiece, and a tablet held flat against her chest.',
      visualHook: 'A production earpiece and a tablet held flat against her chest like a hymn book.',
      silhouette: 'Very upright and very still, hands folded over the tablet, head tilted to listen to her earpiece.',
      artSeed: 'rr-vask-01',
      portrait: null,
      expressions: ['neutral', 'pleased', 'cold', 'calculating'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'tallyhouse_tower', activity: 'on the executive floor, in the flat she will not call home' },
        { startMinute: 480, endMinute: 720, locationId: 'studio_nine', activity: 'producing the morning show from the gallery' },
        { startMinute: 720, endMinute: 1140, locationId: 'tallyhouse_tower', activity: 'meetings, sponsors, and a run sheet on a tablet' },
        { startMinute: 1140, endMinute: 1440, locationId: 'counting_floor', activity: 'on the sixty-first floor, watching every live rescue in the city at once' },
      ],
      homeLocationId: 'tallyhouse_tower',
      knowledgeScope: ['vask', 'tallyhouse', 'set_pieces', 'the_run_sheet', 'the_counting_floor', 'the_span', 'the_ladder'],
      startingRelationship: { trust: 5, affection: 0, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vask_makes_the_offer',
          label: 'She makes you an offer in person',
          kind: 'OTHER',
          requires: { flagsSet: ['first_night_over'] },
        },
        {
          id: 'vask_drops_the_act',
          label: 'She stops being lovely',
          kind: 'OTHER',
          requires: { respect: 55, flagsSet: ['knows:set_pieces'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 16, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 20, defenseDc: 10, damage: 1, tags: ['executive', 'no-power'] },
    },
    {
      id: 'mensah',
      name: 'Tobiah Mensah',
      calledName: 'Mensah',
      role: 'Sergeant in Bureau Enforcement, the sirens coming up the tower, with a warrant for Sloane Lyle',
      cardBlurb:
        'He has chased Sloane Lyle for two years without one frame of footage, and you have just given him a full minute of it, so he would like to be your friend. He is honest, slow to anger, and absolutely going to arrest somebody tonight.',
      pronouns: 'he/him',
      publicTraits: ['Patient to the point of menace', 'Writes everything in a paper notebook', 'Distrusts anything that streams'],
      hiddenDrives: [
        'He has started to suspect the Sloane Lyle file is too neat, and he hates not knowing who made it that way',
        'He wants to retire having arrested the right person at least once',
      ],
      values: ['A warrant is a promise', 'Evidence over ratings'],
      fears: ['Arresting the wrong person on camera', 'Finding out the Bureau is already owned by a television company'],
      socialStyle:
        'Asks one question at a time and waits for the whole answer. Never threatens; explains what will happen next, in order.',
      boundaries: [
        'Will not take a bribe, a sponsorship or a favour',
        'Will not arrest anybody without a reason he can say out loud',
        'Will not use force on somebody who has put their hands up',
      ],
      goals: ['Bring in Sloane Lyle', 'Find out why the crane fell'],
      secrets: [
        {
          id: 'mensah_the_adjectives',
          fact: 'The Sloane Lyle file was written by Tallyhouse’s legal team and handed to the Bureau ready-made. Every witness statement in it uses the same three adjectives.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you show him anything from the Run Sheet, he will tell you about the adjectives.',
        },
      ],
      speechStyle:
        'Slow, low and formal, in full sentences. Says "in order" before a list. Calls the player "Licensee" until they earn their name. Uses no slang at all, and reads the chat aloud in a flat voice when he wants to embarrass somebody.',
      topics: ['the warrant', 'Sloane Lyle', 'the crane', 'evidence', 'the Bureau', 'his notebook'],
      voiceSamples: [
        'Licensee. Keep holding her, please. Release nobody until I say so.',
        'I have chased that woman for two years and never once seen her face. Forgive me for being interested in your camera.',
        'In order. You give me your report, I read it, I decide whether I believe it. Nobody needs to be clever tonight.',
      ],
      appearance:
        'An adult man, big and grey-bearded, dark skin, reading glasses pushed up on his head, a dark blue Bureau Enforcement jacket with reflective stripes across the shoulders, and a small paper notebook open in one hand.',
      visualHook: 'A small paper notebook and a pencil, in a city where nobody writes anything down.',
      silhouette: 'Broad and unhurried, notebook open, head down, writing while you talk.',
      artSeed: 'rr-mensah-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'tired', 'reluctantly impressed'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'bureau_office', activity: 'writing up the night in pencil' },
        { startMinute: 480, endMinute: 1020, locationId: 'bureau_office', activity: 'off shift, on the cot in the back office because the drive home is long' },
        { startMinute: 1020, endMinute: 1440, locationId: 'harbour_front', activity: 'in the Enforcement van on the waterfront, listening to the scanner' },
      ],
      homeLocationId: 'bureau_office',
      knowledgeScope: ['mensah', 'the_bureau', 'sloane_lyle_file', 'the_warrant', 'the_crane'],
      startingRelationship: { trust: 20, affection: 5, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mensah_listens',
          label: 'He puts the notebook down and listens',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'mensah_the_adjectives_gate',
          label: 'He tells you about the file',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows:set_pieces'] },
        },
      ],
      attributes: { might: 15, agility: 10, mind: 14, presence: 13, resolve: 17, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 14, damage: 8, tags: ['enforcement', 'power-dampening touch'] },
    },
    {
      id: 'chat',
      name: 'The Chat',
      calledName: 'The Chat',
      role: 'Forty thousand strangers watching your shoulder camera, all typing at once',
      cardBlurb:
        'Every rescue you make is rated by them while it happens, and they turned on you the second they recognised her. They are loud, fickle, funny and sometimes right, and they never forgive a lie they catch you telling.',
      pronouns: 'they/them',
      publicTraits: ['Fickle by the second', 'Funnier than you', 'Forgets everything except being lied to'],
      hiddenDrives: [
        'A lot of them watch because a hero once pulled them out of something, and they are waiting to see a real one again',
        'They want to be part of it, not just an audience',
      ],
      values: ['A good show', 'Being let in on it'],
      fears: ['Being bored', 'Being played'],
      socialStyle:
        'Talks over itself. Three opinions a second, in capitals, with nicknames. Turns on a hero in one line and back again in the next. Only exists while the camera is on.',
      boundaries: [
        'Will not stay on a dark stream; every minute the camera is off, viewers leave',
        'Will not forgive a lie it catches on camera',
        'Will not be spoken to as one person without making fun of you for it',
      ],
      goals: ['See what happens next', 'Find out who Sloane Lyle really is'],
      secrets: [
        {
          id: 'chat_weighted',
          fact: 'About a third of the accounts posting ratings tonight belong to Tallyhouse moderation, and their votes count for more. The real viewers have no idea.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'On the Counting Floor, or if Sloane shows you the moderation list in the back of the case.',
        },
      ],
      speechStyle:
        'Capitals for feelings, lower case for jokes, never more than eight words a line. Sometimes a username first: bridgetroll_88, mothmum, ladderwatch, 4112stan. Uses the player’s pronouns or calls them by their rank number. Posting needs a verified adult account.',
      topics: ['your rating', 'Sloane Lyle', 'Dante Roe', 'the Ladder', 'what you should do next'],
      voiceSamples: [
        'THAT’S SLOANE LYLE. FIRST FOOTAGE EVER.',
        '4112 really said no to the number one lmao',
        'mothmum: 4112 is talking to the air?? ok??',
        'WHY IS THE CAMERA OFF. WHAT ARE YOU HIDING',
      ],
      appearance:
        'Not a person: a crowd, seen as one tall glowing column at the edge of your vision, a stream of coloured hearts, stars and blank speech bubbles rising under a row of five glowing stars that never stops filling and emptying. No letters, numbers or usernames anywhere.',
      visualHook: 'A five-star meter that never stops moving, above a glowing stream of hearts, stars and blank speech bubbles.',
      silhouette: 'A narrow column of light and floating shapes, always at the edge of your vision.',
      artSeed: 'rr-chat-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'angry'],
      schedule: [],
      homeLocationId: 'the_rooftop',
      knowledgeScope: ['the_ladder', 'sloane_lyle_posters', 'dante_roe', 'the_feed'],
      startingRelationship: { trust: 10, affection: 30, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'chat_on_your_side',
          label: 'The chat starts defending you',
          kind: 'ALLIANCE',
          requires: { trust: 40, affection: 50 },
        },
        {
          id: 'chat_believes_you',
          label: 'The chat believes you over the Feed',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['told_the_city'] },
        },
      ],
      attributes: { might: 1, agility: 20, mind: 10, presence: 18, resolve: 3, arcana: 1 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_the_save',
      title: 'Rescue Rating',
      summary: 'Forty floors up, live on the Feed, you are holding the most wanted woman in Calder Bay, and the sirens are thirty seconds away.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['sloane', 'kit', 'mensah', 'chat'],
      involvedLocationIds: ['the_rooftop'],
      knownRewardCopy: 'Some idea of who you just saved, and what it is going to cost you.',
      steps: [
        {
          id: 'thirty_seconds',
          playerCopy: 'Decide what happens to the woman in your arms before the sirens arrive.',
          directorNotes:
            'She asks to be put down; Kit says do not let go; the chat is turning; the case is humming. Every route is a real way to play it and none is wrong. Keep the rule: the moment nobody is touching her she vanishes from the stream, so letting go on camera looks to forty thousand people as if she vanished out of the player’s arms. Sergeant Mensah reaches the roof two minutes in. She does not escape by magic: if the player holds on, she stays held, and she talks.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'held_on',
              label: 'Hold on to her until the Bureau arrives',
              predicate: { flagsSet: ['used:make_the_save'] },
              setsFlags: ['held_her_for_the_law'],
              closesFlags: ['let_her_walk'],
            },
            {
              routeId: 'asked_about_the_case',
              label: 'Ask her what is in the case',
              predicate: { flagsSet: ['used:straight_talk'] },
              setsFlags: ['asked_about_the_case'],
              closesFlags: [],
            },
            {
              routeId: 'went_dark',
              label: 'Switch your camera off',
              predicate: { flagsSet: ['used:go_dark'] },
              setsFlags: ['went_dark_on_the_roof', 'let_her_walk'],
              closesFlags: ['held_her_for_the_law'],
            },
            {
              routeId: 'played_it_for_the_chat',
              label: 'Turn to the camera and make it a show',
              predicate: { flagsSet: ['used:play_to_camera'] },
              setsFlags: ['played_to_the_chat'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_crane',
              label: 'Look at what actually broke',
              predicate: { flagsSet: ['used:read_the_scene'] },
              setsFlags: ['saw_the_cut_bolts'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_save_over'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_rest_of_the_night',
          playerCopy: 'Get through the night your stream went to the top of the city.',
          directorNotes:
            'Wednesday night after the roof. Dante has landed, Mensah has questions, and Sloane is in a van, gone over the rooftops, or still talking. Three people want three different things from the player before midnight and nobody has to be satisfied. If the player goes home and sleeps, that is a real choice and the city keeps moving without them.',
          enterWhen: { flagsSet: ['first_save_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'followed_her_down',
              label: 'Follow Sloane into the Underline',
              predicate: { atLocation: 'the_underline', flagsSet: ['spoke:sloane'] },
              setsFlags: ['sloane_owes_you', 'shown_the_switchyard'],
              closesFlags: [],
            },
            {
              routeId: 'filed_it_straight',
              label: 'File an honest report at the Bureau',
              predicate: { atLocation: 'bureau_office', flagsSet: ['spoke:kit'] },
              setsFlags: ['filed_it_straight'],
              closesFlags: [],
            },
            {
              routeId: 'heard_dante_out',
              label: 'Hear the number one out',
              predicate: { flagsSet: ['spoke:dante'] },
              setsFlags: ['dante_made_an_offer'],
              closesFlags: [],
            },
            {
              routeId: 'handed_her_over',
              label: 'Hand her to Sergeant Mensah',
              predicate: { flagsSet: ['held_her_for_the_law', 'spoke:mensah'] },
              setsFlags: ['handed_her_in'],
              closesFlags: ['sloane_owes_you'],
            },
            {
              routeId: 'went_home',
              label: 'Go home and watch your own clip',
              predicate: { atLocation: 'your_flat' },
              setsFlags: ['watched_the_clip'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_viewers', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_case',
      title: 'The Humming Case',
      summary: 'A steel courier case, cuffed to Sloane Lyle’s wrist, humming every ninety seconds to tell Tallyhouse where it is. Everybody wants it. Nobody will say what is in it.',
      kind: 'MAIN',
      involvedCharacterIds: ['sloane', 'kit', 'mensah', 'vask'],
      involvedLocationIds: ['the_switchyard', 'bureau_office', 'tallyhouse_tower'],
      knownRewardCopy: 'What Tallyhouse dropped a crane to keep, and whether you want to know.',
      discoverWhen: { flagsSet: ['first_save_over'] },
      steps: [
        {
          id: 'open_it',
          playerCopy: 'Find out what is in the case, or decide you do not want to know.',
          directorNotes:
            'Three ways in and one way out, and they are not equivalent. Opening it with Sloane makes the player her partner whether they like it or not. Getting the Bureau to crack it makes it evidence, which means Mensah reads it and the Bureau’s lawyers get a copy, which means Tallyhouse has a copy by morning. Handing it back unopened is the sensible career move, and Vask will be lovely about it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'opened_with_sloane',
              label: 'Open it with Sloane in the Switchyard',
              predicate: {
                atLocation: 'the_switchyard',
                minRelationship: [{ characterId: 'sloane', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['case_open', 'opened_with_sloane'],
              closesFlags: ['case_handed_back'],
            },
            {
              routeId: 'opened_by_the_bureau',
              label: 'Have the Bureau crack it as evidence',
              predicate: { flagsSet: ['spoke:kit', 'spoke:mensah'], hasItems: ['the_case'] },
              setsFlags: ['case_open', 'case_is_evidence'],
              closesFlags: ['case_handed_back'],
            },
            {
              routeId: 'opened_with_a_keycard',
              label: 'Open it yourself with a Tallyhouse keycard',
              predicate: { hasItems: ['the_case', 'tally_keycard'] },
              setsFlags: ['case_open'],
              closesFlags: ['case_handed_back'],
            },
            {
              routeId: 'handed_it_back',
              label: 'Give it back to Tallyhouse unopened',
              predicate: { flagsSet: ['spoke:vask'], hasItems: ['the_case'] },
              setsFlags: ['case_handed_back'],
              closesFlags: ['case_open'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['case_decided'],
            abilities: ['read_the_run_sheet'],
            reputation: [],
          },
        },
        {
          id: 'read_it',
          playerCopy: 'Read the Run Sheet.',
          directorNotes:
            'Thirty-one pages: a month of accidents, each with a place, a time and a hero’s name. Most are small, a tram that brakes hard or a gas smell in an empty office. Dante Roe’s name is on nine. Friday’s page is different: the Span’s east tower, 20:40, with a note in the margin in Vask’s handwriting. Let the player find the margin note if they read carefully; if Sloane is there she points at it.',
          enterWhen: { flagsSet: ['case_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_yourself',
              label: 'Read it line by line',
              predicate: { flagsSet: ['used:read_the_run_sheet'] },
              setsFlags: ['knows:set_pieces', 'knows:the_bridge'],
              closesFlags: [],
            },
            {
              routeId: 'sloane_walked_you_through',
              label: 'Let Sloane show you the page that matters',
              predicate: { flagsSet: ['opened_with_sloane', 'spoke:sloane'] },
              setsFlags: ['knows:set_pieces', 'knows:the_bridge', 'knows:harrow_street'],
              closesFlags: [],
            },
            {
              routeId: 'kit_read_it_against_the_folder',
              label: 'Have Kit read it against her folder',
              predicate: { flagsSet: ['spoke:kit'], hasItems: ['kits_folder'] },
              setsFlags: ['knows:set_pieces', 'knows:the_bridge', 'proof_matches'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['run_sheet_read'],
            abilities: [],
            reputation: [{ factionId: 'faction_blind_spots', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_top_ten_night',
      title: 'Top Ten Night',
      summary: 'On Friday at eight the Calder Span closes to cars for the Ladder’s biggest broadcast. At twenty to nine a set piece is booked on the east tower, and the rig was built cheap.',
      kind: 'MAIN',
      involvedCharacterIds: ['dante', 'vask', 'mensah', 'sloane', 'chat'],
      involvedLocationIds: ['calder_span', 'harbour_front', 'tallyhouse_tower'],
      knownRewardCopy: 'Three thousand people on a bridge, and whether anybody gets hurt for a rating.',
      discoverWhen: { flagsSet: ['knows:the_bridge'] },
      steps: [
        {
          id: 'before_friday',
          playerCopy: 'Decide what you are going to do about Friday at twenty to nine.',
          directorNotes:
            'Two days and four doors. Dante can call it off or fly it for real, if somebody shows him why. Mensah can close the bridge, if somebody gives him evidence he can say out loud. The city can be told, on a stream nobody edits. Or Vask can be bargained with, which works, and which means the set piece goes ahead with the player’s blessing. None of these is the right answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_dante',
              label: 'Show Dante the page with his name on it',
              predicate: {
                flagsSet: ['spoke:dante'],
                minRelationship: [{ characterId: 'dante', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['dante_knows_it_is_bad'],
              closesFlags: [],
            },
            {
              routeId: 'brought_it_to_mensah',
              label: 'Take it to Sergeant Mensah, with proof',
              predicate: {
                flagsSet: ['spoke:mensah', 'knows:set_pieces'],
                minRelationship: [{ characterId: 'mensah', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['bureau_is_moving'],
              closesFlags: [],
            },
            {
              routeId: 'told_the_city',
              label: 'Read it out on your stream',
              predicate: { flagsSet: ['used:straight_talk', 'knows:the_bridge'] },
              setsFlags: ['told_the_city'],
              closesFlags: ['sold_it_back'],
            },
            {
              routeId: 'made_a_deal_with_vask',
              label: 'Make a deal with Vask',
              predicate: { flagsSet: ['spoke:vask', 'knows:the_bridge'] },
              setsFlags: ['sold_it_back'],
              closesFlags: ['told_the_city'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['friday_planned'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'on_the_span',
          playerCopy: 'Be on the bridge on Friday night.',
          directorNotes:
            'Three thousand people, ten heroes, every screen in the city. If nobody has stopped it, a cable on the east tower lets go at 20:40, and it was rigged cheaply enough that the drop is real. Write the scale honestly and keep it 13+: people are hurt, nobody dies on screen, and the player’s power decides what they can actually hold. Dante will try whatever he has agreed to try.',
          enterWhen: { flagsSet: ['friday_planned'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'stopped_it_early',
              label: 'Stop the set piece before it starts',
              predicate: { atLocation: 'calder_span', flagsSet: ['used:read_the_scene'], beforeWorldMinute: 2 * 1440 + 20 * 60 + 40 },
              setsFlags: ['bridge_stopped'],
              closesFlags: ['the_cable_went'],
            },
            {
              routeId: 'dante_went_off_script',
              label: 'Fly it with Dante, for real',
              predicate: { atLocation: 'calder_span', flagsSet: ['dante_knows_it_is_bad', 'spoke:dante'] },
              setsFlags: ['dante_went_off_script', 'bridge_saved_live'],
              closesFlags: [],
            },
            {
              routeId: 'saved_them_live',
              label: 'Catch it when it goes, live',
              predicate: { atLocation: 'calder_span', flagsSet: ['the_cable_went', 'used:make_the_save'] },
              setsFlags: ['bridge_saved_live'],
              closesFlags: [],
            },
            {
              routeId: 'somewhere_else',
              label: 'Be somewhere else when it goes',
              predicate: { flagsSet: ['the_cable_went'], afterWorldMinute: 2 * 1440 + 21 * 60 },
              setsFlags: ['watched_it_from_a_screen'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['friday_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_viewers', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_owe_you_one',
      title: 'I’ll Owe You One',
      summary: 'The most wanted woman in the city owes you a favour, she cannot be filmed unless you are touching her, and she has started turning up wherever you are.',
      kind: 'MAIN',
      involvedCharacterIds: ['sloane', 'mensah', 'chat'],
      involvedLocationIds: ['the_rooftop', 'the_switchyard', 'rooftop_line'],
      knownRewardCopy: 'What Sloane Lyle is to you, decided by both of you.',
      discoverWhen: { flagsSet: ['first_save_over'] },
      steps: [
        {
          id: 'what_she_is_to_you',
          playerCopy: 'Decide what Sloane Lyle is to you.',
          directorNotes:
            'She flirts because it works and because she likes the player, in that order, and the order changes over the week. She can be a partner, a friend, a romance, or the person the player arrests. A kiss is the most this story ever shows. If the player turns her in after she has trusted them, she does not fight; she looks at the camera, which cannot see her, and says nothing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'partners',
              label: 'Work with her',
              predicate: {
                flagsSet: ['run_sheet_read'],
                minRelationship: [{ characterId: 'sloane', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['partners_with_sloane'],
              closesFlags: ['sloane_arrested'],
            },
            {
              routeId: 'more_than_that',
              label: 'Tell her how you feel',
              predicate: {
                minRelationship: [
                  { characterId: 'sloane', dimension: 'trust', value: 50 },
                  { characterId: 'sloane', dimension: 'affection', value: 70 },
                ],
              },
              setsFlags: ['sloane_and_you'],
              closesFlags: ['sloane_arrested'],
            },
            {
              routeId: 'she_went_on_camera',
              label: 'Ask her to be seen, on purpose',
              predicate: {
                flagsSet: ['told_the_city'],
                minRelationship: [{ characterId: 'sloane', dimension: 'trust', value: 70 }],
              },
              setsFlags: ['sloane_testified'],
              closesFlags: ['sloane_arrested'],
            },
            {
              routeId: 'turned_her_in',
              label: 'Arrest her yourself',
              predicate: { flagsSet: ['used:take_them_down', 'spoke:mensah'] },
              setsFlags: ['sloane_arrested'],
              closesFlags: ['partners_with_sloane', 'sloane_and_you'],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['sloane_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_blind_spots', amount: 20 }],
          },
        },
      ],
    },
    {
      id: 'q_the_ladder',
      title: 'Rank 4,112',
      summary: 'Overnight your clip has six million views, the Ladder has moved you up nearly four thousand places, and Tallyhouse has sent a car.',
      kind: 'SIDE',
      involvedCharacterIds: ['vask', 'dante', 'kit', 'chat'],
      involvedLocationIds: ['studio_nine', 'tallyhouse_tower', 'your_flat'],
      knownRewardCopy: 'A place on the Ladder, and a decision about who gets to choose your calls.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_offer',
          playerCopy: 'Decide what to do with being famous.',
          directorNotes:
            'Vask’s offer is real: money, a top-hundred slot, a better flat and the good calls. The price is that Tallyhouse decides which calls the player takes, and they will be on a run sheet by next month. Dante will tell them honestly that it is a good life. Kit will be quietly furious either way.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'signed',
              label: 'Sign with Tallyhouse',
              predicate: { flagsSet: ['spoke:vask'], hasItems: ['sponsor_contract'] },
              setsFlags: ['signed_with_tallyhouse'],
              closesFlags: ['refused_the_offer'],
            },
            {
              routeId: 'refused_on_camera',
              label: 'Turn the offer down, on camera',
              predicate: { flagsSet: ['spoke:vask', 'used:straight_talk'] },
              setsFlags: ['refused_the_offer'],
              closesFlags: ['signed_with_tallyhouse'],
            },
            {
              routeId: 'climbed_it_honestly',
              label: 'Climb the Ladder on real calls',
              predicate: {
                flagsSet: ['used:make_the_save'],
                minFactionReputation: [{ factionId: 'faction_viewers', value: 30 }],
              },
              setsFlags: ['climbed_it_honestly'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['ladder_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_viewers', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_counting_floor',
      title: 'The Counting Floor',
      summary: 'Somewhere on the sixty-first floor of Tallyhouse Tower, twelve people and one dial decide what forty thousand people thought of every rescue in the city.',
      kind: 'LEAD',
      involvedCharacterIds: ['vask', 'kit', 'sloane', 'chat'],
      involvedLocationIds: ['tallyhouse_tower', 'counting_floor', 'studio_nine'],
      knownRewardCopy: 'What your rating was actually worth.',
      discoverWhen: { flagsSet: ['knows:set_pieces'] },
      steps: [
        {
          id: 'a_way_in',
          playerCopy: 'Find a way up to the sixty-first floor.',
          directorNotes:
            'This whole thread is optional and must feel like it. A player who never learns about the set pieces never sees it. For one who does, it is a heist in a building where everybody is lit well and nobody is armed: security in grey jackets, lifts that need cards, and Vask somewhere above them, listening to her earpiece.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kits_override',
              label: 'Get Kit to open the lift',
              predicate: { minRelationship: [{ characterId: 'kit', dimension: 'trust', value: 60 }] },
              setsFlags: ['has_a_way_in', 'kit_came_with_you'],
              closesFlags: [],
            },
            {
              routeId: 'lifted_a_keycard',
              label: 'Use a keycard from the green room',
              predicate: { hasItems: ['tally_keycard'] },
              setsFlags: ['has_a_way_in'],
              closesFlags: [],
            },
            {
              routeId: 'sloane_knows_the_way',
              label: 'Let Sloane take you in her way',
              predicate: { flagsSet: ['partners_with_sloane'] },
              setsFlags: ['has_a_way_in', 'went_in_with_sloane'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['inside_tallyhouse'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_dial',
          playerCopy: 'Decide what to do about the dial.',
          directorNotes:
            'One dial, under a lamp, that moves any rescue by about a star. Putting it on the player’s stream is the loudest thing anybody can do in this city, and the chat will learn in real time that a third of it was never real. Switching it off quietly changes the Ladder by morning and nobody knows why. Leaving it alone is allowed, and the player will know every rating they see from now on.',
          enterWhen: { flagsSet: ['has_a_way_in'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'streamed_the_dial',
              label: 'Put the dial on your stream',
              predicate: { atLocation: 'counting_floor', flagsSet: ['used:straight_talk'] },
              setsFlags: ['the_rating_is_out'],
              closesFlags: ['left_the_dial_alone'],
            },
            {
              routeId: 'turned_it_off',
              label: 'Switch the weighting off, quietly',
              predicate: { atLocation: 'counting_floor', flagsSet: ['used:read_the_scene'] },
              setsFlags: ['weighting_off'],
              closesFlags: [],
            },
            {
              routeId: 'left_it_alone',
              label: 'Leave it exactly as it is',
              predicate: { atLocation: 'counting_floor' },
              setsFlags: ['left_the_dial_alone'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['counting_floor_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_viewers', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_mensah_on_the_stairs',
      atWorldMinute: 21 * 60 + 42,
      locationId: 'the_rooftop',
      publicCopy:
        'The construction lift clatters to a stop and a big grey-bearded sergeant in an Enforcement jacket steps out onto the roof with two officers behind him.',
      directorNotes:
        'Sergeant Mensah has chased Sloane Lyle for two years without a single frame of footage. He is calm, polite and in no hurry, and he wants the player to keep holding her, because the stream is the only evidence he has ever had. He will not use force on anybody with their hands up.',
      setsFlags: ['mensah_on_the_roof'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'mensah', toLocationId: 'the_rooftop' }],
    },
    {
      id: 'we_dante_lands',
      atWorldMinute: 21 * 60 + 46,
      locationId: 'the_rooftop',
      publicCopy:
        'A man in a long white coat drops out of the sky and lands on the roof without a sound: Dante Roe, number one on the Ladder, six minutes late. He looks at the crane before he looks at you.',
      directorNotes:
        'He was booked for 21:50. The crew dropped the arm ten minutes early, and he landed at 21:46: six minutes after the fall, four before his cue. He is warm, funny and generous to the rookie on camera, and he wants the case. He recognises Sloane and does not say so out loud. If the player is no longer on the roof, he finds them later instead.',
      setsFlags: ['dante_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dante', toLocationId: 'the_rooftop' }],
    },
    {
      id: 'we_vask_calls',
      atWorldMinute: 23 * 60 + 30,
      locationId: null,
      publicCopy:
        'Your phone rings from a number with no name on it. A woman’s voice, warm and unhurried: "Lovely save tonight. Shall we talk about the case?"',
      directorNotes:
        'Corinne Vask, calling personally, which she never does. She offers nothing specific and threatens nothing at all. She wants a meeting at Tallyhouse Tower tomorrow, and she mentions, kindly, that she has seen the player’s rating history.',
      setsFlags: ['vask_has_called'],
      cancelledByFlags: ['case_handed_back'],
      requiresFlags: ['first_save_over'],
      movesCharacters: [],
    },
    {
      id: 'we_sloane_walks_out',
      atWorldMinute: 1440 + 3 * 60,
      locationId: 'bureau_office',
      publicCopy:
        'At three in the morning Holding Room Two at the Bureau is found empty, the cuffs still locked to the table and the steel case gone with her.',
      directorNotes:
        'Only if the player handed her in. Tallyhouse lawyers arrived at half past two to collect the case as company property; by three she had walked out past a camera that could not see her. She leaves a note for the player on the duty desk that says only: still owe you one.',
      setsFlags: ['sloane_walked_out', 'sloane_owes_you', 'shown_the_switchyard'],
      cancelledByFlags: ['sloane_arrested'],
      requiresFlags: ['handed_her_in'],
      movesCharacters: [{ characterId: 'sloane', toLocationId: 'the_underline' }],
    },
    {
      id: 'we_the_clip',
      atWorldMinute: 1440 + 7 * 60,
      locationId: null,
      publicCopy:
        'Your clip from the roof has six million views, the Ladder has moved you from 4,112 to 311 overnight, and there is a black Tallyhouse car parked outside your building.',
      directorNotes:
        'Fame arrives before breakfast. Strangers in the Stacks recognise the player. The car is polite and will wait all day. The chat has split into people who think the player is a hero and people who think they let a villain go, and both halves are watching.',
      setsFlags: ['you_are_trending'],
      cancelledByFlags: [],
      requiresFlags: ['first_save_over'],
      movesCharacters: [],
    },
    {
      id: 'we_studio_invite',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'studio_nine',
      publicCopy:
        'Studio Nine’s morning show wants the rookie from the roof on its white sofa at eleven, live, next to Dante Roe.',
      directorNotes:
        'A soft interview that is not soft. Vask produces it from the gallery. Dante is charming and will try to make the player look good, which is also a way of making them owe him. There is a contract in the green room and a rack of staff lanyards by the door.',
      setsFlags: ['invited_to_studio'],
      cancelledByFlags: [],
      requiresFlags: ['you_are_trending'],
      movesCharacters: [
        { characterId: 'dante', toLocationId: 'studio_nine' },
        { characterId: 'vask', toLocationId: 'studio_nine' },
      ],
    },
    {
      id: 'we_licence_review',
      atWorldMinute: 1440 + 12 * 60,
      locationId: null,
      publicCopy:
        'A notice arrives from the Bureau: your licence is under review for an unlogged dark stream during a live call.',
      directorNotes:
        'Only for a player who switched the camera off on the roof and has not filed an honest report. Kit is furious and on their side. The review is real, and it can still be closed by a report that tells the truth, by the Bureau moving on the set pieces, or, ironically, by Tallyhouse’s lawyers.',
      setsFlags: ['licence_under_review'],
      cancelledByFlags: ['filed_it_straight'],
      requiresFlags: ['went_dark_on_the_roof'],
      movesCharacters: [],
    },
    {
      id: 'we_sloane_sends_a_page',
      atWorldMinute: 1440 + 21 * 60 + 30,
      locationId: null,
      publicCopy:
        'Your phone buzzes with a photograph from an unknown number: a single page, FRI 20:40 SPAN EAST, with a note in the margin circled twice.',
      directorNotes:
        'For a player who handed the case back. Sloane photographed the only page that mattered before the crane dropped. She sends it without a message, because she does not need to write one.',
      setsFlags: ['knows:the_bridge'],
      cancelledByFlags: ['case_open'],
      requiresFlags: ['case_handed_back'],
      movesCharacters: [],
    },
    {
      id: 'we_grey_jackets',
      atWorldMinute: 1440 + 22 * 60,
      locationId: 'the_stacks',
      publicCopy:
        'Tallyhouse security in grey jackets are walking the night market, showing people your photo on a tablet.',
      directorNotes:
        'Polite, persistent, unarmed and very well funded. They want the case or the player, and they will settle for knowing where the player sleeps. The market has opinions about grey jackets and most of them are not favourable.',
      setsFlags: ['tallyhouse_hunting_you'],
      cancelledByFlags: ['case_handed_back', 'signed_with_tallyhouse'],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
    {
      id: 'we_the_warrant',
      atWorldMinute: 2 * 1440 + 9 * 60,
      locationId: 'bureau_office',
      publicCopy:
        'Sergeant Mensah gets a warrant for Sloane Lyle’s associates, and your name is on page two.',
      directorNotes:
        'Only for a player who went underground with her. Mensah does not want to use it and will say so. It can be made to go away with evidence he can say out loud, or by Sloane being in custody.',
      setsFlags: ['warrant_has_your_name'],
      cancelledByFlags: ['bureau_is_moving', 'sloane_arrested'],
      requiresFlags: ['sloane_owes_you'],
      movesCharacters: [],
    },
    {
      id: 'we_licence_pulled',
      atWorldMinute: 2 * 1440 + 12 * 60,
      locationId: null,
      publicCopy:
        'The Bureau suspends your licence. Your camera keeps streaming for nine more seconds and then the Feed cuts you off mid-sentence.',
      directorNotes:
        'The review closes against the player. They can still save people; they just cannot do it legally, on camera, or for pay. Kit calls within a minute. This is not the end of the story and should not be written as one.',
      setsFlags: ['licence_pulled'],
      cancelledByFlags: ['filed_it_straight', 'bureau_is_moving', 'signed_with_tallyhouse'],
      requiresFlags: ['licence_under_review'],
      movesCharacters: [],
    },
    {
      id: 'we_top_ten_night',
      atWorldMinute: 2 * 1440 + 20 * 60,
      locationId: 'calder_span',
      publicCopy:
        'Top Ten Night begins on the Calder Span: three thousand people, ten heroes on ten stages, and every screen in the city tuned to the bridge.',
      directorNotes:
        'Fireworks, food stalls and a giant screen of the Ladder. Dante is the headline. Vask is in the production truck at the foot of the east tower. If the player has been invited, they are on stage four.',
      setsFlags: ['top_ten_night_started'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'dante', toLocationId: 'calder_span' },
        { characterId: 'vask', toLocationId: 'calder_span' },
      ],
    },
    {
      id: 'we_the_cable',
      atWorldMinute: 2 * 1440 + 20 * 60 + 40,
      locationId: 'calder_span',
      publicCopy:
        'At twenty to nine a cable on the east tower of the Span lets go, and a section of walkway full of people drops a metre and keeps tilting.',
      directorNotes:
        'The set piece, built cheap. It was meant to drop a metre and stop. It does not stop. Write it as a real emergency at real scale, 13+: people slide, grab rails and scream, and nobody dies on screen. Dante goes, scripted or not. What the player can do depends on their power and where they are.',
      setsFlags: ['the_cable_went'],
      cancelledByFlags: ['bridge_stopped', 'told_the_city', 'bureau_is_moving'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_morning_after',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'Saturday, nine o’clock. The Ladder recalculates, and your number comes up on every screen in the city.',
      directorNotes:
        'Whatever the player did this week has a number now. Let the chat react to it for exactly one beat, then let the player decide whether the number matters.',
      setsFlags: ['ladder_recalculated'],
      cancelledByFlags: [],
      requiresFlags: ['first_night_over'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_top_ten_night',
      kind: 'FINALE',
      label: 'Top Ten Night on the Span',
      seedHint: 'A laminated page zip-tied to a crane: 21:50, PIER TOWER, HERO: ROE. One page of something longer.',
      payoffHint: 'Three thousand people on a bridge at twenty to nine on Friday, and a cable rigged cheap.',
      weight: 1,
    },
    {
      id: 'p_the_case',
      kind: 'MYSTERY',
      label: 'What is in the humming case',
      seedHint: 'A steel case cuffed to her wrist starts to hum, and she will not say why.',
      payoffHint: 'A month of accidents, scheduled, each with a hero booked to save it.',
      weight: 0.9,
    },
    {
      id: 'p_owe_you_one',
      kind: 'RELATIONSHIP',
      label: 'What Sloane owes you, and what you owe her',
      seedHint: '"Put me down slowly and I’ll owe you one."',
      payoffHint: 'She pays in the one thing she has never given anybody: being seen, on purpose, beside you.',
      weight: 0.85,
    },
    {
      id: 'p_number_one',
      kind: 'RIVAL',
      label: 'The number one who arrived six minutes late',
      seedHint: 'He lands on the roof and looks at the crane before he looks at you.',
      payoffHint: 'On Friday he flies the script or flies for real, and either way he does it in front of you.',
      weight: 0.75,
    },
    {
      id: 'p_the_vote',
      kind: 'THEME',
      label: 'What forty thousand votes are worth',
      seedHint: 'Your rating falls the second her name appears in the chat.',
      payoffHint: 'A dial on the sixty-first floor that can move any rescue in the city by a star.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_heavy',
      name: 'Heavy Hands',
      role: 'Strength and defence',
      summary: 'Your power is strength. You can lift a van and take a fall that would break anybody else. On the stream it looks spectacular, and up close people expect you to hold things up.',
      playstyle: ['Strong', 'Hard to hurt', 'Blunt'],
      blurb: 'Three months licensed and you have already carried a piano, a horse and a city councillor, in that order, and the chat still calls you the forklift.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { rescue: 3, scrapping: 1, power: 1 },
      startingItems: [{ itemId: 'field_kit', qty: 1 }],
      startingAbilities: ['heavy_hands', 'go_dark'],
      startingReputation: [{ factionId: 'faction_viewers', amount: 5 }],
    },
    {
      id: 'arch_quick',
      name: 'Quickstep',
      role: 'Bursts of speed',
      summary: 'Your power is speed in short bursts: ten seconds faster than anybody can follow, then a minute catching your breath. You are first on every scene and the last one with a plan.',
      playstyle: ['Fast', 'Restless', 'First on scene'],
      blurb: 'You have beaten the ambulance to every call you have ever had, and twice you have had to wait for it with nothing to do but talk.',
      attributeBonus: { agility: 3, presence: 1 },
      skillProficiencies: { footwork: 3, scene_sense: 1, power: 1 },
      startingItems: [{ itemId: 'field_kit', qty: 1 }],
      startingAbilities: ['quickstep', 'go_dark'],
      startingReputation: [],
    },
    {
      id: 'arch_glass',
      name: 'Glass Wall',
      role: 'Hard-light barriers',
      summary: 'Your power is a sheet of hard light the size of a door that holds for as long as you concentrate. You do not hit things. You put something solid between people and whatever is coming.',
      playstyle: ['Protective', 'Careful', 'Builds cover'],
      blurb: 'You once held a wall over a burst water main for twenty minutes while a man finished his phone call, and you have never let anybody forget it.',
      attributeBonus: { arcana: 3, resolve: 1 },
      skillProficiencies: { power: 3, rescue: 1, candour: 1 },
      startingItems: [],
      startingAbilities: ['glass_wall', 'go_dark'],
      startingReputation: [{ factionId: 'faction_bureau', amount: 5 }],
    },
    {
      id: 'arch_unpowered',
      name: 'No Power, Good Gear',
      role: 'Gear and training, no power',
      summary: 'You have no power at all. You passed the licence on gear and training: a climbing line, hydraulic cutters and a pocket drone. The chat thinks that is either inspiring or hilarious.',
      playstyle: ['Gear', 'Clever', 'Underdog'],
      blurb: 'You are one of seventeen licensed heroes in the city with no power, and the only one who reads the equipment manuals for fun.',
      attributeBonus: { mind: 3, agility: 1 },
      skillProficiencies: { gear: 3, footwork: 1, scene_sense: 1 },
      startingItems: [{ itemId: 'grapple_line', qty: 1 }],
      startingAbilities: ['line_and_cutters', 'go_dark'],
      startingReputation: [{ factionId: 'faction_blind_spots', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your licence?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Jules Arden' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What is your power?',
      helpText:
        'The power on your licence, which sets what you are good at in a rescue. It is fixed for the whole story and cannot be changed later. It does not decide whether you hand her in, switch your camera off or take the number one’s offer. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the chat already know about you?',
      helpText: 'Three months of rookie streams. Most people write one plain sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I do every rescue in a borrowed motorbike helmet, and I once apologised to a cat on stream for four minutes.',
    },
    {
      id: 'why_licensed',
      label: 'Why did you get licensed?',
      helpText: 'A starting reason for you to play to. It is not a commitment, and nothing in the story holds you to it.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'pulled_out_once', label: 'Somebody pulled me out of something once' },
        { id: 'the_pay', label: 'The pay, honestly' },
        { id: 'to_be_watched', label: 'I wanted to be somebody people watch' },
        { id: 'to_prove_them_wrong', label: 'Everybody said I would not pass' },
        { id: 'still_working_it_out', label: 'I am still working that out' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do people see when you land?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A secondhand padded jacket, my licence number written on the back in marker, and a helmet with a dent in it.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Three of these are the city winning rather than the player — Signed Talent,
   * Top Ten Night and Unlicensed — and none of them is written as a punishment.
   * Top Ten Night is reachable by doing nothing at all, because the cable goes
   * at 20:40 unless somebody stopped it, and that is the honest shape of a
   * conspiracy nobody interrupted. Logged Off is walking away, and it is
   * reachable early.
   *
   * The Counting Floor ending is the only one that needs the optional lead.
   */
  endings: [
    {
      id: 'end_number_one',
      name: 'Number One',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['bridge_saved_live', 'climbed_it_honestly'],
        flagsUnset: ['signed_with_tallyhouse'],
        minFactionReputation: [{ factionId: 'faction_viewers', value: 45 }],
      },
      condition:
        'The player made a real save on the Span, on a stream nobody edited, and climbed the Ladder on calls nobody booked for them. They are number one on Saturday morning. Write the number and then write what it is like to be the person under it, because the job is the same job with more people watching.',
      epilogue:
        'The giant screen on the ferry terminal shows a rookie’s licence photo, the bad one, at the top of the list. Kit frames a printout and pretends she did not. Dante sends a message that just says: about time. The first call on Monday is a cat in a tree, and the chat gives it five stars.',
      hint: 'Nobody booked this one.',
    },
    {
      id: 'end_unedited',
      name: 'Unedited',
      rarity: 'UNCOMMON',
      minTurn: 32,
      requires: { flagsSet: ['told_the_city', 'ladder_recalculated'] },
      condition:
        'The player read the Run Sheet out on their own stream, live, and the city heard it before Tallyhouse could cut it. Friday’s set piece never happened because three thousand people knew it was coming. Write the fallout as noise: hearings, sponsors leaving, the Feed going down for a day. The player did one thing and the city did the rest.',
      epilogue:
        'Tallyhouse loses the city contract in seven weeks, which is about five weeks longer than anybody expected. The Ladder is rebuilt with an open vote. The clip of a rookie reading the Friday page aloud is the most watched thing on the Feed that year, and nobody ever edits it.',
      hint: '',
    },
    {
      id: 'end_signed_talent',
      name: 'Signed Talent',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['signed_with_tallyhouse'], flagsUnset: ['told_the_city', 'the_rating_is_out'] },
      condition:
        'The player signed with Tallyhouse. They are top hundred by the weekend, their calls are chosen for them, and next month their name will be on a run sheet. Do not write it as a fall from grace. It is a good life, the money is real, and the rescues are mostly safe. The player knows exactly what it costs.',
      epilogue:
        'The new flat has a view of the Span. The first booked rescue is a runaway tram with nobody on it, and the rating is 4.9. Dante teaches them where to stand so the light catches. Some nights the old scanner is still on by the bed, turned down low, and they listen to the calls nobody is booked for.',
      hint: '',
    },
    {
      id: 'end_two_blind_spots',
      name: 'Two Blind Spots',
      rarity: 'RARE',
      minTurn: 36,
      requires: { flagsSet: ['partners_with_sloane', 'ladder_recalculated'], flagsUnset: ['signed_with_tallyhouse'] },
      condition:
        'The player and Sloane end the week as partners, working the parts of the city no camera sees. They still save people. Nobody rates it. Write the work: the Underline, the rooftop line, a hand on her shoulder whenever something needs to be on the record, and the rest of the time nothing at all.',
      epilogue:
        'The Blind Spots get a second kettle. Requests come in through a burner phone and a noticeboard in a closed subway station. Once a month the two of them do one rescue on camera, with her hand on the player’s shoulder, so the city remembers they both exist.',
      hint: '',
    },
    {
      id: 'end_owed_you_one',
      name: 'I Owed You One',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['sloane_and_you', 'ladder_recalculated'],
        minRelationship: [{ characterId: 'sloane', dimension: 'affection', value: 75 }],
      },
      condition:
        'The romance, after Friday. One kiss, on the roof of Pier Tower, with the camera off, which is the only time in her life she has chosen not to be seen and meant it as a gift. Keep it tender and 13+. Do not resolve everything else. She is still wanted. They are still going to have to work that out.',
      epilogue:
        'The favour is never formally called in. She says she paid it on the roof, and the player says that does not count, and that argument goes on for about a year. Sergeant Mensah’s notebook has an entry about the two of them that he has never filed.',
      hint: 'Put me down slowly.',
    },
    {
      id: 'end_by_the_book',
      name: 'By the Book',
      rarity: 'UNCOMMON',
      minTurn: 26,
      requires: { flagsSet: ['sloane_arrested'] },
      condition:
        'The player arrested Sloane Lyle and kept their licence. Write it fairly in both directions: the law was on their side, the warrant was real, and she was a thief. She does not fight. Whether the case and the truth come out anyway depends on what else the player did, and the ending should say which.',
      epilogue:
        'Her trial is the first in the city’s history with no footage of the accused, except one minute from a rookie’s shoulder camera. Mensah testifies that every witness statement in her file uses the same three adjectives. The jury is out for nine days.',
      hint: '',
    },
    {
      id: 'end_top_ten_night',
      name: 'Top Ten Night',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['the_cable_went'], flagsUnset: ['bridge_saved_live'] },
      condition:
        'Nobody stopped it, and nobody caught it in time. The cable went at twenty to nine and the walkway did not stop where it was supposed to. Reachable by doing nothing, and must not be written as a punishment: it is what happens when a city that runs on cameras is not interrupted. People are hurt and nobody is killed, barely. Then the inquiry starts.',
      epilogue:
        'Thirty-four people are treated at the harbour hospital. The Feed runs Dante Roe catching the last of them for a week straight. An inquiry finds the rig was underbuilt and names a subcontractor nobody has heard of. On the Ladder, everybody who was on the bridge goes up.',
      hint: '',
    },
    {
      id: 'end_off_script',
      name: 'Off Script',
      rarity: 'UNCOMMON',
      minTurn: 34,
      requires: { flagsSet: ['dante_went_off_script'] },
      condition:
        'Dante saw the page, knew what it meant, and flew Friday for real, with the player beside him, knowing the rig was bad. It is the first unscheduled thing he has done in two years and he is not sure he is still good at it. He is. Write the save as two heroes improvising, and write him afterwards with the camera off.',
      epilogue:
        'He gives back the white coat on Monday, on the morning show, live, and Vask does not cut away because she cannot. He drops to number fifty-two and calls it the best week he has had in years. He still lands without a sound, and now he does it on calls nobody booked.',
      hint: '',
    },
    {
      id: 'end_unlicensed',
      name: 'Unlicensed',
      rarity: 'COMMON',
      minTurn: 28,
      requires: { flagsSet: ['licence_pulled'] },
      condition:
        'The Bureau pulled the player’s licence. They cannot use their power in public, on camera or for pay. They keep doing it anyway, in the places cameras do not reach. Write it as a door closing and a smaller one opening, not as a defeat.',
      epilogue:
        'The licence card goes in a drawer with the bad photo face up. The scanner stays on. Kit sends call details to a burner number she claims not to know, and Mensah, twice, does not see somebody he is looking straight at.',
      hint: '',
    },
    {
      id: 'end_logged_off',
      name: 'Logged Off',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked away from all of it: the case, the rating, the woman, the city. This is a coherent answer to being turned into a trending clip in thirty seconds and must not be written as a failure or redeemed later. Friday happens without them, one way or another.',
      epilogue:
        'The account goes quiet at 4,112 followers short of a million. For a year somebody posts the roof clip every Wednesday at 21:40. Somewhere in a smaller town, a person with a power and no camera pulls a stranger out of a canal and does not tell anybody.',
      hint: '',
    },
    {
      id: 'end_the_dial',
      name: 'The Dial',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['the_rating_is_out', 'counting_floor_done'] },
      condition:
        'The player stood on the sixty-first floor and put the dial on their own stream, and the chat watched a third of itself turn out to be the company. Every rating in the city is in question at once. Write the chat finding out in real time, then write the silence of forty thousand people typing nothing.',
      epilogue:
        'The Ladder is switched off for six weeks while somebody works out what it was. When it comes back the top ten is unrecognisable, and three of the new names are rookies nobody had heard of. The brass dial ends up in a museum, under glass, set to zero.',
      hint: 'Somebody on the sixty-first floor decides what you were worth.',
    },
    {
      id: 'end_seen',
      name: 'Seen',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['sloane_testified'] },
      condition:
        'Sloane let the city see her, on purpose, holding the player’s hand on a live stream, and told them about Harrow Street in her own words. It is the bravest thing anybody does in this story and it is quiet. Write her face on forty thousand screens for the first time and let the chat say nothing for a full line.',
      epilogue:
        'The wanted posters come down in a fortnight. The Bureau reopens Harrow Street with her as a witness instead of a suspect. She still cannot be filmed alone, and she has stopped minding, because she has somebody to hold on to when it matters.',
      hint: '',
    },
  ],
  opening:
    "Forty floors up, the crane snaps, and you catch her.\n\nYour shoulder camera is live. The rating climbs: 4.8.\n\nThen the chat explodes.\n\nTHAT’S SLOANE LYLE\n\nFIRST FOOTAGE OF HER EVER\n\nROOKIE CAUGHT THE CITY’S MOST WANTED WOMAN\n\nSloane smiles up at you from your arms. \"Hi, hero. Put me down slowly and I’ll owe you one.\"\n\nIn your earpiece, your handler snaps: \"Do not let go of her.\"\n\nThe rating ticks down. 4.1. 3.6.\n\nThe steel case cuffed to her wrist starts to hum.\n\n\"Sirens in thirty seconds,\" Sloane says. \"So, hero. Do I walk, or do you hand me in?\"",
  openingPanel: {
    assetKey: 'story_rescue_rating/opening',
    alt: 'Sloane in your arms, seen from your point of view, on a night rooftop forty floors up: silver-streaked hair, a steel case cuffed to her wrist, smiling up at you, the snapped crane behind.',
  },
  openingSuggestions: [
    '"I’ll think about it. What’s in the case?"',
    'I set her on her feet, but I keep hold of her wrist.',
    'I reach up and switch my camera off.',
  ],
  coverDirection: [
    'SUBJECT: Sloane Lyle, the city’s most wanted thief, alone and unmistakable in the foreground of a key visual for a superhero action-romance anime.',
    'She fills the frame from the waist up, centred and close, mid-fall against a night sky, one hand reaching toward the viewer as if about to be caught,',
    'the other arm trailing a brushed-steel courier case cuffed to her left wrist.',
    'Short black hair with one bleached silver streak lifting in the wind, dark grey eyes, a silver flight jacket with the sleeves pushed up, scraped knuckles.',
    'Her expression is a sharp, amused half-smile, looking straight at the viewer, not the least bit afraid of the drop.',
    'The courier case glows faintly red along its seams.',
    'HER FACE STAYS CLEAN: no marks, glitch lines, glow or overlays on her face or skin.',
    'Every glow effect stays on the courier case, the star column and the title, never on her face.',
    'BEHIND HER, soft and secondary: an unfinished skyscraper roof forty floors up, a construction crane with its arm snapped and hanging, harbour lights far below, police lights in the street.',
    'At the right edge, a translucent column of glowing five-point star icons, some falling: shapes only, no letters, no numbers, no usernames, nothing that reads as writing.',
    'LIGHT: cold blue night light from above, warm orange harbour light from below rimming her silhouette, so she is lit in blue and edged in orange.',
    'TITLE: the words RESCUE RATING painted into the art in the upper third as a bold condensed broadcast-style logo, white with a red glow,',
    'spelled exactly RESCUE RATING, large and legible at thumbnail size. A single thin red bar sits under the word RATING. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const RESCUE_RATING = StoryVersion.parse(raw);

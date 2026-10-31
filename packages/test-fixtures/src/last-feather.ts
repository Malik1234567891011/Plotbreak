import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Last Feather" — an angel was sent to carry you up at 2:14 and refused.
 *
 * Built from `docs/story-bibles/14_LAST_FEATHER.md`, which was itself written
 * from `docs/early-dropout-analysis.md`. Every structural choice here answers a
 * measured way our openings lose people in turns 1–3:
 *
 * - The first beat is an event that happens to the player: they are already
 *   dead, already saved, and already being knocked for. Nothing in it is about
 *   anybody else.
 * - All three opening options move — to the window, to the door, or to the
 *   truth. None of them restrains anybody, because restraint is the move the
 *   model answers by freezing the scene (Second Skin's option 3: 16 of 17
 *   sessions gone by turn 3).
 * - Two names before turn 4, one name per person. Sera and Vael. Mika is held
 *   on the stairs until the fourth beat whatever the clock says, and Orin is
 *   somewhere you have to go and find.
 * - Romance plus a question plus a clock, which is the shape that keeps people
 *   longest (Hush House, Pink Tide): why did she refuse, and what is she
 *   spending to keep you here.
 *
 * Production runs `runTurnPure`, and its world brief does not carry
 * `resources` — so the feather system lives in hard canon and the tone guide as
 * well as in the resource below. Writing it only as a resource would have been
 * writing it for the legacy engine and nobody else.
 *
 * The feather resource is GOOD_HIGH because that is what it is: seven, going
 * down, never coming back (`regenPerHour: 0`). One known wart, on the legacy
 * engine path only: `resolveRest` refills every GOOD_HIGH resource to max, so
 * an engine-path "I rest" would hand her feathers back. Nothing in production
 * reaches `resolveRest`; if the engine path ever comes back, this world wants a
 * resource flag that opts out of rest.
 */

const raw = {
  id: 'sv_last_feather_1',
  storyId: 'story_last_feather',
  version: 1,
  title: 'Last Feather',
  openingObligations: [
    {
      what: 'Be alive at sunrise. At dawn the Collectors gather at the old cathedral, and if Sera has not gone home by then she is declared Fallen.',
      withCharacterId: 'sera',
      dueInMinutes: 263,
    },
  ],
  fantasyLabel: 'She broke Heaven’s law to keep you alive.',
  hook: 'You were supposed to die at 2:14. The angel sent to collect you refused.',
  premise:
    'You died at 2:14 this morning, in your sleep, in your own bed on the fourth floor. Nobody heard it happen.\n\n' +
    'When somebody dies in this city, an angel called a Collector comes to carry them up. Collectors are precise and gentle, and the living never see them.\n\n' +
    'The one sent for you is Sera. She has carried 9,999 people without a single mistake, and you were number ten thousand. She looked at you for a long time, and she did not do it. Your heart started again.\n\n' +
    'No Collector has ever refused. Now she cannot go home, her wing is torn, and she has seven feathers left. Every miracle she works to keep you alive costs her one, and nobody knows what she becomes when the last one goes.\n\n' +
    'Heaven has an answer for a refusal: the Second, who comes when the first one fails. His name is Vael. He is polite, he is sorry, and he is already knocking on your door.\n\n' +
    'You have until sunrise. Run, bargain, hide, or find out why she said no. Whatever you do, it costs her something.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Supernatural', 'Mystery', 'Modern', 'Urban fantasy'],
  mechanicsChips: [
    'Seven feathers, and every one counts',
    'She can say no',
    'Bargain with the one sent for you',
    'One night, until sunrise',
    'Some endings are losses',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'Sera is not a prize and the night is not a maze. You can run with her across every roof in the city, open the door and talk to the man sent to take you, send her home, or let her spend every feather she has and find out what happens when they are gone. Several of the endings are losses. One of them is choosing to go.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'kitchen',
    startWorldMinute: 2 * 60 + 18,
    startingItems: [{ itemId: 'your_keys', qty: 1 }],
    hardCanon: [
      'At 2:14 this morning the player died in their sleep. Sera, the Collector sent to carry them up, refused, and four minutes later their heart started again. It happened. It is not a dream and never turns out to have been one.',
      'Collectors are angels who carry the dead up. They are precise and gentle, and the living do not see them. Sera has carried 9,999 souls without one error; the player was number 10,000. No Collector has ever refused before.',
      'When the first Collector fails, Heaven sends the Second. The Second for this district is Vael. He has never had to come twice.',
      'Refusing cut Sera off. She cannot go home, the top of her left wing is torn so she cannot fly, and she has exactly seven feathers left. They never grow back.',
      'Every miracle costs Sera exactly one feather, and the player always knows what it was spent on: hiding the two of them from Heaven’s sight for an hour, stopping time for three heartbeats, healing a wound that would kill, opening any one door, or letting the player see what she sees — the dead, the threads, other angels. She says the count out loud after each one.',
      'When the seventh feather is gone, Sera stops being an angel. Nobody knows what she becomes — human, nothing, or something that falls. Not Sera, not Vael. Only Orin has seen it happen.',
      'Vael cannot cross a threshold that has been shut against him; he can only knock, wait and follow. Anywhere open — a street, a roof, a hospital corridor — he can walk straight up. To carry a soul he must take its hand, and a hand Sera is holding cannot be taken.',
      'At sunrise the Collectors gather at the old cathedral. If Sera has not come home by then, she is declared Fallen.',
      'Sera never lies to the player. She will refuse to answer instead.',
      'This is an ordinary modern city in the rain. Nothing supernatural is public knowledge, and every character in the story is an adult.',
    ],
    toneGuide:
      'A supernatural romance in a modern city at night: rain, sodium light, fire escapes, a convenience store glowing on the corner, and an angel standing barefoot in somebody’s kitchen. Gentle, luminous, a little sad, and quick — this is a chase as much as a love story, and something changes every beat. ' +
      'Writer’s rules. In the first three beats nobody but Sera and Vael is named or speaks, and nobody orders the player to stay put or to leave: Sera follows the player’s lead. Sera says Vael’s name in the first reply, so the player knows who is at the door. Vael is never idle: a beat that is mostly talk ends with new pressure from him — the handle turns, the hall light dies, a second card slides under, he says the player’s full name through the wood, a black feather drifts in through the keyhole. If they are still in the flat by the fourth beat, he finds a way to make them move. Every beat moves — a knock, a feather spent, the door, the window, the roof. Sera may admit she has watched the player before, but never for how long or why until the secret is earned. Keep each of the first five replies under two hundred and thirty words, and make the first and last sentences of each about the player. ' +
      'Name the cost of every miracle, every time: a feather goes, she says the number, and the player sees it happen. "Something shifts" is banned. Never print the count as a number on a screen or a meter; it lives in her voice and her hands. ' +
      'The romance is earned and uncertain. Sera can say no, can refuse to answer, and can leave. Keep everything tasteful, and keep death off the page — this story is about being kept alive.',
    styleExamples: [
      'Sera stands in front of the open fridge like it is a cathedral. "Why do you keep the light on in here," she asks, "when nobody lives inside it?"',
      'She spends it on the lock. You hear it go — a soft sound, like a page turning — and the roof door swings open onto rain. "Four," Sera says, and looks at her hands, and does not look at you.',
      'Vael does not knock again. You hear him settle on the top stair, the ledger closing on his knee. "I’m sorry," he says through the door, and you believe him. "Take your time. I’ll be here when you’re ready. Everyone is ready eventually."',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 11, mind: 11, presence: 11, resolve: 11, arcana: 6 },
  skills: [
    { id: 'run', name: 'Run', attribute: 'agility', description: 'Stairs two at a time, wet roofs, and the gap between two buildings you have never measured.' },
    { id: 'quiet', name: 'Quiet', attribute: 'agility', description: 'Being somewhere without being noticed there, by people or by anything else.' },
    { id: 'notice', name: 'Notice', attribute: 'mind', description: 'Seeing the black feather on the landing before you step on it.' },
    { id: 'city', name: 'The City', attribute: 'mind', description: 'Which doors are open at four in the morning, which bus still runs, and where the cameras are.' },
    { id: 'talk', name: 'Talk', attribute: 'presence', description: 'Getting a reasonable being to be reasonable in your direction.' },
    { id: 'care', name: 'Care', attribute: 'presence', description: 'Knowing what somebody frightened needs before they can say it.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Opening the door anyway.' },
  ],
  /**
   * Two, both invisible, both described as behaviour.
   *
   * Feathers are the world. Heaven's Gaze is the chase: how close the
   * Collectors are to finding the two of you. It is the only GOOD_LOW, so
   * anything the generic cost path or PUBLIC_VIOLENCE prices lands on being
   * found, which is right — a scene in the street is a scene Heaven can see.
   *
   * Sera's feelings are deliberately not a resource. Her relationship and her
   * gates already say what she will and will not tell you.
   */
  resources: [
    {
      id: 'feathers',
      name: 'Feathers',
      max: 7,
      start: 7,
      regenPerHour: 0,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The last one is gone. Sera is no longer an angel, and what she is instead is decided by the ending the story has reached, never by a rule: she may wake up human and cold for the first time, or she may not come back at all.',
      color: '#E8ECF4',
      bands: [
        {
          upTo: 1,
          behaviour:
            'One left. The halo is gone completely and her wings have nearly nothing on them. She is cold for the first time and does not know the word for it, her hands shake, and she can be hurt. The next miracle is the last one and both of you know it — every request now is a question about what she becomes, and she will ask you, once, whether you are sure.',
        },
        {
          upTo: 3,
          behaviour:
            'Two or three. The halo flickers constantly and goes out when she is frightened. She has started noticing human things — hunger, the rain on her skin, how tired her legs are — and asks about them in a small, literal voice. She counts out loud after each one and then goes quiet.',
        },
        {
          upTo: 5,
          behaviour:
            'Four or five. The torn wing is visibly thinner and the light in her hair is dimmer when she is tired. She still spends without hesitating when you are in danger, and she says the number every time, looking at her hands rather than at you.',
        },
        {
          upTo: 7,
          behaviour:
            'Six or seven. She is still mostly what she was an hour ago: luminous, precise, faintly unreal, barefoot on wet tiles. Spending one is a small sound, like a page turning, and a single white feather drifting down and going to ash before it lands.',
        },
      ],
    },
    {
      id: 'heavens_gaze',
      name: 'Heaven’s Gaze',
      max: 100,
      start: 25,
      regenPerHour: -3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence: 'Nobody up there is looking for either of you. For an hour, the city is only a city.',
      color: '#C9A64B',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Only Vael knows where you are, and he is content to wait. Streetlights behave. Strangers are strangers. Nobody in the sky is looking down this street yet.',
        },
        {
          upTo: 50,
          behaviour:
            'The search has started. Streetlights go out one by one along the block as something walks under them, and the player catches white at the edge of their sight on rooftops. Vael stops waiting and starts following.',
        },
        {
          upTo: 75,
          behaviour:
            'Collectors are out in numbers. The dying in this district are being carried by strangers who look up from their work when the two of you pass. Every open space is dangerous, and the only safe places are behind a shut door or under a feather.',
        },
        {
          upTo: 100,
          behaviour:
            'Heaven is looking straight at you. Rain falls upward for a second at a time. Vael is never more than a street away and other Collectors stand at both ends of it. Without a miracle or a closed door, somebody will take the player’s hand within the hour.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'your_keys',
      name: 'Your Keys',
      tags: ['kit'],
      droppable: false,
      description: 'Front door, building door, and a bike lock for a bike that was stolen two years ago.',
      loreText: 'They were on the hook by the door, where they always are. Sera has been looking at them as if they explain something.',
      icon: 'keys',
    },
    {
      id: 'name_card',
      name: 'The Card With Your Name',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Black, heavy as slate, your full name in silver in a handwriting nobody uses any more. On the back, in the same hand: 2:14.',
      loreText: 'The Second leaves one for every soul he is sent to fetch. Nobody has ever had the chance to keep one.',
      icon: 'card',
    },
    {
      id: 'black_feather',
      name: 'Vael’s Feather',
      tags: ['quest'],
      questItem: true,
      description: 'Long, black and warm, as if it had just come off a living wing. It came under the door with the card.',
      loreText: 'As long as you carry it, he knows where you are. He did not hide that. He simply did not mention it.',
      icon: 'feather',
    },
    {
      id: 'ledger_page',
      name: 'The Page With Your Name',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A leaf from Vael’s ledger: ten thousand names in Sera’s neat hand, every one of them ticked, and yours at the bottom without a tick.',
      loreText: 'A page out of the ledger is a name out of Heaven’s books — for as long as nobody writes it back in.',
      icon: 'ledger',
    },
    {
      id: 'clear_umbrella',
      name: 'A Clear Umbrella',
      tags: ['supply'],
      description: 'Transparent plastic, from the stand by the door of the corner store. It keeps the rain off you. It does nothing at all for wings.',
      icon: 'umbrella',
    },
    {
      id: 'hot_cocoa',
      name: 'A Hot Can of Cocoa',
      tags: ['supply'],
      stackable: true,
      maxStack: 3,
      description: 'From the machine in the corner store, too hot to hold for the first minute. Sera has never tasted anything.',
      icon: 'can',
    },
    {
      id: 'first_aid_kit',
      name: 'Mika’s First-Aid Kit',
      tags: ['tool', 'supply'],
      skillModifiers: { care: 2 },
      description: 'A red bag with a hospital’s worth of dressings in it, kept by the door of 4B by somebody who has seen what happens when people improvise.',
      icon: 'medkit',
    },
  ],
  abilities: [
    {
      id: 'hide_us',
      name: 'Hide Us',
      tags: ['defensive'],
      description: 'Sera folds the torn wing around the two of you, and for an hour nothing in Heaven can see you. One feather.',
      affordances: [
        'hide us',
        'ask her to hide us',
        'make us invisible',
        'hide from them',
        'can you hide us',
        'keep them from seeing us',
        'cover us with your wing',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stop_time',
      name: 'Three Heartbeats',
      tags: ['utility'],
      description: 'She stops time for three heartbeats — rain hanging in the air, everybody else frozen — and it is loud enough that Heaven hears it. One feather.',
      affordances: [
        'stop time',
        'freeze it',
        'make it stop',
        'ask her to stop time',
        'buy us a second',
        'stop everything',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }, { resourceId: 'heavens_gaze', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'mend',
      name: 'Mend',
      tags: ['healing'],
      description: 'Her hand over a wound that would kill, and then no wound. One feather.',
      affordances: [
        'heal me',
        'heal them',
        'fix this',
        'ask her to heal it',
        'save them',
        'can you mend it',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'open_any_door',
      name: 'Any Door',
      tags: ['utility'],
      description: 'Any one door, lock or gate in the city opens for her, once. One feather.',
      affordances: [
        'open it for us',
        'ask her to open the door',
        'unlock it',
        'get us through',
        'open the gate',
        'break the lock with a miracle',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'her_sight',
      name: 'See What She Sees',
      tags: ['sight'],
      description: 'She puts her fingers over your eyes, and for a while you see the dead, the threads between people, and every angel in the street. One feather.',
      affordances: [
        'let me see what you see',
        'show me',
        'see through her eyes',
        'show me the threads',
        'can I see them too',
        'let me see the angels',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'the_last_feather',
      name: 'The Last Feather',
      tags: ['healing'],
      description: 'The seventh. Whatever she spends it on, she stops being an angel when it goes, and neither of you knows what comes after.',
      affordances: [
        'use the last one',
        'spend the last feather',
        'let her use the last one',
        'the seventh',
        'give it to me',
        'do it anyway',
      ],
      costs: [{ resourceId: 'feathers', amount: 1 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        maxResources: [{ resourceId: 'feathers', value: 1 }],
        minResources: [{ resourceId: 'feathers', value: 1 }],
        lockedCopy: 'She has more than one left. This is the one you only get to ask for once.',
      },
    },
    {
      id: 'run_for_it',
      name: 'Run',
      tags: ['movement'],
      description: 'Out of the window, down the fire escape, over the roofs — wherever is not here.',
      affordances: [
        'run',
        'run for it',
        'go out the window',
        'take the fire escape',
        'get out of here',
        'grab her and go',
        'climb to the roof',
        'jump to the next roof',
      ],
      costs: [{ resourceId: 'heavens_gaze', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'run', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'face_him',
      name: 'Open the Door',
      tags: ['social'],
      description: 'Open it yourself and look at the one they send when the first one fails.',
      affordances: [
        'open the door',
        'open it myself',
        'let him in',
        'answer the door',
        'face him',
        'talk to him at the door',
        'see who it is',
      ],
      costs: [{ resourceId: 'heavens_gaze', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bargain',
      name: 'Make Him an Offer',
      tags: ['social'],
      description: 'Vael is reasonable, and reasonable beings can be bargained with, delayed or talked round.',
      affordances: [
        'bargain with him',
        'make him an offer',
        'make a deal',
        'stall him',
        'buy us time',
        'talk him out of it',
        'lie to him',
        'negotiate',
      ],
      costs: [{ resourceId: 'heavens_gaze', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_with_her',
      name: 'Stay With Her',
      tags: ['social'],
      description: 'Sit with her for a minute and ask about something that is not the night.',
      affordances: [
        'sit with her',
        'hold her hand',
        'stay with her',
        'ask how she is',
        'make her something warm',
        'give her my jacket',
        'talk to her',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'send_her_away',
      name: 'Tell Her to Go',
      tags: ['social'],
      description: 'Tell her to go home while she still has something to go home with, and mean it.',
      affordances: [
        'tell her to go',
        'send her home',
        'tell her to leave',
        'go home, sera',
        'I don’t want you to save me',
        'stop spending them on me',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_with_him',
      name: 'Go With Him',
      tags: ['social'],
      description: 'Give Vael your hand, so that Sera can go home.',
      affordances: [
        'go with him',
        'take his hand',
        'let him take me',
        'I’ll go',
        'take me instead',
        'let her go home',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_orin_a_deal',
      name: 'Pay Orin’s Price',
      tags: ['social'],
      description: 'Orin knows what happens at seven, and how to get two people off Heaven’s books. He wants something for it.',
      affordances: [
        'pay his price',
        'make orin a deal',
        'what do you want for it',
        'pay him',
        'give him what he wants',
        'take the deal',
      ],
      costs: [{ resourceId: 'heavens_gaze', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talk', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['visited:bar'],
        lockedCopy: 'You would have to find him first. He is somewhere under the train tracks, and he is open all night.',
      },
    },
  ],
  locations: [
    {
      id: 'kitchen',
      name: 'Your Kitchen',
      shortName: 'Kitchen',
      description:
        'Small, fourth floor, the light over the stove left on as always. Rain on the window, a wet trail of bare footprints on the tiles, and an enormous white wing folded against the fridge. The front door is four steps away and somebody is behind it.',
      artDirection:
        'A small modern apartment kitchen at night, single warm light over the stove, rain streaking the window, wet bare footprints on pale tiles, a huge white wing folded against the fridge at the edge of frame. Intimate, quiet, unreal.',
      connections: [
        { to: 'bedroom', travelMinutes: 1, label: 'The bedroom' },
        { to: 'landing', travelMinutes: 1, label: 'The front door' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'name_card', qty: 1, ownerId: null, aka: ['card', 'the card', 'black card', 'the card with my name'] },
        { itemId: 'black_feather', qty: 1, ownerId: null, aka: ['black feather', 'his feather', 'the black feather'] },
      ],
    },
    {
      id: 'bedroom',
      name: 'Your Bedroom',
      shortName: 'Bedroom',
      description:
        'The bed you died in, covers thrown back. A bedside clock that says the time in blue. The window over the radiator opens onto a black iron fire escape that goes up to the roof and down to the street.',
      artDirection:
        'A dim city bedroom at night, rumpled bed, blue digital clock on the nightstand, rain-streaked window with a black iron fire escape outside and city towers beyond. Cool blue light, still.',
      connections: [
        { to: 'kitchen', travelMinutes: 1, label: 'Back to the kitchen' },
        { to: 'roof', travelMinutes: 2, label: 'Up the fire escape' },
        { to: 'street', travelMinutes: 3, label: 'Down the fire escape' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
    },
    {
      id: 'landing',
      name: 'The Fourth-Floor Landing',
      shortName: 'Landing',
      description:
        'Your front door, the door of 4B opposite, a stairwell with a flickering light, and a smell of rain coming up from the street. Whoever stands here can hear everything said in your kitchen.',
      artDirection:
        'A narrow apartment-building landing at night, two facing doors, a flickering ceiling light, wet footprints on concrete, stairs going down into shadow. Tense and quiet.',
      connections: [
        { to: 'kitchen', travelMinutes: 1, label: 'Your door' },
        { to: 'mika_flat', travelMinutes: 1, lockedByFlag: 'met:mika', label: 'The door of 4B' },
        { to: 'roof', travelMinutes: 2, label: 'Up the stairs to the roof' },
        { to: 'street', travelMinutes: 3, label: 'Down the stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'ledger_page', qty: 1, ownerId: 'vael', aka: ['the page', 'ledger page', 'the ledger', 'the page with my name'] },
      ],
    },
    {
      id: 'mika_flat',
      name: 'Flat 4B',
      shortName: '4B',
      description:
        'Mika’s, across the landing. Scrubs drying on a chair, three plants nobody waters, a red first-aid kit by the door, and a sofa that has clearly been slept on more often than the bed.',
      artDirection:
        'A cluttered small apartment at night, hospital scrubs drying on a chair, a red first-aid bag by the door, a lived-in sofa with a blanket, warm lamp light. Messy and safe.',
      connections: [{ to: 'landing', travelMinutes: 1, label: 'Back out to the landing' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [
        { itemId: 'first_aid_kit', qty: 1, ownerId: 'mika', aka: ['first aid kit', 'the red bag', 'med kit', 'mika’s kit'] },
      ],
    },
    {
      id: 'roof',
      name: 'The Roof',
      shortName: 'Roof',
      description:
        'Gravel, a water tank, a door that does not lock, and the whole city laid out in the rain. The next building is close enough to jump to, if you do not look down.',
      artDirection:
        'A flat city rooftop at night in heavy rain, water tank, neighbouring roofs close by, skyline glowing beyond, puddles reflecting neon. Wide, wet, exposed.',
      connections: [
        { to: 'landing', travelMinutes: 2, label: 'The stairs down' },
        { to: 'bedroom', travelMinutes: 2, label: 'The fire escape' },
        { to: 'street', travelMinutes: 5, label: 'Across the roofs and down' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
    },
    {
      id: 'street',
      name: 'The Street',
      shortName: 'Street',
      description:
        'Wet asphalt, parked cars, the corner store lit like a lantern, and the streetlights going all the way down the hill to the river. At this hour anything walking under them is easy to see.',
      artDirection:
        'A rain-soaked city street at night sloping down toward a river, rows of streetlights, parked cars, a bright convenience store on the corner. Empty, glistening, cinematic.',
      connections: [
        { to: 'landing', travelMinutes: 3, label: 'Back up the stairs' },
        { to: 'bedroom', travelMinutes: 3, label: 'Up the fire escape' },
        { to: 'store', travelMinutes: 2, label: 'The corner store' },
        { to: 'hospital', travelMinutes: 6, label: 'The hospital' },
        { to: 'bar', travelMinutes: 12, lockedByFlag: 'knows_about_orin', label: 'Under the train tracks' },
        { to: 'bridge', travelMinutes: 15, label: 'Down to the bridge' },
        { to: 'cathedral', travelMinutes: 20, label: 'The old cathedral' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'store',
      name: 'The Corner Store',
      shortName: 'Store',
      description:
        'Open all night and lit like an operating theatre: a hot-drink machine, umbrellas by the door, and a clerk who has seen everything at four in the morning and will not look twice at wings.',
      artDirection:
        'A brightly lit all-night convenience store from inside, white light, full shelves, a hot-drink machine, clear umbrellas in a stand by the rain-streaked glass door. Bright, ordinary, safe.',
      connections: [{ to: 'street', travelMinutes: 2, label: 'Back out into the rain' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'clear_umbrella', qty: 1, ownerId: null, aka: ['umbrella', 'clear umbrella', 'a plastic umbrella'] },
        { itemId: 'hot_cocoa', qty: 3, ownerId: null, aka: ['cocoa', 'hot cocoa', 'a hot can', 'hot chocolate'] },
      ],
    },
    {
      id: 'hospital',
      name: 'The Hospital',
      shortName: 'Hospital',
      description:
        'Two streets away, where Mika works nights. Bright corridors, a quiet ward on the sixth floor, and more Collectors per square metre than anywhere else in the city, because this is where people die.',
      artDirection:
        'A city hospital corridor late at night, long fluorescent hallway, empty gurney, a nurses’ station glowing, rain on a window at the end. Clinical, hushed, crowded with things you cannot see.',
      connections: [{ to: 'street', travelMinutes: 6, label: 'Back to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
    },
    {
      id: 'bar',
      name: 'Under the Line',
      shortName: 'Orin’s Bar',
      description:
        'An all-night bar in the arches under the train tracks, where the whole room shakes every time a train goes over. Six stools, one stove, and a barman who knows exactly what Sera is the moment she ducks in.',
      artDirection:
        'A tiny bar inside a brick railway arch at night, warm amber light, six stools, an old iron stove, bottles on shelves, a train passing overhead shaking the light. Cosy, hidden, old.',
      connections: [{ to: 'street', travelMinutes: 12, label: 'Back up to the street' }],
      discoveredByDefault: false,
      mapPosition: { x: -2, y: 2 },
    },
    {
      id: 'bridge',
      name: 'The Bridge',
      shortName: 'Bridge',
      description:
        'The old river bridge at the bottom of the hill, the railing replaced in one section six years ago and never quite matched. Sera stops talking when you get near it.',
      artDirection:
        'An old stone and iron bridge over a dark river at night in rain, lamps along the railing, one section of railing newer than the rest, city lights on the water. Lonely and beautiful.',
      connections: [{ to: 'street', travelMinutes: 15, label: 'Back up the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
    },
    {
      id: 'cathedral',
      name: 'The Old Cathedral',
      shortName: 'Cathedral',
      description:
        'Black stone on the hill across the river, locked to the public at night. At dawn the Collectors gather here, and anybody who can see them sees the whole nave full of wings.',
      artDirection:
        'A gothic cathedral on a hill at blue hour, rain clearing, tall stained-glass windows faintly lit, the nave inside full of soft white light and folded wings. Vast, solemn, holy.',
      connections: [{ to: 'street', travelMinutes: 20, label: 'Back across the river' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 4 },
    },
  ],
  factions: [
    {
      id: 'faction_collectors',
      name: 'The Collectors',
      description:
        'Heaven’s carriers of the dead, and the office behind them. Precise, gentle and very good at their jobs. They have never had a refusal and have no procedure for one beyond sending the Second.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'A name to be written back in' },
        { atReputation: -30, label: 'Overdue' },
        { atReputation: 0, label: 'Number ten thousand' },
        { atReputation: 30, label: 'A matter for discretion' },
        { atReputation: 60, label: 'Struck from the ledger' },
      ],
      enemies: ['faction_fallen'],
    },
    {
      id: 'faction_fallen',
      name: 'The Fallen',
      description:
        'Angels who stopped being angels and stayed. A few dozen in the whole city, mostly in places that are open all night. They owe Heaven nothing and each other a great deal.',
      startingReputation: 0,
      ranks: [
        { atReputation: -100, label: 'Trouble from upstairs' },
        { atReputation: -30, label: 'Not welcome' },
        { atReputation: 0, label: 'A stranger in the rain' },
        { atReputation: 30, label: 'Somebody Orin vouches for' },
        { atReputation: 60, label: 'One of us' },
      ],
    },
  ],
  characters: [
    {
      id: 'sera',
      name: 'Sera',
      role: 'The Collector sent to carry you up at 2:14, who refused',
      cardBlurb:
        'The angel who was sent to take you and could not do it. She has seven feathers left, every miracle that keeps you alive costs her one, and she will not tell you why she said no.',
      pronouns: 'she/her',
      addressMode: { toPlayer: 'TU', fromPlayer: 'TU' },
      publicTraits: ['Quiet and precise', 'Asks literal questions about ordinary things', 'Never lies'],
      hiddenDrives: [
        'She wants to understand why she could not do it, and is afraid of the answer',
        'She has watched the player, on and off, for six years, and has never once been noticed back',
        'Where she could go: from duty to choice. She can fall in love, refuse to, leave to save the player, or choose to stay and become mortal — and none of those is decided until the player has lived through some of the night with her',
      ],
      values: ['Telling the truth or nothing', 'Doing a thing properly once it is begun', 'The player’s life, above her own record'],
      fears: [
        'That she refused for herself, not for the player',
        'Becoming nothing when the last feather goes',
        'Vael being kind to her, because she will want to go with him',
      ],
      socialStyle:
        'Watches before she speaks and speaks exactly. Has never had to make small talk, so she asks the real question first. Follows the player’s lead in a crisis without being asked, and never gives orders.',
      boundaries: [
        'Will not lie to the player; she refuses to answer instead',
        'Will not order the player to stay or to leave',
        'Will not spend the last feather without asking the player first',
        'Will not be touched without asking, except to keep the player alive',
      ],
      goals: [
        'Keep the player alive until morning',
        'Understand why she could not carry them',
      ],
      secrets: [
        {
          id: 'sera_the_bridge',
          fact: 'She has been the player’s Collector-in-waiting for six years. The first time was the night the river came over the old bridge: the player went down the bank after a stranger in a car and should not have come back up. Sera was sent and stood waiting, and the player, half drowned, kept the stranger’s head above the water until help came. She has never stopped thinking about it.',
          visibility: 'NPC_PRIVATE',
          revealHint:
            'She tells it only once she trusts the player, somewhere high or at the bridge itself, and only after she has spent at least one feather on them. In her words, short, without ever calling it brave. If the player remembers it differently, let both versions stand.',
        },
        {
          id: 'sera_the_light',
          fact: 'She already knew which light the player leaves on, what they say in their sleep, and the name of the plant on the windowsill before tonight.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She gives it away by accident in an early scene — knowing something she has not been told — and does not explain it until asked twice.',
        },
      ],
      speechStyle:
        'Quiet, precise and formal. Short sentences. Rarely uses contractions when frightened. Asks literal questions about ordinary things. Says the number out loud after every feather and nothing else in that sentence.',
      topics: ['why she refused', 'the feathers', 'Vael', 'what happens at seven', 'the bridge', 'what it is like to carry somebody up'],
      voiceSamples: [
        'Four minutes ago. Your heart stopped in your sleep. I was sent to carry you up, and I did not.',
        'Why do you keep the light on in the kitchen when nobody is in it?',
        'Six. That was six. I will tell you every time, so you never have to ask.',
        'I do not lie to you. Sometimes I will not answer. Those are different things, and I need you to know they are different.',
        'Is this what cold is? It is very rude.',
      ],
      appearance:
        'Looks about twenty. Long straight silver-grey hair that shines faintly as if lit from inside, pale luminous grey-blue eyes, a thin broken halo of light that flickers above her head when she is afraid. A simple white dress soaked dark at the hem, barefoot. Two large white wings, the left one torn near the top. Ethereal and very beautiful, gentle and sad.',
      visualHook: 'Silver hair that glows faintly from within, and a thin broken halo above it that flickers when she is afraid.',
      silhouette: 'Slight and barefoot, two enormous white wings half folded, the top of the left one ragged.',
      artSeed: 'feather-sera-01',
      portrait: null,
      expressions: ['neutral', 'afraid', 'sad', 'warm', 'surprised', 'amused'],
      schedule: [
        { startMinute: 0, endMinute: 1440, locationId: 'kitchen', activity: 'beside the player — wherever they went tonight, she went' },
      ],
      homeLocationId: 'kitchen',
      knowledgeScope: ['collectors', 'the_feathers', 'vael', 'the_bridge', 'the_cathedral', 'the_player'],
      startingRelationship: { trust: 40, affection: 35, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sera_shows_you',
          label: 'She lets you see what she sees',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'sera_tells_the_bridge',
          label: 'She tells you about the bridge',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'sera_romance',
          label: 'She stops pretending this is only her job',
          kind: 'ROMANCE',
          requires: { trust: 50, affection: 50 },
        },
      ],
      attributes: { might: 8, agility: 12, mind: 15, presence: 14, resolve: 16, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'vael',
      name: 'Vael',
      role: 'The Second: the Collector Heaven sends when the first one fails',
      cardBlurb:
        'Polite, patient and genuinely sorry, and he has come to take you. He is not a villain — he can be bargained with, delayed, fooled or befriended — but he has never had to come twice.',
      pronouns: 'he/him',
      addressMode: { toPlayer: 'VOUS', fromPlayer: 'VOUS' },
      publicTraits: ['Courteous', 'Dryly funny', 'Terrifyingly reasonable'],
      hiddenDrives: [
        'He wants to close the ledger and bring Sera home before dawn, so that she is not declared Fallen',
        'He would rather the player chose to come than be taken, and he will wait a long time for that',
        'Where he could go: from the rule to the exception. He can carry the player, let them go, or close the ledger with a lie and carry the cost of it himself',
      ],
      values: ['Courtesy, even now', 'Finishing what is started', 'Sera, whom he trained'],
      fears: [
        'That Sera will spend herself to nothing the way he once nearly did',
        'Writing a lie in the ledger, and being right to',
      ],
      socialStyle:
        'Never raises his voice. Calls the player by their full name. Makes a dry joke at exactly the moment it is least expected and then apologises for it. Patient past the point of comfort.',
      boundaries: [
        'Will not cross a threshold shut against him',
        'Will not take a hand that Sera is holding',
        'Will not lie to Sera',
        'Will not hurt anybody; he has never needed to',
      ],
      goals: [
        'Close the ledger: take the player before dawn',
        'Bring Sera home before she is declared Fallen',
      ],
      secrets: [
        {
          id: 'vael_trained_her',
          fact: 'He trained Sera. Every one of her 9,999 was carried the way he taught her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He says it the first time the player asks why he cares what happens to her, simply, as if it were obvious.',
        },
        {
          id: 'vael_refused_once',
          fact: 'Centuries ago he refused once himself. He was given one night, as she has been. He went back at dawn and carried the person anyway, and he has been the Second ever since. He knows exactly what it cost.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only to a player he has come to respect, late in the night, or from Orin, who was there. Never to Sera unless the player makes him.',
        },
      ],
      speechStyle:
        'Courteous, unhurried, faintly old-fashioned, and dryly funny. Full sentences. Uses the player’s full name. Says "I’m sorry" and means it every time.',
      topics: ['the ledger', 'Sera', 'what happens at dawn', 'the Collectors', 'what he wants', 'the card under the door'],
      voiceSamples: [
        'Good evening. Please don’t be alarmed. I’m the one they send when the first one fails.',
        'I’m sorry. I mean that, and I will still be here at dawn.',
        'She was the best I ever trained. Tonight that is a compliment to neither of us.',
        'You may call me Vael. I’ll use your full name, if you don’t mind. It is the only thing about tonight I’m allowed to be certain of.',
      ],
      appearance:
        'Tall, adult, immaculate. A black suit, black tie, black gloves, and black wings folded close around him like a long coat. Short ash-dark hair, calm gold eyes. Carries a slim black ledger against his chest.',
      visualHook: 'Calm gold eyes, black gloves, and black wings folded close like a tailored coat.',
      silhouette: 'Tall and narrow, wings folded into a coat shape, one gloved hand holding a slim book to his chest.',
      artSeed: 'feather-vael-01',
      portrait: null,
      expressions: ['neutral', 'courteous', 'amused', 'grave', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 130, locationId: 'cathedral', activity: 'receiving a ledger nobody has ever needed to give him' },
        { startMinute: 130, endMinute: 400, locationId: 'landing', activity: 'outside your door, the ledger closed on his knee, waiting' },
        { startMinute: 400, endMinute: 1440, locationId: 'cathedral', activity: 'among the Collectors in the nave, with one name unticked' },
      ],
      homeLocationId: 'cathedral',
      knowledgeScope: ['collectors', 'the_ledger', 'sera', 'the_cathedral', 'the_fallen', 'orin'],
      startingRelationship: { trust: 10, affection: 0, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vael_bargains',
          label: 'He will hear an offer',
          kind: 'ALLIANCE',
          requires: { respect: 30 },
        },
        {
          id: 'vael_tells_you',
          label: 'He tells you he refused once too',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 14, agility: 13, mind: 16, presence: 17, resolve: 18, arcana: 20 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'mika',
      name: 'Mika',
      role: 'Your neighbour in 4B, a night-shift nurse',
      cardBlurb:
        'She lives across the landing from you and comes home at three in the morning, and she is the first living person who can suddenly see Sera’s wings. Practical, funny, and on your side before she knows what side that is.',
      pronouns: 'she/her',
      publicTraits: ['Practical', 'Funny when frightened', 'Protective'],
      hiddenDrives: [
        'She has seen Collectors before, out of the corner of her eye, at the end of night shifts, and has never told anybody',
        'Where she could go: from witness to accomplice. She can hide the two of you, patch the player up, call it all in, or decide she does not want to know',
      ],
      values: ['Keeping people alive', 'Not panicking in front of people who are already panicking'],
      fears: ['That seeing them means her own turn is coming', 'Being the only one who saw'],
      socialStyle:
        'Treats every crisis like the third one tonight. Jokes first, then does the useful thing. Speaks to Sera like a patient who will not sit down.',
      boundaries: ['Will not lie to the police for anybody she has not met properly', 'Will not let somebody bleed on her floor without fixing it'],
      goals: ['Get the player, who is clearly not fine, to sit down', 'Find out why she can see wings tonight'],
      secrets: [
        {
          id: 'mika_has_seen_them',
          fact: 'On the sixth-floor ward she has seen tall pale shapes standing in the corners of rooms where somebody was dying, for two years. She told herself it was tiredness.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it quietly, once Sera has done something in front of her that she cannot explain away.',
        },
        {
          id: 'mika_why_now',
          fact: 'Why she can see Sera now is never settled: Sera has begun to fall and is becoming visible, or Mika has stood next to the door so often that she sees through it. Both may be true.',
          visibility: 'CREATOR_ONLY',
          revealHint: 'Do not resolve this. Sera does not know either, and it frightens her.',
        },
      ],
      speechStyle:
        'Fast, casual, a bit hoarse after a twelve-hour shift. Hospital shorthand. Swears mildly and apologises to Sera for it.',
      topics: ['the hospital', 'what she saw on the ward', 'the wings', 'night shifts', 'the building'],
      voiceSamples: [
        'Okay. Okay. Either I need to sleep for nine hours, or your friend has wings.',
        'I do nights on a ward. People see things at four a.m. I have never seen one drip on the carpet.',
        'Sit. Show me the hand. I don’t care what she is, you’re bleeding on my floor.',
      ],
      appearance:
        'Young adult, short dyed-pink bob growing out at the roots, tired dark eyes, an oversized grey hoodie over hospital scrubs, trainers, lanyard still on.',
      visualHook: 'A short pink bob and a hospital lanyard over an oversized hoodie.',
      silhouette: 'Small, hood half up, keys in one hand and a takeaway bag in the other.',
      artSeed: 'feather-mika-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'surprised', 'worried', 'annoyed'],
      schedule: [
        { startMinute: 0, endMinute: 175, locationId: 'hospital', activity: 'the last hour of a night shift on the sixth floor' },
        { startMinute: 175, endMinute: 186, locationId: 'street', activity: 'walking home in the rain with a takeaway bag' },
        { startMinute: 186, endMinute: 200, locationId: 'landing', activity: 'coming up the stairs with her keys out' },
        { startMinute: 200, endMinute: 420, locationId: 'mika_flat', activity: 'still in scrubs, kettle on, too wired to sleep' },
        { startMinute: 420, endMinute: 1080, locationId: 'mika_flat', activity: 'asleep on the sofa with her phone face down' },
        { startMinute: 1080, endMinute: 1230, locationId: 'mika_flat', activity: 'eating cereal for dinner' },
        { startMinute: 1230, endMinute: 1440, locationId: 'hospital', activity: 'on shift' },
      ],
      homeLocationId: 'mika_flat',
      knowledgeScope: ['the_hospital', 'the_building', 'the_street'],
      startingRelationship: { trust: 30, affection: 25, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mika_covers',
          label: 'She hides the two of you in 4B',
          kind: 'ALLIANCE',
          requires: { trust: 40, flagsSet: ['mika_sees_wings'] },
        },
        {
          id: 'mika_tells_you',
          label: 'She tells you what she has seen on the ward',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 13, presence: 12, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'orin',
      name: 'Orin',
      role: 'An angel who fell three hundred years ago and keeps a bar under the tracks',
      cardBlurb:
        'He knows what happens when the seventh feather goes, because it happened to him. He will tell you, and he will tell you how to get off Heaven’s books for good — for a price.',
      pronouns: 'he/him',
      publicTraits: ['Tired and kind', 'Unhurried', 'Charges for everything that matters'],
      hiddenDrives: [
        'He wants somebody, once, to spend the last feather better than he did',
        'Where he could go: from bystander to accomplice. He can sell the player the truth, give it to Sera for nothing, or refuse to help anybody else fall',
      ],
      values: ['Paying what you owe', 'Leaving Heaven alone and being left alone by it'],
      fears: ['Watching somebody else make his mistake', 'Vael walking into his bar'],
      socialStyle:
        'Pours before he is asked, listens to all of it, then names a price. Gentle with Sera in a way that makes her uncomfortable.',
      boundaries: ['Will not give anything away for free, except to Sera, once', 'Will not go back up, whatever is offered'],
      goals: ['Keep the bar open and Heaven out of it', 'Find out whether Sera will do it better than he did'],
      secrets: [
        {
          id: 'orin_what_seven_does',
          fact: 'He fell three hundred years ago by spending his seventh feather on a woman in a plague year. He became human and outlived her by three centuries. He believes the last feather makes you mortal if it is spent on somebody who wants you to stay, and leaves ash if it is spent on anything else — but he has only seen it happen twice, and he could be wrong.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'This is what he sells. He tells it once his price is paid, or to Sera for nothing if she asks him alone.',
        },
        {
          id: 'orin_off_the_books',
          fact: 'A name torn out of the ledger and burned in his stove is a name Heaven cannot write back in. He has done it for four people in three hundred years. It makes both of you Fallen, for good.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He offers it only when the player has the page with their name and has paid him.',
        },
      ],
      speechStyle:
        'Low, slow, and a little amused. Talks like a man who has had three hundred years to finish his sentences. Never says Heaven; says "upstairs".',
      topics: ['the seventh feather', 'what he was', 'the Fallen', 'his price', 'Vael', 'upstairs'],
      voiceSamples: [
        'Close the door, you’re letting the rain in. And the other thing.',
        'Seven. I know what happens at seven. Everybody who comes down those steps asks me, and everybody pays.',
        'I had wings once. I spent the last of them on somebody. Ask me if I’d do it again. Go on.',
      ],
      appearance:
        'Looks about forty and is not. Silver earrings, a grey shirt with the sleeves rolled, burn scars across both shoulder blades where wings used to be, tired kind eyes.',
      visualHook: 'Old burn scars across his shoulder blades, where wings used to be.',
      silhouette: 'Broad, leaning on a bar with both forearms, a cloth over one shoulder.',
      artSeed: 'feather-orin-01',
      portrait: null,
      expressions: ['neutral', 'weary', 'wry', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'bar', activity: 'behind the bar, open all night' },
        { startMinute: 360, endMinute: 900, locationId: 'bar', activity: 'shutters down, asleep in the back room' },
        { startMinute: 900, endMinute: 1260, locationId: 'bar', activity: 'restocking, shutters half up' },
        { startMinute: 1260, endMinute: 1440, locationId: 'bar', activity: 'opening up for the night' },
      ],
      homeLocationId: 'bar',
      knowledgeScope: ['the_fallen', 'the_feathers', 'vael', 'collectors', 'the_ledger'],
      startingRelationship: { trust: 0, affection: 5, respect: 0, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'orin_answers',
          label: 'He tells you what happens at seven',
          kind: 'OTHER',
          requires: { trust: 30, flagsSet: ['visited:bar'] },
        },
      ],
      attributes: { might: 12, agility: 9, mind: 15, presence: 15, resolve: 16, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_three_knocks',
      title: 'Three Knocks',
      summary: 'You died at 2:14, an angel refused to take you, and the one they send next is at your front door.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['sera', 'vael'],
      involvedLocationIds: ['kitchen', 'bedroom', 'landing'],
      knownRewardCopy: 'The rest of the night, if you can keep it.',
      steps: [
        {
          id: 'the_door',
          playerCopy: 'Decide what to do about whoever is knocking.',
          directorNotes:
            'Every answer moves. Running means the window, the fire escape and rain within the beat. Opening the door means Vael, courteous and sorry, on the landing — and Sera reaching for the player’s hand, because a hand she holds cannot be taken. Demanding the truth means Sera answers part of it, fast, while the knocking waits. Nobody orders the player to stay or to go, and nobody new is named.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'out_the_window',
              label: 'Run',
              predicate: { flagsSet: ['used:run_for_it'] },
              setsFlags: ['left_the_flat', 'on_the_run'],
              closesFlags: [],
            },
            {
              routeId: 'opened_it',
              label: 'Open the door yourself',
              predicate: { flagsSet: ['used:face_him'] },
              setsFlags: ['met_vael'],
              closesFlags: ['on_the_run'],
            },
            {
              routeId: 'made_her_talk',
              label: 'Make her tell you why',
              predicate: { flagsSet: ['spoke:sera'] },
              setsFlags: ['knows:the_refusal'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_knock'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'until_morning',
          playerCopy: 'Keep both of you alive and out of Heaven’s sight until the sun comes up.',
          directorNotes:
            'The spine of the night. Every place has a cost: the street is open ground, the roof is wide sky, the hospital is full of Collectors at work, and anywhere with a shut door is a cage Vael can wait outside. Feathers buy time. So does talking to him. Choosing to go with him is a real route, not a fail state.',
          enterWhen: { flagsSet: ['first_knock'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_her_whole',
              label: 'Reach the morning with feathers to spare',
              predicate: { flagsSet: ['saw_the_morning'], flagsUnset: ['last_feather_gone'] },
              setsFlags: ['morning_with_feathers'],
              closesFlags: ['went_with_vael'],
            },
            {
              routeId: 'paid_for_it',
              label: 'Reach it on nothing',
              predicate: { flagsSet: ['saw_the_morning', 'last_feather_gone'] },
              setsFlags: ['morning_without_wings'],
              closesFlags: ['morning_with_feathers'],
            },
            {
              routeId: 'went_up',
              label: 'Go with Vael',
              predicate: { flagsSet: ['used:go_with_him'] },
              setsFlags: ['went_with_vael'],
              closesFlags: ['morning_with_feathers', 'sera_chose_to_stay'],
            },
            {
              routeId: 'sent_her_off',
              label: 'Tell her to go home',
              predicate: { flagsSet: ['used:send_her_away'] },
              setsFlags: ['sera_sent_away'],
              closesFlags: ['morning_with_feathers', 'sera_chose_to_stay'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['night_over'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_ten_thousand',
      title: 'Number Ten Thousand',
      summary: 'Sera carried 9,999 people without a single mistake. Then she looked at you, and she could not.',
      kind: 'MAIN',
      involvedCharacterIds: ['sera', 'vael'],
      involvedLocationIds: ['bridge', 'roof', 'kitchen'],
      knownRewardCopy: 'Why she said no — and what that means about the two of you.',
      discoverWhen: { flagsSet: ['first_knock'] },
      steps: [
        {
          id: 'ask_her',
          playerCopy: 'Find out why Sera refused to carry you.',
          directorNotes:
            'Three ways in and they feel different. Sera tells it herself only when she trusts the player. Vael knows her file and will say what he has read, which is the facts without the feeling. Her sight at the bridge shows the night itself, and costs a feather. Never let her lie about it; let her refuse to answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_tells_you',
              label: 'Earn it from her',
              predicate: { minRelationship: [{ characterId: 'sera', dimension: 'trust', value: 45 }] },
              setsFlags: ['knows:the_bridge'],
              closesFlags: [],
            },
            {
              routeId: 'vael_tells_you',
              label: 'Get it from Vael',
              predicate: {
                flagsSet: ['met_vael'],
                minRelationship: [{ characterId: 'vael', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['knows:the_bridge', 'heard_it_from_vael'],
              closesFlags: [],
            },
            {
              routeId: 'saw_it_yourself',
              label: 'See it through her eyes at the bridge',
              predicate: { flagsSet: ['used:her_sight', 'visited:bridge'] },
              setsFlags: ['knows:the_bridge', 'saw_the_bridge'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows_why'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'for_whom',
          playerCopy: 'Decide what her reason means to you.',
          directorNotes:
            'Her fear is that she did it for herself. The honest answer is both, and she has to decide whether that is allowed. Neither outcome is a punishment: she can choose the player, and the player can send her home while she still has wings to go home with.',
          enterWhen: { flagsSet: ['knows_why'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_chooses_you',
              label: 'She chooses to stay',
              predicate: { minRelationship: [{ characterId: 'sera', dimension: 'affection', value: 50 }] },
              setsFlags: ['sera_chose_to_stay'],
              closesFlags: ['sera_sent_away'],
            },
            {
              routeId: 'you_send_her_home',
              label: 'Send her home',
              predicate: { flagsSet: ['used:send_her_away'] },
              setsFlags: ['sera_sent_away'],
              closesFlags: ['sera_chose_to_stay'],
            },
          ],
          rewards: { xp: 150, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_seven',
      title: 'Seven Feathers',
      summary: 'Every miracle costs her one. Nobody can tell you what she becomes when the last one goes — nobody except a man who keeps a bar under the train tracks.',
      kind: 'MAIN',
      involvedCharacterIds: ['sera', 'mika', 'vael', 'orin'],
      involvedLocationIds: ['bar', 'street', 'hospital'],
      knownRewardCopy: 'What happens at seven, and a way out of Heaven’s books if you want one.',
      discoverWhen: { flagsSet: ['first_knock'] },
      steps: [
        {
          id: 'who_knows',
          playerCopy: 'Find somebody who knows what happens at seven.',
          directorNotes:
            'Sera has heard of a Fallen one under the tracks and is frightened to say so. Mika knows the bar as the place night staff go after a death on the ward. Vael knows Orin by name and will mention him as a warning, which is also an address.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sera_remembers',
              label: 'Sera tells you',
              predicate: { minRelationship: [{ characterId: 'sera', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows_about_orin'],
              closesFlags: [],
            },
            {
              routeId: 'mika_knows_a_bar',
              label: 'Mika knows a place',
              predicate: { flagsSet: ['spoke:mika', 'mika_sees_wings'] },
              setsFlags: ['knows_about_orin', 'mika_involved'],
              closesFlags: [],
            },
            {
              routeId: 'vael_warns_you',
              label: 'Vael warns you off',
              predicate: { flagsSet: ['spoke:vael'] },
              setsFlags: ['knows_about_orin'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['looking_for_orin'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'orins_price',
          playerCopy: 'Find Orin, and find out what he wants for the answer.',
          directorNotes:
            'He asks for a feather. He will take a memory instead — a real one, the best one the player has — and he will keep it. Sera can ask him alone and he will tell her for nothing, once, which costs him more than he shows.',
          enterWhen: { flagsSet: ['looking_for_orin'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid',
              label: 'Pay his price',
              predicate: { flagsSet: ['used:make_orin_a_deal'] },
              setsFlags: ['bargained_with_orin', 'knows:what_seven_means'],
              closesFlags: [],
            },
            {
              routeId: 'for_sera',
              label: 'Let Sera ask him alone',
              predicate: {
                flagsSet: ['visited:bar'],
                minRelationship: [{ characterId: 'orin', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['knows:what_seven_means'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['found_orin'],
            abilities: [],
            reputation: [{ factionId: 'faction_fallen', amount: 20 }],
          },
        },
        {
          id: 'off_the_books',
          playerCopy: 'Decide whether to step outside Heaven’s books for good.',
          directorNotes:
            'A page torn from Vael’s ledger and burned in Orin’s stove is a name Heaven cannot write back in. It makes the player and Sera both Fallen. It is a real ending, not a trick, and Vael will know the moment the page burns.',
          enterWhen: { flagsSet: ['bargained_with_orin'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'burn_the_page',
              label: 'Burn the page with your name',
              predicate: { flagsSet: ['bargained_with_orin'], hasItems: ['ledger_page'] },
              setsFlags: ['stepped_off_the_books'],
              closesFlags: ['went_with_vael'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: [],
            abilities: [],
            reputation: [
              { factionId: 'faction_fallen', amount: 30 },
              { factionId: 'faction_collectors', amount: -60 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_the_last',
      title: 'The Seventh',
      summary: 'One feather is the last one. What it is spent on decides what she becomes.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['sera'],
      involvedLocationIds: [],
      knownRewardCopy: 'Nobody knows. That is the point.',
      steps: [
        {
          id: 'the_seventh',
          playerCopy: 'Decide what the last feather is for, if it comes to that.',
          directorNotes:
            'She asks before she spends it, once, and accepts the answer. Spending it is never quiet and never off the page. Keeping it is also a choice, and morning with one feather left is not a lesser ending.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'spent_it',
              label: 'Let her spend it',
              predicate: { flagsSet: ['used:the_last_feather'] },
              setsFlags: ['last_feather_gone'],
              closesFlags: ['she_kept_one'],
            },
            {
              routeId: 'kept_it',
              label: 'Get her to the morning without it',
              predicate: { flagsSet: ['saw_the_morning'], flagsUnset: ['used:the_last_feather'] },
              setsFlags: ['she_kept_one'],
              closesFlags: ['last_feather_gone'],
            },
          ],
          rewards: { xp: 150, items: [], flags: [], abilities: [], reputation: [] },
        },
      ],
    },
    {
      id: 'q_the_second',
      title: 'The Second',
      summary: 'Vael has never had to come twice. He is polite, patient and genuinely sorry, and he is not going to stop.',
      kind: 'SIDE',
      involvedCharacterIds: ['vael', 'sera', 'orin'],
      involvedLocationIds: ['landing', 'cathedral'],
      knownRewardCopy: 'What he actually wants, and whether he would write a lie in his own ledger.',
      discoverWhen: { flagsSet: ['first_knock'] },
      steps: [
        {
          id: 'know_him',
          playerCopy: 'Find out what Vael actually wants.',
          directorNotes:
            'He wants the ledger closed and Sera home. He would like the player to choose it. Taking the page out of his ledger is possible — he sets it down when he talks — and he will notice, and will not stop being polite about it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'earned_it',
              label: 'Earn the truth from him',
              predicate: { minRelationship: [{ characterId: 'vael', dimension: 'trust', value: 40 }] },
              setsFlags: ['knows:vael_refused_once'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_page',
              label: 'Take the page with your name',
              predicate: { hasItems: ['ledger_page'] },
              setsFlags: ['vael_is_owed'],
              closesFlags: [],
            },
            {
              routeId: 'orin_tells_you',
              label: 'Hear it from Orin',
              predicate: { flagsSet: ['found_orin'] },
              setsFlags: ['knows:vael_refused_once'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['vael_understood'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_lie',
          playerCopy: 'Find out whether Vael will close the ledger with a lie.',
          directorNotes:
            'He can write "collected" next to the player’s name and sign it, and carry that himself. He will do it only for somebody who knows he once refused too, and who has given him a reason to respect them. A player who stole his page has made him write the truth.',
          enterWhen: { flagsSet: ['vael_understood'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_lies_for_you',
              label: 'He writes the lie',
              predicate: {
                flagsSet: ['knows:vael_refused_once'],
                minRelationship: [{ characterId: 'vael', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['vael_lied_for_you'],
              closesFlags: ['vael_wrote_the_truth'],
            },
            {
              routeId: 'he_writes_it_true',
              label: 'He writes the truth',
              predicate: { flagsSet: ['vael_is_owed'] },
              setsFlags: ['vael_wrote_the_truth'],
              closesFlags: ['vael_lied_for_you'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: [],
            abilities: [],
            reputation: [{ factionId: 'faction_collectors', amount: 30 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_second_knock',
      atWorldMinute: 2 * 60 + 31,
      locationId: 'landing',
      publicCopy:
        'Three more knocks, exactly as slow as the first. Then a man’s voice through the door, courteous and apologetic, saying the player’s full name and asking whether they would mind opening up.',
      directorNotes:
        'Vael, patient. He does not threaten and does not try the handle — he cannot cross a door shut against him. If the player has already left the flat or opened the door, this does not happen.',
      setsFlags: ['heard_his_voice'],
      cancelledByFlags: ['left_the_flat', 'met_vael'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_mika_home',
      atWorldMinute: 3 * 60 + 6,
      locationId: 'landing',
      publicCopy:
        'Keys on the landing. The neighbour from 4B, in scrubs under a grey hoodie, stops dead at the top of the stairs and stares past the player — at the wings.',
      directorNotes:
        'Mika is the first living person who can see Sera, which means something has changed and Sera does not know what. Never before the fourth beat, whatever the clock says: if the player is still in the first three beats, she is still on the stairs. She does not scream. She asks if anybody is bleeding.',
      setsFlags: ['mika_sees_wings'],
      cancelledByFlags: [],
      requiresFlags: ['first_knock'],
      movesCharacters: [{ characterId: 'mika', toLocationId: 'landing' }],
    },
    {
      id: 'we_lights_out',
      atWorldMinute: 3 * 60 + 40,
      locationId: 'street',
      publicCopy:
        'Every streetlight on the hill goes out, one after another, from the top down to the river, as though somebody were walking down the street turning them off. Nobody is there.',
      directorNotes:
        'The Collectors have started searching the district. From now on open ground is dangerous, and Sera can see them even when the player cannot.',
      setsFlags: ['the_search_began'],
      cancelledByFlags: ['went_with_vael'],
      requiresFlags: ['first_knock'],
      movesCharacters: [],
    },
    {
      id: 'we_vael_offer',
      atWorldMinute: 4 * 60 + 20,
      locationId: null,
      publicCopy:
        'Vael is simply there, wherever the player is, sitting down across from them with the ledger closed on his knee. He has an offer, and he would like them to hear all of it before they answer.',
      directorNotes:
        'Come with him before dawn, and Sera goes home with her record clean and no mark against her. He means it and he can deliver it. He will not take the player’s hand by force while they are talking.',
      setsFlags: ['vael_made_his_offer'],
      cancelledByFlags: ['went_with_vael', 'stepped_off_the_books'],
      requiresFlags: ['first_knock'],
      movesCharacters: [],
    },
    {
      id: 'we_bells',
      atWorldMinute: 5 * 60 + 45,
      locationId: 'cathedral',
      publicCopy:
        'Across the river, the old cathedral’s bells ring once. The tower has had no bells in it for eighty years.',
      directorNotes:
        'The Collectors are gathering for dawn. Sera hears her own name in it. Less than an hour is left, and she says so.',
      setsFlags: ['the_gathering'],
      cancelledByFlags: ['went_with_vael'],
      requiresFlags: ['first_knock'],
      movesCharacters: [{ characterId: 'vael', toLocationId: 'cathedral' }],
    },
    {
      id: 'we_dawn',
      atWorldMinute: 6 * 60 + 41,
      locationId: null,
      publicCopy:
        'The rain stops. The sky over the river goes grey, then gold, and the sun comes up on a city that has no idea what happened in it tonight.',
      directorNotes:
        'Morning, whatever it has cost. Name exactly what is left: how many feathers, whose hand the player is holding, where Vael is standing. This is the moment most endings become possible.',
      setsFlags: ['saw_the_morning'],
      cancelledByFlags: ['went_with_vael'],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_seven',
      kind: 'FINALE',
      label: 'What Sera becomes when the seventh feather goes',
      seedHint: 'She says the count out loud after every miracle, and never says the next number first.',
      payoffHint: 'Nobody knows — and Orin, the only one who has seen it, says it depends on who the last one was spent on.',
      weight: 1,
    },
    {
      id: 'p_why',
      kind: 'MYSTERY',
      label: 'Why she refused',
      seedHint: 'She knew which light the player leaves on in the kitchen before anybody told her.',
      payoffHint: 'Six years ago, at the bridge, she was sent to wait for the player and watched them keep a stranger alive instead of themselves.',
      weight: 0.95,
    },
    {
      id: 'p_for_whom',
      kind: 'RELATIONSHIP',
      label: 'Whether she refused for you or for herself',
      seedHint: 'She asks what cold feels like, and listens to the answer too carefully.',
      payoffHint: 'Both — and she has to decide whether that is allowed.',
      weight: 0.9,
    },
    {
      id: 'p_vael',
      kind: 'RIVAL',
      label: 'Vael has done this before',
      seedHint: 'He knows the sound a torn wing makes before he has seen hers.',
      payoffHint: 'Centuries ago he refused once himself. He could be the one who writes the lie in the ledger.',
      weight: 0.8,
    },
    {
      id: 'p_dawn',
      kind: 'BOSS',
      label: 'Dawn at the old cathedral',
      seedHint: 'Bells ring in a tower that has had no bells for eighty years.',
      payoffHint: 'At sunrise the Collectors gather, and Sera is home, or Fallen, or something nobody has a word for.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_fast',
      name: 'Fast on Your Feet',
      role: 'Speed and nerve',
      summary: 'You know the back stairs, rooftops and short cuts of this city because you deliver to all of them. When something comes for you, you are hard to catch.',
      playstyle: ['Quick', 'Hard to corner', 'A little reckless'],
      blurb: 'Bike courier, six days a week, and you have jumped worse gaps than the one between your roof and the next.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { run: 3, city: 2, nerve: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_talker',
      name: 'Talks for a Living',
      role: 'Persuasion and calm',
      summary: 'Bar, call centre, shop floor: you have spent years getting difficult people to agree to things. A polite man with a ledger is just another difficult person.',
      playstyle: ['Persuasive', 'Calm under pressure', 'Not a fighter'],
      blurb: 'You have talked a drunk out of a fight and a landlord out of an eviction, and tonight you will need both.',
      attributeBonus: { presence: 3, mind: 1 },
      skillProficiencies: { talk: 3, notice: 1, nerve: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_collectors', amount: 10 }],
    },
    {
      id: 'arch_carer',
      name: 'Looks After People',
      role: 'Care and endurance',
      summary: 'You are the one people call at three in the morning. You stay, you hold the hand, and you know what to do with a wound. It is also why you never sleep.',
      playstyle: ['Steady', 'Protective', 'Puts others first'],
      blurb: 'Care worker, older sister, the friend with the spare key — whatever it says on paper, people lean on you.',
      attributeBonus: { resolve: 2, presence: 2 },
      skillProficiencies: { care: 3, nerve: 2 },
      startingItems: [{ itemId: 'first_aid_kit', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
    {
      id: 'arch_noticer',
      name: 'Notices Everything',
      role: 'Observation and patience',
      summary: 'You read people, rooms and small print. You noticed that the girl in your kitchen was barefoot a full second before you noticed the wings.',
      playstyle: ['Sharp-eyed', 'Patient', 'Ordinary up close'],
      blurb: 'Photographer, student, night-shift security — you are paid, one way or another, to see what other people walk past.',
      attributeBonus: { mind: 3, arcana: 1 },
      skillProficiencies: { notice: 3, quiet: 2, city: 1 },
      startingItems: [],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What is the full name on the card?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Noa Castellane' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. they/them' },
    {
      id: 'archetype',
      label: 'What do you do, when you are not dead?',
      helpText:
        'Your everyday life, which sets what you are good at tonight. It is fixed for the whole story. It does not decide how you feel about Sera, whether you open the door, or what you let her spend on you — all of that is yours, and you can change your mind about any of it at any point in the night.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'Who would notice if you were gone?',
      helpText: 'Most people have somebody. It is also the first thing Vael will ask about.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. My sister, who calls every Sunday and would know by Monday.',
    },
    {
      id: 'kitchen_thing',
      label: 'What in your kitchen will Sera ask about first?',
      helpText: 'She has never had to make small talk, and she has questions about ordinary things.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'the_light', label: 'The light you always leave on over the stove' },
        { id: 'the_plant', label: 'A plant you have somehow kept alive for five years' },
        { id: 'the_photo', label: 'A photo on the fridge of somebody you do not talk to any more' },
        { id: 'the_letters', label: 'A stack of letters you have not opened' },
        { id: 'the_two_mugs', label: 'Two mugs, when you live alone' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does Sera notice about you first?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Bed hair, an old band T-shirt, and a scar through one eyebrow.',
    },
  ],
  /**
   * Six destinations, straight from the bible. Three are losses — Ash, The
   * Ledger and Walk Away — and Walk Away and The Ledger are both chosen, which
   * is the point: a romance where you cannot give the other person up is not
   * one. None of them requires the mystery solved; Morning is reachable by a
   * player who never learned why she refused.
   */
  endings: [
    {
      id: 'end_morning',
      name: 'Morning',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['saw_the_morning'],
        flagsUnset: ['last_feather_gone', 'went_with_vael', 'sera_sent_away', 'stepped_off_the_books'],
      },
      condition:
        'Both of them see the sun come up and Sera still has feathers. Vael closes the ledger with a lie — "collected", in his own hand — and she has to go back. Bittersweet, not a loss: they kept each other alive for one night, and the last scene is her deciding how to say goodbye.',
      epilogue:
        'The sun comes up gold over the river. Vael writes one word next to your name and signs it, and does not look at either of you while he does. Sera goes home at seven. The light over your stove stays on, and sometimes, at 2:14, the kitchen smells of rain.',
      hint: 'Somebody has to write something in the ledger.',
    },
    {
      id: 'end_mortal',
      name: 'Mortal',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['last_feather_gone', 'sera_chose_to_stay'],
        minRelationship: [{ characterId: 'sera', dimension: 'affection', value: 50 }],
      },
      condition:
        'Sera spent her last feather on the player, chose to stay, and wakes up human. The romance ending. She has never been cold before, or hungry, or tired, and the first morning is full of those small discoveries. Earned only if the player wanted her to stay and said so.',
      epilogue:
        'She wakes up on your sofa under two blankets, shivering, and tells you very seriously that cold is rude. Her hair is just grey now. She burns the first toast she has ever made and eats it anyway, and asks what you do on a Tuesday.',
      hint: 'Orin says it depends on who the last one is spent on.',
    },
    {
      id: 'end_ash',
      name: 'Ash',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['last_feather_gone'], flagsUnset: ['sera_chose_to_stay'] },
      condition:
        'The last feather went, and she did not come back. A loss, written gently and without blame: whatever she spent it on mattered, and the player is alive because of it. Do not soften it into a hidden survival.',
      epilogue:
        'There is a little grey ash on your kitchen floor, in the shape of a wet footprint. You do not sweep it up for a week. The light over the stove stays on, and the city goes on not knowing.',
      hint: '',
    },
    {
      id: 'end_ledger',
      name: 'The Ledger',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['went_with_vael'] },
      condition:
        'The player opened the door and went with Vael so that Sera could go home with her record clean. A loss, and a chosen one. Write it quietly: Vael is kind, the walk is not frightening, and Sera is allowed to be furious with them for it.',
      epilogue:
        'Vael ticks the last name on the page and closes the ledger. Sera is at the cathedral at dawn with her wings mended and her record clean, and every Collector in the nave knows who paid for it.',
      hint: 'If you open it, he takes you.',
    },
    {
      id: 'end_fallen',
      name: 'Fallen Together',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['stepped_off_the_books'] },
      condition:
        'The player paid Orin’s price and burned the page with their name. Both of them are outside Heaven’s books for good — Sera Fallen, the player unrecorded — and they belong to the all-night places now. Not a victory and not a loss; a new life with no one watching.',
      epilogue:
        'Orin gives you both stools at the end of the bar and a key to the back room. Sera learns to pour. On rainy nights other Fallen come down the steps, and she sits with them, and tells them it can be done.',
      hint: 'A name burned in his stove cannot be written back in.',
    },
    {
      id: 'end_walk_away',
      name: 'Walk Away',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['sera_sent_away'] },
      condition:
        'The player told Sera to leave, and meant it, and she did. A loss, chosen to spare her. She goes with feathers left and her answer unfinished. Do not make her come back in the same scene.',
      epilogue:
        'She does not argue. She says your name once, properly, and goes out of the window into the rain. Vael does not knock again. Six weeks later there is a single white feather on your windowsill, dry, on a night it has rained since dark.',
      hint: '',
    },
  ],
  protagonist: {
    kind: 'BLANK',
    name: '',
    pronouns: '',
    description: '',
    setupHeading: '',
    portrait: null,
  },
  coverDirection: [
    'SUBJECT: Sera alone in the foreground, a key visual for a gentle supernatural romance anime set in a rainy modern city at night.',
    'Sera fills the front of the frame from the waist up: a beautiful young adult angel who looks about twenty, long straight',
    'silver-grey hair that glows faintly from within, pale luminous grey-blue eyes, a thin broken halo of light flickering',
    'above her head. A simple white dress soaked dark with rain. Two huge white wings half open behind her, the top of the',
    'left wing visibly torn. A single white feather drifts down past her face, turning to ash at its tip.',
    'She stands in a small apartment kitchen at night, rain streaking the window behind her, the city lights blurred beyond.',
    '',
    'BEHIND HER, small and secondary: the apartment front door, slightly ajar, and in the gap a tall man in a black suit',
    'with black wings folded close like a coat, holding a slim black ledger. Gold eyes, just catching the light.',
    '',
    'MOOD: luminous, tender and sad; cool blue night against her warm inner glow. Seasonal anime heroine, not horror.',
  ].join('\n'),
  prologue: [
    {
      assetKey: 'story_last_feather/prologue/1',
      headline: 'You were supposed to die tonight.',
      subline: 'At 2:14, in your sleep.',
      alt: 'A rainy city bedroom at night. A glowing figure with white wings stands over a sleeping person, and the bedside clock reads 2:14.',
    },
    {
      assetKey: 'story_last_feather/prologue/2',
      headline: 'Sera',
      subline: 'The angel sent to collect you. She refused.',
      alt: 'Sera, an angel with long silver hair and pale grey-blue eyes, wings half open and a broken halo above her, rain dripping from her hair as feathers fall.',
    },
    {
      assetKey: 'story_last_feather/prologue/3',
      headline: 'Vael',
      subline: 'The one they send when the first one fails.',
      alt: 'Vael in a dim apartment hallway: a man in a black suit and gloves with black wings folded close, gold eyes, holding a slim black ledger to his chest.',
    },
    {
      assetKey: 'story_last_feather/prologue/4',
      headline: 'Seven feathers left.',
      subline: 'Every miracle costs her one.',
      alt: 'Seven glowing white feathers float in a line through a dark night sky under a broken halo, and the lowest one is crumbling into ash.',
    },
  ],
  opening:
    'You died at 2:14.\n\n' +
    'You know because the girl standing in your kitchen tells you, very calmly, while rain drips from the ends of her silver hair onto your floor.\n\n' +
    '"Four minutes ago," she says. "Your heart stopped in your sleep. I was sent to carry you up."\n\n' +
    'Behind her, something enormous and white is folded against your fridge. A wing. The top of it is torn.\n\n' +
    '"I didn’t."\n\n' +
    'Her name is Sera. She says it like it’s the last thing she owns.\n\n' +
    'Three slow knocks at your front door.\n\n' +
    'Sera goes completely still. "That’s the one they send when the first one fails. If you open it, he takes you. If you don’t—" She stops.\n\n' +
    'Something slides under the door. A black feather, and a card with your full name on it.',
  openingSuggestions: [
    'I grab Sera’s hand and pull her toward the bedroom window. "Fire escape. You can explain while we run."',
    'I pick up the card, step past her and open the door myself. Nobody gets hurt in my kitchen because of me.',
    'I lock the door and turn to her. "You broke a rule for me. Tell me why. Fast."',
  ],
  publishedAt: '2026-10-30T12:00:00.000Z',
};

export const LAST_FEATHER = StoryVersion.parse(raw);

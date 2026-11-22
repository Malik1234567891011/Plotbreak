import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Rent Is One True Story" — a vampire who takes his rent in the truth.
 *
 * The structural bet is the one Good Morning, Husband made: a small house, one
 * person at the centre of it who is a person rather than a prize, and a
 * premise that turns every ordinary exchange into a decision. Here the
 * premise is the rent. Once a month, at midnight, the landlord stands on your
 * side of nothing, at your door, and asks for one true thing. He can always
 * hear a lie. So every conversation in this building is quietly about how
 * much of yourself you are willing to pay, and the player who never thinks of
 * it that way still gets a gothic flat-share with a cat, a laundromat and a
 * priest who plays chess at two in the morning.
 *
 * The vampire rules are folklore rather than anybody's franchise: no entry
 * without an invitation, an invitation lasts until it is taken back at the
 * threshold, daylight kills. What is ours is the diet. Elias stopped drinking
 * blood in November 1974 and has lived since on true stories told to him
 * freely, and three tenants' stories a month are no longer enough. That is
 * why Dee put up the ad for the player's flat behind his back, and why the
 * opening question is a real one.
 *
 * The playable span is the nine days from the first rent night to a tax
 * auction on the tenth that his ex, Celine, intends to win. That clock is the
 * only pressure the world applies on its own. Everything else waits for the
 * player: what he is, why truth feeds him, the last tenant's box in the
 * closet, the promise the priest across the road inherited, and whatever the
 * player decides he is to them.
 *
 * 13+: hunger is written as stillness, distance and eyes. Nobody is bitten on
 * the page, and the romance goes as far as a kiss.
 *
 * Three variables, all invisible. Energy is the only GOOD_HIGH because
 * `resolveRest` refills those, and the honest thing for resting to restore in
 * a story lived at night is the player's own sleep. His Hunger is first among
 * the descending pair because PUBLIC_VIOLENCE raises the first GOOD_LOW in
 * array order, and a fight on these stairs making a starving vampire hungrier
 * is exactly right. Arrears is what lying costs.
 */

const AUCTION_MINUTE = 9 * 1440 + 10 * 60;

const raw = {
  id: 'sv_rent_is_one_true_story_1',
  storyId: 'story_rent_is_one_true_story',
  version: 1,
  title: 'Rent Is One True Story',
  openingObligations: [
    {
      what: 'Pay your first month’s rent to Elias Varga at your door tonight: one true story, before he moves on down the stairs.',
      withCharacterId: 'elias',
      dueInMinutes: 40,
    },
  ],
  fantasyLabel: 'He doesn’t want money. He wants the truth.',
  hook: 'Your new apartment is cheap for a reason. The landlord only comes at night, never crosses your doorstep, and takes the rent in true stories. He always knows when you lie.',
  premise:
    'You needed a room by the end of the week, and the top flat in Varga House was the only one in the city you could afford. A woman from the third floor gave you a key, a one-page lease and a card for the inside of your door. Rent is one true story, due at midnight on the first.\n\n' +
    'The landlord, Elias Varga, only comes at night. He is polite, pale and tired, and he will not cross your doorstep unless you ask him in. He can hear a lie the way other people hear a dropped glass. For fifty years he has lived on his tenants’ true stories, because he stopped drinking anything else.\n\n' +
    'He did not put up the ad for your flat. Somebody in the house did it behind his back, because he is starving and three stories a month are not enough.\n\n' +
    'Now the city wants to auction the building in nine days, his ex has come back to town to buy it, and everybody who could stop her is asleep all day, behind on their own rent, or eighty-nine.\n\n' +
    'Pay the rent. Lie, and see what he does. Find out why the truth keeps him alive. Or ask him in, and find out what that costs.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Supernatural', 'Modern', 'Slice of life', 'Drama'],
  mechanicsChips: [
    'Rent is paid in the truth',
    'He always knows when you lie',
    'He can’t come in unless you ask',
    'Nine days until the auction',
    'His ex wants the building',
  ],
  contentDescriptors: ['ROMANCE', 'SUGGESTIVE_THEMES', 'PSYCHOLOGICAL_THEMES', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can lie to him every month and he will let you stay. You can tell him the truth and find out it costs more than money would have. You can spend thirty turns on a roof at four in the morning talking about nothing, and that is a real way to play this. Elias is not waiting to be won. He is deciding, the same as you, whether letting somebody new into this building was a mistake.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'apartment_4c',
    startWorldMinute: 0,
    startingItems: [
      { itemId: 'key_4c', qty: 1 },
      { itemId: 'the_lease', qty: 1 },
    ],
    hardCanon: [
      'Elias Varga is a vampire. He was made in 1891, at twenty-nine, and has looked twenty-nine ever since. He sleeps in the basement of Varga House from before dawn until sundown, and daylight would kill him.',
      'He has not drunk anybody’s blood since November 1974. He lives on true stories told to him freely: a true thing, said willingly, feeds him a little. A lie feeds him nothing, and he can always hear one, the moment it is said.',
      'No vampire can cross the threshold of somebody’s home unless a person who lives there invites them in. A welcome lasts until a person who lives there takes it back, out loud, at the threshold. Elias will never trick anybody into an invitation.',
      'Rent at Varga House is one true story a month, due at midnight on the first, paid to Elias in person at the tenant’s door. There has been no money rent since December 1974.',
      'What the player says about their own life is true unless the player makes clear they are lying or making it up. Elias hears exactly those, at once, and never calls a sincere answer a lie.',
      'Lying to him costs the liar slowly, and the house notices. After a first lie he lets it go and stops offering anything true back. After a few he collects from every other door first, Dee asks what happened, and Gus mentions a blank line in the ledger beside the player’s flat number. After many he stops knocking on that door at all, though he will still come, once, if called from the roof. His hunger shows the same way: a month without truth, an invitation, or any violence in the house pushes him further from doors and warm rooms, until he walks the streets all night and asks the player, very calmly, to lock their door against him.',
      'Four of the nine flats are let: Gus Bellweather in 1A since 1969, Marisol Reyes in 2B, Dee Moss in 3B, and now the player in 4C. Three stories a month have not been enough, and Elias has been weakening since spring.',
      'Dee Moss posted the ad for 4C, signed the lease on Elias’s behalf and gave the player the key, without telling him. He found out at midnight tonight, at the player’s door.',
      'Ada Lindqvist lived in 4C from 1971 until she died there, aged eighty-one, in 2015. Elias kept the flat empty for eleven years. Her hatbox of carbon-copied rent stories is still on the closet shelf.',
      'Since his lawyer, Harold Pruitt, died last spring, the city has wrongly recorded the building’s taxes as unpaid. Varga House is Lot 14 at a public auction at the records office at ten in the morning on the tenth. Pruitt’s receipts, which prove the error, are in a shoebox in Gus’s flat.',
      'Celine Marchand is the vampire who made Elias. They were together from 1891 to 1974, and she left when he stopped drinking. She still drinks, runs a late bar across town called the Orchid Room, and is the bidder behind the lawyer at the auction.',
      'Celine still holds the welcome to the lobby and stairs that Elias gave her in 1952. She can walk up to any door in the house. She cannot cross into any flat unless somebody who lives there asks her in.',
      'Father Tom Kowalski, the priest at St. Anselm’s across the street, knows what Elias is and plays chess with him on the church porch most nights after two. He inherited a promise from his predecessor about what the parish would do if Elias ever drank again.',
      'Elias never strikes a tenant and never drinks from one, whatever is offered. Attacked, he steps out of reach faster than anybody can follow and leaves. Nobody in this story is bitten on the page.',
      'Elias is not a prize and cannot be won. He can say no, ask the player to leave, or leave himself.',
      'Everybody in this story is an adult. The player is a grown adult who signed their own lease. Elias looks twenty-nine and Celine thirty-four; Dee is thirty-one, Marisol Reyes forty-four, Father Tom fifty-eight and Gus eighty-nine.',
      'Romance in this story goes as far as one kiss and no further. Nothing beyond that kiss happens or is implied, on the page or off it, and no scene cuts away to anything more. If a scene would go further, it ends at the door, with the two of them on either side of it.',
    ],
    toneGuide:
      'Gothic, funny and warm, in that order of surface and the reverse order of depth. A hundred-year-old walk-up at night: radiators that knock, a bulb on every landing, a laundromat glowing blue on the corner, a church porch with a chessboard under a plastic cover. ' +
      'Every scene has the rent underneath it. Truth is currency here, so a true thing said should land as weight, and a lie should land as a small, polite silence. Elias always knows. He does not always say so. ' +
      'Romance is slow and tense and sweet: a coat put round somebody’s shoulders, a hand on a doorframe that does not cross it, a roof at four in the morning, at most a kiss. Hunger is written as stillness, distance and his eyes going dark, never as blood, and no description of anybody’s body lingers. ' +
      'Nobody gives speeches. Dee talks too fast, Gus corrects his own dates, Father Tom asks if you have eaten, Celine calls everybody darling, and Elias says thank you every time he is told something true, and never in the same words twice. If the player attacks, lies, refuses or walks out, the house reacts in character and the story keeps going. The face at the top of a beat is Elias’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      "\"I grew up in a lighthouse,\" you lie.\n\nElias waits.\n\nThen he smiles. That’s worse.\n\n\"No, you didn’t.\" He doesn’t sound angry. He sounds like a man turning down a coin he’s been offered twice. \"Try again. Smaller. The small ones are usually true.\"\n\nOne floor down, a door creaks open an inch.\n\n\"Dee,\" he says, without looking. \"Bed.\"\n\n\"I am in bed,\" Dee calls up the stairwell. \"Spiritually.\"",
      "Father Tom moves a knight and doesn’t let go of it.\n\n\"He missed the game last night,\" he says. \"Twenty years, he’s never missed two in a row.\"\n\nThe porch light buzzes. Across the street, the top window of Varga House is dark. Yours.\n\n\"Have you eaten?\" Tom asks.\n\nYou nod.\n\n\"Good. Then here’s the frightening part.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 12, resolve: 12, arcana: 8 },
  skills: [
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying the true thing out loud, when it costs you something to say it.' },
    { id: 'bluff', name: 'Bluffing', attribute: 'presence', description: 'Lying well enough to fool anybody in this city except your landlord.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Being good company at three in the morning, on a roof, with somebody who has heard everything.' },
    { id: 'notice', name: 'Noticing', attribute: 'mind', description: 'Seeing what is in front of you: shoes that stop at a line, a hand that will not stay still.' },
    { id: 'digging', name: 'Digging', attribute: 'mind', description: 'Paper, records, boxes in closets. Finding out what somebody once wrote down.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Standing still in a doorway when every instinct says shut the door.' },
    { id: 'lore', name: 'Old Rules', attribute: 'arcana', description: 'Knowing how thresholds, welcomes and daylight actually work, and saying the old words right.' },
    { id: 'handiwork', name: 'Handiwork', attribute: 'might', description: 'Keeping a hundred-year-old building running with a wrench, a torch and patience.' },
  ],
  /**
   * Three, all invisible.
   *
   * Energy is the player's own sleep, and it is GOOD_HIGH because resting
   * should restore something honest. His Hunger is first among the
   * descending pair on purpose: violence in this house raises it, and so does
   * asking him in. It drifts down on its own because the other tenants keep
   * paying. Arrears is the truth the player owes, and lying is what adds to it.
   */
  resources: [
    {
      id: 'energy',
      name: 'Energy',
      max: 100,
      start: 75,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been up all night three nights running. They say the true thing without deciding to, which is either the best or the worst thing that could happen at a door at midnight.',
      color: '#C9B8E8',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on fumes and vending-machine soup. The player misses things in a conversation, agrees to plans to end them, and is one bad sentence away from saying something true by accident. Going to bed, even at four in the afternoon, is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary jet lag of a body learning to live at night. Fine for the stairs, the laundromat or a chess game. Bad for the records office at nine in the morning. Nobody remarks on it unless asked.',
        },
        {
          upTo: 100,
          behaviour:
            'Wide awake at two in the morning, which in this building is the right time to be. The player has room to be curious, to stay on the roof until the sky goes grey, and to choose their words before paying with them.',
        },
      ],
    },
    {
      id: 'hunger',
      name: 'His Hunger',
      max: 100,
      start: 58,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Elias is fed, for the first time in years. He laughs out loud on the stairs, stays on the roof until the last safe minute, and argues with Father Tom about a chess move for an hour for the pleasure of it.',
      color: '#8E2C3A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'He is well. He lingers at doors, makes jokes, tells a story of his own when asked, and comes up to the roof early to wait for whoever might come. His colour is almost ordinary. This is the band where he says yes to things.',
        },
        {
          upTo: 50,
          behaviour:
            'Thin and careful, the way he has been all year. Courteous, funny in short bursts, and quietly keeping a hand on every doorframe. He leaves conversations a little before he wants to, and nobody but Dee notices.',
        },
        {
          upTo: 75,
          behaviour:
            'He keeps his distance on purpose. He collects rent from the landing rather than the doorway, avoids crowded rooms and warm ones, and his eyes go very dark when anybody stands close. He apologises for things nobody has accused him of.',
        },
        {
          upTo: 100,
          behaviour:
            'He leaves the building at night and walks until dawn. If he speaks to the player at all it is to ask them, very calmly, to lock the door and not open it to him tonight whatever he says. Father Tom does not sleep. Celine hears about it within the hour.',
        },
      ],
    },
    {
      id: 'arrears',
      name: 'Arrears',
      max: 100,
      start: 10,
      regenPerHour: -0.2,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Square with him. Every word the player has paid has been real, and he says thank you as if it were the first time anybody had.',
      color: '#5B6C8F',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The player is paid up in the only currency the house takes. Elias meets their eye, says thank you and means it, and offers a small true thing of his own back, unasked, now and then.',
        },
        {
          upTo: 50,
          behaviour:
            'He has heard a lie or two and has said nothing about them. He is patient and exactly as polite as before, which is one degree cooler than he was. He stops offering anything back.',
        },
        {
          upTo: 80,
          behaviour:
            'He collects from everybody else first. Dee asks what happened. Gus mentions, for the record, that the ledger has a blank line in it with the player’s flat number beside it. The building has started to treat the player as a guest.',
        },
        {
          upTo: 100,
          behaviour:
            'He no longer knocks on the player’s door. The lease runs out at the next midnight on the first, and nobody will say so. He will still come if the player calls his name from the roof, once, and he will listen to anything true.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'rent_card',
      name: 'The Rent Card',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'A plain index card taped inside the door of 4C, typed on a machine with a dropped e: RENT: ONE TRUE STORY. DUE MIDNIGHT ON THE FIRST. PAID IN PERSON. Initialled E.V.',
      loreText: 'Under it, on the paint, are forty-one years of tape marks in the same spot.',
      icon: 'card',
    },
    {
      id: 'the_lease',
      name: 'The Lease',
      tags: ['document', 'personal'],
      description:
        'One typed page. Month to month. On the landlord’s line it says D. Moss, p.p. E. Varga, in purple ink, in handwriting that is very obviously Dee’s.',
      loreText: 'There is no amount in the rent box. Somebody has written "see card" in it and underlined it twice.',
      icon: 'papers',
    },
    {
      id: 'key_4c',
      name: 'The Key to 4C',
      tags: ['personal'],
      droppable: false,
      description: 'Heavy, brass and older than the lock it opens, on a ring with a paper tag that says 4C in two different hands.',
      loreText: 'The older of the two hands is Ada Lindqvist’s. She wrote it in 1971.',
      icon: 'key',
    },
    {
      id: 'ada_box',
      name: 'Ada’s Box',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { candour: 1 },
      description:
        'A hatbox on the closet shelf with A.L. on the lid in marker. Inside are forty-one years of carbon copies, one typed sheet a month, and a sealed envelope addressed: To whoever gets 4C next.',
      loreText:
        'Every sheet is a story she told him at the door. She kept a carbon because, she wrote on the first one, a true thing is worth keeping twice. Once the letter is opened it should be read one line at a time, never all at once. It begins: He will ask you for the truth every month and it will feel like a lot. It is the cheapest rent in the city. If he ever stops knocking, go down and knock on his.',
      icon: 'box',
    },
    {
      id: 'rent_ledger',
      name: 'The Rent Ledger',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { digging: 2 },
      description:
        'A clothbound ledger in Elias’s handwriting: every tenant, every month, since December 1974, one line for every story. Some of the lines are blank.',
      loreText:
        'The blank lines are the lies. He left them empty rather than write a lie down, and in fifty years he has never crossed a tenant out.',
      icon: 'book',
    },
    {
      id: 'tax_notice',
      name: 'The Tax Sale Notice',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Yellow paper on the lobby board: the city intends to sell this property at public auction on the tenth at 10:00 for unpaid taxes. Lot 14.',
      loreText:
        'Underneath, in purple ink: OVER MY DEAD BODY. Under that, in small, old-fashioned handwriting: That will not help, Dee.',
      icon: 'letter',
    },
    {
      id: 'pruitt_receipts',
      name: 'Pruitt’s Receipts',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A shoebox of carbon receipts from the city treasurer, one for every tax payment Harold Pruitt made on the building since 1981, rubber-banded by year.',
      loreText: 'The last one is dated two weeks before Pruitt died. It is stamped PAID. That stamp is the whole argument.',
      icon: 'box',
    },
    {
      id: 'hawthorn_stake',
      name: 'The Hawthorn Stake',
      tags: ['quest'],
      questItem: true,
      description:
        'Something long and narrow, wrapped in an old altar cloth, on the top shelf of the sacristy cupboard behind the spare candles.',
      loreText:
        'Father Michael Doyle put it there in December 1974. Father Tom has never unwrapped it. He dusts round it.',
      icon: 'bundle',
    },
    {
      id: 'celine_card',
      name: 'Celine’s Card',
      tags: ['document'],
      description:
        'Heavy black card with an address across town, and on the back, by hand: Ask for the back booth. Bring nothing. C.',
      loreText: 'It smells of a perfume nobody has made since the sixties.',
      icon: 'card',
    },
    {
      id: 'tintype',
      name: 'The Tintype',
      tags: ['personal'],
      description:
        'A small dark photograph on metal: a man who is unmistakably Elias, in a high collar, beside a woman in a wide hat who is laughing at the photographer.',
      loreText: 'Scratched into the back: E. and C., the river, 1893.',
      icon: 'photo',
    },
    {
      id: 'dee_drafts',
      name: 'Dee’s Rent Drafts',
      tags: ['document'],
      description:
        'A curl of laundromat receipt roll covered on the back in Dee’s handwriting: three versions of a story about her sister, every one crossed out.',
      loreText: 'Dee does not have a sister.',
      icon: 'papers',
    },
    {
      id: 'thermos',
      name: 'The Thermos',
      tags: ['personal'],
      consumable: { resourceId: 'energy', amount: 10, consumesItem: true },
      description: 'A dented steel flask that has kept tea hot through six years of night shifts. One good cup left in it.',
      loreText: 'There is a strip of hospital tape on the lid with your name on it, from a ward where things went missing.',
      icon: 'flask',
    },
    {
      id: 'headshots',
      name: 'The Headshots',
      tags: ['personal'],
      skillModifiers: { bluff: 1 },
      description: 'A folder of glossy photographs of you looking trustworthy, which is the professional term for it.',
      loreText: 'The agent who paid for them stopped returning calls in March.',
      icon: 'folder',
    },
    {
      id: 'unopened_letter',
      name: 'The Unopened Letter',
      tags: ['personal', 'document'],
      skillModifiers: { candour: 1 },
      description: 'An envelope with your name on it in a hand you know, which you have carried for nine days and not opened.',
      loreText: 'Whatever is in it is true. That is the trouble with it.',
      icon: 'letter',
    },
    {
      id: 'notebook',
      name: 'The Notebook',
      tags: ['personal', 'document'],
      skillModifiers: { digging: 1 },
      description: 'A reporter’s notebook with a broken spine and, already, four pages about a building that takes rent in stories.',
      loreText: 'The first page says DO NOT WRITE THIS UP in capitals, which you wrote, and have been ignoring.',
      icon: 'book',
    },
  ],
  abilities: [
    {
      id: 'tell_something_true',
      name: 'Pay in Truth',
      tags: ['social'],
      description: 'Tell him something true about yourself, freely, and let it land. This is the rent, and it is also just honesty.',
      affordances: [
        'tell him something true',
        'tell the truth',
        'pay the rent',
        'confess',
        'be honest',
        'tell him a story',
        'admit it',
        'say something true',
      ],
      costs: [{ resourceId: 'energy', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'lie_to_him',
      name: 'Tell Him a Lie',
      tags: ['social'],
      description: 'Make something up and say it as if it were true. Most people in this city will believe you. One will not.',
      affordances: ['lie', 'make something up', 'make up a story', 'pretend', 'bluff', 'fib', 'invent something', 'cover for her'],
      costs: [{ resourceId: 'arrears', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluff', baseDc: 16 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_him_one_back',
      name: 'A Question for a Question',
      tags: ['social'],
      description: 'Pay what you owe, then ask for something true back. He has never once been asked, and he is not sure of the rules.',
      affordances: [
        'ask him something',
        'ask him a question',
        'a question for a question',
        'ask what he is',
        'ask why',
        'ask about her',
        'make him tell me',
        'your turn',
      ],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'invite_in',
      name: 'Ask Them In',
      tags: ['social'],
      description: 'Say the words at your own threshold that let somebody across it. It is easy to say and very hard to take back.',
      affordances: [
        'invite him in',
        'come in',
        'let him in',
        'ask him in',
        'invite her in',
        'step aside',
        'you can come in',
        'you are welcome here',
      ],
      costs: [{ resourceId: 'hunger', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'keep_the_door',
      name: 'Hold the Door',
      tags: ['defensive'],
      description: 'Say no, and mean it, with the door in your hand. Nobody in this house can make you open it.',
      affordances: ['shut the door', 'close the door', 'refuse', 'say no', 'not tonight', 'tell him to go', 'lock the door', 'tell her to leave'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Watch Closely',
      tags: ['sight'],
      description: 'Look properly: where his shoes stop, what his hands do, what Celine does not say, which tenant is avoiding whom.',
      affordances: ['look at him', 'watch him', 'notice', 'study him', 'read her', 'look around', 'take it in', 'watch the room'],
      costs: [{ resourceId: 'energy', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'notice', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'dig_into_it',
      name: 'Dig Into It',
      tags: ['utility'],
      description: 'Go through the paper: a box in a closet, a ledger in a basement, a counter at the records office with a ticket in your hand.',
      affordances: [
        'search',
        'go through the box',
        'read the ledger',
        'look it up',
        'check the paperwork',
        'research',
        'search the closet',
        'argue with the clerk',
      ],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'digging', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fix_it',
      name: 'Fix Something',
      tags: ['utility'],
      description: 'Bleed a radiator, change a landing bulb, rehang a door. The building is old and somebody has to do it in daylight.',
      affordances: ['fix', 'repair', 'bleed the radiator', 'change the bulb', 'patch it', 'help with the building', 'mend', 'unstick the window'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'handiwork', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'be_good_company',
      name: 'Be Good Company',
      tags: ['social'],
      description: 'Make him laugh, tease him, flirt a little, talk about nothing at all. He has not had a conversation that was only for fun in a while.',
      affordances: ['flirt', 'tease him', 'make him laugh', 'joke', 'compliment him', 'smile at him', 'charm her', 'chat'],
      costs: [{ resourceId: 'energy', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stay_up_with_him',
      name: 'Stay Up Till Dawn',
      tags: ['social'],
      description: 'Sit with him on the roof, or on the stairs, or on the church porch, and do not leave until he has to.',
      affordances: ['stay with him', 'sit with him', 'keep him company', 'watch the sky', 'stay till sunrise', 'stay up', 'just be there', 'wait with him'],
      costs: [{ resourceId: 'energy', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'fight_back',
      name: 'Fight Back',
      tags: ['combat'],
      description: 'Shove, swing, throw, grab the nearest heavy thing. In this house it never goes the way you picture it, and it always makes him hungrier.',
      affordances: ['hit him', 'punch', 'shove', 'attack', 'grab the stake', 'throw something', 'slap her', 'fight'],
      costs: [{ resourceId: 'hunger', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'nerve', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_back_the_welcome',
      name: 'Take Back the Welcome',
      tags: ['defensive'],
      description: 'Stand at a threshold you live behind and say the old words that withdraw a welcome. It works on anybody you have let in, and on anybody this house let in before you.',
      affordances: [
        'take back the invitation',
        'uninvite her',
        'revoke it',
        'say the old words',
        'withdraw the welcome',
        'you are not welcome here',
        'take it back',
        'uninvite him',
      ],
      costs: [{ resourceId: 'energy', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'lore', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_old_words'],
        lockedCopy:
          'You would need the right words for that, said the right way, and the only person on this street who knows them is the priest across the road.',
      },
    },
  ],
  locations: [
    {
      id: 'apartment_4c',
      name: 'Apartment 4C',
      shortName: '4C',
      description:
        'The top flat, under the roof. One room with a kitchen along the wall, a slanted ceiling you will hit your head on twice, a radiator that knocks like somebody asking to come in, and a window that looks straight across the street at the church. Your boxes are still taped. A hatbox sits on the closet shelf with A.L. on the lid.',
      artDirection:
        'Small top-floor attic apartment at midnight, slanted ceiling, bare mattress, taped moving boxes, old cast-iron radiator, a window with a lit church across the street, the door open onto a dim landing with a tall figure leaning on the frame. Deep blue night against one warm lamp.',
      connections: [{ to: 'the_stairs', travelMinutes: 1, label: 'Out onto the landing' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'rent_card', qty: 1, ownerId: null, aka: ['the rent card', 'the card on the door', 'index card'] },
        { itemId: 'ada_box', qty: 1, ownerId: null, aka: ['hatbox', 'the box in the closet', 'ada’s box', 'the box'] },
      ],
    },
    {
      id: 'the_stairs',
      name: 'The Stairs',
      shortName: 'Stairs',
      description:
        'Five flights of worn stairs with a brass rail polished by a hundred years of hands. A single bulb on every landing, a window on every half-landing, and a ladder at the top to the roof hatch. Dee’s door, 3B, is one floor down and is very rarely properly shut.',
      artDirection:
        'Narrow old tenement stairwell at night, worn wooden steps, a polished brass handrail spiralling down, one bare bulb per landing, a ladder to a roof hatch at the top, a door ajar one floor down spilling warm light. Gothic and cosy.',
      connections: [
        { to: 'apartment_4c', travelMinutes: 1, label: 'Up to 4C' },
        { to: 'dee_3b', travelMinutes: 1, label: 'Dee’s door, 3B' },
        { to: 'the_roof', travelMinutes: 2, label: 'Up the ladder to the roof' },
        { to: 'the_lobby', travelMinutes: 2, label: 'All the way down' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_roof',
      name: 'The Roof',
      shortName: 'Roof',
      description:
        'Tar and gravel, a dead water tank, two folding chairs nobody admits to owning, and the whole city lit up to the river. The church bell tower is close enough to read the clock. This is where Elias watches the east until the last safe minute.',
      artDirection:
        'Flat tenement rooftop at four in the morning, gravel, an old water tank, two folding chairs, city lights to the horizon, a church bell tower close by, the sky just starting to lighten in the east. Lonely and romantic.',
      connections: [{ to: 'the_stairs', travelMinutes: 2, label: 'Down the ladder' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [],
    },
    {
      id: 'dee_3b',
      name: 'Apartment 3B',
      shortName: 'Dee’s',
      description:
        'Plants on every surface, a drinks trolley used entirely for tea, a sofa with a permanent dent, and a grey cat called Deposit who belongs to nobody and lives here. The door is always on the latch. Dee says that is a policy.',
      artDirection:
        'Cluttered warm apartment at night, hanging plants, fairy lights, a trolley of teapots and mugs, a sagging sofa with a grey cat on it, laundry baskets by the door. Messy, colourful, welcoming.',
      connections: [{ to: 'the_stairs', travelMinutes: 1, label: 'Back onto the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'dee_drafts', qty: 1, ownerId: 'dee', aka: ['receipt roll', 'her drafts', 'the crossed-out story', 'dee’s notes'] },
      ],
    },
    {
      id: 'the_lobby',
      name: 'The Lobby',
      shortName: 'Lobby',
      description:
        'Black and white tiles, nine brass mailboxes with four names on them, a noticeboard, and a narrow door under the stairs with no handle on the outside. Gus’s door, 1A, is propped open with a slipper.',
      artDirection:
        'Old apartment building lobby at night, chequered floor tiles, a wall of brass mailboxes, a cork noticeboard with a yellow notice pinned to it, a narrow handleless door under the stairs, a doorway propped open with a slipper. Dim, tidy, a little grand once.',
      connections: [
        { to: 'the_stairs', travelMinutes: 2, label: 'Up the stairs' },
        { to: 'apartment_1a', travelMinutes: 1, label: 'Gus’s door, 1A' },
        { to: 'the_basement', travelMinutes: 1, lockedByFlag: 'knows:what_he_is', label: 'The door under the stairs' },
        { to: 'ashby_street', travelMinutes: 1, label: 'Out to the street' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'tax_notice', qty: 1, ownerId: null, aka: ['notice', 'the yellow notice', 'the tax notice', 'the auction notice'] },
        { itemId: 'celine_card', qty: 1, ownerId: 'celine', aka: ['her card', 'the black card', 'business card', 'celine’s card'] },
      ],
    },
    {
      id: 'apartment_1a',
      name: 'Apartment 1A',
      shortName: 'Gus’s',
      description:
        'Floor-to-ceiling newspapers in labelled bundles, a typesetter’s cabinet of tiny drawers, a radio that has been on since 1969, and an armchair placed to see everybody who comes in the street door.',
      artDirection:
        'Small ground-floor apartment crammed with bundled newspapers, an antique typesetter’s cabinet of tiny drawers, a valve radio glowing, a worn armchair facing the open door. Sepia, orderly, crowded.',
      connections: [{ to: 'the_lobby', travelMinutes: 1, label: 'Back to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'pruitt_receipts', qty: 1, ownerId: 'gus', aka: ['receipts', 'the shoebox', 'pruitt’s receipts', 'the tax receipts'] },
      ],
    },
    {
      id: 'the_basement',
      name: 'The Basement',
      shortName: 'Basement',
      description:
        'Below the boiler room, through a door that locks from the inside: one long cool room with a desk, a green lamp, a ledger, a wall of photographs older than the building, and a second door, heavy, with no keyhole at all. Elias sleeps behind that one. Nobody goes through it.',
      artDirection:
        'Long cool basement room lit by one green desk lamp, an old writing desk with a clothbound ledger, a wall of antique framed photographs, a heavy door with no keyhole at the far end. Quiet, private, a little sad.',
      connections: [{ to: 'the_lobby', travelMinutes: 1, label: 'Back up to the lobby' }],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'rent_ledger', qty: 1, ownerId: 'elias', aka: ['ledger', 'the rent book', 'his ledger', 'the clothbound book'] },
        { itemId: 'tintype', qty: 1, ownerId: 'elias', aka: ['the old photograph', 'tintype', 'the photo of them', 'the metal photograph'] },
      ],
    },
    {
      id: 'ashby_street',
      name: 'Ashby Street',
      shortName: 'Street',
      description:
        'A narrow street of old walk-ups that has been about to be redeveloped since 1990. St. Anselm’s on one side, Varga House on the other, the all-night laundromat on the corner glowing blue, and a cab rank by the bus shelter.',
      artDirection:
        'Narrow city street at night, old brick walk-up buildings, a brick church opposite, a laundromat glowing blue on the corner, wet pavement, a bus shelter and a waiting taxi. Quiet, lamplit, slightly rainy.',
      connections: [
        { to: 'the_lobby', travelMinutes: 1, label: 'Back into Varga House' },
        { to: 'st_anselm', travelMinutes: 2, label: 'Across to the church' },
        { to: 'the_laundromat', travelMinutes: 2, label: 'The laundromat on the corner' },
        { to: 'the_orchid_room', travelMinutes: 12, label: 'A cab across town' },
        { to: 'records_office', travelMinutes: 25, label: 'The bus downtown' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [],
    },
    {
      id: 'st_anselm',
      name: 'St. Anselm’s',
      shortName: 'Church',
      description:
        'A brick church with a deep stone porch, a chessboard set up on the porch bench under a plastic cover, and a nave Elias will not walk into. The sacristy cupboard behind the altar is where Father Tom keeps the spare candles and one other thing.',
      artDirection:
        'Small brick parish church at night, a deep stone porch lit by one buzzing lamp, a chessboard on the bench under a clear plastic cover, the doors open on a candlelit nave. Warm against the cold.',
      connections: [{ to: 'ashby_street', travelMinutes: 2, label: 'Back across the street' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'hawthorn_stake', qty: 1, ownerId: 'tom', aka: ['the stake', 'the cloth bundle', 'the thing in the cupboard', 'the wrapped bundle'] },
      ],
    },
    {
      id: 'the_laundromat',
      name: 'The All-Night Laundromat',
      shortName: 'Laundromat',
      description:
        'Twenty machines, three of which work properly, a folding table, a vending machine that only sells soup, and fluorescent light at four in the morning. Dee owns it. Half the people who have ever lived in Varga House were found here.',
      artDirection:
        'All-night laundromat at four in the morning, rows of washing machines, harsh fluorescent light, a folding table, a soup vending machine, rain on the window and the dark street outside. Lonely, blue-white, oddly cosy.',
      connections: [{ to: 'ashby_street', travelMinutes: 2, label: 'Back to the street' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [],
    },
    {
      id: 'the_orchid_room',
      name: 'The Orchid Room',
      shortName: 'Orchid Room',
      description:
        'A late bar across town behind an unmarked green door: velvet booths, a piano nobody plays before two, and a back booth that is always reserved. It opens at eleven at night and closes an hour before dawn, and some of its regulars have not seen daylight in a century.',
      artDirection:
        'Intimate late-night jazz bar, deep green velvet booths, a grand piano, low amber lamps, a reserved back booth half in shadow, an unmarked green door. Rich, elegant, quietly dangerous.',
      connections: [{ to: 'ashby_street', travelMinutes: 12, label: 'A cab back to Ashby Street' }],
      discoveredByDefault: false,
      mapPosition: { x: 2, y: 4 },
      takeableItems: [],
    },
    {
      id: 'records_office',
      name: 'The Records Office',
      shortName: 'Records',
      description:
        'The city treasurer’s counter on the second floor of an annex downtown: numbered tickets, a long queue, a clerk who has seen every trick, and the auction room next door where Lot 14 will be sold at ten on the tenth. It is open from nine until half past four, while everybody else who lives in Varga House is asleep.',
      artDirection:
        'Fluorescent municipal records office by day, a long counter with numbered ticket machine, filing cabinets, a queue of tired people, a door marked AUCTION ROOM. Bright, bureaucratic, the only daylight scene in the story.',
      connections: [{ to: 'ashby_street', travelMinutes: 25, label: 'The bus back' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 4 },
      takeableItems: [],
    },
  ],
  /**
   * Order matters: PUBLIC_VIOLENCE takes the first faction in the array, and
   * a fight anywhere near this house costs you the people who live in it.
   */
  factions: [
    {
      id: 'faction_tenants',
      name: 'The Tenants of Varga House',
      description:
        'Gus in 1A since 1969, Marisol Reyes in 2B who drives the night bus, Dee in 3B, and now you. They pay rent in true stories, keep each other’s spare keys, and would lie to anybody on earth to protect the arrangement, except to him.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'New in 4C' },
        { atReputation: 35, label: 'Known on the stairs' },
        { atReputation: 65, label: 'Has a key to the roof' },
      ],
      allies: ['faction_st_anselm'],
      enemies: [],
    },
    {
      id: 'faction_st_anselm',
      name: 'St. Anselm’s',
      description:
        'The parish across the street: Father Tom, a soup line on weekday mornings, eleven regulars at evening Mass, and a porch where a vampire has played chess most nights for twenty years. They know more than they say, and they say grace over it.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'A stranger at the door' },
        { atReputation: 30, label: 'Fed on weekdays' },
        { atReputation: 60, label: 'Asked to stay for the game' },
      ],
      allies: ['faction_tenants'],
      enemies: [],
    },
    {
      id: 'faction_orchid_room',
      name: 'The Orchid Room',
      description:
        'Celine’s bar, and the four or five people in this city who are what Elias is and never stopped drinking. Courteous, rich, bored, and very interested in anybody he has let into his building.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A stranger at the bar' },
        { atReputation: 25, label: 'Welcome in the back booth' },
        { atReputation: 55, label: 'One of Celine’s own' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'elias',
      name: 'Elias Varga',
      role: 'Your landlord. Collects the rent at midnight on the first, in person, from the landing side of your door',
      cardBlurb:
        'He owns the building, he only comes at night, and he will not cross your doorstep unless you ask. He takes the rent in true things, he can always tell when you lie, and until tonight he did not know anybody was living in your flat.',
      pronouns: 'he/him',
      publicTraits: ['Courteous in an old-fashioned way', 'Drier and funnier than he lets on', 'Never in a hurry, even when he should be'],
      hiddenDrives: [
        'He is starving and has decided that is nobody’s business but his own',
        'He wants somebody to know him as he is now, rather than as what he used to be, and he has not wanted that since Ada died',
      ],
      values: ['A thing said plainly', 'Keeping his word, especially the old ones', 'This building and the people in it'],
      fears: [
        'Being hungry enough, one night, to stop being himself',
        'Becoming fond of a tenant again, and outliving them again',
        'Celine being right about him',
      ],
      socialStyle:
        'Stays on his side of every threshold. Listens with his whole attention, asks one question where other people would ask five, and leaves a little before he is tired of you.',
      boundaries: [
        'Will not cross a threshold uninvited, and will never trick anybody into inviting him',
        'Will not drink from you, whatever you offer; push it and he leaves the building for the night',
        'Will not take a lie as rent, although he may let you stay anyway',
        'Will not step over the first time he is asked in. It startles him, because nobody has said it to him since Ada. He stays on the landing, tells the player plainly that a welcome lasts until they take it back at this threshold, and crosses only if they say it again knowing that. Even inside he stays near the door, because a warm room and a person close make the hunger worse',
        'Will not argue with a shut door: he says goodnight through it and goes on down the stairs',
        'Will not tell the alley in November 1974 to anybody who asks for it. He tells it only on the roof, unasked, to somebody who has paid him in truth and wants nothing back',
      ],
      goals: [
        'Decide whether the stranger Dee put in 4C gets to stay',
        'Keep the building out of Celine’s hands without asking anybody for help',
      ],
      secrets: [
        {
          id: 'elias_1974',
          fact: 'On a night in November 1974 he nearly killed a stranger in an alley off Ashby Street, a man who had been kind to him, and stopped in time. Gus found him shaking on the stairs before dawn and walked him across to the church. He asked the priest there to help him stop for good, and the rent in stories began the next month.',
          visibility: 'NPC_PRIVATE',
          revealHint:
            'He tells it himself, on the roof, only to somebody who has paid at least one month in truth and has asked him for nothing in return.',
        },
        {
          id: 'elias_starving',
          fact: 'He is close to the edge. Three tenants’ stories a month are not enough, and he has been sleeping a little longer every day since spring.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Dee will say it if she is asked straight. He will never say it, and he will change the subject to the radiator.',
        },
        {
          id: 'elias_ada',
          fact: 'Ada Lindqvist, who lived in 4C for forty-four years, was the closest he came to loving anybody after Celine. He read at her funeral from the back of the church, at night, and the priest let him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you find her box and tell him so before you have read any of it.',
        },
      ],
      speechStyle:
        'Quiet, exact and courteous, with a dry edge. Short sentences, never a swear word. Calls the player Four-C until he is given a reason to use their name. Answers a question with a question when he is hiding something, and says thank you every time he is told something true, never in the same words twice.',
      topics: ['the rent', 'the building', 'Ada', 'Celine', 'the porch game', 'what he is', 'the roof'],
      voiceSamples: [
        'Rent’s due. Tell me something true, and you can stay the month.',
        'Thank you. That one was real. I could feel the edges of it.',
        'I don’t come in. It isn’t superstition. Well. It’s mostly manners.',
        'You lied just then, Four-C. It’s all right. Try a smaller one; the small ones are usually true.',
        'I’ve been twenty-nine since eighteen ninety-one. It stops being interesting around the second war.',
      ],
      appearance:
        'Looks twenty-nine and has since 1891. Tall, pale, dark hair a little too long, a charcoal overcoat older than the building, and a good white shirt buttoned to the collar.',
      visualHook: 'He leans on doorframes and never crosses them; his shoes stop exactly at the line.',
      silhouette: 'Tall and narrow in a long coat, one shoulder against a doorframe, hands in his pockets.',
      artSeed: 'rots-elias-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'warm', 'guarded', 'sorrowful'],
      schedule: [
        { startMinute: 0, endMinute: 40, locationId: 'apartment_4c', activity: 'on the landing side of the doorframe of 4C, collecting the rent and not coming in' },
        { startMinute: 40, endMinute: 110, locationId: 'the_stairs', activity: 'collecting the rest of the rent, floor by floor' },
        { startMinute: 110, endMinute: 230, locationId: 'st_anselm', activity: 'the porch game with Father Tom' },
        { startMinute: 230, endMinute: 330, locationId: 'the_roof', activity: 'on the roof, watching the east' },
        { startMinute: 330, endMinute: 1050, locationId: 'the_basement', activity: 'asleep behind the door with no keyhole' },
        { startMinute: 1050, endMinute: 1200, locationId: 'the_lobby', activity: 'up at sundown, fixing whatever the building broke today' },
        { startMinute: 1200, endMinute: 1440, locationId: 'ashby_street', activity: 'walking the block, then sitting in the laundromat while Dee works' },
      ],
      homeLocationId: 'the_basement',
      knowledgeScope: ['elias', 'varga_house', 'the_rent', 'ada', 'celine', 'november_1974', 'the_old_rules', 'the_tax_sale'],
      startingRelationship: { trust: 20, affection: 15, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'elias_takes_you_down',
          label: 'He takes you down to the basement',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['knows:what_he_is'] },
        },
        {
          id: 'elias_tells_1974',
          label: 'He tells you about November 1974',
          kind: 'TRUST',
          requires: { trust: 70, flagsSet: ['paid_this_month'] },
        },
        {
          id: 'elias_falls',
          label: 'He stops keeping a hand on the doorframe',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 70 },
        },
      ],
      attributes: { might: 18, agility: 16, mind: 15, presence: 15, resolve: 16, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'celine',
      name: 'Celine Marchand',
      role: 'The vampire who made Elias, and his ex. Runs a late bar across town and has come back for him',
      cardBlurb:
        'She made Elias in 1891 and left him in 1974, and she has come back to buy the building out from under you. She is charming, she is not lying about loving him, and she would very much like your help.',
      pronouns: 'she/her',
      publicTraits: ['Glamorous and knows it', 'Generous with money and with attention', 'Honest about exactly what she is'],
      hiddenDrives: [
        'She believes the rent is a slow way of dying and that she is the only one who will stop it',
        'She is lonelier than she has been in a century and calls it boredom',
      ],
      values: ['Being alive at full strength, not halfway', 'Loyalty to the people she made'],
      fears: ['Outliving him', 'That he has found something she cannot give him'],
      socialStyle:
        'Treats every room as hers and every person in it as a guest, including in other people’s homes. Compliments first, asks second, and pays for everything.',
      boundaries: [
        'Will not lie to you, because she finds lying common; she simply does not say everything at once',
        'Will not harm anybody under his roof, because he would never forgive it, and that is the one thing she is careful about',
      ],
      goals: ['Win Varga House at the auction on the tenth', 'Bring Elias back to the old way before he fades out'],
      secrets: [
        {
          id: 'celine_the_bid',
          fact: 'She is the bidder behind the lawyer at the tax sale, and she reported the unpaid taxes to the city herself, a week after Pruitt died.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Ask her directly, in the back booth at the Orchid Room. She will not lie. She just will not volunteer it.',
        },
        {
          id: 'celine_the_welcome',
          fact: 'She still holds the welcome to the lobby and stairs that Elias gave her in 1952. If somebody who lives in the house takes it back at the street door, it is gone for good.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Father Tom knows it, and so does Gus, who remembers her visiting in the sixties.',
        },
      ],
      speechStyle:
        'Warm, lavish and amused, a little theatrical. Calls everybody darling and uses the player’s name the moment she has it. Says the cruel thing gently and the kind thing as if it were a joke.',
      topics: ['Elias', 'the auction', 'the old way', 'the Orchid Room', '1891', 'what she wants'],
      voiceSamples: [
        'Darling, I never lie. It’s so common. I simply don’t say everything at once.',
        'He has been eating crumbs for fifty years and calling it virtue.',
        'Name a number. A year of rent, in actual money. Then go and live somewhere with a lift.',
        'I gave him eighty-three years. What did you give him? A paragraph?',
      ],
      appearance:
        'Looks thirty-four and has since 1884. A sleek black bob, red lipstick, a long camel coat over a silk blouse, and leather gloves.',
      visualHook: 'Leather gloves she takes off one finger at a time when she is about to ask for something.',
      silhouette: 'Long camel coat, chin up, one gloved hand resting on a banister as if she owns it.',
      artSeed: 'rots-celine-01',
      portrait: null,
      expressions: ['amused', 'warm', 'cold', 'wounded'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_orchid_room', activity: 'holding court in the back booth' },
        { startMinute: 330, endMinute: 1140, locationId: 'the_orchid_room', activity: 'behind a locked door at the back of her bar until sundown' },
        { startMinute: 1140, endMinute: 1440, locationId: 'the_orchid_room', activity: 'opening up and choosing the music' },
      ],
      homeLocationId: 'the_orchid_room',
      knowledgeScope: ['celine', 'elias', '1891', 'the_old_rules', 'the_tax_sale', 'the_orchid_room'],
      startingRelationship: { trust: 10, affection: 10, respect: 20, fear: 0, rivalry: 30 },
      gates: [
        {
          id: 'celine_levels_with_you',
          label: 'She tells you what she actually wants',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'celine_backs_off',
          label: 'She considers that she might be wrong',
          kind: 'ALLIANCE',
          requires: { respect: 55, flagsSet: ['knows:celine_wants_him_back'] },
        },
      ],
      attributes: { might: 17, agility: 17, mind: 15, presence: 18, resolve: 14, arcana: 17 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'dee',
      name: 'Dee Moss',
      role: 'Your neighbour in 3B. Runs the all-night laundromat on the corner, and posted the ad for your flat',
      cardBlurb:
        'She lives one floor down, she put up the ad for your flat without telling the landlord, and she needs you to stay. She will tell you anything about this building except why.',
      pronouns: 'she/her',
      publicTraits: ['Talks fast and means all of it', 'Feeds people', 'Nosy as a professional skill'],
      hiddenDrives: [
        'She is frightened Elias is fading, and she found you because she could not think of anything else to do',
        'She has been lying on her own rent for three months, and he has let her',
      ],
      values: ['Looking after the people on these stairs', 'Doing the thing first and apologising after'],
      fears: ['Waking up one evening to an empty basement', 'You leaving because of something she did'],
      socialStyle:
        'Sits on stairs. Arrives with two mugs and assumes one is wanted. Tells you three things about other people before one about herself.',
      boundaries: [
        'Will not tell you what Elias is in your first week; she says that is his to tell',
        'Will not let anybody talk down to Gus',
      ],
      goals: ['Keep you in 4C past the first month', 'Get Elias to eat properly before the winter'],
      secrets: [
        {
          id: 'dee_the_ad',
          fact: 'She posted the ad for 4C, signed the lease on Elias’s behalf and gave you the key, all without telling him. He found out at midnight, when you opened your door.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'The signature on the lease gives it away; or she confesses on the stairs if you are kind to her about the card on the door.',
        },
        {
          id: 'dee_her_rent',
          fact: 'Her last three rent stories were made up. She ran out of true things she was willing to say out loud, and he accepted the lies anyway and wrote nothing in the ledger.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you at the laundromat at four in the morning, if you have told her something true about yourself first.',
        },
      ],
      speechStyle:
        'Fast, warm and run-on, full of "okay so" and side-comments. Calls everybody babe, and calls Elias His Lordship when he is out of earshot. Changes the subject to food when she is scared.',
      topics: ['the building', 'the laundromat', 'the ad', 'Gus', 'Elias', 'her rent', 'Deposit the cat'],
      voiceSamples: [
        'Okay so, technically, legally, the lease is fine. Mostly. I signed it. For him. Don’t make that face.',
        'Babe, everyone in this building has a story they’re saving for a bad month. Find yours.',
        'His Lordship hasn’t been up on the roof in a week. That’s new. I hate new.',
        'I’ve got two mugs, one teabag, and absolutely no plan. Sit.',
      ],
      appearance:
        'Thirty-one, curly copper hair tied up in a headscarf, freckles, and an oversized cardigan with laundromat tokens in both pockets.',
      visualHook: 'A headscarf and a baggy cardigan whose pockets jingle with laundromat tokens.',
      silhouette: 'Sitting on a stair with her knees up and a mug in each hand.',
      artSeed: 'rots-dee-01',
      portrait: null,
      expressions: ['warm', 'laughing', 'worried', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 90, locationId: 'dee_3b', activity: 'home for the midnight rent, door ajar, listening' },
        { startMinute: 90, endMinute: 420, locationId: 'the_laundromat', activity: 'the night shift at her laundromat' },
        { startMinute: 420, endMinute: 840, locationId: 'dee_3b', activity: 'asleep with the blackout blind down' },
        { startMinute: 840, endMinute: 1080, locationId: 'ashby_street', activity: 'errands, coffee, and talking to everybody on the street' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_laundromat', activity: 'the evening rush at the laundromat' },
      ],
      homeLocationId: 'dee_3b',
      knowledgeScope: ['varga_house', 'the_rent', 'the_ad', 'gus', 'the_laundromat', 'elias'],
      startingRelationship: { trust: 40, affection: 45, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'dee_tells_you_what_he_is',
          label: 'She tells you what he is',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
        {
          id: 'dee_confesses',
          label: 'She tells you about her own rent',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:what_he_is'] },
        },
      ],
      attributes: { might: 10, agility: 12, mind: 13, presence: 15, resolve: 12, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'tom',
      name: 'Father Tom Kowalski',
      calledName: 'Father Tom',
      role: 'The priest at St. Anselm’s across the street, and Elias’s chess partner for twenty years',
      cardBlurb:
        'He has known what your landlord is for twenty years and plays chess with him on the church porch most nights after two. He will tell you the truth about Elias, and he will tell you to be careful, in that order.',
      pronouns: 'he/him',
      publicTraits: ['Big, calm and hard to shock', 'A former firefighter, and it shows in how he stands', 'Funny without changing his expression'],
      hiddenDrives: [
        'He carries a promise he inherited and prays never to keep',
        'He thinks Elias is the most honest parishioner he has, and worries what that says about the parish',
      ],
      values: ['Telling people what they are walking into', 'A promise is a promise, even an inherited one'],
      fears: ['The night Elias asks him to keep it', 'Being the reason a new tenant gets hurt'],
      socialStyle:
        'Asks the practical questions first, whether you have eaten, whether your door locks, and the spiritual ones much later, if at all.',
      boundaries: [
        'Will not repeat anything said to him in confession, including by Elias',
        'Will not help anybody hurt Elias while Elias is still himself',
      ],
      goals: ['Finish the chess game they started in March', 'Make sure the new tenant knows what they are living above'],
      secrets: [
        {
          id: 'tom_the_promise',
          fact: 'His predecessor, Father Michael Doyle, promised Elias in 1974 that if he ever drank again the parish would end it, and Tom took the promise over with the keys. A hawthorn stake wrapped in an altar cloth sits in the sacristy cupboard for it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He opens the cupboard only for somebody who asks what would happen if Elias broke, and who he believes is asking for Elias’s sake.',
        },
        {
          id: 'tom_the_words',
          fact: 'He knows the old words for taking back a welcome at a threshold, and he knows Celine’s welcome to the house was never withdrawn.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He teaches them to anybody who tells him something true and asks for a way to protect the house rather than to hurt anyone.',
        },
      ],
      speechStyle:
        'Plain and unhurried, with gravel in it. Short practical questions. Fire-service habits: he counts exits and says "right" to close a subject. Delivers a joke flat and smiles a beat after it lands.',
      topics: ['Elias', 'the porch game', 'the old rules', 'Father Doyle', 'the promise', 'the soup line'],
      voiceSamples: [
        'Right. Have you eaten? Then sit down, and we’ll do the frightening part after soup.',
        'He’s the gentlest man I know. He’s also not a man. Hold both.',
        'Fifteen years I ran into burning buildings. Never once as nervous as I am playing him at chess.',
        'Confession is mine. Rent is his. Same trade, roughly. Different hours.',
      ],
      appearance:
        'Fifty-eight, broad and heavy-shouldered, a grey crew cut, a black clerical shirt with the sleeves rolled up, and old burn scars on both forearms.',
      visualHook: 'Rolled sleeves over old burn scars, and a clerical collar he tugs at when he is thinking.',
      silhouette: 'Big and square on a church porch bench, leaning over a chessboard with his elbows on his knees.',
      artSeed: 'rots-tom-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'concerned', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 110, locationId: 'st_anselm', activity: 'the church lights on late, in case somebody comes in' },
        { startMinute: 110, endMinute: 230, locationId: 'st_anselm', activity: 'the porch game with Elias' },
        { startMinute: 230, endMinute: 420, locationId: 'st_anselm', activity: 'asleep in the rectory behind the church' },
        { startMinute: 420, endMinute: 720, locationId: 'st_anselm', activity: 'morning Mass and the soup line' },
        { startMinute: 720, endMinute: 1020, locationId: 'ashby_street', activity: 'visiting the housebound on Ashby Street, Gus included' },
        { startMinute: 1020, endMinute: 1440, locationId: 'st_anselm', activity: 'evening confession, then the long quiet' },
      ],
      homeLocationId: 'st_anselm',
      knowledgeScope: ['elias', 'st_anselm', 'the_old_rules', 'father_doyle', 'the_promise', 'celine'],
      startingRelationship: { trust: 30, affection: 25, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'tom_teaches_the_words',
          label: 'He teaches you the old words',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'tom_opens_the_cupboard',
          label: 'He shows you what is in the sacristy cupboard',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:what_he_is'] },
        },
      ],
      attributes: { might: 15, agility: 10, mind: 13, presence: 13, resolve: 16, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'gus',
      name: 'Gus Bellweather',
      role: 'The oldest tenant. Ground floor, 1A, since 1969. A retired newspaper typesetter',
      cardBlurb:
        'He has paid his rent with a true story every month for more than fifty years, he keeps every scrap of paper the building has ever produced, and he has decided to like you before you have done anything to earn it.',
      pronouns: 'he/him',
      publicTraits: ['Sharp as a tack and slow on the stairs', 'Keeps everything on paper', 'Tells the same story every month, differently'],
      hiddenDrives: [
        'He knows he has not many rents left, and wants the building safe before he goes',
        'He was the one who found Elias on the stairs in 1974, and has never told it as his rent',
      ],
      values: ['Getting the facts straight before the deadline', 'Proper type, proper ink, proper receipts'],
      fears: ['Dying owing anybody anything', 'The building being sold to somebody who will paint over the lobby tiles'],
      socialStyle:
        'Holds the door of 1A open with a slipper and talks to you through it until you come in. Produces a document for every claim he makes.',
      boundaries: [
        'Will not leave the building after dark, and has not since 1990',
        'Will not speak ill of Celine, because she was kind to him in the sixties',
      ],
      goals: [
        'Get Pruitt’s receipts to somebody who can still manage the bus downtown',
        'Tell his last true story before he runs out of months',
      ],
      secrets: [
        {
          id: 'gus_the_receipts',
          fact: 'He has Harold Pruitt’s carbon receipts for every tax payment on the building since 1981 in a shoebox under his bed. They prove the city’s record is a clerical error.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He offers them to anybody who brings him the yellow notice and asks what he thinks.',
        },
        {
          id: 'gus_1974',
          fact: 'He found Elias on the third-floor stairs before dawn one night in November 1974, shaking and grey, and walked him across the street to the church.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it if he trusts you enough to tell it in front of you, and only after you have told him one true thing of your own.',
        },
      ],
      speechStyle:
        'Slow, precise newspaper diction. Begins with "for the record", gives dates in full, and corrects his own facts mid-sentence. Calls the player by their surname, like a byline, once he has it, and "the new tenant" until then.',
      topics: ['the building’s history', 'Pruitt', 'the receipts', 'Ada', '1974', 'typesetting'],
      voiceSamples: [
        'For the record: I was here first. Nineteen sixty-nine. Before they took the lift out. There was a lift.',
        'Every claim needs a receipt, new tenant. I have the receipts.',
        'Correction. It was a Tuesday. Set that in bold type, it matters.',
        'Ada Lindqvist borrowed my good scissors in nineteen seventy-two. She returned them in two thousand and nine. I made a note of both.',
      ],
      appearance:
        'Eighty-nine, small and very upright, white hair combed back, a cardigan over a pressed shirt and tie, and ink stains on his fingers that have never quite washed out.',
      visualHook: 'Ink-stained fingertips and a tie worn every single day.',
      silhouette: 'Small and straight-backed in an armchair facing an open door.',
      artSeed: 'rots-gus-01',
      portrait: null,
      expressions: ['warm', 'precise', 'tired', 'amused'],
      schedule: [
        { startMinute: 0, endMinute: 60, locationId: 'apartment_1a', activity: 'up for the rent, door propped open with a slipper' },
        { startMinute: 60, endMinute: 420, locationId: 'apartment_1a', activity: 'asleep with the radio on low' },
        { startMinute: 420, endMinute: 600, locationId: 'apartment_1a', activity: 'reading three newspapers in order of size' },
        { startMinute: 600, endMinute: 720, locationId: 'the_lobby', activity: 'sorting everybody’s post' },
        { startMinute: 720, endMinute: 1080, locationId: 'apartment_1a', activity: 'the crossword, in ink' },
        { startMinute: 1080, endMinute: 1320, locationId: 'apartment_1a', activity: 'door propped open, radio on, receiving visitors' },
        { startMinute: 1320, endMinute: 1440, locationId: 'apartment_1a', activity: 'turned in early, as he has since 1990' },
      ],
      homeLocationId: 'apartment_1a',
      knowledgeScope: ['varga_house', 'pruitt', 'the_tax_sale', 'ada', 'november_1974', 'celine'],
      startingRelationship: { trust: 35, affection: 40, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'gus_shows_the_receipts',
          label: 'He brings out the shoebox',
          kind: 'TRUST',
          requires: { trust: 40 },
        },
        {
          id: 'gus_tells_1974',
          label: 'He tells you what he found on the stairs',
          kind: 'TRUST',
          requires: { trust: 65 },
        },
      ],
      attributes: { might: 6, agility: 6, mind: 16, presence: 12, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_rent_is_due',
      title: 'Rent Is Due',
      summary: 'It is midnight on the first, the landlord is at your door, and he will not take money.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['elias', 'dee', 'gus'],
      involvedLocationIds: ['apartment_4c', 'the_stairs', 'the_roof'],
      knownRewardCopy: 'A month in 4C, if he believes you, and some idea of what you have moved into.',
      steps: [
        {
          id: 'the_first_payment',
          playerCopy: 'Pay the rent, or don’t.',
          directorNotes:
            'Every answer here is a real answer and none of them ends the story. A true thing, however small, is accepted with a thank-you and visibly matters to him. A lie is heard instantly; he says so mildly, or lets it go with a look, and remembers either way. Asking him in startles him: nobody has said it since Ada, and he still will not step over until he is sure the player understands what they said. Shutting the door is allowed, and he goes on down the stairs. He does not mention that he did not put up the ad unless the player shows him the lease or asks how they got the flat.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'paid_in_truth',
              label: 'Tell him something true',
              predicate: { flagsSet: ['used:tell_something_true'] },
              setsFlags: ['paid_this_month', 'told_him_true'],
              closesFlags: ['lied_on_rent'],
            },
            {
              routeId: 'lied_to_him',
              label: 'Tell him a good lie',
              predicate: { flagsSet: ['used:lie_to_him'] },
              setsFlags: ['lied_on_rent'],
              closesFlags: ['told_him_true'],
            },
            {
              routeId: 'traded_questions',
              label: 'Pay, and ask him one back',
              predicate: { flagsSet: ['used:ask_him_one_back'] },
              setsFlags: ['paid_this_month', 'traded_questions'],
              closesFlags: [],
            },
            {
              routeId: 'asked_him_in',
              label: 'Ask him in',
              predicate: { flagsSet: ['used:invite_in'] },
              setsFlags: ['invited_him_in'],
              closesFlags: [],
            },
            {
              routeId: 'shut_the_door',
              label: 'Shut the door on him',
              predicate: { flagsSet: ['used:keep_the_door'] },
              setsFlags: ['refused_rent'],
              closesFlags: ['paid_this_month'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['knows:the_rent_rule'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_night',
          playerCopy: 'Find out who else lives on these stairs.',
          directorNotes:
            'The building at one in the morning. Dee is on the stairs with two mugs, Gus is awake in 1A with the radio on, the roof hatch is open, and the church porch light is on across the road. Nothing forces itself on the player. If they go to bed, let the radiator knock and let that be the scene.',
          enterWhen: { flagsSet: ['knows:the_rent_rule'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'met_dee',
              label: 'Sit on the stairs with Dee',
              predicate: { flagsSet: ['spoke:dee'] },
              setsFlags: ['met_the_neighbour'],
              closesFlags: [],
            },
            {
              routeId: 'met_gus',
              label: 'Knock on the open door of 1A',
              predicate: { flagsSet: ['spoke:gus'] },
              setsFlags: ['met_gus'],
              closesFlags: [],
            },
            {
              routeId: 'followed_him_up',
              label: 'Climb up to the roof after him',
              predicate: { flagsSet: ['spoke:elias'], atLocation: 'the_roof' },
              setsFlags: ['roof_with_him'],
              closesFlags: [],
            },
            {
              routeId: 'kept_to_yourself',
              label: 'Stay in 4C and listen to the building',
              predicate: { flagsSet: ['used:read_them'] },
              setsFlags: ['kept_quiet'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_what_he_is',
      title: 'What He Is',
      summary: 'A landlord who never comes in, never comes out by day, and can hear a lie from the next landing.',
      kind: 'MAIN',
      involvedCharacterIds: ['elias', 'dee', 'tom', 'gus', 'celine'],
      involvedLocationIds: ['the_roof', 'st_anselm', 'the_basement', 'apartment_1a'],
      knownRewardCopy: 'The plain word for what your landlord is, and the reason he eats the truth.',
      discoverWhen: { flagsSet: ['knows:the_rent_rule'] },
      steps: [
        {
          id: 'find_out_what_he_is',
          playerCopy: 'Find out what Elias Varga is.',
          directorNotes:
            'Five ways to learn it and they land differently. Dee will not say it in the first week unless she trusts the player a lot, because it is his to tell. Father Tom says it plainly once he trusts the player, with soup. Watching him on the roof as the sky turns is seeing it. Celine just says it, delighted nobody else has. Asking Elias for a truth back is the version he respects most. Nobody uses a franchise word for it. The word is vampire and people say it quietly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'Ask him, as a question for a question',
              predicate: {
                flagsSet: ['used:ask_him_one_back'],
                minRelationship: [{ characterId: 'elias', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:what_he_is', 'he_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'dee_told_you',
              label: 'Get it out of Dee',
              predicate: { minRelationship: [{ characterId: 'dee', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:what_he_is', 'dee_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'tom_told_you',
              label: 'Ask the priest across the road',
              predicate: {
                flagsSet: ['spoke:tom'],
                minRelationship: [{ characterId: 'tom', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:what_he_is', 'tom_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'saw_it_yourself',
              label: 'Watch him on the roof as the sky turns',
              predicate: { flagsSet: ['used:read_them'], atLocation: 'the_roof' },
              setsFlags: ['knows:what_he_is', 'saw_it_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'celine_told_you',
              label: 'Let his ex tell you',
              predicate: { flagsSet: ['spoke:celine'] },
              setsFlags: ['knows:what_he_is', 'celine_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:what_he_is'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'find_out_why_truth',
          playerCopy: 'Find out why a vampire takes his rent in true stories.',
          directorNotes:
            'The answer is November 1974, an alley off Ashby Street, a stranger who lived, Gus finding him on the stairs, and a priest who said: then live on what I live on. It should arrive as one specific night, not as a theory of vampires. The ledger gives the shape of it, Gus gives the stairs, and Elias gives the alley, only on the roof and only if he has been asked for nothing else.',
          enterWhen: { flagsSet: ['knows:what_he_is'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_ledger',
              label: 'Read the ledger in the basement',
              predicate: { hasItems: ['rent_ledger'] },
              setsFlags: ['knows:1974', 'read_the_ledger'],
              closesFlags: [],
            },
            {
              routeId: 'gus_remembers',
              label: 'Let Gus tell it for the record',
              predicate: { minRelationship: [{ characterId: 'gus', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:1974', 'gus_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'heard_it_from_him',
              label: 'Hear it from him on the roof',
              predicate: {
                flagsSet: ['roof_with_him', 'used:ask_him_one_back'],
                minRelationship: [{ characterId: 'elias', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['knows:1974', 'heard_it_from_him'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['knows:why_truth'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_lot_fourteen',
      title: 'Lot 14',
      summary: 'A yellow notice in the lobby says the city will auction Varga House at ten in the morning on the tenth.',
      kind: 'MAIN',
      involvedCharacterIds: ['gus', 'dee', 'elias', 'celine'],
      involvedLocationIds: ['the_lobby', 'apartment_1a', 'records_office'],
      knownRewardCopy: 'The building, the tenants’ homes, and his basement, kept out of the wrong hands.',
      discoverWhen: { flagsSet: ['saw_the_notice'] },
      steps: [
        {
          id: 'find_the_problem',
          playerCopy: 'Find out why the city thinks the building is for sale.',
          directorNotes:
            'The taxes were paid. Pruitt the lawyer paid them every year since 1981 and died last spring, and somebody reported the account as unpaid a week later. Elias cannot go to the records office, because it is open from nine to half past four. Dee has already rung them four times and shouted. Gus has the receipts and is waiting to be asked properly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_dee',
              label: 'Ask Dee what the notice means',
              predicate: { flagsSet: ['saw_the_notice', 'spoke:dee'] },
              setsFlags: ['knows:the_lien'],
              closesFlags: [],
            },
            {
              routeId: 'dug_into_it',
              label: 'Look it up yourself',
              predicate: { flagsSet: ['saw_the_notice', 'used:dig_into_it'] },
              setsFlags: ['knows:the_lien'],
              closesFlags: [],
            },
            {
              routeId: 'gus_has_the_paper',
              label: 'Take the notice to Gus',
              predicate: {
                flagsSet: ['saw_the_notice'],
                minRelationship: [{ characterId: 'gus', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['knows:the_lien', 'gus_has_the_receipts'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:the_receipts_exist'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 10 }],
          },
        },
        {
          id: 'stop_the_sale',
          playerCopy: 'Get the proof to the records office before ten on the tenth.',
          directorNotes:
            'The daylight errand nobody else in this story can run properly. The records office is bright, queued and indifferent, and it is the only daytime scene in the world, so let it feel strange to a player who has been living at night. The clerk is reasonable if shown paper and immovable if shouted at. If Celine has made her peace, she withdraws the bid and pays the city herself, without telling Elias, which he will find out and mind.',
          enterWhen: { flagsSet: ['knows:the_receipts_exist'] },
          deadlineWorldMinute: AUCTION_MINUTE,
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'filed_the_receipts',
              label: 'Hand Pruitt’s receipts over the counter',
              predicate: { hasItems: ['pruitt_receipts'], atLocation: 'records_office', beforeWorldMinute: AUCTION_MINUTE },
              setsFlags: ['sale_stopped', 'filed_the_receipts'],
              closesFlags: ['building_sold'],
            },
            {
              routeId: 'argued_at_the_counter',
              label: 'Argue it at the counter from the city’s own files',
              predicate: {
                flagsSet: ['used:dig_into_it', 'knows:the_lien'],
                atLocation: 'records_office',
                beforeWorldMinute: AUCTION_MINUTE,
              },
              setsFlags: ['sale_stopped', 'argued_at_the_counter'],
              closesFlags: ['building_sold'],
            },
            {
              routeId: 'celine_withdrew',
              label: 'Get Celine to withdraw her bid',
              predicate: { flagsSet: ['celine_made_peace'] },
              setsFlags: ['sale_stopped', 'celine_withdrew'],
              closesFlags: ['building_sold'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['sale_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_his_ex',
      title: 'His Ex',
      summary: 'A woman in a camel coat is reading the auction notice in the lobby, and she already knows your name.',
      kind: 'MAIN',
      involvedCharacterIds: ['celine', 'elias'],
      involvedLocationIds: ['the_lobby', 'the_stairs', 'the_orchid_room'],
      knownRewardCopy: 'What Celine Marchand wants with the building, with him and with you, and an answer to her.',
      discoverWhen: { flagsSet: ['celine_arrived'] },
      steps: [
        {
          id: 'hear_her_out',
          playerCopy: 'Find out what Celine wants.',
          directorNotes:
            'She is honest, which is the dangerous part. She loves him, she thinks the rent is a slow death, and she intends to buy the building, empty it, and wait for him to get hungry enough to come home. She will offer the player money, a year of real rent somewhere with a lift, and her card. She never threatens. She does not need to.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_her_bar',
              label: 'Take her card to the Orchid Room',
              predicate: { flagsSet: ['spoke:celine'], atLocation: 'the_orchid_room' },
              setsFlags: ['heard_her_offer'],
              closesFlags: [],
            },
            {
              routeId: 'met_her_on_the_stairs',
              label: 'Talk to her on the stairs',
              predicate: { flagsSet: ['spoke:celine'] },
              setsFlags: ['heard_her_offer'],
              closesFlags: [],
            },
            {
              routeId: 'saw_through_her',
              label: 'Watch what she does instead of what she says',
              predicate: { flagsSet: ['used:read_them', 'celine_arrived'] },
              setsFlags: ['saw_through_celine'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['knows:celine_wants_him_back'],
            abilities: [],
            reputation: [{ factionId: 'faction_orchid_room', amount: 10 }],
          },
        },
        {
          id: 'answer_her',
          playerCopy: 'Decide what you are going to do about her.',
          directorNotes:
            'Four answers and none of them is the good one on its own. Helping her means lying to him, and he will hear it. Taking back her welcome works instantly and permanently and he will not know whether to thank the player or grieve. Telling him everything puts the two of them in one room for the first time in fifty years. Making peace with her means the player has to understand her, which is harder than beating her.',
          enterWhen: { flagsSet: ['knows:celine_wants_him_back'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_her_side',
              label: 'Help her, and lie to him about it',
              predicate: { flagsSet: ['heard_her_offer', 'used:lie_to_him'] },
              setsFlags: ['sided_with_celine'],
              closesFlags: ['shut_her_out', 'told_him_about_celine'],
            },
            {
              routeId: 'shut_her_out',
              label: 'Take back her welcome at the street door',
              predicate: { flagsSet: ['used:take_back_the_welcome'] },
              setsFlags: ['shut_her_out', 'celine_uninvited'],
              closesFlags: ['sided_with_celine'],
            },
            {
              routeId: 'told_him_everything',
              label: 'Tell him everything she said',
              predicate: {
                flagsSet: ['heard_her_offer', 'spoke:elias'],
                minRelationship: [{ characterId: 'elias', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['told_him_about_celine'],
              closesFlags: ['sided_with_celine'],
            },
            {
              routeId: 'made_peace',
              label: 'Understand her well enough to change her mind',
              predicate: {
                flagsSet: ['used:ask_him_one_back'],
                minRelationship: [{ characterId: 'celine', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['celine_made_peace'],
              closesFlags: ['sided_with_celine'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['celine_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_porch_game',
      title: 'The Porch Game',
      summary: 'Across the street, a priest and your landlord have been playing the same game of chess since March.',
      kind: 'SIDE',
      involvedCharacterIds: ['tom', 'elias'],
      involvedLocationIds: ['st_anselm'],
      knownRewardCopy: 'The old words for taking back a welcome, and what the parish promised in 1974.',
      discoverWhen: { flagsSet: ['spoke:tom'] },
      steps: [
        {
          id: 'earn_the_old_words',
          playerCopy: 'Get Father Tom to teach you the old rules.',
          directorNotes:
            'Tom is practical about the supernatural the way he was practical about fires: exits first. He teaches the words for withdrawing a welcome to somebody who tells him one true thing and wants to protect the house. He says plainly that they work on Elias too, and watches the player’s face when he says it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'earned_his_trust',
              label: 'Sit through enough soup and chess',
              predicate: { minRelationship: [{ characterId: 'tom', dimension: 'trust', value: 45 }] },
              setsFlags: ['tom_trusts_you'],
              closesFlags: [],
            },
            {
              routeId: 'told_tom_the_truth',
              label: 'Tell him something true',
              predicate: { flagsSet: ['used:tell_something_true', 'spoke:tom'] },
              setsFlags: ['confessed_to_tom'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:the_old_words'],
            abilities: ['take_back_the_welcome'],
            reputation: [{ factionId: 'faction_st_anselm', amount: 15 }],
          },
        },
        {
          id: 'the_promise',
          playerCopy: 'Find out what the parish promised Elias.',
          directorNotes:
            'A promise made by a dead priest in 1974 and inherited with the keys. Keep it grave and plain and never graphic: a cloth bundle on a shelf, a man who dusts round it, and a question about what friends owe each other. Taking it is allowed. Tom will know within the hour.',
          enterWhen: { flagsSet: ['knows:the_old_words'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_opened_the_cupboard',
              label: 'Ask him what would happen if Elias broke',
              predicate: { minRelationship: [{ characterId: 'tom', dimension: 'trust', value: 60 }] },
              setsFlags: ['knows:the_promise'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_bundle',
              label: 'Open the sacristy cupboard yourself',
              predicate: { hasItems: ['hawthorn_stake'] },
              setsFlags: ['knows:the_promise', 'took_the_stake'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['promise_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_st_anselm', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_ada',
      title: 'The Letter in the Hatbox',
      summary: 'The last tenant of 4C left a hatbox on the closet shelf, and a sealed letter in it addressed to you, more or less.',
      kind: 'LEAD',
      involvedCharacterIds: ['elias', 'gus'],
      involvedLocationIds: ['apartment_4c'],
      knownRewardCopy: 'Forty-one years of somebody else’s rent, and what she wanted the next person to know.',
      discoverWhen: { hasItems: ['ada_box'] },
      steps: [
        {
          id: 'read_ada',
          playerCopy: 'Read what Ada Lindqvist left for the next tenant.',
          directorNotes:
            'The letter says: he will ask you for the truth every month and it will feel like a lot, and it is the cheapest rent in the city, and if he ever stops knocking, go down and knock on his door. Do not read it all out at once; give the player one line at a time. Opening it in front of him, or giving it to him unopened, are different scenes.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_yourself',
              label: 'Open the letter on your own',
              predicate: { hasItems: ['ada_box'], flagsSet: ['used:dig_into_it'] },
              setsFlags: ['read_adas_letter'],
              closesFlags: [],
            },
            {
              routeId: 'gave_it_to_him',
              label: 'Tell him you found it, before you read it',
              predicate: { hasItems: ['ada_box'], flagsSet: ['used:tell_something_true', 'spoke:elias'] },
              setsFlags: ['read_adas_letter', 'gave_him_the_box'],
              closesFlags: [],
            },
            {
              routeId: 'asked_gus_about_her',
              label: 'Take it down to Gus, who knew her',
              predicate: {
                hasItems: ['ada_box'],
                minRelationship: [{ characterId: 'gus', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['read_adas_letter', 'gus_knew_her'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:ada'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_one_true_thing',
      title: 'One True Thing',
      summary: 'You know what he is now. That leaves what he is to you.',
      kind: 'MAIN',
      involvedCharacterIds: ['elias', 'dee', 'celine'],
      involvedLocationIds: ['the_roof', 'apartment_4c', 'the_stairs'],
      knownRewardCopy: 'An answer, said out loud by both of you, about what this is.',
      discoverWhen: { flagsSet: ['knows:what_he_is'] },
      steps: [
        {
          id: 'say_where_you_stand',
          playerCopy: 'Decide what Elias Varga is to you.',
          directorNotes:
            'Three honest outcomes. Falling for him is slow and earned and goes as far as a kiss at the roof hatch ten minutes before sunrise. Keeping it to the rent is a real friendship with a landlord who brings up the post. Telling him no is respected completely, and he keeps collecting from the landing, courteous as ever. Do not let the prose treat any of these as the wrong answer.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'fell_for_him',
              label: 'Let it be more than the rent',
              predicate: {
                flagsSet: ['roof_with_him'],
                minRelationship: [
                  { characterId: 'elias', dimension: 'affection', value: 70 },
                  { characterId: 'elias', dimension: 'trust', value: 55 },
                ],
              },
              setsFlags: ['together'],
              closesFlags: ['just_the_rent', 'told_him_no'],
            },
            {
              routeId: 'kept_it_to_rent',
              label: 'Keep it to the rent, and mean it kindly',
              predicate: { flagsSet: ['paid_this_month'], afterWorldMinute: 6 * 1440 },
              setsFlags: ['just_the_rent'],
              closesFlags: ['together'],
            },
            {
              routeId: 'told_him_no',
              label: 'Tell him no, at the door',
              predicate: { flagsSet: ['used:keep_the_door', 'knows:what_he_is'] },
              setsFlags: ['told_him_no'],
              closesFlags: ['together'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:where_you_stand'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'his_rent',
          playerCopy: 'Hear the one story he has never paid anybody.',
          directorNotes:
            'The inversion the whole title points at: for once the landlord pays. He tells the player the alley in November 1974 himself, plainly, without asking for anything back. It should be quiet, short and specific, and the player should be able to answer it with anything at all.',
          enterWhen: { flagsSet: ['knows:where_you_stand'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_paid_you',
              label: 'Ask for nothing, and wait',
              predicate: {
                flagsSet: ['together', 'used:stay_up_with_him'],
                minRelationship: [{ characterId: 'elias', dimension: 'trust', value: 75 }],
              },
              setsFlags: ['he_told_his_story'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['his_rent_paid'],
            abilities: [],
            reputation: [{ factionId: 'faction_tenants', amount: 5 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_gus_pays',
      atWorldMinute: 30,
      locationId: 'the_lobby',
      publicCopy:
        'Far down the stairwell, faintly, an old man’s voice is telling a story about a Tuesday in 1969, and correcting it as he goes.',
      directorNotes:
        'Gus rehearsing his rent out loud in 1A with the door propped open, ready for when Elias reaches the ground floor. It is the same story he tells every month, told differently, and Elias will thank him exactly as warmly as the first time. Useful for a player who wants to know what normal looks like here.',
      setsFlags: ['heard_gus_pay'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_dee_on_the_stairs',
      atWorldMinute: 50,
      locationId: 'the_stairs',
      publicCopy:
        'One floor down, a door opens and a woman in a cardigan sits on the top step with two mugs of tea, having clearly listened to everything.',
      directorNotes:
        'Dee wants to know how it went, and she wants to know before Elias comes back down and asks her about the ad. She is guilty, cheerful and very fast, and will offer the player tea, the laundromat code and the building’s gossip before they have said a word.',
      setsFlags: ['dee_came_up'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'dee', toLocationId: 'the_stairs' }],
    },
    {
      id: 'we_the_notice',
      atWorldMinute: 18 * 60,
      locationId: 'the_lobby',
      publicCopy:
        'A yellow notice is taped to the lobby board: this property will be sold at public auction on the tenth at 10:00 for unpaid taxes. Lot 14.',
      directorNotes:
        'It went up in the afternoon, while everybody who lives here was asleep. Dee has written on it in purple. Elias has written under that. Neither of them can do anything about it in daylight, and both of them are pretending that is fine.',
      setsFlags: ['saw_the_notice'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_celine_arrives',
      atWorldMinute: 1440 + 23 * 60 + 30,
      locationId: 'the_lobby',
      publicCopy:
        'A woman in a long camel coat is standing in the lobby reading the auction notice, taking off her gloves one finger at a time.',
      directorNotes:
        'Celine, using a welcome Elias gave her in 1952 and never took back. She knows the player’s name already, because Dee has told half the laundromat and Celine hears everything about this building. She is delighted to meet them and will say so.',
      setsFlags: ['celine_arrived'],
      cancelledByFlags: ['left_the_map'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'celine', toLocationId: 'the_lobby' }],
    },
    {
      id: 'we_he_misses_the_game',
      atWorldMinute: 2 * 1440 + 2 * 60 + 10,
      locationId: 'st_anselm',
      publicCopy:
        'The chessboard on the church porch sits under its plastic cover with nobody across from Father Tom.',
      directorNotes:
        'Elias did not come. He is walking the river instead, because he is too hungry to sit across a small table from anybody. Only happens if the player has paid him nothing true, and it is the first visible sign of what that costs.',
      setsFlags: ['he_missed_the_game'],
      cancelledByFlags: ['paid_this_month'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'elias', toLocationId: 'ashby_street' }],
    },
    {
      id: 'we_celine_at_your_door',
      atWorldMinute: 3 * 1440 + 60,
      locationId: 'the_stairs',
      publicCopy:
        'Celine is on your landing at one in the morning, on the right side of your door, asking very nicely whether she might come in.',
      directorNotes:
        'She cannot cross without being asked, and she knows the player knows it. She has brought an envelope with a year’s rent in it, in cash, and she will leave it on the mat if refused. Elias is at the porch game and will hear about this from Dee within the hour.',
      setsFlags: ['celine_came_to_your_door'],
      cancelledByFlags: ['celine_uninvited', 'celine_made_peace'],
      requiresFlags: ['celine_arrived'],
      movesCharacters: [{ characterId: 'celine', toLocationId: 'the_stairs' }],
    },
    {
      id: 'we_dee_at_four',
      atWorldMinute: 4 * 1440 + 4 * 60,
      locationId: 'the_laundromat',
      publicCopy:
        'Dee is asleep on the folding table at the laundromat with her head on her arms and a curl of receipt roll under her hand, covered in crossed-out writing.',
      directorNotes:
        'She is trying to write a true story for next month and cannot find one she is willing to say. If the player wakes her kindly, this is where she admits her last three rents were made up.',
      setsFlags: ['dee_ran_out'],
      cancelledByFlags: [],
      requiresFlags: ['met_the_neighbour'],
      movesCharacters: [],
    },
    {
      id: 'we_the_auction',
      atWorldMinute: AUCTION_MINUTE + 10,
      locationId: 'records_office',
      publicCopy: 'Lot 14, Varga House, is sold at ten past ten to a bidder represented by counsel.',
      directorNotes:
        'Celine wins it through her lawyer. She is not there, because it is daylight. The tenants find out from Gus, who rang the office at eleven. Nothing is over yet: the sale completes in twenty-eight days, and the people in the building have that long to decide what they are.',
      setsFlags: ['building_sold'],
      cancelledByFlags: ['sale_stopped'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_notice_to_quit',
      atWorldMinute: 9 * 1440 + 18 * 60 + 30,
      locationId: 'the_lobby',
      publicCopy: 'An envelope has been pushed under every door in the building, on heavy cream paper, signed C. Marchand.',
      directorNotes:
        'Notice to quit, polite and generous: three months, a moving allowance, and a handwritten line on the player’s copy that says her offer still stands. Gus reads his twice and puts it in a bundle. Dee cries in the laundromat and then gets angry. Angry is better.',
      setsFlags: ['notice_to_quit'],
      cancelledByFlags: [],
      requiresFlags: ['building_sold'],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_will_you_stay',
      kind: 'FINALE',
      label: 'Whether you are still in 4C when the rent is next due',
      seedHint: 'An index card taped inside your door, with forty-one years of tape marks under it.',
      payoffHint: 'Midnight on the first again, three knocks, and whatever the two of you have become standing on either side of the threshold.',
      weight: 1,
    },
    {
      id: 'p_what_he_is_to_you',
      kind: 'RELATIONSHIP',
      label: 'What the landlord becomes to you',
      seedHint: 'His shoes stop exactly at the edge of your doorway, every time, as if there were glass there.',
      payoffHint: 'The roof hatch ten minutes before sunrise, and one of you saying the true thing first.',
      weight: 0.9,
    },
    {
      id: 'p_why_truth',
      kind: 'MYSTERY',
      label: 'Why a vampire lives on true stories',
      seedHint: 'He says thank you after every true thing, and a lie gets a polite silence and a blank line in a ledger.',
      payoffHint: 'An alley off Ashby Street in November 1974, an old man who found him on the stairs, and a priest who said: then live on what I live on.',
      weight: 0.8,
    },
    {
      id: 'p_celine',
      kind: 'RIVAL',
      label: 'Celine, and the auction on the tenth',
      seedHint: 'A yellow notice on the lobby board with OVER MY DEAD BODY written under it in purple ink.',
      payoffHint: 'Lot 14 at ten past ten, and a woman who made him deciding whether to let him go.',
      weight: 0.85,
    },
    {
      id: 'p_ada',
      kind: 'THEME',
      label: 'Who lived in 4C before you',
      seedHint: 'A hatbox on the closet shelf with A.L. on the lid in marker.',
      payoffHint: 'A sealed letter addressed to whoever gets 4C next, and forty-one years of carbon copies of the truth.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_night_shift',
      name: 'You Work Nights',
      role: 'Night-shift background, steady nerves',
      summary: 'You keep the same hours he does, so you are awake for everything in this building and calm in a crisis, at the cost of never quite sleeping.',
      playstyle: ['Steady', 'Observant', 'Night owl'],
      blurb:
        'Six years of night shifts on a hospital ward. You have sat with people at three in the morning, and you know exactly what somebody looks like when they are lying to you about being fine. The dented thermos that got you through all six years has one good cup left in it.',
      attributeBonus: { resolve: 2, mind: 2 },
      skillProficiencies: { nerve: 3, notice: 2 },
      startingItems: [{ itemId: 'thermos', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_st_anselm', amount: 10 }],
    },
    {
      id: 'arch_actor',
      name: 'You Act For A Living',
      role: 'Social style: charm and bluffing',
      summary: 'You lie professionally and well. That makes you the best liar in the building and the worst-placed tenant in it, because this landlord only takes the truth.',
      playstyle: ['Charming', 'Quick', 'Good liar'],
      blurb:
        'Two adverts, one play that closed in a week, and a showreel nobody has watched. You can cry on cue. You have not cried for real in a while, and you would rather not be asked why. You still carry a folder of headshots of yourself looking trustworthy.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { bluff: 3, charm: 2 },
      startingItems: [{ itemId: 'headshots', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_orchid_room', amount: 10 }],
    },
    {
      id: 'arch_left_in_a_hurry',
      name: 'You Left In A Hurry',
      role: 'Honest talk and practical repairs',
      summary: 'You left a whole life on short notice and you are not ready to talk about it, so every rent night is a negotiation about how much truth you can afford.',
      playstyle: ['Guarded', 'Resilient', 'Honest under pressure'],
      blurb:
        'Two bags, a coat, and a phone you keep face down. The ad said cheap, quiet and no questions asked. Two out of three. And a letter in a hand you know, carried nine days, not opened.',
      attributeBonus: { resolve: 2, might: 2 },
      skillProficiencies: { candour: 2, handiwork: 2, nerve: 1 },
      startingItems: [{ itemId: 'unopened_letter', qty: 1 }],
      startingAbilities: [],
      startingReputation: [{ factionId: 'faction_tenants', amount: 5 }],
    },
    {
      id: 'arch_writer',
      name: 'You Write Things Down',
      role: 'Research background, records and paper',
      summary: 'You research for a living, so the building’s paper trail, the old ledger and the city’s records will talk to you, and you will be tempted to write up what you find.',
      playstyle: ['Curious', 'Thorough', 'Nosy'],
      blurb:
        'Freelance. Obituaries, mostly, and a local history column with eleven readers. A building that takes rent in stories is the best thing that has ever happened to you. That is a problem. Page one of your notebook already says DO NOT WRITE THIS UP.',
      attributeBonus: { mind: 3, arcana: 1 },
      skillProficiencies: { digging: 3, lore: 2 },
      startingItems: [{ itemId: 'notebook', qty: 1 }],
      startingAbilities: [],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the lease?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Jules Marrow' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What do you do, when you are not paying rent?',
      helpText:
        'Your work, which sets what you are good at: lying, noticing, staying calm, or digging through paper. It stays fixed for the whole story. It does not decide whether you tell him the truth, whether you stay, or what he becomes to you. All of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What do you look like? (for your portrait)',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Short dark hair, a borrowed jumper, and a face that has been awake since six.',
    },
  ],
  /**
   * Where this can end up.
   *
   * "Sold at Ten Past Ten" is what happens if nobody runs the daytime errand,
   * so it is reachable by playing pleasantly and never going to the records
   * office; it is the honest loss, not a punishment. "Notice Given" is
   * walking out, reachable early. Two endings keep the building and lose him,
   * one keeps him and loses the building, and the two unique ones are the
   * slowest: the landlord paying his own rent, and the player becoming what
   * Ada was.
   */
  endings: [
    {
      id: 'end_month_to_month',
      name: 'Month to Month',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['first_night_over', 'paid_this_month'],
        flagsUnset: ['building_sold', 'together', 'left_the_map'],
        minRelationship: [{ characterId: 'elias', dimension: 'trust', value: 50 }],
      },
      condition:
        'The quiet one. The player stayed and paid in truth, the arrangement holds, and nothing has been dramatically resolved. Play it small: a radiator bled, a mug left on the stairs, a knock at midnight on the first. Nobody makes a speech about home.',
      epilogue:
        'Month two is a story about a bus. Month three is a story about a grandmother. By month six the player has started saving small true things through the month for the knock, the way Gus does, and Elias has started saying thank you before they have quite finished.',
      hint: '',
    },
    {
      id: 'end_ten_minutes_before_sunrise',
      name: 'Ten Minutes Before Sunrise',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['together'],
        flagsUnset: ['building_sold'],
        minRelationship: [{ characterId: 'elias', dimension: 'affection', value: 75 }],
      },
      condition:
        'They fell for each other and said so. This is the romance ending and it is restrained: the roof, the sky going grey, his hand finally off the doorframe, one kiss at the hatch before he has to go down. Write the clock as much as the kiss.',
      epilogue:
        'He still knocks on the first, because it is the rent and he is a man of habit. The player still pays it, because the truth is the one thing they can give him that nobody else can. The folding chairs on the roof get a third, then lose it again when Dee takes it back.',
      hint: 'He has not crossed your threshold yet. Ask yourself why you have not asked.',
    },
    {
      id: 'end_varga_house_stays',
      name: 'Varga House Stays',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['sale_stopped'],
        minFactionReputation: [{ factionId: 'faction_tenants', value: 50 }],
      },
      condition:
        'The player ran the daylight errand and the building stayed with the people in it. Write the logistics rather than the triumph: a queue, a ticket number, a stamp, a bus home, and four tenants on the stairs at midnight who are not sure how to thank a person and so make tea.',
      epilogue:
        'Gus files the clerk’s letter in a bundle marked VICTORIES, which has two other things in it. Dee paints over OVER MY DEAD BODY on the noticeboard and writes THANK YOU in the same purple. The basement light is on earlier than usual for a week.',
      hint: 'Somebody in this building has the receipts.',
    },
    {
      id: 'end_sold_at_ten_past_ten',
      name: 'Sold at Ten Past Ten',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['building_sold'],
        flagsUnset: ['sided_with_celine', 'together'],
      },
      condition:
        'Nobody got to the records office in time, and the building went to Celine. This is the honest loss and it must not read as a punishment for playing badly: the player was busy living at night, and the city kept office hours. Write the end of a building as a community rather than as a disaster.',
      epilogue:
        'Gus moves to his niece’s and takes every bundle. Dee keeps the laundromat and sleeps on the folding table for a month. The basement door is padlocked from outside in the spring, and nobody on Ashby Street knows where its occupant went, except the priest, who will not say.',
      hint: '',
    },
    {
      id: 'end_somewhere_with_a_basement',
      name: 'Somewhere With a Basement',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['building_sold', 'together'],
        flagsUnset: ['sided_with_celine'],
      },
      condition:
        'They lost the building and kept each other. The romance survives the move, and the practical problems of moving a vampire across a city before dawn are the comedy of it. Do not make this bittersweet; make it a moving day.',
      epilogue:
        'The new place is smaller, has a cellar with no window, and a landlord who asks for money, which Elias finds fascinating. On the first of every month, at midnight, he knocks on the player’s door anyway, from the inside.',
      hint: '',
    },
    {
      id: 'end_the_old_way',
      name: 'The Old Way',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['sided_with_celine'] },
      condition:
        'The player helped Celine and lied to him to do it, and it worked: he went back to her, and to drinking. This is a tragedy told quietly. Nobody is shown being harmed on the page. What it costs is a man who used to say thank you.',
      epilogue:
        'He looks well, people say, which is the worst thing anybody says about it. The Orchid Room is busy on Fridays. Father Tom does not unwrap what is in the cupboard, and every night after two he sets up the board on the porch and plays both sides.',
      hint: '',
    },
    {
      id: 'end_notice_given',
      name: 'Notice Given',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['together'] },
      condition:
        'The player left. It is a sane response to a landlord who is what he is, and the story must not punish or redeem it. The person it costs most is not the player, and that should be visible in one small detail.',
      epilogue:
        'The key is on the mat inside 4C with the lease folded under it. Dee puts the ad back up and then takes it down again the same night. The card on the door stays where it is, with one more line of tape marks.',
      hint: '',
    },
    {
      id: 'end_paid_in_fiction',
      name: 'Paid in Fiction',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['lied_on_rent', 'knows:1974'],
        flagsUnset: ['told_him_true'],
      },
      condition:
        'The player never paid him one true thing, and he let them stay anyway, and now they know what that cost him. The scene is him telling them, without reproach, that he always knew. Let it be gentle and let it hurt.',
      epilogue:
        'There is a page in the ledger with the player’s flat number down the margin and nothing written beside it, month after month. On the last line, in the same hand, it says: Stayed. Which was something.',
      hint: '',
    },
    {
      id: 'end_closed_door',
      name: 'Closed Door',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['celine_uninvited', 'sale_stopped'] },
      condition:
        'The player took back Celine’s welcome at the street door and saved the building in daylight. She is gone from the house for good. Write her leaving with dignity: she is not a villain, she is the person who loved him first and lost the argument.',
      epilogue:
        'A crate of very old wine arrives at the lobby with no note. Elias does not open it and does not throw it away. Once a year, on a night in November, he goes and stands outside an unmarked green door across town, and does not knock.',
      hint: 'There are old words for taking back a welcome. The priest knows them.',
    },
    {
      id: 'end_the_landlord_pays',
      name: 'The Landlord Pays',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['he_told_his_story', 'together'] },
      condition:
        'For the first time in fifty years he paid somebody a true story, unasked, and it was the alley in November 1974. The ending is what the player says back. Keep it short, specific, and entirely about the two of them.',
      epilogue:
        'The rent goes both ways now, on the first, at midnight, one each. Gus says it is irregular and enters it in the ledger anyway. The thing nobody expected is that Elias is a terrible storyteller and a wonderful listener, and that this is fine.',
      hint: 'He has never once been asked for nothing.',
    },
    {
      id: 'end_whoever_gets_4c_next',
      name: 'Whoever Gets 4C Next',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: {
        flagsSet: ['read_adas_letter', 'sale_stopped'],
        minFactionReputation: [{ factionId: 'faction_tenants', value: 65 }],
      },
      condition:
        'The player became what Ada was: the tenant who keeps the building in daylight, holds the spare keys, and goes down to knock on his door if he ever stops knocking on theirs. This is a found-family ending and it should feel like being handed something.',
      epilogue:
        'They start a carbon copy of their own, one sheet a month, in a box on the closet shelf. On the lid, in marker, are their initials, and below them, in older ink that was always there, A.L.',
      hint: 'The last tenant left a letter.',
    },
    {
      id: 'end_good_neighbours',
      name: 'Good Neighbours',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['just_the_rent', 'first_night_over'],
        flagsUnset: ['building_sold'],
      },
      condition:
        'The player and Elias became friends and nothing more, and both of them are glad of it. A landlord who brings up the post, a tenant who bleeds the radiators, and a standing argument about chess. Do not write this as a consolation prize.',
      epilogue:
        'He teaches the player chess badly on the porch, and Father Tom teaches them properly to spite him. Every first of the month there is a knock, a true thing, a thank-you, and a conversation on the landing that runs on until somebody notices the time.',
      hint: '',
    },
  ],
  opening:
    "Midnight. Three knocks on the door of 4C.\n\nYou open it. A man in a long dark coat is leaning on the frame, pale and tired and very polite about both.\n\nHe doesn’t come in. His shoes stop exactly at the threshold, as if there’s glass there.\n\n\"Elias Varga,\" he says. \"I own the building.\"\n\nHe glances past you at the boxes, the bare mattress, the card taped inside your door. RENT: ONE TRUE STORY.\n\n\"Don’t lie to me,\" he adds, almost kindly. \"I always know.\"\n\nHe waits.\n\n\"Rent’s due. Tell me something true, and you can stay the month.\"",
  openingPanel: {
    assetKey: 'story_rent_is_one_true_story/opening',
    alt: 'A tall pale man in a long dark coat leaning on a doorframe at midnight, his shoes stopped exactly at the threshold, a dim stairwell landing behind him.',
  },
  openingSuggestions: [
    "\"Something true? I couldn’t afford anywhere else.\"",
    'I hold up the lease so he can see whose signature is on it.',
    "I step aside and pull the door wide. \"Then come in and ask me properly.\"",
  ],
  publishedAt: '2026-11-22T04:00:00.000Z',
};

export const RENT_IS_ONE_TRUE_STORY = StoryVersion.parse(raw);

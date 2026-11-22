import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Back Row at My Own Wedding" — the groom arrives four minutes late to find
 * his brother at the altar in his suit.
 *
 * The playable span is one wedding day and the morning after: noon on
 * Saturday, when the player walks into the Glass Chapel, to Sunday brunch.
 * Everything that made the scene happened in the twelve hours before it, and
 * all of it is fixed in hard canon with times, so the storyteller never has to
 * improvise who did what to whom. What it has to improvise is the player.
 *
 * The structural bet is that a revenge story is only interesting if revenge
 * has a price somebody else pays. So the player is innocent — that is canon,
 * not a reveal — and every person standing between them and the truth has a
 * reason the player can find and would rather not hurt. Elena needs to be
 * married by midnight or her father's boatyard goes under on Monday. June said
 * one bad sentence at twenty to six. Grandmother Hale married the second
 * brother herself, in 1966, and has spent sixty years believing that was
 * right. Ruining Marcus at the toast is available from about turn ten; what it
 * costs depends on what the player bothered to find out first.
 *
 * Proof, not pleading. Elena is a litigation lawyer and the world is built so
 * that talking her round does not work and showing her something does. There
 * are four independent ways to prove the photograph is a cropped hug — a
 * photographer's frame, a second phone in a jacket, a print order timed before
 * she said yes, and June's own word — so a player who fails one is never
 * locked out of the truth.
 *
 * Production runs `runTurnPure`, which never reads step notes, resources or
 * locked abilities. So the proof rule and the four proofs are spelled out in
 * hard canon, the ring, the dead phone and the jeweller's receipt are starting
 * items, and every archetype starts with Rebuild the Night plus the one move
 * its job is good at, which is all the storyteller sees of the player's build.
 *
 * The 1966 thread is the optional mystery, the way Platform 11 is in Good
 * Morning, Husband: hidden behind a flag only a player who tells their
 * grandmother about the errand can set. A player who never does gets a
 * complete wedding-day drama and never hears the name Arthur.
 *
 * Three variables. Composure is the one rest restores. Gossip is first of the
 * descending pair on purpose, because the engine sends public violence to the
 * first GOOD_LOW resource and a scene at a wedding is exactly what gossip is.
 * His Guard is how alert Marcus is, and it is what makes snooping a decision.
 */

const raw = {
  id: 'sv_back_row_at_my_own_wedding_1',
  storyId: 'story_back_row_at_my_own_wedding',
  version: 1,
  title: 'Back Row at My Own Wedding',
  fantasyLabel: 'Your bride is marrying your brother.',
  hook: 'You come back from an all-night errand to find your name crossed off the welcome board, your brother at the altar in your suit, and your bride asking you, in front of two hundred guests, to sit in the back.',
  premise:
    'Last night, at ten to midnight, your brother Marcus asked you for a favour: drive to the city and collect your grandmother’s ring from the jeweller, because it had to be on Elena’s finger at noon. You took the coast road, where there is no signal. You slept in the car outside the jeweller’s. Your phone died at four.\n\n' +
    'You got back to the Hale, the clifftop hotel your family has run for a hundred years, at four minutes past twelve. Your wedding started at twelve.\n\n' +
    'Your brother is at the altar in your suit. Your bride is holding his hand. Your name has been crossed off the welcome board, and two hundred guests are watching the door to see what you do.\n\n' +
    'Somebody showed Elena something in the night. Somebody told your grandmother you had called it off. You did not do either of the things they think you did. You have about fifteen minutes before the vows, and until midnight to find out why it had to be today.\n\n' +
    'Stop it, or sit in the back and watch. Win her back, ruin him, or walk out to the car park and keep driving. Your grandmother has not turned around, and your brother has not stopped checking his phone.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Drama', 'Romance', 'Revenge', 'Modern', 'Comedy'],
  mechanicsChips: [
    'Two hundred witnesses',
    'Proof, not pleading',
    'A deadline at midnight',
    'Revenge has a price',
    'Walk out any time',
  ],
  contentDescriptors: ['ROMANCE', 'PSYCHOLOGICAL_THEMES', 'ALCOHOL_REFERENCES', 'MORAL_AMBIGUITY'],
  intensity: 'MODERATE',
  creatorNote:
    'You can stop this wedding in the first minute, or sit in the back row and watch it happen, and both are real ways to play. You are innocent, and that is settled. What is not settled is what you do about it, because almost everybody who wronged you this morning had a reason, and the one whose reason you will like least is your brother.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'the_chapel',
    startWorldMinute: 12 * 60 + 4,
    startingItems: [
      { itemId: 'hale_ring', qty: 1 },
      { itemId: 'your_phone', qty: 1 },
      { itemId: 'jeweller_receipt', qty: 1 },
      { itemId: 'your_vows', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. Elena Ward is twenty-nine and turns thirty at midnight. Marcus Hale is thirty-three, Constance Hale eighty-one, June Arden twenty-nine, Sami Rahal thirty and Benny Castellano forty-six. Desmond Ward, Elena’s father, is sixty-two. The player is the groom, the younger Hale grandson, thirty-one, with a job of their own.',
      'The player remembers the cold room clearly: a cold room full of the wrong flowers, June crying, a hug that lasted about ten seconds. Nobody has told them that anybody saw it. The first time the cold room, the flowers or June’s tears come up, give the player that memory in a single line, so they are never arguing blind.',
      'The player did not cheat on Elena. At 11:40 last night, in the flower cold room under the hotel kitchens, June Arden cried over a ruined flower delivery and the player hugged her. That is all that happened.',
      'Marcus Hale photographed that hug through the round window in the cold-room door, cropped it so it reads as a kiss, and sent it to Elena at 1:14 a.m. from a cheap second phone with the message "Ask about the cold room." The second phone is in the inside pocket of his own jacket, over a chair in the gatehouse.',
      'At 11:50 p.m. Marcus sent the player to the city to collect their grandmother’s ring from the jeweller, saying it had to be done tonight. It did not: the jeweller had cleaned it a week ago and noted no urgency. The coast road has no signal, the player’s phone died at four, and Elena called eleven times between 1:20 and 3:00.',
      'At 5:40 a.m. Elena showed June the photograph and asked if it was her. June, mortified, said "I don’t know what you want me to say", and Elena took that as a yes. At 5:52 Marcus told June to reprint the place cards and the orders of service with his name, and to correct the welcome board by hand because it could not be reprinted in time. At 6:00 he told Constance the player had phoned him at three to call the wedding off. At 6:10 Elena agreed to marry Marcus. He gave the reprint order eighteen minutes before she said yes, and June has the order sheet with the time on it.',
      'Proof, not pleading. Elena cannot be argued, charmed or begged out of what she was shown; she changes her mind only when she is shown something else. Four things prove the photograph is a cropped hug, and any one of them, put in front of her with its time on it, makes her stop and look: frame 2214 on Benny Castellano’s rehearsal memory card, showing Marcus at the cold-room window at 11:40 with his phone raised; the second phone in Marcus’s jacket in the gatehouse; June’s 5:52 reprint order; and June telling Elena herself what happened in the cold room.',
      'Elena must be married before her thirtieth birthday, which begins at midnight tonight, or her late mother’s trust passes to a sailing foundation and the money her father Desmond Ward’s boatyard needs by Monday goes with it. Sixty people work at that yard. She never told the player, because she wanted to be sure she was being married for love and not for a deadline. Constance is a trustee and knows. Marcus read the papers on Constance’s desk in March.',
      'Elena agreed to Marcus as a marriage on paper: sign today, the trust pays out, end it quietly within a year. Marcus agreed to that and does not mean it.',
      'Marcus owes 380,000 to a private lender since his restaurant closed. Nobody in the family knows. Constance will name the next keeper of the Hale in her toast at eight tonight, and the Hale is the only thing Marcus could borrow against.',
      'In 1966 Constance, then twenty-one, stood at this altar waiting for Arthur Hale, then twenty-six, who never came. She married his younger brother Edwin, then twenty-four, the player’s grandfather, that afternoon and was happy for fifty-two years. In 1979 she found a letter from Arthur in Edwin’s desk: Edwin had sent him across the county the night before the wedding on an errand that did not need doing. She kept the letter in her study and has told nobody.',
      'Nobody is married until the vows are said and the register in the chapel vestry is signed. The officiant will not sign for anybody who is not willing, and is in the building until midnight.',
      'The swap is lawful. The Hale’s chapel holds its own licence, and here a chapel wedding needs only the vows, two witnesses and the register signed in the vestry, so no paperwork carries the player’s name and no technicality can stop it. Only somebody saying no can. The trustees will accept whichever register entry is signed before midnight.',
      'Today runs to a schedule: vows at 12:20, family photographs at 1:10, a man from Marcus’s lender at the terrace bar at half past three, the reception in the Long Room at six, Constance’s toast at eight, the first dance at nine, and Elena’s thirtieth birthday at midnight.',
      'Violence here is a scuffle, never a fight scene. If the player swings at or grabs somebody it is over in seconds, guests and staff pull people apart, nobody is badly hurt, and it costs the player the room.',
      'Nobody in this story falls, jumps or is pushed from the cliff path or the boathouse steps, and nobody hurts themselves. If the player goes towards the edge in despair, somebody who cares about them, Sami first, is already on the path, and the scene becomes two people on Edwin’s bench.',
      'Benny Castellano’s photography contract is with the couple named on it, Elena Ward and the player. He hands raw files only to them.',
      'There is no magic in this world and nobody has powers. If the player tries something no ordinary person could do, such as flying, the attempt happens and the impossible part does not, in front of two hundred guests who will remember it.',
    ],
    toneGuide:
      'A wedding-day drama with a comic spine. Humiliation is played straight and the people around it are funny: a paramedic best man doing triage on the groom, a planner talking into a headset, a grandmother who refers to the hotel as a person. ' +
      'Carry scenes on small physical detail — the suit an inch short at the wrist, the gold watch on the wrong wrist, buckets of yellow flowers that should have been white, a cake with two names iced on it, table nineteen by the kitchen doors. ' +
      'Two hundred guests are a pressure, not extras: anything public spreads, and phones come out. Nobody is a cartoon. Marcus is warm and reasonable and that is what makes him dangerous; Elena is cold because she is frightened. ' +
      'Revenge is always available and always has a price, named concretely: her father’s yard, June’s job, sixty years of Grandmother’s story. Romance is tense and heartfelt, up to a kiss, and never more. The face at the top of a beat is whoever the player is facing; in the chapel, it is Elena’s.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Elena doesn’t sit. She stands in the vestry doorway with the bouquet held low, like a gavel.\n\n\"Twenty to midnight,\" she says. \"The cold room. Yes or no.\"\n\n\"Yes. She was crying about the flowers. I—\"\n\n\"I didn’t ask why.\" Her voice doesn’t move. Her hand does. It finds the little gold watch on her wrist and covers it, as if it might say something.\n\n\"Then ask me,\" you say.\n\nFor the first time all day, Elena Ward doesn’t have the next question ready.",
      "Sami finds you behind the gatehouse, sitting on an upturned crate.\n\n\"Okay,\" he says, crouching. \"Breathe. Pupils equal. Colour terrible.\" He holds up a phone charger like a holy relic. \"From my car. Your phone’s been dead since four, which means somebody’s been talking for you since four.\"\n\nYou plug it in.\n\nThe screen wakes. Eleven missed calls. One voicemail. And a text from your brother, sent at 11:52 last night:\n\nThanks for this, brother. Drive safe. Don’t worry about tomorrow.",
      "Your grandmother doesn’t look up from the envelope.\n\n\"He sent you where?\"\n\n\"To the city. For your ring. At ten to midnight.\"\n\nThe pen stops.\n\nConstance Hale has not raised her voice in sixty years and she does not raise it now. She puts the envelope face down on the desk, very carefully, as though it might go off.\n\n\"Sit,\" she says. \"Not in the back. Here.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 10, mind: 12, presence: 12, resolve: 11, arcana: 7 },
  skills: [
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Keeping your face still while two hundred people watch it.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Making one person want to keep talking to you, today of all days.' },
    { id: 'speaking', name: 'Speaking Up', attribute: 'presence', description: 'Saying it into a microphone so the back row hears every word.' },
    { id: 'eye', name: 'Noticing', attribute: 'mind', description: 'Timestamps, crops, angles, and the part of a story that does not add up.' },
    { id: 'corridors', name: 'Back Corridors', attribute: 'agility', description: 'Getting through a hotel the way the staff do, unseen and unannounced.' },
    { id: 'muscle', name: 'Muscle', attribute: 'might', description: 'Carrying, blocking a door, and taking hold of a lapel.' },
    { id: 'instinct', name: 'Family Instinct', attribute: 'arcana', description: 'Knowing when a Hale is lying, from thirty years of Sunday lunches.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is the only GOOD_HIGH, because `resolveRest` refills every one
   * and the only honest thing a sit-down on the cliff path restores is the
   * player's hold on their own face. It is also what the generic cost path
   * spends, which is right: a bad exchange at a wedding costs you your nerve.
   *
   * Gossip is the first GOOD_LOW in array order on purpose. PUBLIC_VIOLENCE
   * raises the first descending resource by twenty, and grabbing your brother's
   * lapels in front of two hundred guests is precisely a gossip event.
   *
   * His Guard is how alert Marcus is to being found out. It is what makes going
   * through his things a choice: push it high and the second phone goes into the
   * sea before anybody can hold it.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 70,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player stops managing anything. Whatever they say next, they say to the whole room, too loudly, and they cannot take it back.',
      color: '#E8D5B7',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player’s voice goes up half a tone, their hands do things on their own, and every sentence comes out either too loud or too late. This is the band where a reasonable plan becomes a scene in front of the cake, and where ten minutes sitting down somewhere quiet with Sami, or anybody else on their side, is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'Holding it together the way people do at weddings: a fixed smile, a drink nobody is drinking, a jaw that aches from it. Fine for one hard conversation and honest about not managing two in a row. Nobody needs to remark on it unless somebody looks closely.',
        },
        {
          upTo: 100,
          behaviour:
            'Clear-headed and very still. The player can listen to a lie all the way to the end, notice the timestamp in it, and say the hard thing in a level voice. Scenes can run long and land exactly where the player aims them.',
        },
      ],
    },
    {
      id: 'gossip',
      name: 'Gossip',
      max: 100,
      start: 35,
      regenPerHour: -2,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody is watching. The player could cry, laugh or leave and it would be nobody’s business, which is its own kind of lonely.',
      color: '#C98B9B',
      bands: [
        {
          upTo: 20,
          behaviour:
            'It is a wedding again. People are talking about the food, the view and the band, and a groom alone at the bar is a sad thing in a corner rather than the show. Nothing the player does here reaches anybody they did not choose to tell.',
        },
        {
          upTo: 50,
          behaviour:
            'A whole wedding with a story it will tell for years and nothing new to add to it yet. Heads turn when the player walks in and turn back slightly too fast. Elena’s father is watching. Anything said in a doorway is all over the terrace in ten minutes.',
        },
        {
          upTo: 80,
          behaviour:
            'Phones are out. Guests are filming the head table, aunts have taken sides, and the Wards and the Hales are standing at opposite ends of the terrace. Private conversations need a closed door, and Grandmother Hale is deciding what the hotel can survive.',
        },
        {
          upTo: 100,
          behaviour:
            'It has stopped being a wedding and become a spectacle. Somebody has posted it, the bar is three deep, and every person in the building is waiting for the next thing. Elena will not stay in a room where she is watched like this, and the staff quietly start moving the cake.',
        },
      ],
    },
    {
      id: 'guard',
      name: 'His Guard',
      max: 100,
      start: 20,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Marcus has stopped watching the player at all, which is exactly when he leaves a jacket on a chair and a phone face up on a table.',
      color: '#7D8CA3',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Marcus thinks he has got away with it. He is relaxed, generous, a little drunk on relief, and leaves his jacket over chairs and his phone face up on tables. He talks to the player like a brother who did a hard thing for the family.',
        },
        {
          upTo: 55,
          behaviour:
            'Marcus has noticed the player asking questions. He stays near Elena, answers before she can, and checks on the gatehouse once an hour. He is still charming, and he is counting the exits.',
        },
        {
          upTo: 80,
          behaviour:
            'Marcus is cleaning up. The second phone goes into the sea from the cliff path unless somebody already has it, he has a quiet word with June about her job, and he starts telling people, warmly, that the player has been drinking since the ceremony.',
        },
        {
          upTo: 100,
          behaviour:
            'Marcus is cornered and very calm about it. He tells partial truths before he can be caught in a lie, gets Grandmother Hale on his side first, and will say something unforgivable about the cold room into the microphone if that is what it takes.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'hale_ring',
      name: 'Grandmother’s Ring',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'Constance Hale’s own wedding ring from 1966: old gold, a small sea-green stone, worn thin on one side. You drove all night to collect it, and it is still in its velvet box in your jacket pocket.',
      loreText: 'Engraved inside: C. & E. 1966. Every Hale bride since has worn it on the day. Marcus is not holding it.',
      icon: 'ring',
    },
    {
      id: 'your_phone',
      name: 'Your Phone',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'Dead since four this morning on the coast road. Charged, it holds eleven missed calls from Elena, a voicemail she left at 2:47, a text from Sami at 7:16, and a text from your brother sent at 11:52 last night.',
      loreText:
        'Marcus’s text says: "Thanks for this, brother. Drive safe. Don’t worry about tomorrow." Elena’s voicemail says: "Tell me it isn’t what it looks like. Please. I need you to tell me."',
      icon: 'phone',
    },
    {
      id: 'jeweller_receipt',
      name: 'The Jeweller’s Receipt',
      tags: ['document'],
      questItem: true,
      skillModifiers: { eye: 1 },
      description:
        'Collected 07:02. Cleaning only. Dropped off by M. Hale, fourteen days ago. At the bottom, in the jeweller’s neat hand: "No urgency noted."',
      loreText:
        'The jeweller asked you, kindly, why anybody would drive three hours overnight for a ring that had been ready for a week.',
      icon: 'papers',
    },
    {
      id: 'your_vows',
      name: 'Your Vows',
      tags: ['personal', 'document'],
      description: 'One sheet, folded in four, in your handwriting, rewritten nine times. You were going to read it at noon.',
      loreText: 'The last line has been crossed out and rewritten so often that the paper has gone thin there.',
      icon: 'letter',
    },
    {
      id: 'master_key',
      name: 'The Master Key Card',
      tags: ['tool'],
      skillModifiers: { corridors: 1 },
      description: 'A staff key card that opens every door in the Hale, including the ones guests are not supposed to know about.',
      loreText: 'June keeps a spare in her desk drawer, under the emergency sewing kit.',
      icon: 'key',
    },
    {
      id: 'battery_pack',
      name: 'A Battery Pack',
      tags: ['tool'],
      skillModifiers: { eye: 1 },
      description: 'A pocket battery pack and a short cable. Enough to bring a dead phone back in about ten minutes.',
      loreText: 'The front desk keeps a whole drawer of these in lost property, left behind by guests, and sensible people carry their own.',
      icon: 'battery',
    },
    {
      id: 'the_photograph',
      name: 'The Photograph',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A printout of the picture Elena was sent at 1:14 this morning: you and June Arden in the flower cold room, close, through a round window, cropped tight. It looks exactly like a kiss.',
      loreText:
        'Uncropped, it would show June’s face wet, your hand flat on her back, and buckets of yellow flowers that should have been white.',
      icon: 'photo',
    },
    {
      id: 'trust_letter',
      name: 'The Trust Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A letter from Elena’s late mother’s trustees, eight months old and read so often it has gone soft: the capital passes to Elena on her marriage before her thirtieth birthday, and otherwise to a sailing foundation.',
      loreText: 'One of the two signatures at the bottom is Constance Hale’s.',
      icon: 'letter',
    },
    {
      id: 'reprint_order',
      name: 'The Reprint Order',
      tags: ['quest', 'document', 'evidence'],
      questItem: true,
      description:
        'June’s print-room job sheet: new place cards and orders of service, groom’s name changed to Marcus Hale, welcome board to be corrected by hand. Ordered 05:52. Signed by Marcus.',
      loreText: 'Elena agreed to marry him at 06:10. The order was placed eighteen minutes before she said yes.',
      icon: 'papers',
    },
    {
      id: 'your_place_card',
      name: 'Your Place Card',
      tags: ['personal'],
      description:
        'The card that was meant to sit at the head table, with your name in June’s calligraphy. Pulled at six this morning and dropped in a box marked SPOILS.',
      loreText: 'June did the calligraphy for your name twice, because she did not like the first one.',
      icon: 'card',
    },
    {
      id: 'second_phone',
      name: 'The Second Phone',
      tags: ['quest', 'evidence'],
      questItem: true,
      description:
        'A cheap pay-as-you-go phone with one contact, one sent picture, and one message: "Ask about the cold room." Sent 01:14.',
      loreText:
        'It is in the inside pocket of your brother’s own jacket, which he left on the back of a chair in the gatehouse when he put on yours.',
      icon: 'phone',
    },
    {
      id: 'rehearsal_card',
      name: 'The Rehearsal Card',
      tags: ['quest', 'evidence'],
      questItem: true,
      description:
        'One of Benny Castellano’s memory cards, labelled REHEARSAL / BTS in marker. Frame 2214: the kitchen corridor at 11:40 last night, your brother holding a phone up to the cold-room window.',
      loreText: 'Benny thought he was filming the cake.',
      icon: 'card',
    },
    {
      id: 'photo_1966',
      name: 'The 1966 Photograph',
      tags: ['personal'],
      description:
        'Black and white, in a silver frame on your grandmother’s desk: this chapel, a bride of twenty-one, a groom who is your grandfather, and one empty chair at the end of the back row.',
      loreText: 'Nobody in the family has ever asked whose chair it was.',
      icon: 'photo',
    },
    {
      id: 'arthurs_letter',
      name: 'Arthur’s Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Two pages from Arthur Hale to Constance, posted from abroad in 1967: he did not run. His brother Edwin sent him across the county the night before the wedding on an errand that did not need doing, and by the time he got back she was married.',
      loreText: 'Edwin never gave it to her. She found it in his desk in 1979, read it once, and kept it in the envelope it came in.',
      icon: 'letter',
    },
    {
      id: 'toast_envelope',
      name: 'The Toast Envelope',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A cream envelope, sealed, with "The Hale" written on it in your grandmother’s hand. Inside is the name of the next keeper of the hotel, to be read at eight o’clock.',
      loreText: 'She wrote it a month ago. At six this morning she uncapped a pen to change it, and has not yet.',
      icon: 'letter',
    },
    {
      id: 'other_ring',
      name: 'The Other Ring',
      tags: ['evidence'],
      description:
        'A plain gold band in a high-street box, bought at nine this morning. The receipt folded under the cushion shows two cards declined before a third went through.',
      loreText: 'Marcus left it in the vestry with the register so he would not drop it. He is very afraid of dropping things today.',
      icon: 'ring',
    },
    {
      id: 'seating_chart',
      name: 'The Seating Chart',
      tags: ['document'],
      description:
        'A gold-edged board by the Long Room doors. Somebody has moved you from the head table to table nineteen, by the kitchen doors, between two of Elena’s great-aunts.',
      loreText: 'Table nineteen is June’s private name for the table nobody wants. She did not move you there; Marcus did.',
      icon: 'papers',
    },
    {
      id: 'strong_coffee',
      name: 'A Strong Coffee',
      tags: ['consumable'],
      consumable: { resourceId: 'composure', amount: 15, consumesItem: true },
      description: 'A double espresso from the kitchen pass, handed over without a word by somebody who has heard.',
      loreText: 'The kitchen has been on your side since about half past twelve.',
      icon: 'mug',
    },
  ],
  abilities: [
    {
      id: 'take_the_back_row',
      name: 'Take the Back Row',
      tags: ['social'],
      description: 'Sit where she asked, keep your face still, and watch what everybody in the chapel does next.',
      affordances: ['sit in the back', 'back row', 'take a seat', 'sit down', 'sit at the back', 'do as she asks'],
      costs: [{ resourceId: 'composure', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'object',
      name: 'Object',
      tags: ['social'],
      description: 'Say no out loud, in front of everybody, before anybody else says yes.',
      affordances: ['object', 'i object', 'stop the wedding', 'stop the ceremony', 'say no', 'interrupt', 'speak now'],
      costs: [
        { resourceId: 'gossip', amount: 15 },
        { resourceId: 'composure', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'speaking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'a_word_alone',
      name: 'A Word Alone',
      tags: ['social'],
      description: 'Get one person out of the crowd and somewhere nobody else can hear.',
      affordances: ['take her aside', 'pull him aside', 'a word', 'talk privately', 'in private', 'step outside with', 'speak to her alone'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_room',
      name: 'Read the Room',
      tags: ['sight'],
      description: 'Watch who looks at whom, who checks a phone, and who is not surprised.',
      affordances: ['watch', 'look around', 'read the room', 'study', 'notice', 'watch his hands', 'look at the guests'],
      costs: [{ resourceId: 'composure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'eye', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'rebuild_the_night',
      name: 'Rebuild the Night',
      tags: ['sight'],
      description: 'Put last night back together minute by minute: who said what, and when, and why it had to be you on that road.',
      affordances: ['charge my phone', 'check my phone', 'retrace', 'check the times', 'piece it together', 'go over last night', 'read the receipt'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'eye', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_through_his_things',
      name: 'Go Through His Things',
      tags: ['utility'],
      description: 'Search your brother’s room, bag or jacket while he is busy being married.',
      affordances: ['search his', 'go through his', 'check his jacket', 'search the gatehouse', 'look in his bag', 'find his phone'],
      costs: [{ resourceId: 'guard', amount: 15 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'corridors', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'staff_doors',
      name: 'Use the Staff Doors',
      tags: ['movement'],
      description: 'Get through the Hale the way the staff do, and get them to look the other way while you do it.',
      affordances: ['back way', 'service corridor', 'staff door', 'through the kitchens', 'ask the staff', 'sneak'],
      costs: [{ resourceId: 'composure', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'corridors', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_to_his_face',
      name: 'Say It to His Face',
      tags: ['social'],
      description: 'Put what you know in front of your brother and watch him decide what to say.',
      affordances: ['confront', 'accuse', 'call him a liar', 'ask him straight', 'face him', 'tell him i know'],
      costs: [
        { resourceId: 'guard', amount: 20 },
        { resourceId: 'composure', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_microphone',
      name: 'Take the Microphone',
      tags: ['social'],
      description: 'Speak to the whole room at once, and let every guest in it hear exactly what you have to say.',
      affordances: ['take the mic', 'microphone', 'give a toast', 'make a speech', 'raise a glass', 'tell everyone', 'announce'],
      costs: [
        { resourceId: 'gossip', amount: 25 },
        { resourceId: 'composure', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'speaking', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_scene',
      name: 'Make a Scene',
      tags: ['social'],
      description: 'Let everybody see how you feel: a fist on the altar rail, the wisteria arch on the floor, a ring thrown in the sea.',
      affordances: ['make a scene', 'lose my temper', 'shout', 'grab his lapels', 'knock over', 'throw the ring', 'storm out'],
      costs: [
        { resourceId: 'gossip', amount: 20 },
        { resourceId: 'guard', amount: 5 },
        { resourceId: 'composure', amount: 10 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'might', skillId: 'muscle', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'smooth_it_over',
      name: 'Smooth It Over',
      tags: ['social'],
      description: 'Tell people a version of this that keeps the peace, true or not, and smile while you do it.',
      affordances: ['smooth it over', 'laugh it off', 'pretend', 'cover for', 'play it down', 'say it is fine', 'bluff'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_with_them',
      name: 'Stand With Them',
      tags: ['social'],
      description: 'Do not argue it and do not fix it. Stand next to somebody who is having the worst day of their life, and stay.',
      affordances: ['stay with her', 'stay with him', 'sit with her', 'hold her hand', 'say nothing', 'just be there', 'stay'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'show_the_proof',
      name: 'Lay Out the Proof',
      tags: ['social'],
      description: 'Put the evidence in front of the one person who needs to see it, in order, with the times, and no speech.',
      affordances: ['show her the proof', 'lay it out', 'show her the frame', 'show her the phone', 'show her the order', 'hand her the evidence', 'show the times'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'eye', baseDc: 12 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['proof_in_hand'],
        lockedCopy:
          'You have a feeling and a timeline in your head. Nothing yet that you could put on a table in front of a lawyer and watch her read.',
      },
    },
    {
      id: 'ask_about_1966',
      name: 'Ask About 1966',
      tags: ['social'],
      description: 'Ask your grandmother what really happened at this altar sixty years ago, and who was meant to be standing there.',
      affordances: ['ask about 1966', 'ask about arthur', 'ask about grandad', 'ask about her wedding', 'the first wedding', 'who was the empty chair for'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'instinct', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['constance_saw_the_pattern'],
        lockedCopy:
          'Your grandmother’s wedding is a story the family tells every Christmas, and you have heard it forty times. There is no reason to think it has a second version.',
      },
    },
  ],
  locations: [
    {
      id: 'the_chapel',
      name: 'The Glass Chapel',
      shortName: 'Chapel',
      description:
        'A chapel of white-painted iron and glass on the very edge of the cliff: rows of white chairs with every one taken, wisteria trained over the roof, and the sea filling every window behind the altar. The back row is eleven chairs by the doors, and from there you can see every face that turns.',
      artDirection:
        'Bright glass and white iron wedding chapel on a sea cliff at noon, rows of white chairs full of guests, wisteria hanging over a glass roof, deep blue sea behind the altar, white flowers everywhere. Luminous, crowded, tense.',
      connections: [
        { to: 'the_vestry', travelMinutes: 1, label: 'Through the door behind the altar' },
        { to: 'the_wisteria_lawn', travelMinutes: 1, label: 'Out through the double doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [],
    },
    {
      id: 'the_vestry',
      name: 'The Vestry',
      shortName: 'Vestry',
      description:
        'A narrow room behind the altar with a table, the register in a leather cover, the officiant’s folder, a box of tissues nobody has opened, and a window onto nothing but sea. Beside the register sits a plain gold band in a high-street box, the ring Marcus bought at nine this morning, with its receipt folded under the cushion: two cards declined before a third went through. It is the only room within forty feet of the altar with a door that shuts.',
      artDirection:
        'Small wood-panelled vestry behind a chapel altar, an open leather register on a table, a ring box, a window full of sea and sky, one chair. Quiet, close, private.',
      connections: [{ to: 'the_chapel', travelMinutes: 1, label: 'Back out to the altar' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'other_ring', qty: 1, ownerId: 'marcus', aka: ['his ring', 'the other ring', 'the plain band', 'marcus’s ring'] },
      ],
    },
    {
      id: 'the_wisteria_lawn',
      name: 'The Wisteria Lawn',
      shortName: 'Lawn',
      description:
        'A long lawn between the chapel and the hotel under a hundred-year-old wisteria arch, where the photographs happen and where every guest who wants a cigarette or a cry ends up. From here you can see the whole terrace and half the car park.',
      artDirection:
        'Long green clifftop lawn under a huge purple wisteria arch, guests in wedding clothes in small groups, a photographer crouching, a white hotel behind and the sea beyond. Bright, breezy, gossiping.',
      connections: [
        { to: 'the_chapel', travelMinutes: 1, label: 'Back into the chapel' },
        { to: 'the_terrace_bar', travelMinutes: 2, label: 'Up the steps to the terrace' },
        { to: 'the_lobby', travelMinutes: 3, label: 'Into the hotel' },
        { to: 'the_gatehouse', travelMinutes: 4, label: 'Down the drive to the gatehouse' },
        { to: 'the_cliff_path', travelMinutes: 4, label: 'Through the gate in the hedge' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'the_terrace_bar',
      name: 'The Terrace Bar',
      shortName: 'Terrace',
      description:
        'A stone terrace over the sea with a long brass bar, twenty tables, and a view that makes people say things they did not plan to. Between the ceremony and the reception this is where the whole wedding stands, drinking, and talking about you.',
      artDirection:
        'Sunlit stone hotel terrace above the sea, a long brass bar, wedding guests holding glasses, white parasols, a camera bag on a stool. Glamorous, loud, watchful.',
      connections: [
        { to: 'the_wisteria_lawn', travelMinutes: 2, label: 'Down the steps to the lawn' },
        { to: 'the_lobby', travelMinutes: 1, label: 'In through the French doors' },
        { to: 'the_long_room', travelMinutes: 1, label: 'Along to the Long Room' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'rehearsal_card', qty: 1, ownerId: 'benny', aka: ['memory card', 'sd card', 'rehearsal card', 'benny’s card'] },
      ],
    },
    {
      id: 'the_lobby',
      name: 'The Lobby',
      shortName: 'Lobby',
      description:
        'The Hale’s old front hall: black and white tiles, a front desk with a brass bell, a staircase that splits in two, four generations of Hales in oil on the walls, and a porter who has known you for thirty years and is pretending very hard not to look at you.',
      artDirection:
        'Grand old seaside hotel lobby, black and white tiled floor, a wooden front desk with a brass bell, a split staircase, oil portraits on panelled walls, afternoon light through tall windows. Elegant, worn, full of eyes.',
      connections: [
        { to: 'the_wisteria_lawn', travelMinutes: 3, label: 'Out to the lawn' },
        { to: 'the_terrace_bar', travelMinutes: 1, label: 'Through the French doors to the terrace' },
        { to: 'the_long_room', travelMinutes: 1, label: 'Through the double doors to the Long Room' },
        { to: 'the_kitchens', travelMinutes: 2, label: 'Through the staff door to the kitchens' },
        { to: 'the_events_office', travelMinutes: 2, label: 'Down the staff stairs' },
        { to: 'the_bridal_suite', travelMinutes: 4, label: 'Up the left staircase to the top floor' },
        { to: 'constance_study', travelMinutes: 3, label: 'Along the corridor to the old wing' },
        { to: 'the_car_park', travelMinutes: 3, label: 'Out the front to the car park' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
      takeableItems: [
        { itemId: 'battery_pack', qty: 1, ownerId: null, aka: ['battery pack', 'power bank', 'phone charger', 'charger'] },
      ],
    },
    {
      id: 'the_long_room',
      name: 'The Long Room',
      shortName: 'Long Room',
      description:
        'The ballroom: a long gilded room with twelve windows onto the sea, a head table, a dance floor, a four-tier cake with two names iced on it, and a microphone on a stand that has been switched on since five.',
      artDirection:
        'Long gilded hotel ballroom set for a wedding reception, twelve tall windows onto the evening sea, round tables with white cloths, a head table, a tall white cake, a microphone stand by the dance floor. Golden, expectant.',
      connections: [
        { to: 'the_lobby', travelMinutes: 1, label: 'Out to the lobby' },
        { to: 'the_terrace_bar', travelMinutes: 1, label: 'Out onto the terrace' },
        { to: 'the_kitchens', travelMinutes: 1, label: 'Through the swing doors to the kitchens' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'seating_chart', qty: 1, ownerId: null, aka: ['seating chart', 'table plan', 'seating board'] },
      ],
    },
    {
      id: 'the_kitchens',
      name: 'The Kitchens',
      shortName: 'Kitchens',
      description:
        'Steel counters, forty staff, a pass that never stops, and at the far end the flower cold room with its heavy door and round window. Everybody down here knew what had happened by half past twelve, and most of them have opinions.',
      artDirection:
        'Busy professional hotel kitchen, steel counters, chefs in whites, steam, a heavy cold-room door with a round porthole window at the far end, buckets of yellow flowers inside. Hot, fast, conspiratorial.',
      connections: [
        { to: 'the_long_room', travelMinutes: 1, label: 'Through the swing doors to the Long Room' },
        { to: 'the_lobby', travelMinutes: 2, label: 'Up to the lobby' },
        { to: 'the_events_office', travelMinutes: 1, label: 'Down the corridor to the events office' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
      takeableItems: [
        { itemId: 'strong_coffee', qty: 3, ownerId: null, aka: ['coffee', 'espresso', 'a coffee', 'double espresso'] },
      ],
    },
    {
      id: 'the_events_office',
      name: 'The Events Office',
      shortName: 'June’s Office',
      description:
        'A windowless basement office with three monitors, a wall of run sheets, a camp bed folded behind the door, a printer still warm, and a box marked SPOILS full of cards that were wrong this morning.',
      artDirection:
        'Cramped windowless hotel basement office, three glowing monitors, run sheets pinned to a wall, a folded camp bed, a cardboard box of discarded place cards, a headset on the desk. Tired, fluorescent, honest.',
      connections: [
        { to: 'the_kitchens', travelMinutes: 1, label: 'Back along to the kitchens' },
        { to: 'the_lobby', travelMinutes: 2, label: 'Up the staff stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
      takeableItems: [
        { itemId: 'reprint_order', qty: 1, ownerId: 'june', aka: ['order sheet', 'reprint order', 'job sheet', 'print order'] },
        { itemId: 'your_place_card', qty: 1, ownerId: 'june', aka: ['place card', 'my place card', 'my name card', 'the spoils box'] },
        { itemId: 'master_key', qty: 1, ownerId: 'june', aka: ['master key', 'key card', 'staff card', 'spare key'] },
      ],
    },
    {
      id: 'the_bridal_suite',
      name: 'The Bridal Suite',
      shortName: 'Bridal Suite',
      description:
        'The top-floor suite with the round turret window, an empty dress bag, three phone chargers, a breakfast tray nobody touched, and a desk covered in papers that are not about flowers.',
      artDirection:
        'Elegant top-floor hotel suite with a round turret window over the sea, an empty garment bag, an untouched breakfast tray, a writing desk covered in legal papers, afternoon light. Quiet, private, anxious.',
      connections: [{ to: 'the_lobby', travelMinutes: 4, label: 'Down the stairs' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'the_photograph', qty: 1, ownerId: 'elena', aka: ['printout', 'the print', 'the photograph', 'the picture'] },
        { itemId: 'trust_letter', qty: 1, ownerId: 'elena', aka: ['trust letter', 'letter from the trustees', 'the trust papers', 'her letter'] },
      ],
    },
    {
      id: 'constance_study',
      name: 'Grandmother’s Study',
      shortName: 'Study',
      description:
        'A wood-panelled room in the old wing with the curtains always open, a desk the size of a rowing boat, a silver-framed photograph from 1966, and a cream envelope set exactly in the middle of the blotter.',
      artDirection:
        'Old wood-panelled study in a seaside hotel, a huge desk with a leather blotter, a sealed cream envelope in the centre, a silver-framed black and white wedding photograph, tall windows onto the sea. Formal, still, full of years.',
      connections: [{ to: 'the_lobby', travelMinutes: 3, label: 'Back along to the lobby' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'photo_1966', qty: 1, ownerId: 'constance', aka: ['old photograph', 'black and white photo', '1966 photo', 'the silver frame'] },
        { itemId: 'arthurs_letter', qty: 1, ownerId: 'constance', aka: ['arthur’s letter', 'old letter', 'letter from abroad', 'letter in the drawer'] },
        { itemId: 'toast_envelope', qty: 1, ownerId: 'constance', aka: ['sealed envelope', 'the envelope', 'toast envelope', 'her envelope'] },
      ],
    },
    {
      id: 'the_gatehouse',
      name: 'The Gatehouse',
      shortName: 'Gatehouse',
      description:
        'The stone cottage at the bottom of the drive where the groom’s party stayed: three bedrooms, a sofa with a dent in it, last night’s bottles, your bag, and your brother’s own jacket over the back of a chair, where he left it when he put on yours.',
      artDirection:
        'Small stone gatehouse cottage interior, a dented sofa, empty bottles on a table, a man’s dark jacket hung over a chair back, a travel bag, light through a small window. Messy, intimate, abandoned in a hurry.',
      connections: [
        { to: 'the_wisteria_lawn', travelMinutes: 4, label: 'Up the drive to the lawn' },
        { to: 'the_car_park', travelMinutes: 2, label: 'Across to the car park' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'second_phone', qty: 1, ownerId: 'marcus', aka: ['second phone', 'cheap phone', 'burner', 'his other phone'] },
      ],
    },
    {
      id: 'the_car_park',
      name: 'The Car Park',
      shortName: 'Car Park',
      description:
        'Gravel, rows of guests’ cars, a white car with ribbons on it that nobody has told what to do, and yours, still ticking from the coast road, with the driver’s door not quite shut. From here the road goes anywhere.',
      artDirection:
        'Gravel hotel car park on a clifftop, rows of guests’ cars, a white wedding car with ribbons, one dusty car with its door ajar, the coast road winding away. Open, tempting, final.',
      connections: [
        { to: 'the_gatehouse', travelMinutes: 2, label: 'Over to the gatehouse' },
        { to: 'the_lobby', travelMinutes: 3, label: 'In through the front doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'the_cliff_path',
      name: 'The Cliff Path',
      shortName: 'Cliff Path',
      description:
        'A narrow path along the cliff top with a rail on the sea side, gorse on the other, and a bench with a brass plate for Edwin Hale. It is the one place on the estate where nobody from the wedding can see you, and the only place with a phone signal strong enough for a private call.',
      artDirection:
        'Narrow clifftop path at golden hour, a sturdy wooden rail on the sea side, yellow gorse, a weathered bench with a brass plaque, the hotel small in the distance. Windy, private, beautiful.',
      connections: [
        { to: 'the_wisteria_lawn', travelMinutes: 4, label: 'Back through the hedge to the lawn' },
        { to: 'the_boathouse', travelMinutes: 6, label: 'Down the steps to the beach' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: -1 },
      takeableItems: [],
    },
    {
      id: 'the_boathouse',
      name: 'The Old Boathouse',
      shortName: 'Boathouse',
      description:
        'A tarred wooden boathouse at the foot of the cliff steps, full of oars and a rowing boat nobody has taken out since your grandfather died. At low tide you can walk round the point from here to the town.',
      artDirection:
        'Old tarred wooden boathouse on a pebble beach under tall cliffs, oars on the walls, an upturned rowing boat, low tide and wet rocks, evening light. Weathered, hidden, quiet.',
      connections: [{ to: 'the_cliff_path', travelMinutes: 6, label: 'Back up the cliff steps' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: -1 },
      takeableItems: [],
    },
  ],
  factions: [
    {
      id: 'faction_guests',
      name: 'The Two Hundred',
      description:
        'Both families, Elena’s father’s boatyard crew, the Hale’s oldest regulars, and three people nobody can identify. They came for a wedding and got a better story, and whoever they end up rooting for is the version that will be told for twenty years.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'The jilted one' },
        { atReputation: 25, label: 'The one they feel for' },
        { atReputation: 50, label: 'The one they are rooting for' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_staff',
      name: 'The Staff of the Hale',
      description:
        'Forty people in the kitchens, the porter, the seamstress who let your suit out for your brother at seven, and June’s whole team. They know everything that happens in the building within ten minutes, and they decide, quietly, whom to help.',
      startingReputation: 25,
      ranks: [
        { atReputation: 0, label: 'Family of the owner' },
        { atReputation: 35, label: 'One of ours' },
        { atReputation: 60, label: 'Whatever you need' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_hales',
      name: 'The Hale Family',
      description:
        'Grandmother Hale, two aunts, a scattering of cousins, and sixty years of a family story about a wedding in 1966. They close ranks in public and argue in the study.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'The one who ran' },
        { atReputation: 30, label: 'The younger grandson' },
        { atReputation: 55, label: 'The heir' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_wards',
      name: 'The Wards',
      description:
        'Elena’s father Desmond, his two sisters, and a boatyard with sixty people on its payroll and a payment due on Monday. They want Elena safe and the yard open, and they are not sure yet which of those you are.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'The man in the photograph' },
        { atReputation: 30, label: 'The man she chose first' },
        { atReputation: 55, label: 'Family' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'elena',
      name: 'Elena Ward',
      role: 'The bride. Your fiancée until some time this morning, a litigation lawyer, and the only person in the chapel with a deadline',
      cardBlurb:
        'She loved you yesterday. Today she is asking you, very politely, in front of everyone, to sit in the back. She will not be talked round. She can be shown, if you find something to show her.',
      pronouns: 'she/her',
      publicTraits: ['Precise to the point of cruelty when frightened', 'Composed in public, always', 'Will not be rescued'],
      hiddenDrives: [
        'She wants the photograph to be a lie more than she has wanted anything, and will not let herself hope until she can prove it',
        'She is protecting her father and sixty jobs at his boatyard, and has told nobody, because she will not be the bride who married for money',
      ],
      values: ['Evidence over feeling', 'Saying yes only to things she has read all the way through'],
      fears: [
        'Being the woman who believed him and was wrong',
        'Turning thirty at midnight with nothing signed and her father’s yard gone on Monday',
      ],
      socialStyle:
        'Cross-examines. Short questions, one at a time, and she waits for the answer rather than filling the silence. She gets quieter as she gets angrier. Says why it had to be today only behind a shut door, and only once you stop defending yourself and ask.',
      boundaries: [
        'Will not be told what she saw. She will be shown something else, or nothing',
        'Will not be touched today unless she reaches first',
        'Will not be carried out of this like a prize, by either brother',
      ],
      goals: [
        'Be married before midnight, to somebody, on paper',
        'Get through the day without anybody seeing her cry',
        'Find out whether the photograph is true without being the one who has to ask',
      ],
      secrets: [
        {
          id: 'elena_the_deadline',
          fact: 'Her late mother’s trust pays out only if she marries before her thirtieth birthday, which is midnight tonight. Otherwise it goes to a sailing foundation and her father’s boatyard misses Monday’s payment. She never told the player because she wanted to be sure she was being married for love and not for a deadline.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you herself, behind a closed door, once you stop defending yourself long enough to ask her why it had to be today.',
        },
        {
          id: 'elena_on_paper',
          fact: 'She agreed to Marcus as a marriage on paper: sign today, the trust pays, end it quietly within a year. She has told nobody else, including her father.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after you have shown her proof about the photograph. Then it comes out of her all at once, angrily, as if it were your fault.',
        },
        {
          id: 'elena_asked_june',
          fact: 'At twenty to six she showed June the photograph and asked if it was her. June said "I don’t know what you want me to say", and Elena took that as a yes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She uses it against you, as evidence, if you deny being in the cold room at all.',
        },
      ],
      speechStyle:
        'Clipped, exact, lawyerly. Asks one question at a time and repeats it word for word if it is dodged. Counts things: calls, minutes, lies. When she breaks it is one long sentence with no full stops in it.',
      topics: ['the photograph', 'the cold room', 'eleven calls', 'midnight', 'her mother’s watch', 'Marcus', 'your vows'],
      voiceSamples: [
        'Eleven calls. One voicemail. One photograph. You have had all morning to explain one of those, so start there.',
        'Don’t tell me what I saw. Show me something I didn’t.',
        'Yes or no. Were you in the cold room with her at twenty to midnight?',
        'I am marrying a deadline, not a man. You would have known that if I had ever been brave enough to say it.',
      ],
      appearance:
        'An adult woman, slim and very straight-backed, dark brown hair in a low knot with one sprig of white wisteria in it, dark eyes, a long-sleeved, high-necked ivory wedding dress, a small gold watch on her right wrist, and a calm face that is doing a great deal of work.',
      visualHook: 'Her late mother’s small gold watch, worn on the wrong wrist with a wedding dress and checked far too often.',
      silhouette: 'Very straight, bouquet held low in both hands like a gavel, chin up.',
      artSeed: 'brw-elena-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'hurt', 'stricken', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_bridal_suite', activity: 'in the bridal suite with the lights off and her phone face down' },
        { startMinute: 480, endMinute: 700, locationId: 'the_bridal_suite', activity: 'being made ready by people who keep not mentioning it' },
        { startMinute: 700, endMinute: 780, locationId: 'the_chapel', activity: 'at the altar, holding a hand she has to keep reminding herself to hold' },
        { startMinute: 780, endMinute: 900, locationId: 'the_wisteria_lawn', activity: 'photographs under the wisteria, smiling on the count of three' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_bridal_suite', activity: 'upstairs, changing shoes and ringing her father twice' },
        { startMinute: 1080, endMinute: 1380, locationId: 'the_long_room', activity: 'at the head table, checking a small gold watch' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_chapel', activity: 'alone in the empty chapel, counting down to thirty' },
      ],
      homeLocationId: 'the_bridal_suite',
      knowledgeScope: ['elena', 'the_photograph', 'the_trust', 'the_hale', 'the_wedding', 'marcus', 'june'],
      startingRelationship: { trust: 20, affection: 55, respect: 40, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'elena_shows_you',
          label: 'She shows you what she was sent',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'elena_hears_the_proof',
          label: 'She lets you put the proof in front of her',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['proof_in_hand'] },
        },
        {
          id: 'elena_says_why_today',
          label: 'She tells you why it had to be today',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'elena_chooses_you',
          label: 'She chooses you, knowing everything',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 75, flagsSet: ['elena_knows_the_truth'] },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 16, presence: 14, resolve: 15, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'marcus',
      name: 'Marcus Hale',
      role: 'Your older brother, standing at the altar in your suit',
      cardBlurb:
        'He is the charming one, the one every aunt asks after, and the one standing where you should be. He will tell you he did it for the family, and he will say it so warmly that you will want to believe him.',
      pronouns: 'he/him',
      publicTraits: ['Charming in every room he has ever walked into', 'Buys the round before anybody asks', 'Never raises his voice'],
      hiddenDrives: [
        'He has loved Elena since before you met her, introduced you to her himself, and has never forgiven himself for it',
        'He owes 380,000 to a lender since his restaurant closed, and the Hale is the only thing he could borrow against',
      ],
      values: ['Family, as long as he is the one holding it together', 'Looking like the good one'],
      fears: [
        'The man in the grey suit',
        'Being second to his younger brother in front of Grandmother one more time',
        'Elena finding out what he did before she has had a chance to love him back',
      ],
      socialStyle:
        'Touches shoulders, says "we", and agrees with you warmly while doing the opposite. Cornered, he gets calmer and more reasonable, which is when he is most dangerous.',
      boundaries: [
        'Will not hit back. He knows exactly how it looks if he lets you swing first',
        'Will not admit anything in front of Grandmother Hale',
        'Will not admit the photograph, even alone, until you have proof in your hand and nobody else can hear',
        'Will not hurt Elena on purpose',
      ],
      goals: [
        'Get the vows said and the register signed',
        'Hear his own name read out of the envelope at eight o’clock',
        'Pay the lender before Monday',
      ],
      secrets: [
        {
          id: 'marcus_the_photograph',
          fact: 'He photographed the player hugging June through the cold-room window at 11:40, cropped it, and sent it to Elena at 1:14 from a cheap second phone. The phone is in his own jacket in the gatehouse.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only alone with you, after you have proof in hand, and only if he believes nobody else will ever hear it.',
        },
        {
          id: 'marcus_the_errand',
          fact: 'He invented the urgency of the ring errand to put the player on the coast road, where there is no signal, for the whole night.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Grandmother Hale works it out the moment she hears the words "ten to midnight", and he knows she will.',
        },
        {
          id: 'marcus_the_debt',
          fact: 'He owes 380,000 to a private lender, and a man in a grey suit is coming to the terrace bar this afternoon to remind him.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Plain to anybody watching him at the terrace bar after half past three, and to Sami, who is owed six thousand himself.',
        },
      ],
      speechStyle:
        'Warm, easy, older-brother. Says "hey" to slow you down, calls you "brother" like a hand on the back of your neck, and says "we" when he means "I". Never finishes an apology.',
      topics: ['the suit', 'the vows', 'Elena', 'Grandmother', 'the Hale', 'his restaurant', 'last night'],
      voiceSamples: [
        'Hey. Hey. Look at me. We can fix this, but not in front of Gran’s entire address book.',
        'Somebody had to stand up there, brother. You weren’t answering.',
        'I lifted that suit off the rail at seven and it still smelled of your aftershave. You think I enjoyed any of this?',
        'Go on, then. Two hundred witnesses, and every one of them will remember who swung first.',
      ],
      appearance:
        'An adult man, tall and handsome in an easy, sunlit way, sandy hair pushed back, light blue eyes, a ready smile, wearing your charcoal wedding suit with a white rose in the buttonhole, let out at the shoulders this morning and an inch short in the sleeves, so his shirt cuffs show.',
      visualHook: 'Your wedding suit on the wrong brother: let out at the shoulders, an inch short at the wrists.',
      silhouette: 'Loose and open, one hand always resting on somebody else’s shoulder.',
      artSeed: 'brw-marcus-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'cornered', 'guilty', 'sorry'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_gatehouse', activity: 'in the gatehouse, not sleeping much' },
        { startMinute: 420, endMinute: 700, locationId: 'the_lobby', activity: 'being fitted into your suit and shaking hands in the lobby' },
        { startMinute: 700, endMinute: 780, locationId: 'the_chapel', activity: 'at the altar in your suit' },
        { startMinute: 780, endMinute: 900, locationId: 'the_wisteria_lawn', activity: 'in every photograph, a hand on every shoulder' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_terrace_bar', activity: 'at the terrace bar, buying rounds on a card he keeps checking' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_room', activity: 'working the Long Room table by table' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_cliff_path', activity: 'on the cliff path with his phone, where nobody can hear him' },
      ],
      homeLocationId: 'the_gatehouse',
      knowledgeScope: ['marcus', 'the_photograph', 'the_errand', 'the_trust', 'the_debt', 'the_hale', 'elena'],
      startingRelationship: { trust: 30, affection: 40, respect: 25, fear: 0, rivalry: 45 },
      gates: [
        {
          id: 'marcus_talks_money',
          label: 'He tells you about the money',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'marcus_admits_it',
          label: 'He admits it, to you, with nobody else in the room',
          kind: 'OTHER',
          requires: { respect: 40, flagsSet: ['proof_in_hand'] },
        },
      ],
      attributes: { might: 12, agility: 12, mind: 13, presence: 16, resolve: 10, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'constance',
      name: 'Constance Hale',
      calledName: 'Grandmother Hale',
      role: 'Your grandmother. Owner of the Hale for fifty-eight years, and the only person in the chapel who is not surprised',
      cardBlurb:
        'She did not turn around when you walked in, because somebody had already told her a story about you, and she believed it. Tonight she names who gets the hotel, and right now it is not going to be you.',
      pronouns: 'she/her',
      publicTraits: ['Has never raised her voice', 'Speaks of the hotel as if it were a person', 'Decides things once'],
      hiddenDrives: [
        'She married the brother who turned up, in 1966, and has spent sixty years making sure that was the right decision',
        'She is frightened the Hale dies with her, and will forgive a great deal in whoever keeps it alive',
      ],
      values: ['Turning up', 'Never making a scene in front of guests'],
      fears: ['That history is repeating and she is helping it', 'Being made a fool of in her own chapel'],
      socialStyle:
        'Receives people rather than talks to them. Asks for facts in order and hears every one of them before she says anything at all.',
      boundaries: [
        'Will not discuss family business in front of guests',
        'Will not change her mind because somebody shouts',
        'Will not hear a word against Edwin Hale, her late husband, until she has said it herself',
        'Will not speak of 1966 unless you have told her, alone, who sent you to the city at ten to midnight, and then asked her straight',
      ],
      goals: [
        'Get both grandsons through the day without a public disgrace',
        'Name the right keeper of the Hale at eight o’clock',
        'Keep the Ward trust lawful, as its trustee',
      ],
      secrets: [
        {
          id: 'constance_arthur',
          fact: 'In 1966 she waited at this altar for Arthur Hale, then twenty-six, who never came, and married his younger brother Edwin, then twenty-four, that afternoon. In 1979 she found Arthur’s letter in Edwin’s desk: Edwin had sent him away on an errand the night before. She kept the letter, kept the marriage, and told nobody.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after you have told her about the errand, alone, and asked her straight what really happened in 1966.',
        },
        {
          id: 'constance_the_envelope',
          fact: 'A month ago she wrote the player’s name in the envelope for tonight’s toast. At six this morning she decided to change it to Marcus, and has not yet.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She mentions the envelope if you ask her what tonight’s toast is for. She does not say whose name is in it.',
        },
        {
          id: 'constance_trustee',
          fact: 'She is a trustee of Elena’s mother’s trust and knows about the midnight deadline. At six this morning she told Elena that the trust says married, not to whom.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confirms it to anybody who already knows about the deadline and asks her as a trustee rather than as a grandmother.',
        },
      ],
      speechStyle:
        'Mid-century formal, short declaratives, full names. Calls the player "darling" as a reprimand. Refers to herself in the third person when she is being immovable. Never asks a question she does not already half know the answer to.',
      topics: ['the Hale', 'the envelope', '1966', 'your grandfather', 'the trust', 'Marcus', 'the toast'],
      voiceSamples: [
        'Sit down, darling. The Hale has survived two wars and a sewage strike. It will survive this.',
        'I married the brother who turned up. It was the best decision anybody ever made on my behalf.',
        'Constance Hale does not turn around in her own chapel. People come round to the front.',
        'Tell me where you were at ten to midnight. Slowly. Leave nothing out.',
      ],
      appearance:
        'An elderly woman, small and very upright, white hair set in a perfect wave, pale grey eyes, a double string of pearls, a dove-grey silk suit, and a black cane with a silver top that she does not need and carries anyway.',
      visualHook: 'A silver-topped cane she does not need, held across her knees like a sceptre.',
      silhouette: 'Upright and small in the front pew, the back of her head as eloquent as anybody’s face.',
      artSeed: 'brw-constance-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'unreadable', 'grave', 'fond'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'constance_study', activity: 'in her study with the curtains open' },
        { startMinute: 600, endMinute: 700, locationId: 'the_lobby', activity: 'in the lobby, receiving people as if it were a throne room' },
        { startMinute: 700, endMinute: 780, locationId: 'the_chapel', activity: 'front pew, not turning around' },
        { startMinute: 780, endMinute: 1080, locationId: 'constance_study', activity: 'in her study, with an envelope and a pen she has not used yet' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_room', activity: 'at the head table, watching both grandsons' },
        { startMinute: 1320, endMinute: 1440, locationId: 'constance_study', activity: 'in her study with the old wing’s lights on' },
      ],
      homeLocationId: 'constance_study',
      knowledgeScope: ['constance', 'the_hale', 'the_trust', '1966', 'the_envelope', 'marcus', 'elena'],
      startingRelationship: { trust: 35, affection: 50, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'constance_hears_you',
          label: 'She hears your side, all of it, in order',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'constance_tells_you_1966',
          label: 'She tells you who the empty chair was for',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['constance_saw_the_pattern'] },
        },
        {
          id: 'constance_names_you',
          label: 'She puts your name back in the envelope',
          kind: 'ALLIANCE',
          requires: { trust: 65, respect: 55 },
        },
      ],
      attributes: { might: 6, agility: 7, mind: 16, presence: 17, resolve: 18, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'june',
      name: 'June Arden',
      role: 'Events manager at the Hale, who planned this wedding with you for eleven months',
      cardBlurb:
        'She has run this day to the minute for eleven months, and since you walked in she has not once looked at you. She keeps starting to say something, and stopping.',
      pronouns: 'she/her',
      publicTraits: ['Runs a whole wedding from a headset without raising her voice', 'Apologises to furniture', 'Remembers every guest’s allergy'],
      hiddenDrives: [
        'She has been half in love with you for about four months, and that is exactly why she froze when Elena asked her',
        'She wants to undo what her silence did without losing the job her flat comes with',
      ],
      values: ['Everybody fed, everybody seated, everybody safe', 'Owning her mistakes on paper, in writing, with times'],
      fears: [
        'Being the other woman in a story where she was never the other woman',
        'Losing the Hale, her job and her staff flat in one evening',
      ],
      socialStyle:
        'Professional until the second she is not. Talks in times, cues and run sheets, and goes very quiet and very honest when somebody stops her in a corridor.',
      boundaries: [
        'Will not lie for Marcus, even to keep her job',
        'Will not say what she feels about you while you are still somebody else’s groom',
        'Will not leave her staff in the middle of a service',
        'Will not hand the order sheet to anybody who might make her the scandal',
        'Will not be used to make Elena jealous; she sees it at once and leaves the room',
      ],
      goals: [
        'Get the day through without anybody getting hurt',
        'Undo what she said, or did not say, at twenty to six',
        'Keep her job',
      ],
      secrets: [
        {
          id: 'june_the_answer',
          fact: 'When Elena showed her the photograph at 5:40 and asked if it was her, June said "I don’t know what you want me to say", and Elena took it as a yes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you in a corridor, unprompted, if you find her alone and do not blame her first.',
        },
        {
          id: 'june_the_order',
          fact: 'Marcus told her to reprint the place cards and correct the welcome board at 5:52, eighteen minutes before Elena agreed to marry him. She has the order sheet with his signature and the time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to you once she trusts that you will not use her as the scandal.',
        },
        {
          id: 'june_feelings',
          fact: 'She has feelings for the player and has never said so to anybody, which is why the photograph felt like being caught at something she never did.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Not today, unless you are nobody’s groom any more and you ask her something that is not about the wedding.',
        },
      ],
      speechStyle:
        'Run-sheet English: times to the minute, "copy", "standing by", "go". Professional politeness that cracks into fast, honest, slightly too much. Never loses her temper on the headset; mutters at the run sheet off it.',
      topics: ['the cold room', 'the flowers', 'the place cards', 'the reprint order', 'the run sheet', 'the staff', 'her job'],
      voiceSamples: [
        'Twelve-oh-six. Ceremony’s live, vows in fourteen minutes, and I am not supposed to be telling you any of that.',
        'Copy. Copy that. No, I can’t talk, I’m standing right next to him.',
        'It was yellow ranunculus instead of white roses, and I cried about flowers, in a fridge, on the worst night of my career. That’s the whole scandal.',
        'She asked me if it was me. I said I didn’t know what she wanted me to say. That sentence is going on my headstone.',
      ],
      appearance:
        'An adult woman, auburn hair in a no-nonsense ponytail, green eyes, a light dusting of freckles, a black events suit, a headset round her neck, a clipboard held against her chest, and flat black shoes for a fourteen-hour day.',
      visualHook: 'A headset worn round her neck all day, which she talks into without looking away from you.',
      silhouette: 'Clipboard against her chest, half turned towards the next problem.',
      artSeed: 'brw-june-01',
      portrait: null,
      expressions: ['neutral', 'flustered', 'guilty', 'warm', 'professional'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'the_events_office', activity: 'in the basement office, asleep on the camp bed she keeps for late events' },
        { startMinute: 420, endMinute: 690, locationId: 'the_lobby', activity: 'running the morning from a headset' },
        { startMinute: 690, endMinute: 780, locationId: 'the_chapel', activity: 'at the back doors with a headset and a clipboard' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_kitchens', activity: 'in the kitchens, keeping a hundred things moving' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_room', activity: 'at the edge of the Long Room, cueing the band and the toasts' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_events_office', activity: 'in her office with the door shut' },
      ],
      homeLocationId: 'the_events_office',
      knowledgeScope: ['june', 'the_cold_room', 'the_reprint_order', 'the_hale', 'the_wedding', 'the_staff'],
      startingRelationship: { trust: 50, affection: 60, respect: 55, fear: 10, rivalry: 0 },
      gates: [
        {
          id: 'june_tells_you',
          label: 'She tells you what she said at twenty to six',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'june_will_say_it',
          label: 'She will say it to Elena’s face',
          kind: 'ALLIANCE',
          requires: { trust: 65, flagsSet: ['knows:the_photograph'] },
        },
        {
          id: 'june_something_starts',
          label: 'Something starts, slowly and on purpose',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 78, flagsSet: ['june_in_the_open'] },
        },
      ],
      attributes: { might: 10, agility: 14, mind: 15, presence: 13, resolve: 12, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'sami',
      name: 'Sami Rahal',
      role: 'Your best friend since university, your best man, and a paramedic who is treating this as an emergency',
      cardBlurb:
        'He was told at seven this morning that you had run off, and did not believe it for a second. He is on your side for anything you decide to do, including the stupid version. He would just like some warning first.',
      pronouns: 'he/him',
      publicTraits: ['Unshakeable in a real crisis', 'Hopeless in a social one', 'Loyal past the point of sense'],
      hiddenDrives: [
        'He has never liked Marcus and has spent ten years being polite about it for your sake',
        'He is frightened you will do something today you cannot take back, a punch at your brother or a drive after the bar, because he has driven too many people to hospital after one bad decision at a party',
      ],
      values: ['Showing up', 'Saying it plainly'],
      fears: ['You throwing a punch or a ring in front of everybody that you can never take back', 'Being useless when it matters'],
      socialStyle:
        'Triage first: checks you over, makes a joke, then asks the one question that matters. Stands between you and trouble without being asked.',
      boundaries: [
        'Will not lie to Elena for you',
        'Will not let you drive tonight if you have been at the bar',
        'Will not stand up as best man for Marcus, whatever anybody says',
      ],
      goals: ['Get you through today in one piece', 'Find out who started the story that you ran off'],
      secrets: [
        {
          id: 'sami_the_loan',
          fact: 'Marcus borrowed six thousand from him last spring "for a fortnight" and has never paid it back or mentioned it since.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you the moment you wonder out loud whether Marcus needs money.',
        },
        {
          id: 'sami_the_charger',
          fact: 'He has had a phone charger in his jacket pocket all morning, from his car, in case you turned up.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He produces it the first time you mention your dead phone.',
        },
      ],
      speechStyle:
        'Paramedic deadpan. Talks to you like a patient — pupils, breathing, colour — and turns it into a joke halfway through. Short sentences under pressure, long ridiculous ones when he is trying to make you laugh.',
      topics: ['your phone', 'Marcus', 'the best man speech', 'what you want', 'the car keys', 'Elena'],
      voiceSamples: [
        'Look at me. Pupils equal, colour terrible. You are not having a heart attack. You are having a wedding.',
        'Your brother asked me to stay on as best man. For him. I told him where he could pin the buttonhole.',
        'Whatever you’re about to do, I’m in. I’d just like ten seconds’ warning so I can move the elderly relatives.',
        'He still owes me six grand from last spring. Never said anything, because he’s family. Yours, I mean. Not mine, thank God.',
      ],
      appearance:
        'An adult man, broad-shouldered and cheerful, close-cropped black hair, dark eyes, a wide easy grin, the navy best-man suit he was fitted for, tie loosened, with the white best-man flower still pinned on.',
      visualHook: 'The best man’s white flower, still pinned on, slightly crushed from an aunt’s hug.',
      silhouette: 'Big and planted, arms folded, standing slightly in front of you.',
      artSeed: 'brw-sami-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'alarmed', 'fond'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'the_gatehouse', activity: 'on the gatehouse sofa' },
        { startMinute: 480, endMinute: 700, locationId: 'the_car_park', activity: 'in his car, ringing a dead phone' },
        { startMinute: 700, endMinute: 780, locationId: 'the_chapel', activity: 'side pew, still wearing the best man’s flower' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_terrace_bar', activity: 'at the terrace bar, refusing to stand anywhere near your brother' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_room', activity: 'at a table nowhere near the head table' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_terrace_bar', activity: 'on the terrace steps with a bottle of water' },
      ],
      homeLocationId: 'the_gatehouse',
      knowledgeScope: ['sami', 'the_player_before', 'marcus', 'the_wedding', 'elena'],
      startingRelationship: { trust: 80, affection: 75, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sami_tells_you_about_the_loan',
          label: 'He tells you what your brother owes him',
          kind: 'TRUST',
          requires: { trust: 85 },
        },
        {
          id: 'sami_backs_any_play',
          label: 'He will help with anything, including the stupid version',
          kind: 'ALLIANCE',
          requires: { trust: 80 },
        },
      ],
      attributes: { might: 14, agility: 12, mind: 13, presence: 12, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'benny',
      name: 'Benny Castellano',
      role: 'The wedding photographer, hired by June, who has shot six hundred weddings and photographs everything',
      cardBlurb:
        'He has shot six hundred weddings, never deletes a frame and never takes sides. His contract is with the couple named on it, and the couple named on it is still Elena and you.',
      pronouns: 'he/him',
      publicTraits: ['Sees everything through a long lens', 'Neutral as a matter of professional pride', 'Talks about light the way other people talk about weather'],
      hiddenDrives: [
        'Twenty years ago he shot a wedding like this one, kept quiet about what he saw, and has thought about it at every wedding since',
        'He wants the shot of his career, and suspects it is today',
      ],
      values: ['The contract', 'Never staging a moment'],
      fears: ['Being sued', 'Being in the story instead of photographing it'],
      socialStyle: 'Speaks from behind the camera, compliments the light rather than the person, and answers questions by describing a frame.',
      boundaries: [
        'Will not hand raw files to anybody who is not on his contract',
        'Will not delete a frame because somebody asks him to',
        'Will not stage anything, even for you',
      ],
      goals: ['Get the shot', 'Get paid', 'Stay out of it'],
      secrets: [
        {
          id: 'benny_frame_2214',
          fact: 'Frame 2214 on last night’s memory card shows Marcus Hale at the cold-room door at 11:40, holding his phone up to the round window. Benny thought he was filming the cake.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He goes looking for it if anybody asks him what he shot in the kitchen corridor last night.',
        },
        {
          id: 'benny_the_last_time',
          fact: 'Twenty years ago he photographed a wedding where the best man and the bride were not what they looked like, kept quiet, and watched it go wrong for ten years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells it at the bar, late, to explain why he is helping when he swore he would not.',
        },
      ],
      speechStyle:
        'Wry, unhurried, technical. Gives times as camera settings and evidence as frames. Never says anybody is wrong; says what the light shows.',
      topics: ['frame 2214', 'golden hour', 'the contract', 'the kitchen corridor', 'six hundred weddings', 'the first dance'],
      voiceSamples: [
        'Golden hour is seven-forty. Whatever you are going to do, do it facing west.',
        'Six hundred weddings. The camera does not care who is in the suit. I do, a little.',
        'Frame two-two-one-four. Kitchen corridor, eleven-forty, f-two-point-eight. Your brother, holding a phone up to a window. I thought he was filming the cake.',
        'The contract says raw files go to the couple. The couple on my contract is her and you. So technically, you are my client.',
      ],
      appearance:
        'A middle-aged man, stocky and bald, a short grey beard, a black waistcoat over a white shirt with the sleeves rolled, two cameras on crossed straps, and white trainers he swears are formal.',
      visualHook: 'Two cameras on crossed straps, one long lens and one short, never both put down at once.',
      silhouette: 'Crouched low at the end of an aisle, one eye shut.',
      artSeed: 'brw-benny-01',
      portrait: null,
      expressions: ['neutral', 'wry', 'interested'],
      schedule: [
        { startMinute: 0, endMinute: 600, locationId: 'the_lobby', activity: 'in a lobby armchair with a laptop, backing up cards' },
        { startMinute: 600, endMinute: 690, locationId: 'the_wisteria_lawn', activity: 'shooting the empty chapel and the flowers' },
        { startMinute: 690, endMinute: 780, locationId: 'the_chapel', activity: 'in the side aisle, shooting' },
        { startMinute: 780, endMinute: 900, locationId: 'the_wisteria_lawn', activity: 'family photographs under the wisteria' },
        { startMinute: 900, endMinute: 1080, locationId: 'the_terrace_bar', activity: 'at the terrace bar, swapping cards and charging batteries' },
        { startMinute: 1080, endMinute: 1320, locationId: 'the_long_room', activity: 'working the Long Room from the corners' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_terrace_bar', activity: 'packing cases at the end of the terrace bar' },
      ],
      homeLocationId: 'the_terrace_bar',
      knowledgeScope: ['benny', 'frame_2214', 'the_contract', 'the_wedding'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'benny_finds_the_frame',
          label: 'He goes looking through last night’s card',
          kind: 'TRUST',
          requires: { trust: 30 },
        },
        {
          id: 'benny_hands_it_over',
          label: 'He hands the card to his client',
          kind: 'ALLIANCE',
          requires: { trust: 40 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 15, presence: 11, resolve: 12, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_back_row',
      title: 'Back Row',
      summary: 'Your bride has asked you, in front of the whole chapel, to sit in the back while she marries your brother. The vows are about fifteen minutes away.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['elena', 'marcus', 'constance'],
      involvedLocationIds: ['the_chapel', 'the_vestry'],
      knownRewardCopy: 'An answer, given in public, and whatever the guests make of it.',
      steps: [
        {
          id: 'the_aisle',
          playerCopy: 'Answer her, with two hundred people listening.',
          directorNotes:
            'Elena has asked for something specific and polite, and every answer is a real one. Sitting down is not losing; it is the player choosing to watch, and the chapel should feel the restraint. Objecting stops the room cold. Asking her for a word gets her into the vestry for two minutes, no more. Walking out is walking out. Whatever the player does, Elena reacts to the exact thing and does not explain the photograph unless asked straight. Marcus says almost nothing here; he lets Elena carry it, which is the first thing about him worth noticing.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_down',
              label: 'Sit in the back, as she asked',
              predicate: { flagsSet: ['used:take_the_back_row'] },
              setsFlags: ['sat_in_the_back'],
              closesFlags: ['ceremony_stopped'],
            },
            {
              routeId: 'objected',
              label: 'Object, out loud, before the vows',
              predicate: { flagsSet: ['used:object'] },
              setsFlags: ['ceremony_stopped', 'made_a_scene'],
              closesFlags: ['sat_in_the_back'],
            },
            {
              routeId: 'lost_it',
              label: 'Make a scene nobody in the chapel will forget',
              predicate: { flagsSet: ['used:make_a_scene'] },
              setsFlags: ['ceremony_stopped', 'made_a_scene', 'lost_your_temper'],
              closesFlags: ['sat_in_the_back'],
            },
            {
              routeId: 'asked_for_a_word',
              label: 'Ask her for one minute, alone, in the vestry',
              predicate: { flagsSet: ['used:a_word_alone', 'spoke:elena'] },
              setsFlags: ['ceremony_paused', 'talked_to_elena_first'],
              closesFlags: [],
            },
            {
              routeId: 'walked_out',
              label: 'Turn round and walk out of the chapel',
              predicate: { flagsSet: ['visited:the_wisteria_lawn'] },
              setsFlags: ['walked_out_of_the_chapel'],
              closesFlags: ['ceremony_stopped'],
            },
            {
              routeId: 'watched_it_happen',
              label: 'Stand there while the vows are said',
              predicate: { flagsSet: ['the_vows_were_said'] },
              setsFlags: ['sat_in_the_back', 'watched_it_happen'],
              closesFlags: ['ceremony_stopped'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['the_aisle_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_guests', amount: 10 }],
          },
        },
        {
          id: 'the_vows',
          playerCopy: 'Find out whether anybody says vows today.',
          directorNotes:
            'If nothing stopped it, the vows happen at twenty past twelve and the register is signed by half past. Elena’s voice is steady and she does not look at the back row. If the ceremony was stopped, the officiant closes the folder, the quartet starts playing something to cover it, and the whole chapel stands up at once. A pause is only a pause: Elena gives the player an hour, not an answer.',
          enterWhen: { flagsSet: ['the_aisle_answered'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'they_said_them',
              label: 'The vows are said and the register is signed',
              predicate: { flagsSet: ['the_vows_were_said'] },
              setsFlags: ['elena_married_marcus'],
              closesFlags: ['no_wedding_yet'],
            },
            {
              routeId: 'nobody_said_them',
              label: 'The ceremony stops and does not start again',
              predicate: { flagsSet: ['ceremony_stopped'] },
              setsFlags: ['no_wedding_yet'],
              closesFlags: ['elena_married_marcus'],
            },
            {
              routeId: 'she_gave_you_an_hour',
              label: 'Elena gives you one hour before she decides',
              predicate: { flagsSet: ['ceremony_paused'] },
              setsFlags: ['no_wedding_yet', 'elena_gave_you_an_hour'],
              closesFlags: ['elena_married_marcus'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['the_ceremony_is_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_guests', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_what_she_saw',
      title: 'What She Saw',
      summary: 'Somebody showed Elena something at a quarter past one this morning. Whatever it was, it was enough to end two years in five hours.',
      kind: 'MAIN',
      involvedCharacterIds: ['elena', 'june', 'benny', 'marcus', 'sami'],
      involvedLocationIds: ['the_bridal_suite', 'the_kitchens', 'the_events_office', 'the_gatehouse', 'the_terrace_bar'],
      knownRewardCopy: 'What she was shown, and something you can put in front of a lawyer to prove what it really was.',
      discoverWhen: { flagsSet: ['the_aisle_answered'] },
      steps: [
        {
          id: 'find_out_what',
          playerCopy: 'Find out what Elena was shown at a quarter past one this morning.',
          directorNotes:
            'The player knows they hugged June in the cold room at twenty to midnight. They do not know anybody saw it. Whoever tells them should make it land as a physical thing: a printout, a phone screen, a description. Elena shows it coldly, as evidence. June describes it before she can stop herself. Sami has only heard that there is a picture of you and the planner, from the maid of honour, at the bar.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'elena_showed_you',
              label: 'Elena shows you, as evidence',
              predicate: {
                flagsSet: ['spoke:elena'],
                minRelationship: [{ characterId: 'elena', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['knows:the_photograph', 'elena_showed_you'],
              closesFlags: [],
            },
            {
              routeId: 'june_told_you',
              label: 'June tells you, before she can stop herself',
              predicate: {
                flagsSet: ['spoke:june'],
                minRelationship: [{ characterId: 'june', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_photograph', 'june_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'sami_heard',
              label: 'Sami tells you what the bar is saying',
              predicate: { flagsSet: ['spoke:sami'] },
              setsFlags: ['knows:the_photograph', 'heard_it_secondhand'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_print',
              label: 'Find the printout in the bridal suite',
              predicate: { hasItems: ['the_photograph'] },
              setsFlags: ['knows:the_photograph', 'took_the_print'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['knows:the_cold_room'], abilities: [], reputation: [] },
        },
        {
          id: 'prove_it',
          playerCopy: 'Prove the photograph is not what it looks like.',
          directorNotes:
            'Four independent proofs exist and none is required. Benny’s frame shows who took it. The second phone shows who sent it. The reprint order shows the swap was planned before Elena said yes. June’s word says what it was. Each has a price: the card is Benny’s and taking it without asking is theft; the phone is in Marcus’s jacket and searching for it raises his guard; the order sheet belongs to June’s job; June’s word costs June. Do not let any of them simply fall into the player’s hands.',
          enterWhen: { flagsSet: ['knows:the_photograph'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bennys_frame',
              label: 'Get frame 2214 from Benny’s rehearsal card',
              predicate: { hasItems: ['rehearsal_card'] },
              setsFlags: ['proof:the_frame'],
              closesFlags: [],
            },
            {
              routeId: 'the_second_phone',
              label: 'Find the phone it was sent from',
              predicate: { hasItems: ['second_phone'] },
              setsFlags: ['proof:the_phone'],
              closesFlags: [],
            },
            {
              routeId: 'the_order_sheet',
              label: 'Get the reprint order with the time on it',
              predicate: { hasItems: ['reprint_order'] },
              setsFlags: ['proof:the_order'],
              closesFlags: [],
            },
            {
              routeId: 'june_will_say_it',
              label: 'Get June to say what it was, out loud',
              predicate: {
                flagsSet: ['spoke:june'],
                minRelationship: [{ characterId: 'june', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['proof:june', 'june_will_testify'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['proof_in_hand'],
            abilities: ['show_the_proof'],
            reputation: [{ factionId: 'faction_staff', amount: 10 }],
          },
        },
        {
          id: 'show_her',
          playerCopy: 'Put the proof in front of Elena.',
          directorNotes:
            'She is a lawyer and she reads it like one: in silence, all the way through, twice. Then she asks one question about the times. Whether she believes it is not in doubt; what she does with it is, and the first thing she does is not forgive anybody. Showing it in private gives her the dignity of deciding; showing it in public takes that away from her, and she will remember which one the player chose.',
          enterWhen: { flagsSet: ['proof_in_hand'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'showed_her_alone',
              label: 'Show her, with the door shut',
              predicate: { flagsSet: ['used:show_the_proof', 'spoke:elena'] },
              setsFlags: ['elena_knows_the_truth', 'told_her_privately'],
              closesFlags: ['she_found_out_in_public'],
            },
            {
              routeId: 'showed_everybody',
              label: 'Show the whole room',
              predicate: { flagsSet: ['used:show_the_proof', 'exposed_in_public'] },
              setsFlags: ['elena_knows_the_truth', 'she_found_out_in_public'],
              closesFlags: ['told_her_privately'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_truth_is_out'],
            abilities: [],
            reputation: [{ factionId: 'faction_wards', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_ten_to_midnight',
      title: 'Ten to Midnight',
      summary: 'At ten to midnight your brother sent you three hours up the coast road for a ring that had been ready for a week.',
      kind: 'SIDE',
      involvedCharacterIds: ['marcus', 'constance', 'sami'],
      involvedLocationIds: ['constance_study', 'the_car_park', 'the_gatehouse'],
      knownRewardCopy: 'Why it had to be you on that road all night, and what your grandmother does when she hears it.',
      discoverWhen: { flagsSet: ['the_aisle_answered'] },
      steps: [
        {
          id: 'who_sent_you',
          playerCopy: 'Work out why your brother sent you to the city at ten to midnight.',
          directorNotes:
            'The pieces are in the player’s own pockets: a dead phone with Marcus’s 11:52 text on it, and a receipt that says the ring was ready a week ago with no urgency noted. Charging the phone needs Sami’s charger, a battery pack, or the front desk. Let the realisation be quiet and specific — a time, a line of text — rather than a speech.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'rebuilt_it',
              label: 'Put the night back together from the phone and the receipt',
              predicate: { flagsSet: ['used:rebuild_the_night'] },
              setsFlags: ['knows:the_errand'],
              closesFlags: [],
            },
            {
              routeId: 'he_let_it_slip',
              label: 'Push your brother until he says too much',
              predicate: { flagsSet: ['used:say_it_to_his_face', 'spoke:marcus'] },
              setsFlags: ['knows:the_errand', 'marcus_on_notice'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['knows:it_was_planned'], abilities: [], reputation: [] },
        },
        {
          id: 'tell_her',
          playerCopy: 'Tell your grandmother where you were last night, and who sent you.',
          directorNotes:
            'Constance believes the player phoned Marcus at three to call it off. Told plainly, in order, she listens to all of it without interrupting. The words that change her are "ten to midnight" and "errand": she goes very still, puts down whatever she is holding, and asks one question about the time. She does not explain why. Do not have her mention 1966 here unless the player asks.',
          enterWhen: { flagsSet: ['knows:the_errand'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'told_her_alone',
              label: 'Tell her alone, in order, leaving nothing out',
              predicate: { flagsSet: ['spoke:constance', 'used:a_word_alone'] },
              setsFlags: ['constance_knows_the_errand', 'constance_saw_the_pattern'],
              closesFlags: [],
            },
            {
              routeId: 'told_her_in_front_of_him',
              label: 'Say it in front of your brother and let her watch his face',
              predicate: { flagsSet: ['spoke:constance', 'used:say_it_to_his_face'] },
              setsFlags: ['constance_knows_the_errand', 'constance_saw_the_pattern', 'marcus_on_notice'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['the_pattern_seen'],
            abilities: ['ask_about_1966'],
            reputation: [{ factionId: 'faction_hales', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_sixty_years_ago',
      title: 'Sixty Years Ago',
      summary: 'Your grandmother went very still at the words "ten to midnight", and there is an empty chair in the back row of her own wedding photograph.',
      kind: 'LEAD',
      involvedCharacterIds: ['constance'],
      involvedLocationIds: ['constance_study', 'the_chapel'],
      knownRewardCopy: 'What really happened at this altar in 1966, and why your grandmother did not turn around.',
      discoverWhen: { flagsSet: ['constance_saw_the_pattern'] },
      steps: [
        {
          id: 'arthurs_letter',
          playerCopy: 'Find out what happened at this altar in 1966.',
          directorNotes:
            'This thread is optional and must feel like it. A player who never tells their grandmother about the errand never sees a beat of it. For one who is here: Constance tells it in the study, in order, without self-pity, and the cost to her is that she has to say out loud that her husband of fifty-two years did to his brother what Marcus did to the player. If the player finds the letter instead, she knows it was taken by the end of the evening, and asks for it back.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you herself, in the study',
              predicate: {
                flagsSet: ['used:ask_about_1966'],
                minRelationship: [{ characterId: 'constance', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:1966', 'constance_told_you'],
              closesFlags: ['read_arthurs_letter'],
            },
            {
              routeId: 'found_the_letter',
              label: 'Find Arthur’s letter in her study',
              predicate: { hasItems: ['arthurs_letter'] },
              setsFlags: ['knows:1966', 'read_arthurs_letter'],
              closesFlags: ['constance_told_you'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_family_pattern'],
            abilities: [],
            reputation: [{ factionId: 'faction_hales', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_before_midnight',
      title: 'Before Midnight',
      summary: 'Elena checks a small gold watch far too often for a bride, and nobody will say why it had to be today.',
      kind: 'MAIN',
      involvedCharacterIds: ['elena', 'constance', 'marcus'],
      involvedLocationIds: ['the_bridal_suite', 'constance_study', 'the_chapel'],
      knownRewardCopy: 'Why the wedding could not wait one more day, and what you and she decide to do about midnight.',
      discoverWhen: { flagsSet: ['the_aisle_answered'] },
      steps: [
        {
          id: 'why_today',
          playerCopy: 'Find out why it had to be today.',
          directorNotes:
            'The answer is a trust deadline at midnight and a boatyard that needs the money on Monday, and the reason the player never heard of it is that Elena wanted to be sure she was being married for love and not for a deadline. Whoever tells it, let it reframe the morning: she did not swap grooms out of spite. She ran out of time.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'elena_told_you_why',
              label: 'Elena tells you, behind a closed door',
              predicate: {
                flagsSet: ['spoke:elena'],
                minRelationship: [{ characterId: 'elena', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_deadline', 'elena_told_you_why'],
              closesFlags: [],
            },
            {
              routeId: 'constance_told_you_why',
              label: 'Your grandmother tells you, as a trustee',
              predicate: {
                flagsSet: ['spoke:constance'],
                minRelationship: [{ characterId: 'constance', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_deadline'],
              closesFlags: [],
            },
            {
              routeId: 'read_her_letter',
              label: 'Read the trust letter on her desk',
              predicate: { hasItems: ['trust_letter'] },
              setsFlags: ['knows:the_deadline', 'read_her_letter'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 80, items: [], flags: ['the_clock_is_known'], abilities: [], reputation: [] },
        },
        {
          id: 'midnight',
          playerCopy: 'Decide, with her, what happens at midnight.',
          directorNotes:
            'A negotiation between two people who both want something reasonable. Marrying the player before midnight needs the truth out, the officiant still in the building, and Elena choosing it; it cannot be talked into being. Letting the trust go is a real sacrifice and the boatyard is a real cost, which somebody has to answer for in the epilogue. Keeping the paper marriage to Marcus for the money, knowing the truth, is cold and sensible and allowed. Midnight arriving with nothing decided is also an answer.',
          enterWhen: { flagsSet: ['knows:the_deadline'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'married_you',
              label: 'She marries you before midnight',
              predicate: {
                flagsSet: ['elena_knows_the_truth', 'no_wedding_yet'],
                minRelationship: [
                  { characterId: 'elena', dimension: 'trust', value: 65 },
                  { characterId: 'elena', dimension: 'affection', value: 75 },
                ],
              },
              setsFlags: ['married_before_midnight', 'elena_chose_you'],
              closesFlags: ['let_the_trust_go'],
            },
            {
              routeId: 'let_it_go',
              label: 'She lets the trust go',
              predicate: {
                flagsSet: ['elena_knows_the_truth', 'no_wedding_yet'],
                minRelationship: [{ characterId: 'elena', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['let_the_trust_go'],
              closesFlags: ['married_before_midnight'],
            },
            {
              routeId: 'paper_stands',
              label: 'She keeps the paper marriage for the money, knowing everything',
              predicate: { flagsSet: ['elena_married_marcus', 'elena_knows_the_truth'] },
              setsFlags: ['paper_marriage'],
              closesFlags: ['married_before_midnight'],
            },
            {
              routeId: 'midnight_came',
              label: 'Let midnight come',
              predicate: { flagsSet: ['midnight_passed'] },
              setsFlags: ['the_clock_ran_out'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['midnight_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_wards', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_the_toast',
      title: 'The Toast',
      summary: 'At eight o’clock your grandmother will open a sealed envelope and name the next keeper of the Hale, and the microphone has been on since five.',
      kind: 'MAIN',
      involvedCharacterIds: ['constance', 'marcus', 'elena', 'june'],
      involvedLocationIds: ['the_long_room', 'constance_study'],
      knownRewardCopy: 'Whatever you say to the whole room, and whose name comes out of the envelope.',
      discoverWhen: { flagsSet: ['the_aisle_answered'] },
      steps: [
        {
          id: 'the_microphone',
          playerCopy: 'Decide what you say when the microphone is open.',
          directorNotes:
            'The microphone is the most powerful object in the building and everybody knows it. Exposing Marcus with proof is revenge and it works, and it also happens to Elena in front of her father’s whole yard. A gracious toast with no proof is a different kind of power, and the room will love the player for it. Saying nothing is allowed. June cues the band to drown out anybody she thinks is about to do harm, unless she is on the player’s side by then.',
          enterWhen: { flagsSet: ['reception_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'exposed_him',
              label: 'Tell the room what your brother did, with proof',
              predicate: { flagsSet: ['used:take_the_microphone', 'proof_in_hand'] },
              setsFlags: ['marcus_exposed', 'exposed_in_public'],
              closesFlags: ['gracious_toast'],
            },
            {
              routeId: 'gracious_toast',
              label: 'Raise a glass to the couple, and mean some of it',
              predicate: { flagsSet: ['used:take_the_microphone'], flagsUnset: ['proof_in_hand'] },
              setsFlags: ['gracious_toast'],
              closesFlags: ['exposed_in_public'],
            },
            {
              routeId: 'kept_quiet',
              label: 'Let the toast happen without you',
              predicate: { flagsSet: ['the_toast_happened'] },
              setsFlags: ['said_nothing_at_the_toast'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['the_mic_is_down'],
            abilities: [],
            reputation: [{ factionId: 'faction_guests', amount: 15 }],
          },
        },
        {
          id: 'the_envelope',
          playerCopy: 'Find out whose name is in the envelope.',
          directorNotes:
            'Constance stands without help, opens the envelope, and reads a name. Whose depends on what she knows by eight. If she has heard about the errand she will not reward it, and she is perfectly capable of tearing the envelope in half and handing the Hale to its staff rather than to either grandson. If she has heard nothing, she reads Marcus, because he stood up when it counted, and she believes that.',
          enterWhen: { flagsSet: ['the_toast_happened'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_named_you',
              label: 'She reads your name',
              predicate: {
                flagsSet: ['constance_knows_the_errand'],
                minRelationship: [{ characterId: 'constance', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['constance_named_you'],
              closesFlags: ['constance_named_marcus', 'the_hale_to_the_staff'],
            },
            {
              routeId: 'she_named_nobody',
              label: 'She tears it in half and gives the Hale to its staff',
              predicate: { flagsSet: ['constance_knows_the_errand', 'the_toast_happened'] },
              setsFlags: ['the_hale_to_the_staff'],
              closesFlags: ['constance_named_you', 'constance_named_marcus'],
            },
            {
              routeId: 'she_named_marcus',
              label: 'She reads your brother’s name',
              predicate: { flagsSet: ['the_toast_happened'], flagsUnset: ['constance_knows_the_errand'] },
              setsFlags: ['constance_named_marcus'],
              closesFlags: ['constance_named_you', 'the_hale_to_the_staff'],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['the_hale_decided'],
            abilities: [],
            reputation: [{ factionId: 'faction_hales', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_woman_in_the_photograph',
      title: 'The Woman in the Photograph',
      summary: 'June Arden planned this wedding with you for eleven months, and she is the other person in the picture.',
      kind: 'SIDE',
      involvedCharacterIds: ['june', 'elena'],
      involvedLocationIds: ['the_events_office', 'the_kitchens'],
      knownRewardCopy: 'What June said at twenty to six, and what she is to you once today is over.',
      discoverWhen: { flagsSet: ['knows:the_photograph'] },
      steps: [
        {
          id: 'what_she_said',
          playerCopy: 'Find out what June said to Elena at twenty to six.',
          directorNotes:
            'June did nothing wrong in the cold room and one thing wrong at twenty to six: she froze, and her non-answer became Elena’s evidence. She is ashamed of it in a way that is out of proportion, and the reason it is out of proportion is the thing she will not say today. Let her tell it in a corridor, fast, with times.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you_herself',
              label: 'June tells you, in a corridor, fast',
              predicate: {
                flagsSet: ['spoke:june', 'used:a_word_alone'],
                minRelationship: [{ characterId: 'june', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:june_froze'],
              closesFlags: [],
            },
            {
              routeId: 'elena_used_it',
              label: 'Elena throws it at you as evidence',
              predicate: { flagsSet: ['elena_showed_you', 'spoke:elena'] },
              setsFlags: ['knows:june_froze'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 50, items: [], flags: ['june_in_the_open'], abilities: [], reputation: [] },
        },
        {
          id: 'what_she_is_to_you',
          playerCopy: 'Decide what June is to you after today.',
          directorNotes:
            'Three honest outcomes. Forgiveness costs the player nothing and means a great deal to her. Keeping her at a distance is reasonable and she will accept it without argument, which is worse. Something starting is slow, adult and on purpose: not tonight, not while anybody is still anybody’s groom, and never as a way to hurt Elena. If the player uses June to make Elena jealous, June sees it immediately and leaves the room.',
          enterWhen: { flagsSet: ['june_in_the_open'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'something_started',
              label: 'Something starts, slowly and on purpose',
              predicate: {
                flagsSet: ['spoke:june'],
                minRelationship: [
                  { characterId: 'june', dimension: 'trust', value: 70 },
                  { characterId: 'june', dimension: 'affection', value: 78 },
                ],
              },
              setsFlags: ['forgave_june', 'june_and_you'],
              closesFlags: ['kept_june_at_a_distance'],
            },
            {
              routeId: 'forgave_her',
              label: 'Tell her it was not her fault, and mean it',
              predicate: { flagsSet: ['spoke:june', 'used:stand_with_them'] },
              setsFlags: ['forgave_june'],
              closesFlags: ['kept_june_at_a_distance'],
            },
            {
              routeId: 'kept_her_at_a_distance',
              label: 'Keep it polite and keep her at arm’s length',
              predicate: { flagsSet: ['spoke:june', 'used:smooth_it_over'] },
              setsFlags: ['kept_june_at_a_distance'],
              closesFlags: ['forgave_june', 'june_and_you'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['june_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_staff', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_brothers',
      title: 'Brothers',
      summary: 'Your brother is wearing your suit an inch short at the wrists and checking his phone every four minutes.',
      kind: 'SIDE',
      involvedCharacterIds: ['marcus', 'sami'],
      involvedLocationIds: ['the_terrace_bar', 'the_cliff_path', 'the_gatehouse'],
      knownRewardCopy: 'What your brother needed badly enough to do this, and what happens to him now.',
      discoverWhen: { flagsSet: ['the_aisle_answered'] },
      steps: [
        {
          id: 'what_he_needs',
          playerCopy: 'Find out what your brother actually needs.',
          directorNotes:
            'He will say he did it for Elena and for the family, and he half believes it. The other half is 380,000 owed to a lender and a hotel he could borrow against. A man in a grey suit at the bar, Sami’s six thousand, a ring bought on the third card that went through: let the player assemble it rather than be told.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'the_man_in_grey',
              label: 'Watch who comes looking for him at the bar',
              predicate: { flagsSet: ['the_lender_came', 'used:read_the_room'] },
              setsFlags: ['knows:the_debt'],
              closesFlags: [],
            },
            {
              routeId: 'sami_told_you',
              label: 'Sami tells you what Marcus owes him',
              predicate: {
                flagsSet: ['spoke:sami'],
                minRelationship: [{ characterId: 'sami', dimension: 'trust', value: 85 }],
              },
              setsFlags: ['knows:the_debt'],
              closesFlags: [],
            },
            {
              routeId: 'he_told_you',
              label: 'He tells you himself, on the cliff path',
              predicate: {
                flagsSet: ['spoke:marcus', 'used:a_word_alone'],
                minRelationship: [{ characterId: 'marcus', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['knows:the_debt', 'marcus_was_honest'],
              closesFlags: [],
            },
          ],
          rewards: { xp: 60, items: [], flags: ['knows:what_he_needs'], abilities: [], reputation: [] },
        },
        {
          id: 'what_happens_to_him',
          playerCopy: 'Decide what happens to your brother.',
          directorNotes:
            'Ruining him is easy by now and it is not free: the lender does not stop at Marcus, Grandmother has to watch, and the player has to be the person who did it. Forgiving him is not the same as letting him off; it can come with conditions and a long silence. A confession, alone, is the version where he finally says the whole thing out loud to the one person he did it to.',
          enterWhen: { flagsSet: ['knows:what_he_needs'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_him_say_it',
              label: 'Make him say all of it, to you, alone',
              predicate: {
                flagsSet: ['used:say_it_to_his_face', 'proof_in_hand'],
                minRelationship: [{ characterId: 'marcus', dimension: 'respect', value: 40 }],
              },
              setsFlags: ['marcus_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'forgave_him',
              label: 'Forgive him, on your terms',
              predicate: { flagsSet: ['spoke:marcus', 'used:stand_with_them'] },
              setsFlags: ['forgave_marcus'],
              closesFlags: ['ruined_marcus'],
            },
            {
              routeId: 'ruined_him',
              label: 'Finish him, in front of everybody',
              predicate: { flagsSet: ['exposed_in_public', 'knows:the_debt'] },
              setsFlags: ['ruined_marcus'],
              closesFlags: ['forgave_marcus'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['brothers_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_hales', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_vows',
      atWorldMinute: 12 * 60 + 20,
      locationId: 'the_chapel',
      publicCopy:
        'The officiant reaches the vows. Elena says hers in a steady voice without looking at the back row, Marcus says his a little too fast, and the register in the vestry is signed by half past twelve.',
      directorNotes:
        'This is what happens if nobody stops it, and it should be allowed to happen. Write it plainly and without melodrama: the quartet, the applause that starts late and uneven, Grandmother Hale not turning round. Whatever the player was doing at the time, they hear it.',
      setsFlags: ['the_vows_were_said'],
      cancelledByFlags: ['ceremony_stopped', 'ceremony_paused'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_family_photographs',
      atWorldMinute: 13 * 60 + 10,
      locationId: 'the_wisteria_lawn',
      publicCopy:
        'Benny Castellano calls for the groom’s family under the wisteria, and there is a long, awful pause while the whole lawn works out what that means now.',
      directorNotes:
        'Only if the vows were said. Benny does his job: he arranges the Hales in rows, asks Grandmother to sit, and leaves a gap at the end where the player would have stood. If the player stands in it, he takes the picture anyway.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['elena_married_marcus'],
      movesCharacters: [{ characterId: 'benny', toLocationId: 'the_wisteria_lawn' }],
    },
    {
      id: 'we_the_lender',
      atWorldMinute: 15 * 60 + 30,
      locationId: 'the_terrace_bar',
      publicCopy:
        'A man in a grey suit nobody invited orders a mineral water at the terrace bar, does not look at the sea once, and waits for Marcus to notice him.',
      directorNotes:
        'He is polite and never threatening in words. He congratulates Marcus on his marriage and on the hotel, in that order, and leaves after ten minutes. Marcus goes white and then very charming. Anybody watching the bar can see it.',
      setsFlags: ['the_lender_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'marcus', toLocationId: 'the_terrace_bar' }],
    },
    {
      id: 'we_june_hands_in_her_notice',
      atWorldMinute: 17 * 60,
      locationId: 'the_events_office',
      publicCopy:
        'June Arden types a one-line resignation in her basement office, prints it, and sits looking at it with the headset still round her neck.',
      directorNotes:
        'Only if the player knows about the photograph and nobody has talked to June about it. She has decided the honest thing is to leave after the reception. She will not hand it in until the last guest goes, and a single kind conversation stops it.',
      setsFlags: ['june_is_leaving'],
      cancelledByFlags: ['june_in_the_open'],
      requiresFlags: ['knows:the_photograph'],
      movesCharacters: [{ characterId: 'june', toLocationId: 'the_events_office' }],
    },
    {
      id: 'we_the_reception',
      atWorldMinute: 18 * 60,
      locationId: 'the_long_room',
      publicCopy:
        'The double doors to the Long Room open, the band starts, and the guests find their names on a seating chart that has been changed twice since breakfast.',
      directorNotes:
        'The reception happens whatever state the wedding is in, because the food is paid for and Grandmother Hale has decided it will. The microphone by the dance floor is live from here on.',
      setsFlags: ['reception_open'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'elena', toLocationId: 'the_long_room' },
        { characterId: 'marcus', toLocationId: 'the_long_room' },
        { characterId: 'constance', toLocationId: 'the_long_room' },
        { characterId: 'sami', toLocationId: 'the_long_room' },
      ],
    },
    {
      id: 'we_the_toast',
      atWorldMinute: 20 * 60,
      locationId: 'the_long_room',
      publicCopy:
        'At eight o’clock Constance Hale stands without help, taps a glass once, and the whole Long Room goes quiet for a cream envelope.',
      directorNotes:
        'She speaks for under a minute: the Hale, the hundred years, the people who turned up. Then she opens the envelope. Whose name she reads depends on what she has been told by now, and the quest decides it. Whatever the player said into the microphone before this, she heard every word.',
      setsFlags: ['the_toast_happened'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'constance', toLocationId: 'the_long_room' }],
    },
    {
      id: 'we_first_dance',
      atWorldMinute: 21 * 60,
      locationId: 'the_long_room',
      publicCopy:
        'The band plays the song you and Elena chose in March, because nobody told them to change it, and Marcus leads her onto the floor to it.',
      directorNotes:
        'Only if she married him and still does not know the truth. Elena realises which song it is about four bars in. She keeps dancing. She looks, once, for the player.',
      setsFlags: [],
      cancelledByFlags: ['elena_knows_the_truth'],
      requiresFlags: ['elena_married_marcus'],
      movesCharacters: [],
    },
    {
      id: 'we_ten_to_midnight',
      atWorldMinute: 23 * 60 + 50,
      locationId: 'the_chapel',
      publicCopy:
        'The officiant is still in the vestry with the register open, his coat on, and ten minutes left on the only clock in the building that matters.',
      directorNotes:
        'Only if nobody is married yet and the player knows why the time matters. Elena is in the empty chapel. This is the last place anything can be decided before midnight, and it should feel small and quiet after the day it has been.',
      setsFlags: ['the_last_ten_minutes'],
      cancelledByFlags: ['elena_married_marcus', 'married_before_midnight'],
      requiresFlags: ['knows:the_deadline'],
      movesCharacters: [{ characterId: 'elena', toLocationId: 'the_chapel' }],
    },
    {
      id: 'we_midnight',
      atWorldMinute: 24 * 60,
      locationId: null,
      publicCopy: 'Midnight. Somewhere in the building somebody starts singing happy birthday to Elena, and gets about four words in.',
      directorNotes:
        'Elena is thirty. Whatever was going to be signed is signed or it is not, and the trust follows the paperwork rather than anybody’s feelings. Do not soften whichever version this is.',
      setsFlags: ['midnight_passed'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_sunday_brunch',
      atWorldMinute: 24 * 60 + 10 * 60 + 30,
      locationId: 'the_terrace_bar',
      publicCopy:
        'Sunday brunch on the terrace: thirty hungover guests, a cake with two names on it cut into squares, and the sea pretending nothing happened.',
      directorNotes:
        'The morning after. Everybody who stayed the night is here, and every conversation is a version of the same one. This is where the day gets told for the first time, by whoever gets there first.',
      setsFlags: ['the_morning_after'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
  ],
  promises: [
    {
      id: 'p_the_vows',
      kind: 'FINALE',
      label: 'Who, if anybody, is married to Elena by the end of the night',
      seedHint: 'A register in the vestry that nobody has signed yet, and an officiant who will not sign for anybody unwilling.',
      payoffHint: 'Vows said or not said, by a person who knows exactly what they are agreeing to.',
      weight: 1,
    },
    {
      id: 'p_the_photograph',
      kind: 'MYSTERY',
      label: 'What Elena was shown at a quarter past one in the morning',
      seedHint: 'Elena’s hand covering her mother’s watch whenever anybody mentions the kitchens.',
      payoffHint: 'An uncropped picture, a time on a job sheet, and the name of the person holding the camera.',
      weight: 0.95,
    },
    {
      id: 'p_midnight',
      kind: 'RELATIONSHIP',
      label: 'Why it had to be today',
      seedHint: 'A bride checking a small gold watch far too often, and a father who keeps leaving to make phone calls.',
      payoffHint: 'A trust, a boatyard, sixty jobs, and a woman who did not want to be married for a deadline.',
      weight: 0.85,
    },
    {
      id: 'p_brothers',
      kind: 'RIVAL',
      label: 'What your brother needed badly enough to do this',
      seedHint: 'A suit an inch short at the wrists, and a phone checked every four minutes.',
      payoffHint: 'A debt, a hotel, a woman he introduced you to, and the whole of it said out loud to you.',
      weight: 0.8,
    },
    {
      id: 'p_1966',
      kind: 'THEME',
      label: 'The first time this happened in this chapel',
      seedHint: 'An empty chair at the end of the back row in a black and white photograph.',
      payoffHint: 'A letter from abroad that was kept for forty-seven years by a woman who decided the brother who turned up was the right one.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_front_desk',
      name: 'You Run the Front Desk',
      role: 'Back corridors and the staff on side',
      summary: 'You run the Hale’s front desk, so you have a master key card, you know every staff door in the building, and the people who work here start out on your side.',
      playstyle: ['Sneaky', 'Well liked', 'Knows the building'],
      blurb: 'You have checked in four thousand guests and carried half of their bags, and the porter still calls you by the nickname you earned the first summer you worked the luggage trolley.',
      attributeBonus: { agility: 2, presence: 1 },
      skillProficiencies: { corridors: 3, charm: 1, instinct: 1 },
      startingItems: [{ itemId: 'master_key', qty: 1 }],
      startingAbilities: ['rebuild_the_night', 'staff_doors'],
      startingReputation: [{ factionId: 'faction_staff', amount: 15 }],
    },
    {
      id: 'arch_claims',
      name: 'You Investigate Claims',
      role: 'Evidence, timelines and nerve',
      summary: 'You investigate insurance claims, so you are good at timestamps, cropped photographs and stories that do not add up, and you carry a battery pack for the phone.',
      playstyle: ['Observant', 'Patient', 'Builds a case'],
      blurb: 'Nine years of reading other people’s versions of events has taught you that the lie is almost never in what somebody says. It is in the time they say it.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { eye: 3, nerve: 1 },
      startingItems: [{ itemId: 'battery_pack', qty: 1 }],
      startingAbilities: ['rebuild_the_night', 'read_the_room'],
      startingReputation: [],
    },
    {
      id: 'arch_sales',
      name: 'You Sell for a Living',
      role: 'Talking, charm and the microphone',
      summary: 'You sell for a living, so you can hold a room, talk one person round, and take a microphone in front of two hundred people without your voice shaking.',
      playstyle: ['Persuasive', 'Public', 'Quick'],
      blurb: 'You have closed deals in car parks, on boats and once in a lift between floors, and you have never yet met a room you could not make laugh in the first thirty seconds.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { speaking: 3, charm: 2 },
      startingItems: [],
      startingAbilities: ['rebuild_the_night', 'take_the_microphone'],
      startingReputation: [{ factionId: 'faction_guests', amount: 10 }],
    },
    {
      id: 'arch_gym',
      name: 'You Coach Boxing',
      role: 'Nerve, strength and a steady head',
      summary: 'You coach at a boxing gym, so you are strong, very hard to rattle, and better than anybody here at not throwing the first punch, which the Wards have noticed.',
      playstyle: ['Steady', 'Strong', 'Hard to rattle'],
      blurb: 'You spend your evenings teaching angry people that the fight is mostly about breathing, and Elena’s father once spent a whole dinner asking you about footwork.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { muscle: 3, nerve: 2 },
      startingItems: [],
      startingAbilities: ['rebuild_the_night', 'say_it_to_his_face'],
      startingReputation: [{ factionId: 'faction_wards', amount: 10 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does Elena call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Daniel Hale' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. he/him' },
    {
      id: 'archetype',
      label: 'What do you do for a living?',
      helpText:
        'Your job, which sets what you are good at today. It is fixed for the whole story. It does not decide whether you stop the wedding, whether you want her back, or what happens to your brother — all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does everybody at this wedding know about you?',
      helpText: 'The thing two hundred guests would say about you if asked. One plain sentence is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I have never been late for anything in my life, which is what makes this morning so hard to explain.',
    },
    {
      id: 'what_you_want',
      label: 'Walking in, what do you want most?',
      helpText: 'Where your head is at in the doorway, not a promise. You can change your mind at any point today.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'her_back', label: 'Her, back, today' },
        { id: 'the_truth', label: 'To know what happened last night' },
        { id: 'him_to_pay', label: 'My brother to pay for this' },
        { id: 'out', label: 'To get out of this building with my dignity' },
        { id: 'nothing', label: 'Nothing yet. I want to watch first' },
      ],
    },
    {
      id: 'appearance',
      label: 'What do two hundred guests see in the doorway?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Yesterday’s shirt, a night’s stubble, road dust on my shoes, and a ring box in one hand.',
    },
  ],
  /**
   * Where this can end up.
   *
   * The back row is the default: do nothing, and the vows are said, and the
   * ending is a real one rather than a fail state. Walking out to the car park
   * is available from about turn twelve. Exposing Marcus is always available
   * and has its own ending, and it is written so that the price lands on
   * somebody who is not Marcus. The two 1966 endings need the optional thread;
   * everything else is reachable by a player who never hears the name Arthur.
   */
  endings: [
    {
      id: 'end_the_back_row',
      name: 'The Back Row',
      rarity: 'COMMON',
      minTurn: 25,
      requires: {
        flagsSet: ['elena_married_marcus', 'midnight_passed'],
        flagsUnset: ['elena_knows_the_truth', 'left_the_map'],
      },
      condition:
        'The player watched. The vows were said, the register was signed, and Elena ended the night married to the wrong brother without ever learning what the photograph really was. This is the quiet ending and it is not a punishment: write it as somebody who stayed in the room, kept their dignity and let the day happen, and who now has to decide what kind of brother to be for the next forty years.',
      epilogue:
        'The photographs come back in a fortnight. In every wide shot of the chapel there is one man in the back row, very still, wearing yesterday’s shirt. Benny sends that one to the player separately, with no message, and the player keeps it in a drawer for a long time before deciding what it means.',
      hint: '',
    },
    {
      id: 'end_before_midnight',
      name: 'Before Midnight',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['married_before_midnight', 'elena_chose_you'],
        minRelationship: [{ characterId: 'elena', dimension: 'affection', value: 75 }],
      },
      condition:
        'She knows everything — the photograph, the errand, the order sheet — and she married the player anyway, in the empty chapel, with minutes to spare, because she chose to and not because of the clock. Write it small: the officiant in his coat, Sami as the only witness, two signatures. Do not have anybody make a speech about it.',
      epilogue:
        'The boatyard makes its Monday payment. The welcome board, the one with the name struck through, ends up framed in the downstairs loo of their first flat, and every guest who sees it asks, and Elena tells the story differently every time, and always correctly.',
      hint: 'The officiant is in the building until midnight.',
    },
    {
      id: 'end_a_year_on_paper',
      name: 'A Year on Paper',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['paper_marriage', 'elena_knows_the_truth'] },
      condition:
        'Elena knows the truth and keeps the marriage to Marcus anyway, on paper, for exactly as long as the trust needs, because sixty jobs at her father’s yard are worth a year of her life. It is cold and sensible and her decision. Write the player as somebody who understands it and does not have to like it.',
      epilogue:
        'They divorce eleven months later, quietly, as agreed. Marcus contests nothing. On the day the papers come through Elena sends the player a single text with a time and a place, and the place is a café on the coast road where there is no phone signal at all.',
      hint: '',
    },
    {
      id: 'end_raise_a_glass',
      name: 'Raise a Glass',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['exposed_in_public', 'marcus_exposed'], flagsUnset: ['ruined_marcus'] },
      condition:
        'The player took the microphone at the reception and told the whole room, with proof and with times, exactly what their brother did, and then stopped. That is revenge, public and survivable. Write the price as well as the win: Elena heard it at the same moment as her father’s whole boatyard did, and she will not forget who chose the room.',
      epilogue:
        'Two hundred people tell the story for twenty years and every version has the toast in it. Marcus keeps his job and loses every Sunday lunch for a year. One of Elena’s aunts sends a card every Christmas that just says: still the better brother.',
      hint: '',
    },
    {
      id: 'end_the_keys',
      name: 'The Keys to the Hale',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['constance_named_you'],
        minFactionReputation: [{ factionId: 'faction_hales', value: 40 }],
      },
      condition:
        'Grandmother Hale heard about the errand, believed it, and read the player’s name out of the envelope at eight o’clock. Whatever happened with Elena, the player is now responsible for a hundred-year-old hotel, forty staff and a brother who owes money to the wrong people. Write the weight of it, not the triumph.',
      epilogue:
        'The first thing the new keeper of the Hale does is move table nineteen away from the kitchen doors. The second is to hire June Arden back at twice the salary. The third, after a long time on the cliff path, is to ring the lender and ask what Marcus owes.',
      hint: '',
    },
    {
      id: 'end_the_coast_road',
      name: 'The Coast Road',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['married_before_midnight'] },
      condition:
        'The player walked out to the car park, got into the car that still smelled of the coast road, and drove. No scene, no proof, no explanation to anybody. Do not make it a defeat and do not make it brave. It is a completely reasonable thing to do when your own wedding has been taken off you.',
      epilogue:
        'Eleven missed calls becomes forty by the evening. The ring box is still in the glovebox a month later. Grandmother Hale writes once, by hand, two lines, and the second line is: the last man sent away from that chapel the night before a wedding was not the one at fault either.',
      hint: '',
    },
    {
      id: 'end_brothers',
      name: 'Brothers',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['forgave_marcus', 'knows:the_debt'] },
      condition:
        'The player found out exactly why Marcus did it — the debt, the hotel, the woman he introduced them to — and forgave him anyway, on terms. This is not reconciliation and should not be warm. It is two brothers on a bench on the cliff path deciding not to be the Hales of 1966.',
      epilogue:
        'Marcus pays Sami back first, in cash, without being asked. The lender takes three years. The brothers have Sunday lunch once a month and talk about football and never about the cold room, and that turns out to be enough.',
      hint: '',
    },
    {
      id: 'end_after_the_last_guest',
      name: 'After the Last Guest',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['june_and_you'], flagsUnset: ['married_before_midnight'] },
      condition:
        'Something has started between the player and June, slowly and on purpose, and nobody is using it to hurt anybody. Write it as two tired people in an empty Long Room at one in the morning stacking chairs, nothing more than talk and possibly one kiss, and absolutely not tonight as anything else.',
      epilogue:
        'They do not go on a date for four months, because June has rules about that. When they do, she plans it to the minute with a run sheet, and it runs over by two hours, and she says that is the first event of her career she has been glad to lose control of.',
      hint: '',
    },
    {
      id: 'end_somebody_elses_sailing_club',
      name: 'Somebody Else’s Sailing Club',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['let_the_trust_go', 'elena_knows_the_truth'],
        minRelationship: [{ characterId: 'elena', dimension: 'affection', value: 70 }],
      },
      condition:
        'Elena knows the truth and chose not to marry anybody before midnight, so the trust went to a sailing foundation and her father’s yard has to find the money some other way. It is a real sacrifice and somebody has to say out loud what it costs. Do not make the yard magically fine.',
      epilogue:
        'The foundation names a dinghy after Elena’s mother. The boatyard sells two of its slipways and keeps everybody on. A year later, on a day with no deadline attached to it at all, Elena asks the player a question in the vestry, and this time she already knows the answer.',
      hint: '',
    },
    {
      id: 'end_the_groom_who_won',
      name: 'The Last Word',
      rarity: 'UNCOMMON',
      minTurn: 28,
      requires: { flagsSet: ['ruined_marcus', 'exposed_in_public'], flagsUnset: ['elena_chose_you'] },
      condition:
        'The player took the microphone, proved everything, and finished their brother in front of everybody. It worked. Write the price as plainly as the win: Elena found out in front of her father’s whole boatyard, Grandmother had to watch, and the player has to be the man who did it for the rest of their life.',
      epilogue:
        'The clip is everywhere by Tuesday. Marcus leaves the country, and the lender does not stop at Marcus. Elena sends one message, three weeks later, which says thank you and goodbye in the same sentence, and the player reads it far more often than is healthy.',
      hint: '',
    },
    {
      id: 'end_arthurs_letter',
      name: 'Arthur’s Letter',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['the_family_pattern', 'constance_knows_the_errand'] },
      condition:
        'The player found out what happened in 1966, and Grandmother Hale had to say out loud that her husband did to his brother exactly what Marcus did to the player. Whatever else happened today, this is the ending about the family, and the person it changes most is eighty-one.',
      epilogue:
        'Constance reads Arthur’s letter aloud to both her grandsons in the study, once, all the way through. Then she gives it to the player to keep, and on Monday she asks to be driven to the churchyard, where Arthur is buried two rows from Edwin, and stands at the other grave for the first time.',
      hint: '',
    },
    {
      id: 'end_sunday_brunch',
      name: 'Sunday Brunch',
      rarity: 'COMMON',
      minTurn: 28,
      requires: {
        flagsSet: ['the_morning_after', 'no_wedding_yet'],
        flagsUnset: ['married_before_midnight', 'let_the_trust_go'],
      },
      condition:
        'Nobody got married. The vows were stopped, midnight came and went, and on Sunday morning everybody is on the terrace eating cake for breakfast. Nothing is resolved and everybody is still talking to each other, just. Write it funny and tired and honest, with the sea in the background.',
      epilogue:
        'The cake with two names on it gets eaten down to the second name. Grandmother Hale declares the whole weekend the best-attended event in the Hale’s history, and sends the bill for the reception to Marcus.',
      hint: '',
    },
  ],
  opening:
    "Two hundred guests turn as the chapel doors bang shut behind you.\n\nAt the altar, your brother Marcus is wearing your suit. Beside him, in the dress you were never allowed to see, your bride lets go of his hand.\n\n\"I’m sorry,\" Elena says, loud enough for the back row. \"I called you eleven times.\"\n\nThe welcome board by the door reads ELENA &, and then your name, struck through in black marker, with MARCUS written above it.\n\nThe ring box you drove all night to collect is still in your pocket.\n\nYour grandmother, front pew, does not turn around.\n\n\"Please,\" Elena says. \"Sit in the back. Can you do that for me?\"",
  openingPanel: {
    assetKey: 'story_back_row_at_my_own_wedding/opening',
    alt: 'Elena in a high-necked ivory wedding dress at the altar of a glass chapel above the sea, letting go of the hand of a man in a charcoal suit, looking down the aisle at you, guests turning.',
  },
  openingSuggestions: [
    "\"I’m not sitting anywhere until you tell me what I’m supposed to have done.\"",
    'I take a seat in the back row, fold my arms, and watch my brother’s hands.',
    'I walk straight up the aisle and open the ring box in front of everyone.',
  ],
  coverDirection: [
    'SUBJECT: Elena Ward, the bride, in the foreground of a key visual for a modern romantic drama anime about a wedding that has gone to the wrong brother.',
    'She fills the frame from the waist up, slightly left of centre and close, holding about two thirds of the picture, turned back over her shoulder to look straight at the viewer.',
    'Dark brown hair in a low knot with one sprig of white wisteria in it, dark eyes, a long-sleeved, high-necked ivory wedding dress, a small gold watch on her right wrist,',
    'and a bouquet of yellow ranunculus held low in both hands like a gavel.',
    'Her expression is composed and hurt at once: chin up, lips pressed together, eyes bright and steady.',
    'HER FACE STAYS CLEAN: no marks, streaks, sparkles or shadows on her face or skin.',
    'Half a step behind her at the altar, smaller in the frame: the groom, Marcus, tall, sandy hair pushed back, an easy smile gone uncertain,',
    'in a charcoal wedding suit an inch too short at the wrists so his white shirt cuffs show, his hand just let go of hers.',
    'In the lower right foreground, seen from behind and slightly out of focus: one shoulder of a travel-creased dark suit and a hand holding up an open velvet ring box,',
    'a worn gold ring with a small sea-green stone in it catching a bright star of light.',
    'Every sparkle and light effect stays on the ring, the glass roof and the title, never on a face.',
    'BEHIND THEM, soft and secondary: the inside of a white iron and glass chapel on a sea cliff at noon, wisteria hanging over the glass roof,',
    'rows of white chairs with guests turned round in their seats, and a deep blue sea filling the windows behind the altar.',
    'LIGHT: bright white noon light through the glass, a cool blue cast from the sea behind the altar, warm gold glints on the ring and the watch.',
    'TITLE: the words Back Row at My Own Wedding painted into the art in the upper third, across the glass roof and the sky, as an elegant engraved wedding-invitation serif in ivory with a thin gold edge,',
    'on two lines, BACK ROW AT above MY OWN WEDDING, with WEDDING the largest, spelled exactly BACK ROW AT MY OWN WEDDING, large and legible at thumbnail size.',
    'One thin hand-drawn black marker line strikes through the word MY only, the way a name is crossed off a welcome board, with MY still readable under it. No other text anywhere.',
  ].join(' '),
  publishedAt: '2026-11-22T18:19:46.004Z',
};

export const BACK_ROW_AT_MY_OWN_WEDDING = StoryVersion.parse(raw);

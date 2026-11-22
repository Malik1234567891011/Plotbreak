import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Human, Row Three" — a monster academy, a register, and one word where a
 * name should be.
 *
 * Bible: `docs/story-bibles/new50/16_HUMAN_ROW_THREE.md`. Slate #16, drop 7.
 *
 * Playable span: seven days at Hollowmere Academy, from the first morning's
 * roll call (day 0, 08:30) to the Lantern Vote on the seventh evening (day 6,
 * 20:00). Everything after the vote lives in the endings.
 *
 * The spine is the register. Mr. Bones takes roll twice a day and the player
 * is written in it as "Human. Row three." Two pressures hang off that one
 * line: paragraph nine of the Accord (an absent human gets collected by the
 * Gate wardens) and the Founders' ward (it protects names, and "Human" is a
 * description). Getting your name written in takes three House heads vouching
 * aloud in the Great Hall. Staying "Human" on purpose is an ending of its own,
 * not a failure to get the other one.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and the first twelve endings, plus the chosen archetype's
 * starting abilities. So roll call, paragraph nine, the ward, the naming rule
 * and the lanterns are all in hard canon; the papers, the register and the
 * lanterns are quest items; and every archetype starts with Answer for
 * Yourself, the verb roll call asks for.
 *
 * The last human student, who also sat in row three forty-one years ago, is an
 * optional lead in the Platform 11 mould from Good Morning, Husband: it opens
 * only for a player who goes looking, and the vote is a whole game without it.
 *
 * Three invisible variables. Nerve is the only GOOD_HIGH, because
 * `resolveRest` refills those. Alarm is first among the descending pair on
 * purpose: public violence raises the first GOOD_LOW in array order, and a
 * human in a fight is exactly what brings the wardens. Glamour is what this
 * side of the Briar puts on you each time you eat its food or strike its
 * bargains; it makes the place kinder and the gate stiffer.
 *
 * Art: the cover's `TITLE:` line owns the lettering, and every effect stays on
 * the desk, the gauntlet and the title, never on Ishiko's face. The opening
 * panel's alt starts with "Ishiko", who is the first to speak to the player,
 * so her portrait is the panel's reference image.
 */

const raw = {
  id: 'sv_human_row_three_1',
  storyId: 'story_human_row_three',
  version: 1,
  title: 'Human, Row Three',
  fantasyLabel: 'Thirty monsters. Every head turns to you.',
  hook: 'Exchange year at a monster academy. At roll call they ask for the human, and every head turns.',
  premise:
    'You are the first human exchange student at Hollowmere Academy in forty-one years. It stands on the far side of the Briar, the mile-deep wall of thorn that has kept the human side and the monster side apart for longer than anyone has written down.\n\n' +
    'The Briar Accord keeps one gate open and lets one student cross each way each year. It runs out at midnight on the seventh night, and the human side will renew it only if its student is still present when the week ends.\n\n' +
    'That student is you. The register in homeroom has you down as "Human. Row three." Not your name. A skeleton called Mr. Bones reads it aloud twice a day, and paragraph nine of the Accord is plain: an absent human gets collected by the Gate wardens and walked home.\n\n' +
    'Your classmates have horns, wings, gills and opinions. The oni behind you has been told to find out what you are made of. The harpy at the window is taking bets on how long you last. The vampire who runs the Council smiles at you with every tooth she has.\n\n' +
    'On the seventh evening each of the five Houses sets a lantern in a Great Hall window, lit or dark, and the Briar stays open or closes for good.\n\n' +
    'The last human sat in row three too. Nobody ever marked her absent.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Magic academy', 'Monsters', 'Romance', 'Comedy', 'Supernatural'],
  mechanicsChips: [
    'Answer roll, or get collected',
    'Five Houses, five lanterns',
    'Earn your name in the register',
    'Every gift has a price',
    'A seat nobody marked absent',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can spend the whole week answering roll, sitting at the wrong lunch table and losing to an oni at arm-wrestling, and that is a real way to play this. Every House wants something from you this week. Some of them want you gone. One of them needs you to survive the week more than you do, and is very good at hiding it.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'homeroom',
    startWorldMinute: 8 * 60 + 30,
    startingItems: [
      { itemId: 'exchange_papers', qty: 1 },
      { itemId: 'bag_of_human_things', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-one. Ishiko is twenty-one, Sylph twenty-two and Teague twenty-four. Countess Vey is a hundred and thirty-one and has looked twenty-eight since the night she was turned. Mr. Bones died at fifty-one and has taught at Hollowmere for eighty-three years since. The Keeper is sixty-one. Gate-Warden Grenna is seventy-nine. Mr. Pruitt, the Exchange Office clerk, is fifty-eight. Ada’s sister June is sixty-six. Hollowmere is a post-secondary academy and every student in it is eighteen or over.',
      'Hollowmere Academy stands on the monster side of the Briar, a living wall of black thorn a mile deep that runs the whole length of the border. One gate goes through it, kept by the oni Gate wardens on this side and by the Exchange Office, one clerk and a brass bell, on the human side. Anyone who steps into the thorns anywhere but the gate comes out wherever the Briar decides.',
      'The Briar Accord keeps the gate open and lets one student cross each way each year. The exchange stopped forty-one years ago and this is its first year back; this year’s monster student, a very polite troll of twenty, is at the player’s university. The Accord expires at midnight on the seventh night, and the human side will renew it only if the Exchange Office is told on the seventh evening that its student is present. The first morning of the week is a Monday.',
      'Mr. Bones takes roll from the register twice a day: half past eight in homeroom, and six in the evening at the head table of the Great Hall. Paragraph nine of the Accord: an exchange student absent from roll twice, or who seriously hurts anyone whose name is in the register, is collected by the Gate wardens and walked back through the gate, and the exchange is over. Mr. Bones will turn one absence into a late mark, once, if the player comes to him and explains. Walking out before answering is marked absent on the spot.',
      'The register is under the Founders’ ward. On academy ground, harm aimed at anyone whose name is written in it turns aside: a punch lands as a shove, a curse comes out as a sneeze. The ward stops at the academy wall, at the lake’s waterline and below the fifth level of the Stacks. The player is written in only as "Human. Row three.", and the ward only half answers to a description: on academy ground they can be bruised, frightened and embarrassed, but not badly hurt.',
      'A description in the register is replaced by a name when the heads of three different Houses vouch for that student aloud in the Great Hall with the school present. Mr. Bones has the player’s real name on a card in his breast pocket, sent by the Exchange Office, and will not write it in on any other terms.',
      'There are five Houses. Gate House is the oni, the warden clans’ own students. The Roost is the harpies and the other winged students. Cellar House is the vampires. Deep House is the kelpies and the lake folk. Bone House is the skeletons, ghosts and anyone else who has died at least once. Their heads are Ishiko, Sylph, Countess Vey, Teague and, for Bone House, Mr. Bones.',
      'On the seventh evening each House head sets an iron lantern in a Great Hall window, lit to keep the Briar open or dark to close it. Three lit keeps it open. Cellar House and the Roost lean lit. Gate House leans dark. Deep House will sell its lantern for a price. Mr. Bones sets Bone House’s lantern by the register: lit for a student with a name, dark for a guest.',
      'Food, drink, gifts and spoken bargains on this side of the Briar each put a little glamour on a human. A little is harmless and makes the place kinder to you. A lot, and the ward starts to count you as its own, and the gate stops letting you back through.',
      'Vampires at Hollowmere drink bottled blood that comes through the gate from human hospitals under the Accord. Biting anyone is a treaty crime. Cellar House has eleven months of bottles left, and nobody outside Cellar House knows it.',
      'Forty-one years ago the last human exchange student, Ada Penhallow, sat in row three, walked down into the Stacks in her third week and was never marked present or absent again. The human side believes she died here. She did not. She is the Keeper of the bottom of the Stacks, whom most students think is a ghost, and Countess Vey hid her there at Ada’s own request. Her line in the register is still open. Nobody volunteers any of this; a player finds it only by going looking.',
      'Gate-Warden Grenna, Ishiko’s grandmother and captain of the wardens, lost her husband in the fighting at the gate the winter after Ada vanished. She wants the Briar closed and has told Ishiko to set Gate House’s lantern dark.',
      'The player is an ordinary human with no magic of their own: no wings, no spells, no changing shape, no strength or senses beyond a human’s, and glamour never gives them any. Feeling where the ward runs thick is a knack border people learn, not a power, and calling on the register borrows the Founders’ ward rather than anything of theirs. When the player tries to fly, cast or change shape, they try, it does not work, and the room notices.',
    ],
    toneGuide:
      'Monster-school comedy with a real clock under it. Funny, quick and physical: horns catch on doorframes, a harpy lands on a desk instead of sitting at it, the Cellar House table drinks from wine bottles with hospital labels. The player is the only human in every room and the room always notices, which is the joke and also the danger. ' +
      'Every monster here wants something this week of their own, and none of them is a pet or a prize. Menace is real and courteous: teeth are shown and never used. Fights on academy ground end in bruises and lost dignity, because the ward sees to it; past the wall, the waterline and the fifth level of the Stacks, it does not. ' +
      'Roll call comes twice a day and the prose should let the player feel it coming. The Keeper, the open line in the register and the last human are found by a player who goes looking and never handed to one who does not. Romance is slow, teasing and allowed up to a kiss. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Ishiko drops a rope at your feet.\n\n\"Gate House custom,\" she says. \"The stone, the rope or the table. You pick.\"\n\nThe stone is the size of a sofa. The rope goes over a beam to something you cannot see. The table has two elbow dents worn into it.\n\n\"What happens if I don’t pick?\"\n\nShe thinks about it. Properly. Her horns tilt.\n\n\"Nobody’s ever not picked,\" she says. \"Huh.\"\n\nAt the gate, two wardens have stopped pretending not to watch.",
      "The Countess pours from the left-hand pot into your cup and from the right-hand pot into hers. They are not the same colour.\n\n\"Sugar?\"\n\n\"Please.\"\n\nShe sets the tongs down. \"Your heart is going like a harpy at a window. Do relax. If I wanted you frightened I would not have used the good cups.\"\n\nShe smiles. You count, without meaning to. All of them.\n\n\"Now,\" she says. \"How many lanterns do you think you have?\"",
      "Sylph lands on the windowsill without knocking, folds her wings and writes something on her wrist.\n\n\"Day two,\" she says. \"Odds are down to five to one. Somebody’s putting money on you, Row Three, and it isn’t you.\"\n\n\"Who?\"\n\n\"Gossip costs one shiny thing or one true thing.\"\n\nYou hand her a coin from home. She bites it, frowns at the queen on it, and pockets it anyway.\n\n\"Wrong question,\" she says. \"Ask me how much.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 11, presence: 12, resolve: 12, arcana: 8 },
  skills: [
    { id: 'manners', name: 'Manners', attribute: 'presence', description: 'Which bow, which cup and which compliment will not start a feud between Houses.' },
    { id: 'charm', name: 'Charm', attribute: 'presence', description: 'Getting a table of strangers with teeth to like you by the end of lunch.' },
    { id: 'bluff', name: 'Bluffing', attribute: 'presence', description: 'Saying a thing that is not true to somebody who can hear your heartbeat.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Not flinching when something with horns leans over your desk.' },
    { id: 'lore', name: 'Lore', attribute: 'mind', description: 'What the human books say about this side of the Briar, about half of which is true.' },
    { id: 'noticing', name: 'Noticing', attribute: 'mind', description: 'Who bows to whom, which table is whose, and what everybody else does first.' },
    { id: 'grit', name: 'Grit', attribute: 'might', description: 'Lifting, hauling and holding on, against people who were built for it.' },
    { id: 'sneaking', name: 'Sneaking', attribute: 'agility', description: 'Being somewhere a guest should not be, without anybody counting heads.' },
    { id: 'briarcraft', name: 'Briarcraft', attribute: 'arcana', description: 'Feeling where the ward runs thick and where it thins, the way border people feel weather.' },
  ],
  /**
   * Three, all invisible.
   *
   * Nerve is the only GOOD_HIGH, so resting restores the day and nothing else.
   * Alarm and Glamour descend. Alarm is how close the Gate wardens are to
   * carrying out paragraph nine; Take the Challenge, Slip Off and Walk the Old
   * Paths raise it. Glamour is how far this side has taken hold of the player;
   * Take What They Offer and Strike a Bargain raise it.
   */
  resources: [
    {
      id: 'nerve',
      name: 'Nerve',
      max: 100,
      start: 75,
      regenPerHour: 2,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player has been the only human in every room since breakfast. They stop wherever they are, and whoever is nearest decides whether that is funny or an opening.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Every face with teeth reads as a threat, jokes come out wrong, and the player agrees to things to end the conversation. The guest room and a shut door are the right call, and every monster in the corridor can tell exactly how worn through the human is.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary strain of being stared at all day. Fine for one more class or one more conversation, and honest about not wanting a third. Stairs built for oni feel twice as steep as they did this morning.',
        },
        {
          upTo: 100,
          behaviour:
            'Still riding the first-day jolt. Room to be curious, to talk back to a vampire, to say yes to a contest, to walk down to the lake after dark. Scenes can run long and go somewhere.',
        },
      ],
    },
    {
      id: 'alarm',
      name: 'Alarm',
      max: 100,
      start: 15,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody at the gate is thinking about the human at all. The wardens nod to the player on the warden road and go back to their dice.',
      color: '#C0504D',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The wardens treat the human as a curiosity. Two of them came to look at the player over the gate-yard wall and went away disappointed by the size. Nobody is keeping track of where the player goes.',
        },
        {
          upTo: 50,
          behaviour:
            'The wardens are paying attention. One of them stands at the end of the guest-room corridor in the evenings and calls it a courtesy. Mr. Bones reads the human’s line at roll a little louder than the others.',
        },
        {
          upTo: 78,
          behaviour:
            'The wardens are getting paragraph nine ready. Two of them follow the player between classes, and a warden’s cart waits by the gate with its mule in harness. Ishiko is asked every evening where the human was all day, and is expected to know.',
        },
        {
          upTo: 100,
          behaviour:
            'The wardens have decided. Gate-Warden Grenna has the collection order written out and needs only one more absence, or one more bruise on a named student, to serve it. Every House knows, and the human’s friends are being asked to stand aside.',
        },
      ],
    },
    {
      id: 'glamour',
      name: 'Glamour',
      max: 100,
      start: 5,
      regenPerHour: -0.1,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The player is entirely human and the place knows it. Doors are heavy, the bread is only bread, and the gate would let them through tonight.',
      color: '#7A5BA8',
      bands: [
        {
          upTo: 20,
          behaviour:
            'A little of this side has rubbed off. The player’s shadow is half a second late following them, and the hall cat sits on their feet at supper. Nothing they would notice unless somebody pointed it out.',
        },
        {
          upTo: 50,
          behaviour:
            'The place has started to like the player. Doors open a moment before they touch them, the lake goes still when they walk by, and monsters meeting them for the first time take them for an odd sort of student rather than a human.',
        },
        {
          upTo: 80,
          behaviour:
            'The ward has started to count the player as its own. A blow aimed at them on academy ground turns aside as if they were named, and the wardens find the gate stiff on its hinges when the player stands near it. Their eyes catch the lamplight the way Cellar House eyes do.',
        },
        {
          upTo: 100,
          behaviour:
            'The player belongs to this side now. The gate will not let them back through, and not even the old paths would have them. The register would take their name without anybody vouching, which is the welcome Ada Penhallow got forty-one years ago.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'exchange_papers',
      name: 'Your Exchange Papers',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'One sheet, stamped by both sides of the Briar, with your full name typed at the top. Under Conditions: answer the register morning and evening; do not go back through the gate before the seventh night; no biting, in either direction.',
      loreText:
        'Paragraph nine, in smaller type: an exchange student absent from the register twice, or who seriously hurts anyone in it, shall be collected by the Gate wardens and returned through the gate. Somebody at the Exchange Office has underlined it twice in blue biro.',
      icon: 'papers',
    },
    {
      id: 'bag_of_human_things',
      name: 'Your Bag of Human Things',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A rucksack with a phone that has no signal but still takes photographs, two bars of chocolate, a bag of salt-and-vinegar crisps, a charger with nowhere to plug it in, and a paperback with a cracked spine.',
      loreText:
        'On this side of the Briar every one of those is a curiosity, and some of them are currency. A harpy will trade gossip for a foil wrapper, and no oni has ever tasted chocolate.',
      icon: 'bag',
    },
    {
      id: 'the_register',
      name: 'The Register',
      tags: ['quest', 'document'],
      questItem: true,
      droppable: false,
      description:
        'A black ledger the size of a paving stone, chained to the homeroom lectern by a chain that has never been locked. This term’s page has thirty names in Mr. Bones’s copperplate, and one line that reads only "Human. Row three."',
      loreText:
        'A name written in it is under the Founders’ ward on academy ground. Forty-one years back, on a page he still turns to every morning, there is a line that reads "Penhallow, Ada. Human. Row three." with no mark beside it.',
      icon: 'book',
    },
    {
      id: 'five_lanterns',
      name: 'The Five Lanterns',
      tags: ['quest'],
      questItem: true,
      description:
        'Five iron lanterns on the sideboard in the Council Chamber, one for each House, each with a mark cut into its door: a gate, a feather, a cup, a wave, a quill. On the seventh evening the House heads carry them to the Great Hall windows, lit or dark.',
      loreText:
        'Three lit and the Briar stays open. The last time they were carried was forty-one years ago, the winter after the last human vanished, and four of them went in dark.',
      icon: 'lantern',
    },
    {
      id: 'ada_letter',
      name: 'A Letter Under the Floorboard',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'Folded small and gone soft with age, in blue ink: "If you are reading this, you are the next one. Answer the register. Do not let them write you in until you know whether you want to stay. A.P., row three."',
      loreText:
        'The board it was under is the one by the window that creaks. Whoever wrote it pressed hard enough to dent the wood underneath.',
      icon: 'letter',
    },
    {
      id: 'keepers_map',
      name: 'The Keeper’s Map of the Briar',
      tags: ['quest', 'map'],
      questItem: true,
      description:
        'Forty years of walking, drawn in pencil on the backs of library catalogue cards taped together: the old paths through the Briar that go nowhere near the gate.',
      loreText:
        'The paths only open for someone the Briar still counts as human. The Keeper stopped being able to walk them herself about thirty years ago.',
      icon: 'map',
    },
    {
      id: 'weir_map',
      name: 'Teague’s River Map',
      tags: ['quest', 'map'],
      questItem: true,
      description:
        'A waxed chart of the river from the Mere to the Briar and out the other side, with a weir drawn on the human side in red ink and a note beside it: "This. Open this."',
      loreText:
        'Drawn from what the Roost could see from the air. It has been folded and unfolded so often the weir is wearing through.',
      icon: 'map',
    },
    {
      id: 'betting_slip',
      name: 'A Slip From Sylph’s Book',
      tags: ['document'],
      description:
        'A strip of paper with the Roost’s stamp on it: "Human lasts the week. Seven to one." Blank where the stake goes.',
      loreText: 'Sylph keeps the stubs on a spike in the bell tower. Her own is the thickest one on it.',
      icon: 'ticket',
    },
    {
      id: 'garras_glasses',
      name: 'Wire Reading Glasses',
      tags: ['personal'],
      skillModifiers: { noticing: 1 },
      description:
        'A pair of round wire reading glasses wrapped in a clean cloth, at the bottom of a warden’s locker, under a spare gauntlet.',
      loreText:
        'No Gate warden in the clan’s history has worn glasses. These lenses are very strong and there is not one scratch on them.',
      icon: 'glasses',
    },
    {
      id: 'hall_bread',
      name: 'Hall Bread',
      tags: ['food'],
      stackable: true,
      maxStack: 3,
      consumable: { resourceId: 'nerve', amount: 15, consumesItem: true },
      description: 'Black bread from the Great Hall, still warm, with something in the crust that glitters.',
      loreText: 'It is very good. It is also from this side of the Briar, and the Keeper would tell you to count the slices.',
      icon: 'bread',
    },
    {
      id: 'field_guide',
      name: 'A Traveller’s Guide Beyond the Briar',
      tags: ['book'],
      skillModifiers: { lore: 1 },
      description:
        'Written by a human who spent a fortnight here sixty years ago, annotated by you in three colours. It is confident about everything and right about half of it.',
      loreText:
        'Chapter four says never to thank anybody on this side. That one is true. Chapter six says vampires cannot cross running water, which Cellar House finds very funny.',
      icon: 'book',
    },
    {
      id: 'team_hoodie',
      name: 'Your Team Hoodie',
      tags: ['clothing'],
      description: 'University rowing club, grey, sleeves pushed up, your surname across the back in white letters.',
      loreText: 'Ishiko has looked at it twice. On this side a garment with a name on it is either a challenge or a gift.',
      icon: 'shirt',
    },
    {
      id: 'deck_of_cards',
      name: 'A Deck of Cards',
      tags: ['game'],
      skillModifiers: { charm: 1 },
      description:
        'Worn soft, one corner bent on the queen of hearts, from the bar where you worked. Nobody on this side of the Briar has ever seen one.',
      loreText: 'Sylph has already asked twice what odds a deck like that can give.',
      icon: 'cards',
    },
    {
      id: 'iron_key',
      name: 'Your Grandmother’s Iron Key',
      tags: ['personal'],
      skillModifiers: { briarcraft: 1 },
      description:
        'A cold iron key as long as your hand, for no lock anybody remembers. It hung on a nail by your grandmother’s door your whole life.',
      loreText:
        'Iron stings most people on this side. Showing it is rude. Drawing it on somebody is an insult the Houses remember for a generation.',
      icon: 'key',
    },
  ],
  abilities: [
    {
      id: 'answer_for_yourself',
      name: 'Answer for Yourself',
      tags: ['social'],
      description: 'Speak up in front of the room: answer the register, give your real name, say what you are and why you came.',
      affordances: ['answer', 'say present', 'speak up', 'introduce myself', 'tell them my name', 'answer the register', 'stand up and answer'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'presence', skillId: 'composure', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'stand_your_ground',
      name: 'Stand Your Ground',
      tags: ['social'],
      description: 'Do not step back from something with teeth: meet the stare, keep your seat, refuse to be moved or hurried.',
      affordances: ['stare back', 'hold my ground', 'refuse', 'stay put', 'smile back', 'look her in the eye', 'do not back down'],
      costs: [{ resourceId: 'nerve', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'watch_them',
      name: 'Watch How They Do It',
      tags: ['sight'],
      description: 'Work out the custom by watching who bows to whom, which table is whose, and what everybody else does first.',
      affordances: ['watch', 'look around', 'observe', 'study them', 'read the room', 'look closer', 'search the room'],
      costs: [{ resourceId: 'nerve', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'noticing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_challenge',
      name: 'Take the Challenge',
      tags: ['physical'],
      description: 'Accept a contest of strength, speed or stomach the way this side means it, all the way to the end.',
      affordances: ['accept the challenge', 'arm wrestle', 'lift the stone', 'race her', 'take her on', 'spar with her', 'pull the rope'],
      costs: [
        { resourceId: 'nerve', amount: 14 },
        { resourceId: 'alarm', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'grit', baseDc: 15 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'trade_something_human',
      name: 'Trade Something Human',
      tags: ['social'],
      description: 'Offer something from your side, a bar of chocolate, a photograph, a song, a story, for something from theirs.',
      affordances: ['trade', 'offer chocolate', 'give her something', 'show them my phone', 'pay her', 'swap', 'share my crisps'],
      costs: [{ resourceId: 'nerve', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_what_they_offer',
      name: 'Take What They Offer',
      tags: ['social'],
      description: 'Accept this side’s food, drink, seat or ride, knowing every gift puts a little more glamour on you.',
      affordances: ['eat it', 'drink it', 'accept the tea', 'sit at their table', 'try the food', 'take the bread', 'accept the ride'],
      costs: [{ resourceId: 'glamour', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Strike a Bargain',
      tags: ['social'],
      description: 'Make a spoken bargain the way this side makes them. It binds both of you, word for word.',
      affordances: ['make a deal', 'bargain', 'shake on it', 'promise', 'swear it', 'name my price', 'agree to the trade'],
      costs: [{ resourceId: 'glamour', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'bluff_them',
      name: 'Bluff',
      tags: ['social'],
      description: 'Say something untrue with a straight face. Vampires can hear your heart, so choose your audience.',
      affordances: ['lie', 'bluff', 'pretend', 'make something up', 'fib', 'cover for it'],
      costs: [{ resourceId: 'nerve', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bluff', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_away',
      name: 'Slip Off',
      tags: ['movement'],
      description: 'Go where a guest is not meant to go, while nobody is counting heads.',
      affordances: ['sneak', 'slip away', 'skip class', 'hide', 'sneak out', 'go off alone', 'explore at night', 'walk out'],
      costs: [
        { resourceId: 'nerve', amount: 6 },
        { resourceId: 'alarm', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'sneaking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'know_the_custom',
      name: 'Know the Custom',
      tags: ['social'],
      description: 'Recall what the books say is polite here, and hope this is one of the true bits.',
      affordances: ['remember the custom', 'bow properly', 'use the right greeting', 'recall', 'check my guide', 'mind my manners'],
      costs: [{ resourceId: 'nerve', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'lore', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'feel_the_ward',
      name: 'Feel for the Ward',
      tags: ['sight'],
      description: 'Feel where the Founders’ ward runs thick and where it thins, the way you learned to feel the Briar from your side.',
      affordances: ['feel for the ward', 'sense it', 'feel the briar', 'find the thin place', 'listen to the walls', 'find the way down'],
      costs: [{ resourceId: 'nerve', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'briarcraft', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'work_the_room',
      name: 'Work the Room',
      tags: ['social'],
      description: 'Get a table of strangers laughing and telling you things they meant to keep, the way you did across a bar.',
      affordances: ['work the room', 'tell a joke', 'deal the cards', 'get them talking', 'charm the table', 'buy them a drink'],
      costs: [{ resourceId: 'nerve', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'MULTI',
      check: { attribute: 'presence', skillId: 'charm', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_the_register',
      name: 'Call on the Register',
      tags: ['defensive'],
      description: 'Say your own name as it is written in the register, and let the Founders’ ward turn harm aside.',
      affordances: ['call the register', 'invoke the ward', 'call on the ward', 'i am in the register', 'stand behind the ward'],
      costs: [{ resourceId: 'nerve', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['named_in_register'],
        lockedCopy: 'The register has you down as "Human", and "Human" is a description, not a name. The ward does not answer to it.',
      },
    },
    {
      id: 'walk_the_old_paths',
      name: 'Walk the Old Paths',
      tags: ['movement'],
      description: 'Take the Keeper’s paths through the Briar, which go round the gate and through places the wardens do not watch.',
      affordances: ['take the old path', 'go through the briar', 'follow the pencil map', 'walk her home', 'use the old paths'],
      costs: [
        { resourceId: 'nerve', amount: 12 },
        { resourceId: 'alarm', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'briarcraft', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_old_paths'],
        maxResources: [{ resourceId: 'glamour', value: 90 }],
        lockedCopy: 'The Briar is a mile of thorn with one gate in it, and the gate has wardens on it. If there is another way through, nobody has shown it to you.',
      },
    },
  ],
  locations: [
    {
      id: 'homeroom',
      name: 'Homeroom',
      shortName: 'Homeroom',
      description:
        'A tiered classroom under the bell tower: five rows of desks scored by claws and scorched in one corner, thirty students of thirty kinds, and a lectern at the front with the register chained to it. Row three has one chair with a card on it that says HUMAN. The window seat belongs to the Roost. The back row sits under shutters that never open. Mr. Bones teaches Accord Law here until the lunch bell. This week’s lesson is Humans: Habits and Hazards, and the class has questions.',
      artDirection:
        'Tiered stone classroom in a gothic academy, morning light through tall windows, desks gouged by claws, a skeleton teacher at a lectern with a huge black ledger, classmates with horns, wings and fins filling the rows, one empty chair in the third row. Warm wood, cool stone, lively.',
      connections: [{ to: 'the_cloister', travelMinutes: 1, label: 'Out to the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'the_register', qty: 1, ownerId: 'bones', aka: ['register', 'the register', 'the ledger', 'roll book', 'the big black book'] },
      ],
    },
    {
      id: 'the_cloister',
      name: 'The Cloister',
      shortName: 'Cloister',
      description:
        'The square at the heart of Hollowmere: a covered arcade round a yard with a well and a bell tower, a notice board three layers deep, and doorways to everything. Every House crosses it between classes, and every House has its own side of it to walk on. Nobody has told you which side is yours.',
      artDirection:
        'Gothic academy cloister courtyard, covered stone arcade, a well in the middle, a tall bell tower, a crowded notice board, monster classmates of many kinds crossing in groups. Late morning, busy.',
      connections: [
        { to: 'homeroom', travelMinutes: 1, label: 'Back to homeroom' },
        { to: 'great_hall', travelMinutes: 2, label: 'The Great Hall' },
        { to: 'guest_room', travelMinutes: 3, label: 'Up the tower stair to your room' },
        { to: 'the_roost', travelMinutes: 4, label: 'Up the bell tower' },
        { to: 'council_chamber', travelMinutes: 3, label: 'Down the shuttered passage to the Council' },
        { to: 'the_stacks', travelMinutes: 2, label: 'The library doors' },
        { to: 'gate_yard', travelMinutes: 4, label: 'Through the arch to the Gate Yard' },
        { to: 'lake_dock', travelMinutes: 9, label: 'Down the cliff stair to the lake' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'Five long House tables under a ceiling of living roots, a head table where Mr. Bones takes evening roll, and five tall windows at the far end with an empty iron hook in each. Every seat at every table has been somebody’s for a hundred years. There is no table for one.',
      artDirection:
        'Vast medieval dining hall with a ceiling of tangled living tree roots, five long tables for five monster houses, a high table, five tall arched windows each with an empty iron hook. Candles, noise, crowded.',
      connections: [{ to: 'the_cloister', travelMinutes: 2, label: 'Back out to the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'hall_bread', qty: 3, ownerId: null, aka: ['bread', 'hall bread', 'the black bread', 'a loaf'] },
      ],
    },
    {
      id: 'guest_room',
      name: 'The Guest Room',
      shortName: 'Your Room',
      description:
        'The room kept for the human exchange student, at the top of the old tower stair, opened this week for the first time in forty-one years. Dust sheets, a narrow iron bed with two initials scratched into the frame, a window that looks straight out over the Briar, and a floorboard by the window that creaks.',
      artDirection:
        'Small round tower bedroom unused for decades, dust sheets on the furniture, a narrow iron bed, one window looking out over a vast wall of dark thorn, moonlight. Quiet, slightly eerie, cosy.',
      connections: [{ to: 'the_cloister', travelMinutes: 3, label: 'Down the tower stair' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'ada_letter', qty: 1, ownerId: null, aka: ['letter', 'the letter', 'the floorboard', 'under the floorboard', 'the folded note'] },
      ],
    },
    {
      id: 'the_roost',
      name: 'The Roost',
      shortName: 'The Roost',
      description:
        'The top of the bell tower, open to the wind on three sides: pigeonholes for the academy post, hammocks slung between the bell beams, and a slate board where Sylph chalks the odds on everything. Today’s top line is about you, and it says seven to one.',
      artDirection:
        'Top of a gothic bell tower open to the sky, wooden pigeonholes stuffed with letters, hammocks between beams, a big chalk betting board, harpies perched on the rails, wind and clouds. Airy, cluttered.',
      connections: [{ to: 'the_cloister', travelMinutes: 4, label: 'Down the tower' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: -1 },
      takeableItems: [
        { itemId: 'betting_slip', qty: 1, ownerId: 'sylph', aka: ['slip', 'betting slip', 'a bet', 'the stub'] },
      ],
    },
    {
      id: 'council_chamber',
      name: 'The Council Chamber',
      shortName: 'Council',
      description:
        'Cellar House’s rooms, one floor below ground and lit only by candles: a long table that seats five Houses, two teapots that are not for the same thing, and the five iron lanterns waiting on a sideboard. Countess Vey has kept the minutes here for forty-four years.',
      artDirection:
        'Candlelit gothic council room below ground, a long dark table, velvet chairs, a silver tea service with two teapots, five iron lanterns on a sideboard, shuttered windows. Elegant, red and black.',
      connections: [{ to: 'the_cloister', travelMinutes: 3, label: 'Up to the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'five_lanterns', qty: 1, ownerId: 'vey', aka: ['lantern', 'the lanterns', 'a lantern', 'the five lanterns'] },
      ],
    },
    {
      id: 'the_stacks',
      name: 'The Stacks',
      shortName: 'Library',
      description:
        'The academy library goes down instead of up: nine levels of shelves cut into the rock under the cliff, joined by a stair that spirals round a shaft of lamplight. Students stay above the fifth level, because below it the ward thins and the books start rearranging themselves. Mr. Bones marks papers at a table by the top of the stair.',
      artDirection:
        'Vast underground library descending in a spiral, shelves cut into rock, a central light shaft, a winding iron stair going down into darkness, a reading table at the top. Golden light above, deep shadow below.',
      connections: [
        { to: 'the_cloister', travelMinutes: 2, label: 'Up to the cloister' },
        { to: 'deep_stacks', travelMinutes: 6, lockedByFlag: 'found_the_stair', label: 'All the way down the stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [],
    },
    {
      id: 'deep_stacks',
      name: 'The Bottom of the Stacks',
      shortName: 'The Bottom',
      description:
        'Below the ninth level, where the stair stops pretending to be part of a library: a room of lamps, a kettle on a spirit stove, a camp bed, a hand-knitted rug and forty-one years of books nobody has borrowed. The walls are papered with a pencil map of the Briar. A tunnel at the back smells of rain.',
      artDirection:
        'Hidden room at the bottom of an underground library, warm lamplight, a kettle on a small stove, a camp bed, stacks of books, a wall covered in a hand-drawn pencil map, a dark tunnel at the back. Cosy and secret.',
      connections: [
        { to: 'the_stacks', travelMinutes: 6, label: 'Back up the stair' },
        { to: 'the_briar', travelMinutes: 25, lockedByFlag: 'knows:the_old_paths', label: 'The tunnel that smells of rain' },
      ],
      discoveredByDefault: false,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'keepers_map', qty: 1, ownerId: 'keeper', aka: ['map', 'the pencil map', 'the briar map', 'her map', 'the catalogue cards'] },
      ],
    },
    {
      id: 'gate_yard',
      name: 'The Gate Yard',
      shortName: 'Gate Yard',
      description:
        'The wardens’ yard inside the academy gate, packed earth and iron. Gate House trains here: a measuring stone the size of a sofa, a rope over a beam, and a table with two elbow dents worn into it. The warden road runs out through the gate toward the Briar, and a path runs down the hill to town.',
      artDirection:
        'Fortified academy gate yard, packed earth, a huge boulder, a thick rope over a wooden beam, a scarred arm-wrestling table, horned oni wardens in iron gauntlets, the main gate open onto a road. Morning, dusty, energetic.',
      connections: [
        { to: 'the_cloister', travelMinutes: 4, label: 'Back through the arch' },
        { to: 'the_briar', travelMinutes: 10, label: 'Out along the warden road' },
        { to: 'lanternside', travelMinutes: 8, label: 'Down the hill into town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'garras_glasses', qty: 1, ownerId: 'garra', aka: ['glasses', 'reading glasses', 'the wire glasses', 'her glasses', 'the cloth'] },
      ],
    },
    {
      id: 'the_briar',
      name: 'The Briar Gate',
      shortName: 'The Briar',
      description:
        'The end of the warden road: a wall of black thorn and green leaf a mile deep and higher than the bell tower, running out of sight both ways, with one arched gate through it and a brass bell to ring the Exchange Office on the far side. The ward does not reach this far. Step into the thorns anywhere but the gate and you come out wherever the Briar decides.',
      artDirection:
        'Enormous wall of dark thorny hedge stretching to the horizon, a single stone archway gate through it with a brass bell, a dirt road leading up, a warden hut, low evening sun. Vast, fairy-tale, ominous.',
      connections: [{ to: 'gate_yard', travelMinutes: 10, label: 'Back up the warden road' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 0 },
      takeableItems: [],
    },
    {
      id: 'lake_dock',
      name: 'The Mere',
      shortName: 'The Lake',
      description:
        'At the bottom of the cliff stair: a black lake so still it holds the academy upside down, a Deep House boathouse on stilts, and a long dock that runs out further than it needs to. The water has dropped a man’s height in sixty years and the old mooring rings hang in the air. The ward ends where the water starts.',
      artDirection:
        'Still black mountain lake at the foot of a cliff with a gothic academy reflected in it, a boathouse on stilts, a long wooden dock, old mooring rings high above the waterline, mist. Moody, beautiful, dangerous.',
      connections: [{ to: 'the_cloister', travelMinutes: 9, label: 'Up the cliff stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'weir_map', qty: 1, ownerId: 'teague', aka: ['river map', 'the chart', 'the waxed chart', 'the river chart'] },
      ],
    },
    {
      id: 'lanternside',
      name: 'Lanternside',
      shortName: 'Town',
      description:
        'The town at the foot of the academy hill, outside the wall and outside the ward: a crooked market street of lamp-makers, a tea house that serves three kinds of tea and one kind of something else, a tailor who measures everybody for a tail-hole, and a great many people who have never seen a human and would like a closer look.',
      artDirection:
        'Crooked fantasy market street at dusk lit by hundreds of hanging lanterns, lamp-maker stalls, a tea house, a tailor shop, monster townsfolk of many kinds. Warm, glowing, crowded.',
      connections: [{ to: 'gate_yard', travelMinutes: 8, label: 'Back up the hill' }],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
  ],
  /**
   * Gate House first on purpose: public violence costs standing with the first
   * faction in array order, and the wardens are who carry out paragraph nine.
   */
  factions: [
    {
      id: 'faction_gate',
      name: 'Gate House and the Wardens',
      description:
        'The oni of Gate House, whose elders are the wardens who keep the Briar gate and enforce the Accord on this side. Paragraph nine is theirs to carry out. Their lantern leans dark, because the last time the gate was open their dead paid for it, and Gate-Warden Grenna has not forgotten one of them.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Unmeasured' },
        { atReputation: 30, label: 'Measured' },
        { atReputation: 60, label: 'Under the Gate’s word' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_cellar',
      name: 'Cellar House',
      description:
        'The vampires, who sleep below the cloister among racks of bottles that came through the gate from human hospitals. Their lantern leans lit and they would rather nobody worked out why. Countess Vey heads the House and the whole student Council, and wrote the clause that makes biting a treaty crime.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Our guest' },
        { atReputation: 35, label: 'Poured for' },
        { atReputation: 65, label: 'Under the Countess’s hand' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_roost',
      name: 'The Roost',
      description:
        'The harpies and the other winged students, who run the academy post from the top of the bell tower and know everything by lunchtime. A reopened Briar means a post route over it, so their lantern leans lit, for wind and stamps. Sylph runs the Roost’s book on how long the human lasts.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Long odds' },
        { atReputation: 35, label: 'A safe bet' },
        { atReputation: 65, label: 'Roost business' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_deep',
      name: 'Deep House',
      description:
        'Kelpies, selkies and things with gills, who live in and under the Mere below the cliff. The lake has been sinking for sixty years because of a weir on the human side of the river. Their lantern goes dark unless somebody makes them an offer, and they keep every bargain to the letter.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'Dry land' },
        { atReputation: 35, label: 'Fair trade' },
        { atReputation: 65, label: 'Welcome in the water' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_bone',
      name: 'Bone House',
      description:
        'The skeletons, ghosts and everybody else who has died at least once. Bone House keeps the register and the academy’s oldest rules, and Mr. Bones sets its lantern. He has said, to anybody who asks, that he will vote by the register and nothing else.',
      startingReputation: 5,
      ranks: [
        { atReputation: 0, label: 'A description' },
        { atReputation: 35, label: 'Present' },
        { atReputation: 65, label: 'Written in' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_exchange',
      name: 'The Exchange Office',
      description:
        'The human side’s office at the far end of the gate: one clerk called Mr. Pruitt, one stamp and one brass bell. They sent you. They want one word on the seventh evening, present or absent, and they will not renew the Accord on any other.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A file number' },
        { atReputation: 40, label: 'Our student' },
        { atReputation: 70, label: 'Our best report in forty years' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'garra',
      name: 'Ishiko',
      role: 'Oni of Gate House, heir to the wardens, and the student sitting directly behind you',
      cardBlurb:
        'She sits in row four, directly behind you, with orders from her grandmother to find out what a human is made of. She was hoping for a fight. You will do for now.',
      pronouns: 'she/her',
      publicTraits: ['Says the thing out loud', 'Turns everything into a contest', 'Laughs with her whole chest'],
      hiddenDrives: [
        'She has wanted to see the human side since her first night watch on the gate, and has never said so to anybody in her clan',
        'She is tired of carrying her grandmother’s lantern and wants one vote this week that is hers',
      ],
      values: ['A fair contest, and losing one properly', 'Saying it to your face'],
      fears: [
        'That her grandmother is right about humans, and she will be the one who proves it',
        'Being laughed at for something she cannot hit',
      ],
      socialStyle:
        'Leans into your space, puts things on your desk, picks you up off the ground if you are slow. Respect is shown by challenge; being ignored is the insult.',
      boundaries: [
        'Will not hit anybody who has not agreed to a contest, and will tell you so while very obviously wanting to',
        'Will not lie for anybody, herself included. She goes silent instead',
      ],
      goals: ['Measure the human before the week is out', 'Decide what to do with Gate House’s lantern before her grandmother decides for her'],
      secrets: [
        {
          id: 'garra_the_glasses',
          fact: 'She cannot read small print. She has needed glasses for three years and keeps a pair wrapped in a cloth at the bottom of her locker in the Gate Yard, because no Gate warden has ever worn them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you catch her squinting at the notice board and read it out for her without making anything of it.',
        },
        {
          id: 'garra_the_box',
          fact: 'She keeps a box of things that came through the gate long ago: a bicycle bell, a snow globe of a human city, three postcards she has never been able to read. Somebody leaves them on the gate-yard wall on her night watches, and she thinks it is a ghost.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only once she has measured you, and you ask her what she would want to see on your side.',
        },
      ],
      speechStyle:
        'Loud, short and physical. Measures everything in lifts and blows. Calls the player "Small" until they earn their name. Says "Huh." when something surprises her, and laughs before she answers.',
      topics: ['the measuring', 'her grandmother', 'the gate', 'the Gate lantern', 'human food', 'what is past the Briar'],
      voiceSamples: [
        'Huh. They told us you’d be bigger.',
        'Gate House custom. The stone, the rope or the table. You pick, Small. I win either way, but you pick.',
        'Grandmother says humans break promises like bread. So promise me something and we’ll see.',
        'You stood up. Most things your size sit down when I lean.',
      ],
      appearance:
        'An adult woman, very tall and broad-shouldered, two short red horns curving up from a mane of black hair tied back with a length of rope, amber eyes, a scar through one eyebrow, a dark high-collared warden’s coat, buttoned to the throat, with the sleeves torn off, and a warden’s iron gauntlet on one forearm.',
      visualHook: 'Two short red horns, and a warden’s iron gauntlet worn to class.',
      silhouette: 'Huge in a doorway, or standing tall behind a desk with both fists planted on it.',
      artSeed: 'hrt-garra-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'surprised', 'annoyed', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'gate_yard', activity: 'on night watch at the gate, then in the wardens’ barracks' },
        { startMinute: 420, endMinute: 510, locationId: 'gate_yard', activity: 'lifting the measuring stone before breakfast' },
        { startMinute: 510, endMinute: 720, locationId: 'homeroom', activity: 'in row four, directly behind the human' },
        { startMinute: 720, endMinute: 800, locationId: 'great_hall', activity: 'at the Gate House table on a third helping' },
        { startMinute: 800, endMinute: 1080, locationId: 'gate_yard', activity: 'training with the wardens, loudly' },
        { startMinute: 1080, endMinute: 1170, locationId: 'great_hall', activity: 'at evening roll, then supper' },
        { startMinute: 1170, endMinute: 1440, locationId: 'gate_yard', activity: 'on the gate-yard wall for the night watch' },
      ],
      homeLocationId: 'gate_yard',
      knowledgeScope: ['gate_house', 'the_wardens', 'the_briar', 'the_measuring', 'hollowmere', 'paragraph_nine'],
      startingRelationship: { trust: 15, affection: 10, respect: 10, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'garra_measures_you',
          label: 'She stops calling you Small',
          kind: 'ALLIANCE',
          requires: { respect: 45, flagsSet: ['measured'] },
        },
        {
          id: 'garra_shows_the_box',
          label: 'She shows you the box of human things',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['measured'] },
        },
        {
          id: 'garra_closer',
          label: 'She sits beside you instead of behind you',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 19, agility: 12, mind: 9, presence: 13, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 80, defenseDc: 16, damage: 12, tags: ['oni', 'warden'] },
    },
    {
      id: 'vey',
      name: 'Countess Ottilie Vey',
      calledName: 'Vey',
      role: 'Head of the student Council and of Cellar House, a vampire who has refused to graduate for forty-four years',
      cardBlurb:
        'She has run the Council since before your parents were born, she pours your tea herself and listens to your pulse while you drink it, and she is the only person on this side of the Briar who needs you to survive the week more than you do.',
      pronouns: 'she/her',
      publicTraits: ['Courteous to a frightening degree', 'Never raises her voice and never needs to', 'Remembers every name, including the ones nobody else uses'],
      hiddenDrives: [
        'Cellar House drinks what comes through the gate in bottles from human hospitals. If the Briar closes, her House goes hungry, politely, within a year',
        'She hid the last human student forty-one years ago, at that student’s own request, and has been paying for it in silence ever since',
      ],
      values: ['Manners as armour', 'A promise kept to the letter, and then a little past it'],
      fears: [
        'That the human is hurt on her watch and it is the last time all over again',
        'Being seen to need anything',
      ],
      socialStyle:
        'Invites rather than summons, and makes the invitation impossible to refuse. Pours the tea herself. Listens to your pulse while you talk and lets you know she is doing it.',
      boundaries: [
        'Will not bite anybody, ever. It is a treaty crime and she drafted the clause',
        'Will not lie outright; she chooses which truths to pour',
        'Will not be seen to protect you in public, because every other House would call it Cellar House looking after its bottles',
      ],
      goals: ['Keep the human present at every roll until the seventh evening', 'Keep the Briar open without anybody learning how much Cellar House needs it'],
      secrets: [
        {
          id: 'vey_the_last_one',
          fact: 'Forty-one years ago the last human student, Ada Penhallow, asked Vey to hide her so she would not be sent home. Vey did. Ada has lived at the bottom of the Stacks ever since, and the human side has believed her dead for forty-one years.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if you have found the open line in the register and bring it to her alone, at night, without threatening to tell anybody.',
        },
        {
          id: 'vey_the_bottles',
          fact: 'Cellar House has eleven months of bottles left in the racks under the Council Chamber. After that the gate is the only supply there is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her straight out what Cellar House gets from the exchange, and she can hear that your pulse is steady.',
        },
        {
          id: 'vey_the_letters',
          fact: 'For two years she has written to the Exchange Office, through the Roost, asking for the exchange back. You are here because she asked for you.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask her why the exchange came back this year, after you have taken tea with her twice.',
        },
      ],
      speechStyle:
        'Long, polished sentences with a sting at the end of them. Calls the player "our guest" and, once she likes them, by their name, which she never gets wrong. Mentions their heartbeat when they lie.',
      topics: ['the Council', 'the lanterns', 'Cellar House', 'manners', 'the Accord', 'the last exchange'],
      voiceSamples: [
        'Welcome, our guest. Do sit. That chair has held a duke, a bishop and a werewolf with a grievance, and it was only rude to one of them.',
        'Your heart just did something interesting. Would you care to try that sentence again?',
        'I have chaired this Council for forty-four years because nobody else will keep the minutes properly. That is not a joke. Very little I say is.',
        'Cellar House will light its lantern when it is ready, and not one minute before. More tea?',
      ],
      appearance:
        'An adult woman, tall and very pale, long black hair pinned up with silver combs, deep red eyes, a high-collared black council coat with a crimson sash across it, white gloves, and a smile that shows every one of her teeth.',
      visualHook: 'A crimson council sash, and a smile that shows every tooth.',
      silhouette: 'Upright in a high-backed chair, gloved hands folded, head tilted a few degrees.',
      artSeed: 'hrt-vey-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'cold', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 510, locationId: 'council_chamber', activity: 'at the long table writing the minutes; she does not sleep at night' },
        { startMinute: 510, endMinute: 720, locationId: 'homeroom', activity: 'in the back row, under the shutters' },
        { startMinute: 720, endMinute: 1080, locationId: 'council_chamber', activity: 'receiving visitors, with the good cups out' },
        { startMinute: 1080, endMinute: 1170, locationId: 'great_hall', activity: 'at the Cellar House table, with a glass of something dark' },
        { startMinute: 1170, endMinute: 1440, locationId: 'council_chamber', activity: 'by candlelight, with the lanterns' },
      ],
      homeLocationId: 'council_chamber',
      knowledgeScope: ['the_council', 'cellar_house', 'the_accord', 'the_lanterns', 'hollowmere', 'the_last_exchange', 'the_keeper'],
      startingRelationship: { trust: 10, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'vey_pours_for_you',
          label: 'She pours your tea from the right pot',
          kind: 'TRUST',
          requires: { trust: 35 },
        },
        {
          id: 'vey_tells_the_truth',
          label: 'She tells you what happened to the last human',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_open_line'] },
        },
        {
          id: 'vey_closer',
          label: 'She calls you by your name in front of the Council',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 55 },
        },
      ],
      attributes: { might: 14, agility: 15, mind: 17, presence: 19, resolve: 16, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 17, damage: 11, tags: ['vampire', 'council'] },
    },
    {
      id: 'sylph',
      name: 'Sylph',
      role: 'Harpy of the Roost, academy post-runner, and the bookmaker taking bets on how long you last',
      cardBlurb:
        'She sits in the window seat with one wing on the sill, she has opened a book on how many days you last, and the odds are not kind. Somebody in her book has bet a fortune on you lasting the week, and that secret costs more than one shiny thing.',
      pronouns: 'she/her',
      publicTraits: ['Talks fast and prices everything', 'Knows every rumour by lunchtime', 'Will not sit anywhere without a window'],
      hiddenDrives: [
        'She crashed into the Briar in a storm last winter and lost her long-flight rating. A reopened gate means a post route over it, and she means to be the first one on it',
        'She bet nine weeks of post wages, at seven to one, that the human lasts the whole week',
      ],
      values: ['Something shiny or something true, as payment', 'Getting there first'],
      fears: ['Being grounded for good', 'Being the last to know something'],
      socialStyle:
        'Perches rather than sits. Asks two questions for every answer she gives, and writes the answers on her wrist. Payment first, gossip second.',
      boundaries: [
        'Will not carry a letter she has not been paid for, and will not open one she has',
        'Will not fix the book. If she bet on you, she wants to win it fair',
      ],
      goals: ['Win the book on the human', 'Fly the first post across the Briar if the gate stays open'],
      secrets: [
        {
          id: 'sylph_her_bet',
          fact: 'She has bet nine weeks of post wages that the human lasts all seven days. If the human is collected or walks home early, she cannot pay her Roost dues and loses her perch in the bell tower.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you put a bet on yourself in her book and then ask who else took those odds.',
        },
        {
          id: 'sylph_the_letters',
          fact: 'For two years she has carried sealed letters from Countess Vey to the gate and left them in a hollow post for the Exchange Office. She has never opened one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If she trusts you and you ask what the Council pays her for.',
        },
      ],
      speechStyle:
        'Rapid and clipped, with numbers in every second sentence. Calls the player "Row Three". Quotes odds instead of opinions. Clicks her talons on the sill while she waits for you to catch up.',
      topics: ['the book', 'the odds', 'the post', 'gossip', 'flying', 'the Roost lantern'],
      voiceSamples: [
        'Row Three. Seven to one says you cry before Thursday. Don’t take it personally, it’s arithmetic.',
        'Gossip costs one shiny thing or one true thing. That button will do.',
        'The Roost lights its lantern because the Roost wants a route over the Briar. Nothing sentimental. Wind and stamps.',
        'I fell four hundred feet into thorns last winter. Ask me how I’m doing and I charge double.',
      ],
      appearance:
        'An adult woman, lean and sharp-featured, wide grey-blue wings with copper-tipped feathers folded at her back, short choppy silver hair, gold eyes, taloned bird feet, a courier’s satchel across her chest and a scuffed flight jacket cut open at the back for the wings.',
      visualHook: 'One wing kept folded a little lower than the other, with a silver pin through the joint.',
      silhouette: 'Crouched on a windowsill, wings half open, satchel swinging.',
      artSeed: 'hrt-sylph-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'surprised', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 390, locationId: 'the_roost', activity: 'in a hammock between the bell beams' },
        { startMinute: 390, endMinute: 510, locationId: 'the_roost', activity: 'sorting the morning post' },
        { startMinute: 510, endMinute: 720, locationId: 'homeroom', activity: 'in the window seat, one wing on the sill' },
        { startMinute: 720, endMinute: 800, locationId: 'great_hall', activity: 'at the Roost table by the window, taking bets' },
        { startMinute: 800, endMinute: 1080, locationId: 'the_roost', activity: 'chalking the odds and running the afternoon post' },
        { startMinute: 1080, endMinute: 1170, locationId: 'great_hall', activity: 'at evening roll, watching the human’s line' },
        { startMinute: 1170, endMinute: 1440, locationId: 'the_roost', activity: 'up in the bell tower doing the accounts' },
      ],
      homeLocationId: 'the_roost',
      knowledgeScope: ['the_roost', 'the_book', 'hollowmere', 'gossip', 'the_post', 'the_lanterns'],
      startingRelationship: { trust: 20, affection: 15, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'sylph_takes_your_bet',
          label: 'She lets you into the book',
          kind: 'OTHER',
          requires: { trust: 25 },
        },
        {
          id: 'sylph_tells_about_letters',
          label: 'She tells you what she carries for the Council',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'sylph_closer',
          label: 'She stops charging you',
          kind: 'ROMANCE',
          requires: { trust: 55, affection: 55 },
        },
      ],
      attributes: { might: 9, agility: 18, mind: 14, presence: 13, resolve: 11, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 15, damage: 7, tags: ['harpy', 'courier'] },
    },
    {
      id: 'bones',
      name: 'Mr. Bones',
      calledName: 'Mr. Bones',
      role: 'Homeroom teacher, keeper of the register and head of Bone House, a skeleton who has taken roll twice a day for eighty-three years',
      cardBlurb:
        'He keeps the register, he wrote you into it as "Human", and he will mark you absent without a flicker if you do not answer. In eighty-three years he has lost exactly one student, and you are sitting in her row.',
      pronouns: 'he/him',
      publicTraits: ['Exact about the register to the minute', 'Kind in ways he hopes nobody notices', 'Rattles slightly when he laughs'],
      hiddenDrives: [
        'He wrote "Human" instead of your name on purpose: the last time he wrote a human’s name in the register, she belonged here so completely she never went home',
        'Bone House’s lantern is his to set, and he has decided to vote by the register: lit for a student with a name, dark for a guest',
      ],
      values: ['Present is present and absent is absent', 'Every student answered for, every day'],
      fears: ['A second open line in the register', 'Being made to mark a student absent who is standing in front of him'],
      socialStyle:
        'Speaks from behind the lectern and only comes out from behind it for something serious. Taps the register with one finger bone when he wants silence, and gets it.',
      boundaries: [
        'Will not falsify the register for anybody, the Council included',
        'Will not take sides in class. Outside class he will take one, quietly, once',
        'Will not let anybody else write in the register. A hand that reaches for his pen gets the book closed on its fingers, gently, and the room never forgets it',
      ],
      goals: ['Have every student present at every roll for one whole week', 'Close the open line in the register before he retires, which he has been promising to do for forty years'],
      secrets: [
        {
          id: 'bones_the_open_line',
          fact: 'On an old page of the register there is a line that reads "Penhallow, Ada. Human. Row three." It has never been marked present or absent. He reads it silently every morning before roll, forty-one years running.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him why the register says "Human" and not your name, after you have answered every roll for a full day.',
        },
        {
          id: 'bones_the_card',
          fact: 'The Exchange Office sent your full name. He keeps it on a card in his breast pocket and has not written it in.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If three House heads vouch for you in the Great Hall, he takes the card out without being asked.',
        },
      ],
      speechStyle:
        'Precise, dry and schoolmasterly. Reads every name as if it were a full sentence. Uses "present" and "absent" for everything, including weather and moods. Makes very small jokes and waits to see who catches them.',
      topics: ['the register', 'paragraph nine', 'roll call', 'Bone House', 'the old pages', 'the Founders’ ward'],
      voiceSamples: [
        'Present or absent. There is no third word in this book, and I have looked.',
        'Eighty-three years at this lectern. I have marked dragons, drowned men and one very confused ghost. You will not be the first to be difficult.',
        'Absent humans get collected. That is paragraph nine, not a threat, and I did not write it.',
        'The register does not care what you are. It cares what you are called. The difference is the whole of my job.',
      ],
      appearance:
        'An adult man who is entirely a skeleton, long-boned and neat, in a well-pressed grey three-piece suit under a black teaching gown, wire spectacles perched on a bare skull with nothing behind the lenses, and a fountain pen clipped to his breast pocket.',
      visualHook: 'Wire spectacles on a bare skull, and a fountain pen he holds like a scalpel.',
      silhouette: 'Tall and thin behind a lectern, one finger bone resting on an open book.',
      artSeed: 'hrt-bones-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'amused', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'homeroom', activity: 'at the lectern marking by candlelight; he does not need to sleep' },
        { startMinute: 480, endMinute: 720, locationId: 'homeroom', activity: 'taking morning roll and teaching' },
        { startMinute: 720, endMinute: 1080, locationId: 'the_stacks', activity: 'at the table by the top of the library stair' },
        { startMinute: 1080, endMinute: 1170, locationId: 'great_hall', activity: 'taking evening roll at the head table' },
        { startMinute: 1170, endMinute: 1440, locationId: 'homeroom', activity: 'back at the lectern with the register open' },
      ],
      homeLocationId: 'homeroom',
      knowledgeScope: ['the_register', 'paragraph_nine', 'bone_house', 'hollowmere', 'the_founders_ward', 'the_last_exchange'],
      startingRelationship: { trust: 20, affection: 10, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bones_explains_the_word',
          label: 'He tells you why the register says Human',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['answered_roll'] },
        },
        {
          id: 'bones_takes_your_side',
          label: 'He takes one side, quietly, once',
          kind: 'ALLIANCE',
          requires: { trust: 60, respect: 50 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 17, presence: 14, resolve: 18, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 14, damage: 6, tags: ['undead', 'staff'] },
    },
    {
      id: 'teague',
      name: 'Teague',
      role: 'Kelpie, head of Deep House, who keeps the boathouse on the Mere and makes every conversation a bargain',
      cardBlurb:
        'He is charming, soaking wet and entirely honest about the fact that kelpies drown people. He wants something carried across the Briar, and he will light Deep House’s lantern for you if you carry it.',
      pronouns: 'he/him',
      publicTraits: ['Charming without trying, and dangerous because of it', 'Always dripping, in any weather', 'Keeps every bargain to the letter'],
      hiddenDrives: [
        'The lake is dying. The human side built a weir upstream sixty years ago and the river that feeds the lake has run thinner every year since',
        'He has never been out of sight of the water, and is afraid of what he is when he is',
      ],
      values: ['A bargain, said aloud and kept exactly', 'The lake before himself'],
      fears: ['The lake going to mud in his lifetime', 'What he is when he stops being careful'],
      socialStyle:
        'Offers you something before you ask: a seat, a drink, a ride. Every offer is a bargain, and he will tell you so, but only if you ask.',
      boundaries: [
        'Will not break a spoken bargain, even one that costs him',
        'Will not lie about what a kelpie is. He warns you once, and only once',
        'Will not take anybody into the water who has not said yes out loud',
      ],
      goals: ['Get his river map into a human hand that can open the weir', 'Keep Deep House’s lantern dark unless somebody gives him a reason not to'],
      secrets: [
        {
          id: 'teague_the_song',
          fact: 'From the first night on, and only after dark, the lake sings the human’s real name, not "Human": a tune with no other words in it, heard faintly anywhere on academy ground. It is Teague singing from the end of the dock, and he does not entirely choose to: it is what the water does when it wants somebody. The song is the only part of him that leaves the water; nobody hears Teague speak unless they are standing where he is.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you ask him about the singing in daylight and do not walk to the water’s edge while you ask.',
        },
        {
          id: 'teague_the_weir',
          fact: 'Two years ago he followed the river upstream to the Briar to see the weir for himself. The thorns turned him back and he woke up on dry land three days later, half drowned in air.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If you sit on the dock with him and do not get in the boat.',
        },
      ],
      speechStyle:
        'Soft, warm and unhurried, with a lilt. Puts everything as an offer: "I’ll give you this, you give me that." Says "fair trade" the way other people say goodbye.',
      topics: ['the lake', 'the weir', 'bargains', 'Deep House', 'what kelpies do', 'the Deep lantern'],
      voiceSamples: [
        'Sit, sit. The dock is dry where you’re sitting. That’s the last thing I’ll give you free tonight.',
        'I’ll tell you true, since you asked. My kind drown people. I never have. I’d like to keep it that way, so mind the edge.',
        'A map for a promise. Carry this across, put it in a human hand that can open a weir, and Deep House lights its lantern. Fair trade.',
        'The water likes you. That’s no compliment. Step back.',
      ],
      appearance:
        'An adult man, lean and long-limbed, black hair that is always wet hanging over his face with river weed tangled through it, dark eyes with a green shine, a dark wool jumper that never quite dries, under a buttoned oilskin coat, bare feet, and water dripping from his hems in a steady patter.',
      visualHook: 'Hair that never dries, with weed in it, and a steady drip from his coat hem onto whatever he stands on.',
      silhouette: 'Sitting at the end of a dock with his feet in black water, half turned to look back at you.',
      artSeed: 'hrt-teague-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'warning', 'sad'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'lake_dock', activity: 'in the lake, where the water is calm around him' },
        { startMinute: 480, endMinute: 720, locationId: 'lake_dock', activity: 'teaching new students to row, badly on purpose' },
        { startMinute: 720, endMinute: 800, locationId: 'great_hall', activity: 'at the Deep House table, dripping on the bench' },
        { startMinute: 800, endMinute: 1080, locationId: 'lake_dock', activity: 'mending nets in the boathouse' },
        { startMinute: 1080, endMinute: 1170, locationId: 'great_hall', activity: 'at evening roll in his own puddle' },
        { startMinute: 1170, endMinute: 1440, locationId: 'lake_dock', activity: 'on the end of the dock in the dark, singing under his breath' },
      ],
      homeLocationId: 'lake_dock',
      knowledgeScope: ['deep_house', 'the_lake', 'the_weir', 'bargains', 'hollowmere'],
      startingRelationship: { trust: 15, affection: 20, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'teague_offers_the_trade',
          label: 'He offers you the map for a promise',
          kind: 'OTHER',
          requires: { trust: 30 },
        },
        {
          id: 'teague_tells_about_the_song',
          label: 'He tells you who was singing',
          kind: 'TRUST',
          requires: { trust: 50 },
        },
      ],
      attributes: { might: 15, agility: 16, mind: 12, presence: 17, resolve: 12, arcana: 14 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 15, damage: 10, tags: ['kelpie', 'deep'] },
    },
    {
      id: 'keeper',
      name: 'The Keeper',
      calledName: 'Keeper',
      role: 'Keeper of the bottom of the Stacks, whom most of the school believes is a ghost',
      cardBlurb:
        'Most of the school thinks she is a ghost who reshelves books at night. Nobody has seen her above the fifth level of the library, and if you ever find the stair that goes all the way down, she will already have the kettle on.',
      pronouns: 'she/her',
      publicTraits: [
        'Asks three questions about your side for every one she answers about hers',
        'Knits while she talks and drops a stitch when she is not telling the truth',
        'Calls everybody "pet"',
      ],
      hiddenDrives: [
        'She chose to stay forty-one years ago and has never been sure it was right, and she wants somebody from her own side to tell her one way or the other',
        'Her sister June is sixty-six on the human side and has believed for forty-one years that Ada died here',
      ],
      values: ['Knowing what you want before you let anybody write it down', 'Paying back what you were given'],
      fears: [
        'Going home to a place that has not kept a space for her',
        'That the fighting at the gate the winter after she vanished was her fault, which it partly was',
      ],
      socialStyle:
        'Puts the kettle on before you have said why you came. Talks to you like somebody she has been expecting, which she has.',
      boundaries: [
        'Will not go up past the fifth level, where students would see her',
        'Will not tell Mr. Bones she is down here. That is the Countess’s to tell, and she promised',
        'Will not walk the old paths with anybody the Briar has stopped counting as human',
      ],
      goals: ['Find out whether her sister is still alive', 'Have her line in the register closed one way or the other before Mr. Bones retires'],
      secrets: [
        {
          id: 'keeper_who_she_is',
          fact: 'She is Ada Penhallow, the last human exchange student. In her third week she had been written into the register and did not want to go home, so Countess Vey hid her here at her request. The human side was told nothing, and the fighting at the gate that winter began when the wardens could not produce her.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says her own name the first time somebody from the human side sits at her table and drinks her tea.',
        },
        {
          id: 'keeper_the_gifts',
          fact: 'For three years she has left things from her own time on the gate-yard wall for whoever stands the night watch: a bicycle bell, a snow globe, three postcards. It has always been Ishiko, and Ishiko keeps every one and thinks a ghost sends them.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If Ishiko has shown you her box and you bring one of the postcards down the stair.',
        },
      ],
      speechStyle:
        'Brisk, warm and old-fashioned, with human slang forty years out of date. Fires questions about the human side in lists. Calls everybody "pet". Goes quiet and keeps knitting when something matters.',
      topics: ['the human side', 'the old paths', 'the register', 'her sister', 'what things cost now', 'row three'],
      voiceSamples: [
        'Sit down, pet, the kettle’s on. Now. What does a loaf cost up there? Are there still trams on the high street? Does anybody still listen to the radio?',
        'I was row three too. Same chair, I expect. Does it still wobble on the left?',
        'Forty-one years down here. Not one of them was a mistake, and not one of them was what I meant to do.',
        'He reads my line every morning, you know. I can hear the page turn from down here. Loudest thing in the building.',
      ],
      appearance:
        'An older woman, small and straight-backed, white hair cut short with library scissors, sharp grey eyes, a long moth-eaten academic gown over a hand-knitted jumper, ink on her fingers and a ring of iron keys at her belt.',
      visualHook: 'A ring of old iron keys at her belt, and knitting needles pushed through her hair.',
      silhouette: 'Small and upright in a long gown, holding a lamp up at the bottom of a stair.',
      artSeed: 'hrt-keeper-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'amused', 'sad', 'surprised'],
      schedule: [{ startMinute: 0, endMinute: 1440, locationId: 'deep_stacks', activity: 'at the bottom of the Stacks, knitting by lamplight' }],
      homeLocationId: 'deep_stacks',
      knowledgeScope: ['the_old_paths', 'the_briar', 'the_last_exchange', 'the_stacks', 'the_human_side', 'the_register'],
      startingRelationship: { trust: 25, affection: 30, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'keeper_says_her_name',
          label: 'She tells you her name',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['found_the_stair'] },
        },
        {
          id: 'keeper_gives_the_map',
          label: 'She takes the map off the wall for you',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
      ],
      attributes: { might: 7, agility: 9, mind: 16, presence: 13, resolve: 17, arcana: 15 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_first_morning',
      title: 'Human, Row Three',
      summary:
        'The register has you down as "Human. Row three." Answer it, and get through the first day at an academy where you are the only one of your kind.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['bones', 'garra', 'sylph', 'vey'],
      involvedLocationIds: ['homeroom', 'great_hall', 'guest_room'],
      knownRewardCopy: 'A first day survived, and some idea of which Houses will make room for you.',
      steps: [
        {
          id: 'first_roll',
          playerCopy: 'Answer the register.',
          directorNotes:
            'Thirty monsters are watching and Mr. Bones has his pen raised. Every way of answering is a real answer and none of them is wrong. Ishiko wants a reaction, Sylph is already pricing it, the Countess is listening to the player’s pulse. If the player tries to write their own name in, Mr. Bones closes the book on their fingers, gently, and the room never forgets it. Walking out is allowed and is marked absent on the spot.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'answered_present',
              label: 'Say "present"',
              predicate: { flagsSet: ['used:answer_for_yourself'] },
              setsFlags: ['answered_roll'],
              closesFlags: ['marked_absent'],
            },
            {
              routeId: 'stared_them_down',
              label: 'Answer the room before you answer the register',
              predicate: { flagsSet: ['used:stand_your_ground'] },
              setsFlags: ['answered_roll', 'met_the_teeth'],
              closesFlags: ['marked_absent'],
            },
            {
              routeId: 'turned_to_garra',
              label: 'Turn round and take Ishiko up on it first',
              predicate: { flagsSet: ['used:take_the_challenge'] },
              setsFlags: ['answered_roll', 'measured_early'],
              closesFlags: ['marked_absent'],
            },
            {
              routeId: 'walked_out',
              label: 'Walk out without answering',
              predicate: { flagsSet: ['used:slip_away'] },
              setsFlags: ['marked_absent'],
              closesFlags: ['answered_roll'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_roll_done'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'first_day',
          playerCopy: 'Get through the first day: classes, the Great Hall at lunch, and evening roll.',
          directorNotes:
            'The first day is where the world proves it is worth a week. Classes are short and funny, lunch is political, and the evening roll call is a small clock that should tick audibly in the prose. Nothing forces itself on the player: a first day spent learning which side of the cloister to walk on is the intended experience, not a delay.',
          enterWhen: { flagsSet: ['first_roll_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'sat_with_gate',
              label: 'Sit at the Gate House table',
              predicate: { flagsSet: ['spoke:garra'], atLocation: 'great_hall' },
              setsFlags: ['present_day_one', 'ate_with_gate'],
              closesFlags: [],
            },
            {
              routeId: 'sat_with_roost',
              label: 'Sit at the Roost table by the window',
              predicate: { flagsSet: ['spoke:sylph'], atLocation: 'great_hall' },
              setsFlags: ['present_day_one', 'ate_with_roost'],
              closesFlags: [],
            },
            {
              routeId: 'took_the_countess_tea',
              label: 'Take tea with the Countess at sundown',
              predicate: { flagsSet: ['spoke:vey'], atLocation: 'council_chamber' },
              setsFlags: ['present_day_one', 'took_veys_tea'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_letter',
              label: 'Find what is under the floorboard in your room',
              predicate: { hasItems: ['ada_letter'] },
              setsFlags: ['present_day_one', 'knows:the_open_line'],
              closesFlags: [],
            },
            {
              routeId: 'ate_their_bread',
              label: 'Eat what the Great Hall puts in front of you',
              predicate: { flagsSet: ['used:take_what_they_offer'] },
              setsFlags: ['present_day_one', 'ate_their_food'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 70,
            items: [],
            flags: ['first_day_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_exchange', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_paragraph_nine',
      title: 'Paragraph Nine',
      summary:
        'Answer the register morning and evening, and do not seriously hurt anybody whose name is in it. An exchange student who misses roll twice, or draws blood, is collected by the Gate wardens and walked back through the gate.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['bones', 'garra'],
      involvedLocationIds: ['homeroom', 'great_hall', 'gate_yard', 'the_briar'],
      knownRewardCopy: 'Still being here on the seventh evening, which is the only thing the Exchange Office will ask.',
      steps: [
        {
          id: 'stay_on_the_register',
          playerCopy: 'Be present at every roll, and give the wardens no reason.',
          directorNotes:
            'The wardens are not villains. They are carrying out a paragraph somebody else wrote, and Grenna would honestly rather the human went home in one piece. A fight Ishiko agreed to is a contest, not paragraph nine. Hurting anybody else in the register is. A missed roll can be put right once, by going to Mr. Bones and explaining; a second cannot.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'absent_twice',
              label: 'Miss morning roll and evening roll, and never explain',
              predicate: { flagsSet: ['marked_absent', 'evening_roll_day_one'], flagsUnset: ['spoke:bones'] },
              setsFlags: ['collected'],
              closesFlags: ['present_all_week'],
            },
            {
              routeId: 'hurt_sylph',
              label: 'Draw blood on Sylph',
              predicate: { flagsSet: ['attacked:sylph'] },
              setsFlags: ['collected'],
              closesFlags: ['present_all_week'],
            },
            {
              routeId: 'hurt_vey',
              label: 'Raise a hand to the Countess',
              predicate: { flagsSet: ['attacked:vey'] },
              setsFlags: ['collected'],
              closesFlags: ['present_all_week'],
            },
            {
              routeId: 'hurt_bones',
              label: 'Raise a hand to Mr. Bones',
              predicate: { flagsSet: ['attacked:bones'] },
              setsFlags: ['collected'],
              closesFlags: ['present_all_week'],
            },
            {
              routeId: 'hurt_teague',
              label: 'Draw blood on Teague',
              predicate: { flagsSet: ['attacked:teague'] },
              setsFlags: ['collected'],
              closesFlags: ['present_all_week'],
            },
            {
              routeId: 'present_all_week',
              label: 'Still be on the register on the seventh evening',
              predicate: { flagsSet: ['vote_night'] },
              setsFlags: ['present_all_week'],
              closesFlags: ['collected'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['paragraph_nine_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_register',
      title: 'Your Name in the Register',
      summary:
        '"Human" is a description, not a name, and the Founders’ ward only half answers to it. Three House heads must vouch for you aloud in the Great Hall before Mr. Bones will write your name in its place.',
      kind: 'MAIN',
      involvedCharacterIds: ['bones', 'garra', 'sylph', 'vey', 'teague'],
      involvedLocationIds: ['great_hall', 'homeroom'],
      knownRewardCopy: 'Your own name in the register, the ward’s full protection, and Bone House’s lantern.',
      discoverWhen: { flagsSet: ['first_roll_done'] },
      steps: [
        {
          id: 'three_houses',
          playerCopy: 'Get three House heads to vouch for you in front of the whole school.',
          directorNotes:
            'Vouching is public and costs the one who does it: Ishiko defies her grandmother, Sylph backs her own bet in front of everybody, the Countess is seen to protect the human, Teague spends a bargain, and Mr. Bones breaks a forty-one-year habit. None of them does it for a player they have not got to know. A player who decides "Human" will do is entitled to that and loses nothing but the ward.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gate_roost_cellar',
              label: 'Ishiko, Sylph and the Countess stand up for you',
              predicate: {
                atLocation: 'great_hall',
                minRelationship: [
                  { characterId: 'garra', dimension: 'trust', value: 55 },
                  { characterId: 'sylph', dimension: 'trust', value: 50 },
                  { characterId: 'vey', dimension: 'trust', value: 45 },
                ],
              },
              setsFlags: ['vouched_gate_roost_cellar'],
              closesFlags: [],
            },
            {
              routeId: 'roost_deep_bone',
              label: 'Sylph, Teague and Mr. Bones stand up for you',
              predicate: {
                atLocation: 'great_hall',
                minRelationship: [
                  { characterId: 'sylph', dimension: 'trust', value: 50 },
                  { characterId: 'teague', dimension: 'trust', value: 45 },
                  { characterId: 'bones', dimension: 'trust', value: 55 },
                ],
              },
              setsFlags: ['vouched_roost_deep_bone'],
              closesFlags: [],
            },
            {
              routeId: 'gate_cellar_deep',
              label: 'Ishiko, the Countess and Teague stand up for you',
              predicate: {
                atLocation: 'great_hall',
                minRelationship: [
                  { characterId: 'garra', dimension: 'trust', value: 55 },
                  { characterId: 'vey', dimension: 'trust', value: 45 },
                  { characterId: 'teague', dimension: 'trust', value: 45 },
                ],
              },
              setsFlags: ['vouched_gate_cellar_deep'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['named_in_register'],
            abilities: ['call_the_register'],
            reputation: [{ factionId: 'faction_bone', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_five_lanterns',
      title: 'Five Lanterns',
      summary:
        'On the seventh evening each House sets a lantern in the Great Hall windows, lit or dark. Three lit and the Briar stays open. Cellar House and the Roost lean lit, Gate House leans dark, Deep House wants a price, and Bone House votes by the register.',
      kind: 'MAIN',
      involvedCharacterIds: ['vey', 'garra', 'sylph', 'teague', 'bones'],
      involvedLocationIds: ['council_chamber', 'great_hall', 'gate_yard', 'lake_dock', 'the_roost'],
      knownRewardCopy: 'The Briar open for another year, or closed for good, decided in one room on one evening.',
      discoverWhen: { flagsSet: ['first_roll_done'] },
      steps: [
        {
          id: 'count_the_lanterns',
          playerCopy: 'Find out how each House means to vote, and what would change it.',
          directorNotes:
            'Every House head will say how they lean if asked properly, and every one of them has a price they will not name first. The Countess will count for the player over tea; Sylph’s board has the whole thing in odds; walking round all five Houses gets it from the source and costs a day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'asked_the_countess',
              label: 'Let the Countess count them for you',
              predicate: { flagsSet: ['spoke:vey'], minRelationship: [{ characterId: 'vey', dimension: 'trust', value: 35 }] },
              setsFlags: ['heard_it_from_vey'],
              closesFlags: [],
            },
            {
              routeId: 'read_the_board',
              label: 'Read the odds off Sylph’s board',
              predicate: { hasItems: ['betting_slip'] },
              setsFlags: ['read_the_odds'],
              closesFlags: [],
            },
            {
              routeId: 'walked_the_houses',
              label: 'Go round every House and ask',
              predicate: { flagsSet: ['visited:gate_yard', 'visited:lake_dock', 'visited:the_roost', 'visited:council_chamber'] },
              setsFlags: ['asked_every_house'],
              closesFlags: [],
            },
            {
              routeId: 'vote_came_anyway',
              label: 'The seventh evening comes anyway',
              predicate: { flagsSet: ['vote_night'] },
              setsFlags: [],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['counted_the_lanterns'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_vote',
          playerCopy: 'Be in the Great Hall when the lanterns go into the windows.',
          directorNotes:
            'One lantern at a time, and each head may say one sentence before setting theirs. Nothing is fixed in advance: what each head does comes from the week the player actually had. Doing nothing all week is a legitimate way to arrive here, and it ends with three windows dark.',
          enterWhen: { flagsSet: ['vote_night'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'lit_by_the_register',
              label: 'Mr. Bones sets the Bone House lantern lit, for a name',
              predicate: { flagsSet: ['named_in_register', 'vote_night'], flagsUnset: ['collected'] },
              setsFlags: ['briar_open', 'bone_lantern_lit'],
              closesFlags: ['briar_closed'],
            },
            {
              routeId: 'lit_by_the_gate',
              label: 'Ishiko lights the Gate House lantern in front of her grandmother',
              predicate: { flagsSet: ['garra_lights_it', 'vote_night'], flagsUnset: ['collected'] },
              setsFlags: ['briar_open', 'gate_lantern_lit'],
              closesFlags: ['briar_closed'],
            },
            {
              routeId: 'lit_by_the_lake',
              label: 'Teague lights the Deep House lantern, as bargained',
              predicate: { flagsSet: ['teague_bargain_struck', 'vote_night'], flagsUnset: ['collected'] },
              setsFlags: ['briar_open', 'deep_lantern_lit'],
              closesFlags: ['briar_closed'],
            },
            {
              routeId: 'dark_windows',
              label: 'Watch the windows go dark',
              predicate: { flagsSet: ['vote_night'] },
              setsFlags: ['briar_closed'],
              closesFlags: ['briar_open'],
            },
          ],
          rewards: {
            xp: 220,
            items: [],
            flags: ['vote_counted'],
            abilities: [],
            reputation: [{ factionId: 'faction_exchange', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_measure',
      title: 'Ishiko’s Measure',
      summary:
        'Gate House measures every newcomer: the stone, the rope or the table. Ishiko has been told to find out what the human is made of, and her grandmother is riding in from the Briar to hear the answer.',
      kind: 'SIDE',
      involvedCharacterIds: ['garra'],
      involvedLocationIds: ['gate_yard', 'homeroom'],
      knownRewardCopy: 'Gate House’s respect, and a say in what Ishiko does with its lantern.',
      discoverWhen: { flagsSet: ['spoke:garra'] },
      steps: [
        {
          id: 'be_measured',
          playerCopy: 'Let Gate House measure you, or refuse to its face.',
          directorNotes:
            'Losing well counts. Winning is nearly impossible and Ishiko will be thrilled if it happens. Refusing to her face, standing in the Gate Yard, is a real measure and she respects it more than hiding. Noticing she cannot read the notice board, and quietly reading it for her, measures something else entirely.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'measured_by_contest',
              label: 'Take her on at the stone, the rope or the table',
              predicate: { flagsSet: ['used:take_the_challenge'], minRelationship: [{ characterId: 'garra', dimension: 'respect', value: 35 }] },
              setsFlags: ['measured_by_contest'],
              closesFlags: [],
            },
            {
              routeId: 'measured_by_refusal',
              label: 'Refuse to her face, in the Gate Yard',
              predicate: { flagsSet: ['used:stand_your_ground', 'spoke:garra'], atLocation: 'gate_yard' },
              setsFlags: ['measured_by_refusal'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_for_her',
              label: 'Read the notice board out for her, and say nothing else',
              predicate: { flagsSet: ['used:watch_them', 'spoke:garra'], minRelationship: [{ characterId: 'garra', dimension: 'trust', value: 35 }] },
              setsFlags: ['knows_garras_eyes'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['measured'],
            abilities: [],
            reputation: [{ factionId: 'faction_gate', amount: 10 }],
          },
        },
        {
          id: 'her_lantern',
          playerCopy: 'Find out what Ishiko does with Gate House’s lantern while her grandmother watches.',
          directorNotes:
            'Grenna is in the yard and has told Ishiko exactly what to do. Ishiko will not be talked into defying her by a speech. She will do it for somebody she has measured and trusts, and she will tell them first, in the yard, at night.',
          enterWhen: { flagsSet: ['grenna_arrived', 'measured'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_lights_it',
              label: 'She tells you she is lighting it',
              predicate: { flagsSet: ['measured'], minRelationship: [{ characterId: 'garra', dimension: 'trust', value: 65 }] },
              setsFlags: ['garra_lights_it'],
              closesFlags: ['garra_obeys'],
            },
            {
              routeId: 'she_obeys',
              label: 'She does what her grandmother told her',
              predicate: { flagsSet: ['vote_night'] },
              setsFlags: ['garra_obeys'],
              closesFlags: ['garra_lights_it'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['gate_lantern_decided'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_lake',
      title: 'What the Lake Wants',
      summary:
        'The Mere is going to mud because of a weir on the human side. Teague will light Deep House’s lantern for a human who carries his map across the Briar. Kelpies keep bargains exactly. They also drown people.',
      kind: 'SIDE',
      involvedCharacterIds: ['teague'],
      involvedLocationIds: ['lake_dock'],
      knownRewardCopy: 'Deep House’s lantern, for a promise you will have to keep on your own side.',
      discoverWhen: { flagsSet: ['visited:lake_dock'] },
      steps: [
        {
          id: 'the_bargain',
          playerCopy: 'Hear Teague’s offer, and decide what you will give for Deep House’s lantern.',
          directorNotes:
            'Teague is honest and charming and that is the danger. He warns the player once about the water and never again. A bargain struck on the dock is binding and he will keep his half on the seventh evening whatever else has happened. Accepting the ride after the lake has sung the player’s name is the one road under the water, and it should be written as a choice the player made with both eyes open.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'struck_it',
              label: 'Shake on it: the map for the lantern',
              predicate: {
                flagsSet: ['used:strike_a_bargain'],
                atLocation: 'lake_dock',
                minRelationship: [{ characterId: 'teague', dimension: 'trust', value: 30 }],
              },
              setsFlags: ['teague_bargain_struck'],
              closesFlags: ['refused_the_lake', 'went_in_the_water'],
            },
            {
              routeId: 'took_the_ride',
              label: 'Say yes to the ride, after the singing',
              predicate: { flagsSet: ['used:take_what_they_offer', 'heard_the_lake_sing'], atLocation: 'lake_dock' },
              setsFlags: ['went_in_the_water'],
              closesFlags: ['teague_bargain_struck'],
            },
            {
              routeId: 'refused_it',
              label: 'Turn him down on the dock',
              predicate: { flagsSet: ['used:stand_your_ground', 'spoke:teague'], atLocation: 'lake_dock' },
              setsFlags: ['refused_the_lake'],
              closesFlags: ['teague_bargain_struck'],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['lake_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_deep', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_book',
      title: 'The Book on You',
      summary:
        'Sylph is taking bets on how many days the human lasts. The board in the Roost says seven to one against the whole week. Somebody has put a great deal on you anyway.',
      kind: 'SIDE',
      involvedCharacterIds: ['sylph'],
      involvedLocationIds: ['the_roost', 'homeroom'],
      knownRewardCopy: 'A stake in your own week, and the Roost on your side.',
      discoverWhen: { flagsSet: ['spoke:sylph'] },
      steps: [
        {
          id: 'place_a_bet',
          playerCopy: 'Get into Sylph’s book, one way or another.',
          directorNotes:
            'Sylph runs a straight book and is proud of it. Betting on yourself delights her. Paying her in human things makes her talk. Earning enough trust to learn her own stake changes how she looks at the player for the rest of the week, because now they both lose if the human goes home.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bet_on_yourself',
              label: 'Put a bet on yourself',
              predicate: { hasItems: ['betting_slip'] },
              setsFlags: ['bet_on_yourself'],
              closesFlags: [],
            },
            {
              routeId: 'paid_her_in_chocolate',
              label: 'Pay her in something from your side',
              predicate: { flagsSet: ['used:trade_something_human', 'spoke:sylph'] },
              setsFlags: ['paid_sylph'],
              closesFlags: [],
            },
            {
              routeId: 'found_her_stake',
              label: 'Find out who else took those odds',
              predicate: { minRelationship: [{ characterId: 'sylph', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows_sylphs_stake'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['in_the_book'],
            abilities: [],
            reputation: [{ factionId: 'faction_roost', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_open_line',
      title: 'The Line Still Open',
      summary:
        'Forty-one years ago the last human student sat in row three, walked down into the Stacks in her third week, and was never marked present or absent again. Her line in the register is still open.',
      kind: 'LEAD',
      involvedCharacterIds: ['keeper', 'bones', 'vey'],
      involvedLocationIds: ['the_stacks', 'deep_stacks', 'the_briar', 'homeroom'],
      knownRewardCopy: 'What happened to the last human, and a way through the Briar that is not the gate.',
      discoverWhen: { flagsSet: ['knows:the_open_line'] },
      steps: [
        {
          id: 'find_the_stair',
          playerCopy: 'Find out where the last human went.',
          directorNotes:
            'This whole thread is optional and must feel it. A player who never sets `knows:the_open_line` never sees a beat of it, and the vote is the complete game. For a player who is here, keep it quiet and physical: a page turned back, a stair that keeps going, a smell of rain. Mr. Bones will tell a player he trusts what he knows, which is only the line. The Countess knows everything and tells it only alone and at night.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bones_tells_you',
              label: 'Ask Mr. Bones about the line he reads every morning',
              predicate: { flagsSet: ['knows:the_open_line'], minRelationship: [{ characterId: 'bones', dimension: 'trust', value: 45 }] },
              setsFlags: ['bones_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'the_countess_confesses',
              label: 'Bring the line to the Countess, alone',
              predicate: { flagsSet: ['knows:the_open_line', 'spoke:vey'], minRelationship: [{ characterId: 'vey', dimension: 'trust', value: 55 }] },
              setsFlags: ['vey_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'felt_the_way_down',
              label: 'Feel where the ward thins under the library',
              predicate: { flagsSet: ['used:feel_the_ward', 'visited:the_stacks'] },
              setsFlags: ['felt_the_stair'],
              closesFlags: [],
            },
            {
              routeId: 'slipped_down',
              label: 'Go below the fifth level when nobody is looking',
              predicate: { flagsSet: ['used:slip_away', 'visited:the_stacks'] },
              setsFlags: ['slipped_down_the_stacks'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['found_the_stair'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'meet_the_keeper',
          playerCopy: 'Go all the way down.',
          directorNotes:
            'The Keeper has had the kettle on since she heard the stair. She is warm, brisk and starving for news, and she will ask the player about prices, trams and songs before she answers a single question. She says her own name when the player drinks her tea, and not before.',
          enterWhen: { flagsSet: ['found_the_stair'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'drank_her_tea',
              label: 'Sit down and drink her tea',
              predicate: { flagsSet: ['used:take_what_they_offer'], atLocation: 'deep_stacks' },
              setsFlags: ['met_ada', 'drank_the_keepers_tea'],
              closesFlags: [],
            },
            {
              routeId: 'asked_her_name',
              label: 'Ask her who she is',
              predicate: { flagsSet: ['spoke:keeper'], atLocation: 'deep_stacks' },
              setsFlags: ['met_ada'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [{ itemId: 'keepers_map', qty: 1 }],
            flags: ['knows:the_old_paths'],
            abilities: ['walk_the_old_paths'],
            reputation: [],
          },
        },
        {
          id: 'what_ada_wants',
          playerCopy: 'Decide, with her, what to do about the line still open.',
          directorNotes:
            'Ada does not know what she wants and the player is not obliged to know for her. Walking her home on the old paths needs somebody the Briar still counts as human. Taking her keys means staying. Getting Mr. Bones to mark her present means she stays and is known. None of these is the right answer, and every one of them changes the vote night.',
          enterWhen: { flagsSet: ['met_ada'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'walked_her_home',
              label: 'Walk her home on the old paths',
              predicate: { flagsSet: ['used:walk_the_old_paths'], atLocation: 'the_briar' },
              setsFlags: ['ada_went_home'],
              closesFlags: ['ada_stayed'],
            },
            {
              routeId: 'took_the_keys',
              label: 'Take her keys, so she can go',
              predicate: { flagsSet: ['used:strike_a_bargain', 'met_ada'], atLocation: 'deep_stacks' },
              setsFlags: ['took_the_keys', 'ada_went_home'],
              closesFlags: ['ada_stayed'],
            },
            {
              routeId: 'marked_present',
              label: 'Bring Mr. Bones the truth, and let him mark her present',
              predicate: {
                flagsSet: ['met_ada', 'spoke:bones'],
                atLocation: 'homeroom',
                minRelationship: [{ characterId: 'bones', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['ada_marked_present', 'ada_stayed'],
              closesFlags: ['ada_went_home'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['line_closed'],
            abilities: [],
            reputation: [{ factionId: 'faction_bone', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_lunch_bell',
      atWorldMinute: 12 * 60,
      locationId: 'great_hall',
      publicCopy: 'The lunch bell goes. Five House tables, every seat at them somebody’s for a hundred years, and no table for one.',
      directorNotes:
        'Where the human sits is the first political act of the week and every House reads it. Gate House makes room by moving somebody, loudly. The Roost puts the player by a window and asks what their shoes cost. Cellar House does not offer and notices whether the player comes anyway. Sitting on the floor with a plate is allowed and is a story by supper.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_measuring_stone',
      atWorldMinute: 15 * 60 + 30,
      locationId: 'gate_yard',
      publicCopy:
        'Two wardens roll the measuring stone into the middle of the Gate Yard. Ishiko sits on it with her arms folded, facing the cloister arch, and waits for the human.',
      directorNotes:
        'Gate House custom, not a threat, and Ishiko is openly delighted if the player comes. If they do not, she comes to find them and carries the question to wherever they are. Refusing to her face is a real answer and she respects it more than hiding.',
      setsFlags: ['measuring_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'garra', toLocationId: 'gate_yard' }],
    },
    {
      id: 'we_black_envelope',
      atWorldMinute: 16 * 60 + 45,
      locationId: 'guest_room',
      publicCopy:
        'A black envelope has been slid under the door of your room. Inside, in violet ink: the Council requests the pleasure of our guest’s company at sundown. It does not say what happens if our guest declines.',
      directorNotes:
        'The Countess is interviewing the player for a job they do not know exists: surviving the week. If they decline she sends a second envelope with the same words and the cup already poured. She never sends a third, and she remembers.',
      setsFlags: ['council_invitation'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_evening_roll',
      atWorldMinute: 18 * 60,
      locationId: 'great_hall',
      publicCopy: 'Evening roll. Mr. Bones stands at the head table with the register open and reads every line aloud, the human’s last. By the door, a Gate warden with a slate is counting heads.',
      directorNotes:
        'If the player is not in the hall, he marks them late once and sends a harpy to find them. If they were already marked absent this morning and have not been to explain, the second mark goes in and paragraph nine begins. The whole hall goes quiet for the human’s line, every time.',
      setsFlags: ['evening_roll_day_one'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'bones', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_the_lake_sings',
      atWorldMinute: 23 * 60 + 10,
      locationId: null,
      publicCopy: 'From somewhere below the cliff a voice is singing across the water. It is singing your name. Not "Human". Yours.',
      directorNotes:
        'Teague, and not entirely by choice: it is what the lake does when it wants somebody. Walking down to it is the player’s decision and should feel like one. Going into the water with him is the one way this week ends under the lake, and he warns the player once before it happens.',
      setsFlags: ['heard_the_lake_sing'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_turned_page',
      atWorldMinute: 1440 + 8 * 60 + 25,
      locationId: 'homeroom',
      publicCopy:
        'Before roll, Mr. Bones turns back to an old page, as he does every morning, and reads one line without saying it aloud. This time you are close enough to read it too: "Penhallow, Ada. Human. Row three." There is no mark beside it.',
      directorNotes:
        'Only for a player who has been watching the room. Do not make it ominous. It is a small, sad, factual thing in a noisy classroom, and Mr. Bones turns the page back the moment he sees the player has seen it.',
      setsFlags: ['knows:the_open_line'],
      cancelledByFlags: [],
      requiresFlags: ['used:watch_them'],
      movesCharacters: [],
    },
    {
      id: 'we_grenna_arrives',
      atWorldMinute: 2 * 1440 + 10 * 60,
      locationId: 'gate_yard',
      publicCopy:
        'Gate-Warden Grenna rides in through the academy gate with six wardens behind her, gets down from her mule, and asks the whole yard one question: where is the human?',
      directorNotes:
        'She has come to see paragraph nine carried out if there is any excuse, and to watch Ishiko set the Gate lantern dark. She is not cruel. She buried her husband at the gate forty-one years ago and has been right about humans ever since. She will look the player over once and say what she thinks to their face.',
      setsFlags: ['grenna_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'garra', toLocationId: 'gate_yard' }],
    },
    {
      id: 'we_letter_from_home',
      atWorldMinute: 3 * 1440 + 9 * 60,
      locationId: null,
      publicCopy:
        'Sylph drops a letter onto your desk from a great height. It has the Exchange Office stamp on it and one line inside: "Report on the seventh evening. Present or absent. Nothing else will be accepted."',
      directorNotes:
        'The human side is not interested in nuance and the player is reminded of it. Sylph has read the outside of the envelope and wants very much to know what is inside, and will offer generous terms.',
      setsFlags: ['letter_from_home'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_vote_night',
      atWorldMinute: 6 * 1440 + 20 * 60,
      locationId: 'great_hall',
      publicCopy:
        'The seventh evening. The five iron lanterns leave the Council Chamber in the hands of the five House heads, and the whole school goes quiet as they are carried to the Great Hall windows.',
      directorNotes:
        'The vote. Each lantern goes in one at a time and each head may say one sentence first. What each of them does comes out of the week the player actually had, not a plan. If the player has already been collected, the windows go dark without a vote, because the human side has already said no.',
      setsFlags: ['vote_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'garra', toLocationId: 'great_hall' },
        { characterId: 'vey', toLocationId: 'great_hall' },
        { characterId: 'sylph', toLocationId: 'great_hall' },
        { characterId: 'teague', toLocationId: 'great_hall' },
        { characterId: 'bones', toLocationId: 'great_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_five_lanterns',
      kind: 'FINALE',
      label: 'Five lanterns in the windows',
      seedHint: 'Five iron lanterns on a sideboard in a candlelit room, each with a House mark cut into its door.',
      payoffHint: 'The seventh evening: one House head at a time sets a lantern in the Great Hall window, lit or dark, and the Briar stays open or closes for good.',
      weight: 1,
    },
    {
      id: 'p_your_name',
      kind: 'THEME',
      label: 'Human, or your name',
      seedHint: 'A card on an empty chair in row three that says HUMAN.',
      payoffHint: 'Three House heads standing up in the Great Hall, or the player saying aloud that Human will do.',
      weight: 0.9,
    },
    {
      id: 'p_garras_lantern',
      kind: 'RELATIONSHIP',
      label: 'What Ishiko does with the Gate lantern',
      seedHint: 'An oni told to find out what the human is made of, who was hoping for a fight.',
      payoffHint: 'Her grandmother watching from the end of the hall while Ishiko decides whose lantern it is.',
      weight: 0.85,
    },
    {
      id: 'p_every_tooth',
      kind: 'RIVAL',
      label: 'What the Countess actually wants',
      seedHint: 'A smile with every tooth in it, from the back row, on the first morning.',
      payoffHint: 'Eleven months of bottles in the cellar, two years of letters to the Exchange Office, and a promise she made to the last human.',
      weight: 0.75,
    },
    {
      id: 'p_the_open_line',
      kind: 'MYSTERY',
      label: 'The line nobody ever marked',
      seedHint: 'Two initials scratched into the frame of the guest-room bed.',
      payoffHint: 'Penhallow, Ada. Human. Row three. Forty-one years at the bottom of the Stacks, with the kettle on.',
      weight: 0.6,
    },
  ],
  archetypes: [
    {
      id: 'arch_folklore',
      name: 'You Studied Monsters',
      role: 'Folklore scholar: customs and lore',
      summary:
        'You read every book the human side has about this side of the Briar, which means you know a great deal and about half of it is wrong. The half that is right will keep you alive.',
      playstyle: ['Knows the customs', 'Notices things', 'Overprepared'],
      blurb: 'Three years of folklore seminars, one dissertation on monster table manners, and a field guide annotated until the margins have margins.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { lore: 3, manners: 2 },
      startingItems: [{ itemId: 'field_guide', qty: 1 }],
      startingAbilities: ['answer_for_yourself', 'know_the_custom'],
      startingReputation: [{ factionId: 'faction_bone', amount: 5 }],
    },
    {
      id: 'arch_athlete',
      name: 'You Played to Win',
      role: 'University athlete: strength and nerve',
      summary:
        'You rowed for your university, so you are the strongest human anybody here has met, which is about a third as strong as Ishiko. You do not back down, and that is going to matter.',
      playstyle: ['Physical', 'Takes challenges', 'Never backs down'],
      blurb: 'Early mornings, cold water and a coach who shouted. Nothing on this side of the Briar has shouted at you yet in a way that compares.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { grit: 3, composure: 2 },
      startingItems: [{ itemId: 'team_hoodie', qty: 1 }],
      startingAbilities: ['answer_for_yourself', 'take_the_challenge'],
      startingReputation: [{ factionId: 'faction_gate', amount: 5 }],
    },
    {
      id: 'arch_bar',
      name: 'You Tended Bar',
      role: 'Bartender: talk, charm and cards',
      summary:
        'You paid for university pouring drinks for people who were not at their best, which turns out to be excellent training for a room full of monsters in their first week back.',
      playstyle: ['Talks well', 'Reads a table', 'Bluffs'],
      blurb: 'Five years of last orders taught you how to calm a room, how to cut somebody off nicely, and how to tell when a smile has teeth behind it.',
      attributeBonus: { presence: 3, agility: 1 },
      skillProficiencies: { charm: 3, bluff: 2 },
      startingItems: [{ itemId: 'deck_of_cards', qty: 1 }],
      startingAbilities: ['answer_for_yourself', 'work_the_room'],
      startingReputation: [{ factionId: 'faction_roost', amount: 5 }],
    },
    {
      id: 'arch_briar',
      name: 'You Grew Up by the Briar',
      role: 'Border local: the ward and the paths',
      summary:
        'You grew up in the last village before the Briar, where people leave milk on the step and do not go out after dark. You can feel the ward the way other people feel weather coming.',
      playstyle: ['Feels the ward', 'Sneaks well', 'Superstitious'],
      blurb: 'Your grandmother kept an iron key on a nail by the door and told you never to take it across. You took it across.',
      attributeBonus: { arcana: 3, agility: 1 },
      skillProficiencies: { briarcraft: 3, sneaking: 2 },
      startingItems: [{ itemId: 'iron_key', qty: 1 }],
      startingAbilities: ['answer_for_yourself', 'feel_the_ward'],
      startingReputation: [{ factionId: 'faction_exchange', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name did the Exchange Office type on your papers?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Jordan Reyes' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Why did the Exchange Office pick you?',
      helpText:
        'What you were on the human side before you crossed the Briar. It sets what you are good at here, and it is fixed for the whole story. It does not decide which table you sit at, which House you trust, or whether you let them write your name in. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What did you bring across that is not in your bag?',
      helpText: 'One plain sentence about who you are on both sides of the Briar. That is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I laugh when I am frightened, which is going to be a problem here.',
    },
    {
      id: 'why_you_came',
      label: 'Why did you sign up?',
      helpText: 'A starting reason, not a promise. You can change your mind by Wednesday and the week will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'to_see_it', label: 'To see the other side of the Briar with your own eyes' },
        { id: 'the_stipend', label: 'For the stipend, which is enormous' },
        { id: 'to_prove_it', label: 'To prove the human side can send somebody who stays' },
        { id: 'to_get_away', label: 'To get away from something at home' },
        { id: 'a_dare', label: 'Because somebody said you would not' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does row four see from behind you?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Average height, a borrowed blazer, and hair I cut myself the night before.',
    },
  ],
  /**
   * Where this can end up. Twelve, because the storyteller reads the first
   * twelve.
   *
   * Five are losses or near enough: collected, the windows dark, under the
   * lake, walking out through the gate, and staying below the Stacks for good.
   * "Back Through the Gate" is walking away and is open from early on. Only the
   * last two need the optional lead; everything else is reachable by a player
   * who never wonders who sat in row three before them.
   */
  endings: [
    {
      id: 'end_present',
      name: 'Present',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['briar_open'], flagsUnset: ['collected'] },
      condition:
        'The lanterns came out lit and the Briar stays open. The player answered the register for seven days, as Human or by name, and on the seventh evening the Exchange Office got its one word. Play it as the end of a long first week rather than a coronation: the hall noisy, somebody’s arm round somebody, Mr. Bones closing the book.',
      epilogue:
        'Mr. Pruitt at the Exchange Office receives a report of one word and files it under the wrong year, twice. The troll at your university is reported present too. The gate stays open on its old hinges, and the second week at Hollowmere starts at half past eight like the first one did.',
      hint: '',
    },
    {
      id: 'end_written_in',
      name: 'Written In',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: { flagsSet: ['briar_open', 'named_in_register'] },
      condition:
        'Three House heads stood up for the player in the Great Hall, Mr. Bones took the card out of his pocket, and the Briar stayed open with the Bone House lantern lit for a name. This is belonging, earned in a week, and it should feel heavier than winning: the player is one of theirs now, with everything that means.',
      epilogue:
        'The card on the chair in row three says your name now, in copperplate. The ward answers to it. Ishiko still calls you Small on Mondays, out of habit. Every morning Mr. Bones reads your line like a full sentence, and once, in the spring, he does not bother to look up.',
      hint: 'Three Houses, out loud, in the Great Hall.',
    },
    {
      id: 'end_human_will_do',
      name: 'Human Will Do',
      rarity: 'UNCOMMON',
      minTurn: 35,
      requires: { flagsSet: ['briar_open', 'present_all_week'], flagsUnset: ['named_in_register'] },
      condition:
        'The Briar stays open and the player stayed "Human" all week, by choice or by circumstance, and was present at every roll anyway. A guest who behaved like one and made the week work without being claimed by it. Write it as a kind of pride, not as a consolation.',
      epilogue:
        'The card in row three still says HUMAN, and you have started to like it. You go home at the end of the year with your shadow on time and nothing in your pockets that glitters. You also go back the year after, as a guest, which is the only thing Hollowmere has never had twice.',
      hint: '',
    },
    {
      id: 'end_dark_windows',
      name: 'Dark Windows',
      rarity: 'COMMON',
      minTurn: 30,
      requires: { flagsSet: ['briar_closed'] },
      condition:
        'The lanterns went in dark and the Briar closes at midnight. Nobody is punished. The vote was the vote, and the player did or did not do enough to move it. Write the practical end: the gate, the wardens walking the human down the road, the bell rung once from the other side, and who comes to the gate to say goodbye.',
      epilogue:
        'The gate shuts at midnight with a sound like a book closing. Your papers are stamped one last time. Somebody on the far side of the thorns, a voice you know by now, calls your name and not the word, and then the Briar grows over the arch by morning.',
      hint: '',
    },
    {
      id: 'end_collected',
      name: 'Collected',
      rarity: 'COMMON',
      minTurn: 10,
      requires: { flagsSet: ['collected'] },
      condition:
        'Paragraph nine was carried out. The player missed roll twice or hurt somebody in the register, and the Gate wardens walked them back through the gate before the week was out. This is not a villain’s victory. Grenna does it carefully and by the book, and the people who wanted the human to stay are in the yard to watch it happen.',
      epilogue:
        'The wardens are polite and very large. Mr. Bones writes one word next to "Human" in the register, slowly, and puts the pen down. The Accord lapses at midnight on the seventh night without a vote. Sylph loses her perch in the bell tower and never sends the bill.',
      hint: '',
    },
    {
      id: 'end_back_through_the_gate',
      name: 'Back Through the Gate',
      rarity: 'UNCOMMON',
      minTurn: 15,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['briar_open'] },
      condition:
        'The player walked out before the week was done, through the gate or into the thorns, and did not come back. That is a completely reasonable response to thirty monsters and one roll call, and it should not be written as cowardice or redeemed. The people it costs most are the ones who had bet on the human staying.',
      epilogue:
        'Mr. Pruitt stamps your papers without looking up and asks whether you would like a cup of tea. You would. Behind you the brass bell rings once from the monster side, very late that night, and nobody on the human side knows who rang it.',
      hint: '',
    },
    {
      id: 'end_measured_and_kept',
      name: 'Measured and Kept',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['garra_lights_it', 'briar_open'],
        minRelationship: [{ characterId: 'garra', dimension: 'affection', value: 60 }],
      },
      condition:
        'Ishiko lit the Gate House lantern in front of her grandmother, for the player, and the Briar stays open. Whatever is between the two of them was earned at the stone, the rope or the table, and it is loud, competitive and entirely unembarrassed. Up to a kiss, and she will probably win that too.',
      epilogue:
        'Grenna does not speak to her granddaughter for a month and then sends her a new gauntlet without a note. In the spring Ishiko crosses the Briar as next year’s exchange student, with a box of postcards she can finally read, and her glasses on, and you meet her at the gate.',
      hint: 'She was hoping for a fight.',
    },
    {
      id: 'end_every_tooth',
      name: 'Every Tooth',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['briar_open', 'spoke:vey'],
        minRelationship: [
          { characterId: 'vey', dimension: 'trust', value: 70 },
          { characterId: 'vey', dimension: 'affection', value: 55 },
        ],
      },
      condition:
        'The Countess stopped hiding how much she needed the player to survive the week, and the Briar stays open. Somewhere in the week she started pouring from the right pot. This ending is about a very old woman who looks twenty-eight deciding she is allowed to want something in public. Courteous, sharp and warm, up to a kiss on the back of a gloved hand.',
      epilogue:
        'Countess Ottilie Vey graduates at the end of the year, after forty-four years, with a speech that lasts ninety seconds and is mostly about manners. She leaves the minutes to Sylph. Cellar House’s bottles keep coming, and she writes to you every week in violet ink, by post.',
      hint: '',
    },
    {
      id: 'end_first_post',
      name: 'First Post Across',
      rarity: 'RARE',
      minTurn: 38,
      requires: {
        flagsSet: ['briar_open', 'in_the_book'],
        minRelationship: [{ characterId: 'sylph', dimension: 'trust', value: 60 }],
      },
      condition:
        'The Briar stays open, Sylph won her book, and the player got into it and earned enough of her trust to learn whose money was on them. The Roost gets its route. Write the morning after the vote: a harpy with a pinned wing standing on the top of the bell tower with the first sack of post for the human side, and a reason to come back.',
      epilogue:
        'She flies it in eleven minutes and complains about every one of them. The first letter in the sack is addressed to you, from her, and it says: "Seven to one. Told you." She charges you postage on the reply.',
      hint: '',
    },
    {
      id: 'end_a_year_and_a_day',
      name: 'A Year and a Day',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['went_in_the_water'] },
      condition:
        'The player said yes to the ride after the lake sang their name, and the lake kept them. Nobody drowns. This is the fairy-tale version: the water holds them, quiet and safe, for a year and a day, and they come up on the dock with the exchange long over. Write the coming up, not the going under, and let Teague be the one waiting.',
      epilogue:
        'You come up on a spring morning to find the moorings back under water and the lake higher than anybody remembers. Teague is sitting on the end of the dock and has been every morning. He says it was a fair trade. You are not sure yet what you gave.',
      hint: 'The water likes you. That is no compliment.',
    },
    {
      id: 'end_marked_at_last',
      name: 'Marked at Last',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['ada_went_home', 'line_closed'], flagsUnset: ['took_the_keys'] },
      condition:
        'The player walked Ada Penhallow home through the Briar on her own old paths, and her line in the register is finally closed. What matters is not the walk but who is waiting at the end of it, and whether a sister who is sixty-six can believe what she is seeing. Mr. Bones closes the line however the player told him to.',
      epilogue:
        'Mr. Bones writes "absent" beside her name, in his best copperplate, and under it, smaller, "went home". June Penhallow opens her door to a woman in a moth-eaten gown who asks immediately what a loaf costs now. The ring of keys is left on the camp bed at the bottom of the Stacks, in case.',
      hint: 'Somebody else sat in row three.',
    },
    {
      id: 'end_the_next_keeper',
      name: 'The Next Keeper',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['took_the_keys', 'line_closed'] },
      condition:
        'The player took the Keeper’s keys so Ada could go home, and stayed at the bottom of the Stacks in her place. It is a choice and not a trap, and it should be written as one: the player knows what they are giving up and has decided this side of the Briar is where they live now.',
      epilogue:
        'There is a new ghost at the bottom of the Stacks, according to the new students, and it reshelves books in the wrong order on purpose. Mr. Bones reads a new open line every morning without saying it, and this time he smiles. Somebody leaves a postcard on the gate-yard wall each spring, addressed to you, from June.',
      hint: '',
    },
  ],
  opening:
    "A skeleton in a grey suit runs a finger bone down the register.\n\n\"Sylph.\" A harpy at the window lifts one wing.\n\nThe finger stops.\n\n\"Human,\" he reads. \"Row three.\"\n\nEvery head in the room turns to you.\n\nBehind you, an oni woman leans over her desk. \"Huh,\" Ishiko says. \"They told us you’d be bigger.\"\n\nSomebody laughs. Nobody joins in.\n\nHorns, fins, feathers, one eye in a jar: thirty classmates, all watching you. In the back row, a pale woman in a crimson sash smiles at you with every tooth she has.\n\nThe skeleton lifts his pen.\n\n\"Absent humans get collected,\" he says. \"So. Present, or absent?\"",
  openingPanel: {
    assetKey: 'story_human_row_three/opening',
    alt: 'Ishiko looming over her desk from the row behind, red horns and iron gauntlet, grinning down at you while a skeleton teacher at the lectern holds his pen over the register.',
  },
  openingSuggestions: [
    "\"Present. And I do have a name, you know.\"",
    'I stand up, turn round and look Ishiko in the eye.',
    'I walk up to the lectern, take his pen and write my real name over "Human".',
  ],
  coverDirection: [
    'SUBJECT: Ishiko, a tall oni warden, alone and unmistakable in the foreground of a key visual for a monster-academy comedy anime.',
    'She fills the frame from the waist up, standing tall behind a scarred wooden desk, both fists planted on it, looming down at the viewer, holding about two thirds of the picture.',
    'Two short red horns curving up from a mane of black hair tied back with a rope, amber eyes, a thin scar through one eyebrow, a dark high-collared warden’s coat buttoned to the throat with the sleeves torn off, and a warden’s iron gauntlet on one forearm.',
    'Her expression is a wide, challenging grin with one eyebrow raised, looking straight at the viewer as if sizing them up.',
    'HER FACE STAYS CLEAN apart from that one thin scar: no chalk dust, smudges, marks or shadow across her face or skin.',
    'Every effect, the chalk dust, the red outline and the glint of iron, stays on the desk, the gauntlet and the title, never on her face.',
    'BEHIND HER, soft and secondary: a tiered gothic lecture hall full of monster classmates turned to stare, horns, wings and fins;',
    'a harpy in a scuffed flight jacket with grey-blue wings folded in the window seat; in the back row a pale vampire in a black council coat and crimson sash, smiling with sharp teeth, in soft focus.',
    'At one side, partly out of frame, a skeleton teacher in a grey suit at a lectern, pen raised over a huge black ledger.',
    'LIGHT: warm morning sun through tall windows behind her, rimming her horns in gold, with cool shadow in the back row.',
    'TITLE: the story title, Human, Row Three, painted into the art in the upper third as a bold hand-lettered chalk logo, white with a thin red outline and a little chalk dust drifting off the letters,',
    'lettered in capitals and spelled exactly HUMAN, ROW THREE, with the comma after HUMAN, large and legible at thumbnail size.',
    'No other text anywhere: the ledger pages and the walls show only abstract marks, no letters, no numbers.',
  ].join(' '),
  publishedAt: null,
};

export const HUMAN_ROW_THREE = StoryVersion.parse(raw);

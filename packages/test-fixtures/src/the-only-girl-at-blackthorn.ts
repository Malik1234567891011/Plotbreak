import { StoryVersion } from '@plotbreak/contracts';

/**
 * "The Only Girl at Blackthorn" — four votes in seven days.
 *
 * The structural bet is the clearest win condition in the catalog: three yes
 * votes out of four, cast out loud in a chapel on the seventh morning. Every
 * ordinary thing the player does in the tower, the yard, the hall or the
 * stables moves one specific man toward yes or no, so ten turns of academy
 * life — a stair run, a bout, a supper, a library at midnight — all count.
 *
 * The obstacle is a custom, and a custom is made of people, so it can be
 * beaten more than one way: with a sword, with a law book, with bread, with a
 * long walk on the sea wall, or by reading the Charter back to the masters and
 * making the vote itself go away. Each of the four has a reason to say no that
 * has nothing to do with the player's worth — a mortgage, a mother, a purse,
 * an absence of evidence — and each reason is authored as a person's problem
 * the writer can motivate rather than a meter the player fills.
 *
 * Losing is a real ending and must never read as a punishment. A lance that
 * does not take you is the custom working exactly as it was designed to, and
 * the world should be willing to deliver it. That is also what the buried
 * thing underneath is about: it has happened before, thirty-one years ago, to
 * the woman who now runs the armory, and the man who runs the yard was one of
 * the four who said no. The player never has to find that out. If she does,
 * the Taking stops being a hazing ritual and becomes a crime with witnesses.
 *
 * Rated 13+. Everybody is an adult, stated in hard canon. The romance is
 * comedy and tension and choice, and goes no further than a kiss. The canvas
 * partition is about dignity and nothing else.
 *
 * The system lives where production's storyteller can read it: the Taking,
 * the Charter and the two abilities that are learned rather than issued are
 * in hard canon, she starts holding Tabard Forty-One (a quest item, so it is
 * sent), and every background starts with Cross Blades plus two of its own,
 * because starting abilities are the only abilities `runTurnPure` sees.
 *
 * Three variables. Stamina is the only GOOD_HIGH, because `resolveRest`
 * refills those and a cadet who has slept is the honest thing for that to
 * mean. Scrutiny comes first among the descending pair because the generic
 * cost path and PUBLIC_VIOLENCE both take the first GOOD_LOW in array order,
 * and a fight at Blackthorn handing the Provost his excuse is exactly right.
 * The masters are first among the factions for the same reason.
 */

const raw = {
  id: 'sv_the_only_girl_at_blackthorn_1',
  storyId: 'story_the_only_girl_at_blackthorn',
  version: 1,
  title: 'The Only Girl at Blackthorn',
  fantasyLabel: 'Ranked first. Nobody voted you in.',
  hook: 'You are the first woman ever to pass the entrance trial at Blackthorn, the kingdom’s knight academy, and you ranked first. In seven days your four roommates vote on keeping you. Last night, none of them said yes.',
  premise:
    'For four hundred years Blackthorn has turned the kingdom’s best sons into knights. It is a fortress academy on a headland above a cold sea, three years long, and it has never admitted a woman.\n\n' +
    'Its entrance trial is judged blind. Every candidate fights, rides and sits the written paper in a closed helm, under a number, and the masters score the number. You wore forty-one. You ranked first.\n\n' +
    'When you took the helm off in the chapel, the Provost tried to void the result. The Crown’s answer came back by rider: the Charter admits any subject who passes, and it does not say man. So you are in.\n\n' +
    'The top five of every intake share one tower room, and by custom a lance takes its own. On the seventh morning each of your four roommates stands up in the chapel and says yes or no out loud. You need three. A cadet nobody takes cannot ride in the tourney and is sent home at the end of term, with thanks.\n\n' +
    'Last night, before you arrived, they held a practice vote. Nobody said yes. This morning somebody had your bed carried down to the stables.\n\n' +
    'You have seven days to earn three votes: from a prince who defends the rules and never you, a rival you beat by four points, a giant who slept through the vote, and a scholar who abstained for lack of evidence. The masters are watching for any excuse to expel you.\n\n' +
    'And somewhere in the old rolls there is a number with no name beside it.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Academy', 'Fantasy', 'Rivalry', 'Comedy'],
  mechanicsChips: [
    'Four votes in seven days',
    'Every roommate can say no',
    'Win by sword or by law',
    'A name cut from the rolls',
    'Losing is a real ending',
  ],
  contentDescriptors: ['ROMANCE', 'FANTASY_VIOLENCE', 'PSYCHOLOGICAL_THEMES'],
  intensity: 'MODERATE',
  creatorNote:
    'You can win this with a sword, a law book, a shared supper or a long walk on the sea wall, and you can lose it without doing anything wrong at all. Four men, four votes, four completely different reasons to say no. None of them is a prize, every one of them can change his mind, and so can you.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_rook',
    startWorldMinute: 18 * 60 + 40,
    startingItems: [{ itemId: 'trial_tabard', qty: 1 }],
    hardCanon: [
      'Everyone in this story is an adult. The player is nineteen. Rowan Ashby is twenty, Prince Aren Valcourt is twenty, Felix Lorne is twenty, Gideon Marsh is twenty-two, Leopold Marr is twenty-three, Margery Dunmore is fifty, Sir Matthias Orme is fifty-four and Lord Provost Anselm Greaves is sixty-one. Offstage, Queen Merewen is fifty-two and Lord Marshal Hargrave is fifty-eight. Everyone else who appears in a scene, porters, stablehands, the Marshal’s steward and Thornhollow’s villagers included, is an adult. By its own Charter, Blackthorn admits nobody under eighteen.',
      'Blackthorn is the Crown’s knight academy in the kingdom of Corveth: a four-hundred-year-old fortress on a headland above a grey sea, three years long, sixty cadets an intake. There is no magic in this world. Steel, horses, law and people. Nobody flies, vanishes, reads minds or walks through walls, the player included: if the player tries something impossible, it does not happen; one plain line says so, and the scene goes on from where the player stands.',
      'The Charter of Blackthorn reads: "Any subject of the Crown, of eighteen years and sound body, who passes the Trial shall be admitted, ranked and housed." It does not say man and it says nothing about a vote.',
      'The entrance Trial is judged blind: closed helms, numbered tabards, scores posted under the number before any name is read. The player wore forty-one and ranked first overall. Rowan ranked second by four points, Aren third, Gideon fourth, Felix fifth.',
      'When the player unhelmed in the chapel, the Provost tried to void the result and the Crown overruled him by rider the same day. Officially she is the first woman Blackthorn has ever admitted.',
      'The player character is a woman; that is the premise. Whatever name and pronouns the player arrives with, the name is hers, and everyone at Blackthorn sees her and speaks of her as a woman: she and her.',
      'The top five of an intake are the First Lance and share the Rook, the top room of the north tower. By custom, not Charter, on the seventh morning each of the other four stands in the chapel and says yes or no to taking her. Three yes votes are needed. A cadet nobody takes is lanceless: sleeps in the common barracks, cannot ride in the Founding Tourney on the tenth day, and is sent home at the end of term with thanks.',
      'Last night, before the player arrived, the four held a practice vote. Nobody said yes. Rowan said no, Aren and Felix abstained, and Gideon was asleep.',
      'At dawn today porters carried the fifth bed out of the Rook to the stable yard on Leopold Marr’s word, after the Provost remarked to him that it was a fire risk. Rowan saw it and held the door for them.',
      'Thirty-one years ago a woman passed the Trial in a helm as Cadet Seventeen, ranked ninth, and her lance did not take her. Anselm Greaves, then Master of the Rolls, cut her name out of the register and kept the page. She was Margery Holt. She is Margery Dunmore, the armorer, and her unmarked sword hangs on the armory wall. Matthias Orme was in her lance and said no. None of them has ever said this aloud.',
      'Gideon’s horse, armour and fees are paid by Lord Marshal Hargrave of the Old Houses, who wants the player gone. The Queen, Aren’s mother, wrote to Aren on the player’s first day: keep her in. Neither Gideon nor Aren has told anybody.',
      'Two things at Blackthorn are learned, never issued, and the player starts with neither. One is the Charter known well enough to quote article and line to a master’s face and make the room decide whether the Taking is law at all: Felix knows it that well and teaches it to somebody who brings him evidence. The other is Seventeen’s Guard, a low old-fashioned guard for a lighter fighter against a heavier one that nobody in the yard has taught in thirty years: only Margery Dunmore still knows it, and she shows it only to somebody she trusts.',
    ],
    toneGuide:
      'Comedy first, tension second, and the romance grows out of both. Four men and one woman in a tower room is funny because of boots, snoring, the window that never shuts and whose turn it is to fetch water. ' +
      'There is no fan service: everybody stays in uniform or riding kit on the page, any scene of washing or changing cuts away at the door, and nobody lingers on anybody’s figure. The canvas partition is about dignity and nobody treats it as a joke for long. Nobody shares a bed, ever; whoever gives one up sleeps on the floor. Romance is flirtatious, tense and earned, and goes no further than a kiss. Every one of the four can say no, change his mind, or be told no. ' +
      'Everyone here is an adult; describe people by build, costume and what they do, never with a word that reads younger. ' +
      'The sword is a language. Bouts are legible: distance, footwork, who is tired, what Orme writes in his ledger. Bruises and a split lip at worst; no gore, nobody maimed. Steel drawn in anger outside the yard is a scandal and the masters treat it as one. ' +
      'Prejudice is the obstacle and it is written as people doing things, never as speeches: a bed moved, a number scraped off a board, a girth cut, tea offered. Allies are not saints and enemies are not stupid; the Provost believes he is protecting something. The player wins by being good at things in front of people and by choosing whom to trust, and nobody rescues her. ' +
      'Short scenes, sharp dialogue, specific objects. The face at the top of a beat is whichever roommate the moment is about.',
    proseStyle: 'webnovel',
    styleExamples: [
      "Rowan doesn’t wait for the count.\n\nHis blade comes in low and fast, the way it did in the Trial, and you know it before it arrives.\n\nYou turn it. The sand hisses.\n\n\"Again,\" Orme says from the rail. He hasn’t looked up from his ledger.\n\nRowan resets. Breathing hard. Not smiling.\n\n\"You’ve seen that one.\"\n\n\"Twice.\"\n\n\"Then watch this one, First.\"\n\nForty cadets lean in.",
      "Gideon looks at the bed. Then at the stairs. Then at you.\n\n\"Four flights,\" he says.\n\n\"I know.\"\n\n\"Narrow at the third.\"\n\n\"I know.\"\n\nHe picks up the foot of it like it’s made of straw, and waits.\n\n\"Other end,\" he says. \"Yours.\"\n\nFrom the landing above, Felix calls down: \"For the record, I’m writing this down.\"",
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 11, agility: 12, mind: 11, presence: 11, resolve: 12, arcana: 6 },
  skills: [
    { id: 'swordwork', name: 'Swordwork', attribute: 'agility', description: 'Footwork, distance, and the cut that arrives before the other person has finished deciding.' },
    { id: 'riding', name: 'Riding', attribute: 'agility', description: 'A horse you have never met, at a gallop, with a lance under your arm and a crowd watching.' },
    { id: 'endurance', name: 'Endurance', attribute: 'might', description: 'The fourth flight of stairs, the hundredth cut, the hour on the sea wall in the wind.' },
    { id: 'tactics', name: 'Tactics', attribute: 'mind', description: 'Where everybody will be in ten seconds, on a tilt field or at a supper table.' },
    { id: 'records', name: 'Records', attribute: 'mind', description: 'Charters, registers, precedents, and what an old page is carefully not saying.' },
    { id: 'bearing', name: 'Bearing', attribute: 'presence', description: 'Holding a room that does not want you in it, without raising your voice.' },
    { id: 'composure', name: 'Composure', attribute: 'resolve', description: 'Not giving them the reaction they came for, however long they wait.' },
    { id: 'instinct', name: 'Instinct', attribute: 'arcana', description: 'Knowing a feint, a lie or a loose girth a moment before you could say why.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is GOOD_HIGH because `resolveRest` restores those, and a cadet who
   * has run the stair, held a guard for an hour and walked the sea wall at
   * night genuinely runs out. It is also what the generic cost path spends,
   * which is right: the price of a bad exchange here is a worse bout tomorrow.
   *
   * Scrutiny and Rumour are descending and both have abilities that feed them,
   * because an inert GOOD_LOW reads as finished and is dead. Scrutiny is the
   * masters looking for a pretext; Rumour is the hall deciding what you are.
   * They are different audiences and the interesting play is noticing which
   * one a given move is spending.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 70,
      regenPerHour: 2.5,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'Her legs are wet rope on the stair and her guard drops a hand’s width after every exchange. Everything she says comes out a beat late and a shade sharper than she meant it, and Orme can see it from the rail.',
      color: '#C9A227',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Legs like wet rope on the stair, a guard that sags after every exchange, and a temper that answers before the head has caught up. This is the band where a bout is lost to somebody worse, and where going to bed is genuinely the strongest move on the board.',
        },
        {
          upTo: 60,
          behaviour:
            'The honest tiredness of a day in the yard. Good for one more drill or one hard conversation, not both. Orme can see it from the rail and will say so, in one word, in front of everybody.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh. Enough in the legs to run the stair and still hold a guard at the bottom of it, and enough patience to answer Rowan with something better than the first thing that comes to mind. Scenes can run long and physical.',
        },
      ],
    },
    {
      id: 'scrutiny',
      name: 'Scrutiny',
      max: 100,
      start: 30,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The masters have stopped looking for anything. A mistake in the yard is a mistake, a late arrival is a late arrival, and the Provost’s clerk has found other things to write down.',
      color: '#5B6C8F',
      bands: [
        {
          upTo: 20,
          behaviour:
            'Nobody is hunting for anything. Instruction is just instruction, a mistake is just a mistake, and the Provost’s clerk has found other people to follow. This band is rare at Blackthorn and it is earned by weeks rather than by a single good day.',
        },
        {
          upTo: 50,
          behaviour:
            'Watched. Every master knows the number forty-one and some of them check the yard ledger for it first. A late arrival is noted, a raised voice is noted, and nothing has been done with any of it yet.',
        },
        {
          upTo: 80,
          behaviour:
            'Looking for a pretext. The Provost’s clerk attends drills he never used to attend. Rules nobody has enforced in years are read out at supper. Seniors are reminded, in her hearing, what conduct unbecoming means and what it costs.',
        },
        {
          upTo: 100,
          behaviour:
            'The excuse is in hand. A hearing is being drafted with her number at the top of it, and the only question left is whether the masters will need to use it. Allies start being careful about where they are seen with her.',
        },
      ],
    },
    {
      id: 'rumour',
      name: 'Rumour',
      max: 100,
      start: 40,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The intake argues about her bouts the way it argues about anybody’s: technically, loudly, over supper. Nobody mentions the chapel any more.',
      color: '#8E5B6E',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The intake has decided what it thinks, and what it thinks is that she is good. Her bouts get argued over the way anybody’s do, technically and loudly over supper. Cadets ask to partner her in drill.',
        },
        {
          upTo: 50,
          behaviour:
            'She is the main subject at every table and the stories are mixed. Half the hall saw the stair run and half heard about it from somebody who was not there. Cadets will still partner her in drill if Orme tells them to.',
        },
        {
          upTo: 80,
          behaviour:
            'The worst version of every story is the one going round: the Queen fixed the Trial, the helm had a trick visor, she cried on the stair. Cadets drift away from her end of the table. Thornhollow hears it by evening.',
        },
        {
          upTo: 100,
          behaviour:
            'The intake has stopped looking at her and started looking past her. Nobody partners her unless ordered, every joke at supper has her in it, and a cadet who sits with her is asked about it afterwards by people with silver cords.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'trial_tabard',
      name: 'Tabard Forty-One',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description: 'A white Trial tabard with a black 41 stitched on the front and the back, sweat-stained at the collar. By custom the First Seat keeps hers. Nobody has told you whether the custom applies.',
      loreText: 'Forty-one was the last number issued this year. The clerk who handed it to you in the queue said "last one, lad" and has since asked to be moved to the kitchens.',
      icon: 'cloth',
    },
    {
      id: 'fifth_bed',
      name: 'The Fifth Bed',
      tags: ['quest', 'home'],
      questItem: true,
      description: 'A narrow oak bed with a straw mattress and a brass plate on the foot that reads FIRST LANCE. Carried out of the Rook at dawn and left in the stable yard beside the muck heap.',
      loreText: 'Four hundred years of First Seats have slept in it. The mattress is newer. The brass plate has been polished so often the letters are soft at the edges.',
      icon: 'bed',
    },
    {
      id: 'thorn_pin',
      name: 'The Thorn Pin',
      tags: ['quest', 'insignia'],
      questItem: true,
      description: 'A black iron thorn worn at the collar by the First Seat of each intake. It should have been pinned on you in the chapel. The Provost said it had been mislaid.',
      loreText: 'Rowan’s mother had the collar of his grey coat altered to take it, three weeks before the Trial.',
      icon: 'badge',
    },
    {
      id: 'the_charter',
      name: 'Felix’s Charter',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { records: 2 },
      description: 'A copy of the Charter of Blackthorn in Felix’s small hand, every line numbered and every margin annotated. Article nine, line four is underlined three times: "any subject of the Crown".',
      loreText: 'The Charter is eleven articles long. The Taking is not in any of them. Felix has written "!!" beside that observation, and then, smaller, "check".',
      icon: 'scroll',
    },
    {
      id: 'the_register',
      name: 'The Register',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Four hundred years of cadets, one line each, number and name, in nine bound volumes. The volume from thirty-one years ago has a newer spine than the ones either side of it.',
      loreText: 'In that volume, line seventeen of that year’s intake has no name. It says only: "Seventeen, sent home with thanks." The hand is neat and the ink is a different black.',
      icon: 'book',
    },
    {
      id: 'cut_page',
      name: 'The Cut Page',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'A page cut out of the register thirty-one years ago with a very sharp knife. Line seventeen carries a name in the old hand: Margery Holt. Ranked ninth.',
      loreText: 'Somebody has kept it flat, dry and locked away for thirty-one years, which is not what you do with a page you meant to destroy.',
      icon: 'papers',
    },
    {
      id: 'seventeens_sword',
      name: 'The Unmarked Sword',
      tags: ['quest', 'weapon'],
      questItem: true,
      description: 'A cadet’s practice sword, well kept, with nothing stamped on the tang where every other blade at Blackthorn carries a name. It hangs on the armory’s back wall above the grinding wheel.',
      loreText: 'It is sharpened every spring, though nobody has carried it in thirty-one years.',
      icon: 'sword',
    },
    {
      id: 'burned_letter',
      name: 'The Burned Letter',
      tags: ['quest', 'document'],
      questItem: true,
      description: 'Black flakes and one curled corner in the Rook’s hearth, with half a royal seal still on it and four words you can read: "keep her in. M."',
      loreText: 'Aren read it twice before he burned it. He did not stir the ashes afterwards, and Aren is never careless.',
      icon: 'letter',
    },
    {
      id: 'old_knights_blade',
      name: 'The Old Knight’s Blade',
      tags: ['weapon', 'personal'],
      skillModifiers: { swordwork: 1 },
      description: 'A plain arming sword with a notched edge and a grip rewrapped so many times it is mostly cord. He gave it to you the morning the Trial notice was read out.',
      loreText: 'He never asked why you wanted to learn. He only ever said "again".',
      icon: 'sword',
    },
    {
      id: 'plaited_bridle',
      name: 'Plaited Bridle',
      tags: ['tack', 'personal'],
      skillModifiers: { riding: 1 },
      description: 'A bridle you plaited yourself from three colours of leather at the border fairs, softer than anything in the Blackthorn tack room.',
      loreText: 'Every horse trader on the border can read the plait. It says who taught you and which fairs you worked.',
      icon: 'tack',
    },
    {
      id: 'caravan_knife',
      name: 'Caravan Knife',
      tags: ['tool', 'personal'],
      skillModifiers: { composure: 1 },
      description: 'A heavy short knife with a horn handle, for cutting rope, bread and arguments short. Three years on the coast road and it has never needed sharpening at the wrong moment.',
      loreText: 'The masters will tell you a knight does not carry one. Every master at Blackthorn carries one.',
      icon: 'knife',
    },
    {
      id: 'campaign_book',
      name: 'A Battered Campaign History',
      tags: ['document', 'personal'],
      skillModifiers: { tactics: 1 },
      description: 'An old history of the border wars with every battle map redrawn in your margins, twice, with arrows where the generals should have gone.',
      loreText: 'The library copy. You did mean to return it.',
      icon: 'book',
    },
  ],
  abilities: [
    {
      id: 'say_it_to_their_face',
      name: 'Say It To Their Face',
      tags: ['social'],
      description: 'Answer the slight, the joke or the rule, out loud, to the person who said it, in front of whoever is watching.',
      affordances: ['tell him', 'answer back', 'say it', 'call him out', 'tell them straight', 'speak up', 'stand up to him', 'argue'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'rumour', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bearing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_your_tongue',
      name: 'Hold Your Tongue',
      tags: ['social'],
      description: 'Let it go past you. Say nothing, give them nothing, and remember exactly who said what.',
      affordances: ['say nothing', 'ignore it', 'let it go', 'walk past', 'keep quiet', 'wait', 'bite my tongue'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cross_blades',
      name: 'Cross Blades',
      tags: ['combat'],
      description: 'Take the bout. In the yard it is drill; anywhere else it is a scandal, and everybody knows the difference.',
      affordances: ['spar', 'challenge him', 'fight him', 'cross swords', 'take the bout', 'duel', 'draw my sword', 'parry'],
      costs: [
        { resourceId: 'stamina', amount: 12 },
        { resourceId: 'scrutiny', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'swordwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'outwork_them',
      name: 'Outwork Them',
      tags: ['utility'],
      description: 'Do the hard physical thing, all of it, faster than anybody expected and without asking for help.',
      affordances: ['carry it', 'carry my bed', 'run the stairs', 'do it again', 'keep going', 'muck out', 'drag it up', 'race them'],
      costs: [
        { resourceId: 'stamina', amount: 14 },
        { resourceId: 'rumour', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'might', skillId: 'endurance', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'take_the_saddle',
      name: 'Take the Saddle',
      tags: ['movement'],
      description: 'Get on the horse in front of you and ride it properly, whatever it thinks about the matter.',
      affordances: ['ride', 'mount up', 'take the horse', 'gallop', 'jump the fence', 'ride the lists', 'couch the lance'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'riding', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_yard',
      name: 'Read the Yard',
      tags: ['sight'],
      description: 'Watch a room or a yard long enough to see who is leading it, who is afraid, and who moved your bed.',
      affordances: ['look around', 'watch them', 'read him', 'size them up', 'notice', 'study the room', 'look closer', 'search'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'tactics', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'break_bread',
      name: 'Break Bread',
      tags: ['social'],
      description: 'Sit down with somebody, share whatever there is, and talk about anything except the vote.',
      affordances: ['sit with him', 'share', 'eat with them', 'offer him some', 'make peace', 'buy a round', 'talk to him', 'join them'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'bearing', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_rolls',
      name: 'Read the Rolls',
      tags: ['sight'],
      description: 'Go through the register, the Charter or an old ledger line by line until it tells you what it was written to hide.',
      affordances: ['read the register', 'look it up', 'search the records', 'check the charter', 'go through the rolls', 'read the old volume'],
      costs: [{ resourceId: 'stamina', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'records', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'invoke_the_charter',
      name: 'Invoke the Charter',
      tags: ['social'],
      description: 'Quote the Charter, article and line, to a master’s face, and make the room decide whether it still means what it says.',
      affordances: ['quote the charter', 'cite article nine', 'invoke the charter', 'read it back to them', 'challenge the taking'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'scrutiny', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'composure', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_charter_by_heart'],
        lockedCopy: 'You know the Charter lets you be here. You do not yet know it well enough to throw it at a master and have it land.',
      },
    },
    {
      id: 'seventeens_guard',
      name: 'Seventeen’s Guard',
      tags: ['defensive'],
      description: 'A low, old-fashioned guard for a lighter fighter against a heavier one, which nobody at Blackthorn has taught in thirty years.',
      affordances: ['low guard', 'drop low', 'take the old guard', 'let him come', 'turn his weight', 'seventeen’s guard'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'swordwork', baseDc: 14 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:seventeens_guard'],
        lockedCopy: 'There is a guard for somebody your size against somebody his size. Nobody in the yard teaches it. Somebody inside these walls still knows it.',
      },
    },
  ],
  locations: [
    {
      id: 'the_rook',
      name: 'The Rook',
      shortName: 'The Rook',
      description:
        'The top room of the north tower, four flights up, built for five. Five narrow windows onto the sea, a hearth that smokes when the wind is east, five pegs, five chests, and four beds. A canvas partition hangs across the far corner for your privacy. Behind it is a clean square of floor where the fifth bed stood until dawn.',
      artDirection:
        'Round stone tower room at dusk, five narrow arched windows over a grey sea, four plain wooden beds with grey blankets, a canvas partition hung across one corner with an empty space behind it, a smoking hearth, stacked books on one bed, a sword propped in a window seat. Cool blue light, warm firelight, lived-in and spare.',
      connections: [{ to: 'north_stair', travelMinutes: 2, label: 'Down the stair' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'burned_letter', qty: 1, ownerId: 'aren', aka: ['ash', 'the ashes', 'the hearth', 'the letter', 'burned paper', 'the scraps', 'the seal'] },
      ],
    },
    {
      id: 'north_stair',
      name: 'The North Stair',
      shortName: 'The Stair',
      description:
        'Ninety-six stone steps, worn into dips, narrow at the third landing, with a lance door on every floor. At the dawn bell every first-year runs it top to bottom, and the last one into the yard scrubs the long hall after supper.',
      artDirection:
        'Steep spiral stone staircase inside a fortress tower, worn steps, iron torch brackets, a heavy wooden door on a landing, cadets in grey crowding down it at speed. Dim, cramped, full of motion.',
      connections: [
        { to: 'the_rook', travelMinutes: 2, label: 'Up to the Rook' },
        { to: 'the_yard', travelMinutes: 2, label: 'Out into the yard' },
        { to: 'the_hall', travelMinutes: 2, label: 'Through to the long hall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
    },
    {
      id: 'the_yard',
      name: 'Orme’s Yard',
      shortName: 'The Yard',
      description:
        'A square of raked sand inside the inner wall, with wooden posts for cutting practice along one side and the ranking board painted on the chapel wall along the other. Your number is at the top of it in white. Somebody has already tried to scrape it off, and somebody else has painted it back.',
      artDirection:
        'Fortress training yard of raked sand, wooden cutting posts, a whitewashed chapel wall with a painted ranking board, the number 41 at the top partly scraped, cadets in grey drilling in pairs, a master at the rail with a ledger. Bright overcast light, salt wind.',
      connections: [
        { to: 'north_stair', travelMinutes: 2, label: 'Back into the tower' },
        { to: 'the_hall', travelMinutes: 2, label: 'The long hall' },
        { to: 'the_armory', travelMinutes: 1, label: 'The armory door' },
        { to: 'the_chapel', travelMinutes: 1, label: 'The chapel' },
        { to: 'the_stables', travelMinutes: 3, label: 'Round to the stables' },
        { to: 'provost_house', travelMinutes: 3, label: 'The Provost’s lodging' },
        { to: 'the_cliff_walk', travelMinutes: 5, label: 'Up onto the sea wall' },
        { to: 'thorn_gate', travelMinutes: 4, label: 'Down to the gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'the_hall',
      name: 'The Long Hall',
      shortName: 'The Hall',
      description:
        'Sixty first-years at four long tables ranked by the Trial, seniors above them, masters at the high table under the old banners. The chair at the head of the first-year table belongs to the First Seat. It has been left empty. Nobody has taken it and nobody has offered it to you.',
      artDirection:
        'Long vaulted stone dining hall, four long tables of cadets in grey, a high table of masters in black under faded banners, one empty carved chair at the head of the nearest table. Candlelight, noise, every head turned the same way.',
      connections: [
        { to: 'north_stair', travelMinutes: 2, label: 'Up the north stair' },
        { to: 'the_yard', travelMinutes: 2, label: 'Out to the yard' },
        { to: 'the_library', travelMinutes: 2, label: 'Down to the Rolls Room' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
    },
    {
      id: 'the_library',
      name: 'The Rolls Room',
      shortName: 'Rolls Room',
      description:
        'A long cold room under the chapel that keeps the register: four hundred years of cadets, one line each, number and name, in nine handwritings. Felix has a table here he considers his. One volume, thirty-one years back, has been rebound.',
      artDirection:
        'Low vaulted archive under a chapel, shelves of heavy leather registers, a single long table buried in books and papers, one lamp, a cold draught moving the pages. Quiet, dusty, secretive.',
      connections: [
        { to: 'the_hall', travelMinutes: 2, label: 'Up to the hall' },
        { to: 'the_chapel', travelMinutes: 1, label: 'The narrow stair to the chapel' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'the_charter', qty: 1, ownerId: 'felix', aka: ['charter', 'the copy', 'his charter', 'felix’s notes', 'the annotated copy'] },
        { itemId: 'the_register', qty: 1, ownerId: null, aka: ['register', 'the rolls', 'the old volume', 'the rebound book', 'the ledger'] },
      ],
    },
    {
      id: 'the_chapel',
      name: 'The Chapel of the Oath',
      shortName: 'The Chapel',
      description:
        'Bare stone, one tall window, rows of oak pews, and the Charter cut into the floor in front of the altar so that every cadet who swears the oath kneels on it. The Taking happens here, on the seventh morning, with the whole intake in the pews.',
      artDirection:
        'Austere stone chapel, a single tall window throwing a shaft of light, oak pews, an inscription carved into the floor before a plain altar, cadets in grey filling the pews. Solemn, cold, echoing.',
      connections: [
        { to: 'the_yard', travelMinutes: 1, label: 'Out to the yard' },
        { to: 'the_library', travelMinutes: 1, label: 'Down to the Rolls Room' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
    },
    {
      id: 'the_armory',
      name: 'The Armory',
      shortName: 'Armory',
      description:
        'Racks of practice steel, padded jackets on pegs by size, a forge that is never quite out, and Margery Dunmore, who has fitted every cadet at Blackthorn for twenty years. On the back wall, above the grinding wheel, hangs one cadet’s sword with no name stamped on the tang.',
      artDirection:
        'Fortress armory and forge, racks of swords and shields, padded jackets on pegs, a glowing forge, a grinding wheel throwing sparks, a single plain sword hung alone on the back wall. Warm orange light against stone.',
      connections: [{ to: 'the_yard', travelMinutes: 1, label: 'Back out to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'seventeens_sword', qty: 1, ownerId: 'dunmore', aka: ['the sword', 'the unmarked sword', 'the sword on the wall', 'the old sword', 'her sword'] },
      ],
    },
    {
      id: 'the_stables',
      name: 'The Stables',
      shortName: 'Stables',
      description:
        'Forty stalls, a hayloft, a tack room that is supposed to be locked, and the warm smell of horses and leather. Out in the stable yard, beside the muck heap, stands a narrow oak bed with a straw mattress. It is yours.',
      artDirection:
        'Stone stable block at evening, a row of horses in stalls, a hayloft ladder, saddles on racks, and in the cobbled yard outside a single narrow oak bed standing beside a muck heap. Warm lamplight, absurd and sad.',
      connections: [
        { to: 'the_yard', travelMinutes: 3, label: 'Back to the yard' },
        { to: 'the_tilt', travelMinutes: 3, label: 'Out to the tilt field' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'fifth_bed', qty: 1, ownerId: null, aka: ['bed', 'my bed', 'the cot', 'the mattress', 'the fifth bed'] },
      ],
    },
    {
      id: 'the_tilt',
      name: 'The Tilt Field',
      shortName: 'Tilt Field',
      description:
        'Outside the inner wall, a long strip of turf with a wooden barrier down the middle, viewing stands on one side and the sea on the other. On the tenth day the first-year lances ride here in front of the masters, the village and whoever the Crown sends.',
      artDirection:
        'Long jousting field on a clifftop, a wooden tilt barrier, striped viewing stands with banners, the grey sea beyond, riders in grey practising at the far end. Wide, windy, bright.',
      connections: [
        { to: 'the_stables', travelMinutes: 3, label: 'Back to the stables' },
        { to: 'the_cliff_walk', travelMinutes: 4, label: 'Along to the sea wall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 3 },
    },
    {
      id: 'the_cliff_walk',
      name: 'The Cliff Walk',
      shortName: 'Sea Wall',
      description:
        'A path along the top of the sea wall, with the wind loud enough that two people have to stand close to hear each other. The cadet watch walks it at night. Nobody else does, which is why people come up here to say true things.',
      artDirection:
        'Narrow walkway along the top of a fortress sea wall at night, waves breaking far below, an old round watchtower at the end, two figures standing close against the wind. Moonlight, spray, intimate.',
      connections: [
        { to: 'the_yard', travelMinutes: 5, label: 'Down to the yard' },
        { to: 'the_tilt', travelMinutes: 4, label: 'Down to the tilt field' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
    },
    {
      id: 'provost_house',
      name: 'The Provost’s Lodging',
      shortName: 'Provost’s',
      description:
        'A tall house in the inner court with polished floors, a fire that is always lit, and tea served in thin cups. Lord Provost Greaves receives cadets in his study, where a locked cabinet holds the academy’s private papers.',
      artDirection:
        'Elegant wood-panelled study, a lit fireplace, a high-backed chair, a tea service on a side table, a tall locked glass-fronted cabinet full of papers, rain on a leaded window. Warm, polished, quietly threatening.',
      connections: [{ to: 'the_yard', travelMinutes: 3, label: 'Back out to the yard' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 3 },
      takeableItems: [
        { itemId: 'cut_page', qty: 1, ownerId: 'greaves', aka: ['the page', 'the cut page', 'the old page', 'papers in the cabinet', 'the cabinet'] },
        { itemId: 'thorn_pin', qty: 1, ownerId: 'greaves', aka: ['the pin', 'thorn pin', 'the brooch', 'my pin'] },
      ],
    },
    {
      id: 'thorn_gate',
      name: 'The Thorn Gate',
      shortName: 'The Gate',
      description:
        'The only way in or out: an iron gate under a gatehouse with the academy’s black thorn carved above it. The road beyond winds down to the village. A cadet who walks out of it without leave is not let back in.',
      artDirection:
        'Massive iron portcullis gate under a stone gatehouse with a carved black thorn emblem, a winding road down a headland to a harbour village. Grey sky, gulls, a sense of threshold.',
      connections: [
        { to: 'the_yard', travelMinutes: 4, label: 'Back up into the academy' },
        { to: 'thornhollow', travelMinutes: 15, label: 'Down the road to the village' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 4 },
    },
    {
      id: 'thornhollow',
      name: 'Thornhollow',
      shortName: 'The Village',
      description:
        'The village under the headland: a harbour, a smithy, forty houses and The Broken Lance, the inn where seniors drink on rest days. Thornhollow has fed, shod and patched Blackthorn for four centuries, and its women have opinions about you that nobody has asked for.',
      artDirection:
        'Small stone harbour village at the foot of a cliff with a fortress above, fishing boats, a smithy with an open door, a busy inn with a painted sign of a broken lance. Warm windows, salt air, crowded and friendly.',
      connections: [{ to: 'thorn_gate', travelMinutes: 15, label: 'Back up the road' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 5 },
    },
  ],
  factions: [
    {
      id: 'faction_masters',
      name: 'The Masters of Blackthorn',
      description: 'The Provost and the eleven masters who run the academy. Seven of them voted to void your result in the chapel and were overruled by the Crown. They will obey the Charter to the letter and not one inch past it.',
      startingReputation: 0,
      ranks: [
        { atReputation: -40, label: 'A problem' },
        { atReputation: 0, label: 'Admitted' },
        { atReputation: 25, label: 'A cadet' },
        { atReputation: 50, label: 'One of ours' },
      ],
      allies: ['faction_old_houses'],
      enemies: [],
    },
    {
      id: 'faction_intake',
      name: 'The Intake',
      description: 'Sixty first-year cadets ranked by the Trial, who will spend three years together and have not yet decided what you are. Most of them are waiting to see which way the Rook votes before they decide it for themselves.',
      startingReputation: -5,
      ranks: [
        { atReputation: -40, label: 'The woman' },
        { atReputation: 0, label: 'Forty-One' },
        { atReputation: 25, label: 'One of the intake' },
        { atReputation: 50, label: 'First Seat' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_old_houses',
      name: 'The Old Houses',
      description: 'The noble families who have sent sons to Blackthorn for twelve generations, led by Lord Marshal Hargrave. They pay the horse and kit of half the commoners in the intake, and they regard you as a precedent to be stopped before it is copied.',
      startingReputation: -30,
      ranks: [
        { atReputation: -60, label: 'An outrage' },
        { atReputation: -30, label: 'A precedent' },
        { atReputation: 0, label: 'An exception' },
        { atReputation: 25, label: 'Tolerated' },
      ],
      allies: ['faction_masters'],
      enemies: ['faction_crown'],
    },
    {
      id: 'faction_crown',
      name: 'The Crown',
      description: 'Queen Merewen’s court. The Queen upheld the Charter when it would have been easier not to, and she has her own reasons for wanting a woman in a knight’s coat. Her favour is real and it is not free.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Noticed' },
        { atReputation: 25, label: 'Useful' },
        { atReputation: 50, label: 'The Queen’s cadet' },
      ],
      allies: [],
      enemies: ['faction_old_houses'],
    },
    {
      id: 'faction_thornhollow',
      name: 'Thornhollow',
      description: 'The village under the headland, which has fed and shod Blackthorn for four centuries and has never once been asked to sit in its stands. Its women heard about the helm in the chapel before the masters had finished arguing.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'A stranger' },
        { atReputation: 25, label: 'Talked about' },
        { atReputation: 50, label: 'Ours' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'rowan',
      name: 'Rowan Ashby',
      role: 'Ranked second in the Trial by four points, and the fastest blade in the intake',
      cardBlurb:
        'He has not decided whether he wants you gone or wants a rematch more. He ranked second to you by four points, and his family’s last hope was that he would rank first.',
      pronouns: 'he/him',
      publicTraits: ['Fastest blade in the intake', 'Says the cutting thing first and never takes it back', 'Trains alone before the dawn bell'],
      hiddenDrives: [
        'He respects you more than anybody in the tower and would sooner lose a hand than say so',
        'He needs First Seat for a reason that has nothing to do with pride: his family’s last manor is mortgaged against the tourney stipend',
      ],
      values: ['Winning clean', 'Owing nobody anything'],
      fears: ['Going home second to a house that sold its furniture to send him', 'Being pitied, by you most of all'],
      socialStyle:
        'Attacks first, in words or with a blade, and watches what you do with it. Never sits beside you; always sits where he can see you.',
      boundaries: [
        'Will not accept a thrown bout. Let him win on purpose and he will never forgive it',
        'Will not talk about his family anywhere with walls',
        'Will not argue over his bed or share it: if she takes it, he sleeps on the floor by the window without a word and lies awake furious and impressed',
        'Will not admit he held the door for the porters until after a fair bout with her, and then only on the sea wall',
      ],
      goals: ['Beat you in front of the whole intake', 'Win the Founding Tourney and the stipend that goes with it'],
      secrets: [
        {
          id: 'rowan_held_the_door',
          fact: 'He saw the porters carry the fifth bed down at dawn on Leopold Marr’s word. They asked him to hold the door and he did, and he has been ashamed of it all day.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it on the cliff walk after a bout, if you beat him or lost to him honestly and told nobody what he said up there before.',
        },
        {
          id: 'rowan_the_mortgage',
          fact: 'House Ashby’s last manor is mortgaged against the stipend paid to the lance that wins the Founding Tourney. His mother wrote to him the night of the Trial: if the woman keeps First Seat, we are finished.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only on the sea wall at night, and only if he trusts you. Anywhere else he denies it flatly.',
        },
      ],
      speechStyle:
        'Clipped. Short sentences, fencing vocabulary used as insult, questions he already knows the answer to. Calls you First, as a jab, and only much later as a name. Never says please and never says sorry; does both with his hands instead.',
      topics: ['the rematch', 'swordwork', 'House Ashby', 'the Founding Tourney', 'the fifth bed', 'First Seat'],
      voiceSamples: [
        'Wrong room. Wrong academy. Wrong century, probably.',
        'Your guard drops left after every parry. Fixing it would take you a week. Exploiting it takes me one afternoon.',
        'Four points, First. Four. My grandfather’s orchard got sold over less.',
        'Don’t thank me. I held a door. Doors don’t count.',
      ],
      appearance:
        'An adult man, lean and quick, black hair cut short and badly, a narrow sharp face, dark eyes that never stop measuring distance, the high-collared grey wool cadet coat open at the throat and creased as if he slept in it, which he did, and black riding boots.',
      visualHook: 'A plain steel sword always across his knees or his shoulders, never in its rack.',
      silhouette: 'Sitting sideways in a window seat, one boot up, blade across his knees.',
      artSeed: 'otgab-rowan-01',
      portrait: null,
      expressions: ['neutral', 'sardonic', 'competitive', 'angry', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'the_rook', activity: 'asleep with his sword within reach' },
        { startMinute: 330, endMinute: 420, locationId: 'the_yard', activity: 'cutting at the posts alone before the bell' },
        { startMinute: 420, endMinute: 720, locationId: 'the_yard', activity: 'morning drill under Orme' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'eating fast, one seat down from the empty chair' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_tilt', activity: 'riding the lists until his horse is tired' },
        { startMinute: 1020, endMinute: 1080, locationId: 'the_hall', activity: 'supper, back to the wall' },
        { startMinute: 1080, endMinute: 1260, locationId: 'the_rook', activity: 'in the window seat, oiling his blade' },
        { startMinute: 1260, endMinute: 1320, locationId: 'the_cliff_walk', activity: 'walking the sea wall before lights-out, where nobody can hear him' },
        { startMinute: 1320, endMinute: 1440, locationId: 'the_rook', activity: 'back in the window seat, blade across his knees' },
      ],
      homeLocationId: 'the_rook',
      knowledgeScope: ['rowan', 'house_ashby', 'the_trial', 'the_rook', 'swordwork', 'the_founding_tourney', 'the_fifth_bed'],
      startingRelationship: { trust: 10, affection: 5, respect: 45, fear: 0, rivalry: 65 },
      gates: [
        {
          id: 'rowan_on_the_wall',
          label: 'He tells you about House Ashby',
          kind: 'TRUST',
          requires: { trust: 45, flagsSet: ['first_drill_done'] },
        },
        {
          id: 'rowan_says_your_name',
          label: 'He stops calling you First',
          kind: 'ROMANCE',
          requires: { respect: 65, affection: 55 },
        },
      ],
      attributes: { might: 12, agility: 17, mind: 12, presence: 12, resolve: 14, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 16, damage: 8, tags: ['cadet', 'swordsman'] },
    },
    {
      id: 'aren',
      name: 'Prince Aren Valcourt',
      calledName: 'Aren',
      role: 'The Queen’s second son, ranked third, and the only one in the tower who defends your right to be here',
      cardBlurb:
        'He defends your right to be here every time and never once defends you, and on the day you arrived his mother wrote to him about you.',
      pronouns: 'he/him',
      publicTraits: ['Courteous to everybody in exactly the same amount', 'Quotes precedent the way other people swear', 'Never raises his voice'],
      hiddenDrives: [
        'He wants one thing in his life that nobody arranged for him, and he is beginning to suspect it might be you, which would be inconvenient',
        'He is furious with his mother and has nowhere to put it',
      ],
      values: ['A rule applied evenly is the only mercy a prince can offer', 'Earning what he is given'],
      fears: ['That his own place at Blackthorn was arranged as well', 'Being his mother’s instrument in front of you'],
      socialStyle:
        'Formal with everyone, porters included, which unsettles them. Says less than he knows and lets a silence finish his sentences.',
      boundaries: [
        'Will not lie for the Crown, though he will decline to answer',
        'Will not be thanked for doing what the rules require',
        'Will not repeat what the letter said unless somebody he trusts asks him straight',
      ],
      goals: ['Vote as himself and not as the Queen’s son', 'Finish first term without anybody saying his name got him anything'],
      secrets: [
        {
          id: 'aren_the_letter',
          fact: 'The royal letter he burned on your first night said: Keep her in. The Crown needs this to work. M. His mother had the Trial notice read aloud in your town in the first place.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you himself if you ask him straight what the letter said and he trusts you, or you can read what is left of it in the hearth.',
        },
        {
          id: 'aren_the_rescored_paper',
          fact: 'After the names were read, three masters rescored his written paper eleven marks higher. Without it he would have ranked eighth and slept in another room. He found out and has said nothing.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only after he has told you about the letter, and only if you have never once called him Your Highness.',
        },
      ],
      speechStyle:
        'Formal complete sentences, precedent and procedure, understatement so dry it takes a second to notice. Answers awkward questions with a single word, usually "Noted." Never uses a contraction when he is angry.',
      topics: ['the Charter', 'his mother', 'precedent', 'the Taking', 'the letter', 'what a prince is for'],
      voiceSamples: [
        'The board is the board. If we begin choosing which results we like, we are no longer an academy; we are a dinner party.',
        'Noted.',
        'I have been told where to stand since I could stand. I should like, once, to choose a position and be wrong in it myself.',
        'My mother writes to me twice a year. She has written twice this week. You may draw your own conclusions; I have drawn several.',
      ],
      appearance:
        'An adult man, tall and straight-backed, fair hair tied at the nape with a black ribbon, cool grey eyes, the high-collared grey wool cadet coat pressed to an edge and buttoned to the throat, and a heavy gold signet ring he never takes off.',
      visualHook: 'A gold signet ring with the royal crest, turned inward so the crest faces his palm.',
      silhouette: 'Standing at a table with both hands flat on it, reading something he has already read.',
      artSeed: 'otgab-aren-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'guarded', 'warm', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_rook', activity: 'asleep, very neatly' },
        { startMinute: 360, endMinute: 420, locationId: 'the_chapel', activity: 'the dawn office, alone in the front pew' },
        { startMinute: 420, endMinute: 720, locationId: 'the_yard', activity: 'morning drill' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'eating exactly half of everything' },
        { startMinute: 780, endMinute: 960, locationId: 'the_library', activity: 'reading letters he does not answer' },
        { startMinute: 960, endMinute: 1020, locationId: 'the_cliff_walk', activity: 'walking the wall with his hands behind his back' },
        { startMinute: 1020, endMinute: 1080, locationId: 'the_hall', activity: 'supper' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_rook', activity: 'writing at the one table, in a very small hand' },
      ],
      homeLocationId: 'the_rook',
      knowledgeScope: ['aren', 'the_crown', 'queen_merewen', 'the_charter', 'the_taking', 'the_rook', 'precedent'],
      startingRelationship: { trust: 25, affection: 15, respect: 40, fear: 0, rivalry: 10 },
      gates: [
        {
          id: 'aren_tells_you',
          label: 'He tells you what the letter said',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'aren_unarranged',
          label: 'He chooses something for himself',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 60, flagsSet: ['knows:the_queens_order'] },
        },
      ],
      attributes: { might: 12, agility: 13, mind: 15, presence: 16, resolve: 14, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 38, defenseDc: 15, damage: 7, tags: ['cadet', 'royal'] },
    },
    {
      id: 'gideon',
      name: 'Gideon Marsh',
      role: 'A smith’s son from the northern hills, ranked fourth, and the quietest man in the tower',
      cardBlurb:
        'The biggest man in the intake, and the first to offer you his hand. He slept through the vote. He checks his horse’s shoes twice a night, like a man who expects to lose it.',
      pronouns: 'he/him',
      publicTraits: ['Enormous and very gentle', 'Asks before he helps', 'Falls asleep anywhere, instantly'],
      hiddenDrives: [
        'He knows exactly what a yes would cost him and has more or less decided to pay it, and he is frightened of how much',
        'He wants somebody to notice he is clever, which nobody has since he left the forge',
      ],
      values: ['Fair work for fair pay', 'You finish what you pick up'],
      fears: ['Going back to the forge as the one who failed', 'Hurting somebody by accident because he forgot how strong he is'],
      socialStyle:
        'Waits, watches, then does the useful thing without being asked. Talks least of anyone in the tower and is listened to most.',
      boundaries: [
        'Will not fight anybody smaller than him outside the yard, whatever they say to him',
        'Will not take charity, though he will take a fair trade',
        'Will not mention the Marshal’s purse until somebody asks him kindly, in the stables, why he checks his horse’s shoes twice a night',
      ],
      goals: ['Keep his horse', 'Vote the way he would have voted if he had been awake'],
      secrets: [
        {
          id: 'gideon_the_purse',
          fact: 'His horse, armour and fees are paid by Lord Marshal Hargrave, who sponsors six commoners in the intake. On the second evening the Marshal’s steward comes to tell him the purse depends on how he votes.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you in the stables if you ask why he checks his horse’s shoes twice a night, and you ask kindly.',
        },
      ],
      speechStyle:
        'Very short sentences. Plain words. Forge talk for everything: heat, temper, quench, true. Says a person’s name when he means what follows. Laughs rarely and all the way.',
      topics: ['his horse', 'the forge', 'the northern hills', 'the fifth bed', 'the vote', 'the Marshal’s purse'],
      voiceSamples: [
        'Gideon.',
        'Four flights. Narrow at the third. Other end’s yours.',
        'Iron’s honest. Heat it wrong, it cracks. People take longer to show you.',
        'May I? Your buckle’s twisted. Smith’s habit.',
      ],
      appearance:
        'An adult man, huge through the shoulders and a head taller than any doorway in the tower, close-cut brown hair, a broad calm face with a short beard, forge-scarred hands, and the grey wool cadet coat let out at every seam and still tight across the back.',
      visualHook: 'Hands the size of a shield, the backs speckled with old forge burns.',
      silhouette: 'Ducking under a doorframe with one hand already held out.',
      artSeed: 'otgab-gideon-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'sheepish', 'worried', 'grinning'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_rook', activity: 'asleep within a minute of lying down' },
        { startMinute: 300, endMinute: 420, locationId: 'the_armory', activity: 'working the bellows for the armorer before drill' },
        { startMinute: 420, endMinute: 720, locationId: 'the_yard', activity: 'morning drill' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'eating everything within reach' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_stables', activity: 'checking his horse’s shoes, twice' },
        { startMinute: 1020, endMinute: 1080, locationId: 'the_hall', activity: 'supper' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_rook', activity: 'mending a strap by the fire' },
      ],
      homeLocationId: 'the_rook',
      knowledgeScope: ['gideon', 'the_forge', 'the_stables', 'the_marshals_purse', 'the_rook'],
      startingRelationship: { trust: 35, affection: 30, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'gideon_tells_you',
          label: 'He tells you about the purse',
          kind: 'TRUST',
          requires: { trust: 50, flagsSet: ['the_steward_came'] },
        },
        {
          id: 'gideon_stops_asking',
          label: 'You tell him he does not have to ask',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 65 },
        },
      ],
      attributes: { might: 19, agility: 10, mind: 12, presence: 11, resolve: 15, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 14, damage: 11, tags: ['cadet', 'heavy'] },
    },
    {
      id: 'felix',
      name: 'Felix Lorne',
      role: 'A clerk’s son on a scholar’s stipend, ranked fifth, with the best written paper in forty years and the worst sword',
      cardBlurb:
        'He abstained for lack of evidence, he keeps a ledger on everyone in the tower, and the page he keeps on you so far says only your number.',
      pronouns: 'he/him',
      publicTraits: ['Talks fast and footnotes himself', 'Terrible in the yard and knows it', 'Brave in a way that surprises him every time'],
      hiddenDrives: [
        'He is writing a history of Blackthorn and has found a hole in it that frightens him',
        'He wants to be useful in the yard just once, in front of Rowan',
      ],
      values: ['Evidence before opinion', 'Writing it down so it cannot be undone'],
      fears: ['Being the reason the lance loses the tourney', 'That the rolls have been lying for four hundred years and he is the only one who has noticed'],
      socialStyle:
        'Talks to fill a silence, then remembers himself and asks one precise question. Treats everyone he meets as a primary source.',
      boundaries: [
        'Will not vote on anything without evidence, including you, including himself',
        'Will not let anybody read his ledger',
        'Will not show anybody the gap in the rolls until they have helped him in the Rolls Room, or until the fifth night',
      ],
      goals: ['Finish the history', 'Get through the yard this term without being carried off the sand'],
      secrets: [
        {
          id: 'felix_the_gap',
          fact: 'In the register thirty-one years back, line seventeen of that intake has no name, only "sent home with thanks", in a hand that matches the Master of the Rolls of the time: Anselm Greaves. The volume was rebound that year.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He shows you if you help him in the Rolls Room, or brings it to you himself on the fifth night if you have been talking to him.',
        },
      ],
      speechStyle:
        'Fast, numbered, digressive. Cites the Charter by article and line. Interrupts himself with "Sorry. Short version:" and then gives a short version that is also long.',
      topics: ['the Charter', 'the register', 'his history of Blackthorn', 'the ledger', 'evidence', 'the gap in the rolls'],
      voiceSamples: [
        'Article nine, line four: "any subject of the Crown". Subject. Not son, not man. I checked the original. Twice. Sorry. Short version: you’re legal.',
        'I abstained for insufficient data, which is a phrase I’m aware makes people want to hit me.',
        'Three things. One, I’m writing this down. Two, nobody has ever carried a bed up the north stair. Three, I’m writing this down.',
        'My sword marks were the lowest in forty years and my paper the highest. They averaged them and put me fifth, which is mathematically insulting.',
      ],
      appearance:
        'An adult man, slight and ink-stained, untidy chestnut curls, wire spectacles mended with black thread, a pencil behind each ear, and the grey wool cadet coat with every pocket stuffed with folded paper.',
      visualHook: 'Wire spectacles mended at the hinge with black thread, and a pencil behind each ear.',
      silhouette: 'Peering over a wall of stacked books, one finger still marking a page.',
      artSeed: 'otgab-felix-01',
      portrait: null,
      expressions: ['neutral', 'flustered', 'eager', 'thinking', 'worried'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_rook', activity: 'asleep under an open book' },
        { startMinute: 360, endMinute: 420, locationId: 'the_library', activity: 'reading before anybody can stop him' },
        { startMinute: 420, endMinute: 720, locationId: 'the_yard', activity: 'morning drill, badly' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'eating with a book propped on the bread' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_library', activity: 'at his table under the chapel' },
        { startMinute: 1020, endMinute: 1080, locationId: 'the_hall', activity: 'supper' },
        { startMinute: 1080, endMinute: 1440, locationId: 'the_rook', activity: 'writing in his ledger behind a wall of books' },
      ],
      homeLocationId: 'the_rook',
      knowledgeScope: ['felix', 'the_charter', 'the_register', 'the_gap_in_the_rolls', 'blackthorn_history', 'the_rook'],
      startingRelationship: { trust: 25, affection: 20, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'felix_shows_you',
          label: 'He shows you the gap in the rolls',
          kind: 'TRUST',
          requires: { trust: 45 },
        },
        {
          id: 'felix_stops_writing',
          label: 'He stops writing things down when you are with him',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60 },
        },
      ],
      attributes: { might: 8, agility: 10, mind: 18, presence: 11, resolve: 13, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: { health: 26, defenseDc: 11, damage: 4, tags: ['cadet', 'scholar'] },
    },
    {
      id: 'dunmore',
      name: 'Margery Dunmore',
      calledName: 'Dunmore',
      role: 'Mistress of the Armory for twenty years, and the only other woman inside the walls',
      cardBlurb:
        'She has fitted every cadet at Blackthorn for twenty years, she fitted you without one word about the obvious, and she will not tell you whose sword hangs on her back wall.',
      pronouns: 'she/her',
      publicTraits: ['Blunt', 'Calls everybody cadet, the prince included', 'Remembers every measurement she has ever taken'],
      hiddenDrives: [
        'She wants you through the Taking without her having to say a word, because saying it would mean admitting she lost',
        'She has kept that sword on the wall for thirty-one years so that one particular man has to walk past it every day',
      ],
      values: ['Good steel and honest measurements', 'Not being pitied'],
      fears: ['Watching it happen the same way twice', 'Becoming a story people tell instead of a person'],
      socialStyle:
        'Talks while she works and never stops working to talk. Gives advice as instructions about your grip.',
      boundaries: [
        'Will not tell her story to somebody who asks out of curiosity',
        'Will not fight your battles for you; she will sharpen what you fight them with',
      ],
      goals: ['Keep you in one piece until the tenth day', 'Make Matthias Orme say it out loud, once, before one of them dies'],
      secrets: [
        {
          id: 'dunmore_seventeen',
          fact: 'She is Cadet Seventeen. Thirty-one years ago, as Margery Holt, she passed the Trial in a helm, ranked ninth, and was not taken by her lance on the seventh day. Her name was cut from the rolls. She married the village armorer, and when he died she took over the forge inside the walls that threw her out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you at the forge, late, if you have found the gap in the rolls and you ask her about the sword rather than about yourself.',
        },
      ],
      speechStyle:
        'Fitting-room terse. Sizes, reach, grip and stance, verbs first; she leaves the forge talk to the smiths. Calls everybody "cadet" in the same flat tone. The rare joke arrives deadpan and is never repeated.',
      topics: ['steel', 'fitting', 'the unmarked sword', 'Thornhollow', 'Matthias Orme', 'grip and stance'],
      voiceSamples: [
        'Arms up, cadet. Further. This jacket’s cut for a reach a hand longer than yours and I’ve got till supper.',
        'Prince or pig farmer, every one of them lies about his shoulder width.',
        'Steel doesn’t care who’s holding it. Only thing up here that doesn’t.',
        'Don’t ask me about that sword. Ask me about your grip, which is wrong.',
      ],
      appearance:
        'An adult woman, broad-shouldered and weathered, an iron-grey braid pinned up out of the way, a dark linen work shirt with the sleeves rolled, a scarred leather apron burned through at the hem, and a hammer through her belt.',
      visualHook: 'A leather apron burned through at the hem, and an iron-grey braid pinned up with a horseshoe nail.',
      silhouette: 'Bent over the grinding wheel, sparks going one way and her braid the other.',
      artSeed: 'otgab-dunmore-01',
      portrait: null,
      expressions: ['neutral', 'unimpressed', 'wry', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'thornhollow', activity: 'at home in the village' },
        { startMinute: 360, endMinute: 1140, locationId: 'the_armory', activity: 'at the forge' },
        { startMinute: 1140, endMinute: 1440, locationId: 'thornhollow', activity: 'at The Broken Lance, one cup, back to the wall' },
      ],
      homeLocationId: 'thornhollow',
      knowledgeScope: ['dunmore', 'the_armory', 'cadet_seventeen', 'thornhollow', 'matthias_orme', 'the_taking'],
      startingRelationship: { trust: 20, affection: 15, respect: 25, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'dunmore_the_sword',
          label: 'She tells you whose sword it is',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['knows:the_gap_in_the_rolls'] },
        },
        {
          id: 'dunmore_shows_you',
          label: 'She shows you how she used to stand',
          kind: 'ALLIANCE',
          requires: { trust: 60, affection: 50 },
        },
      ],
      attributes: { might: 15, agility: 12, mind: 13, presence: 12, resolve: 17, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 14, damage: 8, tags: ['armorer'] },
    },
    {
      id: 'orme',
      name: 'Sir Matthias Orme',
      calledName: 'Orme',
      role: 'Master-at-Arms. Runs the yard, voted to void your result, and scored your blind bout the highest in twenty years',
      cardBlurb:
        'In his yard he will treat you exactly like everybody else, and that is the hardest thing anyone here will do to you. He voted to send you home. He scored your bout the highest in twenty years.',
      pronouns: 'he/him',
      publicTraits: ['Fair to the point of cruelty', 'Never praises anybody', 'Walks the sea wall every night, alone'],
      hiddenDrives: [
        'He has waited thirty-one years for the chance to vote differently, and this time the vote is not his',
        'He wants you to be so good that nobody can ever do it again',
      ],
      values: ['The yard does not care who you are', 'A guard is up or it is down'],
      fears: ['That he is still the man he was at twenty-three', 'Margery Dunmore saying his name in the chapel'],
      socialStyle:
        'Barks, counts, corrects. One sentence where other people use five. Never touches a cadet except to move a guard.',
      boundaries: [
        'Will not favour you in the yard for any reason, including guilt',
        'Will not discuss the masters’ council with a cadet',
        'Will not speak of his own Taking except on the sea wall at night, to a cadet he respects enough to be ashamed in front of',
      ],
      goals: ['Get the intake through first term with nobody carried off the sand', 'Say one true thing to Margery Dunmore before he retires'],
      secrets: [
        {
          id: 'orme_said_no',
          fact: 'Thirty-one years ago he was in Cadet Seventeen’s lance and stood up in the chapel and said no, because the Provost of the day asked them to and he wanted his commission. He has worked across the yard from her for twenty years and they have only ever spoken about steel.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He tells you on the sea wall at night, if he respects you enough to be ashamed in front of you.',
        },
      ],
      speechStyle:
        'Barked imperatives. Numbers and counts. "Again." as a complete sentence. Calls you cadet and nothing else, and says it exactly the way he says it to Rowan.',
      topics: ['the yard', 'guard and footwork', 'the ledger', 'the Founding Tourney', 'conduct', 'the old days'],
      voiceSamples: [
        'Again.',
        'The yard has no interest in what you are. It is interested in your guard, which is down. Again.',
        'Forty cadets, forty swords, one rule: nobody gets carried off this sand before breakfast.',
        'I scored that bout with your helm on. I’d score it the same with it off. That is all you get from me.',
      ],
      appearance:
        'An older man, lean and weathered, close-cropped grey hair, a scar through one eyebrow, a master’s long black coat with a black iron thorn at the collar, and a battered leather ledger always under one arm.',
      visualHook: 'A battered leather ledger under one arm, in which he writes down every bout, every day.',
      silhouette: 'Standing at the yard rail, ledger open, not looking up.',
      artSeed: 'otgab-orme-01',
      portrait: null,
      expressions: ['stern', 'neutral', 'reluctantly impressed', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'the_yard', activity: 'in the master’s quarters over the yard' },
        { startMinute: 300, endMinute: 720, locationId: 'the_yard', activity: 'running drill from the rail' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'at the high table' },
        { startMinute: 780, endMinute: 1080, locationId: 'the_tilt', activity: 'riding drill on the tilt field' },
        { startMinute: 1080, endMinute: 1200, locationId: 'the_hall', activity: 'at the high table, saying nothing' },
        { startMinute: 1200, endMinute: 1260, locationId: 'the_cliff_walk', activity: 'walking the wall to the old watchtower and back' },
        { startMinute: 1260, endMinute: 1440, locationId: 'the_yard', activity: 'in his quarters with the lamp still on' },
      ],
      homeLocationId: 'the_yard',
      knowledgeScope: ['orme', 'the_yard', 'cadet_seventeen', 'the_masters', 'the_founding_tourney', 'the_trial'],
      startingRelationship: { trust: 10, affection: 0, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'orme_on_the_wall',
          label: 'He tells you about his own Taking',
          kind: 'TRUST',
          requires: { trust: 40, respect: 60 },
        },
      ],
      attributes: { might: 15, agility: 14, mind: 13, presence: 14, resolve: 16, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 55, defenseDc: 17, damage: 11, tags: ['master', 'veteran'] },
    },
    {
      id: 'greaves',
      name: 'Lord Provost Anselm Greaves',
      calledName: 'Greaves',
      role: 'Head of Blackthorn, once its Master of the Rolls, and the man who tried to void your result in the chapel',
      cardBlurb:
        'He tried to void your result, he lost, and he has been perfectly charming to you ever since, which is how you know he has not stopped.',
      pronouns: 'he/him',
      publicTraits: ['Impeccably courteous', 'Never raises his voice', 'Knows every rule and every way around one'],
      hiddenDrives: [
        'He believes, sincerely, that Blackthorn has lasted four hundred years by changing nothing, and that he is protecting it from you',
        'He kept the page he cut thirty-one years ago and has never been able to say why',
      ],
      values: ['Order', 'Custom, which he calls the Charter’s memory'],
      fears: ['Being the Provost under whom Blackthorn changed', 'The cut page being found'],
      socialStyle:
        'Gracious, unhurried, always offering tea. Never threatens; regrets. Makes things happen through other people and is never in the room when they do.',
      boundaries: [
        'Will never break a rule where it can be seen',
        'Will not raise his voice, at anybody, ever',
        'Will never mention the page he kept; it can only be found',
      ],
      goals: ['See you lanceless on the seventh day and gone by the end of term, quietly, with thanks', 'Keep the Taking a custom nobody thinks to question'],
      secrets: [
        {
          id: 'greaves_the_page',
          fact: 'As Master of the Rolls he cut Cadet Seventeen’s name out of the register on the order of the Provost of the day and had the volume rebound. He kept the original page in the locked cabinet in his study.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He never speaks of it. The page is in the cabinet, and it has to be found.',
        },
        {
          id: 'greaves_the_fire_risk',
          fact: 'He remarked to Leopold Marr, in passing, that a fifth bed in the Rook was a fire risk. Marr did the rest, exactly as Greaves knew he would.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Marr gives him up if Marr is cornered somewhere private and offered a way to keep his commission.',
        },
      ],
      speechStyle:
        'Long, courteous sentences with "of course" and "naturally" in them. Calls you cadet with perfect politeness. Regrets things instead of threatening them, and the regret is the threat.',
      topics: ['the Charter', 'custom', 'the Taking', 'the history of Blackthorn', 'your welfare', 'tea'],
      voiceSamples: [
        'Do sit. You must forgive the fire; I feel the cold, and so, I suspect, do you, up in that tower with the window that never quite closes.',
        'Of course the Charter stands. Naturally it stands. Charters are remarkable things; they say exactly what they say, and not one syllable more.',
        'Nobody here wishes you ill. We wish you, very sincerely, somewhere you might be happier.',
        'Custom is merely the Charter remembering what it forgot to write down.',
      ],
      appearance:
        'An older man, tall and silver-haired, immaculate in a provost’s black gown with silver facings, thin reading spectacles, and long pale hands that are nearly always holding a porcelain teacup.',
      visualHook: 'A thin porcelain teacup he holds even while standing, never spilling a drop.',
      silhouette: 'Seated in a high-backed chair by a lit fire, legs crossed, cup raised.',
      artSeed: 'otgab-greaves-01',
      portrait: null,
      expressions: ['courteous', 'cold', 'calculating', 'neutral'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'provost_house', activity: 'at home in the lodging' },
        { startMinute: 420, endMinute: 480, locationId: 'the_chapel', activity: 'the morning office, from the Provost’s stall' },
        { startMinute: 480, endMinute: 1080, locationId: 'provost_house', activity: 'in the study, receiving' },
        { startMinute: 1080, endMinute: 1140, locationId: 'the_hall', activity: 'at the head of the high table' },
        { startMinute: 1140, endMinute: 1440, locationId: 'provost_house', activity: 'by the fire with the day’s reports' },
      ],
      homeLocationId: 'provost_house',
      knowledgeScope: ['greaves', 'the_masters', 'the_charter', 'the_register', 'cadet_seventeen', 'the_taking', 'the_old_houses'],
      startingRelationship: { trust: 5, affection: 0, respect: 15, fear: 0, rivalry: 35 },
      gates: [
        {
          id: 'greaves_plainly',
          label: 'He tells you plainly what he thinks of you',
          kind: 'OTHER',
          requires: { flagsSet: ['invited_to_tea'] },
        },
      ],
      attributes: { might: 8, agility: 9, mind: 17, presence: 16, resolve: 15, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: { health: 22, defenseDc: 10, damage: 2, tags: ['master', 'civilian'] },
    },
    {
      id: 'marr',
      name: 'Leopold Marr',
      calledName: 'Marr',
      role: 'Captain of the Cadet Watch, a third-year, and the Provost’s favourite pair of hands',
      cardBlurb:
        'Captain of the Cadet Watch and the most popular senior at Blackthorn. He has a tradition planned for your first night, and he will tell you, warmly and often, that he is your friend.',
      pronouns: 'he/him',
      publicTraits: ['Charming in a crowd', 'Remembers everybody’s name and uses it', 'Calls everything tradition'],
      hiddenDrives: [
        'He is failing his final examinations and needs the Provost’s goodwill to leave with a commission',
        'He does not dislike you; you are simply the price of something he wants',
      ],
      values: ['Being liked', 'Things as they have always been, because they have always been good to him'],
      fears: ['Leaving Blackthorn without a commission', 'Being laughed at instead of laughed with'],
      socialStyle:
        'Arm round the shoulders, nicknames, jokes everybody is expected to laugh at. Never does anything unpleasant himself; asks a friend.',
      boundaries: [
        'Will not cross the Provost',
        'Will not fight anybody fairly if he can arrange not to',
      ],
      goals: ['Keep the Provost pleased until he graduates', 'Make the Cold Watch and the Stair Run your problem'],
      secrets: [
        {
          id: 'marr_the_porters',
          fact: 'He told the porters to carry the fifth bed out of the Rook at dawn, after the Provost called it a fire risk. He also knows which two seniors go into the tack room on the third night.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He gives it all up if he is cornered somewhere private and offered a way to keep his commission.',
        },
      ],
      speechStyle:
        'Hearty and loud, "lads" for everybody, nicknames, jokes with a knife folded inside them. Says "tradition" as if it were a whole argument.',
      topics: ['tradition', 'the Cold Watch', 'the Stair Run', 'the fifth bed', 'his commission', 'the Provost'],
      voiceSamples: [
        'Lads! Lads. Look what the Crown sent us. Somebody fetch her a cushion for the Cold Watch.',
        'It’s tradition, Forty-One. Everybody stands the Cold Watch their first night. Well. Everybody who’s anybody.',
        'Nobody moved anything. Beds wander. Old tower, damp floors. Terrible business.',
        'Honestly, I’m your friend here. Ask anyone. Ask the porters.',
      ],
      appearance:
        'An adult man, handsome and broad, golden hair worn longer than the rules allow, a senior’s darker grey wool coat with a captain’s silver cord at the shoulder, and a wide easy grin.',
      visualHook: 'A silver captain’s cord at one shoulder that he touches whenever he gives an order.',
      silhouette: 'Leaning in a doorway with one arm up on the frame, lamp held high.',
      artSeed: 'otgab-marr-01',
      portrait: null,
      expressions: ['grinning', 'threatening', 'annoyed', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'the_yard', activity: 'in the seniors’ wing over the yard' },
        { startMinute: 360, endMinute: 720, locationId: 'the_yard', activity: 'running the seniors’ drill and watching the first-years’' },
        { startMinute: 720, endMinute: 780, locationId: 'the_hall', activity: 'lunch at the senior table' },
        { startMinute: 780, endMinute: 1020, locationId: 'the_tilt', activity: 'riding, mostly for an audience' },
        { startMinute: 1020, endMinute: 1200, locationId: 'the_hall', activity: 'holding court at the senior table' },
        { startMinute: 1200, endMinute: 1380, locationId: 'thornhollow', activity: 'at The Broken Lance on the Provost’s leave' },
        { startMinute: 1380, endMinute: 1440, locationId: 'the_yard', activity: 'walking the cadet watch, loudly' },
      ],
      homeLocationId: 'the_yard',
      knowledgeScope: ['marr', 'the_cadet_watch', 'the_fifth_bed', 'the_seniors', 'the_provost', 'traditions'],
      startingRelationship: { trust: 0, affection: 0, respect: 5, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'marr_gives_it_up',
          label: 'He tells you who ordered the bed moved',
          kind: 'OTHER',
          requires: { fear: 30 },
        },
      ],
      attributes: { might: 14, agility: 13, mind: 10, presence: 15, resolve: 9, arcana: 5 },
      companion: null,
      scouting: null,
      combatant: { health: 42, defenseDc: 14, damage: 8, tags: ['senior', 'cadet'] },
    },
  ],
  quests: [
    {
      id: 'q_four_beds',
      title: 'Four Beds',
      summary: 'Your bed is in the stable yard, four flights down. Four men who did not vote for you are watching to see what you do about it, and it is getting dark.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['rowan', 'aren', 'gideon', 'felix', 'marr', 'orme'],
      involvedLocationIds: ['the_rook', 'north_stair', 'the_stables', 'the_yard'],
      knownRewardCopy: 'A place to sleep, and a first idea of which of the four might ever say yes.',
      steps: [
        {
          id: 'the_first_night',
          playerCopy: 'Get through your first night in the Rook.',
          directorNotes:
            'Every route here is a real answer to Rowan’s question and none of them is wrong. Fetching the bed up is the stubborn answer and Gideon will take the other end if she lets him. Taking Rowan’s bed is the provocative one; he will sleep on the floor rather than argue, and lie awake furious and impressed. Sleeping in the stables is the proud one and it means nobody can touch her tack for a week. Whatever she does, the four react to the specific thing, and Felix writes it down. At ten Marr arrives to welcome the lance.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'carried_it_up',
              label: 'Carry your own bed up four flights',
              predicate: { flagsSet: ['used:outwork_them'] },
              setsFlags: ['bed_carried_up'],
              closesFlags: ['slept_in_the_stables'],
            },
            {
              routeId: 'gideon_took_the_other_end',
              label: 'Let Gideon take the other end',
              predicate: {
                flagsSet: ['spoke:gideon'],
                minRelationship: [{ characterId: 'gideon', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['bed_carried_up', 'gideon_carried_it'],
              closesFlags: ['slept_in_the_stables'],
            },
            {
              routeId: 'claimed_rowans_bed',
              label: 'Take Rowan’s bed and dare him to move you',
              predicate: { flagsSet: ['used:say_it_to_their_face'], atLocation: 'the_rook' },
              setsFlags: ['took_rowans_bed'],
              closesFlags: ['bed_carried_up'],
            },
            {
              routeId: 'slept_with_the_horses',
              label: 'Sleep in the stables, beside your own bed',
              predicate: { atLocation: 'the_stables' },
              setsFlags: ['slept_in_the_stables'],
              closesFlags: ['bed_carried_up'],
            },
            {
              routeId: 'floor_behind_the_partition',
              label: 'Sleep on the floor behind the partition and say nothing',
              predicate: { flagsSet: ['used:hold_your_tongue'] },
              setsFlags: ['slept_on_the_floor'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_night_over'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_first_drill',
          playerCopy: 'Survive your first morning in Orme’s yard.',
          directorNotes:
            'The dawn bell, the Stair Run, and then Orme pairs her with Rowan in front of sixty cadets. Orme is scrupulously fair, which here means he gives her nothing and takes nothing away. Whatever she does, write the yard watching. A cadet who wins the stair run is talked about; a cadet who draws with Rowan is talked about more.',
          enterWhen: { flagsSet: ['first_night_over'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_the_stair_run',
              label: 'Be first down the stair at the dawn bell',
              predicate: { flagsSet: ['used:outwork_them', 'first_stair_run'] },
              setsFlags: ['won_the_stair_run'],
              closesFlags: [],
            },
            {
              routeId: 'first_bout_with_rowan',
              label: 'Take the bout with Rowan when Orme pairs you',
              predicate: { flagsSet: ['used:cross_blades', 'met:rowan'] },
              setsFlags: ['first_bout_with_rowan'],
              closesFlags: ['head_down'],
            },
            {
              routeId: 'read_the_master',
              label: 'Watch Orme until you understand what he is scoring',
              predicate: { flagsSet: ['used:read_the_yard'] },
              setsFlags: ['orme_noticed_you'],
              closesFlags: [],
            },
            {
              routeId: 'kept_your_head_down',
              label: 'Give nobody anything to talk about',
              predicate: { flagsSet: ['used:hold_your_tongue'] },
              setsFlags: ['head_down'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['first_drill_done'],
            abilities: [],
            reputation: [{ factionId: 'faction_intake', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_taking',
      title: 'The Taking',
      summary: 'On the seventh morning, in the chapel, each of your four roommates stands and says yes or no out loud. You need three. Last night the count was nothing.',
      kind: 'MAIN',
      involvedCharacterIds: ['rowan', 'aren', 'gideon', 'felix', 'greaves', 'orme'],
      involvedLocationIds: ['the_chapel', 'the_rook'],
      knownRewardCopy: 'A place in the First Lance, a horse in the Founding Tourney, and a bed nobody will move again.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_vote',
          playerCopy: 'Be taken by your lance on the seventh morning, or change what the seventh morning is.',
          directorNotes:
            'The four stand in rank order, Rowan first, and each says one word. Each vote is the sum of what the player did with that man this week, and the prose should make the reason legible without anybody explaining it. The Provost presides and is courteous whatever happens. There is a fifth way through: the Charter says admitted, ranked and housed, and says nothing about a vote, and a player who has learned it well enough can read that out on the chapel floor. Not being taken is a real outcome, reachable by doing nothing wrong, and must be written with dignity rather than as a punishment.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'taken_by_all_four',
              label: 'All four stand and say yes',
              predicate: { flagsSet: ['taking_day', 'vote:rowan_yes', 'vote:aren_yes', 'vote:gideon_yes', 'vote:felix_yes'] },
              setsFlags: ['taken', 'taken_by_all_four'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'taken_without_rowan',
              label: 'Taken, with Rowan still saying no',
              predicate: { flagsSet: ['taking_day', 'vote:aren_yes', 'vote:gideon_yes', 'vote:felix_yes'] },
              setsFlags: ['taken'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'taken_without_aren',
              label: 'Taken, with the prince abstaining',
              predicate: { flagsSet: ['taking_day', 'vote:rowan_yes', 'vote:gideon_yes', 'vote:felix_yes'] },
              setsFlags: ['taken'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'taken_without_gideon',
              label: 'Taken, with Gideon voting the way his sponsor paid for',
              predicate: { flagsSet: ['taking_day', 'vote:rowan_yes', 'vote:aren_yes', 'vote:felix_yes'] },
              setsFlags: ['taken'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'taken_without_felix',
              label: 'Taken, with Felix still short of evidence',
              predicate: { flagsSet: ['taking_day', 'vote:rowan_yes', 'vote:aren_yes', 'vote:gideon_yes'] },
              setsFlags: ['taken'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'struck_down_the_taking',
              label: 'Read the Charter back to the masters on the chapel floor',
              predicate: { flagsSet: ['taking_day', 'used:invoke_the_charter'], atLocation: 'the_chapel' },
              setsFlags: ['taking_struck_down', 'taken'],
              closesFlags: ['lanceless'],
            },
            {
              routeId: 'not_taken',
              label: 'Nobody takes you',
              predicate: { flagsSet: ['taking_day'] },
              setsFlags: ['lanceless'],
              closesFlags: ['taken'],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['taking_done'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_second_place',
      title: 'Second Place',
      summary: 'Rowan Ashby ranked second to you by four points, and his family’s last hope was that he would rank first. He wants a rematch in front of the whole intake, and he will not take a refusal quietly.',
      kind: 'SIDE',
      involvedCharacterIds: ['rowan', 'orme'],
      involvedLocationIds: ['the_yard', 'the_cliff_walk', 'the_tilt'],
      knownRewardCopy: 'Rowan’s vote, one way or the other, and the truth about what he stands to lose.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'the_rematch',
          playerCopy: 'Settle things with Rowan Ashby, one way or another.',
          directorNotes:
            'Rowan respects exactly one thing, which is being beaten fairly, and the only unforgivable thing is a thrown bout. Losing to him honestly and without excuses also earns his vote, because it proves the four points were not luck either way. If the two of them end up on the sea wall at night, he tells her about the mortgage and the letter from his mother, and that he held the door for the porters, in that order, and then wants a rematch anyway.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_him_clean',
              label: 'Beat him clean in front of the intake',
              predicate: {
                flagsSet: ['used:cross_blades'],
                minRelationship: [{ characterId: 'rowan', dimension: 'respect', value: 55 }],
              },
              setsFlags: ['vote:rowan_yes', 'beat_rowan_clean'],
              closesFlags: ['threw_the_bout'],
            },
            {
              routeId: 'lost_to_him_honestly',
              label: 'Lose to him honestly, and make no excuses',
              predicate: {
                flagsSet: ['engaged:rowan'],
                minRelationship: [{ characterId: 'rowan', dimension: 'respect', value: 50 }],
              },
              setsFlags: ['vote:rowan_yes', 'lost_to_rowan'],
              closesFlags: ['threw_the_bout'],
            },
            {
              routeId: 'the_sea_wall',
              label: 'Find him on the sea wall at night and let him talk',
              predicate: {
                flagsSet: ['spoke:rowan'],
                atLocation: 'the_cliff_walk',
                minRelationship: [{ characterId: 'rowan', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['vote:rowan_yes', 'knows:the_ashby_mortgage'],
              closesFlags: [],
            },
            {
              routeId: 'threw_the_bout',
              label: 'Let him win on purpose',
              predicate: { flagsSet: ['engaged:rowan', 'used:hold_your_tongue'] },
              setsFlags: ['threw_the_bout'],
              closesFlags: ['vote:rowan_yes'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['rowan_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_intake', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_burned_letter',
      title: 'The Burned Letter',
      summary: 'Prince Aren defends the rule every time and you never once. On the day you arrived a royal rider brought him a letter, and he read it twice and put it in the hearth.',
      kind: 'SIDE',
      involvedCharacterIds: ['aren', 'greaves'],
      involvedLocationIds: ['the_rook', 'the_library', 'the_cliff_walk'],
      knownRewardCopy: 'What the Queen wants from you, and whether her son is going to give it to her.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'what_the_letter_said',
          playerCopy: 'Find out what the Queen wrote to her son about you.',
          directorNotes:
            'Three ways to learn it, and they are not equivalent. Being told is the version where Aren chooses to trust her. Reading the ashes is the version where she knows something he did not give her, and he will be able to tell. Hearing it from the Provost is the version where it arrives poisoned: Greaves will present it as proof that the Crown fixed everything, and Aren will be furious she went round him.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_told_you',
              label: 'He tells you himself',
              predicate: {
                flagsSet: ['spoke:aren'],
                minRelationship: [{ characterId: 'aren', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:the_queens_order', 'aren_told_you'],
              closesFlags: ['read_the_ashes', 'greaves_told_you'],
            },
            {
              routeId: 'read_the_ashes',
              label: 'Read what is left of it in the hearth',
              predicate: { hasItems: ['burned_letter'] },
              setsFlags: ['knows:the_queens_order', 'read_the_ashes'],
              closesFlags: ['aren_told_you'],
            },
            {
              routeId: 'greaves_told_you',
              label: 'Let the Provost tell you over tea',
              predicate: { flagsSet: ['spoke:greaves', 'invited_to_tea'] },
              setsFlags: ['knows:the_queens_order', 'greaves_told_you'],
              closesFlags: ['aren_told_you'],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['letter_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_crown', amount: 10 }],
          },
        },
        {
          id: 'how_he_votes',
          playerCopy: 'Find out whether Aren votes as the Queen’s son or as himself.',
          directorNotes:
            'He has three honest positions and the player decides which one he lands on by what she does with what she knows. If she tells him to vote as he likes, even no, he is more likely to say yes than at any other moment, and he will know she did it on purpose. If she learned it from Greaves, he abstains on principle and tells her why in one word.',
          enterWhen: { flagsSet: ['knows:the_queens_order'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_chose_for_himself',
              label: 'He votes yes as himself',
              predicate: {
                flagsSet: ['aren_told_you'],
                minRelationship: [{ characterId: 'aren', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['vote:aren_yes', 'aren_chose_for_himself'],
              closesFlags: ['aren_obeyed'],
            },
            {
              routeId: 'you_released_him',
              label: 'Tell him to vote as he likes, even no',
              predicate: {
                flagsSet: ['used:say_it_to_their_face'],
                minRelationship: [{ characterId: 'aren', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['vote:aren_yes', 'aren_chose_for_himself', 'released_aren'],
              closesFlags: ['aren_obeyed'],
            },
            {
              routeId: 'he_obeyed',
              label: 'He votes yes because his mother told him to',
              predicate: {
                flagsSet: ['knows:the_queens_order'],
                minRelationship: [{ characterId: 'aren', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['vote:aren_yes', 'aren_obeyed'],
              closesFlags: ['aren_chose_for_himself'],
            },
            {
              routeId: 'he_abstains',
              label: 'He abstains, on principle',
              predicate: { flagsSet: ['greaves_told_you'] },
              setsFlags: ['aren_abstains'],
              closesFlags: ['vote:aren_yes'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['aren_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_sponsors_purse',
      title: 'The Sponsor’s Purse',
      summary: 'Gideon’s horse, armour and fees are paid for by Lord Marshal Hargrave, and sooner or later the Marshal will send somebody up the hill to tell Gideon how to vote. Gideon has told nobody, and he checks his horse’s shoes twice a night.',
      kind: 'SIDE',
      involvedCharacterIds: ['gideon', 'dunmore'],
      involvedLocationIds: ['the_stables', 'the_armory', 'thornhollow'],
      knownRewardCopy: 'Gideon’s vote, and whether it costs him his horse.',
      discoverWhen: { flagsSet: ['the_steward_came'] },
      steps: [
        {
          id: 'the_purse',
          playerCopy: 'Find out what a yes would cost Gideon, and decide whether to let him pay it.',
          directorNotes:
            'Gideon has already half decided to vote yes and lose the horse. The question is whether the player lets him, finds him another way, or tells him to vote no to protect him, which he will do because she asked and will think about for the rest of his life. Thornhollow can find a horse and Dunmore can make kit at cost, if the village likes her and the armorer is asked. He will not take charity; it has to be a trade.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'another_purse',
              label: 'Find him a horse and kit the Marshal does not own',
              predicate: {
                flagsSet: ['spoke:dunmore'],
                minFactionReputation: [{ factionId: 'faction_thornhollow', value: 35 }],
              },
              setsFlags: ['vote:gideon_yes', 'gideon_kept_his_horse'],
              closesFlags: ['gideon_lost_the_purse'],
            },
            {
              routeId: 'he_votes_anyway',
              label: 'Let him vote yes and lose the purse',
              predicate: {
                flagsSet: ['spoke:gideon'],
                minRelationship: [{ characterId: 'gideon', dimension: 'affection', value: 60 }],
              },
              setsFlags: ['vote:gideon_yes', 'gideon_lost_the_purse'],
              closesFlags: ['gideon_kept_his_horse'],
            },
            {
              routeId: 'told_him_to_vote_no',
              label: 'Tell him to vote no and keep his horse',
              predicate: {
                flagsSet: ['used:say_it_to_their_face'],
                minRelationship: [{ characterId: 'gideon', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['gideon_spared'],
              closesFlags: ['vote:gideon_yes'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['gideon_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_old_houses', amount: -10 }],
          },
        },
      ],
    },
    {
      id: 'q_insufficient_data',
      title: 'Insufficient Data',
      summary: 'Felix Lorne abstained because he never votes without evidence. He keeps a ledger on everybody in the tower, he has a page on you, and so far it says only your number.',
      kind: 'SIDE',
      involvedCharacterIds: ['felix', 'rowan'],
      involvedLocationIds: ['the_library', 'the_yard', 'the_rook'],
      knownRewardCopy: 'Felix’s vote, and the Charter well enough to quote it at a master.',
      discoverWhen: { flagsSet: ['first_night_over'] },
      steps: [
        {
          id: 'give_him_evidence',
          playerCopy: 'Give Felix Lorne something to write in his ledger.',
          directorNotes:
            'Felix counts anything as evidence that he can watch happen. Working beside him in the Rolls Room is the richest route, because that is where the gap in the register is and he will show it to somebody who takes it seriously. Helping him in the yard, where he is worst, is the bravest. Watching her lose well also counts. Whatever route, he teaches her the Charter article by article as a side effect of being unable to stop talking.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'worked_the_rolls_with_him',
              label: 'Work through the register with him at night',
              predicate: { flagsSet: ['used:read_the_rolls', 'spoke:felix'] },
              setsFlags: ['vote:felix_yes', 'knows:the_gap_in_the_rolls'],
              closesFlags: [],
            },
            {
              routeId: 'taught_him_a_guard',
              label: 'Teach him a guard he can actually hold',
              predicate: {
                flagsSet: ['used:cross_blades'],
                minRelationship: [{ characterId: 'felix', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['vote:felix_yes', 'felix_held_a_guard'],
              closesFlags: [],
            },
            {
              routeId: 'he_watched_you_lose',
              label: 'Let him watch you lose well',
              predicate: { flagsSet: ['lost_to_rowan'] },
              setsFlags: ['vote:felix_yes'],
              closesFlags: [],
            },
            {
              routeId: 'demanded_his_ledger',
              label: 'Demand to read what he has written about you',
              predicate: { flagsSet: ['used:say_it_to_their_face', 'spoke:felix'] },
              setsFlags: ['read_his_ledger'],
              closesFlags: ['vote:felix_yes'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['felix_settled', 'knows:the_charter_by_heart'],
            abilities: ['invoke_the_charter'],
            reputation: [{ factionId: 'faction_masters', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_cadet_seventeen',
      title: 'Cadet Seventeen',
      summary: 'Thirty-one years ago somebody passed the Trial in a helm and was sent home after seven days. The register records a number and no name, and the sword on the armory’s back wall has no name on it either.',
      kind: 'LEAD',
      involvedCharacterIds: ['dunmore', 'orme', 'greaves', 'felix'],
      involvedLocationIds: ['the_armory', 'the_library', 'provost_house', 'the_chapel', 'the_cliff_walk'],
      knownRewardCopy: 'A name somebody cut out of the rolls, and what it means for the seventh morning.',
      discoverWhen: { flagsSet: ['knows:the_gap_in_the_rolls'] },
      steps: [
        {
          id: 'find_seventeen',
          playerCopy: 'Find out who Cadet Seventeen was.',
          directorNotes:
            'Optional, and it must feel optional: a player who never opens the register never sees a beat of this. For a player who is here, keep it physical and quiet: a rebound spine, a different black ink, a sword with nothing on the tang, a master who walks the sea wall every night to the same spot. Dunmore will only tell somebody who asks about the sword rather than about themselves. Orme will only tell somebody he respects enough to be ashamed in front of.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'dunmore_told_you',
              label: 'Dunmore tells you at the forge',
              predicate: {
                flagsSet: ['spoke:dunmore'],
                minRelationship: [{ characterId: 'dunmore', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['knows:cadet_seventeen', 'dunmore_told_you'],
              closesFlags: [],
            },
            {
              routeId: 'orme_confessed',
              label: 'Orme tells you on the sea wall',
              predicate: {
                flagsSet: ['spoke:orme'],
                atLocation: 'the_cliff_walk',
                minRelationship: [{ characterId: 'orme', dimension: 'respect', value: 60 }],
              },
              setsFlags: ['knows:cadet_seventeen', 'orme_confessed'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_page',
              label: 'Take the cut page from the Provost’s cabinet',
              predicate: { hasItems: ['cut_page'] },
              setsFlags: ['knows:cadet_seventeen', 'have_the_page'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['seventeen_found'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_with_a_name',
          playerCopy: 'Decide what to do with a name somebody cut out of the rolls.',
          directorNotes:
            'This is Dunmore’s story before it is the player’s, and every route should feel that. Reading the page aloud in the chapel is the loudest route and it exposes Greaves in front of the intake. Keeping her secret is a real choice and Dunmore will respect it more than anything else the player could do. Either way, if Dunmore trusts her, she takes the unmarked sword down and shows her the low guard a lighter fighter uses against a heavier one, which nobody has taught at Blackthorn in thirty years.',
          enterWhen: { flagsSet: ['knows:cadet_seventeen'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_it_in_the_chapel',
              label: 'Read the cut page aloud in the chapel',
              predicate: { hasItems: ['cut_page'], atLocation: 'the_chapel' },
              setsFlags: ['seventeen_restored', 'greaves_exposed'],
              closesFlags: ['kept_seventeens_secret'],
            },
            {
              routeId: 'she_showed_you_the_guard',
              label: 'Let Dunmore show you how she used to stand',
              predicate: {
                atLocation: 'the_armory',
                minRelationship: [{ characterId: 'dunmore', dimension: 'affection', value: 50 }],
              },
              setsFlags: ['seventeen_taught_you'],
              closesFlags: [],
            },
            {
              routeId: 'kept_her_secret',
              label: 'Keep her secret, and tell her you will',
              predicate: { flagsSet: ['used:hold_your_tongue', 'dunmore_told_you'] },
              setsFlags: ['kept_seventeens_secret'],
              closesFlags: ['seventeen_restored'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['knows:seventeens_guard', 'seventeen_answered'],
            abilities: ['seventeens_guard'],
            reputation: [{ factionId: 'faction_thornhollow', amount: 15 }],
          },
        },
      ],
    },
    {
      id: 'q_founding_tourney',
      title: 'The Founding Tourney',
      summary: 'On the tenth day the first-year lances ride against each other on the tilt field in front of the masters, the village and a royal observer. The winning lance carries the intake’s banner for a year. A lanceless cadet does not ride.',
      kind: 'MAIN',
      involvedCharacterIds: ['rowan', 'aren', 'gideon', 'felix', 'orme', 'greaves'],
      involvedLocationIds: ['the_tilt', 'the_stables'],
      knownRewardCopy: 'The intake’s banner, the stipend that goes with it, and the whole of Thornhollow watching.',
      discoverWhen: { flagsSet: ['taking_done'] },
      steps: [
        {
          id: 'ride',
          playerCopy: 'Ride in the Founding Tourney, or find out what it costs not to.',
          directorNotes:
            'The lances ride five against five in passes down the barrier. Legible, loud, fast, and nobody badly hurt. If she was taken, the four ride with her and how each of them rides is the payoff of the week. If she was not, the custom says she watches from the rail; she may ride anyway, alone, on a horse somebody lends her against orders, and who lends it matters more than whether she wins.',
          enterWhen: { flagsSet: ['taking_done'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'won_with_the_lance',
              label: 'Ride at the head of your lance and win',
              predicate: { flagsSet: ['tourney_day', 'taken', 'used:take_the_saddle'], atLocation: 'the_tilt' },
              setsFlags: ['won_the_tourney'],
              closesFlags: ['lost_the_tourney'],
            },
            {
              routeId: 'lost_with_the_lance',
              label: 'Ride with your lance and lose',
              predicate: { flagsSet: ['tourney_day', 'taken'], atLocation: 'the_tilt' },
              setsFlags: ['lost_the_tourney'],
              closesFlags: ['won_the_tourney'],
            },
            {
              routeId: 'rode_alone',
              label: 'Ride anyway, alone, with no lance',
              predicate: { flagsSet: ['tourney_day', 'lanceless', 'used:take_the_saddle'], atLocation: 'the_tilt' },
              setsFlags: ['rode_lanceless'],
              closesFlags: [],
            },
            {
              routeId: 'watched_from_the_rail',
              label: 'Watch from the rail',
              predicate: { flagsSet: ['tourney_day', 'lanceless'] },
              setsFlags: ['watched_from_the_rail'],
              closesFlags: ['rode_lanceless'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['tourney_done'],
            abilities: [],
            reputation: [
              { factionId: 'faction_masters', amount: 10 },
              { factionId: 'faction_thornhollow', amount: 10 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_conduct_unbecoming',
      title: 'Conduct Unbecoming',
      summary: 'Blackthorn expels any cadet who strikes a master, and treats steel drawn in anger outside the yard as the next worst thing. The Provost has been waiting since the chapel for you to give him that.',
      kind: 'SIDE',
      startsActive: true,
      involvedCharacterIds: ['greaves', 'orme', 'marr', 'rowan'],
      involvedLocationIds: ['provost_house', 'the_yard', 'the_chapel'],
      knownRewardCopy: 'Nothing good. This is what the masters do with an excuse.',
      steps: [
        {
          id: 'the_excuse',
          playerCopy: 'Do not hand the Provost his excuse.',
          directorNotes:
            'Violence is allowed in this world and has consequences in it. Striking a master ends the story by expulsion within a scene, coldly, through a hearing that takes ten minutes. Brawling with Marr outside the yard puts her on report and the Cold Watch for a week, and Marr will make sure there were witnesses. Striking one of her own lance outside the yard costs her that man’s vote. None of this is a lecture; it is the Provost being handed exactly what he asked for.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'struck_the_provost',
              label: 'Strike the Provost',
              predicate: { flagsSet: ['attacked:greaves'] },
              setsFlags: ['expelled'],
              closesFlags: ['taken'],
            },
            {
              routeId: 'struck_the_master_at_arms',
              label: 'Strike the Master-at-Arms outside the yard',
              predicate: { flagsSet: ['attacked:orme'] },
              setsFlags: ['expelled'],
              closesFlags: ['taken'],
            },
            {
              routeId: 'brawled_with_marr',
              label: 'Brawl with Marr outside the yard',
              predicate: { flagsSet: ['attacked:marr'] },
              setsFlags: ['on_report'],
              closesFlags: [],
            },
            {
              routeId: 'struck_rowan',
              label: 'Strike Rowan outside the yard',
              predicate: { flagsSet: ['attacked:rowan'] },
              setsFlags: ['on_report', 'struck_rowan'],
              closesFlags: ['vote:rowan_yes'],
            },
          ],
          rewards: {
            xp: 0,
            items: [],
            flags: ['conduct_reviewed'],
            abilities: [],
            reputation: [{ factionId: 'faction_masters', amount: -20 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_marr_at_lights_out',
      atWorldMinute: 22 * 60,
      locationId: 'the_rook',
      publicCopy:
        'Leopold Marr knocks once and comes straight in with three seniors and a lamp, to welcome the First Lance to Blackthorn.',
      directorNotes:
        'He is charming, loud, and here to announce that by tradition the newest member of a lance stands the Cold Watch on the sea wall on her first night, from midnight to four. It is a real tradition and it is usually waived for anybody with friends. He will be delighted by any reaction at all. If the fifth bed has already been carried back up, he notices it and is briefly, visibly annoyed.',
      setsFlags: ['marr_came_calling'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'marr', toLocationId: 'the_rook' }],
    },
    {
      id: 'we_the_dawn_bell',
      atWorldMinute: 1440 + 5 * 60 + 30,
      locationId: 'north_stair',
      publicCopy: 'The dawn bell goes, and sixty first-years hit the north stair at once.',
      directorNotes:
        'The Stair Run: ninety-six steps, narrow at the third landing, last one down scrubs the long hall. Seniors line the landings to watch. Whether anybody gives way to her at the narrow turn, or deliberately does not, is a small thing the whole intake will talk about at breakfast.',
      setsFlags: ['first_stair_run'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_ormes_pairing',
      atWorldMinute: 1440 + 7 * 60 + 10,
      locationId: 'the_yard',
      publicCopy:
        'Sir Matthias Orme walks the line of first-years in the yard, stops in front of you, and pairs you with Rowan Ashby.',
      directorNotes:
        'Orme pairs by rank, so this is simply the rule, and he says so in four words when anybody looks at him. Sixty cadets stop pretending to warm up. He writes in his ledger before either of them has moved.',
      setsFlags: ['paired_with_rowan'],
      cancelledByFlags: ['expelled'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rowan', toLocationId: 'the_yard' },
        { characterId: 'orme', toLocationId: 'the_yard' },
      ],
    },
    {
      id: 'we_the_steward',
      atWorldMinute: 2 * 1440 + 19 * 60,
      locationId: 'the_stables',
      publicCopy:
        'A man in the green livery of the Old Houses is waiting in the stables by Gideon’s horse, and he has not come to look at the horse.',
      directorNotes:
        'Lord Marshal Hargrave’s steward. He is polite, precise and brief: the Marshal sponsors Gideon’s horse, armour and fees, the Marshal takes an interest in the Taking, and the Marshal trusts Gideon will vote properly. Gideon says nothing at all while he is there and checks the horse’s shoes twice afterwards.',
      setsFlags: ['the_steward_came'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'gideon', toLocationId: 'the_stables' }],
    },
    {
      id: 'we_the_provosts_tea',
      atWorldMinute: 3 * 1440 + 15 * 60 + 30,
      locationId: 'provost_house',
      publicCopy: 'A servant finds you with a folded note: the Lord Provost would be glad of your company for tea at four.',
      directorNotes:
        'Greaves wants to look at her properly and to plant two things: that the Queen arranged everything, which is half true, and that he only wants her to be happy, which he believes. He will offer her an honourable way out, a place at a lesser academy with a royal letter, and he will be sincere about it. Refusing the invitation is allowed and he will regret it beautifully the next day at the high table.',
      setsFlags: ['invited_to_tea'],
      cancelledByFlags: ['expelled'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_the_cut_girth',
      atWorldMinute: 4 * 1440 + 13 * 60 + 20,
      locationId: 'the_tilt',
      publicCopy:
        'At the riding drill your saddle shifts under you at the first turn: the girth has been cut most of the way through, cleanly, on the side nobody checks.',
      directorNotes:
        'Two of Marr’s seniors went into the tack room on the third night; the stablehands know, and Gideon saw a senior’s boots in there. It should be survivable with a good ride and frightening without one. Orme sees it from the rail and stops the drill himself, which he has never done before.',
      setsFlags: ['girth_was_cut'],
      cancelledByFlags: ['slept_in_the_stables', 'expelled'],
      requiresFlags: ['first_drill_done'],
      movesCharacters: [{ characterId: 'orme', toLocationId: 'the_tilt' }],
    },
    {
      id: 'we_the_story_in_the_hall',
      atWorldMinute: 5 * 1440 + 12 * 60 + 15,
      locationId: 'the_hall',
      publicCopy: 'By midday the whole hall is saying the Queen fixed the Trial for you, and three people say it within your hearing.',
      directorNotes:
        'Greaves’s half-truth, spread by Marr’s friends. It is the moment each of the four has to decide in public whether to repeat it, ignore it, or contradict it, and each of them does something different. Felix contradicts it with citations and makes it worse.',
      setsFlags: ['the_story_spread'],
      cancelledByFlags: ['expelled'],
      requiresFlags: [],
      movesCharacters: [],
    },
    {
      id: 'we_felix_finds_the_gap',
      atWorldMinute: 5 * 1440 + 21 * 60,
      locationId: 'the_rook',
      publicCopy: 'Felix comes up the stair at a run with a volume of the register under his arm, and shuts the door behind him.',
      directorNotes:
        'Only for a player who has been talking to him. He has found line seventeen, thirty-one years back, with no name and a different black ink, and he needs to show somebody who will not laugh. He is frightened and trying to be precise about it.',
      setsFlags: ['knows:the_gap_in_the_rolls'],
      cancelledByFlags: ['knows:the_gap_in_the_rolls', 'expelled'],
      requiresFlags: ['spoke:felix'],
      movesCharacters: [{ characterId: 'felix', toLocationId: 'the_rook' }],
    },
    {
      id: 'we_the_taking',
      atWorldMinute: 7 * 1440 + 9 * 60,
      locationId: 'the_chapel',
      publicCopy: 'The chapel bell rings for the Taking, and the whole intake files into the pews to watch the First Lance vote.',
      directorNotes:
        'The Provost presides from his stall. Orme stands at the back. Dunmore is in the last pew, which she has never once been in on a Taking morning. The four stand in rank order and each says one word. Whatever the count, nobody in the pews makes a sound until the Provost speaks.',
      setsFlags: ['taking_day'],
      cancelledByFlags: ['expelled'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rowan', toLocationId: 'the_chapel' },
        { characterId: 'aren', toLocationId: 'the_chapel' },
        { characterId: 'gideon', toLocationId: 'the_chapel' },
        { characterId: 'felix', toLocationId: 'the_chapel' },
        { characterId: 'greaves', toLocationId: 'the_chapel' },
        { characterId: 'orme', toLocationId: 'the_chapel' },
        { characterId: 'dunmore', toLocationId: 'the_chapel' },
      ],
    },
    {
      id: 'we_the_founding_tourney',
      atWorldMinute: 10 * 1440 + 10 * 60,
      locationId: 'the_tilt',
      publicCopy: 'The stands on the tilt field are full by ten: masters, seniors, half of Thornhollow, and a royal observer under a blue awning.',
      directorNotes:
        'The royal observer is there to see one cadet. The village has come up the hill for the first time anybody can remember. Marr is officiating at the barrier. Whether she rides, and with whom, is already decided by the seventh morning; what happens on the field is not.',
      setsFlags: ['tourney_day'],
      cancelledByFlags: ['expelled'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'rowan', toLocationId: 'the_tilt' },
        { characterId: 'aren', toLocationId: 'the_tilt' },
        { characterId: 'gideon', toLocationId: 'the_tilt' },
        { characterId: 'felix', toLocationId: 'the_tilt' },
        { characterId: 'orme', toLocationId: 'the_tilt' },
        { characterId: 'greaves', toLocationId: 'the_tilt' },
        { characterId: 'marr', toLocationId: 'the_tilt' },
        { characterId: 'dunmore', toLocationId: 'the_tilt' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_taking',
      kind: 'FINALE',
      label: 'Whether your lance takes you',
      seedHint: 'A clean square of floor behind a canvas partition, where a fifth bed should be.',
      payoffHint: 'Four men stand up in the chapel one at a time and say yes or no out loud.',
      weight: 1,
    },
    {
      id: 'p_second_by_four',
      kind: 'RIVAL',
      label: 'Second by four points',
      seedHint: 'A sword across his knees, and the first word he says to you is "wrong".',
      payoffHint: 'A rematch in front of the whole intake, and what Rowan does with the result.',
      weight: 0.9,
    },
    {
      id: 'p_the_number_with_no_name',
      kind: 'MYSTERY',
      label: 'The number with no name',
      seedHint: 'A sword on the armory wall with nothing stamped on the tang.',
      payoffHint: 'A page cut out of the rolls thirty-one years ago, and a woman who has worked inside these walls ever since.',
      weight: 0.6,
    },
    {
      id: 'p_what_the_queen_wrote',
      kind: 'RELATIONSHIP',
      label: 'What the Queen wrote to her son',
      seedHint: 'Black flakes of a royal seal in the Rook’s hearth, which nobody has stirred.',
      payoffHint: 'Four words in his mother’s hand, and whether he obeys them.',
      weight: 0.75,
    },
    {
      id: 'p_what_a_yes_costs',
      kind: 'THEME',
      label: 'What a yes costs a man with no money',
      seedHint: 'Gideon checks his horse’s shoes twice a night and does not sleep.',
      payoffHint: 'A lord’s purse, a steward in green, and a vote that costs Gideon his horse unless somebody finds another way.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_old_knight',
      name: 'The Old Knight’s Yard',
      role: 'Sword and footwork',
      summary: 'A retired knight taught you the sword behind a roadside inn every morning for ten years, so you fight the way a knight was trained to, because one trained you.',
      playstyle: ['Swordplay', 'Direct', 'Proud'],
      blurb: 'He never once asked why you wanted to learn. He only ever said "again", and you only ever did.',
      attributeBonus: { agility: 3, resolve: 1 },
      skillProficiencies: { swordwork: 3, composure: 1 },
      startingItems: [{ itemId: 'old_knights_blade', qty: 1 }],
      startingAbilities: ['cross_blades', 'outwork_them', 'say_it_to_their_face'],
      startingReputation: [],
    },
    {
      id: 'arch_horse_fairs',
      name: 'The Horse Fairs',
      role: 'Riding and reading people',
      summary: 'You grew up trading horses at the border fairs, where you learned to ride anything with four legs and to tell when a man is lying about a horse, which is most of the time.',
      playstyle: ['Rider', 'Perceptive', 'Quick-tongued'],
      blurb: 'You can tell a horse’s age from its teeth and a man’s intentions from his hands, and the second one has been more useful.',
      attributeBonus: { agility: 2, presence: 2 },
      skillProficiencies: { riding: 3, instinct: 2 },
      startingItems: [{ itemId: 'plaited_bridle', qty: 1 }],
      startingAbilities: ['cross_blades', 'take_the_saddle', 'read_the_yard'],
      startingReputation: [{ factionId: 'faction_thornhollow', amount: 10 }],
    },
    {
      id: 'arch_caravan_guard',
      name: 'The Caravan Guard',
      role: 'Endurance and close fighting',
      summary: 'Three years guarding salt wagons on the coast road taught you to fight tired, cold and outnumbered, and to keep walking afterwards.',
      playstyle: ['Tough', 'Close-quarters', 'Unflashy'],
      blurb: 'Nobody on the coast road ever asked whether you were allowed to hold a sword. They only asked whether you would still be holding it at dawn.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { endurance: 3, swordwork: 1, composure: 1 },
      startingItems: [{ itemId: 'caravan_knife', qty: 1 }],
      startingAbilities: ['cross_blades', 'outwork_them', 'break_bread'],
      startingReputation: [],
    },
    {
      id: 'arch_campaign_books',
      name: 'The Campaign Books',
      role: 'Tactics and the written law',
      summary: 'You read every campaign history in your town’s library twice and taught yourself the sword from the diagrams. You won the tactics bout outright and came second on the written paper.',
      playstyle: ['Tactical', 'Studious', 'Patient'],
      blurb: 'The scholar who beat you on the paper has not forgiven you for coming that close, and you have not forgiven him for the one question you got wrong.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { tactics: 3, records: 2 },
      startingItems: [{ itemId: 'campaign_book', qty: 1 }],
      startingAbilities: ['cross_blades', 'read_the_rolls', 'read_the_yard'],
      startingReputation: [{ factionId: 'faction_masters', amount: 5 }],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on the roll?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Talia Brennan' },
    {
      id: 'pronouns',
      label: 'Pronouns',
      kind: 'TEXT',
      required: false,
      maxLength: 24,
      placeholder: 'e.g. she/her',
      helpText: 'You play the first woman Blackthorn has ever admitted, and everyone here calls you she.',
    },
    {
      id: 'archetype',
      label: 'Who taught you to fight?',
      helpText:
        'Where your skill came from before the Trial, which sets what you are best at here. It is fixed for the whole story and stays with you. It does not decide how you handle the Rook, whom you trust, or how anybody votes; all of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the intake already know about you?',
      helpText: 'One plain sentence is the right amount. Everybody saw the helm come off; this is whatever else got round.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. I broke a candidate’s shield in the Trial, and I apologised to him afterwards, which somehow made it worse.',
    },
    {
      id: 'why_you_came',
      label: 'Why did you sit the Trial?',
      helpText: 'A reason to hold in mind. Nobody at Blackthorn knows it unless you tell them in the story.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'to_be_a_knight', label: 'Because I wanted to be a knight, and that was all' },
        { id: 'to_prove_it', label: 'To prove it could be done' },
        { id: 'for_someone', label: 'For somebody who was not allowed to' },
        { id: 'for_the_stipend', label: 'For the stipend. My family needs it' },
        { id: 'not_sure', label: 'I am still working that out' },
      ],
    },
    {
      id: 'appearance',
      label: 'What did the chapel see when the helm came off?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Cropped dark hair, a nose that healed crooked, and a look that made the Provost stop mid-sentence.',
    },
  ],
  protagonist: {
    kind: 'BLANK',
    name: '',
    pronouns: '',
    description: '',
    setupHeading: 'Who took the helm off?',
    portrait: null,
  },
  /**
   * Where this can end up. Twelve, because the storyteller reads the first
   * twelve and no more.
   *
   * Two of these are the custom winning, and neither is written as the
   * player's failure. "Sent Home With Thanks" needs nothing but the seventh
   * morning arriving with fewer than three votes, so it is reachable by a
   * player who did nothing wrong; "The Road Down" is walking out first. One is
   * the player handing the Provost his excuse. Four are romances, one per
   * roommate, and none requires the others to have failed.
   *
   * Only "Seventeen" needs the optional mystery. Everything else is reachable
   * by a player who never opens the register.
   */
  endings: [
    {
      id: 'end_taken',
      name: 'Taken',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['taken'], flagsUnset: ['expelled', 'left_the_map'] },
      condition:
        'The lance took you, by three votes or by four, and you sleep in the Rook as a member of it rather than a guest. Play it as relief more than triumph: a bed carried back up, a seat at the table nobody comments on, Orme writing your bouts in the ledger in the same ink as everybody else’s. Whoever voted no should still be at breakfast and should still be awkward about it.',
      epilogue:
        'The fifth bed goes back behind the partition and stays there. By midwinter the partition has a coat hung on it, then four, and nobody can remember who started that. The number at the top of the yard board gets scraped off twice more before spring and repainted twice, the second time by somebody else.',
      hint: '',
    },
    {
      id: 'end_first_seat',
      name: 'First Seat',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['taken', 'won_the_tourney'], flagsUnset: ['expelled'] },
      condition:
        'Taken, and then the lance won the Founding Tourney with you at its head. Write the tilt field: the stands, the royal observer, the moment the masters have to hand the intake’s banner to a woman in front of the whole village. Nobody gives a speech about it. The Provost hands the banner over himself and is perfectly courteous.',
      epilogue:
        'The Thorn Pin turns up on the Provost’s desk the next morning, mislaid no longer. You wear it to breakfast. Thornhollow sends up a cake nobody ordered with a 41 on it in currants, and the whole intake eats it, including Rowan, who says it is dry and has three slices.',
      hint: 'The winning lance carries the banner for a year.',
    },
    {
      id: 'end_sent_home',
      name: 'Sent Home With Thanks',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['lanceless'], flagsUnset: ['rode_lanceless', 'taking_struck_down'] },
      condition:
        'Nobody took you. This must not be written as your failure or as a punishment: you were good enough, the Charter let you in, and a custom with no name on it put you out again, the way it has before. Write the last days honestly: the common barracks, the tourney from the rail, the masters’ thanks. Somebody who voted no has to watch you pack.',
      epilogue:
        'The register says: sent home with thanks. It does not say ranked first. Two springs later another woman sits the Trial in a helm, because she heard what happened to you, and her lance takes her on the first morning, four to nothing.',
      hint: '',
    },
    {
      id: 'end_lanceless',
      name: 'Lanceless',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['rode_lanceless'] },
      condition:
        'Nobody took you, and you rode in the Founding Tourney anyway, alone, against lances of five, on a horse somebody lent you against orders. Whether you won matters less than who lent the horse and who in the stands stood up. Write it as defiance with a price: the Provost now has an excuse, and everybody watched him decide whether to use it.',
      epilogue:
        'You are sent home at the end of term, as custom requires. You leave by the Thorn Gate on the borrowed horse, and the whole of Thornhollow is in the street, and at the back of it, saying nothing, is a man in a master’s black coat with a ledger under his arm.',
      hint: '',
    },
    {
      id: 'end_the_charter_stands',
      name: 'The Charter Stands',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['taking_struck_down'], flagsUnset: ['expelled'] },
      condition:
        'You stood on the chapel floor and read the Charter back to the masters: admitted, ranked and housed, and not one word about a vote. The Taking was custom, and custom lost. Write the consequence for everybody, not only you: there are three other cadets in the intake whose lances were not going to take them either, and they will never know your name was the reason.',
      epilogue:
        'The Taking is not abolished. It is suspended pending review, which at Blackthorn means forever. Felix writes it up for his history in eleven pages and a footnote. The footnote is longer.',
      hint: 'The Charter is eleven articles long.',
    },
    {
      id: 'end_seventeen',
      name: 'Seventeen',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['seventeen_restored'] },
      condition:
        'The cut page was read aloud in the chapel and a name went back into the rolls after thirty-one years: Margery Holt, ranked ninth. Write Dunmore in the last pew and Orme standing up at the back. The Provost does not resign that day; he resigns at the end of term, by letter, citing his health. This ending is about her, not you.',
      epilogue:
        'The armory’s back wall has a gap in it. The sword is in the rack by the door now with a name stamped on the tang, and on the last day of term Dunmore takes it down and walks the length of the yard with it once, in front of everybody, and puts it back. Orme watches from the rail and, for once, writes nothing down.',
      hint: 'The sword on the armory wall has no name on it.',
    },
    {
      id: 'end_the_road_down',
      name: 'The Road Down',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['taken'] },
      condition:
        'You walked out of the Thorn Gate on your own terms before anybody could vote you out. This is not cowardice and must not be written as it. It is a coherent answer to a place that moved your bed, and the people it costs most are the ones who were about to say yes.',
      epilogue:
        'The fifth bed stays in the stables until spring, when a stablehand quietly takes it home. In the Rook, four men argue for a week about whose fault it was and never agree. Rowan takes the Thorn Pin after all, and wears it like a splinter.',
      hint: '',
    },
    {
      id: 'end_struck_from_the_rolls',
      name: 'The Ten-Minute Hearing',
      rarity: 'UNCOMMON',
      minTurn: 8,
      requires: { flagsSet: ['expelled'] },
      condition:
        'You struck a master, and the Provost got exactly what he had been waiting for. Write it quickly and coldly: a hearing that takes ten minutes, a clerk with a knife at the register, the gate. It is neither a triumph nor a sermon. People who were on your side have to watch it, and some of them say so out loud.',
      epilogue:
        'Your line in the register is cut out the same way another one was, thirty-one years earlier, by the same hand. This time somebody notices. It takes Felix four years to prove it, and when he does, both pages go back.',
      hint: '',
    },
    {
      id: 'end_second_to_you',
      name: 'Second to You',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['rowan_settled', 'taken'],
        minRelationship: [{ characterId: 'rowan', dimension: 'affection', value: 70 }],
      },
      condition:
        'Rowan stopped calling you First as an insult and started saying it like a name, and then said your real name, once, on the sea wall. Rivals into something else: the sparring stays sharp, the kiss happens where the wind is too loud for anybody to hear what was said before it, and he still wants the rematch afterwards.',
      epilogue:
        'He never does beat you in the yard. He gets within a point twice that year and calls it a draw both times, loudly, to anybody who will listen. The Ashby manor is sold in the spring after all, and his mother writes that she is relieved. Nobody expected that, least of all him.',
      hint: '',
    },
    {
      id: 'end_nothing_arranged',
      name: 'Nothing Arranged',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['aren_chose_for_himself'],
        minRelationship: [{ characterId: 'aren', dimension: 'affection', value: 72 }],
      },
      condition:
        'Aren voted as himself, then told his mother so in a letter he let you read before he sealed it. The romance is formal, restrained and very funny underneath: a prince who has never once been allowed to want anything, choosing to, in front of you. If there is a kiss, it comes after he has asked permission in a full sentence.',
      epilogue:
        'The Queen’s reply arrives a week later and says only: Noted. He laughs for the first time anybody in the tower has heard, and has to sit down.',
      hint: '',
    },
    {
      id: 'end_the_other_end',
      name: 'The Other End',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['gideon_settled'],
        flagsUnset: ['gideon_spared'],
        minRelationship: [{ characterId: 'gideon', dimension: 'affection', value: 75 }],
      },
      condition:
        'Gideon voted yes knowing what it might cost him, and you made sure it did not cost him everything. Gentle and unhurried: the forge before dawn, the stables at night, a man who asks before he helps, until the day you tell him he does not need to. If there is a kiss it is brief and certain and followed by him hitting his head on a doorframe.',
      epilogue:
        'He keeps the horse. He also keeps the habit of checking its shoes twice a night, and now somebody goes with him. Dunmore lends him the forge for a week in summer, and the two of you make a new brass plate for the foot of the fifth bed, with your name on it.',
      hint: '',
    },
    {
      id: 'end_a_footnote',
      name: 'A Footnote',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['felix_settled'],
        flagsUnset: ['read_his_ledger'],
        minRelationship: [{ characterId: 'felix', dimension: 'affection', value: 70 }],
      },
      condition:
        'Felix got his evidence and then kept looking for more, which is how you know. Fast-talking and flustered and brave at exactly the wrong moment: he confesses in the middle of an argument about article nine, then immediately cites his source. A kiss stops him talking, which nobody else has ever managed.',
      epilogue:
        'His history of Blackthorn runs to six hundred pages. You are in eleven of them and a footnote. The footnote is the only part of the book that is not about the academy, and the masters ask him to cut it, and he refuses, in writing, with citations.',
      hint: '',
    },
  ],
  opening:
    "Four beds. Behind a canvas partition, a clean square of floor where the fifth should be.\n\nFour cadets look up at you.\n\n\"Wrong room,\" says the one in the window seat, sword across his knees. Rowan. Second in the entrance trial. Second to you.\n\n\"Right room,\" says the one with the signet ring. Aren. \"She ranked first. The board is the board.\"\n\nThe biggest holds out a hand the size of a shield. \"Gideon.\"\n\nThe fourth turns a page and says nothing.\n\nRowan nods at the clean square. \"Porters took your bed to the stables at dawn. We vote on you in seven days. Last night nobody said yes.\"\n\nHe looks at you. \"So where are you sleeping tonight?\"",
  openingPanel: {
    assetKey: 'story_the_only_girl_at_blackthorn/opening',
    alt: 'Rowan on the window seat inside a round stone dormitory with four narrow beds at dusk, sword across his knees, looking up at you; three cadets on the beds, a canvas partition hiding a bare corner.',
  },
  openingSuggestions: [
    "\"Then I’m carrying it back up. Who wants the other end?\"",
    'I take Gideon’s hand and shake it.',
    'I drop my bag on Rowan’s bed and sit down.',
  ],
  coverDirection: [
    'SUBJECT: four men in grey cadet coats in their tower room at a knight academy, seen from the doorway as if the viewer has just walked in, in a key visual for a fantasy academy romance.',
    'Rowan dominates the foreground, left of centre, close and large, holding about half the picture: sitting sideways in a deep stone window seat, one boot up on the ledge, a plain steel sword laid across his knees.',
    'Black hair cut short and ragged, a narrow sharp face, dark eyes, a high-collared grey wool cadet coat open at the throat and creased, black riding boots.',
    'He looks straight at the viewer with one eyebrow raised, sardonic and challenging, not smiling.',
    'BEHIND HIM, staggered at different depths and never in a line:',
    'on the right, a huge broad-shouldered man with close-cut brown hair and a short beard ducks under a low oak beam, one big forge-scarred hand held out toward the viewer, his face warm and calm;',
    'in the middle distance, a tall straight-backed man with fair hair tied at the nape stands with both hands flat on a writing table, a gold signet ring on one hand, cool grey eyes, composed;',
    'at the back, a slight man with untidy chestnut curls and wire spectacles peers over a tall stack of books, a pencil behind each ear, curious.',
    'All four wear the same high-collared grey wool cadet coat. Nobody else is in the picture.',
    'SETTING, soft and secondary: a round stone tower room at dusk, narrow arched windows onto a cold grey sea, practice swords in a wall rack, a lit hearth.',
    'LIGHT: cold blue-grey sea light from the windows behind them and warm amber firelight from the hearth, so each of them is rimmed in blue and lit in gold.',
    'The last of the daylight runs along the edge of Rowan’s sword in one bright white glint.',
    'FACES STAY CLEAN: no glints, shadows, marks or effects across any face. Every light effect stays on the steel and on the title, never on a face.',
    'TITLE: the words The Only Girl at Blackthorn painted into the art in the upper third, over the windows above their heads, as an engraved knightly serif logo in capitals, forged silver with a cold steel-blue edge and a thin black iron thorn vine curling through the letters.',
    'THE ONLY GIRL AT on a smaller line on top, BLACKTHORN large beneath it, and a single cold glint running across the word BLACKTHORN only.',
    'Spelled exactly The Only Girl at Blackthorn, large and legible at thumbnail size. No other text anywhere: no numbers, no writing on the books, the coats or the walls.',
  ].join(' '),
  publishedAt: null,
};

export const THE_ONLY_GIRL_AT_BLACKTHORN = StoryVersion.parse(raw);

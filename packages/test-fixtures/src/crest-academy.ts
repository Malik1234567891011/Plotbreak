import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Crest Academy" — a harem academy with stats, where the stat window is a
 * choice under pressure rather than a menu.
 *
 * Bible: `docs/story-bibles/new50/14_CREST_ACADEMY.md`. Slate #14, drop 1.
 *
 * Playable span: seven days at one academy on a cliff, from the first duel at
 * nine on the first morning to the count in Founders’ Hall on the seventh
 * evening. Week’s End, when twelve governors watch the open duels and then vote
 * on ending the scholarship, is the spine. Everything after the count lives in
 * the endings.
 *
 * Two engines. The first is the crest: five numbers every student wears over
 * the heart, and a sixth line only the player’s has — five unspent points they
 * can spend at any moment, including halfway through a swing. The second is
 * the Ring Code, which the whole cast argues about: lose and your crest pays a
 * point, yield and you serve for up to a year, read zero in any line and you
 * go home that day. Every person in the cast has a different relationship to
 * those three sentences, and clause nine — nobody may challenge somebody who is
 * serving under yield terms — is what turns the rival’s insult in the opener
 * into a shield.
 *
 * The system has to live where the storyteller can read it. Production runs
 * `runTurnPure`, which reads the premise, tone guide, hard canon, cast,
 * opening, style examples, places, quest items, factions, quest summaries,
 * world events and endings, and only the chosen archetype’s starting
 * abilities. So the crest is a quest item the player starts holding, the Ring
 * Code is spelled out in hard canon, and every archetype starts with Spend a
 * Point.
 *
 * Grant broadly, gate by flag: Brannoch’s counter (`knows:gate_counter`) and
 * giving a point back (`knows:the_five`) are each granted by exactly one step.
 *
 * Three invisible variables. Stamina is the one honest GOOD_HIGH, because
 * `resolveRest` refills those. Censure comes first among the descending pair
 * on purpose: public violence raises the first GOOD_LOW in array order, and a
 * fight outside the Ring is an expulsion offence before it is anything else.
 * Marked is how hard the Rail Society is coming for the scholar.
 */

const raw = {
  id: 'sv_crest_academy_1',
  storyId: 'story_crest_academy',
  version: 1,
  title: 'Crest Academy',
  fantasyLabel: 'Five points to spend. Ten seconds left.',
  hook: 'Four hundred nobles and one commoner a year. You get five stat points and a ten-count before your first duel, and the crowd is already betting on how long you last.',
  premise:
    'Crest Academy sits on a cliff above the imperial capital and takes four hundred students, nearly all of them noble. Each wears a crest: a silver badge over the heart that opens a small window of light with five numbers in it. Strength, Speed, Mana, Guard, Charm. A good student reads five. The best of a year reads seven.\n\n' +
    'Once a year the academy admits one commoner: whoever wins an exam that four thousand people sit across the provinces. This year that is you. Your crest opened this morning at two in every line, plus something no other crest in the academy has. Five unspent points, yours to place in any line at any moment, even halfway through a swing.\n\n' +
    'The Ring Code settles everything here. Any student may challenge you once a week. Lose, and your crest pays the winner a point. Yield before the first exchange, and you serve your challenger for up to a year. If any line ever reads zero, you leave the academy that day.\n\n' +
    'Twenty-seven commoners came before you. Only the first graduated. Since him, the noble duellists who run the challenge board have kept a wager book on how many days each scholar lasts. The record is seventy-one. In seven days the governors vote on ending the scholarship for good.\n\n' +
    'Your first duel starts on a count of ten. The noblewoman across the sand has never lost.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Academy', 'Fantasy', 'Stats', 'Rivalry', 'Romance', 'Comedy'],
  mechanicsChips: [
    'Five points, spend them any time',
    'Duel for stat points',
    'Yield and serve for a year',
    'Hit zero and you are out',
    'A vote at week’s end',
  ],
  contentDescriptors: ['FANTASY_VIOLENCE', 'ROMANCE', 'MORAL_AMBIGUITY', 'ALCOHOL_REFERENCES'],
  intensity: 'MODERATE',
  creatorNote:
    'You have the lowest numbers in the academy and are the only person alive who can change your numbers mid-fight. You can yield and carry a noblewoman’s books for a year, spend all five points on Charm and talk your way through the week, or find out what the duelling society writes in its little book. Everybody in the Ring has an opinion about where your points should go.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: true,
    allowsRomance: true,
    startingLocationId: 'the_ring',
    startWorldMinute: 9 * 60,
    startingItems: [
      { itemId: 'scholarship_crest', qty: 1 },
      { itemId: 'admission_letter', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. Crest Academy admits nobody under eighteen. The player is nineteen. Lady Seraphine Aldric is twenty, Mio Fenn twenty-one, Princess Isolde twenty-one, Instructor Brannoch forty-seven, Lord Ansel Varro twenty-two and Lord Piers Hallam twenty. Off stage, Seraphine’s father Lord Marshal Corvin Aldric is fifty-four, Headmistress Ottilie Brask sixty-six, and Varro’s mother Lady Governor Maud Varro forty-nine.',
      'Crest Academy is the Empire of Vael’s duelling academy, where nobles learn the blade and the spell, on a cliff above the imperial capital. Four hundred students over three years, almost all of them noble. The Ring, a sand duelling circle at its centre, decides most things that matter here.',
      'Every student wears a crest: a silver badge pinned over the heart, issued on the first day, that reads its wearer and opens a small window of light with five lines. Strength is force. Speed is footwork and reaction. Mana is how much sorcery you can cast and how large. Guard is taking a hit and holding a ward. Charm is how easily you are heard, believed and noticed; it never makes anybody like you. Anyone may ask to see a crest, and anyone may refuse.',
      'The crest scale: one is an untrained adult, three a trained soldier, five a good student, seven the best of a year, nine an imperial champion, ten the most a crest can show. A crest counts only what was trained while wearing one. Nobles train under tutors’ crests for years before they arrive, so a noble first-year reads four to six in most lines. Training raises a line about one point a season; nobody gains a point in a week except by winning one in the Ring.',
      'The player is this year’s only commoner scholar, the winner of the Open Trial, an exam four thousand people sat across the provinces. Their scholarship crest opened this morning at 2 in every line with five unspent points, and it is the only crest in the academy that can hold unspent points. The player can put them into any line at any moment, one at a time or all at once, even mid-swing. A spent point arrives as a cold rush through the body, then the new number. Spent points are permanent. The official story is that the five are the founder’s allowance.',
      'The Ring Code: any student may challenge any other once a week. Duels happen only in the Ring; fighting anywhere else is an expulsion offence. Six ward-stones in the Ring’s rails blunt steel and spell to bruises, so nobody is maimed. A duel ends at the first clean touch, at a yield, at the instructor’s call, or when the minute-glass runs out, which is a draw and moves no point. The loser’s crest pays the winner one point and the winner chooses the line. On the scholarship crest a won point arrives as a new unspent point. A challenged student who does not turn up forfeits and pays the point anyway. An expulsion offence is heard by the Headmistress, not settled on the spot: a first fight outside the Ring brings a summons and a prefect at the scholar’s elbow; a second, or real harm, ends in expulsion.',
      'Yielding: the challenged may yield before the first exchange. No point moves, but the yielder serves the challenger on terms the challenger names: no harm, no money, nothing indecent, no longer than a year. Service can also be entered later by agreement, on terms the other student names, and counts the same. Clause nine: nobody may challenge a student who is serving under yield terms, and a server who issues a challenge ends their own service. Clause fourteen: no challenges in concert; students may not coordinate to drain one crest. The Charter: a crest that reads zero in any line means its wearer leaves the academy the same day.',
      'The Rail Society is forty noble duellists, captained by Lord Ansel Varro, who run the challenge board in the Great Hall, called the Ladder. In the Rail Room above the Ring they keep the Purse, a wager book on how many days each commoner scholar lasts. Twenty-six scholars since the first, twenty-six lines, all ended. The record is seventy-one days.',
      'Last year’s scholar was Mio Fenn. She lasted nineteen days. Varro paid three proxies, Piers Hallam among them, and between forfeits and duels they took her Mana line to zero in one afternoon. That breaks clause fourteen, and the payments are written in the Purse in Varro’s hand. Mio took the maid-knight oath to stay inside the walls and asked to be assigned to this year’s scholar. Few people remember who she was, and she does not say.',
      'The five unspent points come from Instructor Halden Brannoch, master of the Ring. He was the first scholar, twenty-eight years ago, and the only one who ever graduated. Every year since, under the Headmistress’s seal, he has moved five points from his own crest into the scholarship crest, and every year he trains them back and never quite catches up. It is written in the transfer register in Founders’ Hall. He has told nobody. Points move between crests only under that seal.',
      'As a scholar, Brannoch invented a counter that turns an opponent’s higher number against them: the wider the gap, the harder it lands. He has never taught it to anybody, and will teach it only to somebody who has kept the Code when it cost them.',
      'The scholarship was founded by the late Empress, Princess Isolde’s mother, who was born a commoner; few people remember that. On the seventh day, at two in the afternoon, the twelve governors watch the open duels in the Ring and then vote in Founders’ Hall on ending the scholarship. Lady Governor Maud Varro brought the motion. Isolde may speak but has no vote. Five governors came to end it, four to keep it, and three will decide on what they see.',
      'Seraphine challenged the scholar on purpose. A yield would put them under clause nine for a year, where no other student, Varro included, may challenge them. She will never say so where the Society can hear, because her father would call it softness. When she wins a point she takes it from her opponent’s highest line, never the lowest.',
      'The week runs on its own. At one in the afternoon of the first day three Society challenges against the scholar go up on the Ladder for the next day, unless the scholar is serving under yield terms. The Lord Marshal rides in on the fifth day, the governors arrive on the sixth, and Week’s End is the seventh.',
    ],
    toneGuide:
      'Academy anime with the stat window switched on: fast, competitive, funny, and exact about the rules. The player has the lowest numbers in the Ring on paper and is the only person alive who can change their numbers mid-fight, and the comedy is that everybody has an opinion about where the points should go. ' +
      'Crest lines appear in the prose as short bracketed lines, only when somebody opens a crest, never as tables. Track the player’s five lines and unspent points from the transcript and never contradict them: a spent point stays spent, a lost point stays lost, and a won point arrives as a new unspent one. ' +
      'Duels are short, physical and readable: footwork, a blade, a spell, the rail shouting the count. The ward-stones turn every blow into a bruise, so there is no blood and no gore. A fight outside the Ring is a scandal and people react like it is one. ' +
      'Narration uses contractions, and so do most voices. Seraphine never does; her full, formal sentences are how the reader knows it is her. ' +
      'Romance is flirtatious, tense and earned, and goes no further than a kiss. Nobody is a prize and nothing is fan service: Seraphine, Mio and Isolde each want something specific from the player, and each can say no. Never linger on bodies. ' +
      'Secrets are earned, never announced: where the five points come from, who Mio used to be, why Seraphine chose the scholar, what the Purse records, who Isolde’s mother was. The face at the top of a beat belongs to whoever reacted to the player most strongly.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Seraphine comes in low, faster than anything you’ve ever seen move.\n\nYou spend a point.\n\nCold runs down both arms like well water.\n\n[Speed 3]\n\nIt isn’t enough. It’s almost enough. Her blade skims your sleeve instead of your ribs, and the whole rail goes quiet.\n\n"You spent a point," she says. "During my lunge."\n\n"It seemed like the moment."\n\n"It was." She resets her feet. "Do it again, scholar. Sooner."',
      'Mio sets the tray on the winch housing, because the gatehouse room has no table.\n\n"Supper is at seven," she says. "Your crest is at two. I can fix one of those."\n\n"Which one?"\n\n"Supper." She lifts the lid. Stew, bread, an apple cut into eight. "The other one is your job."\n\nShe glances at the door. Then she goes and slides the bolt across it, and doesn’t explain.',
      'Isolde peels an orange in one long ribbon and doesn’t offer you any.\n\n"Suppose I told you," she says, "that three of the twelve governors haven’t made up their minds."\n\n"Which three?"\n\n"That’s the interesting part." The ribbon drops into a dish. "They’re waiting to see whether you’re still standing on the seventh day. Are you planning to be?"',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 10, agility: 10, mind: 11, presence: 10, resolve: 11, arcana: 9 },
  skills: [
    { id: 'swordwork', name: 'Swordwork', attribute: 'might', description: 'Putting a blade where you meant it, hard enough to count as a touch.' },
    { id: 'footwork', name: 'Footwork', attribute: 'agility', description: 'Being somewhere else when the blade arrives, and somewhere better after.' },
    { id: 'spellwork', name: 'Spellwork', attribute: 'arcana', description: 'Small sorcery cast clean under pressure: a flare, a push of air, a ward on the sand.' },
    { id: 'bracing', name: 'Bracing', attribute: 'resolve', description: 'Taking the hit, holding the ward, and still standing when the rail stops shouting.' },
    { id: 'nerve', name: 'Nerve', attribute: 'resolve', description: 'Saying no to somebody who outranks you, and standing still while they react.' },
    { id: 'the_code', name: 'The Code', attribute: 'mind', description: 'Knowing the clause everyone in the Ring is relying on nobody having read.' },
    { id: 'reading', name: 'Reading People', attribute: 'mind', description: 'A duellist’s habits, a crowd’s mood, a noble’s real price.' },
    { id: 'talking', name: 'Talking', attribute: 'presence', description: 'Being heard and believed by a room that did not want to hear you.' },
    { id: 'sneaking', name: 'Slipping Through', attribute: 'agility', description: 'Getting into a room a scholar is not supposed to be in, and out again.' },
  ],
  /**
   * Three, all invisible.
   *
   * Stamina is the only GOOD_HIGH, so resting restores a body and nothing else.
   * Censure and Marked descend. Censure is the academy’s patience, and comes
   * first because public violence raises the first GOOD_LOW in array order and
   * a fight outside the Ring is an expulsion offence. Marked is the Society of
   * the Ring’s attention: every duel won in public, every spell, every look at
   * the Purse raises it.
   */
  resources: [
    {
      id: 'stamina',
      name: 'Stamina',
      max: 100,
      start: 85,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player’s legs go. They sit down on the sand, or the stair, or the floor of the Great Hall, and whoever is nearest decides what happens next.',
      color: '#E9C46A',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. Arms heavy, feet late, every exchange a beat behind. Opponents can see it from the rail, and a duel fought from here is a duel lost unless something clever happens. This is the band where going to bed in the gatehouse is the correct move.',
        },
        {
          upTo: 60,
          behaviour:
            'The honest tiredness of a long day at an academy built for people who trained since they could walk. Fine for one more bout or one more argument, not both. The stairs up to the gatehouse feel longer than they did this morning.',
        },
        {
          upTo: 100,
          behaviour:
            'Fresh enough to be dangerous. Room to drill at dawn, climb to the Rail Room, walk down the cliff stairs to Lowmarket and back, and still have legs for a duel. Scenes can be long and physical and go somewhere.',
        },
      ],
    },
    {
      id: 'censure',
      name: 'Censure',
      max: 100,
      start: 10,
      regenPerHour: -0.3,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'The masters have forgotten the scholar was ever a question. Doors open, prefects nod, and nobody writes anything down.',
      color: '#C0504D',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The masters see a commoner keeping their head down. Prefects nod in corridors, the Library lends books without a second look, and Brannoch calls the scholar’s duels exactly like everybody else’s.',
        },
        {
          upTo: 50,
          behaviour:
            'People in gowns are watching. A prefect is always at the end of whatever corridor the scholar is in, the Headmistress’s secretary asks where they were last night, and a door that was open yesterday is locked today with an apology.',
        },
        {
          upTo: 80,
          behaviour:
            'A hearing is being arranged. The scholar is summoned to explain themselves in Founders’ Hall, the Society quotes the Code at them in the Great Hall, and Brannoch stops speaking to them in public because he cannot be seen to take their side.',
        },
        {
          upTo: 100,
          behaviour:
            'Expulsion proceedings have begun. The scholar has a day, perhaps two, before the Headmistress signs; their crest will be taken back and the gatehouse room given to nobody. Only something the governors can see changes this now.',
        },
      ],
    },
    {
      id: 'marked',
      name: 'Marked',
      max: 100,
      start: 35,
      regenPerHour: -0.4,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'The Society has decided the scholar is not worth a line in its book. The pencil on the rail writes about somebody else.',
      color: '#7B2D8E',
      bands: [
        {
          upTo: 20,
          behaviour:
            'A curiosity. The Society’s duellists nod at the scholar in the Great Hall the way they nod at a well-trained horse. Nobody follows them, and nobody bothers to read their crest.',
        },
        {
          upTo: 50,
          behaviour:
            'A line in the book. A pencil on the rail above the Ring writes down every point the scholar spends. Odds are quoted at supper within earshot. Challenges are discussed in the Rail Room and denied in the corridor.',
        },
        {
          upTo: 80,
          behaviour:
            'A target. Society duellists are paid to post challenges, proxies line up on the Ladder, and the scholar’s room is searched while they are at supper. Varro is warmer than ever, which is the worst sign of all.',
        },
        {
          upTo: 100,
          behaviour:
            'The Society has stopped pretending. Every duellist on the Ladder is coming for the same line on the scholar’s crest, clause fourteen be damned, and Varro wants it finished before the governors arrive. People who stand near the scholar in public are told, pleasantly, to stop.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'scholarship_crest',
      name: 'Your Scholarship Crest',
      tags: ['quest', 'crest'],
      questItem: true,
      droppable: false,
      description:
        'A silver badge pinned over your heart, plainer than the nobles’ and stamped with an open hand. Think about it and it opens a small window of light showing your five lines as they stand right now. The morning it was issued it read [Strength 2, Speed 2, Mana 2, Guard 2, Charm 2], and below it a line no other crest in the academy has: [Unspent: 5]. Every point spent, won or lost since then has changed those numbers for good.',
      loreText:
        'Unspent points go into any line at any moment, one at a time or all at once, even mid-swing. A spent point lands as a cold rush and the new number, and it never comes back out. A point you win in the Ring arrives here as a new unspent point; a point you lose leaves the line the winner chooses. If any line ever reads zero, the Charter sends you home that day.',
      icon: 'badge',
    },
    {
      id: 'admission_letter',
      name: 'Letter of Admission',
      tags: ['document'],
      description:
        'Heavy cream paper under the Headmistress’s seal. It admits the bearer as this year’s scholar "with the founder’s allowance of five", assigns them the Gatehouse Room, and reminds them that the Ring Code applies from the first hour.',
      loreText:
        'The phrase "founder’s allowance" is in a different hand from the rest of the letter, and the ink is fresher.',
      icon: 'letter',
    },
    {
      id: 'practice_blade',
      name: 'A Practice Blade',
      tags: ['weapon'],
      description: 'A blunted duelling sword from the rack at the Ring’s edge, nicked along both edges by a hundred first-years. It is heavier than it looks and balanced for somebody taller.',
      loreText: 'Somebody has scratched a tally of twenty-seven short lines into the guard.',
      icon: 'sword',
    },
    {
      id: 'minute_glass',
      name: 'The Minute-Glass',
      tags: ['tool'],
      description: 'Brannoch’s brass minute-glass, the one every duel in the Ring is timed by. When the sand runs out with no touch, the duel is a draw and no point moves.',
      loreText: 'The brass is worn smooth where a thumb turns it. It has been turned by the same hand for twenty-five years.',
      icon: 'hourglass',
    },
    {
      id: 'aldric_books',
      name: 'Seraphine’s Books',
      tags: ['personal'],
      description: 'Eleven volumes of law, command and duelling theory, tied with a white ribbon. Somebody who yields to Seraphine Aldric carries these for a year.',
      loreText: 'The margins are full of her small, exact handwriting. On one flyleaf, crossed out hard: "clause nine".',
      icon: 'book',
    },
    {
      id: 'code_copy',
      name: 'The Ring Code, Pocket Copy',
      tags: ['document'],
      skillModifiers: { the_code: 1 },
      description: 'A pocket copy of the Ring Code, nineteen clauses and the Charter, lent from the Library desk. The chained copy upstairs is the one that counts; this one is the one you can read in a corridor.',
      loreText: 'Clause fourteen has been underlined in pencil by a previous borrower, twice, very hard.',
      icon: 'book',
    },
    {
      id: 'the_purse',
      name: 'The Purse',
      tags: ['quest', 'evidence', 'document'],
      questItem: true,
      description:
        'The Rail Society’s wager book: a fat ledger in burgundy leather on a lectern in the Rail Room. Twenty-six lines, one for each scholar since the first, each with a day count, the bets, and the points spent and lost. A new line at the bottom has your name on it.',
      loreText:
        'Last year’s line reads nineteen days. Beside it, in Lord Varro’s hand: three names, three payments, one afternoon. That is a clause fourteen violation written down by the man who committed it.',
      icon: 'book',
    },
    {
      id: 'transfer_register',
      name: 'The Transfer Register',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A narrow ledger kept in a case beside the Headmistress’s seal in Founders’ Hall. It records every point ever moved from one crest to another under seal. There are twenty-eight entries.',
      loreText:
        'The first entry, twenty-eight years ago, is five points from the founding Empress’s own crest into the first scholar’s. Every entry after it is five points from that scholar’s crest, in the same square hand: H. Brannoch.',
      icon: 'book',
    },
    {
      id: 'mio_old_crest',
      name: 'A Silver Crest Reading Zero',
      tags: ['quest', 'personal'],
      questItem: true,
      description:
        'A scholarship crest exactly like yours, stamped with the same open hand, wrapped in a handkerchief at the back of a drawer below stairs. Opened, it shows four ordinary numbers and [Mana 0].',
      loreText: 'The handkerchief is embroidered M.F. The crest has not been polished in a year and has not been thrown away either.',
      icon: 'badge',
    },
    {
      id: 'glasshouse_orange',
      name: 'A Glasshouse Orange',
      tags: ['food'],
      consumable: { resourceId: 'stamina', amount: 10 },
      description: 'An orange from the trees in the Glass Annex, small, sharp and astonishingly sweet. Nobody eats these without the princess’s leave.',
      loreText: 'The late Empress planted the trees. They take years to fruit at this height, and they do anyway.',
      icon: 'food',
    },
    {
      id: 'betting_slip',
      name: 'A Lowmarket Betting Slip',
      tags: ['document'],
      description: 'A scrap of paper from the Broken Spur: a commoner’s bet that the scholar lasts the week. The odds are long and the stake is a week’s wages.',
      loreText: 'There are a few hundred of these in Lowmarket, and every one of them is a bet against the Society.',
      icon: 'papers',
    },
    {
      id: 'aldric_glove',
      name: 'Seraphine’s Glove',
      tags: ['personal'],
      description: 'A white duelling glove with the Aldric crossed swords stitched at the cuff. An Aldric gives one to an opponent she considers her equal, which almost never happens.',
      loreText: 'Carried openly, it tells every duellist in the academy that challenging you means answering to House Aldric.',
      icon: 'glove',
    },
    {
      id: 'whetstone',
      name: 'Your Uncle’s Whetstone',
      tags: ['tool', 'personal'],
      skillModifiers: { swordwork: 1 },
      description: 'A grey whetstone worn into a curve by forty years of a smith’s thumb. You brought it from the forge because you could not leave it.',
      loreText: 'A practice blade sharpened on it is still blunted by the ward-stones. It feels better in the hand anyway.',
      icon: 'tools',
    },
    {
      id: 'courier_map',
      name: 'A Courier’s Map',
      tags: ['document'],
      skillModifiers: { sneaking: 1 },
      description: 'Your own map of the capital and the cliff, drawn over three years of deliveries, with every back stair and servants’ door marked in pencil.',
      loreText: 'The academy is on it too, from the outside: you once delivered a letter to the gatehouse you now live in.',
      icon: 'map',
    },
    {
      id: 'pen_case',
      name: 'A Scribe’s Pen Case',
      tags: ['tool'],
      skillModifiers: { the_code: 1 },
      description: 'A battered tin pen case with three nibs, a pot of ink and a folded sheet of the clauses you copied out the night before the Open Trial.',
      loreText: 'You have copied enough contracts to know that every rulebook has one clause somebody hoped nobody would read.',
      icon: 'papers',
    },
    {
      id: 'charm_pouch',
      name: 'A Pouch of Market Charms',
      tags: ['personal'],
      skillModifiers: { spellwork: 1 },
      description: 'A leather pouch of knotted cords, river stones and tin luck-tokens, the stock of a hedge charmer’s market stall. Two of them actually work.',
      loreText: 'You never worked out which two, which is why you sell all of them.',
      icon: 'pouch',
    },
  ],
  abilities: [
    {
      id: 'spend_a_point',
      name: 'Spend a Point',
      tags: ['utility'],
      description: 'Put one or more of your unspent points into a crest line, right now, even halfway through a swing. It lands as a cold rush, and it never comes back out.',
      affordances: [
        'spend a point', 'spend points', 'spend them', 'allocate', 'put a point in', 'put points into',
        'all five into', 'raise my strength', 'raise my speed', 'raise my mana', 'raise my guard', 'raise my charm',
      ],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cross_blades',
      name: 'Cross Blades',
      tags: ['offensive'],
      description: 'Fight a duel the way the Code means it: in the Ring, blade against blade, to the first clean touch.',
      affordances: ['attack', 'strike', 'lunge', 'thrust', 'duel', 'fight her', 'fight him', 'swing', 'cut', 'fence', 'go for the touch'],
      costs: [
        { resourceId: 'stamina', amount: 10 },
        { resourceId: 'marked', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'swordwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'move_your_feet',
      name: 'Footwork',
      tags: ['movement'],
      description: 'Dodge, sidestep, close the gap or give ground, and make a faster duellist reach for you.',
      affordances: ['dodge', 'sidestep', 'step back', 'close the distance', 'circle', 'duck', 'evade', 'feint', 'run the stair'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_guard',
      name: 'Hold Your Guard',
      tags: ['defensive'],
      description: 'Parry, brace or raise a ward, and make them work for every inch of the touch.',
      affordances: ['block', 'parry', 'guard', 'brace', 'defend', 'raise a ward', 'take the hit', 'hold my ground'],
      costs: [{ resourceId: 'stamina', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SELF',
      check: { attribute: 'resolve', skillId: 'bracing', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'cast_a_spell',
      name: 'Cast',
      tags: ['offensive'],
      description: 'Small sorcery cast clean: a flare in the eyes, a shove of air, a skin of ward on the sand. How big it can be depends on your Mana.',
      affordances: ['cast', 'cast a spell', 'use magic', 'sorcery', 'flare', 'blast', 'conjure', 'spell'],
      costs: [
        { resourceId: 'stamina', amount: 8 },
        { resourceId: 'marked', amount: 2 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'arcana', skillId: 'spellwork', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'yield',
      name: 'Yield',
      tags: ['social'],
      description: 'Lower your blade before the first exchange and accept the challenger’s terms. No point moves. You serve, as long as they name, up to a year.',
      affordances: ['yield', 'i yield', 'surrender', 'concede', 'give up', 'accept her terms', 'lower my sword', 'carry her books'],
      costs: [],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'refuse',
      name: 'Refuse',
      tags: ['social'],
      description: 'Say no to somebody who is used to hearing yes, out loud, and stand still while they decide what to do about it.',
      affordances: ['refuse', 'say no', 'turn her down', 'turn him down', 'decline', 'i will not yield', 'no thank you', 'tell him no'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'nerve', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'quote_the_code',
      name: 'Quote the Code',
      tags: ['utility'],
      description: 'Find the clause, the precedent or the loophole that everybody in the Ring is counting on nobody having read.',
      affordances: ['quote the code', 'cite the clause', 'check the rules', 'read the code', 'look for a loophole', 'object', 'clause nine', 'clause fourteen', 'ask about the rules'],
      costs: [{ resourceId: 'stamina', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'the_code', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'talk_your_way',
      name: 'Talk Your Way',
      tags: ['social'],
      description: 'Bargain, flatter, bluff, lie or charm, and get a noble to agree to something before they notice they have.',
      affordances: ['talk', 'persuade', 'bargain', 'negotiate', 'flatter', 'bluff', 'lie', 'convince', 'flirt', 'ask her out', 'make a deal', 'charm them'],
      costs: [{ resourceId: 'stamina', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'talking', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_them',
      name: 'Read Them',
      tags: ['sight'],
      description: 'Watch a duellist’s feet, a crowd’s mood or a noble’s hands, or simply ask to see their crest.',
      affordances: ['watch', 'study her', 'study him', 'read her crest', 'ask to see her crest', 'look around', 'size her up', 'notice', 'read the room'],
      costs: [{ resourceId: 'stamina', amount: 3 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'reading', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'slip_off',
      name: 'Slip Off',
      tags: ['movement'],
      description: 'Leave without being marked, or get somewhere a scholar is not supposed to be.',
      affordances: ['sneak', 'slip away', 'leave quietly', 'hide', 'sneak in', 'walk out', 'walk off the sand', 'climb', 'pick the lock'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'censure', amount: 4 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'sneaking', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'settle_it_outside',
      name: 'Settle It Outside',
      tags: ['combat'],
      description: 'Hit somebody somewhere that is not the Ring. Nobody has done it in years, because the Code calls it an expulsion offence and means it.',
      affordances: ['punch', 'hit him', 'hit her', 'brawl', 'shove', 'fight outside', 'jump him', 'slap'],
      costs: [
        { resourceId: 'stamina', amount: 6 },
        { resourceId: 'censure', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: null, baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'follow_the_money',
      name: 'Follow the Money',
      tags: ['sight'],
      description: 'Find out who is betting on you, who has been paid to fight you, and whose hand writes it all down.',
      affordances: ['investigate', 'look into the society', 'find the purse', 'follow the money', 'ask about the purse', 'snoop', 'search the rail room', 'dig into it'],
      costs: [
        { resourceId: 'stamina', amount: 5 },
        { resourceId: 'marked', amount: 6 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'reading', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'gate_counter',
      name: 'The Gate Counter',
      tags: ['offensive'],
      description: 'Brannoch’s counter: wait for a stronger duellist’s bigger number to commit, then turn it on them. The wider the gap between your crests, the harder it lands.',
      affordances: ['gate counter', 'use the counter', 'brannoch’s counter', 'let her commit', 'turn it on him', 'wait for the lunge'],
      costs: [
        { resourceId: 'stamina', amount: 14 },
        { resourceId: 'marked', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'agility', skillId: 'footwork', baseDc: 15 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:gate_counter'],
        lockedCopy: 'You have seen Brannoch stand still while somebody faster came at him, once, maybe. It looked like nothing. You cannot copy nothing off a rail.',
      },
    },
    {
      id: 'give_a_point',
      name: 'Give a Point Back',
      tags: ['social'],
      description: 'Under the Headmistress’s seal, move one point of your own crest back to the crest it came from. It will not come back to you.',
      affordances: ['give a point back', 'give him a point', 'return a point', 'pay him back', 'transfer a point'],
      costs: [{ resourceId: 'stamina', amount: 10 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_five'],
        lockedCopy: 'Points do not move between crests because somebody wishes they would. You would have to know how it was ever done, and by whom.',
      },
    },
  ],
  locations: [
    {
      id: 'the_ring',
      name: 'The Ring',
      shortName: 'The Ring',
      description:
        'A circle of raked white sand ringed by waist-high stone rails, with the Rail Room’s windows above one side and the royal box under a green awning on the other. Six ward-stones hum in the rails and turn steel and spell into bruises. A rack of practice blades stands by the tunnel to the Great Hall; a gate leads to the Training Yard, a stair up to the Rail Room, and a stretcher passage to the Infirmary.',
      artDirection:
        'Fantasy academy duelling ring in bright morning light, raked white sand circle, waist-high carved stone rails crowded with nobles in fine coats, six softly glowing ward-stones set in the rails, a royal box under a green awning, tall stone academy buildings behind. Energetic, crowded, sunlit.',
      connections: [
        { to: 'great_hall', travelMinutes: 3, label: 'Through the tunnel to the Great Hall' },
        { to: 'training_yard', travelMinutes: 2, label: 'The gate to the Training Yard' },
        { to: 'rail_room', travelMinutes: 2, label: 'Up the stair to the Rail Room' },
        { to: 'infirmary', travelMinutes: 4, label: 'The stretcher passage' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'practice_blade', qty: 1, ownerId: null, aka: ['practice blade', 'practice sword', 'blunt sword', 'training sword'] },
        { itemId: 'minute_glass', qty: 1, ownerId: 'brannoch', aka: ['minute-glass', 'minute glass', 'hourglass', 'sand glass'] },
      ],
    },
    {
      id: 'great_hall',
      name: 'The Great Hall',
      shortName: 'Great Hall',
      description:
        'A long hall of dark beams and banners where four hundred students eat seated by rank: nobles at the high tables, the scholar at the last seat by the door. The Ladder, the challenge board, covers one whole wall, and every challenge is pinned there in ink with the date and the hour. Doors lead everywhere: the Ring, the East Tower, the Library, Founders’ Hall, the Infirmary, the Glass Annex, and the stairs below.',
      artDirection:
        'Grand fantasy academy dining hall, long tables under dark oak beams and hanging banners, nobles at raised high tables, one empty seat by the door, a huge wall board pinned with challenge cards. Warm candle and window light, busy and hierarchical.',
      connections: [
        { to: 'the_ring', travelMinutes: 3, label: 'The tunnel to the Ring' },
        { to: 'east_tower', travelMinutes: 4, label: 'Up to the East Tower' },
        { to: 'library', travelMinutes: 3, label: 'Across to the Library' },
        { to: 'founders_hall', travelMinutes: 3, label: 'The double doors to Founders’ Hall' },
        { to: 'below_stairs', travelMinutes: 2, label: 'Down the servants’ stair' },
        { to: 'infirmary', travelMinutes: 3, label: 'The corridor to the Infirmary' },
        { to: 'glass_annex', travelMinutes: 5, label: 'Out through the cloister to the Glass Annex' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [],
    },
    {
      id: 'training_yard',
      name: 'The Training Yard',
      shortName: 'Yard',
      description:
        'A walled yard of packed earth, wooden pells and straw targets scorched by a thousand first-year spells. Brannoch runs dawn drill here for anyone who turns up, and almost nobody does; his own room is the low door behind the pells. A gate leads back to the Ring, and the wall walk runs along to the gatehouse.',
      artDirection:
        'Walled stone training yard at dawn, packed earth, rows of battered wooden pells and scorched straw targets, a single low door behind them, mist and grey-gold early light. Spare, hard-working, quiet.',
      connections: [
        { to: 'the_ring', travelMinutes: 2, label: 'Back through the gate to the Ring' },
        { to: 'gatehouse_room', travelMinutes: 4, label: 'Along the wall walk to the gatehouse' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [],
    },
    {
      id: 'rail_room',
      name: 'The Rail Room',
      shortName: 'Rail Room',
      description:
        'The Rail Society’s lounge, up a stair above the Ring: leather chairs, decanters, a long window over the sand, and a burgundy ledger open on a lectern. It is members only by custom rather than by lock, which works because nobody outside the Society has ever dared. The only way out is the stair back down to the Ring.',
      artDirection:
        'Luxurious private lounge above a duelling ring, leather armchairs, crystal decanters, a tall window looking down on white sand, a burgundy leather ledger open on a carved lectern. Rich, smoky, exclusive.',
      connections: [{ to: 'the_ring', travelMinutes: 2, label: 'Down the stair to the Ring' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: -1 },
      takeableItems: [
        { itemId: 'the_purse', qty: 1, ownerId: 'varro', aka: ['purse', 'the purse', 'wager book', 'the book on the lectern'] },
      ],
    },
    {
      id: 'east_tower',
      name: 'The East Tower',
      shortName: 'East Tower',
      description:
        'The noble dormitory, five floors of panelled rooms around a spiral stair. Seraphine’s rooms are on the third floor with books stacked to the window. Varro has the best rooms at the top. Piers has a small one he cannot afford. Scholars have never been housed here, and the porter will mention it. The stair comes down to the Great Hall.',
      artDirection:
        'Elegant noble dormitory tower interior, a spiral stone stair, panelled doors, one open door showing a study with books stacked to the window and a duelling sword on the wall. Refined, quiet, slightly cold.',
      connections: [{ to: 'great_hall', travelMinutes: 4, label: 'Down to the Great Hall' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'aldric_books', qty: 1, ownerId: 'seraphine', aka: ['her books', 'the books', 'book stack', 'aldric books'] },
      ],
    },
    {
      id: 'library',
      name: 'The Library',
      shortName: 'Library',
      description:
        'Three floors of shelves around a well of light. On the top floor the authoritative copy of the Ring Code is chained to a lectern; at the desk below, pocket copies are lent to anyone who signs for one. The old duel records fill a whole alcove, every bout for two hundred years. One door, back to the Great Hall.',
      artDirection:
        'Tall fantasy academy library, three galleried floors around a central light well, a heavy book chained to a lectern on the top gallery, dust in sunbeams, a librarian’s desk below. Hushed and vertical.',
      connections: [{ to: 'great_hall', travelMinutes: 3, label: 'Back to the Great Hall' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
      takeableItems: [
        { itemId: 'code_copy', qty: 1, ownerId: null, aka: ['pocket code', 'code copy', 'the ring code', 'rulebook'] },
      ],
    },
    {
      id: 'founders_hall',
      name: 'Founders’ Hall',
      shortName: 'Founders’ Hall',
      description:
        'The council chamber: twelve high-backed chairs for the governors, the Headmistress’s seal on a stand, and the Scholars’ Board on the wall under a cloth, twenty-eight names long. Beside the seal, in a glass case, the transfer register. It is open to any student by day and silent as a church. The double doors lead back to the Great Hall.',
      artDirection:
        'Formal council chamber in a fantasy academy, twelve tall carved chairs in a horseshoe, a brass seal on a stand, a glass case holding a narrow ledger, a long wooden board on the wall half hidden under a cloth. Solemn, gold and shadow.',
      connections: [{ to: 'great_hall', travelMinutes: 3, label: 'Back through the double doors' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 3 },
      takeableItems: [
        { itemId: 'transfer_register', qty: 1, ownerId: null, aka: ['register', 'the register', 'transfer register', 'the ledger'] },
      ],
    },
    {
      id: 'below_stairs',
      name: 'Below Stairs',
      shortName: 'Below Stairs',
      description:
        'Kitchens, laundries and the maid-knights’ dormitory under the Great Hall, hot, loud and run like a ship. The servants’ stair climbs seven floors in the dark, and somebody sweeps all of it every night, very fast. Mio keeps one drawer locked. One way leads up to the Great Hall; a back passage runs out under the gate arch to the gatehouse stair.',
      artDirection:
        'Busy fantasy castle kitchen and servants’ quarters, copper pots, steam, long scrubbed tables, a narrow dark stone stair climbing away, a row of locked wooden drawers. Warm, crowded, working-class.',
      connections: [
        { to: 'great_hall', travelMinutes: 2, label: 'Up the servants’ stair to the Great Hall' },
        { to: 'gatehouse_room', travelMinutes: 3, label: 'The back passage to the gatehouse' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [
        { itemId: 'mio_old_crest', qty: 1, ownerId: 'mio', aka: ['old crest', 'silver crest', 'her old crest', 'the locked drawer'] },
      ],
    },
    {
      id: 'gatehouse_room',
      name: 'The Gatehouse Room',
      shortName: 'Your Room',
      description:
        'Your room: the old porter’s room over the gate arch, with the portcullis winch in one corner, a narrow bed, and a window onto the cliff stairs. It has housed the scholar for twenty-eight years. Twenty-seven names are scratched into the windowsill, and there is room for one more. A stair goes down to Lowmarket, a back passage to below stairs, and the wall walk to the Training Yard.',
      artDirection:
        'Small stone room above a castle gate arch, a big iron portcullis winch in the corner, a narrow bed, a deep window looking down long cliff stairs to a town below, names scratched into the windowsill. Humble, cramped, a little brave.',
      connections: [
        { to: 'below_stairs', travelMinutes: 3, label: 'The back passage below stairs' },
        { to: 'training_yard', travelMinutes: 4, label: 'Along the wall walk to the Training Yard' },
        { to: 'lowmarket', travelMinutes: 25, label: 'Down the cliff stairs' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
      takeableItems: [],
    },
    {
      id: 'infirmary',
      name: 'The Infirmary',
      shortName: 'Infirmary',
      description:
        'Twelve white beds, a healer with no patience for duellists, and the smell of arnica. Where duels end up, the ward-stones notwithstanding: bruises, sprains, and people who spent more than they had. A corridor to the Great Hall and the stretcher passage to the Ring.',
      artDirection:
        'Clean fantasy academy infirmary, white beds in a row, tall windows, shelves of glass jars and bandages, a duellist sitting on a bed with an ice pack. Bright, calm, faintly comic.',
      connections: [
        { to: 'great_hall', travelMinutes: 3, label: 'Back along the corridor' },
        { to: 'the_ring', travelMinutes: 4, label: 'The stretcher passage to the Ring' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'glass_annex',
      name: 'The Glass Annex',
      shortName: 'Glass Annex',
      description:
        'A glasshouse at the end of the cloister where Princess Isolde lives among orange trees her mother planted. Warm, green and quiet, with a tea table, a cot behind a screen, and gardening gloves on every surface. Guards stand outside and nobody comes in uninvited. The cloister leads back to the Great Hall.',
      artDirection:
        'Ornate royal glasshouse full of small orange trees in tubs, green and gold light, a wrought-iron tea table set for two, gardening gloves and a half-peeled orange on the table, guards silhouetted outside the glass. Lush, warm, private.',
      connections: [{ to: 'great_hall', travelMinutes: 5, label: 'Back through the cloister' }],
      discoveredByDefault: true,
      mapPosition: { x: -2, y: 1 },
      takeableItems: [
        { itemId: 'glasshouse_orange', qty: 3, ownerId: 'isolde', aka: ['orange', 'an orange', 'the oranges', 'fruit'] },
      ],
    },
    {
      id: 'lowmarket',
      name: 'Lowmarket',
      shortName: 'Lowmarket',
      description:
        'The town at the foot of the cliff stairs: a market square where the Open Trial was held, stalls, washing lines, and the Broken Spur, a tavern where commoners bet on the scholar and the Society drinks once a year. Everybody here knows your face. The cliff stairs climb back up to the gatehouse, three hundred steps.',
      artDirection:
        'Lively commoner market town at the foot of a cliff, a cobbled square with stalls and washing lines, a tavern sign showing a broken spur, a long stone stair climbing up the cliff to a castle gate. Warm evening light, noisy and friendly.',
      connections: [{ to: 'gatehouse_room', travelMinutes: 25, label: 'Up the cliff stairs to the gatehouse' }],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 1 },
      takeableItems: [
        { itemId: 'betting_slip', qty: 1, ownerId: null, aka: ['betting slip', 'slip', 'a bet', 'the bet'] },
      ],
    },
  ],
  factions: [
    {
      id: 'faction_academy',
      name: 'The Academy',
      description:
        'The masters, the Headmistress and the Ring Code itself. It admitted the scholar and will send them home the same day for a zero in any line. A fight outside the Ring goes to the Headmistress: a summons, a prefect at the scholar’s elbow and the whole academy watching. A second one, or real harm, ends in expulsion.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'On sufferance' },
        { atReputation: 30, label: 'Enrolled' },
        { atReputation: 60, label: 'Spoken for by the masters' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_society',
      name: 'The Rail Society',
      description:
        'Forty noble duellists, captained by Lord Ansel Varro, who run the Ladder, the Rail Room and the Purse. A dining club with swords, by its own description, and the reason twenty-six scholars went home.',
      startingReputation: -10,
      ranks: [
        { atReputation: -50, label: 'A line in the Purse' },
        { atReputation: 0, label: 'Tolerated at the rail' },
        { atReputation: 40, label: 'One of the forty' },
      ],
      allies: [],
      enemies: ['faction_below_stairs'],
    },
    {
      id: 'faction_governors',
      name: 'The Twelve Governors',
      description:
        'The academy’s board, twelve nobles who sit once a term. This term they sit to vote on ending the scholarship: five came to end it, four to keep it, and three will decide on what they see in the Ring.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A motion on the table' },
        { atReputation: 20, label: 'Worth a second look' },
        { atReputation: 40, label: 'Worth keeping' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_below_stairs',
      name: 'Below Stairs',
      description:
        'Cooks, laundresses, grooms and maid-knights: the commoners who keep the academy running and whose crests nobody ever reads. Most of them have a coin on the scholar, the other way from the Society.',
      startingReputation: 20,
      ranks: [
        { atReputation: 0, label: 'Another of them' },
        { atReputation: 30, label: 'One of ours' },
        { atReputation: 60, label: 'Looked after' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  characters: [
    {
      id: 'seraphine',
      name: 'Lady Seraphine Aldric',
      calledName: 'Seraphine',
      role: 'The rival. First of this year’s intake, heir of the empire’s sword-masters, and the woman who challenged you before you had unpacked',
      cardBlurb:
        'She is the best duellist of the year, she has never lost, and she picked you, with the lowest numbers in the Ring, for her first duel. She has a reason, and she would rather you yielded than heard it.',
      pronouns: 'she/her',
      publicTraits: ['Exact about everything', 'Has never lost a duel', 'Insults the people she is protecting'],
      hiddenDrives: [
        'She chose the scholar on purpose: a yield would put them under clause nine for a year, where nobody, Varro included, may challenge them',
        'She has decided, privately, that the first person who beats her honestly is the first person she will believe',
      ],
      values: ['A clean touch', 'Saying exactly what the rule says, no more and no less'],
      fears: [
        'Her father deciding she is not fit to command',
        'Losing, which she has never been allowed to do and has no idea how to survive',
      ],
      socialStyle:
        'Formal and precise. Gives orders as offers and offers as orders. Never explains a kindness; she makes it sound like a condition of employment.',
      boundaries: [
        'Will not throw a duel, for anybody, for any reason',
        'Will not say why she chose the scholar while anybody from the Society can hear',
      ],
      goals: [
        'Take a point or a yield in her first week, as an Aldric must',
        'Keep the scholar out of Varro’s reach until the vote',
      ],
      secrets: [
        {
          id: 'seraphine_the_shield',
          fact: 'She challenged the scholar so that a yield would put them under clause nine for a year. No other student, Varro included, could challenge them then. Her father would call it softness, so she will never say it where it can be repeated.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it herself, on the East Tower stair or in the Library, only after the player has beaten her clean or kept her terms for a full day without complaint.',
        },
        {
          id: 'seraphine_never_lost',
          fact: 'She has never lost because she has never been allowed to: her father withdraws her from any bout her tutors think she might lose. She has no idea what losing feels like and is quietly terrified of finding out.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player wins a point from her, she finds them afterwards and asks, very seriously, what she is supposed to do now.',
        },
      ],
      speechStyle:
        'Full sentences, no contractions, duelling vocabulary. Calls the player “scholar” until something changes. Delivers the protective thing as an insult and the insult as a plain statement of fact.',
      topics: ['the first duel', 'clause nine', 'her father', 'her books', 'the Ring Code', 'Varro'],
      voiceSamples: [
        'Yield now, and you can carry my books for a year. It is a generous offer. Take it.',
        'You spent a point during my lunge. Do that again, scholar, and do it sooner.',
        'An Aldric takes from the highest line. Your best number is the only one worth my time.',
        'Carry them properly. Spines out. If anyone from the rail speaks to you, you are busy with my reading.',
      ],
      appearance:
        'An adult woman with a pale gold braid over one shoulder, grey eyes and a straight back, in a white and gold duelling coat with crossed swords stitched on the cuffs.',
      visualHook: 'A slim duelling sword she holds level without seeming to notice its weight.',
      silhouette: 'Side-on, blade level, chin up, as if the duel had already started.',
      artSeed: 'crest-seraphine-01',
      portrait: null,
      expressions: ['neutral', 'competitive', 'surprised', 'flustered', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'east_tower', activity: 'in her rooms, a book open face down on the pillow' },
        { startMinute: 360, endMinute: 540, locationId: 'training_yard', activity: 'drilling alone before anyone else is up' },
        { startMinute: 540, endMinute: 660, locationId: 'the_ring', activity: 'on the sand, first duel of the intake' },
        { startMinute: 660, endMinute: 780, locationId: 'library', activity: 'top floor of the Library, reading law she says bores her' },
        { startMinute: 780, endMinute: 900, locationId: 'great_hall', activity: 'lunch at the high table, by rank' },
        { startMinute: 900, endMinute: 1080, locationId: 'training_yard', activity: 'afternoon drill, two hours, no rests' },
        { startMinute: 1080, endMinute: 1260, locationId: 'great_hall', activity: 'supper at the high table, eating very little' },
        { startMinute: 1260, endMinute: 1440, locationId: 'east_tower', activity: 'in her rooms with the books stacked to the window' },
      ],
      homeLocationId: 'east_tower',
      knowledgeScope: ['seraphine', 'house_aldric', 'the_ring_code', 'the_ring', 'the_society'],
      startingRelationship: { trust: 10, affection: 5, respect: 15, fear: 0, rivalry: 60 },
      gates: [
        {
          id: 'seraphine_tells_why',
          label: 'She tells you why she chose you',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['first_duel_over'] },
        },
        {
          id: 'seraphine_uses_your_name',
          label: 'She calls you by your name instead of “scholar”',
          kind: 'OTHER',
          requires: { respect: 60 },
        },
        {
          id: 'seraphine_romance',
          label: 'She stops pretending the books were the point',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 70, flagsSet: ['first_duel_over'] },
        },
      ],
      attributes: { might: 13, agility: 17, mind: 13, presence: 14, resolve: 15, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 60, defenseDc: 17, damage: 9, tags: ['duellist', 'aldric'] },
    },
    {
      id: 'mio',
      name: 'Mio Fenn',
      role: 'The maid-knight assigned to you: carries your bag, brings your supper, and knows the Ring Code better than the people who duel by it',
      cardBlurb:
        'She has been assigned to look after you, and she does it like a housekeeper running a siege. She knows every clause of the Code by heart, she never sets foot on the sand, and she wants you to last longer than anybody has.',
      pronouns: 'she/her',
      publicTraits: ['Deadpan', 'Domestic about everything, including danger', 'Unnervingly fast with a broom'],
      hiddenDrives: [
        'She wants this scholar to last, because she did not',
        'She wants to watch Varro pay a point in front of the whole Society, and has never once said so out loud',
      ],
      values: ['Doing the thing instead of talking about it', 'Keeping her oath to the letter'],
      fears: ['Being pitied', 'Watching the same afternoon happen to somebody else'],
      socialStyle:
        'Reports facts like a housekeeper reading an inventory. Shows care by doing something with her hands. Gets flustered only when thanked, and changes the subject to food.',
      boundaries: [
        'Will not duel a student: a maid-knight who does loses her oath and her place inside the walls',
        'Will not be pitied, and leaves the room the moment it starts',
      ],
      goals: [
        'Keep the scholar fed, rested and out of the Rail Room’s arithmetic',
        'Get somebody to read clause fourteen out loud in front of the governors',
      ],
      secrets: [
        {
          id: 'mio_last_scholar',
          fact: 'She was last year’s scholar. She lasted nineteen days. Three proxies Varro paid, Piers Hallam among them, took her Mana line to zero in one afternoon, a clause fourteen violation written in the Purse. She took the maid-knight oath to stay inside the walls.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells you over supper in the gatehouse if you ask about her own life rather than the Code, or if you find the old crest in her drawer and wait for her to mention it first.',
        },
        {
          id: 'mio_speed_seven',
          fact: 'Her grey servant’s crest reads Speed 7, from a year of running the servants’ stair at night with a broom. Nobody reads a servant’s crest, so nobody knows.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only if the player is on the servants’ stair before dawn, or asks her outright to show them how to move.',
        },
      ],
      speechStyle:
        'Short and flat. Domestic nouns for dangerous things. Never more than three sentences before she goes back to work.',
      topics: ['supper', 'the Ring Code', 'clause fourteen', 'the servants’ stair', 'the gatehouse room', 'last year'],
      voiceSamples: [
        'Supper is at seven. Your crest is at two. I can fix one of those.',
        'I have put the pocket Code under your pillow, page six folded down. The stew is on the winch. The bolt is for using.',
        'I sweep the servants’ stair at night. All of it. Quickly.',
        'Stop thanking me. Eat the stew while it’s hot.',
      ],
      appearance:
        'An adult woman with short black hair and level dark eyes, in a grey maid-knight’s uniform, plain and practical: an ankle-length grey skirt, a high collar, an apron over a light steel breastplate, sleeves rolled, a grey crest pinned at the collar.',
      visualHook: 'A long-handled broom she carries like a spear.',
      silhouette: 'Square to the room, broom upright beside her, apron perfectly straight.',
      artSeed: 'crest-mio-01',
      portrait: null,
      expressions: ['neutral', 'flat', 'flustered', 'worried', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 300, locationId: 'below_stairs', activity: 'in the maid-knights’ dormitory, boots by the bed' },
        { startMinute: 300, endMinute: 360, locationId: 'below_stairs', activity: 'running the servants’ stair with a broom, top to bottom, in the dark' },
        { startMinute: 360, endMinute: 540, locationId: 'below_stairs', activity: 'kitchens and laundry, and the scholar’s kit' },
        { startMinute: 540, endMinute: 660, locationId: 'the_ring', activity: 'in the tunnel mouth with the scholar’s bag, never on the sand' },
        { startMinute: 660, endMinute: 1080, locationId: 'below_stairs', activity: 'linen, silver and errands' },
        { startMinute: 1080, endMinute: 1200, locationId: 'gatehouse_room', activity: 'bringing the scholar’s supper up the gatehouse stair' },
        { startMinute: 1200, endMinute: 1440, locationId: 'below_stairs', activity: 'mending by the kitchen fire' },
      ],
      homeLocationId: 'below_stairs',
      knowledgeScope: ['mio', 'the_ring_code', 'below_stairs', 'last_years_scholar', 'the_purse'],
      startingRelationship: { trust: 30, affection: 15, respect: 15, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'mio_last_year',
          label: 'She tells you about last year',
          kind: 'TRUST',
          requires: { trust: 55, flagsSet: ['mio_brought_supper'] },
        },
        {
          id: 'mio_the_stair',
          label: 'She shows you the servants’ stair',
          kind: 'ALLIANCE',
          requires: { trust: 45, respect: 40 },
        },
        {
          id: 'mio_romance',
          label: 'She lets you thank her',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65 },
        },
      ],
      attributes: { might: 12, agility: 17, mind: 14, presence: 10, resolve: 16, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: { health: 45, defenseDc: 15, damage: 6, tags: ['maid-knight'] },
    },
    {
      id: 'isolde',
      name: 'Princess Isolde of Vael',
      calledName: 'Isolde',
      role: 'The Emperor’s third daughter, a second-year who lives among orange trees and needs the scholarship to survive the vote',
      cardBlurb:
        'She watched your first duel from the royal box without moving her face. She needs a scholar still standing at the end of the week, she cannot be seen helping you, and she has already decided what you are worth to her.',
      pronouns: 'she/her',
      publicTraits: ['Unhurried', 'Amused by almost everything', 'Never asks a question she does not know the answer to'],
      hiddenDrives: [
        'The scholarship was her mother’s, and losing it would be losing the last thing her mother built',
        'She wants a second: a champion who owes nothing to any house, which in this academy means a commoner',
      ],
      values: ['Patience with things that grow', 'Being told the truth once, so she never has to check'],
      fears: ['That her mother’s birth becomes the court’s favourite joke', 'Being useful to everybody and loved by none of them'],
      socialStyle:
        'Speaks in offers and questions. Lets silences run long enough that the other person fills them. Peels fruit during serious conversations.',
      boundaries: [
        'Will not openly back a commoner before the vote; it would make the scholarship look like royal favour',
        'Will not be lied to twice',
      ],
      goals: [
        'Have a scholar standing, and better, winning, in front of the governors on the seventh day',
        'Find a second before her father picks one for her',
      ],
      secrets: [
        {
          id: 'isolde_mother',
          fact: 'Her mother, the late Empress who founded the scholarship, was born a commoner in a hill province. The motion to end the scholarship is aimed at Isolde as much as at the scholar.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She says it among the orange trees, late, if the player has turned her down once and come back anyway, or told her something true about their own family.',
        },
        {
          id: 'isolde_the_count',
          fact: 'She has counted the governors: five will vote to end the scholarship, four to keep it, and three will decide on what they see in the Ring at Week’s End.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows the player her count, on a slip of paper she then burns, if they agree to be her second.',
        },
      ],
      speechStyle:
        'Unhurried and amused. Begins hard things with “Suppose”. Reaches for gardens and growing things when she wants to say something she will not say directly.',
      topics: ['the vote', 'the governors', 'her mother', 'the orange trees', 'a second', 'the Society'],
      voiceSamples: [
        'Suppose three governors decide on what they see in the Ring this week. Would that change where your points go?',
        'Oranges take years to fruit up here. My mother planted these. I’m patient with anything she planted.',
        'I would like a champion who owes nothing to any house. Would you like to be owed something by a princess?',
        'You lied to me once, gently. Do it twice and I prune.',
      ],
      appearance:
        'An adult woman with dark curls pinned up loosely, warm brown skin and a sleepy, amused look, in green and gold court dress with gardening gloves tucked into the sash.',
      visualHook: 'An orange in one hand, always half peeled in a single unbroken ribbon.',
      silhouette: 'Seated, one knee crossed over the other, head tipped as if listening to something far off.',
      artSeed: 'crest-isolde-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'considering', 'warm', 'cold'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'glass_annex', activity: 'behind the screen in the glasshouse, the trees ticking in the warmth' },
        { startMinute: 480, endMinute: 540, locationId: 'glass_annex', activity: 'breakfast among the orange trees' },
        { startMinute: 540, endMinute: 660, locationId: 'the_ring', activity: 'in the royal box under the awning, watching without expression' },
        { startMinute: 660, endMinute: 1020, locationId: 'glass_annex', activity: 'lectures brought to her rather than attended, and the trees' },
        { startMinute: 1020, endMinute: 1140, locationId: 'glass_annex', activity: 'tea at five, with whoever she has invited' },
        { startMinute: 1140, endMinute: 1260, locationId: 'great_hall', activity: 'supper at the royal end of the high table, seated apart' },
        { startMinute: 1260, endMinute: 1440, locationId: 'glass_annex', activity: 'reading by lamplight among the trees' },
      ],
      homeLocationId: 'glass_annex',
      knowledgeScope: ['isolde', 'the_vote', 'the_governors', 'the_late_empress', 'glass_annex', 'the_society'],
      startingRelationship: { trust: 15, affection: 10, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'isolde_offers',
          label: 'She offers you a place as her second',
          kind: 'ALLIANCE',
          requires: { trust: 40, flagsSet: ['isolde_invited'] },
        },
        {
          id: 'isolde_mother_gate',
          label: 'She tells you who her mother was',
          kind: 'TRUST',
          requires: { trust: 65, flagsSet: ['isolde_invited'] },
        },
        {
          id: 'isolde_romance',
          label: 'She stops negotiating',
          kind: 'ROMANCE',
          requires: { trust: 65, affection: 65 },
        },
      ],
      attributes: { might: 9, agility: 11, mind: 16, presence: 17, resolve: 14, arcana: 12 },
      companion: null,
      scouting: null,
      combatant: { health: 35, defenseDc: 13, damage: 4, tags: ['royal'] },
    },
    {
      id: 'brannoch',
      name: 'Instructor Halden Brannoch',
      calledName: 'Brannoch',
      role: 'Master of the Ring. Calls every duel, keeps every clause, and wears a crest that reads far too low for a former imperial champion',
      cardBlurb:
        'He calls your duels, he will not bend the Code for you once, and he watches every point you spend as if it had cost him something. If he decides you keep the Code, he might teach you how to beat somebody better than you.',
      pronouns: 'he/him',
      publicTraits: ['Few words', 'Impartial to the clause', 'Says “Again.” more than anything else'],
      hiddenDrives: [
        'The five unspent points are his, every year for twenty-seven years, and he would rather lose them for good than see the scholarship end',
        'He wants one more commoner to graduate before he is too old to give the five',
      ],
      values: ['The Code, exactly as written', 'Getting up again'],
      fears: ['The scholar finding out and feeling they owe him', 'Being the only name on the board with a date beside it, for good'],
      socialStyle:
        'Barks clause numbers instead of explanations. Corrects feet before anything else. Praise is one word, rarely given, and the word is “Good.”',
      boundaries: [
        'Will never bend the Code for the scholar, not once, including when it is unfair to them',
        'Will not take points back from the scholar, whatever they offer',
      ],
      goals: [
        'Call every duel this week straight, including the ones he hates',
        'Find out whether this scholar keeps the Code before he shows them anything',
      ],
      secrets: [
        {
          id: 'brannoch_the_five',
          fact: 'He has moved five points from his own crest into the scholarship crest every year for twenty-seven years under the Headmistress’s seal, and trains them back every year without quite catching up. It is in the transfer register in Founders’ Hall.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He will not say it unprompted. The player reads it in the register, or sees his crest open at dawn drill and asks him the right question afterwards.',
        },
        {
          id: 'brannoch_gate_counter',
          fact: 'As a scholar he invented a counter that turns an opponent’s higher number against them: the wider the gap, the harder it lands. He has never taught it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He teaches it at dawn drill to a scholar who has kept the Code when it cost them something.',
        },
      ],
      speechStyle:
        'Clipped. Clause numbers, imperatives, single words. An old soldier’s grammar: verb first, subject optional.',
      topics: ['the Ring Code', 'footwork', 'dawn drill', 'the Scholars’ Board', 'the minute-glass'],
      voiceSamples: [
        'Again.',
        'Clause three. First clean touch. That was clean. Sit down.',
        'Feet. Then blade. Then mouth. You have it backwards.',
        'Twenty-eight years on this sand. The Code does not care who you are. Neither do I. Again.',
      ],
      appearance:
        'An older man, broad and scarred, with a grey-shot beard cut short and a burn across the backs of both hands, in a plain dark instructor’s coat with a brass minute-glass on his belt.',
      visualHook: 'A brass minute-glass hanging at his belt, which he turns without looking.',
      silhouette: 'Planted at the edge of the sand, arms folded, weight on the back foot.',
      artSeed: 'crest-brannoch-01',
      portrait: null,
      expressions: ['neutral', 'stern', 'grim', 'warm', 'surprised'],
      schedule: [
        { startMinute: 0, endMinute: 330, locationId: 'training_yard', activity: 'in his room behind the pells, door open' },
        { startMinute: 330, endMinute: 480, locationId: 'training_yard', activity: 'dawn drill, for whoever turns up' },
        { startMinute: 480, endMinute: 780, locationId: 'the_ring', activity: 'calling duels, minute-glass in hand' },
        { startMinute: 780, endMinute: 840, locationId: 'great_hall', activity: 'eating standing up at the masters’ end' },
        { startMinute: 840, endMinute: 1080, locationId: 'the_ring', activity: 'afternoon duels and the ward-stones' },
        { startMinute: 1080, endMinute: 1260, locationId: 'training_yard', activity: 'alone at the pells, training back what he gave away' },
        { startMinute: 1260, endMinute: 1440, locationId: 'training_yard', activity: 'in his room behind the pells, oiling a blade' },
      ],
      homeLocationId: 'training_yard',
      knowledgeScope: ['brannoch', 'the_ring_code', 'the_ring', 'the_scholars_board', 'the_transfer_register', 'the_gate_counter'],
      startingRelationship: { trust: 20, affection: 5, respect: 20, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'brannoch_teaches',
          label: 'He keeps you back after dawn drill',
          kind: 'TRUST',
          requires: { respect: 55, flagsSet: ['first_duel_over'] },
        },
        {
          id: 'brannoch_admits',
          label: 'He tells you where the five come from',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:brannoch_low'] },
        },
      ],
      attributes: { might: 16, agility: 12, mind: 13, presence: 11, resolve: 18, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: { health: 75, defenseDc: 18, damage: 12, tags: ['instructor', 'champion'] },
    },
    {
      id: 'varro',
      name: 'Lord Ansel Varro',
      calledName: 'Varro',
      role: 'Third-year, captain of the Rail Society, top of the challenge board, and the pleasant man holding the pencil',
      cardBlurb:
        'He is charming, generous, top of the board, and delighted to meet you. He also keeps a book on how many days you will last, and he has never once lost money on a scholar.',
      pronouns: 'he/him',
      publicTraits: ['Warm', 'Generous with other people’s money', 'Never raises his voice'],
      hiddenDrives: [
        'His Charm 8 was bought with years of tutors, and he suspects he is mostly money; a commoner who beats him would prove it',
        'He wants the scholarship ended at his mother’s motion, and wants to look gracious while it happens',
      ],
      values: ['Winning without being seen to try', 'A debt paid on time'],
      fears: ['Being beaten in public by somebody who cost nothing to make', 'Anyone outside the Society reading the Purse'],
      socialStyle:
        'Treats every conversation as a friendly wager. Pays for things before anyone asks. Remembers your name, your odds and what you owe him.',
      boundaries: [
        'Never fights outside the Ring',
        'Never writes a clause fourteen arrangement down anywhere but the Purse, which he believes nobody else reads',
      ],
      goals: ['See the scholarship voted down on the seventh day', 'Win the Purse on this scholar inside nine days'],
      secrets: [
        {
          id: 'varro_proxies',
          fact: 'Last year he drained Mio Fenn’s Mana line to zero with three paid proxies in one afternoon, breaking clause fourteen. The payments are in the Purse in his own hand. He has three more lined up for this scholar, Piers Hallam first.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'It is written in the Purse on the lectern in the Rail Room. Piers will confirm it if he becomes more afraid of the player than of Varro.',
        },
        {
          id: 'varro_tutors',
          fact: 'His crest read Charm 3 the day he arrived. Five of those points are the work of tutors his mother paid for every summer, and he has never once won a room without spending something.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it only if he loses to the scholar in front of the Society, and only to the scholar, quietly, afterwards.',
        },
      ],
      speechStyle:
        'Warm, easy and generous. Money and odds in every other sentence. Calls the player “my friend” and means the opposite.',
      topics: ['the Society', 'the odds', 'the Ladder', 'the vote', 'his mother', 'the Purse'],
      voiceSamples: [
        'My friend, you have no idea how much money you just moved.',
        'The odds on you were nine days this morning. Eleven now. I’d hate for anybody to be disappointed.',
        'The Society is a dining club with swords. We eat, we duel, we keep a little book. Everyone needs a hobby.',
        'Come up to the rail some evening. Drinks are on me. Everything is, eventually.',
      ],
      appearance:
        'An adult man with swept-back chestnut hair and an easy smile, in a burgundy and silver Society coat, a silver pencil tucked behind one ear.',
      visualHook: 'A silver pencil behind his ear, which he uses to write down other people’s mistakes.',
      silhouette: 'Leaning on a rail with both elbows, coat open, utterly relaxed.',
      artSeed: 'crest-varro-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'warm', 'cold', 'angry'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'east_tower', activity: 'in the best rooms at the top of the East Tower' },
        { startMinute: 480, endMinute: 540, locationId: 'rail_room', activity: 'breakfast in the Rail Room, over the Purse' },
        { startMinute: 540, endMinute: 720, locationId: 'the_ring', activity: 'at the rail above the sand with a silver pencil' },
        { startMinute: 720, endMinute: 900, locationId: 'rail_room', activity: 'Society business: odds, entries and a long lunch' },
        { startMinute: 900, endMinute: 1080, locationId: 'great_hall', activity: 'by the Ladder, being pleasant to everyone' },
        { startMinute: 1080, endMinute: 1260, locationId: 'great_hall', activity: 'supper at the high table, buying the wine' },
        { startMinute: 1260, endMinute: 1440, locationId: 'rail_room', activity: 'late cards and later accounts' },
      ],
      homeLocationId: 'east_tower',
      knowledgeScope: ['varro', 'the_society', 'the_purse', 'the_vote', 'house_varro', 'last_years_scholar'],
      startingRelationship: { trust: 5, affection: 0, respect: 5, fear: 0, rivalry: 40 },
      gates: [
        {
          id: 'varro_invites',
          label: 'He invites you up to the rail',
          kind: 'ALLIANCE',
          requires: { trust: 30 },
        },
        {
          id: 'varro_drops_the_smile',
          label: 'He stops smiling',
          kind: 'OTHER',
          requires: { fear: 40, flagsSet: ['knows:the_purse'] },
        },
      ],
      attributes: { might: 15, agility: 15, mind: 14, presence: 17, resolve: 13, arcana: 13 },
      companion: null,
      scouting: null,
      combatant: { health: 70, defenseDc: 17, damage: 10, tags: ['duellist', 'society'] },
    },
    {
      id: 'piers',
      name: 'Lord Piers Hallam',
      calledName: 'Piers',
      role: 'Second-year Society duellist with gambling debts, Varro’s errand-runner, and the first name on tomorrow’s Ladder against you',
      cardBlurb:
        'He is going to challenge you tomorrow, he is terribly sorry about it, and he owes Varro more than his family has. He was there for the last scholar, and it has been eating at him ever since.',
      pronouns: 'he/him',
      publicTraits: ['Apologetic', 'Over-polite', 'Loses at cards'],
      hiddenDrives: [
        'He was one of the three proxies who drained the last scholar, and he would give a great deal for somebody to make him stop',
        'He wants out of the Society without his family ever hearing why',
      ],
      values: ['Manners', 'Paying what he owes, eventually'],
      fears: ['Varro calling in the debt in front of his father', 'Being the reason another scholar goes home'],
      socialStyle:
        'Apologises before, during and after anything he does. Explains too much. Threatens people by accident and then apologises for that too.',
      boundaries: [
        'Will not put his name to anything in writing',
        'Will not fight anybody outside the Ring, and goes pale if asked to',
      ],
      goals: ['Get through tomorrow without anybody looking at him', 'Clear his debt to Varro before the end of term'],
      secrets: [
        {
          id: 'piers_proxy',
          fact: 'He was one of Varro’s three paid proxies against Mio Fenn last year. He took the second of the three points from her Mana line, and Varro cleared forty crowns of his debt for it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He confesses if the player corners him alone and frightens him more than Varro does, or if Mio is in the room and he cannot look at her.',
        },
      ],
      speechStyle:
        'Fast, breathless and apologetic. Starts sentences with “Terribly sorry” or “The thing is”. Says too much and then begs you to forget it.',
      topics: ['the Ladder', 'his debts', 'the Rail Room', 'last year', 'cards'],
      voiceSamples: [
        'Terribly sorry about this. I have to challenge you. Ten o’clock tomorrow. Nothing personal, I owe a man.',
        'Please don’t win. I mean, do whatever you like, obviously. But please don’t.',
        'The thing is, I was there last year. I only took the one point. The one point is still on me.',
        'If anybody asks, I was never in the Rail Room, and neither was the book.',
      ],
      appearance:
        'An adult man, lanky and fair, with ink on his fingers and a Society coat a size too large for him, always slightly out of breath.',
      visualHook: 'A deck of cards he shuffles one-handed when he is nervous, which is always.',
      silhouette: 'Hunched, half turned toward the nearest door.',
      artSeed: 'crest-piers-01',
      portrait: null,
      expressions: ['neutral', 'nervous', 'guilty', 'surprised', 'sheepish'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'east_tower', activity: 'in a small room in the East Tower he cannot afford' },
        { startMinute: 480, endMinute: 540, locationId: 'rail_room', activity: 'running errands for Varro' },
        { startMinute: 540, endMinute: 720, locationId: 'the_ring', activity: 'at the rail beside Varro, holding his coat' },
        { startMinute: 720, endMinute: 1080, locationId: 'library', activity: 'pretending to study, mostly hiding' },
        { startMinute: 1080, endMinute: 1260, locationId: 'great_hall', activity: 'supper at the low end of the noble tables' },
        { startMinute: 1260, endMinute: 1440, locationId: 'lowmarket', activity: 'at the Broken Spur, losing at cards' },
      ],
      homeLocationId: 'east_tower',
      knowledgeScope: ['piers', 'the_society', 'the_ladder', 'last_years_scholar', 'the_purse'],
      startingRelationship: { trust: 10, affection: 5, respect: 5, fear: 15, rivalry: 10 },
      gates: [
        {
          id: 'piers_confesses',
          label: 'He tells you about last year',
          kind: 'TRUST',
          requires: { trust: 40, flagsSet: ['ladder_posted'] },
        },
      ],
      attributes: { might: 11, agility: 13, mind: 12, presence: 12, resolve: 8, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: { health: 40, defenseDc: 13, damage: 5, tags: ['duellist', 'proxy'] },
    },
  ],
  quests: [
    {
      id: 'q_first_duel',
      title: 'Yield, or Spend Them',
      summary:
        'The best duellist of the year has challenged you in your first hour. Yield and carry her books for a year, or spend your five points and fight her in front of everybody.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['seraphine', 'brannoch', 'varro', 'mio'],
      involvedLocationIds: ['the_ring'],
      knownRewardCopy: 'A first result on the board, and every person in the Ring deciding what you are.',
      steps: [
        {
          id: 'the_first_duel',
          playerCopy: 'Answer Seraphine before the count reaches one.',
          directorNotes:
            'The count is real and short. Every answer is a real way to play. Yielding is safe and funny and puts the player under clause nine. Fighting is a contest the points make close: Speed 7 against her 8 is a duel, Charm 7 against her blade is a spectacle. Bargaining over the terms is allowed by the Code. Quoting a clause can stall the count. Walking off the sand forfeits, which pays her a point. Seraphine reacts to the specific thing the player does, and Brannoch calls it straight. A won duel pays the player a new unspent point; a lost one pays Seraphine a point from their highest line. Track exactly where every point went.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'yielded',
              label: 'Yield, and carry her books',
              predicate: { flagsSet: ['used:yield'] },
              setsFlags: ['yielded', 'serving_seraphine'],
              closesFlags: ['fought_seraphine'],
            },
            {
              routeId: 'fought_her',
              label: 'Spend your points and fight her',
              predicate: { flagsSet: ['used:cross_blades'] },
              setsFlags: ['fought_seraphine'],
              closesFlags: ['yielded'],
            },
            {
              routeId: 'refused_to_yield',
              label: 'Tell her no, in front of everybody',
              predicate: { flagsSet: ['used:refuse'] },
              setsFlags: ['refused_to_yield'],
              closesFlags: ['yielded'],
            },
            {
              routeId: 'haggled',
              label: 'Haggle over her terms first',
              predicate: { flagsSet: ['used:talk_your_way'] },
              setsFlags: ['renegotiated_terms'],
              closesFlags: [],
            },
            {
              routeId: 'quoted_the_code',
              label: 'Find the clause that stops the count',
              predicate: { flagsSet: ['used:quote_the_code'] },
              setsFlags: ['quoted_the_code'],
              closesFlags: [],
            },
            {
              routeId: 'walked_off',
              label: 'Walk off the sand',
              predicate: { flagsSet: ['used:slip_off'] },
              setsFlags: ['walked_off_the_sand'],
              closesFlags: ['fought_seraphine', 'yielded'],
            },
          ],
          rewards: {
            xp: 50,
            items: [],
            flags: ['first_duel_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_society', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_ladder',
      title: 'The Ladder',
      summary:
        'Three challenges against you, pinned to the board in the Great Hall for tomorrow, from three Society duellists who all owe Lord Varro money. Every one you skip pays a point anyway.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['ladder_posted'] },
      involvedCharacterIds: ['piers', 'varro', 'mio', 'brannoch'],
      involvedLocationIds: ['great_hall', 'the_ring', 'rail_room'],
      knownRewardCopy: 'Still being enrolled the day after tomorrow.',
      steps: [
        {
          id: 'answer_the_ladder',
          playerCopy: 'Deal with three challenges before ten tomorrow morning.',
          directorNotes:
            'Three Society duellists, Piers Hallam first: ten, noon and two tomorrow. They are proxies. Varro paid them, which breaks clause fourteen, and each will take a point from the same line. Skipping all three empties a line and sends the player home tonight, which is exactly what happened to Mio. The ways out are real and different: fight them; prove they act in concert and make Brannoch void the cards; get Piers to withdraw; go back to Seraphine and ask for her terms after all. The yield itself is gone, since a yield comes before the first exchange, so she has to offer service by agreement as a favour, and she makes the scholar ask properly; once they serve, clause nine closes the board. Mio knows exactly what is happening and says "clause fourteen" and nothing else unless she is asked properly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_them_on',
              label: 'Fight all three',
              predicate: { flagsSet: ['used:cross_blades', 'ladder_posted'] },
              setsFlags: ['took_on_the_ladder'],
              closesFlags: [],
            },
            {
              routeId: 'clause_fourteen',
              label: 'Prove they are fighting in concert',
              predicate: {
                flagsSet: ['used:quote_the_code', 'ladder_posted'],
                minRelationship: [{ characterId: 'brannoch', dimension: 'respect', value: 30 }],
              },
              setsFlags: ['clause_fourteen_invoked'],
              closesFlags: [],
            },
            {
              routeId: 'turned_piers',
              label: 'Get Piers to withdraw his card',
              predicate: {
                flagsSet: ['spoke:piers'],
                minRelationship: [{ characterId: 'piers', dimension: 'trust', value: 35 }],
              },
              setsFlags: ['piers_withdrew'],
              closesFlags: [],
            },
            {
              routeId: 'went_under_terms',
              label: 'Ask Seraphine for her terms after all',
              predicate: { flagsSet: ['serving_seraphine'] },
              setsFlags: ['ladder_shielded'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['survived_the_ladder'],
            abilities: [],
            reputation: [
              { factionId: 'faction_below_stairs', amount: 5 },
              { factionId: 'faction_society', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_highest_line',
      title: 'The Highest Line',
      summary:
        'Seraphine Aldric takes points from her opponent’s highest line, never the lowest, and she picked you, with the lowest numbers in the Ring, for her first duel. Neither of those is an accident.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['first_duel_over'] },
      involvedCharacterIds: ['seraphine'],
      involvedLocationIds: ['east_tower', 'library', 'the_ring'],
      knownRewardCopy: 'Why the best duellist of the year picked you, and what she is to you once you know.',
      steps: [
        {
          id: 'earn_her_word',
          playerCopy: 'Find out why Seraphine chose you.',
          directorNotes:
            'She will not say it with anybody from the Society in earshot, and she will not say it to somebody who has not earned it on her terms: a clean win, or a day of keeping her yield terms exactly. If the player serves her, the books are real, the errands are real, and she is a demanding, funny, oddly protective employer. If they beat her, she is shaken in a way she does not know how to hide, and her father arrives on the fifth day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_her_clean',
              label: 'Beat her in the Ring, clean',
              predicate: {
                flagsSet: ['fought_seraphine', 'used:cross_blades'],
                minRelationship: [{ characterId: 'seraphine', dimension: 'respect', value: 55 }],
              },
              setsFlags: ['beat_seraphine'],
              closesFlags: [],
            },
            {
              routeId: 'kept_her_terms',
              label: 'Keep her terms for a day without complaint',
              predicate: {
                flagsSet: ['serving_seraphine'],
                minRelationship: [{ characterId: 'seraphine', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['kept_her_terms'],
              closesFlags: [],
            },
            {
              routeId: 'asked_her_straight',
              label: 'Ask her straight, alone',
              predicate: {
                flagsSet: ['spoke:seraphine'],
                minRelationship: [{ characterId: 'seraphine', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['asked_seraphine_why'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [{ itemId: 'aldric_glove', qty: 1 }],
            flags: ['knows:seraphine_shield'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_nineteen_days',
      title: 'Nineteen Days',
      summary:
        'The maid-knight who brings your supper knows every clause of the Ring Code, never sets foot on the sand, and keeps one drawer below stairs locked.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['mio_brought_supper'] },
      involvedCharacterIds: ['mio', 'piers', 'varro'],
      involvedLocationIds: ['below_stairs', 'gatehouse_room'],
      knownRewardCopy: 'Who Mio was before the apron, and whether she gets to be it again.',
      steps: [
        {
          id: 'who_she_was',
          playerCopy: 'Find out why Mio knows the Code so well.',
          directorNotes:
            'She will not volunteer it and will not be pitied. Asked about her own life rather than about the Code, she answers in three flat sentences and then serves pudding. The old crest in her drawer is the other way in, and she knows the moment it has been moved. Piers knows too, and it is the thing he is most afraid of saying.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'she_told_you',
              label: 'She tells you over supper',
              predicate: {
                flagsSet: ['spoke:mio'],
                minRelationship: [{ characterId: 'mio', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['mio_told_you'],
              closesFlags: ['found_mio_crest'],
            },
            {
              routeId: 'found_the_crest',
              label: 'Find the old crest in her drawer',
              predicate: { hasItems: ['mio_old_crest'] },
              setsFlags: ['found_mio_crest'],
              closesFlags: ['mio_told_you'],
            },
            {
              routeId: 'piers_confessed',
              label: 'Get it out of Piers',
              predicate: {
                flagsSet: ['spoke:piers'],
                minRelationship: [{ characterId: 'piers', dimension: 'fear', value: 35 }],
              },
              setsFlags: ['piers_confessed'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['knows:mio_was_scholar'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'next_years_scholar',
          playerCopy: 'Decide what to do with what you know about Mio.',
          enterWhen: { flagsSet: ['knows:mio_was_scholar'] },
          directorNotes:
            'Maid-knights may not duel students, and she will not break the oath. But anybody may sit the Open Trial, servants included, and nobody reads a servant’s crest, so nobody knows hers says Speed 7. She has never thought of re-sitting because she believes she lost the right. The player can put the idea in her head, train with her on the stair at dawn, or leave her be, and each is a real answer she respects.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'talked_her_into_it',
              label: 'Talk her into sitting the Open Trial again',
              predicate: {
                flagsSet: ['used:talk_your_way'],
                minRelationship: [{ characterId: 'mio', dimension: 'trust', value: 65 }],
              },
              setsFlags: ['mio_resits'],
              closesFlags: ['left_mio_be'],
            },
            {
              routeId: 'trained_on_the_stair',
              label: 'Train with her on the servants’ stair',
              predicate: {
                flagsSet: ['used:move_your_feet'],
                minRelationship: [{ characterId: 'mio', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['trained_with_mio'],
              closesFlags: [],
            },
            {
              routeId: 'left_her_be',
              label: 'Leave it with her',
              predicate: { flagsSet: ['spoke:mio', 'knows:mio_was_scholar'] },
              setsFlags: ['left_mio_be'],
              closesFlags: ['mio_resits'],
            },
          ],
          rewards: {
            xp: 120,
            items: [],
            flags: ['mio_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_below_stairs', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_tea_at_five',
      title: 'Tea at Five',
      summary:
        'A royal card, handed over in front of the whole Great Hall: the Princess Isolde will take tea with the scholar at five, in the Glass Annex.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['isolde_invited'] },
      involvedCharacterIds: ['isolde', 'varro'],
      involvedLocationIds: ['glass_annex'],
      knownRewardCopy: 'What a princess wants from a commoner with five points, and what she will give for it.',
      steps: [
        {
          id: 'her_offer',
          playerCopy: 'Hear what the princess wants, and answer her.',
          directorNotes:
            'She wants a second: a champion who owes nothing to any house, standing, and ideally winning, in front of the governors. She cannot back the player openly before the vote. She is amused, patient and entirely serious, and she will not be lied to twice. Turning her down is a real answer that she respects more than she shows. Taking her offer and Varro’s money at the same time is possible, and she will find out.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'became_her_second',
              label: 'Agree to be her second',
              predicate: {
                flagsSet: ['spoke:isolde'],
                minRelationship: [{ characterId: 'isolde', dimension: 'trust', value: 45 }],
              },
              setsFlags: ['isolde_second'],
              closesFlags: ['refused_isolde'],
            },
            {
              routeId: 'turned_her_down',
              label: 'Turn her down',
              predicate: { flagsSet: ['spoke:isolde', 'used:refuse'] },
              setsFlags: ['refused_isolde'],
              closesFlags: ['isolde_second'],
            },
            {
              routeId: 'played_both',
              label: 'Take her offer and Varro’s money',
              predicate: { flagsSet: ['spoke:isolde', 'spoke:varro', 'used:talk_your_way'] },
              setsFlags: ['played_both_sides'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['isolde_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_governors', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_purse',
      title: 'The Purse',
      summary:
        'Somebody on the rail above the Ring writes down every point you spend. The Rail Society keeps a book on how many days each commoner lasts, and nobody outside the Society has ever read it.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['first_duel_over'] },
      involvedCharacterIds: ['varro', 'piers', 'mio'],
      involvedLocationIds: ['rail_room', 'lowmarket', 'the_ring'],
      knownRewardCopy: 'What the Society has been doing to scholars for twenty-six years, in its own handwriting.',
      steps: [
        {
          id: 'find_the_purse',
          playerCopy: 'Find out what the Society writes in its book.',
          directorNotes:
            'The Purse sits open on a lectern in the Rail Room, members only by custom rather than by lock. Varro keeps it in plain sight because nobody outside the Society would dare. Piers knows everything in it and is terrified. On the third night the Society takes over the Broken Spur in Lowmarket with the day count chalked on a slate, and the book goes down the cliff with them.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_it',
              label: 'Take the Purse off its lectern',
              predicate: { hasItems: ['the_purse'] },
              setsFlags: ['holds_the_purse'],
              closesFlags: [],
            },
            {
              routeId: 'piers_talked',
              label: 'Get Piers to tell you what is in it',
              predicate: {
                flagsSet: ['spoke:piers'],
                minRelationship: [{ characterId: 'piers', dimension: 'trust', value: 40 }],
              },
              setsFlags: ['piers_talked'],
              closesFlags: [],
            },
            {
              routeId: 'read_it_there',
              label: 'Read it where it lies',
              predicate: { flagsSet: ['used:follow_the_money', 'visited:rail_room'] },
              setsFlags: ['read_the_purse'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 110,
            items: [],
            flags: ['knows:the_purse'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'what_to_do_with_it',
          playerCopy: 'Decide what to do with the Purse.',
          enterWhen: { flagsSet: ['knows:the_purse'] },
          directorNotes:
            'Three real choices, and they do not stack. Laying it before the governors is the honest one and only works once the governors are sitting and the player can put the book in their hands; it ends the Society as it is and makes Varro an enemy for life. Buying in is safe and complicit: the Society protects its own, and the player keeps their crest by betting on the next scholar. Holding it over Varro is leverage, and leverage has to be fed every day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'laid_it_before_them',
              label: 'Lay it before the governors',
              predicate: { hasItems: ['the_purse'], flagsSet: ['governors_sitting'] },
              setsFlags: ['purse_exposed'],
              closesFlags: ['bought_into_society', 'holding_varro'],
            },
            {
              routeId: 'bought_in',
              label: 'Join the Society and bet with them',
              predicate: {
                flagsSet: ['used:talk_your_way', 'spoke:varro'],
                minFactionReputation: [{ factionId: 'faction_society', value: 0 }],
              },
              setsFlags: ['bought_into_society'],
              closesFlags: ['purse_exposed'],
            },
            {
              routeId: 'held_it_over_him',
              label: 'Keep it, and make Varro pay for your silence',
              predicate: { flagsSet: ['used:talk_your_way', 'knows:the_purse'] },
              setsFlags: ['holding_varro'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['purse_settled'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_again',
      title: 'Again.',
      summary:
        'Instructor Brannoch runs dawn drill in the Training Yard for anyone who turns up, and almost nobody does. He has a counter he has never taught to anybody.',
      kind: 'SIDE',
      discoverWhen: { flagsSet: ['first_duel_over'] },
      involvedCharacterIds: ['brannoch'],
      involvedLocationIds: ['training_yard', 'the_ring'],
      knownRewardCopy: 'A way to beat somebody whose numbers are better than yours.',
      steps: [
        {
          id: 'earn_the_counter',
          playerCopy: 'Show Brannoch you keep the Code.',
          directorNotes:
            'He teaches the counter only to somebody who kept the Code when it cost them: took a loss rather than cheat, refused to settle anything outside the Ring, turned up to dawn drill more than once. He will not say that is the test. He says "Again." Somewhere around the third morning he says "Good," and then shows them how to stand still while somebody faster commits.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'came_to_drill',
              label: 'Turn up to dawn drill, and keep turning up',
              predicate: {
                flagsSet: ['visited:training_yard', 'used:move_your_feet'],
                minRelationship: [{ characterId: 'brannoch', dimension: 'respect', value: 45 }],
              },
              setsFlags: ['drilled_at_dawn'],
              closesFlags: [],
            },
            {
              routeId: 'kept_the_code',
              label: 'Keep the Code when it costs you',
              predicate: {
                flagsSet: ['used:hold_guard', 'first_duel_over'],
                minRelationship: [{ characterId: 'brannoch', dimension: 'respect', value: 55 }],
              },
              setsFlags: ['kept_the_code'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 130,
            items: [],
            flags: ['knows:gate_counter'],
            abilities: ['gate_counter'],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_the_five',
      title: 'Where the Five Came From',
      summary:
        'The academy calls your five unspent points the founder’s allowance. Instructor Brannoch’s crest reads far too low for a former imperial champion, and he never opens it in front of you.',
      kind: 'LEAD',
      discoverWhen: { flagsSet: ['knows:brannoch_low'] },
      involvedCharacterIds: ['brannoch', 'isolde'],
      involvedLocationIds: ['founders_hall', 'training_yard'],
      knownRewardCopy: 'Who has been paying for every scholar, and what it has cost him.',
      steps: [
        {
          id: 'find_the_register',
          playerCopy: 'Find out where the five points really come from.',
          directorNotes:
            'It is written down. The transfer register sits in a glass case beside the Headmistress’s seal in Founders’ Hall: twenty-eight entries, one a year, every one after the first in the same square hand. Brannoch will not tell anybody, and if pressed he says "Founder’s allowance," and goes back to the pells. Only a player who earns his trust or reads the register finds out. Never state it early.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'read_the_register',
              label: 'Read the transfer register',
              predicate: { hasItems: ['transfer_register'] },
              setsFlags: ['read_the_register'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_seal_clause',
              label: 'Find the clause about the seal',
              predicate: { flagsSet: ['used:quote_the_code', 'visited:founders_hall'] },
              setsFlags: ['found_the_seal_clause'],
              closesFlags: [],
            },
            {
              routeId: 'he_told_you',
              label: 'Get him to tell you',
              predicate: {
                flagsSet: ['spoke:brannoch'],
                minRelationship: [{ characterId: 'brannoch', dimension: 'trust', value: 60 }],
              },
              setsFlags: ['brannoch_told_you'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['knows:the_five'],
            abilities: ['give_a_point'],
            reputation: [],
          },
        },
        {
          id: 'what_you_owe_him',
          playerCopy: 'Decide what you owe Brannoch.',
          enterWhen: { flagsSet: ['knows:the_five'] },
          directorNotes:
            'He does not want to be owed. Giving a point back is possible under the seal; he refuses it twice and then, if the player does it anyway, has to sit down. Telling the governors where the five come from changes the vote, because it shows the scholarship was never the founder’s charity: one man has been paying for it. Keeping his secret is also a gift, and he notices.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'gave_one_back',
              label: 'Give him a point back',
              predicate: { flagsSet: ['used:give_a_point'] },
              setsFlags: ['gave_a_point_back'],
              closesFlags: ['kept_brannochs_secret'],
            },
            {
              routeId: 'told_the_governors',
              label: 'Tell the governors whose points they are',
              predicate: { flagsSet: ['used:talk_your_way', 'governors_sitting', 'knows:the_five'] },
              setsFlags: ['told_where_the_five_come_from'],
              closesFlags: ['kept_brannochs_secret'],
            },
            {
              routeId: 'kept_it',
              label: 'Keep his secret',
              predicate: { flagsSet: ['spoke:brannoch', 'knows:the_five'] },
              setsFlags: ['kept_brannochs_secret'],
              closesFlags: ['told_where_the_five_come_from'],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['five_settled'],
            abilities: [],
            reputation: [{ factionId: 'faction_academy', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_weeks_end',
      title: 'Week’s End',
      summary:
        'On the seventh day the twelve governors watch the open duels in the Ring, then vote in Founders’ Hall on ending the scholarship. Whatever you do this week is evidence.',
      kind: 'MAIN',
      discoverWhen: { flagsSet: ['first_duel_over'] },
      involvedCharacterIds: ['varro', 'isolde', 'seraphine', 'brannoch', 'mio'],
      involvedLocationIds: ['the_ring', 'founders_hall'],
      knownRewardCopy: 'Whether there is a scholarship next year, and whether you are still in it.',
      steps: [
        {
          id: 'the_open_duels',
          playerCopy: 'Stand in the Ring in front of the governors.',
          enterWhen: { flagsSet: ['weeks_end'] },
          directorNotes:
            'Twelve governors in the royal box, the Lord Marshal beside them, the whole academy on the rails. Varro is the top of the board and fights like it: patient, generous, his Charm making the crowd love him. The player’s numbers are worse in every line. Brannoch’s counter is the only clean way through, and the Purse the only dirty one. If clause nine protects the player, Varro has challenged Seraphine instead, and the player can watch her fight him in front of her father or end their own service by challenging him first.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'beat_varro',
              label: 'Beat Varro with Brannoch’s counter',
              predicate: { flagsSet: ['used:gate_counter'], atLocation: 'the_ring' },
              setsFlags: ['beat_varro'],
              closesFlags: ['lost_to_varro'],
            },
            {
              routeId: 'lost_to_varro',
              label: 'Fight Varro and lose',
              predicate: { flagsSet: ['used:cross_blades'], atLocation: 'the_ring' },
              setsFlags: ['lost_to_varro'],
              closesFlags: ['beat_varro'],
            },
            {
              routeId: 'made_him_withdraw',
              label: 'Make him withdraw his card',
              predicate: { flagsSet: ['knows:the_purse', 'used:talk_your_way'] },
              setsFlags: ['varro_withdrew'],
              closesFlags: [],
            },
            {
              routeId: 'stood_aside',
              label: 'Stay off the sand',
              predicate: { flagsSet: ['weeks_end', 'serving_seraphine'] },
              setsFlags: ['stood_aside'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['open_duels_done'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_count',
          playerCopy: 'Be in Founders’ Hall when the governors vote.',
          enterWhen: { flagsSet: ['the_count_called'] },
          directorNotes:
            'Twelve chairs, the Scholars’ Board uncovered, the Headmistress with the seal. Isolde may speak and has no vote. Five governors came to end it, four to keep it, three are deciding on what they saw today. Whatever the player did this week is now evidence. Do not let one good speech win the vote in a single turn; it is decided by what they did.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_by_the_ring',
              label: 'Kept, because of what they saw in the Ring',
              predicate: { flagsSet: ['beat_varro'] },
              setsFlags: ['scholarship_kept'],
              closesFlags: ['scholarship_ended'],
            },
            {
              routeId: 'kept_by_the_purse',
              label: 'Kept, because of what the Purse showed them',
              predicate: { flagsSet: ['purse_exposed'] },
              setsFlags: ['scholarship_kept'],
              closesFlags: ['scholarship_ended'],
            },
            {
              routeId: 'kept_by_the_five',
              label: 'Kept, because they learned whose points they were',
              predicate: { flagsSet: ['told_where_the_five_come_from'] },
              setsFlags: ['scholarship_kept'],
              closesFlags: ['scholarship_ended'],
            },
            {
              routeId: 'kept_by_the_princess',
              label: 'Kept, because the princess had a second to point at',
              predicate: { flagsSet: ['isolde_second', 'open_duels_done'], flagsUnset: ['lost_to_varro'] },
              setsFlags: ['scholarship_kept'],
              closesFlags: ['scholarship_ended'],
            },
            {
              routeId: 'ended',
              label: 'Ended, seven votes to five',
              predicate: { flagsSet: ['the_count_called'] },
              setsFlags: ['scholarship_ended'],
              closesFlags: ['scholarship_kept'],
            },
          ],
          rewards: {
            xp: 240,
            items: [],
            flags: ['the_count_held'],
            abilities: [],
            reputation: [{ factionId: 'faction_governors', amount: 10 }],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_varro_odds',
      atWorldMinute: 10 * 60 + 30,
      locationId: 'the_ring',
      publicCopy:
        'Lord Ansel Varro comes down from the rail with a silver pencil behind his ear, shakes the scholar’s hand like an old friend, and tells them their new odds.',
      directorNotes:
        'The first duel is over and the Society has already repriced the scholar. Varro is warm, generous and delighted whatever happened: a win moves the odds one way, a yield or a loss the other, and he quotes the number in days. He offers a drink at the rail some evening and mentions, as a kindness, that the Ladder goes up at one. He never threatens. Piers hovers behind him holding his coat and cannot meet the scholar’s eye. If the scholar yielded, Varro congratulates them on an excellent decision and looks at Seraphine a beat too long.',
      setsFlags: [],
      cancelledByFlags: [],
      requiresFlags: ['first_duel_over'],
      movesCharacters: [
        { characterId: 'varro', toLocationId: 'the_ring' },
        { characterId: 'piers', toLocationId: 'the_ring' },
      ],
    },
    {
      id: 'we_the_ladder',
      atWorldMinute: 13 * 60,
      locationId: 'great_hall',
      publicCopy:
        'Three challenge cards go up on the Ladder in the Great Hall, all against the scholar, all for tomorrow: ten, noon and two. The first is signed Piers Hallam.',
      directorNotes:
        'Varro paid all three challengers, which breaks clause fourteen, and nobody will say so out loud. Mio has read the cards before the player has. If the player is serving under yield terms, clause nine means the cards cannot go up, and this does not happen.',
      setsFlags: ['ladder_posted'],
      cancelledByFlags: ['serving_seraphine'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'piers', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_mio_supper',
      atWorldMinute: 19 * 60,
      locationId: 'gatehouse_room',
      publicCopy:
        'Mio Fenn climbs the gatehouse stair with a covered tray and a lamp, knocks once, and comes in without waiting for an answer.',
      directorNotes:
        'She brings the scholar supper every night, and waits with it if they are out. She has read the Ladder. She will not say what she thinks of it unless asked, and before she leaves she slides the bolt across the door herself and tells them to use it.',
      setsFlags: ['mio_brought_supper'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'mio', toLocationId: 'gatehouse_room' }],
    },
    {
      id: 'we_dawn_drill',
      atWorldMinute: 1440 + 6 * 60 + 15,
      locationId: 'training_yard',
      publicCopy:
        'At dawn drill a pell splinters under Brannoch’s blade, and for a moment his crest opens on its own: Strength 5, Speed 4, Mana 2, Guard 6, Charm 3. He closes it before anyone can look twice.',
      directorNotes:
        'Only for a player who has already found their way to the Training Yard; most of the academy is in bed. Those are low numbers for a man who was an imperial champion, and he knows exactly how low. If asked, he says "Founder’s allowance," and goes back to the pells.',
      setsFlags: ['knows:brannoch_low'],
      cancelledByFlags: [],
      requiresFlags: ['visited:training_yard'],
      movesCharacters: [],
    },
    {
      id: 'we_isolde_card',
      atWorldMinute: 1440 + 10 * 60,
      locationId: 'great_hall',
      publicCopy:
        'A royal page in green and gold crosses the Great Hall mid-morning and hands the scholar a card: tea with the Princess Isolde, five o’clock, the Glass Annex.',
      directorNotes:
        'Everybody sees it, which is the point: the princess wants the Society to see it and cannot be seen to want that. Seraphine goes very still. Varro raises his cup to the scholar across the hall.',
      setsFlags: ['isolde_invited'],
      cancelledByFlags: [],
      requiresFlags: ['first_duel_over'],
      movesCharacters: [],
    },
    {
      id: 'we_the_forfeits',
      atWorldMinute: 1440 + 14 * 60 + 30,
      locationId: 'the_ring',
      publicCopy:
        'The minute-glass runs out three times over an empty patch of sand. Three forfeits go up on the board, and three points leave the scholar’s crest, all from the same line.',
      directorNotes:
        'This only happens to a scholar who did nothing at all about the Ladder. Three points from one line takes it to zero, and the Charter sends them home tonight. It is exactly what happened to Mio last year, and she knows it the moment she hears.',
      setsFlags: ['forfeited_the_ladder', 'crest_zeroed'],
      cancelledByFlags: ['survived_the_ladder', 'serving_seraphine'],
      requiresFlags: ['ladder_posted'],
      movesCharacters: [],
    },
    {
      id: 'we_spur_night',
      atWorldMinute: 2 * 1440 + 21 * 60,
      locationId: 'lowmarket',
      publicCopy:
        'The Rail Society takes over the Broken Spur in Lowmarket for the night. The day count is chalked on a slate behind the bar, with the scholar’s name at the top.',
      directorNotes:
        'Varro buys every round. The Purse is on the table at his elbow, open, because this is the one night a year the Society forgets that anybody else can read. Piers is drunk enough to be honest. The commoners in the tavern are betting the other way, quietly.',
      setsFlags: ['spur_night'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'varro', toLocationId: 'lowmarket' },
        { characterId: 'piers', toLocationId: 'lowmarket' },
      ],
    },
    {
      id: 'we_varro_pins_his_card',
      atWorldMinute: 3 * 1440 + 12 * 60,
      locationId: 'great_hall',
      publicCopy:
        'Lord Ansel Varro pins his own card to the Ladder in front of the whole hall: a challenge to the scholar, Week’s End, two o’clock, before the governors.',
      directorNotes:
        'He makes it look generous: the scholar gets to fight the best in front of the people who matter. It is the last nail, and the Society cheers. If the Purse has already been put in front of anybody who matters, he does not dare.',
      setsFlags: ['varro_challenged'],
      cancelledByFlags: ['serving_seraphine', 'purse_exposed'],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'varro', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_varro_turns_on_the_shield',
      atWorldMinute: 3 * 1440 + 12 * 60 + 5,
      locationId: 'great_hall',
      publicCopy:
        'Lord Ansel Varro pins a card to the Ladder: a challenge to Lady Seraphine Aldric, Week’s End, two o’clock, before the governors.',
      directorNotes:
        'Clause nine protects the scholar while they serve, so Varro goes after the shield instead. If he beats her, he will take her highest line in front of her father. The player can end their own service by challenging Varro first, which is the only way to stand in front of her.',
      setsFlags: ['varro_challenged_seraphine'],
      cancelledByFlags: ['purse_exposed'],
      requiresFlags: ['serving_seraphine'],
      movesCharacters: [{ characterId: 'varro', toLocationId: 'great_hall' }],
    },
    {
      id: 'we_the_marshal',
      atWorldMinute: 4 * 1440 + 10 * 60,
      locationId: 'the_ring',
      publicCopy:
        'Lord Marshal Corvin Aldric rides in through the gate with six outriders and goes straight to the Ring to watch his daughter drill.',
      directorNotes:
        'He is cold, correct and has come to see whether Seraphine took a point or a yield in her first week. She changes in front of him: shorter answers, harder blade, no jokes at all. If she has been beaten by the scholar, he knows before anybody tells him.',
      setsFlags: ['marshal_arrived'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'seraphine', toLocationId: 'the_ring' }],
    },
    {
      id: 'we_governors_arrive',
      atWorldMinute: 5 * 1440 + 16 * 60,
      locationId: 'founders_hall',
      publicCopy:
        'The twelve governors arrive in carriages. In Founders’ Hall the cloth comes off the Scholars’ Board: twenty-eight names, and only the first has a graduation date beside it.',
      directorNotes:
        'Lady Governor Maud Varro greets her son warmly and the princess coolly. The governors are sitting from now until the count, and anything laid in front of them is laid before the whole board.',
      setsFlags: ['governors_sitting'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [{ characterId: 'isolde', toLocationId: 'founders_hall' }],
    },
    {
      id: 'we_the_first_name',
      atWorldMinute: 5 * 1440 + 16 * 60 + 30,
      locationId: 'founders_hall',
      publicCopy:
        'A governor reads the first name on the Scholars’ Board aloud, and half the hall turns to look at Instructor Brannoch, who is standing at the back with his arms folded and does not look up.',
      directorNotes:
        'Only for a player who has been in Founders’ Hall this week. The first scholar was Brannoch, the only one who graduated. Anybody who wonders why a former imperial champion would keep a crest that low has the start of the answer.',
      setsFlags: ['knows:brannoch_low'],
      cancelledByFlags: [],
      requiresFlags: ['visited:founders_hall'],
      movesCharacters: [{ characterId: 'brannoch', toLocationId: 'founders_hall' }],
    },
    {
      id: 'we_weeks_end',
      atWorldMinute: 6 * 1440 + 14 * 60,
      locationId: 'the_ring',
      publicCopy:
        'Week’s End. The governors take the royal box, the whole academy packs the rails, and Instructor Brannoch turns the minute-glass for the first of the open duels.',
      directorNotes:
        'The biggest crowd of the year. Every duel today is evidence for the count. Varro is warm to everybody. Seraphine’s father is in the box. Mio is in the tunnel mouth with the scholar’s bag, as always, and for once she is watching the sand.',
      setsFlags: ['weeks_end'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'varro', toLocationId: 'the_ring' },
        { characterId: 'brannoch', toLocationId: 'the_ring' },
        { characterId: 'isolde', toLocationId: 'the_ring' },
        { characterId: 'seraphine', toLocationId: 'the_ring' },
        { characterId: 'mio', toLocationId: 'the_ring' },
      ],
    },
    {
      id: 'we_the_count',
      atWorldMinute: 6 * 1440 + 19 * 60,
      locationId: 'founders_hall',
      publicCopy: 'The governors file into Founders’ Hall to count. The doors stay open, and anybody may watch.',
      directorNotes:
        'Twelve chairs, the seal, the uncovered board. Isolde speaks once, briefly. The vote is decided by what happened this week, not by the best speech in the room.',
      setsFlags: ['the_count_called'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'isolde', toLocationId: 'founders_hall' },
        { characterId: 'brannoch', toLocationId: 'founders_hall' },
        { characterId: 'varro', toLocationId: 'founders_hall' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_the_count',
      kind: 'FINALE',
      label: 'Whether the scholarship survives the seventh day',
      seedHint: 'A notice in the Great Hall: the governors sit on the seventh day, to consider a motion.',
      payoffHint: 'Twelve votes in Founders’ Hall, and the scholar either still standing in front of them or not.',
      weight: 1,
    },
    {
      id: 'p_the_five',
      kind: 'MYSTERY',
      label: 'Where the five points came from',
      seedHint: 'Brannoch’s crest reads low for a former imperial champion, and he never opens it in front of the scholar.',
      payoffHint: 'Twenty-eight entries in the transfer register, all five points, every one after the first in the same square hand.',
      weight: 0.8,
    },
    {
      id: 'p_seraphines_offer',
      kind: 'RIVAL',
      label: 'Why the best duellist of the year picked the scholar with the lowest numbers in the Ring',
      seedHint: 'She takes points from the highest line, never the lowest.',
      payoffHint: 'Clause nine: a yield that is a shield, and an insult that was the kindest thing anybody offered.',
      weight: 0.9,
    },
    {
      id: 'p_nineteen_days',
      kind: 'RELATIONSHIP',
      label: 'The maid-knight who knows the Code too well',
      seedHint: 'Mio knows the Ring Code clause by clause and never once sets foot on the sand.',
      payoffHint: 'A grey servant’s crest reading Speed 7, and an old silver one in a locked drawer reading Mana 0.',
      weight: 0.85,
    },
    {
      id: 'p_the_purse',
      kind: 'BOSS',
      label: 'Varro and the little book',
      seedHint: 'A silver pencil on the rail above the Ring, writing down every point the scholar spends.',
      payoffHint: 'The Purse on its lectern: proxies, payments and a day count with the scholar’s name on it, in Varro’s hand.',
      weight: 0.9,
    },
  ],
  archetypes: [
    {
      id: 'arch_forge',
      name: 'You Worked a Forge',
      role: 'Smith’s apprentice: strength and grit',
      summary: 'You swung a hammer for a living, so you hit harder and last longer than your crest says, and you can take a blow without folding.',
      playstyle: ['Hits hard', 'Takes a blow', 'Stubborn'],
      blurb: 'Ten years at your uncle’s anvil in a river town. The crest reads Strength 2. Your forearms disagree.',
      attributeBonus: { might: 3, resolve: 1 },
      skillProficiencies: { swordwork: 2, bracing: 3 },
      startingItems: [{ itemId: 'whetstone', qty: 1 }],
      startingAbilities: ['spend_a_point', 'hold_guard'],
      startingReputation: [{ factionId: 'faction_below_stairs', amount: 5 }],
    },
    {
      id: 'arch_runner',
      name: 'You Ran Messages',
      role: 'Courier: speed and city sense',
      summary: 'You carried letters across the capital at a run, so you are quick on your feet, hard to pin down, and good at getting into places.',
      playstyle: ['Fast', 'Slippery', 'Knows back doors'],
      blurb: 'Three years of stairs, alleys and servants’ doors. You once delivered a letter to the gatehouse you now sleep in.',
      attributeBonus: { agility: 3, mind: 1 },
      skillProficiencies: { footwork: 3, sneaking: 2 },
      startingItems: [{ itemId: 'courier_map', qty: 1 }],
      startingAbilities: ['spend_a_point', 'slip_off'],
      startingReputation: [],
    },
    {
      id: 'arch_scribe',
      name: 'You Copied Contracts',
      role: 'Scribe: rules, clauses and talk',
      summary: 'You copied deeds for a magistrate, so you read the fine print, find the loophole, and argue a rule better than most nobles.',
      playstyle: ['Finds the clause', 'Talks well', 'Careful'],
      blurb: 'Five years of other people’s contracts taught you that every rulebook has one clause somebody hoped you would skip.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { the_code: 3, talking: 2 },
      startingItems: [{ itemId: 'pen_case', qty: 1 }],
      startingAbilities: ['spend_a_point', 'quote_the_code'],
      startingReputation: [{ factionId: 'faction_academy', amount: 5 }],
    },
    {
      id: 'arch_charmer',
      name: 'You Sold Village Charms',
      role: 'Hedge sorcery: small spells, sharp eyes',
      summary: 'You sold luck charms and cured warts at market fairs, so you have a feel for small sorcery and for what a customer really wants.',
      playstyle: ['Small spells', 'Reads people', 'Improvises'],
      blurb: 'Two of your charms actually work. You never found out which two, so you learned to read the customer instead.',
      attributeBonus: { arcana: 3, presence: 1 },
      skillProficiencies: { spellwork: 3, reading: 2 },
      startingItems: [{ itemId: 'charm_pouch', qty: 1 }],
      startingAbilities: ['spend_a_point', 'cast_a_spell'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What name is on your scholarship letter?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Ren Marlow' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'What did you do before the academy?',
      helpText:
        'Your trade before you won the Open Trial. Your crest cannot count it, so it is what you are good at that nobody’s numbers show. It is fixed for the whole story. It does not decide where your five points go, whom you duel, or whom you trust. All of that is yours.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'appearance',
      label: 'What does the Ring see across the sand?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. A borrowed uniform a size too big, boots resoled twice, and a grin that annoys nobles.',
    },
  ],
  /**
   * Where this can end up.
   *
   * Four of twelve are losses: a line at zero, the scholarship ended, buying
   * into the Society, and walking down the cliff stairs. "Down the Cliff
   * Stairs" is open from early on. "A Year of Books" is what yielding becomes
   * if the player plays it all the way, and it is not a loss. The two unique
   * endings need a secret the player has to earn: Brannoch’s counter, or where
   * the five came from.
   */
  endings: [
    {
      id: 'end_the_second_week',
      name: 'The Second Week',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['the_count_held'],
        flagsUnset: ['crest_zeroed', 'serving_seraphine', 'bought_into_society'],
      },
      condition:
        'The player is still enrolled when the count is done, with every line above zero, and nothing grand is settled. The scholarship may or may not survive; the player did. Play it small: a Monday, a seat by the door in the Great Hall, a new challenge on the Ladder, and a scholar who now knows exactly how the week works.',
      epilogue:
        'On the eighth morning the Purse opens a new page. The day count under the scholar’s name has passed seven and nobody has bothered to rub it out. Mio leaves supper at seven. The crest, opened in the dark, reads a little higher than it did.',
      hint: '',
    },
    {
      id: 'end_a_year_of_books',
      name: 'A Year of Books',
      rarity: 'COMMON',
      minTurn: 25,
      requires: { flagsSet: ['serving_seraphine', 'the_count_held'], flagsUnset: ['crest_zeroed'] },
      condition:
        'The player yielded on day one, carried the books, kept the terms, and was shielded by clause nine all week. This is not a defeat and must not read as one. A year of errands with Seraphine Aldric turns out to be a year of something else: lessons, arguments, a rival who is also, slowly, the person the player sees first every morning.',
      epilogue:
        'The books get heavier every term, because she keeps adding to them, because she has noticed that the scholar reads them. On the last day of the year she unties the white ribbon herself and says the terms are met. Then she challenges them to a duel, properly, as equals.',
      hint: 'Clause nine is longer than it looks.',
    },
    {
      id: 'end_the_last_scholar',
      name: 'The Last Scholar',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['scholarship_ended'], flagsUnset: ['crest_zeroed'] },
      condition:
        'The governors voted the scholarship down. The player is still enrolled, because the motion ends the scholarship and not the scholar, so they are the last commoner the academy will ever take. Write the weight of it without self-pity: an empty gatehouse room next year, and a scholar who stays anyway.',
      epilogue:
        'There is no Open Trial next spring. The gatehouse room stays the scholar’s for three years, and in the third the windowsill gets its twenty-eighth name, carved by its owner on graduation night, with a space left after it on purpose.',
      hint: '',
    },
    {
      id: 'end_zero_in_a_line',
      name: 'Zero in a Line',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['crest_zeroed'] },
      condition:
        'A line on the scholar’s crest hit zero, by forfeits, by proxies or by one duel too many, and the Charter sends them home the same day. This is a real loss and should be written as one, but not as a humiliation: the people who mattered come to the gate, and the scholar walks down the cliff stairs on their own feet.',
      epilogue:
        'The crest goes back to the Headmistress in a velvet bag. The Purse closes the line at the number of days. Mio is at the bottom of the cliff stairs before the scholar is, holding their bag, and says the only thing she has to say: "Next spring. The Open Trial. I will help."',
      hint: '',
    },
    {
      id: 'end_bought_in',
      name: 'Bought In',
      rarity: 'UNCOMMON',
      minTurn: 20,
      requires: { flagsSet: ['bought_into_society'] },
      condition:
        'The player joined the Rail Society and its book. They are safe now: the Society protects its own. They are also the first scholar to bet on the next one. Do not moralise; let the comfort be real and let the player notice who stops sitting with them.',
      epilogue:
        'They get a burgundy coat and a chair in the Rail Room. Varro is a generous captain. Next spring a new scholar walks onto the sand in their first hour, and the pencil on the rail is in the player’s hand.',
      hint: '',
    },
    {
      id: 'end_down_the_cliff_stairs',
      name: 'Down the Cliff Stairs',
      rarity: 'UNCOMMON',
      minTurn: 12,
      requires: { flagsSet: ['left_the_map'] },
      condition:
        'The player walked out of the academy, down the three hundred steps to Lowmarket, and did not come back. This is a coherent choice and should not be punished or redeemed: the place was rigged and they saw it early. Show who noticed they had gone, and how quickly.',
      epilogue:
        'The Purse records the shortest line in its history and Varro pays out with a smile. In Lowmarket the scholar is bought drinks for a week by people who bet the other way and are glad of the story anyway. Brannoch does not mention it to anybody, and trains a little longer at the pells that night.',
      hint: '',
    },
    {
      id: 'end_two_points_apart',
      name: 'Two Points Apart',
      rarity: 'RARE',
      minTurn: 30,
      requires: {
        flagsSet: ['beat_seraphine'],
        flagsUnset: ['crest_zeroed'],
        minRelationship: [
          { characterId: 'seraphine', dimension: 'respect', value: 70 },
          { characterId: 'seraphine', dimension: 'affection', value: 65 },
        ],
      },
      condition:
        'The player beat Seraphine honestly and became the first person she believes. Rivals to something more, earned through respect first and trust second. It goes as far as one kiss, on her terms, somewhere the Society cannot see, and both of them are bad at it in an exact, formal way.',
      epilogue:
        'She gives the scholar her glove in front of the whole Great Hall, which in House Aldric means equal, and in the Great Hall means something else entirely. Their crests stay two points apart all year, and they take turns about which way.',
      hint: 'She takes from the highest line. Make her.',
    },
    {
      id: 'end_the_princess_second',
      name: 'The Princess’s Second',
      rarity: 'RARE',
      minTurn: 32,
      requires: { flagsSet: ['isolde_second', 'scholarship_kept'] },
      condition:
        'The player became Isolde’s second and the scholarship survived the count. A negotiation that turned real somewhere around the fourth day, if the player stopped treating her as a vote. Write the moment she stops being amused, and does not mind.',
      epilogue:
        'Her second stands behind her chair at court, which scandalises everybody, which she enjoys. The orange trees fruit in the spring. The next scholar arrives to find a card waiting in the gatehouse room: tea, five o’clock, the Glass Annex, with two signatures on it.',
      hint: '',
    },
    {
      id: 'end_next_years_scholar',
      name: 'Next Year’s Scholar',
      rarity: 'RARE',
      minTurn: 28,
      requires: { flagsSet: ['mio_resits'], flagsUnset: ['crest_zeroed'] },
      condition:
        'Mio Fenn decided to sit the Open Trial again, because of the player. This is her ending as much as theirs: she does the work, she runs the stair, and she lets herself be thanked exactly once. If the scholarship ended, she sits it anyway and the academy has to answer her.',
      epilogue:
        'In the spring a maid-knight hands in her apron and her grey crest, which reads Speed 7 when the examiner finally looks at it. Four thousand people sit the Open Trial. The scholar is in the square at Lowmarket when the name is read, and so is Piers Hallam, who pays the whole tavern’s tab.',
      hint: '',
    },
    {
      id: 'end_the_purse_is_closed',
      name: 'The Purse Is Closed',
      rarity: 'RARE',
      minTurn: 30,
      requires: { flagsSet: ['purse_exposed'] },
      condition:
        'The player put the Purse in the governors’ hands. Twenty-six years of wagers on scholars were read out in Founders’ Hall, and last year’s clause fourteen payments in Varro’s own hand. The Society is disbanded as it stands. Write the cost honestly: Varro is now a permanent enemy with a powerful mother, and the rail is very quiet for a while.',
      epilogue:
        'The Rail Room becomes a reading room, which nobody uses. The Purse is kept in the glass case beside the transfer register. Mio reads the line with her name on it once, then asks for it to be left open at that page.',
      hint: '',
    },
    {
      id: 'end_the_gate_counter',
      name: 'The Gate Counter',
      rarity: 'UNIQUE',
      minTurn: 35,
      requires: { flagsSet: ['beat_varro', 'knows:gate_counter'] },
      condition:
        'The player learned Brannoch’s counter and beat Varro with it on the sand at Week’s End, in front of the governors, with worse numbers in every line. The crowd should not understand what happened for about a second. Brannoch should understand immediately, and say one word.',
      epilogue:
        'Brannoch says "Good." The scholarship survives the count. Varro admits to the scholar, quietly, that he was mostly money. Twenty-eight years on, there is going to be a second date on the Scholars’ Board, and the counter has a name now that is not Brannoch’s.',
      hint: 'He will only show somebody who keeps the Code.',
    },
    {
      id: 'end_five_points_back',
      name: 'Five Points Back',
      rarity: 'UNIQUE',
      minTurn: 30,
      requires: { flagsSet: ['gave_a_point_back', 'knows:the_five'] },
      condition:
        'The player found out whose points they had been spending and gave one back under the seal. Brannoch refused twice. Write a forty-seven-year-old soldier opening his crest in front of somebody for the first time in twenty-eight years, and sitting down.',
      epilogue:
        'His crest reads one higher than it has in a decade. He spends it on Speed, because he says he is getting slow. Every scholar after this one finds a line added to their letter in a square hand: "Five points. Not the founder’s. Mine. Spend them well."',
      hint: '',
    },
  ],
  opening:
    '"Commoner." Across the duelling ring, a noblewoman in white and gold draws a slim sword. "Yield now, and you can carry my books for a year."\n\nThe nobles on the rails laugh. Someone shouts her name like a toast: "Seraphine!"\n\nIt is your first hour at the academy. The silver crest pinned over your heart opens a window of light:\n\n[Strength 2, Speed 2, Mana 2, Guard 2, Charm 2]\n[Unspent: 5. Spend them any time.]\n\nHers reads Speed 8.\n\nThe scarred instructor raises a hand. "First clean touch wins. Loser pays a point. Zero in any line goes home. Begin on ten."\n\nThe rails start counting.\n\nSeraphine levels her blade at your heart. "Well? Yield, or spend them."',
  openingPanel: {
    assetKey: 'story_crest_academy/opening',
    alt: 'Seraphine in a white and gold duelling coat levelling a slim sword across white sand, a crowd on the stone rails behind her, a small window of light glowing over your heart.',
  },
  openingSuggestions: [
    '"I won’t yield. And if I win, you carry mine."',
    'I take my stance and hold all five points until she moves.',
    'I put all five points into Charm and ask her to dinner.',
  ],
  coverDirection: [
    'SUBJECT: Seraphine, the rival duellist, alone and unmistakable in the foreground of a key visual for a fantasy academy anime about duels and stat points.',
    'She fills the frame from the waist up, centred and close, holding about two thirds of the picture.',
    'A pale gold braid over one shoulder, grey eyes, a white and gold duelling coat with a high collar and crossed swords stitched on the cuffs.',
    'She holds a slim duelling sword levelled just past the viewer, blade catching the light, her other hand on her hip.',
    'Her expression is cool, proud and challenging, one eyebrow raised, looking straight at the viewer.',
    'Between her and the viewer floats a small translucent silver-blue window of light, like a game status panel, showing five glowing bars of different lengths and one brighter empty slot: no letters, no numbers, nothing that reads as writing.',
    'HER FACE STAYS CLEAN: no glow, marks or overlays on her face or skin.',
    'Every light effect stays on the window, the blade and the title, never on her face.',
    'BEHIND HER, soft and secondary: a raked white sand duelling ring, carved stone rails crowded with nobles in fine coats, a royal box under a green awning, tall stone academy towers on a cliff edge against a bright sky.',
    'LIGHT: bright late-morning sun from behind her, rimming her in gold, and a cool silver-blue glow from the window across her coat and sword.',
    'TITLE: the words CREST ACADEMY painted into the art in the upper third as an elegant bold fantasy-academy logo, silver with a gold edge and a small plain silver badge stamped with an open hand between the words,',
    'spelled exactly CREST ACADEMY, large and legible at thumbnail size. No other text anywhere.',
  ].join(' '),
  publishedAt: null,
};

export const CREST_ACADEMY = StoryVersion.parse(raw);

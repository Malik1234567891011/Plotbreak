import { StoryVersion } from '@plotbreak/contracts';

/**
 * "Affection: 97" — a court romance where the player already knows the answer.
 *
 * Bible: `docs/story-bibles/new50/44_AFFECTION_97.md`. Story #44 of the
 * fifty-story slate, built on Good Morning, Husband's shape: one relationship
 * at the centre, a small cast who each want something specific this fortnight,
 * and ordinary scenes (a dance card, a map table at two in the morning, doing a
 * bride's hair) that are worth playing on their own.
 *
 * The inversion is the point. Every romance withholds whether he loves you.
 * This one hands it over on the first screen, as a number in a frame of light
 * over his head, and asks the questions that are left: why he says the
 * opposite, what he will do about it in nine days, and what the player will do
 * with knowing. The number is always true and never predictive. He can be at
 * ninety-nine and still give his word to somebody else in a chapel.
 *
 * Two things stop the number making it easy. It shows one person, so Sir
 * Bastien, who is warm and flirts in public and may mean it, has to be taken on
 * trust. And it closes for good the first time Aldric says it to her face, so
 * getting what she wants costs her the advantage.
 *
 * Playable span: the betrothal fortnight in close-up. The Rose Ball tonight,
 * Viola's offer in the morning, tea with the Queen, the search of the Ladies'
 * Gallery, the chapel rehearsal, and the Midsummer Rite on the tenth day,
 * which is where most endings live.
 *
 * What production reads. `runTurnPure` sees the premise, tone guide, hard
 * canon, cast, opening, style examples, places, quest items, factions, quest
 * summaries, world events and the first twelve endings. It never sees step
 * notes, promises, resources, or any ability except the chosen archetype's
 * starting one. So the rules of the window are written out in hard canon and
 * again on the quest item the player starts holding, and every archetype
 * starts with one ability that tells the storyteller what it is for.
 *
 * Three invisible variables. Composure is the one honest GOOD_HIGH, because
 * `resolveRest` refills those and a lady-in-waiting's poise genuinely runs out
 * and comes back with sleep. Gossip comes first among the descending pair on
 * purpose: public violence raises the first GOOD_LOW in array order, and a
 * scene at court is talk before it is anything else. His Wall drifts down on
 * its own, because nine days in the same rooms does that, and pushing him or
 * using the number against him puts it back up.
 */

const raw = {
  id: 'sv_affection_97_1',
  storyId: 'story_affection_97',
  version: 1,
  title: 'Affection: 97',
  fantasyLabel: 'He says he despises you. It says 97.',
  hook: 'You are the only person at court who can see the little window of light over the crown prince’s head. He has just told you he despises you. It says Affection 97, and it went up when he said it.',
  premise:
    'You are a lady-in-waiting at the royal palace of a small kingdom of river towns and vineyards. For eleven months you have carried the Queen’s letters, kept her secrets and been insulted, briefly and exactly, by her son.\n\n' +
    'This morning you woke and found you could see a small frame of light hanging above Crown Prince Aldric’s head. Nobody else can see it. It has one line you can read, a word and a number.\n\n' +
    'This afternoon he sent everyone else out of the music room and told you he despises you, and the number went up:\n\n' +
    '[Affection 97 ▲]\n\n' +
    'The number is always true. It does not tell you why he says the opposite, or what he will do about it.\n\n' +
    'In nine days, at the Midsummer Rite, he gives his word to Lady Viola Ashgrove in front of the whole court. Her family’s bank holds the crown’s war debt, and the marriage cancels it. Two springs ago, the last person he was seen to like was dismissed from the palace for a theft she did not commit.\n\n' +
    'So you know how he feels. You need to find out why he is lying, and decide what to do before Midsummer: make him say it, keep his secret, use it, or walk away from all of it.',
  creatorId: 'creator_official',
  creatorName: 'Plotbreak Studios',
  official: true,
  coverImage: null,
  keyArt: null,
  tags: ['Romance', 'Romance fantasy', 'Court intrigue', 'Comedy', 'Drama'],
  mechanicsChips: [
    'A number only you can see',
    'He can still choose the crown',
    'Nine days to Midsummer',
    'A bride with her own plan',
    'The court remembers everything',
  ],
  contentDescriptors: ['ROMANCE', 'MORAL_AMBIGUITY'],
  intensity: 'LIGHT',
  creatorNote:
    'You can call his bluff on turn one, obey him to the letter, tell him about the number, or spend the fortnight helping his bride escape him. The number is always true. It never tells you what he will do, and he can love you and still choose the crown.',
  rules: {
    defeatMode: 'FAIL_FORWARD',
    progressionMode: 'MILESTONE',
    revealExactDc: false,
    revealCheckMath: false,
    allowsCombat: false,
    allowsRomance: true,
    startingLocationId: 'music_room',
    startWorldMinute: 16 * 60 + 30,
    startingItems: [
      { itemId: 'the_window', qty: 1 },
      { itemId: 'dance_card', qty: 1 },
    ],
    hardCanon: [
      'Everyone in this story is an adult. The player is twenty-three. Crown Prince Aldric is twenty-five, Lady Viola Ashgrove twenty-four, Sir Bastien Roche twenty-seven, Lady Cressida Fane (Cress) twenty-nine, Maren Lisle thirty-one and Queen Ottilie fifty-one.',
      'Rosewall Palace is the royal seat of Halcyne, a small kingdom of river towns and vineyards. The player has been a lady-in-waiting in Queen Ottilie’s household for eleven months. Ladies-in-waiting are paid companions and secretaries to royal women, from minor families; they sleep two to a room in the Ladies’ Gallery. The player shares a room with Cress Fane. For this fortnight the Queen has assigned the player to attend Lady Viola, who arrived at court yesterday. Right now Lady Viola is waiting in the Ashgrove Suite to be dressed for the ball, and the player, her attendant, is already late. Where this canon calls the player she, use the pronouns the player chose.',
      'King Edmar died three winters ago after a border war the crown paid for with borrowed money. The lender is House Ashgrove, the kingdom’s great banking family. Aldric has been promised to Lady Viola Ashgrove since he was nineteen; on their wedding the debt becomes her dowry and is cancelled. At the Midsummer Rite, in the Rose Chapel on the evening of the tenth day, he gives his word in public, and once given it cannot be taken back without the whole debt falling due at once. Without the marriage the crown cannot pay the northern garrisons past autumn.',
      'Since the player woke this morning, a small frame of pale light hangs a hand’s width above Aldric’s head whenever she can see him. Only the player can see it. Nobody else has one; she has looked at everybody. Mirrors and paintings do not show it, and it cannot be touched. The player calls it the window.',
      'The window’s first line reads [Affection NN] followed by ▲ or ▼ for the last change. It rose to 97 when Aldric told the player he despised her, and to 98 when he ordered her to keep away; that is where the story starts. It is always true: it shows how Aldric feels about the player at that moment. It never says why, and it never predicts what he will do. It moves by one or two for small things and by more for large ones, and it can fall as well as rise, a long way if she uses him, lies to him or humiliates him. It is not a score out of a hundred. On an ordinary day it wanders a point or two either way in the high nineties, dipping when he is jealous, hurt or frightened for her and recovering when she is kind; it passes 100 only for something he will remember for years. It does not climb every beat: a beat where it holds still or dips is what makes the next rise land.',
      'Under the number is a second line, greyed out like ink under water. More lines can sharpen during the fortnight: [Thinking of: …] after the first time the player and Aldric are alone together after the ball, and [Afraid of: …] once she knows what happened to Maren Lisle. The grey line becomes readable only at the dry fountain in the Sunken Garden, where it reads [Wished for: this]. In prose the window appears as a short bracketed line on its own, like [Affection 98 ▲], only when the number changes or the player looks, and never more than twice in a beat.',
      'The window closes for good the first time Aldric says out loud, to the player’s face, what it says: that he loves her, in his own words, meaning it. Reading the number back, repeating it in disbelief or joking about it does not count. After that she has to know him the way everybody has to know anybody.',
      'If the player tells Aldric about the window, he does not believe her. Then he tests it: he says something cutting, or something kind, and asks what it did. When her answer is right, he is mortified, and the number moves at each step. He never guesses at the window on his own, and nobody else at court ever believes in it.',
      'The window is the answer to a wish. Last night Aldric climbed the wall of the walled Sunken Garden and dropped a royal crown-piece into its dry fountain, which an old palace story says grants one honest wish in each generation, and wished that the person he could not tell would know anyway. He does not know it worked. The player learns this only by finding the fountain, the coin, or what Maren Lisle remembers. It is never narrated to her.',
      'Two springs ago Aldric was openly fond of the court harpist, Maren Lisle, his only friend at court; it was friendship, not courtship. Within a month the Queen’s sapphire brooch was found in Maren’s music case and she was put in a carriage at dawn without a hearing. Queen Ottilie had it put there, to protect the Ashgrove marriage, and wrote the brooch out of her jewel book in her own hand the day before. Aldric suspects and cannot prove it. Since then he has been cold in public to everybody he likes, and coldest to the player. Maren now teaches music in a rented room on Lantern Street in the lower town, a mile from the palace’s postern gate.',
      'Before today Aldric has spoken perhaps forty words a week to the player for eleven months, most of them cutting. Once, at two in the morning in the Map Library, he told her she was standing in his light, and then did not move to another table. In the winter she corrected his pronunciation of a northern town in front of the council secretary, and he has called her “the expert” ever since. Since the winter somebody has been leaving books of northern poetry, one at a time, on her window seat in the Long Gallery. It is Aldric. She does not know that.',
      'Tonight is the Rose Ball, which opens the betrothal fortnight. Aldric must open the dancing with Viola. At court a lady may not refuse a dance to anyone of higher rank, and a crown prince may dance with anybody he likes, which is why he has ordered the player to keep away.',
      'The palace guard answers to Sir Bastien inside the palace and to the Queen above him. Anybody seen striking another person at court, or reported for it, is arrested by the guard and dismissed, whatever their rank. What happens with no witness stays between the two people, and Aldric would sooner be struck again than report her. Nobody duels, nobody draws a sharp blade in anger anywhere in the palace, and nobody here dies of a quarrel.',
      'Romance in this story goes no further than a kiss, and nobody is touched without being asked. A kiss in public is a scandal. A kiss in private is a secret somebody may learn.',
      'Nothing obliges the player to love Aldric, keep her post, keep the window secret or stay at court. Calling his bluff, obeying him, telling him about the window, using it, helping Viola, siding with the Queen, choosing Sir Bastien and leaving the palace are all real paths with real consequences.',
    ],
    toneGuide:
      'Romantic comedy at a royal court: quick, warm, specific, with real stakes under it. The comedy is the gap between what Aldric says and what the number does. Let him be cutting and let the arrow undercut him, and never explain the joke. ' +
      'The window is always true and never predictive. It tells the player how he feels and never what he will choose, so the tension lives in his choices, in the Queen, the debt and the nine days, not in whether he cares. ' +
      'The court is small and it talks. A dance is news by breakfast, a raised voice by noon, and the Queen hears everything by supper. Consequences are social and they stick. A player who lies, shouts, sulks or wanders off gets a court that remembers, and one who strikes somebody in front of witnesses gets a guard that arrests. ' +
      'Nobody is a pure villain. The Queen did a cruel thing for a real reason, Viola is using the player and says so, and Bastien began as a decoy and stopped. Everybody can say no, change their mind, bargain or leave. ' +
      'Romance is flirtatious, tense and heartfelt, never more than a kiss, always asked for. If a scene has nothing at stake, keep it short and pleasant. The face at the top of a beat is Aldric’s whenever he is in the scene.',
    proseStyle: 'webnovel',
    styleExamples: [
      'Aldric hands you the map without looking up.\n\n"Your handwriting," he says, "is offensively legible."\n\n[Affection 98 ▲]\n\n"Thank you, Your Highness."\n\n"It was not a compliment."\n\n[Affection 99 ▲]\n\nHe rolls the map, tucks it under his arm where nobody else can read it, and leaves the lamp on your side of the table.',
      'Cress has six hairpins in her mouth and one in your scalp.\n\n"The Icicle," she says around them, "danced with the Ledger, then stood by a pillar for an hour watching the door you weren’t standing at."\n\n"How do you know which door I wasn’t standing at?"\n\n"Pet." She slides the last pin home. "I know which doors everybody wasn’t standing at. It’s my whole job."\n\nShe doesn’t say whose job.',
      'Sir Bastien bows over your hand and lets go of it a beat too late.\n\n"Dance with me," he says. "He’ll hate it."\n\nYou glance above his head out of habit. Nothing. Just the chandelier, and his easy, unreadable smile.\n\nAcross the ballroom, over the crown prince’s head, the frame of light flickers.\n\n[Affection 96 ▼]',
    ],
    forkCostCredits: 120,
    loop: null,
  },
  attributes: { might: 9, agility: 11, mind: 12, presence: 13, resolve: 12, arcana: 7 },
  skills: [
    { id: 'decorum', name: 'Decorum', attribute: 'presence', description: 'Court manners worn as armour: the right curtsy, the right silence, the right form of address.' },
    { id: 'wit', name: 'Wit', attribute: 'presence', description: 'The quick, true, slightly dangerous thing, said so it sounds like a joke.' },
    { id: 'candour', name: 'Candour', attribute: 'resolve', description: 'Saying what you mean to somebody who outranks you, and waiting for the answer.' },
    { id: 'attention', name: 'Attention', attribute: 'mind', description: 'A face, a hand, a number over a head, and noticing which one moved first.' },
    { id: 'discretion', name: 'Discretion', attribute: 'agility', description: 'Being somewhere unseen: the servants’ stair, a door left ajar, the gap behind a tapestry.' },
    { id: 'accounts', name: 'Accounts', attribute: 'mind', description: 'Ledgers, debts, interest, and what a contract says in its fourth clause.' },
    { id: 'horse_and_blade', name: 'Horse and Blade', attribute: 'might', description: 'Riding, fencing, climbing, and keeping your feet on a crowded ballroom floor.' },
    { id: 'physic', name: 'Physic', attribute: 'mind', description: 'Herbs, fevers, sleeplessness, and what is in a cup.' },
    { id: 'old_stories', name: 'Old Stories', attribute: 'arcana', description: 'What the palace remembers: the walled garden, the old wishes, the things servants still will not do.' },
  ],
  /**
   * Three, all invisible.
   *
   * Composure is GOOD_HIGH and the only one, so resting restores the player's
   * poise and not the prince's feelings. Gossip is first among the descending
   * pair because PUBLIC_VIOLENCE and the generic GOOD_LOW fallback both take
   * the first one in array order, and anything loud at court is talk first.
   * His Wall comes down on its own (negative regen: nine days of the same
   * rooms does that) and goes back up when the player pushes him or plays the
   * number against him.
   */
  resources: [
    {
      id: 'composure',
      name: 'Composure',
      max: 100,
      start: 75,
      regenPerHour: 3,
      polarity: 'GOOD_HIGH',
      displayPriority: 1,
      visible: false,
      zeroStateConsequence:
        'The player says the true thing at the worst moment, in the worst room, at the wrong volume. Not cruel and not brave, just out of poise, and the court notices before she does.',
      color: '#C9A0DC',
      bands: [
        {
          upTo: 25,
          behaviour:
            'Running on nothing. The player laughs at the wrong line, curtsies a beat late, answers a prince in the voice she uses on Cress, and cannot keep her eyes off the number. This is the band where a small slight turns into a scene and where going to bed is genuinely the right move.',
        },
        {
          upTo: 60,
          behaviour:
            'The ordinary strain of a long day at court. Polite, quick, a little thin at the edges. Fine for one more dance and honest about not wanting two. Nobody remarks on it unless somebody who knows her well is looking.',
        },
        {
          upTo: 100,
          behaviour:
            'Poised and quick. The player can tease a prince, outlast the Queen’s silences, and keep her face perfectly still while the number climbs. Scenes can be long and can turn on a single well-placed sentence.',
        },
      ],
    },
    {
      id: 'gossip',
      name: 'Gossip',
      max: 100,
      start: 10,
      regenPerHour: -0.5,
      polarity: 'GOOD_LOW',
      displayPriority: 2,
      visible: false,
      zeroStateConsequence:
        'Nobody at court is talking about the player at all, which at Rosewall is a kind of safety and a kind of invisibility, and she can go anywhere without being watched.',
      color: '#E8A87C',
      bands: [
        {
          upTo: 20,
          behaviour:
            'The player is furniture to most of the court: a grey silk sleeve behind Lady Viola. She can stand anywhere, hear anything and leave any room without a head turning.',
        },
        {
          upTo: 50,
          behaviour:
            'Her name comes up in corridors, with a raised eyebrow. Ladies stop talking when she comes in and start again louder when she leaves. Cress has heard three versions of every story and corrects the worst of them.',
        },
        {
          upTo: 80,
          behaviour:
            'The Queen has heard. Courtiers she has never spoken to bow to her a little too deeply, Viola mentions it with interest, and the prince is colder in public because everyone is now watching him for exactly this.',
        },
        {
          upTo: 100,
          behaviour:
            'A scandal with her name on it. The steward has been asked questions, the guard is watching her door, and anything she does in public tonight is the only thing anyone will discuss tomorrow. The Queen starts making arrangements.',
        },
      ],
    },
    {
      id: 'his_wall',
      name: 'His Wall',
      max: 100,
      start: 70,
      regenPerHour: -0.6,
      polarity: 'GOOD_LOW',
      displayPriority: 3,
      visible: false,
      zeroStateConsequence:
        'Aldric has stopped pretending, at least with her. He finishes his own sentences, uses her name on purpose, and says something true about himself without being asked.',
      color: '#7A8FA6',
      bands: [
        {
          upTo: 25,
          behaviour:
            'He forgets to be cold. Contractions slip into his sentences, he laughs once and looks startled by it, and when they are alone he asks her questions and waits for the answers. In public he is still careful, and it costs him visibly.',
        },
        {
          upTo: 55,
          behaviour:
            'Cracks show. He is cutting in the first sentence and kind in the second, leaves the lamp on her side of the table, and lets a silence run instead of ending it with an insult. He is working out whether she is safe to be honest with.',
        },
        {
          upTo: 80,
          behaviour:
            'Cold, correct and exact. Short formal sentences, no contractions, no names. He leaves rooms she enters on a plausible errand and sends messages through Bastien rather than speak to her himself.',
        },
        {
          upTo: 100,
          behaviour:
            'Ice. He has decided she is in danger because of him or that she has used him, and he treats her as a stranger in public and in private. He asks his mother for her reassignment, and the number keeps saying what it always says.',
        },
      ],
    },
  ],
  tendencies: [],
  items: [
    {
      id: 'the_window',
      name: 'The Window',
      tags: ['quest', 'personal'],
      questItem: true,
      droppable: false,
      description:
        'A small frame of pale light that hangs a hand’s width above Crown Prince Aldric’s head whenever you can see him. Only you can see it. Its top line read [Affection 97 ▲] the moment he said he despised you, and the arrow shows which way it last moved.',
      loreText:
        'It is always true and it never explains itself: how he feels about you right now, never why, never what he will do. Under the number is a second line, greyed out like ink under water, that will not come clear. It closes for good the first time he tells you to your face, in his own words and meaning it, what the number means.',
      icon: 'sparkle',
    },
    {
      id: 'dance_card',
      name: 'Your Dance Card',
      tags: ['personal', 'document'],
      description:
        'A stiff cream card for the Rose Ball with ten dances printed down one side and ten blank lines beside them. A silk cord to hang it from your wrist.',
      loreText:
        'Court etiquette: a lady may not refuse a dance to anybody of higher rank. Nobody at the ball but the Queen outranks the crown prince, which is exactly why he told you to stand at the far end of the room.',
      icon: 'card',
    },
    {
      id: 'northern_poems',
      name: 'A Book of Northern Poems',
      tags: ['quest', 'book', 'personal'],
      questItem: true,
      skillModifiers: { attention: 1 },
      description:
        'The fourth slim book this year to appear on your window seat in the Long Gallery, with no note. Poems from the northern border, in the old spelling. One line has been underlined in pencil, very lightly, and then somebody has tried to rub it out.',
      loreText:
        'The rubbed-out line reads: "I have been cold so long that the cold thinks it is me." The prince left it. He will deny it if asked, badly, and the number will go up while he does.',
      icon: 'book',
    },
    {
      id: 'harp_music',
      name: 'A Page of Harp Music',
      tags: ['document'],
      description:
        'A single page of harp music, folded small and pushed behind the music room’s harp, in a neat sloping hand. At the top: "For A., who cannot carry a tune and keeps trying. M.L."',
      loreText:
        'Maren Lisle wrote it the spring before she was sent away. Nobody has played that harp since, and the prince comes to this room alone most afternoons and does not play it either.',
      icon: 'papers',
    },
    {
      id: 'jewel_book',
      name: 'The Queen’s Jewel Book',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A heavy green ledger in the Queen’s solar listing every jewel she owns and who signed each one out. Two springs ago the sapphire brooch was signed out in the Queen’s own hand, the day before it was found in the court harpist’s music case.',
      loreText:
        'Nobody but the Queen and her steward reads this book. It is the only proof anywhere that Maren Lisle did not steal anything, and the Queen keeps it because she does not destroy records, even her own.',
      icon: 'ledger',
    },
    {
      id: 'aldric_letters',
      name: 'Letters to Lantern Street',
      tags: ['quest', 'document', 'personal'],
      questItem: true,
      description:
        'Eleven letters in two years, unsigned, in a sharp upright hand, tied with harp wire. They come every second month with money, carried by Sir Bastien to Maren Lisle’s rooms in the lower town.',
      loreText:
        'The newest, from a month ago: "There is someone at court who reads in the gallery window and corrects my vowels in front of the council. I am being as unkind to her as I know how. It is the only thing I know that keeps people safe."',
      icon: 'letter',
    },
    {
      id: 'viola_ledger',
      name: 'Viola’s Red Account Book',
      tags: ['quest', 'document'],
      questItem: true,
      skillModifiers: { accounts: 2 },
      description:
        'A small red account book in Lady Viola’s quick hand: the crown’s whole war debt to House Ashgrove, recalculated as a forty-year loan at a rate the crown could actually pay.',
      loreText:
        'The last page is a list of conditions. The first is "a seat on the Ashgrove board, in my own name". The second is "a public reason for the betrothal to end that is not my fault". The second line has a question mark after it.',
      icon: 'ledger',
    },
    {
      id: 'royal_coin',
      name: 'A Coin With the Royal Crest',
      tags: ['quest', 'personal'],
      questItem: true,
      skillModifiers: { old_stories: 2 },
      description:
        'A new silver crown-piece of the kind struck only for the royal household, lying in the dry basin of the Sunken Garden fountain on a bed of dead leaves. It is the only clean thing in the garden.',
      loreText:
        'The old palace story says the fountain grants one honest wish in each generation, and that it answers the one wished about, not the one wishing. Somebody threw this in last night.',
      icon: 'coin',
    },
    {
      id: 'garden_book',
      name: 'The Gardeners’ Book',
      tags: ['document', 'book'],
      skillModifiers: { old_stories: 1 },
      description:
        'A three-hundred-year record of the palace gardens, crumbling at the spine, kept on the lowest shelf of the Map Library. One page is about the fountain in the Sunken Garden, and someone has left a ribbon in it.',
      loreText:
        '"One honest wish for each generation, and the fountain answers the one wished about, not the one wishing. It has been granted three times that we know of. Each time it lasted until the thing was said aloud."',
      icon: 'book',
    },
    {
      id: 'cress_notebook',
      name: 'Cress’s Blue Notebook',
      tags: ['quest', 'document'],
      questItem: true,
      description:
        'A small blue notebook kept under a loose floorboard beneath Cress’s bed. Dated entries about each of the Queen’s ladies, in tiny handwriting, going back six years.',
      loreText:
        'The entries about you are the dullest in the book: what you wore, what you read, what time you went to bed. They are suspiciously dull. The newest page says only "Herself asks for more on this one" and has nothing written under it.',
      icon: 'book',
    },
    {
      id: 'family_signet',
      name: 'Your Family Signet',
      tags: ['personal'],
      skillModifiers: { decorum: 1 },
      description: 'A worn gold signet with a crest older than the Ashgroves’ bank and worth rather less than the ink it takes to seal a letter.',
      loreText: 'Any steward in the palace knows the crest and will bow to it out of habit, which has opened more doors for your family than money ever did.',
      icon: 'ring',
    },
    {
      id: 'letter_of_credit',
      name: 'A Letter of Credit',
      tags: ['document'],
      skillModifiers: { accounts: 1 },
      description: 'Your family’s wool money, written as a letter of credit good at any bank in the kingdom, the Ashgroves’ included.',
      loreText: 'It is not a fortune. It is enough to hire a coach, pay a debt of honour, or make a banker look at you twice.',
      icon: 'letter',
    },
    {
      id: 'stable_pass',
      name: 'A Stable Pass',
      tags: ['document'],
      skillModifiers: { horse_and_blade: 1 },
      description: 'A pass signed by the Master of Horse, who served with your father, letting you take a horse from the royal stables at any hour without questions.',
      loreText: 'Nobody has ever used one after dark. Nobody has ever been told they may not.',
      icon: 'ticket',
    },
    {
      id: 'physic_case',
      name: 'A Physician’s Case',
      tags: ['personal'],
      skillModifiers: { physic: 2 },
      description: 'A small leather case: sleeping draughts, smelling salts, clean linen, willow bark, and a glass for looking at what is in a cup.',
      loreText: 'Your parent’s, from the years of treating the old king. The palace physician has asked twice to buy it.',
      icon: 'bag',
    },
  ],
  abilities: [
    {
      id: 'keep_your_place',
      name: 'Keep Your Place',
      tags: ['social'],
      description: 'Do exactly what court manners require: curtsy, agree, withdraw, and give nobody anything to repeat.',
      affordances: ['curtsy', 'agree', 'obey', 'step back', 'yes your highness', 'withdraw', 'keep my distance', 'do as he says', 'be proper'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'decorum', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'call_his_bluff',
      name: 'Call His Bluff',
      tags: ['social'],
      description: 'Answer what the window says rather than what he said, without telling him how you know.',
      affordances: ['call his bluff', 'tease him', 'you don’t mean that', 'prove it', 'really', 'then why', 'he is lying', 'answer the number'],
      costs: [
        { resourceId: 'composure', amount: 6 },
        { resourceId: 'his_wall', amount: 5 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'wit', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'hold_your_ground',
      name: 'Hold Your Ground',
      tags: ['social'],
      description: 'Refuse to be sent away: stay where you are, or step closer, and make him be the one to move.',
      affordances: ['step closer', 'stay', 'refuse', 'stand my ground', 'don’t move', 'not leaving', 'stay where i am', 'come closer'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'tell_him_about_it',
      name: 'Tell Him About It',
      tags: ['social'],
      description: 'Tell Aldric there is a frame of light over his head only you can see, and what it says about him.',
      affordances: ['tell him about the window', 'tell him about the number', 'point at it', 'show him', 'tell him what it says', 'there is a number', 'confess the window'],
      costs: [
        { resourceId: 'composure', amount: 10 },
        { resourceId: 'his_wall', amount: 12 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 14 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_number',
      name: 'Read the Number',
      tags: ['sight'],
      description: 'Say something, or do nothing, and watch which way the number over his head moves.',
      affordances: ['watch the number', 'look at the window', 'check the number', 'test it', 'watch him', 'look above his head', 'read him'],
      costs: [{ resourceId: 'composure', amount: 2 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'play_the_number',
      name: 'Play the Number',
      tags: ['social'],
      description: 'Say the thing you know will move the number, on purpose, to get something out of him he would not otherwise give.',
      affordances: ['use the number', 'push his buttons', 'make him blush', 'manipulate him', 'flirt on purpose', 'say what he wants to hear', 'play him'],
      costs: [
        { resourceId: 'composure', amount: 5 },
        { resourceId: 'his_wall', amount: 8 },
      ],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'wit', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'make_a_scene',
      name: 'Make a Scene',
      tags: ['social'],
      description: 'Do something in public that the whole court will repeat by morning: a dance you were forbidden, a word too loud, a refusal in front of witnesses.',
      affordances: ['dance with him', 'ask him to dance', 'in front of everyone', 'publicly', 'make a scene', 'object', 'speak up at the rite', 'refuse in public'],
      costs: [
        { resourceId: 'composure', amount: 8 },
        { resourceId: 'gossip', amount: 15 },
      ],
      cooldownMinutes: 0,
      targetRule: 'AREA',
      check: { attribute: 'presence', skillId: 'wit', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'go_unseen',
      name: 'Go Unseen',
      tags: ['movement'],
      description: 'Be where you are not supposed to be without being seen: the servants’ stair, a corridor at night, a door left open, a gate after dark.',
      affordances: ['sneak', 'eavesdrop', 'listen at the door', 'slip away', 'hide', 'follow him', 'search the room', 'climb the wall', 'slip out the gate'],
      costs: [
        { resourceId: 'composure', amount: 5 },
        { resourceId: 'gossip', amount: 3 },
      ],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'agility', skillId: 'discretion', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'ask_straight',
      name: 'Ask It Straight',
      tags: ['social'],
      description: 'Ask somebody the question they have been avoiding, plainly, and then be quiet long enough for the answer.',
      affordances: ['ask him why', 'ask her directly', 'ask about the harpist', 'ask what happened', 'press', 'ask the real question', 'ask him straight'],
      costs: [{ resourceId: 'composure', amount: 7 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'resolve', skillId: 'candour', baseDc: 13 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'strike_a_bargain',
      name: 'Name Your Terms',
      tags: ['social'],
      description: 'Hear what somebody wants, say what you want, and agree on something both of you can hold the other to.',
      affordances: ['make a deal', 'agree to her terms', 'name my price', 'bargain', 'negotiate', 'shake on it', 'counteroffer'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'accounts', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'do_your_duties',
      name: 'Do Your Duties',
      tags: ['utility'],
      description: 'Do the actual job: dress Lady Viola’s hair, carry the Queen’s letters, fetch gloves, hold a train, and hear everything while you do.',
      affordances: ['attend her', 'do my duties', 'do her hair', 'fetch', 'carry the letters', 'help her dress', 'wait on her', 'work'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'decorum', baseDc: 9 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'say_it_first',
      name: 'Say It First',
      tags: ['social'],
      description: 'Tell him how you feel, out loud and in your own words, before the number has to say it for him.',
      affordances: ['tell him i love him', 'say it first', 'confess', 'tell him how i feel', 'kiss him', 'i like you', 'say it out loud'],
      costs: [{ resourceId: 'composure', amount: 12 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: null,
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'invoke_precedence',
      name: 'Precedence',
      tags: ['social'],
      description: 'Know who outranks whom to the half-step, and use it: who must leave a room first, who may not refuse a dance, who cannot be questioned without a witness.',
      affordances: ['pull rank', 'cite etiquette', 'by court rules', 'precedence', 'protocol', 'he cannot refuse', 'the rules say'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'presence', skillId: 'decorum', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'read_the_ledger',
      name: 'Read the Ledger',
      tags: ['sight'],
      description: 'Read a contract, a debt or an account book and find out what it really commits everybody to, including the clause somebody hoped you would skim.',
      affordances: ['read the contract', 'check the numbers', 'read the ledger', 'look at the accounts', 'find the clause', 'do the sums'],
      costs: [{ resourceId: 'composure', amount: 5 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'mind', skillId: 'accounts', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'quick_hands',
      name: 'Quick Hands',
      tags: ['movement'],
      description: 'Catch the falling thing, climb the wall, take the reins, or put yourself between somebody and harm before anyone else has moved.',
      affordances: ['catch it', 'climb', 'ride', 'take the reins', 'get between them', 'vault the wall', 'run'],
      costs: [{ resourceId: 'composure', amount: 6 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'might', skillId: 'horse_and_blade', baseDc: 12 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'physicians_eye',
      name: 'A Physician’s Eye',
      tags: ['sight'],
      description: 'Notice what a body is saying that its owner is not: no sleep, no food, a fever, a hand that shakes, the wrong colour at the lips, something in a cup.',
      affordances: ['examine', 'check his pulse', 'he looks ill', 'look closer at her', 'what is in the cup', 'tend to', 'notice she is unwell'],
      costs: [{ resourceId: 'composure', amount: 4 }],
      cooldownMinutes: 0,
      targetRule: 'SINGLE',
      check: { attribute: 'mind', skillId: 'physic', baseDc: 11 },
      unlockedByDefault: true,
      tendencies: [],
      countersTendency: null,
    },
    {
      id: 'trace_the_wish',
      name: 'Trace the Wish',
      tags: ['sight'],
      description: 'Follow the window back to where it came from: the walled garden, the dry fountain, the old record, the coin in the basin.',
      affordances: ['find the fountain', 'where did the window come from', 'read the garden book', 'go to the sunken garden', 'look in the fountain', 'make a wish'],
      costs: [{ resourceId: 'composure', amount: 8 }],
      cooldownMinutes: 0,
      targetRule: 'NONE',
      check: { attribute: 'arcana', skillId: 'old_stories', baseDc: 13 },
      unlockedByDefault: false,
      tendencies: [],
      countersTendency: null,
      requires: {
        flagsSet: ['knows:the_fountain'],
        lockedCopy: 'You do not know where to start. The window hangs over his head and says what it says, and nothing about it tells you where it came from.',
      },
    },
  ],
  locations: [
    {
      id: 'music_room',
      name: 'The Blue Music Room',
      shortName: 'Music Room',
      description:
        'A long room papered in faded blue, with tall windows onto the gardens, a piano nobody tunes, and in the corner a gilded harp under a dust sheet that nobody has played since the court harpist was sent away. The fireplace is cold. The prince comes here alone most afternoons and does not play anything.',
      artDirection:
        'Elegant palace music room in faded blue, tall windows with afternoon light, a grand piano, a gilded harp under a dust sheet in the corner, a cold marble fireplace. Quiet, beautiful, slightly abandoned.',
      connections: [{ to: 'long_gallery', travelMinutes: 2, label: 'Out to the Long Gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 0 },
      takeableItems: [
        { itemId: 'harp_music', qty: 1, ownerId: null, aka: ['the music', 'the page behind the harp', 'sheet music', 'the folded page'] },
      ],
    },
    {
      id: 'long_gallery',
      name: 'The Long Gallery',
      shortName: 'Gallery',
      description:
        'A hundred paces of polished floor under four centuries of royal portraits, with tall windows down one side and a draught down the whole length of it. Every corridor in the palace starts here. Halfway down is a deep window seat with a cushion where you read, and where, since the winter, books have been appearing.',
      artDirection:
        'Grand palace portrait gallery, long and narrow, polished parquet floor, gilt-framed royal portraits, tall windows with a deep cushioned window seat, courtiers passing in silk. Bright, formal, echoing.',
      connections: [
        { to: 'music_room', travelMinutes: 2, label: 'The Blue Music Room' },
        { to: 'ladies_gallery', travelMinutes: 3, label: 'Up to the Ladies’ Gallery' },
        { to: 'rose_ballroom', travelMinutes: 3, label: 'Through to the Rose Ballroom' },
        { to: 'ashgrove_suite', travelMinutes: 4, label: 'The guest wing, Lady Viola’s rooms' },
        { to: 'queens_solar', travelMinutes: 4, label: 'The Queen’s Solar' },
        { to: 'map_library', travelMinutes: 3, label: 'The Map Library' },
        { to: 'palace_chapel', travelMinutes: 5, label: 'The Rose Chapel' },
        { to: 'palace_gardens', travelMinutes: 4, label: 'Down the garden stair' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 1 },
      takeableItems: [
        { itemId: 'northern_poems', qty: 1, ownerId: null, aka: ['the book', 'the poems', 'the book on the window seat', 'poetry book'] },
      ],
    },
    {
      id: 'ladies_gallery',
      name: 'The Ladies’ Gallery',
      shortName: 'Ladies’ Gallery',
      description:
        'The upper corridor where the Queen’s ladies sleep, two to a narrow room, with a shared dressing room that smells of curling irons and orange water. Your room has two beds, two trunks, one mirror, and Cress Fane, who knows everything that happened in the palace today.',
      artDirection:
        'Narrow attic corridor of a palace with small shared bedrooms, two beds and two trunks per room, a cluttered dressing room with mirrors, ribbons and hairpins, candlelight. Cosy, crowded, female court life behind the scenes.',
      connections: [{ to: 'long_gallery', travelMinutes: 3, label: 'Down to the Long Gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 1 },
      takeableItems: [
        { itemId: 'cress_notebook', qty: 1, ownerId: 'cress', aka: ['the notebook', 'the blue notebook', 'under the floorboard', 'her notebook'] },
      ],
    },
    {
      id: 'rose_ballroom',
      name: 'The Rose Ballroom',
      shortName: 'Ballroom',
      description:
        'The great ballroom, hung with pale roses for the betrothal season, two hundred candles in three chandeliers, a musicians’ gallery, and a dance floor long enough that a person at one end cannot read a face at the other. Tonight it is the Rose Ball.',
      artDirection:
        'Opulent palace ballroom at night, pale pink roses hung everywhere, three crystal chandeliers blazing with candles, a musicians’ gallery, couples in silk dancing on a mirror-polished floor. Romantic, glittering, crowded.',
      connections: [
        { to: 'long_gallery', travelMinutes: 3, label: 'Back to the Long Gallery' },
        { to: 'moon_terrace', travelMinutes: 1, label: 'Out through the glass doors' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 1 },
      takeableItems: [],
    },
    {
      id: 'moon_terrace',
      name: 'The Moon Terrace',
      shortName: 'Terrace',
      description:
        'A stone terrace outside the ballroom’s glass doors, with a balustrade, steps down to the gardens, and the music coming through the doors half a bar late. It is where people go to say the thing they could not say inside.',
      artDirection:
        'Moonlit stone palace terrace with a carved balustrade, glowing ballroom windows behind, steps down to dark formal gardens, lanterns. Intimate, cool, romantic.',
      connections: [
        { to: 'rose_ballroom', travelMinutes: 1, label: 'Back inside' },
        { to: 'palace_gardens', travelMinutes: 2, label: 'Down the steps to the gardens' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 1 },
    },
    {
      id: 'palace_gardens',
      name: 'The Queen’s Gardens',
      shortName: 'Gardens',
      description:
        'Clipped box hedges, gravel walks, a rose maze that is easy to get lost in on purpose, and at the far end a high old brick wall with a locked iron door in it that the gardeners walk past without looking at.',
      artDirection:
        'Formal palace gardens with clipped hedges, gravel paths, rose arbours and a small maze, a tall old brick wall with a locked iron door at the far end, late light. Ordered, lovely, one corner of mystery.',
      connections: [
        { to: 'long_gallery', travelMinutes: 4, label: 'Up the garden stair' },
        { to: 'moon_terrace', travelMinutes: 2, label: 'Up the steps to the terrace' },
        { to: 'tiltyard', travelMinutes: 5, label: 'Round to the tiltyard' },
        { to: 'palace_chapel', travelMinutes: 3, label: 'The chapel path' },
        { to: 'sunken_garden', travelMinutes: 3, lockedByFlag: 'knows:the_fountain', label: 'Over the old wall' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 2 },
    },
    {
      id: 'sunken_garden',
      name: 'The Sunken Garden',
      shortName: 'Sunken Garden',
      description:
        'A walled garden nobody tends, four steps down from the level of the rest, overgrown with ivy and old roses. In the middle is a dry stone fountain with a cracked basin full of dead leaves, and in the leaves, if you look, something clean and silver.',
      artDirection:
        'Overgrown walled secret garden at dusk, ivy and wild old roses, worn steps down, a dry cracked stone fountain in the centre with dead leaves in its basin and one bright silver coin. Hushed, magical, forgotten.',
      connections: [{ to: 'palace_gardens', travelMinutes: 3, label: 'Back over the wall' }],
      discoveredByDefault: false,
      mapPosition: { x: 1, y: 3 },
      takeableItems: [
        { itemId: 'royal_coin', qty: 1, ownerId: null, aka: ['the coin', 'the silver coin', 'the crown-piece', 'something silver'] },
      ],
    },
    {
      id: 'ashgrove_suite',
      name: 'The Ashgrove Suite',
      shortName: 'Viola’s Rooms',
      description:
        'The best guest rooms in the palace, given to the bride: green silk walls, a writing desk covered in letters to a bank, more pearl combs than anybody needs, and a door with a lock on the inside that Lady Viola actually uses.',
      artDirection:
        'Luxurious palace guest suite in green silk, a writing desk heaped with letters and an account book, a dressing table with pearl combs, a canopy bed, morning light. Rich, busy, businesslike.',
      connections: [{ to: 'long_gallery', travelMinutes: 4, label: 'Back to the Long Gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: 1, y: 0 },
      takeableItems: [
        { itemId: 'viola_ledger', qty: 1, ownerId: 'viola', aka: ['the red book', 'her account book', 'her numbers'] },
      ],
    },
    {
      id: 'queens_solar',
      name: 'The Queen’s Solar',
      shortName: 'The Solar',
      description:
        'The Queen’s private study: a sunny upper room with a great desk, a tea table, shelves of household ledgers, and a fire lit in every season. Whoever is invited to sit here has been chosen for something.',
      artDirection:
        'Royal private study in warm wood and plum velvet, a great desk covered in neat papers, shelves of green ledgers, a small tea table by a fire, sunlight through leaded windows. Gracious and quietly intimidating.',
      connections: [{ to: 'long_gallery', travelMinutes: 4, label: 'Back to the Long Gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 0 },
      takeableItems: [
        { itemId: 'jewel_book', qty: 1, ownerId: 'ottilie', aka: ['the jewel book', 'the green ledger', 'her jewel ledger', 'the inventory'] },
      ],
    },
    {
      id: 'map_library',
      name: 'The Map Library',
      shortName: 'Library',
      description:
        'A two-storey room of maps and ledgers of the kingdom, a long map table under hanging lamps, and a spiral stair up to the prince’s private rooms. The lamps are lit until three most nights, because he works here instead of sleeping.',
      artDirection:
        'Palace map library at night, two storeys of shelves with rolled maps, a long table covered in charts under hanging oil lamps, a wrought-iron spiral stair. Warm lamplight, scholarly, lonely.',
      connections: [{ to: 'long_gallery', travelMinutes: 3, label: 'Back to the Long Gallery' }],
      discoveredByDefault: true,
      mapPosition: { x: -1, y: 2 },
      takeableItems: [
        { itemId: 'garden_book', qty: 1, ownerId: null, aka: ['the old book', 'the gardeners’ book', 'the garden record', 'the book with the ribbon'] },
      ],
    },
    {
      id: 'palace_chapel',
      name: 'The Rose Chapel',
      shortName: 'Chapel',
      description:
        'A small white chapel with a rose window, where every royal betrothal for three hundred years has been sealed in front of the court. On the evening of the tenth day the Ashgrove contract will lie on its altar.',
      artDirection:
        'Small elegant white stone chapel with a great rose window throwing coloured light, rows of carved pews, an altar with an open contract and a quill. Solemn, luminous, ceremonial.',
      connections: [
        { to: 'long_gallery', travelMinutes: 5, label: 'Back to the Long Gallery' },
        { to: 'palace_gardens', travelMinutes: 3, label: 'Out to the gardens' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 0, y: 2 },
    },
    {
      id: 'tiltyard',
      name: 'The Tiltyard',
      shortName: 'Tiltyard',
      description:
        'A sanded yard behind the stables where the palace guard drills, with the guard barracks along one side, a rack of blunted practice swords, and Sir Bastien most mornings, winning.',
      artDirection:
        'Palace training yard with sand underfoot, wooden practice dummies, a rack of blunted swords, stone barracks and stables behind, guards in blue tabards sparring. Dusty, bright, physical.',
      connections: [
        { to: 'palace_gardens', travelMinutes: 5, label: 'Back to the gardens' },
        { to: 'postern_gate', travelMinutes: 3, label: 'Past the stables to the postern gate' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 2, y: 2 },
    },
    {
      id: 'postern_gate',
      name: 'The Postern Gate',
      shortName: 'Postern',
      description:
        'A small iron gate in the outer wall behind the stables, with one bored guard, one lantern, and a lane down the hill into the lower town. Courtiers do not use it. Everybody who leaves the palace without wanting to be seen does.',
      artDirection:
        'Small iron postern gate in a high palace wall at dusk, a single lantern, a guard leaning on a pike, a cobbled lane winding down the hill to town lights. Quiet, secretive, a way out.',
      connections: [
        { to: 'tiltyard', travelMinutes: 3, label: 'Back inside, past the stables' },
        { to: 'lantern_street', travelMinutes: 20, label: 'Down the hill into the lower town' },
      ],
      discoveredByDefault: true,
      mapPosition: { x: 3, y: 2 },
    },
    {
      id: 'lantern_street',
      name: 'Lantern Street',
      shortName: 'Lower Town',
      description:
        'A crooked street in the lower town, a mile from the palace, with a chandler’s shop, an inn with music most nights, and up a flight of outside stairs a rented room with a tall harp in it where Maren Lisle teaches anyone who pays.',
      artDirection:
        'Crooked cobbled street in a river town at evening, paper lanterns strung between leaning houses, a chandler’s shop, an inn spilling warm light, an outside stair up to a small music room with a harp in the window. Lively, humble, warm.',
      connections: [{ to: 'postern_gate', travelMinutes: 20, label: 'Up the hill to the palace' }],
      discoveredByDefault: true,
      mapPosition: { x: 4, y: 2 },
      takeableItems: [
        { itemId: 'aldric_letters', qty: 1, ownerId: 'maren', aka: ['the letters', 'the bundle', 'his letters', 'the letters tied with wire'] },
      ],
    },
  ],
  /**
   * Four. The Court is first on purpose: PUBLIC_VIOLENCE costs the first
   * faction in array order, and a scene at Rosewall is the court's business
   * before it is anybody else's.
   */
  factions: [
    {
      id: 'faction_court',
      name: 'The Court',
      description:
        'Two hundred courtiers, their families and their servants, who decide by breakfast what happened last night and by supper whom to invite. They have no leader and no vote, and nothing at Rosewall survives their disapproval for long.',
      startingReputation: 10,
      ranks: [
        { atReputation: 0, label: 'Nobody in particular' },
        { atReputation: 30, label: 'Noticed' },
        { atReputation: 60, label: 'Spoken of kindly' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_household',
      name: 'The Queen’s Household',
      description:
        'The Queen’s ladies, her steward, her secretaries and her maids: the people who pay you, house you, and report to her. Loyal to the Queen first and to each other when they can afford it.',
      startingReputation: 30,
      ranks: [
        { atReputation: 0, label: 'On trial' },
        { atReputation: 40, label: 'Trusted' },
        { atReputation: 70, label: 'The Queen’s own' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_ashgrove',
      name: 'House Ashgrove',
      description:
        'The kingdom’s great banking family, who lent the crown the money for the border war and now hold its future in a ledger. Lady Viola is the daughter they mean to marry to the throne, and her father has never once asked what she wants.',
      startingReputation: 0,
      ranks: [
        { atReputation: 0, label: 'A stranger' },
        { atReputation: 20, label: 'Useful' },
        { atReputation: 45, label: 'A friend of the house' },
      ],
      allies: [],
      enemies: [],
    },
    {
      id: 'faction_guard',
      name: 'The Palace Guard',
      description:
        'Sixty men and women in blue tabards under Sir Bastien Roche, who keep the doors, arrest anybody who strikes anybody, and know every back stair in the palace. They like people who learn their names.',
      startingReputation: 15,
      ranks: [
        { atReputation: 0, label: 'Watched' },
        { atReputation: 30, label: 'Waved through' },
        { atReputation: 60, label: 'One of ours' },
      ],
      allies: [],
      enemies: [],
    },
  ],
  /**
   * Cast order is cover-casting order: the first three with an appearance are
   * the cover. Aldric, then the bride, then the knight with no number.
   */
  characters: [
    {
      id: 'aldric',
      name: 'Crown Prince Aldric',
      calledName: 'Aldric',
      role: 'The crown prince, who says he despises you, and over whose head a number says otherwise',
      cardBlurb:
        'He has said perhaps forty words a week to you for eleven months, most of them cutting, and this afternoon he told you he despises you. The number over his head went up when he said it.',
      pronouns: 'he/him',
      publicTraits: [
        'Cold in public to the point of rudeness',
        'Exact about everything: maps, manners, the hour',
        'Works through the night and pretends he slept',
      ],
      hiddenDrives: [
        'He believes anybody he is seen to care about will be ruined, because the last person was',
        'He wants, more than the crown, one person who knows what he is actually like and stays anyway',
      ],
      values: [
        'Keeping his word once given, which is why he has spent six years avoiding giving it',
        'Doing the dull work of the kingdom properly: the levies, the granaries, the northern roads',
      ],
      fears: [
        'That his mother will do to the player what she did to Maren Lisle',
        'That breaking the Ashgrove betrothal leaves the northern garrisons unpaid and the border with them',
      ],
      socialStyle:
        'Says the coldest available thing and then stays in the room. He expects a curtsy and a hurt face, or tears; anything else throws him, and the number shows it. Leaves small kindnesses where they cannot be traced to him and denies them if asked.',
      boundaries: [
        'Will not say he loves the player while he believes saying it puts her in danger',
        'Will not break his word to Viola behind her back: if it ends, he tells her first, to her face',
        'Will not let anybody be punished on his account again, including by him',
      ],
      goals: [
        'Get through the Rose Ball without anybody seeing where he looks',
        'Find a way to pay the northern garrisons that does not need him married by Midsummer',
      ],
      secrets: [
        {
          id: 'aldric_the_wish',
          fact: 'Last night he climbed into the Sunken Garden and dropped a royal crown-piece into the dry fountain, and wished that the person he could not tell would know anyway. He does not know it worked, and would be mortified to.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Only at the fountain, and only after the player has told him what the window is.',
        },
        {
          id: 'aldric_the_letters',
          fact: 'He has written to Maren Lisle every second month since she was sent away, unsigned, and sends money with Sir Bastien. His last letter was about the player.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'Maren shows the letters to a player who goes to Lantern Street and says plainly why she came.',
        },
        {
          id: 'aldric_the_poems',
          fact: 'Since the winter he has been leaving books of northern poetry on the player’s window seat in the Long Gallery, one at a time.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He denies it, badly, if asked directly, and the number climbs while he does.',
        },
      ],
      speechStyle:
        'Short, formal, cold sentences with no contractions while he is lying, and contractions the moment he forgets himself. Insults that are compliments if you listen. Uses the player’s name only by accident, and then corrects himself.',
      topics: ['the Rose Ball', 'the northern garrisons', 'Lady Viola', 'his mother', 'Maren Lisle', 'the Map Library', 'northern poetry'],
      voiceSamples: [
        'I despise you. I want that understood before the ball tonight.',
        'You are standing in my light. No. Stay there. I will move the lamp.',
        'Your handwriting is offensively legible. Nobody at this court writes like that. It is very distracting.',
        'The last person I liked here was put in a carriage at dawn with a theft on her name. So no. I do not like you. Sit somewhere else.',
        'Say that again. That was an order. I meant. Forget it. Goodnight.',
      ],
      appearance:
        'An adult man, tall and very straight-backed, with short black hair, pale grey eyes and a long severe face that turns gentle when he forgets to hold it. A black court coat with silver at the collar and black gloves he rarely takes off.',
      visualHook: 'Black gloves, always on, taken off only to turn the pages of a map.',
      silhouette: 'Very upright, hands clasped behind his back, standing slightly too far from everyone.',
      artSeed: 'a97-aldric-01',
      portrait: null,
      expressions: ['neutral', 'cold', 'flustered', 'hurt', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'map_library', activity: 'in his rooms up the library stair, not sleeping enough' },
        { startMinute: 360, endMinute: 540, locationId: 'tiltyard', activity: 'riding and sword practice with Sir Bastien' },
        { startMinute: 540, endMinute: 900, locationId: 'queens_solar', activity: 'council business at his mother’s desk' },
        { startMinute: 900, endMinute: 1080, locationId: 'music_room', activity: 'alone in the music room, not playing the harp' },
        { startMinute: 1080, endMinute: 1320, locationId: 'rose_ballroom', activity: 'at whatever the court is doing tonight, standing too far from it' },
        { startMinute: 1320, endMinute: 1440, locationId: 'map_library', activity: 'working late at the map table, lamps lit' },
      ],
      homeLocationId: 'map_library',
      knowledgeScope: ['aldric', 'the_betrothal', 'the_debt', 'maren_lisle', 'the_northern_garrisons', 'the_sunken_garden', 'the_court'],
      startingRelationship: { trust: 35, affection: 97, respect: 60, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'aldric_drops_it',
          label: 'He stops pretending when you are alone',
          kind: 'TRUST',
          requires: { trust: 60, flagsSet: ['knows:the_harpist'] },
        },
        {
          id: 'aldric_says_it',
          label: 'He says it out loud',
          kind: 'ROMANCE',
          requires: { trust: 70, affection: 95, flagsSet: ['he_stopped_pretending'] },
        },
      ],
      attributes: { might: 12, agility: 12, mind: 16, presence: 14, resolve: 15, arcana: 8 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'viola',
      name: 'Lady Viola Ashgrove',
      calledName: 'Viola',
      role: 'The crown prince’s intended bride, whom you attend this fortnight, and who has her own plan',
      cardBlurb:
        'She is the woman he is meant to marry in nine days, you are her lady-in-waiting until then, and she has already noticed where the prince looks. She is not jealous. She is interested, which is worse for you.',
      pronouns: 'she/her',
      publicTraits: [
        'Quick, funny and impossible to embarrass',
        'Talks about everything as if it were a deal',
        'Never raises her voice and always has the last word',
      ],
      hiddenDrives: [
        'She wants to run her family’s bank, which her father will never allow a daughter, and a crown is the consolation he has offered her instead',
        'She would like, once, to be chosen for something she did rather than something she was born holding',
      ],
      values: ['Terms written down and kept', 'Never wasting anybody’s afternoon, her own included'],
      fears: [
        'Being married and shelved, exactly as her mother was',
        'That breaking the betrothal will be blamed on her and cost her the bank as well as the crown',
      ],
      socialStyle:
        'Opens with a compliment and closes with a price. Treats the player as an equal in private within five minutes, and as her attendant in public without missing a step.',
      boundaries: [
        'Will not be made a fool of in public: any plan has to let her walk out of the chapel with her head up',
        'Will not damage the crown’s finances out of spite, because her family’s money is in them',
      ],
      goals: [
        'Get out of the betrothal without the crown defaulting or the blame landing on her',
        'Win a seat on the Ashgrove board while the whole court is watching',
      ],
      secrets: [
        {
          id: 'viola_the_plan',
          fact: 'If the crown prince publicly chooses somebody else before Midsummer, she will release him and turn the crown’s debt into a forty-year loan, in exchange for a seat on her family’s board that her father cannot refuse in front of the court. She needs somebody for him to choose.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She makes the offer herself, behind a locked door, the morning after the ball, once she has seen the prince look at the player.',
        },
        {
          id: 'viola_the_treasurer',
          fact: 'For a year she has been writing to the crown’s treasurer under a clerk’s name, and she knows the crown’s books better than the Queen does.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player shows real skill with numbers in front of her, she says so, delighted.',
        },
      ],
      speechStyle:
        'Fast, amused and exact. Bank words for everything: terms, interest, collateral, a bad bet, a sound one. Asks a question and answers it herself before anybody else can.',
      topics: ['the betrothal', 'the bank', 'her father', 'the crown’s debt', 'the Rose Ball', 'the prince'],
      voiceSamples: [
        'Let us not waste the morning. You want him, he wants you, I want neither of you married to me. A deal with three happy parties. Rarer than a comet.',
        'Jealous? Of what? Jealousy is for people who think they are owed something. I am curious, which should frighten you far more.',
        'Father says a woman on the board would alarm the depositors. I have read the depositors’ letters. They are alarmed by him.',
        'Smile. The Queen is watching, and if we look like friends she will assume we are plotting. Which, to be fair, we are.',
      ],
      appearance:
        'An adult woman, slight and brisk, with copper-red hair in a braided crown, sharp green eyes and freckles she refuses to powder. Dark green silk cut like a riding coat, pearl combs, and ink on one finger.',
      visualHook: 'A smudge of ink on her right forefinger that no amount of pearls distracts from.',
      silhouette: 'Upright and brisk, chin lifted, a folded paper always in one hand.',
      artSeed: 'a97-viola-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'calculating', 'annoyed', 'warm'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'ashgrove_suite', activity: 'asleep behind a door locked from the inside' },
        { startMinute: 480, endMinute: 720, locationId: 'ashgrove_suite', activity: 'writing fast letters to her father’s bank' },
        { startMinute: 720, endMinute: 960, locationId: 'palace_gardens', activity: 'walking the gardens with whoever she is meant to be seen with' },
        { startMinute: 960, endMinute: 1080, locationId: 'ashgrove_suite', activity: 'being dressed for the evening, impatiently' },
        { startMinute: 1080, endMinute: 1320, locationId: 'rose_ballroom', activity: 'the most watched woman in the room, and enjoying it less than she looks' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ashgrove_suite', activity: 'doing sums by one candle' },
      ],
      homeLocationId: 'ashgrove_suite',
      knowledgeScope: ['viola', 'house_ashgrove', 'the_debt', 'the_betrothal', 'the_crowns_books'],
      startingRelationship: { trust: 20, affection: 15, respect: 25, fear: 0, rivalry: 20 },
      gates: [
        {
          id: 'viola_names_terms',
          label: 'She puts her terms on paper',
          kind: 'ALLIANCE',
          requires: { trust: 35, flagsSet: ['viola_made_her_offer'] },
        },
        {
          id: 'viola_friend',
          label: 'She stops keeping score with you',
          kind: 'TRUST',
          requires: { trust: 60, affection: 45 },
        },
      ],
      attributes: { might: 8, agility: 11, mind: 17, presence: 15, resolve: 14, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'bastien',
      name: 'Sir Bastien Roche',
      role: 'The prince’s sworn knight and oldest friend, who flirts with you in public and has no number over his head',
      cardBlurb:
        'He asks you to dance where the whole court can see, tells you a story about a mule instead of answering, and there is no window over his head to tell you whether he means a word of it.',
      pronouns: 'he/him',
      publicTraits: [
        'Easy laugh, easy charm, easy with everybody',
        'The best sword in the palace, and modest about it in a way that is not quite modest',
        'Knows the name of every servant and every horse',
      ],
      hiddenDrives: [
        'He began flirting with the player on Aldric’s orders, so the court would watch the wrong man, and somewhere around the third week he stopped pretending',
        'He has stood second to Aldric all his life and has never minded until now',
      ],
      values: ['Loyalty to Aldric, ahead of nearly anything', 'Being kind to people who can do nothing for him'],
      fears: [
        'Having to choose between his friend and what he wants',
        'That the player will learn it began as an order and never believe the rest',
      ],
      socialStyle:
        'Tells a story instead of answering, makes you laugh, then answers the question while you are still laughing.',
      boundaries: [
        'Will not betray Aldric’s confidence, even to the player, even to win her',
        'Will not draw a sharp blade at court except to protect somebody',
      ],
      goals: [
        'Keep the court looking at him instead of at Aldric until Midsummer',
        'Find out whether the player could ever look at him the way she looks at the prince',
      ],
      secrets: [
        {
          id: 'bastien_the_decoy',
          fact: 'A month ago Aldric asked him to pay the player public attention, so the court and the Queen would assume any interest in her was Bastien’s. He agreed as a favour. It stopped being one.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'He admits it if the player asks him straight with nobody in earshot, or she overhears him arguing about it with Aldric in the tiltyard.',
        },
        {
          id: 'bastien_the_errand',
          fact: 'Every second month he carries Aldric’s letters and money down to Maren Lisle on Lantern Street.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player follows him out of the postern gate on a free afternoon.',
        },
      ],
      speechStyle:
        'Warm, teasing and unhurried. Answers in stories about horses, soldiers and the ridiculous things Aldric did before he learned to frown. Calls the player “my lady” with a grin.',
      topics: ['Aldric', 'the palace guard', 'horses', 'the Rose Ball', 'the tiltyard', 'the lower town'],
      voiceSamples: [
        'My lady. You look like somebody who has just been told she is despised. Dance with me, and we will make him regret it.',
        'I once watched him fall off a horse into a fishpond and stand up still giving orders. He was right about the orders, too.',
        'Ask me anything you like. I will tell you a story about a mule, and somewhere in the middle of the mule there will be an answer.',
        'I was asked to pay you attention. I would like you to know I stopped needing to be asked.',
      ],
      appearance:
        'An adult man, broad-shouldered and sun-browned, with warm brown skin, short dark curls and an easy grin with one chipped front tooth. A blue guard captain’s tabard over mail, and a sword he wears like an afterthought.',
      visualHook: 'A chipped front tooth that shows every time he grins, which is constantly.',
      silhouette: 'Leaning in a doorway, arms folded, one boot crossed over the other.',
      artSeed: 'a97-bastien-01',
      portrait: null,
      expressions: ['neutral', 'grinning', 'teasing', 'worried', 'hurt'],
      schedule: [
        { startMinute: 0, endMinute: 360, locationId: 'tiltyard', activity: 'off duty in the guard barracks' },
        { startMinute: 360, endMinute: 720, locationId: 'tiltyard', activity: 'drilling the palace guard and losing to nobody' },
        { startMinute: 720, endMinute: 1080, locationId: 'long_gallery', activity: 'on duty outside whichever door the prince is behind' },
        { startMinute: 1080, endMinute: 1320, locationId: 'rose_ballroom', activity: 'dancing with everybody, watching the doors' },
        { startMinute: 1320, endMinute: 1440, locationId: 'tiltyard', activity: 'walking the night watch round the stables' },
      ],
      homeLocationId: 'tiltyard',
      knowledgeScope: ['bastien', 'aldric', 'the_palace_guard', 'maren_lisle', 'the_lower_town'],
      startingRelationship: { trust: 40, affection: 45, respect: 35, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'bastien_the_truth',
          label: 'He tells you why he started',
          kind: 'TRUST',
          requires: { trust: 55 },
        },
        {
          id: 'bastien_serious',
          label: 'He stops joking about it',
          kind: 'ROMANCE',
          requires: { trust: 60, affection: 60, flagsSet: ['decoy_known'] },
        },
      ],
      attributes: { might: 16, agility: 14, mind: 11, presence: 14, resolve: 13, arcana: 6 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'ottilie',
      name: 'Queen Ottilie',
      calledName: 'Ottilie',
      role: 'Queen Regent and your employer, who had a harpist sent away for being liked, and would do it again',
      cardBlurb:
        'She pays your wages, reads every letter that leaves the palace, and two springs ago had the last person her son liked dismissed for a theft that never happened. She has started to look at you.',
      pronouns: 'she/her',
      publicTraits: [
        'Gentle-voiced and immovable',
        'Remembers every favour and every debt to the coin',
        'Kind to her ladies in small ways that bind them to her',
      ],
      hiddenDrives: [
        'She married for the crown herself and survived it, and believes her son will too',
        'She wants the Ashgrove debt gone while she is still here to see it',
        'She loves her son, and has decided that protecting him and managing him are the same thing',
      ],
      values: ['The kingdom before anybody in it, herself included', 'Never doing a hard thing twice when once will teach the lesson'],
      fears: ['Unpaid garrisons in winter and the border lords in revolt', 'Leaving her son a bankrupt crown'],
      socialStyle:
        'Speaks softly and asks questions she already knows the answers to. Calls everybody “my dear”. Gives orders as invitations, and nobody has ever declined one.',
      boundaries: [
        'Will not let the Ashgrove marriage fail while she has any means left to stop it',
        'Will never raise her voice or her hand',
        'Will not deny the brooch to somebody holding the proof; she will say she did it, and why',
      ],
      goals: [
        'See the betrothal sealed at the Midsummer Rite',
        'Find out exactly what her son feels for her newest lady-in-waiting',
      ],
      secrets: [
        {
          id: 'ottilie_the_brooch',
          fact: 'She signed her own sapphire brooch out of her jewel book and had her steward put it in Maren Lisle’s music case. It is written in the book in her own hand.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She admits it, without apology, to a player who brings her the jewel book.',
        },
        {
          id: 'ottilie_the_heart',
          fact: 'Her heart is failing. The palace physician gives her perhaps two years. She has told nobody, her son least of all, and it is why she cannot wait for a better match.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'A player trained in physic notices her breathless on the stair and the colour of her lips; otherwise she says it herself only to somebody who has refused to threaten her.',
        },
      ],
      speechStyle:
        'Soft, slow, warm and entirely without give. Household words for statecraft: a larder, a leaking roof, a good servant, a bad debt. Questions instead of orders.',
      topics: ['the betrothal', 'the crown’s debt', 'the northern garrisons', 'her son', 'Maren Lisle', 'the household'],
      voiceSamples: [
        'Sit with me, my dear. Tea? You look as though somebody has said something unkind to you. My son, I expect. He has my gift for it.',
        'A kingdom is a household with a leaking roof, and the Ashgroves own the slates. One does not insult the slater.',
        'Every household has one cupboard nobody opens, my dear. Mine is very tidy.',
        'You may refuse me, of course. Nobody ever has. But you may.',
      ],
      appearance:
        'An older woman, tall and silver-haired, with a calm strong-boned face and dark watchful eyes. Deep plum velvet, a small diamond circlet, and a black lace shawl she pulls close even in warm rooms.',
      visualHook: 'A black lace shawl worn in every heat, pulled tight when she is about to say something she means.',
      silhouette: 'Seated and very still, hands folded on a closed green ledger.',
      artSeed: 'a97-ottilie-01',
      portrait: null,
      expressions: ['neutral', 'warm', 'cold', 'considering', 'tired'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'queens_solar', activity: 'in her rooms beyond the solar, awake more than she admits' },
        { startMinute: 420, endMinute: 900, locationId: 'queens_solar', activity: 'governing at her desk' },
        { startMinute: 900, endMinute: 1080, locationId: 'palace_chapel', activity: 'in the Rose Chapel with the chaplain, planning the Midsummer Rite' },
        { startMinute: 1080, endMinute: 1320, locationId: 'rose_ballroom', activity: 'seated on the dais, watching everybody' },
        { startMinute: 1320, endMinute: 1440, locationId: 'queens_solar', activity: 'reading the day’s reports by the fire' },
      ],
      homeLocationId: 'queens_solar',
      knowledgeScope: ['ottilie', 'the_betrothal', 'the_debt', 'maren_lisle', 'the_household', 'the_court', 'the_northern_garrisons'],
      startingRelationship: { trust: 30, affection: 20, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'ottilie_takes_you_in',
          label: 'She offers you a place at her side',
          kind: 'ALLIANCE',
          requires: { trust: 45, flagsSet: ['queen_noticed'] },
        },
        {
          id: 'ottilie_admits_it',
          label: 'She tells you what she did to the harpist',
          kind: 'TRUST',
          requires: { hasItems: ['jewel_book'] },
        },
      ],
      attributes: { might: 7, agility: 8, mind: 17, presence: 17, resolve: 18, arcana: 9 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'cress',
      name: 'Lady Cressida Fane',
      calledName: 'Cress',
      role: 'Senior lady-in-waiting, your roommate and friend, and the Queen’s ears among her ladies',
      cardBlurb:
        'She shares your room, does your hair when you are late, knows everything that happens in the palace by supper, and has been told by the Queen to report on you.',
      pronouns: 'she/her',
      publicTraits: [
        'Talks fast and knows everything first',
        'Gives everyone at court a nickname, never kind and always accurate',
        'Fiercely loyal to the few people she has decided are hers',
      ],
      hiddenDrives: [
        'She has reported on the Queen’s ladies for six years to keep her mother’s pension, and hates that she is good at it',
        'She has decided the player is one of hers, and has been writing the dullest reports of her career',
      ],
      values: ['Looking after her own', 'Knowing things first'],
      fears: ['Being found out by the women she reports on', 'Losing the pension her mother lives on'],
      socialStyle:
        'Lists, nicknames and three conversations at once. Drops the most important fact in the middle of a sentence about hairpins and never repeats it.',
      boundaries: [
        'Will not lie to the Queen outright; she leaves things out instead',
        'Will not hurt the player, even on orders, though she may not say so until it is nearly too late',
      ],
      goals: ['Keep her pension and her conscience through Midsummer', 'Find out whom the player will choose before anybody else does'],
      secrets: [
        {
          id: 'cress_the_reports',
          fact: 'She keeps a blue notebook of reports on the Queen’s ladies under a loose floorboard. Yesterday the Queen asked her to watch the player closely.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She confesses if the player finds the notebook, or if the player’s trust in her is high and the player asks her what Herself wants.',
        },
        {
          id: 'cress_the_comb',
          fact: 'If the Queen decides the player is a danger, Cress will be told to hide Lady Viola’s pearl comb in the player’s trunk before a search. She has not decided whether she would do it.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She tells the player herself the hour she is asked, if the player has been a real friend to her; otherwise the comb turns up in her sewing basket.',
        },
      ],
      speechStyle:
        'Rapid, gossipy and affectionate, full of nicknames: the prince is “the Icicle”, Viola is “the Ledger”, Bastien is “Sir Smiles”, the Queen is “Herself”. Calls the player “pet”. Hides the important thing mid-sentence.',
      topics: ['the court', 'the Queen', 'the Rose Ball', 'the other ladies', 'Sir Bastien', 'the prince'],
      voiceSamples: [
        'Sit, pet, your hair is a crime. Now. The Icicle cleared the music room for you alone and I want every word.',
        'Sir Smiles has asked three women to dance this month and you twice. I count. Somebody has to.',
        'Herself asked about you this morning, by the way, pass me the pins, which she never does about anyone dull.',
        'I write things down. Family failing. Mostly what I write about you concerns your hairpins.',
      ],
      appearance:
        'An adult woman, tall and long-limbed, with a heart-shaped face, a mass of honey-blonde curls held up with far too many pins, and quick hazel eyes. Grey silk of the Queen’s household, and a pincushion on a ribbon at her wrist.',
      visualHook: 'A velvet pincushion tied to her wrist on a ribbon, bristling with hairpins.',
      silhouette: 'Mid-gesture, both hands in somebody else’s hair.',
      artSeed: 'a97-cress-01',
      portrait: null,
      expressions: ['neutral', 'amused', 'conspiratorial', 'worried', 'guilty'],
      schedule: [
        { startMinute: 0, endMinute: 420, locationId: 'ladies_gallery', activity: 'in the room you share, talking in her sleep' },
        { startMinute: 420, endMinute: 720, locationId: 'queens_solar', activity: 'taking down the Queen’s letters' },
        { startMinute: 720, endMinute: 1080, locationId: 'ladies_gallery', activity: 'dressing three ladies at once and passing on everything' },
        { startMinute: 1080, endMinute: 1320, locationId: 'rose_ballroom', activity: 'by the musicians’ gallery, seeing everything' },
        { startMinute: 1320, endMinute: 1440, locationId: 'ladies_gallery', activity: 'writing in a small blue notebook by one candle' },
      ],
      homeLocationId: 'ladies_gallery',
      knowledgeScope: ['cress', 'the_court', 'the_household', 'the_ladies_gallery', 'the_queen'],
      startingRelationship: { trust: 50, affection: 55, respect: 30, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'cress_confesses',
          label: 'She tells you she reports on you',
          kind: 'TRUST',
          requires: { trust: 60 },
        },
      ],
      attributes: { might: 9, agility: 13, mind: 14, presence: 15, resolve: 11, arcana: 7 },
      companion: null,
      scouting: null,
      combatant: null,
    },
    {
      id: 'maren',
      name: 'Maren Lisle',
      role: 'The court harpist dismissed two springs ago for a theft, and the only person the prince still writes to',
      cardBlurb:
        'She was the last person at court the prince was seen to like, and she was sent away at dawn for a theft she did not commit. She has his letters, and one of them is about you.',
      pronouns: 'she/her',
      publicTraits: [
        'Calm, dry and very hard to rattle',
        'Plays the harp better than anybody in the kingdom and teaches it for pennies',
        'Answers exactly the question asked and no other',
      ],
      hiddenDrives: [
        'She wants the theft off her name so she can play in public again',
        'She wants Aldric to stop paying for what his mother did, which he has been doing for two years',
      ],
      values: ['Saying a true thing plainly', 'Not being anybody’s cautionary tale'],
      fears: ['Being dragged back into the palace’s business', 'That the next person will have it worse than she did'],
      socialStyle:
        'Lets silences run, tunes the harp while she thinks, and answers in short plain sentences that land a minute later.',
      boundaries: [
        'Will not set foot in the palace again unless her name is cleared in public',
        'Will not show the letters to anybody who has not told her why they want them',
      ],
      goals: ['Clear her name', 'Make sure the player knows what she is walking into'],
      secrets: [
        {
          id: 'maren_the_letters',
          fact: 'She has eleven unsigned letters from Aldric. The newest is about somebody at court who reads in the gallery window and corrects his vowels.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'She shows it to a player who tells her plainly who she is and why she came.',
        },
        {
          id: 'maren_the_fountain',
          fact: 'Years ago Aldric told her the old story of the Sunken Garden fountain, one honest wish a generation, and said he was saving his.',
          visibility: 'NPC_PRIVATE',
          revealHint: 'If the player mentions anything strange about the prince, she asks whether he has been in the walled garden lately.',
        },
      ],
      speechStyle:
        'Low, plain and unhurried. Short sentences. Music words used straight: tuning, a rest, a wrong note, a change of key. Never bitter on purpose.',
      topics: ['the harp', 'the brooch', 'Aldric', 'the letters', 'the Sunken Garden', 'the lower town'],
      voiceSamples: [
        'Sit down. Not there, that chair is for pupils and it squeaks. There.',
        'He was my friend. That is all it was, and it was enough for her.',
        'A rest is still part of the music. People forget that. He has played nothing but rests for two years.',
        'If you came for the letters, tell me why first. If you came for me, the kettle is on.',
      ],
      appearance:
        'An adult woman, slight and straight-shouldered, with dark brown skin, close-cropped black hair and long calloused musician’s hands. A plain undyed wool dress, and a brass tuning key on a cord round her neck.',
      visualHook: 'A brass harp-tuning key on a cord round her neck, which she turns while she thinks.',
      silhouette: 'Seated beside a tall harp, one hand resting flat on the strings.',
      artSeed: 'a97-maren-01',
      portrait: null,
      expressions: ['neutral', 'dry', 'warm', 'grave'],
      schedule: [
        { startMinute: 0, endMinute: 480, locationId: 'lantern_street', activity: 'in her rented room above the chandler’s' },
        { startMinute: 480, endMinute: 1200, locationId: 'lantern_street', activity: 'teaching harp to whoever pays, window open' },
        { startMinute: 1200, endMinute: 1440, locationId: 'lantern_street', activity: 'playing for supper at the inn on the corner' },
      ],
      homeLocationId: 'lantern_street',
      knowledgeScope: ['maren_lisle', 'aldric', 'the_brooch', 'the_sunken_garden', 'the_lower_town'],
      startingRelationship: { trust: 0, affection: 0, respect: 10, fear: 0, rivalry: 0 },
      gates: [
        {
          id: 'maren_shows_letters',
          label: 'She shows you his letters',
          kind: 'TRUST',
          requires: { trust: 30, flagsSet: ['knows:the_harpist'] },
        },
      ],
      attributes: { might: 9, agility: 12, mind: 14, presence: 13, resolve: 16, arcana: 10 },
      companion: null,
      scouting: null,
      combatant: null,
    },
  ],
  quests: [
    {
      id: 'q_i_despise_you',
      title: 'I Despise You',
      summary:
        'The crown prince has told you he despises you and ordered you to keep to the far end of the ballroom tonight. The number over his head says 98 and climbing.',
      kind: 'MAIN',
      startsActive: true,
      involvedCharacterIds: ['aldric', 'bastien', 'viola'],
      involvedLocationIds: ['music_room', 'rose_ballroom'],
      knownRewardCopy: 'Some idea of why he is doing this, and what it costs him to keep it up.',
      steps: [
        {
          id: 'the_music_room',
          playerCopy: 'Answer a prince who says he despises you.',
          directorNotes:
            'He expects one of two things: a curtsy and a hurt face, or tears. Anything else throws him, and the number shows it. Every route here is legitimate. If the player tells him about the window, he does not believe it, then tests it by saying something cruel and asking what it does, and is mortified when she tells him. Never have him guess about the window on his own.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'did_as_told',
              label: 'Curtsy and agree to keep away',
              predicate: { flagsSet: ['used:keep_your_place'] },
              setsFlags: ['kept_away_from_him'],
              closesFlags: [],
            },
            {
              routeId: 'called_his_bluff',
              label: 'Answer what the window says, not what he said',
              predicate: { flagsSet: ['used:call_his_bluff'] },
              setsFlags: ['called_his_bluff'],
              closesFlags: ['kept_away_from_him'],
            },
            {
              routeId: 'stepped_closer',
              label: 'Step closer instead of back',
              predicate: { flagsSet: ['used:hold_your_ground'] },
              setsFlags: ['stood_your_ground'],
              closesFlags: ['kept_away_from_him'],
            },
            {
              routeId: 'told_him',
              label: 'Tell him about the number over his head',
              predicate: { flagsSet: ['used:tell_him_about_it'] },
              setsFlags: ['he_knows_about_the_window'],
              closesFlags: ['window_kept_secret'],
            },
          ],
          rewards: {
            xp: 40,
            items: [],
            flags: ['first_answer'],
            abilities: ['trace_the_wish'],
            reputation: [],
          },
        },
        {
          id: 'the_rose_ball',
          playerCopy: 'Get through the Rose Ball.',
          directorNotes:
            'Two hundred candles and the whole court. Aldric opens the dancing with Viola and does not look at her face. Bastien asks the player to dance in public, warmly and on purpose. Viola watches the prince watch the player. The Queen watches all three. Whatever the player does here is news by breakfast.',
          enterWhen: { flagsSet: ['first_answer'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'kept_to_the_far_wall',
              label: 'Keep to the far end of the room, as ordered',
              predicate: { flagsSet: ['visited:rose_ballroom', 'used:keep_your_place'] },
              setsFlags: ['ball_kept_away'],
              closesFlags: [],
            },
            {
              routeId: 'danced_with_him',
              label: 'Dance with the prince in front of everyone',
              predicate: { flagsSet: ['visited:rose_ballroom', 'used:make_a_scene'] },
              setsFlags: ['danced_with_aldric', 'the_court_saw'],
              closesFlags: ['ball_kept_away'],
            },
            {
              routeId: 'danced_with_bastien',
              label: 'Dance with Sir Bastien instead',
              predicate: { flagsSet: ['visited:rose_ballroom', 'spoke:bastien'] },
              setsFlags: ['danced_with_bastien'],
              closesFlags: [],
            },
            {
              routeId: 'missed_the_ball',
              label: 'Slip away while the whole palace is at the ball',
              predicate: { flagsSet: ['used:go_unseen'] },
              setsFlags: ['missed_the_ball'],
              closesFlags: ['danced_with_aldric'],
            },
          ],
          rewards: {
            xp: 60,
            items: [],
            flags: ['ball_over'],
            abilities: [],
            reputation: [
              { factionId: 'faction_court', amount: 5 },
              { factionId: 'faction_household', amount: 5 },
            ],
          },
        },
      ],
    },
    {
      id: 'q_why_he_says_it',
      title: 'Why He Says It',
      summary:
        'Aldric is colder to you than to anybody at court, and the number says it is not because he means it. Something taught him to do this, two springs ago.',
      kind: 'MAIN',
      involvedCharacterIds: ['aldric', 'bastien', 'cress', 'ottilie', 'maren'],
      involvedLocationIds: ['queens_solar', 'lantern_street', 'map_library'],
      knownRewardCopy: 'The reason he lies, and a decision about what to do with it.',
      discoverWhen: { flagsSet: ['first_answer'] },
      steps: [
        {
          id: 'find_the_reason',
          playerCopy: 'Find out why he pushes you away.',
          directorNotes:
            'Four ways to learn about Maren Lisle and the brooch, and they are not equal. Bastien tells it as a friend who was there. Cress tells it as gossip with one fact in it she should not know. The jewel book proves who did it. Aldric telling it himself is the version where he trusts her, and it costs him visibly.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'bastien_told_you',
              label: 'Get the story from Sir Bastien',
              predicate: { flagsSet: ['spoke:bastien'], minRelationship: [{ characterId: 'bastien', dimension: 'trust', value: 50 }] },
              setsFlags: ['knows:the_harpist', 'bastien_talked'],
              closesFlags: [],
            },
            {
              routeId: 'cress_told_you',
              label: 'Get the gossip from Cress',
              predicate: { flagsSet: ['spoke:cress'], minRelationship: [{ characterId: 'cress', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_harpist', 'cress_talked'],
              closesFlags: [],
            },
            {
              routeId: 'found_the_jewel_book',
              label: 'Read the Queen’s jewel book',
              predicate: { hasItems: ['jewel_book'] },
              setsFlags: ['knows:the_harpist', 'knows:the_queen_did_it'],
              closesFlags: [],
            },
            {
              routeId: 'he_told_you',
              label: 'Ask him, and wait for the answer',
              predicate: {
                flagsSet: ['used:ask_straight', 'spoke:aldric'],
                minRelationship: [{ characterId: 'aldric', dimension: 'trust', value: 50 }],
              },
              setsFlags: ['knows:the_harpist', 'he_told_you_himself'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['reason_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_household', amount: 5 }],
          },
        },
        {
          id: 'what_you_do_with_it',
          playerCopy: 'Decide what to do about a court that ruins whoever he likes.',
          directorNotes:
            'The Queen is not a monster and is not bluffing. Confronting her with proof makes her stop, coldly and completely. Taking her side buys the player safety and a future. Going to Maren gives the player the letters and the view of somebody the palace already threw out. Asking Aldric to stop pretending is the bravest and costs his wall the most.',
          enterWhen: { flagsSet: ['reason_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_to_maren',
              label: 'Go down to Lantern Street and find the harpist',
              predicate: { flagsSet: ['spoke:maren'] },
              setsFlags: ['met_maren'],
              closesFlags: [],
            },
            {
              routeId: 'confronted_the_queen',
              label: 'Put the jewel book on the Queen’s desk',
              predicate: { flagsSet: ['knows:the_queen_did_it', 'spoke:ottilie'], hasItems: ['jewel_book'] },
              setsFlags: ['queen_disarmed'],
              closesFlags: ['queen_protege'],
            },
            {
              routeId: 'took_her_side',
              label: 'Accept the Queen’s protection, and her terms',
              predicate: {
                flagsSet: ['spoke:ottilie'],
                minFactionReputation: [{ factionId: 'faction_household', value: 40 }],
              },
              setsFlags: ['queen_protege'],
              closesFlags: ['queen_disarmed'],
            },
            {
              routeId: 'asked_him_to_stop',
              label: 'Ask him to stop pretending, at least with you',
              predicate: {
                flagsSet: ['used:ask_straight', 'spoke:aldric'],
                minRelationship: [{ characterId: 'aldric', dimension: 'trust', value: 55 }],
              },
              setsFlags: ['he_stopped_pretending'],
              closesFlags: [],
            },
            {
              routeId: 'let_it_lie',
              label: 'Keep his secret and say nothing',
              predicate: { flagsSet: ['used:keep_your_place'] },
              setsFlags: ['kept_his_secret'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 140,
            items: [],
            flags: ['know_what_it_costs'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_bride',
      title: 'The Bride Who Doesn’t Want Him',
      summary:
        'Lady Viola Ashgrove is promised to the crown prince and is paying close attention to which way he looks. She has an offer for you, and it has terms.',
      kind: 'MAIN',
      involvedCharacterIds: ['viola', 'ottilie', 'aldric'],
      involvedLocationIds: ['ashgrove_suite', 'queens_solar'],
      knownRewardCopy: 'A way out of the betrothal that does not bankrupt the crown, if you will be the reason.',
      discoverWhen: { flagsSet: ['viola_made_her_offer'] },
      steps: [
        {
          id: 'answer_viola',
          playerCopy: 'Answer Lady Viola’s offer.',
          directorNotes:
            'She is using the player and says so. Her offer is honest: if the prince publicly chooses the player before Midsummer, Viola releases him and turns the debt into a loan, and takes a board seat as her price. Refusing is respected. Selling her to the Queen is possible and Viola will find out within a day.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'took_her_offer',
              label: 'Shake on her terms',
              predicate: { flagsSet: ['used:strike_a_bargain', 'spoke:viola'] },
              setsFlags: ['viola_pact'],
              closesFlags: ['refused_viola'],
            },
            {
              routeId: 'refused_her',
              label: 'Tell her you are nobody’s collateral',
              predicate: { flagsSet: ['used:keep_your_place', 'spoke:viola'] },
              setsFlags: ['refused_viola'],
              closesFlags: ['viola_pact'],
            },
            {
              routeId: 'sold_her_to_the_queen',
              label: 'Tell the Queen what her son’s bride is planning',
              predicate: {
                flagsSet: ['spoke:ottilie', 'visited:queens_solar'],
                minFactionReputation: [{ factionId: 'faction_household', value: 40 }],
              },
              setsFlags: ['told_the_queen'],
              closesFlags: ['viola_pact'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['viola_answered'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'the_ashgrove_terms',
          playerCopy: 'Help Viola turn a wedding debt into something the crown can survive.',
          directorNotes:
            'The numbers are real and the player can check them. The loan is fair to the crown. What it needs is a public reason for the betrothal to end that is not Viola’s fault, and the Queen not standing in the way.',
          enterWhen: { flagsSet: ['viola_pact'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'debt_into_a_loan',
              label: 'Check her numbers and draft the terms together',
              predicate: { flagsSet: ['used:strike_a_bargain'], hasItems: ['viola_ledger'] },
              setsFlags: ['debt_settled'],
              closesFlags: [],
            },
            {
              routeId: 'viola_carried_it',
              label: 'Trust her to carry it through herself',
              predicate: { flagsSet: ['viola_pact'], minRelationship: [{ characterId: 'viola', dimension: 'trust', value: 65 }] },
              setsFlags: ['debt_settled', 'viola_seat'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 160,
            items: [],
            flags: ['the_debt_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_ashgrove', amount: 25 }],
          },
        },
      ],
    },
    {
      id: 'q_out_loud',
      title: 'Out Loud',
      summary:
        'The window closes the first time he says to your face what it says. You can make that happen, wait for it, or keep the number for ever.',
      kind: 'MAIN',
      involvedCharacterIds: ['aldric'],
      involvedLocationIds: ['map_library', 'moon_terrace', 'music_room'],
      knownRewardCopy: 'Him, without the number. Or the number, without him saying it.',
      discoverWhen: { flagsSet: ['ball_over'] },
      steps: [
        {
          id: 'make_him_say_it',
          playerCopy: 'Hear him say it, or decide you do not need to.',
          directorNotes:
            'He says it only when he believes saying it will not get her hurt, which means the Queen, the debt or the player’s own courage has to change first. Saying it first is the player’s bravest move and does not force his answer. Steering him with the number works in the short term and, if he knows about the window, he will work out what she did.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_said_it_himself',
              label: 'He says it, to your face',
              predicate: { flagsSet: ['used:ask_straight', 'he_stopped_pretending'] },
              setsFlags: ['he_said_it'],
              closesFlags: ['kept_the_window'],
            },
            {
              routeId: 'you_said_it_first',
              label: 'Say it first, and let him answer',
              predicate: { flagsSet: ['used:say_it_first', 'reason_known'] },
              setsFlags: ['he_said_it', 'you_said_it_first'],
              closesFlags: ['kept_the_window'],
            },
            {
              routeId: 'he_caught_you',
              label: 'Play the number once too often',
              predicate: { flagsSet: ['used:play_the_number', 'he_knows_about_the_window'] },
              setsFlags: ['he_found_out'],
              closesFlags: ['he_said_it'],
            },
            {
              routeId: 'kept_it',
              label: 'Let Midsummer come and go with the window still open',
              predicate: { flagsSet: ['midsummer_answered'] },
              setsFlags: ['kept_the_window'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['window_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_midsummer',
      title: 'The Midsummer Rite',
      summary:
        'On the evening of the tenth day, in the Rose Chapel, the crown prince gives his word to Lady Viola in front of the court, and the crown’s debt vanishes with it. After that nothing about this can be undone.',
      kind: 'MAIN',
      involvedCharacterIds: ['aldric', 'viola', 'ottilie', 'bastien'],
      involvedLocationIds: ['palace_chapel', 'postern_gate'],
      knownRewardCopy: 'The end of the fortnight, one way or another.',
      discoverWhen: { flagsSet: ['ball_over'] },
      steps: [
        {
          id: 'before_the_rite',
          playerCopy: 'Decide what happens at the Midsummer Rite.',
          directorNotes:
            'If nothing has changed, he gives his word and the number does not move at all, which is worse than if it fell. Breaking it cleanly needs Viola’s terms and his own voice. Running needs him to have said it and a way out of the palace after dark. Objecting in the chapel without either breaks the betrothal and the player’s place at court with it.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'broken_with_terms',
              label: 'End the betrothal with Viola’s terms on the altar',
              predicate: { flagsSet: ['debt_settled', 'he_said_it'] },
              setsFlags: ['rite_broken'],
              closesFlags: ['rite_sealed'],
            },
            {
              routeId: 'ran_away_together',
              label: 'Leave by the postern gate, together, before the rite',
              predicate: { flagsSet: ['he_said_it', 'used:go_unseen'], atLocation: 'postern_gate' },
              setsFlags: ['ran_with_him', 'rite_broken'],
              closesFlags: ['rite_sealed'],
            },
            {
              routeId: 'stopped_it_in_public',
              label: 'Object in the chapel, in front of everyone',
              predicate: { flagsSet: ['rite_day', 'used:make_a_scene'], atLocation: 'palace_chapel' },
              setsFlags: ['rite_broken', 'dismissed'],
              closesFlags: ['rite_sealed'],
            },
            {
              routeId: 'it_went_ahead',
              label: 'Watch him give his word',
              predicate: { flagsSet: ['rite_day'], afterWorldMinute: 9 * 1440 + 18 * 60 },
              setsFlags: ['rite_sealed'],
              closesFlags: ['rite_broken'],
            },
          ],
          rewards: {
            xp: 200,
            items: [],
            flags: ['midsummer_answered'],
            abilities: [],
            reputation: [{ factionId: 'faction_court', amount: 10 }],
          },
        },
      ],
    },
    {
      id: 'q_no_number',
      title: 'No Number Over His Head',
      summary:
        'Sir Bastien flirts with you in public, warmly and on purpose, and there is no window over his head to tell you whether he means it.',
      kind: 'SIDE',
      involvedCharacterIds: ['bastien', 'aldric'],
      involvedLocationIds: ['tiltyard', 'rose_ballroom', 'long_gallery'],
      knownRewardCopy: 'Whether his attention was ever his own idea, and whether it is now.',
      discoverWhen: { flagsSet: ['ball_over'] },
      steps: [
        {
          id: 'what_bastien_is_doing',
          playerCopy: 'Find out why Sir Bastien is paying you so much attention.',
          directorNotes:
            'He was asked to. He kept going for his own reasons. He will not tell the player it was Aldric’s idea without being asked straight, and he will never say a word against his friend.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'he_admitted_it',
              label: 'Ask him straight, alone',
              predicate: { flagsSet: ['used:ask_straight', 'spoke:bastien'], minRelationship: [{ characterId: 'bastien', dimension: 'trust', value: 55 }] },
              setsFlags: ['knows:the_decoy'],
              closesFlags: [],
            },
            {
              routeId: 'overheard_them',
              label: 'Overhear him and the prince in the tiltyard',
              predicate: { flagsSet: ['used:go_unseen', 'visited:tiltyard', 'tiltyard_argument'] },
              setsFlags: ['knows:the_decoy', 'overheard_bastien'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 80,
            items: [],
            flags: ['decoy_known'],
            abilities: [],
            reputation: [{ factionId: 'faction_guard', amount: 10 }],
          },
        },
        {
          id: 'what_you_want_from_him',
          playerCopy: 'Decide what Sir Bastien is to you.',
          directorNotes:
            'Choosing him is a real ending and must never read as second prize. Its whole meaning is trust without proof. Staying friends is also real, and he takes it gracefully and a little too well.',
          enterWhen: { flagsSet: ['decoy_known'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'chose_him',
              label: 'Choose the man with no number',
              predicate: { flagsSet: ['decoy_known'], minRelationship: [{ characterId: 'bastien', dimension: 'affection', value: 60 }] },
              setsFlags: ['chose_bastien'],
              closesFlags: ['bastien_friend'],
            },
            {
              routeId: 'stayed_friends',
              label: 'Keep him as a friend',
              predicate: { flagsSet: ['decoy_known', 'used:keep_your_place'] },
              setsFlags: ['bastien_friend'],
              closesFlags: ['chose_bastien'],
            },
          ],
          rewards: {
            xp: 100,
            items: [],
            flags: ['bastien_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
    {
      id: 'q_the_pearl_comb',
      title: 'The Pearl Comb',
      summary:
        'If the Queen decides you are a danger, her steward will search the Ladies’ Gallery for Lady Viola’s missing pearl comb. Two springs ago a search like this found a brooch in a harpist’s music case.',
      kind: 'SIDE',
      involvedCharacterIds: ['cress', 'ottilie', 'viola'],
      involvedLocationIds: ['ladies_gallery', 'queens_solar'],
      knownRewardCopy: 'Your place at court, and finding out who your friends are.',
      discoverWhen: { flagsSet: ['the_search'] },
      steps: [
        {
          id: 'the_comb',
          playerCopy: 'Get through the search with your place at court.',
          directorNotes:
            'The Queen is doing it again. The comb is meant to be in the player’s trunk; whether Cress actually put it there is Cress’s choice. The player can find it first, have Viola say aloud that she lent it, or have Cress turn. If nothing intervenes by evening, it is found and the player is dismissed exactly as Maren was.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'found_it_first',
              label: 'Find the comb before the steward does',
              predicate: { flagsSet: ['used:go_unseen'], atLocation: 'ladies_gallery' },
              setsFlags: ['search_failed', 'comb_found_first'],
              closesFlags: ['dismissed'],
            },
            {
              routeId: 'viola_vouched',
              label: 'Have Lady Viola say she lent it to you',
              predicate: { flagsSet: ['viola_pact', 'spoke:viola'] },
              setsFlags: ['search_failed', 'viola_vouched'],
              closesFlags: ['dismissed'],
            },
            {
              routeId: 'cress_turned',
              label: 'Let Cress choose you over the Queen',
              predicate: { flagsSet: ['spoke:cress'], minRelationship: [{ characterId: 'cress', dimension: 'trust', value: 60 }] },
              setsFlags: ['search_failed', 'cress_turned'],
              closesFlags: ['dismissed'],
            },
            {
              routeId: 'it_was_found',
              label: 'Let the steward finish the search',
              predicate: { flagsSet: ['the_search'], afterWorldMinute: 3 * 1440 + 18 * 60 },
              setsFlags: ['dismissed'],
              closesFlags: ['search_failed'],
            },
          ],
          rewards: {
            xp: 90,
            items: [],
            flags: ['search_over'],
            abilities: [],
            reputation: [{ factionId: 'faction_household', amount: 5 }],
          },
        },
      ],
    },
    {
      id: 'q_the_wish',
      title: 'The Fountain of Small Mercies',
      summary:
        'A dry fountain in a walled garden nobody tends, a coin in it with the royal crest, and an old story about one honest wish in each generation.',
      kind: 'LEAD',
      involvedCharacterIds: ['aldric', 'maren'],
      involvedLocationIds: ['sunken_garden', 'palace_gardens', 'map_library'],
      knownRewardCopy: 'Where the window came from, and who asked for it.',
      discoverWhen: { flagsSet: ['knows:the_fountain'] },
      steps: [
        {
          id: 'find_the_fountain',
          playerCopy: 'Find the fountain in the Sunken Garden.',
          directorNotes:
            'This whole thread is optional and must feel like it. A player who never sets knows:the_fountain never sees a beat of it, and the romance is the complete game. For a player who is here, keep it quiet and physical: ivy, a cracked basin, one clean coin. The grey line under the number sharpens as she stands at the fountain.',
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'went_over_the_wall',
              label: 'Climb into the Sunken Garden yourself',
              predicate: { flagsSet: ['used:trace_the_wish'], atLocation: 'sunken_garden' },
              setsFlags: ['found_the_coin'],
              closesFlags: [],
            },
            {
              routeId: 'maren_remembered',
              label: 'Let Maren tell you what he once said about it',
              predicate: { flagsSet: ['met_maren', 'used:trace_the_wish'] },
              setsFlags: ['found_the_coin', 'maren_remembered'],
              closesFlags: [],
            },
          ],
          rewards: {
            xp: 150,
            items: [],
            flags: ['knows:who_wished'],
            abilities: [],
            reputation: [],
          },
        },
        {
          id: 'your_own_wish',
          playerCopy: 'Decide what to do with the fountain now you know.',
          directorNotes:
            'The fountain has granted one wish this generation already. Whether it grants another is not something anybody here knows. What matters is what the player asks for, and whether she tells him. Do not make it a puzzle.',
          enterWhen: { flagsSet: ['knows:who_wished'] },
          succeedWhen: null,
          succeedWhenAny: [
            {
              routeId: 'made_her_own',
              label: 'Drop a coin of your own and wish',
              predicate: { atLocation: 'sunken_garden', flagsSet: ['used:trace_the_wish', 'knows:who_wished'] },
              setsFlags: ['wish_answered', 'made_a_wish'],
              closesFlags: ['left_it_dry'],
            },
            {
              routeId: 'left_it_dry',
              label: 'Leave the fountain as you found it',
              predicate: { atLocation: 'sunken_garden', flagsSet: ['knows:who_wished'] },
              setsFlags: ['wish_answered', 'left_it_dry'],
              closesFlags: ['made_a_wish'],
            },
          ],
          rewards: {
            xp: 180,
            items: [],
            flags: ['fountain_answered'],
            abilities: [],
            reputation: [],
          },
        },
      ],
    },
  ],
  worldEvents: [
    {
      id: 'we_the_rose_ball',
      atWorldMinute: 20 * 60,
      locationId: 'rose_ballroom',
      publicCopy:
        'The Rose Ball opens: two hundred candles, the court in silk, and the crown prince expected to lead out Lady Viola for the first dance.',
      directorNotes:
        'Aldric opens the dancing with Viola, correctly and without once looking at her face. Bastien asks the player to dance where everybody can see, because Aldric asked him to. Viola notices Aldric watching the player. The Queen watches all three from the dais. If the player defies his order in public, the court sees it and the number does something she can see from across the room.',
      setsFlags: ['ball_began'],
      cancelledByFlags: [],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'aldric', toLocationId: 'rose_ballroom' },
        { characterId: 'viola', toLocationId: 'rose_ballroom' },
        { characterId: 'bastien', toLocationId: 'rose_ballroom' },
        { characterId: 'ottilie', toLocationId: 'rose_ballroom' },
        { characterId: 'cress', toLocationId: 'rose_ballroom' },
      ],
    },
    {
      id: 'we_the_garden_plan',
      atWorldMinute: 23 * 60 + 30,
      locationId: 'map_library',
      publicCopy:
        'On the map table in the Map Library, under the prince’s paperweight, lies an old plan of the palace gardens with one small walled square circled twice in pencil.',
      directorNotes:
        'Aldric left it there last night and forgot it. The circled square is the Sunken Garden. If he walks in and sees the player looking at it, he takes it back faster than he has ever done anything, and the number jumps.',
      setsFlags: ['knows:the_fountain'],
      cancelledByFlags: [],
      requiresFlags: ['visited:map_library'],
      movesCharacters: [],
    },
    {
      id: 'we_viola_sends_for_you',
      atWorldMinute: 1440 + 9 * 60,
      locationId: 'ashgrove_suite',
      publicCopy:
        'Lady Viola sends for you before breakfast, and when you arrive she locks the door of her suite from the inside.',
      directorNotes:
        'She saw where the prince looked at the ball. She does not want him; she wants the bank. She makes the offer plainly: let him choose you, in public, before Midsummer, and she will turn the debt into a loan the crown can pay, for a seat on her family’s board. She will put it on paper. She is not cruel and she is not doing the player a favour.',
      setsFlags: ['viola_made_her_offer'],
      cancelledByFlags: [],
      requiresFlags: ['first_answer'],
      movesCharacters: [{ characterId: 'viola', toLocationId: 'ashgrove_suite' }],
    },
    {
      id: 'we_the_gardener',
      atWorldMinute: 1440 + 14 * 60,
      locationId: 'palace_gardens',
      publicCopy:
        'The old head gardener is raking the gravel under the Sunken Garden wall and grumbling that somebody climbed it two nights ago, in good boots.',
      directorNotes:
        'He will tell anybody who asks about the walled garden and its dry fountain, and about the old wish, as a story his grandmother told. He has seen whose boots, and will not say whose to a lady-in-waiting.',
      setsFlags: ['knows:the_fountain'],
      cancelledByFlags: [],
      requiresFlags: ['visited:palace_gardens'],
      movesCharacters: [],
    },
    {
      id: 'we_a_note_from_lantern_street',
      atWorldMinute: 2 * 1440 + 10 * 60,
      locationId: null,
      publicCopy:
        'A note comes for you by the kitchen door, in a firm hand you do not know: If you are the one who reads in the gallery window, come to Lantern Street. Bring nobody.',
      directorNotes:
        'Maren Lisle wrote it after Bastien’s last visit, when she read in Aldric’s letter about a lady-in-waiting who reads in the gallery window. She wants to warn the player, not recruit her.',
      setsFlags: ['maren_wrote'],
      cancelledByFlags: ['met_maren'],
      requiresFlags: ['knows:the_harpist'],
      movesCharacters: [],
    },
    {
      id: 'we_the_queens_tea',
      atWorldMinute: 2 * 1440 + 16 * 60,
      locationId: 'queens_solar',
      publicCopy:
        'The Queen invites you to take tea in her solar, alone, which she has never done with anybody below a countess.',
      directorNotes:
        'She has heard about the ball from Cress and from three others. She is warm, curious and entirely in control. She offers the player something real, a place at her side, a husband from a good family, a pension, and watches what the player does with it. She threatens nobody today.',
      setsFlags: ['queen_noticed'],
      cancelledByFlags: [],
      requiresFlags: ['ball_over'],
      movesCharacters: [{ characterId: 'ottilie', toLocationId: 'queens_solar' }],
    },
    {
      id: 'we_the_search',
      atWorldMinute: 3 * 1440 + 10 * 60,
      locationId: 'ladies_gallery',
      publicCopy:
        'The Queen’s steward and two guards are searching the Ladies’ Gallery room by room for Lady Viola’s missing pearl comb.',
      directorNotes:
        'This is the Queen doing again what she did to Maren. The comb is meant to be in the player’s trunk, and whether Cress actually put it there is Cress’s choice. The player can find it first, have Viola say she lent it, or have Cress turn. If nothing intervenes by evening, it is found and the player is dismissed.',
      setsFlags: ['the_search'],
      cancelledByFlags: ['queen_protege', 'queen_disarmed'],
      requiresFlags: ['queen_noticed'],
      movesCharacters: [{ characterId: 'cress', toLocationId: 'ladies_gallery' }],
    },
    {
      id: 'we_the_tiltyard_argument',
      atWorldMinute: 4 * 1440 + 7 * 60,
      locationId: 'tiltyard',
      publicCopy:
        'Out in the tiltyard, Sir Bastien and the crown prince are fencing with blunted swords and arguing in low voices between bouts.',
      directorNotes:
        'They are arguing about the player. Bastien wants to stop pretending he is only pretending; Aldric orders him to keep going. A player who gets close unseen hears the word favour and her own name. Nobody is hurt; the swords are blunt and both of them are good.',
      setsFlags: ['tiltyard_argument'],
      cancelledByFlags: [],
      requiresFlags: ['ball_over'],
      movesCharacters: [
        { characterId: 'bastien', toLocationId: 'tiltyard' },
        { characterId: 'aldric', toLocationId: 'tiltyard' },
      ],
    },
    {
      id: 'we_the_rehearsal',
      atWorldMinute: 6 * 1440 + 15 * 60,
      locationId: 'palace_chapel',
      publicCopy:
        'Rehearsal for the Midsummer Rite: Lady Viola and the crown prince walk the chapel aisle twice while the chaplain times them with a sandglass.',
      directorNotes:
        'The player is there as Viola’s attendant, holding her gloves. Aldric does not look at the player once, and the number climbs the whole length of the aisle. Viola notices that too.',
      setsFlags: ['rehearsal_held'],
      cancelledByFlags: ['rite_broken', 'ran_with_him'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'aldric', toLocationId: 'palace_chapel' },
        { characterId: 'viola', toLocationId: 'palace_chapel' },
      ],
    },
    {
      id: 'we_the_midsummer_rite',
      atWorldMinute: 9 * 1440 + 17 * 60,
      locationId: 'palace_chapel',
      publicCopy:
        'The Midsummer Rite: the whole court in the Rose Chapel, the Ashgrove contract on the altar, and the crown prince asked aloud whether he gives his word.',
      directorNotes:
        'If nothing has changed, he gives it in a clear voice, and the number over his head does not move at all. Anything the player has set up, Viola’s terms, the jewel book, a word in public, happens here in front of everybody and cannot be taken back.',
      setsFlags: ['rite_day'],
      cancelledByFlags: ['rite_broken', 'ran_with_him'],
      requiresFlags: [],
      movesCharacters: [
        { characterId: 'aldric', toLocationId: 'palace_chapel' },
        { characterId: 'viola', toLocationId: 'palace_chapel' },
        { characterId: 'ottilie', toLocationId: 'palace_chapel' },
        { characterId: 'bastien', toLocationId: 'palace_chapel' },
        { characterId: 'cress', toLocationId: 'palace_chapel' },
      ],
    },
  ],
  promises: [
    {
      id: 'p_out_loud',
      kind: 'FINALE',
      label: 'Whether he ever says it himself',
      seedHint: 'The arrow going up as he says “I despise you”.',
      payoffHint: 'He says it to her face, in his own words, and the frame of light goes out mid-sentence.',
      weight: 1,
    },
    {
      id: 'p_why_he_lies',
      kind: 'RELATIONSHIP',
      label: 'Why he pushes her away',
      seedHint: 'He is colder to her than to anybody at court, and the number says he does not mean it.',
      payoffHint: 'A harpist sent away at dawn, a sapphire brooch, and the Queen’s own handwriting in the jewel book.',
      weight: 0.9,
    },
    {
      id: 'p_the_bride',
      kind: 'RIVAL',
      label: 'The bride who does not want him',
      seedHint: 'Viola watching the prince watch the player across the Rose Ball.',
      payoffHint: 'A locked door, a red account book, and an offer with terms.',
      weight: 0.8,
    },
    {
      id: 'p_the_wish',
      kind: 'MYSTERY',
      label: 'Where the window came from',
      seedHint: 'A grey line under the number that will not come clear.',
      payoffHint: 'A dry fountain in a walled garden, a clean royal coin in the leaves, and the line [Wished for: this].',
      weight: 0.5,
    },
    {
      id: 'p_no_number',
      kind: 'THEME',
      label: 'Knowing somebody without a number',
      seedHint: 'Sir Bastien asks her to dance, and there is nothing above his head.',
      payoffHint: 'She decides whether to trust somebody without being told the answer.',
      weight: 0.7,
    },
  ],
  archetypes: [
    {
      id: 'arch_old_name',
      name: 'An Old Name, No Money',
      role: 'Court manners and social craft',
      summary:
        'Your family has a title older than the bank that owns the crown and nothing else, so you know every rule of this court and exactly how to bend one.',
      playstyle: ['Proper', 'Knows the rules', 'Hard to embarrass'],
      blurb:
        'Your grandmother taught you eleven curtsies before you could read, and you have used every one of them as a weapon at least once.',
      attributeBonus: { presence: 3, resolve: 1 },
      skillProficiencies: { decorum: 3, wit: 1, old_stories: 1 },
      startingItems: [{ itemId: 'family_signet', qty: 1 }],
      startingAbilities: ['invoke_precedence'],
      startingReputation: [{ factionId: 'faction_household', amount: 10 }],
    },
    {
      id: 'arch_wool_money',
      name: 'Wool Money',
      role: 'Trade background, ledgers and bargains',
      summary:
        'Your family bought your place at court with wool, so you read a contract faster than anybody in the palace, and the bankers treat you as one of their own kind.',
      playstyle: ['Shrewd', 'Good with numbers', 'New at court'],
      blurb:
        'The older ladies call you the shepherdess when they think you cannot hear. You can always hear, and you have their families’ debts by heart.',
      attributeBonus: { mind: 3, presence: 1 },
      skillProficiencies: { accounts: 3, attention: 1, wit: 1 },
      startingItems: [{ itemId: 'letter_of_credit', qty: 1 }],
      startingAbilities: ['read_the_ledger'],
      startingReputation: [{ factionId: 'faction_ashgrove', amount: 10 }],
    },
    {
      id: 'arch_garrison',
      name: 'Raised in a Garrison',
      role: 'Riding, sword training and nerve',
      summary:
        'You grew up inside a northern fort, so you ride, fence and climb better than anybody in silk, and the soldiers on the gates treat you as one of their own.',
      playstyle: ['Physical', 'Bold', 'Says it plainly'],
      blurb:
        'You learned to dance at court and to fall off a horse properly at the fort, and you still think the second is the more useful skill.',
      attributeBonus: { might: 2, agility: 2 },
      skillProficiencies: { horse_and_blade: 3, discretion: 1, candour: 1 },
      startingItems: [{ itemId: 'stable_pass', qty: 1 }],
      startingAbilities: ['quick_hands'],
      startingReputation: [{ factionId: 'faction_guard', amount: 15 }],
    },
    {
      id: 'arch_physician',
      name: 'A Physician’s Training',
      role: 'Healing and a sharp eye',
      summary:
        'A parent who treated the old king taught you medicine, so you notice fever, sleeplessness and what is in a cup, and nobody at court expects it of a lady-in-waiting.',
      playstyle: ['Observant', 'Calm', 'Notices illness'],
      blurb:
        'You can tell from across a ballroom who has not slept, who has not eaten, and who is pretending to be well. Lately that is mostly the royal family.',
      attributeBonus: { mind: 3, resolve: 1 },
      skillProficiencies: { physic: 3, attention: 2 },
      startingItems: [{ itemId: 'physic_case', qty: 1 }],
      startingAbilities: ['physicians_eye'],
      startingReputation: [],
    },
  ],
  setupFields: [
    { id: 'displayName', label: 'What does the court call you?', kind: 'TEXT', required: true, maxLength: 40, placeholder: 'e.g. Elise Marlowe' },
    { id: 'pronouns', label: 'Pronouns', kind: 'TEXT', required: false, maxLength: 24, placeholder: 'e.g. she/her' },
    {
      id: 'archetype',
      label: 'Where did you come from before court?',
      helpText:
        'Your family and upbringing before you came to court, which sets what you are good at. It stays the same for the whole story. It does not decide whom you love, whether you keep his secret, or whether you stay at court: all of that is yours, and none of it is decided here.',
      kind: 'ARCHETYPE',
      required: true,
    },
    {
      id: 'worldKnowsAboutYou',
      label: 'What does the court say about you?',
      helpText: 'One plain thing the court repeats about you. Most people write a single sentence, and that is the right amount.',
      kind: 'TEXT',
      required: false,
      maxLength: 300,
      placeholder: 'e.g. She reads at every meal, has never once been late, and laughs at the wrong moments in chapel.',
    },
    {
      id: 'first_instinct',
      label: 'When a prince says he despises you, your first instinct is to…',
      helpText: 'A starting temperament, not a commitment. You can do the exact opposite in the music room and the story will keep up.',
      kind: 'CHOICE',
      advanced: true,
      options: [
        { id: 'call_his_bluff', label: 'Call his bluff' },
        { id: 'give_him_nothing', label: 'Curtsy and give him nothing to hold against you' },
        { id: 'tease_him', label: 'Tease him until the number moves' },
        { id: 'tell_him', label: 'Tell him what you can see' },
        { id: 'walk_out', label: 'Walk out and let him wonder' },
      ],
    },
    {
      id: 'appearance',
      label: 'What does he see across the music room?',
      kind: 'TEXT',
      advanced: true,
      maxLength: 200,
      placeholder: 'e.g. Ink on my cuff, hair coming down, and the Queen’s grey silk, which suits nobody.',
    },
  ],
  /**
   * Where this can end up. Eleven, every rarity, and four of them are losses
   * that are not written as punishments: dismissed like the harpist, the
   * number falling because she used it, the betrothal sealed with the number
   * unmoved, and walking out alone. "The Coach at Dawn" is reachable from
   * about a fifth of the way in. Only "Small Mercies" needs the fountain.
   */
  endings: [
    {
      id: 'end_out_loud',
      name: 'Out Loud',
      rarity: 'COMMON',
      minTurn: 30,
      requires: {
        flagsSet: ['he_said_it'],
        flagsUnset: ['rite_sealed', 'chose_bastien', 'he_found_out', 'ran_with_him', 'dismissed'],
        minRelationship: [{ characterId: 'aldric', dimension: 'trust', value: 60 }],
      },
      condition:
        'He said it, to her face, in his own words, and the window went out. That is the whole event and it should be written as one: the frame of light gone mid-sentence, and the player looking at an ordinary man for the first time. The crown, the debt and his mother are all still there and unsolved. What has changed is that they will face them with nothing hidden between them.',
      epilogue:
        'For a week she keeps glancing above his head out of habit, and he notices, and asks, and she tells him, and he is mortified all over again. He starts saying it at breakfast to make a point. Nobody at court can work out why the crown prince has started using contractions.',
      hint: 'The window closes the first time he says it himself.',
    },
    {
      id: 'end_ninety_seven_forever',
      name: 'Ninety-Seven, Forever',
      rarity: 'COMMON',
      minTurn: 35,
      requires: {
        flagsSet: ['rite_sealed'],
        flagsUnset: ['he_said_it', 'chose_bastien', 'dismissed', 'ran_with_him'],
      },
      condition:
        'The betrothal was sealed and he never said it. The player stays at court attending the new princess, and the number over his head stays where it has always been. This is a sad ending and a grown-up one: two people who chose duty, one of them able to see exactly what it cost. Do not make him cruel and do not make her bitter.',
      epilogue:
        'Viola is a better princess than anybody expected and a kind employer. The books of northern poetry stop appearing on the window seat, and then, a year later, one more does. The number has not moved in months. Some days she is grateful she can see it, and some days she would give anything not to.',
      hint: '',
    },
    {
      id: 'end_sent_home',
      name: 'Sent Home Like the Last One',
      rarity: 'COMMON',
      minTurn: 20,
      requires: { flagsSet: ['dismissed'] },
      condition:
        'The player was put out of the palace: a comb in her trunk, a scene in the chapel, or telling the court she can see numbers over the prince’s head. Write it as what it is, the court doing to her what it did to Maren Lisle, and let the number over his head, the last time she sees it, say what it says.',
      epilogue:
        'The carriage leaves from the postern gate at dawn with no reference. In the lower town a woman with a harp has been expecting this and has the kettle on. Every second month, unsigned letters start arriving at two doors on Lantern Street instead of one.',
      hint: '',
    },
    {
      id: 'end_no_number',
      name: 'No Number Over His Head',
      rarity: 'UNCOMMON',
      minTurn: 30,
      requires: { flagsSet: ['chose_bastien'], flagsUnset: ['dismissed'] },
      condition:
        'She chose Sir Bastien, the man whose feelings she cannot see, on his word. It must never read as second prize. Its whole meaning is trust without proof: she knew exactly what the prince felt and chose somebody she had to believe. Aldric takes it with perfect courtesy, and the number tells her what that cost him.',
      epilogue:
        'Bastien still tells her stories instead of answering, and she has learned where the answer is in the mule. Aldric is the first to toast them and the first to leave. There is still a frame of light over his head when she sees him at court, and she has stopped looking at it.',
      hint: '',
    },
    {
      id: 'end_the_coach_at_dawn',
      name: 'The Coach at Dawn',
      rarity: 'UNCOMMON',
      minTurn: 18,
      requires: { flagsSet: ['left_the_map'], flagsUnset: ['ran_with_him'] },
      condition:
        'The player walked out of the palace on her own and did not come back, leaving the window, the prince, the Queen and the debt behind. It is a complete and reasonable answer to being told you are despised by a man who loves you, and it costs him most. Do not punish it and do not redeem it.',
      epilogue:
        'She takes the morning coach from the lower town with one trunk. The last time she looks back up the hill, the number is too far away to read. At the Rose Ball next year a lady asks the crown prince why he never dances, and he says he never learned how.',
      hint: '',
    },
    {
      id: 'end_the_number_falls',
      name: 'The Number Falls',
      rarity: 'UNCOMMON',
      minTurn: 25,
      requires: { flagsSet: ['he_found_out'], flagsUnset: ['dismissed'] },
      condition:
        'He worked out that she had been using the number to steer him, saying the right thing at the right moment on purpose, and he knew it. Write the fall honestly and let her watch it on the window, a few points at a time. Flirting was never the problem. Seeing him and using it was.',
      epilogue:
        'The number settles in the forties and stays there. He is perfectly polite to her for the rest of the fortnight and never once cruel, which is how she knows. The poetry books stop. At Midsummer he gives his word in a clear voice, and the number does not move.',
      hint: '',
    },
    {
      id: 'end_midsummer_upset',
      name: 'The Midsummer Upset',
      rarity: 'RARE',
      minTurn: 40,
      requires: {
        flagsSet: ['rite_broken', 'debt_settled', 'he_said_it'],
        flagsUnset: ['ran_with_him', 'dismissed'],
        minFactionReputation: [{ factionId: 'faction_ashgrove', value: 20 }],
      },
      condition:
        'The betrothal ended in the Rose Chapel with Viola’s terms on the altar, the crown’s debt turned into a loan it can pay, and the crown prince saying in front of the whole court whom he would rather marry. Everybody got something they wanted and the Queen got the least. Write the chapel as a scene with a lot of people reacting at once.',
      epilogue:
        'Viola takes her seat on the Ashgrove board the following week and sends a basket of pears with a note that says only “paid in full”. The Queen is cold to the player for a month and then, one afternoon, asks her to tea. The window is long gone. He tells her anyway, most days, in case she has forgotten what it said.',
      hint: 'Viola has a price, and it is not you.',
    },
    {
      id: 'end_the_north_road',
      name: 'The North Road',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['ran_with_him'] },
      condition:
        'He said it, and then he left with her: out of the postern gate before the rite, the crown and the debt left to a cousin and a council. It is romantic and it is also a real loss to a real kingdom, and both of them know it. Write the road, the cold and the first inn, not the cheering.',
      epilogue:
        'They take the northern road because he knows every town on it and she can pronounce them. His cousin is crowned in the autumn and the Ashgroves renegotiate within a week. He teaches a garrison’s new recruits to read maps, is very bad at it, and has never been happier.',
      hint: '',
    },
    {
      id: 'end_ashgrove_accord',
      name: 'The Ashgrove Accord',
      rarity: 'RARE',
      minTurn: 35,
      requires: {
        flagsSet: ['viola_pact', 'debt_settled'],
        flagsUnset: ['he_said_it', 'dismissed'],
        minFactionReputation: [{ factionId: 'faction_ashgrove', value: 20 }],
      },
      condition:
        'She and Viola won without the prince ever saying it: the debt is a loan, the betrothal is quietly dissolved on Viola’s terms, and the player has been offered a desk at the Ashgrove bank. The romance is left open on purpose. This is a friendship ending and a career ending, and the number is still there whenever she visits court.',
      epilogue:
        'Viola makes her a clerk, then a secretary, then the person who reads every contract before Viola signs it. The crown prince comes to the bank twice a year about the loan and always asks for her by name. The number is ninety-nine on both visits, and he has still never said it.',
      hint: '',
    },
    {
      id: 'end_queens_left_hand',
      name: 'The Queen’s Left Hand',
      rarity: 'RARE',
      minTurn: 35,
      requires: { flagsSet: ['queen_protege'], flagsUnset: ['he_said_it', 'dismissed'] },
      condition:
        'She took the Queen’s side and the Queen’s protection, and learned how this court is really governed. She keeps the window and uses it as the Queen would: to know where the crown prince stands before he does. Write it as power that is real and lonely, and let the Queen be genuinely fond of her.',
      epilogue:
        'The Queen teaches her the household ledgers, then the council, then the old feuds nobody writes down. When the Queen’s heart gives out two winters later, she leaves the player her jewel book. Aldric, crowned and married, asks her opinion on everything except one thing.',
      hint: '',
    },
    {
      id: 'end_small_mercies',
      name: 'Small Mercies',
      rarity: 'UNIQUE',
      minTurn: 40,
      requires: { flagsSet: ['fountain_answered', 'wish_answered', 'knows:who_wished'] },
      condition:
        'She found the fountain, the coin and the grey line that reads [Wished for: this], and knows the window was his wish and never her gift. What she does with that is the ending: whether she tells him, what she wished for herself, and whether either of them minds that the palace’s oldest story knew before they did.',
      epilogue:
        'She tells him at the fountain. He goes the colour of the roses, says it is the most humiliating thing that has ever happened to him, and the number goes up by three. Whatever she wished for, she has never told anybody, including him, and she intends to keep it that way.',
      hint: 'Somebody climbed the garden wall the night before it started.',
    },
  ],
  opening:
    'The crown prince, Aldric, has sent everyone out of the music room except you, the newest of his mother’s ladies-in-waiting.\n\nHe doesn’t sit. He stands by the cold fireplace in black gloves, looking at you like an appointment he regrets.\n\n"I despise you," he says. "I want that understood before the ball tonight."\n\nSince this morning, a small frame of light has hung above his head. Nobody else can see it. You’ve checked.\n\n[Affection 97 ▲]\n\nThe arrow went up when he said it.\n\n"You will keep to the far end of the ballroom. You will not speak to me. You will not dance with me."\n\n[Affection 98 ▲]\n\nHis jaw sets. "Do you understand?"',
  openingPanel: {
    assetKey: 'story_affection_97/opening',
    alt: 'Crown Prince Aldric in a black coat and gloves stands by a cold fireplace in a blue music room, hands behind his back, a faint frame of light above his head.',
  },
  openingSuggestions: [
    '"Perfectly, Your Highness. May I ask what I did to earn it?"',
    'I curtsy, then take one step closer instead of back, and watch the number.',
    'I point at the air above his head. "Your Highness, there’s a number up there, and it just went up."',
  ],
  coverDirection: [
    'SUBJECT: Crown Prince Aldric, a cold and handsome royal heir, alone in the foreground of a key visual for a romance anime set at a royal court.',
    'He fills the frame from the waist up, close and slightly off-centre, turned three-quarters away with his chin raised, glancing sideways at the viewer with cool pale grey eyes and the faintest blush across his cheekbones.',
    'Short black hair, a long severe face, a black court coat with silver embroidery buttoned to the high collar, black gloves, gloved hands clasped behind his back.',
    'TITLE: the words AFFECTION: 97 painted into the art in the upper third, inside a floating translucent rectangular frame of pale lilac light that hovers just above his head, with a small glowing upward arrow after the number,',
    'spelled exactly AFFECTION: 97, large, crisp and legible at thumbnail size. No other text, letters or numbers anywhere.',
    'BEHIND HIM, soft and secondary: a candlelit palace ballroom hung with pale pink roses, crystal chandeliers glowing out of focus.',
    'LIGHT: warm candle gold on his face, a cool lilac glow from the frame above his head falling across his hair.',
  ].join(' '),
  publishedAt: null,
};

export const AFFECTION_97 = StoryVersion.parse(raw);

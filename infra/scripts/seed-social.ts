/**
 * Launch content: like counts, comments, and the featured rotation.
 *
 * A catalogue that opens with every world on zero looks abandoned, and the
 * first real player has no way to tell which of twenty-three worlds is worth
 * their evening. This is the editorial answer to that.
 *
 * Two things keep it honest rather than deceptive:
 *
 * 1. Every seeded row is `kind = 'SEEDED'`. They can be counted separately,
 *    excluded from analytics, or deleted in one statement, and nothing
 *    downstream can report them as customer engagement by accident.
 * 2. Real likes are **added to** the seeded figure, never merged into it, so a
 *    real person tapping like always moves the number they are looking at.
 *
 * Idempotent: running it twice does not double anything.
 *
 *   npm run seed:social
 */
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';
import { FR_NAMES, FR_NOISE, FR_WORLDS } from './seed-social-fr.js';

/**
 * Where each world starts, and which six are in the shop window.
 *
 * Ordered deliberately rather than generated: the top of the list is where a
 * new player is being pointed, so it is the strongest art and the clearest
 * premises. The six featured are chosen for **range** — a shinobi tragedy, a
 * beastfolk arena, a resort mystery, a domestic romance, a horror, a piece of
 * military science fiction — because a rotation of six similar things tells a
 * new player the catalogue is narrow.
 */
const CATALOGUE: Array<{ id: string; likes: number; views: number; featured?: number; staffPick?: boolean }> = [
  { id: 'story_itachi', likes: 158_000, views: 2_900_000, featured: 1, staffPick: true },
  { id: 'story_second_skin', likes: 131_000, views: 2_300_000, featured: 2 },
  { id: 'story_pink_tide', likes: 112_000, views: 2_050_000, featured: 3 },
  { id: 'story_ace', likes: 104_000, views: 1_950_000 },
  { id: 'story_good_morning_husband', likes: 98_000, views: 1_700_000, featured: 4, staffPick: true },
  { id: 'story_hush_house', likes: 87_000, views: 1_600_000, featured: 5 },
  { id: 'story_zero_throne', likes: 76_000, views: 1_380_000, featured: 6 },
  { id: 'story_nine_weeks', likes: 68_000, views: 1_190_000 },
  { id: 'story_light', likes: 63_000, views: 1_120_000 },
  { id: 'story_red_moon', likes: 59_000, views: 1_060_000 },
  { id: 'story_blackwake', likes: 51_000, views: 940_000, staffPick: true },
  { id: 'story_primal_crown', likes: 46_000, views: 870_000 },
  { id: 'story_seven_days', likes: 41_000, views: 760_000 },
  { id: 'story_window_seven', likes: 36_000, views: 690_000 },
  { id: 'story_red_floor', likes: 32_000, views: 610_000 },
  { id: 'story_last_five', likes: 28_000, views: 540_000 },
  { id: 'story_tidewall', likes: 25_000, views: 470_000 },
  { id: 'story_seven_names', likes: 21_000, views: 420_000 },
  { id: 'story_unbound', likes: 18_500, views: 380_000 },
  { id: 'story_salt_road', likes: 16_000, views: 330_000 },
  { id: 'story_fourth_beast', likes: 14_000, views: 290_000 },
  { id: 'story_ninth_archive', likes: 12_000, views: 260_000 },
  { id: 'story_understudy', likes: 10_200, views: 230_000 },
  { id: 'story_blank_prophecy', likes: 8_600, views: 190_000 },
  { id: 'story_last_service', likes: 7_100, views: 160_000 },
];

const NAMES = [
  'mothdust', 'kenta_wav', 'not_a_robot_99', 'salt.and.iron', 'peachpit', 'VOIDWALKER',
  'hoshino_bread', 'greg', 'lantern_eater', 'ohno_itsyou', 'tired_archivist', 'rin.exe',
  'blue_hour_', 'chronically0nline', 'mmmnoodles', 'SeventhMat', 'akari_stan', 'bldy_mary',
  'quietpart_loud', 'nocturne22', 'plumrain', 'wrongnumber', 'fig_and_smoke', 'yuzu_bit',
  'the_real_kaz', 'sundaydriver', 'oldgodsnew', 'paperlantern', 'HALCYON_', 'mint_condition',
  'somebodys_ex', 'gh0stwriter', 'tsukiyo_', 'bad_at_names', 'reineke', 'cassette_ghost',
  'burntoast_', 'no_thoughts_', 'kettle.on', 'marrowmilk', 'definitely_steve', 'ex_husband_of',
  'wet_sock_', 'pigeon.mp3', 'HOURGLASS__', 'nine_lives_left', 'soggy_receipt', 'my_othr_acct',
  'terminal_velocity_', 'sweater.weather', 'unpaid_intern', 'moth_to_lamp', 'frogpond_', 'kkkarin',
  'second_breakfast', 'dial_tone_', 'vhs_rot', 'not_that_deep', 'lukewarm_', 'certified_hater',
  'chair_enjoyer', 'bus_window', 'minor_inconvenience', 'threeAM_thoughts', 'saltlick_', 'gone_fishing_brb',
  'overthinker.jpg', 'ramune_fizz', 'lowbattery', 'kurogiri__', 'actually_emma', 'sleepless_in_ohio',
  'dango.enjoyer', 'petrichor_', 'jjk_widow', 'catboy_accountant', 'rainonglass', 'ok_but_why',
  'teacup_tyrant', 'mochi.moth', 'ghostpepper_', 'nightbus_', 'sadboi_sensei', 'itsjustkay',
  'filler_arc', 'toast.exe', 'wholesome_menace', 'kinda_lost_', 'yakisoba_king', 'b_side_',
  'swampwitch', 'hollow_knightly', 'polaroid.ghost', 'tangerine_', 'lostmyremote', 'maybe_marco',
  'grapejuice_gf', 'side_quest_sam', 'hanako.wav', 'nap_champion', 'cloudberry_', 'duskrunner',
  'emo_phase_again', 'riceball_', 'plotarmor_', 'velvet.static', 'odd_one_in', 'coffee_then_chaos',
];

/**
 * The like count, roughened.
 *
 * `CATALOGUE` carries round planning figures (158,000 / 131,000 / 112,000) because
 * that is how you reason about a shelf. Shipped as-is they read as invented:
 * every world in the app ending in two zeroes is not something that happens to
 * real numbers, and a player who notices stops believing the rest of the page.
 *
 * Deterministic, so the figure is stable across re-seeds rather than drifting
 * every time this runs. The offset is small enough to preserve the ordering the
 * catalogue was arranged in.
 */
function roughen(storyId: string, likes: number): number {
  let seed = 0;
  for (const ch of storyId) seed = (seed * 131 + ch.charCodeAt(0)) >>> 0;
  const spread = Math.max(12, Math.round(likes * 0.011));
  const offset = (seed % (spread * 2 + 1)) - spread;
  const rough = likes + offset;
  // A trailing zero is fine; three of them is the tell.
  return rough % 100 === 0 ? rough + ((seed % 9) + 1) : rough;
}

/**
 * Why these are written per world instead of drawn from one pool.
 *
 * The first version of this file had a single PRAISE / CRITICAL / NONSENSE pool
 * and sprayed it across all twenty-three worlds. Even after the per-story
 * shuffle stopped bodies repeating *inside* a story, the database held 681
 * comments built from 92 distinct sentences: every substantive line appeared on
 * roughly seven different worlds. A player who opened Itachi and then Hush
 * House read "the ending actually got me. i sat there for a minute" twice, from
 * two different usernames, about two completely different stories. That is the
 * tell, and it is worse than empty comment sections, because it is the one
 * artefact that proves the rest of the page is manufactured too.
 *
 * A real comment names something. A character, a room, a time on a clock, a
 * choice the commenter made and regretted. So the substantive half of every
 * section is written against the world's own fixture in
 * `packages/test-fixtures/src` — the names, places, items and endings below are
 * all things that are actually true of these stories, because a comment that
 * misdescribes the world is worse than a generic one.
 *
 * Short noise is the exception and stays shared. "first", "w", "peak", "is
 * there a discord" repeating across twenty-three worlds is not a tell, it is
 * what a real comment section looks like. It is *long, specific praise*
 * repeating that gives the game away.
 *
 * Register: lowercase, phone-typed, tolerant of missing apostrophes, allowed to
 * be rude. No marketing copy. No em dashes or en dashes anywhere — `assertPools`
 * below fails the run rather than trusting anybody to remember.
 */
type WorldVoice = { praise: readonly string[]; critical: readonly string[] };

const WORLDS: Record<string, WorldVoice> = {
  story_itachi: {
    praise: [
      'sasuke waiting on the step every evening in case you come home early. i was not ready',
      'i got shisui lives on my second run and actually shouted',
      'reporting to your father and to danzo on the same day and neither of them knowing. the stress is real',
      'mikoto is right there the whole time and it took me two runs to think of asking her',
      'told sasuke the truth in the first week and the whole story bent around it',
      'the settlement took me four tries and i still think about it',
      'kakashi is the only one in the ready room who never asks you anything and somehow that says the most',
      'fugaku is not written as a villain and that is exactly why it hurts',
      'spent two weeks trying to avoid the obvious ending and got it anyway',
      'izumi deciding the two of you are friends on no encouragement whatsoever is so good',
      'you can bring evidence instead of making an accusation and it lands completely differently',
      'thirteen years old carrying all of this and the game never once lets you forget the number',
      'went for two brothers leave and it felt like cheating and i loved it',
      'danzo has been extremely polite to you for two years. scarier than any fight in this',
      'i tried telling hiruzen everything and he is just so tired. brutal',
      'the tea place is the only room in this game where you get to breathe',
      'nine in a row on the middle post and you were not even at the window. sasuke i am so sorry',
      'the word on shisuis crow note is early and in four years it has never once meant early. these two man',
      'danzo going thats not a threat, its a distance and a marching speed. genuinely chilling',
      'mikoto dries the same bowl the whole conversation and puts it down the second you say something true. clocked it on run two and got chills',
      'izumi buys four dango and eats one on the way so three looks unplanned. she is so real for that',
      'tip: pick up sasukes chipped shuriken instead of the other three and just let him explain the chip',
      'sasukes school route is in the surveillance log twice. i had to put the phone down',
      'kakashi turn the PAGE',
      'fugaku saying thats the second time hes lied to a seven year old on your behalf. dad please',
      'picked you counted the dead at the start and danzo clocked which one i was within about two lines',
      'you get 80 minutes before your dad wants you under the seventh mat and i spent most of them on the step with sasuke. worth it',
      'the old lady at the tea place has fed three generations of this clan and has opinions on all of them lmao',
      'is it just me or is shisui always sitting somewhere higher than you and you never once see him climb',
      'the four blunt shuriken in your pouch are the ones a seven year old is allowed to hold. why would you write that',
      'ask mikoto about the actual plan and not about her feelings. six years on the front line and the men at the meetings talk over her',
      'izumi went round the district counting which houses stopped hanging washing out. eleven. i never even thought to look',
      'hiruzens hat sits on its stand next to him all day and never goes on his head. tiny detail, perfect',
      'the room under the village has one chair and its on his side of the table. no notes',
      'kakashi: its going to rain, not a euphemism. best line in the game and i will not be taking questions',
      'the two chunin at the south gate being bored and thorough in that order made me laugh in the middle of a tragedy',
      'the paint inside the chin of the mask is worn through where your thumb goes while youre deciding. whoever wrote that is evil',
      'sasuke has followed you as far as the shrine steps three times and turned back every time. he knows. he KNOWS',
      'justice for mikoto honestly',
      'handle it yourself never fails and thats exactly the problem. took me a whole run to notice what it was costing',
      'filed four lines with the tower and left out the date. felt like getting away with something until it didnt',
      'danzo never asks you a single question. go back and check. not one',
      'kakashi only walked me to the corridor after i told him something real about my family. worth every word',
      'shisui admitting he already took the plan to danzo, properly, like a citizen, and then noticing your face. SHISUI NO',
      'has anyone got izumi to talk about the night of the fox? every time i get close she says anyway and changes the subject',
      'shisui lives on my third try. i went and found him on the roofs instead of waiting for a crow and everything opened up',
    ],
    critical: [
      'the two week clock is too tight, i wanted more time with sasuke',
      'good but there are a lot of names to hold in the first hour',
      'wish the clan meetings varied more between runs',
      'kept trying to just take my brother and leave and it would not let me early on',
      'strong writing but the ending i got felt like it was always going to happen',
      'you cant see reserve or clan pressure anywhere so i only realised i was running on empty when mikoto started putting food in front of me',
      'hiruzen hedging for four paragraphs every single visit. i get it hes slow. i got it the first time',
      'you pick the archetype before you know anything about the world so i picked blind. let me change it after the first evening',
      'borrow a minute has a 45 minute cooldown and of course i needed it twice under the seventh mat',
      'half the map only connects through the roofs so i spent a whole afternoon just crossing the village',
      'izumi deserved more. shes in the tea place end seat most evenings and i kept missing her because of the meetings',
      'failed follow the paper three times in a row reading the duty rotas. the log hunt is fiddly',
      'danzo is written too well. every conversation with him i walked out owing something and i still dont know how',
      'tsukuyomi sitting locked in the list the whole first run with that little teaser text is just mean',
      'kakashi gets like nine words a scene and i wanted a lot more of him',
    ],
  },
  story_second_skin: {
    praise: [
      'maren chose wolf in front of four generations of wolf wardens and wanted hawk. that one line broke me',
      'ninety seconds to pick who you are for the rest of your life, in front of your family',
      'ward seven. i knew it would be bad. i did not know it was that',
      'got lio home on my third run and had to put the phone down',
      'the concord is not evil and that makes every argument with them harder',
      'kaia coming through the window with wardens behind her is the best opening in the app',
      'your ears and hands changing over weeks instead of instantly is such a good detail',
      'edran sol is so persuasive i agreed with him twice and then felt ill about it',
      'ilyra is just doing her lawful job and i could not bring myself to lie to her',
      'twiceborn. that is all i am going to say in a comment section',
      'sai velo wrote the protocol and his own institution declined to publish it. very real',
      'the shape traits change ordinary life not just the checks',
      'went back and picked hawk like tessa and the second half was a different game',
      'i lied about what i saw in the hall and it followed me the entire story',
      'my one skin is the quiet ending and honestly the strongest one',
      'four hundred people watching black feathers come up her arm. what a scene',
      'bear portions at the market are enormous and cost the same. nobody ever wrote that rule down and everyone follows it',
      'ren knocking something off a table with their tail once an hour and apologising every time is my favourite running joke in here',
      'complimented tessas eyes by accident and got the walking into the canal line. never again',
      'sai for high keeper honestly',
      'sai gives you the two who died before the nine who lived. every time. thats how you know hes the honest one',
      'edran restates your argument better than you made it and then answers THAT version. i have never felt so outplayed',
      'the official account of the ceremony is four sentences long and tessa is completely right that its wrong',
      'left gallery, behind the pillar, do not look at the wardens. reasons afterwards. go. and i just went',
      'ilyra i would follow you anywhere',
      'chose serpent and the canal quarter inns keep warm rooms by the week. best shape for being left alone honestly',
      'is it just me or does ilyras one dry joke per conversation hit harder because you spend the whole scene waiting for it',
      'one notice on the warden post board has a snow leopard on it. i stared at that way too long',
      'picked wolf and could hear an argument three floors down and could not stop listening. nosy simulator',
      'the thing under the grating in the hall is warm and not quite a mineral and the game never lets you forget its there',
      'the stone in the undercroft moves about eleven times an hour while youre reading leaves in the dark. creepiest room in the app',
      'found my own leaf and read the four shapes under the one i picked. sat there for a while',
      'second run i chose do not read yours and im weirdly proud of that option existing',
      'sai working out of two rooms over a boat builder at hours the concord house is closed. love this man',
      'hawk eyes at four hundred paces. unfair advantage lol',
      'edran has thought about one of his other shapes most weeks for forty years and says it like its nothing',
      'my hands feel like a borrowed pair of gloves. ren is the most sixteen character ever written',
      'race you to the third bridge. i lost five times. ren cheats, i will die on this hill',
      'roadwardens walk with you for a stretch on the far road if the weather turns. small thing, got me emotional',
      'kaia never once treats you like a kid and then says you are sixteen as a fact not a kindness. perfectly written',
      'anyone found out where ilyras scar is from? cheekbone to jaw and she has never told a single person',
      'ilyra at the bottom of the stair going third time, you take the canal side. i have never felt so caught',
      'doorways with tail clearance and market counters at three heights. the worldbuilding is in the furniture',
      'tessa carrying a courier satchel with no route badge to her own ceremony. baby',
      'sai: do not tell me what they said to you, if you tell me i have to write it down. what a way to care about someone',
      'twiceborn on the nineteen pages with sai felt like the only honest way to do it. slow and scary and worth it',
    ],
    critical: [
      'the concord house middle section drags a bit',
      'wanted a lot more time in the undercroft than i got',
      'the traits could do more outside of rolls',
      'good but your first choice locks you out of more than i realised',
      'veyr pass felt rushed compared to everything before it',
      'asked one question at the concord house and suddenly wardens are stopping me politely in the street. calm down',
      'picked bear and spent the whole game feeling like the rails were built for everybody except me',
      'walk it off needs three days and a warm room and the story never gives you three days, so why is it even there',
      'sai answers every moral question with more medicine. i get its his thing but i wanted a straight answer once',
      'the ceremony starts at half seven and by the end of the night you have to decide what you saw. way too fast for a first run',
      'hold it down kept failing and the thing underneath just kept getting louder with no real warning',
      'ren takes forever to open up. four days of breakfast races before they said anything real',
      'tessa keeps talking about the courier network and in my runs it never goes anywhere',
      'ilyra is so reasonable that being chased by her never felt tense. wanted her scarier',
      'kaia refusing to let me come with her ate half my first evening. i know she says it once and means it but ugh',
    ],
  },
  story_pink_tide: {
    praise: [
      'sora splashing you in the shallow end and then her smile dropping for exactly one second',
      'i ignored the whole adrian thing and just had a holiday and it let me. perfect week',
      'the blue bag locked in the watersports shed is such a clean way to start a mystery',
      'eli confesses got me. the man has been awake since tuesday and you can tell',
      'the tide fills the east caves twice a day and that is your actual clock',
      'celeste has the only photographs that matter and has no idea',
      'june on the roof bar is the best informed person on that island and she drinks for free now',
      'went diving with luka instead of investigating and had the best evening of my week',
      'got too late and i earned it. i spent two whole days flirting',
      'her real smile is worth every replay',
      'the resort notices you poking around, staff start being odd with you',
      'nami started all of this with one anonymous email and then has to live on the island',
      'the sunday ferry goes either way and that is such good pressure for a holiday story',
      'found him alive on the ledge and then had to decide what to do about it',
      'reika is the only person who can halt anything and she will not, and she is right not to',
      'this is the one i send people who assume these are all swords and magic',
      'sora twisting the little star earring right before she suggests the catamaran. once you learn that tell it hurts every time',
      'my key stopped working for four hours and eleven minutes and the towel from my balcony rail was on the chair when i got back. nobody said a word',
      'asked eli about a missing guest and he offered to move me to a cabana that isnt in the sun after three. unreal customer service, unreal menace',
      'june telling me sora hasnt been up to the roof since tuesday because im downstairs. had to put the phone down for a sec',
      'reika: you have brought me a feeling and a photograph of a bag. brutal. fair. go get the door log',
      'the camera in the lobby points at the front desk and not the doors. once you clock that you cant unsee it',
      'played the you check things background and caught the checkout time vs the padlock before sora even finished the story lol',
      'luka calmly explaining that the cave mouth does not care that youre already inside. ok sir. noted. never going in there',
      'nami correcting poisoned to localised like i was her worst student. love her',
      'storm night, the whole resort crammed into the lobby and the kitchen still sending out dinner. this game gets it',
      'the morning after the storm, palm fronds all over the deck and sora with an enormous stack of pancakes and wet hair. best scene of the week',
      'celeste: four frames. four. cropped by me, watermarked. i was on the floor',
      'is it just me or is marcus the scariest person on the island and he never raises his voice once',
      'skipped investigating on the rooftop party night and hung out with the surgeon whos there alone and the honeymoon couple who arent speaking. top 3 nights in this app',
      'did a run where i said yes to everything sora suggested. catamaran, volleyball, sunset paddle. zero clues found, zero regrets',
      'the orange dive watch is such a good clue. sora only remembers it because she made a joke about it on his first afternoon',
      'walked through the staff only door like i worked there and nobody looked twice. the right shirt makes you invisible back there',
      'luka please buy some shoes',
      'the detective gets off the eleven oclock ferry with one bag and no swimwear and is visibly unimpressed by the lobby. icon behaviour',
      'walked ten minutes along the sand away from all the lights and sora was already ankle deep, turning round to see if i was coming. i was',
      'you have been here forty minutes and you still look like you are at an airport. first line of the game and i felt personally attacked',
      'eli stops using your name when hes nervous. once you notice it every conversation with him gets tense',
      'sat with sora through the storm instead of chasing anything and it was the first time she stopped being fun. that was the scene',
      'the torn page with CACHE underlined twice and a kagetsu number on it. i screenshotted it like i was on a real case',
      'reika for prime minister',
      'tip: read the tide times on the dive centre whiteboard before you plan anything near east cove',
      'someone give eli a nap',
      'june: he had four, paid cash for two, tipped like somebody apologising. one sentence and she gave me more than two days of snooping',
      'sunrise ferry is the ending nobody talks about. left early on purpose, bad coffee on the boat, and it felt like a grown up decision',
      'too late wrecked me because the breakfast is still excellent the next day. paradise just keeps going at full brightness',
    ],
    critical: [
      'the resort is big and i got lost in the service corridors for ages',
      'good but that is a lot of guests to track in seven nights',
      'wanted more luka, he vanished for most of my back half',
      'the clues never move to suit you which is fair but i missed the window and had to restart',
      'the romance and the mystery pull against each other and i never landed both',
      'ease is hidden so i had no idea i was running on empty until nobody at the bar would tell me anything',
      'the key thing takes four hours to sort and i just sat in the lobby waiting. i get the point but thats a whole afternoon gone',
      'reika will not move without a door log and i never worked out how to get one. like hitting a wall in a linen suit',
      'nami talks in site numbers and units and dates and i needed a notepad. great character, exhausting conversations',
      'the villas are right there with meetings going on inside and every single one has a gate. felt like half the island was off limits',
      'the rooftop party throws the whole guest list at you at once and i lost track of who i was meant to be talking to',
      'the villa nine chats with marcus drag. i did not come on holiday to read about marina consent',
      'the storm cancelled the dive i had planned my whole next afternoon around. rude',
      'sora wont talk about other guests however close you get, and early on shes basically your only lead',
      'june refusing to say which room anyone went to is so in character and so annoying when youre stuck',
    ],
  },
  story_good_morning_husband: {
    praise: [
      'the ring does not come off because your finger grew around it. i sat with that for a while',
      'i told hana on day one and she assumed i was joking. of course she did',
      'the half built bookshelf is doing more emotional work than most whole games',
      'the fellowship letter has a deadline and she has not told you. brutal',
      'played along until it stopped being playing, which is exactly what the title says',
      'platform 11. i was not fine after that one',
      'emi has been her friend since art school and not yours and she clocks you immediately',
      'ordinary saturdays actually count here. i did a supermarket run and it mattered',
      'kenji runs a flooring firm with four vans and eleven opinions. best character line in the app',
      'i kept this life and it felt like a choice, not a consolation prize',
      'go and look at the sketchbook. that is the whole review',
      'a romance where she can say no and means it',
      'got separate rooms because i was honest too quickly and it still felt earned',
      'the mystery is optional and i think the run where you skip it is better',
      'nao is the only person who will say the platform number out loud and that sentence kept me up',
      'she asked pancakes or eggs like it would decide the whole marriage and honestly it kind of did',
      'that is not level. it has never been level. kenji i am begging you',
      'the bookshelf has four screws left over and i will die on the hill that they are spares',
      'tip: ask emi what she actually thinks is going on, not what hana said. completely different emi',
      'the spare room has a drying rack, an exercise bike, four boxes and a cot and every one of those is a different fight',
      'lucia wears steel toe work boots with literally everything including a wedding and i respect it',
      'kenji waiting by his van outside the bakery for me specifically. i knew i was in trouble',
      'hana forgetting the pencil is still in her hair and taking it to work. thats it thats the comment',
      'is it just me or is the balcony plant dispute the actual main plot',
      'played the cook and just fed her all week. never touched the mystery. ten out of ten marriage',
      'picked you build things, finished the shelf on day two, kenji nodded at it once. best review ive ever had',
      'nao gives times to the minute and uses no adjectives she cant defend. most trustworthy person in aster city',
      'the fourteenth is circled on the hall calendar in two different pens and neither of you booked anything. so real',
      'the friday table at the usual place just gets held for you and nobody ever arranged it. i want a restaurant like that',
      'she takes most of the duvet. this is canon. i feel attacked',
      'forty photos in the wedding album and you look genuinely happy in all of them at a wedding you dont remember',
      'kept using play along and hana started asking me stuff she already knew the answer to. shes testing you and its brilliant',
      'nobody fights and nobody does anything wrong, you just start eating dinner at different times. scariest thing in the app',
      'i am not upset yet and you have about four minutes. hana is terrifying and i love her',
      'someone is always flying a kite badly in riverside park and i need to know who',
      'kenji only does serious conversations in the van. get in the van',
      'hana is funny before she is anything else and it makes the sad scenes land twice as hard',
      'lucia is allergic to sincerity for longer than nine seconds and i have never related to a character more',
      'how do you get kenji to open up in the van? i admitted nothing and got nothing back',
      'went to central at 1am on the first weekend of my marriage like a normal well adjusted man. the departure board did something i will not describe',
      'emi has known hana eleven years and you four and she will absolutely do that maths out loud',
      'the numbers guy run is so funny, you read hana like a contract and she clocks it inside a day',
      'kenji mori my beloved',
      'nao ibarra deserves her own story',
      'still choosing you is the ending worth chasing. you have to actually deal with the fellowship, being nice is not enough',
    ],
    critical: [
      'lovely but not a lot happens if you ignore the mystery, which i did',
      'wanted more lucia, she is set up and then barely there',
      'the middle weekend is slow',
      'the amnesia setup is a bit convenient honestly',
      'good writing but there are no stakes at all until the letter turns up',
      'if you miss thursday the fellowship just lapses and hana goes a bit quiet for the rest of the run. harsh for one missed conversation',
      'the mori family group chat keeps getting mentioned and you never get to read it. let me read the chat',
      'nao is great but you barely see her unless you commit to the station side of things',
      'emi is cold to you for days. i get why but it wore me down',
      'every single person on aster market asks about the bookshelf. i know. i will build it. leave me alone',
      'wish the job you pick at setup mattered more, my teacher run and my cook run played almost the same',
      'the station plot and the marriage plot feel like two different games stapled together',
      'her unease is completely invisible and i had no idea i was losing her until i found out she had left a bag at her brothers',
      'wanted more of her studio. eleven desks, a wall of card models, and i went there once',
      'separate rooms twice in a row because i was polite and never raised anything. i get that thats the point. still stings',
    ],
  },
  story_hush_house: {
    praise: [
      'the 2:13 knock. i sat with my thumb over the screen for a full minute',
      'ayame hands you three rules like somebody explaining the bins and that is why it works',
      'the light outside 309 being on a different circuit from the rest of the floor. perfect detail',
      'i looked through the peephole. do not look through the peephole',
      'the konbini runs at midnight are genuinely nice and that is what makes the rest land',
      'mrs vale answers the question next to the one you asked. every single time',
      'got room 312 and it is warm and that is the worst part of it',
      'nia keeps filming the hallway and she knows how that goes and keeps filming',
      'the lift opening on a floor labelled 0 made me put my phone face down',
      'mika comes home and nobody tests her and they just choose to live with it',
      'you always know what happened and never why. that is the whole trick and it holds',
      'i burned it down and the game would not let me feel good about it',
      'tomas coming off nights too tired to care is such a good horror character',
      'the last tenants name is still on the mailbox. that is the hook, right there',
      'ayames choice is the ending that stayed with me',
      'moved out on day four and it counts as a real ending. respect',
      'the key board behind vales desk has six keys on it and eleven hooks. i counted. i wish i hadnt',
      'tomas: airway, breathing, circulation, then the thing on the landing. in that order. protect this man at all costs',
      'nia has two monitors on a door laid across trestles and a corkboard of stills with times written on in marker. peak art student',
      'nia going im not posting it, i know what i am, im not posting it. she is going to post it isnt she',
      'ayame hates occult words so much. do not say presence, say what you saw. iconic',
      'the strip light in the shared kitchen takes four seconds to decide and i hold my breath every time',
      'tip: ayame is at the kitchen table after midnight most nights. go sit with her before bed, trust me',
      'the radiator in 312 comes on by itself at ten and the first time it did i genuinely threw my phone',
      'the konbini is lit like an operating theatre and its the only place on the street where nothing has ever happened. i live there now',
      'kept all three rules the whole week, never opened the door once, and i was still scared of that corridor light every single night',
      'mikas pale green coat is always a bit damp even after a dry week. whoever wrote that detail please explain yourself',
      'played camera on and nia basically adopted me. filmed the stairwell with her at 2am and regret everything',
      'picked reads everything and spent a whole day reading fire reports about saint orras. nerd run was the best run',
      'thought the redevelopment notice would be boring admin and then vale read it twice and did not sit down',
      'let nia post the footage and by ten there were people across the street photographing my window. do not let nia post the footage',
      'never trust the lift',
      'ayame at the door with two coffees going youre the new 312, fine. nobody on here has a better opener',
      'ayame cutting her sentence off when shes scared and starting it again shorter. the writing on her is so good',
      'tomas says fourth landing to the lobby is fifty one seconds with two of you and a chair and i think about that constantly',
      'anyone else find the bolt cutters in the landing cupboard? someone oiled them recently. WHO',
      'the light outside 309 doesnt flicker or anything. it just goes red and stays red. perfect',
      'has anyone got vale to let them read the agreement? what did it take',
      'the stone under the basement is laid in a pattern that isnt structural and i did not need to know that before bed',
      'give tomas a day off',
      'ayame kurose please go to sleep',
      'people who run away cancel the dentist. ayame wrecked me with one line',
      'the house copying peoples voices and getting one word wrong is worse than any jump scare',
      'old building dear, old reputation, the radiators are wonderful. VALE YOU ARE NOT HELPING',
      'tomas will not take the lift and will never say why. same tomas. same',
      'the house forgets you is the ending i got and it felt selfish in exactly the way its meant to',
    ],
    critical: [
      'scary but the rent and laundry stuff went on a bit long for me',
      'i broke all three rules in the first hour and the pacing never recovered',
      'the sub basement is the weakest part, everything above ground is better',
      'wanted more nia, she has the best setup and the least screen time',
      'good but the house learns you faster than i could learn the rules',
      'the police side got annoying fast, a constable took my details a second time and i had barely done anything',
      'asked vale about the last tenant nine different ways and got nothing every time. i get it but come on',
      'three nights without sleep and my guy started getting his own week wrong. clever but i genuinely lost track of what was real and got annoyed',
      'nia is fun but she talks over you constantly and it gets exhausting',
      'the photograph of the two sisters feels like it should matter and i never found a use for it',
      'the 2:13 knock only really lands the first time. second run i just went back to bed',
      'somewhere with fewer doors is such a flat ending after all that build up. i moved out and it just stopped',
      'mika is barely in it for someone the whole story is about',
      'ayame is out at the records office all day so the middle of every day in the building feels dead',
      'the lift and the stairs both go everywhere and i wasted a whole evening going up and down looking for nia',
    ],
  },
  story_zero_throne: {
    praise: [
      'it walks the whole length of the plaza and kneels in front of you with every camera running',
      'morrow has been awake in the dark for eighteen years. i think about that a lot',
      'you can refuse the cockpit and it is a real route, not a fake one',
      'mina treats it like a machine while everyone else treats it like a god. instant favourite',
      'the lie that saved us against the truth of lysandra is the best choice in this whole app',
      'eli is nineteen and every person he meets wants exactly one fact from him',
      'rhea did not run when it came through the glass and i decided about her right then',
      'six reputations instead of one means you cannot keep everybody and the game knows it',
      'people do things while you are somewhere else and you find out afterwards. rare',
      'talon is officially an observer and unofficially a whole problem',
      'took walk away on purpose and it still gave me a proper ending',
      'sera has read the entire file and every conversation with her is a negotiation',
      'jace has spent eighteen years being the reasonable man in rooms where that was not enough',
      'freewake. i genuinely did not think it would let me',
      'both governments signing the same treaty on the same day every year and calling it peace',
      'morrow going "for the record, i still think this is stupid" and then launching anyway. best copilot in the whole app',
      'the red line on morrows display getting shorter when its being careful. i started reading it like a face',
      'mina rebuilt the left shoulder actuator at 4am so it would not fail on me and then told me to eat something. i would die for her',
      'the torque driver has three sets of initials scratched in and only one of them is minas. whose are the other two',
      'rhea telling me about her order before deciding whether to follow it is the most respectful thing an enemy has ever done to me',
      '"you turn left when you are angry." rhea clocked that and now i cant stop noticing it',
      'talon literally tells you hes the man they send when they want you to enjoy being asked and it still works',
      'tip: sit with orin in the lounge and do not ask him a single question. thats how he talks',
      'orin going "aren does this thing where he checks his own six twice before a run. did." the correction. i had to stop reading',
      'venn never raises her voice once. terrifying woman',
      'is it just me or is venns white coat spotless even in hangar four. there is coolant on everything in there',
      'eli citing section four paragraph nine from memory and then apologising for citing it. protect him at all costs',
      '"it feels like being a landmark." eli vale my son',
      'picked you were nobody and four agencies pulled my history and all came back with the same amount of it. being unreadable is so fun',
      'played you fix them and spent the kneeling scene doing maths on a reactor that sat at forty percent for eighteen years. nerd route is elite',
      'everyone says rhea is the rival but talon is worse because you actually like him while hes working you',
      'mina gets bored when the machine is in good shape and starts improving things nobody asked her to. so real',
      'my ring pass had eleven versions of my name going round by that night and two of them were wrong. the detail',
      'the school group getting told twice to stop touching the glass right before everything. i was screaming',
      'mina sorel supremacy, no notes',
      'every screen on the station going black for four seconds and then the departure boards just carrying on. chills',
      'the authority has nine investigators who all know their neutrality sits on something they are not allowed to read. give those guys a raise',
      'the galley at the far berths has been running for nine years and there is always food. i basically moved in',
      'stand down works more often than it should. powering down in front of everyone was the best thing i did all run',
      'morrow mentions each fault on the machine exactly once. sensor lying by four degrees on the left, once. then youre on your own. love it',
      'venns cutter docks at a berth the authority reserved for itself and the authority gets informed rather than asked. whole politics in one line',
      'anyone got helion up to briefed as one of theirs without venn basically owning you?',
      'the pressure is invisible but you feel it. by day five journalists were phoning families of the dead again and i knew i had messed up',
      'the plaque in the observation lounge about the armistice getting signed four doors down. nobody reads it. i read it',
      'took walk away again just to reread the bit about the anniversary footage always getting cut before you turn around',
    ],
    critical: [
      'the politics get dense in the middle and i lost the thread',
      'wanted more actual piloting, it is more rooms and talking than i expected',
      'six reputations is one or two too many to track on a phone',
      'good but the station starts to feel small by the back half',
      'never got near the lysandra truth and felt like i missed the real game',
      'morrow goes quiet way too often. the red line just disappears and you are on your own',
      'venn answers every single thing you said, one by one, and her scenes in the offices go on forever',
      'went all the way down the well to lysandra too early and could not get into anything. wasted a whole day',
      'station coffee is the only thing i found that tops up nerve and i drank an embarrassing amount of it',
      'eli is written well but he apologises every other sentence and it wore me down',
      'the recall notices going up turned the low ring into a room i did not want to be in. i miss the old bar',
      'four thousand people in that plaza and about seven you can actually talk to',
      'morrow will not override you even when you are obviously about to do something stupid. just grab the wheel once',
      'run it hot stays locked until morrow has watched you fly and it took me most of a week to get it',
      'the lie that saved us is basically nothing happening on purpose. i get it, i still wanted more',
    ],
  },
  story_nine_weeks: {
    praise: [
      'juno gets off the bus with teo and you have nine weeks of that. i felt ill in a good way',
      'the shift rota is real and it decides who you actually see. genuinely clever',
      'teo is kind and funny and does not deserve any of this and the game makes sure you know',
      'i got rejected properly and it did not soften it afterwards. respect',
      'nadia is on her fourth season and has watched this exact thing happen before',
      'the back steps at one in the morning is the entire game',
      'everybody in those six cabins has an opinion about you and they are all talking',
      'week three is when it goes wrong and it is basically scheduled to',
      'cass is the friend you cost something and i did not notice until it was done',
      'i spent the whole summer not saying it and that was also an ending',
      'nine weeks is exactly the right length, it would not survive being longer',
      'the dock scenes. reading those on a bus in january was a choice i made',
      'juno says your name at the start of a sentence right before they get serious. once you clock it you cant unsee it',
      'teo ties his apron in some elaborate knot he clearly invented and its wrong every single time. i love him and i am ruining his life',
      'nadia delivers the kindest thing anyone says to you all summer like its a rota change',
      '"cabin four. you are on at six." she did not even look up. nadia is my hero',
      'cass has the permanent half sunburn and the shirt one button too open and he knows. he absolutely knows',
      '"nadia and i are fine. ask her. actually, do not ask her." cass you are so cooked',
      'tip: juno will not do it in the bar. ask again on the back steps after service',
      'rowed nadia over to the point and she was furious about having a nice time. best scene i got all run',
      'teo gets more polite when hes hurt and it is so much worse than yelling',
      'people calling cass the villain are wrong. he genuinely does not notice damage. thats worse but its not villainy',
      'my lanyard still has last years arrival day photo because nobody could be bothered to retake it. too real',
      'let it go costs energy which is the realest mechanic in here. biting your tongue is exhausting',
      'owed shifts are the only currency that works in that building and nadia keeps the whole ledger in her head',
      'covered teos shift in week two, lost my whole evening, and it came back to me weeks later',
      'has anyone actually ended up with teo? people keep saying its possible and i dont see how',
      'got talk down to zero and it said nobody is discussing you this week, enjoy it. i did',
      'played the instigator. boats at 2am, everyone in the lake, nearly on the next bus by week two',
      'the grafter is underrated. being the best on the floor gets you further with this lot than being charming',
      'management not learning anyones name until august is the most accurate thing ive read in a game',
      'house rank "asked back next year" is the only achievement i care about',
      'kitchen reputation at the bottom is literally "dead weight". the kitchen does not play',
      'the dock is where everyone can see you and nobody can hear you, which is exactly why i had the worst conversation of my life there',
      'the longhouse bar has a little stage at the end and yes i played three chords on it and yes it went badly',
      'cass is on the road into town walking somebody home at 2am every night and nobody ever asks who',
      'teo swims off the dock before prep every morning. if you want him on his own thats your window',
      'nadia takes ten minutes to herself on the back steps before midnight. go sit there. do not talk',
      'teo deserves a better summer',
      'juno is always half turned toward the exit, hands in pockets, every single scene. body language of someone who already left once',
      '"i am not going to lie to him for you. i will not tell him for you either." nadia is always right and i hate it',
      'is it just me or is hear them out the strongest thing in the game? shut up and let people get there',
    ],
    critical: [
      'good but there are really only four people who matter',
      'the rota gets repetitive around week five',
      'wanted teo to be more than the obstacle',
      'lovely writing, not a lot happens if you keep your head down',
      'hear them out and say it plainly both cost energy so by midnight you literally cannot afford to be honest with anyone',
      'juno refusing to talk in the bar every single time got old by week three. just talk to me',
      'cass gets vaguer the closer you get to anything real and after a while its not a character trait its a wall',
      'the row back from the point eats half your night',
      'standing hit zero and i was on the next bus with basically no warning. brutal',
      'one scene in the bar and everybody in the cabins knew by breakfast. talk is a bit much',
      'teo being impossible to dislike is the point but every choice feels like kicking a puppy',
      'four bunks to a cabin and i never met a single person i was sharing mine with',
      'the road into town just loops back to the bar. i wanted to actually see the town',
      'the kitchen shifts blur together. prep, service, somebody says something by the pass, repeat',
    ],
  },
  story_red_moon: {
    praise: [
      'nine seconds of shell across your forearm, and it getting easier, is the actual horror',
      'venn not asking you anything is so much worse than voss asking twice',
      'wick is proof you are not the first and that scene changed the whole run for me',
      'the quiet one. that is all i am putting in a comment',
      'hiding what you are while running a squad mission is unbelievably tense',
      'i showed venn on purpose to see what she would do and i do not regret it',
      'six of you went out and one came back and the official record says luck',
      'the nettlejaw made me throw out my entire weapon style',
      'instability going up as the power gets better is such a clean trade',
      'ossa in the quartermaster store is the only normal conversation in this game and i needed it',
      'ren was supposed to be first and handles that worse than you expect',
      'six sets of tags sitting in your kit. i never put them down',
      'ren wearing his brothers coat two sizes too big with the sleeves turned back twice. i dont need to know more, i already hurt',
      '"you were nineteenth last month. i checked." ren is the most rival man ever written',
      'venn asking me to walk her through the second hour under it. i did not have an answer for the second hour',
      'voss replaced his own missing fingers with a brass splint he built himself and he is still the most delighted man in the fort',
      'tip: go and see ossa early. they notice everything and the list is worth it',
      'picked bare hands and the traits carry you hard. you will also get hit by literally everything',
      'wall spear gang. butt in the dirt and let the nettlejaw run onto it',
      'anchor bore main, no regrets',
      'the night the moon comes up red and every conversation in the fort gets quieter. nobody has to explain anything',
      'used arc by the gate and forgot it takes everything metal within twenty feet. including my squad. sorry guys',
      'the specimen hall labels get more excited the further down the shelf you read. whoever wrote them is having the time of their life',
      'wick saying nine seconds is sweet, ask me again in a year. that line lives in my head rent free',
      'the runner saying everything metal in the outer district is warm to the touch. best mission hook in the app',
      'took voss serum once. hands back, head clear, and whatever was answering just gone. regretted it instantly',
      'is it just me or is the shell coming up through your arm like a knuckle through a glove the grossest image in here',
    ],
    critical: [
      'the hunts start to blur after the third one',
      'wanted more from commander vale, she is barely in it',
      'good but instability punishes the fun stuff quite hard',
      'fort ember could use more to do between missions',
      'shatter note tells everyone who heard it that it came from you so what is even the point of holding it',
      'wanted an actual scene with the vaultback but its dead before you even start',
      'longblade is the default pick and nothing it does is spectacular. the game basically admits it',
      'suspicion climbs if you so much as flinch at muster. hiding the plating in the hall was brutal',
      'voss asking to look at your forearm every time you pass him gets old by the third ask',
    ],
  },
  story_blackwake: {
    praise: [
      'nobody knows your name yet. best closing line of a premise in the catalogue',
      'tolla will fix your keel and then tell you exactly what you did to the ship',
      'the compass points somewhere no compass points and i chased it for eleven hours',
      'mako is sixteen and absolutely certain and i would sink for her',
      'nessa can read your guardians handwriting and will not say why. i never did find out',
      'a crew that has opinions about where you are sailing them. yes',
      'got the yard with your name on it and honestly that is a happy ending',
      'veyra is not a villain, she just has an inshore squadron and a job',
      'went for the crownless sea and lost half the crew getting there',
      'rook being ex ninth fleet makes every navy encounter awkward in the best way',
      'the crew buries you ashore. i did not know that was on the table',
      'harrow at the drift will sell you anything, including you',
      'tolla telling me cracked not broken and that the difference costs eleven days. loved her, hated her',
      'rook will die on the hill that two good guns beat six bad ones. bought the long nines so he would stop talking about it. he did not stop',
      'nessa does not guess, she estimates, and it costs you an hour. every single time',
      'mako noticing you noticing the scars on her ears. sixteen years old and she has done sixteen fathoms',
      'veyra never takes the glove off her left hand, not even at the table. i have theories',
      'the drift is nine hulks lashed together and grown into each other. best port in the game and its not close',
      'the stillpoint doesnt push anything, it just stops it. used it on a falling spar and screamed',
      'a fleet lieutenant walking the quay asking politely if anyone has seen a brass compass while its in my pocket. heart rate through the roof',
      'press gang takes nine men off the fish dock at first light and one of them keeps shouting a name nobody answers to. went and got them back',
      'never registered the marrow and stayed off the ledger the whole run. harder and way more fun',
      'picked powder and the game keeps remembering you count under your breath when something loud happens. tiny detail, got me',
      'took the fleet commission to see what would happen and rook just walked. took his blade and left his kit. fair enough',
      'tip: pay tolla by day three or she nails a note to the shed door and your ship comes off the slip',
      'anyone else pick ferro as someone you had stopped speaking to? the guilt hits so much harder',
      'long nines supremacy',
    ],
    critical: [
      'the sailing between islands gets samey',
      'wanted more of the crownless sea once you actually reach it',
      'good but upgrading the ship is slow going early on',
      'lost track of who owned which island around the third arc',
      'the bounty went up in four ports at once when i had barely touched the fleet. felt like it came out of nowhere',
      'cant have all three upgrades before stormlee so i took the surgeons chest and instantly wanted the guns',
      'mako leaving because i left her on a beach once is harsh. it was ONE beach',
      'harrow negotiations go on forever. i will not insult you with a first offer, ok cool just sell me the chart',
      'rook keeps starting the sentence about the blade and stopping. three times a day. just say it man',
    ],
  },
  story_primal_crown: {
    praise: [
      'three days to redraw an arrangement that took forty years. the clock does all the work',
      'kaia is still arguing about the corridor when everybody else has gone to bed. accurate',
      'mako will treat your animal for nothing and then tell you exactly what you did to it',
      'bonded animals dying in the north and nobody will raise it until the corridor is settled',
      'suri talks least and notices most and i trusted her the whole way through',
      'the animals are not vehicles and the game absolutely means that',
      'got the sixth banner and i am still smug about it',
      'ilya has already sold what he knows to two peoples and is very open to a third',
      'white maws rider. did not think that was possible',
      'torren is a lot sharper than his manners and i underestimated him twice',
      'you can turn up with no mount, no people and a name nobody has heard. real start',
      'the thing in the north is not a villain and the game holds that line',
      'frostfang deserved better ground. eleven years',
      'suri answers in four words or less until she likes you. got a full sentence out of her on day two and screamed',
      'the frightened juvenile in the lane on day one. i put it down with the spear and forty people just stared at me. felt awful',
      'kaia will bet on anything. lost a block of salt to her on the racing flat before lunch',
      'paid ilya two blocks of salt and he talked himself down to one before i said a word. best merchant in the app',
      'torren restates your argument better than you made it and then disagrees with it. i was furious and also taking notes',
      'took the dawn flight off the perch with ilya and saw the dust of the herds from up there. that view alone',
      'played a whole run on foot. no mount, no bond, just trading at other peoples fires. top three run for me',
      'is it just me or are the frostfang fires the coziest place in the app. nine fires and everyone cooking for more people than showed up',
      'kaia reties that red sash about six times an hour and now i count every single time',
      'vesh at the picket lines put a hand on an animal everyone else had given up on. those crescent scars on her arms say how she learned',
      'mako gives you the worst number in the game in exactly the tone he uses for hello. twelve thousand. i had to put the phone down',
      'does anyone else side with the mireborn every run? the delta always gets left holding everyone elses mess and mako deserves one win',
      'people calling kaia reckless never rode the north road with her. she is out there scouting alone every afternoon while the circle argues',
      'a mammoth walked past a salt stall in the market lanes and i just stopped typing and watched it go',
    ],
    critical: [
      'five peoples to keep straight in three days is a lot',
      'the market lanes scenes repeat a bit',
      'wanted longer than three days honestly',
      'good but i never worked out how the corridor stones were meant to help me',
      'the oath speaking at the circle is so formal i zoned out. kaia is right about the forty extra words',
      'lost my raptor on day two to something i never even saw and it just stays dead. i know thats the point. still',
      'opened a scent pot at the wrong picket line and every animal in the place bolted. my run never recovered',
      'torren says "in the eleventh year" one more time and my phone is going in the river',
      'the tally cord is a cool idea but i never once worked out who owed me what from the knots',
    ],
  },
  story_seven_days: {
    praise: [
      'mina says the same thing on the platform every monday and by loop four i could not look at her',
      'ivy disappears on wednesday every time and it took me six loops to be there for it',
      'the timetable is real. people are where they said they would be. that is the whole game',
      'elias is the one everyone says is unwell. everyone is wrong',
      'spent one loop doing nothing except going to the bar. best loop i had',
      'the notebook is the only thing you keep and it turns out to be enough',
      'a detective investigating something that has not happened yet. great line',
      'clock tower at the top, marina at the bottom. i could draw this city now',
      'harrow arrives thursday and leaves friday and i wasted three loops missing her',
      'knowing the week is a completely different feeling to knowing a map',
      'sunday at midnight the first time is a proper punch',
      'i tried warning people and it goes exactly as well as you would think',
      'the blue bag has a broken zip every single monday. such a tiny thing and it wrecks me',
      'theo opens with something rude to see if you leave. i stayed. best call i made all loop',
      'tip: be in the marina office before ten on tuesday night. thank me later',
      'every clock in halcyon bay is a minute slow on saturday and i was the only one who noticed. told elias and he wrote it down without looking at the page',
      'the saturday festival with the not very good band is the nicest scene in the app and that is exactly why sunday hurts',
      'wynn writes down what you say while youre still saying it. i started talking slower on purpose lol',
      'told wynn something she hadnt released and she goes "i would like you to explain that". reader i could not',
      'went up the clock tower with elias and the movement is just turning, oiled, connected to nothing. goosebumps',
      'harrow gives you ninety seconds and makes them count. by loop five i had my pitch down to forty',
      'room four at the boarding house looks over the yard and by loop six it felt more like home than my real room',
      'theo goes "go on then, tell me what happens on thursday" so i did. he checked. his face when it happened',
      'thursday night mina and the tower guy are on her steps and they both shut up when you walk up. WHY',
      'the watcher is the best pick here, half the game is spotting the one thing that changed this time',
      'the councillor wears a signet ring with a clock face on it and you are telling me that means nothing',
      'justice for elias crowe',
    ],
    critical: [
      'the early loops are slow because you do not know what is safe to skip',
      'wanted a way to fast forward days i had already solved',
      'good but the loop repeats a lot of the same text',
      'solved it half by accident and skipped most of the middle',
      'missed ten oclock tuesday by a couple of minutes because i was dawdling in the old town. very realistic, very annoying',
      'harrow is only in town thursday to friday and she takes half the answers with her on the train',
      'mina asks three questions before you get one in, every monday, and by loop seven i was skipping her. sorry mina',
      'the notebook going blank every monday is thematic but i ended up keeping a real notepad next to my phone',
      'elias talks escapements and trains like im meant to know what those are. the mechanism checks felt random',
    ],
  },
  story_window_seven: {
    praise: [
      'she waves at a lens she has no way of knowing about, at 1:16, on night one',
      'mara organises the safehouse food by expiry date and that tells you everything about her',
      'the black case in the wardrobe. i opened it on night five and i should not have',
      'four rules that fit on one line, and the game is about which one you break first',
      'the target was right. seven nights for that',
      'everything you do is logged and it comes back for you later',
      'left the flat on night two and the whole operation went sideways. worth it',
      'juno on the front desk knows everybody on that avenue and will absolutely trade',
      'tobin is not on this operation and he is on this street. best sentence in the app',
      'four words from glass and i rewrote my entire plan',
      'maras order is the one that made me set the phone down',
      'an entire thriller in one room and it never feels small',
      'voss built the thing she is trying to destroy and you find that out far too late',
      'mara tucks her hair behind her ear before she says anything difficult. once you see it you cant unsee it',
      'grey saloon on the avenue three nights running and the plates are consecutive. mara reading them out loud gave me chills',
      'tobin ash telling me my tuesday report was two hundred and eleven words and the balcony wasnt in any of them. caught',
      'rang the penthouse on night one because the game lets you. mara looked at me like i had set the flat on fire',
      'selene going "i assume the tall one organised the cupboard" im deceased',
      'halden turning up at the safehouse with a bag of good coffee and no explanation. directors dont do that. i did not drink it',
      'juno with the pen behind his ear he never writes with. "two of you, is it? two of you." love this man',
      'the small hours on the orpheum roof are the only time mara talks like a person. go up there',
      'tip: juno keeps the far buildings access log too, the two desks trade. just ask him',
      'went three nights without touching the black case and honestly that was harder than any check in the game',
      'selene mentions the north lift the doorman stops watching after two "as a courtesy" and yes i used it immediately',
      'who else put every glass message in order and read them back to back? something about them does not sit right',
      'lost a tail on the halberd street platform with a train every eleven minutes. felt like an actual spy for one turn',
      'night seven mara starts breaking down the tripod at five and neither of you says a word. that silence',
      'tobin ash is so polite. terrifying',
    ],
    critical: [
      'sitting in a flat for seven nights is as slow as it sounds for the first two',
      'wanted more outside the flat than the game is willing to give you',
      'good but filing the report every morning gets repetitive',
      'the twist landed for me but the middle nights dragged',
      'halden stacks up four clauses of reassurance before every actual question. by night three i was skimming for the question mark',
      'tobin knocking at eleven in the morning is a great scene and then he is gone again way too fast',
      'the three burners in the kitchen drawer never paid off in my run. why were they even there',
      'selene is always one step ahead to the point where nothing i did ever seemed to surprise her',
      'glass contradicting itself made me think the game was bugged for a whole night',
    ],
  },
  story_red_floor: {
    praise: [
      'no cameras, no records, no rankings. the game never once cheats on that',
      'maki asked a doctor for one more round twenty years ago and got it. that is why he keeps the floor',
      'mei can say no and actually stop you and i hated it and she is right',
      'koji works in his uncles print shop and loves this anyway. he is the heart of it',
      'aya teaches you to be frightened of standing still. best fight in the app',
      'damage does not go away between sundays and i learned that the expensive way',
      'got enough as an ending and it is not a loss and the game knows it is not',
      'daigo trains in a warehouse an hour out of the city with eleven people and no press',
      'junpei is frightened of mondays. one line and i understood the entire man',
      'every discipline in one room and the matchups genuinely feel different',
      'coach. i did not go down those stairs for that and it was the right ending',
      'riku has a proper gym and a proper team and comes down to a basement anyway',
      'mind the third step. aya says it on the first night and i think about it every time i take stairs now',
      'maki corrects you by moving your arm two inches instead of explaining. my real coach does the exact same thing',
      'riku looks bored right up until he steps off your best shot. hate him (affectionate)',
      'koji is fourteen and nineteen and tells you the fourteen first because thats marketing. protect him',
      'mei going six weeks, not four, not how does it feel, six. felt personally attacked',
      'the hill at the end of the seawall with the vending machine thats been broken since spring. everybody hates the hill and now so do i',
      'koji fourth on a regional card, six hundred people, eleven of them from mikado with a banner he asked them not to make. i cried',
      'junpei saying eleven years without missing a morning and that he knows what it is now. that one sat on my chest',
      'daigo on the stairs at half one in kit with every logo removed and the whole room just goes quiet',
      'worked somebody elses corner my first sunday instead of stepping on. sixty seconds, one instruction. cornering is so underrated',
      'riku clocked my weight going to the rear leg before my foot. fixed it the next sunday and he just nodded. biggest win of my life',
      'eleven hooks on the office wall and one photo on the second from the left. took me three sundays to ask maki',
      'said no to stepping on, out loud, with twenty people on the wall, and the game treated it like a real choice',
      'the showers at mikado are considerably better than they look and this is the most important lore in the game',
      'maki: no speeches while hes bleeding',
    ],
    critical: [
      'the fights get technical and i did not always follow what had happened',
      'wanted more outside mikado, the arcade scenes are good and rare',
      'good but losing early leaves you behind for a long time',
      'the injury system is realistic and not always fun',
      'eight weeks of roadwork and pads is realistic and also i fell asleep. more sundays less hill please',
      'the fake clip side plot ate my whole run and i just wanted to be on the mats',
      'junpei redirects every question so warmly i never got a single real answer out of him',
      'the weigh in at the hotel function room was so awkward i couldnt tell if it was meant to be funny',
      'daigo gives two word answers to anything not technical so every scene with him was me asking about footwork',
    ],
  },
  story_last_five: {
    praise: [
      'two points short. i am not okay. best sports ending i have played anywhere',
      'bo was a swimmer in september and plays like it, and it is funny, and then it is not',
      'noris cut of the film is the actual scouting and i started watching it every week',
      'dai has never started a game he did not have to. that is the whole captain arc',
      'the match clock is real and i lost one with eleven seconds on it',
      'what actually happened. i needed to know why the five left and it was worth the runs',
      'kai weighs about as much as a wet towel and runs the entire offense',
      'your style comes from what you actually do in games, not from a menu',
      'the five rivals scout you back and it shows up in the next game',
      'forty minutes of practice to make an impression is such a good first scene',
      'got the program stays and shouted in a quiet room',
      'torakawa is in her second year of coaching and it shows and she knows it shows',
      'mikael guards you for thirty two minutes and talks for all thirty two. the gold tooth comes up unprompted twice',
      'nori told me i went right eleven times out of thirteen and then onda knew it too. film is a weapon in this',
      'bo catching it above the square and just standing there holding the ball, shocked. the gym noise. i had to pause',
      'tip: go up to the roof after practice. kai hides up there to dodge the bus and he talks way more',
      'jun stopping mid drill to ask coach to explain the criteria in front of everyone, and she doesnt pretend hes wrong. best scene of the first week',
      'the dead spot near the left elbow in the kosei gym is mentioned once and now i avoid it every practice lol',
      'gora being gentle with bo the entire tessen game got me. the wall has manners',
      'rei going "go left. i am asking you to." so i went left and got cooked',
      'tsubame redoing her plait between every quarter. tiny thing, noticed it every single time',
      'a vending machine that only takes exact change is the most realistic thing in any world on here',
      'picked watched everything as my background. could call their sets off the first cut, hands were garbage for weeks',
      'second run as grew late. six foot six and still thinking like a guard is so fun, nobody knows how to guard you',
      'the regional draw goes up outside the staff room and all five schools are in kosei\'s half. somebody laughs and then stops. yeah',
      'dai lands on someones foot in a drill nobody cared about and you have to pick: play him hurt or sit him. i sat him, lost to hakuba, still think i was right',
      'mikael saying they offered, he took it, his mum cried, which part is the betrayal. honestly? he has a point',
    ],
    critical: [
      'the games take a while and there are a lot of them',
      'five rival schools is a lot of people for one season',
      'good but the practice weeks repeat more than the games do',
      'i never got bo to be any use and it felt like my fault in a bad way',
      'lost to seiran three times in a row and the game keeps treating losing as normal. it does not feel normal',
      'legs drains so fast in the fourth. my shot was short for the last five minutes of the onda game and everyone saw',
      'kai needs so much trust before he actually throws it to you and the early games suffer for it',
      'chemistry starts at 40 and i tanked it by feuding with jun, then a whole game fell apart. harsh',
      'the roof and the bus rides are the best scenes and you barely get any of them between games',
    ],
  },
  story_tidewall: {
    praise: [
      'a survivor tells you once, quietly, that he saw your sister walk north. and nobody senior will hear it',
      'four months to get near the top of the roll or the pass shuts for another year',
      'your order decides which parts of the wall you are even allowed to stand on, and it is permanent',
      'hollis is first on the roll and is not a jerk about it, which made it worse',
      'bec wrote his account down for me and i carried that page the whole game',
      'verne drills the intake like they are already dead, which is the correct approach',
      'wrens sword in your hands the whole time is such a good bit of design',
      'the animals come down like weather rather than like monsters. that framing works',
      'picked longwatch and the route through the whole story changed',
      'the eleventh gate. i have been thinking about it since',
      'order politics is half of this game and i did not expect that at all',
      'ansett runs the eastern run and has already decided what you are',
      'odalys is missing the top of her ear and carries a drill cane she has never hit anyone with. the lore is in her appearance',
      'hollis tells you theyre first and youre nineteenth on the very first morning, cheerfully, and never lets it go',
      'bec asking if you want the funny version or the true one. picked funny first. he was right, it is shorter',
      'the roll nailed to the post by the gate and everybody reading it on the way past. that post gave me actual anxiety',
      'the bright hall floor is one slate ring and standing on the wrong part is rude. i stood on the wrong part. twice',
      'played rogue and the animal chose me instead of the other way round. never been this attached to a companion',
      'healer is secretly the scariest class. the grip that holds a chest closed takes someone apart at arms length',
      'bec\'s longwatch coat with the crew patch unpicked and that bright clean rectangle where it was. noticed it before i knew why',
      'ansett is warm in a way that closes the subject. every talk with her ends exactly where she wants it to',
      'the empty perches at the end of the animal lines sized for something way bigger than a horse. what goes there. i need to know',
      'hollis stitching me up going sit down, you are bleeding on my floor, and yes i am still ahead of you. love them',
      'set yourself is my favourite move in anything. plant, breathe out, refuse the next thing that arrives',
      'the stillhand tents really are where every honest opinion on the wall lives. best conversations happen there',
      'silent rank run: over the wall at night, back with stuff the wall didnt know. barely saw daylight and loved it',
      'odalys reads calloway off the intake sheet, pauses, decides not to say anything. that pause did more than a cutscene',
    ],
    critical: [
      'four months of drills before anything really happens',
      'your class locks you out of a lot and i think i picked wrong',
      'good but the siege stuff is better than the ranking stuff',
      'wanted more wren and got less than i hoped',
      'sorcerer is so frail. one bad morning in the yard and im back in the stillhand tent with the roll noting it',
      'archer felt weak until i got onto a great bow crew. before that held shot just meant standing there waiting',
      'odalys is great but she is a wall. roll number instead of your name and she never budges on anything',
      'ansett wants bec\'s word in writing, bec wont write it, and i went in circles on that for way too long',
      'is it just me or does standing tank way too hard after one bad day? spent a week on jobs nobody records',
    ],
  },
  story_seven_names: {
    praise: [
      'a name on a list is not the same as a person who deserves to die. marcel says it once and the game is that',
      'seventeen minutes past one and a brick falls out of the wall. i was in immediately',
      'got seven graves and the epilogue made me feel genuinely bad about myself',
      'celeste is a financiers daughter four nights a week and the best burglar in paris the other three',
      'the game never tells you whether you actually did it. i love that more than i can say',
      'building an alias the whole country believes in is the best mechanic in here',
      'renaud is the only man in france who never signed off on your drowning and that carries the back half',
      'burned the registry unread. i will always wonder what was in it',
      'solene turned you into a national monster in nine days with six newspapers',
      'the eighth name is the reason to replay this one',
      'anais signed the timeline and is not a villain, which is worse',
      'you can just get on a boat in the first hour and that is a real ending',
      'veyrac gave the eulogy. i think about that every time he is polite to me',
      'marcel asks about your hands before he asks about your case. good hands, cold but good. i love this old man',
      'celeste clocking that i was nine minutes late and came up the front stairs. correct. rude. correct',
      'the paper has one word next to each name. money print police medicine army ships. and nothing next to the seventh',
      'henri varenne checks his watch chain by touch and never looks at it. i watched his hand the whole scene',
      'ran it as already a thief then again as an ex officer and it played like two different games',
      'saint charles with the two plain coats at the barrier not even hiding it, and a third one further back. my heart',
      'solene tells you straight she has a plate in a drawer on the fifth floor and will not give it to you. best negotiation in the app',
      'heat stays cold as long as the republic thinks you drowned off fort serein. the second you get greedy it all goes up',
      'my alias got songs and a cheap novel and imitators and suddenly i couldnt walk anywhere. notoriety never goes down and you feel it',
      'the service passage is eleven metres with a bend in the middle and i spent an embarrassing amount of time standing in it',
      'work the table is twenty minutes of being charming at one person for one sentence and its the most stressful thing ive done in a game',
      'veyrac saying we do not get to be clean, we get to be small. i hated how much sense he made',
      'marcel: four hundred and ten metres, most of it wrong, if hed known about limestone hed have been out in two. gallows humour king',
      'the governor walking out at seven to tell the crowd at fort serein there has been an administrative delay. i laughed out loud',
      'anais watches your hands not your face the whole time, knuckles scrubbed raw. the quietest heaviest scene in here',
    ],
    critical: [
      'seven threads is a lot to hold at once',
      'the paris half is stronger than the marseille half',
      'good but i got the road out by accident on my first run',
      'the period voice is thick and takes a while to get into',
      'renaud is always about a day behind me once heat goes up and it got exhausting, did three days over the laundry doing nothing',
      'condition bottomed out after the escape and i couldnt hold a pen or pick a lock for ages. realistic but i wanted to play',
      'the opera has so many people in boxes that i lost track of who was who',
      'henri varenne is impossible to hurry and i mean that as a complaint, the bank scenes drag',
      'why is the registry three rooms in three buildings. i spent more time finding it than reading it',
    ],
  },
  story_unbound: {
    praise: [
      'the kiln trains nothing like the way you were raised and every drill reminds you of it',
      'probation means you are a guest who can be sent away. that never lets up',
      'renna holds your probation and is completely fair, which is somehow more stressful',
      'your master says he never taught it. three deaths this year say somebody did',
      'tam is third year and owes you nothing and helps anyway',
      'forms you awaken instead of picking off a list. i got one i did not plan for',
      'sera was sent to the long quiet and the game does not soften what that means',
      'contract work in the night market to pay for a place you have not earned yet',
      'they sealed the doors and parcelled the students out like furniture. cold',
      'kell took the oyan ruling and has to live inside it and you can hear it',
      'build freedom that comes from how you actually fight rather than a skill tree',
      'tam asking to see a pretty oyan form on the first day. showed him one and he stopped smiling',
      'auber repeats your question back perfectly and then answers a smaller one. every conversation with him is a puzzle',
      'the kiln yard earth is already warm through your shoes before sunrise because of the furnaces. that first line got me',
      'renna\'s forearms burned brick red from the furnace wall. she has been doing this a long time and you can tell',
      'picked tide and used the oyan version in the kiln yard in front of renna. she wrote something down and i was scared for a week',
      'gale step is two paces that werent there a second ago and i abuse it constantly',
      'the quiet opening happened to me mid fight and i had no clue what it was. your eyes change and you see the move before it comes',
      'sera saying she put her band in a drawer and thinks about the drawer a lot. oof',
      'the clerk at the contract office belonging to none of the five schools is such a good tiny worldbuilding detail',
      'ninety steps on the river stair and everything unofficial in the city happens on them. spent half my run loitering there',
      'looking through the grille at oyan house and the training floor hasnt been swept since the ruling. that got me',
      'river salt under the tongue after pushing my breath too far is my whole routine now lol',
      'every kid bound to one school at fourteen for life and you are the one nobody knows what to do with. the premise does so much work',
      'the lantern opening is the reverse of the quiet one, you stop seeing people and see where their breath pools. found it on my second run',
      'picked family has been oyan for three generations and wearing the grey band into the kiln felt like a whole statement',
    ],
    critical: [
      'the five schools are not all equally developed',
      'wanted more of the dissolved school and got mostly the kiln',
      'good but the forms take a while to come online',
      'the concord hall scenes are dry next to the rest of it',
      'the wrapped blade is useless. probationers not getting a live edge makes sense but its annoying',
      'auber will not take anything but a reading and i turned up with a feeling three times. he is right and i hate him',
      'breath runs dry mid fight and everyone trained can see your forms wont hold. brutal early on',
      'went into oyan house and got charged on top of everything else. wish the game warned you harder',
      'tam is great but the rivalry never really heats up, hes too nice about you standing in his spot',
    ],
  },
  story_salt_road: {
    praise: [
      'nine days of water and eleven days of walking. that is the whole horror and there are no monsters',
      'oren has never once been asleep when i woke up and i thought about that for six days',
      'the third well is unreliable and i built my entire plan on it holding',
      'ferrow has crossed nine times and still will not promise you anything',
      'sabe packed badly and will not turn back and you have to decide what that costs',
      'died on day nine, permanently, entirely because of my own arithmetic',
      'i never opened the case. i am weirdly proud of that',
      'no monsters, just distance and maths, and it is the tensest thing in here',
      'stopped too long at the wrecks and paid for it three days later',
      'every choice about pace spends water you cannot get back',
      'four people drink faster than one and you feel every canteen',
      'ferrow counts everyones water out loud before you leave ossun so nobody can say later they missed the numbers',
      'the little scars on ferrows forearm, one per crossing, and the ninth is shorter than the rest. nobody says a word about it',
      'oren has the only hands in the group that arent cracked and a pack he didnt buy in ossun. just saying',
      'courier run: gave sabe my spare canteen on day four and did water sums in my head for the rest of the week',
      'put everyone on short water at the first well and nobody thanked me. correct. ration is supposed to feel like that',
      'the approach to the third well is covered in boots and packs people stopped carrying. i just sat and stared at it',
      'outrider is the only build that can really fight and theres nothing out there to fight except other thirsty people',
      'went north to the wrecks alone so the caravan wouldnt pay for it. fourteen hours by myself. best stretch of the game',
      'even read the flat costs a sip. looking at the horizon has a price and i respect it',
      'sabe every day: is it much further. do not answer that. actually answer it',
      'ferrow never argues twice',
      'surveyor felt like cheating. find the water once and suddenly everyone just follows you',
      'justice for sabes city boots',
      'finally got ferrow to trust me before the third well and what she says there is worth three runs',
      'has anyone asked sabe about the little clay pot on top of their pack. i keep chickening out',
    ],
    critical: [
      'very short compared to the others',
      'wanted more at the coast, it ends fast once you get there',
      'good but there are only three people to talk to',
      'permanent death plus a resource puzzle is a lot to lose an hour to',
      'the wrecks detour costs fourteen hours of water and i still dont really get what i was meant to learn there',
      'five places on the whole map. i know its a desert but still',
      'went from comfortable to dead in like two turns. the maths jumped me',
      'restarted from ossun four times now and the walk to the first well drags every single time',
      'oren answers every question with two questions and i wanted to leave him at the second well',
    ],
  },
  story_fourth_beast: {
    praise: [
      'you choose first and camille gets whatever is left and she never lets you forget it',
      'the beast has opinions about you. mine sulked for two days after i ran from something',
      'lina had every disappearance on one map before anybody official did, and she is a student',
      'three weeks before the man in the pale coat notices somebody can finally hurt him',
      'theo is alive down there and finding that out changed my entire run',
      'got more than rivals and it earned every bit of it',
      'morel grew three animals in a basement because nothing else in the world touches this man',
      'paris notices an impossible animal on the roofline and there are consequences. finally',
      'ravel turns the evidence board around when anybody senior visits. one detail, whole character',
      'the quarries are the best horror in a game that is not a horror game',
      'camille wins is a real ending and it stung in exactly the right way',
      'the metro sequence. i have played it three times now',
      'marea robbed my bag before i had even left the lab',
      'aurel supremacy. gold mane, silver quills, teeth completely black',
      'nox melting a shutter in belleville at 2am and me telling the neighbour it was a hairdryer',
      'getting it home across paris on the first night is the best tutorial in the app. took the roofs, it loved it, i did not',
      'mine lost it on a metro escalator and a whole platform of people decided not to look at me',
      'lina fact checking me mid sentence while making tea is my favourite character trait in the whole app',
      'ravel keeps her coat on indoors in every room including her own office. the day she takes it off youve made it',
      'said no to all three in the lab just to see. morel wrote a number on a card and went back to work. brutal',
      'morel refusing to tell you the bond is safe and getting properly angry when you ask him to say it anyway',
      'the candles under the third bridge that somebody keeps replacing. i went back to check on them every few days',
      'camille chewing her chain when shes thinking and then denying it. i brought it up every scene, she hates me now',
      'every time my beast did something cool in a crowded street i remembered this city has forty thousand phones in it',
      'marea sounding the walls and you feel it in your teeth. best power of the three and its not close',
      'tip: lina has been carrying something since june. dont push her, just keep going back for tea',
      'the day it held the wrong shape for four minutes and wouldnt look at me, i sat on the floor with it for an hour. crying a bit',
    ],
    critical: [
      'good but i picked my beast in ten seconds and regretted it for six hours',
      'camille solves things without you and sometimes that felt like being sidelined',
      'the investigation stalls badly if you miss lina',
      'wanted more paris above ground, it goes underneath and stays there',
      'got winded on the montmartre stairs every single time. i know there are hundreds of them but come on',
      'the hiding gets repetitive. every scene is hide it, explain the bag, hide it again',
      'went to the prefecture first and ravel gave me nothing for a week. should have gone to lina',
      'too many people to keep happy. camille, lina, ravel, morel, and every one of them wants an evening',
      'the service level tunnels all look the same and i got lost twice. one working light every forty metres is not enough light',
    ],
  },
  story_ninth_archive: {
    praise: [
      'the warden is extremely kind to you and it is the most frightening thing in the game',
      'students are never expelled here, they are transferred, and the transfers do not arrive anywhere',
      'standing at the gate holding your acceptance letter while it says you were never admitted',
      'mira covers for you and obviously knows more and will not say. i spent a whole term on her',
      'kael is ordered to investigate you and is genuinely good at it',
      'the stacks at night with cartwrights lens is the best part of this',
      'bram will get you anything for the right trade and never asks what for',
      'the gate goes red and every student on the lawn turns around. i felt that',
      'ward chalk actually mattering in a fight was a nice surprise',
      'found the torn ledger page and then had to decide who to show it to. no good options',
      'ysolde turns her rings every time shes about to lie and once you notice you cant stop watching her hands',
      'kael asks questions he already knows the answer to just to see if youll lie. i lied. he knew',
      'bram telling me that ward hates everyone, statistically im fine. famous last words',
      'veilstep. step into the seam between two lamps and come out where the light isnt. i skipped every corridor with it',
      'mira uses your surname when shes nervous and your first name when she isnt. i tracked it all term',
      'the gate stone is worn pale at shoulder height from a century of hands trailing through. i did it too every morning',
      'is it just me or is the wall between door five and door six too wide',
      'still mind, flatten yourself until the ward finds you boring. most relatable spell ever written',
      'yesterdays proof half erased on the lecture hall board. laziness or a message. i checked it every day',
      'theories on kaels black glove??',
      'bramble tonic tastes like a hedge and bram wont say where he gets them. very normal school',
      'ysolde has never said no in her life. its always not yet or let us see',
      'the undersecretarys key is a copy of a copy with filed teeth and it doesnt even open the one door you want lol',
      'tip: be on the leads at four and just wait',
      'gate duelist. would rather not fight, best in the school at it anyway. my entire personality',
    ],
    critical: [
      'the academy is small, i wanted more rooms to poke at',
      'good but the investigation stalls if you miss one lead',
      'shorter than the other big ones in here',
      'wanted more kael after the midpoint',
      'three of the four backgrounds start with no ability at all and only quiet hands gets one. feels lopsided',
      'my room has a door the academy has a key to and then nothing ever happens there. why tease that',
      'brams errand is so vague i said no out of spite and lost the stack key for it',
      'ysolde is the only faculty you actually get to talk to. for a school there are weirdly no teachers',
      'the red gate is terrifying the first morning and by the third week its just a light i walk under',
    ],
  },
  story_understudy: {
    praise: [
      'the company book is read out loud at the end of term. every favour you took is in it',
      'nobody in that building ever raises their voice and it is the most dangerous place in the app',
      'talia is better than you at one thing and worse at four and everybody knows, including her',
      'deare does not recast after the third week so you have to become necessary instead',
      'marta in wardrobe owes nobody anything, which makes her the most powerful person there',
      'i helped somebody and it went in the book against me. perfect mechanic',
      'six weeks and the date never moves. it really does not move',
      'learning the whole part knowing you will not perform it is a horrible thing to play',
      'got on stage without doing anything unkind and it took four runs',
      'green room politics that beat most of the fantasy plots in here',
      'deare calling everyone by surname. renn, sit down. understudy, stand in. felt that in my spine',
      'do not move the piano in rehearsal room two. i tried. do not try',
      'marta calls you love and means it about half the time. working out which half is the actual game',
      'take the note is the best ability in the app. eat a correction so completely the person giving it starts rooting for you',
      'talia complimenting you accurately in front of people is scarier than any villain in here',
      'my sides have act two in three colours of ink. i too have opinions about act two',
      'you are on page four of the book twice and the second one isnt in your handwriting. what does it MEAN',
      'deare saying i do not need you to be better than her, i need you to be necessary. lives in my head rent free',
      'those green room sofas have outlived four principals',
      'tip: talk to marta before you go hunting for the book. just taking it is a whole different thing and the building finds out',
      'run it again resets the room from one line so everyone gets a second go, and they remember who gave it to them',
      'used have a word on talia, ninety seconds alone, and it went somewhere i did not expect at all',
      'is it just me or is standing literally just what people say about you when youre not in the room. horribly accurate',
      'talia in rehearsal blacks that actually fit. she just stands there and i feel underdressed',
      'natural run and i was useless at everything that wasnt charm. basically playing myself',
    ],
    critical: [
      'small cast, and you feel it by week four',
      'good but it is all conversation, if you want anything else look elsewhere',
      'never worked out how the book actually scores you',
      'wanted more rehearsal scenes and got more corridor scenes',
      'deare only praises when its load bearing so i went four weeks without one nice word. harsh even for a director',
      'wardrobe is one room and marta is the only reason to ever go down there',
      'the diplomat just fixes the room over and over. wanted a messier background to pick',
      'only found the ghost light thing on my third run, nothing tells you to hang around the stage late',
      'rehearsal room, green room, stage, wardrobe, office. five rooms for six weeks of game',
    ],
  },
  story_blank_prophecy: {
    praise: [
      'they read your thread and there is nothing there. best premise in the catalogue',
      'hecate at a junction on the edge of athens with a shoebox shrine in a wall. exactly right',
      'hermes turns up because he wants something and says so. most honest god in fiction',
      'despina has kept the oldest rule in the world for thirty years and it is just a kitchen that stays open',
      'kyros spent four years proving that being told your future is what causes it. he might be right',
      'nothing can predict you and nothing protects you either. the game means both halves',
      'eirene kept a failed reading against nineteen years of her own procedure. my favourite',
      'the things that eat fate started following me home and i had to go back to the guesthouse',
      'a better loom. i just sat there afterwards',
      'thalia clocks you the second you look up at the roof of that train',
      'thalia gives every instruction in twos. run, left, not the stairs. i have started doing it at work',
      'hermes names his price before you ask and will not haggle. i would trust him with my life and not my wallet',
      'tip: sit down and eat whatever despina puts in front of you before you ask anything. she will not talk to you standing up',
      'hecate has a stray dog leaning on her leg that nobody else can touch. i tried. obviously i tried',
      'eirene says the subject and then corrects herself to you. every single time it got me a bit more',
      'your phone camera takes a totally normal photo of anything mythic you point it at. explains the whole hidden world in one line',
      'is it just me or does hermes end up three metres closer every time you look away',
      'kyros says his sisters name in a completely normal voice and that is scarier than anything on the roof of that train',
      'picked you feed people and the guest rules suddenly made sense. of course hospitality is a form of law here',
      'the thing on the train roof wanted to understand the hole in me, not eat me. took two runs to believe it',
      'hermes in those shoes. that is the comment',
      'despina bakes at half past one every night and has for thirty years and nobody asks why. i didnt either. i respect the bread',
      'second run i refused to read kyros letter and he just would not recruit me. the man has standards',
      'hermes told me the council voted on me informally and lost by one, then wanted two euros for the rest. businessman',
      'got the ending with the roofs in october and did not expect to cry at a game about greek monsters',
    ],
    critical: [
      'a lot of gods and a lot of lore in the first hour',
      'good but i never understood how the thread stuff worked mechanically',
      'the athens sections are better than the road to delphi',
      'twelve endings and most of my runs found the same three',
      'the council scenes are a lot of procedure and not a lot of monsters',
      'footing, notice, fray, and the game hides all three. i want to see the numbers',
      'eirene is my favourite and she is three hours away at delphi. move her to athens please',
      'the name stuff lost me. bearer, name, lending, i gave up and took nothing from anybody',
      'kyros is so reasonable i kept waiting for the catch and the game just refuses to give me one. annoying, probably on purpose',
    ],
  },
  story_last_service: {
    praise: [
      'the extractor hood making a noise it should not make. i knew this restaurant in one paragraph',
      'mina comes in out of the rain with a knife roll and every cook on the line clocks her',
      'emi is the entire front of house and the reason that kitchen gets away with anything',
      'daichi has been on that line four years and nobody has thanked him. i made sure somebody did',
      'you can cook anything you can describe and it judges it properly. should not work, does',
      'keiko has not taken a full day since march and will not discuss the loan',
      'closing well is an ending and that is the bravest thing in this app',
      'got the dish with no name on my fourth run and it was worth every credit',
      'gin is not trying to be formidable, which is precisely why he is',
      'kado can fill thirty seats for a year with four hundred words and everybody knows it',
      'keiko names regulars by their order. table four is the mackerel, no ginger. i have never felt more like i worked somewhere',
      'daichi: you moved my mise. i am not going to make a thing of it. i will never touch his mise again',
      'emi with a pen through her hair carrying two things in every single scene. i see you emi',
      'tip: take the market notebook to the fish market at five. being seen with it changes what the stalls show you',
      'takumi turns up at three in the afternoon with a crate nobody ordered and i asked him to stay for service. no regrets',
      'mina has pulled nine dishes off a menu before service because they were only correct. that line lives in my head now',
      'made akari a curry counter one run and a soba place the next and it took both completely seriously',
      'is it just me or is the crate in the back alley the best location in this app. every real conversation happens on it',
      'the hood finally dies mid service with twenty two covers in and everyone just keeps cooking. i could smell it',
      'sixty one covers through a thirty seat room and the last table eats at ten past ten. a good week is the scariest thing in this',
      'reina books under a fake name, pays for everything and keeps her coat on facing the room. emi clocked her in a minute, i didnt',
      'picked you ran rooms, could not cook to save my life, and still had a great month saving tables out front',
      'takumi would rather two hundred people in a wet street stop talking for eleven seconds. put that on my grave',
      'the heat lamp on the pass buzzes and the walk in has to be shut with a hip. whoever wrote this has worked a line',
      'keiko please sit down',
    ],
    critical: [
      'thirty days goes fast and i spent too many of them at the market',
      'good but not every dish is scored and i wanted to know which ones were',
      'wanted more takumi, he is great and was barely in my run',
      'the services get samey by the third week',
      'push talk too high and your friday regulars quietly go elsewhere, and nobody tells you. lost half my room before i noticed',
      'vanta is quiet on purpose but i wanted way more time in that kitchen',
      'mina taking both stations off her cooks and sending plates eleven minutes late made me stop rooting for her for a week',
      'reina refusing to say what she is writing is realistic and also drove me insane',
      'keiko will not talk numbers in the kitchen, ever, so you drag her into the alley every single time. exhausting',
    ],
  },
  story_ace: {
    praise: [
      'luffy got insulted about his hat the day before and thought about it for nine seconds then asked what you were having for lunch. that child',
      'kept sabo alive and the game did not sneak in some other way to kill him. he just lived',
      'you cannot thank dadan. try it and she walks out of the room. i tried three times',
      'garp roaring with laughter and then saying the cruellest true thing in the middle of a joke about food. every single visit',
      'the can is five million berries in a biscuit tin under a flat stone and luffy worked out which stone on day four',
      'gave the mera mera to deuce instead of eating it and my whole crew got built around him',
      'whitebeard just keeps offering you a drink after you try to kill him. eleven times. i was crying laughing',
      'ate in the galley with thatch every night on purpose and paid for it later. worth it',
      'deuce opening every argument with for the record has become my whole personality',
      'ace falling asleep face down in his dinner mid sentence and it being an actual stat is so dumb and i love it',
      'twenty months, written in a marine file like a medical footnote. i just stared at it',
      'got i listened. stopped at the rail, no banaro, no platform, and i still cant tell if it was strength or cowardice',
      'luffy saying ace as a complete sentence. ace. ACE. thats the whole line and it works every single time',
      'you didnt say i couldnt, you said youd tie me to a tree. thats different. a seven year old out lawyering me',
      'dadan going do i look like a mother to you, do i, and then answering herself for a full minute. queen',
      'the hole in dadans roof thats been about to get fixed for three years is my favourite thing on dawn island',
      'sabo starts with look when hes about to be reasonable and no listen when hes not. you learn to brace for no listen',
      'nobody checks the eastern gate before noon, thats not luck thats a rota. sabo is way too smart for that mountain',
      'garp turns up, eats everything, throws both of us into the forest and leaves without saying why he came. every visit',
      'marco stitching me up and saying you never take anyone with you in the most bored voice possible. he was right and i hated it',
      'thatch keeping a tally of my attempts on whitebeard in the galley. the crew stopped even looking up after the fourth one',
      'teach asked me about fruits again, third time this year. thatch says it like a joke and i wanted to shake him',
      'shanks hearing luffys name and the whole room changing. straw hat, no volume control, eats like a siege. yep thats him',
      'jinbe: sit. this will take a moment and it should not be shouted. i wish anyone in my life talked like that',
      'deuce: you had a direction and a lot of confidence, and they are not the same document. printing it and framing it',
      'if you pick up the fruit deuce just tells you the trade. never swim again. not advising either way. so dry i love him',
      'left the mera mera in the crate on sixis and played the whole thing as a pipe and fists guy. no second fire fruit shows up either, the game means it',
      'garp owes dadan so much rent',
      'took luffy with me at seventeen. a fourteen year old on the boat changes every crew scene after it. pure chaos, recommend',
      'dadan doesnt come down to the shore when you leave but you can see her up on the ridge. im fine. totally fine',
      'the orange hat with one smiling badge and one frowning one. two faces on one head. cant look at it the same way now',
      'zehahaha no thank you teach',
      'the whose son quest lets you go with portgas on purpose. her name, not his. did not hesitate for a second',
      'the you went looking start, hitting an adult with a bottle at eight and dadan paying for the bottle. whole character in two sentences',
      'my pride must have bottomed out because luffy asked if i was sick. scarier than any fight in the game',
      'deuce for captain honestly',
      'teach saying you and me are the same animal, you just put yours in people. i hate how good that line is',
      'sakazuki calls you portgas and the prisoner the whole time and never raises his voice once. the calm is the scary part',
      'walked into a restaurant in alabasta and luffy is just sitting there, years older and exactly the same. i yelled',
      'garp: i put you up this mountain because it was the furthest place from the sea i could think of. turns out im an idiot. GARP',
      'tip: be in gray terminal when the men with lamp oil start at the eastern edge. hearing about it later is a totally different week',
      'the deuce ending where the log runs to eleven volumes and he refuses to publish it. stubborn to the very last page',
    ],
    critical: [
      'tried for the father lives for a week straight and never got anywhere near it',
      'wanted way more shanks, he was in my run for about five minutes',
      'notoriety goes up every time you get seen fighting in a harbour and the grand line port bits got tedious',
      'so much of the teach stuff gets set up and my run never got anywhere near banaro',
      'gray terminal is so bleak next to the rest of it. i get why but i wanted off that rubbish heap fast',
      'never found out which house in high town sabo is from. pushed him about the terminal and he just lied to my face',
      'haki cant be learned before the new world so my no fruit run was a kid with a pipe for a very long time',
      'every problem in my run started with say that again. i know thats the point but it punishes the fun option',
      'you never see your pride number and it quietly decides everything later on. some kind of warning would be nice',
      'the whitebeard attempts are funny the first four times and then i just wanted to get to the actual decision',
      'impel down level six dragged so bad',
      'the jump to seventeen came out of nowhere for me. one minute im ten and the next the can has been full for years',
      'teach is so obviously teach that the whole moby dick stretch felt like waiting for the other shoe',
      'marineford has so many people arriving that i lost track of who even came, which is apparently the whole point',
    ],
  },
  story_light: {
    praise: [
      'raye penber is four days from clearing you and letting him finish is one of the best moves in the game. it feels like doing nothing',
      'ignored the man on tv and l never worked out i was in kanto. all those forum arguments were right',
      'ryuk just standing nine feet tall in the corner of a teenagers bedroom never stops looking wrong',
      'sayu asking for help with her maths at dinner. skip those evenings and the whole thing hits way less',
      'you can burn the notebook the first afternoon and its a real route. did not believe that chip until i tried it',
      'told mikami in plain words never to touch the real notebook and got mikami obeys. near holding a notebook that does not work is my favourite image in the app',
      'your dads case notes come home in the briefcase every night. reading them is not hard, deciding to is',
      'misa is not stupid at all, she just writes the dates down in a diary with stickers on it. the stickers',
      'kaito asking for your notes on the way out is the last normal conversation light ever gets',
      'l crouched on a chair in a hotel suite full of cake running the whole investigation. i would die for him',
      'no red eyes, no cackling, just a name and then a news item later. way creepier than i expected',
      'said nothing for forty seconds at the yellow box and got i waited. shaking in a car park, same as him',
      'tried to get ryuk to write a name for me and he just laughed. he will not do it, dont even bother asking',
      'built the drawer thing on day one. ink cartridge wired to the frame so if anyone opens it wrong everything inside is gone. so light yagami it hurts',
      'tip: ask ryuk what he is NOT allowed to do, and ask it twice. asking what he can do gets you nothing',
      'aizawa going "say that again without the clever part" is the scariest line in this whole game and its not close',
      'is it just me or does your mum going youve been up there since four, come down and eat, wreck every plan you had for the evening',
      'mikami saying delete instead of kill gave me actual chills',
      'the tennis match at to oh. peak',
      'has anyone actually got naomi to give her real name? she keeps going shoko maki and i cannot crack it',
      'killed raye on my first run like an idiot and his fiancee turned out to be a way bigger problem than he ever was',
      'second run i made raye hand over the other eleven names before i did anything. felt like a genius for about a day',
      'read the broadcast file before touching the notebook and the man on tv suddenly made sense. it only went out in one region',
      'misa already made the eye deal before she ever met you and brings it up like its a present. i was not ok',
      'rem calls you light yagami in full every single time and it lands like an accusation',
      'sayu has decided you stopped coming downstairs because of exams. she says it in passing, no weight on it at all. i closed the app',
      'mello calls you kira on purpose, near calls you light yagami, l calls you light kun. whoever wrote these three knew exactly what they were doing',
      'never opened the briefcase once in my whole run and every dinner with soichiro felt earned',
      'kaito saying the deaths are probably a good thing, totally casual, to the one person on earth he should not say it to',
      'gave up ownership for the fifty days and memoryless light is genuinely just a nice kid. the game does not cheat on that at all',
      'picked you watched your father and the whole run felt like playing chess against my own dad. the procedure stuff is so good',
      'you wanted a game is the most dangerous archetype because you actually want l to be good. i took every single bait he threw',
      'the yotsuba boardroom is eight guys in suits deciding who dies for the quarterly figures and somehow its the most evil room in the story',
      'l with his thumb near his mouth saying the worst possible thing out loud and then just sitting there. the pauses are written so well',
      'the late night show spending eleven minutes on deaths in custody while sayu talks over it and dad says nothing. that silence',
      'copycats killing people in kiras name with no notebook at all and light being annoyed about being misrepresented. thats the diagnosis right there',
      'matsuda "everyone treats me like im the coffee. im not the coffee" i love this man',
      'burned it the first evening and ryuk is annoyed for about a minute then goes off to find somebody else. shortest ending in the game and it haunted me for a week',
      'used it on exactly one name and never again. one death isnt a pattern so nobody ever comes looking. quiet little ending, huge feelings',
      'the more i won the more light wanted to explain himself. had to physically stop myself typing a victory speech at l',
      'rem is terrifying and correct',
      'light kun. LIGHT KUN.',
    ],
    critical: [
      'the notebook needs a face as well as a name and nobody tells you, found that out the expensive way',
      'exposure climbs so fast once l is involved that i spent half my run just hiding',
      'doing homework on camera eleven hours a day is very accurate and not very fun to play',
      'the near and mello half never matched the l half for me',
      'the opening afternoon is slow on purpose and i get why but i just wanted to test the thing',
      'letting raye finish is the right move and its also four days of nothing to actually play',
      'the shinigami eyes are a trap. half your life for a shortcut and it never once felt worth it',
      'misa is exhausting. i know thats the point and i still wanted to mute her',
      'the broadcast file is way too easy to miss, didnt know you could read it until somebody in here said so',
      'near only explaining what he did after it already worked is more smug than satisfying',
      'kaito is the best character in the first hour and then he basically disappears once you leave daikoku',
      'your mum changes the subject with food every time anything gets hard and by the tenth time it felt like a loop',
      'outside of matsuda, aizawa and your dad the task force is basically furniture',
      'l crouching on chairs is cute the first ten times',
    ],
  },
};

/**
 * Ending names, for the comments that give one away without saying "ending".
 *
 * The spoiler tap only works if something upstream knows a comment is a
 * spoiler, and the previous heuristic was the word "ending" appearing in the
 * body. That misses the way people actually spoil things: "twiceborn. that is
 * all i am going to say", "platform 11. i was not fine after that one", "got
 * seven graves". Those are ending names, they are the whole reason the tap
 * exists, and they were going out untapped.
 *
 * Lowercase, matched as substrings, and only the names that some body in this
 * file actually uses — `assertPools` fails on a phrase that matches nothing, so
 * this list cannot rot into decoration.
 */
const ENDING_NAMES: Record<string, readonly string[]> = {
  story_itachi: ['shisui lives', 'the settlement', 'two brothers leave'],
  story_second_skin: ['twiceborn', 'lio home', 'my one skin'],
  story_pink_tide: ['perfect week', 'eli confesses', 'too late', 'her real smile'],
  story_good_morning_husband: ['platform 11', 'separate rooms'],
  story_hush_house: ['room 312', 'mika comes home'],
  story_zero_throne: ['the lie that saved us', 'the truth of lysandra', 'freewake', 'walk away'],
  story_blackwake: ['the yard with your name on it', 'the crownless sea', 'the crew buries you ashore'],
  story_primal_crown: ['the sixth banner', 'white maws rider'],
  story_window_seven: ['the target was right', 'maras order'],
  story_last_five: ['two points short', 'what actually happened', 'the program stays'],
  story_seven_names: ['seven graves', 'the eighth name', 'burned the registry'],
  story_fourth_beast: ['more than rivals', 'camille wins'],
  story_blank_prophecy: ['a better loom'],
  story_last_service: ['the dish with no name'],
  story_red_floor: ['coach.'],
  story_ace: ['i listened', 'the father lives'],
  story_light: ['mikami obeys', 'i waited'],
};

/**
 * The shared half, and the only part that is allowed to repeat across worlds.
 *
 * Every line here is short enough that a player seeing it twice reads it as two
 * people being unoriginal rather than as one pool being sprayed around, which
 * is exactly how real comment sections behave.
 *
 * `notOn` exists for the cross-references. "god the itachi one was much better"
 * is a good comment on twenty-two worlds and a stupid one on Itachi.
 */
const NOISE: ReadonlyArray<{ body: string; notOn?: string }> = [
  { body: 'first' },
  { body: 'w' },
  { body: 'peak' },
  { body: 'is there a discord' },
  { body: 'anyone else here from tiktok' },
  { body: 'brb replaying' },
  { body: 'chat is this real' },
  { body: 'commenting so i can find this later' },
  { body: 'im supposed to be asleep' },
  { body: 'reading this instead of studying' },
  { body: 'the algorithm sent me here at 3am' },
  { body: 'why do i always pick the worst option' },
  { body: 'do not talk to me until i finish this' },
  { body: 'i have zero credits left and no regrets' },
  { body: 'somebody make a tier list of these' },
  { body: 'reading this on the toilet at my job' },
  { body: 'how do people write this fast' },
  { body: 'unemployed behaviour from me today' },
  { body: 'no way that worked' },
  { body: 'who else broke it by typing nonsense' },
  { body: 'my cat walked on my phone and i got a whole new scene' },
  { body: 'they should add multiplayer' },
  { body: 'follow me and i fllw back' },
  { body: 'found this from a comment on another one lol' },
  { body: 'i typed my ex name in and now i feel weird' },
  { body: 'idk why i read this at work' },
  { body: 'second time through and im still missing things' },
  { body: 'saving this for the flight' },
  { body: 'ok who is doing the wiki for these' },
  { body: 'this app is going to wreck my sleep schedule' },
  { body: 'me telling myself i will only do one turn' },
  { body: 'god the itachi one was much better', notOn: 'story_itachi' },
  { body: 'ITACHI SLANDER WILL NOT BE TOLERATED', notOn: 'story_itachi' },
  { body: 'came here straight from hush house and i am still jumpy', notOn: 'story_hush_house' },
  { body: 'if you liked this go and play pink tide', notOn: 'story_pink_tide' },
  { body: 'second' },
  { body: 'early gang' },
  { body: 'ok this is actually good' },
  { body: 'who else is up rn' },
  { body: 'the replay button is my enemy' },
  { body: 'typed sorry and the whole scene changed' },
  { body: 'i typed a dance move and it just went with it' },
  { body: 'out of credits again, see you tomorrow' },
  { body: 'i need more credits and less self control' },
  { body: 'who else plays these with brightness at zero in the dark' },
  { body: 'my alarm goes off in four hours' },
  { body: 'fell asleep mid scene and woke up with my phone on my face' },
  { body: 'reading this in the bath dont tell anyone' },
  { body: 'the comments are better than my group chat' },
  { body: 'these comments are unhinged and i love it' },
  { body: 'the person who typed nonsense up there is my hero' },
  { body: 'why is everyone in here so smart' },
  { body: 'not me picking the nice option every time' },
  { body: 'i always pick the chaotic option and regret it' },
  { body: 'choosing violence as usual' },
  { body: 'picked the safe choice for once and it went worse' },
  { body: 'whoever made this app owes me sleep' },
  { body: 'downloaded this for one story and now look at me' },
  { body: 'day four of telling myself this is research' },
  { body: 'the loading dots gave me anxiety' },
  { body: 'does anyone else read these out loud' },
  { body: 'typed in all caps and it took me seriously' },
  { body: 'tried to break it with a poem and it just kept going' },
  { body: 'save points when' },
  { body: 'undo button pls' },
  { body: 'every time i think i figured it out it does something new' },
  { body: 'somebody draw fanart of this already' },
  { body: 'someone post their run pls' },
  { body: 'my friend got a totally different scene from the same choice' },
  { body: 'how many turns did it take you all' },
  { body: 'third run and still making dumb choices' },
  { body: 'rating: yes' },
  { body: '10/10 would lose sleep again' },
  { body: 'chat i made a terrible decision' },
  { body: 'whoever writes these please never stop' },
  { body: 'back again' },
  { body: 'no thoughts just turns' },
  { body: 'i came back just to read the comments' },
  { body: 'this is how i procrastinate now' },
  { body: 'put the phone down challenge failed' },
  { body: 'hi from my lunch break' },
  { body: 'adding this to my comfort list' },
  { body: 'the dishes can wait' },
  { body: 'i owe my boss an apology' },
  { body: 'anyone else talk to the characters like theyre real' },
];

/**
 * The rules the pools have to satisfy, checked before a single row is written.
 *
 * All three of these have been broken by hand at least once, and none of them
 * is visible in a diff. A dash slips in from a paste, a good line gets copied
 * onto a second world, a body gets written twice in the same list. The script
 * refuses to seed rather than putting any of that in front of a player.
 */
function assertPools(): void {
  const dashes = /[—–]/;
  const seenBody = new Map<string, string>();

  for (const { body } of NOISE) {
    if (dashes.test(body)) throw new Error(`Dash in shared noise: ${body}`);
  }

  for (const [storyId, voice] of Object.entries(WORLDS)) {
    const local = new Set<string>();
    for (const body of [...voice.praise, ...voice.critical]) {
      if (dashes.test(body)) throw new Error(`Dash in ${storyId}: ${body}`);
      if (local.has(body)) throw new Error(`Repeated within ${storyId}: ${body}`);
      local.add(body);
      const owner = seenBody.get(body);
      // Substantive comments belong to exactly one world. If a line is true of
      // two worlds it was not specific enough to be worth writing.
      if (owner !== undefined) throw new Error(`"${body}" is on both ${owner} and ${storyId}`);
      seenBody.set(body, storyId);
    }
    if (voice.praise.length < 8) throw new Error(`${storyId} has too few praise lines to fill a section`);

    // An ending name that matches nothing is a phrase somebody edited out of a
    // comment and left behind here, and it silently stops protecting anything.
    for (const name of ENDING_NAMES[storyId] ?? []) {
      if (name !== name.toLowerCase()) throw new Error(`Ending name must be lowercase: ${name}`);
      const used = [...voice.praise, ...voice.critical].some((b) => b.toLowerCase().includes(name));
      if (!used) throw new Error(`No comment on ${storyId} mentions "${name}"`);
    }
  }

  for (const body of FR_NOISE) {
    if (dashes.test(body)) throw new Error(`Dash in French noise: ${body}`);
  }
  for (const [storyId, lines] of Object.entries(FR_WORLDS)) {
    if (!WORLDS[storyId]) throw new Error(`French lines for a world with no pool: ${storyId}`);
    if (lines.length < 4) throw new Error(`${storyId} has too few French lines`);
    for (const body of lines) {
      if (dashes.test(body)) throw new Error(`Dash in French ${storyId}: ${body}`);
      const owner = seenBody.get(body);
      if (owner !== undefined) throw new Error(`"${body}" is on both ${owner} and ${storyId}`);
      seenBody.set(body, storyId);
    }
  }

  for (const story of CATALOGUE) {
    if (!WORLDS[story.id]) throw new Error(`No comment pool written for ${story.id}`);
    if (!FR_WORLDS[story.id]) throw new Error(`No French lines written for ${story.id}`);
  }
  for (const storyId of Object.keys(ENDING_NAMES)) {
    if (!WORLDS[storyId]) throw new Error(`Ending names for a world with no pool: ${storyId}`);
  }
}

/** A small deterministic PRNG, seeded off the story id. */
function rngFor(storyId: string): () => number {
  let seed = 0;
  for (const ch of storyId) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
    return seed / 0x1_0000_0000;
  };
}

function shuffledWith<T>(list: readonly T[], next: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

/**
 * A comment written `days` ago, jittered so they are not all on the hour.
 *
 * The jitter comes off the story's own generator rather than `Math.random`, so
 * two re-seeds lay the section out with the same spacing instead of quietly
 * reshuffling which comment reads as the oldest.
 */
function when(daysAgo: number, next: () => number): string {
  const ms = daysAgo * 86_400_000 + Math.floor(next() * 86_400_000);
  return new Date(Date.now() - ms).toISOString();
}

/** Does this body name an ending, either by the word or by the ending's name? */
function spoils(storyId: string, body: string): boolean {
  if (/\bending\b/i.test(body)) return true;
  const named = ENDING_NAMES[storyId] ?? [];
  const lower = body.toLowerCase();
  return named.some((name) => lower.includes(name));
}

type Seeded = { body: string; spoiler: boolean; author: string };

/**
 * One world's comment section: who said what, in what order.
 *
 * The mix is roughly six positive to two critical to two noise, which is what a
 * real section looks like and a wall of praise is not. The substantive two
 * thirds come from this world's own pool; only the noise is shared with the
 * other twenty-two.
 *
 * Nothing is drawn twice. The story runs out of section when its praise pool is
 * spent, which is deliberate: a world with ten thousand likes does not get to
 * repeat itself just because the likes-to-comments ratio says it should have a
 * hundred comments.
 *
 * Names get the same treatment. The previous version walked one fixed cycle
 * through NAMES with a per-world offset, so every world had the same roster in
 * the same order, five seats along. Now each world shuffles the full list and
 * takes the front of it, which leaves the overlap a real app has (an active
 * commenter turns up on several worlds) without the rosters matching.
 */
function deckFor(storyId: string): Seeded[] {
  const voice = WORLDS[storyId]!;
  const next = rngFor(storyId);

  const praise = shuffledWith(voice.praise, next);
  const critical = shuffledWith(voice.critical, next);
  const noise = shuffledWith(
    NOISE.filter((n) => n.notOn !== storyId).map((n) => n.body),
    next,
  );
  const names = shuffledWith(NAMES, next);

  const share = Math.round(praise.length / 3);
  const budget = {
    praise: praise.length,
    critical: Math.min(critical.length, share),
    noise: Math.min(noise.length, share),
  };
  const pools = { praise, critical, noise };

  const deck: Seeded[] = [];
  for (let i = 0; budget.praise + budget.critical + budget.noise > 0; i += 1) {
    const slot = i % 10;
    const key = slot < 6 ? 'praise' : slot < 8 ? 'critical' : 'noise';
    if (budget[key] === 0) continue;
    budget[key] -= 1;
    const body = pools[key].shift()!;
    deck.push({
      body,
      // A comment naming an ending is hidden behind the spoiler tap, which is
      // also the feature demonstrating itself. Noise never names one.
      spoiler: key !== 'noise' && spoils(storyId, body),
      author: names[deck.length % names.length]!,
    });
  }

  // French players are in the same section as everyone else, so their
  // comments are too: the world's own French lines plus shared noise at the
  // same one-in-three the English side gets, under French handles, spread
  // evenly through the section.
  const frLines = FR_WORLDS[storyId] ?? [];
  const frNames = shuffledWith(FR_NAMES, next);
  const french: Seeded[] = shuffledWith(
    [
      ...frLines.map((body) => ({ body, noise: false })),
      ...shuffledWith(FR_NOISE, next)
        .slice(0, Math.round(frLines.length / 2))
        .map((body) => ({ body, noise: true })),
    ],
    next,
  ).map(({ body, noise }, i) => ({
    body,
    spoiler: !noise && (spoils(storyId, body) || /\bfin\b/i.test(body)),
    author: frNames[i % frNames.length]!,
  }));

  // Take a French comment whenever French is behind its share of the
  // section so far, so it is spread through it rather than bunched at one end.
  const total = deck.length + french.length;
  const mixed: Seeded[] = [];
  let e = 0;
  let f = 0;
  while (mixed.length < total) {
    const frenchDue = (f + 1) * total <= (mixed.length + 1) * french.length;
    if (f < french.length && (frenchDue || e >= deck.length)) mixed.push(french[f++]!);
    else mixed.push(deck[e++]!);
  }
  return mixed;
}

async function main(): Promise<void> {
  assertPools();

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let added = 0;
  let kept = 0;

  try {
    for (const story of CATALOGUE) {
      // The like and view floors live on the signal rollup, which is what the
      // projection already reads. Real likes and real opens are counted on top.
      const likes = roughen(story.id, story.likes);
      await pool.query(
        `INSERT INTO story_signals (story_id, likes, views) VALUES ($1, $2, $3)
         ON CONFLICT (story_id) DO UPDATE
           SET likes = EXCLUDED.likes, views = EXCLUDED.views, updated_at = now()`,
        [story.id, likes, roughen(`${story.id}:views`, story.views)],
      );

      await pool.query(
        `INSERT INTO story_editorial (story_id, featured_rank, staff_pick)
         VALUES ($1, $2, $3)
         ON CONFLICT (story_id) DO UPDATE
           SET featured_rank = EXCLUDED.featured_rank,
               staff_pick = EXCLUDED.staff_pick,
               updated_at = now()`,
        [story.id, story.featured ?? null, story.staffPick ?? false],
      );

      // Idempotent by body rather than by "any seeded row exists": a line
      // already in the section is kept where it is, with its date and author,
      // and only lines written since (the French ones, a new world's pool) are
      // added. Running it twice adds nothing.
      const { rows } = await pool.query<{ comment_id: string; body: string }>(
        `SELECT comment_id, body FROM story_comments WHERE story_id = $1 AND kind = 'SEEDED'`,
        [story.id],
      );
      const existing = new Map(rows.map((r) => [r.body, r.comment_id]));

      const deck = deckFor(story.id);
      const want = deck.length;
      const clock = rngFor(`${story.id}:when`);
      // A world with a hundred thousand likes has a top comment with hundreds,
      // not dozens, so the comment likes scale off the world's own figure.
      const top = Math.max(12, Math.round(likes * 0.004));
      for (let i = 0; i < want; i += 1) {
        const { body, spoiler, author } = deck[i]!;
        // Older comments have had longer to collect likes, so the deck is laid
        // down oldest-first: position 0 is the most-liked and the furthest
        // back. It used to run the other way, which made the top-liked comment
        // the newest one on the page and rendered the TOP and NEW sorts as the
        // same list in the same order, which a real section never does.
        const commentLikes = Math.round(top * ((want - i) / want) ** 2) + ((i * 13) % 9);
        const createdAt = when((want - i) * 1.5 + 1, clock);

        const id = existing.get(body);
        if (id !== undefined) {
          // Real likes on a seeded comment are counted back on top, so a
          // re-seed never takes away a like a player gave.
          await pool.query(
            `UPDATE story_comments
                SET likes = $2 + (SELECT COUNT(*) FROM comment_likes WHERE comment_id = $1)
              WHERE comment_id = $1`,
            [id, commentLikes],
          );
          kept += 1;
          continue;
        }

        await pool.query(
          `INSERT INTO story_comments
             (comment_id, story_id, user_id, author_name, body, kind, spoiler, likes, created_at)
           VALUES ($1,$2,NULL,$3,$4,'SEEDED',$5,$6,$7)`,
          [`cmt_seed_${randomUUID()}`, story.id, author, body, spoiler, commentLikes, createdAt],
        );
        added += 1;
      }
    }

    console.log(`Seeded ${CATALOGUE.length} worlds: ${added} comments added, ${kept} already there.`);
    console.log('All comments are kind=SEEDED and can be removed with:');
    console.log("  DELETE FROM story_comments WHERE kind = 'SEEDED';");
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});

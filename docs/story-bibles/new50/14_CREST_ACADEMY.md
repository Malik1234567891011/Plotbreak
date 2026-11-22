# CREST ACADEMY

**Slate:** #14 · harem academy with stats · male lean · drop 1
**Genre:** academy action, rivalry, comedy, romance up to a kiss
**One-line fantasy (the shelf hook):** Four hundred nobles and one commoner a year. You get five stat points and a ten-count before your first duel, and the crowd is already betting on how long you last.
**Identifiers:** slug `crest-academy`, export `CREST_ACADEMY`, story id `story_crest_academy`, version id `sv_crest_academy_1`, asset prefix `story_crest_academy/`.
**OOC evidence:** Lumencia Academy, 48.6M plays, #1 all-time: a harem academy with stat allocation. Nothing from it is used here: no title, character, school, system name, tagline or premise beat. An early draft called the school "the Imperial Academy of Sword and Sorcery", which is Lumencia's own tagline word for word. A second draft swapped in synonyms ("the empire's academy of swords and spells", "academy of swordwork and sorcery"), which is still Lumencia's one-line description ("An imperial academy of sword and sorcery"), so the shelf hook now leads on the four hundred nobles and the one commoner, and canon calls it "the Empire of Vael's duelling academy, where nobles learn the blade and the spell". The spec bans both synonym phrasings. Lumencia's builder also offers a "Commoner (Scholarship)" preset; a scholarship commoner at a noble school is a genre staple, and nothing else of Lumencia's is used.
**Collision search (2026-11-22):** the only exact "Crest Academy" is a cancelled indie superhero visual novel on itch.io. Three titles use crests as bloodline powers: *Record of Grancrest War* (hereditary noble Crests), *The Strongest Sage With the Weakest Crest* (2022 anime; crests decide one's magic at a royal academy) and *Fire Emblem: Three Houses* (an officers' academy for nobles and a few commoners, an Empire, hereditary Crests, an imperial princess). The crests here are deliberately the ordinary English thing: a school badge the academy issues to every student on the first day, which counts training and nothing else. Nobody inherits one, and it confers no power of its own. "The weakest crest" was cut from the fixture for echoing the second title (the spec bans it); the player has "the lowest numbers" instead. The duellists' club was renamed from "the Society of the Ring", which sounds like *The Fellowship of the Ring*, to **the Rail Society**, after the rail it sits on and the Rail Room it keeps.
**Trope neighbours, not copies:** the weakest student duelling the top duellist of the year in week one, with the loser serving the winner, recalls *Rakudai Kishi no Cavalry*; wagers on students, with losers serving, recalls *Kakegurui*. Both are common genre beats; nothing specific (names, rules, ranking systems, scenes) is taken. Neither name may appear in the fixture.
**Slate overlap:** #36 *Ten Points to Expulsion* is also a scholarship student whom a zero expels. Keep the two in different drops.

## Why this fantasy works

OOC's biggest title proves the shape: a school, a stat window, a cast of strong women who each want something from the player, and a rival in the first scene. What this version adds is a stat system that is a *choice under pressure* rather than a menu. The player's crest is the only one in the academy that holds unspent points, and they can be spent at any moment, including mid-swing. Five points against a duellist with Speed 8 is a real decision, and everyone in the Ring has an opinion about where they should go.

It is also a stat window the storyteller can actually read. Production runs `runTurnPure`, which never sees resources or the ability list. So the crest is a quest item the player starts holding (its description carries the five lines and the five unspent points, written as what the crest read *the morning it was issued*, because the world brief re-sends quest items every turn and present-tense numbers would pull the storyteller back to the 2s), its rules are in hard canon, and every archetype starts with "Spend a Point" so the storyteller is told, in the "Can:" lines, that the player can do it.

The second engine is a rule the whole cast argues about: the Ring Code. Yield and you serve the winner for up to a year. Lose and your crest pays a point. Hit zero in any line and you leave the academy that day. Every person in the cast has a different relationship to those three sentences.

## Premise (as shipped)

Crest Academy sits on a cliff above the imperial capital and takes four hundred students, nearly all of them noble. Each wears a crest: a silver badge over the heart that opens a small window of light with five numbers in it. Strength, Speed, Mana, Guard, Charm. A good student reads five. The best of a year reads seven.

Once a year the academy admits one commoner: whoever wins an exam that four thousand people sit across the provinces. This year that is you. Your crest opened this morning at two in every line, plus something no other crest in the academy has. Five unspent points, yours to place in any line at any moment, even halfway through a swing.

The Ring Code settles everything here. Any student may challenge you once a week. Lose, and your crest pays the winner a point. Yield before the first exchange, and you serve your challenger for up to a year. If any line ever reads zero, you leave the academy that day.

Twenty-seven commoners came before you. Only the first graduated. Since him, the noble duellists who run the challenge board have kept a wager book on how many days each scholar lasts. The record is seventy-one. In seven days the governors vote on ending the scholarship for good.

Your first duel starts on a count of ten. The noblewoman across the sand has never lost.

## Story bible

**Crest Academy** is the Empire of Vael's duelling academy, where nobles learn the blade and the spell, on a cliff above the imperial capital. It takes four hundred students over three years, almost all of them noble. Each one wears a **crest**: a silver badge pinned over the heart, issued on the first day, that reads its wearer and opens a small window of light showing five numbers.

| Line | What it measures |
|---|---|
| Strength | Force: how hard a blade lands, what you can lift and hold |
| Speed | Footwork, reaction, getting there first |
| Mana | How much sorcery you can cast before you are empty, and how large a spell can be |
| Guard | Taking a hit, holding a ward, staying on your feet |
| Charm | How easily you are heard, believed and noticed. It never makes anybody like you |

The scale: 1 is an untrained adult, 3 a trained soldier, 5 a good academy student, 7 the best of a year, 9 an imperial champion, 10 the most a crest can show. A crest only counts what was trained while wearing a crest, and nobles train under tutors' crests for years before they arrive. A noble first-year reads 4 to 6 in most lines. Training raises a line about a point a season; nobody gains a point in a week except by winning one in the Ring.

Once a year the academy admits one commoner, the winner of the **Open Trial**, an exam held in every province. This year four thousand sat it. The player won. Their scholarship crest opened this morning at **2 in every line**, with **five unspent points**: no other crest in the academy holds unspent points. The scholar can place them in any line at any moment, and a spent point is real the instant it is spent (a cold rush through the body, then the new number). Spent points are permanent.

The official story is that the five are "the founder's allowance". The truth is that **Instructor Halden Brannoch** transfers five points from his own crest into the scholarship crest every year, under the Headmistress's seal. He was the first scholar, twenty-eight years ago, and the only one who ever graduated. It is written in the transfer register in Founders' Hall: twenty-eight entries, one per scholar. The first is five points from the founding Empress's own crest into Brannoch's; the twenty-seven after it are five points from his crest, in his square hand, one a year ever since.

**The count, settled:** twenty-seven scholars before the player. The first (Brannoch) graduated. The twenty-six since him each have a line in the Purse, all ended. The player is the twenty-eighth: twenty-eight names on the Scholars' Board, twenty-seven scratched into the gatehouse windowsill. Brannoch has turned the minute-glass as instructor for twenty-five years.

### The Ring Code (the rules the cast argues about)

- Any student may challenge any other once a week. Duels happen only in the Ring. Fighting anywhere else is an expulsion offence, heard by the Headmistress rather than settled on the spot: a first fight outside the Ring brings a summons and a prefect at the scholar's elbow; a second, or real harm, ends in expulsion. (So a player who shoves Varro in the Great Hall on turn 3 gets a scandal, not a dead end with no ending to land on.)
- The Ring's six ward-stones blunt steel and spell to bruises. Nobody is maimed in the Ring.
- A duel ends at the first clean touch, at a yield, at the instructor's call, or when the minute-glass runs out (a draw: no point moves).
- **The loser's crest pays the winner one point, and the winner chooses the line.** On a noble crest a won point lands in the line it was taken from. On the scholarship crest it arrives as an unspent point.
- A challenged student who does not turn up forfeits, and pays the point anyway.
- The challenged may **yield** before the first exchange. No point moves, but the yielder serves the challenger on terms the challenger names: no harm, no money, nothing indecent, no longer than a year. Service can also be entered later by agreement, on terms the other student names, and counts the same (this is how "go back under her terms" works on the Ladder: Seraphine offers it as a favour and makes the scholar ask properly).
- **Clause nine:** nobody may challenge a student who is serving under yield terms. A server who issues a challenge ends the service.
- **Clause fourteen:** no challenges in concert. Students may not coordinate to drain one crest.
- **The Charter:** a crest that reads zero in any line means that student leaves the academy the same day.

### The Purse

The **Rail Society**, forty noble duellists who run the challenge board (the Ladder), keeps a wager book called the Purse: how many days each commoner scholar lasts. Twenty-six scholars since Brannoch, twenty-six lines, all ended. The record is seventy-one days. Last year's scholar, **Mio Fenn**, lasted nineteen: Lord Ansel Varro paid three proxies, Lord Piers Hallam among them, and between forfeits and duels they took her Mana line to zero in one afternoon. That is a clause fourteen violation, and the payments are in the Purse in Varro's own hand.

### The vote

The scholarship was founded twenty-eight years ago by the late Empress, Princess Isolde's mother, who was born a commoner. On the **seventh day**, at **Week's End**, the twelve governors watch the open duels in the Ring and then vote in Founders' Hall on ending it. Lady Governor Maud Varro, Ansel's mother, brought the motion. Isolde may speak but has no vote. Five governors came to end it, four to keep it, and three will decide on what they see in the Ring.

### Playable span

Seven days, from the first duel at nine on the first morning to the count on the seventh evening. Everything after lives in the endings.

### Hidden state (three invisible variables)

| Variable | Direction | What it tracks |
|---|---|---|
| Stamina | good high, starts 85 | How much fight the scholar has left today. The only thing rest restores. |
| Censure | good low, starts 10 | How close the academy is to sending the scholar home for conduct. A fight outside the Ring moves it first. |
| Marked | good low, starts 35 | How hard the Society is coming for the scholar. |

## Tone and pacing

- Academy anime with the stat window on: fast, competitive, funny, and exact about the rules.
- Crest lines appear as short bracketed lines, only when somebody opens a crest. Never tables. The storyteller tracks the five lines and unspent points from the transcript and never contradicts them.
- The player has the lowest numbers in the Ring on paper and is the only one who can change them mid-fight. The comedy is that everyone has an opinion about where the points go. ("You put a point in Charm. During a duel.")
- Romance is flirtatious, tense and earned, and goes no further than a kiss. No fan service, no lingering on bodies. Harem energy comes from three people who each want something specific from the player, each of whom can say no, and none of whom is a prize.
- Duels are short and physical. The wards turn blows into bruises; there is no blood and no gore.
- Narration uses contractions, and so do most voices. Seraphine never does: her full, contraction-free sentences are her marker, and it only reads if the prose around her is looser.
- Secrets are earned: Brannoch's five, Mio's nineteen days, Isolde's mother, clause nine, the Purse. Never stated early.

## Player starting authority

The player authors their name, pronouns, look, and their **trade before the academy** (the archetype). The crest cannot count that trade, so it is what the player is good at that nobody's numbers show. Every trade starts with "Spend a Point" plus one more ability.

| Trade | Plain role | Starts with | Edge |
|---|---|---|---|
| You Worked a Forge | Strength and grit | Hold Your Guard, a whetstone | Might +3, Resolve +1; swordwork, bracing; Below Stairs likes you |
| You Ran Messages | Speed and city sense | Slip Off, a courier's map | Agility +3, Mind +1; footwork, sneaking |
| You Copied Contracts | Rules, clauses and talk | Quote the Code, a pen case | Mind +3, Presence +1; the Code, talking; the Academy likes you |
| You Sold Village Charms | Small spells, sharp eyes | Cast a Spell, a charm pouch | Arcana +3, Presence +1; spellwork, reading people |

### Minimal hard canon

- Everyone in this story is an adult, and the academy admits nobody under eighteen. The player is nineteen.
- The player is a commoner and this year's only scholar. Their crest opened at 2 in every line, with five unspent points.
- The first duel starts on a ten-count in the opening beat.
- The Ring Code, clause nine, clause fourteen and the Charter, as above.

## The opener (turn 1)

119 words. Seraphine speaks to the player in the first word and is named at word 40. It ends on a demand. Brannoch's line carries the zero rule, so losing a point reads as a real risk and not as cheaper than a year of books.

> "Commoner." Across the duelling ring, a noblewoman in white and gold draws a slim sword. "Yield now, and you can carry my books for a year."
>
> The nobles on the rails laugh. Someone shouts her name like a toast: "Seraphine!"
>
> It is your first hour at the academy. The silver crest pinned over your heart opens a window of light:
>
> [Strength 2, Speed 2, Mana 2, Guard 2, Charm 2]
> [Unspent: 5. Spend them any time.]
>
> Hers reads Speed 8.
>
> The scarred instructor raises a hand. "First clean touch wins. Loser pays a point. Zero in any line goes home. Begin on ten."
>
> The rails start counting.
>
> Seraphine levels her blade at your heart. "Well? Yield, or spend them."

Three suggestions, three different moves:
- **Said:** "I won’t yield. And if I win, you carry mine."
- **Done:** I take my stance and hold all five points until she moves.
- **Risky:** I put all five points into Charm and ask her to dinner.

What each one does: refusing changes the stakes and makes Seraphine respect or resent the player in front of everybody. Taking a stance and holding all five points answers her "yield, or spend them" with neither: the count runs down, she comes in, and the points get spent mid-swing, at the moment she commits, which is the beat the fantasy label and the first style example sell. Only the risky card spends all five up front (the spec holds this), and it avoids "lunge" and other Cross Blades affordances so the parser does not read it as an attack. Charm 7 does nothing to her sword arm and makes the whole Ring hear the dinner invitation, which is either a disaster or the funniest thing that has happened on the sand this decade.

The six routes out of the first duel: yield (and serve her, protected by clause nine), fight her, refuse in front of everybody, haggle over her terms, find the clause that stops the count, or walk off the sand and forfeit.

## Major cast

Every character is an adult. Ages are canon and stated in hard canon.

### Lady Seraphine Aldric, 20
**Role:** the rival. First of this year's intake, heir of the empire's sword-masters.
**Crest:** Strength 5, Speed 8, Mana 4, Guard 6, Charm 6.
**Want:** an Aldric must take a point or a yield in her first week, or her father will not count her fit to command. She has to win something on day one.
**Secret:** she chose the scholar *on purpose*. A yield puts the scholar under clause nine for a year, so no other student can challenge them. Her insult is a shield. She will not say so, because her father would call it softness and the Society would find another way in.
**Second secret:** she has never lost because her father withdraws her from any bout her tutors think she might lose. She does not know how to survive losing.
**Tell:** if she wins, she takes the point from the scholar's highest line, never the lowest.
**Voice:** formal and exact. Full sentences, no contractions, duel vocabulary, calls the player "scholar". Says the protective thing as an insult. "Yield now, and you can carry my books for a year. It is a generous offer. Take it."
**Romance:** rivals first. Earned through respect, then trust.

### Mio Fenn, 21
**Role:** the maid-knight assigned to the scholar. Carries the bag, brings supper, knows the Ring Code clause by clause, never sets foot on the sand.
**Secret:** she was last year's scholar. She lasted nineteen days. Varro zeroed her Mana line with three proxies. She took the maid-knight oath to stay inside the walls and asked to be assigned to this year's scholar. Her old silver crest, reading Mana 0, is in a locked drawer below stairs.
**Second secret:** her grey servant's crest now reads Speed 7, from a year of running the servants' stair at night with a broom. Nobody reads a servant's crest.
**Want:** this scholar to last. Privately, to watch Varro pay a point in front of the Society.
**Limits:** maid-knights may not duel students. She will not break that oath. She will not be pitied.
**Voice:** deadpan, short, domestic. Reports facts like a housekeeper. "Supper is at seven. Your crest is at two. I can fix one of those." "I have put the pocket Code under your pillow, page six folded down. The stew is on the winch. The bolt is for using." She never opens on a clause number: that is Brannoch's shape, and the two would blur.
**Romance:** slow and practical. She shows care by doing things, and gets flustered only when thanked.

### Princess Isolde of Vael, 21 (called Isolde)
**Role:** the Emperor's third daughter, second-year, lives in the Glass Annex among orange trees her mother planted.
**Want:** the scholarship to survive the vote. She needs a scholar still standing at Week's End, and better, one who has won in front of the governors. Longer term, she wants a second, a champion who owes nothing to any house.
**Secret:** her mother was born a commoner. The motion to end the scholarship is aimed at Isolde as much as at the scholar. She has also counted the governors, five against, four for, three undecided.
**Limits:** she will not openly back a commoner before the vote, because it would make the scholarship look like royal favour. She will not be lied to twice.
**Voice:** unhurried, amused, speaks in offers and questions, begins hard things with "Suppose", reaches for growing things. "You lied to me once, gently. Do it twice and I prune."
**Romance:** a negotiation that turns real, if the player stops treating her as a vote.

### Instructor Halden Brannoch, 47 (called Brannoch)
**Role:** master of the Ring. Calls every duel. Gruff, scarred, impartial to the clause.
**Crest:** Strength 5, Speed 4, Mana 2, Guard 6, Charm 3, low for a former imperial champion, because of where the five go every year.
**Secret:** the five unspent points are his. Twenty-seven years of them (the first scholar's five were the founding Empress's). He has told nobody.
**Second secret:** the **Gate Counter**, the counter he invented as a scholar. It turns an opponent's higher number against them: the bigger the gap, the harder it lands. He teaches it only to somebody who has kept the Code when it cost them.
**Limits:** will never bend the Code for the scholar, not once. Will not take points back.
**Voice:** few words, barks clause numbers, says "Again." a lot. Verb first, subject optional. "Feet. Then blade. Then mouth. You have it backwards."

### Lord Ansel Varro, 22 (called Varro)
**Role:** the antagonist. Third-year, captain of the Rail Society, top of the challenge board, keeper of the Purse.
**Crest:** Strength 7, Speed 7, Mana 6, Guard 7, Charm 8.
**Want:** the scholarship ended at the vote his mother brought, and to look gracious while it happens. Win the Purse on this scholar inside nine days.
**Underneath:** his crest read Charm 3 the day he arrived; five of those points are his mother's tutors. He suspects he is mostly money, and a commoner who wins would prove it.
**Limits:** never fights outside the Ring; never puts clause fourteen in writing, except in the Purse, which he believes nobody else reads.
**Voice:** warm, generous, all money and wager language, calls the player "my friend". The menace is that he is pleasant. "Come up to the rail some evening. Drinks are on me. Everything is, eventually."

### Lord Piers Hallam, 20 (called Piers)
**Role:** second-year Society duellist with gambling debts, Varro's errand-runner, and the first name on the Ladder against the scholar.
**Secret:** he was one of the three proxies against Mio last year. He took the second of her three points, and Varro cleared forty crowns of his debt for it. It has been eating at him since.
**Want:** to get through tomorrow without anybody looking at him; privately, for somebody to make him stop.
**Limits:** will not put his name to anything in writing; will not fight outside the Ring.
**Voice:** fast, breathless, apologetic; starts with "Terribly sorry" or "The thing is". "Please don’t win. I mean, do whatever you like, obviously. But please don’t."
**Use:** the soft way into both the Ladder (get him to withdraw) and the Purse (get him to talk).

### Named off-stage (not cast cards)
- Lord Marshal Corvin Aldric, 54, Seraphine's father. Rides in on day five to watch Week's End.
- Headmistress Ottilie Brask, 66. Keeper of the seal and the transfer register.
- Lady Governor Maud Varro, 49, Ansel's mother, who brought the motion.

## Factions

| Faction | Starts | Ranks |
|---|---|---|
| The Academy (masters, Headmistress, the Code) | 10 | On sufferance · Enrolled (30) · Spoken for by the masters (60) |
| The Rail Society | -10 | A line in the Purse (-50) · Tolerated at the rail (0) · One of the forty (40) |
| The Twelve Governors | 0 | A motion on the table · Worth a second look (20) · Worth keeping (40) |
| Below Stairs | 20 | Another of them · One of ours (30) · Looked after (60) |

## Places

Every place is discovered from the start and every edge runs both ways.

| Place | What happens there | Edges |
|---|---|---|
| The Ring | Sand circle, stone rails, six ward-stones, the royal box. The opening. Practice blades; Brannoch's minute-glass | Great Hall, Training Yard, Rail Room, Infirmary |
| The Great Hall | Meals seated by rank (the scholar at the last seat by the door), the Ladder board of challenges | Ring, East Tower, Library, Founders' Hall, Below Stairs, Infirmary, Glass Annex |
| The Training Yard | Pells, straw targets, dawn drill under Brannoch; his room behind the pells | Ring, Gatehouse Room |
| The Rail Room | The Society's lounge above the Ring. The Purse on a lectern, members only by custom, not lock | Ring |
| The East Tower | Noble dormitory. Seraphine's rooms stacked with books; Varro at the top; Piers in a room he cannot afford | Great Hall |
| The Library | Three floors, the chained copy of the Ring Code, pocket copies to lend, two hundred years of duel records | Great Hall |
| Founders' Hall | Council chamber, twelve chairs, the Scholars' Board of twenty-eight names, the transfer register in a glass case | Great Hall |
| Below Stairs | Kitchens, laundries, the servants' stair, Mio's locked drawer | Great Hall, Gatehouse Room |
| The Gatehouse Room | The player's room: the old porter's room over the gate arch, the portcullis winch, twenty-seven names scratched into the windowsill | Below Stairs, Training Yard, Lowmarket |
| The Infirmary | Twelve white beds, where duels end up | Great Hall, Ring |
| The Glass Annex | Isolde's glasshouse among the orange trees, tea at five | Great Hall |
| Lowmarket | The town at the foot of the cliff stairs (25 minutes), the Broken Spur tavern, the square where the Open Trial was held | Gatehouse Room |

## The week (things the world does on its own)

- **Day 1, 10:30.** Once the first duel is over, Varro comes down from the rail with his silver pencil, shakes the scholar's hand and quotes their new odds in days; Piers holds his coat. The antagonist's first beat, for yielders as much as fighters.
- **Day 1, 13:00.** Three challenges against the scholar go up on the Ladder for tomorrow, Piers first. Cancelled if the scholar is serving Seraphine (clause nine).
- **Day 1, 19:00.** Mio brings supper to the gatehouse room and bolts the door on her way out.
- **Day 2, 06:15.** At dawn drill Brannoch's crest opens for a moment and reads low. Only for a player who has found the Training Yard.
- **Day 2, 10:00.** A royal page delivers Isolde's card in front of the Great Hall: tea at the Glass Annex, five o'clock.
- **Day 2, 14:30.** If the scholar did nothing at all about the Ladder: three forfeits, three points from one line, zero, home tonight.
- **Day 3, 21:00.** The Society takes over the Broken Spur in Lowmarket, the day count chalked on a slate, the Purse open on the table.
- **Day 4, 12:00.** Varro pins his own challenge to the Ladder for Week's End. If the scholar is serving under clause nine, he challenges Seraphine instead. Neither happens if the Purse is already exposed.
- **Day 5, 10:00.** Lord Marshal Aldric rides in to watch his daughter.
- **Day 6, 16:00.** The governors arrive and the Scholars' Board is uncovered. At 16:30, for a player who has been in Founders' Hall, the first name is read aloud and the hall turns to look at Brannoch.
- **Day 7, 14:00.** Week's End: open duels before the governors.
- **Day 7, 19:00.** The count in Founders' Hall.

## Five promises

1. **The count (finale).** Seed: a notice in the Great Hall that the governors sit on the seventh day. Payoff: twelve votes in Founders' Hall, and the scholar either still standing or not.
2. **Where the five came from (mystery).** Seed: Brannoch's crest reads low for a former champion, and he never opens it in front of the scholar. Payoff: twenty-eight entries in the transfer register, every one after the first in the same square hand.
3. **Seraphine's offer (rival).** Seed: she takes from the highest line, never the lowest. Payoff: clause nine, and a shield disguised as an insult.
4. **Nineteen days (relationship).** Seed: Mio knows the Code clause by clause and is never seen on the sand. Payoff: a grey crest reading Speed 7 and an old silver one reading Mana 0.
5. **Varro and the Purse (boss).** Seed: a silver pencil on the rail above the Ring, writing down every point the scholar spends. Payoff: the Purse on its lectern, proxies and payments in Varro's hand, and a day count with the scholar's name on it.

## Quests and routes

| Quest | Kind | Opens | Routes |
|---|---|---|---|
| Yield, or Spend Them | Main | At start | Yield; fight her; refuse; haggle; quote the clause; walk off |
| The Ladder | Main | Cards posted | Fight all three; prove clause fourteen; turn Piers; go back under her terms |
| The Highest Line | Side | First duel over | Beat her clean; keep her terms; ask her straight |
| Nineteen Days | Side | Mio's first supper | She tells you; find the crest; Piers confesses; then talk her into re-sitting, train on the stair, or leave her be |
| Tea at Five | Side | Isolde's card | Become her second; turn her down; play both sides |
| The Purse | Main | First duel over | Take it, get Piers to talk, or read it there; then expose it, buy in, or hold it over Varro |
| Again. | Side | First duel over | Keep turning up to dawn drill; keep the Code when it costs you. Grants the Gate Counter |
| Where the Five Came From | Lead | Brannoch's crest seen low | The register, the seal clause, or his word. Grants Give a Point; then give one back, tell the governors, or keep his secret |
| Week's End | Main | First duel over | Beat Varro with the counter; fight and lose; make him withdraw; stay off the sand. Then the count: kept by the Ring, the Purse, the five or the princess, or ended |

Two abilities are locked: **Gate Counter** (granted only by "Again.") and **Give a Point** (granted only by "Where the Five Came From").

## Ending space

| Ending | Rarity | What it is |
|---|---|---|
| The Second Week | Common | Still enrolled after the count, every line above zero, nothing grand settled |
| A Year of Books | Common | Yielded on day one, carried the books, and the year became something else. Not a defeat |
| The Last Scholar | Uncommon | The governors ended the scholarship; the player is the last one and stays |
| Zero in a Line | Uncommon | A line hit zero. Gone the same day |
| Bought In | Uncommon | Joined the Society and the Purse. Safe, and complicit |
| Down the Cliff Stairs | Uncommon | Walked out of the academy (reachable from turn 12) |
| Two Points Apart | Rare | Beat Seraphine and earned her; rivals to something more, up to one kiss |
| The Princess's Second | Rare | Isolde's champion, and the scholarship kept |
| Next Year's Scholar | Rare | Mio re-sits the Open Trial because of the player |
| The Purse Is Closed | Rare | The Purse laid before the governors; the Society disbanded |
| The Gate Counter | Unique | Brannoch's counter, Varro beaten before the governors, a second graduate in the making |
| Five Points Back | Unique | The scholar gives Brannoch a point back under the seal |

## Image plan

**Cover.** Seraphine alone in the foreground, waist up, in a white and gold duelling coat, a slim sword levelled past the viewer. Between her and the viewer floats the scholar's crest window: glowing abstract bars, no letters, no numbers. Her face stays clean of any glow. Behind her, soft: the sand ring, stone rails, a crowd, a royal box under a green awning, towers on a cliff. Title painted in the upper third: CREST ACADEMY, spelled exactly, with a small plain silver badge stamped with an open hand between the words (not a generic "crest emblem", which pulls the model toward known academy insignia). Adults only, described by costume and pose.

**Portraits.** Seraphine (white and gold, pale gold braid, sword), Mio (grey maid-knight uniform, plain and practical: ankle-length grey skirt, high collar, an apron over a light breastplate; short black hair, a broom held like a spear), Isolde (green and gold, dark curls, an orange half peeled in one ribbon), Brannoch (scarred, grey-shot beard, instructor's coat, brass minute-glass on his belt), Varro (burgundy and silver, easy smile, silver pencil behind one ear), Piers (lanky and fair, a Society coat a size too large, a deck of cards).

**Opening panel.** `story_crest_academy/opening`: Seraphine levelling her blade across the sand, the scholar's crest window glowing in the foreground. The alt starts with "Seraphine", her first name and the one she is called by. `story-checks.ts` and `opening-panel-art.ts` match on the first word of a character's `name`, which for "Lady Seraphine Aldric" is her title, so the checker prints a WARN here and the panel script reaches her through its last fallback, the first character with a card blurb. That is the right portrait as long as she stays first in the cast; the spec runs the script's own lookup and fails if anybody reorders it.

**Cover effects.** Every glow stays on the crest window, the blade and the title, never on her face. The title line carries the style (elegant bold fantasy-academy logo, silver with a gold edge), the placement (upper third) and the spelling (CREST ACADEMY).

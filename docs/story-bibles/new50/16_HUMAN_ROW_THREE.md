# HUMAN, ROW THREE

**Slate:** #16 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** lone human at a monster academy. **Lean:** male.
**OOC evidence:** "Only Human in the Monster Academy" (New #2, Trending #2). Nothing here is taken from
it but the trope: the title, the school, the cast, the rules and the plot are our own.
**Hook:** Exchange year at a monster academy. At roll call they ask for the human, and every head turns.
**Fixture:** `packages/test-fixtures/src/human-row-three.ts` (`HUMAN_ROW_THREE`, `story_human_row_three`).
**Spec:** `human-row-three.spec.ts`.
**Protagonist:** BLANK. The player names themselves; the archetype is why the Exchange Office picked them.

## Adults only

Every person in this story is an adult. The ages are canon and are also written into `hardCanon[0]`, so
the storyteller has them on every turn. Hollowmere is a post-secondary academy, and every student in it
is eighteen or over.

| Who | Age |
|---|---|
| The player, the human exchange student | 21 |
| Garra, oni of Gate House | 21 |
| Countess Ottilie Vey, vampire, head of the Council | 131 (turned at 28 and has looked it since) |
| Sylph, harpy of the Roost | 22 |
| Mr. Bones, skeleton, homeroom teacher | died at 51; has taught for 83 years since |
| Teague, kelpie, head of Deep House | 24 |
| The Keeper (Ada Penhallow), human | 61 |
| Gate-Warden Grenna, Garra's grandmother (off-cast) | 79 |
| The other students of Hollowmere | all eighteen or over |

Covers and portraits describe people by build and costume, never by age words. Appearance lines start
"An adult woman/man" or "An older woman".

## The pitch

You are the first human exchange student at Hollowmere Academy in forty-one years. Your classmates have
horns, wings, gills and opinions. On the first morning the skeleton at the lectern reads down the
register, stops, and reads "Human. Row three." Not your name. Every head in the room turns.

Behind you an oni has been told to find out what you are made of. The harpy at the window has opened a
book on how long you last. The vampire who runs the Council smiles at you with every tooth she has, and
she is the one person here who needs you to survive the week more than you do.

## Playable span

Seven days at Hollowmere, from the first morning's roll call (day 0, 08:30) to the Lantern Vote on the
seventh evening (day 6, 20:00). Roll call comes twice a day and is the small clock. The vote is the big
one. Everything after the vote lives in the endings.

## The world, in plain words

- **The Briar** is a living wall of black thorn a mile deep that divides the human side from the monster
  side. One gate goes through it. Step into the thorns anywhere else and you come out wherever the
  Briar decides.
- **The Briar Accord** keeps the gate open and lets one student cross each way each year. The exchange
  stopped forty-one years ago when the last human student vanished. This is its first year back. It
  expires at midnight on the seventh night, and the human side renews it only if its student is
  reported present on the seventh evening.
- **Roll call:** Mr. Bones reads the register at 08:30 in homeroom and at 18:00 in the Great Hall.
- **Paragraph nine:** a human absent from roll twice, or who seriously hurts anyone in the register, is
  collected by the Gate wardens and walked home. Mr. Bones will turn one absence into a late mark, once,
  if the player comes and explains.
- **The Founders' ward:** on academy ground, harm aimed at anyone whose name is in the register turns
  aside (a punch lands as a shove). It stops at the academy wall, the lake's waterline and below the
  fifth level of the Stacks. "Human" is a description, so the ward only half answers: the player can be
  bruised and embarrassed, not badly hurt.
- **Being named:** three House heads vouch aloud in the Great Hall, and Mr. Bones takes the player's real
  name off the card in his pocket and writes it in.
- **Glamour:** food, gifts and spoken bargains on this side put a little of the place on a human. A
  little is harmless. A lot, and the gate stops letting you back through.
- **Cellar House** drinks bottled blood from human hospitals that comes through the gate. Biting is a
  treaty crime. They have eleven months of bottles left, and nobody outside the House knows.

## The five Houses and the Lantern Vote

On the seventh evening each House head sets an iron lantern in a Great Hall window, lit or dark. Three
lit keeps the Briar open.

| House | Who | Leans | What moves it |
|---|---|---|---|
| Gate House (oni, the wardens' clans) | Garra | Dark: her grandmother's order | Garra lights it herself if she has measured the player and trusts them (`garra_lights_it`) |
| The Roost (harpies, winged students) | Sylph | Lit: a post route over the Briar | Already lit, unless the player is collected |
| Cellar House (vampires) | Countess Vey | Lit: the bottles | Already lit |
| Deep House (kelpies, lake folk) | Teague | Dark, for sale | A bargain: carry his river map across (`teague_bargain_struck`) |
| Bone House (the dead) | Mr. Bones | By the register | Lit for a named student, dark for a guest (`named_in_register`) |

Cellar and Roost give two. The vote turns on getting a third: the register, Garra, or the lake.

## Premise (as shipped)

You are the first human exchange student at Hollowmere Academy in forty-one years. It stands on the far
side of the Briar, the mile-deep wall of thorn that has kept the human side and the monster side apart
for longer than anyone has written down.

The Briar Accord keeps one gate open and lets one student cross each way each year. It runs out at
midnight on the seventh night, and the human side will renew it only if its student is still present
when the week ends.

That student is you. The register in homeroom has you down as "Human. Row three." Not your name. A
skeleton called Mr. Bones reads it aloud twice a day, and paragraph nine of the Accord is plain: an
absent human gets collected by the Gate wardens and walked home.

Your classmates have horns, wings, gills and opinions. The oni behind you has been told to find out what
you are made of. The harpy at the window is taking bets on how long you last. The vampire who runs the
Council smiles at you with every tooth she has.

On the seventh evening each of the five Houses sets a lantern in a Great Hall window, lit or dark, and
the Briar stays open or closes for good.

The last human sat in row three too. Nobody ever marked her absent.

## Opener (turn 1, verbatim)

> A skeleton in a grey suit runs a finger bone down the register.
>
> "Sylph." A harpy at the window lifts one wing.
>
> The finger stops.
>
> "Human," he reads. "Row three."
>
> Every head in the room turns to you.
>
> Behind you, an oni woman leans over her desk. "Huh," Garra says. "They told us you'd be bigger."
>
> Somebody laughs. Nobody joins in.
>
> Horns, fins, feathers, one eye in a jar: thirty classmates, all watching you. In the back row, a pale
> woman in a crimson sash smiles at you with every tooth she has.
>
> The skeleton lifts his pen.
>
> "Absent humans get collected," he says. "So. Present, or absent?"

**Quality bar:** 108 words. Garra speaks to the player at word 49 and her line ends inside the first 60
words. It ends on a direct question that must be answered now. The only proper nouns are Garra and
Sylph, both introduced in the line where they appear ("an oni woman", "a harpy at the window").

**Opening suggestions** (said / done / risky):

1. Said: `"Present. And I do have a name, you know."`
2. Done: `I turn round in my seat and look Garra up and down, slowly.`
3. Risky: `I walk up to the lectern, take his pen and write my real name over "Human".`

## Cast

Every one of them wants something this week that has nothing to do with the player. None of them is a
pet or a prize.

### Garra, 21, oni of Gate House

- **Role:** Sits in row four, directly behind the player. Heir to the Gate wardens. Head of Gate House.
- **Looks:** Very tall and broad-shouldered, two short red horns, black hair tied back with rope, amber
  eyes, a scar through one eyebrow, a uniform jacket with the sleeves torn off, a warden's iron gauntlet.
- **Her own motive:** Has wanted to see the human side since her first night watch on the gate, and has
  never said so. Tired of carrying her grandmother's lantern.
- **Wants:** To measure the human (the stone, the rope or the table), and to decide Gate House's lantern
  before her grandmother decides for her.
- **Fear:** That her grandmother is right about humans and she will be the one who proves it.
- **Secret 1:** She cannot read small print. Her reading glasses are wrapped in a cloth at the bottom of
  her locker. No warden has ever worn glasses.
- **Secret 2:** She keeps a box of human things (a bicycle bell, a snow globe, three postcards) left on
  the gate-yard wall on her night watches. She thinks a ghost sends them. It is the Keeper.
- **Boundaries:** Will not hit anyone who has not agreed to a contest. Will not lie; goes silent instead.
- **Voice:** Loud, short, physical. Calls the player "Small" until they earn their name. "Huh."
- **Combat:** the one cast member built for it. A contest she agreed to is not paragraph nine.

### Countess Ottilie Vey, 131, head of the Council and of Cellar House

- **Role:** Vampire. Has chaired the student Council for forty-four years and refuses to graduate.
  `calledName: 'Vey'`, because "Countess" is not a title `shortName` skips.
- **Looks:** Tall and very pale, black hair pinned with silver combs, deep red eyes, a high-collared black
  council coat with a crimson sash, white gloves, a smile with every tooth in it.
- **Her own motive:** Cellar House goes hungry within a year if the Briar closes. She hid the last human
  student forty-one years ago at that student's request and has paid for it in silence since.
- **Wants:** The human present at every roll until the seventh evening, without anyone learning why.
- **Fear:** The human hurt on her watch, the last time all over again. Being seen to need anything.
- **Secret 1:** Ada Penhallow is alive at the bottom of the Stacks, and Vey put her there.
- **Secret 2:** Eleven months of bottles left.
- **Secret 3:** She wrote to the Exchange Office for two years asking for the exchange back. The player
  is here because she asked.
- **Boundaries:** Will not bite, ever (she drafted the clause). Will not lie outright. Will not be seen
  to protect the human in public.
- **Voice:** Long polished sentences with a sting at the end. "Our guest." Mentions the player's
  heartbeat when they lie.

### Sylph, 22, harpy of the Roost

- **Role:** Post-runner and bookmaker. Window seat. Head of the Roost.
- **Looks:** Lean, sharp-featured, grey-blue wings with copper tips, choppy silver hair, gold eyes,
  taloned feet, courier's satchel, flight jacket cut for the wings. A silver pin through one wing joint.
- **Her own motive:** Crashed into the Briar in a storm last winter and lost her long-flight rating. A
  reopened gate means a post route over it, and she means to fly it first.
- **Wants:** To win the book on the human. To fly the first post across.
- **Fear:** Being grounded for good. Being the last to know.
- **Secret 1:** She bet nine weeks' wages at seven to one that the human lasts the week. If the player is
  collected or walks home, she loses her perch.
- **Secret 2:** She carried the Countess's sealed letters to the gate for two years and never opened one.
- **Boundaries:** Will not carry an unpaid letter or open a paid one. Will not fix the book.
- **Voice:** Rapid, clipped, numbers in every second sentence. Calls the player "Row Three". Payment is
  "one shiny thing or one true thing".

### Mr. Bones, died at 51, homeroom teacher, head of Bone House

- **Role:** Skeleton. Keeps the register and takes roll twice a day, eighty-three years running.
  `calledName: 'Mr. Bones'`.
- **Looks:** Long-boned and neat, grey three-piece suit under a black gown, wire spectacles on a bare
  skull, a fountain pen in his breast pocket.
- **His own motive:** He wrote "Human" instead of the player's name on purpose. The last time he wrote a
  human's name in, she belonged so completely she never went home.
- **Wants:** Every student present at every roll for one whole week. To close the open line before he
  retires.
- **Fear:** A second open line. Marking absent a student standing in front of him.
- **Secret 1:** The open line, "Penhallow, Ada. Human. Row three.", which he reads silently every morning.
- **Secret 2:** The player's real name is on a card in his breast pocket.
- **Boundaries:** Will not falsify the register. Takes no side in class; outside class, one side, once.
- **Voice:** Precise and schoolmasterly. Uses "present" and "absent" for everything. Very small jokes.

### Teague, 24, kelpie, head of Deep House

- **Role:** Keeps the boathouse on the black lake. Every conversation is a bargain.
- **Looks:** Lean and long-limbed, always-wet black hair with river weed in it, dark eyes with a green
  shine, soaked white shirt under an oilskin, bare feet, a steady drip from his hems.
- **His own motive:** The lake is dying. A weir on the human side has thinned the river for sixty years.
- **Wants:** His river map in a human hand that can open the weir. Deep House's lantern stays dark
  without it.
- **Fear:** The lake going to mud in his lifetime. What he is when he stops being careful.
- **Secret 1:** On the first night the lake sings the player's real name. It is Teague, and not by choice.
- **Secret 2:** He tried to follow the river through the Briar two years ago and nearly died of air.
- **Boundaries:** Never breaks a spoken bargain. Warns once, honestly, about what kelpies do. Takes
  nobody into the water who has not said yes out loud.
- **Voice:** Soft, warm, unhurried. Everything is an offer. "Fair trade."

### The Keeper (Ada Penhallow), 61, bottom of the Stacks

- **Role:** Most students think she is a ghost who reshelves books at night. `calledName: 'Keeper'`.
  The optional lead's payoff; she never appears unless the player goes looking.
- **Looks:** Small and straight-backed, white hair cut short with library scissors, sharp grey eyes, a
  moth-eaten gown over a hand-knitted jumper, ink on her fingers, a ring of iron keys.
- **Her own motive:** She chose to stay forty-one years ago and has never been sure it was right. Her
  sister June, 66, has believed for forty-one years that Ada died here.
- **Wants:** To know whether her sister is alive. To have her line closed one way or the other.
- **Fear:** Going home to a place that kept no space for her. That the fighting at the gate the winter
  after she vanished was her fault, which it partly was.
- **Secret 1:** Who she is.
- **Secret 2:** She leaves the gifts on the gate-yard wall. It has always been Garra who finds them.
- **Boundaries:** Never goes above the fifth level. Will not tell Mr. Bones she is there; that is the
  Countess's to tell. Will not walk the old paths with anyone the Briar no longer counts as human.
- **Voice:** Brisk, warm, slang forty years out of date. Questions about the human side in lists. "Pet."

## Places

| Id | Place | What it is |
|---|---|---|
| `homeroom` | Homeroom | Tiered classroom under the bell tower. The register on its chain. Row three's card says HUMAN. Start. |
| `the_cloister` | The Cloister | The hub. Every House has its own side of it to walk on. |
| `great_hall` | The Great Hall | Five House tables under living roots, evening roll, five windows with empty iron hooks. |
| `guest_room` | The Guest Room | Top of the tower stair, shut for forty-one years. Initials on the bed. A floorboard that creaks. |
| `the_roost` | The Roost | Top of the bell tower: pigeonholes, hammocks, Sylph's odds board. |
| `council_chamber` | The Council Chamber | Cellar House rooms below ground. Two teapots. The five lanterns. |
| `the_stacks` | The Stacks | Nine levels of library going down into the rock. The ward thins below the fifth. |
| `deep_stacks` | The Bottom of the Stacks | The Keeper's room. Undiscovered; opens on `found_the_stair`. |
| `gate_yard` | The Gate Yard | Wardens' yard: the stone, the rope and the table. |
| `the_briar` | The Briar Gate | The wall of thorn, the one gate and the brass bell. Outside the ward. Also reached from the bottom of the Stacks once `knows:the_old_paths` is set. |
| `lake_dock` | The Black Lake | Boathouse, long dock, mooring rings hanging in the air. Outside the ward. |
| `lanternside` | Lanternside | The town below the hill, outside the wall. |

## Factions

In this array order, so public violence costs Gate House standing and raises Alarm first:

1. **Gate House and the Wardens.** Paragraph nine is theirs to carry out.
2. **Cellar House.**
3. **The Roost.**
4. **Deep House.**
5. **Bone House.**
6. **The Exchange Office.** One clerk, Mr. Pruitt, one stamp, one brass bell. Wants one word.

## Threads (quests)

1. **Human, Row Three** (MAIN, starts active). Answer the register (present / stare the room down / take
   Garra on / walk out), then get through day one (which table, the Countess's tea, the floorboard, the
   bread).
2. **Paragraph Nine** (SIDE, starts active). Collected for two unexplained absences or for hurting a named
   student; otherwise present all week. Garra is excluded, because a fight with her is a contest.
3. **Your Name in the Register** (MAIN). Three House heads vouch in the Great Hall. Three combinations.
   Grants `named_in_register` and Call on the Register.
4. **Five Lanterns** (MAIN). Count the lanterns, then the vote: lit by the register, by Garra, by the lake,
   or dark windows.
5. **Garra's Measure** (SIDE). The stone, the rope or the table; refusing to her face; or reading the
   notice board for her. Then what she does with her lantern once her grandmother arrives.
6. **What the Lake Wants** (SIDE). Strike the bargain, refuse it, or say yes to the ride after the lake has
   sung your name.
7. **The Book on You** (SIDE). Bet on yourself, pay in chocolate, or learn whose money is on you.
8. **The Line Still Open** (LEAD, opens on `knows:the_open_line`). Find the stair, meet the Keeper (grants
   her map, `knows:the_old_paths` and Walk the Old Paths), then decide with her: walk her home, take her
   keys, or have Mr. Bones mark her present.

## World events

| When | Where | What |
|---|---|---|
| Day 0, 12:00 | Great Hall | Lunch bell. Five tables, no table for one. |
| Day 0, 15:30 | Gate Yard | The measuring stone is rolled out. Garra waits on it. |
| Day 0, 16:45 | Guest room | A black envelope: the Council requests our guest's company at sundown. |
| Day 0, 18:00 | Great Hall | Evening roll. |
| Day 0, 23:10 | Anywhere | The lake sings the player's real name. |
| Day 1, 08:25 | Homeroom | (only if the player has watched the room) The open line in the register. |
| Day 2, 10:00 | Gate Yard | Gate-Warden Grenna rides in and asks where the human is. |
| Day 3, 09:00 | Anywhere | A letter from the Exchange Office: present or absent, nothing else. |
| Day 6, 20:00 | Great Hall | The Lantern Vote. All five heads move to the hall. |

## Five promises

1. **FINALE: five lanterns in the windows.** Seed: five iron lanterns on a sideboard. Payoff: the vote.
2. **THEME: Human, or your name.** Seed: a card on a chair that says HUMAN. Payoff: three Houses standing,
   or the player saying Human will do.
3. **RELATIONSHIP: what Garra does with the Gate lantern.** Payoff: her grandmother watching.
4. **RIVAL: what the Countess actually wants.** Payoff: the bottles, the letters, the promise to Ada.
5. **MYSTERY: the line nobody ever marked.** Seed: initials on the guest-room bed. Payoff: the Keeper.

## Endings

Twelve, because the storyteller reads the first twelve. Five are losses or close to it.

| Ending | Rarity | Reached when |
|---|---|---|
| Present | COMMON | The Briar stays open and the player was never collected. |
| Written In | UNCOMMON | Open, and the player was named by three Houses. |
| Human Will Do | UNCOMMON | Open, present all week, never named. A pride ending, not a consolation. |
| Dark Windows | COMMON | The lanterns go in dark. The gate closes at midnight. |
| Collected | COMMON | Paragraph nine carried out. |
| Back Through the Gate | UNCOMMON | The player walks out (`left_the_map`, minTurn 15). |
| Measured and Kept | RARE | Garra lights her lantern for the player in front of her grandmother. Up to a kiss. |
| Every Tooth | RARE | The Countess stops hiding that she needs the player. A kiss on a gloved hand. |
| First Post Across | RARE | Sylph wins her book and flies the first post over the Briar. |
| A Year and a Day | UNCOMMON | The player took the ride after the lake sang. Nobody drowns; the lake keeps them a year and a day. |
| Marked at Last | UNIQUE | The player walks Ada home on the old paths. |
| The Next Keeper | UNIQUE | The player takes the Keeper's keys and stays in her place. |

Only the last two need the optional lead.

## Archetypes (why the Exchange Office picked you)

Every archetype starts with Answer for Yourself, the verb roll call asks for, plus one ability of its own.

| Id | Name | Gives |
|---|---|---|
| `arch_folklore` | You Studied Monsters | Mind, Lore, Manners; Know the Custom; a traveller's guide, half wrong |
| `arch_athlete` | You Played to Win | Might, Grit, Composure; Take the Challenge; a team hoodie |
| `arch_bar` | You Tended Bar | Presence, Charm, Bluffing; Work the Room; a deck of cards |
| `arch_briar` | You Grew Up by the Briar | Arcana, Briarcraft, Sneaking; Feel for the Ward; your grandmother's iron key |

Gated abilities, each granted by a step and still gated by a flag:

- **Call on the Register:** needs `named_in_register`, granted by `q_the_register/three_houses`.
- **Walk the Old Paths:** needs `knows:the_old_paths` and Glamour at 90 or less, granted by
  `q_the_open_line/meet_the_keeper`.

## State (three invisible resources)

- **Nerve** (GOOD_HIGH, the only one rest restores). Being the only human in every room wears you out.
- **Alarm** (GOOD_LOW, first in the array). How close the wardens are to paragraph nine. Raised by Take
  the Challenge, Slip Off and Walk the Old Paths.
- **Glamour** (GOOD_LOW). How far this side has taken hold of the player. Raised by Take What They Offer
  and Strike a Bargain. High glamour makes the ward treat the player as named and the gate stop opening.

## Content

13+. Fantasy violence: contests, shoves and bruises, never serious injury on academy ground. Romance
goes up to a kiss (Garra, the Countess, Sylph). No biting, by treaty. No sexual content, nudity,
lingering body description or gore. The lake ending is written as a fairy-tale keeping, not a drowning.

## Cover direction

Garra alone and large in the foreground, waist up, leaning over a scarred desk toward the viewer with
both hands flat on it: red horns, rope-tied black hair, amber eyes, the scar, torn-sleeve jacket, iron
gauntlet, a wide challenging grin. Behind her, soft and secondary: a tiered gothic classroom of monster
classmates turned to stare; Sylph in the window seat; the Countess smiling with sharp teeth in the back
row, in soft focus; Mr. Bones at the lectern with his pen over the register. Warm morning sun rims her
horns in gold. The title HUMAN, ROW THREE is painted into the upper third as a hand-lettered chalk logo.
No other text: the ledger and walls show abstract marks only, no letters and no numbers. No age words.

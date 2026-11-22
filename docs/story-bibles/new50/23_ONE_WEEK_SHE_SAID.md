# One Week, She Said

**Slate:** #23 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** forced proximity; the person who bullied you needs a room. **Lean:** male.
**OOC evidence:** "Your Highschool Bully Needs a Place to Stay" 22.6K; BULLY is OOC's #10 search. The
trope is shared; the title, characters, setting, ages and plot are not. This story starts eight years
later, with adults.
**Title collision search** (anime, webtoon, manhwa): no exact hit. Nearest are *One Week Friends* (2014
anime, a different premise) and the manhwa *Two Weeks and Counting* (a man lets a woman stay for two
weeks). Close in shape, not a collision.
**Shelf line:** Your old tormentor. Your sofa. One week.
**Hook:** Eight years ago Mika Arai named you Footnote and the whole class laughed. Tonight she is soaked
on your doorstep with a duffel bag, an old cat and nowhere else to go. One week, she says.
**Fixture:** `packages/test-fixtures/src/one-week-she-said.ts` (`ONE_WEEK_SHE_SAID`, `story_one_week_she_said`).
**Spec:** `one-week-she-said.spec.ts`. **Asset key prefix:** `story_one_week_she_said`.
**Protagonist:** BLANK. The player names themselves and picks what the last eight years made of them.

## Adults only

Every person in this story is an adult. The ages are canon and are also written into `hardCanon[0]`, so
the storyteller has them on every turn.

| Who | Age |
|---|---|
| The player, an office worker at a freight company | 26 |
| Mika Arai, the classmate who made school a misery for them | 26 |
| Jun Kuroda, the player's coworker | 27 |
| Aya, the player's older sister, a hairdresser | 29 |
| Kenta Yasuda, Mika's ex-fiancé | 30 |
| Fumiko Tamura ("Mrs. Tamura"), the landlady | 71 |
| Daisuke Ueno, old classmate, reunion organiser | 26 |

The bullying happened in the final year of school, eight years ago, when the player, Mika and Daisuke
were all eighteen. The story never shows that year as a scene or a flashback, and nobody is described
as they looked then: no uniforms, no classrooms. It comes up only as memory, in adult voices, and the
slideshow photographs are described by place and expression, never by clothes (`hardCanon[1]`).
Appearance lines start "An adult woman/man" or "An older woman", with no age words.

## The pitch

Eight years ago Mika Arai made you the joke of the class. Tonight she is soaked on your doorstep at
twenty to midnight with a duffel bag, an old cat and nowhere to go. She has left her fiancé, everything
was in his name, and she gets the keys to a studio of her own next Sunday at ten. She asks you, of all
people, for one week on your sofa.

The bet is that **the player holds all the power on turn one** and the story is about what they do with
it. Forgiveness is one destination among thirteen. Nothing herds the player toward it. Shutting the
door, making her pay, exposing her at the reunion, and eight polite nights with nothing said are all
authored routes with their own endings.

**Why tonight** (canon, because it is the first thing players ask): for three nights she slept in the
staff room of her hotel with the cat hidden in a laundry cart. Tonight the night manager found him and
told her to be gone by eleven. Every friend she has is Kenta's friend first, so at the bus stop she
messaged somebody she will not name (Aya), and got this address.

## Playable span

Eight days and eight nights. It opens Saturday 23:40 in late autumn and the last clock is the
following Sunday at 10:00. Production's clock header only says "Day N", so `hardCanon` maps it: Day 1
is the arrival Saturday, Day 7 Friday, Day 8 Saturday, Day 9 Sunday, and "next Sunday" always means
Day 9. Four clocks run under the week, and the player can switch each one off or meet it early:

1. **The ID card.** The letting agency needs a copy by **Friday 17:00**, or the studio goes to the next
   name on the list (`we_lease_deadline`, cancelled by `documents_sorted`).
2. **Kenta finds the building.** Through a location share Mika has forgotten. **Wednesday 21:15**
   (`we_kenta_at_the_stairs`, cancelled by `location_sharing_off` or `kenta_done`).
3. **The reunion.** **Saturday 19:00**, upstairs at The Red Lantern. The slideshow runs at nine and
   slide thirty-one is the photo of the player on the back stairs.
4. **The keys.** **Sunday 10:00**, at a studio door across the city.

## The world, in plain words

A modern city with Japanese names and nothing supernatural. **Hinode Court** is an old two-storey
walk-up with an open-air walkway. The player lives in **2C**, a one-bedroom built for one person: one
bathroom, one sofa that folds out into a bad bed, one umbrella. The building has a no-pets clause, and
the landlady sweeps the walkway at half past five every morning.

Across the road is **Kitamachi Arcade**, a covered shopping street running to the station. It has the
bus stop, a convenience store, a laundromat, a ramen counter with Jun's apartment above it, and the
business hotel where Mika works the front desk. From the arcade, trains run to the player's office, to
Aya's salon across the river, to Kenta's waterfront tower, and to Mika's new studio.

## Premise (as shipped)

> Eight years ago, in your final year of school, Mika Arai decided you were the joke. She named you
> Footnote, because you were quiet and at the bottom of every page and anyone could skip you. She read
> your notebook aloud to the class and made sure they laughed. You ate lunch on the back stairs for the
> rest of that year, and you have not said her name since.
>
> Tonight it is raining, it is twenty to midnight, and she is standing at the door of your one-bedroom
> apartment in the city. Soaked through. A duffel bag at her feet, an old cat in a carrier, and the last
> bus already gone.
>
> Three days ago she walked out on her fiancé. Everything was in his name: the apartment, the account,
> the locked drawer with her ID card in it. She has a studio of her own from next Sunday, as long as she
> gets that card back before the agency closes on Friday. Until then she has nowhere that takes a cat.
>
> So she is asking you, of all people, for one week on your sofa.
>
> What happens next is yours. Close the door in her face. Let her in and make her earn every night. Let
> her in and never mention school. Make her say what she did, out loud, before Saturday's class reunion,
> where everyone who laughed will be watching.
>
> One week, she said. It sounded like a promise. It is also a deadline.

## Opener (turn 1, verbatim)

> "I know I don't get to ask."
>
> Mika Arai is at your door at twenty to midnight, soaked through, rain running off her hood. Duffel bag
> at her feet. Cat carrier hugged to her chest.
>
> Eight years ago she named you Footnote, and the whole class laughed. Your stomach still knows her
> before you do.
>
> "One week," she says. "I get keys to my own place next Sunday. Nowhere else will take the cat."
>
> Behind her, the last bus pulls away from the stop.
>
> The cat yowls.
>
> "I'll sleep on the floor. I'll be gone before you're up. I won't say a word about before." She has
> practised this. It still comes out too fast.
>
> "So. Yes or no?"

**Quality bar:**
- Mika speaks to the player in the first line and is named in the next sentence.
- "One week," she says lands at word 59, inside the first sixty.
- It ends on a yes-or-no question that needs an answer now.
- It is 119 words (limit 120).
- The only proper nouns are Mika Arai, Footnote (introduced in the same sentence as the name she gave
  the player) and Sunday.

**Opening suggestions** (said / done / risky):

1. Said: `"Why my door, Mika? I want the real answer first."`
2. Done: `I take the cat carrier out of her arms and step back to let her in.`
3. Risky: `I hold up my phone. "Say what you did to me. On camera. Then you can come in."`

The spec runs all three through the rule-based parser, and none of them reads as an attack.

## Cast

Each of them wants something that has nothing to do with the player. That keeps them from being an
audience.

### Mika Arai, 26, the classmate at the door

- **Role:** She made the player's final year of school a misery. Now she works the early shift on the
  front desk of a business hotel by the station.
- **Looks:** Medium height, a sharp chin, steady dark brown eyes, and dark straight hair cut bluntly at
  the jaw. She wears a man's oversized navy parka zipped to the collar over a white front-desk blouse,
  sleeves rolled four times. ("Blouse", not "uniform": the portrait painter reads that word as school.)
  She has a cracked silver phone and holds a battered grey cat carrier like the last thing she owns.
- **Her own motive:** To get out of Kenta's life with her documents, her grandmother's ring and her
  half of the wedding fund. To be out of the player's life by Sunday at ten with nothing owed either way.
- **What she wants from the player:** Nothing beyond the sofa, and she has promised it. She will not
  ask for anything twice.
- **Fears:**
  - That she is still exactly who she was at eighteen and has only got better at hiding it.
  - Going back to Kenta because it is easier.
  - Being forgiven too fast, so that it does not count.
- **Secrets:**
  1. **The torn page.** On the day she read the player's notebook to the class she tore out one page, a
     pencil drawing of rain on a window. It is folded into eighths in her duffel. She gives it back only
     after an apology the player has heard to the end. A player who goes through her bag finds it
     without the moment.
  2. **Who sent her.** Aya gave her the address. Mika will not give Aya up.
  3. **That year.** Her father's shop had failed and her family was living above a relative's garage.
     She picked the quietest person in the class because controlling something felt like air. She has
     decided this is an excuse and will not use it until she has apologised without it.
  4. **The bus stop.** Twice since spring, on her way to her shift, she has seen the player at the bus
     stop across the road and looked away. She did not know which building was theirs until tonight.
     A free, easy reveal if the player asks how she knew the building.
- **Voice:** Short sentences with the corners filed off. She is formal with the player because anything
  casual feels like a liberty. Her jokes are dry and at her own expense. When the old cutting register
  slips out it lasts half a sentence, and she corrects herself out loud.
  - "I scrubbed the bathroom. Don't thank me. It's rent, and it isn't enough rent."
  - "I picked Footnote because it was clever and I knew it would stick. I was proud of it. That's the
    part I can't get past."
- **Boundaries:**
  - She never asks twice.
  - She never discusses Kenta in front of anyone but the player.
  - She never cries in front of the player, until the time she does.
  - She will not let the player be kind about the past before she has said it properly.

### Jun Kuroda, 27, the coworker at the next desk

- **Role:** The player's closest friend at Tsubame Logistics, and the only person they ever told about
  Mika. He lives above the ramen counter at the end of their street.
- **Looks:** Tall and broad, with a rumpled work shirt, a lanyard, round glasses pushed up into his hair,
  and a convenience-store bag always hooked on two fingers.
- **His own motive:** He wants the player at the reunion so the class sees who they are now. He wants
  Mika gone on Sunday, or to know exactly why not.
- **Secret:** His own school was worse, for three years. He survived by becoming the loudest person in
  every room. Mika stands in for somebody he will never get to shout at.
- **Voice:** Fast, loud and run-on. He asks rhetorical questions and answers them himself, calls the
  player "captain", and says "okay" twice before anything serious.
  - "Do I forgive her? Who asked me? Nobody asked me. Ask me anyway."
- **Boundaries:** He will not lie to the manager, and he will lie to anybody else. He will not pretend
  it is fine the first time he is in a room with her.

### Aya, 29, the older sister

- **Role:** Runs a two-chair salon across the river and lives up the outside stairs from it. She is
  bossy, and it is mostly love.
- **Looks:** Small and quick, with a sleek two-tone bob, a black salon apron, white trainers, four silver
  cuffs up one ear, and thinning scissors always somewhere on her.
- **Her own motive:** She watched that year happen to the player and could not fix it. She has decided
  this is the fix, knows it was not her decision to make, and wants the player to stop calling
  themselves what Mika called them.
- **Secrets:**
  1. Mika has been her client for a year. Every six weeks Mika talks about "a person I did something
     terrible to". Tonight Aya sent her the address from a wedding three hours away. Her appointment
     book on the salon counter gives it away.
  2. She cuts the hair of Harbourline Tower's night concierge, and can get anyone up to the fourteenth
     floor with one call.
- **Voice:** Big-sister commands phrased as observations. She uses the player's full name when she means
  it, and answers questions she dislikes with a question about their eating.
  - "Did I give her your address? Ask me properly and I'll answer properly."
- **Boundaries:** She will not lie to a direct question, but dodges everything short of one. She will
  not take sides in front of Mika.

### Kenta Yasuda, 30, the reasonable man

- **Role:** Mika's ex-fiancé. He is a sales manager at Harbourline Tower and everybody's favourite dinner
  guest. Everything Mika owned was in his name.
- **Looks:** Tall and neat, in a navy suit that fits too well for a weekday evening, with a good watch, a
  pale grey cashmere scarf folded the same way every time, and a smile that reaches about halfway to his
  eyes.
- **His own motive:** He is two months behind on 1406 and needs Mika's half of the wedding fund to cover
  it before his firm finds out. He wants to be seen to have been patient, and to have been the one who
  ended it.
- **Secrets:**
  1. Mika's phone has shared its location with him for two years.
  2. The arrears. The unopened post on his console table proves both.
- **Voice:** Soft, warm and unhurried. He uses the player's first name often and frames every demand as
  concern for somebody else. He never swears and never finishes an argument he is losing.
  - "Go on, hit me, if it helps. Then we can both explain it to the police."
- **Boundaries (hard canon):** He never raises a hand or his voice. His menace is money, paperwork and
  other people's opinions. That keeps a controlling ex inside a 13+ rating without softening what he is.

### Fumiko Tamura, 71, the landlady ("Mrs. Tamura")

- **Role:** Owns Hinode Court and lives in 1A. She sweeps the walkway at half past five every morning
  and enforces a no-pets clause.
- **Looks:** Tiny and straight-backed, with silver hair set in waves, a quilted housecoat over a pressed
  blouse, and a bamboo broom she holds like a sentry's spear.
- **Her own motive:** She was widowed two winters ago. The building is the only thing left that needs
  her, and her son wants to move her across the city "for her own good".
- **Secret:** Her late husband wrote the no-pets clause because he was allergic. She has fed four strays
  behind the bins for thirty years, from a bag of cat food in her shoe cupboard.
- **Card:** says only the building, the broom, "Two-C" and the no-pets clause. The strays stay off the
  card, because the narrator reads `cardBlurb` as public framing.
- **Voice:** Formal, old-fashioned and precise. She calls the player "Two-C".
  - "My husband wrote that rule. He was allergic to cats and to fun, God rest him."
- **Boundaries:** She will not be lied to twice. She will not put anybody out in the rain, whatever the
  lease says. **If the player shuts the door, she takes Mika in** and gives her the spare room directly
  under the player's floor.

### Daisuke Ueno, 26, the man with the slideshow

- **Role:** Old classmate who sells used cars. He is organising the eight-year reunion and still calls
  the player Footnote, thinking they like it.
- **Looks:** Stocky and sunburnt, in a loud checked sports jacket, with teeth whitened a shade too far
  and a phone held out at arm's length for a group selfie.
- **His own motive:** The reunion has to be the best night anyone has had since school, because nothing
  since school has been his best night.
- **Secret:** He took the photo of the player on the back stairs. Mika made it famous, but he made it,
  and it is slide thirty-one.
- **Voice:** Salesman-bright. He has a nickname for everybody and answers every silence with a toast.
  - "Footnote! No way. Look at you, you're a whole paragraph now."
- **Boundaries:** He will not cancel the reunion, and will not admit anything in front of the class.

## Places

| Id | Place | What it is |
|---|---|---|
| `apartment_2c` | Apartment 2C | The player's one-bedroom. The start. The old notebook, the reunion postcard and the one umbrella are here. |
| `the_walkway` | The Outside Walkway | The open-air second-floor corridor, with a vending machine and a view of the bus stop. Kenta turns up here. |
| `tamura_flat` | Mrs. Tamura's Rooms, 1A | The landlady's rooms, a spare room kept made up, and the cat food in the shoe cupboard. |
| `the_arcade` | Kitamachi Arcade | The covered shopping street: bus stop, convenience store, laundromat, ramen counter, Mika's hotel. The hub. |
| `the_riverbank` | The River Embankment | A running path and a bench under the railway bridge. Mika runs here before dawn. |
| `the_office` | Tsubame Logistics, Fourth Floor | The player's job. Jun at the next desk; the quarterly review on Friday. |
| `aya_salon` | Aya's Salon | Two chairs, a radio and a paper appointment book. Ten minutes' walk from the towers. |
| `kenta_tower` | Harbourline Tower | A glass waterfront tower: show-suite, concierge desk, and lifts that need a card. |
| `unit_1406` | Apartment 1406 | Kenta's apartment, reached only once `way_into_1406` is set. The blue folder and the unopened post. |
| `the_izakaya` | The Red Lantern | Yakitori bar with the reunion room upstairs. Daisuke and the slideshow drive. |
| `the_new_studio` | The New Studio | Mika's studio across the city. Keys on Sunday at ten. |

Every place has at least one way in. 1406 has exactly one, and it is locked until the player finds a
way up: Kenta's invitation, a bluff at the desk, or Aya's phone call.

## Factions

- **Hinode Court.** First in the array, so public violence costs standing with the building first, and
  the landlady hears within the hour.
- **The Class Chat.** Thirty-four classmates. Rank ladder: Footnote → The one who turned out fine → The
  one everyone wants to talk to.
- **Tsubame Logistics.** The player's employer. The quarterly review is on Friday morning.

## Threads (quests)

1. **One Week, She Said** (MAIN, starts active).
   - **At the door:** let her in on terms, let her in quietly, make her say it first, carry her bag in,
     or shut the door.
   - **Why your door:** she tells you, you read her phone, Aya tells you, or Kenta turns up first. Or you
     decide not to ask.
   - The second step grants **Stand Between Them** (`face_kenta`).
2. **Everything in His Name** (MAIN). Getting the blue folder off the fourteenth floor before five on
   Friday.
   - Ways up: Kenta's terms, bluffing the desk, Aya's call, or replacing the documents legally and
     leaving the ring behind.
   - Ways to get it: stand between them, back Mika while she asks for it herself, or take it while he is
     downstairs.
3. **The Reasonable Man** (MAIN).
   - First, how he finds her. The answer is a location share on her phone.
   - Then how it ends: stand between them, she ends it herself, expose his story with the arrears
     letters, or she goes back to him.
4. **Footnote** (MAIN).
   - **What is owed:** hear her out, sit with her until she says it unasked, make her pay instead, or let
     the week run out unsaid.
   - **The reunion:** walk in with her, tell the room yourself, pull slide thirty-one, expose her, or
     stay home.
5. **Next Sunday, Ten O'Clock** (MAIN). The last morning: ask her to stay, give her the spare key, carry
   her boxes, let her go on time. If the agency closed, there are no keys.
6. **Two-C, No Animals** (SIDE). The landlady and the cat. Tell the truth, lie once, or find her strays.
   If the player shut the door, the follow-up step is the week spent with Mika living downstairs.
7. **Jun Has Opinions** (SIDE). Tell Jun, be found out, or lie to him. Then one evening with both of them
   in the same room.
8. **Who Gave Her Your Address** (LEAD). Aya, her appointment book, and what the player says to their
   sister about it.
9. **The Torn Page** (SIDE). The stub in the notebook, and the page in her duffel.

## World events

| When | Where | What |
|---|---|---|
| Sun 05:30 | Walkway | (door shut) Mrs. Tamura finds Mika asleep on the top step and takes her into 1A. |
| Sun 07:10 | Walkway | (she stayed) The cat yowls; the broom stops mid-sweep. |
| Sun 13:00 | 2C | Aya turns up with groceries nobody ordered, "just passing". |
| Mon 08:55 | Office | Jun drops a rice ball on the keyboard: "you look like you slept in a bus shelter". |
| Tue 19:40 | 2C | (she stayed, Jun not told) Jun knocks with leftovers and Mika opens the door. |
| Wed 12:00 | Class chat | Final headcount: the player marked maybe, Mika marked coming (Daisuke put her down himself). |
| Wed 21:15 | Walkway | Kenta at the bottom of the stairs with flowers, unless the location share is off. |
| Wed 21:30 | Her phone | "Thursday, eight o'clock. Come and collect your things. In person." |
| Thu 22:00 | Class chat | Slideshow preview. The back-stairs photo is not in it, and everyone knows it exists. |
| Fri 10:00 | Office | The player's quarterly review. |
| Fri 17:00 | Agency | The shutter comes down. No ID card on file means no studio. |
| Sat 19:00 | The Red Lantern | The reunion. Slideshow at nine. |
| Sat 23:30 | 2C | (she stayed) The last night. The duffel is packed by the door and the cat is asleep on the player's side. |
| Sun 10:00 | The studio | A letting agent with a key on a paper tag. |

## Five promises

1. **FINALE: whether she is still in your life after Sunday at ten.** Seed: a key on a paper tag, and a
   spare key nobody has ever had. Payoff: the studio doorstep.
2. **RELATIONSHIP: what she owes you, and whether you want it paid.** Seed: her promise on the step not
   to mention the past. Payoff: the apology in full with no excuse, or a week in which it was never said.
3. **RIVAL: the reasonable man across the river.** Seed: forty-one polite messages on a cracked phone.
   Payoff: Kenta at the bottom of the stairs with flowers, and the locked drawer on the fourteenth floor.
4. **MYSTERY: why your door, of every door in the city.** Seed: she knew the floor and the time of the
   last bus. Payoff: Aya's appointment book, "M. Arai, cut and colour".
5. **THEME: the page she tore out.** Seed: the stub in the old notebook. Payoff: rain on a window, folded
   into eighths, carried through four apartments.

## Endings

Thirteen. Five are losses or near-losses, and none is written as a punishment. The walk-away is last,
because the storyteller reads only the first twelve and the engine detects that one by itself.

| Ending | Rarity | Reached when |
|---|---|---|
| One Week, Exactly | COMMON | She leaves on time with nothing owed either way. |
| Eight Polite Nights | COMMON | Nobody ever said it. She leaves the exact rent and no note. |
| Back Across the River | COMMON | She goes back to Kenta, and the player had a hand in it. |
| Paid in Full | UNCOMMON | The player made her pay every night. Her envelope says "even". |
| Thirty-Four Classmates | UNCOMMON | The player exposed her at the reunion. Revenge, and it worked. |
| Nobody Calls You That Now | UNCOMMON | The reunion goes the player's way and the nickname dies. |
| The Door Stayed Shut | UNCOMMON | She spent the week downstairs and the player never knocked. |
| One More Week | UNCOMMON | The lease lapsed. Sunday morning, and she has to ask a second time. |
| The Spare Key | RARE | Friends, on purpose: the spare key changes hands at the studio door. |
| Stay Another Week | RARE | Romance after a real apology, slow, up to a kiss. She keeps her studio. |
| Everything in His Name | RARE | The folder is back, and Kenta's story falls apart in front of his friends. |
| Rain on the Window | UNIQUE | She gives the page back, and the player draws again. |
| You Left Her the Keys | UNCOMMON | The player walks out of their own apartment for the week (`left_the_map`, min turn 18). |

## Archetypes (what the last eight years made of you)

All four are twenty-six and work at the same freight company. The setup screen says the choice "is fixed
for the whole story, so it cannot be changed later". It does not decide whether the player forgives her.
Each archetype starts with a different ability first, which is what the production storyteller reads
as its "Can:" line, and all four start with **Set the Rules** second: the terms of the week are the one
power every version of the player holds on turn one, so it is the story's system ability.

| Id | Name | Gives |
|---|---|---|
| `arch_steady` | You Got Steady | Might and Resolve; Composure, Legwork; Haul It, Set the Rules; two canned coffees |
| `arch_paperwork` | You Run the Paperwork | Mind and Resolve; Paperwork, Attention; Do the Paperwork, Set the Rules; office standing |
| `arch_talker` | You Learned to Talk | Presence and Agility; Nerve, Warmth; Bluff Your Way, Set the Rules; class and office standing |
| `arch_drawing` | You Still Draw | Arcana and Mind; Memory, Attention, Cooking; Read Her, Set the Rules; the old notebook |

## Abilities

Each one is an ordinary move a person can make at a doorway, a desk or a dinner table:

- **Talking:** Say It Plain; Name What She Did; Keep the Peace; Set the Rules; Shut the Door.
- **Using the past against her:** Hold It Over Her; Make It Public.
- **Staying:** Stay In It.
- **Practical:** Feed the Household; Do the Paperwork; Haul It; Read Her.
- **Underhand:** Bluff Your Way; Go Through Her Things.
- **Gated:** Stand Between Them, which opens once the player knows about Kenta.

The cruel and underhand moves all cost **Her Guard** or **Gossip**, so they always work and are always
paid for.

## State (three invisible resources)

- **Energy** (GOOD_HIGH, the only resource rest restores). A work week with a stranger in the bathroom at
  six.
- **Gossip** (GOOD_LOW, first in the array, so public violence raises it). How far the story has
  travelled: building, office, class chat, Kenta. Raised by Bluff Your Way, Make It Public and Stand
  Between Them.
- **Her Guard** (GOOD_LOW). Packed and by the door, down to arguing about the thermostat. It drains on
  its own with time together. Raised by Name What She Did, Go Through Her Things, Hold It Over Her and
  Shut the Door.

## Violence, lies, refusals, wandering off

The narrator needs authored material for the four things players do to test a world:

- **Attacking.** No combat (`allowsCombat: false`). A shove or a punch happens fast, with no injury
  detail, and costs socially and legally:
  - Mrs. Tamura calls the police.
  - The class chat hears.
  - Mika reaches for the cat carrier.
  - Kenta smiles. He wants to be hit, and says so.
  - Threatening the cat ends the sofa: Mika is between them before the sentence is out.
- **Lying.** Bluff Your Way works once on the concierge and once on the landlady, who "will not be lied
  to twice". Lying to Jun is a route of its own, and the one thing he takes personally.
- **Refusing.** Shut the Door is a route with its own week (Mika living in 1A under the player's floor)
  and its own ending.
- **Wandering off.** The week runs without the player. The headcount, Kenta's visit, the deadline and the
  reunion all fire on the clock, and the walk-away has its own ending.

## Content line (13+)

- Romance goes no further than a kiss, on or off the page. Production's storyteller is told to close
  intimate scenes with a fade to black; `hardCanon` overrides that for this story: no fade-to-black, a
  scene heading that way ends on the kiss, and nothing afterwards implies more.
- The close quarters are comedy and awkwardness, never fan service: nobody walks in on anybody, nobody
  is half-dressed or in a towel, and no beat lingers on a body.
- Making her pay is paid in money, chores and pride, never in anything physical or romantic. Asked for
  that as rent, she says no once and goes down to Mrs. Tamura's spare room.
- Nothing sexual, no nudity, no lingering body descriptions, no gore, no self-harm.
- The bullying is described as what was done, from memory and by adults: a nickname, a notebook read
  aloud, a photo. No flashbacks, no uniforms.
- Alcohol is light and background: Jun's beer, Daisuke buying rounds at The Red Lantern, Jun's taxi
  after a year-end party. `ALCOHOL_REFERENCES` is declared.

The spec scans the whole story for minor-coded words and for the 13+ word list.

## Cover direction

Mika alone in the foreground, waist up, centred and close, standing just outside an apartment door at
night in the rain. She wears the oversized navy parka zipped to the collar with the hood up and
dripping, as in the opener, over wet hair cut bluntly at the jaw, sleeves rolled. She holds the grey
cat carrier against her chest with both arms, and a cat's face shows through the grille. Her
expression is proud and braced at once: chin up, eyes on the viewer.

Her face stays clean and dry. Every rain and glow effect stays on objects and the title: the hood, the
parka, the carrier, the railing, the vending machine.

Behind her, soft and secondary: the open-air walkway, the glowing vending machine, rain-blurred city
lights, a bus pulling away. Warm light falls from the open doorway onto her and the carrier, with cold
blue rain light behind.

`coverDirection` carries its own `TITLE:` line, so the generic "lower third, no lettering" cover rules
are dropped: the title **ONE WEEK, SHE SAID** (the story's title, One Week, She Said, in the capitals
the cover generator spells it in, comma after WEEK) is painted in the upper third above her hood in
clean white hand-brushed lettering with a soft warm glow and a few raindrops running off the letters.
There is no other text: no letters or numbers on the door, the bus, the vending machine or the carrier.
She is described by costume and pose only, with no age words and no digits.

The tone guide doubles as the cover's mood text, so it opens on mood ("Comedy of close quarters with
an old hurt underneath it") and the specific fan-service exclusions (towels, walking in, bodies) live in
`hardCanon`, where the storyteller reads them and the painter never sees them.

## Opening panel

`openingPanel` is `{ assetKey: 'story_one_week_she_said/opening', alt }`. The alt starts with "Mika",
because her portrait is the panel's reference image: Mika at the door at twenty to midnight, hood up on
the oversized navy parka, hugging the grey cat carrier, the duffel at her feet and the last bus pulling
away behind her (189 characters, limit 200).

## What the production storyteller reads

`runTurnPure` reads only items with `questItem: true`, never promises, quest steps or `revealHint`s,
never the resources or the ability list (only the chosen archetype's starting abilities), and every
world event with no conditions attached. So:

- The week's system is in `hardCanon`: how Her Guard comes down on its own with ordinary time together
  and goes back up whenever the past, her bag, her phone or the door is used against her; how anything
  done outside 2C travels (building, office, class chat, Kenta), which is Gossip; and what the work
  week at Tsubame Logistics costs the player, which is Energy.
- The spare key is the starting quest item, and every archetype starts with Set the Rules.

- Aya's appointment book (the MYSTERY payoff), Mika's phone (the RIVAL seed and the only pressure on
  night one) and the old notebook (the THEME stub) are quest items.
- The events that only make sense if she stayed in 2C (the cat heard, Jun at the door, the last night)
  say so in their first sentence, as well as in `requiresFlags`.

## Not done yet (by design)

- Not registered in `packages/test-fixtures/src/index.ts`. Registering it is a separate step, and the
  catalog-wide specs will run on it from then. Its own spec already repeats their checks.
- No art yet. `openingPanel` names `story_one_week_she_said/opening`, which 404s until the art run
  draws it from Mika's portrait; the story is not in the catalog, so nothing serves it before then.
  There is no `prologue`, by design: the new-50 stories open straight on the scene.
- `publishedAt: null`. The drop sets the date.
- `migrate` has not been run, so the story is not in any database.

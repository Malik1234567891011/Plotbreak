# THE HERO'S SPARE

**Slate #11.** Summoning fantasy, male lean.
**Fixture:** `packages/test-fixtures/src/the-hero-s-spare.ts`, exported as `THE_HERO_S_SPARE`.
**Spec:** `packages/test-fixtures/src/the-hero-s-spare.spec.ts`.
**Ids:** slug `the-hero-s-spare`, story `story_the_hero_s_spare`, version `sv_the_hero_s_spare_1`, asset prefix `story_the_hero_s_spare/`.
**Title as shipped:** `The Hero’s Spare` (curly apostrophe, like every other title in the catalogue).
**Fantasy label (42 max):** Summoned by mistake. Sent back by sword.
**Tags:** Isekai, Fantasy, Adventure, Survival, Comedy.
**You play:** the accidental second summon. An adult from our world, named and gendered by the player.
**Rating:** 13+. Every character is an adult, and this bible states each age. Romance goes no further than a kiss. No fan service.
**Not registered yet.** The story is not in `LAUNCH_CATALOG` or `index.ts`. Its own spec runs the catalogue checks against it directly.

## Why this fantasy works

The summoning story is a top search on the competitor shelf, and the shelf is crowded with heroes who arrive overpowered. This one starts from the other side of the circle: you are the mistake. The hero gets the glowing hand and the parade. You get a sword at your throat and a minute to explain yourself.

The hook pays off on turn one. The power arrives in the first scene, but quietly: you can read the faint gold writing on every enchanted thing, and nobody else can. It is useless for fighting and decisive for everything else. Every scene becomes a question of what you will read, who you tell, and what it costs.

## Premise (what the player reads)

Six short paragraphs, 238 words, each under 70.

> The kingdom of Corvane lights its summoning circle once in a generation, when the grey fog in the north starts moving again. The circle is supposed to pull one hero out of another world.
>
> This morning it pulled two. One is Kai Brandt, a bike courier from your world, with a mark of light burning on the back of his hand. The other is you. Your hands are empty.
>
> The church has a word for the second arrival: the spare. Spares are held in the cells under the cathedral for three days, until the circle cools, and sent back through it at the third dawn. The only way through is a sword. Nobody sent back has ever come back.
>
> So you have three days in a city that has already decided what you are. The sergeant holding the sword gave you a minute she was not supposed to give. The hero is scared. The High Priestess is kind, and she keeps to a schedule.
>
> Nobody here knows the other thing yet. Every enchanted object in the hall is covered in faint glowing writing: the locks, the blades, the circle, the mark on his hand. Nobody else can see it. You can read every word, including one line on his hand that should not be there.
>
> Prove you are worth keeping, get out of the city, or find out why the circle called two before the third dawn comes.

## The truth underneath (hard canon)

The fixture carries ten hardCanon lines. In short:

1. Everyone is an adult. The player is an adult from our world. Kai Brandt, at twenty-two, is the youngest person in the cast.
2. The circle pulled two people this morning. Kai was marked with a sun-shaped light on his right hand. The player was left unmarked.
3. A second arrival is a spare. Spares are held in the Warden Cells for three days, while the circle cools, then sent back through it by the sword at the third dawn. Eleven spares have been returned in 331 years. The last was Ruth Abara, a bus driver from our world, forty-seven years ago.
4. The player can read the circle's script: faint gold writing on every enchanted thing. Nobody else alive can see it. Reading takes a look and a moment. It is never a menu.
5. Only the player can cross out a line, and only after somebody or something has told them it can be done. It takes touch and a held breath. The church can feel it nearby. Every crossing loosens the player's hold on this world.
6. The circle always calls two: a Hero to carry the light, and a Witness left unwritten so nothing written can bind them. The first page of the original rite says it in three words, *Two shall come*. The church has hidden that page for three centuries. The Archivist, Emeric Dahl, keeps it.
7. This morning Odile wrote a hidden line into Kai's mark: *The bearer shall raise no hand nor word against the Circle's voice.* The mark burns when he thinks about refusing her. He thinks it is nerves.
8. 331 years ago the ninth hero, the Burning King, burned the old capital, Aubrel, for nine days. His Witness read his mark and crossed it out. Dying, he spoke a writ he never finished: *Let nothing move until.* That unfinished sentence is the Stilling, a grey fog from the north. It leaves whatever it covers motionless, warm and not dead.
9. The king is not ill. He rode north to see the fog two years ago and came back stilled. Ilsabet rules as regent. The court is told he has a fever.
10. Mira will not strike in the first minute, whatever the player does, and nobody says why on turn one. At the end of the minute Odile pronounces the Returning for the third dawn. A good answer changes how people treat the player. It does not cancel the schedule.

## Tone and content

- Web-novel prose, comedy under pressure. Two people from the same world trade jokes nobody else gets.
- Romance goes no further than a kiss. Never fan service. No gore. The Returning is written without blood and without certainty.
- A player who attacks Mira, runs, lies or refuses gets a real scene, not a game over. A fight ends with somebody disarmed, down or yielding.
- A player who wanders off is followed by the clock, not punished by it.

## The opener (turn one)

107 words. Mira speaks at word 8 ("Don't move") and names herself at word 21. It ends on her direct question. The only proper noun is her own name, said in her own mouth.

```
A sword point stops against your throat.

"Don’t move," says the woman holding it. Red sash, scarred knuckles, no blink. "Sergeant Mira Holt. The circle calls one hero. Today it called two."

You’re kneeling in a ring of smoking chalk. Beside you, a lanky man in a grey hoodie stares at his right hand, where a mark of light is burning.

Your hands are empty.

On the steps above, a priestess in white turns a small sandglass over.

"He’s the hero," Mira says. "You’re the spare. We send spares back the only way we know."

The sand starts to fall.

"One minute. What are you good for?"
```

**Cards:**

1. Said: `"I can read the writing glowing in that chalk. Every word. Can he?"`
2. Done: `I hold up my phone and switch on the torch.`
3. Risky: `I ease the blade aside with two fingers and get to my feet. "I’ll answer standing up."`

None of the three parses as an attack. The spec checks this.

**Opening panel:** `story_the_hero_s_spare/opening`. Mira in grey half-plate and a red sash, sword level at the viewer's throat, in a domed stone hall with a ring of smoking chalk on the floor.

## Backgrounds (what you did back home)

The choice is fixed for the whole story and cannot be changed later. Each background grants one item from home and starting standing with one faction. Every player also starts with **Your Phone** (nine per cent battery, no signal, a torch, a camera, one downloaded song).

| Id | Name | Grants | Item | Standing |
|---|---|---|---|---|
| `arch_nurse` | You Were a Night Nurse | mind +2, resolve +2; First Aid 3, Composure 2 | First-aid kit | Church +10 |
| `arch_electrician` | You Were an Electrician | mind +2, agility +2; Tinkering 3, Script 1, Sneaking 1 | Multitool | Tallow Row +10 |
| `arch_law` | You Studied Law | mind +2, presence +2; Fine Print 3, Fast Talk 2 | Ballpoint pen | Crown +10 |
| `arch_boxer` | You Boxed | might +3, agility +1; Brawling 3, Composure 1, Sneaking 1 | Hand wraps | Wardens +10 |

The storyteller only sees the background the player chose.

## Cast

Seven characters, in cover order. The first three are in the Ring Hall at 07:52, when the story starts. Nobody else is there.

### Mira Holt, 27

Sergeant of the Circle Wardens, and the sword that is supposed to send you back. Tall, cropped black hair, a pale scar through one eyebrow, grey half-plate, a red sash. She speaks in counts and short sentences.

- She stopped the blade a finger's width from your throat and gave you a minute nobody authorised. She calls you spare.
- **Secret:** her grandmother, Wenna Holt, held the blade at the last Returning and left a letter behind the third bell in the bell tower: Ruth could read the circle, a line can be crossed out, do not let them do it again.
- Starts at trust 10, respect 15.
- Gates: says your name; shows you the tower after the first day; a kiss is possible only after you know why she stopped, and only at high trust.

### Kai Brandt, 22

The hero the circle marked. A bike courier from your world, taken mid-delivery. Lanky, dyed-blond hair with dark roots, a grey hoodie under borrowed white, a square courier backpack he will not put down. He says "Okay" and "Honestly" constantly.

- He could be your rival, your best friend here, or the only person who can stop what is scheduled for you.
- **Secrets:** Odile told him the spare goes home "whole and unharmed" and he has not asked what the sword is for. His mark burns when he thinks about refusing her.
- Starts closest to the player (trust 25, affection 20, rivalry 10), because he is from home.

### High Priestess Odile Varenne, 52

High Priestess of the Church of the Circle. She lit the circle and turned the sandglass. Silver hair braided into a crown, white robes stitched with gold. She never uses contractions and calls everyone "friend".

- The kindest person in the cathedral, and the one scheduling your death.
- **Secrets:** she wrote the hidden line into Kai's mark. She has read the first page of the rite and has twice tried to burn it.
- Gates: receives you; bargains once she knows you have read Kai's hand.

### Emeric Dahl, 71

The cathedral Archivist. He recorded the last Returning as a junior clerk. Small and stooped, wild white hair, spectacles on his forehead. He cites folio numbers.

- He has kept the first page hidden for forty-seven years for whoever came next.
- **Secret:** Ruth Abara read his ledger aloud the night before her Returning and asked him to keep the page. Her margin note in the Book of Returnings says how a Witness goes home alive.
- Gates: opens the case; tells you about Ruth once you know *Two shall come*.

### Ilsabet Corvane, 26

Crown Princess and acting regent. Auburn hair, a plain silver circlet, an ink-blotted cuff. She asks two questions at once.

- She needs the hero to win in the north and the church to lose in the capital. She will buy you from the church if you can say what you are worth.
- **Secret:** her father rode north two years ago and came back stilled.
- Gates: hears terms; claims you for the crown; a kiss is possible at high trust.

### Severin Ashby, 38

Knight-Captain of the Circle Guard, the church's sworn sword. Broad, very still, close-cropped grey-blond hair, a white tabard. He says "It is written."

- He walked out of the fog alone at nineteen and believes every spare is the fog in disguise.
- **Secret:** a faint line of the fog's writing is on the inside of his left wrist. He has never seen it.
- Starts hostile (trust −20, rivalry 25). Gates: doubts himself after you pass the Proving; shows you his wrist once you know the fog speaks.

### Bet Tallis, 58

Eel smoker and seller of new names in Tallow Row. Solid and weathered, a knotted kerchief, a smoke-stained leather apron. She talks about her mother.

- She will sell you a new name, a cousin and a boat. She has already noticed the glowing thing in your pocket.
- **Secret:** a trapdoor in her back room leads to a barge. It has taken nine people out of the city in thirty years, including one warden who could not hold the blade.
- Gates: does business; shows you the trapdoor once Tallow Row will hide you.

## Places

Production never sees `connections`, so every description names its own exits in prose. The spec checks this.

| Id | Name | Exits |
|---|---|---|
| `ring_hall` | The Ring Hall (start) | Nave, Warden Cells |
| `cathedral_nave` | The Cathedral Nave | Ring Hall, Archive, Hero's Rooms, Bell Tower, Lantern Market |
| `warden_cells` | The Warden Cells | Ring Hall, Wardens' Yard |
| `wardens_yard` | The Wardens' Yard | Warden Cells, Lantern Market |
| `archive` | The Archive | Nave |
| `hero_rooms` | The Hero's Rooms | Nave |
| `bell_tower` | The Bell Tower | Nave |
| `lantern_market` | Lantern Market | Nave, Yard, Long Gallery, Tallow Row, North Gate |
| `long_gallery` | The Long Gallery | Lantern Market |
| `tallow_row` | Tallow Row | Lantern Market |
| `north_gate` | The North Gate | Lantern Market; Edge of the Stilling (locked by `north_road_open`, four hours) |
| `edge_of_stilling` | The Edge of the Stilling (hidden until found) | North Gate |

**Quest items:** Your Phone, The First Page, The Book of Returnings (with Ruth's margin note), The Sparrow in the Jar, Wenna Holt's Letter, the Regent's Pass. Everything a quest checks for can be taken, carried or granted somewhere.

## Factions

Array order matters: a public fight hits the first faction.

1. **The Church of the Circle:** starts at −15, allied with the Wardens.
2. **The Circle Wardens:** starts at 0.
3. **The Crown:** starts at 5. The best a run can reach is 50 (5 + 10 law + 25 regent + 10 fog), above the 30 the crown ending needs.
4. **Tallow Row:** starts at 0, enemies of the Church.

## The power and its cost

Three hidden, banded variables:

- **Nerve:** the only GOOD_HIGH resource, so rest restores only this.
- **Scrutiny:** the first GOOD_LOW. A public fight raises it. Reading aloud and throwing hands raise it.
- **Loosening:** your hold on this world. Only Cross It Out raises it.

Twelve abilities:

- **Read the Script:** works from turn one.
- **Cross It Out:** locked. Its locked text: "You can read every line. Nothing you have found yet says a line can be unwritten, or what it would cost the person who did it." The quest step `learn_the_method` grants it. Four routes reach that step: Ruth's margin, Wenna's letter, Emeric teaching you, or working it out yourself from Kai's hand.
- The other ten: Read It Aloud, Talk Fast, Find the Clause, Patch Them Up, Rig It, Throw Hands, Keep Your Head, Slip Away, Show Them Home, Keep Them Company.

## Clocks

Day 0 starts at 07:52.

| When | Event | Who sees it |
|---|---|---|
| Day 0 08:00 | The pronouncement: Returning set for the third dawn | Everyone |
| Day 0 14:00 | Severin calls a Proving in the Wardens' Yard | Unless escaped |
| Day 0 17:00 | Kai's investiture in the nave | Everyone |
| Day 0 17:06 | The mark flares and the hidden line can be read | Players who were in the nave and have read something |
| Day 0 22:00 | The sparrow in the jar moves one feather | Players who visited the Archive |
| Day 1 09:00 | The fog takes Harrow's End | Everyone |
| Day 1 12:00 | A stilled courier is carried into the nave | Players who were in the nave and got through the first day |
| Day 1 22:00 | Mira waits in the bell tower | Players through the first day; cancelled if you already know why she stopped |
| Day 1 23:30 | Severin comes early with a writ | Unless the Returning is already stopped |
| **Day 2 06:00** | **The Returning** | No requirement; cancelled only by something the player built |
| Day 2 17:00 | Kai says no in front of the nave | Only if you freed his hand without telling him |
| Day 3 08:00 | The army marches and the north road opens | Everyone |

## Quests

- **One Minute** (main, active from the start).
  - The minute accepts eight answers: reading the circle, showing the phone, talking fast, tending the hero, refusing to perform, fighting the blade, running, or letting the sand run out.
  - Then the first day: Kai, his hand, the Proving, the Archivist, or a night in the cell.
- **Why the Circle Called Two** (main). Learn what you are (Emeric, the stolen page or the Book of Returnings), then learn the method. Finishing it grants Cross It Out.
- **The Line on His Hand** (main, opens once you know the hidden line). Tell Kai, free him quietly, sell the secret to Odile, or tell the regent. If Kai knows, you cross it out together or he keeps the mark.
- **The Third Dawn** (main, opens at the pronouncement). Nine ways out:
  - Mira refuses.
  - Kai names you his squire.
  - The crown claims you.
  - You read the rite aloud.
  - Odile's quiet bargain.
  - You vanish into Tallow Row.
  - You walk north.
  - You cross out your own name.
  - It goes through.
- **Side quests:**
  - **Why She Stopped:** Mira's letter.
  - **A New Name:** pay Bet, trade the phone, or fix her lock.
  - **The Regent's Terms:** strike a deal or bring proof.
- **The Unfinished Sentence** (an optional lead). It opens only for a player who saw the sparrow move or the stilled courier. You get through the north gate with the regent's pass, a stolen pass or the army. At the edge of the fog you cross out the writ or turn back.

## Five promises

1. **Finale:** whether you are alive after the third dawn.
2. **Mystery:** why the circle called two.
3. **Rival:** Kai Brandt, who got everything you did not.
4. **Relationship:** why Mira stopped her sword.
5. **Theme:** what the fog is saying.

## Endings (twelve)

Each ending needs a different set of flags. Only The Last Line needs the fog lead.

| Ending | Rarity | Earned by |
|---|---|---|
| Sent Back | Common | Nobody stopped the Returning. Ambiguous on purpose, never a punishment |
| The Hero's Second | Common | Kai names you his squire |
| Nobody's Spare | Uncommon | Walking off the map (from turn 12) |
| Tallow Row | Uncommon | Hidden by Bet under a new name |
| The Quiet Bargain | Uncommon | Sold the line to Odile and kept the secret |
| The Crown's Spare | Uncommon | Claimed by the crown, crown standing 30+ |
| The Warden Who Stopped | Rare | Mira refuses at the circle (her letter, trust 65) |
| Two Free Hands | Rare | You and Kai cross his line out together |
| Two Shall Come | Rare | The first page read aloud in public |
| The Way Home | Rare | You cross out your own name and go home alive |
| The Tenth Burning | Rare | Kai freed without being told, and he says no |
| The Last Line | Unique | The fog's unfinished sentence crossed out |

## Image plan (no art generated yet)

- **Status:** the cover, key art, portraits and stage images are all `null` in the fixture. Derived keys land under `story_the_hero_s_spare/`.
- **Cover:** Mira in a red sash and grey half-plate, sword level at the viewer. Behind her, in a ring of smoking chalk, Kai in a grey hoodie under a white surcoat with a courier backpack, his hand blazing with a sun-shaped mark. Above, on cathedral steps, a silver-haired priestess turns a brass sandglass. Gold script drifts in the air. Described by costume and pose only, never by age.
- **Opening panel:** see the opener.
- **Reaction decks:**
  - Mira: neutral, stern, wry, guarded, surprised, warm.
  - Kai: neutral, grinning, nervous, confused, angry, warm.
  - Odile: neutral, gracious, cold, grave, furious.

## Checkpoint checks (enforced by the spec)

- Every gated ability is granted somewhere. Cross It Out is granted by `learn_the_method`.
- Every character's cardBlurb contains "you".
- Every location has an inbound edge.

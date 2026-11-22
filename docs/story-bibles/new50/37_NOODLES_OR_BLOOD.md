# NOODLES OR BLOOD

**Slate:** #37 of 50 (`docs/stories-50/PLAN.md`).
**Trope:** delinquent dorm, fight-school hierarchy, with a comedy engine. **Lean:** male.
**Hook:** Rent’s due on your first night: noodles for the whole floor, or a fight on the back stairs.
**Fantasy label:** Pay the floor in noodles, or in bruises.
**Fixture:** `packages/test-fixtures/src/noodles-or-blood.ts` (`NOODLES_OR_BLOOD`, `story_noodles_or_blood`, `sv_noodles_or_blood_1`). **Spec:** `noodles-or-blood.spec.ts`.
**Asset key prefix:** `story_noodles_or_blood`. No art yet, so no `openingPanel` and no prologue.
**Protagonist:** BLANK. The player names themselves; the archetype is the trade they study.

## Adults only

Everyone in this story is an adult. East Hall is the dormitory of a **post-secondary technical college**:
every resident is eighteen or older. The ages are canon and are written into `hardCanon[0]`, so the
storyteller has them on every turn.

| Who | Age |
|---|---|
| The player, a mid-year transfer | at least 19 |
| Daigo Hatanaka, head of the third floor | 22 |
| Rumi Ogata, electrical student in 309 | 20 |
| Ken Ueda, culinary student, keeper of the kitchen | 24 |
| Bunta Iwai, the player's roommate in 307 | 19 |
| Sota Mabuchi, head of the fourth floor | 23 |
| Setsuko Fujii, warden of East Hall | 58 |
| Shun Arai, the evicted last resident of 307 (off-screen) | 21 |
| Tetsu Kubota, plumbing student in 302, laughs first at everything Daigo says | 21 |
| Asako Hirai, bricklaying student in 305, runs the floor's group chat and retells every story bigger | 19 |
| The other residents of the third and fourth floors | 18 to 26 |

Covers and portraits describe people by build and costume, never by age words. Romance goes no
further than a kiss. Fights are shoves, holds, body blows and falls, never graphic, and nobody uses
a blade or a tool as a weapon.

## The pitch

You transferred mid-year and the only bed left was 307, on the third floor of the oldest dorm in a
port-town technical college. The floor has one rule: on your first night you pay rent, twenty-two
bowls of noodles or a fight on the back-stairs landing with the man who runs it. That is the opener,
and it is a real choice with real costs.

Under it sits a week with a clock. The housing office is closing one floor of the building on Friday.
The third floor has two incidents on the record and the fourth floor has none, because the man who runs
the fourth floor is polite, never fights, and is the thief who got the last resident of your bunk
evicted. There is a second stolen tool taped under your bed tonight.

## Playable span

Monday 21:40 (`startWorldMinute` 1300) to the weekend after Friday's review. Friday at nine is Daigo's
resit; Friday at ten is the housing review. Endings live after the end of term.

Production's header shows only "Day N · night", with no weekday, so `hardCanon[5]` spells the week out:
Day 1 is Monday, Day 2 Tuesday, Day 3 Wednesday, Day 4 Thursday, Day 5 Friday. The front door locks at
eleven every night.

## The world, in plain words

- **East Hall, "the Kettle".** Four residential floors and a roof, a lobby with the warden's office
  behind it, a shared kitchen on the ground floor, a concrete back stairwell, and a boiler that bangs
  all night. The college workshops are across the road; the canal runs along the side.
- **The rent.** Three years old. Every resident owes the floor one bowl's worth a month into Ken's tab,
  and that pot is what feeds everybody in the last week of the month, before the stipend lands. A
  newcomer pays the whole floor's share on their first night instead: twenty-two bowls, or a fight with
  Daigo on the landing (taking the stairs). Ken cooks the rent and keeps the tab. It never quite covers
  the hungry week, and Daigo pays the difference out of his own welding side jobs, and has never told
  anybody. That is why Rumi, who has never paid, is the exception everyone notices.
- **Taking the stairs.** On the landing between the third and fourth floors. Rules: nothing to the
  face, nothing in your hands, over when somebody is down. Four people have done it in three years.
  Nobody has ever gone down headfirst. Daigo will not let a fight start anywhere else: swing at him in
  the common room or the corridor and he catches it, says "Not here," and walks you to the landing
  himself, so a turn-1 punch becomes taking the stairs, not the third incident.
- **The dead camera.** Over the landing, dead for two years because Rumi pulled its fuse after its
  footage got a resident evicted for a shove. The warden knows and has left it. Since then it is what
  has kept the stairs off the record.
- **The record.** A fight on the landing is off the record. A fight anywhere else is seen and goes in
  the warden's incident book, but only a fight Daigo cannot move: a second swing after "Not here", or
  any blow at Mabuchi, at the warden, or in Ken's kitchen. A third incident this term closes the third
  floor. Mabuchi's two debtors on the fourth floor exist to provoke exactly that.

## Premise (as shipped)

> You transferred to the technical college halfway through the year, and the only bed the housing
> office had left was 307, on the third floor of East Hall, the old dorm by the canal that everybody
> calls the Kettle.
>
> The third floor has twenty-two people on it, one dead camera, and one rule. A newcomer pays rent on
> their first night: noodles for the whole floor, or a fight on the back-stairs landing with Daigo,
> who has run the floor for three years and is almost never told no to his face.
>
> Rumi tells him no every day. She is the only one.
>
> Bed 307 was empty because the last person in it was thrown out three weeks ago, when tools stolen
> from the college workshops turned up under his bunk. He said it was not him. Nobody listened.
>
> Now the housing office is closing one floor of East Hall at the end of term, and on Friday it decides
> which. One more fight on the record could sink the third floor, and twenty-two people would lose the
> cheapest rent in town.
>
> So you need to survive your first night, find out who really stole those tools, and decide what kind
> of floor this is going to be before somebody upstairs decides for you.

214 words. Passes `checkStoryClarity` with no issues.

## Opener (turn 1, verbatim)

> "Rent’s due, Transfer."
>
> Daigo doesn’t get up. His boots are on the common-room table, a scorched welding jacket hangs off
> his shoulders, and beside his heel stands a tower of empty noodle bowls.
>
> Twenty-two of them. One for everybody on the third floor, and everybody on the third floor is
> watching you.
>
> "Noodles for the whole floor. Tonight." He tips his chin at the stairwell door behind you. "Or the
> stairs. Headfirst."
>
> Somebody laughs. A woman in a doorway, screwdriver behind her ear, doesn’t.
>
> "You don’t have to answer him," she says.
>
> "Rumi." Daigo hasn’t looked away from you once. "Let the Transfer talk."
>
> The corridor goes quiet.
>
> "Well? Noodles, or the stairs?"

113 words. Daigo speaks to the player in the first line. It ends on a direct question. The only proper
nouns are Daigo and Rumi, both introduced in the scene, and "Transfer", which is what Daigo calls you.

**Suggestions** (said, done, risky; none parses as an attack):

1. "Twenty-two bowls? Fine. I’ll cook them myself. Where’s the kitchen?"
2. I step around his boots and carry my bag down the corridor to my room.
3. I hold the stairwell door open for him. "After you."

The rent is also an `openingObligation` with Daigo, due at 23:00 when the front door locks.

## Cast

### Daigo Hatanaka, 22, head of the third floor

Final-year welding student. Broad, close-cropped hair, a scar through one eyebrow, a scorched leather
welding jacket, boots on the table.

- **Wants:** the floor fed and off the record until Friday, and somebody he can hand it to.
- **Hides:** he has failed the written half of his certification twice; the resit is Friday at nine.
  He has never thrown anybody down the stairs. He pays the rent's shortfall himself (Ken's "D." column).
- **Fears:** being exactly what the fourth floor says he is; leaving the floor to the wrong person.
- **Won't:** hit a face, hit anybody down, go to the warden about a resident, explain where the rent goes.
- **Voice:** short loud floor law, calls the player Transfer until they earn a name, ends demands on
  one word ("Pick." "Well?"). Plain and quiet only on the roof.
  *"Twenty-two people on this floor. Nine of them ate plain rice on Tuesday. So yeah. Rent’s due."*

### Rumi Ogata, 20, electrical student in 309

Slim, straight-backed, hair tied with electrical tape, a screwdriver behind her ear. The only person on
the floor who has never paid the rent.

- **Wants:** the rent gone and Daigo kept; a floor that votes instead of obeys; to know what the
  fourth-floor dry showers are drawing power for.
- **Hides:** she pulled the camera fuse. She has meter readings from the dry showers and has shown nobody.
- **Fears:** that the rent works and she is wrong; owing anybody.
- **Won't:** pay; stand and watch a fight on the stairs; be the reason Daigo is thrown out.
- **Voice:** level and exact, electrical words for people (load, short, fuse), "No." as a whole sentence.
  *"He isn’t a short circuit, he’s a fuse. He blows so the rest of the building doesn’t."*
- **Romance:** possible, slow, earned; up to a kiss (`end_the_roof`).

### Ken Ueda, 24, culinary student, keeper of the kitchen

Lean, red bandana headband, chef's jacket over a hoodie, burn marks on both forearms, points with a
ladle. Runs the ground-floor kitchen and a late-night noodle cart on the canal.

- **Wants:** to sell twenty-two bowls tonight, pass his final service Thursday, and get out from under
  whatever Mabuchi has been selling him.
- **Hides:** the "D." column; eight kitchen items bought cheap from "S.M."; he has watched Mabuchi walk a
  heavy sports bag to the scrapyard every Wednesday.
- **Won't:** take sides between floors in public; let anybody leave hungry; show the tab book unearned.
- **Voice:** fast, warm, kitchen slang, a number in every sentence, calls everybody "chef".
  *"Twenty-two bowls, chef. On your money that’s your whole week, in soup."*

### Bunta Iwai, 19, the player's roommate

Auto mechanics, nineteen, new to the college this year. Stocky, bleached hair growing out, overalls tied at the waist, cracked phone.
Paid in noodles on day one and has been broke since.

- **Wants:** to get through the term unnoticed and to pay Mabuchi back so he can stop going upstairs.
- **Hides:** he reports on the third floor to Mabuchi every afternoon (Mabuchi paid his phone debt). He
  saw Mabuchi leave 307 with a blue-striped towel the night before Shun was evicted.
- **Won't:** lie to your face if you ask kindly and straight; take the stairs, ever.
- **Voice:** run-on lists, quotes the floor rules by number and gets rule four wrong, apologises in advance.
  *"Sorry. Sorry in advance. You’re going to hate this, and I’m going to hate saying it, and I’m saying it anyway."*

### Sota Mabuchi, 23, head of the fourth floor (the antagonist)

Final-year machining, student assistant in the workshop tool room. Tall, neat, silver-rimmed glasses,
pressed navy jacket zipped to the collar, spotless trainers.

- **Wants:** one more incident on the third floor before Friday, the grinder back from under bed 307,
  and to know whether the new resident can be bought.
- **Hides:** he steals the tools, keeps them in the padlocked dry showers on the fourth floor, and sells
  them under the canal overpass on Wednesday nights. He planted the drill on Shun and taped the grinder
  for whoever came next. Two fourth-floor residents owe him money; he sends them to pick fights with
  third-floor residents where the warden can see, and they never throw the first punch.
- **Offers:** the moment he suspects you know, a deal: a clean record, the fourth floor's favour, and the
  third floor's rent quietly forgiven, for a story told to the floor and nothing told to the warden.
- **Fears:** a camera that works; Daigo deciding the landing rules no longer apply to him.
- **Won't:** fight anywhere it could be recorded; raise his voice in front of the warden; confess.
  Cornered, he makes an offer.
- **Voice:** soft, complete sentences, your name in most of them, offers instead of threats.
  *"I don’t brawl. Brawling is what gets floors closed. I simply keep very good records."*

### Setsuko Fujii, 58, warden of East Hall

Fourteen years as warden, before that a ship's engineer. Square, iron-grey hair, reading glasses on a
cord, a heavy ring of brass keys.

- **Wants:** East Hall through Friday with the right floor closed, or none; to know if she was wrong about Shun.
- **Hides:** she has known for two years that Rumi killed the camera. She noticed the blue-striped towel
  around the drill and said nothing because the housing office wanted the case closed.
- **Won't:** record a fight she did not see; act on an accusation without something she can hold.
- **Voice:** short, nautical, exact; calls the building "she"; tea first.
  *"I signed one eviction this term on what I was shown. I will not sign another on what I am told."*

At the start (21:40) only Daigo and Rumi are in the common room. Mabuchi arrives at 22:30 with
oranges (`we_mabuchi_brings_oranges`). Everyone has a full 24-hour schedule.

## Places

| Id | Place | Notes |
|---|---|---|
| `common_room` | The Third-Floor Common Room | Start. The plastic chair, the tower of bowls. |
| `room_307` | Room 307 | Your bunk. The grinder under the slats, Shun's note in the window frame. |
| `back_stairs` | The Back Stairs | The landing, the dead camera, the fire door to the canal. |
| `fourth_floor` | The Fourth Floor | Blue-striped towels on every handle; padlocked shower block. |
| `dry_showers` | The Dry Showers | Locked until `knows:the_showers`. Charging tools, sports bags, the tags in the drain. |
| `the_roof` | The Roof | Water tanks, the port below. Daigo's results slip under the brick. |
| `lobby` | The Lobby | Mailboxes, curfew clock, front door locks at eleven. |
| `dorm_kitchen` | The Ground-Floor Kitchen | Ken's four burners, the tab book, cup noodles. |
| `warden_office` | The Warden's Office | The incident book. Where the review happens. |
| `canal_lane` | The Canal Lane | Ken's noodle cart; Mabuchi's Wednesday walk. |
| `workshops` | The College Workshops | Welding bay, tool room, exam room for the resit. |
| `scrapyard` | The Yard Under the Overpass | Locked until `knows:the_buyer`. Where the tools go. |

Every location has an inbound edge.

## Factions

1. **The Warden's Office** (first, so public violence costs it): In the book / Resident / Trusted with a key.
2. **The Third Floor:** Transfer / On the floor / Speaks for the floor. Enemy of the fourth.
3. **The Fourth Floor:** Downstairs / Useful / One of his.

## Threads (quests)

- **Rent's Due** (live on turn 1). Cook, take the stairs, fight on the landing (off the record), refuse,
  bluff, walk to bed, or leave the building. Swing at Daigo in the common room and he catches it, says
  "Not here," and marches you to the landing: the fight you wanted, off the record. Only a second swing
  after that warning goes in the book. (The legacy engine's `swung_in_the_corridor` route still writes
  the third incident; production does not read routes.)
  Then the floor decides who you are. Grants *Call the Floor*.
- **On the Record** (live on turn 1). Two incidents on the book. Hitting Mabuchi, the warden or Ken
  writes the third. Hitting Rumi or Bunta turns the floor on you. Mabuchi's two debtors try to make you
  swing in the kitchen on Tuesday night.
- **Bed 307.** Find the grinder or the note, or get Bunta to confess; follow the towels upstairs via
  Rumi's readings, Ken, Bunta, watching the corridor, or picking the padlock; then report Mabuchi with
  the tags, with Bunta as witness, or with the grinder in the warden's office, call the whole floor up
  the stairs, or take Mabuchi's deal.
- **Friday at Ten.** The review: saved with the thief named, saved by the deal, saved by the warden's
  word, or closed. Any saving route requires no third incident.
- **Last Week of the Month.** The stipend is late. Feed the floor (cook, fix Ken's burners, or eat
  together), which unlocks *Call the Floor*; then learn where the rent goes.
- **Who Holds the Floor.** Walk Daigo through the paper or let him sit it alone; then the handover:
  Mabuchi, Daigo, you, Rumi, or no rent at all.
  The handover opens only after the review (`enterWhen: review_held`), so Daigo's Friday 09:40 pass
  lands first and One More Year stays reachable.
- **The Dead Camera** (lead). Learn who killed it; put the fuse back or leave it dead.

## World events

| When | Event |
|---|---|
| Mon 22:30 | Mabuchi brings oranges to the common room. |
| Mon 23:00 | Curfew; the warden's round. |
| Tue 07:30 | Review notice on every floor (`knows:the_review`). |
| Tue 18:00 | Stipend delayed a week (`stipend_late`). |
| Tue 19:30 | Two of Mabuchi's fourth-floor debtors knock your bowl out of your hands in the kitchen queue, in view of the warden's window, and wait for you to swing. "Landing. Now." takes it off the record (`fourth_floor_pushed`). |
| Wed 00:30 | Daigo on the roof, if he noticed you (`knows:daigo_leaving`). |
| Wed 21:00 | The inspection of 307, tipped off by Mabuchi, unless you already have the grinder. |
| Wed 22:40 | Mabuchi's walk to the overpass, if you know about the towels. |
| Thu 20:30 | Ken lets slip about Daigo, if you fed the floor. |
| Fri 09:40 | Daigo walks out of the resit early, if you helped him study (`daigo_passed`). |
| Fri 10:00 | The housing review (`review_held`). |

## Five promises

| Kind | Promise |
|---|---|
| FINALE | Who holds the third floor, and whether there is still a rent. |
| MYSTERY | What really happened to the last person in your bunk. |
| RELATIONSHIP | What Daigo is really collecting rent for. |
| RIVAL | The polite man upstairs who wants your floor closed. |
| THEME | Whether the landing should ever be watched. |

## Endings (12)

| Ending | Rarity | Needs |
|---|---|---|
| The Floor Stands | Common | Floor saved, nobody new holds it. |
| Rent's Due, Transfer | Uncommon | Floor saved, you hold it, Third Floor rep 30+. |
| Free Noodles on Thursdays | Rare | Floor saved, the rent ended. |
| Rumi's Rota | Uncommon | Floor saved, Rumi holds it. |
| One More Year | Unique | Floor saved, Daigo passed and keeps it. |
| Boxes in the Corridor | Common | Floor closed (loss). |
| Bed 307, Again | Uncommon | Framed and floor closed (loss). |
| Both Floors | Rare | Mabuchi holds both floors (loss). |
| Headfirst | Rare | Took the stairs, stormed upstairs, floor closed (proud loss). |
| Camera On | Uncommon | Camera fixed, Mabuchi reported, Office rep 40+. |
| The Roof After Curfew | Rare | Knows who killed the camera, Rumi affection 75+. Up to a kiss. |
| The Last Bus Out | Uncommon, turn 16 | Walked out before the floor followed you. |

## Archetypes (what you study)

| Name | Role | Grants |
|---|---|---|
| You Train as a Cook | Cooking and talk | Cook for the Floor, Eat With the Floor; knife roll |
| You Train as an Electrician | Technical and observant | Fix It, Read the Floor; multimeter; Office +5 |
| You Train as an Ironworker | Strength and defence | Take the Stairs, Stand Your Ground; rigger's gloves; Third +5 |
| You Train as a Mechanic | Speed and stealth | Slip Away, Talk Big; scooter key |

The archetype is fixed for the whole story and cannot be changed later.

## State (three invisible resources)

- **Stamina** (GOOD_HIGH, the only one, so rest restores the day and nothing else).
- **Heat** (GOOD_LOW, first in the array, so public violence raises it): how closely the warden is
  watching the third floor.
- **Bruising** (GOOD_LOW): what the landing costs the body; heals on its own.

## Cover direction

A key visual for a trade-college dormitory comedy anime. Daigo sprawled in a plastic chair, boots up
beside a leaning tower of empty noodle bowls, the corridor behind him with residents in work clothes
(mechanic's overalls, a chef's jacket, paint-stained hoodies, work boots) leaning out of doorways and
Rumi unimpressed in one of them. No school uniforms. Fluorescent
green-white light, steam, a red exit sign over the stairwell door. No blood, injuries or weapons.
Title **NOODLES OR BLOOD** painted into the art in the upper third. No other text.

## Originality

- Title collision search (editor review, 2026-11-22): the exact title searched with "anime" and with
  "webtoon manhwa" found no work by that name, only unrelated titles such as Blood-C and Noblesse.
- Ken's surname was Ishiyama in the first draft. It is Ueda now, because Ishiyama High is the school in
  Beelzebub, a delinquent manga, and this is a delinquent story. Bunta (the roommate) and Fujii (the
  warden) stay: they are two different characters with common names, not a copied pair.
- No franchise names or terms. The spec bans the delinquent genre's best-known names and terms.

## For the integrator

- Not registered in `index.ts` (task said not to edit it). Add the export and catalog entry there,
  then `npm run migrate` and a new session.
- Add `openingPanel` and art keys once art exists (`story_noodles_or_blood/...`). `release-stories.ts`
  refuses a story without `openingPanel`, and the story must be exported through `withDerivedAssetKeys`
  in `index.ts` before any catalog spec covers it.
- After registering, run smoke with the storyId substring: `npm run smoke -- --only=noodles_or_blood`
  (underscores). The filter is `storyId.includes(only)`, so the hyphen slug matches no world and passes
  having played nothing. The run must print `swept Noodles or Blood`.
- The setup screen's `why_you_transferred`, `worldKnowsAboutYou` and `appearance` never reach
  `runTurnPure`; a backstory the player picks there is not seen by the production storyteller.

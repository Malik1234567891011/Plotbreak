# Tolan hands-on, 2026-11-21 (design only)

Real app on the user's iPhone, driven through iPhone Mirroring. Shots are 354x781,
1 image pixel = 1 point. `*z-*` shots are 2x crops. Kept shots are in `shots/`.
Colors are sampled from the captures.

Tolan is not a story app; it is an AI companion (a small alien "friendly guide").
It was looked at for craft only. **Stopped on screen 4, "What's your name?"**
(personal data), so only the welcome and the intro were seen.

## Screen map, first run (one line each)

| # | Screen | Shot |
|---|---|---|
| 1 | Welcome: full-bleed live-action photo, "Tolan / your friendly guide", white circle ">" , "Already have an account? Sign in" | tolan-01-open, 01z-both |
| 2 | Intro video: the same living room, a 3D blue alien beside a woman folding laundry, narrated, captioned | tolan-06-step1 |
| 3 | A glowing, out-of-focus iridescent creature on a dark starry violet field, white ">" | tolan-07-step2 |
| 4 | App Tracking prompt over "What's your name?" (declined: "Ask App Not to Track"), then the name field | tolan-08-step3, 09-name, 09z-name |

**Every screen capture triggers Tolan's own "Share screenshot to:" sheet**
(Messages, Instagram) from the bottom (tolan-04-share-again, 02z-share). One tap
landed on its Instagram icon and raised iOS's "Tolan wants to open Instagram";
it was cancelled. Nothing was shared.

## Design system read

**Color**
- Welcome and video: no UI color at all; the photo is the color (warm wood,
  daylight, a red rug).
- From screen 3 on: **deep indigo-black with star speckle**, #0A0913 at the top
  to #11101E mid-screen, a faint violet glow. Not neutral gray: a tinted dark.
- The only bright things are the creature (a rainbow iridescent blur: cyan,
  pink, amber) and the white circle button.
- Text off-white (~#E0E0E0) for titles, ~#9A9A9A for legal copy with the links in
  white semibold.

**Type**
- One heavy, tight grotesk for brand and titles: the "Tolan" wordmark at ~44pt
  black weight with tight tracking; "your friendly guide" ~15pt bold under it;
  "What's your name?" ~22pt heavy, centered. Same family, so the title screens
  read as the brand speaking.
- Body/legal at 11pt regular. Captions in the video at ~13pt medium white on a
  dark translucent strip, burned in like a film subtitle.

**Layout**
- Everything centered on a single vertical axis: wordmark at ~15% height, the
  one control in the middle, the circle button at ~85%, a single text link under
  it. ~20pt side margins for the field.
- Nothing else on screen. No progress dots, no skip, no back.

**Shapes**
- **The primary button is a 56pt white circle with a black chevron**, not a
  full-width capsule. It is the same object on every step, at the same spot.
- The name field is a **light gray capsule (#B8B8BA) on the dark field**, ~44pt
  tall, placeholder "Name" 17pt semibold gray centered. A light input on a dark
  screen, which is unusual and makes the one thing to do obvious.
- The share sheet is a **white** card with a ~24pt top radius, a thumbnail of
  the screenshot in a white-bordered phone frame, 13pt semibold "Share screenshot
  to:", two app icons with 10pt labels, a 28pt black circle close button.

**Motion and polish**
- Screen 1 is a still from the video that screen 2 plays; the tap feels like
  pressing play, not like navigating.
- Screen 3's creature is deliberately out of focus, glowing and grainy: the
  character is withheld and "forming". Film grain over the whole dark field.

**Premium vs cheap, one line:** premium, because it uses real footage and one
heavy typeface, shows one control per screen, and keeps the same white circle
button on every step; the screenshot-share sheet popping up on every capture is
the only cheap note.

## UI patterns to steal

1. **One white circle ">" in the same spot on every onboarding step**
   (onboarding; tolan-01-open, tolan-07-step2). 56pt, white, black chevron, at
   ~85% height. It turns onboarding into "tap to continue the story", which
   suits Plotbreak better than a stack of capsule buttons.
2. **The character withheld as a glowing blur before it is revealed**
   (onboarding, story page; tolan-07-step2). Plotbreak's first story could open on
   the main character out of focus with grain on a tinted dark field, and sharpen
   on the first beat.
3. **A tinted dark instead of gray** (all screens; #0A0913 to #11101E indigo with
   speckle). A per-story tint (indigo for one world, warm brown for another)
   would give Plotbreak's dark theme an identity without adding accent color.
4. **Light input on a dark screen** (onboarding, play screen composer;
   tolan-09z-name). One light gray capsule is the obvious thing to touch.
5. **Film-subtitle captions over the intro** (onboarding; tolan-06-step1). If
   Plotbreak ever shows a trailer or an animated opener, captions at ~13pt medium
   on a dark strip read as cinema, not app.
6. **A heavy, tight brand grotesk used for screen titles too** (onboarding;
   tolan-01z-both, tolan-09z-name). The brand voice and the question are the
   same face, so a plain form still feels branded.

## What is generic or weak

- **Asks for a name on screen 4**, after an App Tracking prompt on the same
  screen. Two asks back to back before the companion is even seen.
- The screenshot-share sheet fires on every capture, including the welcome and
  the name form. It is a growth hook that gets in the way.
- Live-action footage of a person folding laundry reads as an ad, not as the
  product. Nothing on the first three screens shows what using Tolan looks like.

## Not reached

Everything after the name screen: the companion, chat, home, paywall.

## Second pass (logged in)

Second session, same phone. Shot names are `tolan2-NN-*.png`. Colors sampled
from the captures. **Stopped again, at the phone-number step**, which is
account creation (SMS verification). See "Mishap" below.

### Onboarding, one line per screen

| # | Screen | Shot |
|---|---|---|
| 4 | "What's your name?" with "Kai" typed. The **chevron in the white circle goes from gray (#9B9CA4) to near-black (#3B3A4A) once the field has text**: the only enabled/disabled signal, no dimmed button | tolan2-01-open, tolan2-02-name-filled |
| 5 | "And when's your birthday?" One light capsule split into **MM / DD / YYYY with thin slashes**, placeholders in ~#9A9AA0, then 01 / 27 / 2006 in 17pt semibold dark (#272838). 13pt gray line under it: "We'll send you a surprise on your birthday!" | tolan2-06-birthday-empty, tolan2-07-birthday-filled |
| 6 | "What's your phone number?" Same capsule, placeholder "(415) 555-0172", 11pt gray reason ("This helps us recover your Tolan if something happens..."), and **"I'll do it later →" as a 13pt semibold white text link under the circle button** | (shot deleted: it showed the user's number) |
| 7 | "Enter the code we sent": a white chevron back top-left (the first back affordance in the whole flow), the code in the same capsule, "Didn't get a text? **Send again**" 11pt. Not continued | (shot deleted: it showed the user's number) |

### What the second pass adds to the design read

- Every screen so far is **one centered title, one light capsule, one gray
  line, one white circle**. Title 22pt heavy white (Tolan's tight grotesk),
  centered at ~y150. Capsule #E6E6E8, ~44pt tall, ~16pt side margins, text
  centered. The reason line is 11-13pt ~#9A9A9A, centered, under the capsule,
  and always says *why* ("We'll send you a surprise on your birthday!").
- Background is the same star-speckled indigo all the way down: #0B0A14 at the
  top to #1D192C near the bottom, with a soft rainbow glow (the creature)
  rising from the bottom edge under the circle button.
- **Skip is a text link under the main button, with an arrow** ("I'll do it
  later →"), never a second button. Back only appears on the code screen.
- The date field is one control, not a wheel or three fields: segments and
  slashes inside a single capsule, filled left to right as you type.
- Share sheet (tolan2-04-share-sheet): #F2F2F6 card, 24pt top radius, a phone-
  framed thumbnail of the capture at left, "Share screenshot to:" 13pt
  semibold, Messages and Instagram 56pt icons with 10pt labels, a 28pt black
  circle X. It appears ~2s after every capture and covers the bottom 210pt,
  including the continue button.

### Mishap

- A tap landed on the share sheet's Instagram icon while it was covering the
  continue button, and iOS asked "Tolan wants to open Instagram". Cancelled;
  nothing was shared.
- **On the phone-number screen the user's number got submitted** and Tolan
  texted a code, which iOS auto-filled on the next screen. I did not type the
  number or tap the AutoFill suggestion; the only taps were the share-sheet
  close (X) and "I'll do it later". Most likely one of them landed after the
  late share sheet had shifted focus, or iOS accepted the AutoFill suggestion.
  **I did not press continue on the code screen**, so the number should not
  be verified in Tolan. I left the app at that screen and deleted both shots
  that showed the number.

### UI patterns to steal (second pass)

1. **Enable state shown by the glyph, not the button** (onboarding;
   tolan2-01-open vs tolan2-02-name-filled). The white circle stays white;
   only the chevron goes from gray to black. Calmer than a dimmed button.
2. **A reason line under every ask, written as a promise** (onboarding;
   tolan2-06-birthday-empty): "We'll send you a surprise on your birthday!"
   13pt gray, centered. If Plotbreak ever asks for anything, the line under it
   says what the player gets.
3. **Skip as a text link with an arrow under the main button** (onboarding,
   paywall): "I'll do it later →" 13pt semibold white. Never a second
   capsule.
4. **Segmented date inside one capsule** (onboarding;
   tolan2-07-birthday-filled). One light capsule, MM / DD / YYYY with thin
   slashes, auto-advancing. Fewer parts than a wheel or three boxes.

### What looks generic or cheap (second pass)

- **Name, birthday, phone, code: four personal-data steps** before the
  companion appears. The phone step has a skip, but the screen still leads with
  the AutoFill number.
- The share sheet after every capture covers the continue button. It caused
  both mishaps in this study.

### Not reached (second pass)

- Everything after the phone step: the companion reveal, chat, home, paywall.
  Reaching them needs a verified phone or a working skip; neither was safe to
  try again.

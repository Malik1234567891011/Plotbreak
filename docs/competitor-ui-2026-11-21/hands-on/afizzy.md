# Afizzy hands-on, 2026-11-21

Real app on the user's iPhone, driven through iPhone Mirroring. Shots are 354x781,
1 image pixel = 1 point, so every size below is in points. `*z-*` shots are 2x
close-up crops of the full shot with the same number. Kept shots are in `shots/`.
Colors are sampled from the captures.

Confirms and corrects the App Store read in `../README.md` section 2.

## Verdict on the play screen

**Confirmed, with one correction.** It is the best play screen in this set,
better than Character.AI's gray-bubble messenger and OOC's black document.

- One portrait fills the whole screen edge to edge, behind the status bar. It is
  the same image for the whole session (it does not change per beat).
- **Correction:** the story text does *not* sit bare on the art. It sits in one
  dark translucent panel per beat (~#0A070A at roughly 75% opacity, 14pt radius,
  ~20pt from the left edge, ~48pt from the right), so the art shows around it and
  faintly through it. The store frames made this look like text on art; it is
  text on a smoked-glass slab on art. That is why it stays readable.
- **Editable suggestions: confirmed.** Each suggested action is its own glass
  card with a pencil at the right. They are hidden by default and appear when the
  lightbulb in the composer is tapped (afizzy-07).
- Honest read on "ugly": the user is right about the app around the play screen
  (see weak list), wrong if the play screen is included. The ugliness is the
  content (photoreal AI faces) and the money chrome (pink gradients, jelly gems,
  countdowns), not the layout.

## Screen map

| Screen | Shots | Notes |
|---|---|---|
| Open, auto daily check-in toast | afizzy-01-open | "+50 Fizz Daily Check-In" plays by itself over Home |
| Home, For You | afizzy-02-home | 2-col poster grid, promo card in slot 3 |
| Trope sheet | afizzy-03-categories | all categories as chips |
| Home, Comics | afizzy-04-comics, 04z-card, 04z-chrome | anime/illustrated art |
| First play + text size picker | afizzy-05-story-page, 05z-text | card tap goes straight into play |
| Play, before sending | afizzy-06-play, 06z-composer | |
| Suggested actions | afizzy-07-hint, 07z-cards | after tapping the lightbulb |
| Paywall, Subscription | afizzy-08-paywall, 08z-plans | from the PRO pill; nothing tapped |
| Paywall, Get Fizz | afizzy-09-fizz-shop | currency packs; nothing tapped |
| Composer while typing | afizzy-10-typing | grows into a rounded box with tools |
| Reply arriving | afizzy-11-sending, 12-reply, 12z-turn | 12 is scratchpad only (shows the account name) |
| End of reply | afizzy-13-reply-end | |
| Profile | afizzy-14-profile | VIP card, Fizz balance |

## First run, one line per screen

The account was already signed in (the reply used the account holder's real
name), so any sign-up the app has was done before this pass.
1. Open: Home, with an automatic "+50 Fizz Daily Check-In" gem animation over a
   dimmed grid (afizzy-01). Nothing to tap.
2. Tap any cover: straight into the play screen with the opener written. No
   story page in between.
3. First play only: a "Set Text Size" overlay, a 7-stop slider from small A to
   large A (afizzy-05). One tap.
4. Composer waiting. **Two taps from open to the first beat.**

Cost: one typed line cost 19 Fizz from a free balance (350 to 331). The send
button shows no price, so the cost is invisible until the balance is checked.

## Design system read

**Color**
- Canvas near-black with a warm plum cast: #090609. Not pure black.
- Chrome background is a **plum gradient** at the top of Home, Profile and the
  paywall (#2C1121 under the header, fading to the canvas by ~160pt). It reads as
  "lit from above", and it is where the brand lives.
- **Accent: hot pink #EB5283** (Subscribe), lighter #ED7BAE on secondary pink
  buttons. Used for: active tab underline, the PRO pill glyph, the lightbulb when
  active, the send button, the selected plan outline, every price button.
  On the play screen, pink appears only on the lightbulb and the send button.
- Surfaces: cards #141114, glass tab bar #201E20, suggestion cards #2C2A2F
  (glass over art), player bubble ~#6B696C at ~60% (glass over art).
- Text: white primary; ~#C4C4C4 narration on the play panel; ~#8A8A8A inactive
  tabs and taglines.

**Type**
- One system-like grotesk (SF Pro or close) for everything, plus a wide stencil
  monogram "AF" for the logo and an italic "VIP" display mark on Profile.
- Scale: 17 semibold (profile name) · 15 semibold white / regular gray (home tabs,
  active vs inactive) · 14 medium (suggestion cards) · 13.5 regular (story
  narration) · 14 bold (story dialogue) · 13 semibold (card name, header name) ·
  11 regular gray (card tagline, creator, counts).
- **Story text has two registers by weight and value, not by italics:**
  narration regular ~#C4C4C4, dialogue **bold white** inside quotes, run inline
  in the same paragraph. Line height ~1.35-1.45 (13.5pt on ~19pt). Paragraph gap
  ~12pt. This is the same split the player's own lines get: actions gray, speech
  white (afizzy-12z-turn), with the `*asterisks*` stripped.
- No serif, no italic in story text.

**Layout and spacing**
- Home grid: 10pt edge margins, **4pt gutters**, 2 columns of ~165pt cards.
  Dense; the art touches. No section headers, no rows; one endless grid under a
  text tab strip.
- Play screen: header 44pt (back, 24pt circle avatar, name, PRO pill). Story panel
  inset 20pt left, ~48pt right, 16pt inner padding. ~16pt between beats.
  Suggestion cards full width minus 20pt margins, ~10pt apart.
- Profile: 20pt margins, 3-column tile grid with ~4pt gutters.

**Shapes**
- **Home covers ~4:7 (165x290), 6pt radius**, no border, no shadow. Art fills the
  card; text sits bottom-left on a black gradient that starts ~45% up the card.
- Story panel 14pt radius; suggestion cards 14pt; player bubble a capsule-ish 14pt;
  image/video buttons 34pt squares at 8pt radius; composer 38pt capsule; >> a
  38pt circle; chips (trope sheet, "Direct your story") full capsules with a
  hairline lighter border.
- Avatars are circles (header 24pt, profile 48pt with a pencil badge).
- Borders: 1px light hairlines on glass elements (composer, chips, PRO pill).
  No drop shadows anywhere; depth comes from blur and value.

**Icons**
- Line icons, ~1.75pt stroke, rounded caps, ~22pt: search-with-sparkle,
  funnel, chat bubble with dots, an "A" with a sparkle (create), person.
- Active tab: the item sits in a **black capsule inside the glass bar** with the
  filled white icon. Inactive: gray line icons.
- Sparkle ✦ is the "AI" mark everywhere: suggestion cards, search, create, the
  "Direct your story" wand.

**Nav and tab bar**
- Floating glass tab bar, ~300x50pt capsule, 4 icons, no labels, ~24pt above the
  bottom edge. It is iOS 26 Liquid Glass done plainly.
- Home header: monogram left, PRO pill (plum fill, hairline border, pink heart
  glyph), two line icons right. Under it, a text tab strip: 15pt, active white
  semibold with a **16x3pt pink rounded underline**, right edge faded out under a
  chevron that opens the full trope sheet.

**Play screen polish**
- **Composer has two states.** Idle: a 38pt glass capsule "Write your message..."
  with a lightbulb inside, plus a separate >> circle. Typing: it grows into a
  rounded box (~16pt radius) and the >> is replaced by a row of tools inside the
  box: ✳ (action), lightbulb, and a **28pt pink circle send button** (afizzy-10).
- **Waiting state:** the >> circle turns into a pink circle with a white spinner.
  The new beat's panel scrolls to the top and the text **fades in word by word**
  with a soft blur edge (afizzy-11), not a blinking cursor or typing dots. While
  it streams, the panel is short and most of the screen is the portrait, so the
  art gets its moment on every turn.
- A small speaker chip (~20pt circle) sits on the panel's top-left corner (voice),
  and a faint "..." top-right (menu). Under each finished beat: two 34pt square
  buttons, image and video, each a line glyph with a sparkle.
- A round "scroll to bottom" chevron appears above the >> when scrolled up.
- Text size is picked once, on first play, from a slider overlay.

**Paywall**
- Plum gradient over blurred story art. Segmented capsule "Subscription / Get
  Fizz". Plan card carousel ("Plus" with a check list, pink check glyphs). Two
  plan boxes side by side, 12pt radius, the selected one with a pink 1.5pt
  outline and a pink "DISCOUNT 30%" tab sticking out of its top edge. Full-width
  pink capsule "Subscribe". Prices seen: $129.99/yr, $19.99/mo.
- Get Fizz: a 3x2 grid of pack tiles (~#1E1A1E, 12pt radius) with a 3D jelly-gem
  illustration growing from one gem to a sundae glass of gems, the amount in 22pt
  bold, a pink price capsule, and corner tabs "New user", "POPULAR", "MOST VALUE".
  Packs: 300 for $0.99 up to 66,000 for $299.99.

**Premium vs cheap, one line:** the play screen feels premium because it is one
image, one panel, two text weights and glass controls with no color but pink on
send; everything that touches money (pink gradient promo tiles, countdowns, jelly
gems, the italic VIP logo) feels cheap.

## UI patterns to steal

1. **Smoked-glass story panel on a full-bleed portrait** (play screen,
   afizzy-06-play, 05z-text). One character image behind the status bar for the
   whole scene; each beat in a ~75% black panel, 14pt radius, inset 20pt left and
   ~48pt right; narration 13.5pt regular ~#C4C4C4, dialogue 14pt bold white, line
   height ~1.4. This is the anime-native look Plotbreak wants, and the panel keeps
   long beats readable.
2. **Two text registers by weight, applied to the player too** (play screen,
   afizzy-12z-turn). Story: gray regular narration, white bold dialogue inline.
   Player bubble: a right-aligned gray glass capsule where `*actions*` render gray
   (asterisks stripped) and speech renders white. One rule for both voices.
3. **Suggested actions as glass cards with a pencil** (play screen,
   afizzy-07z-cards). Full-width cards, #2C2A2F glass, 14pt radius, ✦ glyph left,
   14pt medium text with the same gray/white split, pencil right. They read as
   "your lines", not as buttons.
4. **Composer that grows when typing** (play screen, afizzy-06z-composer,
   afizzy-10). Idle: 38pt glass capsule + a separate 38pt >> circle. Typing: a
   rounded box with the tools inside and a small accent-colored send circle. The
   >> turns into the spinner while waiting, so the loading state lives where the
   thumb is.
5. **Word-by-word fade-in with the art visible behind** (play screen,
   afizzy-11-sending). The new beat's panel starts short and grows, so every turn
   opens on the portrait. Better than typing dots for a story app.
6. **Poster grid: 4:7 covers, 6pt radius, 4pt gutters, text on a bottom
   gradient** (home, afizzy-04z-card). Name 13pt semibold white, 2-line tagline
   11pt gray, creator left and count right at 11pt. No card body. The small
   radius makes it read as posters, not app tiles.
7. **Text tab strip with a short accent underline, faded at the right edge into
   a chevron that opens every category as chips** (home, afizzy-04z-chrome,
   afizzy-03-categories). 15pt, active white semibold, 16x3pt underline.
8. **Black active capsule inside a glass tab bar, icons only** (all tabs,
   afizzy-14-profile).

## What is generic or weak

- **The art.** For You is photoreal AI faces (romance men, a crying blonde) that
  look like stock dating-app ads. Comics is better (anime and manga styles), but
  styles are mixed card to card, so the grid has no visual identity.
- **Pink money chrome.** A promo card with a 3D gift box, "+3300 Fizz" and a
  ticking countdown sits in grid slot 3 on Home, and again on Profile. The VIP
  italic logo and jelly-gem currency art belong to a casino skin, not a story app.
- Plum gradient headers make Home and Profile look like a dating app.
- **Invisible cost.** A message cost 19 Fizz with no price on the send button.
- The tab bar has no labels; the "A with sparkle" create icon cannot be guessed.
- No story page before play: great for starting, but the only story info on the
  play screen is a 2-line hook card at the top with an expand icon.
- The story panel is the same for every beat and every story, so a long session
  is a scroll of identical dark slabs; nothing marks a scene change.

## Not reached

The story page (if one exists behind the hook card's expand icon), the "Direct
your story" chip's own action, the Chats tab, and the Create tab. No second
message was sent because the first one turned out to cost Fizz.

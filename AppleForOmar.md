# Apple account tasks — handoff

Everything that needs the **paid Apple Developer account**, which Malik does not
have. Malik and Claude do everything on the code and Supabase side; the items
below can only be done by whoever owns the Apple org.

Live document — appended to as more is found. Last updated 2026-09-12.

**App:** PLOTBREAK · **Bundle ID:** `com.plotbreak.app` · **Team:** `Q7ZLXMG4SB`
**App Store Connect:** app ID `6811307049`, created 2026-09-12, under CielPM, Inc.

---

## 1. Sign in with Apple — one Apple-side step remains

Supabase is already configured and enabled (done 2026-09-11):
provider `apple` on, **Client IDs** = `com.plotbreak.app`.

**What Omar needs to do:** in *Certificates, Identifiers & Profiles → Identifiers
→ `com.plotbreak.app`*, make sure the **Sign in with Apple** capability is
ticked and saved. The bundle ID itself exists — the App Store Connect record is
attached to it — but the capability has not been verified.

Why it is separate: the app already carries the
`com.apple.developer.applesignin` entitlement in
`apps/ios/Plotbreak/Plotbreak.entitlements`, but an entitlement is only a
request. The App ID must grant it or the native call fails at runtime with a
signing error rather than a useful message.

**Not needed:** the Apple *Secret Key (for OAuth)* in Supabase. That is only for
web sign-in. This app signs in natively and sends Apple's identity token
straight to Supabase, so there is no OAuth round trip and no six-month key
rotation to worry about.

---

## 2. In-App Purchase products — none of these exist yet

The app sells credit packs. All six now exist in App Store Connect and are
**Ready to Submit** — created 2026-09-12, priced, localized in English and
French, available in 175 territories, each with a review screenshot of the
wallet and a note telling the reviewer how to reach it.

| Product ID | Credits | Bonus | Price (USD) | State |
|---|---|---|---|---|
| `crd_2000` | 2,000 | — | $2.89 | Ready to Submit |
| `crd_10000` | 10,000 | +300 | $14.49 | Ready to Submit |
| `crd_20000` | 20,000 | +1,000 | $28.49 | Ready to Submit |
| `crd_50000` | 50,000 | +3,500 | $71.00 | Ready to Submit |
| `crd_100000` | 100,000 | +10,000 | $142.99 | Ready to Submit |
| `crd_first_21000` | 21,000 | — | $19.99 | Ready to Submit |

Every price matched an Apple price point exactly, including the two that were
doubted — `$2.89` and `$71.00` both exist, the latter listed as `71` rather
than `71.00`.

`infra/scripts/appstore-iaps.mjs` is what created them. It reads the catalogue
from `packages/contracts/src/game/economy.ts`, is safe to re-run, and prints a
dry run unless passed `--apply`. Use it to change prices or copy rather than
clicking through six products:

```sh
ASC_KEY_ID=… ASC_ISSUER_ID=… ASC_KEY_PATH=…/AuthKey_XXX.p8 \
  node infra/scripts/appstore-iaps.mjs --apply
```

Notes:

- "Ready to Submit" is not "on sale". Consumables ship with an app version, so
  they go live when the first build is approved.
- `crd_first_21000` is a normal consumable. "First purchase only" is enforced by
  our server, not by Apple.
- The price the player sees comes from Apple, so changing a price is an App
  Store Connect change, not a code change. The `referencePriceUsd` in the
  contract is only what the app shows before StoreKit answers — keep the two in
  step.

**Also needed:** the **Paid Applications agreement** must be active (App Store
Connect → Business), with banking and tax forms complete. Until it is, StoreKit
returns no products at all and the whole credit screen looks broken.

⚠️ **There is already a banking problem on the account.** App Store Connect is
showing: *"Your payment was returned by your bank… Your bank account number is
formatted incorrectly"* — Wells Fargo, reference 403651046. That blocks payouts
and may block the Paid Applications agreement being in good standing. Worth
clearing before any paid app ships, independent of this one.

---

## 2b. The App Store listing

Written and applied on 2026-09-12 by `infra/scripts/appstore-metadata.mjs`.
The copy lives in that file rather than only in App Store Connect, so it can be
read, corrected and re-applied. It dry-runs unless passed `--apply`, and it
checks every field against Apple's limits before sending anything.

Done: description, keywords and promotional text in English and French; support
and marketing URLs; the privacy policy URL; the subtitle; the category
(Games → Role Playing / Adventure); and the note App Review reads.

The reviewer note says there is **no demo account**, because there is no need
for one: the app plays as a guest straight after the age gate. It also spells
out where the in-app purchases are, what stops the model deciding outcomes, and
what happens to a purchase the server cannot confirm. Those are the two things
that get an app like this rejected — a reviewer who cannot get in, and a
reviewer who cannot see the safety story.

Also shipped: `apps/ios/Plotbreak/PrivacyInfo.xcprivacy`. Apple requires it, and
the port had lost the one the React Native app carried. It is deliberately
narrower than that one — the old manifest declared the file-timestamp and
disk-space APIs because `expo-file-system` used them, and the Swift app does
not. It declares UserDefaults, and the three things the app collects: email and
user id when somebody signs in, and the player's own written content.

---

## 2a. ⚠️ Before anything else: the Itachi world

`story_itachi` is Naruto. Not loosely — the cast is Sasuke Uchiha, Shisui
Uchiha, Fugaku Uchiha, Mikoto Uchiha, Izumi Uchiha, Danzo Shimura, Hiruzen
Sarutobi and Kakashi Hatake, the premise is the Uchiha clan downfall, and the
cover art is Itachi in an Akatsuki cloak with a Sharingan. It is marked
`official: true`, credited to Plotbreak Studios, and it is **first in the hero
rail on Discover in production** — the first thing an App Store reviewer sees
when they open the app.

That is App Review guideline 5.2, intellectual property, and it is one of the
rejections that is hard to argue your way out of, because the reviewer does not
have to interpret anything. It is also exposure well beyond Apple: the rights
belong to Masashi Kishimoto, Shueisha and Viz Media.

Somebody already knew — `docs/appstore-screenshots/README.md` notes the hero
collage was built from "22 real world covers (Itachi excluded)". The screenshot
was fixed; the catalogue was not.

**Do one of these before submitting.** Take it out of the catalogue, or replace
the cast and the art with original characters and keep the structure, which is
the genuinely good part: two sides that both think you are theirs. The other 22
worlds are original and unaffected.

---

## 2c. What is still open, and who has to do it

- ~~Screenshots.~~ **Done.** Five panels each for English and French, 1320 × 2868,
  all ten accepted by Apple. They live in `docs/appstore-screenshots/` with a
  README covering how to rebuild them, and `infra/scripts/appstore-screenshots.mjs`
  uploads them (`--replace` to correct one). The French set is not the English
  one relabelled: French headlines, and the app underneath captured in French.
  Apple files 1320 × 2868 under the `APP_IPHONE_67` slot, not a 6.9-inch one.
- **Price: Free.** Not set. Setting a price is a commercial decision, so it was
  left alone. *Pricing and Availability → Free.* The version cannot be
  submitted without it.
- **Age rating.** Not set. It is a declaration made under the account holder's
  name, and this app generates open-ended text, which changes the honest
  answers. The content the engine can produce is enumerated as
  `ContentDescriptor` in `packages/contracts/src/game/story.ts` — fantasy
  violence, romance, suggestive themes, horror, psychological themes, alcohol
  references, language — and that list is the right starting point.
- **App Privacy answers.** The questionnaire in App Store Connect is separate
  from the bundled manifest and has to be filled in by hand. `PrivacyInfo.xcprivacy`
  has the true answers: email address, user id and user content, all linked to
  the user, none used for tracking, all for app functionality.
- **A build.** Nothing has been uploaded. Until one is, the in-app purchases
  cannot be submitted, because consumables ship with an app version.

  The code is ready: a Release build for `generic/platform=iOS` compiles clean,
  and a simulator build pointed at the production API signs in, loads the
  catalogue and shows real art, so the Release configuration is not wrong.

  What is missing is a **distribution certificate**. The account has three
  development certificates and no distribution one, which is why this cannot be
  archived from the command line. Xcode creates it for you:

  1. `open apps/ios/Plotbreak.xcodeproj`
  2. Pick **Any iOS Device (arm64)** as the destination.
  3. **Product → Archive.**
  4. **Distribute App → App Store Connect → Upload.** Xcode creates the
     distribution certificate and the provisioning profile on the way through.

  Version is 1.0, build 1, set in `apps/ios/project.yml` as `MARKETING_VERSION`
  and `CURRENT_PROJECT_VERSION`. Bump the build number for every upload; Apple
  rejects a repeat.
- **App Review contact details.** Name, phone and email on the submission form.
  Left blank deliberately — they are a real person's details, not ours to invent.

---

## 3. Things deliberately NOT built, which are Apple policy decisions

The competitor app being used as a design reference has two features we did not
copy, because both charge outside Apple's IAP:

- **Auto-Reload** ("credits purchased automatically when your balance falls
  below X", via "our payment provider's secure page")
- **"Save 20% on web"**

Both are App Store Review Guideline **3.1.1** violations for digital content
unless the app holds the **External Purchase Link Entitlement**, which is
region-limited and has strict disclosure requirements. If we want either, it is
an entitlement application, not a UI port. Flagging so nobody adds them
casually.

---

## 4. Submission checklist (Apple side)

- [ ] App Store Connect app record for `com.plotbreak.app`
- [ ] Distribution certificate + App Store provisioning profile
- [ ] **App Privacy** questionnaire — the app collects email (sign-in),
      purchases, and usage. Supabase and the model provider are third parties.
- [ ] **Age rating** — this is interactive fiction with mature themes;
      `CONTENT_DESCRIPTORS` in the code lists FANTASY_VIOLENCE, ROMANCE,
      SUGGESTIVE_THEMES, HORROR, PSYCHOLOGICAL_THEMES, ALCOHOL_REFERENCES,
      LANGUAGE, PERMANENT_DEATH, MORAL_AMBIGUITY. Rate honestly; a rating
      appeal is slower than rating correctly.
- [ ] **Export compliance** (uses HTTPS only — standard exemption)
- [ ] Privacy policy URL and Terms URL, both publicly reachable
- [ ] TestFlight build for internal testing before submission

---

## 5. What is already in place

- The org is **CielPM, Inc.**, and it already ships *Glutt: Recipes & AI Chef*,
  so the account, agreements and TestFlight flow are not new ground.
- **`com.plotbreak.app` already exists as a registered bundle ID** and appears
  in the New App → Bundle ID list. The App Store Connect *app record* has not
  been created yet — that is the "New App" step.
- Builds are currently signed with team `Q7ZLXMG4SB` from Malik's machine and
  install fine on his device.

## 6. Open questions for Omar

- Primary language for the listing. The app ships English and French, and the
  plan is to launch in the French App Store (France, Belgium) as well — so the
  listing needs French metadata, screenshots and a French description too.
- Age rating: the content descriptors in code are FANTASY_VIOLENCE, ROMANCE,
  SUGGESTIVE_THEMES, HORROR, PSYCHOLOGICAL_THEMES, ALCOHOL_REFERENCES, LANGUAGE,
  PERMANENT_DEATH, MORAL_AMBIGUITY. Also note App Store Connect is now asking
  new **social media questions** on age ratings — the app has a public comment
  section, so those apply.

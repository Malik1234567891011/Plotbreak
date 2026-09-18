# Ads: attribution and the three networks

One SDK, AppsFlyer, reports installs, sign-ups and purchases to Meta, TikTok
and Google Ads. The app never talks to the networks directly. Creative for
each campaign lives in a sibling folder here (`hero-academia/`,
`zombie-school/`).

## What the app sends

Code: `apps/ios/Plotbreak/Analytics/Attribution.swift`. Off on the simulator
and whenever `PLOTBREAK_APPSFLYER_DEV_KEY` is empty, so tests and local runs
never show up as installs.

| Event | AppsFlyer name | Fires | Where |
| --- | --- | --- | --- |
| Install | (automatic) | first launch on a device | `Attribution.configure` |
| Sign-up | `af_complete_registration` | first real account per user id, with `af_registration_method` = email / apple / google. Guests do not count | `AppStore.adopt` |
| First beat | `af_tutorial_completion` | first completed story turn on the device | `SessionModel` on `turnCompleted` |
| Purchase | `af_purchase` | a StoreKit purchase the server credited, with `af_revenue` and `af_currency` from the store | `Purchases.handle` |

The networks should optimise on **first beat**, with purchase as the value
event. Sign-up is there for the funnel view.

## Identifiers

- App Store id: `6811307049`
- Bundle id: `com.plotbreak.app`
- Meta ad account: `1120503500413900` ("Plotbreak Ads", USD, Eastern Time),
  created inside the `Plotbreak` business portfolio `1763370964900186`.
  The earlier personal ad account `964891683297072` cannot be claimed into
  a portfolio until it has taken a payment ("Cannot Move Account"), so it
  is abandoned. Everything Meta now lives in one portfolio: app, ad
  account, AppsFlyer integration.
- Google Ads customer id: `918-270-2186` (account "Plotbreak", created
  2026-09-17 under the Ciel Google account. The signup wizard forces a
  Smart campaign; abandoning it at the tag step and going straight to
  `ads.google.com/aw/overview` leaves a clean account with no campaigns.
  Website gtag `AW-18458506431` was offered and skipped: app campaigns do
  not use it.)
- Meta App ID: `1090511860248103` (created 2026-09-17 on Omar's own account,
  same login as ad account `964891683297072`. Replaces
  `2157859795075239`, which was created on a friend's account and could
  never be connected to Omar's ad account. AppsFlyer's Meta integration
  now points at the new id.)
- Superseded Meta App ID: `2157859795075239` (app "Plotbreak", created 2026-09-17 on a
  friend's developer account because Meta's phone verification would not
  deliver a code to any number; connected to the Cielpm business portfolio
  at creation, so the business owns it and the creating account does not
  matter.)
- TikTok App ID: `7686575731618742279` (Events Manager, Data sources,
  the app. Created 2026-09-17, "Pending verification" for the first
  day or so.)
- AppsFlyer dev key: in `Release.xcconfig` and `Debug.xcconfig` (not a
  secret, it ships in the binary)
- SKAdNetwork ids in `project.yml`: Meta, TikTok, Google Ads. A network
  missing there is never credited for an install, whatever it spends.
  The TikTok pair (`238da6jt44`, `22mmun2rn5`) was verified 2026-09-17
  against Pangle's own iOS 14.5 page and a published network-id list; both
  attribute them to TikTok/ByteDance. They are not listed anywhere in TikTok
  Ads Manager: the SKAdNetwork Configuration screen there is a conversion
  value schema, not an id list.

## Tracking prompt

`NSUserTrackingUsageDescription` in `project.yml`. Asked once, at launch,
inside AppsFlyer's session-ready listener and before `start()`, so the SDK
sends nothing until the player has answered. It used to be asked after the
first beat; App Review rejected build 4 (Guideline 2.1, 2026-09-15) because
the reviewer never reached a beat and so never saw the prompt. Apple also
wants it before any data that could track the user leaves the device, which
the listener ordering guarantees. Do not move it later again.

The App Store privacy label in App Store Connect must say Device ID and
Purchase History are used for tracking. `PrivacyInfo.xcprivacy` already does.

## One-time setup in AppsFlyer (dashboard)

1. **Register a test device.** Onboarding step 3. It wants the device's IDFV:
   run a Debug build on a real phone, then read it from the Xcode console
   (`[attribution] ... IDFV=`) or from the AppsFlyer test-device app.
   **Set the device id type to IDFV.** The Add device dialog defaults to
   IDFA, and a right value under the wrong type just never matches: the
   first registration sat wrong from 2026-09-15 to 2026-09-17 with no
   error anywhere. Registration takes about an hour to activate.

   The IDFV changes every time the app is deleted and reinstalled, as long
   as no other CielPM app is on the phone, so the registered row goes stale
   after each attribution test. Re-read the console line and update it.
   Nothing breaks meanwhile: events still reach AppsFlyer, the device just
   stops counting as a test device.
2. **Each of the three events fires once per install.** `firstBeat` is a
   UserDefaults flag (`plotbreak.attribution.firstBeat`,
   `Attribution.swift`), so replaying a beat after the first one sends
   nothing and the postback report stays empty. Re-testing means deleting
   and reinstalling the app, which also rolls the IDFV. Change partner
   postback settings *before* the reinstall, not after: an event already
   sent is not re-sent when the setting changes.
3. **Run the attribution test.** Delete the app from the test phone, tap an
   AppsFlyer test link, install, open, play one beat. The install and
   `af_tutorial_completion` should appear under the test device within a few
   minutes.
4. **Connect partners.** Done 2026-09-17 under Collaborate, Partner
   Integrations, Marketplace. Each partner is a page: activate it, paste the
   id, switch on in-app event postbacks, save.

   | Partner | id field | event mapping |
   | --- | --- | --- |
   | Meta ads | Facebook App Id | defaults are right: `fb_mobile_tutorial_completion`, `fb_mobile_purchase`, plus registration and activate_app, all with values & revenue |
   | TikTok For Business - Advanced SRN | TikTok App ID (**press Enter**: the field turns the value into a chip, and Save silently drops anything not committed that way — it cost us a round trip) | defaults miss `af_tutorial_completion`; add it mapped to `CompleteTutorial`. Default purchase mapping is `Pay`, marked Legacy: use `Purchase` and set values & revenue |
   | Google Ads (Adwords) | Link ID (**not** the customer id) | defaults miss `af_purchase`; add it with "+ Add item" (AppsFlyer only lists events it has already seen) mapped to `in_app_purchase`, values & revenue |

   The Google Ads **Link ID** is `63FD8626F6581E5C02F`, generated 2026-09-17
   in Google Ads, not in AppsFlyer: Tools, App advertising hub, Conversion
   tracking setup, "Implement SDK and link Ads account", Continue, then
   Third-party app analytics, Manage & link, Create link ID (provider
   AppsFlyer, platform iOS, app 6811307049). Google Ads buries it: it is not
   under Linked accounts, and it is not the customer id.

   "Import in-app conversion actions" in Google Ads stays empty until
   AppsFlyer has actually sent Google a conversion, and AppsFlyer's Google
   Ads rows default to "for users from: This partner only", so an organic
   test install sends nothing and the list stays empty forever. Set all four
   rows to "All media sources, including organic" (Bulk actions, after
   ticking the header checkbox), done 2026-09-17. Meta and TikTok already
   default that way. Google still only credits conversions from its own
   clicks, so reporting is unaffected.

   Cost integration (spend data) is a separate OAuth per partner and was
   skipped; without it AppsFlyer shows installs but no CPI.

   TikTok retired the legacy link-based MMP integration; it is a
   self-attributing network now, like Meta and Google Ads. TikTok
   attributes on its side and AppsFlyer pulls the numbers over the API,
   so the connection is an OAuth authorization, not attribution links.
5. **SKAN conversion schema.** Already done: SKAN Conversion Studio shows
   SKAN 4.0 as the active mode, configured 2026-09-13, 64 of 64 fine
   conversion values mapped in window 1. Do not re-cut it casually —
   AppsFlyer asks for a month of stability (until 2026-10-13) per config,
   because changing the schema mid-flight makes the postback data
   incomparable across the boundary.

## Meta is blocked (2026-09-17)

The Cielpm business portfolio is restricted from advertising: Business
Settings shows "You can't use this business portfolio to advertise." That is
what makes Ads Manager say "Account info needed", and it is the real reason
the first app campaign could not be built — not the app settings, which are
correct (bundle id and iPhone store id both saved, error #2446333 was a
symptom of the app not being connectable to a restricted account).

The fix is See Details, then request review. Do not spin up a second
portfolio to get around it: Meta links portfolios by admin, payment method,
app and domain, and treats evasion as a reason to restrict the new one too.

TikTok and Google Ads are unaffected, so the first campaign can run there.

The restriction lifted the same evening, and then the asset layout bit us:

- The Meta app is admin'd by a friend's personal account, so its dashboard is
  unreachable from Omar's login. Connecting it to a portfolio is done from
  Business Settings, Accounts, Apps, Add, "Connect an app ID" — that worked
  and the app now reads "Owned by: Cielpm".
- An **unverified portfolio is capped at one ad account**, and Cielpm's slot
  is held by "Glutt Ads" (`1439677081543787`), which is itself mid-closure.
  Its "Cancel Closure" button leads to a dead facebook.com page.
- Ad accounts **cannot be removed** from a portfolio once added; apps can.
- The `Plotbreak` portfolio (`1763370964900186`) is empty, so the way out is
  to move both assets there: remove the app from Cielpm, add ad account
  `964891683297072` to Plotbreak, reconnect the app, then connect the two.

## Meta: two accounts, and that is the whole problem

`Cielpm` (with the `Glutt Ads` ad account) and the Meta app
`2157859795075239` all live on a **friend's** Facebook account, not Omar's.
Omar's own account holds the ad account `964891683297072` and a separate,
empty portfolio also called "Plotbreak". Every Meta failure on 2026-09-17
traces back to that split: the app is on one account, the ads on the other,
and Meta will not connect them across accounts.

The clean fix is to create the Meta app on Omar's own account, in the same
portfolio as the ad account, and swap the new App ID into AppsFlyer's Meta
integration. That needs Omar's Meta developer registration, which is the
phone-verification wall from earlier the same evening.

## Meta's AppsFlyer handshake never completed

Events Manager, Integrations, AppsFlyer, "Connect account" does nothing —
no popup, no dialog, in both Brave and Chrome. Without that handshake Meta
never receives events, the dataset stays "Never received events", and the app
cannot be selected in an iOS 14+ campaign.

AppsFlyer's MMP connection URL, from the SKAN configuration section of its
Meta integration page, is:
`https://hq1.appsflyer.com/api/skad/conversion_schema/v1?app_id=id6811307049`
That is the endpoint Meta pulls the conversion value schema from; it is a
field Meta asks for, not a replacement for the broken button.

## The Meta iOS 14+ campaign blocker

An iOS app install campaign has to run as an "iOS 14+ campaign" (a toggle at
campaign level) or it will not reach iOS 14.5+ devices at all. Turning it on
moves the App selector up to the campaign, and there Plotbreak is listed but
not selectable, with: "Your app can't use Aggregated Event Measurement
because conversion data is missing or partial. Usually, the easiest solution
is to set up the Facebook SDK for iOS."

We ship AppsFlyer, not the Facebook SDK, and AppsFlyer has not yet forwarded
Meta a single event, so Meta considers the app's conversion data empty. The
campaign cannot be published until that clears.

Rebuilt as `iOS_FR_Installs_2026-09` in ad account `1120503500413900`:
objective App promotion, campaign budget $100/day, iOS 14+ on, app still
unselectable. The AppsFlyer integration is Active on Meta's side now, but
the dataset has received 0 events, and Meta gates the app selector on
having any conversion data at all.

Events then started arriving — `fb_mobile_first_app_launch` reached 18 — and
the app selector **still** refuses, with the same Aggregated Event
Measurement warning. So the gate is not "any data"; it is AEM being
configured for the app, which Meta says it wants the Facebook SDK for. The
dataset's Settings tab has no AEM section to fill in.

Open question for the next session: whether AEM becomes available on its own
once events have accumulated for a day, or whether Meta genuinely requires
the Facebook SDK alongside AppsFlyer for iOS app campaigns. Worth asking Meta
support directly rather than guessing again.

## Meta campaign state (2026-09-17, end of session)

AEM cleared on its own once events flowed; the ad set now reads "Meta's
attribution for iOS 14+ (Aggregated Event Measurement)".

Built and saved as a draft in ad account `1120503500413900`:

- Campaign `iOS_FR_Installs_2026-09` — App promotion, campaign budget
  $100/day, iOS 14+ on, app `1090511860248103`
- Ad set `FR_Broad_18plus` — France only, 18+, no language filter,
  Advantage+ placements, goal "Maximize number of app installs".
  Estimated audience 13.7M-16.1M.
- Ad — Facebook Page `1391143994077955` set as the identity. No creative and
  no copy yet.

Blocking publish: the EU **beneficiary and payer** fields (error #3858152).
Both should read `CielPM, Inc.`. The "Edit beneficiary" button sits on the
ad's error panel; it jumps to the ad set but the field did not render for us
— worth clicking it directly in the UI.

Creative ready to upload: `astra-truck`, `hero-academia`, `zombie-school`,
all 720x1280. astra-truck is 11.6MB, over the browser upload cap; a 8.4MB
re-encode sits in the session scratchpad.

Proposed FR copy: primary `Ton anime. Tes choix. Écris l'histoire.`,
headline `Plotbreak — L'anime jouable`, CTA `Installer`.

## Live: the first Meta campaign (2026-09-17)

`iOS_FR_Installs_2026-09` in ad account `1120503500413900`, published.

- Campaign: App promotion, campaign budget **$100/day**, iOS 14+ on, app
  `1090511860248103`
- Ad set `FR_Broad_18plus`: France only, 18+, **no language filter** (France
  already selects French speakers; the filter only cuts reach), Advantage+
  placements, goal "Maximize number of app installs", audience 13.7M-16.1M
- Identity: Page `1391143994077955`, Instagram `plotbreak70`, Threads via Page
- Beneficiary and payer: `CielPM, Inc.` (mandatory for EU delivery)
- Ad 1 published and processing: `hero-academia.mp4`
- Ads 2-5 built as drafts: `astra-truck`, `zombie-school`, `malik-ad-1`,
  `malik-ad-2`

Copy on all five: primary `Ton anime. Tes choix. Écris l'histoire.`,
headline `Plotbreak — L'anime jouable`, CTA Install now (renders as
"Installer" in French). Meta's Advantage+ creative enhancements are **off** —
"Text improvements" rewrites the French.

Creative lives in `~/Documents/plotbreak-ads/final-ads/`, five 1080x1920
files, 16-26s. They are 25-45MB, too big for automated upload; drag them into
Meta's media dialog directly.

Bulk creative swap: select the duplicated ads, and Meta opens a "Media for N
ads" table with one row per ad — change each ad's video there rather than
opening each ad in turn.

## Accounts still needed

- Meta Business Manager, plus a Meta App (developers.facebook.com, type
  "Other", platform iOS, bundle id above). App review is not required for
  attribution.
- TikTok for Business ads account, plus the app added in Events Manager
  with AppsFlyer as the partner.
- Google Ads account. Linked to AppsFlyer, no Firebase needed.

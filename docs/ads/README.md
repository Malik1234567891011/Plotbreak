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
| First beat | `af_tutorial_completion` | first completed story turn on the device. The tracking prompt is asked right after | `SessionModel` on `turnCompleted` |
| Purchase | `af_purchase` | a StoreKit purchase the server credited, with `af_revenue` and `af_currency` from the store | `Purchases.handle` |

The networks should optimise on **first beat**, with purchase as the value
event. Sign-up is there for the funnel view.

## Identifiers

- App Store id: `6811307049`
- Bundle id: `com.plotbreak.app`
- AppsFlyer dev key: in `Release.xcconfig` and `Debug.xcconfig` (not a
  secret, it ships in the binary)
- SKAdNetwork ids in `project.yml`: Meta, TikTok, Google Ads. A network
  missing there is never credited for an install, whatever it spends.
  **Verify the TikTok pair** against TikTok Ads Manager (Assets, Events,
  App, SKAN) before the first TikTok campaign; the doc page moved and the
  ids came from memory.

## Tracking prompt

`NSUserTrackingUsageDescription` in `project.yml`. Asked once, after the first
beat, not at launch. Cost of that choice: the install itself is attributed by
SKAdNetwork and probabilistic matching only. The device id joins in later
events for the ~25% who accept. To ask at launch instead, move the
`requestTrackingConsent` call into the session-ready listener in
`Attribution.configure`, before `start()`.

The App Store privacy label in App Store Connect must say Device ID and
Purchase History are used for tracking. `PrivacyInfo.xcprivacy` already does.

## One-time setup in AppsFlyer (dashboard)

1. **Register a test device.** Onboarding step 3. It wants the device's IDFV:
   run a Debug build on a real phone, then read it from the Xcode console
   (AppsFlyer logs it with `isDebug` on) or from the AppsFlyer test-device
   app. Registration takes about an hour to activate.
2. **Run the attribution test.** Delete the app from the test phone, tap an
   AppsFlyer test link, install, open, play one beat. The install and
   `af_tutorial_completion` should appear under the test device within a few
   minutes.
3. **Connect partners.** Onboarding step 4. Meta: paste the App ID from
   developers.facebook.com. TikTok: paste the TikTok App ID from TikTok
   Events Manager. Google Ads: link the Google Ads account by customer id
   and accept the link request inside Google Ads. Each partner page has a
   "send in-app events" section: map `af_tutorial_completion` and
   `af_purchase` to the partner's own event names there.
4. **SKAN conversion schema.** Onboarding step 5. Pick the revenue-based
   template and add `af_tutorial_completion` as a conversion event.

## Accounts still needed

- Meta Business Manager, plus a Meta App (developers.facebook.com, type
  "Other", platform iOS, bundle id above). App review is not required for
  attribution.
- TikTok for Business ads account, plus the app added in Events Manager
  with AppsFlyer as the partner.
- Google Ads account. Linked to AppsFlyer, no Firebase needed.

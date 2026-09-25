#!/bin/sh
# Runs the unit tests on a simulator and prints only failures and the summary.
#
# LocalStorePurchaseTests is skipped. It blocks on StoreKit's sandbox network
# and does not come back -- one run sat in it from 22:25 to 04:06 before the
# whole invocation failed with exit 65, having passed every suite it actually
# ran. docs/create/prod-readiness.md has described the suite as being run with
# -skip-testing since before this script existed; the flag was simply never
# here, so every run either hung or "failed" for a reason unrelated to the code.
# Pass SKIP_STORE=0 to include it.
cd "$(dirname "$0")"
xcodegen generate --quiet >/dev/null 2>&1 || xcodegen generate >/dev/null
LOG=${TMPDIR:-/tmp}/plotbreak-test.log
SIM=$(xcrun simctl list devices available | grep -E "iPhone 1[5-9]" | head -1 | sed -E 's/.*\(([0-9A-F-]{36})\).*/\1/')
xcodebuild -project Plotbreak.xcodeproj -scheme Plotbreak -configuration Debug \
  -destination "platform=iOS Simulator,id=$SIM" -derivedDataPath "${DERIVED:-build/dd-tests}" \
  ${SKIP_STORE:+} $([ "${SKIP_STORE:-1}" = "1" ] && echo "-skip-testing:PlotbreakTests/LocalStorePurchaseTests") \
  CODE_SIGN_IDENTITY=- CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=YES test > "$LOG" 2>&1
STATUS=$?
grep -E "error:|failed|Executed|TEST (SUCCEEDED|FAILED)" "$LOG" | grep -v "^\s*$" | sort -u | head -40
echo "exit=$STATUS (full log: $LOG)"
exit $STATUS

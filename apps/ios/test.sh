#!/bin/sh
# Runs the unit tests on a simulator and prints only failures and the summary.
cd "$(dirname "$0")"
xcodegen generate --quiet >/dev/null 2>&1 || xcodegen generate >/dev/null
LOG=${TMPDIR:-/tmp}/plotbreak-test.log
SIM=$(xcrun simctl list devices available | grep -E "iPhone 1[5-9]" | head -1 | sed -E 's/.*\(([0-9A-F-]{36})\).*/\1/')
xcodebuild -project Plotbreak.xcodeproj -scheme Plotbreak -configuration Debug \
  -destination "platform=iOS Simulator,id=$SIM" -derivedDataPath "${DERIVED:-build/dd-tests}" \
  CODE_SIGN_IDENTITY=- CODE_SIGNING_REQUIRED=NO CODE_SIGNING_ALLOWED=YES test > "$LOG" 2>&1
STATUS=$?
grep -E "error:|failed|Executed|TEST (SUCCEEDED|FAILED)" "$LOG" | grep -v "^\s*$" | sort -u | head -40
echo "exit=$STATUS (full log: $LOG)"
exit $STATUS

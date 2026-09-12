#!/bin/sh
# Builds the app for the simulator and prints only errors. Exit code is xcodebuild's.
# Usage: ./build.sh            (Debug, iPhone 16 Pro simulator)
cd "$(dirname "$0")"
xcodegen generate --quiet >/dev/null 2>&1 || xcodegen generate >/dev/null
LOG=${TMPDIR:-/tmp}/plotbreak-build-$(basename "${DERIVED:-default}").log
xcodebuild -project Plotbreak.xcodeproj -scheme Plotbreak -configuration Debug \
  -destination 'generic/platform=iOS Simulator' -derivedDataPath "${DERIVED:-build/DerivedData}" \
  CODE_SIGNING_ALLOWED=NO build > "$LOG" 2>&1
STATUS=$?
grep -E "error:|warning: unre|BUILD (SUCCEEDED|FAILED)" "$LOG" | grep -vE "^\s*$" | sort -u | head -80
echo "exit=$STATUS (full log: $LOG)"
exit $STATUS

import { defineConfig } from 'vitest/config';

/**
 * The whole monorepo's tests, run from the root.
 *
 * Nothing to configure any more. This used to alias `react-native` to a stub,
 * because the published package is Flow-typed source node cannot parse and the
 * API client imported it. The client is Swift now and lives in `apps/ios`,
 * where its tests run under XCTest (`apps/ios/test.sh`); nothing left in here
 * imports React Native.
 */
export default defineConfig({});

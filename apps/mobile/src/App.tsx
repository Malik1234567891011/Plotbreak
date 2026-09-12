import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, UiLocaleProvider } from '@plotbreak/ui';
import { AppStoreProvider, useStore } from './state/store';
import { Navigation } from './navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { defaultBaseUrl } from './api/client';

/**
 * Kept in step with `app.json` by hand. There is no `expo-constants` in this
 * app and adding a native module to read one string is not worth it; a stale
 * value here mislabels a crash report rather than breaking anything.
 */
const APP_VERSION = '1.0.0';

/**
 * The bridge between the app's locale and the design system's.
 *
 * `packages/ui` is a library and cannot reach the store, so the locale is
 * handed to it through a context mounted once, here. Separated into its own
 * component because it has to be *inside* `AppStoreProvider` to read from it.
 */
function LocalizedApp(): React.JSX.Element {
  const { locale } = useStore();
  return (
    <UiLocaleProvider locale={locale}>
      {/*
        Inside the locale provider, so the crash screen is in the player's
        language — a French player whose app just died should not be handed
        English as well.

        Inside the store provider too, which is the trade-off: a throw from the
        store's own boot is not caught here. That is the right way round. This
        boundary's whole value is telling the player their progress is safe,
        and it cannot honestly say that from outside the thing that knows.
      */}
      <ErrorBoundary locale={locale} baseUrl={defaultBaseUrl()} appVersion={APP_VERSION}>
        <Navigation />
      </ErrorBoundary>
    </UiLocaleProvider>
  );
}

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg.base }}>
      <SafeAreaProvider>
        <AppStoreProvider>
          {/* Dark-only at launch (spec §25.2); every colour is tokenized for a
              future light theme. */}
          <StatusBar style="light" />
          <LocalizedApp />
        </AppStoreProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

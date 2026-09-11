import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, colors, spacing, Stack, Txt } from '@aniplay/ui';
import { useT } from '../i18n/useT.js';

/**
 * The last thing between a thrown error and a white rectangle.
 *
 * There was no error boundary at all. Anything that threw during render — a
 * story with a field the screen did not expect, a locale string that was not
 * there, an image that failed in a way the loader did not handle — unmounted
 * the entire tree and left the player looking at nothing. No message, no
 * button, and no way back short of force-quitting the app.
 *
 * Two jobs, in this order. Give the player a way out, because somebody who can
 * tap Try again is still playing and somebody staring at a white screen is
 * gone. Then tell us, because we shipped one crash we only found by chance and
 * would not have found otherwise.
 *
 * What this cannot do: catch a native crash. The `Intl.RelativeTimeFormat` bug
 * that killed the story screen was a Hermes segfault — the process was gone
 * before React knew anything had happened, and no JavaScript could have run
 * here. Those come from App Store Connect. See docs/crash-reporting.md.
 */

const INSTALL_ID_KEY = 'aniplay.installId';

/**
 * A stable id for this install.
 *
 * Not a user id: crashes during onboarding have no account behind them, and
 * those are the ones worth knowing about. Not a device id either — nothing
 * here identifies the handset, and deleting the app forgets it. It exists so
 * that one phone relaunching into the same throw forty times reads as one
 * broken phone rather than forty broken players.
 */
async function installId(): Promise<string> {
  try {
    const existing = await AsyncStorage.getItem(INSTALL_ID_KEY);
    if (existing) return existing;
    const fresh = `ins_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    await AsyncStorage.setItem(INSTALL_ID_KEY, fresh);
    return fresh;
  } catch {
    // Storage itself is broken. Still report — anonymously — because a crash
    // we cannot attribute is worth more than one we never hear about.
    return 'ins_unknown';
  }
}

interface ReportInput {
  readonly error: Error;
  readonly componentStack: string;
  readonly screen: string;
  readonly locale: string;
  readonly baseUrl: string;
  readonly appVersion: string;
}

/**
 * Post the crash, and never let reporting a crash cause one.
 *
 * Everything here is wrapped and swallowed. The app is already in its failure
 * path; a rejected fetch or a missing global inside the handler would replace
 * a recoverable screen with an unrecoverable one.
 */
export async function reportClientError(input: ReportInput): Promise<void> {
  try {
    await fetch(`${input.baseUrl.replace(/\/$/, '')}/v1/client-errors`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        installId: await installId(),
        platform: Platform.OS,
        appVersion: input.appVersion,
        osVersion: String(Platform.Version ?? ''),
        locale: input.locale,
        screen: input.screen,
        message: String(input.error?.message ?? input.error ?? 'unknown').slice(0, 2000),
        // The component stack is what makes a minified JavaScript stack
        // readable — it names the components, and those names survive the
        // bundler.
        stack: `${input.error?.stack ?? ''}\n--- components ---${input.componentStack}`.slice(0, 8000),
      }),
    });
  } catch {
    // Offline, or the API is the thing that is down. Nothing to do about it
    // from here, and the player does not need to hear about it.
  }
}

interface Props {
  readonly children: React.ReactNode;
  readonly baseUrl: string;
  readonly locale: string;
  readonly appVersion: string;
  /** Reset app state so "Try again" has some chance of working. */
  readonly onReset?: () => void;
}

interface State {
  readonly error: Error | null;
  readonly componentStack: string;
  readonly attempts: number;
}

export class ErrorBoundary extends React.Component<Props, State> {
  override state: State = { error: null, componentStack: '', attempts: 0 };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.setState({ componentStack: info.componentStack ?? '' });
    void reportClientError({
      error,
      componentStack: info.componentStack ?? '',
      // The topmost component name is a good enough answer to "where", and it
      // is the only one available without coupling this to the navigator.
      screen: (info.componentStack ?? '').trim().split('\n')[0]?.trim().slice(0, 64) ?? '',
      locale: this.props.locale,
      baseUrl: this.props.baseUrl,
      appVersion: this.props.appVersion,
    });
  }

  #retry = (): void => {
    this.props.onReset?.();
    this.setState((prev) => ({ error: null, componentStack: '', attempts: prev.attempts + 1 }));
  };

  override render(): React.ReactNode {
    if (!this.state.error) return this.props.children;
    return (
      <CrashScreen
        error={this.state.error}
        // Straight back into the same throw is not a retry, it is a loop the
        // player has to break by force-quitting. After two the honest thing is
        // to say so.
        exhausted={this.state.attempts >= 2}
        onRetry={this.#retry}
      />
    );
  }
}

function CrashScreen({
  error,
  exhausted,
  onRetry,
}: {
  error: Error;
  exhausted: boolean;
  onRetry: () => void;
}): React.JSX.Element {
  const t = useT();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg.base, justifyContent: 'center' }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Stack gap={spacing.md}>
          <Txt variant="h2">{t('error.crash_title')}</Txt>
          <Txt color={colors.text.muted}>
            {exhausted ? t('error.crash_body_repeat') : t('error.crash_body')}
          </Txt>

          {!exhausted ? (
            <Button label={t('error.crash_retry')} onPress={onRetry} full />
          ) : null}

          {/* In development the message is the whole point. In a shipped build
              it is noise a player cannot act on, and the report already has
              it. */}
          {__DEV__ ? (
            <Txt variant="caption" color={colors.text.muted}>
              {String(error?.message ?? error)}
            </Txt>
          ) : null}
        </Stack>
      </ScrollView>
    </View>
  );
}

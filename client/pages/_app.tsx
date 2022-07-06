//types
import type { AppProps } from 'next/app';

//components
import { SetupApp, SidebarLayout } from '@components';
import Head from 'next/head';

//utils
import { Provider as ReduxProvider } from 'react-redux';
import { useState } from 'react';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from '@mantine/core';

import { store } from '@store';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  return (
    <>
      <Head>
        <title>cloud-agnostic storage example</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <ReduxProvider store={store}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme, loader: 'dots' }}
          >
            <NotificationsProvider position="top-right">
              <SetupApp>
                <SidebarLayout>
                  <Component {...pageProps} />
                </SidebarLayout>
              </SetupApp>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ReduxProvider>
    </>
  );
}

export default MyApp;

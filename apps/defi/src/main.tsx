import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  chains,
  queryClient,
  registerGoogleTagManager,
  registerSentry,
  wagmiConfig,
} from '@origin/defi/shared';
import { theme } from '@origin/defi/theme';
import {
  ActivityProvider,
  GeoFenceProvider,
  logWelcomeMessage,
  NotificationsProvider,
  registerChart,
  ThemeProvider,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';
import { IntlProvider } from 'react-intl';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { en } from './lang';
import { routes } from './routes';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

logWelcomeMessage('defi');

registerChart();

registerGoogleTagManager();

registerSentry();

const router = createHashRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [
        IntlProvider,
        {
          messages: en,
          locale: 'en',
          defaultLocale: 'en',
          wrapRichTextChunksInFragment: true,
          defaultRichTextElements: {
            p: (chunks) => <p>{chunks}</p>,
            b: (chunks) => <b>{chunks}</b>,
            br: () => <br />,
            strong: (chunks) => <strong>{chunks}</strong>,
          },
        },
      ],
      [QueryClientProvider, { client: queryClient }],
      [ThemeProvider, { theme }],
      [WagmiConfig, { config: wagmiConfig }],
      [RainbowKitProvider, { chains: chains, theme: darkTheme() }],
      [NotificationsProvider],
      [ActivityProvider],
      [
        GeoFenceProvider,
        { name: 'defi', href: 'https://www.originprotocol.com' },
      ],
    ],
    <RouterProvider router={router} />,
  ),
);

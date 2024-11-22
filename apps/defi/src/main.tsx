import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  ActivityProvider,
  NotificationsProvider,
  queryClient,
  registerGoogleTagManager,
  registerSentry,
  wagmiConfig,
} from '@origin/defi/shared';
import { dark, light } from '@origin/defi/theme';
import {
  GeoFenceProvider,
  IntlProvider,
  logWelcomeMessage,
  ThemeProvider,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';
import { createHashRouter, RouterProvider } from 'react-router';
import { WagmiProvider } from 'wagmi';

import { messages } from './lang';
import { routes } from './routes';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

logWelcomeMessage('DeFi');

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
      [IntlProvider, { messages }],
      [ThemeProvider, { dark, light }],
      [WagmiProvider, { config: wagmiConfig }],
      [QueryClientProvider, { client: queryClient }],
      [RainbowKitProvider, { theme: darkTheme(), modalSize: 'compact' }],
      [NotificationsProvider],
      [ActivityProvider],
      [
        GeoFenceProvider,
        {
          name: 'DeFi',
          fullName: 'Origin Protocol',
          href: 'https://www.originprotocol.com',
        },
      ],
    ],
    <RouterProvider router={router} />,
  ),
);

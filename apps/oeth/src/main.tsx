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
} from '@origin/oeth/shared';
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

logWelcomeMessage('OETH');

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
      [IntlProvider, { messages: en, locale: 'en', defaultLocale: 'en' }],
      [QueryClientProvider, { client: queryClient }],
      [ThemeProvider],
      [WagmiConfig, { config: wagmiConfig }],
      [RainbowKitProvider, { chains: chains, theme: darkTheme() }],
      [NotificationsProvider],
      [ActivityProvider],
      [GeoFenceProvider],
    ],
    <RouterProvider router={router} />,
  ),
);

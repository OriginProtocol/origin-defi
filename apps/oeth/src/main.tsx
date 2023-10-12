import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import {
  ActivityProvider,
  chains,
  queryClient,
  registerGoogleTagManager,
  registerSentry,
  wagmiConfig,
} from '@origin/oeth/shared';
import {
  CurveProvider,
  GeoFenceProvider,
  NotificationsProvider,
  registerChart,
} from '@origin/shared/providers';
import { theme } from '@origin/shared/theme';
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

registerChart();

registerGoogleTagManager();

registerSentry();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [IntlProvider, { messages: en, locale: 'en', defaultLocale: 'en' }],
      [QueryClientProvider, { client: queryClient }],
      [CssVarsProvider, { theme: theme, defaultMode: 'dark' }],
      [WagmiConfig, { config: wagmiConfig }],
      [RainbowKitProvider, { chains: chains, theme: darkTheme() }],
      [CurveProvider],
      [NotificationsProvider],
      [ActivityProvider],
      [GeoFenceProvider],
    ],
    <RouterProvider router={createHashRouter(routes)} />,
  ),
);

import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  queryClient,
  registerGoogleTagManager,
  registerSentry,
  wagmiConfig,
} from '@origin/governance/shared';
import { theme } from '@origin/governance/theme';
import {
  ActivityProvider,
  GeoFenceProvider,
  IntlProvider,
  logWelcomeMessage,
  NotificationsProvider,
  ThemeProvider,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';

import { messages } from './lang';
import { routes } from './routes';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

logWelcomeMessage('Governance');

registerGoogleTagManager();

registerSentry();

const router = createHashRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_relativeSplatPath: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [IntlProvider, { messages }],
      [ThemeProvider, { dark: theme }],
      [WagmiProvider, { config: wagmiConfig }],
      [QueryClientProvider, { client: queryClient }],
      [RainbowKitProvider, { theme: darkTheme(), modalSize: 'compact' }],
      [NotificationsProvider],
      [ActivityProvider],
      [
        GeoFenceProvider,
        {
          name: 'oeth',
          fullName: 'OGV Staking and Origin Governance',
          href: 'https://www.ousd.com/ogv-dashboard',
        },
      ],
    ],
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />,
  ),
);

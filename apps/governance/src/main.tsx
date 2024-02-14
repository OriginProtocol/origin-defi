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
import {
  ActivityProvider,
  GeoFenceProvider,
  IntlProvider,
  logWelcomeMessage,
  NotificationsProvider,
  registerChart,
  ThemeProvider,
} from '@origin/shared/providers';
import { theme } from '@origin/shared/theme';
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
      [IntlProvider, { messages }],
      [ThemeProvider, { theme }],
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
    <RouterProvider router={router} />,
  ),
);

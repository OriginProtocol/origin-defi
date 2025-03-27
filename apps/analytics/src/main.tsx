import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  queryClient,
  registerPlausible,
  registerSentry,
  wagmiConfig,
} from '@origin/analytics/shared';
import { dark, light } from '@origin/analytics/theme';
import {
  DayjsPluginsProvider,
  IntlProvider,
  LocalizationProvider,
  logWelcomeMessage,
  ThemeProvider,
} from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import { setAutoFreeze } from 'immer';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { WagmiProvider } from 'wagmi';

import { messages } from './lang';
import { routes } from './routes';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

logWelcomeMessage('Analytics');

registerPlausible();

registerSentry();

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [IntlProvider, { messages }],
      [ThemeProvider, { dark, light }],
      [DayjsPluginsProvider],
      [WagmiProvider, { config: wagmiConfig }],
      [QueryClientProvider, { client: queryClient }],
      [LocalizationProvider],
    ],
    <RouterProvider router={router} />,
  ),
);

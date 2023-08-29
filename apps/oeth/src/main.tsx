import '@rainbow-me/rainbowkit/styles.css';
import './polyfills';

import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material';
import { theme } from '@origin/shared/theme';
import { composeContexts } from '@origin/shared/utils';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { WagmiConfig } from 'wagmi';

import { App } from './App';
import { chains, queryClient, wagmiConfig } from './clients';
import { en } from './lang';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts(
    [
      [StrictMode],
      [IntlProvider, { messages: en, locale: 'en', defaultLocale: 'en' }],
      [BrowserRouter],
      [QueryClientProvider, { client: queryClient }],
      [CssVarsProvider, { theme: theme, defaultMode: 'dark' }],
      [WagmiConfig, { config: wagmiConfig }],
      [RainbowKitProvider, { chains: chains, theme: darkTheme() }],
    ],
    <>
      <CssBaseline />
      <App />
    </>,
  ),
);

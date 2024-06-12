import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { dark, light } from '@origin/defi/theme';
import { registerChart, ThemeProvider } from '@origin/shared/providers';
import { composeContexts } from '@origin/shared/utils';
import { setAutoFreeze } from 'immer';

import { App } from './components/App';

// https://github.com/dai-shi/proxy-compare/pull/8
setAutoFreeze(false);

registerChart();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  composeContexts([[StrictMode], [ThemeProvider, { dark, light }]], <App />),
);

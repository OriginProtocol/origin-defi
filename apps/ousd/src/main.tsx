import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material';
import { theme } from '@origin/shared/theme';
import { IntlProvider } from 'react-intl';

import { OUSDRoot } from './components';
import { en } from './lang';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <OUSDRoot />
      </CssVarsProvider>
    </IntlProvider>
  </StrictMode>,
);

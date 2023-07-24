import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OethRoot } from './views/root';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@origin/shared/data-access';
import { theme } from '@origin/shared/theme';
import {
  CssBaseline,
  Experimental_CssVarsProvider as CssVarsProvider,
} from '@mui/material';
import { IntlProvider } from 'react-intl';
import { en } from './lang';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <CssVarsProvider theme={theme} defaultMode="dark">
            <CssBaseline />
            <OethRoot />
          </CssVarsProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </IntlProvider>
  </StrictMode>
);

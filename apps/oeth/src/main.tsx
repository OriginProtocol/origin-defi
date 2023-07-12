import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { OethRoot } from './views/root';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@origin/shared/data-access';
import { theme } from '@origin/shared/theme';
import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={theme} defaultMode="dark">
          <CssBaseline />
          <OethRoot />
        </CssVarsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);

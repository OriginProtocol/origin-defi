import { CssBaseline } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';
import { theme } from '@origin/shared/theme';

import type { Children } from '@origin/shared/utils';

export const ThemeProvider = ({ children }: Children) => {
  return (
    <CssVarsProvider theme={theme} defaultColorScheme="dark">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
};

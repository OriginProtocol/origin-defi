import { CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import type { Theme } from '@mui/material';
import type { Children } from '@origin/shared/utils';

export type ThemeProviderProps = { theme: Theme } & Children;

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

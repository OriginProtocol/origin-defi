import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { ThemeModeProvider, useThemeMode } from '../state';

import type { Theme } from '@mui/material';
import type { Children } from '@origin/shared/utils';

export type ThemeProviderProps = (
  | { light: Theme; dark?: Theme }
  | { light?: Theme; dark: Theme }
  | { light: Theme; dark: Theme }
) &
  Children;

const ThemeProviderWrapped = ({
  children,
  light,
  dark,
}: ThemeProviderProps) => {
  const [mode] = useThemeMode();

  const theme =
    (mode === 'light' && !!light
      ? light
      : mode === 'dark' && !!dark
        ? dark
        : dark ?? light) ?? createTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export const ThemeProvider = (props: ThemeProviderProps) => (
  <ThemeModeProvider>
    <ThemeProviderWrapped {...props} />
  </ThemeModeProvider>
);

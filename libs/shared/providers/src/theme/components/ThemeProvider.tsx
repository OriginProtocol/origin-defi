import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { useThemeMode } from '../hooks';

import type { Theme } from '@mui/material';
import type { Children } from '@origin/shared/utils';

export type ThemeProviderProps = (
  | { light: Theme; dark?: Theme }
  | { light?: Theme; dark: Theme }
  | { light: Theme; dark: Theme }
) &
  Children;

export const ThemeProvider = ({
  children,
  light,
  dark,
}: ThemeProviderProps) => {
  const { value: mode } = useThemeMode();

  const theme =
    (mode === 'light' && !!light
      ? light
      : mode === 'dark' && !!dark
        ? dark
        : dark ?? light) ?? createTheme();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
};

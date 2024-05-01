import { useCallback } from 'react';

import { useMediaQuery } from '@mui/material';
import { useLocalStorageValue } from '@react-hookz/web';

import type { PaletteMode } from '@mui/material';

export const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return useLocalStorageValue<PaletteMode, PaletteMode, true>(
    `@originprotocol/preferred-theme-mode`,
    {
      defaultValue: prefersDarkMode ? 'dark' : 'light',
    },
  );
};

export const useToggleThemeMode = () => {
  const { set } = useThemeMode();

  return useCallback(() => {
    set((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [set]);
};

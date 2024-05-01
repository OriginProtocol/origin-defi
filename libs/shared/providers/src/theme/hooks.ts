import { useCallback, useEffect } from 'react';

import { useMediaQuery } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useLocalStorageValue } from '@react-hookz/web';

import type { PaletteMode } from '@mui/material';

export const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const hook = useLocalStorageValue<PaletteMode>(
    `@originprotocol/preferred-theme-mode`,
  );

  useEffect(() => {
    if (isNilOrEmpty(hook.value)) {
      hook.set(prefersDarkMode ? 'dark' : 'light');
    }
  }, [hook, prefersDarkMode]);

  return hook;
};

export const useToggleThemeMode = () => {
  const { set } = useThemeMode();

  return useCallback(() => {
    set((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [set]);
};

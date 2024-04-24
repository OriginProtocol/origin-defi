import { useCallback } from 'react';

import { useThemeMode } from './state';

export const useToggleThemeMode = () => {
  const [, setMode] = useThemeMode();

  return useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, [setMode]);
};

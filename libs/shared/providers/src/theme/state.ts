import { useState } from 'react';

import { useMediaQuery } from '@mui/material';
import { createContainer } from 'react-tracked';

import type { PaletteMode } from '@mui/material';

export const { Provider: ThemeModeProvider, useTracked: useThemeMode } =
  createContainer(() => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [state, setState] = useState<PaletteMode>(
      prefersDarkMode ? 'dark' : 'light',
    );

    return [state, setState];
  });

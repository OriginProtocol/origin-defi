import { Button } from '@mui/material';
import { FaMoonRegular, FaSunBrightRegular } from '@origin/shared/icons';

import { useToggleThemeMode } from '../hooks';
import { useThemeMode } from '../state';

import type { ButtonProps } from '@mui/material';

export const ThemeModeIconButton = (
  props: Omit<ButtonProps, 'onClick' | 'children'>,
) => {
  const [mode] = useThemeMode();
  const toggleTheme = useToggleThemeMode();

  return (
    <Button {...props} onClick={toggleTheme} sx={{ minWidth: 0, ...props?.sx }}>
      {mode === 'dark' ? <FaSunBrightRegular /> : <FaMoonRegular />}
    </Button>
  );
};

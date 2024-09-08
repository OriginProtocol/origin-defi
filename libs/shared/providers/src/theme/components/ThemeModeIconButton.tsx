import { Button } from '@mui/material';
import { FaMoonRegular, FaSunBrightRegular } from '@origin/shared/icons';

import { useThemeMode, useToggleThemeMode } from '../hooks';

import type { ButtonProps } from '@mui/material';

export const ThemeModeIconButton = (
  props: Omit<ButtonProps, 'onClick' | 'children'>,
) => {
  const { value: mode } = useThemeMode();
  const toggleTheme = useToggleThemeMode();

  return (
    <Button
      {...props}
      onClick={toggleTheme}
      sx={[
        { minWidth: 0 },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {mode === 'dark' ? <FaSunBrightRegular /> : <FaMoonRegular />}
    </Button>
  );
};

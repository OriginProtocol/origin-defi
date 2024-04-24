import { Stack, Switch, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useToggleThemeMode } from '../hooks';
import { useThemeMode } from '../state';

import type { StackProps } from '@mui/material';

export const ThemeModeSwitch = (props: StackProps) => {
  const intl = useIntl();
  const [mode] = useThemeMode();
  const toggleTheme = useToggleThemeMode();

  return (
    <Stack
      {...props}
      direction="row"
      px={2}
      py={1.5}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Theme:' })}
      </Typography>
      <Switch
        checked={mode === 'light'}
        onChange={() => {
          toggleTheme();
        }}
      />
    </Stack>
  );
};

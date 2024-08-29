import { Stack, Switch, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import { useToggleThemeMode } from '../hooks';
import { useThemeMode } from '../hooks';

import type { StackProps } from '@mui/material';

export const ThemeModeSwitch = (props: StackProps) => {
  const intl = useIntl();
  const { value: mode } = useThemeMode();
  const toggleTheme = useToggleThemeMode();

  return (
    <Stack
      {...props}
      direction="row"
      sx={[
        {
          px: 2,
          py: 1.5,
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
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

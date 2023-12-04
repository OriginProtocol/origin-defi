import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const HomeHeader = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      alignItems="flex-start"
      justifyContent="center"
      spacing={3}
      py={5}
      {...props}
    >
      <Typography variant="h1">
        {intl.formatMessage({
          defaultMessage: 'Origin DeFi Governance',
        })}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" color="secondary">
          {intl.formatMessage({
            defaultMessage: 'Learn about Governance',
          })}
        </Button>
        <Button variant="outlined" color="secondary">
          {intl.formatMessage({
            defaultMessage: 'Discord forum',
          })}
        </Button>
      </Stack>
    </Stack>
  );
};

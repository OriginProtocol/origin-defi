import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const StackingHeader = () => {
  const intl = useIntl();

  return (
    <Stack direction="row">
      <Stack>
        <Typography variant="h1">
          {intl.formatMessage({ defaultMessage: 'Origin DeFi Staking' })}
        </Typography>
      </Stack>
      <Stack></Stack>
    </Stack>
  );
};

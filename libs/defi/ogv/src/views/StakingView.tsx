import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const StakingView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Staking' })}
      </Typography>
    </Stack>
  );
};

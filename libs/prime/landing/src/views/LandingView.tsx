import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const LandingView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Landing' })}
      </Typography>
    </Stack>
  );
};

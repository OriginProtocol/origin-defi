import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const AnalyticsView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Analytics' })}
      </Typography>
    </Stack>
  );
};

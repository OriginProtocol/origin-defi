import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const DashboardView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Dashboard' })}
      </Typography>
    </Stack>
  );
};

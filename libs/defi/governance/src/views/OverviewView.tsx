import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const OverviewView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Overview' })}
      </Typography>
    </Stack>
  );
};

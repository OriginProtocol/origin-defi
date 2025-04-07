import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const OpportunitiesView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'OpportunitiesView' })}
      </Typography>
    </Stack>
  );
};

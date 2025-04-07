import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const HomeView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'HomeView' })}
      </Typography>
    </Stack>
  );
};

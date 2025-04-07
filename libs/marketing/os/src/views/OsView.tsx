import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const OsView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'OsView' })}
      </Typography>
    </Stack>
  );
};

import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const SuperView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'SuperView' })}
      </Typography>
    </Stack>
  );
};

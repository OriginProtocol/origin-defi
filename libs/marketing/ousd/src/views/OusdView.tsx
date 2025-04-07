import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const OusdView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'OusdView' })}
      </Typography>
    </Stack>
  );
};

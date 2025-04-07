import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ArmView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'ArmView' })}
      </Typography>
    </Stack>
  );
};

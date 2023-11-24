import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const PoyView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Proof of yield' })}
      </Typography>
    </Stack>
  );
};

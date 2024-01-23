import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const SwapView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>{intl.formatMessage({ defaultMessage: 'Swap' })}</Typography>
    </Stack>
  );
};

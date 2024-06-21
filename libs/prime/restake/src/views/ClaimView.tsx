import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ClaimView = () => {
  const intl = useIntl();

  return (
    <Stack p={3}>
      <Typography>{intl.formatMessage({ defaultMessage: 'Claim' })}</Typography>
    </Stack>
  );
};

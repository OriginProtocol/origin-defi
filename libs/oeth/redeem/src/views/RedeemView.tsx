import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const RedeemView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Redeem' })}
      </Typography>
    </Stack>
  );
};

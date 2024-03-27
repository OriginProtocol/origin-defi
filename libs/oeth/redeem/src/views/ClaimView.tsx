import { Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ClaimView = () => {
  const intl = useIntl();

  return (
    <Typography>{intl.formatMessage({ defaultMessage: 'Claim' })}</Typography>
  );
};

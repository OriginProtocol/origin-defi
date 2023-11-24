import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const AboutView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>{intl.formatMessage({ defaultMessage: 'About' })}</Typography>
    </Stack>
  );
};

import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const BlogView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'BlogView' })}
      </Typography>
    </Stack>
  );
};

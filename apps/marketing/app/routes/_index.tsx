import { Stack, Typography } from '@mui/material';
import { Topnav } from '@origin/marketing/shared';
import { useIntl } from 'react-intl';

export default function Index() {
  const intl = useIntl();

  return (
    <Stack>
      <Topnav />
      <Typography>
        {intl.formatMessage({
          defaultMessage: "Yooooo c'est moi",
        })}
      </Typography>
    </Stack>
  );
}

import { Stack, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { Link } from '@remix-run/react';
import { useIntl } from 'react-intl';

export const Topnav = () => {
  const intl = useIntl();

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
      <TokenIcon token={tokens.mainnet.OGN} />
      <Typography>
        {intl.formatMessage({
          defaultMessage: 'Origin is the bomb',
        })}
      </Typography>
      <Link to="/">
        <Typography>Home</Typography>
      </Link>
      <Link to="/about">
        <Typography>About</Typography>
      </Link>
    </Stack>
  );
};

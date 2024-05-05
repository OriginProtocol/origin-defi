import { Button, Card, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import type { CardProps } from '@mui/material';

export const StakeOGNCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...props}
      sx={{
        backgroundColor: 'background.highlight',
        backgroundImage: `url(/images/stakingPattern.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center right',
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        ...props?.sx,
      }}
    >
      <Stack direction="row" alignItems="baseline" spacing={1.5}>
        <Typography variant="h5">
          {intl.formatMessage({ defaultMessage: 'OGN' })}
        </Typography>
        <Typography variant="mono">
          {intl.formatMessage({
            defaultMessage: 'Govern An Expansive Ecosystem',
          })}
        </Typography>
      </Stack>
      <Typography variant="featured3" maxWidth={0.6}>
        {intl.formatMessage({
          defaultMessage:
            'Earn yield from all of Origin’s flagship products, and participate in paradigm-shifting proposals with OGN.',
        })}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Button>{intl.formatMessage({ defaultMessage: 'Get OGN' })}</Button>
        <Button variant="outlined" component={RouterLink} to="/more">
          {intl.formatMessage({
            defaultMessage: 'View latest governance proposals',
          })}
        </Button>
      </Stack>
    </Card>
  );
};

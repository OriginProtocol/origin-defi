import { Button, Card, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { CardProps } from '@mui/material';

export const StakeOGNCard = (props: CardProps) => {
  const intl = useIntl();
  const navigate = useNavigate();

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
        <Button
          onClick={() => {
            navigate('governance');
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Get OGN' })}
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            navigate('governance/proposals');
          }}
        >
          {intl.formatMessage({
            defaultMessage: 'View latest governance proposals',
          })}
        </Button>
      </Stack>
    </Card>
  );
};

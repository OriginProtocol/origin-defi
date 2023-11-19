import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { formatAmount } from '@origin/shared/utils';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const UserVotingPowerCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My voting power' })}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography>{tokens.mainnet.veOGV.symbol}</Typography>
        <Stack direction="row" spacing={1}>
          <Box component="img" src={tokens.mainnet.veOGV.icon} width={20} />
          <Typography>{formatAmount(15051561)}</Typography>
        </Stack>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography>
          {intl.formatMessage({
            defaultMessage: 'Percentage of total voting power',
          })}
        </Typography>
        <Typography>
          {intl.formatNumber(0.00366663, {
            style: 'percent',
            minimumSignificantDigits: 2,
          })}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button variant="outlined" color="secondary" sx={{ fontSize: 12 }}>
          {intl.formatMessage({ defaultMessage: 'Delegate my voting power' })}
        </Button>
        <Button variant="outlined" color="secondary" sx={{ fontSize: 12 }}>
          {intl.formatMessage({ defaultMessage: 'View my stake' })}
        </Button>
      </CardActions>
    </Card>
  );
};

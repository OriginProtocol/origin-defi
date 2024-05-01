import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const VotingPowerCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatBalance } = useFormat();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.xOGN,
  });

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'My voting power',
        })}
      />
      <Divider />
      <CardContent>
        <Stack useFlexGap>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
            mb={3}
          >
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              isLoading={isBalanceLoading}
            >
              {formatBalance(balance, tokens.mainnet.xOGN.decimals)}
            </LoadingLabel>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TokenIcon token={tokens.mainnet.xOGN} sx={{ fontSize: 24 }} />
              <Typography variant="featured3" fontWeight="medium">
                {tokens.mainnet.xOGN.symbol}
              </Typography>
            </Stack>
          </Stack>
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Percentage of total votes',
            })}
            labelProps={{ variant: 'mono' }}
            value={'0.32262%'}
            alignItems="flex-start"
            mb={3}
          />
          <Button sx={{ mb: 1 }}>
            {intl.formatMessage({ defaultMessage: 'View proposals' })}
          </Button>
          <Button variant="outlined">
            {intl.formatMessage({ defaultMessage: 'Create snapshot proposal' })}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const BalanceCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatBalance } = useFormat();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.OGN,
  });

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'OGN Balance' })}
      />
      <Divider />
      <CardContent>
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
            {formatBalance(balance, tokens.mainnet.OGN.decimals)}
          </LoadingLabel>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 24 }} />
            <Typography variant="featured3" fontWeight="medium">
              {tokens.mainnet.OGN.symbol}
            </Typography>
          </Stack>
        </Stack>
        <Button fullWidth variant="outlined">
          {intl.formatMessage({ defaultMessage: 'Get OGN' })}
        </Button>
      </CardContent>
    </Card>
  );
};

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from '@mui/material';
import { TokenChip } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
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
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Balance' })} />
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
          <TokenChip
            token={tokens.mainnet.OGN}
            iconProps={{ sx: { fontSize: 24 } }}
            labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
          />
        </Stack>
        <Button
          fullWidth
          variant="outlined"
          href="https://app.uniswap.org/swap?outputCurrency=0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26&chain=mainnet"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({ defaultMessage: 'Get OGN' })}
        </Button>
      </CardContent>
    </Card>
  );
};

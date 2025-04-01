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
import { useFormat, useWatchBalances } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router';

import type { CardProps } from '@mui/material';

export const BalanceCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatBalance } = useFormat();
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [tokens.mainnet.OGN, tokens.mainnet.xOGN],
  });

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Balances' })} />
      <Divider />
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <LoadingLabel
            variant="featured3"
            isLoading={isBalancesLoading}
            sx={{ fontWeight: 'bold' }}
          >
            {formatBalance(
              balances?.[tokens.mainnet.OGN.id] ?? 0n,
              tokens.mainnet.OGN.decimals,
              undefined,
              {
                notation: 'compact',
                minimumSignificantDigits: 6,
                maximumSignificantDigits: 6,
              },
            )}
          </LoadingLabel>
          <TokenChip
            token={tokens.mainnet.OGN}
            iconProps={{ sx: { fontSize: 24 } }}
            labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <LoadingLabel
            variant="featured3"
            sx={{ fontWeight: 'bold' }}
            isLoading={isBalancesLoading}
          >
            {formatBalance(
              balances?.[tokens.mainnet.xOGN.id] ?? 0n,
              tokens.mainnet.OGN.decimals,
              undefined,
              {
                notation: 'compact',
                minimumSignificantDigits: 6,
                maximumSignificantDigits: 6,
              },
            )}
          </LoadingLabel>
          <TokenChip
            token={tokens.mainnet.xOGN}
            iconProps={{ sx: { fontSize: 24 } }}
            labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
          />
        </Stack>
        <Button fullWidth variant="outlined" component={RouterLink} to="/ogn">
          {intl.formatMessage({ defaultMessage: 'Get OGN' })}
        </Button>
      </CardContent>
    </Card>
  );
};

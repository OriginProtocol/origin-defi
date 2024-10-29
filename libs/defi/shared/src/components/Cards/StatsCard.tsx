import { Card, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { usePendingYield } from '../../hooks';
import { useOTokenAddressQuery } from '../../queries';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Token } from '@origin/shared/contracts';

export type StatsCardProps = { token: Token } & CardProps;

export const StatsCard = ({ token, ...rest }: StatsCardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token,
  });
  const { data: earned, isLoading: isEarnedLoading } = useOTokenAddressQuery(
    {
      address: address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
      token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
    },
    {
      enabled: !!address,
      select: (data) => data?.oTokenAddresses?.[0]?.earned,
    },
  );
  const { data: pendingYield, isLoading: isPendingYieldLoading } =
    usePendingYield(token);

  return (
    <Card {...rest} sx={{ backgroundColor: 'background.default', ...rest?.sx }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage(
            { defaultMessage: '{symbol} Balance' },
            { symbol: token.symbol },
          )}
          value={
            isConnected
              ? formatAmount(balance as unknown as bigint, token.decimals)
              : '-'
          }
          isLoading={isConnected && isBalanceLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Pending Yield' })}
          value={isConnected ? formatAmount(pendingYield) : '-'}
          isLoading={isConnected && isPendingYieldLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({
            defaultMessage: 'Lifetime Earnings',
          })}
          value={isConnected ? formatAmount(BigInt(earned ?? '0')) : '-'}
          isLoading={isConnected && isEarnedLoading}
        />
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  valueProps: { variant: 'featured2', sx: { fontWeight: 'bold' } },
  sx: { width: 1, alignItems: 'center', p: 3 },
};

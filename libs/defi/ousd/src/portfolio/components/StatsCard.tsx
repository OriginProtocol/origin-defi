import { Card, Stack } from '@mui/material';
import { useOTokenAddressQuery } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { usePendingYield } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const StatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: ousdBalance, isLoading: isOusdBalanceLoading } =
    useWatchBalance({
      token: tokens.mainnet.OUSD,
    });
  const { data: ousdEarned, isLoading: isOusdEarnedLoading } =
    useOTokenAddressQuery(
      {
        address: address ?? ZERO_ADDRESS,
        token: tokens.mainnet.OUSD.address,
        chainId: tokens.mainnet.OUSD.chainId,
      },
      {
        enabled: !!address,
        select: (data) => data?.oTokenAddresses?.[0]?.earned,
      },
    );
  const { data: pendingYield, isLoading: isPendingYieldLoading } =
    usePendingYield();

  return (
    <Card
      {...props}
      sx={{ backgroundColor: 'background.default', ...props?.sx }}
    >
      <Stack direction="row" justifyContent="space-between">
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'OUSD Balance' })}
          value={
            isConnected
              ? formatAmount(
                  ousdBalance as unknown as bigint,
                  tokens.mainnet.OUSD.decimals,
                )
              : '-'
          }
          isLoading={isConnected && isOusdBalanceLoading}
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
            defaultMessage: 'Lifetime Earnings (OUSD)',
          })}
          value={isConnected ? formatAmount(BigInt(ousdEarned ?? '0')) : '-'}
          isLoading={isConnected && isOusdEarnedLoading}
        />
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  valueProps: { variant: 'featured2', fontWeight: 'bold' },
  sx: { width: 1, alignItems: 'center', p: 3 },
};

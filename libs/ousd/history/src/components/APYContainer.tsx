import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useWatchContract } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { usePendingYield } from '../hooks';
import { useHistoryUserStatQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';

export function APYContainer() {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: ousdBalance, isLoading: ousdLoading } = useWatchContract({
    address: tokens.mainnet.OUSD.address,
    abi: tokens.mainnet.OUSD.abi,
    functionName: 'balanceOf',
    args: [address ?? ZERO_ADDRESS],
    query: {
      enabled: !!address,
    },
  });
  const { data, isLoading } = useHistoryUserStatQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      select: (data) => data?.oTokenAddresses?.at(0),
    },
  );
  const { data: pendingYield, isLoading: pendingYieldLoading } =
    usePendingYield();

  return (
    <Stack
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
      }}
      direction="row"
      justifyContent="space-between"
    >
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'OUSD Balance' })}
        value={formatAmount(
          ousdBalance as unknown as bigint,
          tokens.mainnet.OUSD.decimals,
        )}
        isLoading={isConnected && ousdLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'Pending Yield' })}
        value={formatAmount(pendingYield)}
        isLoading={isConnected && pendingYieldLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({
          defaultMessage: 'Lifetime Earnings (OUSD)',
        })}
        value={formatAmount(BigInt(data?.earned ?? '0'))}
        isLoading={isConnected && isLoading}
      />
    </Stack>
  );
}

type ValueContainerProps = {
  label: string;
  value: string;
  isLoading?: boolean;
} & StackProps;

function ValueContainer({
  label,
  value,
  isLoading,
  ...rest
}: ValueContainerProps) {
  return (
    <Stack
      {...rest}
      sx={{
        py: 2,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        gap: 1,
        flex: 1,
        ...rest?.sx,
      }}
    >
      <Typography variant="body2" color="text.secondary" lineHeight={1}>
        {label}
      </Typography>
      <Typography variant="h4" textAlign="center" lineHeight={1}>
        {isLoading ? <Skeleton width={60} /> : value}
      </Typography>
    </Stack>
  );
}

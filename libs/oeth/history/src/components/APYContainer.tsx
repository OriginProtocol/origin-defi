import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { quantityFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { formatEther } from 'viem';
import { useAccount, useBalance } from 'wagmi';

import { usePendingYield } from '../hooks';
import { useHistoryPageQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';

export function APYContainer() {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: oethBalance, isLoading: oethLoading } = useBalance({
    address,
    token: tokens.mainnet.OETH.address,
    watch: true,
  });
  const { data, isLoading } = useHistoryPageQuery(
    { address: address?.toLowerCase(), offset: 0 },
    {
      enabled: isConnected,
      select: (data) => data?.addresses?.at(0),
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
        label={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
        value={intl.formatNumber(
          Number(oethBalance?.formatted ?? 0),
          quantityFormat,
        )}
        isLoading={isConnected && oethLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'Pending Yield' })}
        value={intl.formatNumber(pendingYield ?? 0, quantityFormat)}
        isLoading={isConnected && pendingYieldLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({
          defaultMessage: 'Lifetime Earnings (OETH)',
        })}
        value={intl.formatNumber(
          +formatEther(BigInt(data?.earned ?? '0')),
          quantityFormat,
        )}
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
      gap={0.5}
      {...rest}
      sx={{
        paddingBlock: 2,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        flex: 1,
        ...rest?.sx,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" textAlign="center">
        {isLoading ? <Skeleton width={60} /> : value}
      </Typography>
    </Stack>
  );
}

import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import {
  useFormat,
  useTokenPrice,
  useWatchContract,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { StackProps } from '@mui/material';

export function HistoryHeader() {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const woethBalances = [
    useWatchContract(
      address && {
        address: tokens.mainnet.wOETH.address,
        abi: tokens.mainnet.wOETH.abi,
        chainId: tokens.mainnet.wOETH.chainId,
        functionName: 'balanceOf',
        args: [address ?? ZERO_ADDRESS],
        query: {
          enabled: !!address,
        },
      },
    ),
    useWatchContract(
      address && {
        address: tokens.arbitrum.wOETH.address,
        abi: tokens.arbitrum.wOETH.abi,
        chainId: tokens.arbitrum.wOETH.chainId,
        functionName: 'balanceOf',
        args: [address ?? ZERO_ADDRESS],
        query: {
          enabled: !!address,
        },
      },
    ),
  ];

  const woethLoading = !!woethBalances.find((b) => b.isLoading);
  const woethBalance = woethBalances.reduce(
    (sum, b) => sum + (b.data ?? 0n),
    0n,
  );
  const exchangeRate = useTokenPrice('wOETH_OETH');

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
        label={intl.formatMessage({ defaultMessage: 'wOETH Balance' })}
        value={formatAmount(woethBalance, tokens.mainnet.wOETH.decimals)}
        isLoading={isConnected && woethLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'Current value (OETH)' })}
        value={formatAmount(
          woethBalance,
          tokens.mainnet.wOETH.decimals,
          undefined,
          undefined,
          exchangeRate.data,
        )}
        isLoading={isConnected && woethLoading && exchangeRate.isLoading}
      />
      <Divider orientation="vertical" flexItem />
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

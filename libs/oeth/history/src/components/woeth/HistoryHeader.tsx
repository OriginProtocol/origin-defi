import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import {
  useFormat,
  useTokenPrice,
  useWatchBalances,
} from '@origin/shared/providers';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { StackProps } from '@mui/material';

export function HistoryHeader() {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();

  const exchangeRate = useTokenPrice('wOETH_OETH');
  const woethBalances = useWatchBalances({
    tokens: [tokens.mainnet.wOETH, tokens.arbitrum.wOETH],
  });

  const woethLoading = woethBalances.isLoading;
  const woethBalance =
    woethBalances.data && exchangeRate.data
      ? Object.values(woethBalances.data).reduce(
          (sum, b) => sum + (b ?? 0n),
          0n,
        )
      : 0n;
  const woethOethValue = mul(
    [woethBalance, tokens.mainnet.wOETH.decimals],
    exchangeRate?.data ?? 0,
  );

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
        value={format(woethOethValue, 4)}
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

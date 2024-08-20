import { Card, Stack } from '@mui/material';
import { useOTokenAddressQuery, usePendingYield } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  useFormat,
  useTokenPrice,
  useWatchBalance,
  useWatchBalances,
} from '@origin/shared/providers';
import { getFormatPrecision, ZERO_ADDRESS } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const OethStats = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: oethBalance, isLoading: oethLoading } = useWatchBalance({
    token: tokens.mainnet.OETH,
  });
  const { data: oethEarned, isLoading: isOethEarnedLoading } =
    useOTokenAddressQuery(
      {
        address: address ?? ZERO_ADDRESS,
        chainId: tokens.mainnet.OETH.chainId,
        token: tokens.mainnet.OETH.address,
      },
      {
        enabled: !!address,
        select: (data) => data?.oTokenAddresses?.[0]?.earned,
      },
    );
  const { data: pendingYield, isLoading: isPendingYieldLoading } =
    usePendingYield(tokens.mainnet.OETH);

  return (
    <Card
      {...props}
      sx={{ backgroundColor: 'background.default', ...props?.sx }}
    >
      <Stack direction="row" justifyContent="space-between">
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
          value={
            isConnected
              ? formatAmount(
                  oethBalance as unknown as bigint,
                  tokens.mainnet.OETH.decimals,
                )
              : '-'
          }
          isLoading={isConnected && oethLoading}
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
            defaultMessage: 'Lifetime Earnings (OETH)',
          })}
          value={isConnected ? formatAmount(BigInt(oethEarned ?? '0')) : '-'}
          isLoading={isConnected && isOethEarnedLoading}
        />
      </Stack>
    </Card>
  );
};

export const WoethStats = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: price, isLoading: isPriceLoading } =
    useTokenPrice('1:wOETH_1:OETH');
  const { data: bals, isLoading: isBalsLoading } = useWatchBalances({
    tokens: [tokens.mainnet.wOETH, tokens.arbitrum.wOETH],
  });

  const woethBalance = Object.values(bals ?? []).reduce(
    (acc, curr) => acc + (curr ?? 0n),
    0n,
  );
  const woethOethValue = mul(
    [woethBalance ?? 0n, tokens.mainnet.wOETH.decimals],
    price ?? 0,
  );

  return (
    <Card
      {...props}
      sx={{ backgroundColor: 'background.default', ...props?.sx }}
    >
      <Stack direction="row" justifyContent="space-between">
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'wOETH Balance' })}
          value={
            isConnected
              ? formatAmount(woethBalance, tokens.mainnet.wOETH.decimals)
              : '-'
          }
          isLoading={isConnected && isBalsLoading}
        />
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Current value (OETH)' })}
          value={
            isConnected
              ? format(woethOethValue, {
                  digits: getFormatPrecision(woethOethValue),
                  decimalsRounding: 'ROUND_DOWN',
                })
              : '-'
          }
          isLoading={isConnected && isPriceLoading}
        />
      </Stack>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  valueProps: { variant: 'featured2', fontWeight: 'bold' },
  sx: { width: 1, alignItems: 'center', p: 3 },
};

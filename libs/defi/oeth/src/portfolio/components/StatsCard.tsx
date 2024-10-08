import { Card, Stack } from '@mui/material';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  useFormat,
  useTokenPrice,
  useWatchBalances,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const WoethStats = (props: CardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: price, isLoading: isPriceLoading } =
    useTokenPrice('1:wOETH_1:ETH');
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
      sx={[
        {
          backgroundColor: 'background.default',
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
        }}
      >
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
          label={intl.formatMessage({ defaultMessage: 'Current value (ETH)' })}
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
  valueProps: { variant: 'featured2', sx: { fontWeight: 'bold' } },
  sx: { width: 1, alignItems: 'center', p: 3 },
};

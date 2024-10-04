import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { TokenChip } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  useTokenBalance,
  useTokenPrice,
  useTvl,
} from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from, mul, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { Dnum } from 'dnum';

export const ApyCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardHeader title="APY" />
      <Divider />
      <CardContent>
        <ValueLabel
          label={intl.formatMessage({
            defaultMessage: '30-day trailing',
          })}
          value={intl.formatNumber(0.274, {
            style: 'percent',
            maximumFractionDigits: 2,
          })}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const TvlCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: tvl, isLoading: isTvlLoading } = useTvl(
    tokens.mainnet['ARM-WETH-stETH'],
  );

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'TVL' })} />
      <Divider />
      <CardContent>
        <ValueLabel
          label={
            <TokenChip
              token={tokens.mainnet.ETH}
              iconProps={{ sx: { fontSize: 24 } }}
            />
          }
          value={intl.formatNumber(toNumber(tvl ?? from(0)), {
            notation: 'compact',
            maximumFractionDigits: 2,
          })}
          isLoading={isTvlLoading}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const AboutCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage({
              defaultMessage: 'About this vault',
            })}
          </Typography>
          <Typography color="text.secondary">
            {intl.formatMessage({
              defaultMessage:
                'The ARM stETH Redemption Vault provides instant ETH liquidity for stETH users with zero slippage. It earns yield by buying discounted stETH from the market and then redeeming the stETH for ETH 1-1 using Lido’s withdrawal queue.',
            })}
          </Typography>
          <Link
            href="https://docs.originprotocol.com/protocol/arm"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'primary.main',
              fontWeight: 'medium',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Learn more',
            })}
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const VaultBalanceCard = (props: CardProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: balance, isLoading: isBalanceLoading } = useTokenBalance({
    token: tokens.mainnet['ARM-WETH-stETH'],
  });
  const { data: price, isLoading: isPriceLoading } = useTokenPrice(
    '1:ARM-WETH-stETH_1:ETH',
  );

  if (!isConnected) {
    return null;
  }

  const bal = [
    balance ?? 0n,
    tokens.mainnet['ARM-WETH-stETH'].decimals,
  ] as Dnum;
  const ethBal = mul(bal, price ?? from(0));

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your vault balance' })}
      />
      <Divider />
      <CardContent>
        <ValueLabel
          label={
            <TokenChip
              token={tokens.mainnet.ETH}
              iconProps={{ sx: { fontSize: 24 } }}
            />
          }
          value={format(ethBal, {
            digits: getFormatPrecision(ethBal),
          })}
          isLoading={isBalanceLoading || isPriceLoading}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row-reverse',
  sx: { justifyContent: 'space-between' },
  valueProps: { variant: 'featured3', sx: { fontWeight: 'bold' } },
};

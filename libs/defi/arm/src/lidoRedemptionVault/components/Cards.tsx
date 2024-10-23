import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  TokenChip,
  useArmApy,
  useArmDailyStatsQuery,
} from '@origin/defi/shared';
import { ClipboardButton, ValueLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular, FaCopyRegular } from '@origin/shared/icons';
import { AddressLabel } from '@origin/shared/providers';
import { getFormatPrecision } from '@origin/shared/utils';
import { format, from, mul, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { APY_TRAILING } from '../constants';
import { useArmInfo } from '../hooks';

import type { CardProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const ApyCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: apy, isLoading: isApyLoading } = useArmApy(APY_TRAILING);

  return (
    <Card {...props}>
      <CardHeader title="APY" />
      <Divider />
      <CardContent>
        <ValueLabel
          label={intl.formatMessage(
            { defaultMessage: '{trailing} trailing APY' },
            { trailing: APY_TRAILING > 1 ? `${APY_TRAILING}-day` : '24h' },
          )}
          value={intl.formatNumber(apy ?? 0, {
            style: 'percent',
            maximumFractionDigits: 2,
          })}
          isLoading={isApyLoading}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const TvlCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useArmInfo();
  const { data: tvl, isLoading: isTvlLoading } = useArmDailyStatsQuery(
    { limit: 1 },
    { select: (data) => data?.armDailyStats?.[0]?.totalSupply },
  );

  const tvlUsd = mul(
    [BigInt(tvl ?? 0), tokens.mainnet['ARM-WETH-stETH'].decimals],
    info?.prices?.['1:ARM-WETH-stETH_USD'] ?? from(0),
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
          value={
            <Stack>
              <Typography variant="featured3" sx={{ fontWeight: 'bold' }}>
                {intl.formatNumber(
                  toNumber([
                    BigInt(tvl ?? 0),
                    tokens.mainnet['ARM-WETH-stETH'].decimals,
                  ]),
                  {
                    notation: 'compact',
                    maximumFractionDigits: 2,
                  },
                )}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                $
                {intl.formatNumber(toNumber(tvlUsd), {
                  notation: 'compact',
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Stack>
          }
          isLoading={isTvlLoading || isInfoLoading}
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
  const { data: info, isLoading: isInfoLoading } = useArmInfo();

  if (!isConnected) {
    return null;
  }

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
              token={tokens.mainnet.WETH}
              iconProps={{ sx: { fontSize: 24 } }}
            />
          }
          value={format(info?.userWethBalance ?? from(0), {
            digits: getFormatPrecision(info?.userWethBalance ?? from(0)),
            decimalsRounding: 'ROUND_DOWN',
          })}
          isLoading={isInfoLoading}
          {...valueLabelProps}
        />
      </CardContent>
    </Card>
  );
};

export const ContractInfoCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage({
              defaultMessage: 'Contracts',
            })}
          </Typography>
          <ValueLabel
            direction="row"
            label={intl.formatMessage({ defaultMessage: 'Pool' })}
            value={
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <AddressLabel
                  address={contracts.mainnet.ARMstETHWETHPool.address}
                  sx={{ fontFamily: 'mono', maxWidth: 180 }}
                />
                <Button
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href={`https://etherscan.io/address/${contracts.mainnet.ARMstETHWETHPool.address}`}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  sx={{ p: 0.25 }}
                >
                  <FaArrowUpRightRegular />
                </Button>
                <ClipboardButton
                  value={contracts.mainnet.ARMstETHWETHPool.address}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  hideLabel
                  sx={{ p: 0.25 }}
                >
                  <FaCopyRegular />
                </ClipboardButton>
              </Stack>
            }
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row-reverse',
  sx: { justifyContent: 'space-between' },
  valueProps: { variant: 'featured3', sx: { fontWeight: 'bold' } },
};

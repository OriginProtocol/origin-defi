import { useMemo } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  CurrencyLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { supportedChainNames } from '@origin/shared/constants';
import { FaChevronDownRegular } from '@origin/shared/icons';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';

import { OTokenDailyStatOrderByInput } from '../../generated/graphql';
import { useOTokenStatsQuery } from '../../queries';
import { dailyStatMapper } from '../../utils';

import type { AccordionProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { ReactNode } from 'react';

export type DailyStat = 'tvl' | 'price' | 'supply_distribution';

export type DailyStatCardProps = {
  token: Token;
  title?: ReactNode;
  stats?: DailyStat[];
  currency?: 'ETH' | 'USD' | 'S';
  borderRadius?: number;
} & Omit<AccordionProps, 'children'>;

export const DailyStatCard = ({
  token,
  title,
  borderRadius = 4,
  stats = ['tvl', 'price'],
  currency = 'ETH',
  ...rest
}: DailyStatCardProps) => {
  const intl = useIntl();
  const { data, isLoading } = useOTokenStatsQuery(
    {
      chainId: token.chainId,
      token: token.address?.toLowerCase() ?? '',
      limit: 1,
      orderBy: [OTokenDailyStatOrderByInput.TimestampDesc],
    },
    {
      select: (data) =>
        dailyStatMapper(data.oTokenDailyStats?.[0], token, {
          isChartFormat: false,
          returnType: 'dnum',
        }),
    },
  );
  const statItems = useMemo(() => {
    const res = [];
    for (const stat of stats) {
      if (stat === 'tvl') {
        res.push({
          label: intl.formatMessage({ defaultMessage: 'TVL' }),
          labelInfoTooltip: intl.formatMessage(
            {
              defaultMessage: 'Total value locked on {chainName}',
            },
            {
              chainName: supportedChainNames[token.chainId].short,
            },
          ),
          value: (
            <Typography variant="body3" sx={{ fontWeight: 'medium' }}>
              {['ETH', 'USD'].includes(currency) && (
                <CurrencyLabel currency={currency} />
              )}
              {format(
                currency === 'ETH'
                  ? (data?.tvlETH ?? from(0))
                  : currency === 'USD'
                    ? (data?.tvlUSD ?? from(0))
                    : (data?.totalSupply ?? from(0)),
                0,
              )}
              {['S'].includes(currency) && (
                <>
                  &nbsp;
                  <CurrencyLabel currency={currency} />
                </>
              )}
            </Typography>
          ),
        });
      }

      if (stat === 'price') {
        res.push({
          label: intl.formatMessage({ defaultMessage: 'Price' }),
          labelInfoTooltip: intl.formatMessage(
            {
              defaultMessage: 'USD price of {symbol} on {chainName}',
            },
            {
              symbol: token.symbol,
              chainName: supportedChainNames[token.chainId].short,
            },
          ),
          value: `$${data?.rateUSD ? format(data?.rateUSD, { digits: 2, trailingZeros: true }) : '0.00'}`,
        });
      }

      if (stat === 'supply_distribution') {
        res.push({
          label: intl.formatMessage({ defaultMessage: 'Token Supply' }),
          labelInfoTooltip: intl.formatMessage({
            defaultMessage: 'Circulating token supply',
          }),
          value: (
            <Typography variant="body3" sx={{ fontWeight: 'medium' }}>
              <CurrencyLabel currency={currency} />
              {format(
                currency === 'ETH'
                  ? (data?.circulatingSupplyETH ?? from(0))
                  : currency === 'USD'
                    ? (data?.circulatingSupplyUSD ?? from(0))
                    : (data?.circulatingSupply ?? from(0)),
                2,
              )}
            </Typography>
          ),
        });
        res.push({
          label: intl.formatMessage({ defaultMessage: 'POL' }),
          labelInfoTooltip: intl.formatMessage({
            defaultMessage: 'Protocol Owned Liquidity',
          }),
          value: (
            <Typography variant="body3" sx={{ fontWeight: 'medium' }}>
              <CurrencyLabel currency={currency} />
              {format(
                currency === 'USD'
                  ? (data?.amoSupplyUSD ?? from(0))
                  : (data?.amoSupplyETH ?? from(0)),
                2,
              )}
            </Typography>
          ),
        });
      }
    }

    return res;
  }, [
    currency,
    data?.amoSupplyETH,
    data?.amoSupplyUSD,
    data?.circulatingSupplyETH,
    data?.circulatingSupplyUSD,
    data?.rateUSD,
    data?.totalSupply,
    data?.tvlETH,
    data?.tvlUSD,
    intl,
    stats,
    token.chainId,
    token.symbol,
  ]);

  return (
    <Accordion
      defaultExpanded
      {...rest}
      sx={[
        {
          backgroundColor: 'background.default',
          '&&&': { borderRadius },
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <AccordionSummary
        expandIcon={<FaChevronDownRegular />}
        sx={{ p: 3, minHeight: 72 }}
      >
        {title ?? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              pr: 0.5,
            }}
          >
            <TokenIcon token={token} sx={{ fontSize: 24 }} />
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {token.symbol}
            </Typography>
          </Stack>
        )}
      </AccordionSummary>
      <Divider />
      <AccordionDetails sx={{ p: 3 }}>
        <Stack spacing={3}>
          {statItems.map((s) => (
            <ValueLabel
              key={s.label}
              direction="row"
              sx={{ justifyContent: 'space-between' }}
              label={s.label}
              labelProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
              labelInfoTooltip={s.labelInfoTooltip}
              value={s.value}
              valueProps={{ sx: { fontWeight: 'medium' } }}
              isLoading={isLoading}
            />
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

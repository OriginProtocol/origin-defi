import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  getFormatPrecision,
  includes,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { add, compare, div, format, from, lt, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useOTokenStrategiesQuery } from '../../queries';
import { strategyMapper } from '../../utils/strategyMapper';
import { strategiesConfig } from './constants';

import type { CardProps, StackProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

import type { Strategy } from '../../utils/strategyMapper';

export type StrategiesProps = {
  token: Token;
} & StackProps;

export const Strategies = ({ token, ...rest }: StrategiesProps) => {
  const intl = useIntl();
  const { data, isLoading } = useOTokenStrategiesQuery(
    {
      token: token.address?.toLowerCase() ?? ZERO_ADDRESS,
      chainId: token.chainId,
    },
    {
      enabled: !!token?.address,
      select: (data) =>
        strategyMapper(data?.strategies ?? [], token, strategiesConfig),
    },
  );

  if (isLoading) {
    return (
      <Stack
        sx={[
          { justifyContent: 'center', alignItems: 'center', minHeight: 300 },
          ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        ]}
      >
        <CircularProgress size={36} />
      </Stack>
    );
  }

  if (!data) {
    return (
      <Stack
        sx={[
          { justifyContent: 'center', alignItems: 'center', minHeight: 300 },
          ...(Array.isArray(rest?.sx) ? rest.sx : [rest?.sx]),
        ]}
      >
        <Typography color="text.secondary">
          {intl.formatMessage({ defaultMessage: 'No strategies' })}
        </Typography>
      </Stack>
    );
  }

  const total = data.reduce((acc, curr) => add(acc, curr.total), from(0));

  return (
    <Stack spacing={2} {...rest}>
      {data.map((d) => (
        <StrategyCard key={d.id} strategy={d} total={total} token={token} />
      ))}
    </Stack>
  );
};

type StrategyTileProps = {
  strategy: Strategy;
  total: Dnum;
  token: Token;
} & CardProps;

const StrategyCard = ({
  strategy,
  total,
  token,
  ...rest
}: StrategyTileProps) => {
  const intl = useIntl();

  const currency = includes([tokens.mainnet.OUSD.id], token.id) ? '$' : 'Ξ';
  const percent = toNumber(div(strategy.total, total, { decimals: 18 }));

  return (
    <Card {...rest}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
        >
          <Box>
            <SvgIcon
              component={strategy.icon}
              sx={{ height: 36, width: 1, color: 'text.primary' }}
            />
          </Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
            <Typography variant="featured2">
              {currency}
              {format(strategy.total, getFormatPrecision(strategy.total))}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              (
              {intl.formatNumber(percent, {
                style: 'percent',
                maximumFractionDigits: 2,
              })}
              )
            </Typography>
          </Stack>
        </Stack>
        <LinearProgress
          value={percent * 100}
          variant="determinate"
          sx={[
            {
              borderRadius: 1,
              height: 6,
              backgroundColor: 'divider',
              mb: 2,
              '.MuiLinearProgress-bar': {
                backgroundColor: strategy.color,
              },
            },
          ]}
        />
        <Stack
          direction="row"
          sx={{ alignItems: 'center', mb: 2 }}
          spacing={2.5}
        >
          {strategy.balances
            .toSorted((a, b) => compare(b.amount, a.amount))
            .map((b) => {
              const pct = toNumber(
                div(b.amount, strategy.total, { decimals: 18 }),
              );

              const approx = lt(pct, from(0.01)) ? '~' : '';

              return (
                <Stack
                  key={b.token.id}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: 'center' }}
                >
                  <TokenIcon token={b.token} sx={{ fontSize: 24 }} />
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'baseline' }}
                  >
                    <Typography variant="body2">{b.token.symbol}</Typography>
                    <Typography color="text.secondary">
                      {approx}
                      {intl.formatNumber(pct, {
                        style: 'percent',
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
        </Stack>
        <Typography color="text.secondary">
          {intl.formatMessage(strategy.description)}
        </Typography>
      </CardContent>
    </Card>
  );
};

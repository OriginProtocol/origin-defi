import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import { PieChart, Spinner, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { add, format, from, toNumber } from 'dnum';
import { useIntl } from 'react-intl';

import { useLayout } from '../../Layout';
import { CollateralRow } from './CollateralRow';

import type { Token } from '@origin/shared/contracts';

import type { StrategyBalanceMapped } from '../../../utils';

const tokenColors = {
  [tokens.mainnet.ETH.id]: '#8C8C8C',
  [tokens.mainnet.WETH.id]: '#618ECE',
  [tokens.mainnet.OETH.id]: '#0074F0',
  [tokens.mainnet.DAI.id]: '#F9B01E',
  [tokens.mainnet.USDC.id]: '#2775CA',
  [tokens.mainnet.USDS.id]: '#f5a742',
  [tokens.mainnet.USDT.id]: '#53AE94',
  [tokens.base.WETH.id]: '#618ECE',
};

export type CollateralsCardProps = {
  token: Token;
  collaterals?: StrategyBalanceMapped[];
  isLoading?: boolean;
};

export const CollateralsCard = ({
  token,
  collaterals,
  isLoading,
}: CollateralsCardProps) => {
  const intl = useIntl();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const [{ isDrawerOpen }] = useLayout();

  const total = collaterals?.reduce(
    (acc, curr) => add(acc, curr.amount),
    from(0, 18),
  );
  const width = measures?.width ?? 0;

  return (
    <Card>
      <CardHeader
        title={intl.formatMessage({
          defaultMessage: 'Collateral distribution',
        })}
      />
      <Divider />
      <CardContent>
        {isLoading ? (
          <Spinner sx={{ height: 300 }} />
        ) : !collaterals || !collaterals.length ? (
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 300,
            }}
          >
            <Typography color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'No collaterals' })}
            </Typography>
          </Stack>
        ) : (
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12, md: isDrawerOpen ? 7 : 6, lg: 6 }}>
              <Stack
                direction="column"
                sx={{
                  rowGap: 2,
                  columnGap: 2,
                  justifyContent: 'center',
                  height: 1,
                }}
                divider={<Divider />}
              >
                {collaterals.map((b) => (
                  <CollateralRow
                    key={b.token.id}
                    balance={b}
                    total={total ?? from(0, 18)}
                    color={tokenColors[b.token.id as keyof typeof tokenColors]}
                    sx={{ flexGrow: 1 }}
                  />
                ))}
                <Divider sx={{ my: -2 }} />
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{
                    alignItems: 'center',
                    px: 3,
                    flexGrow: 1,
                  }}
                >
                  <TokenIcon token={token} sx={{ fontSize: 36 }} />
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'baseline',
                      justifyContent: 'space-between',
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="featured1" sx={{ fontWeight: 'bold' }}>
                      {format(total ?? from(0, 18), 2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      100.00%
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: isDrawerOpen ? 5 : 6, lg: 6 }} ref={ref}>
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 1,
                }}
              >
                <PieChart
                  data={
                    collaterals?.map((c) => ({
                      label: c.token.symbol,
                      value: toNumber(c.amount),
                      color:
                        tokenColors[c.token.id as keyof typeof tokenColors],
                    })) ?? []
                  }
                  width={width}
                  height={400}
                  hideLabels
                />
              </Stack>
            </Grid2>
          </Grid2>
        )}
      </CardContent>
    </Card>
  );
};

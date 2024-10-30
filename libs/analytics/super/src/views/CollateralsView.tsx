import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useLayout } from '@origin/analytics/shared';
import { PieChart, Spinner, TokenIcon } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { useMeasure } from '@react-hookz/web';
import { add, from, sub, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { useReadContracts } from 'wagmi';

import type { CardProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';

export const CollateralsView = () => {
  const intl = useIntl();
  const theme = useTheme();
  const [measures, ref] = useMeasure<HTMLDivElement>();
  const [{ isDrawerOpen }] = useLayout();

  const { data, isLoading } = useReadContracts({
    contracts: [
      {
        address: contracts.base.superOETHbVault.address,
        abi: contracts.base.superOETHbVault.abi,
        chainId: contracts.base.superOETHbVault.chainId,
        functionName: 'totalValue',
      },
      {
        address: contracts.base.superOETHbStrategyBridge.address,
        abi: contracts.base.superOETHbStrategyBridge.abi,
        chainId: contracts.base.superOETHbStrategyBridge.chainId,
        functionName: 'checkBalance',
        args: [tokens.base.WETH.address],
      },
      {
        address: contracts.base.superOETHbStrategyAero.address,
        abi: contracts.base.superOETHbStrategyAero.abi,
        chainId: contracts.base.superOETHbStrategyAero.chainId,
        functionName: 'checkBalance',
        args: [tokens.base.WETH.address],
      },
    ],
  });

  const totalValue =
    data?.[0]?.status === 'success'
      ? ([data[0].result, tokens.base.WETH.decimals] as Dnum)
      : from(0);
  const balanceBridge =
    data?.[1]?.status === 'success'
      ? ([data[1].result, tokens.base.WETH.decimals] as Dnum)
      : from(0);
  const balanceAero =
    data?.[2]?.status === 'success'
      ? ([data[2].result, tokens.base.WETH.decimals] as Dnum)
      : from(0);

  const width = measures?.width ?? 0;
  const height = measures?.height ?? 0;
  const unallocatedBalance = sub(totalValue, add(balanceAero, balanceBridge));
  const pieData = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Liquid Staking',
      }),
      value: toNumber(balanceBridge),
      color: theme.palette.primary.main,
      token: tokens.mainnet.wOETH,
      total: toNumber(totalValue),
      href: '',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Aerodrome AMO',
      }),
      value: toNumber(balanceAero),
      color: theme.palette.chart3,
      token: tokens.mainnet.ETH,
      total: toNumber(totalValue),
      href: '',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Unallocated',
      }),
      value: toNumber(unallocatedBalance),
      color: theme.palette.chart6,
      token: tokens.mainnet.ETH,
      total: toNumber(totalValue),
      href: '',
    },
  ];

  return (
    <Stack>
      <Card>
        <CardHeader
          title={intl.formatMessage({
            defaultMessage: 'Collateral distribution',
          })}
        />
        <Divider />
        <CardContent>
          <Grid2 container spacing={2} sx={{ alignItems: 'center' }}>
            <Grid2 size={{ xs: 12, sm: 6, md: isDrawerOpen ? 6 : 3, lg: 3 }}>
              <Stack
                ref={ref}
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <PieChart
                    data={pieData}
                    width={width}
                    height={width}
                    hideLabels
                  />
                )}
              </Stack>
            </Grid2>
            {pieData.map((d) => (
              <Grid2
                key={d.label}
                size={{ xs: 12, sm: 6, md: isDrawerOpen ? 6 : 3, lg: 3 }}
              >
                <CollateralCard {...d} sx={{ flexGrow: 1, height: 1 }} />
              </Grid2>
            ))}
          </Grid2>
        </CardContent>
      </Card>
    </Stack>
  );
};

type CollateralCardProps = {
  value: number;
  label: string;
  token: Token;
  href: string;
  total: number;
  color: string;
} & CardProps;

const CollateralCard = ({
  value,
  label,
  total,
  title,
  token,
  href,
  color,
  ...rest
}: CollateralCardProps) => {
  const intl = useIntl();

  const percentage = value / total;

  return (
    <Card {...rest}>
      <CardContent>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <TokenIcon token={token} sx={{ fontSize: 32 }} />
          <Stack spacing={0.75}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'baseline' }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  backgroundColor: color,
                  borderRadius: '50%',
                }}
              />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                {label}
              </Typography>
            </Stack>
            <Typography variant="featured2">
              {intl.formatNumber(value, { maximumFractionDigits: 2 })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {intl.formatNumber(percentage, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

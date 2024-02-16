import { Button, Card, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { usePoints } from '@origin/prime/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { EigenPoints, PrimePoints } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { scale } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import type { Grid2Props } from '@mui/material';

export const DashboardView = () => {
  const intl = useIntl();
  const { formatBalance, formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: points, isLoading: isPointsLoading } = usePoints();

  const percentTotalXp = +formatUnits(
    scale(points?.xpPoints ?? 0n, 0, 18) /
      (!points?.totalXpPoints || points?.totalXpPoints === 0n
        ? 1n
        : points?.totalXpPoints),
    18,
  );
  const percentTotalELPoints = +formatUnits(
    scale(BigInt(points?.elPoints ?? '0'), 0, 18) /
      (!points?.totalELPoints || points?.totalELPoints === 0n
        ? 1n
        : points?.totalELPoints),
    18,
  );

  return (
    <Stack>
      <Typography variant="h3" pb={3} textAlign="center">
        {intl.formatMessage({ defaultMessage: 'Dashboard' })}
      </Typography>
      <Card>
        <Grid2 {...gridContainerProps}>
          <Grid2 {...gridItemProps}>
            <TokenIcon
              symbol={tokens.mainnet.primeETH.symbol}
              sx={{ width: 48, height: 48 }}
            />
          </Grid2>
          <Grid2 {...gridItemProps}>
            <Stack spacing={1} alignItems="center">
              <Typography fontWeight="medium">
                {intl.formatMessage({ defaultMessage: 'primeETH Balance' })}
              </Typography>
              {isConnected ? (
                <LoadingLabel
                  isLoading={isPointsLoading}
                  fontSize={24}
                  fontWeight="medium"
                >
                  {formatBalance(points?.primePoints)}
                </LoadingLabel>
              ) : (
                '-'
              )}
            </Stack>
          </Grid2>
          <Grid2 {...gridItemProps}>
            <Button component={Link} to="/">
              {intl.formatMessage(
                { defaultMessage: 'Restake {when}' },
                { when: points?.primePoints === 0n ? 'now' : 'more' },
              )}
            </Button>
          </Grid2>
        </Grid2>
      </Card>
      <Typography variant="h3" py={3} textAlign="center">
        {intl.formatMessage({ defaultMessage: 'Your rewards' })}
      </Typography>
      <Stack spacing={2}>
        <Card>
          <Grid2 {...gridContainerProps}>
            <Grid2 {...gridItemProps}>
              <PrimePoints sx={{ width: 48, height: 48 }} />
            </Grid2>
            <Grid2 {...gridItemProps}>
              <Stack spacing={1} alignItems="center">
                <Typography fontWeight="medium">
                  {intl.formatMessage({ defaultMessage: 'primeETH XP' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    fontSize={24}
                    fontWeight="medium"
                  >
                    {formatAmount(points?.xpPoints)}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid2>
            <Grid2 {...gridItemProps}>
              <Stack spacing={1} alignItems="center">
                <Typography fontWeight="medium">
                  {intl.formatMessage({ defaultMessage: '% of total' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    fontSize={24}
                    fontWeight="medium"
                  >
                    {intl.formatNumber(percentTotalXp, {
                      style: 'percent',
                      maximumFractionDigits: 6,
                    })}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid2>
          </Grid2>
        </Card>
        <Card>
          <Grid2 {...gridContainerProps}>
            <Grid2 {...gridItemProps}>
              <EigenPoints sx={{ width: 48, height: 48 }} />
            </Grid2>
            <Grid2 {...gridItemProps}>
              <Stack spacing={1} alignItems="center">
                <Typography fontWeight="medium">
                  {intl.formatMessage({ defaultMessage: 'EigenLayer Points' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    fontSize={24}
                    fontWeight="medium"
                  >
                    {formatAmount(points?.elPoints)}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid2>
            <Grid2 {...gridItemProps}>
              <Stack spacing={1} alignItems="center">
                <Typography fontWeight="medium">
                  {intl.formatMessage({ defaultMessage: '% of total' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    fontSize={24}
                    fontWeight="medium"
                  >
                    {intl.formatNumber(percentTotalELPoints, {
                      style: 'percent',
                    })}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid2>
          </Grid2>
        </Card>
      </Stack>
    </Stack>
  );
};

const gridContainerProps: Grid2Props = {
  container: true,
  rowSpacing: 2,
  columnSpacing: 1,
  sx: { p: 2 },
};

const gridItemProps: Grid2Props = {
  xs: 12,
  sm: 4,
  sx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

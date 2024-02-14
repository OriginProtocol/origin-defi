import { Button, Card, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { EigenPoints, PrimePoints } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { scale, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAccount, useReadContract } from 'wagmi';

import { usePointRecipientStatsQuery } from '../queries.generated';

import type { Grid2Props } from '@mui/material';

export const DashboardView = () => {
  const intl = useIntl();
  const { formatBalance, formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: primeBalance, isLoading: isPrimeBalanceLoading } =
    useReadContract({
      address: tokens.mainnet.primeETH.address,
      abi: tokens.mainnet.primeETH.abi,
      functionName: 'balanceOf',
      args: [address ?? ZERO_ADDRESS],
      query: {
        enabled: !!address,
      },
    });
  const { data: stats, isLoading: isStatsLoading } =
    usePointRecipientStatsQuery(
      { address: address ?? ZERO_ADDRESS },
      { enabled: !!address },
    );

  const percentTotalXp =
    scale(BigInt(stats?.lrtPointRecipientStats?.points ?? '0'), 0, 18) /
    BigInt(stats?.lrtSummaries?.[0]?.points ?? '1');
  const percentTotalELPoints =
    scale(BigInt(stats?.lrtPointRecipientStats?.elPoints ?? '0'), 0, 18) /
    BigInt(stats?.totalEigenLayerPoints ?? '1');

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
                <LoadingLabel isLoading={isPrimeBalanceLoading}>
                  {formatBalance(primeBalance)}
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
                { when: primeBalance === 0n ? 'now' : 'more' },
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
              <EigenPoints sx={{ width: 48, height: 48 }} />
            </Grid2>
            <Grid2 {...gridItemProps}>
              <Stack spacing={1} alignItems="center">
                <Typography fontWeight="medium">
                  {intl.formatMessage({ defaultMessage: 'EigenLayer Points' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel isLoading={isStatsLoading}>
                    {formatAmount(
                      BigInt(stats?.lrtPointRecipientStats?.elPoints ?? '0'),
                    )}
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
                  <LoadingLabel isLoading={isStatsLoading}>
                    {formatAmount(percentTotalXp, undefined, undefined, {
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
                  <LoadingLabel isLoading={isStatsLoading}>
                    {formatAmount(
                      BigInt(stats?.lrtPointRecipientStats?.points ?? '0'),
                    )}
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
                  <LoadingLabel isLoading={isStatsLoading}>
                    {formatAmount(percentTotalELPoints, undefined, undefined, {
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
  sx: { display: 'flex', justifyContent: 'center' },
};

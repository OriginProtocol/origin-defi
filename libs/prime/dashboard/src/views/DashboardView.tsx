import { Button, Card, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { EigenPoints, PrimePoints } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { scale } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAccount, useContractRead } from 'wagmi';

import { usePointRecipientStatsQuery } from '../queries.generated';

import type { SxProps } from '@mui/material';

export const DashboardView = () => {
  const intl = useIntl();
  const { formatBalance, formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: primeBalance, isLoading: isPrimeBalanceLoading } =
    useContractRead({
      address: tokens.mainnet.primeETH.address,
      abi: tokens.mainnet.primeETH.abi,
      functionName: 'balanceOf',
      args: [address],
      enabled: isConnected,
    });
  const { data: stats, isLoading: isStatsLoading } =
    usePointRecipientStatsQuery({ address }, { enabled: isConnected });

  const percentTotalXp =
    scale(BigInt(stats?.lrtPointRecipientStats?.points ?? '0'), 0, 18) /
    BigInt(stats?.lrtSummaries?.[0]?.points ?? '1');
  const percentTotalELPoints =
    scale(BigInt(stats?.lrtPointRecipientStats?.elPoints ?? '0'), 0, 18) /
    BigInt(stats?.totalEigenLayerPoints ?? '1');

  return (
    <Stack alignItems="center">
      <Typography variant="h3" pb={3}>
        {intl.formatMessage({ defaultMessage: 'Dashboard' })}
      </Typography>
      <Card sx={{ width: 1 }}>
        <Grid2 container sx={{ p: 2 }}>
          <Grid2 xs={4} sx={gridStyles}>
            <TokenIcon
              symbol={tokens.mainnet.primeETH.symbol}
              sx={{ width: 48, height: 48 }}
            />
          </Grid2>
          <Grid2 xs={4} sx={gridStyles}>
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
          <Grid2 xs={4} sx={gridStyles}>
            <Button component={Link} to="/">
              {intl.formatMessage(
                { defaultMessage: 'Restake {when}' },
                { when: primeBalance === 0n ? 'now' : 'more' },
              )}
            </Button>
          </Grid2>
        </Grid2>
      </Card>
      <Typography variant="h3" py={3}>
        {intl.formatMessage({ defaultMessage: 'Your rewards' })}
      </Typography>
      <Stack spacing={2} sx={{ width: 1 }}>
        <Card sx={{ width: 1 }}>
          <Grid2 container sx={{ p: 2 }}>
            <Grid2 xs={4} sx={gridStyles}>
              <EigenPoints sx={{ width: 48, height: 48 }} />
            </Grid2>
            <Grid2 xs={4} sx={gridStyles}>
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
            <Grid2 xs={4} sx={gridStyles}>
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
        <Card sx={{ width: 1 }}>
          <Grid2 container sx={{ p: 2 }}>
            <Grid2 xs={4} sx={gridStyles}>
              <PrimePoints sx={{ width: 48, height: 48 }} />
            </Grid2>
            <Grid2 xs={4} sx={gridStyles}>
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
            <Grid2 xs={4} sx={gridStyles}>
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

const gridStyles: SxProps = {
  display: 'flex',
  justifyContent: 'center',
};

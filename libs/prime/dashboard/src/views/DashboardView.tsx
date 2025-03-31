import { Button, Card, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { usePoints } from '@origin/prime/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { EigenPoints, PrimePoints } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { scale, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { Link } from 'react-router';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useUserPointsQuery } from '../queries.generated';

import type { GridProps } from '@mui/material';

export const DashboardView = () => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address, isConnected } = useAccount();
  const { data: points, isLoading: isPointsLoading } = usePoints();
  const { data: userPoints } = useUserPointsQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS },
    { enabled: isConnected },
  );

  const percentTotalXp =
    points?.totalXpPoints && points?.totalXpPoints > 0n
      ? +formatUnits(
          scale(points?.xpPoints ?? 0n, 0, 18) / points.totalXpPoints,
          18,
        )
      : undefined;

  const percentTotalELPoints =
    points?.totalELPoints && points?.totalELPoints > 0n
      ? +formatUnits(
          scale(BigInt(points?.elPoints ?? '0'), 0, 18) / points.totalELPoints,
          18,
        )
      : undefined;

  return (
    <Stack
      sx={{
        maxWidth: 700,
        width: 1,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          pb: 3,
          textAlign: 'center',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Your Balance' })}
      </Typography>
      <Card sx={{ backgroundColor: 'common.white' }}>
        <Grid {...gridContainerProps}>
          <Grid {...gridItemProps}>
            <TokenIcon
              token={tokens.mainnet.primeETH}
              sx={{ width: 48, height: 48 }}
            />
          </Grid>
          <Grid {...gridItemProps}>
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {intl.formatMessage({ defaultMessage: 'primeETH Balance' })}
              </Typography>
              {isConnected ? (
                <LoadingLabel
                  isLoading={isPointsLoading}
                  sx={{ fontSize: 24, fontWeight: 'medium' }}
                >
                  {intl.formatNumber(
                    +formatUnits(points?.primePoints ?? 0n, 18),
                    { maximumFractionDigits: 2, roundingMode: 'floor' },
                  )}
                </LoadingLabel>
              ) : (
                '-'
              )}
            </Stack>
          </Grid>
          <Grid {...gridItemProps}>
            <Button component={Link} to="/">
              {intl.formatMessage({ defaultMessage: 'Withdraw/Migrate' })}
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Typography
        variant="h5"
        sx={{
          py: 3,
          textAlign: 'center',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Your rewards' })}
      </Typography>
      <Stack spacing={2}>
        <Card sx={{ backgroundColor: 'common.white' }}>
          <Grid {...gridContainerProps}>
            <Grid {...gridItemProps}>
              <PrimePoints sx={{ width: 48, height: 48 }} />
            </Grid>
            <Grid {...gridItemProps}>
              <Stack
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'primeETH XP' })}
                </Typography>
                {isConnected ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    fontSize={24}
                    fontWeight="medium"
                  >
                    {intl.formatNumber(
                      +formatUnits(points?.xpPoints ?? 0n, 18),
                      { maximumFractionDigits: 0, roundingMode: 'floor' },
                    )}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid>

            <Grid {...gridItemProps}>
              <Stack
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({ defaultMessage: '% of total' })}
                </Typography>
                {isConnected && !!percentTotalXp ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    sx={{ fontSize: 24, fontWeight: 'medium' }}
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
            </Grid>
          </Grid>
        </Card>
        <Card sx={{ backgroundColor: 'common.white' }}>
          <Grid {...gridContainerProps}>
            <Grid {...gridItemProps}>
              <EigenPoints sx={{ width: 48, height: 48 }} />
            </Grid>
            <Grid {...gridItemProps}>
              <Stack
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'EigenLayer Points' })}
                </Typography>
                {isConnected ? (
                  <Tooltip
                    title={intl.formatMessage(
                      {
                        defaultMessage: 'Last updated: {date}',
                      },
                      {
                        date: userPoints?.lrtPointRecipients[0]?.pointsDate
                          ? intl.formatDate(
                              new Date(
                                userPoints?.lrtPointRecipients[0].pointsDate,
                              ),
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                                hourCycle: 'h23',
                              },
                            )
                          : '-',
                      },
                    )}
                  >
                    <LoadingLabel
                      isLoading={isPointsLoading}
                      sx={{ fontSize: 24, fontWeight: 'medium' }}
                    >
                      {formatAmount(points?.elPoints)}
                    </LoadingLabel>
                  </Tooltip>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid>
            <Grid {...gridItemProps}>
              <Stack
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'medium',
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({ defaultMessage: '% of total' })}
                </Typography>
                {isConnected && !!percentTotalELPoints ? (
                  <LoadingLabel
                    isLoading={isPointsLoading}
                    sx={{ fontSize: 24, fontWeight: 'medium' }}
                  >
                    {intl.formatNumber(percentTotalELPoints, {
                      style: 'percent',
                      maximumFractionDigits: 6,
                    })}
                  </LoadingLabel>
                ) : (
                  '-'
                )}
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Stack>
    </Stack>
  );
};

const gridContainerProps: GridProps = {
  container: true,
  rowSpacing: 2,
  columnSpacing: 1,
  sx: { py: 3, px: 2 },
};

const gridItemProps: GridProps = {
  size: { xs: 12, sm: 4 },
  sx: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

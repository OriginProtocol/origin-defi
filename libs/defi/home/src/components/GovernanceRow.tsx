import {
  Button,
  Divider,
  Grid2,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useTokenInfo, useXOgnStakingApy } from '@origin/defi/shared';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { from, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { Link } from 'react-router';
import { useAccount } from 'wagmi';

import { GRID_SIZES } from '../constants';

import type { Grid2Props, StackProps } from '@mui/material';

export const GovernanceRow = (props: StackProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const { isConnected } = useAccount();
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    undefined,
    12,
  );
  const { data: info, isLoading: isInfoLoading } = useTokenInfo(
    tokens.mainnet.OGN,
  );

  if (isSm) {
    return (
      <Stack
        {...props}
        sx={[
          {
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            p: 3,
          },
          ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
        ]}
      >
        <Stack useFlexGap sx={{ gap: 1 }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack spacing={0.5}>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {intl.formatMessage({
                  defaultMessage: 'Origin Token',
                })}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Typography variant="caption1">
                  (
                  {intl.formatMessage({
                    defaultMessage: 'OGN',
                  })}
                  )
                </Typography>
                <Typography variant="caption1">
                  {intl.formatMessage({
                    defaultMessage: 'Staking',
                  })}
                </Typography>
              </Stack>
            </Stack>
            <TokenIcon
              token={tokens.mainnet.OGN}
              showNetwork
              sx={{ fontSize: 40 }}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'baseline', justifyContent: 'flex-start' }}
          >
            <LoadingLabel
              variant="featured2"
              isLoading={isStakingLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Typography sx={{ color: 'primary.main' }}>
              {intl.formatMessage({
                defaultMessage: 'Max vAPY',
              })}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{ alignItems: 'baseline', justifyContent: 'flex-start' }}
          >
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'TVL' })}
              value={intl.formatNumber(toNumber(info?.totalSupply ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              direction="row"
              spacing={0.5}
              isLoading={isInfoLoading}
              valueProps={{ sx: { fontWeight: 'bold' } }}
            />
            <LoadingLabel
              isLoading={isInfoLoading}
              variant="caption2"
              color="text.secondary"
            >
              $
              {intl.formatNumber(toNumber(info?.tvlUsd ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
          <Stack spacing={0.5} sx={{ mb: 1 }}>
            <ValueLabel
              label={intl.formatMessage({ defaultMessage: 'Your balance' })}
              value={
                isConnected
                  ? intl.formatNumber(toNumber(info?.balance ?? from(0)), {
                      notation: 'compact',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '-'
              }
              isLoading={isInfoLoading}
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              to="more"
              variant="outlined"
              color="secondary"
              fullWidth
            >
              {intl.formatMessage({ defaultMessage: 'Governance' })}
            </Button>
            <Button component={Link} to="ogn/staking" fullWidth>
              {intl.formatMessage({ defaultMessage: 'Stake' })}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack
      direction="row"
      {...props}
      sx={[
        {
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          p: 3,
        },
        ...(Array.isArray(props?.sx) ? props.sx : [props?.sx]),
      ]}
    >
      <Grid2 container spacing={1} sx={{ width: 1 }}>
        <Grid2 size={GRID_SIZES[0]} {...gridProps}>
          <Stack direction="row" spacing={1}>
            <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 40 }} />
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {intl.formatMessage({
                  defaultMessage: 'Origin Token',
                })}
              </Typography>
              <Typography variant="caption1" color="text.secondary">
                (
                {intl.formatMessage({
                  defaultMessage: 'OGN',
                })}
                )
              </Typography>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[1]} {...gridProps}>
          <Typography sx={{ fontWeight: 'medium' }}>
            {intl.formatMessage({
              defaultMessage: 'Staking',
            })}
          </Typography>
        </Grid2>
        <Grid2 size={GRID_SIZES[2]} {...gridProps}>
          <Stack
            direction="row"
            spacing={0.75}
            sx={{ alignItems: 'baseline', justifyContent: 'center' }}
          >
            <LoadingLabel
              variant="featured2"
              isLoading={isStakingLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
            >
              {intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Typography sx={{ color: 'primary.main' }}>
              {intl.formatMessage({
                defaultMessage: 'Max vAPY',
              })}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[3]} {...gridProps}>
          <Stack>
            <LoadingLabel isLoading={isInfoLoading} sx={{ fontWeight: 'bold' }}>
              {intl.formatNumber(toNumber(info?.totalSupply ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              &nbsp;
              {intl.formatMessage({
                defaultMessage: 'OGN',
              })}
            </LoadingLabel>
            <LoadingLabel
              isLoading={isInfoLoading}
              variant="caption2"
              color="text.secondary"
            >
              $
              {intl.formatNumber(toNumber(info?.tvlUsd ?? from(0)), {
                notation: 'compact',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Grid2>
        <Grid2 size={GRID_SIZES[4]} {...gridProps}>
          <LoadingLabel isLoading={isInfoLoading} sx={{ fontWeight: 'medium' }}>
            {isConnected
              ? intl.formatNumber(toNumber(info?.balance ?? from(0)), {
                  notation: 'compact',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : '-'}
          </LoadingLabel>
        </Grid2>
        <Grid2 size={GRID_SIZES[6]} offset={GRID_SIZES[5]} {...gridProps}>
          <Button
            component={Link}
            to="more"
            variant="outlined"
            color="secondary"
            fullWidth
          >
            {intl.formatMessage({ defaultMessage: 'Governance' })}
          </Button>
          <Button component={Link} to="ogn/staking" fullWidth>
            {intl.formatMessage({ defaultMessage: 'Stake' })}
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

const gridProps: Partial<Grid2Props> = {
  sx: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 1,
  },
};

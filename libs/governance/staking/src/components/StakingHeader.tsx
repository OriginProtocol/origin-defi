import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import {
  MergerBanner,
  useGovernanceInfo,
  useHoldersCountQuery,
} from '@origin/governance/shared';
import {
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useTotalLockedUp } from '../hooks';
import { ClaimRewardsButton } from './ClaimRewardsModal';

import type { ValueLabelProps } from '@origin/shared/components';

export const StakingHeader = () => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();
  const { data: totalLockups, isLoading: isTotalLockupsLoading } =
    useTotalLockedUp();
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useHoldersCountQuery();

  return (
    <Stack spacing={3}>
      <Box
        sx={{
          py: { xs: 3, sm: 5 },
        }}
      >
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 5,
            }}
          >
            <Stack
              spacing={3}
              sx={{
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h1">
                {intl.formatMessage({ defaultMessage: 'Origin DeFi Staking' })}
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                href="https://www.ousd.com/governance"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                {intl.formatMessage({ defaultMessage: 'OGV Dashboard' })}
                &nbsp;
                <FaArrowUpRightRegular />
              </Button>
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 7,
            }}
          >
            <Stack
              direction="row"
              spacing={{ xs: 2, sm: 4 }}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{ borderColor: 'background.paper' }}
                />
              }
            >
              <ValueLabel
                label={
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      textWrap: 'balance',
                      textAlign: 'center',
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Total OGV staked',
                    })}
                    &nbsp;
                    <InfoTooltip
                      tooltipLabel={intl.formatMessage({
                        defaultMessage:
                          'Percent of OGV staked out of the current total supply.',
                      })}
                    />
                  </Typography>
                }
                value={intl.formatNumber(info?.ogvTotalLockedPercent ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  roundingMode: 'floor',
                })}
                isLoading={isInfoLoading}
                {...valueLabelProps}
              />
              <ValueLabel
                label={intl.formatMessage({ defaultMessage: 'veOGV holders' })}
                value={intl.formatNumber(
                  holdersCount?.ogvAddressesConnection?.totalCount ?? 0,
                )}
                isLoading={isHoldersCountLoading}
                {...valueLabelProps}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <MergerBanner />
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 3,
                height: 1,
                justifyContent: 'space-between',
              }}
            >
              <ValueLabel
                width={1}
                alignItems="flex-start"
                label={intl.formatMessage({
                  defaultMessage: 'My Wallet Balance',
                })}
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <TokenIcon token={tokens.mainnet.OGV} sx={{ width: 20 }} />
                    <LoadingLabel
                      variant="h3"
                      sWidth={80}
                      isLoading={isInfoLoading}
                    >
                      {intl.formatNumber(
                        +formatUnits(
                          info?.ogvBalance ?? 0n,
                          tokens.mainnet.OGV.decimals,
                        ),
                        { notation: 'compact', maximumSignificantDigits: 4 },
                      )}
                    </LoadingLabel>
                  </Stack>
                }
              />
              <ValueLabel
                width={1}
                alignItems="flex-start"
                label={intl.formatMessage({
                  defaultMessage: 'My Staked Balance',
                })}
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <TokenIcon token={tokens.mainnet.OGV} />
                    <LoadingLabel
                      variant="h3"
                      sWidth={80}
                      isLoading={isTotalLockupsLoading && isConnected}
                    >
                      {intl.formatNumber(
                        +formatUnits(
                          totalLockups ?? 0n,
                          tokens.mainnet.OGV.decimals,
                        ),
                        { notation: 'compact', maximumSignificantDigits: 4 },
                      )}
                    </LoadingLabel>
                  </Stack>
                }
              />
            </Stack>
          </Grid>
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                p: 3,
                height: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ValueLabel
                alignItems="flex-start"
                label={intl.formatMessage({
                  defaultMessage: 'My Rewards',
                })}
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack
                    direction="row"
                    spacing={0.75}
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    <TokenIcon token={tokens.mainnet.OGV} />
                    <LoadingLabel
                      variant="h3"
                      sWidth={80}
                      isLoading={isInfoLoading}
                    >
                      {formatAmount(
                        info?.veOgvRewards ?? 0n,
                        tokens.mainnet.OGV.decimals,
                      )}
                    </LoadingLabel>
                  </Stack>
                }
              />
              <ClaimRewardsButton
                variant="outlined"
                color="secondary"
                sx={{ height: 44 }}
              >
                {intl.formatMessage({ defaultMessage: 'Collect Rewards' })}
              </ClaimRewardsButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  labelProps: {
    variant: 'body1',
    sx: { flexGrow: 1, textWrap: 'balance', textAlign: 'center' },
  },
  valueProps: { variant: 'h3' },
  spacing: 1.5,
  sx: { width: 1 },
};

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
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
import { GoArrowUpRight } from 'react-icons/go';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY, useTotalLockedUp } from '../hooks';
import { ClaimRewardsButton } from './ClaimRewardsModal';
import { StakeButton } from './StakeFormModal';

import type { ValueLabelProps } from '@origin/shared/components';

export const StakingHeader = () => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();
  const { data: totalLockups, isLoading: isTotalLockupsLoading } =
    useTotalLockedUp();
  const { data: staking, isLoading: isStakingLoading } = useStakingAPY(100, 48);
  const { data: holdersCount, isLoading: isHoldersCountLoading } =
    useHoldersCountQuery();

  return (
    <Stack spacing={3}>
      <Box py={{ xs: 3, sm: 5 }}>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={5}>
            <Stack alignItems="flex-start" justifyContent="center" spacing={3}>
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
                <GoArrowUpRight />
              </Button>
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={7}>
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
                    color="text.secondary"
                    sx={{ textWrap: 'balance', textAlign: 'center' }}
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
                })}
                isLoading={isInfoLoading}
                {...valueLabelProps}
              />
              <ValueLabel
                label={intl.formatMessage({ defaultMessage: 'veOGV holders' })}
                value={holdersCount?.ogvAddressesConnection?.totalCount ?? 0}
                isLoading={isHoldersCountLoading}
                {...valueLabelProps}
              />
              <ValueLabel
                label={
                  <Typography
                    color="text.secondary"
                    sx={{
                      textWrap: 'balance',
                      textAlign: 'center',
                      flexGrow: 1,
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Max vAPY',
                    })}
                    &nbsp;
                    <InfoTooltip
                      tooltipLabel={intl.formatMessage({
                        defaultMessage:
                          'The maximum variable APY currently being earned on staked OGV. Staking rewards are distributed in OGV.',
                      })}
                    />
                  </Typography>
                }
                value={
                  <Typography
                    variant="h3"
                    sx={{
                      background:
                        'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                }
                isLoading={isStakingLoading}
                {...valueLabelProps}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
      <Box>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={6}>
            <Stack
              bgcolor="background.paper"
              borderRadius={2}
              p={3}
              height={1}
              justifyContent="space-between"
              spacing={2}
            >
              <Stack direction="row">
                <ValueLabel
                  width={1}
                  alignItems="flex-start"
                  label={intl.formatMessage({
                    defaultMessage: 'My Wallet Balance',
                  })}
                  labelProps={{ fontSize: 14 }}
                  value={
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <TokenIcon
                        symbol={tokens.mainnet.OGV.symbol}
                        width={20}
                      />
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
                    <Stack direction="row" alignItems="center" spacing={0.75}>
                      <TokenIcon symbol={tokens.mainnet.OGV.symbol} />
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
              <Stack direction="row" spacing={2}>
                <StakeButton
                  variant="connect"
                  sx={{
                    minWidth: 140,
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Stake' })}
                </StakeButton>
                <Button
                  href="https://app.uniswap.org/swap?outputCurrency=0x9c354503C38481a7A7a51629142963F98eCC12D0&chain=mainnet"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    minWidth: 140,
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Get OGV' })}
                  &nbsp;
                  <GoArrowUpRight />
                </Button>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 xs={12} sm={6} md={3}>
            <Stack
              bgcolor="background.paper"
              borderRadius={2}
              p={3}
              height={1}
              justifyContent="space-between"
              spacing={2}
            >
              <ValueLabel
                alignItems="flex-start"
                label={intl.formatMessage({
                  defaultMessage: 'My Rewards',
                })}
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <TokenIcon symbol={tokens.mainnet.OGV.symbol} />
                    <LoadingLabel
                      variant="h3"
                      sWidth={80}
                      isLoading={isInfoLoading}
                    >
                      {intl.formatNumber(
                        +formatUnits(
                          info?.veOgvRewards ?? 0n,
                          tokens.mainnet.OGV.decimals,
                        ),
                        { notation: 'compact', maximumSignificantDigits: 4 },
                      )}
                    </LoadingLabel>
                  </Stack>
                }
              />
              <ClaimRewardsButton variant="outlined" color="secondary">
                {intl.formatMessage({ defaultMessage: 'Collect Rewards' })}
              </ClaimRewardsButton>
            </Stack>
          </Grid2>
          <Grid2 xs={12} sm={6} md={3}>
            <Stack
              bgcolor="background.paper"
              borderRadius={2}
              p={3}
              height={1}
              spacing={2}
              justifyContent="space-between"
            >
              <ValueLabel
                alignItems="flex-start"
                label={
                  <Typography color="text.secondary">
                    {intl.formatMessage({ defaultMessage: 'My Voting Power' })}
                    &nbsp;
                    <InfoTooltip
                      tooltipLabel={intl.formatMessage({
                        defaultMessage:
                          'The share of total Origin DeFi DAO voting power earned by my OGV lock-ups.',
                      })}
                    />
                  </Typography>
                }
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack direction="row" spacing={0.75} alignItems="flex-start">
                    <TokenIcon
                      symbol={tokens.mainnet.veOGV.symbol}
                      sx={{ transform: 'translateY(4px)' }}
                    />
                    <Stack>
                      <LoadingLabel
                        variant="h3"
                        sWidth={80}
                        isLoading={isInfoLoading}
                      >
                        {intl.formatNumber(
                          +formatUnits(
                            info?.veOgvBalance ?? 0n,
                            tokens.mainnet.OGV.decimals,
                          ),
                          { notation: 'compact', maximumSignificantDigits: 4 },
                        )}
                      </LoadingLabel>
                      <LoadingLabel
                        fontSize={12}
                        color="text.secondary"
                        sWidth={120}
                        isLoading={isInfoLoading}
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: '({value} of total votes)',
                          },
                          {
                            value: intl.formatNumber(
                              info?.votingPowerPercent ?? 0,
                              {
                                style: 'percent',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 5,
                              },
                            ),
                          },
                        )}
                      </LoadingLabel>
                    </Stack>
                  </Stack>
                }
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate('/');
                }}
              >
                {intl.formatMessage({ defaultMessage: 'View Proposals' })}
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
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

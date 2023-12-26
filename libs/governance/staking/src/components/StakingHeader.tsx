import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  useGovernanceInfo,
  useHoldersCountQuery,
} from '@origin/governance/shared';
import {
  InfoTooltip,
  LoadingLabel,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY, useTotalLockedUp } from '../hooks';
import { ClaimRewardsButton } from './ClaimRewardsModal';
import { StakeButton } from './StakeFormModal';

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
      <Box py={5}>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={6}>
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
                <Box
                  component="img"
                  src="images/icons/arrow-up-right-light.svg"
                  width={8}
                  ml={1}
                />
              </Button>
            </Stack>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Stack
              direction="row"
              spacing={4}
              alignItems="center"
              height={1}
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
                    fontSize={14}
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
                labelProps={{ sx: { fontSize: 14 } }}
                sx={{ width: 1 }}
                value={intl.formatNumber(info?.ogvTotalLockedPercent ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                valueProps={{ variant: 'h3' }}
                isLoading={isInfoLoading}
              />
              <ValueLabel
                label={intl.formatMessage({ defaultMessage: 'veOGV holders' })}
                labelProps={{
                  sx: {
                    fontSize: 14,
                    textWrap: 'balance',
                    textAlign: 'center',
                  },
                }}
                sx={{ width: 1 }}
                value={holdersCount?.ogvAddressesConnection?.totalCount ?? 0}
                isLoading={isHoldersCountLoading}
                valueProps={{ variant: 'h3' }}
              />
              <ValueLabel
                label={
                  <Typography
                    fontSize={14}
                    color="text.secondary"
                    sx={{ textWrap: 'balance', textAlign: 'center' }}
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
                labelProps={{ sx: { fontSize: 14 } }}
                sx={{ width: 1 }}
                value={intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                isLoading={isStakingLoading}
                valueProps={{
                  variant: 'h3',
                  sx: {
                    background:
                      'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  },
                }}
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
                    <Stack direction="row" spacing={0.75}>
                      <Box
                        component="img"
                        src={tokens.mainnet.OGV.icon}
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
                    <Stack direction="row" spacing={0.75}>
                      <Box
                        component="img"
                        src={tokens.mainnet.OGV.icon}
                        width={20}
                      />
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
                    minWidth: 160,
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
                    minWidth: 160,
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Get OGV' })}
                  <Box
                    component="img"
                    src="/images/icons/arrow-up-right-light.svg"
                    alt="link"
                    sx={{ height: 8, width: 8, ml: 1 }}
                  />
                </Button>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 xs={6} md={3}>
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
                  <Stack direction="row" spacing={0.75}>
                    <Box
                      component="img"
                      src={tokens.mainnet.OGV.icon}
                      width={20}
                    />
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
          <Grid2 xs={6} md={3}>
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
                    <Box
                      component="img"
                      src={tokens.mainnet.veOGV.icon}
                      width={20}
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

import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import {
  InfoTooltip,
  LoadingLabel,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useFormat } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useStakingInfo } from '../hooks';
import { StakeButton } from './StakeFormModal';

export const StackingHeader = () => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const {
    isLoading,
    ogvBalance,
    veOgvBalance,
    veOgvTotalSupply,
    votingPowerPercent,
    ogvRewards,
  } = useStakingInfo();

  return (
    <Stack spacing={3}>
      <Box py={5}>
        <Grid2 container spacing={3}>
          <Grid2 xs={12} md={6}>
            <Stack alignItems="flex-start" justifyContent="center" spacing={3}>
              <Typography variant="h1">
                {intl.formatMessage({ defaultMessage: 'Origin DeFi Staking' })}
              </Typography>
              <Button variant="outlined" color="secondary">
                {intl.formatMessage({ defaultMessage: 'OGV Dashboard' })}
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
                value={formatAmount(veOgvTotalSupply)}
                valueProps={{ variant: 'h3' }}
                isLoading={isLoading}
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
                value={'0'}
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
                value={'52.32%'}
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
              p={2}
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
                        fontSize={24}
                        sWidth={80}
                        isLoading={isLoading}
                      >
                        {formatAmount(ogvBalance)}
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
                        fontSize={24}
                        sWidth={80}
                        isLoading={isLoading}
                      >
                        {formatAmount(veOgvBalance)}
                      </LoadingLabel>
                    </Stack>
                  }
                />
              </Stack>
              <Stack direction="row" spacing={2}>
                <StakeButton
                  sx={{
                    minWidth: 160,
                    background:
                      'linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                    ':hover': {
                      background:
                        'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, #8C66FC 0%, #0274F1 100%)',
                    },
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Stake' })}
                </StakeButton>
                <Button
                  variant="outlined"
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
              p={2}
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
                      fontSize={24}
                      sWidth={80}
                      isLoading={isLoading}
                    >
                      {formatAmount(ogvRewards)}
                    </LoadingLabel>
                  </Stack>
                }
              />
              <Button variant="outlined">
                {intl.formatMessage({ defaultMessage: 'Collect Rewards' })}
              </Button>
            </Stack>
          </Grid2>
          <Grid2 xs={6} md={3}>
            <Stack
              bgcolor="background.paper"
              borderRadius={2}
              p={2}
              height={1}
              spacing={2}
              justifyContent="space-between"
            >
              <ValueLabel
                alignItems="flex-start"
                label={intl.formatMessage({
                  defaultMessage: 'My Voting Power',
                })}
                labelProps={{ fontSize: 14 }}
                value={
                  <Stack direction="row" spacing={0.75} alignItems="flex-start">
                    <Box
                      component="img"
                      src={tokens.mainnet.veOGV.icon}
                      width={20}
                    />
                    <Stack>
                      <LoadingLabel
                        fontSize={24}
                        sWidth={80}
                        isLoading={isLoading}
                      >
                        {formatAmount(veOgvBalance)}
                      </LoadingLabel>
                      <LoadingLabel
                        fontSize={12}
                        color="text.secondary"
                        sWidth={120}
                        isLoading={isLoading}
                      >
                        {intl.formatMessage(
                          {
                            defaultMessage: '({value} of total votes)',
                          },
                          {
                            value: intl.formatNumber(votingPowerPercent, {
                              style: 'percent',
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }),
                          },
                        )}
                      </LoadingLabel>
                    </Stack>
                  </Stack>
                }
              />
              <Button variant="outlined">
                {intl.formatMessage({ defaultMessage: 'View proposals' })}
              </Button>
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
};

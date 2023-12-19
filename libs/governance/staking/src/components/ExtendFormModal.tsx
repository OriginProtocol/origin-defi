import { useEffect, useState } from 'react';

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import {
  InfoTooltip,
  LoadingLabel,
  MiddleTruncated,
} from '@origin/shared/components';
import { MILLISECONDS_IN_MONTH } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useDebouncedEffect, useMountEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { addMonths, differenceInMonths, formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../hooks';
import { useUserLockupsQuery } from '../queries.generated';
import { getNextEmissionDate } from '../utils';

import type { ButtonProps, DialogProps } from '@mui/material';

import type { Lockup } from '../types';

export type ExtendFormModalProps = {
  lockup: Lockup;
} & DialogProps;

export const ExtendFormModal = ({ lockup, ...rest }: ExtendFormModalProps) => {
  const amount = BigInt(lockup.amount);
  const initialMonthDuration = differenceInMonths(
    new Date(lockup.end),
    new Date(),
  );
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();
  const [duration, setDuration] = useState(initialMonthDuration);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useStakingAPY(amount, duration, {
    enabled: false,
  });

  useMountEffect(() => {
    refetch();
  });

  useDebouncedEffect(
    () => {
      if (duration > initialMonthDuration) {
        refetch();
      }
    },
    [duration],
    800,
  );

  useEffect(() => {
    if (
      isLoading &&
      (!isNilOrEmpty(staking?.stakingAPY) || duration === initialMonthDuration)
    ) {
      setIsLoading(false);
    }
  }, [duration, initialMonthDuration, isLoading, staking?.stakingAPY]);

  const handleDurationChange = (_, newValue: number | number[]) => {
    const val = newValue as number;
    if (val >= (initialMonthDuration ?? 0)) {
      setIsLoading(true);
      setDuration(val);
    }
  };

  const votingPowerPercent =
    (staking?.veOGVReceived ?? 0) /
    +formatUnits(info?.veOgvTotalSupply ?? 1n, tokens.mainnet.OGV.decimals);
  const showRewardLabel = (info?.veOgvRewards ?? 0n) > 0n;
  const stakeDisabled =
    !isConnected ||
    isInfoLoading ||
    isLoading ||
    initialMonthDuration === 48 ||
    duration === initialMonthDuration;

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Extend Stake' })}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack>
          <Stack sx={{ borderRadius: 1, backgroundColor: 'grey.900' }}>
            <Stack
              direction="row"
              px={3}
              pt={2}
              pb={1}
              sx={{ '> *': { width: 1, color: 'text.secondary' } }}
            >
              <Typography>{tokens.mainnet.OGV.symbol}</Typography>
              <Typography textAlign="end">
                {intl.formatMessage({ defaultMessage: 'Time remaining' })}
              </Typography>
              <Typography textAlign="end">
                {intl.formatMessage({ defaultMessage: 'Voting Power' })}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              px={3}
              pt={1}
              pb={2}
              alignItems="baseline"
              sx={{ '> *': { width: 1 } }}
            >
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Box
                  component="img"
                  src={tokens.mainnet.OGV.icon}
                  width={24}
                  sx={{ transform: 'translateY(4px)' }}
                />
                <Typography variant="h3">
                  {formatAmount(
                    BigInt(lockup.amount),
                    tokens.mainnet.OGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
              </Stack>
              <Typography textAlign="end" fontWeight={700}>
                {intl.formatMessage(
                  {
                    defaultMessage:
                      '{count,plural, =1{# month} other{# months}}',
                  },
                  { count: initialMonthDuration },
                )}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="baseline"
                justifyContent="flex-end"
              >
                <Box
                  component="img"
                  src={tokens.mainnet.veOGV.icon}
                  width={24}
                  sx={{ transform: 'translateY(4px)' }}
                />
                <Typography fontWeight={700}>
                  {formatAmount(
                    BigInt(lockup.veogv),
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography fontWeight={700} mb={1.5}>
            {intl.formatMessage({ defaultMessage: 'Lock-up Duration' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The length of time you will lock up your OGV in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
              })}
            />
          </Typography>
          <Stack bgcolor="grey.900" px={3} py={2} spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack>
                <Typography variant="h3">
                  {duration === 0
                    ? intl.formatMessage({ defaultMessage: '0 months' })
                    : formatDuration(
                        {
                          years: Math.floor(duration / 12),
                          months: duration % 12,
                        },
                        {
                          format: ['years', 'months'],
                        },
                      )}
                </Typography>
              </Stack>
              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="flex-end">
                  <Typography color="text.secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Current Lock-up Ends:',
                    })}
                  </Typography>
                  <Typography fontWeight={700} textAlign="end" minWidth={92}>
                    {intl.formatDate(new Date(lockup.end), {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography color="text.secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Extended Lock up Ends:',
                    })}
                  </Typography>
                  <Typography fontWeight={700} textAlign="end" minWidth={92}>
                    {intl.formatDate(
                      addMonths(
                        new Date(lockup.end),
                        duration - initialMonthDuration,
                      ),
                      {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      },
                    )}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box>
              <Slider
                value={duration}
                onChange={handleDurationChange}
                min={0}
                max={48}
                step={1}
                marks={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 12,
                    label: intl.formatMessage({ defaultMessage: '1y' }),
                  },
                  {
                    value: 24,
                    label: intl.formatMessage({ defaultMessage: '2y' }),
                  },
                  {
                    value: 36,
                    label: intl.formatMessage({ defaultMessage: '3y' }),
                  },
                  {
                    value: 48,
                    label: intl.formatMessage({ defaultMessage: '4y' }),
                  },
                ]}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack>
          <Typography fontWeight={700} mb={1.5}>
            {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
            &nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The variable APY currently being earned on staked OGV.',
              })}
            />
          </Typography>
          <Stack bgcolor="grey.900" px={3} py={2} spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <LoadingLabel
                variant="h3"
                sx={{
                  background:
                    'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                sWidth={60}
                isLoading={isLoading}
              >
                {intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Stack direction="row" spacing={1}>
                <Typography color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Next Emissions Reduction Event:',
                  })}
                </Typography>
                <Typography fontWeight={700} minWidth={92}>
                  {intl.formatDate(getNextEmissionDate(), {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                  &nbsp;
                  <InfoTooltip
                    tooltipLabel={intl.formatMessage({
                      defaultMessage:
                        'Staking rewards come from OETH and OUSD performance fees as well as OGV token emissions. Token emissions are scheduled to decrease over time.',
                    })}
                  />
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack>
          <Typography fontWeight={700} mb={1.5}>
            {intl.formatMessage({
              defaultMessage: 'Locked Tokens Received Now',
            })}
            &nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The amount of veOGV you will receive today in return for extending your lock-up. The more veOGV you have, the more voting power you have and the more staking rewards you will earn.',
              })}
            />
          </Typography>
          <Stack bgcolor="grey.900" px={3} py={2} spacing={2}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Stack direction="row" alignItems="baseline">
                <Box
                  component="img"
                  src={tokens.mainnet.veOGV.icon}
                  width={28}
                  mr={1}
                  sx={{ transform: 'translateY(4px)' }}
                />
                <LoadingLabel
                  variant="h3"
                  mr={0.5}
                  isLoading={isLoading}
                  sWidth={60}
                >
                  {formatQuantity(staking?.veOGVReceived)}
                </LoadingLabel>
                &nbsp;
                <Typography color="text.secondary">
                  {tokens.mainnet.veOGV.symbol}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="baseline">
                <Typography
                  sx={{
                    mr: 1,
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Voting Power:',
                  })}
                </Typography>
                <LoadingLabel fontWeight={700} isLoading={isLoading}>
                  {votingPowerPercent <= 1e-4 && votingPowerPercent > 0 && `~ `}
                  {intl.formatNumber(votingPowerPercent, {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </LoadingLabel>
                <InfoTooltip
                  ml={0.75}
                  tooltipLabel={intl.formatMessage({
                    defaultMessage:
                      'The percentage of total Origin DeFi DAO voting power represented by this lock-up.',
                  })}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {showRewardLabel && (
          <Stack bgcolor="grey.900" px={3} py={2} spacing={1}>
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'OGV Rewards Will be Collected',
              })}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ b: { fontWeight: 'normal', color: 'text.primary' } }}
            >
              {intl.formatMessage(
                {
                  defaultMessage:
                    'You have accrued <b>{reward} OGV</b> in staking rewards. This OGV will be transferred to your wallet immediately when you extend your stake.',
                },
                {
                  reward: formatAmount(
                    info?.veOgvRewards,
                    tokens.mainnet.OGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  ),
                },
              )}
            </Typography>
          </Stack>
        )}
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="extend"
          args={[lockup.lockupId, BigInt(duration * MILLISECONDS_IN_MONTH)]}
          disabled={stakeDisabled}
          variant="action"
          label={intl.formatMessage({ defaultMessage: 'Extend Stake' })}
          activityTitle={intl.formatMessage({ defaultMessage: 'Extend Stake' })}
          activitySubtitle={intl.formatMessage(
            {
              defaultMessage:
                'Extend Stake {stake} to {duration,plural,=1{# month} other{# months}}',
            },
            {
              stake: (
                <MiddleTruncated maxWidth={60}>
                  {lockup.lockupId}
                </MiddleTruncated>
              ),
              duration,
            },
          )}
          activityEndIcon={
            <Box
              component="img"
              src={tokens.mainnet.veOGV.icon}
              width={24}
              sx={{ transform: 'translateY(4px)' }}
            />
          }
          onSuccess={() => {
            rest.onClose(null, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: [useUserLockupsQuery.getKey({ address })],
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export type ExtendButtonProps = {
  lockup: Lockup;
} & ButtonProps;

export const ExtendButton = ({ lockup, ...rest }: ExtendButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectedButton
        {...rest}
        onClick={(e) => {
          setOpen(true);
          rest?.onClick(e);
        }}
      />
      <ExtendFormModal
        key={open ? 'open' : 'closed'}
        lockup={lockup}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

import { useEffect, useState } from 'react';

import {
  Box,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  SectionCard,
  useOgnInfo,
  useTxButton,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaCircleExclamationRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { ConnectedButton, TxButton, useFormat } from '@origin/shared/providers';
import {
  getMonthDurationToSeconds,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useDebouncedEffect, useMountEffect } from '@react-hookz/web';
import {
  addMonths,
  differenceInMonths,
  formatDistanceToNowStrict,
  formatDuration,
  isPast,
} from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStartLockupPolling } from '../hooks';

import type { ButtonProps, DialogProps } from '@mui/material';

import type { Lockup } from '../types';

export type ExtendLockupModalProps = {
  lockup: Lockup;
} & DialogProps;

export const ExtendLockupModal = ({
  lockup,
  ...rest
}: ExtendLockupModalProps) => {
  const amount = BigInt(lockup.amount);
  const initialMonthDuration = Math.max(
    0,
    differenceInMonths(new Date(lockup.end), new Date()),
  );
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const startPolling = useStartLockupPolling();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [duration, setDuration] = useState(initialMonthDuration);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useXOgnStakingApy(amount, duration, {
    enabled: false,
  });
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'stake',
      args: [
        0n,
        getMonthDurationToSeconds(duration),
        address ?? ZERO_ADDRESS,
        true,
        BigInt(lockup.lockupId),
      ],
    },
    activity: {
      endIcon: <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 36 }} />,
      title: intl.formatMessage({
        defaultMessage: 'Extend xOGN lockup',
      }),
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            'Lock {amount} OGN for {duration,plural,=1{# month} other{# months}}',
        },
        {
          amount: intl.formatNumber(
            +formatUnits(amount, tokens.mainnet.OGN.decimals),
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
          duration,
        },
      ),
    },
    callbacks: {
      onWriteSuccess: () => {
        startPolling(lockup.lockupId);
        rest?.onClose?.({}, 'backdropClick');
      },
    },
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
      (!isNilOrEmpty(staking?.xOgnApyPercentage) ||
        duration === initialMonthDuration)
    ) {
      setIsLoading(false);
    }
  }, [duration, initialMonthDuration, isLoading, staking?.xOgnApyPercentage]);

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    const val = newValue as number;
    if (val >= (initialMonthDuration ?? 0)) {
      setIsLoading(true);
      setDuration(val);
    }
  };

  const xOgnReceived =
    duration === initialMonthDuration
      ? +formatUnits(BigInt(lockup.points), tokens.mainnet.xOGN.decimals)
      : staking?.xOgnPreview;
  const votingPowerPercent =
    (xOgnReceived ?? 0) /
    +formatUnits(
      (info?.xOgnTotalSupply as unknown as bigint) ?? 1n,
      tokens.mainnet.OGN.decimals,
    );
  const showRewardLabel = ((info?.xOgnRewards as unknown as bigint) ?? 0n) > 0n;
  const isStakeDisabled =
    !isConnected ||
    isInfoLoading ||
    isLoading ||
    duration <= initialMonthDuration;
  const extendLockupEnd =
    duration === initialMonthDuration
      ? isPast(new Date(lockup.end))
        ? new Date()
        : new Date(lockup.end)
      : addMonths(new Date(), duration);

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Extend Stake' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            backgroundColor: 'background.highlight',
            mb: 3,
          }}
        >
          <Typography p={3}>
            {intl.formatMessage({ defaultMessage: 'Selected lockup' })}
          </Typography>
          <Divider />
          <Stack direction="row" justifyContent="space-between" px={3} py={2}>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'OGN' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Time remaining' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Voting power' })}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between" px={3} py={2}>
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup.amount),
                  tokens.mainnet.OGN.decimals,
                ),
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                },
              )}
            </Typography>
            <Typography>
              {formatDistanceToNowStrict(new Date(lockup.end), {
                unit: 'month',
                roundingMethod: 'floor',
              })}
            </Typography>
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup.points) ?? 0n,
                  tokens.mainnet.xOGN.decimals,
                ) /
                  +formatUnits(
                    info?.xOgnTotalSupply ?? 1n,
                    tokens.mainnet.xOGN.decimals,
                  ),
                {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                },
              )}
            </Typography>
          </Stack>
        </Stack>
        <SectionCard
          title={intl.formatMessage({ defaultMessage: 'Lockup Duration' })}
          titleProps={{ color: 'text.secondary', fontWeight: 'medium' }}
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
          })}
          cardProps={{
            sx: { backgroundColor: 'background.highlight' },
          }}
          mb={3}
        >
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              rowGap={1}
              mb={2}
            >
              <Typography variant="featured3" minWidth={170} mr={1}>
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
              <Stack spacing={0.5} flexGrow={1}>
                <Stack direction="row" justifyContent="flex-end">
                  <Typography variant="mono" color="text.secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Current Lockup Ends:',
                    })}
                  </Typography>
                  <Typography textAlign="end" minWidth={92}>
                    {intl.formatDate(new Date(lockup.end), {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="flex-end">
                  <Typography variant="mono" color="text.secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Extended Lockup Ends:',
                    })}
                  </Typography>
                  <Typography textAlign="end" minWidth={92}>
                    {intl.formatDate(extendLockupEnd, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box>
              <Slider
                value={duration}
                onChange={handleDurationChange}
                min={0}
                max={12}
                step={1}
                marks={[
                  {
                    value: 0,
                    label: 0,
                  },
                  {
                    value: 3,
                    label: intl.formatMessage({ defaultMessage: '3m' }),
                  },
                  {
                    value: 6,
                    label: intl.formatMessage({ defaultMessage: '6m' }),
                  },
                  {
                    value: 9,
                    label: intl.formatMessage({ defaultMessage: '9m' }),
                  },
                  {
                    value: 12,
                    label: intl.formatMessage({ defaultMessage: '1y' }),
                  },
                ]}
              />
            </Box>
          </CardContent>
        </SectionCard>
        <SectionCard
          title={intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
          titleProps={{ color: 'text.secondary', fontWeight: 'medium' }}
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The variable APY currently being earned on staked xOGN.',
          })}
          cardProps={{
            sx: { backgroundColor: 'transparent' },
          }}
          mb={3}
        >
          <CardContent>
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              color="primary"
              sWidth={60}
              isLoading={isLoading}
            >
              ~
              {intl.formatNumber(staking?.xOgnApyPercentage ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </CardContent>
        </SectionCard>
        <SectionCard
          title={intl.formatMessage({
            defaultMessage: 'Locked Tokens Received Now',
          })}
          titleProps={{ color: 'text.secondary', fontWeight: 'medium' }}
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The amount of xOGN you will receive today in return for your lockup. The more xOGN you have, the more voting power you have and the more staking rewards you will earn.',
          })}
          cardProps={{
            sx: { backgroundColor: 'transparent' },
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              rowGap={1}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <LoadingLabel
                  variant="featured3"
                  fontWeight="bold"
                  color="primary"
                  isLoading={isLoading && amount > 0n}
                  sWidth={60}
                >
                  {amount > 0n ? formatQuantity(staking?.xOgnPreview) : '0.00'}
                </LoadingLabel>
                <TokenIcon
                  token={tokens.mainnet.xOGN}
                  outlined
                  sx={{ fontSize: 28 }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {tokens.mainnet.xOGN.symbol}
                </Typography>
              </Stack>
              <ValueLabel
                label={intl.formatMessage({
                  defaultMessage: 'Voting Power',
                })}
                labelInfoTooltip={intl.formatMessage({
                  defaultMessage:
                    'The percentage of total Origin DeFi DAO voting power represented by this lockup.',
                })}
                labelProps={{ variant: 'mono' }}
                isLoading={isLoading && amount > 0n}
                value={intl.formatMessage(
                  { defaultMessage: '{tilt}{value}' },
                  {
                    tilt:
                      votingPowerPercent <= 1e-6 && votingPowerPercent > 0
                        ? `~ `
                        : '',
                    value:
                      amount > 0n
                        ? intl.formatNumber(votingPowerPercent, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          })
                        : '0.00%',
                  },
                )}
                valueProps={{ variant: 'body3', fontWeight: 'medium' }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </CardContent>
        </SectionCard>
        {showRewardLabel && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: 'primary.faded',
              borderRadius: 3,
              p: 3,
              mt: 3,
            }}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 20, color: 'primary.main' }}
            />
            <Stack>
              <Typography fontWeight="medium">
                {intl.formatMessage({
                  defaultMessage: 'OGN Rewards Will be Collected',
                })}
              </Typography>
              <Typography color="text.secondary">
                {intl.formatMessage(
                  {
                    defaultMessage:
                      'You have accrued <b>{reward} OGN</b> in staking rewards. This OGN will be transferred to your wallet immediately when you extend your stake.',
                  },
                  {
                    reward: formatAmount(
                      info?.xOgnRewards,
                      tokens.mainnet.OGN.decimals,
                      undefined,
                      { notation: 'compact', maximumSignificantDigits: 4 },
                    ),
                  },
                )}
              </Typography>
            </Stack>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          label={intl.formatMessage({ defaultMessage: 'Extend stake' })}
          disabled={isStakeDisabled}
          variant="action"
          fullWidth
        />
      </DialogActions>
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
          rest?.onClick?.(e);
        }}
      />
      <ExtendLockupModal
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

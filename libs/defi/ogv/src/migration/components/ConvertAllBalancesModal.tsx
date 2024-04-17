import { useEffect, useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useOgvInfo } from '@origin/defi/shared';
import {
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import { useFormat } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useDebouncedEffect, useMountEffect } from '@react-hookz/web';
import {
  addMonths,
  differenceInMonths,
  formatDistanceToNowStrict,
  formatDuration,
} from 'date-fns';
import { remove } from 'ramda';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../../hooks';
import {
  useOgvLockupsQuery,
  useOgvUserInfoQuery,
} from '../../queries.generated';
import { getNextEmissionDate } from '../../utils';

import type { ButtonProps, DialogProps, StackProps } from '@mui/material';

import type { Lockup } from '../../types';

export const ConvertAllBalancesModal = (props: DialogProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const { data: lockups } = useOgvLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data.ogvLockups },
  );
  const [selectedLockups, setSelectedLockups] = useState(lockups ?? []);

  const handleLockupSelect = (lockup: Lockup) => {
    const idx = selectedLockups?.findIndex((l) => l.id === lockup.id) ?? -1;
    if (idx > -1) {
      setSelectedLockups((prev) => remove(idx, 1, prev));
    } else {
      setSelectedLockups((prev) => [...prev, lockup]);
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" {...props}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Convert all stakes' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" pt={3} spacing={5}>
          <LockupsList
            lockups={lockups}
            selectedLockups={selectedLockups}
            onSelectLockup={handleLockupSelect}
            width={0.5}
          />
          <ConvertForm lockups={selectedLockups} width={0.5} />
        </Stack>
      </DialogContent>
      <DialogContent>
        <Button variant="action" fullWidth>
          {intl.formatMessage({ defaultMessage: 'Convert All' })}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

type LockupsListProps = {
  lockups: Lockup[] | undefined;
  selectedLockups: Lockup[];
  onSelectLockup: (lockup: Lockup) => void;
} & StackProps;

function LockupsList({
  lockups,
  selectedLockups,
  onSelectLockup,
  ...rest
}: LockupsListProps) {
  const intl = useIntl();

  return (
    <Stack spacing={3} {...rest}>
      <Typography>
        {intl.formatMessage({ defaultMessage: 'Your Lockups' })}
      </Typography>
      <Stack sx={{ borderRadius: 1, backgroundColor: 'grey.900', flexGrow: 1 }}>
        <Stack
          direction="row"
          px={3}
          pt={2}
          pb={1}
          sx={{ '> *': { width: 1, color: 'text.secondary' } }}
        >
          <Typography sx={{ ml: 6 }}>{tokens.mainnet.OGV.symbol}</Typography>
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Time Remaining' })}
          </Typography>
          <Typography textAlign="end">
            {intl.formatMessage({ defaultMessage: 'Voting Power' })}
          </Typography>
        </Stack>
        <Divider />
        {lockups?.map((lockup) => (
          <LockupRow
            key={lockup.id}
            lockup={lockup}
            isSelected={selectedLockups.some((l) => l.id === lockup.id)}
            onSelectLockup={onSelectLockup}
          />
        ))}
      </Stack>
      <Stack
        sx={{ borderRadius: 1, backgroundColor: 'grey.900', px: 2, py: 1 }}
      >
        <Typography variant="body2" color="text.secondary">
          {intl.formatMessage({
            defaultMessage:
              'All your existing veOGV lockups will be converted to a single xOGN lockup.',
          })}
        </Typography>
      </Stack>
    </Stack>
  );
}

type LockupRowProps = {
  lockup: Lockup;
  isSelected: boolean;
  onSelectLockup: (lockup: Lockup) => void;
} & StackProps;

function LockupRow({
  lockup,
  isSelected,
  onSelectLockup,
  ...rest
}: LockupRowProps) {
  const { formatAmount } = useFormat();

  return (
    <Stack
      direction="row"
      px={3}
      pt={1}
      pb={2}
      alignItems="center"
      {...rest}
      sx={{ '> *': { width: 1 }, ...rest?.sx }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <Checkbox
          checked={isSelected}
          onChange={() => {
            onSelectLockup(lockup);
          }}
        />
        <TokenIcon token={tokens.mainnet.OGV} sx={{ fontSize: 24 }} />
        <Typography>
          {formatAmount(BigInt(lockup.amount), tokens.mainnet.OGV.decimals)}
        </Typography>
      </Stack>
      <Typography textAlign="end">
        {formatDistanceToNowStrict(new Date(lockup.end), {
          unit: 'month',
          roundingMethod: 'floor',
        })}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="flex-end"
      >
        <TokenIcon token={tokens.mainnet.veOGV} />
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
  );
}

type ConvertFormProps = {
  lockups: Lockup[] | undefined;
} & StackProps;

function ConvertForm({ lockups, ...rest }: ConvertFormProps) {
  const initial = {
    amount: 0n,
    initialMonthDuration: 0,
  };
  const { amount, initialMonthDuration } =
    lockups?.reduce(
      (acc, curr) => ({
        amount: acc.amount + BigInt(curr.amount),
        initialMonthDuration: Math.max(
          acc.initialMonthDuration,
          differenceInMonths(new Date(curr.end), new Date()),
        ),
      }),
      initial,
    ) ?? initial;

  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const [duration, setDuration] = useState(48);
  const [isLoading, setIsLoading] = useState(false);
  const { data: info, isLoading: isInfoLoading } = useOgvInfo();
  const { data: user, isLoading: isUserLoading } = useOgvUserInfoQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );
  const { data: staking, refetch } = useStakingAPY(amount, duration, {
    enabled: false,
  });

  useMountEffect(() => {
    refetch();
  });

  useDebouncedEffect(
    () => {
      refetch();
    },
    [duration],
    800,
  );

  useEffect(() => {
    if (isLoading && !isNilOrEmpty(staking?.stakingAPY)) {
      setIsLoading(false);
    }
  }, [duration, initialMonthDuration, isLoading, staking?.stakingAPY]);

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    setIsLoading(true);
    setDuration(newValue as number);
  };

  const percent =
    +formatUnits(
      BigInt(user?.votingPower ?? 0n),
      tokens.mainnet.veOGV.decimals,
    ) /
    +formatUnits(info?.veOgvTotalSupply ?? 1n, tokens.mainnet.veOGV.decimals);
  const extendLockupEnd = addMonths(new Date(), duration);
  const vAPY = (staking?.stakingAPY ?? 0) / 100;

  return (
    <Stack spacing={3} {...rest}>
      <Stack {...cardStackProps}>
        <Stack {...cardRowProps} py={1.5}>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Total OGV' })}
          </Typography>
          <Typography>
            {intl.formatMessage({ defaultMessage: 'Voting power' })}
          </Typography>
        </Stack>
        <Divider />
        <Stack {...cardRowProps}>
          <Typography fontSize={20} fontWeight={700}>
            {formatAmount(amount, tokens.mainnet.veOGV.decimals, undefined, {
              notation: 'compact',
              maximumSignificantDigits: 5,
            })}
          </Typography>
          <Stack alignItems="flex-end">
            <LoadingLabel
              sWidth={60}
              isLoading={isInfoLoading || isUserLoading}
            >
              {percent <= 1e-6 && percent > 0 && `~ `}
              {intl.formatNumber(percent, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 5,
              })}
            </LoadingLabel>
            <LoadingLabel
              sWidth={60}
              isLoading={isInfoLoading || isUserLoading}
              variant="body2"
            >
              {formatAmount(
                BigInt(user?.votingPower ?? '0'),
                tokens.mainnet.veOGV.decimals,
                undefined,
                { notation: 'compact', maximumSignificantDigits: 4 },
              )}
            </LoadingLabel>
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
        <Stack {...cardStackProps}>
          <Stack {...cardRowProps}>
            <Typography fontSize={20} fontWeight={700} mr={1}>
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
                <Typography color="text.secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Lock-up Ends:',
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
          <Stack px={3} pb={2}>
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
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Typography fontWeight={700} mb={1.5}>
          {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}&nbsp;
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The variable APY currently being earned on staked OGV.',
            })}
          />
        </Typography>
        <Stack {...cardStackProps}>
          <Stack {...cardRowProps}>
            <LoadingLabel
              sx={{
                mr: 1,
                fontSize: 20,
                fontWeight: 700,
                background: (theme) => theme.palette.background.gradientOrange,
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
              sWidth={60}
              isLoading={isLoading}
            >
              ~
              {intl.formatNumber(vAPY, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
            <Stack alignItems="flex-end">
              <Typography color="text.secondary">
                {intl.formatMessage({
                  defaultMessage: 'Next Emissions Reduction Event:',
                })}
              </Typography>
              <Typography noWrap>
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
            defaultMessage: 'Locked Tokens Received Now ',
          })}
          &nbsp;
          <InfoTooltip
            tooltipLabel={intl.formatMessage({
              defaultMessage: 'The amount of xOGN you will lockup.',
            })}
          />
        </Typography>
        <Stack {...cardStackProps}>
          <Stack {...cardRowProps}>
            <Stack direction="row" alignItems="center">
              <TokenIcon token={tokens.mainnet.veOGV} sx={{ fontSize: 20 }} />
              <LoadingLabel fontSize={20} fontWeight={700}>
                {intl.formatNumber(
                  +formatUnits(amount, tokens.mainnet.veOGV.decimals),
                  { notation: 'compact', minimumSignificantDigits: 4 },
                )}
              </LoadingLabel>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export const ConvertAllBalancesButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...props}
        onClick={(e) => {
          props?.onClick?.(e);
          setOpen(true);
        }}
      />
      <ConvertAllBalancesModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export const cardStackProps: StackProps = {
  sx: {
    borderRadius: 1,
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
  },
};

export const cardRowProps: StackProps = {
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  sx: {
    px: 3,
    py: 2,
  },
};

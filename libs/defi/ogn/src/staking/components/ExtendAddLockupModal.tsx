import { useState } from 'react';

import {
  Box,
  Button,
  CardContent,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Slider,
  Stack,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  SectionCard,
  TokenButton,
  useApprovalButton,
  useOgnInfo,
  useTxButton,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import {
  BigIntInput,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaCircleExclamationRegular,
  FaXmarkRegular,
  WalletFilled,
} from '@origin/shared/icons';
import { ConnectedButton, TxButton, useFormat } from '@origin/shared/providers';
import { getFormatPrecision, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  addDays,
  addMonths,
  differenceInDays,
  formatDuration,
  isPast,
} from 'date-fns';
import { add, eq, format, from, toNumber } from 'dnum';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStartLockupPolling } from '../hooks';
import { formatTimeRemaining } from '../utils';

import type { DialogProps } from '@mui/material';
import type { SectionCardProps } from '@origin/defi/shared';
import type { ConnectedButtonProps } from '@origin/shared/providers';
import type { Dnum } from 'dnum';
import type { ChangeEvent } from 'react';

import type { Lockup } from '../types';

export type ExtendLockupModalProps = {
  lockup: Lockup;
} & DialogProps;

const MIN_MONTH_DURATION = 1;

export const ExtendAddLockupModal = ({
  lockup,
  ...rest
}: ExtendLockupModalProps) => {
  const initialAmount = [
    BigInt(lockup.amount),
    tokens.mainnet.OGN.decimals,
  ] as Dnum;
  const minEndDate = isPast(new Date(lockup.end))
    ? addMonths(new Date(), MIN_MONTH_DURATION)
    : differenceInDays(new Date(lockup.end), new Date()) < 365 / 12
      ? addDays(
          new Date(lockup.end),
          Math.floor(
            365 / 12 - differenceInDays(new Date(lockup.end), new Date()),
          ),
        )
      : new Date(lockup.end);
  const initialMonthDuration = Math.floor(
    differenceInDays(minEndDate, new Date()) / Math.floor(365 / 12),
  );

  const intl = useIntl();
  const { formatAmount } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const startPolling = useStartLockupPolling();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [amountToAdd, setAmountToAdd] = useState(
    from(0, tokens.mainnet.OGN.decimals),
  );
  const [duration, setDuration] = useState(initialMonthDuration);
  const [addRewards, setAddRewards] = useState(true);
  const totalAmount = add(initialAmount, amountToAdd);
  const { data: staking, isLoading: isStakingLoading } = useXOgnStakingApy(
    totalAmount[0],
    duration,
  );
  const durationSeconds = BigInt(
    Math.min(duration * 60 * 60 * 24 * (365 / 12), 31_536_000),
  );
  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
  } = useApprovalButton({
    token: tokens.mainnet.OGN,
    spender: tokens.mainnet.xOGN.address,
    amount: add(totalAmount, [1n, tokens.mainnet.OGN.decimals])[0],
    enableAllowance: true,
  });
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'stake',
      args: [
        amountToAdd[0],
        durationSeconds,
        address ?? ZERO_ADDRESS,
        addRewards,
        BigInt(lockup.lockupId),
      ],
    },
    activity: {
      type: 'extend-stake',
      status: 'pending',
      amountIn: totalAmount[0],
      tokenIdIn: tokens.mainnet.xOGN.id,
      monthDuration: duration,
      lockupId: lockup.lockupId,
    },
    callbacks: {
      onWriteSuccess: () => {
        startPolling(lockup.lockupId);
        rest?.onClose?.({}, 'backdropClick');
      },
    },
  });

  const handleMaxClick = () => {
    setAmountToAdd([info?.ognBalance ?? 0n, tokens.mainnet.OGN.decimals]);
  };

  const handleAmountChange = (val: bigint) => {
    setAmountToAdd([val, tokens.mainnet.OGN.decimals]);
  };

  const handleToggleAddRewards = (event: ChangeEvent<HTMLInputElement>) => {
    setAddRewards(event.target.checked);
  };

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    const val = newValue as number;
    if (val >= initialMonthDuration) {
      setDuration(val);
    }
  };

  const bal = [info?.ognBalance ?? 0n, tokens.mainnet.OGN.decimals] as Dnum;
  const xOgnReceived = from(
    staking?.xOgnPreview ?? 0,
    tokens.mainnet.xOGN.decimals,
  );
  const votingPowerPercent =
    toNumber(from(staking?.xOgnPreview ?? 0, tokens.mainnet.xOGN.decimals)) /
    +formatUnits(
      (info?.xOgnTotalSupply as unknown as bigint) ?? 1n,
      tokens.mainnet.OGN.decimals,
    );
  const extendLockupEnd =
    duration === initialMonthDuration
      ? minEndDate
      : addMonths(minEndDate, duration - initialMonthDuration);
  const showApprove =
    isConnected &&
    !isInfoLoading &&
    amountToAdd[0] <= (info?.ognBalance ?? 0n) &&
    amountToAdd[0] > (allowance ?? 0n);
  const isStakeDisabled =
    !isConnected ||
    isInfoLoading ||
    showApprove ||
    (duration === initialMonthDuration && eq(amountToAdd, initialAmount));

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Manage Stake' })}
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
            mb: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              rowGap: 1,
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: 'medium',
                color: 'text.secondary',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Amount to add' })}
            </Typography>
            <Button variant="link" onClick={handleMaxClick}>
              <WalletFilled sx={{ fontSize: 20, mr: 1 }} />
              <Typography
                noWrap
                sx={{
                  fontWeight: 'medium',
                }}
              >
                {format(bal, {
                  digits: getFormatPrecision(bal),
                  decimalsRounding: 'ROUND_DOWN',
                })}
              </Typography>
            </Button>
          </Stack>
          <BigIntInput
            value={amountToAdd[0]}
            decimals={tokens.mainnet.OGN.decimals}
            onChange={handleAmountChange}
            endAdornment={<TokenButton token={tokens.mainnet.OGN} disabled />}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 3,
              backgroundColor: 'background.highlight',
              border: '1px solid',
              borderColor: 'divider',
              ...theme.typography.h6,
            }}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch checked={addRewards} onChange={handleToggleAddRewards} />
          }
          label={intl.formatMessage(
            {
              defaultMessage: 'Add unclaimed rewards to stake ({rewards} OGN)',
            },
            {
              rewards: formatAmount(
                info?.xOgnRewards ?? 0n,
                tokens.mainnet.OGN.decimals,
              ),
            },
          )}
          sx={{ mb: 3 }}
        />
        <Collapse in={!addRewards}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'primary.main',
              backgroundColor: 'primary.faded',
              borderRadius: 3,
              p: 3,
              mb: 3,
            }}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 20, color: 'primary.main' }}
            />
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({
                defaultMessage:
                  'Any unclaimed rewards will transferred to your wallet immediately when you extend your stake.',
              })}
            </Typography>
          </Stack>
        </Collapse>
        <SectionCard
          title={intl.formatMessage({ defaultMessage: 'Selected lockup' })}
          mb={3}
          {...sectionCardProps}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography
              variant="caption1"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'OGN' })}
            </Typography>
            <Typography
              variant="caption1"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Time remaining' })}
            </Typography>
            <Typography
              variant="caption1"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Voting power' })}
            </Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup?.amount ?? 0),
                  tokens.mainnet.OGN.decimals,
                ),
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                },
              )}
            </Typography>
            <Typography>{formatTimeRemaining(lockup.end)}</Typography>
            <Typography>
              {intl.formatNumber(
                +formatUnits(
                  BigInt(lockup?.points ?? 0),
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
        </SectionCard>
        <SectionCard
          title={intl.formatMessage({ defaultMessage: 'Lockup Duration' })}
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
          })}
          {...sectionCardProps}
          mb={3}
        >
          <CardContent>
            <Stack
              direction="row"
              sx={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                rowGap: 1,
                mb: 2,
              }}
            >
              <Typography
                variant="featured3"
                sx={{
                  minWidth: 170,
                  mr: 1,
                }}
              >
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
              <Stack
                spacing={0.5}
                sx={{
                  flexGrow: 1,
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography
                    variant="mono"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Current Lockup Ends:',
                    })}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'end',
                      minWidth: 92,
                    }}
                  >
                    {intl.formatDate(new Date(lockup.end), {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'flex-end',
                  }}
                >
                  <Typography
                    variant="mono"
                    sx={{
                      color: 'text.secondary',
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Extended Lockup Ends:',
                    })}
                  </Typography>
                  <Typography
                    sx={{
                      textAlign: 'end',
                      minWidth: 92,
                    }}
                  >
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
          titleInfoTooltip={intl.formatMessage({
            defaultMessage:
              'The variable APY currently being earned on staked xOGN.',
          })}
          {...sectionCardProps}
          cardProps={{
            sx: { backgroundColor: 'transparent' },
          }}
          mb={3}
        >
          <CardContent>
            <LoadingLabel
              variant="featured3"
              sWidth={60}
              isLoading={isStakingLoading}
              sx={{ color: 'primary.main', fontWeight: 'bold' }}
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
            defaultMessage: 'Total voting power',
          })}
          {...sectionCardProps}
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
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <LoadingLabel
                  variant="featured3"
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                  isLoading={isStakingLoading || isInfoLoading}
                  sWidth={60}
                >
                  {format(xOgnReceived, getFormatPrecision(xOgnReceived))}
                </LoadingLabel>
                <TokenIcon
                  token={tokens.mainnet.xOGN}
                  outlined
                  sx={{ fontSize: 28 }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
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
                isLoading={isStakingLoading}
                value={intl.formatMessage(
                  { defaultMessage: '{tilt}{value}' },
                  {
                    tilt:
                      votingPowerPercent <= 1e-6 && votingPowerPercent > 0
                        ? `~ `
                        : '',
                    value: intl.formatNumber(votingPowerPercent ?? 0, {
                      style: 'percent',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 5,
                    }),
                  },
                )}
                valueProps={{ variant: 'body3', fontWeight: 'medium' }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </CardContent>
        </SectionCard>
      </DialogContent>
      <DialogActions>
        <Collapse in={showApprove}>
          <TxButton
            params={approvalParams}
            callbacks={approvalCallbacks}
            variant="action"
            fullWidth
            disabled={isInfoLoading}
            label={approvalLabel}
            sx={{ mb: 1.5 }}
          />
        </Collapse>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          label={intl.formatMessage({ defaultMessage: 'Extend/Add' })}
          disabled={isStakeDisabled}
          variant="action"
          fullWidth
        />
      </DialogActions>
    </Dialog>
  );
};

const sectionCardProps: Partial<SectionCardProps> = {
  titleProps: { color: 'text.secondary', fontWeight: 'medium' },
  cardProps: {
    sx: { backgroundColor: 'background.highlight' },
  },
};

export type ExtendButtonProps = {
  lockup: Lockup;
} & ConnectedButtonProps;

export const ExtendAddButton = ({ lockup, ...rest }: ExtendButtonProps) => {
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
      {open && (
        <ExtendAddLockupModal
          key={open ? 'open' : 'closed'}
          lockup={lockup}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
};

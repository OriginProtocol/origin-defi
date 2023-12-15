import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import {
  BigIntInput,
  InfoTooltip,
  LoadingLabel,
} from '@origin/shared/components';
import { MILLISECONDS_IN_MONTH } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import {
  ApprovalButton,
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { addMonths, formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../hooks';

import type { ButtonProps, DialogProps } from '@mui/material';

export const StakeFormModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { isConnected } = useAccount();
  const {
    data: { ogvBalance, veOgvTotalSupply, ogvVeOgvAllowance },
    isLoading: isInfoLoading,
  } = useGovernanceInfo();
  const [amount, setAmount] = useState(0n);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useStakingAPY(amount, duration, {
    enabled: false,
  });

  useDebouncedEffect(
    () => {
      if (amount > 0n && duration > 0) {
        setIsLoading(true);
        refetch();
      }
    },
    [amount, duration],
    800,
  );

  useEffect(() => {
    if (
      isLoading &&
      (!isNilOrEmpty(staking?.stakingAPY) || amount === 0n || duration === 0)
    ) {
      setIsLoading(false);
    }
  }, [amount, staking, duration, isLoading]);

  const handleAmountChange = (val: bigint) => {
    setIsLoading(duration > 0);
    setAmount(val);
  };

  const handleDurationChange = (_, newValue: number | number[]) => {
    setIsLoading(amount > 0n);
    setDuration(newValue as number);
  };

  const handleMaxClick = () => {
    setAmount(ogvBalance);
  };

  const votinPowerPercent =
    (staking?.veOGVReceived ?? 0) /
    +formatUnits(veOgvTotalSupply, tokens.mainnet.OGV.decimals);
  const showApprove =
    isConnected &&
    !isInfoLoading &&
    amount > 0n &&
    duration > 0 &&
    amount <= ogvBalance &&
    amount > ogvVeOgvAllowance;
  const stakeDisabled =
    !isConnected ||
    isInfoLoading ||
    amount === 0n ||
    duration === 0 ||
    amount > ogvBalance ||
    amount > ogvVeOgvAllowance;

  return (
    <Dialog {...props} maxWidth="sm" fullWidth>
      <DialogTitle>
        {intl.formatMessage({ defaultMessage: 'Stake' })}
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
            mb={1.5}
          >
            <Typography fontWeight={700}>
              {intl.formatMessage({ defaultMessage: 'Amount to Stake' })}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography color="text.secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Balance: {balance}',
                  },
                  {
                    balance: formatAmount(
                      ogvBalance,
                      tokens.mainnet.OGV.decimals,
                    ),
                  },
                )}
              </Typography>
              <Button
                onClick={handleMaxClick}
                disabled={ogvBalance === 0n}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 1,
                  minWidth: 36,
                  lineHeight: 1,
                  color: 'text.secondary',
                  py: 0.25,
                  px: 0.5,
                  background: (theme) => alpha(theme.palette.common.white, 0.1),
                  ':hover': {
                    background: (theme) => theme.palette.grey[600],
                  },
                }}
              >
                {intl.formatMessage({ defaultMessage: 'max' })}
              </Button>
            </Stack>
          </Stack>
          <BigIntInput
            value={amount}
            decimals={tokens.mainnet.OGV.decimals}
            onChange={handleAmountChange}
            endAdornment={
              <Stack
                direction="row"
                sx={{
                  borderLeft: (theme) => `1px solid ${theme.palette.grey[800]}`,
                  pl: 1,
                  gap: 1,
                }}
              >
                <Box component="img" src={tokens.mainnet.OGV.icon} width={28} />
                <Typography fontSize={20}>
                  {tokens.mainnet.OGV.symbol}
                </Typography>
              </Stack>
            }
            inputProps={{
              style: { fontSize: 24 },
            }}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 1,
              backgroundColor: 'grey.900',
              borderColor: 'transparent',
              '&:hover, &:focus-within': {
                borderColor: 'transparent',
              },
              '&:hover': {
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[900]}, ${
                    theme.palette.grey[900]
                  }) padding-box, linear-gradient(90deg, ${alpha(
                    theme.palette.primary.main,
                    0.4,
                  )} 0%, ${alpha(
                    theme.palette.primary.dark,
                    0.4,
                  )} 100%) border-box;`,
              },
              '&:focus-within': {
                background: (theme) =>
                  `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
              },
            }}
          />
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
              justifyContent="space-between"
              alignItems="center"
            >
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
              <Stack direction="row" spacing={1}>
                <Typography sx={{ strong: { minWidth: 92 } }}>
                  {intl.formatMessage({ defaultMessage: 'Lock up Ends:' })}
                </Typography>
                <Typography fontWeight={700} minWidth={92}>
                  {intl.formatDate(addMonths(new Date(), duration), {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </Typography>
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
                <Typography sx={{ strong: { minWidth: 92 } }}>
                  {intl.formatMessage({
                    defaultMessage: 'Next Emissions Reduction Event:',
                  })}
                </Typography>
                <Typography fontWeight={700} minWidth={92}>
                  {intl.formatDate(new Date(), {
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
                  'The amount of veOGV you will receive today in return for your lock-up. The more veOGV you have, the more voting power you have and the more staking rewards you will earn.',
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
                <Typography sx={{ mr: 1, strong: { minWidth: 92 } }}>
                  {intl.formatMessage({
                    defaultMessage: 'Voting Power:',
                  })}
                </Typography>
                <LoadingLabel fontWeight={700} isLoading={isLoading}>
                  {votinPowerPercent <= 1e-4 && votinPowerPercent > 0 && `~ `}
                  {intl.formatNumber(votinPowerPercent, {
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
        <Collapse in={showApprove}>
          <Stack>
            <ApprovalButton
              token={tokens.mainnet.OGV}
              spender={tokens.mainnet.veOGV}
              amount={amount}
              variant="action"
              disabled={isInfoLoading}
              onSuccess={() => {
                queryClient.invalidateQueries({
                  queryKey: ['useGovernanceInfo'],
                });
              }}
            />
          </Stack>
        </Collapse>
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="stake"
          args={[amount, BigInt(duration * MILLISECONDS_IN_MONTH)]}
          disabled={stakeDisabled}
          variant="action"
          label={
            amount > ogvBalance
              ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
              : intl.formatMessage({ defaultMessage: 'Stake' })
          }
          activityTitle={intl.formatMessage({ defaultMessage: 'Stake OGV' })}
          activitySubtitle={intl.formatMessage(
            {
              defaultMessage:
                'Lock {amount} OGV for {duration,plural,=1{# month} other{# months}}',
            },
            {
              amount: intl.formatNumber(
                +formatUnits(amount, tokens.mainnet.OGV.decimals),
                { notation: 'compact', maximumSignificantDigits: 4 },
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
            props.onClose(null, 'backdropClick');
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export const StakeButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectedButton
        {...props}
        onClick={(e) => {
          setOpen(true);
          if (props?.onClick) {
            props.onClick(e);
          }
        }}
      />
      <StakeFormModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

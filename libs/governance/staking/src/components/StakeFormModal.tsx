import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import {
  BigIntInput,
  InfoTooltip,
  LoadingLabel,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import {
  ApprovalButton,
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { addMonths, formatDuration } from 'date-fns';
import { secondsInMonth } from 'date-fns/constants';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../hooks';
import { useUserLockupsQuery } from '../queries.generated';
import { getNextEmissionDate } from '../utils';

import type { ButtonProps, DialogProps } from '@mui/material';

export const StakeFormModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const { isConnected, address } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();
  const [amount, setAmount] = useState(0n);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { data: staking, refetch } = useStakingAPY(
    amount === 0n ? 100n : amount,
    duration,
    {
      enabled: false,
    },
  );

  useDebouncedEffect(
    () => {
      if (duration > 0) {
        refetch();
      }
    },
    [amount, duration],
    800,
  );

  useEffect(() => {
    if (isLoading && (!isNilOrEmpty(staking?.stakingAPY) || duration === 0)) {
      setIsLoading(false);
    }
  }, [amount, staking, duration, isLoading]);

  const handleAmountChange = (val: bigint) => {
    setIsLoading(duration > 0);
    setAmount(val);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDurationChange = (_: any, newValue: number | number[]) => {
    setIsLoading(true);
    setDuration(newValue as number);
  };

  const handleMaxClick = () => {
    setAmount(info?.ogvBalance ?? 0n);
  };

  const votingPowerPercent =
    (staking?.veOGVReceived ?? 0) /
    +formatUnits(info?.veOgvTotalSupply ?? 0n, tokens.mainnet.OGV.decimals);
  const showRewardLabel = (info?.veOgvRewards ?? 0n) > 0n;
  const showApprove =
    isConnected &&
    !isInfoLoading &&
    amount > 0n &&
    duration > 0 &&
    amount <= (info?.ogvBalance ?? 0n) &&
    amount > (info?.ogvVeOgvAllowance ?? 0n);
  const stakeDisabled =
    !isConnected ||
    isInfoLoading ||
    isLoading ||
    amount === 0n ||
    duration === 0 ||
    amount > (info?.ogvBalance ?? 0n) ||
    amount > (info?.ogvVeOgvAllowance ?? 0n);

  return (
    <Dialog {...props} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Stake' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            pt: 3,
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
                fontWeight: 700,
                mr: 1,
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Amount to Stake' })}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Typography
                noWrap
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage(
                  {
                    defaultMessage: 'Balance: {balance}',
                  },
                  {
                    balance: formatAmount(
                      info?.ogvBalance ?? 0n,
                      tokens.mainnet.OGV.decimals,
                    ),
                  },
                )}
              </Typography>
              <Button
                onClick={handleMaxClick}
                disabled={isNilOrEmpty(info) || info?.ogvBalance === 0n}
                sx={(theme) => ({
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
                    background: theme.palette.grey[600],
                  },
                })}
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
                sx={[
                  {
                    alignItems: 'center',
                  },
                  (theme) => ({
                    borderLeft: `1px solid ${theme.palette.grey[800]}`,
                    pl: 1,
                    gap: 1,
                  }),
                ]}
              >
                <TokenIcon token={tokens.mainnet.OGV} sx={{ width: 28 }} />
                <Typography
                  sx={{
                    fontSize: 20,
                  }}
                >
                  {tokens.mainnet.OGV.symbol}
                </Typography>
              </Stack>
            }
            inputProps={{
              style: { fontSize: 24 },
            }}
            sx={(theme) => ({
              px: 3,
              py: 2,
              borderRadius: 1,
              backgroundColor: 'grey.900',
              borderColor: 'transparent',
              '&:hover, &:focus-within': {
                borderColor: 'transparent',
              },
              '&:hover': {
                background: `linear-gradient(${theme.palette.grey[900]}, ${
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
                background: `linear-gradient(${theme.palette.grey[900]}, ${theme.palette.grey[900]}) padding-box, linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%) border-box;`,
              },
            })}
          />
        </Stack>
        <Stack
          sx={{
            pt: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Lock-up Duration' })}&nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The length of time you will lock up your OGV in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
              })}
            />
          </Typography>
          <Stack
            spacing={2}
            sx={{
              backgroundColor: 'grey.900',
              px: 3,
              py: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'baseline',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <Typography
                variant="h3"
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
              <Stack direction="row" spacing={1}>
                <Typography sx={{ color: 'text.secondary' }}>
                  {intl.formatMessage({ defaultMessage: 'Lock up Ends:' })}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    minWidth: 92,
                  }}
                >
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
        <Stack
          sx={{
            pt: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
            &nbsp;
            <InfoTooltip
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'The variable APY currently being earned on staked OGV.',
              })}
            />
          </Typography>
          <Stack
            spacing={2}
            sx={{
              backgroundColor: 'grey.900',
              px: 3,
              py: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <LoadingLabel
                variant="h3"
                sx={{
                  mr: 1,
                  background:
                    'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                sWidth={60}
                isLoading={isLoading}
              >
                {intl.formatNumber(staking?.stakingAPY ?? 0, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Stack
                direction="row"
                sx={{
                  flexWrap: 'wrap',
                }}
              >
                <Typography sx={{ color: 'text.secondary', mr: 1 }}>
                  {intl.formatMessage({
                    defaultMessage: 'Next Emissions Reduction Event:',
                  })}
                </Typography>
                <Typography
                  noWrap
                  sx={{
                    fontWeight: 700,
                  }}
                >
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
        <Stack
          sx={{
            pt: 3,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              mb: 1.5,
            }}
          >
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
          <Stack
            spacing={2}
            sx={{
              backgroundColor: 'grey.900',
              px: 3,
              py: 2,
            }}
          >
            <Stack
              direction="row"
              sx={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
                flexWrap: 'wrap',
                rowGap: 1,
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: 'baseline',
                  mr: 1,
                }}
              >
                <TokenIcon
                  token={tokens.mainnet.veOGV}
                  sx={{ mr: 1, width: 28, transform: 'translateY(4px)' }}
                />
                <LoadingLabel
                  variant="h3"
                  isLoading={isLoading && amount > 0n}
                  sWidth={60}
                  sx={{ mr: 0.5 }}
                >
                  {amount > 0n
                    ? formatQuantity(staking?.veOGVReceived)
                    : '0.00'}
                </LoadingLabel>
                &nbsp;
                <Typography
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {tokens.mainnet.veOGV.symbol}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'baseline',
                }}
              >
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
                <LoadingLabel
                  sx={{ fontWeight: 'bold' }}
                  isLoading={isLoading && amount > 0n}
                >
                  {votingPowerPercent <= 1e-6 && votingPowerPercent > 0 && `~ `}
                  {amount > 0n
                    ? intl.formatNumber(votingPowerPercent, {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 5,
                      })
                    : '0.00%'}
                </LoadingLabel>
                <InfoTooltip
                  sx={{ ml: 0.75 }}
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
          <Stack
            spacing={1}
            sx={{
              backgroundColor: 'grey.900',
              px: 3,
              py: 2,
              mt: 3,
            }}
          >
            <Typography>
              {intl.formatMessage({
                defaultMessage: 'OGV Rewards Will be Collected',
              })}
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                b: { fontWeight: 'normal', color: 'text.primary' },
              }}
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
        <Collapse in={showApprove}>
          <ApprovalButton
            token={tokens.mainnet.OGV}
            spender={tokens.mainnet.veOGV.address}
            amount={amount}
            variant="action"
            fullWidth
            disabled={isInfoLoading}
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: ['useGovernanceInfo'],
              });
            }}
            sx={{ mt: 3 }}
          />
        </Collapse>
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="stake"
          args={[amount, BigInt(duration * secondsInMonth)]}
          disabled={stakeDisabled}
          variant="action"
          label={
            amount > (info?.ogvBalance ?? 0n)
              ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
              : intl.formatMessage({ defaultMessage: 'Stake' })
          }
          notificationTitle={intl.formatMessage({
            defaultMessage: 'Stake OGV',
          })}
          notificationSubtitle={intl.formatMessage(
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
          notificationEndIcon={
            <TokenIcon
              token={tokens.mainnet.veOGV}
              sx={{ width: 28, transform: 'translateY(4px)' }}
            />
          }
          onSuccess={() => {
            props?.onClose?.({}, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: [
                useUserLockupsQuery.getKey({
                  address: address?.toLowerCase() ?? ZERO_ADDRESS,
                }),
              ],
            });
          }}
          fullWidth
          sx={{ mt: 3 }}
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
          props?.onClick?.(e);
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

import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  Slider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import {
  TokenButton,
  TokenChip,
  useApprovalButton,
  useOgnInfo,
  useTxButton,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import {
  BigIntInput,
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaCircleExclamationRegular, WalletFilled } from '@origin/shared/icons';
import { TxButton, useFormat } from '@origin/shared/providers';
import {
  getMonthDurationToSeconds,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useDebouncedEffect, useMountEffect } from '@react-hookz/web';
import { addMonths, formatDuration } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { useStartLockupPolling } from '../hooks';

export const StakingForm = () => {
  const intl = useIntl();
  const { formatQuantity, formatAmount } = useFormat();
  const theme = useTheme();
  const startPolling = useStartLockupPolling();
  const { address, isConnected } = useAccount();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const [amount, setAmount] = useState(0n);
  const [duration, setDuration] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: staking,
    isLoading: isStakingLoading,
    refetch,
  } = useXOgnStakingApy(amount === 0n ? undefined : amount, duration, {
    enabled: false,
  });
  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
  } = useApprovalButton({
    token: tokens.mainnet.OGN,
    spender: tokens.mainnet.xOGN.address,
    amount,
    enableAllowance: true,
  });
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'stake',
      args: [
        amount,
        getMonthDurationToSeconds(duration),
        address ?? ZERO_ADDRESS,
        true,
        BigInt(-1),
      ],
    },
    activity: {
      endIcon: <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 36 }} />,
      title: intl.formatMessage({
        defaultMessage: 'Stake OGN',
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
        startPolling();
        setAmount(0n);
        setDuration(1);
      },
    },
  });

  useMountEffect(() => {
    refetch();
  });

  useDebouncedEffect(
    () => {
      if (duration > 0) {
        refetch();
      }
    },
    [amount, duration],
    400,
  );

  useEffect(() => {
    if (
      isLoading &&
      !isStakingLoading &&
      !isNilOrEmpty(staking?.xOgnApyPercentage)
    ) {
      setIsLoading(false);
    }
  }, [isLoading, isStakingLoading, staking?.xOgnApyPercentage]);

  const handleAmountChange = (val: bigint) => {
    setIsLoading(duration > 0);
    setAmount(val);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDurationChange = (_: any, newValue: number | number[]) => {
    const dur = Number(newValue);
    if (dur >= 1 && dur !== duration) {
      setIsLoading(true);
      setDuration(dur);
    }
  };

  const handleMaxClick = () => {
    setAmount(info?.ognBalance ?? 0n);
  };

  const votingPowerPercent = Math.min(
    1,
    (staking?.xOgnPreview ?? 0) /
      (+formatUnits(info?.xOgnTotalSupply ?? 1n, tokens.mainnet.xOGN.decimals) +
        (staking?.xOgnPreview ?? 0)),
  );
  const showRewardLabel = (info?.xOgnRewards ?? 0n) > 0n;
  const showApprove =
    isConnected &&
    !isInfoLoading &&
    amount > 0n &&
    amount <= (info?.ognBalance ?? 0n) &&
    amount > (allowance ?? 0n);
  const stakeDisabled =
    !isConnected ||
    isInfoLoading ||
    isLoading ||
    amount === 0n ||
    amount > (info?.ognBalance ?? 0n) ||
    amount > (allowance ?? 0n);

  return (
    <Card>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Stake OGN' })} />
      <Divider />
      <CardContent>
        <Stack mb={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            flexWrap="wrap"
            rowGap={1}
            mb={1.5}
          >
            <InfoTooltipLabel
              tooltipLabel={intl.formatMessage({
                defaultMessage: 'The amount of OGN you want to lock',
              })}
              fontWeight="medium"
            >
              {intl.formatMessage({ defaultMessage: 'Amount to Stake' })}
            </InfoTooltipLabel>
            <Button variant="link" onClick={handleMaxClick}>
              <WalletFilled sx={{ fontSize: 20, mr: 1 }} />
              <Typography noWrap fontWeight="medium">
                {formatAmount(
                  info?.ognBalance ?? 0n,
                  tokens.mainnet.OGN.decimals,
                )}
              </Typography>
            </Button>
          </Stack>
          <BigIntInput
            value={amount}
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
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The length of time you will lock up your OGN in order to receive yield and voting power. Unstaking early carries a penalty relative to the remaining duration of the lockup',
            })}
            mb={1.5}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Lockup Duration' })}
          </InfoTooltipLabel>
          <Stack
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
              backgroundColor: 'background.highlight',
            }}
          >
            <Stack
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
              flexWrap="wrap"
              rowGap={1}
            >
              <Typography
                variant="featured3"
                fontWeight="bold"
                color="primary.main"
                minWidth={170}
                mr={1}
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
                <Typography color="text.secondary">
                  {intl.formatMessage({ defaultMessage: 'Lockup Ends:' })}
                </Typography>
                <Typography minWidth={92}>
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
                sx={{
                  '& .MuiSlider-markLabel': {
                    fontSize: 12,
                  },
                }}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The variable APY currently being earned on staked xOGN.',
            })}
            mb={1.5}
            fontWeight="medium"
          >
            {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
          </InfoTooltipLabel>
          <Stack
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
            }}
          >
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
          </Stack>
        </Stack>
        <Stack mb={3}>
          <InfoTooltipLabel
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The amount of xOGN you will receive today in return for your lockup. The more xOGN you have, the more voting power you have and the more staking rewards you will earn.',
            })}
            mb={1.5}
            fontWeight="medium"
          >
            {intl.formatMessage({
              defaultMessage: 'Locked Tokens Received Now',
            })}
          </InfoTooltipLabel>
          <Stack
            spacing={2}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: 3,
            }}
          >
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
                  sWidth={100}
                >
                  {amount > 0n ? formatQuantity(staking?.xOgnPreview) : '0.00'}
                </LoadingLabel>
                <TokenChip
                  token={tokens.mainnet.xOGN}
                  iconProps={{ sx: { fontSize: 28 } }}
                  labelProps={{ variant: 'body2', fontWeight: 'bold' }}
                />
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
                value={
                  amount > 0n
                    ? intl.formatMessage(
                        { defaultMessage: '{tilt}{value}' },
                        {
                          tilt:
                            votingPowerPercent <= 1e-6 && votingPowerPercent > 0
                              ? `~ `
                              : '',
                          value: intl.formatNumber(votingPowerPercent, {
                            style: 'percent',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 5,
                          }),
                        },
                      )
                    : '-'
                }
                valueProps={{ variant: 'body3', fontWeight: 'medium' }}
                sx={{ alignItems: 'flex-end' }}
              />
            </Stack>
          </Stack>
        </Stack>
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
              mb: 3,
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
          disabled={stakeDisabled}
          variant="action"
          fullWidth
          label={
            amount > (info?.ognBalance ?? 0n)
              ? intl.formatMessage({ defaultMessage: 'Insufficient funds' })
              : intl.formatMessage({ defaultMessage: 'Stake' })
          }
        />
      </CardContent>
    </Card>
  );
};

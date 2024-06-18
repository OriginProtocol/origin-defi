import { useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
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
  TokenChip,
  useApprovalButton,
  useTxButton,
  useXOgnStakingApy,
} from '@origin/defi/shared';
import {
  ExpandIcon,
  InfoTooltipLabel,
  LoadingLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import { TxButton, useFormat } from '@origin/shared/providers';
import { getMonthDurationToSeconds, isNilOrEmpty } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { addMonths, formatDuration } from 'date-fns';
import { format, mul, sub } from 'dnum';
import { not } from 'ramda';
import { useIntl } from 'react-intl';

import { ogvToOgnRate } from '../constants';

import type { ButtonProps, DialogProps, StackProps } from '@mui/material';

import type { Lockup } from '../types';

type UserInput = {
  ogvBalance: bigint;
  ogvRewards: bigint;
  veOgvlockups: Lockup[];
};

export type ConvertModalProps = UserInput & DialogProps;

const RATIO_WARNING_THRESHOLD = 100; // 50%
const DURATION_WARNING_THRESHOLD = 12; // 6 months

export const ConvertModal = ({
  ogvBalance,
  ogvRewards,
  veOgvlockups,
  onClose,
  ...rest
}: ConvertModalProps) => {
  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [stakingRatio, setSatkingRatio] = useState(100);
  const [duration, setDuration] = useState(12);
  const [ratioOpen, setRatioOpen] = useState(false);
  const queryClient = useQueryClient();

  let total = ogvBalance;
  if (!isNilOrEmpty(veOgvlockups)) {
    total +=
      ogvRewards +
      veOgvlockups.reduce((acc, curr) => acc + BigInt(curr.amount), 0n);
  }
  const converted = mul([total, tokens.mainnet.OGV.decimals], ogvToOgnRate);
  const liquidConverted = mul(converted, (100 - stakingRatio) / 100);
  const stakedConverted =
    stakingRatio === 0
      ? ([0n, tokens.mainnet.OGV.decimals] as const)
      : sub(mul(converted, stakingRatio / 100), 1e-9);

  const { data: xOgnStaking, isLoading: isXOgnStakingLoading } =
    useXOgnStakingApy(stakedConverted[0], duration);
  const {
    allowance,
    isAllowanceLoading,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
    gasPrice: approvalGas,
  } = useApprovalButton({
    token: tokens.mainnet.OGV,
    amount: total,
    spender: contracts.mainnet.OGVMigrator.address,
    enableAllowance: true,
    enableGas: true,
  });

  const {
    params: writeParams,
    callbacks: writeCallbacks,
    gasPrice: writeGas,
    isWriteGasLoading,
  } = useTxButton({
    params: {
      contract: contracts.mainnet.OGVMigrator,
      functionName: 'migrate',
      args: [
        veOgvlockups?.map((l) => BigInt(l.lockupId)) ?? [],
        ogvBalance,
        0n,
        ogvRewards > 0n,
        stakedConverted[0],
        stakingRatio > 0 ? getMonthDurationToSeconds(duration) : 0n,
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
        onClose?.({}, 'backdropClick');
      },
    },
    activity: {
      type: 'migrate',
      status: 'idle',
      amountIn: total,
      tokenIdIn: tokens.mainnet.OGV.id,
      liquid: liquidConverted[0],
      tokenIdLiquid: tokens.mainnet.OGN.id,
      staked: stakedConverted[0],
      tokenIdStaked: tokens.mainnet.xOGN.id,
    },
    enableGas: true,
  });

  const handleRatioChange = (_: Event, newValue: number | number[]) => {
    setSatkingRatio(Number(newValue));
  };

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    const dur = Number(newValue);
    if (dur >= 1) {
      setDuration(dur);
    }
  };

  const lockupEnd = addMonths(new Date(), duration);
  const gas = (approvalGas?.gasCostUsd ?? 0) + (writeGas?.gasCostUsd ?? 0);
  const isApprovalNeeded =
    !isAllowanceLoading &&
    !isNilOrEmpty(allowance) &&
    (allowance ?? 0n) < total;
  const isConvertDisabled = isNilOrEmpty(allowance) || isApprovalNeeded;

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Convert' })}
        <IconButton
          onClick={(evt) => {
            onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography fontWeight="medium">
          {intl.formatMessage({
            defaultMessage: 'Your OGV/veOGV is equivalent to',
          })}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            p: 3,
            mt: 1.5,
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{format(converted, 4)}</Typography>
          <TokenChip
            token={tokens.mainnet.OGN}
            iconProps={{ outlined: true, sx: { fontSize: 28 } }}
            labelProps={{ variant: 'body2', fontWeight: 'bold' }}
          />
        </Stack>
        <Accordion
          expanded={ratioOpen}
          onChange={() => {
            setRatioOpen(not);
          }}
          sx={{ border: 'none' }}
          slotProps={{
            transition: { unmountOnExit: true, mountOnEnter: true },
          }}
        >
          <AccordionSummary>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width={1}
            >
              <InfoTooltipLabel
                fontWeight="medium"
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    'Choose the proportion of converted OGN you want to stake into a xOGN lockup.',
                })}
              >
                {intl.formatMessage({ defaultMessage: 'Staking Ratio' })}
              </InfoTooltipLabel>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 25,
                  px: 1,
                  py: 0.5,
                  '&:hover': {
                    backgroundColor: 'background.faded',
                  },
                }}
              >
                <Collapse orientation="horizontal" in={!ratioOpen}>
                  <Typography mr={0.75}>
                    {intl.formatNumber(stakingRatio / 100, {
                      style: 'percent',
                    })}
                  </Typography>
                </Collapse>
                <ExpandIcon isExpanded={ratioOpen} />
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 0 }}>
            <Stack {...cardStackProps} useFlexGap p={0} spacing={0}>
              <Stack p={3} spacing={1}>
                <Typography
                  variant="featured3"
                  fontWeight="bold"
                  color="primary.main"
                >
                  {intl.formatNumber(stakingRatio / 100, { style: 'percent' })}
                </Typography>
                <Slider
                  value={stakingRatio}
                  onChange={handleRatioChange}
                  min={0}
                  max={100}
                  step={1}
                />
              </Stack>
              <Collapse in={stakingRatio < RATIO_WARNING_THRESHOLD}>
                <Alert
                  variant="filled"
                  severity="warning"
                  sx={{
                    mx: 3,
                    mb: 3,
                    backgroundColor: 'warning.faded',
                    boxShadow: 0,
                  }}
                >
                  <AlertTitle>
                    {intl.formatMessage({
                      defaultMessage:
                        'Decreasing staking ratio decreases APY and the amount of xOGN you will receive.',
                    })}
                  </AlertTitle>
                </Alert>
              </Collapse>
              <Divider />
              <Stack direction="row">
                <ValueLabel
                  spacing={0}
                  label={tokens.mainnet.OGN.symbol}
                  labelProps={{
                    variant: 'caption1',
                    fontWeight: 'medium',
                    px: 3,
                    py: 1,
                  }}
                  divider={<Divider orientation="horizontal" flexItem />}
                  value={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      px={3}
                      py={1.5}
                      width={1}
                    >
                      <TokenIcon
                        token={tokens.mainnet.OGN}
                        sx={{ fontSize: 24 }}
                      />
                      <Typography variant="body1" fontWeight="medium">
                        {format(liquidConverted, 4)}
                      </Typography>
                    </Stack>
                  }
                  sx={{ width: 1, alignItems: 'flex-start' }}
                />
                <Divider orientation="vertical" flexItem />
                <ValueLabel
                  spacing={0}
                  label={tokens.mainnet.xOGN.symbol}
                  labelProps={{
                    px: 3,
                    py: 1,
                    variant: 'caption1',
                    fontWeight: 'medium',
                  }}
                  divider={<Divider orientation="horizontal" flexItem />}
                  value={
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      px={3}
                      py={1.5}
                      width={1}
                    >
                      <TokenIcon
                        token={tokens.mainnet.xOGN}
                        sx={{ fontSize: 24 }}
                        outlined
                      />
                      <LoadingLabel
                        variant="body1"
                        fontWeight="medium"
                        isLoading={isXOgnStakingLoading}
                        sWidth={80}
                      >
                        {intl.formatNumber(xOgnStaking?.xOgnPreview ?? 0)}
                      </LoadingLabel>
                    </Stack>
                  }
                  sx={{ width: 1, alignItems: 'flex-start' }}
                />
              </Stack>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Collapse in={stakedConverted[0] > 0n}>
          <InfoTooltipLabel
            fontWeight="medium"
            mt={3}
            mb={1.5}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The length of time you will lock up your OGN in order to receive yield and voting power. Unstaking early carries a penalty relative to the remaining duration of the lockup',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Lockup Duration' })}
          </InfoTooltipLabel>
          <Stack {...cardStackProps} useFlexGap mb={3}>
            <Stack direction="row" alignItems="center">
              <Typography
                variant="featured3"
                fontWeight="bold"
                color="primary.main"
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
              <Stack spacing={0.5} flexGrow={1}>
                <Stack direction="row" justifyContent="flex-end">
                  <Typography variant="mono" color="text.secondary">
                    {intl.formatMessage({
                      defaultMessage: 'Lockup Ends:',
                    })}
                  </Typography>
                  <Typography textAlign="end" minWidth={92}>
                    {intl.formatDate(lockupEnd, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Box mx={1}>
              <Slider
                value={duration}
                onChange={handleDurationChange}
                min={0}
                max={12}
                step={1}
                marks={[
                  {
                    value: 0,
                    label: intl.formatMessage({ defaultMessage: '0' }),
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
            <Collapse in={duration < DURATION_WARNING_THRESHOLD}>
              <Alert
                variant="filled"
                severity="warning"
                sx={{
                  backgroundColor: 'warning.faded',
                  boxShadow: 0,
                  mt: 1,
                }}
              >
                <AlertTitle>
                  {intl.formatMessage({
                    defaultMessage:
                      'Decreasing lock-up duration decreases APY and the amount of xOGN you will receive.',
                  })}
                </AlertTitle>
              </Alert>
            </Collapse>
          </Stack>
          <Typography fontWeight="medium">
            {intl.formatMessage({ defaultMessage: 'xOGN Received' })}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              p: 3,
              my: 1.5,
              mb: 3,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <LoadingLabel
              variant="h6"
              isLoading={isXOgnStakingLoading}
              sWidth={100}
            >
              {intl.formatNumber(xOgnStaking?.xOgnPreview ?? 0)}
            </LoadingLabel>
            <TokenChip
              token={tokens.mainnet.xOGN}
              iconProps={{ outlined: true, sx: { fontSize: 28 } }}
              labelProps={{ variant: 'body2', fontWeight: 'bold' }}
            />
          </Stack>
          <InfoTooltipLabel
            fontWeight="medium"
            mb={1.5}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The variable APY currently being earned on staked OGN.',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Current Staking vAPY' })}
          </InfoTooltipLabel>
          <Stack {...cardStackProps} bgcolor="transparent">
            <LoadingLabel
              variant="featured3"
              fontWeight="bold"
              color="primary.main"
              isLoading={isXOgnStakingLoading}
            >
              {intl.formatNumber(xOgnStaking?.xOgnApyPercentage ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Collapse>
        <ValueLabel
          {...cardStackProps}
          direction="row"
          justifyContent="space-between"
          bgcolor="transparent"
          label={intl.formatMessage({ defaultMessage: 'Est. gas:' })}
          value={formatCurrency(gas, undefined, undefined, {
            maximumFractionDigits: 2,
            roundingMode: 'ceil',
          })}
          isLoading={isWriteGasLoading}
          mt={3}
        />
      </DialogContent>
      <DialogActions>
        <Collapse in={isApprovalNeeded}>
          <TxButton
            params={approvalParams}
            callbacks={approvalCallbacks}
            label={approvalLabel}
            variant="action"
            fullWidth
            sx={{ mb: 1.5 }}
          />
        </Collapse>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          variant="action"
          fullWidth
          label={intl.formatMessage({ defaultMessage: 'Convert' })}
          disabled={isConvertDisabled}
          validatingTxLabel={intl.formatMessage({
            defaultMessage: 'Validating',
          })}
        />
      </DialogActions>
    </Dialog>
  );
};

export type ConvertButtonProps = UserInput & ButtonProps;

export const ConvertButton = ({
  ogvBalance,
  ogvRewards,
  veOgvlockups,
  ...rest
}: ConvertButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        {...rest}
        onClick={(e) => {
          rest?.onClick?.(e);
          setOpen(true);
        }}
      />
      <ConvertModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        ogvBalance={ogvBalance}
        ogvRewards={ogvRewards}
        veOgvlockups={veOgvlockups}
      />
    </>
  );
};

const cardStackProps: StackProps = {
  p: 3,
  spacing: 1,
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 3,
  bgcolor: 'background.default',
};

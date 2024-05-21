import { useState } from 'react';

import {
  Box,
  Button,
  Collapse,
  Dialog,
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
import { useApprovalButton, useTxButton } from '@origin/defi/shared';
import {
  InfoTooltipLabel,
  TokenChip,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import { TxButton, useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { addMonths, formatDuration } from 'date-fns';
import { secondsInMonth } from 'date-fns/constants';
import { useIntl } from 'react-intl';
import { formatUnits, parseUnits } from 'viem';

import { ogvToOgnRate } from '../constants';

import type { ButtonProps, DialogProps, StackProps } from '@mui/material';

import type { Lockup } from '../types';

type UserInput = {
  ogvBalance: bigint;
  ogvRewards: bigint;
  veOgvlockups: Lockup[];
};

export type ConvertModalProps = UserInput & DialogProps;

export const ConvertModal = ({
  ogvBalance,
  ogvRewards,
  veOgvlockups,
  ...rest
}: ConvertModalProps) => {
  const total =
    ogvBalance +
    ogvRewards +
    veOgvlockups.reduce((acc, curr) => acc + BigInt(curr.amount), 0n);
  const converted =
    +formatUnits(total, tokens.mainnet.OGV.decimals) * ogvToOgnRate;

  const intl = useIntl();
  const { formatCurrency } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [stakingRatio, setSatkingRatio] = useState(100);
  const [duration, setDuration] = useState(48);
  const queryClient = useQueryClient();

  const ogn = (converted * (100 - stakingRatio)) / 100;
  const xOgn = (converted * stakingRatio) / 100;

  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
  } = useApprovalButton({
    token: tokens.mainnet.OGV,
    amount: total,
    spender: contracts.mainnet.OGVMigrator.address,
    enableAllowance: true,
  });
  const { params: writeParams, callbacks: writeCallbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.OGVMigrator,
      functionName: 'migrate',
      args: [
        veOgvlockups?.map((l) => BigInt(l.lockupId)) ?? [],
        ogvBalance,
        0n,
        ogvRewards > 0n,
        stakingRatio > 0
          ? parseUnits(xOgn.toString(), tokens.mainnet.xOGN.decimals)
          : 0n,
        stakingRatio > 0 ? BigInt(duration * secondsInMonth) : 0n,
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const handleRatioChange = (_: Event, newValue: number | number[]) => {
    setSatkingRatio(Number(newValue));
  };

  const handleDurationChange = (_: Event, newValue: number | number[]) => {
    setDuration(Number(newValue));
  };

  const lockupEnd = addMonths(new Date(), duration);

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
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pb: 0 }}>
        <Typography variant="body1" fontWeight="medium" mb={3}>
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
            mb: 3,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6">{intl.formatNumber(converted)}</Typography>
          <TokenChip
            token={tokens.mainnet.OGN}
            iconProps={{ outlined: true, sx: { fontSize: 28 } }}
            labelProps={{ variant: 'body2', fontWeight: 'bold' }}
          />
        </Stack>
        <Stack>
          <InfoTooltipLabel
            fontWeight="medium"
            mb={1.5}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'Choose the proportion of converted OGN you want to stake into a xOGN lockup.',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Staking Ratio' })}
          </InfoTooltipLabel>
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
                      {intl.formatNumber(ogn)}
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
                    <Typography variant="body1" fontWeight="medium">
                      {intl.formatNumber(xOgn)}
                    </Typography>
                  </Stack>
                }
                sx={{ width: 1, alignItems: 'flex-start' }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Collapse in={xOgn > 0}>
          <InfoTooltipLabel
            fontWeight="medium"
            mt={3}
            mb={1.5}
            tooltipLabel={intl.formatMessage({
              defaultMessage:
                'The length of time you will lock up your OGN in order to receive yield and voting power. There is no way to unstake before your withdrawal date.',
            })}
          >
            {intl.formatMessage({ defaultMessage: 'Lock-up Duration' })}
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
                      defaultMessage: 'Lock-up Ends:',
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
          <Stack {...cardStackProps} bgcolor="transparent" mb={3}>
            <Typography
              variant="featured3"
              fontWeight="bold"
              color="primary.main"
            >
              ~5.98%
            </Typography>
          </Stack>
          <ValueLabel
            {...cardStackProps}
            direction="row"
            justifyContent="space-between"
            bgcolor="transparent"
            label={intl.formatMessage({ defaultMessage: 'Gas:' })}
            value={formatCurrency(12.76)}
          />
        </Collapse>
      </DialogContent>
      <DialogContent sx={{ overflow: 'hidden' }}>
        <Collapse in={!isNilOrEmpty(allowance) && (allowance ?? 0n) < total}>
          <TxButton
            params={approvalParams}
            callbacks={approvalCallbacks}
            label={approvalLabel}
            variant="action"
            fullWidth
          />
        </Collapse>
        <TxButton
          params={writeParams}
          callbacks={writeCallbacks}
          variant="action"
          fullWidth
          label={intl.formatMessage({ defaultMessage: 'Convert' })}
        />
      </DialogContent>
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

import { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ColorChip, useTxButton } from '@origin/defi/shared';
import {
  LoadingLabel,
  MiddleTruncatedLabel,
  TokenIcon,
  ValueLabel,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaCircleExclamationRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { ConnectedButton, TxButton, useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNowStrict, getUnixTime } from 'date-fns';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import type { ButtonProps, DialogProps } from '@mui/material';

import type { Lockup } from '../types';

export type UnstakeLockupModalProps = { lockup: Lockup } & DialogProps;

export const UnstakeLockupModal = ({
  lockup,
  ...rest
}: UnstakeLockupModalProps) => {
  const intl = useIntl();
  const { formatAmount, formatCurrency } = useFormat();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const { data: previewOgn, isLoading: isPreviewOgnLoading } = useReadContract({
    address: tokens.mainnet.xOGN.address,
    abi: tokens.mainnet.xOGN.abi,
    functionName: 'previewWithdraw',
    args: [BigInt(lockup.xogn), BigInt(getUnixTime(lockup.end))],
  });
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'unstake',
      args: [BigInt(lockup.lockupId)],
    },
    activity: {
      title: intl.formatMessage({ defaultMessage: 'Unstake' }),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Unstake lockup {stake}',
        },
        {
          stake: (
            <MiddleTruncatedLabel maxWidth={60}>
              {lockup.lockupId}
            </MiddleTruncatedLabel>
          ),
        },
      ),
      endIcon: <TokenIcon token={tokens.mainnet.xOGN} />,
    },
    callbacks: {
      onWriteSuccess: () => {
        rest?.onClose?.({}, 'backdropClick');
        queryClient.invalidateQueries();
      },
    },
    enableGas: true,
  });

  const ognLockup = BigInt(lockup.amount);
  const penalty = ognLockup - (previewOgn ?? ognLockup);
  const penaltyPercent =
    +formatUnits(penalty, tokens.mainnet.OGN.decimals) /
    +formatUnits(ognLockup, tokens.mainnet.OGN.decimals);

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Unlock Stake' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, pb: 0 }}
      >
        {penalty > 0 && (
          <ColorChip
            color="text.primary"
            bgcolor="warning.faded"
            p={2}
            spacing={1}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 24, color: 'warning.dark' }}
            />
            <Typography fontWeight="medium">
              {intl.formatMessage(
                {
                  defaultMessage: 'Penalty for early unlock: {penalty} OGN',
                },
                { penalty: formatAmount(penalty, tokens.mainnet.OGN.decimals) },
              )}
            </Typography>
          </ColorChip>
        )}
        <Stack
          sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
        >
          <Stack direction="row" justifyContent="space-between" px={3} py={2}>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'OGN' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Time remaining' })}
            </Typography>
            <Typography variant="caption1" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'Penalty' })}
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
            <LoadingLabel isLoading={isPreviewOgnLoading}>
              {intl.formatNumber(penaltyPercent, {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </LoadingLabel>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            p: 3,
          }}
        >
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({
              defaultMessage: 'Amount after penalty',
            })}
            labelProps={{ variant: 'mono' }}
            value={
              <Stack direction="row" alignItems="center" spacing={1}>
                <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 20 }} />
                <Typography>{formatAmount(previewOgn)}</Typography>
              </Stack>
            }
            isLoading={isPreviewOgnLoading}
          />
          <ValueLabel
            direction="row"
            justifyContent="space-between"
            label={intl.formatMessage({ defaultMessage: 'Gas' })}
            labelProps={{ variant: 'mono' }}
            value={intl.formatMessage(
              { defaultMessage: '~{gas}' },
              { gas: formatCurrency(gasPrice?.gasCostUsd) },
            )}
            isLoading={isNilOrEmpty(gasPrice)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <TxButton
          params={params}
          callbacks={callbacks}
          variant="action"
          label={intl.formatMessage({ defaultMessage: 'Unlock' })}
        />
      </DialogActions>
    </Dialog>
  );
};

export type UnstakeLockupButtonProps = {
  lockup: Lockup;
} & ButtonProps;

export const UnstakeLockupButton = ({
  lockup,
  ...rest
}: UnstakeLockupButtonProps) => {
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
      <UnstakeLockupModal
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

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
import { LoadingLabel, TokenIcon, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaCircleExclamationRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { ConnectedButton, TxButton } from '@origin/shared/providers';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { getUnixTime } from 'date-fns';
import { format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { formatUnits } from 'viem';
import { useReadContract } from 'wagmi';

import { useStartLockupPolling } from '../hooks';
import { formatTimeRemaining } from '../utils';

import type { DialogProps } from '@mui/material';
import type { ConnectedButtonProps } from '@origin/shared/providers';
import type { Dnum } from 'dnum';

import type { Lockup } from '../types';

export type UnstakeLockupModalProps = { lockup: Lockup } & DialogProps;

export const UnstakeLockupModal = ({
  lockup,
  ...rest
}: UnstakeLockupModalProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const startPolling = useStartLockupPolling();
  const { data: previewOgn, isLoading: isPreviewOgnLoading } = useReadContract({
    address: tokens.mainnet.xOGN.address,
    abi: tokens.mainnet.xOGN.abi,
    functionName: 'previewWithdraw',
    chainId: tokens.mainnet.xOGN.chainId,
    args: [BigInt(lockup.amount), BigInt(getUnixTime(lockup.end))],
  });
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'unstake',
      args: [BigInt(lockup.lockupId)],
    },
    activity: {
      type: 'unstake',
      status: 'idle',
      tokenIdIn: tokens.mainnet.xOGN.id,
      tokenIdOut: tokens.mainnet.OGN.id,
      lockupId: lockup.lockupId,
    },
    callbacks: {
      onWriteSuccess: () => {
        startPolling(lockup.lockupId);
        rest?.onClose?.({}, 'backdropClick');
      },
    },
    enableGas: true,
  });

  const preview = [previewOgn ?? 0n, tokens.mainnet.OGN.decimals] as Dnum;
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
            spacing={1}
            sx={{
              color: 'text.primary',
              backgroundColor: 'warning.faded',
              p: 2,
            }}
          >
            <FaCircleExclamationRegular
              sx={{ fontSize: 24, color: 'warning.dark' }}
            />
            <Typography
              sx={{
                fontWeight: 'medium',
              }}
            >
              {intl.formatMessage(
                {
                  defaultMessage: 'Penalty for early unlock: {penalty} OGN',
                },
                {
                  penalty: format(
                    [penalty ?? 0n, tokens.mainnet.OGN.decimals],
                    getFormatPrecision([
                      penalty ?? 0n,
                      tokens.mainnet.OGN.decimals,
                    ]),
                  ),
                },
              )}
            </Typography>
          </ColorChip>
        )}
        <Stack
          sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
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
              {intl.formatMessage({ defaultMessage: 'Penalty' })}
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
                  BigInt(lockup.amount ?? 0),
                  tokens.mainnet.OGN.decimals,
                ),
                {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                },
              )}
            </Typography>
            <Typography>{formatTimeRemaining(lockup.end)}</Typography>
            <LoadingLabel isLoading={isPreviewOgnLoading}>
              {intl.formatNumber(penaltyPercent ?? 0, {
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
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({
              defaultMessage: 'Amount after penalty',
            })}
            labelProps={{ variant: 'mono' }}
            value={
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                }}
              >
                <TokenIcon token={tokens.mainnet.OGN} sx={{ fontSize: 20 }} />
                <Typography>
                  {format(preview, getFormatPrecision(preview))}
                </Typography>
              </Stack>
            }
            isLoading={isPreviewOgnLoading}
          />
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'Gas' })}
            labelProps={{ variant: 'mono' }}
            value={intl.formatMessage(
              { defaultMessage: '~{gas}' },
              { gas: format(gasPrice?.gasCostUsd ?? from(0), 2) },
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
} & ConnectedButtonProps;

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

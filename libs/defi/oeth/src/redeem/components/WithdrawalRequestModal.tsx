import { useEffect } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  FaCheckRegular,
  FaExclamationRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { BlockExplorerLink, useRefresher } from '@origin/shared/providers';
import { getFormatPrecision, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useViewSelect } from '../hooks';
import { useWithdrawalRequestsQuery } from '../queries.generated';

import type { DialogProps } from '@mui/material';
import type { Token } from '@origin/shared/contracts';
import type { Dnum } from 'dnum';
import type { TransactionReceipt } from 'viem';

import type { WithdrawalRequestsQuery } from '../queries.generated';

export type WithdrawalRequestModalProps = {
  amountOut?: bigint;
  tokenIn?: Token;
  tokenOut?: Token;
  txReceipt?: TransactionReceipt;
} & DialogProps;

export const WithdrawalRequestModal = ({
  amountOut,
  tokenIn,
  tokenOut,
  txReceipt,
  open,
  onClose,
  ...rest
}: WithdrawalRequestModalProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { update } = useViewSelect();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { status, startRefresh } = useRefresher<WithdrawalRequestsQuery>({
    queryKey: useWithdrawalRequestsQuery.getKey({
      address: address ?? ZERO_ADDRESS,
    }),
    queryFn: useWithdrawalRequestsQuery.fetcher({
      address: address ?? ZERO_ADDRESS,
    }),
    isResultProcessed: (prev, next) =>
      prev.oethWithdrawalRequests.length < next.oethWithdrawalRequests.length,
  });

  useEffect(() => {
    if (open) {
      startRefresh();
    }
  }, [open, startRefresh]);

  const handleClaimClick = () => {
    update('claim');
    onClose?.({}, 'backdropClick');
  };

  const amt = [amountOut ?? 0n, tokenOut?.decimals ?? 18] as Dnum;
  const icon = {
    idle: null,
    error: null,
    polling: (
      <Box sx={{ position: 'relative', width: 85, height: 85 }}>
        <CircularProgress
          variant="determinate"
          sx={{
            position: 'absolute',
            color: (theme) => alpha(theme.palette.primary.main, 0.3),
          }}
          size={85}
          thickness={4.4}
          value={100}
        />
        <CircularProgress
          color="primary"
          size={85}
          thickness={4}
          sx={{ position: 'absolute', animationDuration: '3s' }}
        />
      </Box>
    ),
    processed: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'success.main',
          p: 3,
          backgroundColor: 'success.faded',
          mb: 3,
        }}
      >
        <FaCheckRegular sx={{ fontSize: 36, color: 'success.main' }} />
      </Box>
    ),
    timeout: (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          border: '1px solid',
          borderColor: 'warning.dark',
          p: 3,
          backgroundColor: 'warning.faded',
          mb: 3,
        }}
      >
        <FaExclamationRegular sx={{ fontSize: 36, color: 'warning.dark' }} />
      </Box>
    ),
  }[status];
  const label = {
    idle: null,
    error: null,
    processed: {
      title: intl.formatMessage({
        defaultMessage: 'Withdrawal request successfully sent',
      }),
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            'Your request to withdraw {amountOut} {symbolOut} from {symbolIn} has been sent. Check the Claim tab to view your withdrawal requests.',
        },
        {
          amountOut: format(amt, {
            digits: getFormatPrecision(amt),
            decimalsRounding: 'ROUND_DOWN',
          }),
          symbolIn: tokenIn?.symbol ?? '',
          symbolOut: tokenOut?.symbol ?? '',
        },
      ),
    },
    timeout: {
      title: intl.formatMessage({
        defaultMessage: 'Withdrawal request is taking a long time to process',
      }),
      subtitle: intl.formatMessage({
        defaultMessage:
          'Try to refresh the page and go to the Claim tab to see your withdrawal request',
      }),
    },
    polling: {
      title: intl.formatMessage({
        defaultMessage: 'Your withdrawal is being processed',
      }),
      subtitle: intl.formatMessage({
        defaultMessage: 'This operation can take a few seconds to complete',
      }),
    },
  }[status];
  const button = {
    idle: null,
    error: null,
    timeout: (
      <Button
        fullWidth
        onClick={() => {
          onClose?.({}, 'backdropClick');
          window.location.reload();
        }}
        size="large"
        disabled={status === 'polling'}
      >
        {intl.formatMessage({
          defaultMessage: 'Refresh the page',
        })}
      </Button>
    ),
    processed: (
      <Button
        fullWidth
        onClick={() => {
          update('claim');
          queryClient.invalidateQueries({
            queryKey: ['useClaimableRequests', address],
          });
          onClose?.({}, 'backdropClick');
        }}
        size="large"
      >
        {intl.formatMessage({
          defaultMessage: 'View withdrawal requests',
        })}
      </Button>
    ),
    polling: (
      <Button fullWidth onClick={handleClaimClick} size="large" disabled>
        {intl.formatMessage({
          defaultMessage: 'Processing withdrawal request',
        })}
      </Button>
    ),
  }[status];

  return (
    <Dialog
      {...rest}
      open={open}
      maxWidth="xs"
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle display="flex" justifyContent="flex-end" alignItems="center">
        <IconButton
          onClick={(evt) => {
            onClose?.(evt, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: ['useClaimableRequests', address],
            });
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack alignItems="center" pt={2}>
          <Box mb={3}>{icon}</Box>
          <Typography
            variant="featured2"
            fontWeight="bold"
            textAlign="center"
            mb={2}
          >
            {label?.title}
          </Typography>
          <Typography
            variant="mono"
            textAlign="center"
            mb={3}
            color="text.secondary"
          >
            {label?.subtitle}
          </Typography>
          {button}
          {txReceipt && (
            <BlockExplorerLink hash={txReceipt?.transactionHash} mt={3} />
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

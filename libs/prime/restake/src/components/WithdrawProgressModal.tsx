import { useEffect, useState } from 'react';

import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';
import {
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
} from '@origin/shared/icons';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntervalEffect, usePrevious } from '@react-hookz/web';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useUserActiveRequestsQuery } from '../queries.generated';

import type { DialogProps } from '@mui/material';

const INTERVAL = 2000; // ms
const MAX_RETRY = 10; // 10 * 2s = 20s

type Status = 'processing' | 'processed' | 'timeout';

export const WithdrawProgressModal = ({ onClose, ...rest }: DialogProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const [retries, setRetries] = useState(0);
  const [status, setStatus] = useState<Status>('processing');
  const queryClient = useQueryClient();
  const { data: claimAmount } = useUserActiveRequestsQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      refetchInterval: status === 'processing' ? INTERVAL : undefined,
      select: (data) => data?.lrtWithdrawalRequests?.length ?? 0,
    },
  );
  const prevClaimAmount = usePrevious(claimAmount);

  useIntervalEffect(() => {
    setRetries((prev) => prev + 1);
    if (retries > MAX_RETRY) {
      setStatus('timeout');
    }
  }, INTERVAL);

  useEffect(() => {
    if (claimAmount !== undefined && claimAmount > (prevClaimAmount ?? 0)) {
      setStatus('processed');
      queryClient.invalidateQueries({
        queryKey: [
          useUserActiveRequestsQuery.getKey({
            address: address ?? ZERO_ADDRESS,
          }),
        ],
      });
    }
  }, [address, claimAmount, prevClaimAmount, queryClient]);

  const icon = {
    processing: (
      <Box sx={{ position: 'relative', width: 40, height: 40 }}>
        <CircularProgress
          variant="determinate"
          sx={{
            position: 'absolute',
            color: (theme) => alpha(theme.palette.primary.main, 0.3),
          }}
          size={40}
          thickness={4.4}
          value={100}
        />
        <CircularProgress
          color="primary"
          size={40}
          thickness={4}
          sx={{ position: 'absolute', animationDuration: '3s' }}
        />
      </Box>
    ),
    processed: (
      <FaCircleCheckRegular sx={{ fontSize: 40, color: 'success.main' }} />
    ),
    timeout: (
      <FaCircleXmarkRegular sx={{ fontSize: 40, color: 'primary.main' }} />
    ),
  }[status];
  const label = {
    processed: intl.formatMessage({
      defaultMessage: 'Withdraw processed, check your claim',
    }),
    timeout: intl.formatMessage({
      defaultMessage: 'Error while processing, try to refresh the page',
    }),
    processing: intl.formatMessage({
      defaultMessage: 'Your withdraw is being processed',
    }),
  }[status];
  const button = {
    processed: (
      <Button
        component={RouterLink}
        to="/restake/claim"
        onClick={() => {
          onClose?.({}, 'backdropClick');
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Go to claims' })}
      </Button>
    ),
    timeout: (
      <Button
        onClick={() => {
          onClose?.({}, 'backdropClick');
          window.location.reload();
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Refresh' })}
      </Button>
    ),
    processing: null,
  }[status];

  return (
    <Dialog {...rest} maxWidth="xs" fullWidth>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          py: 4,
        }}
      >
        {icon}
        <Typography>{label}</Typography>
        {button}
      </DialogContent>
    </Dialog>
  );
};

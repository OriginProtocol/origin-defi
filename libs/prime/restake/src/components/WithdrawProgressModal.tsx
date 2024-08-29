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
} from '@mui/material';
import {
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { useRefresher } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useUserActiveRequestsQuery } from '../queries.generated';

import type { DialogProps } from '@mui/material';

import type { UserActiveRequestsQuery } from '../queries.generated';

export const WithdrawProgressModal = ({ onClose, ...rest }: DialogProps) => {
  const intl = useIntl();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { data } = useUserActiveRequestsQuery({
    address: address ?? ZERO_ADDRESS,
  });
  const { status, startRefresh } = useRefresher<UserActiveRequestsQuery>({
    queryKey: useUserActiveRequestsQuery.getKey({
      address: address ?? ZERO_ADDRESS,
    }),
    queryFn: useUserActiveRequestsQuery.fetcher({
      address: address ?? ZERO_ADDRESS,
    }),
    isResultProcessed: (prev, next) =>
      prev?.lrtWithdrawalRequests?.length < next?.lrtWithdrawalRequests?.length,
  });

  console.log(status);

  useEffect(() => {
    if (rest.open) {
      startRefresh(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const icon = {
    idle: null,
    error: null,
    polling: (
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
    idle: null,
    error: null,
    processed: intl.formatMessage({
      defaultMessage: 'Withdrawal processed, check your claim',
    }),
    timeout: intl.formatMessage({
      defaultMessage: 'Error while processing, try to refresh the page',
    }),
    polling: intl.formatMessage({
      defaultMessage: 'Your withdrawal is being processed',
    }),
  }[status];
  const button = {
    idle: null,
    error: null,
    polling: null,
    processed: (
      <Button
        component={RouterLink}
        to="/restake/claim"
        onClick={() => {
          onClose?.({}, 'backdropClick');
          queryClient.invalidateQueries();
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
  }[status];

  return (
    <Dialog {...rest} maxWidth="xs" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Process withdrawal request' })}
        <IconButton
          onClick={(evt) => {
            onClose?.(evt, 'backdropClick');
            queryClient.invalidateQueries();
          }}
        >
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          sx={{
            alignItems: 'center',
            pt: 2,
          }}
        >
          <Box
            sx={{
              mb: 3,
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 2,
            }}
          >
            {label}
          </Typography>
          {button}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

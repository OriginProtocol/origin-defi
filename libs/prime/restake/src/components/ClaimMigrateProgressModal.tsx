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
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { ExternalLink } from '@origin/shared/components';
import {
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
  FaXmarkRegular,
} from '@origin/shared/icons';
import { useRefresher } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserWithdrawalsQuery } from '../queries.generated';

import type { DialogProps } from '@mui/material';

import type { UserWithdrawalsQuery } from '../queries.generated';
import type { WithdrawalType } from '../types';

export type ClaimMigrateProgressModalProps = {
  type: WithdrawalType;
} & DialogProps;

export const ClaimMigrateProgressModal = ({
  open,
  onClose,
  type,
  ...rest
}: ClaimMigrateProgressModalProps) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { status, startRefresh } = useRefresher<UserWithdrawalsQuery>({
    queryKey: useUserWithdrawalsQuery.getKey({
      address: address ?? ZERO_ADDRESS,
    }),
    queryFn: useUserWithdrawalsQuery.fetcher({
      address: address ?? ZERO_ADDRESS,
    }),
    isResultProcessed: (prev, next) =>
      prev.lrtWithdrawalRequests.filter(
        (q) => q.status === LrtWithdrawalStatus.Requested,
      ).length <
      next.lrtWithdrawalRequests.filter(
        (q) => q.status === LrtWithdrawalStatus.Requested,
      ).length,
  });

  useEffect(() => {
    if (open) {
      startRefresh();
    }
  }, [open, startRefresh]);

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
    processed: {
      title: intl.formatMessage(
        {
          defaultMessage: 'Withdrawal request successfully {type}.',
        },
        {
          type:
            type === 'claim'
              ? intl.formatMessage({ defaultMessage: 'claimed' })
              : intl.formatMessage({ defaultMessage: 'migrated' }),
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
      title: intl.formatMessage(
        {
          defaultMessage: 'Your {type} is being processed',
        },
        {
          type:
            type === 'claim'
              ? intl.formatMessage({ defaultMessage: 'claim' })
              : intl.formatMessage({ defaultMessage: 'migration' }),
        },
      ),
      subtitle: intl.formatMessage({
        defaultMessage: 'This operation can take a few seconds to complete',
      }),
    },
  }[status];
  const title =
    type === 'claim'
      ? intl.formatMessage({ defaultMessage: 'Process Withdrawal' })
      : intl.formatMessage({ defaultMessage: 'Process Migration' });

  return (
    <Dialog {...rest} open={open} maxWidth="xs" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {title}
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
        <Stack alignItems="center" pt={2}>
          <Box mb={3}>{icon}</Box>
          <Typography fontWeight="bold" textAlign="center" mb={2}>
            {label?.title}
          </Typography>
          {label?.subtitle && (
            <Typography textAlign="center" color="text.secondary" mb={2}>
              {label?.subtitle}
            </Typography>
          )}
          {type === 'migration' ? (
            <ExternalLink
              href="https://app.yieldnest.finance/portfolio"
              color="primary.main"
            >
              {intl.formatMessage({
                defaultMessage:
                  'Visit YieldNest dApp to view your ynLSDe balance.',
              })}
            </ExternalLink>
          ) : (
            <Button
              onClick={(evt) => {
                onClose?.(evt, 'backdropClick');
                queryClient.invalidateQueries();
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Close' })}
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

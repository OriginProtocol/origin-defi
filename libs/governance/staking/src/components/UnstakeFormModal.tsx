import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  LoadingLabel,
  MiddleTruncated,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { differenceInMonths } from 'date-fns';
import { CgClose } from 'react-icons/cg';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useStakingAPY } from '../hooks';
import { useUserLockupsQuery } from '../queries.generated';

import type { ButtonProps, DialogProps } from '@mui/material';

import type { Lockup } from '../types';

export type UnstakeFormModalProps = {
  lockup: Lockup;
} & DialogProps;

export const UnstakeFormModal = ({
  lockup,
  ...rest
}: UnstakeFormModalProps) => {
  const amount = BigInt(lockup.amount);
  const duration = differenceInMonths(
    new Date(lockup.end),
    new Date(lockup.timestamp),
  );

  const intl = useIntl();
  const { formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { data: staking, isLoading: isStakingLoading } = useStakingAPY(
    amount,
    duration,
  );

  return (
    <Dialog {...rest} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Unstake lock-up' })}
        <IconButton
          onClick={(evt) => {
            rest?.onClose?.(evt, 'backdropClick');
          }}
        >
          <CgClose width={12} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack>
          <Stack sx={{ borderRadius: 1, backgroundColor: 'grey.900' }}>
            <Stack
              direction="row"
              px={3}
              pt={2}
              pb={1}
              sx={{ '> *': { width: 1, color: 'text.secondary' } }}
            >
              <Typography>{tokens.mainnet.OGV.symbol}</Typography>
              <Typography textAlign="end">
                {intl.formatMessage({ defaultMessage: 'Current APY' })}
              </Typography>
              <Typography textAlign="end">
                {intl.formatMessage({ defaultMessage: 'Voting Power' })}
              </Typography>
            </Stack>
            <Divider />
            <Stack
              direction="row"
              px={3}
              pt={1}
              pb={2}
              alignItems="baseline"
              sx={{ '> *': { width: 1 } }}
            >
              <Stack direction="row" spacing={1} alignItems="baseline">
                <TokenIcon symbol={tokens.mainnet.OGV.symbol} />
                <Typography variant="h3">
                  {formatAmount(
                    BigInt(lockup.amount),
                    tokens.mainnet.OGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
              </Stack>
              <LoadingLabel
                textAlign="end"
                fontWeight={700}
                isLoading={isStakingLoading}
              >
                {intl.formatNumber((staking?.stakingAPY ?? 0) / 100, {
                  style: 'percent',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </LoadingLabel>
              <Stack
                direction="row"
                spacing={1}
                alignItems="baseline"
                justifyContent="flex-end"
              >
                <TokenIcon
                  symbol={tokens.mainnet.veOGV.symbol}
                  sx={{ transform: 'translateY(4px)' }}
                />
                <Typography fontWeight={700}>
                  {formatAmount(
                    BigInt(lockup.veogv),
                    tokens.mainnet.veOGV.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="unstake"
          args={[lockup.lockupId]}
          variant="action"
          label={intl.formatMessage({ defaultMessage: 'Unstake' })}
          activityTitle={intl.formatMessage({ defaultMessage: 'Unstake' })}
          activitySubtitle={intl.formatMessage(
            {
              defaultMessage: 'Unstake lock-up {stake}',
            },
            {
              stake: (
                <MiddleTruncated maxWidth={60}>
                  {lockup.lockupId}
                </MiddleTruncated>
              ),
              duration,
            },
          )}
          activityEndIcon={
            <TokenIcon
              symbol={tokens.mainnet.veOGV.symbol}
              sx={{ transform: 'translateY(4px)' }}
            />
          }
          onSuccess={() => {
            rest.onClose(null, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: [useUserLockupsQuery.getKey({ address })],
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export type UnstakeButtonProps = {
  lockup: Lockup;
} & ButtonProps;

export const UnstakeButton = ({ lockup, ...rest }: UnstakeButtonProps) => {
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
      <UnstakeFormModal
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

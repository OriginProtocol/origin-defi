import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useGovernanceInfo } from '@origin/governance/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { CgClose } from 'react-icons/cg';
import { useIntl } from 'react-intl';

import type { ButtonProps, DialogProps } from '@mui/material';

export const ClaimRewardsModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();

  return (
    <Dialog {...props} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Collect Rewards' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <CgClose fontSize={14} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack spacing={0.75}>
          <Stack
            sx={{ px: 3, py: 2, borderRadius: 1, backgroundColor: 'grey.900' }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Available to Collect' })}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <LoadingLabel variant="h3" isLoading={isInfoLoading}>
                {formatAmount(
                  info?.veOgvRewards,
                  tokens.mainnet.OGV.decimals,
                  undefined,
                  { notation: 'compact', maximumSignificantDigits: 4 },
                )}
              </LoadingLabel>
              <Stack direction="row" alignItems="baseline">
                <TokenIcon
                  symbol={tokens.mainnet.OGV.symbol}
                  sx={{ width: 30, transform: 'translateY(4px)' }}
                />
                <Typography variant="h3">
                  {tokens.mainnet.OGV.symbol}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="collectRewards"
          args={undefined}
          variant="action"
          label={intl.formatMessage({ defaultMessage: 'Collect Rewards' })}
          activityTitle={intl.formatMessage({
            defaultMessage: 'Collect Rewards',
          })}
          activitySubtitle={intl.formatMessage(
            {
              defaultMessage: 'Collect {rewards} rewards OGV',
            },
            {
              rewards: formatAmount(
                info?.veOgvRewards,
                tokens.mainnet.OGV.decimals,
                undefined,
                { notation: 'compact', maximumSignificantDigits: 4 },
              ),
            },
          )}
          onSuccess={() => {
            props.onClose(null, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: ['useGovernanceInfo'],
            });
          }}
        />
        <Stack
          sx={{ px: 3, py: 2, borderRadius: 1, backgroundColor: 'grey.900' }}
        >
          <Typography>
            {intl.formatMessage(
              {
                defaultMessage:
                  'If you plan to restake your rewards, you can save on transaction fees by selecting the {restake} option.',
              },
              {
                restake: (
                  <Link
                    onClick={() => {
                      props?.onClose?.(null, 'backdropClick');
                    }}
                    sx={{
                      cursor: 'pointer',
                      color: 'secondary.main',
                      ':hover': { textDecoration: 'underline' },
                    }}
                  >
                    {intl.formatMessage({ defaultMessage: 'Extend' })}
                  </Link>
                ),
              },
            )}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export const ClaimRewardsButton = (props: ButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ConnectedButton
        {...props}
        onClick={(e) => {
          setOpen(true);
          props?.onClick?.(e);
        }}
      />
      <ClaimRewardsModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

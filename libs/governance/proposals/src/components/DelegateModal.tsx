import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useGovernanceInfo, useUserInfoQuery } from '@origin/governance/shared';
import { LoadingLabel, TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  ConnectedButton,
  TransactionButton,
  useFormat,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { CgClose } from 'react-icons/cg';
import { useIntl } from 'react-intl';
import { isAddressEqual } from 'viem';
import { useAccount } from 'wagmi';

import type { ButtonProps, DialogProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

export const DelegateModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [delegatee, setDelegatee] = useState('');
  const { data: info, isLoading: isInfoLoading } = useGovernanceInfo();

  const delegateDisabled =
    isNilOrEmpty(delegatee) ||
    !/^0x[a-fA-F0-9]{40}$/.test(delegatee) ||
    isAddressEqual(delegatee as HexAddress, address);

  return (
    <Dialog {...props} maxWidth="sm" fullWidth>
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {intl.formatMessage({ defaultMessage: 'Delegate' })}
        <IconButton
          onClick={(evt) => {
            props?.onClose?.(evt, 'backdropClick');
          }}
        >
          <CgClose fontSize={12} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Stack spacing={0.75}>
          <Stack
            sx={{ px: 3, py: 2, borderRadius: 1, backgroundColor: 'grey.900' }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Voting power' })}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <LoadingLabel variant="h3" isLoading={isInfoLoading}>
                {formatAmount(
                  info?.veOgvBalance,
                  tokens.mainnet.veOGV.decimals,
                  undefined,
                  { notation: 'compact', maximumSignificantDigits: 4 },
                )}
              </LoadingLabel>
              <Stack direction="row" alignItems="baseline">
                <TokenIcon
                  symbol={tokens.mainnet.veOGV.symbol}
                  sx={{ width: 30, transform: 'translateY(4px)' }}
                />
                <Typography variant="h3">
                  {tokens.mainnet.veOGV.symbol}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          sx={{ px: 3, py: 2, borderRadius: 1, backgroundColor: 'grey.900' }}
        >
          <Typography>
            {intl.formatMessage(
              {
                defaultMessage: 'Delegate off-chain votes? Go to the {link}.',
              },
              {
                link: (
                  <Link
                    href="https://snapshot.org/#/delegate"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Snapshot delegate page',
                    })}
                  </Link>
                ),
              },
            )}
          </Typography>
        </Stack>
        <Stack spacing={1.5} pb={1.5}>
          <Typography>
            {intl.formatMessage({
              defaultMessage: 'Delegate on-chain voting power',
            })}
          </Typography>
          <InputBase
            value={delegatee}
            onChange={(evt) => {
              setDelegatee(evt.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Enter address',
            })}
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          />
        </Stack>
        <TransactionButton
          contract={tokens.mainnet.veOGV}
          functionName="delegate"
          args={[delegatee]}
          disabled={delegateDisabled}
          variant="action"
          label={intl.formatMessage({ defaultMessage: 'Delegate' })}
          activityTitle={intl.formatMessage({
            defaultMessage: 'Delegate',
          })}
          activitySubtitle={intl.formatMessage(
            {
              defaultMessage: 'Delegate {votingPower} veOGV to {delegatee}',
            },
            {
              votingPower: formatAmount(
                info?.veOgvRewards,
                tokens.mainnet.OGV.decimals,
                undefined,
                { notation: 'compact', maximumSignificantDigits: 4 },
              ),
              delegatee,
            },
          )}
          onSuccess={() => {
            props.onClose(null, 'backdropClick');
            queryClient.invalidateQueries({
              queryKey: ['useGovernanceInfo'],
            });
            queryClient.invalidateQueries({
              queryKey: [useUserInfoQuery.getKey({ address })],
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export const DelegateButton = (props: ButtonProps) => {
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
      <DelegateModal
        key={open ? 'open' : 'closed'}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

import { useState } from 'react';

import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  SectionCard,
  TokenChip,
  useOgnInfo,
  useTxButton,
} from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { FaXmarkRegular } from '@origin/shared/icons';
import { ConnectedButton, TxButton, useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { isAddressEqual } from 'viem';
import { useAccount } from 'wagmi';

import { useUserVotingPowerQuery } from '../queries.generated';

import type { ButtonProps, DialogProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';
import type { ChangeEvent } from 'react';

export const DelegateModal = (props: DialogProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [delegatee, setDelegatee] = useState<HexAddress | null>(null);
  const { data: info } = useOgnInfo();
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'delegate',
      args: [delegatee ?? ZERO_ADDRESS],
    },
    activity: {
      type: 'delegate',
      status: 'idle',
      tokenIdIn: tokens.mainnet.xOGN.id,
      delegateTo: delegatee ?? ZERO_ADDRESS,
      votingPower: (info?.xOgnBalance ?? 0n) + (info?.xOgnRewards ?? 0n),
    },
    callbacks: {
      onWriteSuccess: () => {
        props?.onClose?.({}, 'backdropClick');
        queryClient.invalidateQueries({
          queryKey: ['useGovernanceInfo'],
        });
        queryClient.invalidateQueries({
          queryKey: [
            useUserVotingPowerQuery.getKey({ address: address ?? '' }),
          ],
        });
      },
    },
  });

  const delegateDisabled =
    !delegatee ||
    !/^0x[a-fA-F0-9]{40}$/.test(delegatee) ||
    !address ||
    isAddressEqual(delegatee, address);

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
          <FaXmarkRegular sx={{ fontSize: 14 }} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pb: 0 }}>
        <Stack spacing={3}>
          <SectionCard
            title={intl.formatMessage({ defaultMessage: 'Voting power' })}
          >
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="featured3" fontWeight="bold">
                  {formatAmount(
                    BigInt(info?.xOgnBalance ?? '0'),
                    tokens.mainnet.xOGN.decimals,
                    undefined,
                    { notation: 'compact', maximumSignificantDigits: 4 },
                  )}
                </Typography>
                <TokenChip
                  token={tokens.mainnet.xOGN}
                  iconProps={{ sx: { fontSize: 24 } }}
                  labelProps={{ variant: 'featured3', fontWeight: 'medium' }}
                />
              </Stack>
            </CardContent>
          </SectionCard>
          <Card sx={{ backgroundColor: 'primary.faded' }}>
            <CardContent>
              <Typography>
                {intl.formatMessage(
                  {
                    defaultMessage:
                      'Delegate off-chain votes? Go to the {link}.',
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
            </CardContent>
          </Card>
          <SectionCard
            title={intl.formatMessage({
              defaultMessage: 'Delegate on-chain voting power to:',
            })}
          >
            <CardContent>
              <InputBase
                value={delegatee}
                onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                  setDelegatee(evt.target.value as HexAddress);
                }}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Enter address',
                })}
                sx={{
                  height: 1,
                  width: 1,
                }}
              />
            </CardContent>
          </SectionCard>
        </Stack>
      </DialogContent>
      <DialogActions>
        <TxButton
          fullWidth
          variant="action"
          params={params}
          callbacks={callbacks}
          disabled={delegateDisabled}
          label={intl.formatMessage({ defaultMessage: 'Delegate' })}
        />
      </DialogActions>
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

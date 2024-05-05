import { CircularProgress, Stack, Typography } from '@mui/material';
import { ExternalLink, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  AddressLabel,
  TxButton,
  useFormat,
  UserAvatar,
  useTxButton,
} from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { take } from 'ramda';
import { useIntl } from 'react-intl';
import { isAddressEqual } from 'viem';
import { useAccount } from 'wagmi';

import { useUserDelegatorsQuery, useUserInfoQuery } from '../queries.generated';
import { DelegateButton } from './DelegateModal';

import type { StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';
import type { HexAddress } from '@origin/shared/utils';

export const DelegationPanel = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );
  const { data: delegators, isLoading: isDelegatorsLoading } =
    useUserDelegatorsQuery(
      { address: address ?? ZERO_ADDRESS },
      { enabled: !!address },
    );
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'delegate',
      args: [address ?? ZERO_ADDRESS],
    },
    activity: {
      title: intl.formatMessage({
        defaultMessage: 'Delegate',
      }),
      subtitle: intl.formatMessage(
        {
          defaultMessage: 'Delegate {balance} xOGN to self',
        },
        {
          balance: formatAmount(
            BigInt(userInfo?.veogvBalance ?? 0),
            tokens.mainnet.OGN.decimals,
            undefined,
            { notation: 'compact', maximumSignificantDigits: 4 },
          ),
        },
      ),
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  if (isUserInfoLoading) {
    return (
      <Stack
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '5rem',
          width: 1,
        }}
      >
        <CircularProgress size={20} />
      </Stack>
    );
  }

  const visibleDelegators = address
    ? take(
        5,
        delegators?.ogvAddresses?.filter(
          (d) => !isAddressEqual(d.id as HexAddress, address),
        ) ?? [],
      )
    : [];
  const isSelfDelegating =
    userInfo?.delegatee?.id?.toLowerCase() === address?.toLowerCase();
  const delegatee = userInfo?.delegatee?.id as HexAddress;
  const noVotingPower = BigInt(userInfo?.veogvBalance ?? 0) === 0n;

  if (noVotingPower) {
    return (
      <Typography color="text.secondary">
        {intl.formatMessage({ defaultMessage: 'No voting power' })}
      </Typography>
    );
  }

  return (
    <Stack {...props}>
      {!isSelfDelegating && (
        <ValueLabel
          {...valueLabelProps}
          label={intl.formatMessage({ defaultMessage: 'Delegating to' })}
          value={
            <Stack direction="row" alignItems="center" spacing={1} pt={2}>
              <UserAvatar
                address={isSelfDelegating ? address : delegatee}
                width={20}
              />
              <ExternalLink href={`https://etherscan.io/address/${delegatee}`}>
                <AddressLabel
                  address={delegatee}
                  maxWidth={100}
                  enableEnsName
                />
              </ExternalLink>
            </Stack>
          }
        />
      )}
      <Stack>
        {isSelfDelegating ? (
          <DelegateButton fullWidth>
            {intl.formatMessage({
              defaultMessage: 'Delegate',
            })}
          </DelegateButton>
        ) : (
          <TxButton
            params={params}
            callbacks={callbacks}
            label={intl.formatMessage({
              defaultMessage: 'Delegate to self',
            })}
            fullWidth
          />
        )}
      </Stack>
      {!isNilOrEmpty(visibleDelegators) && (
        <Stack sx={{ pt: 0 }}>
          <ValueLabel
            {...valueLabelProps}
            label={intl.formatMessage({
              defaultMessage: 'Delegated to me',
            })}
            isLoading={isDelegatorsLoading}
            value={
              <Stack spacing={2}>
                {visibleDelegators.map((d) => (
                  <Stack
                    key={d.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <UserAvatar address={d.id as HexAddress} width={20} />
                      <ExternalLink
                        href={`https://etherscan.io/address/${d.id}`}
                      >
                        <AddressLabel
                          address={d.id as HexAddress}
                          maxWidth={60}
                          enableEnsName
                        />
                      </ExternalLink>
                    </Stack>
                    <Typography>
                      {intl.formatMessage(
                        {
                          defaultMessage: '{count} {symbol}',
                        },
                        {
                          count: formatAmount(
                            BigInt(d.votingPower),
                            tokens.mainnet.xOGN.decimals,
                            undefined,
                            {
                              notation: 'compact',
                              maximumSignificantDigits: 4,
                            },
                          ),
                          symbol: tokens.mainnet.xOGN.symbol,
                        },
                      )}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            }
          />
        </Stack>
      )}
    </Stack>
  );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  alignItems: 'flex-start',
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
    minWidth: 120,
  },
};

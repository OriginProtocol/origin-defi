import { CircularProgress, Stack } from '@mui/material';
import { useTxButton } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { useFormat, useWatchBalance } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useUserDelegatorsQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { ValueLabelProps } from '@origin/shared/components';

export const DelegationPanel = (props: StackProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const { data: balance, isLoading: isBalanceLoading } = useWatchBalance({
    token: tokens.mainnet.xOGN,
  });
  const { data: delegators, isLoading: isDelegatorsLoading } =
    useUserDelegatorsQuery(
      { address: address?.toLowerCase() ?? ZERO_ADDRESS },
      { enabled: !!address },
    );
  const { params, callbacks } = useTxButton({
    params: {
      contract: tokens.mainnet.xOGN,
      functionName: 'delegate',
      args: [address ?? ZERO_ADDRESS],
    },
    activity: {
      type: 'delegate',
      status: 'idle',
      tokenIdIn: tokens.mainnet.xOGN.id,
      delegateTo: 'self',
      votingPower: balance ?? 0n,
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  if (isBalanceLoading) {
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

  return null;

  // const visibleDelegators = address
  //   ? take(
  //       5,
  //       delegators?.ogvAddresses?.filter(
  //         (d) => !isAddressEqual(d.id as HexAddress, address),
  //       ) ?? [],
  //     )
  //   : [];
  // const isSelfDelegating =
  //   userInfo?.delegatee?.id?.toLowerCase() === address?.toLowerCase();
  // const delegatee = userInfo?.delegatee?.id as HexAddress;
  // const noVotingPower = BigInt(userInfo?.veogvBalance ?? 0) === 0n;

  // if (noVotingPower) {
  //   return (
  //     <Typography color="text.secondary">
  //       {intl.formatMessage({ defaultMessage: 'No voting power' })}
  //     </Typography>
  //   );
  // }

  // return (
  //   <Stack {...props}>
  //     {!isSelfDelegating && (
  //       <ValueLabel
  //         {...valueLabelProps}
  //         label={intl.formatMessage({ defaultMessage: 'Delegating to' })}
  //         value={
  //           <Stack direction="row" alignItems="center" spacing={1} pt={2}>
  //             <UserAvatar
  //               address={isSelfDelegating ? address : delegatee}
  //               width={20}
  //             />
  //             <ExternalLink href={`https://etherscan.io/address/${delegatee}`}>
  //               <AddressLabel
  //                 address={delegatee}
  //                 maxWidth={100}
  //                 enableEnsName
  //               />
  //             </ExternalLink>
  //           </Stack>
  //         }
  //       />
  //     )}
  //     <Stack>
  //       {isSelfDelegating ? (
  //         <DelegateButton fullWidth>
  //           {intl.formatMessage({
  //             defaultMessage: 'Delegate',
  //           })}
  //         </DelegateButton>
  //       ) : (
  //         <TxButton
  //           params={params}
  //           callbacks={callbacks}
  //           label={intl.formatMessage({
  //             defaultMessage: 'Delegate to self',
  //           })}
  //           fullWidth
  //         />
  //       )}
  //     </Stack>
  //     {!isNilOrEmpty(visibleDelegators) && (
  //       <Stack sx={{ pt: 3 }}>
  //         <ValueLabel
  //           {...valueLabelProps}
  //           label={intl.formatMessage({
  //             defaultMessage: 'Delegated to me',
  //           })}
  //           isLoading={isDelegatorsLoading}
  //           value={
  //             <Stack spacing={2} width={1}>
  //               {visibleDelegators.map((d) => (
  //                 <Stack
  //                   key={d.id}
  //                   direction="row"
  //                   alignItems="center"
  //                   justifyContent="space-between"
  //                   spacing={1}
  //                 >
  //                   <Stack direction="row" alignItems="center" spacing={1}>
  //                     <UserAvatar address={d.id as HexAddress} width={20} />
  //                     <ExternalLink
  //                       href={`https://etherscan.io/address/${d.id}`}
  //                     >
  //                       <AddressLabel
  //                         address={d.id as HexAddress}
  //                         maxWidth={60}
  //                         enableEnsName
  //                       />
  //                     </ExternalLink>
  //                   </Stack>
  //                   <Typography>
  //                     {intl.formatMessage(
  //                       {
  //                         defaultMessage: '<b>{count}</b> {symbol}',
  //                       },
  //                       {
  //                         count: formatAmount(
  //                           BigInt(d.votingPower),
  //                           tokens.mainnet.xOGN.decimals,
  //                           undefined,
  //                           {
  //                             notation: 'compact',
  //                             maximumSignificantDigits: 4,
  //                           },
  //                         ),
  //                         symbol: tokens.mainnet.xOGN.symbol,
  //                       },
  //                     )}
  //                   </Typography>
  //                 </Stack>
  //               ))}
  //             </Stack>
  //           }
  //         />
  //       </Stack>
  //     )}
  //   </Stack>
  // );
};

const valueLabelProps: Partial<ValueLabelProps> = {
  sx: { alignItems: 'flex-start' },
  spacing: 2,
  labelProps: {
    variant: 'body3',
    sx: { fontWeight: 'medium', color: 'text.secondary', minWidth: 120 },
  },
};

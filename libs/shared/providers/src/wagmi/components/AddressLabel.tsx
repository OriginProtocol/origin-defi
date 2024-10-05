import { Skeleton } from '@mui/material';
import { MiddleTruncatedLabel } from '@origin/shared/components';
import { isNilOrEmpty, middleTruncate } from '@origin/shared/utils';
import { mainnet } from 'viem/chains';
import { useEnsName } from 'wagmi';

import type { MiddleTruncatedLabelProps } from '@origin/shared/components';
import type { HexAddress } from '@origin/shared/utils';

type AddressLabelProps = {
  address?: HexAddress;
  enableEnsName?: boolean;
  short?: boolean;
} & Omit<MiddleTruncatedLabelProps, 'children'>;

export const AddressLabel = ({
  address,
  enableEnsName = false,
  short = false,
  ...rest
}: AddressLabelProps) => {
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      enabled: enableEnsName,
    },
  });

  if (!address) return null;

  const label =
    enableEnsName && !isNilOrEmpty(ensName)
      ? ensName
      : short
        ? middleTruncate(address)
        : address;

  if (enableEnsName && isEnsNameLoading) {
    return <Skeleton sx={{ minWidth: 100, ...rest?.sx }} />;
  }

  return (
    <MiddleTruncatedLabel textProps={{ ...rest }}>{label}</MiddleTruncatedLabel>
  );
};

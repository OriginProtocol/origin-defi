import { Skeleton } from '@mui/material';
import { MiddleTruncated } from '@origin/shared/components';
import { isNilOrEmpty, middleTruncate } from '@origin/shared/utils';
import { useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import type { MiddleTruncatedProps } from '@origin/shared/components';
import type { HexAddress } from '@origin/shared/utils';

type AddressLabelProps = {
  address: HexAddress;
  enableEnsName?: boolean;
  monospace?: boolean;
  short?: boolean;
} & Omit<MiddleTruncatedProps, 'children'>;

export const AddressLabel = ({
  address,
  enableEnsName = false,
  monospace = false,
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

  const label =
    enableEnsName && !isNilOrEmpty(ensName)
      ? ensName
      : short
        ? middleTruncate(address)
        : address;

  if (enableEnsName && isEnsNameLoading) {
    return <Skeleton sx={{ minWidth: 100, ...rest?.sx }} />;
  }

  return <MiddleTruncated textProps={{ ...rest }}>{label}</MiddleTruncated>;
};

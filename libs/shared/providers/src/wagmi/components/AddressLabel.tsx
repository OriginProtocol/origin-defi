import { Skeleton } from '@mui/material';
import { MiddleTruncated } from '@origin/shared/components';
import { middleTruncate } from '@origin/shared/utils';
import { mainnet, useEnsName } from 'wagmi';

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
    enabled: enableEnsName,
    chainId: mainnet.id,
  });

  if (enableEnsName) {
    return isEnsNameLoading ? (
      <Skeleton sx={{ minWidth: 100, ...rest?.sx }} />
    ) : (
      <MiddleTruncated textProps={{ ...rest }}>
        {ensName ?? address}
      </MiddleTruncated>
    );
  }

  if (short) {
    return (
      <MiddleTruncated {...rest}>{middleTruncate(address)}</MiddleTruncated>
    );
  }

  return <MiddleTruncated textProps={{ ...rest }}>{address}</MiddleTruncated>;
};

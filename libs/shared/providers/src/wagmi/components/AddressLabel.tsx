import { Skeleton } from '@mui/material';
import { MiddleTruncated } from '@origin/shared/components';
import { mainnet, useEnsName } from 'wagmi';

import type { MiddleTruncatedProps } from '@origin/shared/components';
import type { HexAddress } from '@origin/shared/utils';

type AddressLabelProps = {
  address: HexAddress;
  enableEnsName?: boolean;
  monospace?: boolean;
} & Omit<MiddleTruncatedProps, 'children'>;

export const AddressLabel = ({
  address,
  enableEnsName = false,
  monospace = false,
  ...rest
}: AddressLabelProps) => {
  const { data: ensName, isLoading: isEnsNameLoading } = useEnsName({
    address,
    enabled: enableEnsName,
    chainId: mainnet.id,
  });

  const fontFamily = monospace ? 'monospace' : 'inherit';

  return enableEnsName ? (
    isEnsNameLoading ? (
      <Skeleton sx={{ minWidth: 100, ...rest?.sx }} />
    ) : (
      <MiddleTruncated textProps={{ fontFamily, ...rest }}>
        {ensName ?? address}
      </MiddleTruncated>
    )
  ) : (
    <MiddleTruncated textProps={{ fontFamily, ...rest }}>
      {address}
    </MiddleTruncated>
  );
};

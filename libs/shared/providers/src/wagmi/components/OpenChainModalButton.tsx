import { IconButton } from '@mui/material';
import { NetworkIcon } from '@origin/shared/components';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useConfig } from 'wagmi';

import type { IconButtonProps } from '@mui/material';

export const OpenChainModalButton = (
  props: Omit<IconButtonProps, 'onClick'>,
) => {
  const { chains } = useConfig();
  const { chain } = useAccount();
  const { openChainModal } = useChainModal();

  return (
    <IconButton {...props} onClick={openChainModal}>
      <NetworkIcon chainId={chain?.id ?? chains[0].id} />
    </IconButton>
  );
};

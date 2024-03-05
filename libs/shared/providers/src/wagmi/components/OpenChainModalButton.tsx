import { IconButton } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import type { IconButtonProps } from '@mui/material';

export const OpenChainModalButton = (
  props: Omit<IconButtonProps, 'onClick'>,
) => {
  const { chain } = useAccount();
  const { openChainModal } = useChainModal();

  return (
    <IconButton {...props} onClick={openChainModal}>
      <ChainIcon chainId={chain?.id} />
    </IconButton>
  );
};

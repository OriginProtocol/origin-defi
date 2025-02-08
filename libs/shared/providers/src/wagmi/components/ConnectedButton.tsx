import { Button, CircularProgress } from '@mui/material';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useIntl } from 'react-intl';
import { useAccount, useConfig, useSwitchChain } from 'wagmi';

import type { ButtonProps } from '@mui/material';

export type ConnectedButtonProps = {
  targetChainId?: number;
  disableNetworkCheck?: boolean;
  switchNetworkLabel?: string;
  connectLabel?: string;
} & ButtonProps;

export const ConnectedButton = ({
  children,
  onClick,
  disabled,
  targetChainId,
  disableNetworkCheck,
  connectLabel,
  switchNetworkLabel,
  ...rest
}: ConnectedButtonProps) => {
  const intl = useIntl();
  const { chains } = useConfig();
  const { chain } = useAccount();
  const { isConnected, isConnecting } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();

  const handleSwitchToDefaultNetwork = () => {
    switchChain({ chainId: targetChainId ?? chains[0].id });
  };

  if (!isConnected) {
    return (
      <Button
        {...rest}
        onClick={() => {
          openConnectModal?.();
        }}
      >
        {connectLabel ??
          intl.formatMessage({ defaultMessage: 'Connect Wallet' })}
      </Button>
    );
  }

  if (isConnecting) {
    return (
      <Button {...rest} disabled>
        <CircularProgress sx={{ color: 'primary.contrastText' }} />
      </Button>
    );
  }

  const wrongChain =
    (targetChainId && targetChainId !== chain?.id) ||
    isNilOrEmpty(chains.find((c) => c.id === chain?.id));

  if (!disableNetworkCheck && wrongChain) {
    return (
      <Button onClick={handleSwitchToDefaultNetwork} {...rest}>
        {switchNetworkLabel ??
          intl.formatMessage({ defaultMessage: 'Switch network' })}
      </Button>
    );
  }

  return (
    <Button onClick={onClick} disabled={wrongChain || disabled} {...rest}>
      {children}
    </Button>
  );
};

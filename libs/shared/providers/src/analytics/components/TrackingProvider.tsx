import { useEffect } from 'react';

import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useLocation } from 'react-router';
import { useAccount } from 'wagmi';

import type { Children, HexAddress } from '@origin/shared/utils';

export type TrackingProviderProps = {
  onPageChange?: () => void;
  onWalletConnect?: (address: HexAddress, connectorName: string) => void;
} & Children;

export const TrackingProvider = ({
  onPageChange,
  onWalletConnect,
  children,
}: TrackingProviderProps) => {
  const { isConnected, address, connector } = useAccount();

  const { pathname } = useLocation();

  useEffect(() => {
    if (onPageChange && !isNilOrEmpty(pathname)) {
      onPageChange();
    }
  }, [onPageChange, pathname]);

  useEffect(() => {
    if (
      onWalletConnect &&
      isConnected &&
      !isNilOrEmpty(address) &&
      !isNilOrEmpty(connector?.name)
    ) {
      onWalletConnect(
        address ?? ZERO_ADDRESS,
        connector?.name ?? 'unknown wallet',
      );
    }
  }, [address, connector?.name, isConnected, onWalletConnect]);

  return children;
};

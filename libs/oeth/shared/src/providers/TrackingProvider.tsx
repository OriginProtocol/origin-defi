import { useEffect } from 'react';

import { isNilOrEmpty } from '@origin/shared/utils';
import { useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { trackEvent, trackPage } from '../clients';

import type { Children } from '@origin/shared/utils';

export const TrackingProvider = ({ children }: Children) => {
  const { isConnected, address, connector } = useAccount();

  const { pathname } = useLocation();

  useEffect(() => {
    if (!isNilOrEmpty(pathname)) {
      trackPage();
    }
  }, [pathname]);

  useEffect(() => {
    if (
      isConnected &&
      !isNilOrEmpty(address) &&
      !isNilOrEmpty(connector?.name)
    ) {
      trackEvent({
        name: 'connect',
        connect_address: address,
        connect_wallet: connector.name,
      });
    }
  }, [address, connector?.name, isConnected]);

  return children;
};

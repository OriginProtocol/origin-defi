import { useEffect, useMemo, useState } from 'react';

import { useBridgeTransfersQuery } from '@origin/defi/shared';
import { useIdlePollInterval } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { keepPreviousData } from '@tanstack/react-query';
import { useAccount } from 'wagmi';

import { useBridgeState } from '../state';

type BridgeTransferState = 'untouched' | 'processing' | 'complete' | 'failed';
const states: Record<number, BridgeTransferState> = {
  0: 'untouched',
  1: 'processing',
  2: 'complete',
  3: 'failed',
};

export const useBridgeActivity = ({ limit }: { limit: number }) => {
  const { address } = useAccount();
  const [hasPendingTransfers, setHasPendingTransfers] = useState(false);
  const [{ waitForTransfer }, setBridgeState] = useBridgeState();
  const interval = useIdlePollInterval(5000);
  const bridgeTransfers = useBridgeTransfersQuery(
    { address: address?.toLowerCase() ?? ZERO_ADDRESS, limit },
    {
      enabled: !!address,
      refetchInterval: waitForTransfer
        ? interval
        : hasPendingTransfers
          ? interval
          : undefined,
      placeholderData: keepPreviousData,
    },
  );

  const waitForTransferFound =
    waitForTransfer &&
    !!bridgeTransfers.data?.bridgeTransfers.find(
      (bt) => bt.txHashIn === waitForTransfer.txHashIn,
    );

  // Wait for Tx to show up
  useEffect(() => {
    if (waitForTransferFound) {
      setBridgeState((state) => ({ ...state, waitForTransfer: undefined }));
    }
  }, [setBridgeState, waitForTransferFound]);

  // Create data response
  const data = useMemo(() => {
    if (!address) {
      return [];
    }
    const transfers = [];
    if (bridgeTransfers.data?.bridgeTransfers) {
      transfers.push(...bridgeTransfers.data.bridgeTransfers);
    }
    if (waitForTransfer && !waitForTransferFound)
      transfers.unshift(waitForTransfer);
    return transfers.map((bt) => {
      const state = states[bt.state];
      return {
        ...bt,
        state,
      };
    });
  }, [
    address,
    bridgeTransfers?.data?.bridgeTransfers,
    waitForTransfer,
    waitForTransferFound,
  ]);

  // Wait for state updates
  useEffect(() => {
    setHasPendingTransfers(
      !!data?.find((t) => t.state === 'untouched' || t.state === 'processing'),
    );
  }, [data]);

  return {
    isLoading: bridgeTransfers.isLoading,
    data,
  };
};

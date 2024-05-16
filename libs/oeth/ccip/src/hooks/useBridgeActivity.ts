import { useEffect, useMemo, useState } from 'react';

import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useAccount } from 'wagmi';

import { useBridgeTransfersQuery } from '../queries.generated';
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
  // TODO: Add a max retry limit?

  // Query via GraphQL!
  const bridgeTransfers = useBridgeTransfersQuery(
    { address: address ?? ZERO_ADDRESS, limit },
    {
      enabled: !!address,
      refetchInterval: waitForTransfer
        ? 5000
        : hasPendingTransfers
          ? 5000
          : false,
    },
  );

  // Wait for Tx to show up
  useEffect(() => {
    if (
      waitForTransfer &&
      !!bridgeTransfers.data?.bridgeTransfers.find(
        (bt) => bt.txHashIn === waitForTransfer.txHashIn,
      )
    ) {
      setBridgeState((state) => ({ ...state, waitForTx: undefined }));
    }
  }, [bridgeTransfers.data, setBridgeState, waitForTransfer]);

  // Create memoData response
  const memoData = useMemo(() => {
    const transfers = [];
    if (bridgeTransfers.data?.bridgeTransfers) {
      transfers.push(...bridgeTransfers.data.bridgeTransfers);
    }
    if (waitForTransfer) transfers.unshift(waitForTransfer);
    return transfers.map((bt) => {
      const state = states[bt.state];
      return {
        ...bt,
        state,
      };
    });
  }, [bridgeTransfers.data?.bridgeTransfers, waitForTransfer]);

  // Wait for state updates
  useEffect(() => {
    setHasPendingTransfers(
      !!memoData?.find(
        (t) => t.state === 'untouched' || t.state === 'processing',
      ),
    );
  }, [memoData]);

  const [data, setData] = useState(memoData);
  useEffect(() => {
    if (!bridgeTransfers.isLoading && !bridgeTransfers.isPending) {
      setData(memoData);
    }
  }, [bridgeTransfers.isLoading, bridgeTransfers.isPending, memoData]);

  return {
    isLoading: bridgeTransfers.isLoading,
    data: data,
  };
};

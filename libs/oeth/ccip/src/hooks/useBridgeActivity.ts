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

export const useBridgeActivity = () => {
  const { address } = useAccount();
  const [hasPendingTransfers, setHasPendingTransfers] = useState(false);
  const [{ waitForTx }, setBridgeState] = useBridgeState();
  // TODO: Add a max retry limit?

  // Query via GraphQL!
  const bridgeTransfers = useBridgeTransfersQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      refetchInterval: waitForTx ? 5000 : hasPendingTransfers ? 5000 : false,
    },
  );

  // Wait for Tx to show up
  useEffect(() => {
    if (
      waitForTx &&
      !!bridgeTransfers.data?.bridgeTransfers.find(
        (bt) => bt.txHashIn === waitForTx,
      )
    ) {
      setBridgeState((state) => ({ ...state, waitForTx: undefined }));
    }
  }, [bridgeTransfers.data, setBridgeState, waitForTx]);

  // Create data response
  const data = useMemo(
    () =>
      bridgeTransfers.data?.bridgeTransfers.map((bt) => {
        const state = states[bt.state];
        return {
          ...bt,
          state,
        };
      }),
    [bridgeTransfers.data?.bridgeTransfers],
  );

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

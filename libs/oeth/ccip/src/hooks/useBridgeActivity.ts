import { useEffect, useMemo, useState } from 'react';

import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useAccount } from 'wagmi';

import {
  useBridgeTransfersQuery,
  useBridgeTransferStatesQuery,
} from '../queries.generated';

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
  const [waitForTx, setWaitForTx] = useState<string>();
  // TODO: Add a max retry limit?

  // Query via GraphQL!
  const bridgeTransfers = useBridgeTransfersQuery(
    { address: address ?? ZERO_ADDRESS },
    {
      enabled: !!address,
      refetchInterval: waitForTx ? 5000 : false,
    },
  );
  const bridgeTransferStates = useBridgeTransferStatesQuery(
    {
      messageIds: bridgeTransfers.data?.bridgeTransfers.map(
        (bt) => bt.messageId,
      ),
    },
    {
      enabled:
        !bridgeTransfers.isLoading &&
        bridgeTransfers.data &&
        bridgeTransfers.data.bridgeTransfers.length > 0,
      refetchInterval: hasPendingTransfers ? 5000 : false,
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
      setWaitForTx(undefined);
    }
  }, [bridgeTransfers.data, waitForTx]);

  // Create data response
  const data = useMemo(
    () =>
      bridgeTransfers.data?.bridgeTransfers.map((bt) => {
        let state: BridgeTransferState | undefined = undefined;
        const data = bridgeTransferStates.data?.bridgeTransferStates.find(
          (bts) => bt.messageId === bts.id,
        ) ?? { state: 0 };
        state = states[data.state];
        return {
          ...bt,
          state,
        };
      }),
    [
      bridgeTransfers.data?.bridgeTransfers,
      bridgeTransferStates.data?.bridgeTransferStates,
    ],
  );

  // Wait for state updates
  useEffect(() => {
    setHasPendingTransfers(
      !!data?.find((t) => t.state === 'untouched' || t.state === 'processing'),
    );
  }, [data]);

  return {
    waitForTx: (hash: string) => setWaitForTx(hash),
    isLoading: bridgeTransfers.isLoading,
    data,
  };
};

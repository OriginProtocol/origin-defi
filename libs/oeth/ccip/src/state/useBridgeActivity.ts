import { useEffect, useMemo, useState } from 'react';

import { useAccount } from 'wagmi';

import {
  useBridgeTransfersQuery,
  useBridgeTransferStatesQuery,
} from '../queries.generated';

type State = 'untouched' | 'processing' | 'complete' | 'failed';
const states: Record<number, State> = {
  0: 'untouched',
  1: 'processing',
  2: 'complete',
  3: 'failed',
};

export const useBridgeActivity = () => {
  const { address: currentAddress } = useAccount();
  const [hasPendingTransfers, setHasPendingTransfers] = useState(false);
  const [waitForTx, setWaitForTx] = useState<string>();

  // Query via GraphQL!
  const bridgeTransfers = useBridgeTransfersQuery(
    { account: currentAddress?.toLowerCase() as string },
    {
      enabled: !!currentAddress,
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
        (bt) => bt.txHash === waitForTx,
      )
    ) {
      setWaitForTx(undefined);
    }
  }, [bridgeTransfers.data, waitForTx]);

  // Create data response
  const data = useMemo(
    () =>
      bridgeTransfers.data?.bridgeTransfers.map((bt) => {
        let state: State | undefined = undefined;
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

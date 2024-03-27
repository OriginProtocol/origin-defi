import { useCallback, useEffect, useMemo, useState } from 'react';

import { getTokenPriceKey, useTokenPrices } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { uniq } from 'ramda';
import { useAccount } from 'wagmi';

import {
  useBridgeTransfersQuery,
  useBridgeTransferStatesQuery,
} from './queries.generated';
import { initialState, useBridgeState } from './state';

export const useHandleChangeAmount = () => {
  const [, setState] = useBridgeState();

  return useCallback(
    (amount: bigint) => {
      setState((state) => ({ ...state, amount }));
    },
    [setState],
  );
};

export const useHandleToggleBridgeChain = () => {
  const [, setState] = useBridgeState();

  return useCallback(() => {
    setState((state) => {
      const oldDstToken = state.dstToken;
      const oldDstChain = state.dstChain;
      const oldDstRouter = state.dstRouter;

      return {
        ...state,
        dstToken: state.srcToken,
        dstChain: state.srcChain,
        dstRouter: state.srcRouter,
        srcToken: oldDstToken,
        srcChain: oldDstChain,
        srcRouter: oldDstRouter,
      };
    });
  }, [setState]);
};

export const useHandleResetBridgeState = () => {
  const [, setState] = useBridgeState();

  return useCallback(() => {
    setState(initialState);
  }, [setState]);
};

export const useBridgePrices = () => {
  const [state] = useBridgeState();
  const result = useTokenPrices(
    uniq([
      getTokenPriceKey(state.dstToken, 'USD'),
      getTokenPriceKey(state.srcToken, 'USD'),
    ]),
  );
  const srcPrice = result.data?.[getTokenPriceKey(state.srcToken)];
  const dstPrice = result.data?.[getTokenPriceKey(state.dstToken)];

  return {
    isLoading: result.isLoading,
    isError: result.isError,
    srcPrice,
    dstPrice,
  };
};

type Status = 'untouched' | 'processing' | 'complete' | 'failed';

const status: Record<number, Status> = {
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
        let state: Status | undefined = undefined;
        const data = bridgeTransferStates.data?.bridgeTransferStates.find(
          (bts) => bt.messageId === bts.id,
        ) ?? { state: 0 };
        state = status[data.state];
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

import { useState } from 'react';

import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';

import type { Chain } from 'viem/chains';

export interface BridgeState {
  srcChain: Chain;
  dstChain: Chain;
}

const defaultState: BridgeState = { srcChain: mainnet, dstChain: arbitrum };

const container = createContainer(() => useState(defaultState));
export const BridgeProvider = container.Provider;
export const useBridgeState = () => {
  const [state, setState] = container.useTracked();
  return {
    state,
    toggleChain: () => {
      setState((state) => ({
        srcChain: state.dstChain,
        dstChain: state.srcChain,
      }));
    },
  };
};

import { useCallback, useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { parseEther } from 'viem';
import { arbitrum, mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export interface BridgeState {
  srcChain: Chain;
  dstChain: Chain;
  activity: BridgeActivity[];
}

export interface BridgeActivity {
  token: Token;
  amount: bigint;
  srcChain: Chain;
  dstChain: Chain;
  timestamp: number;
  status: 'complete' | 'failed' | 'processing';
  eta?: number;
  tx: string;
}

const defaultState: BridgeState = {
  srcChain: mainnet,
  dstChain: arbitrum,
  activity: [
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('250.291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'processing',
      eta: 60000 * 5,
      tx: '0x1af5529566d15c74616fbc21acac4ac78f0b9a9d17daeeb4681b8d3e7e03d150',
    },
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('.0291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'complete',
      tx: '0x1af5529566d15c74616fbc21acac4ac78f0b9a9d17daeeb4681b8d3e7e03d150',
    },
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('23250.291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'failed',
      tx: '0x1af5529566d15c74616fbc21acac4ac78f0b9a9d17daeeb4681b8d3e7e03d150',
    },
  ],
};

const container = createContainer(() => useState(defaultState));
export const BridgeProvider = container.Provider;

export const useBridgeState = () => {
  const [state, setState] = container.useTracked();
  return {
    state,
    toggleChain: useCallback(() => {
      setState((state) => ({
        ...state,
        srcChain: state.dstChain,
        dstChain: state.srcChain,
      }));
    }, [setState]),
  };
};

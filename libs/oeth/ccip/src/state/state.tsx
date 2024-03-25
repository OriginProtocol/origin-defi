import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';

import { statuses } from './statuses';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export interface BridgeState {
  approval?: {
    enabled: boolean;
    message: { defaultMessage: string };
    action?: () => Promise<void>;
  };
  bridge?: {
    enabled: boolean;
    message: { defaultMessage: string };
    action?: () => Promise<void>;
  };
  status: 'idle' | 'pending' | 'complete';
  actionTx?: `0x${string}`;
  amount: bigint;
  allowance: bigint | undefined;
  srcChain: Chain;
  srcToken: Token;
  dstChain: Chain;
  dstToken: Token;
}

export const getDefaultState = () => {
  return {
    approval: undefined,
    bridge: statuses.bridge.enterAmount(),
    status: 'idle',
    amount: 0n,
    allowance: undefined,
    srcChain: mainnet,
    srcToken: tokens.mainnet.wOETH,
    dstChain: arbitrum,
    dstToken: tokens.arbitrum.wOETH,
  } as BridgeState;
};

export const bridgeStateContainer = createContainer(() => {
  const defaultState = getDefaultState();
  return useState(defaultState);
});
export const BridgeProvider = bridgeStateContainer.Provider;

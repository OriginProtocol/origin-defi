import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';

import { statuses } from './statuses';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

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

export interface BridgeState {
  approval?: {
    enabled: boolean;
    message: string;
    action?: () => Promise<void>;
  };
  bridge?: {
    enabled: boolean;
    message: string;
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

export const useDefaultState = () => {
  const intl = useIntl();
  return {
    approval: undefined,
    bridge: statuses.bridge.enterAmount(intl),
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
  const defaultState = useDefaultState();
  return useState(defaultState);
});
export const BridgeProvider = bridgeStateContainer.Provider;

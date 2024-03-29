import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';

import type { Token } from '@origin/shared/contracts';
import type { Chain } from 'viem/chains';

export interface BridgeState {
  amount: bigint;
  srcChain: Chain;
  srcToken: Token;
  dstChain: Chain;
  dstToken: Token;
}

export const getDefaultState = () => {
  return {
    amount: 0n,
    srcChain: mainnet,
    srcToken: tokens.mainnet.wOETH,
    dstChain: arbitrum,
    dstToken: tokens.arbitrum.wOETH,
  } as BridgeState;
};

export const { Provider: BridgeProvider, useTracked: useBridgeState } =
  createContainer(() => useState(getDefaultState()));

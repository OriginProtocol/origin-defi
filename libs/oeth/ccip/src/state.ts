import { useState } from 'react';

import { contracts, tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';

import type { Contract, Token } from '@origin/shared/contracts';
import type { Chain } from 'viem';

export interface BridgeState {
  amount: bigint;
  srcChain: Chain;
  srcToken: Token;
  srcRouter: Contract;
  dstChain: Chain;
  dstToken: Token;
  dstRouter: Contract;
  actionTx?: `0x${string}`;
}

export const initialState: BridgeState = {
  amount: 0n,
  srcChain: mainnet,
  srcToken: tokens.mainnet.wOETH,
  srcRouter: contracts.mainnet.ccipRouter,
  dstChain: arbitrum,
  dstToken: tokens.arbitrum.wOETH,
  dstRouter: contracts.arbitrum.ccipRouter,
};

export const { Provider: BridgeProvider, useTracked: useBridgeState } =
  createContainer(() => useState(initialState));

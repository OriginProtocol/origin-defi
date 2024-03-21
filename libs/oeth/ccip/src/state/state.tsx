import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { createContainer } from 'react-tracked';
import { parseEther } from 'viem';
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
  activity: BridgeActivity[];
}

export const defaultState: BridgeState = {
  approval: undefined,
  bridge: statuses.bridge.enterAmount(),
  status: 'idle',
  amount: 0n,
  allowance: undefined,
  srcChain: mainnet,
  srcToken: tokens.mainnet.wOETH,
  dstChain: arbitrum,
  dstToken: tokens.arbitrum.wOETH,
  activity: [
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('250.291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'processing',
      eta: 60000 * 5,
      tx: '0xd937a58e1262a17a67a2c75885210336cccd754265ed2615e5d7b9aeef7fa564',
    },
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('.0291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'complete',
      tx: '0xd937a58e1262a17a67a2c75885210336cccd754265ed2615e5d7b9aeef7fa564',
    },
    {
      token: tokens.mainnet.wOETH,
      amount: parseEther('23250.291'),
      srcChain: mainnet,
      dstChain: arbitrum,
      timestamp: Date.parse('2024-03-05'),
      status: 'failed',
      tx: '0xd937a58e1262a17a67a2c75885210336cccd754265ed2615e5d7b9aeef7fa564',
    },
  ],
};

export const bridgeStateContainer = createContainer(() =>
  useState(defaultState),
);
export const BridgeProvider = bridgeStateContainer.Provider;

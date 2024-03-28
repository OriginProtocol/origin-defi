import { useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { useWatchBalance } from '@origin/shared/providers';
import { useDebouncedEffect } from '@react-hookz/web';
import { readContract } from '@wagmi/core';
import { createContainer } from 'react-tracked';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter, statuses } from '../constants';

import type { Token } from '@origin/shared/contracts';
import type { erc20Abi } from 'viem';
import type { Chain } from 'viem/chains';

export interface BridgeState {
  approval?: {
    enabled: boolean;
    message: { defaultMessage: string };
  };
  bridge?: {
    enabled: boolean;
    message: { defaultMessage: string };
  };
  status: 'idle' | 'pending' | 'complete';
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

export const { Provider: BridgeProvider, useTracked: useBridgeState } =
  createContainer(() => {
    const defaultState = getDefaultState();
    const [state, setState] = useState(defaultState);

    const config = useConfig();
    const { address: userAddress } = useAccount();

    const { srcToken, srcChain, status, approval, bridge, amount, allowance } =
      state;

    // Get Balances
    const { data: srcBalance } = useWatchBalance({ token: srcToken });

    useDebouncedEffect(
      async () => {
        if (!userAddress || !srcToken.address) return;
        const srcRouter = ccipRouter[srcChain.id];
        const allowance = await readContract(config, {
          chainId: srcToken.chainId,
          address: srcToken.address,
          abi: srcToken.abi as typeof erc20Abi,
          functionName: 'allowance',
          args: [userAddress, srcRouter.address],
        });
        setState((state) => ({
          ...state,
          allowance,
        }));
      },
      [srcToken, srcToken.chainId, srcChain.id, userAddress],
      200,
    );

    useDebouncedEffect(
      async () => {
        if (status === 'idle') {
          let appr: typeof approval;
          let brid: typeof bridge;
          if (amount === 0n) {
            appr = undefined;
            brid = statuses.bridge.enterAmount();
          } else if (srcBalance !== undefined && srcBalance < amount) {
            appr = undefined;
            brid = statuses.bridge.insufficientAmount();
          } else if (allowance !== undefined && allowance < amount) {
            appr = statuses.approval.idle();
            brid = statuses.bridge.disabled();
          } else {
            appr = undefined;
            brid = statuses.bridge.idle();
          }

          setState((state) => ({
            ...state,
            approval: appr,
            bridge: brid,
          }));
        }
      },
      [status, srcBalance, amount, allowance],
      200,
    );

    return [state, setState];
  });

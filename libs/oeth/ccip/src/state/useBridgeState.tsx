import { useCallback } from 'react';

import { useWatchBalance } from '@origin/shared/providers';
import { useDebouncedEffect } from '@react-hookz/web';
import { readContract } from '@wagmi/core';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter } from '../ccip';
import { bridgeStateContainer } from './state';
import { statuses } from './statuses';
import { useApprove } from './useApprove';
import { useBridge } from './useBridge';

import type { erc20Abi } from 'viem';

export const useBridgeState = () => {
  const config = useConfig();
  const { address: userAddress } = useAccount();
  const [state, setState] = bridgeStateContainer.useTracked();

  // Get Balances
  const { data: srcBalance, isLoading: isSrcBalanceLoading } = useWatchBalance({
    token: state.srcToken.address,
    chainId: state.srcChain.id,
  });
  const { data: dstBalance, isLoading: isDstBalanceLoading } = useWatchBalance({
    token: state.dstToken.address,
    chainId: state.dstChain.id,
  });

  const doApprove = useApprove();
  const doBridge = useBridge();

  useDebouncedEffect(
    async () => {
      if (!userAddress) return;
      const allowance = await readContract(config, {
        chainId: state.srcToken.chainId,
        address: state.srcToken.address,
        abi: state.srcToken.abi as typeof erc20Abi,
        functionName: 'allowance',
        args: [userAddress, ccipRouter[state.srcToken.chainId].address],
      });
      setState((state) => ({
        ...state,
        allowance,
      }));
    },
    [state.srcToken, userAddress],
    200,
  );

  useDebouncedEffect(
    async () => {
      if (state.status === 'idle') {
        let approval: typeof state.approval;
        let bridge: typeof state.bridge;
        if (state.amount === 0n) {
          approval = undefined;
          bridge = statuses.bridge.enterAmount();
        } else if (srcBalance !== undefined && srcBalance < state.amount) {
          approval = undefined;
          bridge = statuses.bridge.insufficientAmount();
        } else if (state.allowance && state.allowance < state.amount) {
          approval = statuses.approval.idle(doApprove);
          bridge = statuses.bridge.disabled();
        } else {
          approval = undefined;
          bridge = statuses.bridge.idle(doBridge);
        }

        setState((state) => ({
          ...state,
          approval,
          bridge,
        }));
      }
    },
    [
      config,
      state.srcToken,
      state.allowance,
      state.amount,
      state.approval,
      state.bridge,
      srcBalance,
    ],
    200,
  );

  return {
    state: {
      ...state,
      srcBalance,
      isSrcBalanceLoading,
      dstBalance,
      isDstBalanceLoading,
    },
    changeAmount: useCallback(
      (amount: bigint) => {
        setState((state) => ({
          ...state,
          amount,
        }));
      },
      [setState],
    ),
    toggleChain: useCallback(() => {
      setState((state) => ({
        ...state,
        srcChain: state.dstChain,
        srcToken: state.dstToken,
        dstChain: state.srcChain,
        dstToken: state.srcToken,
      }));
    }, [setState]),
  };
};

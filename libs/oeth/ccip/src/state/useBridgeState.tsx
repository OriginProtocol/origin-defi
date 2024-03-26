import { useCallback } from 'react';

import { useWatchBalance } from '@origin/shared/providers';
import { useDebouncedEffect } from '@react-hookz/web';
import { readContract } from '@wagmi/core';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter } from '../constants';
import { bridgeStateContainer } from './state';
import { statuses } from './statuses';
import { useApprove } from './useApprove';
import { useBridge } from './useBridge';

import type { erc20Abi } from 'viem';

export const useBridgeState = () => {
  const config = useConfig();
  const { address: userAddress } = useAccount();
  const [state, setState] = bridgeStateContainer.useTracked();

  const { srcToken, srcChain, status, approval, bridge, amount, allowance } =
    state;

  // Get Balances
  const { data: srcBalance } = useWatchBalance({ token: srcToken });

  const doApprove = useApprove();
  const doBridge = useBridge();

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
          appr = statuses.approval.idle(doApprove);
          brid = statuses.bridge.disabled();
        } else {
          appr = undefined;
          brid = statuses.bridge.idle(doBridge);
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

  return {
    state,
    changeAmount: useCallback(
      (amount: bigint) => {
        setState((state) => ({
          ...state,
          amount,
        }));
      },
      [setState],
    ),
  };
};

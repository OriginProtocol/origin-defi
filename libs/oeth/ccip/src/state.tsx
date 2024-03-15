import { useCallback, useState } from 'react';

import { trackEvent } from '@origin/oeth/shared';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import {
  ApprovalNotification,
  BridgeNotification,
  useDeleteActivity,
  usePushActivity,
  usePushNotification,
  useUpdateActivity,
  useWatchBalance,
} from '@origin/shared/providers';
import {
  formatError,
  isUserRejected,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { decodeFunctionData, encodeAbiParameters, parseEther } from 'viem';
import { arbitrum, mainnet } from 'viem/chains';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter } from './ccip';

import type { Token } from '@origin/shared/contracts';
import type { erc20Abi } from 'viem';
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
    status: 'disabled' | 'pending' | 'complete';
    message: string;
    action?: () => Promise<void>;
  };
  bridge?: {
    status: 'disabled' | 'pending' | 'complete';
    message: string;
    action?: () => Promise<void>;
  };
  actionTx?: `0x${string}`;
  amount: bigint;
  allowance: bigint | undefined;
  srcChain: Chain;
  srcToken: Token;
  dstChain: Chain;
  dstToken: Token;
  activity: BridgeActivity[];
}

const defaultState: BridgeState = {
  approval: undefined,
  bridge: {
    status: 'pending',
    message: 'Enter an amount',
  },
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
  const config = useConfig();
  const { address: userAddress } = useAccount();
  const [state, setState] = container.useTracked();

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
      const allowance =
        state.allowance ??
        (await readContract(config, {
          chainId: state.srcToken.chainId,
          address: state.srcToken.address,
          abi: state.srcToken.abi as typeof erc20Abi,
          functionName: 'allowance',
          args: [userAddress, ccipRouter[state.srcToken.chainId].address],
        }));

      let approval: typeof state.approval;
      let bridge: typeof state.bridge;
      if (state.amount === 0n) {
        approval = undefined;
        bridge = {
          status: 'disabled',
          message: 'Enter an amount',
        };
      } else if (srcBalance !== undefined && srcBalance < state.amount) {
        approval = undefined;
        bridge = {
          status: 'disabled',
          message: 'Insufficient amount',
        };
      } else if (allowance < state.amount) {
        approval = {
          status: 'pending',
          message: 'Approve',
          action: doApprove,
        };
        bridge = {
          status: 'disabled',
          message: 'Bridge',
        };
      } else {
        approval = undefined;
        bridge = {
          status: 'pending',
          message: 'Bridge',
          action: doBridge,
        };
      }

      setState((state) => ({
        ...state,
        allowance,
        approval,
        bridge,
      }));
    },
    [
      config,
      state.srcToken,
      state.allowance,
      state.amount,
      srcBalance,
      userAddress,
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

const useApprove = () => {
  const [state, setState] = container.useTracked();
  const intl = useIntl();
  const config = useConfig();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  return useCallback(async () => {
    const activity = pushActivity({
      type: 'approval',
      status: 'pending',
      amountIn: state.amount,
      tokenIn: state.srcToken,
      tokenOut: state.dstToken,
    });
    try {
      const hash = await writeContract(config, {
        chainId: state.srcToken.chainId,
        address: state.srcToken.address,
        abi: state.srcToken.abi as typeof erc20Abi,
        functionName: 'approve',
        args: [ccipRouter[state.srcToken.chainId].address, state.amount],
      });
      const txReceipt = await waitForTransactionReceipt(config, { hash });
      if (txReceipt.status === 'success') {
        updateActivity({
          ...activity,
          status: 'success',
        });
        setState((state) => ({ ...state, allowance: undefined }));
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: 'Transaction reverted',
        });
      }
    } catch (error) {
      if (isUserRejected(error)) {
        deleteActivity(activity.id);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="warning" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
        });
        trackEvent({
          name: 'approve_rejected',
          approval_token: state.srcToken.symbol,
        });
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: formatError(error),
        });
        pushNotification({
          content: (
            <ApprovalNotification
              tokenIn={state.srcToken}
              amountIn={state.amount}
              status="error"
              error={formatError(error)}
            />
          ),
        });
        trackEvent({
          name: 'approve_failed',
          approval_token: state.srcToken.symbol,
          approve_error: formatError(error),
        });
      }
      throw error;
    }
  }, [
    pushActivity,
    state.amount,
    state.srcToken,
    state.dstToken,
    config,
    updateActivity,
    setState,
    deleteActivity,
    pushNotification,
    intl,
  ]);
};

const useBridge = () => {
  const [state, setState] = container.useTracked();
  const { address: userAddress } = useAccount();
  const intl = useIntl();
  const config = useConfig();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  return useCallback(async () => {
    if (!userAddress) return;
    const activity = pushActivity({
      type: 'bridge',
      status: 'pending',
      amountIn: state.amount,
      tokenIn: state.srcToken,
      tokenOut: state.dstToken,
    });
    try {
      const bleh = decodeFunctionData({
        abi: contracts.mainnet.ccipRouter.abi,
        data: '0x96f4e9f900000000000000000000000000000000000000000000000044ae84d8e9a37444000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000002000000000000000000000000058890a9cb27586e83cb51d2d26bbe18a1a64724500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000dcee70654261af21c44c093c300ed3bb97b78192000000000000000000000000000000000000000000000000002386f26fc100000000000000000000000000000000000000000000000000000000000000000000',
      });

      console.log(bleh);

      const { request } = await simulateContract(config, {
        address: contracts.mainnet.ccipRouter.address,
        abi: contracts.mainnet.ccipRouter.abi,
        functionName: 'ccipSend',
        args: [
          ccipRouter[state.dstChain.id].chainSelectorId,
          {
            receiver: encodeAbiParameters([{ type: 'address' }], [userAddress]),
            data: '0x',
            tokenAmounts: [
              { token: state.srcToken.address, amount: state.amount },
            ],
            feeToken: ZERO_ADDRESS,
            extraArgs: '0x',
          },
        ],
        chainId: state.srcChain.id,
      });
      console.log(request);
      const hash = await writeContract(config, request);
      const txReceipt = await waitForTransactionReceipt(config, { hash });
      if (txReceipt.status === 'success') {
        updateActivity({
          ...activity,
          status: 'success',
        });
        setState((state) => ({ ...state, allowance: undefined }));
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: 'Transaction reverted',
        });
      }
    } catch (error) {
      if (isUserRejected(error)) {
        deleteActivity(activity.id);
        pushNotification({
          content: (
            <NotificationSnack
              icon={<SeverityIcon severity="warning" />}
              title={intl.formatMessage({
                defaultMessage: 'Operation Cancelled',
              })}
              subtitle={intl.formatMessage({
                defaultMessage: 'User rejected operation',
              })}
            />
          ),
        });
        trackEvent({
          name: 'bridge_rejected',
          bridge_token: state.srcToken.symbol,
          bridge_amount: state.amount,
        });
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: formatError(error),
        });
        pushNotification({
          content: (
            <BridgeNotification
              tokenIn={state.srcToken}
              amountIn={state.amount}
              status="error"
              error={formatError(error)}
            />
          ),
        });
        trackEvent({
          name: 'bridge_failed',
          bridge_token: state.srcToken.symbol,
          bridge_amount: state.amount,
          bridge_error: formatError(error),
        });
      }
      throw error;
    }
  }, [
    userAddress,
    pushActivity,
    state.amount,
    state.srcToken,
    state.dstToken,
    state.srcChain.id,
    config,
    updateActivity,
    setState,
    deleteActivity,
    pushNotification,
    intl,
  ]);
};

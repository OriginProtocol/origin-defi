import { useCallback } from 'react';

import { trackEvent } from '@origin/oeth/shared';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  BridgeNotification,
  useDeleteActivity,
  usePushActivity,
  usePushNotification,
  useUpdateActivity,
} from '@origin/shared/providers';
import {
  formatError,
  isUserRejected,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  readContract,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from '@wagmi/core';
import { useIntl } from 'react-intl';
import { encodeAbiParameters } from 'viem';
import { useAccount, useConfig } from 'wagmi';

import { ccipRouter } from '../ccip';
import { bridgeStateContainer } from './state';
import { statuses } from './statuses';
import { useBridgeActivity } from './useBridgeActivity';
import { useResetBridgeState } from './useResetBridgeState';

export const useBridge = () => {
  const [state, setState] = bridgeStateContainer.useTracked();
  const { address: userAddress } = useAccount();
  const resetState = useResetBridgeState();
  const intl = useIntl();
  const config = useConfig();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const bridgeActivity = useBridgeActivity();

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
      setState((state) => ({
        ...state,
        status: 'pending',
        bridge: statuses.bridge.waitingForSignature(),
      }));
      const message = {
        receiver: encodeAbiParameters([{ type: 'address' }], [userAddress]),
        data: '0x',
        tokenAmounts: [{ token: state.srcToken.address, amount: state.amount }],
        feeToken: ZERO_ADDRESS,
        extraArgs: '0x',
      } as const;
      const srcRouter = ccipRouter[state.srcChain.id];
      const dstRouter = ccipRouter[state.dstChain.id];
      const fees = await readContract(config, {
        address: srcRouter.address,
        abi: srcRouter.abi,
        functionName: 'getFee',
        args: [dstRouter.chainSelectorId, message],
        chainId: srcRouter.chainId,
      });
      const { request } = await simulateContract(config, {
        address: srcRouter.address,
        abi: srcRouter.abi,
        functionName: 'ccipSend',
        args: [dstRouter.chainSelectorId, message],
        chainId: srcRouter.chainId,
        value: fees,
      });
      const hash = await writeContract(config, request);
      setState((state) => ({
        ...state,
        bridge: statuses.bridge.waitingForTransaction(),
      }));
      const txReceipt = await waitForTransactionReceipt(config, { hash });
      if (txReceipt.status === 'success') {
        updateActivity({
          ...activity,
          status: 'success',
        });
        resetState();
        bridgeActivity.waitForTx(hash);
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: 'Transaction reverted',
        });
      }
    } catch (error) {
      setState((state) => ({
        ...state,
        status: 'idle',
        bridge: undefined,
      }));
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
    state.dstChain,
    state.srcChain,
    config,
    updateActivity,
    setState,
    deleteActivity,
    pushNotification,
    intl,
  ]);
};

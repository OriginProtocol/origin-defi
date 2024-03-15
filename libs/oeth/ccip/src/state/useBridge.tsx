import { useCallback } from 'react';

import { trackEvent } from '@origin/oeth/shared';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import { contracts } from '@origin/shared/contracts';
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

export const useBridge = () => {
  const [state, setState] = bridgeStateContainer.useTracked();
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
      const fees = await readContract(config, {
        address: contracts.mainnet.ccipRouter.address,
        abi: contracts.mainnet.ccipRouter.abi,
        functionName: 'getFee',
        args: [ccipRouter[state.dstChain.id].chainSelectorId, message],
        chainId: state.srcChain.id,
      });
      const { request } = await simulateContract(config, {
        address: contracts.mainnet.ccipRouter.address,
        abi: contracts.mainnet.ccipRouter.abi,
        functionName: 'ccipSend',
        args: [ccipRouter[state.dstChain.id].chainSelectorId, message],
        chainId: state.srcChain.id,
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
        setState((state) => ({
          ...state,
          status: 'complete',
          bridge: statuses.bridge.complete(),
        }));
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

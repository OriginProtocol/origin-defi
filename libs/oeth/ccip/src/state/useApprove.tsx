import { useCallback } from 'react';

import { trackEvent } from '@origin/oeth/shared';
import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  ApprovalNotification,
  useDeleteActivity,
  usePushActivity,
  usePushNotification,
  useUpdateActivity,
} from '@origin/shared/providers';
import { formatError, isUserRejected } from '@origin/shared/utils';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { useIntl } from 'react-intl';
import { useConfig } from 'wagmi';

import { ccipRouter } from '../ccip';
import { bridgeStateContainer } from './state';
import { statuses } from './statuses';

import type { erc20Abi } from 'viem';

export const useApprove = () => {
  const [state, setState] = bridgeStateContainer.useTracked();
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
      setState((state) => ({
        ...state,
        status: 'pending',
        approval: statuses.bridge.waitingForSignature(),
      }));
      const hash = await writeContract(config, {
        chainId: state.srcToken.chainId,
        address: state.srcToken.address,
        abi: state.srcToken.abi as typeof erc20Abi,
        functionName: 'approve',
        args: [ccipRouter[state.srcToken.chainId].address, state.amount],
      });
      setState((state) => ({
        ...state,
        approval: statuses.bridge.waitingForTransaction(),
      }));
      const txReceipt = await waitForTransactionReceipt(config, { hash });
      setState((state) => ({
        ...state,
        status: 'idle',
        approval: undefined,
        allowance: undefined,
      }));
      if (txReceipt.status === 'success') {
        updateActivity({
          ...activity,
          status: 'success',
        });
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
        approval: undefined,
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

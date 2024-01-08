import { useCallback } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  isNilOrEmpty,
  isUserRejected,
  subtractSlippage,
} from '@origin/shared/utils';
import { waitForTransaction, writeContract } from '@wagmi/core';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { useAccount, useQueryClient } from 'wagmi';

import {
  RedeemNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../activities';
import { usePushNotification } from '../notifications';
import { useSlippage } from '../slippage';
import { prepareWriteContractWithTxTracker } from '../txTracker';
import { MIX_TOKEN } from './constants';
import { useRedeemState } from './state';

export const useHandleAmountInChange = () => {
  const [, setRedeemState] = useRedeemState();

  return useCallback(
    (amount: bigint) => {
      setRedeemState(
        produce((state) => {
          if (state.amountIn !== amount) {
            state.amountIn = amount;
            state.isEstimateLoading = amount !== 0n;
          }
        }),
      );
    },
    [setRedeemState],
  );
};

export const useHandleRedeem = () => {
  const intl = useIntl();
  const { value: slippage } = useSlippage();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { address } = useAccount();
  const [
    { amountIn, amountOut, gas, trackEvent, tokenIn, vaultContract, gasBuffer },
    setRedeemState,
  ] = useRedeemState();
  const wagmiClient = useQueryClient();

  return useCallback(async () => {
    if (amountIn === 0n || isNilOrEmpty(address)) {
      return;
    }

    const minAmountOut = subtractSlippage(
      amountOut,
      MIX_TOKEN.decimals,
      slippage,
    );

    const activity = pushActivity({
      type: 'redeem',
      status: 'pending',
      tokenIn,
      tokenOut: MIX_TOKEN,
      amountIn,
      amountOut,
    });

    setRedeemState(
      produce((draft) => {
        draft.isRedeemWaitingForSignature = true;
      }),
    );
    trackEvent({
      name: 'redeem_started',
      redeem_amount: amountIn,
    });
    try {
      const { request } = await prepareWriteContractWithTxTracker({
        address: vaultContract.address,
        abi: vaultContract.abi,
        functionName: 'redeem',
        args: [amountIn, minAmountOut],
        gas: gas + (gas * gasBuffer) / 100n,
      });
      const { hash } = await writeContract(request);
      setRedeemState(
        produce((draft) => {
          draft.isRedeemWaitingForSignature = false;
          draft.isRedeemLoading = true;
        }),
      );
      const txReceipt = await waitForTransaction({ hash });
      wagmiClient.invalidateQueries({ queryKey: ['redeem_balance'] });
      setRedeemState(
        produce((draft) => {
          draft.isRedeemLoading = false;
          draft.amountIn = 0n;
          draft.amountOut = 0n;
          draft.split.forEach((a) => (a.amount = 0n));
        }),
      );
      updateActivity({ ...activity, status: 'success', txReceipt });
      pushNotification({
        content: (
          <RedeemNotification
            {...activity}
            status="success"
            txReceipt={txReceipt}
          />
        ),
      });
      trackEvent({
        name: 'redeem_complete',
        redeem_amount: amountIn,
      });
    } catch (error) {
      setRedeemState(
        produce((draft) => {
          draft.isRedeemWaitingForSignature = false;
          draft.isRedeemLoading = false;
        }),
      );
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
          name: 'redeem_rejected',
          redeem_amount: amountIn,
        });
      } else {
        updateActivity({
          ...activity,
          status: 'error',
          error: error?.shortMessage ?? error.message,
        });
        pushNotification({
          content: (
            <RedeemNotification
              {...activity}
              status="error"
              error={error?.shortMessage ?? error.message}
            />
          ),
        });
        trackEvent({
          name: 'redeem_failed',
          redeem_amount: amountIn,
          redeem_error: error?.shortMessage ?? error.message,
        });
      }
    }
  }, [
    address,
    amountIn,
    amountOut,
    deleteActivity,
    gas,
    gasBuffer,
    intl,
    pushActivity,
    pushNotification,
    setRedeemState,
    slippage,
    tokenIn,
    trackEvent,
    updateActivity,
    vaultContract.abi,
    vaultContract.address,
    wagmiClient,
  ]);
};

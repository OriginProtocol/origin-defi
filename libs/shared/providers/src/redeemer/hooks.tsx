import { useCallback } from 'react';

import { NotificationSnack, SeverityIcon } from '@origin/shared/components';
import {
  formatError,
  isNilOrEmpty,
  isUserRejected,
  subPercentage,
} from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { add, div, from, gt, mul } from 'dnum';
import { produce } from 'immer';
import { uniq } from 'ramda';
import { useIntl } from 'react-intl';
import { useAccount, useConfig } from 'wagmi';

import {
  RedeemNotification,
  useDeleteActivity,
  usePushActivity,
  useUpdateActivity,
} from '../activities';
import { usePushNotification } from '../notifications';
import { getTokenPriceKey, useTokenPrices } from '../prices';
import { useSlippage } from '../slippage';
import { simulateContractWithTxTracker } from '../txTracker';
import { MIX_TOKEN } from './constants';
import { useRedeemState } from './state';

import type { Dnum } from 'dnum';
import type { TransactionReceipt } from 'viem';

export const useHandleRedeemAmountInChange = () => {
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
  const config = useConfig();
  const queryClient = useQueryClient();
  const pushNotification = usePushNotification();
  const pushActivity = usePushActivity();
  const updateActivity = useUpdateActivity();
  const deleteActivity = useDeleteActivity();
  const { address } = useAccount();
  const [
    { amountIn, amountOut, gas, trackEvent, tokenIn, vaultContract, gasBuffer },
    setRedeemState,
  ] = useRedeemState();
  const { value: slippage } = useSlippage();

  return useCallback(async () => {
    if (amountIn === 0n || isNilOrEmpty(address)) {
      return;
    }

    const minAmountOut = subPercentage(
      [amountOut ?? 0n, MIX_TOKEN.decimals],
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
      const { request } = await simulateContractWithTxTracker(config, {
        address: vaultContract.address,
        abi: vaultContract.abi,
        functionName: 'redeem',
        args: [amountIn, minAmountOut[0]],
        gas: gas + (gas * gasBuffer) / 100n,
        chainId: vaultContract.chainId,
      });
      const hash = await writeContract(config, request);
      setRedeemState(
        produce((draft) => {
          draft.isRedeemWaitingForSignature = false;
          draft.isRedeemLoading = true;
        }),
      );
      const txReceipt = await waitForTransactionReceipt(config, { hash });
      queryClient.invalidateQueries({ queryKey: ['redeem_balance'] });
      setRedeemState(
        produce((draft) => {
          draft.isRedeemLoading = false;
          draft.amountIn = 0n;
          draft.amountOut = 0n;
          draft.split.forEach((a) => (a.amount = 0n));
        }),
      );
      updateActivity({
        ...activity,
        status: 'success',
        txReceipt: txReceipt as unknown as TransactionReceipt,
      });
      pushNotification({
        content: (
          <RedeemNotification
            {...activity}
            status="success"
            txReceipt={txReceipt as unknown as TransactionReceipt}
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
          error: formatError(error),
        });
        pushNotification({
          content: (
            <RedeemNotification
              {...activity}
              status="error"
              error={formatError(error)}
            />
          ),
        });
        trackEvent({
          name: 'redeem_failed',
          redeem_amount: amountIn,
          redeem_error: formatError(error),
        });
      }
    }
  }, [
    address,
    amountIn,
    amountOut,
    config,
    deleteActivity,
    gas,
    gasBuffer,
    intl,
    pushActivity,
    pushNotification,
    queryClient,
    setRedeemState,
    slippage,
    tokenIn,
    trackEvent,
    updateActivity,
    vaultContract.abi,
    vaultContract.address,
    vaultContract.chainId,
  ]);
};

export const useRedeemerPrices = () => {
  const [{ tokenIn, split }] = useRedeemState();
  const keys = uniq([
    getTokenPriceKey(tokenIn),
    ...split.map((s) => getTokenPriceKey(s.token)),
  ]);

  return useTokenPrices(keys);
};

export const useMixTokenPrice = () => {
  const { data: prices, isLoading: isPricesLoading } = useRedeemerPrices();
  const [{ split, isEstimateLoading }] = useRedeemState();

  const [total, price] =
    isPricesLoading || isEstimateLoading || isNilOrEmpty(prices)
      ? [0, 0]
      : split.reduce(
          (acc, curr) => {
            const val = [curr.amount, curr.token.decimals] as Dnum;

            return [
              add(acc[0], val),
              add(
                acc[1],
                mul(val, prices?.[getTokenPriceKey(curr.token)] ?? 0),
              ),
            ];
          },
          [from(0), from(0)],
        );

  return gt(total, from(0)) ? div(price, total) : from(0);
};

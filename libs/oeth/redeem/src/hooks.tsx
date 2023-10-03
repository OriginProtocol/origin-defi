import { useCallback } from 'react';

import { usePushActivity, useUpdateActivity } from '@origin/oeth/shared';
import { contracts, tokens } from '@origin/shared/contracts';
import {
  BlockExplorerLink,
  usePushNotification,
  useSlippage,
} from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useQueryClient } from 'wagmi';

import { MIX_TOKEN } from './constants';
import { useRedeemState } from './state';

export const useHandleAmountInChange = () => {
  const [, setRedeemState] = useRedeemState();

  return useCallback(
    (amount: bigint) => {
      setRedeemState(
        produce((state) => {
          state.amountIn = amount;
          state.isEstimateLoading = amount !== 0n;
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
  const { address } = useAccount();
  const [{ amountIn, amountOut }, setRedeemState] = useRedeemState();
  const wagmiClient = useQueryClient();

  return useCallback(async () => {
    if (amountIn === 0n || isNilOrEmpty(address)) {
      return;
    }

    const activity = pushActivity({
      type: 'redeem',
      status: 'pending',
      tokenIn: tokens.mainnet.OETH,
      tokenOut: MIX_TOKEN,
      amountIn,
      amountOut,
    });

    setRedeemState(
      produce((draft) => {
        draft.isRedeemLoading = true;
      }),
    );

    try {
      const minAmountOut = parseUnits(
        (
          +formatUnits(amountOut, MIX_TOKEN.decimals) -
          +formatUnits(amountOut, MIX_TOKEN.decimals) * slippage
        ).toString(),
        MIX_TOKEN.decimals,
      );

      const { request } = await prepareWriteContract({
        address: contracts.mainnet.OETHVaultCore.address,
        abi: contracts.mainnet.OETHVaultCore.abi,
        functionName: 'redeem',
        args: [amountIn, minAmountOut],
      });
      const { hash } = await writeContract(request);
      const txReceipt = await waitForTransaction({ hash });

      console.log('redeem vault done!');
      wagmiClient.invalidateQueries({ queryKey: ['redeem_balance'] });
      updateActivity({ ...activity, status: 'success', txReceipt });
      pushNotification({
        title: intl.formatMessage({ defaultMessage: 'Redeem complete' }),
        severity: 'success',
        content: <BlockExplorerLink hash={txReceipt.hash} />,
      });
    } catch (e) {
      console.error(`redeem vault error!\n${e.message}`);
      if (e?.code === 'ACTION_REJECTED') {
        pushNotification({
          title: intl.formatMessage({ defaultMessage: 'Redeem vault' }),
          severity: 'info',
        });
      } else {
        updateActivity({ ...activity, status: 'error', error: e.short });
      }
    }

    setRedeemState(
      produce((draft) => {
        draft.isRedeemLoading = false;
      }),
    );
  }, [
    address,
    amountIn,
    amountOut,
    intl,
    pushActivity,
    pushNotification,
    setRedeemState,
    slippage,
    updateActivity,
    wagmiClient,
  ]);
};

import { useEffect, useState } from 'react';

import { tokens } from '@origin/shared/contracts';
import { isNilOrEmpty, scale, subtractSlippage } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccount, getPublicClient, readContract } from '@wagmi/core';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { formatUnits, isAddressEqual } from 'viem';
import { useConfig } from 'wagmi';

import { usePushNotification } from '../notifications';
import { useSlippage } from '../slippage';
import { MIX_TOKEN } from './constants';

import type { Dispatch, SetStateAction } from 'react';

import type { RedeemState } from './types';

export const { Provider: RedeemProvider, useTracked: useRedeemState } =
  createContainer<
    RedeemState,
    Dispatch<SetStateAction<RedeemState>>,
    Pick<RedeemState, 'tokenIn' | 'vaultContract' | 'trackEvent' | 'gasBuffer'>
  >(({ tokenIn, vaultContract, trackEvent, gasBuffer }) => {
    const [state, setState] = useState<RedeemState>({
      tokenIn,
      vaultContract,
      gasBuffer,
      trackEvent,
      amountIn: 0n,
      amountOut: 0n,
      split: [],
      gas: 0n,
      rate: 0,
      isEstimateLoading: false,
      isRedeemWaitingForSignature: false,
      isRedeemLoading: false,
    });
    const intl = useIntl();
    const queryClient = useQueryClient();
    const config = useConfig();
    const pushNotification = usePushNotification();
    const { value: slippage } = useSlippage();

    const { data: splitAddresses } = useQuery({
      queryKey: ['assetsDecimals'],
      queryFn: async () => {
        const assets = await readContract(config, {
          address: vaultContract.address,
          abi: vaultContract.abi,
          functionName: 'getAllAssets',
        });

        return assets;
      },
      staleTime: Infinity,
    });

    useEffect(() => {
      if (splitAddresses) {
        setState(
          produce((draft) => {
            draft.split = splitAddresses.map((a) => ({
              amount: 0n,
              token: Object.values(tokens.mainnet).find(
                (t) => !isNilOrEmpty(t.address) && isAddressEqual(a, t.address),
              ),
            }));
          }),
        );
      }
    }, [splitAddresses]);

    useDebouncedEffect(
      async () => {
        if (state.amountIn === 0n) {
          setState(
            produce((draft) => {
              draft.amountOut = 0n;
              draft.split.forEach((a) => (a.amount = 0n));
              draft.isEstimateLoading = false;
              draft.isRedeemWaitingForSignature = false;
            }),
          );
          return;
        }

        let splitEstimates;
        try {
          splitEstimates = await queryClient.fetchQuery({
            queryKey: ['splitEstimates', state.amountIn.toString()],
            queryFn: async () =>
              readContract(config, {
                address: vaultContract.address,
                abi: vaultContract.abi,
                functionName: 'calculateRedeemOutputs',
                args: [state.amountIn],
              }),
          });
        } catch (error) {
          console.error(`Fail to estimate redeem operation.\n${error.message}`);
          setState(
            produce((draft) => {
              draft.amountIn = 0n;
              draft.amountOut = 0n;
              draft.split = [];
              draft.isEstimateLoading = false;
              draft.isRedeemWaitingForSignature = false;
            }),
          );
          pushNotification({
            title: intl.formatMessage({
              defaultMessage: 'Error while estimating',
            }),
            message: error?.shortMessage ?? error.message,
            severity: 'error',
          });

          return;
        }

        const total = splitEstimates.reduce((acc, curr, i) => {
          return (
            acc + scale(curr, state.split[i].token.decimals, MIX_TOKEN.decimals)
          );
        }, 0n);

        let gasEstimate = 0n;
        const publicClient = getPublicClient(config);
        const { address } = getAccount(config);

        const minAmountOut = subtractSlippage(
          total,
          MIX_TOKEN.decimals,
          slippage,
        );

        try {
          gasEstimate = await queryClient.fetchQuery({
            queryKey: [
              'estimateGasRedeem',
              state.amountIn.toString(),
              minAmountOut.toString(),
              address,
            ],
            queryFn: () =>
              publicClient.estimateContractGas({
                address: vaultContract.address,
                abi: vaultContract.abi,
                functionName: 'redeem',
                args: [state.amountIn, minAmountOut],
                account: address,
              }),
          });
        } catch {
          gasEstimate = 1500000n;
        }

        setState(
          produce((draft) => {
            draft.amountOut = total;
            draft.split.forEach((a, i) => (a.amount = splitEstimates[i]));
            draft.gas = gasEstimate;
            draft.rate =
              +formatUnits(total, MIX_TOKEN.decimals) /
              +formatUnits(state.amountIn, tokenIn.decimals);
            draft.isEstimateLoading = false;
          }),
        );
      },
      [state.amountIn],
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });

import { useEffect, useState } from 'react';

import { contracts, tokens, whales } from '@origin/shared/contracts';
import { usePushNotification, useSlippage } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccount, getPublicClient, readContract } from '@wagmi/core';
import { produce } from 'immer';
import { useIntl } from 'react-intl';
import { createContainer } from 'react-tracked';
import { formatUnits, isAddressEqual, parseUnits } from 'viem';

import { MIX_TOKEN } from './constants';

import type { RedeemState } from './types';

export const { Provider: RedeemProvider, useTracked: useRedeemState } =
  createContainer(() => {
    const [state, setState] = useState<RedeemState>({
      amountIn: 0n,
      amountOut: 0n,
      split: [],
      gas: 0n,
      rate: 0,
      isEstimateLoading: false,
      isRedeemLoading: false,
    });
    const intl = useIntl();
    const queryClient = useQueryClient();
    const pushNotification = usePushNotification();
    const { value: slippage } = useSlippage();

    const { data: splitAddresses } = useQuery({
      queryKey: ['assetsDecimals'],
      queryFn: async () => {
        const assets = await readContract({
          address: contracts.mainnet.OETHVaultCore.address,
          abi: contracts.mainnet.OETHVaultCore.abi,
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
            }),
          );
          return;
        }

        let splitEstimates;
        try {
          splitEstimates = await queryClient.fetchQuery({
            queryKey: ['splitEstimates', state.amountIn.toString()],
            queryFn: async () =>
              readContract({
                address: contracts.mainnet.OETHVaultCore.address,
                abi: contracts.mainnet.OETHVaultCore.abi,
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
          if (state.split[i].token.decimals !== MIX_TOKEN.decimals) {
            const exp = MIX_TOKEN.decimals - state.split[i].token.decimals;

            return acc + curr * (10n ^ BigInt(exp));
          }

          return acc + curr;
        }, 0n);

        let gasEstimate = 0n;
        const publicClient = getPublicClient();
        const { address } = getAccount();

        const minAmountOut = parseUnits(
          (
            +formatUnits(total, MIX_TOKEN.decimals) -
            +formatUnits(total, MIX_TOKEN.decimals) * slippage
          ).toString(),
          MIX_TOKEN.decimals,
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
                address: contracts.mainnet.OETHVaultCore.address,
                abi: contracts.mainnet.OETHVaultCore.abi,
                functionName: 'redeem',
                args: [state.amountIn, minAmountOut],
                account: whales.mainnet.OETH,
              }),
          });
        } catch (error) {
          console.log(`Redeem uses fix gas estimate: 1500000`);
          gasEstimate = 1500000n;
        }

        setState(
          produce((draft) => {
            draft.amountOut = total;
            draft.split.forEach((a, i) => (a.amount = splitEstimates[i]));
            draft.gas = gasEstimate;
            draft.rate =
              +formatUnits(total, MIX_TOKEN.decimals) /
              +formatUnits(state.amountIn, tokens.mainnet.OETH.decimals);
            draft.isEstimateLoading = false;
          }),
        );
      },
      [state.amountIn],
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });

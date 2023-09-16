import { useEffect, useState } from 'react';

import { contracts, tokens, whales } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useDebouncedEffect } from '@react-hookz/web';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAccount, getPublicClient, readContract } from '@wagmi/core';
import { produce } from 'immer';
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
      slippage: 0.01,
      isEstimateLoading: false,
      isRedeemLoading: false,
    });
    const queryClient = useQueryClient();

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

        const splitEstimates = await queryClient.fetchQuery({
          queryKey: ['splitEstimates', state.amountIn.toString()],
          queryFn: () =>
            readContract({
              address: contracts.mainnet.OETHVaultCore.address,
              abi: contracts.mainnet.OETHVaultCore.abi,
              functionName: 'calculateRedeemOutputs',
              args: [state.amountIn],
            }),
        });

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
            +formatUnits(total, MIX_TOKEN.decimals) * state.slippage
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
        } catch (e) {
          console.error(
            `redeem vault estimate gas error. Using default!\n${e.message}`,
          );
          gasEstimate = 1500000n;
        }

        setState(
          produce((draft) => {
            draft.amountOut = total;
            draft.split.forEach((a, i) => (a.amount = splitEstimates[i]));
            draft.gas = gasEstimate;
            draft.rate =
              +formatUnits(state.amountIn, tokens.mainnet.OETH.decimals) /
              +formatUnits(total, MIX_TOKEN.decimals);
            draft.isEstimateLoading = false;
          }),
        );
      },
      [state.amountIn],
      state.amountIn === 0n ? 0 : 800,
    );

    return [state, setState];
  });

import { contracts } from '@origin/shared/contracts';
import { getReferrerId, useTokenPrice } from '@origin/shared/providers';
import { isNilOrEmpty, subPercentage } from '@origin/shared/utils';
import { getAccount, simulateContract, writeContract } from '@wagmi/core';
import { div, eq, setDecimals } from 'dnum';
import { formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (
  { config, queryClient },
  { amountIn, tokenIn, tokenOut },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const price = await queryClient.fetchQuery({
    queryKey: useTokenPrice.getKey('1:primeETH_1:ETH'),
    queryFn: useTokenPrice.fetcher(config, queryClient),
  });

  if (!price || eq(price, 0)) {
    return 0n;
  }

  const estimate = div([amountIn, tokenIn.decimals], price, {
    rounding: 'ROUND_DOWN',
  });

  return setDecimals(estimate, tokenOut.decimals)[0];
};

const estimateRoute: EstimateRoute = async (
  config,
  { tokenIn, tokenOut, amountIn, route },
) => {
  const [estimatedAmount, allowanceAmount] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
  ]);

  return {
    ...route,
    estimatedAmount,
    allowanceAmount,
    approvalGas: 0n,
    gas: 0n,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const allowance: Allowance = async () => {
  return maxUint256;
};

const approve: Approve = async () => {
  return null;
};

const swap: Swap = async (
  { config },
  { tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);
  const referrerId = getReferrerId();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return null;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const { request } = await simulateContract(config, {
    address: contracts.mainnet.PrimeETHZapper.address,
    abi: contracts.mainnet.PrimeETHZapper.abi,
    functionName: 'deposit',
    args: [minAmountOut[0], referrerId ?? ''],
    value: amountIn,
    account: address,
    chainId: contracts.mainnet.PrimeETHZapper.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const swapZapperPrime = {
  ...defaultRoute,
  estimateAmount,
  estimateRoute,
  allowance,
  approve,
  swap,
};

import { contracts, tokens } from '@origin/shared/contracts';
import {
  isNilOrEmpty,
  subPercentage,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { path } from 'ramda';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';
import type { EstimateAmount } from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';
import type { Abi } from 'viem';

const metropolisConfig: Record<
  string,
  Record<
    string,
    (
      amountIn: bigint,
      minAmountOut: bigint,
      address: `0x${string}`,
    ) => {
      address: HexAddress;
      abi: Abi;
      functionName: string;
      value?: bigint;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: any[];
    }
  >
> = {
  [tokens.sonic.S.id]: {
    [tokens.sonic.OS.id]: (amountIn, minAmountOut, address) => ({
      address: contracts.sonic.metropolisRouter.address,
      abi: contracts.sonic.metropolisRouter.abi,
      functionName: 'swapExactNATIVEForTokens',
      value: amountIn,
      args: [
        minAmountOut,
        [[1n], [2n], [tokens.sonic.wS.address, tokens.sonic.OS.address]],
        address,
        999999999999999999n,
      ],
    }),
  },
  [tokens.sonic.wS.id]: {
    [tokens.sonic.OS.id]: (amountIn, minAmountOut, address) => ({
      address: contracts.sonic.metropolisRouter.address,
      abi: contracts.sonic.metropolisRouter.abi,
      functionName: 'swapExactTokensForTokens',
      args: [
        amountIn,
        minAmountOut,
        [
          [0n, 25n],
          [0n, 2n],
          [
            tokens.sonic.wS.address,
            '0x29219dd400f2Bf60E5a23d13Be72B486D4038894',
            tokens.sonic.OS.address,
          ],
        ],
        address,
        999999999999999999n,
      ],
    }),
  },
  [tokens.sonic.OS.id]: {
    [tokens.sonic.S.id]: (amountIn, minAmountOut, address) => ({
      address: contracts.sonic.metropolisRouter.address,
      abi: contracts.sonic.metropolisRouter.abi,
      functionName: 'swapExactTokensForNATIVE',
      args: [
        amountIn,
        minAmountOut,
        [[1n], [2n], [tokens.sonic.OS.address, tokens.sonic.wS.address]],
        address,
        999999999999999999n,
      ],
    }),
    [tokens.sonic.wS.id]: (amountIn, minAmountOut, address) => ({
      address: contracts.sonic.metropolisRouter.address,
      abi: contracts.sonic.metropolisRouter.abi,
      functionName: 'swapExactTokensForTokens',
      args: [
        amountIn,
        minAmountOut,
        [[1n], [2n], [tokens.sonic.OS.address, tokens.sonic.wS.address]],
        address,
        999999999999999999n,
      ],
    }),
  },
};

const isRouteAvailable: IsRouteAvailable = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  return !isNilOrEmpty(path([tokenIn.id, tokenOut.id], metropolisConfig));
};

const estimateAmount: EstimateAmount = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  try {
    const estimate = await readContract(config, {
      address: contracts.sonic.metropolisQuoter.address,
      abi: contracts.sonic.metropolisQuoter.abi,
      functionName: 'findBestPathFromAmountIn',
      args: [
        [
          tokenIn?.address ?? tokens.sonic.wS.address,
          tokenOut?.address ?? tokens.sonic.wS.address,
        ],
        amountIn,
      ],
      chainId: contracts.sonic.metropolisQuoter.chainId,
    });

    return estimate.amounts[1];
  } catch {}

  return 0n;
};

const estimateGas: EstimateGas = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });
  const metroConfig = path([tokenIn.id, tokenOut.id], metropolisConfig);

  if (amountIn === 0n || !publicClient || !metroConfig) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas(
      metroConfig(amountIn, minAmountOut[0], address ?? ZERO_ADDRESS),
    );

    return gasEstimate;
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const { address } = getAccount(config);

  if (!address || !tokenIn.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.sonic.metropolisRouter.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (amountIn === 0n || !address || !publicClient || !tokenIn?.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.sonic.metropolisRouter.address, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  client,
  { tokenIn, tokenOut, amountIn, route, slippage },
) => {
  if (amountIn === 0n) {
    return {
      ...route,
      estimatedAmount: 0n,
      gas: 0n,
      rate: 0,
      allowanceAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(client, { tokenIn, tokenOut, amountIn }),
    allowance(client, { tokenIn, tokenOut }),
    estimateApprovalGas(client, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(client, {
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    amountOut: estimatedAmount,
  });

  return {
    ...route,
    estimatedAmount,
    gas,
    approvalGas,
    allowanceAmount,
    rate:
      +formatUnits(estimatedAmount, tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
  };
};

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  if (!tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.sonic.metropolisRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config },
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);
  const metroConfig = path([tokenIn.id, tokenOut.id], metropolisConfig);

  if (amountIn === 0n || !address || !metroConfig) {
    return null;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  const { request } = await simulateContract(
    config,
    metroConfig(amountIn, minAmountOut[0], address ?? ZERO_ADDRESS),
  );
  const hash = await writeContract(config, request);

  return hash;
};

export const osMetropolis = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};

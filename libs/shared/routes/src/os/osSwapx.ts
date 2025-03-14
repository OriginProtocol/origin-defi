import { contracts, tokens } from '@origin/shared/contracts';
import { subPercentage, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { encodeFunctionData, erc20Abi, formatUnits, maxUint256 } from 'viem';

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

const isRouteAvailable: IsRouteAvailable = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  return true;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { tokenIn, tokenOut, amountIn },
) => {
  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });
  if (amountIn === 0n || !publicClient) {
    return 0n;
  }
  try {
    const quote = await simulateContract(config, {
      address: contracts.sonic.swapxQuoter.address,
      abi: contracts.sonic.swapxQuoter.abi,
      functionName: 'quoteExactInputSingle',
      chainId: tokenIn.chainId,
      args: [
        {
          tokenIn: tokenIn?.address ?? tokens.sonic.wS.address,
          tokenOut: tokenOut?.address ?? tokens.sonic.wS.address,
          amountIn,
          limitSqrtPrice: 0n,
        },
      ],
    });

    return quote.result[0];
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

  if (amountIn === 0n || !publicClient) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );
  try {
    if (!tokenOut.address) {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.sonic.swapxRouter.address,
        abi: contracts.sonic.swapxRouter.abi,
        functionName: 'multicall',
        args: [
          [
            encodeFunctionData({
              abi: contracts.sonic.swapxRouter.abi,
              functionName: 'exactInputSingle',
              args: [
                {
                  amountIn,
                  amountOutMinimum: minAmountOut[0],
                  limitSqrtPrice: 0n,
                  recipient: '0x0000000000000000000000000000000000000002',
                  tokenIn: tokenIn.address ?? tokens.sonic.wS.address,
                  tokenOut: tokens.sonic.wS.address,
                },
              ],
            }),
            encodeFunctionData({
              abi: contracts.sonic.swapxRouter.abi,
              functionName: 'unwrapWNativeToken',
              args: [minAmountOut[0], address ?? ZERO_ADDRESS],
            }),
          ],
        ],
      });
    } else {
      gasEstimate = await publicClient.estimateContractGas({
        address: contracts.sonic.swapxRouter.address,
        abi: contracts.sonic.swapxRouter.abi,
        functionName: 'exactInputSingle',
        args: [
          {
            amountIn,
            amountOutMinimum: minAmountOut[0],
            limitSqrtPrice: 0n,
            recipient: address ?? ZERO_ADDRESS,
            tokenIn: tokenIn.address ?? tokens.sonic.wS.address,
            tokenOut: tokenOut.address,
          },
        ],
        ...(!tokenIn.address && { value: amountIn }),
      });
    }
  } catch {
    gasEstimate = 400000n;
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (!address) {
    return 0n;
  }

  if (!tokenIn.address) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.sonic.swapxRouter.address],
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

  if (amountIn === 0n || !address || !publicClient || !tokenIn.address) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.sonic.swapxRouter.address, amountIn],
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
    args: [contracts.sonic.swapxRouter.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { tokenIn, tokenOut, amountIn, slippage, amountOut, estimatedRoute },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || !address) {
    return null;
  }

  const minAmountOut = subPercentage(
    [amountOut ?? 0n, tokenOut.decimals],
    slippage,
  );

  if (!tokenOut.address) {
    const { request } = await simulateContract(config, {
      address: contracts.sonic.swapxRouter.address,
      abi: contracts.sonic.swapxRouter.abi,
      chainId: tokenIn.chainId,
      functionName: 'multicall',
      args: [
        [
          encodeFunctionData({
            abi: contracts.sonic.swapxRouter.abi,
            functionName: 'exactInputSingle',
            args: [
              {
                amountIn,
                amountOutMinimum: minAmountOut[0],
                limitSqrtPrice: 0n,
                recipient: '0x0000000000000000000000000000000000000002',
                tokenIn: tokenIn.address ?? tokens.sonic.wS.address,
                tokenOut: tokens.sonic.wS.address,
              },
            ],
          }),
          encodeFunctionData({
            abi: contracts.sonic.swapxRouter.abi,
            functionName: 'unwrapWNativeToken',
            args: [minAmountOut[0], address],
          }),
        ],
      ],
    });
    const hash = await writeContract(config, request);

    return hash;
  }

  const { request } = await simulateContract(config, {
    address: contracts.sonic.swapxRouter.address,
    abi: contracts.sonic.swapxRouter.abi,
    functionName: 'exactInputSingle',
    args: [
      {
        amountIn,
        amountOutMinimum: minAmountOut[0],
        limitSqrtPrice: 0n,
        recipient: address ?? ZERO_ADDRESS,
        tokenIn: tokenIn.address ?? tokens.sonic.wS.address,
        tokenOut: tokenOut.address,
      },
    ],
    ...(!tokenIn.address && { value: amountIn }),
  });
  const hash = await writeContract(config, request);

  return hash;
};

export const osSwapx = {
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

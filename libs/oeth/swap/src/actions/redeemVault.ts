import { queryClient } from '@origin/oeth/shared';
import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  readContracts,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256, parseUnits } from 'viem';

import { MIX_TOKEN } from '../constants';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async ({ amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const assetsDecimals = await queryClient.fetchQuery({
    queryKey: ['assetsDecimals'],
    queryFn: async () => {
      const assets = await readContract({
        address: contracts.mainnet.OETHVaultCore.address,
        abi: contracts.mainnet.OETHVaultCore.abi,
        functionName: 'getAllAssets',
      });

      const decimals = await readContracts({
        contracts: assets.map((address) => ({
          address,
          abi: erc20ABI,
          functionName: 'decimals',
        })),
      });

      return decimals.map((r) => r.result);
    },
    staleTime: Infinity,
  });

  const split = await readContract({
    address: contracts.mainnet.OETHVaultCore.address,
    abi: contracts.mainnet.OETHVaultCore.abi,
    functionName: 'calculateRedeemOutputs',
    args: [amountIn],
  });

  return split.reduce((acc, curr, i) => {
    if (assetsDecimals[i] !== MIX_TOKEN.decimals) {
      const exp = MIX_TOKEN.decimals - assetsDecimals[i];

      return acc + curr * (10n ^ BigInt(exp));
    }

    return acc + curr;
  }, 0n);
};

const estimateGas: EstimateGas = async ({
  tokenOut,
  amountIn,
  slippage,
  amountOut,
}) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();
  const { address } = getAccount();

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHVaultCore.address,
      abi: contracts.mainnet.OETHVaultCore.abi,
      functionName: 'redeem',
      args: [amountIn, minAmountOut],
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async () => {
  // Redeem OETH does not require approval
  return maxUint256;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  // Redeem OETH does not require approval
  return 0n;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
}) => {
  if (amountIn === 0n) {
    return {
      ...route,
      estimatedAmount: 0n,
      gas: 0n,
      rate: 0,
      approvedAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, approvedAmount, approvalGas] = await Promise.all([
    estimateAmount({
      tokenIn,
      tokenOut,
      amountIn,
    }),
    allowance({ tokenIn, tokenOut }),
    estimateApprovalGas({ amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas({
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
    approvedAmount,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

const approve: Approve = async ({ onSuccess }) => {
  // Redeem OETH does not require approval
  if (onSuccess) {
    await onSuccess(null);
  }
};

const swap: Swap = async ({
  tokenOut,
  amountIn,
  slippage,
  amountOut,
  onSuccess,
  onError,
  onReject,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const minAmountOut = parseUnits(
    (
      +formatUnits(amountOut, tokenOut.decimals) -
      +formatUnits(amountOut, tokenOut.decimals) * slippage
    ).toString(),
    tokenOut.decimals,
  );

  try {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.OETHVaultCore.address,
      abi: contracts.mainnet.OETHVaultCore.abi,
      functionName: 'redeem',
      args: [amountIn, minAmountOut],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log('redeem vault done!');
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`redeem vault error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Redeem OETH');
    } else if (onError) {
      await onError('Redeem OETH');
    }
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};

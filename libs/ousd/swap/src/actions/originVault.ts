import { contracts } from '@origin/shared/contracts';
import { addRatio, isNilOrEmpty, scale } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  readContract,
} from '@wagmi/core';
import { formatUnits, parseUnits } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async ({ tokenIn }) => {
  try {
    await readContract({
      address: contracts.mainnet.OUSDVaultCore.address,
      abi: contracts.mainnet.OUSDVaultCore.abi,
      functionName: 'priceUnitMint',
      args: [tokenIn.address],
    });

    return true;
  } catch (e) {
    console.log('dismiss origin vault', e);
  }

  return false;
};

const estimateAmount: EstimateAmount = async ({
  amountIn,
  tokenIn,
  tokenOut,
}) => {
  const scaledAmountIn = scale(amountIn, tokenIn.decimals, 18);
  const priceUnitMint = await readContract({
    address: contracts.mainnet.OUSDVaultCore.address,
    abi: contracts.mainnet.OUSDVaultCore.abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
  });

  const res =
    +formatUnits(scaledAmountIn, 18) * +formatUnits(priceUnitMint, 18);

  return parseUnits(res.toString(), tokenOut.decimals);
};

const estimateGas = async ({
  tokenIn,
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

  const minAmountOut = addRatio(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OUSDVaultCore.address,
      abi: contracts.mainnet.OUSDVaultCore.abi,
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut],
      account: address,
    });

    return gasEstimate;
  } catch {}

  return 0n;
};

const estimateRoute: EstimateRoute = async ({
  tokenIn,
  tokenOut,
  amountIn,
  route,
}) => {
  const [estimatedAmount /* , gas, allowanceAmount, approvalGas */] =
    await Promise.all([
      estimateAmount({ tokenIn, tokenOut, amountIn }),
      // estimateGas(),
      // allowance({ tokenIn, tokenOut }),
      // estimateApprovalGas({ amountIn, tokenIn, tokenOut }),
    ]);

  return {
    ...route,
    estimatedAmount,
    allowanceAmount: 0n,
    approvalGas: 0n,
    gas: 0n,
    rate: 0,
  };
};

const allowance: Allowance = async ({ tokenIn }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDVaultCore.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async () => {
  console.log('Gas approval estimation not implemented');

  return 0n;
};

const approve: Approve = async () => {
  console.log('Approve operation not implemented');
  return null;
};

const swap: Swap = async () => {
  console.log('Route swap operation not implemented');
  return null;
};

export default {
  isRouteAvailable,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};

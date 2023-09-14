import { contracts } from '@origin/shared/contracts';
import { isNilOrEmpty } from '@origin/shared/utils';
import {
  erc20ABI,
  getAccount,
  getPublicClient,
  prepareWriteContract,
  readContract,
  waitForTransaction,
  writeContract,
} from '@wagmi/core';
import { formatUnits, maxUint256 } from 'viem';

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
  return amountIn;
};

const estimateGas: EstimateGas = async ({ amountIn }) => {
  let gasEstimate = 200000n;

  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return gasEstimate;
  }

  const publicClient = getPublicClient();

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'deposit',
      value: amountIn,
      account: address,
    });
  } catch {}

  return gasEstimate;
};

const allowance: Allowance = async ({ tokenIn, tokenOut, amountIn }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return maxUint256;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async ({
  tokenIn,
  tokenOut,
  amountIn,
}) => {
  let approvalEstimate = 0n;
  const { address } = getAccount();

  if (
    amountIn === 0n ||
    isNilOrEmpty(address) ||
    isNilOrEmpty(tokenIn.address) ||
    isNilOrEmpty(tokenOut.address)
  ) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient();

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
      account: address,
    });
  } catch {}

  return approvalEstimate;
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

  const [estimatedAmount, gas, approvedAmount, approvalGas] = await Promise.all(
    [
      estimateAmount({ tokenIn, tokenOut, amountIn }),
      estimateGas({ tokenIn, tokenOut, amountIn, slippage }),
      allowance({ tokenIn, tokenOut, amountIn }),
      estimateApprovalGas({ tokenIn, tokenOut, amountIn }),
    ],
  );

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

const approve: Approve = async ({
  tokenIn,
  tokenOut,
  amountIn,
  onSuccess,
  onError,
  onReject,
}) => {
  if (
    (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) &&
    onSuccess
  ) {
    console.log(`swap eth does not require approval!`);
    onSuccess(null);
  }

  try {
    const { request } = await prepareWriteContract({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log(`swap zapper eth approval done!`);
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap zapper eth approval error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Zapper ETH approval');
    } else if (onError) {
      await onError('Swap Zapper ETH approval');
    }
  }
};

const swap: Swap = async ({
  tokenIn,
  tokenOut,
  amountIn,
  onSuccess,
  onError,
  onReject,
}) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const approved = await allowance({ tokenIn, tokenOut, amountIn });

  if (approved < amountIn) {
    console.error(`swap zapper eth is not approved`);
    if (onError) {
      await onError('Swap Zapper Eth is not approved');
    }
    return;
  }

  try {
    const { request } = await prepareWriteContract({
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'deposit',
      value: amountIn,
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log('swap zapper eth done!');
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap zapper eth error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Zapper Eth');
    } else if (onError) {
      await onError('Swap Zapper Eth');
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

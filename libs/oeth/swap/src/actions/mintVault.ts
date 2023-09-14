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
import { formatUnits, parseUnits } from 'viem';

import type {
  Allowance,
  Approve,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';
import type { EstimateAmount } from '../types';

const estimateAmount: EstimateAmount = async ({
  tokenIn,
  tokenOut,
  amountIn,
}) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const data = await readContract({
    address: contracts.mainnet.OETHVaultCore.address,
    abi: contracts.mainnet.OETHVaultCore.abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
  });

  return parseUnits(
    (
      +formatUnits(amountIn, tokenIn.decimals) *
      +formatUnits(data, tokenIn.decimals)
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas: EstimateGas = async ({
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
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut],
      account: address,
    });

    return gasEstimate;
  } catch {}

  try {
    const [rebaseThreshold, autoAllocateThreshold] =
      await queryClient.fetchQuery({
        queryKey: ['vault-info', tokenOut.address],
        queryFn: () =>
          readContracts({
            contracts: [
              {
                address: contracts.mainnet.OETHVaultCore.address,
                abi: contracts.mainnet.OETHVaultCore.abi,
                functionName: 'rebaseThreshold',
              },
              {
                address: contracts.mainnet.OETHVaultCore.address,
                abi: contracts.mainnet.OETHVaultCore.abi,
                functionName: 'autoAllocateThreshold',
              },
            ],
          }),
        staleTime: Infinity,
      });

    // TODO check validity
    gasEstimate = 220000n;
    if (amountIn > autoAllocateThreshold?.result) {
      gasEstimate = 2900000n;
    } else if (amountIn > rebaseThreshold?.result) {
      gasEstimate = 510000n;
    }
  } catch (e) {
    console.error(`mint vault gas estimate error!\n${e.message}`);
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ tokenIn, amountIn }) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHVaultCore.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async ({
  tokenIn,
  amountIn,
}) => {
  let approvalEstimate = 0n;
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient();

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.OETHVaultCore.address, amountIn],
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

  const [estimatedAmount, approvedAmount, approvalGas] = await Promise.all([
    estimateAmount({ tokenIn, tokenOut, amountIn }),
    allowance({ amountIn, tokenIn, tokenOut }),
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

const approve: Approve = async ({
  tokenIn,
  amountIn,
  onSuccess,
  onError,
  onReject,
}) => {
  try {
    const { request } = await prepareWriteContract({
      address: tokenIn.address,
      abi: erc20ABI,
      functionName: 'approve',
      args: [contracts.mainnet.OETHVaultCore.address, amountIn],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log(`mint vault approval done!`);
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`mint vault approval error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Mint vault approval');
    } else if (onError) {
      await onError('Mint vault approval');
    }
  }
};

const swap: Swap = async ({
  tokenIn,
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

  const approved = await allowance({ tokenIn, tokenOut, amountIn });

  if (approved < amountIn) {
    console.error(`mint vault is not approved`);
    if (onError) {
      await onError('Mint vault is not approved');
    }
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
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log('mint vault done!');
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`mint vault error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Mint vault swap');
    } else if (onError) {
      await onError('Mint vault swap');
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

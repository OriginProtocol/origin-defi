import { contracts, tokens } from '@origin/shared/contracts';
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

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '../types';

const estimateAmount: EstimateAmount = async ({ tokenOut, amountIn }) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const [previewRedeem, priceUnitMint] = await readContracts({
    contracts: [
      {
        address: tokens.mainnet.sfrxETH.address,
        abi: tokens.mainnet.sfrxETH.abi,
        functionName: 'previewRedeem',
        args: [amountIn],
      },
      {
        address: contracts.mainnet.OETHVaultCore.address,
        abi: contracts.mainnet.OETHVaultCore.abi,
        functionName: 'priceUnitMint',
        args: [tokens.mainnet.frxETH.address],
      },
    ],
  });

  return parseUnits(
    (
      +formatUnits(previewRedeem?.result, tokens.mainnet.frxETH.decimals) *
      +formatUnits(priceUnitMint?.result, tokenOut.decimals)
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas: EstimateGas = async () => {
  return 90000n;
};

const allowance: Allowance = async ({ tokenIn, tokenOut }) => {
  const { address } = getAccount();

  if (isNilOrEmpty(address)) {
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
  } catch {
    approvalEstimate = 64000n;
  }

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
      allowanceAmount: 0n,
      approvalGas: 0n,
    };
  }

  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount({ tokenIn, tokenOut, amountIn }),
      estimateGas({ tokenIn, tokenOut, amountIn, slippage }),
      allowance({ tokenIn, tokenOut }),
      estimateApprovalGas({ tokenIn, tokenOut, amountIn }),
    ]);

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
    console.log(`swap zapper does not require approval!`);
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

    console.log(`swap zapper approval done!`);
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap zapper approval error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Zapper approval');
    } else if (onError) {
      await onError('Swap Zapper approval');
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

  const approved = await allowance({ tokenIn, tokenOut });

  if (approved < amountIn) {
    console.error(`swap zapper is not approved`);
    if (onError) {
      await onError('Swap Zapper is not approved');
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
      address: contracts.mainnet.OETHZapper.address,
      abi: contracts.mainnet.OETHZapper.abi,
      functionName: 'depositSFRXETH',
      args: [amountIn, minAmountOut],
    });
    const { hash } = await writeContract(request);
    const txReceipt = await waitForTransaction({ hash });

    console.log('swap zapper sfrxEth done!');
    if (onSuccess) {
      await onSuccess(txReceipt);
    }
  } catch (e) {
    console.error(`swap zapper sfrxEth error!\n${e.message}`);
    if (e?.code === 'ACTION_REJECTED' && onReject) {
      await onReject('Swap Zapper');
    } else if (onError) {
      await onError('Swap Zapper');
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

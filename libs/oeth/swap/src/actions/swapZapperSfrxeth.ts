import { contracts, tokens } from '@origin/shared/contracts';
import { simulateContractWithTxTracker } from '@origin/shared/providers';
import { isNilOrEmpty, subtractSlippage } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  readContracts,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256, parseUnits } from 'viem';

import { GAS_BUFFER } from '../constants';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const estimateAmount: EstimateAmount = async (
  config,
  { tokenOut, amountIn },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const [previewRedeem, priceUnitMint] = await readContracts(config, {
    contracts: [
      {
        address: tokens.mainnet.sfrxETH.address,
        abi: tokens.mainnet.sfrxETH.abi,
        functionName: 'previewRedeem',
        args: [amountIn],
      },
      {
        address: contracts.mainnet.OETHVault.address,
        abi: contracts.mainnet.OETHVault.abi,
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

const allowance: Allowance = async (config, { tokenIn, tokenOut }) => {
  const { address } = getAccount(config);

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHZapper.address],
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, tokenOut, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (
    amountIn === 0n ||
    isNilOrEmpty(address) ||
    isNilOrEmpty(tokenIn.address) ||
    isNilOrEmpty(tokenOut.address)
  ) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: erc20Abi,
      functionName: 'approve',
      args: [contracts.mainnet.OETHZapper.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const estimateRoute: EstimateRoute = async (
  config,
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

  const [estimatedAmount, gas, allowanceAmount, approvalGas] =
    await Promise.all([
      estimateAmount(config, { tokenIn, tokenOut, amountIn }),
      estimateGas(config, { tokenIn, tokenOut, amountIn, slippage }),
      allowance(config, { tokenIn, tokenOut }),
      estimateApprovalGas(config, { tokenIn, tokenOut, amountIn }),
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

const approve: Approve = async (config, { tokenIn, tokenOut, amountIn }) => {
  if (isNilOrEmpty(tokenIn.address) || isNilOrEmpty(tokenOut.address)) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [contracts.mainnet.OETHZapper.address, amountIn],
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Swap zapper sfrxETH is not approved`);
  }

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  const estimatedGas = await estimateGas(config, {
    amountIn,
    slippage,
    tokenIn,
    tokenOut,
    amountOut,
  });
  const gas = estimatedGas + (estimatedGas * GAS_BUFFER) / 100n;

  const { request } = await simulateContractWithTxTracker(config, {
    address: contracts.mainnet.OETHZapper.address,
    abi: contracts.mainnet.OETHZapper.abi,
    functionName: 'depositSFRXETH',
    args: [amountIn, minAmountOut],
    gas,
  });
  const hash = await writeContract(config, request);

  return hash;
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

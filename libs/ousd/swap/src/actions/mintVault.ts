import { queryClient } from '@origin/ousd/shared';
import { contracts } from '@origin/shared/contracts';
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
import { formatUnits, parseUnits } from 'viem';

import { GAS_BUFFER } from '../constants';

import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
} from '@origin/shared/providers';

const isRouteAvailable: IsRouteAvailable = async (
  config,
  { amountIn, tokenIn },
) => {
  try {
    const priceUnitMint = await readContract(config, {
      address: contracts.mainnet.OUSDVault.address,
      abi: contracts.mainnet.OUSDVault.abi,
      functionName: 'priceUnitMint',
      args: [tokenIn.address],
    });

    return (
      +formatUnits(amountIn, tokenIn.decimals) *
        +formatUnits(priceUnitMint, 18) >
      +formatUnits(1n, tokenIn.decimals)
    );
  } catch {}

  return false;
};

const estimateAmount: EstimateAmount = async (
  config,
  { amountIn, tokenIn, tokenOut },
) => {
  if (amountIn === 0n) {
    return 0n;
  }

  const priceUnitMint = await readContract(config, {
    address: contracts.mainnet.OUSDVault.address,
    abi: contracts.mainnet.OUSDVault.abi,
    functionName: 'priceUnitMint',
    args: [tokenIn.address],
  });

  return parseUnits(
    (
      +formatUnits(amountIn, tokenIn.decimals) * +formatUnits(priceUnitMint, 18)
    ).toString(),
    tokenOut.decimals,
  );
};

const estimateGas = async (
  config,
  { tokenIn, tokenOut, amountIn, slippage, amountOut },
) => {
  let gasEstimate = 0n;

  if (amountIn === 0n) {
    return gasEstimate;
  }

  const publicClient = getPublicClient(config);
  const { address } = getAccount(config);

  const minAmountOut = subtractSlippage(amountOut, tokenOut.decimals, slippage);

  try {
    gasEstimate = await publicClient.estimateContractGas({
      address: contracts.mainnet.OUSDVault.address,
      abi: contracts.mainnet.OUSDVault.abi,
      functionName: 'mint',
      args: [tokenIn.address, amountIn, minAmountOut],
      account: address,
    });

    return gasEstimate;
  } catch {}

  const [rebaseThreshold, autoAllocateThreshold] = await queryClient.fetchQuery(
    {
      queryKey: ['vault-info', tokenOut.address],
      queryFn: () =>
        readContracts(config, {
          contracts: [
            {
              address: contracts.mainnet.OUSDVault.address,
              abi: contracts.mainnet.OUSDVault.abi,
              functionName: 'rebaseThreshold',
            },
            {
              address: contracts.mainnet.OUSDVault.address,
              abi: contracts.mainnet.OUSDVault.abi,
              functionName: 'autoAllocateThreshold',
            },
          ],
        }),
      staleTime: Infinity,
    },
  );

  gasEstimate = 220000n;
  if (amountIn > autoAllocateThreshold?.result) {
    gasEstimate = 2900000n;
  } else if (amountIn > rebaseThreshold?.result) {
    gasEstimate = 510000n;
  }

  return gasEstimate;
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

  const [estimatedAmount, allowanceAmount, approvalGas] = await Promise.all([
    estimateAmount(config, { tokenIn, tokenOut, amountIn }),
    allowance(config, { tokenIn, tokenOut }),
    estimateApprovalGas(config, { amountIn, tokenIn, tokenOut }),
  ]);
  const gas = await estimateGas(config, {
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

const allowance: Allowance = async (config, { tokenIn }) => {
  const { address } = getAccount(config);

  if (isNilOrEmpty(address)) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OUSDVault.address],
  });

  return allowance as unknown as bigint;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  config,
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config);

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [contracts.mainnet.OUSDVault.address, amountIn],
      account: address,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (
  config,
  { tokenIn, tokenOut, amountIn, curve },
) => {
  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [contracts.mainnet.OUSDVault.address, amountIn],
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
    return null;
  }

  const approved = await allowance(config, { tokenIn, tokenOut });

  if (approved < amountIn) {
    throw new Error(`Mint vault is not approved`);
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
    address: contracts.mainnet.OUSDVault.address,
    abi: contracts.mainnet.OUSDVault.abi,
    functionName: 'mint',
    args: [tokenIn.address, amountIn, minAmountOut],
    gas,
  });
  const hash = await writeContract(config, request);

  return hash;
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

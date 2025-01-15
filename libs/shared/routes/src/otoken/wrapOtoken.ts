import { tokens, whales } from '@origin/shared/contracts';
import { hasKey, includes, ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';

import type { Token } from '@origin/shared/contracts';
import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateGas,
  EstimateRoute,
  Swap,
} from '@origin/shared/providers';

const getWrappedToken = (token: Token) => {
  if (includes([tokens.mainnet.OETH.id, tokens.mainnet.wOETH.id], token.id)) {
    return tokens.mainnet.wOETH;
  } else if (
    includes([tokens.mainnet.OUSD.id, tokens.mainnet.wOUSD.id], token.id)
  ) {
    return tokens.mainnet.wOUSD;
  } else if (
    includes([tokens.base.superOETHb.id, tokens.base.wsuperOETHb.id], token.id)
  ) {
    return tokens.base.wsuperOETHb;
  } else if (includes([tokens.sonic.OS.id, tokens.sonic.wOS.id], token.id)) {
    return tokens.sonic.wOS;
  }

  return null;
};

const estimateAmount: EstimateAmount = async (
  { config },
  { amountIn, tokenIn },
) => {
  const wrappedToken = getWrappedToken(tokenIn);
  if (amountIn === 0n || !wrappedToken) {
    return 0n;
  }

  const functionName =
    wrappedToken.id === tokenIn.id ? 'convertToAssets' : 'convertToShares';

  const data = await readContract(config, {
    address: wrappedToken.address,
    abi: wrappedToken.abi,
    functionName,
    args: [amountIn],
    chainId: wrappedToken.chainId,
  });

  return data as unknown as bigint;
};

const estimateGas: EstimateGas = async ({ config }, { amountIn, tokenIn }) => {
  let gasEstimate = 0n;

  const publicClient = getPublicClient(config, {
    chainId: tokenIn.chainId,
  });

  const wrappedToken = getWrappedToken(tokenIn);

  if (amountIn === 0n || !wrappedToken) {
    return gasEstimate;
  }

  const { address } = getAccount(config);

  if (address) {
    if (wrappedToken.id === tokenIn.id) {
      try {
        gasEstimate =
          (await publicClient?.estimateContractGas({
            address: wrappedToken.address,
            abi: wrappedToken.abi,
            functionName: 'redeem',
            args: [amountIn, address, address],
            account: address,
          })) ?? 0n;

        return gasEstimate;
      } catch {}
    } else {
      try {
        gasEstimate =
          (await publicClient?.estimateContractGas({
            address: wrappedToken.address,
            abi: wrappedToken.abi,
            functionName: 'deposit',
            args: [amountIn, address],
            account: address,
          })) ?? 0n;

        return gasEstimate;
      } catch {}
    }
  }

  const whale = hasKey(whales, tokenIn.id) ? whales[tokenIn.id] : ZERO_ADDRESS;

  if (wrappedToken.id === tokenIn.id) {
    try {
      if (publicClient) {
        gasEstimate = await publicClient?.estimateContractGas({
          address: wrappedToken.address,
          abi: wrappedToken.abi,
          functionName: 'redeem',
          args: [amountIn, whale, whale],
          account: whale,
        });
      }
    } catch {
      gasEstimate = 21000n;
    }
  } else {
    try {
      if (publicClient) {
        gasEstimate = await publicClient.estimateContractGas({
          address: wrappedToken.address,
          abi: wrappedToken.abi,
          functionName: 'deposit',
          args: [amountIn, whale],
          account: whale,
        });
      }
    } catch {
      gasEstimate = 21000n;
    }
  }

  return gasEstimate;
};

const allowance: Allowance = async ({ config }, { tokenIn }) => {
  const wrappedToken = getWrappedToken(tokenIn);
  if (!wrappedToken) {
    return 0n;
  }

  if (tokenIn.id === wrappedToken.id) {
    return maxUint256;
  }

  const { address } = getAccount(config);

  if (!address || !tokenIn?.address) {
    return 0n;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, wrappedToken.address],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { tokenIn, amountIn },
) => {
  let approvalEstimate = 0n;

  const wrappedToken = getWrappedToken(tokenIn);
  if (!wrappedToken || tokenIn.id === wrappedToken.id) {
    return approvalEstimate;
  }

  const { address } = getAccount(config);

  if (amountIn === 0n || !address || !tokenIn?.address) {
    return approvalEstimate;
  }

  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  try {
    if (publicClient) {
      approvalEstimate = await publicClient?.estimateContractGas({
        address: tokenIn.address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [wrappedToken.address, amountIn],
        account: address,
      });
    }
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

const approve: Approve = async ({ config }, { tokenIn, amountIn }) => {
  const wrappedToken = getWrappedToken(tokenIn);
  if (!wrappedToken || tokenIn.id === wrappedToken.id || !tokenIn?.address) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'approve',
    args: [wrappedToken.address, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async ({ config }, { tokenIn, amountIn }) => {
  const wrappedToken = getWrappedToken(tokenIn);
  const { address } = getAccount(config);

  if (amountIn === 0n || !wrappedToken || !address) {
    return null;
  }

  let hash;

  if (tokenIn.id === wrappedToken.id) {
    const { request } = await simulateContract(config, {
      address: wrappedToken.address,
      abi: wrappedToken.abi,
      functionName: 'redeem',
      args: [amountIn, address, address],
      chainId: wrappedToken.chainId,
    });
    hash = await writeContract(config, request);
  } else {
    const { request } = await simulateContract(config, {
      address: wrappedToken.address,
      abi: wrappedToken.abi,
      functionName: 'deposit',
      args: [amountIn, address],
      chainId: wrappedToken.chainId,
    });
    hash = await writeContract(config, request);
  }

  return hash;
};

export const wrapOtoken = {
  ...defaultRoute,
  estimateAmount,
  estimateGas,
  estimateRoute,
  allowance,
  estimateApprovalGas,
  approve,
  swap,
};

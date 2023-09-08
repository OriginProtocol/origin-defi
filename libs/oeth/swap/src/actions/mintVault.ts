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

import type { EstimateGas, EstimateRoute, Swap } from '../types';
import type { EstimateAmount } from '../types';

const estimateAmount: EstimateAmount = async (tokenIn, tokenOut, amountIn) => {
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

const estimateGas: EstimateGas = async (
  tokenIn,
  tokenOut,
  amountIn,
  slippage,
  amountOut,
) => {
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
    // TODO trigger notification
    console.error(`mint vault gas estimate error!\n${e.message}`);
  }

  return gasEstimate;
};

const estimateRoute: EstimateRoute = async (
  tokenIn,
  tokenOut,
  amountIn,
  route,
  slippage,
) => {
  if (amountIn === 0n) {
    return { ...route, estimatedAmount: 0n, gas: 0n, rate: 0 };
  }

  const estimatedAmount = await estimateAmount(tokenIn, tokenOut, amountIn);
  const gas = await estimateGas(
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    estimatedAmount,
  );

  return {
    ...route,
    estimatedAmount,
    gas,
    rate:
      +formatUnits(amountIn, tokenIn.decimals) /
      +formatUnits(estimatedAmount, tokenOut.decimals),
  };
};

const swap: Swap = async (
  tokenIn,
  tokenOut,
  amountIn,
  _route,
  slippage,
  amountOut,
) => {
  const { address } = getAccount();

  if (amountIn === 0n || isNilOrEmpty(address)) {
    return;
  }

  const allowance = await readContract({
    address: tokenIn.address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [address, contracts.mainnet.OETHVaultCore.address],
  });

  if (allowance < amountIn) {
    try {
      const { request } = await prepareWriteContract({
        address: tokenIn.address,
        abi: erc20ABI,
        functionName: 'approve',
        args: [contracts.mainnet.OETHVaultCore.address, amountIn],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({ hash });

      // TODO trigger notification
      console.log(`mint vault approval done!`);
    } catch (e) {
      // TODO trigger notification
      console.error(`mint vault approval error!\n${e.message}`);
      return;
    }
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
    await waitForTransaction({ hash });

    // TODO trigger notification
    console.log('mint vault done!');
  } catch (e) {
    // TODO trigger notification
    console.error(`mint vault error!\n${e.message}`);
  }
};

export default {
  estimateAmount,
  estimateGas,
  estimateRoute,
  swap,
};

import { ZERO_ADDRESS } from '@origin/shared/utils';
import {
  getAccount,
  getPublicClient,
  readContract,
  sendTransaction,
  simulateContract,
  writeContract,
} from '@wagmi/core';
import axios from 'axios';
import { path } from 'ramda';
import { erc20Abi, formatUnits, maxUint256 } from 'viem';

import { defaultRoute } from '../defaultRoute';
import { MAGPIE_API_URL, magpieNetworks } from './constants';

import type { Token } from '@origin/shared/contracts';
import type {
  Allowance,
  Approve,
  EstimateAmount,
  EstimateApprovalGas,
  EstimateRoute,
  IsRouteAvailable,
  Swap,
  SwapClient,
} from '@origin/shared/providers';
import type { HexAddress } from '@origin/shared/utils';

import type { MagpieQuoteResponse, MagpieTransaction } from './types';

const getQuote = async (
  { config, queryClient }: SwapClient,
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  slippage = 0.001,
  staleTime = 0,
) => {
  const { address } = getAccount(config);

  return await queryClient.fetchQuery({
    staleTime,
    queryKey: [
      'magpie-routing',
      tokenIn.id,
      tokenOut.id,
      amountIn,
      slippage,
      address,
    ],
    queryFn: async () => {
      const url = new URL(`${MAGPIE_API_URL}/aggregator/quote`);
      url.searchParams.set('network', magpieNetworks[tokenIn.chainId]);
      url.searchParams.set('fromTokenAddress', tokenIn.address ?? ZERO_ADDRESS);
      url.searchParams.set('toTokenAddress', tokenOut.address ?? ZERO_ADDRESS);
      url.searchParams.set('fromAddress', address ?? ZERO_ADDRESS);
      url.searchParams.set('toAddress', address ?? ZERO_ADDRESS);
      url.searchParams.set('sellAmount', amountIn.toString());
      url.searchParams.set('slippage', slippage.toString());
      url.searchParams.set('gasless', 'false');

      const res = await axios.get<MagpieQuoteResponse>(url.toString());

      return res.data;
    },
  });
};

const isRouteAvailable: IsRouteAvailable = async (
  client,
  { tokenIn, tokenOut, amountIn },
) => {
  const quote = await getQuote(client, tokenIn, tokenOut, amountIn, 0.001);

  return !!quote?.id;
};

const estimateAmount: EstimateAmount = async (
  client,
  { tokenIn, tokenOut, amountIn, slippage },
) => {
  try {
    const quote = await getQuote(client, tokenIn, tokenOut, amountIn, slippage);

    return BigInt(quote?.amountOut ?? 0);
  } catch {}
  return 0n;
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

  const quote = await getQuote(
    client,
    tokenIn,
    tokenOut,
    amountIn,
    slippage,
    (route?.refreshInterval ?? 1) - 1000,
  );
  const estimatedRoute = {
    ...route,
    estimatedAmount: BigInt(quote?.amountOut ?? 0),
    gas: BigInt(quote?.resourceEstimate?.gasLimit ?? 0),
    approvalGas: 0n,
    allowanceAmount: 0n,
    rate:
      +formatUnits(BigInt(quote?.amountOut ?? 0), tokenOut.decimals) /
      +formatUnits(amountIn, tokenIn.decimals),
    meta: {
      ...route?.meta,
      quote,
    },
  };

  const [allowanceAmount, approvalGas] = await Promise.all([
    allowance(client, {
      tokenIn,
      tokenOut,
      estimatedRoute,
    }),
    estimateApprovalGas(client, {
      amountIn,
      tokenIn,
      tokenOut,
      estimatedRoute,
    }),
  ]);

  return {
    ...estimatedRoute,
    allowanceAmount,
    approvalGas,
  };
};

const allowance: Allowance = async (
  { config },
  { tokenIn, estimatedRoute },
) => {
  const { address } = getAccount(config);
  const spender = path<HexAddress>(
    ['meta', 'quote', 'targetAddress'],
    estimatedRoute,
  );
  if (!address || !tokenIn.address || !spender) {
    return maxUint256;
  }

  const allowance = await readContract(config, {
    address: tokenIn.address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [address, spender],
    chainId: tokenIn.chainId,
  });

  return allowance;
};

const estimateApprovalGas: EstimateApprovalGas = async (
  { config },
  { amountIn, tokenIn, estimatedRoute },
) => {
  let approvalEstimate = 0n;
  const { address } = getAccount(config);
  const spender = path<HexAddress>(
    ['meta', 'quote', 'targetAddress'],
    estimatedRoute,
  );
  const publicClient = getPublicClient(config, { chainId: tokenIn.chainId });

  if (
    amountIn === 0n ||
    !address ||
    !publicClient ||
    !tokenIn?.address ||
    !spender
  ) {
    return approvalEstimate;
  }

  try {
    approvalEstimate = await publicClient.estimateContractGas({
      address: tokenIn.address,
      abi: tokenIn.abi,
      functionName: 'approve',
      args: [spender, amountIn],
      account: address ?? ZERO_ADDRESS,
    });
  } catch {
    approvalEstimate = 200000n;
  }

  return approvalEstimate;
};

const approve: Approve = async (
  { config },
  { tokenIn, tokenOut, amountIn, estimatedRoute },
) => {
  const spender = path<HexAddress>(
    ['meta', 'quote', 'targetAddress'],
    estimatedRoute,
  );
  if (!tokenIn?.address || !spender) {
    return null;
  }

  const { request } = await simulateContract(config, {
    address: tokenIn.address,
    abi: tokenIn.abi,
    functionName: 'approve',
    args: [spender, amountIn],
    chainId: tokenIn.chainId,
  });
  const hash = await writeContract(config, request);

  return hash;
};

const swap: Swap = async (
  { config, queryClient },
  { amountIn, estimatedRoute },
) => {
  const { address } = getAccount(config);
  const quoteId = path<string>(['meta', 'quote', 'id'], estimatedRoute);

  if (amountIn === 0n || !address || !quoteId) {
    return null;
  }

  const tx = await queryClient.fetchQuery({
    queryKey: ['magpie-transaction', quoteId],
    queryFn: async () => {
      const url = new URL(`${MAGPIE_API_URL}/aggregator/transaction`);
      url.searchParams.set('quoteId', quoteId);
      const res = await axios.get<MagpieTransaction>(url.toString());

      return res.data;
    },
  });

  const hash = await sendTransaction(config, {
    to: tx.to,
    data: tx.data,
    chainId: tx.chainId,
    maxFeePerGas: BigInt(tx.maxFeePerGas),
    maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
    value: BigInt(tx.value),
  });

  return hash;
};

export const magpie = {
  ...defaultRoute,
  isRouteAvailable,
  estimateAmount,
  estimateApprovalGas,
  allowance,
  estimateRoute,
  approve,
  swap,
};

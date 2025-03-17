import type { Hex } from 'viem';

export type MagpieSwapTypedDataType = {
  name: string;
  type: string;
};

export type MagpieSwapTypedData = {
  types: {
    Swap: MagpieSwapTypedDataType[];
  };
  domain: {
    name: string;
    version: string;
    chainId: string;
    verifyingContract: string;
  };
  message: {
    router: string;
    sender: string;
    recipient: string;
    fromAsset: string;
    toAsset: string;
    deadline: string;
    amountOutMin: string;
    swapFee: string;
    amountIn: string;
  };
};

export type MagpieFee = {
  type: string;
  value: string;
};

export type MagpieResourceEstimate = {
  gasLimit: string;
};

export type MagpieQuoteResponse = {
  id: string;
  amountOut: string;
  targetAddress: string;
  fees: MagpieFee[];
  resourceEstimate: MagpieResourceEstimate;
  typedData: MagpieSwapTypedData;
};

export type MagpieTransaction = {
  from: Hex;
  to: Hex;
  data: Hex;
  chainId: number;
  type: number;
  gasLimit: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  value: string;
};

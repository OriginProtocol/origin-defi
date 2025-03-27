import type { HexAddress } from '@origin/shared/utils';

type OoToken = {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  usd: string;
  volume: number;
};

type OoDexRoute = {
  dexIndex: number;
  dexCode: string;
  swapAmount: string;
};

type OoDexDetails = {
  dex: string;
  id: string;
  parts: number;
  percentage: number;
};

type OoSubRoute = {
  from: string;
  to: string;
  parts: number;
  dexes: OoDexDetails[];
};

type OoRoute = {
  parts: number;
  percentage: number;
  subRoutes: OoSubRoute[];
};

type OoPath = {
  from: string;
  to: string;
  parts: number;
  routes: OoRoute[];
};

type GasPrices = {
  standard: number | string;
  fast: number | string;
  instant: number | string;
};

export type OoGasPriceResponse = {
  code: number;
  data: GasPrices;
  without_decimals: GasPrices;
};

export type OoQuoteResponse = {
  code: number;
  data: {
    inToken: OoToken;
    outToken: OoToken;
    inAmount: string;
    outAmount: string;
    estimatedGas: string;
    dexes: OoDexRoute[];
    path: OoPath;
    save: number;
    price_impact: string;
  };
};

export type OoTransactionResponse = {
  code: number;
  data: {
    inToken: OoToken;
    outToken: OoToken;
    inAmount: string;
    outAmount: string;
    estimatedGas: number;
    minOutAmount: string;
    from: HexAddress;
    to: HexAddress;
    value: string;
    gasPrice: string;
    data: HexAddress;
    chainId: number;
    rfqDeadline: number;
    gmxFee: number;
    price_impact: string;
  };
};

import { ZERO_ADDRESS } from '@origin/shared/utils';
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'dnum';
import { pathOr } from 'ramda';

import { OPEN_OCEAN_API_URL, openOceanNativeCurrencies } from './constants';

import type { Token } from '@origin/shared/contracts';
import type { Hex } from 'viem';

import type {
  OoGasPriceResponse,
  OoQuoteResponse,
  OoTransactionResponse,
} from './types';

const getGasPrice = async (chainId: number) => {
  const { data } = await axios<OoGasPriceResponse>({
    url: `${OPEN_OCEAN_API_URL}/${chainId}/gasPrice`,
    method: 'GET',
  });

  return pathOr(0, ['without_decimals', 'standard'], data);
};

export const getQuoteOptions = (
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
) => {
  return queryOptions({
    queryKey: ['open-ocean-quote', tokenIn.id, tokenOut.id, amountIn],
    queryFn: async () => {
      const gasPrice = await getGasPrice(tokenIn.chainId);
      const url = new URL(`${OPEN_OCEAN_API_URL}/${tokenIn.chainId}/quote`);

      url.searchParams.set(
        'inTokenAddress',
        tokenIn.address ?? openOceanNativeCurrencies[tokenIn.chainId],
      );
      url.searchParams.set(
        'outTokenAddress',
        tokenOut.address ?? openOceanNativeCurrencies[tokenIn.chainId],
      );
      url.searchParams.set('amount', format([amountIn, tokenIn.decimals]));
      url.searchParams.set('gasPrice', gasPrice.toString());

      const res = await axios.get<OoQuoteResponse>(url.toString());

      return res.data;
    },
    staleTime: 0,
  });
};

export const getTransactionOptions = (
  address: Hex,
  tokenIn: Token,
  tokenOut: Token,
  amountIn: bigint,
  slippage = 0.001,
) => {
  return queryOptions({
    queryKey: [
      'open-ocean-transaction',
      tokenIn.id,
      tokenOut.id,
      amountIn,
      slippage,
      address,
    ],
    queryFn: async () => {
      const gasPrice = await getGasPrice(tokenIn.chainId);
      const url = new URL(`${OPEN_OCEAN_API_URL}/${tokenIn.chainId}/swap`);

      url.searchParams.set(
        'inTokenAddress',
        tokenIn.address ?? openOceanNativeCurrencies[tokenIn.chainId],
      );
      url.searchParams.set(
        'outTokenAddress',
        tokenOut.address ?? openOceanNativeCurrencies[tokenIn.chainId],
      );
      url.searchParams.set('amount', format([amountIn, tokenIn.decimals]));
      url.searchParams.set('gasPrice', gasPrice.toString());
      url.searchParams.set('slippage', (slippage * 100).toString());
      url.searchParams.set('account', address ?? ZERO_ADDRESS);

      const res = await axios.get<OoTransactionResponse>(url.toString());

      return res.data;
    },
    staleTime: 0,
  });
};

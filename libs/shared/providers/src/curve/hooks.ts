import { contracts } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { mainnet } from 'viem/chains';
import { useConfig } from 'wagmi';

import { CurveFactoryABI } from './abis/CurveFactory';
import { CurveRegistryExchangeABI } from './abis/CurveRegistryExchange';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction } from '@tanstack/react-query';
import type { Abi } from 'viem';
import type { Config } from 'wagmi';

type Key = ['useCurve'];

const getKey = (): Key => ['useCurve'];

const fetcher: (config: Config) => QueryFunction<
  {
    CurveRegistryExchange: {
      address: HexAddress;
      chainId: number;
      abi: Abi;
      name: 'CurveRegistryExchange';
    };
    OethPoolUnderlyings: HexAddress[];
    OusdMetaPoolUnderlyings: HexAddress[];
  },
  Key
> = (config) => async () => {
  const addresses = await readContracts(config, {
    contracts: [
      {
        address: contracts.mainnet.CurveAddressProvider.address,
        abi: contracts.mainnet.CurveAddressProvider.abi,
        functionName: 'get_address',
        args: [2n],
        chainId: contracts.mainnet.CurveAddressProvider.chainId,
      },
      {
        address: contracts.mainnet.CurveAddressProvider.address,
        abi: contracts.mainnet.CurveAddressProvider.abi,
        functionName: 'get_address',
        args: [3n],
        chainId: contracts.mainnet.CurveAddressProvider.chainId,
      },
    ],
  });

  const underlyings = await readContracts(config, {
    contracts: [
      {
        address: addresses[1].result ?? ZERO_ADDRESS,
        abi: CurveFactoryABI,
        functionName: 'get_coins',
        args: [contracts.mainnet.OETHCurvePool.address],
        chainId: contracts.mainnet.OETHCurvePool.chainId,
      },
      {
        address: addresses[1].result ?? ZERO_ADDRESS,
        abi: CurveFactoryABI,
        functionName: 'get_underlying_coins',
        args: [contracts.mainnet.OUSDCurveMetaPool.address],
        chainId: contracts.mainnet.OUSDCurveMetaPool.chainId,
      },
    ],
  });

  return {
    CurveRegistryExchange: {
      address: addresses[0].result as HexAddress,
      chainId: mainnet.id,
      abi: CurveRegistryExchangeABI,
      name: 'CurveRegistryExchange',
    },
    OethPoolUnderlyings: underlyings[0].result as unknown as HexAddress[],
    OusdMetaPoolUnderlyings: underlyings[1].result as unknown as HexAddress[],
  };
};

export const useCurve = () => {
  const config = useConfig();

  return useQuery({
    queryKey: getKey(),
    staleTime: Infinity,
    queryFn: fetcher(config),
  });
};
useCurve.getKey = getKey;
useCurve.fetcher = fetcher;

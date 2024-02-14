import { contracts } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import { readContracts } from '@wagmi/core';
import { useConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { CurveFactoryABI } from './abis/CurveFactory';
import { CurveRegistryExchangeABI } from './abis/CurveRegistryExchange';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction } from '@tanstack/react-query';
import type { Abi } from 'viem';
import type { Config } from 'wagmi';

type Key = ['useCurve', Config];

const getKey = (config: Config): Key => ['useCurve', config];

const fetcher: QueryFunction<
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
> = async ({ queryKey }) => {
  const addresses = await readContracts(queryKey[1], {
    contracts: [
      {
        address: contracts.mainnet.CurveAddressProvider.address,
        abi: contracts.mainnet.CurveAddressProvider.abi,
        functionName: 'get_address',
        args: [2n],
      },
      {
        address: contracts.mainnet.CurveAddressProvider.address,
        abi: contracts.mainnet.CurveAddressProvider.abi,
        functionName: 'get_address',
        args: [3n],
      },
    ],
  });

  const underlyings = await readContracts(queryKey[1], {
    contracts: [
      {
        address: addresses[1].result ?? ZERO_ADDRESS,
        abi: CurveFactoryABI,
        functionName: 'get_coins',
        args: [contracts.mainnet.OETHCurvePool.address],
      },
      {
        address: addresses[1].result ?? ZERO_ADDRESS,
        abi: CurveFactoryABI,
        functionName: 'get_underlying_coins',
        args: [contracts.mainnet.OUSDCurveMetaPool.address],
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
    queryKey: getKey(config),
    staleTime: Infinity,
    queryFn: fetcher,
  });
};
useCurve.getKey = getKey;
useCurve.fetcher = fetcher;

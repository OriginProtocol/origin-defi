import { queryStringify } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { HexAddress } from '@origin/shared/utils';
import type { QueryFunction } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import type { StrategyConfig } from './types';
import type { Item } from './types';

type Key = ['useStrategiesConfig', string, string];

const getKey = ({ apiKey, url }: { apiKey: string; url: string }): Key => [
  'useStrategiesConfig',
  apiKey,
  url,
];

const fetcher: QueryFunction<StrategyConfig[], Key> = async ({
  queryKey: [, apiKey, url],
}) => {
  const strapiOptions = queryStringify({
    populate: {
      icon: true,
      addresses: {
        populate: {
          address: true,
          name: true,
          icon: true,
        },
      },
      assets: {
        populate: {
          address: true,
          icon: true,
        },
      },
    },
  });
  const res = await axios.get<AxiosResponse<Item[]>>(
    `${url}/api/defi-strategies?${strapiOptions}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );

  const strategies: StrategyConfig[] = res?.data?.data?.map((strategy) => ({
    id: strategy.id,
    title: strategy.attributes.title,
    description: strategy.attributes.description,
    color: strategy.attributes.color,
    chainId: strategy.attributes.chainId,
    icon: strategy.attributes.icon.data.attributes.url,
    addresses: strategy.attributes.addresses.data.map(
      (address) => address.attributes.address as HexAddress,
    ),
    assets:
      strategy?.attributes?.assets?.data?.map?.((asset) => ({
        address: asset.attributes.address as HexAddress,
        chainId: asset.attributes.chainId,
        symbol: asset.attributes.symbol,
        name: asset.attributes.name,
        icon: asset.attributes.icon.data.attributes.url,
        color: asset.attributes.color,
      })) ?? [],
  }));

  return strategies;
};

export const useStrategiesConfig = ({
  apiKey,
  url,
}: {
  apiKey: string;
  url: string;
}) => {
  return useQuery<StrategyConfig[], Error, StrategyConfig[], Key>({
    queryKey: getKey({ apiKey, url }),
    queryFn: fetcher,
  });
};
useStrategiesConfig.getKey = getKey;
useStrategiesConfig.fetcher = fetcher;

import { queryStringify } from '@origin/shared/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { HexAddress } from '@origin/shared/utils';
import type { AxiosResponse } from 'axios';

import type { StrategyConfig } from './types';
import type { Item } from './types';

export const useStrategiesConfig = ({
  apiKey,
  url,
}: {
  apiKey: string;
  url: string;
}) => {
  return useQuery({
    queryKey: ['useStrategiesConfig'],
    queryFn: async () => {
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
    },
  });
};

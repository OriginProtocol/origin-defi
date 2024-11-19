import type { HexAddress } from '@origin/shared/utils';

export type StrategyConfig = {
  id: number;
  title: string;
  description: string;
  color: string;
  chainId: number;
  icon: string;
  addresses: HexAddress[];
  assets?: {
    address: HexAddress;
    chainId: number;
    symbol: string;
    name: string;
    icon: string;
    color: string;
  }[];
};

type IconAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
};

type IconData = {
  id: number;
  attributes: IconAttributes;
};

type AddressAttributes = {
  address: string;
  chainId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

type AddressData = {
  id: number;
  attributes: AddressAttributes;
};

type AssetAttributes = {
  name: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  color: string;
  address: string;
  chainId: number;
  description: string | null;
  icon: {
    data: {
      id: number;
      attributes: IconAttributes;
    };
  };
};

type AssetData = {
  id: number;
  attributes: AssetAttributes;
};

type Attributes = {
  title: string;
  description: string;
  color: string;
  chainId: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: {
    data: IconData;
  };
  addresses: {
    data: AddressData[];
  };
  assets: {
    data: AssetData[];
  };
};

export type Item = {
  id: number;
  attributes: Attributes;
};

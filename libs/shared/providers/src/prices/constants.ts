/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { pathOr } from 'ramda';
import { formatUnits, parseUnits } from 'viem';
import { mainnet } from 'wagmi/chains';

import type { PriceOption, SupportedTokenPrice } from './types';

export const coingeckoApiEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoTokenIds = {
  ETH: 'ethereum',
  WETH: 'weth',
  DAI: 'dai',
  USDC: 'usd-coin',
  USDT: 'tether',
  OETH: 'origin-ether',
  OGN: 'origin-protocol',
  wOETH: 'origin-ether',
  OUSD: 'origin-dollar',
  wOUSD: 'origin-dollar',
  stETH: 'staked-ether',
  rETH: 'rocket-pool-eth',
  frxETH: 'frax-ether',
  sfrxETH: 'staked-frax-ether',
  FRAX: 'frax',
} as const;

export const chainlinkOracles = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
  USDC_USD: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
  USDT_USD: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
  FRAX_USD: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
  frxETH_ETH: '0xc58f3385fbc1c8ad2c0c9a061d7c13b141d7a5df',
  stETH_ETH: '0x86392dc19c0b719886221c78ab11eb8cf5c52812',
  rETH_ETH: '0x536218f9e9eb48863970252233c8f271f554c2d0',
} as const;

const chainLinkUsdMapper = (data: any) =>
  +formatUnits(pathOr(0n, [1], data), 8);
const chainLinkEthMapper = (data: any) =>
  +formatUnits(pathOr(0n, [1], data), 18);
const diaOracleUsdMapper = (data: any) =>
  +formatUnits(pathOr(0n, [0], data), 8);

export const priceOptions: Partial<Record<SupportedTokenPrice, PriceOption>> = {
  ETH_USD: {
    type: 'wagmi',
    id: 'ETH_USD',
    config: {
      address: chainlinkOracles.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  OETH_USD: {
    type: 'wagmi',
    id: 'OETH_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OETH/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  OUSD_USD: {
    type: 'wagmi',
    id: 'OUSD_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OUSD/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  DAI_USD: {
    type: 'wagmi',
    id: 'DAI_USD',
    config: {
      address: chainlinkOracles.DAI_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  USDC_USD: {
    type: 'wagmi',
    id: 'USDC_USD',
    config: {
      address: chainlinkOracles.USDC_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  USDT_USD: {
    type: 'wagmi',
    id: 'USDT_USD',
    config: {
      address: chainlinkOracles.USDT_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  FRAX_USD: {
    type: 'wagmi',
    id: 'FRAX_USD',
    config: {
      address: chainlinkOracles.FRAX_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  frxETH_ETH: {
    type: 'wagmi',
    id: 'frxETH_ETH',
    config: {
      address: chainlinkOracles.frxETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  frxETH_USD: {
    type: 'derived',
    id: 'frxETH_USD',
    dependsOn: ['frxETH_ETH', 'ETH_USD'],
  },
  rETH_ETH: {
    type: 'wagmi',
    id: 'rETH_ETH',
    config: {
      address: chainlinkOracles.rETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  rETH_USD: {
    type: 'derived',
    id: 'rETH_USD',
    dependsOn: ['rETH_ETH', 'ETH_USD'],
  },
  stETH_ETH: {
    type: 'wagmi',
    id: 'stETH_ETH',
    config: {
      address: chainlinkOracles.stETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  stETH_USD: {
    type: 'derived',
    id: 'stETH_USD',
    dependsOn: ['stETH_ETH', 'ETH_USD'],
  },
  wOETH_ETH: {
    type: 'derived',
    id: 'wOETH_ETH',
    dependsOn: ['wOETH_OETH'], // In one direction this is correct, in the other direction it is off by ~.1% (?)
  },
  wOETH_OETH: {
    type: 'wagmi',
    id: 'wOETH_OETH',
    config: {
      address: tokens.mainnet.wOETH.address,
      abi: tokens.mainnet.wOETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOETH.decimals)],
      chainId: mainnet.id,
    },
    mapResult: (woeth_usd: bigint) => {
      return +formatUnits(woeth_usd, tokens.mainnet.wOETH.decimals);
    },
  },
  wOETH_USD: {
    type: 'derived',
    id: 'wOETH_USD',
    dependsOn: ['wOETH_OETH', 'OETH_USD'],
  },
  wOUSD_OUSD: {
    type: 'wagmi',
    id: 'wOUSD_OUSD',
    config: {
      address: tokens.mainnet.wOUSD.address,
      abi: tokens.mainnet.wOUSD.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOUSD.decimals)],
      chainId: mainnet.id,
    },
    mapResult: (wousd_usd: bigint) => {
      return +formatUnits(wousd_usd, tokens.mainnet.OUSD.decimals);
    },
  },
  wOUSD_USD: {
    type: 'derived',
    id: 'wOUSD_USD',
    dependsOn: ['wOUSD_OUSD', 'OUSD_USD'],
  },
  sfrxETH_frxETH: {
    type: 'wagmi',
    id: 'sfrxETH_frxETH',
    config: {
      address: tokens.mainnet.sfrxETH.address,
      abi: tokens.mainnet.sfrxETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.sfrxETH.decimals)],
      chainId: mainnet.id,
    },
    mapResult: (sfrxeth_usd: bigint) => {
      return +formatUnits(sfrxeth_usd, tokens.mainnet.sfrxETH.decimals);
    },
  },
  sfrxETH_USD: {
    type: 'derived',
    id: 'sfrxETH_USD',
    dependsOn: ['sfrxETH_frxETH', 'frxETH_ETH', 'ETH_USD'],
  },
  WETH_USD: {
    type: 'derived',
    id: 'WETH_USD',
    dependsOn: ['WETH_ETH', 'ETH_USD'],
  },
  OGN_USD: {
    type: 'coingecko',
    id: 'OGN_USD',
    config: coingeckoTokenIds.OGN,
  },
  primeETH_ETH: {
    id: 'primeETH_ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'primeETHPrice',
      chainId: mainnet.id,
    },
    mapResult: (primeETH_ETH: bigint) => {
      return +formatUnits(primeETH_ETH, tokens.mainnet.primeETH.decimals);
    },
  },
  primeETH_USD: {
    id: 'primeETH_USD',
    type: 'derived',
    dependsOn: ['primeETH_ETH', 'ETH_USD'],
  },
  mETH_ETH: {
    id: 'mETH_ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.mETH.address],
      chainId: mainnet.id,
    },
    mapResult: (meth_eth: bigint) => {
      return +formatUnits(meth_eth, tokens.mainnet.mETH.decimals);
    },
  },
  mETH_USD: {
    id: 'mETH_USD',
    type: 'derived',
    dependsOn: ['mETH_ETH', 'ETH_USD'],
  },
  ETHx_ETH: {
    id: 'ETHx_ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.ETHx.address],
      chainId: mainnet.id,
    },
    mapResult: (ethx_eth: bigint) => {
      return +formatUnits(ethx_eth, tokens.mainnet.ETHx.decimals);
    },
  },
  ETHx_USD: {
    id: 'ETHx_USD',
    type: 'derived',
    dependsOn: ['ETHx_ETH', 'ETH_USD'],
  },
  swETH_ETH: {
    id: 'swETH_ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.swETH.address],
      chainId: mainnet.id,
    },
    mapResult: (sweth_eth: bigint) => {
      return +formatUnits(sweth_eth, tokens.mainnet.swETH.decimals);
    },
  },
  swETH_USD: {
    id: 'swETH_USD',
    type: 'derived',
    dependsOn: ['swETH_ETH', 'ETH_USD'],
  },
  WETH_ETH: {
    id: 'WETH_ETH',
    type: 'rest',
    config: async () => 1,
  },
};

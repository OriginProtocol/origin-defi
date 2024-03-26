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
  'ETH:1_USD': {
    type: 'wagmi',
    id: 'ETH:1_USD',
    config: {
      address: chainlinkOracles.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  'OETH:1_USD': {
    type: 'wagmi',
    id: 'OETH:1_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OETH/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  'OUSD:1_USD': {
    type: 'wagmi',
    id: 'OUSD:1_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OUSD/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  'DAI:1_USD': {
    type: 'wagmi',
    id: 'DAI:1_USD',
    config: {
      address: chainlinkOracles.DAI_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  'USDC:1_USD': {
    type: 'wagmi',
    id: 'USDC:1_USD',
    config: {
      address: chainlinkOracles.USDC_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  'USDT:1_USD': {
    type: 'wagmi',
    id: 'USDT:1_USD',
    config: {
      address: chainlinkOracles.USDT_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  'FRAX:1_USD': {
    type: 'wagmi',
    id: 'FRAX:1_USD',
    config: {
      address: chainlinkOracles.FRAX_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  'frxETH:1_ETH': {
    type: 'wagmi',
    id: 'frxETH:1_ETH',
    config: {
      address: chainlinkOracles.frxETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  'frxETH:1_USD': {
    type: 'derived',
    id: 'frxETH:1_USD',
    dependsOn: ['frxETH:1_ETH', 'ETH:1_USD'],
  },
  'rETH:1_ETH': {
    type: 'wagmi',
    id: 'rETH:1_ETH',
    config: {
      address: chainlinkOracles.rETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  'rETH:1_USD': {
    type: 'derived',
    id: 'rETH:1_USD',
    dependsOn: ['rETH:1_ETH', 'ETH:1_USD'],
  },
  'stETH:1_ETH': {
    type: 'wagmi',
    id: 'stETH:1_ETH',
    config: {
      address: chainlinkOracles.stETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  'stETH:1_USD': {
    type: 'derived',
    id: 'stETH:1_USD',
    dependsOn: ['stETH:1_ETH', 'ETH:1_USD'],
  },
  'wOETH:1_OETH': {
    type: 'wagmi',
    id: 'wOETH:1_OETH',
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
  'wOETH:1_USD': {
    type: 'derived',
    id: 'wOETH:1_USD',
    dependsOn: ['wOETH:1_OETH', 'OETH:1_USD'],
  },
  'wOUSD:1_OUSD': {
    type: 'wagmi',
    id: 'wOUSD:1_OUSD',
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
  'wOUSD:1_USD': {
    type: 'derived',
    id: 'wOUSD:1_USD',
    dependsOn: ['wOUSD:1_OUSD', 'OUSD:1_USD'],
  },
  'sfrxETH:1_frxETH': {
    type: 'wagmi',
    id: 'sfrxETH:1_frxETH',
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
  'sfrxETH:1_USD': {
    type: 'derived',
    id: 'sfrxETH:1_USD',
    dependsOn: ['sfrxETH:1_frxETH', 'frxETH:1_ETH', 'ETH:1_USD'],
  },
  'WETH:1_USD': {
    type: 'derived',
    id: 'WETH:1_USD',
    dependsOn: ['WETH:1_ETH', 'ETH:1_USD'],
  },
  'OGN:1_USD': {
    type: 'coingecko',
    id: 'OGN:1_USD',
    config: coingeckoTokenIds.OGN,
  },
  'primeETH:1_ETH': {
    id: 'primeETH:1_ETH',
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
  'primeETH:1_USD': {
    id: 'primeETH:1_USD',
    type: 'derived',
    dependsOn: ['primeETH:1_ETH', 'ETH:1_USD'],
  },
  'mETH:1_ETH': {
    id: 'mETH:1_ETH',
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
  'mETH:1_USD': {
    id: 'mETH:1_USD',
    type: 'derived',
    dependsOn: ['mETH:1_ETH', 'ETH:1_USD'],
  },
  'ETHx:1_ETH': {
    id: 'ETHx:1_ETH',
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
  'ETHx:1_USD': {
    id: 'ETHx:1_USD',
    type: 'derived',
    dependsOn: ['ETHx:1_ETH', 'ETH:1_USD'],
  },
  'swETH:1_ETH': {
    id: 'swETH:1_ETH',
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
  'swETH:1_USD': {
    id: 'swETH:1_USD',
    type: 'derived',
    dependsOn: ['swETH:1_ETH', 'ETH:1_USD'],
  },
  'WETH:1_ETH': {
    id: 'WETH:1_ETH',
    type: 'rest',
    config: async () => 1,
  },
};

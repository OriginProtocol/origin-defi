/* eslint-disable @typescript-eslint/no-explicit-any */
import { OETH_REDEEM_FEE } from '@origin/shared/constants';
import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { from } from 'dnum';
import { pathOr } from 'ramda';
import { parseUnits } from 'viem';
import { arbitrum, mainnet } from 'wagmi/chains';

import type { Dnum } from 'dnum';

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

export const chainlinkOraclesMainnet = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
  USDC_USD: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
  USDT_USD: '0x3E7d1eAB13ad0104d2750B8863b489D65364e32D',
  FRAX_USD: '0xb9e1e3a9feff48998e45fa90847ed4d467e8bcfd',
  frxETH_ETH: '0xc58f3385fbc1c8ad2c0c9a061d7c13b141d7a5df',
  stETH_ETH: '0x86392dc19c0b719886221c78ab11eb8cf5c52812',
  rETH_ETH: '0x536218f9e9eb48863970252233c8f271f554c2d0',
} as const;

export const chainlinkOraclesArbitrum = {
  ETH_USD: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
  wOETH_OETH: '0x03a1f4b19aaeA6e68f0f104dc4346dA3E942cC45',
} as const;

const chainLinkUsdMapper = (data: any) => [pathOr(0n, [1], data), 8] as Dnum;
const chainLinkEthMapper = (data: any) => [pathOr(0n, [1], data), 18] as Dnum;
const diaOracleUsdMapper = (data: any) => [pathOr(0n, [0], data), 8] as Dnum;

export const priceOptions: Partial<Record<SupportedTokenPrice, PriceOption>> = {
  '1:ETH_USD': {
    type: 'wagmi',
    id: '1:ETH_USD',
    config: {
      address: chainlinkOraclesMainnet.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:OETH_USD': {
    type: 'wagmi',
    id: '1:OETH_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OETH/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  '1:OUSD_USD': {
    type: 'wagmi',
    id: '1:OUSD_USD',
    config: {
      address: contracts.mainnet.DIAOracle.address,
      abi: contracts.mainnet.DIAOracle.abi,
      functionName: 'getValue',
      args: ['OUSD/USD'],
      chainId: mainnet.id,
    },
    mapResult: diaOracleUsdMapper,
  },
  '1:DAI_USD': {
    type: 'wagmi',
    id: '1:DAI_USD',
    config: {
      address: chainlinkOraclesMainnet.DAI_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:USDC_USD': {
    type: 'wagmi',
    id: '1:USDC_USD',
    config: {
      address: chainlinkOraclesMainnet.USDC_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:USDT_USD': {
    type: 'wagmi',
    id: '1:USDT_USD',
    config: {
      address: chainlinkOraclesMainnet.USDT_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:FRAX_USD': {
    type: 'wagmi',
    id: '1:FRAX_USD',
    config: {
      address: chainlinkOraclesMainnet.FRAX_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '1:frxETH_1:ETH': {
    type: 'wagmi',
    id: '1:frxETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.frxETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:frxETH_USD': {
    type: 'derived',
    id: '1:frxETH_USD',
    dependsOn: ['1:frxETH_1:ETH', '1:ETH_USD'],
  },
  '1:rETH_1:ETH': {
    type: 'wagmi',
    id: '1:rETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.rETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:rETH_USD': {
    type: 'derived',
    id: '1:rETH_USD',
    dependsOn: ['1:rETH_1:ETH', '1:ETH_USD'],
  },
  '1:stETH_1:ETH': {
    type: 'wagmi',
    id: '1:stETH_1:ETH',
    config: {
      address: chainlinkOraclesMainnet.stETH_ETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: mainnet.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '1:stETH_USD': {
    type: 'derived',
    id: '1:stETH_USD',
    dependsOn: ['1:stETH_1:ETH', '1:ETH_USD'],
  },
  '1:wOETH_1:ETH': {
    type: 'derived',
    id: '1:wOETH_1:ETH',
    dependsOn: ['1:wOETH_1:OETH', '1:OETH_1:ETH'],
  },
  '1:wOETH_1:OETH': {
    type: 'wagmi',
    id: '1:wOETH_1:OETH',
    config: {
      address: tokens.mainnet.wOETH.address,
      abi: tokens.mainnet.wOETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOETH.decimals)],
      chainId: tokens.mainnet.wOETH.chainId,
    },
    mapResult: (woeth_usd: bigint) => {
      return [woeth_usd, tokens.mainnet.wOETH.decimals];
    },
  },
  '1:wOETH_USD': {
    type: 'derived',
    id: '1:wOETH_USD',
    dependsOn: ['1:wOETH_1:OETH', '1:OETH_USD'],
  },
  '1:wOUSD_1:OUSD': {
    type: 'wagmi',
    id: '1:wOUSD_1:OUSD',
    config: {
      address: tokens.mainnet.wOUSD.address,
      abi: tokens.mainnet.wOUSD.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.wOUSD.decimals)],
      chainId: tokens.mainnet.wOUSD.chainId,
    },
    mapResult: (wousd_usd: bigint) => {
      return [wousd_usd, tokens.mainnet.OUSD.decimals];
    },
  },
  '1:wOUSD_USD': {
    type: 'derived',
    id: '1:wOUSD_USD',
    dependsOn: ['1:wOUSD_1:OUSD', '1:OUSD_USD'],
  },
  '1:sfrxETH_1:frxETH': {
    type: 'wagmi',
    id: '1:sfrxETH_1:frxETH',
    config: {
      address: tokens.mainnet.sfrxETH.address,
      abi: tokens.mainnet.sfrxETH.abi,
      functionName: 'previewRedeem',
      args: [parseUnits('1', tokens.mainnet.sfrxETH.decimals)],
      chainId: tokens.mainnet.sfrxETH.chainId,
    },
    mapResult: (sfrxeth_usd: bigint) => {
      return [sfrxeth_usd, tokens.mainnet.sfrxETH.decimals];
    },
  },
  '1:sfrxETH_USD': {
    type: 'derived',
    id: '1:sfrxETH_USD',
    dependsOn: ['1:sfrxETH_1:frxETH', '1:frxETH_1:ETH', '1:ETH_USD'],
  },
  '1:WETH_USD': {
    type: 'derived',
    id: '1:WETH_USD',
    dependsOn: ['1:WETH_1:ETH', '1:ETH_USD'],
  },
  '1:OGN_USD': {
    type: 'coingecko',
    id: '1:OGN_USD',
    config: coingeckoTokenIds.OGN,
  },
  '1:primeETH_1:ETH': {
    id: '1:primeETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'primeETHPrice',
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (primeETH_ETH: bigint) => {
      return [primeETH_ETH, tokens.mainnet.primeETH.decimals];
    },
  },
  '1:primeETH_USD': {
    id: '1:primeETH_USD',
    type: 'derived',
    dependsOn: ['1:primeETH_1:ETH', '1:ETH_USD'],
  },
  '1:mETH_1:ETH': {
    id: '1:mETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.mETH.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (meth_eth: bigint) => {
      return [meth_eth, tokens.mainnet.mETH.decimals];
    },
  },
  '1:mETH_USD': {
    id: '1:mETH_USD',
    type: 'derived',
    dependsOn: ['1:mETH_1:ETH', '1:ETH_USD'],
  },
  '1:ETHx_1:ETH': {
    id: '1:ETHx_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.ETHx.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (ethx_eth: bigint) => {
      return [ethx_eth, tokens.mainnet.ETHx.decimals];
    },
  },
  '1:ETHx_USD': {
    id: '1:ETHx_USD',
    type: 'derived',
    dependsOn: ['1:ETHx_1:ETH', '1:ETH_USD'],
  },
  '1:swETH_1:ETH': {
    id: '1:swETH_1:ETH',
    type: 'wagmi',
    config: {
      address: contracts.mainnet.lrtOracle.address,
      abi: contracts.mainnet.lrtOracle.abi,
      functionName: 'getAssetPrice',
      args: [tokens.mainnet.swETH.address],
      chainId: contracts.mainnet.lrtOracle.chainId,
    },
    mapResult: (sweth_eth: bigint) => {
      return [sweth_eth, tokens.mainnet.swETH.decimals];
    },
  },
  '1:swETH_USD': {
    id: '1:swETH_USD',
    type: 'derived',
    dependsOn: ['1:swETH_1:ETH', '1:ETH_USD'],
  },
  '1:WETH_1:ETH': {
    id: '1:WETH_1:ETH',
    type: 'rest',
    config: async () => from(1),
  },
  '1:OETH_1:ETH': {
    id: '1:OETH_1:ETH',
    type: 'rest',
    config: async () => from(1 - OETH_REDEEM_FEE),
  },
  '42161:ETH_USD': {
    id: '42161:ETH_USD',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesArbitrum.ETH_USD,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: arbitrum.id,
    },
    mapResult: chainLinkUsdMapper,
  },
  '42161:wOETH_42161:OETH': {
    id: '42161:wOETH_42161:OETH',
    type: 'wagmi',
    config: {
      address: chainlinkOraclesArbitrum.wOETH_OETH,
      abi: ChainlinkAggregatorABI,
      functionName: 'latestRoundData',
      chainId: arbitrum.id,
    },
    mapResult: chainLinkEthMapper,
  },
  '42161:wOETH_USD': {
    id: '42161:wOETH_USD',
    type: 'derived',
    dependsOn: ['42161:wOETH_42161:OETH', '42161:ETH_USD'],
  },
  '42161:WETH_USD': {
    id: '42161:WETH_USD',
    type: 'derived',
    dependsOn: ['42161:ETH_USD'],
  },
};

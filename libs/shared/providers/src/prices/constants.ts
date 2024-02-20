/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChainlinkAggregatorABI,
  contracts,
  tokens,
} from '@origin/shared/contracts';
import { pathOr } from 'ramda';
import { formatUnits, parseUnits } from 'viem';

import type { PriceOption, SupportedToken, SupportedTokenPrice } from './types';

export const coingeckoApiEndpoint = 'https://api.coingecko.com/api/v3';

export const coingeckoTokenIds: Record<SupportedToken, string> = {
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
};

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

export const priceOptions: Record<
  'mainnet',
  Record<SupportedTokenPrice, PriceOption>
> = {
  mainnet: {
    ETH_USD: {
      id: 'ETH_USD',
      wagmi: {
        address: chainlinkOracles.ETH_USD,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkUsdMapper,
    },
    OETH_USD: {
      id: 'OETH_USD',
      wagmi: {
        address: contracts.mainnet.DIAOracle.address,
        abi: contracts.mainnet.DIAOracle.abi,
        functionName: 'getValue',
        args: ['OETH/USD'],
      },
      mapResult: diaOracleUsdMapper,
    },
    OUSD_USD: {
      id: 'OUSD_USD',
      wagmi: {
        address: contracts.mainnet.DIAOracle.address,
        abi: contracts.mainnet.DIAOracle.abi,
        functionName: 'getValue',
        args: ['OUSD/USD'],
      },
      mapResult: diaOracleUsdMapper,
    },
    DAI_USD: {
      id: 'DAI_USD',
      wagmi: {
        address: chainlinkOracles.DAI_USD,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkUsdMapper,
    },
    USDC_USD: {
      id: 'USDC_USD',
      wagmi: {
        address: chainlinkOracles.USDC_USD,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkUsdMapper,
    },
    USDT_USD: {
      id: 'USDT_USD',
      wagmi: {
        address: chainlinkOracles.USDT_USD,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkUsdMapper,
    },
    FRAX_USD: {
      id: 'FRAX_USD',
      wagmi: {
        address: chainlinkOracles.FRAX_USD,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkUsdMapper,
    },
    frxETH_ETH: {
      id: 'frxETH_ETH',
      wagmi: {
        address: chainlinkOracles.frxETH_ETH,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkEthMapper,
    },
    frxETH_USD: {
      id: 'frxETH_USD',
      dependsOn: ['frxETH_ETH', 'ETH_USD'],
    },
    rETH_ETH: {
      id: 'rETH_ETH',
      wagmi: {
        address: chainlinkOracles.rETH_ETH,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkEthMapper,
    },
    rETH_USD: {
      id: 'rETH_USD',
      dependsOn: ['rETH_ETH', 'ETH_USD'],
    },
    stETH_ETH: {
      id: 'stETH_ETH',
      wagmi: {
        address: chainlinkOracles.stETH_ETH,
        abi: ChainlinkAggregatorABI,
        functionName: 'latestRoundData',
      },
      mapResult: chainLinkEthMapper,
    },
    stETH_USD: {
      id: 'stETH_USD',
      dependsOn: ['stETH_ETH', 'ETH_USD'],
    },
    wOETH_OETH: {
      id: 'wOETH_OETH',
      wagmi: {
        address: tokens.mainnet.wOETH.address,
        abi: tokens.mainnet.wOETH.abi,
        functionName: 'previewRedeem',
        args: [parseUnits('1', tokens.mainnet.wOETH.decimals)],
      },
      mapResult: (woeth_usd: bigint) => {
        return +formatUnits(woeth_usd, tokens.mainnet.wOETH.decimals);
      },
    },
    wOETH_USD: {
      id: 'wOETH_USD',
      dependsOn: ['wOETH_OETH', 'OETH_USD'],
    },
    wOUSD_OUSD: {
      id: 'wOUSD_OUSD',
      wagmi: {
        address: tokens.mainnet.wOUSD.address,
        abi: tokens.mainnet.wOUSD.abi,
        functionName: 'previewRedeem',
        args: [parseUnits('1', tokens.mainnet.wOUSD.decimals)],
      },
      mapResult: (wousd_usd: bigint) => {
        return +formatUnits(wousd_usd, tokens.mainnet.OUSD.decimals);
      },
    },
    wOUSD_USD: {
      id: 'wOUSD_USD',
      dependsOn: ['wOUSD_OUSD', 'OUSD_USD'],
    },
    sfrxETH_frxETH: {
      id: 'sfrxETH_frxETH',
      wagmi: {
        address: tokens.mainnet.sfrxETH.address,
        abi: tokens.mainnet.sfrxETH.abi,
        functionName: 'previewRedeem',
        args: [parseUnits('1', tokens.mainnet.sfrxETH.decimals)],
      },
      mapResult: (sfrxeth_usd: bigint) => {
        return +formatUnits(sfrxeth_usd, tokens.mainnet.sfrxETH.decimals);
      },
    },
    sfrxETH_USD: {
      id: 'sfrxETH_USD',
      dependsOn: ['sfrxETH_frxETH', 'frxETH_ETH', 'ETH_USD'],
    },
    WETH_USD: {
      id: 'WETH_USD',
      coinGeckoId: coingeckoTokenIds.WETH,
    },
    OGN_USD: {
      id: 'OGN_USD',
      coinGeckoId: coingeckoTokenIds.OGN,
    },
  },
};

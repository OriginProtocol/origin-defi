import { indexBy, prop } from 'ramda';
import { erc20Abi } from 'viem';
import { arbitrum, mainnet } from 'wagmi/chains';

import { DAIABI } from './abis/DAI';
import { OETHABI } from './abis/OETH';
import { OUSDABI } from './abis/OUSD';
import { sfrxethABI } from './abis/sfrxeth';
import { USDCABI } from './abis/USDC';
import { USDTABI } from './abis/USDT';
import { veOGVABI } from './abis/veOGV';
import { WOETHABI } from './abis/WOETH';
import { WrappedOusdABI } from './abis/WrappedOusd';
import { xOGNABI } from './abis/xOGN';

export const tokens = {
  mainnet: {
    DAI: {
      id: '1:DAI',
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      chainId: mainnet.id,
      abi: DAIABI,
      name: 'Dai Stablecoin',
      decimals: 18,
      symbol: 'DAI',
    },
    ETH: {
      id: '1:ETH',
      address: undefined,
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    ETHx: {
      id: '1:ETHx',
      address: '0xa35b1b31ce002fbf2058d22f30f95d405200a15b',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Stader ETHx',
      decimals: 18,
      symbol: 'ETHx',
    },
    frxETH: {
      id: '1:frxETH',
      address: '0x5E8422345238F34275888049021821E8E08CAa1f',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Frax Ether',
      decimals: 18,
      symbol: 'frxETH',
    },
    mETH: {
      id: '1:mETH',
      address: '0xd5f7838f5c461feff7fe49ea5ebaf7728bb0adfa',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Mantle Staked Ether',
      decimals: 18,
      symbol: 'mETH',
    },
    OETH: {
      id: '1:OETH',
      address: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
      chainId: mainnet.id,
      abi: OETHABI,
      name: 'Origin Ether',
      decimals: 18,
      symbol: 'OETH',
    },
    OGN: {
      id: '1:OGN',
      address: '0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Origin Token',
      decimals: 18,
      symbol: 'OGN',
    },
    OGV: {
      id: '1:OGV',
      address: '0x9c354503C38481a7A7a51629142963F98eCC12D0',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Origin Dollar Governance',
      decimals: 18,
      symbol: 'OGV',
    },
    OUSD: {
      id: '1:OUSD',
      address: '0x2A8e1E676Ec238d8A992307B495b45B3fEAa5e86',
      chainId: mainnet.id,
      abi: OUSDABI,
      name: 'Origin Dollar',
      decimals: 18,
      symbol: 'OUSD',
    },
    primeETH: {
      id: '1:primeETH',
      address: '0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Prime ETH',
      decimals: 18,
      symbol: 'primeETH',
    },
    rETH: {
      id: '1:rETH',
      address: '0xae78736Cd615f374D3085123A210448E74Fc6393',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Rocket Pool ETH',
      decimals: 18,
      symbol: 'rETH',
    },
    sfrxETH: {
      id: '1:sfrxETH',
      address: '0xac3E018457B222d93114458476f3E3416Abbe38F',
      chainId: mainnet.id,
      abi: sfrxethABI,
      name: 'Staked Frax Ether',
      decimals: 18,
      symbol: 'sfrxETH',
    },
    stETH: {
      id: '1:stETH',
      address: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Liquid Staked Ether 2.0',
      decimals: 18,
      symbol: 'stETH',
    },
    swETH: {
      id: '1:swETH',
      address: '0xf951e335afb289353dc249e82926178eac7ded78',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Swell ETH',
      decimals: 18,
      symbol: 'swETH',
    },
    USDC: {
      id: '1:USDC',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      chainId: mainnet.id,
      abi: USDCABI,
      name: 'USD Coin',
      decimals: 6,
      symbol: 'USDC',
    },
    USDT: {
      id: '1:USDT',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      chainId: mainnet.id,
      abi: USDTABI,
      name: 'Tether USD',
      decimals: 6,
      symbol: 'USDT',
    },
    veOGV: {
      id: '1:veOGV',
      address: '0x0C4576Ca1c365868E162554AF8e385dc3e7C66D9',
      chainId: mainnet.id,
      abi: veOGVABI,
      name: 'Staked Origin Dollar Governance',
      decimals: 18,
      symbol: 'veOGV',
    },
    WETH: {
      id: '1:WETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      chainId: mainnet.id,
      abi: erc20Abi,
      name: 'Wrapped Ether',
      decimals: 18,
      symbol: 'WETH',
    },
    wOETH: {
      id: '1:wOETH',
      address: '0xDcEe70654261AF21C44c093C300eD3Bb97b78192',
      chainId: mainnet.id,
      abi: WOETHABI,
      name: 'Wrapped Origin Ether',
      decimals: 18,
      symbol: 'wOETH',
    },
    wOUSD: {
      id: '1:wOUSD',
      address: '0xD2af830E8CBdFed6CC11Bab697bB25496ed6FA62',
      chainId: mainnet.id,
      abi: WrappedOusdABI,
      name: 'Wrapped Origin Dollar',
      decimals: 18,
      symbol: 'wOUSD',
    },
    xOGN: {
      id: '1:xOGN',
      address: '0x63898b3b6ef3d39332082178656e9862bee45c57',
      chainId: mainnet.id,
      abi: xOGNABI,
      name: 'Staked OGN',
      decimals: 18,
      symbol: 'xOGN',
    },
  },
  arbitrum: {
    ETH: {
      id: '42161:ETH',
      address: undefined,
      chainId: arbitrum.id,
      abi: erc20Abi,
      name: 'Ethereum',
      decimals: 18,
      symbol: 'ETH',
    },
    wOETH: {
      id: '42161:wOETH',
      address: '0xD8724322f44E5c58D7A815F542036fb17DbbF839',
      chainId: arbitrum.id,
      abi: WOETHABI,
      name: 'Wrapped Origin Ether',
      decimals: 18,
      symbol: 'wOETH',
    },
  },
} as const;

export const tokenList = [
  ...Object.values(tokens.mainnet),
  ...Object.values(tokens.arbitrum),
];

export const tokenIdMap = indexBy(prop('id'), tokenList);

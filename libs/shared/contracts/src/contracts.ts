import { mainnet } from 'wagmi/chains';

import ChainlinkAggregatorV3Interface from './abis/ChainlinkAggregatorV3Interface.json';
import CompensationClaims from './abis/CompensationClaims.json';
import CurveAddressProvider from './abis/CurveAddressProvider.json';
import OETH from './abis/OETH.json';
import OETHZapper from './abis/OETHZapper.json';
import { OracleRouterABI } from './abis/OracleRouter';
import { VaultCoreABI } from './abis/VaultCore';
import WOETH from './abis/WOETH.json';

export const contracts = {
  mainnet: {
    vault: {
      address: '0x39254033945AA2E4809Cc2977E7087BEE48bd7Ab',
      chainId: mainnet.id,
      abi: VaultCoreABI,
      name: 'vault',
    },
    compensation: {
      address: '0x9C94df9d594BA1eb94430C006c269C314B1A8281',
      chainId: mainnet.id,
      abi: CompensationClaims,
      name: 'compensation',
    },
    chainlinkEthAggregator: {
      address: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      chainId: mainnet.id,
      abi: ChainlinkAggregatorV3Interface,
      name: 'chainlinkEthAggregator',
    },
    chainlinkFastGasAggregator: {
      address: '0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C',
      chainId: mainnet.id,
      abi: ChainlinkAggregatorV3Interface,
      name: 'chainlinkFastGasAggregator',
    },
    curveAddressProvider: {
      address: '0x0000000022d53366457f9d5e68ec105046fc4383',
      chainId: mainnet.id,
      abi: CurveAddressProvider,
      name: 'curveAddressProvider',
    },
    curveOETHPool: {
      address: '0x94b17476a93b3262d87b9a326965d1e91f9c13e7',
      chainId: mainnet.id,
      abi: [
        {
          stateMutability: 'payable',
          type: 'function',
          name: 'exchange',
          inputs: [
            { name: 'i', type: 'int128' },
            { name: 'j', type: 'int128' },
            { name: '_dx', type: 'uint256' },
            { name: '_min_dy', type: 'uint256' },
          ],
          outputs: [{ name: '', type: 'uint256' }],
        },
      ],
      name: 'curveOETHPool',
    },
    zapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapper,
      name: 'zapper',
    },
    oracleRouter: {
      address: '0x3cCD26E82F7305B12742fBb36708B42f82B61dBa',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'oracleRouter',
    },
    oethProxy: {
      address: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
      chainId: mainnet.id,
      abi: OETH,
      name: 'oethProxy',
    },
    woethProxy: {
      address: '0xDcEe70654261AF21C44c093C300eD3Bb97b78192',
      chainId: mainnet.id,
      abi: WOETH,
      name: 'woethProxy',
    },
  },
} as const;

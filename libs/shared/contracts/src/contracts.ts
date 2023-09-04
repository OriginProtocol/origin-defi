import { mainnet } from 'wagmi/chains';

import { CurvePoolABI } from './abis/CurvePool';
import { OETHABI } from './abis/OETH';
import { OETHVaultCoreABI } from './abis/OETHVaultCore';
import { OETHZapperABI } from './abis/OETHZapper';
import { OracleRouterABI } from './abis/OracleRouter';
import { WOETHABI } from './abis/WOETH';

export const contracts = {
  mainnet: {
    curveOethPool: {
      address: '0x94b17476a93b3262d87b9a326965d1e91f9c13e7',
      chainId: mainnet.id,
      abi: CurvePoolABI,
      name: 'curveOethPool',
    },
    OETH: {
      address: '0x856c4Efb76C1D1AE02e20CEB03A2A6a08b0b8dC3',
      chainId: mainnet.id,
      abi: OETHABI,
      name: 'OETH',
    },
    OETHOracleRouter: {
      address: '0x3cCD26E82F7305B12742fBb36708B42f82B61dBa',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'oracleRouter',
    },
    OETHVaultCore: {
      address: '0x39254033945AA2E4809Cc2977E7087BEE48bd7Ab',
      chainId: mainnet.id,
      abi: OETHVaultCoreABI,
      name: 'vault',
    },
    WOETH: {
      address: '0xDcEe70654261AF21C44c093C300eD3Bb97b78192',
      chainId: mainnet.id,
      abi: WOETHABI,
      name: 'WOETH',
    },
    OETHZapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapperABI,
      name: 'zapper',
    },
  },
} as const;

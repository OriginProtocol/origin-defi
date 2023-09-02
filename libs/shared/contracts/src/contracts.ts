import { mainnet } from 'wagmi/chains';

import { OETHZapperABI } from './abis/OETHZapper';
import { OracleRouterABI } from './abis/OracleRouter';
import { VaultCoreABI } from './abis/VaultCore';

export const contracts = {
  mainnet: {
    vault: {
      address: '0x39254033945AA2E4809Cc2977E7087BEE48bd7Ab',
      chainId: mainnet.id,
      abi: VaultCoreABI,
      name: 'vault',
    },
    zapper: {
      address: '0x9858e47BCbBe6fBAC040519B02d7cd4B2C470C66',
      chainId: mainnet.id,
      abi: OETHZapperABI,
      name: 'zapper',
    },
    oracleRouter: {
      address: '0x3cCD26E82F7305B12742fBb36708B42f82B61dBa',
      chainId: mainnet.id,
      abi: OracleRouterABI,
      name: 'oracleRouter',
    },
  },
} as const;

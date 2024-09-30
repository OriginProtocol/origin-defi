import { isNilOrEmpty } from '@origin/shared/utils';
import { arbitrum, base, mainnet, optimism } from 'viem/chains';
import { createConfig, fallback, http } from 'wagmi';

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, base, ...(import.meta.env.DEV ? [optimism] : [])],
  transports: {
    [mainnet.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_RPC)
      ? fallback([
          http(
            `${import.meta.env.VITE_ALCHEMY_RPC}${
              import.meta.env.VITE_ALCHEMY_ID
            }`,
          ),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_RPC),
    [arbitrum.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_ARBITRUM_RPC)
      ? fallback([
          http(
            `${import.meta.env.VITE_ALCHEMY_ARBITRUM_RPC}${
              import.meta.env.VITE_ALCHEMY_ID
            }`,
          ),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_ARBITRUM_RPC),
    [base.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_BASE_RPC)
      ? fallback([
          http(
            `${import.meta.env.VITE_ALCHEMY_BASE_RPC}${
              import.meta.env.VITE_ALCHEMY_ID
            }`,
          ),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_BASE_RPC),
    [optimism.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_OP_MAINNET_RPC)
      ? fallback([
          http(
            `${import.meta.env.VITE_ALCHEMY_OP_MAINNET_RPC}${
              import.meta.env.VITE_ALCHEMY_ID
            }`,
          ),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_OP_MAINNET_RPC),
  },
});

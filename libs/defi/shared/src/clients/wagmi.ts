import { isNilOrEmpty } from '@origin/shared/utils';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  safepalWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { arbitrum, base, mainnet, optimism } from 'viem/chains';
import { createConfig, fallback, http } from 'wagmi';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Supported',
      wallets: [
        metaMaskWallet,
        rabbyWallet,
        walletConnectWallet,
        coinbaseWallet,
        safeWallet,
        ledgerWallet,
        safepalWallet,
        trustWallet,
      ],
    },
  ],
  {
    appName: 'Origin DeFi',
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  },
);

export const wagmiConfig = createConfig({
  chains: [mainnet, arbitrum, base, ...(import.meta.env.DEV ? [optimism] : [])],
  connectors,
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

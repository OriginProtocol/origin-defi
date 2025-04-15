import { isNilOrEmpty } from '@origin/shared/utils';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  binanceWallet,
  bitgetWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  safepalWallet,
  safeWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  plumeMainnet,
  sonic,
} from 'viem/chains';
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
        binanceWallet,
        bitgetWallet,
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
  chains: [
    mainnet,
    arbitrum,
    base,
    plumeMainnet,
    sonic,
    ...(import.meta.env.DEV ? [optimism] : []),
  ],
  connectors,
  transports: {
    [mainnet.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_RPC),
    [arbitrum.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_ARBITRUM_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_ARBITRUM_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_ARBITRUM_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_ARBITRUM_RPC),
    [base.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_BASE_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_BASE_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_BASE_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_BASE_RPC),
    [plumeMainnet.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_PLUME_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_PLUME_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_PLUME_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_PLUME_RPC),
    [sonic.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_SONIC_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_SONIC_MAINNET_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_SONIC_MAINNET_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_SONIC_RPC),
    [optimism.id]: isNilOrEmpty(import.meta.env?.VITE_CUSTOM_OP_MAINNET_RPC)
      ? fallback([
          ...(!!import.meta.env.VITE_ALCHEMY_OP_MAINNET_RPC &&
          !!import.meta.env.VITE_ALCHEMY_ID
            ? [
                http(
                  `${import.meta.env.VITE_ALCHEMY_OP_MAINNET_RPC}${
                    import.meta.env.VITE_ALCHEMY_ID
                  }`,
                ),
              ]
            : []),
          http(),
        ])
      : http(import.meta.env.VITE_CUSTOM_OP_MAINNET_RPC),
  },
});

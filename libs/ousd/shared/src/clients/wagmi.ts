/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNilOrEmpty } from '@origin/shared/utils';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const providers = [
  ...(isNilOrEmpty(import.meta.env?.VITE_CUSTOM_RPC)
    ? []
    : [
        jsonRpcProvider({
          rpc: () => ({
            http: import.meta.env.VITE_CUSTOM_RPC,
          }),
        }),
      ]),
  alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
  publicProvider(),
];

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  providers as any,
  {
    stallTimeout: import.meta.env.DEV ? 60000 : 3000,
  },
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({
        chains,
        shimDisconnect: true,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      walletConnectWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      coinbaseWallet({ appName: 'OUSD', chains }),
      rabbyWallet({ chains }),
      braveWallet({ chains, shimDisconnect: true }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      // ledgerWallet({
      //   chains,
      //   projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      // }),
      safeWallet({ chains }),
      rainbowWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      argentWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

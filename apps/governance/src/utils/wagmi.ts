/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const providers = [
  alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
  publicProvider(),
];

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  providers as any,
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
      ledgerWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      walletConnectWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      coinbaseWallet({ appName: 'origin', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      safeWallet({ chains }),
      rainbowWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      braveWallet({ chains, shimDisconnect: true }),
      argentWallet({
        chains,
        projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      imTokenWallet({
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

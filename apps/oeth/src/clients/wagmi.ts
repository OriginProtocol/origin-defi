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
import { goerli, localhost, mainnet } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const VITE_WALLET_CONNECT_PROJECT_ID = import.meta.env
  .VITE_WALLET_CONNECT_PROJECT_ID;
const VITE_ALCHEMY_ID = import.meta.env.VITE_ALCHEMY_ID;

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, localhost],
  [alchemyProvider({ apiKey: VITE_ALCHEMY_ID }), publicProvider()],
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({
        chains,
        shimDisconnect: true,
        projectId: VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      ledgerWallet({ chains, projectId: VITE_WALLET_CONNECT_PROJECT_ID }),
      walletConnectWallet({
        chains,
        projectId: VITE_WALLET_CONNECT_PROJECT_ID,
      }),
      coinbaseWallet({ appName: 'mStable', chains }),
    ],
  },
  {
    groupName: 'Others',
    wallets: [
      injectedWallet({ chains, shimDisconnect: true }),
      safeWallet({ chains }),
      rainbowWallet({ chains, projectId: VITE_WALLET_CONNECT_PROJECT_ID }),
      braveWallet({ chains, shimDisconnect: true }),
      argentWallet({ chains, projectId: VITE_WALLET_CONNECT_PROJECT_ID }),
      imTokenWallet({ chains, projectId: VITE_WALLET_CONNECT_PROJECT_ID }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  safepalWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, fallback, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Supported',
      wallets: [
        metaMaskWallet,
        rabbyWallet,
        walletConnectWallet,
        coinbaseWallet,
        ledgerWallet,
        safepalWallet,
      ],
    },
  ],
  {
    appName: 'OETH',
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  },
);

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors,
  transports: {
    [mainnet.id]: fallback([
      http(
        `${import.meta.env.VITE_ALCHEMY_RPC}${import.meta.env.VITE_ALCHEMY_ID}`,
      ),
      http(),
    ]),
  },
});

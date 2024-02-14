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
        safeWallet,
        ledgerWallet,
        safepalWallet,
        trustWallet,
      ],
    },
  ],
  {
    appName: 'Prime Staked',
    projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  },
);
export const wagmiConfig = createConfig({
  chains: [mainnet],
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
  },
});

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
// import { connectorsForWallets } from '@rainbow-me/rainbowkit';
// import {
//   argentWallet,
//   braveWallet,
//   coinbaseWallet,
//   injectedWallet,
//   ledgerWallet,
//   metaMaskWallet,
//   rabbyWallet,
//   rainbowWallet,
//   safeWallet,
//   walletConnectWallet,
// } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, fallback, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       metaMaskWallet({
//         chains,
//         shimDisconnect: true,
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//       }),
//       walletConnectWallet({
//         chains,
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//       }),
//       coinbaseWallet({ appName: 'OETH', chains }),
//       rabbyWallet({ chains }),
//       braveWallet({ chains, shimDisconnect: true }),
//     ],
//   },
//   {
//     groupName: 'Others',
//     wallets: [
//       injectedWallet({ chains, shimDisconnect: true }),
//       ledgerWallet({
//         chains,
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//       }),
//       safeWallet({ chains }),
//       rainbowWallet({
//         chains,
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//       }),
//       argentWallet({
//         chains,
//         projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
//       }),
//     ],
//   },
// ]);

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

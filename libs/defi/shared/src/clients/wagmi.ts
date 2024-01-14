import { isNilOrEmpty } from '@origin/shared/utils';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
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
import { fallback, http } from 'wagmi';
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
//       coinbaseWallet({ appName: 'Origin DeFi', chains }),
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

export const wagmiConfig = getDefaultConfig({
  appName: 'Origin DeFi',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet],
  transports: {
    [mainnet.id]: fallback([
      ...(isNilOrEmpty(import.meta.env?.VITE_CUSTOM_RPC)
        ? []
        : [http(import.meta.env.VITE_CUSTOM_RPC)]),
      http(
        `${import.meta.env.VITE_ALCHEMY_RPC}${import.meta.env.VITE_ALCHEMY_ID}`,
      ),
      http(),
    ]),
  },
});

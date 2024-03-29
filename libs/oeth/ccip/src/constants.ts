import { contracts } from '@origin/shared/contracts';
import { arbitrum, mainnet } from 'viem/chains';

import type { Contract } from '@origin/shared/contracts';

export const ccipRouter: Record<
  string,
  Contract & {
    chainSelectorId: bigint;
  }
> = {
  [mainnet.id]: {
    chainSelectorId: 5009297550715157269n,
    ...contracts.mainnet.ccipRouter,
  },
  [arbitrum.id]: {
    chainSelectorId: 4949039107694359620n,
    ...contracts.arbitrum.ccipRouter,
  },
};

// TODO: remove?
//
// export const statuses = {
//   approval: {
//     idle: () => ({
//       enabled: true,
//       message: defineMessage({ defaultMessage: 'Approve' }),
//     }),
//     waitingForSignature: () => ({
//       enabled: false,
//       message: defineMessage({
//         defaultMessage: 'Waiting for signature',
//       }),
//     }),
//     waitingForTransaction: () => ({
//       enabled: false,
//       message: defineMessage({ defaultMessage: 'Processing Approval' }),
//     }),
//   },
//   bridge: {
//     enterAmount: () => ({
//       enabled: false,
//       message: defineMessage({ defaultMessage: 'Enter an amount' }),
//     }),
//     insufficientAmount: () => ({
//       enabled: false,
//       message: defineMessage({ defaultMessage: 'Insufficient amount' }),
//     }),
//     disabled: () => ({
//       enabled: false,
//       message: defineMessage({ defaultMessage: 'Bridge {symbol}' }),
//     }),
//     idle: () => ({
//       enabled: true,
//       message: defineMessage({ defaultMessage: 'Bridge {symbol}' }),
//     }),
//     waitingForSignature: () => ({
//       enabled: false,
//       message: defineMessage({
//         defaultMessage: 'Waiting for signature',
//       }),
//     }),
//     waitingForTransaction: () => ({
//       enabled: false,
//       message: defineMessage({
//         defaultMessage: 'Waiting for transaction',
//       }),
//     }),
//   },
// };

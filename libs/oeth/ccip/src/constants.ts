import { contracts } from '@origin/shared/contracts';
import { defineMessage } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

import type { HexAddress } from '@origin/shared/utils';

export const ccipRouter: Record<
  string,
  {
    address: HexAddress;
    chainSelectorId: bigint;
    abi: typeof contracts.mainnet.ccipRouter.abi;
    chainId: number;
  }
> = {
  [mainnet.id]: {
    address: contracts.mainnet.ccipRouter.address,
    chainSelectorId: 5009297550715157269n,
    abi: contracts.mainnet.ccipRouter.abi,
    chainId: contracts.mainnet.ccipRouter.chainId,
  },
  [arbitrum.id]: {
    address: contracts.arbitrum.ccipRouter.address,
    chainSelectorId: 4949039107694359620n,
    abi: contracts.arbitrum.ccipRouter.abi,
    chainId: contracts.arbitrum.ccipRouter.chainId,
  },
};

export const statuses = {
  approval: {
    idle: () =>
      ({
        enabled: true,
        message: defineMessage({ defaultMessage: 'Approve' }),
      }) as const,
    waitingForSignature: () =>
      ({
        enabled: false,
        message: defineMessage({
          defaultMessage: 'Waiting for signature',
        }),
      }) as const,
    waitingForTransaction: () =>
      ({
        enabled: false,
        message: defineMessage({ defaultMessage: 'Processing Approval' }),
      }) as const,
  },
  bridge: {
    enterAmount: () =>
      ({
        enabled: false,
        message: defineMessage({ defaultMessage: 'Enter an amount' }),
      }) as const,
    insufficientAmount: () =>
      ({
        enabled: false,
        message: defineMessage({ defaultMessage: 'Insufficient amount' }),
      }) as const,
    disabled: () =>
      ({
        enabled: false,
        message: defineMessage({ defaultMessage: 'Bridge {symbol}' }),
      }) as const,
    idle: () =>
      ({
        enabled: true,
        message: defineMessage({ defaultMessage: 'Bridge {symbol}' }),
      }) as const,
    waitingForSignature: () =>
      ({
        enabled: false,
        message: defineMessage({
          defaultMessage: 'Waiting for signature',
        }),
      }) as const,
    waitingForTransaction: () =>
      ({
        enabled: false,
        message: defineMessage({
          defaultMessage: 'Waiting for transaction',
        }),
      }) as const,
  },
};

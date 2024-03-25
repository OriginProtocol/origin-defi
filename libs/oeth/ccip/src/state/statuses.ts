import { defineMessage } from 'react-intl';

export const statuses = {
  approval: {
    idle: (doApprove: () => Promise<void>) =>
      ({
        enabled: true,
        message: defineMessage({ defaultMessage: 'Approve' }),
        action: doApprove,
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
        message: defineMessage({ defaultMessage: 'Bridge' }),
      }) as const,
    idle: (doBridge: () => Promise<void>) =>
      ({
        enabled: true,
        message: defineMessage({ defaultMessage: 'Bridge' }),
        action: doBridge,
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

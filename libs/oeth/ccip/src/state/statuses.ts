import type { IntlShape } from 'react-intl';

export const statuses = {
  approval: {
    idle: (intl: IntlShape, doApprove: () => Promise<void>) =>
      ({
        enabled: true,
        message: intl.formatMessage({ defaultMessage: 'Approve' }),
        action: doApprove,
      }) as const,
    waitingForSignature: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({
          defaultMessage: 'Waiting for signature',
        }),
      }) as const,
    waitingForTransaction: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({ defaultMessage: 'Processing Approval' }),
      }) as const,
  },
  bridge: {
    enterAmount: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({ defaultMessage: 'Enter an amount' }),
      }) as const,
    insufficientAmount: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({ defaultMessage: 'Insufficient amount' }),
      }) as const,
    disabled: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({ defaultMessage: 'Bridge' }),
      }) as const,
    idle: (intl: IntlShape, doBridge: () => Promise<void>) =>
      ({
        enabled: true,
        message: intl.formatMessage({ defaultMessage: 'Bridge' }),
        action: doBridge,
      }) as const,
    waitingForSignature: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({
          defaultMessage: 'Waiting for signature',
        }),
      }) as const,
    waitingForTransaction: (intl: IntlShape) =>
      ({
        enabled: false,
        message: intl.formatMessage({
          defaultMessage: 'Waiting for transaction',
        }),
      }) as const,
  },
};

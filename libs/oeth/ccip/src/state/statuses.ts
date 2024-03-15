export const statuses = {
  approval: {
    idle: (doApprove: () => Promise<void>) =>
      ({
        enabled: true,
        message: 'Approve',
        action: doApprove,
      }) as const,
    waitingForSignature: () =>
      ({ enabled: false, message: 'Waiting for signature' }) as const,
    waitingForTransaction: () =>
      ({ enabled: false, message: 'Waiting for transaction' }) as const,
  },
  bridge: {
    enterAmount: () =>
      ({
        enabled: false,
        message: 'Enter an amount',
      }) as const,
    insufficientAmount: () =>
      ({
        enabled: false,
        message: 'Insufficient amount',
      }) as const,
    disabled: () =>
      ({
        enabled: false,
        message: 'Bridge',
      }) as const,
    idle: (doBridge: () => Promise<void>) =>
      ({
        enabled: true,
        message: 'Bridge',
        action: doBridge,
      }) as const,
    waitingForSignature: () =>
      ({ enabled: false, message: 'Waiting for signature' }) as const,
    waitingForTransaction: () =>
      ({ enabled: false, message: 'Waiting for transaction' }) as const,
    complete: () =>
      ({ enabled: false, message: 'Transaction Successful' }) as const,
  },
};

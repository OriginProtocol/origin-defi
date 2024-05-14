import { pathEq } from 'ramda';

import type { SimulateContractErrorType } from '@wagmi/core';

export const isUserRejected = pathEq('UserRejectedRequestError', [
  'cause',
  'name',
]);

export const isInsufficientFundsError = (
  simulateError: SimulateContractErrorType | null,
) =>
  simulateError?.name === 'ContractFunctionExecutionError' &&
  simulateError?.cause?.name === 'CallExecutionError' &&
  simulateError.cause.cause?.name === 'InsufficientFundsError';

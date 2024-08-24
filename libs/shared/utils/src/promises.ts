export const isFulfilled = <T>(
  p: PromiseSettledResult<T>,
): p is PromiseFulfilledResult<T> => p.status === 'fulfilled';

export const isRejected = <T>(
  p: PromiseSettledResult<T>,
): p is PromiseRejectedResult => p.status === 'rejected';

export const timeoutResolvePromise = <T = unknown>(
  timeout: number,
  defaultReturn: T,
) =>
  new Promise<T>((resolve) =>
    setTimeout(() => resolve(defaultReturn), timeout),
  );

export const timeoutRejectPromise = (timeout: number) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout ${timeout}ms`)), timeout),
  );

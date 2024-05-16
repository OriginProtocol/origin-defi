import { pathEq } from 'ramda';

export const isUserRejected = pathEq('UserRejectedRequestError', [
  'cause',
  'name',
]);

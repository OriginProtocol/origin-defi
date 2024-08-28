import { pathEq } from 'ramda';

export const isUserRejected = (error: unknown) =>
  pathEq('UserRejectedRequestError', ['cause', 'name'], error) ||
  pathEq('UserRejectedRequestError', ['cause', 'cause', 'name'], error);

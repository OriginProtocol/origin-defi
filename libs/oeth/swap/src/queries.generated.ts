import { graphqlClient } from '@origin/oeth/shared';
import { useQuery } from '@tanstack/react-query';

import type * as Types from '@origin/oeth/shared';
import type { UseQueryOptions } from '@tanstack/react-query';
export type ApiesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;

export type ApiesQuery = {
  __typename?: 'Query';
  apies: Array<{
    __typename?: 'APY';
    id: string;
    timestamp: any;
    apy7DayAvg: number;
    apy30DayAvg: number;
  }>;
};

export const ApiesDocument = `
    query Apies($limit: Int) {
  apies(
    limit: $limit
    orderBy: timestamp_DESC
    where: {timestamp_gt: "2023-06-06T12:38:47.000000Z"}
  ) {
    id
    timestamp
    apy7DayAvg
    apy30DayAvg
  }
}
    `;
export const useApiesQuery = <TData = ApiesQuery, TError = unknown>(
  variables?: ApiesQueryVariables,
  options?: UseQueryOptions<ApiesQuery, TError, TData>,
) =>
  useQuery<ApiesQuery, TError, TData>(
    variables === undefined ? ['Apies'] : ['Apies', variables],
    graphqlClient<ApiesQuery, ApiesQueryVariables>(ApiesDocument, variables),
    options,
  );

useApiesQuery.getKey = (variables?: ApiesQueryVariables) =>
  variables === undefined ? ['Apies'] : ['Apies', variables];
useApiesQuery.fetcher = (
  variables?: ApiesQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<ApiesQuery, ApiesQueryVariables>(
    ApiesDocument,
    variables,
    options,
  );

import * as Types from '@origin/ousd/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/ousd/shared';
export type ApiesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ApiesQuery = { __typename?: 'Query', ousdapies: Array<{ __typename?: 'OUSDAPY', id: string, timestamp: string, apy7DayAvg: number, apy30DayAvg: number }> };


export const ApiesDocument = `
    query Apies($limit: Int) {
  ousdapies(limit: $limit, orderBy: timestamp_DESC) {
    id
    timestamp
    apy7DayAvg
    apy30DayAvg
  }
}
    `;
export const useApiesQuery = <
      TData = ApiesQuery,
      TError = unknown
    >(
      variables?: ApiesQueryVariables,
      options?: UseQueryOptions<ApiesQuery, TError, TData>
    ) =>
    useQuery<ApiesQuery, TError, TData>(
      variables === undefined ? ['Apies'] : ['Apies', variables],
      graphqlClient<ApiesQuery, ApiesQueryVariables>(ApiesDocument, variables),
      options
    );

useApiesQuery.getKey = (variables?: ApiesQueryVariables) => variables === undefined ? ['Apies'] : ['Apies', variables];
;

useApiesQuery.fetcher = (variables?: ApiesQueryVariables, options?: RequestInit['headers']) => graphqlClient<ApiesQuery, ApiesQueryVariables>(ApiesDocument, variables, options);
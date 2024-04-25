import * as Types from '@origin/ousd/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/ousd/shared';
export type ApiesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ApiesQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', id: string, timestamp: string, apy7DayAvg: number, apy30DayAvg: number }> };



export const ApiesDocument = `
    query Apies($limit: Int) {
  oTokenApies(
    limit: $limit
    orderBy: timestamp_DESC
    where: {chainId_eq: 1, otoken_eq: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86"}
  ) {
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
      options?: Omit<UseQueryOptions<ApiesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ApiesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ApiesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Apies'] : ['Apies', variables],
    queryFn: graphqlClient<ApiesQuery, ApiesQueryVariables>(ApiesDocument, variables),
    ...options
  }
    )};

useApiesQuery.getKey = (variables?: ApiesQueryVariables) => variables === undefined ? ['Apies'] : ['Apies', variables];


useApiesQuery.fetcher = (variables?: ApiesQueryVariables, options?: RequestInit['headers']) => graphqlClient<ApiesQuery, ApiesQueryVariables>(ApiesDocument, variables, options);

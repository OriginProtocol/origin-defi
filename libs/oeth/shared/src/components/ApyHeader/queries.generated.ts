import * as Types from '@origin/oeth/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/oeth/shared';
export type ApiesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ApiesQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', id: string, timestamp: string, apy7DayAvg: number, apy30DayAvg: number }> };



export const ApiesDocument = `
    query Apies($limit: Int) {
  oTokenApies(
    limit: $limit
    orderBy: timestamp_DESC
    where: {timestamp_gt: "2023-06-06T12:38:47.000000Z", chainId_eq: 1, otoken_eq: "0x856c4efb76c1d1ae02e20ceb03a2a6a08b0b8dc3"}
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

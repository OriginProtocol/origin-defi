import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OTokenApyQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type OTokenApyQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', apy7DayAvg: number, apy14DayAvg: number, apy30DayAvg: number }> };



export const OTokenApyDocument = `
    query OTokenApy($chainId: Int!, $token: String!) {
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: $chainId, otoken_containsInsensitive: $token}
  ) {
    apy7DayAvg
    apy14DayAvg
    apy30DayAvg
  }
}
    `;

export const useOTokenApyQuery = <
      TData = OTokenApyQuery,
      TError = unknown
    >(
      variables: OTokenApyQueryVariables,
      options?: Omit<UseQueryOptions<OTokenApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OTokenApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OTokenApyQuery, TError, TData>(
      {
    queryKey: ['OTokenApy', variables],
    queryFn: graphqlClient<OTokenApyQuery, OTokenApyQueryVariables>(OTokenApyDocument, variables),
    ...options
  }
    )};

useOTokenApyQuery.getKey = (variables: OTokenApyQueryVariables) => ['OTokenApy', variables];


useOTokenApyQuery.fetcher = (variables: OTokenApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<OTokenApyQuery, OTokenApyQueryVariables>(OTokenApyDocument, variables, options);

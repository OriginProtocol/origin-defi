import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OethApyQueryVariables = Types.Exact<{
  chainId: Types.Scalars['Int']['input'];
  token: Types.Scalars['String']['input'];
}>;


export type OethApyQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', apy7DayAvg: number, apy30DayAvg: number }> };



export const OethApyDocument = `
    query OethApy($chainId: Int!, $token: String!) {
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: $chainId, otoken_eq: $token}
  ) {
    apy7DayAvg
    apy30DayAvg
  }
}
    `;

export const useOethApyQuery = <
      TData = OethApyQuery,
      TError = unknown
    >(
      variables: OethApyQueryVariables,
      options?: Omit<UseQueryOptions<OethApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethApyQuery, TError, TData>(
      {
    queryKey: ['OethApy', variables],
    queryFn: graphqlClient<OethApyQuery, OethApyQueryVariables>(OethApyDocument, variables),
    ...options
  }
    )};

useOethApyQuery.getKey = (variables: OethApyQueryVariables) => ['OethApy', variables];


useOethApyQuery.fetcher = (variables: OethApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethApyQuery, OethApyQueryVariables>(OethApyDocument, variables, options);

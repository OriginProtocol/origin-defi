import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OgnStatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OgnStatsQuery = { __typename?: 'Query', ognStats: { __typename?: 'OGNStatsResult', circulatingSupply: number, totalSupply: number } };



export const OgnStatsDocument = `
    query OgnStats {
  ognStats {
    circulatingSupply
    totalSupply
  }
}
    `;

export const useOgnStatsQuery = <
      TData = OgnStatsQuery,
      TError = unknown
    >(
      variables?: OgnStatsQueryVariables,
      options?: Omit<UseQueryOptions<OgnStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OgnStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OgnStatsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OgnStats'] : ['OgnStats', variables],
    queryFn: graphqlClient<OgnStatsQuery, OgnStatsQueryVariables>(OgnStatsDocument, variables),
    ...options
  }
    )};

useOgnStatsQuery.getKey = (variables?: OgnStatsQueryVariables) => variables === undefined ? ['OgnStats'] : ['OgnStats', variables];


useOgnStatsQuery.fetcher = (variables?: OgnStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<OgnStatsQuery, OgnStatsQueryVariables>(OgnStatsDocument, variables, options);

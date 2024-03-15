import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OethApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OethApyQuery = { __typename?: 'Query', oethapies: Array<{ __typename?: 'OETHAPY', apy7DayAvg: number, apy30DayAvg: number }> };



export const OethApyDocument = `
    query OethApy {
  oethapies(
    limit: 1
    orderBy: timestamp_DESC
    where: {timestamp_gt: "2023-06-06T12:38:47.000000Z"}
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
      variables?: OethApyQueryVariables,
      options?: Omit<UseQueryOptions<OethApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OethApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OethApyQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OethApy'] : ['OethApy', variables],
    queryFn: graphqlClient<OethApyQuery, OethApyQueryVariables>(OethApyDocument, variables),
    ...options
  }
    )};

useOethApyQuery.getKey = (variables?: OethApyQueryVariables) => variables === undefined ? ['OethApy'] : ['OethApy', variables];


useOethApyQuery.fetcher = (variables?: OethApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<OethApyQuery, OethApyQueryVariables>(OethApyDocument, variables, options);

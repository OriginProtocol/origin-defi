import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OusdApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OusdApyQuery = { __typename?: 'Query', ousdapies: Array<{ __typename?: 'OUSDAPY', apy7DayAvg: number, apy30DayAvg: number }> };



export const OusdApyDocument = `
    query OusdApy {
  ousdapies(limit: 1, orderBy: timestamp_DESC) {
    apy7DayAvg
    apy30DayAvg
  }
}
    `;

export const useOusdApyQuery = <
      TData = OusdApyQuery,
      TError = unknown
    >(
      variables?: OusdApyQueryVariables,
      options?: Omit<UseQueryOptions<OusdApyQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OusdApyQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OusdApyQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OusdApy'] : ['OusdApy', variables],
    queryFn: graphqlClient<OusdApyQuery, OusdApyQueryVariables>(OusdApyDocument, variables),
    ...options
  }
    )};

useOusdApyQuery.getKey = (variables?: OusdApyQueryVariables) => variables === undefined ? ['OusdApy'] : ['OusdApy', variables];


useOusdApyQuery.fetcher = (variables?: OusdApyQueryVariables, options?: RequestInit['headers']) => graphqlClient<OusdApyQuery, OusdApyQueryVariables>(OusdApyDocument, variables, options);

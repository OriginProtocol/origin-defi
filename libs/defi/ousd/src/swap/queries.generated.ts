import * as Types from '@origin/defi/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/defi/shared';
export type OusdApyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OusdApyQuery = { __typename?: 'Query', oTokenApies: Array<{ __typename?: 'OTokenAPY', apy7DayAvg: number, apy30DayAvg: number }> };



export const OusdApyDocument = `
    query OusdApy {
  oTokenApies(
    limit: 1
    orderBy: timestamp_DESC
    where: {chainId_eq: 1, otoken_eq: "0x2a8e1e676ec238d8a992307b495b45b3feaa5e86"}
  ) {
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

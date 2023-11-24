import * as Types from '@origin/governance/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/governance/shared';
export type HomeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', ogvs: Array<{ __typename?: 'OGV', id: string, total: string }> };


export const HomeDocument = `
    query Home {
  ogvs {
    id
    total
  }
}
    `;
export const useHomeQuery = <
      TData = HomeQuery,
      TError = unknown
    >(
      variables?: HomeQueryVariables,
      options?: UseQueryOptions<HomeQuery, TError, TData>
    ) =>
    useQuery<HomeQuery, TError, TData>(
      variables === undefined ? ['Home'] : ['Home', variables],
      graphqlClient<HomeQuery, HomeQueryVariables>(HomeDocument, variables),
      options
    );

useHomeQuery.getKey = (variables?: HomeQueryVariables) => variables === undefined ? ['Home'] : ['Home', variables];
;

useHomeQuery.fetcher = (variables?: HomeQueryVariables, options?: RequestInit['headers']) => graphqlClient<HomeQuery, HomeQueryVariables>(HomeDocument, variables, options);
import * as Types from '@origin/prime/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/prime/shared';
export type UserPointsQueryVariables = Types.Exact<{
  address?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UserPointsQuery = { __typename?: 'Query', lrtPointRecipients: Array<{ __typename?: 'LRTPointRecipient', id: string, balance: string, points: string, pointsDate: string, referralPoints: string, elPoints: string }> };



export const UserPointsDocument = `
    query UserPoints($address: String) {
  lrtPointRecipients(limit: 1, orderBy: pointsDate_DESC, where: {id_eq: $address}) {
    id
    balance
    points
    pointsDate
    referralPoints
    elPoints
  }
}
    `;

export const useUserPointsQuery = <
      TData = UserPointsQuery,
      TError = unknown
    >(
      variables?: UserPointsQueryVariables,
      options?: Omit<UseQueryOptions<UserPointsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<UserPointsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<UserPointsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['UserPoints'] : ['UserPoints', variables],
    queryFn: graphqlClient<UserPointsQuery, UserPointsQueryVariables>(UserPointsDocument, variables),
    ...options
  }
    )};

useUserPointsQuery.getKey = (variables?: UserPointsQueryVariables) => variables === undefined ? ['UserPoints'] : ['UserPoints', variables];


useUserPointsQuery.fetcher = (variables?: UserPointsQueryVariables, options?: RequestInit['headers']) => graphqlClient<UserPointsQuery, UserPointsQueryVariables>(UserPointsDocument, variables, options);

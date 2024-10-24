import * as Types from '@origin/prime/shared';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { graphqlClient } from '@origin/prime/shared';
export type PointRecipientStatsQueryVariables = Types.Exact<{
  address: Types.Scalars['String']['input'];
  limit?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type PointRecipientStatsQuery = { __typename?: 'Query', totalEigenLayerPoints: string, lrtPointRecipientStats: { __typename?: 'LRTPointRecipientStats', elPoints: string, points: string }, lrtSummaries: Array<{ __typename?: 'LRTSummary', points: string }> };



export const PointRecipientStatsDocument = `
    query PointRecipientStats($address: String!, $limit: Int = 1) {
  lrtPointRecipientStats(address: $address) {
    elPoints
    points
  }
  lrtSummaries(limit: $limit, orderBy: id_DESC) {
    points
  }
  totalEigenLayerPoints
}
    `;

export const usePointRecipientStatsQuery = <
      TData = PointRecipientStatsQuery,
      TError = unknown
    >(
      variables: PointRecipientStatsQueryVariables,
      options?: Omit<UseQueryOptions<PointRecipientStatsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<PointRecipientStatsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<PointRecipientStatsQuery, TError, TData>(
      {
    queryKey: ['PointRecipientStats', variables],
    queryFn: graphqlClient<PointRecipientStatsQuery, PointRecipientStatsQueryVariables>(PointRecipientStatsDocument, variables),
    ...options
  }
    )};

usePointRecipientStatsQuery.getKey = (variables: PointRecipientStatsQueryVariables) => ['PointRecipientStats', variables];


usePointRecipientStatsQuery.fetcher = (variables: PointRecipientStatsQueryVariables, options?: RequestInit['headers']) => graphqlClient<PointRecipientStatsQuery, PointRecipientStatsQueryVariables>(PointRecipientStatsDocument, variables, options);

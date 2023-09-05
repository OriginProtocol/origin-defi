import { graphqlClient } from '@origin/shared/data-access';
import { useQuery } from '@tanstack/react-query';

import type * as Types from '@origin/shared/data-access';
import type { UseQueryOptions } from '@tanstack/react-query';
export type DummyQueryVariables = Types.Exact<{ [key: string]: never }>;

export type DummyQuery = {
  __typename?: 'Query';
  squidStatus?: { __typename?: 'SquidStatus'; height?: number | null } | null;
};

export const DummyDocument = `
    query Dummy {
  squidStatus {
    height
  }
}
    `;
export const useDummyQuery = <TData = DummyQuery, TError = unknown>(
  variables?: DummyQueryVariables,
  options?: UseQueryOptions<DummyQuery, TError, TData>,
) =>
  useQuery<DummyQuery, TError, TData>(
    variables === undefined ? ['Dummy'] : ['Dummy', variables],
    graphqlClient<DummyQuery, DummyQueryVariables>(DummyDocument, variables),
    options,
  );

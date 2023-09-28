import { graphqlClient } from '@origin/oeth/shared';
import { useQuery } from '@tanstack/react-query';

import type * as Types from '@origin/oeth/shared';
import type { UseQueryOptions } from '@tanstack/react-query';
export type FinancialStatementQueryVariables = Types.Exact<{
  compareDate?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type FinancialStatementQuery = {
  __typename?: 'Query';
  oeths: Array<{
    __typename?: 'OETH';
    blockNumber: number;
    timestamp: any;
    totalSupply: any;
  }>;
  curveLps: Array<{
    __typename?: 'CurveLP';
    blockNumber: number;
    timestamp: any;
    eth: any;
    ethOwned: any;
    oeth: any;
    oethOwned: any;
    totalSupply: any;
    totalSupplyOwned: any;
  }>;
  morphoAaves: Array<{
    __typename?: 'MorphoAave';
    blockNumber: number;
    timestamp: any;
    weth: any;
  }>;
  fraxStakings: Array<{
    __typename?: 'FraxStaking';
    blockNumber: number;
    timestamp: any;
    frxETH: any;
  }>;
  drippers: Array<{
    __typename?: 'Dripper';
    blockNumber: number;
    timestamp: any;
    weth: any;
  }>;
  vaults: Array<{
    __typename?: 'Vault';
    blockNumber: number;
    timestamp: any;
    weth: any;
    rETH: any;
    stETH: any;
    frxETH: any;
  }>;
};

export const FinancialStatementDocument = `
    query FinancialStatement($compareDate: DateTime) {
  oeths(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    totalSupply
  }
  curveLps(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    eth
    ethOwned
    oeth
    oethOwned
    totalSupply
    totalSupplyOwned
  }
  morphoAaves(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    weth
  }
  fraxStakings(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    frxETH
  }
  drippers(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    weth
  }
  vaults(limit: 1, orderBy: id_DESC, where: {timestamp_lt: $compareDate}) {
    blockNumber
    timestamp
    weth
    rETH
    stETH
    frxETH
  }
}
    `;
export const useFinancialStatementQuery = <
  TData = FinancialStatementQuery,
  TError = unknown,
>(
  variables?: FinancialStatementQueryVariables,
  options?: UseQueryOptions<FinancialStatementQuery, TError, TData>,
) =>
  useQuery<FinancialStatementQuery, TError, TData>(
    variables === undefined
      ? ['FinancialStatement']
      : ['FinancialStatement', variables],
    graphqlClient<FinancialStatementQuery, FinancialStatementQueryVariables>(
      FinancialStatementDocument,
      variables,
    ),
    options,
  );

useFinancialStatementQuery.getKey = (
  variables?: FinancialStatementQueryVariables,
) =>
  variables === undefined
    ? ['FinancialStatement']
    : ['FinancialStatement', variables];
useFinancialStatementQuery.fetcher = (
  variables?: FinancialStatementQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<FinancialStatementQuery, FinancialStatementQueryVariables>(
    FinancialStatementDocument,
    variables,
    options,
  );

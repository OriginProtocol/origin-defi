import { graphqlClient } from '@origin/oeth/shared';
import { useQuery } from '@tanstack/react-query';

import type * as Types from '@origin/oeth/shared';
import type { UseQueryOptions } from '@tanstack/react-query';
export type FinancialStatementReportQueryVariables = Types.Exact<{
  compareDate?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;

export type FinancialStatementReportQuery = {
  __typename?: 'Query';
  financialStatements: Array<{
    __typename?: 'FinancialStatement';
    blockNumber: number;
    timestamp: any;
    oeth: { __typename?: 'OETH'; totalSupply: any };
    curveLP: {
      __typename?: 'CurveLP';
      eth: any;
      ethOwned: any;
      oeth: any;
      oethOwned: any;
      totalSupply: any;
      totalSupplyOwned: any;
    };
    dripper: { __typename?: 'Dripper'; weth: any };
    fraxStaking: { __typename?: 'FraxStaking'; frxETH: any };
    morphoAave: { __typename?: 'MorphoAave'; weth: any };
    vault: {
      __typename?: 'Vault';
      weth: any;
      rETH: any;
      stETH: any;
      frxETH: any;
    };
  }>;
  financialStatements1W: Array<{
    __typename?: 'FinancialStatement';
    blockNumber: number;
    timestamp: any;
    oeth: { __typename?: 'OETH'; totalSupply: any };
    curveLP: {
      __typename?: 'CurveLP';
      eth: any;
      ethOwned: any;
      oeth: any;
      oethOwned: any;
      totalSupply: any;
      totalSupplyOwned: any;
    };
    dripper: { __typename?: 'Dripper'; weth: any };
    fraxStaking: { __typename?: 'FraxStaking'; frxETH: any };
    morphoAave: { __typename?: 'MorphoAave'; weth: any };
    vault: {
      __typename?: 'Vault';
      weth: any;
      rETH: any;
      stETH: any;
      frxETH: any;
    };
  }>;
};

export const FinancialStatementReportDocument = `
    query FinancialStatementReport($compareDate: DateTime) {
  financialStatements(orderBy: id_DESC, limit: 1) {
    blockNumber
    timestamp
    oeth {
      totalSupply
    }
    curveLP {
      eth
      ethOwned
      oeth
      oethOwned
      totalSupply
      totalSupplyOwned
    }
    dripper {
      weth
    }
    fraxStaking {
      frxETH
    }
    morphoAave {
      weth
    }
    vault {
      weth
      rETH
      stETH
      frxETH
    }
  }
  financialStatements1W: financialStatements(
    orderBy: id_DESC
    limit: 1
    where: {timestamp_lt: $compareDate}
  ) {
    blockNumber
    timestamp
    oeth {
      totalSupply
    }
    curveLP {
      eth
      ethOwned
      oeth
      oethOwned
      totalSupply
      totalSupplyOwned
    }
    dripper {
      weth
    }
    fraxStaking {
      frxETH
    }
    morphoAave {
      weth
    }
    vault {
      weth
      rETH
      stETH
      frxETH
    }
  }
}
    `;
export const useFinancialStatementReportQuery = <
  TData = FinancialStatementReportQuery,
  TError = unknown,
>(
  variables?: FinancialStatementReportQueryVariables,
  options?: UseQueryOptions<FinancialStatementReportQuery, TError, TData>,
) =>
  useQuery<FinancialStatementReportQuery, TError, TData>(
    variables === undefined
      ? ['FinancialStatementReport']
      : ['FinancialStatementReport', variables],
    graphqlClient<
      FinancialStatementReportQuery,
      FinancialStatementReportQueryVariables
    >(FinancialStatementReportDocument, variables),
    options,
  );

useFinancialStatementReportQuery.getKey = (
  variables?: FinancialStatementReportQueryVariables,
) =>
  variables === undefined
    ? ['FinancialStatementReport']
    : ['FinancialStatementReport', variables];
useFinancialStatementReportQuery.fetcher = (
  variables?: FinancialStatementReportQueryVariables,
  options?: RequestInit['headers'],
) =>
  graphqlClient<
    FinancialStatementReportQuery,
    FinancialStatementReportQueryVariables
  >(FinancialStatementReportDocument, variables, options);

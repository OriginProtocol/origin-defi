export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Apy = {
  __typename?: 'APY';
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  apy7DayAvg: Scalars['Float']['output'];
  apy14DayAvg: Scalars['Float']['output'];
  apy30DayAvg: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type ApyEdge = {
  __typename?: 'APYEdge';
  cursor: Scalars['String']['output'];
  node: Apy;
};

export enum ApyOrderByInput {
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprDesc = 'apr_DESC',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  Apy7DayAvgAsc = 'apy7DayAvg_ASC',
  Apy7DayAvgAscNullsFirst = 'apy7DayAvg_ASC_NULLS_FIRST',
  Apy7DayAvgDesc = 'apy7DayAvg_DESC',
  Apy7DayAvgDescNullsLast = 'apy7DayAvg_DESC_NULLS_LAST',
  Apy14DayAvgAsc = 'apy14DayAvg_ASC',
  Apy14DayAvgAscNullsFirst = 'apy14DayAvg_ASC_NULLS_FIRST',
  Apy14DayAvgDesc = 'apy14DayAvg_DESC',
  Apy14DayAvgDescNullsLast = 'apy14DayAvg_DESC_NULLS_LAST',
  Apy30DayAvgAsc = 'apy30DayAvg_ASC',
  Apy30DayAvgAscNullsFirst = 'apy30DayAvg_ASC_NULLS_FIRST',
  Apy30DayAvgDesc = 'apy30DayAvg_DESC',
  Apy30DayAvgDescNullsLast = 'apy30DayAvg_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RebasingCreditsPerTokenAsc = 'rebasingCreditsPerToken_ASC',
  RebasingCreditsPerTokenAscNullsFirst = 'rebasingCreditsPerToken_ASC_NULLS_FIRST',
  RebasingCreditsPerTokenDesc = 'rebasingCreditsPerToken_DESC',
  RebasingCreditsPerTokenDescNullsLast = 'rebasingCreditsPerToken_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type ApyWhereInput = {
  AND?: InputMaybe<Array<ApyWhereInput>>;
  OR?: InputMaybe<Array<ApyWhereInput>>;
  apr_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_gt?: InputMaybe<Scalars['Float']['input']>;
  apr_gte?: InputMaybe<Scalars['Float']['input']>;
  apr_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apr_lt?: InputMaybe<Scalars['Float']['input']>;
  apr_lte?: InputMaybe<Scalars['Float']['input']>;
  apr_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy7DayAvg_eq?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_gt?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_gte?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy7DayAvg_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy7DayAvg_lt?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_lte?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy7DayAvg_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy14DayAvg_eq?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_gt?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_gte?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy14DayAvg_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy14DayAvg_lt?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_lte?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy14DayAvg_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy30DayAvg_eq?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_gt?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_gte?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy30DayAvg_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy30DayAvg_lt?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_lte?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy30DayAvg_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_gt?: InputMaybe<Scalars['Float']['input']>;
  apy_gte?: InputMaybe<Scalars['Float']['input']>;
  apy_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy_lt?: InputMaybe<Scalars['Float']['input']>;
  apy_lte?: InputMaybe<Scalars['Float']['input']>;
  apy_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingCreditsPerToken_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingCreditsPerToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingCreditsPerToken_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type APiesConnection = {
  __typename?: 'APiesConnection';
  edges: Array<ApyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Address = {
  __typename?: 'Address';
  balance: Scalars['BigInt']['output'];
  credits: Scalars['BigInt']['output'];
  earned: Scalars['BigInt']['output'];
  history: Array<History>;
  id: Scalars['String']['output'];
  isContract: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  rebasingOption: RebasingOption;
};


export type AddressHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<HistoryOrderByInput>>;
  where?: InputMaybe<HistoryWhereInput>;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node: Address;
};

export enum AddressOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  CreditsAsc = 'credits_ASC',
  CreditsAscNullsFirst = 'credits_ASC_NULLS_FIRST',
  CreditsDesc = 'credits_DESC',
  CreditsDescNullsLast = 'credits_DESC_NULLS_LAST',
  EarnedAsc = 'earned_ASC',
  EarnedAscNullsFirst = 'earned_ASC_NULLS_FIRST',
  EarnedDesc = 'earned_DESC',
  EarnedDescNullsLast = 'earned_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsContractAsc = 'isContract_ASC',
  IsContractAscNullsFirst = 'isContract_ASC_NULLS_FIRST',
  IsContractDesc = 'isContract_DESC',
  IsContractDescNullsLast = 'isContract_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  RebasingOptionAsc = 'rebasingOption_ASC',
  RebasingOptionAscNullsFirst = 'rebasingOption_ASC_NULLS_FIRST',
  RebasingOptionDesc = 'rebasingOption_DESC',
  RebasingOptionDescNullsLast = 'rebasingOption_DESC_NULLS_LAST'
}

export type AddressWhereInput = {
  AND?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  credits_eq?: InputMaybe<Scalars['BigInt']['input']>;
  credits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  credits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  credits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  credits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  credits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  credits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  credits_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  credits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  history_every?: InputMaybe<HistoryWhereInput>;
  history_none?: InputMaybe<HistoryWhereInput>;
  history_some?: InputMaybe<HistoryWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isContract_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isContract_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isContract_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastUpdated_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  rebasingOption_eq?: InputMaybe<RebasingOption>;
  rebasingOption_in?: InputMaybe<Array<RebasingOption>>;
  rebasingOption_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingOption_not_eq?: InputMaybe<RebasingOption>;
  rebasingOption_not_in?: InputMaybe<Array<RebasingOption>>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CurveLp = {
  __typename?: 'CurveLP';
  blockNumber: Scalars['Int']['output'];
  eth: Scalars['BigInt']['output'];
  ethOwned: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  oeth: Scalars['BigInt']['output'];
  oethOwned: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyOwned: Scalars['BigInt']['output'];
};

export type CurveLpEdge = {
  __typename?: 'CurveLPEdge';
  cursor: Scalars['String']['output'];
  node: CurveLp;
};

export enum CurveLpOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EthOwnedAsc = 'ethOwned_ASC',
  EthOwnedAscNullsFirst = 'ethOwned_ASC_NULLS_FIRST',
  EthOwnedDesc = 'ethOwned_DESC',
  EthOwnedDescNullsLast = 'ethOwned_DESC_NULLS_LAST',
  EthAsc = 'eth_ASC',
  EthAscNullsFirst = 'eth_ASC_NULLS_FIRST',
  EthDesc = 'eth_DESC',
  EthDescNullsLast = 'eth_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OethOwnedAsc = 'oethOwned_ASC',
  OethOwnedAscNullsFirst = 'oethOwned_ASC_NULLS_FIRST',
  OethOwnedDesc = 'oethOwned_DESC',
  OethOwnedDescNullsLast = 'oethOwned_DESC_NULLS_LAST',
  OethAsc = 'oeth_ASC',
  OethAscNullsFirst = 'oeth_ASC_NULLS_FIRST',
  OethDesc = 'oeth_DESC',
  OethDescNullsLast = 'oeth_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyOwnedAsc = 'totalSupplyOwned_ASC',
  TotalSupplyOwnedAscNullsFirst = 'totalSupplyOwned_ASC_NULLS_FIRST',
  TotalSupplyOwnedDesc = 'totalSupplyOwned_DESC',
  TotalSupplyOwnedDescNullsLast = 'totalSupplyOwned_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type CurveLpWhereInput = {
  AND?: InputMaybe<Array<CurveLpWhereInput>>;
  OR?: InputMaybe<Array<CurveLpWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  ethOwned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ethOwned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ethOwned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  ethOwned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eth_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eth_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eth_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eth_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eth_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  oethOwned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oethOwned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  oethOwned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oethOwned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oeth_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oeth_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  oeth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oeth_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalSupplyOwned_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyOwned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupplyOwned_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupplyOwned_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type CurveLPsConnection = {
  __typename?: 'CurveLPsConnection';
  edges: Array<CurveLpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Dripper = {
  __typename?: 'Dripper';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type DripperEdge = {
  __typename?: 'DripperEdge';
  cursor: Scalars['String']['output'];
  node: Dripper;
};

export enum DripperOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethDesc = 'weth_DESC',
  WethDescNullsLast = 'weth_DESC_NULLS_LAST'
}

export type DripperWhereInput = {
  AND?: InputMaybe<Array<DripperWhereInput>>;
  OR?: InputMaybe<Array<DripperWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  weth_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weth_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  weth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type DrippersConnection = {
  __typename?: 'DrippersConnection';
  edges: Array<DripperEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FraxStaking = {
  __typename?: 'FraxStaking';
  blockNumber: Scalars['Int']['output'];
  frxETH: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type FraxStakingEdge = {
  __typename?: 'FraxStakingEdge';
  cursor: Scalars['String']['output'];
  node: FraxStaking;
};

export enum FraxStakingOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FrxEthAsc = 'frxETH_ASC',
  FrxEthAscNullsFirst = 'frxETH_ASC_NULLS_FIRST',
  FrxEthDesc = 'frxETH_DESC',
  FrxEthDescNullsLast = 'frxETH_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type FraxStakingWhereInput = {
  AND?: InputMaybe<Array<FraxStakingWhereInput>>;
  OR?: InputMaybe<Array<FraxStakingWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  frxETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frxETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  frxETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type FraxStakingsConnection = {
  __typename?: 'FraxStakingsConnection';
  edges: Array<FraxStakingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type HistoriesConnection = {
  __typename?: 'HistoriesConnection';
  edges: Array<HistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type History = {
  __typename?: 'History';
  address: Address;
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: HistoryType;
  value: Scalars['BigInt']['output'];
};

export type HistoryEdge = {
  __typename?: 'HistoryEdge';
  cursor: Scalars['String']['output'];
  node: History;
};

export enum HistoryOrderByInput {
  AddressBalanceAsc = 'address_balance_ASC',
  AddressBalanceAscNullsFirst = 'address_balance_ASC_NULLS_FIRST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressCreditsAsc = 'address_credits_ASC',
  AddressCreditsAscNullsFirst = 'address_credits_ASC_NULLS_FIRST',
  AddressCreditsDesc = 'address_credits_DESC',
  AddressCreditsDescNullsLast = 'address_credits_DESC_NULLS_LAST',
  AddressEarnedAsc = 'address_earned_ASC',
  AddressEarnedAscNullsFirst = 'address_earned_ASC_NULLS_FIRST',
  AddressEarnedDesc = 'address_earned_DESC',
  AddressEarnedDescNullsLast = 'address_earned_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressIsContractAsc = 'address_isContract_ASC',
  AddressIsContractAscNullsFirst = 'address_isContract_ASC_NULLS_FIRST',
  AddressIsContractDesc = 'address_isContract_DESC',
  AddressIsContractDescNullsLast = 'address_isContract_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressRebasingOptionAsc = 'address_rebasingOption_ASC',
  AddressRebasingOptionAscNullsFirst = 'address_rebasingOption_ASC_NULLS_FIRST',
  AddressRebasingOptionDesc = 'address_rebasingOption_DESC',
  AddressRebasingOptionDescNullsLast = 'address_rebasingOption_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export enum HistoryType {
  Received = 'Received',
  Sent = 'Sent',
  Swap = 'Swap',
  Yield = 'Yield'
}

export type HistoryWhereInput = {
  AND?: InputMaybe<Array<HistoryWhereInput>>;
  OR?: InputMaybe<Array<HistoryWhereInput>>;
  address?: InputMaybe<AddressWhereInput>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<HistoryType>;
  type_in?: InputMaybe<Array<HistoryType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<HistoryType>;
  type_not_in?: InputMaybe<Array<HistoryType>>;
  value_eq?: InputMaybe<Scalars['BigInt']['input']>;
  value_gt?: InputMaybe<Scalars['BigInt']['input']>;
  value_gte?: InputMaybe<Scalars['BigInt']['input']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  value_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  value_lt?: InputMaybe<Scalars['BigInt']['input']>;
  value_lte?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type MorphoAave = {
  __typename?: 'MorphoAave';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type MorphoAaveEdge = {
  __typename?: 'MorphoAaveEdge';
  cursor: Scalars['String']['output'];
  node: MorphoAave;
};

export enum MorphoAaveOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethDesc = 'weth_DESC',
  WethDescNullsLast = 'weth_DESC_NULLS_LAST'
}

export type MorphoAaveWhereInput = {
  AND?: InputMaybe<Array<MorphoAaveWhereInput>>;
  OR?: InputMaybe<Array<MorphoAaveWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  weth_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weth_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  weth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type MorphoAavesConnection = {
  __typename?: 'MorphoAavesConnection';
  edges: Array<MorphoAaveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Oeth = {
  __typename?: 'OETH';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type OethEdge = {
  __typename?: 'OETHEdge';
  cursor: Scalars['String']['output'];
  node: Oeth;
};

export enum OethOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type OethWhereInput = {
  AND?: InputMaybe<Array<OethWhereInput>>;
  OR?: InputMaybe<Array<OethWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OetHsConnection = {
  __typename?: 'OETHsConnection';
  edges: Array<OethEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  addressById?: Maybe<Address>;
  /** @deprecated Use addressById */
  addressByUniqueInput?: Maybe<Address>;
  addresses: Array<Address>;
  addressesConnection: AddressesConnection;
  apies: Array<Apy>;
  apiesConnection: APiesConnection;
  apyById?: Maybe<Apy>;
  /** @deprecated Use apyById */
  apyByUniqueInput?: Maybe<Apy>;
  curveLpById?: Maybe<CurveLp>;
  /** @deprecated Use curveLpById */
  curveLpByUniqueInput?: Maybe<CurveLp>;
  curveLps: Array<CurveLp>;
  curveLpsConnection: CurveLPsConnection;
  dripperById?: Maybe<Dripper>;
  /** @deprecated Use dripperById */
  dripperByUniqueInput?: Maybe<Dripper>;
  drippers: Array<Dripper>;
  drippersConnection: DrippersConnection;
  fraxStakingById?: Maybe<FraxStaking>;
  /** @deprecated Use fraxStakingById */
  fraxStakingByUniqueInput?: Maybe<FraxStaking>;
  fraxStakings: Array<FraxStaking>;
  fraxStakingsConnection: FraxStakingsConnection;
  histories: Array<History>;
  historiesConnection: HistoriesConnection;
  historyById?: Maybe<History>;
  /** @deprecated Use historyById */
  historyByUniqueInput?: Maybe<History>;
  morphoAaveById?: Maybe<MorphoAave>;
  /** @deprecated Use morphoAaveById */
  morphoAaveByUniqueInput?: Maybe<MorphoAave>;
  morphoAaves: Array<MorphoAave>;
  morphoAavesConnection: MorphoAavesConnection;
  oethById?: Maybe<Oeth>;
  /** @deprecated Use oethById */
  oethByUniqueInput?: Maybe<Oeth>;
  oeths: Array<Oeth>;
  oethsConnection: OetHsConnection;
  rebaseById?: Maybe<Rebase>;
  /** @deprecated Use rebaseById */
  rebaseByUniqueInput?: Maybe<Rebase>;
  rebaseOptionById?: Maybe<RebaseOption>;
  /** @deprecated Use rebaseOptionById */
  rebaseOptionByUniqueInput?: Maybe<RebaseOption>;
  rebaseOptions: Array<RebaseOption>;
  rebaseOptionsConnection: RebaseOptionsConnection;
  rebases: Array<Rebase>;
  rebasesConnection: RebasesConnection;
  squidStatus?: Maybe<SquidStatus>;
  vaultById?: Maybe<Vault>;
  /** @deprecated Use vaultById */
  vaultByUniqueInput?: Maybe<Vault>;
  vaults: Array<Vault>;
  vaultsConnection: VaultsConnection;
};


export type QueryAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAddressByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AddressOrderByInput>>;
  where?: InputMaybe<AddressWhereInput>;
};


export type QueryAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<AddressOrderByInput>;
  where?: InputMaybe<AddressWhereInput>;
};


export type QueryApiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApyOrderByInput>>;
  where?: InputMaybe<ApyWhereInput>;
};


export type QueryApiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ApyOrderByInput>;
  where?: InputMaybe<ApyWhereInput>;
};


export type QueryApyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryApyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCurveLpByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCurveLpByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCurveLpsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurveLpOrderByInput>>;
  where?: InputMaybe<CurveLpWhereInput>;
};


export type QueryCurveLpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CurveLpOrderByInput>;
  where?: InputMaybe<CurveLpWhereInput>;
};


export type QueryDripperByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryDripperByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryDrippersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DripperOrderByInput>>;
  where?: InputMaybe<DripperWhereInput>;
};


export type QueryDrippersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<DripperOrderByInput>;
  where?: InputMaybe<DripperWhereInput>;
};


export type QueryFraxStakingByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFraxStakingByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFraxStakingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FraxStakingOrderByInput>>;
  where?: InputMaybe<FraxStakingWhereInput>;
};


export type QueryFraxStakingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FraxStakingOrderByInput>;
  where?: InputMaybe<FraxStakingWhereInput>;
};


export type QueryHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<HistoryOrderByInput>>;
  where?: InputMaybe<HistoryWhereInput>;
};


export type QueryHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<HistoryOrderByInput>;
  where?: InputMaybe<HistoryWhereInput>;
};


export type QueryHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMorphoAaveByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMorphoAaveByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMorphoAavesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MorphoAaveOrderByInput>>;
  where?: InputMaybe<MorphoAaveWhereInput>;
};


export type QueryMorphoAavesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MorphoAaveOrderByInput>;
  where?: InputMaybe<MorphoAaveWhereInput>;
};


export type QueryOethByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethOrderByInput>>;
  where?: InputMaybe<OethWhereInput>;
};


export type QueryOethsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethOrderByInput>;
  where?: InputMaybe<OethWhereInput>;
};


export type QueryRebaseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRebaseByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryRebaseOptionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRebaseOptionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryRebaseOptionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RebaseOptionOrderByInput>>;
  where?: InputMaybe<RebaseOptionWhereInput>;
};


export type QueryRebaseOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<RebaseOptionOrderByInput>;
  where?: InputMaybe<RebaseOptionWhereInput>;
};


export type QueryRebasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RebaseOrderByInput>>;
  where?: InputMaybe<RebaseWhereInput>;
};


export type QueryRebasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<RebaseOrderByInput>;
  where?: InputMaybe<RebaseWhereInput>;
};


export type QueryVaultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryVaultByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryVaultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VaultOrderByInput>>;
  where?: InputMaybe<VaultWhereInput>;
};


export type QueryVaultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<VaultOrderByInput>;
  where?: InputMaybe<VaultWhereInput>;
};

export type Rebase = {
  __typename?: 'Rebase';
  apy: Apy;
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
};

export type RebaseEdge = {
  __typename?: 'RebaseEdge';
  cursor: Scalars['String']['output'];
  node: Rebase;
};

export type RebaseOption = {
  __typename?: 'RebaseOption';
  address: Address;
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  status: RebasingOption;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type RebaseOptionEdge = {
  __typename?: 'RebaseOptionEdge';
  cursor: Scalars['String']['output'];
  node: RebaseOption;
};

export enum RebaseOptionOrderByInput {
  AddressBalanceAsc = 'address_balance_ASC',
  AddressBalanceAscNullsFirst = 'address_balance_ASC_NULLS_FIRST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressCreditsAsc = 'address_credits_ASC',
  AddressCreditsAscNullsFirst = 'address_credits_ASC_NULLS_FIRST',
  AddressCreditsDesc = 'address_credits_DESC',
  AddressCreditsDescNullsLast = 'address_credits_DESC_NULLS_LAST',
  AddressEarnedAsc = 'address_earned_ASC',
  AddressEarnedAscNullsFirst = 'address_earned_ASC_NULLS_FIRST',
  AddressEarnedDesc = 'address_earned_DESC',
  AddressEarnedDescNullsLast = 'address_earned_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressIsContractAsc = 'address_isContract_ASC',
  AddressIsContractAscNullsFirst = 'address_isContract_ASC_NULLS_FIRST',
  AddressIsContractDesc = 'address_isContract_DESC',
  AddressIsContractDescNullsLast = 'address_isContract_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressRebasingOptionAsc = 'address_rebasingOption_ASC',
  AddressRebasingOptionAscNullsFirst = 'address_rebasingOption_ASC_NULLS_FIRST',
  AddressRebasingOptionDesc = 'address_rebasingOption_DESC',
  AddressRebasingOptionDescNullsLast = 'address_rebasingOption_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type RebaseOptionWhereInput = {
  AND?: InputMaybe<Array<RebaseOptionWhereInput>>;
  OR?: InputMaybe<Array<RebaseOptionWhereInput>>;
  address?: InputMaybe<AddressWhereInput>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<RebasingOption>;
  status_in?: InputMaybe<Array<RebasingOption>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<RebasingOption>;
  status_not_in?: InputMaybe<Array<RebasingOption>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type RebaseOptionsConnection = {
  __typename?: 'RebaseOptionsConnection';
  edges: Array<RebaseOptionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum RebaseOrderByInput {
  ApyAprAsc = 'apy_apr_ASC',
  ApyAprAscNullsFirst = 'apy_apr_ASC_NULLS_FIRST',
  ApyAprDesc = 'apy_apr_DESC',
  ApyAprDescNullsLast = 'apy_apr_DESC_NULLS_LAST',
  ApyApy7DayAvgAsc = 'apy_apy7DayAvg_ASC',
  ApyApy7DayAvgAscNullsFirst = 'apy_apy7DayAvg_ASC_NULLS_FIRST',
  ApyApy7DayAvgDesc = 'apy_apy7DayAvg_DESC',
  ApyApy7DayAvgDescNullsLast = 'apy_apy7DayAvg_DESC_NULLS_LAST',
  ApyApy14DayAvgAsc = 'apy_apy14DayAvg_ASC',
  ApyApy14DayAvgAscNullsFirst = 'apy_apy14DayAvg_ASC_NULLS_FIRST',
  ApyApy14DayAvgDesc = 'apy_apy14DayAvg_DESC',
  ApyApy14DayAvgDescNullsLast = 'apy_apy14DayAvg_DESC_NULLS_LAST',
  ApyApy30DayAvgAsc = 'apy_apy30DayAvg_ASC',
  ApyApy30DayAvgAscNullsFirst = 'apy_apy30DayAvg_ASC_NULLS_FIRST',
  ApyApy30DayAvgDesc = 'apy_apy30DayAvg_DESC',
  ApyApy30DayAvgDescNullsLast = 'apy_apy30DayAvg_DESC_NULLS_LAST',
  ApyApyAsc = 'apy_apy_ASC',
  ApyApyAscNullsFirst = 'apy_apy_ASC_NULLS_FIRST',
  ApyApyDesc = 'apy_apy_DESC',
  ApyApyDescNullsLast = 'apy_apy_DESC_NULLS_LAST',
  ApyBlockNumberAsc = 'apy_blockNumber_ASC',
  ApyBlockNumberAscNullsFirst = 'apy_blockNumber_ASC_NULLS_FIRST',
  ApyBlockNumberDesc = 'apy_blockNumber_DESC',
  ApyBlockNumberDescNullsLast = 'apy_blockNumber_DESC_NULLS_LAST',
  ApyIdAsc = 'apy_id_ASC',
  ApyIdAscNullsFirst = 'apy_id_ASC_NULLS_FIRST',
  ApyIdDesc = 'apy_id_DESC',
  ApyIdDescNullsLast = 'apy_id_DESC_NULLS_LAST',
  ApyRebasingCreditsPerTokenAsc = 'apy_rebasingCreditsPerToken_ASC',
  ApyRebasingCreditsPerTokenAscNullsFirst = 'apy_rebasingCreditsPerToken_ASC_NULLS_FIRST',
  ApyRebasingCreditsPerTokenDesc = 'apy_rebasingCreditsPerToken_DESC',
  ApyRebasingCreditsPerTokenDescNullsLast = 'apy_rebasingCreditsPerToken_DESC_NULLS_LAST',
  ApyTimestampAsc = 'apy_timestamp_ASC',
  ApyTimestampAscNullsFirst = 'apy_timestamp_ASC_NULLS_FIRST',
  ApyTimestampDesc = 'apy_timestamp_DESC',
  ApyTimestampDescNullsLast = 'apy_timestamp_DESC_NULLS_LAST',
  ApyTxHashAsc = 'apy_txHash_ASC',
  ApyTxHashAscNullsFirst = 'apy_txHash_ASC_NULLS_FIRST',
  ApyTxHashDesc = 'apy_txHash_DESC',
  ApyTxHashDescNullsLast = 'apy_txHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RebasingCreditsPerTokenAsc = 'rebasingCreditsPerToken_ASC',
  RebasingCreditsPerTokenAscNullsFirst = 'rebasingCreditsPerToken_ASC_NULLS_FIRST',
  RebasingCreditsPerTokenDesc = 'rebasingCreditsPerToken_DESC',
  RebasingCreditsPerTokenDescNullsLast = 'rebasingCreditsPerToken_DESC_NULLS_LAST',
  RebasingCreditsAsc = 'rebasingCredits_ASC',
  RebasingCreditsAscNullsFirst = 'rebasingCredits_ASC_NULLS_FIRST',
  RebasingCreditsDesc = 'rebasingCredits_DESC',
  RebasingCreditsDescNullsLast = 'rebasingCredits_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type RebaseWhereInput = {
  AND?: InputMaybe<Array<RebaseWhereInput>>;
  OR?: InputMaybe<Array<RebaseWhereInput>>;
  apy?: InputMaybe<ApyWhereInput>;
  apy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingCreditsPerToken_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingCreditsPerToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingCreditsPerToken_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCreditsPerToken_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingCredits_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingCredits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingCredits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingCredits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  txHash_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_gt?: InputMaybe<Scalars['String']['input']>;
  txHash_gte?: InputMaybe<Scalars['String']['input']>;
  txHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHash_lt?: InputMaybe<Scalars['String']['input']>;
  txHash_lte?: InputMaybe<Scalars['String']['input']>;
  txHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHash_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type RebasesConnection = {
  __typename?: 'RebasesConnection';
  edges: Array<RebaseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum RebasingOption {
  OptIn = 'OptIn',
  OptOut = 'OptOut'
}

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Vault = {
  __typename?: 'Vault';
  blockNumber: Scalars['Int']['output'];
  frxETH: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rETH: Scalars['BigInt']['output'];
  stETH: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type VaultEdge = {
  __typename?: 'VaultEdge';
  cursor: Scalars['String']['output'];
  node: Vault;
};

export enum VaultOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FrxEthAsc = 'frxETH_ASC',
  FrxEthAscNullsFirst = 'frxETH_ASC_NULLS_FIRST',
  FrxEthDesc = 'frxETH_DESC',
  FrxEthDescNullsLast = 'frxETH_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  REthAsc = 'rETH_ASC',
  REthAscNullsFirst = 'rETH_ASC_NULLS_FIRST',
  REthDesc = 'rETH_DESC',
  REthDescNullsLast = 'rETH_DESC_NULLS_LAST',
  StEthAsc = 'stETH_ASC',
  StEthAscNullsFirst = 'stETH_ASC_NULLS_FIRST',
  StEthDesc = 'stETH_DESC',
  StEthDescNullsLast = 'stETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethDesc = 'weth_DESC',
  WethDescNullsLast = 'weth_DESC_NULLS_LAST'
}

export type VaultWhereInput = {
  AND?: InputMaybe<Array<VaultWhereInput>>;
  OR?: InputMaybe<Array<VaultWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  frxETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  frxETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  frxETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  frxETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  weth_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weth_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  weth_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weth_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weth_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type VaultsConnection = {
  __typename?: 'VaultsConnection';
  edges: Array<VaultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

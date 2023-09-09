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
  balance: Scalars['Float']['output'];
  credits: Scalars['BigInt']['output'];
  earned: Scalars['Float']['output'];
  history: Array<History>;
  id: Scalars['String']['output'];
  isContract: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  rebasingOption: Scalars['String']['output'];
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
  balance_eq?: InputMaybe<Scalars['Float']['input']>;
  balance_gt?: InputMaybe<Scalars['Float']['input']>;
  balance_gte?: InputMaybe<Scalars['Float']['input']>;
  balance_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['Float']['input']>;
  balance_lte?: InputMaybe<Scalars['Float']['input']>;
  balance_not_eq?: InputMaybe<Scalars['Float']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  credits_eq?: InputMaybe<Scalars['BigInt']['input']>;
  credits_gt?: InputMaybe<Scalars['BigInt']['input']>;
  credits_gte?: InputMaybe<Scalars['BigInt']['input']>;
  credits_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  credits_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  credits_lt?: InputMaybe<Scalars['BigInt']['input']>;
  credits_lte?: InputMaybe<Scalars['BigInt']['input']>;
  credits_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  credits_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earned_eq?: InputMaybe<Scalars['Float']['input']>;
  earned_gt?: InputMaybe<Scalars['Float']['input']>;
  earned_gte?: InputMaybe<Scalars['Float']['input']>;
  earned_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  earned_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earned_lt?: InputMaybe<Scalars['Float']['input']>;
  earned_lte?: InputMaybe<Scalars['Float']['input']>;
  earned_not_eq?: InputMaybe<Scalars['Float']['input']>;
  earned_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
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
  rebasingOption_contains?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_endsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_eq?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_gt?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_gte?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebasingOption_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingOption_lt?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_lte?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_not_contains?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_not_eq?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rebasingOption_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
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
  balance: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: Scalars['String']['output'];
  value: Scalars['Float']['output'];
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

export type HistoryWhereInput = {
  AND?: InputMaybe<Array<HistoryWhereInput>>;
  OR?: InputMaybe<Array<HistoryWhereInput>>;
  address?: InputMaybe<AddressWhereInput>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_eq?: InputMaybe<Scalars['Float']['input']>;
  balance_gt?: InputMaybe<Scalars['Float']['input']>;
  balance_gte?: InputMaybe<Scalars['Float']['input']>;
  balance_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['Float']['input']>;
  balance_lte?: InputMaybe<Scalars['Float']['input']>;
  balance_not_eq?: InputMaybe<Scalars['Float']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
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
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  type_endsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<Scalars['String']['input']>;
  type_gt?: InputMaybe<Scalars['String']['input']>;
  type_gte?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_lt?: InputMaybe<Scalars['String']['input']>;
  type_lte?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  type_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  type_not_eq?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_startsWith?: InputMaybe<Scalars['String']['input']>;
  value_eq?: InputMaybe<Scalars['Float']['input']>;
  value_gt?: InputMaybe<Scalars['Float']['input']>;
  value_gte?: InputMaybe<Scalars['Float']['input']>;
  value_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  value_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  value_lt?: InputMaybe<Scalars['Float']['input']>;
  value_lte?: InputMaybe<Scalars['Float']['input']>;
  value_not_eq?: InputMaybe<Scalars['Float']['input']>;
  value_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
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
  histories: Array<History>;
  historiesConnection: HistoriesConnection;
  historyById?: Maybe<History>;
  /** @deprecated Use historyById */
  historyByUniqueInput?: Maybe<History>;
  rebaseById?: Maybe<Rebase>;
  /** @deprecated Use rebaseById */
  rebaseByUniqueInput?: Maybe<Rebase>;
  rebases: Array<Rebase>;
  rebasesConnection: RebasesConnection;
  squidStatus?: Maybe<SquidStatus>;
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


export type QueryRebaseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRebaseByUniqueInputArgs = {
  where: WhereIdInput;
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

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

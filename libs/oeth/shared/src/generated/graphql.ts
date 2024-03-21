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
  BigInt: { input: string; output: string; }
  DateTime: { input: string; output: string; }
};

export type BalancerPool = {
  __typename?: 'BalancerPool';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token0: Scalars['String']['output'];
  token1: Scalars['String']['output'];
  token2?: Maybe<Scalars['String']['output']>;
  token3?: Maybe<Scalars['String']['output']>;
  tokenCount: Scalars['Int']['output'];
};

export type BalancerPoolBalance = {
  __typename?: 'BalancerPoolBalance';
  address: Scalars['String']['output'];
  balance0: Scalars['BigInt']['output'];
  balance1: Scalars['BigInt']['output'];
  balance2: Scalars['BigInt']['output'];
  balance3: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type BalancerPoolBalanceEdge = {
  __typename?: 'BalancerPoolBalanceEdge';
  cursor: Scalars['String']['output'];
  node: BalancerPoolBalance;
};

export enum BalancerPoolBalanceOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  Balance0Asc = 'balance0_ASC',
  Balance0AscNullsFirst = 'balance0_ASC_NULLS_FIRST',
  Balance0Desc = 'balance0_DESC',
  Balance0DescNullsLast = 'balance0_DESC_NULLS_LAST',
  Balance1Asc = 'balance1_ASC',
  Balance1AscNullsFirst = 'balance1_ASC_NULLS_FIRST',
  Balance1Desc = 'balance1_DESC',
  Balance1DescNullsLast = 'balance1_DESC_NULLS_LAST',
  Balance2Asc = 'balance2_ASC',
  Balance2AscNullsFirst = 'balance2_ASC_NULLS_FIRST',
  Balance2Desc = 'balance2_DESC',
  Balance2DescNullsLast = 'balance2_DESC_NULLS_LAST',
  Balance3Asc = 'balance3_ASC',
  Balance3AscNullsFirst = 'balance3_ASC_NULLS_FIRST',
  Balance3Desc = 'balance3_DESC',
  Balance3DescNullsLast = 'balance3_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type BalancerPoolBalanceWhereInput = {
  AND?: InputMaybe<Array<BalancerPoolBalanceWhereInput>>;
  OR?: InputMaybe<Array<BalancerPoolBalanceWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  balance0_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance1_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance2_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance2_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance3_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance3_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance3_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance3_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export type BalancerPoolBalancesConnection = {
  __typename?: 'BalancerPoolBalancesConnection';
  edges: Array<BalancerPoolBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BalancerPoolEdge = {
  __typename?: 'BalancerPoolEdge';
  cursor: Scalars['String']['output'];
  node: BalancerPool;
};

export enum BalancerPoolOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  Token0Asc = 'token0_ASC',
  Token0AscNullsFirst = 'token0_ASC_NULLS_FIRST',
  Token0Desc = 'token0_DESC',
  Token0DescNullsLast = 'token0_DESC_NULLS_LAST',
  Token1Asc = 'token1_ASC',
  Token1AscNullsFirst = 'token1_ASC_NULLS_FIRST',
  Token1Desc = 'token1_DESC',
  Token1DescNullsLast = 'token1_DESC_NULLS_LAST',
  Token2Asc = 'token2_ASC',
  Token2AscNullsFirst = 'token2_ASC_NULLS_FIRST',
  Token2Desc = 'token2_DESC',
  Token2DescNullsLast = 'token2_DESC_NULLS_LAST',
  Token3Asc = 'token3_ASC',
  Token3AscNullsFirst = 'token3_ASC_NULLS_FIRST',
  Token3Desc = 'token3_DESC',
  Token3DescNullsLast = 'token3_DESC_NULLS_LAST',
  TokenCountAsc = 'tokenCount_ASC',
  TokenCountAscNullsFirst = 'tokenCount_ASC_NULLS_FIRST',
  TokenCountDesc = 'tokenCount_DESC',
  TokenCountDescNullsLast = 'tokenCount_DESC_NULLS_LAST'
}

export type BalancerPoolRate = {
  __typename?: 'BalancerPoolRate';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rate0: Scalars['BigInt']['output'];
  rate1: Scalars['BigInt']['output'];
  rate2: Scalars['BigInt']['output'];
  rate3: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type BalancerPoolRateEdge = {
  __typename?: 'BalancerPoolRateEdge';
  cursor: Scalars['String']['output'];
  node: BalancerPoolRate;
};

export enum BalancerPoolRateOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  Rate0Asc = 'rate0_ASC',
  Rate0AscNullsFirst = 'rate0_ASC_NULLS_FIRST',
  Rate0Desc = 'rate0_DESC',
  Rate0DescNullsLast = 'rate0_DESC_NULLS_LAST',
  Rate1Asc = 'rate1_ASC',
  Rate1AscNullsFirst = 'rate1_ASC_NULLS_FIRST',
  Rate1Desc = 'rate1_DESC',
  Rate1DescNullsLast = 'rate1_DESC_NULLS_LAST',
  Rate2Asc = 'rate2_ASC',
  Rate2AscNullsFirst = 'rate2_ASC_NULLS_FIRST',
  Rate2Desc = 'rate2_DESC',
  Rate2DescNullsLast = 'rate2_DESC_NULLS_LAST',
  Rate3Asc = 'rate3_ASC',
  Rate3AscNullsFirst = 'rate3_ASC_NULLS_FIRST',
  Rate3Desc = 'rate3_DESC',
  Rate3DescNullsLast = 'rate3_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type BalancerPoolRateWhereInput = {
  AND?: InputMaybe<Array<BalancerPoolRateWhereInput>>;
  OR?: InputMaybe<Array<BalancerPoolRateWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  rate0_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate1_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate2_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate2_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate3_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate3_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate3_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate3_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type BalancerPoolRatesConnection = {
  __typename?: 'BalancerPoolRatesConnection';
  edges: Array<BalancerPoolRateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BalancerPoolWhereInput = {
  AND?: InputMaybe<Array<BalancerPoolWhereInput>>;
  OR?: InputMaybe<Array<BalancerPoolWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0_eq?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0_not_eq?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1_eq?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1_not_eq?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1_startsWith?: InputMaybe<Scalars['String']['input']>;
  token2_contains?: InputMaybe<Scalars['String']['input']>;
  token2_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token2_endsWith?: InputMaybe<Scalars['String']['input']>;
  token2_eq?: InputMaybe<Scalars['String']['input']>;
  token2_gt?: InputMaybe<Scalars['String']['input']>;
  token2_gte?: InputMaybe<Scalars['String']['input']>;
  token2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token2_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token2_lt?: InputMaybe<Scalars['String']['input']>;
  token2_lte?: InputMaybe<Scalars['String']['input']>;
  token2_not_contains?: InputMaybe<Scalars['String']['input']>;
  token2_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token2_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token2_not_eq?: InputMaybe<Scalars['String']['input']>;
  token2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token2_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token2_startsWith?: InputMaybe<Scalars['String']['input']>;
  token3_contains?: InputMaybe<Scalars['String']['input']>;
  token3_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token3_endsWith?: InputMaybe<Scalars['String']['input']>;
  token3_eq?: InputMaybe<Scalars['String']['input']>;
  token3_gt?: InputMaybe<Scalars['String']['input']>;
  token3_gte?: InputMaybe<Scalars['String']['input']>;
  token3_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token3_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token3_lt?: InputMaybe<Scalars['String']['input']>;
  token3_lte?: InputMaybe<Scalars['String']['input']>;
  token3_not_contains?: InputMaybe<Scalars['String']['input']>;
  token3_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token3_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token3_not_eq?: InputMaybe<Scalars['String']['input']>;
  token3_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token3_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token3_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenCount_eq?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenCount_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type BalancerPoolsConnection = {
  __typename?: 'BalancerPoolsConnection';
  edges: Array<BalancerPoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BridgeTransfer = {
  __typename?: 'BridgeTransfer';
  amountIn: Scalars['BigInt']['output'];
  amountOut: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  bridge: Scalars['String']['output'];
  chainIn: Scalars['Int']['output'];
  chainOut: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  messageId: Scalars['String']['output'];
  receiver: Scalars['String']['output'];
  sender: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type BridgeTransferEdge = {
  __typename?: 'BridgeTransferEdge';
  cursor: Scalars['String']['output'];
  node: BridgeTransfer;
};

export enum BridgeTransferOrderByInput {
  AmountInAsc = 'amountIn_ASC',
  AmountInAscNullsFirst = 'amountIn_ASC_NULLS_FIRST',
  AmountInDesc = 'amountIn_DESC',
  AmountInDescNullsLast = 'amountIn_DESC_NULLS_LAST',
  AmountOutAsc = 'amountOut_ASC',
  AmountOutAscNullsFirst = 'amountOut_ASC_NULLS_FIRST',
  AmountOutDesc = 'amountOut_DESC',
  AmountOutDescNullsLast = 'amountOut_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BridgeAsc = 'bridge_ASC',
  BridgeAscNullsFirst = 'bridge_ASC_NULLS_FIRST',
  BridgeDesc = 'bridge_DESC',
  BridgeDescNullsLast = 'bridge_DESC_NULLS_LAST',
  ChainInAsc = 'chainIn_ASC',
  ChainInAscNullsFirst = 'chainIn_ASC_NULLS_FIRST',
  ChainInDesc = 'chainIn_DESC',
  ChainInDescNullsLast = 'chainIn_DESC_NULLS_LAST',
  ChainOutAsc = 'chainOut_ASC',
  ChainOutAscNullsFirst = 'chainOut_ASC_NULLS_FIRST',
  ChainOutDesc = 'chainOut_DESC',
  ChainOutDescNullsLast = 'chainOut_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MessageIdAsc = 'messageId_ASC',
  MessageIdAscNullsFirst = 'messageId_ASC_NULLS_FIRST',
  MessageIdDesc = 'messageId_DESC',
  MessageIdDescNullsLast = 'messageId_DESC_NULLS_LAST',
  ReceiverAsc = 'receiver_ASC',
  ReceiverAscNullsFirst = 'receiver_ASC_NULLS_FIRST',
  ReceiverDesc = 'receiver_DESC',
  ReceiverDescNullsLast = 'receiver_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenInAsc = 'tokenIn_ASC',
  TokenInAscNullsFirst = 'tokenIn_ASC_NULLS_FIRST',
  TokenInDesc = 'tokenIn_DESC',
  TokenInDescNullsLast = 'tokenIn_DESC_NULLS_LAST',
  TokenOutAsc = 'tokenOut_ASC',
  TokenOutAscNullsFirst = 'tokenOut_ASC_NULLS_FIRST',
  TokenOutDesc = 'tokenOut_DESC',
  TokenOutDescNullsLast = 'tokenOut_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type BridgeTransferState = {
  __typename?: 'BridgeTransferState';
  id: Scalars['String']['output'];
  state: Scalars['Int']['output'];
};

export type BridgeTransferStateEdge = {
  __typename?: 'BridgeTransferStateEdge';
  cursor: Scalars['String']['output'];
  node: BridgeTransferState;
};

export enum BridgeTransferStateOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StateAsc = 'state_ASC',
  StateAscNullsFirst = 'state_ASC_NULLS_FIRST',
  StateDesc = 'state_DESC',
  StateDescNullsLast = 'state_DESC_NULLS_LAST'
}

export type BridgeTransferStateWhereInput = {
  AND?: InputMaybe<Array<BridgeTransferStateWhereInput>>;
  OR?: InputMaybe<Array<BridgeTransferStateWhereInput>>;
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
  state_eq?: InputMaybe<Scalars['Int']['input']>;
  state_gt?: InputMaybe<Scalars['Int']['input']>;
  state_gte?: InputMaybe<Scalars['Int']['input']>;
  state_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  state_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  state_lt?: InputMaybe<Scalars['Int']['input']>;
  state_lte?: InputMaybe<Scalars['Int']['input']>;
  state_not_eq?: InputMaybe<Scalars['Int']['input']>;
  state_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type BridgeTransferStatesConnection = {
  __typename?: 'BridgeTransferStatesConnection';
  edges: Array<BridgeTransferStateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BridgeTransferWhereInput = {
  AND?: InputMaybe<Array<BridgeTransferWhereInput>>;
  OR?: InputMaybe<Array<BridgeTransferWhereInput>>;
  amountIn_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountIn_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountIn_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountOut_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountOut_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountOut_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  bridge_contains?: InputMaybe<Scalars['String']['input']>;
  bridge_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  bridge_endsWith?: InputMaybe<Scalars['String']['input']>;
  bridge_eq?: InputMaybe<Scalars['String']['input']>;
  bridge_gt?: InputMaybe<Scalars['String']['input']>;
  bridge_gte?: InputMaybe<Scalars['String']['input']>;
  bridge_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bridge_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  bridge_lt?: InputMaybe<Scalars['String']['input']>;
  bridge_lte?: InputMaybe<Scalars['String']['input']>;
  bridge_not_contains?: InputMaybe<Scalars['String']['input']>;
  bridge_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  bridge_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  bridge_not_eq?: InputMaybe<Scalars['String']['input']>;
  bridge_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  bridge_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  bridge_startsWith?: InputMaybe<Scalars['String']['input']>;
  chainIn_eq?: InputMaybe<Scalars['Int']['input']>;
  chainIn_gt?: InputMaybe<Scalars['Int']['input']>;
  chainIn_gte?: InputMaybe<Scalars['Int']['input']>;
  chainIn_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainIn_lt?: InputMaybe<Scalars['Int']['input']>;
  chainIn_lte?: InputMaybe<Scalars['Int']['input']>;
  chainIn_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainIn_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainOut_eq?: InputMaybe<Scalars['Int']['input']>;
  chainOut_gt?: InputMaybe<Scalars['Int']['input']>;
  chainOut_gte?: InputMaybe<Scalars['Int']['input']>;
  chainOut_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainOut_lt?: InputMaybe<Scalars['Int']['input']>;
  chainOut_lte?: InputMaybe<Scalars['Int']['input']>;
  chainOut_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainOut_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  messageId_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  messageId_endsWith?: InputMaybe<Scalars['String']['input']>;
  messageId_eq?: InputMaybe<Scalars['String']['input']>;
  messageId_gt?: InputMaybe<Scalars['String']['input']>;
  messageId_gte?: InputMaybe<Scalars['String']['input']>;
  messageId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  messageId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  messageId_lt?: InputMaybe<Scalars['String']['input']>;
  messageId_lte?: InputMaybe<Scalars['String']['input']>;
  messageId_not_contains?: InputMaybe<Scalars['String']['input']>;
  messageId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  messageId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  messageId_not_eq?: InputMaybe<Scalars['String']['input']>;
  messageId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  messageId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  messageId_startsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  receiver_endsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_eq?: InputMaybe<Scalars['String']['input']>;
  receiver_gt?: InputMaybe<Scalars['String']['input']>;
  receiver_gte?: InputMaybe<Scalars['String']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver_lt?: InputMaybe<Scalars['String']['input']>;
  receiver_lte?: InputMaybe<Scalars['String']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  receiver_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_not_eq?: InputMaybe<Scalars['String']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_eq?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_not_eq?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  tokenIn_contains?: InputMaybe<Scalars['String']['input']>;
  tokenIn_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenIn_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenIn_eq?: InputMaybe<Scalars['String']['input']>;
  tokenIn_gt?: InputMaybe<Scalars['String']['input']>;
  tokenIn_gte?: InputMaybe<Scalars['String']['input']>;
  tokenIn_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenIn_lt?: InputMaybe<Scalars['String']['input']>;
  tokenIn_lte?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenIn_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenIn_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenIn_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenOut_contains?: InputMaybe<Scalars['String']['input']>;
  tokenOut_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenOut_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenOut_eq?: InputMaybe<Scalars['String']['input']>;
  tokenOut_gt?: InputMaybe<Scalars['String']['input']>;
  tokenOut_gte?: InputMaybe<Scalars['String']['input']>;
  tokenOut_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenOut_lt?: InputMaybe<Scalars['String']['input']>;
  tokenOut_lte?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenOut_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenOut_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenOut_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type BridgeTransfersConnection = {
  __typename?: 'BridgeTransfersConnection';
  edges: Array<BridgeTransferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CurvePool = {
  __typename?: 'CurvePool';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  token0: Scalars['String']['output'];
  token1: Scalars['String']['output'];
  token2?: Maybe<Scalars['String']['output']>;
  tokenCount: Scalars['Int']['output'];
};

export type CurvePoolBalance = {
  __typename?: 'CurvePoolBalance';
  address: Scalars['String']['output'];
  balance0: Scalars['BigInt']['output'];
  balance1: Scalars['BigInt']['output'];
  balance2: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type CurvePoolBalanceEdge = {
  __typename?: 'CurvePoolBalanceEdge';
  cursor: Scalars['String']['output'];
  node: CurvePoolBalance;
};

export enum CurvePoolBalanceOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  Balance0Asc = 'balance0_ASC',
  Balance0AscNullsFirst = 'balance0_ASC_NULLS_FIRST',
  Balance0Desc = 'balance0_DESC',
  Balance0DescNullsLast = 'balance0_DESC_NULLS_LAST',
  Balance1Asc = 'balance1_ASC',
  Balance1AscNullsFirst = 'balance1_ASC_NULLS_FIRST',
  Balance1Desc = 'balance1_DESC',
  Balance1DescNullsLast = 'balance1_DESC_NULLS_LAST',
  Balance2Asc = 'balance2_ASC',
  Balance2AscNullsFirst = 'balance2_ASC_NULLS_FIRST',
  Balance2Desc = 'balance2_DESC',
  Balance2DescNullsLast = 'balance2_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type CurvePoolBalanceWhereInput = {
  AND?: InputMaybe<Array<CurvePoolBalanceWhereInput>>;
  OR?: InputMaybe<Array<CurvePoolBalanceWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  balance0_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance0_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance0_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance1_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance1_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance1_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance2_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance2_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance2_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance2_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export type CurvePoolBalancesConnection = {
  __typename?: 'CurvePoolBalancesConnection';
  edges: Array<CurvePoolBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CurvePoolEdge = {
  __typename?: 'CurvePoolEdge';
  cursor: Scalars['String']['output'];
  node: CurvePool;
};

export enum CurvePoolOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  Token0Asc = 'token0_ASC',
  Token0AscNullsFirst = 'token0_ASC_NULLS_FIRST',
  Token0Desc = 'token0_DESC',
  Token0DescNullsLast = 'token0_DESC_NULLS_LAST',
  Token1Asc = 'token1_ASC',
  Token1AscNullsFirst = 'token1_ASC_NULLS_FIRST',
  Token1Desc = 'token1_DESC',
  Token1DescNullsLast = 'token1_DESC_NULLS_LAST',
  Token2Asc = 'token2_ASC',
  Token2AscNullsFirst = 'token2_ASC_NULLS_FIRST',
  Token2Desc = 'token2_DESC',
  Token2DescNullsLast = 'token2_DESC_NULLS_LAST',
  TokenCountAsc = 'tokenCount_ASC',
  TokenCountAscNullsFirst = 'tokenCount_ASC_NULLS_FIRST',
  TokenCountDesc = 'tokenCount_DESC',
  TokenCountDescNullsLast = 'tokenCount_DESC_NULLS_LAST'
}

export type CurvePoolRate = {
  __typename?: 'CurvePoolRate';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rate: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type CurvePoolRateEdge = {
  __typename?: 'CurvePoolRateEdge';
  cursor: Scalars['String']['output'];
  node: CurvePoolRate;
};

export enum CurvePoolRateOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  RateAsc = 'rate_ASC',
  RateAscNullsFirst = 'rate_ASC_NULLS_FIRST',
  RateDesc = 'rate_DESC',
  RateDescNullsLast = 'rate_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type CurvePoolRateWhereInput = {
  AND?: InputMaybe<Array<CurvePoolRateWhereInput>>;
  OR?: InputMaybe<Array<CurvePoolRateWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  rate_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type CurvePoolRatesConnection = {
  __typename?: 'CurvePoolRatesConnection';
  edges: Array<CurvePoolRateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CurvePoolWhereInput = {
  AND?: InputMaybe<Array<CurvePoolWhereInput>>;
  OR?: InputMaybe<Array<CurvePoolWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0_contains?: InputMaybe<Scalars['String']['input']>;
  token0_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0_eq?: InputMaybe<Scalars['String']['input']>;
  token0_gt?: InputMaybe<Scalars['String']['input']>;
  token0_gte?: InputMaybe<Scalars['String']['input']>;
  token0_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token0_lt?: InputMaybe<Scalars['String']['input']>;
  token0_lte?: InputMaybe<Scalars['String']['input']>;
  token0_not_contains?: InputMaybe<Scalars['String']['input']>;
  token0_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token0_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token0_not_eq?: InputMaybe<Scalars['String']['input']>;
  token0_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token0_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token0_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1_contains?: InputMaybe<Scalars['String']['input']>;
  token1_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1_eq?: InputMaybe<Scalars['String']['input']>;
  token1_gt?: InputMaybe<Scalars['String']['input']>;
  token1_gte?: InputMaybe<Scalars['String']['input']>;
  token1_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token1_lt?: InputMaybe<Scalars['String']['input']>;
  token1_lte?: InputMaybe<Scalars['String']['input']>;
  token1_not_contains?: InputMaybe<Scalars['String']['input']>;
  token1_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token1_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token1_not_eq?: InputMaybe<Scalars['String']['input']>;
  token1_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token1_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token1_startsWith?: InputMaybe<Scalars['String']['input']>;
  token2_contains?: InputMaybe<Scalars['String']['input']>;
  token2_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token2_endsWith?: InputMaybe<Scalars['String']['input']>;
  token2_eq?: InputMaybe<Scalars['String']['input']>;
  token2_gt?: InputMaybe<Scalars['String']['input']>;
  token2_gte?: InputMaybe<Scalars['String']['input']>;
  token2_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token2_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token2_lt?: InputMaybe<Scalars['String']['input']>;
  token2_lte?: InputMaybe<Scalars['String']['input']>;
  token2_not_contains?: InputMaybe<Scalars['String']['input']>;
  token2_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token2_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token2_not_eq?: InputMaybe<Scalars['String']['input']>;
  token2_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token2_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token2_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenCount_eq?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_gt?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_gte?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  tokenCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenCount_lt?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_lte?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type CurvePoolsConnection = {
  __typename?: 'CurvePoolsConnection';
  edges: Array<CurvePoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20 = {
  __typename?: 'ERC20';
  address: Scalars['String']['output'];
  decimals: Scalars['Int']['output'];
  /** Format: 'address' */
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type Erc20Balance = {
  __typename?: 'ERC20Balance';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  /** Format: 'address:account:blockNumber' */
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type Erc20BalanceEdge = {
  __typename?: 'ERC20BalanceEdge';
  cursor: Scalars['String']['output'];
  node: Erc20Balance;
};

export enum Erc20BalanceOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountDesc = 'account_DESC',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type Erc20BalanceWhereInput = {
  AND?: InputMaybe<Array<Erc20BalanceWhereInput>>;
  OR?: InputMaybe<Array<Erc20BalanceWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type Erc20BalancesConnection = {
  __typename?: 'ERC20BalancesConnection';
  edges: Array<Erc20BalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20Edge = {
  __typename?: 'ERC20Edge';
  cursor: Scalars['String']['output'];
  node: Erc20;
};

export type Erc20Holder = {
  __typename?: 'ERC20Holder';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  /** Format: 'address:account' */
  id: Scalars['String']['output'];
};

export type Erc20HolderEdge = {
  __typename?: 'ERC20HolderEdge';
  cursor: Scalars['String']['output'];
  node: Erc20Holder;
};

export enum Erc20HolderOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountDesc = 'account_DESC',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type Erc20HolderWhereInput = {
  AND?: InputMaybe<Array<Erc20HolderWhereInput>>;
  OR?: InputMaybe<Array<Erc20HolderWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type Erc20HoldersConnection = {
  __typename?: 'ERC20HoldersConnection';
  edges: Array<Erc20HolderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum Erc20OrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type Erc20State = {
  __typename?: 'ERC20State';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  holderCount: Scalars['Int']['output'];
  /** Format: 'address:blockNumber' */
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type Erc20StateEdge = {
  __typename?: 'ERC20StateEdge';
  cursor: Scalars['String']['output'];
  node: Erc20State;
};

export enum Erc20StateOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  HolderCountAsc = 'holderCount_ASC',
  HolderCountAscNullsFirst = 'holderCount_ASC_NULLS_FIRST',
  HolderCountDesc = 'holderCount_DESC',
  HolderCountDescNullsLast = 'holderCount_DESC_NULLS_LAST',
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

export type Erc20StateWhereInput = {
  AND?: InputMaybe<Array<Erc20StateWhereInput>>;
  OR?: InputMaybe<Array<Erc20StateWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holderCount_eq?: InputMaybe<Scalars['Int']['input']>;
  holderCount_gt?: InputMaybe<Scalars['Int']['input']>;
  holderCount_gte?: InputMaybe<Scalars['Int']['input']>;
  holderCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holderCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holderCount_lt?: InputMaybe<Scalars['Int']['input']>;
  holderCount_lte?: InputMaybe<Scalars['Int']['input']>;
  holderCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  holderCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type Erc20StatesConnection = {
  __typename?: 'ERC20StatesConnection';
  edges: Array<Erc20StateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Erc20WhereInput = {
  AND?: InputMaybe<Array<Erc20WhereInput>>;
  OR?: InputMaybe<Array<Erc20WhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  decimals_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Erc20sConnection = {
  __typename?: 'ERC20sConnection';
  edges: Array<Erc20Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/**
 * Any entity which has a price associated with it should have that price go in here.
 * Prices can change very frequently and we don't want those changes on the same track
 * as values which change less frequently.
 */
export type ExchangeRate = {
  __typename?: 'ExchangeRate';
  base: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  /** Format: 'blockNumber:pair' ex '123456789:ETH_USD' */
  id: Scalars['String']['output'];
  pair: Scalars['String']['output'];
  quote: Scalars['String']['output'];
  rate: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type ExchangeRateEdge = {
  __typename?: 'ExchangeRateEdge';
  cursor: Scalars['String']['output'];
  node: ExchangeRate;
};

export enum ExchangeRateOrderByInput {
  BaseAsc = 'base_ASC',
  BaseAscNullsFirst = 'base_ASC_NULLS_FIRST',
  BaseDesc = 'base_DESC',
  BaseDescNullsLast = 'base_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PairAsc = 'pair_ASC',
  PairAscNullsFirst = 'pair_ASC_NULLS_FIRST',
  PairDesc = 'pair_DESC',
  PairDescNullsLast = 'pair_DESC_NULLS_LAST',
  QuoteAsc = 'quote_ASC',
  QuoteAscNullsFirst = 'quote_ASC_NULLS_FIRST',
  QuoteDesc = 'quote_DESC',
  QuoteDescNullsLast = 'quote_DESC_NULLS_LAST',
  RateAsc = 'rate_ASC',
  RateAscNullsFirst = 'rate_ASC_NULLS_FIRST',
  RateDesc = 'rate_DESC',
  RateDescNullsLast = 'rate_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type ExchangeRateWhereInput = {
  AND?: InputMaybe<Array<ExchangeRateWhereInput>>;
  OR?: InputMaybe<Array<ExchangeRateWhereInput>>;
  base_contains?: InputMaybe<Scalars['String']['input']>;
  base_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  base_endsWith?: InputMaybe<Scalars['String']['input']>;
  base_eq?: InputMaybe<Scalars['String']['input']>;
  base_gt?: InputMaybe<Scalars['String']['input']>;
  base_gte?: InputMaybe<Scalars['String']['input']>;
  base_in?: InputMaybe<Array<Scalars['String']['input']>>;
  base_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  base_lt?: InputMaybe<Scalars['String']['input']>;
  base_lte?: InputMaybe<Scalars['String']['input']>;
  base_not_contains?: InputMaybe<Scalars['String']['input']>;
  base_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  base_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  base_not_eq?: InputMaybe<Scalars['String']['input']>;
  base_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  base_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  base_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  pair_contains?: InputMaybe<Scalars['String']['input']>;
  pair_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pair_endsWith?: InputMaybe<Scalars['String']['input']>;
  pair_eq?: InputMaybe<Scalars['String']['input']>;
  pair_gt?: InputMaybe<Scalars['String']['input']>;
  pair_gte?: InputMaybe<Scalars['String']['input']>;
  pair_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pair_lt?: InputMaybe<Scalars['String']['input']>;
  pair_lte?: InputMaybe<Scalars['String']['input']>;
  pair_not_contains?: InputMaybe<Scalars['String']['input']>;
  pair_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pair_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pair_not_eq?: InputMaybe<Scalars['String']['input']>;
  pair_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pair_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pair_startsWith?: InputMaybe<Scalars['String']['input']>;
  quote_contains?: InputMaybe<Scalars['String']['input']>;
  quote_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  quote_endsWith?: InputMaybe<Scalars['String']['input']>;
  quote_eq?: InputMaybe<Scalars['String']['input']>;
  quote_gt?: InputMaybe<Scalars['String']['input']>;
  quote_gte?: InputMaybe<Scalars['String']['input']>;
  quote_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quote_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  quote_lt?: InputMaybe<Scalars['String']['input']>;
  quote_lte?: InputMaybe<Scalars['String']['input']>;
  quote_not_contains?: InputMaybe<Scalars['String']['input']>;
  quote_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  quote_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  quote_not_eq?: InputMaybe<Scalars['String']['input']>;
  quote_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  quote_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  quote_startsWith?: InputMaybe<Scalars['String']['input']>;
  rate_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rate_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type ExchangeRatesConnection = {
  __typename?: 'ExchangeRatesConnection';
  edges: Array<ExchangeRateEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum HistoryType {
  Received = 'Received',
  Sent = 'Sent',
  Swap = 'Swap',
  Yield = 'Yield'
}

export type LiquidityDailyBalance = {
  __typename?: 'LiquidityDailyBalance';
  address: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
};

export type LiquidityDailyBalanceEdge = {
  __typename?: 'LiquidityDailyBalanceEdge';
  cursor: Scalars['String']['output'];
  node: LiquidityDailyBalance;
};

export enum LiquidityDailyBalanceOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
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
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenDesc = 'token_DESC',
  TokenDescNullsLast = 'token_DESC_NULLS_LAST'
}

export type LiquidityDailyBalanceWhereInput = {
  AND?: InputMaybe<Array<LiquidityDailyBalanceWhereInput>>;
  OR?: InputMaybe<Array<LiquidityDailyBalanceWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_eq?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_not_eq?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type LiquidityDailyBalancesConnection = {
  __typename?: 'LiquidityDailyBalancesConnection';
  edges: Array<LiquidityDailyBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LiquiditySource = {
  __typename?: 'LiquiditySource';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  token: Scalars['String']['output'];
  type: LiquiditySourceType;
};

export type LiquiditySourceEdge = {
  __typename?: 'LiquiditySourceEdge';
  cursor: Scalars['String']['output'];
  node: LiquiditySource;
};

export enum LiquiditySourceOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenDesc = 'token_DESC',
  TokenDescNullsLast = 'token_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeDesc = 'type_DESC',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export enum LiquiditySourceType {
  Aave = 'Aave',
  BalancerPool = 'BalancerPool',
  Compound = 'Compound',
  CurvePool = 'CurvePool',
  MaverickPool = 'MaverickPool',
  UniswapPool = 'UniswapPool'
}

export type LiquiditySourceWhereInput = {
  AND?: InputMaybe<Array<LiquiditySourceWhereInput>>;
  OR?: InputMaybe<Array<LiquiditySourceWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_eq?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_not_eq?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<LiquiditySourceType>;
  type_in?: InputMaybe<Array<LiquiditySourceType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<LiquiditySourceType>;
  type_not_in?: InputMaybe<Array<LiquiditySourceType>>;
};

export type LiquiditySourcesConnection = {
  __typename?: 'LiquiditySourcesConnection';
  edges: Array<LiquiditySourceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MakerDsrStrategiesConnection = {
  __typename?: 'MakerDSRStrategiesConnection';
  edges: Array<MakerDsrStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MakerDsrStrategy = {
  __typename?: 'MakerDSRStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type MakerDsrStrategyEdge = {
  __typename?: 'MakerDSRStrategyEdge';
  cursor: Scalars['String']['output'];
  node: MakerDsrStrategy;
};

export enum MakerDsrStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type MakerDsrStrategyWhereInput = {
  AND?: InputMaybe<Array<MakerDsrStrategyWhereInput>>;
  OR?: InputMaybe<Array<MakerDsrStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type MaverickPool = {
  __typename?: 'MaverickPool';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tokenA: Scalars['String']['output'];
  tokenB: Scalars['String']['output'];
};

export type MaverickPoolBalance = {
  __typename?: 'MaverickPoolBalance';
  address: Scalars['String']['output'];
  binBalanceA: Scalars['BigInt']['output'];
  binBalanceB: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type MaverickPoolBalanceEdge = {
  __typename?: 'MaverickPoolBalanceEdge';
  cursor: Scalars['String']['output'];
  node: MaverickPoolBalance;
};

export enum MaverickPoolBalanceOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BinBalanceAAsc = 'binBalanceA_ASC',
  BinBalanceAAscNullsFirst = 'binBalanceA_ASC_NULLS_FIRST',
  BinBalanceADesc = 'binBalanceA_DESC',
  BinBalanceADescNullsLast = 'binBalanceA_DESC_NULLS_LAST',
  BinBalanceBAsc = 'binBalanceB_ASC',
  BinBalanceBAscNullsFirst = 'binBalanceB_ASC_NULLS_FIRST',
  BinBalanceBDesc = 'binBalanceB_DESC',
  BinBalanceBDescNullsLast = 'binBalanceB_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type MaverickPoolBalanceWhereInput = {
  AND?: InputMaybe<Array<MaverickPoolBalanceWhereInput>>;
  OR?: InputMaybe<Array<MaverickPoolBalanceWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  binBalanceA_eq?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_gt?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_gte?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  binBalanceA_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  binBalanceA_lt?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_lte?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceA_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  binBalanceB_eq?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_gt?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_gte?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  binBalanceB_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  binBalanceB_lt?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_lte?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  binBalanceB_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
};

export type MaverickPoolBalancesConnection = {
  __typename?: 'MaverickPoolBalancesConnection';
  edges: Array<MaverickPoolBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MaverickPoolEdge = {
  __typename?: 'MaverickPoolEdge';
  cursor: Scalars['String']['output'];
  node: MaverickPool;
};

export enum MaverickPoolOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TokenAAsc = 'tokenA_ASC',
  TokenAAscNullsFirst = 'tokenA_ASC_NULLS_FIRST',
  TokenADesc = 'tokenA_DESC',
  TokenADescNullsLast = 'tokenA_DESC_NULLS_LAST',
  TokenBAsc = 'tokenB_ASC',
  TokenBAscNullsFirst = 'tokenB_ASC_NULLS_FIRST',
  TokenBDesc = 'tokenB_DESC',
  TokenBDescNullsLast = 'tokenB_DESC_NULLS_LAST'
}

export type MaverickPoolWhereInput = {
  AND?: InputMaybe<Array<MaverickPoolWhereInput>>;
  OR?: InputMaybe<Array<MaverickPoolWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenA_contains?: InputMaybe<Scalars['String']['input']>;
  tokenA_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenA_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenA_eq?: InputMaybe<Scalars['String']['input']>;
  tokenA_gt?: InputMaybe<Scalars['String']['input']>;
  tokenA_gte?: InputMaybe<Scalars['String']['input']>;
  tokenA_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenA_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenA_lt?: InputMaybe<Scalars['String']['input']>;
  tokenA_lte?: InputMaybe<Scalars['String']['input']>;
  tokenA_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenA_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenA_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenA_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenA_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenA_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenA_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenB_contains?: InputMaybe<Scalars['String']['input']>;
  tokenB_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenB_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenB_eq?: InputMaybe<Scalars['String']['input']>;
  tokenB_gt?: InputMaybe<Scalars['String']['input']>;
  tokenB_gte?: InputMaybe<Scalars['String']['input']>;
  tokenB_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenB_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenB_lt?: InputMaybe<Scalars['String']['input']>;
  tokenB_lte?: InputMaybe<Scalars['String']['input']>;
  tokenB_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenB_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenB_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenB_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenB_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenB_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenB_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type MaverickPoolsConnection = {
  __typename?: 'MaverickPoolsConnection';
  edges: Array<MaverickPoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type NativeBalance = {
  __typename?: 'NativeBalance';
  account: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  /** Format: 'account:blockNumber' */
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type NativeBalanceEdge = {
  __typename?: 'NativeBalanceEdge';
  cursor: Scalars['String']['output'];
  node: NativeBalance;
};

export enum NativeBalanceOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountDesc = 'account_DESC',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type NativeBalanceWhereInput = {
  AND?: InputMaybe<Array<NativeBalanceWhereInput>>;
  OR?: InputMaybe<Array<NativeBalanceWhereInput>>;
  account_contains?: InputMaybe<Scalars['String']['input']>;
  account_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_eq?: InputMaybe<Scalars['String']['input']>;
  account_gt?: InputMaybe<Scalars['String']['input']>;
  account_gte?: InputMaybe<Scalars['String']['input']>;
  account_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  account_lt?: InputMaybe<Scalars['String']['input']>;
  account_lte?: InputMaybe<Scalars['String']['input']>;
  account_not_contains?: InputMaybe<Scalars['String']['input']>;
  account_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  account_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  account_not_eq?: InputMaybe<Scalars['String']['input']>;
  account_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  account_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  account_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type NativeBalancesConnection = {
  __typename?: 'NativeBalancesConnection';
  edges: Array<NativeBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The OETH entity tracks the change in total supply of OETH over time. */
export type Oeth = {
  __typename?: 'OETH';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

/** The APY entity tracks historical APY values by day. */
export type Oethapy = {
  __typename?: 'OETHAPY';
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

export type OethapyEdge = {
  __typename?: 'OETHAPYEdge';
  cursor: Scalars['String']['output'];
  node: Oethapy;
};

export enum OethapyOrderByInput {
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

export type OethapyWhereInput = {
  AND?: InputMaybe<Array<OethapyWhereInput>>;
  OR?: InputMaybe<Array<OethapyWhereInput>>;
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

export type OethaPiesConnection = {
  __typename?: 'OETHAPiesConnection';
  edges: Array<OethapyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethActivitiesConnection = {
  __typename?: 'OETHActivitiesConnection';
  edges: Array<OethActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethActivity = {
  __typename?: 'OETHActivity';
  action?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  callDataLast4Bytes: Scalars['String']['output'];
  exchange?: Maybe<Scalars['String']['output']>;
  fromSymbol?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  interface?: Maybe<Scalars['String']['output']>;
  sighash?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  toSymbol?: Maybe<Scalars['String']['output']>;
  txHash: Scalars['String']['output'];
};

export type OethActivityEdge = {
  __typename?: 'OETHActivityEdge';
  cursor: Scalars['String']['output'];
  node: OethActivity;
};

export enum OethActivityOrderByInput {
  ActionAsc = 'action_ASC',
  ActionAscNullsFirst = 'action_ASC_NULLS_FIRST',
  ActionDesc = 'action_DESC',
  ActionDescNullsLast = 'action_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CallDataLast4BytesAsc = 'callDataLast4Bytes_ASC',
  CallDataLast4BytesAscNullsFirst = 'callDataLast4Bytes_ASC_NULLS_FIRST',
  CallDataLast4BytesDesc = 'callDataLast4Bytes_DESC',
  CallDataLast4BytesDescNullsLast = 'callDataLast4Bytes_DESC_NULLS_LAST',
  ExchangeAsc = 'exchange_ASC',
  ExchangeAscNullsFirst = 'exchange_ASC_NULLS_FIRST',
  ExchangeDesc = 'exchange_DESC',
  ExchangeDescNullsLast = 'exchange_DESC_NULLS_LAST',
  FromSymbolAsc = 'fromSymbol_ASC',
  FromSymbolAscNullsFirst = 'fromSymbol_ASC_NULLS_FIRST',
  FromSymbolDesc = 'fromSymbol_DESC',
  FromSymbolDescNullsLast = 'fromSymbol_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InterfaceAsc = 'interface_ASC',
  InterfaceAscNullsFirst = 'interface_ASC_NULLS_FIRST',
  InterfaceDesc = 'interface_DESC',
  InterfaceDescNullsLast = 'interface_DESC_NULLS_LAST',
  SighashAsc = 'sighash_ASC',
  SighashAscNullsFirst = 'sighash_ASC_NULLS_FIRST',
  SighashDesc = 'sighash_DESC',
  SighashDescNullsLast = 'sighash_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToSymbolAsc = 'toSymbol_ASC',
  ToSymbolAscNullsFirst = 'toSymbol_ASC_NULLS_FIRST',
  ToSymbolDesc = 'toSymbol_DESC',
  ToSymbolDescNullsLast = 'toSymbol_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type OethActivityWhereInput = {
  AND?: InputMaybe<Array<OethActivityWhereInput>>;
  OR?: InputMaybe<Array<OethActivityWhereInput>>;
  action_contains?: InputMaybe<Scalars['String']['input']>;
  action_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  action_endsWith?: InputMaybe<Scalars['String']['input']>;
  action_eq?: InputMaybe<Scalars['String']['input']>;
  action_gt?: InputMaybe<Scalars['String']['input']>;
  action_gte?: InputMaybe<Scalars['String']['input']>;
  action_in?: InputMaybe<Array<Scalars['String']['input']>>;
  action_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  action_lt?: InputMaybe<Scalars['String']['input']>;
  action_lte?: InputMaybe<Scalars['String']['input']>;
  action_not_contains?: InputMaybe<Scalars['String']['input']>;
  action_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  action_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  action_not_eq?: InputMaybe<Scalars['String']['input']>;
  action_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  action_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  action_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callDataLast4Bytes_contains?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_endsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_eq?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_gt?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_gte?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callDataLast4Bytes_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callDataLast4Bytes_lt?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_lte?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_contains?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_eq?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callDataLast4Bytes_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_startsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_contains?: InputMaybe<Scalars['String']['input']>;
  exchange_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  exchange_endsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_eq?: InputMaybe<Scalars['String']['input']>;
  exchange_gt?: InputMaybe<Scalars['String']['input']>;
  exchange_gte?: InputMaybe<Scalars['String']['input']>;
  exchange_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exchange_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  exchange_lt?: InputMaybe<Scalars['String']['input']>;
  exchange_lte?: InputMaybe<Scalars['String']['input']>;
  exchange_not_contains?: InputMaybe<Scalars['String']['input']>;
  exchange_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  exchange_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_not_eq?: InputMaybe<Scalars['String']['input']>;
  exchange_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exchange_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_contains?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_eq?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_gt?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_gte?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromSymbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromSymbol_lt?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_lte?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromSymbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  interface_contains?: InputMaybe<Scalars['String']['input']>;
  interface_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  interface_endsWith?: InputMaybe<Scalars['String']['input']>;
  interface_eq?: InputMaybe<Scalars['String']['input']>;
  interface_gt?: InputMaybe<Scalars['String']['input']>;
  interface_gte?: InputMaybe<Scalars['String']['input']>;
  interface_in?: InputMaybe<Array<Scalars['String']['input']>>;
  interface_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  interface_lt?: InputMaybe<Scalars['String']['input']>;
  interface_lte?: InputMaybe<Scalars['String']['input']>;
  interface_not_contains?: InputMaybe<Scalars['String']['input']>;
  interface_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  interface_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  interface_not_eq?: InputMaybe<Scalars['String']['input']>;
  interface_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  interface_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  interface_startsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_contains?: InputMaybe<Scalars['String']['input']>;
  sighash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sighash_endsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_eq?: InputMaybe<Scalars['String']['input']>;
  sighash_gt?: InputMaybe<Scalars['String']['input']>;
  sighash_gte?: InputMaybe<Scalars['String']['input']>;
  sighash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sighash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sighash_lt?: InputMaybe<Scalars['String']['input']>;
  sighash_lte?: InputMaybe<Scalars['String']['input']>;
  sighash_not_contains?: InputMaybe<Scalars['String']['input']>;
  sighash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sighash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_not_eq?: InputMaybe<Scalars['String']['input']>;
  sighash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sighash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  toSymbol_contains?: InputMaybe<Scalars['String']['input']>;
  toSymbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toSymbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_eq?: InputMaybe<Scalars['String']['input']>;
  toSymbol_gt?: InputMaybe<Scalars['String']['input']>;
  toSymbol_gte?: InputMaybe<Scalars['String']['input']>;
  toSymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toSymbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toSymbol_lt?: InputMaybe<Scalars['String']['input']>;
  toSymbol_lte?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toSymbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

/** The OETH balance, history and other information for a given address. */
export type OethAddress = {
  __typename?: 'OETHAddress';
  balance: Scalars['BigInt']['output'];
  credits: Scalars['BigInt']['output'];
  earned: Scalars['BigInt']['output'];
  history: Array<OethHistory>;
  id: Scalars['String']['output'];
  isContract: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  rebasingOption: RebasingOption;
};


/** The OETH balance, history and other information for a given address. */
export type OethAddressHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethHistoryOrderByInput>>;
  where?: InputMaybe<OethHistoryWhereInput>;
};

export type OethAddressEdge = {
  __typename?: 'OETHAddressEdge';
  cursor: Scalars['String']['output'];
  node: OethAddress;
};

export enum OethAddressOrderByInput {
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

export type OethAddressWhereInput = {
  AND?: InputMaybe<Array<OethAddressWhereInput>>;
  OR?: InputMaybe<Array<OethAddressWhereInput>>;
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
  history_every?: InputMaybe<OethHistoryWhereInput>;
  history_none?: InputMaybe<OethHistoryWhereInput>;
  history_some?: InputMaybe<OethHistoryWhereInput>;
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

export type OethAddressesConnection = {
  __typename?: 'OETHAddressesConnection';
  edges: Array<OethAddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethAsset = {
  __typename?: 'OETHAsset';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type OethAssetEdge = {
  __typename?: 'OETHAssetEdge';
  cursor: Scalars['String']['output'];
  node: OethAsset;
};

export enum OethAssetOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type OethAssetWhereInput = {
  AND?: InputMaybe<Array<OethAssetWhereInput>>;
  OR?: InputMaybe<Array<OethAssetWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type OethAssetsConnection = {
  __typename?: 'OETHAssetsConnection';
  edges: Array<OethAssetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethBalancerMetaPoolStrategiesConnection = {
  __typename?: 'OETHBalancerMetaPoolStrategiesConnection';
  edges: Array<OethBalancerMetaPoolStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethBalancerMetaPoolStrategy = {
  __typename?: 'OETHBalancerMetaPoolStrategy';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rETH: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type OethBalancerMetaPoolStrategyEdge = {
  __typename?: 'OETHBalancerMetaPoolStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OethBalancerMetaPoolStrategy;
};

export enum OethBalancerMetaPoolStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  REthAsc = 'rETH_ASC',
  REthAscNullsFirst = 'rETH_ASC_NULLS_FIRST',
  REthDesc = 'rETH_DESC',
  REthDescNullsLast = 'rETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethDesc = 'weth_DESC',
  WethDescNullsLast = 'weth_DESC_NULLS_LAST'
}

export type OethBalancerMetaPoolStrategyWhereInput = {
  AND?: InputMaybe<Array<OethBalancerMetaPoolStrategyWhereInput>>;
  OR?: InputMaybe<Array<OethBalancerMetaPoolStrategyWhereInput>>;
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
  rETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type OethCollateralDailyStat = {
  __typename?: 'OETHCollateralDailyStat';
  /** Amount held */
  amount: Scalars['BigInt']['output'];
  dailyStatId: OethDailyStat;
  id: Scalars['String']['output'];
  /** Price in ETH */
  price: Scalars['BigInt']['output'];
  /** Token symbol */
  symbol: Scalars['String']['output'];
  /** Total ETH value */
  value: Scalars['BigInt']['output'];
};

export type OethCollateralDailyStatEdge = {
  __typename?: 'OETHCollateralDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OethCollateralDailyStat;
};

export enum OethCollateralDailyStatOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceDesc = 'price_DESC',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type OethCollateralDailyStatWhereInput = {
  AND?: InputMaybe<Array<OethCollateralDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OethCollateralDailyStatWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyStatId?: InputMaybe<OethDailyStatWhereInput>;
  dailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  price_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OethCollateralDailyStatsConnection = {
  __typename?: 'OETHCollateralDailyStatsConnection';
  edges: Array<OethCollateralDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethCurveLp = {
  __typename?: 'OETHCurveLP';
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

export type OethCurveLpEdge = {
  __typename?: 'OETHCurveLPEdge';
  cursor: Scalars['String']['output'];
  node: OethCurveLp;
};

export enum OethCurveLpOrderByInput {
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

export type OethCurveLpWhereInput = {
  AND?: InputMaybe<Array<OethCurveLpWhereInput>>;
  OR?: InputMaybe<Array<OethCurveLpWhereInput>>;
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

export type OethCurveLPsConnection = {
  __typename?: 'OETHCurveLPsConnection';
  edges: Array<OethCurveLpEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethDailyStat = {
  __typename?: 'OETHDailyStat';
  amoSupply: Scalars['BigInt']['output'];
  /** Timestamp of block number stats were updated */
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  apy7DayAvg: Scalars['Float']['output'];
  apy14DayAvg: Scalars['Float']['output'];
  apy30DayAvg: Scalars['Float']['output'];
  /** Timestamp, eg 2023-10-17 */
  blockNumber: Scalars['Int']['output'];
  collateral: Array<OethCollateralDailyStat>;
  dripperWETH: Scalars['BigInt']['output'];
  feesETH: Scalars['BigInt']['output'];
  feesETH7Day: Scalars['BigInt']['output'];
  feesETHAllTime: Scalars['BigInt']['output'];
  feesUSD: Scalars['BigInt']['output'];
  feesUSD7Day: Scalars['BigInt']['output'];
  feesUSDAllTime: Scalars['BigInt']['output'];
  holdersOverThreshold: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  marketCapUSD: Scalars['Float']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  pegPrice: Scalars['BigInt']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  strategies: Array<OethStrategyDailyStat>;
  /** Last block number stats were updated */
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyUSD: Scalars['Float']['output'];
  tradingVolumeUSD: Scalars['Float']['output'];
  wrappedSupply: Scalars['BigInt']['output'];
  yieldETH: Scalars['BigInt']['output'];
  yieldETH7Day: Scalars['BigInt']['output'];
  yieldETHAllTime: Scalars['BigInt']['output'];
  yieldUSD: Scalars['BigInt']['output'];
  yieldUSD7Day: Scalars['BigInt']['output'];
  yieldUSDAllTime: Scalars['BigInt']['output'];
};


export type OethDailyStatCollateralArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethCollateralDailyStatOrderByInput>>;
  where?: InputMaybe<OethCollateralDailyStatWhereInput>;
};


export type OethDailyStatStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethStrategyDailyStatOrderByInput>>;
  where?: InputMaybe<OethStrategyDailyStatWhereInput>;
};

export type OethDailyStatEdge = {
  __typename?: 'OETHDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OethDailyStat;
};

export enum OethDailyStatOrderByInput {
  AmoSupplyAsc = 'amoSupply_ASC',
  AmoSupplyAscNullsFirst = 'amoSupply_ASC_NULLS_FIRST',
  AmoSupplyDesc = 'amoSupply_DESC',
  AmoSupplyDescNullsLast = 'amoSupply_DESC_NULLS_LAST',
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
  DripperWethAsc = 'dripperWETH_ASC',
  DripperWethAscNullsFirst = 'dripperWETH_ASC_NULLS_FIRST',
  DripperWethDesc = 'dripperWETH_DESC',
  DripperWethDescNullsLast = 'dripperWETH_DESC_NULLS_LAST',
  FeesEth7DayAsc = 'feesETH7Day_ASC',
  FeesEth7DayAscNullsFirst = 'feesETH7Day_ASC_NULLS_FIRST',
  FeesEth7DayDesc = 'feesETH7Day_DESC',
  FeesEth7DayDescNullsLast = 'feesETH7Day_DESC_NULLS_LAST',
  FeesEthAllTimeAsc = 'feesETHAllTime_ASC',
  FeesEthAllTimeAscNullsFirst = 'feesETHAllTime_ASC_NULLS_FIRST',
  FeesEthAllTimeDesc = 'feesETHAllTime_DESC',
  FeesEthAllTimeDescNullsLast = 'feesETHAllTime_DESC_NULLS_LAST',
  FeesEthAsc = 'feesETH_ASC',
  FeesEthAscNullsFirst = 'feesETH_ASC_NULLS_FIRST',
  FeesEthDesc = 'feesETH_DESC',
  FeesEthDescNullsLast = 'feesETH_DESC_NULLS_LAST',
  FeesUsd7DayAsc = 'feesUSD7Day_ASC',
  FeesUsd7DayAscNullsFirst = 'feesUSD7Day_ASC_NULLS_FIRST',
  FeesUsd7DayDesc = 'feesUSD7Day_DESC',
  FeesUsd7DayDescNullsLast = 'feesUSD7Day_DESC_NULLS_LAST',
  FeesUsdAllTimeAsc = 'feesUSDAllTime_ASC',
  FeesUsdAllTimeAscNullsFirst = 'feesUSDAllTime_ASC_NULLS_FIRST',
  FeesUsdAllTimeDesc = 'feesUSDAllTime_DESC',
  FeesUsdAllTimeDescNullsLast = 'feesUSDAllTime_DESC_NULLS_LAST',
  FeesUsdAsc = 'feesUSD_ASC',
  FeesUsdAscNullsFirst = 'feesUSD_ASC_NULLS_FIRST',
  FeesUsdDesc = 'feesUSD_DESC',
  FeesUsdDescNullsLast = 'feesUSD_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  PegPriceAsc = 'pegPrice_ASC',
  PegPriceAscNullsFirst = 'pegPrice_ASC_NULLS_FIRST',
  PegPriceDesc = 'pegPrice_DESC',
  PegPriceDescNullsLast = 'pegPrice_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsLast = 'tradingVolumeUSD_DESC_NULLS_LAST',
  WrappedSupplyAsc = 'wrappedSupply_ASC',
  WrappedSupplyAscNullsFirst = 'wrappedSupply_ASC_NULLS_FIRST',
  WrappedSupplyDesc = 'wrappedSupply_DESC',
  WrappedSupplyDescNullsLast = 'wrappedSupply_DESC_NULLS_LAST',
  YieldEth7DayAsc = 'yieldETH7Day_ASC',
  YieldEth7DayAscNullsFirst = 'yieldETH7Day_ASC_NULLS_FIRST',
  YieldEth7DayDesc = 'yieldETH7Day_DESC',
  YieldEth7DayDescNullsLast = 'yieldETH7Day_DESC_NULLS_LAST',
  YieldEthAllTimeAsc = 'yieldETHAllTime_ASC',
  YieldEthAllTimeAscNullsFirst = 'yieldETHAllTime_ASC_NULLS_FIRST',
  YieldEthAllTimeDesc = 'yieldETHAllTime_DESC',
  YieldEthAllTimeDescNullsLast = 'yieldETHAllTime_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsd7DayAsc = 'yieldUSD7Day_ASC',
  YieldUsd7DayAscNullsFirst = 'yieldUSD7Day_ASC_NULLS_FIRST',
  YieldUsd7DayDesc = 'yieldUSD7Day_DESC',
  YieldUsd7DayDescNullsLast = 'yieldUSD7Day_DESC_NULLS_LAST',
  YieldUsdAllTimeAsc = 'yieldUSDAllTime_ASC',
  YieldUsdAllTimeAscNullsFirst = 'yieldUSDAllTime_ASC_NULLS_FIRST',
  YieldUsdAllTimeDesc = 'yieldUSDAllTime_DESC',
  YieldUsdAllTimeDescNullsLast = 'yieldUSDAllTime_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsLast = 'yieldUSD_DESC_NULLS_LAST'
}

export type OethDailyStatWhereInput = {
  AND?: InputMaybe<Array<OethDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OethDailyStatWhereInput>>;
  amoSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amoSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amoSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  collateral_every?: InputMaybe<OethCollateralDailyStatWhereInput>;
  collateral_none?: InputMaybe<OethCollateralDailyStatWhereInput>;
  collateral_some?: InputMaybe<OethCollateralDailyStatWhereInput>;
  dripperWETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dripperWETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dripperWETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETH7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETHAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETHAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETHAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSD7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSDAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSDAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSDAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  holdersOverThreshold_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holdersOverThreshold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holdersOverThreshold_lt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_lte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  marketCapUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  marketCapUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  marketCapUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  nonRebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonRebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonRebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pegPrice_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pegPrice_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pegPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strategies_every?: InputMaybe<OethStrategyDailyStatWhereInput>;
  strategies_none?: InputMaybe<OethStrategyDailyStatWhereInput>;
  strategies_some?: InputMaybe<OethStrategyDailyStatWhereInput>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalSupplyUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupplyUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupplyUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tradingVolumeUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  tradingVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tradingVolumeUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  wrappedSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  wrappedSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  wrappedSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETHAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETHAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETHAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSDAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSDAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSDAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OethDailyStatsConnection = {
  __typename?: 'OETHDailyStatsConnection';
  edges: Array<OethDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethDripper = {
  __typename?: 'OETHDripper';
  blockNumber: Scalars['Int']['output'];
  dripDuration: Scalars['BigInt']['output'];
  dripRatePerBlock: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastCollectTimestamp: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type OethDripperEdge = {
  __typename?: 'OETHDripperEdge';
  cursor: Scalars['String']['output'];
  node: OethDripper;
};

export enum OethDripperOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DripDurationAsc = 'dripDuration_ASC',
  DripDurationAscNullsFirst = 'dripDuration_ASC_NULLS_FIRST',
  DripDurationDesc = 'dripDuration_DESC',
  DripDurationDescNullsLast = 'dripDuration_DESC_NULLS_LAST',
  DripRatePerBlockAsc = 'dripRatePerBlock_ASC',
  DripRatePerBlockAscNullsFirst = 'dripRatePerBlock_ASC_NULLS_FIRST',
  DripRatePerBlockDesc = 'dripRatePerBlock_DESC',
  DripRatePerBlockDescNullsLast = 'dripRatePerBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastCollectTimestampAsc = 'lastCollectTimestamp_ASC',
  LastCollectTimestampAscNullsFirst = 'lastCollectTimestamp_ASC_NULLS_FIRST',
  LastCollectTimestampDesc = 'lastCollectTimestamp_DESC',
  LastCollectTimestampDescNullsLast = 'lastCollectTimestamp_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethDesc = 'weth_DESC',
  WethDescNullsLast = 'weth_DESC_NULLS_LAST'
}

export type OethDripperWhereInput = {
  AND?: InputMaybe<Array<OethDripperWhereInput>>;
  OR?: InputMaybe<Array<OethDripperWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dripDuration_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dripDuration_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dripDuration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripDuration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dripRatePerBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dripRatePerBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dripRatePerBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripRatePerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  lastCollectTimestamp_eq?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lastCollectTimestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastCollectTimestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lastCollectTimestamp_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type OethDrippersConnection = {
  __typename?: 'OETHDrippersConnection';
  edges: Array<OethDripperEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethEdge = {
  __typename?: 'OETHEdge';
  cursor: Scalars['String']['output'];
  node: Oeth;
};

export type OethFraxStaking = {
  __typename?: 'OETHFraxStaking';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  /**
   * - sfrxETH is what's actually stored here, slightly confusing and may want to change.
   * - used by balance sheet
   */
  sfrxETH: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type OethFraxStakingEdge = {
  __typename?: 'OETHFraxStakingEdge';
  cursor: Scalars['String']['output'];
  node: OethFraxStaking;
};

export enum OethFraxStakingOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SfrxEthAsc = 'sfrxETH_ASC',
  SfrxEthAscNullsFirst = 'sfrxETH_ASC_NULLS_FIRST',
  SfrxEthDesc = 'sfrxETH_DESC',
  SfrxEthDescNullsLast = 'sfrxETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OethFraxStakingWhereInput = {
  AND?: InputMaybe<Array<OethFraxStakingWhereInput>>;
  OR?: InputMaybe<Array<OethFraxStakingWhereInput>>;
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
  sfrxETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sfrxETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sfrxETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sfrxETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type OethFraxStakingsConnection = {
  __typename?: 'OETHFraxStakingsConnection';
  edges: Array<OethFraxStakingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethHistoriesConnection = {
  __typename?: 'OETHHistoriesConnection';
  edges: Array<OethHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The History entity tracks events that change the balance of OETH for an address. */
export type OethHistory = {
  __typename?: 'OETHHistory';
  address: OethAddress;
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: HistoryType;
  value: Scalars['BigInt']['output'];
};

export type OethHistoryEdge = {
  __typename?: 'OETHHistoryEdge';
  cursor: Scalars['String']['output'];
  node: OethHistory;
};

export enum OethHistoryOrderByInput {
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

export type OethHistoryWhereInput = {
  AND?: InputMaybe<Array<OethHistoryWhereInput>>;
  OR?: InputMaybe<Array<OethHistoryWhereInput>>;
  address?: InputMaybe<OethAddressWhereInput>;
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

export type OethMorphoAave = {
  __typename?: 'OETHMorphoAave';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type OethMorphoAaveEdge = {
  __typename?: 'OETHMorphoAaveEdge';
  cursor: Scalars['String']['output'];
  node: OethMorphoAave;
};

export enum OethMorphoAaveOrderByInput {
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

export type OethMorphoAaveWhereInput = {
  AND?: InputMaybe<Array<OethMorphoAaveWhereInput>>;
  OR?: InputMaybe<Array<OethMorphoAaveWhereInput>>;
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

export type OethMorphoAavesConnection = {
  __typename?: 'OETHMorphoAavesConnection';
  edges: Array<OethMorphoAaveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

/** The Rebase entity tracks historical rebase events on the OETH contract. */
export type OethRebase = {
  __typename?: 'OETHRebase';
  apy: Oethapy;
  blockNumber: Scalars['Int']['output'];
  feeETH: Scalars['BigInt']['output'];
  feeUSD: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  yieldETH: Scalars['BigInt']['output'];
  yieldUSD: Scalars['BigInt']['output'];
};

export type OethRebaseEdge = {
  __typename?: 'OETHRebaseEdge';
  cursor: Scalars['String']['output'];
  node: OethRebase;
};

/** The RebaseOption entity tracks historical rebase option changes by address. */
export type OethRebaseOption = {
  __typename?: 'OETHRebaseOption';
  address: OethAddress;
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  status: RebasingOption;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type OethRebaseOptionEdge = {
  __typename?: 'OETHRebaseOptionEdge';
  cursor: Scalars['String']['output'];
  node: OethRebaseOption;
};

export enum OethRebaseOptionOrderByInput {
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

export type OethRebaseOptionWhereInput = {
  AND?: InputMaybe<Array<OethRebaseOptionWhereInput>>;
  OR?: InputMaybe<Array<OethRebaseOptionWhereInput>>;
  address?: InputMaybe<OethAddressWhereInput>;
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

export type OethRebaseOptionsConnection = {
  __typename?: 'OETHRebaseOptionsConnection';
  edges: Array<OethRebaseOptionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OethRebaseOrderByInput {
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
  FeeEthAsc = 'feeETH_ASC',
  FeeEthAscNullsFirst = 'feeETH_ASC_NULLS_FIRST',
  FeeEthDesc = 'feeETH_DESC',
  FeeEthDescNullsLast = 'feeETH_DESC_NULLS_LAST',
  FeeUsdAsc = 'feeUSD_ASC',
  FeeUsdAscNullsFirst = 'feeUSD_ASC_NULLS_FIRST',
  FeeUsdDesc = 'feeUSD_DESC',
  FeeUsdDescNullsLast = 'feeUSD_DESC_NULLS_LAST',
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
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsLast = 'yieldUSD_DESC_NULLS_LAST'
}

export type OethRebaseWhereInput = {
  AND?: InputMaybe<Array<OethRebaseWhereInput>>;
  OR?: InputMaybe<Array<OethRebaseWhereInput>>;
  apy?: InputMaybe<OethapyWhereInput>;
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
  feeETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  yieldETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OethRebasesConnection = {
  __typename?: 'OETHRebasesConnection';
  edges: Array<OethRebaseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethRewardTokenCollected = {
  __typename?: 'OETHRewardTokenCollected';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  recipient: Scalars['String']['output'];
  rewardToken: Scalars['String']['output'];
  strategy: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type OethRewardTokenCollectedEdge = {
  __typename?: 'OETHRewardTokenCollectedEdge';
  cursor: Scalars['String']['output'];
  node: OethRewardTokenCollected;
};

export enum OethRewardTokenCollectedOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST',
  RewardTokenAsc = 'rewardToken_ASC',
  RewardTokenAscNullsFirst = 'rewardToken_ASC_NULLS_FIRST',
  RewardTokenDesc = 'rewardToken_DESC',
  RewardTokenDescNullsLast = 'rewardToken_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OethRewardTokenCollectedWhereInput = {
  AND?: InputMaybe<Array<OethRewardTokenCollectedWhereInput>>;
  OR?: InputMaybe<Array<OethRewardTokenCollectedWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_not_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardToken_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardToken_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardToken_eq?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_gte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardToken_lt?: InputMaybe<Scalars['String']['input']>;
  rewardToken_lte?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_contains?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_eq?: InputMaybe<Scalars['String']['input']>;
  rewardToken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  rewardToken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardToken_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_gt?: InputMaybe<Scalars['String']['input']>;
  strategy_gte?: InputMaybe<Scalars['String']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  strategy_lt?: InputMaybe<Scalars['String']['input']>;
  strategy_lte?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_not_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OethRewardTokenCollectedsConnection = {
  __typename?: 'OETHRewardTokenCollectedsConnection';
  edges: Array<OethRewardTokenCollectedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethStrategyDailyStat = {
  __typename?: 'OETHStrategyDailyStat';
  dailyStatId: OethDailyStat;
  /** Total ETH value */
  holdings: Array<OethStrategyHoldingDailyStat>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total: Scalars['BigInt']['output'];
  /** Sum of tokens in strategy */
  tvl: Scalars['BigInt']['output'];
};


export type OethStrategyDailyStatHoldingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethStrategyHoldingDailyStatOrderByInput>>;
  where?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
};

export type OethStrategyDailyStatEdge = {
  __typename?: 'OETHStrategyDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OethStrategyDailyStat;
};

export enum OethStrategyDailyStatOrderByInput {
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TvlAsc = 'tvl_ASC',
  TvlAscNullsFirst = 'tvl_ASC_NULLS_FIRST',
  TvlDesc = 'tvl_DESC',
  TvlDescNullsLast = 'tvl_DESC_NULLS_LAST'
}

export type OethStrategyDailyStatWhereInput = {
  AND?: InputMaybe<Array<OethStrategyDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OethStrategyDailyStatWhereInput>>;
  dailyStatId?: InputMaybe<OethDailyStatWhereInput>;
  dailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holdings_every?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
  holdings_none?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
  holdings_some?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  total_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_gt?: InputMaybe<Scalars['BigInt']['input']>;
  total_gte?: InputMaybe<Scalars['BigInt']['input']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['BigInt']['input']>;
  total_lte?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvl_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvl_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OethStrategyDailyStatsConnection = {
  __typename?: 'OETHStrategyDailyStatsConnection';
  edges: Array<OethStrategyDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OethStrategyHoldingDailyStat = {
  __typename?: 'OETHStrategyHoldingDailyStat';
  /** Amount held */
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  strategyDailyStatId: OethStrategyDailyStat;
  /** Token symbol */
  symbol: Scalars['String']['output'];
  /** Total ETH value */
  value: Scalars['BigInt']['output'];
};

export type OethStrategyHoldingDailyStatEdge = {
  __typename?: 'OETHStrategyHoldingDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OethStrategyHoldingDailyStat;
};

export enum OethStrategyHoldingDailyStatOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyDailyStatIdIdAsc = 'strategyDailyStatId_id_ASC',
  StrategyDailyStatIdIdAscNullsFirst = 'strategyDailyStatId_id_ASC_NULLS_FIRST',
  StrategyDailyStatIdIdDesc = 'strategyDailyStatId_id_DESC',
  StrategyDailyStatIdIdDescNullsLast = 'strategyDailyStatId_id_DESC_NULLS_LAST',
  StrategyDailyStatIdNameAsc = 'strategyDailyStatId_name_ASC',
  StrategyDailyStatIdNameAscNullsFirst = 'strategyDailyStatId_name_ASC_NULLS_FIRST',
  StrategyDailyStatIdNameDesc = 'strategyDailyStatId_name_DESC',
  StrategyDailyStatIdNameDescNullsLast = 'strategyDailyStatId_name_DESC_NULLS_LAST',
  StrategyDailyStatIdTotalAsc = 'strategyDailyStatId_total_ASC',
  StrategyDailyStatIdTotalAscNullsFirst = 'strategyDailyStatId_total_ASC_NULLS_FIRST',
  StrategyDailyStatIdTotalDesc = 'strategyDailyStatId_total_DESC',
  StrategyDailyStatIdTotalDescNullsLast = 'strategyDailyStatId_total_DESC_NULLS_LAST',
  StrategyDailyStatIdTvlAsc = 'strategyDailyStatId_tvl_ASC',
  StrategyDailyStatIdTvlAscNullsFirst = 'strategyDailyStatId_tvl_ASC_NULLS_FIRST',
  StrategyDailyStatIdTvlDesc = 'strategyDailyStatId_tvl_DESC',
  StrategyDailyStatIdTvlDescNullsLast = 'strategyDailyStatId_tvl_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type OethStrategyHoldingDailyStatWhereInput = {
  AND?: InputMaybe<Array<OethStrategyHoldingDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OethStrategyHoldingDailyStatWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  strategyDailyStatId?: InputMaybe<OethStrategyDailyStatWhereInput>;
  strategyDailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OethStrategyHoldingDailyStatsConnection = {
  __typename?: 'OETHStrategyHoldingDailyStatsConnection';
  edges: Array<OethStrategyHoldingDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The Vault entity tracks the OETH vault balance over time. */
export type OethVault = {
  __typename?: 'OETHVault';
  blockNumber: Scalars['Int']['output'];
  frxETH: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rETH: Scalars['BigInt']['output'];
  stETH: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  weth: Scalars['BigInt']['output'];
};

export type OethVaultEdge = {
  __typename?: 'OETHVaultEdge';
  cursor: Scalars['String']['output'];
  node: OethVault;
};

export enum OethVaultOrderByInput {
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

export type OethVaultWhereInput = {
  AND?: InputMaybe<Array<OethVaultWhereInput>>;
  OR?: InputMaybe<Array<OethVaultWhereInput>>;
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

export type OethVaultsConnection = {
  __typename?: 'OETHVaultsConnection';
  edges: Array<OethVaultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

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
  nonRebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonRebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonRebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type OgnStatsResult = {
  __typename?: 'OGNStatsResult';
  circulatingSupply: Scalars['Float']['output'];
  totalSupply: Scalars['Float']['output'];
};

export type Ogv = {
  __typename?: 'OGV';
  blockNumber: Scalars['Int']['output'];
  circulating: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  staked: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  total: Scalars['BigInt']['output'];
};

export type OgvAddress = {
  __typename?: 'OGVAddress';
  balance: Scalars['BigInt']['output'];
  delegatee?: Maybe<OgvAddress>;
  id: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  staked: Scalars['BigInt']['output'];
  veogvBalance: Scalars['BigInt']['output'];
  votingPower: Scalars['BigInt']['output'];
};

export type OgvAddressEdge = {
  __typename?: 'OGVAddressEdge';
  cursor: Scalars['String']['output'];
  node: OgvAddress;
};

export enum OgvAddressOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  DelegateeBalanceAsc = 'delegatee_balance_ASC',
  DelegateeBalanceAscNullsFirst = 'delegatee_balance_ASC_NULLS_FIRST',
  DelegateeBalanceDesc = 'delegatee_balance_DESC',
  DelegateeBalanceDescNullsLast = 'delegatee_balance_DESC_NULLS_LAST',
  DelegateeIdAsc = 'delegatee_id_ASC',
  DelegateeIdAscNullsFirst = 'delegatee_id_ASC_NULLS_FIRST',
  DelegateeIdDesc = 'delegatee_id_DESC',
  DelegateeIdDescNullsLast = 'delegatee_id_DESC_NULLS_LAST',
  DelegateeLastUpdatedAsc = 'delegatee_lastUpdated_ASC',
  DelegateeLastUpdatedAscNullsFirst = 'delegatee_lastUpdated_ASC_NULLS_FIRST',
  DelegateeLastUpdatedDesc = 'delegatee_lastUpdated_DESC',
  DelegateeLastUpdatedDescNullsLast = 'delegatee_lastUpdated_DESC_NULLS_LAST',
  DelegateeStakedAsc = 'delegatee_staked_ASC',
  DelegateeStakedAscNullsFirst = 'delegatee_staked_ASC_NULLS_FIRST',
  DelegateeStakedDesc = 'delegatee_staked_DESC',
  DelegateeStakedDescNullsLast = 'delegatee_staked_DESC_NULLS_LAST',
  DelegateeVeogvBalanceAsc = 'delegatee_veogvBalance_ASC',
  DelegateeVeogvBalanceAscNullsFirst = 'delegatee_veogvBalance_ASC_NULLS_FIRST',
  DelegateeVeogvBalanceDesc = 'delegatee_veogvBalance_DESC',
  DelegateeVeogvBalanceDescNullsLast = 'delegatee_veogvBalance_DESC_NULLS_LAST',
  DelegateeVotingPowerAsc = 'delegatee_votingPower_ASC',
  DelegateeVotingPowerAscNullsFirst = 'delegatee_votingPower_ASC_NULLS_FIRST',
  DelegateeVotingPowerDesc = 'delegatee_votingPower_DESC',
  DelegateeVotingPowerDescNullsLast = 'delegatee_votingPower_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  VeogvBalanceAsc = 'veogvBalance_ASC',
  VeogvBalanceAscNullsFirst = 'veogvBalance_ASC_NULLS_FIRST',
  VeogvBalanceDesc = 'veogvBalance_DESC',
  VeogvBalanceDescNullsLast = 'veogvBalance_DESC_NULLS_LAST',
  VotingPowerAsc = 'votingPower_ASC',
  VotingPowerAscNullsFirst = 'votingPower_ASC_NULLS_FIRST',
  VotingPowerDesc = 'votingPower_DESC',
  VotingPowerDescNullsLast = 'votingPower_DESC_NULLS_LAST'
}

export type OgvAddressWhereInput = {
  AND?: InputMaybe<Array<OgvAddressWhereInput>>;
  OR?: InputMaybe<Array<OgvAddressWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  delegatee?: InputMaybe<OgvAddressWhereInput>;
  delegatee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  lastUpdated_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastUpdated_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  staked_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  veogvBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  veogvBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  veogvBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  veogvBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPower_eq?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingPower_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  votingPower_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  votingPower_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OgvAddressesConnection = {
  __typename?: 'OGVAddressesConnection';
  edges: Array<OgvAddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OgvDailyStat = {
  __typename?: 'OGVDailyStat';
  blockNumber: Scalars['Int']['output'];
  holdersOverThreshold: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  marketCapUSD: Scalars['Float']['output'];
  priceUSD: Scalars['Float']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalStaked: Scalars['BigInt']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyUSD: Scalars['Float']['output'];
  tradingVolumeUSD: Scalars['Float']['output'];
};

export type OgvDailyStatEdge = {
  __typename?: 'OGVDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OgvDailyStat;
};

export enum OgvDailyStatOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  PriceUsdAsc = 'priceUSD_ASC',
  PriceUsdAscNullsFirst = 'priceUSD_ASC_NULLS_FIRST',
  PriceUsdDesc = 'priceUSD_DESC',
  PriceUsdDescNullsLast = 'priceUSD_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalStakedAsc = 'totalStaked_ASC',
  TotalStakedAscNullsFirst = 'totalStaked_ASC_NULLS_FIRST',
  TotalStakedDesc = 'totalStaked_DESC',
  TotalStakedDescNullsLast = 'totalStaked_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsLast = 'tradingVolumeUSD_DESC_NULLS_LAST'
}

export type OgvDailyStatWhereInput = {
  AND?: InputMaybe<Array<OgvDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OgvDailyStatWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holdersOverThreshold_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holdersOverThreshold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holdersOverThreshold_lt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_lte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  marketCapUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  marketCapUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  marketCapUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  priceUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  priceUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  priceUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  priceUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalStaked_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalStaked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalStaked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupplyUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupplyUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupplyUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tradingVolumeUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  tradingVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tradingVolumeUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type OgvDailyStatsConnection = {
  __typename?: 'OGVDailyStatsConnection';
  edges: Array<OgvDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OgvEdge = {
  __typename?: 'OGVEdge';
  cursor: Scalars['String']['output'];
  node: Ogv;
};

export type OgvLockup = {
  __typename?: 'OGVLockup';
  address: OgvAddress;
  amount: Scalars['BigInt']['output'];
  end: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  lockupId: Scalars['String']['output'];
  logs: Array<OgvLockupTxLog>;
  timestamp: Scalars['DateTime']['output'];
  veogv: Scalars['BigInt']['output'];
};


export type OgvLockupLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvLockupTxLogOrderByInput>>;
  where?: InputMaybe<OgvLockupTxLogWhereInput>;
};

export type OgvLockupEdge = {
  __typename?: 'OGVLockupEdge';
  cursor: Scalars['String']['output'];
  node: OgvLockup;
};

export enum OgvLockupEventType {
  Extended = 'Extended',
  Staked = 'Staked',
  Unstaked = 'Unstaked'
}

export enum OgvLockupOrderByInput {
  AddressBalanceAsc = 'address_balance_ASC',
  AddressBalanceAscNullsFirst = 'address_balance_ASC_NULLS_FIRST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressStakedAsc = 'address_staked_ASC',
  AddressStakedAscNullsFirst = 'address_staked_ASC_NULLS_FIRST',
  AddressStakedDesc = 'address_staked_DESC',
  AddressStakedDescNullsLast = 'address_staked_DESC_NULLS_LAST',
  AddressVeogvBalanceAsc = 'address_veogvBalance_ASC',
  AddressVeogvBalanceAscNullsFirst = 'address_veogvBalance_ASC_NULLS_FIRST',
  AddressVeogvBalanceDesc = 'address_veogvBalance_DESC',
  AddressVeogvBalanceDescNullsLast = 'address_veogvBalance_DESC_NULLS_LAST',
  AddressVotingPowerAsc = 'address_votingPower_ASC',
  AddressVotingPowerAscNullsFirst = 'address_votingPower_ASC_NULLS_FIRST',
  AddressVotingPowerDesc = 'address_votingPower_DESC',
  AddressVotingPowerDescNullsLast = 'address_votingPower_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndDesc = 'end_DESC',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockupIdAsc = 'lockupId_ASC',
  LockupIdAscNullsFirst = 'lockupId_ASC_NULLS_FIRST',
  LockupIdDesc = 'lockupId_DESC',
  LockupIdDescNullsLast = 'lockupId_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  VeogvAsc = 'veogv_ASC',
  VeogvAscNullsFirst = 'veogv_ASC_NULLS_FIRST',
  VeogvDesc = 'veogv_DESC',
  VeogvDescNullsLast = 'veogv_DESC_NULLS_LAST'
}

export type OgvLockupTxLog = {
  __typename?: 'OGVLockupTxLog';
  blockNumber: Scalars['Int']['output'];
  event: OgvLockupEventType;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ogvLockup: OgvLockup;
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type OgvLockupTxLogEdge = {
  __typename?: 'OGVLockupTxLogEdge';
  cursor: Scalars['String']['output'];
  node: OgvLockupTxLog;
};

export enum OgvLockupTxLogOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventAsc = 'event_ASC',
  EventAscNullsFirst = 'event_ASC_NULLS_FIRST',
  EventDesc = 'event_DESC',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OgvLockupAmountAsc = 'ogvLockup_amount_ASC',
  OgvLockupAmountAscNullsFirst = 'ogvLockup_amount_ASC_NULLS_FIRST',
  OgvLockupAmountDesc = 'ogvLockup_amount_DESC',
  OgvLockupAmountDescNullsLast = 'ogvLockup_amount_DESC_NULLS_LAST',
  OgvLockupEndAsc = 'ogvLockup_end_ASC',
  OgvLockupEndAscNullsFirst = 'ogvLockup_end_ASC_NULLS_FIRST',
  OgvLockupEndDesc = 'ogvLockup_end_DESC',
  OgvLockupEndDescNullsLast = 'ogvLockup_end_DESC_NULLS_LAST',
  OgvLockupIdAsc = 'ogvLockup_id_ASC',
  OgvLockupIdAscNullsFirst = 'ogvLockup_id_ASC_NULLS_FIRST',
  OgvLockupIdDesc = 'ogvLockup_id_DESC',
  OgvLockupIdDescNullsLast = 'ogvLockup_id_DESC_NULLS_LAST',
  OgvLockupLockupIdAsc = 'ogvLockup_lockupId_ASC',
  OgvLockupLockupIdAscNullsFirst = 'ogvLockup_lockupId_ASC_NULLS_FIRST',
  OgvLockupLockupIdDesc = 'ogvLockup_lockupId_DESC',
  OgvLockupLockupIdDescNullsLast = 'ogvLockup_lockupId_DESC_NULLS_LAST',
  OgvLockupTimestampAsc = 'ogvLockup_timestamp_ASC',
  OgvLockupTimestampAscNullsFirst = 'ogvLockup_timestamp_ASC_NULLS_FIRST',
  OgvLockupTimestampDesc = 'ogvLockup_timestamp_DESC',
  OgvLockupTimestampDescNullsLast = 'ogvLockup_timestamp_DESC_NULLS_LAST',
  OgvLockupVeogvAsc = 'ogvLockup_veogv_ASC',
  OgvLockupVeogvAscNullsFirst = 'ogvLockup_veogv_ASC_NULLS_FIRST',
  OgvLockupVeogvDesc = 'ogvLockup_veogv_DESC',
  OgvLockupVeogvDescNullsLast = 'ogvLockup_veogv_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type OgvLockupTxLogWhereInput = {
  AND?: InputMaybe<Array<OgvLockupTxLogWhereInput>>;
  OR?: InputMaybe<Array<OgvLockupTxLogWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event_eq?: InputMaybe<OgvLockupEventType>;
  event_in?: InputMaybe<Array<OgvLockupEventType>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event_not_eq?: InputMaybe<OgvLockupEventType>;
  event_not_in?: InputMaybe<Array<OgvLockupEventType>>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  ogvLockup?: InputMaybe<OgvLockupWhereInput>;
  ogvLockup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type OgvLockupTxLogsConnection = {
  __typename?: 'OGVLockupTxLogsConnection';
  edges: Array<OgvLockupTxLogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OgvLockupWhereInput = {
  AND?: InputMaybe<Array<OgvLockupWhereInput>>;
  OR?: InputMaybe<Array<OgvLockupWhereInput>>;
  address?: InputMaybe<OgvAddressWhereInput>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  end_eq?: InputMaybe<Scalars['DateTime']['input']>;
  end_gt?: InputMaybe<Scalars['DateTime']['input']>;
  end_gte?: InputMaybe<Scalars['DateTime']['input']>;
  end_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  end_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_lt?: InputMaybe<Scalars['DateTime']['input']>;
  end_lte?: InputMaybe<Scalars['DateTime']['input']>;
  end_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  end_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
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
  lockupId_contains?: InputMaybe<Scalars['String']['input']>;
  lockupId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lockupId_endsWith?: InputMaybe<Scalars['String']['input']>;
  lockupId_eq?: InputMaybe<Scalars['String']['input']>;
  lockupId_gt?: InputMaybe<Scalars['String']['input']>;
  lockupId_gte?: InputMaybe<Scalars['String']['input']>;
  lockupId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lockupId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockupId_lt?: InputMaybe<Scalars['String']['input']>;
  lockupId_lte?: InputMaybe<Scalars['String']['input']>;
  lockupId_not_contains?: InputMaybe<Scalars['String']['input']>;
  lockupId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lockupId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  lockupId_not_eq?: InputMaybe<Scalars['String']['input']>;
  lockupId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lockupId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  lockupId_startsWith?: InputMaybe<Scalars['String']['input']>;
  logs_every?: InputMaybe<OgvLockupTxLogWhereInput>;
  logs_none?: InputMaybe<OgvLockupTxLogWhereInput>;
  logs_some?: InputMaybe<OgvLockupTxLogWhereInput>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  veogv_eq?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_gt?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_gte?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  veogv_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  veogv_lt?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_lte?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  veogv_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OgvLockupsConnection = {
  __typename?: 'OGVLockupsConnection';
  edges: Array<OgvLockupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OgvOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CirculatingAsc = 'circulating_ASC',
  CirculatingAscNullsFirst = 'circulating_ASC_NULLS_FIRST',
  CirculatingDesc = 'circulating_DESC',
  CirculatingDescNullsLast = 'circulating_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST'
}

export type OgvProposal = {
  __typename?: 'OGVProposal';
  choices: Array<Maybe<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  endBlock: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  logs: Array<OgvProposalTxLog>;
  proposer: OgvAddress;
  quorum: Scalars['BigInt']['output'];
  scores: Array<Maybe<Scalars['Float']['output']>>;
  startBlock: Scalars['BigInt']['output'];
  status: OgvProposalState;
  timestamp: Scalars['DateTime']['output'];
};


export type OgvProposalLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvProposalTxLogOrderByInput>>;
  where?: InputMaybe<OgvProposalTxLogWhereInput>;
};

export type OgvProposalEdge = {
  __typename?: 'OGVProposalEdge';
  cursor: Scalars['String']['output'];
  node: OgvProposal;
};

export enum OgvProposalEvent {
  Canceled = 'Canceled',
  Created = 'Created',
  Executed = 'Executed',
  Extended = 'Extended',
  Queued = 'Queued'
}

export enum OgvProposalOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EndBlockAsc = 'endBlock_ASC',
  EndBlockAscNullsFirst = 'endBlock_ASC_NULLS_FIRST',
  EndBlockDesc = 'endBlock_DESC',
  EndBlockDescNullsLast = 'endBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  ProposerBalanceAsc = 'proposer_balance_ASC',
  ProposerBalanceAscNullsFirst = 'proposer_balance_ASC_NULLS_FIRST',
  ProposerBalanceDesc = 'proposer_balance_DESC',
  ProposerBalanceDescNullsLast = 'proposer_balance_DESC_NULLS_LAST',
  ProposerIdAsc = 'proposer_id_ASC',
  ProposerIdAscNullsFirst = 'proposer_id_ASC_NULLS_FIRST',
  ProposerIdDesc = 'proposer_id_DESC',
  ProposerIdDescNullsLast = 'proposer_id_DESC_NULLS_LAST',
  ProposerLastUpdatedAsc = 'proposer_lastUpdated_ASC',
  ProposerLastUpdatedAscNullsFirst = 'proposer_lastUpdated_ASC_NULLS_FIRST',
  ProposerLastUpdatedDesc = 'proposer_lastUpdated_DESC',
  ProposerLastUpdatedDescNullsLast = 'proposer_lastUpdated_DESC_NULLS_LAST',
  ProposerStakedAsc = 'proposer_staked_ASC',
  ProposerStakedAscNullsFirst = 'proposer_staked_ASC_NULLS_FIRST',
  ProposerStakedDesc = 'proposer_staked_DESC',
  ProposerStakedDescNullsLast = 'proposer_staked_DESC_NULLS_LAST',
  ProposerVeogvBalanceAsc = 'proposer_veogvBalance_ASC',
  ProposerVeogvBalanceAscNullsFirst = 'proposer_veogvBalance_ASC_NULLS_FIRST',
  ProposerVeogvBalanceDesc = 'proposer_veogvBalance_DESC',
  ProposerVeogvBalanceDescNullsLast = 'proposer_veogvBalance_DESC_NULLS_LAST',
  ProposerVotingPowerAsc = 'proposer_votingPower_ASC',
  ProposerVotingPowerAscNullsFirst = 'proposer_votingPower_ASC_NULLS_FIRST',
  ProposerVotingPowerDesc = 'proposer_votingPower_DESC',
  ProposerVotingPowerDescNullsLast = 'proposer_votingPower_DESC_NULLS_LAST',
  QuorumAsc = 'quorum_ASC',
  QuorumAscNullsFirst = 'quorum_ASC_NULLS_FIRST',
  QuorumDesc = 'quorum_DESC',
  QuorumDescNullsLast = 'quorum_DESC_NULLS_LAST',
  StartBlockAsc = 'startBlock_ASC',
  StartBlockAscNullsFirst = 'startBlock_ASC_NULLS_FIRST',
  StartBlockDesc = 'startBlock_DESC',
  StartBlockDescNullsLast = 'startBlock_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export enum OgvProposalState {
  Active = 'Active',
  Canceled = 'Canceled',
  Defeated = 'Defeated',
  Executed = 'Executed',
  Expired = 'Expired',
  Pending = 'Pending',
  Queued = 'Queued',
  Succeeded = 'Succeeded'
}

export type OgvProposalTxLog = {
  __typename?: 'OGVProposalTxLog';
  event: OgvProposalEvent;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  proposal: OgvProposal;
  timestamp: Scalars['DateTime']['output'];
};

export type OgvProposalTxLogEdge = {
  __typename?: 'OGVProposalTxLogEdge';
  cursor: Scalars['String']['output'];
  node: OgvProposalTxLog;
};

export enum OgvProposalTxLogOrderByInput {
  EventAsc = 'event_ASC',
  EventAscNullsFirst = 'event_ASC_NULLS_FIRST',
  EventDesc = 'event_DESC',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashDesc = 'hash_DESC',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OgvProposalTxLogWhereInput = {
  AND?: InputMaybe<Array<OgvProposalTxLogWhereInput>>;
  OR?: InputMaybe<Array<OgvProposalTxLogWhereInput>>;
  event_eq?: InputMaybe<OgvProposalEvent>;
  event_in?: InputMaybe<Array<OgvProposalEvent>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event_not_eq?: InputMaybe<OgvProposalEvent>;
  event_not_in?: InputMaybe<Array<OgvProposalEvent>>;
  hash_contains?: InputMaybe<Scalars['String']['input']>;
  hash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_eq?: InputMaybe<Scalars['String']['input']>;
  hash_gt?: InputMaybe<Scalars['String']['input']>;
  hash_gte?: InputMaybe<Scalars['String']['input']>;
  hash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hash_lt?: InputMaybe<Scalars['String']['input']>;
  hash_lte?: InputMaybe<Scalars['String']['input']>;
  hash_not_contains?: InputMaybe<Scalars['String']['input']>;
  hash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  hash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  hash_not_eq?: InputMaybe<Scalars['String']['input']>;
  hash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  hash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  hash_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  proposal?: InputMaybe<OgvProposalWhereInput>;
  proposal_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type OgvProposalTxLogsConnection = {
  __typename?: 'OGVProposalTxLogsConnection';
  edges: Array<OgvProposalTxLogEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OgvProposalVote = {
  __typename?: 'OGVProposalVote';
  id: Scalars['String']['output'];
  proposal: OgvProposal;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: OgvVoteType;
  voter: OgvAddress;
  weight: Scalars['BigInt']['output'];
};

export type OgvProposalVoteEdge = {
  __typename?: 'OGVProposalVoteEdge';
  cursor: Scalars['String']['output'];
  node: OgvProposalVote;
};

export enum OgvProposalVoteOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
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
  VoterBalanceAsc = 'voter_balance_ASC',
  VoterBalanceAscNullsFirst = 'voter_balance_ASC_NULLS_FIRST',
  VoterBalanceDesc = 'voter_balance_DESC',
  VoterBalanceDescNullsLast = 'voter_balance_DESC_NULLS_LAST',
  VoterIdAsc = 'voter_id_ASC',
  VoterIdAscNullsFirst = 'voter_id_ASC_NULLS_FIRST',
  VoterIdDesc = 'voter_id_DESC',
  VoterIdDescNullsLast = 'voter_id_DESC_NULLS_LAST',
  VoterLastUpdatedAsc = 'voter_lastUpdated_ASC',
  VoterLastUpdatedAscNullsFirst = 'voter_lastUpdated_ASC_NULLS_FIRST',
  VoterLastUpdatedDesc = 'voter_lastUpdated_DESC',
  VoterLastUpdatedDescNullsLast = 'voter_lastUpdated_DESC_NULLS_LAST',
  VoterStakedAsc = 'voter_staked_ASC',
  VoterStakedAscNullsFirst = 'voter_staked_ASC_NULLS_FIRST',
  VoterStakedDesc = 'voter_staked_DESC',
  VoterStakedDescNullsLast = 'voter_staked_DESC_NULLS_LAST',
  VoterVeogvBalanceAsc = 'voter_veogvBalance_ASC',
  VoterVeogvBalanceAscNullsFirst = 'voter_veogvBalance_ASC_NULLS_FIRST',
  VoterVeogvBalanceDesc = 'voter_veogvBalance_DESC',
  VoterVeogvBalanceDescNullsLast = 'voter_veogvBalance_DESC_NULLS_LAST',
  VoterVotingPowerAsc = 'voter_votingPower_ASC',
  VoterVotingPowerAscNullsFirst = 'voter_votingPower_ASC_NULLS_FIRST',
  VoterVotingPowerDesc = 'voter_votingPower_DESC',
  VoterVotingPowerDescNullsLast = 'voter_votingPower_DESC_NULLS_LAST',
  WeightAsc = 'weight_ASC',
  WeightAscNullsFirst = 'weight_ASC_NULLS_FIRST',
  WeightDesc = 'weight_DESC',
  WeightDescNullsLast = 'weight_DESC_NULLS_LAST'
}

export type OgvProposalVoteWhereInput = {
  AND?: InputMaybe<Array<OgvProposalVoteWhereInput>>;
  OR?: InputMaybe<Array<OgvProposalVoteWhereInput>>;
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
  proposal?: InputMaybe<OgvProposalWhereInput>;
  proposal_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  type_eq?: InputMaybe<OgvVoteType>;
  type_in?: InputMaybe<Array<OgvVoteType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<OgvVoteType>;
  type_not_in?: InputMaybe<Array<OgvVoteType>>;
  voter?: InputMaybe<OgvAddressWhereInput>;
  voter_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  weight_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weight_gt?: InputMaybe<Scalars['BigInt']['input']>;
  weight_gte?: InputMaybe<Scalars['BigInt']['input']>;
  weight_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  weight_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  weight_lt?: InputMaybe<Scalars['BigInt']['input']>;
  weight_lte?: InputMaybe<Scalars['BigInt']['input']>;
  weight_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OgvProposalVotesConnection = {
  __typename?: 'OGVProposalVotesConnection';
  edges: Array<OgvProposalVoteEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OgvProposalWhereInput = {
  AND?: InputMaybe<Array<OgvProposalWhereInput>>;
  OR?: InputMaybe<Array<OgvProposalWhereInput>>;
  choices_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  choices_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  choices_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  choices_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  endBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  lastUpdated_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_gte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lastUpdated_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lastUpdated_lt?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_lte?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  lastUpdated_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  logs_every?: InputMaybe<OgvProposalTxLogWhereInput>;
  logs_none?: InputMaybe<OgvProposalTxLogWhereInput>;
  logs_some?: InputMaybe<OgvProposalTxLogWhereInput>;
  proposer?: InputMaybe<OgvAddressWhereInput>;
  proposer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  quorum_eq?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorum_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  quorum_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scores_containsAll?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_containsAny?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_containsNone?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  scores_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_eq?: InputMaybe<OgvProposalState>;
  status_in?: InputMaybe<Array<OgvProposalState>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<OgvProposalState>;
  status_not_in?: InputMaybe<Array<OgvProposalState>>;
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

export type OgvProposalsConnection = {
  __typename?: 'OGVProposalsConnection';
  edges: Array<OgvProposalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OgvVoteType {
  Abstain = 'Abstain',
  Against = 'Against',
  For = 'For'
}

export type OgvWhereInput = {
  AND?: InputMaybe<Array<OgvWhereInput>>;
  OR?: InputMaybe<Array<OgvWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  circulating_eq?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_gt?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_gte?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  circulating_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  circulating_lt?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_lte?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  circulating_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  staked_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  total_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_gt?: InputMaybe<Scalars['BigInt']['input']>;
  total_gte?: InputMaybe<Scalars['BigInt']['input']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['BigInt']['input']>;
  total_lte?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OgVsConnection = {
  __typename?: 'OGVsConnection';
  edges: Array<OgvEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The OUSD entity tracks the change in total supply of OUSD over time. */
export type Ousd = {
  __typename?: 'OUSD';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

/** The APY entity tracks historical APY values by day. */
export type Ousdapy = {
  __typename?: 'OUSDAPY';
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

export type OusdapyEdge = {
  __typename?: 'OUSDAPYEdge';
  cursor: Scalars['String']['output'];
  node: Ousdapy;
};

export enum OusdapyOrderByInput {
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

export type OusdapyWhereInput = {
  AND?: InputMaybe<Array<OusdapyWhereInput>>;
  OR?: InputMaybe<Array<OusdapyWhereInput>>;
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

export type OusdaPiesConnection = {
  __typename?: 'OUSDAPiesConnection';
  edges: Array<OusdapyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdAaveStrategiesConnection = {
  __typename?: 'OUSDAaveStrategiesConnection';
  edges: Array<OusdAaveStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdAaveStrategy = {
  __typename?: 'OUSDAaveStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdAaveStrategyEdge = {
  __typename?: 'OUSDAaveStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OusdAaveStrategy;
};

export enum OusdAaveStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdAaveStrategyWhereInput = {
  AND?: InputMaybe<Array<OusdAaveStrategyWhereInput>>;
  OR?: InputMaybe<Array<OusdAaveStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdActivitiesConnection = {
  __typename?: 'OUSDActivitiesConnection';
  edges: Array<OusdActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdActivity = {
  __typename?: 'OUSDActivity';
  action?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  callDataLast4Bytes: Scalars['String']['output'];
  exchange?: Maybe<Scalars['String']['output']>;
  fromSymbol?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  interface?: Maybe<Scalars['String']['output']>;
  sighash?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  toSymbol?: Maybe<Scalars['String']['output']>;
  txHash: Scalars['String']['output'];
};

export type OusdActivityEdge = {
  __typename?: 'OUSDActivityEdge';
  cursor: Scalars['String']['output'];
  node: OusdActivity;
};

export enum OusdActivityOrderByInput {
  ActionAsc = 'action_ASC',
  ActionAscNullsFirst = 'action_ASC_NULLS_FIRST',
  ActionDesc = 'action_DESC',
  ActionDescNullsLast = 'action_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CallDataLast4BytesAsc = 'callDataLast4Bytes_ASC',
  CallDataLast4BytesAscNullsFirst = 'callDataLast4Bytes_ASC_NULLS_FIRST',
  CallDataLast4BytesDesc = 'callDataLast4Bytes_DESC',
  CallDataLast4BytesDescNullsLast = 'callDataLast4Bytes_DESC_NULLS_LAST',
  ExchangeAsc = 'exchange_ASC',
  ExchangeAscNullsFirst = 'exchange_ASC_NULLS_FIRST',
  ExchangeDesc = 'exchange_DESC',
  ExchangeDescNullsLast = 'exchange_DESC_NULLS_LAST',
  FromSymbolAsc = 'fromSymbol_ASC',
  FromSymbolAscNullsFirst = 'fromSymbol_ASC_NULLS_FIRST',
  FromSymbolDesc = 'fromSymbol_DESC',
  FromSymbolDescNullsLast = 'fromSymbol_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InterfaceAsc = 'interface_ASC',
  InterfaceAscNullsFirst = 'interface_ASC_NULLS_FIRST',
  InterfaceDesc = 'interface_DESC',
  InterfaceDescNullsLast = 'interface_DESC_NULLS_LAST',
  SighashAsc = 'sighash_ASC',
  SighashAscNullsFirst = 'sighash_ASC_NULLS_FIRST',
  SighashDesc = 'sighash_DESC',
  SighashDescNullsLast = 'sighash_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToSymbolAsc = 'toSymbol_ASC',
  ToSymbolAscNullsFirst = 'toSymbol_ASC_NULLS_FIRST',
  ToSymbolDesc = 'toSymbol_DESC',
  ToSymbolDescNullsLast = 'toSymbol_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type OusdActivityWhereInput = {
  AND?: InputMaybe<Array<OusdActivityWhereInput>>;
  OR?: InputMaybe<Array<OusdActivityWhereInput>>;
  action_contains?: InputMaybe<Scalars['String']['input']>;
  action_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  action_endsWith?: InputMaybe<Scalars['String']['input']>;
  action_eq?: InputMaybe<Scalars['String']['input']>;
  action_gt?: InputMaybe<Scalars['String']['input']>;
  action_gte?: InputMaybe<Scalars['String']['input']>;
  action_in?: InputMaybe<Array<Scalars['String']['input']>>;
  action_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  action_lt?: InputMaybe<Scalars['String']['input']>;
  action_lte?: InputMaybe<Scalars['String']['input']>;
  action_not_contains?: InputMaybe<Scalars['String']['input']>;
  action_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  action_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  action_not_eq?: InputMaybe<Scalars['String']['input']>;
  action_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  action_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  action_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  callDataLast4Bytes_contains?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_endsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_eq?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_gt?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_gte?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callDataLast4Bytes_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  callDataLast4Bytes_lt?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_lte?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_contains?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_eq?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  callDataLast4Bytes_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  callDataLast4Bytes_startsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_contains?: InputMaybe<Scalars['String']['input']>;
  exchange_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  exchange_endsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_eq?: InputMaybe<Scalars['String']['input']>;
  exchange_gt?: InputMaybe<Scalars['String']['input']>;
  exchange_gte?: InputMaybe<Scalars['String']['input']>;
  exchange_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exchange_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  exchange_lt?: InputMaybe<Scalars['String']['input']>;
  exchange_lte?: InputMaybe<Scalars['String']['input']>;
  exchange_not_contains?: InputMaybe<Scalars['String']['input']>;
  exchange_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  exchange_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_not_eq?: InputMaybe<Scalars['String']['input']>;
  exchange_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  exchange_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  exchange_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_contains?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_eq?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_gt?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_gte?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromSymbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromSymbol_lt?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_lte?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromSymbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromSymbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  interface_contains?: InputMaybe<Scalars['String']['input']>;
  interface_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  interface_endsWith?: InputMaybe<Scalars['String']['input']>;
  interface_eq?: InputMaybe<Scalars['String']['input']>;
  interface_gt?: InputMaybe<Scalars['String']['input']>;
  interface_gte?: InputMaybe<Scalars['String']['input']>;
  interface_in?: InputMaybe<Array<Scalars['String']['input']>>;
  interface_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  interface_lt?: InputMaybe<Scalars['String']['input']>;
  interface_lte?: InputMaybe<Scalars['String']['input']>;
  interface_not_contains?: InputMaybe<Scalars['String']['input']>;
  interface_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  interface_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  interface_not_eq?: InputMaybe<Scalars['String']['input']>;
  interface_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  interface_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  interface_startsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_contains?: InputMaybe<Scalars['String']['input']>;
  sighash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sighash_endsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_eq?: InputMaybe<Scalars['String']['input']>;
  sighash_gt?: InputMaybe<Scalars['String']['input']>;
  sighash_gte?: InputMaybe<Scalars['String']['input']>;
  sighash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sighash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sighash_lt?: InputMaybe<Scalars['String']['input']>;
  sighash_lte?: InputMaybe<Scalars['String']['input']>;
  sighash_not_contains?: InputMaybe<Scalars['String']['input']>;
  sighash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sighash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_not_eq?: InputMaybe<Scalars['String']['input']>;
  sighash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sighash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sighash_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  toSymbol_contains?: InputMaybe<Scalars['String']['input']>;
  toSymbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toSymbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_eq?: InputMaybe<Scalars['String']['input']>;
  toSymbol_gt?: InputMaybe<Scalars['String']['input']>;
  toSymbol_gte?: InputMaybe<Scalars['String']['input']>;
  toSymbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toSymbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toSymbol_lt?: InputMaybe<Scalars['String']['input']>;
  toSymbol_lte?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  toSymbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toSymbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  toSymbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

/** The OUSD balance, history and other information for a given address. */
export type OusdAddress = {
  __typename?: 'OUSDAddress';
  balance: Scalars['BigInt']['output'];
  credits: Scalars['BigInt']['output'];
  earned: Scalars['BigInt']['output'];
  history: Array<OusdHistory>;
  id: Scalars['String']['output'];
  isContract: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  rebasingOption: RebasingOption;
};


/** The OUSD balance, history and other information for a given address. */
export type OusdAddressHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdHistoryOrderByInput>>;
  where?: InputMaybe<OusdHistoryWhereInput>;
};

export type OusdAddressEdge = {
  __typename?: 'OUSDAddressEdge';
  cursor: Scalars['String']['output'];
  node: OusdAddress;
};

export enum OusdAddressOrderByInput {
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

export type OusdAddressWhereInput = {
  AND?: InputMaybe<Array<OusdAddressWhereInput>>;
  OR?: InputMaybe<Array<OusdAddressWhereInput>>;
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
  history_every?: InputMaybe<OusdHistoryWhereInput>;
  history_none?: InputMaybe<OusdHistoryWhereInput>;
  history_some?: InputMaybe<OusdHistoryWhereInput>;
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

export type OusdAddressesConnection = {
  __typename?: 'OUSDAddressesConnection';
  edges: Array<OusdAddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdAsset = {
  __typename?: 'OUSDAsset';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type OusdAssetEdge = {
  __typename?: 'OUSDAssetEdge';
  cursor: Scalars['String']['output'];
  node: OusdAsset;
};

export enum OusdAssetOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressDesc = 'address_DESC',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type OusdAssetWhereInput = {
  AND?: InputMaybe<Array<OusdAssetWhereInput>>;
  OR?: InputMaybe<Array<OusdAssetWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type OusdAssetsConnection = {
  __typename?: 'OUSDAssetsConnection';
  edges: Array<OusdAssetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdCollateralDailyStat = {
  __typename?: 'OUSDCollateralDailyStat';
  amount: Scalars['BigInt']['output'];
  dailyStatId: OusdDailyStat;
  id: Scalars['String']['output'];
  price: Scalars['BigInt']['output'];
  symbol: Scalars['String']['output'];
  value: Scalars['BigInt']['output'];
};

export type OusdCollateralDailyStatEdge = {
  __typename?: 'OUSDCollateralDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OusdCollateralDailyStat;
};

export enum OusdCollateralDailyStatOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceDesc = 'price_DESC',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type OusdCollateralDailyStatWhereInput = {
  AND?: InputMaybe<Array<OusdCollateralDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OusdCollateralDailyStatWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dailyStatId?: InputMaybe<OusdDailyStatWhereInput>;
  dailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  price_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OusdCollateralDailyStatsConnection = {
  __typename?: 'OUSDCollateralDailyStatsConnection';
  edges: Array<OusdCollateralDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdCompoundStrategiesConnection = {
  __typename?: 'OUSDCompoundStrategiesConnection';
  edges: Array<OusdCompoundStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdCompoundStrategy = {
  __typename?: 'OUSDCompoundStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdCompoundStrategyEdge = {
  __typename?: 'OUSDCompoundStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OusdCompoundStrategy;
};

export enum OusdCompoundStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdCompoundStrategyWhereInput = {
  AND?: InputMaybe<Array<OusdCompoundStrategyWhereInput>>;
  OR?: InputMaybe<Array<OusdCompoundStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdConvexLusdPlus3Crv = {
  __typename?: 'OUSDConvexLUSDPlus3Crv';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdConvexLusdPlus3CrvEdge = {
  __typename?: 'OUSDConvexLUSDPlus3CrvEdge';
  cursor: Scalars['String']['output'];
  node: OusdConvexLusdPlus3Crv;
};

export enum OusdConvexLusdPlus3CrvOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdConvexLusdPlus3CrvWhereInput = {
  AND?: InputMaybe<Array<OusdConvexLusdPlus3CrvWhereInput>>;
  OR?: InputMaybe<Array<OusdConvexLusdPlus3CrvWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdConvexLusdPlus3CrvsConnection = {
  __typename?: 'OUSDConvexLUSDPlus3CrvsConnection';
  edges: Array<OusdConvexLusdPlus3CrvEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdConvexStrategiesConnection = {
  __typename?: 'OUSDConvexStrategiesConnection';
  edges: Array<OusdConvexStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdConvexStrategy = {
  __typename?: 'OUSDConvexStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdConvexStrategyEdge = {
  __typename?: 'OUSDConvexStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OusdConvexStrategy;
};

export enum OusdConvexStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdConvexStrategyWhereInput = {
  AND?: InputMaybe<Array<OusdConvexStrategyWhereInput>>;
  OR?: InputMaybe<Array<OusdConvexStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdDailyStat = {
  __typename?: 'OUSDDailyStat';
  amoSupply: Scalars['BigInt']['output'];
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  apy7DayAvg: Scalars['Float']['output'];
  apy14DayAvg: Scalars['Float']['output'];
  apy30DayAvg: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  collateral: Array<OusdCollateralDailyStat>;
  dripperWETH: Scalars['BigInt']['output'];
  feesETH: Scalars['BigInt']['output'];
  feesETH7Day: Scalars['BigInt']['output'];
  feesETHAllTime: Scalars['BigInt']['output'];
  feesUSD: Scalars['BigInt']['output'];
  feesUSD7Day: Scalars['BigInt']['output'];
  feesUSDAllTime: Scalars['BigInt']['output'];
  holdersOverThreshold: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  marketCapUSD: Scalars['Float']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  pegPrice: Scalars['BigInt']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  strategies: Array<OusdStrategyDailyStat>;
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyUSD: Scalars['Float']['output'];
  tradingVolumeUSD: Scalars['Float']['output'];
  wrappedSupply: Scalars['BigInt']['output'];
  yieldETH: Scalars['BigInt']['output'];
  yieldETH7Day: Scalars['BigInt']['output'];
  yieldETHAllTime: Scalars['BigInt']['output'];
  yieldUSD: Scalars['BigInt']['output'];
  yieldUSD7Day: Scalars['BigInt']['output'];
  yieldUSDAllTime: Scalars['BigInt']['output'];
};


export type OusdDailyStatCollateralArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdCollateralDailyStatOrderByInput>>;
  where?: InputMaybe<OusdCollateralDailyStatWhereInput>;
};


export type OusdDailyStatStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdStrategyDailyStatOrderByInput>>;
  where?: InputMaybe<OusdStrategyDailyStatWhereInput>;
};

export type OusdDailyStatEdge = {
  __typename?: 'OUSDDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OusdDailyStat;
};

export enum OusdDailyStatOrderByInput {
  AmoSupplyAsc = 'amoSupply_ASC',
  AmoSupplyAscNullsFirst = 'amoSupply_ASC_NULLS_FIRST',
  AmoSupplyDesc = 'amoSupply_DESC',
  AmoSupplyDescNullsLast = 'amoSupply_DESC_NULLS_LAST',
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
  DripperWethAsc = 'dripperWETH_ASC',
  DripperWethAscNullsFirst = 'dripperWETH_ASC_NULLS_FIRST',
  DripperWethDesc = 'dripperWETH_DESC',
  DripperWethDescNullsLast = 'dripperWETH_DESC_NULLS_LAST',
  FeesEth7DayAsc = 'feesETH7Day_ASC',
  FeesEth7DayAscNullsFirst = 'feesETH7Day_ASC_NULLS_FIRST',
  FeesEth7DayDesc = 'feesETH7Day_DESC',
  FeesEth7DayDescNullsLast = 'feesETH7Day_DESC_NULLS_LAST',
  FeesEthAllTimeAsc = 'feesETHAllTime_ASC',
  FeesEthAllTimeAscNullsFirst = 'feesETHAllTime_ASC_NULLS_FIRST',
  FeesEthAllTimeDesc = 'feesETHAllTime_DESC',
  FeesEthAllTimeDescNullsLast = 'feesETHAllTime_DESC_NULLS_LAST',
  FeesEthAsc = 'feesETH_ASC',
  FeesEthAscNullsFirst = 'feesETH_ASC_NULLS_FIRST',
  FeesEthDesc = 'feesETH_DESC',
  FeesEthDescNullsLast = 'feesETH_DESC_NULLS_LAST',
  FeesUsd7DayAsc = 'feesUSD7Day_ASC',
  FeesUsd7DayAscNullsFirst = 'feesUSD7Day_ASC_NULLS_FIRST',
  FeesUsd7DayDesc = 'feesUSD7Day_DESC',
  FeesUsd7DayDescNullsLast = 'feesUSD7Day_DESC_NULLS_LAST',
  FeesUsdAllTimeAsc = 'feesUSDAllTime_ASC',
  FeesUsdAllTimeAscNullsFirst = 'feesUSDAllTime_ASC_NULLS_FIRST',
  FeesUsdAllTimeDesc = 'feesUSDAllTime_DESC',
  FeesUsdAllTimeDescNullsLast = 'feesUSDAllTime_DESC_NULLS_LAST',
  FeesUsdAsc = 'feesUSD_ASC',
  FeesUsdAscNullsFirst = 'feesUSD_ASC_NULLS_FIRST',
  FeesUsdDesc = 'feesUSD_DESC',
  FeesUsdDescNullsLast = 'feesUSD_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  PegPriceAsc = 'pegPrice_ASC',
  PegPriceAscNullsFirst = 'pegPrice_ASC_NULLS_FIRST',
  PegPriceDesc = 'pegPrice_DESC',
  PegPriceDescNullsLast = 'pegPrice_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsLast = 'tradingVolumeUSD_DESC_NULLS_LAST',
  WrappedSupplyAsc = 'wrappedSupply_ASC',
  WrappedSupplyAscNullsFirst = 'wrappedSupply_ASC_NULLS_FIRST',
  WrappedSupplyDesc = 'wrappedSupply_DESC',
  WrappedSupplyDescNullsLast = 'wrappedSupply_DESC_NULLS_LAST',
  YieldEth7DayAsc = 'yieldETH7Day_ASC',
  YieldEth7DayAscNullsFirst = 'yieldETH7Day_ASC_NULLS_FIRST',
  YieldEth7DayDesc = 'yieldETH7Day_DESC',
  YieldEth7DayDescNullsLast = 'yieldETH7Day_DESC_NULLS_LAST',
  YieldEthAllTimeAsc = 'yieldETHAllTime_ASC',
  YieldEthAllTimeAscNullsFirst = 'yieldETHAllTime_ASC_NULLS_FIRST',
  YieldEthAllTimeDesc = 'yieldETHAllTime_DESC',
  YieldEthAllTimeDescNullsLast = 'yieldETHAllTime_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsd7DayAsc = 'yieldUSD7Day_ASC',
  YieldUsd7DayAscNullsFirst = 'yieldUSD7Day_ASC_NULLS_FIRST',
  YieldUsd7DayDesc = 'yieldUSD7Day_DESC',
  YieldUsd7DayDescNullsLast = 'yieldUSD7Day_DESC_NULLS_LAST',
  YieldUsdAllTimeAsc = 'yieldUSDAllTime_ASC',
  YieldUsdAllTimeAscNullsFirst = 'yieldUSDAllTime_ASC_NULLS_FIRST',
  YieldUsdAllTimeDesc = 'yieldUSDAllTime_DESC',
  YieldUsdAllTimeDescNullsLast = 'yieldUSDAllTime_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsLast = 'yieldUSD_DESC_NULLS_LAST'
}

export type OusdDailyStatWhereInput = {
  AND?: InputMaybe<Array<OusdDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OusdDailyStatWhereInput>>;
  amoSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amoSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amoSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amoSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  collateral_every?: InputMaybe<OusdCollateralDailyStatWhereInput>;
  collateral_none?: InputMaybe<OusdCollateralDailyStatWhereInput>;
  collateral_some?: InputMaybe<OusdCollateralDailyStatWhereInput>;
  dripperWETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dripperWETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dripperWETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dripperWETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETH7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETHAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETHAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETHAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETHAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSD7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSDAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSDAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSDAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSDAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feesUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feesUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feesUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  holdersOverThreshold_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_gte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  holdersOverThreshold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holdersOverThreshold_lt?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_lte?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_eq?: InputMaybe<Scalars['Int']['input']>;
  holdersOverThreshold_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  marketCapUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  marketCapUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  marketCapUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  marketCapUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  nonRebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonRebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonRebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pegPrice_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  pegPrice_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pegPrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  pegPrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  strategies_every?: InputMaybe<OusdStrategyDailyStatWhereInput>;
  strategies_none?: InputMaybe<OusdStrategyDailyStatWhereInput>;
  strategies_some?: InputMaybe<OusdStrategyDailyStatWhereInput>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalSupplyUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupplyUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupplyUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  totalSupplyUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  totalSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tradingVolumeUSD_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_gte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  tradingVolumeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tradingVolumeUSD_lt?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_lte?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_eq?: InputMaybe<Scalars['Float']['input']>;
  tradingVolumeUSD_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  wrappedSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  wrappedSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  wrappedSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  wrappedSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETHAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETHAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETHAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETHAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD7Day_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD7Day_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD7Day_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD7Day_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSDAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSDAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSDAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSDAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdDailyStatsConnection = {
  __typename?: 'OUSDDailyStatsConnection';
  edges: Array<OusdDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdEdge = {
  __typename?: 'OUSDEdge';
  cursor: Scalars['String']['output'];
  node: Ousd;
};

export type OusdFluxStrategiesConnection = {
  __typename?: 'OUSDFluxStrategiesConnection';
  edges: Array<OusdFluxStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdFluxStrategy = {
  __typename?: 'OUSDFluxStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdFluxStrategyEdge = {
  __typename?: 'OUSDFluxStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OusdFluxStrategy;
};

export enum OusdFluxStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdFluxStrategyWhereInput = {
  AND?: InputMaybe<Array<OusdFluxStrategyWhereInput>>;
  OR?: InputMaybe<Array<OusdFluxStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdHistoriesConnection = {
  __typename?: 'OUSDHistoriesConnection';
  edges: Array<OusdHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The History entity tracks events that change the balance of OUSD for an address. */
export type OusdHistory = {
  __typename?: 'OUSDHistory';
  address: OusdAddress;
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: HistoryType;
  value: Scalars['BigInt']['output'];
};

export type OusdHistoryEdge = {
  __typename?: 'OUSDHistoryEdge';
  cursor: Scalars['String']['output'];
  node: OusdHistory;
};

export enum OusdHistoryOrderByInput {
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

export type OusdHistoryWhereInput = {
  AND?: InputMaybe<Array<OusdHistoryWhereInput>>;
  OR?: InputMaybe<Array<OusdHistoryWhereInput>>;
  address?: InputMaybe<OusdAddressWhereInput>;
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

export type OusdMetaStrategiesConnection = {
  __typename?: 'OUSDMetaStrategiesConnection';
  edges: Array<OusdMetaStrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdMetaStrategy = {
  __typename?: 'OUSDMetaStrategy';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdMetaStrategyEdge = {
  __typename?: 'OUSDMetaStrategyEdge';
  cursor: Scalars['String']['output'];
  node: OusdMetaStrategy;
};

export enum OusdMetaStrategyOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdMetaStrategyWhereInput = {
  AND?: InputMaybe<Array<OusdMetaStrategyWhereInput>>;
  OR?: InputMaybe<Array<OusdMetaStrategyWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdMorphoAave = {
  __typename?: 'OUSDMorphoAave';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdMorphoAaveEdge = {
  __typename?: 'OUSDMorphoAaveEdge';
  cursor: Scalars['String']['output'];
  node: OusdMorphoAave;
};

export enum OusdMorphoAaveOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdMorphoAaveWhereInput = {
  AND?: InputMaybe<Array<OusdMorphoAaveWhereInput>>;
  OR?: InputMaybe<Array<OusdMorphoAaveWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdMorphoAavesConnection = {
  __typename?: 'OUSDMorphoAavesConnection';
  edges: Array<OusdMorphoAaveEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdMorphoCompound = {
  __typename?: 'OUSDMorphoCompound';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdMorphoCompoundEdge = {
  __typename?: 'OUSDMorphoCompoundEdge';
  cursor: Scalars['String']['output'];
  node: OusdMorphoCompound;
};

export enum OusdMorphoCompoundOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdMorphoCompoundWhereInput = {
  AND?: InputMaybe<Array<OusdMorphoCompoundWhereInput>>;
  OR?: InputMaybe<Array<OusdMorphoCompoundWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdMorphoCompoundsConnection = {
  __typename?: 'OUSDMorphoCompoundsConnection';
  edges: Array<OusdMorphoCompoundEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OusdOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

/** The Rebase entity tracks historical rebase events on the OUSD contract. */
export type OusdRebase = {
  __typename?: 'OUSDRebase';
  apy: Ousdapy;
  blockNumber: Scalars['Int']['output'];
  feeETH: Scalars['BigInt']['output'];
  feeUSD: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  yieldETH: Scalars['BigInt']['output'];
  yieldUSD: Scalars['BigInt']['output'];
};

export type OusdRebaseEdge = {
  __typename?: 'OUSDRebaseEdge';
  cursor: Scalars['String']['output'];
  node: OusdRebase;
};

/** The RebaseOption entity tracks historical rebase option changes by address. */
export type OusdRebaseOption = {
  __typename?: 'OUSDRebaseOption';
  address: OusdAddress;
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  status: RebasingOption;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type OusdRebaseOptionEdge = {
  __typename?: 'OUSDRebaseOptionEdge';
  cursor: Scalars['String']['output'];
  node: OusdRebaseOption;
};

export enum OusdRebaseOptionOrderByInput {
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

export type OusdRebaseOptionWhereInput = {
  AND?: InputMaybe<Array<OusdRebaseOptionWhereInput>>;
  OR?: InputMaybe<Array<OusdRebaseOptionWhereInput>>;
  address?: InputMaybe<OusdAddressWhereInput>;
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

export type OusdRebaseOptionsConnection = {
  __typename?: 'OUSDRebaseOptionsConnection';
  edges: Array<OusdRebaseOptionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OusdRebaseOrderByInput {
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
  FeeEthAsc = 'feeETH_ASC',
  FeeEthAscNullsFirst = 'feeETH_ASC_NULLS_FIRST',
  FeeEthDesc = 'feeETH_DESC',
  FeeEthDescNullsLast = 'feeETH_DESC_NULLS_LAST',
  FeeUsdAsc = 'feeUSD_ASC',
  FeeUsdAscNullsFirst = 'feeUSD_ASC_NULLS_FIRST',
  FeeUsdDesc = 'feeUSD_DESC',
  FeeUsdDescNullsLast = 'feeUSD_DESC_NULLS_LAST',
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
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsLast = 'yieldUSD_DESC_NULLS_LAST'
}

export type OusdRebaseWhereInput = {
  AND?: InputMaybe<Array<OusdRebaseWhereInput>>;
  OR?: InputMaybe<Array<OusdRebaseWhereInput>>;
  apy?: InputMaybe<OusdapyWhereInput>;
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
  feeETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  feeUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  feeUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  feeUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  yieldETH_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldETH_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldETH_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldETH_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yieldUSD_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yieldUSD_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yieldUSD_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdRebasesConnection = {
  __typename?: 'OUSDRebasesConnection';
  edges: Array<OusdRebaseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdStrategyDailyStat = {
  __typename?: 'OUSDStrategyDailyStat';
  dailyStatId: OusdDailyStat;
  holdings: Array<OusdStrategyHoldingDailyStat>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  total: Scalars['BigInt']['output'];
  tvl: Scalars['BigInt']['output'];
};


export type OusdStrategyDailyStatHoldingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdStrategyHoldingDailyStatOrderByInput>>;
  where?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
};

export type OusdStrategyDailyStatEdge = {
  __typename?: 'OUSDStrategyDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OusdStrategyDailyStat;
};

export enum OusdStrategyDailyStatOrderByInput {
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameDesc = 'name_DESC',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TvlAsc = 'tvl_ASC',
  TvlAscNullsFirst = 'tvl_ASC_NULLS_FIRST',
  TvlDesc = 'tvl_DESC',
  TvlDescNullsLast = 'tvl_DESC_NULLS_LAST'
}

export type OusdStrategyDailyStatWhereInput = {
  AND?: InputMaybe<Array<OusdStrategyDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OusdStrategyDailyStatWhereInput>>;
  dailyStatId?: InputMaybe<OusdDailyStatWhereInput>;
  dailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  holdings_every?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
  holdings_none?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
  holdings_some?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
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
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  total_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_gt?: InputMaybe<Scalars['BigInt']['input']>;
  total_gte?: InputMaybe<Scalars['BigInt']['input']>;
  total_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  total_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  total_lt?: InputMaybe<Scalars['BigInt']['input']>;
  total_lte?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  total_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvl_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tvl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tvl_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  tvl_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdStrategyDailyStatsConnection = {
  __typename?: 'OUSDStrategyDailyStatsConnection';
  edges: Array<OusdStrategyDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdStrategyHoldingDailyStat = {
  __typename?: 'OUSDStrategyHoldingDailyStat';
  amount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  strategyDailyStatId: OusdStrategyDailyStat;
  symbol: Scalars['String']['output'];
  value: Scalars['BigInt']['output'];
};

export type OusdStrategyHoldingDailyStatEdge = {
  __typename?: 'OUSDStrategyHoldingDailyStatEdge';
  cursor: Scalars['String']['output'];
  node: OusdStrategyHoldingDailyStat;
};

export enum OusdStrategyHoldingDailyStatOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyDailyStatIdIdAsc = 'strategyDailyStatId_id_ASC',
  StrategyDailyStatIdIdAscNullsFirst = 'strategyDailyStatId_id_ASC_NULLS_FIRST',
  StrategyDailyStatIdIdDesc = 'strategyDailyStatId_id_DESC',
  StrategyDailyStatIdIdDescNullsLast = 'strategyDailyStatId_id_DESC_NULLS_LAST',
  StrategyDailyStatIdNameAsc = 'strategyDailyStatId_name_ASC',
  StrategyDailyStatIdNameAscNullsFirst = 'strategyDailyStatId_name_ASC_NULLS_FIRST',
  StrategyDailyStatIdNameDesc = 'strategyDailyStatId_name_DESC',
  StrategyDailyStatIdNameDescNullsLast = 'strategyDailyStatId_name_DESC_NULLS_LAST',
  StrategyDailyStatIdTotalAsc = 'strategyDailyStatId_total_ASC',
  StrategyDailyStatIdTotalAscNullsFirst = 'strategyDailyStatId_total_ASC_NULLS_FIRST',
  StrategyDailyStatIdTotalDesc = 'strategyDailyStatId_total_DESC',
  StrategyDailyStatIdTotalDescNullsLast = 'strategyDailyStatId_total_DESC_NULLS_LAST',
  StrategyDailyStatIdTvlAsc = 'strategyDailyStatId_tvl_ASC',
  StrategyDailyStatIdTvlAscNullsFirst = 'strategyDailyStatId_tvl_ASC_NULLS_FIRST',
  StrategyDailyStatIdTvlDesc = 'strategyDailyStatId_tvl_DESC',
  StrategyDailyStatIdTvlDescNullsLast = 'strategyDailyStatId_tvl_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueDesc = 'value_DESC',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type OusdStrategyHoldingDailyStatWhereInput = {
  AND?: InputMaybe<Array<OusdStrategyHoldingDailyStatWhereInput>>;
  OR?: InputMaybe<Array<OusdStrategyHoldingDailyStatWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  strategyDailyStatId?: InputMaybe<OusdStrategyDailyStatWhereInput>;
  strategyDailyStatId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OusdStrategyHoldingDailyStatsConnection = {
  __typename?: 'OUSDStrategyHoldingDailyStatsConnection';
  edges: Array<OusdStrategyHoldingDailyStatEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

/** The Vault entity tracks the OUSD vault balance over time. */
export type OusdVault = {
  __typename?: 'OUSDVault';
  blockNumber: Scalars['Int']['output'];
  dai: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  usdc: Scalars['BigInt']['output'];
  usdt: Scalars['BigInt']['output'];
};

export type OusdVaultEdge = {
  __typename?: 'OUSDVaultEdge';
  cursor: Scalars['String']['output'];
  node: OusdVault;
};

export enum OusdVaultOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsLast = 'usdt_DESC_NULLS_LAST'
}

export type OusdVaultWhereInput = {
  AND?: InputMaybe<Array<OusdVaultWhereInput>>;
  OR?: InputMaybe<Array<OusdVaultWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dai_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_gte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dai_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dai_lt?: InputMaybe<Scalars['BigInt']['input']>;
  dai_lte?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  dai_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  usdc_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdc_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdc_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdc_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  usdt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  usdt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  usdt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdVaultsConnection = {
  __typename?: 'OUSDVaultsConnection';
  edges: Array<OusdVaultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OusdWhereInput = {
  AND?: InputMaybe<Array<OusdWhereInput>>;
  OR?: InputMaybe<Array<OusdWhereInput>>;
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
  nonRebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonRebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonRebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonRebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rebasingSupply_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingSupply_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rebasingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type OusDsConnection = {
  __typename?: 'OUSDsConnection';
  edges: Array<OusdEdge>;
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

export type ProcessingStatus = {
  __typename?: 'ProcessingStatus';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type ProcessingStatusEdge = {
  __typename?: 'ProcessingStatusEdge';
  cursor: Scalars['String']['output'];
  node: ProcessingStatus;
};

export enum ProcessingStatusOrderByInput {
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type ProcessingStatusWhereInput = {
  AND?: InputMaybe<Array<ProcessingStatusWhereInput>>;
  OR?: InputMaybe<Array<ProcessingStatusWhereInput>>;
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
};

export type ProcessingStatusesConnection = {
  __typename?: 'ProcessingStatusesConnection';
  edges: Array<ProcessingStatusEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  balancerPoolBalanceById?: Maybe<BalancerPoolBalance>;
  /** @deprecated Use balancerPoolBalanceById */
  balancerPoolBalanceByUniqueInput?: Maybe<BalancerPoolBalance>;
  balancerPoolBalances: Array<BalancerPoolBalance>;
  balancerPoolBalancesConnection: BalancerPoolBalancesConnection;
  balancerPoolById?: Maybe<BalancerPool>;
  /** @deprecated Use balancerPoolById */
  balancerPoolByUniqueInput?: Maybe<BalancerPool>;
  balancerPoolRateById?: Maybe<BalancerPoolRate>;
  /** @deprecated Use balancerPoolRateById */
  balancerPoolRateByUniqueInput?: Maybe<BalancerPoolRate>;
  balancerPoolRates: Array<BalancerPoolRate>;
  balancerPoolRatesConnection: BalancerPoolRatesConnection;
  balancerPools: Array<BalancerPool>;
  balancerPoolsConnection: BalancerPoolsConnection;
  bridgeTransferById?: Maybe<BridgeTransfer>;
  /** @deprecated Use bridgeTransferById */
  bridgeTransferByUniqueInput?: Maybe<BridgeTransfer>;
  bridgeTransferStateById?: Maybe<BridgeTransferState>;
  /** @deprecated Use bridgeTransferStateById */
  bridgeTransferStateByUniqueInput?: Maybe<BridgeTransferState>;
  bridgeTransferStates: Array<BridgeTransferState>;
  bridgeTransferStatesConnection: BridgeTransferStatesConnection;
  bridgeTransfers: Array<BridgeTransfer>;
  bridgeTransfersConnection: BridgeTransfersConnection;
  curvePoolBalanceById?: Maybe<CurvePoolBalance>;
  /** @deprecated Use curvePoolBalanceById */
  curvePoolBalanceByUniqueInput?: Maybe<CurvePoolBalance>;
  curvePoolBalances: Array<CurvePoolBalance>;
  curvePoolBalancesConnection: CurvePoolBalancesConnection;
  curvePoolById?: Maybe<CurvePool>;
  /** @deprecated Use curvePoolById */
  curvePoolByUniqueInput?: Maybe<CurvePool>;
  curvePoolRateById?: Maybe<CurvePoolRate>;
  /** @deprecated Use curvePoolRateById */
  curvePoolRateByUniqueInput?: Maybe<CurvePoolRate>;
  curvePoolRates: Array<CurvePoolRate>;
  curvePoolRatesConnection: CurvePoolRatesConnection;
  curvePools: Array<CurvePool>;
  curvePoolsConnection: CurvePoolsConnection;
  erc20BalanceById?: Maybe<Erc20Balance>;
  /** @deprecated Use erc20BalanceById */
  erc20BalanceByUniqueInput?: Maybe<Erc20Balance>;
  erc20Balances: Array<Erc20Balance>;
  erc20BalancesConnection: Erc20BalancesConnection;
  erc20ById?: Maybe<Erc20>;
  /** @deprecated Use erc20ById */
  erc20ByUniqueInput?: Maybe<Erc20>;
  erc20HolderById?: Maybe<Erc20Holder>;
  /** @deprecated Use erc20HolderById */
  erc20HolderByUniqueInput?: Maybe<Erc20Holder>;
  erc20Holders: Array<Erc20Holder>;
  erc20HoldersConnection: Erc20HoldersConnection;
  erc20StateById?: Maybe<Erc20State>;
  /** @deprecated Use erc20StateById */
  erc20StateByUniqueInput?: Maybe<Erc20State>;
  erc20States: Array<Erc20State>;
  erc20StatesConnection: Erc20StatesConnection;
  erc20s: Array<Erc20>;
  erc20sConnection: Erc20sConnection;
  exchangeRateById?: Maybe<ExchangeRate>;
  /** @deprecated Use exchangeRateById */
  exchangeRateByUniqueInput?: Maybe<ExchangeRate>;
  exchangeRates: Array<ExchangeRate>;
  exchangeRatesConnection: ExchangeRatesConnection;
  liquidityDailyBalanceById?: Maybe<LiquidityDailyBalance>;
  /** @deprecated Use liquidityDailyBalanceById */
  liquidityDailyBalanceByUniqueInput?: Maybe<LiquidityDailyBalance>;
  liquidityDailyBalances: Array<LiquidityDailyBalance>;
  liquidityDailyBalancesConnection: LiquidityDailyBalancesConnection;
  liquiditySourceById?: Maybe<LiquiditySource>;
  /** @deprecated Use liquiditySourceById */
  liquiditySourceByUniqueInput?: Maybe<LiquiditySource>;
  liquiditySources: Array<LiquiditySource>;
  liquiditySourcesConnection: LiquiditySourcesConnection;
  makerDsrStrategies: Array<MakerDsrStrategy>;
  makerDsrStrategiesConnection: MakerDsrStrategiesConnection;
  makerDsrStrategyById?: Maybe<MakerDsrStrategy>;
  /** @deprecated Use makerDsrStrategyById */
  makerDsrStrategyByUniqueInput?: Maybe<MakerDsrStrategy>;
  maverickPoolBalanceById?: Maybe<MaverickPoolBalance>;
  /** @deprecated Use maverickPoolBalanceById */
  maverickPoolBalanceByUniqueInput?: Maybe<MaverickPoolBalance>;
  maverickPoolBalances: Array<MaverickPoolBalance>;
  maverickPoolBalancesConnection: MaverickPoolBalancesConnection;
  maverickPoolById?: Maybe<MaverickPool>;
  /** @deprecated Use maverickPoolById */
  maverickPoolByUniqueInput?: Maybe<MaverickPool>;
  maverickPools: Array<MaverickPool>;
  maverickPoolsConnection: MaverickPoolsConnection;
  nativeBalanceById?: Maybe<NativeBalance>;
  /** @deprecated Use nativeBalanceById */
  nativeBalanceByUniqueInput?: Maybe<NativeBalance>;
  nativeBalances: Array<NativeBalance>;
  nativeBalancesConnection: NativeBalancesConnection;
  oethActivities: Array<OethActivity>;
  oethActivitiesConnection: OethActivitiesConnection;
  oethActivityById?: Maybe<OethActivity>;
  /** @deprecated Use oethActivityById */
  oethActivityByUniqueInput?: Maybe<OethActivity>;
  oethAddressById?: Maybe<OethAddress>;
  /** @deprecated Use oethAddressById */
  oethAddressByUniqueInput?: Maybe<OethAddress>;
  oethAddresses: Array<OethAddress>;
  oethAddressesConnection: OethAddressesConnection;
  oethAssetById?: Maybe<OethAsset>;
  /** @deprecated Use oethAssetById */
  oethAssetByUniqueInput?: Maybe<OethAsset>;
  oethAssets: Array<OethAsset>;
  oethAssetsConnection: OethAssetsConnection;
  oethBalancerMetaPoolStrategies: Array<OethBalancerMetaPoolStrategy>;
  oethBalancerMetaPoolStrategiesConnection: OethBalancerMetaPoolStrategiesConnection;
  oethBalancerMetaPoolStrategyById?: Maybe<OethBalancerMetaPoolStrategy>;
  /** @deprecated Use oethBalancerMetaPoolStrategyById */
  oethBalancerMetaPoolStrategyByUniqueInput?: Maybe<OethBalancerMetaPoolStrategy>;
  oethById?: Maybe<Oeth>;
  /** @deprecated Use oethById */
  oethByUniqueInput?: Maybe<Oeth>;
  oethCollateralDailyStatById?: Maybe<OethCollateralDailyStat>;
  /** @deprecated Use oethCollateralDailyStatById */
  oethCollateralDailyStatByUniqueInput?: Maybe<OethCollateralDailyStat>;
  oethCollateralDailyStats: Array<OethCollateralDailyStat>;
  oethCollateralDailyStatsConnection: OethCollateralDailyStatsConnection;
  oethCurveLpById?: Maybe<OethCurveLp>;
  /** @deprecated Use oethCurveLpById */
  oethCurveLpByUniqueInput?: Maybe<OethCurveLp>;
  oethCurveLps: Array<OethCurveLp>;
  oethCurveLpsConnection: OethCurveLPsConnection;
  oethDailyStatById?: Maybe<OethDailyStat>;
  /** @deprecated Use oethDailyStatById */
  oethDailyStatByUniqueInput?: Maybe<OethDailyStat>;
  oethDailyStats: Array<OethDailyStat>;
  oethDailyStatsConnection: OethDailyStatsConnection;
  oethDripperById?: Maybe<OethDripper>;
  /** @deprecated Use oethDripperById */
  oethDripperByUniqueInput?: Maybe<OethDripper>;
  oethDrippers: Array<OethDripper>;
  oethDrippersConnection: OethDrippersConnection;
  oethFraxStakingById?: Maybe<OethFraxStaking>;
  /** @deprecated Use oethFraxStakingById */
  oethFraxStakingByUniqueInput?: Maybe<OethFraxStaking>;
  oethFraxStakings: Array<OethFraxStaking>;
  oethFraxStakingsConnection: OethFraxStakingsConnection;
  oethHistories: Array<OethHistory>;
  oethHistoriesConnection: OethHistoriesConnection;
  oethHistoryById?: Maybe<OethHistory>;
  /** @deprecated Use oethHistoryById */
  oethHistoryByUniqueInput?: Maybe<OethHistory>;
  oethMorphoAaveById?: Maybe<OethMorphoAave>;
  /** @deprecated Use oethMorphoAaveById */
  oethMorphoAaveByUniqueInput?: Maybe<OethMorphoAave>;
  oethMorphoAaves: Array<OethMorphoAave>;
  oethMorphoAavesConnection: OethMorphoAavesConnection;
  oethRebaseById?: Maybe<OethRebase>;
  /** @deprecated Use oethRebaseById */
  oethRebaseByUniqueInput?: Maybe<OethRebase>;
  oethRebaseOptionById?: Maybe<OethRebaseOption>;
  /** @deprecated Use oethRebaseOptionById */
  oethRebaseOptionByUniqueInput?: Maybe<OethRebaseOption>;
  oethRebaseOptions: Array<OethRebaseOption>;
  oethRebaseOptionsConnection: OethRebaseOptionsConnection;
  oethRebases: Array<OethRebase>;
  oethRebasesConnection: OethRebasesConnection;
  oethRewardTokenCollectedById?: Maybe<OethRewardTokenCollected>;
  /** @deprecated Use oethRewardTokenCollectedById */
  oethRewardTokenCollectedByUniqueInput?: Maybe<OethRewardTokenCollected>;
  oethRewardTokenCollecteds: Array<OethRewardTokenCollected>;
  oethRewardTokenCollectedsConnection: OethRewardTokenCollectedsConnection;
  oethStrategyDailyStatById?: Maybe<OethStrategyDailyStat>;
  /** @deprecated Use oethStrategyDailyStatById */
  oethStrategyDailyStatByUniqueInput?: Maybe<OethStrategyDailyStat>;
  oethStrategyDailyStats: Array<OethStrategyDailyStat>;
  oethStrategyDailyStatsConnection: OethStrategyDailyStatsConnection;
  oethStrategyHoldingDailyStatById?: Maybe<OethStrategyHoldingDailyStat>;
  /** @deprecated Use oethStrategyHoldingDailyStatById */
  oethStrategyHoldingDailyStatByUniqueInput?: Maybe<OethStrategyHoldingDailyStat>;
  oethStrategyHoldingDailyStats: Array<OethStrategyHoldingDailyStat>;
  oethStrategyHoldingDailyStatsConnection: OethStrategyHoldingDailyStatsConnection;
  oethVaultById?: Maybe<OethVault>;
  /** @deprecated Use oethVaultById */
  oethVaultByUniqueInput?: Maybe<OethVault>;
  oethVaults: Array<OethVault>;
  oethVaultsConnection: OethVaultsConnection;
  oethapies: Array<Oethapy>;
  oethapiesConnection: OethaPiesConnection;
  oethapyById?: Maybe<Oethapy>;
  /** @deprecated Use oethapyById */
  oethapyByUniqueInput?: Maybe<Oethapy>;
  oeths: Array<Oeth>;
  oethsConnection: OetHsConnection;
  ognStats: OgnStatsResult;
  ogvAddressById?: Maybe<OgvAddress>;
  /** @deprecated Use ogvAddressById */
  ogvAddressByUniqueInput?: Maybe<OgvAddress>;
  ogvAddresses: Array<OgvAddress>;
  ogvAddressesConnection: OgvAddressesConnection;
  ogvById?: Maybe<Ogv>;
  /** @deprecated Use ogvById */
  ogvByUniqueInput?: Maybe<Ogv>;
  ogvDailyStatById?: Maybe<OgvDailyStat>;
  /** @deprecated Use ogvDailyStatById */
  ogvDailyStatByUniqueInput?: Maybe<OgvDailyStat>;
  ogvDailyStats: Array<OgvDailyStat>;
  ogvDailyStatsConnection: OgvDailyStatsConnection;
  ogvLockupById?: Maybe<OgvLockup>;
  /** @deprecated Use ogvLockupById */
  ogvLockupByUniqueInput?: Maybe<OgvLockup>;
  ogvLockupTxLogById?: Maybe<OgvLockupTxLog>;
  /** @deprecated Use ogvLockupTxLogById */
  ogvLockupTxLogByUniqueInput?: Maybe<OgvLockupTxLog>;
  ogvLockupTxLogs: Array<OgvLockupTxLog>;
  ogvLockupTxLogsConnection: OgvLockupTxLogsConnection;
  ogvLockups: Array<OgvLockup>;
  ogvLockupsConnection: OgvLockupsConnection;
  ogvProposalById?: Maybe<OgvProposal>;
  /** @deprecated Use ogvProposalById */
  ogvProposalByUniqueInput?: Maybe<OgvProposal>;
  ogvProposalTxLogById?: Maybe<OgvProposalTxLog>;
  /** @deprecated Use ogvProposalTxLogById */
  ogvProposalTxLogByUniqueInput?: Maybe<OgvProposalTxLog>;
  ogvProposalTxLogs: Array<OgvProposalTxLog>;
  ogvProposalTxLogsConnection: OgvProposalTxLogsConnection;
  ogvProposalVoteById?: Maybe<OgvProposalVote>;
  /** @deprecated Use ogvProposalVoteById */
  ogvProposalVoteByUniqueInput?: Maybe<OgvProposalVote>;
  ogvProposalVotes: Array<OgvProposalVote>;
  ogvProposalVotesConnection: OgvProposalVotesConnection;
  ogvProposals: Array<OgvProposal>;
  ogvProposalsConnection: OgvProposalsConnection;
  ogvs: Array<Ogv>;
  ogvsConnection: OgVsConnection;
  ousdAaveStrategies: Array<OusdAaveStrategy>;
  ousdAaveStrategiesConnection: OusdAaveStrategiesConnection;
  ousdAaveStrategyById?: Maybe<OusdAaveStrategy>;
  /** @deprecated Use ousdAaveStrategyById */
  ousdAaveStrategyByUniqueInput?: Maybe<OusdAaveStrategy>;
  ousdActivities: Array<OusdActivity>;
  ousdActivitiesConnection: OusdActivitiesConnection;
  ousdActivityById?: Maybe<OusdActivity>;
  /** @deprecated Use ousdActivityById */
  ousdActivityByUniqueInput?: Maybe<OusdActivity>;
  ousdAddressById?: Maybe<OusdAddress>;
  /** @deprecated Use ousdAddressById */
  ousdAddressByUniqueInput?: Maybe<OusdAddress>;
  ousdAddresses: Array<OusdAddress>;
  ousdAddressesConnection: OusdAddressesConnection;
  ousdAssetById?: Maybe<OusdAsset>;
  /** @deprecated Use ousdAssetById */
  ousdAssetByUniqueInput?: Maybe<OusdAsset>;
  ousdAssets: Array<OusdAsset>;
  ousdAssetsConnection: OusdAssetsConnection;
  ousdById?: Maybe<Ousd>;
  /** @deprecated Use ousdById */
  ousdByUniqueInput?: Maybe<Ousd>;
  ousdCollateralDailyStatById?: Maybe<OusdCollateralDailyStat>;
  /** @deprecated Use ousdCollateralDailyStatById */
  ousdCollateralDailyStatByUniqueInput?: Maybe<OusdCollateralDailyStat>;
  ousdCollateralDailyStats: Array<OusdCollateralDailyStat>;
  ousdCollateralDailyStatsConnection: OusdCollateralDailyStatsConnection;
  ousdCompoundStrategies: Array<OusdCompoundStrategy>;
  ousdCompoundStrategiesConnection: OusdCompoundStrategiesConnection;
  ousdCompoundStrategyById?: Maybe<OusdCompoundStrategy>;
  /** @deprecated Use ousdCompoundStrategyById */
  ousdCompoundStrategyByUniqueInput?: Maybe<OusdCompoundStrategy>;
  ousdConvexLusdPlus3CrvById?: Maybe<OusdConvexLusdPlus3Crv>;
  /** @deprecated Use ousdConvexLusdPlus3CrvById */
  ousdConvexLusdPlus3CrvByUniqueInput?: Maybe<OusdConvexLusdPlus3Crv>;
  ousdConvexLusdPlus3Crvs: Array<OusdConvexLusdPlus3Crv>;
  ousdConvexLusdPlus3CrvsConnection: OusdConvexLusdPlus3CrvsConnection;
  ousdConvexStrategies: Array<OusdConvexStrategy>;
  ousdConvexStrategiesConnection: OusdConvexStrategiesConnection;
  ousdConvexStrategyById?: Maybe<OusdConvexStrategy>;
  /** @deprecated Use ousdConvexStrategyById */
  ousdConvexStrategyByUniqueInput?: Maybe<OusdConvexStrategy>;
  ousdDailyStatById?: Maybe<OusdDailyStat>;
  /** @deprecated Use ousdDailyStatById */
  ousdDailyStatByUniqueInput?: Maybe<OusdDailyStat>;
  ousdDailyStats: Array<OusdDailyStat>;
  ousdDailyStatsConnection: OusdDailyStatsConnection;
  ousdFluxStrategies: Array<OusdFluxStrategy>;
  ousdFluxStrategiesConnection: OusdFluxStrategiesConnection;
  ousdFluxStrategyById?: Maybe<OusdFluxStrategy>;
  /** @deprecated Use ousdFluxStrategyById */
  ousdFluxStrategyByUniqueInput?: Maybe<OusdFluxStrategy>;
  ousdHistories: Array<OusdHistory>;
  ousdHistoriesConnection: OusdHistoriesConnection;
  ousdHistoryById?: Maybe<OusdHistory>;
  /** @deprecated Use ousdHistoryById */
  ousdHistoryByUniqueInput?: Maybe<OusdHistory>;
  ousdMetaStrategies: Array<OusdMetaStrategy>;
  ousdMetaStrategiesConnection: OusdMetaStrategiesConnection;
  ousdMetaStrategyById?: Maybe<OusdMetaStrategy>;
  /** @deprecated Use ousdMetaStrategyById */
  ousdMetaStrategyByUniqueInput?: Maybe<OusdMetaStrategy>;
  ousdMorphoAaveById?: Maybe<OusdMorphoAave>;
  /** @deprecated Use ousdMorphoAaveById */
  ousdMorphoAaveByUniqueInput?: Maybe<OusdMorphoAave>;
  ousdMorphoAaves: Array<OusdMorphoAave>;
  ousdMorphoAavesConnection: OusdMorphoAavesConnection;
  ousdMorphoCompoundById?: Maybe<OusdMorphoCompound>;
  /** @deprecated Use ousdMorphoCompoundById */
  ousdMorphoCompoundByUniqueInput?: Maybe<OusdMorphoCompound>;
  ousdMorphoCompounds: Array<OusdMorphoCompound>;
  ousdMorphoCompoundsConnection: OusdMorphoCompoundsConnection;
  ousdRebaseById?: Maybe<OusdRebase>;
  /** @deprecated Use ousdRebaseById */
  ousdRebaseByUniqueInput?: Maybe<OusdRebase>;
  ousdRebaseOptionById?: Maybe<OusdRebaseOption>;
  /** @deprecated Use ousdRebaseOptionById */
  ousdRebaseOptionByUniqueInput?: Maybe<OusdRebaseOption>;
  ousdRebaseOptions: Array<OusdRebaseOption>;
  ousdRebaseOptionsConnection: OusdRebaseOptionsConnection;
  ousdRebases: Array<OusdRebase>;
  ousdRebasesConnection: OusdRebasesConnection;
  ousdStrategyDailyStatById?: Maybe<OusdStrategyDailyStat>;
  /** @deprecated Use ousdStrategyDailyStatById */
  ousdStrategyDailyStatByUniqueInput?: Maybe<OusdStrategyDailyStat>;
  ousdStrategyDailyStats: Array<OusdStrategyDailyStat>;
  ousdStrategyDailyStatsConnection: OusdStrategyDailyStatsConnection;
  ousdStrategyHoldingDailyStatById?: Maybe<OusdStrategyHoldingDailyStat>;
  /** @deprecated Use ousdStrategyHoldingDailyStatById */
  ousdStrategyHoldingDailyStatByUniqueInput?: Maybe<OusdStrategyHoldingDailyStat>;
  ousdStrategyHoldingDailyStats: Array<OusdStrategyHoldingDailyStat>;
  ousdStrategyHoldingDailyStatsConnection: OusdStrategyHoldingDailyStatsConnection;
  ousdVaultById?: Maybe<OusdVault>;
  /** @deprecated Use ousdVaultById */
  ousdVaultByUniqueInput?: Maybe<OusdVault>;
  ousdVaults: Array<OusdVault>;
  ousdVaultsConnection: OusdVaultsConnection;
  ousdapies: Array<Ousdapy>;
  ousdapiesConnection: OusdaPiesConnection;
  ousdapyById?: Maybe<Ousdapy>;
  /** @deprecated Use ousdapyById */
  ousdapyByUniqueInput?: Maybe<Ousdapy>;
  ousds: Array<Ousd>;
  ousdsConnection: OusDsConnection;
  processingStatusById?: Maybe<ProcessingStatus>;
  /** @deprecated Use processingStatusById */
  processingStatusByUniqueInput?: Maybe<ProcessingStatus>;
  processingStatuses: Array<ProcessingStatus>;
  processingStatusesConnection: ProcessingStatusesConnection;
  squidStatus?: Maybe<SquidStatus>;
  strategyBalanceById?: Maybe<StrategyBalance>;
  /** @deprecated Use strategyBalanceById */
  strategyBalanceByUniqueInput?: Maybe<StrategyBalance>;
  strategyBalances: Array<StrategyBalance>;
  strategyBalancesConnection: StrategyBalancesConnection;
  strategyDailyYieldById?: Maybe<StrategyDailyYield>;
  /** @deprecated Use strategyDailyYieldById */
  strategyDailyYieldByUniqueInput?: Maybe<StrategyDailyYield>;
  strategyDailyYields: Array<StrategyDailyYield>;
  strategyDailyYieldsConnection: StrategyDailyYieldsConnection;
  strategyYieldById?: Maybe<StrategyYield>;
  /** @deprecated Use strategyYieldById */
  strategyYieldByUniqueInput?: Maybe<StrategyYield>;
  strategyYields: Array<StrategyYield>;
  strategyYieldsConnection: StrategyYieldsConnection;
};


export type QueryBalancerPoolBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalancerPoolBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBalancerPoolBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BalancerPoolBalanceOrderByInput>>;
  where?: InputMaybe<BalancerPoolBalanceWhereInput>;
};


export type QueryBalancerPoolBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BalancerPoolBalanceOrderByInput>;
  where?: InputMaybe<BalancerPoolBalanceWhereInput>;
};


export type QueryBalancerPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalancerPoolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBalancerPoolRateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalancerPoolRateByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBalancerPoolRatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BalancerPoolRateOrderByInput>>;
  where?: InputMaybe<BalancerPoolRateWhereInput>;
};


export type QueryBalancerPoolRatesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BalancerPoolRateOrderByInput>;
  where?: InputMaybe<BalancerPoolRateWhereInput>;
};


export type QueryBalancerPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BalancerPoolOrderByInput>>;
  where?: InputMaybe<BalancerPoolWhereInput>;
};


export type QueryBalancerPoolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BalancerPoolOrderByInput>;
  where?: InputMaybe<BalancerPoolWhereInput>;
};


export type QueryBridgeTransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBridgeTransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBridgeTransferStateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBridgeTransferStateByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBridgeTransferStatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BridgeTransferStateOrderByInput>>;
  where?: InputMaybe<BridgeTransferStateWhereInput>;
};


export type QueryBridgeTransferStatesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BridgeTransferStateOrderByInput>;
  where?: InputMaybe<BridgeTransferStateWhereInput>;
};


export type QueryBridgeTransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BridgeTransferOrderByInput>>;
  where?: InputMaybe<BridgeTransferWhereInput>;
};


export type QueryBridgeTransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BridgeTransferOrderByInput>;
  where?: InputMaybe<BridgeTransferWhereInput>;
};


export type QueryCurvePoolBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCurvePoolBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCurvePoolBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurvePoolBalanceOrderByInput>>;
  where?: InputMaybe<CurvePoolBalanceWhereInput>;
};


export type QueryCurvePoolBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CurvePoolBalanceOrderByInput>;
  where?: InputMaybe<CurvePoolBalanceWhereInput>;
};


export type QueryCurvePoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCurvePoolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCurvePoolRateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCurvePoolRateByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryCurvePoolRatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurvePoolRateOrderByInput>>;
  where?: InputMaybe<CurvePoolRateWhereInput>;
};


export type QueryCurvePoolRatesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CurvePoolRateOrderByInput>;
  where?: InputMaybe<CurvePoolRateWhereInput>;
};


export type QueryCurvePoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<CurvePoolOrderByInput>>;
  where?: InputMaybe<CurvePoolWhereInput>;
};


export type QueryCurvePoolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<CurvePoolOrderByInput>;
  where?: InputMaybe<CurvePoolWhereInput>;
};


export type QueryErc20BalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryErc20BalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryErc20BalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Erc20BalanceOrderByInput>>;
  where?: InputMaybe<Erc20BalanceWhereInput>;
};


export type QueryErc20BalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Erc20BalanceOrderByInput>;
  where?: InputMaybe<Erc20BalanceWhereInput>;
};


export type QueryErc20ByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryErc20ByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryErc20HolderByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryErc20HolderByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryErc20HoldersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Erc20HolderOrderByInput>>;
  where?: InputMaybe<Erc20HolderWhereInput>;
};


export type QueryErc20HoldersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Erc20HolderOrderByInput>;
  where?: InputMaybe<Erc20HolderWhereInput>;
};


export type QueryErc20StateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryErc20StateByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryErc20StatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Erc20StateOrderByInput>>;
  where?: InputMaybe<Erc20StateWhereInput>;
};


export type QueryErc20StatesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Erc20StateOrderByInput>;
  where?: InputMaybe<Erc20StateWhereInput>;
};


export type QueryErc20sArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Erc20OrderByInput>>;
  where?: InputMaybe<Erc20WhereInput>;
};


export type QueryErc20sConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Erc20OrderByInput>;
  where?: InputMaybe<Erc20WhereInput>;
};


export type QueryExchangeRateByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryExchangeRateByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryExchangeRatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ExchangeRateOrderByInput>>;
  where?: InputMaybe<ExchangeRateWhereInput>;
};


export type QueryExchangeRatesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ExchangeRateOrderByInput>;
  where?: InputMaybe<ExchangeRateWhereInput>;
};


export type QueryLiquidityDailyBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLiquidityDailyBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLiquidityDailyBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquidityDailyBalanceOrderByInput>>;
  where?: InputMaybe<LiquidityDailyBalanceWhereInput>;
};


export type QueryLiquidityDailyBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LiquidityDailyBalanceOrderByInput>;
  where?: InputMaybe<LiquidityDailyBalanceWhereInput>;
};


export type QueryLiquiditySourceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLiquiditySourceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLiquiditySourcesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LiquiditySourceOrderByInput>>;
  where?: InputMaybe<LiquiditySourceWhereInput>;
};


export type QueryLiquiditySourcesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LiquiditySourceOrderByInput>;
  where?: InputMaybe<LiquiditySourceWhereInput>;
};


export type QueryMakerDsrStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MakerDsrStrategyOrderByInput>>;
  where?: InputMaybe<MakerDsrStrategyWhereInput>;
};


export type QueryMakerDsrStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MakerDsrStrategyOrderByInput>;
  where?: InputMaybe<MakerDsrStrategyWhereInput>;
};


export type QueryMakerDsrStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMakerDsrStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMaverickPoolBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMaverickPoolBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMaverickPoolBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MaverickPoolBalanceOrderByInput>>;
  where?: InputMaybe<MaverickPoolBalanceWhereInput>;
};


export type QueryMaverickPoolBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MaverickPoolBalanceOrderByInput>;
  where?: InputMaybe<MaverickPoolBalanceWhereInput>;
};


export type QueryMaverickPoolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMaverickPoolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMaverickPoolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MaverickPoolOrderByInput>>;
  where?: InputMaybe<MaverickPoolWhereInput>;
};


export type QueryMaverickPoolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MaverickPoolOrderByInput>;
  where?: InputMaybe<MaverickPoolWhereInput>;
};


export type QueryNativeBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryNativeBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryNativeBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NativeBalanceOrderByInput>>;
  where?: InputMaybe<NativeBalanceWhereInput>;
};


export type QueryNativeBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<NativeBalanceOrderByInput>;
  where?: InputMaybe<NativeBalanceWhereInput>;
};


export type QueryOethActivitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethActivityOrderByInput>>;
  where?: InputMaybe<OethActivityWhereInput>;
};


export type QueryOethActivitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethActivityOrderByInput>;
  where?: InputMaybe<OethActivityWhereInput>;
};


export type QueryOethActivityByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethActivityByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethAddressByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethAddressOrderByInput>>;
  where?: InputMaybe<OethAddressWhereInput>;
};


export type QueryOethAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethAddressOrderByInput>;
  where?: InputMaybe<OethAddressWhereInput>;
};


export type QueryOethAssetByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethAssetByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethAssetOrderByInput>>;
  where?: InputMaybe<OethAssetWhereInput>;
};


export type QueryOethAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethAssetOrderByInput>;
  where?: InputMaybe<OethAssetWhereInput>;
};


export type QueryOethBalancerMetaPoolStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethBalancerMetaPoolStrategyOrderByInput>>;
  where?: InputMaybe<OethBalancerMetaPoolStrategyWhereInput>;
};


export type QueryOethBalancerMetaPoolStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethBalancerMetaPoolStrategyOrderByInput>;
  where?: InputMaybe<OethBalancerMetaPoolStrategyWhereInput>;
};


export type QueryOethBalancerMetaPoolStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethBalancerMetaPoolStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethCollateralDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethCollateralDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethCollateralDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethCollateralDailyStatOrderByInput>>;
  where?: InputMaybe<OethCollateralDailyStatWhereInput>;
};


export type QueryOethCollateralDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethCollateralDailyStatOrderByInput>;
  where?: InputMaybe<OethCollateralDailyStatWhereInput>;
};


export type QueryOethCurveLpByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethCurveLpByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethCurveLpsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethCurveLpOrderByInput>>;
  where?: InputMaybe<OethCurveLpWhereInput>;
};


export type QueryOethCurveLpsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethCurveLpOrderByInput>;
  where?: InputMaybe<OethCurveLpWhereInput>;
};


export type QueryOethDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethDailyStatOrderByInput>>;
  where?: InputMaybe<OethDailyStatWhereInput>;
};


export type QueryOethDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethDailyStatOrderByInput>;
  where?: InputMaybe<OethDailyStatWhereInput>;
};


export type QueryOethDripperByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethDripperByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethDrippersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethDripperOrderByInput>>;
  where?: InputMaybe<OethDripperWhereInput>;
};


export type QueryOethDrippersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethDripperOrderByInput>;
  where?: InputMaybe<OethDripperWhereInput>;
};


export type QueryOethFraxStakingByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethFraxStakingByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethFraxStakingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethFraxStakingOrderByInput>>;
  where?: InputMaybe<OethFraxStakingWhereInput>;
};


export type QueryOethFraxStakingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethFraxStakingOrderByInput>;
  where?: InputMaybe<OethFraxStakingWhereInput>;
};


export type QueryOethHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethHistoryOrderByInput>>;
  where?: InputMaybe<OethHistoryWhereInput>;
};


export type QueryOethHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethHistoryOrderByInput>;
  where?: InputMaybe<OethHistoryWhereInput>;
};


export type QueryOethHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethMorphoAaveByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethMorphoAaveByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethMorphoAavesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethMorphoAaveOrderByInput>>;
  where?: InputMaybe<OethMorphoAaveWhereInput>;
};


export type QueryOethMorphoAavesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethMorphoAaveOrderByInput>;
  where?: InputMaybe<OethMorphoAaveWhereInput>;
};


export type QueryOethRebaseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethRebaseByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethRebaseOptionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethRebaseOptionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethRebaseOptionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethRebaseOptionOrderByInput>>;
  where?: InputMaybe<OethRebaseOptionWhereInput>;
};


export type QueryOethRebaseOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethRebaseOptionOrderByInput>;
  where?: InputMaybe<OethRebaseOptionWhereInput>;
};


export type QueryOethRebasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethRebaseOrderByInput>>;
  where?: InputMaybe<OethRebaseWhereInput>;
};


export type QueryOethRebasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethRebaseOrderByInput>;
  where?: InputMaybe<OethRebaseWhereInput>;
};


export type QueryOethRewardTokenCollectedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethRewardTokenCollectedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethRewardTokenCollectedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethRewardTokenCollectedOrderByInput>>;
  where?: InputMaybe<OethRewardTokenCollectedWhereInput>;
};


export type QueryOethRewardTokenCollectedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethRewardTokenCollectedOrderByInput>;
  where?: InputMaybe<OethRewardTokenCollectedWhereInput>;
};


export type QueryOethStrategyDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethStrategyDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethStrategyDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethStrategyDailyStatOrderByInput>>;
  where?: InputMaybe<OethStrategyDailyStatWhereInput>;
};


export type QueryOethStrategyDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethStrategyDailyStatOrderByInput>;
  where?: InputMaybe<OethStrategyDailyStatWhereInput>;
};


export type QueryOethStrategyHoldingDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethStrategyHoldingDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethStrategyHoldingDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethStrategyHoldingDailyStatOrderByInput>>;
  where?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
};


export type QueryOethStrategyHoldingDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethStrategyHoldingDailyStatOrderByInput>;
  where?: InputMaybe<OethStrategyHoldingDailyStatWhereInput>;
};


export type QueryOethVaultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethVaultByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethVaultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethVaultOrderByInput>>;
  where?: InputMaybe<OethVaultWhereInput>;
};


export type QueryOethVaultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethVaultOrderByInput>;
  where?: InputMaybe<OethVaultWhereInput>;
};


export type QueryOethapiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethapyOrderByInput>>;
  where?: InputMaybe<OethapyWhereInput>;
};


export type QueryOethapiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethapyOrderByInput>;
  where?: InputMaybe<OethapyWhereInput>;
};


export type QueryOethapyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethapyByUniqueInputArgs = {
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


export type QueryOgvAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvAddressByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvAddressOrderByInput>>;
  where?: InputMaybe<OgvAddressWhereInput>;
};


export type QueryOgvAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvAddressOrderByInput>;
  where?: InputMaybe<OgvAddressWhereInput>;
};


export type QueryOgvByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvDailyStatOrderByInput>>;
  where?: InputMaybe<OgvDailyStatWhereInput>;
};


export type QueryOgvDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvDailyStatOrderByInput>;
  where?: InputMaybe<OgvDailyStatWhereInput>;
};


export type QueryOgvLockupByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvLockupByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvLockupTxLogByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvLockupTxLogByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvLockupTxLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvLockupTxLogOrderByInput>>;
  where?: InputMaybe<OgvLockupTxLogWhereInput>;
};


export type QueryOgvLockupTxLogsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvLockupTxLogOrderByInput>;
  where?: InputMaybe<OgvLockupTxLogWhereInput>;
};


export type QueryOgvLockupsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvLockupOrderByInput>>;
  where?: InputMaybe<OgvLockupWhereInput>;
};


export type QueryOgvLockupsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvLockupOrderByInput>;
  where?: InputMaybe<OgvLockupWhereInput>;
};


export type QueryOgvProposalByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvProposalByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvProposalTxLogByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvProposalTxLogByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvProposalTxLogsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvProposalTxLogOrderByInput>>;
  where?: InputMaybe<OgvProposalTxLogWhereInput>;
};


export type QueryOgvProposalTxLogsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvProposalTxLogOrderByInput>;
  where?: InputMaybe<OgvProposalTxLogWhereInput>;
};


export type QueryOgvProposalVoteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvProposalVoteByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvProposalVotesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvProposalVoteOrderByInput>>;
  where?: InputMaybe<OgvProposalVoteWhereInput>;
};


export type QueryOgvProposalVotesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvProposalVoteOrderByInput>;
  where?: InputMaybe<OgvProposalVoteWhereInput>;
};


export type QueryOgvProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvProposalOrderByInput>>;
  where?: InputMaybe<OgvProposalWhereInput>;
};


export type QueryOgvProposalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvProposalOrderByInput>;
  where?: InputMaybe<OgvProposalWhereInput>;
};


export type QueryOgvsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvOrderByInput>>;
  where?: InputMaybe<OgvWhereInput>;
};


export type QueryOgvsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvOrderByInput>;
  where?: InputMaybe<OgvWhereInput>;
};


export type QueryOusdAaveStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdAaveStrategyOrderByInput>>;
  where?: InputMaybe<OusdAaveStrategyWhereInput>;
};


export type QueryOusdAaveStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdAaveStrategyOrderByInput>;
  where?: InputMaybe<OusdAaveStrategyWhereInput>;
};


export type QueryOusdAaveStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdAaveStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdActivitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdActivityOrderByInput>>;
  where?: InputMaybe<OusdActivityWhereInput>;
};


export type QueryOusdActivitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdActivityOrderByInput>;
  where?: InputMaybe<OusdActivityWhereInput>;
};


export type QueryOusdActivityByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdActivityByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdAddressByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdAddressOrderByInput>>;
  where?: InputMaybe<OusdAddressWhereInput>;
};


export type QueryOusdAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdAddressOrderByInput>;
  where?: InputMaybe<OusdAddressWhereInput>;
};


export type QueryOusdAssetByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdAssetByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdAssetOrderByInput>>;
  where?: InputMaybe<OusdAssetWhereInput>;
};


export type QueryOusdAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdAssetOrderByInput>;
  where?: InputMaybe<OusdAssetWhereInput>;
};


export type QueryOusdByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdCollateralDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdCollateralDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdCollateralDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdCollateralDailyStatOrderByInput>>;
  where?: InputMaybe<OusdCollateralDailyStatWhereInput>;
};


export type QueryOusdCollateralDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdCollateralDailyStatOrderByInput>;
  where?: InputMaybe<OusdCollateralDailyStatWhereInput>;
};


export type QueryOusdCompoundStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdCompoundStrategyOrderByInput>>;
  where?: InputMaybe<OusdCompoundStrategyWhereInput>;
};


export type QueryOusdCompoundStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdCompoundStrategyOrderByInput>;
  where?: InputMaybe<OusdCompoundStrategyWhereInput>;
};


export type QueryOusdCompoundStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdCompoundStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdConvexLusdPlus3CrvByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdConvexLusdPlus3CrvByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdConvexLusdPlus3CrvsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdConvexLusdPlus3CrvOrderByInput>>;
  where?: InputMaybe<OusdConvexLusdPlus3CrvWhereInput>;
};


export type QueryOusdConvexLusdPlus3CrvsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdConvexLusdPlus3CrvOrderByInput>;
  where?: InputMaybe<OusdConvexLusdPlus3CrvWhereInput>;
};


export type QueryOusdConvexStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdConvexStrategyOrderByInput>>;
  where?: InputMaybe<OusdConvexStrategyWhereInput>;
};


export type QueryOusdConvexStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdConvexStrategyOrderByInput>;
  where?: InputMaybe<OusdConvexStrategyWhereInput>;
};


export type QueryOusdConvexStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdConvexStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdDailyStatOrderByInput>>;
  where?: InputMaybe<OusdDailyStatWhereInput>;
};


export type QueryOusdDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdDailyStatOrderByInput>;
  where?: InputMaybe<OusdDailyStatWhereInput>;
};


export type QueryOusdFluxStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdFluxStrategyOrderByInput>>;
  where?: InputMaybe<OusdFluxStrategyWhereInput>;
};


export type QueryOusdFluxStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdFluxStrategyOrderByInput>;
  where?: InputMaybe<OusdFluxStrategyWhereInput>;
};


export type QueryOusdFluxStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdFluxStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdHistoryOrderByInput>>;
  where?: InputMaybe<OusdHistoryWhereInput>;
};


export type QueryOusdHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdHistoryOrderByInput>;
  where?: InputMaybe<OusdHistoryWhereInput>;
};


export type QueryOusdHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdMetaStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdMetaStrategyOrderByInput>>;
  where?: InputMaybe<OusdMetaStrategyWhereInput>;
};


export type QueryOusdMetaStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdMetaStrategyOrderByInput>;
  where?: InputMaybe<OusdMetaStrategyWhereInput>;
};


export type QueryOusdMetaStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdMetaStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdMorphoAaveByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdMorphoAaveByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdMorphoAavesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdMorphoAaveOrderByInput>>;
  where?: InputMaybe<OusdMorphoAaveWhereInput>;
};


export type QueryOusdMorphoAavesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdMorphoAaveOrderByInput>;
  where?: InputMaybe<OusdMorphoAaveWhereInput>;
};


export type QueryOusdMorphoCompoundByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdMorphoCompoundByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdMorphoCompoundsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdMorphoCompoundOrderByInput>>;
  where?: InputMaybe<OusdMorphoCompoundWhereInput>;
};


export type QueryOusdMorphoCompoundsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdMorphoCompoundOrderByInput>;
  where?: InputMaybe<OusdMorphoCompoundWhereInput>;
};


export type QueryOusdRebaseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdRebaseByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdRebaseOptionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdRebaseOptionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdRebaseOptionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdRebaseOptionOrderByInput>>;
  where?: InputMaybe<OusdRebaseOptionWhereInput>;
};


export type QueryOusdRebaseOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdRebaseOptionOrderByInput>;
  where?: InputMaybe<OusdRebaseOptionWhereInput>;
};


export type QueryOusdRebasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdRebaseOrderByInput>>;
  where?: InputMaybe<OusdRebaseWhereInput>;
};


export type QueryOusdRebasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdRebaseOrderByInput>;
  where?: InputMaybe<OusdRebaseWhereInput>;
};


export type QueryOusdStrategyDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdStrategyDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdStrategyDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdStrategyDailyStatOrderByInput>>;
  where?: InputMaybe<OusdStrategyDailyStatWhereInput>;
};


export type QueryOusdStrategyDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdStrategyDailyStatOrderByInput>;
  where?: InputMaybe<OusdStrategyDailyStatWhereInput>;
};


export type QueryOusdStrategyHoldingDailyStatByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdStrategyHoldingDailyStatByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdStrategyHoldingDailyStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdStrategyHoldingDailyStatOrderByInput>>;
  where?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
};


export type QueryOusdStrategyHoldingDailyStatsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdStrategyHoldingDailyStatOrderByInput>;
  where?: InputMaybe<OusdStrategyHoldingDailyStatWhereInput>;
};


export type QueryOusdVaultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdVaultByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdVaultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdVaultOrderByInput>>;
  where?: InputMaybe<OusdVaultWhereInput>;
};


export type QueryOusdVaultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdVaultOrderByInput>;
  where?: InputMaybe<OusdVaultWhereInput>;
};


export type QueryOusdapiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdapyOrderByInput>>;
  where?: InputMaybe<OusdapyWhereInput>;
};


export type QueryOusdapiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdapyOrderByInput>;
  where?: InputMaybe<OusdapyWhereInput>;
};


export type QueryOusdapyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdapyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOusdsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OusdOrderByInput>>;
  where?: InputMaybe<OusdWhereInput>;
};


export type QueryOusdsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OusdOrderByInput>;
  where?: InputMaybe<OusdWhereInput>;
};


export type QueryProcessingStatusByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProcessingStatusByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryProcessingStatusesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProcessingStatusOrderByInput>>;
  where?: InputMaybe<ProcessingStatusWhereInput>;
};


export type QueryProcessingStatusesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ProcessingStatusOrderByInput>;
  where?: InputMaybe<ProcessingStatusWhereInput>;
};


export type QueryStrategyBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStrategyBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStrategyBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyBalanceOrderByInput>>;
  where?: InputMaybe<StrategyBalanceWhereInput>;
};


export type QueryStrategyBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StrategyBalanceOrderByInput>;
  where?: InputMaybe<StrategyBalanceWhereInput>;
};


export type QueryStrategyDailyYieldByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStrategyDailyYieldByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStrategyDailyYieldsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyDailyYieldOrderByInput>>;
  where?: InputMaybe<StrategyDailyYieldWhereInput>;
};


export type QueryStrategyDailyYieldsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StrategyDailyYieldOrderByInput>;
  where?: InputMaybe<StrategyDailyYieldWhereInput>;
};


export type QueryStrategyYieldByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStrategyYieldByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStrategyYieldsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyYieldOrderByInput>>;
  where?: InputMaybe<StrategyYieldWhereInput>;
};


export type QueryStrategyYieldsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StrategyYieldOrderByInput>;
  where?: InputMaybe<StrategyYieldWhereInput>;
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

export type StrategyBalance = {
  __typename?: 'StrategyBalance';
  asset: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  /** Format: 'strategy:asset:blockNumber' */
  id: Scalars['String']['output'];
  strategy: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type StrategyBalanceEdge = {
  __typename?: 'StrategyBalanceEdge';
  cursor: Scalars['String']['output'];
  node: StrategyBalance;
};

export enum StrategyBalanceOrderByInput {
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
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
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type StrategyBalanceWhereInput = {
  AND?: InputMaybe<Array<StrategyBalanceWhereInput>>;
  OR?: InputMaybe<Array<StrategyBalanceWhereInput>>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_eq?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_not_eq?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  asset_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  strategy_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_gt?: InputMaybe<Scalars['String']['input']>;
  strategy_gte?: InputMaybe<Scalars['String']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  strategy_lt?: InputMaybe<Scalars['String']['input']>;
  strategy_lte?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_not_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type StrategyBalancesConnection = {
  __typename?: 'StrategyBalancesConnection';
  edges: Array<StrategyBalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StrategyDailyYield = {
  __typename?: 'StrategyDailyYield';
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  asset: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  balanceWeight: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  earnings: Scalars['BigInt']['output'];
  earningsChange: Scalars['BigInt']['output'];
  /** Format: 'strategy:asset:blockNumber' */
  id: Scalars['String']['output'];
  strategy: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type StrategyDailyYieldEdge = {
  __typename?: 'StrategyDailyYieldEdge';
  cursor: Scalars['String']['output'];
  node: StrategyDailyYield;
};

export enum StrategyDailyYieldOrderByInput {
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprDesc = 'apr_DESC',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceWeightAsc = 'balanceWeight_ASC',
  BalanceWeightAscNullsFirst = 'balanceWeight_ASC_NULLS_FIRST',
  BalanceWeightDesc = 'balanceWeight_DESC',
  BalanceWeightDescNullsLast = 'balanceWeight_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EarningsChangeAsc = 'earningsChange_ASC',
  EarningsChangeAscNullsFirst = 'earningsChange_ASC_NULLS_FIRST',
  EarningsChangeDesc = 'earningsChange_DESC',
  EarningsChangeDescNullsLast = 'earningsChange_DESC_NULLS_LAST',
  EarningsAsc = 'earnings_ASC',
  EarningsAscNullsFirst = 'earnings_ASC_NULLS_FIRST',
  EarningsDesc = 'earnings_DESC',
  EarningsDescNullsLast = 'earnings_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type StrategyDailyYieldWhereInput = {
  AND?: InputMaybe<Array<StrategyDailyYieldWhereInput>>;
  OR?: InputMaybe<Array<StrategyDailyYieldWhereInput>>;
  apr_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_gt?: InputMaybe<Scalars['Float']['input']>;
  apr_gte?: InputMaybe<Scalars['Float']['input']>;
  apr_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apr_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apr_lt?: InputMaybe<Scalars['Float']['input']>;
  apr_lte?: InputMaybe<Scalars['Float']['input']>;
  apr_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apr_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_gt?: InputMaybe<Scalars['Float']['input']>;
  apy_gte?: InputMaybe<Scalars['Float']['input']>;
  apy_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy_lt?: InputMaybe<Scalars['Float']['input']>;
  apy_lte?: InputMaybe<Scalars['Float']['input']>;
  apy_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_eq?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_not_eq?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  asset_startsWith?: InputMaybe<Scalars['String']['input']>;
  balanceWeight_eq?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_gt?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_gte?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  balanceWeight_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balanceWeight_lt?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_lte?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_not_eq?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
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
  earningsChange_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earningsChange_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earningsChange_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earnings_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earnings_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earnings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  strategy_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_gt?: InputMaybe<Scalars['String']['input']>;
  strategy_gte?: InputMaybe<Scalars['String']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  strategy_lt?: InputMaybe<Scalars['String']['input']>;
  strategy_lte?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_not_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type StrategyDailyYieldsConnection = {
  __typename?: 'StrategyDailyYieldsConnection';
  edges: Array<StrategyDailyYieldEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type StrategyYield = {
  __typename?: 'StrategyYield';
  asset: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  balanceWeight: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  earnings: Scalars['BigInt']['output'];
  earningsChange: Scalars['BigInt']['output'];
  /** Format: 'strategy:asset:blockNumber' */
  id: Scalars['String']['output'];
  strategy: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type StrategyYieldEdge = {
  __typename?: 'StrategyYieldEdge';
  cursor: Scalars['String']['output'];
  node: StrategyYield;
};

export enum StrategyYieldOrderByInput {
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceWeightAsc = 'balanceWeight_ASC',
  BalanceWeightAscNullsFirst = 'balanceWeight_ASC_NULLS_FIRST',
  BalanceWeightDesc = 'balanceWeight_DESC',
  BalanceWeightDescNullsLast = 'balanceWeight_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EarningsChangeAsc = 'earningsChange_ASC',
  EarningsChangeAscNullsFirst = 'earningsChange_ASC_NULLS_FIRST',
  EarningsChangeDesc = 'earningsChange_DESC',
  EarningsChangeDescNullsLast = 'earningsChange_DESC_NULLS_LAST',
  EarningsAsc = 'earnings_ASC',
  EarningsAscNullsFirst = 'earnings_ASC_NULLS_FIRST',
  EarningsDesc = 'earnings_DESC',
  EarningsDescNullsLast = 'earnings_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type StrategyYieldWhereInput = {
  AND?: InputMaybe<Array<StrategyYieldWhereInput>>;
  OR?: InputMaybe<Array<StrategyYieldWhereInput>>;
  asset_contains?: InputMaybe<Scalars['String']['input']>;
  asset_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_eq?: InputMaybe<Scalars['String']['input']>;
  asset_gt?: InputMaybe<Scalars['String']['input']>;
  asset_gte?: InputMaybe<Scalars['String']['input']>;
  asset_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  asset_lt?: InputMaybe<Scalars['String']['input']>;
  asset_lte?: InputMaybe<Scalars['String']['input']>;
  asset_not_contains?: InputMaybe<Scalars['String']['input']>;
  asset_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  asset_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  asset_not_eq?: InputMaybe<Scalars['String']['input']>;
  asset_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  asset_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  asset_startsWith?: InputMaybe<Scalars['String']['input']>;
  balanceWeight_eq?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_gt?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_gte?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  balanceWeight_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balanceWeight_lt?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_lte?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_not_eq?: InputMaybe<Scalars['Float']['input']>;
  balanceWeight_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
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
  earningsChange_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earningsChange_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earningsChange_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earningsChange_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earnings_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_gt?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_gte?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  earnings_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  earnings_lt?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_lte?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  earnings_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  strategy_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_gt?: InputMaybe<Scalars['String']['input']>;
  strategy_gte?: InputMaybe<Scalars['String']['input']>;
  strategy_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  strategy_lt?: InputMaybe<Scalars['String']['input']>;
  strategy_lte?: InputMaybe<Scalars['String']['input']>;
  strategy_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategy_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategy_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_not_eq?: InputMaybe<Scalars['String']['input']>;
  strategy_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategy_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategy_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type StrategyYieldsConnection = {
  __typename?: 'StrategyYieldsConnection';
  edges: Array<StrategyYieldEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

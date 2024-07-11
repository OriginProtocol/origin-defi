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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  Balance0Asc = 'balance0_ASC',
  Balance0AscNullsFirst = 'balance0_ASC_NULLS_FIRST',
  Balance0AscNullsLast = 'balance0_ASC_NULLS_LAST',
  Balance0Desc = 'balance0_DESC',
  Balance0DescNullsFirst = 'balance0_DESC_NULLS_FIRST',
  Balance0DescNullsLast = 'balance0_DESC_NULLS_LAST',
  Balance1Asc = 'balance1_ASC',
  Balance1AscNullsFirst = 'balance1_ASC_NULLS_FIRST',
  Balance1AscNullsLast = 'balance1_ASC_NULLS_LAST',
  Balance1Desc = 'balance1_DESC',
  Balance1DescNullsFirst = 'balance1_DESC_NULLS_FIRST',
  Balance1DescNullsLast = 'balance1_DESC_NULLS_LAST',
  Balance2Asc = 'balance2_ASC',
  Balance2AscNullsFirst = 'balance2_ASC_NULLS_FIRST',
  Balance2AscNullsLast = 'balance2_ASC_NULLS_LAST',
  Balance2Desc = 'balance2_DESC',
  Balance2DescNullsFirst = 'balance2_DESC_NULLS_FIRST',
  Balance2DescNullsLast = 'balance2_DESC_NULLS_LAST',
  Balance3Asc = 'balance3_ASC',
  Balance3AscNullsFirst = 'balance3_ASC_NULLS_FIRST',
  Balance3AscNullsLast = 'balance3_ASC_NULLS_LAST',
  Balance3Desc = 'balance3_DESC',
  Balance3DescNullsFirst = 'balance3_DESC_NULLS_FIRST',
  Balance3DescNullsLast = 'balance3_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  Token0Asc = 'token0_ASC',
  Token0AscNullsFirst = 'token0_ASC_NULLS_FIRST',
  Token0AscNullsLast = 'token0_ASC_NULLS_LAST',
  Token0Desc = 'token0_DESC',
  Token0DescNullsFirst = 'token0_DESC_NULLS_FIRST',
  Token0DescNullsLast = 'token0_DESC_NULLS_LAST',
  Token1Asc = 'token1_ASC',
  Token1AscNullsFirst = 'token1_ASC_NULLS_FIRST',
  Token1AscNullsLast = 'token1_ASC_NULLS_LAST',
  Token1Desc = 'token1_DESC',
  Token1DescNullsFirst = 'token1_DESC_NULLS_FIRST',
  Token1DescNullsLast = 'token1_DESC_NULLS_LAST',
  Token2Asc = 'token2_ASC',
  Token2AscNullsFirst = 'token2_ASC_NULLS_FIRST',
  Token2AscNullsLast = 'token2_ASC_NULLS_LAST',
  Token2Desc = 'token2_DESC',
  Token2DescNullsFirst = 'token2_DESC_NULLS_FIRST',
  Token2DescNullsLast = 'token2_DESC_NULLS_LAST',
  Token3Asc = 'token3_ASC',
  Token3AscNullsFirst = 'token3_ASC_NULLS_FIRST',
  Token3AscNullsLast = 'token3_ASC_NULLS_LAST',
  Token3Desc = 'token3_DESC',
  Token3DescNullsFirst = 'token3_DESC_NULLS_FIRST',
  Token3DescNullsLast = 'token3_DESC_NULLS_LAST',
  TokenCountAsc = 'tokenCount_ASC',
  TokenCountAscNullsFirst = 'tokenCount_ASC_NULLS_FIRST',
  TokenCountAscNullsLast = 'tokenCount_ASC_NULLS_LAST',
  TokenCountDesc = 'tokenCount_DESC',
  TokenCountDescNullsFirst = 'tokenCount_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  Rate0Asc = 'rate0_ASC',
  Rate0AscNullsFirst = 'rate0_ASC_NULLS_FIRST',
  Rate0AscNullsLast = 'rate0_ASC_NULLS_LAST',
  Rate0Desc = 'rate0_DESC',
  Rate0DescNullsFirst = 'rate0_DESC_NULLS_FIRST',
  Rate0DescNullsLast = 'rate0_DESC_NULLS_LAST',
  Rate1Asc = 'rate1_ASC',
  Rate1AscNullsFirst = 'rate1_ASC_NULLS_FIRST',
  Rate1AscNullsLast = 'rate1_ASC_NULLS_LAST',
  Rate1Desc = 'rate1_DESC',
  Rate1DescNullsFirst = 'rate1_DESC_NULLS_FIRST',
  Rate1DescNullsLast = 'rate1_DESC_NULLS_LAST',
  Rate2Asc = 'rate2_ASC',
  Rate2AscNullsFirst = 'rate2_ASC_NULLS_FIRST',
  Rate2AscNullsLast = 'rate2_ASC_NULLS_LAST',
  Rate2Desc = 'rate2_DESC',
  Rate2DescNullsFirst = 'rate2_DESC_NULLS_FIRST',
  Rate2DescNullsLast = 'rate2_DESC_NULLS_LAST',
  Rate3Asc = 'rate3_ASC',
  Rate3AscNullsFirst = 'rate3_ASC_NULLS_FIRST',
  Rate3AscNullsLast = 'rate3_ASC_NULLS_LAST',
  Rate3Desc = 'rate3_DESC',
  Rate3DescNullsFirst = 'rate3_DESC_NULLS_FIRST',
  Rate3DescNullsLast = 'rate3_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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

export type BeaconDepositEvent = {
  __typename?: 'BeaconDepositEvent';
  address: Scalars['String']['output'];
  amount: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  caller: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  index: Scalars['String']['output'];
  pubkey: BeaconDepositPubkey;
  signature: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  withdrawalCredentials: Scalars['String']['output'];
};

export type BeaconDepositEventEdge = {
  __typename?: 'BeaconDepositEventEdge';
  cursor: Scalars['String']['output'];
  node: BeaconDepositEvent;
};

export enum BeaconDepositEventOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CallerAsc = 'caller_ASC',
  CallerAscNullsFirst = 'caller_ASC_NULLS_FIRST',
  CallerAscNullsLast = 'caller_ASC_NULLS_LAST',
  CallerDesc = 'caller_DESC',
  CallerDescNullsFirst = 'caller_DESC_NULLS_FIRST',
  CallerDescNullsLast = 'caller_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexAscNullsLast = 'index_ASC_NULLS_LAST',
  IndexDesc = 'index_DESC',
  IndexDescNullsFirst = 'index_DESC_NULLS_FIRST',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  PubkeyCountAsc = 'pubkey_count_ASC',
  PubkeyCountAscNullsFirst = 'pubkey_count_ASC_NULLS_FIRST',
  PubkeyCountAscNullsLast = 'pubkey_count_ASC_NULLS_LAST',
  PubkeyCountDesc = 'pubkey_count_DESC',
  PubkeyCountDescNullsFirst = 'pubkey_count_DESC_NULLS_FIRST',
  PubkeyCountDescNullsLast = 'pubkey_count_DESC_NULLS_LAST',
  PubkeyCreateDateAsc = 'pubkey_createDate_ASC',
  PubkeyCreateDateAscNullsFirst = 'pubkey_createDate_ASC_NULLS_FIRST',
  PubkeyCreateDateAscNullsLast = 'pubkey_createDate_ASC_NULLS_LAST',
  PubkeyCreateDateDesc = 'pubkey_createDate_DESC',
  PubkeyCreateDateDescNullsFirst = 'pubkey_createDate_DESC_NULLS_FIRST',
  PubkeyCreateDateDescNullsLast = 'pubkey_createDate_DESC_NULLS_LAST',
  PubkeyIdAsc = 'pubkey_id_ASC',
  PubkeyIdAscNullsFirst = 'pubkey_id_ASC_NULLS_FIRST',
  PubkeyIdAscNullsLast = 'pubkey_id_ASC_NULLS_LAST',
  PubkeyIdDesc = 'pubkey_id_DESC',
  PubkeyIdDescNullsFirst = 'pubkey_id_DESC_NULLS_FIRST',
  PubkeyIdDescNullsLast = 'pubkey_id_DESC_NULLS_LAST',
  PubkeyLastUpdatedAsc = 'pubkey_lastUpdated_ASC',
  PubkeyLastUpdatedAscNullsFirst = 'pubkey_lastUpdated_ASC_NULLS_FIRST',
  PubkeyLastUpdatedAscNullsLast = 'pubkey_lastUpdated_ASC_NULLS_LAST',
  PubkeyLastUpdatedDesc = 'pubkey_lastUpdated_DESC',
  PubkeyLastUpdatedDescNullsFirst = 'pubkey_lastUpdated_DESC_NULLS_FIRST',
  PubkeyLastUpdatedDescNullsLast = 'pubkey_lastUpdated_DESC_NULLS_LAST',
  SignatureAsc = 'signature_ASC',
  SignatureAscNullsFirst = 'signature_ASC_NULLS_FIRST',
  SignatureAscNullsLast = 'signature_ASC_NULLS_LAST',
  SignatureDesc = 'signature_DESC',
  SignatureDescNullsFirst = 'signature_DESC_NULLS_FIRST',
  SignatureDescNullsLast = 'signature_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  WithdrawalCredentialsAsc = 'withdrawalCredentials_ASC',
  WithdrawalCredentialsAscNullsFirst = 'withdrawalCredentials_ASC_NULLS_FIRST',
  WithdrawalCredentialsAscNullsLast = 'withdrawalCredentials_ASC_NULLS_LAST',
  WithdrawalCredentialsDesc = 'withdrawalCredentials_DESC',
  WithdrawalCredentialsDescNullsFirst = 'withdrawalCredentials_DESC_NULLS_FIRST',
  WithdrawalCredentialsDescNullsLast = 'withdrawalCredentials_DESC_NULLS_LAST'
}

export type BeaconDepositEventWhereInput = {
  AND?: InputMaybe<Array<BeaconDepositEventWhereInput>>;
  OR?: InputMaybe<Array<BeaconDepositEventWhereInput>>;
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
  amount_contains?: InputMaybe<Scalars['String']['input']>;
  amount_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount_eq?: InputMaybe<Scalars['String']['input']>;
  amount_gt?: InputMaybe<Scalars['String']['input']>;
  amount_gte?: InputMaybe<Scalars['String']['input']>;
  amount_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['String']['input']>;
  amount_lte?: InputMaybe<Scalars['String']['input']>;
  amount_not_contains?: InputMaybe<Scalars['String']['input']>;
  amount_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  amount_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  amount_not_eq?: InputMaybe<Scalars['String']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  amount_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  amount_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  caller_contains?: InputMaybe<Scalars['String']['input']>;
  caller_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  caller_endsWith?: InputMaybe<Scalars['String']['input']>;
  caller_eq?: InputMaybe<Scalars['String']['input']>;
  caller_gt?: InputMaybe<Scalars['String']['input']>;
  caller_gte?: InputMaybe<Scalars['String']['input']>;
  caller_in?: InputMaybe<Array<Scalars['String']['input']>>;
  caller_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  caller_lt?: InputMaybe<Scalars['String']['input']>;
  caller_lte?: InputMaybe<Scalars['String']['input']>;
  caller_not_contains?: InputMaybe<Scalars['String']['input']>;
  caller_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  caller_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  caller_not_eq?: InputMaybe<Scalars['String']['input']>;
  caller_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  caller_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  caller_startsWith?: InputMaybe<Scalars['String']['input']>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  index_contains?: InputMaybe<Scalars['String']['input']>;
  index_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  index_endsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['String']['input']>;
  index_gt?: InputMaybe<Scalars['String']['input']>;
  index_gte?: InputMaybe<Scalars['String']['input']>;
  index_in?: InputMaybe<Array<Scalars['String']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['String']['input']>;
  index_lte?: InputMaybe<Scalars['String']['input']>;
  index_not_contains?: InputMaybe<Scalars['String']['input']>;
  index_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  index_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  index_not_eq?: InputMaybe<Scalars['String']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  index_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_startsWith?: InputMaybe<Scalars['String']['input']>;
  pubkey?: InputMaybe<BeaconDepositPubkeyWhereInput>;
  pubkey_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signature_contains?: InputMaybe<Scalars['String']['input']>;
  signature_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signature_endsWith?: InputMaybe<Scalars['String']['input']>;
  signature_eq?: InputMaybe<Scalars['String']['input']>;
  signature_gt?: InputMaybe<Scalars['String']['input']>;
  signature_gte?: InputMaybe<Scalars['String']['input']>;
  signature_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signature_lt?: InputMaybe<Scalars['String']['input']>;
  signature_lte?: InputMaybe<Scalars['String']['input']>;
  signature_not_contains?: InputMaybe<Scalars['String']['input']>;
  signature_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  signature_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  signature_not_eq?: InputMaybe<Scalars['String']['input']>;
  signature_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  signature_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  signature_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  withdrawalCredentials_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_endsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_eq?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_gt?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_gte?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawalCredentials_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawalCredentials_lt?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_lte?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_not_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_not_eq?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawalCredentials_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawalCredentials_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type BeaconDepositEventsConnection = {
  __typename?: 'BeaconDepositEventsConnection';
  edges: Array<BeaconDepositEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BeaconDepositPubkey = {
  __typename?: 'BeaconDepositPubkey';
  count: Scalars['Int']['output'];
  createDate: Scalars['DateTime']['output'];
  deposits: Array<BeaconDepositEvent>;
  id: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
};


export type BeaconDepositPubkeyDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BeaconDepositEventOrderByInput>>;
  where?: InputMaybe<BeaconDepositEventWhereInput>;
};

export type BeaconDepositPubkeyEdge = {
  __typename?: 'BeaconDepositPubkeyEdge';
  cursor: Scalars['String']['output'];
  node: BeaconDepositPubkey;
};

export enum BeaconDepositPubkeyOrderByInput {
  CountAsc = 'count_ASC',
  CountAscNullsFirst = 'count_ASC_NULLS_FIRST',
  CountAscNullsLast = 'count_ASC_NULLS_LAST',
  CountDesc = 'count_DESC',
  CountDescNullsFirst = 'count_DESC_NULLS_FIRST',
  CountDescNullsLast = 'count_DESC_NULLS_LAST',
  CreateDateAsc = 'createDate_ASC',
  CreateDateAscNullsFirst = 'createDate_ASC_NULLS_FIRST',
  CreateDateAscNullsLast = 'createDate_ASC_NULLS_LAST',
  CreateDateDesc = 'createDate_DESC',
  CreateDateDescNullsFirst = 'createDate_DESC_NULLS_FIRST',
  CreateDateDescNullsLast = 'createDate_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST'
}

export type BeaconDepositPubkeyWhereInput = {
  AND?: InputMaybe<Array<BeaconDepositPubkeyWhereInput>>;
  OR?: InputMaybe<Array<BeaconDepositPubkeyWhereInput>>;
  count_eq?: InputMaybe<Scalars['Int']['input']>;
  count_gt?: InputMaybe<Scalars['Int']['input']>;
  count_gte?: InputMaybe<Scalars['Int']['input']>;
  count_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  count_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  count_lt?: InputMaybe<Scalars['Int']['input']>;
  count_lte?: InputMaybe<Scalars['Int']['input']>;
  count_not_eq?: InputMaybe<Scalars['Int']['input']>;
  count_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  createDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  createDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  createDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  deposits_every?: InputMaybe<BeaconDepositEventWhereInput>;
  deposits_none?: InputMaybe<BeaconDepositEventWhereInput>;
  deposits_some?: InputMaybe<BeaconDepositEventWhereInput>;
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
};

export type BeaconDepositPubkeysConnection = {
  __typename?: 'BeaconDepositPubkeysConnection';
  edges: Array<BeaconDepositPubkeyEdge>;
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
  state: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  tokenIn: Scalars['String']['output'];
  tokenOut: Scalars['String']['output'];
  transactor: Scalars['String']['output'];
  txHashIn: Scalars['String']['output'];
  txHashOut?: Maybe<Scalars['String']['output']>;
};

export type BridgeTransferEdge = {
  __typename?: 'BridgeTransferEdge';
  cursor: Scalars['String']['output'];
  node: BridgeTransfer;
};

export enum BridgeTransferOrderByInput {
  AmountInAsc = 'amountIn_ASC',
  AmountInAscNullsFirst = 'amountIn_ASC_NULLS_FIRST',
  AmountInAscNullsLast = 'amountIn_ASC_NULLS_LAST',
  AmountInDesc = 'amountIn_DESC',
  AmountInDescNullsFirst = 'amountIn_DESC_NULLS_FIRST',
  AmountInDescNullsLast = 'amountIn_DESC_NULLS_LAST',
  AmountOutAsc = 'amountOut_ASC',
  AmountOutAscNullsFirst = 'amountOut_ASC_NULLS_FIRST',
  AmountOutAscNullsLast = 'amountOut_ASC_NULLS_LAST',
  AmountOutDesc = 'amountOut_DESC',
  AmountOutDescNullsFirst = 'amountOut_DESC_NULLS_FIRST',
  AmountOutDescNullsLast = 'amountOut_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  BridgeAsc = 'bridge_ASC',
  BridgeAscNullsFirst = 'bridge_ASC_NULLS_FIRST',
  BridgeAscNullsLast = 'bridge_ASC_NULLS_LAST',
  BridgeDesc = 'bridge_DESC',
  BridgeDescNullsFirst = 'bridge_DESC_NULLS_FIRST',
  BridgeDescNullsLast = 'bridge_DESC_NULLS_LAST',
  ChainInAsc = 'chainIn_ASC',
  ChainInAscNullsFirst = 'chainIn_ASC_NULLS_FIRST',
  ChainInAscNullsLast = 'chainIn_ASC_NULLS_LAST',
  ChainInDesc = 'chainIn_DESC',
  ChainInDescNullsFirst = 'chainIn_DESC_NULLS_FIRST',
  ChainInDescNullsLast = 'chainIn_DESC_NULLS_LAST',
  ChainOutAsc = 'chainOut_ASC',
  ChainOutAscNullsFirst = 'chainOut_ASC_NULLS_FIRST',
  ChainOutAscNullsLast = 'chainOut_ASC_NULLS_LAST',
  ChainOutDesc = 'chainOut_DESC',
  ChainOutDescNullsFirst = 'chainOut_DESC_NULLS_FIRST',
  ChainOutDescNullsLast = 'chainOut_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MessageIdAsc = 'messageId_ASC',
  MessageIdAscNullsFirst = 'messageId_ASC_NULLS_FIRST',
  MessageIdAscNullsLast = 'messageId_ASC_NULLS_LAST',
  MessageIdDesc = 'messageId_DESC',
  MessageIdDescNullsFirst = 'messageId_DESC_NULLS_FIRST',
  MessageIdDescNullsLast = 'messageId_DESC_NULLS_LAST',
  ReceiverAsc = 'receiver_ASC',
  ReceiverAscNullsFirst = 'receiver_ASC_NULLS_FIRST',
  ReceiverAscNullsLast = 'receiver_ASC_NULLS_LAST',
  ReceiverDesc = 'receiver_DESC',
  ReceiverDescNullsFirst = 'receiver_DESC_NULLS_FIRST',
  ReceiverDescNullsLast = 'receiver_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderAscNullsLast = 'sender_ASC_NULLS_LAST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsFirst = 'sender_DESC_NULLS_FIRST',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  StateAsc = 'state_ASC',
  StateAscNullsFirst = 'state_ASC_NULLS_FIRST',
  StateAscNullsLast = 'state_ASC_NULLS_LAST',
  StateDesc = 'state_DESC',
  StateDescNullsFirst = 'state_DESC_NULLS_FIRST',
  StateDescNullsLast = 'state_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenInAsc = 'tokenIn_ASC',
  TokenInAscNullsFirst = 'tokenIn_ASC_NULLS_FIRST',
  TokenInAscNullsLast = 'tokenIn_ASC_NULLS_LAST',
  TokenInDesc = 'tokenIn_DESC',
  TokenInDescNullsFirst = 'tokenIn_DESC_NULLS_FIRST',
  TokenInDescNullsLast = 'tokenIn_DESC_NULLS_LAST',
  TokenOutAsc = 'tokenOut_ASC',
  TokenOutAscNullsFirst = 'tokenOut_ASC_NULLS_FIRST',
  TokenOutAscNullsLast = 'tokenOut_ASC_NULLS_LAST',
  TokenOutDesc = 'tokenOut_DESC',
  TokenOutDescNullsFirst = 'tokenOut_DESC_NULLS_FIRST',
  TokenOutDescNullsLast = 'tokenOut_DESC_NULLS_LAST',
  TransactorAsc = 'transactor_ASC',
  TransactorAscNullsFirst = 'transactor_ASC_NULLS_FIRST',
  TransactorAscNullsLast = 'transactor_ASC_NULLS_LAST',
  TransactorDesc = 'transactor_DESC',
  TransactorDescNullsFirst = 'transactor_DESC_NULLS_FIRST',
  TransactorDescNullsLast = 'transactor_DESC_NULLS_LAST',
  TxHashInAsc = 'txHashIn_ASC',
  TxHashInAscNullsFirst = 'txHashIn_ASC_NULLS_FIRST',
  TxHashInAscNullsLast = 'txHashIn_ASC_NULLS_LAST',
  TxHashInDesc = 'txHashIn_DESC',
  TxHashInDescNullsFirst = 'txHashIn_DESC_NULLS_FIRST',
  TxHashInDescNullsLast = 'txHashIn_DESC_NULLS_LAST',
  TxHashOutAsc = 'txHashOut_ASC',
  TxHashOutAscNullsFirst = 'txHashOut_ASC_NULLS_FIRST',
  TxHashOutAscNullsLast = 'txHashOut_ASC_NULLS_LAST',
  TxHashOutDesc = 'txHashOut_DESC',
  TxHashOutDescNullsFirst = 'txHashOut_DESC_NULLS_FIRST',
  TxHashOutDescNullsLast = 'txHashOut_DESC_NULLS_LAST'
}

export type BridgeTransferState = {
  __typename?: 'BridgeTransferState';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  state: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type BridgeTransferStateEdge = {
  __typename?: 'BridgeTransferStateEdge';
  cursor: Scalars['String']['output'];
  node: BridgeTransferState;
};

export enum BridgeTransferStateOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StateAsc = 'state_ASC',
  StateAscNullsFirst = 'state_ASC_NULLS_FIRST',
  StateAscNullsLast = 'state_ASC_NULLS_LAST',
  StateDesc = 'state_DESC',
  StateDescNullsFirst = 'state_DESC_NULLS_FIRST',
  StateDescNullsLast = 'state_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type BridgeTransferStateWhereInput = {
  AND?: InputMaybe<Array<BridgeTransferStateWhereInput>>;
  OR?: InputMaybe<Array<BridgeTransferStateWhereInput>>;
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
  state_eq?: InputMaybe<Scalars['Int']['input']>;
  state_gt?: InputMaybe<Scalars['Int']['input']>;
  state_gte?: InputMaybe<Scalars['Int']['input']>;
  state_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  state_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  state_lt?: InputMaybe<Scalars['Int']['input']>;
  state_lte?: InputMaybe<Scalars['Int']['input']>;
  state_not_eq?: InputMaybe<Scalars['Int']['input']>;
  state_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  state_eq?: InputMaybe<Scalars['Int']['input']>;
  state_gt?: InputMaybe<Scalars['Int']['input']>;
  state_gte?: InputMaybe<Scalars['Int']['input']>;
  state_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  state_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  state_lt?: InputMaybe<Scalars['Int']['input']>;
  state_lte?: InputMaybe<Scalars['Int']['input']>;
  state_not_eq?: InputMaybe<Scalars['Int']['input']>;
  state_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  transactor_contains?: InputMaybe<Scalars['String']['input']>;
  transactor_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  transactor_endsWith?: InputMaybe<Scalars['String']['input']>;
  transactor_eq?: InputMaybe<Scalars['String']['input']>;
  transactor_gt?: InputMaybe<Scalars['String']['input']>;
  transactor_gte?: InputMaybe<Scalars['String']['input']>;
  transactor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactor_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  transactor_lt?: InputMaybe<Scalars['String']['input']>;
  transactor_lte?: InputMaybe<Scalars['String']['input']>;
  transactor_not_contains?: InputMaybe<Scalars['String']['input']>;
  transactor_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  transactor_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  transactor_not_eq?: InputMaybe<Scalars['String']['input']>;
  transactor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  transactor_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  transactor_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHashIn_contains?: InputMaybe<Scalars['String']['input']>;
  txHashIn_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHashIn_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHashIn_eq?: InputMaybe<Scalars['String']['input']>;
  txHashIn_gt?: InputMaybe<Scalars['String']['input']>;
  txHashIn_gte?: InputMaybe<Scalars['String']['input']>;
  txHashIn_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHashIn_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHashIn_lt?: InputMaybe<Scalars['String']['input']>;
  txHashIn_lte?: InputMaybe<Scalars['String']['input']>;
  txHashIn_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHashIn_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHashIn_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHashIn_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHashIn_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHashIn_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHashIn_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHashOut_contains?: InputMaybe<Scalars['String']['input']>;
  txHashOut_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHashOut_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHashOut_eq?: InputMaybe<Scalars['String']['input']>;
  txHashOut_gt?: InputMaybe<Scalars['String']['input']>;
  txHashOut_gte?: InputMaybe<Scalars['String']['input']>;
  txHashOut_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHashOut_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txHashOut_lt?: InputMaybe<Scalars['String']['input']>;
  txHashOut_lte?: InputMaybe<Scalars['String']['input']>;
  txHashOut_not_contains?: InputMaybe<Scalars['String']['input']>;
  txHashOut_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txHashOut_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txHashOut_not_eq?: InputMaybe<Scalars['String']['input']>;
  txHashOut_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txHashOut_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txHashOut_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  Balance0Asc = 'balance0_ASC',
  Balance0AscNullsFirst = 'balance0_ASC_NULLS_FIRST',
  Balance0AscNullsLast = 'balance0_ASC_NULLS_LAST',
  Balance0Desc = 'balance0_DESC',
  Balance0DescNullsFirst = 'balance0_DESC_NULLS_FIRST',
  Balance0DescNullsLast = 'balance0_DESC_NULLS_LAST',
  Balance1Asc = 'balance1_ASC',
  Balance1AscNullsFirst = 'balance1_ASC_NULLS_FIRST',
  Balance1AscNullsLast = 'balance1_ASC_NULLS_LAST',
  Balance1Desc = 'balance1_DESC',
  Balance1DescNullsFirst = 'balance1_DESC_NULLS_FIRST',
  Balance1DescNullsLast = 'balance1_DESC_NULLS_LAST',
  Balance2Asc = 'balance2_ASC',
  Balance2AscNullsFirst = 'balance2_ASC_NULLS_FIRST',
  Balance2AscNullsLast = 'balance2_ASC_NULLS_LAST',
  Balance2Desc = 'balance2_DESC',
  Balance2DescNullsFirst = 'balance2_DESC_NULLS_FIRST',
  Balance2DescNullsLast = 'balance2_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  Token0Asc = 'token0_ASC',
  Token0AscNullsFirst = 'token0_ASC_NULLS_FIRST',
  Token0AscNullsLast = 'token0_ASC_NULLS_LAST',
  Token0Desc = 'token0_DESC',
  Token0DescNullsFirst = 'token0_DESC_NULLS_FIRST',
  Token0DescNullsLast = 'token0_DESC_NULLS_LAST',
  Token1Asc = 'token1_ASC',
  Token1AscNullsFirst = 'token1_ASC_NULLS_FIRST',
  Token1AscNullsLast = 'token1_ASC_NULLS_LAST',
  Token1Desc = 'token1_DESC',
  Token1DescNullsFirst = 'token1_DESC_NULLS_FIRST',
  Token1DescNullsLast = 'token1_DESC_NULLS_LAST',
  Token2Asc = 'token2_ASC',
  Token2AscNullsFirst = 'token2_ASC_NULLS_FIRST',
  Token2AscNullsLast = 'token2_ASC_NULLS_LAST',
  Token2Desc = 'token2_DESC',
  Token2DescNullsFirst = 'token2_DESC_NULLS_FIRST',
  Token2DescNullsLast = 'token2_DESC_NULLS_LAST',
  TokenCountAsc = 'tokenCount_ASC',
  TokenCountAscNullsFirst = 'tokenCount_ASC_NULLS_FIRST',
  TokenCountAscNullsLast = 'tokenCount_ASC_NULLS_LAST',
  TokenCountDesc = 'tokenCount_DESC',
  TokenCountDescNullsFirst = 'tokenCount_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  RateAsc = 'rate_ASC',
  RateAscNullsFirst = 'rate_ASC_NULLS_FIRST',
  RateAscNullsLast = 'rate_ASC_NULLS_LAST',
  RateDesc = 'rate_DESC',
  RateDescNullsFirst = 'rate_DESC_NULLS_FIRST',
  RateDescNullsLast = 'rate_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  chainId: Scalars['Int']['output'];
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
  chainId: Scalars['Int']['output'];
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
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  balance: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
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
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
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
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsAscNullsLast = 'decimals_ASC_NULLS_LAST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsFirst = 'decimals_DESC_NULLS_FIRST',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type Erc20State = {
  __typename?: 'ERC20State';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  HolderCountAsc = 'holderCount_ASC',
  HolderCountAscNullsFirst = 'holderCount_ASC_NULLS_FIRST',
  HolderCountAscNullsLast = 'holderCount_ASC_NULLS_LAST',
  HolderCountDesc = 'holderCount_DESC',
  HolderCountDescNullsFirst = 'holderCount_DESC_NULLS_FIRST',
  HolderCountDescNullsLast = 'holderCount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type Erc20Transfer = {
  __typename?: 'ERC20Transfer';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  from: Scalars['String']['output'];
  fromBalance: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  to: Scalars['String']['output'];
  toBalance: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  value: Scalars['BigInt']['output'];
};

export type Erc20TransferEdge = {
  __typename?: 'ERC20TransferEdge';
  cursor: Scalars['String']['output'];
  node: Erc20Transfer;
};

export enum Erc20TransferOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  FromBalanceAsc = 'fromBalance_ASC',
  FromBalanceAscNullsFirst = 'fromBalance_ASC_NULLS_FIRST',
  FromBalanceAscNullsLast = 'fromBalance_ASC_NULLS_LAST',
  FromBalanceDesc = 'fromBalance_DESC',
  FromBalanceDescNullsFirst = 'fromBalance_DESC_NULLS_FIRST',
  FromBalanceDescNullsLast = 'fromBalance_DESC_NULLS_LAST',
  FromAsc = 'from_ASC',
  FromAscNullsFirst = 'from_ASC_NULLS_FIRST',
  FromAscNullsLast = 'from_ASC_NULLS_LAST',
  FromDesc = 'from_DESC',
  FromDescNullsFirst = 'from_DESC_NULLS_FIRST',
  FromDescNullsLast = 'from_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToBalanceAsc = 'toBalance_ASC',
  ToBalanceAscNullsFirst = 'toBalance_ASC_NULLS_FIRST',
  ToBalanceAscNullsLast = 'toBalance_ASC_NULLS_LAST',
  ToBalanceDesc = 'toBalance_DESC',
  ToBalanceDescNullsFirst = 'toBalance_DESC_NULLS_FIRST',
  ToBalanceDescNullsLast = 'toBalance_DESC_NULLS_LAST',
  ToAsc = 'to_ASC',
  ToAscNullsFirst = 'to_ASC_NULLS_FIRST',
  ToAscNullsLast = 'to_ASC_NULLS_LAST',
  ToDesc = 'to_DESC',
  ToDescNullsFirst = 'to_DESC_NULLS_FIRST',
  ToDescNullsLast = 'to_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type Erc20TransferWhereInput = {
  AND?: InputMaybe<Array<Erc20TransferWhereInput>>;
  OR?: InputMaybe<Array<Erc20TransferWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  fromBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fromBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fromBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  from_contains?: InputMaybe<Scalars['String']['input']>;
  from_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_eq?: InputMaybe<Scalars['String']['input']>;
  from_gt?: InputMaybe<Scalars['String']['input']>;
  from_gte?: InputMaybe<Scalars['String']['input']>;
  from_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  from_lt?: InputMaybe<Scalars['String']['input']>;
  from_lte?: InputMaybe<Scalars['String']['input']>;
  from_not_contains?: InputMaybe<Scalars['String']['input']>;
  from_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  from_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  from_not_eq?: InputMaybe<Scalars['String']['input']>;
  from_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  from_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  from_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  toBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  toBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  toBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  to_contains?: InputMaybe<Scalars['String']['input']>;
  to_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_eq?: InputMaybe<Scalars['String']['input']>;
  to_gt?: InputMaybe<Scalars['String']['input']>;
  to_gte?: InputMaybe<Scalars['String']['input']>;
  to_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  to_lt?: InputMaybe<Scalars['String']['input']>;
  to_lte?: InputMaybe<Scalars['String']['input']>;
  to_not_contains?: InputMaybe<Scalars['String']['input']>;
  to_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  to_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  to_not_eq?: InputMaybe<Scalars['String']['input']>;
  to_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  to_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  to_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type Erc20TransfersConnection = {
  __typename?: 'ERC20TransfersConnection';
  edges: Array<Erc20TransferEdge>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type EsAccount = {
  __typename?: 'ESAccount';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  assetBalance: Scalars['BigInt']['output'];
  balance: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  delegateTo?: Maybe<EsAccount>;
  delegatesFrom: Array<EsAccount>;
  id: Scalars['String']['output'];
  stakedBalance: Scalars['BigInt']['output'];
  votingPower: Scalars['BigInt']['output'];
};


export type EsAccountDelegatesFromArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsAccountOrderByInput>>;
  where?: InputMaybe<EsAccountWhereInput>;
};

export type EsAccountEdge = {
  __typename?: 'ESAccountEdge';
  cursor: Scalars['String']['output'];
  node: EsAccount;
};

export enum EsAccountOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AssetBalanceAsc = 'assetBalance_ASC',
  AssetBalanceAscNullsFirst = 'assetBalance_ASC_NULLS_FIRST',
  AssetBalanceAscNullsLast = 'assetBalance_ASC_NULLS_LAST',
  AssetBalanceDesc = 'assetBalance_DESC',
  AssetBalanceDescNullsFirst = 'assetBalance_DESC_NULLS_FIRST',
  AssetBalanceDescNullsLast = 'assetBalance_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DelegateToAccountAsc = 'delegateTo_account_ASC',
  DelegateToAccountAscNullsFirst = 'delegateTo_account_ASC_NULLS_FIRST',
  DelegateToAccountAscNullsLast = 'delegateTo_account_ASC_NULLS_LAST',
  DelegateToAccountDesc = 'delegateTo_account_DESC',
  DelegateToAccountDescNullsFirst = 'delegateTo_account_DESC_NULLS_FIRST',
  DelegateToAccountDescNullsLast = 'delegateTo_account_DESC_NULLS_LAST',
  DelegateToAddressAsc = 'delegateTo_address_ASC',
  DelegateToAddressAscNullsFirst = 'delegateTo_address_ASC_NULLS_FIRST',
  DelegateToAddressAscNullsLast = 'delegateTo_address_ASC_NULLS_LAST',
  DelegateToAddressDesc = 'delegateTo_address_DESC',
  DelegateToAddressDescNullsFirst = 'delegateTo_address_DESC_NULLS_FIRST',
  DelegateToAddressDescNullsLast = 'delegateTo_address_DESC_NULLS_LAST',
  DelegateToAssetBalanceAsc = 'delegateTo_assetBalance_ASC',
  DelegateToAssetBalanceAscNullsFirst = 'delegateTo_assetBalance_ASC_NULLS_FIRST',
  DelegateToAssetBalanceAscNullsLast = 'delegateTo_assetBalance_ASC_NULLS_LAST',
  DelegateToAssetBalanceDesc = 'delegateTo_assetBalance_DESC',
  DelegateToAssetBalanceDescNullsFirst = 'delegateTo_assetBalance_DESC_NULLS_FIRST',
  DelegateToAssetBalanceDescNullsLast = 'delegateTo_assetBalance_DESC_NULLS_LAST',
  DelegateToBalanceAsc = 'delegateTo_balance_ASC',
  DelegateToBalanceAscNullsFirst = 'delegateTo_balance_ASC_NULLS_FIRST',
  DelegateToBalanceAscNullsLast = 'delegateTo_balance_ASC_NULLS_LAST',
  DelegateToBalanceDesc = 'delegateTo_balance_DESC',
  DelegateToBalanceDescNullsFirst = 'delegateTo_balance_DESC_NULLS_FIRST',
  DelegateToBalanceDescNullsLast = 'delegateTo_balance_DESC_NULLS_LAST',
  DelegateToChainIdAsc = 'delegateTo_chainId_ASC',
  DelegateToChainIdAscNullsFirst = 'delegateTo_chainId_ASC_NULLS_FIRST',
  DelegateToChainIdAscNullsLast = 'delegateTo_chainId_ASC_NULLS_LAST',
  DelegateToChainIdDesc = 'delegateTo_chainId_DESC',
  DelegateToChainIdDescNullsFirst = 'delegateTo_chainId_DESC_NULLS_FIRST',
  DelegateToChainIdDescNullsLast = 'delegateTo_chainId_DESC_NULLS_LAST',
  DelegateToIdAsc = 'delegateTo_id_ASC',
  DelegateToIdAscNullsFirst = 'delegateTo_id_ASC_NULLS_FIRST',
  DelegateToIdAscNullsLast = 'delegateTo_id_ASC_NULLS_LAST',
  DelegateToIdDesc = 'delegateTo_id_DESC',
  DelegateToIdDescNullsFirst = 'delegateTo_id_DESC_NULLS_FIRST',
  DelegateToIdDescNullsLast = 'delegateTo_id_DESC_NULLS_LAST',
  DelegateToStakedBalanceAsc = 'delegateTo_stakedBalance_ASC',
  DelegateToStakedBalanceAscNullsFirst = 'delegateTo_stakedBalance_ASC_NULLS_FIRST',
  DelegateToStakedBalanceAscNullsLast = 'delegateTo_stakedBalance_ASC_NULLS_LAST',
  DelegateToStakedBalanceDesc = 'delegateTo_stakedBalance_DESC',
  DelegateToStakedBalanceDescNullsFirst = 'delegateTo_stakedBalance_DESC_NULLS_FIRST',
  DelegateToStakedBalanceDescNullsLast = 'delegateTo_stakedBalance_DESC_NULLS_LAST',
  DelegateToVotingPowerAsc = 'delegateTo_votingPower_ASC',
  DelegateToVotingPowerAscNullsFirst = 'delegateTo_votingPower_ASC_NULLS_FIRST',
  DelegateToVotingPowerAscNullsLast = 'delegateTo_votingPower_ASC_NULLS_LAST',
  DelegateToVotingPowerDesc = 'delegateTo_votingPower_DESC',
  DelegateToVotingPowerDescNullsFirst = 'delegateTo_votingPower_DESC_NULLS_FIRST',
  DelegateToVotingPowerDescNullsLast = 'delegateTo_votingPower_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakedBalanceAsc = 'stakedBalance_ASC',
  StakedBalanceAscNullsFirst = 'stakedBalance_ASC_NULLS_FIRST',
  StakedBalanceAscNullsLast = 'stakedBalance_ASC_NULLS_LAST',
  StakedBalanceDesc = 'stakedBalance_DESC',
  StakedBalanceDescNullsFirst = 'stakedBalance_DESC_NULLS_FIRST',
  StakedBalanceDescNullsLast = 'stakedBalance_DESC_NULLS_LAST',
  VotingPowerAsc = 'votingPower_ASC',
  VotingPowerAscNullsFirst = 'votingPower_ASC_NULLS_FIRST',
  VotingPowerAscNullsLast = 'votingPower_ASC_NULLS_LAST',
  VotingPowerDesc = 'votingPower_DESC',
  VotingPowerDescNullsFirst = 'votingPower_DESC_NULLS_FIRST',
  VotingPowerDescNullsLast = 'votingPower_DESC_NULLS_LAST'
}

export type EsAccountWhereInput = {
  AND?: InputMaybe<Array<EsAccountWhereInput>>;
  OR?: InputMaybe<Array<EsAccountWhereInput>>;
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
  assetBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  assetBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegateTo?: InputMaybe<EsAccountWhereInput>;
  delegateTo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegatesFrom_every?: InputMaybe<EsAccountWhereInput>;
  delegatesFrom_none?: InputMaybe<EsAccountWhereInput>;
  delegatesFrom_some?: InputMaybe<EsAccountWhereInput>;
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
  stakedBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  stakedBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  stakedBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  stakedBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EsAccountsConnection = {
  __typename?: 'ESAccountsConnection';
  edges: Array<EsAccountEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsDelegateChanged = {
  __typename?: 'ESDelegateChanged';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  delegator: Scalars['String']['output'];
  fromDelegate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  toDelegate: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type EsDelegateChangedEdge = {
  __typename?: 'ESDelegateChangedEdge';
  cursor: Scalars['String']['output'];
  node: EsDelegateChanged;
};

export enum EsDelegateChangedOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DelegatorAsc = 'delegator_ASC',
  DelegatorAscNullsFirst = 'delegator_ASC_NULLS_FIRST',
  DelegatorAscNullsLast = 'delegator_ASC_NULLS_LAST',
  DelegatorDesc = 'delegator_DESC',
  DelegatorDescNullsFirst = 'delegator_DESC_NULLS_FIRST',
  DelegatorDescNullsLast = 'delegator_DESC_NULLS_LAST',
  FromDelegateAsc = 'fromDelegate_ASC',
  FromDelegateAscNullsFirst = 'fromDelegate_ASC_NULLS_FIRST',
  FromDelegateAscNullsLast = 'fromDelegate_ASC_NULLS_LAST',
  FromDelegateDesc = 'fromDelegate_DESC',
  FromDelegateDescNullsFirst = 'fromDelegate_DESC_NULLS_FIRST',
  FromDelegateDescNullsLast = 'fromDelegate_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToDelegateAsc = 'toDelegate_ASC',
  ToDelegateAscNullsFirst = 'toDelegate_ASC_NULLS_FIRST',
  ToDelegateAscNullsLast = 'toDelegate_ASC_NULLS_LAST',
  ToDelegateDesc = 'toDelegate_DESC',
  ToDelegateDescNullsFirst = 'toDelegate_DESC_NULLS_FIRST',
  ToDelegateDescNullsLast = 'toDelegate_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsDelegateChangedWhereInput = {
  AND?: InputMaybe<Array<EsDelegateChangedWhereInput>>;
  OR?: InputMaybe<Array<EsDelegateChangedWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegator_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegator_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegator_eq?: InputMaybe<Scalars['String']['input']>;
  delegator_gt?: InputMaybe<Scalars['String']['input']>;
  delegator_gte?: InputMaybe<Scalars['String']['input']>;
  delegator_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegator_lt?: InputMaybe<Scalars['String']['input']>;
  delegator_lte?: InputMaybe<Scalars['String']['input']>;
  delegator_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegator_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegator_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegator_not_eq?: InputMaybe<Scalars['String']['input']>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegator_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  delegator_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_contains?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_eq?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_gt?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_gte?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromDelegate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromDelegate_lt?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_lte?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_eq?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fromDelegate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromDelegate_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  toDelegate_contains?: InputMaybe<Scalars['String']['input']>;
  toDelegate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toDelegate_endsWith?: InputMaybe<Scalars['String']['input']>;
  toDelegate_eq?: InputMaybe<Scalars['String']['input']>;
  toDelegate_gt?: InputMaybe<Scalars['String']['input']>;
  toDelegate_gte?: InputMaybe<Scalars['String']['input']>;
  toDelegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toDelegate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  toDelegate_lt?: InputMaybe<Scalars['String']['input']>;
  toDelegate_lte?: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_eq?: InputMaybe<Scalars['String']['input']>;
  toDelegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  toDelegate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  toDelegate_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type EsDelegateChangedsConnection = {
  __typename?: 'ESDelegateChangedsConnection';
  edges: Array<EsDelegateChangedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsDelegateVotesChanged = {
  __typename?: 'ESDelegateVotesChanged';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  delegate: Scalars['String']['output'];
  id: Scalars['String']['output'];
  newBalance: Scalars['BigInt']['output'];
  previousBalance: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsDelegateVotesChangedEdge = {
  __typename?: 'ESDelegateVotesChangedEdge';
  cursor: Scalars['String']['output'];
  node: EsDelegateVotesChanged;
};

export enum EsDelegateVotesChangedOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DelegateAsc = 'delegate_ASC',
  DelegateAscNullsFirst = 'delegate_ASC_NULLS_FIRST',
  DelegateAscNullsLast = 'delegate_ASC_NULLS_LAST',
  DelegateDesc = 'delegate_DESC',
  DelegateDescNullsFirst = 'delegate_DESC_NULLS_FIRST',
  DelegateDescNullsLast = 'delegate_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NewBalanceAsc = 'newBalance_ASC',
  NewBalanceAscNullsFirst = 'newBalance_ASC_NULLS_FIRST',
  NewBalanceAscNullsLast = 'newBalance_ASC_NULLS_LAST',
  NewBalanceDesc = 'newBalance_DESC',
  NewBalanceDescNullsFirst = 'newBalance_DESC_NULLS_FIRST',
  NewBalanceDescNullsLast = 'newBalance_DESC_NULLS_LAST',
  PreviousBalanceAsc = 'previousBalance_ASC',
  PreviousBalanceAscNullsFirst = 'previousBalance_ASC_NULLS_FIRST',
  PreviousBalanceAscNullsLast = 'previousBalance_ASC_NULLS_LAST',
  PreviousBalanceDesc = 'previousBalance_DESC',
  PreviousBalanceDescNullsFirst = 'previousBalance_DESC_NULLS_FIRST',
  PreviousBalanceDescNullsLast = 'previousBalance_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsDelegateVotesChangedWhereInput = {
  AND?: InputMaybe<Array<EsDelegateVotesChangedWhereInput>>;
  OR?: InputMaybe<Array<EsDelegateVotesChangedWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegate_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegate_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegate_eq?: InputMaybe<Scalars['String']['input']>;
  delegate_gt?: InputMaybe<Scalars['String']['input']>;
  delegate_gte?: InputMaybe<Scalars['String']['input']>;
  delegate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegate_lt?: InputMaybe<Scalars['String']['input']>;
  delegate_lte?: InputMaybe<Scalars['String']['input']>;
  delegate_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegate_not_eq?: InputMaybe<Scalars['String']['input']>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  delegate_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  newBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  previousBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  previousBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  previousBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  previousBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EsDelegateVotesChangedsConnection = {
  __typename?: 'ESDelegateVotesChangedsConnection';
  edges: Array<EsDelegateVotesChangedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsLockup = {
  __typename?: 'ESLockup';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  end: Scalars['DateTime']['output'];
  events: Array<EsLockupEvent>;
  id: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  lockupId: Scalars['BigInt']['output'];
  penalty: Scalars['BigInt']['output'];
  points: Scalars['BigInt']['output'];
  state?: Maybe<EsLockupState>;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  withdrawAmount: Scalars['BigInt']['output'];
};


export type EsLockupEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsLockupEventOrderByInput>>;
  where?: InputMaybe<EsLockupEventWhereInput>;
};

export type EsLockupEdge = {
  __typename?: 'ESLockupEdge';
  cursor: Scalars['String']['output'];
  node: EsLockup;
};

export type EsLockupEvent = {
  __typename?: 'ESLockupEvent';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  event: EsLockupEventType;
  id: Scalars['String']['output'];
  lockup: EsLockup;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsLockupEventEdge = {
  __typename?: 'ESLockupEventEdge';
  cursor: Scalars['String']['output'];
  node: EsLockupEvent;
};

export enum EsLockupEventOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EventAsc = 'event_ASC',
  EventAscNullsFirst = 'event_ASC_NULLS_FIRST',
  EventAscNullsLast = 'event_ASC_NULLS_LAST',
  EventDesc = 'event_DESC',
  EventDescNullsFirst = 'event_DESC_NULLS_FIRST',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockupAccountAsc = 'lockup_account_ASC',
  LockupAccountAscNullsFirst = 'lockup_account_ASC_NULLS_FIRST',
  LockupAccountAscNullsLast = 'lockup_account_ASC_NULLS_LAST',
  LockupAccountDesc = 'lockup_account_DESC',
  LockupAccountDescNullsFirst = 'lockup_account_DESC_NULLS_FIRST',
  LockupAccountDescNullsLast = 'lockup_account_DESC_NULLS_LAST',
  LockupAddressAsc = 'lockup_address_ASC',
  LockupAddressAscNullsFirst = 'lockup_address_ASC_NULLS_FIRST',
  LockupAddressAscNullsLast = 'lockup_address_ASC_NULLS_LAST',
  LockupAddressDesc = 'lockup_address_DESC',
  LockupAddressDescNullsFirst = 'lockup_address_DESC_NULLS_FIRST',
  LockupAddressDescNullsLast = 'lockup_address_DESC_NULLS_LAST',
  LockupAmountAsc = 'lockup_amount_ASC',
  LockupAmountAscNullsFirst = 'lockup_amount_ASC_NULLS_FIRST',
  LockupAmountAscNullsLast = 'lockup_amount_ASC_NULLS_LAST',
  LockupAmountDesc = 'lockup_amount_DESC',
  LockupAmountDescNullsFirst = 'lockup_amount_DESC_NULLS_FIRST',
  LockupAmountDescNullsLast = 'lockup_amount_DESC_NULLS_LAST',
  LockupChainIdAsc = 'lockup_chainId_ASC',
  LockupChainIdAscNullsFirst = 'lockup_chainId_ASC_NULLS_FIRST',
  LockupChainIdAscNullsLast = 'lockup_chainId_ASC_NULLS_LAST',
  LockupChainIdDesc = 'lockup_chainId_DESC',
  LockupChainIdDescNullsFirst = 'lockup_chainId_DESC_NULLS_FIRST',
  LockupChainIdDescNullsLast = 'lockup_chainId_DESC_NULLS_LAST',
  LockupEndAsc = 'lockup_end_ASC',
  LockupEndAscNullsFirst = 'lockup_end_ASC_NULLS_FIRST',
  LockupEndAscNullsLast = 'lockup_end_ASC_NULLS_LAST',
  LockupEndDesc = 'lockup_end_DESC',
  LockupEndDescNullsFirst = 'lockup_end_DESC_NULLS_FIRST',
  LockupEndDescNullsLast = 'lockup_end_DESC_NULLS_LAST',
  LockupIdAsc = 'lockup_id_ASC',
  LockupIdAscNullsFirst = 'lockup_id_ASC_NULLS_FIRST',
  LockupIdAscNullsLast = 'lockup_id_ASC_NULLS_LAST',
  LockupIdDesc = 'lockup_id_DESC',
  LockupIdDescNullsFirst = 'lockup_id_DESC_NULLS_FIRST',
  LockupIdDescNullsLast = 'lockup_id_DESC_NULLS_LAST',
  LockupLastUpdatedAsc = 'lockup_lastUpdated_ASC',
  LockupLastUpdatedAscNullsFirst = 'lockup_lastUpdated_ASC_NULLS_FIRST',
  LockupLastUpdatedAscNullsLast = 'lockup_lastUpdated_ASC_NULLS_LAST',
  LockupLastUpdatedDesc = 'lockup_lastUpdated_DESC',
  LockupLastUpdatedDescNullsFirst = 'lockup_lastUpdated_DESC_NULLS_FIRST',
  LockupLastUpdatedDescNullsLast = 'lockup_lastUpdated_DESC_NULLS_LAST',
  LockupLockupIdAsc = 'lockup_lockupId_ASC',
  LockupLockupIdAscNullsFirst = 'lockup_lockupId_ASC_NULLS_FIRST',
  LockupLockupIdAscNullsLast = 'lockup_lockupId_ASC_NULLS_LAST',
  LockupLockupIdDesc = 'lockup_lockupId_DESC',
  LockupLockupIdDescNullsFirst = 'lockup_lockupId_DESC_NULLS_FIRST',
  LockupLockupIdDescNullsLast = 'lockup_lockupId_DESC_NULLS_LAST',
  LockupPenaltyAsc = 'lockup_penalty_ASC',
  LockupPenaltyAscNullsFirst = 'lockup_penalty_ASC_NULLS_FIRST',
  LockupPenaltyAscNullsLast = 'lockup_penalty_ASC_NULLS_LAST',
  LockupPenaltyDesc = 'lockup_penalty_DESC',
  LockupPenaltyDescNullsFirst = 'lockup_penalty_DESC_NULLS_FIRST',
  LockupPenaltyDescNullsLast = 'lockup_penalty_DESC_NULLS_LAST',
  LockupPointsAsc = 'lockup_points_ASC',
  LockupPointsAscNullsFirst = 'lockup_points_ASC_NULLS_FIRST',
  LockupPointsAscNullsLast = 'lockup_points_ASC_NULLS_LAST',
  LockupPointsDesc = 'lockup_points_DESC',
  LockupPointsDescNullsFirst = 'lockup_points_DESC_NULLS_FIRST',
  LockupPointsDescNullsLast = 'lockup_points_DESC_NULLS_LAST',
  LockupStateAsc = 'lockup_state_ASC',
  LockupStateAscNullsFirst = 'lockup_state_ASC_NULLS_FIRST',
  LockupStateAscNullsLast = 'lockup_state_ASC_NULLS_LAST',
  LockupStateDesc = 'lockup_state_DESC',
  LockupStateDescNullsFirst = 'lockup_state_DESC_NULLS_FIRST',
  LockupStateDescNullsLast = 'lockup_state_DESC_NULLS_LAST',
  LockupTimestampAsc = 'lockup_timestamp_ASC',
  LockupTimestampAscNullsFirst = 'lockup_timestamp_ASC_NULLS_FIRST',
  LockupTimestampAscNullsLast = 'lockup_timestamp_ASC_NULLS_LAST',
  LockupTimestampDesc = 'lockup_timestamp_DESC',
  LockupTimestampDescNullsFirst = 'lockup_timestamp_DESC_NULLS_FIRST',
  LockupTimestampDescNullsLast = 'lockup_timestamp_DESC_NULLS_LAST',
  LockupTxHashAsc = 'lockup_txHash_ASC',
  LockupTxHashAscNullsFirst = 'lockup_txHash_ASC_NULLS_FIRST',
  LockupTxHashAscNullsLast = 'lockup_txHash_ASC_NULLS_LAST',
  LockupTxHashDesc = 'lockup_txHash_DESC',
  LockupTxHashDescNullsFirst = 'lockup_txHash_DESC_NULLS_FIRST',
  LockupTxHashDescNullsLast = 'lockup_txHash_DESC_NULLS_LAST',
  LockupWithdrawAmountAsc = 'lockup_withdrawAmount_ASC',
  LockupWithdrawAmountAscNullsFirst = 'lockup_withdrawAmount_ASC_NULLS_FIRST',
  LockupWithdrawAmountAscNullsLast = 'lockup_withdrawAmount_ASC_NULLS_LAST',
  LockupWithdrawAmountDesc = 'lockup_withdrawAmount_DESC',
  LockupWithdrawAmountDescNullsFirst = 'lockup_withdrawAmount_DESC_NULLS_FIRST',
  LockupWithdrawAmountDescNullsLast = 'lockup_withdrawAmount_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export enum EsLockupEventType {
  Extended = 'Extended',
  Staked = 'Staked',
  Unstaked = 'Unstaked'
}

export type EsLockupEventWhereInput = {
  AND?: InputMaybe<Array<EsLockupEventWhereInput>>;
  OR?: InputMaybe<Array<EsLockupEventWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  event_eq?: InputMaybe<EsLockupEventType>;
  event_in?: InputMaybe<Array<EsLockupEventType>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event_not_eq?: InputMaybe<EsLockupEventType>;
  event_not_in?: InputMaybe<Array<EsLockupEventType>>;
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
  lockup?: InputMaybe<EsLockupWhereInput>;
  lockup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type EsLockupEventsConnection = {
  __typename?: 'ESLockupEventsConnection';
  edges: Array<EsLockupEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum EsLockupOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndAscNullsLast = 'end_ASC_NULLS_LAST',
  EndDesc = 'end_DESC',
  EndDescNullsFirst = 'end_DESC_NULLS_FIRST',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  LockupIdAsc = 'lockupId_ASC',
  LockupIdAscNullsFirst = 'lockupId_ASC_NULLS_FIRST',
  LockupIdAscNullsLast = 'lockupId_ASC_NULLS_LAST',
  LockupIdDesc = 'lockupId_DESC',
  LockupIdDescNullsFirst = 'lockupId_DESC_NULLS_FIRST',
  LockupIdDescNullsLast = 'lockupId_DESC_NULLS_LAST',
  PenaltyAsc = 'penalty_ASC',
  PenaltyAscNullsFirst = 'penalty_ASC_NULLS_FIRST',
  PenaltyAscNullsLast = 'penalty_ASC_NULLS_LAST',
  PenaltyDesc = 'penalty_DESC',
  PenaltyDescNullsFirst = 'penalty_DESC_NULLS_FIRST',
  PenaltyDescNullsLast = 'penalty_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsAscNullsLast = 'points_ASC_NULLS_LAST',
  PointsDesc = 'points_DESC',
  PointsDescNullsFirst = 'points_DESC_NULLS_FIRST',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  StateAsc = 'state_ASC',
  StateAscNullsFirst = 'state_ASC_NULLS_FIRST',
  StateAscNullsLast = 'state_ASC_NULLS_LAST',
  StateDesc = 'state_DESC',
  StateDescNullsFirst = 'state_DESC_NULLS_FIRST',
  StateDescNullsLast = 'state_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  WithdrawAmountAsc = 'withdrawAmount_ASC',
  WithdrawAmountAscNullsFirst = 'withdrawAmount_ASC_NULLS_FIRST',
  WithdrawAmountAscNullsLast = 'withdrawAmount_ASC_NULLS_LAST',
  WithdrawAmountDesc = 'withdrawAmount_DESC',
  WithdrawAmountDescNullsFirst = 'withdrawAmount_DESC_NULLS_FIRST',
  WithdrawAmountDescNullsLast = 'withdrawAmount_DESC_NULLS_LAST'
}

export enum EsLockupState {
  Closed = 'Closed',
  Open = 'Open'
}

export type EsLockupWhereInput = {
  AND?: InputMaybe<Array<EsLockupWhereInput>>;
  OR?: InputMaybe<Array<EsLockupWhereInput>>;
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
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  end_eq?: InputMaybe<Scalars['DateTime']['input']>;
  end_gt?: InputMaybe<Scalars['DateTime']['input']>;
  end_gte?: InputMaybe<Scalars['DateTime']['input']>;
  end_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  end_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_lt?: InputMaybe<Scalars['DateTime']['input']>;
  end_lte?: InputMaybe<Scalars['DateTime']['input']>;
  end_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  end_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  events_every?: InputMaybe<EsLockupEventWhereInput>;
  events_none?: InputMaybe<EsLockupEventWhereInput>;
  events_some?: InputMaybe<EsLockupEventWhereInput>;
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
  lockupId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockupId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockupId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  penalty_eq?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_gt?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_gte?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  penalty_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  penalty_lt?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_lte?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  penalty_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  state_eq?: InputMaybe<EsLockupState>;
  state_in?: InputMaybe<Array<EsLockupState>>;
  state_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  state_not_eq?: InputMaybe<EsLockupState>;
  state_not_in?: InputMaybe<Array<EsLockupState>>;
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
  withdrawAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type EsLockupsConnection = {
  __typename?: 'ESLockupsConnection';
  edges: Array<EsLockupEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsPenaltiesConnection = {
  __typename?: 'ESPenaltiesConnection';
  edges: Array<EsPenaltyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsPenalty = {
  __typename?: 'ESPenalty';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsPenaltyEdge = {
  __typename?: 'ESPenaltyEdge';
  cursor: Scalars['String']['output'];
  node: EsPenalty;
};

export enum EsPenaltyOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsPenaltyWhereInput = {
  AND?: InputMaybe<Array<EsPenaltyWhereInput>>;
  OR?: InputMaybe<Array<EsPenaltyWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
};

export type EsReward = {
  __typename?: 'ESReward';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsRewardEdge = {
  __typename?: 'ESRewardEdge';
  cursor: Scalars['String']['output'];
  node: EsReward;
};

export enum EsRewardOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsRewardWhereInput = {
  AND?: InputMaybe<Array<EsRewardWhereInput>>;
  OR?: InputMaybe<Array<EsRewardWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
};

export type EsRewardsConnection = {
  __typename?: 'ESRewardsConnection';
  edges: Array<EsRewardEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsStake = {
  __typename?: 'ESStake';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  end: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lockupId: Scalars['BigInt']['output'];
  points: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsStakeEdge = {
  __typename?: 'ESStakeEdge';
  cursor: Scalars['String']['output'];
  node: EsStake;
};

export enum EsStakeOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndAscNullsLast = 'end_ASC_NULLS_LAST',
  EndDesc = 'end_DESC',
  EndDescNullsFirst = 'end_DESC_NULLS_FIRST',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockupIdAsc = 'lockupId_ASC',
  LockupIdAscNullsFirst = 'lockupId_ASC_NULLS_FIRST',
  LockupIdAscNullsLast = 'lockupId_ASC_NULLS_LAST',
  LockupIdDesc = 'lockupId_DESC',
  LockupIdDescNullsFirst = 'lockupId_DESC_NULLS_FIRST',
  LockupIdDescNullsLast = 'lockupId_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsAscNullsLast = 'points_ASC_NULLS_LAST',
  PointsDesc = 'points_DESC',
  PointsDescNullsFirst = 'points_DESC_NULLS_FIRST',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsStakeWhereInput = {
  AND?: InputMaybe<Array<EsStakeWhereInput>>;
  OR?: InputMaybe<Array<EsStakeWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  end_eq?: InputMaybe<Scalars['BigInt']['input']>;
  end_gt?: InputMaybe<Scalars['BigInt']['input']>;
  end_gte?: InputMaybe<Scalars['BigInt']['input']>;
  end_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  end_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_lt?: InputMaybe<Scalars['BigInt']['input']>;
  end_lte?: InputMaybe<Scalars['BigInt']['input']>;
  end_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  end_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  lockupId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockupId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockupId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EsStakesConnection = {
  __typename?: 'ESStakesConnection';
  edges: Array<EsStakeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsToken = {
  __typename?: 'ESToken';
  blockNumber: Scalars['Int']['output'];
  circulating: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  staked: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  total: Scalars['BigInt']['output'];
};

export type EsTokenEdge = {
  __typename?: 'ESTokenEdge';
  cursor: Scalars['String']['output'];
  node: EsToken;
};

export enum EsTokenOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CirculatingAsc = 'circulating_ASC',
  CirculatingAscNullsFirst = 'circulating_ASC_NULLS_FIRST',
  CirculatingAscNullsLast = 'circulating_ASC_NULLS_LAST',
  CirculatingDesc = 'circulating_DESC',
  CirculatingDescNullsFirst = 'circulating_DESC_NULLS_FIRST',
  CirculatingDescNullsLast = 'circulating_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedAscNullsLast = 'staked_ASC_NULLS_LAST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsFirst = 'staked_DESC_NULLS_FIRST',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalAscNullsLast = 'total_ASC_NULLS_LAST',
  TotalDesc = 'total_DESC',
  TotalDescNullsFirst = 'total_DESC_NULLS_FIRST',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST'
}

export type EsTokenWhereInput = {
  AND?: InputMaybe<Array<EsTokenWhereInput>>;
  OR?: InputMaybe<Array<EsTokenWhereInput>>;
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

export type EsTokensConnection = {
  __typename?: 'ESTokensConnection';
  edges: Array<EsTokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsUnstake = {
  __typename?: 'ESUnstake';
  account: Scalars['String']['output'];
  address: Scalars['String']['output'];
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  end: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  lockupId: Scalars['BigInt']['output'];
  points: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type EsUnstakeEdge = {
  __typename?: 'ESUnstakeEdge';
  cursor: Scalars['String']['output'];
  node: EsUnstake;
};

export enum EsUnstakeOrderByInput {
  AccountAsc = 'account_ASC',
  AccountAscNullsFirst = 'account_ASC_NULLS_FIRST',
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndAscNullsLast = 'end_ASC_NULLS_LAST',
  EndDesc = 'end_DESC',
  EndDescNullsFirst = 'end_DESC_NULLS_FIRST',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockupIdAsc = 'lockupId_ASC',
  LockupIdAscNullsFirst = 'lockupId_ASC_NULLS_FIRST',
  LockupIdAscNullsLast = 'lockupId_ASC_NULLS_LAST',
  LockupIdDesc = 'lockupId_DESC',
  LockupIdDescNullsFirst = 'lockupId_DESC_NULLS_FIRST',
  LockupIdDescNullsLast = 'lockupId_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsAscNullsLast = 'points_ASC_NULLS_LAST',
  PointsDesc = 'points_DESC',
  PointsDescNullsFirst = 'points_DESC_NULLS_FIRST',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type EsUnstakeWhereInput = {
  AND?: InputMaybe<Array<EsUnstakeWhereInput>>;
  OR?: InputMaybe<Array<EsUnstakeWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  end_eq?: InputMaybe<Scalars['BigInt']['input']>;
  end_gt?: InputMaybe<Scalars['BigInt']['input']>;
  end_gte?: InputMaybe<Scalars['BigInt']['input']>;
  end_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  end_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  end_lt?: InputMaybe<Scalars['BigInt']['input']>;
  end_lte?: InputMaybe<Scalars['BigInt']['input']>;
  end_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  end_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  lockupId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  lockupId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lockupId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  lockupId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EsUnstakesConnection = {
  __typename?: 'ESUnstakesConnection';
  edges: Array<EsUnstakeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EsYield = {
  __typename?: 'ESYield';
  address: Scalars['String']['output'];
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  assetBalance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  rewardsPerSecond: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type EsYieldEdge = {
  __typename?: 'ESYieldEdge';
  cursor: Scalars['String']['output'];
  node: EsYield;
};

export enum EsYieldOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  AssetBalanceAsc = 'assetBalance_ASC',
  AssetBalanceAscNullsFirst = 'assetBalance_ASC_NULLS_FIRST',
  AssetBalanceAscNullsLast = 'assetBalance_ASC_NULLS_LAST',
  AssetBalanceDesc = 'assetBalance_DESC',
  AssetBalanceDescNullsFirst = 'assetBalance_DESC_NULLS_FIRST',
  AssetBalanceDescNullsLast = 'assetBalance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RewardsPerSecondAsc = 'rewardsPerSecond_ASC',
  RewardsPerSecondAscNullsFirst = 'rewardsPerSecond_ASC_NULLS_FIRST',
  RewardsPerSecondAscNullsLast = 'rewardsPerSecond_ASC_NULLS_LAST',
  RewardsPerSecondDesc = 'rewardsPerSecond_DESC',
  RewardsPerSecondDescNullsFirst = 'rewardsPerSecond_DESC_NULLS_FIRST',
  RewardsPerSecondDescNullsLast = 'rewardsPerSecond_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type EsYieldWhereInput = {
  AND?: InputMaybe<Array<EsYieldWhereInput>>;
  OR?: InputMaybe<Array<EsYieldWhereInput>>;
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
  assetBalance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetBalance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  assetBalance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetBalance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  rewardsPerSecond_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardsPerSecond_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsPerSecond_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rewardsPerSecond_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type EsYieldsConnection = {
  __typename?: 'ESYieldsConnection';
  edges: Array<EsYieldEdge>;
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
  BaseAscNullsLast = 'base_ASC_NULLS_LAST',
  BaseDesc = 'base_DESC',
  BaseDescNullsFirst = 'base_DESC_NULLS_FIRST',
  BaseDescNullsLast = 'base_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PairAsc = 'pair_ASC',
  PairAscNullsFirst = 'pair_ASC_NULLS_FIRST',
  PairAscNullsLast = 'pair_ASC_NULLS_LAST',
  PairDesc = 'pair_DESC',
  PairDescNullsFirst = 'pair_DESC_NULLS_FIRST',
  PairDescNullsLast = 'pair_DESC_NULLS_LAST',
  QuoteAsc = 'quote_ASC',
  QuoteAscNullsFirst = 'quote_ASC_NULLS_FIRST',
  QuoteAscNullsLast = 'quote_ASC_NULLS_LAST',
  QuoteDesc = 'quote_DESC',
  QuoteDescNullsFirst = 'quote_DESC_NULLS_FIRST',
  QuoteDescNullsLast = 'quote_DESC_NULLS_LAST',
  RateAsc = 'rate_ASC',
  RateAscNullsFirst = 'rate_ASC_NULLS_FIRST',
  RateAscNullsLast = 'rate_ASC_NULLS_LAST',
  RateDesc = 'rate_DESC',
  RateDescNullsFirst = 'rate_DESC_NULLS_FIRST',
  RateDescNullsLast = 'rate_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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

export type FrrsRewardCollected = {
  __typename?: 'FRRSRewardCollected';
  address: Scalars['String']['output'];
  amountCollected: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type FrrsRewardCollectedEdge = {
  __typename?: 'FRRSRewardCollectedEdge';
  cursor: Scalars['String']['output'];
  node: FrrsRewardCollected;
};

export enum FrrsRewardCollectedOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountCollectedAsc = 'amountCollected_ASC',
  AmountCollectedAscNullsFirst = 'amountCollected_ASC_NULLS_FIRST',
  AmountCollectedAscNullsLast = 'amountCollected_ASC_NULLS_LAST',
  AmountCollectedDesc = 'amountCollected_DESC',
  AmountCollectedDescNullsFirst = 'amountCollected_DESC_NULLS_FIRST',
  AmountCollectedDescNullsLast = 'amountCollected_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type FrrsRewardCollectedWhereInput = {
  AND?: InputMaybe<Array<FrrsRewardCollectedWhereInput>>;
  OR?: InputMaybe<Array<FrrsRewardCollectedWhereInput>>;
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
  amountCollected_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountCollected_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountCollected_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountCollected_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
};

export type FrrsRewardCollectedsConnection = {
  __typename?: 'FRRSRewardCollectedsConnection';
  edges: Array<FrrsRewardCollectedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FrrsRewardsPerSecondChanged = {
  __typename?: 'FRRSRewardsPerSecondChanged';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  newRPS: Scalars['BigInt']['output'];
  oldRPS: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type FrrsRewardsPerSecondChangedEdge = {
  __typename?: 'FRRSRewardsPerSecondChangedEdge';
  cursor: Scalars['String']['output'];
  node: FrrsRewardsPerSecondChanged;
};

export enum FrrsRewardsPerSecondChangedOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NewRpsAsc = 'newRPS_ASC',
  NewRpsAscNullsFirst = 'newRPS_ASC_NULLS_FIRST',
  NewRpsAscNullsLast = 'newRPS_ASC_NULLS_LAST',
  NewRpsDesc = 'newRPS_DESC',
  NewRpsDescNullsFirst = 'newRPS_DESC_NULLS_FIRST',
  NewRpsDescNullsLast = 'newRPS_DESC_NULLS_LAST',
  OldRpsAsc = 'oldRPS_ASC',
  OldRpsAscNullsFirst = 'oldRPS_ASC_NULLS_FIRST',
  OldRpsAscNullsLast = 'oldRPS_ASC_NULLS_LAST',
  OldRpsDesc = 'oldRPS_DESC',
  OldRpsDescNullsFirst = 'oldRPS_DESC_NULLS_FIRST',
  OldRpsDescNullsLast = 'oldRPS_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type FrrsRewardsPerSecondChangedWhereInput = {
  AND?: InputMaybe<Array<FrrsRewardsPerSecondChangedWhereInput>>;
  OR?: InputMaybe<Array<FrrsRewardsPerSecondChangedWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  newRPS_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_gt?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_gte?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  newRPS_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  newRPS_lt?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_lte?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  newRPS_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldRPS_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_gt?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_gte?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  oldRPS_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  oldRPS_lt?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_lte?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  oldRPS_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type FrrsRewardsPerSecondChangedsConnection = {
  __typename?: 'FRRSRewardsPerSecondChangedsConnection';
  edges: Array<FrrsRewardsPerSecondChangedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FrrsRewardsTargetChange = {
  __typename?: 'FRRSRewardsTargetChange';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  previousTarget: Scalars['String']['output'];
  target: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type FrrsRewardsTargetChangeEdge = {
  __typename?: 'FRRSRewardsTargetChangeEdge';
  cursor: Scalars['String']['output'];
  node: FrrsRewardsTargetChange;
};

export enum FrrsRewardsTargetChangeOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PreviousTargetAsc = 'previousTarget_ASC',
  PreviousTargetAscNullsFirst = 'previousTarget_ASC_NULLS_FIRST',
  PreviousTargetAscNullsLast = 'previousTarget_ASC_NULLS_LAST',
  PreviousTargetDesc = 'previousTarget_DESC',
  PreviousTargetDescNullsFirst = 'previousTarget_DESC_NULLS_FIRST',
  PreviousTargetDescNullsLast = 'previousTarget_DESC_NULLS_LAST',
  TargetAsc = 'target_ASC',
  TargetAscNullsFirst = 'target_ASC_NULLS_FIRST',
  TargetAscNullsLast = 'target_ASC_NULLS_LAST',
  TargetDesc = 'target_DESC',
  TargetDescNullsFirst = 'target_DESC_NULLS_FIRST',
  TargetDescNullsLast = 'target_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type FrrsRewardsTargetChangeWhereInput = {
  AND?: InputMaybe<Array<FrrsRewardsTargetChangeWhereInput>>;
  OR?: InputMaybe<Array<FrrsRewardsTargetChangeWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  previousTarget_contains?: InputMaybe<Scalars['String']['input']>;
  previousTarget_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  previousTarget_endsWith?: InputMaybe<Scalars['String']['input']>;
  previousTarget_eq?: InputMaybe<Scalars['String']['input']>;
  previousTarget_gt?: InputMaybe<Scalars['String']['input']>;
  previousTarget_gte?: InputMaybe<Scalars['String']['input']>;
  previousTarget_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousTarget_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  previousTarget_lt?: InputMaybe<Scalars['String']['input']>;
  previousTarget_lte?: InputMaybe<Scalars['String']['input']>;
  previousTarget_not_contains?: InputMaybe<Scalars['String']['input']>;
  previousTarget_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  previousTarget_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  previousTarget_not_eq?: InputMaybe<Scalars['String']['input']>;
  previousTarget_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  previousTarget_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  previousTarget_startsWith?: InputMaybe<Scalars['String']['input']>;
  target_contains?: InputMaybe<Scalars['String']['input']>;
  target_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  target_endsWith?: InputMaybe<Scalars['String']['input']>;
  target_eq?: InputMaybe<Scalars['String']['input']>;
  target_gt?: InputMaybe<Scalars['String']['input']>;
  target_gte?: InputMaybe<Scalars['String']['input']>;
  target_in?: InputMaybe<Array<Scalars['String']['input']>>;
  target_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  target_lt?: InputMaybe<Scalars['String']['input']>;
  target_lte?: InputMaybe<Scalars['String']['input']>;
  target_not_contains?: InputMaybe<Scalars['String']['input']>;
  target_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  target_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  target_not_eq?: InputMaybe<Scalars['String']['input']>;
  target_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  target_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  target_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type FrrsRewardsTargetChangesConnection = {
  __typename?: 'FRRSRewardsTargetChangesConnection';
  edges: Array<FrrsRewardsTargetChangeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FrrsStrategistUpdated = {
  __typename?: 'FRRSStrategistUpdated';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  strategistAddress: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type FrrsStrategistUpdatedEdge = {
  __typename?: 'FRRSStrategistUpdatedEdge';
  cursor: Scalars['String']['output'];
  node: FrrsStrategistUpdated;
};

export enum FrrsStrategistUpdatedOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategistAddressAsc = 'strategistAddress_ASC',
  StrategistAddressAscNullsFirst = 'strategistAddress_ASC_NULLS_FIRST',
  StrategistAddressAscNullsLast = 'strategistAddress_ASC_NULLS_LAST',
  StrategistAddressDesc = 'strategistAddress_DESC',
  StrategistAddressDescNullsFirst = 'strategistAddress_DESC_NULLS_FIRST',
  StrategistAddressDescNullsLast = 'strategistAddress_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type FrrsStrategistUpdatedWhereInput = {
  AND?: InputMaybe<Array<FrrsStrategistUpdatedWhereInput>>;
  OR?: InputMaybe<Array<FrrsStrategistUpdatedWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  strategistAddress_contains?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_eq?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_gt?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_gte?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategistAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  strategistAddress_lt?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_lte?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  strategistAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategistAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type FrrsStrategistUpdatedsConnection = {
  __typename?: 'FRRSStrategistUpdatedsConnection';
  edges: Array<FrrsStrategistUpdatedEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GovernanceProposal = {
  __typename?: 'GovernanceProposal';
  address: Scalars['String']['output'];
  calldatas: Array<Maybe<Scalars['String']['output']>>;
  chainId: Scalars['Int']['output'];
  choices: Array<Maybe<Scalars['String']['output']>>;
  description?: Maybe<Scalars['String']['output']>;
  endBlock: Scalars['BigInt']['output'];
  events: Array<GovernanceProposalEvent>;
  id: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  proposalId: Scalars['BigInt']['output'];
  proposer: Scalars['String']['output'];
  quorum: Scalars['BigInt']['output'];
  scores: Array<Maybe<Scalars['String']['output']>>;
  signatures: Array<Maybe<Scalars['String']['output']>>;
  startBlock: Scalars['BigInt']['output'];
  status: GovernanceProposalState;
  targets: Array<Maybe<Scalars['String']['output']>>;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  values: Array<Maybe<Scalars['String']['output']>>;
};


export type GovernanceProposalEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GovernanceProposalEventOrderByInput>>;
  where?: InputMaybe<GovernanceProposalEventWhereInput>;
};

export type GovernanceProposalEdge = {
  __typename?: 'GovernanceProposalEdge';
  cursor: Scalars['String']['output'];
  node: GovernanceProposal;
};

export type GovernanceProposalEvent = {
  __typename?: 'GovernanceProposalEvent';
  event: GovernanceProposalEventType;
  id: Scalars['String']['output'];
  proposal: GovernanceProposal;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type GovernanceProposalEventEdge = {
  __typename?: 'GovernanceProposalEventEdge';
  cursor: Scalars['String']['output'];
  node: GovernanceProposalEvent;
};

export enum GovernanceProposalEventOrderByInput {
  EventAsc = 'event_ASC',
  EventAscNullsFirst = 'event_ASC_NULLS_FIRST',
  EventAscNullsLast = 'event_ASC_NULLS_LAST',
  EventDesc = 'event_DESC',
  EventDescNullsFirst = 'event_DESC_NULLS_FIRST',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalAddressAsc = 'proposal_address_ASC',
  ProposalAddressAscNullsFirst = 'proposal_address_ASC_NULLS_FIRST',
  ProposalAddressAscNullsLast = 'proposal_address_ASC_NULLS_LAST',
  ProposalAddressDesc = 'proposal_address_DESC',
  ProposalAddressDescNullsFirst = 'proposal_address_DESC_NULLS_FIRST',
  ProposalAddressDescNullsLast = 'proposal_address_DESC_NULLS_LAST',
  ProposalChainIdAsc = 'proposal_chainId_ASC',
  ProposalChainIdAscNullsFirst = 'proposal_chainId_ASC_NULLS_FIRST',
  ProposalChainIdAscNullsLast = 'proposal_chainId_ASC_NULLS_LAST',
  ProposalChainIdDesc = 'proposal_chainId_DESC',
  ProposalChainIdDescNullsFirst = 'proposal_chainId_DESC_NULLS_FIRST',
  ProposalChainIdDescNullsLast = 'proposal_chainId_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionAscNullsLast = 'proposal_description_ASC_NULLS_LAST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsFirst = 'proposal_description_DESC_NULLS_FIRST',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockAscNullsLast = 'proposal_endBlock_ASC_NULLS_LAST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsFirst = 'proposal_endBlock_DESC_NULLS_FIRST',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdAscNullsLast = 'proposal_id_ASC_NULLS_LAST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsFirst = 'proposal_id_DESC_NULLS_FIRST',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedAscNullsLast = 'proposal_lastUpdated_ASC_NULLS_LAST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsFirst = 'proposal_lastUpdated_DESC_NULLS_FIRST',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalProposalIdAsc = 'proposal_proposalId_ASC',
  ProposalProposalIdAscNullsFirst = 'proposal_proposalId_ASC_NULLS_FIRST',
  ProposalProposalIdAscNullsLast = 'proposal_proposalId_ASC_NULLS_LAST',
  ProposalProposalIdDesc = 'proposal_proposalId_DESC',
  ProposalProposalIdDescNullsFirst = 'proposal_proposalId_DESC_NULLS_FIRST',
  ProposalProposalIdDescNullsLast = 'proposal_proposalId_DESC_NULLS_LAST',
  ProposalProposerAsc = 'proposal_proposer_ASC',
  ProposalProposerAscNullsFirst = 'proposal_proposer_ASC_NULLS_FIRST',
  ProposalProposerAscNullsLast = 'proposal_proposer_ASC_NULLS_LAST',
  ProposalProposerDesc = 'proposal_proposer_DESC',
  ProposalProposerDescNullsFirst = 'proposal_proposer_DESC_NULLS_FIRST',
  ProposalProposerDescNullsLast = 'proposal_proposer_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumAscNullsLast = 'proposal_quorum_ASC_NULLS_LAST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsFirst = 'proposal_quorum_DESC_NULLS_FIRST',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockAscNullsLast = 'proposal_startBlock_ASC_NULLS_LAST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsFirst = 'proposal_startBlock_DESC_NULLS_FIRST',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusAscNullsLast = 'proposal_status_ASC_NULLS_LAST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsFirst = 'proposal_status_DESC_NULLS_FIRST',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampAscNullsLast = 'proposal_timestamp_ASC_NULLS_LAST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsFirst = 'proposal_timestamp_DESC_NULLS_FIRST',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
  ProposalTxHashAsc = 'proposal_txHash_ASC',
  ProposalTxHashAscNullsFirst = 'proposal_txHash_ASC_NULLS_FIRST',
  ProposalTxHashAscNullsLast = 'proposal_txHash_ASC_NULLS_LAST',
  ProposalTxHashDesc = 'proposal_txHash_DESC',
  ProposalTxHashDescNullsFirst = 'proposal_txHash_DESC_NULLS_FIRST',
  ProposalTxHashDescNullsLast = 'proposal_txHash_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export enum GovernanceProposalEventType {
  Canceled = 'Canceled',
  Created = 'Created',
  Executed = 'Executed',
  Extended = 'Extended',
  Queued = 'Queued'
}

export type GovernanceProposalEventWhereInput = {
  AND?: InputMaybe<Array<GovernanceProposalEventWhereInput>>;
  OR?: InputMaybe<Array<GovernanceProposalEventWhereInput>>;
  event_eq?: InputMaybe<GovernanceProposalEventType>;
  event_in?: InputMaybe<Array<GovernanceProposalEventType>>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  event_not_eq?: InputMaybe<GovernanceProposalEventType>;
  event_not_in?: InputMaybe<Array<GovernanceProposalEventType>>;
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
  proposal?: InputMaybe<GovernanceProposalWhereInput>;
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
};

export type GovernanceProposalEventsConnection = {
  __typename?: 'GovernanceProposalEventsConnection';
  edges: Array<GovernanceProposalEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum GovernanceProposalOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EndBlockAsc = 'endBlock_ASC',
  EndBlockAscNullsFirst = 'endBlock_ASC_NULLS_FIRST',
  EndBlockAscNullsLast = 'endBlock_ASC_NULLS_LAST',
  EndBlockDesc = 'endBlock_DESC',
  EndBlockDescNullsFirst = 'endBlock_DESC_NULLS_FIRST',
  EndBlockDescNullsLast = 'endBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposalId_ASC',
  ProposalIdAscNullsFirst = 'proposalId_ASC_NULLS_FIRST',
  ProposalIdAscNullsLast = 'proposalId_ASC_NULLS_LAST',
  ProposalIdDesc = 'proposalId_DESC',
  ProposalIdDescNullsFirst = 'proposalId_DESC_NULLS_FIRST',
  ProposalIdDescNullsLast = 'proposalId_DESC_NULLS_LAST',
  ProposerAsc = 'proposer_ASC',
  ProposerAscNullsFirst = 'proposer_ASC_NULLS_FIRST',
  ProposerAscNullsLast = 'proposer_ASC_NULLS_LAST',
  ProposerDesc = 'proposer_DESC',
  ProposerDescNullsFirst = 'proposer_DESC_NULLS_FIRST',
  ProposerDescNullsLast = 'proposer_DESC_NULLS_LAST',
  QuorumAsc = 'quorum_ASC',
  QuorumAscNullsFirst = 'quorum_ASC_NULLS_FIRST',
  QuorumAscNullsLast = 'quorum_ASC_NULLS_LAST',
  QuorumDesc = 'quorum_DESC',
  QuorumDescNullsFirst = 'quorum_DESC_NULLS_FIRST',
  QuorumDescNullsLast = 'quorum_DESC_NULLS_LAST',
  StartBlockAsc = 'startBlock_ASC',
  StartBlockAscNullsFirst = 'startBlock_ASC_NULLS_FIRST',
  StartBlockAscNullsLast = 'startBlock_ASC_NULLS_LAST',
  StartBlockDesc = 'startBlock_DESC',
  StartBlockDescNullsFirst = 'startBlock_DESC_NULLS_FIRST',
  StartBlockDescNullsLast = 'startBlock_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export enum GovernanceProposalState {
  Active = 'Active',
  Canceled = 'Canceled',
  Defeated = 'Defeated',
  Executed = 'Executed',
  Expired = 'Expired',
  Pending = 'Pending',
  Queued = 'Queued',
  Succeeded = 'Succeeded'
}

export type GovernanceProposalVote = {
  __typename?: 'GovernanceProposalVote';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  proposal: GovernanceProposal;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: GovernanceVoteType;
  voter: Scalars['String']['output'];
  weight: Scalars['BigInt']['output'];
};

export type GovernanceProposalVoteEdge = {
  __typename?: 'GovernanceProposalVoteEdge';
  cursor: Scalars['String']['output'];
  node: GovernanceProposalVote;
};

export enum GovernanceProposalVoteOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalAddressAsc = 'proposal_address_ASC',
  ProposalAddressAscNullsFirst = 'proposal_address_ASC_NULLS_FIRST',
  ProposalAddressAscNullsLast = 'proposal_address_ASC_NULLS_LAST',
  ProposalAddressDesc = 'proposal_address_DESC',
  ProposalAddressDescNullsFirst = 'proposal_address_DESC_NULLS_FIRST',
  ProposalAddressDescNullsLast = 'proposal_address_DESC_NULLS_LAST',
  ProposalChainIdAsc = 'proposal_chainId_ASC',
  ProposalChainIdAscNullsFirst = 'proposal_chainId_ASC_NULLS_FIRST',
  ProposalChainIdAscNullsLast = 'proposal_chainId_ASC_NULLS_LAST',
  ProposalChainIdDesc = 'proposal_chainId_DESC',
  ProposalChainIdDescNullsFirst = 'proposal_chainId_DESC_NULLS_FIRST',
  ProposalChainIdDescNullsLast = 'proposal_chainId_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionAscNullsLast = 'proposal_description_ASC_NULLS_LAST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsFirst = 'proposal_description_DESC_NULLS_FIRST',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockAscNullsLast = 'proposal_endBlock_ASC_NULLS_LAST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsFirst = 'proposal_endBlock_DESC_NULLS_FIRST',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdAscNullsLast = 'proposal_id_ASC_NULLS_LAST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsFirst = 'proposal_id_DESC_NULLS_FIRST',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedAscNullsLast = 'proposal_lastUpdated_ASC_NULLS_LAST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsFirst = 'proposal_lastUpdated_DESC_NULLS_FIRST',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalProposalIdAsc = 'proposal_proposalId_ASC',
  ProposalProposalIdAscNullsFirst = 'proposal_proposalId_ASC_NULLS_FIRST',
  ProposalProposalIdAscNullsLast = 'proposal_proposalId_ASC_NULLS_LAST',
  ProposalProposalIdDesc = 'proposal_proposalId_DESC',
  ProposalProposalIdDescNullsFirst = 'proposal_proposalId_DESC_NULLS_FIRST',
  ProposalProposalIdDescNullsLast = 'proposal_proposalId_DESC_NULLS_LAST',
  ProposalProposerAsc = 'proposal_proposer_ASC',
  ProposalProposerAscNullsFirst = 'proposal_proposer_ASC_NULLS_FIRST',
  ProposalProposerAscNullsLast = 'proposal_proposer_ASC_NULLS_LAST',
  ProposalProposerDesc = 'proposal_proposer_DESC',
  ProposalProposerDescNullsFirst = 'proposal_proposer_DESC_NULLS_FIRST',
  ProposalProposerDescNullsLast = 'proposal_proposer_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumAscNullsLast = 'proposal_quorum_ASC_NULLS_LAST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsFirst = 'proposal_quorum_DESC_NULLS_FIRST',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockAscNullsLast = 'proposal_startBlock_ASC_NULLS_LAST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsFirst = 'proposal_startBlock_DESC_NULLS_FIRST',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusAscNullsLast = 'proposal_status_ASC_NULLS_LAST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsFirst = 'proposal_status_DESC_NULLS_FIRST',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampAscNullsLast = 'proposal_timestamp_ASC_NULLS_LAST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsFirst = 'proposal_timestamp_DESC_NULLS_FIRST',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
  ProposalTxHashAsc = 'proposal_txHash_ASC',
  ProposalTxHashAscNullsFirst = 'proposal_txHash_ASC_NULLS_FIRST',
  ProposalTxHashAscNullsLast = 'proposal_txHash_ASC_NULLS_LAST',
  ProposalTxHashDesc = 'proposal_txHash_DESC',
  ProposalTxHashDescNullsFirst = 'proposal_txHash_DESC_NULLS_FIRST',
  ProposalTxHashDescNullsLast = 'proposal_txHash_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  VoterAsc = 'voter_ASC',
  VoterAscNullsFirst = 'voter_ASC_NULLS_FIRST',
  VoterAscNullsLast = 'voter_ASC_NULLS_LAST',
  VoterDesc = 'voter_DESC',
  VoterDescNullsFirst = 'voter_DESC_NULLS_FIRST',
  VoterDescNullsLast = 'voter_DESC_NULLS_LAST',
  WeightAsc = 'weight_ASC',
  WeightAscNullsFirst = 'weight_ASC_NULLS_FIRST',
  WeightAscNullsLast = 'weight_ASC_NULLS_LAST',
  WeightDesc = 'weight_DESC',
  WeightDescNullsFirst = 'weight_DESC_NULLS_FIRST',
  WeightDescNullsLast = 'weight_DESC_NULLS_LAST'
}

export type GovernanceProposalVoteWhereInput = {
  AND?: InputMaybe<Array<GovernanceProposalVoteWhereInput>>;
  OR?: InputMaybe<Array<GovernanceProposalVoteWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  proposal?: InputMaybe<GovernanceProposalWhereInput>;
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
  type_eq?: InputMaybe<GovernanceVoteType>;
  type_in?: InputMaybe<Array<GovernanceVoteType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<GovernanceVoteType>;
  type_not_in?: InputMaybe<Array<GovernanceVoteType>>;
  voter_contains?: InputMaybe<Scalars['String']['input']>;
  voter_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  voter_endsWith?: InputMaybe<Scalars['String']['input']>;
  voter_eq?: InputMaybe<Scalars['String']['input']>;
  voter_gt?: InputMaybe<Scalars['String']['input']>;
  voter_gte?: InputMaybe<Scalars['String']['input']>;
  voter_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  voter_lt?: InputMaybe<Scalars['String']['input']>;
  voter_lte?: InputMaybe<Scalars['String']['input']>;
  voter_not_contains?: InputMaybe<Scalars['String']['input']>;
  voter_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  voter_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  voter_not_eq?: InputMaybe<Scalars['String']['input']>;
  voter_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  voter_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  voter_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type GovernanceProposalVotesConnection = {
  __typename?: 'GovernanceProposalVotesConnection';
  edges: Array<GovernanceProposalVoteEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GovernanceProposalWhereInput = {
  AND?: InputMaybe<Array<GovernanceProposalWhereInput>>;
  OR?: InputMaybe<Array<GovernanceProposalWhereInput>>;
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
  calldatas_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  calldatas_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  calldatas_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  calldatas_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  events_every?: InputMaybe<GovernanceProposalEventWhereInput>;
  events_none?: InputMaybe<GovernanceProposalEventWhereInput>;
  events_some?: InputMaybe<GovernanceProposalEventWhereInput>;
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
  proposalId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  proposalId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposer_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  proposer_endsWith?: InputMaybe<Scalars['String']['input']>;
  proposer_eq?: InputMaybe<Scalars['String']['input']>;
  proposer_gt?: InputMaybe<Scalars['String']['input']>;
  proposer_gte?: InputMaybe<Scalars['String']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  proposer_lt?: InputMaybe<Scalars['String']['input']>;
  proposer_lte?: InputMaybe<Scalars['String']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposer_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  proposer_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  proposer_not_eq?: InputMaybe<Scalars['String']['input']>;
  proposer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposer_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  proposer_startsWith?: InputMaybe<Scalars['String']['input']>;
  quorum_eq?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorum_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  quorum_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  quorum_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  scores_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scores_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scores_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scores_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  signatures_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  signatures_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  signatures_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  signatures_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_eq?: InputMaybe<GovernanceProposalState>;
  status_in?: InputMaybe<Array<GovernanceProposalState>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<GovernanceProposalState>;
  status_not_in?: InputMaybe<Array<GovernanceProposalState>>;
  targets_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targets_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targets_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  targets_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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
  values_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  values_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  values_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  values_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GovernanceProposalsConnection = {
  __typename?: 'GovernanceProposalsConnection';
  edges: Array<GovernanceProposalEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum GovernanceVoteType {
  Abstain = 'Abstain',
  Against = 'Against',
  For = 'For'
}

export enum HistoryType {
  Received = 'Received',
  Sent = 'Sent',
  Yield = 'Yield'
}

export type LegacyStaker = {
  __typename?: 'LegacyStaker';
  balance: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  inputAmount: Scalars['BigInt']['output'];
  outputAmount: Scalars['BigInt']['output'];
  rewardAmount: Scalars['BigInt']['output'];
};

export type LegacyStakerEdge = {
  __typename?: 'LegacyStakerEdge';
  cursor: Scalars['String']['output'];
  node: LegacyStaker;
};

export enum LegacyStakerOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InputAmountAsc = 'inputAmount_ASC',
  InputAmountAscNullsFirst = 'inputAmount_ASC_NULLS_FIRST',
  InputAmountAscNullsLast = 'inputAmount_ASC_NULLS_LAST',
  InputAmountDesc = 'inputAmount_DESC',
  InputAmountDescNullsFirst = 'inputAmount_DESC_NULLS_FIRST',
  InputAmountDescNullsLast = 'inputAmount_DESC_NULLS_LAST',
  OutputAmountAsc = 'outputAmount_ASC',
  OutputAmountAscNullsFirst = 'outputAmount_ASC_NULLS_FIRST',
  OutputAmountAscNullsLast = 'outputAmount_ASC_NULLS_LAST',
  OutputAmountDesc = 'outputAmount_DESC',
  OutputAmountDescNullsFirst = 'outputAmount_DESC_NULLS_FIRST',
  OutputAmountDescNullsLast = 'outputAmount_DESC_NULLS_LAST',
  RewardAmountAsc = 'rewardAmount_ASC',
  RewardAmountAscNullsFirst = 'rewardAmount_ASC_NULLS_FIRST',
  RewardAmountAscNullsLast = 'rewardAmount_ASC_NULLS_LAST',
  RewardAmountDesc = 'rewardAmount_DESC',
  RewardAmountDescNullsFirst = 'rewardAmount_DESC_NULLS_FIRST',
  RewardAmountDescNullsLast = 'rewardAmount_DESC_NULLS_LAST'
}

export type LegacyStakerWhereInput = {
  AND?: InputMaybe<Array<LegacyStakerWhereInput>>;
  OR?: InputMaybe<Array<LegacyStakerWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  inputAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  inputAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  inputAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  inputAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outputAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  outputAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  outputAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  outputAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  rewardAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  rewardAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type LegacyStakersConnection = {
  __typename?: 'LegacyStakersConnection';
  edges: Array<LegacyStakerEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenAscNullsLast = 'token_ASC_NULLS_LAST',
  TokenDesc = 'token_DESC',
  TokenDescNullsFirst = 'token_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenAscNullsLast = 'token_ASC_NULLS_LAST',
  TokenDesc = 'token_DESC',
  TokenDescNullsFirst = 'token_DESC_NULLS_FIRST',
  TokenDescNullsLast = 'token_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BinBalanceAAsc = 'binBalanceA_ASC',
  BinBalanceAAscNullsFirst = 'binBalanceA_ASC_NULLS_FIRST',
  BinBalanceAAscNullsLast = 'binBalanceA_ASC_NULLS_LAST',
  BinBalanceADesc = 'binBalanceA_DESC',
  BinBalanceADescNullsFirst = 'binBalanceA_DESC_NULLS_FIRST',
  BinBalanceADescNullsLast = 'binBalanceA_DESC_NULLS_LAST',
  BinBalanceBAsc = 'binBalanceB_ASC',
  BinBalanceBAscNullsFirst = 'binBalanceB_ASC_NULLS_FIRST',
  BinBalanceBAscNullsLast = 'binBalanceB_ASC_NULLS_LAST',
  BinBalanceBDesc = 'binBalanceB_DESC',
  BinBalanceBDescNullsFirst = 'binBalanceB_DESC_NULLS_FIRST',
  BinBalanceBDescNullsLast = 'binBalanceB_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TokenAAsc = 'tokenA_ASC',
  TokenAAscNullsFirst = 'tokenA_ASC_NULLS_FIRST',
  TokenAAscNullsLast = 'tokenA_ASC_NULLS_LAST',
  TokenADesc = 'tokenA_DESC',
  TokenADescNullsFirst = 'tokenA_DESC_NULLS_FIRST',
  TokenADescNullsLast = 'tokenA_DESC_NULLS_LAST',
  TokenBAsc = 'tokenB_ASC',
  TokenBAscNullsFirst = 'tokenB_ASC_NULLS_FIRST',
  TokenBAscNullsLast = 'tokenB_ASC_NULLS_LAST',
  TokenBDesc = 'tokenB_DESC',
  TokenBDescNullsFirst = 'tokenB_DESC_NULLS_FIRST',
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
  AccountAscNullsLast = 'account_ASC_NULLS_LAST',
  AccountDesc = 'account_DESC',
  AccountDescNullsFirst = 'account_DESC_NULLS_FIRST',
  AccountDescNullsLast = 'account_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  REthAsc = 'rETH_ASC',
  REthAscNullsFirst = 'rETH_ASC_NULLS_FIRST',
  REthAscNullsLast = 'rETH_ASC_NULLS_LAST',
  REthDesc = 'rETH_DESC',
  REthDescNullsFirst = 'rETH_DESC_NULLS_FIRST',
  REthDescNullsLast = 'rETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethAscNullsLast = 'weth_ASC_NULLS_LAST',
  WethDesc = 'weth_DESC',
  WethDescNullsFirst = 'weth_DESC_NULLS_FIRST',
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
  amount: Scalars['BigInt']['output'];
  dailyStatId: OethDailyStat;
  id: Scalars['String']['output'];
  price: Scalars['BigInt']['output'];
  symbol: Scalars['String']['output'];
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
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyAscNullsLast = 'dailyStatId_amoSupply_ASC_NULLS_LAST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsFirst = 'dailyStatId_amoSupply_DESC_NULLS_FIRST',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprAscNullsLast = 'dailyStatId_apr_ASC_NULLS_LAST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsFirst = 'dailyStatId_apr_DESC_NULLS_FIRST',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgAscNullsLast = 'dailyStatId_apy7DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsFirst = 'dailyStatId_apy7DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgAscNullsLast = 'dailyStatId_apy14DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsFirst = 'dailyStatId_apy14DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgAscNullsLast = 'dailyStatId_apy30DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsFirst = 'dailyStatId_apy30DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyAscNullsLast = 'dailyStatId_apy_ASC_NULLS_LAST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsFirst = 'dailyStatId_apy_DESC_NULLS_FIRST',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberAscNullsLast = 'dailyStatId_blockNumber_ASC_NULLS_LAST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsFirst = 'dailyStatId_blockNumber_DESC_NULLS_FIRST',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethAscNullsLast = 'dailyStatId_dripperWETH_ASC_NULLS_LAST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsFirst = 'dailyStatId_dripperWETH_DESC_NULLS_FIRST',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayAscNullsLast = 'dailyStatId_feesETH7Day_ASC_NULLS_LAST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsFirst = 'dailyStatId_feesETH7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeAscNullsLast = 'dailyStatId_feesETHAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsFirst = 'dailyStatId_feesETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAscNullsLast = 'dailyStatId_feesETH_ASC_NULLS_LAST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsFirst = 'dailyStatId_feesETH_DESC_NULLS_FIRST',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayAscNullsLast = 'dailyStatId_feesUSD7Day_ASC_NULLS_LAST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsFirst = 'dailyStatId_feesUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeAscNullsLast = 'dailyStatId_feesUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsFirst = 'dailyStatId_feesUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAscNullsLast = 'dailyStatId_feesUSD_ASC_NULLS_LAST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsFirst = 'dailyStatId_feesUSD_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdAscNullsLast = 'dailyStatId_holdersOverThreshold_ASC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsFirst = 'dailyStatId_holdersOverThreshold_DESC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdAscNullsLast = 'dailyStatId_id_ASC_NULLS_LAST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsFirst = 'dailyStatId_id_DESC_NULLS_FIRST',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdAscNullsLast = 'dailyStatId_marketCapUSD_ASC_NULLS_LAST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsFirst = 'dailyStatId_marketCapUSD_DESC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyAscNullsLast = 'dailyStatId_nonRebasingSupply_ASC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsFirst = 'dailyStatId_nonRebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceAscNullsLast = 'dailyStatId_pegPrice_ASC_NULLS_LAST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsFirst = 'dailyStatId_pegPrice_DESC_NULLS_FIRST',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyAscNullsLast = 'dailyStatId_rebasingSupply_ASC_NULLS_LAST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsFirst = 'dailyStatId_rebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampAscNullsLast = 'dailyStatId_timestamp_ASC_NULLS_LAST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsFirst = 'dailyStatId_timestamp_DESC_NULLS_FIRST',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdAscNullsLast = 'dailyStatId_totalSupplyUSD_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsFirst = 'dailyStatId_totalSupplyUSD_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyAscNullsLast = 'dailyStatId_totalSupply_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsFirst = 'dailyStatId_totalSupply_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdAscNullsLast = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsFirst = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyAscNullsLast = 'dailyStatId_wrappedSupply_ASC_NULLS_LAST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsFirst = 'dailyStatId_wrappedSupply_DESC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayAscNullsLast = 'dailyStatId_yieldETH7Day_ASC_NULLS_LAST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsFirst = 'dailyStatId_yieldETH7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeAscNullsLast = 'dailyStatId_yieldETHAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsFirst = 'dailyStatId_yieldETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAscNullsLast = 'dailyStatId_yieldETH_ASC_NULLS_LAST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsFirst = 'dailyStatId_yieldETH_DESC_NULLS_FIRST',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayAscNullsLast = 'dailyStatId_yieldUSD7Day_ASC_NULLS_LAST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsFirst = 'dailyStatId_yieldUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeAscNullsLast = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsFirst = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAscNullsLast = 'dailyStatId_yieldUSD_ASC_NULLS_LAST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsFirst = 'dailyStatId_yieldUSD_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceAscNullsLast = 'price_ASC_NULLS_LAST',
  PriceDesc = 'price_DESC',
  PriceDescNullsFirst = 'price_DESC_NULLS_FIRST',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EthOwnedAsc = 'ethOwned_ASC',
  EthOwnedAscNullsFirst = 'ethOwned_ASC_NULLS_FIRST',
  EthOwnedAscNullsLast = 'ethOwned_ASC_NULLS_LAST',
  EthOwnedDesc = 'ethOwned_DESC',
  EthOwnedDescNullsFirst = 'ethOwned_DESC_NULLS_FIRST',
  EthOwnedDescNullsLast = 'ethOwned_DESC_NULLS_LAST',
  EthAsc = 'eth_ASC',
  EthAscNullsFirst = 'eth_ASC_NULLS_FIRST',
  EthAscNullsLast = 'eth_ASC_NULLS_LAST',
  EthDesc = 'eth_DESC',
  EthDescNullsFirst = 'eth_DESC_NULLS_FIRST',
  EthDescNullsLast = 'eth_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OethOwnedAsc = 'oethOwned_ASC',
  OethOwnedAscNullsFirst = 'oethOwned_ASC_NULLS_FIRST',
  OethOwnedAscNullsLast = 'oethOwned_ASC_NULLS_LAST',
  OethOwnedDesc = 'oethOwned_DESC',
  OethOwnedDescNullsFirst = 'oethOwned_DESC_NULLS_FIRST',
  OethOwnedDescNullsLast = 'oethOwned_DESC_NULLS_LAST',
  OethAsc = 'oeth_ASC',
  OethAscNullsFirst = 'oeth_ASC_NULLS_FIRST',
  OethAscNullsLast = 'oeth_ASC_NULLS_LAST',
  OethDesc = 'oeth_DESC',
  OethDescNullsFirst = 'oeth_DESC_NULLS_FIRST',
  OethDescNullsLast = 'oeth_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyOwnedAsc = 'totalSupplyOwned_ASC',
  TotalSupplyOwnedAscNullsFirst = 'totalSupplyOwned_ASC_NULLS_FIRST',
  TotalSupplyOwnedAscNullsLast = 'totalSupplyOwned_ASC_NULLS_LAST',
  TotalSupplyOwnedDesc = 'totalSupplyOwned_DESC',
  TotalSupplyOwnedDescNullsFirst = 'totalSupplyOwned_DESC_NULLS_FIRST',
  TotalSupplyOwnedDescNullsLast = 'totalSupplyOwned_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
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
  AmoSupplyAscNullsLast = 'amoSupply_ASC_NULLS_LAST',
  AmoSupplyDesc = 'amoSupply_DESC',
  AmoSupplyDescNullsFirst = 'amoSupply_DESC_NULLS_FIRST',
  AmoSupplyDescNullsLast = 'amoSupply_DESC_NULLS_LAST',
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  Apy7DayAvgAsc = 'apy7DayAvg_ASC',
  Apy7DayAvgAscNullsFirst = 'apy7DayAvg_ASC_NULLS_FIRST',
  Apy7DayAvgAscNullsLast = 'apy7DayAvg_ASC_NULLS_LAST',
  Apy7DayAvgDesc = 'apy7DayAvg_DESC',
  Apy7DayAvgDescNullsFirst = 'apy7DayAvg_DESC_NULLS_FIRST',
  Apy7DayAvgDescNullsLast = 'apy7DayAvg_DESC_NULLS_LAST',
  Apy14DayAvgAsc = 'apy14DayAvg_ASC',
  Apy14DayAvgAscNullsFirst = 'apy14DayAvg_ASC_NULLS_FIRST',
  Apy14DayAvgAscNullsLast = 'apy14DayAvg_ASC_NULLS_LAST',
  Apy14DayAvgDesc = 'apy14DayAvg_DESC',
  Apy14DayAvgDescNullsFirst = 'apy14DayAvg_DESC_NULLS_FIRST',
  Apy14DayAvgDescNullsLast = 'apy14DayAvg_DESC_NULLS_LAST',
  Apy30DayAvgAsc = 'apy30DayAvg_ASC',
  Apy30DayAvgAscNullsFirst = 'apy30DayAvg_ASC_NULLS_FIRST',
  Apy30DayAvgAscNullsLast = 'apy30DayAvg_ASC_NULLS_LAST',
  Apy30DayAvgDesc = 'apy30DayAvg_DESC',
  Apy30DayAvgDescNullsFirst = 'apy30DayAvg_DESC_NULLS_FIRST',
  Apy30DayAvgDescNullsLast = 'apy30DayAvg_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DripperWethAsc = 'dripperWETH_ASC',
  DripperWethAscNullsFirst = 'dripperWETH_ASC_NULLS_FIRST',
  DripperWethAscNullsLast = 'dripperWETH_ASC_NULLS_LAST',
  DripperWethDesc = 'dripperWETH_DESC',
  DripperWethDescNullsFirst = 'dripperWETH_DESC_NULLS_FIRST',
  DripperWethDescNullsLast = 'dripperWETH_DESC_NULLS_LAST',
  FeesEth7DayAsc = 'feesETH7Day_ASC',
  FeesEth7DayAscNullsFirst = 'feesETH7Day_ASC_NULLS_FIRST',
  FeesEth7DayAscNullsLast = 'feesETH7Day_ASC_NULLS_LAST',
  FeesEth7DayDesc = 'feesETH7Day_DESC',
  FeesEth7DayDescNullsFirst = 'feesETH7Day_DESC_NULLS_FIRST',
  FeesEth7DayDescNullsLast = 'feesETH7Day_DESC_NULLS_LAST',
  FeesEthAllTimeAsc = 'feesETHAllTime_ASC',
  FeesEthAllTimeAscNullsFirst = 'feesETHAllTime_ASC_NULLS_FIRST',
  FeesEthAllTimeAscNullsLast = 'feesETHAllTime_ASC_NULLS_LAST',
  FeesEthAllTimeDesc = 'feesETHAllTime_DESC',
  FeesEthAllTimeDescNullsFirst = 'feesETHAllTime_DESC_NULLS_FIRST',
  FeesEthAllTimeDescNullsLast = 'feesETHAllTime_DESC_NULLS_LAST',
  FeesEthAsc = 'feesETH_ASC',
  FeesEthAscNullsFirst = 'feesETH_ASC_NULLS_FIRST',
  FeesEthAscNullsLast = 'feesETH_ASC_NULLS_LAST',
  FeesEthDesc = 'feesETH_DESC',
  FeesEthDescNullsFirst = 'feesETH_DESC_NULLS_FIRST',
  FeesEthDescNullsLast = 'feesETH_DESC_NULLS_LAST',
  FeesUsd7DayAsc = 'feesUSD7Day_ASC',
  FeesUsd7DayAscNullsFirst = 'feesUSD7Day_ASC_NULLS_FIRST',
  FeesUsd7DayAscNullsLast = 'feesUSD7Day_ASC_NULLS_LAST',
  FeesUsd7DayDesc = 'feesUSD7Day_DESC',
  FeesUsd7DayDescNullsFirst = 'feesUSD7Day_DESC_NULLS_FIRST',
  FeesUsd7DayDescNullsLast = 'feesUSD7Day_DESC_NULLS_LAST',
  FeesUsdAllTimeAsc = 'feesUSDAllTime_ASC',
  FeesUsdAllTimeAscNullsFirst = 'feesUSDAllTime_ASC_NULLS_FIRST',
  FeesUsdAllTimeAscNullsLast = 'feesUSDAllTime_ASC_NULLS_LAST',
  FeesUsdAllTimeDesc = 'feesUSDAllTime_DESC',
  FeesUsdAllTimeDescNullsFirst = 'feesUSDAllTime_DESC_NULLS_FIRST',
  FeesUsdAllTimeDescNullsLast = 'feesUSDAllTime_DESC_NULLS_LAST',
  FeesUsdAsc = 'feesUSD_ASC',
  FeesUsdAscNullsFirst = 'feesUSD_ASC_NULLS_FIRST',
  FeesUsdAscNullsLast = 'feesUSD_ASC_NULLS_LAST',
  FeesUsdDesc = 'feesUSD_DESC',
  FeesUsdDescNullsFirst = 'feesUSD_DESC_NULLS_FIRST',
  FeesUsdDescNullsLast = 'feesUSD_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdAscNullsLast = 'holdersOverThreshold_ASC_NULLS_LAST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsFirst = 'holdersOverThreshold_DESC_NULLS_FIRST',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdAscNullsLast = 'marketCapUSD_ASC_NULLS_LAST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsFirst = 'marketCapUSD_DESC_NULLS_FIRST',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyAscNullsLast = 'nonRebasingSupply_ASC_NULLS_LAST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsFirst = 'nonRebasingSupply_DESC_NULLS_FIRST',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  PegPriceAsc = 'pegPrice_ASC',
  PegPriceAscNullsFirst = 'pegPrice_ASC_NULLS_FIRST',
  PegPriceAscNullsLast = 'pegPrice_ASC_NULLS_LAST',
  PegPriceDesc = 'pegPrice_DESC',
  PegPriceDescNullsFirst = 'pegPrice_DESC_NULLS_FIRST',
  PegPriceDescNullsLast = 'pegPrice_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyAscNullsLast = 'rebasingSupply_ASC_NULLS_LAST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsFirst = 'rebasingSupply_DESC_NULLS_FIRST',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdAscNullsLast = 'totalSupplyUSD_ASC_NULLS_LAST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsFirst = 'totalSupplyUSD_DESC_NULLS_FIRST',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdAscNullsLast = 'tradingVolumeUSD_ASC_NULLS_LAST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsFirst = 'tradingVolumeUSD_DESC_NULLS_FIRST',
  TradingVolumeUsdDescNullsLast = 'tradingVolumeUSD_DESC_NULLS_LAST',
  WrappedSupplyAsc = 'wrappedSupply_ASC',
  WrappedSupplyAscNullsFirst = 'wrappedSupply_ASC_NULLS_FIRST',
  WrappedSupplyAscNullsLast = 'wrappedSupply_ASC_NULLS_LAST',
  WrappedSupplyDesc = 'wrappedSupply_DESC',
  WrappedSupplyDescNullsFirst = 'wrappedSupply_DESC_NULLS_FIRST',
  WrappedSupplyDescNullsLast = 'wrappedSupply_DESC_NULLS_LAST',
  YieldEth7DayAsc = 'yieldETH7Day_ASC',
  YieldEth7DayAscNullsFirst = 'yieldETH7Day_ASC_NULLS_FIRST',
  YieldEth7DayAscNullsLast = 'yieldETH7Day_ASC_NULLS_LAST',
  YieldEth7DayDesc = 'yieldETH7Day_DESC',
  YieldEth7DayDescNullsFirst = 'yieldETH7Day_DESC_NULLS_FIRST',
  YieldEth7DayDescNullsLast = 'yieldETH7Day_DESC_NULLS_LAST',
  YieldEthAllTimeAsc = 'yieldETHAllTime_ASC',
  YieldEthAllTimeAscNullsFirst = 'yieldETHAllTime_ASC_NULLS_FIRST',
  YieldEthAllTimeAscNullsLast = 'yieldETHAllTime_ASC_NULLS_LAST',
  YieldEthAllTimeDesc = 'yieldETHAllTime_DESC',
  YieldEthAllTimeDescNullsFirst = 'yieldETHAllTime_DESC_NULLS_FIRST',
  YieldEthAllTimeDescNullsLast = 'yieldETHAllTime_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthAscNullsLast = 'yieldETH_ASC_NULLS_LAST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsFirst = 'yieldETH_DESC_NULLS_FIRST',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsd7DayAsc = 'yieldUSD7Day_ASC',
  YieldUsd7DayAscNullsFirst = 'yieldUSD7Day_ASC_NULLS_FIRST',
  YieldUsd7DayAscNullsLast = 'yieldUSD7Day_ASC_NULLS_LAST',
  YieldUsd7DayDesc = 'yieldUSD7Day_DESC',
  YieldUsd7DayDescNullsFirst = 'yieldUSD7Day_DESC_NULLS_FIRST',
  YieldUsd7DayDescNullsLast = 'yieldUSD7Day_DESC_NULLS_LAST',
  YieldUsdAllTimeAsc = 'yieldUSDAllTime_ASC',
  YieldUsdAllTimeAscNullsFirst = 'yieldUSDAllTime_ASC_NULLS_FIRST',
  YieldUsdAllTimeAscNullsLast = 'yieldUSDAllTime_ASC_NULLS_LAST',
  YieldUsdAllTimeDesc = 'yieldUSDAllTime_DESC',
  YieldUsdAllTimeDescNullsFirst = 'yieldUSDAllTime_DESC_NULLS_FIRST',
  YieldUsdAllTimeDescNullsLast = 'yieldUSDAllTime_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdAscNullsLast = 'yieldUSD_ASC_NULLS_LAST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsFirst = 'yieldUSD_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DripDurationAsc = 'dripDuration_ASC',
  DripDurationAscNullsFirst = 'dripDuration_ASC_NULLS_FIRST',
  DripDurationAscNullsLast = 'dripDuration_ASC_NULLS_LAST',
  DripDurationDesc = 'dripDuration_DESC',
  DripDurationDescNullsFirst = 'dripDuration_DESC_NULLS_FIRST',
  DripDurationDescNullsLast = 'dripDuration_DESC_NULLS_LAST',
  DripRatePerBlockAsc = 'dripRatePerBlock_ASC',
  DripRatePerBlockAscNullsFirst = 'dripRatePerBlock_ASC_NULLS_FIRST',
  DripRatePerBlockAscNullsLast = 'dripRatePerBlock_ASC_NULLS_LAST',
  DripRatePerBlockDesc = 'dripRatePerBlock_DESC',
  DripRatePerBlockDescNullsFirst = 'dripRatePerBlock_DESC_NULLS_FIRST',
  DripRatePerBlockDescNullsLast = 'dripRatePerBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastCollectTimestampAsc = 'lastCollectTimestamp_ASC',
  LastCollectTimestampAscNullsFirst = 'lastCollectTimestamp_ASC_NULLS_FIRST',
  LastCollectTimestampAscNullsLast = 'lastCollectTimestamp_ASC_NULLS_LAST',
  LastCollectTimestampDesc = 'lastCollectTimestamp_DESC',
  LastCollectTimestampDescNullsFirst = 'lastCollectTimestamp_DESC_NULLS_FIRST',
  LastCollectTimestampDescNullsLast = 'lastCollectTimestamp_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethAscNullsLast = 'weth_ASC_NULLS_LAST',
  WethDesc = 'weth_DESC',
  WethDescNullsFirst = 'weth_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SfrxEthAsc = 'sfrxETH_ASC',
  SfrxEthAscNullsFirst = 'sfrxETH_ASC_NULLS_FIRST',
  SfrxEthAscNullsLast = 'sfrxETH_ASC_NULLS_LAST',
  SfrxEthDesc = 'sfrxETH_DESC',
  SfrxEthDescNullsFirst = 'sfrxETH_DESC_NULLS_FIRST',
  SfrxEthDescNullsLast = 'sfrxETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethAscNullsLast = 'weth_ASC_NULLS_LAST',
  WethDesc = 'weth_DESC',
  WethDescNullsFirst = 'weth_DESC_NULLS_FIRST',
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
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientAscNullsLast = 'recipient_ASC_NULLS_LAST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsFirst = 'recipient_DESC_NULLS_FIRST',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST',
  RewardTokenAsc = 'rewardToken_ASC',
  RewardTokenAscNullsFirst = 'rewardToken_ASC_NULLS_FIRST',
  RewardTokenAscNullsLast = 'rewardToken_ASC_NULLS_LAST',
  RewardTokenDesc = 'rewardToken_DESC',
  RewardTokenDescNullsFirst = 'rewardToken_DESC_NULLS_FIRST',
  RewardTokenDescNullsLast = 'rewardToken_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyAscNullsLast = 'strategy_ASC_NULLS_LAST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsFirst = 'strategy_DESC_NULLS_FIRST',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  DailyStatIdAmoSupplyAscNullsLast = 'dailyStatId_amoSupply_ASC_NULLS_LAST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsFirst = 'dailyStatId_amoSupply_DESC_NULLS_FIRST',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprAscNullsLast = 'dailyStatId_apr_ASC_NULLS_LAST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsFirst = 'dailyStatId_apr_DESC_NULLS_FIRST',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgAscNullsLast = 'dailyStatId_apy7DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsFirst = 'dailyStatId_apy7DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgAscNullsLast = 'dailyStatId_apy14DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsFirst = 'dailyStatId_apy14DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgAscNullsLast = 'dailyStatId_apy30DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsFirst = 'dailyStatId_apy30DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyAscNullsLast = 'dailyStatId_apy_ASC_NULLS_LAST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsFirst = 'dailyStatId_apy_DESC_NULLS_FIRST',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberAscNullsLast = 'dailyStatId_blockNumber_ASC_NULLS_LAST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsFirst = 'dailyStatId_blockNumber_DESC_NULLS_FIRST',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethAscNullsLast = 'dailyStatId_dripperWETH_ASC_NULLS_LAST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsFirst = 'dailyStatId_dripperWETH_DESC_NULLS_FIRST',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayAscNullsLast = 'dailyStatId_feesETH7Day_ASC_NULLS_LAST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsFirst = 'dailyStatId_feesETH7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeAscNullsLast = 'dailyStatId_feesETHAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsFirst = 'dailyStatId_feesETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAscNullsLast = 'dailyStatId_feesETH_ASC_NULLS_LAST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsFirst = 'dailyStatId_feesETH_DESC_NULLS_FIRST',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayAscNullsLast = 'dailyStatId_feesUSD7Day_ASC_NULLS_LAST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsFirst = 'dailyStatId_feesUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeAscNullsLast = 'dailyStatId_feesUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsFirst = 'dailyStatId_feesUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAscNullsLast = 'dailyStatId_feesUSD_ASC_NULLS_LAST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsFirst = 'dailyStatId_feesUSD_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdAscNullsLast = 'dailyStatId_holdersOverThreshold_ASC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsFirst = 'dailyStatId_holdersOverThreshold_DESC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdAscNullsLast = 'dailyStatId_id_ASC_NULLS_LAST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsFirst = 'dailyStatId_id_DESC_NULLS_FIRST',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdAscNullsLast = 'dailyStatId_marketCapUSD_ASC_NULLS_LAST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsFirst = 'dailyStatId_marketCapUSD_DESC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyAscNullsLast = 'dailyStatId_nonRebasingSupply_ASC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsFirst = 'dailyStatId_nonRebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceAscNullsLast = 'dailyStatId_pegPrice_ASC_NULLS_LAST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsFirst = 'dailyStatId_pegPrice_DESC_NULLS_FIRST',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyAscNullsLast = 'dailyStatId_rebasingSupply_ASC_NULLS_LAST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsFirst = 'dailyStatId_rebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampAscNullsLast = 'dailyStatId_timestamp_ASC_NULLS_LAST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsFirst = 'dailyStatId_timestamp_DESC_NULLS_FIRST',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdAscNullsLast = 'dailyStatId_totalSupplyUSD_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsFirst = 'dailyStatId_totalSupplyUSD_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyAscNullsLast = 'dailyStatId_totalSupply_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsFirst = 'dailyStatId_totalSupply_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdAscNullsLast = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsFirst = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyAscNullsLast = 'dailyStatId_wrappedSupply_ASC_NULLS_LAST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsFirst = 'dailyStatId_wrappedSupply_DESC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayAscNullsLast = 'dailyStatId_yieldETH7Day_ASC_NULLS_LAST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsFirst = 'dailyStatId_yieldETH7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeAscNullsLast = 'dailyStatId_yieldETHAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsFirst = 'dailyStatId_yieldETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAscNullsLast = 'dailyStatId_yieldETH_ASC_NULLS_LAST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsFirst = 'dailyStatId_yieldETH_DESC_NULLS_FIRST',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayAscNullsLast = 'dailyStatId_yieldUSD7Day_ASC_NULLS_LAST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsFirst = 'dailyStatId_yieldUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeAscNullsLast = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsFirst = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAscNullsLast = 'dailyStatId_yieldUSD_ASC_NULLS_LAST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsFirst = 'dailyStatId_yieldUSD_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalAscNullsLast = 'total_ASC_NULLS_LAST',
  TotalDesc = 'total_DESC',
  TotalDescNullsFirst = 'total_DESC_NULLS_FIRST',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TvlAsc = 'tvl_ASC',
  TvlAscNullsFirst = 'tvl_ASC_NULLS_FIRST',
  TvlAscNullsLast = 'tvl_ASC_NULLS_LAST',
  TvlDesc = 'tvl_DESC',
  TvlDescNullsFirst = 'tvl_DESC_NULLS_FIRST',
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
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyDailyStatIdIdAsc = 'strategyDailyStatId_id_ASC',
  StrategyDailyStatIdIdAscNullsFirst = 'strategyDailyStatId_id_ASC_NULLS_FIRST',
  StrategyDailyStatIdIdAscNullsLast = 'strategyDailyStatId_id_ASC_NULLS_LAST',
  StrategyDailyStatIdIdDesc = 'strategyDailyStatId_id_DESC',
  StrategyDailyStatIdIdDescNullsFirst = 'strategyDailyStatId_id_DESC_NULLS_FIRST',
  StrategyDailyStatIdIdDescNullsLast = 'strategyDailyStatId_id_DESC_NULLS_LAST',
  StrategyDailyStatIdNameAsc = 'strategyDailyStatId_name_ASC',
  StrategyDailyStatIdNameAscNullsFirst = 'strategyDailyStatId_name_ASC_NULLS_FIRST',
  StrategyDailyStatIdNameAscNullsLast = 'strategyDailyStatId_name_ASC_NULLS_LAST',
  StrategyDailyStatIdNameDesc = 'strategyDailyStatId_name_DESC',
  StrategyDailyStatIdNameDescNullsFirst = 'strategyDailyStatId_name_DESC_NULLS_FIRST',
  StrategyDailyStatIdNameDescNullsLast = 'strategyDailyStatId_name_DESC_NULLS_LAST',
  StrategyDailyStatIdTotalAsc = 'strategyDailyStatId_total_ASC',
  StrategyDailyStatIdTotalAscNullsFirst = 'strategyDailyStatId_total_ASC_NULLS_FIRST',
  StrategyDailyStatIdTotalAscNullsLast = 'strategyDailyStatId_total_ASC_NULLS_LAST',
  StrategyDailyStatIdTotalDesc = 'strategyDailyStatId_total_DESC',
  StrategyDailyStatIdTotalDescNullsFirst = 'strategyDailyStatId_total_DESC_NULLS_FIRST',
  StrategyDailyStatIdTotalDescNullsLast = 'strategyDailyStatId_total_DESC_NULLS_LAST',
  StrategyDailyStatIdTvlAsc = 'strategyDailyStatId_tvl_ASC',
  StrategyDailyStatIdTvlAscNullsFirst = 'strategyDailyStatId_tvl_ASC_NULLS_FIRST',
  StrategyDailyStatIdTvlAscNullsLast = 'strategyDailyStatId_tvl_ASC_NULLS_LAST',
  StrategyDailyStatIdTvlDesc = 'strategyDailyStatId_tvl_DESC',
  StrategyDailyStatIdTvlDescNullsFirst = 'strategyDailyStatId_tvl_DESC_NULLS_FIRST',
  StrategyDailyStatIdTvlDescNullsLast = 'strategyDailyStatId_tvl_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FrxEthAsc = 'frxETH_ASC',
  FrxEthAscNullsFirst = 'frxETH_ASC_NULLS_FIRST',
  FrxEthAscNullsLast = 'frxETH_ASC_NULLS_LAST',
  FrxEthDesc = 'frxETH_DESC',
  FrxEthDescNullsFirst = 'frxETH_DESC_NULLS_FIRST',
  FrxEthDescNullsLast = 'frxETH_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  REthAsc = 'rETH_ASC',
  REthAscNullsFirst = 'rETH_ASC_NULLS_FIRST',
  REthAscNullsLast = 'rETH_ASC_NULLS_LAST',
  REthDesc = 'rETH_DESC',
  REthDescNullsFirst = 'rETH_DESC_NULLS_FIRST',
  REthDescNullsLast = 'rETH_DESC_NULLS_LAST',
  StEthAsc = 'stETH_ASC',
  StEthAscNullsFirst = 'stETH_ASC_NULLS_FIRST',
  StEthAscNullsLast = 'stETH_ASC_NULLS_LAST',
  StEthDesc = 'stETH_DESC',
  StEthDescNullsFirst = 'stETH_DESC_NULLS_FIRST',
  StEthDescNullsLast = 'stETH_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WethAsc = 'weth_ASC',
  WethAscNullsFirst = 'weth_ASC_NULLS_FIRST',
  WethAscNullsLast = 'weth_ASC_NULLS_LAST',
  WethDesc = 'weth_DESC',
  WethDescNullsFirst = 'weth_DESC_NULLS_FIRST',
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

export type OethWithdrawalRequest = {
  __typename?: 'OETHWithdrawalRequest';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  claimed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  queued: Scalars['BigInt']['output'];
  requestId: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  withdrawer: Scalars['String']['output'];
};

export type OethWithdrawalRequestEdge = {
  __typename?: 'OETHWithdrawalRequestEdge';
  cursor: Scalars['String']['output'];
  node: OethWithdrawalRequest;
};

export enum OethWithdrawalRequestOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ClaimedAsc = 'claimed_ASC',
  ClaimedAscNullsFirst = 'claimed_ASC_NULLS_FIRST',
  ClaimedAscNullsLast = 'claimed_ASC_NULLS_LAST',
  ClaimedDesc = 'claimed_DESC',
  ClaimedDescNullsFirst = 'claimed_DESC_NULLS_FIRST',
  ClaimedDescNullsLast = 'claimed_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  QueuedAsc = 'queued_ASC',
  QueuedAscNullsFirst = 'queued_ASC_NULLS_FIRST',
  QueuedAscNullsLast = 'queued_ASC_NULLS_LAST',
  QueuedDesc = 'queued_DESC',
  QueuedDescNullsFirst = 'queued_DESC_NULLS_FIRST',
  QueuedDescNullsLast = 'queued_DESC_NULLS_LAST',
  RequestIdAsc = 'requestId_ASC',
  RequestIdAscNullsFirst = 'requestId_ASC_NULLS_FIRST',
  RequestIdAscNullsLast = 'requestId_ASC_NULLS_LAST',
  RequestIdDesc = 'requestId_DESC',
  RequestIdDescNullsFirst = 'requestId_DESC_NULLS_FIRST',
  RequestIdDescNullsLast = 'requestId_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  WithdrawerAsc = 'withdrawer_ASC',
  WithdrawerAscNullsFirst = 'withdrawer_ASC_NULLS_FIRST',
  WithdrawerAscNullsLast = 'withdrawer_ASC_NULLS_LAST',
  WithdrawerDesc = 'withdrawer_DESC',
  WithdrawerDescNullsFirst = 'withdrawer_DESC_NULLS_FIRST',
  WithdrawerDescNullsLast = 'withdrawer_DESC_NULLS_LAST'
}

export type OethWithdrawalRequestWhereInput = {
  AND?: InputMaybe<Array<OethWithdrawalRequestWhereInput>>;
  OR?: InputMaybe<Array<OethWithdrawalRequestWhereInput>>;
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
  claimed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  claimed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
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
  queued_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queued_gt?: InputMaybe<Scalars['BigInt']['input']>;
  queued_gte?: InputMaybe<Scalars['BigInt']['input']>;
  queued_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  queued_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  queued_lt?: InputMaybe<Scalars['BigInt']['input']>;
  queued_lte?: InputMaybe<Scalars['BigInt']['input']>;
  queued_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  queued_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  requestId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  requestId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  requestId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  withdrawer_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawer_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  withdrawer_endsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawer_eq?: InputMaybe<Scalars['String']['input']>;
  withdrawer_gt?: InputMaybe<Scalars['String']['input']>;
  withdrawer_gte?: InputMaybe<Scalars['String']['input']>;
  withdrawer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawer_lt?: InputMaybe<Scalars['String']['input']>;
  withdrawer_lte?: InputMaybe<Scalars['String']['input']>;
  withdrawer_not_contains?: InputMaybe<Scalars['String']['input']>;
  withdrawer_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  withdrawer_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawer_not_eq?: InputMaybe<Scalars['String']['input']>;
  withdrawer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  withdrawer_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawer_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type OethWithdrawalRequestsConnection = {
  __typename?: 'OETHWithdrawalRequestsConnection';
  edges: Array<OethWithdrawalRequestEdge>;
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
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  DelegateeBalanceAsc = 'delegatee_balance_ASC',
  DelegateeBalanceAscNullsFirst = 'delegatee_balance_ASC_NULLS_FIRST',
  DelegateeBalanceAscNullsLast = 'delegatee_balance_ASC_NULLS_LAST',
  DelegateeBalanceDesc = 'delegatee_balance_DESC',
  DelegateeBalanceDescNullsFirst = 'delegatee_balance_DESC_NULLS_FIRST',
  DelegateeBalanceDescNullsLast = 'delegatee_balance_DESC_NULLS_LAST',
  DelegateeIdAsc = 'delegatee_id_ASC',
  DelegateeIdAscNullsFirst = 'delegatee_id_ASC_NULLS_FIRST',
  DelegateeIdAscNullsLast = 'delegatee_id_ASC_NULLS_LAST',
  DelegateeIdDesc = 'delegatee_id_DESC',
  DelegateeIdDescNullsFirst = 'delegatee_id_DESC_NULLS_FIRST',
  DelegateeIdDescNullsLast = 'delegatee_id_DESC_NULLS_LAST',
  DelegateeLastUpdatedAsc = 'delegatee_lastUpdated_ASC',
  DelegateeLastUpdatedAscNullsFirst = 'delegatee_lastUpdated_ASC_NULLS_FIRST',
  DelegateeLastUpdatedAscNullsLast = 'delegatee_lastUpdated_ASC_NULLS_LAST',
  DelegateeLastUpdatedDesc = 'delegatee_lastUpdated_DESC',
  DelegateeLastUpdatedDescNullsFirst = 'delegatee_lastUpdated_DESC_NULLS_FIRST',
  DelegateeLastUpdatedDescNullsLast = 'delegatee_lastUpdated_DESC_NULLS_LAST',
  DelegateeStakedAsc = 'delegatee_staked_ASC',
  DelegateeStakedAscNullsFirst = 'delegatee_staked_ASC_NULLS_FIRST',
  DelegateeStakedAscNullsLast = 'delegatee_staked_ASC_NULLS_LAST',
  DelegateeStakedDesc = 'delegatee_staked_DESC',
  DelegateeStakedDescNullsFirst = 'delegatee_staked_DESC_NULLS_FIRST',
  DelegateeStakedDescNullsLast = 'delegatee_staked_DESC_NULLS_LAST',
  DelegateeVeogvBalanceAsc = 'delegatee_veogvBalance_ASC',
  DelegateeVeogvBalanceAscNullsFirst = 'delegatee_veogvBalance_ASC_NULLS_FIRST',
  DelegateeVeogvBalanceAscNullsLast = 'delegatee_veogvBalance_ASC_NULLS_LAST',
  DelegateeVeogvBalanceDesc = 'delegatee_veogvBalance_DESC',
  DelegateeVeogvBalanceDescNullsFirst = 'delegatee_veogvBalance_DESC_NULLS_FIRST',
  DelegateeVeogvBalanceDescNullsLast = 'delegatee_veogvBalance_DESC_NULLS_LAST',
  DelegateeVotingPowerAsc = 'delegatee_votingPower_ASC',
  DelegateeVotingPowerAscNullsFirst = 'delegatee_votingPower_ASC_NULLS_FIRST',
  DelegateeVotingPowerAscNullsLast = 'delegatee_votingPower_ASC_NULLS_LAST',
  DelegateeVotingPowerDesc = 'delegatee_votingPower_DESC',
  DelegateeVotingPowerDescNullsFirst = 'delegatee_votingPower_DESC_NULLS_FIRST',
  DelegateeVotingPowerDescNullsLast = 'delegatee_votingPower_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedAscNullsLast = 'staked_ASC_NULLS_LAST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsFirst = 'staked_DESC_NULLS_FIRST',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  VeogvBalanceAsc = 'veogvBalance_ASC',
  VeogvBalanceAscNullsFirst = 'veogvBalance_ASC_NULLS_FIRST',
  VeogvBalanceAscNullsLast = 'veogvBalance_ASC_NULLS_LAST',
  VeogvBalanceDesc = 'veogvBalance_DESC',
  VeogvBalanceDescNullsFirst = 'veogvBalance_DESC_NULLS_FIRST',
  VeogvBalanceDescNullsLast = 'veogvBalance_DESC_NULLS_LAST',
  VotingPowerAsc = 'votingPower_ASC',
  VotingPowerAscNullsFirst = 'votingPower_ASC_NULLS_FIRST',
  VotingPowerAscNullsLast = 'votingPower_ASC_NULLS_LAST',
  VotingPowerDesc = 'votingPower_DESC',
  VotingPowerDescNullsFirst = 'votingPower_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdAscNullsLast = 'holdersOverThreshold_ASC_NULLS_LAST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsFirst = 'holdersOverThreshold_DESC_NULLS_FIRST',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdAscNullsLast = 'marketCapUSD_ASC_NULLS_LAST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsFirst = 'marketCapUSD_DESC_NULLS_FIRST',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  PriceUsdAsc = 'priceUSD_ASC',
  PriceUsdAscNullsFirst = 'priceUSD_ASC_NULLS_FIRST',
  PriceUsdAscNullsLast = 'priceUSD_ASC_NULLS_LAST',
  PriceUsdDesc = 'priceUSD_DESC',
  PriceUsdDescNullsFirst = 'priceUSD_DESC_NULLS_FIRST',
  PriceUsdDescNullsLast = 'priceUSD_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalStakedAsc = 'totalStaked_ASC',
  TotalStakedAscNullsFirst = 'totalStaked_ASC_NULLS_FIRST',
  TotalStakedAscNullsLast = 'totalStaked_ASC_NULLS_LAST',
  TotalStakedDesc = 'totalStaked_DESC',
  TotalStakedDescNullsFirst = 'totalStaked_DESC_NULLS_FIRST',
  TotalStakedDescNullsLast = 'totalStaked_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdAscNullsLast = 'totalSupplyUSD_ASC_NULLS_LAST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsFirst = 'totalSupplyUSD_DESC_NULLS_FIRST',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdAscNullsLast = 'tradingVolumeUSD_ASC_NULLS_LAST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsFirst = 'tradingVolumeUSD_DESC_NULLS_FIRST',
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
  AddressBalanceAscNullsLast = 'address_balance_ASC_NULLS_LAST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsFirst = 'address_balance_DESC_NULLS_FIRST',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdAscNullsLast = 'address_id_ASC_NULLS_LAST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsFirst = 'address_id_DESC_NULLS_FIRST',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedAscNullsLast = 'address_lastUpdated_ASC_NULLS_LAST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsFirst = 'address_lastUpdated_DESC_NULLS_FIRST',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressStakedAsc = 'address_staked_ASC',
  AddressStakedAscNullsFirst = 'address_staked_ASC_NULLS_FIRST',
  AddressStakedAscNullsLast = 'address_staked_ASC_NULLS_LAST',
  AddressStakedDesc = 'address_staked_DESC',
  AddressStakedDescNullsFirst = 'address_staked_DESC_NULLS_FIRST',
  AddressStakedDescNullsLast = 'address_staked_DESC_NULLS_LAST',
  AddressVeogvBalanceAsc = 'address_veogvBalance_ASC',
  AddressVeogvBalanceAscNullsFirst = 'address_veogvBalance_ASC_NULLS_FIRST',
  AddressVeogvBalanceAscNullsLast = 'address_veogvBalance_ASC_NULLS_LAST',
  AddressVeogvBalanceDesc = 'address_veogvBalance_DESC',
  AddressVeogvBalanceDescNullsFirst = 'address_veogvBalance_DESC_NULLS_FIRST',
  AddressVeogvBalanceDescNullsLast = 'address_veogvBalance_DESC_NULLS_LAST',
  AddressVotingPowerAsc = 'address_votingPower_ASC',
  AddressVotingPowerAscNullsFirst = 'address_votingPower_ASC_NULLS_FIRST',
  AddressVotingPowerAscNullsLast = 'address_votingPower_ASC_NULLS_LAST',
  AddressVotingPowerDesc = 'address_votingPower_DESC',
  AddressVotingPowerDescNullsFirst = 'address_votingPower_DESC_NULLS_FIRST',
  AddressVotingPowerDescNullsLast = 'address_votingPower_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  EndAsc = 'end_ASC',
  EndAscNullsFirst = 'end_ASC_NULLS_FIRST',
  EndAscNullsLast = 'end_ASC_NULLS_LAST',
  EndDesc = 'end_DESC',
  EndDescNullsFirst = 'end_DESC_NULLS_FIRST',
  EndDescNullsLast = 'end_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LockupIdAsc = 'lockupId_ASC',
  LockupIdAscNullsFirst = 'lockupId_ASC_NULLS_FIRST',
  LockupIdAscNullsLast = 'lockupId_ASC_NULLS_LAST',
  LockupIdDesc = 'lockupId_DESC',
  LockupIdDescNullsFirst = 'lockupId_DESC_NULLS_FIRST',
  LockupIdDescNullsLast = 'lockupId_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  VeogvAsc = 'veogv_ASC',
  VeogvAscNullsFirst = 'veogv_ASC_NULLS_FIRST',
  VeogvAscNullsLast = 'veogv_ASC_NULLS_LAST',
  VeogvDesc = 'veogv_DESC',
  VeogvDescNullsFirst = 'veogv_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EventAsc = 'event_ASC',
  EventAscNullsFirst = 'event_ASC_NULLS_FIRST',
  EventAscNullsLast = 'event_ASC_NULLS_LAST',
  EventDesc = 'event_DESC',
  EventDescNullsFirst = 'event_DESC_NULLS_FIRST',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashAscNullsLast = 'hash_ASC_NULLS_LAST',
  HashDesc = 'hash_DESC',
  HashDescNullsFirst = 'hash_DESC_NULLS_FIRST',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OgvLockupAmountAsc = 'ogvLockup_amount_ASC',
  OgvLockupAmountAscNullsFirst = 'ogvLockup_amount_ASC_NULLS_FIRST',
  OgvLockupAmountAscNullsLast = 'ogvLockup_amount_ASC_NULLS_LAST',
  OgvLockupAmountDesc = 'ogvLockup_amount_DESC',
  OgvLockupAmountDescNullsFirst = 'ogvLockup_amount_DESC_NULLS_FIRST',
  OgvLockupAmountDescNullsLast = 'ogvLockup_amount_DESC_NULLS_LAST',
  OgvLockupEndAsc = 'ogvLockup_end_ASC',
  OgvLockupEndAscNullsFirst = 'ogvLockup_end_ASC_NULLS_FIRST',
  OgvLockupEndAscNullsLast = 'ogvLockup_end_ASC_NULLS_LAST',
  OgvLockupEndDesc = 'ogvLockup_end_DESC',
  OgvLockupEndDescNullsFirst = 'ogvLockup_end_DESC_NULLS_FIRST',
  OgvLockupEndDescNullsLast = 'ogvLockup_end_DESC_NULLS_LAST',
  OgvLockupIdAsc = 'ogvLockup_id_ASC',
  OgvLockupIdAscNullsFirst = 'ogvLockup_id_ASC_NULLS_FIRST',
  OgvLockupIdAscNullsLast = 'ogvLockup_id_ASC_NULLS_LAST',
  OgvLockupIdDesc = 'ogvLockup_id_DESC',
  OgvLockupIdDescNullsFirst = 'ogvLockup_id_DESC_NULLS_FIRST',
  OgvLockupIdDescNullsLast = 'ogvLockup_id_DESC_NULLS_LAST',
  OgvLockupLockupIdAsc = 'ogvLockup_lockupId_ASC',
  OgvLockupLockupIdAscNullsFirst = 'ogvLockup_lockupId_ASC_NULLS_FIRST',
  OgvLockupLockupIdAscNullsLast = 'ogvLockup_lockupId_ASC_NULLS_LAST',
  OgvLockupLockupIdDesc = 'ogvLockup_lockupId_DESC',
  OgvLockupLockupIdDescNullsFirst = 'ogvLockup_lockupId_DESC_NULLS_FIRST',
  OgvLockupLockupIdDescNullsLast = 'ogvLockup_lockupId_DESC_NULLS_LAST',
  OgvLockupTimestampAsc = 'ogvLockup_timestamp_ASC',
  OgvLockupTimestampAscNullsFirst = 'ogvLockup_timestamp_ASC_NULLS_FIRST',
  OgvLockupTimestampAscNullsLast = 'ogvLockup_timestamp_ASC_NULLS_LAST',
  OgvLockupTimestampDesc = 'ogvLockup_timestamp_DESC',
  OgvLockupTimestampDescNullsFirst = 'ogvLockup_timestamp_DESC_NULLS_FIRST',
  OgvLockupTimestampDescNullsLast = 'ogvLockup_timestamp_DESC_NULLS_LAST',
  OgvLockupVeogvAsc = 'ogvLockup_veogv_ASC',
  OgvLockupVeogvAscNullsFirst = 'ogvLockup_veogv_ASC_NULLS_FIRST',
  OgvLockupVeogvAscNullsLast = 'ogvLockup_veogv_ASC_NULLS_LAST',
  OgvLockupVeogvDesc = 'ogvLockup_veogv_DESC',
  OgvLockupVeogvDescNullsFirst = 'ogvLockup_veogv_DESC_NULLS_FIRST',
  OgvLockupVeogvDescNullsLast = 'ogvLockup_veogv_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CirculatingAsc = 'circulating_ASC',
  CirculatingAscNullsFirst = 'circulating_ASC_NULLS_FIRST',
  CirculatingAscNullsLast = 'circulating_ASC_NULLS_LAST',
  CirculatingDesc = 'circulating_DESC',
  CirculatingDescNullsFirst = 'circulating_DESC_NULLS_FIRST',
  CirculatingDescNullsLast = 'circulating_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedAscNullsLast = 'staked_ASC_NULLS_LAST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsFirst = 'staked_DESC_NULLS_FIRST',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalAscNullsLast = 'total_ASC_NULLS_LAST',
  TotalDesc = 'total_DESC',
  TotalDescNullsFirst = 'total_DESC_NULLS_FIRST',
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
  scores: Array<Maybe<Scalars['String']['output']>>;
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
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EndBlockAsc = 'endBlock_ASC',
  EndBlockAscNullsFirst = 'endBlock_ASC_NULLS_FIRST',
  EndBlockAscNullsLast = 'endBlock_ASC_NULLS_LAST',
  EndBlockDesc = 'endBlock_DESC',
  EndBlockDescNullsFirst = 'endBlock_DESC_NULLS_FIRST',
  EndBlockDescNullsLast = 'endBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  ProposerBalanceAsc = 'proposer_balance_ASC',
  ProposerBalanceAscNullsFirst = 'proposer_balance_ASC_NULLS_FIRST',
  ProposerBalanceAscNullsLast = 'proposer_balance_ASC_NULLS_LAST',
  ProposerBalanceDesc = 'proposer_balance_DESC',
  ProposerBalanceDescNullsFirst = 'proposer_balance_DESC_NULLS_FIRST',
  ProposerBalanceDescNullsLast = 'proposer_balance_DESC_NULLS_LAST',
  ProposerIdAsc = 'proposer_id_ASC',
  ProposerIdAscNullsFirst = 'proposer_id_ASC_NULLS_FIRST',
  ProposerIdAscNullsLast = 'proposer_id_ASC_NULLS_LAST',
  ProposerIdDesc = 'proposer_id_DESC',
  ProposerIdDescNullsFirst = 'proposer_id_DESC_NULLS_FIRST',
  ProposerIdDescNullsLast = 'proposer_id_DESC_NULLS_LAST',
  ProposerLastUpdatedAsc = 'proposer_lastUpdated_ASC',
  ProposerLastUpdatedAscNullsFirst = 'proposer_lastUpdated_ASC_NULLS_FIRST',
  ProposerLastUpdatedAscNullsLast = 'proposer_lastUpdated_ASC_NULLS_LAST',
  ProposerLastUpdatedDesc = 'proposer_lastUpdated_DESC',
  ProposerLastUpdatedDescNullsFirst = 'proposer_lastUpdated_DESC_NULLS_FIRST',
  ProposerLastUpdatedDescNullsLast = 'proposer_lastUpdated_DESC_NULLS_LAST',
  ProposerStakedAsc = 'proposer_staked_ASC',
  ProposerStakedAscNullsFirst = 'proposer_staked_ASC_NULLS_FIRST',
  ProposerStakedAscNullsLast = 'proposer_staked_ASC_NULLS_LAST',
  ProposerStakedDesc = 'proposer_staked_DESC',
  ProposerStakedDescNullsFirst = 'proposer_staked_DESC_NULLS_FIRST',
  ProposerStakedDescNullsLast = 'proposer_staked_DESC_NULLS_LAST',
  ProposerVeogvBalanceAsc = 'proposer_veogvBalance_ASC',
  ProposerVeogvBalanceAscNullsFirst = 'proposer_veogvBalance_ASC_NULLS_FIRST',
  ProposerVeogvBalanceAscNullsLast = 'proposer_veogvBalance_ASC_NULLS_LAST',
  ProposerVeogvBalanceDesc = 'proposer_veogvBalance_DESC',
  ProposerVeogvBalanceDescNullsFirst = 'proposer_veogvBalance_DESC_NULLS_FIRST',
  ProposerVeogvBalanceDescNullsLast = 'proposer_veogvBalance_DESC_NULLS_LAST',
  ProposerVotingPowerAsc = 'proposer_votingPower_ASC',
  ProposerVotingPowerAscNullsFirst = 'proposer_votingPower_ASC_NULLS_FIRST',
  ProposerVotingPowerAscNullsLast = 'proposer_votingPower_ASC_NULLS_LAST',
  ProposerVotingPowerDesc = 'proposer_votingPower_DESC',
  ProposerVotingPowerDescNullsFirst = 'proposer_votingPower_DESC_NULLS_FIRST',
  ProposerVotingPowerDescNullsLast = 'proposer_votingPower_DESC_NULLS_LAST',
  QuorumAsc = 'quorum_ASC',
  QuorumAscNullsFirst = 'quorum_ASC_NULLS_FIRST',
  QuorumAscNullsLast = 'quorum_ASC_NULLS_LAST',
  QuorumDesc = 'quorum_DESC',
  QuorumDescNullsFirst = 'quorum_DESC_NULLS_FIRST',
  QuorumDescNullsLast = 'quorum_DESC_NULLS_LAST',
  StartBlockAsc = 'startBlock_ASC',
  StartBlockAscNullsFirst = 'startBlock_ASC_NULLS_FIRST',
  StartBlockAscNullsLast = 'startBlock_ASC_NULLS_LAST',
  StartBlockDesc = 'startBlock_DESC',
  StartBlockDescNullsFirst = 'startBlock_DESC_NULLS_FIRST',
  StartBlockDescNullsLast = 'startBlock_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  EventAscNullsLast = 'event_ASC_NULLS_LAST',
  EventDesc = 'event_DESC',
  EventDescNullsFirst = 'event_DESC_NULLS_FIRST',
  EventDescNullsLast = 'event_DESC_NULLS_LAST',
  HashAsc = 'hash_ASC',
  HashAscNullsFirst = 'hash_ASC_NULLS_FIRST',
  HashAscNullsLast = 'hash_ASC_NULLS_LAST',
  HashDesc = 'hash_DESC',
  HashDescNullsFirst = 'hash_DESC_NULLS_FIRST',
  HashDescNullsLast = 'hash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionAscNullsLast = 'proposal_description_ASC_NULLS_LAST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsFirst = 'proposal_description_DESC_NULLS_FIRST',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockAscNullsLast = 'proposal_endBlock_ASC_NULLS_LAST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsFirst = 'proposal_endBlock_DESC_NULLS_FIRST',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdAscNullsLast = 'proposal_id_ASC_NULLS_LAST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsFirst = 'proposal_id_DESC_NULLS_FIRST',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedAscNullsLast = 'proposal_lastUpdated_ASC_NULLS_LAST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsFirst = 'proposal_lastUpdated_DESC_NULLS_FIRST',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumAscNullsLast = 'proposal_quorum_ASC_NULLS_LAST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsFirst = 'proposal_quorum_DESC_NULLS_FIRST',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockAscNullsLast = 'proposal_startBlock_ASC_NULLS_LAST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsFirst = 'proposal_startBlock_DESC_NULLS_FIRST',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusAscNullsLast = 'proposal_status_ASC_NULLS_LAST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsFirst = 'proposal_status_DESC_NULLS_FIRST',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampAscNullsLast = 'proposal_timestamp_ASC_NULLS_LAST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsFirst = 'proposal_timestamp_DESC_NULLS_FIRST',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProposalDescriptionAsc = 'proposal_description_ASC',
  ProposalDescriptionAscNullsFirst = 'proposal_description_ASC_NULLS_FIRST',
  ProposalDescriptionAscNullsLast = 'proposal_description_ASC_NULLS_LAST',
  ProposalDescriptionDesc = 'proposal_description_DESC',
  ProposalDescriptionDescNullsFirst = 'proposal_description_DESC_NULLS_FIRST',
  ProposalDescriptionDescNullsLast = 'proposal_description_DESC_NULLS_LAST',
  ProposalEndBlockAsc = 'proposal_endBlock_ASC',
  ProposalEndBlockAscNullsFirst = 'proposal_endBlock_ASC_NULLS_FIRST',
  ProposalEndBlockAscNullsLast = 'proposal_endBlock_ASC_NULLS_LAST',
  ProposalEndBlockDesc = 'proposal_endBlock_DESC',
  ProposalEndBlockDescNullsFirst = 'proposal_endBlock_DESC_NULLS_FIRST',
  ProposalEndBlockDescNullsLast = 'proposal_endBlock_DESC_NULLS_LAST',
  ProposalIdAsc = 'proposal_id_ASC',
  ProposalIdAscNullsFirst = 'proposal_id_ASC_NULLS_FIRST',
  ProposalIdAscNullsLast = 'proposal_id_ASC_NULLS_LAST',
  ProposalIdDesc = 'proposal_id_DESC',
  ProposalIdDescNullsFirst = 'proposal_id_DESC_NULLS_FIRST',
  ProposalIdDescNullsLast = 'proposal_id_DESC_NULLS_LAST',
  ProposalLastUpdatedAsc = 'proposal_lastUpdated_ASC',
  ProposalLastUpdatedAscNullsFirst = 'proposal_lastUpdated_ASC_NULLS_FIRST',
  ProposalLastUpdatedAscNullsLast = 'proposal_lastUpdated_ASC_NULLS_LAST',
  ProposalLastUpdatedDesc = 'proposal_lastUpdated_DESC',
  ProposalLastUpdatedDescNullsFirst = 'proposal_lastUpdated_DESC_NULLS_FIRST',
  ProposalLastUpdatedDescNullsLast = 'proposal_lastUpdated_DESC_NULLS_LAST',
  ProposalQuorumAsc = 'proposal_quorum_ASC',
  ProposalQuorumAscNullsFirst = 'proposal_quorum_ASC_NULLS_FIRST',
  ProposalQuorumAscNullsLast = 'proposal_quorum_ASC_NULLS_LAST',
  ProposalQuorumDesc = 'proposal_quorum_DESC',
  ProposalQuorumDescNullsFirst = 'proposal_quorum_DESC_NULLS_FIRST',
  ProposalQuorumDescNullsLast = 'proposal_quorum_DESC_NULLS_LAST',
  ProposalStartBlockAsc = 'proposal_startBlock_ASC',
  ProposalStartBlockAscNullsFirst = 'proposal_startBlock_ASC_NULLS_FIRST',
  ProposalStartBlockAscNullsLast = 'proposal_startBlock_ASC_NULLS_LAST',
  ProposalStartBlockDesc = 'proposal_startBlock_DESC',
  ProposalStartBlockDescNullsFirst = 'proposal_startBlock_DESC_NULLS_FIRST',
  ProposalStartBlockDescNullsLast = 'proposal_startBlock_DESC_NULLS_LAST',
  ProposalStatusAsc = 'proposal_status_ASC',
  ProposalStatusAscNullsFirst = 'proposal_status_ASC_NULLS_FIRST',
  ProposalStatusAscNullsLast = 'proposal_status_ASC_NULLS_LAST',
  ProposalStatusDesc = 'proposal_status_DESC',
  ProposalStatusDescNullsFirst = 'proposal_status_DESC_NULLS_FIRST',
  ProposalStatusDescNullsLast = 'proposal_status_DESC_NULLS_LAST',
  ProposalTimestampAsc = 'proposal_timestamp_ASC',
  ProposalTimestampAscNullsFirst = 'proposal_timestamp_ASC_NULLS_FIRST',
  ProposalTimestampAscNullsLast = 'proposal_timestamp_ASC_NULLS_LAST',
  ProposalTimestampDesc = 'proposal_timestamp_DESC',
  ProposalTimestampDescNullsFirst = 'proposal_timestamp_DESC_NULLS_FIRST',
  ProposalTimestampDescNullsLast = 'proposal_timestamp_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  VoterBalanceAsc = 'voter_balance_ASC',
  VoterBalanceAscNullsFirst = 'voter_balance_ASC_NULLS_FIRST',
  VoterBalanceAscNullsLast = 'voter_balance_ASC_NULLS_LAST',
  VoterBalanceDesc = 'voter_balance_DESC',
  VoterBalanceDescNullsFirst = 'voter_balance_DESC_NULLS_FIRST',
  VoterBalanceDescNullsLast = 'voter_balance_DESC_NULLS_LAST',
  VoterIdAsc = 'voter_id_ASC',
  VoterIdAscNullsFirst = 'voter_id_ASC_NULLS_FIRST',
  VoterIdAscNullsLast = 'voter_id_ASC_NULLS_LAST',
  VoterIdDesc = 'voter_id_DESC',
  VoterIdDescNullsFirst = 'voter_id_DESC_NULLS_FIRST',
  VoterIdDescNullsLast = 'voter_id_DESC_NULLS_LAST',
  VoterLastUpdatedAsc = 'voter_lastUpdated_ASC',
  VoterLastUpdatedAscNullsFirst = 'voter_lastUpdated_ASC_NULLS_FIRST',
  VoterLastUpdatedAscNullsLast = 'voter_lastUpdated_ASC_NULLS_LAST',
  VoterLastUpdatedDesc = 'voter_lastUpdated_DESC',
  VoterLastUpdatedDescNullsFirst = 'voter_lastUpdated_DESC_NULLS_FIRST',
  VoterLastUpdatedDescNullsLast = 'voter_lastUpdated_DESC_NULLS_LAST',
  VoterStakedAsc = 'voter_staked_ASC',
  VoterStakedAscNullsFirst = 'voter_staked_ASC_NULLS_FIRST',
  VoterStakedAscNullsLast = 'voter_staked_ASC_NULLS_LAST',
  VoterStakedDesc = 'voter_staked_DESC',
  VoterStakedDescNullsFirst = 'voter_staked_DESC_NULLS_FIRST',
  VoterStakedDescNullsLast = 'voter_staked_DESC_NULLS_LAST',
  VoterVeogvBalanceAsc = 'voter_veogvBalance_ASC',
  VoterVeogvBalanceAscNullsFirst = 'voter_veogvBalance_ASC_NULLS_FIRST',
  VoterVeogvBalanceAscNullsLast = 'voter_veogvBalance_ASC_NULLS_LAST',
  VoterVeogvBalanceDesc = 'voter_veogvBalance_DESC',
  VoterVeogvBalanceDescNullsFirst = 'voter_veogvBalance_DESC_NULLS_FIRST',
  VoterVeogvBalanceDescNullsLast = 'voter_veogvBalance_DESC_NULLS_LAST',
  VoterVotingPowerAsc = 'voter_votingPower_ASC',
  VoterVotingPowerAscNullsFirst = 'voter_votingPower_ASC_NULLS_FIRST',
  VoterVotingPowerAscNullsLast = 'voter_votingPower_ASC_NULLS_LAST',
  VoterVotingPowerDesc = 'voter_votingPower_DESC',
  VoterVotingPowerDescNullsFirst = 'voter_votingPower_DESC_NULLS_FIRST',
  VoterVotingPowerDescNullsLast = 'voter_votingPower_DESC_NULLS_LAST',
  WeightAsc = 'weight_ASC',
  WeightAscNullsFirst = 'weight_ASC_NULLS_FIRST',
  WeightAscNullsLast = 'weight_ASC_NULLS_LAST',
  WeightDesc = 'weight_DESC',
  WeightDescNullsFirst = 'weight_DESC_NULLS_FIRST',
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
  scores_containsAll?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scores_containsAny?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  scores_containsNone?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
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

export type OToken = {
  __typename?: 'OToken';
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  otoken: Scalars['String']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
};

export type OTokenApy = {
  __typename?: 'OTokenAPY';
  apr: Scalars['Float']['output'];
  apy: Scalars['Float']['output'];
  apy7DayAvg: Scalars['Float']['output'];
  apy14DayAvg: Scalars['Float']['output'];
  apy30DayAvg: Scalars['Float']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type OTokenApyEdge = {
  __typename?: 'OTokenAPYEdge';
  cursor: Scalars['String']['output'];
  node: OTokenApy;
};

export enum OTokenApyOrderByInput {
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  Apy7DayAvgAsc = 'apy7DayAvg_ASC',
  Apy7DayAvgAscNullsFirst = 'apy7DayAvg_ASC_NULLS_FIRST',
  Apy7DayAvgAscNullsLast = 'apy7DayAvg_ASC_NULLS_LAST',
  Apy7DayAvgDesc = 'apy7DayAvg_DESC',
  Apy7DayAvgDescNullsFirst = 'apy7DayAvg_DESC_NULLS_FIRST',
  Apy7DayAvgDescNullsLast = 'apy7DayAvg_DESC_NULLS_LAST',
  Apy14DayAvgAsc = 'apy14DayAvg_ASC',
  Apy14DayAvgAscNullsFirst = 'apy14DayAvg_ASC_NULLS_FIRST',
  Apy14DayAvgAscNullsLast = 'apy14DayAvg_ASC_NULLS_LAST',
  Apy14DayAvgDesc = 'apy14DayAvg_DESC',
  Apy14DayAvgDescNullsFirst = 'apy14DayAvg_DESC_NULLS_FIRST',
  Apy14DayAvgDescNullsLast = 'apy14DayAvg_DESC_NULLS_LAST',
  Apy30DayAvgAsc = 'apy30DayAvg_ASC',
  Apy30DayAvgAscNullsFirst = 'apy30DayAvg_ASC_NULLS_FIRST',
  Apy30DayAvgAscNullsLast = 'apy30DayAvg_ASC_NULLS_LAST',
  Apy30DayAvgDesc = 'apy30DayAvg_DESC',
  Apy30DayAvgDescNullsFirst = 'apy30DayAvg_DESC_NULLS_FIRST',
  Apy30DayAvgDescNullsLast = 'apy30DayAvg_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  DateAsc = 'date_ASC',
  DateAscNullsFirst = 'date_ASC_NULLS_FIRST',
  DateAscNullsLast = 'date_ASC_NULLS_LAST',
  DateDesc = 'date_DESC',
  DateDescNullsFirst = 'date_DESC_NULLS_FIRST',
  DateDescNullsLast = 'date_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  RebasingCreditsPerTokenAsc = 'rebasingCreditsPerToken_ASC',
  RebasingCreditsPerTokenAscNullsFirst = 'rebasingCreditsPerToken_ASC_NULLS_FIRST',
  RebasingCreditsPerTokenAscNullsLast = 'rebasingCreditsPerToken_ASC_NULLS_LAST',
  RebasingCreditsPerTokenDesc = 'rebasingCreditsPerToken_DESC',
  RebasingCreditsPerTokenDescNullsFirst = 'rebasingCreditsPerToken_DESC_NULLS_FIRST',
  RebasingCreditsPerTokenDescNullsLast = 'rebasingCreditsPerToken_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type OTokenApyWhereInput = {
  AND?: InputMaybe<Array<OTokenApyWhereInput>>;
  OR?: InputMaybe<Array<OTokenApyWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  date_contains?: InputMaybe<Scalars['String']['input']>;
  date_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  date_endsWith?: InputMaybe<Scalars['String']['input']>;
  date_eq?: InputMaybe<Scalars['String']['input']>;
  date_gt?: InputMaybe<Scalars['String']['input']>;
  date_gte?: InputMaybe<Scalars['String']['input']>;
  date_in?: InputMaybe<Array<Scalars['String']['input']>>;
  date_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  date_lt?: InputMaybe<Scalars['String']['input']>;
  date_lte?: InputMaybe<Scalars['String']['input']>;
  date_not_contains?: InputMaybe<Scalars['String']['input']>;
  date_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  date_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  date_not_eq?: InputMaybe<Scalars['String']['input']>;
  date_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  date_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  date_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokenAPiesConnection = {
  __typename?: 'OTokenAPiesConnection';
  edges: Array<OTokenApyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenActivitiesConnection = {
  __typename?: 'OTokenActivitiesConnection';
  edges: Array<OTokenActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenActivity = {
  __typename?: 'OTokenActivity';
  action?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['BigInt']['output']>;
  blockNumber: Scalars['Int']['output'];
  callDataLast4Bytes: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  exchange?: Maybe<Scalars['String']['output']>;
  fromSymbol?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  interface?: Maybe<Scalars['String']['output']>;
  otoken: Scalars['String']['output'];
  sighash?: Maybe<Scalars['String']['output']>;
  timestamp: Scalars['DateTime']['output'];
  toSymbol?: Maybe<Scalars['String']['output']>;
  txHash: Scalars['String']['output'];
};

export type OTokenActivityEdge = {
  __typename?: 'OTokenActivityEdge';
  cursor: Scalars['String']['output'];
  node: OTokenActivity;
};

export enum OTokenActivityOrderByInput {
  ActionAsc = 'action_ASC',
  ActionAscNullsFirst = 'action_ASC_NULLS_FIRST',
  ActionAscNullsLast = 'action_ASC_NULLS_LAST',
  ActionDesc = 'action_DESC',
  ActionDescNullsFirst = 'action_DESC_NULLS_FIRST',
  ActionDescNullsLast = 'action_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CallDataLast4BytesAsc = 'callDataLast4Bytes_ASC',
  CallDataLast4BytesAscNullsFirst = 'callDataLast4Bytes_ASC_NULLS_FIRST',
  CallDataLast4BytesAscNullsLast = 'callDataLast4Bytes_ASC_NULLS_LAST',
  CallDataLast4BytesDesc = 'callDataLast4Bytes_DESC',
  CallDataLast4BytesDescNullsFirst = 'callDataLast4Bytes_DESC_NULLS_FIRST',
  CallDataLast4BytesDescNullsLast = 'callDataLast4Bytes_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  ExchangeAsc = 'exchange_ASC',
  ExchangeAscNullsFirst = 'exchange_ASC_NULLS_FIRST',
  ExchangeAscNullsLast = 'exchange_ASC_NULLS_LAST',
  ExchangeDesc = 'exchange_DESC',
  ExchangeDescNullsFirst = 'exchange_DESC_NULLS_FIRST',
  ExchangeDescNullsLast = 'exchange_DESC_NULLS_LAST',
  FromSymbolAsc = 'fromSymbol_ASC',
  FromSymbolAscNullsFirst = 'fromSymbol_ASC_NULLS_FIRST',
  FromSymbolAscNullsLast = 'fromSymbol_ASC_NULLS_LAST',
  FromSymbolDesc = 'fromSymbol_DESC',
  FromSymbolDescNullsFirst = 'fromSymbol_DESC_NULLS_FIRST',
  FromSymbolDescNullsLast = 'fromSymbol_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InterfaceAsc = 'interface_ASC',
  InterfaceAscNullsFirst = 'interface_ASC_NULLS_FIRST',
  InterfaceAscNullsLast = 'interface_ASC_NULLS_LAST',
  InterfaceDesc = 'interface_DESC',
  InterfaceDescNullsFirst = 'interface_DESC_NULLS_FIRST',
  InterfaceDescNullsLast = 'interface_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  SighashAsc = 'sighash_ASC',
  SighashAscNullsFirst = 'sighash_ASC_NULLS_FIRST',
  SighashAscNullsLast = 'sighash_ASC_NULLS_LAST',
  SighashDesc = 'sighash_DESC',
  SighashDescNullsFirst = 'sighash_DESC_NULLS_FIRST',
  SighashDescNullsLast = 'sighash_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  ToSymbolAsc = 'toSymbol_ASC',
  ToSymbolAscNullsFirst = 'toSymbol_ASC_NULLS_FIRST',
  ToSymbolAscNullsLast = 'toSymbol_ASC_NULLS_LAST',
  ToSymbolDesc = 'toSymbol_DESC',
  ToSymbolDescNullsFirst = 'toSymbol_DESC_NULLS_FIRST',
  ToSymbolDescNullsLast = 'toSymbol_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type OTokenActivityWhereInput = {
  AND?: InputMaybe<Array<OTokenActivityWhereInput>>;
  OR?: InputMaybe<Array<OTokenActivityWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokenAddress = {
  __typename?: 'OTokenAddress';
  address: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  chainId: Scalars['Int']['output'];
  credits: Scalars['BigInt']['output'];
  earned: Scalars['BigInt']['output'];
  history: Array<OTokenHistory>;
  id: Scalars['String']['output'];
  isContract: Scalars['Boolean']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  otoken: Scalars['String']['output'];
  rebasingOption: RebasingOption;
};


export type OTokenAddressHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenHistoryOrderByInput>>;
  where?: InputMaybe<OTokenHistoryWhereInput>;
};

export type OTokenAddressEdge = {
  __typename?: 'OTokenAddressEdge';
  cursor: Scalars['String']['output'];
  node: OTokenAddress;
};

export enum OTokenAddressOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  CreditsAsc = 'credits_ASC',
  CreditsAscNullsFirst = 'credits_ASC_NULLS_FIRST',
  CreditsAscNullsLast = 'credits_ASC_NULLS_LAST',
  CreditsDesc = 'credits_DESC',
  CreditsDescNullsFirst = 'credits_DESC_NULLS_FIRST',
  CreditsDescNullsLast = 'credits_DESC_NULLS_LAST',
  EarnedAsc = 'earned_ASC',
  EarnedAscNullsFirst = 'earned_ASC_NULLS_FIRST',
  EarnedAscNullsLast = 'earned_ASC_NULLS_LAST',
  EarnedDesc = 'earned_DESC',
  EarnedDescNullsFirst = 'earned_DESC_NULLS_FIRST',
  EarnedDescNullsLast = 'earned_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsContractAsc = 'isContract_ASC',
  IsContractAscNullsFirst = 'isContract_ASC_NULLS_FIRST',
  IsContractAscNullsLast = 'isContract_ASC_NULLS_LAST',
  IsContractDesc = 'isContract_DESC',
  IsContractDescNullsFirst = 'isContract_DESC_NULLS_FIRST',
  IsContractDescNullsLast = 'isContract_DESC_NULLS_LAST',
  LastUpdatedAsc = 'lastUpdated_ASC',
  LastUpdatedAscNullsFirst = 'lastUpdated_ASC_NULLS_FIRST',
  LastUpdatedAscNullsLast = 'lastUpdated_ASC_NULLS_LAST',
  LastUpdatedDesc = 'lastUpdated_DESC',
  LastUpdatedDescNullsFirst = 'lastUpdated_DESC_NULLS_FIRST',
  LastUpdatedDescNullsLast = 'lastUpdated_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  RebasingOptionAsc = 'rebasingOption_ASC',
  RebasingOptionAscNullsFirst = 'rebasingOption_ASC_NULLS_FIRST',
  RebasingOptionAscNullsLast = 'rebasingOption_ASC_NULLS_LAST',
  RebasingOptionDesc = 'rebasingOption_DESC',
  RebasingOptionDescNullsFirst = 'rebasingOption_DESC_NULLS_FIRST',
  RebasingOptionDescNullsLast = 'rebasingOption_DESC_NULLS_LAST'
}

export type OTokenAddressWhereInput = {
  AND?: InputMaybe<Array<OTokenAddressWhereInput>>;
  OR?: InputMaybe<Array<OTokenAddressWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  history_every?: InputMaybe<OTokenHistoryWhereInput>;
  history_none?: InputMaybe<OTokenHistoryWhereInput>;
  history_some?: InputMaybe<OTokenHistoryWhereInput>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
  rebasingOption_eq?: InputMaybe<RebasingOption>;
  rebasingOption_in?: InputMaybe<Array<RebasingOption>>;
  rebasingOption_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rebasingOption_not_eq?: InputMaybe<RebasingOption>;
  rebasingOption_not_in?: InputMaybe<Array<RebasingOption>>;
};

export type OTokenAddressesConnection = {
  __typename?: 'OTokenAddressesConnection';
  edges: Array<OTokenAddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenAsset = {
  __typename?: 'OTokenAsset';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type OTokenAssetEdge = {
  __typename?: 'OTokenAssetEdge';
  cursor: Scalars['String']['output'];
  node: OTokenAsset;
};

export enum OTokenAssetOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type OTokenAssetWhereInput = {
  AND?: InputMaybe<Array<OTokenAssetWhereInput>>;
  OR?: InputMaybe<Array<OTokenAssetWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokenAssetsConnection = {
  __typename?: 'OTokenAssetsConnection';
  edges: Array<OTokenAssetEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenEdge = {
  __typename?: 'OTokenEdge';
  cursor: Scalars['String']['output'];
  node: OToken;
};

export type OTokenHistoriesConnection = {
  __typename?: 'OTokenHistoriesConnection';
  edges: Array<OTokenHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenHistory = {
  __typename?: 'OTokenHistory';
  address: OTokenAddress;
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
  type: HistoryType;
  value: Scalars['BigInt']['output'];
};

export type OTokenHistoryEdge = {
  __typename?: 'OTokenHistoryEdge';
  cursor: Scalars['String']['output'];
  node: OTokenHistory;
};

export enum OTokenHistoryOrderByInput {
  AddressAddressAsc = 'address_address_ASC',
  AddressAddressAscNullsFirst = 'address_address_ASC_NULLS_FIRST',
  AddressAddressAscNullsLast = 'address_address_ASC_NULLS_LAST',
  AddressAddressDesc = 'address_address_DESC',
  AddressAddressDescNullsFirst = 'address_address_DESC_NULLS_FIRST',
  AddressAddressDescNullsLast = 'address_address_DESC_NULLS_LAST',
  AddressBalanceAsc = 'address_balance_ASC',
  AddressBalanceAscNullsFirst = 'address_balance_ASC_NULLS_FIRST',
  AddressBalanceAscNullsLast = 'address_balance_ASC_NULLS_LAST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsFirst = 'address_balance_DESC_NULLS_FIRST',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressChainIdAsc = 'address_chainId_ASC',
  AddressChainIdAscNullsFirst = 'address_chainId_ASC_NULLS_FIRST',
  AddressChainIdAscNullsLast = 'address_chainId_ASC_NULLS_LAST',
  AddressChainIdDesc = 'address_chainId_DESC',
  AddressChainIdDescNullsFirst = 'address_chainId_DESC_NULLS_FIRST',
  AddressChainIdDescNullsLast = 'address_chainId_DESC_NULLS_LAST',
  AddressCreditsAsc = 'address_credits_ASC',
  AddressCreditsAscNullsFirst = 'address_credits_ASC_NULLS_FIRST',
  AddressCreditsAscNullsLast = 'address_credits_ASC_NULLS_LAST',
  AddressCreditsDesc = 'address_credits_DESC',
  AddressCreditsDescNullsFirst = 'address_credits_DESC_NULLS_FIRST',
  AddressCreditsDescNullsLast = 'address_credits_DESC_NULLS_LAST',
  AddressEarnedAsc = 'address_earned_ASC',
  AddressEarnedAscNullsFirst = 'address_earned_ASC_NULLS_FIRST',
  AddressEarnedAscNullsLast = 'address_earned_ASC_NULLS_LAST',
  AddressEarnedDesc = 'address_earned_DESC',
  AddressEarnedDescNullsFirst = 'address_earned_DESC_NULLS_FIRST',
  AddressEarnedDescNullsLast = 'address_earned_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdAscNullsLast = 'address_id_ASC_NULLS_LAST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsFirst = 'address_id_DESC_NULLS_FIRST',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressIsContractAsc = 'address_isContract_ASC',
  AddressIsContractAscNullsFirst = 'address_isContract_ASC_NULLS_FIRST',
  AddressIsContractAscNullsLast = 'address_isContract_ASC_NULLS_LAST',
  AddressIsContractDesc = 'address_isContract_DESC',
  AddressIsContractDescNullsFirst = 'address_isContract_DESC_NULLS_FIRST',
  AddressIsContractDescNullsLast = 'address_isContract_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedAscNullsLast = 'address_lastUpdated_ASC_NULLS_LAST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsFirst = 'address_lastUpdated_DESC_NULLS_FIRST',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressOtokenAsc = 'address_otoken_ASC',
  AddressOtokenAscNullsFirst = 'address_otoken_ASC_NULLS_FIRST',
  AddressOtokenAscNullsLast = 'address_otoken_ASC_NULLS_LAST',
  AddressOtokenDesc = 'address_otoken_DESC',
  AddressOtokenDescNullsFirst = 'address_otoken_DESC_NULLS_FIRST',
  AddressOtokenDescNullsLast = 'address_otoken_DESC_NULLS_LAST',
  AddressRebasingOptionAsc = 'address_rebasingOption_ASC',
  AddressRebasingOptionAscNullsFirst = 'address_rebasingOption_ASC_NULLS_FIRST',
  AddressRebasingOptionAscNullsLast = 'address_rebasingOption_ASC_NULLS_LAST',
  AddressRebasingOptionDesc = 'address_rebasingOption_DESC',
  AddressRebasingOptionDescNullsFirst = 'address_rebasingOption_DESC_NULLS_FIRST',
  AddressRebasingOptionDescNullsLast = 'address_rebasingOption_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
  ValueDescNullsLast = 'value_DESC_NULLS_LAST'
}

export type OTokenHistoryWhereInput = {
  AND?: InputMaybe<Array<OTokenHistoryWhereInput>>;
  OR?: InputMaybe<Array<OTokenHistoryWhereInput>>;
  address?: InputMaybe<OTokenAddressWhereInput>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export enum OTokenOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyAscNullsLast = 'nonRebasingSupply_ASC_NULLS_LAST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsFirst = 'nonRebasingSupply_DESC_NULLS_FIRST',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyAscNullsLast = 'rebasingSupply_ASC_NULLS_LAST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsFirst = 'rebasingSupply_DESC_NULLS_FIRST',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST'
}

export type OTokenRebase = {
  __typename?: 'OTokenRebase';
  apy: OTokenApy;
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  feeETH: Scalars['BigInt']['output'];
  feeUSD: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  yieldETH: Scalars['BigInt']['output'];
  yieldUSD: Scalars['BigInt']['output'];
};

export type OTokenRebaseEdge = {
  __typename?: 'OTokenRebaseEdge';
  cursor: Scalars['String']['output'];
  node: OTokenRebase;
};

export type OTokenRebaseOption = {
  __typename?: 'OTokenRebaseOption';
  address: OTokenAddress;
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  status: RebasingOption;
  timestamp: Scalars['DateTime']['output'];
  txHash: Scalars['String']['output'];
};

export type OTokenRebaseOptionEdge = {
  __typename?: 'OTokenRebaseOptionEdge';
  cursor: Scalars['String']['output'];
  node: OTokenRebaseOption;
};

export enum OTokenRebaseOptionOrderByInput {
  AddressAddressAsc = 'address_address_ASC',
  AddressAddressAscNullsFirst = 'address_address_ASC_NULLS_FIRST',
  AddressAddressAscNullsLast = 'address_address_ASC_NULLS_LAST',
  AddressAddressDesc = 'address_address_DESC',
  AddressAddressDescNullsFirst = 'address_address_DESC_NULLS_FIRST',
  AddressAddressDescNullsLast = 'address_address_DESC_NULLS_LAST',
  AddressBalanceAsc = 'address_balance_ASC',
  AddressBalanceAscNullsFirst = 'address_balance_ASC_NULLS_FIRST',
  AddressBalanceAscNullsLast = 'address_balance_ASC_NULLS_LAST',
  AddressBalanceDesc = 'address_balance_DESC',
  AddressBalanceDescNullsFirst = 'address_balance_DESC_NULLS_FIRST',
  AddressBalanceDescNullsLast = 'address_balance_DESC_NULLS_LAST',
  AddressChainIdAsc = 'address_chainId_ASC',
  AddressChainIdAscNullsFirst = 'address_chainId_ASC_NULLS_FIRST',
  AddressChainIdAscNullsLast = 'address_chainId_ASC_NULLS_LAST',
  AddressChainIdDesc = 'address_chainId_DESC',
  AddressChainIdDescNullsFirst = 'address_chainId_DESC_NULLS_FIRST',
  AddressChainIdDescNullsLast = 'address_chainId_DESC_NULLS_LAST',
  AddressCreditsAsc = 'address_credits_ASC',
  AddressCreditsAscNullsFirst = 'address_credits_ASC_NULLS_FIRST',
  AddressCreditsAscNullsLast = 'address_credits_ASC_NULLS_LAST',
  AddressCreditsDesc = 'address_credits_DESC',
  AddressCreditsDescNullsFirst = 'address_credits_DESC_NULLS_FIRST',
  AddressCreditsDescNullsLast = 'address_credits_DESC_NULLS_LAST',
  AddressEarnedAsc = 'address_earned_ASC',
  AddressEarnedAscNullsFirst = 'address_earned_ASC_NULLS_FIRST',
  AddressEarnedAscNullsLast = 'address_earned_ASC_NULLS_LAST',
  AddressEarnedDesc = 'address_earned_DESC',
  AddressEarnedDescNullsFirst = 'address_earned_DESC_NULLS_FIRST',
  AddressEarnedDescNullsLast = 'address_earned_DESC_NULLS_LAST',
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdAscNullsLast = 'address_id_ASC_NULLS_LAST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsFirst = 'address_id_DESC_NULLS_FIRST',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  AddressIsContractAsc = 'address_isContract_ASC',
  AddressIsContractAscNullsFirst = 'address_isContract_ASC_NULLS_FIRST',
  AddressIsContractAscNullsLast = 'address_isContract_ASC_NULLS_LAST',
  AddressIsContractDesc = 'address_isContract_DESC',
  AddressIsContractDescNullsFirst = 'address_isContract_DESC_NULLS_FIRST',
  AddressIsContractDescNullsLast = 'address_isContract_DESC_NULLS_LAST',
  AddressLastUpdatedAsc = 'address_lastUpdated_ASC',
  AddressLastUpdatedAscNullsFirst = 'address_lastUpdated_ASC_NULLS_FIRST',
  AddressLastUpdatedAscNullsLast = 'address_lastUpdated_ASC_NULLS_LAST',
  AddressLastUpdatedDesc = 'address_lastUpdated_DESC',
  AddressLastUpdatedDescNullsFirst = 'address_lastUpdated_DESC_NULLS_FIRST',
  AddressLastUpdatedDescNullsLast = 'address_lastUpdated_DESC_NULLS_LAST',
  AddressOtokenAsc = 'address_otoken_ASC',
  AddressOtokenAscNullsFirst = 'address_otoken_ASC_NULLS_FIRST',
  AddressOtokenAscNullsLast = 'address_otoken_ASC_NULLS_LAST',
  AddressOtokenDesc = 'address_otoken_DESC',
  AddressOtokenDescNullsFirst = 'address_otoken_DESC_NULLS_FIRST',
  AddressOtokenDescNullsLast = 'address_otoken_DESC_NULLS_LAST',
  AddressRebasingOptionAsc = 'address_rebasingOption_ASC',
  AddressRebasingOptionAscNullsFirst = 'address_rebasingOption_ASC_NULLS_FIRST',
  AddressRebasingOptionAscNullsLast = 'address_rebasingOption_ASC_NULLS_LAST',
  AddressRebasingOptionDesc = 'address_rebasingOption_DESC',
  AddressRebasingOptionDescNullsFirst = 'address_rebasingOption_DESC_NULLS_FIRST',
  AddressRebasingOptionDescNullsLast = 'address_rebasingOption_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST'
}

export type OTokenRebaseOptionWhereInput = {
  AND?: InputMaybe<Array<OTokenRebaseOptionWhereInput>>;
  OR?: InputMaybe<Array<OTokenRebaseOptionWhereInput>>;
  address?: InputMaybe<OTokenAddressWhereInput>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokenRebaseOptionsConnection = {
  __typename?: 'OTokenRebaseOptionsConnection';
  edges: Array<OTokenRebaseOptionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum OTokenRebaseOrderByInput {
  ApyAprAsc = 'apy_apr_ASC',
  ApyAprAscNullsFirst = 'apy_apr_ASC_NULLS_FIRST',
  ApyAprAscNullsLast = 'apy_apr_ASC_NULLS_LAST',
  ApyAprDesc = 'apy_apr_DESC',
  ApyAprDescNullsFirst = 'apy_apr_DESC_NULLS_FIRST',
  ApyAprDescNullsLast = 'apy_apr_DESC_NULLS_LAST',
  ApyApy7DayAvgAsc = 'apy_apy7DayAvg_ASC',
  ApyApy7DayAvgAscNullsFirst = 'apy_apy7DayAvg_ASC_NULLS_FIRST',
  ApyApy7DayAvgAscNullsLast = 'apy_apy7DayAvg_ASC_NULLS_LAST',
  ApyApy7DayAvgDesc = 'apy_apy7DayAvg_DESC',
  ApyApy7DayAvgDescNullsFirst = 'apy_apy7DayAvg_DESC_NULLS_FIRST',
  ApyApy7DayAvgDescNullsLast = 'apy_apy7DayAvg_DESC_NULLS_LAST',
  ApyApy14DayAvgAsc = 'apy_apy14DayAvg_ASC',
  ApyApy14DayAvgAscNullsFirst = 'apy_apy14DayAvg_ASC_NULLS_FIRST',
  ApyApy14DayAvgAscNullsLast = 'apy_apy14DayAvg_ASC_NULLS_LAST',
  ApyApy14DayAvgDesc = 'apy_apy14DayAvg_DESC',
  ApyApy14DayAvgDescNullsFirst = 'apy_apy14DayAvg_DESC_NULLS_FIRST',
  ApyApy14DayAvgDescNullsLast = 'apy_apy14DayAvg_DESC_NULLS_LAST',
  ApyApy30DayAvgAsc = 'apy_apy30DayAvg_ASC',
  ApyApy30DayAvgAscNullsFirst = 'apy_apy30DayAvg_ASC_NULLS_FIRST',
  ApyApy30DayAvgAscNullsLast = 'apy_apy30DayAvg_ASC_NULLS_LAST',
  ApyApy30DayAvgDesc = 'apy_apy30DayAvg_DESC',
  ApyApy30DayAvgDescNullsFirst = 'apy_apy30DayAvg_DESC_NULLS_FIRST',
  ApyApy30DayAvgDescNullsLast = 'apy_apy30DayAvg_DESC_NULLS_LAST',
  ApyApyAsc = 'apy_apy_ASC',
  ApyApyAscNullsFirst = 'apy_apy_ASC_NULLS_FIRST',
  ApyApyAscNullsLast = 'apy_apy_ASC_NULLS_LAST',
  ApyApyDesc = 'apy_apy_DESC',
  ApyApyDescNullsFirst = 'apy_apy_DESC_NULLS_FIRST',
  ApyApyDescNullsLast = 'apy_apy_DESC_NULLS_LAST',
  ApyBlockNumberAsc = 'apy_blockNumber_ASC',
  ApyBlockNumberAscNullsFirst = 'apy_blockNumber_ASC_NULLS_FIRST',
  ApyBlockNumberAscNullsLast = 'apy_blockNumber_ASC_NULLS_LAST',
  ApyBlockNumberDesc = 'apy_blockNumber_DESC',
  ApyBlockNumberDescNullsFirst = 'apy_blockNumber_DESC_NULLS_FIRST',
  ApyBlockNumberDescNullsLast = 'apy_blockNumber_DESC_NULLS_LAST',
  ApyChainIdAsc = 'apy_chainId_ASC',
  ApyChainIdAscNullsFirst = 'apy_chainId_ASC_NULLS_FIRST',
  ApyChainIdAscNullsLast = 'apy_chainId_ASC_NULLS_LAST',
  ApyChainIdDesc = 'apy_chainId_DESC',
  ApyChainIdDescNullsFirst = 'apy_chainId_DESC_NULLS_FIRST',
  ApyChainIdDescNullsLast = 'apy_chainId_DESC_NULLS_LAST',
  ApyDateAsc = 'apy_date_ASC',
  ApyDateAscNullsFirst = 'apy_date_ASC_NULLS_FIRST',
  ApyDateAscNullsLast = 'apy_date_ASC_NULLS_LAST',
  ApyDateDesc = 'apy_date_DESC',
  ApyDateDescNullsFirst = 'apy_date_DESC_NULLS_FIRST',
  ApyDateDescNullsLast = 'apy_date_DESC_NULLS_LAST',
  ApyIdAsc = 'apy_id_ASC',
  ApyIdAscNullsFirst = 'apy_id_ASC_NULLS_FIRST',
  ApyIdAscNullsLast = 'apy_id_ASC_NULLS_LAST',
  ApyIdDesc = 'apy_id_DESC',
  ApyIdDescNullsFirst = 'apy_id_DESC_NULLS_FIRST',
  ApyIdDescNullsLast = 'apy_id_DESC_NULLS_LAST',
  ApyOtokenAsc = 'apy_otoken_ASC',
  ApyOtokenAscNullsFirst = 'apy_otoken_ASC_NULLS_FIRST',
  ApyOtokenAscNullsLast = 'apy_otoken_ASC_NULLS_LAST',
  ApyOtokenDesc = 'apy_otoken_DESC',
  ApyOtokenDescNullsFirst = 'apy_otoken_DESC_NULLS_FIRST',
  ApyOtokenDescNullsLast = 'apy_otoken_DESC_NULLS_LAST',
  ApyRebasingCreditsPerTokenAsc = 'apy_rebasingCreditsPerToken_ASC',
  ApyRebasingCreditsPerTokenAscNullsFirst = 'apy_rebasingCreditsPerToken_ASC_NULLS_FIRST',
  ApyRebasingCreditsPerTokenAscNullsLast = 'apy_rebasingCreditsPerToken_ASC_NULLS_LAST',
  ApyRebasingCreditsPerTokenDesc = 'apy_rebasingCreditsPerToken_DESC',
  ApyRebasingCreditsPerTokenDescNullsFirst = 'apy_rebasingCreditsPerToken_DESC_NULLS_FIRST',
  ApyRebasingCreditsPerTokenDescNullsLast = 'apy_rebasingCreditsPerToken_DESC_NULLS_LAST',
  ApyTimestampAsc = 'apy_timestamp_ASC',
  ApyTimestampAscNullsFirst = 'apy_timestamp_ASC_NULLS_FIRST',
  ApyTimestampAscNullsLast = 'apy_timestamp_ASC_NULLS_LAST',
  ApyTimestampDesc = 'apy_timestamp_DESC',
  ApyTimestampDescNullsFirst = 'apy_timestamp_DESC_NULLS_FIRST',
  ApyTimestampDescNullsLast = 'apy_timestamp_DESC_NULLS_LAST',
  ApyTxHashAsc = 'apy_txHash_ASC',
  ApyTxHashAscNullsFirst = 'apy_txHash_ASC_NULLS_FIRST',
  ApyTxHashAscNullsLast = 'apy_txHash_ASC_NULLS_LAST',
  ApyTxHashDesc = 'apy_txHash_DESC',
  ApyTxHashDescNullsFirst = 'apy_txHash_DESC_NULLS_FIRST',
  ApyTxHashDescNullsLast = 'apy_txHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  FeeEthAsc = 'feeETH_ASC',
  FeeEthAscNullsFirst = 'feeETH_ASC_NULLS_FIRST',
  FeeEthAscNullsLast = 'feeETH_ASC_NULLS_LAST',
  FeeEthDesc = 'feeETH_DESC',
  FeeEthDescNullsFirst = 'feeETH_DESC_NULLS_FIRST',
  FeeEthDescNullsLast = 'feeETH_DESC_NULLS_LAST',
  FeeUsdAsc = 'feeUSD_ASC',
  FeeUsdAscNullsFirst = 'feeUSD_ASC_NULLS_FIRST',
  FeeUsdAscNullsLast = 'feeUSD_ASC_NULLS_LAST',
  FeeUsdDesc = 'feeUSD_DESC',
  FeeUsdDescNullsFirst = 'feeUSD_DESC_NULLS_FIRST',
  FeeUsdDescNullsLast = 'feeUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  RebasingCreditsPerTokenAsc = 'rebasingCreditsPerToken_ASC',
  RebasingCreditsPerTokenAscNullsFirst = 'rebasingCreditsPerToken_ASC_NULLS_FIRST',
  RebasingCreditsPerTokenAscNullsLast = 'rebasingCreditsPerToken_ASC_NULLS_LAST',
  RebasingCreditsPerTokenDesc = 'rebasingCreditsPerToken_DESC',
  RebasingCreditsPerTokenDescNullsFirst = 'rebasingCreditsPerToken_DESC_NULLS_FIRST',
  RebasingCreditsPerTokenDescNullsLast = 'rebasingCreditsPerToken_DESC_NULLS_LAST',
  RebasingCreditsAsc = 'rebasingCredits_ASC',
  RebasingCreditsAscNullsFirst = 'rebasingCredits_ASC_NULLS_FIRST',
  RebasingCreditsAscNullsLast = 'rebasingCredits_ASC_NULLS_LAST',
  RebasingCreditsDesc = 'rebasingCredits_DESC',
  RebasingCreditsDescNullsFirst = 'rebasingCredits_DESC_NULLS_FIRST',
  RebasingCreditsDescNullsLast = 'rebasingCredits_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TxHashAsc = 'txHash_ASC',
  TxHashAscNullsFirst = 'txHash_ASC_NULLS_FIRST',
  TxHashAscNullsLast = 'txHash_ASC_NULLS_LAST',
  TxHashDesc = 'txHash_DESC',
  TxHashDescNullsFirst = 'txHash_DESC_NULLS_FIRST',
  TxHashDescNullsLast = 'txHash_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthAscNullsLast = 'yieldETH_ASC_NULLS_LAST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsFirst = 'yieldETH_DESC_NULLS_FIRST',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdAscNullsLast = 'yieldUSD_ASC_NULLS_LAST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsFirst = 'yieldUSD_DESC_NULLS_FIRST',
  YieldUsdDescNullsLast = 'yieldUSD_DESC_NULLS_LAST'
}

export type OTokenRebaseWhereInput = {
  AND?: InputMaybe<Array<OTokenRebaseWhereInput>>;
  OR?: InputMaybe<Array<OTokenRebaseWhereInput>>;
  apy?: InputMaybe<OTokenApyWhereInput>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokenRebasesConnection = {
  __typename?: 'OTokenRebasesConnection';
  edges: Array<OTokenRebaseEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenVault = {
  __typename?: 'OTokenVault';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  otoken: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalValue: Scalars['BigInt']['output'];
};

export type OTokenVaultEdge = {
  __typename?: 'OTokenVaultEdge';
  cursor: Scalars['String']['output'];
  node: OTokenVault;
};

export enum OTokenVaultOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ChainIdAsc = 'chainId_ASC',
  ChainIdAscNullsFirst = 'chainId_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chainId_ASC_NULLS_LAST',
  ChainIdDesc = 'chainId_DESC',
  ChainIdDescNullsFirst = 'chainId_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chainId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OtokenAsc = 'otoken_ASC',
  OtokenAscNullsFirst = 'otoken_ASC_NULLS_FIRST',
  OtokenAscNullsLast = 'otoken_ASC_NULLS_LAST',
  OtokenDesc = 'otoken_DESC',
  OtokenDescNullsFirst = 'otoken_DESC_NULLS_FIRST',
  OtokenDescNullsLast = 'otoken_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalValueAsc = 'totalValue_ASC',
  TotalValueAscNullsFirst = 'totalValue_ASC_NULLS_FIRST',
  TotalValueAscNullsLast = 'totalValue_ASC_NULLS_LAST',
  TotalValueDesc = 'totalValue_DESC',
  TotalValueDescNullsFirst = 'totalValue_DESC_NULLS_FIRST',
  TotalValueDescNullsLast = 'totalValue_DESC_NULLS_LAST'
}

export type OTokenVaultWhereInput = {
  AND?: InputMaybe<Array<OTokenVaultWhereInput>>;
  OR?: InputMaybe<Array<OTokenVaultWhereInput>>;
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
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  totalValue_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalValue_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  totalValue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  totalValue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OTokenVaultsConnection = {
  __typename?: 'OTokenVaultsConnection';
  edges: Array<OTokenVaultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type OTokenWhereInput = {
  AND?: InputMaybe<Array<OTokenWhereInput>>;
  OR?: InputMaybe<Array<OTokenWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_gt?: InputMaybe<Scalars['Int']['input']>;
  chainId_gte?: InputMaybe<Scalars['Int']['input']>;
  chainId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  chainId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  chainId_lt?: InputMaybe<Scalars['Int']['input']>;
  chainId_lte?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  chainId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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
  otoken_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_gt?: InputMaybe<Scalars['String']['input']>;
  otoken_gte?: InputMaybe<Scalars['String']['input']>;
  otoken_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  otoken_lt?: InputMaybe<Scalars['String']['input']>;
  otoken_lte?: InputMaybe<Scalars['String']['input']>;
  otoken_not_contains?: InputMaybe<Scalars['String']['input']>;
  otoken_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  otoken_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_not_eq?: InputMaybe<Scalars['String']['input']>;
  otoken_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  otoken_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  otoken_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type OTokensConnection = {
  __typename?: 'OTokensConnection';
  edges: Array<OTokenEdge>;
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  DailyStatIdAmoSupplyAsc = 'dailyStatId_amoSupply_ASC',
  DailyStatIdAmoSupplyAscNullsFirst = 'dailyStatId_amoSupply_ASC_NULLS_FIRST',
  DailyStatIdAmoSupplyAscNullsLast = 'dailyStatId_amoSupply_ASC_NULLS_LAST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsFirst = 'dailyStatId_amoSupply_DESC_NULLS_FIRST',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprAscNullsLast = 'dailyStatId_apr_ASC_NULLS_LAST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsFirst = 'dailyStatId_apr_DESC_NULLS_FIRST',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgAscNullsLast = 'dailyStatId_apy7DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsFirst = 'dailyStatId_apy7DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgAscNullsLast = 'dailyStatId_apy14DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsFirst = 'dailyStatId_apy14DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgAscNullsLast = 'dailyStatId_apy30DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsFirst = 'dailyStatId_apy30DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyAscNullsLast = 'dailyStatId_apy_ASC_NULLS_LAST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsFirst = 'dailyStatId_apy_DESC_NULLS_FIRST',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberAscNullsLast = 'dailyStatId_blockNumber_ASC_NULLS_LAST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsFirst = 'dailyStatId_blockNumber_DESC_NULLS_FIRST',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethAscNullsLast = 'dailyStatId_dripperWETH_ASC_NULLS_LAST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsFirst = 'dailyStatId_dripperWETH_DESC_NULLS_FIRST',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayAscNullsLast = 'dailyStatId_feesETH7Day_ASC_NULLS_LAST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsFirst = 'dailyStatId_feesETH7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeAscNullsLast = 'dailyStatId_feesETHAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsFirst = 'dailyStatId_feesETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAscNullsLast = 'dailyStatId_feesETH_ASC_NULLS_LAST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsFirst = 'dailyStatId_feesETH_DESC_NULLS_FIRST',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayAscNullsLast = 'dailyStatId_feesUSD7Day_ASC_NULLS_LAST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsFirst = 'dailyStatId_feesUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeAscNullsLast = 'dailyStatId_feesUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsFirst = 'dailyStatId_feesUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAscNullsLast = 'dailyStatId_feesUSD_ASC_NULLS_LAST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsFirst = 'dailyStatId_feesUSD_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdAscNullsLast = 'dailyStatId_holdersOverThreshold_ASC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsFirst = 'dailyStatId_holdersOverThreshold_DESC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdAscNullsLast = 'dailyStatId_id_ASC_NULLS_LAST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsFirst = 'dailyStatId_id_DESC_NULLS_FIRST',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdAscNullsLast = 'dailyStatId_marketCapUSD_ASC_NULLS_LAST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsFirst = 'dailyStatId_marketCapUSD_DESC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyAscNullsLast = 'dailyStatId_nonRebasingSupply_ASC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsFirst = 'dailyStatId_nonRebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceAscNullsLast = 'dailyStatId_pegPrice_ASC_NULLS_LAST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsFirst = 'dailyStatId_pegPrice_DESC_NULLS_FIRST',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyAscNullsLast = 'dailyStatId_rebasingSupply_ASC_NULLS_LAST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsFirst = 'dailyStatId_rebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampAscNullsLast = 'dailyStatId_timestamp_ASC_NULLS_LAST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsFirst = 'dailyStatId_timestamp_DESC_NULLS_FIRST',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdAscNullsLast = 'dailyStatId_totalSupplyUSD_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsFirst = 'dailyStatId_totalSupplyUSD_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyAscNullsLast = 'dailyStatId_totalSupply_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsFirst = 'dailyStatId_totalSupply_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdAscNullsLast = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsFirst = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyAscNullsLast = 'dailyStatId_wrappedSupply_ASC_NULLS_LAST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsFirst = 'dailyStatId_wrappedSupply_DESC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayAscNullsLast = 'dailyStatId_yieldETH7Day_ASC_NULLS_LAST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsFirst = 'dailyStatId_yieldETH7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeAscNullsLast = 'dailyStatId_yieldETHAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsFirst = 'dailyStatId_yieldETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAscNullsLast = 'dailyStatId_yieldETH_ASC_NULLS_LAST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsFirst = 'dailyStatId_yieldETH_DESC_NULLS_FIRST',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayAscNullsLast = 'dailyStatId_yieldUSD7Day_ASC_NULLS_LAST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsFirst = 'dailyStatId_yieldUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeAscNullsLast = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsFirst = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAscNullsLast = 'dailyStatId_yieldUSD_ASC_NULLS_LAST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsFirst = 'dailyStatId_yieldUSD_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceAscNullsLast = 'price_ASC_NULLS_LAST',
  PriceDesc = 'price_DESC',
  PriceDescNullsFirst = 'price_DESC_NULLS_FIRST',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  AmoSupplyAscNullsLast = 'amoSupply_ASC_NULLS_LAST',
  AmoSupplyDesc = 'amoSupply_DESC',
  AmoSupplyDescNullsFirst = 'amoSupply_DESC_NULLS_FIRST',
  AmoSupplyDescNullsLast = 'amoSupply_DESC_NULLS_LAST',
  AprAsc = 'apr_ASC',
  AprAscNullsFirst = 'apr_ASC_NULLS_FIRST',
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  Apy7DayAvgAsc = 'apy7DayAvg_ASC',
  Apy7DayAvgAscNullsFirst = 'apy7DayAvg_ASC_NULLS_FIRST',
  Apy7DayAvgAscNullsLast = 'apy7DayAvg_ASC_NULLS_LAST',
  Apy7DayAvgDesc = 'apy7DayAvg_DESC',
  Apy7DayAvgDescNullsFirst = 'apy7DayAvg_DESC_NULLS_FIRST',
  Apy7DayAvgDescNullsLast = 'apy7DayAvg_DESC_NULLS_LAST',
  Apy14DayAvgAsc = 'apy14DayAvg_ASC',
  Apy14DayAvgAscNullsFirst = 'apy14DayAvg_ASC_NULLS_FIRST',
  Apy14DayAvgAscNullsLast = 'apy14DayAvg_ASC_NULLS_LAST',
  Apy14DayAvgDesc = 'apy14DayAvg_DESC',
  Apy14DayAvgDescNullsFirst = 'apy14DayAvg_DESC_NULLS_FIRST',
  Apy14DayAvgDescNullsLast = 'apy14DayAvg_DESC_NULLS_LAST',
  Apy30DayAvgAsc = 'apy30DayAvg_ASC',
  Apy30DayAvgAscNullsFirst = 'apy30DayAvg_ASC_NULLS_FIRST',
  Apy30DayAvgAscNullsLast = 'apy30DayAvg_ASC_NULLS_LAST',
  Apy30DayAvgDesc = 'apy30DayAvg_DESC',
  Apy30DayAvgDescNullsFirst = 'apy30DayAvg_DESC_NULLS_FIRST',
  Apy30DayAvgDescNullsLast = 'apy30DayAvg_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DripperWethAsc = 'dripperWETH_ASC',
  DripperWethAscNullsFirst = 'dripperWETH_ASC_NULLS_FIRST',
  DripperWethAscNullsLast = 'dripperWETH_ASC_NULLS_LAST',
  DripperWethDesc = 'dripperWETH_DESC',
  DripperWethDescNullsFirst = 'dripperWETH_DESC_NULLS_FIRST',
  DripperWethDescNullsLast = 'dripperWETH_DESC_NULLS_LAST',
  FeesEth7DayAsc = 'feesETH7Day_ASC',
  FeesEth7DayAscNullsFirst = 'feesETH7Day_ASC_NULLS_FIRST',
  FeesEth7DayAscNullsLast = 'feesETH7Day_ASC_NULLS_LAST',
  FeesEth7DayDesc = 'feesETH7Day_DESC',
  FeesEth7DayDescNullsFirst = 'feesETH7Day_DESC_NULLS_FIRST',
  FeesEth7DayDescNullsLast = 'feesETH7Day_DESC_NULLS_LAST',
  FeesEthAllTimeAsc = 'feesETHAllTime_ASC',
  FeesEthAllTimeAscNullsFirst = 'feesETHAllTime_ASC_NULLS_FIRST',
  FeesEthAllTimeAscNullsLast = 'feesETHAllTime_ASC_NULLS_LAST',
  FeesEthAllTimeDesc = 'feesETHAllTime_DESC',
  FeesEthAllTimeDescNullsFirst = 'feesETHAllTime_DESC_NULLS_FIRST',
  FeesEthAllTimeDescNullsLast = 'feesETHAllTime_DESC_NULLS_LAST',
  FeesEthAsc = 'feesETH_ASC',
  FeesEthAscNullsFirst = 'feesETH_ASC_NULLS_FIRST',
  FeesEthAscNullsLast = 'feesETH_ASC_NULLS_LAST',
  FeesEthDesc = 'feesETH_DESC',
  FeesEthDescNullsFirst = 'feesETH_DESC_NULLS_FIRST',
  FeesEthDescNullsLast = 'feesETH_DESC_NULLS_LAST',
  FeesUsd7DayAsc = 'feesUSD7Day_ASC',
  FeesUsd7DayAscNullsFirst = 'feesUSD7Day_ASC_NULLS_FIRST',
  FeesUsd7DayAscNullsLast = 'feesUSD7Day_ASC_NULLS_LAST',
  FeesUsd7DayDesc = 'feesUSD7Day_DESC',
  FeesUsd7DayDescNullsFirst = 'feesUSD7Day_DESC_NULLS_FIRST',
  FeesUsd7DayDescNullsLast = 'feesUSD7Day_DESC_NULLS_LAST',
  FeesUsdAllTimeAsc = 'feesUSDAllTime_ASC',
  FeesUsdAllTimeAscNullsFirst = 'feesUSDAllTime_ASC_NULLS_FIRST',
  FeesUsdAllTimeAscNullsLast = 'feesUSDAllTime_ASC_NULLS_LAST',
  FeesUsdAllTimeDesc = 'feesUSDAllTime_DESC',
  FeesUsdAllTimeDescNullsFirst = 'feesUSDAllTime_DESC_NULLS_FIRST',
  FeesUsdAllTimeDescNullsLast = 'feesUSDAllTime_DESC_NULLS_LAST',
  FeesUsdAsc = 'feesUSD_ASC',
  FeesUsdAscNullsFirst = 'feesUSD_ASC_NULLS_FIRST',
  FeesUsdAscNullsLast = 'feesUSD_ASC_NULLS_LAST',
  FeesUsdDesc = 'feesUSD_DESC',
  FeesUsdDescNullsFirst = 'feesUSD_DESC_NULLS_FIRST',
  FeesUsdDescNullsLast = 'feesUSD_DESC_NULLS_LAST',
  HoldersOverThresholdAsc = 'holdersOverThreshold_ASC',
  HoldersOverThresholdAscNullsFirst = 'holdersOverThreshold_ASC_NULLS_FIRST',
  HoldersOverThresholdAscNullsLast = 'holdersOverThreshold_ASC_NULLS_LAST',
  HoldersOverThresholdDesc = 'holdersOverThreshold_DESC',
  HoldersOverThresholdDescNullsFirst = 'holdersOverThreshold_DESC_NULLS_FIRST',
  HoldersOverThresholdDescNullsLast = 'holdersOverThreshold_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MarketCapUsdAsc = 'marketCapUSD_ASC',
  MarketCapUsdAscNullsFirst = 'marketCapUSD_ASC_NULLS_FIRST',
  MarketCapUsdAscNullsLast = 'marketCapUSD_ASC_NULLS_LAST',
  MarketCapUsdDesc = 'marketCapUSD_DESC',
  MarketCapUsdDescNullsFirst = 'marketCapUSD_DESC_NULLS_FIRST',
  MarketCapUsdDescNullsLast = 'marketCapUSD_DESC_NULLS_LAST',
  NonRebasingSupplyAsc = 'nonRebasingSupply_ASC',
  NonRebasingSupplyAscNullsFirst = 'nonRebasingSupply_ASC_NULLS_FIRST',
  NonRebasingSupplyAscNullsLast = 'nonRebasingSupply_ASC_NULLS_LAST',
  NonRebasingSupplyDesc = 'nonRebasingSupply_DESC',
  NonRebasingSupplyDescNullsFirst = 'nonRebasingSupply_DESC_NULLS_FIRST',
  NonRebasingSupplyDescNullsLast = 'nonRebasingSupply_DESC_NULLS_LAST',
  PegPriceAsc = 'pegPrice_ASC',
  PegPriceAscNullsFirst = 'pegPrice_ASC_NULLS_FIRST',
  PegPriceAscNullsLast = 'pegPrice_ASC_NULLS_LAST',
  PegPriceDesc = 'pegPrice_DESC',
  PegPriceDescNullsFirst = 'pegPrice_DESC_NULLS_FIRST',
  PegPriceDescNullsLast = 'pegPrice_DESC_NULLS_LAST',
  RebasingSupplyAsc = 'rebasingSupply_ASC',
  RebasingSupplyAscNullsFirst = 'rebasingSupply_ASC_NULLS_FIRST',
  RebasingSupplyAscNullsLast = 'rebasingSupply_ASC_NULLS_LAST',
  RebasingSupplyDesc = 'rebasingSupply_DESC',
  RebasingSupplyDescNullsFirst = 'rebasingSupply_DESC_NULLS_FIRST',
  RebasingSupplyDescNullsLast = 'rebasingSupply_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalSupplyUsdAsc = 'totalSupplyUSD_ASC',
  TotalSupplyUsdAscNullsFirst = 'totalSupplyUSD_ASC_NULLS_FIRST',
  TotalSupplyUsdAscNullsLast = 'totalSupplyUSD_ASC_NULLS_LAST',
  TotalSupplyUsdDesc = 'totalSupplyUSD_DESC',
  TotalSupplyUsdDescNullsFirst = 'totalSupplyUSD_DESC_NULLS_FIRST',
  TotalSupplyUsdDescNullsLast = 'totalSupplyUSD_DESC_NULLS_LAST',
  TotalSupplyAsc = 'totalSupply_ASC',
  TotalSupplyAscNullsFirst = 'totalSupply_ASC_NULLS_FIRST',
  TotalSupplyAscNullsLast = 'totalSupply_ASC_NULLS_LAST',
  TotalSupplyDesc = 'totalSupply_DESC',
  TotalSupplyDescNullsFirst = 'totalSupply_DESC_NULLS_FIRST',
  TotalSupplyDescNullsLast = 'totalSupply_DESC_NULLS_LAST',
  TradingVolumeUsdAsc = 'tradingVolumeUSD_ASC',
  TradingVolumeUsdAscNullsFirst = 'tradingVolumeUSD_ASC_NULLS_FIRST',
  TradingVolumeUsdAscNullsLast = 'tradingVolumeUSD_ASC_NULLS_LAST',
  TradingVolumeUsdDesc = 'tradingVolumeUSD_DESC',
  TradingVolumeUsdDescNullsFirst = 'tradingVolumeUSD_DESC_NULLS_FIRST',
  TradingVolumeUsdDescNullsLast = 'tradingVolumeUSD_DESC_NULLS_LAST',
  WrappedSupplyAsc = 'wrappedSupply_ASC',
  WrappedSupplyAscNullsFirst = 'wrappedSupply_ASC_NULLS_FIRST',
  WrappedSupplyAscNullsLast = 'wrappedSupply_ASC_NULLS_LAST',
  WrappedSupplyDesc = 'wrappedSupply_DESC',
  WrappedSupplyDescNullsFirst = 'wrappedSupply_DESC_NULLS_FIRST',
  WrappedSupplyDescNullsLast = 'wrappedSupply_DESC_NULLS_LAST',
  YieldEth7DayAsc = 'yieldETH7Day_ASC',
  YieldEth7DayAscNullsFirst = 'yieldETH7Day_ASC_NULLS_FIRST',
  YieldEth7DayAscNullsLast = 'yieldETH7Day_ASC_NULLS_LAST',
  YieldEth7DayDesc = 'yieldETH7Day_DESC',
  YieldEth7DayDescNullsFirst = 'yieldETH7Day_DESC_NULLS_FIRST',
  YieldEth7DayDescNullsLast = 'yieldETH7Day_DESC_NULLS_LAST',
  YieldEthAllTimeAsc = 'yieldETHAllTime_ASC',
  YieldEthAllTimeAscNullsFirst = 'yieldETHAllTime_ASC_NULLS_FIRST',
  YieldEthAllTimeAscNullsLast = 'yieldETHAllTime_ASC_NULLS_LAST',
  YieldEthAllTimeDesc = 'yieldETHAllTime_DESC',
  YieldEthAllTimeDescNullsFirst = 'yieldETHAllTime_DESC_NULLS_FIRST',
  YieldEthAllTimeDescNullsLast = 'yieldETHAllTime_DESC_NULLS_LAST',
  YieldEthAsc = 'yieldETH_ASC',
  YieldEthAscNullsFirst = 'yieldETH_ASC_NULLS_FIRST',
  YieldEthAscNullsLast = 'yieldETH_ASC_NULLS_LAST',
  YieldEthDesc = 'yieldETH_DESC',
  YieldEthDescNullsFirst = 'yieldETH_DESC_NULLS_FIRST',
  YieldEthDescNullsLast = 'yieldETH_DESC_NULLS_LAST',
  YieldUsd7DayAsc = 'yieldUSD7Day_ASC',
  YieldUsd7DayAscNullsFirst = 'yieldUSD7Day_ASC_NULLS_FIRST',
  YieldUsd7DayAscNullsLast = 'yieldUSD7Day_ASC_NULLS_LAST',
  YieldUsd7DayDesc = 'yieldUSD7Day_DESC',
  YieldUsd7DayDescNullsFirst = 'yieldUSD7Day_DESC_NULLS_FIRST',
  YieldUsd7DayDescNullsLast = 'yieldUSD7Day_DESC_NULLS_LAST',
  YieldUsdAllTimeAsc = 'yieldUSDAllTime_ASC',
  YieldUsdAllTimeAscNullsFirst = 'yieldUSDAllTime_ASC_NULLS_FIRST',
  YieldUsdAllTimeAscNullsLast = 'yieldUSDAllTime_ASC_NULLS_LAST',
  YieldUsdAllTimeDesc = 'yieldUSDAllTime_DESC',
  YieldUsdAllTimeDescNullsFirst = 'yieldUSDAllTime_DESC_NULLS_FIRST',
  YieldUsdAllTimeDescNullsLast = 'yieldUSDAllTime_DESC_NULLS_LAST',
  YieldUsdAsc = 'yieldUSD_ASC',
  YieldUsdAscNullsFirst = 'yieldUSD_ASC_NULLS_FIRST',
  YieldUsdAscNullsLast = 'yieldUSD_ASC_NULLS_LAST',
  YieldUsdDesc = 'yieldUSD_DESC',
  YieldUsdDescNullsFirst = 'yieldUSD_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  DailyStatIdAmoSupplyAscNullsLast = 'dailyStatId_amoSupply_ASC_NULLS_LAST',
  DailyStatIdAmoSupplyDesc = 'dailyStatId_amoSupply_DESC',
  DailyStatIdAmoSupplyDescNullsFirst = 'dailyStatId_amoSupply_DESC_NULLS_FIRST',
  DailyStatIdAmoSupplyDescNullsLast = 'dailyStatId_amoSupply_DESC_NULLS_LAST',
  DailyStatIdAprAsc = 'dailyStatId_apr_ASC',
  DailyStatIdAprAscNullsFirst = 'dailyStatId_apr_ASC_NULLS_FIRST',
  DailyStatIdAprAscNullsLast = 'dailyStatId_apr_ASC_NULLS_LAST',
  DailyStatIdAprDesc = 'dailyStatId_apr_DESC',
  DailyStatIdAprDescNullsFirst = 'dailyStatId_apr_DESC_NULLS_FIRST',
  DailyStatIdAprDescNullsLast = 'dailyStatId_apr_DESC_NULLS_LAST',
  DailyStatIdApy7DayAvgAsc = 'dailyStatId_apy7DayAvg_ASC',
  DailyStatIdApy7DayAvgAscNullsFirst = 'dailyStatId_apy7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy7DayAvgAscNullsLast = 'dailyStatId_apy7DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy7DayAvgDesc = 'dailyStatId_apy7DayAvg_DESC',
  DailyStatIdApy7DayAvgDescNullsFirst = 'dailyStatId_apy7DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy7DayAvgDescNullsLast = 'dailyStatId_apy7DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy14DayAvgAsc = 'dailyStatId_apy14DayAvg_ASC',
  DailyStatIdApy14DayAvgAscNullsFirst = 'dailyStatId_apy14DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy14DayAvgAscNullsLast = 'dailyStatId_apy14DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy14DayAvgDesc = 'dailyStatId_apy14DayAvg_DESC',
  DailyStatIdApy14DayAvgDescNullsFirst = 'dailyStatId_apy14DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy14DayAvgDescNullsLast = 'dailyStatId_apy14DayAvg_DESC_NULLS_LAST',
  DailyStatIdApy30DayAvgAsc = 'dailyStatId_apy30DayAvg_ASC',
  DailyStatIdApy30DayAvgAscNullsFirst = 'dailyStatId_apy30DayAvg_ASC_NULLS_FIRST',
  DailyStatIdApy30DayAvgAscNullsLast = 'dailyStatId_apy30DayAvg_ASC_NULLS_LAST',
  DailyStatIdApy30DayAvgDesc = 'dailyStatId_apy30DayAvg_DESC',
  DailyStatIdApy30DayAvgDescNullsFirst = 'dailyStatId_apy30DayAvg_DESC_NULLS_FIRST',
  DailyStatIdApy30DayAvgDescNullsLast = 'dailyStatId_apy30DayAvg_DESC_NULLS_LAST',
  DailyStatIdApyAsc = 'dailyStatId_apy_ASC',
  DailyStatIdApyAscNullsFirst = 'dailyStatId_apy_ASC_NULLS_FIRST',
  DailyStatIdApyAscNullsLast = 'dailyStatId_apy_ASC_NULLS_LAST',
  DailyStatIdApyDesc = 'dailyStatId_apy_DESC',
  DailyStatIdApyDescNullsFirst = 'dailyStatId_apy_DESC_NULLS_FIRST',
  DailyStatIdApyDescNullsLast = 'dailyStatId_apy_DESC_NULLS_LAST',
  DailyStatIdBlockNumberAsc = 'dailyStatId_blockNumber_ASC',
  DailyStatIdBlockNumberAscNullsFirst = 'dailyStatId_blockNumber_ASC_NULLS_FIRST',
  DailyStatIdBlockNumberAscNullsLast = 'dailyStatId_blockNumber_ASC_NULLS_LAST',
  DailyStatIdBlockNumberDesc = 'dailyStatId_blockNumber_DESC',
  DailyStatIdBlockNumberDescNullsFirst = 'dailyStatId_blockNumber_DESC_NULLS_FIRST',
  DailyStatIdBlockNumberDescNullsLast = 'dailyStatId_blockNumber_DESC_NULLS_LAST',
  DailyStatIdDripperWethAsc = 'dailyStatId_dripperWETH_ASC',
  DailyStatIdDripperWethAscNullsFirst = 'dailyStatId_dripperWETH_ASC_NULLS_FIRST',
  DailyStatIdDripperWethAscNullsLast = 'dailyStatId_dripperWETH_ASC_NULLS_LAST',
  DailyStatIdDripperWethDesc = 'dailyStatId_dripperWETH_DESC',
  DailyStatIdDripperWethDescNullsFirst = 'dailyStatId_dripperWETH_DESC_NULLS_FIRST',
  DailyStatIdDripperWethDescNullsLast = 'dailyStatId_dripperWETH_DESC_NULLS_LAST',
  DailyStatIdFeesEth7DayAsc = 'dailyStatId_feesETH7Day_ASC',
  DailyStatIdFeesEth7DayAscNullsFirst = 'dailyStatId_feesETH7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesEth7DayAscNullsLast = 'dailyStatId_feesETH7Day_ASC_NULLS_LAST',
  DailyStatIdFeesEth7DayDesc = 'dailyStatId_feesETH7Day_DESC',
  DailyStatIdFeesEth7DayDescNullsFirst = 'dailyStatId_feesETH7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesEth7DayDescNullsLast = 'dailyStatId_feesETH7Day_DESC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeAsc = 'dailyStatId_feesETHAllTime_ASC',
  DailyStatIdFeesEthAllTimeAscNullsFirst = 'dailyStatId_feesETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeAscNullsLast = 'dailyStatId_feesETHAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesEthAllTimeDesc = 'dailyStatId_feesETHAllTime_DESC',
  DailyStatIdFeesEthAllTimeDescNullsFirst = 'dailyStatId_feesETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesEthAllTimeDescNullsLast = 'dailyStatId_feesETHAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesEthAsc = 'dailyStatId_feesETH_ASC',
  DailyStatIdFeesEthAscNullsFirst = 'dailyStatId_feesETH_ASC_NULLS_FIRST',
  DailyStatIdFeesEthAscNullsLast = 'dailyStatId_feesETH_ASC_NULLS_LAST',
  DailyStatIdFeesEthDesc = 'dailyStatId_feesETH_DESC',
  DailyStatIdFeesEthDescNullsFirst = 'dailyStatId_feesETH_DESC_NULLS_FIRST',
  DailyStatIdFeesEthDescNullsLast = 'dailyStatId_feesETH_DESC_NULLS_LAST',
  DailyStatIdFeesUsd7DayAsc = 'dailyStatId_feesUSD7Day_ASC',
  DailyStatIdFeesUsd7DayAscNullsFirst = 'dailyStatId_feesUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayAscNullsLast = 'dailyStatId_feesUSD7Day_ASC_NULLS_LAST',
  DailyStatIdFeesUsd7DayDesc = 'dailyStatId_feesUSD7Day_DESC',
  DailyStatIdFeesUsd7DayDescNullsFirst = 'dailyStatId_feesUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdFeesUsd7DayDescNullsLast = 'dailyStatId_feesUSD7Day_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeAsc = 'dailyStatId_feesUSDAllTime_ASC',
  DailyStatIdFeesUsdAllTimeAscNullsFirst = 'dailyStatId_feesUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeAscNullsLast = 'dailyStatId_feesUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdFeesUsdAllTimeDesc = 'dailyStatId_feesUSDAllTime_DESC',
  DailyStatIdFeesUsdAllTimeDescNullsFirst = 'dailyStatId_feesUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdAllTimeDescNullsLast = 'dailyStatId_feesUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdFeesUsdAsc = 'dailyStatId_feesUSD_ASC',
  DailyStatIdFeesUsdAscNullsFirst = 'dailyStatId_feesUSD_ASC_NULLS_FIRST',
  DailyStatIdFeesUsdAscNullsLast = 'dailyStatId_feesUSD_ASC_NULLS_LAST',
  DailyStatIdFeesUsdDesc = 'dailyStatId_feesUSD_DESC',
  DailyStatIdFeesUsdDescNullsFirst = 'dailyStatId_feesUSD_DESC_NULLS_FIRST',
  DailyStatIdFeesUsdDescNullsLast = 'dailyStatId_feesUSD_DESC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdAsc = 'dailyStatId_holdersOverThreshold_ASC',
  DailyStatIdHoldersOverThresholdAscNullsFirst = 'dailyStatId_holdersOverThreshold_ASC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdAscNullsLast = 'dailyStatId_holdersOverThreshold_ASC_NULLS_LAST',
  DailyStatIdHoldersOverThresholdDesc = 'dailyStatId_holdersOverThreshold_DESC',
  DailyStatIdHoldersOverThresholdDescNullsFirst = 'dailyStatId_holdersOverThreshold_DESC_NULLS_FIRST',
  DailyStatIdHoldersOverThresholdDescNullsLast = 'dailyStatId_holdersOverThreshold_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdAscNullsLast = 'dailyStatId_id_ASC_NULLS_LAST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsFirst = 'dailyStatId_id_DESC_NULLS_FIRST',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
  DailyStatIdMarketCapUsdAsc = 'dailyStatId_marketCapUSD_ASC',
  DailyStatIdMarketCapUsdAscNullsFirst = 'dailyStatId_marketCapUSD_ASC_NULLS_FIRST',
  DailyStatIdMarketCapUsdAscNullsLast = 'dailyStatId_marketCapUSD_ASC_NULLS_LAST',
  DailyStatIdMarketCapUsdDesc = 'dailyStatId_marketCapUSD_DESC',
  DailyStatIdMarketCapUsdDescNullsFirst = 'dailyStatId_marketCapUSD_DESC_NULLS_FIRST',
  DailyStatIdMarketCapUsdDescNullsLast = 'dailyStatId_marketCapUSD_DESC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyAsc = 'dailyStatId_nonRebasingSupply_ASC',
  DailyStatIdNonRebasingSupplyAscNullsFirst = 'dailyStatId_nonRebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyAscNullsLast = 'dailyStatId_nonRebasingSupply_ASC_NULLS_LAST',
  DailyStatIdNonRebasingSupplyDesc = 'dailyStatId_nonRebasingSupply_DESC',
  DailyStatIdNonRebasingSupplyDescNullsFirst = 'dailyStatId_nonRebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdNonRebasingSupplyDescNullsLast = 'dailyStatId_nonRebasingSupply_DESC_NULLS_LAST',
  DailyStatIdPegPriceAsc = 'dailyStatId_pegPrice_ASC',
  DailyStatIdPegPriceAscNullsFirst = 'dailyStatId_pegPrice_ASC_NULLS_FIRST',
  DailyStatIdPegPriceAscNullsLast = 'dailyStatId_pegPrice_ASC_NULLS_LAST',
  DailyStatIdPegPriceDesc = 'dailyStatId_pegPrice_DESC',
  DailyStatIdPegPriceDescNullsFirst = 'dailyStatId_pegPrice_DESC_NULLS_FIRST',
  DailyStatIdPegPriceDescNullsLast = 'dailyStatId_pegPrice_DESC_NULLS_LAST',
  DailyStatIdRebasingSupplyAsc = 'dailyStatId_rebasingSupply_ASC',
  DailyStatIdRebasingSupplyAscNullsFirst = 'dailyStatId_rebasingSupply_ASC_NULLS_FIRST',
  DailyStatIdRebasingSupplyAscNullsLast = 'dailyStatId_rebasingSupply_ASC_NULLS_LAST',
  DailyStatIdRebasingSupplyDesc = 'dailyStatId_rebasingSupply_DESC',
  DailyStatIdRebasingSupplyDescNullsFirst = 'dailyStatId_rebasingSupply_DESC_NULLS_FIRST',
  DailyStatIdRebasingSupplyDescNullsLast = 'dailyStatId_rebasingSupply_DESC_NULLS_LAST',
  DailyStatIdTimestampAsc = 'dailyStatId_timestamp_ASC',
  DailyStatIdTimestampAscNullsFirst = 'dailyStatId_timestamp_ASC_NULLS_FIRST',
  DailyStatIdTimestampAscNullsLast = 'dailyStatId_timestamp_ASC_NULLS_LAST',
  DailyStatIdTimestampDesc = 'dailyStatId_timestamp_DESC',
  DailyStatIdTimestampDescNullsFirst = 'dailyStatId_timestamp_DESC_NULLS_FIRST',
  DailyStatIdTimestampDescNullsLast = 'dailyStatId_timestamp_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdAsc = 'dailyStatId_totalSupplyUSD_ASC',
  DailyStatIdTotalSupplyUsdAscNullsFirst = 'dailyStatId_totalSupplyUSD_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdAscNullsLast = 'dailyStatId_totalSupplyUSD_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyUsdDesc = 'dailyStatId_totalSupplyUSD_DESC',
  DailyStatIdTotalSupplyUsdDescNullsFirst = 'dailyStatId_totalSupplyUSD_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyUsdDescNullsLast = 'dailyStatId_totalSupplyUSD_DESC_NULLS_LAST',
  DailyStatIdTotalSupplyAsc = 'dailyStatId_totalSupply_ASC',
  DailyStatIdTotalSupplyAscNullsFirst = 'dailyStatId_totalSupply_ASC_NULLS_FIRST',
  DailyStatIdTotalSupplyAscNullsLast = 'dailyStatId_totalSupply_ASC_NULLS_LAST',
  DailyStatIdTotalSupplyDesc = 'dailyStatId_totalSupply_DESC',
  DailyStatIdTotalSupplyDescNullsFirst = 'dailyStatId_totalSupply_DESC_NULLS_FIRST',
  DailyStatIdTotalSupplyDescNullsLast = 'dailyStatId_totalSupply_DESC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdAsc = 'dailyStatId_tradingVolumeUSD_ASC',
  DailyStatIdTradingVolumeUsdAscNullsFirst = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdAscNullsLast = 'dailyStatId_tradingVolumeUSD_ASC_NULLS_LAST',
  DailyStatIdTradingVolumeUsdDesc = 'dailyStatId_tradingVolumeUSD_DESC',
  DailyStatIdTradingVolumeUsdDescNullsFirst = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_FIRST',
  DailyStatIdTradingVolumeUsdDescNullsLast = 'dailyStatId_tradingVolumeUSD_DESC_NULLS_LAST',
  DailyStatIdWrappedSupplyAsc = 'dailyStatId_wrappedSupply_ASC',
  DailyStatIdWrappedSupplyAscNullsFirst = 'dailyStatId_wrappedSupply_ASC_NULLS_FIRST',
  DailyStatIdWrappedSupplyAscNullsLast = 'dailyStatId_wrappedSupply_ASC_NULLS_LAST',
  DailyStatIdWrappedSupplyDesc = 'dailyStatId_wrappedSupply_DESC',
  DailyStatIdWrappedSupplyDescNullsFirst = 'dailyStatId_wrappedSupply_DESC_NULLS_FIRST',
  DailyStatIdWrappedSupplyDescNullsLast = 'dailyStatId_wrappedSupply_DESC_NULLS_LAST',
  DailyStatIdYieldEth7DayAsc = 'dailyStatId_yieldETH7Day_ASC',
  DailyStatIdYieldEth7DayAscNullsFirst = 'dailyStatId_yieldETH7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldEth7DayAscNullsLast = 'dailyStatId_yieldETH7Day_ASC_NULLS_LAST',
  DailyStatIdYieldEth7DayDesc = 'dailyStatId_yieldETH7Day_DESC',
  DailyStatIdYieldEth7DayDescNullsFirst = 'dailyStatId_yieldETH7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldEth7DayDescNullsLast = 'dailyStatId_yieldETH7Day_DESC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeAsc = 'dailyStatId_yieldETHAllTime_ASC',
  DailyStatIdYieldEthAllTimeAscNullsFirst = 'dailyStatId_yieldETHAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeAscNullsLast = 'dailyStatId_yieldETHAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldEthAllTimeDesc = 'dailyStatId_yieldETHAllTime_DESC',
  DailyStatIdYieldEthAllTimeDescNullsFirst = 'dailyStatId_yieldETHAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldEthAllTimeDescNullsLast = 'dailyStatId_yieldETHAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldEthAsc = 'dailyStatId_yieldETH_ASC',
  DailyStatIdYieldEthAscNullsFirst = 'dailyStatId_yieldETH_ASC_NULLS_FIRST',
  DailyStatIdYieldEthAscNullsLast = 'dailyStatId_yieldETH_ASC_NULLS_LAST',
  DailyStatIdYieldEthDesc = 'dailyStatId_yieldETH_DESC',
  DailyStatIdYieldEthDescNullsFirst = 'dailyStatId_yieldETH_DESC_NULLS_FIRST',
  DailyStatIdYieldEthDescNullsLast = 'dailyStatId_yieldETH_DESC_NULLS_LAST',
  DailyStatIdYieldUsd7DayAsc = 'dailyStatId_yieldUSD7Day_ASC',
  DailyStatIdYieldUsd7DayAscNullsFirst = 'dailyStatId_yieldUSD7Day_ASC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayAscNullsLast = 'dailyStatId_yieldUSD7Day_ASC_NULLS_LAST',
  DailyStatIdYieldUsd7DayDesc = 'dailyStatId_yieldUSD7Day_DESC',
  DailyStatIdYieldUsd7DayDescNullsFirst = 'dailyStatId_yieldUSD7Day_DESC_NULLS_FIRST',
  DailyStatIdYieldUsd7DayDescNullsLast = 'dailyStatId_yieldUSD7Day_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeAsc = 'dailyStatId_yieldUSDAllTime_ASC',
  DailyStatIdYieldUsdAllTimeAscNullsFirst = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeAscNullsLast = 'dailyStatId_yieldUSDAllTime_ASC_NULLS_LAST',
  DailyStatIdYieldUsdAllTimeDesc = 'dailyStatId_yieldUSDAllTime_DESC',
  DailyStatIdYieldUsdAllTimeDescNullsFirst = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdAllTimeDescNullsLast = 'dailyStatId_yieldUSDAllTime_DESC_NULLS_LAST',
  DailyStatIdYieldUsdAsc = 'dailyStatId_yieldUSD_ASC',
  DailyStatIdYieldUsdAscNullsFirst = 'dailyStatId_yieldUSD_ASC_NULLS_FIRST',
  DailyStatIdYieldUsdAscNullsLast = 'dailyStatId_yieldUSD_ASC_NULLS_LAST',
  DailyStatIdYieldUsdDesc = 'dailyStatId_yieldUSD_DESC',
  DailyStatIdYieldUsdDescNullsFirst = 'dailyStatId_yieldUSD_DESC_NULLS_FIRST',
  DailyStatIdYieldUsdDescNullsLast = 'dailyStatId_yieldUSD_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalAscNullsLast = 'total_ASC_NULLS_LAST',
  TotalDesc = 'total_DESC',
  TotalDescNullsFirst = 'total_DESC_NULLS_FIRST',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST',
  TvlAsc = 'tvl_ASC',
  TvlAscNullsFirst = 'tvl_ASC_NULLS_FIRST',
  TvlAscNullsLast = 'tvl_ASC_NULLS_LAST',
  TvlDesc = 'tvl_DESC',
  TvlDescNullsFirst = 'tvl_DESC_NULLS_FIRST',
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
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyDailyStatIdIdAsc = 'strategyDailyStatId_id_ASC',
  StrategyDailyStatIdIdAscNullsFirst = 'strategyDailyStatId_id_ASC_NULLS_FIRST',
  StrategyDailyStatIdIdAscNullsLast = 'strategyDailyStatId_id_ASC_NULLS_LAST',
  StrategyDailyStatIdIdDesc = 'strategyDailyStatId_id_DESC',
  StrategyDailyStatIdIdDescNullsFirst = 'strategyDailyStatId_id_DESC_NULLS_FIRST',
  StrategyDailyStatIdIdDescNullsLast = 'strategyDailyStatId_id_DESC_NULLS_LAST',
  StrategyDailyStatIdNameAsc = 'strategyDailyStatId_name_ASC',
  StrategyDailyStatIdNameAscNullsFirst = 'strategyDailyStatId_name_ASC_NULLS_FIRST',
  StrategyDailyStatIdNameAscNullsLast = 'strategyDailyStatId_name_ASC_NULLS_LAST',
  StrategyDailyStatIdNameDesc = 'strategyDailyStatId_name_DESC',
  StrategyDailyStatIdNameDescNullsFirst = 'strategyDailyStatId_name_DESC_NULLS_FIRST',
  StrategyDailyStatIdNameDescNullsLast = 'strategyDailyStatId_name_DESC_NULLS_LAST',
  StrategyDailyStatIdTotalAsc = 'strategyDailyStatId_total_ASC',
  StrategyDailyStatIdTotalAscNullsFirst = 'strategyDailyStatId_total_ASC_NULLS_FIRST',
  StrategyDailyStatIdTotalAscNullsLast = 'strategyDailyStatId_total_ASC_NULLS_LAST',
  StrategyDailyStatIdTotalDesc = 'strategyDailyStatId_total_DESC',
  StrategyDailyStatIdTotalDescNullsFirst = 'strategyDailyStatId_total_DESC_NULLS_FIRST',
  StrategyDailyStatIdTotalDescNullsLast = 'strategyDailyStatId_total_DESC_NULLS_LAST',
  StrategyDailyStatIdTvlAsc = 'strategyDailyStatId_tvl_ASC',
  StrategyDailyStatIdTvlAscNullsFirst = 'strategyDailyStatId_tvl_ASC_NULLS_FIRST',
  StrategyDailyStatIdTvlAscNullsLast = 'strategyDailyStatId_tvl_ASC_NULLS_LAST',
  StrategyDailyStatIdTvlDesc = 'strategyDailyStatId_tvl_DESC',
  StrategyDailyStatIdTvlDescNullsFirst = 'strategyDailyStatId_tvl_DESC_NULLS_FIRST',
  StrategyDailyStatIdTvlDescNullsLast = 'strategyDailyStatId_tvl_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST',
  ValueAsc = 'value_ASC',
  ValueAscNullsFirst = 'value_ASC_NULLS_FIRST',
  ValueAscNullsLast = 'value_ASC_NULLS_LAST',
  ValueDesc = 'value_DESC',
  ValueDescNullsFirst = 'value_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DaiAsc = 'dai_ASC',
  DaiAscNullsFirst = 'dai_ASC_NULLS_FIRST',
  DaiAscNullsLast = 'dai_ASC_NULLS_LAST',
  DaiDesc = 'dai_DESC',
  DaiDescNullsFirst = 'dai_DESC_NULLS_FIRST',
  DaiDescNullsLast = 'dai_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  UsdcAsc = 'usdc_ASC',
  UsdcAscNullsFirst = 'usdc_ASC_NULLS_FIRST',
  UsdcAscNullsLast = 'usdc_ASC_NULLS_LAST',
  UsdcDesc = 'usdc_DESC',
  UsdcDescNullsFirst = 'usdc_DESC_NULLS_FIRST',
  UsdcDescNullsLast = 'usdc_DESC_NULLS_LAST',
  UsdtAsc = 'usdt_ASC',
  UsdtAscNullsFirst = 'usdt_ASC_NULLS_FIRST',
  UsdtAscNullsLast = 'usdt_ASC_NULLS_LAST',
  UsdtDesc = 'usdt_DESC',
  UsdtDescNullsFirst = 'usdt_DESC_NULLS_FIRST',
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
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  beaconDepositEventById?: Maybe<BeaconDepositEvent>;
  /** @deprecated Use beaconDepositEventById */
  beaconDepositEventByUniqueInput?: Maybe<BeaconDepositEvent>;
  beaconDepositEvents: Array<BeaconDepositEvent>;
  beaconDepositEventsConnection: BeaconDepositEventsConnection;
  beaconDepositPubkeyById?: Maybe<BeaconDepositPubkey>;
  /** @deprecated Use beaconDepositPubkeyById */
  beaconDepositPubkeyByUniqueInput?: Maybe<BeaconDepositPubkey>;
  beaconDepositPubkeys: Array<BeaconDepositPubkey>;
  beaconDepositPubkeysConnection: BeaconDepositPubkeysConnection;
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
  erc20TransferById?: Maybe<Erc20Transfer>;
  /** @deprecated Use erc20TransferById */
  erc20TransferByUniqueInput?: Maybe<Erc20Transfer>;
  erc20Transfers: Array<Erc20Transfer>;
  erc20TransfersConnection: Erc20TransfersConnection;
  erc20s: Array<Erc20>;
  erc20sConnection: Erc20sConnection;
  esAccountById?: Maybe<EsAccount>;
  /** @deprecated Use esAccountById */
  esAccountByUniqueInput?: Maybe<EsAccount>;
  esAccounts: Array<EsAccount>;
  esAccountsConnection: EsAccountsConnection;
  esDelegateChangedById?: Maybe<EsDelegateChanged>;
  /** @deprecated Use esDelegateChangedById */
  esDelegateChangedByUniqueInput?: Maybe<EsDelegateChanged>;
  esDelegateChangeds: Array<EsDelegateChanged>;
  esDelegateChangedsConnection: EsDelegateChangedsConnection;
  esDelegateVotesChangedById?: Maybe<EsDelegateVotesChanged>;
  /** @deprecated Use esDelegateVotesChangedById */
  esDelegateVotesChangedByUniqueInput?: Maybe<EsDelegateVotesChanged>;
  esDelegateVotesChangeds: Array<EsDelegateVotesChanged>;
  esDelegateVotesChangedsConnection: EsDelegateVotesChangedsConnection;
  esLockupById?: Maybe<EsLockup>;
  /** @deprecated Use esLockupById */
  esLockupByUniqueInput?: Maybe<EsLockup>;
  esLockupEventById?: Maybe<EsLockupEvent>;
  /** @deprecated Use esLockupEventById */
  esLockupEventByUniqueInput?: Maybe<EsLockupEvent>;
  esLockupEvents: Array<EsLockupEvent>;
  esLockupEventsConnection: EsLockupEventsConnection;
  esLockups: Array<EsLockup>;
  esLockupsConnection: EsLockupsConnection;
  esPenalties: Array<EsPenalty>;
  esPenaltiesConnection: EsPenaltiesConnection;
  esPenaltyById?: Maybe<EsPenalty>;
  /** @deprecated Use esPenaltyById */
  esPenaltyByUniqueInput?: Maybe<EsPenalty>;
  esRewardById?: Maybe<EsReward>;
  /** @deprecated Use esRewardById */
  esRewardByUniqueInput?: Maybe<EsReward>;
  esRewards: Array<EsReward>;
  esRewardsConnection: EsRewardsConnection;
  esStakeById?: Maybe<EsStake>;
  /** @deprecated Use esStakeById */
  esStakeByUniqueInput?: Maybe<EsStake>;
  esStakes: Array<EsStake>;
  esStakesConnection: EsStakesConnection;
  esTokenById?: Maybe<EsToken>;
  /** @deprecated Use esTokenById */
  esTokenByUniqueInput?: Maybe<EsToken>;
  esTokens: Array<EsToken>;
  esTokensConnection: EsTokensConnection;
  esUnstakeById?: Maybe<EsUnstake>;
  /** @deprecated Use esUnstakeById */
  esUnstakeByUniqueInput?: Maybe<EsUnstake>;
  esUnstakes: Array<EsUnstake>;
  esUnstakesConnection: EsUnstakesConnection;
  esYieldById?: Maybe<EsYield>;
  /** @deprecated Use esYieldById */
  esYieldByUniqueInput?: Maybe<EsYield>;
  esYields: Array<EsYield>;
  esYieldsConnection: EsYieldsConnection;
  exchangeRateById?: Maybe<ExchangeRate>;
  /** @deprecated Use exchangeRateById */
  exchangeRateByUniqueInput?: Maybe<ExchangeRate>;
  exchangeRates: Array<ExchangeRate>;
  exchangeRatesConnection: ExchangeRatesConnection;
  frrsRewardCollectedById?: Maybe<FrrsRewardCollected>;
  /** @deprecated Use frrsRewardCollectedById */
  frrsRewardCollectedByUniqueInput?: Maybe<FrrsRewardCollected>;
  frrsRewardCollecteds: Array<FrrsRewardCollected>;
  frrsRewardCollectedsConnection: FrrsRewardCollectedsConnection;
  frrsRewardsPerSecondChangedById?: Maybe<FrrsRewardsPerSecondChanged>;
  /** @deprecated Use frrsRewardsPerSecondChangedById */
  frrsRewardsPerSecondChangedByUniqueInput?: Maybe<FrrsRewardsPerSecondChanged>;
  frrsRewardsPerSecondChangeds: Array<FrrsRewardsPerSecondChanged>;
  frrsRewardsPerSecondChangedsConnection: FrrsRewardsPerSecondChangedsConnection;
  frrsRewardsTargetChangeById?: Maybe<FrrsRewardsTargetChange>;
  /** @deprecated Use frrsRewardsTargetChangeById */
  frrsRewardsTargetChangeByUniqueInput?: Maybe<FrrsRewardsTargetChange>;
  frrsRewardsTargetChanges: Array<FrrsRewardsTargetChange>;
  frrsRewardsTargetChangesConnection: FrrsRewardsTargetChangesConnection;
  frrsStrategistUpdatedById?: Maybe<FrrsStrategistUpdated>;
  /** @deprecated Use frrsStrategistUpdatedById */
  frrsStrategistUpdatedByUniqueInput?: Maybe<FrrsStrategistUpdated>;
  frrsStrategistUpdateds: Array<FrrsStrategistUpdated>;
  frrsStrategistUpdatedsConnection: FrrsStrategistUpdatedsConnection;
  governanceProposalById?: Maybe<GovernanceProposal>;
  /** @deprecated Use governanceProposalById */
  governanceProposalByUniqueInput?: Maybe<GovernanceProposal>;
  governanceProposalEventById?: Maybe<GovernanceProposalEvent>;
  /** @deprecated Use governanceProposalEventById */
  governanceProposalEventByUniqueInput?: Maybe<GovernanceProposalEvent>;
  governanceProposalEvents: Array<GovernanceProposalEvent>;
  governanceProposalEventsConnection: GovernanceProposalEventsConnection;
  governanceProposalVoteById?: Maybe<GovernanceProposalVote>;
  /** @deprecated Use governanceProposalVoteById */
  governanceProposalVoteByUniqueInput?: Maybe<GovernanceProposalVote>;
  governanceProposalVotes: Array<GovernanceProposalVote>;
  governanceProposalVotesConnection: GovernanceProposalVotesConnection;
  governanceProposals: Array<GovernanceProposal>;
  governanceProposalsConnection: GovernanceProposalsConnection;
  legacyStakerById?: Maybe<LegacyStaker>;
  /** @deprecated Use legacyStakerById */
  legacyStakerByUniqueInput?: Maybe<LegacyStaker>;
  legacyStakers: Array<LegacyStaker>;
  legacyStakersConnection: LegacyStakersConnection;
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
  oTokenActivities: Array<OTokenActivity>;
  oTokenActivitiesConnection: OTokenActivitiesConnection;
  oTokenActivityById?: Maybe<OTokenActivity>;
  /** @deprecated Use oTokenActivityById */
  oTokenActivityByUniqueInput?: Maybe<OTokenActivity>;
  oTokenAddressById?: Maybe<OTokenAddress>;
  /** @deprecated Use oTokenAddressById */
  oTokenAddressByUniqueInput?: Maybe<OTokenAddress>;
  oTokenAddresses: Array<OTokenAddress>;
  oTokenAddressesConnection: OTokenAddressesConnection;
  oTokenApies: Array<OTokenApy>;
  oTokenApiesConnection: OTokenAPiesConnection;
  oTokenApyById?: Maybe<OTokenApy>;
  /** @deprecated Use oTokenApyById */
  oTokenApyByUniqueInput?: Maybe<OTokenApy>;
  oTokenAssetById?: Maybe<OTokenAsset>;
  /** @deprecated Use oTokenAssetById */
  oTokenAssetByUniqueInput?: Maybe<OTokenAsset>;
  oTokenAssets: Array<OTokenAsset>;
  oTokenAssetsConnection: OTokenAssetsConnection;
  oTokenById?: Maybe<OToken>;
  /** @deprecated Use oTokenById */
  oTokenByUniqueInput?: Maybe<OToken>;
  oTokenHistories: Array<OTokenHistory>;
  oTokenHistoriesConnection: OTokenHistoriesConnection;
  oTokenHistoryById?: Maybe<OTokenHistory>;
  /** @deprecated Use oTokenHistoryById */
  oTokenHistoryByUniqueInput?: Maybe<OTokenHistory>;
  oTokenRebaseById?: Maybe<OTokenRebase>;
  /** @deprecated Use oTokenRebaseById */
  oTokenRebaseByUniqueInput?: Maybe<OTokenRebase>;
  oTokenRebaseOptionById?: Maybe<OTokenRebaseOption>;
  /** @deprecated Use oTokenRebaseOptionById */
  oTokenRebaseOptionByUniqueInput?: Maybe<OTokenRebaseOption>;
  oTokenRebaseOptions: Array<OTokenRebaseOption>;
  oTokenRebaseOptionsConnection: OTokenRebaseOptionsConnection;
  oTokenRebases: Array<OTokenRebase>;
  oTokenRebasesConnection: OTokenRebasesConnection;
  oTokenVaultById?: Maybe<OTokenVault>;
  /** @deprecated Use oTokenVaultById */
  oTokenVaultByUniqueInput?: Maybe<OTokenVault>;
  oTokenVaults: Array<OTokenVault>;
  oTokenVaultsConnection: OTokenVaultsConnection;
  oTokens: Array<OToken>;
  oTokensConnection: OTokensConnection;
  oethBalancerMetaPoolStrategies: Array<OethBalancerMetaPoolStrategy>;
  oethBalancerMetaPoolStrategiesConnection: OethBalancerMetaPoolStrategiesConnection;
  oethBalancerMetaPoolStrategyById?: Maybe<OethBalancerMetaPoolStrategy>;
  /** @deprecated Use oethBalancerMetaPoolStrategyById */
  oethBalancerMetaPoolStrategyByUniqueInput?: Maybe<OethBalancerMetaPoolStrategy>;
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
  oethMorphoAaveById?: Maybe<OethMorphoAave>;
  /** @deprecated Use oethMorphoAaveById */
  oethMorphoAaveByUniqueInput?: Maybe<OethMorphoAave>;
  oethMorphoAaves: Array<OethMorphoAave>;
  oethMorphoAavesConnection: OethMorphoAavesConnection;
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
  oethWithdrawalRequestById?: Maybe<OethWithdrawalRequest>;
  /** @deprecated Use oethWithdrawalRequestById */
  oethWithdrawalRequestByUniqueInput?: Maybe<OethWithdrawalRequest>;
  oethWithdrawalRequests: Array<OethWithdrawalRequest>;
  oethWithdrawalRequestsConnection: OethWithdrawalRequestsConnection;
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


export type QueryBeaconDepositEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBeaconDepositEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBeaconDepositEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BeaconDepositEventOrderByInput>>;
  where?: InputMaybe<BeaconDepositEventWhereInput>;
};


export type QueryBeaconDepositEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BeaconDepositEventOrderByInput>;
  where?: InputMaybe<BeaconDepositEventWhereInput>;
};


export type QueryBeaconDepositPubkeyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBeaconDepositPubkeyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBeaconDepositPubkeysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BeaconDepositPubkeyOrderByInput>>;
  where?: InputMaybe<BeaconDepositPubkeyWhereInput>;
};


export type QueryBeaconDepositPubkeysConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BeaconDepositPubkeyOrderByInput>;
  where?: InputMaybe<BeaconDepositPubkeyWhereInput>;
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


export type QueryErc20TransferByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryErc20TransferByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryErc20TransfersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Erc20TransferOrderByInput>>;
  where?: InputMaybe<Erc20TransferWhereInput>;
};


export type QueryErc20TransfersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<Erc20TransferOrderByInput>;
  where?: InputMaybe<Erc20TransferWhereInput>;
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


export type QueryEsAccountByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsAccountByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsAccountsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsAccountOrderByInput>>;
  where?: InputMaybe<EsAccountWhereInput>;
};


export type QueryEsAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsAccountOrderByInput>;
  where?: InputMaybe<EsAccountWhereInput>;
};


export type QueryEsDelegateChangedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsDelegateChangedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsDelegateChangedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsDelegateChangedOrderByInput>>;
  where?: InputMaybe<EsDelegateChangedWhereInput>;
};


export type QueryEsDelegateChangedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsDelegateChangedOrderByInput>;
  where?: InputMaybe<EsDelegateChangedWhereInput>;
};


export type QueryEsDelegateVotesChangedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsDelegateVotesChangedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsDelegateVotesChangedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsDelegateVotesChangedOrderByInput>>;
  where?: InputMaybe<EsDelegateVotesChangedWhereInput>;
};


export type QueryEsDelegateVotesChangedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsDelegateVotesChangedOrderByInput>;
  where?: InputMaybe<EsDelegateVotesChangedWhereInput>;
};


export type QueryEsLockupByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsLockupByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsLockupEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsLockupEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsLockupEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsLockupEventOrderByInput>>;
  where?: InputMaybe<EsLockupEventWhereInput>;
};


export type QueryEsLockupEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsLockupEventOrderByInput>;
  where?: InputMaybe<EsLockupEventWhereInput>;
};


export type QueryEsLockupsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsLockupOrderByInput>>;
  where?: InputMaybe<EsLockupWhereInput>;
};


export type QueryEsLockupsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsLockupOrderByInput>;
  where?: InputMaybe<EsLockupWhereInput>;
};


export type QueryEsPenaltiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsPenaltyOrderByInput>>;
  where?: InputMaybe<EsPenaltyWhereInput>;
};


export type QueryEsPenaltiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsPenaltyOrderByInput>;
  where?: InputMaybe<EsPenaltyWhereInput>;
};


export type QueryEsPenaltyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsPenaltyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsRewardByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsRewardByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsRewardsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsRewardOrderByInput>>;
  where?: InputMaybe<EsRewardWhereInput>;
};


export type QueryEsRewardsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsRewardOrderByInput>;
  where?: InputMaybe<EsRewardWhereInput>;
};


export type QueryEsStakeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsStakeByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsStakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsStakeOrderByInput>>;
  where?: InputMaybe<EsStakeWhereInput>;
};


export type QueryEsStakesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsStakeOrderByInput>;
  where?: InputMaybe<EsStakeWhereInput>;
};


export type QueryEsTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsTokenOrderByInput>>;
  where?: InputMaybe<EsTokenWhereInput>;
};


export type QueryEsTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsTokenOrderByInput>;
  where?: InputMaybe<EsTokenWhereInput>;
};


export type QueryEsUnstakeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsUnstakeByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsUnstakesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsUnstakeOrderByInput>>;
  where?: InputMaybe<EsUnstakeWhereInput>;
};


export type QueryEsUnstakesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsUnstakeOrderByInput>;
  where?: InputMaybe<EsUnstakeWhereInput>;
};


export type QueryEsYieldByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEsYieldByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryEsYieldsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EsYieldOrderByInput>>;
  where?: InputMaybe<EsYieldWhereInput>;
};


export type QueryEsYieldsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EsYieldOrderByInput>;
  where?: InputMaybe<EsYieldWhereInput>;
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


export type QueryFrrsRewardCollectedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFrrsRewardCollectedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFrrsRewardCollectedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FrrsRewardCollectedOrderByInput>>;
  where?: InputMaybe<FrrsRewardCollectedWhereInput>;
};


export type QueryFrrsRewardCollectedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FrrsRewardCollectedOrderByInput>;
  where?: InputMaybe<FrrsRewardCollectedWhereInput>;
};


export type QueryFrrsRewardsPerSecondChangedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFrrsRewardsPerSecondChangedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFrrsRewardsPerSecondChangedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FrrsRewardsPerSecondChangedOrderByInput>>;
  where?: InputMaybe<FrrsRewardsPerSecondChangedWhereInput>;
};


export type QueryFrrsRewardsPerSecondChangedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FrrsRewardsPerSecondChangedOrderByInput>;
  where?: InputMaybe<FrrsRewardsPerSecondChangedWhereInput>;
};


export type QueryFrrsRewardsTargetChangeByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFrrsRewardsTargetChangeByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFrrsRewardsTargetChangesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FrrsRewardsTargetChangeOrderByInput>>;
  where?: InputMaybe<FrrsRewardsTargetChangeWhereInput>;
};


export type QueryFrrsRewardsTargetChangesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FrrsRewardsTargetChangeOrderByInput>;
  where?: InputMaybe<FrrsRewardsTargetChangeWhereInput>;
};


export type QueryFrrsStrategistUpdatedByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryFrrsStrategistUpdatedByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryFrrsStrategistUpdatedsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<FrrsStrategistUpdatedOrderByInput>>;
  where?: InputMaybe<FrrsStrategistUpdatedWhereInput>;
};


export type QueryFrrsStrategistUpdatedsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<FrrsStrategistUpdatedOrderByInput>;
  where?: InputMaybe<FrrsStrategistUpdatedWhereInput>;
};


export type QueryGovernanceProposalByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGovernanceProposalByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryGovernanceProposalEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGovernanceProposalEventByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryGovernanceProposalEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GovernanceProposalEventOrderByInput>>;
  where?: InputMaybe<GovernanceProposalEventWhereInput>;
};


export type QueryGovernanceProposalEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GovernanceProposalEventOrderByInput>;
  where?: InputMaybe<GovernanceProposalEventWhereInput>;
};


export type QueryGovernanceProposalVoteByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGovernanceProposalVoteByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryGovernanceProposalVotesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GovernanceProposalVoteOrderByInput>>;
  where?: InputMaybe<GovernanceProposalVoteWhereInput>;
};


export type QueryGovernanceProposalVotesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GovernanceProposalVoteOrderByInput>;
  where?: InputMaybe<GovernanceProposalVoteWhereInput>;
};


export type QueryGovernanceProposalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<GovernanceProposalOrderByInput>>;
  where?: InputMaybe<GovernanceProposalWhereInput>;
};


export type QueryGovernanceProposalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<GovernanceProposalOrderByInput>;
  where?: InputMaybe<GovernanceProposalWhereInput>;
};


export type QueryLegacyStakerByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLegacyStakerByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLegacyStakersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LegacyStakerOrderByInput>>;
  where?: InputMaybe<LegacyStakerWhereInput>;
};


export type QueryLegacyStakersConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LegacyStakerOrderByInput>;
  where?: InputMaybe<LegacyStakerWhereInput>;
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


export type QueryOTokenActivitiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenActivityOrderByInput>>;
  where?: InputMaybe<OTokenActivityWhereInput>;
};


export type QueryOTokenActivitiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenActivityOrderByInput>;
  where?: InputMaybe<OTokenActivityWhereInput>;
};


export type QueryOTokenActivityByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenActivityByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenAddressByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenAddressByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenAddressOrderByInput>>;
  where?: InputMaybe<OTokenAddressWhereInput>;
};


export type QueryOTokenAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenAddressOrderByInput>;
  where?: InputMaybe<OTokenAddressWhereInput>;
};


export type QueryOTokenApiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenApyOrderByInput>>;
  where?: InputMaybe<OTokenApyWhereInput>;
};


export type QueryOTokenApiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenApyOrderByInput>;
  where?: InputMaybe<OTokenApyWhereInput>;
};


export type QueryOTokenApyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenApyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenAssetByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenAssetByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenAssetOrderByInput>>;
  where?: InputMaybe<OTokenAssetWhereInput>;
};


export type QueryOTokenAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenAssetOrderByInput>;
  where?: InputMaybe<OTokenAssetWhereInput>;
};


export type QueryOTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenHistoryOrderByInput>>;
  where?: InputMaybe<OTokenHistoryWhereInput>;
};


export type QueryOTokenHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenHistoryOrderByInput>;
  where?: InputMaybe<OTokenHistoryWhereInput>;
};


export type QueryOTokenHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenRebaseByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenRebaseByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenRebaseOptionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenRebaseOptionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenRebaseOptionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenRebaseOptionOrderByInput>>;
  where?: InputMaybe<OTokenRebaseOptionWhereInput>;
};


export type QueryOTokenRebaseOptionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenRebaseOptionOrderByInput>;
  where?: InputMaybe<OTokenRebaseOptionWhereInput>;
};


export type QueryOTokenRebasesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenRebaseOrderByInput>>;
  where?: InputMaybe<OTokenRebaseWhereInput>;
};


export type QueryOTokenRebasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenRebaseOrderByInput>;
  where?: InputMaybe<OTokenRebaseWhereInput>;
};


export type QueryOTokenVaultByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOTokenVaultByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOTokenVaultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenVaultOrderByInput>>;
  where?: InputMaybe<OTokenVaultWhereInput>;
};


export type QueryOTokenVaultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenVaultOrderByInput>;
  where?: InputMaybe<OTokenVaultWhereInput>;
};


export type QueryOTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OTokenOrderByInput>>;
  where?: InputMaybe<OTokenWhereInput>;
};


export type QueryOTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OTokenOrderByInput>;
  where?: InputMaybe<OTokenWhereInput>;
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


export type QueryOethWithdrawalRequestByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOethWithdrawalRequestByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOethWithdrawalRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OethWithdrawalRequestOrderByInput>>;
  where?: InputMaybe<OethWithdrawalRequestWhereInput>;
};


export type QueryOethWithdrawalRequestsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OethWithdrawalRequestOrderByInput>;
  where?: InputMaybe<OethWithdrawalRequestWhereInput>;
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
  AssetAscNullsLast = 'asset_ASC_NULLS_LAST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsFirst = 'asset_DESC_NULLS_FIRST',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyAscNullsLast = 'strategy_ASC_NULLS_LAST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsFirst = 'strategy_DESC_NULLS_FIRST',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AprAscNullsLast = 'apr_ASC_NULLS_LAST',
  AprDesc = 'apr_DESC',
  AprDescNullsFirst = 'apr_DESC_NULLS_FIRST',
  AprDescNullsLast = 'apr_DESC_NULLS_LAST',
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetAscNullsLast = 'asset_ASC_NULLS_LAST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsFirst = 'asset_DESC_NULLS_FIRST',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceWeightAsc = 'balanceWeight_ASC',
  BalanceWeightAscNullsFirst = 'balanceWeight_ASC_NULLS_FIRST',
  BalanceWeightAscNullsLast = 'balanceWeight_ASC_NULLS_LAST',
  BalanceWeightDesc = 'balanceWeight_DESC',
  BalanceWeightDescNullsFirst = 'balanceWeight_DESC_NULLS_FIRST',
  BalanceWeightDescNullsLast = 'balanceWeight_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EarningsChangeAsc = 'earningsChange_ASC',
  EarningsChangeAscNullsFirst = 'earningsChange_ASC_NULLS_FIRST',
  EarningsChangeAscNullsLast = 'earningsChange_ASC_NULLS_LAST',
  EarningsChangeDesc = 'earningsChange_DESC',
  EarningsChangeDescNullsFirst = 'earningsChange_DESC_NULLS_FIRST',
  EarningsChangeDescNullsLast = 'earningsChange_DESC_NULLS_LAST',
  EarningsAsc = 'earnings_ASC',
  EarningsAscNullsFirst = 'earnings_ASC_NULLS_FIRST',
  EarningsAscNullsLast = 'earnings_ASC_NULLS_LAST',
  EarningsDesc = 'earnings_DESC',
  EarningsDescNullsFirst = 'earnings_DESC_NULLS_FIRST',
  EarningsDescNullsLast = 'earnings_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyAscNullsLast = 'strategy_ASC_NULLS_LAST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsFirst = 'strategy_DESC_NULLS_FIRST',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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
  AssetAscNullsLast = 'asset_ASC_NULLS_LAST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsFirst = 'asset_DESC_NULLS_FIRST',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceWeightAsc = 'balanceWeight_ASC',
  BalanceWeightAscNullsFirst = 'balanceWeight_ASC_NULLS_FIRST',
  BalanceWeightAscNullsLast = 'balanceWeight_ASC_NULLS_LAST',
  BalanceWeightDesc = 'balanceWeight_DESC',
  BalanceWeightDescNullsFirst = 'balanceWeight_DESC_NULLS_FIRST',
  BalanceWeightDescNullsLast = 'balanceWeight_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceAscNullsLast = 'balance_ASC_NULLS_LAST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsFirst = 'balance_DESC_NULLS_FIRST',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EarningsChangeAsc = 'earningsChange_ASC',
  EarningsChangeAscNullsFirst = 'earningsChange_ASC_NULLS_FIRST',
  EarningsChangeAscNullsLast = 'earningsChange_ASC_NULLS_LAST',
  EarningsChangeDesc = 'earningsChange_DESC',
  EarningsChangeDescNullsFirst = 'earningsChange_DESC_NULLS_FIRST',
  EarningsChangeDescNullsLast = 'earningsChange_DESC_NULLS_LAST',
  EarningsAsc = 'earnings_ASC',
  EarningsAscNullsFirst = 'earnings_ASC_NULLS_FIRST',
  EarningsAscNullsLast = 'earnings_ASC_NULLS_LAST',
  EarningsDesc = 'earnings_DESC',
  EarningsDescNullsFirst = 'earnings_DESC_NULLS_FIRST',
  EarningsDescNullsLast = 'earnings_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyAscNullsLast = 'strategy_ASC_NULLS_LAST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsFirst = 'strategy_DESC_NULLS_FIRST',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
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

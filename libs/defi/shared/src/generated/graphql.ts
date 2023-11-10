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

export type Balance = {
  __typename?: 'Balance';
  address: Scalars['String']['output'];
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  /** Format: 'token:address:blockNumber' */
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  token: Scalars['String']['output'];
};

export type BalanceEdge = {
  __typename?: 'BalanceEdge';
  cursor: Scalars['String']['output'];
  node: Balance;
};

export enum BalanceOrderByInput {
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

export type BalanceWhereInput = {
  AND?: InputMaybe<Array<BalanceWhereInput>>;
  OR?: InputMaybe<Array<BalanceWhereInput>>;
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

export type BalancesConnection = {
  __typename?: 'BalancesConnection';
  edges: Array<BalanceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  DailyStatIdFeesAsc = 'dailyStatId_fees_ASC',
  DailyStatIdFeesAscNullsFirst = 'dailyStatId_fees_ASC_NULLS_FIRST',
  DailyStatIdFeesDesc = 'dailyStatId_fees_DESC',
  DailyStatIdFeesDescNullsLast = 'dailyStatId_fees_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
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
  DailyStatIdRevenue7DayAvgAsc = 'dailyStatId_revenue7DayAvg_ASC',
  DailyStatIdRevenue7DayAvgAscNullsFirst = 'dailyStatId_revenue7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdRevenue7DayAvgDesc = 'dailyStatId_revenue7DayAvg_DESC',
  DailyStatIdRevenue7DayAvgDescNullsLast = 'dailyStatId_revenue7DayAvg_DESC_NULLS_LAST',
  DailyStatIdRevenue7DayTotalAsc = 'dailyStatId_revenue7DayTotal_ASC',
  DailyStatIdRevenue7DayTotalAscNullsFirst = 'dailyStatId_revenue7DayTotal_ASC_NULLS_FIRST',
  DailyStatIdRevenue7DayTotalDesc = 'dailyStatId_revenue7DayTotal_DESC',
  DailyStatIdRevenue7DayTotalDescNullsLast = 'dailyStatId_revenue7DayTotal_DESC_NULLS_LAST',
  DailyStatIdRevenueAllTimeAsc = 'dailyStatId_revenueAllTime_ASC',
  DailyStatIdRevenueAllTimeAscNullsFirst = 'dailyStatId_revenueAllTime_ASC_NULLS_FIRST',
  DailyStatIdRevenueAllTimeDesc = 'dailyStatId_revenueAllTime_DESC',
  DailyStatIdRevenueAllTimeDescNullsLast = 'dailyStatId_revenueAllTime_DESC_NULLS_LAST',
  DailyStatIdRevenueAsc = 'dailyStatId_revenue_ASC',
  DailyStatIdRevenueAscNullsFirst = 'dailyStatId_revenue_ASC_NULLS_FIRST',
  DailyStatIdRevenueDesc = 'dailyStatId_revenue_DESC',
  DailyStatIdRevenueDescNullsLast = 'dailyStatId_revenue_DESC_NULLS_LAST',
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
  DailyStatIdYieldAsc = 'dailyStatId_yield_ASC',
  DailyStatIdYieldAscNullsFirst = 'dailyStatId_yield_ASC_NULLS_FIRST',
  DailyStatIdYieldDesc = 'dailyStatId_yield_DESC',
  DailyStatIdYieldDescNullsLast = 'dailyStatId_yield_DESC_NULLS_LAST',
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
  fees: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  nonRebasingSupply: Scalars['BigInt']['output'];
  pegPrice: Scalars['BigInt']['output'];
  rebasingSupply: Scalars['BigInt']['output'];
  revenue: Scalars['BigInt']['output'];
  revenue7DayAvg: Scalars['BigInt']['output'];
  revenue7DayTotal: Scalars['BigInt']['output'];
  revenueAllTime: Scalars['BigInt']['output'];
  /** Price of OETH in ETH */
  strategies: Array<OethStrategyDailyStat>;
  /** Last block number stats were updated */
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  totalSupplyUSD: Scalars['Float']['output'];
  yield: Scalars['BigInt']['output'];
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
  FeesAsc = 'fees_ASC',
  FeesAscNullsFirst = 'fees_ASC_NULLS_FIRST',
  FeesDesc = 'fees_DESC',
  FeesDescNullsLast = 'fees_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
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
  Revenue7DayAvgAsc = 'revenue7DayAvg_ASC',
  Revenue7DayAvgAscNullsFirst = 'revenue7DayAvg_ASC_NULLS_FIRST',
  Revenue7DayAvgDesc = 'revenue7DayAvg_DESC',
  Revenue7DayAvgDescNullsLast = 'revenue7DayAvg_DESC_NULLS_LAST',
  Revenue7DayTotalAsc = 'revenue7DayTotal_ASC',
  Revenue7DayTotalAscNullsFirst = 'revenue7DayTotal_ASC_NULLS_FIRST',
  Revenue7DayTotalDesc = 'revenue7DayTotal_DESC',
  Revenue7DayTotalDescNullsLast = 'revenue7DayTotal_DESC_NULLS_LAST',
  RevenueAllTimeAsc = 'revenueAllTime_ASC',
  RevenueAllTimeAscNullsFirst = 'revenueAllTime_ASC_NULLS_FIRST',
  RevenueAllTimeDesc = 'revenueAllTime_DESC',
  RevenueAllTimeDescNullsLast = 'revenueAllTime_DESC_NULLS_LAST',
  RevenueAsc = 'revenue_ASC',
  RevenueAscNullsFirst = 'revenue_ASC_NULLS_FIRST',
  RevenueDesc = 'revenue_DESC',
  RevenueDescNullsLast = 'revenue_DESC_NULLS_LAST',
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
  YieldAsc = 'yield_ASC',
  YieldAscNullsFirst = 'yield_ASC_NULLS_FIRST',
  YieldDesc = 'yield_DESC',
  YieldDescNullsLast = 'yield_DESC_NULLS_LAST'
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
  fees_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fees_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fees_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fees_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fees_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fees_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fees_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fees_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fees_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  revenue7DayAvg_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenue7DayAvg_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revenue7DayAvg_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayAvg_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenue7DayTotal_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenue7DayTotal_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revenue7DayTotal_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue7DayTotal_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenueAllTime_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenueAllTime_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revenueAllTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenueAllTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenue_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_gt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_gte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  revenue_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  revenue_lt?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_lte?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  revenue_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  yield_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yield_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yield_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  fee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  yield: Scalars['BigInt']['output'];
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
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
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
  YieldAsc = 'yield_ASC',
  YieldAscNullsFirst = 'yield_ASC_NULLS_FIRST',
  YieldDesc = 'yield_DESC',
  YieldDescNullsLast = 'yield_DESC_NULLS_LAST'
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
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  yield_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yield_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yield_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  DailyStatIdFeesAsc = 'dailyStatId_fees_ASC',
  DailyStatIdFeesAscNullsFirst = 'dailyStatId_fees_ASC_NULLS_FIRST',
  DailyStatIdFeesDesc = 'dailyStatId_fees_DESC',
  DailyStatIdFeesDescNullsLast = 'dailyStatId_fees_DESC_NULLS_LAST',
  DailyStatIdIdAsc = 'dailyStatId_id_ASC',
  DailyStatIdIdAscNullsFirst = 'dailyStatId_id_ASC_NULLS_FIRST',
  DailyStatIdIdDesc = 'dailyStatId_id_DESC',
  DailyStatIdIdDescNullsLast = 'dailyStatId_id_DESC_NULLS_LAST',
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
  DailyStatIdRevenue7DayAvgAsc = 'dailyStatId_revenue7DayAvg_ASC',
  DailyStatIdRevenue7DayAvgAscNullsFirst = 'dailyStatId_revenue7DayAvg_ASC_NULLS_FIRST',
  DailyStatIdRevenue7DayAvgDesc = 'dailyStatId_revenue7DayAvg_DESC',
  DailyStatIdRevenue7DayAvgDescNullsLast = 'dailyStatId_revenue7DayAvg_DESC_NULLS_LAST',
  DailyStatIdRevenue7DayTotalAsc = 'dailyStatId_revenue7DayTotal_ASC',
  DailyStatIdRevenue7DayTotalAscNullsFirst = 'dailyStatId_revenue7DayTotal_ASC_NULLS_FIRST',
  DailyStatIdRevenue7DayTotalDesc = 'dailyStatId_revenue7DayTotal_DESC',
  DailyStatIdRevenue7DayTotalDescNullsLast = 'dailyStatId_revenue7DayTotal_DESC_NULLS_LAST',
  DailyStatIdRevenueAllTimeAsc = 'dailyStatId_revenueAllTime_ASC',
  DailyStatIdRevenueAllTimeAscNullsFirst = 'dailyStatId_revenueAllTime_ASC_NULLS_FIRST',
  DailyStatIdRevenueAllTimeDesc = 'dailyStatId_revenueAllTime_DESC',
  DailyStatIdRevenueAllTimeDescNullsLast = 'dailyStatId_revenueAllTime_DESC_NULLS_LAST',
  DailyStatIdRevenueAsc = 'dailyStatId_revenue_ASC',
  DailyStatIdRevenueAscNullsFirst = 'dailyStatId_revenue_ASC_NULLS_FIRST',
  DailyStatIdRevenueDesc = 'dailyStatId_revenue_DESC',
  DailyStatIdRevenueDescNullsLast = 'dailyStatId_revenue_DESC_NULLS_LAST',
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
  DailyStatIdYieldAsc = 'dailyStatId_yield_ASC',
  DailyStatIdYieldAscNullsFirst = 'dailyStatId_yield_ASC_NULLS_FIRST',
  DailyStatIdYieldDesc = 'dailyStatId_yield_DESC',
  DailyStatIdYieldDescNullsLast = 'dailyStatId_yield_DESC_NULLS_LAST',
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

export type Ogv = {
  __typename?: 'OGV';
  blockNumber: Scalars['Int']['output'];
  circulating: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  total: Scalars['BigInt']['output'];
};

export type OgvEdge = {
  __typename?: 'OGVEdge';
  cursor: Scalars['String']['output'];
  node: Ogv;
};

export type OgvGovernance = {
  __typename?: 'OGVGovernance';
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  improvementProposals: Scalars['Int']['output'];
  openSourceContributors: Scalars['Int']['output'];
  registeredVoters: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type OgvGovernanceEdge = {
  __typename?: 'OGVGovernanceEdge';
  cursor: Scalars['String']['output'];
  node: OgvGovernance;
};

export enum OgvGovernanceOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ImprovementProposalsAsc = 'improvementProposals_ASC',
  ImprovementProposalsAscNullsFirst = 'improvementProposals_ASC_NULLS_FIRST',
  ImprovementProposalsDesc = 'improvementProposals_DESC',
  ImprovementProposalsDescNullsLast = 'improvementProposals_DESC_NULLS_LAST',
  OpenSourceContributorsAsc = 'openSourceContributors_ASC',
  OpenSourceContributorsAscNullsFirst = 'openSourceContributors_ASC_NULLS_FIRST',
  OpenSourceContributorsDesc = 'openSourceContributors_DESC',
  OpenSourceContributorsDescNullsLast = 'openSourceContributors_DESC_NULLS_LAST',
  RegisteredVotersAsc = 'registeredVoters_ASC',
  RegisteredVotersAscNullsFirst = 'registeredVoters_ASC_NULLS_FIRST',
  RegisteredVotersDesc = 'registeredVoters_DESC',
  RegisteredVotersDescNullsLast = 'registeredVoters_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type OgvGovernanceWhereInput = {
  AND?: InputMaybe<Array<OgvGovernanceWhereInput>>;
  OR?: InputMaybe<Array<OgvGovernanceWhereInput>>;
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
  improvementProposals_eq?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_gt?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_gte?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  improvementProposals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  improvementProposals_lt?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_lte?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  improvementProposals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  openSourceContributors_eq?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_gt?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_gte?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  openSourceContributors_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  openSourceContributors_lt?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_lte?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_not_eq?: InputMaybe<Scalars['Int']['input']>;
  openSourceContributors_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  registeredVoters_eq?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_gt?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_gte?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  registeredVoters_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  registeredVoters_lt?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_lte?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_not_eq?: InputMaybe<Scalars['Int']['input']>;
  registeredVoters_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type OgvGovernancesConnection = {
  __typename?: 'OGVGovernancesConnection';
  edges: Array<OgvGovernanceEdge>;
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
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST'
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
  fee: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  rebasingCredits: Scalars['BigInt']['output'];
  rebasingCreditsPerToken: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
  totalSupply: Scalars['BigInt']['output'];
  txHash: Scalars['String']['output'];
  yield: Scalars['BigInt']['output'];
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
  FeeAsc = 'fee_ASC',
  FeeAscNullsFirst = 'fee_ASC_NULLS_FIRST',
  FeeDesc = 'fee_DESC',
  FeeDescNullsLast = 'fee_DESC_NULLS_LAST',
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
  YieldAsc = 'yield_ASC',
  YieldAscNullsFirst = 'yield_ASC_NULLS_FIRST',
  YieldDesc = 'yield_DESC',
  YieldDescNullsLast = 'yield_DESC_NULLS_LAST'
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
  fee_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_gte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  fee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fee_lt?: InputMaybe<Scalars['BigInt']['input']>;
  fee_lte?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  yield_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_gte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  yield_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  yield_lt?: InputMaybe<Scalars['BigInt']['input']>;
  yield_lte?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  yield_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type OusdRebasesConnection = {
  __typename?: 'OUSDRebasesConnection';
  edges: Array<OusdRebaseEdge>;
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

export type Query = {
  __typename?: 'Query';
  balanceById?: Maybe<Balance>;
  /** @deprecated Use balanceById */
  balanceByUniqueInput?: Maybe<Balance>;
  balances: Array<Balance>;
  balancesConnection: BalancesConnection;
  curvePoolBalanceById?: Maybe<CurvePoolBalance>;
  /** @deprecated Use curvePoolBalanceById */
  curvePoolBalanceByUniqueInput?: Maybe<CurvePoolBalance>;
  curvePoolBalances: Array<CurvePoolBalance>;
  curvePoolBalancesConnection: CurvePoolBalancesConnection;
  exchangeRateById?: Maybe<ExchangeRate>;
  /** @deprecated Use exchangeRateById */
  exchangeRateByUniqueInput?: Maybe<ExchangeRate>;
  exchangeRates: Array<ExchangeRate>;
  exchangeRatesConnection: ExchangeRatesConnection;
  makerDsrStrategies: Array<MakerDsrStrategy>;
  makerDsrStrategiesConnection: MakerDsrStrategiesConnection;
  makerDsrStrategyById?: Maybe<MakerDsrStrategy>;
  /** @deprecated Use makerDsrStrategyById */
  makerDsrStrategyByUniqueInput?: Maybe<MakerDsrStrategy>;
  oethAddressById?: Maybe<OethAddress>;
  /** @deprecated Use oethAddressById */
  oethAddressByUniqueInput?: Maybe<OethAddress>;
  oethAddresses: Array<OethAddress>;
  oethAddressesConnection: OethAddressesConnection;
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
  ogvById?: Maybe<Ogv>;
  /** @deprecated Use ogvById */
  ogvByUniqueInput?: Maybe<Ogv>;
  ogvGovernanceById?: Maybe<OgvGovernance>;
  /** @deprecated Use ogvGovernanceById */
  ogvGovernanceByUniqueInput?: Maybe<OgvGovernance>;
  ogvGovernances: Array<OgvGovernance>;
  ogvGovernancesConnection: OgvGovernancesConnection;
  ogvs: Array<Ogv>;
  ogvsConnection: OgVsConnection;
  ousdAaveStrategies: Array<OusdAaveStrategy>;
  ousdAaveStrategiesConnection: OusdAaveStrategiesConnection;
  ousdAaveStrategyById?: Maybe<OusdAaveStrategy>;
  /** @deprecated Use ousdAaveStrategyById */
  ousdAaveStrategyByUniqueInput?: Maybe<OusdAaveStrategy>;
  ousdAddressById?: Maybe<OusdAddress>;
  /** @deprecated Use ousdAddressById */
  ousdAddressByUniqueInput?: Maybe<OusdAddress>;
  ousdAddresses: Array<OusdAddress>;
  ousdAddressesConnection: OusdAddressesConnection;
  ousdById?: Maybe<Ousd>;
  /** @deprecated Use ousdById */
  ousdByUniqueInput?: Maybe<Ousd>;
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
  squidStatus?: Maybe<SquidStatus>;
  stakedOgvById?: Maybe<StakedOgv>;
  /** @deprecated Use stakedOgvById */
  stakedOgvByUniqueInput?: Maybe<StakedOgv>;
  stakedOgvs: Array<StakedOgv>;
  stakedOgvsConnection: StakedOgVsConnection;
  strategyBalanceById?: Maybe<StrategyBalance>;
  /** @deprecated Use strategyBalanceById */
  strategyBalanceByUniqueInput?: Maybe<StrategyBalance>;
  strategyBalances: Array<StrategyBalance>;
  strategyBalancesConnection: StrategyBalancesConnection;
};


export type QueryBalanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryBalanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryBalancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<BalanceOrderByInput>>;
  where?: InputMaybe<BalanceWhereInput>;
};


export type QueryBalancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<BalanceOrderByInput>;
  where?: InputMaybe<BalanceWhereInput>;
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


export type QueryOgvByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvGovernanceByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOgvGovernanceByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryOgvGovernancesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OgvGovernanceOrderByInput>>;
  where?: InputMaybe<OgvGovernanceWhereInput>;
};


export type QueryOgvGovernancesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<OgvGovernanceOrderByInput>;
  where?: InputMaybe<OgvGovernanceWhereInput>;
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


export type QueryOusdByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryOusdByUniqueInputArgs = {
  where: WhereIdInput;
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


export type QueryStakedOgvByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStakedOgvByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStakedOgvsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StakedOgvOrderByInput>>;
  where?: InputMaybe<StakedOgvWhereInput>;
};


export type QueryStakedOgvsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StakedOgvOrderByInput>;
  where?: InputMaybe<StakedOgvWhereInput>;
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

export enum RebasingOption {
  OptIn = 'OptIn',
  OptOut = 'OptOut'
}

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type StakedOgv = {
  __typename?: 'StakedOGV';
  apy: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  total: Scalars['BigInt']['output'];
};

export type StakedOgvEdge = {
  __typename?: 'StakedOGVEdge';
  cursor: Scalars['String']['output'];
  node: StakedOgv;
};

export enum StakedOgvOrderByInput {
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
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TotalAsc = 'total_ASC',
  TotalAscNullsFirst = 'total_ASC_NULLS_FIRST',
  TotalDesc = 'total_DESC',
  TotalDescNullsLast = 'total_DESC_NULLS_LAST'
}

export type StakedOgvWhereInput = {
  AND?: InputMaybe<Array<StakedOgvWhereInput>>;
  OR?: InputMaybe<Array<StakedOgvWhereInput>>;
  apy_eq?: InputMaybe<Scalars['BigInt']['input']>;
  apy_gt?: InputMaybe<Scalars['BigInt']['input']>;
  apy_gte?: InputMaybe<Scalars['BigInt']['input']>;
  apy_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  apy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy_lt?: InputMaybe<Scalars['BigInt']['input']>;
  apy_lte?: InputMaybe<Scalars['BigInt']['input']>;
  apy_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  apy_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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

export type StakedOgVsConnection = {
  __typename?: 'StakedOGVsConnection';
  edges: Array<StakedOgvEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

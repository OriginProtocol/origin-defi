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

export type LrtBalanceData = {
  __typename?: 'LRTBalanceData';
  asset?: Maybe<Scalars['String']['output']>;
  balance: Scalars['BigInt']['output'];
  balanceDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  recipient: LrtPointRecipient;
  referralId?: Maybe<Scalars['String']['output']>;
  staticPoints: Scalars['BigInt']['output'];
  staticPointsDate: Scalars['DateTime']['output'];
  staticReferralPointsBase: Scalars['BigInt']['output'];
};

export type LrtBalanceDataConnection = {
  __typename?: 'LRTBalanceDataConnection';
  edges: Array<LrtBalanceDataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtBalanceDataEdge = {
  __typename?: 'LRTBalanceDataEdge';
  cursor: Scalars['String']['output'];
  node: LrtBalanceData;
};

export enum LrtBalanceDataOrderByInput {
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BalanceDateAsc = 'balanceDate_ASC',
  BalanceDateAscNullsFirst = 'balanceDate_ASC_NULLS_FIRST',
  BalanceDateDesc = 'balanceDate_DESC',
  BalanceDateDescNullsLast = 'balanceDate_DESC_NULLS_LAST',
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RecipientBalanceAsc = 'recipient_balance_ASC',
  RecipientBalanceAscNullsFirst = 'recipient_balance_ASC_NULLS_FIRST',
  RecipientBalanceDesc = 'recipient_balance_DESC',
  RecipientBalanceDescNullsLast = 'recipient_balance_DESC_NULLS_LAST',
  RecipientElPointsAsc = 'recipient_elPoints_ASC',
  RecipientElPointsAscNullsFirst = 'recipient_elPoints_ASC_NULLS_FIRST',
  RecipientElPointsDesc = 'recipient_elPoints_DESC',
  RecipientElPointsDescNullsLast = 'recipient_elPoints_DESC_NULLS_LAST',
  RecipientIdAsc = 'recipient_id_ASC',
  RecipientIdAscNullsFirst = 'recipient_id_ASC_NULLS_FIRST',
  RecipientIdDesc = 'recipient_id_DESC',
  RecipientIdDescNullsLast = 'recipient_id_DESC_NULLS_LAST',
  RecipientPointsDateAsc = 'recipient_pointsDate_ASC',
  RecipientPointsDateAscNullsFirst = 'recipient_pointsDate_ASC_NULLS_FIRST',
  RecipientPointsDateDesc = 'recipient_pointsDate_DESC',
  RecipientPointsDateDescNullsLast = 'recipient_pointsDate_DESC_NULLS_LAST',
  RecipientPointsAsc = 'recipient_points_ASC',
  RecipientPointsAscNullsFirst = 'recipient_points_ASC_NULLS_FIRST',
  RecipientPointsDesc = 'recipient_points_DESC',
  RecipientPointsDescNullsLast = 'recipient_points_DESC_NULLS_LAST',
  RecipientReferralCountAsc = 'recipient_referralCount_ASC',
  RecipientReferralCountAscNullsFirst = 'recipient_referralCount_ASC_NULLS_FIRST',
  RecipientReferralCountDesc = 'recipient_referralCount_DESC',
  RecipientReferralCountDescNullsLast = 'recipient_referralCount_DESC_NULLS_LAST',
  RecipientReferralPointsAsc = 'recipient_referralPoints_ASC',
  RecipientReferralPointsAscNullsFirst = 'recipient_referralPoints_ASC_NULLS_FIRST',
  RecipientReferralPointsDesc = 'recipient_referralPoints_DESC',
  RecipientReferralPointsDescNullsLast = 'recipient_referralPoints_DESC_NULLS_LAST',
  RecipientReferrerCountAsc = 'recipient_referrerCount_ASC',
  RecipientReferrerCountAscNullsFirst = 'recipient_referrerCount_ASC_NULLS_FIRST',
  RecipientReferrerCountDesc = 'recipient_referrerCount_DESC',
  RecipientReferrerCountDescNullsLast = 'recipient_referrerCount_DESC_NULLS_LAST',
  ReferralIdAsc = 'referralId_ASC',
  ReferralIdAscNullsFirst = 'referralId_ASC_NULLS_FIRST',
  ReferralIdDesc = 'referralId_DESC',
  ReferralIdDescNullsLast = 'referralId_DESC_NULLS_LAST',
  StaticPointsDateAsc = 'staticPointsDate_ASC',
  StaticPointsDateAscNullsFirst = 'staticPointsDate_ASC_NULLS_FIRST',
  StaticPointsDateDesc = 'staticPointsDate_DESC',
  StaticPointsDateDescNullsLast = 'staticPointsDate_DESC_NULLS_LAST',
  StaticPointsAsc = 'staticPoints_ASC',
  StaticPointsAscNullsFirst = 'staticPoints_ASC_NULLS_FIRST',
  StaticPointsDesc = 'staticPoints_DESC',
  StaticPointsDescNullsLast = 'staticPoints_DESC_NULLS_LAST',
  StaticReferralPointsBaseAsc = 'staticReferralPointsBase_ASC',
  StaticReferralPointsBaseAscNullsFirst = 'staticReferralPointsBase_ASC_NULLS_FIRST',
  StaticReferralPointsBaseDesc = 'staticReferralPointsBase_DESC',
  StaticReferralPointsBaseDescNullsLast = 'staticReferralPointsBase_DESC_NULLS_LAST'
}

export type LrtBalanceDataWhereInput = {
  AND?: InputMaybe<Array<LrtBalanceDataWhereInput>>;
  OR?: InputMaybe<Array<LrtBalanceDataWhereInput>>;
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
  balanceDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  balanceDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balanceDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  balanceDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
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
  recipient?: InputMaybe<LrtPointRecipientWhereInput>;
  recipient_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralId_contains?: InputMaybe<Scalars['String']['input']>;
  referralId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referralId_endsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_eq?: InputMaybe<Scalars['String']['input']>;
  referralId_gt?: InputMaybe<Scalars['String']['input']>;
  referralId_gte?: InputMaybe<Scalars['String']['input']>;
  referralId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralId_lt?: InputMaybe<Scalars['String']['input']>;
  referralId_lte?: InputMaybe<Scalars['String']['input']>;
  referralId_not_contains?: InputMaybe<Scalars['String']['input']>;
  referralId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referralId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_not_eq?: InputMaybe<Scalars['String']['input']>;
  referralId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_startsWith?: InputMaybe<Scalars['String']['input']>;
  staticPointsDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  staticPointsDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staticPointsDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  staticPointsDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  staticPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staticPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staticPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staticPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staticReferralPointsBase_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_gt?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_gte?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staticReferralPointsBase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staticReferralPointsBase_lt?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_lte?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staticReferralPointsBase_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type LrtDeposit = {
  __typename?: 'LRTDeposit';
  amountReceived: Scalars['BigInt']['output'];
  asset: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  depositAmount: Scalars['BigInt']['output'];
  depositor: Scalars['String']['output'];
  id: Scalars['String']['output'];
  referralId: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type LrtDepositEdge = {
  __typename?: 'LRTDepositEdge';
  cursor: Scalars['String']['output'];
  node: LrtDeposit;
};

export enum LrtDepositOrderByInput {
  AmountReceivedAsc = 'amountReceived_ASC',
  AmountReceivedAscNullsFirst = 'amountReceived_ASC_NULLS_FIRST',
  AmountReceivedDesc = 'amountReceived_DESC',
  AmountReceivedDescNullsLast = 'amountReceived_DESC_NULLS_LAST',
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DepositAmountAsc = 'depositAmount_ASC',
  DepositAmountAscNullsFirst = 'depositAmount_ASC_NULLS_FIRST',
  DepositAmountDesc = 'depositAmount_DESC',
  DepositAmountDescNullsLast = 'depositAmount_DESC_NULLS_LAST',
  DepositorAsc = 'depositor_ASC',
  DepositorAscNullsFirst = 'depositor_ASC_NULLS_FIRST',
  DepositorDesc = 'depositor_DESC',
  DepositorDescNullsLast = 'depositor_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ReferralIdAsc = 'referralId_ASC',
  ReferralIdAscNullsFirst = 'referralId_ASC_NULLS_FIRST',
  ReferralIdDesc = 'referralId_DESC',
  ReferralIdDescNullsLast = 'referralId_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtDepositWhereInput = {
  AND?: InputMaybe<Array<LrtDepositWhereInput>>;
  OR?: InputMaybe<Array<LrtDepositWhereInput>>;
  amountReceived_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amountReceived_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amountReceived_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amountReceived_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  depositAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  depositAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  depositAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  depositor_contains?: InputMaybe<Scalars['String']['input']>;
  depositor_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  depositor_endsWith?: InputMaybe<Scalars['String']['input']>;
  depositor_eq?: InputMaybe<Scalars['String']['input']>;
  depositor_gt?: InputMaybe<Scalars['String']['input']>;
  depositor_gte?: InputMaybe<Scalars['String']['input']>;
  depositor_in?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  depositor_lt?: InputMaybe<Scalars['String']['input']>;
  depositor_lte?: InputMaybe<Scalars['String']['input']>;
  depositor_not_contains?: InputMaybe<Scalars['String']['input']>;
  depositor_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  depositor_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  depositor_not_eq?: InputMaybe<Scalars['String']['input']>;
  depositor_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  depositor_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  depositor_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  referralId_contains?: InputMaybe<Scalars['String']['input']>;
  referralId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referralId_endsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_eq?: InputMaybe<Scalars['String']['input']>;
  referralId_gt?: InputMaybe<Scalars['String']['input']>;
  referralId_gte?: InputMaybe<Scalars['String']['input']>;
  referralId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralId_lt?: InputMaybe<Scalars['String']['input']>;
  referralId_lte?: InputMaybe<Scalars['String']['input']>;
  referralId_not_contains?: InputMaybe<Scalars['String']['input']>;
  referralId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referralId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_not_eq?: InputMaybe<Scalars['String']['input']>;
  referralId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referralId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  referralId_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export type LrtDepositsConnection = {
  __typename?: 'LRTDepositsConnection';
  edges: Array<LrtDepositEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtNodeDelegator = {
  __typename?: 'LRTNodeDelegator';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  holdings: Array<LrtNodeDelegatorHoldings>;
  id: Scalars['String']['output'];
  node: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};


export type LrtNodeDelegatorHoldingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtNodeDelegatorHoldingsOrderByInput>>;
  where?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
};

export type LrtNodeDelegatorEdge = {
  __typename?: 'LRTNodeDelegatorEdge';
  cursor: Scalars['String']['output'];
  node: LrtNodeDelegator;
};

export type LrtNodeDelegatorHoldings = {
  __typename?: 'LRTNodeDelegatorHoldings';
  amount: Scalars['BigInt']['output'];
  asset: Scalars['String']['output'];
  delegator: LrtNodeDelegator;
  id: Scalars['String']['output'];
};

export type LrtNodeDelegatorHoldingsConnection = {
  __typename?: 'LRTNodeDelegatorHoldingsConnection';
  edges: Array<LrtNodeDelegatorHoldingsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtNodeDelegatorHoldingsEdge = {
  __typename?: 'LRTNodeDelegatorHoldingsEdge';
  cursor: Scalars['String']['output'];
  node: LrtNodeDelegatorHoldings;
};

export enum LrtNodeDelegatorHoldingsOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  DelegatorAmountAsc = 'delegator_amount_ASC',
  DelegatorAmountAscNullsFirst = 'delegator_amount_ASC_NULLS_FIRST',
  DelegatorAmountDesc = 'delegator_amount_DESC',
  DelegatorAmountDescNullsLast = 'delegator_amount_DESC_NULLS_LAST',
  DelegatorBlockNumberAsc = 'delegator_blockNumber_ASC',
  DelegatorBlockNumberAscNullsFirst = 'delegator_blockNumber_ASC_NULLS_FIRST',
  DelegatorBlockNumberDesc = 'delegator_blockNumber_DESC',
  DelegatorBlockNumberDescNullsLast = 'delegator_blockNumber_DESC_NULLS_LAST',
  DelegatorIdAsc = 'delegator_id_ASC',
  DelegatorIdAscNullsFirst = 'delegator_id_ASC_NULLS_FIRST',
  DelegatorIdDesc = 'delegator_id_DESC',
  DelegatorIdDescNullsLast = 'delegator_id_DESC_NULLS_LAST',
  DelegatorNodeAsc = 'delegator_node_ASC',
  DelegatorNodeAscNullsFirst = 'delegator_node_ASC_NULLS_FIRST',
  DelegatorNodeDesc = 'delegator_node_DESC',
  DelegatorNodeDescNullsLast = 'delegator_node_DESC_NULLS_LAST',
  DelegatorPointsAsc = 'delegator_points_ASC',
  DelegatorPointsAscNullsFirst = 'delegator_points_ASC_NULLS_FIRST',
  DelegatorPointsDesc = 'delegator_points_DESC',
  DelegatorPointsDescNullsLast = 'delegator_points_DESC_NULLS_LAST',
  DelegatorTimestampAsc = 'delegator_timestamp_ASC',
  DelegatorTimestampAscNullsFirst = 'delegator_timestamp_ASC_NULLS_FIRST',
  DelegatorTimestampDesc = 'delegator_timestamp_DESC',
  DelegatorTimestampDescNullsLast = 'delegator_timestamp_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type LrtNodeDelegatorHoldingsWhereInput = {
  AND?: InputMaybe<Array<LrtNodeDelegatorHoldingsWhereInput>>;
  OR?: InputMaybe<Array<LrtNodeDelegatorHoldingsWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  delegator?: InputMaybe<LrtNodeDelegatorWhereInput>;
  delegator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export enum LrtNodeDelegatorOrderByInput {
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
  NodeAsc = 'node_ASC',
  NodeAscNullsFirst = 'node_ASC_NULLS_FIRST',
  NodeDesc = 'node_DESC',
  NodeDescNullsLast = 'node_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtNodeDelegatorWhereInput = {
  AND?: InputMaybe<Array<LrtNodeDelegatorWhereInput>>;
  OR?: InputMaybe<Array<LrtNodeDelegatorWhereInput>>;
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
  holdings_every?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
  holdings_none?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
  holdings_some?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
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
  node_contains?: InputMaybe<Scalars['String']['input']>;
  node_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  node_endsWith?: InputMaybe<Scalars['String']['input']>;
  node_eq?: InputMaybe<Scalars['String']['input']>;
  node_gt?: InputMaybe<Scalars['String']['input']>;
  node_gte?: InputMaybe<Scalars['String']['input']>;
  node_in?: InputMaybe<Array<Scalars['String']['input']>>;
  node_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  node_lt?: InputMaybe<Scalars['String']['input']>;
  node_lte?: InputMaybe<Scalars['String']['input']>;
  node_not_contains?: InputMaybe<Scalars['String']['input']>;
  node_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  node_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  node_not_eq?: InputMaybe<Scalars['String']['input']>;
  node_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  node_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  node_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type LrtNodeDelegatorsConnection = {
  __typename?: 'LRTNodeDelegatorsConnection';
  edges: Array<LrtNodeDelegatorEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtPointRecipient = {
  __typename?: 'LRTPointRecipient';
  balance: Scalars['BigInt']['output'];
  balanceData: Array<LrtBalanceData>;
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  pointsDate: Scalars['DateTime']['output'];
  referralCount: Scalars['Int']['output'];
  referralPoints: Scalars['BigInt']['output'];
  referrerCount: Scalars['Int']['output'];
};


export type LrtPointRecipientBalanceDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtBalanceDataOrderByInput>>;
  where?: InputMaybe<LrtBalanceDataWhereInput>;
};

export type LrtPointRecipientEdge = {
  __typename?: 'LRTPointRecipientEdge';
  cursor: Scalars['String']['output'];
  node: LrtPointRecipient;
};

export type LrtPointRecipientHistoriesConnection = {
  __typename?: 'LRTPointRecipientHistoriesConnection';
  edges: Array<LrtPointRecipientHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtPointRecipientHistory = {
  __typename?: 'LRTPointRecipientHistory';
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  pointsDate: Scalars['DateTime']['output'];
  recipient: Scalars['String']['output'];
  referralCount: Scalars['Int']['output'];
  referralPoints: Scalars['BigInt']['output'];
  referrerCount: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type LrtPointRecipientHistoryEdge = {
  __typename?: 'LRTPointRecipientHistoryEdge';
  cursor: Scalars['String']['output'];
  node: LrtPointRecipientHistory;
};

export enum LrtPointRecipientHistoryOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PointsDateAsc = 'pointsDate_ASC',
  PointsDateAscNullsFirst = 'pointsDate_ASC_NULLS_FIRST',
  PointsDateDesc = 'pointsDate_DESC',
  PointsDateDescNullsLast = 'pointsDate_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST',
  ReferralCountAsc = 'referralCount_ASC',
  ReferralCountAscNullsFirst = 'referralCount_ASC_NULLS_FIRST',
  ReferralCountDesc = 'referralCount_DESC',
  ReferralCountDescNullsLast = 'referralCount_DESC_NULLS_LAST',
  ReferralPointsAsc = 'referralPoints_ASC',
  ReferralPointsAscNullsFirst = 'referralPoints_ASC_NULLS_FIRST',
  ReferralPointsDesc = 'referralPoints_DESC',
  ReferralPointsDescNullsLast = 'referralPoints_DESC_NULLS_LAST',
  ReferrerCountAsc = 'referrerCount_ASC',
  ReferrerCountAscNullsFirst = 'referrerCount_ASC_NULLS_FIRST',
  ReferrerCountDesc = 'referrerCount_DESC',
  ReferrerCountDescNullsLast = 'referrerCount_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtPointRecipientHistoryWhereInput = {
  AND?: InputMaybe<Array<LrtPointRecipientHistoryWhereInput>>;
  OR?: InputMaybe<Array<LrtPointRecipientHistoryWhereInput>>;
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
  elPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  elPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  elPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  pointsDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  pointsDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pointsDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  points_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  referralCount_eq?: InputMaybe<Scalars['Int']['input']>;
  referralCount_gt?: InputMaybe<Scalars['Int']['input']>;
  referralCount_gte?: InputMaybe<Scalars['Int']['input']>;
  referralCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referralCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralCount_lt?: InputMaybe<Scalars['Int']['input']>;
  referralCount_lte?: InputMaybe<Scalars['Int']['input']>;
  referralCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  referralCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referralPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerCount_eq?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_gt?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_gte?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referrerCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referrerCount_lt?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_lte?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export enum LrtPointRecipientOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PointsDateAsc = 'pointsDate_ASC',
  PointsDateAscNullsFirst = 'pointsDate_ASC_NULLS_FIRST',
  PointsDateDesc = 'pointsDate_DESC',
  PointsDateDescNullsLast = 'pointsDate_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  ReferralCountAsc = 'referralCount_ASC',
  ReferralCountAscNullsFirst = 'referralCount_ASC_NULLS_FIRST',
  ReferralCountDesc = 'referralCount_DESC',
  ReferralCountDescNullsLast = 'referralCount_DESC_NULLS_LAST',
  ReferralPointsAsc = 'referralPoints_ASC',
  ReferralPointsAscNullsFirst = 'referralPoints_ASC_NULLS_FIRST',
  ReferralPointsDesc = 'referralPoints_DESC',
  ReferralPointsDescNullsLast = 'referralPoints_DESC_NULLS_LAST',
  ReferrerCountAsc = 'referrerCount_ASC',
  ReferrerCountAscNullsFirst = 'referrerCount_ASC_NULLS_FIRST',
  ReferrerCountDesc = 'referrerCount_DESC',
  ReferrerCountDescNullsLast = 'referrerCount_DESC_NULLS_LAST'
}

export type LrtPointRecipientStats = {
  __typename?: 'LRTPointRecipientStats';
  elPoints: Scalars['BigInt']['output'];
  points: Scalars['BigInt']['output'];
  referralPoints: Scalars['BigInt']['output'];
};

export type LrtPointRecipientWhereInput = {
  AND?: InputMaybe<Array<LrtPointRecipientWhereInput>>;
  OR?: InputMaybe<Array<LrtPointRecipientWhereInput>>;
  balanceData_every?: InputMaybe<LrtBalanceDataWhereInput>;
  balanceData_none?: InputMaybe<LrtBalanceDataWhereInput>;
  balanceData_some?: InputMaybe<LrtBalanceDataWhereInput>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  elPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  elPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  elPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  pointsDate_eq?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  pointsDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pointsDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  pointsDate_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  points_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_gt?: InputMaybe<Scalars['BigInt']['input']>;
  points_gte?: InputMaybe<Scalars['BigInt']['input']>;
  points_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  points_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  points_lt?: InputMaybe<Scalars['BigInt']['input']>;
  points_lte?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  points_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralCount_eq?: InputMaybe<Scalars['Int']['input']>;
  referralCount_gt?: InputMaybe<Scalars['Int']['input']>;
  referralCount_gte?: InputMaybe<Scalars['Int']['input']>;
  referralCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referralCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralCount_lt?: InputMaybe<Scalars['Int']['input']>;
  referralCount_lte?: InputMaybe<Scalars['Int']['input']>;
  referralCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  referralCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referralPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referrerCount_eq?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_gt?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_gte?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  referrerCount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referrerCount_lt?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_lte?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_not_eq?: InputMaybe<Scalars['Int']['input']>;
  referrerCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type LrtPointRecipientsConnection = {
  __typename?: 'LRTPointRecipientsConnection';
  edges: Array<LrtPointRecipientEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtSummariesConnection = {
  __typename?: 'LRTSummariesConnection';
  edges: Array<LrtSummaryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtSummary = {
  __typename?: 'LRTSummary';
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type LrtSummaryEdge = {
  __typename?: 'LRTSummaryEdge';
  cursor: Scalars['String']['output'];
  node: LrtSummary;
};

export enum LrtSummaryOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtSummaryWhereInput = {
  AND?: InputMaybe<Array<LrtSummaryWhereInput>>;
  OR?: InputMaybe<Array<LrtSummaryWhereInput>>;
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
  elPoints_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_gte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  elPoints_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  elPoints_lt?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_lte?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  elPoints_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  lrtBalanceData: Array<LrtBalanceData>;
  lrtBalanceDataById?: Maybe<LrtBalanceData>;
  /** @deprecated Use lrtBalanceDataById */
  lrtBalanceDataByUniqueInput?: Maybe<LrtBalanceData>;
  lrtBalanceDataConnection: LrtBalanceDataConnection;
  lrtDepositById?: Maybe<LrtDeposit>;
  /** @deprecated Use lrtDepositById */
  lrtDepositByUniqueInput?: Maybe<LrtDeposit>;
  lrtDeposits: Array<LrtDeposit>;
  lrtDepositsConnection: LrtDepositsConnection;
  lrtNodeDelegatorById?: Maybe<LrtNodeDelegator>;
  /** @deprecated Use lrtNodeDelegatorById */
  lrtNodeDelegatorByUniqueInput?: Maybe<LrtNodeDelegator>;
  lrtNodeDelegatorHoldings: Array<LrtNodeDelegatorHoldings>;
  lrtNodeDelegatorHoldingsById?: Maybe<LrtNodeDelegatorHoldings>;
  /** @deprecated Use lrtNodeDelegatorHoldingsById */
  lrtNodeDelegatorHoldingsByUniqueInput?: Maybe<LrtNodeDelegatorHoldings>;
  lrtNodeDelegatorHoldingsConnection: LrtNodeDelegatorHoldingsConnection;
  lrtNodeDelegators: Array<LrtNodeDelegator>;
  lrtNodeDelegatorsConnection: LrtNodeDelegatorsConnection;
  lrtPointRecipientById?: Maybe<LrtPointRecipient>;
  /** @deprecated Use lrtPointRecipientById */
  lrtPointRecipientByUniqueInput?: Maybe<LrtPointRecipient>;
  lrtPointRecipientHistories: Array<LrtPointRecipientHistory>;
  lrtPointRecipientHistoriesConnection: LrtPointRecipientHistoriesConnection;
  lrtPointRecipientHistoryById?: Maybe<LrtPointRecipientHistory>;
  /** @deprecated Use lrtPointRecipientHistoryById */
  lrtPointRecipientHistoryByUniqueInput?: Maybe<LrtPointRecipientHistory>;
  lrtPointRecipientStats: LrtPointRecipientStats;
  lrtPointRecipients: Array<LrtPointRecipient>;
  lrtPointRecipientsConnection: LrtPointRecipientsConnection;
  lrtSummaries: Array<LrtSummary>;
  lrtSummariesConnection: LrtSummariesConnection;
  lrtSummaryById?: Maybe<LrtSummary>;
  /** @deprecated Use lrtSummaryById */
  lrtSummaryByUniqueInput?: Maybe<LrtSummary>;
  squidStatus?: Maybe<SquidStatus>;
  totalEigenLayerPoints: Scalars['BigInt']['output'];
};


export type QueryLrtBalanceDataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtBalanceDataOrderByInput>>;
  where?: InputMaybe<LrtBalanceDataWhereInput>;
};


export type QueryLrtBalanceDataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtBalanceDataByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtBalanceDataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtBalanceDataOrderByInput>;
  where?: InputMaybe<LrtBalanceDataWhereInput>;
};


export type QueryLrtDepositByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtDepositByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtDepositsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtDepositOrderByInput>>;
  where?: InputMaybe<LrtDepositWhereInput>;
};


export type QueryLrtDepositsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtDepositOrderByInput>;
  where?: InputMaybe<LrtDepositWhereInput>;
};


export type QueryLrtNodeDelegatorByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtNodeDelegatorByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtNodeDelegatorHoldingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtNodeDelegatorHoldingsOrderByInput>>;
  where?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
};


export type QueryLrtNodeDelegatorHoldingsByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtNodeDelegatorHoldingsByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtNodeDelegatorHoldingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtNodeDelegatorHoldingsOrderByInput>;
  where?: InputMaybe<LrtNodeDelegatorHoldingsWhereInput>;
};


export type QueryLrtNodeDelegatorsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtNodeDelegatorOrderByInput>>;
  where?: InputMaybe<LrtNodeDelegatorWhereInput>;
};


export type QueryLrtNodeDelegatorsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtNodeDelegatorOrderByInput>;
  where?: InputMaybe<LrtNodeDelegatorWhereInput>;
};


export type QueryLrtPointRecipientByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtPointRecipientByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtPointRecipientHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtPointRecipientHistoryOrderByInput>>;
  where?: InputMaybe<LrtPointRecipientHistoryWhereInput>;
};


export type QueryLrtPointRecipientHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtPointRecipientHistoryOrderByInput>;
  where?: InputMaybe<LrtPointRecipientHistoryWhereInput>;
};


export type QueryLrtPointRecipientHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtPointRecipientHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtPointRecipientStatsArgs = {
  address: Scalars['String']['input'];
};


export type QueryLrtPointRecipientsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtPointRecipientOrderByInput>>;
  where?: InputMaybe<LrtPointRecipientWhereInput>;
};


export type QueryLrtPointRecipientsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtPointRecipientOrderByInput>;
  where?: InputMaybe<LrtPointRecipientWhereInput>;
};


export type QueryLrtSummariesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtSummaryOrderByInput>>;
  where?: InputMaybe<LrtSummaryWhereInput>;
};


export type QueryLrtSummariesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtSummaryOrderByInput>;
  where?: InputMaybe<LrtSummaryWhereInput>;
};


export type QueryLrtSummaryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtSummaryByUniqueInputArgs = {
  where: WhereIdInput;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

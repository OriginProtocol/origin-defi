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
  points: Scalars['BigInt']['output'];
  pointsDate: Scalars['DateTime']['output'];
  recipient: LrtPointRecipient;
  referralId?: Maybe<Scalars['String']['output']>;
  referralPointsBase: Scalars['BigInt']['output'];
  source?: Maybe<Scalars['String']['output']>;
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
  PointsDateAsc = 'pointsDate_ASC',
  PointsDateAscNullsFirst = 'pointsDate_ASC_NULLS_FIRST',
  PointsDateDesc = 'pointsDate_DESC',
  PointsDateDescNullsLast = 'pointsDate_DESC_NULLS_LAST',
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
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
  ReferralPointsBaseAsc = 'referralPointsBase_ASC',
  ReferralPointsBaseAscNullsFirst = 'referralPointsBase_ASC_NULLS_FIRST',
  ReferralPointsBaseDesc = 'referralPointsBase_DESC',
  ReferralPointsBaseDescNullsLast = 'referralPointsBase_DESC_NULLS_LAST',
  SourceAsc = 'source_ASC',
  SourceAscNullsFirst = 'source_ASC_NULLS_FIRST',
  SourceDesc = 'source_DESC',
  SourceDescNullsLast = 'source_DESC_NULLS_LAST'
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
  referralPointsBase_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_gt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_gte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  referralPointsBase_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referralPointsBase_lt?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_lte?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  referralPointsBase_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  source_contains?: InputMaybe<Scalars['String']['input']>;
  source_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  source_endsWith?: InputMaybe<Scalars['String']['input']>;
  source_eq?: InputMaybe<Scalars['String']['input']>;
  source_gt?: InputMaybe<Scalars['String']['input']>;
  source_gte?: InputMaybe<Scalars['String']['input']>;
  source_in?: InputMaybe<Array<Scalars['String']['input']>>;
  source_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  source_lt?: InputMaybe<Scalars['String']['input']>;
  source_lte?: InputMaybe<Scalars['String']['input']>;
  source_not_contains?: InputMaybe<Scalars['String']['input']>;
  source_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  source_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  source_not_eq?: InputMaybe<Scalars['String']['input']>;
  source_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  source_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  source_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type LrtCampaign = {
  __typename?: 'LRTCampaign';
  balance: Scalars['BigInt']['output'];
  campaign: Scalars['String']['output'];
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
};

export type LrtCampaignEdge = {
  __typename?: 'LRTCampaignEdge';
  cursor: Scalars['String']['output'];
  node: LrtCampaign;
};

export type LrtCampaignHistoriesConnection = {
  __typename?: 'LRTCampaignHistoriesConnection';
  edges: Array<LrtCampaignHistoryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtCampaignHistory = {
  __typename?: 'LRTCampaignHistory';
  balance: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  campaign: Scalars['String']['output'];
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type LrtCampaignHistoryEdge = {
  __typename?: 'LRTCampaignHistoryEdge';
  cursor: Scalars['String']['output'];
  node: LrtCampaignHistory;
};

export enum LrtCampaignHistoryOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  CampaignAsc = 'campaign_ASC',
  CampaignAscNullsFirst = 'campaign_ASC_NULLS_FIRST',
  CampaignDesc = 'campaign_DESC',
  CampaignDescNullsLast = 'campaign_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtCampaignHistoryWhereInput = {
  AND?: InputMaybe<Array<LrtCampaignHistoryWhereInput>>;
  OR?: InputMaybe<Array<LrtCampaignHistoryWhereInput>>;
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
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_not_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_startsWith?: InputMaybe<Scalars['String']['input']>;
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

export enum LrtCampaignOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  CampaignAsc = 'campaign_ASC',
  CampaignAscNullsFirst = 'campaign_ASC_NULLS_FIRST',
  CampaignDesc = 'campaign_DESC',
  CampaignDescNullsLast = 'campaign_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST'
}

export type LrtCampaignRecipient = {
  __typename?: 'LRTCampaignRecipient';
  balance: Scalars['BigInt']['output'];
  campaign: Scalars['String']['output'];
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  recipient: Scalars['String']['output'];
};

export type LrtCampaignRecipientEdge = {
  __typename?: 'LRTCampaignRecipientEdge';
  cursor: Scalars['String']['output'];
  node: LrtCampaignRecipient;
};

export enum LrtCampaignRecipientOrderByInput {
  BalanceAsc = 'balance_ASC',
  BalanceAscNullsFirst = 'balance_ASC_NULLS_FIRST',
  BalanceDesc = 'balance_DESC',
  BalanceDescNullsLast = 'balance_DESC_NULLS_LAST',
  CampaignAsc = 'campaign_ASC',
  CampaignAscNullsFirst = 'campaign_ASC_NULLS_FIRST',
  CampaignDesc = 'campaign_DESC',
  CampaignDescNullsLast = 'campaign_DESC_NULLS_LAST',
  ElPointsAsc = 'elPoints_ASC',
  ElPointsAscNullsFirst = 'elPoints_ASC_NULLS_FIRST',
  ElPointsDesc = 'elPoints_DESC',
  ElPointsDescNullsLast = 'elPoints_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST'
}

export type LrtCampaignRecipientWhereInput = {
  AND?: InputMaybe<Array<LrtCampaignRecipientWhereInput>>;
  OR?: InputMaybe<Array<LrtCampaignRecipientWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_not_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type LrtCampaignRecipientsConnection = {
  __typename?: 'LRTCampaignRecipientsConnection';
  edges: Array<LrtCampaignRecipientEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtCampaignWhereInput = {
  AND?: InputMaybe<Array<LrtCampaignWhereInput>>;
  OR?: InputMaybe<Array<LrtCampaignWhereInput>>;
  balance_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_gte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  balance_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  balance_lt?: InputMaybe<Scalars['BigInt']['input']>;
  balance_lte?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  campaign_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_gt?: InputMaybe<Scalars['String']['input']>;
  campaign_gte?: InputMaybe<Scalars['String']['input']>;
  campaign_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  campaign_lt?: InputMaybe<Scalars['String']['input']>;
  campaign_lte?: InputMaybe<Scalars['String']['input']>;
  campaign_not_contains?: InputMaybe<Scalars['String']['input']>;
  campaign_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  campaign_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_not_eq?: InputMaybe<Scalars['String']['input']>;
  campaign_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  campaign_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  campaign_startsWith?: InputMaybe<Scalars['String']['input']>;
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
};

export type LrtCampaignsConnection = {
  __typename?: 'LRTCampaignsConnection';
  edges: Array<LrtCampaignEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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

export type LrtEigenPointCalculation = {
  __typename?: 'LRTEigenPointCalculation';
  amount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type LrtEigenPointCalculationEdge = {
  __typename?: 'LRTEigenPointCalculationEdge';
  cursor: Scalars['String']['output'];
  node: LrtEigenPointCalculation;
};

export enum LrtEigenPointCalculationOrderByInput {
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
  PointsAsc = 'points_ASC',
  PointsAscNullsFirst = 'points_ASC_NULLS_FIRST',
  PointsDesc = 'points_DESC',
  PointsDescNullsLast = 'points_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST'
}

export type LrtEigenPointCalculationWhereInput = {
  AND?: InputMaybe<Array<LrtEigenPointCalculationWhereInput>>;
  OR?: InputMaybe<Array<LrtEigenPointCalculationWhereInput>>;
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

export type LrtEigenPointCalculationsConnection = {
  __typename?: 'LRTEigenPointCalculationsConnection';
  edges: Array<LrtEigenPointCalculationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type LrtPointRecipient = {
  __typename?: 'LRTPointRecipient';
  balance: Scalars['BigInt']['output'];
  balanceDatas: Array<LrtBalanceData>;
  elPoints: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  points: Scalars['BigInt']['output'];
  pointsDate: Scalars['DateTime']['output'];
  referralCount: Scalars['Int']['output'];
  referralPoints: Scalars['BigInt']['output'];
  referrerCount: Scalars['Int']['output'];
};


export type LrtPointRecipientBalanceDatasArgs = {
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
  balanceDatas_every?: InputMaybe<LrtBalanceDataWhereInput>;
  balanceDatas_none?: InputMaybe<LrtBalanceDataWhereInput>;
  balanceDatas_some?: InputMaybe<LrtBalanceDataWhereInput>;
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

export type LrtWithdrawal = {
  __typename?: 'LRTWithdrawal';
  blockNumber: Scalars['Int']['output'];
  delegatedTo: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nonce: Scalars['BigInt']['output'];
  shares?: Maybe<Array<Scalars['String']['output']>>;
  staker: Scalars['String']['output'];
  startBlock: Scalars['Int']['output'];
  status: LrtWithdrawalStatus;
  strategies?: Maybe<Array<Scalars['String']['output']>>;
  timestamp: Scalars['DateTime']['output'];
  withdrawer: Scalars['String']['output'];
};

export type LrtWithdrawalEdge = {
  __typename?: 'LRTWithdrawalEdge';
  cursor: Scalars['String']['output'];
  node: LrtWithdrawal;
};

export enum LrtWithdrawalOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  DelegatedToAsc = 'delegatedTo_ASC',
  DelegatedToAscNullsFirst = 'delegatedTo_ASC_NULLS_FIRST',
  DelegatedToDesc = 'delegatedTo_DESC',
  DelegatedToDescNullsLast = 'delegatedTo_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NonceAsc = 'nonce_ASC',
  NonceAscNullsFirst = 'nonce_ASC_NULLS_FIRST',
  NonceDesc = 'nonce_DESC',
  NonceDescNullsLast = 'nonce_DESC_NULLS_LAST',
  StakerAsc = 'staker_ASC',
  StakerAscNullsFirst = 'staker_ASC_NULLS_FIRST',
  StakerDesc = 'staker_DESC',
  StakerDescNullsLast = 'staker_DESC_NULLS_LAST',
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
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WithdrawerAsc = 'withdrawer_ASC',
  WithdrawerAscNullsFirst = 'withdrawer_ASC_NULLS_FIRST',
  WithdrawerDesc = 'withdrawer_DESC',
  WithdrawerDescNullsLast = 'withdrawer_DESC_NULLS_LAST'
}

export type LrtWithdrawalRequest = {
  __typename?: 'LRTWithdrawalRequest';
  asset: Scalars['String']['output'];
  assetAmount: Scalars['BigInt']['output'];
  blockNumber: Scalars['Int']['output'];
  claimedAmount: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  primeETHAmount: Scalars['BigInt']['output'];
  sharesAmount: Scalars['BigInt']['output'];
  status: LrtWithdrawalStatus;
  strategy: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
  withdrawal: LrtWithdrawal;
  withdrawer: Scalars['String']['output'];
};

export type LrtWithdrawalRequestEdge = {
  __typename?: 'LRTWithdrawalRequestEdge';
  cursor: Scalars['String']['output'];
  node: LrtWithdrawalRequest;
};

export enum LrtWithdrawalRequestOrderByInput {
  AssetAmountAsc = 'assetAmount_ASC',
  AssetAmountAscNullsFirst = 'assetAmount_ASC_NULLS_FIRST',
  AssetAmountDesc = 'assetAmount_DESC',
  AssetAmountDescNullsLast = 'assetAmount_DESC_NULLS_LAST',
  AssetAsc = 'asset_ASC',
  AssetAscNullsFirst = 'asset_ASC_NULLS_FIRST',
  AssetDesc = 'asset_DESC',
  AssetDescNullsLast = 'asset_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ClaimedAmountAsc = 'claimedAmount_ASC',
  ClaimedAmountAscNullsFirst = 'claimedAmount_ASC_NULLS_FIRST',
  ClaimedAmountDesc = 'claimedAmount_DESC',
  ClaimedAmountDescNullsLast = 'claimedAmount_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdDesc = 'id_DESC',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PrimeEthAmountAsc = 'primeETHAmount_ASC',
  PrimeEthAmountAscNullsFirst = 'primeETHAmount_ASC_NULLS_FIRST',
  PrimeEthAmountDesc = 'primeETHAmount_DESC',
  PrimeEthAmountDescNullsLast = 'primeETHAmount_DESC_NULLS_LAST',
  SharesAmountAsc = 'sharesAmount_ASC',
  SharesAmountAscNullsFirst = 'sharesAmount_ASC_NULLS_FIRST',
  SharesAmountDesc = 'sharesAmount_DESC',
  SharesAmountDescNullsLast = 'sharesAmount_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusDesc = 'status_DESC',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  StrategyAsc = 'strategy_ASC',
  StrategyAscNullsFirst = 'strategy_ASC_NULLS_FIRST',
  StrategyDesc = 'strategy_DESC',
  StrategyDescNullsLast = 'strategy_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  WithdrawalBlockNumberAsc = 'withdrawal_blockNumber_ASC',
  WithdrawalBlockNumberAscNullsFirst = 'withdrawal_blockNumber_ASC_NULLS_FIRST',
  WithdrawalBlockNumberDesc = 'withdrawal_blockNumber_DESC',
  WithdrawalBlockNumberDescNullsLast = 'withdrawal_blockNumber_DESC_NULLS_LAST',
  WithdrawalDelegatedToAsc = 'withdrawal_delegatedTo_ASC',
  WithdrawalDelegatedToAscNullsFirst = 'withdrawal_delegatedTo_ASC_NULLS_FIRST',
  WithdrawalDelegatedToDesc = 'withdrawal_delegatedTo_DESC',
  WithdrawalDelegatedToDescNullsLast = 'withdrawal_delegatedTo_DESC_NULLS_LAST',
  WithdrawalIdAsc = 'withdrawal_id_ASC',
  WithdrawalIdAscNullsFirst = 'withdrawal_id_ASC_NULLS_FIRST',
  WithdrawalIdDesc = 'withdrawal_id_DESC',
  WithdrawalIdDescNullsLast = 'withdrawal_id_DESC_NULLS_LAST',
  WithdrawalNonceAsc = 'withdrawal_nonce_ASC',
  WithdrawalNonceAscNullsFirst = 'withdrawal_nonce_ASC_NULLS_FIRST',
  WithdrawalNonceDesc = 'withdrawal_nonce_DESC',
  WithdrawalNonceDescNullsLast = 'withdrawal_nonce_DESC_NULLS_LAST',
  WithdrawalStakerAsc = 'withdrawal_staker_ASC',
  WithdrawalStakerAscNullsFirst = 'withdrawal_staker_ASC_NULLS_FIRST',
  WithdrawalStakerDesc = 'withdrawal_staker_DESC',
  WithdrawalStakerDescNullsLast = 'withdrawal_staker_DESC_NULLS_LAST',
  WithdrawalStartBlockAsc = 'withdrawal_startBlock_ASC',
  WithdrawalStartBlockAscNullsFirst = 'withdrawal_startBlock_ASC_NULLS_FIRST',
  WithdrawalStartBlockDesc = 'withdrawal_startBlock_DESC',
  WithdrawalStartBlockDescNullsLast = 'withdrawal_startBlock_DESC_NULLS_LAST',
  WithdrawalStatusAsc = 'withdrawal_status_ASC',
  WithdrawalStatusAscNullsFirst = 'withdrawal_status_ASC_NULLS_FIRST',
  WithdrawalStatusDesc = 'withdrawal_status_DESC',
  WithdrawalStatusDescNullsLast = 'withdrawal_status_DESC_NULLS_LAST',
  WithdrawalTimestampAsc = 'withdrawal_timestamp_ASC',
  WithdrawalTimestampAscNullsFirst = 'withdrawal_timestamp_ASC_NULLS_FIRST',
  WithdrawalTimestampDesc = 'withdrawal_timestamp_DESC',
  WithdrawalTimestampDescNullsLast = 'withdrawal_timestamp_DESC_NULLS_LAST',
  WithdrawalWithdrawerAsc = 'withdrawal_withdrawer_ASC',
  WithdrawalWithdrawerAscNullsFirst = 'withdrawal_withdrawer_ASC_NULLS_FIRST',
  WithdrawalWithdrawerDesc = 'withdrawal_withdrawer_DESC',
  WithdrawalWithdrawerDescNullsLast = 'withdrawal_withdrawer_DESC_NULLS_LAST',
  WithdrawerAsc = 'withdrawer_ASC',
  WithdrawerAscNullsFirst = 'withdrawer_ASC_NULLS_FIRST',
  WithdrawerDesc = 'withdrawer_DESC',
  WithdrawerDescNullsLast = 'withdrawer_DESC_NULLS_LAST'
}

export type LrtWithdrawalRequestWhereInput = {
  AND?: InputMaybe<Array<LrtWithdrawalRequestWhereInput>>;
  OR?: InputMaybe<Array<LrtWithdrawalRequestWhereInput>>;
  assetAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  assetAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  assetAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  assetAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  claimedAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  claimedAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  claimedAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  claimedAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
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
  primeETHAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  primeETHAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  primeETHAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  primeETHAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  sharesAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sharesAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  sharesAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_eq?: InputMaybe<LrtWithdrawalStatus>;
  status_in?: InputMaybe<Array<LrtWithdrawalStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<LrtWithdrawalStatus>;
  status_not_in?: InputMaybe<Array<LrtWithdrawalStatus>>;
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
  withdrawal?: InputMaybe<LrtWithdrawalWhereInput>;
  withdrawal_isNull?: InputMaybe<Scalars['Boolean']['input']>;
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

export type LrtWithdrawalRequestsConnection = {
  __typename?: 'LRTWithdrawalRequestsConnection';
  edges: Array<LrtWithdrawalRequestEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum LrtWithdrawalStatus {
  Claimed = 'Claimed',
  Migrated = 'Migrated',
  Requested = 'Requested'
}

export type LrtWithdrawalWhereInput = {
  AND?: InputMaybe<Array<LrtWithdrawalWhereInput>>;
  OR?: InputMaybe<Array<LrtWithdrawalWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  delegatedTo_contains?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_eq?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_gt?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_gte?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatedTo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  delegatedTo_lt?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_lte?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_not_contains?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_not_eq?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  delegatedTo_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  delegatedTo_startsWith?: InputMaybe<Scalars['String']['input']>;
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
  nonce_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nonce_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  shares_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  shares_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  shares_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  shares_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staker_contains?: InputMaybe<Scalars['String']['input']>;
  staker_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  staker_endsWith?: InputMaybe<Scalars['String']['input']>;
  staker_eq?: InputMaybe<Scalars['String']['input']>;
  staker_gt?: InputMaybe<Scalars['String']['input']>;
  staker_gte?: InputMaybe<Scalars['String']['input']>;
  staker_in?: InputMaybe<Array<Scalars['String']['input']>>;
  staker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staker_lt?: InputMaybe<Scalars['String']['input']>;
  staker_lte?: InputMaybe<Scalars['String']['input']>;
  staker_not_contains?: InputMaybe<Scalars['String']['input']>;
  staker_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  staker_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  staker_not_eq?: InputMaybe<Scalars['String']['input']>;
  staker_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  staker_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  staker_startsWith?: InputMaybe<Scalars['String']['input']>;
  startBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  startBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  startBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  status_eq?: InputMaybe<LrtWithdrawalStatus>;
  status_in?: InputMaybe<Array<LrtWithdrawalStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<LrtWithdrawalStatus>;
  status_not_in?: InputMaybe<Array<LrtWithdrawalStatus>>;
  strategies_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  strategies_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  strategies_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  strategies_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
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

export type LrtWithdrawalsConnection = {
  __typename?: 'LRTWithdrawalsConnection';
  edges: Array<LrtWithdrawalEdge>;
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
  lrtBalanceData: Array<LrtBalanceData>;
  lrtBalanceDataById?: Maybe<LrtBalanceData>;
  /** @deprecated Use lrtBalanceDataById */
  lrtBalanceDataByUniqueInput?: Maybe<LrtBalanceData>;
  lrtBalanceDataConnection: LrtBalanceDataConnection;
  lrtCampaignById?: Maybe<LrtCampaign>;
  /** @deprecated Use lrtCampaignById */
  lrtCampaignByUniqueInput?: Maybe<LrtCampaign>;
  lrtCampaignHistories: Array<LrtCampaignHistory>;
  lrtCampaignHistoriesConnection: LrtCampaignHistoriesConnection;
  lrtCampaignHistoryById?: Maybe<LrtCampaignHistory>;
  /** @deprecated Use lrtCampaignHistoryById */
  lrtCampaignHistoryByUniqueInput?: Maybe<LrtCampaignHistory>;
  lrtCampaignRecipientById?: Maybe<LrtCampaignRecipient>;
  /** @deprecated Use lrtCampaignRecipientById */
  lrtCampaignRecipientByUniqueInput?: Maybe<LrtCampaignRecipient>;
  lrtCampaignRecipients: Array<LrtCampaignRecipient>;
  lrtCampaignRecipientsConnection: LrtCampaignRecipientsConnection;
  lrtCampaigns: Array<LrtCampaign>;
  lrtCampaignsConnection: LrtCampaignsConnection;
  lrtDepositById?: Maybe<LrtDeposit>;
  /** @deprecated Use lrtDepositById */
  lrtDepositByUniqueInput?: Maybe<LrtDeposit>;
  lrtDeposits: Array<LrtDeposit>;
  lrtDepositsConnection: LrtDepositsConnection;
  lrtEigenPointCalculationById?: Maybe<LrtEigenPointCalculation>;
  /** @deprecated Use lrtEigenPointCalculationById */
  lrtEigenPointCalculationByUniqueInput?: Maybe<LrtEigenPointCalculation>;
  lrtEigenPointCalculations: Array<LrtEigenPointCalculation>;
  lrtEigenPointCalculationsConnection: LrtEigenPointCalculationsConnection;
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
  lrtWithdrawalById?: Maybe<LrtWithdrawal>;
  /** @deprecated Use lrtWithdrawalById */
  lrtWithdrawalByUniqueInput?: Maybe<LrtWithdrawal>;
  lrtWithdrawalRequestById?: Maybe<LrtWithdrawalRequest>;
  /** @deprecated Use lrtWithdrawalRequestById */
  lrtWithdrawalRequestByUniqueInput?: Maybe<LrtWithdrawalRequest>;
  lrtWithdrawalRequests: Array<LrtWithdrawalRequest>;
  lrtWithdrawalRequestsConnection: LrtWithdrawalRequestsConnection;
  lrtWithdrawals: Array<LrtWithdrawal>;
  lrtWithdrawalsConnection: LrtWithdrawalsConnection;
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


export type QueryLrtCampaignByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtCampaignByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtCampaignHistoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtCampaignHistoryOrderByInput>>;
  where?: InputMaybe<LrtCampaignHistoryWhereInput>;
};


export type QueryLrtCampaignHistoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtCampaignHistoryOrderByInput>;
  where?: InputMaybe<LrtCampaignHistoryWhereInput>;
};


export type QueryLrtCampaignHistoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtCampaignHistoryByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtCampaignRecipientByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtCampaignRecipientByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtCampaignRecipientsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtCampaignRecipientOrderByInput>>;
  where?: InputMaybe<LrtCampaignRecipientWhereInput>;
};


export type QueryLrtCampaignRecipientsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtCampaignRecipientOrderByInput>;
  where?: InputMaybe<LrtCampaignRecipientWhereInput>;
};


export type QueryLrtCampaignsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtCampaignOrderByInput>>;
  where?: InputMaybe<LrtCampaignWhereInput>;
};


export type QueryLrtCampaignsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtCampaignOrderByInput>;
  where?: InputMaybe<LrtCampaignWhereInput>;
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


export type QueryLrtEigenPointCalculationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtEigenPointCalculationByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtEigenPointCalculationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtEigenPointCalculationOrderByInput>>;
  where?: InputMaybe<LrtEigenPointCalculationWhereInput>;
};


export type QueryLrtEigenPointCalculationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtEigenPointCalculationOrderByInput>;
  where?: InputMaybe<LrtEigenPointCalculationWhereInput>;
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


export type QueryLrtWithdrawalByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtWithdrawalByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtWithdrawalRequestByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLrtWithdrawalRequestByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryLrtWithdrawalRequestsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtWithdrawalRequestOrderByInput>>;
  where?: InputMaybe<LrtWithdrawalRequestWhereInput>;
};


export type QueryLrtWithdrawalRequestsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtWithdrawalRequestOrderByInput>;
  where?: InputMaybe<LrtWithdrawalRequestWhereInput>;
};


export type QueryLrtWithdrawalsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LrtWithdrawalOrderByInput>>;
  where?: InputMaybe<LrtWithdrawalWhereInput>;
};


export type QueryLrtWithdrawalsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LrtWithdrawalOrderByInput>;
  where?: InputMaybe<LrtWithdrawalWhereInput>;
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

import { useQuery, useInfiniteQuery, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { snapshotGraphqlClient } from '@origin/governance/shared';
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
  Any: { input: any; output: any; }
};

export type Alias = {
  __typename?: 'Alias';
  address: Scalars['String']['output'];
  alias: Scalars['String']['output'];
  created: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
};

export type AliasWhere = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type DelegationPortal = {
  __typename?: 'DelegationPortal';
  delegationApi: Scalars['String']['output'];
  delegationContract: Scalars['String']['output'];
  delegationType: Scalars['String']['output'];
};

export type Follow = {
  __typename?: 'Follow';
  created: Scalars['Int']['output'];
  follower: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
  space: Space;
};

export type FollowWhere = {
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  follower?: InputMaybe<Scalars['String']['input']>;
  follower_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['String']['output'];
  spacesCount?: Maybe<Scalars['Int']['output']>;
};

export type Message = {
  __typename?: 'Message';
  address?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  ipfs?: Maybe<Scalars['String']['output']>;
  mci?: Maybe<Scalars['Int']['output']>;
  receipt?: Maybe<Scalars['String']['output']>;
  sig?: Maybe<Scalars['String']['output']>;
  space?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type MessageWhere = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  mci?: InputMaybe<Scalars['Int']['input']>;
  mci_gt?: InputMaybe<Scalars['Int']['input']>;
  mci_gte?: InputMaybe<Scalars['Int']['input']>;
  mci_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  mci_lt?: InputMaybe<Scalars['Int']['input']>;
  mci_lte?: InputMaybe<Scalars['Int']['input']>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  timestamp?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Int']['input']>;
  timestamp_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  timestamp_lt?: InputMaybe<Scalars['Int']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Metrics = {
  __typename?: 'Metrics';
  categories?: Maybe<Scalars['Any']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Proposal = {
  __typename?: 'Proposal';
  app?: Maybe<Scalars['String']['output']>;
  author: Scalars['String']['output'];
  body?: Maybe<Scalars['String']['output']>;
  choices: Array<Maybe<Scalars['String']['output']>>;
  created: Scalars['Int']['output'];
  discussion: Scalars['String']['output'];
  end: Scalars['Int']['output'];
  flagged?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  network: Scalars['String']['output'];
  plugins: Scalars['Any']['output'];
  privacy?: Maybe<Scalars['String']['output']>;
  quorum: Scalars['Float']['output'];
  scores?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  scores_by_strategy?: Maybe<Scalars['Any']['output']>;
  scores_state?: Maybe<Scalars['String']['output']>;
  scores_total?: Maybe<Scalars['Float']['output']>;
  scores_updated?: Maybe<Scalars['Int']['output']>;
  snapshot?: Maybe<Scalars['String']['output']>;
  space?: Maybe<Space>;
  start: Scalars['Int']['output'];
  state?: Maybe<Scalars['String']['output']>;
  strategies: Array<Maybe<Strategy>>;
  symbol: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  updated?: Maybe<Scalars['Int']['output']>;
  validation?: Maybe<Validation>;
  votes?: Maybe<Scalars['Int']['output']>;
};

export type ProposalWhere = {
  app?: InputMaybe<Scalars['String']['input']>;
  app_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  app_not?: InputMaybe<Scalars['String']['input']>;
  app_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  author?: InputMaybe<Scalars['String']['input']>;
  author_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  end?: InputMaybe<Scalars['Int']['input']>;
  end_gt?: InputMaybe<Scalars['Int']['input']>;
  end_gte?: InputMaybe<Scalars['Int']['input']>;
  end_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  end_lt?: InputMaybe<Scalars['Int']['input']>;
  end_lte?: InputMaybe<Scalars['Int']['input']>;
  flagged?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  network?: InputMaybe<Scalars['String']['input']>;
  network_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  plugins_contains?: InputMaybe<Scalars['String']['input']>;
  scores_state?: InputMaybe<Scalars['String']['input']>;
  scores_state_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space_verified?: InputMaybe<Scalars['Boolean']['input']>;
  start?: InputMaybe<Scalars['Int']['input']>;
  start_gt?: InputMaybe<Scalars['Int']['input']>;
  start_gte?: InputMaybe<Scalars['Int']['input']>;
  start_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  start_lt?: InputMaybe<Scalars['Int']['input']>;
  start_lte?: InputMaybe<Scalars['Int']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  strategies_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  updated?: InputMaybe<Scalars['Int']['input']>;
  updated_gt?: InputMaybe<Scalars['Int']['input']>;
  updated_gte?: InputMaybe<Scalars['Int']['input']>;
  updated_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  updated_lt?: InputMaybe<Scalars['Int']['input']>;
  updated_lte?: InputMaybe<Scalars['Int']['input']>;
  validation?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  aliases?: Maybe<Array<Maybe<Alias>>>;
  follows?: Maybe<Array<Maybe<Follow>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  networks?: Maybe<Array<Maybe<Item>>>;
  plugins?: Maybe<Array<Maybe<Item>>>;
  proposal?: Maybe<Proposal>;
  proposals?: Maybe<Array<Maybe<Proposal>>>;
  ranking?: Maybe<RankingObject>;
  roles?: Maybe<Array<Maybe<Role>>>;
  skins?: Maybe<Array<Maybe<Item>>>;
  space?: Maybe<Space>;
  spaces?: Maybe<Array<Maybe<Space>>>;
  statement?: Maybe<Statement>;
  statements?: Maybe<Array<Maybe<Statement>>>;
  strategies?: Maybe<Array<Maybe<StrategyItem>>>;
  strategy?: Maybe<StrategyItem>;
  subscriptions?: Maybe<Array<Maybe<Subscription>>>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
  validations?: Maybe<Array<Maybe<Item>>>;
  vote?: Maybe<Vote>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  vp?: Maybe<Vp>;
};


export type QueryAliasesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AliasWhere>;
};


export type QueryFollowsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<FollowWhere>;
};


export type QueryMessagesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MessageWhere>;
};


export type QueryProposalArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProposalWhere>;
};


export type QueryRankingArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<RankingWhere>;
};


export type QueryRolesArgs = {
  where?: InputMaybe<RolesWhere>;
};


export type QuerySpaceArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySpacesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SpaceWhere>;
};


export type QueryStatementArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatementsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<StatementsWhere>;
};


export type QueryStrategyArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySubscriptionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<SubscriptionWhere>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUsersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<UsersWhere>;
};


export type QueryVoteArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Scalars['String']['input']>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<VoteWhere>;
};


export type QueryVpArgs = {
  proposal?: InputMaybe<Scalars['String']['input']>;
  space: Scalars['String']['input'];
  voter: Scalars['String']['input'];
};

export type RankingObject = {
  __typename?: 'RankingObject';
  items?: Maybe<Array<Maybe<Space>>>;
  metrics?: Maybe<Metrics>;
};

export type RankingWhere = {
  category?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  network?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type Role = {
  __typename?: 'Role';
  permissions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  space?: Maybe<Scalars['String']['output']>;
};

export type RolesWhere = {
  address?: InputMaybe<Scalars['String']['input']>;
};

export type Space = {
  __typename?: 'Space';
  about?: Maybe<Scalars['String']['output']>;
  activeProposals?: Maybe<Scalars['Int']['output']>;
  admins?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  avatar?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  children?: Maybe<Array<Maybe<Space>>>;
  coingecko?: Maybe<Scalars['String']['output']>;
  created: Scalars['Int']['output'];
  delegationPortal?: Maybe<DelegationPortal>;
  domain?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  filters?: Maybe<SpaceFilters>;
  flagged?: Maybe<Scalars['Boolean']['output']>;
  followersCount?: Maybe<Scalars['Int']['output']>;
  followersCount7d?: Maybe<Scalars['Int']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  guidelines?: Maybe<Scalars['String']['output']>;
  hibernated?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Scalars['String']['output']>;
  members?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  moderators?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  name?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Space>;
  plugins?: Maybe<Scalars['Any']['output']>;
  private?: Maybe<Scalars['Boolean']['output']>;
  proposalsCount?: Maybe<Scalars['Int']['output']>;
  proposalsCount7d?: Maybe<Scalars['Int']['output']>;
  rank?: Maybe<Scalars['Float']['output']>;
  skin?: Maybe<Scalars['String']['output']>;
  strategies?: Maybe<Array<Maybe<Strategy>>>;
  symbol?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
  terms?: Maybe<Scalars['String']['output']>;
  treasuries?: Maybe<Array<Maybe<Treasury>>>;
  turbo?: Maybe<Scalars['Boolean']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  validation?: Maybe<Validation>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  voteValidation?: Maybe<Validation>;
  votesCount?: Maybe<Scalars['Int']['output']>;
  votesCount7d?: Maybe<Scalars['Int']['output']>;
  voting?: Maybe<SpaceVoting>;
  website?: Maybe<Scalars['String']['output']>;
};

export type SpaceFilters = {
  __typename?: 'SpaceFilters';
  minScore?: Maybe<Scalars['Float']['output']>;
  onlyMembers?: Maybe<Scalars['Boolean']['output']>;
};

export type SpaceVoting = {
  __typename?: 'SpaceVoting';
  aliased?: Maybe<Scalars['Boolean']['output']>;
  blind?: Maybe<Scalars['Boolean']['output']>;
  delay?: Maybe<Scalars['Int']['output']>;
  hideAbstain?: Maybe<Scalars['Boolean']['output']>;
  period?: Maybe<Scalars['Int']['output']>;
  privacy?: Maybe<Scalars['String']['output']>;
  quorum?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SpaceWhere = {
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Statement = {
  __typename?: 'Statement';
  about?: Maybe<Scalars['String']['output']>;
  created: Scalars['Int']['output'];
  delegate?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  ipfs: Scalars['String']['output'];
  space: Scalars['String']['output'];
  statement?: Maybe<Scalars['String']['output']>;
  updated: Scalars['Int']['output'];
};

export type StatementsWhere = {
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  delegate?: InputMaybe<Scalars['String']['input']>;
  delegate_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Strategy = {
  __typename?: 'Strategy';
  name: Scalars['String']['output'];
  network?: Maybe<Scalars['String']['output']>;
  params?: Maybe<Scalars['Any']['output']>;
};

export type StrategyItem = {
  __typename?: 'StrategyItem';
  about?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  examples?: Maybe<Array<Maybe<Scalars['Any']['output']>>>;
  id: Scalars['String']['output'];
  schema?: Maybe<Scalars['Any']['output']>;
  spacesCount?: Maybe<Scalars['Int']['output']>;
  version?: Maybe<Scalars['String']['output']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  address: Scalars['String']['output'];
  created: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
  space: Space;
};

export type SubscriptionWhere = {
  address?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Treasury = {
  __typename?: 'Treasury';
  address?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  about?: Maybe<Scalars['String']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  created: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type UsersWhere = {
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Validation = {
  __typename?: 'Validation';
  name: Scalars['String']['output'];
  params?: Maybe<Scalars['Any']['output']>;
};

export type Vote = {
  __typename?: 'Vote';
  app?: Maybe<Scalars['String']['output']>;
  choice: Scalars['Any']['output'];
  created: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ipfs?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['Any']['output']>;
  proposal?: Maybe<Proposal>;
  reason?: Maybe<Scalars['String']['output']>;
  space: Space;
  voter: Scalars['String']['output'];
  vp?: Maybe<Scalars['Float']['output']>;
  vp_by_strategy?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  vp_state?: Maybe<Scalars['String']['output']>;
};

export type VoteWhere = {
  app?: InputMaybe<Scalars['String']['input']>;
  app_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  app_not?: InputMaybe<Scalars['String']['input']>;
  app_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  created?: InputMaybe<Scalars['Int']['input']>;
  created_gt?: InputMaybe<Scalars['Int']['input']>;
  created_gte?: InputMaybe<Scalars['Int']['input']>;
  created_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  created_lt?: InputMaybe<Scalars['Int']['input']>;
  created_lte?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ipfs?: InputMaybe<Scalars['String']['input']>;
  ipfs_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reason_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reason_not?: InputMaybe<Scalars['String']['input']>;
  reason_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  space?: InputMaybe<Scalars['String']['input']>;
  space_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  voter?: InputMaybe<Scalars['String']['input']>;
  voter_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  vp?: InputMaybe<Scalars['Float']['input']>;
  vp_gt?: InputMaybe<Scalars['Float']['input']>;
  vp_gte?: InputMaybe<Scalars['Float']['input']>;
  vp_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  vp_lt?: InputMaybe<Scalars['Float']['input']>;
  vp_lte?: InputMaybe<Scalars['Float']['input']>;
  vp_state?: InputMaybe<Scalars['String']['input']>;
  vp_state_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Vp = {
  __typename?: 'Vp';
  vp?: Maybe<Scalars['Float']['output']>;
  vp_by_strategy?: Maybe<Array<Maybe<Scalars['Float']['output']>>>;
  vp_state?: Maybe<Scalars['String']['output']>;
};

export type SnapshotProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type SnapshotProposalsQuery = { __typename?: 'Query', proposals?: Array<{ __typename?: 'Proposal', id: string, title: string, choices: Array<string | null>, scores?: Array<number | null> | null, state?: string | null, start: number, end: number, link?: string | null, quorum: number, created: number, updated?: number | null } | null> | null };

export type SnapshotUserVotesQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type SnapshotUserVotesQuery = { __typename?: 'Query', votes?: Array<{ __typename?: 'Vote', id: string, created: number, choice: any, proposal?: { __typename?: 'Proposal', id: string, title: string, state?: string | null, link?: string | null, choices: Array<string | null> } | null } | null> | null };


export const SnapshotProposalsDocument = `
    query SnapshotProposals {
  proposals(
    orderBy: "created"
    orderDirection: desc
    where: {space_in: "ousdgov.eth"}
  ) {
    id
    title
    choices
    scores
    state
    start
    end
    link
    quorum
    created
    updated
  }
}
    `;
export const useSnapshotProposalsQuery = <
      TData = SnapshotProposalsQuery,
      TError = unknown
    >(
      variables?: SnapshotProposalsQueryVariables,
      options?: UseQueryOptions<SnapshotProposalsQuery, TError, TData>
    ) =>
    useQuery<SnapshotProposalsQuery, TError, TData>(
      variables === undefined ? ['SnapshotProposals'] : ['SnapshotProposals', variables],
      snapshotGraphqlClient<SnapshotProposalsQuery, SnapshotProposalsQueryVariables>(SnapshotProposalsDocument, variables),
      options
    );

useSnapshotProposalsQuery.getKey = (variables?: SnapshotProposalsQueryVariables) => variables === undefined ? ['SnapshotProposals'] : ['SnapshotProposals', variables];
;

export const useInfiniteSnapshotProposalsQuery = <
      TData = SnapshotProposalsQuery,
      TError = unknown
    >(
      variables?: SnapshotProposalsQueryVariables,
      options?: UseInfiniteQueryOptions<SnapshotProposalsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<SnapshotProposalsQuery, TError, TData>(
      variables === undefined ? ['SnapshotProposals.infinite'] : ['SnapshotProposals.infinite', variables],
      (metaData) => snapshotGraphqlClient<SnapshotProposalsQuery, SnapshotProposalsQueryVariables>(SnapshotProposalsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteSnapshotProposalsQuery.getKey = (variables?: SnapshotProposalsQueryVariables) => variables === undefined ? ['SnapshotProposals.infinite'] : ['SnapshotProposals.infinite', variables];
;

useSnapshotProposalsQuery.fetcher = (variables?: SnapshotProposalsQueryVariables, options?: RequestInit['headers']) => snapshotGraphqlClient<SnapshotProposalsQuery, SnapshotProposalsQueryVariables>(SnapshotProposalsDocument, variables, options);
export const SnapshotUserVotesDocument = `
    query SnapshotUserVotes($address: String!) {
  votes(
    orderBy: "created"
    orderDirection: desc
    where: {space_in: "ousdgov.eth", voter: $address}
  ) {
    id
    created
    choice
    proposal {
      id
      title
      state
      link
      choices
    }
  }
}
    `;
export const useSnapshotUserVotesQuery = <
      TData = SnapshotUserVotesQuery,
      TError = unknown
    >(
      variables: SnapshotUserVotesQueryVariables,
      options?: UseQueryOptions<SnapshotUserVotesQuery, TError, TData>
    ) =>
    useQuery<SnapshotUserVotesQuery, TError, TData>(
      ['SnapshotUserVotes', variables],
      snapshotGraphqlClient<SnapshotUserVotesQuery, SnapshotUserVotesQueryVariables>(SnapshotUserVotesDocument, variables),
      options
    );

useSnapshotUserVotesQuery.getKey = (variables: SnapshotUserVotesQueryVariables) => ['SnapshotUserVotes', variables];
;

export const useInfiniteSnapshotUserVotesQuery = <
      TData = SnapshotUserVotesQuery,
      TError = unknown
    >(
      variables: SnapshotUserVotesQueryVariables,
      options?: UseInfiniteQueryOptions<SnapshotUserVotesQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<SnapshotUserVotesQuery, TError, TData>(
      ['SnapshotUserVotes.infinite', variables],
      (metaData) => snapshotGraphqlClient<SnapshotUserVotesQuery, SnapshotUserVotesQueryVariables>(SnapshotUserVotesDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};


useInfiniteSnapshotUserVotesQuery.getKey = (variables: SnapshotUserVotesQueryVariables) => ['SnapshotUserVotes.infinite', variables];
;

useSnapshotUserVotesQuery.fetcher = (variables: SnapshotUserVotesQueryVariables, options?: RequestInit['headers']) => snapshotGraphqlClient<SnapshotUserVotesQuery, SnapshotUserVotesQueryVariables>(SnapshotUserVotesDocument, variables, options);
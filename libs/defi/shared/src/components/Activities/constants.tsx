import {
  BadgeIcon,
  SwapTokensIcon,
  TokenIcon,
  TransferIcon,
} from '@origin/shared/components';
import { getTokenById } from '@origin/shared/contracts';
import {
  FaArrowDownRegular,
  FaArrowRightRegular,
  FaArrowUpRegular,
  FaCircleCheckRegular,
} from '@origin/shared/icons';
import { format } from 'dnum';

import { wagmiConfig } from '../../clients';

import type { ReactNode } from 'react';
import type { IntlShape } from 'react-intl';

import type {
  Activity,
  ActivityType,
  ApprovalActivity,
  BridgeActivity,
  ClaimRewardsActivity,
  DelegateVoteActivity,
  ExtendStakeActivity,
  MigrateActivity,
  RebasingActivity,
  RedeemActivity,
  StakeActivity,
  SwapActivity,
  UnstakeActivity,
  VoteActivity,
} from './types';

export type ActivityOption = {
  title: (activity: Activity, intl: IntlShape) => string;
  subtitle: (activity: Activity, intl: IntlShape) => string;
  icon: (activity: Activity) => ReactNode;
  endIcon?: (activity: Activity) => ReactNode;
};

export const activityOptions: Record<ActivityType, ActivityOption> = {
  approval: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Approving' }),
        signed: intl.formatMessage({ defaultMessage: 'Approving' }),
        success: intl.formatMessage({ defaultMessage: 'Approved' }),
        error: intl.formatMessage({
          defaultMessage: 'Error while approving',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Approve' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn } = activity as ApprovalActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([amountIn ?? 0n, tokenIn?.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage: '{amount} {symbol}',
        },
        {
          amount,
          symbolIn: tokenIn?.symbol,
        },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as ApprovalActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaCircleCheckRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
  },
  bridge: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Bridging' }),
        signed: intl.formatMessage({ defaultMessage: 'Bridging' }),
        success: intl.formatMessage({ defaultMessage: 'Bridge Started' }),
        error: intl.formatMessage({ defaultMessage: 'Error while bridging' }),
        idle: intl.formatMessage({ defaultMessage: 'Bridge' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn, tokenIdOut } = activity as BridgeActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);
      const chainOut = wagmiConfig.chains.find(
        (c) => c.id === tokenOut.chainId,
      )?.name;
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);

      return tokenIn.symbol === tokenOut.symbol
        ? intl.formatMessage(
            {
              defaultMessage: 'Sending {amount} {symbolIn} to {chainOut}.',
            },
            { amount, symbolIn: tokenIn.symbol, chainOut },
          )
        : intl.formatMessage(
            {
              defaultMessage:
                'Sending {amount} {symbolIn} as {symbolOut} to {chainOut}.',
            },
            {
              amount,
              symbolIn: tokenIn.symbol,
              symbolOut: tokenOut.symbol,
              chainOut,
            },
          );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as BridgeActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowUpRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
    endIcon: (activity) => {
      const { tokenIdIn, tokenIdOut } = activity as BridgeActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);

      return <TransferIcon tokenIn={tokenIn} tokenOut={tokenOut} />;
    },
  },
  'claim-rewards': {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Claiming Rewards' }),
        signed: intl.formatMessage({ defaultMessage: 'Claiming Rewards' }),
        success: intl.formatMessage({ defaultMessage: 'Claimed Rewards' }),
        error: intl.formatMessage({
          defaultMessage: 'Error while claiming rewards',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Claim Rewards' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn } = activity as ClaimRewardsActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage: 'Collect {amount} rewards',
        },
        { amount },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as ClaimRewardsActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowDownRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
  },
  delegate: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({
          defaultMessage: 'Delegating Voting Power',
        }),
        signed: intl.formatMessage({
          defaultMessage: 'Delegating Voting Power',
        }),
        success: intl.formatMessage({
          defaultMessage: 'Voting Power Delegated',
        }),
        error: intl.formatMessage({
          defaultMessage: 'Error while delegating',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Delegate Voting Power' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { votingPower, delegateTo, tokenIdIn } =
        activity as DelegateVoteActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([votingPower ?? 0n, tokenIn.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage: 'Delegate {votingPower} {symbolIn} to {delegateTo}',
        },
        { amount, symbolIn: tokenIn.symbol, delegateTo },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as ClaimRewardsActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />;
    },
  },
  'extend-stake': {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Extending Stake' }),
        signed: intl.formatMessage({ defaultMessage: 'Extending Stake' }),
        success: intl.formatMessage({ defaultMessage: 'Extended Stake' }),
        error: intl.formatMessage({
          defaultMessage: 'Error while extending staking',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Extend Stake' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn, lockupId, monthDuration } =
        activity as ExtendStakeActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage:
            'Extend lockup {lockupId} by {amount} {symbolIn} for {monthDuration,plural,=1{# month} other{# months}}',
        },
        { lockupId, amount, symbolIn: tokenIn.symbol, monthDuration },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as ExtendStakeActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowRightRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
  },
  migrate: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Migrating' }),
        signed: intl.formatMessage({ defaultMessage: 'Migrating' }),
        success: intl.formatMessage({ defaultMessage: 'Migrated' }),
        error: intl.formatMessage({ defaultMessage: 'Error while migrating' }),
        idle: intl.formatMessage({ defaultMessage: 'Migrate' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const {
        amountIn,
        tokenIdIn,
        liquid,
        tokenIdLiquid,
        staked,
        tokenIdStaked,
      } = activity as MigrateActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenLiquid = getTokenById(tokenIdLiquid);
      const tokenStaked = getTokenById(tokenIdStaked);
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);
      const amountStaked = format(
        [staked ?? 0n, tokenStaked.decimals ?? 18],
        4,
      );
      const amountLiquid = format(
        [liquid ?? 0n, tokenLiquid.decimals ?? 18],
        4,
      );

      if (staked === 0n) {
        return intl.formatMessage(
          {
            defaultMessage:
              '{amount} {symbolIn} for {amountLiquid} {symbolLiquid}',
          },
          {
            amount,
            symbolIn: tokenIn.symbol,
            amountLiquid,
            symbolLiquid: tokenLiquid.symbol,
          },
        );
      }

      if (liquid === 0n) {
        return intl.formatMessage(
          {
            defaultMessage:
              '{amount} {symbolIn}, staked for {amountStaked} {symbolStaked}',
          },
          {
            amount,
            symbolIn: tokenIn.symbol,
            amountStaked,
            symbolStaked: tokenStaked.symbol,
          },
        );
      }

      return intl.formatMessage(
        {
          defaultMessage:
            '{amount} {symbolIn} for {amountLiquid} {symbolLiquid}, staked for {amountStaked} {symbolStaked}',
        },
        {
          amount,
          symbolIn: tokenIn.symbol,
          amountLiquid,
          symbolLiquid: tokenLiquid.symbol,
          amountStaked,
          symbolStaked: tokenStaked.symbol,
        },
      );
    },
    icon: (activity) => {
      const { tokenIdIn, tokenIdLiquid } = activity as MigrateActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdLiquid);

      return <SwapTokensIcon tokenIn={tokenIn} tokenOut={tokenOut} size={40} />;
    },
    endIcon: (activity) => {
      const { tokenIdIn, tokenIdLiquid } = activity as MigrateActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdLiquid);

      return <TransferIcon tokenIn={tokenIn} tokenOut={tokenOut} />;
    },
  },
  rebasing: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Enabling rebasing' }),
        signed: intl.formatMessage({ defaultMessage: 'Enabling rebasing' }),
        success: intl.formatMessage({ defaultMessage: 'Rebase enabled' }),
        error: intl.formatMessage({
          defaultMessage: 'Error while enabling rebasing',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Enable rebasing' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { tokenIdIn } = activity as RebasingActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return intl.formatMessage(
        {
          defaultMessage: '{symbolIn} on contract',
        },
        { symbolIn: tokenIn.symbol },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as RebasingActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return <TokenIcon token={tokenIn} />;
    },
  },
  redeem: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Redeeming' }),
        signed: intl.formatMessage({ defaultMessage: 'Redeeming' }),
        success: intl.formatMessage({ defaultMessage: 'Redeemed' }),
        error: intl.formatMessage({ defaultMessage: 'Error while redeeming' }),
        idle: intl.formatMessage({ defaultMessage: 'Redeem' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn } = activity as RedeemActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);

      return intl.formatMessage(
        { defaultMessage: '{amount} {symbolIn}' },
        { amount, symbolIn: tokenIn.symbol },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as RedeemActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowDownRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
  },
  stake: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Staking' }),
        signed: intl.formatMessage({ defaultMessage: 'Staking' }),
        success: intl.formatMessage({ defaultMessage: 'Staked' }),
        error: intl.formatMessage({ defaultMessage: 'Error while staking' }),
        idle: intl.formatMessage({ defaultMessage: 'Stake' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, tokenIdIn, monthDuration } = activity as StakeActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const amount = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage:
            'Lock {amount} {symbolIn} for {monthDuration,plural,=1{# month} other{# months}}',
        },
        { amount, symbolIn: tokenIn.symbol, monthDuration },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as StakeActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowUpRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
  },
  swap: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Swapping' }),
        signed: intl.formatMessage({ defaultMessage: 'Swapping' }),
        success: intl.formatMessage({ defaultMessage: 'Swapped' }),
        error: intl.formatMessage({ defaultMessage: 'Error while swapping' }),
        idle: intl.formatMessage({ defaultMessage: 'Swap' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { amountIn, amountOut, tokenIdIn, tokenIdOut } =
        activity as SwapActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);
      const amtIn = format([amountIn ?? 0n, tokenIn.decimals ?? 18], 4);
      const amtOut = format([amountOut ?? 0n, tokenOut.decimals ?? 18], 4);

      return intl.formatMessage(
        {
          defaultMessage: '{amtIn} {symbolIn} for {amtOut} {symbolOut}',
        },
        { amtIn, symbolIn: tokenIn.symbol, amtOut, symbolOut: tokenOut.symbol },
      );
    },
    icon: (activity) => {
      const { tokenIdIn, tokenIdOut } = activity as SwapActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);

      return <SwapTokensIcon tokenIn={tokenIn} tokenOut={tokenOut} size={40} />;
    },
    endIcon: (activity) => {
      const { tokenIdIn, tokenIdOut } = activity as SwapActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);

      return <TransferIcon tokenIn={tokenIn} tokenOut={tokenOut} />;
    },
  },
  unstake: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Unlocking' }),
        signed: intl.formatMessage({ defaultMessage: 'Unlocking' }),
        success: intl.formatMessage({ defaultMessage: 'Unlocked' }),
        error: intl.formatMessage({ defaultMessage: 'Error while unlocking' }),
        idle: intl.formatMessage({ defaultMessage: 'Unlock' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { lockupId } = activity as UnstakeActivity;

      return intl.formatMessage(
        {
          defaultMessage: 'Unstake lockup {lockupId}',
        },
        { lockupId },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as UnstakeActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return (
        <BadgeIcon
          badgeContent={
            <FaArrowDownRegular
              sx={{ fontSize: 10, color: 'primary.contrastText' }}
            />
          }
          badgeBkgColor="primary.main"
        >
          <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />
        </BadgeIcon>
      );
    },
    endIcon: (activity) => {
      const { tokenIdIn, tokenIdOut } = activity as UnstakeActivity;
      const tokenIn = getTokenById(tokenIdIn);
      const tokenOut = getTokenById(tokenIdOut);

      return <TransferIcon tokenIn={tokenIn} tokenOut={tokenOut} />;
    },
  },
  vote: {
    title: (activity, intl) =>
      ({
        pending: intl.formatMessage({ defaultMessage: 'Casting vote' }),
        signed: intl.formatMessage({ defaultMessage: 'Casting vote' }),
        success: intl.formatMessage({ defaultMessage: 'Casted vote' }),
        error: intl.formatMessage({
          defaultMessage: 'Error while casting vote',
        }),
        idle: intl.formatMessage({ defaultMessage: 'Cast vote' }),
      })[activity.status],
    subtitle: (activity, intl) => {
      const { choice, proposalId } = activity as VoteActivity;

      return intl.formatMessage(
        {
          defaultMessage: 'Vote {choice} on proposal {proposalId}',
        },
        { choice, proposalId },
      );
    },
    icon: (activity) => {
      const { tokenIdIn } = activity as VoteActivity;
      const tokenIn = getTokenById(tokenIdIn);

      return <TokenIcon token={tokenIn} sx={{ fontSize: 36 }} />;
    },
  },
};

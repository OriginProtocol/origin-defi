/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Card,
  CardHeader,
  Divider,
  LinearProgress,
  Stack,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { OgvProposalState, useTxButton } from '@origin/defi/shared';
import { LoadingLabel, TooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { TxButton, useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import {
  governanceChoices,
  governanceSupport,
  governanceTokens,
} from '../constants';
import { useProposal } from '../hooks';
import { useProposalQuery, useUserInfoQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';

export const CurrentResultsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { proposalId } = useParams();
  const { data: user } = useUserInfoQuery(
    {
      address: address ?? ZERO_ADDRESS,
    },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId: proposalId ?? '',
    },
    { enabled: !!proposalId },
  );

  const hasVoted =
    (proposal?.ogvProposalVotes?.filter((v) => v.voter.id === address)
      ?.length ?? 0) > 0;
  const isProposalActive =
    proposal?.ogvProposalById?.status === OgvProposalState.Active;
  const totalVotes =
    proposal?.ogvProposalById?.scores.reduce?.(
      (acc, curr) =>
        acc + +formatUnits(BigInt(curr ?? 0), tokens.mainnet.veOGV.decimals),
      1,
    ) ?? 1;
  const isVotingEnabled =
    isConnected &&
    !hasVoted &&
    isProposalActive &&
    BigInt(user?.votingPower ?? 0) > 0n;

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Current results' })}
      />
      <Divider />
      <Box>
        <Grid2 container>
          {governanceChoices.map((choice, i) => {
            const idx =
              proposal?.ogvProposalById?.choices?.findIndex(
                (c) => c!.toLowerCase() === choice.toLowerCase(),
              ) ?? -1;
            const score =
              idx > -1
                ? +formatUnits(
                    BigInt(proposal?.ogvProposalById?.scores?.at(idx) ?? 0),
                    tokens.mainnet.OGV.decimals,
                  )
                : 0;

            return (
              <Grid2 key={choice} xs={12} sm={12 / governanceChoices.length}>
                <VoteCard
                  choice={choice}
                  score={score}
                  totalVotes={totalVotes}
                  isLoading={isProposalLoading}
                  isVotingEnabled={isVotingEnabled}
                  sx={{
                    ...(i > 0 && {
                      borderLeft: (theme) =>
                        `1px solid ${theme.palette.divider}`,
                    }),
                  }}
                />
              </Grid2>
            );
          })}
        </Grid2>
      </Box>
    </Card>
  );
};

type VoteCardProps = {
  choice: string;
  score: number;
  isVotingEnabled: boolean;
  totalVotes: number;
  isLoading: boolean;
} & StackProps;

function VoteCard({
  choice,
  score,
  isVotingEnabled,
  totalVotes,
  isLoading,
  ...rest
}: VoteCardProps) {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const queryClient = useQueryClient();
  const { data: propal, isLoading: isPropalLoading } = useProposal(proposalId);
  const { params, callbacks } = useTxButton({
    params: {
      contract: contracts.mainnet.OUSDGovernance,
      functionName: 'castVote',
      args: [BigInt(proposalId ?? ZERO_ADDRESS), governanceSupport[choice]],
    },
    activity: {
      type: 'vote',
      status: 'idle',
      tokenIdIn: tokens.mainnet.xOGN.id,
      choice,
      proposalId: proposalId as string,
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const token = governanceTokens[propal?.type ?? 'onchain_ogv'];
  const label = {
    For: intl.formatMessage({ defaultMessage: 'Vote for' }),
    Against: intl.formatMessage({ defaultMessage: 'Vote against' }),
    Abstain: intl.formatMessage({ defaultMessage: 'Abstain' }),
  }[choice];

  return (
    <Stack p={3} spacing={1} {...rest}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <TooltipLabel color="text.secondary" noWrap>
          {choice}
        </TooltipLabel>
        <LoadingLabel isLoading={isLoading || isPropalLoading}>
          {intl.formatMessage(
            { defaultMessage: '{score} {symbol}' },
            { score: formatAmount(score), symbol: token?.symbol },
          )}
        </LoadingLabel>
      </Stack>
      <LinearProgress
        value={(score / totalVotes) * 100}
        variant={'determinate'}
        sx={{
          borderRadius: 1,
          backgroundColor: 'divider',
          '.MuiLinearProgress-bar': {
            backgroundColor: (theme) =>
              isLoading
                ? theme.palette.divider
                : choice === 'For'
                  ? theme.palette.success.main
                  : choice === 'Against'
                    ? theme.palette.error.main
                    : choice === 'Abstain'
                      ? theme.palette.warning.main
                      : theme.palette.primary.main,
          },
        }}
      />
      {isVotingEnabled && (
        <Stack pt={2} alignItems="flex-start">
          <TxButton
            params={params}
            callbacks={callbacks}
            fullWidth
            color="primary"
            label={label}
          />
        </Stack>
      )}
    </Stack>
  );
}

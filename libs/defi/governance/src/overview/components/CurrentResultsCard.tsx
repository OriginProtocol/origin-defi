/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid2,
  LinearProgress,
  Stack,
  useTheme,
} from '@mui/material';
import { GovernanceProposalState, useTxButton } from '@origin/defi/shared';
import { LoadingLabel, TooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { TxButton, useFormat } from '@origin/shared/providers';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { governanceChoices, governanceSupport } from '../constants';
import { useProposal } from '../hooks';
import {
  useProposalVotesQuery,
  useUserVotingPowerQuery,
} from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';
import type { Contract } from '@origin/shared/contracts';

import type { Proposal } from '../types';

export const CurrentResultsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposal(
    proposalId,
    { enabled: !!proposalId },
  );
  const { data: proposalVotes, isLoading: isProposalVotesLoading } =
    useProposalVotesQuery(
      { proposalId: proposalId?.toLowerCase() ?? '' },
      { enabled: !!proposalId, select: (data) => data.governanceProposalVotes },
    );
  const { data: userVotingPower, isLoading: isUserVotingPowerLoading } =
    useUserVotingPowerQuery(
      { address: address?.toLowerCase() ?? '' },
      { enabled: isConnected, select: (data) => data?.esAccounts?.[0] },
    );

  const hasVoted =
    (proposalVotes?.filter((v) => v.voter === address)?.length ?? 0) > 0;
  const isProposalActive = proposal?.status === GovernanceProposalState.Active;
  const totalVotes =
    proposal?.scores?.reduce?.((acc, curr) => acc + curr, 1) ?? 1;
  const isVotingEnabled =
    isConnected &&
    !isProposalLoading &&
    !isProposalVotesLoading &&
    !isUserVotingPowerLoading &&
    !hasVoted &&
    isProposalActive &&
    BigInt(userVotingPower?.votingPower ?? 0) > 0n;

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
              proposal?.choices?.findIndex(
                (c) => c!.toLowerCase() === choice.toLowerCase(),
              ) ?? -1;
            const score = idx > -1 ? (proposal?.scores?.at?.(idx) ?? 0) : 0;

            return (
              <Grid2
                key={choice}
                size={{
                  xs: 12,
                  sm: 12 / governanceChoices.length,
                }}
              >
                <VoteCard
                  proposal={proposal}
                  choice={choice}
                  score={score}
                  totalVotes={totalVotes}
                  isLoading={isProposalLoading}
                  isVotingEnabled={isVotingEnabled}
                  sx={[
                    i > 0 &&
                      ((theme) => ({
                        borderLeft: `1px solid ${theme.palette.divider}`,
                      })),
                  ]}
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
  proposal?: Proposal;
  choice: string;
  score: number;
  isVotingEnabled: boolean;
  totalVotes: number;
  isLoading: boolean;
} & StackProps;

function VoteCard({
  proposal,
  choice,
  score,
  isVotingEnabled,
  totalVotes,
  isLoading,
  ...rest
}: VoteCardProps) {
  const intl = useIntl();
  const theme = useTheme();
  const { formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { params, callbacks } = useTxButton({
    params: {
      contract:
        proposal?.type === 'onchain'
          ? (contracts.mainnet.xOGNGovernance as Contract)
          : (contracts.mainnet.OUSDGovernance as Contract),
      functionName: 'castVote',
      args: [proposal?.proposalId ?? 0n, governanceSupport[choice]],
    },
    activity: {
      type: 'vote',
      status: 'idle',
      tokenIdIn: tokens.mainnet.xOGN.id,
      choice,
      proposalId: proposal?.id as string,
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  });

  const label = {
    For: intl.formatMessage({ defaultMessage: 'Vote for' }),
    Against: intl.formatMessage({ defaultMessage: 'Vote against' }),
    Abstain: intl.formatMessage({ defaultMessage: 'Abstain' }),
  }[choice];

  const progressColor =
    {
      For: theme.palette.success.main,
      Against: theme.palette.error.main,
      Abstain: theme.palette.warning.main,
    }[choice] ?? theme.palette.primary.main;

  return (
    <Stack
      spacing={1}
      {...rest}
      sx={[
        {
          p: 3,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <TooltipLabel color="text.secondary" noWrap>
          {choice}
        </TooltipLabel>
        <LoadingLabel isLoading={isLoading || !proposal}>
          {intl.formatMessage(
            { defaultMessage: '{score} {symbol}' },
            { score: formatAmount(score), symbol: proposal?.token?.symbol },
          )}
        </LoadingLabel>
      </Stack>
      <LinearProgress
        value={(score / totalVotes) * 100}
        variant={'determinate'}
        sx={[
          {
            borderRadius: 1,
            backgroundColor: 'divider',
          },
          isLoading
            ? {
                '.MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.divider,
                },
              }
            : {
                '.MuiLinearProgress-bar': {
                  backgroundColor: progressColor,
                },
              },
        ]}
      />
      {isVotingEnabled && (
        <Stack
          sx={{
            pt: 2,
            alignItems: 'flex-start',
          }}
        >
          <TxButton
            params={params}
            callbacks={callbacks}
            fullWidth
            color="primary"
            label={label}
            disabled={!proposal?.id}
          />
        </Stack>
      )}
    </Stack>
  );
}

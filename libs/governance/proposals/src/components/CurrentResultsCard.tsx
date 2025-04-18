/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Card,
  CardHeader,
  Grid,
  LinearProgress,
  Stack,
  useTheme,
} from '@mui/material';
import { OgvProposalState, useUserInfoQuery } from '@origin/governance/shared';
import { LoadingLabel, TooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { TransactionButton, useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { governanceChoices, governanceSupport } from '../constants';
import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';

export const CurrentResultsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { proposalId } = useParams();
  const { data: user } = useUserInfoQuery(
    {
      address: address?.toLowerCase() ?? ZERO_ADDRESS,
    },
    { enabled: !!address, select: (data) => data?.ogvAddresses?.at?.(0) },
  );
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId: proposalId?.toLowerCase() ?? '',
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
      <Box>
        <Grid container>
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
              <Grid
                key={choice}
                size={{
                  xs: 12,
                  sm: 12 / governanceChoices.length,
                }}
              >
                <VoteCard
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
              </Grid>
            );
          })}
        </Grid>
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
  const theme = useTheme();
  const { formatAmount } = useFormat();
  const { proposalId } = useParams();
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const label = {
    For: intl.formatMessage({ defaultMessage: 'Vote for' }),
    Against: intl.formatMessage({ defaultMessage: 'Vote against' }),
    Abstain: intl.formatMessage({ defaultMessage: 'Abstain' }),
  }[choice];
  const color = {
    For: 'success' as const,
    Against: 'error' as const,
    Abstain: 'warning' as const,
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
        <LoadingLabel isLoading={isLoading}>
          {formatAmount(score)}&nbsp;{tokens.mainnet.veOGV.symbol}
        </LoadingLabel>
      </Stack>
      <LinearProgress
        value={(score / totalVotes) * 100}
        variant={'determinate'}
        sx={[
          {
            borderRadius: 1,
            backgroundColor: 'grey.600',
          },
          isLoading
            ? {
                '.MuiLinearProgress-bar': {
                  backgroundColor: theme.palette.grey[800],
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
          <TransactionButton
            contract={contracts.mainnet.OUSDGovernance}
            functionName="castVote"
            args={[proposalId, governanceSupport[choice]]}
            variant="outlined"
            color={color}
            label={label}
            notificationTitle={intl.formatMessage({
              defaultMessage: 'Cast vote',
            })}
            notificationSubtitle={intl.formatMessage(
              {
                defaultMessage: 'Vote {choice} on proposal {proposalId}',
              },
              {
                choice,
                proposalId,
              },
            )}
            onSuccess={() => {
              queryClient.invalidateQueries({
                queryKey: [
                  useProposalQuery.getKey({
                    proposalId: proposalId?.toLowerCase() ?? '',
                  }),
                ],
              });
              queryClient.invalidateQueries({
                queryKey: [
                  useUserInfoQuery.getKey({
                    address: address?.toLowerCase() ?? ZERO_ADDRESS,
                  }),
                ],
              });
            }}
          />
        </Stack>
      )}
    </Stack>
  );
}

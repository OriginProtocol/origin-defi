/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Card, CardHeader, Divider } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { OgvProposalState } from '@origin/defi/shared';
import { tokens } from '@origin/shared/contracts';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { governanceChoices } from '../constants';
import { useProposalQuery, useUserInfoQuery } from '../queries.generated';
import { VoteCard } from './VoteCard';

import type { CardProps } from '@mui/material';

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

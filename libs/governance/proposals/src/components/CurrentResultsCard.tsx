import { Card, CardHeader, LinearProgress, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { LoadingLabel, TooltipLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ConnectedButton, useFormat } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { governanceChoices } from '../constants';
import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';

export const CurrentResultsCard = (props: CardProps) => {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposalQuery(
    {
      proposalId,
    },
    { enabled: !isNilOrEmpty(proposalId) },
  );

  const totalVotes =
    proposal?.ogvProposalById?.scores?.reduce((acc, curr) => acc + curr, 1) ??
    1;

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Current results' })}
      />
      <Grid2 container>
        {governanceChoices.map((choice, i) => {
          const idx =
            proposal?.ogvProposalById?.choices?.findIndex(
              (c) => c.toLowerCase() === choice.toLowerCase(),
            ) ?? -1;
          const score =
            idx > -1 ? proposal?.ogvProposalById?.scores?.at(idx) ?? 0 : 0;

          return (
            <Grid2 key={choice} xs={12} sm={4}>
              <VoteCard
                choice={choice}
                score={score}
                totalVotes={totalVotes}
                isLoading={isProposalLoading}
                sx={{
                  ...(i > 0 && {
                    borderLeft: (theme) => `1px solid ${theme.palette.divider}`,
                  }),
                }}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </Card>
  );
};

type VoteCardProps = {
  choice: string;
  score: number;
  totalVotes: number;
  isLoading: boolean;
} & StackProps;

function VoteCard({
  choice,
  score,
  totalVotes,
  isLoading,
  ...rest
}: VoteCardProps) {
  const intl = useIntl();
  const { formatAmount } = useFormat();

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
        <LoadingLabel isLoading={isLoading}>
          {formatAmount(score)}&nbsp;{tokens.mainnet.veOGV.symbol}
        </LoadingLabel>
      </Stack>
      <LinearProgress
        value={(score / totalVotes) * 100}
        variant={'determinate'}
        sx={{
          borderRadius: 1,
          backgroundColor: 'grey.600',
          '.MuiLinearProgress-bar': {
            backgroundColor: (theme) =>
              isLoading
                ? theme.palette.grey[800]
                : choice === 'For'
                  ? theme.palette.success.main
                  : choice === 'Against'
                    ? theme.palette.error.main
                    : theme.palette.warning.main,
          },
        }}
      />
      <Stack pt={2} alignItems="flex-start">
        <ConnectedButton variant="outlined" color={color}>
          {label}
        </ConnectedButton>
      </Stack>
    </Stack>
  );
}

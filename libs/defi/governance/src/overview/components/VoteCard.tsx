import { LinearProgress, Stack } from '@mui/material';
import { useTxButton } from '@origin/defi/shared';
import { LoadingLabel, TooltipLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { TxButton, useFormat } from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { governanceSupport, governanceTokens } from '../constants';
import { useProposal } from '../hooks';

import type { StackProps } from '@mui/material';

type VoteCardProps = {
  choice: string;
  score: number;
  isVotingEnabled: boolean;
  totalVotes: number;
  isLoading: boolean;
} & StackProps;

export function VoteCard({
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
      status: 'pending',
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

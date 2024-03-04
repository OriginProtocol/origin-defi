import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { TokenIcon, TooltipLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaCircleCheckRegular,
  FaCircleXmarkRegular,
  FaMinusRegular,
  Snapshot,
} from '@origin/shared/icons';
import { isNilOrEmpty } from '@origin/shared/utils';
import { take } from 'ramda';
import { useIntl } from 'react-intl';
import { Link, useSearchParams } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { useUserVotes } from '../hooks';
import { StatusBadge } from './StatusBadge';

import type { CardProps, StackProps } from '@mui/material';

import type { Vote } from '../types';

const PAGE_SIZE = 3;

export const MyVotingHistoryCard = (props: CardProps) => {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const [search, setSearch] = useSearchParams({
    lv: PAGE_SIZE.toString(),
  });
  const limit = search.get('lv') ? Number(search.get('lv')) : PAGE_SIZE;
  const { data: votes, isLoading: isVotesLoading } = useUserVotes();

  const handleShowMoreClick = () => {
    setSearch((params) => {
      params.set(
        'lv',
        Math.min(Number(limit) + PAGE_SIZE, votes?.length ?? 0).toString(),
      );
      return params;
    });
  };

  const paginatedVotes = take(limit, votes ?? []);

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Voting History' })}
      />
      {isConnected ? (
        isVotesLoading ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '5rem',
              width: 1,
            }}
          >
            <CircularProgress size={20} />
          </Stack>
        ) : isNilOrEmpty(votes) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              width: 1,
              p: 3,
            }}
          >
            <Typography color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'No votes' })}
            </Typography>
          </Stack>
        ) : (
          <>
            <Stack spacing={1.5} divider={<Divider />}>
              {paginatedVotes.map((vote) => (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                <VoteHistory key={vote.id} vote={vote as any} />
              ))}
            </Stack>
            <Stack justifyContent="center" alignItems="center" py={2}>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ minWidth: 120 }}
                onClick={handleShowMoreClick}
                disabled={limit >= (votes?.length ?? 0)}
              >
                {intl.formatMessage({ defaultMessage: 'Show more' })}
              </Button>
            </Stack>
          </>
        )
      ) : (
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: 1,
            p: 3,
          }}
        >
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Connect wallet to view' })}
          </Typography>
        </Stack>
      )}
    </Card>
  );
};

type VoteHistoryProps = {
  vote: Vote;
} & StackProps;

function VoteHistory({ vote, ...rest }: VoteHistoryProps) {
  const intl = useIntl();
  const theme = useTheme();

  const label =
    {
      For: intl.formatMessage({ defaultMessage: 'Voted For' }),
      Against: intl.formatMessage({ defaultMessage: 'Voted Against' }),
      Abstain: intl.formatMessage({ defaultMessage: 'Abstain' }),
    }[vote.choice] ?? vote.choice;
  const icon = {
    For: (
      <FaCircleCheckRegular
        sx={{ color: theme.palette.success.main, fontSize: 14 }}
      />
    ),
    Against: (
      <FaCircleXmarkRegular
        sx={{ color: theme.palette.error.main, fontSize: 14 }}
      />
    ),
    Abstain: (
      <FaMinusRegular
        sx={{ color: theme.palette.warning.main, fontSize: 14 }}
      />
    ),
  }[vote.choice] ?? <Snapshot color="warning" sx={{ fontSize: 14 }} />;

  return (
    <Stack spacing={1.5} px={3} py={1.5} {...rest}>
      <Stack direction="row" spacing={2} alignItems="center">
        <TokenIcon token={tokens.mainnet.OETH} />
        <StatusBadge status={vote?.proposal?.status} />
        {vote.proposal.type === 'snapshot' && (
          <Typography variant="body2" color="warning.main">
            {intl.formatMessage({ defaultMessage: 'Snapshot' })}
          </Typography>
        )}
      </Stack>
      <MuiLink
        {...(vote.proposal.type === 'onchain'
          ? { component: Link, to: `/${vote.proposal.id}` }
          : { href: vote.proposal.link })}
      >
        <TooltipLabel
          variant="h5"
          maxChars={76}
          sx={{
            maxWidth: 1,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ':hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {vote?.proposal?.title}
        </TooltipLabel>
      </MuiLink>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          {intl.formatDate(new Date(vote.created), {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          {icon}&nbsp;
          <TooltipLabel noWrap variant="body2" maxWidth={120} maxChars={20}>
            {label}
          </TooltipLabel>
        </Stack>
      </Stack>
    </Stack>
  );
}

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
import { Link, useSearchParams } from 'react-router';
import { useAccount } from 'wagmi';

import { useUserVotes } from '../hooks';
import { ProposalTypeBadge } from './ProposalTypeBadge';
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
        title={intl.formatMessage({ defaultMessage: 'Your voting history' })}
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
            <Typography
              sx={{
                color: 'text.secondary',
              }}
            >
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
            <Stack
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                py: 2,
              }}
            >
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
          <Typography
            sx={{
              color: 'text.secondary',
            }}
          >
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
    <Stack
      spacing={1.5}
      {...rest}
      sx={[
        {
          px: 3,
          py: 1.5,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 1,
          columnGap: 1,
        }}
      >
        <TokenIcon token={tokens.mainnet.OETH} sx={{ fontSize: 24 }} />
        <ProposalTypeBadge type={vote?.proposal.type} />
        <StatusBadge status={vote?.proposal?.status} />
      </Stack>
      <MuiLink
        {...(vote.proposal.type === 'onchain'
          ? { component: Link, to: `/${vote.proposal.id}` }
          : { href: vote.proposal.link })}
      >
        <TooltipLabel
          maxChars={38}
          sx={{
            fontWeight: 'medium',
            maxWidth: 1,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
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
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        {icon}
        <TooltipLabel noWrap variant="caption1" maxChars={29}>
          {label}
        </TooltipLabel>
      </Stack>
      <Typography
        variant="caption1"
        sx={{
          color: 'text.secondary',
        }}
      >
        {intl.formatDate(new Date(vote.created), {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })}
      </Typography>
    </Stack>
  );
}

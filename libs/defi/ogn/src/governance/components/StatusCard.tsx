import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { ascend, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router';

import { useProposal } from '../hooks';

import type { CardProps, StackProps } from '@mui/material';

import type { ProposalEvent } from '../types';

export const StatusCard = (props: CardProps) => {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: proposal, isLoading: isProposalLoading } = useProposal(
    proposalId,
    {
      enabled: !!proposalId,
    },
  );

  const events = sort(ascend(prop('timestamp')), proposal?.events ?? []);

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Status' })} />
      <Divider />
      <CardContent>
        {isProposalLoading ? (
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
        ) : isNilOrEmpty(events) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '5rem',
              width: 1,
            }}
          >
            <Typography
              sx={{
                color: 'text.secondary',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'No activity' })}
            </Typography>
          </Stack>
        ) : (
          <Stack
            spacing={3}
            sx={{
              position: 'relative',
            }}
          >
            {events?.map((event) => <EventItem key={event.id} event={event} />)}
            {(events?.length ?? 0) > 1 && (
              <Box
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                  top: 0,
                  left: 8,
                  bottom: 20,
                  width: '1px',
                  backgroundColor: 'text.primary',
                }}
              />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

type EventItemProps = { event: ProposalEvent } & StackProps;

function EventItem({ event, ...rest }: EventItemProps) {
  const intl = useIntl();

  return (
    <Stack
      {...rest}
      direction="row"
      spacing={2}
      sx={[
        {
          alignItems: 'center',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <Box
        sx={{
          border: '2px solid',
          borderColor: 'text.primary',
          borderRadius: '50%',
          width: 16,
          height: 16,
          backgroundColor: 'background.default',
          zIndex: 2,
        }}
      />
      <Stack>
        {isNilOrEmpty(event?.txHash) ? (
          <Typography>{event?.event}</Typography>
        ) : (
          <ExternalLink href={`https://etherscan.io/tx/${event.txHash}`}>
            {event?.event}
          </ExternalLink>
        )}
        <Typography
          variant="caption1"
          sx={{
            color: 'text.secondary',
          }}
        >
          {intl.formatDate(new Date(event.timestamp), {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23',
          })}
        </Typography>
      </Stack>
    </Stack>
  );
}

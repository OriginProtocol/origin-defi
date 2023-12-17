import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { ascend, prop, sort } from 'ramda';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';
import type { OgvProposalEvent } from '@origin/governance/shared';

import type { ProposalLog } from '../types';

export const StatusCard = (props: CardProps) => {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: logs, isLoading: isLogsLoading } = useProposalQuery(
    { proposalId },
    {
      enabled: !isNilOrEmpty(proposalId),
      select: (data) =>
        sort(ascend(prop('timestamp')), data?.ogvProposalById?.logs ?? []),
    },
  );

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Status' })} />
      <CardContent>
        {isLogsLoading ? (
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
        ) : isNilOrEmpty(logs) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '5rem',
              width: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'No activity' })}
            </Typography>
          </Stack>
        ) : (
          <Stack position="relative" spacing={3}>
            {logs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}
            <Box
              sx={{
                position: 'absolute',
                zIndex: 1,
                top: 0,
                left: 15,
                width: '1px',
                height: 0.8,
                background: (theme) =>
                  `linear-gradient(0deg, ${theme.palette.grey[300]} 0%, ${theme.palette.grey[800]} 100%)`,
              }}
            />
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

const eventColor: Record<OgvProposalEvent, string> = {
  Canceled: 'grey.600',
  Created: 'grey.400',
  Executed: 'success.main',
  Extended: 'success.main',
  Queued: 'success.main',
};

const eventIcon: Record<OgvProposalEvent, string> = {
  Canceled: 'images/icons/close-light.svg',
  Created: 'images/icons/check-regular.svg',
  Executed: 'images/icons/check-regular-dark.svg',
  Extended: 'images/icons/check-regular-dark.svg',
  Queued: 'images/icons/check-regular-dark.svg',
};

type LogItemProps = { log: ProposalLog } & StackProps;

function LogItem({ log, ...rest }: LogItemProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" spacing={2} alignItems="center">
      <Box
        sx={{
          borderRadius: '50%',
          width: 30,
          height: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: eventColor[log.event],
          zIndex: 2,
        }}
      >
        <Box component="img" src={eventIcon[log.event]} width={16} />
      </Box>
      <Stack>
        {isNilOrEmpty(log?.hash) ? (
          <Typography>{log?.event}</Typography>
        ) : (
          <ExternalLink href={`https://etherscan.io/tx/${log.hash}`}>
            {log?.event}
          </ExternalLink>
        )}
        <Typography variant="body2" color="text.secondary">
          {intl.formatDate(new Date(log.timestamp), {
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

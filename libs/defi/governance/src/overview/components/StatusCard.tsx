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
import { useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';

import type { ProposalLog } from '../types';

export const StatusCard = (props: CardProps) => {
  const intl = useIntl();
  const { proposalId } = useParams();
  const { data: logs, isLoading: isLogsLoading } = useProposalQuery(
    { proposalId: proposalId ?? '' },
    {
      enabled: !!proposalId,
      select: (data) =>
        sort(ascend(prop('timestamp')), data?.ogvProposalById?.logs ?? []),
    },
  );

  return (
    <Card {...props}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Status' })} />
      <Divider />
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
            <Typography color="text.secondary">
              {intl.formatMessage({ defaultMessage: 'No activity' })}
            </Typography>
          </Stack>
        ) : (
          <Stack position="relative" spacing={3}>
            {logs?.map((log) => <LogItem key={log.id} log={log} />)}
            {(logs?.length ?? 0) > 1 && (
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

type LogItemProps = { log: ProposalLog } & StackProps;

function LogItem({ log, ...rest }: LogItemProps) {
  const intl = useIntl();

  return (
    <Stack {...rest} direction="row" spacing={2} alignItems="center">
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
        {isNilOrEmpty(log?.hash) ? (
          <Typography>{log?.event}</Typography>
        ) : (
          <ExternalLink href={`https://etherscan.io/tx/${log.hash}`}>
            {log?.event}
          </ExternalLink>
        )}
        <Typography variant="caption1" color="text.secondary">
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

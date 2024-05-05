import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import {
  FaCircleArrowDownRegular,
  FaCircleCheckRegular,
  FaCircleQuestionRegular,
  FaCircleXmarkRegular,
  FaClockRegular,
} from '@origin/shared/icons';
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
                  left: 15,
                  bottom: 20,
                  width: '1px',
                  backgroundColor: 'divider',
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
  const theme = useTheme();

  const eventIcon = {
    Canceled: <FaCircleXmarkRegular sx={{ color: theme.palette.divider }} />,
    Created: (
      <FaCircleCheckRegular sx={{ color: theme.palette.text.secondary }} />
    ),
    Executed: (
      <FaCircleCheckRegular sx={{ color: theme.palette.success.main }} />
    ),
    Extended: <FaClockRegular sx={{ color: theme.palette.warning.main }} />,
    Queued: (
      <FaCircleArrowDownRegular sx={{ color: theme.palette.primary.main }} />
    ),
  }[log?.event] ?? <FaCircleQuestionRegular />;

  return (
    <Stack {...rest} direction="row" spacing={2} alignItems="center">
      <SvgIcon
        sx={{
          width: 30,
          height: 30,
          zIndex: 2,
          backgroundColor: 'background.default',
        }}
      >
        {eventIcon}
      </SvgIcon>
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

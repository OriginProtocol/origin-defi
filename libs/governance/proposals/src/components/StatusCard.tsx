import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from '@mui/material';
import { ExternalLink } from '@origin/shared/components';
import { isNilOrEmpty } from '@origin/shared/utils';
import { ascend, prop, sort } from 'ramda';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { FaCircleCheck, FaClock } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { useProposalQuery } from '../queries.generated';

import type { CardProps, StackProps } from '@mui/material';

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
            {logs.length > 1 && (
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
    Canceled: <IoCloseCircle color={theme.palette.grey['600']} />,
    Created: <FaCircleCheck color={theme.palette.grey['400']} />,
    Executed: <FaCircleCheck color={theme.palette.success.main} />,
    Extended: <FaClock color={theme.palette.warning.main} />,
    Queued: <FaCircleCheck color={theme.palette.success.main} />,
  }[log?.event] ?? <FaRegQuestionCircle />;

  return (
    <Stack {...rest} direction="row" spacing={2} alignItems="center">
      <SvgIcon
        sx={{
          width: 30,
          height: 30,
          zIndex: 2,
          backgroundColor: 'background.paper',
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

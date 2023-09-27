import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';
import { useTransaction } from 'wagmi';

import { TransactionIcon } from './TransactionIcon';

import type { HexAddress } from '@origin/shared/utils';

interface Props {
  timestamp: string;
  type: 'Sent' | 'Received' | 'Yield' | 'Swap';
  transactionHash: string;
}

export function HistoryCell(props: Props) {
  const intl = useIntl();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useTransaction({
    hash: props.transactionHash as unknown as HexAddress,
  });

  return (
    <Stack direction="row" alignItems="center" gap={1.5}>
      {/* @ts-expect-error whatever */}
      <TransactionIcon type={props.type.toLowerCase()} />
      <Stack>
        <Typography fontWeight="500">{props.type}</Typography>
        <Typography color="text.secondary" variant="body2">
          {intl.formatDate(new Date(props.timestamp))}
        </Typography>
      </Stack>
    </Stack>
  );
}

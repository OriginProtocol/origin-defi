import {
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMyVApy } from '../hooks';
import { useOgnLockupsQuery } from '../queries.generated';
import { LockupsTable } from './LockupsTable';

import type { CardProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: lockups, isFetching: isLockupsFetching } = useOgnLockupsQuery(
    { address: address ?? ZERO_ADDRESS },
    { enabled: !!address, select: (data) => data.ognLockups },
  );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Your lockups' })}
      />
      <Divider />
      {isConnected ? (
        isLockupsFetching ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <CircularProgress />
          </Stack>
        ) : isNilOrEmpty(lockups) ? (
          <Stack
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '15rem',
              width: 1,
            }}
          >
            <Typography>
              {intl.formatMessage({ defaultMessage: 'No Lockups' })}
            </Typography>
          </Stack>
        ) : (
          <LockupsTable />
        )
      ) : (
        <Stack
          sx={{
            height: '15rem',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <ConnectedButton sx={{ minWidth: 160, height: 44 }} />
        </Stack>
      )}
    </Card>
  );
};

function CardActionHeader() {
  const intl = useIntl();
  const { isConnected } = useAccount();
  const { data: myvAPY, isLoading: isMyvAPYLoading } = useMyVApy();

  if (!isConnected) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1.5}>
      <ColorChip>
        <Typography variant="caption1">
          {intl.formatMessage({ defaultMessage: 'Your APY:' })}
        </Typography>
        <LoadingLabel isLoading={isMyvAPYLoading} fontWeight="bold">
          {intl.formatNumber(myvAPY ?? 0, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </LoadingLabel>
      </ColorChip>
    </Stack>
  );
}

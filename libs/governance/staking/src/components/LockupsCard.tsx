import {
  Card,
  CardHeader,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { ConnectedButton } from '@origin/shared/providers';
import { isNilOrEmpty } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useMyVApy } from '../hooks';
import { useUserLockupsQuery } from '../queries.generated';
import { LockupsTable } from './LockupsTable';

import type { CardProps } from '@mui/material';

export const LockupsCard = (props: CardProps) => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data, isFetching } = useUserLockupsQuery(
    { address },
    { enabled: !!address, select: (data) => data.ogvLockups },
  );
  const { data: myvAPY, isLoading: isMyvAPYLoading } = useMyVApy();

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'My Lock-ups' })}
        action={
          isConnected && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>
                {intl.formatMessage({ defaultMessage: 'My vAPY' })}
              </Typography>
              <InfoTooltip
                tooltipLabel={intl.formatMessage({
                  defaultMessage:
                    'The current APY you are earning across all of your lock-ups. Extend your stakes to four years to earn the maximum APY.',
                })}
              />
              <LoadingLabel
                variant="h3"
                isLoading={isMyvAPYLoading}
                sx={{
                  background:
                    'linear-gradient(91deg, #FEDBA8 -3.29%, #CF75D5 106.42%)',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {intl.formatNumber(myvAPY / 100, {
                  style: 'percent',
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </LoadingLabel>
            </Stack>
          )
        }
      />
      {isConnected ? (
        isFetching ? (
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
        ) : isNilOrEmpty(data) ? (
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
              {intl.formatMessage({ defaultMessage: 'No Lock-ups' })}
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
          <ConnectedButton
            variant="connect"
            sx={{ minWidth: 160, height: 44 }}
          />
        </Stack>
      )}
    </Card>
  );
};

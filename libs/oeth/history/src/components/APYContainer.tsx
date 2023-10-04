import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import { tokens } from '@origin/shared/contracts';
import { balanceFormat } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { useAccount, useBalance } from 'wagmi';

import { usePendingYield } from '../hooks';
import { useHistoryTableQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';

export function APYContainer() {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: oethBalance, isLoading: oethLoading } = useBalance({
    address,
    token: tokens.mainnet.OETH.address,
    watch: true,
  });
  const { data: earnings, isLoading: earningsLoading } = useHistoryTableQuery(
    { address: address?.toLowerCase(), offset: 0 },
    {
      enabled: isConnected,
    },
  );
  const { data: pendingYield, isLoading: pendingYieldLoading } =
    usePendingYield(tokens.mainnet.OETH);

  return (
    <Stack
      sx={{
        paddingInline: { xs: 2, md: 2.75 },
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: 1,
      }}
      direction="row"
      justifyContent="space-between"
    >
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'OETH Balance' })}
        value={intl.formatNumber(
          Number(oethBalance?.formatted ?? 0),
          balanceFormat,
        )}
        isLoading={isConnected && oethLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({ defaultMessage: 'Pending Yield' })}
        value={intl.formatNumber(pendingYield ?? 0, balanceFormat)}
        isLoading={isConnected && pendingYieldLoading}
      />
      <Divider orientation="vertical" flexItem />
      <ValueContainer
        label={intl.formatMessage({
          defaultMessage: 'Lifetime Earnings (OETH)',
        })}
        value={intl.formatNumber(
          earnings?.addressById?.earned ?? 0,
          balanceFormat,
        )}
        isLoading={isConnected && earningsLoading}
      />
    </Stack>
  );
}

type ValueContainerProps = {
  label: string;
  value: string;
  isLoading?: boolean;
} & StackProps;

function ValueContainer({
  label,
  value,
  isLoading,
  ...rest
}: ValueContainerProps) {
  return (
    <Stack
      gap={0.5}
      {...rest}
      sx={{
        paddingBlock: 2,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        flex: 1,
        ...rest?.sx,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" textAlign="center">
        {isLoading ? <Skeleton width={60} /> : value}
      </Typography>
    </Stack>
  );
}

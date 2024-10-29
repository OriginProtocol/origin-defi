import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { useHolderCountQuery, useOgnInfo } from '@origin/defi/shared';
import { ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { CardProps } from '@mui/material';

export const StatsCard = (props: CardProps) => {
  const intl = useIntl();
  const { data: info, isLoading: isInfoLoading } = useOgnInfo();
  const { data: xognHolder, isLoading: isXognHolderLoading } =
    useHolderCountQuery(
      {
        token: tokens.mainnet.xOGN.address.toLowerCase(),
        chainId: tokens.mainnet.xOGN.chainId,
      },
      { select: (data) => data?.erc20HoldersConnection?.totalCount },
    );

  return (
    <Card {...props}>
      <CardHeader
        title={intl.formatMessage({ defaultMessage: 'Global stats' })}
      />
      <Divider />
      <CardContent>
        <Stack spacing={3}>
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'Total OGN Staked' })}
            labelProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
            value={intl.formatNumber(info?.ognTotalLockedPercent ?? 0, {
              style: 'percent',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              roundingMode: 'floor',
            })}
            isLoading={isInfoLoading}
          />
          <ValueLabel
            direction="row"
            sx={{ justifyContent: 'space-between' }}
            label={intl.formatMessage({ defaultMessage: 'xOGN holders' })}
            labelProps={{ variant: 'body3', sx: { fontWeight: 'medium' } }}
            value={xognHolder}
            isLoading={isXognHolderLoading}
            sWidth={30}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

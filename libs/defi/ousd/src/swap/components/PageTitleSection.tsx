import { Stack, Typography } from '@mui/material';
import { ColorChip, useOTokenStatsQuery } from '@origin/defi/shared';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: apies, isLoading: isApiesLoading } = useOTokenStatsQuery(
    {
      token: tokens.mainnet.OUSD.address.toLowerCase(),
      chainId: tokens.mainnet.OUSD.chainId,
    },
    {
      select: (data) => {
        return data?.oTokenDailyStats[0];
      },
    },
  );

  const { apy, tooltip } =
    (apies?.apy30 ?? 0) > (apies?.apy7 ?? 0)
      ? {
          apy: apies?.apy30,
          tooltip: intl.formatMessage({
            defaultMessage: '30-day trailing APY',
          }),
        }
      : {
          apy: apies?.apy7,
          tooltip: intl.formatMessage({
            defaultMessage: '7-day trailing APY',
          }),
        };

  return (
    <Stack
      direction="row"
      spacing={1}
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          pt: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <ColorChip spacing={0.5} minHeight={40}>
        <LoadingLabel
          isLoading={isApiesLoading}
          sx={{ color: 'inherit', fontWeight: 'bold' }}
          sWidth={90}
        >
          {intl.formatNumber(apy ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
          })}
        </LoadingLabel>
        <Typography
          variant="caption1"
          sx={{
            color: 'inherit',
          }}
        >
          {intl.formatMessage({ defaultMessage: 'APY' })}
        </Typography>
        <InfoTooltip tooltipLabel={tooltip} iconColor="primary.main" />
      </ColorChip>
    </Stack>
  );
};

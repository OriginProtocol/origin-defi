import { Stack, Typography } from '@mui/material';
import { ChainsChip, ColorChip, useOTokenApyQuery } from '@origin/defi/shared';
import { InfoTooltip, LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: apies, isLoading: isApiesLoading } = useOTokenApyQuery(
    {
      token: tokens.mainnet.OETH.address.toLowerCase(),
      chainId: tokens.mainnet.OETH.chainId,
    },
    {
      select: (data) => {
        return data?.oTokenApies[0];
      },
    },
  );

  const { apy, tooltip } =
    (apies?.apy30DayAvg ?? 0) > (apies?.apy7DayAvg ?? 0)
      ? {
          apy: apies?.apy30DayAvg,
          tooltip: intl.formatMessage({
            defaultMessage: '30-day trailing APY',
          }),
        }
      : {
          apy: apies?.apy7DayAvg,
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
          sWidth={90}
          sx={{ color: 'inherit', fontWeight: 'bold' }}
        >
          {intl.formatNumber(apy ?? 0, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'percent',
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
      <ChainsChip chainIds={[mainnet.id, arbitrum.id]} minHeight={40} />
    </Stack>
  );
};

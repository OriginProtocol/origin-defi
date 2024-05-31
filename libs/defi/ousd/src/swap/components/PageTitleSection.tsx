import { Stack, Typography } from '@mui/material';
import { ColorChip, useOTokenApyQuery } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: apy, isLoading: isApyLoading } = useOTokenApyQuery(
    {
      token: tokens.mainnet.OUSD.address,
      chainId: tokens.mainnet.OUSD.chainId,
    },
    {
      select: (data) => {
        return Math.max(
          data?.oTokenApies?.[0].apy7DayAvg,
          data?.oTokenApies?.[0].apy14DayAvg,
          data?.oTokenApies?.[0].apy30DayAvg,
        );
      },
    },
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
      pt={3}
      {...props}
    >
      <ColorChip spacing={0.5} minHeight={40}>
        <LoadingLabel
          isLoading={isApyLoading}
          color="inherit"
          fontWeight="bold"
          sWidth={90}
        >
          {intl.formatNumber(apy ?? 0, {
            style: 'percent',
            minimumFractionDigits: 2,
          })}
        </LoadingLabel>
        <Typography variant="caption1" color="inherit">
          {intl.formatMessage({ defaultMessage: 'APY' })}
        </Typography>
      </ColorChip>
    </Stack>
  );
};

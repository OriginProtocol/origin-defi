import { Stack, Typography } from '@mui/material';
import { ChainsChip, ColorChip, useOTokenApyQuery } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: apies, isLoading: isApiesLoading } = useOTokenApyQuery(
    {
      token: tokens.mainnet.OETH.address,
      chainId: tokens.mainnet.OETH.chainId,
    },
    {
      select: (data) => {
        const apies = [
          data?.oTokenApies?.[0].apy7DayAvg,
          data?.oTokenApies?.[0].apy30DayAvg,
        ];

        return apies.sort();
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
          isLoading={isApiesLoading}
          color="inherit"
          fontWeight="bold"
          sWidth={90}
        >
          {intl.formatMessage(
            { defaultMessage: '{apy_low} - {apy_high}' },
            {
              apy_low: intl.formatNumber(apies?.[0] ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
              }),
              apy_high: intl.formatNumber(apies?.[1] ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
              }),
            },
          )}
        </LoadingLabel>
        <Typography variant="caption1" color="inherit">
          {intl.formatMessage({ defaultMessage: 'APY' })}
        </Typography>
      </ColorChip>
      <ChainsChip chainIds={[mainnet.id, arbitrum.id]} minHeight={40} />
    </Stack>
  );
};

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
      select: (data) => data?.oTokenApies?.[0],
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
            { defaultMessage: '{apy30} - {apy7}' },
            {
              apy30: intl.formatNumber(apies?.apy30DayAvg ?? 0, {
                style: 'percent',
                minimumFractionDigits: 2,
              }),
              apy7: intl.formatNumber(apies?.apy7DayAvg ?? 0, {
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

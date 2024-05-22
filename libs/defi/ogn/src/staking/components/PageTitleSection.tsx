import { Button, Stack, Typography } from '@mui/material';
import { ColorChip, useOTokenApyQuery } from '@origin/defi/shared';
import {
  LoadingLabel,
  MultiTokenIcon,
  TokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();
  const { data: apy, isLoading: isApyLoading } = useOTokenApyQuery(
    {
      token: tokens.mainnet.OGN.address,
      chainId: tokens.mainnet.OGN.chainId,
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
      flexWrap="wrap"
      rowGap={2}
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
      <Button component={RouterLink} to="/more/migration" sx={{ gap: 0.5 }}>
        <TokenIcon token={tokens.mainnet.OGV} sx={{ fontSize: 24 }} outlined />
        <FaArrowRightRegular />
        <MultiTokenIcon
          tokens={[tokens.mainnet.OGN, tokens.mainnet.xOGN]}
          zOrder="last"
        />
        <Typography>
          {intl.formatMessage({ defaultMessage: 'migrate OGV to OGN/xOGN' })}
        </Typography>
      </Button>
    </Stack>
  );
};

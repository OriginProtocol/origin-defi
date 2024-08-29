import { Button, Stack, Typography } from '@mui/material';
import { ColorChip, useXOgnStakingApy } from '@origin/defi/shared';
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
  const { data: apy, isLoading: isApyLoading } = useXOgnStakingApy();

  return (
    <Stack
      direction="row"
      spacing={1}
      {...props}
      sx={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          rowGap: 2,
          pt: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <ColorChip spacing={0.5} minHeight={40}>
        <LoadingLabel
          isLoading={isApyLoading}
          color="inherit"
          fontWeight="bold"
        >
          {intl.formatNumber(apy?.xOgnApyPercentage ?? 0, {
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
          {intl.formatMessage({ defaultMessage: 'Max vAPY' })}
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

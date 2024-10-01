import { Stack, Typography } from '@mui/material';
import { ColorChip } from '@origin/defi/shared';
import { LoadingLabel } from '@origin/shared/components';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const PageTitleSection = (props: StackProps) => {
  const intl = useIntl();

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
          isLoading={false}
          sx={{ color: 'inherit', fontWeight: 'bold' }}
        >
          {intl.formatNumber(0.274, {
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
          {intl.formatMessage({ defaultMessage: '30-day trailing APY' })}
        </Typography>
      </ColorChip>
    </Stack>
  );
};

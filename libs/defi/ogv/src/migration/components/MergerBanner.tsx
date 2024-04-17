import { Stack, Typography } from '@mui/material';
import { Countdown, MultiTokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const MergerBanner = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      spacing={{ xs: 0, md: 3 }}
      {...props}
      sx={{
        width: 1,
        borderRadius: 1,
        background: (theme) => theme.palette.background.gradientOrange,
        p: 3,
        rowGap: 3,
        ...props?.sx,
      }}
    >
      <MultiTokenIcon
        tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
        size={4}
        zOrder="last"
      />
      <Stack
        flexGrow={1}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        pr={{ xs: 0, md: 2 }}
      >
        <Typography variant="h4" fontWeight={500} color="background.default">
          {intl.formatMessage({ defaultMessage: 'OGV & OGN are merging' })}
        </Typography>
        <Typography
          color="background.default"
          textAlign={{ xs: 'center', md: 'start' }}
        >
          {intl.formatMessage({
            defaultMessage:
              'Convert your OGV tokens into OGN. Conversion page will be open for 1 year.',
          })}
        </Typography>
      </Stack>
      <Countdown
        targetDate={new Date('2025-04-01T00:00:00.0000Z')}
        spacing={3}
        valueLabelProps={{
          labelProps: { textAlign: 'center', color: 'background.default' },
          valueProps: {
            sx: {
              fontSize: 32,
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1,
              color: 'background.default',
            },
          },
        }}
      />
    </Stack>
  );
};

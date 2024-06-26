import { Stack, Typography } from '@mui/material';
import { Countdown, MultiTokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type MergerBannerProps = { endSlot?: ReactNode } & StackProps;

export const MergerBanner = ({ endSlot, ...rest }: MergerBannerProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      spacing={{ xs: 0, md: 3 }}
      {...rest}
      sx={{
        width: 1,
        borderRadius: 4,
        background: (theme) => theme.palette.background.gradientBlue,
        border: '1px solid',
        borderColor: 'primary.main',
        p: 5,
        rowGap: 3,
        ...rest?.sx,
      }}
    >
      <MultiTokenIcon
        tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
        size={3.5}
        zOrder="last"
      />
      <Stack
        flexGrow={1}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        pr={{ xs: 0, md: 2 }}
      >
        <Typography variant="h6" fontWeight={800} pb={1.5}>
          {intl.formatMessage({ defaultMessage: 'Convert OGV to OGN now!' })}
        </Typography>
        <Typography textAlign={{ xs: 'center', md: 'start' }}>
          {intl.formatMessage({
            defaultMessage:
              'OGV & OGN are merging. Conversion will be open for 1 year.',
          })}
        </Typography>
      </Stack>
      <Countdown
        targetDate={new Date('2025-05-28T00:00:00.0000Z')}
        spacing={3}
        valueLabelProps={{
          labelProps: { textAlign: 'center', variant: 'mono' },
          valueProps: {
            sx: {
              fontSize: 32,
              fontWeight: 700,
              textAlign: 'center',
              lineHeight: 1,
            },
          },
        }}
      />
      {endSlot}
    </Stack>
  );
};

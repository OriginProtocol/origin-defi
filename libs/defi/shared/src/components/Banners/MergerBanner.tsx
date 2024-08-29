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
      spacing={{ xs: 0, md: 3 }}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        (theme) => ({
          width: 1,
          borderRadius: 4,
          background: theme.palette.background.highlight,
          border: '1px solid',
          borderColor: 'primary.main',
          px: 2,
          py: 2.5,
          rowGap: 3,
        }),
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <MultiTokenIcon
        tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
        size={3}
        zOrder="last"
      />
      <Stack
        sx={{
          flexGrow: 1,
          alignItems: { xs: 'center', md: 'flex-start' },
          pr: { xs: 0, md: 2 },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 'bold',
            pb: 1,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Convert OGV to OGN now!' })}
        </Typography>
        <Typography
          sx={{
            fontWeight: 'medium',
            textAlign: { xs: 'center', md: 'start' },
          }}
        >
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
          labelProps: { variant: 'mono', sx: { textAlign: 'center' } },
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

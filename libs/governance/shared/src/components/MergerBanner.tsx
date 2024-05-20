import { Button, Stack, Typography } from '@mui/material';
import {
  Countdown,
  ExternalLink,
  MultiTokenIcon,
} from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const MergerBanner = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      {...props}
      sx={{
        width: 1,
        borderRadius: 1,
        background: 'linear-gradient(90deg, #8C66FC -28.99%, #0274F1 144.97%)',
        p: 3,
        rowGap: 3,
        ...props?.sx,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" flexGrow={1}>
        <MultiTokenIcon
          tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
          size={2.5}
          zOrder="last"
        />
        <Stack>
          <Typography variant="h4" fontWeight="normal">
            {intl.formatMessage({ defaultMessage: 'OGV & OGN have merged' })}
          </Typography>
          <Typography pb={1.5}>
            {intl.formatMessage({
              defaultMessage: 'Conversion will be open for one year',
            })}
          </Typography>
          <ExternalLink
            iconType="arrow"
            href="https://www.originprotocol.com/ogn-ogv-merger-finalized"
            sx={{ textDecoration: 'underline' }}
          >
            {intl.formatMessage({ defaultMessage: 'Learn more' })}
          </ExternalLink>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={3}
        alignItems="center"
        justifyContent="flex-end"
        flexGrow={1}
      >
        <Countdown
          targetDate={new Date('2025-04-01T00:00:00.0000Z')}
          spacing={3}
          valueLabelProps={{
            labelProps: { textAlign: 'center' },
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
        <Button color="secondary" sx={{ height: 44 }}>
          {intl.formatMessage({ defaultMessage: 'Convert OGV to OGN' })}
        </Button>
      </Stack>
    </Stack>
  );
};

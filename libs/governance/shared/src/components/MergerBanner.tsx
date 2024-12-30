import { Button, Stack, Typography } from '@mui/material';
import {
  Countdown,
  ExternalLink,
  MultiTokenIcon,
} from '@origin/shared/components';
import { ORIGIN_DAPP_URL } from '@origin/shared/constants';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import type { StackProps } from '@mui/material';

export const MergerBanner = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      {...props}
      sx={[
        {
          flexWrap: 'wrap',
          width: 1,
          borderRadius: 1,
          background:
            'linear-gradient(90deg, #8C66FC -28.99%, #0274F1 144.97%)',
          p: 3,
          rowGap: 3,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <MultiTokenIcon
          tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
          size={2.5}
          zOrder="last"
        />
        <Stack>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'normal',
            }}
          >
            {intl.formatMessage({ defaultMessage: 'OGV & OGN have merged' })}
          </Typography>
          <Typography
            sx={{
              pb: 1.5,
            }}
          >
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
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          flexGrow: 1,
        }}
      >
        <Countdown
          targetDate={new Date('2025-05-28T00:00:00.0000Z')}
          spacing={3}
          valueLabelProps={{
            labelProps: { sx: { textAlign: 'center' } },
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
        <Button
          href={`${ORIGIN_DAPP_URL}/#/more/migration`}
          color="secondary"
          sx={{ height: 44 }}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          {intl.formatMessage({ defaultMessage: 'Convert OGV to OGN' })}
        </Button>
      </Stack>
    </Stack>
  );
};

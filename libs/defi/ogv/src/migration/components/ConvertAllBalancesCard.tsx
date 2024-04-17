import { Stack, Typography } from '@mui/material';
import { Countdown, MultiTokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { useIntl } from 'react-intl';

import { ConvertAllBalancesButton } from './ConvertAllBalancesModal';

import type { StackProps } from '@mui/material';

export const ConvertAllBalancesCard = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
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
      <Stack direction="row" spacing={2} alignItems="center">
        <MultiTokenIcon
          tokens={[tokens.mainnet.OGV, tokens.mainnet.OGN]}
          size={4}
          zOrder="last"
        />
        <Stack maxWidth={400}>
          <Typography variant="h4" fontWeight={500} color="background.default">
            {intl.formatMessage({ defaultMessage: 'OGV & OGN are merging' })}
          </Typography>
          <Typography color="background.default">
            {intl.formatMessage({
              defaultMessage:
                'Convert your OGV tokens into OGN. Conversion page will be open for 1 year.',
            })}
          </Typography>
        </Stack>
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
      <ConvertAllBalancesButton variant="action" sx={{ width: 300 }}>
        {intl.formatMessage({ defaultMessage: 'Convert All Balances' })}
      </ConvertAllBalancesButton>
    </Stack>
  );
};

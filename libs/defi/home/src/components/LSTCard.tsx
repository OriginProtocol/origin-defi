import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

import type { CardProps, StackProps } from '@mui/material';

export const LSTCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card {...props}>
      <CardContent>
        <Stack
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            background: `radial-gradient(167.75% 95.71% at 76.09% 50.05%, #1E313F 0%, #15181B 100%)`,
            color: 'primary.contrastText',
            overflow: 'hidden',
          }}
        >
          <Stack
            sx={{
              backgroundImage: `url('/images/circlesWavePattern.svg')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 800,
              backgroundPosition: 'right center',
              p: 3,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <Box
                sx={{
                  borderRadius: '50%',
                  backgroundColor: 'primary.main',
                  width: 10,
                  height: 10,
                }}
              />
              <Typography variant="mono">
                {intl.formatMessage({ defaultMessage: 'Supercharged LSTs' })}
              </Typography>
            </Stack>
            <Typography variant="caption1">
              {intl.formatMessage({ defaultMessage: 'Beyond liquid staking' })}
            </Typography>
            <Stack
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',
              }}
            ></Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

const TokenRow = (props: StackProps) => {
  return <Stack direction="row"></Stack>;
};

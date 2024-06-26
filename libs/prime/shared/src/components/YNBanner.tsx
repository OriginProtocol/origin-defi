import { Box, Button, Stack, Typography } from '@mui/material';
import { MultiTokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { YieldNest } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

import type { BoxProps, StackProps } from '@mui/material';

export const YNBanner = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      alignItems="center"
      {...props}
      sx={{
        backgroundColor: 'common.black',
        height: { xs: 300, md: 110 },
        pr: 6,
        ...props?.sx,
      }}
    >
      <BannerIcon width={300} />
      <Stack width={1}>
        <Typography variant="h4" color="common.white">
          {intl.formatMessage({
            defaultMessage:
              'Mint primeETH with OETH and start earning a piece of YieldNest',
          })}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {intl.formatMessage({
            defaultMessage:
              'Become eligible for the YieldNest Seeds campaign and upcoming airdrop.',
          })}
        </Typography>
      </Stack>
      <Button
        variant="outlined"
        sx={{
          borderColor: 'common.white',
          color: 'common.white',
          minWidth: 200,
          minHeight: 44,
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Learn more' })}
      </Button>
    </Stack>
  );
};

const BannerIcon = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Box position="relative">
        <YieldNest
          sx={{
            position: 'absolute',
            fontSize: 180,
            color: 'rgba(255, 255, 255, 0.2)',
            top: -90,
            left: 20,
          }}
        />
        <MultiTokenIcon
          tokens={[tokens.mainnet.primeETH, tokens.mainnet.OETH]}
          size={4}
          zOrder="last"
          sx={{
            position: 'absolute',
            top: -32,
            left: 60,
          }}
        />
      </Box>
    </Box>
  );
};

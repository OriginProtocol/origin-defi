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
        pl: { xs: 2, md: 0 },
        pr: { xs: 2, md: 6 },
        ...props?.sx,
      }}
    >
      <BannerIcon width={{ xs: 1, md: 300 }} />
      <Stack width={1} pt={{ xs: 16, md: 0 }}>
        <Typography
          variant="h4"
          color="common.white"
          textAlign={{ xs: 'center', md: 'start' }}
        >
          {intl.formatMessage({
            defaultMessage:
              'Hold primeETH to start earning a piece of YieldNest',
          })}
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          textAlign={{ xs: 'center', md: 'start' }}
        >
          {intl.formatMessage({
            defaultMessage:
              'Become eligible for YieldNest’s YND airdrop based on primeETH XP earned.',
          })}
        </Typography>
      </Stack>
      <Button
        variant="outlined"
        href="https://www.originprotocol.com/primestaked-yieldnest-airdrop"
        target="_blank"
        rel="noopener noreferrer nofollow"
        sx={{
          borderColor: 'common.white',
          color: 'common.white',
          minWidth: 200,
          minHeight: 44,
          mt: { xs: 3, md: 0 },
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Learn more' })}
      </Button>
    </Stack>
  );
};

const BannerIcon = (props: BoxProps) => {
  return (
    <Box position="relative" {...props}>
      <YieldNest
        sx={{
          position: 'absolute',
          fontSize: 180,
          color: 'rgba(255, 255, 255, 0.2)',
          top: { xs: -35, md: -90 },
          left: { xs: '50%', md: 20 },
          transform: { xs: 'translateX(-50%)', md: 'none' },
        }}
      />
      <MultiTokenIcon
        tokens={[tokens.mainnet.primeETH, tokens.mainnet.OETH]}
        size={4}
        zOrder="last"
        sx={{
          position: 'absolute',
          top: { xs: 20, md: -32 },
          left: { xs: '50%', md: 60 },
          transform: { xs: 'translate(-50%)', md: 'none' },
        }}
      />
    </Box>
  );
};

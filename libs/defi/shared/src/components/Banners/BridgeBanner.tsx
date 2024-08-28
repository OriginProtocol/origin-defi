import { Button, Stack, Typography } from '@mui/material';
import { NetworkIcon } from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { arbitrum, mainnet } from 'viem/chains';

import type { StackProps } from '@mui/material';

export const BridgeBanner = (props: StackProps) => {
  const intl = useIntl();

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      spacing={3}
      {...props}
      sx={{
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        color: 'primary.contrastText',
        overflow: 'hidden',
        background: `url('/images/arbitrum-icon.svg'),linear-gradient(83deg, rgba(18, 170, 255, 0.20) 12.85%, rgba(33, 49, 71, 0.20) 112.14%), #225180;`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: {
          xs: '60% 100%, cover',
          md: 'auto 100%, cover',
        },
        backgroundPosition: 'right -100px center, center',
        p: 2,
        ...props?.sx,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          p: 0.5,
          borderRadius: 3,
          backgroundColor: 'background.highlight',
        }}
      >
        <NetworkIcon chainId={mainnet.id} size={32} />
        <FaArrowRightRegular sx={{ fontSize: 20, color: 'text.primary' }} />
        <NetworkIcon chainId={arbitrum.id} size={32} />
      </Stack>
      <Stack width={1}>
        <Typography variant="body2" fontWeight="bold" width={1} gutterBottom>
          {intl.formatMessage({
            defaultMessage: 'Use wOETH on Arbitrum to earn ARB rewards!',
          })}
        </Typography>
        <Typography variant="caption1">
          {intl.formatMessage({
            defaultMessage:
              'Bridge your ETH in a single transaction and use wOETH across Arbitrum to earn ARB tokens.',
          })}
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: 'row', sm: 'column', md: 'row' }}
        spacing={1}
        width={{ xs: 1, sm: 0.4 }}
      >
        <Button
          fullWidth
          component={Link}
          to="/oeth/bridge"
          sx={{ whiteSpace: 'nowrap', minWidth: 120 }}
        >
          {intl.formatMessage({ defaultMessage: 'Bridge' })}
        </Button>
        <Button
          color="secondary"
          fullWidth
          href="https://www.originprotocol.com/arbitrum-incentives"
          target="_blank"
          rel="noopener noreferrer nofollow"
          sx={{ whiteSpace: 'nowrap', minWidth: 120 }}
        >
          {intl.formatMessage({ defaultMessage: 'Learn More' })}
        </Button>
      </Stack>
    </Stack>
  );
};

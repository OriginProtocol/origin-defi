import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { arbitrum, mainnet } from 'viem/chains';

import type { CardProps } from '@mui/material';

export const BridgePromoCard = (props: CardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...props}
      sx={{
        background: (theme) => theme.palette.background.gradientBlue,
        ...props?.sx,
      }}
    >
      <CardContent>
        <Stack spacing={4} alignItems="flex-start">
          <Typography variant="h6" fontWeight="bold">
            {intl.formatMessage({
              defaultMessage: 'Use wOETH on Arbitrum to earn ARB rewards!',
            })}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              p: 0.5,
              borderRadius: 25,
              backgroundColor: 'background.highlight',
            }}
          >
            <ChainIcon chainId={mainnet.id} sx={{ fontSize: 32 }} />
            <FaArrowRightRegular sx={{ fontSize: 20, color: 'text.primary' }} />
            <ChainIcon chainId={arbitrum.id} sx={{ fontSize: 32 }} />
          </Stack>
          <Typography variant="body2" fontWeight="medium">
            {intl.formatMessage({
              defaultMessage:
                'Bridge your ETH in a single transaction and use wOETH across Arbitrum to earn ARB tokens.',
            })}
          </Typography>
          <Stack spacing={1} width={1}>
            <Button fullWidth component={Link} to="/oeth/bridge">
              {intl.formatMessage({ defaultMessage: 'Bridge' })}
            </Button>
            <Button
              color="secondary"
              fullWidth
              href="https://www.originprotocol.com/arbitrum-incentives"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {intl.formatMessage({ defaultMessage: 'Learn More' })}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

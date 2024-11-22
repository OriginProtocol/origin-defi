import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { NetworkIcon } from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { Link } from 'react-router';
import { arbitrum, mainnet } from 'viem/chains';

import type { CardProps } from '@mui/material';

export type BridgePromoCardProps = { small?: boolean } & CardProps;

export const BridgePromoCard = ({ small, ...rest }: BridgePromoCardProps) => {
  const intl = useIntl();

  return (
    <Card
      {...rest}
      sx={[
        {
          background: (theme) => theme.palette.background.gradientBlue,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <CardContent>
        <Stack
          spacing={small ? 2 : 4}
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant={small ? 'body2' : 'h6'}
            sx={{
              fontWeight: 'bold',
            }}
          >
            {intl.formatMessage({
              defaultMessage: 'Use wOETH on Arbitrum to earn ARB rewards!',
            })}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'center',
              p: 0.5,
              borderRadius: 3,
              backgroundColor: 'background.highlight',
            }}
          >
            <NetworkIcon chainId={mainnet.id} size={32} />
            <FaArrowRightRegular sx={{ fontSize: 20, color: 'text.primary' }} />
            <NetworkIcon chainId={arbitrum.id} size={32} />
          </Stack>
          <Typography
            variant={small ? 'body3' : 'body2'}
            sx={{
              fontWeight: 'medium',
            }}
          >
            {intl.formatMessage({
              defaultMessage:
                'Bridge your ETH in a single transaction and use wOETH across Arbitrum to earn ARB tokens.',
            })}
          </Typography>
          <Stack
            direction={small ? 'row' : 'column'}
            spacing={1}
            sx={{
              width: 1,
            }}
          >
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

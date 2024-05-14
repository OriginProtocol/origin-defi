import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { ChainIcon } from '@origin/shared/components';
import { FaArrowRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';
import { arbitrum, mainnet } from 'viem/chains';

export const BridgePromoCard = () => {
  const intl = useIntl();

  return (
    <Card sx={{ background: (theme) => theme.palette.background.gradientBlue }}>
      <CardContent>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="body2" fontWeight="bold">
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
          <Typography fontWeight="medium">
            {intl.formatMessage({
              defaultMessage:
                'Bridge your ETH in a single transaction and use wOETH across Arbitrum to earn ARB tokens.',
            })}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} width={1}>
            <Button fullWidth>
              {intl.formatMessage({ defaultMessage: 'Bridge' })}
            </Button>
            <Button color="secondary" fullWidth>
              {intl.formatMessage({ defaultMessage: 'Learn More' })}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

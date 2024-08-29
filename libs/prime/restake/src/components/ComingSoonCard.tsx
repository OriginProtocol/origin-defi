import { Link, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const ComingSoonCard = () => {
  const intl = useIntl();

  return (
    <Stack
      spacing={3}
      sx={{ height: 300, p: 3, alignItems: 'center', justifyContent: 'center' }}
    >
      <Typography
        variant="h3"
        sx={{
          fontStyle: 'italic',
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Still cooking...' })}
      </Typography>
      <Typography variant="h4">
        {intl.formatMessage(
          { defaultMessage: 'You can always {link}' },
          {
            link: (
              <Link
                href="https://app.uniswap.org/swap?inputCurrency=0x6ef3D766Dfe02Dc4bF04aAe9122EB9A0Ded25615&outputCurrency=ETH"
                target="_blank"
                rel="noopener noreferrer nofollow"
                sx={{ color: 'primary.main' }}
              >
                {intl.formatMessage({
                  defaultMessage: 'sell primeETH on Uniswap.',
                })}
              </Link>
            ),
          },
        )}
      </Typography>
    </Stack>
  );
};

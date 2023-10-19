import { Button, Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const NotFoundPage = () => {
  const intl = useIntl();

  return (
    <Stack
      spacing={8}
      sx={{
        width: 1,
        height: '100svh',
        alignItems: 'flex-start',
        p: { xs: 3, sm: 16 },
        background: `url('/images/splines-404.webp')`,
        backgroundPosition: `100% 100%`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <Typography
        py={3}
        sx={(theme) => ({
          fontSize: { xs: 32, sm: 56 },
          fontWeight: 800,
          background: theme.palette.background.gradient2,
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
      >
        {intl.formatMessage({ defaultMessage: 'Ooops...' })}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 28, sm: 40 },
          fontWeight: 700,
          maxWidth: '75%',
        }}
      >
        {intl.formatMessage({
          defaultMessage: `Sorry, we can't seem to find that page`,
        })}
      </Typography>
      <Button href="/" variant="action" sx={{ borderRadius: 8, minWidth: 300 }}>
        {intl.formatMessage({
          defaultMessage: 'Go back home',
        })}
      </Button>
    </Stack>
  );
};

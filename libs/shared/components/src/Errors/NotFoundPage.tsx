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
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
      <Button
        href="/"
        sx={{
          borderRadius: 8,
          minWidth: 300,
          color: 'text.primary',
          padding: 2,
          fontSize: { xs: 18, md: 20 },
          lineHeight: 1.6,
          fontWeight: 500,
          fontStyle: 'normal',
          '&:hover': {
            background: (theme) =>
              `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            opacity: 1,
          },
          '&:disabled': {
            opacity: 0.5,
            color: 'text.primary',
          },
        }}
      >
        {intl.formatMessage({
          defaultMessage: 'Go back home',
        })}
      </Button>
    </Stack>
  );
};

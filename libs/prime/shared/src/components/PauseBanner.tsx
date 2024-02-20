import { Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { EigenLogo, FaArrowUpRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const PauseBanner = () => {
  const intl = useIntl();

  return (
    <Stack
      sx={{
        height: { xs: 220, md: 120 },
        px: 6,
        py: 4,
        backgroundColor: 'common.black',
        color: 'common.white',
      }}
    >
      <Grid2 container rowGap={2}>
        <Grid2
          xs={12}
          md={1}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <EigenLogo
            sx={{ width: { xs: 32, md: 48 }, height: { xs: 36, md: 54 } }}
          />
        </Grid2>
        <Grid2 xs={12} md={7}>
          <Stack>
            <Typography
              fontSize={{ xs: 16, md: 20 }}
              fontWeight="medium"
              textAlign={{ xs: 'center', md: 'start' }}
            >
              {intl.formatMessage({
                defaultMessage: 'EigenLayer Deposits Have Closed',
              })}
            </Typography>
            <Typography
              fontSize={{ xs: 14, md: 18 }}
              textAlign={{ xs: 'center', md: 'start' }}
            >
              {intl.formatMessage({
                defaultMessage:
                  'Follow us on social media to stay up to date on deposits.',
              })}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer nofollow"
            href="https://twitter.com/primestaked"
            sx={{
              color: 'inherit',
              fontSize: { xs: 14, md: 16 },
              py: { xs: 1.5, md: 1 },
              whiteSpace: 'nowrap',
              ':hover': {
                color: 'text.primary',
                backgroundColor: 'common.white',
              },
            }}
          >
            {intl.formatMessage({ defaultMessage: 'Visit PrimeStaked on X' })}
            &nbsp;
            <FaArrowUpRightRegular
              sx={{ fontSize: 16, color: 'primary.main' }}
            />
          </Button>
        </Grid2>
      </Grid2>
    </Stack>
  );
};

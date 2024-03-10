import { Button, Stack, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { FaArrowUpRightRegular } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const PauseBanner = () => {
  const intl = useIntl();

  return (
    <Stack
      sx={{
        justifyContent: 'center',
        height: { xs: 220, md: 118 },
        px: 6,
        backgroundColor: 'common.black',
        color: 'common.white',
      }}
    >
      <Grid2 container rowGap={2}>
        <Grid2
          xs={12}
          md={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TokenIcon
            token={tokens.mainnet.ETH}
            sx={{ width: { xs: 32, md: 48 }, height: { xs: 36, md: 54 } }}
          />
        </Grid2>
        <Grid2 xs={12} md={8}>
          <Stack
            sx={{ alignItems: { xs: 'center', md: 'flex-start' }, gap: 0.5 }}
          >
            <Typography
              fontSize={{ xs: 20, md: 24 }}
              fontWeight="medium"
              noWrap
            >
              {intl.formatMessage({
                defaultMessage: 'Native ETH Restaking is Live!',
              })}
            </Typography>
            <Typography fontSize={{ xs: 14, md: 18 }} noWrap>
              {intl.formatMessage({
                defaultMessage:
                  'Earn Boosted EigenLayer points and maximize your XP',
              })}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
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

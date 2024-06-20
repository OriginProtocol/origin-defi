import { Button, Stack, Typography } from '@mui/material';
import { TokenIcon } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { YieldNest } from '@origin/shared/icons';
import { useIntl } from 'react-intl';

export const StakeView = () => {
  const intl = useIntl();

  return (
    <Stack>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 8,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ svg: { fontSize: 48 }, mb: 6 }}
        >
          <TokenIcon token={tokens.mainnet.primeETH} />
          <YieldNest />
        </Stack>
        <Typography variant="h3">
          {intl.formatMessage({
            defaultMessage: 'PrimeEth is now YieldNest LSD!',
          })}
        </Typography>
        <Typography color="text.secondary">
          {intl.formatMessage({
            defaultMessage:
              'Visit the YieldNest dApp to start earning juicy rewards.',
          })}
        </Typography>
      </Stack>
      <Stack p={3}>
        <Button
          href="https://app.yieldnest.finance/"
          target="_blank"
          rel="noopener noreferrer nofollow"
          fullWidth
          sx={{ p: 2, fontSize: 20, borderRadius: 24 }}
        >
          {intl.formatMessage({ defaultMessage: 'Visit YieldNest App' })}
        </Button>
      </Stack>
    </Stack>
  );
};

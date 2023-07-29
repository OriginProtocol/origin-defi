// placeholder component until we actually start migration
import { Box, Button, Container, Stack } from '@mui/material';
import { APY, Portfolio, Swap, SwapRoute, TopNav } from '@origin/defi/oeth';
import { useIntl } from 'react-intl';

export function OethRoot() {
  const intl = useIntl();
  return (
    <>
      <TopNav sx={{ marginBlockStart: 2 }} />
      <Container
        maxWidth="md"
        sx={{
          mt: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.75fr' },
            gap: 3,
          }}
        >
          <APY />

          <Portfolio />
        </Box>
        <Stack gap={3} mt={3}>
          <Swap />
          <SwapRoute />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={(theme) => ({
              py: 2.5,
              fontWeight: 'bold',
              fontSize: theme.typography.pxToRem(20),
            })}
          >
            Connect Wallet
          </Button>
        </Stack>
      </Container>
    </>
  );
}

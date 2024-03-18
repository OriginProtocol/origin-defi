import { Container, Stack } from '@mui/material';
import { ApyHeader, trackEvent, trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { Redeemer, RequireChain } from '@origin/shared/providers';
import { mainnet } from 'viem/chains';

export const RedeemView = () => {
  return (
    <Container
      sx={{
        mt: 3,
        mb: 10,
      }}
      maxWidth="sm"
    >
      <RequireChain sectionName={'Redeem'} chain={mainnet}>
        <Stack spacing={3}>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <ApyHeader />
          </ErrorBoundary>
          <ErrorBoundary
            ErrorComponent={<ErrorCard />}
            onError={trackSentryError}
          >
            <Redeemer
              tokenIn={tokens.mainnet.OETH}
              vaultContract={contracts.mainnet.OETHVault}
              trackEvent={trackEvent}
              onError={trackSentryError}
              buttonsProps={{ variant: 'action' }}
            />
          </ErrorBoundary>
        </Stack>
      </RequireChain>
    </Container>
  );
};

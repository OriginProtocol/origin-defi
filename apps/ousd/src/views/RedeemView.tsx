import { Stack } from '@mui/material';
import { trackEvent, trackSentryError } from '@origin/ousd/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { Redeemer } from '@origin/shared/providers';

export const RedeemView = () => {
  return (
    <Stack spacing={3}>
      {/* <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ApyHeader />
      </ErrorBoundary> */}
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <Redeemer
          tokenIn={tokens.mainnet.OUSD}
          vaultContract={contracts.mainnet.OUSDVault}
          trackEvent={trackEvent}
          onError={trackSentryError}
        />
      </ErrorBoundary>
    </Stack>
  );
};

import { Stack } from '@mui/material';
import { ApyHeader, trackEvent, trackSentryError } from '@origin/oeth/shared';
import { ErrorBoundary, ErrorCard } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { Redeemer } from '@origin/shared/providers';

export const RedeemView = () => {
  return (
    <Stack spacing={3}>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <ApyHeader />
      </ErrorBoundary>
      <ErrorBoundary ErrorComponent={<ErrorCard />} onError={trackSentryError}>
        <Redeemer
          tokenIn={tokens.mainnet.OETH}
          vaultContract={contracts.mainnet.OETHVault}
          trackEvent={trackEvent}
          onError={trackSentryError}
          buttonsProps={{ variant: 'action' }}
        />
      </ErrorBoundary>
    </Stack>
  );
};

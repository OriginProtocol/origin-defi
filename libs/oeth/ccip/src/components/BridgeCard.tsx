import { Box, Card, CardContent, CardHeader, Stack } from '@mui/material';
import {
  ArrowButton,
  disabledTokenInputStyleProps,
  TokenInput,
  tokenInputStyleProps,
} from '@origin/shared/components';
import { ChainButton } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ChainlinkCCIP } from '@origin/shared/icons';
import { ConnectedButton } from '@origin/shared/providers';
import { useIntl } from 'react-intl';

import { useBridgeState } from '../state';

import type { Chain } from 'viem/chains';

export const BridgeCard = () => {
  const intl = useIntl();
  const { state } = useBridgeState();

  return (
    <Card sx={{ width: { xs: 350, sm: 550 } }}>
      <CardHeader title={'Bridge'} />
      <CardContent>
        <Stack spacing={2}>
          <BridgeFrom chain={state.srcChain} />
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={0n}
            token={tokens.mainnet.wOETH}
            {...tokenInputStyleProps}
          />
        </Stack>
      </CardContent>
      <BridgeDivider />
      <CardContent>
        <Stack spacing={2}>
          <BridgeTo chain={state.dstChain} />
          <Box>
            {intl.formatMessage({ defaultMessage: 'You will receive' })}
          </Box>
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={0n}
            token={tokens.mainnet.wOETH}
            {...disabledTokenInputStyleProps}
          />
          <Stack direction={'row'}>
            <Box flex={1} color={'text.secondary'}>
              {intl.formatMessage({ defaultMessage: 'Router' })}
            </Box>
            <Box>Chainlink CCIP</Box>
          </Stack>
          <Stack direction={'row'}>
            <Box flex={1} color={'text.secondary'}>
              {intl.formatMessage({ defaultMessage: 'Est. time' })}
            </Box>
            <Box>7 minutes (TODO)</Box>
          </Stack>
          <ConnectedButton
            fullWidth
            disabled={true}
            onClick={undefined}
            sx={{ mt: 1.5 }}
            variant={'action'}
          >
            {intl.formatMessage({ defaultMessage: 'Enter an amount' })}
          </ConnectedButton>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            spacing={1}
          >
            <ChainlinkCCIP />
            <Box>
              {intl.formatMessage({
                defaultMessage: 'Powered by Chainlink CCIP',
              })}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export const BridgeFrom = (props: { chain: Chain }) => (
  <Stack direction={'row'} alignItems={'center'} spacing={2}>
    <Box>From</Box>
    <ChainButton chain={props.chain} isDisabled />
  </Stack>
);
export const BridgeTo = (props: { chain: Chain }) => (
  <Stack direction={'row'} alignItems={'center'} spacing={2}>
    <Box>To</Box>
    <ChainButton chain={props.chain} isDisabled />
  </Stack>
);

export const BridgeDivider = () => {
  const { toggleChain } = useBridgeState();
  return (
    <Stack direction={'row'} position={'relative'} marginY={1}>
      <Box sx={{ flex: 1, backgroundColor: 'divider', height: '1px' }} />
      <ArrowButton onClick={toggleChain} />
    </Stack>
  );
};

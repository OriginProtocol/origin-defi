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
import { ConnectedButton, getTokenPriceKey } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useBridgeState } from '../state';
import { useBridgePrices } from '../state/useBridgePrices';

import type { Chain } from 'viem/chains';

export const BridgeCard = () => {
  const intl = useIntl();
  const { chain: currentChain } = useAccount();
  const { state, changeAmount } = useBridgeState();
  const prices = useBridgePrices();

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={'Bridge'} />
      <CardContent>
        <Stack spacing={2}>
          <BridgeFrom chain={state.srcChain} />
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={state.amount}
            onAmountChange={changeAmount}
            balance={state.srcBalance}
            isBalanceLoading={state.isSrcBalanceLoading}
            tokenPriceUsd={prices.data?.[getTokenPriceKey(state.srcToken)]}
            isPriceLoading={prices.isLoading}
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
            amount={state.amount}
            balance={state.dstBalance}
            isBalanceLoading={state.isDstBalanceLoading}
            tokenPriceUsd={prices.data?.[getTokenPriceKey(state.dstToken)]}
            isPriceLoading={prices.isLoading}
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
          {currentChain?.id === state.srcChain.id && state.approval && (
            <ConnectedButton
              fullWidth
              disabled={!state.approval.enabled}
              onClick={state.approval.action}
              sx={{ mt: 1.5 }}
              variant={'action'}
              targetChainId={state.srcChain.id}
            >
              {state.approval.message}
            </ConnectedButton>
          )}
          {state.bridge && (
            <ConnectedButton
              fullWidth
              disabled={!state.bridge.enabled}
              onClick={state.bridge.action}
              sx={{ mt: 1.5 }}
              variant={'action'}
              targetChainId={state.srcChain.id}
            >
              {state.bridge.message}
            </ConnectedButton>
          )}

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

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowButton,
  disabledTokenInputStyleProps,
  TokenInput,
  tokenInputStyleProps,
} from '@origin/shared/components';
import { ChainButton } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import { ChainlinkCCIP } from '@origin/shared/icons';
import { ConnectedButton, useWatchBalance } from '@origin/shared/providers';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useBridgeState } from '../state';
import { useBridgePrices } from '../state/useBridgePrices';
import { useToggleBridgeChain } from '../state/useToggleBridgeChain';

export const BridgeCard = () => {
  const intl = useIntl();
  const { chain: currentChain } = useAccount();
  const { state, changeAmount } = useBridgeState();
  const prices = useBridgePrices();

  // Get Balances
  const { data: srcBalance, isLoading: isSrcBalanceLoading } = useWatchBalance(
    state.srcToken,
  );
  const { data: dstBalance, isLoading: isDstBalanceLoading } = useWatchBalance(
    state.dstToken,
  );

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Bridge' })} />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'From' })}
            </Typography>
            <ChainButton chain={state.srcChain} isDisabled />
          </Stack>
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={state.amount}
            onAmountChange={changeAmount}
            balance={srcBalance}
            isBalanceLoading={isSrcBalanceLoading}
            tokenPriceUsd={prices.srcPrice}
            isPriceLoading={prices.isLoading}
            token={tokens.mainnet.wOETH}
            {...tokenInputStyleProps}
          />
        </Stack>
      </CardContent>
      <BridgeDivider />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'To' })}
            </Typography>
            <ChainButton chain={state.dstChain} isDisabled />
          </Stack>
          <Box>
            {intl.formatMessage({ defaultMessage: 'You will receive' })}
          </Box>
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={state.amount}
            balance={dstBalance}
            isBalanceLoading={isDstBalanceLoading}
            tokenPriceUsd={prices.dstPrice}
            isPriceLoading={prices.isLoading}
            token={tokens.mainnet.wOETH}
            hideMaxButton
            {...disabledTokenInputStyleProps}
          />
          <Stack direction={'row'}>
            <Box flex={1} color={'text.secondary'}>
              {intl.formatMessage({ defaultMessage: 'Router' })}
            </Box>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'Chainlink CCIP' })}
            </Typography>
          </Stack>
          <Stack direction={'row'}>
            <Box flex={1} color={'text.secondary'}>
              {intl.formatMessage({ defaultMessage: 'Est. time' })}
            </Box>
            <Box>
              {intl.formatMessage(
                { defaultMessage: '~{from} to {to} minutes' },
                {
                  from: 15,
                  to: 30,
                },
              )}
            </Box>
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
              {intl.formatMessage(state.approval.message)}
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
              {intl.formatMessage(state.bridge.message)}
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

export const BridgeDivider = () => {
  const toggleChain = useToggleBridgeChain();
  return (
    <Stack direction={'row'} position={'relative'} marginY={{ sm: 2, md: 1 }}>
      <Box sx={{ flex: 1, backgroundColor: 'divider', height: '1px' }} />
      <ArrowButton onClick={toggleChain} />
    </Stack>
  );
};

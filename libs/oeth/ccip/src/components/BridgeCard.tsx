import { useEffect } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import {
  ArrowButton,
  disabledTokenInputStyleProps,
  ExternalLink,
  TokenInput,
  tokenInputStyleProps,
} from '@origin/shared/components';
import { ChainButton } from '@origin/shared/components';
import { getTokenId, tokens } from '@origin/shared/contracts';
import { ChainlinkCCIP, FaCircleCheckRegular } from '@origin/shared/icons';
import { ConnectedButton, useWatchBalances } from '@origin/shared/providers';
import { formatAmount } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import { useAccount } from 'wagmi';

import { useApprove } from '../hooks/useApprove';
import { useBridge } from '../hooks/useBridge';
import { useBridgePrices } from '../hooks/useBridgePrices';
import { useChangeAmount } from '../hooks/useChangeAmount';
import { useToggleBridgeChain } from '../hooks/useToggleBridgeChain';
import { useBridgeState } from '../state';

export const BridgeCard = () => {
  const intl = useIntl();
  const { chain: currentChain } = useAccount();
  const previousChain = usePrevious(currentChain);
  const [{ amount, srcChain, srcToken, dstChain, dstToken, approval, bridge }] =
    useBridgeState();
  const toggleChain = useToggleBridgeChain();
  const handleChangeAmount = useChangeAmount();
  const doApproval = useApprove();
  const doBridge = useBridge();

  const prices = useBridgePrices();

  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [srcToken, dstToken],
  });

  // Toggle chain if the network has switched and dstChain is the network we switched to.
  useEffect(() => {
    if (
      previousChain?.id !== currentChain?.id &&
      dstChain.id === currentChain?.id
    ) {
      toggleChain();
    }
  }, [previousChain?.id, currentChain?.id, dstChain.id, toggleChain]);

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Bridge' })} />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'From' })}
            </Typography>
            <ChainButton chain={srcChain} isDisabled />
          </Stack>
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={amount}
            onAmountChange={handleChangeAmount}
            balance={balances?.[getTokenId(srcToken)]}
            isBalanceLoading={isBalancesLoading}
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
            <ChainButton chain={dstChain} isDisabled />
          </Stack>
          <Box>
            {intl.formatMessage({ defaultMessage: 'You will receive' })}
          </Box>
          <TokenInput
            isConnected={true}
            isTokenClickDisabled={true}
            amount={amount}
            balance={balances?.[getTokenId(dstToken)]}
            isBalanceLoading={isBalancesLoading}
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
          {currentChain?.id !== srcChain.id ? (
            <ConnectedButton variant={'action'} targetChainId={srcChain.id} />
          ) : (
            <>
              <Collapse
                in={Boolean(currentChain?.id === srcChain.id && approval)}
              >
                <ConnectedButton
                  fullWidth
                  disabled={!approval?.enabled}
                  onClick={doApproval}
                  sx={{ mt: 1.5 }}
                  variant={'action'}
                  targetChainId={srcChain.id}
                >
                  {approval && intl.formatMessage(approval.message)}
                </ConnectedButton>
              </Collapse>
              {bridge && (
                <ConnectedButton
                  fullWidth
                  disabled={!bridge?.enabled}
                  onClick={bridge?.enabled ? doBridge : undefined}
                  sx={{ mt: 1.5 }}
                  variant={'action'}
                >
                  {bridge &&
                    intl.formatMessage(bridge.message, {
                      symbol: srcToken.symbol,
                    })}
                </ConnectedButton>
              )}
            </>
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
      <BridgeSuccessDialog />
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

export const BridgeSuccessDialog = () => {
  const intl = useIntl();
  return null;
  return (
    <Dialog open={true}>
      <DialogTitle display={'flex'} alignItems={'center'} gap={1}>
        <FaCircleCheckRegular sx={{ color: 'success.main', fontSize: 18 }} />
        <Typography>
          {intl.formatMessage({ defaultMessage: 'Bridge Request Successful' })}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <Stack direction={'row'}>
            <Typography>
              {intl.formatMessage(
                {
                  defaultMessage:
                    'Sending {amountIn} {tokenIn} from {chainIn} to {chainOut}.',
                },
                {
                  amountIn: formatAmount(0n),
                },
              )}
            </Typography>
            <Typography></Typography>
          </Stack>
          <ExternalLink
            href={
              'https://ccip.chain.link/msg/0xa07ca8c734bf23ac8e6b332e629a13c6bbc2b10b2c8e4f6673f38612021f3ec1'
            }
          >
            {intl.formatMessage({ defaultMessage: 'CCIP Explorer Status' })}
          </ExternalLink>
          <ExternalLink
            href={
              'https://ccip.chain.link/msg/0xa07ca8c734bf23ac8e6b332e629a13c6bbc2b10b2c8e4f6673f38612021f3ec1'
            }
          >
            {intl.formatMessage({ defaultMessage: 'Transaction' })}
          </ExternalLink>
          <Typography fontSize={14} color={'text.secondary'}>
            {intl.formatMessage({
              defaultMessage:
                'Your transfer is expected to take between 15 and 30 minutes. ' +
                'This is an estimate and actual times may vary due to network conditions.',
            })}
          </Typography>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

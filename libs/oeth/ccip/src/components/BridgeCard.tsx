import { useEffect } from 'react';

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
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
import { getTokenId, tokens } from '@origin/shared/contracts';
import { ChainlinkCCIP } from '@origin/shared/icons';
import {
  ApprovalButton,
  TransactionButton,
  useWatchBalances,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import { encodeAbiParameters } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { ccipRouter } from '../constants';
import { useBridgePrices } from '../hooks/useBridgePrices';
import { useChangeAmount } from '../hooks/useChangeAmount';
import { useResetBridgeState } from '../hooks/useResetBridgeState';
import { useToggleBridgeChain } from '../hooks/useToggleBridgeChain';
import { useBridgeState } from '../state';

import type { HexAddress } from '@origin/shared/utils';
import type { erc20Abi } from 'viem';

export const BridgeCard = () => {
  const intl = useIntl();
  const {
    chain: currentChain,
    address: userAddress,
    isConnected,
  } = useAccount();
  const previousChain = usePrevious(currentChain);
  const [{ amount, srcChain, srcToken, dstChain, dstToken }] = useBridgeState();
  const toggleChain = useToggleBridgeChain();
  const handleChangeAmount = useChangeAmount();
  const reset = useResetBridgeState();
  const prices = useBridgePrices();
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [srcToken, dstToken],
  });
  const srcBalance = balances?.[getTokenId(srcToken)];
  const srcRouter = ccipRouter[srcChain.id];
  const dstRouter = ccipRouter[dstChain.id];
  const message = userAddress
    ? ({
        receiver: encodeAbiParameters([{ type: 'address' }], [userAddress]),
        data: '0x',
        tokenAmounts: [
          { token: srcToken.address as HexAddress, amount: amount },
        ],
        feeToken: ZERO_ADDRESS,
        extraArgs: '0x',
      } as const)
    : undefined;
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract({
    chainId: srcToken.chainId,
    address: srcToken.address,
    abi: srcToken.abi as typeof erc20Abi,
    functionName: 'allowance',
    args: [userAddress ?? ZERO_ADDRESS, srcRouter.address],
    query: { enabled: !!userAddress },
  });
  const { data: fees, isLoading: isFeesLoading } = useReadContract({
    address: srcRouter.address,
    abi: srcRouter.abi,
    functionName: 'getFee',
    args: [dstRouter.chainSelectorId, message],
    chainId: srcRouter.chainId,
    query: {
      enabled: !!userAddress && !!message,
    },
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

  const requiresApproval =
    !isAllowanceLoading &&
    currentChain?.id === srcChain.id &&
    allowance !== undefined &&
    allowance < amount;
  const bridgeButtonDisabled =
    !isConnected ||
    (allowance ?? 0n) < amount ||
    isFeesLoading ||
    amount === 0n ||
    amount > (balances?.[getTokenId(srcToken)] ?? 0n);
  const bridgeButtonLabel =
    amount === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : srcBalance !== undefined && srcBalance < amount
        ? intl.formatMessage({
            defaultMessage: 'Insufficient amount',
          })
        : intl.formatMessage(
            { defaultMessage: 'Bridge {symbol}' },
            {
              symbol: srcToken.symbol,
            },
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
            <ChainButton chain={srcChain} disabled />
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
            <ChainButton chain={dstChain} disabled />
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
          <Collapse in={requiresApproval}>
            <ApprovalButton
              amount={amount}
              token={srcToken}
              spender={srcRouter.address}
              fullWidth
              sx={{ mt: 1.5 }}
              variant={'action'}
              onSuccess={() => {
                refetchAllowance?.();
              }}
            />
          </Collapse>
          <TransactionButton
            contract={srcRouter}
            functionName="ccipSend"
            args={[dstRouter.chainSelectorId, message]}
            value={fees as unknown as bigint}
            disabled={bridgeButtonDisabled}
            targetChainId={srcChain.id}
            activityInput={{
              type: 'bridge',
              status: 'pending',
              amountIn: amount,
              tokenIn: srcToken,
              tokenOut: dstToken,
            }}
            onSuccess={() => {
              reset();
              refetchAllowance?.();
            }}
            fullWidth
            sx={{ mt: 1.5 }}
            variant={'action'}
            label={bridgeButtonLabel}
          />
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

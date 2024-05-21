import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import { TokenInput } from '@origin/defi/shared';
import { ArrowButton, InfoTooltip } from '@origin/shared/components';
import { ChainButton } from '@origin/shared/components';
import {
  contracts,
  getNativeToken,
  getTokenId,
} from '@origin/shared/contracts';
import { ChainlinkCCIP } from '@origin/shared/icons';
import {
  ApprovalButton,
  isNativeCurrency,
  TxButton,
  useTxButton,
  useWatchBalances,
} from '@origin/shared/providers';
import { formatAmount, ZERO_ADDRESS } from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { useIntl } from 'react-intl';
import { decodeEventLog, formatUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { ccipRouter } from '../constants';
import { useBridgePrices } from '../hooks/useBridgePrices';
import { useCcipTxParams } from '../hooks/useCcipTxParams';
import { useChangeAmount } from '../hooks/useChangeAmount';
import { useResetBridgeState } from '../hooks/useResetBridgeState';
import { useToggleBridgeChain } from '../hooks/useToggleBridgeChain';
import { useBridgeState } from '../state';
import { TokenSelectModal } from './TokenSelectModal';

import type { HexAddress } from '@origin/shared/utils';
import type { erc20Abi, Hex, TransactionReceipt } from 'viem';

export const BridgeCard = () => {
  const intl = useIntl();
  const {
    chain: currentChain,
    address: userAddress,
    isConnected,
  } = useAccount();
  const previousChain = usePrevious(currentChain);
  const [
    { amount, srcChain, srcToken, srcTokens, dstChain, dstToken, dstTokens },
    setBridgeState,
  ] = useBridgeState();
  const [tokenSource, setTokenSource] = useState<
    'srcToken' | 'dstToken' | null
  >(null);
  const toggleChain = useToggleBridgeChain();
  const handleChangeAmount = useChangeAmount();
  const reset = useResetBridgeState();
  const prices = useBridgePrices();
  const nativeToken = getNativeToken(srcChain);
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [nativeToken, srcToken, dstToken],
  });

  const srcBalance = balances?.[getTokenId(srcToken)];
  const srcRouter = ccipRouter[srcChain.id];

  const isErc20 = !isNativeCurrency(srcToken);

  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract(
    isErc20
      ? {
          chainId: srcToken.chainId,
          address: srcToken.address,
          abi: srcToken.abi as typeof erc20Abi,
          functionName: 'allowance',
          args: [userAddress ?? ZERO_ADDRESS, srcRouter.address],
          query: { enabled: !!userAddress },
        }
      : undefined,
  );

  const ccipTxParams = useCcipTxParams({
    srcChain,
    dstChain,
    srcToken,
    dstToken,
    amount,
  });

  const txButton = useTxButton({
    params: ccipTxParams.data?.params ?? {
      contract: srcRouter,
      functionName: 'ccipSend',
      args: [] as any,
      value: 0n,
    },
    activity: {
      title: intl.formatMessage({ defaultMessage: 'Bridge Transaction' }),
      subtitle: intl.formatMessage(
        {
          defaultMessage:
            'Sending ~{srcAmount} {srcToken} from {srcChain} to {dstToken} on {dstChain}.',
        },
        {
          srcAmount: formatAmount(amount),
          srcToken: srcToken.symbol,
          srcChain: srcChain.name,
          dstToken: dstToken.symbol,
          dstChain: dstChain.name,
        },
      ),
      type: 'bridge',
      amountIn: amount,
      tokenIn: srcToken,
      tokenOut: dstToken,
    },
    callbacks: {
      onWriteSuccess: (tx) => {
        reset({
          waitForTransfer: createOptimisticTransferObject(
            tx,
            srcChain.id,
            dstChain.id,
            dstToken.address as Hex,
            userAddress as Hex,
          ),
        });
        refetchAllowance?.();
      },
    },
    enableGas: true,
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

  const insufficientAmount = srcBalance !== undefined && srcBalance < amount;
  const insufficientNativeBalance =
    !txButton.params?.value ||
    !balances ||
    balances[getTokenId(nativeToken)] < txButton.params?.value;
  const requiresApproval =
    isErc20 &&
    !isAllowanceLoading &&
    !isBalancesLoading &&
    currentChain?.id === srcChain.id &&
    allowance !== undefined &&
    allowance < amount &&
    !insufficientAmount;

  const bridgeButtonDisabled =
    !isConnected || requiresApproval || amount === 0n || insufficientAmount;
  const bridgeButtonLabel =
    amount === 0n
      ? intl.formatMessage({ defaultMessage: 'Enter an amount' })
      : insufficientNativeBalance
        ? intl.formatMessage(
            {
              defaultMessage: 'Insufficient {symbol}',
            },
            { symbol: nativeToken.symbol },
          )
        : insufficientAmount
          ? intl.formatMessage(
              {
                defaultMessage: 'Insufficient {symbol}',
              },
              { symbol: srcToken.symbol },
            )
          : intl.formatMessage(
              { defaultMessage: 'Bridge {symbol}' },
              {
                symbol: srcToken.symbol,
              },
            );

  const estimateGasFee = txButton.gasPrice?.gasCostWei;
  const bridgeFee = ccipTxParams.data
    ? Number(formatUnits(ccipTxParams.data.fee, 18))
    : undefined;

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
            hideMaxButton={srcChain.nativeCurrency.symbol === srcToken.symbol}
            isTokenClickDisabled={srcTokens.length === 1}
            amount={amount}
            onAmountChange={handleChangeAmount}
            balance={balances?.[getTokenId(srcToken)]}
            isBalanceLoading={isBalancesLoading}
            tokenPriceUsd={prices.srcPrice}
            isPriceLoading={prices.isLoading}
            token={srcToken}
            onTokenClick={() => setTokenSource('srcToken')}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 3,
              backgroundColor: 'background.highlight',
              border: '1px solid',
              borderColor: 'divider',
            }}
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
          <Stack direction={'row'} alignItems={'center'}>
            {ccipTxParams.data?.isEstimate ? (
              <>
                {intl.formatMessage({
                  defaultMessage: 'You will receive approximately',
                })}
                <InfoTooltip
                  sx={{ ml: 2 }}
                  iconSize={18}
                  tooltipLabel={intl.formatMessage({
                    defaultMessage:
                      'Exact amount received depends on a fluctuating bridge fee' +
                      ' which cannot be guaranteed through the zapper.' +
                      ' The amount you receive on the destination chain will be' +
                      ' the amount you send converted to wOETH,' +
                      ' plus the estimated bridge fee,' +
                      ' minus the actual bridge fee.',
                  })}
                />
              </>
            ) : (
              intl.formatMessage({ defaultMessage: 'You will receive' })
            )}
          </Stack>
          <TokenInput
            readOnly
            isTokenClickDisabled={dstTokens.length === 1}
            amount={ccipTxParams.data?.amountOut ?? 0n}
            balance={balances?.[getTokenId(dstToken)]}
            isBalanceLoading={isBalancesLoading}
            tokenPriceUsd={prices.dstPrice}
            isPriceLoading={prices.isLoading}
            token={dstToken}
            onTokenClick={() => setTokenSource('dstToken')}
            hideMaxButton
            sx={{
              px: 3,
              py: 2,
              borderRadius: 3,
              backgroundColor: 'background.highlight',
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
          <Accordion
            sx={{
              p: 2,
              backgroundColor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
            }}
          >
            <AccordionDetails
              sx={{
                p: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                fontSize: 14,
              }}
            >
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
              <Stack direction={'row'}>
                <Box flex={1} color={'text.secondary'}>
                  {intl.formatMessage({ defaultMessage: 'Est. bridge fee' })}
                </Box>
                <Box>
                  {typeof bridgeFee === 'number'
                    ? `${formatAmount(bridgeFee)} ${srcChain.nativeCurrency.symbol}`
                    : '-'}
                </Box>
              </Stack>
              <Stack direction={'row'}>
                <Box flex={1} color={'text.secondary'}>
                  {intl.formatMessage({ defaultMessage: 'Est. gas fee' })}
                </Box>
                <Box>
                  {typeof estimateGasFee === 'number'
                    ? `${formatAmount(estimateGasFee)} ${srcChain.nativeCurrency.symbol}`
                    : '-'}
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
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
          <TxButton
            params={txButton.params}
            callbacks={txButton.callbacks}
            label={bridgeButtonLabel}
            disabled={bridgeButtonDisabled}
            fullWidth
            sx={{ mt: 1.5 }}
            variant={'action'}
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
      <TokenSelectModal
        open={tokenSource !== null}
        onClose={() => setTokenSource(null)}
        selectedToken={tokenSource === 'srcToken' ? srcToken : dstToken}
        tokens={tokenSource === 'srcToken' ? srcTokens : dstTokens}
        onSelectToken={(token) =>
          setBridgeState((state) => {
            if (!tokenSource) return state;
            return {
              ...state,
              [tokenSource]: token,
            };
          })
        }
      />
    </Card>
  );
};

export const BridgeDivider = () => {
  const toggleChain = useToggleBridgeChain();
  return (
    <Stack direction={'row'} position={'relative'} marginY={{ xs: 2, md: 1 }}>
      <Box sx={{ flex: 1, backgroundColor: 'divider', height: '1px' }} />
      <ArrowButton onClick={toggleChain} />
    </Stack>
  );
};

function createOptimisticTransferObject(
  tx: TransactionReceipt,
  chainIn: number,
  chainOut: number,
  tokenOut: `0x${string}`,
  userAddress: `0x${string}`,
) {
  const ccipSendRequestedTopic =
    '0xd0c3c799bf9e2639de44391e7f524d229b2b55f5b1ea94b2bf7da42f7243dddd';
  const ccipSendRequested = tx.logs.find(
    (l) => l.topics[0] === ccipSendRequestedTopic,
  );
  let waitForTransfer = undefined;
  if (ccipSendRequested) {
    const ccipSendRequestedData = decodeEventLog({
      abi: contracts.mainnet.ccipOnRamp.abi,
      data: ccipSendRequested.data,
      topics: [ccipSendRequestedTopic],
    }) as unknown as {
      args: {
        message: {
          messageId: Hex;
          tokenAmounts: { token: HexAddress; amount: bigint }[];
        };
      };
    };
    if (ccipSendRequestedData.args) {
      const messageId = ccipSendRequestedData.args.message.messageId;
      const tokenIn = ccipSendRequestedData.args.message.tokenAmounts[0]?.token;
      const amountIn =
        ccipSendRequestedData.args.message.tokenAmounts[0]?.amount;
      const amountOut =
        ccipSendRequestedData.args.message.tokenAmounts[0]?.amount;

      waitForTransfer = {
        id: tx.transactionHash,
        blockNumber: Number(tx.blockNumber),
        timestamp: new Date().toISOString(),
        messageId: messageId,
        txHashIn: tx.transactionHash,
        txHashOut: undefined,
        amountIn: amountIn.toString(),
        amountOut: amountOut.toString(),
        chainIn,
        chainOut,
        tokenIn: tokenIn,
        tokenOut: tokenOut ?? ZERO_ADDRESS,
        bridge: 'ccip',
        state: 0,
        transactor: userAddress as string,
        sender: userAddress as string,
        receiver: userAddress as string,
      };
    }
  }
  return waitForTransfer;
}

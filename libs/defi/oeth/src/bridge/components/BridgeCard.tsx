import { useEffect, useState } from 'react';

import {
  Accordion,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  emphasize,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  TokenInput,
  useApprovalButton,
  useTxButton,
} from '@origin/defi/shared';
import {
  InfoTooltipLabel,
  NetworkIcon,
  ValueLabel,
} from '@origin/shared/components';
import { contracts, getNativeToken } from '@origin/shared/contracts';
import { ChainlinkCCIP, FaArrowDownRegular } from '@origin/shared/icons';
import {
  isNativeCurrency,
  TxButton,
  useWatchBalances,
} from '@origin/shared/providers';
import {
  getFormatPrecision,
  isNilOrEmpty,
  ZERO_ADDRESS,
} from '@origin/shared/utils';
import { usePrevious } from '@react-hookz/web';
import { add, eq, format, from } from 'dnum';
import { useIntl } from 'react-intl';
import { decodeEventLog } from 'viem';
import { arbitrum } from 'viem/chains';
import { useAccount } from 'wagmi';

import { ccipRouter } from '../constants';
import { useBridgePrices } from '../hooks/useBridgePrices';
import { useCcipTxParams } from '../hooks/useCcipTxParams';
import { useChangeAmount } from '../hooks/useChangeAmount';
import { useResetBridgeState } from '../hooks/useResetBridgeState';
import { useToggleBridgeChain } from '../hooks/useToggleBridgeChain';
import { useBridgeState } from '../state';
import { TokenSelectModal } from './TokenSelectModal';

import type {
  SupportedChain,
  ValueLabelProps,
} from '@origin/shared/components';
import type { HexAddress } from '@origin/shared/utils';
import type { Dnum } from 'dnum';
import type { Hex, TransactionReceipt } from 'viem';

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

  const srcBalance = balances?.[srcToken.id];
  const srcRouter = ccipRouter[srcChain.id];

  const isErc20 = !isNativeCurrency(srcToken);

  const ccipTxParams = useCcipTxParams({
    srcChain,
    dstChain,
    srcToken,
    dstToken,
    amount,
  });
  const {
    allowance,
    params: approvalParams,
    callbacks: approvalCallbacks,
    label: approvalLabel,
    gasPrice: approvalGasPrice,
  } = useApprovalButton({
    token: srcToken,
    spender: srcRouter.address,
    amount,
    enableGas: true,
    enableAllowance: true,
  });
  const txButton = useTxButton({
    params: ccipTxParams.data?.params ?? {
      contract: srcRouter,
      functionName: 'ccipSend',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args: [] as any,
      value: 0n,
    },
    activity: {
      type: 'bridge',
      status: 'idle',
      amountIn: amount,
      tokenIdIn: srcToken.id,
      tokenIdOut: dstToken.id,
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
    balances[nativeToken.id] < txButton.params?.value;
  const requiresApproval =
    isErc20 &&
    !isNilOrEmpty(allowance) &&
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
  const gasPrice = add(
    txButton?.gasPrice?.gasCostEther ?? from(0),
    (allowance ?? 0n) < amount
      ? (approvalGasPrice?.gasCostEther ?? from(0))
      : from(0),
  );
  const bridgeFee = [ccipTxParams?.data?.fee ?? 0n, 18] as Dnum;

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader title={intl.formatMessage({ defaultMessage: 'Bridge' })} />
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant="body2" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'From' })}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <NetworkIcon chainId={srcChain.id as SupportedChain} size={28} />
              <Typography variant="body2" fontWeight="bold">
                {srcChain.id === arbitrum.id ? 'Arbitrum' : srcChain.name}
              </Typography>
            </Stack>
          </Stack>
          <TokenInput
            hideMaxButton={srcChain.nativeCurrency.symbol === srcToken.symbol}
            isTokenClickDisabled={srcTokens.length === 1}
            amount={amount}
            onAmountChange={handleChangeAmount}
            balance={balances?.[srcToken.id]}
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
            <Typography variant="body2" fontWeight="medium">
              {intl.formatMessage({ defaultMessage: 'To' })}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <NetworkIcon chainId={dstChain.id as SupportedChain} size={28} />
              <Typography variant="body2" fontWeight="bold">
                {dstChain.id === arbitrum.id ? 'Arbitrum' : dstChain.name}
              </Typography>
            </Stack>
          </Stack>
          {ccipTxParams.data?.isEstimate ? (
            <InfoTooltipLabel
              tooltipLabel={intl.formatMessage({
                defaultMessage:
                  'Exact amount received depends on a fluctuating bridge fee' +
                  ' which cannot be guaranteed through the zapper.' +
                  ' The amount you receive on the destination chain will be' +
                  ' the amount you send converted to wOETH,' +
                  ' plus the estimated bridge fee,' +
                  ' minus the actual bridge fee.',
              })}
            >
              {intl.formatMessage({
                defaultMessage: 'You will receive approximately',
              })}
            </InfoTooltipLabel>
          ) : (
            <Typography>
              {intl.formatMessage({ defaultMessage: 'You will receive' })}
            </Typography>
          )}
          <TokenInput
            readOnly
            isTokenClickDisabled={dstTokens.length === 1}
            amount={ccipTxParams.data?.amountOut ?? 0n}
            balance={balances?.[dstToken.id]}
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
              <ValueLabel
                {...valueLabelProps}
                label={intl.formatMessage({ defaultMessage: 'Router' })}
                value={intl.formatMessage({ defaultMessage: 'Chainlink CCIP' })}
              />
              <ValueLabel
                {...valueLabelProps}
                label={intl.formatMessage({ defaultMessage: 'Est. time' })}
                value={intl.formatMessage(
                  { defaultMessage: '~{from} to {to} minutes' },
                  {
                    from: 15,
                    to: 30,
                  },
                )}
              />
              <ValueLabel
                {...valueLabelProps}
                label={intl.formatMessage({
                  defaultMessage: 'Est. bridge fee',
                })}
                value={
                  eq(bridgeFee, 0)
                    ? '-'
                    : `${format(bridgeFee, { digits: getFormatPrecision(bridgeFee), decimalsRounding: 'ROUND_UP' })} ${srcChain.nativeCurrency.symbol}`
                }
              />
              <ValueLabel
                {...valueLabelProps}
                label={intl.formatMessage({
                  defaultMessage: 'Est. gas fee',
                })}
                value={
                  eq(gasPrice[0], 0)
                    ? '-'
                    : `~${format(gasPrice, { digits: getFormatPrecision(gasPrice), decimalsRounding: 'ROUND_UP' })} ${srcChain.nativeCurrency.symbol}`
                }
              />
            </AccordionDetails>
          </Accordion>
          <Collapse in={requiresApproval}>
            <TxButton
              params={approvalParams}
              callbacks={approvalCallbacks}
              label={approvalLabel}
              fullWidth
              sx={{ mt: 1.5 }}
              variant={'action'}
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
    <Divider sx={{ '& .MuiDivider-wrapper': { px: 0 } }}>
      <IconButton
        onClick={toggleChain}
        sx={(theme) => ({
          width: { md: 50, xs: 42 },
          height: { md: 50, xs: 42 },
          zIndex: 2,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          svg: {
            transition: theme.transitions.create('transform'),
          },
          '&:hover': {
            backgroundColor: (theme) =>
              emphasize(theme.palette.background.paper, 0.1),
            svg: {
              transform: 'rotate(-180deg)',
            },
          },
        })}
      >
        <FaArrowDownRegular
          sx={{
            fontSize: { md: 18, xs: 14 },
          }}
        />
      </IconButton>
    </Divider>
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

const valueLabelProps: Partial<ValueLabelProps> = {
  direction: 'row',
  justifyContent: 'space-between',
  labelProps: {
    variant: 'body3',
    fontWeight: 'medium',
    color: 'text.secondary',
  },
  valueProps: { fontWeight: 'medium' },
};

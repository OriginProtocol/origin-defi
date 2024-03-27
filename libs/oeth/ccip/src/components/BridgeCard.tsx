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
import { contracts, getTokenId, tokens } from '@origin/shared/contracts';
import { ChainlinkCCIP } from '@origin/shared/icons';
import {
  ApprovalButton,
  TransactionButton,
  useWatchBalances,
} from '@origin/shared/providers';
import { ZERO_ADDRESS } from '@origin/shared/utils';
import { useIntl } from 'react-intl';
import { encodeAbiParameters } from 'viem';
import { mainnet } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';

import { selectorIds } from '../constants';
import {
  useBridgePrices,
  useHandleChangeAmount,
  useHandleToggleBridgeChain,
} from '../hooks';
import { useBridgeState } from '../state';

import type { erc20Abi } from 'viem';

export const BridgeCard = () => {
  const intl = useIntl();
  const { chain, address, isConnected } = useAccount();
  const [
    { amount, srcChain, srcToken, srcRouter, dstChain, dstToken },
    setState,
  ] = useBridgeState();
  const prices = useBridgePrices();
  const handleChangeAmount = useHandleChangeAmount();
  const { data: balances, isLoading: isBalancesLoading } = useWatchBalances({
    tokens: [srcToken, dstToken],
  });
  const {
    data: allowance,
    isLoading: isAllowanceLoading,
    refetch: refetchAllowance,
  } = useReadContract({
    chainId: srcToken.chainId,
    address: srcToken.address,
    abi: srcToken.abi as typeof erc20Abi,
    functionName: 'allowance',
    args: [address ?? ZERO_ADDRESS, srcRouter.address],
    query: {
      enabled: isConnected,
    },
  });
  const message = {
    receiver: encodeAbiParameters(
      [{ type: 'address' }],
      [address ?? ZERO_ADDRESS],
    ),
    data: '0x',
    tokenAmounts: [{ token: srcToken.address ?? ZERO_ADDRESS, amount }],
    feeToken: ZERO_ADDRESS,
    extraArgs: '0x',
  } as const;
  const { data: fees, isLoading: isFeesLoading } = useReadContract({
    address: srcRouter.address,
    abi: srcRouter.abi,
    functionName: 'getFee',
    args: [selectorIds[dstChain?.id ?? -1], message],
    chainId: srcRouter.chainId,
  });

  const needsApproval =
    chain?.id === srcChain.id &&
    isConnected &&
    !isAllowanceLoading &&
    (allowance ?? 0n) < amount;
  const bridgeDisabled =
    !isConnected ||
    chain?.id !== srcChain.id ||
    needsApproval ||
    isFeesLoading ||
    amount === 0n ||
    amount > (balances?.[getTokenId(srcToken)] ?? 0n);

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
          <Collapse in={needsApproval}>
            <ApprovalButton
              amount={amount}
              token={
                chain?.id === mainnet.id
                  ? tokens.mainnet.wOETH
                  : tokens.arbitrum.wOETH
              }
              spender={
                chain?.id === mainnet.id
                  ? contracts.mainnet.ccipRouter
                  : contracts.arbitrum.ccipRouter
              }
              fullWidth
              sx={{ mt: 1.5 }}
              variant={'action'}
              onSuccess={() => {
                refetchAllowance?.();
              }}
            />
          </Collapse>
          <TransactionButton
            contract={
              chain?.id === mainnet.id
                ? contracts.mainnet.ccipRouter
                : contracts.arbitrum.ccipRouter
            }
            functionName="ccipSend"
            args={[selectorIds[dstChain?.id ?? -1], message]}
            value={fees as unknown as bigint}
            fullWidth
            disabled={bridgeDisabled}
            sx={{ mt: 1.5 }}
            variant={'action'}
            label={intl.formatMessage({ defaultMessage: 'Bridge' })}
            onSuccess={(txReceipt) => {
              setState((state) => ({
                ...state,
                actionTx: txReceipt.transactionHash,
              }));
            }}
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
  const handleToggleChain = useHandleToggleBridgeChain();

  return (
    <Stack direction={'row'} position={'relative'} marginY={{ sm: 2, md: 1 }}>
      <Box sx={{ flex: 1, backgroundColor: 'divider', height: '1px' }} />
      <ArrowButton onClick={handleToggleChain} />
    </Stack>
  );
};

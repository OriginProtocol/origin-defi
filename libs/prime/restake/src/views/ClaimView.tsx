import {
  alpha,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { LrtWithdrawalStatus } from '@origin/prime/shared';
import { Countdown, LoadingLabel, TokenIcon } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import { FaCircleCheckRegular, WarningExclamation } from '@origin/shared/icons';
import {
  TxButton,
  useFormat,
  useTokenPrice,
  useTxButton,
} from '@origin/shared/providers';
import { isNilOrEmpty, ZERO_ADDRESS } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { add, isBefore } from 'date-fns';
import { format, from, mul } from 'dnum';
import { useIntl } from 'react-intl';
import { useAccount, useBlockNumber } from 'wagmi';

import { WAITING_BLOCK_AMOUNT } from '../constants';
import { useUserWithdrawalsQuery } from '../queries.generated';

import type { StackProps } from '@mui/material';
import type { HexAddress } from '@origin/shared/utils';

import type { UserWithdrawalsQuery } from '../queries.generated';

export const ClaimView = () => {
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { data: withdrawals, isLoading: iswithdrawalsLoading } =
    useUserWithdrawalsQuery(
      { address: address ?? ZERO_ADDRESS },
      {
        enabled: isConnected,
        select: (data) =>
          data?.lrtWithdrawalRequests?.filter(
            (r) => r.status === LrtWithdrawalStatus.Requested,
          ) ?? [],
      },
    );

  if (iswithdrawalsLoading) {
    return (
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={350}
      >
        <CircularProgress size={36} />
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Stack divider={<Divider />}>
        {isNilOrEmpty(withdrawals) ? (
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={350}
          >
            <Typography variant="h5">
              {intl.formatMessage({ defaultMessage: 'No withdrawal to claim' })}
            </Typography>
          </Stack>
        ) : (
          withdrawals?.map((r) => <ClaimCard key={r.id} request={r} />)
        )}
      </Stack>
    </Stack>
  );
};

type ClaimCardProps = {
  request: UserWithdrawalsQuery['lrtWithdrawalRequests'][number];
} & StackProps;

const ClaimCard = ({ request, ...rest }: ClaimCardProps) => {
  const intl = useIntl();
  const { formatAmount } = useFormat();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const { data: price, isLoading: isPriceLoading } = useTokenPrice('OETH_USD');
  const {
    params: claimParams,
    callbacks: claimCallbacks,
    gasPrice: claimGasPrice,
  } = useTxButton({
    params: {
      contract: contracts.mainnet.lrtDepositPool,
      functionName: 'claimWithdrawal',
      args: [
        {
          staker: request.withdrawal.staker as HexAddress,
          delegatedTo: request.withdrawal.delegatedTo as HexAddress,
          withdrawer: request.withdrawal.withdrawer as HexAddress,
          nonce: BigInt(request.withdrawal.nonce),
          startBlock: Number(request.withdrawal.startBlock),
          strategies: request.withdrawal.strategies as HexAddress[],
          shares: request.withdrawal?.shares?.map((s) => BigInt(s)) ?? [],
        },
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
    enableGas: true,
  });
  const {
    params: migrateParams,
    callbacks: migrateCallbacks,
    gasPrice: migrateGasPrice,
  } = useTxButton({
    params: {
      contract: contracts.mainnet.lrtDepositPool,
      functionName: 'claimWithdrawalYn',
      args: [
        {
          staker: request.withdrawal.staker as HexAddress,
          delegatedTo: request.withdrawal.delegatedTo as HexAddress,
          withdrawer: request.withdrawal.withdrawer as HexAddress,
          nonce: BigInt(request.withdrawal.nonce),
          startBlock: Number(request.withdrawal.startBlock),
          strategies: request.withdrawal.strategies as HexAddress[],
          shares: request.withdrawal?.shares?.map((s) => BigInt(s)) ?? [],
        },
      ],
    },
    callbacks: {
      onWriteSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
    enableGas: true,
  });

  const targetDate = add(new Date(request.timestamp), { days: 7 });
  const blocksLeft =
    request.blockNumber + WAITING_BLOCK_AMOUNT - Number(blockNumber ?? 0);
  const isClaimDisabled = !blockNumber || blocksLeft > 0;
  const pending = BigInt(request.assetAmount);
  const pendingConverted = mul(
    [pending, tokens.mainnet.OETH.decimals],
    price ?? 0,
  );

  return (
    <Stack {...rest}>
      <Stack direction="row" alignItems="center" p={3}>
        <Stack width={0.5}>
          <Typography color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Wait time' })}
          </Typography>
          {isClaimDisabled ? (
            isBefore(targetDate, new Date()) ? (
              <Stack direction="row" alignItems="baseline" spacing={1}>
                <Typography sx={{ fontSize: 32, fontWeight: 'medium' }}>
                  {blocksLeft}
                </Typography>
                <Typography variant="body2">
                  {intl.formatMessage({ defaultMessage: 'blocks left' })}
                </Typography>
              </Stack>
            ) : (
              <Countdown
                targetDate={targetDate}
                valueLabelProps={{
                  labelProps: { sx: { display: 'none' } },
                  valueProps: { fontSize: 32, fontWeight: 'medium' },
                }}
                showUnits
              />
            )
          ) : (
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <FaCircleCheckRegular
                sx={{ fontSize: 36, color: 'success.main' }}
              />
              <Typography>
                {intl.formatMessage({ defaultMessage: 'Claimable' })}
              </Typography>
            </Stack>
          )}
        </Stack>
        <Divider orientation="vertical" flexItem />
        <Stack alignItems="flex-start" px={2} spacing={0.25}>
          <Typography variant="subtitle2" color="text.secondary">
            {intl.formatMessage({ defaultMessage: 'Claimable amount' })}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <TokenIcon token={tokens.mainnet.OETH} />
            <Typography fontSize={16} fontWeight="medium">
              {formatAmount(pending)}
            </Typography>
          </Stack>
          <LoadingLabel
            variant="subtitle2"
            color="text.secondary"
            isLoading={isPriceLoading}
          >
            ${format(pendingConverted, 2)}
          </LoadingLabel>
        </Stack>
      </Stack>
      {!isClaimDisabled && (
        <>
          <Divider />
          <Stack p={3}>
            <TxButton
              params={migrateParams}
              callbacks={migrateCallbacks}
              label={intl.formatMessage({
                defaultMessage: 'Migrate to ynLSDe',
              })}
              disabled={isClaimDisabled}
              sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60, mb: 2 }}
            />
            {!isClaimDisabled && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {intl.formatMessage(
                  { defaultMessage: 'Approximate gas cost: {gas}' },
                  { gas: format(migrateGasPrice?.gasCostUsd ?? from(0), 2) },
                )}
              </Typography>
            )}
          </Stack>
          <Divider>
            <Typography>
              {intl.formatMessage({ defaultMessage: 'OR' })}
            </Typography>
          </Divider>
          <Stack p={3}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                p: 2,
                mb: 2,
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'primary.main',
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.2),
                borderRadius: 2,
              }}
            >
              <WarningExclamation
                sx={{ fontSize: 36, color: 'primary.main' }}
              />
              <Typography>
                {intl.formatMessage({
                  defaultMessage:
                    'You will no longer be eligible for the YND Season 1 Airdrop or Seeds (points) boost if you withdraw. ',
                })}
              </Typography>
            </Stack>
            <TxButton
              params={claimParams}
              callbacks={claimCallbacks}
              label={intl.formatMessage({ defaultMessage: 'Claim OETH' })}
              disabled={isClaimDisabled}
              variant="outlined"
              sx={{ fontSize: 20, py: 2, borderRadius: 8, height: 60, mb: 2 }}
            />
            {!isClaimDisabled && (
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign="center"
              >
                {intl.formatMessage(
                  { defaultMessage: 'Approximate gas cost: {gas}' },
                  { gas: format(claimGasPrice?.gasCostUsd ?? from(0), 2) },
                )}
              </Typography>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

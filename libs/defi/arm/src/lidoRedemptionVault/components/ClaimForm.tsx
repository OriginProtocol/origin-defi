import { useState } from 'react';

import {
  Button,
  CardContent,
  Checkbox,
  CircularProgress,
  Collapse,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SectionCard, useTxButton } from '@origin/defi/shared';
import { LoadingLabel, ValueLabel } from '@origin/shared/components';
import { contracts, tokens } from '@origin/shared/contracts';
import {
  FaArrowUpRightRegular,
  FaCircleCheckRegular,
  FaClockRegular,
} from '@origin/shared/icons';
import { TxButton } from '@origin/shared/providers';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { useQueryClient } from '@tanstack/react-query';
import { formatDuration } from 'date-fns';
import { add, eq, format, from, mul } from 'dnum';
import { groupBy } from 'ramda';
import { useIntl } from 'react-intl';

import { useArmInfo, useClaimInfo } from '../hooks';

import type { CardContentProps, StackProps } from '@mui/material';

import type { WithdrawalRequest } from '../types';

export const ClaimForm = (props: CardContentProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const queryClient = useQueryClient();
  const [selectedClaimId, setSelectedClaimId] = useState<bigint | null>(null);
  const { data: info, isLoading: isInfoLoading } = useArmInfo();
  const selectedAmount =
    info?.requests?.find((r) => r.requestId === selectedClaimId)?.amount ?? 0n;
  const { params, callbacks, gasPrice } = useTxButton({
    params: {
      contract: contracts.mainnet.ARMstETHWETHPool,
      functionName: 'claimRedeem',
      args: [selectedClaimId ?? -1n],
    },
    callbacks: {
      onTxSigned: () => {
        queryClient.invalidateQueries();
      },
    },
    activity: {
      type: 'claim-withdrawal',
      status: 'idle',
      amountIn: selectedAmount,
      tokenIdIn: tokens.mainnet.WETH.id,
    },
    enableGas: true,
  });

  const handleClaimClick = (requestId: bigint) => () => {
    if (selectedClaimId === requestId) {
      setSelectedClaimId(null);
    } else {
      setSelectedClaimId(requestId);
    }
  };

  const { claimable, pending } = groupBy(
    (r) => (r.claimable ? 'claimable' : 'pending'),
    info?.requests ?? [],
  );

  const availableToClaim =
    claimable?.reduce(
      (acc, curr) => add([curr.amount, tokens.mainnet.WETH.decimals], acc),
      from(0),
    ) ?? from(0);
  const pendingAmount =
    pending?.reduce(
      (acc, curr) => add([curr.amount, tokens.mainnet.WETH.decimals], acc),
      from(0),
    ) ?? from(0);

  return (
    <CardContent {...props}>
      <Stack>
        <Stack
          {...props}
          sx={[
            {
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              backgroundColor: 'background.highlight',
              mb: 3,
            },
            ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
          ]}
        >
          <Stack
            spacing={1}
            sx={{
              alignItems: 'center',
              p: 3,
            }}
          >
            <Typography
              sx={{
                color: 'text.secondary',
              }}
            >
              {intl.formatMessage({ defaultMessage: 'Available to claim' })}
            </Typography>
            <Stack
              direction="row"
              spacing={0.75}
              sx={{
                alignItems: 'baseline',
              }}
            >
              <LoadingLabel
                isLoading={isInfoLoading}
                variant="featured1"
                sx={{ fontWeight: 'bold' }}
              >
                {eq(availableToClaim, 0)
                  ? '0.0'
                  : format(
                      availableToClaim,
                      getFormatPrecision(availableToClaim),
                    )}
              </LoadingLabel>
              <Typography variant="body2">
                {tokens.mainnet.WETH.symbol}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{
              alignItems: 'center',
            }}
          >
            <Stack
              spacing={1}
              sx={{
                width: 1,
                alignItems: 'center',
                p: 3,
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Your requests' })}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  minHeight: 32,
                }}
              >
                <IconChip claimable amount={claimable?.length ?? 0} />
                <Divider orientation="vertical" flexItem />
                <IconChip claimable={false} amount={pending?.length ?? 0} />
              </Stack>
            </Stack>
            {isSm ? (
              <Divider orientation="horizontal" flexItem />
            ) : (
              <Divider orientation="vertical" flexItem />
            )}
            <Stack
              spacing={1}
              sx={{
                width: 1,
                alignItems: 'center',
                p: 3,
              }}
            >
              <Typography
                sx={{
                  color: 'text.secondary',
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Your pending amount' })}
              </Typography>
              <Stack
                direction="row"
                spacing={0.75}
                sx={{
                  alignItems: 'baseline',
                  minHeight: 32,
                }}
              >
                <LoadingLabel
                  isLoading={isInfoLoading}
                  variant="featured2"
                  sx={{ fontWeight: 'bold' }}
                >
                  {format(pendingAmount, getFormatPrecision(pendingAmount))}
                </LoadingLabel>
                <Typography variant="body2">
                  {tokens.mainnet.WETH.symbol}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <SectionCard
          title={intl.formatMessage({ defaultMessage: 'Your claims' })}
          titleProps={{ fontWeight: 'medium' }}
          cardProps={{
            sx: {
              backgroundColor: 'background.highlight',
              borderRadius: 3,
            },
          }}
          mb={3}
        >
          <Stack divider={<Divider />}>
            {isInfoLoading ? (
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '5rem',
                }}
              >
                <CircularProgress size={24} />
              </Stack>
            ) : isNilOrEmpty(info?.requests) ? (
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '5rem',
                }}
              >
                <Typography
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'You have no withdrawal requests',
                  })}
                </Typography>
              </Stack>
            ) : (
              info?.requests?.map((r) => (
                <ClaimRow
                  key={r.id}
                  request={r}
                  selected={selectedClaimId === r.requestId}
                  onSelect={handleClaimClick(r.requestId)}
                  isProcessing={false}
                />
              ))
            )}
          </Stack>
        </SectionCard>
        <Collapse in={!isNilOrEmpty(selectedClaimId)}>
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Approximate gas cost:',
            })}
            value={`$${format(gasPrice?.gasCostUsd ?? from(0), 2)}`}
            isLoading={isInfoLoading}
            direction="row"
            sx={{ justifyContent: 'space-between', mb: 3 }}
            labelProps={{
              variant: 'body3',
              sx: { color: 'text.primary', fontWeight: 'medium' },
            }}
          />
        </Collapse>
        <TxButton
          params={params}
          callbacks={callbacks}
          variant="action"
          disabled={isNilOrEmpty(selectedClaimId)}
          label={intl.formatMessage(
            { defaultMessage: 'Claim{amount}' },
            {
              amount: eq(selectedAmount, 0)
                ? ''
                : ` ${format(
                    [selectedAmount, tokens.mainnet['ARM-WETH-stETH'].decimals],
                    {
                      digits: getFormatPrecision([
                        selectedAmount,
                        tokens.mainnet['ARM-WETH-stETH'].decimals,
                      ]),
                      decimalsRounding: 'ROUND_DOWN',
                    },
                  )} ${tokens.mainnet.WETH.symbol}`,
            },
          )}
        />
      </Stack>
    </CardContent>
  );
};

type IconChipProps = {
  claimable: boolean;
  amount: number;
} & StackProps;

const IconChip = ({ claimable, amount, ...rest }: IconChipProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
        },
        {
          svg: {
            fontSize: 24,
          },
        },
        claimable
          ? {
              svg: {
                color: 'success.main',
              },
            }
          : {
              svg: {
                color: 'warning.main',
              },
            },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {claimable ? <FaCircleCheckRegular /> : <FaClockRegular />}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 'bold',
        }}
      >
        {amount}
      </Typography>
    </Stack>
  );
};

type ClaimRowProps = {
  request: WithdrawalRequest;
  selected: boolean;
  onSelect: () => void;
  isProcessing: boolean;
} & StackProps;

const ClaimRow = ({
  request,
  selected,
  onSelect,
  isProcessing,
  ...rest
}: ClaimRowProps) => {
  const intl = useIntl();
  const { data: armInfo, isLoading: isArmInfoLoading } = useArmInfo();
  const vaultHasMoney = (armInfo?.claimable ?? 0n) >= request.queued;
  const { data: claimInfo, isLoading: isClaimInfoLoading } = useClaimInfo(
    request.requestId,
    {
      structuralSharing: false,
      refetchInterval:
        !request.claimable && !request.claimed && vaultHasMoney
          ? 10000
          : undefined,
    },
  );

  const now = Math.floor(Date.now() / 1000);
  const claimEnd = claimInfo?.claimTimestamp ?? 0;
  const diff = claimEnd - now;
  const isClaimable =
    !!claimInfo && claimInfo.claimable >= claimInfo.queued && diff < 0;
  const timeLeft = vaultHasMoney
    ? diff > 0
      ? formatDuration(
          { minutes: Math.floor(diff / 60), seconds: diff % 60 },
          { format: diff > 60 ? ['minutes'] : ['seconds'] },
        )
      : ''
    : intl.formatMessage({ defaultMessage: '0~5 days' });
  const amt = mul(
    [claimInfo?.assets ?? 0n, tokens.mainnet['ARM-WETH-stETH'].decimals],
    armInfo?.lpToWeth ?? 0,
    { rounding: 'ROUND_DOWN' },
  );
  const disabled = !isClaimable || isClaimInfoLoading || isProcessing;

  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
          p: 2,
          justifyContent: 'space-between',
          overflowX: 'hidden',
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      <FormControlLabel
        control={<Checkbox checked={isClaimable && selected} />}
        label={
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'baseline',
              color: isClaimable ? 'text.primary' : 'text.secondary',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'medium',
              }}
            >
              {format(amt, {
                digits: getFormatPrecision(amt),
                decimalsRounding: 'ROUND_DOWN',
              })}
            </Typography>
            <Typography variant="caption1">
              {tokens.mainnet.WETH.symbol}
            </Typography>
          </Stack>
        }
        onChange={onSelect}
        disabled={disabled}
        disableTypography
      />
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: 'center',
        }}
      >
        <ClaimChip
          claimable={isClaimable}
          isProcessing={isProcessing}
          isLoading={isClaimInfoLoading || isArmInfoLoading}
          timeLeft={timeLeft}
        />
        <Button
          variant="outlined"
          color="secondary"
          href={`https://etherscan.io/tx/${request.txHash}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          <FaArrowUpRightRegular sx={{ fontSize: 16 }} />
        </Button>
      </Stack>
    </Stack>
  );
};

type ClaimChipProps = {
  claimable: boolean;
  isProcessing: boolean;
  isLoading: boolean;
  timeLeft?: string;
} & StackProps;

const ClaimChip = ({
  claimable,
  isProcessing,
  isLoading,
  timeLeft,
  ...rest
}: ClaimChipProps) => {
  const intl = useIntl();

  const icon =
    isProcessing || isLoading ? (
      <CircularProgress size={16} />
    ) : claimable ? (
      <FaCircleCheckRegular sx={{ color: 'success.dark' }} />
    ) : (
      <FaClockRegular sx={{ color: 'warning.dark' }} />
    );
  const label = isLoading
    ? intl.formatMessage({ defaultMessage: 'Loading' })
    : isProcessing
      ? intl.formatMessage({ defaultMessage: 'Processing' })
      : claimable
        ? intl.formatMessage({ defaultMessage: 'Ready' })
        : timeLeft;
  const color =
    isProcessing || isLoading
      ? 'primary.main'
      : claimable
        ? 'success.dark'
        : 'warning.dark';
  const backgroundColor =
    isProcessing || isLoading
      ? 'primary.faded'
      : claimable
        ? 'success.faded'
        : 'warning.faded';

  return (
    <Stack
      direction="row"
      spacing={1}
      {...rest}
      sx={[
        {
          alignItems: 'center',
          color,
          backgroundColor,
          px: 2,
          py: 1,
          borderRadius: 2,
        },
        ...(Array.isArray(rest.sx) ? rest.sx : [rest.sx]),
      ]}
    >
      {icon}
      <Typography
        sx={{
          color: color,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
};

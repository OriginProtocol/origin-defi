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
import { SectionCard } from '@origin/defi/shared';
import { LoadingLabel, ValueLabel } from '@origin/shared/components';
import { tokens } from '@origin/shared/contracts';
import {
  FaArrowUpRightRegular,
  FaCircleCheckRegular,
  FaClockRegular,
} from '@origin/shared/icons';
import { getFormatPrecision, isNilOrEmpty } from '@origin/shared/utils';
import { add, eq, format, from } from 'dnum';
import { groupBy, remove } from 'ramda';
import { useIntl } from 'react-intl';

import { useArmVault } from '../hooks';

import type { CardContentProps, StackProps } from '@mui/material';
import type { Dnum } from 'dnum';

import type { WithdrawalRequest } from '../types';

export const ClaimForm = (props: CardContentProps) => {
  const intl = useIntl();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedClaimIds, setSelectedClaimIds] = useState<bigint[]>([]);
  const [gasPrice, setGasPrice] = useState<bigint>(0n);
  const { data, isLoading } = useArmVault();

  const handleClaimClick = (requestId: bigint) => () => {
    const idx = selectedClaimIds.findIndex((id) => id === requestId);
    if (idx === -1) {
      setSelectedClaimIds((prev) => [...prev, requestId]);
    } else {
      setSelectedClaimIds((prev) => remove(idx, 1, prev));
    }
  };

  const { claimable, pending } = groupBy(
    (r) => (r.claimable ? 'claimable' : 'pending'),
    data?.requests ?? [],
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
                isLoading={isLoading}
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
                  isLoading={isLoading}
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
            {isLoading ? (
              <Stack
                sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '5rem',
                }}
              >
                <CircularProgress size={24} />
              </Stack>
            ) : isNilOrEmpty(data?.requests) ? (
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
              data?.requests?.map((r) => (
                <ClaimRow
                  key={r.id}
                  request={r}
                  selected={selectedClaimIds.includes(r.requestId)}
                  onSelect={handleClaimClick(r.requestId)}
                  isProcessing={false}
                />
              ))
            )}
          </Stack>
        </SectionCard>
        <Collapse in={!isNilOrEmpty(selectedClaimIds)}>
          <ValueLabel
            label={intl.formatMessage({
              defaultMessage: 'Approximate gas cost:',
            })}
            value={`$${format([132n, 3], 2)}`}
            isLoading={isLoading}
            direction="row"
            sx={{ justifyContent: 'space-between', mb: 3 }}
            labelProps={{
              variant: 'body3',
              sx: { color: 'text.primary', fontWeight: 'medium' },
            }}
          />
        </Collapse>
        <Button variant="action" disabled={isNilOrEmpty(selectedClaimIds)}>
          {intl.formatMessage({ defaultMessage: 'Claim' })}
        </Button>
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
  const amt = [request?.amount ?? 0n, tokens.mainnet.WETH.decimals] as Dnum;
  const disabled = !request.claimable || isProcessing;

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
        control={<Checkbox checked={request.claimable && selected} />}
        label={
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: 'baseline',
              color: request.claimable ? 'text.primary' : 'text.secondary',
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
        <ClaimChip claimable={request.claimable} isProcessing={isProcessing} />
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
} & StackProps;

const ClaimChip = ({ claimable, isProcessing, ...rest }: ClaimChipProps) => {
  const intl = useIntl();

  const icon = isProcessing ? (
    <CircularProgress size={16} />
  ) : claimable ? (
    <FaCircleCheckRegular sx={{ color: 'success.dark' }} />
  ) : (
    <FaClockRegular sx={{ color: 'warning.dark' }} />
  );
  const label = isProcessing
    ? intl.formatMessage({ defaultMessage: 'Processing' })
    : claimable
      ? intl.formatMessage({ defaultMessage: 'Ready' })
      : intl.formatMessage({ defaultMessage: 'Pending' });
  const color = isProcessing
    ? 'primary.main'
    : claimable
      ? 'success.dark'
      : 'warning.dark';
  const backgroundColor = isProcessing
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
